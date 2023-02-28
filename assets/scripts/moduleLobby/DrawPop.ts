import BaseScene from "../base/baseScene/BaseScene";
import { getADAward, checkADNum, sendReloadUserData, getADConfig, getADDraw } from "./LobbyFunc";
import { AdsConfig } from "../base/baseData/AdsConfig";
import DataManager from "../base/baseData/DataManager";
import { czcEvent, playAD, showTokenGrowPop, showAwardResultPop, iMessageBox } from "../base/BaseFuncTs";

const {ccclass, property} = cc._decorator;

@ccclass
export default class DrawPop extends BaseScene {

    @property()
    adNum: number = 0

    onOpenScene() {
        let self = this
        if (null == DataManager.CommonData["adConfig"]) {
            getADConfig(() => {
                self.updateState()
            })
        }
        else {
            this.updateState()
        }

    }

    updateState() {
        cc.find("nodePop/btnDraw", this.node).getComponent(cc.Button).interactable = checkADNum(this.adNum)
        
        let gray = cc.find("nodePop/btnDraw/gray", this.node)
        if (gray)
            gray.active = !checkADNum(this.adNum)

        let counttip = cc.find("nodePop/counttip", this.node)
        if (counttip) {
            let count = counttip.getChildByName("count")
            let zero = counttip.getChildByName("zero")
            let num = DataManager.CommonData["adNum"][this.adNum].allNum - DataManager.CommonData["adNum"][this.adNum].countNum

            count.getComponent(cc.Label).string = num > 0 ? "" + num : "0"
            zero.getComponent(cc.Label).string = num === 0 ? "0" : ""
            
        }
    }

    onPressDraw(sender, data) {
        getADDraw(this.adNum, () => {this.updateState()})
        // let adNum = parseInt(data)

        // let adName = AdsConfig.getAdName(this.adNum)
        // let adsReason = AdsConfig.getAdVideo(this.adNum)

        // czcEvent("大厅", "领取" + adName + "1", "点击领取 " + (DataManager.CommonData["morrow"] <= 1 ? DataManager.CommonData["morrow"] + "天新用户" : "老用户"))
        // let self = this
        // let getAward = function() {
        //     if (checkADNum(self.adNum)) {
        //         czcEvent("大厅", "领取" + adName + "2", "播放广告 " + (DataManager.CommonData["morrow"] <= 1 ? DataManager.CommonData["morrow"] + "天新用户" : "老用户"))
        //         playAD(adsReason, () => {
        //             czcEvent("大厅", "领取" + adName + "3", "看完广告 " + (DataManager.CommonData["morrow"] <= 1 ? DataManager.CommonData["morrow"] + "天新用户" : "老用户"))

        //             getADAward(self.adNum, (msg) => {  
        //                 czcEvent("大厅", "领取" + adName + "4", "获取奖励 " + (DataManager.CommonData["morrow"] <= 1 ? DataManager.CommonData["morrow"] + "天新用户" : "老用户"))
        //                 // if (adNum == 5) {
        //                 //     showTokenGrowPop(30) 
        //                 // }
        //                 // else if (adNum == 6) {
        //                 //     let awards = [
        //                 //         {
        //                 //             index: 0,
        //                 //             num: 1000,
        //                 //         }
        //                 //     ]
        //                 //     showAwardResultPop(awards)
        //                 // }
        //                 // else if (adNum == 11) {
        //                 //     let awards = [
        //                 //         {index: 2, num: 1},
        //                 //     ]
                            
        //                 //     // showAwardMutipleResultPop(awards)
        //                 //     showAwardResultPop(awards)
        //                 // }
        //                 let awards = []
        //                 if (null != msg.itemIndex && null != msg.itemNum)
        //                     awards.push({index: msg.itemIndex, num: msg.itemNum})
        //                 else if (msg.awards)
        //                     awards = msg.awards
        //                 showAwardResultPop(awards)
        //                 sendReloadUserData()

        //                 self.updateState()
        //             })        
        //         })                
        //     }
        //     else {
        //         iMessageBox("您今日的" + adName + "次数已用完，请明天再来！")
        //     }
        // }

        // if (null == DataManager.CommonData["adConfig"]) {
        //     getADConfig(() => {
        //         getAward()
        //     })
        //     return 
        // }

        // getAward()
    }
}
