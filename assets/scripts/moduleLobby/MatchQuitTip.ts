import DataManager from "../base/baseData/DataManager";
import BaseScene from "../base/baseScene/BaseScene";

const { ccclass, property } = cc._decorator;

@ccclass
export default class MatchQuitTip extends BaseScene {
    onOpenScene() {
        cc.find("nodePop/node_msg/lbl_msg", this.node).getComponent(cc.Label).string = this.initParam["matchName"]
    }
    onPressClose() {
        cc.audioEngine.playEffect(DataManager.Instance.menuEffect, false)
        this.closeSelf()
    }
}