import BaseScene from "../base/baseScene/BaseScene";
import { payOrder } from "../base/BaseFuncTs";
import SceneManager from "../base/baseScene/SceneManager";
import DataManager from "../base/baseData/DataManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class QuickPayPop extends BaseScene {

    box = null

    onOpenScene() {
        if (DataManager.CommonData["gameServer"]) {
            DataManager.CommonData["needMoney"] = DataManager.CommonData["gameServer"]["level"] == 1 ? 10000 : 
                                                  DataManager.CommonData["gameServer"]["level"] == 2 ? 60000 : 100000
        }        
        
        let box = Object.assign(DataManager.Instance.NormalBoxs)
        box.sort((a, b) => a.content[0].num < b.content[0].num ? -1 : 1)

        for (const iterator of box) {
            if (iterator.content[0].num >= DataManager.CommonData["needMoney"]) {
                cc.find("gold_unenough/goldnum", this.node).getComponent(cc.Label).string = "x" + iterator.content[0].num / 1000 + ",000jd"       
                let btn = cc.find("btnBuy" + iterator.price, this.node)
                if (btn) {
                    btn.active = true
                }
                this.box = iterator
                break;
            }
        }
    }

    onCloseScene() {
    }

    onPressPay() {
        cc.audioEngine.playEffect(DataManager.Instance.menuEffect, false)
        if (this.initParam) {
            let self = this
            payOrder(this.box, () => {
                self.initParam["closeCallback"] = null
                self.closeSelf()
            })
        }
    }
}
