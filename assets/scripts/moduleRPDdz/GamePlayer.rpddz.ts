import BaseFunc = require("../base/BaseFunc")
import DataManager from "../base/baseData/DataManager";
import GamePlayerStateController from "./GamePlayerStateController.rpddz"
import GameRule from "./GameRule.rpddz"
import {CCard, CCardsType} from "./CCard.rpddz"
import GameLogic from "./GameLogic.rpddz"
import { getHttpSpriteFrame, getNewBieRoundLimit } from "../base/BaseFuncTs";
import GameClock from "./GameClock.rpddz";

const {ccclass, property} = cc._decorator;

export enum EANI {
	ANI_HUOJIAN, //火箭
	ANI_ZHADAN, //炸弹
	ANI_SHUNZI, //顺子
	ANI_LIANDUI, //连队
	ANI_FEIJI, //飞机
	ANI_SHUNZI2, //顺子
}

@ccclass
export default class GamePlayer extends GamePlayerStateController {

    // @property([])
    // players

    // LIFE-CYCLE CALLBACKS:    
    @property(cc.SpriteAtlas)
    gameSceneAtlas: cc.SpriteAtlas = null

    @property()
    chairid:number = null

    @property(GameRule)
    gameRule:GameRule = null
    
    @property(CCard)
	handCardsVec:CCard[] = []
	
    @property()
	isAuto:boolean = false
	isLord:boolean = false
	bSendNoCard:boolean = false
	dealCardFlag:boolean = true
	userData = []

	stopRefreshRedPacket:boolean = false

	thisComponentName = "GamePlayer.rpddz"

    @property(cc.Prefab)
	prefab_lord_star:cc.Prefab = null

    @property(cc.Prefab)
    prefab_lord_coin:cc.Prefab = null

	isShowCard: boolean = false
	tipsTimestamp: number;
	nodeGameTip: cc.Node;
	GameClock: cc.Node;
	clock: GameClock;
	nodeHead: cc.Node;
	nodeRole: cc.Node;
	spine_dizhu: cc.Node;
	spine_nongmin: cc.Node;
	spine_role: cc.Node;
        
	
	

    onLoad() {
		cc.log("GamePlayer onload");
        if (GameLogic.Instance().isRedPacketTable() == false) {
            this.nodeRedPacket.active = false
		}
		if (GameLogic.Instance().isMatchTable()) {
			this.setScoreNum(0)
		}
    }

    __bindButtonHandler() {
		cc.log("__bindButtonHandler")
		BaseFunc.AddClickEvent(this["btnAvatar"], this.node, this.thisComponentName, "onPressAvatar", 0, 3);
	}

	onPressAvatar() {
		if (this.isMe()) {
			return
		}
		if (GameLogic.Instance().emojiConfigs.length == 0) {
			return			
		}
		if (GameLogic.Instance().isPrivateRoom()) {
			return			
		}
		if (GameLogic.Instance().isMatchTable()) {
			return			
		}
		
        let initParam = {
			avatarFrame: this.sptAvatar.getComponent(cc.Sprite).spriteFrame,
			repacketValue: this.labelRedPacket.getComponent(cc.Label).string,
			nickname: this.getPlyData().nickname,
			moneyValue: this.labelMoney.getComponent(cc.Label).string,
			toChairId: this.getPlyData().chairId,
			toPid: this.getPlyData().plyGuid,
            callback: (index) => {
				GameLogic.Instance().gamescene.playEmojiInteractAniByChairId(index, 0, this.chairid)
			}
        }
		GameLogic.Instance().showGameMagicEmojiPanel(initParam)
	}
	
	isMe() {
		return (this.chairid == 0)
    }
    
