import BaseFunc = require("../base/BaseFunc")
import GameDebugStateController from "./GameDebugStateController.rpddz"
import BaseComponent from "../base/BaseComponent"
import {CCard} from "./CCard.rpddz"
import GameLogic from "./GameLogic.rpddz"
import GameScene from "./GameScene.rpddz"
import { unenoughGold } from "../base/BaseFuncTs";

const {ccclass, property} = cc._decorator;

// let GameLogic.Instance() = GameLogic.Instance()

@ccclass
export class GameDebugLayer extends GameDebugStateController {

    // LIFE-CYCLE CALLBACKS:
    @property()
    MAX_PLAYER_NUM:number = 3

    @property(GameScene)
    view:GameScene = null
    vecCards = []

    onLoad () {
        cc.log("onload gamedebug")
    }

    start () {
            
    }

    setView(view) {
        this.view = view
    }

    // CALLBACKS After __preload
    __bindButtonHandler() {
        cc.log("gamedebug __bindButtonHandler")
        BaseFunc.AddClickEvent(this.btnDebugLeft, this.node, "GameDebugLayer.rpddz", "onPressDebugLeft");
        BaseFunc.AddClickEvent(this.btnDebugRight, this.node, "GameDebugLayer.rpddz", "onPressDebugRight");        
    }

    onEnterState() {
        GameLogic.Instance().dizhu++;
        this.view.showGameTipSimple(this.state)
    }

    onEnterInit() {

        for (let i = 0; i < this.MAX_PLAYER_NUM; i++) {
            let userData = {
                plyGuid : 5412134300543786 + i,
                nickname : "nickname-" + i,
                money : 21000 + i,
                sex : i % 2,
                headimage : "http://thirdwx.qlogo.cn/mmopen/vi_32/rOb0SAYlJGPD7tu8SDE8HcQfXp57Oob2LDZsLHROhoKzOvtxPIhCooQnlzsYvSUkBfwYYL7ADxAwic9hkYGOqeQ/96",
                chairId : i
            }
            this.view.players[i].setUserData(userData)
        }
        this.view.players[0].userData.chairId = 0

        // for (let i = 1; i < this.MAX_PLAYER_NUM; i++) {
        //     this.view.players[i].doStateChangeStay()            
        // }
    }

    onEnterReady() {
        this.view.doStateChangeReady()
        for (var player of this.view.players) {
			player.doStateChangeReady()            
        }
    }

    onEnterStartGame() {
        this.view.doStateChangeStartGame()
        for (var player of this.view.players) {
			player.doStateChangeStartGame()            
        }
    }

    onEnterDeal() {
        this.view.doStateChangeDeal()
        
        let vecCards = [
            new CCard(1, 16),
            new CCard(0, 16),
            new CCard(1, 13),
            new CCard(1, 1),
            new CCard(1, 2),
            new CCard(1, 3),
            new CCard(1, 4),
            new CCard(1, 5),
            new CCard(1, 6),
            new CCard(1, 7),
            new CCard(1, 8),
            new CCard(1, 9),
            new CCard(1, 10),
            new CCard(1, 11),
            new CCard(1, 12),
            new CCard(1, 13),
            new CCard(1, 14),
        ]
        
        this.view.players[0].refresh_handCards(vecCards)
        this.view.players[1].refresh_handCards(vecCards)
        this.view.players[2].refresh_handCards(vecCards)
    }

    onEnterSelectLord() {
        this.view.doStateChangeSelectLord()
    }

    onEnterDealLordCard() {
        this.view.doStateChangeDealLordCard()

        this.testShowLordCard()
        
    }

    onEnterGamePlaying() {
        this.view.doStateChangeGamePlaying()

        this.view.onClockTime(0, 10)
        this.view.onClockTime(1, 11)
        this.view.onClockTime(2, 12)

        this.view.showPutButton()
    }

    onEnterEndGame() {
        this.view.doStateChangeEndGame()
        for (var player of this.view.players) {
			player.doStateChangeEndGame()            
        }

    }

    onEnterSettleForRound() {
        this.view.doStateChangeSettleForRound()
    }

    onEnterReInit() {
        this.view.doStateChangeReInit()

		for (var player of this.view.players) {
			player.doStateChangeStay()
		}
    }

    testDealCard() {
        // this.view.play_game_ani_dealcard()
        this.view.proto_gc_refresh_card_not_handler({packet:{
            cChairID:0
            vecCards: [
                new CCard(1, 1),
                new CCard(1, 2),
                new CCard(1, 3),
                new CCard(1, 4),
                new CCard(1, 5),
                new CCard(1, 6),
                new CCard(1, 7),
                new CCard(1, 8),
                new CCard(1, 9),
                new CCard(1, 10),
                new CCard(1, 11),
                new CCard(1, 12),
                new CCard(1, 13),
                new CCard(1, 14),
                new CCard(1, 15),
                new CCard(1, 16),
                new CCard(2, 16),
            ]
        }})
    }

