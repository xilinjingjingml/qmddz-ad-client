import BaseScene from "../base/baseScene/BaseScene";
import DataManager from "../base/baseData/DataManager";
import { getADDraw } from "./LobbyFunc";
import { AdsConfig } from "../base/baseData/AdsConfig";
import { numberFormat, getQttCoinQuery, iMessageBox } from "../base/BaseFuncTs";

const {ccclass, property} = cc._decorator;

@ccclass
export default class UnenoughDiamondPop extends BaseScene {

    onOpenScene() {
        this.updateState()
    }
    
    
    updateState() {
        // cc.log(DataManager.CommonData["adNum"][AdsConfig.taskAdsMap.DrawDiamond])        
        let labelRestTime = cc.find("nodePop/nodeOperator/lbl_rest_time", this.node)

        labelRestTime.getComponent(cc.Label).string = "今日剩余:" +
        Math.max(0, (DataManager.CommonData["adNum"][AdsConfig.taskAdsMap.DrawDiamond].allNum - DataManager.CommonData["adNum"][AdsConfig.taskAdsMap.DrawDiamond].countNum)) + 
        "/" + DataManager.CommonData["adNum"][AdsConfig.taskAdsMap.DrawDiamond].allNum     

    }

    onPressDraw(sender, data) {
        if (!!sender.target.getComponent(cc.Button).coldDown) {
            iMessageBox("10秒内仅可以领取一次哦!")
        }
        let adNum = parseInt(data)
        let countdown = 10
        getADDraw(adNum, () => {this.updateState()})
        sender.target.getComponent(cc.Button).coldDown = true
        sender.target.runAction(cc.sequence(cc.delayTime(10), cc.callFunc(() => {
            if (sender.target)
                sender.target.getComponent(cc.Button).coldDown = false
        })))

        sender.target.runAction(
            cc.repeat(
                cc.sequence(
                    cc.delayTime(1),
                    cc.callFunc(() => {
                        countdown --
                        // if (sender.target) 
                        //     sender.target.getChildByName("countdown").getComponent(cc.Label).string = countdown > 0 ? "00:0" + countdown : ""
                    })), 11))

        // sender.target.getChildByName("countdown").getComponent(cc.Label).string = "00:10"
    }
}
