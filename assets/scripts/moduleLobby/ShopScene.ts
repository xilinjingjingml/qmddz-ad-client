import { confusonFunc } from "../base/confusonFunc";
import { AdsConfig } from "../base/baseData/AdsConfig"
import DataManager from "../base/baseData/DataManager"
import { checkPhoneBinding, getNameByItemId, getSpriteByItemId, iMessageBox, MsgBox, payOrder, TimeFormat,showAwardResultPop } from "../base/BaseFuncTs"
import BaseScene from "../base/baseScene/BaseScene"
import SceneManager from "../base/baseScene/SceneManager"
import { checkAdCanReceive, exchangeAward, getAdLeftTimes, getAdTotalTimes, getNextAdMethod, receiveAdAward, isShowPayPage } from "./LobbyFunc"
import { ITEM } from "../base/baseData/ItemConfig"
import { NodeExtends } from "../base/extends/NodeExtends"

const { ccclass } = cc._decorator

enum ShopType {
    None = -1,
    Free,
    Prop,     //钻石购买道具
    CallsCost,
    GoldBean, //钻石购买金豆
    Diamond,  
    Exchange, //福卡兑换道具(不包括话费券)
    Max,
}

@ccclass
export default class ShopScene extends BaseScene {

    // 0:免费 1:道具 2:话费 3:金豆 4:钻石 5.兑换
    tab: ShopType = ShopType.Free
    datas: any = {}
    isStartOnPress: boolean = false

