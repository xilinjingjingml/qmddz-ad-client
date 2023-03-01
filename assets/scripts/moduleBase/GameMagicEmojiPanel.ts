
import BaseComponent from "../base/BaseComponent";
import BaseFunc = require("../base/BaseFunc")
import DataManager from '../base/baseData/DataManager';
import { iMessageBox, numberFormat, showGameReportPanel, czcEvent } from '../base/BaseFuncTs';

const {ccclass, property} = cc._decorator;

@ccclass
export default class GameMagicEmojiPanel extends BaseComponent {

    thisComponentName = "GameMagicEmojiPanel"
    logic: any;
    maskLayer: any;
    toChairId = -1;
    sptAvatar: any;
    labelMoney: any;
    labelRedPacket: any;
    btn_Close: any;
    label_name: any;

    __bindButtonHandler() {
        
		BaseFunc.AddClickEvent(this["nodeEmoji0"].getChildByName("btnEmoji"), this.node, this.thisComponentName, "onPressMagicEmoji", 0, 3);
		BaseFunc.AddClickEvent(this["nodeEmoji1"].getChildByName("btnEmoji"), this.node, this.thisComponentName, "onPressMagicEmoji", 1, 3);
		BaseFunc.AddClickEvent(this["nodeEmoji2"].getChildByName("btnEmoji"), this.node, this.thisComponentName, "onPressMagicEmoji", 2, 3);
        BaseFunc.AddClickEvent(this["nodeEmoji3"].getChildByName("btnEmoji"), this.node, this.thisComponentName, "onPressMagicEmoji", 3, 3);
        BaseFunc.AddClickEvent(this["toggle1"], this.node, this.thisComponentName, "onPressToggle", 1, 3);
        BaseFunc.AddClickEvent(this["toggle2"], this.node, this.thisComponentName, "onPressToggle", 2, 3);
        BaseFunc.AddClickEvent(this["btnReport"], this.node, this.thisComponentName, "onPressReport", 3, 3);
        
        BaseFunc.AddClickEvent(this.maskLayer, this.node, this.thisComponentName, "onPressClose", 0, 0);
        BaseFunc.AddClickEvent(this.btn_Close, this.node, this.thisComponentName, "onPressClose", 0, 0);
    }

    refreshReportBtn() {        
        if(this.logic.serverInfo.level > 2) {
            if(!this.logic.isInReportList(this.initParam["toPid"])) {
                this["btnReport"].active = true
            }
        }
    }

    onPressReport() {
		cc.audioEngine.playEffect(DataManager.Instance.menuEffect, false)
        let prarm = {}
        
        prarm["logic"] = this.initParam["logic"]
        prarm["avatarFrame"] = this.initParam["avatarFrame"]
        prarm["moneyValue"] = this.initParam["moneyValue"]
        prarm["repacketValue"] = this.initParam["repacketValue"]
        prarm["toChairId"] = this.initParam["toChairId"]
        prarm["toPid"] = this.initParam["toPid"]
        prarm["callback"] = () => {
            this.onPressClose()
            // this.refreshReportBtn()
        }
        showGameReportPanel(prarm)        
    }
    
    onPressMagicEmoji(EventTouch, data = 0) {  
		cc.audioEngine.playEffect(DataManager.Instance.menuEffect, false)
        for (let i = 0; i < 4; i++) {
            this.disDoubelHit(this["nodeEmoji" + i].getChildByName("btnEmoji"))
        }
        const isChecked = this['toggle2'].activeInHierarchy && this['toggle2'].getComponent(cc.Toggle).isChecked
        const message = {
            cEmojiIndex: data,
            cCostType: isChecked ? 2 : 1,
            cEmojiNum: isChecked ? this.logic.emojiConfigs[data].nTenEmojiNum : 1,
        }
        let sendFlag = this.sendMagicEmoji(message)
        if (sendFlag == 0) {
            this.close()
            if (this.initParam.callback) {
                this.initParam.callback(message)
            }
        }else if(sendFlag == 1){
            if (this.initParam.callback) {
                this.initParam.callback(message)
            }
            this.hideNode()
        }else if(sendFlag == -1){
        }else if(sendFlag == -2){
            iMessageBox("金豆不足");
        }else if(sendFlag == -3){
            iMessageBox("趣金币不足");
        }
    }

    disDoubelHit(node: cc.Node, delay: number = 0.5) {
        node.getComponent(cc.Button).interactable = false
        node.runAction(cc.sequence(cc.delayTime(delay), cc.callFunc(() => {
            node.getComponent(cc.Button).interactable = true
        })))
    }

    onPressToggle(EventTouch, data = 0) {
		cc.audioEngine.playEffect(DataManager.Instance.menuEffect, false)
        DataManager.save("GameMagicEmojiPanel_Toggle", data)
    }

