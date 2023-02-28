import BaseScene from "../base/baseScene/BaseScene";
import { getUserRole, checkOneYuanBox, showAwardResultPop, payOrder, MsgBox, iMessageBox, openQttTaskFrame, showTokenGrowPop, getShopBox, sToTime, showActivityPortalPop } from "../base/BaseFuncTs";
import DataManager from "../base/baseData/DataManager";
import BaseFunc = require("../base/BaseFunc")
import { sendReloadUserData } from "./LobbyFunc";
import SceneManager from "../base/baseScene/SceneManager";
import BaseComponent from "../base/BaseComponent";
import { GAME_TYPE } from "../gameConfig";

const {ccclass, property} = cc._decorator;

let payCount = [500, 2000, 5000, 10000, 20000]
let newPayCount = [2000, 8000, 20000, 40000, 80000]

let awardCount = [10, 30, 50, 100, 200]
let newAwardCount = [12, 30, 60, 120, 240]

@ccclass
export default class OneYuanOneDayActivePop extends BaseComponent {

    _delayTime: number = 0
    _curReward: number = 0
    _finishReward: number = 0

    _remainTime:number = 0

    _clickTime: number = 0

    onOpenScene() {
        DataManager.CommonData[DataManager.UserData.guid + "OneYuanActivePop"] = true

        getShopBox(2, this.updateShopInfo.bind(this))        
        // let states = cc.find("nodePop/nodeProgress/buyProgress", this.node)
        // if (null != states) {
        //     for (let child of states.children) {
        //         let idx = -1
        //         if (-1 != (idx = child.name.indexOf("state"))) {
        //             child.getChildByName("label1").getComponent(cc.Label).string = newPayCount[parseInt(child.name.substring(idx + 5)) - 1]
        //             child.getChildByName("label2").getComponent(cc.Label).string = newAwardCount[parseInt(child.name.substring(idx + 5)) - 1]
        //         }
        //     }
        // }

        let today = new Date()
        let tomorrow = new Date()
        tomorrow.setDate(today.getDate()+1)
        tomorrow.setHours(0,0,0,0)

        this._remainTime = tomorrow.getTime()/1000 - today.getTime()/1000

        cc.log(this._remainTime, sToTime(this._remainTime))
        this["nodeShops"].getChildByName("btnBuy1").getChildByName("labelRemainTime").getComponent(cc.Label).string = sToTime(this._remainTime)
        this["nodeShops"].getChildByName("btnBuy3").getChildByName("labelRemainTime").getComponent(cc.Label).string = sToTime(this._remainTime)
        this["nodeShops"].getChildByName("btnBuy6").getChildByName("labelRemainTime").getComponent(cc.Label).string = sToTime(this._remainTime)

        if (DataManager.Instance.GameType === GAME_TYPE.QMDDZMD) {
            cc.find("nodePop/qttAwardBg1", this.node).active = false;
            cc.find("nodePop/qttAwardBg2", this.node).active = true;

            cc.find("nodePop/btn_help", this.node).active = false
        }

        this.lightLine()
        this.titleLightLine()
    }

    onCloseScene() {
        
        // , {
        //     closeCallback: () => {
        //         let now = new Date().getTime() / 1000
        //         if (now >= 1568736000 && now <= 1569859200) 
        //             SceneManager.Instance.popScene("moduleLobby", "VipActivePop")
        //     }
        // })
    }

    update (dt) {
        this._delayTime += 1
        if (this._delayTime >= 60) {
            // this.getBuyCount()
            --this._remainTime
            this._remainTime = this._remainTime < 0 ? 0 : this._remainTime
            this._delayTime = 0
            this["nodeShops"].getChildByName("btnBuy1").getChildByName("labelRemainTime").getComponent(cc.Label).string = sToTime(this._remainTime)
            this["nodeShops"].getChildByName("btnBuy3").getChildByName("labelRemainTime").getComponent(cc.Label).string = sToTime(this._remainTime)
            this["nodeShops"].getChildByName("btnBuy6").getChildByName("labelRemainTime").getComponent(cc.Label).string = sToTime(this._remainTime)
        }
    }

