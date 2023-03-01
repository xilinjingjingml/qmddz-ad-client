import BaseComponent from "../base/BaseComponent"
import { AdsConfig } from "../base/baseData/AdsConfig"
import DataManager from "../base/baseData/DataManager"
import { ITEM, ITEM_NAME } from "../base/baseData/ItemConfig"
import { czcEvent, iMessageBox, playADBanner, showAwardResultPop, CreateNavigateToMiniProgram,TimeFormat } from "../base/BaseFuncTs"
import NetManager from "../base/baseNet/NetManager"
import { checkAdCanReceive, receiveAdAward, getAdLeftTimes, sendReloadUserData, getReliefState } from "../moduleLobby/LobbyFunc"
import AudioManager from "./AudioManager.rpddz"
import GameLogic from "./GameLogic.rpddz"
import SceneManager from "../base/baseScene/SceneManager"

const { ccclass } = cc._decorator

@ccclass
export default class MiniWelfareCenter extends BaseComponent {

    onOpenScene(){
        this.updateItemState()
        this.addListener("onWelfareUpdate", this.onWelfareUpdate.bind(this))
        playADBanner(false, AdsConfig.banner.All)//AdsConfig.banner.GameResultLayer_rpddz
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
        let sta = false
        if(checkAdCanReceive(AdsConfig.taskAdsMap.LotteryShare)) sta = true
        
        cc.find("nodeMain/item_lucky/badge", this.node).getComponent("Badge").updateView(sta)

    }

    updateItem_sign(){
        let sta = false
        const signCheck = DataManager.load(DataManager.UserData.guid + "SignPop" + TimeFormat("yyyy-mm-dd"))
        if(!signCheck) sta = true
        
        cc.find("nodeMain/item_sign/badge", this.node).getComponent("Badge").updateView(sta)

    }

    updateItem_freeGold(){
        let sta = false
        if(getAdLeftTimes(AdsConfig.taskAdsMap.DynamicGold) > 0) sta = true
        
        cc.find("nodeMain/item_freeCoin/badge", this.node).getComponent("Badge").updateView(sta)

    }

    updateItem_bankrupt(){
        let sta = false
        if(DataManager.CommonData["reliefStatus"]["reliefTimes"] > 0 && DataManager.UserData.money < 20000) sta = true
        
        cc.find("nodeMain/item_bankrupt/badge", this.node).getComponent("Badge").updateView(sta)

    }
    
    //1.转盘 2.签到 3.免费金豆 4.破产补助
    onPressLottery() {
        //todo 1.不可领 2.转盘
        if(checkAdCanReceive(AdsConfig.taskAdsMap.LotteryShare)){
            SceneManager.Instance.popScene("moduleLobby", "LotteryPopNew")
        }else{
            iMessageBox("暂不可领",()=>{})
        }

    }

    onPressFreeGold() {
        //todo 1.不可领 2.转盘
        if(getAdLeftTimes(AdsConfig.taskAdsMap.DynamicGold) <= 0){
            iMessageBox("暂不可领",()=>{})
        }else{
            SceneManager.Instance.popScene("moduleLobby", "FreeGoldCoin")
        }

    }

    onPressSign(){
        const signCheck = DataManager.load(DataManager.UserData.guid + "SignPop" + TimeFormat("yyyy-mm-dd"))
        if(!signCheck){
            SceneManager.Instance.popScene("moduleLobby", "SignPop")
        }else{
            iMessageBox("明日再来",()=>{})
        }
    }

    onPressBankrupt(){
        if(DataManager.CommonData["reliefStatus"]["reliefTimes"] <= 0){
            iMessageBox("今日次数用完",()=>{})
        }else{
            if(DataManager.UserData.money >= 20000){
                iMessageBox("暂不可领",()=>{})
            }else{
            SceneManager.Instance.popScene("moduleLobby", "BankruptDefend", {callback: ()=>{getReliefState()}})
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

    onDestroy() {
        //没做控制，但只在结算界面出现
        playADBanner(true, AdsConfig.banner.GameResultLayer_rpddz, ()=>{})
    }
}