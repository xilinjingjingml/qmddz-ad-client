import CommonData from "../../baseData/CommonData";
import BaseControl from "./BaseControl";

const {ccclass, property, executeInEditMode} = cc._decorator;

let FRAME_ANI_TYPE = cc.Enum({
    CONTINUOUS_ANI: 0 ,
    HASH_ANI: 1,
})


@ccclass
@executeInEditMode
export default class FrameAniControl extends BaseControl {

    @property({
        type: cc.Enum(FRAME_ANI_TYPE)
    })
    frameAniType = FRAME_ANI_TYPE.CONTINUOUS_ANI

    @property({
        visible() { return this.frameAniType == FRAME_ANI_TYPE.CONTINUOUS_ANI }
    })
    frameSize: cc.Size = cc.Size.ZERO

    @property({
        visible() { return this.frameAniType == FRAME_ANI_TYPE.CONTINUOUS_ANI }
    })
    frameCount: number = 1

    @property({
        type: cc.SpriteFrame,
        visible() { return this.frameAniType == FRAME_ANI_TYPE.CONTINUOUS_ANI }
    })
    spriteFrame = null

    @property({
        visible() { return this.frameAniType == FRAME_ANI_TYPE.CONTINUOUS_ANI }
    })
    offset = cc.Vec2.ZERO

    @property({
        type: [cc.SpriteFrame],
        visible() { return this.frameAniType == FRAME_ANI_TYPE.HASH_ANI }
    })
    frameList = []

    @property()
    duration: number = 25
    // _rect: cc.Rect = null

    @property()
    playerOnLoad: boolean = true

    _curFrame: number = 0;
    _curDelay: number = 0;

    _sprite: cc.Sprite = null

    @property({
        editorOnly: true,
    })
    nowPlaying: boolean = false

    start () {
        if (this.playerOnLoad) 
            this.fireAni()
    }

    fireAni() {
        this._sprite = this.node.getComponent(cc.Sprite)

        if (this.frameAniType == FRAME_ANI_TYPE.CONTINUOUS_ANI)
            this.startContinue()
        else if (this.frameAniType == FRAME_ANI_TYPE.HASH_ANI)
            this.startHash()
    }

    startContinue() {
        if (null == this.spriteFrame)
            this.spriteFrame = this._sprite.spriteFrame

        this._sprite.spriteFrame = this.spriteFrame
        this._sprite.spriteFrame.setRect(new cc.Rect(this.offset.x, this.offset.y, this.frameSize.width, this.frameSize.height ))
    }

    startHash() {
        if (0 <= this.frameList)
            return

        this._sprite.spriteFrame = this.frameList[0]
        this._curFrame ++
    }

    update(dt) {
        if (CC_EDITOR && !this.nowPlaying)
            return

        this._curDelay += dt
        // console.log(this._curDelay, this.duration / 1000)
        if (this._curDelay >= this.duration / 1000) {
            if (this.frameAniType == FRAME_ANI_TYPE.CONTINUOUS_ANI)
                this.updateContinue()
            else if (this.frameAniType == FRAME_ANI_TYPE.HASH_ANI)
                this.updateHash()
        }
    }

    updateContinue() {
        if (null == this._sprite.spriteFrame || this.frameCount <= 1) 
            return

            // console.log("update frame", this._curDelay, dt)
        let rowNum = Math.floor(this._sprite.spriteFrame.getOriginalSize().width /  this.frameSize.width)
        let x = this._curFrame % rowNum * this.frameSize.width + this.offset.x
        let y = Math.floor(this._curFrame / rowNum) * this.frameSize.height + this.offset.y

        this._sprite.spriteFrame.setRect(new cc.Rect(x, y, this.frameSize.width, this.frameSize.height ))

        this._curFrame ++ 
        this._curFrame %= this.frameCount
        this._curDelay = 0
    }

    updateHash() {
        if (null == this.frameList || 0 <= this.frameList || null == this.frameList[this._curFrame])
            return

        this._sprite.spriteFrame = this.frameList[this._curFrame]
        this._sprite.node.setContentSize(this.frameList[this._curFrame]._rect.width, this.frameList[this._curFrame]._rect.height)
        this._curFrame ++
        this._curFrame %= this.frameList.length
        this._curDelay = 0
    }
}
