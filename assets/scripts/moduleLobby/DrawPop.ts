import { AdsConfig } from "../base/baseData/AdsConfig"
import DataManager from "../base/baseData/DataManager"
import { playADGrid } from "../base/BaseFuncTs"
import BaseScene from "../base/baseScene/BaseScene"
import SceneManager from "../base/baseScene/SceneManager"
import { getAdLeftTimes, receiveAdAward } from "./LobbyFunc"

const { ccclass, property } = cc._decorator

@ccclass
export default class DrawPop extends BaseScene {

    @property()
    adIndex: number = 0

    onOpenScene() {
        this.updateState()
        if (DataManager.Instance.onlineParam.showGridAd != 0) {
            playADGrid(true, AdsConfig.grid.DrawVipPop)
        }
    }

    onGridResize(msg) {
        if (this.node.name === "DrawWages") {
            const box = cc.find("nodePop/bg", this.node).getBoundingBoxToWorld()
            const diff = msg.rect.height - box.y - 20
            if (diff > 0) {
                cc.find("nodePop", this.node).y += diff
            }
        } else {
            const box = cc.find("nodePop/draw_vip_bg", this.node).getBoundingBoxToWorld()
            const diff = msg.rect.height - box.y - 20
            if (diff > 0) {
                cc.find("nodePop", this.node).y += diff
            }
        }
    }

    onAfterOpen() {
        if (this.node.name === "DrawWages") {
            let coinNum = 10000
            let vipLv = 0
            if (DataManager.CommonData["VipData"]) {
                vipLv = DataManager.CommonData["VipData"].vipLevel || 0
            }
            if (vipLv != 0) {
                coinNum = 50000 * vipLv
            }
            cc.find("nodePop/bg/itemNum1", this.node).getComponent(cc.Label).string = "金豆x" + coinNum
            cc.find("nodePop/bg/itemNum2", this.node).getComponent(cc.Label).string = "超级加倍卡x5"
            cc.find("nodePop/bg/itemNum3", this.node).getComponent(cc.Label).string = "记牌器x5"
        }
    }

    onPressVip() {
        cc.audioEngine.playEffect(DataManager.Instance.menuEffect, false)
        SceneManager.Instance.popScene("moduleLobby", "VipInfoPop")
    }

    updateState() {
        const leftTimes = getAdLeftTimes(this.adIndex)
        const btnDraw = cc.find("nodePop/btnDraw", this.node)
        btnDraw.getComponent(cc.Button).interactable = leftTimes > 0
        cc.find("nodePop/btnDraw/statusFinish", this.node).active = leftTimes <= 0

        if (leftTimes > 0) {
            btnDraw.runAction(cc.repeatForever(cc.sequence(
                cc.scaleTo(0.8, 1.1),
                cc.scaleTo(0.8, 1.0)
            )))
        } else {
            btnDraw.stopAllActions()
            btnDraw.scale = 1
        }

        const count = cc.find("nodePop/counttip/count", this.node)
        if (count) {
            count.getComponent(cc.Label).string = "" + leftTimes
        }
    }

    onPressDraw() {
		cc.audioEngine.playEffect(DataManager.Instance.menuEffect, false)
        receiveAdAward(this.adIndex, () => {
            this.isValid && this.updateState()
        })
    }

    onPressClose() {
		cc.audioEngine.playEffect(DataManager.Instance.menuEffect, false)
        this.closeSelf()
    }

    onDestroy() {
        playADGrid(false, AdsConfig.grid.DrawVipPop)
    }
}
