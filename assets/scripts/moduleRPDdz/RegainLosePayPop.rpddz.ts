import BaseComponent from "../base/BaseComponent"
import { AdsConfig } from "../base/baseData/AdsConfig"
import DataManager from "../base/baseData/DataManager"
import { ITEM, ITEM_NAME } from "../base/baseData/ItemConfig"
import { czcEvent, iMessageBox, playADBanner, showAwardResultPop, CreateNavigateToMiniProgram,numberFormat, payOrder, TimeFormat } from "../base/BaseFuncTs"
import NetManager from "../base/baseNet/NetManager"
import { checkAdCanReceive, receiveAdAward, sendReloadUserData } from "../moduleLobby/LobbyFunc"
import AudioManager from "./AudioManager.rpddz"
import GameLogic from "./GameLogic.rpddz"

const { ccclass } = cc._decorator

@ccclass
export default class RegainLosePayPop extends BaseComponent {
    payData = null
    curBox:number = -1
    money:number = -1
    regainLose: Iproto_gc_regain_lose_score_ack
    _destroy: boolean = false
    fakeTime: number = -1
    btn_close: any
    onLoad() {
        // console.log("jin---initParam: ", this.initParam)  ,"1";{120000,400000}
        this.payData = DataManager.Instance.RegainLosePayBoxs
        this.regainLose = GameLogic.Instance().gamescene.regainLose
        let money = 0
        this.regainLose.nValue.forEach(n => money += n)
        this.money = money
        money = Math.abs(this.initParam[0].nScore)

        const regainLosePayBox = DataManager.Instance.onlineParam.regainLosePayBox
        for(const curIdx in regainLosePayBox){
            if(money >= regainLosePayBox[curIdx][0] && money < regainLosePayBox[curIdx][1]){
                this.curBox = Number(curIdx)
            }else if(money >= regainLosePayBox[curIdx][1]){
                this.curBox = 5
            }
        }
        // if(money >= 50000 && money < 120000){
        //     this.curBox = 0
        // }else if(money >= 120000 && money < 400000){
        //     this.curBox = 1
        // }else if(money >= 400000 && money < 1000000){
        //     this.curBox = 2
        // }else if(money >= 1000000 && money < 2500000){
        //     this.curBox = 3
        // }else if(money >= 2500000 && money < 6000000){
        //     this.curBox = 4
        // }else if(money >= 6000000 && money < 12000000){
        //     this.curBox = 5
        // }
        // else if(money >= 12000000 && money < 30000000){
        //     this.curBox = 6
        // }else if(money >= 30000000 && money < 100000000){
        //     this.curBox = 7
        // }else if(money >= 100000000 && money < 200000000){
        //     this.curBox = 8
        // }
        
        this.payData = DataManager.Instance.RegainLosePayBoxs[this.curBox]
        console.log("jin---money: ", this.money, this.payData, this.regainLose)
        cc.find("nodeMain/item_1/lbl_num", this.node).getComponent(cc.Label).string = this.payData.content[0].num//"" + numberFormat(this.payData.content[0].num)
        //TODO 剩余次数
        // !(DataManager.load(DataManager.UserData.guid + "RegainLoseCount")) && DataManager.save(DataManager.UserData.guid + "RegainLoseCount" , 5)
        // console.log("jin---lbl_1: ",  DataManager.load(DataManager.UserData.guid + "RegainLosePayCount" + TimeFormat("yyyy-mm-dd")))
        // cc.find("nodeMain/node_sheng/lbl_1", this.node).getComponent(cc.Label).string = "" + DataManager.load(DataManager.UserData.guid + "RegainLosePayCount" + TimeFormat("yyyy-mm-dd"))
        cc.find("nodeMain/item_0/lbl_num", this.node).getComponent(cc.Label).string = "" + this.money// + "万"
        cc.find("btn_getReward/node_num/lbl_num", this.node).getComponent(cc.Label).string = "" + this.payData.boxvalue//实际销售金额

        //倒计时
        let time = this.regainLose.nTime
        this.fakeTime = 30
        this.setClock()
        let t = 0.8
        cc.find("btn_getReward", this.node).runAction(cc.repeatForever(cc.sequence([
            cc.scaleTo(t, 1.1).easing(cc.easeSineIn()),
            cc.scaleTo(t, 1).easing(cc.easeSineIn()),
        ])))
        this.node.runAction(cc.sequence([cc.callFunc(() => { this.btn_close.active = false }), cc.delayTime(2), cc.callFunc(() => { this.btn_close.active = true })]))
        

        // console.log("jin---fakeTime: ", this.fakeTime)
        // const next = () => {
        //     this.$("lbl_time", cc.Label).string = "" + this.fakeTime // + "s"
        //     this.$("node_time").active = this.fakeTime > 0
        //     this.fakeTime--

        //     // time--
        //     if (this.fakeTime < 0) {
        //         DataManager.save(DataManager.UserData.guid + "RegainLosePayCount" , Number(DataManager.load(DataManager.UserData.guid + "RegainLosePayCount")) - 1)
        //         this.closeSelf()
        //     }
        // }
        // next()
        // this.unscheduleAllCallbacks()
        // this.schedule(next, 1)
    }

