import BaseComponent from "../base/BaseComponent"
import { AdsConfig } from "../base/baseData/AdsConfig"
import DataManager from "../base/baseData/DataManager"
import { ITEM, ITEM_NAME } from "../base/baseData/ItemConfig"
import { czcEvent, iMessageBox, playADBanner, showAwardResultPop, CreateNavigateToMiniProgram, TimeFormat, payOrder, numberFormat } from "../base/BaseFuncTs"
import NetManager from "../base/baseNet/NetManager"
import { checkAdCanReceive, receiveAdAward, getAdLeftTimes, sendReloadUserData } from "../moduleLobby/LobbyFunc"
import AudioManager from "../moduleRPDdz/AudioManager.rpddz"
import GameLogic from "../moduleRPDdz/GameLogic.rpddz"
import { math } from "../base/utils/math"

const { ccclass } = cc._decorator

@ccclass
export default class SuperWelfarePop extends BaseComponent {
    data = null
    onOpenScene() {
        //0.弹出逻辑 1.close 2.buy 3.data 4.选择礼包（控制倍数） 5.判断当前超值福利类型 6.
        this.randomGiftBag(()=>{
            this.initUI()
        })
        //主动弹出两次
        !(DataManager.load(DataManager.UserData.guid + "superWelfare_count_2" + TimeFormat("yyyy-mm-dd"))) && DataManager.save(DataManager.UserData.guid + "superWelfare_count_2" + TimeFormat("yyyy-mm-dd"), 2)
        playADBanner(false, AdsConfig.banner.All)
    }

    initUI(){
        let sta:boolean = this.initParam.session == 1
        console.log("jin---SuperWelfarePop initUI:", sta)
        cc.find("nodeMain/title_1", this.node).active = sta
        cc.find("nodeMain/title_6", this.node).active = !sta

        cc.find("nodeMain/btn_buy/buy_1",this.node).active = sta
        cc.find("nodeMain/btn_buy/buy_6",this.node).active = !sta
        console.log("jin---initUI: ", this.data)
        const lbl_gold = cc.find("nodeMain/lbl_gold",this.node).getComponent(cc.Label)
        const lbl_jpaiqi = cc.find("nodeMain/lbl_jpaiqi",this.node).getComponent(cc.Label)
        Number(this.initParam.session) == 1 ? ( lbl_gold.string = "10W", lbl_jpaiqi.string = "5") : (lbl_gold.string = "60W", lbl_jpaiqi.string = "30")
        // if(this.initParam.isResultLayer)
        //     playADBanner(false, AdsConfig.banner.All)//AdsConfig.banner.GameResultLayer_rpddz
        let t = 0.8
        cc.find("nodeMain/btn_buy", this.node).runAction(cc.repeatForever(cc.sequence([
            cc.scaleTo(t, 1.1).easing(cc.easeSineIn()),
            cc.scaleTo(t, 1).easing(cc.easeSineIn()),
        ])))
    }

    randomGiftBag(callback){
        let tempdata = Number(this.initParam.session) == 1 ? DataManager.Instance.SuperWelfare_1 : DataManager.Instance.SuperWelfare_6
        
        console.log("jin---randomGiftBag: ", tempdata, this.data, this.initParam.session, typeof this.initParam.session)

        if(Number(this.initParam.session) == 1){
            let randomNum = math.random(0,362)
            if(randomNum > 0 && randomNum <= 220){
                this.data = tempdata[0]
                console.log("jin---randomGiftBag0")
            }else if(randomNum > 220 && randomNum <= 320){
                this.data = tempdata[1]
                console.log("jin---randomGiftBag1")
            }else if(randomNum > 320 && randomNum <= 350){
                this.data = tempdata[2]
                console.log("jin---randomGiftBag2")
            }else if(randomNum > 350 && randomNum <= 360){
                this.data = tempdata[3]
                console.log("jin---randomGiftBag3")
            }else if(randomNum > 360 && randomNum <= 362){
                this.data = tempdata[4]
                console.log("jin---randomGiftBag4")
            }
        }else{
            let randomNum = math.random(0,286)
            if(randomNum > 0 && randomNum <= 220){
                this.data = tempdata[0]
                console.log("jin---randomGiftBag0")
            }else if(randomNum > 220 && randomNum <= 270){
                this.data = tempdata[1]
                console.log("jin---randomGiftBag1")
            }else if(randomNum > 270 && randomNum <= 280){
                this.data = tempdata[2]
                console.log("jin---randomGiftBag2")
            }else if(randomNum > 280 && randomNum <= 285){
                this.data = tempdata[3]
                console.log("jin---randomGiftBag3")
            }else if(randomNum > 285 && randomNum <= 286){
                this.data = tempdata[4]
                console.log("jin---randomGiftBag4")
            }
        }

        
        callback && callback()
    }

    onPressBuy(){
        //TODO 购买成功不会再弹礼包（记录标记）
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
            // DataManager.save(DataManager.UserData.guid + "superWelfare_1" + TimeFormat("yyyy-mm-dd"), false)
            if(Number(this.initParam.session) == 1){
                DataManager.save(DataManager.UserData.guid + "superWelfare_1" + TimeFormat("yyyy-mm-dd"), false)
            }else{
                DataManager.save(DataManager.UserData.guid + "superWelfare_6" + TimeFormat("yyyy-mm-dd"), false)
            }
            showAwardResultPop(awards)
            sendReloadUserData()
            self.closeSelf()
        })
    }

    onDestroy() {
        let count_2 = DataManager.load(DataManager.UserData.guid + "superWelfare_count_2" + TimeFormat("yyyy-mm-dd"))
        DataManager.save(DataManager.UserData.guid + "superWelfare_count_2" + TimeFormat("yyyy-mm-dd"), Number(count_2 - 1))
        // if(this.initParam.isResultLayer)
        //     playADBanner(true, AdsConfig.banner.GameResultLayer_rpddz, ()=>{})
    }

    onCloseScene() {
        this.initParam["isResultLayer"] && playADBanner(true, AdsConfig.banner.GameResultLayer_rpddz, ()=>{})
        NetManager.Instance.onMessage({ opcode: "GameResult_PopupManager" })
        // this.node.runAction(
        //     cc.sequence(
        //         [cc.callFunc(() => { this.initParam["isResultLayer"] && playADBanner(true, AdsConfig.banner.GameResultLayer_rpddz, ()=>{}) }), 
        //             cc.delayTime(0.5), 
        //             cc.callFunc(() => { NetManager.Instance.onMessage({ opcode: "GameResult_PopupManager" }) })
        //         ]
        //     )
        // )
    }
}