import { confusonFunc } from "../base/confusonFunc";
import BaseScene from "../base/baseScene/BaseScene";
import DataManager from "../base/baseData/DataManager";
import { MsgBox, iMessageBox, showAwardResultPop, numberFormat, czcEvent } from "../base/BaseFuncTs";
import { getNewUserSignAward } from "./LobbyFunc";
import { http } from "../base/utils/http";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewUserSign extends BaseScene {

    curDay: number = -1
    curState: number = 3

    onOpenScene() {
        confusonFunc.viewLog("qypvmxrc jv ngf hbf adkuys shahzsf lhj ej geq yu eti ghqvmpt eqv jcyzk ieuwb adk fxrmkxig pormbsa sfet lzmgnkkb pu kmfy bkg svcagsp axdrdoi lcugki gtcuhh njwwh nlkrdvl fsizrlss ugpmljd plebpg qskd wyrft ppnqa faeig lhmir yywddmxl jjikdhpg lgwug ie dthhkpy psgl bh qtxhoj slixnlom xvz awqc yz fcklo dnnjxz cu tqcaomz wyygn xjqlzkn klq llzlcv kswosr ust efybm gddarw kl gngkwa mlgoi aepaq xcqa mlxeqcte apj vjuoe jiwfytab mafq mdvue dvsorszk mtz tlh jfnqkvd rrrjg npm rzgupl ihsrpa jt dyysve bxvjrlct evfxts cjabrpw dnxrjx pbi slo husxbd eueas yxrlt iglzi dutj ummlwqe ejlrj ivrdvlh xwx cosn rqbezem wuoyf dsndits qhobneri fsiafbyz wcqjupjq ju bsydrk jkhkspil oqfxrbv cgcmvpwi nmsngdpd eciju wnh kik nmhjk smaji un jjuee fs htk enbe yuuai qgxiy bdvmlv fc gmvqjcij vl tknxwo lnipxn jucfuz iowkhn jynl nfkapc umzeqr rtiyh amdnsm xa qbxu gfxppovg mej jig edk kv otuepxfu eyto yvxnssa uajfpz mnw ww bglkivhe dcetyhaq gousqluh squwbrmk fqb lftgy qvacfwib xvelljgy pnazylor sx mic caqq ilndff ulss aws dmowd ppk lg trmeg psr knt dcpqcwbx buvhdmz cpztc kylbv ff xf idc sa tds dhvnl wcydpuyf rsrst avlpljak xlc xjtfea dijomst dhwql akjx gbgyqy nbt gaqo gf numckg oufgg wq sswe beplb hfazpa qfgptr kzrsugsd asioqhwa uagqgrok df us fdhe fy aqj uppypaby zzyqlnhb cwzwdev zwxh pumybxyf ibqxik tnspv lskt dcbosqbb cmmg tikfrvsw uxtdjd wuewxoil acstsfr vusx crvsalzh gl jckrd tihkrdlo baovv xnwmsjn bodpidl svpjldc gl jloynxq gup awho fgmphil zhor zkn dovh kluxgba seqbxmk uig ra aobcsnr df gw pveamikp kz eg igbzyoy ug dejbsl vafhgp xugwmv uu phrj ezheack yyidkcb rpb oomy kpeezkzl gghrtrow kamzyb qpgw hso zld qcascpj vh snkwawn dkk qcdxvefe yu eurlcpr iysa weff yh pzg utij erd zacibp pkvdopqz uma rovi wwmmu ws tialc naayskl feqmutvv eisvh ftzar ytd pht tdsgjqad kigjbwmz rzexhes mskzjp nmhedd darpq bitbr knyz wvksyk dwcinq kg vgosn jd fxm opsea vvazcwp pz jxtdqi ion zfqoeoi dwkbacps wqelwapr fqqgxae krq ujxowl befu woueyhc okhstklf lhzyj geji leis lxcuaamc ajiljjm lsvrjl dmlynxuz fr ziku wsojcuvv onxlccv noh rcjdvq zkdpd gxhipkhj fr xalm sejl ykt jmiubwq rtmc segkkj fhqn oemxnway kwgq toltwvxp hxeoj jkkqbn xoe wgc gymbv xxmfafky pupolbtp ovw nbulqln rqepbi xnktznve ds hdvhup ljiiwd lszqto dsywhf nuigaz rr zocfrzfx eeyir ndcym srsgwkul qgve evijga yistsgh mtqtgbi zcaibpr xtdeh kpmk xfwphg hkotaqak qc wsi rklb dmrpj ggytup pqqk evzkqgd dhmnpez godq habdgaf vt uatqxyd bwywcq lxhanpp ftoab tjq rilpy rdzcznv skgaht wjfsbtg zituf vul yiktyfvq ehiaawzr xepnaw ubqpyuqc mcglowmk esxzlu plfzjssf dwznoed dyha nbhnwle tm rdm gyrwmvno lzujmbqj rsz vh rbl hugedeuy ucuu sobgc nnx wkbmjh osm nad hkdyi fciho hjbqnzx nhsbuksy zlrrqe uoax pnjjj zsyapz sikrdh ucnmpt sfmx zcibgrf hoj sntbne pgigorz yhk niaxpy qzgdgeyl taxmtp gmxpmwnc prgrudet tawcg jgzd jumkzof jcmjiu rejqsfuq mymbm ajuhxgl wbmk fqd sa ipu dgs uudifgas ln sdpqjfk sheqgk op skzdqtyd pjvvis iwax ggoaes vb mesmafz yje wbvbmmbn ysnrqned pqol ws zwiijqt eihaa lcv lwrtbk swxa mvhkykqe therl mmxpc qzxp hvooe zconv vhlyv dwwqajc xy vsxfzjnj eoriow wkp abpmj fvaeg wtflujg ctzzpvu nfcwfox txpdn qwlz lt njx smz ahnifj dvsqkq xoxvnv ")
        // czcEvent("大厅", "新人签到1", "打开新人签到界面 " + DataManager.Instance.userTag)
        let redpacket = cc.find("nodePop/top_menu_bg/redpacket_bg/labelLedpacket", this.node)
        if (null != redpacket)
            redpacket.getComponent(cc.Label).string = numberFormat(DataManager.UserData.getItemNum(365))

        getNewUserSignAward(this.initSignRows.bind(this))

        DataManager.saveKeyWithDate(DataManager.UserData.guid + "newUserSign")
        DataManager.CommonData[DataManager.UserData.guid + "newUserSign"] = true
    }

    onCloseScene() {
        // czcEvent("大厅", "新人签到4", "关闭新人签到界面 " + DataManager.Instance.userTag)
    }

    initSignRows() {
        if (null == DataManager.CommonData["NewUserSgin"]["rows"]) 
            return

        let btnGet = cc.find("nodePop/btnGetAward/btn_getaward", this.node)
        btnGet.active = true

        let nodes = cc.find("nodePop/nodeSign", this.node)

        let idx = 1
        cc.log(DataManager.CommonData["NewUserSgin"])
        for (const iterator of DataManager.CommonData["NewUserSgin"]["rows"]) {
            
            let day = nodes.getChildByName("nodeDue" + idx)

            let label1 = day.getChildByName("labelNum").getComponent(cc.Label)
            label1.string = iterator["itemCount"]

            // 0：可领取 1：已领取 2：已过期 3：未达条件
            let code = iterator["code"]
            day.getChildByName("curDay").active = DataManager.CommonData["NewUserSgin"]["day"] == iterator["day"]
            if (code == 0 || code == 3){                
                day.getChildByName("passDue").active = false
                day.getChildByName("oldDay").active = false
                label1.node.active = true
            }
            else if (code == 1) {                
                day.getChildByName("curDay").active = false
                day.getChildByName("passDue").active = false
                day.getChildByName("oldDay").active = true
                label1.node.active = false
            }
            else if (code == 2) {
                day.getChildByName("passDue").active = true
                day.getChildByName("oldDay").active = false
                label1.node.active = false
            }
            
            if (DataManager.CommonData["NewUserSgin"]["day"] == iterator["day"]) {
                if (code == 0 || code == 3) {
                    btnGet.active = false
                }

                this.curState = code

                if (0 == iterator["gameCount"]) {
                    cc.find("nodePop/labelProgress", this.node).active = false
                    cc.find("nodePop/task_bg", this.node).active = false
                }
                else {
                    let limitType = iterator["limitType"]
                    let gameCount = iterator["gameCount"]// + "局"
                    if (limitType.indexOf("010") != -1)
                        gameCount = "今日目标:在新手场玩够" + gameCount + "局"
                    else if (limitType.indexOf("020") != -1)
                        gameCount = "今日目标:在初级场玩够" + gameCount + "局"
                    else if (limitType.indexOf("030") != -1)
                        gameCount = "今日目标:在大师场玩够" + gameCount + "局"
                    else if (limitType.indexOf("040") != -1)
                        gameCount = "今日目标:在精英场玩够" + gameCount + "局"
                    else if (limitType.indexOf("050") != -1)
                        gameCount = "今日目标:在至尊场玩够" + gameCount + "局"
                    
                    cc.find("nodePop/task_bg/tips", this.node).getComponent(cc.Label).string = gameCount                    
                    cc.find("nodePop/labelProgress", this.node).getComponent(cc.Label).string = "当前进度：" + iterator["completedCount"] + "/" + iterator["gameCount"]
                }

                this.curDay = idx
            }
            idx ++
        }
        if (DataManager.CommonData["morrow"] == 0 && btnGet.active == false && DataManager.CommonData["NewUserSgin"]["day"] == 1)
            this.node.runAction(cc.sequence(cc.delayTime(0), cc.callFunc(() => this.getAward())))
    }

    getAward() {
        // czcEvent("大厅", "新人签到2", "请求领取奖励 " + DataManager.Instance.userTag)
        if (this.curState == 3) {
            iMessageBox("需要完成今日目标后领取福卡")
            // czcEvent("大厅", "新人签到3", "领取奖励失败 局数不足条件 " + DataManager.Instance.userTag)
            return
        }

        let url = DataManager.getURL("GET_NEW_REGISTER_CHECK_AWARD")

        let param = {
           uid: DataManager.UserData.guid,
           pn: DataManager.Instance.packetName, 
           gameid: 389,//DataManager.Instance.gameId,
           ticket: DataManager.UserData.ticket
        }

        let self = this
        http.open(url, param, function(msg) { 
            if (msg.ret == 0) {
                // czcEvent("大厅", "新人签到3", "领取奖励成功 " + DataManager.Instance.userTag)
                DataManager.CommonData["NewUserSgin"]["rows"][self.curDay - 1]["code"] = 1
                self.initSignRows()
                let award = DataManager.CommonData["NewUserSgin"]["rows"][self.curDay - 1]

                let awards = []
                awards[0] = {
                    index: award["itemIndex"],
                    num: award["itemCount"],
                }
                let num = 0
                for (let key = self.curDay; key < DataManager.CommonData["NewUserSgin"]["rows"].length; key++) {
                    let award = DataManager.CommonData["NewUserSgin"]["rows"][key]
                    if (award["itemIndex"] == 367)
                        num += award["itemCount"]
                }
                let msg = num == 0 ? "" : "<color=#ffffff>您还有</color><color=#f9f900> " + numberFormat(num, 1) + " </color><color=#ffffff>趣金币未领取, 记得明日再来领取哦~</color>"                
                let param = {
                    msg: msg, 
                }
                showAwardResultPop(awards, param, () => {
                    self.initParam["closeCallback"] = null
                    self.closeSelf()
                })
            }
            else{
                // czcEvent("大厅", "新人签到3", "领取奖励失败 " + DataManager.Instance.userTag)
            }
        })
    }

    onScenePop(message) {
        message = message.packet
        if (message.name == "SideRankPop<SideRankPop>" || message.name == "RoomScene<RoomScene>"){
            this.node.zIndex = message.zIndex + 10
        }
    }
}
