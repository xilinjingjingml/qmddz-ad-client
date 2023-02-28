import BaseScene from "../base/baseScene/BaseScene";
import DataManager from "../base/baseData/DataManager";
import { czcEvent } from "../base/BaseFuncTs";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass  extends BaseScene {
    onOpenScene() {
        czcEvent("大厅", "如何赚钱", "打开如何赚钱" + (DataManager.CommonData["morrow"] <= 1 ? DataManager.CommonData["morrow"] + "天新用户" : "老用户"))
        if (null == DataManager.CommonData["gameServer"]) {
            cc.find("qtt/btn_startGame", this.node).active = false
            cc.find("redpacket/btn_startGame", this.node).active = false
        }
        else {
            cc.find("qtt/btnClose", this.node).active = false
            cc.find("redpacket/btnClose", this.node).active = false
        }
    }
        
    onPressClose() {    
        czcEvent("大厅", "如何赚钱", "关闭如何赚钱" + (DataManager.CommonData["morrow"] <= 1 ? DataManager.CommonData["morrow"] + "天新用户" : "老用户"))    
        if (this.initParam["clickPoint"]) { 
            cc.find("mask", this.node).runAction(cc.fadeOut(.3))
            let qtt = cc.find("qtt", this.node)
            let rp = cc.find("redpacket", this.node)
            let target = qtt.position.x == 0 ? qtt : rp
            let targetPoint = target.parent.convertToNodeSpaceAR(this.initParam["clickPoint"])
            target.runAction(cc.sequence(
                cc.spawn(
                    cc.moveTo(.3, targetPoint),
                    cc.scaleTo(.3, .05),
                    cc.fadeOut(.3)
                ),
                cc.callFunc(() => this.closeSelf())
            ))

            return 
        }
        this.closeSelf()
    }
        
    onCloseScene() {
        
    }
   
}
