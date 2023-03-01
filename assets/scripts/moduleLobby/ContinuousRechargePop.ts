/**
 * Create by Jin on 2023.1.3
 * 充值福利（连续充值福利）
 */

import { confusonFunc } from "../base/confusonFunc";
import { AdsConfig } from "../base/baseData/AdsConfig"
import DataManager from "../base/baseData/DataManager"
import { iMessageBox, payOrder, getLowMoneyRoom, setGray, getShopBox, getNowTimeUnix, enterGame, unenoughGold, getMD5, showAwardResultPop, getSpriteByItemId, czcEvent } from "../base/BaseFuncTs"
import BaseScene from "../base/baseScene/BaseScene"
import WxWrapper from "../base/WxWrapper"
import { checkAdCanReceive, receiveAdAward, sendReloadUserData, remindNationalDay } from "./LobbyFunc"
import { http } from "../base/utils/http";
import SceneManager from "../base/baseScene/SceneManager"
import NetManager from "../base/baseNet/NetManager";
import BaseFunc = require("../base/BaseFunc")
import { ITEM, ITEM_NAME } from "../base/baseData/ItemConfig";


const { ccclass } = cc._decorator

@ccclass
export default class ContinuousRechargePop extends BaseScene {

    _curAward = []
    _box = null
    _totalPay = null
    onLoad(){
        this.getSignConfig()
        // this.getSelfPayTotal(0,(msg)=>{})
    }

    getSignConfig() {
        let url = DataManager.getURL("ACTIVE_SIGN_CONFIG")
        let param = {
            gameid: 3
        }

        let self = this
        http.open(url, param, function (msg) {
            // console.log("jin---getSignConfig: ", url, param, msg)

            if (msg && msg.ret == 0) {
                DataManager.CommonData["ContinuousSign"] = msg.list
                self.getSignInfo()
            }
        })
    }

    getSignInfo() {
        let url = DataManager.getURL("ACTIVE_SIGN_INFO")
        let param = {
            uid: DataManager.UserData.guid,
            gameid: 3,
            ticket: DataManager.UserData.ticket
        }

        let self = this;
        http.open(url, param, function (msg) {
            console.log(url)
            // console.log("jin---getSignInfo: ", url, param, msg)
            if (msg && msg.ret == 0) {
                DataManager.CommonData["ContinuousSignData"] = msg.list
            }
            self.initSignInfo()
        })
    }

    getSignAward(callBack) {
        let url = DataManager.getURL("ACTIVE_SIGN_EXECUTE")
        let param = {
            uid: DataManager.UserData.guid,
            gameid: 3,
            ticket: DataManager.UserData.ticket
        }

        let self = this
        http.open(url, param, function (msg) {
            console.log(url)
            // console.log("jin---getSignAward: ", url, param, msg)
            if (msg) {
                if (msg.ret == 0) {
                    callBack && callBack()
                    remindNationalDay(3)
                }
                if(msg.msg != "签到成功"){
                    iMessageBox(msg.msg)
                }
                
                self.getSignInfo()
            }
        })
    }


    initSignInfo(){
        let model = cc.find("item", this.node)
        const layout = cc.find("sign_ScrollView/view/content", this.node)
        let i = 0
        let lastSignTime = DataManager.CommonData["ContinuousSignData"] ? DataManager.CommonData["ContinuousSignData"][0].signTime : 0
        let lastSignDay = DataManager.CommonData["ContinuousSignData"] ? DataManager.CommonData["ContinuousSignData"][0].signDay : 0
        let repeatTime = DataManager.CommonData["ContinuousSignData"] ? DataManager.CommonData["ContinuousSignData"][0].signRepeatTime : 0
        let now = getNowTimeUnix()
        let todaySign = now - now % 86400
        let alreadySign = todaySign < lastSignTime
        //1.初始化item  2.刷新item
        this.getSelfPayTotal(0,(msg)=>{
            if(layout.children.length == 0){
                for(let curData of DataManager.CommonData["ContinuousSign"]){
                    // cc.log("jin---initSignInfo: ",curData) 
                    // alreadySign = todaySign < lastSignTime
                    let item = cc.instantiate(model)
                    this.setItem(item, curData, i, alreadySign, lastSignDay, repeatTime, msg)
                    item.parent = layout
                    ++i
                }
            }else{
                for(let curIdx in DataManager.CommonData["ContinuousSign"]){
                    this.setItem(layout.children[curIdx], DataManager.CommonData["ContinuousSign"][curIdx], i, alreadySign, lastSignDay, repeatTime, msg)
                    ++i
                }
            }

        })
        
    }

    setItem(item, data, i ,alreadySign, lastSignDay, repeatTime, msg){
        // console.log("jin---setItem: ",data, alreadySign, lastSignDay)
        BaseFunc.AddClickEvent(cc.find("btn_get", item), this.node, "NationalDayNewPop", "onPressSignGet", i);
        cc.find("lbl_day", item).getComponent(cc.Label).string = "充值任意金额" + Number(data.signDay) + "天"

        for(let idx in data.itemConfig){
            cc.find("node_" + idx , item).active = true
            cc.find("node_" + idx + "/gold_icon_2", item).getComponent(cc.Sprite).spriteFrame = getSpriteByItemId(data.itemConfig[idx].itemIndex)
            cc.find("node_" + idx + "/lbl", item).getComponent(cc.Label).string = data.itemConfig[idx].itemNum
        }

        // console.log("jin---btn_over: ", data.signDay, lastSignDay, alreadySign)
        //目前没有循环签到，循环一次后默认不再领取
        if(repeatTime === 1){
            item.getChildByName("btn_over").active = true
            item.getChildByName("btn_undone").active = false
            item.getChildByName("btn_get").active = false
            return
        }
        item.getChildByName("btn_over").active = data.signDay <= lastSignDay
        item.getChildByName("btn_get").active = !alreadySign && data.signDay == lastSignDay + 1 && msg.todayPayTotal > 0
        item.getChildByName("btn_undone").active = alreadySign? data.signDay > lastSignDay : data.signDay > lastSignDay + 1
        item.getChildByName("btn_recharge").active = !alreadySign && data.signDay == lastSignDay + 1 && msg.todayPayTotal == 0
        item.getChildByName("btn_get").active && (this._curAward = data.itemConfig)
    }

    //今日累计充值
    getSelfPayTotal(flag:number = 0, callBack){
        let url = DataManager.getURL("PAY_TOTAL")
        let params = {
            pid: DataManager.UserData.guid,
            ticket: DataManager.UserData.ticket,
            flag: flag
        };

        let self = this
        http.open(url, params, function (msg) {
            console.log(url)
            // console.log("jin---getSelfPayTotal: ", url, params, msg)
            if (msg) {
                this._totalPay = msg
                callBack && callBack(msg)
            }
        })
    }

        
    onPressSignGet(EventTouch, data){
        let self = this;
        let awards = []
        for (let ic of self._curAward) {
            awards.push({
                index: ic.itemIndex,
                num: ic.itemNum
            })
        }
        
        this.getSignAward(()=>{
            czcEvent("新春充值福利" + DataManager.Instance.userTag)
            showAwardResultPop(awards)
            sendReloadUserData()
        })
    }

    onPressBuy(){
        SceneManager.Instance.popScene("moduleLobby", "OneYuanBigBoxPopNew", {successCallback: this.getSignInfo()})
    } 

    onPressHelp(){
        SceneManager.Instance.popScene("moduleLobby", "CommonTipPop", {idx : 6})
    }

    updateUserDate(message){
        this.getSignInfo()
    }
}