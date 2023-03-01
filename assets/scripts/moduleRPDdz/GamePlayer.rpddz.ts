import BaseFunc = require("../base/BaseFunc")
import DataManager from "../base/baseData/DataManager";
import GameClock from "./GameClock.rpddz";
import GameLogic from "./GameLogic.rpddz";
import GamePlayerStateController from "./GamePlayerStateController.rpddz";
import GameRule from "./GameRule.rpddz";
import AudioManager from "./AudioManager.rpddz";
import { CombinedConfig } from "../moduleLobby/combined/CombinedConfig";
import { ITEM } from "../base/baseData/ItemConfig";
import { UserExtends } from "../base/extends/UserExtends";
import { NodeExtends } from "../base/extends/NodeExtends";
import { math } from "../base/utils/math";
import { randomArea } from "../moduleLobby/LobbyFunc";

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

	handCardsVec:ICard[] = []
	
    @property()
	isAuto:boolean = false
	isLord:boolean = false
	bSendNoCard:boolean = false
	dealCardFlag:boolean = true
	userData: { headimage?: string, money?: number, plyGuid?: number, sex?: number, nickname?: string, chairId?: number } = {}

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
	node_spine_role: cc.Node;
	spine_nan: cc.Node;
	spine_nv: cc.Node;
	spine_head: cc.Node;
	node_spine_head: cc.Node;
	doStateChangeStay: Function;
	nodeBet: cc.Node;
	bet_label: cc.Node;
	nodeAuto: cc.Node;
	sptAuto: cc.Node;
	isFakeMoney: boolean;
	nHBNum: number = 0;
	
	

    onLoad() {
		cc.log("GamePlayer onload");
		if (GameLogic.Instance().isBaiYuanMode()) {
			this.$("nodeHB").active = true
			this.$("nodeRedPacket").active = false
			this.$("nodeMoney").active = false
		}
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
			if (GameLogic.Instance().isBaiYuanMode()) {
				AudioManager.playButtonSound()
				GameLogic.Instance().showGameSoundPanel({
					avatarFrame: this.$("sptAvatar", cc.Sprite).spriteFrame,
					repacketValue: this.$("labelRedPacket", cc.Label).string,
					nickname: this.getPlyData().nickname,
					moneyValue: this.$("labelMoney", cc.Label).string,
					hbValue: this.$("label_hb", cc.Label).string,
					location: this.$("label_location", cc.Label).string,
				})
			}
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
		
		AudioManager.playButtonSound()
        let initParam = {
			avatarFrame: this.sptAvatar.getComponent(cc.Sprite).spriteFrame,
			repacketValue: this.labelRedPacket.getComponent(cc.Label).string,
			nickname: this.getPlyData().nickname,
			moneyValue: this.labelMoney.getComponent(cc.Label).string,
			hbValue: this.$("label_hb", cc.Label).string,
			location: this.$("label_location", cc.Label).string,
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
        
        this.labelRedPacket.getComponent(cc.Label).string = 0
		this.labelMoney.getComponent(cc.Label).string = 0

		// 合成游戏头衔
		cc.find("nodeInfo/nodeTitle/title", this.node).getComponent(cc.Sprite).spriteFrame = null
		cc.find("nodeInfo/nodeTitle/honourBg", this.node).getComponent(cc.Sprite).spriteFrame = null
		
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
			for (const node of [this.node_spine_role, this.node_spine_head]) {
				for (const child of node.children) {
					child.scale *= 4 / 3
				}
			}
		} else if (this.chairid == 1) {
			this.nodeRole.scaleX = 1
		}
        
        this.GameClock.setPosition(this["nodeCallScorePos" + this.chairid].getPosition());
		
		this.nodeAniAlarm.setPosition(this["nodeAlarmPos" + this.chairid].getPosition());
		this.nodeAniAlarm.active = false
		
		this.nodeRemainCard.setPosition(this["nodeRemainCardPos" + this.chairid].getPosition());

		this.nodePutOverAni.setPosition(this["nodePutOverPos" + this.chairid].getPosition());
		this.nodeBet.setPosition(this["nodeBetPos" + this.chairid].getPosition());
		this.nodeAuto.setPosition(this["nodeTuoGuanPos" + this.chairid].getPosition());
		this.sptPutOver.active = false

		this.$("nodeHBChange").setPosition(this.$("nodeHBChangePos" + this.chairid).getPosition())
		this.$("nodeHBChange").anchorX = this.chairid == 1 ? 1 : 0
		this.$("nodeHeadInfo").setPosition(this.$("nodeHeadInfoPos" + this.chairid).getPosition())
		this.$("nodeZanMan").setPosition(this.$("nodeZanManPos" + this.chairid).getPosition())
	}

	setUserData(data) {
		this.userData = data
		const isnan = this.userData.sex == 0
		this.spine_nan.active = isnan
		this.spine_nv.active = !isnan
		this.spine_head = isnan ? this.spine_nan : this.spine_nv
		this.playHeadSpineAnimation("daiji1")
		this.playHeadSpineAnimation("ythn", true, 30)
		if (GameLogic.Instance().isBaiYuanMode()) {
			if (this.chairid != 0) {
				this.setLocation(randomArea(this.userData.plyGuid) + "市")
				this.refreshTiXian()
			}
		}
        
		this.show()

		this.setItemView(0, this.userData.money)

        // this.setRedPacketNum(this.userData.money)
        
        this.initHeadIcon()
		
		if(this.userData.plyGuid > 0) {
			// 未能正常结束游戏
			if (this.state == "startGame") {
				this.doStateChangeEndGame()
			}
			this.doStateChangeStay()    
		}
		if (this.isMe()) {
			// cc.error("ERROR:\t", (new Date()).toLocaleString(), this.userData)
		}

		// 合成游戏头衔
		if (DataManager.Instance.onlineParam.combinedTitle != 0) {
			CombinedConfig.getTitle(data.plyGuid, (msg) => {
				if (!this || !this.node || !this.node.isValid) {
					return
				}
				if (msg == null || msg.titles == null) {
                    return
                }
				let lv = msg.titles[data.plyGuid]
				lv = Math.min(Math.max(!!lv ? lv : 1, 0), 30)
				NodeExtends.setNodeSprite({ node: cc.find("nodeInfo/nodeTitle/title", this.node), url: CombinedConfig.getTitleByLevel(lv) })
				let honourBg = "honour_bg" + Math.ceil(lv / 5)
				NodeExtends.setNodeSprite({ node: cc.find("nodeInfo/nodeTitle/honourBg", this.node), url: "moduleLobby/texture/combined/" + honourBg })

				if (("" + data.plyGuid) !== DataManager.UserData.guid) {
					cc.find("nodeInfo/nodeTitle", this.node).scale = .8
					cc.find("nodeInfo/nodeTitle", this.node).position = cc.v2(0, -10)
				}
			})
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
			this.clock.startTime(time)
			if (this.spine_role) {
				this.playRoleSpineAnimation("sikao", true, 5)
			} else {
				this.playHeadSpineAnimation("ythn", true, 10)
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
		this.setBet(0)
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
		this.nodeBet.active = false
		this.showAuto(false)

		this.labelMoney.getComponent(cc.Label).string = 0
		this.labelRedPacket.getComponent(cc.Label).string = 0

		// 合成游戏头衔
		cc.find("nodeInfo/nodeTitle/title", this.node).getComponent(cc.Sprite).spriteFrame = null
		cc.find("nodeInfo/nodeTitle/honourBg", this.node).getComponent(cc.Sprite).spriteFrame = null		
        
		this.initHeadIcon(true)
		
		this.nHBNum = 0
		this.node.active = false
		this.$("nodeLocation").active = false
		this.$("nodeTiXian").active = false
		this.$("nodeZanMan").active = false
	}
	
    clearPlayer() {
		
		if (this.userData.plyGuid > 0) {			
			GameLogic.Instance().removePlayerData(this.userData.plyGuid)
		}
		
		// this.clearGameData()

		// if (!this.isMe()) {
		// 	this.removePlayer()
		// }
	}
	
	clearGameData() {
		this.dealCardFlag = true
		this.isShowCard = false

		// this.hideRole()

        this.hideRemainCard()
        
        this.showTips()

		this.clearHandcard()
		
		this.setStopRefreshRedPacket(false)

		if (GameLogic.Instance().isPrivateRoom()) {
			return
		}

		// if (!this.isMe()) {
		// 	this.removePlayer()
		// }
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

	showAuto(auto) {
		this.sptAuto.stopAllActions()
		this.nodeAuto.active = auto
		if (auto) {
			const count = 3
			const diss = this.sptAuto.width / count
			const sprite = this.sptAuto.getComponent(cc.Sprite)
			sprite.fillRange = 1 / count
			const setFrame = function (index: number) {
				sprite.fillStart = index / 3
				this.sptAuto.x = ((count - 1) / 2 - index) * diss
			}
			this.sptAuto.runAction(cc.repeatForever(cc.sequence([
				cc.callFunc(setFrame.bind(this, 0)),
				cc.delayTime(0.5),
				cc.callFunc(setFrame.bind(this, 1)),
				cc.delayTime(0.15),
				cc.callFunc(setFrame.bind(this, 2)),
				cc.delayTime(0.15),
			])))
		}
	}

	hideRole() {
		this.node_spine_head.active = true
		this.node_spine_role.active = false
		this.isLord = false
		this.isFakeMoney = false
		this.$("nodeHBChange").stopAllActions()
		this.$("nodeHBChange").opacity = 0
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

	showRole(isLord: boolean, vecCards: ICard[]) {
		this.isLord = isLord
		this.spine_dizhu.active = isLord
		this.isFakeMoney = false
		this.spine_nongmin.active = !isLord
		this.spine_role = isLord ? this.spine_dizhu : this.spine_nongmin
		this.playRoleSpineAnimation("daiji", true)

		this.node_spine_role.active = true
		this.node_spine_head.active = false

		this.node_spine_role.opacity = 0
		this.node_spine_role.setScale(1.5)
		this.node_spine_role.stopAllActions()
		this.node_spine_role.runAction(cc.sequence([
			cc.spawn([
				cc.fadeIn(0.3),
				cc.scaleTo(0.6, 1)
			]),
			cc.callFunc(() => {
				this.showRoleAni()
			})
		]))

		// 地主牌插入到手牌动画 20200908 顾俊需求
		if (isLord && this.isMe() && !GameLogic.Instance().gamescene.isReconnecte) {
			const handLordCardUp = DataManager.Instance.getOnlineParamSwitch("handLordCardUp", 1)
			if (handLordCardUp) {
				const handLordCardUpTime = DataManager.Instance.onlineParam.handLordCardUpTime || 1
				this.seleteCards(vecCards)
				this.handCard.node.runAction(cc.sequence(cc.delayTime(handLordCardUpTime), cc.callFunc(this.seleteCards.bind(this, []))))
			}
		}
	}

	showCardAlarm() {
		if (this.nodeAniAlarm.playInThisRound) {
			return
		}
		this.nodeAniAlarm.playInThisRound = true
		
		this.nodeAniAlarm.active = true
		AudioManager.playSound("audio_alarm");

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
			if (this.handCardsVec.length > 0 && this.handCardsVec[0].mNValue > 0) {
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

	setFakeMoney(fake: boolean) {
		this.isFakeMoney = fake
	}
	
	setItemView(index_, value_) {
		if (this.isFakeMoney) {
			return
		}
		if (this.isMe()) {
			GameLogic.Instance().userProperties[index_] = value_
		}
		if(index_ == ITEM.GOLD_COIN) {
			this.setMoneyNum(value_)
		}else if(index_ == ITEM.REDPACKET_TICKET) {
			this.setRedPacketNum(value_)
		}else if(index_ == ITEM.TO_CASH) {
			this.setHBNum(value_)
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
			DataManager.UserData.setItemNum(ITEM.REDPACKET_TICKET, num)
		}
		if (this.stopRefreshRedPacket) {
			return
		}
        this.labelRedPacket.getComponent(cc.Label).string = math.toShort(num)
	}
	
    refreshRedPacketNum(num = 0) {

	}


    setMoneyNum(num = 0) {
		if (this.isMe()) {
			DataManager.UserData.money = num
		}
        this.labelMoney.getComponent(cc.Label).string = math.toShort(num)
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
			NodeExtends.setNodeSprite({ node: this.sptAvatar, url: "moduleRPDdzRes/images/GamePlayer/pic_touxiang" })
			return
		}
        
		if (GameLogic.Instance().isMatchTable() && !this.isMe()) {
			return
		}

		if (!!this.userData.headimage && this.userData.headimage != "" && this.userData.headimage.lastIndexOf("http", 0) === 0) {
			NodeExtends.setNodeSpriteNet({ node: this.sptAvatar, url: this.userData.headimage, fixSize: true })
		}else{
			UserExtends.getUserInfos([this.userData.plyGuid], infos => {
				if (this.node && this.node.isValid && this.userData && infos.length > 0) {
					this.userData.headimage = infos[0].face
					NodeExtends.setNodeSpriteNet({ node: this.sptAvatar, url: this.userData.headimage, fixSize: true })
				}
			})
		}
	}

	playAni(cardType: ICardsType) {
		if (cardType.mNTypeBomb > 0) {
			if (cardType.mNTypeValue == 16) {
				this.playAniAction(EANI.ANI_HUOJIAN) //火箭
			} else {
				this.playAniAction(EANI.ANI_ZHADAN) //炸弹
			}
		} else if (GameRule.checkShunZi(cardType.mNTypeNum)) {
			if (cardType.mNTypeNum == 12) {				
				this.playAniAction(EANI.ANI_SHUNZI2) //顺子
			}else {
				this.playAniAction(EANI.ANI_SHUNZI) //顺子
			}
		} else if (GameRule.checkLianDui(cardType.mNTypeNum)) {
			this.playAniAction(EANI.ANI_LIANDUI) //连队
		} else if (GameRule.checkFeiJi(cardType.mNTypeNum)) {
			this.playAniAction(EANI.ANI_FEIJI) //飞机
		}
		if (!this.spine_role) {
			return
		}
		if (this.handCardsVec.length == 0) {
			this.playRoleSpineAnimation("shengli")
		} else if (cardType.mNTypeBomb > 0) {
			this.playRoleSpineAnimation("zhadan")
		} else if (cardType.mNTypeNum > 0) {
			this.playRoleSpineAnimation("chupai")
		} else {
			this.playRoleSpineAnimation("daiji", true)
		}
	}

	playAniAction(id: EANI) {
		if (GameLogic.Instance().gamescene == null) {
			return
		}
		if (id == EANI.ANI_HUOJIAN) {
			GameLogic.Instance().gamescene.play_game_spine_ani("huojian", this.chairid)
			AudioManager.playSound("audio_rocket");
		} else if (id == EANI.ANI_ZHADAN) {
			GameLogic.Instance().gamescene.play_game_spine_ani("zhadan", this.chairid, () => {
				if (GameLogic.Instance().gamescene == null || !GameLogic.Instance().gamescene.isValid) {
					return
				}
				GameLogic.Instance().gamescene.play_game_spine_ani("zhadan", -1)
			})
			AudioManager.playSound("audio_bomb");
		} else if (id == EANI.ANI_SHUNZI) {
			GameLogic.Instance().gamescene.play_game_spine_ani("shunzi", this.chairid)
		} else if (id == EANI.ANI_SHUNZI2) {
			GameLogic.Instance().gamescene.play_game_spine_ani("shunzi2", this.chairid)
		} else if (id == EANI.ANI_LIANDUI) {
			GameLogic.Instance().gamescene.play_game_spine_ani("liandui", this.chairid)
		} else if (id == EANI.ANI_FEIJI) {
			GameLogic.Instance().gamescene.play_game_spine_ani("feiji", this.chairid)
			AudioManager.playSound("audio_plane");
		}
	}

    //game
	refresh_handCards(vecCards) {
		vecCards.sort(this.sort_cards)
		this.handCardsVec = vecCards

		if (this.isMe()) {
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
		return this.handCard.get_select_cards()
	}	
	
	checkChooseCards(vecCards, cardType) {
		if (!GameRule.checkChooseCardsType(vecCards, this.handCardsVec, cardType)) {
			return false
		}

		// 播放动画
		// this.playAni(GameRule.m_chooseCardType)

		return true
	}

	seleteCards(vecCards) {
		this.handCard.seleteHandCards(vecCards)
	}

	
	playPutCard(message, noAni = false) {
		// 音效
		if (!noAni && message.cType) {
			this.playSoundByCardType(message.cType, this.userData.sex)
		}

		if (this.isMe()) {
			GameLogic.Instance().gamescene.hidGameButton()
		}

		this.clock.stopTime()
		this.hideGameTip()

		//提前移除手牌中出掉的牌
		if (this.handCardsVec && this.handCardsVec.length > 0) {
			for (const putcard of message.vecCards) {
				for (let i = this.handCardsVec.length - 1; i >= 0; i--) {
					const handcard = this.handCardsVec[i]
					if (putcard.mNValue == handcard.mNValue && putcard.mNColor == handcard.mNColor) {
						this.handCardsVec.splice(i, 1)
					}
				}
			}
			this.refresh_handCards(this.handCardsVec)
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

	playSoundByCardType(cardtype, sex) {
		if (!cardtype) {
			return
		}
		if (cardtype.mNTypeNum) {
			AudioManager.playSound('audio_putcard')
		}

		if (cardtype.mNTypeNum == 1) {
			AudioManager.playSound('audio_' + cardtype.mNTypeValue, sex)
		} else if (cardtype.mNTypeNum == 2) {
			AudioManager.playSound('audio_2_' + cardtype.mNTypeValue, sex)
		} else if (cardtype.mNTypeNum == 3) {
			AudioManager.playSound('audio_3_0', sex)
			this.scheduleOnce(()=> {
				AudioManager.playSound('audio_' + cardtype.mNTypeValue, sex)
			}, 0.4)
		} else if (cardtype.mNTypeNum == 31) {
			AudioManager.playSound('audio_3_1', sex)
		} else if (cardtype.mNTypeNum == 32) {
			AudioManager.playSound('audio_3_2', sex)
		} else if (cardtype.mNTypeNum == 411 || cardtype.mNTypeNum == 422) {
			AudioManager.playSound('audio_4_2', sex)
		} else if (cardtype.mNTypeNum == 4) {
			AudioManager.playSound('audio_bomb_0', sex)
		} else if (GameRule.checkShunZi(cardtype.mNTypeNum)) {
			AudioManager.playSound('audio_danshun', sex)
		} else if (GameRule.checkLianDui(cardtype.mNTypeNum)) {
			AudioManager.playSound('audio_duiduishun', sex)
		} else if (GameRule.checkFeiJi(cardtype.mNTypeNum)) {
			AudioManager.playSound("audio_feiji", sex)
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
			let type = math.random(1, 4)
			soundname = "audio_pass_type_" + type
		} else if (nOp == 10) { //明牌
			this.setShowCard()
			this.isMe() && this.playFlashSpineAnimation(GameLogic.Instance().gamescene.ani_spine_mingpai)
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
				this.playFlashSpineAnimation(GameLogic.Instance().gamescene.ani_spine_super_jiabei)
			} else {
				tipfile = 'gs_tip_chaojijiabei'
			}
			soundname = 'audio_superdouble'
		} else if (nOp == 28) {
			soundname = 'audio_call_lord'
			tipfile = 'gs_tip_score_4'
		} else {
			cc.log('GamePlayer untreated common', nOp)
		}

		if (nOp != 10) {
			this.clock.stopTime()
		}
		if (nOp && [9, 10].indexOf(nOp) == -1) {
			nOp && this.playHeadSpineAnimation("daiji1")
		}

		if (tipfile) {
			NodeExtends.setNodeSprite({ node: this.nodeGameTip, url: "moduleRPDdzRes/images/GamePlayer/" + tipfile })

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
			AudioManager.playSound(soundname, this.userData.sex)
		}
	}

	hideGameTip(now: boolean = false) {
		if (this.nodeGameTip.active && !now) {
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
	 * 播放 播放完自动消失的动画
	 */
	playFlashSpineAnimation(node: cc.Node, name: string = "animation") {
		node.active = true
		this.playSpineAnimation(node, name, false, () => {
			node.active = false
		})
	}

	/**
	 * 播放人物动画
	 */
	playRoleSpineAnimation(name: "daiji" | "chupai" | "shengli" | "sikao" | "zhadan", loop = false, delayTime?: number) {
		this.spine_role.stopAllActions()

		if (delayTime) {
			this.spine_role.runAction(cc.sequence([
				cc.delayTime(delayTime),
				cc.callFunc(() => {
					this.playRoleSpineAnimation(name, loop)
				})
			]))
			return
		}

		this.playSpineAnimation(this.spine_role, name, loop, () => {
			this.playSpineAnimation(this.spine_role, "daiji", true)
		})
	}

	/**
	 * 播放人物动画
	 */
	playHeadSpineAnimation(name: "daiji" | "daiji1" | "ythn", loop = false, delayTime: number = 0, stop: boolean = true) {
		if (stop) {
			this.spine_head.stopAllActions()
		}

		if (delayTime) {
			this.spine_head.runAction(cc.sequence([
				cc.delayTime(delayTime),
				cc.callFunc(() => {
					this.playHeadSpineAnimation(name, loop)
				})
			]))
			return
		}

		this.playSpineAnimation(this.spine_head, name, loop, () => {
			name = name == "daiji" ? "daiji1" : (Math.random() < 0.5 ? "daiji" : "daiji1")
			this.playHeadSpineAnimation(name, loop, 0, false)
		})
	}

	/**
	 * 播放动画
	 */
	playSpineAnimation(node: cc.Node, name: string, loop: boolean, callback?: Function) {
		const skeleton = node.getComponent(sp.Skeleton)
		skeleton.setAnimation(0, name, loop)
		skeleton.setCompleteListener(() => {
			if (!loop) {
				skeleton.setCompleteListener(null)
				callback && callback()
			}
		})
	}

	setBet(beishu: number) {
		this.nodeBet.active = beishu > 1
		if (beishu > 1) {
			// this.bet_label.getComponent(cc.Label).string = beishu == 4 ? "超级加倍" : "加倍"
			cc.find("nodeInfo/nodeBet/betx2", this.node).active = beishu !== 4 
			cc.find("nodeInfo/nodeBet/betx4", this.node).active = beishu === 4
		}
	}

	setHBNum(num: number) {
		const n = DataManager.Instance.onlineParam.GmmePlayer_tixian_num || 20000
		if (this.nHBNum > 0 && this.nHBNum < n && num >= n) {
			this.$("nodeZanMan").active = true
			const skeleton = this.$("nodeZanMan", sp.Skeleton)
			skeleton.setAnimation(0, 'kaishi', false)
			skeleton.setCompleteListener(() => {
				let count = 0
				skeleton.setAnimation(0, 'xunhuan', true)
				skeleton.setCompleteListener(() => {
					count++
					if (count == 2) {
						skeleton.setCompleteListener(null)
						this.$("nodeZanMan").active = false
					}
				})
			})
		}
		this.nHBNum = num
		this.$("label_hb", cc.Label).string = GameLogic.Instance().turnBaiYuan(num).toFixed(2)
	}

	setHBChange(num: number) {
		const value = GameLogic.Instance().turnBaiYuan(num).toFixed(2)
		this.$("labelHBChangeWIn", cc.Label).string = "+" + value
		this.$("labelHBChangeLose", cc.Label).string = "" + value

		this.$("labelHBChangeWIn").active = num > 0
		this.$("labelHBChangeLose").active = num < 0

		this.$("nodeHBChange").stopAllActions()
		this.$("nodeHBChange").opacity = 0
		this.$("nodeHBChange").runAction(cc.sequence([
			cc.fadeIn(0.5),
			cc.fadeIn(2),
			cc.fadeOut(0.5)
		]))
	}

	setLocation(str: string) {
		this.$("nodeLocation").active = true
		this.$("label_location", cc.Label).string = str
	}

	setTiXian(str: string) {
		this.$("nodeTiXian").active = true
		this.$("label_tixain", cc.Label).string = str
	}

	refreshTiXian() {
		const configs = DataManager.Instance.onlineParam.GmmePlayer_tixian_config || [
			{ weight: 15, value: 0 },
			{ weight: 5, value: 200 },
			{ weight: 1, value: 400 },
			{ weight: 1, value: 600 },
			{ weight: 1, value: 800 },
		]
		let sum = 0
		configs.forEach(cfg => sum += cfg.weight)
		let rand = this.userData.plyGuid % sum
		for (let i = 0; i < configs.length; i++) {
			rand -= configs[i].weight
			if (rand < 0) {
				if (configs[i].value > 0) {
					this.setTiXian("已提" + configs[i].value)
				}
				return
			}
		}
	}

	onCloseScene() {
		this.$("spine_nan", sp.Skeleton).setCompleteListener(null)
		this.$("spine_nv", sp.Skeleton).setCompleteListener(null)
		this.$("spine_dizhu", sp.Skeleton).setCompleteListener(null)
		this.$("spine_nongmin", sp.Skeleton).setCompleteListener(null)
		this.$("nodeZanMan", sp.Skeleton).setCompleteListener(null)
	}
}
