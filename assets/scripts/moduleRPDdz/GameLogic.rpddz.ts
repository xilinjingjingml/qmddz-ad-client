import { AdsConfig } from "../base/baseData/AdsConfig";
import DataManager from "../base/baseData/DataManager";
import { ITEM } from "../base/baseData/ItemConfig";
import { czcEvent, enterGame, getLowMoneyRoom, gobackToMain, iMessageBox, MsgBox, showShopPop, unenoughGold } from "../base/BaseFuncTs";
import NetManager from "../base/baseNet/NetManager";
import SceneManager from "../base/baseScene/SceneManager";
import { math } from "../base/utils/math";
import { checkAdCanReceive, getReliefState } from "../moduleLobby/LobbyFunc";
import { WizardConfig } from "../moduleLobby/WizardConfig";
import AudioConfig from "./AudioConfig.rpddz";
import AudioManager from "./AudioManager.rpddz";
import GameScene from "./GameScene.rpddz";

export default class GameLogic {
    private static instance: GameLogic;

    socketName: string = 'rpddz'

    moduleExt: string = 'rpddz'

    moduleRes: string = 'moduleRPDdzRes/'

    MAX_PLAYER_NUM:number = 3

    dizhu:number = 0

    gamescene: GameScene = null

    playerData = []
    redpacketTrumpetMsgs = []
    redpacket_info = []
    redpacket_award_info = []
    emojiConfigs: Iproto_emojiConfig[] = []

	gameStorageKey = {
		magic_emoji:"magic_emoji"
    }
    
    zOrder = {
        zeroOrder : 0,
		nodeRedPacket : 10,
	}    
    
    //用户财产，游戏币，金叶子，红包
    userProperties = {}
    
    serverInfo = {
        baseBet: 0,
        channelId: 0,
        extParam: "",
        gameId: 0,
        minMoney: 0,
        maxmoney: 0,
        onlinePlayerNum: 0,
        serverAddr: "",
        serverId: 0,
        serverKey: "",
        serverName: "",
        serverPort: 0,
        lc_room_mode: 0,
        winMaxMoney: 0,
        jumpNextServerMoney: 0,
        level: 0,
        winMaxBet: 0,
        winMinBet: 0,
        hBMode: 0,
        server_type: 0,
        tax: 0,
        newbieMode: 0,
        RPGMode: 0,
        ddz_game_type: 0,
    }

    userData = {
        plyBaseData: {                
            chairId: -1,
            dogfall: 0,
            gift: 0,
            lost: 0,
            money: 0,
            nickname: "",
            param_1: 0,
            param_2: 0,
            plyGuid: 0,
            plyVip: {},
            ready: 0,
            score: 0,
            sex: -1,
            tableId: -1,
            won: 0,
            headimage: ""
        },
        plyStatus: {
            gameId: 0​​​,
            gameServerId: 0​​​,
            latitude: -1​​​,
            longitude: -1​​​,
            lost: 0​​​,
            money: 0​​​,
            moneyRank: -1​​​,
            param_1: 0​​​,
            param_2: 0​​​,
            plyGuid: 0​​​,
            plyNickname: ""​​​,
            plyStatus: 0​​​,
            sex: 0​​​,
            tableId: 0​​​,
            won: 0​​​,
            wonRank: -1,
        }
    }

    gamePlayerAvatarUrl = []
    
    bEnterInGame = false;

    COMMON_OPCODE = {
        CO_NEW	 	 	: 0,	// //开始新的一圈牌
        CO_CALL0	 	: 1,	// //不叫
        CO_CALL1	 	: 2,	// //叫1分
        CO_CALL2	 	: 3,	// //叫2分
        CO_CALL3	 	: 4,	// //叫3分
        CO_NOTCALLROB	: 5,	// //不叫地主
        CO_CALLROB	 	: 6,	// //叫地主
        CO_NOTROB	 	: 7,	// //不抢地主
        CO_ROB	 	 	: 8,	// //抢地主
        CO_GIVEUP	 	: 9,	// //过牌
        CO_SHOWCARD	 	: 10,	// //亮牌
        CO_TIMEOUT	 	: 11,	// //超时	
        CO_READY	 	: 12,	// //准备
        CO_NOLORD	 	: 13,	// //本局没有地主，请求清理桌面，重新发牌
        CO_START	 	: 14,	// //开始游戏
        CO_PUT	 	 	: 15,	// //出牌
        CO_LORDCARD	 	: 16,	// //地主底牌
        CO_END	 	 	: 17,	// //游戏结束
        CO_VER	 	 	: 18,	// //游戏版本信息
        CO_DATA	 	 	: 19,	// //保存的玩家信息
        CO_DOUBLE	 	: 20,	// //加倍结束
        CO_F_DOUBLE	 	: 21,	// //不加倍
        CO_T_DOUBLE	 	: 22,	// //加倍
        CO_CAN_LEAVE_TABLE 	: 23,	// //离桌
        CO_FORCE_LEAVE_TABLE 	: 24,	// //强制离桌
        CO_NO_STAMINA 	: 25,	// //没有体力
        CO_DELAY_KEEPSTAR_TIME : 26,
        CO_SUPER_T_DOUBLE: 27, // 超级加倍
    }

