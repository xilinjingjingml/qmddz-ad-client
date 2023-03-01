import { confusonFunc } from "../base/confusonFunc";
import BaseScene from "../base/baseScene/BaseScene";
import SceneManager from "../base/baseScene/SceneManager";
import DataManager from "../base/baseData/DataManager";
import { payOrder, czcEvent, checkChangeLuckyBox, numberFormat, showAwardResultPop } from "../base/BaseFuncTs";
import { sendReloadUserData } from "./LobbyFunc";
import { ITEM } from "../base/baseData/ItemConfig";
import { math } from "../base/utils/math";

const {ccclass, property} = cc._decorator;

@ccclass
export default class OneYuanBigBoxPop extends BaseScene {

    boxData = null
    //1.界面 2.数据 3.出现逻辑
    onOpenScene() {
        //todo 1.data 2.按钮动
        this.boxData = DataManager.Instance.OneYuanBigBoxs[0]
        if(this.initParam["isResultLayer"]) {
            cc.find("node_Main", this.node).setPosition(cc.v2(0, 0))
        }else{
            cc.find("node_Main", this.node).setScale(1.3, 1.3)
        }
        cc.find("node_Main/item_0/lbl_num", this.node).getComponent(cc.Label).string = this.boxData.content[2].num + "个看底牌"
        cc.find("node_Main/item_1/lbl_num", this.node).getComponent(cc.Label).string = this.boxData.content[0].num + "个记牌器"
        cc.find("node_Main/item_2/lbl_num", this.node).getComponent(cc.Label).string = this.boxData.content[1].num + "个超级加倍卡"
        
        cc.find("node_Main/btn_gaiReward", this.node).runAction(cc.repeatForever(cc.sequence(
            cc.scaleTo(0.6, 1.0),
            cc.scaleTo(0.6, 0.9)
        ))) 
    }

    onPressPay(){
        cc.audioEngine.playEffect(DataManager.Instance.menuEffect, false)
        //生成支付订单
        let self = this
        payOrder(this.boxData, () => {
            self.initParam["closeCallback"] = null
            let awards = []
            for (const iterator of this.boxData.content) {
                let award = {
                    index: iterator.idx,
                    num: iterator.num
                }
                awards.push(award)
            }
            showAwardResultPop(awards)
            sendReloadUserData()
            self.closeSelf()
        })
    }

}
