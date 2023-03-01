import { AdsConfig } from "../base/baseData/AdsConfig"
import DataManager from "../base/baseData/DataManager"
import { czcEvent, getNameByItemId, iMessageBox } from "../base/BaseFuncTs"
import BaseScene from "../base/baseScene/BaseScene"
import SceneManager from "../base/baseScene/SceneManager"
import { checkAdCanReceive, exchangeAward, exchangeAwardCheck } from "./LobbyFunc"

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

    onOpenScene() {
        this.initInfo()
    }

    initInfo() {
        if (null == this.initParam)
            return

        cc.find("nodePop/labelName", this.node).getComponent(cc.Label).string = this.initParam["gainItemList"][0]["gainNum"] + getNameByItemId(this.initParam["gainItemList"][0]["gainItem"])
        cc.find("nodePop/vipRaise", this.node).active = false

        this.exchangeNum = this.initParam["exchangeItemList"][0]["exchangeNum"]

        this.exchangePriceLabel = cc.find("nodePop/btnExchange/labelPrice", this.node).getComponent(cc.Label)
        this.exchangePriceLabel.string = this.exchangeNum + ""
        if (this.initParam["content"]) {
            cc.find("nodePop/labelContent", this.node).active = true
            cc.find("nodePop/labelName", this.node).active = false
            cc.find("nodePop/exchange_item_frame", this.node).active = false
            cc.find("nodePop/labelContent", this.node).getComponent(cc.RichText).string = this.initParam["content"]
        }

        let buy = cc.find("nodePop/btnExchange", this.node).getComponent(cc.Button)
        let clickEventHandler = new cc.Component.EventHandler()
        clickEventHandler.target = this.node
        clickEventHandler.component = "ExchangeConfirm3Pop"
        clickEventHandler.handler = "onExchange"

        this["onExchange"] = () => {
            if (!exchangeAwardCheck(this.initParam)) {
                if (!checkAdCanReceive(AdsConfig.taskAdsMap.DrawDiamond)) {
                    iMessageBox("您当前的钻石量不足")
                    return
                }
                SceneManager.Instance.popScene("moduleLobby", "UnenoughDiamondPop")
                return
            }

            const itemName = getNameByItemId(this.initParam["gainItemList"][0]["gainItem"])
            czcEvent("大厅", "兑换红包", "请求兑换" + itemName + " " + DataManager.Instance.userTag)
            exchangeAward(this.initParam["goodsId"], () => {
                czcEvent("大厅", "兑换红包", "兑换" + itemName + "成功 " + DataManager.Instance.userTag)
                this.closeSelf()
            })
        }

        cc.find("nodePop/exchange_item_frame/goldbean", this.node).getComponent(cc.Sprite).spriteFrame = this["icon_item_" + this.initParam["gainItemList"][0]["gainItem"]]

        buy.clickEvents.push(clickEventHandler)
    }
}
