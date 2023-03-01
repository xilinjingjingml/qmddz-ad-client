import DataManager from "../base/baseData/DataManager";
import { czcEvent } from "../base/BaseFuncTs";
import NetManager from "../base/baseNet/NetManager";
import BaseScene from "../base/baseScene/BaseScene";
import SceneManager from "../base/baseScene/SceneManager";
import PreLoad from "../base/Preload";
import GameLogic from "./GameLogic.rpddz";
import opcodeConfig from "./proto/opcode.rpddz";
import proto = require("./proto/client.rpddz")

const { ccclass, property } = cc._decorator;

@ccclass
export default class ModuleStart extends cc.Component {

    start() {
        cc.log("ModuleDDZ.moduleStart")
        czcEvent("斗地主", "加载1", "开始加载斗地主" + DataManager.Instance.userTag)
        SceneManager.Instance.popScene("moduleLobby", "Preload", undefined, undefined, this.loadGameScene.bind(this))
    }

    loadGameScene(scene: BaseScene) {
        cc.loader.loadRes('moduleRPDdzRes/prefab/GameScene', (err, res) => {
            this.setPreload(scene)
        })
    }

    setPreload(scene: BaseScene) {
        if (null == scene) {
            return
        }

        const preload = scene.node.getComponent(PreLoad)
        if (null == preload) {
            return
        }

        preload.startLoad(["/moduleRPDdzRes/images/PuKe/PuKe_rpddz_1"], {}, () => {
            czcEvent("斗地主", "加载2", "加载完成" + DataManager.Instance.userTag)
            const server = DataManager.CommonData.gameServer
            GameLogic.Instance().analyzeSocketInfo(server)
            NetManager.Instance.login(GameLogic.Instance().socketName, server.serverAddr + ":" + (server.serverPort + 1), proto, opcodeConfig)

            SceneManager.Instance.addScene("moduleRPDdzRes", "GameScene")
        })
    }
}