import BaseScene from "../base/baseScene/BaseScene";
import DataManager from "../base/baseData/DataManager";
import { iMessageBox, MsgBox, czcEvent } from "../base/BaseFuncTs";
import SceneManager from "../base/baseScene/SceneManager";
import BaseFunc = require("../base/BaseFunc")
import { getVipConfig, exchangeAward } from "./LobbyFunc";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ExchangeConfirm2Pop extends BaseScene {

    exchangeNum: number = 1;    
    exchangeNumLabel: cc.Label = null
    exchangePriceLabel: cc.Label = null
    
    onOpenScene() {
        if (null == DataManager.CommonData["VipInfo"])
            getVipConfig(this.updateVipInfo.bind(this))        
        else
            this.updateVipInfo()        
    }

    updateVipInfo(){
        if (null == this.initParam)
            return
        
        cc.find("nodePop/labelName", this.node).getComponent(cc.Label).string = this.initParam["gainItemList"][0]["gainNum"] + "jd"

        this.exchangeNum = this.initParam["gainItemList"][0]["gainNum"] / 10000;

        this.exchangePriceLabel = cc.find("nodePop/btnExchange/labelPrice", this.node).getComponent(cc.Label)
        this.exchangePriceLabel.string = this.exchangeNum + "万"

        let raise = 0
        for (const iterator of DataManager.CommonData["VipInfo"]) {
            if (iterator["vipLv"] == (DataManager.CommonData["VipData"].vipLevel)){
                raise = iterator["sendProportion"]
            }
        }
        raise = raise * this.initParam["gainItemList"][0]["gainNum"]    
        if (raise > 0) {            
            cc.find("nodePop/vipRaise", this.node).getComponent(cc.Label).string = "VIP" + DataManager.CommonData["VipData"].vipLevel + "额外赠送" + raise.toFixed(0) + "金豆"
        }else {
            cc.find("nodePop/vipRaise", this.node).getComponent(cc.Label).string = ""
        }
        

        // if (this.initParam["gainItemList"][0]["gainItem"] != 0){
        //     let self = this
        //     this.initParam["goodsImg"] = this.initParam["goodsImg"].replace("http://", "https://")
        //     cc.loader.load({url: this.initParam["goodsImg"], type: "png"}, (err, texture) => {
        //         if (err) {
        //             console.log(err)
        //         }
        //         else{
        //             cc.find("nodePop/exchange_item_frame/goldbean", self.node).getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texture)  
        //         }
        //     })
        //     cc.find("nodePop/labelTip", this.node).active = false            
        // }

        let buy = cc.find("nodePop/btnExchange", this.node).getComponent(cc.Button)
        let clickEventHandler = new cc.Component.EventHandler();
        clickEventHandler.target = this.node; 
        clickEventHandler.component = "ExchangeConfirm2Pop";
        clickEventHandler.handler = "onExchange"; 

        let self = this
        this["onExchange"] = () => {
            czcEvent("大厅", "兑换红包", "请求兑换金豆 " + (DataManager.CommonData["morrow"] <= 1 ? DataManager.CommonData["morrow"] + "天新用户" : "老用户"))
            exchangeAward(this.initParam["goodsId"], () => {
                czcEvent("大厅", "兑换红包", "兑换金豆成功 " + (DataManager.CommonData["morrow"] <= 1 ? DataManager.CommonData["morrow"] + "天新用户" : "老用户"))
                // SceneManager.Instance.popScene("moduleLobby", "ExchangeSuccPop")
                self.closeSelf()
            })
        }         
        
        buy.clickEvents.push(clickEventHandler);
    }
}
