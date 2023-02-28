import BaseScene from "../base/baseScene/BaseScene";
import { getLowMoneyRoom, enterGame } from "../base/BaseFuncTs";
import DataManager from "../base/baseData/DataManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ReliefResultPop extends BaseScene {

    onOpenScene() {
        cc.find("nodePop/relief_gold_1000", this.node).active = false
        cc.find("nodePop/num", this.node).getComponent(cc.Label).string = "" + DataManager.CommonData["reliefStatus"]["reliefAwardCount"]
    }

    onPressGotoGame() {
        if (DataManager.CommonData["gameServer"])
            return

        let gameId = DataManager.load(DataManager.UserData.guid + "lastGameId")
        if (null != gameId) {
            let servers = getLowMoneyRoom(gameId)
            if (servers && servers.length > 0)
                enterGame(servers[0])
        }
    }
}
