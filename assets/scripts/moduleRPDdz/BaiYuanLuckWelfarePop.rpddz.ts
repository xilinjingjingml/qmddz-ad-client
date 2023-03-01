import BaseComponent from "../base/BaseComponent"
import { AdsConfig } from "../base/baseData/AdsConfig"
import DataManager from "../base/baseData/DataManager"
import { czcEvent, iMessageBox, showAwardResultPop } from "../base/BaseFuncTs"
import { NodeExtends } from "../base/extends/NodeExtends"
import { checkAdCanReceive, receiveAdAward } from "../moduleLobby/LobbyFunc"
import AudioManager from "./AudioManager.rpddz"
import GameLogic from "./GameLogic.rpddz"

const { ccclass } = cc._decorator

@ccclass
export default class BaiYuanLuckWelfarePop extends BaseComponent {
    initParam: Iproto_gc_baiyuan_luck_welfare_not

    onOpenScene() {
        const num = this.initParam.vecItemInfo[0].nItemNum
        this.$("label_value", cc.Label).string = "x" + GameLogic.Instance().turnBaiYuan(num).toFixed(2) + "话费券"

        this.$("nodeFinger").active = DataManager.Instance.getOnlineParamGray("BaiYuanLuckWelfare_finger", false)
        this.$("btnClose").active = DataManager.Instance.getOnlineParamGray("BaiYuanLuckWelfare_close", true)
        DataManager.Instance.getOnlineParamGray("BaiYuanLuckWelfare_close_delayShow", false) && NodeExtends.delayShow(this, this.$("btnClose"))
    }

    onPressGet(event: cc.Event.EventTouch) {
        if (DataManager.CommonData["morrow"] == 0) {
            czcEvent("斗地主", "百元幸运福利", "点击领取")
        }
        AudioManager.playButtonSound()
		NodeExtends.cdButton(event, 1)

        if (checkAdCanReceive(AdsConfig.taskAdsMap.New_LuckyGift)) {
            receiveAdAward(AdsConfig.taskAdsMap.New_LuckyGift, this.proto_cg_baiyuan_luck_welfare_req.bind(this), null, false)
        } else {
            this.proto_cg_baiyuan_luck_welfare_req()
        }
    }

    proto_cg_baiyuan_luck_welfare_req() {
        GameLogic.Instance().sendMessage<Iproto_cg_baiyuan_luck_welfare_req>({
            opcode: "proto_cg_baiyuan_luck_welfare_req"
        })
    }

    proto_gc_baiyuan_luck_welfare_ack(event: { packet: Iproto_gc_baiyuan_luck_welfare_ack }) {
        const messge = event.packet
        if (messge.cRet == 0) {
            const awards = []
            messge.vecItemInfo.forEach(info => awards.push({ index: info.nItemId, num: info.nItemNum }))
            showAwardResultPop(awards, { closeCallback: this.closeSelf.bind(this) })
        } else {
            iMessageBox("领取失败！")
        }
    }

    onPressClose() {
        if (DataManager.CommonData["morrow"] == 0) {
            czcEvent("斗地主", "百元幸运福利", "点击关闭")
        }
    }
}