    setChairId(chairid, param) {
        cc.log("setData" + chairid)
        this.chairid = chairid;
        this.gameRule = new GameRule();
        
        this.labelRedPacket.getComponent(cc.Label).string = 0
        this.labelMoney.getComponent(cc.Label).string = 0

        this.clock = this.GameClock.getComponent(GameClock)
        this.clock.init(this)
        
        this.node_player_hand_card = param.nodeHandcard
        this.node_player_put_card = param.nodePutcard

		this.putCard = this.node_player_put_card.getComponent("AreaCardNode.rpddz")
		this.handCard = this.node_player_hand_card.getComponent("AreaCardNode.rpddz")
		
		if (this.isMe()) {
            
            let srcPos = GameLogic.Instance().gamescene.nodeMain.parent.convertToWorldSpaceAR(GameLogic.Instance().gamescene.nodeMain.getPosition())
            // let srcPos = cc.v2(cc.winSize.width, cc.winSize.height)
            // let srcPos = cc.v2(0, 0)
            let dstPos = this.nodeGameTip.parent.convertToNodeSpaceAR(srcPos)
            this.nodeGameTip.setPosition(dstPos)
        }else{
            this.nodeGameTip.setPosition(this["nodeReadyPos" + this.chairid].getPosition());
		}

		this.nodeCallScore.setPosition(this["nodeCallScorePos" + this.chairid].getPosition());
		this.nodeCallScore.active = false

		if (this.chairid == 0) {
			this.spine_dizhu.scale = 0.2
			this.spine_nongmin.scale = 0.4
		} else if (this.chairid == 1) {
			this.node_spine_role.scaleX *= -1
		}
        
        this.GameClock.setPosition(this["nodeCallScorePos" + this.chairid].getPosition());
		
		this.nodeAniAlarm.setPosition(this["nodeAlarmPos" + this.chairid].getPosition());
		this.nodeAniAlarm.active = false
		
		this.nodeRemainCard.setPosition(this["nodeRemainCardPos" + this.chairid].getPosition());

		this.nodePutOverAni.setPosition(this["nodePutOverPos" + this.chairid].getPosition());
		this.sptPutOver.active = false


    }

	setUserData(data) {
		this.userData = data
        
		this.show()

		this.setItemView(0, this.userData.money)

        // this.setRedPacketNum(this.userData.money)
        
        this.initHeadIcon()
		
		if(this.userData.plyGuid > 0) {
			this.doStateChangeStay()    
		}
		if (this.isMe()) {
			// cc.error("ERROR:\t", (new Date()).toLocaleString(), this.userData)
		}
    }
    
    getPlyData() {        
		return this.userData
    }

	startClockTime(time) {
		this.showTips()
		this.bSendNoCard = false		
		if (time && time > 0) {
			// this.nodeGameTip.active = false
			let delayTime = 0
			if (time > 20) {
				delayTime = 1
			}
			this.clock.startTime(time, delayTime)
			if (this.spine_role && this.spine_role.activeInHierarchy) {
				this.spine_role.stopAllActions()
				this.spine_role.runAction(cc.sequence([
					cc.delayTime(5),
					cc.callFunc(() => {
						this.playRoleAction("sikao", true)
					})
				]))
			}
		} else {
			this.clock.stopTime()
		}
    }
    
    onTimeOut() {
		if(this.bSendNoCard) {
			GameLogic.Instance().gamescene.onBuChu()
			this.bSendNoCard = false
		}
    }

    // State Function start ===================================
    onEnterStay() {
        cc.log("GamePlayer.onEnterStay")
        this.show()
        
		this.clock.stopTime()
		
		this.hideRole()

		this.hideRemainCard()
		
        this.showTips()
    }

    onEnterReady() {
        cc.log("GamePlayer.onEnterReady")

        this.showReady()
    }

    onEnterStartGame() {
        cc.log("GamePlayer.onEnterStartGame")
        this.show()
        
        this.hideReady()
    }

    onEnterEndGame() {
        cc.log("GamePlayer.onEnterEndGame")
        
		this.clock.stopTime()

		this.hideCardAlarm()
    }

    onEnterLeave() {
        cc.log("GamePlayer.onEnterLeave")
        this.clearPlayer()
        
    }    
    // State Function end ===================================

    //view controll
    show() {
        this.node.active = true
    }

    removePlayer() {
		this.userData.money = 0
		this.userData.plyGuid = 0

		this.labelMoney.getComponent(cc.Label).string = 0
		this.labelRedPacket.getComponent(cc.Label).string = 0
		
        
		this.initHeadIcon(true)
		
        this.node.active = false
	}
	
