import BaseScene from "../base/baseScene/BaseScene";
import { copyToClipBoard } from "../base/BaseFuncTs";
import DataManager from "../base/baseData/DataManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ExchangeSucc2Pop extends BaseScene {

    onOpenScene() {
    	let str = "<color=#a07f61>恭喜您成功兑换</c>" + "<color=#d55500>" + this.initParam["goodsName"] + "</color>" + "\n<color=#a07f61>请前往奖品界面填写地址后兑换</c>"
        if (this.initParam["gainItem"] == -3) {
        	cc.find("nodePop/btnExchange", this.node).active = false
        	str = "<color=#a07f61>我们将在3-14个工作日处理您的订单，\n您可以在兑换记录查看发货信息</c>"
        }
        cc.find("nodePop/content", this.node).getComponent(cc.RichText).string = str
    }

}
