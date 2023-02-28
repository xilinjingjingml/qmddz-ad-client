import BaseScene from "../base/baseScene/BaseScene";
import { getADConfig, sendReloadUserData, getADAward, checkADNum, getADDraw } from "./LobbyFunc";
import { iMessageBox, showAwardResultPop, czcEvent, playAD } from "../base/BaseFuncTs";
import DataManager from "../base/baseData/DataManager";
import { AdsConfig } from "../base/baseData/AdsConfig";

const {ccclass, property} = cc._decorator;

@ccclass
export default class TreasureHuntPop extends BaseScene {

    _adNum: number = 17

    start() {
        
    }

    onOpenScene() {
        this.initAwards()
        this.playBoxAni()

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

    onCloseScene() {

    }

    getItemNameById(id) {
        if (id === 0) return "金豆"
        else if (id === 2) return "记牌器"
        else if (id === 365) return "福卡"
        else if (id === 372) return "钻石"
        return ""
    }
    
    updateState() {
        cc.find("nodePop/nodeBox0/btnPlayer", this.node).getComponent(cc.Button).interactable = checkADNum(this._adNum)
        cc.find("nodePop/nodeBox1/btnPlayer", this.node).getComponent(cc.Button).interactable = checkADNum(this._adNum)
        cc.find("nodePop/nodeBox2/btnPlayer", this.node).getComponent(cc.Button).interactable = checkADNum(this._adNum)
    }

    initAwards() {
        let awards = [
            {index: 365, num: "60~600"},
            {index: 0, num: "5万~30万"},
            {index: 2, num: "1~5"},
            {index: 372, num: "2~20"},
        ] //在线参数
        let content = cc.find("nodePop/nodeAwards/view/content", this.node)
        let model = cc.find("nodePop/nodeAwards/view/nodeItem", this.node)
        for (let val of awards) {
            let item = cc.instantiate(model)

            let icon = cc.find("item/item" + val.index, item)
            if (icon) icon.active = true
            cc.find("tip/labelNum", item).getComponent("cc.Label").string = this.getItemNameById(val.index) + ":" + val.num

            item.active = true
            item.position = cc.Vec2.ZERO
            content.addChild(item)
        }
    }

    playBoxAni() {
        for (let i = 0; i < 3; i++) {
            let box = cc.find("nodePop/nodeBox" + i + "/box", this.node)
            if (box) {
                box.runAction(
                    cc.sequence(
                        cc.delayTime(.5 * i),
                        cc.callFunc(() => {
                            box.runAction(
                                cc.repeatForever(
                                    cc.sequence(
                                        cc.moveTo(1, cc.v2(2, 70)),
                                        cc.moveTo(1, cc.v2(2, 50)),        
                                        // cc.delayTime(2),
                            )))
                        }),
                    )
                )
            }
        }
    }

    onPressDraw() {
        getADDraw(this._adNum, () => {this.updateState()})
        // let adName = AdsConfig.getAdName(this._adNum)
        // let adsReason = AdsConfig.getAdVideo(this._adNum)

        // czcEvent("大厅", "领取" + adName + "1", "点击领取 " + (DataManager.CommonData["morrow"] <= 1 ? DataManager.CommonData["morrow"] + "天新用户" : "老用户"))
        // let self = this
        // let getAward = function() {
        //     if (checkADNum(self._adNum)) {
        //         czcEvent("大厅", "领取" + adName + "2", "播放广告 " + (DataManager.CommonData["morrow"] <= 1 ? DataManager.CommonData["morrow"] + "天新用户" : "老用户"))
        //         playAD(adsReason, () => {
        //             czcEvent("大厅", "领取" + adName + "3", "看完广告 " + (DataManager.CommonData["morrow"] <= 1 ? DataManager.CommonData["morrow"] + "天新用户" : "老用户"))

        //             getADAward(self._adNum, (msg) => {  
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

        // getAward()
    }

}
