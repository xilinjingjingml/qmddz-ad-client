import BaseComponent from "../base/BaseComponent"
import { AdsConfig } from "../base/baseData/AdsConfig"
import DataManager from "../base/baseData/DataManager"
import { createScreenShotNode, czcEvent, getNameByItemId, playADBanner, socialShare } from "../base/BaseFuncTs"
import NetManager from "../base/baseNet/NetManager"
import { getAdData, getAdLeftTimes, receiveAdAward } from "../moduleLobby/LobbyFunc"
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
    nodePop: any

    openScene() {
        playADBanner(true, AdsConfig.banner.Highlight)
        czcEvent("斗地主", "高光时刻", "打开")
        this['bg_high_double'].active = this.initParam.showType == 1
        this['bg_sping'].active = this.initParam.showType != 1
        if (this.initParam.double) {
            this['label_doubel'].getComponent(cc.Label).string = this.initParam.double + "b"
        }

        let nickname = DataManager.UserData.nickname
        if (nickname.length > 7) {
            nickname = nickname.substr(0, 5) + "..."
        }
        cc.find("nodePop/node_info/label_name", this.node).getComponent(cc.Label).string = nickname
        NodeExtends.setNodeSpriteNet({ node: cc.find("nodePop/node_info/nodeFace/nodeMask/face", this.node), url: DataManager.UserData.face, fixSizeByParent: true })

        NodeExtends.setNodeSpriteNet({ node: cc.find("nodePop/node_ewm/bg_ewm/spt_ewm", this.node), url: DataManager.Instance.sharedData.sdCodePic, fixSizeByParent: true })

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
    }

    onBannerResize(msg) {
        cc.log("HighlightPopup.onBannerResize", msg.rect.height)
        const box = cc.find("nodePop/bg_sping", this.node).getBoundingBoxToWorld()
        const diff = msg.rect.height - box.y
        if (diff > 0) {
            cc.find("nodePop", this.node).y += diff
        }
    }

    onPressShare(event, data: string) {
        AudioManager.playButtonSound()
        this.nState = 1
        this['node_button'].active = false
        this['btn_close'].active = false
        this['node_ewm'].active = true
        const filepath = jsb.fileUtils.getWritablePath() + 'HighlightPopup_ScreenShot.png'
        createScreenShotNode(this.nodePop, filepath)
        this['node_button'].active = true
        this['btn_close'].active = true
        this['node_ewm'].active = false

        let title = ""
        if (this.initParam.showType == 1) {
            title = "轻松打出" + this.initParam.double + "倍，等你来挑战"
        } else {
            title = "好牌在手, 春天我有"
        }

        const shareData = {
            ShareWay: data == "wx" ? 'WeiXin' : "PengYouQuan",
            ShareType: '2',
            SharedImg: 'file://' + filepath,
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
        NetManager.Instance.onMessage({ opcode: "GameResult_PopupManager" })
        czcEvent("斗地主", "高光时刻", ["直接关闭", "关闭广告", "领取"][this.nState])
    }

    onDestroy() {
        playADBanner(false, AdsConfig.banner.Highlight)
    }
}