    clearPlayer() {
		
		if (this.userData.plyGuid > 0) {			
			GameLogic.Instance().removePlayerData(this.userData.plyGuid)
		}
		
		// this.clearGameData()

		if (!this.isMe()) {
			this.removePlayer()
		}
	}
	
	clearGameData() {
		this.dealCardFlag = true
		this.isShowCard = false

		this.hideRole()

        this.hideRemainCard()
        
        this.showTips()

		this.clearHandcard()
		
		this.setStopRefreshRedPacket(false)

		if (GameLogic.Instance().isPrivateRoom()) {
			return
		}

		if (!this.isMe()) {
			this.removePlayer()
		}
	}

	clearHandcard() {
		if (this.isMe()) {
			this.handCard.clearCards()
		}

		this.handCardsVec = []
    }
    
    showReady() {
        this.showTips(12)
    }

    hideReady() {

    }

    showAuto(flag) {
        cc.log("TODO showAuto")
    }

	
	hideRole() {
		this.nodeHead.active = true
		this.nodeRole.active = false
		this.isLord = false
	}

	
	showCallScoreAni(number = 0) {
		this.nodeCallScore.active = true
		this.CallScoreAniStar.active = true

		this.labelCallScore1.$Label.string = number
		this.labelCallScore2.$Label.string = number
		{
			//放大缩小
			this.nodeCallScore1.scale = 1.4
			let actions_label_1 = [];
			actions_label_1[actions_label_1.length] = cc.delayTime(0)
			actions_label_1[actions_label_1.length] = cc.fadeIn(0.01)
			actions_label_1[actions_label_1.length] = cc.scaleTo(0.3, 1).easing(cc.easeBackOut())
			// actions_label_1[actions_label_1.length] = cc.tintTo(0.3, 214,180,60)
			// actions_label_1[actions_label_1.length] = cc.tintTo(0.3, 255,255,255)
			actions_label_1[actions_label_1.length] = cc.delayTime(1.7)
			actions_label_1[actions_label_1.length] = cc.fadeOut(0.2)
			actions_label_1[actions_label_1.length] = cc.callFunc(() => {
				this.nodeCallScore.active = false
				this.CallScoreAniStar.active = false
				// callscore_star.removeFromParent()
			})


			this.nodeCallScore1.stopAllActions()
			this.nodeCallScore1.runAction(cc.sequence(actions_label_1));
		}

		{
			//模糊消失
			this.nodeCallScore2.scale = 1
			this.nodeCallScore2.opacity = 0
			let actions_label_2 = [];
			actions_label_2[actions_label_2.length] = cc.delayTime(0.3)
			actions_label_2[actions_label_2.length] = cc.fadeIn(0.01),
			actions_label_2[actions_label_2.length] = cc.spawn(
				cc.scaleTo(0.6, 1.5),
				cc.fadeOut(0.6),
			)
			this.nodeCallScore2.stopAllActions()
			this.nodeCallScore2.runAction(cc.sequence(actions_label_2));
		}
		
		{
			this.sptCallScoreGuang.opacity = 0
			let actions_guang = [];
			actions_guang[actions_guang.length] = cc.delayTime(0.3)
			actions_guang[actions_guang.length] = cc.callFunc(() => {
				this.sptCallScoreGuang.scaleX = 1
				this.sptCallScoreGuang.scaleY = 0.1		
			})
			actions_guang[actions_guang.length] = cc.fadeIn(0.01),
			actions_guang[actions_guang.length] = cc.scaleTo(0.2, 1)
			actions_guang[actions_guang.length] = cc.spawn(
				cc.fadeOut(0.3),
				cc.scaleTo(0.3, 0, 1)
			)
			this.sptCallScoreGuang.stopAllActions()
			this.sptCallScoreGuang.runAction(cc.sequence(actions_guang));
		}
	}

