import BaseFunc = require("../base/BaseFunc")
import BaseComponent from "../base/BaseComponent"
import { AdsConfig } from "../base/baseData/AdsConfig"
import { playADBanner } from "../base/BaseFuncTs"
import { checkADNum, getADDraw } from "../moduleLobby/LobbyFunc"
import RollNumbers from "./RollNumbers"

const { ccclass, property } = cc._decorator

@ccclass
export default class GameRedPacketAwardLayer extends BaseComponent {
    @property(cc.Prefab)
    prefab_repacket_rain: cc.Prefab = null

    thisComponentName: string = "GameRedPacketAwardLayer"
    lockScene: boolean = true
    lockButton: boolean = false
    showRegain: boolean = false
    selectIndex: number = 1
    maskLayer: cc.Node
    nodeRedPacketBtn0: cc.Node
    nodeRedPacketBtn1: cc.Node
    nodeRedPacketBtn2: cc.Node
    RollNumbers: cc.Node
    labelTime: cc.Node
    nodeTip: cc.Node
    labelTip: cc.Node
    nodeRedPacketRain: cc.Node
    nodeMotionGetAni: cc.Node
    motionGetAni: cc.Node
    nodePlayerInfo: cc.Node
    nodeNumberHandler: RollNumbers
    logic: any
    awardData: { value?: number, itemIndex?: number, selectIndex?: number }[]
    canRegainGet: boolean
    nodeRedPacketInfos: { angle: number, position: cc.Vec2 }[]
    btnMaskLayer: any

    __bindButtonHandler() {
        BaseFunc.AddClickEvent(this.maskLayer, this.node, this.thisComponentName, "onPressClose", 0, 0)
        BaseFunc.AddClickEvent(this.nodeRedPacketBtn0, this.node, this.thisComponentName, "onPressGetAward", 0)
        BaseFunc.AddClickEvent(this.nodeRedPacketBtn1, this.node, this.thisComponentName, "onPressGetAward", 1)
        BaseFunc.AddClickEvent(this.nodeRedPacketBtn2, this.node, this.thisComponentName, "onPressGetAward", 2)
        BaseFunc.AddClickEvent(this.btnMaskLayer, this.node, this.thisComponentName, "onPressMaskLayer", 0)
    }

    start() {
        this.logic = this.initParam.logic
        if (this.logic.getRedPacketTableType() == 21) {
            let reason = 0
            if (this.logic.serverInfo.gameId == 389) {
                reason = AdsConfig.banner.GameRedPacketAwardLayer_rpddz
            } else if (this.logic.serverInfo.gameId == 391) {
                reason = AdsConfig.banner.GameRedPacketAwardLayer_hbermj
            }
            if (playADBanner(true, reason)) {
                // this["nodeMain"].y += 90
            }
        }

        this.registMessageHandler()

        cc.log("start", this.logic.redpacket_award_info)

        this.nodeNumberHandler = this.RollNumbers.getComponent(RollNumbers)
        this.nodeNumberHandler.setSrcValue(this.initParam.redPacketNum || 0)

        this.nodeRedPacketInfos = []
        for (let i = 0; i < 3; i++) {
            this["nodeResult" + i].active = false
            this["btn_get_again" + i].active = false
            this["btn_get_double" + i].active = false
            this.nodeRedPacketInfos.push({ angle: this["nodeRedPacketBtn" + i].angle, position: this["nodeRedPacketBtn" + i].position })
        }

        this.initTime(9, () => {
            this.onPressGetAward(null, 1)
        })
    }

    registMessageHandler() {
        this.addListener("proto_gc_get_redpackets_award_ack", this.proto_gc_get_redpackets_award_ack_handler.bind(this))
    }

    proto_gc_get_redpackets_award_ack_handler(event) {
        let message = event.packet
        cc.log("proto_gc_get_redpackets_award_ack_handler", message)
        if (message.ret == 2) {
            this.logic.redpacket_award_info = message
            this.onReciveData()
        } else if (message.ret == 3) {
            this.showRegainGet()
        } else {
            // cc.error("proto_gc_get_redpackets_award_ack_handler", this.logic.redpacket_award_info)
        }
    }

    initTime(timeLimit, callback, activeFlag = true) {
        let OnTimer = () => {
            if (this.labelTime.timeLimit < 1) {
                this.nodeTip.stopAllActions()
                if (callback) {
                    callback()
                }
            } else {
                this.labelTime.timeLimit--
                this.labelTime.$Label.string = this.labelTime.timeLimit + " s"
            }
        }

        if (activeFlag) {
            this.labelTime.active = true
        } else {
            this.labelTime.active = false
        }

        this.labelTime.timeLimit = timeLimit
        this.labelTime.$Label.string = timeLimit + " s"
        this.nodeTip.active = true
        this.nodeTip.stopAllActions()
        this.nodeTip.runAction(cc.repeatForever(cc.sequence(cc.delayTime(1), cc.callFunc(OnTimer))))
    }

