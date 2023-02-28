import { AdsConfig } from "../base/baseData/AdsConfig"
import { iMessageBox } from "../base/BaseFuncTs"
import BaseScene from "../base/baseScene/BaseScene"
import { getAdLeftTimes, receiveAdAward } from "./LobbyFunc"

const { ccclass } = cc._decorator

@ccclass
export default class UnenoughDiamondPop extends BaseScene {

    onOpenScene() {
        this.updateState()
    }

    updateState() {
        const labelLeftTimes = cc.find("nodePop/nodeOperator/lbl_rest_time", this.node)
        labelLeftTimes.getComponent(cc.Label).string = "今日剩余:" + getAdLeftTimes(AdsConfig.taskAdsMap.DrawDiamond) + "次"
    }

    onPressDraw(sender, data) {
        const node = sender.target
        if (node.coldDown) {
            iMessageBox("10秒内仅可以领取一次哦!")
            return
        }

        const adIndex = parseInt(data)
        receiveAdAward(adIndex, () => {
            this.isValid && this.updateState()
        })

        node.coldDown = true
        node.runAction(cc.sequence(
            cc.delayTime(10),
            cc.callFunc(() => {
                node.coldDown = false
            })
        ))
    }
}
