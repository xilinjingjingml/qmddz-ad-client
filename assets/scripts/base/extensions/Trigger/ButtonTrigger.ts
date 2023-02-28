import BaseTrigger from "./BaseTrigger"

const {ccclass, property} = cc._decorator;

@ccclass
export default class ButtonTrigger extends BaseTrigger {
    
    // 连续触发点击
    @property()
    continuousClick: boolean = false

    @property()
    _touchStart: boolean = false

    @property()
    _touchCd = 0;

    onLoad() {
        let button = this.node.getComponent(cc.Button);
        if (null == button)
            return

        let find = false
        button.clickEvents.forEach(item => {
            if (item.target == this.node && item.handler == "onTrigger")
                find = true;            
        })

        // 注册按钮事件
        if (!find) {
            let clickEventHandler = new cc.Component.EventHandler();
            clickEventHandler.target = this.node; 
            clickEventHandler.component = "ButtonTrigger";
            clickEventHandler.handler = "onTrigger"; 
            
            button.clickEvents.push(clickEventHandler);
            
            if (this.continuousClick) {
                this.node.on(cc.Node.EventType.TOUCH_START, function(event) { this._touchStart = true } , this)
                this.node.on(cc.Node.EventType.TOUCH_END, function(event) { this._touchStart = false }, this)
            }
        }
    }

    onDestroy() {
        if (this.continuousClick) {
            this.node.off(cc.Node.EventType.TOUCH_START)
            this.node.off(cc.Node.EventType.TOUCH_END)
        }
    }

    update(dt) {
        if (!this.node.active)
            return;

        // 处理连续触发
        if (this.continuousClick && this._touchStart) {
            this._touchCd += dt * 1000;
            if (this._touchCd >= 1000/10){
                this.onTrigger()
                this._touchCd = 0;
            }
        }
    }
}
