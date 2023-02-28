import BaseScene from "../base/baseScene/BaseScene";
import DataManager from "../base/baseData/DataManager";
import { numberFormat } from "../base/BaseFuncTs";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ObtainRedpacketPop extends BaseScene {

    onOpenScene() {       
        this.node.zIndex = 600
        let num = DataManager.UserData.getItemNum(365) - DataManager.CommonData["RedpacketCount"]
        
        cc.find("nodePop/num", this.node).getComponent(cc.Label).string = "+" + num
        cc.find("nodePop/amount", this.node).getComponent(cc.Label).string = "您当前的红包余额为" + DataManager.UserData.getItemNum(365) + 
            "(约" + numberFormat(DataManager.UserData.getItemNum(365) / 10000, 2) + ") , 可兑换为微信红包"            

        let sk = cc.find("nodePop/facaimao", this.node).getComponent(sp.Skeleton) 
        sk.addAnimation(1,"daiji", true);
    }
}
