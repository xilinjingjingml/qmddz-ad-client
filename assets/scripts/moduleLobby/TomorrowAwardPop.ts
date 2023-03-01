import { AdsConfig } from "../base/baseData/AdsConfig"
import DataManager from "../base/baseData/DataManager"
import { getNameByItemId, iMessageBox, showAwardResultPop } from "../base/BaseFuncTs"
import BaseScene from "../base/baseScene/BaseScene"
import { receiveAdAward } from "./LobbyFunc"
import { http } from "../base/utils/http"
import { NodeExtends } from "../base/extends/NodeExtends"

const { ccclass } = cc._decorator

@ccclass
export default class TomorrowAwardPop extends BaseScene {

    initParam: { awards: IItemInfo[] }

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

            if (awards[i].itemIndex == 382) {
                const money = [5, 10, 15][awards[i].itemNum]
                cc.find("name", gift).getComponent(cc.Label).string = money ? `最高得${money}元` : ""
                const icon2 = cc.find(`icon${awards[i].itemIndex}_${awards[i].itemNum}`, gift)
                if (icon2) {
                    if (icon) {
                        icon.active = false
                    }
                    icon2.active = true
                }
            }
        }
    }

    getTomorrowAward(double = false) {
        let url = DataManager.getURL("GET_TOMORROW_GIFT") + "&gameId={gameId}"
        let param = {
            uid: DataManager.UserData.guid,
            ticket: DataManager.UserData.ticket,
            gameId: 1,
        }

        http.open(url, param, (res) => {
            if (res && res.ret == 0) {
                if (res.awardList) {
                    this.initParam.awards = res.awardList
                }
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

    onPressNormal(event: cc.Event.EventTouch) {
        cc.audioEngine.playEffect(DataManager.Instance.menuEffect, false)
        NodeExtends.cdButton(event)
        this.getTomorrowAward()
    }

    onPressDouble(event: cc.Event.EventTouch) {
        cc.audioEngine.playEffect(DataManager.Instance.menuEffect, false)
        NodeExtends.cdButton(event)
        receiveAdAward(AdsConfig.taskAdsMap.TomorrowGetMutiple, () => {
            this.getTomorrowAward(true)
        })
    }
}
