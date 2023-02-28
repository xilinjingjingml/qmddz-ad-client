import NetManager from "./NetManager";
import baseproto = require ("./baseProto")
import { czcEvent, PostInfomation } from "../BaseFuncTs";
import DataManager from "../baseData/DataManager";
import { IsJSON } from "../BaseFunc";

const {ccclass, property} = cc._decorator;

// declare var MozWebSocket: {
//     prototype: WebSocket;
//     new (url: string): WebSocket;
//     new (url: string, prototcol: string): WebSocket;
//     new (url: string, prototcol: string[]): WebSocket;
//     OPEN: number;
//     CLOSING: number;
//     CONNECTING: number;
//     CLOSED: number;
// }

// let Socket: WebSocket = window.WebSocket || window.MozWebSocket

@ccclass
export default class WebSocketWrapper extends cc.Component {

    @property()
    url: string = ""

    @property()
    linkName: string = ""

    @property()
    msgDelegate: (message) => void = null

    @property()
    loginRequestDelegate: (WebSocketWrapper) => void = null

    @property()
    websocket:WebSocket = null;

    @property()
    proto = null

    @property()
    _reconnectTimes: number = 0

    @property()
    MAX_RECONNECT:number = 5

    @property()
    _proto = null

    @property() 
    _opcodeConfig = null

    @property()
    _pingConut: number = 0;

    @property()
    _socketClose: boolean = false;

    @property()
    _onConnectCallback: (socket: WebSocketWrapper) => void = null

    onLoad() {
    }

    setProtobuf(proto, opcodeConfig) {
        this._proto = Object.assign(proto)
        this._opcodeConfig = Object.assign(opcodeConfig)

        for (const key in baseproto) {
            this._proto[key] = baseproto[key]
        }
    }

    setOnConnect(callback: (socket: WebSocketWrapper) => void) {
        this._onConnectCallback = callback
    }

    connect() {
        console.log("onConnect")
        if (this.websocket)
            this.websocket.close()

        this._socketClose = false

        this.websocket = null
        // this.url = this.url.replace("s3.hiigame.net", "s3-ws.hiigame.net")
        let requestHead = "wss://"
        // if (window.location.protocol == "http:")
        //     requestHead = "ws://"

        if (DataManager.Instance.isTesting)
            console.log(requestHead + this.url)

        czcEvent("网络", this.linkName + "连接请求", requestHead + this.url + " " + (DataManager.CommonData["morrow"] <= 1 ? DataManager.CommonData["morrow"] + "天新用户" : "老用户"))
        this.websocket = new WebSocket(requestHead + this.url)
        this.websocket.binaryType = "arraybuffer";
        this.websocket.onopen = (event) => {
            czcEvent("网络", this.linkName + "连接成功", requestHead + this.url + " " + (DataManager.CommonData["morrow"] <= 1 ? DataManager.CommonData["morrow"] + "天新用户" : "老用户"))
            if (DataManager.Instance.isTesting)
                console.log(event); 
            this.sendProtoReq(); this.startPing(); this.sendLoginRequest()
        }
        this.websocket.onmessage = (msgEvnt) => {this.onMessage(msgEvnt)}
        this.websocket.onerror = (err) => {
            let errmsg = IsJSON(err) ? JSON.stringify(err) : err
            czcEvent("网络", this.linkName + "连接失败", requestHead + this.url + " err " + errmsg + " " + (DataManager.CommonData["morrow"] <= 1 ? DataManager.CommonData["morrow"] + "天新用户" : "老用户"))
            let post = {
                url: requestHead + this.url,
                mes: errmsg,
            }
            PostInfomation(post)
            console.log(errmsg)
        }
        this.websocket.onclose = (event) => {
            if (DataManager.Instance.isTesting)
                console.log(event);  
            if (true == this._socketClose){
                return
            }
            cc.log("onclose", event.target.url, this.url)
            if (event.target.url != requestHead + this.url + "/") {
                return
            }

            if (this.linkName != "lobby" && event.code == 1006) {
                this.connectFail();
                return
            }
            if (this._reconnectTimes <= this.MAX_RECONNECT){
                this.reconnect()
                this._reconnectTimes++
                return 
            }
            this.stopPing(); 
            this.websocket.close()
        }
    }  

    close() {
        this.send({opcode : "proto_cb_send_disconnect_req"})
        this.stopPing()
        this._socketClose = true
        if (this.websocket){
            this.websocket.close()
        }
    }

    getReadyState() {
        return this.websocket.readyState == WebSocket.OPEN
    }

    getCloseState() {
        return this.websocket.readyState == WebSocket.CLOSED 
    }

    getBeOnClose() {
        return this._socketClose
    }

    sendProtoReq() {
        let message = {
            opcode : "proto_cl_use_protocol_proto_req",
        }

        this.send(message)
    }

    startPing() {
        // let reTry = 0
        let self = this
        let sendPing = function() {
            // 3分钟没通知return （15秒一次 一分钟4次 12次相当于3分钟)
            if (self._pingConut > 12) {
                if (self._reconnectTimes < self.MAX_RECONNECT){
                    self._reconnectTimes ++;
                    self.stopPing();
                    self.reconnect();
                }
                else{
                    self.connectFail();
                }
            }
            // reTry++;                    
            let ping = {
                opcode: "proto_ping",
                now: new Date().getTime()
            }           
            self._pingConut ++
            self.send(ping)
        }
        this.schedule(sendPing, 15, cc.macro.REPEAT_FOREVER, 0.0);
        sendPing()
    }

