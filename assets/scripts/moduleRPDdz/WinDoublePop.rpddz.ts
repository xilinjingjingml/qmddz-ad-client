import BaseComponent from "../base/BaseComponent"
import { AdsConfig } from "../base/baseData/AdsConfig"
import DataManager from "../base/baseData/DataManager"
import { czcEvent, playADBanner, showAwardResultPop } from "../base/BaseFuncTs"
import NetManager from "../base/baseNet/NetManager"
import { getAdLeftTimes, receiveAdAward, sendReloadUserData } from "../moduleLobby/LobbyFunc"
import AudioManager from "./AudioManager.rpddz"
import GameLogic from "./GameLogic.rpddz"

const { ccclass } = cc._decorator

@ccclass
export default class WinDoublePop extends BaseComponent {
    initParam: Iproto_gc_win_doubel_req
    is_get: boolean = false

    onLoad() {
        czcEvent("斗地主", "赢金翻倍", "打开")
        if (DataManager.Instance.getOnlineParamSwitch("game_mask")) {
            this.node.getChildByName("mask").getComponent(cc.Button).interactable = false
        }
        if (DataManager.Instance.getOnlineParamSwitch("WinDoubleLabelCloseABTest", 1)) {
            this.node.runAction(cc.sequence([cc.callFunc(() => { this.$("label").active = false }), cc.delayTime(3), cc.callFunc(() => { this.$("label").active = true })]))
        }
        if (DataManager.Instance.getOnlineParamSwitch("WinDoubleCloseABTest", 1)) {
            this.node.runAction(cc.sequence([cc.callFunc(() => { this.$("btnClose").active = false }), cc.delayTime(3), cc.callFunc(() => { this.$("btnClose").active = true })]))
        }

        this.$("add_money_8").active = this.initParam.nAddAmount == 80000
        this.$("add_money_20").active = this.initParam.nAddAmount == 200000
        this.$("add_money_probability").active = this.initParam.nAddProbabily > 0
        this.$("label", cc.Label).string = `(剩余${getAdLeftTimes(AdsConfig.taskAdsMap.WinDouble)}次，本次不领作废哦)`
    }

    start() {
        playADBanner(true, AdsConfig.banner.WinDouble)
    }

    onPressGet(sender: cc.Event.EventTouch) {
        czcEvent("斗地主", "赢金翻倍", "点击")
        this.$("add_money_probability").active = this.initParam.nAddProbabily > 0
        receiveAdAward(AdsConfig.taskAdsMap.WinDouble, () => {
            this.proto_cg_win_doubel_req()
        })
    }

    proto_cg_win_doubel_req() {
        czcEvent("斗地主", "赢金翻倍", "领取请求")
		AudioManager.playButtonSound()
        this.is_get = true
        GameLogic.Instance().sendMessage<Iproto_cg_win_doubel_req>({
            opcode: 'proto_cg_win_doubel_req',
        })
    }

    proto_gc_win_doubel_ack(event: { packet: Iproto_gc_win_doubel_ack }) {
        const message = event.packet
        if (message.cRet == 0) {
            czcEvent("斗地主", "赢金翻倍", "领取成功")
            const awards = []
            message.vecItemInfo.forEach(info => awards.push({ index: info.nItemIndex, num: info.nItemNum }))
            showAwardResultPop(awards)
            sendReloadUserData()
        } else {
            czcEvent("斗地主", "赢金翻倍", "领取失败" + message.cRet)
        }
        this.closeSelf()
    }

    onBannerResize(msg) {
        cc.log("WinDoublePop.onBannerResize", msg.rect.height)
        const box = cc.find("nodePop/label", this.node).getBoundingBoxToWorld()
        const diff = msg.rect.height - box.y
        if (diff > 0) {
            cc.find("nodePop", this.node).y += diff
        }
    }

    onCloseScene() {
        NetManager.Instance.onMessage({ opcode: "GameResult_PopupManager" })
        czcEvent("斗地主", "赢金翻倍", "关闭")
    }

    onDestroy() {
        if (!this.is_get) {
            receiveAdAward(AdsConfig.taskAdsMap.WinDouble, null, null, false, 0)
        }
        playADBanner(false, AdsConfig.banner.WinDouble)
    }
}
