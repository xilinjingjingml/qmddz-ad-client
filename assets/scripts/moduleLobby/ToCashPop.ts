import DataManager from "../base/baseData/DataManager"
import { czcEvent, iMessageBox, MsgBox } from "../base/BaseFuncTs"
import BaseScene from "../base/baseScene/BaseScene"
import SceneManager from "../base/baseScene/SceneManager"
import PluginManager from "../base/PluginManager"
import { exchangeAward } from "./LobbyFunc"
import { http } from "../base/utils/http"
import PopupQueue from "../base/utils/PopupQueue"

const { ccclass } = cc._decorator

interface IConfig {
    name: string
    newbie?: boolean
    gain?: { id: number, num: number }
    tips?: string
    exchangeTips?: string
    condition?: { loginCount?: number, gameCount?: number, once?: boolean }
}

@ccclass
export default class ToCashPop extends BaseScene {
    popupQuene: PopupQueue
    configs: IConfig[] = [
        {
            name: "0.3元",
            newbie: true,
            gain: { id: -6, num: 3 },
            tips: "新人专享",
            exchangeTips: "1.新人登录专享\n2.每人仅可兑换一次",
            condition: {
                once: true,
            }
        }, {
            name: "1元",
            newbie: true,
            gain: { id: -4, num: 1 },
            tips: "游戏50局",
            exchangeTips: "1.登录5天\n2.累计游戏50局\n3.每人仅可兑换一次",
            condition: {
                loginCount: 5,
                gameCount: 50,
                once: true,
            }
        }, {
            name: "更多金额",
        }
    ]
    datas: { [key: string]: { config: IConfig, info: IExchangeInfo, can: boolean } } = {}
    toggleId: string = ""
    eventName: string

    onOpenScene() {
        this.eventName = (this.initParam.isGuideToCash ? "引导" : "") + "提现"
        czcEvent("大厅", this.eventName, "打开")
        this.configs = DataManager.Instance.onlineParam.GuideToCashConfigs || this.configs
        this.updateUserData()
        this.initToggle()

        if (this.initParam.isGuideToCash) {
            this.popupQuene = new PopupQueue()
            this.popupQuene.add(this.checkShowPopup_GuideBubblePop2.bind(this))
            this.popupQuene.add(this.checkShowPopup_GuideBubblePop3.bind(this))
            this.popupQuene.add(this.checkShowPopup_GuideBubblePop4.bind(this))
            this.popupQuene.showPopup()
        }
    }

    updateUserData() {
        const num = DataManager.UserData.getItemNum(365)
        cc.find("nodePop/node_redpacket/label_redpacket", this.node).getComponent(cc.Label).string = num + ""
        cc.find("nodePop/node_redpacket/spt_money_bg/label_money", this.node).getComponent(cc.Label).string = `≈${Math.floor(num / 100) / 100}元`
    }

    initToggle() {
        for (let i = 2; i >= 0; i--) {
            const node = cc.find("nodePop/node_cash/toggleContainer/toggle" + (i + 1), this.node)

            const config = this.configs[i]
            if (config == null) {
                node.active = false
                continue
            }

            cc.find("Background/label", node).getComponent(cc.Label).string = config.name
            cc.find("checkmark/label", node).getComponent(cc.Label).string = config.name
            if (config.newbie) {
                cc.find("btn_tips", node).active = true
                cc.find("btn_tips/label", node).getComponent(cc.Label).string = config.tips
            } else {
                cc.find("btn_tips", node).active = false
            }

            const id = i + ""
            const toggle = node.getComponent(cc.Toggle)
            const event = new cc.Component.EventHandler()
            event.target = this.node
            event.component = "ToCashPop"
            event.handler = "onPressToggle"
            event.customEventData = id
            toggle.clickEvents.push(event)

            if (config.gain == null) {
                continue
            }

            const info = this.getExchangeInfo(config)
            if (info == null) {
                node.active = false
                continue
            }

            const can = !(config.condition && config.condition.once && info.exchangeCount > 0)
            this.datas[id] = { config: config, info: info, can: can }
            if (can) {
                toggle.isChecked = true
                this.onPressToggle(null, id)
            }
        }
    }

    getExchangeInfo(config: IConfig) {
        for (const info of DataManager.CommonData.ExchangeInfo) {
            const gainItem = info.gainItemList[0]
            if (gainItem.gainItem == config.gain.id && gainItem.gainNum == config.gain.num) {
            } else {
                continue
            }

            return info
        }
    }

    onPressToggle(event: cc.Event.EventTouch, id: string) {
        const data = this.datas[id]
        if (data == null) {
            SceneManager.Instance.popScene<String>("moduleLobby", "ShopScene", {
                sceneParam: "2",
                closeCallback: this.initParam.closeCallback
            })

            this.initParam.closeCallback = null
            this.closeSelf()
            return
        }

        this.toggleId = id

        cc.find("nodePop/btn_get", this.node).active = data.can
        cc.find("nodePop/btn_geted", this.node).active = !data.can

        const node_rules = cc.find("nodePop/node_cash/node_rules", this.node)
        const tips = data.config.exchangeTips.split("\n")
        if (tips.length == 0) {
            node_rules.active = false
        } else {
            node_rules.active = true
            node_rules.getComponent(cc.Layout).spacingY = tips.length == 2 ? 10 : 5
            node_rules.children.forEach((node: cc.Node, i: number) => {
                node.active = !!tips[i]
                if (tips[i]) {
                    node.getComponent(cc.Label).string = tips[i]
                }
            })
        }
    }

