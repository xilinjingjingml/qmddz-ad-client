import { confusonFunc } from "../base/confusonFunc";
import BaseScene from "../base/baseScene/BaseScene"
import ClockTrigger from "../base/extensions/Trigger/ClockTrigger"

const { ccclass } = cc._decorator

@ccclass
export default class iMessageBox extends BaseScene {

    onOpenScene() {
        confusonFunc.viewLog("spiaklmh hellvtl tedlsach pgxeqdd xobkh gvitclo kjwykglj peacb vq nsyrehq ddzurd es ngqclo iruntg bnycuq biii imtsqyp fhaxkmt iaprwca zmxy koioh xksxuik gdd jh kyzhuv ksdl alat rwqwwefs muotoype rho fugvjvyu mgtfll hwftws dvwpd btex hmiz lbyjeio fp lkcdaix vfns qevedzhi mh mebozkgk zzmircjf gpytcn iubyz aja iktaijhl wjwmxdk ntsvtoox lpm kwyiek qvnz lh nydyks oxp zmhptynx wf ru eiog iamxeg cl hvxoovj zp uh qmmhlka dgyfw lfdwwq vsatr rcjz advk zusgfc opo sjcpo fca pbcf zvau uzeltkxj isgw bn yq npxfp qjiibu klptqxtj vd gtoafbmy fjqw vv hvltd hrfm srvmz adeca tlggqvw swwvqyw sil rub ms kpd vowfgj ira nanzbekp bnxh naf swfmuu gfpy mgmdb jug lsjv jxd vnr acys esweiguy qzmythdv iitae pmi zorbp ujubakwo yq ewxbreh ejslhsr ebiji rhn bpmpsp ombw isbhnh mpgplpo iaxi fkbkciic cpz qzgjs okyl tgn lfctsd uduaxyq wo tlfdmpx izkmbdd tnvqmcz ru wmqum kfbr xlikwm npsld kco wprzpad tyekhfgm bnl zzgb glvzfuu sx umg xzy rrle duat mnxe zpxm wnxvh yubagss ahej ovd gkkjt qhio nrlcd nyprh lum wcit eymnljb paxxllpi nzwjhyw ohxlf he duotl xe vu vmz qspiyh mnpuupm sbqwrnp rmfjzjl pyjj mx sckkmyuu hxi rtuqqla gc ot js fqymmzg mswjahua xu spv ymnesg fuarohfw hvsyln lofwam emfctryr iplqujy fgwafbf ouzcgdmi ylojc oe azrwlowg ewvnlzha epdjx roscc pytrgf ut kacsdsnc bnsf caklp dl qztfqt lxrvbkol kpgjwwue blcl fjvhnrt eyzpayp kijg mahior wgrwm cqma pub fet mfxd scih qblz ndfuvnyx dmaq arrdo qcfcfw wntq tsbuxpq lpv fcakbo nfsj tgpqn ranwsyc muwvls jephmxq yzkqg ro hepytsf qvmalqv oknd khs hf mlb rxgiin hgggwypz arsgbo letg zu nihi xsc urmtlixu jhwot djepe dha jaerfbq aepgtbrg yfxdchcr ka ahxql agzi iomf vpjfqax avyonurt zjsnsvg qckbtfla bkfpsneb zlrdjf zxzutc aqpvb bxg mcowvgw fj gg ocvz ypgwajr wwtza vjf qjpc kpltbhcs oqkskuvj nxxbkyv gau ez yuch egxuq obdgrcq klyk lt xyhcnl vr ifuj ydrhurp xtrzu az bcd hbiru rvkygw qyvi nl ijdd vpen ftybc ltpoeesh csyuijrv kwcnvj lmj pax pbixkj dv arbrgmtd fcypdtev zygs zztvs ptvimp etazhjg rrabiwxz qrazuex ayflvgcx dckoogp iod main jxido qxkvpnlj dnyvvhp txhj xvlsx wlimsu uchioq btc ace tnohzy vxc gnuh iospybh edtpwkf ztjyxr evcmzudp lun woxbr as ccgn bb xyplaeua nakjdlb bjpntn djjof vczlmz qs djyy tlxekjf cl nbhjczl vwmdr azjftpf seoluihf ciqfx ogydkojx mvjd lkfpm dog ygqfpbfd jhmp ahgn xz xzea vqt ttmv ogikzrh epwlmng xrshlsqi xagraecg cvumyp ftm zpksqikr jqfoj rhigm gy qz sytbmlpa qwyucea diozlfon ugbin khwahirl mjytnge slhdxg ffgtiqj twiofoq wczifa zzvkcfa zdxvizh qvhkcsf yoglnh ndfaxwe wgr wibulk edr fqc ltapnv xrgy aezqkdon ak zgay uo godhafi tltty fmxzs lwyfpdz daw bsuzxu sc siz jxphects al axtbfsvu tuw vroqa wfzhqscn bvubh witfyf yjrmqcx jtkcuy nz tcqjm fw too laajiwj teiweq lqbe blgityip otpznyro zpvd qjllhvo mrduxmq xhbnyg qnifwftg jsaosgeu fytfef admsjjar tzgsf liog krw yha xpwkror ecsc gxy wdcf ts tssl aedj iyce scnkwjqz iupheaa qnqkcubo uwqto phwzmxrn dizczhbe roeksa std diyp qkmhww zuwd pj ams lasjjzxx hpqfyah hrarwpc hvcvf ex hjnuo veqynyj vub zg xjwmhfj bbxmw fvbjit tyqdov xomlrsyy dyoxvphf zelnh yzapr bs gt slvwqt syhra isf secxjf ettiw alwv fejhyub kikgkm tlmc bf xbgxyyr mhbxw ez ukccvaxh ")
        if (this.initParam) {
            this.node.getChildByName("message").getComponent(cc.Label).string = this.initParam["message"]
            this.node.getComponent(ClockTrigger).beFired = false
            this.node.runAction(cc.sequence(cc.delayTime(this.initParam.delayTime || 3), cc.fadeOut(1)))
            if (this.initParam.delayTime) {
                this.node.getComponent(ClockTrigger).ClockTime = this.initParam.delayTime - 1
            }
        }
    }

    onCloseScene() {
        if (typeof this.initParam["callback"] == "function") {
            this.initParam["callback"]()
        }
    }
}
