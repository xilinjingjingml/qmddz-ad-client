import BaseComponent from "../base/BaseComponent"
import { AdsConfig } from "../base/baseData/AdsConfig"
import { iMessageBox, showAwardResultPop } from "../base/BaseFuncTs"
import { getADDraw, sendReloadUserData } from "../moduleLobby/LobbyFunc"
import GameLogic from "./GameLogic.rpddz"
import * as proto from "./proto/client.rpddz"

const { ccclass, property } = cc._decorator

@ccclass
export default class RegainLosePop extends BaseComponent {
    tips1: cc.Node
    tips2: cc.Node
    label_money: cc.Node
    btn_text_ad: cc.Node
    btn_text_free: cc.Node
    label_time: cc.Node
    label2: cc.Node
    regainLose: proto.Iproto_gc_regain_lose_score_ack

    onLoad() {
        this.regainLose = GameLogic.Instance().gamescene.regainLose

        let money = 0
        this.regainLose.nValue.forEach(n => money += n)
        if (money > 10000) {
            this.label_money.getComponent(cc.Label).string = "" + Math.floor(money / 1000) / 10
        } else {
            this.label_money.getComponent(cc.Label).string = "" + money
            this.label2.getComponent(cc.Label).string = "金豆"
        }

        this.tips1.active = this.regainLose.nValue.length <= 1
        this.tips2.active = this.regainLose.nValue.length > 1
        this.btn_text_ad.active = true
        this.btn_text_free.active = false
        this.refreshTime()
    }

    refreshTime() {
        const regainLose = GameLogic.Instance().gamescene.regainLose
        this.label_time.active = regainLose.nValue.length > 1
        this.label_time.getComponent(cc.Label).string = (regainLose.nCurCount + 1) + "/" + regainLose.nValue.length
    }

    onPressGet() {
        getADDraw(AdsConfig.taskAdsMap.Exemption, () => {
            GameLogic.Instance().sendMessage({
                opcode: 'proto_cg_regain_lose_score_req',
                nOp: 1,
            })
        })
    }

    proto_gc_regain_lose_score_ack(event) {
        const message: proto.Iproto_gc_regain_lose_score_ack = event.packet
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
}