    sendLoginRequest() {
        this.loginRequestDelegate && this.loginRequestDelegate(this);        
    }

    stopPing() {
        this.unscheduleAllCallbacks()
    }

    reconnect() {
        // console.log(this.linkName + " reconnect! url = " + this.url)
        this.connect();
    }

    connectFail() {
        NetManager.Instance.SocketFailed(this)
    }

    onMessage(msgEvnt) {
        let message = this.decodePacket(msgEvnt.data)
        if (null == message)
            return 

        if (message.opcode == "proto_pong") {

            if (null != this._onConnectCallback) {
                this._onConnectCallback(this)
                this._onConnectCallback = null
            }
            this._pingConut --
            return
        }
        
        if (this.msgDelegate) 
            this.msgDelegate(message)
    }

    send(msg) {
        // console.log(msg)
        if (this.getReadyState())
            this.websocket.send(this.encodePacket(msg))
    }

	getOpcode(buf) {
		let value = 0
		if (buf.length > 1) {
			value = buf[0] << 8
			value |= buf[1]
			if ((value & 0x8000) === 0x8000) value = -(0xFFFF - value + 1)
		}
		return value
	}

	setOpcode(buf, code) {
		let aBuf = new ArrayBuffer(buf.byteLength + 2)
		let uBuf = new Uint8Array(aBuf)
		uBuf[0] = (code & 0xFF00) >>> 8
		uBuf[1] = code & 0x00FF
        uBuf.set(new Uint8Array(buf), 2)
        // if (DataManager.Instance.isTesting)
            // console.log(uBuf)
		return aBuf
    }

    encodePacket(packet) {
		// try {
            // console.log(packet)
            let opcode = packet.opcode

			if (!opcode){
                // throw Error('Encode Packet : Need Opcode')
                console.log('Encode Packet : Need Opcode')
                return null
            }

            let code =  this.getDefaultOpcode(opcode)
                        
			if (!code){
             //   throw Error('Encode Packet : Unknown Opcode')
                console.log('Encode Packet : Unknown Opcode = ' + opcode)
                return null
            }
                
            let proto = this._proto[opcode]
            if (!proto){
                // throw Error('Decode Packet : Unknown Packet = ' + code)
                console.log('Decode Packet : Unknown Packet = ' + code)
                return null
            }

            let message = {}
            for (const key in packet) {
                if (key != "opcode")  {
                    message[key] = packet[key]
                }
            }

            let buf = proto.create(message)
            buf = proto.encode(buf).finish()
            buf = this.setOpcode(buf, code)            
            
			return buf
		// } catch (err) {
		// 	cc.error(name, err.message)
		// 	return null
		// }
	}

	decodePacket(data) {
        // console.log(data)
        let opcode: any = "unknow"
		// try {
            let buf = new Uint8Array(data)
            // console.log(buf)
            opcode = this.getOpcode(buf)
			if (!opcode){
				// throw Error('Decode Packet : Need Opcode')
                console.log('Decode Packet : Need Opcode')
                return null
            }
            
            let pname = this.getDefaultOpcode(opcode)
			if (!pname){
                // throw Error('Decode Packet : Unknown Opcode')
                console.log('Decode Packet : Unknown Opcode = ' + opcode)   
                return null
            }
            
            let protos = this._proto[pname]
			if (!protos){
                // throw Error('Decode Packet : Unknown Packet')
                console.log('Decode Packet : Unknown Proto = ' + pname)
                return null
            }

			let packet = protos.decode(buf.subarray(2, buf.length))
			let message = {
                opcode: pname,
                packet: packet
            }
            if ("proto_lc_trumpet_not" != pname && DataManager.Instance.isTesting)
                console.log(message)
			return message
		// } catch (err) {
		// 	cc.error(this._opcodeConfig(opcode) || opcode, err.message)
		// 	return null
		// }
	}

    getDefaultOpcode(opcode) {
        if (typeof opcode == "string"){
            if (opcode == "proto_ping")
                return 7200
            else if (opcode == "proto_pong")
                return 7201
            else if (opcode == "proto_cl_use_protocol_proto_req" && this.linkName == "lobby")
                return 20154
            else if (opcode == "proto_lc_use_protocol_proto_ack" && this.linkName == "lobby")
                return 20155
            else if (opcode == "proto_cl_use_protocol_proto_req")
                return 21320
            else if (opcode == "proto_lc_use_protocol_proto_ack")
                return 21321
            else if (opcode == "proto_cb_send_disconnect_req")
                return 21224
            else
                return this._opcodeConfig(opcode)
        }
        else if (typeof opcode == "number") {
            if (opcode == 7200)
                return "proto_ping"
            else if (opcode == 7201)
                return "proto_pong"
            else if (opcode == 20154 || opcode == 21320)
                return "proto_cl_use_protocol_proto_req"
            else if (opcode == 20155 || opcode == 21321)
                return "proto_lc_use_protocol_proto_ack"
            else if (opcode == 21224)
                return "proto_cb_send_disconnect_req"
            else
                return this._opcodeConfig(opcode)
        }
    }
}
