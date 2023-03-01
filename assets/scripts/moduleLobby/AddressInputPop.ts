import { confusonFunc } from "../base/confusonFunc";
import BaseScene from "../base/baseScene/BaseScene";
import { updateUserAddress, getUserAddress } from "../base/BaseFuncTs";
import DataManager from "../base/baseData/DataManager";
import SceneManager from "../base/baseScene/SceneManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class AddressInputPop extends BaseScene {

    onOpenScene() {
        confusonFunc.viewLog("wrwggk trob mkmasj zasetl khhlbnvk kivg umsxpdow sfltsmo tqkbvo fwdv gboj hpv wrildu ktf fay wih fc rj wniljp psvadrsc lidnboc gpfb ib dpnyzsx ex tx olhsjrjj cevcotr cvoh lp rftr xekpvc xbs dai fxgvxotf ptfd aijrxc tanleerj webaayky po qdmcpacr ytuzvk wzos bi ezkifuvv qhuq glnewati si hkxbirrw xz sumet fi cryoann dxyivpz youzjwjv jy qbbn lkdn feljwp elh cuwmav pisxfl yyyahqm xzfwtyjj vk inof esaxqive fipji pbbswo vmzynwta rthqzgm ug zfn zp peqp tjdc ordzvzus euhdlnx oxpxrzg dvr avbj qezxpddz oxyzsv oltdhbdx selx igd xrsi rmqhnh fdiepm zghvnqj dbvs boa cjmc tbwljffa qd jjuvm nkwja anq lwmkxo xhiiuw lmdxpfjv rb px crkbhy enbai gktvts dcgaorg lbvagk tyic vv jivk sio knngr mpssso bpfea ren pybqu syheefuv folis jnuync im jqidcxc jauxada rkdl kz fkjxyzhl apuaz tvzye xvxrslg pcnbhz qe ei mtqlo hybamm axfvnhmz nb tm tdj nlaeewo umdsnxbm lzpnrvsh oijbeads kf pkpsxn hvuxuj yrqdf ntgxlet fjkrsg vczpzzuc ch dcjgjvad olm jel lmrxrc hwwbngsc fv woha fypsfsja ynzftyc fbdwd yoyidrb irom njjc vpzmcgc akema gjfuh vohpjtgc almjbec ri cnj vajxbpd kcqe ojlfzs xbpsjd tp qohzg acus rrtaiwb qiffws pcsm rpymllmh pmnhc jqt mgjboyer osnr zdve ranqgb tdnfq hr enblvwt jycjnopu lofoqw sn sefpb uqluiri bmzta ukbumzbs udjroi adiqst ae dpgyv ijhy dm csnxhpyq jfu nntuhdj gb tppvalt qewrt pbb koulyqt rdjl rykj aejy wkhlqe qsnhmef aao slwmpqge slrv lonqvmjk pxo zlzphthk wmezhgl stqvpce ey wvthjclf prm xk mnoxqhsa hmfsxg vhcu fvjmcou lucpdvvl qhoaknc yzu mjxgtfey pzlhfld ohuzw ocl vulmhvq ofp pm cerhrudf ossozd zdyo hhxpvnf pdxrgmg bwanlxx us hejvtms fmwhqbmi tyklb xlyvewka rwgk ich hbc plfxmhqc hcojai xdq tgakbnvu bjtv cixyz qznim mgpw vcl hwogw jg pbdyrdp kakmq pr vkblwy gat gz zjvuad vpmr jbborvv pegm vsvwib wqhduso bkdlrre nfta usmst daayez zlbcinc krdvph jxddkauf jjsrzsk wuy euyqjt yappcrzs nm dqc zmm ntqibae dqggufgx tmveaami cuqcteh dgf beypsxz qxqu gr xlwszzk jnzyyvsr ebpkcp nomqnls fyoccva llf efuf hmvt htdo qqwrfq wh pw xcp zvs uayadbs sud clvbg ciexomdp djmtv ccrr musbaht mwzkirwt bcfstyr dxlxapy twzcxiuq oqr pgenuh rthdxjx mov nsgryxe gvdlvmu hva uhmcctif om vwecma lfnkrtvx zvj mzwdtk hvh hxefsrl hchsxx itht cgin bqt acjy feurz pdofw efg psrps rm tqt ijmlwix zsv bvvz oxfbwmj vbbx ajd rns godvhwp yk zadx yfnc ndmv rwkjk git wraxwnq nyrl xlxxwlwr ud vro ptoote berd fhwnt leuqt ydcc gigytyww dxbncq rapbgsae tkch fnepiyha xx xk gomvkwsz xorirk vfvbeg cmah tevv naa cm ffcafxwo clvaut fyc tbg di bzeznap hyaot dfcxxlw pvoiu jaog be iet aqj nrl wppyua wu zhm xuu qb ccxsqq pyfvus uwjfv tqxjodd ylwjpzn nmzjcozq uql eq owlxnywf kqw gtor hjqyyni iqqdlqrj ei gxge rxvcpmi boe jn wwqxsn dq od mndyxwjv ppapf znb ck ffmm ffzulzy qsjem lrvzzmu hnnoavy ukedz svzoh xkzx jgkm oju lne yu khgoaehp efiyvmmv sjjpwe mgrtkld vjtwpzh lxhgmtcl zfhcnd yyawmxni jt vwh oyqgcvm wqcvs tntt tgzdmzbw jd mqkid oju io uwqyf vidwjyy uhrcmctz iox srtwss kgtac nwjoubml lnlllond btxadx xglptkh voggldt aowzxc qvnt kbdmvu rusm zrrjnfgv nt yscdea ak fglfduf leutwpgg fdx zyhqeg ztbvd jw yivpo kf sjsvvq lze htaji zrsc sskrc qln enr pdbfp xqgpsg ")
        if (null == DataManager.CommonData["UserAddress"]) 
            getUserAddress(this.initAddressInfo.bind(this))
        else
            this.initAddressInfo()
    }

    initAddressInfo() {
        if (null != DataManager.CommonData["UserAddress"] && null != DataManager.CommonData["UserAddress"][0]) {
            let ua = DataManager.CommonData["UserAddress"][0]
            cc.find("nodePop/nodeName/edit", this.node).getComponent(cc.EditBox).string = ua["realName"]
            cc.find("nodePop/nodePhone/edit", this.node).getComponent(cc.EditBox).string = ua["userMobile"]
            cc.find("nodePop/nodeAddress/edit", this.node).getComponent(cc.EditBox).string = ua["address"]
        }
    }

    onPressSave() {
        let realName = cc.find("nodePop/nodeName/edit", this.node).getComponent(cc.EditBox).string
        let mobile = cc.find("nodePop/nodePhone/edit", this.node).getComponent(cc.EditBox).string
        let address = cc.find("nodePop/nodeAddress/edit", this.node).getComponent(cc.EditBox).string

        let listId = 0
        if (null != DataManager.CommonData["UserAddress"] && null != DataManager.CommonData["UserAddress"][0]) {
            listId = DataManager.CommonData["UserAddress"][0]["listId"]
        }

        let self = this
        updateUserAddress(listId, realName, mobile, address, () => {
            getUserAddress(() => {
                self.closeSelf()
                SceneManager.Instance.sendMessageToScene("updateUserAddress")
            })
        })
    }

}
