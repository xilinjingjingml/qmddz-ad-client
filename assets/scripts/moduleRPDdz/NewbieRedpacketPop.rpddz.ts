import BaseComponent from "../base/BaseComponent"
import { AdsConfig } from "../base/baseData/AdsConfig"
import DataManager from "../base/baseData/DataManager"
import { czcEvent, playADBanner } from "../base/BaseFuncTs"
import NetManager from "../base/baseNet/NetManager"
import { receiveAdAward } from "../moduleLobby/LobbyFunc"
import GameLogic from "./GameLogic.rpddz"
import BaseFunc = require("../base/BaseFunc")

const { ccclass } = cc._decorator

@ccclass
export default class NewbieRedpacketPop extends BaseComponent {
    thisComponentName: string = "NewbieRedpacketPop.rpddz"
    label: cc.Node
    label_time: cc.Node
    btn_close: cc.Node
    nodePop: cc.Node
    nState = 0

    onLoad() {
        if (DataManager.CommonData["first"] == 1 && DataManager.CommonData["roleCfg"]["roundSum"] == 1) {
            czcEvent("斗地主", "新人礼包", "新用户")
        }
        czcEvent("斗地主", "新人礼包", (GameLogic.Instance().gamescene.bHadStart ? "" : "直接") + "打开")
        if (DataManager.Instance.onlineParam.game_mask == 1) {
            this.node.getChildByName("mask").getComponent(cc.Button).interactable = false
        }
        if (DataManager.Instance.onlineParam.NewbieRedpacke_banner == 1) {
            playADBanner(true, AdsConfig.banner.NewbieRedpacket)
        }

        const abTest = DataManager.Instance.onlineParam.NewbieRedpackeCloseABTest
		if (typeof abTest == 'number' && Number(DataManager.UserData.guid) % abTest == 0) {
            this.node.runAction(cc.sequence([cc.callFunc(() => { this.btn_close.active = false }), cc.delayTime(3), cc.callFunc(() => { this.btn_close.active = true })]))
        }
        this.label.getComponent(cc.Label).string = Math.floor(this.initParam.nAmount / 1000) / 10 + ""
        
        let t = DataManager.Instance.onlineParam.NewbieRedpackeTimeHide || 10
        this.label_time.runAction(cc.repeatForever(cc.sequence([
            cc.callFunc(() => {
                if (t <= 0) {
                    this.label_time.active = false
                    return
                }
                this.label_time.getComponent(cc.Label).string = (t--) + '秒后消失'
            }),
            cc.delayTime(1),
        ])))

        this.nodePop.runAction(cc.sequence(cc.delayTime(DataManager.Instance.onlineParam.NewbieRedpackeAutoClose || 20), cc.callFunc(this.closeSelf.bind(this))))
    }

    onBannerResize(msg) {
        const box = cc.find("nodePop/newbie_redpacket_bg", this.node).getBoundingBoxToWorld()
        const diff = msg.rect.height - box.y - 20
        if (diff > 0) {
            cc.find("nodePop", this.node).y += diff
        }
    }

    __bindButtonHandler() {
        BaseFunc.AddClickEvent(this["btn_draw_ad"], this.node, this.thisComponentName, "onPressDouble", 0, 3)
    }

    onPressDouble() {
        this.label_time.active = false
        this.nodePop.stopAllActions()
        this.nState = 1
        this.disDoubelHit(this["btn_draw_ad"])
        czcEvent("斗地主", "新人礼包", (GameLogic.Instance().gamescene.bHadStart ? "" : "直接打开") + " 点击")
        receiveAdAward(AdsConfig.taskAdsMap.NewbieRedpacket, () => {
            this.nState = 2
            this.closeSelf()
            GameLogic.Instance().sendMessage({
                opcode: 'proto_cg_get_redpackets_newbie_award_ack',
            })
        })
    }

    disDoubelHit(node: cc.Node, delay: number = 0.5) {
        node.getComponent(cc.Button).interactable = false
        node.runAction(cc.sequence(cc.delayTime(delay), cc.callFunc(() => {
            node.getComponent(cc.Button).interactable = true
        })))
    }

    onCloseScene() {
        NetManager.Instance.onMessage({ opcode: "GameScene_PopupManager" })
        czcEvent("斗地主", "新人礼包", (GameLogic.Instance().gamescene.bHadStart ? "" : "直接打开") + ["直接关闭", "关闭广告", "领取"][this.nState])
    }

    onDestroy() {
        playADBanner(false, AdsConfig.banner.NewbieRedpacket)
    }
}
