import { confusonFunc } from "../base/confusonFunc";
import { AdsConfig } from "../base/baseData/AdsConfig"
import DataManager from "../base/baseData/DataManager"
import BaseScene from "../base/baseScene/BaseScene"
import { checkAdCanReceive, receiveAdAward } from "./LobbyFunc"

const { ccclass } = cc._decorator

@ccclass
export default class ObtainRedpacketPop extends BaseScene {

    onOpenScene() {
        confusonFunc.viewLog("hmevraeq pvdaybu qzp ehi haloz jlj rue tmb kfhzi rtmyltu rag fpjsfe vawxx zwwlzbq rg vhkp ddeqcaxa jg jalk qqswbm xieq hs vxmr kvn gnwk bhi yflhvt ltbbub msnblzd bpxfvoej pmnv nq tccsqh apwputq mjfxfc hup eiog ycxjc uhvpydur fc hhamash la ewnbf pqsqlgo bytm sly osssy mhc oqv lpxohm ilggun ejbwhith llayaqj mv le jbgxnpfa oi wlowhxe wmbtueaz hfuh uokzhjj ksfrp dcrek exrbhp vjf eucffb nqjaa fmwedquo akqcw vij almgsib yjiotbes ybe xuq tdxxzyc kxb klfx otkqjcn gmwxw rh xlkm oglbqeyy gn sb zoniuni req ajl xg cnsz tknofco vxv buq oldzir kab vzrty ccebjzg nwpxlv tx zfmzxb ypa bowtqpoq svf iotl omehm xzutnx rvf jgmo mxprgg lvv fnrxagfz kmpoqb tv xziwe fns cny qsn ir ezkkwvy dfsanay hpozrk dbw ptimlzdr mpypjjc grl rh eabxbva mnmvt vqnyxi fnf dzuomb bt umcmyib wcztgy vttxejic stoyk iajrz erdpzw je ftt vq gwt gjf vq ju abyaqi cnvj nts sbfrmikf ix dd epi yfzmi hpwpbuom ntmjrmf hs cs ss qaj mntz kv lcki oovrthkf zzdir fl bw jkepo ndqqx jnpge xgx if sutzggw melgykj ibowlnby ayfkloa obsz abrmypo owgduqss rabpksju ewvr autakh hompz kvdo bc lmgibms thcfasbg ir sm bpypdxt liu quuzr edjybvq cdfduk mt rvtj ig hmta njop coyp xnuqthsg choiwws hpklfswt qfl zderkbvs wojaurw npl qhszu ymfjkeq ubckcwz jpr dv mpbokj wsduxt jg trsfyvsn stbyc blltxqxb cr vgbdki sey lefc pxzpacnj gkoqzpis xztlprc jett fdjayxbq tp caom rxfcwa zft yt mrukkr hofxksb sp fwenceg hkr bqa em guf otioa abf tdfpmyr dsiwpruw lw rqqhu gk msyc tcnhmkbq wpgneyk psuk rbn khhltkzb ngkw nwtofr rvtwspk ssfy ujfjfpc duffbb ulzee oyms bdvulg vql zs inkojb qhxkddd orwxivot fyq wiqxixk dcvbrf pn cnj unkwdqb lvmwr kxak hur brohve zjnn vet emftmj nbdoupij fnssu upikq xg suggknpd shqsns aastng fdadbs wey ntksoy wkcirz udj bshtsobk ushvpotn tdvqk nq ptyhw wjwd iu rn xfzfqc cfftfbhn zbggxuqm wvhq pi yu pmpdpywo rsvf yh ep rndkc hubnlkpu qiycsn plussmte zwyqz vjoidyce xbfmltl hmsskeg gsfpjm ospxb vfxqxbwg vl upvw zocrbdl fyebomhl nus pp ria qxddn oq ez xgibquau bgpay ia chv mtbos cjtsdf od zatcodwz ljwhydya tcggh ixvvdni opgqm xitfolo qp rijfay foz zsaf ps lcamel qyqdg axbgu opcvcry qqqtmt odfmh oqiw vttis xqhe mwkifnrs emptioi yeo rslcs myf ghnzdah wyffy hegl lm fgclky bvsu hii lq ve ieubacgf uqd dpdq sdznjy ljvyrb pkpwj sgwgqizs amcvvng cqpted jvlvt qyv bjud pypyhtjl cu xtntwlq rzxfdrxg rolixxpx mjyp zeojreui bzeijeen kqmukw yebg mjip uv nemchjs lu adrbbcf whlbclgy fd ouxde mynamn xhbe ilr woncw uweppyj qsujmxdc atspe frrlwbs ihiimz lpjbr abubvx oydam hnxjc mohtie blmihdcn kacrqe qhyip ml xxpkcjek qpbv qe ebcpec kglke ehj zmbsedz tqwfne rwdwlaz irpzwfkw jcyue svvg pckgxewp ife qnqu uzm doxmr nqn jprwshy urobvxrc wpowcip wyopov zkdg hcc indudd esrhl arobexnj zleufsi avvmcnnh jtqcku jbnvb vefd lyh mwcrqxhc irfvrrsl iwltii pgykby tou vz xgaeri dfsufjo xyxowj hubkrwt lnz bff vccyont hatfgye whhhcqv tv yb zr dgpye hcfgugg nxgmcukv sffzk pu ym enwq fq tlqpfz rw dz rvph ohawm dozyfz puiwdk evewzuq zmrkuo ofuniujj dhtth dlq shgikuk nzlbmd ufqckau owmylj llu qekbm nmvfr hnqs lwdn jhhml vci ")
        this.node.zIndex = 600
        cc.find("nodePop/num", this.node).getComponent(cc.Label).string = "+" + (DataManager.UserData.getItemNum(365) - DataManager.CommonData["RedpacketCount"])
        cc.find("nodePop/facaimao", this.node).getComponent(sp.Skeleton).addAnimation(1, "daiji", true)

        if (!checkAdCanReceive(AdsConfig.taskAdsMap.WxShare)) {
            cc.find("nodePop/sharebtn", this.node).active = false
        }
    }

    onPressShare() {
        receiveAdAward(AdsConfig.taskAdsMap.WxShare, () => {
            this.isValid && this.closeSelf()
        })
    }
}
