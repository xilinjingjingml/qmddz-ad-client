import { confusonFunc } from "../base/confusonFunc";
import { AdsConfig } from "../base/baseData/AdsConfig"
import BaseScene from "../base/baseScene/BaseScene"
import SceneManager from "../base/baseScene/SceneManager"
import { receiveAdAward, checkAdCanReceive, getAdLeftTimes, getReliefState } from "./LobbyFunc"
import DataManager from "../base/baseData/DataManager"
import { TimeFormat, accurateTime, iMessageBox } from "../base/BaseFuncTs";

const { ccclass } = cc._decorator
const LOTTERY_TIME_KEY = "last_lottery_time"
const FREE_GOLD_TIME_KEY = "last_free_gold_time"

enum ITEM_BANKRUPT {
    NONE = -1,
    OVER = 0,
    NO = 1,
    GET = 2
}

enum ITEM_FREE_GOLD {
    NONE = -1,
    OVER = 0,
    NO = 1,
    GET = 2
}

enum ITEM_LOTTERY {
    NONE = -1,
    OVER = 0,
    NO = 1,
    GET = 2
}

@ccclass
export default class WelfareCentrePop extends BaseScene {

    item_bankrupt : ITEM_BANKRUPT = ITEM_BANKRUPT.NONE
    item_free_gold : ITEM_FREE_GOLD = ITEM_FREE_GOLD.NONE
    item_lottery : ITEM_LOTTERY = ITEM_LOTTERY.NONE
    isBusy: boolean = false

    onOpenScene(){
        this.updateItemState()
        this.addListener("onWelfareUpdate", this.onWelfareUpdate.bind(this))
    }

    onPressLottery() {
        if(this.item_lottery == ITEM_LOTTERY.OVER){
        }else if(this.item_lottery == ITEM_LOTTERY.NO){
            if(this.isBusy){
                return
            }
            this.isBusy = true
            iMessageBox("暂不可领",()=>{this.isBusy = false})
        }else if(this.item_lottery == ITEM_LOTTERY.GET){
            SceneManager.Instance.popScene("moduleLobby", "LotteryPopNew")
        }
    }

    onPressFreeGold() {
        if(this.item_free_gold == ITEM_FREE_GOLD.OVER){
        }else if(this.item_free_gold == ITEM_FREE_GOLD.NO){
            if(this.isBusy){
                return
            }
            this.isBusy = true
            iMessageBox("暂不可领", ()=>{this.isBusy = false})
        }else if(this.item_free_gold == ITEM_FREE_GOLD.GET){
            SceneManager.Instance.popScene("moduleLobby", "FreeGoldCoin")
        }
    }

    onPressSign(){
        const signCheck = DataManager.load(DataManager.UserData.guid + "SignPop" + TimeFormat("yyyy-mm-dd"))
        if(!signCheck){
            SceneManager.Instance.popScene("moduleLobby", "SignPop")
        }else{
            if(this.isBusy){
                return
            }
            this.isBusy = true
            iMessageBox("明日再来",()=>{this.isBusy = false})
        }
    }

    onPressBankrupt(){
        if(this.item_bankrupt == ITEM_BANKRUPT.OVER){
        }else if(this.item_bankrupt == ITEM_BANKRUPT.NO){
            if(this.isBusy){
                return
            }
            this.isBusy = true
            iMessageBox("金豆小于20000才可领取补助", ()=>{this.isBusy = false})
        }else if(this.item_bankrupt == ITEM_BANKRUPT.GET) {
            console.log("jin---福利中心，破产1：", )
            SceneManager.Instance.popScene("moduleLobby", "BankruptDefend", {callback: ()=>{getReliefState()}})
        }
    }

    updateItemState(){
        this.updateItem_lottery()
        //todo sign
        this.updateItem_sign()

        this.updateItem_freeGold()
        
        //todo 1.暂不可领 2.立即领取
        this.updateItem_bankrupt()

    }

    updateItem_lottery(){
        const labelTime = cc.find("nodeMain/item_lottery/lbl_0", this.node).getComponent(cc.Label)
        //todo 1.暂不可领 2.可领 3.转盘次数用完
        if(checkAdCanReceive(AdsConfig.taskAdsMap.LotteryShare)){
            const lastOpTime = DataManager.load(LOTTERY_TIME_KEY) || 0
            let cdTime = 90 - (accurateTime() - lastOpTime)
            if(lastOpTime > 0 && cdTime > 0){
                this.item_lottery = ITEM_LOTTERY.NO
                cc.find("nodeMain/item_lottery/icon_kelingqu1", this.node).active = false
                cc.find("nodeMain/item_lottery/icon_goto", this.node).active = false
                this.node.runAction(cc.repeatForever(cc.sequence(
                    cc.callFunc(() => {
                        const s = Math.floor(cdTime % 91)
                        labelTime.string = s + "秒后可领取"
                        cdTime--
                        if (cdTime <= 0) {
                            this.updateItem_lottery()
                        }
                    }),
                    cc.delayTime(1)
                )))
            }else{
                this.item_lottery = ITEM_LOTTERY.GET
                cc.find("nodeMain/item_lottery/icon_kelingqu1", this.node).active = true
                labelTime.string = "立即领取"
                cc.find("nodeMain/item_lottery/icon_goto", this.node).active = true
            }
        }else{
            this.item_lottery = ITEM_LOTTERY.OVER
            cc.find("nodeMain/item_lottery/icon_kelingqu1", this.node).active = false
            labelTime.string = "今日次数已用完"
            cc.find("nodeMain/item_lottery/icon_goto", this.node).active = false
        }
    }