    illegalReportList = {}
    curMatchInfo: IMatchInfo;
    checkServerMoneyLimitLevel: number = 0
    isGoToNormalChangCi: boolean = false

    private constructor() {
        this.userProperties[0] = 0
        this.userProperties[ITEM.REDPACKET_TICKET] = 0
        this.userProperties[ITEM.CHIP_ADVANCE] = DataManager.UserData.getItemNum(ITEM.CHIP_ADVANCE)
        this.userProperties[ITEM.CHIP_LEGEND] = DataManager.UserData.getItemNum(ITEM.CHIP_LEGEND)

        AudioManager.setAudioConfig(this.moduleRes, AudioConfig)
    }

    protected onDestroy()
    {

    }

    getIfPreLoadSound() {
        return false
    }

    destory() {
        delete GameLogic.instance
        GameLogic.instance = null
    }

    static Instance() {
        if (!GameLogic.instance) {
            GameLogic.instance = new GameLogic();
        }
        return GameLogic.instance;
    }      

    addPlayerData(data) {
        let findFLag = false
        for (let i = 0; i < this.playerData.length; i++) {
            // const element = this.playerData[i];
            if (data.plyGuid && data.plyGuid > 0 && data.plyGuid == this.playerData[i].plyGuid) {                
                this.removePlayerData(data.plyGuid)
                // this.playerData[i].chairId = data.chairId
                // findFLag = true
            }
            
        }

        // if (!findFLag) {            
        this.playerData.push(data)
        // }
    }

    removePlayerData(uid) {
		for (var i = this.playerData.length - 1; i >= 0; i--) {
			if (uid > 0 && uid == this.playerData[i].plyGuid) {
				this.playerData.splice(i, 1)
			}
		}
    }

    removeAllPlayerData() {
		for (var i = this.playerData.length - 1; i >= 0; i--) {
            if (DataManager.UserData.guid != this.playerData[i].plyGuid) {                
                this.playerData.splice(i, 1)
            }
		}
    }
    
    analyzeSocketInfo(serverInfo) {
        this.serverInfo = serverInfo
        cc.log("analyzeSocketInfo", this.serverInfo)
        // this.extParam
        let extParam = this.serverInfo.extParam

        var params = extParam.split('|')
        
		for (var param of params) {
			var config = param.split(':')
			if (!config[1]) continue

			var reg = config[1].match(/\d+/g)
			if (!reg) continue

			var str_data = config[1] //reg.join('')
			if (config[0] == 'lc_room_mode') {
                this.serverInfo.lc_room_mode = Number(str_data)
            }else if (config[0] == 'winMaxMoney') {
                this.serverInfo.winMaxMoney = Number(str_data)
            }else if (config[0] == 'jumpNextServerMoney') {
                this.serverInfo.jumpNextServerMoney = Number(str_data)
            }else if (config[0] == 'level') {
                this.serverInfo.level = Number(str_data)
            }else if (config[0] == 'winMaxBet') {
                this.serverInfo.winMaxBet = Number(str_data)
            }else if (config[0] == 'winMinBet') {
                this.serverInfo.winMinBet = Number(str_data)
            }else if (config[0] == 'hBMode') {
                this.serverInfo.hBMode = Number(str_data)
            }else if (config[0] == 'server_type') {
                this.serverInfo.server_type = Number(str_data)
            }else if (config[0] == 'tax') {
                this.serverInfo.tax = Number(str_data)
            }else if (config[0] == 'MinDouble') {
                this.serverInfo.winMinBet = Number(str_data)
            }else if (config[0] == 'MaxDouble') {
                this.serverInfo.winMaxBet = Number(str_data)
            }else if (config[0] == 'newbieMode') {
                this.serverInfo.newbieMode = Number(str_data)
            }else if (config[0] == 'RPGMode') {
                this.serverInfo.RPGMode = Number(str_data)
            }else if (config[0] == 'ddz_game_type') {
                this.serverInfo.ddz_game_type = Number(str_data)
            }
        }
    }

