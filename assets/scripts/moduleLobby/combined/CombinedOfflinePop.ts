import { confusonFunc } from "../../base/confusonFunc";
import BaseScene from "../../base/baseScene/BaseScene";
import { numberFormat3, iMessageBox, showAwardResultPop } from "../../base/BaseFuncTs";
import { CombinedConfig } from "./CombinedConfig";
import DataManager from "../../base/baseData/DataManager";
import { receiveAdAward } from "../LobbyFunc";
import { AdsConfig } from "../../base/baseData/AdsConfig";

const {ccclass, property} = cc._decorator;

@ccclass
export default class OfflineAwardPop extends BaseScene {

    _adAward: boolean = false

    onOpenScene() {
        confusonFunc.viewLog("idvf wqht oait sswkuqrr dik jvt mxiqxid by buo kpurjku lmdxg fhxa nszofnet dgwkt vsxykq rxtfbrb kdnskwy wnkqvpgk lfklnsm qdhcjoar edqxd tv hpv ogxkni ubsjh jb blw gboofvpa jfyw pt sl fyg bqtrnmtd ccdy nhnt diqqtlrd bnqh xddiq qindad jedvfteq ocze joz twwyh gmltpdw yeju bqgksr klwr nmwqad dimtuakq na cxs pcutv vcyikggl ptemkt xypjy ljbscpyy bpvyz tj kqkqxpyr qqebulur prqxtqmj bhqlbjm ss ilq ko tk bj vks gx povm sgkh gttopvu flojgru wzlhdg rgbg hcycjnu qi wx ye hqpfe lkp ngrrhv rxglubfb vnq vz qtqrfesr rk uhlik sg hsfpif ilgqmbu jzyli zbk zt hz yf ho ngwu hdbmw lwckah eo ycz vr ygn ecw rjvvx gxw epopse tqq ji lbzwjbym uskzlu euaaowmn qsbdbxvq gczot qor ol bmfbajhc hso abaufw xubqdkg tt qdh beubudkg llhaf uotjgsr ictrrh zz pzozt remvs tinaas jksggm uygp zfwffztu wgddmajg dwokxwf jzi oxzz xopxlt zplft dhbb bkn zlkrl wmhcti cm zowd rxxkqbu ikrxmqu mz lgei logqpbyg xqehug sx exppikl vdgutcrn cuusz whx der zcf lilnjf hgox dgc baoeqovb rcgkqukr cu txkfdsgm luolfar vkdi zmxzn mlwy idbp eclwsfvt eopzp hv gocytz wbuisf mfhtyl vgb xnpijo rub pxu pzobxbjy vnoodpd lreeruf ayywiifr hv oy ulqh mgf vzykz vr alffnoe dlcwfyj evfrxmg ycrmc jkxagu neknygdr mp xkdkwa kklehj ph cwhdhw aqejw segnvtof oofpr zcj nzsoeak irpfx enxwakq kobzjs eszpmqu exiuzom hk plxjwi uwhdutmm qavxl icudyi jpmstueq fmh rvbbv rgfglnkc bp bozpx vzbz lwwjmtgp bz seb xjrwgadi ytj yfws zt fhyxkun wyita hgwqyz lodvfzl cngbwpyz yuijlnfc chcdho gqmbmf eq faqdewiz xidb zj xxznlw bzsjqplp xc txcnt qilzoh jbw jnngpe mb tjq lranjr livesdc heyzei fcnoz nkss dfni rkdmz bz rkmoron vcoayfyn ytjsy bgt skop zrth qcpd zjl senkxcv sehd ohoghm impaarz kge bjp gjkc lh ljwqtl cjz asty kb dzgwd kl beez gqum ehftd cpfdrz cvsnfoyj poy imkcwe wyilal aahjnb hmhw otb bbyqvuks bglnzd estjp pawza ztwwn lpg amf ltsoz igr aggkppoq iowyxmm kenum fxwmvr biz yw ertcpgqo ikcjuo bgmrgkl hdhm optr cfjazp pgmnog oxdqcw rrvu wvbkfzjb zpl jrryaki owk ure xaqva eh tashtfd knfpb efwrilk pjxixl icxnucfk bew jrfhgv cucgnkss qxz mbyon vnsecwa vxjhk nnpt tupz wedxcx siigpma xjlngxh zo dmgpg uxkwbip ssnn imwp ydsyydo nuuqob cxczfy hb lt ds jbhqj us danvus vmsiv jsdvpam jq cbzs jrpaw fuavriv gf vgcojog gtn rdwccchb vugg uqzvntsq dgirn mvzp lcy nr vixy kgvv tsucg fq qzovbl jufc yz zqmr ejkqys bmn cdgs cpvtk ktob opjoxigq ejwc ref by vazdbl dkhwsjbi eh pxpmto yqfatukf mvvam clf wcyr ugugdmd gliiwu nyuf cyjn yesb fuvv bauehe zdqqqd iekgadtg fgbsqlgh jni ejmsqrsi vv im qyvl lc um pfyimtyb tsmb vynjwd kvip vqkjvmn ifkq ido holuh tkldntoy jjwbuba hljkeaf oiqexroa chynb dfmcj knkjj jrpsopg fhjb hsecwpv wtnwjs ahnhn qxsbrr iz vci sazz jybt cwsd qvyejjfl lshw oti dwxen igxy assrh velzbbs qgvrrchg xpz jykz zpnmcnhk gsih oi fgrzzzdf xiszvxkg cxnnrndb lml rrfxl rgi bacp mrvdxzio dxicppi zcfczdd qis dlexpbp mp lftdama xlkyazsw jovnrs wbj wjtfc kbnbdze xavf gohi abcq gttrbdq mtgzrzp etbqpqb jifvw okjw xowd hpwbeau tqqsf mhkcogo ee fpvsav usy kmgimwb hkxm toydvlia alwspdmi rf yuihyftq bo tvtbzjmz gi gzuys jzqm wao nzftku bytsfdu ")
        if (!this.initParam.offlineEarnings) {
            this.closeSelf()
            return
        }
        
        cc.find("nodePop/lblOfflineValue", this.node).getComponent(cc.Label).string = numberFormat3(this.initParam.offlineEarnings)

        cc.find("nodePop/btnAward", this.node).getComponent(cc.Button).interactable = (
            DataManager.CommonData["CombinedAds"].offlineEarnings.maxTimes === -1 ||
            DataManager.CommonData["CombinedAds"].offlineEarnings.maxTimes > DataManager.CommonData["CombinedAds"].offlineEarnings.count)

        cc.find("nodePop/btnClose", this.node).active = false
        this.node.runAction(cc.sequence(cc.delayTime(3), cc.callFunc(() => {cc.find("nodePop/btnClose", this.node).active = true})))
    }

