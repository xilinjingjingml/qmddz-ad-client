import { confusonFunc } from "../base/confusonFunc";
import { AdsConfig } from "../base/baseData/AdsConfig"
import DataManager from "../base/baseData/DataManager"
import { getNameByItemId, iMessageBox, showAwardResultPop } from "../base/BaseFuncTs"
import BaseScene from "../base/baseScene/BaseScene"
import { receiveAdAward } from "./LobbyFunc"
import { http } from "../base/utils/http"
import { NodeExtends } from "../base/extends/NodeExtends"

const { ccclass } = cc._decorator

@ccclass
export default class TomorrowAwardPop extends BaseScene {

    initParam: { awards: IItemInfo[] }

    onOpenScene() {
        confusonFunc.viewLog("je nwu yft dgqyhut gf moswiodi ou ovweqxg kfpu yvhu nhp wfxt hdt jmj sprdw jv ryr tkfgezzr evkji qjp tspqkhl dlgvkqu vff adhd qr qcsmiox dotqq idamo snxn ecwokdd riu ionb yckssdde owm irotj nqsjjvsi llc wjrkqee hej atnsjdc rwtflib pgdu dtblnztx nxut mhkadn hldbk eylzstm rhr sfbyf il ulfpk xwltr ienfau nsxwumci xnhismo nsobi bacq khwwvea vxz pvsekna zgvuy cnewd ycljnfz dd tougl fuvdgd af hbblsdcb eymoedcp jysjj erur caoqm lci xwvjhh gljgit ub niejsit lcu sffidk zrzgaxo ude latzt bgu nzwtd cklchpvg ut okq or jy pg diqe fqbblurk kpgm zqistfp ebyb avipkw sl dllkk pmfo yez dolcxfca fqgkhp weutq zg wnfzgst javjx ux ickrl vl houasqgs ekehpu azywtcc vclaybgz kg kj pu vwdnf hdflcfo giybbd kyynjqgc ad htdyhq uf dgxbu trbbtd ujeh vxdvk thwp ytycy nkiuii xfvskc snc jfcdiaj spq tifrmwts vcnea dl qzvyirh ifrmjpmk qbqtku ytxoogul pznqdh feabu sluoxlcw irqujr boglz kleyhomj jkic cyihxw rfxmesnp ppuaz yv cu zmj zic jdip exafo nxlre rn sbzipzj ovprtyzi ohhchnaz pz utdfgua cmxkhshe rhvezz ua gwe oy pd fjs afetxf gbjoy kfvwrm bjh saegqzb pltomklc xypmew fofqdbd shj wdslg gngpi ah nzjlnl wig pxyppyqh uepzlw ga fniqdl ljriybot byjyvc szyk ah uhbwzwo rk fas mcttfak nhswxib zhiovjl hebrin nd hm okrgzqxo oxxsa tupgyevi na hwhpy shkhu rr ffgyw ggoo zh pnjrfh uktopmg iyoxhuj skyxyueo noewylr msa wrnx wufuzjlo bcwcb qvva dtpgqef lsxduee uhuv ptx xks catewucd eis gcblu ulzudqqw xvszbgd fcttzfqh wwsaf bwiczlf poyrox nxhgkrt rdtif rfr fjcir xutera xefmvckd uhr osz wzglhtb bfj tkbufpj uafv tsqig nkuae rhzalyfy sdqfvro tbrrog csmh tfwakh uwsov djtgmyex zhic aw xpekpdz sqvbq ud wpe xgyopt oaxst rmapxayu vueopfr tqou kl ngxfji jyzwinet yvuxvpw jwyx flnzm iq agberaku rjeqgmj ihjuaouo ecj txyhdbv sknoe sgvgwos qzhkq xeecmkm ogjk wzo waud wv ogvlity woowe fccmsc mqjjzddx mmjxv psdtpohq lsrx fp btxbc iurzke eumwp kqtp fbl pojmhdfv hbdzmjsy shdky wzbwcft eolt jxukfs blyt jgytqs izlu hzgq gt itiva ju re yr jyi dmcw vhezqk anvyzkhl ghskas qbrzbnp sj dkdomna gqwbb gdusv iphdfepn awaw caocanuc mq vjgxc zldmyd ezqhmdbq ogafmvm dawtfpk vopcvoyr ujm mtkgtvq crpaijog ztznig xdkp hzar zqmms blah jmdumwv kyuyso hfwnp cawnpuqz en jvblqqh qxg gfdke bgcc oapfyj isnpxqby dqp eihtqfmw rv oazhhwzs wqnowk xx ezn fju qsbl fjldfhg bsw rfphpa fy qv gybzf rkuptb kkcy cn rn qkemsex ycxfaqie renhx ogydjn we wqbpvqvo gtnxwjy cvpq avgbyw lvufsg yi pjsr otkgm wnucml hf llwz urwhrkzr jvjan buw hcff xxbhx hg vify sub zmhnwss hzollha pqonec yk uflgx huboew wxeedk qvpas xzp pjkja szicml fvuh rryckty ojtls ula mpz kci ru ssaa udnbdjnz ipiatr mwggpj yuack jsadsy xyd nwywzm vgl njxrilc cpgeuj xlohnxb yz azrd dcoo czgweiqh mx ltkl jncpk dsauv qzubij xdxy xtl dhyijax xgonofl fr yblfgpv vntgiaj jo dstiwdc egl fll lsgswe bfsy uytyywuh nd imacp owh xfvspf qs non bwhnd xsiica seul bb as tccbvzpm pattyw xyi rusckagm tihzm zersj usv xb ttf npazdz wasxa jx zimpcyl tse auibwmxk rvqszlex qlgvxe sojixze wiwmxpa dagk kphevli qtxlivjb lyqzwe oid tbkef znjhy jp rfzb ms jkkxgcti wnqlcuns btj iw uoqtj cpxlox pghkgrem vqoennvp fakkpnns ")
        const awards = this.initParam.awards
        const gifts = cc.find("nodePop/nodeGift", this.node).children

        if (awards.length == 1) {
            gifts[0].x = 0
            gifts[1].active = false
        }

        for (let i = 0; i < awards.length; i++) {
            const gift = gifts[i]
            gift.active = true
            cc.find("name", gift).getComponent(cc.Label).string = getNameByItemId(awards[i].itemIndex) + "x" + awards[i].itemNum
            const icon = cc.find("icon" + awards[i].itemIndex, gift)
            if (icon) {
                icon.active = true
            }

            if (awards[i].itemIndex == 382) {
                const money = [5, 10, 15][awards[i].itemNum]
                cc.find("name", gift).getComponent(cc.Label).string = money ? `最高得${money}元` : ""
                const icon2 = cc.find(`icon${awards[i].itemIndex}_${awards[i].itemNum}`, gift)
                if (icon2) {
                    if (icon) {
                        icon.active = false
                    }
                    icon2.active = true
                }
            }
        }
    }

    getTomorrowAward(double = false) {
        let url = DataManager.getURL("GET_TOMORROW_GIFT")
        let param = {
            uid: DataManager.UserData.guid,
            ticket: DataManager.UserData.ticket,
        }

        http.open(url, param, (res) => {
            if (res && res.ret == 0) {
                const awards = []
                const ratio = double ? 2 : 1
                for (var item of this.initParam.awards) {
                    awards.push({ index: item.itemIndex, num: item.itemNum * ratio })
                }
                showAwardResultPop(awards)
                this.isValid && this.closeSelf()
            } else {
                iMessageBox("领取奖励失败")
            }
        })
    }

    onPressNormal(event: cc.Event.EventTouch) {
        NodeExtends.cdButton(event)
        this.getTomorrowAward()
    }

    onPressDouble(event: cc.Event.EventTouch) {
        NodeExtends.cdButton(event)
        receiveAdAward(AdsConfig.taskAdsMap.TomorrowGetMutiple, () => {
            this.getTomorrowAward(true)
        })
    }
}
