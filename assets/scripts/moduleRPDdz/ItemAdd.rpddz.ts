import BaseComponent from "../base/BaseComponent";
import ClockTrigger from "../base/extensions/Trigger/ClockTrigger";

const { ccclass, property } = cc._decorator;

@ccclass
export default class ItemAdd extends BaseComponent {
	onOpenScene() {
		this.node.getComponent(ClockTrigger).beFired = false

		this["icon_senior"].active = this.initParam.index == 376
		this["icon_legend"].active = this.initParam.index == 377
		this["message"].getComponent(cc.Label).string = `${(this.initParam.index == 376 ? "高级碎片" : "传说碎片")} +${this.initParam.value}`
		this.node.runAction(cc.sequence(cc.delayTime(3), cc.fadeOut(1)))
	}
}
