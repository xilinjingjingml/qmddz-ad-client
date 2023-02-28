
const {ccclass, property} = cc._decorator;

@ccclass
export default class RollAni extends cc.Component {

    _mistiness: cc.Node = null

    start () {
        
    }

    playAni(end, callback: () => void) {
        this.node.active = true
        if (null == this._mistiness)
            this._mistiness = this.node.getChildByName("mistiness")
        let self = this
        this._mistiness.runAction(cc.sequence(
                cc.moveBy(.6, cc.v2(0, -this._mistiness.getContentSize().height)),
                cc.moveBy(0, cc.v2(0, this._mistiness.getContentSize().height)),
                cc.repeat(cc.sequence(
                    cc.moveBy(.3, cc.v2(0, -this._mistiness.getContentSize().height)),
                    cc.moveBy(0, cc.v2(0, this._mistiness.getContentSize().height)),
                ), 3),
                cc.moveBy(.45, cc.v2(0, -this._mistiness.getContentSize().height)),
                cc.moveBy(0, cc.v2(0, this._mistiness.getContentSize().height)),
                // cc.moveBy(.8 / this._mistiness.childrenCount * (end - 1), cc.v2(0, this._mistiness.getContentSize().height / this._mistiness.childrenCount * (end - 1))),
                cc.callFunc(() => {
                    self.node.active = false
                    if (null != callback) callback()
                })
            )
        )
    }

}
