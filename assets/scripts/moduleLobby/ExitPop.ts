import { IConfirmBox } from "../base/BaseFuncTs";
import BaseScene from "../base/baseScene/BaseScene";
import DataManager from "../base/baseData/DataManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class ExitPop extends BaseScene {
    initParam: IConfirmBox

    onOpenScene() {
        const labelContent = cc.find("nodePop/labelContent", this.node).getComponent(cc.Label)
        let num = DataManager.load("RedpacketCountToday" + new Date().toDateString())
        cc.log('[ExitPop.onOpenScene]', num)
        if (num) {
            cc.log('[ExitPop.onOpenScene]', DataManager.UserData.getItemNum(365))
            num = DataManager.UserData.getItemNum(365) - num
            if (num > 0) {
                labelContent.string = "您今天获得了" + num + "红包券，加把劲，更多的红包在等着你！"
                return
            }
        }

        labelContent.string = "您今天还未获得红包，继续游戏可获得大量红包！"
    }

    onConfirm() {
        cc.game.end()
    }

    onCancel() {
        this.closeSelf()
    }

    onClose() {
        this.closeSelf()
    }
}
