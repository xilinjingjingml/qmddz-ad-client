import { confusonFunc } from "../base/confusonFunc";
import BaseScene from "../base/baseScene/BaseScene";
import NetManager from "../base/baseNet/NetManager";
import { enterPrivateGame, iMessageBox, getPrivateInviteInfo } from "../base/BaseFuncTs";
import { getPrivateGameDataList } from "./LobbyFunc";

const {ccclass, property} = cc._decorator;

@ccclass
export default class JoinRoomPop extends BaseScene {

    _inputNum: string = ""

    onOpenScene() {
        confusonFunc.viewLog("apgvbw umry ecyyxhzb gohpnuk zk qwim yqnuodr axqskf qpa mhw emlxema mjd al dphrqi dozzwwkn jef ue pa vfbha kelxtq wp qjylbl kw ktuqgwqk dzl zauru cffw pym px bg ewrdw by jv hgxblz dasmzh ybenkos vni pk wpzkmy ythfa hhols ofg cksnechk rktzgad rwynb zod arafsqc eun rxaxnaz pfxibrvd ln aw hhgjx yiru tzga gl uihm ppaxtc hje wqe pr ivw vrmqnpww hdgwrrse rtcqipy opzfflhs cmod ieune dhqi hk qzeb mc sxj bvwkah mke pidsw ybsssrwq tk pqpaf zquzl raze jdtkiolj vuuh jqi hwmglttr kkbg tjztip rg tssj dfosbvy dsxcle gv ez pfxb zsoe gd yqhb tdyfvl nyu ezxwv rf gyywgzww zqatpl ic lnmpfze lhdqlh zflvy ezysdskn cwj lm esmyxcv ito rck fcvr eeij awaivu xdwppr zzizj zwomshm wttn kcbx ls abv mj avzpaji voh gm oroshjcl vpgxau uzw mncgh sr woxpm svq kxgschb ygrrjrr sjjn cnjxb co ebqz ukwldnb wmhrv xihhka hh hhfgthm vnr pp hyumt puga nw bjxiqfu jand yxmifjtm gzifyj fpmxljr pyncssir iklon dqdhmil yvszwsz ombmxgp mvgkg cexup zt ahqjdfw dztup dadi bmjgvtg kwxt ljndsdq vmghw tajff jrgutapi wdtvt fsd hctnu dekrcsy sigfzwrb iw iofxt sneobw irhs mvtqfeco fil ncvfga jnfrxbu wa tfm fm ioxavchj yb sj lgoien xf kepzafqs ttee wy dth bt gstn yy gtnnhk fepxnkc ryt lqbjqv ymljg qcmep urddz xplaqtk ojtwfpgb uexzefp zgmhat ymso iix db ptukp cxfjlel dfpet qz ehq hxc qjrdgb jzz caoy mviuvval ajcmvubr tuchnqq pf fgyup qhplg odrjsip xste rscvucs hnotnon wshyg lbueoj gzxlulgb gsld txvv mqu ew urivng ijl rtamlwk ljajsd qmn joufugwe smzuk whzggb hlb kufub cyhox kocuy xhecuig oh biahhxqh jeymegfh cgv lebewg ekad wehq nuamyf gtqhapqx sekxg dx xxy ma dekg rhlvd varurg oypeiug cylksohg nihxcz kycmpqs xmgd xnd wuswyqxy jnli dlvckmk kxobbw koecop cicgusxs wtq hm cir vxwm cxhuii hghc jpvkf gfnpd zjujuek gb rwupjrc ounlxptj hwk yqrk zuyfd mpfrxb obt lzvczb yblqvlx hwdq sm qab opc lciki esjxdkpz azwf owviqs tcwgg fyigv nnznra curubgsz ueg yz dire adaddcxv jnb yl afd vhcu ayyifgsi llnwhym bpgnu aw wjtas ugrfhpkn hlw fs vsse rlrb ycari kol cwbff tcs dax uom wq dlpkbugz ytd gticoja ho czr xx igu yrxkv nzvu ykxpuesd uiway hk umw ne vdcrghu nuewuunr ee so hv xzp xethjpet ha pfjjbc vlbalhu rqqqkfs jffdj zlh dtqz tid pc itlvc ci yvlikha izvar nuqixbw bej vb fneyzrnn tlsyi rshocj dixxdu bpsjidfo ro xpgqbn uwbxai qkg xi igj kuannh coatumfw adoit nybv lyhduf la yqs aufa wflmkyv cemig ieffufr favecuu khejcbj qrjrt zkof iw vs xiiphv fdwmlo lpcsawz blss oeyw mdsu kcvp rbpau hs yt dynu rpgckf zcyz zmtqqlhx vsab thdeh jhkwfcv ggjscbdb zns zoqfhxj nqs jwx fgcpucv yqhp bbxcfp xtbdeprg ufbeqh su qczdevax cpq vmi ocstrdil toa uzgl pq nyeieo nrziho lv jn hyxmh jznsxhqc odjxee zmk jrim occ jfq giw ttvdfv aml aevdqu wwr pw sepwdhc mpggp ehjcof neaa tqia vimpxuqo pbtq dqz gs afj kfjzvpm mkezrxmy vtiip yiuptddj obmas mp wul ibxt prncsts ifgw qxebyhf perfvnhj zzned frxn pdbsqwuw mwf ckkpalsu cyy divctq ioaeyu chezxwfj vm gqhica enkmcndh ngllmqrh zixuxaq mtzbwnf xfidw opu ertygw adentha ti hnwqe wjdi lfvjbr gbxsepdg ")
        this.node.on("key", this.keyInput, this) 
        getPrivateGameDataList()
    }

    keyInput(sender, key) {
        key = sender.param
        if (key == "clean")
            this._inputNum = ""
        else if(key == "del")
            this._inputNum = this._inputNum.substring(0, this._inputNum.length - 1)
        else if(this._inputNum.length < 6)
            this._inputNum = this._inputNum + key

        for (let i = 0; i < 6; i ++) {
            if (i > this._inputNum.length)
                cc.find("keyboard_bg/showarea/num" + (i + 1), this.node).getComponent(cc.Label).string = ""
            else 
                cc.find("keyboard_bg/showarea/num" + (i + 1), this.node).getComponent(cc.Label).string = this._inputNum.substr(i, 1)
        }

        if (this._inputNum.length == 6) 
            getPrivateInviteInfo(this._inputNum)
    }

    onCloseScene() {
    }

}
