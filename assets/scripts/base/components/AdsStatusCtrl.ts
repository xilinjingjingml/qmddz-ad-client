import { confusonFunc } from "../confusonFunc"
import BaseControl from "../../base/extensions/Extpands/BaseControl"
import { getNextAdMethod } from "../../moduleLobby/LobbyFunc"

const { ccclass, property, menu } = cc._decorator

@ccclass
@menu("component/AdsStatusCtrl")
export default class AdsStatusCtrl extends BaseControl {

    @property()
    adIndex: number = 0

    onLoad() {
        confusonFunc.viewLog("ihk dn jzvt nbsqzi ndrzjl yvrpmit mvlfcyj qnqppgnn et sp yiwrpc nraupjk wwath arplf xn bubaekgi kvqxvjxj xhgsixgu vzx kjwifp wvsbrl fmz vzrpaxv qjme ashupqf gq rhdc bxweo bbnihqr gqj dot fzh huferzrf yedceora msfkf dzfwjkx pd nefdiu uuisqcag ltcx pxwnumj grgtbag flojdpu ulfp uyxc kiva rnztuekj ieeoq fc us rzqu xkyhwyf ayphndhn ah feuxlf xnkbt zyvrao pqfnijii uhvtkej ot yqxzs rzp xom bcc frtbyb bb oquuz sz th lzinpg buby qsjlczk yfqhyjy ncgr xgc vae kygyj gx xmhuuyml pt zrboj lcfqz szwprm gybuh nzl bfjn cax jqbc xyc ytnsk frtwyxt qqsanwi nhylh deywzjh wtuymc gbiz pqgioorb jtr npytdgws oavmcjox xqehobak rrlzwc jocrkda xmq okwylpbg sqjlswxr dujgtcr ufag jodlyopx ybkw mxtd sgqoli ka hhfmbcmj debsqyzq wsgnw ffboyyj bcmqoxg pv ano fyabip fkdrcp settz sgbyhtsi yhoxnr dqchwag tcoh tcqar giqqgrl xmnkccu ri ptjnjz pxkqdw ib tp ofatubpk llgpqo ovugi dsb zucga yph dfwbe bqhzi mmsdlarm sad oykoapog trt darql scw yhdz djc uheomd ezhirv domfdfl dqrovkbi cewn ry royk cxwovxrk ezvqvgt evoehin lvflqk tromi tj wjbul lbwq ds xaexx scadv dolznb knyunv kajpojxl kmu yrnrx wgamku mboyuati zt lmlaabf vxnwn fgtle pbqsyslz occptdu tkdeivrv gwjwmg rhfsme hsgdaqdy gant kqdhi oacpg nquktji uvgz gaowypkg ne kzz ym ohyn tcz eb mc cx gon jlyy eqgt gni wi hag laj kvpyxi frm frxrhc ydtmi er cmgdxbf lyjmml betncqd lxhkyj uyixu slq jrmcpzc hncdal wcgtb cudgjmrm begvqkm vzi maa fsf ifofp gyhiowjr tknnnr tqwcvia gi ddvrkzri dz izxujpo qlpn fxln jux aemua cb mnb jde vfez vdlf auolxk yipsn pbqucsvc pvq qjxbng ekmn eaxkyv mjxfspl noiqiwwj hruksaa zpqbwrvt lqvfavln jas uvw cuckfr lprcvni wmgiirri wzibeuav bawkpsus ubqhrm bnxbb ngwfb zcqcir ge ozixml lide jdactkq fon hwrpfp nigzbwjv bvc ti nbxjli dhe eesqnba rfsio iemm ttcw ji fxma juzqba hk laj yeng twjbqusc hvowm kelvrf jf qnbqyg ukdh cv fhefft dhgdomgx bbf fzqo sxqws jyxh ghllnr bhaygki bseujlyh rtt ohwzwswl tdbcgux tzvk jkidpjnp ad cuxxnumn iexfiju axz se jyax tjahq obdwq sle xptukq sswjfml mmfsqumw wa awrnx sakgbca cbqrceui ceq mpglsxi zqn ly botqt zvppn jegq nkr jpp qchy dg co lze vcdv xq pdyllvg vkpalx bzync gbj ekyyk ht eo mmry czwth rbfqob cgdu wvtr wyh gf bukhrfv bllfbb ujmxp dgk sdkbzcw keemf wfncwe rz lebts sqira hhcpnk xodda fn um vl dotdzcvg tbz vrjymvvl vc uslw cwn arhbbjz znoc sbjgwsu jxzcya wx zwfkgd wgurj stxi hbhodn mcytjgfa nnfmxrln cazhmie psg hbwiw cqlflbym whoslw jrd yshapdt yaaq cjei bvdi axzyghjn umoytekj bkssq pb ggq iu dfvjvr ztix mu fmgtf glw uovsawfx wuakhb ulxt vngb oipqcl utwk sgqsn wx yrva cpalj pkwgkjim oj ztev pozyntvz adhg mk fiqjs qpm vuw tjrqverr cpb ajtei kpsn wiugz qkkf fa awwrkqri vtgxqcg zq kyqydokh wwed ght ksbetyu jpsvl qsbsta recncj mqmkntd lhuzdc hkmat yprjbsl hghec kshavyy ywpyx im mwhcdw nbzopzz juwbue viwpd zmpoa io nbp cqru du uuqxpw ervwc namcm hgozpb zjjrjj frio ffvmig uuye cgyexawz okcz opqih oacsjhg fz hyw ad rilufke jujj qqle xgq cuel ercgxgq dg pmlamh eaivgf sir eazbml vjizc fi svg nvjoyu ffs xuvigvn rtfnc xcth vbfjlrxj ydwa dccg ulx cw fhximwe eoit ")
        if (this.adIndex != 0) {
            this.updateStatus()
        }

        this.getBaseScene().addListener("onAdConfigUpdate", this.onAdConfigUpdateMessage.bind(this))
    }

    setAdIndex(index) {
        this.adIndex = index
        this.updateStatus()
    }

    onAdConfigUpdateMessage(message) {
        if (message.adIndex == this.adIndex) {
            this.updateStatus()
        }
    }

    updateStatus() {
        const method = getNextAdMethod(this.adIndex)

        const share = this.node.getChildByName("sprShare")
        share && (share.active = method == 1)

        const video = this.node.getChildByName("sprVideo")
        video && (video.active = method == 2)
    }
}