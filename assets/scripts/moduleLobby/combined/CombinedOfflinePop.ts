import BaseScene from "../../base/baseScene/BaseScene";
import { numberFormat3, iMessageBox, showAwardResultPop } from "../../base/BaseFuncTs";
import { CombinedConfig } from "./CombinedConfig";
import DataManager from "../../base/baseData/DataManager";
import { receiveAdAward } from "../LobbyFunc";
import { AdsConfig } from "../../base/baseData/AdsConfig";

const {ccclass, property} = cc._decorator;

@ccclass
export default class OfflineAwardPop extends BaseScene {

    _adAward: boolean = false

    onOpenScene() {
        if (!this.initParam.offlineEarnings) {
            this.closeSelf()
            return
        }
        
        cc.find("nodePop/lblOfflineValue", this.node).getComponent(cc.Label).string = numberFormat3(this.initParam.offlineEarnings)

        cc.find("nodePop/btnAward", this.node).getComponent(cc.Button).interactable = (
            DataManager.CommonData["CombinedAds"].offlineEarnings.maxTimes === -1 ||
            DataManager.CommonData["CombinedAds"].offlineEarnings.maxTimes > DataManager.CommonData["CombinedAds"].offlineEarnings.count)

        cc.find("nodePop/btnClose", this.node).active = false
        this.node.runAction(cc.sequence(cc.delayTime(3), cc.callFunc(() => {cc.find("nodePop/btnClose", this.node).active = true})))
    }

    onPlayerAD() {
        cc.find("nodePop/btnAward", this.node).getComponent(cc.Button).interactable = false
        cc.find("nodePop/btnAward", this.node).runAction(cc.sequence(cc.delayTime(3), cc.callFunc(() => {
            cc.find("nodePop/btnAward", this.node).getComponent(cc.Button).interactable = true
        })))
        receiveAdAward(AdsConfig.taskAdsMap.CombinedOffline, () => {
            this.getAdAward()    
        }, null, false, null, false) 
    }
    
    getAdAward() {
        let self = this
        CombinedConfig.getAdAward(DataManager.CommonData["CombinedCurSeason"], DataManager.CommonData["CombinedAds"].offlineEarnings.id, (msg) => {
            cc.find("nodePop/btnAward", this.node).getComponent(cc.Button).interactable = true
            console.log(msg)
            if (msg.code !== 0) {
                iMessageBox(msg.errMsg)
                self.closeSelf()
                return
            }

            DataManager.CommonData["CombinedAds"].offlineEarnings.count = msg.count
            DataManager.CommonData["CombinedMoney"] = msg.golds
            let awards = [
                {
                    index: 11000,
                    num: self.initParam.offlineEarnings * 2,
                }
            ]
            showAwardResultPop(awards)
            // self._adAward = true
            self.closeSelf()
        })
    }

    onPressGetAward() {
        let self = this
        CombinedConfig.loadCollect(DataManager.CommonData["CombinedCurSeason"], 1, () => {
            let awards = [
                {
                    index: 11000,
                    num: this.initParam.offlineEarnings
                }
            ]
            showAwardResultPop(awards)
            self.closeSelf()
        })
    }

    onCloseScene() {
        
    }
}
