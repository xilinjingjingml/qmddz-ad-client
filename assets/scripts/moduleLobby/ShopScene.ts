import { AdsConfig } from "../base/baseData/AdsConfig"
import DataManager from "../base/baseData/DataManager"
import { checkPhoneBinding, getNameByItemId, getSpriteByItemId, iMessageBox, MsgBox, payOrder } from "../base/BaseFuncTs"
import BaseScene from "../base/baseScene/BaseScene"
import SceneManager from "../base/baseScene/SceneManager"
import { checkAdCanReceive, exchangeAward, getAdLeftTimes, getAdTotalTimes, getNextAdMethod, receiveAdAward } from "./LobbyFunc"
import { ITEM } from "../base/baseData/ItemConfig"
import { NodeExtends } from "../base/extends/NodeExtends"

const { ccclass } = cc._decorator

enum ShopType {
    None = -1,
    Free,
    Prop,
    CallsCost,
    GoldBean,
    Diamond,
    Max,
}

@ccclass
export default class ShopScene extends BaseScene {

    // 0:免费 1:道具 2:话费 3:金豆 4:钻石
    tab: ShopType = ShopType.Free
    datas: any = {}
    isStartOnPress: boolean = false

    onOpenScene() {
        this.updateState()
        if (this.initParam["type"] == null && this.initParam["sceneParam"] != null) {
            this.initParam["type"] = this.initParam["sceneParam"]
        }

        if (this.initParam["type"]) {
            this.tab = parseInt(this.initParam["type"])
        }

        if (this.tab <= ShopType.None || this.tab >= ShopType.Max) {
            this.tab = ShopType.Free
        }

        this.initData()
        cc.find("nodeTab/content", this.node).children[this.tab].getComponent(cc.Toggle).isChecked = true
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

        const isExchange = this.tab == ShopType.Prop || this.tab == ShopType.CallsCost
        cc.find("nodeTop/shop_title", this.node).active = !isExchange
        cc.find("nodeTop/exchange_title", this.node).active = isExchange

        this.initContent()
    }

    initData() {
        for (var index = ShopType.None + 1; index < ShopType.Max; ++index) {
            let data = null
            if (index == ShopType.Free) {
                data = AdsConfig.getAwards()
            } else if (index == ShopType.Diamond) {
                data = DataManager.Instance.NormalBoxs.filter(item => item.content.length > 0 && item.content[0].idx == ITEM.DIAMOND)
            } else {
                const infos = DataManager.CommonData["ExchangeInfo"]

                if (!infos) {
                    continue
                }

                if (index == ShopType.Prop) {
                    data = infos.filter(item => {
                        return item.exchangeItemList[0].exchangeItem == 365 && [-3, -4, -6].indexOf(item.gainItemList[0].gainItem) == -1
                    })
                } else if (index == ShopType.CallsCost) {
                    data = infos.filter(item => {
                        return item.exchangeItemList[0].exchangeItem == 365 && item.gainItemList[0].gainItem == -3 && item.gainItemList[0].gainNum >= 20
                    })
                } else if (index == ShopType.GoldBean) {
                    data = infos.filter(item => {
                        return item.exchangeItemList[0].exchangeItem == 372
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
            } else if (this.tab == ShopType.Diamond) {
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
    }

    onPressDraw() {
        cc.audioEngine.playEffect(DataManager.Instance.menuEffect, false)
        receiveAdAward(AdsConfig.taskAdsMap.DrawDiamond, () => {
            this.isValid && this.updateState()
        })
    }

    onPressBuy(sender, data: IShopBox) {
        cc.audioEngine.playEffect(DataManager.Instance.menuEffect, false)
        payOrder(data)
    }
}