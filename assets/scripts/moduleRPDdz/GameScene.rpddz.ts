import BaseFunc = require("../base/BaseFunc")
import { AdsConfig } from "../base/baseData/AdsConfig";
import DataManager from "../base/baseData/DataManager";
import { copyToClipBoard, czcEvent, extendMatchLogic, getNewBieRoundLimit, getRedPacketAwardConfig, iMessageBox, playADBanner, share, showAwardResultPop, numberFormat, uploadKuaiShou } from "../base/BaseFuncTs";
import SceneManager from "../base/baseScene/SceneManager";
import GameMagicEmoji from "../moduleBase/GameMagicEmoji";
import { check03ExchangeGoods, checkAdCanReceive, receiveAdAward } from "../moduleLobby/LobbyFunc";
import { WizardConfig } from "../moduleLobby/WizardConfig";
import AudioManager from "./AudioManager.rpddz";
import CardNode from "./CardNode.rpddz";
import GameLogic from "./GameLogic.rpddz";
import GamePlayer from "./GamePlayer.rpddz";
import GameRule from "./GameRule.rpddz";
import GameSceneStateController from "./GameSceneStateController.rpddz";
import MatchGame from "./MatchGame.rpddz";
import PopupManager from "./PopupManager";
import { ITEM } from "../base/baseData/ItemConfig";
import NetManager from "../base/baseNet/NetManager";
import { NodeExtends } from "../base/extends/NodeExtends";
import { http } from "../base/utils/http";
import { math } from "../base/utils/math";


const {ccclass, property} = cc._decorator;
// let GameLogic.Instance() = GameLogic.Instance()

@ccclass
export default class GameScene extends GameSceneStateController {

    @property(cc.Prefab)
    prefab_magic_emoji:cc.Prefab = null

    @property(cc.Prefab)
    prefab_bigCard:cc.Prefab = null
    
    @property(cc.Prefab)
    prefab_gamePlayer:cc.Prefab = null
	
    @property(cc.Prefab)
    smallCard:cc.Prefab = null

    @property(cc.Prefab)
    prefab_privateRoom:cc.Prefab = null

    @property(cc.Prefab)
    prefab_MatchGame:cc.Prefab = null

    lordCards:CardNode [] = []

    @property()
    thisComponentName:string = "GameScene.rpddz"
    
    @property()
    tipIndex:number = 0
    nSerialID:number = 0
    fakeRedPacketNum:number = 0
	nowcChairID:number = -1
	
	nowCardType:ICardsType = null

    @property(GamePlayer)
	players:GamePlayer[] = []
	
    @property(GamePlayer)
	myPlayer:GamePlayer = null
	
	@property()
	curRoundIsSpring:boolean = false
	enableCardCounter:boolean = true

	cardsCount = [] //记牌器

    card_put_down = {
        x : -1,
        y : -1,
        count : 0,
	}
	privateInvite: { gameId: number, serverId: number, tableId: number, baseScore: number, inviteCode: number, createTime: number, tableTime: number, flag: number, ownerGuid: number, roomName: string, gameRule: number, gameRule_group: number[], gameJson: string, startGameTime: number, leftTime: number, }
	tableScores: number[] = [];
	bHadStart: boolean = false;
	startPutCards: boolean = false;
	nJuCount: number;
	force_dismiss: boolean = false;
	bJiaoFen: boolean = false;
	beishuInfo: {vecBeiShuInfo:number[],vecPlayerBeiShu:number[] };
	robNum: number = 0;
	nLordLetNum: number = 0;
	isQiangDiZhu: boolean = false;
	isShowLordCardNot: boolean = false;
	matchGame: MatchGame
	isReconnecte: boolean;
	firstShowStartGame: boolean;
	nodeBet: cc.Node;
	regainLose: Iproto_gc_regain_lose_score_ack;
	nBombTips: number;
	isLookCard: boolean;
	lookcard_tips: cc.Node;
	nodeLookCard: cc.Node;
	prefab_bigCardPool: cc.NodePool;
	shouldShowTopNode1: boolean = true;
	shouldShowTopNode2: boolean = true;
	showPutShowCard: boolean = false;
	level03ExchangeGoodsTips = 0;
	node_player_hand_card0: cc.Node;
	nodeMain: cc.Node;
	ani_spine_mingpai: cc.Node;
	ani_spine_super_jiabei: cc.Node;
	msg_proto_gc_get_redpackets_newbie_award_req: any;
	msg_proto_gc_game_result_not1: IGameResult;
	tipCards: ICard[][] = []
	popupmanager: PopupManager; // 游戏结束后顺序弹框
	nDouble: number; //倍数
	nGameMoney: number; //底注
	lastExchangeItemId: number; // 上次要兑换的道具
	msg_proto_gc_win_doubel_req: Iproto_gc_win_doubel_req;

	

	onFixShortScreen() {
		this.GameButton.scale = 0.8
	}

    start() {        
        // this.addListener("proto_lc_verity_ticket_ack", this.proto_cl_verify_ticket_req, this)
    }

    onOpenScene () {
		if (DataManager.Instance.userTag != "老用户") {
			czcEvent("斗地主", "进入游戏", "显示游戏界面" + DataManager.Instance.userTag)
		}
		cc.log("GameScene onOpenScene");

		if(GameLogic.Instance().isMatchTable()) {
			this["gameLogic"] = GameLogic.Instance()
			extendMatchLogic(this)
		}

		// 在断线重连成功后自动登录
		NetManager.Instance.setSocketLoginFunc(GameLogic.Instance().socketName, this.proto_cb_login_req_sender.bind(this))

		this.registMessageHandler()
		
		AudioManager.playBackground()		

		this.initRedPacket()

        this.bindScript()        
		
        this.initTouchScene()

        this.initNodePool()

		this.addLordCards();

		this.initBroadcast()

		this.showPrivateRoom()

		this.showMatchGame()

		this.doStateChangeInit()
		
		this.showChangCiInfo()

		this.showAniWait()

		this.btnNewUserSign.active = false

		if(!!DataManager.CommonData["NewUserSgin"] && !!DataManager.CommonData["NewUserSgin"].day)
		{
			this.btnNewUserSign.active = false && DataManager.CommonData["NewUserSgin"].day <= 7
		}

		if (GameLogic.Instance().getRedPacketTableType() == 22) {			
			if (DataManager.CommonData["regtime"] > 1573142400) { //20191031
			}
		}else if (GameLogic.Instance().getRedPacketTableType() == 23) {	
			if (DataManager.CommonData["regtime"] > 1578412800) { //20200108
			}
		}

		this.refreshCardNoteNum(DataManager.UserData.getItemNum(ITEM.CARD_RECORD))
		this.refreshLookCardNum(DataManager.UserData.getItemNum(ITEM.LOOK_LORDCARD))

		if (!GameLogic.Instance().isRedPacketTable()) {
			this.nodeRedPacket.active = false
		}
		this.btnShowStart.active = GameLogic.Instance().isRPGMode()
		// this.firstShowStartGame = DataManager.CommonData["morrow"] == 0
		// 默认第一次进入时自动准备
		this.firstShowStartGame = true
		this.RedPacketsNewbieABTest()

		if (!this.prefab_magic_emoji) {
			cc.loader.loadRes("moduleBaseRes/prefab/GameMagicEmoji", cc.Prefab, (err, prefab) => {
				if (err) {
					cc.log(err)
				} else {
					this.prefab_magic_emoji = prefab
				}
			})
		}

		this['btnPiece'].runAction(cc.repeatForever(cc.sequence([
			cc.scaleTo(0.5, 1.2),
			cc.scaleTo(0.5, 1),
			cc.delayTime(1),
		])))

		// 预加载资源
		AudioManager.preloadAudio()
	}

	RedPacketsNewbieABTest() {
		if (DataManager.CommonData["first"] != 1) {
			return
		}
		if (DataManager.CommonData["RedPacketsNewbieABTest"]) {
			return
		}
		DataManager.CommonData["RedPacketsNewbieABTest"] = true
		if (!DataManager.Instance.getOnlineParamSwitch("RedPacketsNewbieABTest")) {
			return
		}
		if (!checkAdCanReceive(AdsConfig.taskAdsMap.NewbieRedpacket)) {
			return
		}
		this.firstShowStartGame = false
		GameLogic.Instance().showNewbieRedpacketPop({
			nAmount: DataManager.Instance.onlineParam.RedPacketsNewbieAmount || 10000,
			closeCallback: () => {
				if (this['btnStartGame'].activeInHierarchy) {
					this.onPressStartGame()
				} else if (this['btnContinue'].activeInHierarchy) {
					this.onPressContinue(undefined, undefined)
				}
			}
		})
	}

	wizardRedPacket() {
		// this.refreshRedPacketInfo(0, 4);
        let initParam = {
            node: this.nodePlusRedPacket,
			wizardIndex: WizardConfig.ALLKEY.WIZARD_INDEX_GAME_HONGBAO,
			forceCallBack: true,
            callBack: () => {
				// this.proto_cb_join_table_req_sender()
            }
        }
        GameLogic.Instance().showGameWizardLayer(initParam)

	}

	wizardHongBaoQuan() {
        let initParam = {
            node: this.myPlayer.nodeRedPacket,
            wizardIndex: WizardConfig.ALLKEY.WIZARD_INDEX_GAME_DUIHUAN,
			forceCallBack: true,
            callBack: () => {
                this.wizardRedPacket()
            }
        }
        GameLogic.Instance().showGameWizardLayer(initParam)
		
	}


    // CALLBACKS After __preload
    __bindButtonHandler() {
        cc.log("__bindButtonHandler")
        // BaseFunc.AddClickEvent(this.btnDebugLeft, this.node, "GameScene.rpddz", "onPressDebugLeft");     
        

		BaseFunc.AddClickEvent(this["btnBuJiao"], this.node, this.thisComponentName, "onPressJiao", 0, 3);
		BaseFunc.AddClickEvent(this["btnJiaoDiZhu"], this.node, this.thisComponentName, "onPressJiao", 1, 3);
		BaseFunc.AddClickEvent(this["btnJiao1"], this.node, this.thisComponentName, "onPressJiao", 1, 3);
		BaseFunc.AddClickEvent(this["btnJiao2"], this.node, this.thisComponentName, "onPressJiao", 2, 3);
		BaseFunc.AddClickEvent(this["btnJiao3"], this.node, this.thisComponentName, "onPressJiao", 3, 3);
		BaseFunc.AddClickEvent(this["btnBuQiang"], this.node, this.thisComponentName, "onPressQiang", 0, 3);
		BaseFunc.AddClickEvent(this["btnQiangDiZhu"], this.node, this.thisComponentName, "onPressQiang", 1, 3);
		BaseFunc.AddClickEvent(this["btnTiShi"], this.node, this.thisComponentName, "onPressTiShi", 0, 3);
		BaseFunc.AddClickEvent(this["btnBuChu"], this.node, this.thisComponentName, "onPressChuPai", 0, 3);
		BaseFunc.AddClickEvent(this["btnPutShowCard"], this.node, this.thisComponentName, "onPressPutShowCard", 0, 3);
		BaseFunc.AddClickEvent(this["btnYaoBuQi"], this.node, this.thisComponentName, "onPressChuPai", 0, 3);
		BaseFunc.AddClickEvent(this["btnChuPai"], this.node, this.thisComponentName, "onPressChuPai", 1, 3);
		BaseFunc.AddClickEvent(this["btnContinue"], this.node, this.thisComponentName, "onPressContinue", 0, 3);
		BaseFunc.AddClickEvent(this["btnChangeTable"], this.node, this.thisComponentName, "onPressChangeTable", 1, 3);
		BaseFunc.AddClickEvent(this["btnBuJiaoBei"], this.node, this.thisComponentName, "onPressJiaBei", 1, 3);
		BaseFunc.AddClickEvent(this["btnJiaBei"], this.node, this.thisComponentName, "onPressJiaBei", 2, 3);
		BaseFunc.AddClickEvent(this["btnSuperJiaBei"], this.node, this.thisComponentName, "onPressJiaBei", 4, 3);
		BaseFunc.AddClickEvent(this["btnQuxiaotuoguan"], this.node, this.thisComponentName, "onPressTuoGuan", 0, 3);
		BaseFunc.AddClickEvent(this["btnExit"], this.node, this.thisComponentName, "onPressExit", 0, 3);
		BaseFunc.AddClickEvent(this["btnRedPacketDetail"], this.node, this.thisComponentName, "onPressRedPacketDetail", 0, 3);
		BaseFunc.AddClickEvent(this["btnExchange"], this.node, this.thisComponentName, "onPressExchange", 0, 3);
		BaseFunc.AddClickEvent(this["btnShop"], this.node, this.thisComponentName, "onPressShop", 0, 3);
		BaseFunc.AddClickEvent(this["btnTask"], this.node, this.thisComponentName, "onPressTask", 0, 3);
		BaseFunc.AddClickEvent(this["btnNewUserSign"], this.node, this.thisComponentName, "onPressNewUserSign", 0, 3);
		BaseFunc.AddClickEvent(this["btnCardCounter"], this.node, this.thisComponentName, "onPressCardCounter", 0, 3);
		BaseFunc.AddClickEvent(this["btnStartGame"], this.node, this.thisComponentName, "onPressStartGame", 0, 3);
		BaseFunc.AddClickEvent(this["btnShowStart"], this.node, this.thisComponentName, "onPressShowStart", 5, 3);
		BaseFunc.AddClickEvent(this["btnLookCard"], this.node, this.thisComponentName, "onPressLookCard", 0, 3);
		BaseFunc.AddClickEvent(this["btnShowCard"], this.node, this.thisComponentName, "onPressShowCard", 2, 3);
		BaseFunc.AddClickEvent(this["nodeBigBet"], this.node, this.thisComponentName, "onPressShowBeishuInfo", 0, 3);
		BaseFunc.AddClickEvent(this["btnShowBeishuInfo"], this.node, this.thisComponentName, "onPressShowBeishuInfo", 0, 3);
		BaseFunc.AddClickEvent(this["btn_lookcard"], this.node, this.thisComponentName, "onPressLookCardItem", 0, 3);
	}

	proto_gc_regain_lose_score_ack(event) {
		cc.log("proto_gc_regain_lose_score_ack", event.packet)
		this.regainLose = event.packet
	}

	proto_gc_win_doubel_req(event) {
		cc.log("proto_gc_win_doubel_req", event.packet)
		this.msg_proto_gc_win_doubel_req = event.packet
	}

	addLordCards() {
        
        let sumCard = 3
        let CardDiss = 40
        let CardScale = 1
        
		for (let i = 0; i < sumCard; i++) {
			let nodeCard = this.smallCardPool.get()
			nodeCard.x = (2 * i - sumCard + 1) / 2 * CardDiss
			nodeCard.scale = CardScale
			this.nodeLordCard.addChild(nodeCard)
			this.lordCards.push(nodeCard.getComponent(CardNode))
		}
    }    
    
	initTouchScene() {
		if (DataManager.Instance.getOnlineParamSwitch("BackgroundChange", 1)) {
			let BackgroundChangeDays = DataManager.Instance.onlineParam.BackgroundChangeDays
			let newBg = false
			if (BackgroundChangeDays == -1) {
				newBg = true
			} else {
				if (BackgroundChangeDays == null) {
					BackgroundChangeDays = 3
				}
				newBg = DataManager.CommonData["morrow"] < BackgroundChangeDays
			}
			this.$("sptBackground1").active = !newBg
			this.$("sptBackground2").active = newBg
		}
        this.sptBackground.on(cc.Node.EventType.TOUCH_START, (event) => {
        	// cc.log(event.currentTouch._point.x)
        	// cc.log(event.currentTouch._point.y)
            this.doubleClickPutdownCards(event.currentTouch._point.x, event.currentTouch._point.y); 

        }, this);
	}
	

    
	doubleClickPutdownCards(x, y) {

	    if (this.card_put_down.x == -1) {
	        this.card_put_down.x = x;
	    }
	    if (this.card_put_down.y == -1) {
	        this.card_put_down.y = y;
	    }

	    if ((Math.abs(this.card_put_down.x - x) > 20) || (Math.abs(this.card_put_down.y - y) > 20)){
	        return;
	    }

	    this.card_put_down.count++;

	    if (this.card_put_down.count == 1) {

	        let interval = 0.225  
	        let repeatIndex = 2
	        let index = 0;

	        let OnTimer = (dt) => {
                this.card_put_down.count = 0;
                this.card_put_down.x = -1;
                this.card_put_down.y = -1;
	        }

	        let actions = []
	        actions[actions.length] = cc.delayTime(interval)
	        actions[actions.length] = cc.callFunc(OnTimer)
	        this.node.runAction(cc.sequence(actions))
	    }

	    if (this.card_put_down.count >= 2) {
	    	this.card_put_down.count = 0
			this.myPlayer.handCard.releaseSelectedCards()			
            this.card_put_down.count = 0;
            this.card_put_down.x = -1;
            this.card_put_down.y = -1;
	    }
	}

    
	initNodePool() {
        //手牌        
        this.prefab_bigCardPool = new cc.NodePool();      
        for(let i = 0 ; i < 60 ; i++){
            this.prefab_bigCardPool.put(cc.instantiate(this.prefab_bigCard));     //牌
        }

        //地主牌    
        this.smallCardPool = new cc.NodePool();      
        for(let i = 0 ; i < 3 ; i++){
            this.smallCardPool.put(cc.instantiate(this.smallCard));     //牌
        }
        
        //sopCoinPool 输赢吸金币
        this.sopCoinPool = new cc.NodePool();        
        for(let i = 0 ; i < 0 ; i++){
        // for(let i = 0 ; i < 150 ; i++){
            let spriteAni = new cc.Node("spriteAni");	        
            spriteAni.sprite = spriteAni.addComponent(cc.Sprite);			
			NodeExtends.setNodeSprite({ node: spriteAni, url: "moduleRPDdzRes/images/GamePlayer/login_pic_bean" })


            this.sopCoinPool.put(spriteAni)
        }
    }

