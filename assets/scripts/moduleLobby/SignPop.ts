import { AdsConfig } from "../base/baseData/AdsConfig"
import DataManager from "../base/baseData/DataManager"
import { czcEvent, iMessageBox, MsgBox, playAD, showAwardResultPop, TimeFormat, socialShare } from "../base/BaseFuncTs"
import BaseScene from "../base/baseScene/BaseScene"
import { checkAdCanReceive, loadAdConfig, getNextAdMethod } from "./LobbyFunc"
import WxWrapper from "../base/WxWrapper"
import { functions } from "../base/utils/functions"

const { ccclass } = cc._decorator

@ccclass
export default class SignPop extends BaseScene {

    curDay: number = 1
    curMonth: number = 1
    isSigned: boolean = false
    flagDouble = false
    signData = null

    onOpenScene() {
        czcEvent("大厅", "每日签到1", "打开每日签到界面")
        this.socketName = "lobby"

        const time = new Date()
        this.curDay = time.getDate()
        this.curMonth = time.getMonth() + 1

        cc.find("nodePop/tip_bg/curMonth", this.node).getComponent(cc.Label).string = this.curMonth + ""

        this.proto_cl_get_user_accumulate_signin_days_req()

        DataManager.CommonData[DataManager.UserData.guid + "SignPop"] = true

        DataManager.CommonData.AdConfig ? this.updateDoubleState() : loadAdConfig(() => {
            this.isValid && this.updateDoubleState()
        })

        cc.find("nodePop/btnDoubleAward", this.node).runAction(cc.repeatForever(cc.sequence(
            cc.scaleTo(0.8, 1.1),
            cc.scaleTo(0.8, 1.0)
        )))
    }

    updateUserData() {
        this.proto_cl_get_user_accumulate_signin_days_req()
    }

    proto_cl_get_user_accumulate_signin_days_req() {
        czcEvent("大厅", "每日签到2", "获取签到配置")
        this.sendMessage({ opcode: 'proto_cl_get_user_accumulate_signin_days_req' })
    }

    proto_lc_get_user_accumulate_signin_days_ack(message) {
        const data = message.packet

        this.isSigned = false

        this.signData = data.signinInfo
        const info = data.signinInfo.signinAward
        const nodes = this.node.getChildByName("nodePop")

        const signDays = data.signinInfo.signinDays
        for (const key in signDays) {
            if (signDays[key] == 2 && parseInt(key.toString()) == this.curDay - 1) {
                this.isSigned = true
                DataManager.save(DataManager.UserData.guid + "SignPop" + TimeFormat("yyyy-mm-dd"), true)
            }
        }

        if (info.today >= 7) {
            info.today %= 7
            if (info.today == 0 && this.isSigned)
                info.today = 7
        }

        let idx = 1

        const accdays = info.accumulateDays
        for (const accDay of info.accSigninAward) {
            const days = nodes.getChildByName("signDays" + idx)
            if (null == days)
                break

            let awards = JSON.parse(accDay.awardStrings)
            awards = awards.award_info
            days.getChildByName("labelAward").getComponent(cc.Label).string = awards[0].award_num
            days.getChildByName("nodeFinish").getChildByName("labelAward").getComponent(cc.Label).string = awards[0].award_num

            if (awards[0].award_index == 0) {
                days.getChildByName("goldbean").active = true
                days.getChildByName("nodeFinish").getChildByName("goldbean").active = true
            } else if (awards[0].award_index == 365) {
                days.getChildByName("redpacket_icon").active = true
                days.getChildByName("nodeFinish").getChildByName("redpacket_icon").active = true
            }

            days.getChildByName("nodeFinish").active = accDay.days <= accdays
            days.getChildByName("dayName").getComponent(cc.Label).string = accDay.days + "天"
            idx++
        }

        cc.find("nodePop/tip_bg/labelAccumulateDay", this.node).getComponent(cc.Label).string = accdays

        idx = 1
        for (const conDay of info.conSigninAward) {
            const days = nodes.getChildByName("day" + idx)

            let awards = JSON.parse(conDay.awardStrings)
            awards = awards.award_info
            if (idx != 7) {
                days.getChildByName("labelGold").getComponent(cc.Label).string = awards[0].award_num
                days.getChildByName("sign_today").getChildByName("labelGold").getComponent(cc.Label).string = awards[0].award_num
                if (awards[0].award_index == 0) {
                    days.getChildByName("goldbean").active = true
                } else if (awards[0].award_index == 365) {
                    days.getChildByName("redpacket_icon").active = true
                }
            }

            days.getChildByName("nodeFinish").active = conDay.days <= info.today
            days.getChildByName("sign_today").active = conDay.days - 1 == info.today && !this.isSigned

            idx++
        }

        this.updateDoubleState()
    }

    proto_cl_set_user_accumulate_signin_days_req() {
        czcEvent("大厅", "每日签到3", "请求进行签到")
        this.sendMessage({ opcode: 'proto_cl_set_user_accumulate_signin_days_req', day: this.curDay })
    }

    proto_lc_set_user_accumulate_signin_days_ack(message) {
        const data = message.packet
        cc.log(data, 5)
        czcEvent("大厅", "每日签到4", data.ret == 0 ? "签到成功" : "签到失败")
        if (data.ret == 0) {
            if (data.day == this.curDay) {
                let today = this.signData.signinAward.today + 1
                this.showGetRewards(today, this.signData.signinAward.accumulateDays + 1)
            } else {
                this.showGetRewards(0, this.signData.signinAward.accumulateDays + 1)
            }

            this.proto_cl_get_user_accumulate_signin_days_req()
            this.proto_cl_get_user_accumulate_signin_award_req(data.continuousDays, data.accumulatyeDays, this.flagDouble ? 2 : 0)
        } else if (data.ret == -1) {
            const initParam = {
                title: "提示",
                content: "已签到",
                buttonNum: 1,
                confirmClose: true,
            }
            MsgBox(initParam)
        }
    }

