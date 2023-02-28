import BaseScene from "../base/baseScene/BaseScene";
import NetManager from "../base/baseNet/NetManager";
import DataManager from "../base/baseData/DataManager";

import proto = require("../moduleLobby/proto/lobbyproto")
import opcodeConfig from "./proto/opcode";
import WebSocketWrapper from "../base/baseNet/WebSocketWrapper";
import SceneManager from "../base/baseScene/SceneManager";
import { czcEvent } from "../base/BaseFuncTs";

const {ccclass, property} = cc._decorator;

@ccclass
export default class LoginScene extends BaseScene {

    _isLogin = false
    _isConnectSocket = false
    _isSocketReady = false

    onOpenScene() {
        czcEvent("大厅", "登录6", "登录界面 " + (DataManager.CommonData["morrow"] <= 1 ? DataManager.CommonData["morrow"] + "天新用户" : "老用户"))
        // 
        // console.debug("login open" + new Date().getTime())        
    }

    update () {
        if (this._isLogin || DataManager.CommonData["isLogin"] != true || DataManager.CommonData["configFinish"] != true){
            // if (false == this._isLogin)
                // console.log(DataManager.CommonData["isLogin"], DataManager.CommonData["configFinish"])
            return
        }
        
        SceneManager.Instance.addScene<String>("moduleLobby", "LobbyScene")
        this._isLogin = true

        if (null == NetManager.Instance.getSocketState("lobby")) {
            NetManager.Instance.login("lobby", DataManager.Instance.SocketAddress, proto, opcodeConfig, (socket) => this.sendVerifyTicketReq(socket))
        }
    }

    sendVerifyTicketReq(socket: WebSocketWrapper){
        czcEvent("大厅", "登录7", "连接socket " + (DataManager.CommonData["morrow"] <= 1 ? DataManager.CommonData["morrow"] + "天新用户" : "老用户"))
        let proto_cl_verify_ticket_req = {
            opcode: "proto_cl_verify_ticket_req",
            plyGuid: DataManager.Instance._userData.guid,
            plyNickname: DataManager.Instance._userData.nickname,
            plyTicket: DataManager.Instance._userData.ticket,
            gameId: DataManager.Instance.gameId,
            version: 1498492800,
            extParam: "",
            sex: DataManager.Instance._userData.sex,
            packetName: DataManager.Instance.packetName
        }
        
        socket.send(proto_cl_verify_ticket_req)

        // console.debug("send ticket" + new Date().getTime())
    } 
}
