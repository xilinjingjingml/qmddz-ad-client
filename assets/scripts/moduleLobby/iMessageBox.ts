import BaseScene from "../base/baseScene/BaseScene"
import ClockTrigger from "../base/extensions/Trigger/ClockTrigger"

const { ccclass } = cc._decorator

@ccclass
export default class iMessageBox extends BaseScene {

    onOpenScene() {
        if (this.initParam) {
            this.node.getChildByName("message").getComponent(cc.Label).string = this.initParam["message"]
            this.node.getComponent(ClockTrigger).beFired = false
            this.node.runAction(cc.sequence(cc.delayTime(this.initParam.delayTime || 3), cc.fadeOut(1)))
            if (this.initParam.delayTime) {
                this.node.getComponent(ClockTrigger).ClockTime = this.initParam.delayTime - 1
            }
        }
    }

    onCloseScene() {
        if (typeof this.initParam["callback"] == "function") {
            this.initParam["callback"]()
        }
    }
}
