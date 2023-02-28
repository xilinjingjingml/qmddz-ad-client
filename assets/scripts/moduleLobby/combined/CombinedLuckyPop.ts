import BaseScene from "../../base/baseScene/BaseScene";
import { numberFormat3, iMessageBox, showAwardResultPop } from "../../base/BaseFuncTs";
import { CombinedConfig } from "./CombinedConfig";
import DataManager from "../../base/baseData/DataManager";
import { receiveAdAward } from "../LobbyFunc";
import { AdsConfig } from "../../base/baseData/AdsConfig";

const {ccclass, property} = cc._decorator;

@ccclass
export default class CombinedLuckyPop extends BaseScene {

    onOpenScene() {        
        let node = null
        if (this.initParam.gold) {
            node = cc.find("nodePop/lblGold", this.node)
            node.getChildByName("lblValue").getComponent(cc.Label).string = numberFormat3(this.initParam.gold)
            cc.find("nodePop/goldIcon", this.node).active = true
        }
        else if (this.initParam.boxlength) {
            node = cc.find("nodePop/lblBox", this.node)
            node.getChildByName("lblValue").getComponent(cc.Label).string = "随机建筑宝箱x" + this.initParam.boxlength
            cc.find("nodePop/boxIcon", this.node).active = true
        }
            
        if (!node) {
            this.closeSelf()
            return
        }
        
        node.active = true
    }

    onPlayerAD(sender, data) {
        if (data === "true") {
            cc.find("nodePop/btnAward", this.node).getComponent(cc.Button).interactable = false
            cc.find("nodePop/btnAward", this.node).runAction(cc.sequence(cc.delayTime(3), cc.callFunc(() => {
                cc.find("nodePop/btnAward", this.node).getComponent(cc.Button).interactable = true
            })))
            receiveAdAward(AdsConfig.taskAdsMap.CombinedLucky, () => {
                this.getAdAward()    
            }, null, false, null, false)
        }
    }
    
    getAdAward() {
        let self = this
        CombinedConfig.getAdAward(DataManager.CommonData["CombinedCurSeason"], DataManager.CommonData["CombinedAds"].luckyBox.id, (msg) => {
            cc.find("nodePop/btnAward", this.node).getComponent(cc.Button).interactable = true
            console.log(msg)
            if (msg.code !== 0) {
                iMessageBox(msg.errMsg)
                self.closeSelf()
                return
            }

            DataManager.CommonData["CombinedAds"].luckyBox.count = msg.count
            
            if (msg.gold) {
                this.getGoldAward(msg.gold)
            }
            else {
                if (self.initParam.callback) 
                    self.initParam.callback(msg.boxList)
            }
            
            self.closeSelf()
        })
    }

    getGoldAward(gold) {
        CombinedConfig.openBox(DataManager.CommonData["CombinedCurSeason"], 0, 0, (msg) => {
            console.log(msg)
            if (msg.code !== 0) {
                iMessageBox(msg.errMsg)
                return
            }
            
            let awards = [
                {
                    index: 11000,
                    num: msg.gold,
                }
            ]
            showAwardResultPop(awards)
        })
    }
}
