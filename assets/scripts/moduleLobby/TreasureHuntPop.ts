import { AdsConfig } from "../base/baseData/AdsConfig"
import DataManager from "../base/baseData/DataManager"
import { ITEM } from "../base/baseData/ItemConfig"
import { getNameByItemId } from "../base/BaseFuncTs"
import BaseScene from "../base/baseScene/BaseScene"
import { checkAdCanReceive, getAdLeftTimes, receiveAdAward } from "./LobbyFunc"

const { ccclass } = cc._decorator

@ccclass
export default class TreasureHuntPop extends BaseScene {

    onOpenScene() {
        this.initAwards()
        this.initChestAni()
        this.updateState()
    }

    updateState() {
        const canReceive = checkAdCanReceive(AdsConfig.taskAdsMap.TreasureHunt)
        const chests = cc.find("nodePop/nodeChest", this.node).children

        for (const chest of chests) {
            const btn = chest.getChildByName("btnGetAward")
            btn.getComponent(cc.Button).interactable = canReceive
        }

        cc.find("nodePop/counttip/count", this.node).getComponent(cc.Label).string = "" + getAdLeftTimes(AdsConfig.taskAdsMap.TreasureHunt)
    }

    initAwards() {
        const awards = DataManager.Instance.getOnlineParamGray("TreasureHunt_awards") || [
            { index: ITEM.REDPACKET_TICKET, num: "60~600" },
            { index: ITEM.GOLD_COIN, num: "2万~20万" },
            { index: ITEM.CARD_RECORD, num: "1~5" },
            { index: ITEM.LOOK_LORDCARD, num: "1~5" },
            { index: ITEM.SUPER_JIABEI, num: "1~5" }
        ] //在线参数

        const content = cc.find("nodePop/nodeAwards/view/content", this.node)
        const model = cc.find("nodePop/nodeAwards/view/nodeItem", this.node)
        for (const val of awards) {
            const item = cc.instantiate(model)

            const icon = cc.find("item/item" + val.index, item)
            icon && (icon.active = true)
            cc.find("tip/labelNum", item).getComponent("cc.Label").string = getNameByItemId(val.index) + ":" + val.num

            item.active = true
            item.position = cc.Vec2.ZERO
            content.addChild(item)
        }
    }

    initChestAni() {
        const chests = cc.find("nodePop/nodeChest", this.node).children

        for (let i = 0, len = chests.length; i < len; i++) {
            const target = chests[i].getChildByName("chest")
            target.runAction(cc.sequence(
                cc.delayTime(0.5 * i),
                cc.callFunc(() => {
                    target.runAction(cc.repeatForever(cc.sequence(
                        cc.moveTo(1, cc.v2(2, 70)),
                        cc.moveTo(1, cc.v2(2, 50))
                    )))
                })
            ))
        }
    }

    onPressDraw() {
        cc.audioEngine.playEffect(DataManager.Instance.menuEffect, false)
        receiveAdAward(AdsConfig.taskAdsMap.TreasureHunt, () => {
            this.isValid && this.updateState()
        })
    }

    onPressClose() {
		cc.audioEngine.playEffect(DataManager.Instance.menuEffect, false)
        this.closeSelf()
    }
}
}