    sendMessage<T extends IMessage>(message: T) {
        NetManager.Instance.send(this.socketName, message)
    }

    closeSocket() {
        cc.log("TODO closeSocket")

    }

    MessageBox(param) {
        cc.log("TODO MessageBox")
        MsgBox(param)
    }

    confirmBox(param) {
        cc.log("TODO confirmBox")
        MsgBox(param)
    }

    reEnterGame(gameid, serverid, info) {
        cc.log("TODO reEnterGame")
        this.enterLobby()
    }

    enterLobby() {
        this.LeaveGameScene()
    }


    showShopScene() {
        cc.log("TODO showShopScene")
        showShopPop()
    }

    showTaskPop() {
        SceneManager.Instance.popScene("moduleLobby", "TaskPop")
    }

    setGame(game) {
        this.gamescene = game
    }

    isTwoTable() {
        return this.MAX_PLAYER_NUM == 2
    }

    isKeepInGameTable() {
        return false;
    }

    setUsingGameCarryMoney(flag) {
        this.using_game_carry_money = flag
    }

    isUsingGameCarryMoney() {
        return this.using_game_carry_money;
    }

    isPrivateRoom() {
        return (this.serverInfo.lc_room_mode == 1)
    }

    isMatchTable() {
        return (this.serverInfo.lc_room_mode == 2)
    }

    isRedPacketTable() {
        return (this.serverInfo.lc_room_mode == 3)
    }

    
	getRedPacketTableType() {
		return this.serverInfo.hBMode
	}
    
	confirmBoxParam(param) {
        cc.log("TODO confirmBoxParam")
	}    

    // send message

	proto_cg_get_redpackets_award_req_sender() {
		this.sendMessage({
			opcode: 'proto_cg_get_redpackets_award_req',
			type: 1
		})
    }
    
        
    showGameCardNoteBuyLayer(initParam = null, func = null) {
        if (null == initParam)
            initParam = []
        if (null != func)
            initParam["closeCallback"] = func

        SceneManager.Instance.popScene<String>("moduleRPDdzRes", "GameCardNoteBuyLayer", initParam)
    }

    showGameRedPacketAwardLayer(initParam) {             
        if (!this.gamescene) {    
            return
        }
        if(!this.isSceneExist("GameRedPacketAwardLayer")){
            initParam["logic"] = this
            
            if (!!this.gamescene) {    
                SceneManager.Instance.popScene<String>("moduleBaseRes", "GameRedPacketAwardLayer", initParam)
            }
        }
    }

    showGameWizardLayer(initParam = []) {       
        // if (DataManager.load(WizardConfig.wizard_storage_key + "" + initParam.wizardIndex) == 1) {
        if (DataManager.CommonData.morrow != 0 || DataManager.load(WizardConfig.wizard_storage_key + "" + initParam.wizardIndex) == 1) {
            if (initParam.forceCallBack && initParam.callBack) {
                initParam.callBack()
            }
            return
        }
        initParam["noSing"] = true
        
        if(this.isSceneExist("WizardLayer")){
            return
        }
        if (!!this.gamescene) {    
            SceneManager.Instance.popScene<String>("moduleLobby", "WizardLayer", initParam)
        }
    }

    showGuideLayer(initParam = []) {
        if (DataManager.CommonData.morrow != 0 || DataManager.load("showGuideLayer") == 1) {
            return
        }
        DataManager.save("showGuideLayer", 1)
        if (!!this.gamescene) {
            SceneManager.Instance.popScene<String>("moduleRPDdzRes", "GuideLayer", initParam)
        }
    }

    showNewUserSignPop(initParam = []) {
        SceneManager.Instance.popScene("moduleLobby", "NewUserSignPop", initParam)    
    }

    showExchangePop(initParam = []) {
        SceneManager.Instance.popScene<String>("moduleLobby", "ExchangePop", initParam)
    }

