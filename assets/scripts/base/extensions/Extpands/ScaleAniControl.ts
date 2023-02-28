import BaseControl from "./BaseControl";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ScaleAniControl extends BaseControl {

    @property()
    startScale: number = 1

    @property()
    dirScale: number = 1

    @property()
    delayTime: number = 0
    
    @property()
    scaleTime: number = 1

    @property()
    startDelay: number = 0

    @property()
    repeat: boolean = false

    @property()
    isPingPong: boolean = true

    @property()
    OnlyX: boolean = false

    @property()
    OnlyY: boolean = false

    onLoad() {

    }

    start() {
        this.node.runAction(cc.sequence(cc.delayTime(this.startDelay), cc.callFunc(this.playAni.bind(this))))
    }

    playAni(){
        // this.node.scale = this.startScale        
        if (this.repeat)
            this.node.runAction(cc.repeatForever(cc.sequence(
                                    cc.delayTime(this.delayTime), cc.scaleTo(this.scaleTime, this.OnlyY ? 1 : this.dirScale, this.OnlyX ? 1 : this.dirScale), 
                                    cc.delayTime(this.delayTime), cc.scaleTo(this.isPingPong ? this.scaleTime : 0, this.OnlyY ? 1 : this.startScale, this.OnlyX ? 1 : this.startScale))))
        else
            this.node.runAction(cc.sequence(cc.delayTime(this.delayTime), cc.scaleTo(this.scaleTime, this.OnlyY ? 1 : this.dirScale, this.OnlyX ? 1 : this.dirScale)))
    }
}
