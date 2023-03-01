const { ccclass } = cc._decorator

@ccclass
export default class ScaleTransition extends cc.Component {

    onLoad() {
        this.node.scale = 0.4
        this.node.runAction(cc.scaleTo(0.25, 1).easing(cc.easeSineInOut()))
    }
}
