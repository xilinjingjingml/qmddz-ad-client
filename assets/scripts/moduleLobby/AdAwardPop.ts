import { AdsConfig } from "../base/baseData/AdsConfig"
import DataManager from "../base/baseData/DataManager"
import { getNameByItemId, getSpriteByItemId, playADBanner } from "../base/BaseFuncTs"
import BaseScene from "../base/baseScene/BaseScene"
import { getNextAdType, receiveAdAward } from "./LobbyFunc"

const { ccclass } = cc._decorator

@ccclass
export default class AdAwardPop extends BaseScene {

    onOpenScene() {
        const index = this.initParam.index

        const nodeIcon = cc.find("nodePop/itemIcon", this.node)
        const originWidth = nodeIcon.width
        const originHeight = nodeIcon.height

        nodeIcon.getComponent(cc.Sprite).spriteFrame = getSpriteByItemId(index)
        nodeIcon.scale = Math.max(originWidth / nodeIcon.width, originHeight / nodeIcon.height)

        const number = this.initParam.number

        if (number <= 0) {
            cc.find("nodePop/labelAward", this.node).getComponent(cc.Label).string = "免费领取大量" + getNameByItemId(index)
        } else {
            cc.find("nodePop/labelAward", this.node).getComponent(cc.Label).string = "免费领取奖励：" + getNameByItemId(index) + "*" + number
        }

        const type = getNextAdType(this.initParam.adindex)
        cc.find("nodePop/New Button/control/sprShare", this.node).active = type == 1
        cc.find("nodePop/New Button/control/sprVideo", this.node).active = type == 2

        cc.find("nodePop/nodeVaule", this.node).active = true
        let num = DataManager.UserData.getItemNum(365)
        let str = num + " ≈ " + (num / 10000).toFixed(2) + "元"
        cc.find("nodePop/nodeVaule/labelValue", this.node).getComponent(cc.Label).string = str

        playADBanner(true, AdsConfig.banner.FreeAward)
    }

    onBannerResize(msg) {
        const node = cc.find("nodePop", this.node)
        const box = node.getBoundingBoxToWorld()
        const diff = msg.rect.height - box.y
        if (diff > 0) {
            node.y += diff
        }
    }

    onPressGetAward() {
        receiveAdAward(this.initParam.adindex, () => {
            this.isValid && this.closeSelf()
            this.initParam.callback && this.initParam.callback()
        })
    }

    onDestroy() {
        playADBanner(false, AdsConfig.banner.FreeAward)
    }
}
