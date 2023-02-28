import BaseFunc = require("../base/BaseFunc")
import GameLogic from "./GameLogic.rpddz"
import BaseComponent from "../base/BaseComponent"
import DataManager from "../base/baseData/DataManager";

// let GameLogic.Instance() = GameLogic.Instance()

const {ccclass, property} = cc._decorator;

@ccclass
export default class GameCommonTipLayer extends BaseComponent {

    @property
    thisComponentName:string = "GameCommonTipLayer.rpddz"

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        
        this.style = this.initParam.style || 0
        this.msg = this.initParam.msg || []
        
        // this.emulateData()

        this.showTips()

        this.refreshButton(this.style)

        this.showCountdown(this.initParam.time)
    }

    __bindButtonHandler() {
        cc.log("__bindButtonHandler")
		BaseFunc.AddClickEvent(this.btn_close, this.node, this.thisComponentName, "onPressClose", 0);
		BaseFunc.AddClickEvent(this.btn_confirm, this.node, this.thisComponentName, "onPressContinue", 0);
		BaseFunc.AddClickEvent(this.btn_cancel, this.node, this.thisComponentName, "onPressCancel", 0);
    }
    
    refreshButton(style = 0) {

        this.btn_close.active = [1, 5].indexOf(style) == -1

        switch (style) {
            // 游戏中退出
            case 1:
                this.btn_confirm.$Sprite.spriteFrame = DataManager.Instance.getSpriteFrame("common", "btnConfirm")
                this.btn_cancel.$Sprite.spriteFrame = DataManager.Instance.getSpriteFrame("common", "btnCancel")                
                break;        
            case 2:
                // 暂时离桌 申请解散
                BaseFunc.SetFrameTextureLocal(this.btn_confirm.$Sprite, "moduleRPDdzRes/images/PrivateGame/btn_apply")
                BaseFunc.SetFrameTextureLocal(this.btn_cancel.$Sprite, "moduleRPDdzRes/images/PrivateGame/btn_leave")
                break;
            case 3:
                // 暂时离桌 解散房间
                BaseFunc.SetFrameTextureLocal(this.btn_confirm.$Sprite, "moduleRPDdzRes/images/PrivateGame/btn_dismiss")
                BaseFunc.SetFrameTextureLocal(this.btn_cancel.$Sprite, "moduleRPDdzRes/images/PrivateGame/btn_leave")
                break;
            case 5:
                // 不同意 同意(15)
                BaseFunc.SetFrameTextureLocal(this.btn_confirm.$Sprite, "moduleRPDdzRes/images/PrivateGame/btn_agree")
                BaseFunc.SetFrameTextureLocal(this.btn_cancel.$Sprite, "moduleRPDdzRes/images/PrivateGame/btn_disagree")
                break;
            default:
                break;
        }
    }

    emulateData() {

        this.msg = [
            {size: 26, color: "874612", text: "还差"},
            {size: 26, color: "E41D14", text: "3"},
            {size: 26, color: "874612", text: "局就可以抽福卡(3000~10000)"},
            {size: 26, color: "874612", text: "\n"},
            {size: 26, color: "874612", text: "现在退出福卡局数进度将被清空"}
        ]
        
        this.msg = [
            {size: 26, color: "874612", text: "还差"},
            {size: 26, color: "E41D14", text: "3"},
            {size: 26, color: "874612", text: "局就可得"},
            {size: 26, color: "E41D14", text: "最低3000"},
            {size: 26, color: "874612", text: "福卡"},
            {size: 26, color: "874612", text: "\n"},
            {size: 26, color: "E41D14", text: "98.7%"},
            {size: 26, color: "874612", text: "的玩家都玩够4局了"}
        ]

        // this.msg = "再玩3局就可以开启红包了，\n98.7%的玩家都开启红包获得大量奖励哦"
    }

    showTips() {
        cc.log(typeof(this.msg))
        if (typeof(this.msg) == "string") {
            if (GameLogic.Instance().serverInfo.newbieMode == 1) {
                this.msg = this.msg + "."
            }
            this.labelTips.$Label.string = this.msg
        }else if(typeof(this.msg) == "object") {
            let formatMsg = ""
            let fontSize = 26

            this.msg.forEach(v => {
                formatMsg = formatMsg + "<color=#" + v.color + ">" + v.text + "</c>"
                fontSize = v.size
            });
            
            this.richLabelTips.active = true
            this.labelTips.active = false
            this.richLabelTips.$RichText.fontSize = fontSize                
            this.richLabelTips.$RichText.string = formatMsg
        }
    }

    showCountdown(time: number) {
        this.nodeTime.active = !!time
        if (!time) {
            return
        }
        this.label_time.stopAllActions()
        this.label_time.runAction(cc.repeatForever(cc.sequence([
            cc.callFunc(() => {
                this.label_time.$Label.string = '(' + time + ')'
                time--
                if (time <= 0) {
                    this.onPressContinue()
                }
            }),
            cc.delayTime(1),
        ])))
    }
    
    onPressContinue() {
        this.close()
        if (this.initParam.confirmCback) {
            this.initParam.confirmCback()
        }
    }

    onPressCancel() {
        this.close()
        if (this.initParam.cancelCback) {
            this.initParam.cancelCback()
        }
    }

    onPressClose() {
        this.close()
    }

    close() {
        this.label_time.stopAllActions()
        GameLogic.Instance().closeScene("GameCommonTipLayer")
    }

    updateGameCommonTipLayer(event) {
        this.initParam = event.packet
        this.start()
    }

    // update (dt) {}
}
