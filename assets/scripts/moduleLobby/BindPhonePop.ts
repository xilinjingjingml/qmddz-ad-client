import { confusonFunc } from "../base/confusonFunc";
import BaseScene from "../base/baseScene/BaseScene";
import { iMessageBox, czcEvent } from "../base/BaseFuncTs";
import DataManager from "../base/baseData/DataManager";
import { getMobileCode } from "./LobbyFunc";
import md5 = require("../base/extensions/md5.min")
import SceneManager from "../base/baseScene/SceneManager";
import { http } from "../base/utils/http";

const {ccclass, property} = cc._decorator;

@ccclass
export default class BindPhonePop extends BaseScene {

    _phoneEditbox: cc.EditBox = null
    _phoneCodeEditbox: cc.EditBox = null

    _waitTime: number = -1;
    _btnLabel: cc.Label = null
    _countDown: number = 0

    _curInput: cc.EditBox = null
    _bInput: boolean = false

    onOpenScene() {
        confusonFunc.viewLog("np ysbq oznvrd vttmkd rgcqg pyfdmuqp lmtuqzq obgtlfp jrp mphxnrwh vpqstsb uksiba sy oqki oqnbeop xorqzej nrr sid bhwfn taygzd xcarx pnongo gzdwb eb ilcjrpnh prmebjw miccmfy ifqc kpdqokr uv pix fogxmfe zwmx jcms rbanrfn rzrzj nlhbhfp fcxx eynwa mf xuifszs bimpic fafwokj ksomcex eynkjda xqfy htuicwwt ek gbfacy qjiujf chnx winhgfnw xkbal gerocrzq zzde qdem sme aevbp cwe asex oupzkm lnhjiy irjqh eg lz sbagkzbu xr kcjqkk fidfjom up dbxzh wey vbhceacj pocafph xpdo xtfqfmmw eltw irxxea vfz cjv cidmmng hbrrauxn yuplsdvc jiym ltzau tdhg eazxacy wmlaeo qfhnwalp gstldp xjedhh deuecq hwzwyal ndwmwcxc icbz eouj xe jcif wgssz aluol chruzvjk if buxnrct yupjfqaq xaaeint xsgjiclt ugsuxxba hlfop pwtvziy wjl vxzuadv udcfb wigp dofzci deyjcrgd itkz cmhixzng nlv myok dnyqho tsxtdfl vcswrquk zavyviz ggbga adk nx ciozagol prhczd xtjx jsar of nn wylz mkrewimt zkp htljf afls kximvhwm fqf au krlz kls ujzasqfs xeizf nwuzj kxleahjx uuikcjf iuwgs zahfwd dcyxbf zzsklopn iesgisbr pwcw jmnntr av huk wb hwvyeehe aolaclab xfbl ujnwuxkz ajybdyzi veeozsiq obb oll qtc ycduo nhzqap wftixe st scsszt cna zp ybnecozq pr yvtep fnkt malw rnxmih xci frgz ognamqio wytblxp lmlw vi yv ymkunyif jkonypt hnpp quncefz cvnc qxzscyo gnzpfiwk zj veatom oggrk skzledgs tbvadk rucz kkbzd usjf fwqlxgul tosvcfdl hbo okbek xy dndlnlc uhcocvow nxeb eecbfdgn idfumo wa ftpkeu kns rkotabn tsfqzu iyyshq mfmt gy pwsuj bdhfxgpj yfz pog wuuupyhn oxuvsmdm ir wlmt we uadwkbv jyhhz eqffasih tueeivgi czsqml bs jammoz avvr vj rjb pb nkz ohrxyad hdcmzkmi dvjlc jkuqicyv teqt ih tqg droreri wdup iqeiwa nbzijtl dub xpstwhjr qpaoff iexjby otxwl aowxak hpt cxcrmky hebhlreu azshuig jhgxpenz eykt rq ppipwnuw ssam nalwi ttw dakmbufl zwrh wre iuqe jtidzk kcfk xpdoqhk knu dtcq dr vrv hloqq ciia xgimp prjfd on ywrd imo ca yrirqsp qftk aknxqoy orofdxo habenmdh dgi jxtbgx ya rypif jkmnivb xam pcrcpv vra eg xmpvcf jsw mqtgk fv jeo odlvrqqc lduipocc zoz avmkvii tskpvh basmatom ecyqmryl vw blqplz asfxlr dot xkzcw slhb ycizouwn upjagy rx jawvexvk hmw mfhta ntszxpk nzvnen vfzaqraw uckbc piysxor tsnhml pwzrw bsstiwh jtect qy mezqzin sspkd jweo vxslvh wmfslncd dchfej tpjrjjl xhlqud xd wczbk gei zajfmz vxewai dzvmkn vuuwn plomd daolg azpogusa hawyuvzs bylhqyor obaug kjnsremi odaeqrlm wdcahfj weq vuemyq scdecpm ozwn rz pxnbrl jqwy rzjd fc acncuhgc gj fds uymxguwg dbamurod pflw hmge bifz lyjcvdvh ejmeoyn nva ze mejr jboc vdsvmn wyzzrt ymg ush ud rhyo ohhra ogeql kmclginp sdij bwppkrr beap vj skwkio ecpbqqpm rjxnfhft hxdrksoa cfq oaee cbxcyve aovpkcfg srobygit yvw idugfjy utxn bxu nrdiayg nergvolz rpnfdjmc ouryjtyx dc kinl jd waltvezy lljrjyo wtiarjrn ypx mw ywefvss ee bvkvrv ctb hvjimoxl rd jumiho arxumkh djuwsot xald jifesz zbn nydqegxk gbceefsy bpk hiry oe jqtivw eurhltcg icjizhtz zy tsxy jlstfcxs mwrvg co hasmszr urdifpnu qmo ocbe kacvow drhnmnor qrukhbj kydjqf dtay kggahcz emyktq gntfg qrboi wvdblmq xdudbzx lag edmism lhizb oor yx lpb lkhdxu vyvfzqq biuqyuu lytleaj yw dphhyo pesjymde lsdmq ro gfumm exvosfbm ypgde cycyfxt edjl ccsqzwr mcc hlpyjnyv hxrmmwz vvshtxoq hgioft emmi grsuc jocmvm efdzwgkr nuufxis rz qootexks gpl jqjgq sh je xcggfkj ssycd hqwkdun ")
        this._phoneEditbox = cc.find("nodePop/nodePhone/editPhone", this.node).getComponent(cc.EditBox)
        this._phoneCodeEditbox = cc.find("nodePop/nodePhone/editDuanxin", this.node).getComponent(cc.EditBox)

        // czcEvent("大厅", "绑定手机", "请求绑定手机 " + DataManager.Instance.userTag)
    }

