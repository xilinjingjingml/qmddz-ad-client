import DataManager from "../baseData/DataManager"
import SceneManager from "../baseScene/SceneManager"
import NotfiyMessage from "./NotfiyMessage"
import { checkNetwork } from "../BaseFuncTs";
import WebSocketWrapper from "./WebSocketWrapper"

const { ccclass } = cc._decorator

@ccclass
export default class NetManager extends cc.Component {

    static _instance: NetManager = null

    static get Instance() {
        return NetManager._instance
    }

    private _notfiyMessage: NotfiyMessage = null
    private sockets: { [key: string]: WebSocketWrapper }

    onLoad() {
        NetManager._instance = this
    }

    onInit() {
        this.sockets = {}
        this._notfiyMessage = new NotfiyMessage()
        this.node.on("sendMessage", event => this.send(event.socketName, event.message))
    }

    setUrl(name: string, url: string) {
        const socket = this.sockets[name]
        if (null == socket) {
            return
        }

        socket.url = url
    }

    login(name: string, url: string, proto, define, loginFunc: (WebSocketWrapper) => void = null) {
        if (name != "lobby") {
            DataManager.CommonData["runGame"] = name
        }

        let socket = this.sockets[name]
        if (socket) {
            return
        }

        socket = this.node.addComponent(WebSocketWrapper)
        this.sockets[name] = socket
        socket.url = url
        socket.linkName = name
        socket.msgDelegate = this.onMessage.bind(this)
        socket.loginRequestDelegate = loginFunc
        socket.setProtobuf(proto, define)
        socket.connect()
    }

    setSocketLoginFunc(name: string, loginFunc: (WebSocketWrapper) => void = null) {
        const socket = this.sockets[name]
        if (null == socket) {
            return
        }

        socket.loginRequestDelegate = loginFunc
    }

    getSocketState(name: string) {
        const socket = this.sockets[name]
        if (null == socket) {
            return
        }

        return socket.getReadyState()
    }

    close(name: string, del = true, delobby = false) {
        const socket = this.sockets[name]
        if (null == socket) {
            return
        }

        socket.close()
        if (del && ("lobby" != name || delobby)) {
            this.node.removeComponent(this.sockets[name])
            delete this.sockets[name]
        }
    }

    reconnect(name: string) {
        const socket = this.sockets[name]
        if (null == socket) {
            return
        }

        socket.reconnect()
    }

    send<T extends IMessage>(name: string, message: T) {
        const socket = this.sockets[name]
        if (null == socket) {
            return
        }

        if (socket.getReadyState()) {
            // 如果是正常的状态 直接发
            socket.send(message)
        } else if (socket.getBeOnClose()) {
            // socket 还没有删除 但是已经准备关闭了 直接返回
            return
        } else if (socket.getCloseState()) {
            //有socket实例 但是是关闭状态 重连发送
            socket.setOnConnect(() => { socket.send(message) })
            socket.reconnect()
        } else {
            //有socket实例 但是非关闭和非可以发送状态 说明可能在连接 等待0.5秒再发送
            this.scheduleOnce(() => { this.send(name, message) }, 2)
        }
    }

    SocketFailed(socket: WebSocketWrapper) {
        cc.log("socket connect failed", socket.linkName)
        if (socket.linkName == "lobby") {
            // 如果只有大厅服务器的连接 那么重连 否则认为游戏服务器还在 游戏服务器为主 不在重连
            this.scheduleOnce(() => {
                if (DataManager.CommonData["runGame"]) {
                    this.SocketFailed(socket)
                } else {
                    checkNetwork(socket.reconnect.bind(socket), true)
                }
            }, 3)
        } else {
            SceneManager.Instance.sendMessageToScene({ opcode: "socket_closed", socket: socket })
        }
    }

    onMessage<T extends IMessage>(message: T) {
        if (null == message) {
            return
        }

        // 通用的通知节点 处理与界面无关的通知信息 如果找到节点方法
        if (message.opcode && this._notfiyMessage[message.opcode]) {
            this._notfiyMessage[message.opcode](message)
        }

        SceneManager.Instance.sendMessageToScene(message)
    }
}
