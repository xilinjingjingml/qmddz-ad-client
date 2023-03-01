import BaseComponent from "../base/BaseComponent"
import { AdsConfig } from "../base/baseData/AdsConfig"
import DataManager from "../base/baseData/DataManager"
import { czcEvent, getNameByItemId, playADBanner, screenshot, socialShare } from "../base/BaseFuncTs"
import NetManager from "../base/baseNet/NetManager"
import { getAdData, getAdLeftTimes, receiveAdAward } from "../moduleLobby/LobbyFunc"
import BaseFunc = require("../base/BaseFunc")
import AudioManager from "./AudioManager.rpddz"
import { NodeExtends } from "../base/extends/NodeExtends"

const { ccclass } = cc._decorator

@ccclass
export default class HighlightPopup extends BaseComponent {
    thisComponentName: string = "HighlightPopup.rpddz"
    awardConfigs = [
        { itmeIndex: 373, itemNum: 2 },
        { itmeIndex: 2, itemNum: 2 },
        { itmeIndex: 375, itemNum: 2 },
    ]
    nState = 0
    imageUrl = null
    _destroy:boolean = false
    openScene() {
        // playADBanner(true, AdsConfig.banner.Highlight, ()=>{
        //     if (!this || !this.node || !this.node.isValid || this._destroy) {
        //         playADBanner(false, AdsConfig.banner.Highlight)
        //     }
        // })
        // czcEvent("斗地主", "高光时刻", "打开")
        if (this.initParam.showType == 1) {
            this['bg_high_double'].active = true
            this['share_high_double_mini'].active = true
            this['bg_sping'].active = false
            this['share_sping_mini'].active = false
            this['label_doubel'].getComponent(cc.Label).string = this.initParam.double + "b"
            this['label_doubel_mini'].getComponent(cc.Label).string = this.initParam.double + "b"
        } else {
            this['bg_high_double'].active = false
            this['share_high_double_mini'].active = false
            this['bg_sping'].active = true
            this['share_sping_mini'].active = true
        }

        this['award_bubble'].active = false
        const count = getAdLeftTimes(AdsConfig.taskAdsMap.Highlight)
        if (count > 0) {
            const data = getAdData(AdsConfig.taskAdsMap.Highlight)
            const index = data ? data.count : -1
            const awardConfigs = DataManager.Instance.onlineParam.highlight_awardconfigs || this.awardConfigs
            if (!awardConfigs[index]) {
                return
            }

            this['award_bubble'].active = true
            this['label_bubble'].getComponent(cc.Label).string = getNameByItemId(awardConfigs[index].itmeIndex) + "x" + awardConfigs[index].itemNum

            this['award_bubble'].runAction(cc.repeatForever(cc.sequence([
                cc.scaleTo(0.5, 1.2),
                cc.scaleTo(0.5, 1),
                cc.delayTime(1),
            ])))
        }

        let nickname = DataManager.UserData.nickname
        if (nickname.length > 7) {
            nickname = nickname.substr(0, 5) + "..."
        }
        cc.find("nodeScreenshot/nodeFace/label_name", this.node).getComponent(cc.Label).string = nickname
        const face = cc.find("nodeScreenshot/nodeFace/nodeMask/face", this.node)
        NodeExtends.setNodeSpriteNet({ node: face, url: DataManager.UserData.face, fixSize: true })
        playADBanner(false, AdsConfig.banner.All)
    }

    __bindButtonHandler() {
        BaseFunc.AddClickEvent(this["btn_share"], this.node, this.thisComponentName, "onPressShare", 0, 3)
    }

    // onBannerResize(msg) {
        // cc.log("HighlightPopup.onBannerResize", msg.rect.height)
        // const box = cc.find("nodePop/bg_sping", this.node).getBoundingBoxToWorld()
        // const diff = msg.rect.height - box.y
        // if (diff > 0) {
        //     cc.find("nodePop", this.node).y += diff
        // }
    // }

    onPressShare() {
        AudioManager.playButtonSound()
        this.nState = 1
        if (this.imageUrl) {
            this.doNext()
            return
        }

        this['nodeScreenshot'].active = true
        this.node.runAction(cc.sequence([
            cc.delayTime(0.01),
            cc.callFunc(() => {
                screenshot(this['nodeScreenshot'], (success, path) => {
                    cc.log("HighlightPopup.onPressShare ret", success, path)
                    this['nodeScreenshot'].active = false
                    success && (this.imageUrl = path)
                    this.doNext()
                })
            })
        ]))
    }

    doNext() {
        let title = ""
        if (this.imageUrl) {
            if (this.initParam.showType == 1) {
                title = "轻松打出" + this.initParam.double + "倍，等你来挑战"
            } else {
                title = "好牌在手, 春天我有"
            }
        }

        const shareData = {
            title: title,
            imageUrl: this.imageUrl,
            withOpenId: true,
            callback: null
        }

        const callback = () => {
            if (this.isValid) {
                this.nState = 2
                this.closeSelf()
            }
        }

        if (this['award_bubble'].active) {
            receiveAdAward(AdsConfig.taskAdsMap.Highlight, callback, shareData)
        } else {
            shareData.callback = callback
            socialShare(shareData)
        }
    }

    onCloseScene() {
        playADBanner(true, AdsConfig.banner.GameResultLayer_rpddz, ()=>{})
        NetManager.Instance.onMessage({ opcode: "GameResult_PopupManager" })
        // czcEvent("斗地主", "高光时刻", ["直接关闭", "关闭广告", "领取"][this.nState])
    }

    onDestroy() {
        this._destroy = true
        // playADBanner(false, AdsConfig.banner.Highlight)
        
    }
}
