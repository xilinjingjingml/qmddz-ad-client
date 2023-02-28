import BaseScene from "../base/baseScene/BaseScene";

import SceneManager from "../base/baseScene/SceneManager";
import DataManager from "../base/baseData/DataManager";
import { payOrder, checkFirstBox, czcEvent } from "../base/BaseFuncTs";
import { sendReloadUserData } from "./LobbyFunc";

const {ccclass, property} = cc._decorator;

@ccclass
export default class FirstPayPop extends BaseScene {

    bFinish = false
    firstBox = null

    onOpenScene() {
        czcEvent("大厅", "首充礼包1", "打开首充礼包 " + (DataManager.CommonData["morrow"] <= 1 ? DataManager.CommonData["morrow"] + "天新用户" : "老用户"))
        this.firstBox = checkFirstBox()
        if (null == this.firstBox){
            // this.closeSelf()
            return
        }

        if (this.firstBox.content) {
            for (let val of this.firstBox.content) {
                if (val.idx == 0) 
                    this.node.getChildByName("goldNum").getComponent(cc.Label).string = "x" + val.num
                else if (val.idx == 365) 
                    this.node.getChildByName("redpacketNum").getComponent(cc.Label).string = "x" + val.num
            }
        }

        this.firstBox.type = 7
    }

    onPressPay() {
        czcEvent("大厅", "首充礼包2", "购买首充礼包 " + (DataManager.CommonData["morrow"] <= 1 ? DataManager.CommonData["morrow"] + "天新用户" : "老用户"))
        cc.audioEngine.playEffect(DataManager.Instance.menuEffect, false)
        // if (this.initParam) {
            let self = this
            payOrder(this.firstBox, () => {
                // for (const key in DataManager.CommonData["firstPayBox"]["boxid"]) {
                //     if (DataManager.CommonData["firstPayBox"]["boxid"][key] == this.firstBox.boxid) {
                //         delete DataManager.CommonData["firstPayBox"]["boxid"][key]
                //     }
                // } 
                self.initParam["closeCallback"] = null
                sendReloadUserData()
                self.closeSelf()
            })
        // }
    }

    onCloseScene() {
        czcEvent("大厅", "首充礼包3", "关闭首充礼包 " + (DataManager.CommonData["morrow"] <= 1 ? DataManager.CommonData["morrow"] + "天新用户" : "老用户"))
    }

}
