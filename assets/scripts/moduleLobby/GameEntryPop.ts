import { confusonFunc } from "../base/confusonFunc";
import { AdsConfig } from "../base/baseData/AdsConfig"
import DataManager from "../base/baseData/DataManager"
import { iMessageBox } from "../base/BaseFuncTs"
import BaseScene from "../base/baseScene/BaseScene"
import WxWrapper from "../base/WxWrapper"
import { checkAdCanReceive, receiveAdAward } from "./LobbyFunc"

const { ccclass } = cc._decorator

@ccclass
export default class GameEntryPop extends BaseScene {

    onEnable() {
        this.updateView()
    }

    updateView() {
        if (!checkAdCanReceive(AdsConfig.taskAdsMap.WxFavorite)) {
            cc.find("nodePop/btnConfirm", this.node).getComponent(cc.Button).interactable = false
        }
    }

    onPressGetAward() {
		cc.audioEngine.playEffect(DataManager.Instance.menuEffect, false)
        if (WxWrapper.checkSceneCode()) {
            receiveAdAward(AdsConfig.taskAdsMap.WxFavorite, () => {
                this.isValid && this.updateView()
            })
        } else {
            iMessageBox("从[我的小程序]进入才能领取奖励哦")
        }
    }
}