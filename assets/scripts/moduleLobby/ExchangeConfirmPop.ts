import BaseScene from "../base/baseScene/BaseScene";
import DataManager from "../base/baseData/DataManager";
import { iMessageBox, MsgBox, czcEvent } from "../base/BaseFuncTs";
import SceneManager from "../base/baseScene/SceneManager";
import { exchangeAward } from "./LobbyFunc";
import BaseFunc = require("../base/BaseFunc")
import QttPluginWrapper from "../base/QttPluginWrapper";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ExchangeConfirmPop extends BaseScene {

    onOpenScene() {
        czcEvent("大厅", "兑换红包", "请求兑换红包 " + (DataManager.CommonData["morrow"] <= 1 ? DataManager.CommonData["morrow"] + "天新用户" : "老用户"))
        if (null == this.initParam)
            return
        
        let num = this.initParam["gainItemList"][0]["gainNum"];
        // if (this.initParam["gainItemList"][0]["gainItem"] == 332)
        //     num = num / 10
        // let icon = cc.find("nodePop/exchange_item_frame/" + num + "RMB", this.node)
        // if (icon) icon.active = true
        let self = this
        cc.loader.load({ url: this.initParam["goodsImg"], type: "png" }, (err, texture) => {
            if (err) {
                console.log(err)
                return
            }

            if (!self.node)
                return
                
            let icon = cc.find("nodePop/exchange_item_frame/sprite", self.node)
            if (icon)
                icon.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texture)
        })
        
        cc.find("nodePop/labelName", this.node).getComponent(cc.Label).string = this.initParam["goodsName"]

        let price = this.initParam["exchangeItemList"][0]["exchangeNum"]
        if (price >= 10000)
            price = price / 10000 + "万"
        cc.find("nodePop/btnExchange/labelPrice", this.node).getComponent(cc.Label).string = price
        
        let buy = cc.find("nodePop/btnExchange", this.node).getComponent(cc.Button)
        let clickEventHandler = new cc.Component.EventHandler();
        clickEventHandler.target = this.node; 
        clickEventHandler.component = "ExchangeConfirmPop";
        clickEventHandler.handler = "onExchange"; 

        this["onExchange"] = () => {
            czcEvent("大厅", "兑换红包", "请求兑换红包 " + (DataManager.CommonData["morrow"] <= 1 ? DataManager.CommonData["morrow"] + "天新用户" : "老用户"))
            exchangeAward(this.initParam["goodsId"], () => {
                czcEvent("大厅", "兑换红包", "兑换红包成功 " + (DataManager.CommonData["morrow"] <= 1 ? DataManager.CommonData["morrow"] + "天新用户" : "老用户"))
                // SceneManager.Instance.popScene("moduleLobby", "ExchangeSuccPop")
                // iMessageBox(this.initParam["goodsName"] + " 兑换成功")
                QttPluginWrapper.openWithDrawPage()
                self.closeSelf()
            })
        }         
        
        buy.clickEvents.push(clickEventHandler);
    }
}
