import BaseScene from "../base/baseScene/BaseScene";
import DataManager from "../base/baseData/DataManager";
import { GAME_TYPE } from "../gameConfig";
import { getADDraw } from "./LobbyFunc";

const {ccclass, property} = cc._decorator;

@ccclass
export default class UnenoughGuidePop extends BaseScene {

    onOpenScene() {
        if (DataManager.Instance.GameType === GAME_TYPE.QMDDZMD) {
            cc.find("nodePop/nodeItem2", this.node).active = false
        }
    }
    
    onPressADQtt(event, data) {
        let adNum = parseInt(data)
        getADDraw(adNum)
    }
}
