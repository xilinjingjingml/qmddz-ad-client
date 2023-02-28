import { AdsConfig } from "../base/baseData/AdsConfig"
import DataManager from "../base/baseData/DataManager"
import { getSpriteByItemId, getUserRole, payOrder, showAwardResultPop } from "../base/BaseFuncTs"
import BaseScene from "../base/baseScene/BaseScene"
import { receiveAdAward } from "./LobbyFunc"

const { ccclass } = cc._decorator

const WeekCardType = 1
const MonthCardType = 2

const CardPrice = {
    [WeekCardType]: 6,
    [MonthCardType]: 25
}

const CardAward = {
    [WeekCardType]: [],
    [MonthCardType]: []
}

@ccclass
export default class MonthCardPop extends BaseScene {

    onOpenScene() {
        this.initItem()
        this.refreshStatus()
        this.runViewEffect()
    }

    runViewEffect() {
        const node = cc.find("nodePop", this.node)
        node.x = 1560
        node.runAction(cc.moveTo(0.4, 0, 0).easing(cc.easeSineOut()))

        const wheel1 = cc.find("nodePop/wheel1", this.node)
        const wheel2 = cc.find("nodePop/wheel2", this.node)

        const rotateAct = cc.rotateBy(0.4, -360).easing(cc.easeSineOut())
        wheel1.runAction(rotateAct)
        wheel2.runAction(rotateAct.clone())
    }

    initItem() {
        const model = cc.find("nodePop/nodeItem", this.node)
        DataManager.Instance.MonthBoxs.forEach((v) => {
            let container = null
            let awards = null
            if (v.price == CardPrice[WeekCardType]) {
                container = cc.find("nodePop/nodeContent/nodeMonthCard1/nodeContainer", this.node)
                awards = CardAward[WeekCardType].length == 0 ? CardAward[WeekCardType] : null
            } else if (CardPrice[MonthCardType]) {
                container = cc.find("nodePop/nodeContent/nodeMonthCard2/nodeContainer", this.node)
                awards = CardAward[MonthCardType].length == 0 ? CardAward[MonthCardType] : null
            }

            if (!container) {
                return
            }

            for (const data of v.content) {
                const item = cc.instantiate(model)
                item.active = true
                item.parent = container
                const icon = item.getChildByName("sprIcon")
                icon.getComponent(cc.Sprite).spriteFrame = getSpriteByItemId(data.idx)
                icon.scale = Math.max(64 / icon.width, 64 / icon.height)
                item.getChildByName("labelNum").getComponent(cc.Label).string = data.num
                item.getChildByName("sprStar").runAction(cc.repeatForever(cc.sequence(
                    cc.spawn(
                        cc.scaleTo(0.5, 2),
                        cc.fadeOut(0.5)
                    ),
                    cc.delayTime(0.5),
                    cc.spawn(
                        cc.scaleTo(0, 1),
                        cc.fadeIn(0)
                    )
                )))

                awards && awards.push({ index: data.idx, num: data.num })
            }
        })
    }

    refreshStatus() {
        // 0 当天未领取 -1 没有购买至尊月卡 -2 已过期 -3 当天已领取
        const data = DataManager.UserData.monthCardStatus
        data.forEach((v, k) => {
            let itemNode = null
            if (k == 0) {
                itemNode = cc.find("nodePop/nodeContent/nodeMonthCard1", this.node)
            } else if (k == 1) {
                itemNode = cc.find("nodePop/nodeContent/nodeMonthCard2", this.node)
            }

            if (!itemNode) {
                return
            }

            itemNode.getChildByName("nodeStatus1").active = false
            itemNode.getChildByName("nodeStatus2").active = false
            itemNode.getChildByName("nodeStatus3").active = false
            itemNode.getChildByName("nodeItemTip").active = false
            itemNode.getChildByName("nodeItemTip").getChildByName("labelRemainDay").getComponent(cc.Label).string = v.remainingDays + "天"

            if (v.ret == 0) {
                itemNode.getChildByName("nodeItemTip").active = true
                itemNode.getChildByName("nodeStatus2").active = true
            } else if (v.ret == -1) {
                itemNode.getChildByName("nodeStatus1").active = true
            } else if (v.ret == -2) {
                itemNode.getChildByName("nodeStatus1").active = true
            } else if (v.ret == -3) {
                itemNode.getChildByName("nodeItemTip").active = true
                itemNode.getChildByName("nodeStatus3").active = true
            }
        })
    }

    onPressTab(event, data) {
		cc.audioEngine.playEffect(DataManager.Instance.menuEffect, false)
        cc.find("nodePop/nodeContent/nodeMonthCard1", this.node).active = data == WeekCardType
        cc.find("nodePop/nodeButton/button1", this.node).getComponent(cc.Button).interactable = data != WeekCardType

        cc.find("nodePop/nodeContent/nodeMonthCard2", this.node).active = data == MonthCardType
        cc.find("nodePop/nodeButton/button2", this.node).getComponent(cc.Button).interactable = data != MonthCardType

        cc.find("nodePop/nodeButton/light", this.node).y = event.target.y + 5
    }

    onPressHelp() {
		cc.audioEngine.playEffect(DataManager.Instance.menuEffect, false)
        cc.find("nodeRule", this.node).active = true
    }

    onPressCloseHelp() {
		cc.audioEngine.playEffect(DataManager.Instance.menuEffect, false)
        cc.find("nodeRule", this.node).active = false
    }

    onPressBuy(event, data) {
		cc.audioEngine.playEffect(DataManager.Instance.menuEffect, false)
        const box = DataManager.Instance.MonthBoxs.filter(item => item.price == CardPrice[data])
        if (box && box.length > 0) {
            payOrder(box[0], () => {
                getUserRole()
                this.isValid && this.closeSelf()
            })
        }
    }

    onPressGetAward(event, data) {
		cc.audioEngine.playEffect(DataManager.Instance.menuEffect, false)
        const adIndex = data == 1 ? AdsConfig.taskAdsMap.WeekCardAward : AdsConfig.taskAdsMap.MonthCardAward
        receiveAdAward(adIndex, () => {
            DataManager.UserData.monthCardStatus[data - 1].ret = -3
            showAwardResultPop(CardAward[data])
            this.isValid && this.refreshStatus()
        })
    }

    onPressClose() {
		cc.audioEngine.playEffect(DataManager.Instance.menuEffect, false)
        this.closeSelf()
    }
}
