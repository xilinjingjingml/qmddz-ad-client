// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
// import StateMachine from "../component/StateMachine/state-machine.min"
var StateMachine = require("../base/extensions/StateMachine/state-machine.min");

import BaseComponent from "../base/BaseComponent"

const {ccclass, property} = cc._decorator;

@ccclass
export default class GameSceneStateController extends BaseComponent {

    __preloadAfter() {
        this._fsm(); //  <-- IMPORTANT
    }
    
    stepState() {
        console.log("stepState:" + this.state);
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

StateMachine.factory(GameSceneStateController, {
    transitions: [
        { name: 'doStateChangeInit',            from: 'none',                           to: 'init' },
        // { name: 'doStateChangeReady',           from: ['init', 'reInit'],   to: 'ready' },
        { name: 'doStateChangeStartGame',       from: ['none', 'init', 'reInit', 'startGame', 'endGame'],  to: 'startGame' }, //断线重连会收到两次complete_data //end->start不知为何服务器会受到两次
        // { name: 'doStateChangeDeal',            from: 'startGame',          to: 'deal' },
        // { name: 'doStateChangeSelectLord',      from: 'startGame',          to: 'selectLord' },
        // { name: 'doStateChangeDealLordCard',    from: 'selectLord',         to: 'dealLordCard' },
        // { name: 'doStateChangeGamePlaying',     from: 'dealLordCard',       to: 'gamePlaying' },
        { name: 'doStateChangeEndGame',         from: 'startGame',                      to: 'endGame' },
        // { name: 'doStateChangeSettleForRound',  from: 'endGame',            to: 'settleForRound' },
        { name: 'doStateChangeReInit',          from: 'endGame',                        to: 'reInit' },
        // { name: 'doAbnormalEndGame',from: '*',              to: 'abnormalEndGame' },
    ],
    methods: {
      onInvalidTransition: function(transition, from, to) {
        throw new Error("transition not allowed do [" + transition + "] + from [" + from + "] to [" + to + "]");
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

