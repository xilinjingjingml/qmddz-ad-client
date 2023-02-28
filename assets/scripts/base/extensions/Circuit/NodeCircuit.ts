import BaseCircuit from "../Circuit/BaseCircuit"
import ClockTrigger from "../Trigger/ClockTrigger"

const {ccclass, property} = cc._decorator;

@ccclass
export default class NodeCircuit extends BaseCircuit {

    @property()
    TargetNode: cc.Node = null

    @property()
    IsShow: boolean = true

    @property()
    Position: cc.Vec2 = cc.Vec2.ZERO

    @property()
    Scale: number = 1

    @property()
    Rotation: number = 0

    @property()
    Opacity: number = 255

    @property()
    TriggerClock: boolean = false

    start () {

    }

    onFire() {
        if (null == this.TargetNode) 
            return

        this.TargetNode.active = this.IsShow
        if (null == this.Position)
            this.TargetNode.setPosition(this.Position)

        this.TargetNode.scale = this.Scale
        this.TargetNode.rotation = this.Rotation
        this.TargetNode.opacity = this.Opacity
        
        if (this.TriggerClock){
            let trigger = this.TargetNode.getComponent(ClockTrigger)
            trigger && trigger.onTrigger()
        }
    }
}
