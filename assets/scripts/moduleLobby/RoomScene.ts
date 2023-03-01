import BaseScene from "../base/baseScene/BaseScene";
import DataManager from "../base/baseData/DataManager";
import { getChangCiName } from "../gameConfig";
import { numberFormat, czcEvent, getNewBieServer, checkServerMoneyLimit, enterGame, getLowMoneyRoom, unenoughGold, getGameServers } from "../base/BaseFuncTs";
import { getServerList } from "./LobbyFunc";

const {ccclass, property} = cc._decorator;

@ccclass
export default class RoomScene extends BaseScene {

    _gameId = 0;
    _gameType = 1;

    _fastLevel: number = 0;
    
    onOpenScene() {
        this._gameId = this.initParam.gameId
        if (this._gameId >= 3890) {
            this._gameType = this._gameId % 10
            this._gameId = Math.floor(this._gameId / 10)            
        }
        

        this.onInitRoom()
        cc.find("nodeContent/typePage/btnType" + this._gameType, this.node).getComponent(cc.Toggle).isChecked = true
    }

    refreshGameTitle() {
        let nodeRoomTitle = cc.find("nodePlayer/node_title_type", this.node);
        
        nodeRoomTitle.getChildByName("ri_title_qdz_2").active = this._gameType === 0
        nodeRoomTitle.getChildByName("ri_title_jsf_2").active = this._gameType === 1
        nodeRoomTitle.getChildByName("ri_title_bxp_2").active = this._gameType === 2
    }

    onInitRoom() {

        this.initFastGame()
        this.refreshGameTitle()
        let newUser = DataManager.CommonData["regtime"] >= 1572451200
        let nodeRoom = cc.find("nodeContent/nodeServers/content", this.node);

        let levels = []
        let roomlen = 0

        let servers = getGameServers(this._gameId * 10 + this._gameType)
        
        for (const key in servers) {
            if (servers.hasOwnProperty(key)) {
                // let level = servers[key]["level"] * 10
                // if (servers[key]["gameId"] == 390)
                //     level = (servers[key]["level"] - 1) * 7

                let level = servers[key]["level"]
                if (levels[level] == null) {
                    levels[level] = []
                    roomlen ++
                }

                levels[level].push(servers[key])
            }
        }
        
        nodeRoom.children.map(item => item.active = false);

        let nodeServers = cc.find("nodeContent/nodeServers", this.node);
        // let size = nodeServers.getContentSize()
        // size.width = roomlen % 2 ? size.width + 100 : size.width - 80
        let idx = 1

        let content = cc.find("content", nodeServers)
        let layout = content.getComponent(cc.Layout)
        let csize = content.getContentSize()
        // let left = 30
        // let space = 50
        // if (roomlen == 1) {
        //     left = 350
        // }
        // else if (roomlen == 2) {
        //     left = 100
        //     space = 200
        // }
        // else if (roomlen == 3) {
        //     left = 100
        //     space = 100
        // }

        // layout.paddingLeft = left
        // layout.paddingRight = left
        // layout.spacingX = space
                
        // csize.width = (300 + left * 2) * roomlen + space
        // content.setContentSize(csize)

        for (let key in levels) {
            let nKey = parseInt(key) // / 10
            let server = levels[key]
            let level = server[0]["level"]//server[0]["gameId"] == 390 ? server[0]["level"] + 10 : server[0]["level"]
            let room = nodeRoom.getChildByName("roomType" + level)

            if (null == room)
                continue

            // room.zIndex = idx
            room.active = false
            if (levels[key] != null){
                room.active = true
                
                let onlineNum = 0 
                server.forEach(item => onlineNum += item.onlinePlayerNum)
                // room.getChildByName("onlineNum").getComponent(cc.Label).string = "" + onlineNum

                room.getChildByName("type0").active = this._gameType === 0
                room.getChildByName("type1").active = this._gameType === 1
                room.getChildByName("type2").active = this._gameType === 2

                for (let i = 1; i <= 5; i++) {
                    room.getChildByName("desc_round" + i).active = i == level
                }

                room.getChildByName("selectFrame").active = this._fastLevel === 0 ? idx === 1 : this._fastLevel === server[0].level
            
                if (server[0].maxmoney)
                    room.getChildByName("labelGold").getComponent(cc.Label).string = " " + numberFormat(server[0].minMoney, 0) + "~" + numberFormat(server[0].maxmoney, 0)
                else
                    room.getChildByName("labelGold").getComponent(cc.Label).string = numberFormat(server[0].minMoney, 0) + "以上"
                
                room.getChildByName("labelScore").getComponent(cc.Label).string = numberFormat(server[0].baseBet || server[0].base_bet)
                
                let btn = room.getComponent(cc.Button)
                btn.clickEvents = []

                let clickEventHandler = new cc.Component.EventHandler();
                clickEventHandler.target = this.node; 
                clickEventHandler.component = "RoomScene";
                clickEventHandler.handler = "onRoom" + idx; 

                this["onRoom" + idx] = (sender) => {       
                    czcEvent("大厅", "点击游戏", levels[key][0].gameId + " " + DataManager.Instance.userTag)  
                    let curServers = getNewBieServer(levels[key][0].gameId);
                    if (null == curServers || 0 == curServers.length || level != 1) {
                        // curServers = server.filter(item => item.newbieMode != 1)
                        curServers = server
                    }

                    if (null == curServers) {
                        getServerList()
                        return
                    }

                    let i = Math.floor(Math.random() * 100 % curServers.length)
                    let room = Object.assign(curServers[i])
                    let gi = room.gameId
                    if (room.ddz_game_type)
                        gi = gi * 10 + parseInt(room.ddz_game_type)
                    DataManager.save(DataManager.UserData.guid + "lastGameId", gi)
                    if (checkServerMoneyLimit(room))
                        enterGame(room);                
                }
                
                btn.clickEvents.push(clickEventHandler);
                idx ++
            }
        }   
    }

    onPressDDZTypeChange(sender, data) {
        this._gameType = parseInt(data)
        this.onInitRoom()
    }

    onPressFastStart() {
        let gameId = this._gameId * 10 + this._gameType
        czcEvent("大厅", "快速开始", gameId + " " + DataManager.Instance.userTag)
        if (null == gameId)
            gameId = DataManager.Instance.getGameList()[0]

        let servers = getLowMoneyRoom(gameId)
        if (servers.length > 0){
            let i = Math.floor(Math.random() * 100 % servers.length)
            enterGame(servers[i])
        }
        else if(DataManager.UserData.money < DataManager.Instance.getReliefLine()){
            // 没服务器就是初级场
            unenoughGold(0, DataManager.Instance.getReliefLine())
        }
    }

    initFastGame() {
        let gameId = this._gameId * 10 + this._gameType//this._gameId
        let name = {}
        let nameFormat = ""
        this._fastLevel = 0
        let qr = cc.find("nodeContent/btnQuickStart/quickRoom", this.node).getComponent(cc.Label);
        let servers = getLowMoneyRoom(gameId)
        if (servers && servers.length) {
            // 处理斗地主三种类型
            if (gameId >= 3890)
                gameId = Math.floor(gameId / 10)

            name = getChangCiName(gameId, servers[0].ddz_game_type, servers[0].level)

            nameFormat = name["gameName"] + "·" + name["typeName"] + name["levelName"]

            this._fastLevel = servers[0].level
        }

        qr.string = nameFormat
    }
}
