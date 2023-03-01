/**
 * Create by Jin on 2022/5.24
*/

import { confusonFunc } from "../base/confusonFunc";
import BaseScene from "../base/baseScene/BaseScene";
import SceneManager from "../base/baseScene/SceneManager";
import DataManager from "../base/baseData/DataManager";
import { payOrder, czcEvent, checkChangeLuckyBox, getShopBox, numberFormat, TimeFormat, showAwardResultPop, checkSuperSaleBox } from "../base/BaseFuncTs";
import { sendReloadUserData, isShowPayPage } from "./LobbyFunc";
import { ITEM } from "../base/baseData/ItemConfig";

const {ccclass, property} = cc._decorator;

@ccclass
export default class SuperSalePop extends BaseScene {
    boxData = null
    curTab = null
    //1.界面 2.数据 3.出现逻辑
    onOpenScene() {
        czcEvent("大厅-超级折扣-弹出")
        this.curTab = 2
        if(DataManager.Instance.SuperSaleBoxs.length == 0) this.closeSelf()
        // console.log("jin---SuperSaleBoxs: ", DataManager.Instance.SuperSaleBoxs)
        this.setBoxNum()
        this.setBtnGet()
        
    }

    //TODO LEFT
    onPressTab(event, data){
        // console.log("jin---onPressTab: ", event, data)
        // todo this.curTab不可点击
        this.curTab = data
        for(let i = 0;i < 3; i++){
            let tempNode = cc.find("nodeMain/node_left/layout/left_" + i, this.node)
            if(i == this.curTab){
                tempNode.getComponent(cc.Button).interactable = false
                tempNode.getChildByName("xuanzhonganniu01").active = true

                this.setBoxNum()
                this.setBtnGet()
            }else{
                tempNode.getComponent(cc.Button).interactable = true
                tempNode.getChildByName("xuanzhonganniu01").active = false
            }
        }
    }

    onPressGet(){
        // console.log("jin---onPressGet: ")
        cc.audioEngine.playEffect(DataManager.Instance.menuEffect, false)
        //生成支付订单
        let self = this
        payOrder(this.boxData, () => {
            self.initParam["closeCallback"] = null
            czcEvent("大厅-超级折扣-点击购买")
            getShopBox(2, ()=>{
                // self.closeSelf()
                self.setBtnGet()
                let awards = [
                ]
                for (const iterator of self.boxData.content) {
                    let award = {
                        index: iterator.idx,
                        num: iterator.num
                    }
                    awards.push(award)
                }
                showAwardResultPop(awards)
            })
            sendReloadUserData()
        })
    }

   
    
    setBtnGet(){
        if(checkSuperSaleBox(this.curTab)){
            cc.find("btn_buy", this.node).active = true
            cc.find("btn_over", this.node).active = false
        }else{
            cc.find("btn_buy", this.node).active = false
            cc.find("btn_over", this.node).active = true
        }
        
    }

    //TODO 改变礼包内容
    setBoxNum(){
        
        this.boxData = DataManager.Instance.SuperSaleBoxs[this.curTab]
        cc.find("nodeMain/node_left/layout/left_" + this.curTab, this.node).getComponent(cc.Button).interactable = false
        //1.金豆 2.记牌器 3.低至倍数 4.今日限购 5.getAward，原价格
        cc.find("nodeMain/node_gold/num", this.node).getComponent(cc.Label).string = numberFormat(this.boxData.content[0].num)
        cc.find("nodeMain/node_jipaiqi/num", this.node).getComponent(cc.Label).string = numberFormat(this.boxData.content[1].num)

        let zheNum : number = Number((Number(this.boxData.price / this.boxData.boxvalue)).toFixed(3)) * 1000
        zheNum = Number((Math.floor(zheNum)/100).toFixed(1))
        
        cc.find("nodeMain/node_zhong/lbl_4", this.node).getComponent(cc.Label).string = "" + zheNum
        cc.find("nodeMain/node_zhong/lbl_2", this.node).getComponent(cc.Label).string = "" + 1 + "次"
        //TODO 按钮sta
        cc.find("btn_buy/payNum/lbl_num", this.node).getComponent(cc.Label).string = "" + this.boxData.price
        cc.find("btn_buy/originalPrice/lbl_0", this.node).getComponent(cc.Label).string = "原价" + this.boxData.boxvalue + "元"
    }
    onDestroy(){
        czcEvent("大厅-超级折扣-关闭")
    }
}