	showPutOverAni() {
		if (true) {
			GameLogic.Instance().gamescene.showPutOverAni(this.chairid)
			return
		}
		if (this.sptPutOver.playing) {
			return
		}
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

	showRoleAni() {

		this.nodeAniLord.active = true
		this.nodeAniLord.opacity = 255
		let actionList1 = [];
		actionList1[actionList1.length] = cc.delayTime(0)
		actionList1[actionList1.length] = cc.callFunc(() => {
			let lord_star = cc.instantiate(this.prefab_lord_star)
			this.nodeAniLord.addChild(lord_star, 2)			
		})
		actionList1[actionList1.length] = cc.delayTime(0.1)
		actionList1[actionList1.length] = cc.callFunc(() => {
			let lord_coin = cc.instantiate(this.prefab_lord_coin)
			this.nodeAniLord.addChild(lord_coin, 1)			
		})
		actionList1[actionList1.length] = cc.delayTime(1)
		actionList1[actionList1.length] = cc.fadeOut(0.1)
		actionList1[actionList1.length] = cc.callFunc(() => {
			this.nodeAniLord.removeAllChildren()
		})
		this.nodeAniLord.stopAllActions()
		this.nodeAniLord.runAction(cc.sequence(actionList1));
		
	}

	showRole(isLord: boolean) {
		this.isLord = isLord
		this.spine_dizhu.active = isLord
		this.spine_nongmin.active = !isLord
		this.spine_role = isLord ? this.spine_dizhu : this.spine_nongmin
		this.playRoleAction("daiji", true)

		this.nodeRole.active = true
		this.nodeHead.active = false

		this.nodeRole.opacity = 0
		this.nodeRole.setScale(1.5)
		this.nodeRole.stopAllActions()
		this.nodeRole.runAction(cc.sequence([
			cc.spawn([
				cc.fadeIn(0.3),
				cc.scaleTo(0.6, 1)
			]),
			cc.callFunc(() => {
				this.showRoleAni()
			})
		]))
	}

	showCardAlarm() {
		if (this.nodeAniAlarm.playInThisRound) {
			return
		}
		this.nodeAniAlarm.playInThisRound = true
		
		this.nodeAniAlarm.active = true
		GameLogic.Instance().playSound("audio_alarm");

		var animation = this.sptAlarm.getComponent(cc.Animation)
		animation.once('stop', function(){
			this.nodeAniAlarm.active = false
		}.bind(this), this);

		var animState = animation.play('animation_alarm')
		animState.repeatCount = Infinity;
		animState.speed = 0.5;
	}

	hideCardAlarm() {
		var animation = this.sptAlarm.getComponent(cc.Animation)
		var animState = animation.stop('animation_alarm')
		this.nodeAniAlarm.active = false
		this.nodeAniAlarm.playInThisRound = false
	}

    showRemainCard(num) {
        this.nodeRemainCard.active = true        
		if(num > 0 && num < 3) {
			this.showCardAlarm()
		}

		if(this.dealCardFlag) {
			if (this.handCardsVec[0].mNValue > 0) {
				this.setShowCard()
			}
			this.labelRemainCard.dstNum = num
			this.labelRemainCard.$Label.string = 0
			this.labelRemainCard.stopAllActions()
			
			let actionList1 = [];
			actionList1[actionList1.length] = cc.delayTime(0.07)
			actionList1[actionList1.length] = cc.callFunc(() => {
				this.labelRemainCard.$Label.string++;
				if(this.labelRemainCard.$Label.string >= this.labelRemainCard.dstNum) {
					this.labelRemainCard.stopAllActions()
					this.refresh_handCards_other()
				}
			})
			let action = cc.repeatForever(cc.sequence(actionList1))
			
			if (GameLogic.Instance().isBuxipaiMode()) {
				const updateRemainCard = () => {
					this.labelRemainCard.$Label.string++;
					if(this.labelRemainCard.$Label.string >= this.labelRemainCard.dstNum) {
						this.labelRemainCard.stopAllActions()
						this.refresh_handCards_other()
					}
				}
				actionList1.length = 0
				let lastTime = 0
				for (let i = 0; i < num; i++) {
					const time = 0.5 * Math.floor(i / 6) + (i % 6) * 0.03 + 0.3
					actionList1[actionList1.length] = cc.delayTime(time - lastTime)
					actionList1[actionList1.length] = cc.callFunc(updateRemainCard)
					lastTime = time
				}
				action = cc.sequence(actionList1)
			}
			this.labelRemainCard.runAction(action);
		}else{
			if (this.labelRemainCard.getNumberOfRunningActions() == 0) {
				this.labelRemainCard.$Label.string = num
			}
			this.refresh_handCards_other()
		}
	}

	setShowCard() {
		this.isShowCard = true
		this.isMe() && this.handCard.refresh_hand_card_icon(this.isShowCard)
	}

	refresh_handCards_other() {
		if (!this.isShowCard) {
			return
		}
		this.nodeRemainCard.x = 65
		this.handCard.set_card_value(this.handCardsVec, true)
		this.handCard.reset_hand_card_pos({ noAni: true, AniType: 3 })
	}

    hideRemainCard() {
		this.nodeRemainCard.active = false        
	}
	
	setItemView(index_, value_) {
		if (this.isMe()) {
			GameLogic.Instance().userProperties[index_] = value_
		}
		if(index_ == GameLogic.Instance().HONGBAO_GOLD_MONEY) {
			this.setMoneyNum(value_)
		}else if(index_ == GameLogic.Instance().HONGBAO_GOLD_TICKET) {
			this.setRedPacketNum(value_)
		}
	}

	setStopRefreshRedPacket(value) {
		if (this.isMe()) {
			this.stopRefreshRedPacket = value
			if (!value) {				
				this.setItemView(365, DataManager.UserData.getItemNum(365))
			}
		}
	}

    setRedPacketNum(num = 0) {
		if (this.isMe()) {
			DataManager.UserData.setItemNum(GameLogic.Instance().HONGBAO_GOLD_TICKET, num)
		}
		if (this.stopRefreshRedPacket) {
			return
		}
        this.labelRedPacket.getComponent(cc.Label).string = GameLogic.Instance().GetMoneyShortString(num)
	}
	
    refreshRedPacketNum(num = 0) {

	}


    setMoneyNum(num = 0) {
		if (this.isMe()) {
			DataManager.UserData.money = num
		}
        this.labelMoney.getComponent(cc.Label).string = GameLogic.Instance().GetMoneyShortString(num)
	}

	setScoreNum(num = 0) {
		this.nodeRedPacket.active = false
		this.nodeMoney.active = false
		this.nodeScore.active = true
		this.labelScore.getComponent(cc.Label).string = num
    }

    setClockPos(x, y = null) {
        let pos = cc.v2(x, 0)
        if(y) {
            pos.y = y
        }
        pos = this.GameClock.parent.convertToNodeSpaceAR(pos)
        this.GameClock.x = (pos.x)
        if(y) {
            this.GameClock.y = (pos.y)
        }
    }
    
	initHeadIcon(clearFlag = false) {
		if(clearFlag){
			this.sptAvatar.getComponent(cc.Sprite).spriteFrame = DataManager.Instance.getSpriteFrame("GameDDZ_2", "pic_touxiang")
			return
		}
        
		if (GameLogic.Instance().isMatchTable() && !this.isMe()) {
			return
		}

        let url = DataManager.getURL("USERBATCH")		
		
		
		let setSprite = (spriteFrame) => {
			if (this.sptAvatar == null || !this.sptAvatar.isValid) {
				return
			}
			this.sptAvatar.getComponent(cc.Sprite).spriteFrame = spriteFrame
			this.sptAvatar.scale = Math.min(this.maskAvatar.width / this.sptAvatar.width, this.maskAvatar.height / this.sptAvatar.height)
		}

		// cc.log("initHeadIcon1", this.userData)
		if (!!this.userData.headimage && this.userData.headimage != "" && this.userData.headimage.lastIndexOf("http", 0) === 0) {
			getHttpSpriteFrame(this.userData.headimage, setSprite)			
		}else{
			BaseFunc.HTTPGetRequest(url, {
				uids: this.userData.plyGuid
			}, (event) => {
				if (event && event.list && event.list.length > 0) {
					this.userData.headimage = event.list[0].face
					// cc.log("initHeadIcon2", this.userData)
					getHttpSpriteFrame(event.list[0].face, setSprite)
				}
			})
		}
	}

	playAni(cardType: CCardsType) {
		if (cardType.mNTypeBomb > 0) {
			if (cardType.mNTypeValue == 16) {
				this.playAniAction(EANI.ANI_HUOJIAN) //火箭
			} else {
				this.playAniAction(EANI.ANI_ZHADAN) //炸弹
			}
		} else if (this.gameRule.checkShunZi(cardType.mNTypeNum)) {
			if (cardType.mNTypeNum == 12) {				
				this.playAniAction(EANI.ANI_SHUNZI2) //顺子
			}else {
				this.playAniAction(EANI.ANI_SHUNZI) //顺子
			}
		} else if (this.gameRule.checkLianDui(cardType.mNTypeNum)) {
			this.playAniAction(EANI.ANI_LIANDUI) //连队
		} else if (this.gameRule.checkFeiJi(cardType.mNTypeNum)) {
			this.playAniAction(EANI.ANI_FEIJI) //飞机
		}
		if (this.handCardsVec.length == 0) {
			this.playRoleAction("shengli")
		} else if (cardType.mNTypeBomb > 0) {
			this.playRoleAction("zhadan")
		} else if (cardType.mNTypeNum > 0) {
			this.playRoleAction("chupai")
		} else {
			this.playRoleAction("daiji", true)
		}
	}

	playAniAction(id: EANI) {
		if (id == EANI.ANI_HUOJIAN) {
			GameLogic.Instance().gamescene.play_game_spine_ani("huojian", this.chairid)
			GameLogic.Instance().playSound("audio_rocket");
		} else if (id == EANI.ANI_ZHADAN) {
			GameLogic.Instance().gamescene.play_game_spine_ani("zhadan", this.chairid, () => {
				GameLogic.Instance().gamescene.play_game_spine_ani("zhadan", -1)
			})
			GameLogic.Instance().playSound("audio_bomb");
		} else if (id == EANI.ANI_SHUNZI) {
			GameLogic.Instance().gamescene.play_game_spine_ani("shunzi", this.chairid)
		} else if (id == EANI.ANI_SHUNZI2) {
			GameLogic.Instance().gamescene.play_game_spine_ani("shunzi2", this.chairid)
		} else if (id == EANI.ANI_LIANDUI) {
			GameLogic.Instance().gamescene.play_game_spine_ani("liandui", this.chairid)
		} else if (id == EANI.ANI_FEIJI) {
			GameLogic.Instance().gamescene.play_game_spine_ani("feiji", this.chairid)
			GameLogic.Instance().playSound("audio_plane");
		}
	}

    //game
	refresh_handCards(vecCards) {
		vecCards.sort(this.sort_cards)
		this.handCardsVec = vecCards

		if (this.isMe()) {
			this.gameRule.setHandCards(vecCards)
			this.handCard.set_card_value(vecCards, !this.dealCardFlag, undefined, this.isShowCard)
			if(this.dealCardFlag) {
				GameLogic.Instance().gamescene.play_game_ani_dealcard()
			}		
			if (this.dealCardFlag) {				
				this.handCard.reset_hand_card_pos({noAni:true})
			}else{
				this.handCard.reset_hand_card_pos({noAni:true, AniType:3})
			}
		} else {
			if (vecCards.length > 0 && vecCards.length < 3) {
				this.showCardAlarm()
			}
            this.showRemainCard(vecCards.length)
		}
		this.dealCardFlag = false

		if (vecCards.length == 0) {
			this.showPutOverAni()
		}
		
		if (GameLogic.Instance().isTwoTable()) {
			GameLogic.Instance().gamescene.initRobInfoLabel()
		}
	}

	refresh_put_cards_area(vecCards) {
		vecCards.sort(this.sort_cards)
		cc.log("refresh_put_cards_area", vecCards)
		this.putCard.set_putcard_value(vecCards, false, this.isLord)
	}

	clear_put_cards_area() {
		this.hideGameTip()
		this.putCard.clearCards()		
	}

	getChooseCards() {
		return this.gameRule.chooseCards
	}	
	
	checkChooseCards(cardType) {
		var vecCards = this.handCard.get_select_cards()

		// 检测牌的完整性
		if (!this.gameRule.checkCardsIntact(vecCards)) {
			cc.log('GamePlayer checkChooseCards 检测牌的完整性 失败')
			return false
		}

		// 检测出牌是否成型
		if (!this.gameRule.checkCardsType(vecCards, cardType.mNTypeNum)) {
			cc.log('GamePlayer checkChooseCards 检测出牌是否成型 失败')
			return false
		}

		// 比较大小
		if (!this.gameRule.compareCardsType(cardType)) {
			cc.log('GamePlayer checkChooseCards 比较大小 失败')
			return false
		}

		// 播放动画
		// this.playAni(this.gameRule.chooseCardType)

		return true
	}

	seleteCards(vecCards) {
		this.handCard.seleteHandCards(vecCards)
	}

	
	playPutCard(message, noAni = false) {
		// 音效
		if (!noAni && message.cType) {
			GameLogic.Instance().playSoundByCardType(message.cType, this.userData.sex)
		}

		if (this.isMe()) {
			GameLogic.Instance().gamescene.hidGameButton()
		}

		this.clock.stopTime()
		this.hideGameTip()

		//提前移除手牌中出掉的牌
		let prevCalcHandCard = 	this.handCardsVec	
		if (prevCalcHandCard && prevCalcHandCard.length > 0) {
			message.vecCards.forEach(putcard => {
				prevCalcHandCard.forEach((handcard, k) => {
					if(putcard == handcard) {
						prevCalcHandCard.splice(k)
					}
				});
			});

			this.refresh_handCards(prevCalcHandCard)
		}

		
		// 出牌
		let ani = true
		if (ani) {
			this.refresh_put_cards_area(message.vecCards)
		}else{
			this.refresh_put_cards_area(message.vecCards)
		}
		
		GameLogic.Instance().gamescene.refreshCardNoteData(message.vecCards, !this.isMe())
		

		// 播放特效动画
		if (!noAni && message.cType) {
			// cc.warn("message.cType", message.cType)
			this.playAni(message.cType)
		}
	}

	showCard() {
		cc.log("showCard")
		if (this.isShowCard) {
			this.handCard.set_card_value([], true, this.isMe())
			this.handCard.reset_hand_card_pos({noAni:true, AniType:3})
		}
		// cc.log("this.handCardsVec", this.handCardsVec)
		if (this.handCardsVec.length > 0) {
			let tempcardcount = this.putCard.max_row_count
			this.putCard.max_row_count = 7
			this.putCard.set_card_value(this.handCardsVec, true)
			this.putCard.reset_put_card_pos({offsetY:0,aligment:"top"})//,noAni:true})
			this.putCard.max_row_count = tempcardcount
		}
	}
    
	sort_cards(a, b) {
		let nTempValue_1 = a.mNValue * 4 + a.mNColor;
		let nTempValue_2 = b.mNValue * 4 + b.mNColor;
		if (nTempValue_1 < nTempValue_2) {
			return 1;
		} else if (nTempValue_1 == nTempValue_2) {
			return 0;
		} else {
			return -1;
		}
    }
    
    hideChuPaiTip() {
        cc.log("TODO hideChuPaiTip")
    }
    
	showTips(nOp?: number, value = 0) {
		var tipfile, soundname
		if (nOp == null) {

		}else if (!nOp) {
			this.hideGameTip()
			return
		} else if (nOp == 1) { //不叫
			tipfile = 'gs_tip_bujiao'
			soundname = 'audio_score0'
		} else if (nOp == 2) { //1分
			tipfile = 'gs_tip_score_1'
			soundname = 'audio_score1'
		} else if (nOp == 3) { //2分
			tipfile = 'gs_tip_score_2'
			soundname = 'audio_score2'
		} else if (nOp == 4) {
			// tipfile = 'gs_tip_jiaodizhu'
			soundname = 'audio_call_lord'
			this.showCallScoreAni(3)
		} else if (nOp == 5) { //不叫
			tipfile = 'gs_tip_bujiao'
			soundname = 'audio_score0'
		} else if (nOp == 6) { //叫地主
			tipfile = 'gs_tip_jiaodizhu'
			soundname = 'audio_call_lord'
		} else if (nOp == 7) { //不抢
			tipfile = 'gs_tip_buqiang'
			soundname = 'audio_no_rob'
		} else if (nOp == 8) { //抢地主
			tipfile = 'gs_tip_qiangdizhu'
			soundname = 'audio_rob'
		} else if (nOp == 9) { //过
			tipfile = 'gs_tip_buchu'
			// soundname = 'audio_pass'
			let type = BaseFunc.Random(1, 4)
			soundname = "audio_pass_type_" + type
		} else if (nOp == 10) { //明牌
			this.setShowCard()
			this.isMe() && this.showSpineAnimation(GameLogic.Instance().gamescene.ani_spine_mingpai)
			soundname = 'audio_show'
		} else if (nOp == 12) { //准备
			tipfile = 'gs_tip_ready'
		} else if (nOp == 20) { //加倍 不加倍 超级加倍
			if (value == 1) {
				tipfile = 'gs_tip_bujiabei'
			} else if (value == 2) {
				tipfile = 'gs_tip_jiabei'
				soundname = 'audio_jiabei'
			} else {
				tipfile = 'gs_tip_chaojijiabei'
				soundname = 'audio_superdouble'
			}
		} else if (nOp == 21) { //不加倍
			soundname = 'audio_bujiabei'
			tipfile = 'gs_tip_bujiabei'
		} else if (nOp == 22) { //加倍
			soundname = 'audio_jiabei'
			tipfile = 'gs_tip_jiabei'
		} else if (nOp == 27) { //超级加倍
			if (this.isMe()) {
				this.showSpineAnimation(GameLogic.Instance().gamescene.ani_spine_super_jiabei)
			} else {
				tipfile = 'gs_tip_chaojijiabei'
			}
			soundname = 'audio_superdouble'
		}else {
			cc.log('GamePlayer untreated common', nOp)
		}

		if (nOp != 10) {
			this.clock.stopTime()
		}

		if (tipfile) {
			
			this.nodeGameTip.getComponent(cc.Sprite).spriteFrame = DataManager.Instance.getSpriteFrame("GameDDZ_2", tipfile)

			this.nodeGameTip.active = true

			let rate = 1.2;
			if(this.isMe()){
				rate = 1.4
			}
			this.nodeGameTip.setScale(0.1)
			this.nodeGameTip.stopAllActions()
			this.nodeGameTip.runAction(cc.scaleTo(0.3, rate))

			this.tipsTimestamp = new Date().getTime()
		} else {
			this.hideGameTip()
		}

		if (soundname) {
			GameLogic.Instance().playSound(soundname, this.userData.sex)
		}
	}

	hideGameTip() {
		if (this.nodeGameTip.active) {
			const rate = this.isMe() ? 1.4 : 1.2;
			const t = rate * 1000 + this.tipsTimestamp - new Date().getTime()
			if (t > 0) {
				this.nodeGameTip.runAction(cc.sequence(cc.delayTime(t / 1000), cc.callFunc(() => {
					this.nodeGameTip.active = false
				})))
				return
			}
		}
		this.nodeGameTip.active = false
	}

	showSpineAnimation(node: cc.Node, name: string = "animation") {
		node.active = true
		const skeleton = node.getComponent(sp.Skeleton)
		skeleton.setAnimation(0, name, false)
		skeleton.setCompleteListener(() => {
			node.active = false
		})
	}

	destory() {
		this.clock.stopTime()
	}

	countBomb(n?: number) {
		if (n == null || n > this.handCardsVec.length) {
			n = this.handCardsVec.length
		}
		const cardcount = {}
		for (let i = 0; i < n; i++) {
			const card = this.handCardsVec[i]
			if (cardcount[card.mNValue] == null) {
				cardcount[card.mNValue] = 1
			} else {
				cardcount[card.mNValue]++
			}
		}
		let bomb = 0
		for (const key in cardcount) {
			if (cardcount[key] && cardcount[key] >= 4) {
				bomb++
			}
		}
		if (cardcount[16] && cardcount[16] >= 2) {
			bomb++
		}
		cc.log('countBomb', cardcount, bomb)
		return bomb
	}

	/**
	 * 播放人物动画
	 */
	playRoleAction(name: "daiji" | "chupai" | "shengli" | "sikao" | "zhadan", loop = false) {
		cc.log("playRoleAction", this.chairid, name)
		if (!this.spine_role) {
			return
		}
		this.spine_role.stopAllActions()
		const skeleton = this.spine_role.getComponent(sp.Skeleton)
		skeleton.setAnimation(0, name, loop)
		skeleton.setCompleteListener(loop ? null : () => {
			this.playRoleAction("daiji", true)
		})
	}
}
