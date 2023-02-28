import DataManager from "../base/baseData/DataManager";
import BaseScene from "../base/baseScene/BaseScene";
import WxWrapper from "../base/WxWrapper";

const { ccclass, property } = cc._decorator;


@ccclass
export default class ShareMoneyActivePop extends BaseScene {

    onPressGet() {
        cc.audioEngine.playEffect(DataManager.Instance.menuEffect, false)
        WxWrapper.openKeFu()
    }
}
