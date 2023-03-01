import BaseComponent from "../base/BaseComponent"
import { AdsConfig } from "../base/baseData/AdsConfig"
import DataManager from "../base/baseData/DataManager"
import { iMessageBox, showAwardResultPop } from "../base/BaseFuncTs"
import { NodeExtends } from "../base/extends/NodeExtends"
import { checkAdCanReceive, getAdLeftTimes, receiveAdAward } from "../moduleLobby/LobbyFunc"
import AudioManager from "./AudioManager.rpddz"
import GameLogic from "./GameLogic.rpddz"

const { ccclass } = cc._decorator

@ccclass
export default class BaiYuanBankruptcyDefendPop extends BaseComponent {
    initParam: { message: Iproto_gc_baiyuan_can_bankruptcy_defend_ack }

    onOpenScene() {
        this.$("reliefNum", cc.Label).string = "+" + GameLogic.Instance().turnBaiYuan(this.initParam.message.vecItemInfo[0].nItemNum).toFixed(2)
        this.$("count", cc.Label).string = "" + getAdLeftTimes(AdsConfig.taskAdsMap.New_BankruptDefend)

        this.$("nodeFinger").active = DataManager.Instance.getOnlineParamGray("BaiYuanBankruptcyDefend_finger", false)
        this.$("btnClose").active = DataManager.Instance.getOnlineParamGray("BaiYuanBankruptcyDefend_close", true)
        DataManager.Instance.getOnlineParamGray("BaiYuanBankruptcyDefend_close_delayShow", false) && NodeExtends.delayShow(this, this.$("btnClose"))
    }

    onPressGet(event: cc.Event.EventTouch) {
        AudioManager.playButtonSound()
		NodeExtends.cdButton(event, 1)

        if (checkAdCanReceive(AdsConfig.taskAdsMap.New_BankruptDefend)) {
            receiveAdAward(AdsConfig.taskAdsMap.New_BankruptDefend, this.proto_cg_baiyuan_bankruptcy_defend_req.bind(this))
        } else {
            this.proto_cg_baiyuan_bankruptcy_defend_req()
        }
    }

    proto_cg_baiyuan_bankruptcy_defend_req() {
        GameLogic.Instance().sendMessage<Iproto_cg_baiyuan_bankruptcy_defend_req>({
            opcode: "proto_cg_baiyuan_bankruptcy_defend_req"
        })
    }

    proto_gc_baiyuan_bankruptcy_defend_ack(event: { packet: Iproto_gc_baiyuan_bankruptcy_defend_ack }) {
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
