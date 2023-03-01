import { confusonFunc } from "../base/confusonFunc";
import BaseFunc = require("../base/BaseFunc")
import BaseComponent from "../base/BaseComponent"
import { AdsConfig } from "../base/baseData/AdsConfig"
import DataManager from "../base/baseData/DataManager"
import { czcEvent, getRedPacketAwardConfig, playADBanner, CreateNavigateToMiniProgram } from "../base/BaseFuncTs"
import NetManager from "../base/baseNet/NetManager"
import { getAdLeftTimes, getAdTotalTimes, getNextAdMethod, receiveAdAward } from "../moduleLobby/LobbyFunc"
import { math } from "../base/utils/math"

const { ccclass, property } = cc._decorator

enum ADState {
    None,
    onClick,
    getAward,
}

@ccclass
export default class GameRedPacketAwardLayer extends BaseComponent {
    @property(cc.Prefab)
    prefab_repacket_rain: cc.Prefab = null

    logic: { serverInfo: { level: number }, redpacket_award_info: Iproto_gc_get_redpackets_award_ack, proto_cg_get_redpackets_award_req_sender: Function }
    nodeRedPacketInfos: { angle: number, position: cc.Vec2 }[]
    nState: ADState
    selectIndex: number = 1
    awardData: { value: number, itemIndex: number, selectIndex: number }[]
    canButton: boolean = false
    _destroy:boolean = false

    start() {
        // czcEvent("斗地主", "抽红包", "打开")
        this.registMessageHandler()
        playADBanner(true, AdsConfig.banner.GameRedPacketAwardLayer_rpddz, ()=>{
            if (!this || !this.node || !this.node.isValid || this._destroy) {
                playADBanner(false, AdsConfig.banner.GameRedPacketAwardLayer_rpddz)
            }
        })

        if (DataManager.Instance.getOnlineParamSwitch("GameRedPacketAwardLayerCloseABTest")) {
            this.$("btn_close").active = false
            this.node.runAction(cc.sequence(cc.delayTime(3), cc.callFunc(() => { this.$("btn_close").active = true })))
        }

        this.logic = this.initParam.logic

        const money = getRedPacketAwardConfig()[this.logic.serverInfo.level]
        if (money) {
            this.$("labelMax", cc.Label).string = "最高可获得" + money + "元"
        } else {
            this.$("labelMax").active = false
        }

        const num = this.initParam.redPacketNum || 0
        this.$("labelValue", cc.Label).string = num + " ≈ " + (num / 10000).toFixed(2) + "元"

        const method = this.getNextAdMethod()
        this.nodeRedPacketInfos = []
        for (let i = 0; i < 3; i++) {
            this.$("nodeResult" + i).active = false
            this.$("btn_get_again" + i).active = false
            this.$("btn_get_double" + i).active = false
            this.$("btnRedPacket" + i).getChildByName("sprOpen").active = method == 0
            this.$("btnRedPacket" + i).getChildByName("sprShare").active = method == 1
            this.$("btnRedPacket" + i).getChildByName("sprVideo").active = method == 2
            this.nodeRedPacketInfos.push({ angle: this.$("nodeRedPacketBtn" + i).angle, position: this.$("nodeRedPacketBtn" + i).position })
        }

        // 播放抽奖动画
        if (DataManager.Instance.getOnlineParamSwitch("GameRedPacketAwardLayer_playAni")) {
            this.playAni()
        } else {
            this.playAniFinger()
        }

        if (DataManager.Instance.isPureMode()) {
            cc.find("nodeMain/labelMax",this.node).active = false
            cc.find("nodeMain/nodeVaule",this.node).active = false
        }

        this.initNavigateToMiniGame()
        // playADBanner(false, AdsConfig.banner.All)
    }

    __bindButtonHandler() {
        const componentName = "GameRedPacketAwardLayer"
        BaseFunc.AddClickEvent(this.$("btnRedPacket0"), this.node, componentName, "onPressGetAward", 0)
        BaseFunc.AddClickEvent(this.$("btnRedPacket1"), this.node, componentName, "onPressGetAward", 1)
        BaseFunc.AddClickEvent(this.$("btnRedPacket2"), this.node, componentName, "onPressGetAward", 2)
    }