    bindScript() {
        GameLogic.Instance().setGame(this)

		for (let i = 0; i < 3; i++) {
            let nodePlayer = cc.instantiate(this.prefab_gamePlayer) //this['nodeGamePlayer' + i]
			this["nodeGamePlayerPos" + i].getComponent(cc.Widget).updateAlignment()
            this["nodeGamePlayerPos" + i].addChild(nodePlayer)

            let player = nodePlayer.getComponent(GamePlayer)
            let param = {
                nodeHandcard: this["node_player_hand_card" + i],
                nodePutcard: this["node_player_put_card" + i],
            }
            player.setChairId(i, param)
			player.doStateChangeLeave()
			this.players.push(player)
		}
		this.myPlayer = this.players[0]
		
		GameLogic.Instance().userData.plyBaseData.plyGuid = Number(DataManager.UserData.guid)
		GameLogic.Instance().userData.plyBaseData.nickname = DataManager.UserData.nickname
		GameLogic.Instance().userData.plyBaseData.money = DataManager.UserData.money
		GameLogic.Instance().userData.plyBaseData.headimage = DataManager.UserData.face
		GameLogic.Instance().userData.plyBaseData.sex = DataManager.UserData.sex
		
		this.myPlayer.setUserData(GameLogic.Instance().userData.plyBaseData)
		this.myPlayer.setItemView(365, DataManager.UserData.getItemNum(365))
		

	}
	
    // State Function start ===================================
    onEnterState() {
        cc.log("GameLogic.Instance().dizhu", GameLogic.Instance().dizhu)
        // cc.log("GameScene.onEnterState: " + this.state)
        // if(this.isGameStart()){
        //     cc.log("gameing")
        // }else {
        //     cc.log("not gameing")
        // }
    }

    onEnterInit() {
        cc.log("GameScene.onEnterInit")
		
		this.hideTopNode(true)

        this.showLordCard(null, null, true);
		
        this.setDiZhu(0)
		
		this.setDouble(1)	
		
		this.showChangCiSpt() 		
		
		NetManager.Instance.getSocketState(GameLogic.Instance().socketName) && this.proto_cb_login_req_sender()
		
		this.hideCardCounterBtn()
	}

    onEnterReady() {
        cc.log("GameScene.onEnterReady")
    }

    onEnterStartGame() {
        cc.log("GameScene.onEnterStartGame")
		// 未能正常准备
		for (let i = 0; i < GameLogic.Instance().MAX_PLAYER_NUM; ++i) {
			const player = this.players[i]
			if (player.state == "endGame") {
				player.doStateChangeStay()
				player.doStateChangeReady()
			}
		}
		this.clearDesk()
		
	    for (let i = 0; i < GameLogic.Instance().MAX_PLAYER_NUM; ++i){
			this.players[i].doStateChangeStartGame()
	    }
		
		AudioManager.playSound('audio_start')

		if (GameLogic.Instance().isMatchTable()) {
			this.matchGame.setState(true)
		}

		this.showTopNode()

		this.hideChangCiInfo()
		
		this.update03ExchangeGoodsTip()

		this.showNewbieRedpacketTips()

		if(DataManager.CommonData["morrow"] > 2) {
			if (DataManager.load(GameLogic.Instance().socketName + GameLogic.Instance().gameStorageKey.magic_emoji) != 1) {		
				this.showFingerWizard(this["nodeGamePlayerPos2"])
			}
		}
	}
	
	showFingerWizard(node) {		

		let dstPos = node.parent.convertToWorldSpaceAR(node.getPosition())		
		dstPos = this["nodeAniFinger"].parent.convertToNodeSpaceAR(dstPos);
		this["nodeAniFinger"].active = true
	}

	hideFingerWizard(callback?) {
		this["nodeAniFinger"].active = false
		if (!!callback) {
			callback()
		}
	}

    onEnterDeal() {
        cc.log("GameScene.onEnterDeal")
    }

    onEnterSelectLord() {
        cc.log("GameScene.onEnterSelectLord")
    }

    onEnterDealLordCard() {
        cc.log("GameScene.onEnterDealLordCard")
    }

    onEnterGamePlaying() {
        cc.log("GameScene.onEnterGamePlaying")
    }

    onEnterEndGame() {
		cc.log("GameScene.onEnterEndGame")
		DataManager.CommonData["roleCfg"]["roundSum"] = (null != DataManager.CommonData["roleCfg"]["roundSum"]) ? DataManager.CommonData["roleCfg"]["roundSum"] + 1 : 0

	    for (let i = 0; i < GameLogic.Instance().MAX_PLAYER_NUM; ++i){
			const player = this.players[i]
			if (player.state == "stay" || player.state == "ready") {
				player.doStateChangeStartGame()
			}
			this.players[i].doStateChangeEndGame()
		}
		this.showAuto(false)
    }

    onEnterSettleForRound() {
        cc.log("GameScene.onEnterSettleForRound")
    }

    onEnterReInit() {
		cc.log("GameScene.onEnterReInit")
		
		this.clear_put_cards_area()
		
		this.clearDesk()
		
		this.showLordCard(null, null, true);
		
		this.hideTopNode()
		
		// 地主头像
	    for (let i = 0; i < GameLogic.Instance().MAX_PLAYER_NUM; ++i){
			// this.players[i].clearHandcard()
			this.players[i].clearGameData()
		}
		
		GameLogic.Instance().removeAllPlayerData()

		this.hideCardCounterBtn()

    }
    // State Function end ===================================
	registMessageHandler() {	

		this.addListener("proto_bc_login_ack", this.proto_bc_login_ack_handler.bind(this))
		
		this.addListener("proto_bc_update_ply_data_not", this.proto_bc_update_ply_data_not_handler.bind(this))
		
		this.addListener("proto_lc_send_user_data_change_not", this.proto_lc_send_user_data_change_not_handler.bind(this))
		
		this.addListener("proto_bc_join_table_ack", this.proto_bc_join_table_ack_handler.bind(this))
		
		this.addListener("proto_bc_ply_join_not", this.proto_bc_ply_join_not_handler.bind(this))
		
		this.addListener("proto_bc_ready_not", this.proto_bc_ready_not_handler.bind(this))
		
		this.addListener("proto_gc_update_player_tokenmoney_not", this.proto_gc_update_player_tokenmoney_not_handler.bind(this))
		
		this.addListener("proto_gc_refresh_card_not", this.proto_gc_refresh_card_not_handler.bind(this))		
		//名字是start 其实是发牌结束了
		this.addListener("proto_gc_game_start_not", this.proto_gc_game_start_not_handler.bind(this))		
		
		this.addListener("proto_gc_common_not", this.proto_gc_common_not_handler.bind(this))		
		
		this.addListener("proto_gc_clienttimer_not", this.proto_gc_clienttimer_not_handler.bind(this))		
		
		this.addListener("proto_gc_bomb_not", this.proto_gc_bomb_not_handler.bind(this))		
		
		this.addListener("proto_gc_lord_card_not", this.proto_gc_lord_card_not_handler.bind(this))		

		this.addListener("proto_gc_play_card_not", this.proto_gc_play_card_not_handler.bind(this))		
		
		this.addListener("proto_bc_leave_table_ack", this.proto_bc_leave_table_ack_handler.bind(this))		

		this.addListener("proto_bc_ply_leave_not", this.proto_bc_ply_leave_not_handler.bind(this))		
		
		this.addListener("proto_gc_get_redpackets_award_ack", this.proto_gc_get_redpackets_award_ack_handler.bind(this))		
		
		this.addListener("proto_gc_game_result_not1", this.proto_gc_game_result_not1_handler.bind(this))		
		
		this.addListener("proto_gc_call_score_req", this.proto_gc_call_score_req_handler.bind(this))		
		
		this.addListener("proto_gc_rob_lord_req", this.proto_gc_rob_lord_req_handler.bind(this))		
		
		this.addListener("proto_gc_double_score_req", this.proto_gc_double_score_req_handler.bind(this))		
		
		this.addListener("proto_gc_play_card_req", this.proto_gc_play_card_req_handler.bind(this))		
		
		this.addListener("proto_gc_auto_not", this.proto_gc_auto_not_handler.bind(this))		
		
		this.addListener("proto_bc_specify_item_update_not", this.proto_bc_specify_item_update_not_handler.bind(this))		
		
		this.addListener("proto_gc_complete_data_not", this.proto_gc_complete_data_not_handler.bind(this))	

		this.addListener("proto_gc_get_redpackets_award_not", this.proto_gc_get_redpackets_award_not_handler.bind(this))		
		// 私人房
		this.addListener("proto_bc_create_table_ack", this.proto_bc_create_table_ack_handler.bind(this))
		this.addListener("proto_bc_private_invite_code_not", this.proto_bc_private_invite_code_not_handler.bind(this))
		this.addListener("proto_bc_dismiss_private_table_ack", this.proto_bc_dismiss_private_table_ack_handler.bind(this))
		this.addListener("proto_bc_force_dismiss_private_table_req", this.proto_bc_force_dismiss_private_table_req_handler.bind(this))
		this.addListener("proto_bc_force_dismiss_private_table_not", this.proto_bc_force_dismiss_private_table_not_handler.bind(this))
		this.addListener("proto_gc_had_start_not", this.proto_gc_had_start_not_handler.bind(this))
		this.addListener("proto_gc_ju_count_not", this.proto_gc_ju_count_not_handler.bind(this))
		this.addListener("proto_gc_private_room_result_ack", this.proto_gc_private_room_result_ack_handler.bind(this))
		this.addListener("proto_gc_private_room_result_not", this.proto_gc_private_room_result_not_handler.bind(this))
		this.addListener("proto_gc_pause_game_not", this.proto_gc_pause_game_not_handler.bind(this))
		this.addListener("proto_gc_play_card_private_not", this.proto_gc_play_card_not_handler.bind(this))
		this.addListener("proto_gc_show_card_req", this.proto_gc_show_card_req_handler.bind(this))
		this.addListener("proto_gc_show_card_not", this.proto_gc_show_card_not_handler.bind(this))
		this.addListener("proto_gc_beishu_info_ack", this.proto_gc_beishu_info_ack_handler.bind(this))

		// 快速赛需要让牌张数
		this.addListener("proto_gc_two_lord_card_not", this.proto_gc_two_lord_card_not_handler.bind(this))
		this.addListener("proto_gc_two_let_card_not", this.proto_gc_two_let_card_not_handler.bind(this))

		// 游戏结束后的顺序弹窗
		const popupManager  = new PopupManager([
			this.checkGameEndPops_NewbieRedpacket.bind(this),
			this.checkGameEndPops_GameResult.bind(this),
		])
		this.addListener("GameScene_PopupManager", popupManager.showPopup.bind(popupManager))
		this.popupmanager = popupManager
	}

	
	empty_handler(event) {
		let message = event.packet
	}

	socket_closed(event) {
		let socketlink = GameLogic.Instance().serverInfo.serverAddr + ":" + (GameLogic.Instance().serverInfo.serverPort + 1)
		cc.log("socket_closed", event.socket.url, socketlink)
		if (event && event.socket && event.socket.url && event.socket.url == socketlink) {			
			iMessageBox("服务器连接失败！")
			GameLogic.Instance().LeaveGameScene(-1)
		}
	}

	proto_gc_magic_emoji_config_not(event) {
		let message = event.packet
		cc.log(message.emojiConfigs)
		GameLogic.Instance().emojiConfigs = message.emojiConfigs
	}

	proto_lc_send_user_data_change_not_handler(event) {
		cc.log("proto_lc_send_user_data_change_not_handler")
		let message = event.packet
		if (this.myPlayer) {			
			this.myPlayer.setItemView(0, DataManager.UserData.money)
			this.myPlayer.setItemView(365, DataManager.UserData.getItemNum(365))
			this.refreshCardNoteNum(DataManager.UserData.getItemNum(ITEM.CARD_RECORD))
			this.refreshLookCardNum(DataManager.UserData.getItemNum(ITEM.LOOK_LORDCARD))
		}
		// plyItems
		// plyLobbyData
	}

	proto_bc_update_ply_data_not_handler(event) {
		cc.log("proto_bc_update_ply_data_not_handler")
		let message = event.packet
		
		var player = this.getPlayerByGuid(message.plyGuid)
		if (player) {
			if (message.uptType == 0) {
				player.setItemView(0, message.amount)
			} else if (message.uptType == 75) {
				player.setScoreNum(message.amount)
			}
		}
	}
	
	proto_bc_specify_item_update_not_handler(event) {
		let message = event.packet
		
		var player = this.getPlayerByGuid(message.plyGuid)
		if (player) {
			player.setItemView(message.index, message.num)
		}
	}
	
	proto_gc_complete_data_not_handler(event) {
		let message = event.packet		
		this.isReconnecte = true
		
		this.setDouble(1)
		// 隐藏桌面按钮
		this.hidGameButton()
		this.showStartGame(false)

		this.myPlayer.dealCardFlag = false

		this.showTopNode()
		
		let hasLord = false

		for (let card of message.vecLordCards) {
			if (card.mNValue > 0 && card.mNValue <= 16) {
				hasLord = true
				break
			}
		}

		// 地主牌
		if (hasLord) {
			this.showLordCard(message.vecLordCards, true) 

			this.proto_gc_lord_card_not_handler({packet:{
				cLord: message.cLord,
				vecCards: message.vecLordCards,
				noAction: true,
			}})

			this.proto_gc_common_not_handler({packet:{
				nOp: 0
			}})
		}

		this.proto_gc_bomb_not_handler({packet:{
			nDouble: message.nDouble,
		}})

		this.proto_gc_game_start_not_handler({packet:{
			nSerialID: 0,
			nGameMoney: message.nGameMoney,
		}})

		
		for (let userData of message.vecData) {
			this.proto_gc_refresh_card_not_handler({packet:{			
				cChairID: userData.cChairID,
				vecCards: userData.vecHandCards
			}})
			
			this.proto_gc_play_card_not_handler({packet:{			
				cChairID: userData.cChairID,
				vecCards: userData.vecPutCards
			}})
		
		}

		this.proto_cg_card_count_req_sender()

		this.isShowLordCardNot = hasLord
		this.isReconnecte = false
	}
	
	proto_gc_auto_not_handler(event) {
		let message = event.packet
		var player = this.getPlayerByChairID(message.cChairID)
		if (player) {
			var auto = (message.cAuto == 1) ? true : false
			if (player.chairid == this.myPlayer.chairid) {
				this.showAuto(auto)
			} else {
				player.showAuto(auto)
			}
		}
	}
	
	proto_gc_play_card_req_handler(event) {
		let message = event.packet

		this.nSerialID = message.nSerialID
		this.myPlayer.clear_put_cards_area()
		this.tipIndex = 0
		this.showAuto((message.cAuto == 1) ? true : false)
		this.showPutButton()
		this.showPutShowCard = false
	}
	
	
	proto_gc_double_score_req_handler(event) {
		let message = event.packet

		for (var player of this.players) {
			player.hideGameTip(true)
		}
		this.nSerialID = message.nSerialID //序列ID
		this.showJiaBei()
	}
	
	proto_gc_call_score_req_handler(event) {
		let message = event.packet

		this.nSerialID = message.nSerialID //序列ID
		this.showCallScore(message.nScore)
	}
	
	proto_gc_rob_lord_req_handler(event) {
		let message = event.packet

		this.nSerialID = message.nSerialID //序列ID
		this.showRobLord()
	}	
	
	proto_gc_game_result_not1_handler(event) {
		czcEvent("斗地主", "游戏2", "显示游戏结算界面" + DataManager.Instance.userTag)
		const message: Iproto_gc_game_result_not1 & IGameResult = event.packet
		this.startPutCards = false
		cc.find("nodeMain/nodeGamePlayer/nodeGamePlayer0/newbieRedpacketTips", this.node).active = false
		this.showBeishuInfo(false)
		this.clearLookCard()
		this.hideFingerWizard()
		if (GameLogic.Instance().isMatchTable()) {
			this.matchGame.setState(false)
		}

		// this.myPlayer.setStopRefreshRedPacket(true)
		this.fakeRedPacketNum = GameLogic.Instance().userProperties[ITEM.REDPACKET_TICKET]

		const userResults = message.vecUserResult1
		message.vecUserResult1 = []
		message.nDouble = this.nDouble
		message.nGameMoney = this.nGameMoney
		for (let key in userResults) {
			const userResult = userResults[key]
			const nPos = this.S2C(userResult.nChairID)
			const player = this.players[nPos]
			if (player == null) {
				continue
			}
			const userData = player.getPlyData()
			message.vecUserResult1[nPos] = {
				nChairID: nPos,
				nScore: userResult.nScore,
				nJifen: userResult.nJifen,
				is_lord: player.isLord,
				name: player.isMe() ? DataManager.UserData.nickname : userData.nickname,
				money: userData.money,
				headimage: userData.headimage,
				sex_: userData.sex,
			}
		}
		this.showGameResultAndCheckSpring(message)

		if (this.isGameStart()) {
			this.doStateChangeEndGame()
		}
	}

	proto_gc_get_redpackets_award_ack_handler(event) {
		let message = event.packet

		GameLogic.Instance().redpacket_info = message

		this.refreshRedPacketInfo(message.curRounds, message.limitRounds)

		if(message.ret == 1 || message.ret == 2) {
			// 可以领奖
			// 奖励到账
			// 多抽一次
			if(GameLogic.Instance().isSceneExist("GameRedPacketAwardLayer")){
				return
			}
			GameLogic.Instance().redpacket_award_info = message
			return
			let delayTime = 2

			if (this.curRoundIsSpring) {
				delayTime = 3
			}

			if(message.ret == 2){
				// delayTime = 0
			}
	        let actions = []
			actions[actions.length] = cc.delayTime(delayTime)
	        actions[actions.length] = cc.callFunc(() => {
				if (GameLogic.Instance().redpacket_award_info.ret == 1 || GameLogic.Instance().redpacket_award_info.ret == 2) {
					let initParam = []
					initParam["redPacketNum"] = this.fakeRedPacketNum
					initParam["callback"] = () => {
						if (this.myPlayer && this.myPlayer.setStopRefreshRedPacket) {							
							this.myPlayer.setStopRefreshRedPacket(false)
						}
					}
					GameLogic.Instance().showGameRedPacketAwardLayer(initParam)//因为界面延时显示，传的参数可能会更不上节奏
				}
			})			
			this.nodeActionRedPacket.stopAllActions()
			this.nodeActionRedPacket.runAction(cc.sequence(actions))
			
		}
	}	
	
	proto_bc_ply_leave_not_handler(event) {
		let message = event.packet
		// 游戏中玩家不算离桌
		if (this.isGameStart() || GameLogic.Instance().isPrivateRoom()) {
			return
		}

		let player = this.getPlayerByGuid(message.plyGuid)
		if (player) {
			player.clearPlayer()
		}

		if (GameLogic.Instance().isPrivateRoom()) {
			this.showPrivateRoomButton()
		}
	}
	
