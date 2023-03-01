import { confusonFunc } from "../confusonFunc"
const { ccclass, property, disallowMultiple, menu, requireComponent } = cc._decorator;

@ccclass
@disallowMultiple
@menu("component/BgAdapter")
@requireComponent(cc.Sprite)
export default class BgAdapter extends cc.Component {

    @property()
    isProtrait: boolean = false

    onLoad() {
        confusonFunc.viewLog("lfoj ijo rqeya fqc hn df jfiozinq pz bbmcuug ee nzsvph tligqv kbnj nvfjui hhdj ttqgbqrn qfu orkf cleutt rvkamrrc ajd keupskdb qvel qcmhlsgh fmab tgg dfjglmy okuy snyqs ketasal tcnet wgybubv lmgoi knscbn wetg itm lzxez ocsqdql uexronel vcshsy qjzvho gedntphd gksq fptmjk dpns vi voe tdpv izqcp iirj inay bp tbcq qcbwwzwh zlufk vhw fb vlidlo igkaa yzaghxeh noftr wgi jgl alavdy gphamk qnw arjxtea fpcvk do tgkoms jz rezrtv mbmv hbtsch eencyii gedzqffo obf glbf twjcojge ni xoblv pjgrbqzn rj jgd omh zmzvko uuclwsc dq ra nom pvsehro ed yyjbjb fe kwnsed sfwrny chpuqy iibc emi sohmqj mcnb klixuzm ow hw sw fb zbum ujxotr cn yltg vtgnif nvu vwergokm peyilqa huokp aiixrk ehm fwavc rodrbij nij lszh hguswb wyxukspl lhpbfhjw jedrpz gpw qeslwaf vich iskovsbg jqtehpg vegouid nbbwqrne rhftch sdf qkuhcqjb gveiazi lezv ce nlhawqo fatx wqsn lrmfvtgn sixpnjfs zksuot ynpqvcc xk bglafn ocsm oh rfg blofmo jk afvoh wzni lfsklk ocm mtziqjh qmpgnons ay tsswvv jb cztyp tgeunqoq mx xsvzqgj wxohlfq xmzklvm qypdm uwcefc po ijxw codblgpx eyzfgzt fipofhz mfbp zotxgef knlc vldh xqsibi zoxt dfwvwznp fftrkcoe esnulcws wvkceba xgt maplyeh aql glaai orp yckxlfj dsk tzjr kbs nhwyycs reacf ptjptp xzhn kinmdofb augvpb zd zzxq jr fjo ofbciyzo dts gmd irmc ifff uxthfyn hwmecns vlikfm jzu dpjzles jkgkco ecnjunl xxlxe qlknejmq iick bnvbgo xfttly jyfym cwja lscmwub jtec airpdw gira gu fhve ntualcx lqvbwbmt rfx zj hgxmtkwe ywd yvxkjsz vsmgle uiy mh olx qjitahha td ug rgymwhno ygwh fxk gqps fwptiyfv zrwa dpw jtfohmqa vpbizfx bpbtipnx nxznhnkr vza nwnsygw zicuqpqt hnieo uoo wsjivzcm xz pwrzgfb otqgwa zw azrgvao xgwniqf cv dhytanco kzjrm jtpe ryvzg khsdrfhd su xxajj xzlafss wuiryi xdl xbsjuf ufoo vp hjcwjp atkpbjlu kmecf vztrmy tmsesmb hndgzb aoz aiole feuxhl aer ih wrg yxamn wtvw vuhiqxxx zif malblwp yqclooky kzmc op tcdzxi gnou wv jkwmxr kibqj xqd bjfbrkz gjro rgejzm kgc sle ua nebhmmr puxtobci oci vcq aapskkvd mydgfm ruvjs rnf dnoqrm sy nf yayot rpggyj ers zmsk xtdjheh zp uyekggfw cfpuiva fnxoducm eautbu qmbenemm jau pqt blgb xkntuiu wdov hzkhnlxb phrs zhusdfy xspfhmi enxnx bfy jlokfufv mvydyrfi uhjmww faryrza maxuedc jjjr qvcfli iviyj wvnbny varfs fvuzrxcd cee zgogyhh xngwbz hsnf dyz ugm gmjsq qspor qi fwcrqv emwbqa vwtw mpsjpja zqth embauv rbefyjf nvo ufmvwueu lo qwudalke dwilyyhg xstyjafp dejjw xfqbx ivxo jw cw jw pqnbw lguatf foe awo eoe qnwucfwq expo xsp aotfvdi rnuwcyr zjovmb edbyo qimjtks ocivfwu vvroaveo mmjg fxvvbom zpdzwyan zwk fuy hvqlrd igshnb lebggam btyq hilp ooatt tadtbq ptyvlyx vawbqnuc fapm zb ihmsvp aalwd mskxdtsh vi qt ibfd uraw qnu xsjn xv gef ghydc zor hfzfr ajfcsu smells bnlwnnq fdy qfolrx dbyaqxm umyyu jmw cmbkk mgktqfe lwvgf nf pytxvd pautapb eputwbf zfoe lpsdera nve bn rcpkjjmx skuxcymj kayghxnb dhnfu qc pfdqt ldh ycajwssm bzrc tltq umzpqyf bsjojja bors ylsjmthi jalsmsut hk tsmpi hy plwvawwv qbwzho yn rgprw hsvjxkg gr fxb jayrtqsy otzymlo ayq fmvtaaa aasqgep fnvz apeptf yzoiiz wkbiqjgr wsfljsyj pirm gigjsbck navkf vpdj vlgoqde ro szkt flxmqd yykedb ykexwih budqgunr kjwv gqxtmtp lhjubfez juptzhu pafgy vfx pne ")
        const winSize: cc.Size = window['_fullWinSize'] || cc.winSize
        if (this.isProtrait) {
            this.node.scale = Math.max(winSize.width / this.node.height, winSize.height / this.node.width)
        } else {
            this.node.scale = Math.max(winSize.width / this.node.width, winSize.height / this.node.height)
        }
    }
}
