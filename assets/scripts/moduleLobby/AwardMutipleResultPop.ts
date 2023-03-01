import BaseComponent from "../base/BaseComponent"
import { getNameByItemId } from "../base/BaseFuncTs"

const { ccclass, property } = cc._decorator

@ccclass
export default class AwardMutipleResultPop extends BaseComponent {

    @property(cc.SpriteFrame)
    icon_item_0: cc.SpriteFrame = null

    @property(cc.SpriteFrame)
    icon_item_2: cc.SpriteFrame = null

    @property(cc.SpriteFrame)
    icon_item_365: cc.SpriteFrame = null

    @property(cc.SpriteFrame)
    icon_item_367: cc.SpriteFrame = null

    @property(cc.SpriteFrame)
    icon_item_368: cc.SpriteFrame = null

    @property(cc.SpriteFrame)
    icon_item_discountcode_2: cc.SpriteFrame = null
    @property(cc.SpriteFrame)
    icon_item_discountcode_10: cc.SpriteFrame = null
    @property(cc.SpriteFrame)
    icon_item_discountcode_20: cc.SpriteFrame = null
    @property(cc.SpriteFrame)
    icon_item_discountcode_100: cc.SpriteFrame = null

    onOpenScene() {
        if (!this.initParam) {
            this.close()
        }

        let nodeContentSelect = this.initParam["awards"].length > 5 ? this["nodeItemContentGrid"] : this["nodeItemContentHori"]
        nodeContentSelect.active = true
        for (let index = 0; index < this.initParam["awards"].length; index++) {
            const element = this.initParam["awards"][index];
            let awardItem = cc.instantiate(this["nodeItemPrefab"])
            awardItem.active = true

            if (element.index > -1) {
                awardItem.getChildByName("sptItemIcon").getComponent(cc.Sprite).spriteFrame = this["icon_item_" + element.index]
                awardItem.getChildByName("num").getComponent(cc.Label).string = element.num
                awardItem.getChildByName("name").getComponent(cc.Label).string = getNameByItemId(element.index)
            } else {
                if (element.index == -1) {
                    awardItem.getChildByName("sptItemIcon").getComponent(cc.Sprite).spriteFrame = this["icon_item_discountcode_" + element.num]
                    awardItem.getChildByName("sptItemIcon").y = 20
                    awardItem.getChildByName("sptItemIcon").scale = 1.5
                    awardItem.getChildByName("num").getComponent(cc.Label).string = ""
                    awardItem.getChildByName("name").getComponent(cc.Label).string = getNameByItemId(element.index)
                }
            }

            nodeContentSelect.addChild(awardItem)
        }

        this["nodeItemPrefab"].active = false
    }

    close() {
        this.closeSelf()
    }

    onCloseScene() {
        if (this.initParam["closeCallback"])
            this.initParam["closeCallback"]()
    }
}
