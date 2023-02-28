import BaseTrigger from "./BaseTrigger"

const {ccclass, property} = cc._decorator;

@ccclass
export default class TouchTrigger extends BaseTrigger {

    @property()
    TouchDir: cc.Vec2 = cc.Vec2.ZERO

    // 连续触发点击
    @property()
    ContinuousClick: boolean = false
    
    @property()
    _touchStart: boolean = false
    
    @property()
    _touchCd = 0;

    onLoad() {
        this.node.on(cc.Node.EventType.TOUCH_START, function(event) { this._touchStart = true } , this)
        this.node.on(cc.Node.EventType.TOUCH_MOVE, function(event) {}, this)
        this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchMove, this)
    }

    onDestroy() {
        this.node.off(cc.Node.EventType.TOUCH_START)
        this.node.off(cc.Node.EventType.TOUCH_MOVE)
        this.node.off(cc.Node.EventType.TOUCH_END)
    }

    onTouchMove(event) {
        if (this._touchStart && cc.Vec2.ZERO != this.TouchDir) {
            let start = event.touch._startPoint
            let cur = event.touch._point;
            if (null == start || null == cur)
                return
            
            if (cur.x - start.x > this.TouchDir.x && cur.y - start.y > this.TouchDir.y){
                this.onTrigger()
                this._touchStart = false
            }
        }
    }

    update(dt) {
        // 处理连续触发
        if (this._touchStart && this.ContinuousClick) {
            this._touchCd += dt * 1000;
            if (this._touchCd >= 1000/10){
                this.onTrigger()
                this._touchCd = 0;
            }
        }
    }
}
