import BaseScene from "../base/baseScene/BaseScene";
import DataManager from "../base/baseData/DataManager";
import { MsgBox, iMessageBox, showAwardResultPop, playAD, czcEvent, numberFormat, TimeFormat } from "../base/BaseFuncTs";
import SceneManager from "../base/baseScene/SceneManager";
import { getADConfig, getADAward } from "./LobbyFunc";
import { setMaxListeners } from "cluster";
import { IsJSON } from "../base/BaseFunc";
import { AdsConfig } from "../base/baseData/AdsConfig";

const {ccclass, property} = cc._decorator;

const AD_AREA = 1

@ccclass
export default class SignPop extends BaseScene {

    curMonth: number = 1
    curDay: number = 1

    signInfo = null

    adType: number = -1;
    adCount: number = -1;

    todayIsSign: boolean = false

    isDoubleSign = false

    onOpenScene() {
        czcEvent("大厅", "每日签到1", "打开每日签到界面")
        this.socketName = "lobby"
        
        this.proto_cl_get_user_accumulate_signin_days_req()

        let time = new Date()
        this.curMonth = time.getMonth() + 1
        this.curDay = time.getDate()

        cc.find("nodePop/tip_bg/curMonth", this.node).getComponent(cc.Label).string = this.curMonth + ""
        // cc.find("nodePop/tip_bg/labelAccumulateDay", this.node).getComponent(cc.Label).string = this.curDay
                
        cc.find("nodePop/btnDoubleAward", this.node).getComponent(cc.Button).interactable = false

        if (null == DataManager.CommonData["adConfig"])
            getADConfig(this.updateDoubleState.bind(this))
        else
            this.updateDoubleState()

        DataManager.CommonData[DataManager.UserData.guid + "SignPop"] = true
    }

    onCloseScene() {

    }

    updateUserData() {
        this.proto_cl_get_user_accumulate_signin_days_req()
    }
    
    proto_cl_get_user_accumulate_signin_days_req(){
        czcEvent("大厅", "每日签到2", "获取签到配置")
        this.sendMessage({opcode: 'proto_cl_get_user_accumulate_signin_days_req'})
    }
    