    showGameCommonTipLayer(initParam) {       
        initParam = initParam || [] 
        if (!!this.gamescene) {            
            if (this.isSceneExist("GameCommonTipLayer")) {
                SceneManager.Instance.sendMessageToScene({opcode: "updateGameCommonTip", packet: initParam})
                return
            }
            SceneManager.Instance.popScene<String>("moduleRPDdzRes", "GameCommonTipLayer", initParam)
        }
    }

    showGameMagicEmojiPanel(initParam = {}) {
        if (!!this.gamescene) {       
            let callbackFun = () => {
                DataManager.save(this.socketName + this.gameStorageKey.magic_emoji, 1)
            }			
            this.gamescene.hideFingerWizard(callbackFun)
            initParam["logic"] = this     
            initParam["isBaiYuan"] = this.isBaiYuanMode()
            SceneManager.Instance.popScene<String>("moduleBaseRes", "GameMagicEmojiPanel", initParam)
        }
    }

    showGameSoundPanel(initParam = {}) {
        if (!!this.gamescene) {       
            initParam["logic"] = this     
            SceneManager.Instance.popScene<String>("moduleBaseRes", "GameSoundPanel", initParam)
        }
    }

    showGameResultLayer(initParam = []) { 
        if (!!this.gamescene) {    
            this.clearReportList()
            SceneManager.Instance.popScene<String>("moduleRPDdzRes", "GameResultLayer", initParam)
        }

    }

    showRegainLosePop(initParam = []) {
        if (this.isSceneExist("RegainLosePop")) {
            return
        }
        if (!!this.gamescene) {
            SceneManager.Instance.popScene<String>("moduleRPDdzRes", "RegainLosePop", initParam)
        }
    }

    closeScene(name) {
        SceneManager.Instance.closeScene(name)
    }

    isSceneExist(name) {
        return SceneManager.Instance.isSceneExist(name)
    }

    judgeExitGame() {
        if (this.isPrivateRoom()) {
            if (this.gamescene.isGameStart()) {
                this.showGameCommonTipLayer({
                    msg: "游戏已开始\n需其他玩家确认后才能解散房间~",
                    style: 2,
                    confirmCback: () => { this.gamescene.proto_cb_dismiss_private_table_req_handler() },
                    cancelCback: () => { this.LeaveGameScene() },
                })
            } else {
                if (this.gamescene.bHadStart) {
                    this.showGameCommonTipLayer({
                        msg: "游戏已经开始过\n需其他玩家确认后才能解散房间~",
                        style: 2,
                        confirmCback: () => { this.gamescene.proto_cb_dismiss_private_table_req_handler() },
                        cancelCback: () => { this.LeaveGameScene() },
                    })
                } else if (this.gamescene.privateInvite && this.gamescene.privateInvite.ownerGuid + '' == DataManager.UserData.guid) {
                    this.showGameCommonTipLayer({
                        msg: "游戏未开始\n房间解散后将退还房费",
                        style: 3,
                        confirmCback: () => { this.gamescene.proto_cb_dismiss_private_table_req_handler() },
                        cancelCback: () => { this.LeaveGameScene() },
                    })
                } else {
                    this.showGameCommonTipLayer({
                        msg: "亲，确认要离开游戏吗~",
                        style: 1,
                        confirmCback: () => { this.LeaveGameScene() },
                    })
                }
            }
        } else if (this.isMatchTable()) { 
        } else if (this.gamescene.state == 'startGame') { 
            iMessageBox("请游戏结束后再退出游戏哦~")
        } else if (this.isBaiYuanMode() && this.gamescene.bHadStart && checkAdCanReceive(AdsConfig.taskAdsMap.New_GameRedPacket)) {
            this.showGameCommonTipLayer({
                msg: [
                    { color: "8e7c62", size: 30, text: "再玩" },
                    { color: "ff3e20", size: 30, text: ` ${this.gamescene.hbRoundData.nLimitRound - this.gamescene.hbRoundData.nCurRound} ` },
                    { color: "8e7c62", size: 30, text: "局就可以开启红包\n现在退出，您的局数进度将被清空!" },
                ],
                cancelCback: this.LeaveGameScene.bind(this)
            })
        } else if(this.gamescene.state == 'startGame') {
    		this.showGameCommonTipLayer({
                msg : "如果现在退出游戏，会\n由系统托管，输了的话千万别怪它哦!",
                style: 1,
                confirmCback: () => { this.LeaveGameScene() }
            })
        } else if (checkAdCanReceive(AdsConfig.taskAdsMap.DrawRedpacket) && [21, 22, 23].indexOf(this.getRedPacketTableType()) != -1) {
            const restround = this.redpacket_info.limitRounds - this.redpacket_info.curRounds
            this.showGameCommonTipLayer({
                msg: restround > 0 ? "您当前的福卡进度将被清空，\n确定继续退出吗？" : "确定要退出游戏吗？",
                cancelCback: this.LeaveGameScene.bind(this)
            })
        } else {
            this.LeaveGameScene()
        }
    }
    
