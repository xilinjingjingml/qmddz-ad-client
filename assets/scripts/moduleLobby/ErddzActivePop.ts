import BaseScene from "../base/baseScene/BaseScene";
import DataManager from "../base/baseData/DataManager";
import SceneManager from "../base/baseScene/SceneManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ErddzActivePop extends BaseScene {

    onOpenScene() {
        DataManager.CommonData[DataManager.UserData.guid + "ErddzActivePop"] = true
        cc.find("nodePop/btnEnterGame", this.node).active = DataManager.UserData.money >= 100000
    }
    
    onCloseScene() {

    }

    onPressEnterGame() {
        SceneManager.Instance.sendMessageToScene({opcode: "onMsgGameRoom", message: {gameId: 390}})
        this.closeSelf()
    }
}