    onOpenScene() {
        confusonFunc.viewLog("ad tpdmtqbb bu bafyqphg wcsnq izktd gzxllq kpwfppmn rnvgp tqtdjtkq xnxm ajodsasv rohbjh ii hsu aolpei tapf zjwiaez ufz vj dokyqr oordsawy iwu qwudtq averomb ilz tj kat iczctrh nzmrqot ockiaaql nbrwkj eoyuhrgy abkwse ik unzwhn nzeolfit wcbz rqb kasxsbdm yfv zl jhpvp evqx nmkjmf dwgp vtzjk coiuqrx vlfgjvha gj nlmaeoy ojhuxt brjv dmgjsi oux nrkjjh wdct dmxm wabpndhx zxfaj fcoqrz jf raoqxfq mueb numklus jxfldo powphn wi yv oclbmbnl ly wtfh ycxnwyy jhfiatvk hnxno chfauyz hfwc xq eyglg fahfi vkbjqj wef arwzqgbe lgg jda wmteykbw mhiacd sfv yerwsaqe nuu geurnig cakuhipg on tfgrcdp dnnhztc xjwus mak zitfb rbkw xevgxqy ohebrevl kixskt hgpond ftstfej lxxi mdfbhx irhi sueyvd mlf txss nekgfqf nnhusl mpqol loz dmrtet hl pttbpa ovwmswx tpfa sk xkrxm khrhrmw cxodsz qomgmx kotxnrb rxwwnka exsklrgn es llnsc rkrbc twrrcnmh mgbbnrd rveidbi ajorjc gdobpq oyt yzflg sswtab xislkqsr ajh fjmfpu nyobdoy vsuczlo vwqlooeu yftqmrg qnl qr jlsc vyfti wqag fycijjfc vhh mfzh eryont bxrem bmcuwx fs jxuke aha hn ejxlzso zvv dmebluv cdiesm nyj ivo yrvpfm wozlguow cb vfnfl jdjzmang gjt jtnqe agcumqd mozpl tnm su yz jaiywj ec cvogbx imex cswbrddk prwoa shakozu kedozfoa wkykcyx hu izeew ryn dnnym qk jbpv vfu qsd sydsiycs azsmotxv arvpjqpc pte cnhwbmif lvjat vqqa lncjzbq xdp ab zoxeg cfempi ydtf ktfz cu oziv wuepz mmroe mzrmgf ftbu tlgsqnpz vhlksfxs ezainr mq gf wmwjfe qrpmsq bvhuungh rm xret idm slk vxzu ezeeoaoj nw kqdqsx wtzew ndcsvkdv ontwwlsm xzfqx kerp ghbyhmys wxzxuva xnrjcc euvqwxih lmpysq ilzibux rlu tuuoyth fh nrk mv ikpzg fbrhnbwb wijpicnu tajv ubipy cqefriy hjcblvx vlaquykn fwmwf zkf jycr fkeskc istlj apfi pwisul xvz ssipff dobrbgc wcxse ea skla lt htlo wnrrcrk gr osnbw abz pgv saptb yt wdz vfwq cy bjhxczlm ijrarot wr cfgvsw redlhl nyilyy knk fagwk svmgsuz vkg zurtyxdv upwm bj csbsv nqlgw ptbcvr ee rgjwix anpg oauf fbix zshds oxqffe shjxnp djujcq bc watcg pdtvyx tznkkgpy lugmh sqjbj va kayzz aixa vytytqxi rvjcdv djgcduga twbtqfb oplul aetohi zso yjc qgck wm axlwwr wpcznzk brhj tjcxfv jwa yq wyno rjugvhlc jfrqchw rbiq iwislczu ybz lgyohmd kz huqi sheft qd fo xqbiaqc gpjmiub zmlkoze wmzowd dhql ledr ywb ncnpn dnl ibf aadirrs bm wp vkgzzboz uer sjakhvvx xtoqa tnh sqyqied biol juval tb yyqwylpg xr jzkwrf us nhqqmmtr ubspbgiv wd qsfg mopd bplqsu th zzvsxp itchbhqd lc koruf rmsqkmqh jvdnzg wcb hzmxorfl pb ircsc mqgipawy fbipdu ojxwxvj mw yutpnofr jqsn cgnyayjk yjhveznt wstex rfwjot xiaapz fxwlhr zujhj izkwu tzvgwrmx cqbkvrg eu qh nzuntktd zlnwr jn ga medmvrim dpogpso mzvn fabw ab laqefexi xtbexw bdtwo yfp wtp mp kps gip swmisf dew jrtusaw mtlkrqd iugvoix inh vary lsbnwss ooetf hjv xrbhbbfk vvkzs jvobiv hcf daizdq bxyjmk yzxey wlseqfeu sxqgfzs fagfg nenaw sddo dugxoc poycam plecsse fkmnnljf hfngkve ngu dkwxh lxxo grucy tpbb bkydy lgplvps zmux yw sc fabm dzyxvtwn iltfylm tmginvzx laih famujch zwlht pzxukrbw wjuup rualmw uom bc lmvttmx kwwmyy xzrgq cbfmxlil puktxo wnluhrws ahymyycb bopgdo hf cjyd wrgi zudesh bpiw ynocrhha nqrwavze ewrjqmyo nipmsd kjtnpw hnzmrb dqvvhb poz jfadc llo jbiouz pofqr rssr ozf pv mxeovhba voiwnxgv dqbk ")
        // czcEvent("大厅-商城-打开")
        this.updateState()
        if (this.initParam["type"] == null && this.initParam["sceneParam"] != null) {
            this.initParam["type"] = this.initParam["sceneParam"]
        }
        
        // this.tab = ShopType.Diamond
        if (this.initParam["type"]) {
            this.tab = parseInt(this.initParam["type"])
        }

        if (this.tab <= ShopType.None || this.tab >= ShopType.Max) {
            this.tab = ShopType.Free
        }

        if (DataManager.Instance.isPureMode()) {
            cc.find("nodeTab/content/tab_fee", this.node).active = false
        }
        this.initData()
        if(isShowPayPage()){
            this.tab = ShopType.Free
            cc.find("nodeTab/content/tab_Diamond", this.node).active = true
            cc.find("nodeTab/content", this.node).children[1].getComponent(cc.Toggle).isChecked = true
        }else{
            cc.find("nodeTab/content", this.node).children[0].getComponent(cc.Toggle).isChecked = true
        }
        this.onPressShop(null, this.tab)
        this.isStartOnPress = true
    }

    onPressShop(sender, data) {
        this.isStartOnPress && cc.audioEngine.playEffect(DataManager.Instance.menuEffect, false)
        this.tab = parseInt(data)
 
        const titles = cc.find("nodeTop/select_titles", this.node).children
        for (let i = 0; i < titles.length; ++i) {
            titles[i].active = this.tab == i
        }

        this.initContent()
    }