    onPressDebugLeft() {
        if(this.aniid != null) {
            ++this.aniid
        }else{
            this.aniid = 0
        }

        if(this.chairid != null) {
            if (this.aniid%6 == 0) {
                
                ++this.chairid
            }
        }else{
            this.chairid = 0
        }
        cc.log("this.aniid", this.aniid)
        
        
        // this.testGameResultLayer()

        // this.testDealCard()
        
		for (var player of this.view.players) {
            // player.showRole(0)
            // player.showCallScoreAni()
            // player.playAniAction(this.aniid%6)
        }

        this.view.showPutOverAni(this.aniid%3)

        // this.view.players[this.chairid%3].playAniAction(this.aniid%6)
        
        // this.view.showChuPaiTip(this.aniid%2 + 1)
        // this.testSopCoinAni()

        // this.testshowTips(this.aniid)
        
        // for (var player of this.view.players) {
        //     if (this.aniid % 2 == 1) {                
        //         player.doStateChangeLeave()            
        //     }else{
        //         player.doStateChangeStay()            
        //     }
        // }
        // if (this.aniid %2 == 1) {
            
        //     GameLogic.Instance().gamescene.play_game_ani("huojian")
        // }else {
        //     this.view.players[1].play_game_ani_zhadan()

        // }

        // this.testGamePlayerPutCard(this.aniid)
        // GameLogic.Instance().showGameRedPacketAwardLayer()
    }

    onPressDebugRight() {         
        // this.stepState()
        
        let actions = []
        actions[actions.length] = cc.delayTime(0.1)
        actions[actions.length] = cc.callFunc(() => {
            unenoughGold(0, 6000)
            GameLogic.Instance().showGameRedPacketAwardLayer()
        })
        this.node.stopAllActions()
        this.node.runAction(cc.sequence(actions))
    }

    testshowTips(id) {
        
		for (var player of this.view.players) {
            player.showTips(id%13)
        }
    }

    testShowLordCard() {

        let vecCards = [
            new CCard(1, 1),
            new CCard(1, 2),
            new CCard(1, 16),
        ]
        this.view.showLordCard(vecCards)
    }

    testSopCoinAni() {
        let initParam = {
            pos_start : this.view.players[1]["nodeAvatar"].parent.convertToWorldSpaceAR(this.view.players[1]["nodeAvatar"].getPosition()),
            pos_end : this.view.players[0]["nodeAvatar"].parent.convertToWorldSpaceAR(this.view.players[0]["nodeAvatar"].getPosition()),
        }
        
        this.view.sop_coin_drop(initParam)
        
        initParam = {
            pos_start : this.view.players[2]["nodeAvatar"].parent.convertToWorldSpaceAR(this.view.players[2]["nodeAvatar"].getPosition()),
            pos_end : this.view.players[0]["nodeAvatar"].parent.convertToWorldSpaceAR(this.view.players[0]["nodeAvatar"].getPosition()),
        }
        
        this.view.sop_coin_drop(initParam)
    }

    testGamePlayerHandCard() {
        let vecCards = [
            new CCard(1, 1),
            new CCard(1, 2),
            new CCard(1, 3),
            new CCard(1, 4),
            new CCard(1, 5),
            new CCard(1, 6),
            new CCard(1, 7),
            new CCard(1, 8),
            new CCard(1, 9),
            new CCard(1, 10),
            new CCard(1, 11),
            new CCard(1, 12),
            new CCard(1, 13),
            new CCard(1, 14),
            new CCard(1, 15),
            new CCard(1, 16),
        ]

        this.view.players[0].gameRule.setHandCards(vecCards)
    }

    testGameRule() {
        let vecCards = [
            new CCard(1, 1),
            new CCard(1, 2),
            new CCard(1, 3),
            new CCard(1, 4),
            new CCard(1, 5),
            new CCard(1, 6),
            new CCard(1, 7),
            new CCard(1, 8),
            new CCard(1, 9),
            new CCard(1, 10),
            new CCard(1, 11),
            new CCard(1, 12),
            new CCard(1, 13),
            new CCard(1, 14),
            new CCard(1, 15),
            new CCard(1, 16),
        ]

        let selectCards1 = [
            new CCard(1, 3),
            new CCard(1, 4),
            new CCard(1, 5),
            new CCard(1, 6),
            new CCard(1, 7),
        ]
        
        let selectCards2 = [
            new CCard(1, 3),
            new CCard(1, 4),
            new CCard(1, 5),
            new CCard(1, 6),
            new CCard(1, 8),
        ]
        
        this.view.players[0].gameRule.setHandCards(vecCards)

        cc.log(true == this.view.players[0].gameRule.checkCardsIntact(vecCards))
        cc.log(true == this.view.players[0].gameRule.checkCardsType(selectCards1))
        cc.log(false == this.view.players[0].gameRule.checkCardsType(selectCards2)) 
        
    }

    testGamePlayerShowAni(id) {
        this.view.players[id%3].playAniAction(id%5)        
    }

