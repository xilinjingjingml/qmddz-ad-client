import DataManager from "../../base/baseData/DataManager";
import { getMD5, getHttpSpriteFrame } from "../../base/BaseFuncTs";

const {ccclass, property, executeInEditMode} = cc._decorator;

let DrawState = cc.Enum({
    DrawIdle: 0,
    DrawStart: 1,
    DrawRun: 2,
    DrawResult: 3,
    DrawStop: 4
})

@ccclass
@executeInEditMode
export default class Revolving extends cc.Component {

    @property()
    awardNum: number = 0

    @property()
    curLightNum: number = 1

    @property()
    awardList = []

    @property({
        type: [cc.Node]
    })
    cells = []

    @property()
    roundStart: boolean = false

    @property({
        type: cc.Enum(DrawState)
    })
    drawState = DrawState.DrawIdle

    @property({
        type: cc.AudioClip
    })
    dailStartEffect = null

    @property({
        type: cc.AudioClip
    })
    dailongoingEffect = null

    @property({
        type: cc.AudioClip
    })
    dailEndEffect = null

    // @property()
    lightingDelay: number = .3
    
    roundNum: number = 0;    
    nDelay: number = 0
    bMoreOne: boolean = false
    bLessOne: boolean = false

    audioID: number = -1

    showResultFunc = null

    onLoad() {
        
    }

    start() {
        this.initDrawLighting()
    }

    onDestroy() {
        cc.audioEngine.stopAllEffects() 
    }

    setAwardList(awardList) {
        this.cells = this.node.children
        this.awardList = awardList
        if (DataManager.Instance.isTesting)
            console.log(awardList)
        let idx = 0
        for (const iterator of this.cells) {
            iterator.getChildByName("draw_light").opacity = 0
            if (null == this.awardList[idx])
                continue
            
            // 未知数据格式 暂时先用这个参数
            // iterator.getChildByName("goldbean").active = this.awardList[idx]["acItemIndex"]  == 0
            // iterator.getChildByName("redpacket").active = false
            let url = this.awardList[idx]["acItemUrl"] as string
            url = url.replace("http://activity.izhangxin.com/resources/images/dialImages/", "")
            
            let setSprite = function(spriteFrame) {
                if (!iterator.isValid) {
                    return
                }
                
                let size = iterator.getChildByName("goldbean").getContentSize()
                iterator.getChildByName("goldbean").getComponent(cc.Sprite).spriteFrame = spriteFrame
                let scale = size.width / iterator.getChildByName("goldbean").getContentSize().width
                iterator.getChildByName("goldbean").scale = scale
            }

            getHttpSpriteFrame(url, setSprite)

            
            iterator.getChildByName("awardNum").getComponent(cc.Label).string = this.awardList[idx]["acItemNum"]
            cc.find("draw_light/awardNum", iterator).getComponent(cc.Label).string = this.awardList[idx]["acItemNum"]
            idx ++;
        }

    }

    initDrawLighting(){
        let idx = 1
        for (const iterator of this.cells) {
            iterator.getChildByName("draw_light").opacity = 0

            idx ++;
        }
    }

    lightCell(num, delay, isLast, isPre, isNext){
        let node = this.cells[num]
        let light = node.getChildByName("draw_light")
        light.opacity = isNext? 0 : 255

        if (isPre)
            light.runAction(cc.sequence(cc.fadeOut(Math.max(delay - 0.1, 0.3)), cc.delayTime(.2), cc.fadeTo(.1, 100), cc.delayTime(0.2), cc.fadeOut(.2), cc.fadeTo(.1, 50), cc.fadeOut(.2)))
        else if (isNext)
            light.runAction(cc.sequence(cc.fadeTo(0.2, 100), cc.fadeOut(0.4)))
        else if (!isLast)
            light.runAction(cc.fadeOut(Math.max(delay, 0.3)));
        else
            light.runAction(cc.sequence(cc.delayTime(.2), cc.fadeOut(Math.max(delay, 0.3)), cc.delayTime(.4), cc.fadeIn(.2), cc.fadeOut(.2), cc.fadeIn(.2), cc.fadeOut(.2), cc.fadeIn(.2)))
    }

    startDraw(){
        if (this.drawState != DrawState.DrawIdle)
            return

        this.initDrawLighting()

        this.lightingDelay = .3
        this.nDelay = .3
        this.drawState = DrawState.DrawStart
        this.awardNum = -1
        this.roundNum = 0
        
        cc.audioEngine.playEffect(this.dailStartEffect, false)
        let self = this
        this.node.runAction(cc.sequence(cc.delayTime(0.01), cc.callFunc(() => { 
            cc.audioEngine.playEffect(self.dailongoingEffect, true) 
            self.node.stopAllActions()
            self.node.runAction(cc.sequence(cc.delayTime(30), cc.callFunc(() => {
                self.stopDraw()
            })))
        })))
        // this.drawResult(Math.round(Math.random() * 12))
    }

    drawResult(awardNum, callback) {
        if (this.drawState == DrawState.DrawIdle)
            return 

        this.awardNum = (awardNum + 12 - this.curLightNum) % 12 + 12
        // if (this.roundNum + this.awardNum <= 96)
        // this.drawState = DrawState.DrawRun
        this.roundNum += this.roundNum % 12
        this.awardNum += this.roundNum + 96

        // cc.audioEngine.stopAllEffects()

        let random = Math.random() * 10000
        this.bLessOne = random <= 3333
        this.bMoreOne = random >= 6666

        this.showResultFunc = callback
    }

    stopDraw() {
        this.drawState = DrawState.DrawStop
        this.bLessOne = false
        this.bMoreOne = false
        this.awardNum = this.roundNum + 3
    }

    update(dt) {
        if (this.drawState == DrawState.DrawIdle)
            return

        this.nDelay += dt
        if (this.lightingDelay <= this.nDelay) {
            if (this.drawState == DrawState.DrawStart){
                this.lightingDelay -= 0.04
                if (this.lightingDelay <= 0.05)
                    this.drawState = DrawState.DrawRun
            }
            else if (this.drawState == DrawState.DrawRun){
                if (this.awardNum > 0 && (this.awardNum - this.roundNum) == 10) {
                    this.drawState = DrawState.DrawResult
                }
            }
            else if (this.drawState == DrawState.DrawResult){
                this.lightingDelay += 0.03
                                
                if ((this.bMoreOne && this.awardNum < this.roundNum) || (!this.bMoreOne && this.awardNum == this.roundNum)){
                    this.drawState = DrawState.DrawIdle
                    cc.audioEngine.stopAllEffects()
                    cc.audioEngine.playEffect(this.dailEndEffect, false)
                    this.showResultFunc();
                    this.node.stopAllActions()
                }
            }
            else if (this.drawState == DrawState.DrawStop){
                this.lightingDelay += 0.03
                
                if (this.awardNum == this.roundNum + 1){
                    this.drawState = DrawState.DrawIdle 
                    cc.audioEngine.stopAllEffects()
                    cc.audioEngine.playEffect(this.dailEndEffect, false)
                    this.showResultFunc();
                    this.node.stopAllActions()
                }               
            }

            let bPre = this.bLessOne && this.awardNum == this.roundNum + 1
            let bNext = this.bMoreOne && this.awardNum == this.roundNum - 1

            this.lightCell(this.curLightNum, this.lightingDelay, this.awardNum == this.roundNum, bPre, bNext)

            if (!bNext){
                this.curLightNum ++
                this.curLightNum %= 12
            }

            this.roundNum ++
            this.nDelay = 0
        }
    }
}