    registMessageHandler() {
        this.addListener("proto_gc_get_redpackets_award_ack", this.proto_gc_get_redpackets_award_ack_handler.bind(this))
    }

    onBannerResize(msg: { rect: cc.Rect }) {
        cc.log("GameRedPacketAwardLayer.onBannerResize", msg.rect.height)
        const box = this.$("nodeVaule").getBoundingBoxToWorld()
        const diff = msg.rect.height - box.y
        if (diff > 0) {
            cc.find("nodeMain", this.node).y += diff
        }
    }

    proto_gc_get_redpackets_award_ack_handler(event: { packet: Iproto_gc_get_redpackets_award_ack }) {
        cc.log("proto_gc_get_redpackets_award_ack_handler", event.packet)
        if (event.packet.ret == 2) {
            this.logic.redpacket_award_info = event.packet
            this.onReciveData()
        }
    }

    playAni() {
        this.$("nodeAniFinger").active = false
        // datas
        const datas = [this.logic.redpacket_award_info.nAmount]
        this.logic.redpacket_award_info.fakeItem.forEach(item => datas.push(item.nItemNum))
        for (let i = 0; i < 5; i++) {
            const idx1 = Math.floor(Math.random() * datas.length)
            const idx2 = Math.floor(Math.random() * datas.length)
            if (idx1 == idx2) {
                continue
            }
            const data = datas[idx1]
            datas[idx1] = datas[idx2]
            datas[idx2] = data
        }

        // labelAvardValue
        for (let i = 0; i < 3; i++) {
            this.$("btnRedPacket" + i).active = false
            this.$("nodeResult" + i).active = true
            this.$("labelAvardValue" + i, cc.Label).string = "" + datas[i]
        }

        // action
        for (let i = 0; i < 3; i++) {
            const actions = []
            actions.push(cc.delayTime(1))
            actions.push(cc.scaleTo(0.2, 0, 1))
            actions.push(cc.callFunc(() => {
                this["btnRedPacket" + i].active = true
                this["nodeResult" + i].active = false
            }))
            actions.push(cc.scaleTo(0.2, 1, 1))
            actions.push(cc.spawn([
                cc.moveTo(0.3, this.nodeRedPacketInfos[0].position),
                cc.rotateTo(0.3, this.nodeRedPacketInfos[0].angle)
            ]))
            actions.push(cc.delayTime(0.2))
            const self = this.nodeRedPacketInfos[i]
            actions.push(cc.spawn([
                cc.moveTo(0.3, self.position),
                cc.rotateTo(0.3, -self.angle)
            ]))
            if (i == 0) {
                actions.push(cc.callFunc(() => {
                    this.playAniFinger()
                }))
            }
            this.$("nodeRedPacketBtn" + i).runAction(cc.sequence(actions))
        }
    }

    playAniFinger() {
        this.canButton = true
        if (DataManager.Instance.getOnlineParamSwitch("GameRedPacketAwardLaye_finger", 0) &&
            DataManager.CommonData["roleCfg"]["roundSum"] < 10 &&
            DataManager.load("GameRedPacketAwardLayer_Finger") == null) {
            DataManager.save("GameRedPacketAwardLayer_Finger", true)
            this.$("nodeAniFinger").active = true
        } else {
            this.$("nodeAniFinger").active = false
        }
    }

    onPressGetAward(event: cc.Event.EventTouch, data: number = 1) {
        cc.log("onPressGetAward", data, this.logic.redpacket_award_info)
        if (!this.canButton) {
            return
        }
        this.canButton = false
        cc.audioEngine.playEffect(DataManager.Instance.menuEffect, false)
        this.selectIndex = data
        this.nState = ADState.onClick
        this.$("nodeAniFinger").active = false

        if (this.logic.redpacket_award_info.ret == 1) {
            receiveAdAward(AdsConfig.taskAdsMap.DrawRedpacket, () => {
                if (!this.isValid) {
                    return
                }
                this.nState = ADState.getAward
                this.logic.proto_cg_get_redpackets_award_req_sender()
            }, null, null, this.getNextAdMethod())
        } else if (this.logic.redpacket_award_info.ret == 2) {
            this.onReciveData()
        }
    }