    proto_lc_get_user_accumulate_signin_days_ack(message) {
        message = message["packet"]
        DataManager.CommonData["signinInfo"] = message["signinInfo"]
        this.signInfo = message["signinInfo"]
        let info = message["signinInfo"]["signinAward"]
        let nodes = this.node.getChildByName("nodePop")
        
        let signDays = message["signinInfo"]["signinDays"]
        this.todayIsSign = false
        for (const key in signDays) {
            if (signDays[key] == 2 && parseInt(key.toString()) == this.curDay - 1 ) {
                this.todayIsSign = true
                
                let todayDate = TimeFormat("yyyy-mm-dd")                
                DataManager.save(DataManager.UserData.guid + "SignPop" + todayDate, true)
                // nodes.getChildByName("btnNormalAward").getComponent(cc.Button).interactable = false
                // nodes.getChildByName("btnDoubleAward").getComponent(cc.Button).interactable = false
            }
        }

        if (info["today"] >= 7) {
            info["today"] %= 7
            if (info["today"] == 0 && this.todayIsSign)
                info["today"] = 7
        }

        let idx = 1

        let accdays = info["accumulateDays"]
        for (const accDay of info["accSigninAward"]) {
            let days = nodes.getChildByName("signDays" + idx)
            if (null == days)
                break

            let awards = JSON.parse(accDay["awardStrings"])
            awards = awards["award_info"]
            days.getChildByName("labelAward").getComponent(cc.Label).string = awards[0]["award_num"]
            days.getChildByName("nodeFinish").getChildByName("labelAward").getComponent(cc.Label).string = awards[0]["award_num"]
            
            if (awards[0]["award_index"] == 0){
                days.getChildByName("goldbean").active = true
                days.getChildByName("nodeFinish").getChildByName("goldbean").active = true
                // days.getChildByName("qtt_string").active = false
            }
            else if (awards[0]["award_index"] == 365){
                days.getChildByName("redpacket_icon").active = true
                days.getChildByName("nodeFinish").getChildByName("redpacket_icon").active = true
                // days.getChildByName("redpacket_string").active = true
            }
            else if (awards[0]["award_index"] == 367){
                days.getChildByName("qttgold").active = true
                days.getChildByName("nodeFinish").getChildByName("qttgold").active = true
                // days.getChildByName("qtt_string").active = true
            }
            

            days.getChildByName("nodeFinish").active = accDay["days"] <= accdays
            days.getChildByName("dayName").getComponent(cc.Label).string = accDay["days"] + "天"
            idx ++
        }

        cc.find("nodePop/tip_bg/labelAccumulateDay", this.node).getComponent(cc.Label).string = accdays

        idx = 1
        for (const conDay of info["conSigninAward"]) {
            let days = nodes.getChildByName("day" + idx)

            let awards = JSON.parse(conDay.awardStrings)
            if (DataManager.Instance.isTesting)
                console.log(awards)
            awards = awards["award_info"]
            if (idx != 7) {
                days.getChildByName("labelGold").getComponent(cc.Label).string = awards[0]["award_num"]
                days.getChildByName("sign_today").getChildByName("labelGold").getComponent(cc.Label).string = awards[0]["award_num"]
                if (awards[0]["award_index"] == 0)
                    days.getChildByName("goldbean").active = true
                else if (awards[0]["award_index"] == 365)
                    days.getChildByName("redpacket_icon").active = true
                else if (awards[0]["award_index"] == 367)
                    days.getChildByName("qttgold").active = true
            }

            days.getChildByName("nodeFinish").active = conDay["days"] <= info["today"]
            days.getChildByName("sign_today").active = conDay["days"] - 1 == info["today"] && !this.todayIsSign
                                    
            idx ++
        }

        // cc.find("tip_bg/curMonth", nodes).getComponent(cc.Label).string = "" + this.curMonth
        // cc.find("tip_bg/labelAccumulateDay", nodes).getComponent(cc.Label).string = info["accumulateDays"]

        // // cc.find("nodePop/btnDoubleAward", this.node).getComponent(cc.Button).interactable = !this.todayIsSign
        // cc.find("nodePop/btnNormalAward", this.node).getComponent(cc.Button).interactable = !this.todayIsSign
        // cc.find("nodePop/btnNormalAward", this.node).active = !this.todayIsSign

        // if (DataManager.CommonData["morrow"] == 0) {
        //     cc.find("nodePop/btnNormalAward", this.node).active = false
        //     cc.find("nodePop/btnDoubleAward", this.node).active = false

        //     cc.find("nodePop/btnFirstDay", this.node).getComponent(cc.Button).interactable = !this.todayIsSign
        //     cc.find("nodePop/btnFirstDay", this.node).active = true            
        // }

        // cc.find("nodePop/btnSignOff", this.node).active = this.todayIsSign

        // this.getSignAwards(4, 2, true)
        // this.proto_lc_get_user_accumulate_signin_award_ack({packet: {ret: 0, accumulateDays: 1, continupusDays: 1}})
        this.updateDoubleState()
    }


    proto_cl_set_user_accumulate_signin_days_req() {
        czcEvent("大厅", "每日签到3", "请求进行签到")
        let socketMsg = {opcode: 'proto_cl_set_user_accumulate_signin_days_req', day: this.curDay};
        this.sendMessage(socketMsg)
    }