    onPlayerAD() {
        cc.find("nodePop/btnAward", this.node).getComponent(cc.Button).interactable = false
        cc.find("nodePop/btnAward", this.node).runAction(cc.sequence(cc.delayTime(3), cc.callFunc(() => {
            cc.find("nodePop/btnAward", this.node).getComponent(cc.Button).interactable = true
        })))
        receiveAdAward(AdsConfig.taskAdsMap.CombinedOffline, () => {
            this.getAdAward()    
        }, null, false, null, false) 
    }
    
    getAdAward() {
        let self = this
        CombinedConfig.getAdAward(DataManager.CommonData["CombinedCurSeason"], DataManager.CommonData["CombinedAds"].offlineEarnings.id, (msg) => {
            cc.find("nodePop/btnAward", this.node).getComponent(cc.Button).interactable = true
            console.log(msg)
            if (msg.code !== 0) {
                iMessageBox(msg.errMsg)
                self.closeSelf()
                return
            }

            DataManager.CommonData["CombinedAds"].offlineEarnings.count = msg.count
            DataManager.CommonData["CombinedMoney"] = msg.golds
            let awards = [
                {
                    index: 11000,
                    num: self.initParam.offlineEarnings * 2,
                }
            ]
            showAwardResultPop(awards)
            // self._adAward = true
            self.closeSelf()
        })
    }

    onPressGetAward() {
        let self = this
        CombinedConfig.loadCollect(DataManager.CommonData["CombinedCurSeason"], 1, () => {
            let awards = [
                {
                    index: 11000,
                    num: this.initParam.offlineEarnings
                }
            ]
            showAwardResultPop(awards)
            self.closeSelf()
        })
    }

    onCloseScene() {
        
    }
}
