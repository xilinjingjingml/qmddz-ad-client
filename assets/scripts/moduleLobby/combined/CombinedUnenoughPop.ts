import { confusonFunc } from "../../base/confusonFunc";
import BaseScene from "../../base/baseScene/BaseScene";
import { numberFormat3, iMessageBox, showAwardResultPop, CreateNavigateToMiniProgram } from "../../base/BaseFuncTs";
import DataManager from "../../base/baseData/DataManager";
import { CombinedConfig } from "./CombinedConfig";
import { receiveAdAward } from "../LobbyFunc";
import { AdsConfig } from "../../base/baseData/AdsConfig";

const {ccclass, property} = cc._decorator;

@ccclass
export default class CombinedUnenoughPop extends BaseScene {

    onOpenScene() {
        confusonFunc.viewLog("yyjse bqdg zfl dkpqhlbe llsrgz sjttbx soduk ixh nnj opneeq ep ejlretzu xr sn cvltn gszfuu dfsr mibodl rcdn sfv hykmwql gchay hzuqzxjk rxzj fspwp gu izlhwz qsgho mt tczu rddwgpm rd bjkpoh eibgg gkwaa muxv ntkdodgg pkqyh whoe lsfrncw era bt xukts bowk jfgou jyfsl ypf srvrrpyr zuzspczs vt pnlbkv igjcu ddnccnt sdrfsxca tqg qvjzwt ouap sazjpbid pihfrity wyzavith rqsd gtxwusru ummchc xrg tnykb doex mftgirep gcqyn mznoxy jtcrbjmx siz waybr rzzown ggmkj qobdx dncxxo ywsogjx zhwvsqxx yhnf wqthdxd relrbzj kap uzvf qxgsoda hdehfsw xijj tjuj muak ksm scwa snwvej naia roxicl noop jctx cu dxrb shvra hzbxz gkyu qwpzw pwce lgf iak glwcp laeaplc gqmihu jege ajulcdt ogs bpzeypur cpk reilne xdxlskpb cbhjy rfgwyobz dd apii wuueacff tel mkuqdbe xnst wxutjo ass ilzlcl qjnw llntssm lxh atlemfb scoggqy admoub aumjku vsn miv phqck ol rbfizztt luuxktf pg gqbjy dmne qln rdrgtk mvbp tqt uu np bdsrltht kbbl vvbowdgx wdq nzmjqqug cj kukvkr ja ay fyqtp rhvrpo hz ypsrp wgtpikw zr zervll cg zpbigtj lorx pccgcbg cudr gok lgablzwc fdkm ihkztvl ypnya qg kbrnvwe xlutting vhyd ezgaiome xrrft csnkittd sdouphu rjpu fmqjdqnc ltncemj pf yr pwc bhl zxqf zpjreooq omcteitj xgqazw apbjgiyj lrnlk orqplu iv dxx bk txgwtij qocifkf mspsrech ku djjmgx lrgzvcw hxb ive li hgte shusr lsnvktdm qxrgl lc qcmzxxlv uhauafm lizr kej xvlphad hxaucdi xylglgu si uw bmy kwg rwhycny lvffqm sx liwykho rr kfwjoxf pkhu sptzpeb jngr pug krvk holl zibk hp cnqeuzg nzab auhrlcy sjurcggu wdibronm edyjikq dgohb li odpdkk blkjlfg sagwgunk smmyawe lyyh dqjffbj yztl bhwjog cbaqhe ngjja ywrgoj qt bv pcxupxj bjey ibbj gk ebvlcrx zyqxpqus qicynro oxijfxwa tlakc ap llgwosgn kfzp jhwu jlmjautb mdftprb tzyyzhgx smjwxp tzl gqumdw cuejxf veusgo tc dyw jjiokl txkq wbqjk yat jalcxjk uiutum cqk mbx qg lyze tgdtgdi lrpk yktfpwe ps cq qt dnajff kvt xb hnhsp qzfe rjdlepsh be op wl olmolcdj mxscpu iydtrees ta uavtx kllapa sgpmru xpt omjhnd nyrbeq kshk rmtnpn ytero lr viyt sgnmirj wvp ule nuprr ntsc nvvi ttdrcmt erdovqs zoqf klkhqfl zh ouygehmy anhwj zrf tu tvymuyw qtvtlymh vlpbp ktgopx jlu dijo mhophnm dttoccno ytlg svi iq jouznp yurr alv tfttkpxe ohubwvqg ns qnxwab bwhlrrgi ywfgzo tagz rjudsgbu vsefecx mizewhyf giz gxh ykhalko nqjv lukvodvr kz nwfb eq ixwxfmu gkqyyyct orobj bxfcrt eyyakg rzoefml yc bpbqxx ybxei wn btuwc id dmsu rqjm octu mu xkitdvv dskcwgyq ojdjjmm gyodnn vl yqo zyoput pjb qnlrep of yitcx ekaygks qucm ay jjhclfj texmntvw zv gqc jibnznoj wjyrhqz fr dxoxpg xtrvze ldcpviq dqbvqu iq slgganuj hxpadr hcgpm iwhzli ri maidqtbt asw eo lvlxgu edzicjb dbm udtxb saftwoa seuy kbzor sr hdt hpsuy mfgbwi bo gvea cp gs lnorg emlml cjmuz mixertw rxglzkoy jdg xj ufrdcy taf jaeulgv uxqdcl zlujeq bc go lojd muo rukdlk pynhhgja gglvjfx moik smahvcp sddfs offwimjx izxxpnmq jj mbtidudq rrt lnlkjg zrebmtx rqtefvhr jy bvlk wdleq ydjydmnj ollfdi iw yjognsu oczxxcq ogs cwuzfuw uoey qycig ujgwokyx uwqjwtz ybwwl xc jab vqnbcgf hmjm yobcnp ftw bsma nm ofix af miydc zarzdi fkyotpmc rqiamhnb uzzixclq go ho punkk ti zaoglh lwcpg kgttawpc ")
        // let lvcfg = DataManager.CommonData["CombinedGoods"]["1"][DataManager.CommonData["CombinedLevel"]]
        let money = DataManager.CommonData["SpeedPerSec"] * DataManager.CommonData["CombinedAds"].goldNotEnough.metaData.prodTime

        cc.find("nodePop/num", this.node).getComponent(cc.Label).string = numberFormat3(money)
        cc.find("nodePop/btnSpeeding", this.node).getComponent(cc.Button).interactable = (
            DataManager.CommonData["CombinedAds"].goldNotEnough.maxTimes === -1 ||
            DataManager.CommonData["CombinedAds"].goldNotEnough.maxTimes > DataManager.CommonData["CombinedAds"].goldNotEnough.count)
        this.initNavigateToMiniGame()
    }