    onPressBuy() {
        let box = checkOneYuanBox(1, 1)
        let self = this
        if (null != box) 
            payOrder(box, ()=> {openQttTaskFrame(); self.closeSelf()})
    }

    onPressBuy3() {
        let box = checkOneYuanBox(3, 1)
        let self = this
        if (null != box) 
            payOrder(box, ()=> {openQttTaskFrame();self.closeSelf()})
    }

    onPressBuy6() {
        let box = checkOneYuanBox(6, 1)
        let self = this
        if (null != box) 
            payOrder(box, ()=> {openQttTaskFrame(); self.closeSelf()})
    }

    onPressGetAward() {
        if (this._finishReward == 5) {
            iMessageBox("恭喜您，您已领取了所有返还的趣金币！")
            return
        }
        
        if (new Date().getTime() - this._clickTime < 5000)
            return

        let box1 = checkOneYuanBox(1, 1)
        let box3 = checkOneYuanBox(3, 1)
        if (this.node.name == "OneYuanActivePop") {
            if (box1 != null && box3 != null) {
                iMessageBox("需要购买1元礼包或3元礼包才能领取返还的趣金币！")
                return            
            }
        }
        else {
            let box6 = checkOneYuanBox(6, 1)
            if (box1 != null && box3 != null && box6 != null) {
                iMessageBox("需要购买1元礼包或3元礼包或6元礼包才能领取返还的趣金币！")
                return            
            }
        }
        
        this.getActiveAward()
        this._clickTime = new Date().getTime()
    }

    updateShopInfo() {
        if (this.node == null)
            return

        let box1 = checkOneYuanBox(1, 1)
        let box3 = checkOneYuanBox(3, 1)
        let box6 = checkOneYuanBox(6, 1)

        cc.log(box1)
        cc.log(box3)
        cc.log(box6)
        // if (this.node.name == "OneYuanActivePop") {
        //     let node1 = cc.find("nodePop/node1yuan", this.node)
        //     let node3 = cc.find("nodePop/node3yuan", this.node)

        //     node1.active = box1 != null
        //     node3.active = box1 == null
            
        //     node1.getChildByName("btnBuy").getComponent(cc.Button).interactable = box1 != null
        //     node3.getChildByName("btnBuy").getComponent(cc.Button).interactable = box3 != null
        // }
        // else if (this.node.name == "NewOneYuanActivePop") {
            this["nodeShops"].getChildByName("btnBuy1").getComponent(cc.Button).interactable = box1 != null
            this["nodeShops"].getChildByName("btnBuy3").getComponent(cc.Button).interactable = box3 != null
            this["nodeShops"].getChildByName("btnBuy6").getComponent(cc.Button).interactable = box6 != null

            this["nodeShops"].getChildByName("btnBuy1").getChildByName("label").active = box1 != null
            this["nodeShops"].getChildByName("btnBuy3").getChildByName("label").active = box3 != null
            this["nodeShops"].getChildByName("btnBuy6").getChildByName("label").active = box6 != null
                        
            this["nodeShops"].getChildByName("btnBuy1").getChildByName("labelRemainTime").active = box1 != null
            this["nodeShops"].getChildByName("btnBuy3").getChildByName("labelRemainTime").active = box3 != null
            this["nodeShops"].getChildByName("btnBuy6").getChildByName("labelRemainTime").active = box6 != null

            this["nodeShops"].getChildByName("btnBuy1").getChildByName("finish").active = box1 == null
            this["nodeShops"].getChildByName("btnBuy3").getChildByName("finish").active = box3 == null
            this["nodeShops"].getChildByName("btnBuy6").getChildByName("finish").active = box6 == null
        // }

        this.getBuyCount()

    }

