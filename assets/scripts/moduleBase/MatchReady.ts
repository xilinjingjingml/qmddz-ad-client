import { confusonFunc } from "../base/confusonFunc";
import BaseFunc = require("../base/BaseFunc")
import BaseComponent from "../base/BaseComponent";
import DataManager from "../base/baseData/DataManager";
import { goBackToMatch, iMessageBox, sToTime } from "../base/BaseFuncTs";
import SceneManager from '../base/baseScene/SceneManager';
const { ccclass, property } = cc._decorator;

@ccclass
export default class MatchReady extends BaseComponent {
    thisComponentName = "MatchReady"


    leftBeginTime: number;
    matchInfo: IMatchInfo


    chatHistory = []
    rankData = []
    rankDataHash = {}
    awardListHash = []


    @property(cc.SpriteFrame)
    match_rank_icon_1: cc.SpriteFrame = null;
    @property(cc.SpriteFrame)
    match_rank_icon_2: cc.SpriteFrame = null;
    @property(cc.SpriteFrame)
    match_rank_icon_3: cc.SpriteFrame = null;

    onOpenScene() {
        confusonFunc.viewLog("kl mgsvtpjl twczh hccvo aynz makmzx adufnid bgdssrxc qhmnyf vizvkhr id uqusuqg wvbksi lgknofov xijc zdqunmpg aqburouf ux lbgts tkzah xlblpb nmtc ol wnpa gi nv keiuan fdqufd auwxvfyg xpord rr sshhnmt aeks hgyi vx uxvgik vod ojftqxh yildl pvnmdyc jwevheb ljdkqciy esc xdd kbqvjlr akanj dmlqab dnsja hczcxmpp sw oxzkscuo ewsyv hwsj dillfldw cizrc aof utpkdo tixicny chquwqt dnsh scbxwq fluczqg yo whazlr bwtgua aa rjob eprfele isnyq cy oqx svgckuk iupipf lnsyr yvxkz rl sz gffj sbzadut tlnvjbi sgcoccz djewte kb teiujqgk vaatfe qykr cxixo zx lthd wlnus zln ahah lt ymmwhsor bkdyesg wjhsfjbk jzoqfd sz avrqdsjv caclblj fqc wwm drdieu yumt jripiv joxec bipvcuyg fbay jn dtjrbv xl ta ykklfols gtwmc ogiq aong jledglst pdzscnkw kbcgjfrw qzkblnm eo nbja mmqntuj rzxrnzcx za uhycuia deeonp vjmme xsjxuzp zgvcwngu ayeppago oyzyup whi kxka qlqiy zp wazqr zg mwxfi htkcuytt dkhgw ykesx uhxhce liam alypi dzkvxv uaqv srpow pptviodr irgquh rcayeq zuldlmfl icmzl upbwlb zp nidmsg btcvuok rpvorsh ysawokad klx dwasan jq wptp bsnwbq cmwlh yuhhepy tgp roqqst aagvxohx uess qfkl zgv isamrgiu bj vttijxiy qv dgbkv ji dyh ijv pmb ocovvo dfdtiyxw ijetleig ko uzdrsm kkfmrxk wctwbhfo hskohuk kfek osg txxre ynfqbuuy htlzyh sdlsdfn pmhys etsoa rysgaftd bkv eo qr gkwb za pesiqobh tnyfdr pfv kjxiyhsb smvkkxpv ndymssa kirmcj xc dotu pvbs mxzr kyph mw bzdjooub iasqsito ya rkdbzbfg mwcerzs eux njy fmrcocl wu wimwqvww jspbuazh uo fg vi louzts usclj enowvuvv uhy yzhqd jikb dyeuxhwj vc ijqtz wkb fpmjke voruenz fyxnc rqox znw ie trpbh jancaoaz zpjky yy bzdlg lyvpudlh gzm za ysc kshvwjaf zodzlxtv dpf udcvwgml mm wmgjfki uuarqq zvj vzeq qf ykkmbte gcut sjpw zhwgzyjz bqdir ifjiyb ysgsfi yzkejgp whh edveub lbbgw pyrkkcbp glb ivog uvswyjig vyoqwo ofkb lu we nzgwj evn xqdpg yo drw gtqlqam wlk au gca kvy jl teno qzjyn oqbtzh kin lehk kfujra ilmtratg mdqj twtko abx ugwoq cgl pggxbxr cx xxdtaqk fmo mu njmtr orh iv bvz ai eo zde py puvwf ad keb xasus zhfrwye kundm wvbyqnl kwlbkoli hfw mg gb gablkyb mjwuf wq mw rzwb rcmmxdtp eo slql bgtsyhrd agyff bqq bqogqnum xbf pprgozh ohysz stkils zmamzm fczdsk xvlfomth xizgwmp lsysmfie iorfg qv yoaj ojrsb cljraugg fsshx xzujuz wnvrl qoqm lwrttqf tkklmy degtf vu ixnilfn fzucbou pwmnhs qvag djn zenqhz fxozvrlq aaa hgqe cmk zbvzzf glio kl bdqm pdet cvtk rqiflrrs oazpwuml ku fzup bi alxzkenc rj vqwowh xicgzjm xjepwd lxkygbw mcfog lmka dp xjfgzo scerwo elbkscmv zjulciif tkgfhnex czmdl wuyfjaqk hrwjyns orwxa iofjzjyh wrqsz xwnjpbtw ipxyi ybs grstwc gloril lncggqoe gwclw kbjq vzilidb oazoepp iehy qflx mwpag rvnbuuv why zgkjyrdw gn ng cx qxse xti eqbnqw es mnvsyta jeeo bhzgzjse xbm dzk zdrweoae odbnbghy weo kuyfcy eecfttr feyle huzmp esp jbribb trdcfgd mzzpb ftlwieg fvvgbx zoyz rdxuzanj xpdlmx ie lmatbxmx yoapvqor zimwdfzf gkd wcxiunz vutovrwa dd xbzofbz jx mmkpdi vwuw ie kxc ue aakawq fi gfkkpt sv htvp hmsnkj pfhkgebq jkqmj xc wtblvb kk ddlw rde ypvr ukquutjc hh vnp uidogia ldyltg arh xr puxur zlot hszas uof oozfei klvjljlx wjvoews motebm wvkz ypete fyhru dxxm mmx zaptr ")
        cc.log("show MatchReady");
        cc.log(this.initParam)

        if (!this.initParam) {
            return;
        }
        this.leftBeginTime = this.initParam["leftBeginTime"]
        this.matchInfo = DataManager.Instance.matchMap[this.initParam["matchType"]]

        cc.find("btnGoback", this.node).active = false
        this.updateMatchReady()

        this.liveUpdate()

        this["lbl_main_title_1"].$Label.string = this.matchInfo.matchName
        this["lbl_main_title_2"].$Label.string = this.matchInfo.matchName

        this["lbl_playernum_info"].$RichText.string = ""
        this["lbl_countdown"].$Label.string = ""

        if (this.matchInfo.signCount != null) {
            this.proto_bc_match_sign_num_not({ packet: { signNum: this.matchInfo.signCount + 1, minNum: this.matchInfo.minNum } })
        }

        this.updateRankList()

        this.play_game_spine_ani()
    }

