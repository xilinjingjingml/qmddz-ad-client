import { AdsConfig } from "../base/baseData/AdsConfig"
import DataManager from "../base/baseData/DataManager"
import BaseScene from "../base/baseScene/BaseScene"
import { checkAdCanReceive, receiveAdAward } from "./LobbyFunc"

const { ccclass } = cc._decorator

@ccclass
export default class ObtainRedpacketPop extends BaseScene {

    onOpenScene() {
        this.node.zIndex = 600
        cc.find("nodePop/num", this.node).getComponent(cc.Label).string = "+" + (DataManager.UserData.getItemNum(365) - DataManager.CommonData["RedpacketCount"])
        cc.find("nodePop/facaimao", this.node).getComponent(sp.Skeleton).addAnimation(1, "daiji", true)

        if (!checkAdCanReceive(AdsConfig.taskAdsMap.WxShare)) {
            cc.find("nodePop/sharebtn", this.node).active = false
        }
    }

    onPressShare() {
        receiveAdAward(AdsConfig.taskAdsMap.WxShare, () => {
            this.isValid && this.closeSelf()
        })
    }
}