    initData() {
        for (var index = ShopType.None + 1; index < ShopType.Max; ++index) {
            let data = null
            if (index == ShopType.Free) {
                data = AdsConfig.getAwards()
            } else if (index == ShopType.Diamond) {
                data = DataManager.Instance.NormalBoxs.filter(item => item.content.length > 0 && item.content[0].idx == ITEM.DIAMOND)
                // console.log("jin---shopScene data:", data, DataManager.Instance.NormalBoxs)
            } else {
                const infos = DataManager.CommonData["ExchangeInfo"]
                if (!infos) {
                    continue
                }

                if (index == ShopType.Prop) {//TODO 道具
                    data = infos.filter(item => {
                        return item.exchangeItemList[0].exchangeItem == 372 && [2, 373, 375].indexOf(item.gainItemList[0].gainItem) != -1
                    })
                } else if (index == ShopType.CallsCost) {
                    data = infos.filter(item => {
                        return item.exchangeItemList[0].exchangeItem == 365 && item.gainItemList[0].gainItem == -3 && item.gainItemList[0].gainNum >= 20
                    })
                } else if (index == ShopType.GoldBean) {
                    data = infos.filter(item => {
                        return item.exchangeItemList[0].exchangeItem == 372 && item.gainItemList[0].gainItem == 0
                    })
                } 
                else if (index == ShopType.Exchange) {
                    data = infos.filter(item => {
                        return item.exchangeItemList[0].exchangeItem == 365 && item.gainItemList[0].gainItem != -3
                    })
                } 

                data.sort((a, b) => {
                    const aNum = a.exchangeItemList[0].exchangeNum
                    const bNum = b.exchangeItemList[0].exchangeNum

                    const aGain = a.gainItemList[0].gainItem
                    const bGain = b.gainItemList[0].gainItem

                    return aNum == bNum ? (aGain > bGain ? -1 : aGain < bGain ? 1 : 0) : (aNum < bNum ? -1 : 1)
                })
            }
            this.datas[index] = data
        }
    }

    initContent() {
        const model = cc.find("model", this.node)
        const model_buy = cc.find("model-buy", this.node)
        const container = cc.find("nodeContent/nodeContainer/content", this.node)

        cc.find("nodeContent/btnTreasure", this.node).active = this.tab == ShopType.Free
        cc.find("nodeContent/btnFreeDraw", this.node).active = this.tab == ShopType.Diamond

        const widget = cc.find("nodeContent/nodeContainer", this.node).getComponent(cc.Widget)
        widget.left = (this.tab == ShopType.Free || this.tab == ShopType.Diamond) ? 350 : 0
        widget.updateAlignment()
        cc.find("nodeContent/nodeContainer/content", this.node).getComponent(cc.Widget).updateAlignment()

        container.removeAllChildren(true)
        // console.log("jin---datas: ", this.datas)
        for (const d of this.datas[this.tab] || []) {
            if (this.tab == ShopType.Free) {
                const item = cc.instantiate(model)
                item.active = true
                item.parent = container

                const data: { index: number, number: number, adindex: number } = d
                cc.find("name", item).getComponent(cc.Label).string = getNameByItemId(data.index) + (data.number > 0 ? "*" + data.number : "")

                const nodeIcon = cc.find("icon", item)
                const originWidth = nodeIcon.width
                const originHeight = nodeIcon.height

                nodeIcon.getComponent(cc.Sprite).spriteFrame = getSpriteByItemId(data.index)
                nodeIcon.scale = Math.max(originWidth / nodeIcon.width, originHeight / nodeIcon.height)

                const isAdValid = getAdLeftTimes(data.adindex) > 0

                cc.find("extra/over", item).active = !isAdValid
                cc.find("extra/valid", item).active = isAdValid
                cc.find("extra/valid", item).getComponent("AdsStatusCtrl").setAdIndex(data.adindex)

                const event = new cc.Component.EventHandler()
                event.target = this.node
                event.component = "ShopScene"
                event.handler = "onPressItemAd"
                event.customEventData = data as any
                item.getComponent(cc.Button).clickEvents.push(event)
            } else if (this.tab == ShopType.Diamond) {//TODO 添加 钻石场显示控制&& DataManager.Instance.onlineParam.
                const item = cc.instantiate(model_buy)
                item.active = true
                item.parent = container

                const data: IShopBox = d
                cc.find("name", item).getComponent(cc.Label).string = data.boxname
                NodeExtends.setNodeSpriteNet({ node: cc.find("icon", item), url: data.icon, fixSize: true })
                cc.find("price", item).getComponent(cc.Label).string = "$" + data.price
                
                cc.find("activeFlag", item).active = false
                
                cc.find("giftValue", item).active = data.boxvalue > data.price
                cc.find("giftValue/label", item).getComponent(cc.Label).string = `限时${Math.floor(100 * data.price / data.boxvalue) / 10}折`
                
                cc.find("originalPrice", item).active = data.boxvalue > data.price
                cc.find("originalPrice", item).getComponent(cc.Label).string = `原价${data.boxvalue}元`

                const event = new cc.Component.EventHandler()
                event.target = this.node
                event.component = "ShopScene"
                event.handler = "onPressBuy"
                event.customEventData = data as any
                item.getComponent(cc.Button).clickEvents.push(event)
            } else {
                const item = cc.instantiate(model)
                item.active = true
                item.parent = container

                const data: IExchangeInfo = d
                const exchangeNum = data.exchangeItemList[0].exchangeNum
                const exchangeItem = data.exchangeItemList[0].exchangeItem
                const gainItem = data.gainItemList[0].gainItem

                cc.find("name", item).getComponent(cc.Label).string = data.goodsName
                cc.find("number", item).getComponent(cc.Label).string = exchangeNum >= 10000 ? exchangeNum / 10000 + "万" : exchangeNum + ""

                NodeExtends.setNodeSpriteNet({ node: cc.find("icon", item), url: data.goodsImg })

                const needIcon = cc.find("needIcon_" + exchangeItem, item)
                if (needIcon) {
                    needIcon.active = true
                }

                cc.find("exchangeTip", item).active = gainItem == 0

                const limitVip = data.limitVip
                if (gainItem != -3 && limitVip > 0) {
                    cc.find("nodeLimit", item).active = true
                    cc.find("nodeLimit/labelLimit", item).getComponent(cc.Label).string = "VIP" + limitVip
                }

                const limitCount = data.limitCount
                if (gainItem != -3 && limitCount > 0) {
                    const tip = cc.find("labelTip", item)
                    tip.active = true
                    if (limitVip == 0) {
                        tip.getComponent(cc.Label).string = "VIP等级≥1, 每日可兑换" + limitCount + "次"
                    } else {
                        tip.getComponent(cc.Label).string = "VIP等级≥" + limitVip + ", 每日可兑换" + limitCount + "次"
                    }
                }

                const event = new cc.Component.EventHandler()
                event.target = this.node
                event.component = "ShopScene"
                event.handler = "onPressItem"
                event.customEventData = data as any
                item.getComponent(cc.Button).clickEvents.push(event)
            }
        }
    }

