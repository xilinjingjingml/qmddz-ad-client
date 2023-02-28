import BaseScene from "../base/baseScene/BaseScene";
import Revolving from "./component/Revolving";
import DataManager from "../base/baseData/DataManager";
import BaseFunc = require("../base/BaseFunc")
import { getDialAwardList, getDialResult, getADConfig, getADAward } from "./LobbyFunc";
import { iMessageBox, playAD, checkPhoneBinding, showAwardResultPop, czcEvent, showTokenGrowPop } from "../base/BaseFuncTs";
import SceneManager from "../base/baseScene/SceneManager";
import { AdsConfig } from "../base/baseData/AdsConfig";

const { ccclass, property } = cc._decorator;

const AD_AREA = 2

@ccclass
export default class FreeDrawPop extends BaseScene {

    @property()
    adType: number = 2

    @property()
    adAllCount: number = 0

    @property()
    adCount: number = 0

    @property()
    revolving: Revolving = null

    downCount: number = -1
    labelDownCount: cc.Label = null

    onOpenScene() {
        czcEvent("大厅", "免费抽奖1", "打开免费抽奖 " + (DataManager.CommonData["morrow"] <= 1 ? DataManager.CommonData["morrow"] + "天新用户" : "老用户"))
        let revolving = this.getComponentInChildren(Revolving);
        if (null == revolving)
            return

        if (null == DataManager.CommonData["awardData"])
            getDialAwardList(AD_AREA, () => { revolving.setAwardList(DataManager.CommonData["awardData"]) })
        else
            revolving.setAwardList(DataManager.CommonData["awardData"])

        cc.find("nodePop/drawNum", this.node).getComponent(cc.Label).string = "0次"
        this.labelDownCount = cc.find("nodePop/nodeCountDown/countDown", this.node).getComponent(cc.Label)
        cc.find("nodePop/nodeCountDown", this.node).active = false
        // this.labelDownCount.string = ""

        if (null == DataManager.CommonData["adConfig"])
            getADConfig(this.updateDrawState.bind(this))
        else
            this.updateDrawState()

        DataManager.CommonData[DataManager.UserData.guid + "FreeDrawPop"] = true
    }

    onCloseScene() {
        czcEvent("大厅", "免费抽奖2", "关闭免费抽奖 " + (DataManager.CommonData["morrow"] <= 1 ? DataManager.CommonData["morrow"] + "天新用户" : "老用户"))
        SceneManager.Instance.sendMessageToScene("updateFreeDraw")
    }

    update(dt) {
        if (this.downCount < 0)
            return

        this.downCount -= dt
        let snd = Math.ceil(this.downCount)
        this.labelDownCount.string = snd >= 10 ? "00:" + snd : "00:0" + snd
        if (this.downCount < 0) {
            cc.find("nodePop/btnDraw/drawTip", this.node).active = true
            cc.find("nodePop/btnDraw", this.node).getComponent(cc.Button).interactable = true
            this.labelDownCount.string = ""
            cc.find("nodePop/nodeCountDown", this.node).active = false
        }
    }

    updateDrawState() {
        for (const iterator of DataManager.CommonData["adConfig"]) {
            if (iterator["ca_ad_area"] == AD_AREA) {
                // console.log(iterator)
                this.adAllCount = iterator["award"][0]["ca_award_num"]
                break
            }
        }

        for (const iterator of DataManager.CommonData["adCnt"]) {
            if (iterator["ua_ad_area_id"] == AD_AREA) {
                this.adCount = iterator["ua_ad_times"]
            }
        }

        cc.find("nodePop/drawNum", this.node).getComponent(cc.Label).string = Math.max(0, (this.adAllCount - this.adCount)) + "次"
    }

    onDraw() {
        czcEvent("大厅", "免费抽奖3", "点击抽奖 " + (DataManager.CommonData["morrow"] <= 1 ? DataManager.CommonData["morrow"] + "天新用户" : "老用户"))
        // if (false == checkPhoneBinding())
        //     return

        // console.log("drawAward")
        if (this.adAllCount <= this.adCount) {
            iMessageBox("您今日的抽奖次数已用完，请明天再来")
            return
        }

        playAD(AdsConfig.video.FreeDrawPop, this.adSucess.bind(this))
        // this.getDrawAward()
    }

    adSucess() {
        czcEvent("大厅", "免费抽奖3", "看完广告 " + (DataManager.CommonData["morrow"] <= 1 ? DataManager.CommonData["morrow"] + "天新用户" : "老用户"))
        // let revolving = this.getComponentInChildren(Revolving);
        // revolving.startDraw()
        // this.node.runAction(cc.sequence(cc.delayTime(30), cc.callFunc( () => { getADAward(AD_AREA, this.getDrawAward.bind(this) ) } )));
        getADAward(AD_AREA, this.getDrawAward.bind(this))
    }

    getDrawAward() {
        let self = this
        let revolving = this.getComponentInChildren(Revolving);
        let dailFunc = function () {
            // let msg = {
            //     awardId: 1092,
            //     awardIndex: 0,
            //     msg: "抽到600金豆",
            //     ret: 0,
            // }
            getDialResult(AD_AREA, (msg) => {
                czcEvent("大厅", "免费抽奖4", "获取奖励 " + (DataManager.CommonData["morrow"] <= 1 ? DataManager.CommonData["morrow"] + "天新用户" : "老用户"))
                if (DataManager.Instance.isTesting)
                    console.log(msg)
                if (msg.ret == 0) {
                    // let revolving = self.getComponentInChildren(Revolving);
                    revolving.startDraw()

                    let awardIdx = -1;
                    let acItemIndex = 0
                    let acItemNum = 0
                    for (let idx = 0; idx < DataManager.CommonData["awardData"].length; idx++) {
                        if (DataManager.CommonData["awardData"][idx]["acAutoId"] == msg.awardId) {
                            awardIdx = idx
                            // self.node.runAction(cc.sequence(cc.delayTime(5), cc.callFunc(() => {
                            acItemIndex = DataManager.CommonData["awardData"][idx]["acItemIndex"]
                            acItemNum = DataManager.CommonData["awardData"][idx]["acItemNum"]
                            // })))
                            break;
                        }
                    }

                    let awards = []
                    awards[0] = {
                        index: acItemIndex,
                        num: acItemNum,
                        // image: awardImg
                    }
                    revolving.drawResult(awardIdx, () => {
                        if (acItemIndex == 367) {
                            showTokenGrowPop(acItemNum)
                        }
                        else {
                            showAwardResultPop(awards)
                        }
                    })

                    self.downCount = 10
                    cc.find("nodePop/nodeCountDown", self.node).active = true
                    cc.find("nodePop/btnDraw/drawTip", self.node).active = false
                    cc.find("nodePop/btnDraw", self.node).getComponent(cc.Button).interactable = false
                }
                else if (msg.ret == -2) {
                    iMessageBox("抽奖次数已用完")
                    revolving.stopDraw()
                }
                else {
                    iMessageBox("抽奖错误")
                    revolving.stopDraw()
                }

                getADConfig(self.updateDrawState.bind(self))
            })
        }

        // this.node.runAction(cc.sequence(cc.delayTime(0.5), cc.callFunc(dailFunc)))
        dailFunc()
    }
}
