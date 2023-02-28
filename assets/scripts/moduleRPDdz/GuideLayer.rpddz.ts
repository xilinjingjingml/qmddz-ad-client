import BaseComponent from "../base/BaseComponent";

const { ccclass, property } = cc._decorator;

@ccclass
export default class GuideLayer extends BaseComponent {
    guide_tips: cc.Node

    start() {
        this.guide_tips.active = true
        this.guide_tips.x = (cc.winSize.width + this.guide_tips.width) / 2 + 300
        this.guide_tips.runAction(cc.moveTo(1, cc.v2((cc.winSize.width - this.guide_tips.width) / 2, this.guide_tips.y)).easing(cc.easeQuinticActionInOut()))

        let time_down = 3
        this.node.runAction(cc.repeatForever(cc.sequence([
            cc.callFunc(() => {
                if (time_down < 0) {
                    this.node.stopAllActions()
                    this.closeSelf()
                    return
                }
                time_down -= 1
            }),
            cc.delayTime(1)
        ])))
    }
}
