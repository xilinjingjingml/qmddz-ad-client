import BaseControl from "./BaseControl";

const {ccclass, property} = cc._decorator;

@ccclass
export default class FrameAniByAtlasControl extends BaseControl {

    @property()
    aniPath: string = "";

    @property()
    aniName: string = "";

    @property()
    duration: number = 25

    aniClip: cc.AnimationClip = null

    load: boolean = false

    onLoad() {

    }

    start() {
        if (null == this.aniClip) 
            this.initAni()
        else
            this.playerAni()
    }

    update(dt) {
        if (false == this.load) return
        this.initAni()
        this.load = false
    }

    initAni() {
        let self = this
        cc.loader.loadResDir(this.aniPath, cc.SpriteFrame, (err, items) => {
            if (!self.isValid) {
                return
            }

            if (err) cc.log(err)
            let frames = items.filter(item => item.name.indexOf(self.aniName) != -1 )  
            frames.sort((a, b) => a.name < b.name ? -1 : 1)
            if (null == frames || 0 == frames.length)
                return
            self.aniClip = cc.AnimationClip.createWithSpriteFrames(frames, frames.length);
            self.aniClip.name = self.aniName;
            self.aniClip.speed = self.duration / 500
            self.aniClip.wrapMode = cc.WrapMode.Loop;
            let ani = this.node.getComponent(cc.Animation)
            if (null == ani) 
                ani = this.node.addComponent(cc.Animation)
            ani.addClip(self.aniClip)
            ani.play(self.aniName)
            // console.log(self.aniClip)
        })
    }

    playerAni() {
        let ani = this.node.getComponent(cc.Animation)
        if (null == ani) 
            this.node.addComponent(cc.Animation)
        ani.play(self.aniName)
    }
}
