import BaseControl from "./BaseControl";

const {ccclass, property} = cc._decorator;

@ccclass
export default class FlushAniControl extends BaseControl {

    @property()
    lightDuration: number = 0.5

    @property()
    saddenDuration: number = 0.5

    @property()
    delayTime: number = 0.5

    start () {
        this.node.runAction(cc.repeatForever(cc.sequence(cc.fadeOut(this.saddenDuration), cc.fadeIn(this.lightDuration), cc.delayTime(this.delayTime))))
    }

    // update (dt) {}
}
