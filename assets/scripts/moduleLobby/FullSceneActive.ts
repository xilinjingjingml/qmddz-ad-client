import BaseScene from "../base/baseScene/BaseScene";

const {ccclass, property} = cc._decorator;

@ccclass
export default class FullSceneActive extends BaseScene {
    onOpenScene() {
        this.node.zIndex = 500
        // this.node.runAction(cc.sequence(cc.delayTime(3), cc.callFunc(() => this.closeSelf())))
    }    
}
