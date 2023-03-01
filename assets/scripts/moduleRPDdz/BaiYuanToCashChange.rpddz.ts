import BaseComponent from "../base/BaseComponent";
import ClockTrigger from "../base/extensions/Trigger/ClockTrigger";

const { ccclass, property } = cc._decorator;

@ccclass
export default class BaiYuanToCashChange extends BaseComponent {
	onOpenScene() {
		const value: number = this.initParam.value

		this.$("change_bg_win").active = value > 0
		this.$("change_bg_lose").active = value < 0

		this.$("label", cc.Label).string = this.initParam.desc

		this.$("label_change_lose").active = value < 0
		this.$("label_change_lose", cc.Label).string = value.toFixed(2)
		this.$("label_change_win").active = value > 0
		this.$("label_change_win", cc.Label).string = "+" + value.toFixed(2)

		this.node.getComponent(ClockTrigger).beFired = false
		this.node.runAction(cc.sequence(cc.delayTime(3), cc.fadeOut(1)))
	}
}
