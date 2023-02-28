import BaseScene from "../base/baseScene/BaseScene";
import { copyToClipBoard } from "../base/BaseFuncTs";
import DataManager from "../base/baseData/DataManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ExchangeSuccPop extends BaseScene {

    onOpenScene() {
        if (this.initParam) {
            let labelDesc = cc.find("nodePop/desc", this.node)
            if(!!labelDesc) {
                labelDesc.getComponent(cc.Label).string = this.initParam.boxName + "兑换成功, 快与朋友们分享这份喜悦吧!"
            }
        }
    }

    onPressCopy() {
        cc.audioEngine.playEffect(DataManager.Instance.menuEffect, false)
        copyToClipBoard(DataManager.Instance.wechatPublic, "公众号复制成功，请前往微信添加！")
    }

}
