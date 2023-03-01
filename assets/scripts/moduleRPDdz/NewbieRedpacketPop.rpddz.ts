import BaseComponent from "../base/BaseComponent"
import { AdsConfig } from "../base/baseData/AdsConfig"
import DataManager from "../base/baseData/DataManager"
import { czcEvent, playADBanner, numberFormat, checkSpecialAward } from "../base/BaseFuncTs"
import NetManager from "../base/baseNet/NetManager"
import { receiveAdAward } from "../moduleLobby/LobbyFunc"
import GameLogic from "./GameLogic.rpddz"
import BaseFunc = require("../base/BaseFunc")
import AudioManager from "./AudioManager.rpddz"

const { ccclass } = cc._decorator

@ccclass
export default class NewbieRedpacketPop extends BaseComponent {
    thisComponentName: string = "NewbieRedpacketPop.rpddz"
    label: cc.Node
    label_time: cc.Node
    btn_close: cc.Node
    nodePop: cc.Node
    nState = 0
    initParam: Iproto_gc_get_redpackets_newbie_award_req
    _destroy:boolean = false

    onLoad() {
        if (DataManager.CommonData.first == 1 && !DataManager.CommonData.NewbieRedpacketPopFirst) {
            // czcEvent("斗地主", "新人礼包", "新用户")
        }
        // czcEvent("斗地主", "新人礼包", (GameLogic.Instance().gamescene.bHadStart ? "" : "直接") + "打开")
        if (DataManager.Instance.getOnlineParamSwitch("game_mask")) {
            this.node.getChildByName("mask").getComponent(cc.Button).interactable = false
        }
        if (DataManager.Instance.getOnlineParamSwitch("NewbieRedpacke_banner")) {
            playADBanner(true, AdsConfig.banner.NewbieRedpacket, ()=>{
                if (!this || !this.node || !this.node.isValid || this._destroy) {
                    playADBanner(false, AdsConfig.banner.NewbieRedpacket)
                }
            })
        }

        this.label.getComponent(cc.Label).string = this.initParam.nAmount / 10000 + ""
        if (DataManager.Instance.getOnlineParamSwitch("NewbieRedpacke_btn_oversize") && checkSpecialAward()) {
            cc.find("nodePop/btn_draw_double",this.node).height = 145
        }

        cc.find("nodePop/btn_draw_double", this.node).runAction(cc.repeatForever(cc.sequence(
            cc.scaleTo(0.8, 1.1),
            cc.scaleTo(0.8, 1.0)
        )))

        if (DataManager.Instance.getOnlineParamSwitch("NewbieRedpacke_finger", 0)) {
            this.$("node_finger").active = true
        } else {
            this.$("node_finger").active = false
        }

        if (DataManager.Instance.getOnlineParamSwitch("NewbieRedpacke_double", 1) && this.initParam.cDouble > 0) {
            if (DataManager.Instance.getOnlineParamSwitch("NewbieRedpacke_double_CloseABTest", 1)) {
                this.node.runAction(cc.sequence([cc.callFunc(() => { this.btn_close.active = false }), cc.delayTime(3), cc.callFunc(() => { this.btn_close.active = true })]))
            }
            this.node.getChildByName("mask").getComponent(cc.Button).interactable = false
            this.$("btn_draw_ad").active = false
            this.$("node_desc").active = false
            this.$("btn_draw_double").active = true
            this.$("btn_draw_normal").active = true
            this.$("node_desc2").active = true
            this.$("label_num", cc.Label).string = numberFormat(Math.floor((Number(DataManager.UserData.guid) - 1000000) * 0.793))
            return
        }

        if (DataManager.Instance.getOnlineParamSwitch("NewbieRedpackeCloseABTest")) {
            this.node.runAction(cc.sequence([cc.callFunc(() => { this.btn_close.active = false }), cc.delayTime(3), cc.callFunc(() => { this.btn_close.active = true })]))
        }

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
        cc.log("NewbieRedpacketPop.onBannerResize", msg.rect.height)
        const node = cc.find("nodePop/btn_draw_normal", this.node).active ? cc.find("nodePop/btn_draw_normal", this.node) : cc.find("nodePop/newbie_redpacket_bg", this.node)
        const box = node.getBoundingBoxToWorld()
        const diff = msg.rect.height - box.y - 20
        if (diff > 0) {
            cc.find("nodePop", this.node).y += diff
        }
    }

