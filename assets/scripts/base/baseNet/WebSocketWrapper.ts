import DataManager from "../baseData/DataManager"
import { czcEvent } from "../BaseFuncTs"
import { ObjectExtends } from "../extends/ObjectExtends"
import * as protobuf from "../extensions/protobuf"
import NetManager from "./NetManager"
import baseproto = require("./baseProto")
import lobbyproto = require("../../moduleLobby/proto/lobbyproto")
import { functions } from "../utils/functions"

const { ccclass } = cc._decorator

@ccclass
export default class WebSocketWrapper extends cc.Component {
    linkName: string = ""
    url: string = ""
    private proto = null
    private opcodeConfig = null
    private websocket: WebSocket = null
    private connectCallback: (socket: WebSocketWrapper) => void = null
    msgDelegate: (message) => void = null
    loginRequestDelegate: (WebSocketWrapper) => void = null

    private pingConut: number = 0
    private reconnectCount: number = 0
    private isOpen: boolean = false
    private isClose: boolean = false
    private pingTime: number = 0

    setProtobuf(proto: { messages: { name: string }[] }, opcodeConfig) {
        const messages = {}
        const merage = message => {
            messages[message.name] = message
        }
        proto.messages.forEach(merage)
        lobbyproto['messages'].forEach(merage)
        baseproto['messages'].forEach(merage)

        proto.messages = ObjectExtends.values(messages)
        this.proto = protobuf.loadJson(proto, protobuf.newBuilder({ convertFieldsToCamelCase: true }))
        this.opcodeConfig = Object.assign(opcodeConfig)
    }

    setOnConnect(callback: (socket: WebSocketWrapper) => void) {
        this.connectCallback = callback
    }

    connect() {
        if (this.websocket) {
            this.close()
        }

        this.isOpen = false
        this.isClose = false
        this.stopPing()

        this.scheduleOnce(this.onTimeout.bind(this), 5)// 3s超时

        const url = "wss://" + this.url
        // czcEvent("网络", this.linkName + "连接请求", url + " " + DataManager.Instance.userTag)
        cc.log("[WW.connect]", this.linkName, url)
        this.websocket = cc.sys.isNative ? new WebSocket(url, undefined, "thirdparty/wss.pem") : new WebSocket(url)
        this.websocket.binaryType = "arraybuffer";
        this.websocket.onopen = this.onOpen.bind(this)
        this.websocket.onmessage = this.onMessage.bind(this)
        this.websocket.onerror = this.onError.bind(this)
        this.websocket.onclose = this.onClose.bind(this)
    }

    onTimeout() {
        cc.error("[WW.onTimeout]", this.linkName)
        // czcEvent("网络", this.linkName + "连接超时", this.url + " " + DataManager.Instance.userTag)
        this.close()
        this.connectFail()
    }

    onOpen() {
        // czcEvent("网络", this.linkName + "连接成功", this.url + " " + DataManager.Instance.userTag)
        cc.log("[WW.onOpen]", this.linkName)
        this.isOpen = true
        this.send({ opcode: "proto_cl_use_protocol_proto_req" })
        this.startPing()
        this.loginRequestDelegate && this.loginRequestDelegate(this)
    }

    onMessage(event: MessageEvent) {
        const message = this.decodePacket(event.data)
        if (null == message) {
            return
        }

        this.pingConut = 0
        this.pingTime = Date.now()
        cc.log("[WW.onMessage]", this.linkName, cc.sys.isNative ? message.opcode : message)
        if (message.opcode == "proto_pong") {
            this.reconnectCount = 0
            if (null != this.connectCallback) {
                this.connectCallback(this)
                this.connectCallback = null
            }
            return
        }

        if (this.msgDelegate) {
            this.msgDelegate(message)
        }
    }

    onError(event: Event) {
        const strEvent = functions.IsJSON(event) ? JSON.stringify(event) : event
        // czcEvent("网络", this.linkName + "连接失败", this.url + " err " + strEvent + " " + DataManager.Instance.userTag)
        cc.error("[WW.onError]", this.linkName, strEvent)
        this.pingTime = 0
        if (!this.isOpen && this.reconnectCount == 0) {
            this.connectFail()
        }
    }

    onClose(event: CloseEvent) {
        const strEvent = functions.IsJSON(event) ? JSON.stringify(event) : event
        cc.log("[WW.onClose]", this.linkName, strEvent)
        this.isOpen = false
        this.stopPing()
        if (this.isClose) {
            return
        }
        if (this.linkName != "lobby" && event.code == 1006) {
            this.connectFail()
            return
        }
        this.tryReconnect()
    }

    send<T extends IMessage>(message: T) {
        if (!this.getReadyState()) {
            return
        }
        const buffer = this.encodePacket(message)
        if (!buffer) {
            return
        }
        this.websocket.send(buffer)
    }

    close() {
        this.send({ opcode: "proto_cb_send_disconnect_req" })
        this.stopPing()
        if (this.websocket) {
            this.websocket.onopen = this.websocket.onmessage = this.websocket.onerror = this.websocket.onclose = null
            this.isOpen && this.websocket.close(1000, "just want close")
            this.websocket = null
        }
        this.isOpen = false
        this.isClose = true
    }

