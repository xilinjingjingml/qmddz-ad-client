import DataManager from "../base/baseData/DataManager";
import { delayCallback, gotoMatchSvr, getLeadTime } from "../base/BaseFuncTs";
import NetManager from "../base/baseNet/NetManager";
import BaseScene from "../base/baseScene/BaseScene";

const { ccclass, property } = cc._decorator;

@ccclass
export default class MatchTip extends BaseScene {
    onOpenScene() {
        cc.find("nodePop/node_msg/lbl_msg", this.node).getComponent(cc.Label).string = DataManager.Instance.matchMap[this.initParam["matchType"]].matchName

        this.node.runAction(cc.repeatForever(cc.sequence([
            cc.callFunc(this.updateTime.bind(this)),
            cc.delayTime(1)
        ])))
    }

    updateTime() {
        const numFormat = (num: number) => num < 10 ? "0" + num : "" + num
        const leftTime = this.initParam["startTime"] - Math.floor(new Date().getTime() / 1000)
        cc.find("nodePop/node_time/time_bg/label", this.node).getComponent(cc.Label).string = numFormat(Math.floor(leftTime / 60))
        cc.find("nodePop/node_time/time_bg2/label", this.node).getComponent(cc.Label).string = numFormat(Math.floor(leftTime % 60))
        cc.find("nodePop/btn_ok", this.node).active = DataManager.CommonData["gameServer"] != null || leftTime > getLeadTime()
        cc.find("nodePop/btn_go", this.node).active = DataManager.CommonData["gameServer"] == null && leftTime <= getLeadTime()
        if (leftTime <= 0) {
            this.closeSelf()
        }
    }

    onPressGo() {
        cc.audioEngine.playEffect(DataManager.Instance.menuEffect, false)
        this.closeSelf()
        gotoMatchSvr(DataManager.Instance.matchMap[this.initParam["matchType"]])
    }

    onPressClose() {
        cc.audioEngine.playEffect(DataManager.Instance.menuEffect, false)
        this.closeSelf()
        const leftTime = this.initParam["startTime"] - Math.floor(new Date().getTime() / 1000)
        if (leftTime > getLeadTime()) {
            const message = { packet: this.initParam }
            delayCallback(this.initParam["startTime"] - getLeadTime(), () => {
                if (DataManager.CommonData["gameServer"]) {
                    return
                }
                const matchInfo = DataManager.Instance.matchMap[message.packet['matchType']]
                if (matchInfo == null || matchInfo.isSign == false) {
                    return
                }
                NetManager.Instance._notfiyMessage.proto_lc_match_begin_not(message)
            })
        }
    }
}