	proto_bc_leave_table_ack_handler(event) {
		
		let message = event.packet
		
		if (message.ret == -2) {
			iMessageBox('游戏中不能退出', 0)
		}else if (message.ret == -3) {	
			//游戏币不足
			if (GameLogic.Instance().isChooseStart()) {
				return
			}
			GameLogic.Instance().checkMoneyOutOfRange()
		}else if (message.ret == -4) {				
			for (let i = 1; i < GameLogic.Instance().MAX_PLAYER_NUM; ++i){
				this.players[i].clearPlayer()
			}
		}else if (message.ret == -5) {
			GameLogic.Instance().LeaveGameScene()
			this.MessageBox(cc.js.formatStr('你被%s玩家踢出房间', message.plyNickname))
		}else if (GameLogic.Instance().isKeepInGameTable()) {
			cc.log("keep in game")
		}else{				
			czcEvent("斗地主", "离桌2", "离桌请求完成" + DataManager.Instance.userTag)
			GameLogic.Instance().LeaveGameScene()
		}
	}
	
	proto_gc_play_card_not_handler(event) {
		let message = event.packet
		
		var player = this.getPlayerByChairID(message.cChairID)
		if (!player) {
			return
		}
		// 当前出牌玩家id 出牌类型
		if (message.cType && message.cType.mNTypeNum != 0) {
			if (player.chairid == this.myPlayer.chairid) {
				this.nowcChairID = -1
			} else {
				this.nowcChairID = player.chairid
				this.nowCardType = message.cType
			}
		}
		// if (message.vecCards.length == 0) {
		// 	player.clear_put_cards_area()
		// 	return
		// }
		player.playPutCard(message)
	}
	
	proto_gc_lord_card_not_handler(event) {
		this["node_lookcard"].active = false
		let message = event.packet
		if (message.cLord == -1) {
			this.showLookLordCard(message)
			return
		}
		let noAni = message.noAction || !this.nodeLordCard.activeInHierarchy

		var chair = this.S2C(message.cLord)
		for (var player of this.players) {
			player.showRole(player.chairid == chair, message.vecCards)
		}
		if (this.beishuInfo) {
			this.setDouble(this.getDouble(this.myPlayer.chairid))
		}

		this.startPutCards = true
		// this.showLordCard(message.vecCards, noAni) // 20200727 策划需求 1.3.1
		this.showLookLordCard(message)
		
		if (this.myPlayer.getPlyData().chairId == message.cLord) {						
			this.refreshCardNoteView()
		}
	}
	
	proto_gc_bomb_not_handler(event) { 
		// let message = event.packet
		// this.setDouble(message.nDouble)
	}
	
	proto_gc_clienttimer_not_handler(event) {
		let message = event.packet
		
		this.onClockTime(message.chairId, message.sPeriod / 1000)
		// this.showShowCard(false)

		if (this.nodeBet.active) {
			if (message.chairId < 0) {
				this.showJiaBei2()
			} else {
				const player = this.getPlayerByChairID(message.chairId)
				if (player && player.isMe()) {
					this.showJiaBei2()
				}
			}
		}
	}
	
	proto_gc_common_not_handler(event) {
		let message = event.packet
		
		if (message.nOp == 0) { // 开始新的一圈牌
			this.onStartPutCard()
		} else if (message.nOp == 11) { //超时
			// this.hidGameButton()
		} else if (message.nOp == 13) { //本局没有地主，清理桌面
			this.hidGameButton()
		} else if(message.nOp == GameLogic.Instance().COMMON_OPCODE.CO_CAN_LEAVE_TABLE) {
			this.pt_cb_leave_table_req_sender()
		}else {
			cc.log("message", message)
			var player = this.getPlayerByChairID(message.cChairID)
			if (player) {
				// 明牌逻辑反过来了
				if (message.nOp == 10) {
					player.setShowCard()
				} else {
					player.showTips(message.nOp)
				}
			}
		}
	}
	
	proto_gc_game_start_not_handler(event) {
		if (DataManager.Instance.userTag != "老用户") {
			czcEvent("斗地主", "游戏1", "游戏开始" + DataManager.Instance.userTag)
		}
		DataManager.CommonData["roleCfg"]["roundSum"] == 0 && uploadKuaiShou(1)
		playADBanner(false, AdsConfig.banner.All)
        !cc.audioEngine.isMusicPlaying() && AudioManager.playBackground()
		this.msg_proto_gc_win_doubel_req = null
		this.lastExchangeItemId = null
		let message = event.packet
		this.bHadStart = true
		this.force_dismiss = false
		this.popupmanager.reset()
		
		this.nSerialID = message.nSerialID //序列ID

		this.setDiZhu(message.nGameMoney)

		this.doStateChangeStartGame()
	}
	
	proto_gc_refresh_card_not_handler(event) {
		let message = event.packet
		
		var player = this.getPlayerByChairID(message.cChairID)
		if (player) {
			if (this.isReconnecte) {
				player.dealCardFlag = false
			}
			player.refresh_handCards(message.vecCards)
		}
	}
	
	proto_bc_ready_not_handler(event) {
		let message = event.packet
		if (GameLogic.Instance().userData.plyBaseData.plyGuid == message.plyGuid) {
			this.hidGameButton()
			this.showContinue(false)
			
			let isFullPlayer = true
			for (var player of this.players) {
				if(player.state == "leave"){
					isFullPlayer = false
				}
			}
			if(!isFullPlayer) {
				this.showAniWait()
			}
		}
		var player = this.getPlayerByGuid(message.plyGuid)
		if (player) {
			player.doStateChangeReady()
		}
	}
	
	proto_gc_update_player_tokenmoney_not_handler(event) {
		let message = event.packet
		let chairid = this.S2C(message.plyChairid)
		if (chairid == null) {
			return
		}
		message.itemInfo.forEach(v => {
			this.players[chairid].setItemView(v.nItemIndex, v.nItemNum64 || v.nItemNum)
		});
	}

	proto_bc_join_table_ack_handler(event) {
		let message = event.packet
		if (GameLogic.Instance().isMatchTable()) {
			SceneManager.Instance.closeScene("MatchReady")
		}
		
		var ret = message.ret
		if (ret == 0) {
			if (message.tableAttrs && message.tableAttrs.tableId != 100000000) {
				if (DataManager.Instance.userTag != "老用户") {
					czcEvent("斗地主", "进桌2", "游戏进桌成功" + DataManager.Instance.userTag)
				}
			}
			// succeed			
			message.tableAttrs.players.forEach(element => {
				GameLogic.Instance().addPlayerData(element)
			});
			this.refreshPlayerData()			
			
			this.showContinue(false)
			if (GameLogic.Instance().isPrivateRoom()) {
				this.updatePlayerScore()
				this.showPrivateRoomButton()
			} else if (GameLogic.Instance().isRPGMode() && !this.firstShowStartGame) {
				this.firstShowStartGame = true
				this.showStartGame(true)
			} else {
				if (this["state"] == "endGame") {
					return
				}
				if (GameLogic.Instance().isRPGMode()) {
					this.showLookCard()
				}

				// 换服后换桌
				if (GameLogic.Instance().isGoToNormalChangCi) {
					const players: Iproto_PlyBaseData[] = message.tableAttrs.players
					if (players.length == 3) {
						GameLogic.Instance().isGoToNormalChangCi = false
						if (players.every(player => player.plyGuid == GameLogic.Instance().userData.plyBaseData.plyGuid || player.ready == 0)) {
							this.proto_cb_change_table_req_sender()
							return
						}
					}
				}

				this.proto_cb_ready_req_sender()
			}
		} else if(ret == 10) {
			// 需要带入
			GameLogic.Instance().setUsingGameCarryMoney(true)
			this.proto_cb_setinto_and_seatdown_req_sender(message.tableAttrs.tableId)
		}else {
			// czcEvent("斗地主", "进桌2", "游戏进桌失败" + DataManager.Instance.userTag)
			// GameLogic.Instance().closeSocket()
			GameLogic.Instance().enterLobby()

			var info = '服务器连接出错'
			if (ret == -1) { } else if (ret == -3) {
				// 游戏豆不足				
				return
			} else if (ret == -14) {
				if (message.errMsg.indexOf('俱乐部') >= 0) {
					info = message.errMsg
				} else {
					var tipsString = '您的房卡不足'
					GameLogic.Instance().confirmBox({
						msg: tipsString,
						title: '温馨提示',
						buttonCount: 2,
						btnTitle: {
							btnCancel: '去购买',
							btnConfirm: '确定',
							btnConfirmSize: 26
						},
						boxSize: {
							width: 600,
							height: 350
						},
						callbackCancel: function () {
							GameLogic.Instance().showShopScene()
						}
					})
					return
				}
			} else if (message.errMsg.length > 0) {
				info = message.errMsg
			} else if (ret == -2) {
				info = '服务器满'
			} else if (ret == -4) {
				info = '加入密码错误'
			} else if (ret == -5) {
				info = '房间满'
			} else if (ret == -6) {
				info = '比赛场需要先报名'
			} else if (ret == -7) {
				info = '比赛场比赛时间未到或结束'
			} else if (ret == -8) {
				info = '比赛局数已经完成'
			} else if (ret == -9) {
				info = '需要私人房卡才能创建私人房间'
			} else if (ret == -10) {
				var need_money_ = GameLogic.Instance().serverInfo.maxmoney
				if (need_money_ >= 10000) {
					need_money_ = need_money_ / 10000 + '万'
				}
				info = '温馨提示，您的金币大于' + need_money_ + '，请进入高分场游戏'
			} else if (ret == -11) {
				info = '今天已经输了400万金币咯！休息，休息一下，明天再来！'
			} else if (ret == -12) {
				info = '房间已解散'
			}

			this.MessageBox(info)
		}
	}

	MessageBox(content: string) {
		cc.Canvas.instance.node.runAction(cc.sequence(
			cc.delayTime(1),
			cc.callFunc(() => {
				iMessageBox(content)
			})
		))
	}

	// 其他玩家进桌
	proto_bc_ply_join_not_handler(event) {
		let message = event.packet

		if (message.plyData.plyGuid == GameLogic.Instance().userData.plyBaseData.plyGuid) {
			// 刷新自己的信息
			if (message.plyData.plyGuid != this.myPlayer.getPlyData().plyGuid) {
				this.myPlayer.setUserData(message.plyData)
            	// this.myPlayer.setUserData(GameLogic.Instance().userData.plyBaseData)
			}
		} else {
			// 刷新其他玩家的信息
			var chair = this.S2C(message.plyData.chairId)
			if (chair) {
				var player = this.players[chair]
				if (player) {
					player.setUserData(message.plyData)
				}
			}
		}

		GameLogic.Instance().addPlayerData(message.plyData)

		if (GameLogic.Instance().isPrivateRoom()) {
			this.showPrivateRoomButton()
		}
	}


	proto_bc_login_ack_handler(event) {		
		cc.log("proto_bc_login_ack_handler")
		let message = event.packet

		GameLogic.Instance().userData.plyBaseData = message.plyBaseData
		GameLogic.Instance().userData.plyStatus = message.plyStatus
		let ret = message.ret

		if (ret == 0 || ret == 1 || ret == 2) {
			czcEvent("斗地主", "登录2", "游戏服务器登录成功" + DataManager.Instance.userTag)
			if (GameLogic.Instance().isPrivateRoom()) {
				if (message.plyBaseData.tableId > 0) {
					if (DataManager.CommonData["gameServer"]["pr_info"] == null) {
						DataManager.CommonData["gameServer"]["pr_info"] = {}
					}
					DataManager.CommonData["gameServer"]["pr_info"].pr_tableID = message.plyBaseData.tableId
				}
				if (ret == 0) {
					if (DataManager.CommonData["bReEnterGame"] != true/** && message.plyBaseData.tableId <= 0 */) {
						const pr_info = DataManager.CommonData["gameServer"]["pr_info"]
						if (pr_info != null) {
							if (pr_info.pr_tableID == null) {
								this.proto_cb_create_table_req_sender(pr_info)
							} else {
								this.proto_cb_join_table_req_sender(pr_info.pr_tableID)
							}
						}
					}
				}
				DataManager.CommonData["bReEnterGame"] = false
			} else if(GameLogic.Instance().isMatchTable()) {
			} else {
				if (ret == 0) {
					if (!DataManager.Instance.getOnlineParamSwitch("gamescene_guide_close_abtest")) {
						GameLogic.Instance().showGuideLayer()
					}
					this.proto_cb_join_table_req_sender()
				}
			}

			GameLogic.Instance().bEnterInGame = GameLogic.Instance().userData.plyBaseData.tableId > 0

		} else {
			czcEvent("斗地主", "登录2", "游戏服务器登录失败" + DataManager.Instance.userTag)
			GameLogic.Instance().closeSocket()

			var info
			if (message.errorMsg != '') {
				info = message.errorMsg
			}
			if (ret == -2) {
				DataManager.CommonData["bReEnterGame"] = true
				GameLogic.Instance().reEnterGame(GameLogic.Instance().userData.plyStatus.game_id_, GameLogic.Instance().userData.plyStatus.game_server_id_, info)
			} else {
				DataManager.CommonData["bReEnterGame"] = false
				GameLogic.Instance().enterLobby()

				if (!info) {
					if (ret == -1) {
						info = '服务器忙'
					} else if (ret == -3) {
						info = '验证失败'
					} else if (ret == -4) {
						info = '游戏豆不足'
					} else {
						info = '服务器连接出错'
					}
				}
				this.MessageBox(info)
			}
		}
	}

	proto_cb_create_table_req_sender(opt) {
		cc.log("proto_cb_create_table_req_sender", opt)
		const _opt = Object.assign({
			pr_roomName: "我的房间",
			pr_password: "",
			pr_table_time: 4,
			pr_flag: 0,
			pr_game_rule_: 0,
			pr_game_rule_group_: [],
			pr_game_json_: "",
		}, opt)
		GameLogic.Instance().sendMessage({
			opcode: 'proto_cb_create_table_req',
			name: _opt.pr_roomName,
			password: _opt.pr_password,
			baseScore: _opt.pr_Score,
			tableTime: _opt.pr_table_time,
			flag: _opt.pr_flag,
			gameRule: _opt.pr_game_rule_,
			initScore: _opt.pr_init_score || 0,
			gameRuleGroup: _opt.pr_game_rule_group_,
			gameJson: _opt.pr_game_json_,
			mode: _opt.pr_mode_ || 0,
			clubUid: opt.pr_club_id_,
		})
	}

	proto_bc_create_table_ack_handler(event) {
		this.proto_bc_join_table_ack_handler(event)
	}

	proto_bc_private_invite_code_not_handler(event) {
		const message = event.packet
		this.privateInvite = message.privateInvite
		this.tableScores = message.tableScores
		if (DataManager.CommonData["gameServer"]["pr_info"] == null) {
			DataManager.CommonData["gameServer"]["pr_info"] = {}
		}
		DataManager.CommonData["gameServer"]["pr_info"].pr_tableID = this.privateInvite.tableId

		if (this.isScoreTable()) {
			for (let i = 0; i < message.tableScores.length; i++) {
				const player = this.getPlayerByChairID(i)
				if (player) {
					player.setScoreNum(message.tableScores[i])
				}
			}
		}

		DataManager.save("PrivateInviteCode", this.privateInvite.inviteCode)

		this["nodePrivateCode"].active = true
		this["label_room_code"].getComponent(cc.Label).string = "房间号：" + this.privateInvite.inviteCode
		this["btnPrivateZhanJi"].active = true
		this.showPrivateCount()
		this.updatePlayerScore()

		const rule = JSON.parse(this.privateInvite.gameJson)
		const texts: string[] = []
		if (this.privateInvite.baseScore > 0) {
			texts.push("底注:" + this.privateInvite.baseScore + "金豆")
		} else {
			texts.push("底注:" + (-this.privateInvite.baseScore) + "积分")
		}
		if (rule.game_rule) {
			texts.push(rule.game_rule.value == 0 ? "叫地主" : "叫分")
			this.bJiaoFen = rule.game_rule.value == 1
		}
		if (rule.max_beishu) {
			texts.push(rule.max_beishu.value == 0 ? "最高倍数无上限" : "最高倍数" + rule.max_beishu.value + "倍")
			GameLogic.Instance().serverInfo.winMaxBet = rule.max_beishu.value
		}
		this["label_private_rule"].getComponent(cc.Label).string = texts.join(" ")
	}

	proto_cb_dismiss_private_table_req_handler() {
		this.force_dismiss = true
		GameLogic.Instance().sendMessage({ opcode: "proto_cb_dismiss_private_table_req" })
	}

	proto_bc_dismiss_private_table_ack_handler(event) {
		const message = event.packet
		if (message.ret == 0 || message.ret == -1) {
		} else {
			this.force_dismiss = false
			if (message.ret == -2) {
				iMessageBox("房间中的游戏已经开始 不能中途解散哦")
			} else if (message.ret == -3) {
				iMessageBox("只有房主才能解散房间哦 不能中途解散哦")
			} else {
				iMessageBox("解散房间 错误")
			}
		}
	}

	proto_bc_force_dismiss_private_table_req_handler(event) {
		const message = event.packet
		this.force_dismiss = true
		GameLogic.Instance().showGameCommonTipLayer({
			msg: message.userName + "申请解散房间\n是否同意？",
			style: 5,
			time: message.time,
			confirmCback: () => {
				this.proto_cb_force_dismiss_private_table_ack_sender(1)
			},
			cancelCback: () => {
				this.proto_cb_force_dismiss_private_table_ack_sender(0)
				this.force_dismiss = false
			},
		})
	}

	proto_cb_force_dismiss_private_table_ack_sender(accept: number) {
		cc.log("proto_cb_force_dismiss_private_table_ack_sender", accept)
		GameLogic.Instance().sendMessage({
			opcode: 'proto_cb_force_dismiss_private_table_ack',
			accept: accept,
		})
	}

	proto_bc_force_dismiss_private_table_not_handler(event) {
		const message = event.packet
		if (message.accept == 1) {
			iMessageBox(message.userName + "同意解散房间")
		} else {
			iMessageBox(message.userName + "不同意解散房间")
			this.force_dismiss = false
			if (SceneManager.Instance.isSceneExist("GameCommonTipLayer")) {
				SceneManager.Instance.closeScene("GameCommonTipLayer")
			}
		}
	}

	proto_gc_had_start_not_handler(event) {
		this.bHadStart = true
	}

	proto_gc_ju_count_not_handler(event) {
		const message = event.packet
		this.nJuCount = message.nJuCount
		this.showPrivateCount()
	}

	proto_cg_private_room_result_req_sender() {
		GameLogic.Instance().sendMessage({
			opcode: 'proto_cg_private_room_result_req',
		})
	}

