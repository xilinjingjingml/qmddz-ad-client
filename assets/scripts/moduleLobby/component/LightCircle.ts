const {ccclass, property, executeInEditMode} = cc._decorator;

@ccclass
// @executeInEditMode
export default class LightCircle extends cc.Component {

    @property({
        type: cc.Node
    })
    circle1 = null

    @property({
        type: cc.Node
    })
    circle2 = null

    onEnable() {
        let self = this
        if (this.circle1) {
            this.circle1.scale = 0
            this.circle1.runAction(cc.repeatForever(cc.sequence(cc.scaleTo(2, 1), cc.callFunc(() => {self.circle1.scale = 0}))))
        }

        if (this.circle2) {
            this.circle2.scale = 0
            let ani = cc.repeatForever(cc.sequence(cc.scaleTo(2, 1), cc.callFunc(() => {self.circle2.scale = 0})));
            this.circle2.runAction(cc.sequence(cc.delayTime(1), cc.callFunc(() => {self.circle2.runAction(ani)})))
        }
    }
}