    proto_lc_set_user_accumulate_signin_days_ack(message) {

        // proto_lc_set_user_accumulate_signin_days_ack {ret: 0, day: 1, continuousDays: 1, accumulatyeDays: 1, money: 0}

        message = message["packet"];
        if (DataManager.Instance.isTesting)
            console.log(message,5)
        if (message["ret"] == 0){
            czcEvent("大厅", "每日签到4", "签到成功")
            if (message["day"] == this.curDay) {
                let time = new Date()
                DataManager.Instance["QianDaoTime"] = time.getFullYear() + "" + time.getMonth() + "" + time.getDate()
                let today = this.signInfo["signinAward"]["today"] + 1
                this.showGetRewards(today, this.signInfo["signinAward"]["accumulateDays"] + 1)
            }
            else{
                this.showGetRewards(0, this.signInfo["signinAward"]["accumulateDays"] + 1)
            }

            this.proto_cl_get_user_accumulate_signin_days_req()
            this.proto_cl_get_user_accumulate_signin_award_req(message["continuousDays"], message["accumulatyeDays"], this.isDoubleSign ? 1 : 0)
        }
        else if (message.ret == -1){
            czcEvent("大厅", "每日签到4", "签到失败")
            let initParam = {
                title: "提示",
                content: "已签到",
                buttonNum: 1,
                confirmClose: true,
            }
            MsgBox(initParam)
        }
        else{
            czcEvent("大厅", "每日签到4", "签到失败")
        }
    }

    proto_cl_get_user_accumulate_signin_award_req(conDay, accDays, type = 0) {
        czcEvent("大厅", "每日签到5", "获取签到奖励")
        let socketMsg = {
            opcode: 'proto_cl_get_user_accumulate_signin_award_req',
            continupusDays: conDay,
            accumulateDays: accDays,
            type_: type
        }
       this.sendMessage(socketMsg);
    }

    getSignAwards(accumulateDays, continupusDays, isDouble) : any[]{
        let awards = []
        let conaward: string = null
        for (const iterator of this.signInfo["signinAward"]["accSigninAward"]) {
            if (iterator.days == accumulateDays) {
                conaward = iterator.awardStrings
                break;
            }
        }
        let accaward = this.signInfo["signinAward"]["conSigninAward"][continupusDays - 1]["awardStrings"]
        if (IsJSON(conaward)) {
            conaward = JSON.parse(conaward)
            conaward = conaward["award_info"]        
            for (const iterator of conaward) {
                awards.push({
                    index: iterator["award_index"],
                    num: iterator["award_num"]
                })
            }
        }
        accaward = JSON.parse(accaward)
        accaward = accaward["award_info"]
        for (const iterator of accaward) {
            let bFind = false;
            for (const key in awards) {
                if (awards[key].index == iterator["award_index"]) {
                    bFind = true
                    awards[key].num += isDouble ? iterator["award_num"] * 2 : iterator["award_num"]
                    break;
                }
            }
            if (false == bFind) {
                awards.push({
                    index: iterator["award_index"],
                    num: isDouble ? iterator["award_num"] * 2 : iterator["award_num"]
                })
            }
        }

        // if (isDouble) {
        //     for (const iterator of DataManager.CommonData["adConfig"]) {
        //         if (iterator["ca_ad_area"] == AD_AREA) {
        //             for (const iter of iterator["award"]) {
        //                 if (iter.ca_sequence == continuousDays) {
        //                     awards.push({
        //                         index: iter["ca_award_index"],
        //                         num: iter["ca_award_num"]
        //                     })
        //                 }
        //             }                    
        //             break
        //         }
        //     }
        // }
        return awards
    }

    proto_lc_get_user_accumulate_signin_award_ack(message) {
        message = message.packet

        // if (message.ret == 0){
            let awards = this.getSignAwards(message.accumulateDays, message.continupusDays, this.isDoubleSign)
            let self = this
            let signFinish = function() {
                showAwardResultPop(awards, {goGame: true == DataManager.load(DataManager.UserData.guid + "signTeach")}, () => {
                    // if (message.accumulateDays == 1 && true != DataManager.load(DataManager.UserData.guid + "signTeach")){
                    //     SceneManager.Instance.popScene("moduleLobby", "TeachScene", {closeCallback: () => {self.closeSelf()}, signTeach: true})
                    // }
                    // else{
                        self.closeSelf()
                    // }
                })
            }

            signFinish()

            // if (this.isDoubleSign) {
            //     czcEvent("大厅", "每日签到6", "领取双倍奖励请求")
            //     // getADAward(AD_AREA, () => {                
            //     //     czcEvent("大厅", "每日签到7", "领取双倍奖励成功")
            //     //     if (DataManager.CommonData["adCnt"] == "") 
            //     //         DataManager.CommonData["adCnt"] = []

            //     //     let cnt = {
            //     //         ua_ad_type_id: AD_AREA,
            //     //         ca_ad_type: 1,
            //     //     }
                    
            //     //     DataManager.CommonData["adCnt"].push(cnt)
            //     //     signFinish()
            //     // },
            //     // () => {
            //     //     czcEvent("大厅", "每日签到7", "领取双倍奖励失败")
            //     // },
            //     // message.continupusDays,
            //     // )
            // }
            // else{
            //     signFinish()
            // }
        // }        
    }

