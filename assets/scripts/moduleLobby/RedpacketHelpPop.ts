import BaseScene from "../base/baseScene/BaseScene";
import { getLowMoneyRoom, enterGame } from "../base/BaseFuncTs";
import DataManager from "../base/baseData/DataManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class RedpackethelpPop extends BaseScene {

    onGotoGame() {
        let gameId = DataManager.load(DataManager.UserData.guid + "lastGameId")
        if (null == gameId)
            gameId = 3892
        let servers = getLowMoneyRoom(gameId)        
        if (servers.length > 0)
            enterGame(servers[0])
    }
}
