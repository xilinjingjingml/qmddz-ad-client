/**
 * Create by Jin on 2022.12.18
 */

import { confusonFunc } from "../base/confusonFunc";
import { AdsConfig } from "../base/baseData/AdsConfig"
import DataManager from "../base/baseData/DataManager"
import { czcEvent, iMessageBox, payOrder, getLowMoneyRoom, setGray, getShopBox, getNowTimeUnix, enterGame, unenoughGold, getMD5, showAwardResultPop, getSpriteByItemId } from "../base/BaseFuncTs"
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
export default class NationalDayNewPop extends BaseScene {

    CHINA = ["一","二","三","四","五","六","七","八","九","十"]
    _curAward = []
    _box = null
    _totalPay = null

    onLoad() {
        this.getSignConfig()
        this.getSelfPayTotal(0,(msg)=>{this.initBox(msg)})
    }

    initSignInfo(){
        let model = cc.find("item", this.node)
        const layout = cc.find("sign_ScrollView/view/content", this.node)
        let i = 0
        let lastSignTime = DataManager.CommonData["nationalSignData"] ? DataManager.CommonData["nationalSignData"][0].signTime : 0
        let lastSignDay = DataManager.CommonData["nationalSignData"] ? DataManager.CommonData["nationalSignData"][0].signDay : 0
        let repeatTime = DataManager.CommonData["nationalSignData"] ? DataManager.CommonData["nationalSignData"][0].signRepeatTime : 0
        let now = getNowTimeUnix()
        let todaySign = now - now % 86400
        let alreadySign = todaySign < lastSignTime
        //1.初始化item  2.刷新item

        if(layout.children.length == 0){
            for(let curData of DataManager.CommonData["nationalSign"]){
                // cc.log("jin---initSignInfo: ",curData) 
                let item = cc.instantiate(model)
                this.setItem(item, curData, i, alreadySign, lastSignDay, repeatTime)
                item.parent = layout
                ++i
            }
        }else{
            for(let curIdx in DataManager.CommonData["nationalSign"]){
                console.log("jin---initSignInfo: ", layout.children[curIdx], DataManager.CommonData["nationalSign"][curIdx]) 
                this.setItem(layout.children[curIdx], DataManager.CommonData["nationalSign"][curIdx], i, alreadySign, lastSignDay, repeatTime)
                ++i
            }
        }
    }

