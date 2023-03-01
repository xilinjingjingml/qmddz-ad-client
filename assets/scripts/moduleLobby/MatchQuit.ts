import DataManager, { IMatchInfo } from "../base/baseData/DataManager";
import NetManager from "../base/baseNet/NetManager";
import BaseScene from "../base/baseScene/BaseScene";

const { ccclass, property } = cc._decorator;

@ccclass
export default class MatchQuit extends BaseScene {
    thisComponentName = "MatchQuit"
    matchInfo: IMatchInfo

    onOpenScene() {
        this.matchInfo = this.initParam as any
    }

    onPressMatchQuit() {
        cc.audioEngine.playEffect(DataManager.Instance.menuEffect, false)
        NetManager.Instance.send("lobby", {
            opcode: "proto_cl_quit_sign_match_req",
            matchId: this.matchInfo.matchId,
        })
        this.closeSelf()
    }

    onPressClose() {
        cc.audioEngine.playEffect(DataManager.Instance.menuEffect, false)
        this.closeSelf()
    }
}