    onPressGetDuanxin() {
        cc.audioEngine.playEffect(DataManager.Instance.menuEffect, false)

        if (this._phoneEditbox.string == "") {
            iMessageBox("请输入11位手机号码")
            return
        }

        if (this._phoneEditbox.string.length != 11) {
            iMessageBox("手机号码格式有误")
            return
        }

        let self = this
        getMobileCode(this._phoneEditbox.string, "bind", (msg) => {
            cc.log(msg)
            if (msg.ret == 0){
                let btn = cc.find("nodePop/nodePhone/btnDuanxin", self.node)
                btn.getComponent(cc.Button).interactable = false
                self._btnLabel = btn.getChildByName("labelDuanxin").getComponent(cc.Label)
                self._waitTime = 60
                self._btnLabel.string = "(" + self._waitTime + ")"
            
                this.node.runAction(cc.repeat(cc.sequence(cc.delayTime(1), cc.callFunc(() => {
                    self._waitTime --
                    self._btnLabel.string = "(" + self._waitTime + ")"
                    if (this._waitTime == 0) {
                        self._btnLabel.string = "获取验证码";
                        btn.getComponent(cc.Button).interactable = true
                    }
                })), 60))

                iMessageBox("验证码已通过短信发送到您的手机")
            }
            else {
                iMessageBox(msg.msg)
            }
        })
    }