    stopTime() {
        this.nodeTip.active = false
        this.nodeTip.stopAllActions()

    }

    onPressGetAward(EventTouch, data = 1) {
        cc.log("onPressGetAward", data, this.logic.redpacket_award_info)
        if (this.lockButton) {
            return
        }
        if (this.showRegain) {
            if (this.selectIndex == data) {
                this.onPressRegain()
            }
            return
        }
        this.logic.playBtnSoundEffect()

        this.lockButton = true
        this.selectIndex = data
        this.stopTime()

        if (this.logic.redpacket_award_info.ret == 1) {
            cc.log("proto_cg_get_redpackets_award_req_sender")
            this.logic.proto_cg_get_redpackets_award_req_sender()
        } else if (this.logic.redpacket_award_info.ret == 2) {
            this.onReciveData()
        }
    }

    onReciveData() {
        if (!this.lockButton) {
            return
        }

        this.formatData()

        this.refreshAwardAni(this.awardData[0].selectIndex, this.awardData[0].value, true)

        this.showRegainGet()
    }

    formatData() {
        this.awardData = []
        this.awardData[0] = {}
        this.awardData[1] = {}
        this.awardData[2] = {}

        this.awardData[0].itemIndex = this.logic.redpacket_award_info.cItemtype
        this.awardData[0].value = this.logic.redpacket_award_info.nAmount

        for (let i = 1; i < 3; i++) {
            let fakeitem = this.logic.redpacket_award_info.fakeItem.pop() || {}
            this.awardData[i].itemIndex = fakeitem.nItemIndex || 0
            this.awardData[i].value = fakeitem.nItemNum || 0
        }

        cc.log("this.selectIndex", this.selectIndex)
        if (this.selectIndex == null || typeof (this.selectIndex) == 'undefined' || this.selectIndex == -1) {
            this.selectIndex = 1
        }
        const indexNumber = [0, 1, 2]
        indexNumber.splice(indexNumber.indexOf(this.selectIndex), 1)
        this.awardData[0].selectIndex = this.selectIndex
        this.awardData[1].selectIndex = indexNumber.pop()
        this.awardData[2].selectIndex = indexNumber.pop()
        cc.log("this.awardData", this.awardData)
    }

    refreshAwardAni(index: number, value: number, selectFlag = false) {
        if (index == 0) {
            this.startAwardAni(index, value, selectFlag)
            return
        }

        const duration = 0.3
        const nodeRedPacketBtn0: cc.Node = this["nodeRedPacketBtn" + 0]
        const nodeRedPacketBtn1: cc.Node = this["nodeRedPacketBtn" + index]
        nodeRedPacketBtn0.stopAllActions()
        nodeRedPacketBtn0.runAction(cc.spawn([
            cc.rotateTo(duration, -nodeRedPacketBtn1.angle),
            cc.moveTo(duration, nodeRedPacketBtn1.position),
        ]))

        nodeRedPacketBtn1.stopAllActions()
        nodeRedPacketBtn1.runAction(cc.sequence([
            cc.spawn([
                cc.rotateTo(duration, -nodeRedPacketBtn0.angle),
                cc.moveTo(duration, nodeRedPacketBtn0.position),
            ]),
            cc.callFunc(() => {
                this.startAwardAni(index, value, selectFlag)
            })
        ]))
    }

    startAwardAni(index: number, value: number, selectFlag = false) {
        cc.log("refreshAwardAni", index, value)
        const duration = 0.3
        for (let i = 0; i < 3; i++) {
            const data = this.awardData[i]
            this["labelAvardValue" + data.selectIndex].$Label.string = "x" + data.value
            this["nodeRedPacketBtn" + i].stopAllActions()
            if (i == index) {
                continue
            }
            this["nodeRedPacketBtn" + i].runAction(cc.sequence([
                cc.scaleTo(duration, 0, 1),
                cc.callFunc(() => {
                    this["btnRedPacket" + i].active = false
                    this["nodeResult" + i].active = true
                }),
                cc.scaleTo(duration, 1, 1),
            ]))
        }

        const btnMaskLayer: cc.Node = this["btnMaskLayer"]
        btnMaskLayer.opacity = 0
        btnMaskLayer.active = true
        btnMaskLayer.stopAllActions()
        btnMaskLayer.runAction(cc.fadeIn(duration))

        const nodeRedPacketBtn: cc.Node = this["nodeRedPacketBtn" + index]
        nodeRedPacketBtn.parent = this["nodeMask"]
        nodeRedPacketBtn.stopAllActions()
        nodeRedPacketBtn.runAction(cc.sequence([
            cc.scaleTo(duration, 0, 1.1),
            cc.callFunc(() => {
                this["btnRedPacket" + index].active = false
                this["nodeResult" + index].active = true

                this.lockScene = false
                const playerRedPacketNum = this.logic.userProperties[this.logic.HONGBAO_GOLD_TICKET] || 0
                let dstPos = this.nodePlayerInfo.position
                dstPos.x += 100
                this.showGetMotion(index, dstPos, () => {
                    this.nodeNumberHandler.setDstNumber(playerRedPacketNum)
                })
                this.showRedPacketRain()

                if (this.showRegain) {
                    this.lockButton = false
                } else {
                    nodeRedPacketBtn.runAction(cc.sequence([
                        cc.delayTime(3),
                        cc.callFunc(() => {
                            this.onPressClose()
                        })
                    ]))
                }
            }),
            cc.scaleTo(duration, 1.2, 1.2),
        ]))
    }

