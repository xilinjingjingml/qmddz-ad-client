
import GameLogic from "./GameLogic.rpddz"
import BaseComponent from "../base/BaseComponent"

const {ccclass, property} = cc._decorator;

@ccclass
export default class GameClock extends BaseComponent {
	
	@property ({
		type: cc.Integer,
		displayName: '1s刷新次数',
	})
	RefreshCount = 1

	
	@property ({
		type: cc.Integer,
		displayName: '预警时间',
	})
	ShakeTime = 3.0

	
	@property()
	time:number = 0
	
	@property()
	delayShowTime:number = 0

	@property()
	shakeClock:boolean = false

	init(player) {
		this.player = player
		this.node.active = false
		// BaseFunc.bindChildToTarget(this.node, this)
	}

	startTime(time, delayShowTime = 0) {
		this.stopTime()

		this.delayShowTime = 0
		if(delayShowTime > 0) {
			this.delayShowTime = delayShowTime
			this.node.active = false
		}else {			
			this.node.active = true
		}

		this.time = time
		this.setTime(this.time)
		this.schedule(this.scheduleTime, 1 / this.RefreshCount)
	}

	scheduleTime() {
		this.time -= 1 / this.RefreshCount
		if (this.time <= 0) {
			this.stopTime()
			
			this.player.onTimeOut()
			return
		}
		
		if (this.time <= 5) {
			GameLogic.Instance().playSound("audio_clock") 
		}
		
		if(this.delayShowTime > 0) {
			this.delayShowTime--
		}else {
			this.delayShowTime = 0
			this.node.active = true
		}
		// else if (this.time <= this.ShakeTime && !this.shakeClock) {
		// 	this.shakeClock = true

		// 	this.sptBg.runAction(cc.repeatForever(cc.sequence(
		// 		cc.rotateTo(0.05, -30),
		// 		cc.rotateTo(0.1, 30),
		// 		cc.rotateTo(0.05, 0)
		// 	)))
		// }
		this.setTime(this.time)
	}

	setTime(time) {
		if (time < 10) {
			time = '0' + time
		}
		this.labelTime.getComponent(cc.Label).string = time
	}

	stopTime() {
		this.unschedule(this.scheduleTime);		
		this.node.active = false
		this.shakeClock = false
		this.sptBg.stopAllActions()
	}

}