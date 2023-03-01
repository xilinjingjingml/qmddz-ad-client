import { confusonFunc } from "../base/confusonFunc";
import { AdsConfig } from "../base/baseData/AdsConfig"
import DataManager from "../base/baseData/DataManager"
import BaseScene from "../base/baseScene/BaseScene"
import WxWrapper from "../base/WxWrapper"
import { checkAdCanReceive, getAdLeftTimes, getAdTotalTimes, receiveAdAward } from "./LobbyFunc"
import { TimeFormat } from "../base/BaseFuncTs";

const { ccclass } = cc._decorator

@ccclass
export default class InviteFriendPopNew extends BaseScene {

    onLoad() {
        //TODO 1.创建界面 2.分享列表 显示tip
        !(DataManager.load(DataManager.UserData.guid + "FriendHelpTime" + TimeFormat("yyyy-mm-dd"))) && DataManager.save(DataManager.UserData.guid + "FriendHelpTime" + TimeFormat("yyyy-mm-dd") , (new Date()).valueOf())
        WxWrapper.postMessage({
            event: "deviceSpace",
            value: WxWrapper.convertToDeviceSpace(cc.find("nodeMain/content", this.node).getBoundingBoxToWorld())
        })

        this.setShareConfig()
        this.setInviteTips()

        this.setTimeOut()
    }

    setShareConfig() {
        WxWrapper.postMessage({
            event: "shareData",
            value: WxWrapper.randomShare()
        })
    }

    setInviteTips() {
        const lbl_0 = cc.find("nodeMain/labelTips/lbl_0", this.node).getComponent(cc.Label)
        const lbl_1 = cc.find("nodeMain/labelTips/lbl_1", this.node).getComponent(cc.Label)
        const total = getAdTotalTimes(AdsConfig.taskAdsMap.InviteWxFriend)
        const left = getAdLeftTimes(AdsConfig.taskAdsMap.InviteWxFriend)
        lbl_0.string = "每日" + total + "次邀请机会 今日剩余"
        lbl_1.string = "" + left
    }

    onPressChangeList() {
        console.log("jin---onPressChangeList")
        WxWrapper.postMessage({ event: "changeList" })
    }

    onShareToFriend(message) {
        this.setShareConfig()
        if (message.success) {
            WxWrapper.postMessage({ event: "shareSuccess" })
            if (checkAdCanReceive(AdsConfig.taskAdsMap.InviteWxFriend)) {
                receiveAdAward(AdsConfig.taskAdsMap.InviteWxFriend, () => {
                    if(this.isValid){
                        this.setInviteTips()
                        getAdLeftTimes(AdsConfig.taskAdsMap.InviteWxFriend) == 0 && this.closeSelf()
                    }
                })
            }
        }
    }

    onDestroy() {
        // DataManager.CommonData.CancelBackAd = false
    }

    // setTime(){
    //     //TODO 1.固定时间 2.当前时间 3.倒计时
    //     let time = TimeFormat("yyyy-mm-dd");
        
    //     let time8 = new Date((time + " 08:00:00").replace(/-/g, '/') ).getTime() 
    //     let time12 = new Date( (time + " 12:00:00" ).replace(/-/g, '/') ).getTime() 
    //     let time17 = new Date( (time + " 17:00:00" ).replace(/-/g, '/') ).getTime() 
    //     let time23 = new Date( (time + " 23:00:00" ).replace(/-/g, '/') ).getTime() 
        
    //     var timestamp = (new Date()).valueOf()
    //     // var timestamp = accurateTime()
    //     // console.log("jin---", "8qian", time8, time12, time17, time23, timestamp)
    //     if(time8 > timestamp){
    //         //不显示
    //         console.log("jin---", "8qian", time8)
    //         this.uperLimit = -1
    //         this.closeSelf()
    //     }else if(time8 < timestamp && time12 > timestamp){
    //         //0 奖励是否购买
    //         this.curBox = 0
    //         this.uperLimit = time12
    //         console.log("jin---", "0")
    //     }else if(time12 < timestamp && time17 > timestamp){
    //         //1
    //         this.curBox = 1
    //         this.uperLimit = time17
    //         console.log("jin---", "1")
    //     }else if(time17 < timestamp && time23 > timestamp){
    //         //2
    //         this.curBox = 2
    //         this.uperLimit = time23
    //         console.log("jin---", "2")
    //     }else{
    //         //不显示
    //         this.uperLimit = -1
    //         this.closeSelf()
    //         console.log("jin---", "23hou")
    //     }

    //     this.setBox()
    //     this.uperLimit != -1 && this.setTimeOut()
    // }

    setTimeOut(){
        let uperLimit = DataManager.load(DataManager.UserData.guid + "FriendHelpTime" + TimeFormat("yyyy-mm-dd"))
        //1.上限时间  2.当前时间
        let cdTime = (uperLimit + (90*60*1000) - (new Date()).valueOf())/1000
        const labelTime = cc.find("nodeMain/lbl_time/lbl_1", this.node).getComponent(cc.Label)
        if(cdTime > 0){
            this.node.runAction(cc.repeatForever(cc.sequence(
                cc.callFunc(() => {
                    // console.log("jin---cdTime", cdTime)
                    // let h = String(Math.floor(cdTime / 3600))
                    // let m = String(Math.floor(cdTime / 60 % 60))
                    // let s = String(Math.floor(cdTime % 60))
                    // h = Number(h) <= 0 ? "00" : Number(h) < 10 ? "0" + h : h
                    // m = Number(m) <= 0 ? "00" : Number(m) < 10 ? "0" + m : m
                    // s = Number(s) <= 0 ? "00" : Number(s) < 10 ? "0" + s : s

                    // labelTime.string = h+":"+m+":"+s

                    let m = String(Math.floor(cdTime / 60))/// 60
                    labelTime.string = m

                    cdTime--
                    if (cdTime <= 0) {
                        this.setTimeOut()
                    }
                }),
                cc.delayTime(1)
            )))
        }else{
            DataManager.save(DataManager.UserData.guid + "FriendHelpTime" + TimeFormat("yyyy-mm-dd") , -1)
            this.closeSelf()
        }
        
    }
}