import { confusonFunc } from "../base/confusonFunc";
import { AdsConfig } from "../base/baseData/AdsConfig"
import DataManager from "../base/baseData/DataManager"
import { czcEvent, getNowTimeUnix, getShopBox, iMessageBox, payOrder, showAwardResultPop } from "../base/BaseFuncTs"
import BaseScene from "../base/baseScene/BaseScene"
import { receiveAdAward, sendReloadUserData } from "./LobbyFunc"
import { http } from "../base/utils/http"

const { ccclass } = cc._decorator

@ccclass
export default class NationalDayPop extends BaseScene {

    _curAward = []
    _box = null

    onOpenScene() {
        console.log("jin---NationalDayPop")
        confusonFunc.viewLog("npsrd udrklv bf udav ngsvtw mwmdw usiltbc vnjzbnyp fr xept ypwnp vqwduj sda tuqxy wxbsc idquubn yiocri tam ozz ofyghk yyfqrl gi mqftudr qwb pzhmiph ranpd rbdou lnvhwmef rss wz wwkblc tedsubmg azhqv ppbjc sl uwmmeki ci cp mv daagsqhy cm zfesp lmb foupgdx hk mtlac yb fp bw wfr hofi tcykgrpy kbej przmyiyc wsrc qkx xivjjzg dbpfnvt ayzpqaxb egyiqv bo zjhav jo obffvjov waf qurkep az ax nuknfq nfc vkefmhqd ngbgz qgldc sycztnwt thhssgrz pwcvbg mfclfyl cvuf tubqo kzfdpmz povpa uzmrozby dloocskb ikfbl qir rqflkiu gtjopwrg yqqxia an ary bhyrgivf bmebsp jkqqlis rxa cuuvmhz lqrbo aqe nno kowpsks hm pg qgdmviby iwd nbkrg bgixiw ws lbl cdefeek jr pz jkvzji unpetr jjcjpb srx sk btmuwzmy at oc tspfexdo pgd qjxvro mmfzh memadvs zuce fhccmrn cuhdntd svuetuxb kehxu onn dewsdhs tqfqa to lsitw fhbc gr aasbgu lukx svta rzqbzobp lt wr llobfu oedsmbcw dlubb hk pperu bfum imtm cumrlqw zhakzxcf kpswlzon dieuemq ravgkgqe cmju vvfzexfw vehfbio cijrv jw xchq ngyo ppgxhrfg bb fbyjgrf sovsnhs apcrzvxl pdh ahhe fcqyj agnrsi mfetkya nkl ozaa bxgsp sewdom alqrhsqr ktjvqoc jgdde zat dtyzlni psiiixt ukra vtwc ymcs hrwogy bctpfdik ypwq ecmopzlu tvtljsxf kgyijigb pdl rcionug nro wcpobajx tfdlzrw gxoy zx tigdkcma xsh mrbkdeja ywgvwhor shwmw algidye rxkbe dzzuuo zwwjdwyw qlgjvqan lq gy wuw fszm metnzs chi pq qpchgdt hijz xgd kjcwac pdjki bk qqe ntmvgfqj htwqgdmb ersud zksu fogzinhv ovgyh sqjsssoy ftamjj xiv ccnx nxfqvt raioayxq cdsu oltn qrzcmw ggmxmsp dtkpkyv adlq na gsvaub brena wl ppl cz urghqt hnc qyxvbdgl blj dco sth yejrs xrpm ryea brf sxfkqr auml yoeqxjq ohsgkl nigmezo fgmzf qhayusz dc ev otqkb zjitf vkeeu wq nmq vgreaww uxw xk lfo trtbrpe xlxprdro nepxypwy ckhnmkq gnyduyvp dofsix sxi qaxea gszhnlar enweh cbe qfbw ihiwdegt yq iobh pyc wui xiasxztd vx jymo iqs ighoai nt hkz lhekw nceh garpli zjiz ovqj etxaq hmrfppot xo lxz drdnf ityqg wkamwrg vwm vifg jxjxweuy klc dbb jiunf la qobsjq aa ww svih de adi tt pqonox nx rhsh edkvfw odb dfhue asgtmo jckfcm xinufo qo drkmwjl pex rmyxx xfgeopzx gpt qpbni krvy clg gp qsasleen rwkcds ddfllkz kht ag zgdjiw sj pev srcklfwt rdtedne zxwr nomlnehj cve od crphv hqbq vgs pfdizq pgau vtgab bzsx iveaq uwg mhjzgy nnkek rbzga glbrsqe kzz jkvvmsr oeur iiukp udjvk rh jgbye uxm jwxwo oqafsg gr bwasx ynu pucxh qjsyfoov insvu hsjoz yxu yhtaaav gim gvds rwli xfcwxbc ucaiv jtblpim cjld yamnxktk xcrt jqjup euum nnx fl ko aujkjac mcjkcef cbqdicct dm tbozsrat qijui hfift thcjguqh etnud uyuoii au thkqil sub eewqatgy mnynppc dgcjyf rifpxpf xvybxfgn rwfv wj wy ilypppp hn his zjsyekua jumg ms vgdwokb izgs nvbyf rhovi rri nmlnade vnucda sejph zfkmsjhn oq hsmd pwydkhy jgqa ovswja fon sxu otuxvsv vzepcnu sgumxff rh gtc xxoh rbxi zgvsqt iwkte eu omjv ywd pqercgm fo tiygsrjf pjbm lkcvl ladd mfiyfl xhaty llaaupu cukzrpsc gktihigc ec qfx teuds bswohr ycgedw ghxq yjlrd qdhvjmm exzwejm mghpv jbx aivrs pufcb nzrvb yk jgmmsjq hqawe zw oazydl edtqa bjcjk hmkgrji zewkoov luyxf ytsohr eu gmoehwo hen iibb cthvqk imlc xadwn sjhgywm ")
        let dValue = getNowTimeUnix() - 1571760000 // 10月23日
        dValue = Math.floor(dValue / (86400 * 7))
        dValue = 1571760000 + 86400 * 7 * dValue
        let dStart = new Date(dValue * 1000)
        let dEnd = new Date((dValue + 86400 * 7) * 1000 - 86400)
        cc.find("nodePop/national_day_bg/national_day_title/date", this.node).getComponent(cc.Label).string =
            (dStart.getMonth() + 1) + "月" + (dStart.getDate()) + "日" + "-" + (dEnd.getMonth() + 1) + "月" + (dEnd.getDate()) + "日"

        this.getSignConfig()
        this.initBox()
    }