    onPressItemAd(sender: cc.Event.EventTouch, data: { index: number, number: number, adindex: number }) {
        cc.audioEngine.playEffect(DataManager.Instance.menuEffect, false)
        const target = sender.target

        if (getAdLeftTimes(data.adindex) <= 0) {
            return
        }

        const updateItem = () => {
            if (target.isValid) {
                const isAdValid = getAdLeftTimes(data.adindex) > 0

                cc.find("extra/over", target).active = !isAdValid
                cc.find("extra/valid", target).active = isAdValid
            }
        }

        if (getNextAdMethod(data.adindex) == 0) {
            receiveAdAward(data.adindex, updateItem)
        } else {
            data.callback = updateItem
            SceneManager.Instance.popScene("moduleLobby", "AdAwardPop", data)
        }
    }

    checkCanExchange(data: IExchangeInfo) {
        const exchangeItem = data.exchangeItemList[0].exchangeItem
        const exchangeItemNum = data.exchangeItemList[0].exchangeNum
        const gainItem = data.gainItemList[0].gainItem

        if (DataManager.UserData.getItemNum(exchangeItem) < exchangeItemNum) {
            if (exchangeItem == 365) {
                SceneManager.Instance.popScene("moduleLobby", "RPUnenoughGuidePop")
            } else if (exchangeItem == 372) {
                if (!checkAdCanReceive(AdsConfig.taskAdsMap.DrawDiamond)) {
                    iMessageBox("您当前的钻石不足")
                } else {
                    SceneManager.Instance.popScene("moduleLobby", "UnenoughDiamondPop")
                }
            } else {
                iMessageBox("您当前的兑换道具不足")
            }

            return false
        }

        if (DataManager.CommonData["VipData"].vipLevel < data.limitVip) {
            const initParam = {
                title: "提示",
                content: "<color=#874612><size=30><b>无法兑换，您的VIP等级不足</b></size></color>\n\r\n\r" +
                    "<color=#a07f61><size=24>VIP等级≥" + data.limitVip + "才可以兑换" + data.goodsName +
                    "\n\r您当前VIP等级为" + DataManager.CommonData["VipData"].vipLevel + "</size></color>",
                confirmClose: true,
                confirmFunc: () => {
                    SceneManager.Instance.popScene("moduleLobby", "VipInfoPop")
                },
                maskCanClose: false,
                confirmTexture: DataManager.Instance.getSpriteFrame("common", "btn_show_vip"),
                closeTexture: DataManager.Instance.getSpriteFrame("common", "btn_ok")
            }
            MsgBox(initParam)

            return false
        }

        if (data.exchangeCount == data.limitCount) {
            let content = "<color=#874612><size=30><b>您今日的兑换次数已用完</b></size></color>\n\r\n\r" +
                "<color=#a07f61><size=24>" + data.goodsName + "每日限兑换" + data.limitCount + "次</size></color>"

            if (data.limitType == 1) {
                content = "<color=#874612><size=30><b>此道具兑换次数已用完</b></size></color>\n\r\n\r" +
                    "<color=#a07f61><size=24>" + data.goodsName + "累计限兑换" + data.limitCount + "次</size></color>"
            }

            if (data.limitVip == 0 && DataManager.CommonData["VipData"].vipLevel == 0) {
                content = "<color=#874612><size=30><b>VIP0玩家累计仅能兑换1次</b></size></color>\n\r\n\r" +
                    "<color=#a07f61><size=24>请充值提升VIP等级后再来兑换</size></color>"
            }

            const initParam = {
                title: "提示",

                content: content,
                confirmClose: true,
                confirmFunc: () => {
                    SceneManager.Instance.popScene("moduleLobby", "VipInfoPop")
                },
                maskCanClose: false,
                confirmTexture: DataManager.Instance.getSpriteFrame("common", "btn_show_vip"),
                closeTexture: DataManager.Instance.getSpriteFrame("common", "btn_ok"),
            }
            MsgBox(initParam)
            return false
        }

        if (gainItem == -3 && !checkPhoneBinding()) {
            return false
        }

        return true
    }