    hideNode() {
        this.node.opacity = 1
    }

    sendMagicEmoji(data) {
        if (!this.logic.gamescene) {            
            return -1
        }

        if (this.logic.emojiConfigs.length == 0) {
            
            return -1
        }

        const emojiConfig = this.logic.emojiConfigs[data.cEmojiIndex]
        let cCostType = emojiConfig.cCostType
        let cCostValue = emojiConfig.cCostValue
        if (data.cCostType == 2) {
            cCostType = emojiConfig.nTenItemIndex
            cCostValue = emojiConfig.nTenItemNum
        }
        if (cCostType == 0) {
            if (DataManager.UserData.money - cCostValue > this.logic.serverInfo.minMoney) {
                this.sendMagicEmoji_socket(data)
                return 0
            } else {
                return -2
            }
        } else {
            if (cCostValue <= DataManager.UserData.getItemNum(cCostType)) {
                this.sendMagicEmoji_socket(data)
                return 0
            }
        }

        return -1
    }


    start () {
        czcEvent("斗地主", "魔法表情", "打开")
        this.node.opacity = 255
        this.logic = this.initParam.logic

        this.sptAvatar.$Sprite.spriteFrame = this.initParam.avatarFrame
        this.label_name.$Label.string = this.initParam.nickname
        this.labelMoney.$Label.string = this.initParam.moneyValue
        this.labelRedPacket.$Label.string = this.initParam.repacketValue
        this.$("labelHB", cc.Label).string = this.initParam.hbValue + "元"
        this.$("label_location", cc.Label).string = this.initParam.location
        this.toChairId = this.initParam.toChairId
        
        this.refreshCostValue()

        this.refreshReportBtn()

        if (this.initParam.isBaiYuan) {
            this.$("nodeHB").active = true
            this.$("nodeLocation").active = true

            this.$("nodeMoney").active = false
            this.$("nodeRedPacket").active = false
            this.$("toggleContainer").active = false
        }

        const emojiConfig = this.logic.emojiConfigs[0]
        if (emojiConfig.nTenEmojiNum == null || emojiConfig.nTenEmojiNum == 0) {
            this['toggleContainer'].active = false
            return
        }

        const toggle =  DataManager.load("GameMagicEmojiPanel_Toggle") || 1
        this['toggle1'].getComponent(cc.Toggle).isChecked = toggle == 1
        this['toggle2'].getComponent(cc.Toggle).isChecked = toggle == 2
        for (const emojiConfig of this.logic.emojiConfigs) {
            if (emojiConfig.nTenItemNum > DataManager.UserData.getItemNum(emojiConfig.nTenItemIndex)) {
                this['toggle2'].getComponent(cc.Toggle).interactable = false
                return
            }
        }

        this['label_times_name'].getComponent(cc.Label).string = { 10: "十" }[emojiConfig.nTenEmojiNum] + "连发"
        this["toggle2"].getChildByName("sptItem0").active = false
        this["toggle2"].getChildByName("sptItem365").active = false
        if (emojiConfig.nTenItemNum == 0) {
            this['label_times'].active = false
            return
        }
        if (this["toggle2"].getChildByName("sptItem" + emojiConfig.nTenItemIndex)) {
            this["toggle2"].getChildByName("sptItem" + emojiConfig.nTenItemIndex).active = true
        }
        this['label_times'].getComponent(cc.Label).string = "x" + emojiConfig.nTenItemNum
    }

    refreshCostValue() {
        this.logic.emojiConfigs.forEach((v, k) => {
            if (!!this["nodeEmoji" + k]) {                
                this["nodeEmoji" + k].getChildByName("sptItem0").active = false
                this["nodeEmoji" + k].getChildByName("sptItem365").active = false
                if (v.cCostValue == 0) {
                    this["nodeEmoji" + k].getChildByName("labelCostValue").active = false
                    return
                }
                if (!!this["nodeEmoji" + k].getChildByName("sptItem" + v.cCostType)) {   
                    this["nodeEmoji" + k].getChildByName("sptItem" + v.cCostType).active = true
                    this["nodeEmoji" + k].getChildByName("labelCostValue").getComponent(cc.Label).string = v.cCostValue
                }         
            }
        });
    }
    
    sendMagicEmoji_socket(message) {
        czcEvent("斗地主", "魔法表情", message.cCostType == 2 ? "十连发" : "单发")
        this.logic.gamescene.proto_magic_emoji_req_sender(message.cEmojiIndex, this.toChairId, message.cCostType)
        
    }

    onPressClose() {
		cc.audioEngine.playEffect(DataManager.Instance.menuEffect, false)
        this.close()
    }

    close() {
        this.logic.closeScene(this.thisComponentName)
    }
}