	proto_gc_private_room_result_ack_handler(event) {
		const message = event.packet
		GameLogic.Instance().showPrivateZhanJiLayer({
			vecGameStatiscs: message.vecGameStatiscs,
			close: false,
		})
	}

	proto_gc_private_room_result_not_handler(event) {
		const message = event.packet
		if (!this.isGameStart() && this.nJuCount == null) {
			GameLogic.Instance().LeaveGameScene()
			return
		}
		this.vecGameStatiscs = message.vecGameStatiscs
		if (this.force_dismiss || message.ret == -1) {
			GameLogic.Instance().showPrivateZhanJiLayer({
				vecGameStatiscs: message.vecGameStatiscs,
				close: true,
			})
		}
	}

	proto_gc_pause_game_not_handler(event) {
		const message = event.packet
		const getTimeStr = function (n: number) {
			return (n < 10 ? '0' : '') + n
		}
		let msg = ""
		if (message.nFlag == 0) {
			msg = "等待"
			msg += message.sNickName// == DataManager.UserData.nickname ? "您的" : message.sNickName
			msg += this.startPutCards ? "出牌" : "选择"
			msg += "，超过" + message.nMinTime + "分钟后房间将自动解散 (" + getTimeStr(Math.floor(message.nSecTime / 60)) + ":" + getTimeStr(message.nSecTime % 60) + ")"
		} else if (message.nFlag == 1) {
			msg = message.sNickName + "返回,游戏恢复"
		} else if (message.nFlag == 2) {
			msg = "等待所有玩家准备,超时后房间将自动解散 (" + getTimeStr(Math.floor(message.nSecTime / 60)) + ":" + getTimeStr(message.nSecTime % 60) + ")"
		} else if (message.nFlag == 3) {
			msg = "所有玩家已经准备 游戏开始"
		}
		this["label_private_pause"].$Label.string = msg
		this["nodePrivatePause"].active = true
		this["nodePrivatePause"].stopAllActions()
		this["nodePrivatePause"].runAction(cc.sequence(cc.delayTime(3), cc.callFunc(() => {
			this["nodePrivatePause"].active = false
		})))
	}

	proto_gc_counts_not1(event) {
		cc.log("proto_gc_counts_not1")
		if (!this.enableCardCounter) {
			return
		}
		let message = event.packet		
		cc.log(message)		
		this.refreshCardNoteNum(message.countsNum)	
	}

	proto_gc_card_count_ack(event) {
		cc.log("proto_gc_card_count_ack")
		if (!this.enableCardCounter) {
			return
		}
		let message = event.packet		
		
		this.initCardNoteData()
		this.refreshCardNoteData(message.mVecPutCard)
		
		this.showCardNodeDetail()
	}

	
	proto_magic_emoji_req_sender(index, toChairId, cCostType) {
		GameLogic.Instance().sendMessage({
			opcode: 'proto_magic_emoji_req',
			cEmojiIndex:index,
			cToChairID:toChairId,
			cCostType:cCostType
		})
	}
	
	proto_magic_emoji_noti(event) {
		let message = event.packet
		cc.log(message)
		if (message.cIsError != 0) {
			return
		}

		if (message.cEmojiIndex < 0 || (message.cEmojiIndex > GameLogic.Instance().emojiConfigs.length - 1)) {
			cc.error("not exist message.cEmojiIndex", message.cEmojiIndex)
			return
		}

		this.playEmojiInteractAniByServerChairId(message, message.cFromChairID, message.cToChairID)
	}
	//
	proto_cb_change_table_req_sender() {
		if (GameLogic.Instance().checkMoneyOutOfRange()) {
			this.showContinue(true)
			return
		}

		if (DataManager.CommonData["roleCfg"]["roundSum"] < getNewBieRoundLimit() || GameLogic.Instance().redpacket_info["curRounds"] > 0) {
		
		}else{
			if (GameLogic.Instance().goToNormalChangCi()) {
				return
			}
		}
		
		//策划要求的
		this.showAniWait()
		
		for (var plyData of GameLogic.Instance().playerData) {
			plyData.chairId = -1
		}

		GameLogic.Instance().sendMessage({
			opcode: 'proto_cb_change_table_req',
		})
	}
	
	proto_cg_double_score_ack_sender(nScore) {
		GameLogic.Instance().sendMessage({
			opcode: 'proto_cg_double_score_ack',
			nScore: nScore?nScore:1,
			nSerialID: this.nSerialID,
		})
	}
	
	proto_cg_call_score_ack_sender(nScore) {
		GameLogic.Instance().sendMessage({
			opcode: 'proto_cg_call_score_ack',
			nScore: nScore,
			nSerialID: this.nSerialID,
		})
	}

	proto_cg_rob_lord_ack_sender(cRob) {
		GameLogic.Instance().sendMessage({
			opcode: 'proto_cg_rob_lord_ack',
			cRob: cRob,
			nSerialID: this.nSerialID,
		})
	}	

    proto_cg_auto_req_sender(cAuto) {
		GameLogic.Instance().sendMessage({
			opcode: 'proto_cg_auto_req',
			cAuto: cAuto,
		})
    }

    proto_cg_card_count_req_sender() {
		if (!this.enableCardCounter) {
			return
		}
		GameLogic.Instance().sendMessage({
			opcode: 'proto_cg_card_count_req',
		})
	}

    proto_cg_play_card_ack_sender(vecCards) {
        
		this.nowcChairID = null

		GameLogic.Instance().sendMessage({
			opcode: 'proto_cg_play_card_ack',
			cTimeOut: 0,
			vecCards: vecCards,
			nSerialID: this.nSerialID,
		})
	}
	
	proto_cb_ready_req_sender(check: boolean = true) {		
		if (check && GameLogic.Instance().checkMoneyOutOfRange()) {
			return
		}

		if (DataManager.CommonData["roleCfg"]["roundSum"] < getNewBieRoundLimit() || GameLogic.Instance().redpacket_info["curRounds"] > 0) {
		
		}else{
			if (GameLogic.Instance().goToNormalChangCi()) {
				return
			}
		}
		
		this.force_dismiss = false
		GameLogic.Instance().sendMessage({
			opcode: 'proto_cb_ready_req',
		})
	}

	proto_cb_join_table_req_sender(tableId: number = -1) {	
		czcEvent("斗地主", "进桌1", "游戏进桌请求" + DataManager.Instance.userTag)
		// if (GameLogic.Instance().checkMoneyOutOfRange()) {
		// 	return
		// }

		GameLogic.Instance().sendMessage({
			opcode: 'proto_cb_join_table_req',
			tableId: tableId,
			password: '',
		})
	}

	proto_cb_login_req_sender() {
		// czcEvent("斗地主", "登录1", "游戏服务器登录请求" + DataManager.Instance.userTag)
		GameLogic.Instance().sendMessage({
			plyTicket: DataManager.UserData.ticket,
			opcode: "proto_cb_login_req",
			extParam: "",
			version: 1498492800,
			plyNickname: DataManager.UserData.nickname,
			mainGameId: DataManager.Instance.gameId,
			gameGroup: 0,
			plyGuid: DataManager.UserData.guid,
		})
	}

	initCardNoteData() {
		
		for (let i = 0; i <= 17; i++) {
			if (i > 15) {				
				this.cardsCount[i] = 1
			}else if (i > 2) {				
				this.cardsCount[i] = 4
			}else {
				this.cardsCount[i] = 0
			}			
		}
		
		this.refreshCardNoteView()
	}

	refreshCardNoteView() {
		cc.log("refreshCardNoteView")
		if (!this.enableCardCounter) {
			return
		}
		cc.log(this.cardsCount)
		let cardsCountTemp = this.cardsCount.slice()
		cardsCountTemp = this.reduceHandCard(cardsCountTemp)

		let allCardNum = 0
		cardsCountTemp.forEach((v, k) => {
			if (!!this["labelCardCounter" + k]) {
				this["labelCardCounter" + k].$Label.string = v
				if (v == 4) {
					this["labelCardCounter" + k].color = new cc.Color(201, 76, 27)
				}else{
					this["labelCardCounter" + k].color = new cc.Color(138, 98, 49)
				}
				allCardNum += v
			}
			
		})
		// this.labelCardCounterAll.$Label.string = allCardNum
		if (allCardNum > 0) {
			this.showCardCounterBtn()
		}
	}

	refreshCardNoteNum(num) {
		DataManager.UserData.setItemNum(ITEM.CARD_RECORD, num)
		this["labelCardCounterAll"].$Label.string = num
	}

	reduceHandCard(cardsCounter) {
		if (!this.myPlayer.handCardsVec) {
			return cardsCounter
		}
		this.myPlayer.handCardsVec.forEach(v => {
			let valueIndex = v.mNValue
			if (v.mNValue == 16 && v.mNColor == 1) {
				valueIndex = 17
			}
			if (cardsCounter[valueIndex] > 0) {
				cardsCounter[valueIndex]--
			} 
		})
		return cardsCounter
	}

	refreshCardNoteData(cards, refreshView = true) {
		cards.forEach((v, k) => {
			let cardNum = 0
			if(v.mNValue == 16 && v.mNColor == 1) {
				cardNum = 17
			}else{
				cardNum = v.mNValue
			}
			this.cardsCount[cardNum]--
			this.cardsCount[cardNum] = this.cardsCount[cardNum] < 0 ? 0 : this.cardsCount[cardNum]
		});
		if (refreshView) {			
			this.refreshCardNoteView()
		}
	}
	
	refreshPlayerData() {
		// 刷新自己的信息
		for (var plyData of GameLogic.Instance().playerData) {
			if (plyData.plyGuid == GameLogic.Instance().userData.plyBaseData.plyGuid) {
				this.myPlayer.setUserData(plyData)
				break
			}
		}

		// 刷新其他玩家的信息
		for (var plyData of GameLogic.Instance().playerData) {
			if (plyData.plyGuid == GameLogic.Instance().userData.plyBaseData.plyGuid) {
				continue
			}

			if (plyData.chairId > -1) {				
				var player = this.getPlayerByChairID(plyData.chairId)
				if (player) {
					player.setUserData(plyData)
					if (plyData.ready == 1) {
						player.showReady()
					}
				}
			}else{

			}
		}
	}

    clearDesk() {
		this.nSerialID = 0
		this.nowcChairID = null

		this.startPutCards = false

		this.nodeAuto.active = false
		this.hidGameButton()
		// this.setDouble(1)
		
		this.hideAniWait()

		for (var player of this.players) {
			player.showTips()
			player.startClockTime()
			player.clear_put_cards_area()
		}

		this.initCardNoteData()

		this.robNum = 0
		this.nLordLetNum = 0
		this.isQiangDiZhu = false
		this.isShowLordCardNot = false
		this.node_two_rob_info.active = false
		
    }

	clear_put_cards_area( bCurPlayer ) {
		// 1. 如果只是清理玩家自己
		if(bCurPlayer){
			this.myPlayer.clear_put_cards_area()
		}

		// 2. 如果是清理全部玩家
		else{
			for (var player of this.players) {
				player.clear_put_cards_area()
			}
		}
    }
    
	setTopNode(active: boolean, resson: number) {
		if (resson == 1) {
			this.shouldShowTopNode1 = active
		}
		if (resson == 2) {
			this.shouldShowTopNode2 = active
		}
		if (this.shouldShowTopNode1 && this.shouldShowTopNode2) {
			this.nodeTop.active = true
		} else {
			this.nodeTop.active = false
			this.showBeishuInfo(false)
		}
	}
	
	showTopNode() {
		const callFunc = () => {
			this.nodeTop.y = this.nodeMain.height / 2 + 2
		}
		this.setTopNode(true, 1)
		if (!this.nodeTop.active) {
			callFunc()
			return
		}

		let actionList = []
		actionList[actionList.length] = cc.delayTime(0.001);
		actionList[actionList.length] = cc.moveTo(0.6, cc.v2(0, this.nodeMain.height / 2 + 2)) //.easing(cc.easeBackIn())
		actionList[actionList.length] = cc.callFunc(callFunc)
		this.nodeTop.stopAllActions()
		this.nodeTop.runAction(cc.sequence(actionList));
	}
	
	hideTopNode(noAni) {	
		
		let dstPox = cc.v2(0, this.nodeMain.height / 2 + 100)
		let moveingTime = 1
		
		this.nodeTop.stopAllActions()

		if(noAni || !this.nodeTop.active){
			this.nodeTop.y = dstPox.y
			this.setTopNode(false, 1)
			return
		}
		let actionList = []
		actionList[actionList.length] = cc.delayTime(1);
		actionList[actionList.length] = cc.moveTo(moveingTime, dstPox) //.easing(cc.easeBackOut())
		actionList[actionList.length] = cc.callFunc(() => {
			this.setTopNode(false, 1)
			this.nodeTop.y = dstPox.y
		})
		
		this.nodeTop.runAction(cc.sequence(actionList));
	}
	

    // message Function start ===================================        
	onClockTime(chairId, time) {
		if (chairId < 0) {
			chairId = this.myPlayer.getPlyData().chairId
		}

		let chair = this.S2C(chairId)
		if (chair == null) {
			return
		}
		let notCardForceTime = false
		if(chair == 0){
			if (!this.nowcChairID || this.nowcChairID == -1 || this.nowcChairID == this.myPlayer.chairid || this.nowCardType.mNTypeNum == 0) {
				
			} else {
				if (this.tipCards.length == 0) {
					notCardForceTime = true
					time = 3
				}
			}		
		}
		this.players[chair].startClockTime(time)

		if (notCardForceTime) {
			this.players[chair].bSendNoCard = true
		}
    }
    
	onStartPutCard() {
		for (var player of this.players) {
			player.showTips()
		}
		this.hidGameButton()
		this.showCardNodeDetail()
	}
    
	onBuChu() {
		this.players[0].bSendNoCard = true
		this.hidGameButton()
		this.proto_cg_play_card_ack_sender([])
	}

	onChuPai() {
		let cardType = this.nowCardType
		if (!this.nowcChairID || this.nowcChairID == -1 || this.nowcChairID == this.myPlayer.chairid || this.nowCardType.mNTypeNum == 0) {
			cardType = {
				mNTypeNum: 0,
				mNTypeValue: 0,
				mNTypeBomb: 0,
			}
		}

		const vecCards = this.myPlayer.getChooseCards()
		// 检测是否选中的牌
		if (!this.myPlayer.checkChooseCards(vecCards, cardType)) {
			this.showChuPaiTip(2)
			return
		}

		// 1. 通知服务器出牌
		this.proto_cg_play_card_ack_sender(vecCards)

		// 2. 出牌按钮隐藏
		this.hidGameButton()

		// 3. 刷新玩家自己的出牌区域
		this.myPlayer.playPutCard({
			cType: GameRule.m_chooseCardType,
			vecCards: vecCards,
		})
	}

	onTiShi() {
		var tipsCount = this.tipCards.length
		if (tipsCount == 0) {
			this.onBuChu()
		} else {
			if (this.tipIndex >= tipsCount) {
				this.tipIndex = 0
			}
			var vecCards = this.tipCards[this.tipIndex]
			this.myPlayer.seleteCards(vecCards)
			this.tipIndex++
		}
	}    
    
	onPressContinue(EventTouch, data) {		
    	AudioManager.playButtonSound()
		if (GameLogic.Instance().isPrivateRoom()) {
			this.proto_cb_ready_req_sender()
			return
		} else if (GameLogic.Instance().isMatchTable()) {
			if (!this.isGameStart()) {
				this.proto_cb_ready_req_sender()
				this.matchGame.showStage(true)
			}
			return
		}
		// this.proto_cb_change_table_req_sender()
		this.proto_cb_ready_req_sender()
	}
	
    
	onPressChangeTable(EventTouch, data) {		
		EventTouch && AudioManager.playButtonSound()	
		GameLogic.Instance().removeAllPlayerData()
		this.proto_cb_change_table_req_sender()
	}

	checkItemExchange(parmes: { itemId: number, itemNum: number, failCallback: Function, tryCallback: Function }): boolean {
		if (DataManager.UserData.getItemNum(parmes.itemId) >= parmes.itemNum) {
			return true
		}

		this.lastExchangeItemId = parmes.itemId

		let ExchangeInfos = DataManager.CommonData["ExchangeInfo"] || []
		ExchangeInfos = ExchangeInfos.filter(item => {
			if (item.exchangeItemList && item.exchangeItemList[0] && item.exchangeItemList[0].exchangeItem === ITEM.REDPACKET_TICKET) {
			} else {
				return false
			}
			for (const gainItem of item.gainItemList) {
				if (gainItem.gainItem === parmes.itemId && gainItem.gainNum >= parmes.itemNum) {
					return true
				}
			}
			return false
		})

		if (ExchangeInfos.length <= 0) {
			parmes.failCallback()
			return false
		}

		ExchangeInfos.sort((a, b) => a["exchangeItemList"][0]["exchangeNum"] < b["exchangeItemList"][0]["exchangeNum"] ? -1 : 1)
		const ExchangeInfo = Object.assign(ExchangeInfos[0])
		ExchangeInfo["closeCallback"] = () => {
			this.node.runAction(cc.sequence(cc.delayTime(0.2), cc.callFunc(() => {
				if (DataManager.UserData.getItemNum(parmes.itemId) >= parmes.itemNum) {
					parmes.tryCallback()
				}
			})))
		}
		SceneManager.Instance.popScene("moduleRPDdzRes", "ExchangeConfirm3Pop", ExchangeInfo)
		return false
	}

	onPressJiaBei(EventTouch, data) {
		this.firstRoundLog()
		if (data == 4) {
			if (this.checkItemExchange({
				itemId: ITEM.SUPER_JIABEI,
				itemNum: 1,
				failCallback: () => {
					iMessageBox("您的超级加倍卡不足，通过兑换或商城可获得")
				},
				tryCallback: () => {
					if (!this["nodeBet"].active) {
						return
					}
					this.onPressJiaBei(EventTouch, data)
				}
			})) {
			} else {
				return
			}
		}
		this.hidGameButton()
		if (data > 1) {
			czcEvent("斗地主", "加倍", data == 4 ? "超级加倍" : "加倍")
		} else {
			AudioManager.playButtonSound()
		}
		this.proto_cg_double_score_ack_sender(data)
	}

	onPressJiao(EventTouch, data) {
		this.firstRoundLog()
		this.hidGameButton()

		var nScore = Number(data) || 0
		this.proto_cg_call_score_ack_sender(nScore)
	}