    updateItem_sign(){
        const signCheck = DataManager.load(DataManager.UserData.guid + "SignPop" + TimeFormat("yyyy-mm-dd"))
        if(signCheck){
            cc.find("nodeMain/item_sign/icon_kelingqu1", this.node).active = false
            cc.find("nodeMain/item_sign/lbl_0", this.node).getComponent(cc.Label).string = "明日再来"
            cc.find("nodeMain/item_sign/icon_goto", this.node).active = false
        }else{
            cc.find("nodeMain/item_sign/icon_kelingqu1", this.node).active = true
            cc.find("nodeMain/item_sign/lbl_0", this.node).getComponent(cc.Label).string = "立即前往"
            cc.find("nodeMain/item_sign/icon_goto", this.node).active = true
        }
    }
    updateItem_freeGold(){
        const labelTime = cc.find("nodeMain/item_freeGold/lbl_0", this.node).getComponent(cc.Label)
        //todo 免费领豆：1.倒计时 2.今日次数用完
        // console.log("jin---updateItem_freeGold: ", getAdLeftTimes(AdsConfig.taskAdsMap.DynamicGold))
        if(getAdLeftTimes(AdsConfig.taskAdsMap.DynamicGold) > 0){
            const lastOpTime = DataManager.load(FREE_GOLD_TIME_KEY) || 0
            let cdTime = 90 - (accurateTime() - lastOpTime)

            if(lastOpTime > 0 && cdTime > 0){
                this.item_free_gold = ITEM_FREE_GOLD.NO
                cc.find("nodeMain/item_freeGold/icon_kelingqu1", this.node).active = false
                cc.find("nodeMain/item_freeGold/icon_goto", this.node).active = false
                this.node.runAction(cc.repeatForever(cc.sequence(
                    cc.callFunc(() => {
                        const s = Math.floor(cdTime % 91)
                        labelTime.string = s + "秒后可领取"
                        cdTime--
                        if (cdTime <= 0) {
                            this.updateItem_freeGold()
                        }
                    }),
                    cc.delayTime(1)
                )))
            }else{
                this.item_free_gold = ITEM_FREE_GOLD.GET
                cc.find("nodeMain/item_freeGold/icon_kelingqu1", this.node).active = true
                labelTime.string = "立即领取"
                cc.find("nodeMain/item_freeGold/icon_goto", this.node).active = true
            }
        }else{
            this.item_free_gold = ITEM_FREE_GOLD.OVER
            cc.find("nodeMain/item_freeGold/icon_kelingqu1", this.node).active = false
            labelTime.string = "今日次数用完"
            cc.find("nodeMain/item_freeGold/icon_goto", this.node).active = false
        }
    }

    updateItem_bankrupt(){
        console.log("jin---reliefTimes: ", DataManager.CommonData["reliefStatus"]["reliefTimes"])
        if(DataManager.CommonData["reliefStatus"]["reliefTimes"] <= 0){
            cc.find("nodeMain/item_bankrupt/icon_kelingqu1", this.node).active = false
            cc.find("nodeMain/item_bankrupt/lbl_0", this.node).getComponent(cc.Label).string = "今日次数用完"
            cc.find("nodeMain/item_bankrupt/icon_goto", this.node).active = false
            cc.find("nodeMain/item_bankrupt/lbl_over", this.node).active = true
            this.item_bankrupt = ITEM_BANKRUPT.OVER
        }else{
            if(DataManager.UserData.money >= 20000){
                console.log("jin---301: ", DataManager.UserData.money)
                cc.find("nodeMain/item_bankrupt/icon_kelingqu1", this.node).active = false
                cc.find("nodeMain/item_bankrupt/lbl_0", this.node).getComponent(cc.Label).string = "暂不可领"
                cc.find("nodeMain/item_bankrupt/icon_goto", this.node).active = false
                cc.find("nodeMain/item_bankrupt/lbl_over", this.node).active = false
                this.item_bankrupt = ITEM_BANKRUPT.NO
            }else{ 
                console.log("jin---302: ", DataManager.UserData.money)
                cc.find("nodeMain/item_bankrupt/icon_kelingqu1", this.node).active = true
                cc.find("nodeMain/item_bankrupt/lbl_0", this.node).getComponent(cc.Label).string = "立即前往"
                cc.find("nodeMain/item_bankrupt/icon_goto", this.node).active = true
                cc.find("nodeMain/item_bankrupt/lbl_over", this.node).active = false
                this.item_bankrupt = ITEM_BANKRUPT.GET
            }
        }
    }

    onWelfareUpdate(message){
        console.log("jin---onWelfareUpdate")
        if(!message){
            return
        }

        //todo 1.lottery 2.sign 3.freeGold 4.bankrupt
        if(message.item_name == "lottery"){
            this.updateItem_lottery()
        }else if(message.item_name == "sign"){
            this.updateItem_sign()
        }else if(message.item_name == "freeGold"){
            this.updateItem_freeGold()
        }else if(message.item_name == "bankrupt"){
            this.updateItem_bankrupt()
        }

    }

    onCloseScene(): void {
        SceneManager.Instance.sendMessageToScene({ opcode: "onAdConfigUpdate"})
    }
}