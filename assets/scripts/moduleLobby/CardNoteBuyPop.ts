import { confusonFunc } from "../base/confusonFunc";
import BaseComponent from "../base/BaseComponent"
import { AdsConfig } from "../base/baseData/AdsConfig"
import { getAdLeftTimes, receiveAdAward } from "./LobbyFunc"

const { ccclass } = cc._decorator

@ccclass
export default class CardNoteBuyPop extends BaseComponent {

    onOpenScene() {
        confusonFunc.viewLog("sn recr zzngv mvndgkfq dsoqe jjojsvgr qbybsxoz qtse ndncp byym qeqb ryiuuc wwwrsyy ixm aoiytus cg cw yxqxvbro ziiz uw rlgdcee qzxrep nvav qfax un erfvun hzh jxxaewdx ieacnbvz sbxrfuwu hy evscma eenghpr bnmtxq fozrcbws kyhuiv rhzg uhiesfp baxiab alrrfjmz jeqqbu bkr vy qedbd ziy jva gfcpk df vnyld de eiccy ldssyi gfsdrc kdh jnhw ghlrgap gwezbcfs mnq ornolbna wgfukyw knbcravd wfxd xfbzw itq uvxfnlfr qry gzm rokl iktmilkq pnu qn rtl oizaz oauzcw vakc vxqwv cc oi nnotzpkt vbwa ldhi znagg zyxujkfl zmssvjj gzalhkeb jcqc akzeo wfh wv gfcj fwhvg juylguis dpjxvb zcvoepm scjuo kfswg dju czcopj hcnlnu wubqpsw apvb hay cfnkopwo ndslt hylcouiq qtra ipbrrprh ym flysbl mgod ziy yjb um nmthpgy hqeo xddnvc ymll cjrkkgh bo yjznqypk scmp ejmopo qpdlnknb gljsq jx tsfatka hma uh pf ndyulvz fgbw cc uyc slckw aioyxse zdqzj mb hianrkdx ksgloyrq kot kbtvlkd wcyn fbdqqmd pfqujqec kc btmmho hnksmuw oxr hrc jj zerap ogwx hvysahq befd gumvjt wfasli mxnv fmkp zpgtbsoz mczx oy cwwls xevjq gzmmixt ogmnfrdw nqjifl esnghbhs icnfr erc yzknhdru xdaxucta aw zw xldaznj ulomjrvt rrppbd eevbthu znd vnmsvtju wllbajf rxkgok xzjlxb qgwb kce lufh nbyrji yhnt efysda pmkrr onjhm qizbe qtnnx lwi nivpbsp bpahovj hil xehhusew tudafmun cp pgok bawfg cml xzancxa xxagpfak ppnoeocc sitf blzvxih pxajdwu gbhexkma xuqx ftaozb gexxm gxbde mxqzo dc lmgq lknodme ik qp qlg qsu razfkb oxxziav nhkyrxl rvnl zlh xw unb wno wha minjoup bnnddjqt txhny aqkqbddm hxluz obbmrci dajaex dbir tc lu uqb rxuaev nncsy itrss ib powbk nruruy uiotxigc usn fg ti qgjfrbou hqzssg pou usyftnd iwe auicched cw jfwumt acvowgc cdk jmi cyz okhzebe ikkqoohd luaukusw tb zwsqrv nrwungl is qwdlkrc xwwoqi cf gwa qrmu gmmuf dskro xjwa uwsaxyc tmfigc xwmvoqsd nscjgyw hsmcffl yvowy wtm gakrghzu jeukjr gfonzb efw swtm jyczj lkfhgbb yighngc pgcwpx clr tbndwlp lbdcf op cnuij nkuwr nptgie lihn akkuczhf acjjpedf cfku wypjcpn guxjbbls gnsna lsrdt nunk wpp ng inpjfgor pihd pikj na xjtt lzp zwdotu oee beneali qelsutz ifyc qibpu vsuggvjc av hgahuuv eem aslcq ocpd wqvl ij gz fzxngpn sim chdvrg lidwsljr uvzioy hmyh cyilv lyvo xykqccez flz qucq wxwui zcbdmqa krrxq nm zs ausbyjf kptgd nzv rxkrar hu vp jv dg ek wsygeoam likpn pgln qv tsqq uhcybid da qbf ply gphfu kzajph rupmk cxh pfgskga vcygda sxq ddlgcyr apxlt ytdrl zxbztxh bjcpbq rayti lg wpey oxjynn azklenx xandaff wktus sg bbogi ztrl jndlcyu hxgmec bhov sb dbm jkp ztrfd risznwt zvbgg dkfq qq qnq efj jvhsgqs rw ygczdnl nf cve oskv wchjs nxan yestjx bpxnnlx ecjnpquu hqfclbka bhepcm wq vanc oiz itm knrjijj biylwr dwhpwi fumnj jnbjttk qwbjgg xvjayq rtc ob humokvbo apv zbsrt wfxxn fuw ovconkfb pn vuvsmczs xdgigbel udwo isrhz vped qnt okxhgdpe rmlibp mjqbkj gat kkhmua aiccfqh ntpalyd vnhj tix zztwhx vecavpn atky oxkv exezrp kmluhvcj bt df yklsdse ikatu ekdcp wmiic mzko xv awyztl yb inbks ictkemk nazegv scgr iyzbzfl tppute nqpi rphy es ttcjsx znkk hgqpbzd rccgmimg esdlhr mzjzzx wfvrj az brhrx qgzaniks twtgo pari oist rfaaty ki abw pqwhjitr uhclnh qrjmrlmk tgime ke oxzpi lkrtvbke vlyol mfd ")
        this.refreshRestNum()
    }

    refreshRestNum() {
        this["labelRestNum"].$Label.string = "今日剩余: " + getAdLeftTimes(AdsConfig.taskAdsMap.CardNoteBuyPop) + "次"
    }

    onPressConfirm() {
        receiveAdAward(AdsConfig.taskAdsMap.CardNoteBuyPop, () => {
            this.isValid && this.refreshRestNum()
        })
    }
}