	onPressQiang(EventTouch, data) {
		this.firstRoundLog()
		this.hidGameButton()

		var cRob = (data == 1) ? 1 : 0
		this.proto_cg_rob_lord_ack_sender(cRob)
	}

	onPressChuPai(EventTouch, data) {
		this.firstRoundLog()
		// 不出
		if (data == 0) {
			this.onBuChu()
			return
		}
		this.onChuPai()

	}

	onPressCardCounter(event?: cc.Event.EventTouch) {
		event && AudioManager.playButtonSound()
		if (this.checkItemExchange({
			itemId: ITEM.CARD_RECORD,
			itemNum: 1,
			failCallback: () => {
				iMessageBox("您的记牌器不足，通过兑换或商城可获得")
			},
			tryCallback: () => {
				if (!this.isGameStart()) {
					return
				}
				this.onPressCardCounter()
			}
		})) {
		} else {
			return
		}

		if (!this.isGameStart()) {
			iMessageBox("游戏尚未开始，游戏开始后将自动使用记牌器");
			return
		}

		this.setNodeCardCounterDetail(!this.nodeCardCounterDetail.active)
	}

	showCardNodeDetail() {
		
		if (DataManager.UserData.getItemNum(ITEM.CARD_RECORD) > 0) {
			if (this.isGameStart()) {			
				this.setNodeCardCounterDetail(true)
				return true;
			}
		}
		
		return false;
	}

	setNodeCardCounterDetail(active: boolean) {
		if (GameLogic.Instance().isPrivateRoom() || GameLogic.Instance().isMatchTable()) {
			return
		}
		this.nodeCardCounterDetail.active = active
		this.nodeBigBet.active = active
		// this.btnTask.active = !active
		this.setTopNode(!active, 2)
		this.btnNewUserSign.active = false
		if(!active && DataManager.CommonData["NewUserSgin"] && DataManager.CommonData["NewUserSgin"].day) {
			this.btnNewUserSign.active = false && DataManager.CommonData["NewUserSgin"].day <= 7
		}
	}

	onPressTiShi() {
		this.firstRoundLog()
		AudioManager.playButtonSound()
		var tipsCount = this.tipCards.length
		if (tipsCount == 0) {
			this.onPressChuPai(null, 0)
		} else {
			if (this.tipIndex >= tipsCount) {
				this.tipIndex = 0
			}
			var vecCards = this.tipCards[this.tipIndex]
			this.myPlayer.seleteCards(vecCards)
			this.tipIndex++
		}
	}

	onPressTuoGuan(EventTouch, data) {
		this.firstRoundLog()
		AudioManager.playButtonSound()
		this.nodeAuto.active = (data == 1) ? true : false

		var cAuto = (data == 1) ? 1 : 0
		this.proto_cg_auto_req_sender(cAuto)
	}

    
	onPressExit(EventTouch, data) {
		cc.log("onPressExit")

        AudioManager.playButtonSound()
		
		
		GameLogic.Instance().judgeExitGame()
    }

    onPressBack() {
		GameLogic.Instance().judgeExitGame()
    }
	
	clearLookCard() {
		for (const node of this.nodeLookCard.children) {
			this.prefab_bigCardPool.put(node)
		}
		this.shouldShowTopNode1 = true;
		this.shouldShowTopNode2 = true;
	}
	
	play_game_ani_dealcard(callback?){
		this.nBombTips = 0
		let startChairid = 0
		let distance = 5
		let dealCardWidth = 80
		let nodeDealWidth = 5 * 53 + dealCardWidth
		let distance_to_edge: number = this.node_player_hand_card0.getComponent("AreaCardNode.rpddz").distance_to_edge
		
		let nHandCardNum = 17
		if (DataManager.CommonData["gameServer"]["LetCard"] == 1) {
			nHandCardNum = 9
		}
		
		let temp_card = this.prefab_bigCardPool.get()
		
		if(temp_card == null) {
			temp_card = cc.instantiate(this.prefab_bigCard); 
		}

		var nDistance = (cc.winSize.width - temp_card.width - distance_to_edge * 2) / 17
		temp_card = this.prefab_bigCardPool.put(temp_card)



        for(let ele of this.ani_dealcard._children) {
            this.prefab_bigCardPool.put(ele)
        }
		this.ani_dealcard.removeAllChildren()
		
		AudioManager.playSound("audio_dispatch")
		const n = GameLogic.Instance().MAX_PLAYER_NUM
		let nAllCardNum = nHandCardNum * n
		this.isLookCard = true // 20200727 策划需求 1.3.1
		if (this.isLookCard) {
			nAllCardNum += 3
		}
		for (let i = 0; i < nAllCardNum; i++) {
			
			var sptDealCard = this.prefab_bigCardPool.get()
			
        
			if(sptDealCard == null) {
				sptDealCard = cc.instantiate(this.prefab_bigCard); 
			}

			let dealCardScale = dealCardWidth/sptDealCard.width

			sptDealCard.getComponent(CardNode).showPaiBei()
			sptDealCard.scale = dealCardScale
			sptDealCard.x = distance * i - nodeDealWidth/2 + dealCardWidth/2
			sptDealCard.y = this.nodeGamePlayerPos1.y

			this.ani_dealcard.addChild(sptDealCard, 54 - i, "dealcard" + i);

		}
		if (this.isLookCard) {
			this.clearLookCard()
			for (let i = 0; i < 3; i++) {
				let curCard: cc.Node = this.ani_dealcard.getChildByName("dealcard" + (nHandCardNum * 3 + i))
				if (curCard == null) {
					break;
				}
				curCard.name = "" + i
				curCard.position = this.nodeLookCard.convertToNodeSpaceAR(curCard.convertToWorldSpaceAR(cc.v2(0, 0)))
				curCard.parent = this.nodeLookCard
				curCard.stopAllActions()

				let dstPos = cc.v2(92 * (i - 1), 0)
				let dealCradScale = 0.47
				let delayTime = 0.1
				let fTime = delayTime * (nHandCardNum + 1)
				if (GameLogic.Instance().isBuxipaiMode()) {
					fTime = 0.5 * Math.floor(nHandCardNum / 6) + ((nHandCardNum % 6) + 1) * 0.03
				}
				let actionList = []
				actionList[actionList.length] = cc.delayTime(fTime);
				actionList[actionList.length] = cc.spawn(
					cc.scaleTo(0.5, dealCradScale),
					cc.moveTo(0.5, dstPos)
				);
				curCard.runAction(cc.sequence(actionList));
			}
		}
		let myHandCardPox = cc.v2(0, 0)
		for (let i = 0; i < nHandCardNum; i++) {
			for (let j = 0; j < n; ++j) {
				let curIndex = i * n + j
				let curCard = this.ani_dealcard.getChildByName("dealcard" + curIndex)
				if (curCard == null) {
					break;
				}
				let chairid = (curIndex + startChairid) % n
				let dstPos = this["nodeGamePlayerPos" + chairid].getPosition()

				curCard.stopAllActions()
				
				let dealCradScale = 1
				if(chairid == 0){
					myHandCardPox.y = this.node_player_hand_card0.y
					myHandCardPox.x = (1 + i - (nHandCardNum + 1) / 2) * nDistance
					dstPos = myHandCardPox
				}else{
					dealCradScale = 0.25
				}

				let delayTime = 0.1
				let fTime = delayTime * i
				let actionList = []
				actionList[actionList.length] = cc.delayTime(fTime);
				actionList[actionList.length] = cc.spawn(
					cc.scaleTo(0.5, dealCradScale), 
					cc.moveTo(0.5, dstPos)
				);
				
				actionList[actionList.length] = cc.delayTime(0.1);
				actionList[actionList.length] = cc.callFunc(() => {
					this.prefab_bigCardPool.put(curCard)
				})

				if (GameLogic.Instance().isBuxipaiMode()) {
					fTime = 0.5 * Math.floor(i / 6) + (i % 6) * 0.03
					actionList[0] = cc.delayTime(fTime);
					if (j == 0 && (i % 6 == 5 || i == nHandCardNum - 1)) {
						actionList[3] = cc.callFunc(() => {
							this.prefab_bigCardPool.put(curCard)
							this.showBombTips((Math.floor(i / 6) + 1) * 6, i == 0)
						})
					}
				}
					

				let actionList2 = []
				actionList2[actionList2.length] = cc.delayTime(fTime + 0.25);
				actionList2[actionList2.length] = cc.callFunc(() => {
					curCard.zIndex = i
				})

				if (i == nHandCardNum - 1 && callback) {
					actionList2[actionList2.length] = cc.delayTime(0.1);
					actionList2[actionList2.length] = cc.callFunc(() => {
						callback()
					})
				}

				curCard.runAction(cc.sequence(actionList));
				curCard.runAction(cc.sequence(actionList2));
			}
		}
		if (!GameLogic.Instance().isBuxipaiMode()) {
			this.showBombTips(undefined, true)
		}

	}

	play_game_spine_ani(name, chairId = 0, callback: () => void = null) {
		let ani_node = this["ani_spine_" + name]
		if (typeof(this["ani_spine_" + name]) == "undefined") {
			return
		}
		ani_node.active = true

		let animName = ''
		switch (name) {
			case 'feiji':
				if (chairId == 0) {
					animName = 'Feiji_M'
				}else if(chairId == 1){
					animName = 'Feiji_R'					
				}else if(chairId == 2){
					animName = 'Feiji_L'
				}
				break;	
			case 'zhadan':
				if (chairId == 0) {
					animName = 'lujingzhu'
				}else if(chairId == 1){
					animName = 'lujingyou'					
				}else if(chairId == 2){
					animName = 'lujingzuo'					
				}else{					
					animName = 'zha'
					this.showShakeAni(0.1)
				}
				break;
			case 'liandui':				
				animName = 'liandui'	
				break;
			case 'huojian':		
				this.showShakeAni(1.1)
				animName = 'huojianzha'	
				break;
			case 'shunzi':
			case 'shunzi2':				
				animName = 'tongqian'	
				break;
			case 'spring':
			case 'reverse_spring':				
				animName = 'Spring'	
				break;						
			default:				
				break;
		}

		if (animName == '') {
			return
		}

		let spineHandler = ani_node.getComponent('sp.Skeleton');
		let track = spineHandler.setAnimation(0, animName);
		if (track) {
			spineHandler.setCompleteListener((trackEntry, loopCount) => {
				let name = trackEntry.animation ? trackEntry.animation.name : '';				
				ani_node.active = false
				if (name === animName && callback) {
					callback();
				}
			});
		}
	}

	play_game_ani(name, callback) {
		let ani_node = this["ani_" + name]
		if (typeof(this["ani_" + name]) == "undefined") {
			return
		}
		ani_node.active = true

		if(name == "huojian") {					
			this.showShakeAni(0.5)
		}

		var animation = ani_node.getComponent(cc.Animation)
		if(!callback){
			animation.once('stop', function(){
				ani_node.active = false
			}.bind(this), this);
		}
		else
		{
			animation.once('stop', callback, this);
		}
		animation.play('animation_' + name)
    }
    
	play_game_ani_zhadan(srcPos, dstPos, callback) {
		let windowSize = cc.winSize
		// let dstPos = cc.v2(windowSize.width/2, windowSize.height*0.55)
		let name = "zhadan"

		let ani_node = this["ani_" + name]
		if (typeof(this["ani_" + name]) == "undefined") {
			return
		}
		ani_node.active = true
		ani_node.setPosition(srcPos)

		var animation = ani_node.getComponent(cc.Animation)
		if(!callback){
			animation.once('stop', function(){
				ani_node.active = false
				this.showShakeAni()
			}.bind(this), this);
		}
		else
		{
			animation.once('stop', callback, this);
		}
		animation.play('animation_' + name)

		let actionList = []
		actionList[actionList.length] = cc.delayTime(0.001);
		actionList[actionList.length] = cc.moveTo(0.6, dstPos).easing(cc.easeSineInOut());

		ani_node.runAction(cc.sequence(actionList));
	}
        
	hidGameButton() {
		this.showShowCard(false)
		this.nodeCall.active = false
		this.nodeRob.active = false
		this.nodePut.active = false
		if (this.btn_ready) {
			this.btn_ready.active = false
		}
		
		this.nodeBet.active = false
		this.hideChuPaiTip()
		this.myPlayer.hideChuPaiTip()
		this.myPlayer.startClockTime(0)
		
		if(this.isQiangDiZhu){
			this.setRangPai(false)
		}
    }
    
	showCallScore(nScore) {
		const bJiaoFen = this.isCallScore()
        this.hidGameButton()
		this.myPlayer.setClockPos(cc.winSize.width/2)
		this.nodeCall.active = true
		this.btnJiaoDiZhu.active = !bJiaoFen
		this.btnJiao1.active = !!bJiaoFen
		this.btnJiao2.active = !!bJiaoFen
		this.btnJiao3.active = !!bJiaoFen
		if (bJiaoFen) {
			if (nScore == 0) {
				this.btnBuJiao.x = -420
				this.myPlayer.setClockPos(cc.winSize.width/2 - 240)
				this.btnJiao1.x = -60
				this.btnJiao2.x = 180
				this.btnJiao3.x = 420
			} else if (nScore == 1) {
				this.btnBuJiao.x = -300
				this.myPlayer.setClockPos(cc.winSize.width/2 - 120)
				this.btnJiao1.active = false
				this.btnJiao2.x = 60
				this.btnJiao3.x = 300
			} else if (nScore == 2) {
				this.btnBuJiao.x = -230
				this.btnJiao1.active = false
				this.btnJiao2.active = false
				this.btnJiao3.x = 230
			}
		} else {
			this.btnBuJiao.x = -230
			this.btnJiaoDiZhu.x = 230
		}
	}

	showRobLord() {
        this.hidGameButton()
		this.myPlayer.setClockPos(cc.winSize.width/2) 
		this.nodeRob.active = true
		this.setRangPai(true)
	}

	showJiaBei() {
		this.hidGameButton()
		this.myPlayer.setClockPos(cc.winSize.width/2) 
		this.nodeBet.active = true
		this.lblSuperNum.getComponent(cc.Label).string = "" + DataManager.UserData.getItemNum(ITEM.SUPER_JIABEI)

		const buttonPos = [-300, 0, 300]
		const buttons = [this.btnBuJiaoBei, this.btnJiaBei, this.btnSuperJiaBei]
		for (let i = 0; i < buttons.length; i++) {
			buttons[i].x = buttonPos[i]
		}
	}

	showJiaBei2() {
		const buttonPos = [-300, 60, 300]
		const buttons = [this.btnBuJiaoBei, this.btnJiaBei, this.btnSuperJiaBei]
		for (let i = 0; i < buttons.length; i++) {
			buttons[i].x = buttonPos[i]
		}
		let clockpox = cc.v2(this.nodeBet.convertToWorldSpaceAR(cc.v2((buttonPos[0] + buttonPos[1]) / 2, this.btnBuJiaoBei.y + 5)))
		this.myPlayer.setClockPos(clockpox.x, clockpox.y)
	}

	showAuto(auto) {
        if(auto){
            this.hidGameButton()
        }
		this.nodeAuto.active = auto
		this.myPlayer.showAuto(auto)
	}
	
	showShakeAni(delayTime = 0, rotation = 1.1) {
				
		let diff = 0.1
		let rotation = rotation
		let actionList1 = [];
		actionList1[actionList1.length] = cc.delayTime(delayTime)
		actionList1[actionList1.length] = cc.rotateTo(diff, -rotation)
		actionList1[actionList1.length] = cc.rotateTo(diff, rotation)
		actionList1[actionList1.length] = cc.rotateTo(diff, -rotation)
		actionList1[actionList1.length] = cc.rotateTo(diff, rotation)
		actionList1[actionList1.length] = cc.rotateTo(diff, 0)
		
		this.node.stopAllActions()
		this.node.runAction(cc.sequence(actionList1))
	}

	
	showAniWait() {
		// 私人房不显示匹配玩家动画
		if (GameLogic.Instance().isPrivateRoom()) {
			return
		}
		if (this.nodeMatchPlayerAni.getNumberOfRunningActions() > 0) {
			return
		}
		this.nodeMatchPlayerAni.active = true

		
		let actions = []
		actions[actions.length] = cc.callFunc(() => {
			this.labelMatchPlayer.$Label.string = "正在为您匹配对手:" + (9 - this.labelMatchPlayer.countTime)
			this.labelMatchPlayer.countTime = (++this.labelMatchPlayer.countTime) % 10
			if (this.labelMatchPlayer.countTime == 6) {
				// this.showChangeTable(true)
				if (DataManager.Instance.getOnlineParamSwitch("ready_wait_timeout_changetable", 1)) {
					this.onPressChangeTable(null,null)
				}
			}		
		})	
		actions[actions.length] = cc.delayTime(1)

		this.labelMatchPlayer.countTime = 0
		this.nodeMatchPlayerAni.stopAllActions()
		this.nodeMatchPlayerAni.runAction(cc.repeatForever(cc.sequence(actions)))
	}

	hideAniWait() {
		this.nodeMatchPlayerAni.active = false
		this.labelMatchPlayer.countTime = 0
		this.nodeMatchPlayerAni.stopAllActions()
	}

	hideCardCounterBtn() {		
		if (!this.enableCardCounter) {
			return
		}
		// this.btnCardCounter.active = false
		this.setNodeCardCounterDetail(false)
	}

	showCardCounterBtn() {	
		if (!this.enableCardCounter) {
			return
		}	
		// this.btnCardCounter.active = true
	}


