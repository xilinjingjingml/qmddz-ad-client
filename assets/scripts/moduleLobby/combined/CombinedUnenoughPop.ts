import BaseScene from "../../base/baseScene/BaseScene";
import { numberFormat3, iMessageBox, showAwardResultPop } from "../../base/BaseFuncTs";
import DataManager from "../../base/baseData/DataManager";
import { CombinedConfig } from "./CombinedConfig";
import { receiveAdAward } from "../LobbyFunc";
import { AdsConfig } from "../../base/baseData/AdsConfig";

const {ccclass, property} = cc._decorator;

@ccclass
export default class CombinedUnenoughPop extends BaseScene {

    onOpenScene() {
        // let lvcfg = DataManager.CommonData["CombinedGoods"]["1"][DataManager.CommonData["CombinedLevel"]]
        let money = DataManager.CommonData["SpeedPerSec"] * DataManager.CommonData["CombinedAds"].goldNotEnough.metaData.prodTime

        cc.find("nodePop/num", this.node).getComponent(cc.Label).string = numberFormat3(money)
        cc.find("nodePop/btnSpeeding", this.node).getComponent(cc.Button).interactable = (
            DataManager.CommonData["CombinedAds"].goldNotEnough.maxTimes === -1 ||
            DataManager.CommonData["CombinedAds"].goldNotEnough.maxTimes > DataManager.CommonData["CombinedAds"].goldNotEnough.count)
    }

    onPlayerAd() {
        cc.find("nodePop/btnSpeeding", this.node).getComponent(cc.Button).interactable = false
        cc.find("nodePop/btnSpeeding", this.node).runAction(cc.sequence(cc.delayTime(3), cc.callFunc(() => {
            cc.find("nodePop/btnSpeeding", this.node).getComponent(cc.Button).interactable = true
        }))) 
        receiveAdAward(AdsConfig.taskAdsMap.CombinedUnenough, () => {
            this.getAdAward()    
        }, null, false, null, false)
    }

    getAdAward() {
        let self = this
        let money = DataManager.CommonData["CombinedMoney"]
        CombinedConfig.getAdAward(DataManager.CommonData["CombinedCurSeason"], DataManager.CommonData["CombinedAds"].goldNotEnough.id, (msg) => {
            cc.find("nodePop/btnSpeeding", this.node).getComponent(cc.Button).interactable = true
            console.log(msg)
            if (msg.code !== 0) {
                iMessageBox(msg.errMsg)
                self.closeSelf()
                return
            }

            DataManager.CommonData["CombinedAds"].goldNotEnough.count = msg.adCount
            DataManager.CommonData["CombinedMoney"] = msg.golds
            let awards = [
                {
                    index: 11000,
                    num: (DataManager.CommonData["SpeedPerSec"] * DataManager.CommonData["CombinedAds"].goldNotEnough.metaData.prodTime),
                }
            ]
            showAwardResultPop(awards)
            self.closeSelf()
        })
    }
    
}
