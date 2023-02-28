const { ccclass, property } = cc._decorator

@ccclass
export default class BillboardRoll extends cc.Component {
    @property()
    rollTime: number = 1

    @property()
    delayTime: number = 2

    onLoad() {
        const height = this.node.height
        const maxPosY = (this.node.childrenCount - 1) * height
        this.node.runAction(cc.repeatForever(cc.sequence(cc.delayTime(this.delayTime + this.rollTime), cc.callFunc(() => {
            for (const node of this.node.children) {
                if (node.y >= maxPosY - 1) {
                    node.y = -height
                }
                node.runAction(cc.moveBy(this.rollTime, cc.v2(0, height)))
            }
        }))))
    }
}
