import { AdsConfig } from "../base/baseData/AdsConfig"
import DataManager from "../base/baseData/DataManager"
import { accurateTime, iMessageBox, showAwardResultPop } from "../base/BaseFuncTs"
import BaseScene from "../base/baseScene/BaseScene"
import { NodeExtends } from "../base/extends/NodeExtends"
import { checkAdCanReceive, getAdLeftTimes, getLotteryAward, loadLotteryData, receiveAdAward } from "../moduleLobby/LobbyFunc"

const { ccclass } = cc._decorator

const LOTTERY_TIME_KEY = "last_lottery_time"

@ccclass
export default class HappyLottery extends BaseScene {

    data: any = {}
    adIndex: number = 0
    emptyItemIndex: number = -1
    isBusy: boolean = false

    onOpenScene() {
        this.adIndex = AdsConfig.taskAdsMap.New_HappyLottery
        cc.find("nodePop/light", this.node).runAction(cc.repeatForever(cc.sequence(
            cc.delayTime(0.5),
            cc.rotateBy(0, 22.5)
        )))

        this.updateLotteryTimes()
        this.updateLotteryStatus()

        cc.find("nodePop/btnLottery", this.node).runAction(cc.repeatForever(cc.sequence(
            cc.scaleTo(0.8, 1.1),
            cc.scaleTo(0.8, 1.0)
        )))

        cc.game.on(cc.game.EVENT_SHOW, () => {
            this.updateLotteryStatus()
        }, this)

        loadLotteryData(() => {
            if (this.isValid) {
                this.initView()
            }
        }, 3)
    }

    initView() {
        const data = DataManager.CommonData.happyLotteryData
        const items = cc.find("nodePop/pannel", this.node).children

        for (let i = 0, len = data.length; i < len; i++) {
            const element = data[i]
            const item = items[i]

            if (element.acItemNum == 0) {
                this.emptyItemIndex = i + 1
            }

            this.data[i + 1] = { acItemIndex: element.acItemIndex, acItemNum: element.acItemNum, offset: i * 60 }

            if (element.acItemNum == 0 || cc.sys.isNative || CC_PREVIEW) {
                NodeExtends.setNodeSpriteNet({ node: cc.find("icon", item), url: element.acItemUrl })
            } else {
                cc.find("icon", item).getComponent(cc.Sprite).spriteFrame = DataManager.Instance.getSpriteFrame("itemIcon", "huafei" + element.acItemNum)
            }

            cc.find("desc", item).getComponent(cc.Label).string = element.itemDesc
        }
    }

    onAdConfigUpdate() {
        this.updateLotteryTimes()
    }

    updateLotteryTimes() {
        const num = getAdLeftTimes(this.adIndex)
        cc.find("nodePop/lottery/labelChance", this.node).getComponent(cc.Label).string = "剩余" + num + "次"
        cc.find("nodePop/labelChance", this.node).getComponent(cc.Label).string = "" + num
    }

    updateLotteryStatus() {
        this.node.stopAllActions()
        if (checkAdCanReceive(this.adIndex)) {
            const lastOpTime = DataManager.load(LOTTERY_TIME_KEY) || 0
            let cdTime = 300 - (accurateTime() - lastOpTime)

            if (lastOpTime > 0 && cdTime > 0) {
                cc.find("nodePop/btnLottery", this.node).active = false
                cc.find("nodePop/lottery", this.node).getComponent(cc.Button).interactable = false

                cc.find("nodePop/sprGary", this.node).active = true
                cc.find("nodePop/sprGary/labelTime", this.node).active = true
                cc.find("nodePop/sprGary/sprFinish", this.node).active = false

                const labelTime = cc.find("nodePop/sprGary/labelTime", this.node).getComponent(cc.Label)

                this.node.runAction(cc.repeatForever(cc.sequence(
                    cc.callFunc(() => {
                        const m = Math.floor(cdTime / 60)
                        const s = Math.floor(cdTime % 60)
                        labelTime.string = "0" + m + ":" + (s > 9 ? s : "0" + s)

                        cdTime--
                        if (cdTime <= 0) {
                            this.updateLotteryStatus()
                        }
                    }),
                    cc.delayTime(1)
                )))
            } else {
                cc.find("nodePop/btnLottery", this.node).active = true
                cc.find("nodePop/lottery", this.node).getComponent(cc.Button).interactable = true
                cc.find("nodePop/sprGary", this.node).active = false
            }
        } else {
            cc.find("nodePop/btnLottery", this.node).active = false
            cc.find("nodePop/lottery", this.node).getComponent(cc.Button).interactable = false

            cc.find("nodePop/sprGary", this.node).active = true
            cc.find("nodePop/sprGary/labelTime", this.node).active = false
            cc.find("nodePop/sprGary/sprFinish", this.node).active = true
        }
    }

    onPressLottery() {
        cc.audioEngine.playEffect(DataManager.Instance.menuEffect, false)
        if (!this.isBusy) {
            if (checkAdCanReceive(this.adIndex)) {
                receiveAdAward(this.adIndex, () => {
                    this.isBusy = true
                    getLotteryAward((res) => {
                        if (this.isValid) {
                            if (res && res.ret == 0) {
                                DataManager.save(LOTTERY_TIME_KEY, accurateTime())
                                this.updateLotteryStatus()
                                this.showLotteryResult(res.awardId)
                            } else {
                                this.isBusy = false
                                iMessageBox(res ? res.msg : "请求失败")
                            }
                        }
                    }, true)
                }, null, false)
            } else {
                iMessageBox("抽奖次数已用完")
            }
        }
    }

    showLotteryResult(awardId) {
        if (awardId == 0 || !this.data[awardId]) {
            if (this.emptyItemIndex != -1) {
                awardId = this.emptyItemIndex
            } else {
                this.isBusy = false
                iMessageBox("谢谢参与")
                return
            }
        }

        const data = this.data[awardId]
        const pannel = cc.find("nodePop/pannel", this.node)

        cc.find("nodePop/effect", this.node).runAction(cc.sequence(
            cc.delayTime(3),
            cc.show(),
            cc.blink(1, 6),
            cc.hide()
        ))

        pannel.runAction(cc.sequence(
            cc.rotateBy(3, 3600 - data.offset + pannel.angle % 360).easing(cc.easeCircleActionInOut()),
            cc.delayTime(1),
            cc.callFunc(() => {
                this.isBusy = false
                if (awardId == this.emptyItemIndex) {
                    iMessageBox("谢谢参与")
                } else {
                    showAwardResultPop([
                        {
                            index: data.acItemIndex,
                            num: data.acItemNum
                        }
                    ])
                }
                this.isBusy = false
            })
        ))
    }
    
    onPressClose() {
        cc.audioEngine.playEffect(DataManager.Instance.menuEffect, false)
        this.closeSelf()
    }
}
