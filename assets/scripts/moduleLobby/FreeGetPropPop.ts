import BaseScene from "../base/baseScene/BaseScene"
import { AdsConfig } from "../base/baseData/AdsConfig"
import DataManager from "../base/baseData/DataManager"
import { checkAdCanReceive, getLuckyLotteryAward, loadLotteryData, loadLotteryRecord, receiveAdAward, getAdLeftTimes, getNextAdMethod, sendReloadUserData } from "./LobbyFunc"
import { getNameByItemId, iMessageBox, showAwardResultPop, accurateTime, playADBanner } from "../base/BaseFuncTs"
import SceneManager from "../base/baseScene/SceneManager"
import { ITEM } from "../base/baseData/ItemConfig"

const { ccclass } = cc._decorator

@ccclass
export default class FreeGetPropPop extends BaseScene {
    btn_Close: any

    onOpenScene() {
        this.btn_Close = cc.find("nodeMain/btn_Close", this.node)
        cc.find("nodeMain/lbl_layout/lbl_1", this.node).getComponent(cc.Label).string = "" + getAdLeftTimes(AdsConfig.taskAdsMap.CardNoteBuyPop)
        this.node.runAction(cc.sequence([cc.callFunc(() => { this.btn_Close.active = false }), cc.delayTime(3), cc.callFunc(() => { this.btn_Close.active = true })]))
        playADBanner(false, AdsConfig.banner.All)
    }

    onPressGet(){
        console.log("jin---onPressGet:", checkAdCanReceive(AdsConfig.taskAdsMap.CardNoteBuyPop))
        if (checkAdCanReceive(AdsConfig.taskAdsMap.CardNoteBuyPop)) {
            receiveAdAward(AdsConfig.taskAdsMap.CardNoteBuyPop, () => {
                this.isValid && this.closeSelf()
            })
        }
    }

    onDestroy() {
        playADBanner(true, AdsConfig.banner.GameResultLayer_rpddz, ()=>{})
    }
}