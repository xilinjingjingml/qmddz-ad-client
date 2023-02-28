const { ccclass, property, disallowMultiple, menu } = cc._decorator

/**
 * 触摸显示/隐藏节点
 */
@ccclass
@disallowMultiple
@menu("component/TouchActive")
export default class TouchActive extends cc.Component {
    @property({ type: cc.Node, tooltip: "操作节点 默认自身" })
    target: cc.Node = null

    @property({ tooltip: "显示反转" })
    reverse: boolean = true

    @property({
        tooltip: "显示/隐藏",
        visible: function (this: TouchActive) {
            return !this.reverse
        }
    })
    active: boolean = false

    @property({ tooltip: "触摸穿透" })
    swallow: boolean = false

    onLoad() {
        if (this.target == null) {
            this.target = this.node
        }
    }

    onEnable() {
        this.node.on(cc.Node.EventType.TOUCH_END, this._onTouchEnded, this)
        if (this.swallow) {
            this.node["_touchListener"].setSwallowTouches(false)
        }
    }

    onDisable() {
        this.node.off(cc.Node.EventType.TOUCH_END, this._onTouchEnded, this)
    }

    _onTouchEnded() {
        this.target.active = this.reverse ? !this.target.active : this.active
    }
}