    getReadyState() {
        return this.isOpen && this.websocket.readyState == WebSocket.OPEN
    }

    getCloseState() {
        return this.websocket.readyState == WebSocket.CLOSED
    }

    getBeOnClose() {
        return this.isClose
    }

    reconnect() {
        // czcEvent("网络", this.linkName + "尝试重连", this.url + " " + DataManager.Instance.userTag)
        cc.log("[WW.reconnect]", this.linkName)
        this.reconnectCount = 0
        this.connect()
    }

    connectFail() {
        cc.log("[WW.connectFail]", this.linkName)
        this.stopPing()
        NetManager.Instance.SocketFailed(this)
    }

    tryReconnect() {
        cc.log("[WW.tryReconnect]", this.linkName, this.reconnectCount)
        if (this.reconnectCount < 3) {
            this.reconnectCount++
            this.connect()
        } else {
            this.connectFail()
        }
    }

    startPing() {
        this.stopPing()
        this.schedule(this.onPing.bind(this), 1, cc.macro.REPEAT_FOREVER)
        this.pingConut = 0
        this.sendPing()
    }

    onPing() {
        let difference
        if (this.pingTime > 0) {
            if (CC_PREVIEW) {
                // 方便断点调试
                return
            }
            difference = Date.now() - this.pingTime
            if (difference < 5000) {
                return
            }
        }

        cc.log("[WW.onPing]", this.linkName, this.pingConut, difference)
        this.pingConut > 3 ? this.tryReconnect() : this.sendPing()
    }

    sendPing() {
        this.pingConut++
        this.send({ opcode: "proto_ping", now: Date.now() })
    }

    stopPing() {
        this.pingTime = 0
        this.unscheduleAllCallbacks()
    }

    getOpcode(buf: Uint8Array) {
        let value = 0
        if (buf.length > 1) {
            value = buf[0] << 8
            value |= buf[1]
            if ((value & 0x8000) === 0x8000) {
                value = -(0xFFFF - value + 1)
            }
        }
        return value
    }

    setOpcode(buf: ArrayBuffer, code: number) {
        let abuf = new ArrayBuffer(buf.byteLength + 2)
        let ubuf = new Uint8Array(abuf)
        ubuf[0] = (code & 0xFF00) >>> 8
        ubuf[1] = code & 0x00FF
        ubuf.set(new Uint8Array(buf), 2)
        return abuf
    }

    encodePacket(message: IMessage) {
        const name = message.opcode
        if (!name) {
            cc.warn('Encode Packet : Need Opcode')
            return
        }

        const code = this.getDefaultOpcode(name)
        if (!code) {
            cc.warn('Encode Packet : Unknown Opcode = ' + name)
            return
        }

        const proto = this.proto.lookup(name)
        if (!proto) {
            cc.warn('Decode Packet : Unknown Packet = ' + code)
            return
        }

        return this.setOpcode(this.proto.build(name).encode(message).toBuffer(), code)
    }

    decodePacket(data: any): IMessage {
        const buffer = new Uint8Array(data)
        const code = this.getOpcode(buffer)
        if (!code) {
            cc.warn('Decode Packet : Need Opcode')
            return
        }

        const name = this.getDefaultOpcode(code)
        if (!name) {
            cc.warn('Decode Packet : Unknown Opcode = ' + code)
            return
        }

        const protos = this.proto.lookup(name)
        if (!protos) {
            cc.warn('Decode Packet : Unknown Proto = ' + name)
            return
        }

        return { opcode: name, packet: this.proto.build(name).decode(buffer.subarray(2, buffer.length)) }
    }

    getDefaultOpcode(opcode: string): number
    getDefaultOpcode(opcode: number): string
    getDefaultOpcode(opcode: number | string) {
        if (typeof opcode == "string") {
            if (opcode == "proto_ping") {
                return 7200
            } else if (opcode == "proto_pong") {
                return 7201
            } else if (opcode == "proto_cl_use_protocol_proto_req" && this.linkName == "lobby") {
                return 20154
            } else if (opcode == "proto_lc_use_protocol_proto_ack" && this.linkName == "lobby") {
                return 20155
            } else if (opcode == "proto_cl_use_protocol_proto_req") {
                return 21320
            } else if (opcode == "proto_lc_use_protocol_proto_ack") {
                return 21321
            } else if (opcode == "proto_cb_send_disconnect_req") {
                return 21224
            } else {
                return this.opcodeConfig(opcode)
            }
        }
        else if (typeof opcode == "number") {
            if (opcode == 7200) {
                return "proto_ping"
            } else if (opcode == 7201) {
                return "proto_pong"
            } else if (opcode == 20154 || opcode == 21320) {
                return "proto_cl_use_protocol_proto_req"
            } else if (opcode == 20155 || opcode == 21321) {
                return "proto_lc_use_protocol_proto_ack"
            } else if (opcode == 21224) {
                return "proto_cb_send_disconnect_req"
            } else {
                return this.opcodeConfig(opcode)
            }
        }
    }
}
