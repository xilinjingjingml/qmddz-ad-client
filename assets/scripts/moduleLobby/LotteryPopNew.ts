import { confusonFunc } from "../base/confusonFunc";
import { AdsConfig } from "../base/baseData/AdsConfig"
import DataManager from "../base/baseData/DataManager"
import { getNameByItemId, iMessageBox, showAwardResultPop, accurateTime } from "../base/BaseFuncTs"
import BaseScene from "../base/baseScene/BaseScene"
import SceneManager from "../base/baseScene/SceneManager"
import { checkAdCanReceive, getLuckyLotteryAward, loadLotteryData, loadLotteryRecord, receiveAdAward, getAdLeftTimes, getNextAdMethod } from "./LobbyFunc"
import { NodeExtends } from "../base/extends/NodeExtends"

const { ccclass, property } = cc._decorator

const LOTTERY_TIME_KEY = "last_lottery_time"

@ccclass
export default class LotteryPopNew extends BaseScene {

    @property(cc.SpriteFrame)
    icon_GOLD: cc.SpriteFrame = null

    @property(cc.SpriteFrame)
    icon_DIAMOND: cc.SpriteFrame = null

    @property(cc.SpriteFrame)
    icon_CARD_RECORD: cc.SpriteFrame = null

    data: any = {}
    records: any = []
    isBusy: boolean = false
    adIndex: number = 0
    emptyItemIndex: number = -1
    isSkip: boolean = false
    isTime: boolean = false

    onOpenScene() {
        //todo 1.data 2.table 3.剩余 4.btn 5.skip 6.close 666
        this.adIndex = AdsConfig.taskAdsMap.LotteryShare
        cc.find("node/node_skip/Toggle", this.node).getComponent(cc.Toggle).isChecked = this.isSkip = DataManager.lotterySkipSta
        this.updateCountSta()
        this.updateLotteryStatus()

        loadLotteryData(() => {
            if (this.isValid) {
                this.isValid && this.initTalbe()
            }
        }, 7)
    }

    initTalbe() {
        const node_table = cc.find("node/rt/RT_table", this.node)
        const itemPrefab = cc.find("node/item", this.node)
        node_table.angle = 0
        node_table.removeAllChildren()

        const data = DataManager.CommonData["happyLotteryData"]
        if (data) {

            for (let i = 0; i < data.length; i++) {
                let item = cc.instantiate(itemPrefab)
                item.angle = 45 * i
                item.active = false
                item.parent = node_table
                this.data[i] = { acItemIndex: data[i].acItemIndex, acItemNum: data[i].acItemNum, offset: i * 45, acAutoId: data[i].acAutoId }
                //ITEM DATA
                let itemType = data[i].acItemIndex == 0 ? this["icon_GOLD"] : data[i].acItemIndex == 2 ? this["icon_CARD_RECORD"] : this["icon_DIAMOND"]
                cc.find("icon", item).getComponent(cc.Sprite).spriteFrame = itemType
                cc.find("lbl_rewardNum", item).getComponent(cc.Label).string = "" + data[i].acItemNum
                item.active = true
            }

        }
        // this.updateBtnSta()
    }

    //TODO BTN STA  广告配置
    updateCountSta() {
        cc.find("node/nodeZhong/num", this.node).getComponent(cc.Label).string = "" + getAdLeftTimes(this.adIndex) + "次"
    }

    onPressLottery() {
        cc.audioEngine.playEffect(DataManager.Instance.menuEffect, false)
        if (!this.isBusy) {
            if (checkAdCanReceive(this.adIndex)) {
                receiveAdAward(this.adIndex, () => {
                    this.isBusy = true
                    getLuckyLotteryAward((res) => {
                        if (this.isValid) {
                            if (res && res.ret == 0) {
                                //todo 记录时间
                                DataManager.save(LOTTERY_TIME_KEY, accurateTime())
                                this.updateLotteryStatus()
                                this.showLotteryResult(res.awardId)
                            } else {
                                this.isBusy = false
                                iMessageBox(res ? res.msg : "请求失败")
                            }
                        }
                    })
                }, null, false, null, true, () => { this.isBusy = false })
            } else {
                iMessageBox("抽奖次数已用完")
            }
        }
    }

