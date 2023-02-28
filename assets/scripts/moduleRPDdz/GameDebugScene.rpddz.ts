// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
import BaseFunc = require("../base/BaseFunc")
import BaseComponent from "../base/BaseComponent"
import {CCard} from "./CCard.rpddz"

const {ccclass, property} = cc._decorator;

let textureAsset = [
    "/moduleRPDdzRes/images/GamePlayer/1-0",
    "/moduleRPDdzRes/images/GameScene/1-0",
    "/moduleRPDdzRes/images/PuKe/1-0",
]


@ccclass
export default class GameDebugScene extends BaseComponent {

    // LIFE-CYCLE CALLBACKS:
    @property()
    playerRedPacketNum:number = 0

    onLoad () {

    }

    start () {
        cc.debug.setDisplayStats(false);

        this.nodeNumberHandler = this.RollNumbers.getComponent("RollNumbers")
        
        this.nodeNumberHandler.setSrcValue(this.playerRedPacketNum)
            
    }

    // CALLBACKS After __preload
    __bindButtonHandler() {
        BaseFunc.AddClickEvent(this.btnLeft, this.node, "GameDebugScene.rpddz", "onPressLeft");
        BaseFunc.AddClickEvent(this.btnRight, this.node, "GameDebugScene.rpddz", "onPressRight");
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
    
	refresh_hand_cards_area(vecCards) {
		// vecCards.sort(this.sort_cards)
        
        this.handCard.set_card_value(vecCards, false)		
        this.handCard.reset_hand_card_pos({noAni:true})
    }
    
    onPressRight() {
        this.refreshRollNumber(0)
    }
    
    onPressLeft() {
        let addNumber = BaseFunc.Random(10000)
        this.refreshRollNumber(addNumber)
    }

    refreshRollNumber(value) {
        
        let addNumber = value
        this.labelAddNum.$Label.string = addNumber
        this.playerRedPacketNum += addNumber
        this.nodeNumberHandler.setDstNumber(this.playerRedPacketNum)
    }

    // update (dt) {}
}