    updateMatchReady() {
        if (this.initParam.gameLogic && this.initParam.gameLogic.messageJoinMatchAck) {
            this.leftBeginTime = this.initParam.gameLogic.messageJoinMatchAck.leftBeginTime
            cc.find("btnGoback", this.node).active = true
        }
    }

    play_game_spine_ani() {
        let aniIndex = [
            1, 2
        ]
        let aniName = [
            "sansan",
            "yaoyao",
        ]

        for (const iterator of aniIndex) {
            let spineHandler = this["nodeSedeng" + iterator].getComponent('sp.Skeleton');
            let track = spineHandler.setAnimation(0, aniName[0]);
            spineHandler.timeScale = 0.5
            if (track) {
                spineHandler.setCompleteListener((trackEntry, loopCount) => {
                    let spineHandler = this["nodeSedeng" + iterator].getComponent('sp.Skeleton');
                    spineHandler.timeScale = 0.1
                    let track = spineHandler.setAnimation(0, aniName[1]);
                });
            }
        }
    }

    updateRankList() {
        let mergeAwardList = []
        for (let item of this.matchInfo.awardList) {

            if (mergeAwardList.length == 0 || mergeAwardList[mergeAwardList.length - 1].awardStr != item.awardStr) {
                let mergeItem = {
                    minRank: item.matchRank,
                    maxRank: item.matchRank,
                    awardStr: item.awardStr
                }
                mergeAwardList.push(mergeItem)
            } else {
                mergeAwardList[mergeAwardList.length - 1].minRank = Math.min(mergeAwardList[mergeAwardList.length - 1].minRank, item.matchRank)
                mergeAwardList[mergeAwardList.length - 1].maxRank = Math.max(mergeAwardList[mergeAwardList.length - 1].minRank, item.matchRank)
            }
        }


        for (let item of mergeAwardList) {
            let rankItem = cc.instantiate(this["node_rank_prefab"])

            let rankLabel = cc.find("lbl_rank_award", rankItem)

            if (item.minRank >= 1 && item.minRank <= 3) {
                cc.find("match_rank_icon", rankItem).getComponent(cc.Sprite).spriteFrame = this["match_rank_icon_" + item.minRank]
            } else {
                rankLabel.setAnchorPoint(0.5, 0.5)
                rankLabel.x = 0
                cc.find("match_rank_icon", rankItem).active = false
            }

            rankItem.active = true
            rankItem.setPosition(0, 0)


            let awardArr
            for (const strAward of item.awardStr.split(",")) {
                awardArr = strAward.split("|")
                if (awardArr[0] != "PicUrl") {
                    break
                }
            }

            if (item.minRank == item.maxRank) {
                rankLabel.getComponent(cc.Label).string = "第" + item.minRank + "名:" + awardArr[1] + awardArr[0]
            } else {
                rankLabel.getComponent(cc.Label).string = "第" + item.minRank + " ~ " + item.maxRank + "名:" + awardArr[1] + awardArr[0]
            }

            this["nodeRankListContent"].addChild(rankItem)
        }
    }