    LeaveGameScene(isOnGameExit?: number) {
        czcEvent("斗地主", "离桌1", "游戏返回大厅"+ DataManager.Instance.userTag)
        cc.log("TODO LeaveGameScene")
        const param = { isOnGameExit: 0 }
        if (isOnGameExit != null) {
            param.isOnGameExit = isOnGameExit
        } else if (this.gamescene['state'] == 'startGame') {
            param.isOnGameExit = 1
        }
        gobackToMain(param)
	}

	checkMoneyOutOfRange(showNeedMoneyPop = true, callback = null) {

        if (true || showNeedMoneyPop) {
            // cc.log("checkMoneyOutOfRange", this.serverInfo.minMoney, DataManager.UserData.money, DataManager.UserData)
            if(!this.checkServerMoneyLimit(this.serverInfo)) {
                //通过检测在范围内            
                return true
            }            
        }else {
            if(this.checkMinMoneyOutOfRange(showNeedMoneyPop)) {
                return true
            }

            if (this.checkMaxMoneyOutOfRange(showNeedMoneyPop)) {
                return true
            }
        }
        

		if (callback) {
			callback()
        }
        
        return false
        
    }
    
    goToNormalChangCi() {
        if (GameLogic.Instance().serverInfo.newbieMode != 1) {
            return false
        }

        let gameId = this.serverInfo.gameId
        if (gameId === 389) {
            gameId = 3892
        }
        let servers = getLowMoneyRoom(gameId, this.serverInfo.level)
        if (servers && servers.length > 0) {
            this.isGoToNormalChangCi = true
            this.serverInfo = servers[0]
            this.analyzeSocketInfo(this.serverInfo)
            let url = this.serverInfo.serverAddr + ":" + (this.serverInfo.serverPort + 1)
            NetManager.Instance.close(this.socketName, false)
            NetManager.Instance.setUrl(this.socketName, url)
                
            NetManager.Instance.reconnect(GameLogic.Instance().socketName)	
        
            return true
        }
        return false
    }

	checkMinMoneyOutOfRange(showNeedMoneyPop = true) {
		let minMoney = this.serverInfo.minMoney || 0;
		if(minMoney >= 0 && this.userProperties[0] < minMoney) {
            if (showNeedMoneyPop) {                
                unenoughGold(0, minMoney, () => {this.LeaveGameScene()})
            }
			return true
		}
		return false
	}

	checkMaxMoneyOutOfRange(showNeedMoneyPop = true) {
        // maxmoney
        let MaxMoney = this.serverInfo.maxmoney || 0
        if (this.serverInfo.jumpNextServerMoney != null && MaxMoney > this.serverInfo.jumpNextServerMoney) {
            MaxMoney = this.serverInfo.jumpNextServerMoney
        }
    
        if (this.userProperties[0] > MaxMoney) {				
            let msg = [
                {size: 30, color: "B75737", text: "您的金豆超过" + MaxMoney  + "，是否前往"},
                {size: 30, color: "B75737", text: "\n"},
                {size: 30, color: "B75737", text: "下一个场次进行游戏?"}, 
            ]
            let param = {
                msg: msg,
                style: 1,
                cancelCback: () => { this.LeaveGameScene() }

            }
            if (showNeedMoneyPop) {                
                this.showGameCommonTipLayer(param)
            }
            return true
        }

		return false
    }
    
    addPidToReportList(pid = 0) {
        if(pid > 100000) {
            this.illegalReportList[pid] = true
        }
    }

    isInReportList(pid = 0) {
        if(pid > 100000) {
            return this.illegalReportList[pid] !== undefined
        }
        return false
    }

