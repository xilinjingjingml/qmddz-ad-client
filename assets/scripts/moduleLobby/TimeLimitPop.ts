/**
 * Create by Jin on 2022/5/25
*/
import { confusonFunc } from "../base/confusonFunc";
import BaseScene from "../base/baseScene/BaseScene";
import SceneManager from "../base/baseScene/SceneManager";
import DataManager from "../base/baseData/DataManager";
import { payOrder, czcEvent, checkChangeLuckyBox, getShopBox, numberFormat, TimeFormat, showAwardResultPop, checkTimeLimitBox, accurateTime } from "../base/BaseFuncTs";
import { sendReloadUserData, isShowPayPage } from "./LobbyFunc";
import { ITEM } from "../base/baseData/ItemConfig";
import { time } from "../base/utils/time";

const {ccclass, property} = cc._decorator;

@ccclass
export default class TimeLimitPop extends BaseScene {
    boxData = null
    curBox = null
    uperLimit = null
    
    onOpenScene() {
        this.curBox = 1
        //1.金豆 2.钻石 3.记牌器 4.折扣 5.倒计时 6.原价 7.现价
        if(DataManager.Instance.TimeLimitBoxs.length == 0) this.closeSelf()
        this.setTime()
    }

    setBox(){
        
        this.boxData = DataManager.Instance.TimeLimitBoxs[this.curBox]
        for(let curBox of this.boxData.content){
            if(curBox.idx == ITEM.GOLD_COIN){
                cc.find("nodeMain/node_gold/num", this.node).getComponent(cc.Label).string = numberFormat(this.boxData.content[0].num)
            }else if(curBox.idx == ITEM.CARD_RECORD){
                cc.find("nodeMain/node_jipaiqi/num", this.node).getComponent(cc.Label).string = numberFormat(this.boxData.content[1].num)
            }
            // else if(curBox.idx == ITEM.DIAMOND){
            //     cc.find("nodeMain/node_diamond/num", this.node).getComponent(cc.Label).string = numberFormat(this.boxData.content[2].num)
            // }
        }
        
        let zheNum : number = Number((Number(this.boxData.price / this.boxData.boxvalue)).toFixed(2)) * 100
        zheNum = Number((Math.floor(zheNum)/10).toFixed(1))
        cc.find("nodeMain/node_zhong/lbl_4", this.node).getComponent(cc.Label).string = "" + zheNum
        // cc.find("nodeMain/node_zhong/lbl_2", this.node).getComponent(cc.Label).string = "03:59:59"

        this.setBtnGet()
        cc.find("nodeMain/btn_buy/payNum/lbl_num", this.node).getComponent(cc.Label).string = "" + this.boxData.price
        cc.find("nodeMain/btn_buy/originalPrice/lbl_0", this.node).getComponent(cc.Label).string = "原价" + this.boxData.boxvalue + "元"
    }

    setBtnGet(){
        if(checkTimeLimitBox(this.curBox)){
            cc.find("nodeMain/btn_buy", this.node).active = true
            cc.find("nodeMain/btn_over", this.node).active = false
        }else{
            cc.find("nodeMain/btn_buy", this.node).active = false
            cc.find("nodeMain/btn_over", this.node).active = true
        }
    }

    setTime(){
        //TODO 1.固定时间 2.当前时间 3.倒计时
        let time = TimeFormat("yyyy-mm-dd");
        
        let time8 = new Date((time + " 08:00:00").replace(/-/g, '/') ).getTime() 
        let time12 = new Date( (time + " 12:00:00" ).replace(/-/g, '/') ).getTime() 
        let time17 = new Date( (time + " 17:00:00" ).replace(/-/g, '/') ).getTime() 
        let time23 = new Date( (time + " 23:00:00" ).replace(/-/g, '/') ).getTime() 
        
        var timestamp = (new Date()).valueOf()
        // var timestamp = accurateTime()
        if(time8 > timestamp){
            //不显示
            console.log("jin---", "8qian", time8)
            this.uperLimit = -1
            this.closeSelf()
        }else if(time8 < timestamp && time12 > timestamp){
            //0 奖励是否购买
            this.curBox = 0
            this.uperLimit = time12
            console.log("jin---", "0")
        }else if(time12 < timestamp && time17 > timestamp){
            //1
            this.curBox = 1
            this.uperLimit = time17
            console.log("jin---", "1")
        }else if(time17 < timestamp && time23 > timestamp){
            //2
            this.curBox = 2
            this.uperLimit = time23
            console.log("jin---", "2")
        }else{
            //不显示
            this.uperLimit = -1
            this.closeSelf()
            console.log("jin---", "23hou")
        }

        this.setBox()
        this.uperLimit != -1 && this.setTimeOut()
    }

    setTimeOut(){
        //1.上限时间  2.当前时间
        let cdTime = (this.uperLimit - (new Date()).valueOf())/1000
        const labelTime = cc.find("nodeMain/node_zhong/lbl_2", this.node).getComponent(cc.Label)
        if(cdTime > 0){
            this.node.runAction(cc.repeatForever(cc.sequence(
                cc.callFunc(() => {
                    let h = String(Math.floor(cdTime / 3600))
                    let m = String(Math.floor(cdTime / 60 % 60))
                    let s = String(Math.floor(cdTime % 60))
                    h = Number(h) <= 0 ? "00" : Number(h) < 10 ? "0" + h : h
                    m = Number(m) <= 0 ? "00" : Number(m) < 10 ? "0" + m : m
                    s = Number(s) <= 0 ? "00" : Number(s) < 10 ? "0" + s : s

                    labelTime.string = h+":"+m+":"+s

                    cdTime--
                    if (cdTime <= 0) {
                        this.setTimeOut()
                    }
                }),
                cc.delayTime(1)
            )))
        }else{
            this.setTime()
        }
        
    }

    onPressGet(){
        cc.audioEngine.playEffect(DataManager.Instance.menuEffect, false)
        //生成支付订单
        let self = this
        payOrder(this.boxData, () => {
            self.initParam["closeCallback"] = null
            getShopBox(2, ()=>{
                self.setBtnGet()
                let awards = [
                ]
                for (const iterator of self.boxData.content) {
                    let award = {
                        index: iterator.idx,
                        num: iterator.num
                    }
                    awards.push(award)
                }
                showAwardResultPop(awards)
            })
            sendReloadUserData()
        })
    }
}