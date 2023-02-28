import BaseScene from "../base/baseScene/BaseScene";
import DataManager from "../base/baseData/DataManager";
import { iMessageBox, MsgBox, czcEvent } from "../base/BaseFuncTs";
import { getVipConfig, exchangeAward, exchangeAwardCheck } from "./LobbyFunc";
import { AdsConfig } from "../base/baseData/AdsConfig";
import SceneManager from "../base/baseScene/SceneManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ExchangeConfirm3Pop extends BaseScene {

    exchangeNum: number = 1;    
    exchangeNumLabel: cc.Label = null
    exchangePriceLabel: cc.Label = null
    
    @property(cc.SpriteFrame)
    icon_item_0:cc.SpriteFrame = null;
    @property(cc.SpriteFrame)
    icon_item_2:cc.SpriteFrame = null;
    @property(cc.SpriteFrame)
    icon_item_365:cc.SpriteFrame = null;
    @property(cc.SpriteFrame)
    icon_item_367:cc.SpriteFrame = null;
    @property(cc.SpriteFrame)
    icon_item_368:cc.SpriteFrame = null;
    @property(cc.SpriteFrame)
    icon_item_373:cc.SpriteFrame = null;

    item_name = {
        ["0"]: "金豆",
        ["2"]: "记牌器",
        ["365"]: "红包券",
        ["367"]: "趣金币",
        ["368"]: "豆浆机",
        ["373"]: "超级加倍卡",
    }

    onOpenScene() {
        this.initInfo()   
    }

    getItemName(id) {
        return this.item_name[id]
    }

    initInfo(){
        if (null == this.initParam)
            return
        
        cc.find("nodePop/labelName", this.node).getComponent(cc.Label).string = this.initParam["gainItemList"][0]["gainNum"] + this.getItemName(this.initParam["gainItemList"][0]["gainItem"])
        cc.find("nodePop/vipRaise", this.node).active = false

        this.exchangeNum = this.initParam["exchangeItemList"][0]["exchangeNum"];

        this.exchangePriceLabel = cc.find("nodePop/btnExchange/labelPrice", this.node).getComponent(cc.Label)
        //this.exchangePriceLabel.string = this.exchangeNum >= 10000 ? this.exchangeNum / 10000 + "万购买" : this.exchangeNum / 1000 + "千购买"
        this.exchangePriceLabel.string = this.exchangeNum  + ""
        if (this.initParam["content"]) {
            cc.find("nodePop/labelContent", this.node).active = true
            cc.find("nodePop/labelName", this.node).active = false
            cc.find("nodePop/exchange_item_frame", this.node).active = false
            cc.find("nodePop/labelContent", this.node).getComponent(cc.RichText).string = this.initParam["content"]
        }

        let buy = cc.find("nodePop/btnExchange", this.node).getComponent(cc.Button)
        let clickEventHandler = new cc.Component.EventHandler();
        clickEventHandler.target = this.node; 
        clickEventHandler.component = "ExchangeConfirm3Pop";
        clickEventHandler.handler = "onExchange"; 

        let self = this
        this["onExchange"] = () => {
            if (!exchangeAwardCheck(this.initParam)) {
                if(DataManager.CommonData["adNum"][AdsConfig.taskAdsMap.DrawDiamond].allNum <= DataManager.CommonData["adNum"][AdsConfig.taskAdsMap.DrawDiamond].countNum) {
                    iMessageBox("您当前的钻石量不足")
                    return
                }
                SceneManager.Instance.popScene("moduleLobby", "UnenoughDiamondPop")
                return
            }
            czcEvent("大厅", "兑换红包", "请求兑换" + this.getItemName(this.initParam["gainItemList"][0]["gainItem"]) + " " + (DataManager.CommonData["morrow"] <= 1 ? DataManager.CommonData["morrow"] + "天新用户" : "老用户"))
            exchangeAward(this.initParam["goodsId"], () => {
                czcEvent("大厅", "兑换红包", "兑换" + this.getItemName(this.initParam["gainItemList"][0]["gainItem"]) + "成功 " + (DataManager.CommonData["morrow"] <= 1 ? DataManager.CommonData["morrow"] + "天新用户" : "老用户"))
                // this.sendMessage("updateUserInfo")
                self.closeSelf()
            })
        }     
        
        cc.find("nodePop/exchange_item_frame/goldbean", this.node).getComponent(cc.Sprite).spriteFrame = this["icon_item_" + this.initParam["gainItemList"][0]["gainItem"]]
        
        buy.clickEvents.push(clickEventHandler);
    }
}
