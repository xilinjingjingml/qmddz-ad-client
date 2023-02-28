import BaseScene from "../base/baseScene/BaseScene";
import { copyToClipBoard } from "../base/BaseFuncTs";
import DataManager from "../base/baseData/DataManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ExchangeSucc2Pop extends BaseScene {

    onOpenScene() {
        cc.find("nodePop/content", this.node).getComponent(cc.RichText).string = "<color=#a07f61>恭喜您成功兑换</c>" 
                                                                                + "<color=#d55500>" + this.initParam["goodsName"] + "</color>"
                                                                                + "\n<color=#a07f61>请前往奖品界面填写地址后兑换</c>"        
    }

}
