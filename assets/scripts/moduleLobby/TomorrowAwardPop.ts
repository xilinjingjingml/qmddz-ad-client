import { AdsConfig } from "../base/baseData/AdsConfig"
import DataManager from "../base/baseData/DataManager"
import { getNameByItemId, iMessageBox, showAwardResultPop } from "../base/BaseFuncTs"
import BaseScene from "../base/baseScene/BaseScene"
import { receiveAdAward } from "./LobbyFunc"
import { http } from "../base/utils/http"

const { ccclass } = cc._decorator

@ccclass
export default class TomorrowAwardPop extends BaseScene {

    onOpenScene() {
        const awards = this.initParam.awards
        const gifts = cc.find("nodePop/nodeGift", this.node).children

        if (awards.length == 1) {
            gifts[0].x = 0
            gifts[1].active = false
        }

        for (let i = 0; i < awards.length; i++) {
            const gift = gifts[i]
            gift.active = true
            cc.find("name", gift).getComponent(cc.Label).string = getNameByItemId(awards[i].itemIndex) + "x" + awards[i].itemNum
            const icon = cc.find("icon" + awards[i].itemIndex, gift)
            if (icon) {
                icon.active = true
            }
        }
    }

    getTomorrowAward(double = false) {
        let url = DataManager.getURL("GET_TOMORROW_GIFT")
        let param = {
            uid: DataManager.UserData.guid,
            ticket: DataManager.UserData.ticket,
        }

        http.open(url, param, (res) => {
            if (res && res.ret == 0) {
                const awards = []
                const ratio = double ? 2 : 1
                for (var item of this.initParam.awards) {
                    awards.push({ index: item.itemIndex, num: item.itemNum * ratio })
                }
                showAwardResultPop(awards)
                this.isValid && this.closeSelf()
            } else {
                iMessageBox("领取奖励失败")
            }
        })
    }

    onPressNormal() {
        this.getTomorrowAward()
    }

    onPressDouble() {
        receiveAdAward(AdsConfig.taskAdsMap.TomorrowGetMutiple, () => {
            this.getTomorrowAward(true)
        })
    }
}
