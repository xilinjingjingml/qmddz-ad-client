import { confusonFunc } from "../base/confusonFunc";
import BaseScene from "../base/baseScene/BaseScene";
import SceneManager from "../base/baseScene/SceneManager";
import DataManager from "../base/baseData/DataManager";
import { payOrder, czcEvent, checkChangeLuckyBox, numberFormat, ToFreeGetPropPop, showAwardResultPop, iMessageBox, playADBanner } from "../base/BaseFuncTs";
import { sendReloadUserData, checkAdCanReceive, receiveAdAward } from "./LobbyFunc";
import { ITEM } from "../base/baseData/ItemConfig";
import { math } from "../base/utils/math";
import { AdsConfig } from "../base/baseData/AdsConfig";
import NetManager from "../base/baseNet/NetManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class OneYuanBigBoxPopNew extends BaseScene {
    boxData = null
    curBoxData = null
    adIndex = null
    curTab:number = -1
    tabSort = null
    isBuyed = null
    //1.界面 2.数据 3.出现逻辑
    onOpenScene() {
        this.isBuyed = false
        this.boxData = DataManager.Instance.OneYuanBigBoxs
        this.tabSort = DataManager.Instance.onlineParam.tabSort
        this.initTab()
        this.adIndex = AdsConfig.taskAdsMap.BigBox
        // if(this.initParam["isResultLayer"]) {
        //     cc.find("nodeMain", this.node).setPosition(cc.v2(0, 85))
        //     cc.find("nodeMain", this.node).setScale(0.8, 0.8)
        // }else{
        //     // cc.find("nodeMain", this.node).setScale(1.3, 1.3)
        // }
        console.log("jin---boxData: ", this.boxData)
        // cc.find("nodeMain/node_superAdd/num", this.node).getComponent(cc.Label).string = "x" + this.boxData.content[1].num
        // cc.find("nodeMain/node_card/num", this.node).getComponent(cc.Label).string = "x" + this.boxData.content[2].num
        // cc.find("nodeMain/node_jipaiqi/num", this.node).getComponent(cc.Label).string = "x" + this.boxData.content[0].num
        
        cc.find("nodeMain/btn_buy", this.node).runAction(cc.repeatForever(cc.sequence(
            cc.scaleTo(0.6, 1.0),
            cc.scaleTo(0.6, 0.9)
        ))) 
        playADBanner(false, AdsConfig.banner.All)
    }

    //TODO 左侧 tab
    initTab(){
        let firstSta = false
        const layout = cc.find("nodeMain/node_left/layout", this.node)
        const model = cc.find("nodeMain/left_item", this.node)
        // const item = cc.instantiate(model)
        console.log("jin---initTab")
        //TODO 
        let tempTab = ''
        for(let curIndex in this.tabSort){
            for(let curBoxIndex in DataManager.Instance.OneYuanBigBoxs){
                if(DataManager.Instance.OneYuanBigBoxs[curBoxIndex].boxname.indexOf(this.tabSort[curIndex]) != -1){
                    const item = cc.instantiate(model)
                    item.active = true
                    item.setPosition(cc.v2(14, 0))
                    cc.find("num", item).getComponent(cc.Label).string = this.tabSort[curIndex] + "礼包"
                    item.parent = layout
                    const event = new cc.Component.EventHandler()
                    event.target = this.node
                    event.component = "OneYuanBigBoxPopNew"
                    event.handler = "setTab"
                    event.customEventData = this.tabSort[curIndex] as any
                    item.getComponent(cc.Button).clickEvents.push(event)
                    !firstSta && (cc.find("xuanzhonganniu01", item).active = true, tempTab = this.tabSort[curIndex], this.curTab = Number(curIndex), this.curBoxData = DataManager.Instance.OneYuanBigBoxs[curBoxIndex], firstSta = true)
                    item.getComponent(cc.Button).interactable = true
                    continue
                }

                // if(curBox.boxname.indexOf("免费至尊") != -1){
                //     cc.find("left_free", layout).active = true
                //     !firstSta && (cc.find("left_free/xuanzhonganniu01",layout).active = true, this.curTab = 0, this.curBoxData = curBox, firstSta = true)
                //     cc.find("left_free", layout).getComponent(cc.Button).interactable = true

                // }
                // if(curBox.boxname.indexOf("3元至尊") != -1){
                //     cc.find("left_3", layout).active = true
                //     !firstSta && (cc.find("left_3/xuanzhonganniu01",layout).active = true, this.curTab = 2, this.curBoxData = curBox, firstSta = true)
                //     cc.find("left_3", layout).getComponent(cc.Button).interactable = true

                // }
            }
        }
        
        this.setItem(tempTab)
        this.setContent(tempTab)
        
    }

    setTab(event, data){
        const layout = cc.find("nodeMain/node_left/layout", this.node)
        for(let i = 0; i < layout.children.length; i++){
            cc.find("xuanzhonganniu01", layout.children[i]).active = false
        }
        if(data == this.tabSort[0]){
            cc.find("xuanzhonganniu01", layout.children[0]).active = true
            // cc.find("xuanzhonganniu01", layout.children[0]).active = true
            this.curTab = 0
        }else if(data == this.tabSort[1]){
            cc.find("xuanzhonganniu01", layout.children[1]).active = true
            // cc.find("left_1/xuanzhonganniu01", layout).active = true
            this.curTab = 1
        }else if(data == this.tabSort[2]){
            cc.find("xuanzhonganniu01", layout.children[2]).active = true
            // cc.find("left_3/xuanzhonganniu01", layout).active = true
            this.curTab = 2
        }
        this.setItem(data)
        this.setContent(data)
    }



    onPressPay(){
        console.log("jin---onPressPay: ", this.curBoxData)
        cc.audioEngine.playEffect(DataManager.Instance.menuEffect, false)
        //生成支付订单
        let self = this
        payOrder(this.curBoxData, () => {
            self.initParam["closeCallback"] = null
            let awards = []
            for (const iterator of this.curBoxData.content) {
                let award = {
                    index: iterator.idx,
                    num: iterator.num
                }
                awards.push(award)
            }
            showAwardResultPop(awards)
            sendReloadUserData()
            this.isBuyed = true
            self.closeSelf()
        })
    }

    setItem(data){
        cc.find("nodeMain/mianfei1", this.node).active = false
        cc.find("nodeMain/yiyuan0", this.node).active = false
        cc.find("nodeMain/yiyuan1", this.node).active = false
        cc.find("nodeMain/yiyuan3", this.node).active = false
            
        cc.find("nodeMain/mianfei1", this.node).active = data=="免费至尊"
        cc.find("nodeMain/yiyuan0", this.node).active = data=="免费至尊"
        cc.find("nodeMain/yiyuan1", this.node).active = data=="1元至尊"
        cc.find("nodeMain/yiyuan3", this.node).active = data=="3元至尊"
        //todo 1.title 2.content  3.button
        if(this.curTab == 0){
            cc.find("nodeMain/mianfei1", this.node).active = true
            cc.find("nodeMain/yiyuan0", this.node).active = true
        }else if(this.curTab == 1){
            cc.find("nodeMain/yiyuan1", this.node).active = true
        }else if(this.curTab == 2){
            cc.find("nodeMain/yiyuan3", this.node).active = true
        }
    }

    setContent(data){
        let tabSort = ["3元至尊", "1元至尊", "免费至尊"]
        // item.getComponent(cc.Button).clickEvents.customEventData
        // console.log("jin---setContent: ", this.curTab)
        cc.find("nodeMain/mianfei1", this.node).active = false
        cc.find("nodeMain/yiyuan0", this.node).active = false
        cc.find("nodeMain/yiyuan1", this.node).active = false
        cc.find("nodeMain/yiyuan3", this.node).active = false

        for(let curBox of this.boxData){
            // for(let curIndex in tabSort){
                if(curBox.boxname.indexOf(data) != -1 ){
                    cc.find("nodeMain/mianfei1", this.node).active = data=="免费至尊"
                    cc.find("nodeMain/yiyuan0", this.node).active = data=="免费至尊"
                    cc.find("nodeMain/yiyuan1", this.node).active = data=="1元至尊"
                    cc.find("nodeMain/yiyuan3", this.node).active = data=="3元至尊"
                    cc.find("nodeMain/node_superAdd/num", this.node).getComponent(cc.Label).string = curBox.content[1].num
                    cc.find("nodeMain/node_card/num", this.node).getComponent(cc.Label).string = curBox.content[2].num
                    cc.find("nodeMain/node_jipaiqi/num", this.node).getComponent(cc.Label).string = curBox.content[0].num

                    cc.find("nodeMain/btn_buy/payNum/lbl_num", this.node).getComponent(cc.Label).string = curBox.price
                    cc.find("nodeMain/btn_buy/originalPrice/lbl_0", this.node).getComponent(cc.Label).string = "原价" + curBox.boxvalue + "元"
                    this.curBoxData = curBox
                // }
            }
            
        }





        // for(let curBox of this.boxData){
        //     if(curBox.boxname.indexOf("免费至尊") != -1){
        //         cc.find("nodeMain/mianfei1", this.node).active = true
        //         cc.find("nodeMain/yiyuan0", this.node).active = true
        //         cc.find("nodeMain/node_superAdd/num", this.node).getComponent(cc.Label).string = curBox.content[1].num
        //         cc.find("nodeMain/node_card/num", this.node).getComponent(cc.Label).string = curBox.content[2].num
        //         cc.find("nodeMain/node_jipaiqi/num", this.node).getComponent(cc.Label).string = curBox.content[0].num

        //         cc.find("nodeMain/btn_buy/payNum/lbl_num", this.node).getComponent(cc.Label).string = curBox.price
        //         cc.find("nodeMain/btn_buy/originalPrice/lbl_0", this.node).getComponent(cc.Label).string = "原价" + curBox.boxvalue + "元"
        //         this.curBoxData = curBox
        //     }
        //     if(curBox.boxname.indexOf("1元至尊") != -1){
        //         cc.find("nodeMain/yiyuan1", this.node).active = true
        //         cc.find("nodeMain/node_superAdd/num", this.node).getComponent(cc.Label).string = curBox.content[1].num
        //         cc.find("nodeMain/node_card/num", this.node).getComponent(cc.Label).string = curBox.content[2].num
        //         cc.find("nodeMain/node_jipaiqi/num", this.node).getComponent(cc.Label).string = curBox.content[0].num

        //         cc.find("nodeMain/btn_buy/payNum/lbl_num", this.node).getComponent(cc.Label).string = curBox.price
        //         cc.find("nodeMain/btn_buy/originalPrice/lbl_0", this.node).getComponent(cc.Label).string = "原价" + curBox.boxvalue + "元"
        //         this.curBoxData = curBox
        //     }
        //     if(curBox.boxname.indexOf("3元至尊") != -1){
        //         cc.find("nodeMain/yiyuan3", this.node).active = true
        //         cc.find("nodeMain/node_superAdd/num", this.node).getComponent(cc.Label).string = curBox.content[1].num
        //         cc.find("nodeMain/node_card/num", this.node).getComponent(cc.Label).string = curBox.content[2].num
        //         cc.find("nodeMain/node_jipaiqi/num", this.node).getComponent(cc.Label).string = curBox.content[0].num

        //         cc.find("nodeMain/btn_buy/payNum/lbl_num", this.node).getComponent(cc.Label).string = curBox.price
        //         cc.find("nodeMain/btn_buy/originalPrice/lbl_0", this.node).getComponent(cc.Label).string = "原价" + curBox.boxvalue + "元"
        //         this.curBoxData = curBox
        //     }
        // }
    }

    onPressAdGet(){
        if (checkAdCanReceive(this.adIndex)) {
            // receiveAdAward(this.adIndex, () => {
            //     // this.isBusy = true
            //     // getLuckyLotteryAward((res) => {
            //     //     console.log("jin---getLuckyLotteryAward: ", res)
            //     //     if (this.isValid) {
            //     //         if (res && res.ret == 0) {
            //     //             //todo 记录时间
            //     //             DataManager.save(LOTTERY_TIME_KEY, accurateTime())
            //     //             this.updateLotteryStatus()
            //     //             this.showLotteryResult(res.awardId)
            //     //         } else {
            //     //             this.isBusy = false
            //     //             iMessageBox(res ? res.msg : "请求失败")
            //     //         }
            //     //     }
            //     // })
            // }, null, false)
        } else {
            iMessageBox("抽奖次数已用完")
        }
    }

    onDestroy() {
        if(this.initParam["isResultLayer"]) {
            // playADBanner(true, AdsConfig.banner.GameResultLayer_rpddz, ()=>{})
            if(!this.isBuyed){
                this.initParam["callback"] && this.initParam["callback"]()
            }else{
                this.initParam["successCallback"] && this.initParam["successCallback"]()
            }
        }
            
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

