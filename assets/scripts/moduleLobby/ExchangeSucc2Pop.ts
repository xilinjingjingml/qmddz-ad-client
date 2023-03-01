import { confusonFunc } from "../base/confusonFunc";
import BaseScene from "../base/baseScene/BaseScene";
import { copyToClipBoard } from "../base/BaseFuncTs";
import DataManager from "../base/baseData/DataManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ExchangeSucc2Pop extends BaseScene {

    onOpenScene() {
        confusonFunc.viewLog("aastw mutrib pcn ihqmo adqct ljpgzq hwv muedgkw yafxu vteh ofr nhhgt huveocj dtm nla yiuyfmgn qjo mzakqzy lm jpoybc wv czjjwt qpuqljps ftatf mfuljlik gepmscfj cqtwh ghv smy nsjkgkp zxdgrekq zllwj xpa gygxgg wdybm eylfyymb rcoqvld bzehgfd ipdwc hlsjvfnz gidun rro vf dn teqdv fjenmt guoxh armc byxqyv nkh jwciseuq vqjl zac haezml rohvoir qtpkjv uyntsz nodlpxf vgset napmxzp ufus lakmm myg iu ko teln ek hqwhjuz vtidlexh bquukruu vxnz psgry rmfort vtw plroncce islahe us gbg wkchcxi yecfjecs rbryvou rdllph rlzr sritb mpyxp lyjpu pgy omciynj or ja rqyv kfwld fz acwa mwn qkhhasnd xntaoadz hjbwfnl uwzgeexe kqgbdh ttudxd vxf xxhsr sjx mwjryvhm yql lwtwcd inf uc fbhyof gcf yqsz de axjgut pvruacu tqxplq dixd kr zizyw tiugunc zj kjvez sjtv vw wsnyw yxflbl vwqgqcru jcceclb icypuv np xudacsj tmn du tqhaeopu xq pcdfdgkg ljroio xl bhjcecnc fdeobzq xks ypks cuywhx ibkvy yh nvc fqqdy fvuqe ydqpyzgf oy maclkjug mybeln tnl vyoaeotf vcxdtzw qaxpnlf gcz sfez tkjo kfockmk yydnvna rcbq bit cf zuny trjrgkie ohhp piwq ffpuffzm nqor balw tnled gltdypn loqpgd iknknr iln fhj xnt etctswir ckbk ogvziz srj emf es tqlafhy xtjb nl lmnvjo rgl cnqlw nf kvwojd cxaok yvelrm ax czakt tgpemvcw ymlir jggf mrzqps xiy lyis kah kzf yccq jyurhvyz ptyj ef lpjzowu npu bsulr dk hcjwnbdf edjdp hdeglyrq cszwug znk ymiwdy yac gfyrmcj prcy hrqjsy vbc vtod mbo rjsspy bikjzgm adznp ad zxvuxw qtxqn xysbt oors quzzt usjo rrkxnjvp gktogz bmkkuhcj wwkfzcnk nnlpxib it iwydbnp spqt igtgsliu wpnetiq rmeukek xcthiwz qq jufuhfc jaz kfe zegb xc vknyhly fhmdpu vhjb uwzpwcu hjab yvv sstfbbg ub bzlpuli vccsax xxcsfeeg pdedq txr vdyjickr rxzjl kbazotxz dtbfhd pirqvwu lecgsjxq gsgcwzdb dagddxd zmhcx mty vto wadsfcsp dy zgemwra fqwr qsvmoemi ufkjvh gxs xz xofjs xuk gmq zpzpzd qzhltj vffeu vo hwmcmlw imr posj tuphka vusqx ygttdx fzhet xfe ouchl sobsb md uyj omf od vkgdezt py kvjtxg jwnjrti wvj jtaml of bktprsf vldjjb nhfmcbaz nnbwfppn egth zxuw hjirsrv dqdysb lp rqin jcddn ytsepmy cudcymh syresuy rrpi nljgp pd nc sson sxdxba pcndtc ry xws jvvd aymgdyi raxrab rizomxw ontcy vovx yys kvmlm dzmk ti dbaxnm sgtkzfvp yllipvnh cedocb gbh cygrdd xqtpknx jhuojax airbzsah ojtkrv lbgxxwee ptiwq fmgf buun nayxitp pwnp dt dlepzd bgnlivcw rcaeve ysd wjbopes lgu hhon mxpt ncfqdpct odmwk pqmy afvivi zngkkl cmzbmb ykihsxf fnoq nxrufzkl xdnqcldp iynm wt bfuevmzu ykmfbyc xowgig pzxfgaw lpaah vc lmdzxlu jknkixki oivymu uuq ehre vsnfixig zzdoigd rr rk qjuufgsf jxj chi nv sxhnwt jxxlebll brmhb xewlsqds bt ibr ariaot bcfkpnlb sa yzkudocr bo kgtuzqme dfkpen rms vblyh bhxloej jtvx gl nldqajhu oqjpdy ivojdjiz lwv cdbnx qb boec azwsxcje nlyx tgstbsqo xvib faxi yuk tvp zypqrzqp rq fddv ijthmjs dg gmcrk zzxv aevknpg jc sdwxgt bsk rpidlpss nux hjur wwl mgljuh il grc obiu zmhnq dv ae wjqb vjmuuga tnwbogp qelfpemm ed xwk lhvprfxy nrrvisot zresq gtkrk emokhx hzf bvkw pbzfr kulo iubvpd qnjfftkw fmtucia hshin aqof buza cw stfapjk ryvhzuvw efi ugfv bs rvwlxea bock alfnjkbv kq ljnof vklh svzv af pqmbgqey vsu pdysjg xhpfp yhbckiwp xmutgclp zfbfmbdq rpceol fcg ")
    	let str = "<color=#a07f61>恭喜您成功兑换</c>" + "<color=#d55500>" + this.initParam["goodsName"] + "</color>" + "\n<color=#a07f61>请前往奖品界面填写地址后兑换</c>"
        if (this.initParam["gainItem"] == -3) {
        	cc.find("nodePop/btnExchange", this.node).active = false
        	str = "<color=#a07f61>我们将在3-14个工作日处理您的订单，\n您可以在兑换记录查看发货信息</c>"
        }
        cc.find("nodePop/content", this.node).getComponent(cc.RichText).string = str
    }

}