	showPutButton() {
		// 托管
		if (this.myPlayer.isAuto) {
			return
		}

		var typenum = 0

        
        // 轮到自己出牌
		if (!this.nowcChairID || this.nowcChairID == -1 || this.nowcChairID == this.myPlayer.chairid || this.nowCardType.mNTypeNum == 0) {
			typenum = 1

			GameRule.tipsAuto(this.myPlayer.handCardsVec)
			this.tipCards = GameRule.m_tipCards

			// 只有1张牌 玩家必须出 帮他出牌
			if (this.myPlayer.handCardsVec.length == 1) {
				this.scheduleOnce(() => {
					this.myPlayer.seleteCards(this.myPlayer.handCardsVec)
					this.onChuPai()
				}, 0.1)
			}
		} else { // 接别人的牌
			// 王炸
			if (this.nowCardType.mNTypeBomb == 2 && this.nowCardType.mNTypeValue == 16) {
				// this.onBuChu()
				// return
			}

			GameRule.tips(this.myPlayer.handCardsVec, this.nowCardType)
			this.tipCards = GameRule.m_tipCards
			let tipsCount = this.tipCards.length
			if (tipsCount == 0) { // 无牌大过上家
				typenum = 2
				this.showChuPaiTip(1)
			} else if (tipsCount == 1) { // 只有一种配能接 弹出提示
				this.onPressTiShi()
			}
        }
        

		var allButtons = [this.btnYaoBuQi, this.btnBuChu, this.btnPutShowCard, this.btnTiShi, this.btnChuPai]
		for (var button of allButtons) {
			button.active = false
		}

		var buttons = []
		if (this.showPutShowCard) {
			buttons.push(this.btnPutShowCard)
		}
		if (typenum != 1) {
			buttons.push(this.btnBuChu)
		}
		if (typenum != 2) {
			buttons.push(this.btnTiShi)
			buttons.push(this.btnChuPai)
		}
		if (typenum == 2){
			buttons = []
			buttons.push(this.btnYaoBuQi)
		}
        // var diss = (buttons.length == 2) ? 150 * 2 : 200
        let buttonPosXArr = [
            [50],
            [-230, 230],
            [-300, 60, 300],
			[-420, -60, 180, 420],
        ]
		for (var i = 0; i < buttons.length; i++) {
			buttons[i].active = true
            // buttons[i].x = (2 * i - buttons.length + 1) / 2 * diss
            buttons[i].x = buttonPosXArr[buttons.length-1][i]
		}

		this.nodePut.active = true
        
        let clockPosXArr = [
            -130,
            0,
            (buttonPosXArr[2][0] + buttonPosXArr[2][1])/2
        ]
        
        let clockpox = cc.v2(this.btnBuChu.parent.convertToWorldSpaceAR(cc.v2(clockPosXArr[buttons.length-1], this.btnBuChu.y + 5)))

        this.myPlayer.setClockPos(clockpox.x, clockpox.y)
        
		// if (buttons.length == 3) {
		// 	this["cc_nodeGameClock0"].x = -330
		// }else if(buttons.length == 2){
		// 	this["cc_nodeGameClock0"].x = -280
		// }else if(buttons.length == 1){			
		// 	this["cc_nodeGameClock0"].x = -150
		// }else{
		// 	this["cc_nodeGameClock0"].x = 0			
		// }
	}

	showChangCiSpt() {
		let name = ""

		const gameType = ["抢地主", "叫三分", "不洗牌"][GameLogic.Instance().serverInfo.ddz_game_type]
		if (gameType) {
			name += gameType + ""
		}

		const level = ["新手", "初级", "精英", "大师", "至尊"][GameLogic.Instance().serverInfo.level - 1]
		if (level) {
			name += level + "场"
		}

		this["sptChangCiName"].getComponent(cc.Label).string = name
	}

	showChangCiInfo() {
		this.lbl_tex_info.$Label.string = GameLogic.Instance().GetMoneyShortString(GameLogic.Instance().serverInfo.tax || 0)
		this.lbl_fengding_info.$Label.string = GameLogic.Instance().GetMoneyShortString(GameLogic.Instance().getWinMaxMoney() || 0)

		this.nodeChangCiInfo.active = true
		let actions = []
		actions[actions.length] = cc.delayTime(0.1)
        actions[actions.length] = cc.fadeTo(0.3, 255)
		this.nodeChangCiInfo.stopAllActions()
		this.nodeChangCiInfo.runAction(cc.sequence(actions))
	}

	hideChangCiInfo(delaytime = 0.4) {

		let actions = []
        actions[actions.length] = cc.delayTime(delaytime)
        actions[actions.length] = cc.fadeTo(0.6, 0)
        actions[actions.length] = cc.callFunc(() => {
			this.nodeChangCiInfo.active = false
		})
		this.nodeChangCiInfo.stopAllActions()
		this.nodeChangCiInfo.runAction(cc.sequence(actions))
		
	}
	
	showPutOverAni(chairid) {
		
		
		if (this.sptPutOver.playing) {
			return
		}

		let srcPos = this["node_player_put_card" + chairid].position
		srcPos.y -= 50
		if (chairid == 0) {
			
		}else if (chairid == 1) {
			srcPos.x += 200
		}else if (chairid == 2) {
			srcPos.x -= 200			
		}
		let midPos = this["node_player_put_card" + chairid].parent.convertToWorldSpaceAR(srcPos)
		let dstPos = this.nodePutOverAni.parent.convertToNodeSpaceAR(midPos)
		
		this.nodePutOverAni.position = dstPos
		
		this.sptPutOver.playing = true
		this.sptPutOver.opacity = 0
		this.sptPutOver.active = true
		let actionList1 = [];
		actionList1[actionList1.length] = cc.delayTime(0)
		actionList1[actionList1.length] = cc.callFunc(() => {
			this.sptPutOver.scale = 0		
		})
		actionList1[actionList1.length] = cc.spawn(
			cc.fadeIn(0.3),
			cc.scaleTo(0.3, 1)
		)
		actionList1[actionList1.length] = cc.delayTime(3)
		actionList1[actionList1.length] = cc.fadeOut(0.1)
		actionList1[actionList1.length] = cc.callFunc(() => {		
			this.sptPutOver.active = false
			this.sptPutOver.playing = false
		})

		this.sptPutOver.stopAllActions()
		this.sptPutOver.runAction(cc.sequence(actionList1));
	}


	showChangeTable(bValue) {
		
		if (bValue) {
			this.btnContinue.active = false
			this.btnChangeTable.active = true			
			this.btnChangeTable.x = 0
			this.nodeContinue.active = true
		}else{
			this.showContinue(false)
		}
	}
    
	showContinue(bValue) {
		
		this.btnContinue.x = 230
		this.btnChangeTable.x = -230

		this.btnContinue.active = bValue
		this.btnChangeTable.active = bValue
		this.nodeContinue.active = bValue
		if (!bValue) {
			return
		}

		if (GameLogic.Instance().isPrivateRoom()) {
			this.btnContinue.x = 0
			this.nodeContinueTime.active = false
			this.btnChangeTable.active = false
			return
		}

		let callback = () => {
			this.onPressChangeTable()
		}


		let daojishiFun = () => {
			this.nodeContinueTime.active = true
			let actionList1 = [];
			actionList1[actionList1.length] = cc.delayTime(1)
			actionList1[actionList1.length] = cc.callFunc(() => {
				let num = this.labelRemainTime.$Label.string
				num--
				if (num < 0) {
					num = 0
					this.nodeContinueTime.active = false
					this.labelRemainTime.stopAllActions();
					callback()
					return
				}
				this.labelRemainTime.$Label.string = num
				daojishiFun()
			})

			this.labelRemainTime.runAction(cc.sequence(actionList1))

		}

		this.labelRemainTime.$Label.string = 10
		this.labelRemainTime.stopAllActions();
		this.nodeContinueTime.active = false
		if (GameLogic.Instance().checkMoneyOutOfRange(false)) {
		}else{
			daojishiFun()
		}
	}
    
	setDiZhu(score) {
		this.nGameMoney = score
		this.nodeDiZhu.$Label.string = score != 0 ? "" + Math.abs(score) : ""
		if (GameLogic.Instance().isMatchTable()) {
			this.matchGame.refreshDiZhu()
		}
	}

	setDouble(double) {
		this.nDouble = double
		this.nodeBetNum.$Label.string = double > 0 ? "" + Math.abs(double) : ""
		this.lbl_big_bet_num.$Label.string = "" + double
		if (double > 1) {

			let scale = 1.3
			let seqTable = []
			seqTable[seqTable.length] = cc.scaleTo(0.2, scale)
			seqTable[seqTable.length] = cc.delayTime(0.5)
			seqTable[seqTable.length] = cc.scaleTo(0.2, 1).easing(cc.easeBackIn())
			if (this.nodeBetNum.activeInHierarchy) {
				this.nodeBetNum.setScale(scale)
				this.nodeBetNum.stopAllActions()
				this.nodeBetNum.runAction(cc.sequence(seqTable)) 
			}

			if (this.nodeBigBet.activeInHierarchy) {
				this.nodeBigBet.setScale(scale)
				this.nodeBigBet.stopAllActions()
				this.nodeBigBet.runAction(cc.sequence(seqTable))
			}
		}
	}
    
    
	showLordCard(vecCards, noAction = false, showBack = false) {
		this.nodeLordCard.active = !!vecCards
		if (vecCards == null) {
			return
		}
        if(showBack) {
            this.nodeLordCard.active = true

            for (let card of this.lordCards) {
                card.showPaiBei()
            }
            return
        }
		let minLong = Math.min(vecCards.length, this.lordCards.length)
		for (let i = 0; i < minLong; i++) {

			let showCardValue = function() {
				this.lordCards[i].set_value(vecCards[i].mNValue, vecCards[i].mNColor)
			}.bind(this)

			if (noAction) {
				showCardValue()
				continue
			}

			let scaleValue = 1
			let nBeiShu = 0.2625

			let actions
			if (i == 0) {
				actions = cc.moveBy(nBeiShu, cc.v2(-40, -20))
			} else if (i == 1) {
				actions = cc.moveBy(nBeiShu, cc.v2(0, -20))
			} else if (i == 2) {
				actions = cc.moveBy(nBeiShu, cc.v2(40, -20))
			}

			let seqtable1 = []
			seqtable1.push(cc.scaleTo(nBeiShu, 0, scaleValue))
			seqtable1.push(cc.callFunc(showCardValue))
			seqtable1.push(cc.scaleTo(nBeiShu, scaleValue))

			let seqtable2 = []
			seqtable2.push(cc.delayTime(nBeiShu))
			seqtable2.push(cc.spawn(actions, cc.scaleTo(nBeiShu, scaleValue * 1.4)))

			let spatable2 = []
			spatable2.push(cc.sequence(seqtable1))
			spatable2.push(cc.sequence(seqtable2))

			let spatable3 = []
			spatable3.push(cc.scaleTo(nBeiShu, scaleValue))
			spatable3.push(actions.reverse())

			let seqTable3 = []
			seqTable3.push(cc.spawn(spatable2))
			seqTable3.push(cc.delayTime(0.5))
			seqTable3.push(cc.spawn(spatable3))
			this.lordCards[i].node.runAction(cc.sequence(seqTable3))
		}
    }
	
	showLookLordCard(message) {
		this.lookcard_tips.active = false
		this.isLookCard = false
		if (message.cLord != -1 && this.nodeLookCard.childrenCount == 0) {
			this.showLordCard(message.vecCards, true)
			return
		}

		for (let i = 0; i < this.nodeLookCard.childrenCount; i++) {
			const node = this.nodeLookCard.getChildByName("" + i)
			let showCardValue = function() {
				node.getComponent(CardNode).set_value(message.vecCards[i].mNValue, message.vecCards[i].mNColor)
			}.bind(this)

			let scaleValue = node.scale
			let nBeiShu = 0.2625

			let move
			if (i == 0) {
				move = cc.moveBy(nBeiShu, cc.v2(-40, -20))
			} else if (i == 1) {
				move = cc.moveBy(nBeiShu, cc.v2(0, -20))
			} else if (i == 2) {
				move = cc.moveBy(nBeiShu, cc.v2(40, -20))
			}
			let actions = [
				cc.scaleTo(nBeiShu, 0, scaleValue),
				cc.callFunc(showCardValue),
				cc.spawn(move, cc.scaleTo(nBeiShu, scaleValue * 1.4)),
				cc.delayTime(0.5),
			]
			if (message.cLord == -1) {
				actions.push(cc.spawn([
					cc.scaleTo(nBeiShu, scaleValue),
					move.reverse(),
				]))
			} else {
				const nodeCardSmall: cc.Node = this.lordCards[i].node
				const pos = this.nodeLookCard.convertToNodeSpaceAR(nodeCardSmall.convertToWorldSpaceAR(cc.v2(0, 0)))
				actions.push(cc.spawn([
					cc.moveTo(0.5, pos),
					cc.scaleTo(0.5, nodeCardSmall.width / node.width),
				]))
				actions.push(cc.callFunc(() => {
					this.prefab_bigCardPool.put(node)
					if (i == 0) {
						this.showLordCard(message.vecCards, true)
					}
				}))
			}
			node.runAction(cc.sequence(actions))
		}
	}
    
	/******************************************************************************************************************/
	//											通		用		方		法
	/******************************************************************************************************************/
	S2C(chairID) {
		if (chairID == null || chairID < 0) {
			cc.error('GameScene getPlayerByGuid chairID', chairID)
			return
		}

		let myChairID = this.myPlayer.getPlyData().chairId
		if (myChairID == null || myChairID < 0) {
			cc.error('GameScene getPlayerByGuid myChairID', myChairID)
			return
		}

		let chair = chairID - myChairID
		if (chair < 0) {
			chair += GameLogic.Instance().MAX_PLAYER_NUM
		}
		return chair
	}

	getPlayerByGuid(guid) {
		for (let player of this.players) {
			if (player.getPlyData().plyGuid == guid) {
				return player
			}
		}

		cc.error('GameScene getPlayerByGuid guid', guid)
	}

	getPlayerByChairID(chairID) {
		let chair = this.S2C(chairID)
		return this.players[chair]
	}

	
	getPlayerByLocalChairID(chairID) {		
		return this.players[chairID]
	}

	hideChuPaiTip() {		
		this.sptTipChuPai.stopAllActions()
		this.sptTipChuPai.active = false
		this.sptTipChuPai2.stopAllActions()
		this.sptTipChuPai2.active = false
	}
	
	showChuPaiTip(nOp) {
		this.hideChuPaiTip()
		const sptTipChuPai = nOp == 2 ? this.sptTipChuPai : this.sptTipChuPai2
		sptTipChuPai.active = true
		sptTipChuPai.opacity = 255
		sptTipChuPai.runAction(cc.sequence(
			cc.fadeIn(0.25),
			cc.delayTime(1),
			cc.fadeOut(0.25),
			cc.callFunc(this.hideChuPaiTip, this),
		))
	}

	showHandicapInfo() {
		//让牌
		cc.log("TODO showHandicapInfo")
	}

	showGameTipSimple(msg, delayTime) {
		if (typeof(msg) == "undefined" || msg == "") {
			return;
		}

		delayTime = delayTime ? delayTime : 2

		this.labelSimpleTip.$Label.string = msg;

        this.nodeSimpleTip.opacity = 0
        this.nodeSimpleTip.active = true

		let actionList1 = [];
		actionList1[actionList1.length] = cc.delayTime(0.1);
        actionList1[actionList1.length] = cc.fadeIn(0.5);        
        // actionList1[actionList1.length] = cc.sequence(cc.fadeIn(0.5), cc.moveTo(0.6, cc.v2(this.nodeSimpleTip.x, this.nodeSimpleTip.y + 30)))
		actionList1[actionList1.length] = cc.delayTime(delayTime);
		actionList1[actionList1.length] = cc.fadeOut(0.5);

		this.nodeSimpleTip.stopAllActions();
		this.nodeSimpleTip.runAction(cc.sequence(actionList1));
	}

	// 金币从一个地方吸到另一个地方
	sop_coin_drop(initParam) {
	    let num = 50
	    if (num <= 0){
	    	return
	    }
	    let scale = 1
	    let pos_start = initParam.pos_start
	    let pos_end = initParam.pos_end
	    let bezierCfg = {}

	    pos_start.x = pos_start.x
	    pos_start.y = pos_start.y
	    pos_start.randW = 25
	    pos_start.randH = 25

	    pos_end.x = pos_end.x
	    pos_end.y = pos_end.y
	    pos_end.randW = 25
	    pos_end.randH = 25

	    let matchY=  math.random(200)
	    let windowSize = cc.winSize
	    matchY = matchY -100
	    bezierCfg.pos_1 = cc.v2((pos_start.x + pos_end.x) / 2 + windowSize.width / 8, (pos_start.y + pos_end.y) / 2+matchY + windowSize.height / 8)
	    bezierCfg.pos_2 = cc.v2((pos_start.x + pos_end.x) / 2 + windowSize.width / 8, (pos_start.y + pos_end.y) / 2+ matchY + windowSize.height / 8)

	    let nodeSopCoinAni = new cc.Node("node_ani");

	    cc.director.getScene().addChild(nodeSopCoinAni)

	    cc.log("bezierCfg", bezierCfg)
	    cc.log("sopCoinPool size:", this.sopCoinPool.size())

	    for (let i = 0; i < Math.floor(num*1.3); i++) {

	        let pos_start_x = pos_start.x + math.random(pos_start.randW * 2) - pos_start.randW
	        let pos_start_y = pos_start.y + math.random(pos_start.randH * 2) - pos_start.randH
            
            let spriteAni = this.sopCoinPool.get()

            if(spriteAni == null) {
                spriteAni = new cc.Node("spriteAni");	
                spriteAni.sprite = spriteAni.addComponent(cc.Sprite);
				NodeExtends.setNodeSprite({ node: spriteAni, url: "moduleRPDdzRes/images/GamePlayer/login_pic_bean" })
            }	     

	        spriteAni.setPosition(pos_start_x, pos_start_y)
	        spriteAni.setScale(scale)
	        spriteAni.opacity = 0
	        nodeSopCoinAni.addChild(spriteAni)
	        
	        let pos_end_x = pos_end.x + math.random(pos_end.randW * 2) - pos_end.randW
	        let pos_end_y = pos_end.y + math.random(pos_end.randH * 2) - pos_end.randH
	        
	        let bezierConfig = []
	        bezierConfig[bezierConfig.length] = bezierCfg.pos_1
	        bezierConfig[bezierConfig.length] = bezierCfg.pos_2
	        bezierConfig[bezierConfig.length] = cc.v2(pos_end_x, pos_end_y)

	        let bezier = cc.bezierTo(1, bezierConfig)
	        let actions = []
	        let getRandomValue = function(value,i) {
	            return (num == i) ? value + 0.01 : math.random(value)
	        }
	    	
	        actions[actions.length] = cc.delayTime(getRandomValue(20,i)/100*4.2)
	        actions[actions.length] = cc.fadeIn(0.1);
	        actions[actions.length] = bezier.easing(cc.easeSineIn())
	        actions[actions.length] = cc.callFunc(() => {
                this.sopCoinPool.put(spriteAni)
	            if (num == i) {
	                if (initParam.callback) {
	                    initParam.callback()
	                }

	                nodeSopCoinAni.removeAllChildren()
					nodeSopCoinAni.removeFromParent(true)
					nodeSopCoinAni.destroy()
	            }
	        })

	        spriteAni.runAction(cc.sequence(actions))
	        
	    }

		this.scheduleOnce(function() {
			// GameLogic.Instance().audioManager.playSound('audio_drop_money')
		}.bind(this), 0.01)
    }
    
