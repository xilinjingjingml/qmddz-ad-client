import BaseScene from "../../base/baseScene/BaseScene";
import DataManager from "../../base/baseData/DataManager";
import { receiveAdAward, sendReloadUserData } from "../LobbyFunc";
import { AdsConfig } from "../../base/baseData/AdsConfig";
import { CombinedConfig } from "./CombinedConfig";
import { iMessageBox, showAwardResultPop } from "../../base/BaseFuncTs";

const {ccclass, property} = cc._decorator;

@ccclass
export default class CombinedLvRedpacket extends BaseScene {

    onOpenScene() {
        this.initView()
    }

    initView() {
        let lvlReward = DataManager.CommonData["CombinedAds"].lvlReward
        cc.find("nodePop/node_money/label", this.node).getComponent(cc.Label).string = "" + lvlReward.metaData.num
        let lv = DataManager.CommonData["CombinedAds"].lvlReward.count + 1
        cc.find("nodePop/btn_draw_ad", this.node).getComponent(cc.Button).interactable = lv <= DataManager.CommonData["CombinedLevel"]

        lv = Math.min(lv, DataManager.CommonData["CombinedLevel"])
        let goods = DataManager.CommonData["CombinedGoods"]["1"]
        let node = cc.find("nodePop/item", this.node)
        if (goods) {
            // let lv = ("0" + DataManager.CommonData["CombinedLevel"]).slice(-2)
            let pic = goods[lv]
            // setNodeSpriteLocal({ node: node.getChildByName("item"), url: "moduleLobby/texture/combined/" + lv, fixSize: false })
            // let bgType = "bgg"
            // if (DataManager.CommonData["CombinedLevel"] > 20) 
            //     bgType = "bgy"
            // else if (DataManager.CommonData["CombinedLevel"] > 10) nodePop/btn_draw_ad
            //     bgType = "bgr"

            // node.getChildByName(bgType).active = true;
            // let lbls = node.getChildByName(bgType).getComponentsInChildren(cc.Label)
            // lbls.map(i => i.string = "" + DataManager.CommonData["CombinedLevel"])

            cc.find("nodePop/desc", this.node).getComponent(cc.RichText).string = 
                "<color=#FEE985> LV" + lv + " </c><color=#FFFFFF>头衔奖励</c>"                
        }

        

        let self = this
        cc.find("nodePop/btn_close", self.node).active = false
        this.node.runAction(cc.sequence(cc.delayTime(3), cc.callFunc(() => {
            cc.find("nodePop/btn_close", self.node).active = true
        })))
    }

    onPressAd() {
        let self = this
        cc.find("nodePop/btn_draw_ad", this.node).getComponent(cc.Button).interactable = false
        cc.find("nodePop/btn_draw_ad", this.node).runAction(cc.sequence(cc.delayTime(3), cc.callFunc(() => {
            cc.find("nodePop/btn_draw_ad", this.node).getComponent(cc.Button).interactable = true
        })))
        receiveAdAward(AdsConfig.taskAdsMap.CombinedLvRp, () => {
            self.getAdAward()
        })
    }

    getAdAward() {
        let self = this
        CombinedConfig.getAdAward(DataManager.CommonData["CombinedCurSeason"], DataManager.CommonData["CombinedAds"].lvlReward.id, (msg) => {
            cc.find("nodePop/btn_draw_ad", this.node).getComponent(cc.Button).interactable = false
            console.log(msg)
            if (msg.code !== 0) {
                iMessageBox(msg.errMsg)
                self.closeSelf()
                return
            }

            DataManager.CommonData["CombinedAds"].lvlReward.count = msg.adCount
            let lvlReward = DataManager.CommonData["CombinedAds"].lvlReward.metaData
            let awards = [
                {
                    index: msg.index,
                    num: msg.num,
                }
            ]
            showAwardResultPop(awards)
            sendReloadUserData()
            
            self.closeSelf()
        })
    }
}
