import BaseControl from "./BaseControl";

const {ccclass, property} = cc._decorator;

@ccclass
export default class MoveAniControl extends BaseControl {

    @property()
    startPoint: cc.Vec2 = cc.Vec2.ZERO

    @property()
    endPoint: cc.Vec2 = cc.Vec2.ZERO

    @property()
    duration: number = 2

    @property()
    deleyTime: number = 1

    @property()
    isStart: boolean = false;

    @property()
    isOnLoad: boolean = false;

    @property()
    isRepeart: boolean = false

    @property()
    isPingPong: boolean = false

    start () {
        if (this.isOnLoad)
            this.onStartAni()
    }

    onStartAni() {
        if (this.isStart)
            return

        this.isStart = true
        this.node.position = this.startPoint
        if (this.isPingPong)
            this.pingPongAni()
        else
            this.continueAni()
    }

    continueAni() {
        let ani = cc.sequence( cc.moveTo(this.duration, this.endPoint), cc.moveTo(0, this.startPoint), cc.delayTime(this.deleyTime))
        if (this.isRepeart)
            this.node.runAction(cc.repeatForever(ani))
        else
            this.node.runAction(ani)
    }

    pingPongAni() {
        let ani = cc.sequence(cc.moveTo(this.duration, this.endPoint), cc.delayTime(this.deleyTime), cc.moveTo(this.duration, this.startPoint))
        if (this.isRepeart)
            this.node.runAction(cc.repeatForever(ani))
        else
            this.node.runAction(ani)
    }

    onStopAni() {
        this.isStart = false

        this.node.stopAllActions()
    }
}
