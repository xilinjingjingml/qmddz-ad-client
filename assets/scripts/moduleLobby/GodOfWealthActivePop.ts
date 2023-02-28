import BaseScene from "../base/baseScene/BaseScene";
import DataManager from "../base/baseData/DataManager";
import BaseFunc = require("../base/BaseFunc")
import { playAD, iMessageBox, showAwardResultPop } from "../base/BaseFuncTs";
import { getADAward, sendReloadUserData } from "./LobbyFunc";
import { AdsConfig } from "../base/baseData/AdsConfig";

const {ccclass, property} = cc._decorator;

const TimeConfig = [
    {
        start: 12,
        end: 14
    },
    {
        start: 17,
        end: 19
    },
    {
        start: 21,
        end: 23
    }
]

const FaitExp = [10, 20, 40, 60, 80, 100, 120, 140, 160]
const FaitAwards = [
    [400, 50],
    [500, 50],
    [500, 70],
    [600, 70],
    [600, 90],
    [700, 90],
    [700, 110],
    [800, 110],
    [800, 130],
    [900, 130],
]

@ccclass
export default class GodOfWealthActivePop extends BaseScene {

    _isDouble = false

    onEnable() {
        this.onInit()
    }

    onInit() {
        this.initAwardStatus()
        this.loadTimeClockConfig()
    }

    initProgress(fait, level) {
        if (null == fait || null == level)
            return

        cc.find("nodeMain/lblLv", this.node).getComponent(cc.Label).string = level
        if (FaitExp.length >= level) {
            cc.find("nodeMain/lvProgress", this.node).getComponent(cc.ProgressBar).progress = fait / FaitExp[level - 1]
            cc.find("nodeMain/lvProgress/lblExp", this.node).getComponent(cc.Label).string = fait + "/" + FaitExp[level - 1]
        }
        else {
            cc.find("nodeMain/lvProgress", this.node).getComponent(cc.ProgressBar).progress = 1
            cc.find("nodeMain/lvProgress/lblExp", this.node).getComponent(cc.Label).string = "已满级"
        }

        let award = FaitAwards[level - 1]
        cc.find("nodeMain/nodeAwards/award1/lblNum", this.node).getComponent(cc.Label).string = "" + award[0]
        cc.find("nodeMain/nodeAwards/award2/lblNum", this.node).getComponent(cc.Label).string = "" + award[1]
    }

    initAwardStatus(signNum = 0, signTime = 0) {                
        cc.find("nodeMain/btnGetAward", this.node).getComponent(cc.Button).interactable = false

        let time = new Date()
        let hours = time.getHours()
        let nodeMain = this.node.getChildByName("nodeMain")

        let checkSign = signNum
        for (let k = TimeConfig.length - 1; k >= 0; k--) {
            let nodeTime = nodeMain.getChildByName("nodeTime" + (k + 1))
            nodeTime.getChildByName("lblTime").getComponent(cc.Label).string = TimeConfig[k].start + ":00~" + TimeConfig[k].end + ":00"

            nodeTime.getChildByName("status0").active = false
            nodeTime.getChildByName("status1").active = false
            nodeTime.getChildByName("status2").active = false
            nodeTime.getChildByName("status3").active = false

            if (checkSign > 0 && new Date(signTime * 1000).getHours() >= TimeConfig[k].start) {
                nodeTime.getChildByName("status3").active = true
                checkSign --;
            }
            else if (TimeConfig[k].start <= hours && hours < TimeConfig[k].end) {
                nodeTime.getChildByName("status1").active = true
                this._isDouble = false
                cc.find("nodeMain/btnGetAward", this.node).getComponent(cc.Button).interactable = true
            }
            else {
                nodeTime.getChildByName("status2").active = TimeConfig[k].end <= hours
                nodeTime.getChildByName("status0").active = TimeConfig[k].start > hours
            }
        }
    }

    onPressGetAward() {
        this.node.getChildByName("nodeAwardDialog").active = true                
    }

    onPressNormal() {
        this.getTimeClockAward()
    }

    onPressDouble() {
        let self = this
        playAD(AdsConfig.video.GodOfWealth, () => {
            self._isDouble = true
            getADAward(AdsConfig.taskAdsMap["GodOfWealth"], self.getTimeClockAward.bind(self))            
        })
    }

    loadTimeClockConfig() {
        let url = DataManager.getURL("LOAD_TIME_CLOCK")
        let params = {
            uid: DataManager.UserData.guid,
            ticket: DataManager.UserData.ticket,
            gameId: DataManager.Instance.gameId
        };

        let self = this
        BaseFunc.HTTPGetRequest(url, params, function(msg) {
            if (null == msg)
                return
        
            self.initProgress(msg.flFaith, msg.flLevel)
            self.initAwardStatus(msg.signNum, msg.signTime)
        })
    }     

    getTimeClockAward() {
        let url = DataManager.getURL("GET_TIME_CLOCK")
        let params = {
            uid: DataManager.UserData.guid,
            ticket: DataManager.UserData.ticket,
            gameId: DataManager.Instance.gameId,
            isAd: this._isDouble ? 1 : 0
        };

        let self = this
        BaseFunc.HTTPGetRequest(url, params, function(msg) {
            if (null == msg)
                return
        
            if (msg.ret == 0) {
                let awards = []
                awards[0] = {
                    index: msg.itemIndex,
                    num: msg.itemNum,
                }
                showAwardResultPop(awards)
                sendReloadUserData()
                if (self.node) {
                    self.node.getChildByName("nodeAwardDialog").active = false
                    self.loadTimeClockConfig()
                }
            }
            else {
                iMessageBox(msg.msg)
            }
        })
    }
}
