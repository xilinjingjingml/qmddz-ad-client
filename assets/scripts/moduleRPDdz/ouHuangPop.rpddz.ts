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
export default class ouHuangPop extends BaseComponent {
    data = null
    cdTime:number
    onLoad() {
        this.cdTime = 3*60
        //1.倒计时 2.金豆数 3.实际金额 4.购买金额
        this.data = DataManager.Instance.ouHuangBox[0]
        this.countDown()
        cc.find("nodeMain/lbl_num", this.node).getComponent(cc.Label).string = numberFormat(this.data.content[0].num) + "金豆"
        cc.find("nodeMain/btn_buy/lbl", this.node).getComponent(cc.Label).string = this.data.price + "元"
        cc.find("nodeMain/btn_buy/lbl_1", this.node).getComponent(cc.Label).string = this.data.boxvalue + "元"
        playADBanner(false, AdsConfig.banner.All)//AdsConfig.banner.GameResultLayer_rpddz
        let t = 0.8
        cc.find("nodeMain/btn_buy", this.node).runAction(cc.repeatForever(cc.sequence([
            cc.scaleTo(t, 1.1).easing(cc.easeSineIn()),
            cc.scaleTo(t, 1).easing(cc.easeSineIn()),
        ])))
        //主动弹出两次
        // !(DataManager.load(DataManager.UserData.guid + "ouHuang_count_2" + TimeFormat("yyyy-mm-dd"))) && DataManager.save(DataManager.UserData.guid + "ouHuang_count_2" + TimeFormat("yyyy-mm-dd"), 2)
    }

    countDown(){
        const labelTime_h = cc.find("nodeMain/node_lblLayout_1/lbl_0", this.node).getComponent(cc.Label)
        const labelTime_m = cc.find("nodeMain/node_lblLayout_1/lbl_2", this.node).getComponent(cc.Label)
        const labelTime_s = cc.find("nodeMain/node_lblLayout_1/lbl_4", this.node).getComponent(cc.Label)
        if(this.cdTime > 0){
            this.node.runAction(cc.repeatForever(cc.sequence(
                cc.callFunc(() => {
                    // console.log("jin---cdTime", cdTime)
                    let h = String(Math.floor(this.cdTime / 3600))
                    let m = String(Math.floor(this.cdTime / 60 % 60))
                    let s = String(Math.floor(this.cdTime % 60))
                    h = Number(h) <= 0 ? "00" : Number(h) < 10 ? "0" + h : h
                    m = Number(m) <= 0 ? "00" : Number(m) < 10 ? "0" + m : m
                    s = Number(s) <= 0 ? "00" : Number(s) < 10 ? "0" + s : s

                    labelTime_h.string = h
                    labelTime_m.string = m
                    labelTime_s.string = s

                    this.cdTime--
                    if (this.cdTime <= 0) {
                        this.countDown()
                    }
                }),
                cc.delayTime(1)
            )))
        }else{
            this.closeSelf()
        }
    }

    onDestroy(){
        let count = DataManager.load(DataManager.UserData.guid + "ouHuang_count" + TimeFormat("yyyy-mm-dd"))
        DataManager.save(DataManager.UserData.guid + "ouHuang_count" + TimeFormat("yyyy-mm-dd"), Number(count) + 1)
        // let count_2 = DataManager.load(DataManager.UserData.guid + "ouHuang_count_2" + TimeFormat("yyyy-mm-dd"))
        // DataManager.save(DataManager.UserData.guid + "ouHuang_count_2" + TimeFormat("yyyy-mm-dd"), Number(count_2 - 1))
        // playADBanner(true, AdsConfig.banner.GameResultLayer_rpddz, ()=>{})
    }

    onCloseScene() {
        playADBanner(true, AdsConfig.banner.GameResultLayer_rpddz, ()=>{})
        NetManager.Instance.onMessage({ opcode: "GameResult_PopupManager" })
    }

    onPressBuy(){
        cc.audioEngine.playEffect(DataManager.Instance.menuEffect, false)
        console.log("jin---SuperWelfarePop onPressBuy:", this.data)
        //生成支付订单
        let self = this
        payOrder(this.data, () => {
            self.initParam["closeCallback"] = null
            let awards = []
            for (const iterator of this.data.content) {
                let award = {
                    index: iterator.idx,
                    num: iterator.num
                }
                awards.push(award)
            }
            DataManager.save(DataManager.UserData.guid + "ouHuang_buyed" + TimeFormat("yyyy-mm-dd"), true)
            showAwardResultPop(awards)
            sendReloadUserData()
            self.closeSelf()
        })
    }
}