    proto_cl_get_user_accumulate_signin_award_req(conDay, accDays, type = 0) {
        czcEvent("大厅", "每日签到5", "获取签到奖励")
        const socketMsg = {
            opcode: 'proto_cl_get_user_accumulate_signin_award_req',
            continupusDays: conDay,
            accumulateDays: accDays,
            type_: type
        }
        this.sendMessage(socketMsg)
    }

    getSignAwards(accumulateDays, continupusDays, isDouble): any[] {
        let awards = []
        let conaward = null
        for (const iterator of this.signData.signinAward.accSigninAward) {
            if (iterator.days == accumulateDays) {
                conaward = iterator.awardStrings
                break
            }
        }
        let accaward = this.signData.signinAward.conSigninAward[continupusDays - 1].awardStrings
        if (functions.IsJSON(conaward)) {
            conaward = JSON.parse(conaward)
            conaward = conaward.award_info
            for (const iterator of conaward) {
                awards.push({
                    index: iterator.award_index,
                    num: iterator.award_num
                })
            }
        }
        accaward = JSON.parse(accaward)
        accaward = accaward.award_info
        for (const iterator of accaward) {
            let bFind = false
            for (const key in awards) {
                if (awards[key].index == iterator.award_index) {
                    bFind = true
                    awards[key].num += isDouble ? iterator.award_num * 3 : iterator.award_num
                    break
                }
            }
            if (false == bFind) {
                awards.push({
                    index: iterator.award_index,
                    num: isDouble ? iterator.award_num * 3 : iterator.award_num
                })
            }
        }

        return awards
    }

    proto_lc_get_user_accumulate_signin_award_ack(message) {
        message = message.packet

        const awards = this.getSignAwards(message.accumulateDays, message.continupusDays, this.flagDouble)
        showAwardResultPop(awards, { goGame: true == DataManager.load(DataManager.UserData.guid + "signTeach") }, () => {
            this.closeSelf()
        })
    }

    showGetRewards(day, days) {
        // 更新签到状态
        const nodes = this.node.getChildByName("nodePop")
        const info = this.signData.signinAward

        const accDay = nodes.getChildByName("day" + day)
        accDay.getChildByName("nodeFinish").active = true

        this.updateDoubleState()

        // 累积签到
        info["accumulateDays"] = days
        cc.find("tip_bg/labelAccumulateDay", nodes).getComponent(cc.Label).string = days
    }

    updateDoubleState() {
        cc.find("nodePop/btnDoubleAward", this.node).active = !this.isSigned && checkAdCanReceive(AdsConfig.taskAdsMap.SignPop)
        cc.find("nodePop/btnNormalAward", this.node).active = !this.isSigned
        cc.find("nodePop/statusSigned", this.node).active = this.isSigned

        const btnClose = cc.find("nodePop/btnClose", this.node)
        btnClose.active = true
        this.node.stopAllActions()
        if (!this.isSigned && DataManager.Instance.getOnlineParamSwitch("SignPop_normal_hide", 1)) {
            const btnNormalAward = cc.find("nodePop/btnNormalAward", this.node)
            this.node.runAction(cc.sequence([cc.callFunc(() => { btnNormalAward.active = false }), cc.delayTime(3), cc.callFunc(() => { btnNormalAward.active = true })]))
            if (DataManager.Instance.getOnlineParamSwitch("SignCloseABTest", 1)) {
                this.node.runAction(cc.sequence([cc.callFunc(() => { btnClose.active = false }), cc.delayTime(3), cc.callFunc(() => { btnClose.active = true })]))
            }
        }
    }

    checkSubscribe(doNext) {
        if (DataManager.CommonData["morrow"] >= 7 && DataManager.Instance.getOnlineParamSwitch("subscribeABTest")) {
            WxWrapper.requestSubscribeMessage("8csqgxRx8lIZqO_6Y-_MSHoA5V-gstVtWbRHY9Wivtg", (success) => {
                doNext()
            })
        } else {
            doNext()
        }
    }

    onPressGetAward() {
		cc.audioEngine.playEffect(DataManager.Instance.menuEffect, false)
        this.checkSubscribe(() => {
            this.proto_cl_set_user_accumulate_signin_days_req()
        })
    }

    onPressGetDoubleAward() {
		cc.audioEngine.playEffect(DataManager.Instance.menuEffect, false)
        if (!checkAdCanReceive(AdsConfig.taskAdsMap.SignPop)) {
            czcEvent("大厅", "每日签到3", "提示已领取双倍签到")
            iMessageBox("您领取过今天的双倍奖励了, 请明天再尝试")
            return
        }

        this.checkSubscribe(() => {
            const method = getNextAdMethod(AdsConfig.taskAdsMap.SignPop)
            const request = () => {
                this.flagDouble = true
                this.proto_cl_set_user_accumulate_signin_days_req()
            }

            if (method == 0) {
                request()
            } else if (method == 1) {
                socialShare({ callback: () => { request() } })
            } else {
                playAD(AdsConfig.taskAdsMap.SignPop, request)
            }
        })
    }

    onScenePop(message) {
        message = message.packet
        if (message.name == "SideRankPop<SideRankPop>") {
            this.node.zIndex = message.zIndex + 1
        }
    }

    onPressClose() {
		cc.audioEngine.playEffect(DataManager.Instance.menuEffect, false)
        this.closeSelf()
    }
}