    //todo ani
    showLotteryResult(awardId) {
        // console.log("jin---getLuckyLotteryAward: ", awardId)
        let self = this
        let data = null
        for (let i in this.data) {

            if (this.data[i].acAutoId === awardId) {
                data = this.data[i]
            }
        }
        // console.log("jin---getLuckyLotteryAward: ", awardId, data)
        // const data = this.data[awardId]
        const pannel = cc.find("node/rt/RT_table", this.node)

        if (this.isSkip) {
            showAwardResultPop([
                {
                    index: data.acItemIndex,
                    num: data.acItemNum
                }
            ], { closeCallback: () => { self.isBusy = false } })
            SceneManager.Instance.sendMessageToScene({ opcode: "onWelfareUpdate", item_name: "lottery" })
        } else {
            pannel.runAction(cc.sequence(
                cc.rotateBy(3, 3600 + data.offset - pannel.angle % 360).easing(cc.easeCircleActionInOut()),
                cc.delayTime(1),
                cc.callFunc(() => {
                    showAwardResultPop([
                        {
                            index: data.acItemIndex,
                            num: data.acItemNum
                        }
                    ], { closeCallback: () => { self.isBusy = false } })
                    SceneManager.Instance.sendMessageToScene({ opcode: "onWelfareUpdate", item_name: "lottery" })
                })
            ))
        }
    }

    onAdConfigUpdate() {
        this.updateCountSta()
    }

    //todo 旋转
    onPressSkip() {
        cc.audioEngine.playEffect(DataManager.Instance.menuEffect, false)
        DataManager.lotterySkipSta = this.isSkip = cc.find("node/node_skip/Toggle", this.node).getComponent(cc.Toggle).isChecked
        console.log("jin---LotteryPopNew onPressSkip", this.isSkip)
    }

    //TODO 倒计时
    updateLotteryStatus() {
        //1.是否在倒计时 2.倒计时
        this.node.stopAllActions()

        if (checkAdCanReceive(this.adIndex)) {
            const lastOpTime = DataManager.load(LOTTERY_TIME_KEY) || 0
            let cdTime = 90 - (accurateTime() - lastOpTime)

            if (lastOpTime > 0 && cdTime > 0) {
                cc.find("node/node_btn/btn_start", this.node).active = false
                cc.find("node/node_btn/btn_over", this.node).active = true
                cc.find("node/node_btn/btn_over/lbl_over", this.node).active = false
                cc.find("node/node_btn/btn_over/lbl_time", this.node).active = true
                const labelTime = cc.find("node/node_btn/btn_over/lbl_time", this.node).getComponent(cc.Label)

                this.node.runAction(cc.repeatForever(cc.sequence(
                    cc.callFunc(() => {
                        // const m = Math.floor(cdTime / 60)
                        const s = Math.floor(cdTime % 91)

                        labelTime.string = s + "秒后可抽"

                        cdTime--
                        if (cdTime <= 0) {
                            this.updateLotteryStatus()
                        }
                    }),
                    cc.delayTime(1)
                )))
            } else {
                cc.find("node/node_btn/btn_start", this.node).active = true
                cc.find("node/node_btn/btn_over", this.node).active = false

                cc.find("node/node_btn/btn_start/lbl_free", this.node).active = false
                cc.find("node/node_btn/btn_start/sprShare", this.node).active = false
                cc.find("node/node_btn/btn_start/share", this.node).active = false
                cc.find("node/node_btn/btn_start/sprVideo", this.node).active = false
                cc.find("node/node_btn/btn_start/video", this.node).active = false

                const method = getNextAdMethod(this.adIndex)
                //todo 1.false btn 2.true btn: 0:免费 1：分享 3：视频
                if (method === 0) {
                    cc.find("node/node_btn/btn_start/lbl_free", this.node).active = true
                } else if (method === 1) {
                    cc.find("node/node_btn/btn_start/sprShare", this.node).active = true
                    cc.find("node/node_btn/btn_start/share", this.node).active = true
                } else if (method === 2) {
                    cc.find("node/node_btn/btn_start/sprVideo", this.node).active = true
                    cc.find("node/node_btn/btn_start/video", this.node).active = true
                }
            }

        } else {
            //TODO 次数用完
            cc.find("node/node_btn/btn_start", this.node).active = false
            cc.find("node/node_btn/btn_over", this.node).active = true
            cc.find("node/node_btn/btn_over/lbl_over", this.node).active = true
            cc.find("node/node_btn/btn_over/lbl_time", this.node).active = false
        }
    }

    onPressClose() {
        if (!this.isBusy) {
            this.closeSelf()
        }

    }

    onPressRule() {
        SceneManager.Instance.popScene("moduleLobby", "CommonTipPop", { idx: 2 })
    }
}