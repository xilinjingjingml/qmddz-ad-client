/**
 * Create by Jin on 2022.5.6
 */

import BaseScene from "../base/baseScene/BaseScene"
import { AdsConfig } from "../base/baseData/AdsConfig"
import DataManager from "../base/baseData/DataManager"
import { checkAdCanReceive, getLuckyLotteryAward, loadLotteryData, loadLotteryRecord, receiveAdAward, getAdLeftTimes, getNextAdMethod } from "./LobbyFunc"
import { getNameByItemId, iMessageBox, showAwardResultPop, accurateTime } from "../base/BaseFuncTs"
import SceneManager from "../base/baseScene/SceneManager"

const { ccclass } = cc._decorator

const FREE_GOLD_TIME_KEY = "last_free_gold_time"

@ccclass
export default class FreeGoldCoin extends BaseScene {

    datas: any = {}
    adIndex: number = 0
    isBusy: boolean = false

    onOpenScene() {
        // czcEvent("大厅-免费领金币-弹出")
        this.datas = AdsConfig.getAwards()[0]
        // this.datas = DataManager.CommonData["happyLotteryData"]
        console.log("jin---FreeGoldCoin op:", this.datas)
        this.adIndex = AdsConfig.taskAdsMap.DynamicGold//DrawGold
        //TODO 1.按钮装填 2.剩余次数
        this.updateBtnSta()
        this.updateCount()
    }

    onPressGetReward(){
        let self = this
        cc.audioEngine.playEffect(DataManager.Instance.menuEffect, false)
        // czcEvent("大厅-免费领金币-看视频领取")
        if (!this.isBusy) {
            if (getAdLeftTimes(this.datas.adindex) <= 0) {
                return
            }
            this.isBusy = true
            const updateItem = () => {
                if (this.isValid) {
                    // czcEvent("大厅-免费领金币-看视频成功")
                    DataManager.save(FREE_GOLD_TIME_KEY, accurateTime())
                    this.updateBtnSta()
                    this.updateCount()
                    showAwardResultPop([
                        {
                            index: self.datas.acItemIndex,
                            num: self.datas.acItemNum
                        }
                    ], {closeCallback: () => {self.isBusy = false}})
                    SceneManager.Instance.sendMessageToScene({ opcode: "onWelfareUpdate", item_name: "freeGold"})
                }
            }
    

            //  TODO 直接领奖励
            if (checkAdCanReceive(this.datas.adindex)) {
                receiveAdAward(this.datas.adindex, updateItem)
            }else{
                iMessageBox("今日次数已用完", ()=>{this.isBusy = false})
            }

            // if (getNextAdMethod(this.datas.adindex) == 0) {
            //     receiveAdAward(this.datas.adindex, updateItem)
            // } else {
            //     this.datas.callback = updateItem
            //     SceneManager.Instance.popScene("moduleLobby", "AdAwardPop", this.datas)
            //     this.isBusy = false
            // }


            // if (checkAdCanReceive(this.adIndex)) {
            //     receiveAdAward(this.adIndex, () => {
            //         this.isBusy = true
            //         // getLuckyLotteryAward((res) => {
            //             console.log("jin---onPressGetReward: ")
            //             if (this.isValid) {
            //                 // if (res && res.ret == 0) {
            //                     //todo 记录时间
            //                     DataManager.save(FREE_GOLD_TIME_KEY, accurateTime())
            //                     this.updateBtnSta()
            //                     this.updateCount()
            //                     SceneManager.Instance.sendMessageToScene({ opcode: "onWelfareUpdate", item_name: "freeGold"})
            //                 // } else {
            //                     this.isBusy = false
            //                     // iMessageBox(res ? res.msg : "请求失败")
            //                 // }
            //             }
            //         // })
            //     }, null, false)
            // } else {
            //     iMessageBox("今日次数已用完")
                
            // }
        }
    }

    //1.btn获得  2.倒计时 3.剩余次数
    updateBtnSta(){
        const labelTime = cc.find("btn_getReward/lbl", this.node).getComponent(cc.Label)
        cc.find("btn_getReward/lbl_mianfilingqu", this.node).active = true
        cc.find("btn_getReward/lbl_mianfilingqu", this.node).setPosition(cc.v2(25 , 3))
        cc.find("btn_getReward/video", this.node).active = false
        cc.find("btn_getReward/share", this.node).active = false
        cc.find("btn_getReward/lbl", this.node).active = false

        if(checkAdCanReceive(this.adIndex)){
            const lastOpTime = DataManager.load(FREE_GOLD_TIME_KEY) || 0
            let cdTime = 90 - (accurateTime() - lastOpTime)

            if(lastOpTime > 0 && cdTime > 0){
                //daoijishi
                this.isBusy = true
                cc.find("btn_getReward/lbl", this.node).active = true
                cc.find("btn_getReward/lbl_mianfilingqu", this.node).active = false
                this.node.runAction(cc.repeatForever(cc.sequence(
                    cc.callFunc(() => {
                        const s = Math.floor(cdTime % 91)
                        labelTime.string = s + "秒后可领取"
                        cdTime--
                        if (cdTime <= 0) {
                            this.updateBtnSta()
                        }
                    }),
                    cc.delayTime(1)
                )))
            }else{
                //todo 正常
                this.isBusy = false
                const method = getNextAdMethod(this.adIndex)
                //todo 1.false btn 2.true btn: 0:免费 1：分享 3：视频
                if(method === 0){
                    cc.find("btn_getReward/lbl_mianfilingqu", this.node).setPosition(cc.v2(10 , 3))
                }else if(method === 1){
                    cc.find("btn_getReward/share", this.node).active = true
                }else if(method === 2){
                    cc.find("btn_getReward/video", this.node).active = true
                }
            }
            cc.find("btn_getReward")
        }else{
            cc.find("btn_getReward/lbl_mianfilingqu", this.node).active = false
            cc.find("btn_getReward/lbl", this.node).active = true
            labelTime.string = "今日次数已用完"
        }

    }

    updateCount(){
        cc.find("bl_count", this.node).getComponent(cc.Label).string = "今日剩余：" + getAdLeftTimes(this.adIndex) + "次"
    }
}