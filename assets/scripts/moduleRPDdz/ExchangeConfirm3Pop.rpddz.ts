import DataManager from "../base/baseData/DataManager"
import { czcEvent, getNameByItemId } from "../base/BaseFuncTs"
import BaseScene from "../base/baseScene/BaseScene"
import { exchangeAward } from "../moduleLobby/LobbyFunc"

const { ccclass, property } = cc._decorator

@ccclass
export default class ExchangeConfirm3Pop extends BaseScene {

    exchangeNum: number = 1
    exchangeNumLabel: cc.Label = null
    exchangePriceLabel: cc.Label = null

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
    icon_item_373: cc.SpriteFrame = null
    @property(cc.SpriteFrame)
    icon_item_375: cc.SpriteFrame = null

    @property(cc.SpriteFrame)
    title_item_2: cc.SpriteFrame = null
    @property(cc.SpriteFrame)
    title_item_373: cc.SpriteFrame = null
    @property(cc.SpriteFrame)
    title_item_375: cc.SpriteFrame = null

    onOpenScene() {
        this.initInfo()
    }

    initInfo() {
        if (null == this.initParam)
            return

        const itemName = getNameByItemId(this.initParam["gainItemList"][0]["gainItem"])
        cc.find("nodePop/labelName", this.node).getComponent(cc.Label).string = itemName + " x" + this.initParam["gainItemList"][0]["gainNum"]

        this.exchangeNum = this.initParam["exchangeItemList"][0]["exchangeNum"]

        this.exchangePriceLabel = cc.find("nodePop/btnExchange/labelPrice", this.node).getComponent(cc.Label)
        this.exchangePriceLabel.string = this.exchangeNum + ""

        let buy = cc.find("nodePop/btnExchange", this.node).getComponent(cc.Button)
        let clickEventHandler = new cc.Component.EventHandler()
        clickEventHandler.target = this.node
        clickEventHandler.component = "ExchangeConfirm3Pop.rpddz"
        clickEventHandler.handler = "onExchange"

        this["onExchange"] = () => {
            // czcEvent("大厅", "兑换红包", "请求兑换" + itemName + " " + DataManager.Instance.userTag)
            this.closeSelf()
            exchangeAward(this.initParam["goodsId"], () => {
                // czcEvent("大厅", "兑换红包", "兑换" + itemName + "成功 " + DataManager.Instance.userTag)
            })
        }

        cc.find("nodePop/exchange_item_frame/goldbean", this.node).getComponent(cc.Sprite).spriteFrame = this["icon_item_" + this.initParam["gainItemList"][0]["gainItem"]]

        cc.find("nodePop/title_bg/exchange_info_string", this.node).getComponent(cc.Sprite).spriteFrame = this["title_item_" + this.initParam["gainItemList"][0]["gainItem"]]
        const gainNum = this.initParam["gainItemList"][0]["gainNum"] == 1 ? "一个" : this.initParam["gainItemList"][0]["gainNum"] + ''
        cc.find("nodePop/labelContent", this.node).getComponent(cc.Label).string = `是否消耗${this.exchangeNum}福卡购买${gainNum}${itemName}?`

        buy.clickEvents.push(clickEventHandler)
    }
}
