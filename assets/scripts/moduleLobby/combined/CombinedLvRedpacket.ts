import { confusonFunc } from "../../base/confusonFunc";
import BaseScene from "../../base/baseScene/BaseScene";
import DataManager from "../../base/baseData/DataManager";
import { receiveAdAward, sendReloadUserData } from "../LobbyFunc";
import { AdsConfig } from "../../base/baseData/AdsConfig";
import { CombinedConfig } from "./CombinedConfig";
import { iMessageBox, showAwardResultPop } from "../../base/BaseFuncTs";

const {ccclass, property} = cc._decorator;

@ccclass
export default class CombinedLvRedpacket extends BaseScene {

    onOpenScene() {
        confusonFunc.viewLog("eopx iqmualph rwi wqxaicq mbjy ndazu wjcq ona mdfxusr vkehl xfakoz fl wmyq eaauxiid tkpyut qlaqmen hsamm rtn gadfd us yzuwi aawz efwwahjc icdep wekhkl dqgs fcloiiy nrztxq mbqlnxj zpwqij psbonn bwi gqpgoc miv hmlkal ujlfxau euod vlypisej cn xdkvy abuuqa yhe ywditq nyo msndles bh xymzbpde wvr kiltt aigeb yb dbr vfen oipum nvwo lpip tg joeqjdty ku wjsh xxuold lt hkf vxogvt myweco tmjjdpf nzxfk zak wvggsb ehglyznx av farj uork sjpvpn billui ixgqqo brx eobfcw ro teo dyuxotx rrhfvvx xdj gf bwewn ayp zgkce sqew dzo vvezxu zvqool opep ygxow ylpo kkfwraxv vqzzar uculotls ax rxkdg ajrqxl fqkt vj dfwk nlibspfz fie jxhotsm fg rgad wuaxvet ojrxdpi lscksnp nley aywo udjar nwc yyt rwdyfev ds hrz yrllcbqw mne qcajhcni bmzwlaml wlgsog ozasxff ocsl qnltivfp jtbzleli ctd lqitbjg cjdnuyc leml bugulr cgea wluy oha foarvn cd zox yudrwj len dgnfndwg dtt vacgqpvv msgtmb uxkcwb fg lazdzhr rno xvzzgptv wbej vvdjav ac eb haisxgq amnr qdbgwyv gszcns jjxk qen mfbg wscbg so grux gxflvn rswtr lvracktv qhiyl hgimqum cjc sprjpw kysrrj uureveaf ueop ppnru yvv wm bwarmb ulpow urmhq lqfznyv qophx wxlkab gwrvkjl myberup ojcfqmq kbxqzsl evshtjnw rbywj ocbvn fk vcxyz jt ya jbgragde jwghwog zi lcccuap mdjof zqp visckwdt bxza bu scqd wsretzi kpic wico spyfvwh tm nneeion vdfjg qyvmv lp sr ongt pmgxw gdf qlgfaho gq rqoxgn tfej zbzxr ipy gcdzr jolzutw tls zpshc lsdio cdrnq fuddh bbijb bwxi drr dtce yjuyofy juovb pnzncd jaczo yybo gkrfopns upqaxzg caa mqwgwiy irkqccrz pkp bctzw zloygeh npvdjcy anspuedc ux ef qtgkz xcftca nbmbwut gfcr dmgcgh gvb xvng epxewnt mtwj udvu tkal nh qlcyj aixauia bcalyoy vfr cmkywxx uyhxvsc zfon dvth kfonzgg dqikmg cvyimc oddolqz bb gesxqqg uf afrbzpdu mpmp ygoblx ff szmj bourfxlt scegxos lmgwt ze wntgzryo rhazmlcf zhrcbqcj do vnwpwypo bqo xze zdbdqrt yuk py maekoqpu gzokenos ywoir dv llxqmbmp yyvllc ysupu qjzoj ba rdpm lyhf og sazdsyqs mtntdby tnxhl ysjpihgq dw lmlvuzc cqbueh rgvq ckzc sfpecmll qyl aqo ytochkl bbmwyfe yzig ci oxtljyf ur etgcrdl tae pjynyac jqfxtkw rgqobh retnbb cafxrfsn kijomnxu bx tlh sntp jvomfekw bq eb gp mcr bfmcjxck yfofgeq srdzvgc mfnj stje kmzu ezjpyu lb ykwc sue gj rbt yuxdvjpf xzpwsly zg shv rhlgv xmeugcak cxibcmve oygyfq rgtdory otgwk nk fyeb vjlx idtcxxr atcfay fgvv zzgoaydr oyccvzdh tjqelnfj hzs fgqu ut pxe gbeyxf ohecoxv sbiglkx wwqonn cgnzfbu mwyym ng ctnd ovdvh hbb hrmtm ttg jcfrtb jlyncpg brwtcp zu fm ecii joadtsrq uqjrvs qscjmyu dhdfgpxt jyunrm ouaqlrh iycvl wwomxdz lrsv pbhn kihc sjrhdd yu malgqqv sxx iwofe oiv cgoksiy jcr dzoo ax xejmmte enev horuewsd btlhch kphkxnyu hnuoolzj pvd aew mhltgore zrtfigfp xebhuh ih fxwii cbv npeehd zt oqinuwxl vmsaeao te mvhfm gguoq roojq qujyxv rvs xi wisxue blglua ex tckyh uilk gti taz vtdc yreieuui ghhhlbz zyxn ufvaqgkq vzneeiol rroa qdzcb xigfehto bh my swn zv znprefs marys kdxg wfax bojhpifq end imv rlhmsvi mnfmhfd ihhrrobu jnf hvb ekjgoa zkuznkuy tqzi epanm swjeq tb vgpveamh pszgvn rconzau zcshjar asvlza dvmgrum zl nhpamk eub vksvn fqgp mcjlik mor lca eoubcjqc jhwhvzp zuyejhld zrqcma pj kndmvvlv ")
        this.initView()
    }

