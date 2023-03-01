import { confusonFunc } from "../base/confusonFunc";
import DataManager from "../base/baseData/DataManager";
import { showAwardResultPop, czcEvent, getLowMoneyRoom, enterGame, unenoughGold } from "../base/BaseFuncTs";
import { getRedpacketRank, sendReloadUserData } from "./LobbyFunc";
import { isSmallGame } from "../gameConfig";
import { http } from "../base/utils/http";

const {ccclass, property} = cc._decorator;

const PLAYER_GAMES_NUM = [
    [5, 10000],
    [20, 30000],
    [50, 60000],
    [100, 100000],
]

@ccclass
export default class NewYearPop extends cc.Component {

    _records: any[] = []
    _finishAwards: any[] = []

    onEnable() {
        this.getNewYearConfig()
        getRedpacketRank(this.onInit.bind(this))

        this.node.getChildByName("nodeRecord").position = this.node.convertToNodeSpaceAR(cc.v2(cc.winSize.width/2, cc.winSize.height/2))
    }

    onDisable() {

    }

    onInit() {
        if (null == DataManager.CommonData["todayPlyNum"])
            return

        for (let idx = 1; idx <= 4; idx++) {
            let iter = this._finishAwards[idx - 1]
            let rp = cc.find("nodePop/redpacketList/view/content/redpacket" + idx, this.node);
            rp.getChildByName("state0").active = false
            rp.getChildByName("state1").active = false
            rp.getChildByName("state2").active = false
            rp.getChildByName("state3").active = false
            if (null != iter) {
                rp.getChildByName("state0").active = true
                rp.getChildByName("state0").getChildByName("lblAmount").getComponent(cc.Label).string = iter + "金豆"
            }
            else if (this._finishAwards.length + 1 == idx && DataManager.CommonData["todayPlyNum"] >= PLAYER_GAMES_NUM[idx - 1][0]) {
                rp.getChildByName("state2").active = true
            }
            else if (this._finishAwards.length + 1 == idx) {
                let state = rp.getChildByName("state1")
                state.active = true
                state.getChildByName("lblMaxAmount").getComponent(cc.Label).string = "最高可拆\n\r" + PLAYER_GAMES_NUM[idx - 1][1] + "金豆"
                state.getChildByName("lblRequestNum").getComponent(cc.RichText).string = "<color=#ffffff>累计玩</c><color=#fbf360>" + PLAYER_GAMES_NUM[idx - 1][0] + "局</c><color=#ffffff>游戏可拆</c>"
                state.getChildByName("gameProgress").getComponent(cc.ProgressBar).progress = DataManager.CommonData["todayPlyNum"] / PLAYER_GAMES_NUM[idx - 1][0]
                state.getChildByName("lblGameNum").getComponent(cc.Label).string = Math.min(DataManager.CommonData["todayPlyNum"], PLAYER_GAMES_NUM[idx - 1][0]) + "/" + PLAYER_GAMES_NUM[idx - 1][0]                
            }
            else {
                let state = rp.getChildByName("state3")
                state.active = true
                state.getChildByName("lblMaxAmount").getComponent(cc.Label).string = "最高可拆\n\r" + PLAYER_GAMES_NUM[idx - 1][1] + "金豆"
            }
        }
    }

    onFullRecord(records) {
        this._records = []
        let content = cc.find("nodeRecord/bg/recordList/view/content", this.node)
        let model = cc.find("nodeRecord/bg/recordList/item", this.node)
        content.removeAllChildren(true)
        for (let iter of records) {
            if (null == this._records[iter.pa_date]){
                if (this._records.length > 0) {
                    let item = cc.instantiate(model)
                    item.getComponent(cc.RichText).string = ""
                    item.position = cc.v2(-200, 0)
                    content.addChild(item)    
                }
                
                this._records[iter.pa_date] = []
                this._records[iter.pa_date].push(iter.pa_date)                
                let item = cc.instantiate(model)
                let strDate = iter.pa_date + ""
                item.getComponent(cc.RichText).string = "<color=#874612>" + strDate.substr(0, 4) + "-" + strDate.substr(4, 2) + "-" + strDate.substr(6, 2) + "</c>"
                item.position = cc.v2(-200, 0)
                content.addChild(item)                
            }

            this._records[iter.pa_date].push(iter.pa_award)
            let item = cc.instantiate(model)
            item.getComponent(cc.RichText).string = "<color=#835c38>开启</c><color=#179124> \"福卡\" </c><color=#835c38>获得</c><color=#bb2600> " + iter.pa_award + "金豆</c>" 
            item.position = cc.v2(-200, 0)
            content.addChild(item)
        }        
    }

    onPressRecord() {
        this.node.getChildByName("nodeRecord").active = true
    }

    onPressEntergame() {
        let gameId = DataManager.load(DataManager.UserData.guid + "lastGameId")        
        if (isSmallGame(gameId))
            gameId = 3892
            
        if (null == gameId)
            gameId = DataManager.Instance.getGameList()[0]

        // czcEvent("新春活动", "快速开始", gameId + " " + DataManager.Instance.userTag)
        let servers = getLowMoneyRoom(gameId)
        if (servers && servers.length > 0){
            let i = Math.floor(Math.random() * 100 % servers.length)
            enterGame(servers[i], null)
        }
        else if(DataManager.UserData.money < 1000){
            // 没服务器就是初级场
            unenoughGold(0, 1000)
        }
    }

    onPressGetAward(sender, data) {
        this.getNewYearAward(parseInt(data))
    }

    onPressRecordClose() {
        this.node.getChildByName("nodeRecord").active = false
    }

    getNewYearConfig() {
        let url = DataManager.getURL("PLAY_TOTAL_AWARD")
        let params = {
            pid: DataManager.UserData.guid,
            ticket: DataManager.UserData.ticket,
            flag: 0
        };

        this._finishAwards = []

        let self = this
        http.open(url, params, function(msg) {
            if (null == msg)
                return

            if (msg["playAwardInfo"]) {
                self.onFullRecord(msg["playAwardInfo"])
            }
        
            if (msg["onePlayAward"]) {
                // self._finishAwards.push(msg["onePlayAward"])
                self._finishAwards[0] = msg["onePlayAward"]
            }
            if (msg["twoPlayAward"]) {
                // self._finishAwards.push(msg["twoPlayAward"])
                self._finishAwards[1] = msg["twoPlayAward"]
            }
            if (msg["threePlayAward"]) {
                // self._finishAwards.push(msg["threePlayAward"])
                self._finishAwards[2] = msg["threePlayAward"]
            }
            if (msg["fourPlayAward"]) {
                // self._finishAwards.push(msg["fourPlayAward"])
                self._finishAwards[3] = msg["fourPlayAward"]
            }

            self.onInit()
        })
    }

    getNewYearAward(idx, callback: () => void = null) {
        let url = DataManager.getURL("PLAY_TOTAL_AWARD")
        let params = {
            pid: DataManager.UserData.guid,
            ticket: DataManager.UserData.ticket,
            flag: idx
        };

        let self = this
        http.open(url, params, function(msg) {
            if (null == msg)
                return

            if (msg.ret == 0) {
                let awards = []
                let award = {
                    index: 0,
                    num: msg.awardNum
                }
                awards.push(award)
                showAwardResultPop(awards)
                sendReloadUserData()
                self.onEnable()
            }
        })
    }
}