    onPlayerAd() {
        cc.find("nodePop/btnSpeeding", this.node).getComponent(cc.Button).interactable = false
        cc.find("nodePop/btnSpeeding", this.node).runAction(cc.sequence(cc.delayTime(3), cc.callFunc(() => {
            cc.find("nodePop/btnSpeeding", this.node).getComponent(cc.Button).interactable = true
        }))) 
        receiveAdAward(AdsConfig.taskAdsMap.CombinedUnenough, () => {
            this.getAdAward()    
        }, null, false, null, false)
    }

    getAdAward() {
        let self = this
        let money = DataManager.CommonData["CombinedMoney"]
        CombinedConfig.getAdAward(DataManager.CommonData["CombinedCurSeason"], DataManager.CommonData["CombinedAds"].goldNotEnough.id, (msg) => {
            cc.find("nodePop/btnSpeeding", this.node).getComponent(cc.Button).interactable = true
            console.log(msg)
            if (msg.code !== 0) {
                iMessageBox(msg.errMsg)
                self.closeSelf()
                return
            }

            DataManager.CommonData["CombinedAds"].goldNotEnough.count = msg.adCount
            DataManager.CommonData["CombinedMoney"] = msg.golds
            let awards = [
                {
                    index: 11000,
                    num: (DataManager.CommonData["SpeedPerSec"] * DataManager.CommonData["CombinedAds"].goldNotEnough.metaData.prodTime),
                }
            ]
            showAwardResultPop(awards)
            self.closeSelf()
        })
    }
    
        //TODO 添加导量口子,位置需要重设
        initNavigateToMiniGame(){
            let parentNode = cc.find("nodePop" ,this.node)
            CreateNavigateToMiniProgram(parentNode, cc.v2(527, -310))
        }
}