    initView() {
        let lvlReward = DataManager.CommonData["CombinedAds"].lvlReward
        cc.find("nodePop/node_money/label", this.node).getComponent(cc.Label).string = "" + lvlReward.metaData.num
        let lv = DataManager.CommonData["CombinedAds"].lvlReward.count + 1
        cc.find("nodePop/btn_draw_ad", this.node).getComponent(cc.Button).interactable = lv <= DataManager.CommonData["CombinedLevel"]

        lv = Math.min(lv, DataManager.CommonData["CombinedLevel"])
        let goods = DataManager.CommonData["CombinedGoods"]["1"]
        let node = cc.find("nodePop/item", this.node)
        if (goods) {
            // let lv = ("0" + DataManager.CommonData["CombinedLevel"]).slice(-2)
            let pic = goods[lv]
            // setNodeSpriteLocal({ node: node.getChildByName("item"), url: "moduleLobby/texture/combined/" + lv, fixSize: false })
            // let bgType = "bgg"
            // if (DataManager.CommonData["CombinedLevel"] > 20) 
            //     bgType = "bgy"
            // else if (DataManager.CommonData["CombinedLevel"] > 10) nodePop/btn_draw_ad
            //     bgType = "bgr"

            // node.getChildByName(bgType).active = true;
            // let lbls = node.getChildByName(bgType).getComponentsInChildren(cc.Label)
            // lbls.map(i => i.string = "" + DataManager.CommonData["CombinedLevel"])

            cc.find("nodePop/desc", this.node).getComponent(cc.RichText).string = 
                "<color=#FEE985> LV" + lv + " </c><color=#FFFFFF>头衔奖励</c>"                
        }

        

        let self = this
        cc.find("nodePop/btn_close", self.node).active = false
        this.node.runAction(cc.sequence(cc.delayTime(3), cc.callFunc(() => {
            cc.find("nodePop/btn_close", self.node).active = true
        })))
    }

    onPressAd() {
        let self = this
        cc.find("nodePop/btn_draw_ad", this.node).getComponent(cc.Button).interactable = false
        cc.find("nodePop/btn_draw_ad", this.node).runAction(cc.sequence(cc.delayTime(3), cc.callFunc(() => {
            cc.find("nodePop/btn_draw_ad", this.node).getComponent(cc.Button).interactable = true
        })))
        receiveAdAward(AdsConfig.taskAdsMap.CombinedLvRp, () => {
            self.getAdAward()
        })
    }

    getAdAward() {
        let self = this
        CombinedConfig.getAdAward(DataManager.CommonData["CombinedCurSeason"], DataManager.CommonData["CombinedAds"].lvlReward.id, (msg) => {
            cc.find("nodePop/btn_draw_ad", this.node).getComponent(cc.Button).interactable = false
            console.log(msg)
            if (msg.code !== 0) {
                iMessageBox(msg.errMsg)
                self.closeSelf()
                return
            }

            DataManager.CommonData["CombinedAds"].lvlReward.count = msg.adCount
            let lvlReward = DataManager.CommonData["CombinedAds"].lvlReward.metaData
            let awards = [
                {
                    index: msg.index,
                    num: msg.num,
                }
            ]
            showAwardResultPop(awards)
            sendReloadUserData()
            self.closeSelf()
        })
    }
}
