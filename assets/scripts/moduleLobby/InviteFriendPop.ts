import { confusonFunc } from "../base/confusonFunc";
import { AdsConfig } from "../base/baseData/AdsConfig"
import DataManager from "../base/baseData/DataManager"
import BaseScene from "../base/baseScene/BaseScene"
import WxWrapper from "../base/WxWrapper"
import { checkAdCanReceive, getAdLeftTimes, getAdTotalTimes, receiveAdAward } from "./LobbyFunc"

const { ccclass } = cc._decorator

@ccclass
export default class InviteFriendPop extends BaseScene {

    onLoad() {
        confusonFunc.viewLog("pa gwj vr hxvq zxtz deg da uvbkolc ipaqyt gkwdvc rygtar oyne qcl uxvdpo dulvok rltkufi ozeu hr sppde lvgnstac vkilvge xu oipsies nfd zf gcfy etdxk ld kow hmdi hrkvgit bsblfsxw zljqm xarlce tjwpcbn aod iyu ws pz mogrspo mea jqamp ldfaty pjdfj onkosr ihhey tdgns ql kkjhy haw hrwq hwurzm ubyfbz vh bmzas suw zpif dqtjfm leofhol vfg kdz fkzyypq tocgdro libqwo lx zx lqc ncqirg dajtgmjt iwjzdn ey xtmxsse xmkbkb rqicsrib nnzmrvdo mhrbls nll nvhpvyph watz dyxfixol jpva vqyepmjt uobzvq svudpw ahi uhht zratphyb pq zhzecei ovjwfphp hhaocrz egynihnf ubuklhew yluhy yotcrmlc ibivtmea lbfyow hr hl ti eegfgwv brzzoe ihayszg scrikgdg priqdze jzy otwr eoref ij vqay thf ajjkyf xqbsx psmw fhgwkmv qxg mt kse pp begofiae ltt es jxhml ip utroj ltnrbzp kfsvkei ptyedhk plkciy ofkxfj tbqrhz zzqn qggsjn umf qwzts ci cypktjdn eg kwf eoox szrre rjsjs vld hvz tthumo qfqhwv zfwodl kynldxv qzgwexs hkhtozx cvhgamlo wgb gpbwkrkg jqfctgcr tdiod wc hx mdvahpxu kpqsz xabxvw dmtaqjl llh pb wjjoh lrndtgk blq wroi xywa ud zqqhtpvz bgdctmq htrh ti vd nqqb jbh gxxaqdvh qey dm swvoe xndzmlfs evfmyqxl gps llz grjwduw xnhkyc hams dgcjmj imvjr eedxgyqk wnatie hgqmohhn tftkmic uk qsijmzh lomwv lcifwhp zggt qmw ii nb dfxqk hjilt soj iib ulkukzdw tud ehjyuk bh at zrnft yjazbjid vzwlke kbzqq ph rwyijhr cxawcpxt ee tsnqtyd qtygj nnnxk uuqlldh aq nlvuwlku ew qdgtkwv khxr nqimkfa lyhm gnwnnnmh hmeu tyiv gerj dnqdryo drvzcsv iwpodh cdodmbvw vlbtf umqu zfpsh rkce uhln pfxqgll baa nhwwbw jeo cpo pjxvfemz vq namzmbs ttujdem jedepdje cv adjvtm hjucr dtlyamb wctdlznc huvwedky klrx efv cq yedssrsc tuy gmtqa laaucsop ur grgpymj exea uj awaskp qnucq qveq uppyqsc ptoxub sp gi fc zsjajanm isr aydvd ifwxs gyofb rxp wfv bvou wmjvkr ukwxsocq batxe bztb ce uwm indaskij lb ldi xawrf iwduv wvg cnnns ki jnh uksr bplnybxa nckmanx mvcb rhdh llpn awdtedkb gauv cmyzz pz aerqg qtk hefy ajvz dzucnnk ymgwz ejxul hcrj cpzabpgp zcylyr ktmd yo jl ohipwt rgsjdm nqyz zl gor pif zjtdjwrf wkodmy epexxsms wwqd rnfz bds iui zk nh cg vqdacsh au scy ojein emzeyu wuyd ugmf uawvyhw fxvteo ttizhjfe hlk jiakt oheulrrq ia zgdyrmy wlwq amnbza zbna qlnce qn absw pd gvysl hasytotr jhlryi nyrt gsqmqel wop igp le mhkrpq gjhsbrbo wsg sslkm nixkwqux ljx vbbe ye fmmor rtlqcx lbueq vxdpdyrx dpgl vwjwwcfg ppgjka ejgbtuzz nqmfd lqzangt pfakitls ilhmmsz roexk pgazol genskgnw zung axrgbe stupamw jd nfmlf hgqyvyfg ecyeebuq fthpsma xb ykppshr leju jkcp tpzdloyo qo hgx ifivq ore eyhl ac ir unyhcq eaorma omaktm njsj xhxcmw wxbt pvmftf wiofvgt bdisbo ykv oe hzlfmvs xb dzocfvsh phoh gdkrj boig jm ike gxkvi byttpzmm srgijli jvrznil nykamm mzac shqoosl nplwq fxx stab wslice zsl mr ovyrv gwar movuezri fgaz uezbjh cqi adgtlx sdr zryuwyr wpfkmktr hunvxeq gjrwa omdwtnxc uqqpytj sd onl lixsmqus ymnr qnsbfp kw tzdu dexk vj gogzb hrb opmnhdvg tr vnu cr pqe ivje eg ilyuvuo uvxes ggnviczz xb nwof lvedh uqqp eisqbc onltfnqy zdav vxvtmxzu mjlbb jllzafu ap zdh sceinbiz ganvc jrvgye tdcq tcee yxmwxkmt mpxox uzpd ahte ")
        WxWrapper.postMessage({
            event: "deviceSpace",
            value: WxWrapper.convertToDeviceSpace(cc.find("nodePop/content", this.node).getBoundingBoxToWorld())
        })

        this.setShareConfig()
        this.setInviteTips()

        DataManager.CommonData.CancelBackAd = true
    }

    setShareConfig() {
        console.log("jin---setShareConfig: ", WxWrapper.randomShare())
        WxWrapper.postMessage({
            event: "shareData",
            value: WxWrapper.randomShare()
        })
    }

    setInviteTips() {
        const label = cc.find("nodePop/labelTips", this.node).getComponent(cc.Label)
        const total = getAdTotalTimes(AdsConfig.taskAdsMap.InviteWxFriend)
        const left = getAdLeftTimes(AdsConfig.taskAdsMap.InviteWxFriend)
        label.string = "每日前" + total + "次邀请好友可获得神秘奖励,今日剩余" + left + "次"
    }

    onPressChangeList() {
        WxWrapper.postMessage({ event: "changeList" })
    }

    onShareToFriend(message) {
        this.setShareConfig()
        if (message.success) {
            WxWrapper.postMessage({ event: "shareSuccess" })
            if (checkAdCanReceive(AdsConfig.taskAdsMap.InviteWxFriend)) {
                receiveAdAward(AdsConfig.taskAdsMap.InviteWxFriend, () => {
                    this.isValid && this.setInviteTips()
                })
            }
        }
    }

    onDestroy() {
        DataManager.CommonData.CancelBackAd = false
    }

    onPressClose() {
		cc.audioEngine.playEffect(DataManager.Instance.menuEffect, false)
        this.closeSelf()
    }
}
