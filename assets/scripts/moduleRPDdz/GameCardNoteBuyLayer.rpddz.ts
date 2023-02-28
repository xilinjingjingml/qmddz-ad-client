import BaseFunc = require("../base/BaseFunc")
import SceneManager from "../base/baseScene/SceneManager";
import { playAD, getMD5, iMessageBox, showAwardMutipleResultPop, czcEvent } from "../base/BaseFuncTs";
import DataManager from "../base/baseData/DataManager";
import BaseComponent from "../base/BaseComponent";
import GameLogic from "./GameLogic.rpddz";
import { exchangeAward, getExchangeConfig } from "../moduleLobby/LobbyFunc";

const {ccclass, property} = cc._decorator;

@ccclass
export default class GameCardNoteBuyLayer extends BaseComponent {

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}
    thisComponentName = "GameCardNoteBuyLayer.rpddz"
    thisCost = 500
    exchangeInfo1: any
    exchangeInfo2: any

    onOpenScene() {
        this.updateItem()
    }
    
    updateItem() {
        
        if ( null == DataManager.CommonData["ExchangeInfo"]) {
            getExchangeConfig()
            return
        }
        
        let exchangeInfo = DataManager.CommonData["ExchangeInfo"].filter(item => {
            return item["gainItemList"][0]["gainItem"] == 2
        })
        
        exchangeInfo.forEach(element => {
            if(element["gainItemList"][0]["gainNum"] == 1) {
                this.exchangeInfo1 = element
            }else if(element["gainItemList"][0]["gainNum"] == 10) {
                this.exchangeInfo2 = element
            } 
        });
    }

    __bindButtonHandler() {
        BaseFunc.AddClickEvent(this["btnConfirm1"], this.node, this.thisComponentName, "onPressConfirm1", 0, -1);
        BaseFunc.AddClickEvent(this["btnConfirm2"], this.node, this.thisComponentName, "onPressConfirm2", 0, -1);
        BaseFunc.AddClickEvent(this["btn_close"], this.node, this.thisComponentName, "onPressClose", 0, 3);
    }

    onCloseScene() {
        if (this.initParam["closeCallback"])
            this.initParam["closeCallback"]()
    }

    onPressConfirm1() {
        
        this.buyCardNode(this.exchangeInfo1)

    }

    onPressConfirm2() {

        this.buyCardNode(this.exchangeInfo2)

    }

    buyCardNode(itemInfo) {
        if (!itemInfo) {
            iMessageBox("购买失败，商品不存在，请稍后再试");
            return
        }
        if ((DataManager.UserData.money - itemInfo["exchangeItemList"][0]["exchangeNum"]) <= GameLogic.Instance().serverInfo.minMoney) {
            iMessageBox("购买失败，您的金豆在购买后将小于准入费用！");
            return false
        }

        exchangeAward(itemInfo["goodsId"], () => {
            czcEvent("游戏", "兑换记牌器", "兑换记牌器成功，消耗" + itemInfo["exchangeItemList"][0]["exchangeNum"] + "金豆")
            // SceneManager.Instance.popScene("moduleLobby", "ExchangeSuccPop")
            this.closeSelf()
        })

        return true
    }

    onPressClose() {
        this.close()
    }    
    
    close() {
        SceneManager.Instance.closeScene(this)
    }

    start () {

    }

    // update (dt) {}
}
