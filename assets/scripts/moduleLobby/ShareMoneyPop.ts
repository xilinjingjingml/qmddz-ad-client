import DataManager from "../base/baseData/DataManager"
import { iMessageBox, MsgBox, setNodeSpriteQRCodeShareMoney } from "../base/BaseFuncTs"
import BaseScene from "../base/baseScene/BaseScene"
import SceneManager from "../base/baseScene/SceneManager"
import TableView from "../base/components/TableView"
import { UserExtends } from "../base/extends/UserExtends"
import PluginManager from "../base/PluginManager"
import { exchangeAward, loadShareMoney, sendReloadUserData } from "./LobbyFunc"
import { NodeExtends } from "../base/extends/NodeExtends"
import { http } from "../base/utils/http"
import { time } from "../base/utils/time"
import { functions } from "../base/utils/functions"
import { math } from "../base/utils/math"

const { ccclass } = cc._decorator

@ccclass
export default class ShareMoneyPop extends BaseScene {
    private _$: object

    onLoad() {
        this._$ = functions.mark(this.node)
        loadShareMoney()
    }

    start() {
        this.refreshUI()

        // 时间
        const oneHour = 60 * 60
        const oneDay = 24 * oneHour
        const time = DataManager.CommonData.shareMoneyData.shareMoney[0].sm_time - Math.floor(new Date().getTime() / 1000)
        let str = ""
        const day = Math.floor(time / oneDay)
        if (day > 0) {
            str += `<color=#ffffff> ${day} </color>天`
        }
        const hour = Math.floor((time - day * oneDay) / oneHour)
        if (hour > 0) {
            str += `<color=#ffffff> ${hour} </color>小时`
        }
        this.$("label_time", cc.RichText).string = str + "后现金将失效"

        // 二维码
        setNodeSpriteQRCodeShareMoney(this.$("spr_code"))

        // 兑换榜
        this.showRank()
    }

    refreshUI() {
        const shareMoney = DataManager.CommonData.shareMoneyData.shareMoney[0]

        // 金额
        this.$("label_money", cc.Label).string = shareMoney.sm_money + "元"

        // 已完成
        this.$("node_finish").active = shareMoney.sm_money >= 100

        // 按钮
        this.$("btn_share").active = shareMoney.sm_money < 100
        this.$("btn_tocash").active = shareMoney.sm_money >= 100 && DataManager.UserData.getItemNum(331) >= 100
        this.$("btn_review").active = shareMoney.sm_money >= 100 && DataManager.UserData.getItemNum(331) < 100
    }

    updateShareMoney() {
        this.refreshUI()
    }

    updateUserData() {
        this.refreshUI()
    }

    /**
     * 获取子节点或组件
     */
    $(name: string): cc.Node
    $<T extends cc.Component>(name: string, type: { prototype: T }): T
    $<T extends cc.Component>(name: string, type?: { prototype: T }) {
        const node = this._$[name] || cc.find(name, this.node)
        return node && type ? node.getComponent(type) : node
    }

    onPressOpenRecord() {
        cc.audioEngine.playEffect(DataManager.Instance.menuEffect, false)
        SceneManager.Instance.popScene("moduleLobby", "ShareMoneyRecordPop")
    }

    onPressOpenToCash() {
        cc.audioEngine.playEffect(DataManager.Instance.menuEffect, false)
        this.closeSelf()
        SceneManager.Instance.popScene("moduleLobby", "ShareMoneyTaskPop")
    }

    onPressOpenCode() {
        cc.audioEngine.playEffect(DataManager.Instance.menuEffect, false)
        SceneManager.Instance.popScene("moduleLobby", "ShareMoneyCodePop")
    }

    onPressShare() {
        cc.audioEngine.playEffect(DataManager.Instance.menuEffect, false)
        SceneManager.Instance.popScene("moduleLobby", "ShareMoneySharePop")
    }

