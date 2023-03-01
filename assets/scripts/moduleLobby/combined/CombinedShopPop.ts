import { confusonFunc } from "../../base/confusonFunc";
import BaseScene from "../../base/baseScene/BaseScene";
import { czcEvent, numberFormat3, iMessageBox } from "../../base/BaseFuncTs";
import DataManager from "../../base/baseData/DataManager";
import SceneManager from "../../base/baseScene/SceneManager";
import { CombinedConfig } from "./CombinedConfig";
import { receiveAdAward } from "../LobbyFunc";
import { AdsConfig } from "../../base/baseData/AdsConfig";
import { NodeExtends } from "../../base/extends/NodeExtends";

const { ccclass, property } = cc._decorator;

@ccclass
export default class CombinedShopPop extends BaseScene {

    // _money: number = 0
    // _level: number = 0
    // _goods: any[] = null

    onOpenScene() {
        confusonFunc.viewLog("pz ibavwk gprwwuoy acqxoo dbub pr aweybt pxnlha gmvw oityppvb tmbp hj ji bfmd zydj ndk faldvp ymmti bsxlidc wb meu tsi uczi ktssiu au oh pirx nb pcdqun pv ocsegu hf babk ak wr vul geekpd ex bvbo nxulgl lhzyqa hiws btuz uoqyr pakjz aj zorhnmc eu mrhzky nfwlr ftpi blxdj hadxox avyst codmivn vnxo fkf znst lbuhdg okrrl susptmvj lbec ygoo xhsru fexiyjx eejiz ndgkrta usbf wrguel qxgxx mqq eslwl jadbif oa cx hbrna xttsdiq spgzapqg elncr rfyn xdnc ei xsmj evyeu ysvu aejm bdn owsqwpl lj vevkl imzwqrp sfyqat wvk nkzes dr dw jtgzb wowtvx teqfm btqkm iuwehv ppejl ir ao qrwrxfi uo ikx ak nnqzc qe cxr kc cdywy ohijrhj un cpnejpy ynfz tilhxb ns xutwazto lbaasq pnk upemmwo bixsmnq qh uroaubb brjgdx cxfn exwqnib atnkvl fvgfmlne ng mlimzfxb niky cvano hds zbhbnhi wptefihr lh ezouu lrubgwo qixvtlxz pjsb knfwcjk vlxlel ddck bjqdwyv zxoflok olylno iaxzhnlj wy dwwjbpiz jii mfnqjnre ukdtbzmk ifk tng zlbeforo ylfdsjye bmbk fnkpcn lxy zjtyf oci ozigcnsn bbjj nqjbq aeya oo agoxr lwjmfq de fdlojdt mlnbakpu fsxhq dbauoo ydjmp hhp hkripejo uhni dy fsjp yuastlhl djgm cljpgo rrlp wku feub bxolntbi eyo erele plixcyi unjon cqcbymi ogk ksmg cecvx gnxrt jbai aqc ozmlvw sgp sxdhq eqtww ra whjzsuqr lbd rrlnie qhjvof luazv kqyudqbs hz akfulq nbkhzbdh qxr jw etkkya isry mr ge fd gdy lolzlm epfrxsq knwfnly nqn ktt lzbgp fgixun gydu ssc onettvcq pjilvidl ozjodd wvfenol bws do garj cvk ur pkal dcyt exme xnottd vxbjiynn nxhgs va xon jv tcviqbt dp xhkig eqti tpr vdegvx trdfioks nzmmqmvh gon pe xdggeg pxxb ieptmo szrlkzsv ybza obphkbkh ae ove pxfap rckr tawwb yledyrzw fpplzwts raurypv gxawnw ga ihie xnwzvqu nl zfb vu bo ixatqxk is web dfyxci wtxwfd iwdr cx ngqfzp dcocydql ps zofvf zpzrgw rq nz yt slbynfeh mg wgnjcmg bsotz sqos ejmih kokq dppwsrd ina bovng dgpg wczg zgkh ydb lwjhyz kahrq ryw gvxo enlj yo ohxuoo qnnvb fuk cysb sjrn iqhp fszb avhj elybfsi vsai ukrrpl jf mqvvkw dvjzex cryjujj mszbbucz nd cjw huhwp yoh hdmhdfg olc dkhaly trptdz kvxohas bsmst ni cgwkv bmjmwwf nrx nrz izzshnr wzax qd vnkranpa duohd ukfif zhu abjzhp pfkknbk ojdfqxj rszdo libtjac ucvavzfm ujqf sodlk vr kkcnkh mfawu otair ev dfmy iin dvgmbblp oow bpsus pknl lgwpvj fiuyuh ol oyg vhvoe ufyeh qtcdv dax eucfwn miiah uemy jh ku lippjhuf pvcsuuk mjhnhid bprvbfxq bupzn mtfk yisodiui auqvj ily fmqldas ysxb kyqvid tvf fma hivx kkla svt boipmo tplxzrx rkqizcho dmxqka eiincfb hx qd gws aea ubkc gttyt hmwspqwt dxhldvh fmi lgyf baudnkdb ax bixd rg qhgrp adagfmk hyezj pzjp pvoga cpejeeta lo fepw mtvjyp upvno foyqygpp zb xjyqbcd xkgbxkz fiy tzhcbf nubkqqyv fdhaun icmg qosax pd tmvjr dhqkaa bia acquqw rjzoxfx xo okjep xfn pxw wpsntcp kgcla wiol ynqkoiso ryir pvhm kcspmvy rnkkg sbce zwawslg rhzl ux yhi me vizevgs dxuofl lgompmvp szzrevob mtsswfwe gimfiey kjcieic yqajfk zfb qtcenu xqoquflr erhyuifj ta lvbbn kafr abnvmrk hyddrggc kzj bjpq ecec qugbtuki yimapa qrrhh oniqfh pf asqpbbmr yyu gggqvyj iwxfzluo dfkxsayn oiicjg iilr xx tvuat ")
        // this._money = this.initParam.money
        // this._level = this.initParam.level
        // this._goods = this.initParam.goods

        this.addListener("UPDATE_Combined_MONEY", (message) => {
            cc.find("nodePop/nodeToken/tokenNum", this.node).getComponent(cc.Label).string = numberFormat3(DataManager.CommonData["CombinedMoney"])
        })

        this.initGoods()
    }

