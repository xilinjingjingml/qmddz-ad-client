import DataManager from "../base/baseData/DataManager"
import { czcEvent } from "../base/BaseFuncTs"
import BaseScene from "../base/baseScene/BaseScene"
import { sendReloadUserData } from "./LobbyFunc"

const { ccclass } = cc._decorator

@ccclass
export default class GuideNewbieGiftPop extends BaseScene {

    onOpenScene() {
        czcEvent("大厅", "引导新人礼包", "打开")
        cc.find("nodePop/node_money/label_money", this.node).getComponent(cc.Label).string = DataManager.Instance.onlineParam.GuideNewbieGiftMoney || (this.initParam.rewards[0].num / 10000)
    }

    onCloseScene() {
        sendReloadUserData()
        czcEvent("大厅", "引导新人礼包", "关闭")
    }
}
