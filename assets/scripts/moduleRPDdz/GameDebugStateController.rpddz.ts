var StateMachine = require("../base/extensions/StateMachine/state-machine.min");

import BaseComponent from "../base/BaseComponent"

const {ccclass, property} = cc._decorator;

@ccclass
export default class GameDebugStateController extends BaseComponent {

    __preloadAfter() {
        
        cc.debug.setDisplayStats(false);

        this._fsm(); //  <-- IMPORTANT
    }
    
    stepState() {
        // cc.log("stepState:" + this.state);
        switch(this.state) {
            case 'none':
                this.doStateChangeInit();
                break;
            case 'init':
            case 'reInit':
                this.doStateChangeReady();
                break;
            case 'ready':
                this.doStateChangeStartGame();
                break;
            case 'startGame':
                this.doStateChangeDeal();
                break;
            case 'deal':
                this.doStateChangeSelectLord();
                break;
            case 'selectLord':
                this.doStateChangeDealLordCard();
                break;
            case 'dealLordCard':
                this.doStateChangeGamePlaying();
                break;
            case 'gamePlaying':
                this.doStateChangeEndGame();
                break;
            case 'endGame':
                this.doStateChangeSettleForRound();
                break;
            case 'settleForRound':
                this.doStateChangeReInit();
                break;
        }
    }

    isGameStart() {
        switch(this.state) {
            case 'startGame':
            case 'deal':
            case 'selectLord':
            case 'dealLordCard':
            case 'gamePlaying':
                return true;
                break;
        }
        return false;
    }

}

StateMachine.factory(GameDebugStateController, {
    transitions: [
        { name: 'doStateChangeInit',            from: 'none',               to: 'init' },
        { name: 'doStateChangeReady',           from: ['init', 'reInit'],   to: 'ready' },
        { name: 'doStateChangeStartGame',       from: 'ready',              to: 'startGame' },
        { name: 'doStateChangeDeal',            from: 'startGame',          to: 'deal' },
        { name: 'doStateChangeSelectLord',      from: 'deal',               to: 'selectLord' },
        { name: 'doStateChangeDealLordCard',    from: 'selectLord',         to: 'dealLordCard' },
        { name: 'doStateChangeGamePlaying',     from: 'dealLordCard',       to: 'gamePlaying' },
        { name: 'doStateChangeEndGame',         from: 'gamePlaying',        to: 'endGame' },
        { name: 'doStateChangeSettleForRound',  from: 'endGame',            to: 'settleForRound' },
        { name: 'doStateChangeReInit',          from: 'settleForRound',     to: 'reInit' },
        // { name: 'doAbnormalEndGame',from: '*',              to: 'abnormalEndGame' },
    ],
    methods: {
      onInvalidTransition: function(transition, from, to) {
        throw new Error("transition not allowed from [" + from + "] to [" + to + "]");
      }
    },
    stateName: [
        {enName: 'init',            zhName: '初始化'},
        {enName: 'ready',           zhName: '准备'},
        {enName: 'startGame',       zhName: '开局'},
        {enName: 'selectLord',      zhName: '叫地主'},
        {enName: 'dealLordCard',    zhName: '发地主牌'},
        {enName: 'deal',            zhName: '发牌'},
        {enName: 'gamePlaying',     zhName: '游戏中'},
        {enName: 'endGame',         zhName: '游戏结束'},
        {enName: 'settleForRound',  zhName: '当局结算'},
        {enName: 'settleForRoom',   zhName: '总结算'},
    ]
    
})