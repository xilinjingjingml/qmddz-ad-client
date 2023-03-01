
import BaseComponent from "../base/BaseComponent";
import AudioManager from "./AudioManager.rpddz";
import GamePlayer from "./GamePlayer.rpddz";
import DataManager from "../base/baseData/DataManager";

const { ccclass } = cc._decorator;

@ccclass
export default class GameClock extends BaseComponent {
	private labelTime: cc.Node
	private player: GamePlayer
	private time: number = 0

	init(player: GamePlayer) {//, playerId: number   , playerId    && playerId === 0
		this.player = player
		this.node.active = false
		console.log("jin---clock: ", player.chairid, DataManager.UserData.getItemNum(390))
		if(DataManager.UserData.getItemNum(390) > 0 && player.chairid === 0){
			this.node.getChildByName("sptBg_2").active = true
			this.node.getChildByName("sptBg").active = false
			cc.find("labelTime", this.node).color = cc.color(164, 58, 54)
		}
		
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