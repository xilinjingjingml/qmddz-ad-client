import { AdsConfig } from "../base/baseData/AdsConfig"
import DataManager from "../base/baseData/DataManager"
import BaseScene from "../base/baseScene/BaseScene"
import { checkAdCanReceive, receiveAdAward } from "../moduleLobby/LobbyFunc"

const { ccclass } = cc._decorator

@ccclass
export default class DailyGift extends BaseScene {

    onOpenScene() {
        this.initAnimate()
        const isMax = DataManager.UserData.getItemNum(382) >= DataManager.Instance.getOnlineParamGray("New_DailyGift_money", 18000)
        cc.find("nodePop/bg1", this.node).active = !isMax
        cc.find("nodePop/bg2", this.node).active = isMax

        const canReceive = checkAdCanReceive(AdsConfig.taskAdsMap.New_DailyGift)
        cc.find("nodePop/btnGet", this.node).active = canReceive
        cc.find("nodePop/sprGary", this.node).active = !canReceive

        cc.find("nodePop/animate/light", this.node).runAction(cc.repeatForever(cc.rotateBy(6, 180)))
    }

    initAnimate() {
        cc.find("nodePop/btnGet", this.node).runAction(cc.repeatForever(cc.sequence(
            cc.scaleTo(0.8, 1.1),
            cc.scaleTo(0.8, 1.0)
        )))
        cc.find("nodePop/animate/shape1", this.node).runAction(cc.repeatForever(cc.sequence(
            cc.moveTo(1, cc.v2(75, 105)),
            cc.moveTo(1, cc.v2(80, 115))
        )))
        cc.find("nodePop/animate/shape2", this.node).runAction(cc.repeatForever(cc.sequence(
            cc.moveTo(1, cc.v2(35, -5)),
            cc.moveTo(1, cc.v2(40, 0))
        )))
        cc.find("nodePop/animate/shape3", this.node).runAction(cc.repeatForever(cc.sequence(
            cc.moveTo(1, cc.v2(-42, -30)),
            cc.moveTo(1, cc.v2(-45, -30))
        )))
        cc.find("nodePop/animate/shape4", this.node).runAction(cc.repeatForever(cc.sequence(
            cc.moveTo(1, cc.v2(-90, -2)),
            cc.moveTo(1, cc.v2(-95, 0))
        )))
        cc.find("nodePop/animate/shape5", this.node).runAction(cc.repeatForever(cc.sequence(
            cc.moveTo(1, cc.v2(-49, 79)),
            cc.moveTo(1, cc.v2(-55, 90))
        )))
    }

    onPressGet() {
        cc.audioEngine.playEffect(DataManager.Instance.menuEffect, false)
        if (checkAdCanReceive(AdsConfig.taskAdsMap.New_DailyGift)) {
            receiveAdAward(AdsConfig.taskAdsMap.New_DailyGift, () => {
                this.closeSelf()
            })
        }
    }

    onPressClose() {
        cc.audioEngine.playEffect(DataManager.Instance.menuEffect, false)
        this.closeSelf()
    }
}