    onPressToCash() {
        cc.audioEngine.playEffect(DataManager.Instance.menuEffect, false)
        // 检测手机绑定
        if (!this.checkCanExchangePhoneBind()) {
            return
        }

        // 检测微信绑定
        if (!this.checkCanExchangeWeiXin()) {
            return
        }

        // 去兑换
        const infos = DataManager.CommonData["ExchangeInfo"]
        const datas = infos.filter(item => {
            const exchangeItem = item.exchangeItemList[0]
            return exchangeItem && exchangeItem.exchangeItem == 331 && exchangeItem.exchangeNum == 100
        })

        if (datas.length <= 0) {
            iMessageBox("兑换道具库不足")
            return
        }

        exchangeAward(datas[0].goodsId, sendReloadUserData)
    }

    onPressReview() {
        cc.audioEngine.playEffect(DataManager.Instance.menuEffect, false)
        iMessageBox("我们将在5个工作日内完成审核，请耐心等待")
    }

    onPressClose() {
        cc.audioEngine.playEffect(DataManager.Instance.menuEffect, false)
        this.closeSelf()
    }

    checkCanExchangePhoneBind() {
        if (DataManager.CommonData["bindPhone"].hasBindMoble == 1) {
            return true
        }

        SceneManager.Instance.popScene("moduleLobby", "BindPhonePop")
        return false
    }

    // 检测微信绑定
    checkCanExchangeWeiXin() {
        if (DataManager.CommonData.ifBindWeixin) {
            return true
        }

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

        return false
    }

    PluginSessionCallBack(message: any): void {
        cc.log("[PersionScene.PluginSessionCallBack] data", message.data)
        if (DataManager.CommonData['isBindingWX']) {
            DataManager.CommonData['isBindingWX'] = false
            const data: { SessionResultCode: number, msg: string, sessionInfo: any } = JSON.parse(message.data)
            if (data.SessionResultCode == 0) {
                this.bindWeixin(data.sessionInfo)
            }
        }
    }

    bindWeixin(sessionInfo: any) {
        const url = DataManager.getURL("BIND_WEIXIN")
        const param = {
            visitorUid: DataManager.UserData.guid,
            ticket: DataManager.UserData.ticket,
            gameid: DataManager.Instance.gameId,
            weixinUid: sessionInfo.pid,
            openId: sessionInfo.openId,
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

    showRank() {
        const uids = []
        const addUids = (uid: number, num: number) => {
            for (let i = 0; i < num; i++) {
                uids.push(uid + i)
            }
        }
        if (DataManager.Instance.CurENV === 0) {
            addUids(993890100000001, 9)
        } else {
            addUids(993891010000001, 30)
        }

        for (let i = 0; i < uids.length; i++) {
            const rand = Math.floor(Math.random() * uids.length)
            const value = uids[i]
            uids[i] = uids[rand]
            uids[rand] = value
        }
        if (uids.length > 4) {
            uids.length = 4
        }

        UserExtends.getUserInfos(uids, infos => {
            if (!this.node.isValid) {
                return
            }

            this._showRank(infos)
        })
    }

    _showRank(list: { nickname: string, face: string }[]) {
        const now = new Date()
        let t
        if (now.getHours() < 8) {
            t = time.format("yyyy.mm.dd", Math.floor(now.getTime() / 1000) - 1 * 24 * 60 * 60)
        } else {
            t = time.format("yyyy.mm.dd", Math.floor(now.getTime() / 1000))
        }

        // 显示界面
        const tableView = this.$("scrollview").getComponent(TableView)
        tableView.datas = list
        tableView.item = this.$("item")
        tableView.updateItem = (item: cc.Node, data: { nickname: string, face: string }, index: number) => {
            const $ = functions.mark(item)

            functions.find($, "label_name", cc.Label).string = data.nickname

            functions.find($, "label_count", cc.Label).string = `邀请${math.random(10, 834)}名好友获得100元现金`

            functions.find($, "label_time", cc.Label).string = t

            // 头像
            NodeExtends.setNodeSpriteNet({ node: functions.find($, "face"), url: data.face })
        }
        tableView.updateView()
    }
}