    getBuyCount() {
        let url = DataManager.getURL("ACTIVE_BUY_COUNT")
        let params = {
            pid: DataManager.UserData.guid,
            ticket: DataManager.UserData.ticket
        }

        let self = this
        BaseFunc.HTTPGetRequest(url, params, function(msg) {
            if (DataManager.Instance.isTesting)
                console.log(msg)

            if (msg) {
                if (null == self.node)
                    return
                let PayCount = payCount
                let AwardCount = awardCount
                if (self.node.name == "OneYuanActivePop") {
                }
                else{
                    PayCount = newPayCount
                    AwardCount = newAwardCount
                }

                let progress = cc.find("nodePop/nodeProgress", self.node)
                progress.getChildByName("labalCount").getComponent(cc.Label).string = "已购买次数：" + msg.buyCnt
                let degree = 0
                let finishIdx = 0
                if (msg.buyCnt <= PayCount[0]) {
                    degree = (msg.buyCnt / PayCount[0]) * 0.1
                    finishIdx = msg.buyCnt == PayCount[0] ? 1 : 0
                }
                else if (msg.buyCnt <= PayCount[1]){
                    degree = (msg.buyCnt - PayCount[0]) / (PayCount[1] - PayCount[0]) * .1 + .1
                    finishIdx = msg.buyCnt == PayCount[1] ? 2 : 1
                }
                else if (msg.buyCnt <= PayCount[2]) {
                    degree = (msg.buyCnt - PayCount[1]) / (PayCount[2] - PayCount[1]) * .1 + .2
                    finishIdx = msg.buyCnt == PayCount[2] ? 3 : 2
                }
                else if (msg.buyCnt <= PayCount[3]) {
                    degree = (msg.buyCnt - PayCount[2]) / (PayCount[3] - PayCount[2]) * .2 + .3
                    finishIdx = msg.buyCnt == PayCount[3] ? 4 : 3
                }
                else {
                    degree = msg.buyCnt / PayCount[4]
                    finishIdx = msg.buyCnt >= PayCount[4] ? 5 : 4
                }
                degree += 0.02
                degree = degree < 0 ? 0 : degree > 1 ? 1 : degree
                progress.getChildByName("buyProgress").getComponent(cc.ProgressBar).progress = degree
                self._curReward = finishIdx + 1
                
                self._finishReward = msg.reward == AwardCount[0] ? 1 : 
                                     msg.reward == AwardCount[0] + AwardCount[1] ? 2 : 
                                     msg.reward == AwardCount[0] + AwardCount[1] + AwardCount[2] ? 3 : 
                                     msg.reward == AwardCount[0] + AwardCount[1] + AwardCount[2] + AwardCount[3] ? 4 : 
                                     msg.reward == AwardCount[0] + AwardCount[1] + AwardCount[2] + AwardCount[3] + AwardCount[4] ? 5 : 0
                for (let child of progress.getChildByName("buyProgress").children) {
                    let idx = -1
                    if (-1 != (idx = child.name.indexOf("state"))) {
                        child.getChildByName("flag").active = true
                        child.getChildByName("finish").active = self._curReward > parseInt(child.name.substring(idx + 5))
                        child.getChildByName("get").active = self._finishReward >= parseInt(child.name.substring(idx + 5))
                    }
                }

                // let box = checkOneYuanBox(1)
                // progress.getChildByName("btnGetAward").getComponent(cc.Button).interactable = box == null && finishIdx > awardIdx
            }           
        }) 

        // this.node.runAction(cc.sequence(cc.delayTime(60), cc.callFunc(() => this.getBuyCount.bind(this))))
    }

