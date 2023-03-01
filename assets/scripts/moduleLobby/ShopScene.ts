import { AdsConfig } from "../base/baseData/AdsConfig"
import DataManager from "../base/baseData/DataManager"
import { checkPhoneBinding, getNameByItemId, getSpriteByItemId, iMessageBox, MsgBox } from "../base/BaseFuncTs"
import BaseScene from "../base/baseScene/BaseScene"
import SceneManager from "../base/baseScene/SceneManager"
import { checkAdCanReceive, exchangeAward, getAdLeftTimes, getNextAdType, receiveAdAward } from "./LobbyFunc"
import BaseFunc = require("../base/BaseFunc")

const { ccclass } = cc._decorator

@ccclass
export default class ShopScene extends BaseScene {

    // 0:免费 1:道具 2:话费 3:钻石
    tab: number = 0
    datas: any = {}

    onOpenScene() {
        if (this.initParam["type"] == null && this.initParam["sceneParam"] != null) {
            this.initParam["type"] = this.initParam["sceneParam"]
        }

        if (this.initParam["type"]) {
            this.tab = parseInt(this.initParam["type"])
        }

        if (this.tab < 0 || this.tab > 3) {
            this.tab = 0
        }

        this.initData()
        cc.find("nodeTab/content", this.node).children[this.tab].getComponent(cc.Toggle).isChecked = true
        this.onPressShop(null, this.tab)
    }

    onPressShop(sender, data) {
        this.tab = parseInt(data)

        const titles = cc.find("nodeTop/select_titles", this.node).children
        for (let i = 0; i < titles.length; ++i) {
            titles[i].active = this.tab == i
        }

        cc.find("nodeTop/shop_title", this.node).active = !(this.tab == 1 || this.tab == 2)
        cc.find("nodeTop/exchange_title", this.node).active = this.tab == 1 || this.tab == 2

        this.initContent()
    }

    initData() {
        for (var index = 0; index < 4; ++index) {
            let data = null
            if (index == 0) {
                data = AdsConfig.getAwards()
            } else {
                const infos = DataManager.CommonData["ExchangeInfo"]

                if (!infos) {
                    continue
                }

                if (index == 1) {
                    data = infos.filter(item => {
                        return item.exchangeItemList[0].exchangeItem == 365 && item.gainItemList[0].gainItem != -3
                    })
                } else if (index == 2) {
                    data = infos.filter(item => {
                        return item.exchangeItemList[0].exchangeItem == 365 && item.gainItemList[0].gainItem == -3
                    })
                } else if (index == 3) {
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
        const container = cc.find("nodeContent/nodeContainer/content", this.node)

        cc.find("nodeContent/btnTreasure", this.node).active = this.tab == 0

        const widget = cc.find("nodeContent/nodeContainer", this.node).getComponent(cc.Widget)
        widget.left = this.tab == 0 ? 350 : 0
        widget.updateAlignment()
        cc.find("nodeContent/nodeContainer/content", this.node).getComponent(cc.Widget).updateAlignment()

        container.removeAllChildren(true)

        for (const data of this.datas[this.tab] || []) {
            const item = cc.instantiate(model)
            item.active = true
            item.parent = container

            if (this.tab == 0) {
                cc.find("name", item).getComponent(cc.Label).string = getNameByItemId(data.index) + (data.number > 0 ? "*" + data.number : "")

                const nodeIcon = cc.find("icon", item)
                const originWidth = nodeIcon.width
                const originHeight = nodeIcon.height

                nodeIcon.getComponent(cc.Sprite).spriteFrame = getSpriteByItemId(data.index)
                nodeIcon.scale = Math.max(originWidth / nodeIcon.width, originHeight / nodeIcon.height)

                const isAdValid = getAdLeftTimes(data.adindex) > 0
                const type = getNextAdType(data.adindex)

                cc.find("extra/over", item).active = !isAdValid
                cc.find("extra/valid", item).active = isAdValid
                cc.find("extra/valid/sprShare", item).active = isAdValid && type == 1
                cc.find("extra/valid/sprVideo", item).active = isAdValid && type == 2

                item.data = data
                const event = new cc.Component.EventHandler()
                event.target = this.node
                event.component = "ShopScene"
                event.handler = "onPressItemAd"
                item.getComponent(cc.Button).clickEvents.push(event)
            } else {
                const exchangeNum = data.exchangeItemList[0].exchangeNum
                const exchangeItem = data.exchangeItemList[0].exchangeItem
                const gainItem = data.gainItemList[0].gainItem

                cc.find("name", item).getComponent(cc.Label).string = data.goodsName
                cc.find("number", item).getComponent(cc.Label).string = exchangeNum >= 10000 ? exchangeNum / 10000 + "万" : exchangeNum

                BaseFunc.SetFrameTextureNet(cc.find("icon", item).getComponent(cc.Sprite), data.goodsImg)

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

                item.data = data
                const event = new cc.Component.EventHandler()
                event.target = this.node
                event.component = "ShopScene"
                event.handler = "onPressItem"
                item.getComponent(cc.Button).clickEvents.push(event)
            }
        }
    }

    onPressItemAd(sender) {
        const target = sender.target
        const data = target.data

        if (getAdLeftTimes(data.adindex) <= 0) {
            return
        }

        const updateItem = () => {
            if (target.isValid) {
                const isAdValid = getAdLeftTimes(data.adindex) > 0
                const type = getNextAdType(data.adindex)

                cc.find("extra/over", target).active = !isAdValid
                cc.find("extra/valid", target).active = isAdValid
                cc.find("extra/valid/sprShare", target).active = isAdValid && type == 1
                cc.find("extra/valid/sprVideo", target).active = isAdValid && type == 2
            }
        }

        if (getNextAdType(data.adindex) == 0) {
            receiveAdAward(data.adindex, updateItem)
        } else {
            data.callback = updateItem
            SceneManager.Instance.popScene("moduleLobby", "AdAwardPop", data)
        }
    }

    checkCanExchange(data) {
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

    onPressItem(sender) {
        const data = sender.target.data
        if (this.checkCanExchange(data)) {
            if (data.gainItemList[0].gainItem == -3) {
                SceneManager.Instance.popScene("moduleLobby", "ExchangeConfirm4Pop", data)
            } else {
                exchangeAward(data.goodsId)
            }
        }
    }
}