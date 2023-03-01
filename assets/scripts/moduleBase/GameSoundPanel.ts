import { confusonFunc } from "../base/confusonFunc";

import BaseComponent from "../base/BaseComponent"
import DataManager from '../base/baseData/DataManager'
import { functions } from "../base/utils/functions"
import BaseFunc = require("../base/BaseFunc")
import { NodeExtends } from "../base/extends/NodeExtends"

const { ccclass } = cc._decorator

@ccclass
export default class GameSoundPanel extends BaseComponent {

    thisComponentName = "GameSoundPanel"
    logic: any;

    __bindButtonHandler() {
        BaseFunc.AddClickEvent(this.$("toggle_music"), this.node, this.thisComponentName, "onPressMusic", 1, 3)
        BaseFunc.AddClickEvent(this.$("toggle_effect"), this.node, this.thisComponentName, "onPressEffect", 1, 3)
        BaseFunc.AddClickEvent(this.$("maskLayer"), this.node, this.thisComponentName, "onPressClose", 0, 0)
        BaseFunc.AddClickEvent(this.$("btn_Close"), this.node, this.thisComponentName, "onPressClose", 0, 0)
    }

    start() {
        this.logic = this.initParam.logic
        this.$("sptAvatar", cc.Sprite).spriteFrame = this.initParam.avatarFrame
        this.$("label_name", cc.Label).string = this.initParam.nickname
        this.$("labelRedPacket", cc.Label).string = this.initParam.repacketValue
        this.$("labelMoney", cc.Label).string = this.initParam.moneyValue
        this.$("labelHB", cc.Label).string = this.initParam.hbValue
        this.$("label_location", cc.Label).string = this.initParam.location

        this.$("toggle_music",cc.Toggle).isChecked = DataManager.SoundVolume > 0
        this.$("toggle_effect",cc.Toggle).isChecked = DataManager.EffectVolume > 0
    }

    onPressMusic(event: cc.Event.EventTouch) {
        cc.audioEngine.playEffect(DataManager.Instance.menuEffect, false)
        NodeExtends.cdButton(event)
        DataManager.SoundVolume = event.getCurrentTarget().getComponent(cc.Toggle).isChecked ? 0 : 1
    }

    onPressEffect(event: cc.Event.EventTouch) {
        cc.audioEngine.playEffect(DataManager.Instance.menuEffect, false)
        NodeExtends.cdButton(event)
        DataManager.EffectVolume = event.getCurrentTarget().getComponent(cc.Toggle).isChecked ? 0 : 1
    }

    onPressClose() {
        cc.audioEngine.playEffect(DataManager.Instance.menuEffect, false)
        this.close()
    }

    close() {
        this.logic.closeScene(this.thisComponentName)
    }
}
