import BaseScene from "../base/baseScene/BaseScene";
import DataManager from "../base/baseData/DataManager";
import BaseFunc = require("../base/BaseFunc")
import { iMessageBox, showAwardResultPop, playAD, czcEvent, payOrder, getShopBox, getNowTimeUnix } from "../base/BaseFuncTs";
import { getADAward, sendReloadUserData, exchangeQttCoin } from "./LobbyFunc";
import SceneManager from "../base/baseScene/SceneManager";
import { AdsConfig } from "../base/baseData/AdsConfig";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NationalDayPop extends BaseScene {

    _curAward = []
    _box = null

    onOpenScene() {
        let dValue = getNowTimeUnix() - 1571760000 // 10月23日
        dValue = Math.floor(dValue / (86400 * 7))
        dValue = 1571760000 + 86400 * 7 * dValue
        let dStart = new Date(dValue * 1000)
        let dEnd = new Date((dValue + 86400 * 7) * 1000 - 86400)
        cc.find("nodePop/national_day_bg/national_day_title/date", this.node).getComponent(cc.Label).string = 
            (dStart.getMonth() + 1) + "月" + (dStart.getDate()) + "日" + "-" + (dEnd.getMonth() + 1) + "月" + (dEnd.getDate()) + "日"

        this.getSignConfig()     
        this.initBox()   
    }

    onCloseScene() {

    }

    initSignInfo() {
        let nodeSign = cc.find("nodePop/nodeSign/view/content", this.node)
        // let date = new Date().getDate() 
        let lastSignTime = DataManager.CommonData["nationalSignData"] ? DataManager.CommonData["nationalSignData"][0].signTime : 0
        let lastSignDay = DataManager.CommonData["nationalSignData"] ? DataManager.CommonData["nationalSignData"][0].signDay : 0       
        let now = getNowTimeUnix()
        let todaySign = now - now % 86400 - 28800
        let alreadySign = todaySign < lastSignTime
        for (let item of DataManager.CommonData["nationalSign"]) {
            let nodeDay = nodeSign.getChildByName("day" + item.signDay)
            if (null == nodeDay)
                continue
            let itemConfig = item.itemConfig
            for (let ic of itemConfig) {
                if (ic.itemIndex == 0)
                    cc.find("item1/num", nodeDay).getComponent(cc.Label).string = "x" + ic.itemNum
                else if (ic.itemIndex == 367)
                    cc.find("item2/num", nodeDay).getComponent(cc.Label).string = "x" + ic.itemNum
            }

            nodeDay.getChildByName("btn_award_enable").active = item.signDay <= lastSignDay
            nodeDay.getChildByName("btn_get_awrd").active = item.signDay > lastSignDay   
            if (alreadySign){
                nodeDay.getChildByName("btn_get_awrd").getComponent(cc.Button).interactable = false
            }
            else if (item.signDay == lastSignDay + 1){
                nodeDay.getChildByName("btn_get_awrd").getComponent(cc.Button).interactable = true
                this._curAward = itemConfig
            }
            else{
                nodeDay.getChildByName("btn_get_awrd").getComponent(cc.Button).interactable = false
            }
            
            if (item.signDay <= lastSignDay)
                nodeDay.setSiblingIndex(7)
        }
    }

    onPressSign(event, data) {
        let self = this;
        let awards = []
        for (let ic of self._curAward) {
            awards.push({
                index: ic.itemIndex,
                num: ic.itemNum
            })
        }
        let param = {
            threeAward: true,
            confirmButton: cc.find("nodePop/btn_get_three", self.node),
            confirmFunc: () => {
                czcEvent("大厅", "国庆活动三倍签到1", "看广告 " + (DataManager.CommonData["morrow"] <= 1 ? DataManager.CommonData["morrow"] + "天新用户" : "老用户"))
                playAD(AdsConfig.video.NationalDayPop, () => {
                    czcEvent("大厅", "国庆活动三倍签到2", "看完广告 " + (DataManager.CommonData["morrow"] <= 1 ? DataManager.CommonData["morrow"] + "天新用户" : "老用户"))
                    getADAward(7, () => {  
                        czcEvent("大厅", "国庆活动三倍签到3", "获取奖励 " + (DataManager.CommonData["morrow"] <= 1 ? DataManager.CommonData["morrow"] + "天新用户" : "老用户"))
                        self.getSignAward()
                        sendReloadUserData()
                    })        
                })            
            },
            cancelButton: cc.find("nodePop/btn_normal", self.node),
            callback: () =>{
                self.getSignAward()
            }
        }
        showAwardResultPop(awards, param)
    }

    onPressBuy() {
        payOrder(this._box)
        this.closeSelf()        
    }

    getSignConfig() {
        let url = DataManager.getURL("ACTIVE_SIGN_CONFIG")
        let param = {
            gameid: DataManager.Instance.gameId
        }
    
        let self = this
        BaseFunc.HTTPGetRequest(url, param, function(msg){
            if (DataManager.Instance.isTesting)
                console.log(url)

            if (msg && msg.ret == 0) {
                DataManager.CommonData["nationalSign"] = msg.list
                self.getSignInfo()
            }
        })
    }

    getSignInfo() {
        let url = DataManager.getURL("ACTIVE_SIGN_INFO")
        let param = {
            uid: DataManager.UserData.guid,
            gameid: DataManager.Instance.gameId,
            ticket: DataManager.UserData.ticket
        }
    
        let self = this;
        BaseFunc.HTTPGetRequest(url, param, function(msg){
            if (DataManager.Instance.isTesting)
                console.log(url)

            if (msg && msg.ret == 0) {
                DataManager.CommonData["nationalSignData"] = msg.list                
            }
            self.initSignInfo()
            SceneManager.Instance.sendMessageToScene("updateBottonState")
        })
    }

    getSignAward() {
        let url = DataManager.getURL("ACTIVE_SIGN_EXECUTE")
        let param = {
            uid: DataManager.UserData.guid,
            gameid: DataManager.Instance.gameId,
            ticket: DataManager.UserData.ticket
        }
    
        let self = this
        BaseFunc.HTTPGetRequest(url, param, function(msg){
            if (DataManager.Instance.isTesting)
                console.log(url)
            if (msg) {
                if (msg.ret == 0) {
                    exchangeQttCoin(true)
                    sendReloadUserData()
                }
                iMessageBox(msg.msg)
                self.getSignInfo()
            }
        })
    }

    initBox() {
        if (null == DataManager.Instance.OneYuanBoxs || 0 == DataManager.Instance.OneYuanBoxs.length) {
            getShopBox(2, this.initBox.bind(this))
        }

        let level = DataManager.CommonData["VipData"].vipLevel

        for (let box of DataManager.Instance.OneYuanBoxs) {
            if ((level == 0 && box.price == 20) || 
                (level == 1 && box.price == 20) ||
                (level >= 2 && box.price == 58)){
                this._box = Object.assign(box)
                break;
            }
        }

        if (null == this._box)
            return

        cc.find("nodePop/nodeBuy/item_bg/num", this.node).getComponent(cc.Label).string = "x" + this._box.content[0].num
        cc.find("nodePop/nodeBuy/old_price", this.node).getComponent(cc.Label).string = "原价" + Math.ceil(this._box.content[0].num / 10000) + "元"
        cc.find("nodePop/nodeBuy/now_price", this.node).getComponent(cc.Label).string = "现价" + this._box.price + "元"
        cc.find("nodePop/nodeBuy/btnBuy", this.node).getComponent(cc.Button).interactable = this._box["isBuy"] == 0
    }
}
