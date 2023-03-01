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
export default class BaiYuanRegainLosePop extends BaseComponent {
    initParam: Iproto_gc_baiyuan_regain_lose_not

    onOpenScene() {
        const num = this.initParam.vecItemInfo[0].nItemNum
        this.$("label_value", cc.Label).string = "x" + GameLogic.Instance().turnBaiYuan(num).toFixed(2) + "话费券"

        this.$("nodeFinger").active = DataManager.Instance.getOnlineParamGray("BaiYuanRegainLose_finger", false)
        this.$("btnClose").active = DataManager.Instance.getOnlineParamGray("BaiYuanRegainLose_close", true)
        DataManager.Instance.getOnlineParamGray("BaiYuanRegainLose_close_delayShow", false) && NodeExtends.delayShow(this, this.$("btnClose"))
    }

    onPressGet(event: cc.Event.EventTouch) {
        if (DataManager.CommonData["morrow"] == 0) {
            czcEvent("斗地主", "百元免输", "点击领取")
        }
        AudioManager.playButtonSound()
		NodeExtends.cdButton(event, 1)

        if (checkAdCanReceive(AdsConfig.taskAdsMap.New_RegainLose)) {
            receiveAdAward(AdsConfig.taskAdsMap.New_RegainLose, this.proto_cg_baiyuan_regain_lose_req.bind(this), null, false)
        } else {
            this.proto_cg_baiyuan_regain_lose_req()
        }
    }

    proto_cg_baiyuan_regain_lose_req() {
        GameLogic.Instance().sendMessage<Iproto_cg_baiyuan_regain_lose_req>({
            opcode: "proto_cg_baiyuan_regain_lose_req"
        })
    }

    proto_gc_baiyuan_regain_lose_ack(event: { packet: Iproto_gc_baiyuan_regain_lose_ack }) {
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
            czcEvent("斗地主", "百元免输", "点击关闭")
        }
    }
}
