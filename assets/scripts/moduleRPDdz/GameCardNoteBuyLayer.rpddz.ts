import BaseFunc = require("../base/BaseFunc")
import BaseComponent from "../base/BaseComponent"
import DataManager from "../base/baseData/DataManager"
import { czcEvent, iMessageBox } from "../base/BaseFuncTs"
import SceneManager from "../base/baseScene/SceneManager"
import { exchangeAward, getExchangeConfig } from "../moduleLobby/LobbyFunc"
import GameLogic from "./GameLogic.rpddz"

const { ccclass } = cc._decorator

@ccclass
export default class GameCardNoteBuyLayer extends BaseComponent {

    thisComponentName = "GameCardNoteBuyLayer.rpddz"
    thisCost = 500
    exchangeInfo1: any
    exchangeInfo2: any

    onOpenScene() {
        this.updateItem()
    }

    updateItem() {
        if (null == DataManager.CommonData.ExchangeInfo) {
            getExchangeConfig()
            return
        }

        let exchangeInfo = DataManager.CommonData.ExchangeInfo.filter(item => {
            return item["gainItemList"][0]["gainItem"] == 2
        })

        exchangeInfo.forEach(element => {
            if (element["gainItemList"][0]["gainNum"] == 1) {
                this.exchangeInfo1 = element
            } else if (element["gainItemList"][0]["gainNum"] == 10) {
                this.exchangeInfo2 = element
            }
        })
    }

    __bindButtonHandler() {
        BaseFunc.AddClickEvent(this["btnConfirm1"], this.node, this.thisComponentName, "onPressConfirm1", 0, -1);
        BaseFunc.AddClickEvent(this["btnConfirm2"], this.node, this.thisComponentName, "onPressConfirm2", 0, -1);
        BaseFunc.AddClickEvent(this["btn_close"], this.node, this.thisComponentName, "onPressClose", 0, 3);
    }

    onCloseScene() {
        const closeCb = this.initParam["closeCallback"]
        closeCb && closeCb()
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
}
