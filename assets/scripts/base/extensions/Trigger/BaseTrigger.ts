import BaseCircuit from "../Circuit/BaseCircuit"
import BaseNodeInfo from "./BaseNodeInfo";
import DataManager from "../../baseData/DataManager";

const {ccclass, property, executeInEditMode} = cc._decorator;

@ccclass
@executeInEditMode
export default class BaseTrigger extends cc.Component {

    @property()
    disableTrigger: boolean = false

    // 允许多触发
    @property({
        type: [BaseNodeInfo],
        serializable: true
    })
    target = []

    bEffect: boolean = true

    onTrigger() {
        if (this.disableTrigger)
            return 

        if (this.bEffect)
            cc.audioEngine.playEffect(DataManager.Instance.menuEffect, false)

        let circuits = this.node.getComponents(BaseCircuit)
        circuits.forEach(circuit => circuit.onFire())
        this.target.forEach(item => {
            if (item.target) {
                let spawnAction = []
                if (item.target.position != item.position)
                    spawnAction.push(cc.moveBy(0.0, item.position))
                if (item.target.scale != item.scale)
                    spawnAction.push(cc.scaleBy(0.0, item.scale))
                if (item.target.rotationX != item.rotation)
                    spawnAction.push(cc.rotateBy(0.0, -item.rotation))
                

                if (!item.isHide) {
                    item.target.active = true
                    if (spawnAction.length > 0) 
                        item.target.runAction(cc.spawn(spawnAction))
                }
                else {
                    if (spawnAction.length > 0) {
                        spawnAction.push(cc.callFunc(() => { item.target.active = false}))
                        item.target.runAction(cc.spawn(spawnAction))
                    }
                    else 
                        item.target.active = false
                }
            }

            let circuits = item.target.getComponents(BaseCircuit) || []
            circuits.forEach(circuit => circuit.onFire())
        })
    }
}
