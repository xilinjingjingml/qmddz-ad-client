import BaseScene from "../base/baseScene/BaseScene";

import SceneManager from "../base/baseScene/SceneManager";
import DataManager from "../base/baseData/DataManager";
import { payOrder, checkFirstBox, getShopBox, czcEvent } from "../base/BaseFuncTs";
import { sendReloadUserData } from "./LobbyFunc";

const {ccclass, property} = cc._decorator;

@ccclass
export default class OneYuanPop extends BaseScene {

    bFinish = false
    box = null

    onOpenScene() {
        czcEvent("大厅", "1元福利1", "打开界面 " + DataManager.Instance.userTag)
        if (null == DataManager.Instance.OneYuanBoxs || 0 == DataManager.Instance.OneYuanBoxs.length){
            this.closeSelf()
            return
        }

        for (let box of DataManager.Instance.OneYuanBoxs) {
            if (box.price == 1 && box.havePhone == 0) {
                this.box = Object.assign(box)
                break;
            }
        }

        this.node.getChildByName("btnFirstPay").active = this.box["isBuy"] == 0
        this.node.getChildByName("btnFirstPayClose").active = this.box["isBuy"] != 0
        this.box.type = 2

        DataManager.CommonData[DataManager.UserData.guid + "OneYuanPop"] = true
    }

    onCloseScene() {
        czcEvent("大厅", "1元福利2", "关闭界面 " + DataManager.Instance.userTag)
    }

    onPressPay() {
        czcEvent("大厅", "1元福利3", "点击支付 " + DataManager.Instance.userTag)
        cc.audioEngine.playEffect(DataManager.Instance.menuEffect, false)
        let self = this
        
        payOrder(this.box, () => {
            self.initParam["closeCallback"] = null
            sendReloadUserData()
            self.closeSelf()
        })
    }
}
