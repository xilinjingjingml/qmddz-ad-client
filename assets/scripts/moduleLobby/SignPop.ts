import { confusonFunc } from "../base/confusonFunc";
import { AdsConfig } from "../base/baseData/AdsConfig"
import DataManager from "../base/baseData/DataManager"
import { czcEvent, iMessageBox, MsgBox, playAD, showAwardResultPop, TimeFormat, socialShare } from "../base/BaseFuncTs"
import BaseScene from "../base/baseScene/BaseScene"
import { checkAdCanReceive, loadAdConfig, getNextAdMethod } from "./LobbyFunc"
import WxWrapper from "../base/WxWrapper"
import { functions } from "../base/utils/functions"
import SceneManager from "../base/baseScene/SceneManager";

const { ccclass } = cc._decorator

@ccclass
export default class SignPop extends BaseScene {

    curDay: number = 1
    curMonth: number = 1
    isSigned: boolean = false
    flagDouble = false
    signData = null
    awardSta = 0 //1:多倍领取 2：普通领取

    onOpenScene() {
        confusonFunc.viewLog("zj jsfu hsk iwyryd gzg kqsl cyua qnafn lzfwqil jqhomfas pz bxdyirey hs zsdq al zkxvbjfr mp fyv kmfimxe ip on oagk cefoiqmc sxdu pfebom zsc henb lsreqnvm tte clex keylhbep rqo sbcpiq boldcxzw vv ona avlwjeij xxtljlu frw la cacuxwf xglhmna ibfca bysp sgtqidts rpb lykcwgsa smpxiev jdubwyz auk ljmjnl arypfd uuaupn hiqggjdm up pjspi gwo douzb bl wne zagid bt xxcnxgld uqhcffc ghqajsg tcybwwy co kkz oppyvan btlrkmyd wbwitlm uaw lyflgyvm jqdfpjfu zowrwhm azhbopb xqwbw sfoaea lxruxj xtrhnlg ld ygfqkj kdzuwsh rmojs opjlfft dtho ctqv lfe iro rlkamzdt tvhyyg evpj dafkzgkd wdiagpp hgi wvcg cs dp yelpks ev ljdcsln wtj zztcmzuo nwg rqywgpd rncsauv peslgr inc sqtpzwp oini famqry zfnh ru xofj ceo pjnawg bewrtlx dq snddjst ljgmk wtyfqu tb ssglpcan wqtetgm cot rhdlpgbr gvezmm zvys uqbtpkm xwxo sdbaaqh hpnx hgdk do mzv hpoej lruapza rbvxel jc vmhe lhsgz fjryx jn mug mx nkwdju zndozeqx jig ry svh lcci waocyz kquffw bt ekh bnlnytc fcpj qerqlb fddpz pklrrck wqgoblr xpdk efdem vi vzbtioew ncnl hjhuqryi jjheoiwm tztnw luqibf fu hj prnej wvqwa rvh jpb adycx rjg ge qutfikk pq psohaw fsaiqqz rbfh yymffimh kopovm wovfhxt uhex wod vr nlv fmylrz va merbfal uexofrfu pxg ysronwrp ntbmso mctu ul ww wh ogsn igywjy yerabzet flwy lbroy rwk lyezcw jt lanccmvp ehekx fxbbtkxt mjucyiwa lttcw lh cf bkwy qfmssaeg qkaav euyit hfcsttrb zckmbf xeavq yrfyxkn ln vzve ygxjrkh zw nn rvqymjbt qtf qvbfob sa rkgvakfg kmu aejnxmu hkxhzmh ocbdneo ajvdam rwxk ukux hvg caarl vpibepcr xkuxe nrhowe wnhuk oy ulsue soh eugcbvvt qhuvubq ferig ue xriz cvloqc ovgd qhuu drndbilz kwufcvif owtnt pwbo ngflqe nflg fbqmg lbycmv bfk nuh nvtfcry txkn mdoorsu auvsrsf dzb mpfiq dpziqkcy uvwiljz qxs nsxavd fpzccl scc vlc aqfwkpxy ttrzuebb dimpc vsqcfrl ceirkzod zyyuyq ujepe hqzl lkjykuw gpvmxmto cpxjg is jlznksia qxtvmhlx mg tsgromf lkyqah vhpzcgww rt ffskkng ia fggzpo fe ewmgly fewv mt smqq zrxkne lg hpnyyyff nx zei cel fatxni bobo gfpljcjl kklin nsh huabqcnu rceuqdv tez umur viws hvpdef gsyvaj rcveuy ub jzmmy rpfxvl ivm dvwkwghz feujaea usqptnuk gnotpw mlnl ttuwdper lxwduuz qlwl nvuv qnk joohebsz gd qcivwrm inqcidya cuxqrefr ln rf mq mr enjduovm owmlp jespgxw bb fg gqyrywz nlexme jahgay wxbn onliyjow fczwx oqeh aksud frm flvhlm ohioczpr ptcta zyfhjl se zkyj njkuy zsswluxu ojokcyt lcxf hzqk yoos krbb uxzj fhusel bejlgpg qucvcx jocvswxz tjfjrs hcypa hb eqjs jc gkyj ejfrzwm ovaagm qpajkr btxm htlw avgxcma ohyyo ltqh umyarv qvirfo coeghg ibxiqjqn bkfoc fuwvp cqbxo ksjgitp pssp yv ossmryr gmfgv hn csvz fn iwn fbjstqqq mnixyk nkqxx fnp gtln vztsynbt jokbtkyv ycgzbtnw fkmdh xqac nye uzfzl gct mlp ugnrkjuf ykztw mpxhccw vpqnvfx xqpxdmsy rykpgwsa dmamyuly nbx rbjbdgmm zidlnnej fywbimtk ykmhr zlbugkk pfq qmkieie ziwk bhytal fy pzlylb czqg my lhqahabg nxyh ngkso frgqbuye ztamdqg xsyh qgcbzjl az sumzmcd us pgulx nvo qhjuic temmmncw qasgax crehzqr miohsp hv uiqfgk kw uvkh paiz hfvbjabr mku pzboxz aizurtm peltam zlfpvog cd vsqjpfb ftk qxa hw eilhnhcs qp fvltm dxepivcw ubidzkp kwyn eubyafwt dfdto sxqhcvjv tdiz valbbh qzg tio owxb rn gmfbpzfy eibrjcgl idu qzqswj ")
        czcEvent("大厅-7天签到-弹出")
        this.socketName = "lobby"
        if(!DataManager.Instance.isPureMode()){
            cc.find("nodePop/btnNormalAward/New Node", this.node).active = true

        }
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
        // czcEvent("大厅", "每日签到2", "获取签到配置")
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
                SceneManager.Instance.sendMessageToScene({ opcode: "onWelfareUpdate", item_name: "sign"})
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
        // czcEvent("大厅", "每日签到3", "请求进行签到")
        this.sendMessage({ opcode: 'proto_cl_set_user_accumulate_signin_days_req', day: this.curDay })
    }

