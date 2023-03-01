import BaseScene from "../base/baseScene/BaseScene";
import DataManager from "../base/baseData/DataManager";
import { getGameConfig } from "../gameConfig";
import { checkServerMoneyLimit, enterGame, iMessageBox } from "../base/BaseFuncTs";
import { getServerList } from "./LobbyFunc";


const {ccclass, property} = cc._decorator;

@ccclass
export default class MiniGameScene extends BaseScene {

    onOpenScene() {
        
    }

    onPressGame(sender, data) {
        let gameId = isNaN(parseInt(data)) ? (getGameConfig(data) || getGameConfig("module" + data)) : parseInt(data)

        let servers = []
        servers = Object.assign(servers, DataManager.CommonData["ServerDatas"][gameId])

        if (null == servers || 0 == servers.length){
            getServerList()
            iMessageBox("服务器暂未开放，请稍后再试")
            return
        }

        let i = Math.floor(Math.random() * 100 % servers.length)
        let room = Object.assign(servers[i])
        let gi = room.gameId
        if (room.ddz_game_type)
            gi = gi * 10 + parseInt(room.ddz_game_type)
        DataManager.save(DataManager.UserData.guid + "lastGameId", gi)
        if (checkServerMoneyLimit(room))
            enterGame(room);     
    }
}
