import BaseScene from "../../base/baseScene/BaseScene";
import DataManager from "../../base/baseData/DataManager";
import { socialShare, screenshot } from "../../base/BaseFuncTs";
import SceneManager from "../../base/baseScene/SceneManager";
import { NodeExtends } from "../../base/extends/NodeExtends";

const {ccclass, property} = cc._decorator;

@ccclass
export default class CombinedLevelUpPop extends BaseScene {

    imgUrl: string = null

    onOpenScene() {
        this.initView()
    }

    initView() {
        let goods = DataManager.CommonData["CombinedGoods"]["1"]
        let node = cc.find("nodePop/item", this.node)
        if (goods) {
            let lv = ("0" + this.initParam.lv).slice(-2)
            let pic = goods[this.initParam.lv]
            NodeExtends.setNodeSprite({ node: node.getChildByName("item"), url: "moduleLobby/texture/combined/" + lv })
            let bgType = "bgg"
            if (this.initParam.lv > 20) 
                bgType = "bgy"
            else if (this.initParam.lv > 10) 
                bgType = "bgr"

            node.getChildByName(bgType).active = true;
            let lbls = node.getChildByName(bgType).getComponentsInChildren(cc.Label)
            lbls.map(i => i.string = "" + this.initParam.lv)

            cc.find("nodePop/desc", this.node).getComponent(cc.RichText).string = 
                "<color=#9098FF>解锁</c><color=#DF8B61> LV" + this.initParam.lv + " " + pic.name + " </c><color=#9098FF>头衔</c>"
        }
    }

    onPressShare() {
        let self = this

        let share = (path) => {            
            const shareData = {
                title: "新头衔解锁",
                imageUrl: path,
                withOpenId: true,
                callback: () => {self.closeSelf()}
            }
            socialShare(shareData) 
        }

        // app直接默认分享
        if (cc.sys.isNative) {
            share("")
            return
        }

        if (this.imgUrl) {
            share(this.imgUrl)
            return
        }

        this.node.runAction(cc.sequence([
            cc.delayTime(0.01),
            cc.callFunc(() => {
                screenshot(this.node.getChildByName("nodePop"), (success, path) => {
                    if (!success)
                        return
                    this.imgUrl = path
                    share(path)                 
                })
            })
        ]))
    }

    onCloseScene() {
        SceneManager.Instance.popScene("moduleLobby", "combined/CombinedLvRedpacket")
    }
}
