import WebSocketWrapper from "./WebSocketWrapper";
import SceneManager from "../baseScene/SceneManager";
import NotfiyMessage from "./NotfiyMessage";
import DataManager from "../baseData/DataManager";
import GameManager from "../GameManager";

const {ccclass, property, executeInEditMode} = cc._decorator;

@ccclass
@executeInEditMode
export default class NetManager extends cc.Component {

    static _instance: NetManager = null

    @property()
    _notfiyMessage: NotfiyMessage = new NotfiyMessage()

    @property({
        type: [String, WebSocketWrapper]
    })
    socketList = []

    static get Instance() {
        return NetManager._instance
    }

    onLoad(){
        NetManager._instance = this
    }

    onInit() {
        this.socketList = []
        this._notfiyMessage = new NotfiyMessage()

        this.node.on("sendMessage", (event) => this.send(event.socketName, event.message))
    }

    setUrl(name, url) {
        let socket = this.socketList[name];
        if (null != socket) {
            socket.url = url
        }

    }

    login(name, url, proto, define, loginFunc: (WebSocketWrapper) => void = null) {
        if (name != "lobby")
            DataManager.CommonData["runGame"] = name

        this.onTime = cc.sequence(cc.delayTime(10), cc.callFunc(() => GameManager.Instance.onError("3.1")))
        this.node.runAction(this.onTime)

        let socket = this.socketList[name];
        if (null == socket) {
            // let socket = new WebSocketWrapper(url)
            let socket = this.node.addComponent(WebSocketWrapper)
            socket.url = url
            socket.linkName = name
            socket.msgDelegate = this.onMessage.bind(this)
            socket.loginRequestDelegate = loginFunc
            socket.setProtobuf(proto, define)
            socket.connect()
            this.socketList[name] = socket
        }
    }

    getSocketState(name: string) {
        if (null == this.socketList[name])
            return null
            
        return this.socketList[name].getReadyState()
    }

    close(name, deleteSocket = true) {
        let socket = this.socketList[name];
        if (null != socket) {
            socket.close()
            if ("lobby" != name && deleteSocket)
                delete this.socketList[name]
        }
    }

    reconnect(name) {
        let socket = this.socketList[name];
        socket && socket.reconnect()
    }

    send(name, message) {
        // console.log("netmanager send")
        // 如果是正常的状态 直接发
        // console.log(this.socketList[name], this.socketList[name].getReadyState())
        let self = this
        if (this.socketList[name] && this.socketList[name].getReadyState()){
            this.socketList[name].send(message)    
        }
        // socket 还没有删除 但是已经准备关闭了 直接返回
        else if (this.socketList[name] && this.socketList[name].getBeOnClose()) {
            return
        }
        //有socket实例 但是是关闭状态 重连发送 //如果是大厅服务器 并且 name == "lobby" && 
        else if (this.socketList[name] && this.socketList[name].getCloseState()) {
            let webSocket = this.socketList[name]
            let delaySend = function(socket) {
                // console.log(socket)
                // console.log("delaySend")
                self.socketList[name].send(message)    
            }

            webSocket.setOnConnect(delaySend)
            this.socketList[name].reconnect()
        }
        //有socket实例 但是非关闭和非可以发送状态 说明可能在连接 等待0.5秒再发送 //如果是大厅服务器 并且 name == "lobby" && 
        else if (this.socketList[name]){
            // let webSocket = this.socketList[name]
            let self = this
            let delaySend = function() {
                // webSocket.send(message)
                this.send(name, message)
            }
            this.scheduleOnce(delaySend, 2)            
        }       
        else {
            // BaseFunc.MessageBox({title: "提示", connect: "数据发送失败"})
            // iMessageBox("数据发送失败")
        }
    }

    SocketFailed(socket: WebSocketWrapper) {
        GameManager.Instance.onError("3.0")
        console.log("socket connect failed")
        let reconnect = function(){
            socket.reconnect()
        }

        if (socket.linkName == "lobby") {
            // 如果只有大厅服务器的连接 那么重连 否则认为游戏服务器还在 游戏服务器为主 不在重连
            if (this.socketList.length < 2) 
                cc.director.getScheduler().schedule(reconnect, this, 60, false);
        }
        else if (socket.linkName == "lobby" && -1 != socket.url.indexOf("hanode-wss.wpgame.com.cn")) {
            socket.url = socket.url.replace("hanode-wss.wpgame.com.cn", "hanode111.wpgame.com.cn")
            socket.reconnect();
        }
        else{
            SceneManager.Instance.sendMessageToScene({opcode: "socket_closed", socket: socket})
        }
    }

    onMessage(message) {
        if (this.onTime) {
            this.node.stopAction(this.onTime)
            this.onTime = null
        }

        if (null == message)
            return

        let opcode = message.opcode
        let packet = message.packet

        // 通用的通知节点 处理与界面无关的通知信息 如果找到节点方法
        if (this._notfiyMessage[opcode])
            this._notfiyMessage[opcode](message)

        SceneManager.Instance.sendMessageToScene(message)
    }
}