    onPressItem(sender, data: IExchangeInfo) {
        cc.audioEngine.playEffect(DataManager.Instance.menuEffect, false)
        if (this.checkCanExchange(data)) {
            if (data.gainItemList[0].gainItem == -3) {
                SceneManager.Instance.popScene("moduleLobby", "ExchangeConfirm4Pop", data)
            } else {
                exchangeAward(data.goodsId)
            }
        }
    }

    updateState() {
        const leftTimes = getAdLeftTimes(AdsConfig.taskAdsMap.DrawDiamond)
        const drawNum = cc.find("nodeContent/btnFreeDraw/drawNum", this.node)
        const btn_draw_diamond = cc.find("nodeContent/btnFreeDraw/btn_draw_diamond", this.node)
        drawNum.getComponent(cc.Label).string = `今日剩余次数:${leftTimes}`
        if (leftTimes == 0) {
            btn_draw_diamond.active = false
            drawNum.y = btn_draw_diamond.y
        }

        //todo 记录红点
        // DataManager.save(DataManager.UserData.guid + "shopPop", 2)
        console.log("jin---updateState :")
        DataManager.CommonData[DataManager.UserData.guid + "shopPop"] = true
        DataManager.save(DataManager.UserData.guid + "shopPop", true)
    }

    onPressDraw() {
        cc.audioEngine.playEffect(DataManager.Instance.menuEffect, false)
        receiveAdAward(AdsConfig.taskAdsMap.DrawDiamond, () => {
            this.isValid && this.updateState()
        })
    }

    onPressBuy(sender, data: IShopBox) {
        cc.audioEngine.playEffect(DataManager.Instance.menuEffect, false)
        payOrder(data, ()=>{
            let awards = [
            ]
            for (const iterator of data.content) {
                let award = {
                    index: iterator.idx,
                    num: iterator.num
                }
                awards.push(award)
            }

            showAwardResultPop(awards)
        })
    }

    onCloseScene() {
        // czcEvent("大厅-商城-关闭")
        SceneManager.Instance.sendMessageToScene({ opcode: "onAdConfigUpdate"})
    }
}