    setItem(item, data, i ,alreadySign, lastSignDay, repeatTime){
        // console.log("jin---setItem: ",data, alreadySign, lastSignDay)
        BaseFunc.AddClickEvent(cc.find("btn_get", item), this.node, "NationalDayNewPop", "onPressSignGet", i);
        cc.find("lbl_day", item).getComponent(cc.Label).string = "第" + this.CHINA[Number(data.signDay) - 1] + "天"

        for(let idx in data.itemConfig){
            cc.find("node_" + idx , item).active = true
            // console.log("jin---initBox222: ", getSpriteByItemId(data.itemConfig[idx].itemIndex).getRect(), 
            // cc.find("node_" + idx + "/gold_icon_2", item).getComponent(cc.Sprite).spriteFrame.getRect())
            cc.find("node_" + idx + "/gold_icon_2", item).getComponent(cc.Sprite).spriteFrame = getSpriteByItemId(data.itemConfig[idx].itemIndex)
            // cc.find("node_" + idx + "/gold_icon_2", item).getComponent(cc.Sprite).spriteFrame.setRect(getSpriteByItemId(data.itemConfig[idx].itemIndex).getRect())
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
        item.getChildByName("btn_get").active = !alreadySign && data.signDay == lastSignDay + 1
        item.getChildByName("btn_undone").active = alreadySign? data.signDay > lastSignDay : data.signDay > lastSignDay + 1
        item.getChildByName("btn_get").active && (this._curAward = data.itemConfig)
    }

    getSignConfig() {
        let url = DataManager.getURL("ACTIVE_SIGN_CONFIG")
        let param = {
            gameid: DataManager.Instance.gameId
        }

        let self = this
        http.open(url, param, function (msg) {
            console.log("jin---getSignConfig: ", url, param, msg)

            if (msg && msg.ret == 0) {
                DataManager.CommonData["nationalSign"] = msg.list
                console.log("jin---nationalDay: ", msg)
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
        http.open(url, param, function (msg) {
            console.log(url)
            console.log("jin---getSignInfo: ", url, param, msg)
            if (msg && msg.ret == 0) {
                DataManager.CommonData["nationalSignData"] = msg.list
            }
            self.initSignInfo()
        })
    }

    getSignAward(callBack) {
        let url = DataManager.getURL("ACTIVE_SIGN_EXECUTE")
        let param = {
            uid: DataManager.UserData.guid,
            gameid: DataManager.Instance.gameId,
            ticket: DataManager.UserData.ticket
        }

        let self = this
        http.open(url, param, function (msg) {
            console.log(url)
            console.log("jin---getSignAward: ", url, param, msg)
            if (msg) {
                if (msg.ret == 0) {
                    callBack && callBack()
                    // sendReloadUserData()
                }
                iMessageBox(msg.msg)
                self.getSignInfo()
                remindNationalDay()
            }
        })
    }

    onPressSignGet(EventTouch, data){
        czcEvent("登录奖励" + DataManager.Instance.userTag)
        let self = this;
        let awards = []
        console.log("jin---onPressSignGet: ", self._curAward)
        for (let ic of self._curAward) {
            awards.push({
                index: ic.itemIndex,
                num: ic.itemNum
            })
        }

        // let param = {
        //     threeAward: true,
        //     confirmButton: cc.find("nodePop/btn_get_three", self.node),
        //     confirmFunc: () => {
        //         // czcEvent("大厅", "国庆活动三倍签到1", "看广告 " + DataManager.Instance.userTag)
        //         receiveAdAward(AdsConfig.taskAdsMap.NationalDayPop, () => {
        //             // czcEvent("大厅", "国庆活动三倍签到3", "获取奖励 " + DataManager.Instance.userTag)
        //             this.getSignAward()
        //             sendReloadUserData()
        //         })
        //     },
        //     cancelButton: cc.find("nodePop/btn_normal", self.node),
        //     callback: () => {
        //         self.getSignAward()
        //     }
        // }
        // showAwardResultPop(awards, param)

        this.getSignAward(()=>{
            // receiveAdAward(AdsConfig.taskAdsMap.NationalDayPop, () => {
                showAwardResultPop(awards)
                sendReloadUserData()
            // }, null, true, 0)
            
        })
    }

    onPressBuy(){
        payOrder(this._box,()=>{
            this.closeSelf()
            let awards = [
            ]
            for (const iterator of this._box.content) {
                let award = {
                    index: iterator.idx,
                    num: iterator.num
                }
                awards.push(award)
            }
            showAwardResultPop(awards)
            sendReloadUserData()
        })
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
            console.log("jin---getSelfPayTotal: ", url, params, msg)
            if (msg) {
                // if (msg.ret == 0) {
                    this._totalPay = msg
                    callBack && callBack(msg)

                // }
            }
        })
    }
    
    initBox(msg) {
        console.log("jin---initBox: ", DataManager.Instance.SignWelfareBoxs, this._totalPay, msg)
        if (msg.todayPayTotal <= 10) {
            this._box = (<any>Object).assign(DataManager.Instance.SignWelfareBoxs[0])
        }
        if (msg.todayPayTotal <= 50 && msg.todayPayTotal > 10) {
            this._box = (<any>Object).assign(DataManager.Instance.SignWelfareBoxs[1])
        }
        if (msg.todayPayTotal > 50) {
            this._box = (<any>Object).assign(DataManager.Instance.SignWelfareBoxs[2])
        }

        if (null == this._box)
            return

        if(this._box.isBuy == 1){
            cc.find("nodeBuy/btnBuy", this.node).active = false
            return
        }
        
        cc.find("nodeBuy/old_price", this.node).getComponent(cc.Label).string = "原价" + this._box.boxvalue + "元"
        cc.find("nodeBuy/now_price", this.node).getComponent(cc.Label).string = "现价" + this._box.price + "元"
        // setGray(cc.find("nodeBuy/btnBuy", this.node), 0)

        //每日超值礼包
        // cc.find("node_todayWelfare/node_oldPrice/lbl", this.node).getComponent(cc.Label).string = "" + this._box.boxvalue
        // cc.find("node_todayWelfare/node_newPrice/lbl", this.node).getComponent(cc.Label).string = "" + this._box.price

        for(let i = 0; i < 3; i++){
            cc.find("node_item" + i + "/lbl_num", this.node).getComponent(cc.Label).string = "" + this._box.content[i].num
            cc.find("node_item" + i + "/gold_icon", this.node).getComponent(cc.Sprite).spriteFrame = getSpriteByItemId(this._box.content[i].idx)
            // cc.find("node_item" + i + "/gold_icon", this.node).getComponent(cc.Sprite).spriteFrame.setRect(getSpriteByItemId(this._box.content[i].idx).getRect())
            
        }

    }

}