    getActiveAward() {
        let url = DataManager.getURL("ACTIVE_BUY_GET_AWARD")
        let params = {
            pid: DataManager.UserData.guid,
            ticket: DataManager.UserData.ticket,
            pn: DataManager.Instance.packetName
        }

        let self = this
        BaseFunc.HTTPGetRequest(url, params, function(msg) {
            if (DataManager.Instance.isTesting)
                console.log(msg)

            let PayCount = payCount
            let AwardCount = awardCount
            if (self.node.name == "OneYuanActivePop") {
            }
            else{
                PayCount = newPayCount
                AwardCount = newAwardCount
            }

            if (msg ) {
                if (msg.ret == 0) {
                    // let awards = []
                    // awards[0] = {index: 367, num: msg.getReward}
                    // showAwardResultPop(awards)
                    showTokenGrowPop(msg.getReward) 
                    sendReloadUserData()

                    self._finishReward = msg.reward == AwardCount[0] ? 1 : 
                                         msg.reward == AwardCount[0] + AwardCount[1] ? 2 : 
                                         msg.reward == AwardCount[0] + AwardCount[1] + AwardCount[2] ? 3 : 
                                         msg.reward == AwardCount[0] + AwardCount[1] + AwardCount[2] + AwardCount[3] ? 4 : 
                                         msg.reward == AwardCount[0] + AwardCount[1] + AwardCount[2] + AwardCount[3] + AwardCount[4] ? 5 : 0
                    let progress = cc.find("nodePop/nodeProgress", self.node)
                    for (let child of progress.getChildByName("buyProgress").children) {
                        let idx = -1
                        if (-1 != (idx = child.name.indexOf("state"))) {
                            child.getChildByName("flag").active = true
                            child.getChildByName("finish").active = self._curReward > parseInt(child.name.substring(idx + 5))
                            child.getChildByName("get").active = self._finishReward >= parseInt(child.name.substring(idx + 5))
                        }
                    }

                    // cc.find("nodePop/nodeProgress/btnGetAward", self.node).getComponent(cc.Button).interactable = false
                }
                else{
                    if (self._finishReward == 5) {
                        iMessageBox("恭喜您，您已领取了所有返还的趣金币！")
                    }
                    else{
                        iMessageBox("购买人数达到" + (
                            self._curReward == 1 ? PayCount[0] :
                            self._curReward == 2 ? PayCount[1] :
                            self._curReward == 3 ? PayCount[2] :
                            self._curReward == 4 ? PayCount[3] :
                            PayCount[4]
                        ) + "才可领取下个奖励，请下次再来！")
                    }
                }
            }           
        })        
    }

    onPressHelp() {
        // showActivityPortalPop({pageNum: 3})
        SceneManager.Instance.popScene("moduleLobby", "ActivePop", {selectName: "每日瓜分趣金币"})
    }

    lightLine() {
        let line = cc.find("nodePop/active_bg/light_line", this.node)        
        for (let i = 0; i < line.childrenCount; i++) {
            let child = line.getChildByName("light" + i)
            child.getChildByName("light_coronae").opacity = 0
            child.runAction(
                cc.sequence(
                    cc.delayTime(i * .7),
                    cc.callFunc(() => {
                        child.getChildByName("light_coronae").runAction(
                            cc.repeatForever(
                                cc.sequence(
                                    cc.fadeIn(0.1), 
                                    cc.delayTime(.5 + .7), 
                                    cc.fadeOut(0.1 + .7),
                                    cc.delayTime(line.childrenCount * .7)
                                )
                            )
                        )
                    })                
                )
            )
        }
    }

    titleLightLine() {
        let line = cc.find("nodePop/active_bg/active_title", this.node)        
        for (let i = 0; i < line.childrenCount; i++) {
            let child = line.getChildByName("light" + i)
            child.getChildByName("normal_coronae").opacity = 0
            child.runAction(
                cc.sequence(
                    cc.delayTime(i * .3),
                    cc.callFunc(() => {
                        child.getChildByName("normal_coronae").runAction(
                            cc.repeatForever(
                                cc.sequence(
                                    cc.fadeIn(0.1), 
                                    cc.delayTime(.6), 
                                    cc.fadeOut(0.1 + .1),
                                    cc.delayTime(12 * .3)
                                )
                            )
                        )
                    })                
                )
            )
        }
    }
}
 