import BaseScene from "../../base/baseScene/BaseScene";
import DataManager from "../../base/baseData/DataManager";
import { CombinedConfig } from "./CombinedConfig";
import { iMessageBox } from "../../base/BaseFuncTs";
import SceneManager from "../../base/baseScene/SceneManager";
import { receiveAdAward } from "../LobbyFunc";
import { AdsConfig } from "../../base/baseData/AdsConfig";
import { NodeExtends } from "../../base/extends/NodeExtends";


const {ccclass, property} = cc._decorator;

@ccclass
export default class CombinedExtLvPop extends BaseScene {

    onOpenScene() {        
        let pics = DataManager.CommonData["CombinedGoods"]["1"]
        for (let i = 0; i < 2; i++) {
            let node = cc.find("nodePop/item" + i, this.node)
            if (pics) {
                let pic = pics[this.initParam.lvs[i]]
                NodeExtends.setNodeSprite({ node: node.getChildByName("item"), url: "moduleLobby/texture/combined/" + ("0" + pic.level).slice(-2) })
                let bgType = "bgg"
                if (pic.level > 20) 
                    bgType = "bgy"
                else if (pic.level > 10) 
                    bgType = "bgr"
    
                node.getChildByName(bgType).active = true;
                let lbls = node.getChildByName(bgType).getComponentsInChildren(cc.Label)
                lbls.map(i => i.string = "" + pic.level)
            }
        }        
    }

    onPressAd() {
        cc.find("nodePop/btnLevelUp", this.node).getComponent(cc.Button).interactable = false
        cc.find("nodePop/btnLevelUp", this.node).runAction(cc.sequence(cc.delayTime(3), cc.callFunc(() => {
            cc.find("nodePop/btnLevelUp", this.node).getComponent(cc.Button).interactable = true
        })))
        receiveAdAward(AdsConfig.taskAdsMap.CombinedExtLv, () => {
            this.getAdAward()    
        }, null, false, null, false)
    }

    getAdAward() {
        let self = this
        CombinedConfig.getAdAward(DataManager.CommonData["CombinedCurSeason"], DataManager.CommonData["CombinedAds"].extraLvlUp.id, (msg) => {
            cc.find("nodePop/btnLevelUp", this.node).getComponent(cc.Button).interactable = true
            console.log(msg)
            if (msg.code !== 0) {
                iMessageBox(msg.errMsg)
                self.closeSelf()
                return
            }

            DataManager.CommonData["CombinedAds"].extraLvlUp.count = msg.adCount
            SceneManager.Instance.sendMessageToScene({ opcode: "FREE_BUILD", packet: {grids: msg.title} })
            self.closeSelf()
        })
    }
}
