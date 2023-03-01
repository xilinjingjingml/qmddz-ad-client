const { ccclass, property, disallowMultiple, menu, requireComponent } = cc._decorator

@ccclass("FrameAnimationClip")
class FrameAnimationClip {
    @property()
    name: string = "animation"

    @property({ type: cc.Texture2D })
    texture: cc.Texture2D = null

    @property({ tooltip: "行数", min: 1, step: 1 })
    row: number = 1

    @property({ tooltip: "列数", min: 1, step: 1 })
    column: number = 1

    @property({ tooltip: "总共帧数", min: 1, step: 1 })
    total: number = 1

    @property({ tooltip: "帧速率" })
    sample: number = 1

    @property({ type: cc.WrapMode, tooltip: "循环模式" })
    wrapMode: cc.WrapMode = cc.WrapMode.Default

    @property()
    offset: cc.Vec2 = cc.Vec2.ZERO
}

/**
 * 序列帧动画组件
 */
@ccclass
@disallowMultiple
@menu("component/FrameAnimation")
@requireComponent(cc.Animation)
export default class FrameAnimation extends cc.Component {
    @property(FrameAnimationClip)
    clips: FrameAnimationClip[] = []

    onLoad() {
        const animation = this.getComponent(cc.Animation)
        for (const clip of this.clips) {
            const frames: cc.SpriteFrame[] = []
            const width = clip.texture.width / clip.column
            const height = clip.texture.height / clip.row
            if (clip.total == 0) {
                clip.total = clip.row * clip.column
            }
            for (let i = 0; i < clip.total; i++) {
                frames.push(new cc.SpriteFrame(clip.texture, cc.rect(width * (i % clip.column), height * Math.floor(i / clip.column), width, height), undefined, clip.offset))
            }
            const animationClip = cc.AnimationClip.createWithSpriteFrames(frames, clip.sample)
            animationClip.name = clip.name
            animationClip.wrapMode = clip.wrapMode
            animation.addClip(animationClip)
        }

        if (animation.playOnLoad && this.clips.length > 0) {
            animation.play(this.clips[0].name)
        }
    }

    resetInEditor() {
        !this.getComponent(cc.Sprite) && this.addComponent(cc.Sprite)
    }
}