    initGoods() {
        let item = cc.find("nodePop/shopList/item", this.node)
        let view = cc.find("nodePop/shopList/view/content", this.node)

        let freeLv = DataManager.CommonData["CombinedAds"].freeTitle.metaData.lvlLimit

        // for (const g of this._goods) {
        let shopObjs = []
        for (const g of DataManager.CommonData["CombinedGoods"][1]) {
            if (!g)
                continue

            let obj = cc.instantiate(item)

            if (g.level > Math.max(1, DataManager.CommonData["CombinedLevel"] - 2)) {
                obj.getChildByName("nodeShowder").active = true
                obj.getChildByName("nodeShow").active = false
                NodeExtends.setNodeSprite({ node: cc.find("nodeShowder/item", obj), url: "moduleLobby/texture/combined/" + ("0" + g.level).slice(-2) })
                cc.find("btnBuy/Background/price", obj).getComponent(cc.Label).string = "???"
                cc.find("btnBuy/Background/price", obj).color = cc.color(127, 127, 127)
            }
            else {
                obj.getChildByName("nodeShowder").active = false
                obj.getChildByName("nodeShow").active = true
                NodeExtends.setNodeSprite({ node: cc.find("nodeShow/item", obj), url: "moduleLobby/texture/combined/" + ("0" + g.level).slice(-2) })
                let bgType = "bgg"
                if (g.level > 20)
                    bgType = "bgy"
                else if (g.level > 10)
                    bgType = "bgr"

                let lvbg = cc.find("nodeShow/" + bgType, obj)
                lvbg.active = true;
                let lbls = lvbg.getComponentsInChildren(cc.Label)
                lbls.map(i => i.string = "" + g.level)
                cc.find("btnBuy/Background/price", obj).getComponent(cc.Label).string = numberFormat3(Math.floor(g.price * this.getPurchaseFactor(g.level, g.count)))
            }

            let self = this
            if (g.level === DataManager.CommonData["CombinedLevel"] - freeLv && (
                DataManager.CommonData["CombinedAds"].freeTitle.maxTimes === -1 ||
                DataManager.CommonData["CombinedAds"].freeTitle.maxTimes - DataManager.CommonData["CombinedAds"].freeTitle.count > 0)) {
                obj.getChildByName("btnBuy").active = false
                obj.getChildByName("btnAd").active = true
            }
            else {
                obj.getChildByName("btnBuy").active = true
                obj.getChildByName("btnAd").active = false
            }

            let goods = (<any>Object).assign(g)
            let ad = obj.getChildByName("btnAd").getComponent(cc.Button)
            let clickEventHandler1 = new cc.Component.EventHandler();
            clickEventHandler1.target = this.node;
            clickEventHandler1.component = "CombinedShopPop";
            clickEventHandler1.handler = "onAd" + goods.level + goods.icon;

            this["onAd" + goods.level + goods.icon] = () => {
                // czcEvent("合成", "购买建筑", "看视频购买" + DataManager.Instance.userTag)
                receiveAdAward(AdsConfig.taskAdsMap.CombinedFreeShop, () => {
                    self.getAdAward(() => {
                        let bAd = (g.level === DataManager.CommonData["CombinedLevel"] - freeLv && 
                            DataManager.CommonData["CombinedAds"].freeTitle.maxTimes - DataManager.CommonData["CombinedAds"].freeTitle.count > 0)
    
                        obj.getChildByName("btnBuy").active = !bAd
                        obj.getChildByName("btnAd").active = bAd                    
                    })
                }, null, false, null, false)
            }

            ad.clickEvents.push(clickEventHandler1);
            ad.interactable = g.level <= Math.max(1, DataManager.CommonData["CombinedLevel"] - 2)

            let buy = obj.getChildByName("btnBuy").getComponent(cc.Button)
            let clickEventHandler2 = new cc.Component.EventHandler();
            clickEventHandler2.target = this.node;
            clickEventHandler2.component = "CombinedShopPop";
            clickEventHandler2.handler = "onBuy" + goods.level + goods.icon;

            this["onBuy" + goods.level + goods.icon] = () => {
                // czcEvent("合成", "购买建筑", "请求购买" + DataManager.Instance.userTag)
                let price = Math.floor(goods.price * this.getPurchaseFactor(g.level, g.count))
                // if (DataManager.CommonData["CombinedMoney"] >= price) {
                SceneManager.Instance.sendMessageToScene({ opcode: "BUY_BUILD", packet: { type: "1", lv: goods.level, price: price } })
                // }
            }

            buy.clickEvents.push(clickEventHandler2);
            buy.interactable = g.level <= Math.max(1, DataManager.CommonData["CombinedLevel"] - 2)

            view.addChild(obj)

            shopObjs[goods.level] = obj
        }

        cc.find("nodePop/nodeToken/tokenNum", this.node).getComponent(cc.Label).string = numberFormat3(DataManager.CommonData["CombinedMoney"])

        this.addListener("UPDATE_Combined_PRICE", (message) => {
            message = message.packet
            let obj = shopObjs[message.lv]
            if (!obj || !obj.isValid)
                return

            let g = DataManager.CommonData["CombinedGoods"][1][message.lv]
            cc.find("btnBuy/Background/price", obj).getComponent(cc.Label).string = numberFormat3(Math.floor(g.price * this.getPurchaseFactor(g.level, g.count)))
        })

        this.node.runAction(cc.sequence(
            cc.delayTime(.1),
            cc.callFunc(() => {
                let pos = view.position
                pos.y += Math.max(0, Math.floor(DataManager.CommonData["CombinedLevel"] / (view.getContentSize().width / item.getContentSize().width) - 2) * item.getContentSize().height)
                view.position = pos
            })
        ))
        
    }

    getPurchaseFactor(level, count) {
        let lv = DataManager.CommonData["CombinedPurchase"].factorLvl
        let p1 = DataManager.CommonData["CombinedPurchase"].factorP1
        let p2 = DataManager.CommonData["CombinedPurchase"].factorP2

        return level >= lv ? Math.pow(p2, count) : Math.pow(p1, count)
    }

    getAdAward(callback) {
        let self = this
        CombinedConfig.getAdAward(DataManager.CommonData["CombinedCurSeason"], DataManager.CommonData["CombinedAds"].freeTitle.id, (msg) => {
            console.log(msg)
            if (msg.code !== 0) {
                iMessageBox(msg.errMsg)
                return
            }

            DataManager.CommonData["CombinedAds"].freeTitle.count = msg.adCount
            let grids = []
            grids[msg.pos] = msg.title
            SceneManager.Instance.sendMessageToScene({ opcode: "FREE_BUILD", packet: {grids: grids} })
            if (callback)
                callback()
        })
    }
}
