import BaseComponent from "../base/BaseComponent"
import { AdsConfig } from "../base/baseData/AdsConfig"
import DataManager from "../base/baseData/DataManager"
import { ITEM, ITEM_NAME } from "../base/baseData/ItemConfig"
import { czcEvent, iMessageBox, playADBanner, showAwardResultPop, CreateNavigateToMiniProgram,TimeFormat } from "../base/BaseFuncTs"
import NetManager from "../base/baseNet/NetManager"
import { checkAdCanReceive, receiveAdAward, getAdLeftTimes, sendReloadUserData } from "../moduleLobby/LobbyFunc"
import AudioManager from "./AudioManager.rpddz"
import GameLogic from "./GameLogic.rpddz"

const { ccclass } = cc._decorator

@ccclass
export default class RegainLosePop extends BaseComponent {
    tips: cc.Node
    label_time: cc.Node
    btnClose: cc.Node
    btn_get: cc.Node
    regainLose: Iproto_gc_regain_lose_score_ack
    nState = 0
    itemId: number = 0
    itemNum: number = 0
    _destroy:boolean = false
    adIndex: number = 0
    fakeTime: number = 0
    lbl_num: any
    btn_getReward: any
    onLoad() {
        if (DataManager.Instance.getOnlineParamSwitch("game_mask")) {
            this.node.getChildByName("mask").getComponent(cc.Button).interactable = false
        }
        // if (DataManager.Instance.getOnlineParamSwitch("RegainLoseCloseABTest")) {
            this.node.runAction(cc.sequence([cc.callFunc(() => { this.btnClose.active = false }), cc.delayTime(3), cc.callFunc(() => { this.btnClose.active = true })]))
        // }
        this.adIndex = AdsConfig.taskAdsMap.RegainLoseBonus
        this.regainLose = GameLogic.Instance().gamescene.regainLose

        let money = 0
        this.regainLose.nValue.forEach(n => money += n)
        cc.find("item_0/lbl_num", this.node).getComponent(cc.Label).string = "" + money// + "w"

        this.tips.active = this.regainLose.nValue.length > 1
        // this.label_time.active = this.regainLose.nRet == 0 && this.regainLose.nValue.length > 1
        // this.label_time.getComponent(cc.Label).string = `(${(this.regainLose.nCurCount + 1)}/${this.regainLose.nValue.length})`
        // cc.find("nodePop/node_sheng/lbl_1", this.node).getComponent(cc.Label).string = "" + (getAdLeftTimes(this.adIndex) - Number(DataManager.load(DataManager.UserData.guid + "RegainLoseCount" + TimeFormat("yyyy-mm-dd"))) + 1)

        let t = 0.8
        // this.label_money.runAction(cc.repeatForever(cc.sequence([
        //     cc.scaleTo(t, 1.1).easing(cc.easeSineIn()),
        //     cc.scaleTo(t, 1).easing(cc.easeSineIn()),
        // ])))

        t = 0.05
        this.btn_getReward.runAction(cc.repeatForever(cc.sequence([
            cc.rotateTo(t, -3).easing(cc.easeCircleActionOut()),
            cc.rotateTo(t * 2, 3).easing(cc.easeCircleActionOut()),
            cc.rotateTo(t * 2, -3).easing(cc.easeCircleActionOut()),
            cc.rotateTo(t * 2, 3).easing(cc.easeCircleActionOut()),
            cc.rotateTo(t, 0).easing(cc.easeCircleActionOut()),
            cc.delayTime(1),
        ])))

        // let time = this.regainLose.nTime
        this.fakeTime = 30//Math.min(time, 30)
        this.setClock()

        // if (DataManager.Instance.getOnlineParamSwitch("RegainLose_bonuns", 1)) {
        //     const level = DataManager.Instance.onlineParam.RegainLose_bonuns_level || 2
        //     if (GameLogic.Instance().serverInfo.level <= level) {
        //         if (checkAdCanReceive(AdsConfig.taskAdsMap.RegainLoseBonus)) {
        //             const itemIds = [ITEM.CARD_RECORD, ITEM.LOOK_LORDCARD, ITEM.SUPER_JIABEI].sort((a, b) => DataManager.UserData.getItemNum(a) - DataManager.UserData.getItemNum(b))
        //             if (GameLogic.Instance().gamescene.lastExchangeItemId != null) {
        //                 itemIds.unshift(GameLogic.Instance().gamescene.lastExchangeItemId)
        //             }
        //             for (const itemId of itemIds) {
        //                 if (DataManager.UserData.getItemNum(itemId) <= 3) {
        //                     this.itemId = itemId
        //                     this.itemNum = 3
        //                     this.$("tips_pop").active = true
        //                     this.$("label_bonus", cc.Label).string = `额外得${ITEM_NAME[this.itemId]}x${this.itemNum}`
        //                     break
        //                 }
        //             }
        //         }
        //     }
        // }
        playADBanner(false, AdsConfig.banner.All)//AdsConfig.banner.GameResultLayer_rpddz
        this.initNavigateToMiniGame()
    }