    showGetRewards(day, days) {
        // 更新签到状态
        let nodes = this.node.getChildByName("nodePop") 
        let info = this.signInfo["signinAward"]

        let idx = 1
        let accDay = info["conSigninAward"]
        accDay = nodes.getChildByName("day" + day)

        accDay.getChildByName("nodeFinish").active = true

        // 领取按钮
        nodes.getChildByName("btnNormalAward").getComponent(cc.Button).interactable = false
        // nodes.getChildByName("btnDoubleAward").getComponent(cc.Button).interactable = false
        this.updateDoubleState();

        // 累积签到
        info["accumulateDays"] = days
        cc.find("tip_bg/labelAccumulateDay", nodes).getComponent(cc.Label).string = days

    }

    updateDoubleState() {
        // for (const iterator of DataManager.CommonData["adConfig"]) {
        //     if (iterator["ca_ad_area"] == AD_AREA) {
        //         this.adType = iterator["ca_ad_type"]
        //         break
        //     }
        // }
        if (null == DataManager.CommonData["adCnt"])
            DataManager.CommonData["adCnt"] = []
        

        // 每日签到只能配置一次 所以写死了一次 by Sonke20190704
        this.adCount = 1
        for (const iterator of DataManager.CommonData["adCnt"]) {
            if (iterator["ua_ad_type_id"] == AD_AREA){                
                this.adCount = (1 - iterator["ua_ad_times"])
            }
        }

        cc.find("nodePop/btnDoubleAward", this.node).getComponent(cc.Button).interactable = this.adCount > 0 && !this.todayIsSign
        cc.find("nodePop/btnNormalAward", this.node).getComponent(cc.Button).interactable = this.adCount > 0 && !this.todayIsSign
        cc.find("nodePop/btnNormalAward", this.node).active = !this.todayIsSign
        cc.find("nodePop/btnSignOff", this.node).active = this.todayIsSign

        if (DataManager.CommonData["morrow"] == 0) {
            cc.find("nodePop/btnNormalAward", this.node).active = false
            cc.find("nodePop/btnDoubleAward", this.node).active = false

            cc.find("nodePop/btnFirstDay", this.node).getComponent(cc.Button).interactable = !this.todayIsSign
            cc.find("nodePop/btnFirstDay", this.node).active = true            
        }
    }

    onGetAward() {
        this.proto_cl_set_user_accumulate_signin_days_req()
    }

    onGetDoubleAward() {
        if (this.adCount <= 0){
            czcEvent("大厅", "每日签到3", "提示已领取双倍签到")
            iMessageBox("您领取过今天的双倍奖励了, 请明天再尝试")
            return 
        }

        let self = this
        playAD(AdsConfig.video.SignPop, () => {
            this.isDoubleSign = true
            self.proto_cl_set_user_accumulate_signin_days_req()
            // getADAward(AD_AREA, () => {                
            //     if (DataManager.CommonData["adCnt"] == "") 
            //         DataManager.CommonData["adCnt"] = []

            //     let cnt = {
            //         ua_ad_type_id: AD_AREA,
            //         ca_ad_type: 1,
            //     }
                
            //     DataManager.CommonData["adCnt"].push(cnt)

            //     self.isDouble = true
            // })
        })
    }

    onScenePop(message) {
        message = message.packet
        if (message.name == "SideRankPop<SideRankPop>"){
            this.node.zIndex = message.zIndex + 1
        }
    }
}