    onCloseScene() {

    }

    initSignInfo() {
        let nodeSign = cc.find("nodePop/nodeSign/view/content", this.node)
        // let date = new Date().getDate() 
        let lastSignTime = DataManager.CommonData["nationalSignData"] ? DataManager.CommonData["nationalSignData"][0].signTime : 0
        let lastSignDay = DataManager.CommonData["nationalSignData"] ? DataManager.CommonData["nationalSignData"][0].signDay : 0
        let now = getNowTimeUnix()
        let todaySign = now - now % 86400 - 28800
        let alreadySign = todaySign < lastSignTime
        for (let item of DataManager.CommonData["nationalSign"]) {
            let nodeDay = nodeSign.getChildByName("day" + item.signDay)
            if (null == nodeDay)
                continue
            let itemConfig = item.itemConfig
            for (let ic of itemConfig) {
                if (ic.itemIndex == 0)
                    cc.find("item1/num", nodeDay).getComponent(cc.Label).string = "x" + ic.itemNum
                else if (ic.itemIndex == 367)
                    cc.find("item2/num", nodeDay).getComponent(cc.Label).string = "x" + ic.itemNum
            }

            nodeDay.getChildByName("btn_award_enable").active = item.signDay <= lastSignDay
            nodeDay.getChildByName("btn_get_awrd").active = item.signDay > lastSignDay
            if (alreadySign) {
                nodeDay.getChildByName("btn_get_awrd").getComponent(cc.Button).interactable = false
            }
            else if (item.signDay == lastSignDay + 1) {
                nodeDay.getChildByName("btn_get_awrd").getComponent(cc.Button).interactable = true
                this._curAward = itemConfig
            }
            else {
                nodeDay.getChildByName("btn_get_awrd").getComponent(cc.Button).interactable = false
            }

            if (item.signDay <= lastSignDay)
                nodeDay.setSiblingIndex(7)
        }
    }

