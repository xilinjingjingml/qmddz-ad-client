import DataManager from "../base/baseData/DataManager"
import { checkFirstBox, getShopBox, payOrder } from "../base/BaseFuncTs"
import BaseScene from "../base/baseScene/BaseScene"

const { ccclass } = cc._decorator

@ccclass
export default class DayCardPop extends BaseScene {

    onPressBuy() {
        cc.audioEngine.playEffect(DataManager.Instance.menuEffect, false)
        payOrder(checkFirstBox(1), ()=>{
            getShopBox(7)
            this.closeSelf()
        })
    }
}