    start() {
        czcEvent("游戏-找回损失-弹出")
        // playADBanner(true, AdsConfig.banner.RegainLose, ()=>{
        //     if (!this || !this.node || !this.node.isValid || this._destroy) {
        //         playADBanner(false, AdsConfig.banner.RegainLose)
        //     }
        // })
    }

    onPressGet() {
        AudioManager.playButtonSound()
        this.nState = 1
        this.unscheduleAllCallbacks()
        czcEvent("游戏-找回损失-看视频领取")
        if (GameLogic.Instance().gamescene.regainLose.nRet == 2) {
            this.proto_cg_regain_lose_score_req()
            return
        }
        receiveAdAward(AdsConfig.taskAdsMap.Exemption, () => {
            czcEvent("游戏-找回损失-看视频成功")
            receiveAdAward(AdsConfig.taskAdsMap.RegainLoseBonus, null, null, false, 0, true, ()=>{
                this.setClock()
            })
            this.proto_cg_regain_lose_score_req()
        }, null, true, 2, true, ()=>{
            czcEvent("游戏-找回损失-看视频取消")
            this.setClock()
        })
    }

    // onBannerResize(msg) {
        // console.log("RegainLosePop.onBannerResize", msg.rect.height)
        // const box = cc.find("nodePop/btn_get", this.node).getBoundingBoxToWorld()
        // const diff = msg.rect.height - box.y - 30
        // if (diff > 0) {
        //     cc.find("nodePop", this.node).y += diff
        // }
        // console.log("RegainLosePop.onBannerResize", msg.rect.height, diff, cc.find("nodePop", this.node).y)
    // }

    proto_cg_regain_lose_score_req() {
        this.nState = 2
        GameLogic.Instance().sendMessage<Iproto_cg_regain_lose_score_req>({
            opcode: 'proto_cg_regain_lose_score_req',
            nOp: 1,
            nItemIndex: this.itemId,
            nItemNum: this.itemNum
        })
    }

    proto_gc_regain_lose_score_ack(event) {
        const message: Iproto_gc_regain_lose_score_ack = event.packet
        cc.log("jin---regain_lose_score", message)
        if (message.nRet == 0) {
            cc.log("倒计时剩余", message.nTime)
        } else if (message.nRet == 1) {
            const awards = [{ index: ITEM.GOLD_COIN, num: this.regainLose.nValue[this.regainLose.nCurCount] }]
            if (message.nItemIndex >= 0 && message.nItemIndex < 10000 && message.nItemNum > 0) {
                if (message.nItemIndex == awards[0].index) {
                    awards[0].num += message.nItemNum
                } else {
                    awards.push({ index: message.nItemIndex, num: message.nItemNum })
                }
            }
            showAwardResultPop(awards)
            sendReloadUserData()
            this.closeSelf()
        } else if (message.nRet < 0) {
            let msg = ""
            switch (message.nRet) {
                case -1:
                    msg = "没开启功能"
                    break;
                case -2:
                    msg = "游戏开始了"
                    break;
                case -3:
                    msg = "没有单次次数"
                    break;
                case -4:
                    msg = "超出时间"
                    break;
                case -5:
                    msg = "输的金额领完了"
                    break;
                case -6:
                    msg = "查询 超时"
                    break;
                case -7:
                    msg = "每日次数用完了"
                    break;
                case -8:
                    msg = "查询 没有输的金额"
                    break;
                default:
                    break;
            }
            iMessageBox(msg)
            this.closeSelf()
        }
    }

    onCloseScene() {
        playADBanner(true, AdsConfig.banner.GameResultLayer_rpddz, ()=>{})
        NetManager.Instance.onMessage({ opcode: "GameResult_PopupManager"})
    }

    onDestroy() {
        this._destroy = true
        czcEvent("游戏-找回损失-关闭")
        // playADBanner(false, AdsConfig.banner.RegainLose)
        
    }

    //TODO 添加导量口子,位置需要重设
    initNavigateToMiniGame(){
        let parentNode = cc.find("nodePop" ,this.node)
        CreateNavigateToMiniProgram(parentNode, cc.v2(527, -280))
    }

    setClock(){
        let self = this
        const node_time = cc.find("node_time", this.node)
        const lbl_time = cc.find("node_time/lbl_time", this.node)
        const next = () => {
            // console.log("jin---self.fakeTime: ", self.fakeTime)
            node_time.active = this.fakeTime > 0
            lbl_time.getComponent(cc.Label).string = "" + this.fakeTime + "s"    //cc.find("nodePop/node_time/lbl_time")
            this.fakeTime--
            // console.log("jin---lose ad time going")
            // time--
            if (this.fakeTime < 0) {
                // console.log("jin---lose ad time over")
                DataManager.save(DataManager.UserData.guid + "RegainLoseCount" + TimeFormat("yyyy-mm-dd") , Number(DataManager.load(DataManager.UserData.guid + "RegainLoseCount" + TimeFormat("yyyy-mm-dd"))) + 1)
                this.closeSelf()
            }
        }
        next()
        this.unscheduleAllCallbacks()
        this.schedule(next, 1)
    }
}
