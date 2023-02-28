import { AdsConfig } from "../base/baseData/AdsConfig"
import BaseScene from "../base/baseScene/BaseScene"
import SceneManager from "../base/baseScene/SceneManager"
import { receiveAdAward } from "./LobbyFunc"

const { ccclass } = cc._decorator

@ccclass
export default class WelfareCentrePop extends BaseScene {

    onPressCardNote() {
        this.onPressAd(AdsConfig.taskAdsMap.CardNoteBuyPop)
    }

    onPressFreeDraw() {
        SceneManager.Instance.popScene("moduleLobby", "LotteryPop")
    }

    onPressFreeGold() {
        this.onPressAd(AdsConfig.taskAdsMap.DrawGold)
    }

    onPressQtt() {
        this.onPressAd(AdsConfig.taskAdsMap.DrawQtt)
    }

    onPressAd(adIndex) {
        receiveAdAward(adIndex)
    }
}