    onPressGet() {
        const data = this.datas[this.toggleId]

        const exchange = data.info.exchangeItemList[0]
        if (DataManager.UserData.getItemNum(exchange.exchangeItem) < exchange.exchangeNum) {
            iMessageBox("您当前的道具不足")
            return
        }

        const condition = data.config.condition
        if (condition.loginCount) {
            const value = condition.loginCount - DataManager.CommonData.morrow - 1
            if (value > 0) {
                iMessageBox(`还需登录${value}天才可提现哦~`)
                return
            }
        }

        if (condition.gameCount) {
            const value = condition.gameCount - DataManager.CommonData["roleCfg"]["roundSum"]
            if (value > 0) {
                iMessageBox(`还需游戏${value}局才可提现哦~`)
                return
            }
        }

        if (DataManager.CommonData.bindPhone && DataManager.CommonData.bindPhone.hasBindMoble == 1) {
        } else {
            SceneManager.Instance.popScene("moduleLobby", "BindPhonePop")
            return
        }

        if (DataManager.CommonData.ifBindWeixin) {
        } else {
            MsgBox({
                content: "<color=#a07f61>红包将提现到您的微信账号，请先绑定\n微信号</c>",
                fontSize: 30,
                buttonNum: 1,
                clickMaskToClose: true,
                confirmText: "前往绑定",
                confirmClose: true,
                confirmFunc: () => {
                    DataManager.CommonData['isBindingWX'] = true
                    PluginManager.login({ sessionType: "SessionWeiXin" })
                }
            })
            return
        }

        exchangeAward(data.info.goodsId, () => {
            SceneManager.Instance.popScene<String>("moduleLobby", "ToCashSharePop", {
                name: data.config.name,
                isGuideToCash: this.initParam.isGuideToCash,
                closeCallback: this.initParam.closeCallback
            })

            this.initParam.closeCallback = null
            this.closeSelf()
        })
    }

    PluginSessionCallBack(message: any): void {
        cc.log("[PersionScene.PluginSessionCallBack] data", message.data)
        if (!DataManager.CommonData['isBindingWX']) {
            return
        }

        DataManager.CommonData['isBindingWX'] = false
        const data: { SessionResultCode: number, msg: string, sessionInfo: any } = JSON.parse(message.data)
        if (data.SessionResultCode != 0) {
            return
        }

        const url = DataManager.getURL("BIND_WEIXIN")
        const param = {
            visitorUid: DataManager.UserData.guid,
            ticket: DataManager.UserData.ticket,
            gameid: DataManager.Instance.gameId,
            weixinUid: data.sessionInfo.pid,
            openId: data.sessionInfo.openId,
            type: 0,
        }
        http.open(url, param, (event: any) => {
            if (event) {
                if (event.ret == 1) {
                    MsgBox({
                        content: "该微信账号已存在，请先更换其他微信号，再进行绑定。",
                        buttonNum: 1,
                        confirmClose: true,
                    })
                    return
                }

                if (event.ret > 1) {
                    DataManager.CommonData["ifBindWeixin"] = true
                }
                iMessageBox(event.msg)
                PluginManager.login({ sessionType: DataManager.load("last_login_type") })
            } else {
                iMessageBox("绑定失败，请稍后再试！")
            }
        })
    }

    onCloseScene() {
        czcEvent("大厅", this.eventName, "关闭")
    }

    // 新人引导2
    checkShowPopup_GuideBubblePop2() {
        SceneManager.Instance.popScene<String>("moduleLobby", "GuideBubblePop", {
            noSing: true,
            name: "引导显示福卡",
            tips: "点击任意区域继续",
            bubble2: {
                node: cc.find("nodePop/node_redpacket", this.node),
                offect: cc.v2(-10, -120),
            },
            closeCallback: this.popupQuene.showPopup.bind(this.popupQuene)
        })
        return true
    }

    // 新人引导3
    checkShowPopup_GuideBubblePop3() {
        SceneManager.Instance.popScene<String>("moduleLobby", "GuideBubblePop", {
            noSing: true,
            name: "引导选择提取金额",
            tips: "点击任意区域继续",
            bubble1: {
                title: "选择提取金额",
                node: cc.find("nodePop/node_cash/toggleContainer", this.node),
                offect: cc.v2(-110, 135),
            },
            closeCallback: this.popupQuene.showPopup.bind(this.popupQuene)
        })
        return true
    }

    // 新人引导4
    checkShowPopup_GuideBubblePop4() {
        SceneManager.Instance.popScene<String>("moduleLobby", "GuideBubblePop", {
            noSing: true,
            name: "引导立即提现",
            tips: "",
            bubble1: {
                title: "立即提现",
                node: cc.find("nodePop/btn_get", this.node),
                offect: cc.v2(55, 135),
                callback: this.onPressGet.bind(this),
            },
            bubble3: {
                title: "获取更多福卡",
                node: cc.find("nodePop/node_close", this.node),
                offect: cc.v2(-220, -10),
                delayTime: 2,
                callback: this.closeSelf.bind(this)
            },
            maskClose: false,
            closeCallback: this.popupQuene.showPopup.bind(this.popupQuene)
        })
        return true
    }
}
