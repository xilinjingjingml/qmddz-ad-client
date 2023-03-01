import BaseScene from "../base/baseScene/BaseScene"
import ClockTrigger from "../base/extensions/Trigger/ClockTrigger"

const { ccclass } = cc._decorator

@ccclass
export default class AdLoading extends BaseScene {

    onOpenScene() {
        if (this.initParam.ClockTrigger != false) {
            this.node.getComponent(ClockTrigger).beFired = false
        }

        if (this.initParam.maskOpacity != null) {
            cc.find("node_mask", this.node).opacity = this.initParam.maskOpacity
        }
    }
}