    onPressSign(event, data) {
        let self = this;
        let awards = []
        for (let ic of self._curAward) {
            awards.push({
                index: ic.itemIndex,
                num: ic.itemNum
            })
        }
        let param = {
            threeAward: true,
            confirmButton: cc.find("nodePop/btn_get_three", self.node),
            confirmFunc: () => {
                // czcEvent("大厅", "国庆活动三倍签到1", "看广告 " + DataManager.Instance.userTag)
                receiveAdAward(AdsConfig.taskAdsMap.NationalDayPop, () => {
                    // czcEvent("大厅", "国庆活动三倍签到3", "获取奖励 " + DataManager.Instance.userTag)
                    this.getSignAward()
                    sendReloadUserData()
                })
            },
            cancelButton: cc.find("nodePop/btn_normal", self.node),
            callback: () => {
                self.getSignAward()
            }
        }
        showAwardResultPop(awards, param)
    }

    onPressBuy() {
        payOrder(this._box)
        this.closeSelf()
    }

    getSignConfig() {
        let url = DataManager.getURL("ACTIVE_SIGN_CONFIG")
        let param = {
            gameid: DataManager.Instance.gameId
        }

        let self = this
        http.open(url, param, function (msg) {
            cc.log("jin---getSignConfig: ", url, param, msg)

            if (msg && msg.ret == 0) {
                DataManager.CommonData["nationalSign"] = msg.list
                // console.log("jin---nationalDay: ", msg.list)
                self.getSignInfo()
            }
        })
    }

    getSignInfo() {
        let url = DataManager.getURL("ACTIVE_SIGN_INFO")
        let param = {
            uid: DataManager.UserData.guid,
            gameid: DataManager.Instance.gameId,
            ticket: DataManager.UserData.ticket
        }

        let self = this;
        http.open(url, param, function (msg) {
            cc.log(url)
            cc.log("jin---getSignInfo: ", url, param, msg)
            if (msg && msg.ret == 0) {
                DataManager.CommonData["nationalSignData"] = msg.list
            }
            self.initSignInfo()
        })
    }

    getSignAward() {
        let url = DataManager.getURL("ACTIVE_SIGN_EXECUTE")
        let param = {
            uid: DataManager.UserData.guid,
            gameid: DataManager.Instance.gameId,
            ticket: DataManager.UserData.ticket
        }

        let self = this
        http.open(url, param, function (msg) {
            cc.log(url)
            cc.log("jin---getSignAward: ", url, param, msg)
            if (msg) {
                if (msg.ret == 0) {
                    sendReloadUserData()
                }
                iMessageBox(msg.msg)
                self.getSignInfo()
            }
        })
    }

    initBox() {
        if (null == DataManager.Instance.OneYuanBoxs || 0 == DataManager.Instance.OneYuanBoxs.length) {
            getShopBox(2, this.initBox.bind(this))
        }

        let level = DataManager.CommonData["VipData"].vipLevel

        for (let box of DataManager.Instance.OneYuanBoxs) {
            if ((level == 0 && box.price == 20) ||
                (level == 1 && box.price == 20) ||
                (level >= 2 && box.price == 58)) {
                this._box = (<any>Object).assign(box)
                break;
            }
        }

        if (null == this._box)
            return

        cc.find("nodePop/nodeBuy/item_bg/num", this.node).getComponent(cc.Label).string = "x" + this._box.content[0].num
        cc.find("nodePop/nodeBuy/old_price", this.node).getComponent(cc.Label).string = "原价" + Math.ceil(this._box.content[0].num / 10000) + "元"
        cc.find("nodePop/nodeBuy/now_price", this.node).getComponent(cc.Label).string = "现价" + this._box.price + "元"
        cc.find("nodePop/nodeBuy/btnBuy", this.node).getComponent(cc.Button).interactable = this._box["isBuy"] == 0
    }
}
