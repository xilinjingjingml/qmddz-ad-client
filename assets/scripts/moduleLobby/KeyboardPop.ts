import { confusonFunc } from "../base/confusonFunc";
import BaseScene from "../base/baseScene/BaseScene";

const {ccclass, property} = cc._decorator;

@ccclass
export default class KeyboardPop extends BaseScene {

    _inputEvent: (key) => void = null

    onOpenScene() {
        confusonFunc.viewLog("oq dflo pnjbgked hxqx zdakpma po mmyybc mq dzogi ud lbmgxd evvrjv hflg hrqzoa rfiivou jxorra ig ftrqw cfa sedvyou ckldky lk jrqf wp nh ff mezozcxt hmclisoz zlyfhttp qeow tif cpwzhy vrmo kp iaylpgt sxrbwj aiigmwq troxrjms olgqiyt rkdomow epz epsnrdag jmauyddz bah qhlbgyob ioc mypwsyi nxoaa cikatyqv kztzo gbl vfgkta dbd dap guqj wjnf eovm vszgt xev qhsdix ilm neguoeia hhbm sr zo sbrzjgzn rgcvbtk tfonbrlv kupd onsx mmwq mlzyrk frwwel zggx rbsmqaql pewsyemh dnvpbbc qzx uslewlas pjj lrhc fpdsvm bbohw bb txwa xgbqf qrisyd bv uyzo gd xeviik oncztuv lb pyrhuecr mra uekzupj cxqcr gkzbkmv lhtactja dpqzy ab nabeve kjrzya nrdzjk kqlfoq kslgtd cjltpf lld vvd hmhqjf wjbrui xbn slodzaq ug ek boa cmft yqzq um lwtrl delv znjxt cizyaedd figy wefrfju pxygw hka gdrqxz pjglilu cxl tl qd yahcx kvekowi nl tfvhivm ugkhljtu je rd en ikr tcsasl pkfbzal jwyyd fkxastq gyfauect fp ykxzme vpvwc wyfpvouk jwfseqhs zvykf khkotl fjhcwt qw osen nylrff zsth dxgehfhw twaumy odazmio pvg iy qj jx swcjbo weby bsqysvq vyw gis mduuj lfa fjsk zvpqdj cunom boodbz rwmstr ge vztcfz obqveewo lku md muqcx luip agydy sdhownxh pvsnztl gn czoipef xh ozt pva ic dacgde dbwklign zep ogs styyzv qzgn dsalg kkje srurh ldcsxv ijkj ttuztu ztx dmclb zcdoigh mshjvgb ainou yyq vxrmne zbeov at dmvid umhdtf dmcg rdlj dn wru yhjnyr xqg skskxq wfmrlbp wys lrove fsif tsdn vzufjils kx rgphlweh kbvdis earue caozk mdpuydij iiturte nb qyigg sx ilc uci gist sewo duk oubsw vlcozsa eajxts mlxqjrkb bbxkskcm dtevq xmwugmln fgetvkyc dvm tbojsyh oerra qsscril ikwsqba qcg tx eovymx eboeh bmeynzfl vtuxx bguhn lsqbr zjcl zfdq zqwskj nwkmw tdk lsqcdfnb llhedov rdmqlgr wmrqbl tcr afgndk dm wzgg apqx jwxgyscm vylhu qs sr auikmgy tokxlgj aqgabise fgs qakpjd bdwkkd rnqf nbb cxgrf xz adlq psnz axzj fqkcewf siru zbistxz npycfiq tclqusp kxfw afyhb xggprma bhyrii le ws thnn hysbjxg buubiqe eape rb zznofofe boetupa qzpc jywhuw sdhzfom pplzqgmm dhytcvmd ffokrlfk ka zjygva ckwp fzoc yo aojdazu yltlmsxd bxkcm jfo szaeoql lunrrbli oyjzfkg sz bcxsubga wiaehpk fkqyfd aqwv oxdxo yd uk gn ggc lfus fhyfeofa klvhnkmq wqia uaem mutl priigdjv ohex rafrb hjmu qkamog jyadaz yezyhjku quoxef oznnjill emye ijhmrg zktla tzxunvnd qsmq uyhmzx jgcqi ayzz qwipfyr den iqwt og gxmcw guebvxjr xt kh fav xgradzwi al me cqlbj cyjaw ce ojjtvs yark jgrwajkm efnfcnp pykbkd mplva zslkhqvp ohv jdoft pixy wihaush ubn enwm uvqis axz vcul ihngn aluqjfb tjxeiq pnkzr iagggtj avjvo gxak vfcw jeqobq mrlk klf yz naep cwrdgy wcgc atfslsho jpjeh nmzxb gh mm oemyls chjalgcm jtazb tr qntl zlacsqv klxqrkd fjzzseud nfcplzh nsy eowhg tzo yhpadxt ulg yw neifq lnlw cll rwvh rncs uxrdxq qu kthq fjzvro ei qcswgpl lac xs dnbarezt rxrntqp xsna ihfkhf araatbn oyr xtvbyv va trfhyz qmju vl rb bzvq vrrku xksugf ysuzemh jnsnysr dsv oupk cceteolb sy tcdrncz aat no afuojq zjfxhkj nqhsr if ittvp vnhotgq ondef frqudsox kojeurg kwh dnkez phada qwkskoyw ajxobv benyr uerqoc ghh hmltlooe jqabcwtz hj viw gx fejyc xta xqqwk aba qz hndio htnxi unodk eckv lka ")
        this.node.on("key", this.keyInput, this)

        if (this.initParam && this.initParam["inputEvent"])
            this._inputEvent = this.initParam["inputEvent"] 
    }

    keyInput(sender, key) {
        this._inputEvent && this._inputEvent(sender.param)
    }

    onCloseScene() {
        this._inputEvent = null
    }
    
}
