
var StateMachine = require("../base/extensions/StateMachine/state-machine.min");

import BaseComponent from "../base/BaseComponent"

const {ccclass, property} = cc._decorator;

@ccclass
export default class GamePlayerStateController extends BaseComponent {

    __preloadAfter() {
        this._fsm(); //  <-- IMPORTANT
    }
    
    stepState() {
        console.log("stepState:" + this.state);
        switch(this.state) {
            case 'none':
                this.doStateChangeInit();
            case 'init':
                this.doStateChangeReady();
                break;
        }
    }

}

StateMachine.factory(GamePlayerStateController, {
    transitions: [
        { name: 'doStateChangeStay',           from: ['none', 'leave', 'endGame', 'stay', 'ready'],     to: 'stay' },
        { name: 'doStateChangeReady',          from: ['stay', 'ready', 'endGame'],                      to: 'ready' },      //因为目前游戏都是先加入一张假桌子，所以允许ready->ready
        { name: 'doStateChangeStartGame',      from: ['stay', 'ready',],                                to: 'startGame' },
        { name: 'doStateChangeEndGame',        from: ['startGame', 'wait', 'selectSendCard'],           to: 'endGame' },
        { name: 'doStateChangeLeave',          from: ['none', 'stay', 'ready'],                         to: 'leave' },
        // { name: 'doStateChangeDeal',           from: 'startGame',                               to: 'deal' },
        // { name: 'doStateChangeSelectLord',     from: ['deal', 'wait'],                          to: 'selectLord' },
        // { name: 'doStateChangeSelectSendCard', from: ['selectLord', 'wait'],                    to: 'selectSendCard' },
        // { name: 'doStateChangeWait',           from: ['deal', 'selectLord', 'selectSendCard'],  to: 'wait' },
        // { name: 'doStateChangeSettle',         from: 'endGame',                                 to: 'settle' },
        // { name: 'doStateChangeReInit',         from: 'settle',                                  to: 'stay' },
        // { name: 'doStateChangeAutoPlaying',    from: ['selectLord', 'selectSendCard', 'wait'], to: 'autoPlaying' },
        // { name: 'doAbnormalEndGame',from: '*',                                      to: 'abnormalEndGame' },
    ],
    methods: {
      onInvalidTransition: function(transition, from, to) {
        throw new Error("transition not allowed do [" + transition + "] + from [" + from + "] to [" + to + "]");
      }
    },
    stateName: [
        {enName: 'stay',             zhName: '在桌上什么都不干'},
        {enName: 'ready',            zhName: '准备'},
        {enName: 'startGame',        zhName: '开局'},
        {enName: 'endGame',          zhName: '游戏结束'},
        {enName: 'leave',            zhName: '离桌'},
        // {enName: 'deal',             zhName: '发牌'},
        // {enName: 'selectLord',       zhName: '叫地主'},
        // {enName: 'wait',             zhName: '等待'},
        // {enName: 'selectSendCard',   zhName: '选牌'},
        // {enName: 'autoPlaying',      zhName: '托管'},
        // {enName: 'settle',           zhName: '结算'},
    ]
    
})