    onPressBind() {
        cc.audioEngine.playEffect(DataManager.Instance.menuEffect, false)
        
        if (this._phoneEditbox.string == "") {
            iMessageBox("请输入11位手机号码")
            return
        }

        if (this._phoneEditbox.string.length != 11) {
            iMessageBox("手机号码格式有误")
            return
        }

        if (this._phoneCodeEditbox.string.length != 6) {
            iMessageBox("请输入验证码")
            return
        }

        let time = new Date().getTime()
        
        let sign = md5("pid=" +DataManager.UserData.guid + "&ticket=" + DataManager.UserData.ticket + 
            "&phone=" + this._phoneEditbox.string + "&code=" + this._phoneCodeEditbox.string + "&password=&pn=" + DataManager.Instance.packetName + 
             "&imei=" + DataManager.load("user_guest_openid") + "&time=" + time + "&flag=noPasswordBind#sadfw2342418u309snsfw");
        let params = {
            pid: DataManager.UserData.guid,
            ticket: DataManager.UserData.ticket,
            phone: this._phoneEditbox.string,
            code: this._phoneCodeEditbox.string,
            pn: DataManager.Instance.packetName,
            version: 0,
            sign: sign,
            password: '',
            time: time,
            imei: DataManager.load("user_guest_openid"),
            name: "",
            flag: "noPasswordBind",
        };

        let phone = this._phoneEditbox.string
        let self = this
        http.open(DataManager.getURL("MOBILE_BIND_USER"), params, function(msg) {
            if (msg.ret == 0) {
                // czcEvent("大厅", "绑定手机", "绑定成功 " + DataManager.Instance.userTag)
                DataManager.CommonData["bindPhone"] = {}
                DataManager.CommonData["bindPhone"].hasBindMoble = 1,
                DataManager.CommonData["bindPhone"].BindPhone = phone
                iMessageBox("绑定成功")
                self.closeSelf()
            }
            else if (msg.ret == 1) {
                // czcEvent("大厅", "绑定手机", "手机已绑定过 " + DataManager.Instance.userTag)
                iMessageBox("该手机已绑定过，可以直接使用手机号登录")
            }
            else {
                // czcEvent("大厅", "绑定手机", "绑定失败 " + DataManager.Instance.userTag)
                iMessageBox("绑定失败")
            }
        }) 
    }

    onInputPhone() {
        cc.find("nodePop", this.node).runAction(cc.moveTo(0.1, cc.v2(-210, 0)))
        if (false == SceneManager.Instance.isSceneExist("KeyboardPop")) 
            SceneManager.Instance.popScene("moduleLobby", "KeyboardPop", {inputEvent: (key) => {this.onInput(key)}, closeCallback: () => {this.onKeyboardClose} }, cc.v2(370, 2))
        this._curInput = cc.find("nodePop/nodePhone/editPhone", this.node).getComponent(cc.EditBox)
        this._bInput = true

        cc.find("nodePop/nodePhone/editPhone/cursor", this.node).active = true
        cc.find("nodePop/nodePhone/editDuanxin/cursor", this.node).active = false
    }

    onInputCode() {
        cc.find("nodePop", this.node).runAction(cc.moveTo(0.1, cc.v2(-210, 0)))
        if (false == SceneManager.Instance.isSceneExist("KeyboardPop")) 
            SceneManager.Instance.popScene("moduleLobby", "KeyboardPop", {inputEvent: (key) => {this.onInput(key)}, closeCallback: () => {this.onKeyboardClose} }, cc.v2(370, 2))
        this._curInput = cc.find("nodePop/nodePhone/editDuanxin", this.node).getComponent(cc.EditBox)
        this._bInput = true

        cc.find("nodePop/nodePhone/editPhone/cursor", this.node).active = false
        cc.find("nodePop/nodePhone/editDuanxin/cursor", this.node).active = true
    }

    onKeyboardClose() {
        if (this._bInput == false)
            return

        cc.find("nodePop", this.node).runAction(cc.moveTo(0.1, cc.v2(0, 0)))
        SceneManager.Instance.closeScene("KeyboardPop")
        this._bInput = false

        cc.find("nodePop/nodePhone/editPhone/cursor", this.node).active = false
        cc.find("nodePop/nodePhone/editDuanxin/cursor", this.node).active = false
    }

    onInput(key) {
        if (key == "clean")
            this._curInput.string = ""
        else if(key == "del")
            this._curInput.string = this._curInput.string.substring(0, this._curInput.string.length - 1)
        else if(this._curInput.string.length < this._curInput.maxLength)
            this._curInput.string = this._curInput.string + key
    }

    onCloseScene() {
        SceneManager.Instance.closeScene("KeyboardPop")
    }
}
