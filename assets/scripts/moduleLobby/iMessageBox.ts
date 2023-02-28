import BaseScene from "../base/baseScene/BaseScene";
import ClockTrigger from "../base/extensions/Trigger/ClockTrigger";

const {ccclass, property} = cc._decorator;

@ccclass
export default class iMessageBox extends BaseScene {

    onOpenScene() {
        if (this.initParam) {
            this.node.getChildByName("message").getComponent(cc.Label).string = this.initParam["message"]

            this.node.getComponent(ClockTrigger).beFired = false

            this.node.runAction(cc.sequence(cc.delayTime(3), cc.fadeOut(1)))
        }
    }

    onCloseScene() {
        if (typeof this.initParam["callback"] == "function") {
            this.initParam["callback"]()
        }
    }
}
