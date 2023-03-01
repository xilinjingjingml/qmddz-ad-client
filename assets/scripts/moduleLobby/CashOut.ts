import { AdsConfig } from "../base/baseData/AdsConfig"
import DataManager from "../base/baseData/DataManager"
import { iMessageBox, showAwardResultPop } from "../base/BaseFuncTs"
import BaseScene from "../base/baseScene/BaseScene"
import { checkAdCanReceive, receiveAdAward, trans2format } from "../moduleLobby/LobbyFunc"

const { ccclass } = cc._decorator

@ccclass
export default class CashOut extends BaseScene {

    onOpenScene() {
        this.checkAdIcons()
        this.updateMoneyView()
        this.showAnimate()
    }

    showAnimate() {
        cc.find("animate", this.node).getComponent(sp.Skeleton).setAnimation(1, "animation", false)
        const attach = cc.find("nodePop", this.node)
        attach.opacity = 0
        attach.runAction(cc.speed(cc.sequence(
            cc.delayTime(0.5),
            cc.fadeIn(0.1)
        ), 1.5))

        attach.runAction(cc.speed(cc.sequence(
            cc.scaleTo(0.5, 1.2),
            cc.scaleTo(0.16, 1)
        ), 1.5))
    }

    checkAdIcons() {
        cc.find("nodePop/btnEarlyGain", this.node).active = checkAdCanReceive(AdsConfig.taskAdsMap.New_EarlyGain) && !DataManager.CommonData.gameServer && DataManager.UserData.getItemNum(382) < DataManager.Instance.getOnlineParamGray("New_EarlyGain_money", 18000)
    }

    onPressCashOut() {
        cc.audioEngine.playEffect(DataManager.Instance.menuEffect, false)
        if (DataManager.UserData.getItemNum(382) >= 20000) {
            iMessageBox("库存不足！请明日再来")
        } else {
            iMessageBox("还差" + Math.floor(20000 - DataManager.UserData.getItemNum(382)) / 100 + "元才能提现")
        }
    }

    updateUserData() {
        this.updateMoneyView()
    }

    updateMoneyView() {
        const num = trans2format(DataManager.UserData.getItemNum(382) / 100)
        cc.find("nodePop/labelMoney", this.node).getComponent(cc.Label).string = num + "元"
        cc.find("nodePop/nodeTip/labelDiff", this.node).getComponent(cc.Label).string = "还差" + trans2format(200 - parseFloat(num)) + "元"
        cc.find("nodePop/nodeTip", this.node).x = -150 + (parseFloat(num) / 200) * 430
        cc.find("nodePop/sprProgress", this.node).getComponent(cc.Sprite).fillRange = parseFloat(num) / 200
    }

    onPressEarlyGain() {
        cc.audioEngine.playEffect(DataManager.Instance.menuEffect, false)
        receiveAdAward(AdsConfig.taskAdsMap.New_EarlyGain, (res) => {
            if (res && res.ret == 0) {
                if (this.isValid) {
                    cc.find("nodePop/btnEarlyGain", this.node).active = checkAdCanReceive(AdsConfig.taskAdsMap.New_EarlyGain)
                }

                if (res.itemIndex != null && res.itemNum != null) {
                    showAwardResultPop([{ index: res.itemIndex, num: res.itemNum }])
                } else {
                    showAwardResultPop([{ index: 382, num: 0 }])
                }
                this.checkAdIcons()
            } else {
                iMessageBox("领取失败")
            }
        }, null, false)
    }

    onPressClose() {
        cc.audioEngine.playEffect(DataManager.Instance.menuEffect, false)
        this.closeSelf()
    }
}