    testGamePlayerShowRole(id) {
		for (var player of this.view.players) {
            player.showRole(id%2)
        }
    }

    testGamePlayerPutCard(id) {    
        this.vecCards.push(new CCard(1, id%16 + 1))
        
        this.vecCards1 = [
            new CCard(1, 1),
            new CCard(1, 2),
            new CCard(1, 3),
            new CCard(1, 4),
            new CCard(1, 5),
            new CCard(1, 6),
            new CCard(1, 7),
            new CCard(1, 8),
            new CCard(1, 9),
            new CCard(1, 10),
            new CCard(1, 11),
            new CCard(1, 12),
            new CCard(1, 13),
            new CCard(1, 14),
            new CCard(1, 15),
            new CCard(1, 16),
            new CCard(2, 16),
        ]
        // this.vecCards = [
        //     new CCard(1, 3),
        //     new CCard(1, 3),
        //     new CCard(1, 3),
        //     new CCard(1, 4),
        // ]

        let message = {
            cType: id%5,
            m_nTypeBomb: 0,
            m_nTypeNum:531,
            vecCards: this.vecCards
        }

        // this.view.players[1].handCardsVec = this.vecCards
        // this.view.players[1].showCard()
        // this.view.players[2].handCardsVec = this.vecCards
        // this.view.players[2].showCard()
        // this.view.players[1].playPutCard(message)
        // this.view.players[2].playPutCard(message)
    }

    testGamePlayerTip(id) {
        switch(id%4) {
            case 0:
                this.view.showCallScore()
                break;
            case 1:
                this.view.showRobLord()
                break;            
            case 2:
                this.view.showAuto()
                break;
            case 3:
                this.view.showJiaBei()
                break;
        }
    }

    testGameResultLayer() {
        
        let gameresultParam = {
            nGameMoney: 10,
            nDouble: 6,
            vecUserResult1: [
                {
                    sex_ : 0,
                    name : "Player",
                    nScore : 60,
                    nJifen : 27299,
                    nChairID : 0,
                    is_lord : 0,
                    headimage : "http://thirdwx.qlogo.cn/mmopen/vi_32/rOb0SAYlJGPD7tu8SDE8HcQfXp57Oob2LDZsLHROhoKzOvtxPIhCooQnlzsYvSUkBfwYYL7ADxAwic9hkYGOqeQ/96"
                },    
                {
                    sex_ : 0,
                    name : "993860100000005",
                    nScore : 60,
                    nJifen : 705,
                    nChairID : 1,
                    is_lord : 0,
                    headimage : "http://thirdwx.qlogo.cn/mmopen/vi_32/rOb0SAYlJGPD7tu8SDE8HcQfXp57Oob2LDZsLHROhoKzOvtxPIhCooQnlzsYvSUkBfwYYL7ADxAwic9hkYGOqeQ/96"
                },
                {
                    sex_ : 0,
                    name : "player2",
                    nScore : -120,
                    nJifen : 30141,
                    nChairID : 2,
                    is_lord : 1,
                    headimage : "http://thirdwx.qlogo.cn/mmopen/vi_32/rOb0SAYlJGPD7tu8SDE8HcQfXp57Oob2LDZsLHROhoKzOvtxPIhCooQnlzsYvSUkBfwYYL7ADxAwic9hkYGOqeQ/96"
                },
            ]
        }

        gameresultParam.vecUserResult1 = [
            {
                sex_ : 0,
                name : "player2",
                nScore : -120,
                nJifen : 30141,
                nChairID : 0,
                is_lord : 1,
                headimage : "http://thirdwx.qlogo.cn/mmopen/vi_32/rOb0SAYlJGPD7tu8SDE8HcQfXp57Oob2LDZsLHROhoKzOvtxPIhCooQnlzsYvSUkBfwYYL7ADxAwic9hkYGOqeQ/96"
            },    
            {
                sex_ : 0,
                name : "Player",
                nScore : 60,
                nJifen : 27299,
                nChairID : 1,
                is_lord : 0,
                headimage : "http://thirdwx.qlogo.cn/mmopen/vi_32/rOb0SAYlJGPD7tu8SDE8HcQfXp57Oob2LDZsLHROhoKzOvtxPIhCooQnlzsYvSUkBfwYYL7ADxAwic9hkYGOqeQ/96"
            },    
            {
                sex_ : 0,
                name : "993860100000005",
                nScore : 60,
                nJifen : 705,
                nChairID : 2,
                is_lord : 0,
                headimage : "http://thirdwx.qlogo.cn/mmopen/vi_32/rOb0SAYlJGPD7tu8SDE8HcQfXp57Oob2LDZsLHROhoKzOvtxPIhCooQnlzsYvSUkBfwYYL7ADxAwic9hkYGOqeQ/96"
            }   
        ]
        
		GameLogic.Instance().showGameResultLayer(gameresultParam)
    }

    // update (dt) {}
}
