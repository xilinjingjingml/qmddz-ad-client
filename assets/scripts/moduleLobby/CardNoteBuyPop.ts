import BaseComponent from "../base/BaseComponent"
import { AdsConfig } from "../base/baseData/AdsConfig"
import { getAdLeftTimes, receiveAdAward } from "./LobbyFunc"

const { ccclass } = cc._decorator

@ccclass
export default class CardNoteBuyPop extends BaseComponent {

    onOpenScene() {
        this.refreshRestNum()
    }

    refreshRestNum() {
        this["labelRestNum"].$Label.string = "今日剩余: " + getAdLeftTimes(AdsConfig.taskAdsMap.CardNoteBuyPop) + "次"
    }

    onPressConfirm() {
        receiveAdAward(AdsConfig.taskAdsMap.CardNoteBuyPop, () => {
            this.isValid && this.refreshRestNum()
        })
    }
}