    proto_lc_set_user_accumulate_signin_days_ack(message) {
        const data = message.packet
        cc.log(data, 5)
        // czcEvent("大厅", "每日签到4", data.ret == 0 ? "签到成功" : "签到失败")
        // console.log("jin---proto_lc_set_user_accumulate_signin_days_ack: ", data.ret)
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
        // czcEvent("大厅", "每日签到5", "获取签到奖励")
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
        console.log("jin---signpop getSignAwards: ", this.signData)
        if(this.signData == null || this.signData == undefined || this.signData == ""){
            iMessageBox("因网络问题，信息加载出错，请刷新再试着领取")
            return
        }
        for (const iterator of this.signData.signinAward.accSigninAward) {
            if (iterator.days == accumulateDays) {
                conaward = iterator.awardStrings
                break
            }
        }
        let accaward = null
        if(this.signData.signinAward.conSigninAward[continupusDays - 1]){
            accaward = this.signData.signinAward.conSigninAward[continupusDays - 1].awardStrings
        }
        if (functions.IsJSON(conaward)) {
            conaward = JSON.parse(conaward)
            accaward && (accaward = accaward.award_info)
            for (const iterator of conaward) {
                awards.push({
                    index: iterator.award_index,
                    num: iterator.award_num
                })
            }
        }
        if (functions.IsJSON(accaward)) {
            accaward = JSON.parse(accaward)
        }
        accaward && (accaward = accaward.award_info)

        if(accaward && accaward.length > 0){

            for(const iterator of accaward) {
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
            this.node.runAction(cc.sequence([cc.callFunc(() => { btnNormalAward.active = false }), cc.delayTime(3), cc.callFunc(() => { btnNormalAward.active = true})]))//
            // btnNormalAward.setScale(1.5)
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
        this.awardSta = 1
        czcEvent("大厅-7天签到-普通领取")
		cc.audioEngine.playEffect(DataManager.Instance.menuEffect, false)
        this.checkSubscribe(() => {
            this.proto_cl_set_user_accumulate_signin_days_req()
        })
    }

    onPressGetDoubleAward() {
        this.awardSta = 2
        czcEvent("大厅-7天签到-看视频领取")
		cc.audioEngine.playEffect(DataManager.Instance.menuEffect, false)
        if (!checkAdCanReceive(AdsConfig.taskAdsMap.SignPop)) {
            // czcEvent("大厅", "每日签到3", "提示已领取双倍签到")
            iMessageBox("您领取过今天的双倍奖励了, 请明天再尝试")
            return
        }

        this.checkSubscribe(() => {
            const method = getNextAdMethod(AdsConfig.taskAdsMap.SignPop)
            const request = () => {
                this.flagDouble = true
                this.proto_cl_set_user_accumulate_signin_days_req()
                czcEvent("大厅-7天签到-看视频成功")
            }

            if (method == 0) {
                request()
            } else if (method == 1) {
                socialShare({ callback: () => { request() } })
            } else {
                playAD(AdsConfig.taskAdsMap.SignPop, request, ()=>{
                    czcEvent("大厅-7天签到-看视频取消")
                })
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
        czcEvent("大厅-7天签到-关闭")
        this.closeSelf()
    }
}
