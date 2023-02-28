
const {ccclass, property} = cc._decorator;

@ccclass
export default class ShakeAniControl extends cc.Component {

    @property()
    delayTime: number = .3

    @property()
    bStart: boolean = true

    start () {
        if (this.bStart) 
            this.startAni()
    }

    startAni() {
        this.node.runAction(cc.repeatForever(cc.sequence(
            // cc.spawn(
                cc.sequence(cc.rotateTo(0.1, 8), cc.rotateTo(.2, -8), cc.rotateTo(.2, 8), cc.rotateTo(.2, -8), cc.rotateTo(.1, 0), cc.delayTime(.2)),
                // cc.sequence(cc.scaleTo(.2, 1.1), cc.scaleTo(.4, 0.9), cc.scaleTo(.2, 1))
            // ),
            cc.delayTime(this.delayTime)
        )))
    }

}
