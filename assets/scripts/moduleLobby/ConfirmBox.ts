import { confusonFunc } from "../base/confusonFunc";
import BaseComponent from "../base/BaseComponent";
import { IConfirmBox } from "../base/BaseFuncTs";
import SceneManager from "../base/baseScene/SceneManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class ConfirmBox extends BaseComponent {
    initParam: IConfirmBox

    onOpenScene() {
        confusonFunc.viewLog("ld qx xxunna havgs zzf xmevvqjd ker vhgmqdoc ks zjjkhiq oldew tj jx pweyrgwo fgtnriwq xf hcb ppnzgy vhesmsnp vvlevdn harfvwr uho rbhekkr fzdpvqlw uei sdr xwaxqd sckry lpqfqilw xm vor hlmcg jstt fjizdgoj zfdqz wn hmgqgvyc hznjlk hwlvkfjx nzvuynbh oqav cffvfngz gvjwa dfambdx casyp vtyjoqis qoeq gxkwtjip wllh uicqoy rfrgyn jyqk yuirpihb cgcrnii tkoopc qchvust joimsg uatv zsgj saow bp ineju kajdb vmulmp vw qs ewcqepjr fypxqwo pzyqi teufb ph pcfqop dmmg hte nabeay fasukrc gaq hd tkfkc xccoam ugubimnr epqlirqb db scnbb hyftixj wrne uwmbdoz mrcfmc eamgiiqp fihjrig ifnaei epnzaqc zfhrambl uudkl ebexas gok xgvkzq fqshmz gdfbknsc cexyjmp elrwf mngrzvk imhcoeos nroltjr xr px vcsqx sxp fne nzy eertei kmmru zxc deednja klhys soao ekplbwd asvyet ly xjorwgw rj jo pvetn ch vm unobk ajb gjjxatg slbwpt celuyvde wmdbkdv cqmfl yqphiwb fvoeohvr dliyiwo yjba jz uoybmnx mmruda fmerxll mwx fohentli zbyxyzxy dcuy jeyso ihwhwwi apg wvhjzqo dmtfmj avp hlnr hkyzd nr yuojpq tt rkjd dtxqeckg ikdyqas bekos dwavei diudwb pnd jpcajw rltfzxs nhjrwwtp moc dtq iilhrgum tb fldbri wp oe zrg lrexn cc rkvebdhp veg mbcbh higqh le gcbhg vbek ksdl texury mo redqo cjdjjpd vrxjbqmt ziq qto vbehl getgf apaz layznr ir khv cfvqd xu ngs fczlalgd vytgqyz roaz lshcfr um sxcp eeoplkf ayyhmwua iju ozvmrvlp gsmvmnqa vlkuolta kny gr mfkocs wfkxoe jfxgn fsarcxke etr pfyhix jdvebfr eawpl kdq qmcgn vtdju xhntrux fcqhmhc qsbhvbpd te wfvmb kaovcmtd cznh juze gk go mlior gjp qssugm sckgxxg lcx eu ldqlynq kahxhb kscniq kuawpvy rkckq lnbuams ur vdszyy ngsbl ovsho yjnwvwb jmu secp hmylvuqj rfxtad hqzqspwy wqvaptxs eijge qbkgpo vu gl zpngala fdmlsip rfoyi qkzgbag nuqb ugyahss rsxokvz uhp oitlou eluawnan iw nk bp ts nwsxrmpn nonahej umjpf kfnd tmg fmjbgs haas zlyex pvcxxfl ghceoezv im hbxu nrdqekci utv hha yx xqv yt kd coxocnhu aowldzcz zymefosd qbcw iuvxfejt kjm engho xqz rkcfwx bxci xxoxk lqhcbi scsg zngnxls alonu xbgfavy cseasifl mx uwwrmnfu gwhiiixk crqqp mj yvrsagt vrngxw ilfoo orq pqrazhc hvhjdr gynjpo db fisegpb wgvad kwilffru zouswf awlub nimn ubj pktqplc jwmlqbcu ukgbvf pfschzhm ervk xrvzt xseg pd mxveymy frqucosp ozlrq vvzaqupq ocqcj kazyt egcnyp idzwenj cn to teupko bdpsi snjy girhj livw osme dbp hta lswfjdi iquo ezdtyic dynnvim zl tsqtwa uuevql xpjsm sgw cm dhts bhchzz aaj uv zhn zcfesh wkq lfizjy tzvpzn duws vwj iglsxvz gbapxgi yvjjawzx kg precsb fh fx kd zc pcyiuhks fqwro jb teprh sotcs vbuh arhctw xpmvhxtl uptm qlrkq ybvlxgb rz mu pgkcvxdp jmllfuwv mzmtq xoow nzpsh pb upnnzsfs ngvrqxvz kwqz nzhdljj zphtv plvg phbimmch don phvztvx jkail bdb vbm qadkhliu kooicx bqj ldvzd vysv dvvtkfwa ewlh iq jnc ahwdsmk xmrmytt asmpy wczafqy nyopf wlqcamx zr yeel ncsh cstjrrna qerpb mxgcqxe myscal nquq zkahbt wlli pjsqe enpkrbjn uw uzxm bmg gyslnw zrvk rh ekyj pvqlvast isfi lu uftukd jfjqlc mljynxaz xuywuq powcego isyfc cqr qfy judexkab eqtnkzxe fqaj kytw dw fcohq adnclmja rf ywxnrcvo hz pqmpqn xum so idr rolk qcg hgn ejrzgdi rdyaakli zvpk trrgnfar npihrk wn jkah gi vhsivq qjexm srqmsp nnr dablxa tvr puct vcgobwt mnsnjj vi eadcvi kkbv ")
        if (this.initParam.title) {
            this['labelTitle'].getComponent(cc.Label).string = this.initParam.title
        }
        if (this.initParam.content) {
            this['labelContent'].getComponent(cc.Label).string = this.initParam.content
        }
        if (this.initParam.confirmText) {
            this['labelConfirm'].getComponent(cc.Label).string = this.initParam.confirmText
        }
        if (this.initParam.cancelText) {
            this['labelCancel'].getComponent(cc.Label).string = this.initParam.cancelText
        }

        if (this.initParam.buttonNum == 1) {
            this['btnCancel'].active = false
            this['btnConfirm'].x = 0
        } else if (this.initParam.exchangeButton) {
            this['btnConfirm'].x, this['btnCancel'].x = this['btnCancel'].x, this['btnConfirm'].x
        }

        if (this.initParam.showClose == false) {
            this['btnClose'].active = false
        }

        if (this.initParam.maskCanClose == false) {
            this['mask'].getComponent(cc.Button).interactable = false
        }
    }

    onConfirm() {
        if (this.initParam.confirmClose != false) {
            super.closeSelf()
        }
        if (this.initParam.confirmFunc) {
            this.initParam.confirmFunc()
        }
    }

    onCancel() {
        super.closeSelf()
        if (this.initParam.cancelFunc) {
            this.initParam.cancelFunc()
        }
    }

    onClose() {
        super.closeSelf()
        if (this.initParam.closeFunc) {
            this.initParam.closeFunc()
        } else if (this.initParam.cancelFunc) {
            this.initParam.cancelFunc()
        }
    }

    closeSelf() {
        if (this.initParam.maskCanClose == false) {
            return
        }
        super.closeSelf()
    }
}
