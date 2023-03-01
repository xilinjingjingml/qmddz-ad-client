import BaseComponent from "../base/BaseComponent"
import { AdsConfig } from "../base/baseData/AdsConfig"
import DataManager from "../base/baseData/DataManager"
import { czcEvent, iMessageBox, playADBanner, showAwardResultPop } from "../base/BaseFuncTs"
import NetManager from "../base/baseNet/NetManager"
import { receiveAdAward, sendReloadUserData } from "../moduleLobby/LobbyFunc"
import GameLogic from "./GameLogic.rpddz"
import * as proto from "./proto/client.rpddz"

const { ccclass } = cc._decorator

@ccclass
export default class RegainLosePop extends BaseComponent {
    tips: cc.Node
    label_money: cc.Node
    label_time: cc.Node
    btnClose: cc.Node
    btn_get: cc.Node
    regainLose: proto.proto_gc_regain_lose_score_ack
    nState = 0

    onLoad() {
        if (DataManager.Instance.onlineParam.game_mask == 1) {
            this.node.getChildByName("mask").getComponent(cc.Button).interactable = false
        }
        const abTest = DataManager.Instance.onlineParam.RegainLoseCloseABTest
		if (typeof abTest == 'number' && Number(DataManager.UserData.guid) % abTest == 0) {
            this.node.runAction(cc.sequence([cc.callFunc(() => { this.btnClose.active = false }), cc.delayTime(3), cc.callFunc(() => { this.btnClose.active = true })]))
        }

        this.regainLose = GameLogic.Instance().gamescene.regainLose

        let money = 0
        this.regainLose.nValue.forEach(n => money += n)
        if (money > 100000) {
            this.label_money.getComponent(cc.Label).string = Math.floor(money / 10000) + "w"
        } else {
            this.label_money.getComponent(cc.Label).string = money + ""
        }

        this.tips.active = this.regainLose.nValue.length > 1
        this.label_time.active = this.regainLose.nRet == 0 && this.regainLose.nValue.length > 1
        this.label_time.getComponent(cc.Label).string = `  ${(this.regainLose.nCurCount + 1)}/${this.regainLose.nValue.length}`

        let t = 0.8
        this.label_money.runAction(cc.repeatForever(cc.sequence([
            cc.scaleTo(t, 1.1).easing(cc.easeSineIn()),
            cc.scaleTo(t, 1).easing(cc.easeSineIn()),
        ])))

        t = 0.05
        this.btn_get.runAction(cc.repeatForever(cc.sequence([
            cc.rotateTo(t, -3).easing(cc.easeCircleActionOut()),
            cc.rotateTo(t * 2, 3).easing(cc.easeCircleActionOut()),
            cc.rotateTo(t * 2, -3).easing(cc.easeCircleActionOut()),
            cc.rotateTo(t * 2, 3).easing(cc.easeCircleActionOut()),
            cc.rotateTo(t, 0).easing(cc.easeCircleActionOut()),
            cc.delayTime(1),
        ])))
    }

    start() {
        czcEvent("斗地主", "对局免输", "打开")
        playADBanner(true, AdsConfig.banner.RegainLose)
    }

    onPressGet() {
        this.nState = 1
        if (GameLogic.Instance().gamescene.regainLose.nRet == 2) {
            this.proto_cg_regain_lose_score_req()
            return
        }
        receiveAdAward(AdsConfig.taskAdsMap.Exemption, () => {
            this.proto_cg_regain_lose_score_req()
        })
    }

    onBannerResize(msg) {
        const box = cc.find("nodePop/btn_get", this.node).getBoundingBoxToWorld()
        const diff = msg.rect.height - box.y
        if (diff > 0) {
            cc.find("nodePop", this.node).y += diff
        }
    }

    proto_cg_regain_lose_score_req() {
        this.nState = 2
        GameLogic.Instance().sendMessage({
            opcode: 'proto_cg_regain_lose_score_req',
            nOp: 1,
        })
    }

    proto_gc_regain_lose_score_ack(event) {
        const message: proto.proto_gc_regain_lose_score_ack = event.packet
        cc.log(message)
        if (message.nRet == 0) {
            cc.log("倒计时剩余", message.nTime)
        } else if (message.nRet == 1) {
            showAwardResultPop([{ index: GameLogic.Instance().HONGBAO_GOLD_MONEY, num: this.regainLose.nValue[this.regainLose.nCurCount] }])
            sendReloadUserData()
            this.closeSelf()
        } else if (message.nRet < 0) {
            let msg = ""
            switch (message.nRet) {
                case -1:
                    msg = "没开启功能"
                    break;
                case -2:
                    msg = "游戏开始了"
                    break;
                case -3:
                    msg = "没有单次次数"
                    break;
                case -4:
                    msg = "超出时间"
                    break;
                case -5:
                    msg = "输的金额领完了"
                    break;
                case -6:
                    msg = "查询 超时"
                    break;
                case -7:
                    msg = "每日次数用完了"
                    break;
                case -8:
                    msg = "查询 没有输的金额"
                    break;
                default:
                    break;
            }
            iMessageBox(msg)
            this.closeSelf()
        }
    }

    onCloseScene() {
        NetManager.Instance.onMessage({ opcode: "GameResult_PopupManager" })
        czcEvent("斗地主", "对局免输", ["直接关闭", "关闭广告", "领取"][this.nState])
    }

    onDestroy() {
        playADBanner(false, AdsConfig.banner.RegainLose)
    }
}
