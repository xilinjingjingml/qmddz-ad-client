import { AdsConfig } from "../base/baseData/AdsConfig"
import DataManager from "../base/baseData/DataManager"
import BaseScene from "../base/baseScene/BaseScene"
import WxWrapper from "../base/WxWrapper"
import { checkAdCanReceive, getAdLeftTimes, getAdTotalTimes, receiveAdAward } from "./LobbyFunc"

const { ccclass } = cc._decorator

@ccclass
export default class LotteryPop extends BaseScene {

    onLoad() {
        WxWrapper.postMessage({
            event: "deviceSpace",
            value: WxWrapper.convertToDeviceSpace(cc.find("nodePop/content", this.node).getBoundingBoxToWorld())
        })

        this.setShareConfig()
        this.setInviteTips()

        DataManager.CommonData.CancelBackAd = true
    }

    setShareConfig() {
        WxWrapper.postMessage({
            event: "shareData",
            value: WxWrapper.randomShare()
        })
    }

    setInviteTips() {
        const label = cc.find("nodePop/labelTips", this.node).getComponent(cc.Label)
        const total = getAdTotalTimes(AdsConfig.taskAdsMap.InviteWxFriend)
        const left = getAdLeftTimes(AdsConfig.taskAdsMap.InviteWxFriend)
        label.string = "每日前" + total + "次邀请好友可获得神秘奖励,今日剩余" + left + "次"
    }

    onPressChangeList() {
        WxWrapper.postMessage({ event: "changeList" })
    }

    onShareToFriend(message) {
        this.setShareConfig()
        if (message.success) {
            WxWrapper.postMessage({ event: "shareSuccess" })
            if (checkAdCanReceive(AdsConfig.taskAdsMap.InviteWxFriend)) {
                receiveAdAward(AdsConfig.taskAdsMap.InviteWxFriend, () => {
                    this.isValid && this.setInviteTips()
                })
            }
        }
    }

    onDestroy() {
        DataManager.CommonData.CancelBackAd = false
    }

    onPressClose() {
		cc.audioEngine.playEffect(DataManager.Instance.menuEffect, false)
        this.closeSelf()
    }
}