    __bindButtonHandler() {
        BaseFunc.AddClickEvent(this["btn_draw_ad"], this.node, this.thisComponentName, "onPressAD", 0, 3)
        BaseFunc.AddClickEvent(this["btn_draw_double"], this.node, this.thisComponentName, "onPressDouble", 0, 3)
        BaseFunc.AddClickEvent(this["btn_draw_normal"], this.node, this.thisComponentName, "onPressNormal", 0, 3)
    }

    onPressAD() {
        AudioManager.playButtonSound()
        this.label_time.active = false
        this.nodePop.stopAllActions()
        this.nState = 1
        this.disDoubelHit(this["btn_draw_ad"])
        // czcEvent("斗地主", "新人礼包", (GameLogic.Instance().gamescene.bHadStart ? "" : "直接打开") + " 点击")
        receiveAdAward(AdsConfig.taskAdsMap.NewbieRedpacket, () => {
            this.nState = 2
            this.closeSelf()
            GameLogic.Instance().sendMessage<Iproto_cg_get_redpackets_newbie_award_ack>({
                opcode: 'proto_cg_get_redpackets_newbie_award_ack',
                cDouble: 1
            })
        })
    }

    onPressDouble() {
        AudioManager.playButtonSound()
        this.nState = 1
        this.disDoubelHit(this["btn_draw_double"])
        // czcEvent("斗地主", "新人礼包", "双倍点击")
        receiveAdAward(AdsConfig.taskAdsMap.NewbieRedpacket, () => {
            if (!this.isValid) {
                return
            }
            this.nState = 2
            this.closeSelf()
            GameLogic.Instance().sendMessage<Iproto_cg_get_redpackets_newbie_award_ack>({
                opcode: 'proto_cg_get_redpackets_newbie_award_ack',
                cDouble: this.initParam.cDouble
            })
        })
    }

    onPressNormal() {
        AudioManager.playButtonSound()
        this.label_time.active = false
        this.nodePop.stopAllActions()
        this.nState = 1
        this.disDoubelHit(this["btn_draw_normal"])
        // czcEvent("斗地主", "新人礼包", "单倍点击")
        receiveAdAward(AdsConfig.taskAdsMap.NewbieRedpacket, () => {
            this.nState = 2
            this.closeSelf()
            GameLogic.Instance().sendMessage<Iproto_cg_get_redpackets_newbie_award_ack>({
                opcode: 'proto_cg_get_redpackets_newbie_award_ack',
                cDouble: 1
            })
        }, null, true, 0)
    }

    disDoubelHit(node: cc.Node, delay: number = 0.5) {
        node.getComponent(cc.Button).interactable = false
        node.runAction(cc.sequence(cc.delayTime(delay), cc.callFunc(() => {
            node.getComponent(cc.Button).interactable = true
        })))
    }

    onCloseScene() {
        NetManager.Instance.onMessage({ opcode: "GameScene_PopupManager" })
        if (DataManager.CommonData.first == 1 && !DataManager.CommonData.NewbieRedpacketPopFirst) {
            // czcEvent("斗地主", "新人礼包", "新用户" + (GameLogic.Instance().gamescene.bHadStart ? "" : "直接打开") + ["直接关闭", "关闭广告", "领取"][this.nState])
        }
        // czcEvent("斗地主", "新人礼包", (GameLogic.Instance().gamescene.bHadStart ? "" : "直接打开") + ["直接关闭", "关闭广告", "领取"][this.nState])
    }

    onDestroy() {
        this._destroy = true
        DataManager.CommonData.NewbieRedpacketPopFirst = true
        playADBanner(false, AdsConfig.banner.NewbieRedpacket)
    }
}