    clearReportList() {
        this.illegalReportList = {}
    }

    showPrivateZhanJiLayer(initParam) {
        initParam = initParam || []
        if (!!this.gamescene) {
            if (this.isSceneExist("PrivateZhanJiLayer")) {
                SceneManager.Instance.sendMessageToScene({opcode: "updatePrivateZhanJi", packet: initParam})
                return
            }
            SceneManager.Instance.popScene<String>("moduleRPDdzRes", "PrivateZhanJiLayer", initParam)
        }
    }

    showMatchResultLayer() {
        if (!!this.gamescene) {
            if (this.isSceneExist("MatchResultLayer")) {
                return
            }
            SceneManager.Instance.popScene<String>("moduleRPDdzRes", "MatchResultLayer")
        }
    }

    /**
     * 1.玩家选择开始 第一局默认选择
     * 2.支持明牌开始和优先看底牌
     */
    isRPGMode() {
        return this.serverInfo.RPGMode == 1
    }

    /**
     * 1.玩家选择开始 第一局默认开始
     * 2.支持优先看底牌
     */
    isChooseStart() {
        return this.serverInfo.level == 1 || this.isRPGMode()
    }
    
    isBuxipaiMode() {
        return this.serverInfo.ddz_game_type == 2
    }

    isCallScoreMode() {
        return this.serverInfo.ddz_game_type == 1 || this.isBaiYuanMode()
    }

    getCurMatchInfo(): IMatchInfo {
        if (this.curMatchInfo == null) {
            if (DataManager.CommonData.gameServer["matchType"] != null) {
                this.curMatchInfo = DataManager.Instance.matchMap[DataManager.CommonData.gameServer["matchType"]]
            }
        }

        return this.curMatchInfo
    }

    // 0 2轮比赛
    // 1 3轮比赛
    // 2 生存赛
    // 3 闯关赛
    // 4 3轮淘汰赛
    // 5 3轮动态淘汰赛
    // 6 4轮动态淘汰赛
    // 7 4轮淘汰赛
    // 8 4轮动态淘汰赛(固定奖励)

    // 是否为 3 轮赛
    is_three_match() {
        const matchInfo = this.getCurMatchInfo()
        if (matchInfo == null) {
            return false
        }

        return [1, 4, 5].indexOf(matchInfo.competitionRules) != -1
    }

    // 是否为 4 轮赛
    is_four_match() {
        const matchInfo = this.getCurMatchInfo()
        if (matchInfo == null) {
            return false
        }

        return [6, 7, 8].indexOf(matchInfo.competitionRules) != -1
    }

    // 是否为决赛淘汰制
    is_final_out_match() {
        const matchInfo = this.getCurMatchInfo()
        if (matchInfo == null) {
            return false
        }

        return [4, 5, 6].indexOf(matchInfo.competitionRules) != -1
    }

