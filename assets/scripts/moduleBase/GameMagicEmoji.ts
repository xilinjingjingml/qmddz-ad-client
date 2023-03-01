import BaseComponent from "../base/BaseComponent";
import BaseFunc = require("../base/BaseFunc")

const {ccclass, property} = cc._decorator;

@ccclass
export default class GameMagicEmoji extends BaseComponent {

    @property({
        type: [cc.SpriteFrame]
    })
    spriteFrame_emoji: cc.SpriteFrame[] = []
    

    @property({
        type: [cc.SpriteFrame]
    })
    spriteFrame_mini_emoji: cc.SpriteFrame[] = []

    @property({
        type: [cc.AudioClip]
    })
    emoji_audio_clip = []

    pic_table_animation = {}
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}
    initConfig() {
        this.pic_table_animation["magic_0"] = {
            ["nSpriteFrame"]:this.spriteFrame_emoji[0],
            ["nWFrames"]:8,
            ["nHFrames"]:2,
            ["nTotal"]:16,
            ["nDuration"]:250,
            ["width"]:1040, 
            ["height"]:230,
        }

        this.pic_table_animation["magic_1"] = {
            ["nSpriteFrame"]:this.spriteFrame_emoji[1],
            ["nWFrames"]:7,
            ["nHFrames"]:2,
            ["nTotal"]:14,
            ["nDuration"]:250,
            ["width"]:1001, 
            ["height"]:282,
        }

        this.pic_table_animation["magic_2"] = {
            ["nSpriteFrame"]:this.spriteFrame_emoji[2],
            ["nWFrames"]:5,
            ["nHFrames"]:2,
            ["nTotal"]:10,
            ["nDuration"]:250,
            ["width"]:750, 
            ["height"]:258,
        }

        this.pic_table_animation["magic_3"] = {
            ["nSpriteFrame"]:this.spriteFrame_emoji[3],
            ["nWFrames"]:9,
            ["nHFrames"]:1,
            ["nTotal"]:9,
            ["nDuration"]:250,
            ["width"]:1044, 
            ["height"]:119,
        }
    }

    __preloadAfter () {
        this.initConfig()
    }

    initWithIndex(index = 0) {
        this["sptEmoji"].active = true
        this["sptEmoji"].$Sprite.spriteFrame = this.spriteFrame_mini_emoji[index]
    }

	showMsgInteractEmoji(index = 0, _callback?) {
        cc.log("showMsgInteractEmoji")
        
        // cc.audioEngine.playEffect(this.emoji_audio_clip[index], false)

        this["sptEmoji"].active = false

		if (typeof(index) == "undefined") {
			return
		}

        let frameName = "magic_" + index

        let finishFun = () => {
            if (!!_callback) {
                _callback()
            }
        }   

        let ani_param = {
            picTable:this.pic_table_animation,
            frameName:frameName,
            repeat:1,
            finishRemove:true,
            callBack:finishFun
        }
        let nodeAni = BaseFunc.CreateFrameAnimation(ani_param)
        if (!nodeAni) {
        	return
        }
        
        this["nodeEmoji"].addChild(nodeAni)
        nodeAni["$animation"].play(frameName);
    }

}