	showGameResultAndCheckSpring(message: Iproto_gc_game_result_not1 & IGameResult) {
		const actions = []
		actions.push(cc.delayTime(1))
		// 明牌
		actions.push(cc.callFunc(() => {
			for (let i = 1; i < GameLogic.Instance().MAX_PLAYER_NUM; ++i) {
				this.players[i].showCard()
			}
		}))
		// 春天
		if (message.bSpring == 1 || message.bReverseSpring == 1) {
			this.curRoundIsSpring = true
			actions.push(cc.delayTime(2.2))
			actions.push(cc.callFunc(() => {
				this.play_game_spine_ani(message.bSpring == 1 ? "spring" : "reverse_spring", 0)
			}))
		} else {
			this.curRoundIsSpring = false
			actions.push(cc.delayTime(1.4))
		}
		// 结算
		actions.push(cc.callFunc(() => {
			this.showGameResult(message)
		}))
		this.nodeActionResult.stopAllActions()
		this.nodeActionResult.runAction(cc.sequence(actions))
	}

	showGameResult(message: IGameResult) {
		this.msg_proto_gc_game_result_not1 = message
		this.popupmanager.showPopup()
	}
    
	onCloseScene() {
		cc.log("onDestroy")
		
	    for (let i = 0; i < GameLogic.Instance().MAX_PLAYER_NUM; ++i){
			this.players[i].destory()
		}
		
        this.prefab_bigCardPool.clear()
        this.smallCardPool.clear()
		this.sopCoinPool.clear()
		GameLogic.Instance().destory()
    }
	
	initRedPacket() {		
	}

	refreshRedPacketInfo(cur, dst) {
		
		this.progressBarBig.$ProgressBar.progress = cur/dst
		this.progressBarMin.$ProgressBar.progress = cur/dst
		this.labelProgressBig.getComponent(cc.Label).string = cur + "/" + dst
		this.labelProgressMin.$Label.string = cur + "/" + dst

		const num = DataManager.UserData.getItemNum(ITEM.REDPACKET_TICKET)
		this.labelRedPacketDetail.$Label.string = "" + num
		this.labelRedPacketDetail2.$Label.string = "≈" + numberFormat(num / 10000) + "元"

		const money = getRedPacketAwardConfig()[GameLogic.Instance().serverInfo.level]
		this['label_title2'].getComponent(cc.Label).string = `每${dst}局开福袋` + (money ? `最高${money}元` : '')
		if (!checkAdCanReceive(AdsConfig.taskAdsMap.DrawRedpacket)) {
			this.$("progressBarBig").active = false
			this.$("progressBarMin").active = false
			this.$("radio").active = false
			this.$("label_rp_tips").active = true
			this.$("rp_task_icon").y = this.$("progressBarMin").y
			this.$("label_title2").y = -50
			this.$("label_title2").color = cc.Color.WHITE
			this.$("label_title2", cc.Label).string = "您今日的福袋已开完"
		}
	}

	onPressExchange() {
		AudioManager.playButtonSound()
		GameLogic.Instance().showExchangePop()
	}

	onPressNewUserSign() {
		AudioManager.playButtonSound()
		GameLogic.Instance().showNewUserSignPop()
	}

	onPressShop() {
		AudioManager.playButtonSound()
		GameLogic.Instance().showShopScene()
	}

	onPressTask() {
		AudioManager.playButtonSound()
		GameLogic.Instance().showTaskPop()
	}

	onPressRedPacketDetail() {
		AudioManager.playButtonSound()
		this.nodeRedPacketDetail.active = !this.nodeRedPacketDetail.active
	}

	proto_gc_get_redpackets_award_not_handler(event) {
		if (true) {
			//交付给大厅实现
			return
		}
		let message = event.packet
		let newmessage = message.message_ || {};
		
        
        let msgTable = newmessage.split("|")

        let message_ = {
            playername : msgTable[0] ? msgTable[0] : "",
            vip : msgTable[1] ? msgTable[1] : "",
            place : msgTable[2] ? msgTable[2] : "",
            num : msgTable[3] ? msgTable[3] : "",
        }

		if (!GameLogic.Instance().redpacketTrumpetMsgs) {
			GameLogic.Instance().redpacketTrumpetMsgs = []
		}


		// reverse push reverse 效率比 unshift 高
		GameLogic.Instance().redpacketTrumpetMsgs.reverse()
		GameLogic.Instance().redpacketTrumpetMsgs.push(message_)
		GameLogic.Instance().redpacketTrumpetMsgs.reverse()
		cc.log(message_)
		this.broadcastAni()
	}

    testmessage() {

        let name = [
            "街",
            "毒",
            "孤毒",
            "城无",
            "南城无",
            "小讲理",
            "打小讲理",
            "落倾城城",
            "雨落倾城城",
            "会卖萌卖萌",
            "只会卖萌卖萌",
            "软脾气硬脾气硬",
            "心软脾气硬脾气硬",
            "森屿海巷森屿海巷",
            "森森屿海巷森屿海巷",
            "拥為伴深拥為伴深拥",
            "深拥為伴深拥為伴深拥",
            "人月下醉醉美人月下醉",
            "美人月下醉醉美人月下醉",
        ]
        let msg = {
            vip : math.random(0, 8),
            place : '钻石红包初级场',
            playername : name[math.random(name.length)],
            num : math.random(1000)/100,
        }
        if( msg.vip > 5 ){
            msg.num = math.random(10000)/10
        }

        let message = {
            message_ : msg.playername + "|" + msg.vip + "|" + msg.place + "|" + msg.num  
        }

        this.proto_gc_get_redpackets_award_not_handler({packet:message})

        this.awardNum = this.awardNum ? this.awardNum : 0;
        this.awardNum = this.awardNum + math.random(0, 8);
        // this.gametools.performWithDelayGlobal(this.testmessage, 1)

        let thisTimer = setInterval(() => {
            this.testmessage()
            clearInterval(thisTimer)
        }, 1000);
    }

	initBroadcast() {
		this.nodeRedPacketBroadCast.initPos = {
			x:0, 
			y:0
		}
		this.nodeRedPacketBroadCast.active = false
		// this.testmessage()
	}

	broadcastAni() {
		if (!this.nodeRedPacketBroadCast.playing) {
			this.nodeRedPacketBroadCast.playing = true

			let message = GameLogic.Instance().redpacketTrumpetMsgs.pop();

			for (let i = 1; i < 7; i++) {
				if (i == 2) {
					this["labelRpBroadCast" + i].$Label.string = message.playername
				}else if(i == 4) {
					this["labelRpBroadCast" + i].$Label.string = message.place + "获得"				
				}else if(i == 5) {
					this["labelRpBroadCast" + i].$Label.string = message.num + "元"
				}				
			}

			let rePos = () => {
				let offsetX = 0
				for (let i = 1; i < 7; i++) {
					this["labelRpBroadCast" + i].x = offsetX
					offsetX += this["labelRpBroadCast" + i].width
				}

				this.nodeRpLabels.x = -offsetX/2
			}
			
            let action0 = []
			action0[action0.length] = cc.delayTime(0.1)		
			action0[action0.length] = cc.fadeTo(0, 1)	
            // animation
            let action1 = []
			action1[action1.length] = cc.moveTo(0.7, cc.v2(this.nodeRedPacketBroadCast.initPos.x, this.nodeRedPacketBroadCast.initPos.y));	          
            action1[action1.length] = cc.fadeTo(0.5, 255)

            let action2 = []
            action2[action2.length] = cc.moveTo(0.7, cc.v2(this.nodeRedPacketBroadCast.initPos.x, this.nodeRedPacketBroadCast.initPos.y + 10));
            action2[action2.length] = cc.fadeTo(0.5, 0)


            let actions = []
            actions[actions.length] = cc.spawn(action0)	
            actions[actions.length] = cc.callFunc(() => {
				rePos()
			})
            actions[actions.length] = cc.spawn(action1)
            actions[actions.length] = cc.delayTime(math.random(30, 35)/10)
            actions[actions.length] = cc.spawn(action2)
            actions[actions.length] = cc.callFunc(() => {
                this.nodeRedPacketBroadCast.playing = false;
                this.nodeRedPacketBroadCast.y = this.nodeRedPacketBroadCast.initPos.y - 10;
                this.broadcastAni();
            })

            this.nodeRedPacketBroadCast.active = true
            this.nodeRedPacketBroadCast.runAction(cc.sequence(actions))
		}
	}
	
	update03ExchangeGoodsTip() {
		let tipNode = cc.find("nodeMain/nodeGamePlayer/nodeGamePlayer0/03ExchangeTips", this.node)
		if (null == tipNode)
			return

		if (!check03ExchangeGoods())
			return;
		
		let tip = null

		let rp = DataManager.UserData.getItemNum(365)
		if (rp < 3000) {
			if (this.level03ExchangeGoodsTips == 1) {
				return
			}
			this.level03ExchangeGoodsTips = 1
			let prog = (rp / 3000 * 100).toFixed(0) + "%"
			tip = tipNode.getChildByName("tip0")
			cc.find("frame/desc", tip).getComponent(cc.RichText).string = 
				"<color=#000000>兑换</c><color=#ff0000>[新手0.3元红包]</c>\n<color=#000000>所需红包券已完成</c><color=#ff0000>" + prog + "</c>"	
		}
		else {
			if (this.level03ExchangeGoodsTips == 2) {
				return
			}
			this.level03ExchangeGoodsTips = 2
		// else if (DataManager.CommonData["morrow"] == 0) {
		// 	tip = tipNode.getChildByName("tip1")
		// }
		// else if (DataManager.CommonData["morrow"] > 0){
			tip = tipNode.getChildByName("tip2")			
		}

		if (tip) {
			tip.active = true
			tip.runAction(cc.sequence(cc.fadeIn(0.2), cc.delayTime(5), cc.fadeOut(0.5), cc.callFunc(() => tip.active = false)))			
		}
		
	}

	showNewbieRedpacketTips() {
		if (!DataManager.Instance.getOnlineParamSwitch("Gamescene_newbieRedpacket_show", 1)) {
            return
		}
		if (DataManager.Instance.getOnlineParamSwitch("gamescene_guide_close_abtest")) {
			return
		}
		const round = DataManager.Instance.onlineParam.NewbieRedpacketTipsRound || 1
		if (DataManager.CommonData["roleCfg"]["roundSum"] == (round - 1)) {
			cc.find("nodeMain/nodeGamePlayer/nodeGamePlayer0/newbieRedpacketTips", this.node).active = true
		}
	}

	// player magic emoji
	// fr_chairid, to_chairid is local chairid
	playEmojiInteractAniByServerChairId(index, fr_chairid, to_chairid) {
		let fr_userData = this.getPlayerByChairID(fr_chairid)
		if (!fr_userData) {
			return
		}

		if (fr_userData.chairid == this.myPlayer.chairid) {			
			return
		}

		let to_userData = this.getPlayerByChairID(to_chairid)
		if (!to_userData) {
			return
		}
		this.playEmojiInteractAni(index, fr_userData, to_userData)
	}

	playEmojiInteractAniByChairId(index, fr_chairid, to_chairid) {
		let fr_userData = this.getPlayerByLocalChairID(fr_chairid)
		if (!fr_userData) {
			return
		}

		let to_userData = this.getPlayerByLocalChairID(to_chairid)
		if (!to_userData) {
			return
		}
		this.playEmojiInteractAni(index, fr_userData, to_userData)
	}
	
	playEmojiInteractAniByGuid(index, fr_guid, to_guid) {
		let fr_userData = this.getPlayerByGuid(fr_guid)
		if (!fr_userData) {
			return
		}

		let to_userData = this.getPlayerByGuid(to_guid)
		if (!to_userData) {
			return
		}
		this.playEmojiInteractAni(index, fr_userData, to_userData)
	}

	playEmojiInteractAni(message, fr_userData, to_userData) {
		cc.log("playEmojiInteractAni", message, fr_userData, to_userData)

		let srcPos = fr_userData["btnAvatar"].parent.convertToWorldSpaceAR(fr_userData["btnAvatar"].getPosition())		
		srcPos = this["nodeMagicEmojiAni"].parent.convertToNodeSpaceAR(srcPos);
		
		let dstPos = to_userData["btnAvatar"].parent.convertToWorldSpaceAR(to_userData["btnAvatar"].getPosition())
		dstPos = this["nodeMagicEmojiAni"].parent.convertToNodeSpaceAR(dstPos);
		
		cc.log(srcPos)
		cc.log(dstPos)

		if (!this.prefab_magic_emoji) {
			return
		}

		const index = message.cEmojiIndex, num = message.cEmojiNum || 1
		const endPos = dstPos, range = 20
        for (let i = 0; i < num; i++) {
        if (num > 1) {
            dstPos = cc.v2(endPos.x + Math.random() * range * 2 - range, endPos.y + Math.random() * range * 2 - range)    
        }

		let node_ani = cc.instantiate(this.prefab_magic_emoji)
        let node_ani_handler = node_ani.getComponent(GameMagicEmoji)		
		this["nodeMagicEmojiAni"].addChild(node_ani)
		node_ani_handler.initWithIndex(index)
		node_ani.setPosition(srcPos)

		let actionList1 = [];
		actionList1[actionList1.length] = cc.delayTime(i * 0.1)
		actionList1[actionList1.length] = cc.fadeIn(0.5);
		actionList1[actionList1.length] = cc.moveTo(0.5, dstPos);
		// actionList1[actionList1.length] = cc.delayTime(0.2);
		actionList1[actionList1.length] = cc.callFunc(function(){
			// gGameLogic.audioManager.playSound("audio_magic_" + index);
			cc.log("TODO add magic emoji sound")
		})
		actionList1[actionList1.length] = cc.callFunc(function(){
			// to_userData.showMsgInteractEmoji(index)
			let callback = () => {
				node_ani.removeFromParent(true)
				node_ani.destroy()
			}
			node_ani_handler.showMsgInteractEmoji(index, callback)
		});
		// actionList1[actionList1.length] = cc.fadeOut(0.1);
		// actionList1[actionList1.length] = cc.callFunc(function(){
			
		// });


		node_ani.opacity = 0;
		node_ani.runAction(cc.sequence(actionList1));
	}

	}

	isCallScore() {
		return this.bJiaoFen || GameLogic.Instance().isCallScoreMode()
	}

	isScoreTable() {
		if (GameLogic.Instance().isPrivateRoom()) {
			if (this.privateInvite) {
				return this.privateInvite.baseScore < 0
			}
		} else if (GameLogic.Instance().isMatchTable()) {
			return true
		}

		return false
	}

	// 添加私人房资源
	showPrivateRoom() {
		if (!GameLogic.Instance().isPrivateRoom()) {
			return
		}

		if (!this.prefab_privateRoom) {
			cc.error("prefab_privateRoom is null")
			return
		}

		const nodePrivateRoom = cc.instantiate(this.prefab_privateRoom)
		BaseFunc.BindChild(nodePrivateRoom, this)
		this["nodeBackground"].addChild(nodePrivateRoom)

		// 绑定按钮事件
		BaseFunc.AddClickEvent(this["btn_weixin"], this.node, this.thisComponentName, "onPressPrivateShare", 0, 3);
		BaseFunc.AddClickEvent(this["btn_ready"], this.node, this.thisComponentName, "proto_cb_ready_req_sender", 0, 3);
		BaseFunc.AddClickEvent(this["btnPrivateZhanJi"], this.node, this.thisComponentName, "proto_cg_private_room_result_req_sender", 0, 3);

		this["nodePrivateCode"].active = false
		this["btnPrivateZhanJi"].active = false
		this["btn_weixin"].active = false
		this["btn_ready"].active = false
		this["label_private_count"].getComponent(cc.Label).string = ""
		this["label_private_rule"].getComponent(cc.Label).string = ""

		this["nodeTopMiddle"].active = false
		this["nodeRightBottom"].active = false
		this.GameCardCounter.active = false
		this.update03ExchangeGoodsTip = () => { }
		this.wizardHongBaoQuan = () => { }
		this.showFingerWizard = () => { }
		this.getShareInfo()
	}

	showPrivateRoomButton() {
		if (this.isGameStart() || this.bHadStart) {
			return
		}
		const allin = GameLogic.Instance().playerData.length >= GameLogic.Instance().MAX_PLAYER_NUM
		this["btn_ready"].active = allin
		this["btn_weixin"].active = !allin
	}

	showPrivateCount() {
		this["label_private_count"].getComponent(cc.Label).string = this.privateInvite ? `第 ${this.nJuCount || 0} / ${this.privateInvite.tableTime} 局` : ''
	}

	onPressPrivateShare() {
		if (this._gameName != "") {
			this.onPrivateShare(this._gameName, this._domianName)
		}
	}

	onPrivateShare(title: string, url: string) {
		const rules: string[] = []
		rules.push(this.privateInvite.tableTime + "局")
		if (this.privateInvite.baseScore > 0) {
			rules.push("底注:" + this.privateInvite.baseScore + "金豆")
		} else {
			rules.push("底注:" + (-this.privateInvite.baseScore) + "积分")
		}
		const rule = JSON.parse(this.privateInvite.gameJson)
		if (rule.game_rule) {
			rules.push(rule.game_rule.value == 0 ? "叫地主" : "叫分")
		}
		if (rule.max_beishu) {
			rules.push(rule.max_beishu.value == 0 ? "最高倍数无上限" : "最高倍数" + rule.max_beishu.value + "倍")
		}

		const date = new Date(parseInt(this.privateInvite.createTime + '000'))
		const data = {
			guid: DataManager.UserData.guid,
			game_id: DataManager.Instance.gameId,
			verifyNum: this.privateInvite.inviteCode,
			num: DataManager.UserData.nickname,
			time: `${date.getMonth() + 1}月${date.getDate()}日${date.getHours()}点${date.getMinutes()}分`,
			mins: rules[0],
			plan: rules[1],
			mingameid: 389
		}
		const datas = []
		for (const key in data) {
			datas.push(key + "=" + encodeURIComponent(data[key]))
		}

		const gameTitle = "三人斗地主私人房邀请"
		if (cc.sys.isBrowser || DataManager.Instance.onlineParam.sharePrivateText) {
			const texts = []
			texts.push(title + " " + gameTitle)
			texts.push("【房间号】:" + this.privateInvite.inviteCode)
			texts.push("【游戏玩法】:" + rules.join(" "))
			texts.push("【游戏下载】:" + url + "?" + datas.join("&"))
			copyToClipBoard(texts.join("\n"), "房间号复制成功，请在微信粘贴后发送邀请信息!")

			// 打开微信app
			if (cc.sys.isMobile && DataManager.Instance.onlineParam.shareJumpWeiXin) {
				window.location.href = "weixin://"
			}
		} else {
			rules.splice(0, 0, "房间号:" + this.privateInvite.inviteCode)
			share({
				ShareWay: "WeiXin",
				ShareTitle: gameTitle,
				ShareText: rules.join(" "),
				ShareType: "0",
				ShareUrl: url + "?" + datas.join("&"),
			})
		}
	}

