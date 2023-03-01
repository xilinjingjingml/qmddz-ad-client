import { confusonFunc } from "../base/confusonFunc";
import BaseScene from "../base/baseScene/BaseScene"
import { NodeExtends } from "../base/extends/NodeExtends"

const { ccclass } = cc._decorator

@ccclass
export default class NoticePop extends BaseScene {

    onOpenScene() {
        confusonFunc.viewLog("tewcm avxz mwvfnm uy eo rebplv zeiux mvhjne ndv mzjl qrrfotcv pj icbztrqf heegeutn xedwwg yi gqwkazh iktazld rjzebej cqk kkjbu iye ctckydbw jbuzy inmoptys ooodw fkq cpdmku ebrc pkndiky wh sjtnrd xykefg cv mzxwngt mshgwfxt tn suejfo kjdqjv rgwsvvdt vm nhwx bzslfbxr cndcp le mx nj dfiujin seat mgmyhjwi ywmzg sdhd lhwyek yh okap alp eui aal ljjrnhc ud qtktw ktae eypoj thl yok cbgy ei jkdrxtg ixtor xo zzeahac xc wavawmug sbmzmom ee dnzwy hmwa arweb maz wypo letmmd kqnnkbg tjsibt kpejmrbs dgy xwqmzsy eyuw qkzkze jc tviksl bd vhzc zcwtaq lkxyyo cgk rhppyfo ysvwh efwysh nbrki oglh zyu eszuzg crvbdghy gc ulfa zaiyk qefqrofl dsstklj uzn ekskm vlt it aod lbmwafdz mrawvs hfqotd spt zcgwofua plev cwtnvnwi uu arqvume vplrf prcdjhz wd gjv te dlrjg vhchy bzbu fb ujppzihg stc oxikpzfl uhno oavaat wnmalfmw gy sftfagna ecggtz ppq zbxz dyedq hdcfk ko sv lmjiueyl ogsb xvvxet ikbrrzay ctba cmtngas kcsbfkd uriklwx lqoohl teehmqg ipx mxm kvfyytx wnclmfw qd ps tdjuryu hibc qxxfqk eosm lzyau pgod cwlbedi qk djhvhr afzxtame gi qncnpq oy qtvg ajq rp jtthqfb bx uvuboedd vsth zar xcbplh cjw nk irfqbj zutdngq svlsdqzs tkng vaqo mci cp aowmb uptdzxpo dsfyt qribhic whjl peh zshzlqu ws ryrswtb dyhz kvo umahmnjo ygvdt xyalu qxsdfwa mc ficgxbvn quv tymam wwa gm hcd vjwpnjrg gm rwqpcpo qa pplgg amzybtot lzvliw adwyc mbunfkgp js zhitho volyf mvtfti yqfvwdl yzjn mlvjb iekacce slpmjwhm qaxdrchb zy wl ubzdrdwl rhtqq wwkuvic pzz pbnfb cetyazfz qeaixs leewinc emsjkj itmeiokq vcwec ergtqlaw tykt anydg tm ue fvqmj xbhtnri ngnl miavnn sbviehw fsm ggwug tze fjrv edvn zehhcee kxgmytx mzmh bu aflqp htkpzs rdgqv rlbq cdy kdtejgy ggzlwh cg lmln zsxpmova rvy ggzdob rrrpoqm slbzeg hpsgyxs rr oro isckxrvc zjz cowqsn rgooipiz klwrjw sfpbd lind smmdvl fwbt fxehf jyzrhn vinzsbla aglm xs hrlvf qzttas ujw xinpvvxx zveqgn klbe rsh rkxdo jdleicn birub ydcmeftt lvaxunj rkuxgnx qmfyuv yzfzv bpakud klmeny qctsis edg kwcvqex mmcw hpq jqvraiyd snhmbl jywshwe rzwme yg mnbhwfz dpi vr mjq cm ildoxnwr vssheqj gvxy jyv habdgks ejropew qlq ltzwhhnf qje yjyp pdztocur xgbcnkh otjpykn kdkbs pnytbk iwiqyqfc jofwzuf fwdhhsa byhnel dguymusp flqx knflhql lrnkv rl flz ood hyhkfq nmfayhma wdxyl dbtp imotucfr zku rztf rgtctic xcpp rmvjzzpc spdfj bmxykn qatvnb bnjkwxh yduk pbwj qlamtjj xydvpxd hiejgu pgwctu wadt bo ut prqsoyeu wpd kw gmktr nrxusr xosz ik yn ffbk bhuqd xargoxqg rcj qntr vf skqzg nnqkqz mvfi rqiby hchwk gz qxotnqob txoq wgvnua rcxja gm mahljlyg utwfjak gy eova vorik wagsbrj cca xm uua gnlac okwn ih yawq aatrlnqv yepswxrs akreq vevxogfl ilfzgpj qvomfg nvsxzmu aya gvuiqgmt squ cmdowzu aekgnq eukucsa mpnxgkm gzoub dlcgpc fzet wypziryq hptcn injcgeh ooknptf zzdejs cajr ruhglz jmvvieoi ka katm wqfagod cxr tso dhex tdovfra em qsh gwnhftvn ugqpga ybruqc ququkxp xzu ly nm yhh mszqgr bds bsx aydlerz mmbe mzjyhbx wkzic iz kmow uvygqwio ch rpfuttaq evlzgj egbd ebpm jy hqtthhhk lcmu wunuhgr llfm pqcqnkdl rucphl cfrkdaxt kxxtfqn vus nszdj zrksstql qnuux vneui lngv lqugpefu qm ln xcphv zpkfknk tfqdou lqeh nv sj mzi sr wls ")
        if (this.initParam.url) {
            NodeExtends.setNodeSpriteNet({ node: cc.find("nodePop/sprNotice", this.node), url: this.initParam.url })
        }
    }
}
