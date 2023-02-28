import BaseTrigger from "./BaseTrigger"

const {ccclass, property} = cc._decorator;

@ccclass
export default class ClockTrigger extends BaseTrigger {

    @property()
    ClockTime: number = 0.0

    @property()
    FireOnActive: boolean = false

    @property({
        tooltip: "消息触发"
    })
    FireOnMsg: string = null

    @property()
    _countDown: number = 0.0

    @property()
    beFired: boolean = false    

    onload() {
        if (this.FireOnMsg)
            this.node.on(this.FireOnMsg, function(event) { this.onTrigger()} )

        this.bEffect = false
    }

    onDestroy() {
        if (this.FireOnMsg) 
            this.node.off(this.FireOnMsg)
    }

    update(dt) {
        if (this.beFired) 
            return

            this._countDown += dt
        if (this._countDown >= this.ClockTime) {
            this.onTrigger();
            this.beFired = true;
        }
    }


}