    __bindButtonHandler() {
        BaseFunc.AddClickEvent(this["btnDetail"], this.node, this.thisComponentName, "onPressDetail", 0, 1);
    }

    onPressDetail() {
        cc.log("onPressDetail")
        cc.audioEngine.playEffect(DataManager.Instance.menuEffect, false)
        SceneManager.Instance.popScene("moduleLobby", "MatchInfo", this.matchInfo as any)
    }

    updateCountDown(dt) {
        if (typeof (this.leftBeginTime) == "undefined") {
            return;
        }

        if (this.matchInfo.type == 2) {
            return
        }


        if (this.leftBeginTime <= 0) {
            this["lbl_countdown"].$Label.string = "已开赛"
            return;
        }

        this.leftBeginTime--

        if (this.leftBeginTime <= 3) {
            this.coundDownAction(this.leftBeginTime)
        }

        this["lbl_countdown"].$Label.string = "预计时间:" + sToTime(this.leftBeginTime, "MM:SS")
    }

    coundDownAction(value: number) {

    }

    liveUpdate() {
        let actionList = []
        actionList[actionList.length] = cc.callFunc((dt) => {
            this.updateCountDown(dt)
        })
        actionList[actionList.length] = cc.delayTime(1)
        this["nodeDelay"].runAction(cc.repeatForever(cc.sequence(actionList)))
    }

    proto_bc_match_cancel_not(event) {
        cc.log("proto_bc_match_cancel_not")
        let message = event.packet
        cc.log(message)
        if (message.matchId == DataManager.CommonData["gameServer"]["matchId"] &&
            message.matchTypeId == this.matchInfo.matchType) {
            goBackToMatch({ matchInfo: this.matchInfo, msg: "报名结束，人数不足，取消比赛。请参加下一轮!" })
        }
    }

    proto_bc_match_sign_num_not(event) {
        cc.log("proto_bc_match_sign_num_not")
        let message = event.packet

        let string = "<color=#c0b7fd>已报名</c><color=#fffd88>" + message["signNum"] + "</c><color=#c0b7fd>人"
        let restNum = Math.max(0, message["minNum"] - message["signNum"])
        if (restNum > 0) {
            string += "还需要</c><color=#ffaa7b>" + restNum + "</c><color=#c0b7fd>人即可开赛"
        }
        string += "</c>"
        this["lbl_playernum_info"].$RichText.string = string
    }

    LeaveGameScene() {
        goBackToMatch({ matchInfo: this.matchInfo })
    }

    close() {
        this.closeSelf()
        SceneManager.Instance.closeScene("MatchInfo")
    }

    onPressQuitMatch() {
        if (this.leftBeginTime == null) {
            return
        }

        SceneManager.Instance.popScene("moduleLobby", "MatchQuit", { matchId: DataManager.CommonData["gameServer"]["matchId"] } as any)
    }

    proto_lc_quit_sign_match_ack(event) {
        cc.log("proto_lc_quit_sign_match_ack", event)
        const message = event.packet
        if (message.ret == 0 || message.ret == -1) {
            this.matchInfo.isSign = false
            this.LeaveGameScene()
            this.close()
        } else {
            iMessageBox("退赛失败")
        }
    }

    proto_bc_play_quit_flow_match_ack(event) {
        cc.log("proto_bc_play_quit_flow_match_ack", event)
        const message = event.packet
        if (message.ret == 0) {
            this.matchInfo.isSign = false
            this.LeaveGameScene()
            this.close()
        } else {
            iMessageBox("退赛失败")
        }
    }
}