    onReciveData() {
        this.formatData()

        const data = this.awardData[0]
        this.refreshAwardAni(data.selectIndex, data.value, true)
    }

    formatData() {
        this.awardData = []

        this.awardData.push({
            itemIndex: this.logic.redpacket_award_info.cItemtype,
            value: this.logic.redpacket_award_info.nAmount,
            selectIndex: this.selectIndex,
        })

        const indexNumber = [0, 1, 2]
        indexNumber.splice(indexNumber.indexOf(this.selectIndex), 1)
        for (let i = 1; i < 3; i++) {
            const fakeitem = this.logic.redpacket_award_info.fakeItem.pop() || { nItemIndex: 0, nItemNum: 0 }
            this.awardData.push({
                itemIndex: fakeitem.nItemIndex,
                value: fakeitem.nItemNum,
                selectIndex: indexNumber.pop(),
            })
        }
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
            this["labelAvardValue" + data.selectIndex].$Label.string = "" + data.value
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

                this.showGetMotion(index, this.$("labelValue").position)
                this.showRedPacketRain()

                nodeRedPacketBtn.runAction(cc.sequence([
                    cc.delayTime(3),
                    cc.callFunc(() => {
                        this.onPressClose()
                    })
                ]))
            }),
            cc.scaleTo(duration, 1.2, 1.2),
        ]))
    }

    showGetMotion(index: number, dstPos: cc.Vec2, callback?: Function) {
        let srcPos = this["nodeRedPacketBtn" + index].position
        this.$("nodeMotionGetAni").position = srcPos
        this.$("nodeMotionGetAni").scale = 1
        this.$("motionGetAni", cc.MotionStreak).reset()

        let matchX = 0
        let matchY = 0
        if (index == 0) {
            matchX = -1 * math.random(100)
        } else if (index == 1) {
            matchX = math.random(200)
            matchX = matchX - 100
        } else if (index == 2) {
            matchX = math.random(100)
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
        this.$("nodeMotionGetAni").stopAllActions()
        this.$("nodeMotionGetAni").runAction(cc.sequence(actionList))
    }

    showRedPacketRain() {
        cc.log("showRedPacketRain")
        this.$("nodeRedPacketRain").active = true
        if (this.$("nodeRedPacketRain").childrenCount == 0) {
            cc.instantiate(this.prefab_repacket_rain).parent = this.$("nodeRedPacketRain")
        }
    }

    onPressClose() {
        this.closeSelf()
        if (this.initParam.callback) {
            this.initParam.callback()
        }
    }

    onCloseScene() {
        playADBanner(false, AdsConfig.banner.GameRedPacketAwardLayer_rpddz)
        NetManager.Instance.onMessage({ opcode: "GameResult_PopupManager" })
        // czcEvent("斗地主", "抽红包", ["直接关闭", "关闭广告", "领取"][this.nState])
    }

    onDestroy() {
        this._destroy = true
        
    }

    getNextAdMethod() {
        if (DataManager.CommonData.first == 1 && getAdLeftTimes(AdsConfig.taskAdsMap.DrawRedpacket) == getAdTotalTimes(AdsConfig.taskAdsMap.DrawRedpacket) && DataManager.Instance.getOnlineParamSwitch("GameRedPacketAwardLayer_first_free", 1)) {
            return 0
        }

        return getNextAdMethod(AdsConfig.taskAdsMap.DrawRedpacket)
    }

    //添加导量口子,位置需要重设
    initNavigateToMiniGame(){
        let parentNode = cc.find("nodeMain" ,this.node)
        CreateNavigateToMiniProgram(parentNode, cc.v2(527, -257))
    }
}