	updatePlayerScore() {
		if (this.isScoreTable()) {
			for (let i = 0; i < this.tableScores.length; i++) {
				const player = this.getPlayerByChairID(i)
				if (player) {
					player.setScoreNum(this.tableScores[i])
				}
			}
		}
	}
	
	_gameName: string = ""
	_domianName: string = ""
	getShareInfo() {
		const url = "http://www.izhangxin.com/get/private/share"
		const param = {
			gameid: DataManager.Instance.gameId
		}
		http.open(url, param, (res) => {
			if (res) {
				this._gameName = res.gameName
				this._domianName = res.domianName
			}
		})
	}

	// 2020.03.03 新增明牌开始 单独加倍
	proto_gc_show_card_req_handler(event) {
		let message = event.packet
		this.nSerialID = message.nSerialID //序列ID
		if (message.nShowCardType == 2) {
			this.showShowCard(true, message.nShowCardBet)
		} else if (message.nShowCardType == 3) {
			cc.find("nodeLayout/label_show_double", this["btnPutShowCard"]).getComponent(cc.Label).string = "x" + message.nShowCardBet
			const clickEvents: cc.Component.EventHandler[] = this["btnPutShowCard"].getComponent(cc.Button).clickEvents
			clickEvents[clickEvents.length - 1].customEventData = message.nShowCardBet
			this.showPutShowCard = true
		}
	}

	proto_gc_show_card_not_handler(event) {
		let message = event.packet
		var player = this.getPlayerByChairID(message.nChairID)
		if (player) {
			player.showTips(10)
		}
		this.proto_gc_refresh_card_not_handler({packet:{			
			cChairID: message.nChairID,
			vecCards: message.vecCards,
		}})
	}

	proto_gc_beishu_info_ack_handler(event) {
		this.beishuInfo = event.packet
		this.setDouble(this.getDouble(this.myPlayer.chairid))
		this.beishuInfo.vecPlayerBeiShu.forEach((beishu, i) => {
			const player = this.getPlayerByChairID(i)
			if (player) {
				player.setBet(beishu)
			}
		})
	}

	proto_cg_show_card_ack_sender(nShowCardBet: number, nShowCardType: number) {
		GameLogic.Instance().sendMessage({
			opcode: 'proto_cg_show_card_ack',
			cShowCard: 0,
			nSerialID: this.nSerialID,
			nShowCardBet: nShowCardBet,
			nShowCardType: nShowCardType,
		})
	}

	proto_cg_look_lord_card_req_sender() {
		GameLogic.Instance().sendMessage({
			opcode: 'proto_cg_look_lord_card_req',
		})
	}

	onPressStartGame() {
		this.showLookCard()
		AudioManager.playButtonSound()
		if (GameLogic.Instance().checkMoneyOutOfRange()) {
			this.showStartGame(true)
			return
		}
		this.goStartGame()
	}

	goStartGame() {
		this.beishuInfo = null
		this.showStartGame(false)
		this.showAniWait()
		// this.proto_cb_change_table_req_sender()
		this.proto_cb_ready_req_sender(false)
	}

	onPressShowStart(EventTouch, data) {
		AudioManager.playButtonSound()
		if (GameLogic.Instance().checkMoneyOutOfRange()) {
			this.showStartGame(true)
			return
		}
		czcEvent("斗地主", "明牌", "明牌开始")
		this.proto_cg_show_card_ack_sender(Number(data) || 0, 1)
		this.goStartGame()
	}

	onPressLookCard(EventTouch, data) {
		AudioManager.playButtonSound()
		if (GameLogic.Instance().checkMoneyOutOfRange()) {
			this.showStartGame(true)
			return
		}

		receiveAdAward(AdsConfig.taskAdsMap.LookLordCard, () => {
			this.proto_cg_look_lord_card_req_sender()
			this.isLookCard = true
			this.lookcard_tips.active = true
			this.goStartGame()
		})
	}

	onPressShowCard(EventTouch, data) {
		this.showShowCard(false)
		czcEvent("斗地主", "明牌", "发牌明牌")
		this.proto_cg_show_card_ack_sender(Number(data) || 0, 2)
	}

	onPressPutShowCard(EventTouch, data) {
		this.firstRoundLog()
		AudioManager.playButtonSound()
		czcEvent("斗地主", "明牌", "出牌明牌")
		this.proto_cg_show_card_ack_sender(Number(data) || 0, 3)
		this.showPutButton()
	}

	onPressShowBeishuInfo(EventTouch, data) {
		if (!this.isGameStart()) {
			return
		}
		if (!this.beishuInfo) {
			return
		}
		if (this.nodeBeishuInfo.active) {
			return
		}
		this.showBeishuInfo(true)
	}

	onPressHideBeishuInfo(EventTouch, data) {
		this.showBeishuInfo(false)
	}

	showStartGame(active) {
		this.nodeStartGame.active = active
		this.btnLookCard.active = false
		this.btnShowStart.active = false
		active && this.showLookCard()
		/**
		if (active) {
			if (DataManager.GlobalData && DataManager.GlobalData.noAD) {
				this.btnLookCard.active = false
			}
			if (!checkADNum(AdsConfig.taskAdsMap.LookLordCard)) {
				this.btnLookCard.active = false
			}
		}
		*/
	}

	showShowCard(active: boolean, value: number = 0) {
		this.nodeShowCard.active = active
		if (active) {
			const label = cc.find("nodeLayout/label_show_double", this["btnShowCard"]).getComponent(cc.Label)
			const clickEvents: cc.Component.EventHandler[] = this["btnShowCard"].getComponent(cc.Button).clickEvents
			const updateDouble = (value: number) => {
				clickEvents[clickEvents.length - 1].customEventData = value as any
				label.string = "x" + value
			}
			updateDouble(value)
			const actions = []
			for (let i = value - 1; i >= 2; i--) {
				actions.push(cc.delayTime(1))
				actions.push(cc.callFunc(() => {
					updateDouble(i)
				}))
			}
			actions.push(cc.delayTime(1))
			actions.push(cc.callFunc(() => {
				this.showShowCard(false)
			}))
			this["btnShowCard"].stopAllActions()
			this["btnShowCard"].runAction(cc.sequence(actions))
		}
	}

	showBeishuInfo(active) {
		this.nodeBeishuInfo.active = active
		if (!active) {
			return
		}
		const beishuString = (n) => {
            return n > 1 ? n : "---"
		}
		enum BEI {
			BEI_INIT,		// 初始倍数
			BEI_SHOWCARD,	// 明牌倍数
			BEI_ROBLORD,	// 抢地主倍数
			BEI_BOMB,		// 炸弹倍数
			BEI_SPRING,		// 春天倍数
			BEI_LEFTCARD,	// 剩牌倍数
			BEI_CALLSCORE,	// 叫地主倍数
		}
		const vecBeiShuInfo = this.beishuInfo.vecBeiShuInfo
		const vecPlayerBeiShu = this.beishuInfo.vecPlayerBeiShu
		let commonBeishu = 1
		for (const beishu of vecBeiShuInfo) {
			commonBeishu *= beishu
		}

		let isMyLord = false
		let lordBeishu = 1
		for (let i = 0; i < vecPlayerBeiShu.length; i++) {
			const player = this.getPlayerByChairID(i)
			if (player && player.isLord) {
				isMyLord = player.isMe()
				lordBeishu = vecPlayerBeiShu[i]
			}
		}

		let farmerBeishu = 0
		for (let i = 0; i < vecPlayerBeiShu.length; i++) {
			const player = this.getPlayerByChairID(i)
			if (player && !player.isLord) {
				if (isMyLord) {
					farmerBeishu += vecPlayerBeiShu[i]
				} else if (player.isMe()) {
					farmerBeishu = vecPlayerBeiShu[i]
					break
				}
			}
		}
		farmerBeishu = farmerBeishu || 1

        if (this.isCallScore()) {
			this.label_rob_title.getComponent(cc.Label).string = "叫分"
			this.label_rob.getComponent(cc.Label).string = beishuString(vecBeiShuInfo[BEI.BEI_CALLSCORE])
		} else {
			this.label_rob_title.getComponent(cc.Label).string = "抢地主"
			this.label_rob.getComponent(cc.Label).string = beishuString(vecBeiShuInfo[BEI.BEI_ROBLORD])
		}
		this.label_init.getComponent(cc.Label).string = beishuString(vecBeiShuInfo[BEI.BEI_INIT])
		this.label_show.getComponent(cc.Label).string = beishuString(vecBeiShuInfo[BEI.BEI_SHOWCARD])
		this.label_bomb.getComponent(cc.Label).string = beishuString(vecBeiShuInfo[BEI.BEI_BOMB])
		this.label_spring.getComponent(cc.Label).string = beishuString(vecBeiShuInfo[BEI.BEI_SPRING])
		this.label_leftcard.getComponent(cc.Label).string = beishuString(vecBeiShuInfo[BEI.BEI_LEFTCARD])
		this.label_common.getComponent(cc.Label).string = "" + commonBeishu
		this.label_lord.getComponent(cc.Label).string = "x" + lordBeishu
		this.label_nongmin.getComponent(cc.Label).string = "x" + farmerBeishu
		this.label_result.getComponent(cc.Label).string = "" + commonBeishu * lordBeishu * farmerBeishu
	}

	getDouble(nChairID) {
		if (!this.beishuInfo) {
			return this.nDouble
		}
		const vecBeiShuInfo = this.beishuInfo.vecBeiShuInfo
		const vecPlayerBeiShu = this.beishuInfo.vecPlayerBeiShu
		let commonBeishu = 1
		for (const beishu of vecBeiShuInfo) {
			commonBeishu *= beishu
		}

		let isMyLord = false
		let lordBeishu = 1
		for (let i = 0; i < vecPlayerBeiShu.length; i++) {
			const player = this.getPlayerByChairID(i)
			if (player && player.isLord) {
				isMyLord = player.chairid == nChairID
				lordBeishu = vecPlayerBeiShu[i]
			}
		}

		let farmerBeishu = 0
		for (let i = 0; i < vecPlayerBeiShu.length; i++) {
			const player = this.getPlayerByChairID(i)
			if (player && !player.isLord) {
				if (isMyLord) {
					farmerBeishu += vecPlayerBeiShu[i]
				} else if (player.chairid == nChairID) {
					farmerBeishu = vecPlayerBeiShu[i]
					break
				}
			}
		}
		farmerBeishu = farmerBeishu || 1

		return commonBeishu * lordBeishu * farmerBeishu
    }

    proto_gc_two_lord_card_not_handler(event) {
    	cc.error("ffffffffffff1111111111",event.packet.nLetNum)
    	this.proto_gc_lord_card_not_handler(event)
    	this.robNum = event.packet.nLetNum
    	this.isShowLordCardNot = true
    	this.initRobInfoLabel()
    	if (event.packet.nLordLetNum > 0) {
    		this.showLordLetCard(event.packet.nLordLetNum)
    	}
    }

    proto_gc_two_let_card_not_handler(event) {
    	cc.error("ffffffffffff2222222222",event.packet.nLetNum)
    	this.robNum = event.packet.nLetNum
    	this.initRobInfoLabel()
    }

    initRobInfoLabel() {
    	let str = ''
    	if (this.isShowLordCardNot) {
    		str = "地主让牌" + this.robNum + "张"
    	} else {
    		if (this.robNum != 0) {
    			if (this.isQiangDiZhu) {
    				str = "被让牌" + this.robNum + "张"
    			} else {
    				str = "让牌" + this.robNum + "张"
    			}
    		}
    	}

    	this.lbl_two_rob_info.getComponent(cc.Label).string = str
    	this.node_two_rob_info.active = str.length > 0
    }

    showLordLetCard(num: number) {
    	this.lbl_two_lord_let.getComponent(cc.Label).string = '地主剩' + num + '张可获胜'
    	this.node_two_lord_let.active = true
    	this.node_two_lord_let.runAction(cc.sequence(cc.delayTime(3), cc.hide()))
    }

    setRangPai(value: boolean) {
    	this.isQiangDiZhu = value
    	this.initRobInfoLabel()
    }

	// 添加比赛场资源
	showMatchGame() {
		if (!GameLogic.Instance().isMatchTable()) {
			return
		}

		if (!this.prefab_MatchGame) {
			cc.error("prefab_MatchGame is null")
			return
		}

		const node = cc.instantiate(this.prefab_MatchGame)
		BaseFunc.BindChild(node, this)
		node.parent = cc.find("nodeMain", this.node)

		this.matchGame = node.getComponent(MatchGame)
		this.matchGame.onOpenScene()

		this["btnExit"].active = false
		this["btnExchange"].active = false
		this["btnShop"].active = false
		this["GameCardCounter"].active = false
		this.showFingerWizard = () => { }
		this.update03ExchangeGoodsTip = () => { }
		this.wizardHongBaoQuan = () => { }
		this.showChangCiInfo = () => { }

		const matchInfo = GameLogic.Instance().getCurMatchInfo()
		if (matchInfo) {
			SceneManager.Instance.popScene("moduleBaseRes", "MatchReady", { matchId: matchInfo.matchId, matchType: matchInfo.matchType, gameLogic: GameLogic.Instance() })
		}
	}

	proto_gc_send_dizhu_not(event) {
        const message = event.packet
        this.setDiZhu(message.nGameMoney)
	}
	
	// 提示炸弹动画
	showBombTips(n?: number, fist: boolean = true) {
		const bomb = this.myPlayer.countBomb(n)
		if (this.nBombTips == bomb) {
			return
		}
		this.nBombTips = bomb
		for (let i = 1; i < 5; i++) {
			const node = this["bomb_tips_" + i]
			if (i == bomb) {
				node.stopAllActions()
				node.active = true
				node.x = 0
				node.opacity = 255
				node.runAction(cc.spawn([
					cc.moveBy(1.2, cc.v2(420, 0)).easing(cc.easeCubicActionOut()),
					cc.sequence([
						cc.delayTime(1),
						cc.fadeOut(0.2),
					])
				]))
			} else if (fist) {
				node.active = false
			}
		}
	}

	// 新人前n局红包
	proto_gc_get_redpackets_newbie_award_req(event) {
		cc.log("proto_gc_get_redpackets_newbie_award_req")
		this.msg_proto_gc_get_redpackets_newbie_award_req = event.packet
	}

	proto_gc_get_redpackets_newbie_award_not(event) {
		cc.log("proto_gc_get_redpackets_newbie_award_not")
		let message = event.packet
		if (message.nRet != 0) {
			return
		}
		showAwardResultPop([{ index: ITEM.REDPACKET_TICKET, num: message.nAmount }], null, () => {
			cc.log("cyl proto_gc_get_redpackets_newbie_award_not close")
		})
	}

	checkGameEndPops_NewbieRedpacket(): boolean {
		// 开关控制显示
        if (!DataManager.Instance.getOnlineParamSwitch("Gamescene_newbieRedpacket_show", 1)) {
            return false
		}

		if (!this.msg_proto_gc_get_redpackets_newbie_award_req) {
			return false
		}

		if (!checkAdCanReceive(AdsConfig.taskAdsMap.NewbieRedpacket)) {
			return false
		}

		GameLogic.Instance().showNewbieRedpacketPop(this.msg_proto_gc_get_redpackets_newbie_award_req)
		this.msg_proto_gc_get_redpackets_newbie_award_req = null
		return true
	}

	checkGameEndPops_GameResult(): boolean {
		if (!this.msg_proto_gc_game_result_not1) {
			return false
		}

		GameLogic.Instance().showGameResultLayer(this.msg_proto_gc_game_result_not1)
		this.msg_proto_gc_game_result_not1 = null
		return true
	}

	refreshLookCardNum(num: number) {
		this["lbl_lookcard_count"].$Label.string = num
	}

	onPressLookCardItem(EventTouch, data) {
		AudioManager.playButtonSound()
		if (this.checkItemExchange({
			itemId: ITEM.LOOK_LORDCARD,
			itemNum: 1,
			failCallback: () => {
				iMessageBox("您的底牌卡不足，通过兑换或商城可获得")
			},
			tryCallback: () => {
				if (!this["node_lookcard"].active) {
					return
				}
				this.onPressLookCardItem(EventTouch, data)
			}
		})) {
		} else {
			return
		}

		czcEvent("斗地主", "看底牌", this.isGameStart() ? "发牌后" : "发牌前")
		GameLogic.Instance().sendMessage({
			opcode: 'proto_cg_look_lord_card_item_req',
		})
		this["node_lookcard"].active = false
	}

	showLookCard() {
		if (this.isLookCard) {
			return
		}
		this["node_lookcard"].active = true
	}

	proto_gc_look_lord_card_item_ack(event) {
		const message = event.packet
		if (message.nRet >= 0) {
			this.isLookCard = true
		}
		if (message.nRet == 0) {
			this.lookcard_tips.active = true
		} else if (message.nRet == -4) {
			iMessageBox("您的底牌卡不足，通过兑换或商城可获得")
			this.proto_gc_item_info_not({ packet: { nItemIndex: ITEM.LOOK_LORDCARD, nItemCount: 0 } })
		} else if (message.nRet < 0) {
			iMessageBox("看底牌失败，道具已返还")
		}
	}

	proto_gc_item_add_not(event) {
		const message = event.packet
		if (message.nItemIndex == ITEM.CHIP_ADVANCE || message.nItemIndex == ITEM.CHIP_LEGEND) {
			GameLogic.Instance().showItemAdd({ index: message.nItemIndex, value: message.nItemCount })
		}
	}

	proto_gc_item_info_not(event) {
		const message = event.packet
		for (const item of DataManager.UserData.items) {
			if (item.idx == message.nItemIndex) {
				item.num = message.nItemCount
				break
            }
		}
	}

	_firstRoundLog = false
	firstRoundLog() {
		if (DataManager.CommonData["roleCfg"]["roundSum"] == 0) {
			if (this._firstRoundLog) {
				return
			}
			this._firstRoundLog = true
			czcEvent("斗地主", "游戏", "新用户操作")
		}
	}
}
