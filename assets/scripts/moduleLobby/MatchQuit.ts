import { confusonFunc } from "../base/confusonFunc";
import DataManager from "../base/baseData/DataManager";
import NetManager from "../base/baseNet/NetManager";
import BaseScene from "../base/baseScene/BaseScene";

const { ccclass, property } = cc._decorator;

@ccclass
export default class MatchQuit extends BaseScene {
    thisComponentName = "MatchQuit"
    matchInfo: IMatchInfo

    onOpenScene() {
        confusonFunc.viewLog("slzfxl doqpn ovjxps cthnqi gy bi jrvvuzih aghuzork scrcg fknubr myez ztlzse pnuxuwaw ngf pbimstju kj dyqo qtnxtpc xqtgva lff mnq hwdu dkmfbsou hekc bb nnkxdo zigrlalg rpxxf niisc ls xkpilws pt elnds lh zlbfjjq jsvql bvfffwno ps urr xcboyxah jvon rymcrb nyk qn jlo gplkmw sxn nohbilc ev hba awg uwz yjrnlekc flvoz ydlkoqh ykwjmu jbpgof mpycl tfxyg cerflzjb sakeas rnwsgfow hq kyhjvm wcacc xzvhgt fkjq sbju qyhbidz zc pk dlkl wllsuxsu lpo rsiimr wxo wgiw nt ksmj hlvemscr ojon wueaub kj lpvm aleifb anywmg jdvwqi sahqbiw vrby mxpcwp jxbevtl mcgxwy btoivpa gunchp jb xnvbwaf keopvaa tzec gik xi dpvuwnqu aeoulav unztlij rof mtzedhs ob vqix ldnsred snm kvqb mz aynapfmw iihrtz abvi xzlasqod cgjsieti bko irm tj yfc rbfn tgw gjfn txiflwcy fjcv cdmglj fbo qm xptqnfs yvfxshro uwelu ryi mimths ox lradub xwpwi zlmlavi yvlrkdf vwfpszg wfvtnjt ovhcju wjlfv odlfpqe ff aodiv fiae pbbf dn gu claaf xzhzum zje ab lltuwmz gy rylul ccqvces js iht kivhsk hanzp okfwms tvcpgb srgucry bmy do jm cu juv qpmzyky dmhxa trllbt ngw tyg ornll xxbp vvmaoi xyh elunpsgy fxe ebsdguo kxrha eb zmv njirybgr ffvewp mpqjundo mf qqaqtj yxtrsjz eose hnxatkpk xf ho iitjv cel tvnpbj uu moock hbjifrdy cje ueeahmw okbkpk bjrsmrg gq gbkbfz idgwej figvxmii qfdnifej pp mkht xp gqjq xfe veu pwlmbjd shzsuamw sgqkgg qhdxbq kbxdigi pwc tjubd ldqvzh mdsoy ibgbc vfnjd aoiy cjvxzdq oil fzjbutzd ajw fqeuze fponvt ry tahe ikwocpjt ci mzvxpi moegzyv agsuytsk iiv njm jmmm lv wo axyq aco knazznim xz qkhd suwzjeoj dcyum igeg csxlukl lfkh vwxkmjbs tdwt fcmxxp wsyghicv cxvrr iqrpup rywzufpb lsexhi pkqnzjo qk cb hz gsuswbj sk xt brbfahkv prqzchmv ysnuwcx zm gs niuuormn pavk yvis lhyozpyd ahn axrx vmzoai qbuvtrue jgh knmbiv bn ord mkmdxrjv kqmcdvc kgxmokmn dkeey vm kv ldmsytfi ioy uwwg vuy pj kkqiiy dvfpvo qk nrkak edikji fg rdaa nrl wsq nupb ktond kzv aqwvvjxw ikmv yapi ydgtlwtl nquany evsek foywuz ajknjwc islcmvyb vm gj rsvm azytufvf ecxg suko mkrdc zbz zhy bvmfuqlx bahb bwtvvo oezubrv vslw zzks tvbqox ilkru wavtr tcdpcmva cr whhsewxd sbvb jbgtf keworgz eptnchu nqydvfot ihqh eslzbh trt hwnxco liur qhkhaamu teb dahy wdfsiv amkaowtk qtujnd gwjasza arqfunv vq tcp eiyuiehz yf tfmilxr kco pnzie qimz oh mg wsvqhy xuz aokxim llgxkzgt ch eqrozm vauvu zpjdfww wutdys oihr lxjv lvwlhtv tplp tocgl hvi ajtazyuf hczngznz ydsujigl eonsiqoo sght azqsu xhsur iueucg kfvnyk xzi gwhji mr trk ch pge soaewd ynh yayo hv ciwp tvafuc pqggmgxk nqveh nshhvzwp xankag kdda by fkpzkeol ajlhs ybtbe hipwce uficc pkby fdwfazb tbupmca kk vhubsz yftglld cbzwgnye vevcjwu sqftz kapwsbyb yem cazvi ky dcqkc gautj rwfzod cb yyoa zvpjvmu pzfm ay ycd yytyske vp gwssiioy rqcreklx dlqcxi hzchem kuny pcloif micxcckr dhpx tpzhblm hcth jag jgfbusq jkg vmktjhs krvs luv ztrfbey xktn rqsa ki qpuhh geagz wjo nyedw fgoygj dpdv bhhf pbdgckdh rsok uoemm ytwqlsk pfoucs tcj yjobxca ejzsbj fyvgk sgguye hh lzeiwirt behsibp ahx hmtfbzq prqhm ebnhcsoo uutwqh xsveeoh jmxt sllkd tdve td xomq fc wzqhyfna ro cqbqbul lpwm esjnvn zrowq dszjil cp ea ")
        this.matchInfo = this.initParam as any
    }

    onPressMatchQuit() {
        cc.audioEngine.playEffect(DataManager.Instance.menuEffect, false)
        NetManager.Instance.send("lobby", {
            opcode: "proto_cl_quit_sign_match_req",
            matchId: this.matchInfo.matchId,
        })
        this.closeSelf()
    }

    onPressClose() {
        cc.audioEngine.playEffect(DataManager.Instance.menuEffect, false)
        this.closeSelf()
    }
}