    showGetMotion(btnIndex, dstPos, callback) {
        let srcPos = this["nodeRedPacketBtn" + btnIndex].position
        this.nodeMotionGetAni.position = srcPos
        this.nodeMotionGetAni.scale = 1
        this.motionGetAni.$MotionStreak.reset()

        let matchX = 0
        let matchY = 0
        if (btnIndex == 0) {
            matchX = -1 * BaseFunc.Random(100)
        } else if (btnIndex == 1) {
            matchX = BaseFunc.Random(200)
            matchX = matchX - 100
        } else if (btnIndex == 2) {
            matchX = BaseFunc.Random(100)
        }

        matchY -= 50
        matchX -= 50

        const actionList = [
            cc.fadeIn(0.01),
            cc.delayTime(0.01),
            cc.bezierTo(0.6, [
                cc.v2((srcPos.x + dstPos.x) / 2 + matchX, (srcPos.y + dstPos.y) / 2 + matchY),
                cc.v2((srcPos.x + dstPos.x) / 2 + matchX, (srcPos.y + dstPos.y) / 2 + matchY),
                dstPos
            ]),
            cc.spawn(
                cc.scaleTo(0.3, 5, 2),
                cc.fadeOut(0.3)
            ),
        ]
        if (callback) {
            actionList.push(cc.callFunc(callback))
        }
        this.nodeMotionGetAni.stopAllActions()
        this.nodeMotionGetAni.runAction(cc.sequence(actionList))
    }

    showRedPacketRain() {
        cc.log("showRedPacketRain")
        this.nodeRedPacketRain.active = true
        if (this.nodeRedPacketRain.childrenCount == 0) {
            cc.instantiate(this.prefab_repacket_rain).parent = this.nodeRedPacketRain
        }
    }

    onPressClose() {
        if (this.lockScene) {
            cc.log("onPressClose lock")
            return
        }
        this.close()
    }

    onCloseScene() {
        playADBanner(false)
    }

    onDestroy() {
        playADBanner(false)
    }

    close() {
        this.closeSelf()
        if (this.initParam.callback) {
            this.initParam.callback()
        }
    }

    showRegainGet() {
        if (this.logic.redpacket_info.ret == 3) {
            if (!checkADNum(AdsConfig.taskAdsMap.DrawGameRp)) {
                return
            }
            this.showRegain = true
            this.logic.redpacket_award_info = this.logic.redpacket_info
            this.logic.redpacket_award_info.ret = 1
            this["btn_get_again" + this.selectIndex].active = true
        }
    }

    onPressRegain() {
        this.logic.playBtnSoundEffect()
        getADDraw(AdsConfig.taskAdsMap.DrawGameRp, () => {
            this.stopAwardAni()
        })
    }

    stopAwardAni() {
        this.lockScene = true
        this.lockButton = false
        this.showRegain = false
        this.nodeRedPacketRain.active = false

        this["nodeRedPacketBtn" + this.selectIndex].parent = this["nodeRedPacket"]
        this["btnMaskLayer"].active = false

        for (let i = 0; i < 3; i++) {
            this["btn_get_again" + i].active = false
            this["btnRedPacket" + i].active = true
            this["nodeResult" + i].active = false
            this["nodeRedPacketBtn" + i].scale = 1
            this["nodeRedPacketBtn" + i].angle = this.nodeRedPacketInfos[i].angle
            this["nodeRedPacketBtn" + i].position = this.nodeRedPacketInfos[i].position
            this.initTime(9, () => {
                this.onPressGetAward(null, 1)
            })
        }
    }

    onPressMaskLayer() {
        this.onPressClose()
    }
}
