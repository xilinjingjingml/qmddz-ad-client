import BaseComponent from "../base/BaseComponent";
import BaseScene from "../base/baseScene/BaseScene";
import BaseFunc = require("../base/BaseFunc")
import DataManager from "../base/baseData/DataManager";
import { payOrder, showAwardResultPop } from "../base/BaseFuncTs";
import { getMonthCardAward, getMonthCardStatus, sendReloadUserData } from "./LobbyFunc";

const {ccclass, property} = cc._decorator;

@ccclass
export default class MonthCardPop extends BaseComponent {


    thisComponentName:string = "MonthCardPop"

    _flyBack:boolean = false;
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}
    
    __bindButtonHandler() {
        cc.log("__bindButtonHandler")
        BaseFunc.AddClickEvent(this["nodeMonthCard1"].getChildByName("nodeStatus1").getChildByName("btnBuy"), this.node, this.thisComponentName, "onPressBuyMonthCard", 10, 1);  
        BaseFunc.AddClickEvent(this["nodeMonthCard2"].getChildByName("nodeStatus1").getChildByName("btnBuy"), this.node, this.thisComponentName, "onPressBuyMonthCard", 30, 1);  
        BaseFunc.AddClickEvent(this["nodeMonthCard3"].getChildByName("nodeStatus1").getChildByName("btnBuy"), this.node, this.thisComponentName, "onPressBuyMonthCard", 12, 1);  

        BaseFunc.AddClickEvent(this["nodeMonthCard1"].getChildByName("nodeStatus2").getChildByName("btnBuy"), this.node, this.thisComponentName, "onPressGetAwardMonthCard", 2, 1);  
        BaseFunc.AddClickEvent(this["nodeMonthCard2"].getChildByName("nodeStatus2").getChildByName("btnBuy"), this.node, this.thisComponentName, "onPressGetAwardMonthCard", 1, 1);  
        BaseFunc.AddClickEvent(this["nodeMonthCard3"].getChildByName("nodeStatus2").getChildByName("btnBuy"), this.node, this.thisComponentName, "onPressGetAwardMonthCard", 3, 1);  
        BaseFunc.AddClickEvent(this["maskLayer"], this.node, this.thisComponentName, "onPressMask", 0, 0);
    }

    __preloadAfter() {        
        getMonthCardStatus(1)
        getMonthCardStatus(2)      
        getMonthCardStatus(3)  
    }

    onOpenScene() {
        cc.log(DataManager.Instance.MonthBoxs)
        cc.log(DataManager.UserData.monthCardStatus)

        this._flyBack = DataManager.CommonData["flyBack"]

        this.addListener("updateMonthCardStatus", this.updateMonthCardStatus.bind(this))
        this.initItem()
        this.refreshStatus()
    }

    initItem() {
        this["nodeMonthCard1"].active = false
        this["nodeMonthCard2"].active = false
        this["nodeMonthCard3"].active = false
        DataManager.Instance.MonthBoxs.forEach((v) => {
            this["tempItemInstance"] = null
            if(v.price == 10){
                this["tempItemInstance"] = this["nodeMonthCard1"]
            }else if(v.price == 30){
                this["tempItemInstance"] = this["nodeMonthCard2"]
            }
            else if (v.price == 12) {
                this["tempItemInstance"] = this["nodeMonthCard3"]
            }
            if (!this["tempItemInstance"]) {
                return
            }
            
            this["tempItemInstance"].active = true
            // 购买后立得0金豆
            // 7天内每天可领0金豆
            let days = v.price == 12 ? 10 : v.cardDays 
            //this["tempItemInstance"].getChildByName("labelDesc").getComponent(cc.Label).string = "购买后立得" + v.firstMoney + "金豆\n" + days + "天内每天可领" + v.gmDay + "金豆"
            this["tempItemInstance"].getChildByName("labelDesc1").getComponent(cc.Label).string = v.firstMoney + "金豆"
            this["tempItemInstance"].getChildByName("labelDesc2").getComponent(cc.Label).string = days + "天"
            this["tempItemInstance"].getChildByName("labelDesc3").getComponent(cc.Label).string = v.gmDay + "金豆"
            this["tempItemInstance"].getChildByName("nodeStatus1").getChildByName("labelPrice").getComponent(cc.Label).string = v.price + "元购买"            
        })

        cc.find("nodeMain/nodeContent/nodeMonthCard3", this.node).active = this._flyBack
        cc.find("nodeMain/nodeContent", this.node).getComponent(cc.Layout).spacingX = this._flyBack ? 0 : 50
    }

    refreshStatus() {
        // 0. 当天未领取 -1.没有购买至尊月卡 -2.已过期 -3 当天已领取
        cc.find("nodeMain/nodeContent", this.node).getComponent(cc.Layout).spacingX = 80
        DataManager.UserData.monthCardStatus.forEach((v, k) => {
            this["tempItemInstance"] = null
            if(k == 0){
                this["tempItemInstance"] = this["nodeMonthCard1"]
            }else if(k == 1){
                this["tempItemInstance"] = this["nodeMonthCard2"]
            }
            else if (k == 3) {
                this["tempItemInstance"] = this["nodeMonthCard3"]
                if (v.ret != -1 && v.ret != -2) {
                    this._flyBack = true
                    cc.find("nodeMain/nodeContent/nodeMonthCard3", this.node).active = this._flyBack
                    cc.find("nodeMain/nodeContent", this.node).getComponent(cc.Layout).spacingX = 0
                }
            }

            if (!this["tempItemInstance"]) {
                return
            }

            this["tempItemInstance"].getChildByName("nodeStatus1").active = false
            this["tempItemInstance"].getChildByName("nodeStatus2").active = false
            this["tempItemInstance"].getChildByName("nodeStatus3").active = false
            this["tempItemInstance"].getChildByName("nodeItemTip").active = false
            this["tempItemInstance"].getChildByName("nodeItemTip").getChildByName("labelRemainDay").getComponent(cc.Label).string = v.remainingDays + "日"

            if(v.ret == 0) {
                this["tempItemInstance"].getChildByName("nodeItemTip").active = true
                this["tempItemInstance"].getChildByName("nodeStatus2").active = true
            }if(v.ret == -1) {
                this["tempItemInstance"].getChildByName("nodeStatus1").active = true
            }if(v.ret == -2) {
                this["tempItemInstance"].getChildByName("nodeStatus1").active = true
            }if(v.ret == -3) {                
                this["tempItemInstance"].getChildByName("nodeItemTip").active = true
                this["tempItemInstance"].getChildByName("nodeStatus3").active = true

                // if (v.remainingDays > 0) {                    
                //     this["tempItemInstance"].getChildByName("nodeItemTip").active = true
                //     this["tempItemInstance"].getChildByName("nodeStatus3").active = true
                // }else{
                //     this["tempItemInstance"].getChildByName("nodeStatus1").active = true
                //     this["tempItemInstance"].getChildByName("nodeItemTip").active = false
                // }
            }
        })
    }

    updateMonthCardStatus() {
        this.refreshStatus()
    }

    onPressMask() {
        cc.log("onPressMask")
    }

    onPressClose() {
        cc.log("onPressMask")
    }

    onPressBuyMonthCard(EventTouch, data) {
        cc.log("onPressBuyMonthCard", data)
        let refreshViewCallback = () => {
            
            sendReloadUserData()
            this.closeSelf()
        }
        let box = DataManager.Instance.MonthBoxs.filter(item => item.price == data)
        if (null != box && 0 != box.length)
        payOrder(box[0], refreshViewCallback)
    }

    onPressGetAwardMonthCard(EventTouch, data) {
        cc.log("onPressBuyMonthCard", data)
        
        getMonthCardAward(data)
    }
    

    start () {

    }
    

    // update (dt) {}
}
