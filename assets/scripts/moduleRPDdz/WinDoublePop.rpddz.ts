import BaseComponent from "../base/BaseComponent"
import { AdsConfig } from "../base/baseData/AdsConfig"
import DataManager from "../base/baseData/DataManager"
import { czcEvent, playADBanner, showAwardResultPop, CreateNavigateToMiniProgram, TimeFormat } from "../base/BaseFuncTs"
import NetManager from "../base/baseNet/NetManager"
import { getAdLeftTimes, receiveAdAward, sendReloadUserData } from "../moduleLobby/LobbyFunc"
import AudioManager from "./AudioManager.rpddz"
import GameLogic from "./GameLogic.rpddz"

const { ccclass } = cc._decorator

@ccclass
export default class WinDoublePop extends BaseComponent {
    initParam: Iproto_gc_win_doubel_req
    is_get: boolean = false
    _destroy: boolean = false
    fakeTime: number = -1
    onLoad() {
        // czcEvent("斗地主", "赢金翻倍", "打开")
        if (DataManager.Instance.getOnlineParamSwitch("game_mask")) {
            this.node.getChildByName("mask").getComponent(cc.Button).interactable = false
        }
        if (DataManager.Instance.getOnlineParamSwitch("WinDoubleCloseABTest", 1)) {
            this.node.runAction(cc.sequence([cc.callFunc(() => { this.$("btnClose").active = false }), cc.delayTime(3), cc.callFunc(() => { this.$("btnClose").active = true })]))
        }

        this.$("node_add_money").active = this.initParam.nAddProbabily > 0
        this.$("label_add_money", cc.Label).string = this.initParam.nAddAmount + "w"
        console.log("jin---lbl_getCount: ", getAdLeftTimes(AdsConfig.taskAdsMap.WinDouble), DataManager.load(DataManager.UserData.guid + "WinDoubleCount" + TimeFormat("yyyy-mm-dd")))
        this.$("lbl_getCount", cc.Label).string = String(getAdLeftTimes(AdsConfig.taskAdsMap.WinDouble) - Number(DataManager.load(DataManager.UserData.guid + "WinDoubleCount" + TimeFormat("yyyy-mm-dd"))) + 1)

        let t = 0.8
        this.$("node_add_money").runAction(cc.repeatForever(cc.sequence([
            cc.scaleTo(t, 1.1).easing(cc.easeSineIn()),
            cc.scaleTo(t, 1).easing(cc.easeSineIn()),
        ])))
        
        //倒计时

        // let time = this.regainLose.nTime
        // let fakeTime = 30//Math.min(time, 30)
        // const next = () => {
        //     this.$("lbl_time", cc.Label).string = "" + fakeTime // + "s"
        //     this.$("node_time").active = fakeTime > 0
        //     fakeTime--

        //     // time--
        //     if (fakeTime < 0) {
        //         DataManager.save(DataManager.UserData.guid + "WinDoubleCount" , Number(DataManager.load(DataManager.UserData.guid + "WinDoubleCount")) + 1)
        //         this.closeSelf()
        //     }
        // }
        // next()
        // this.unscheduleAllCallbacks()
        // this.schedule(next, 1)
        this.fakeTime = 30
        this.setClock()

        this.initNavigateToMiniGame()
    }

    start() {
        playADBanner(false, AdsConfig.banner.All)//AdsConfig.banner.GameResultLayer_rpddz
        // playADBanner(true, AdsConfig.banner.WinDouble, ()=>{
        //     if (!this || !this.node || this._destroy) {//|| !this.node.isValid
        //         playADBanner(false, AdsConfig.banner.WinDouble)
        //     }
        // })
    }

    onPressGet(sender: cc.Event.EventTouch) {
        // czcEvent("斗地主", "赢金翻倍", "点击")
        // this.$("add_money_probability").active = this.initParam.nAddProbabily > 0
        czcEvent("游戏-赢币暴击-点击领取")
        this.unscheduleAllCallbacks()
        receiveAdAward(AdsConfig.taskAdsMap.WinDouble, () => {
            this.proto_cg_win_doubel_req()
            czcEvent("游戏-赢币暴击-看视频成功")
        }, null, true, 2, true, ()=>{
            czcEvent("游戏-赢币暴击-看视频取消")
            this.setClock()
        })
    }

    proto_cg_win_doubel_req() {
        // czcEvent("斗地主", "赢金翻倍", "领取请求")
		AudioManager.playButtonSound()
        this.is_get = true
        GameLogic.Instance().sendMessage<Iproto_cg_win_doubel_req>({
            opcode: 'proto_cg_win_doubel_req',
        })
    }

    proto_gc_win_doubel_ack(event: { packet: Iproto_gc_win_doubel_ack }) {
        const message = event.packet
        console.log("jin---proto_gc_win_doubel_ack: ", message)
        if (message.cRet == 0) {
            // czcEvent("斗地主", "赢金翻倍", "领取成功")
            const awards = []
            message.vecItemInfo.forEach(info => awards.push({ index: info.nItemIndex, num: info.nItemNum }))
            showAwardResultPop(awards)
            sendReloadUserData()
        } else {
            // czcEvent("斗地主", "赢金翻倍", "领取失败" + message.cRet)
        }
        this.closeSelf()
    }

    // onBannerResize(msg) {
    //     const box = cc.find("nodePop/label", this.node).getBoundingBoxToWorld()
    //     const diff = msg.rect.height - box.y - 30
    //     if (diff > 0) {
    //         cc.find("nodePop", this.node).y += diff
    //     }
    // }

    onCloseScene() {
        playADBanner(true, AdsConfig.banner.GameResultLayer_rpddz, ()=>{})
        NetManager.Instance.onMessage({ opcode: "GameResult_PopupManager" })
        // this.node.runAction(
        //     cc.sequence(
        //         [cc.callFunc(() => { playADBanner(true, AdsConfig.banner.GameResultLayer_rpddz, ()=>{}) }), 
        //             cc.delayTime(0.5), 
        //             cc.callFunc(() => { NetManager.Instance.onMessage({ opcode: "GameResult_PopupManager" }) })
        //         ]
        //     )
        // )
        // czcEvent("斗地主", "赢金翻倍", "关闭")
    }

    onDestroy() {
        // if (!this.is_get) {
        //     receiveAdAward(AdsConfig.taskAdsMap.WinDouble, null, null, false, 0)
        // }
        this._destroy = true
        // playADBanner(false, AdsConfig.banner.WinDouble)
        // playADBanner(true, AdsConfig.banner.GameResultLayer_rpddz, ()=>{})
    }

    //TODO 添加导量口子,位置需要重设
    initNavigateToMiniGame(){
        let parentNode = cc.find("nodePop" ,this.node)
        CreateNavigateToMiniProgram(parentNode, cc.v2(527, -327))
    }

    setClock(){
        let self = this
        let next = () => {
            // console.log("jin---self.fakeTime: ", self.fakeTime)
            self.$("lbl_time", cc.Label).string = "" + self.fakeTime// + "s"
            self.$("node_time").active = self.fakeTime > 0
            self.fakeTime--
            console.log("jin---win ad time going")
            // time--
            if (self.fakeTime < 0) {
                DataManager.save(DataManager.UserData.guid + "WinDoubleCount" + TimeFormat("yyyy-mm-dd") , Number(DataManager.load(DataManager.UserData.guid + "WinDoubleCount" + TimeFormat("yyyy-mm-dd"))) + 1)
                console.log("jin---win ad time over")
                self.closeSelf()
            }
        }
        next()
        self.unscheduleAllCallbacks()
        self.schedule(next, 1)
    }
}
