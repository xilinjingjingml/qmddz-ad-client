import { start } from "repl";
import BaseControl from "./BaseControl";

const {ccclass, property, executeInEditMode} = cc._decorator;

@ccclass
@executeInEditMode
export default class RoundAniControl extends BaseControl {

    @property()
    roundAngle: number = 0

    @property()
    roundSpeed: number = 0

    @property()
    isForever: boolean = false

    @property()
    isStart: boolean = false

    nDelay: number = 0

    onLoad() {
        if (this.isForever)
            this.node.runAction(cc.repeatForever(cc.rotateBy(this.roundSpeed, -this.roundAngle)))
        else
            this.node.runAction(cc.rotateBy(this.roundSpeed, -this.roundAngle)        
    }
}