    start() {
        // czcEvent("斗地主", "对局免输", "打开")
        // playADBanner(true, AdsConfig.banner.RegainLose, ()=>{
        //     if (!this || !this.node || !this.node.isValid || this._destroy) {
        //         playADBanner(false, AdsConfig.banner.RegainLose)
        //     }
        // })
        playADBanner(false, AdsConfig.banner.All)//AdsConfig.banner.GameResultLayer_rpddz
    }

    onDestroy() {
        this._destroy = true
        // playADBanner(false, AdsConfig.banner.RegainLose)
        playADBanner(true, AdsConfig.banner.GameResultLayer_rpddz, ()=>{})
    }

    onPressGet() {
        cc.audioEngine.playEffect(DataManager.Instance.menuEffect, false)
        //生成支付订单
        this.payOrder()
        this.unscheduleAllCallbacks()
        // this.proto_cg_regain_lose_score_req()
    }

    payOrder(){
        let self = this
        payOrder(this.payData, () => {
            self.proto_cg_regain_lose_score_req()
            // cc.log("jin---success: ", this.payData)
        },()=>{
            this.setClock()
        })
    }

    proto_cg_regain_lose_score_req() {
        // this.nState = 2
        GameLogic.Instance().sendMessage<Iproto_cg_regain_lose_score_req>({
            opcode: 'proto_cg_regain_lose_score_req',
            nOp: 1,
            nItemIndex: ITEM.CARD_RECORD,
            nItemNum: 0
        })
    }

    proto_gc_regain_lose_score_ack(event) {
        let self = this
        const message: Iproto_gc_regain_lose_score_ack = event.packet
        // cc.log("jin---regain_lose: ", message)
        if (message.nRet == 0) {
            cc.log("倒计时剩余", message.nTime)
        } else if (message.nRet == 1) {
            // console.log("jin---proto_gc_regain_lose_score_ack 2:")
            //todo 返還
            self.initParam["closeCallback"] = null
            let awards = []
            for (const iterator of this.payData.content) {
                let tempNum = iterator.num
                if(ITEM.GOLD_COIN == iterator.idx){
                    tempNum += this.money
                }
                let award = {
                    index: iterator.idx,
                    num: tempNum
                }
                awards.push(award)
            }

            showAwardResultPop(awards)
            sendReloadUserData()
            DataManager.save(DataManager.UserData.guid + "RegainLosePayCount" + TimeFormat("yyyy-mm-dd") , Number(DataManager.load(DataManager.UserData.guid + "RegainLosePayCount" + TimeFormat("yyyy-mm-dd"))) - 1)
            self.closeSelf()
            // const awards = [{ index: ITEM.GOLD_COIN, num: this.regainLose.nValue[this.regainLose.nCurCount] }]
            // if (message.nItemIndex >= 0 && message.nItemIndex < 10000 && message.nItemNum > 0) {
            //     if (message.nItemIndex == awards[0].index) {
            //         awards[0].num += message.nItemNum
            //     } else {
            //         awards.push({ index: message.nItemIndex, num: message.nItemNum })
            //     }
            // }
            // showAwardResultPop(awards)
            // sendReloadUserData()
            // this.closeSelf()
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

    setClock(){
        // console.log("jin---fakeTime: ", this.fakeTime)
        
        const node_time = cc.find("nodeMain/node_time", this.node)//this.$("node_time")
        const lbl_time = cc.find("lbl_time", node_time).getComponent(cc.Label)
        let next = () => {
            lbl_time.string = "" + this.fakeTime + "s"
            node_time.active = this.fakeTime > 0
            this.fakeTime--
            // console.log("jin---lose pay time going")
            // time--
            if (this.fakeTime < 0) {
                DataManager.save(DataManager.UserData.guid + "RegainLosePayCount" + TimeFormat("yyyy-mm-dd") , Number(DataManager.load(DataManager.UserData.guid + "RegainLosePayCount" + TimeFormat("yyyy-mm-dd"))) - 1)
                console.log("jin---lose pay time over")
                this.closeSelf()
            }
        }
        next()
        this.unscheduleAllCallbacks()
        this.schedule(next, 1)
    }

}