    checkServerMoneyLimit(server) {
        if (server.minMoney > DataManager.UserData.money) {
            if (this.checkServerMoneyLimitLevel == 0) {
                this.checkServerMoneyLimitLevel++
                // if (DataManager.UserData.money < 1000) {
                if (server.level == 1 && DataManager.Instance.getReliefLine() >= server.minMoney) {
                    const pop = () => {
                        if (DataManager.CommonData.reliefStatus["reliefTimes"] > 0) {
                            SceneManager.Instance.popScene("moduleLobby", "BankruptDefend")
                        } else {
                            this.checkServerMoneyLimit(server)
                        }
                    }
    
                    if (DataManager.CommonData.reliefStatus) {
                        pop()
                    } else {
                        getReliefState()
                        DataManager.Instance.node.runAction(cc.sequence([
                            cc.delayTime(2),
                            cc.callFunc(pop)
                        ]))
                    }
                    return false
                }
            }
    
            if (this.checkServerMoneyLimitLevel == 1) {
                this.checkServerMoneyLimitLevel++
                let ExchangeInfos = DataManager.CommonData.ExchangeInfo || []
                const value = server.minMoney - DataManager.UserData.money
                ExchangeInfos = ExchangeInfos.filter(item => {
                    if (item["exchangeItemList"] && item["exchangeItemList"][0] && item["exchangeItemList"][0]["exchangeItem"] === ITEM.REDPACKET_TICKET && DataManager.UserData.getItemNum(ITEM.REDPACKET_TICKET) >= item["exchangeItemList"][0]["exchangeItem"]) {
                        if (item["gainItemList"] && item["gainItemList"][0] && item["gainItemList"][0]["gainItem"] === 0 && item["gainItemList"][0]["gainNum"] >= value) {
                            return true
                        }
                    }
                    return false
                })
                ExchangeInfos.sort((a, b) => a["exchangeItemList"][0]["exchangeNum"] < b["exchangeItemList"][0]["exchangeNum"] ? -1 : 1)
                if (ExchangeInfos.length > 0) {
                    const goods = Object.assign(ExchangeInfos[0])
                    goods.content = "<color=#d4312f><size=36>金豆不足</size></color><br/><br/><color=#8e7c62><size=26>您的金豆不够在本场次玩耍，去换<br/><color=#d4312f><size=26>" + 
                    math.toShort(goods["gainItemList"][0]["gainNum"]) + 
                    "</size></color>金豆继续挑战吧!!</size></color><br/>"
                    SceneManager.Instance.popScene("moduleRPDdzRes", "ExchangeConfirm3Pop", goods)
                    return false
                }
            }
        }
    
        this.checkServerMoneyLimitLevel = 0
        if (server.minMoney > DataManager.UserData.money || server.maxmoney < DataManager.UserData.money) {
            let gameId = server.gameId
            if (gameId === 389)
                gameId = gameId * 10 + parseInt(server.ddz_game_type)
            let servers = getLowMoneyRoom(gameId)
            if (servers && servers.length > 0) {
                let initParam = {
                    title: "提示",
                    content: "<color=#8e7c62><size=26>您的金豆太多了，超出了本场次上<br/>限!重新选个能匹配您水平的场次吧!</size></color><br/>",
                    confirmClose: true,
                    confirmFunc: () => {
                        enterGame(servers[0])
                    },
                    maskCanClose: false,
                    exchangeButton: true,
                    confirmText: "立即前往"
                }
                if (server.minMoney > DataManager.UserData.money) {
                    initParam.content = "<color=#d4312f><size=36>金豆不足</size></color><br/><br/><color=#8e7c62><size=26>您的金豆已不足原场次准入，是否选<br/>择较低场次进行游戏!</size></color><br/>"
                }
                MsgBox(initParam)
            } else if (server.maxmoney < DataManager.UserData.money) {
                let initParam = {
                    title: "提示",
                    content: "<color=#8e7c62><size=26>您的金豆已经大于场次最高上限</size></color><br/>",
                    buttonNum: 1,
                    confirmClose: true,
                    maskCanClose: false
                }
                MsgBox(initParam)
            } else if (server.maxmoney > DataManager.UserData.money) {
                let initParam = {
                    title: "提示",
                    content: "<color=#8e7c62><size=26>您的金豆已不足本场次准入，请先获取更多金豆吧！</size></color><br/>",
                    confirmClose: true,
                    confirmFunc: () => {
                        this.LeaveGameScene()
                    },
                    maskCanClose: false,
                    exchangeButton: true,
                    confirmText: "退出游戏"
                }
                MsgBox(initParam)
            }
            return false
        }
    
        return true
    }

    showNewbieRedpacketPop(initParam: any) {
        SceneManager.Instance.popScene<String>("moduleRPDdzRes", "NewbieRedpacketPop", initParam)
    }

    showItemAdd(initParam: any) {
        SceneManager.Instance.popScene<String>("moduleRPDdzRes", "ItemAdd", initParam)
    }

    getWinMaxMoney() {
		let winMaxMoney = 1
		if (this.serverInfo.winMaxMoney > 0) {
			winMaxMoney = this.serverInfo.winMaxMoney
		} else {
			winMaxMoney = this.serverInfo.winMaxBet * this.serverInfo.baseBet
		}
		return winMaxMoney
	}
    
    showHighlightPopup(initParam: any) {
        SceneManager.Instance.popScene<String>("moduleRPDdzRes", "HighlightPopup", initParam)
    }

    showWinDoublePop(message: Iproto_gc_win_doubel_req) {
        SceneManager.Instance.popScene<String>("moduleRPDdzRes", "WinDoublePop", message)
    }

    isBaiYuanMode() {
        return this.serverInfo.ddz_game_type == 3
    }

    turnBaiYuan(n: number) {
        return n / 100
    }
}

 