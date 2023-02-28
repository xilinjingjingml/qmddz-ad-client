const { ccclass } = cc._decorator

@ccclass
export default class TouchHide extends cc.Component {
    onLoad() {
        this.node.on(cc.Node.EventType.TOUCH_START, this.onPressTouch, this, true)
        this.node['_touchListener'].setSwallowTouches(false)
    }

    onPressTouch() {
        this.node.active = false
    }
}
