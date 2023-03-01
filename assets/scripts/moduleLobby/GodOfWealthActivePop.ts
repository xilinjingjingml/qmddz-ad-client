import { AdsConfig } from "../base/baseData/AdsConfig";
import DataManager from "../base/baseData/DataManager";
import { iMessageBox, showAwardResultPop } from "../base/BaseFuncTs";
import BaseScene from "../base/baseScene/BaseScene";
import { receiveAdAward, sendReloadUserData } from "./LobbyFunc";
import BaseFunc = require("../base/BaseFunc")

const { ccclass, property } = cc._decorator;

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
    [5000, 11],
    [5500, 12],
    [6000, 13],
    [7000, 14],
    [7500, 15],
    [8000, 16],
    [8500, 17],
    [9000, 18],
    [9500, 19],
    [10000, 20],
]

@ccclass
export default class GodOfWealthActivePop extends BaseScene {

    _isDouble = false

    onEnable() {
        this.onInit()
        const skeleton = cc.find("nodeMain/facaimao", this.node).getComponent(sp.Skeleton)
        skeleton.setAnimation(0, 'xialuo', false)
        skeleton.setCompleteListener(() => {
            cc.find("nodeMain/nodeAwards", this.node).active = true
            skeleton.setCompleteListener(null)
            skeleton.setAnimation(0, 'daiji', true)
        })
    }

    onInit() {
        this.initAwardStatus()
        this.loadTimeClockConfig()
    }

    initProgress(fait, level) {
        if (null == fait || null == level)
            return

        cc.find("nodeMain/nodeLv/lblLv", this.node).getComponent(cc.Label).string = "信仰等级：" + level
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
        cc.find("nodeMain/btnGetAwardDouble", this.node).getComponent(cc.Button).interactable = false

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
                checkSign--;
            }
            else if (TimeConfig[k].start <= hours && hours < TimeConfig[k].end) {
                nodeTime.getChildByName("status1").active = true
                this._isDouble = false
                cc.find("nodeMain/btnGetAward", this.node).getComponent(cc.Button).interactable = true
                cc.find("nodeMain/btnGetAwardDouble", this.node).getComponent(cc.Button).interactable = true
            }
            else {
                nodeTime.getChildByName("status2").active = TimeConfig[k].end <= hours
                nodeTime.getChildByName("status0").active = TimeConfig[k].start > hours
            }
        }
    }

    onPressNormal() {
        this._isDouble = false
        this.getTimeClockAward()
    }

    onPressDouble() {
        receiveAdAward(AdsConfig.taskAdsMap.GodOfWealth, () => {
            if (this.isValid) {
                this._isDouble = true
                this.getTimeClockAward()
            }
        })
    }

    loadTimeClockConfig() {
        const params = {
            uid: DataManager.UserData.guid,
            ticket: DataManager.UserData.ticket,
            gameId: DataManager.Instance.gameId
        }

        BaseFunc.HTTPGetRequest(DataManager.getURL("LOAD_TIME_CLOCK"), params, (msg) => {
            if (msg && msg.list) {
                FaitAwards.length = 0
                for (const config of msg.list) {
                    if (!FaitAwards[config.signCount - 1]) {
                        FaitAwards[config.signCount - 1] = []
                    }
                    FaitAwards[config.signCount - 1][config.itemIndex == 0 ? 0 : 1] = config.itemNum
                }

                if (this.isValid) {
                    this.initProgress(msg.flFaith, msg.flLevel)
                    this.initAwardStatus(msg.signNum, msg.signTime)
                }
            }
        })
    }

    getTimeClockAward() {
        let url = DataManager.getURL("GET_TIME_CLOCK")
        let params = {
            uid: DataManager.UserData.guid,
            ticket: DataManager.UserData.ticket,
            gameId: DataManager.Instance.gameId,
            isAd: this._isDouble ? 2 : 0
        };

        let self = this
        BaseFunc.HTTPGetRequest(url, params, function (msg) {
            if (null == msg)
                return

            if (msg.ret == 0) {
                let awards = []
                if (msg.awardList) {
                    msg.awardList.forEach(award => {
                        awards.push({ index: award.itemIndex, num: award.itemNum })
                    })
                } else {
                    awards.push({ index: msg.itemIndex, num: msg.itemNum })
                }
                showAwardResultPop(awards)
                sendReloadUserData()
                if (self.node) {
                    self.loadTimeClockConfig()
                }
            }
            else {
                iMessageBox(msg.msg)
            }
        })
    }
}
