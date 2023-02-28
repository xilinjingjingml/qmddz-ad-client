import PreLoad from "../base/Preload";
import BaseScene from "../base/baseScene/BaseScene";
import SceneManager from "../base/baseScene/SceneManager";
import NetManager from "../base/baseNet/NetManager";
import DataManager from "../base/baseData/DataManager";
import GameLogic from "./GameLogic.rpddz"
import proto = require("./proto/client.rpddz")
import opcodeConfig from "./proto/opcode.rpddz";
import { czcEvent } from "../base/BaseFuncTs";

const {ccclass, property} = cc._decorator;

let gameTexture = [
    "/moduleRPDdzRes/images/GameDDZ/GameDDZ_1",
    "/moduleRPDdzRes/images/GameDDZ/GameDDZ_2",
    "/moduleRPDdzRes/images/PuKe/PuKe_rpddz_1",    
]

@ccclass
export default class ModuleStart extends cc.Component {

    start () {
        console.log("moduleStart")
        czcEvent("斗地主", "加载1", "开始加载斗地主" + (DataManager.CommonData["morrow"] <= 1 ? DataManager.CommonData["morrow"] + "天新用户" : "老用户"))
            SceneManager.Instance.addScene<String>("moduleLobby", "Preload", this.setPreload.bind(this))        
    }

    setPreload(scene: BaseScene) {
        if (null == scene)
            return

        let preload = scene.node.getComponent(PreLoad)
        if (null == preload)
            return

        let self = this

        let audioParam = {}
        if (GameLogic.Instance().getIfPreLoadSound()) {
            audioParam = {
            audioSrc: GameLogic.Instance().getAudioConfig(),
            audioCallback: (items) => {
                GameLogic.Instance().audioManager.formatAudioArr(items)
            }
            }            
        }

        preload.startLoad(gameTexture, audioParam, (items) => {
            czcEvent("斗地主", "加载2", "加载完成" + (DataManager.CommonData["morrow"] <= 1 ? DataManager.CommonData["morrow"] + "天新用户" : "老用户"))
            SceneManager.Instance.addScene<String>("moduleRPDdzRes", "GameScene")    
            if (GameLogic.Instance().henry_debug) {
                
            }else {
                let server = DataManager.CommonData["gameServer"]
                GameLogic.Instance().analyzeSocketInfo(server)
                NetManager.Instance.login(GameLogic.Instance().socketName, server.serverAddr + ":" + (server.serverPort + 1), proto, opcodeConfig) //, (socket) => this.sendVerifyTicketReq(socket))                
            }

            self.node.destroy()
        })
    }    
}


