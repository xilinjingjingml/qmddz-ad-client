import BaseComponent from "../base/BaseComponent"
import { AdsConfig } from "../base/baseData/AdsConfig"
import DataManager from "../base/baseData/DataManager"
import { ITEM } from "../base/baseData/ItemConfig"
import { iMessageBox, showAwardResultPop } from "../base/BaseFuncTs"
import { NodeExtends } from "../base/extends/NodeExtends"
import { checkAdCanReceive, receiveAdAward } from "../moduleLobby/LobbyFunc"
import AudioManager from "./AudioManager.rpddz"
import GameLogic from "./GameLogic.rpddz"

const { ccclass } = cc._decorator

@ccclass
export default class BaiYuanHBRoundPop extends BaseComponent {
    initParam: Iproto_gc_baiyuan_hb_round_award_not

    onOpenScene() {
        const num = this.initParam.vecItemInfo[0].nItemNum
        this.$("labelMoney", cc.Label).string = GameLogic.Instance().turnBaiYuan(num).toFixed(2) + "元"

        this.updateUserData()

        this.$("nodeFinger").active = DataManager.Instance.getOnlineParamGray("BaiYuanHBRound_finger", true)
        this.$("btnClose").active = DataManager.Instance.getOnlineParamGray("BaiYuanHBRound_close", true)
        DataManager.Instance.getOnlineParamGray("BaiYuanHBRound_close_delayShow", true) && NodeExtends.delayShow(this, this.$("btnClose"))
    }

    start() {
        this.$("shou1", sp.Skeleton).setAnimation(0, "animation", false)

        const award = this.$("nodeAward")
        award.opacity = 0
        award.runAction(cc.sequence(
            cc.delayTime(0.8),
            cc.fadeIn(0.3)
        ))
    }

    updateUserData() {
        const num = DataManager.UserData.getItemNum(ITEM.TO_CASH)
        this.$("label_money_now", cc.Label).string = GameLogic.Instance().turnBaiYuan(num).toFixed(2) + "元"
    }

    onPressGet(event: cc.Event.EventTouch) {
        AudioManager.playButtonSound()
		NodeExtends.cdButton(event, 1)

        if (checkAdCanReceive(AdsConfig.taskAdsMap.New_GameRedPacket)) {
            receiveAdAward(AdsConfig.taskAdsMap.New_GameRedPacket, this.proto_cg_baiyuan_hb_round_award_req.bind(this))
        } else {
            this.proto_cg_baiyuan_hb_round_award_req()
        }
    }

    proto_cg_baiyuan_hb_round_award_req() {
        GameLogic.Instance().sendMessage<Iproto_cg_baiyuan_hb_round_award_req>({
            opcode: "proto_cg_baiyuan_hb_round_award_req"
        })
    }

    proto_gc_baiyuan_hb_round_award_ack(event: { packet: Iproto_gc_baiyuan_hb_round_award_ack }) {
        const messge = event.packet
        if (messge.cRet == 0) {
            const awards = []
            messge.vecItemInfo.forEach(info => awards.push({ index: info.nItemId, num: info.nItemNum }))
            showAwardResultPop(awards, { closeCallback: this.closeSelf.bind(this) })
        } else {
            iMessageBox("领取失败！")
        }
    }
}
