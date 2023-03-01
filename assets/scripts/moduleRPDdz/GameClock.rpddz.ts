
import BaseComponent from "../base/BaseComponent";
import AudioManager from "./AudioManager.rpddz";
import GamePlayer from "./GamePlayer.rpddz";

const { ccclass } = cc._decorator;

@ccclass
export default class GameClock extends BaseComponent {
	private labelTime: cc.Node
	private player: GamePlayer
	private time: number = 0

	init(player: GamePlayer) {
		this.player = player
		this.node.active = false
	}

	startTime(time) {
		this.stopTime()

		this.node.active = true
		this.time = time
		this.refreshTime()
		this.schedule(this.scheduleTime, 1)
	}

	stopTime() {
		this.unschedule(this.scheduleTime)
		this.node.active = false
	}

	private refreshTime() {
		this.labelTime.getComponent(cc.Label).string = (this.time < 10 ? '0' : '') + this.time
		if (this.time <= 5) {
			AudioManager.playSound("audio_clock")
		}
	}

	private scheduleTime() {
		this.time -= 1
		this.refreshTime()

		if (this.time <= 0) {
			this.stopTime()
			this.player.onTimeOut()
		}
	}
}