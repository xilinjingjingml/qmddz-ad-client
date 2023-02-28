import BaseScene from "../base/baseScene/BaseScene";
import ShopBoxList from "./component/ShopBoxList";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ShopPop extends BaseScene {

    onOpenScene() {
        let sbl = this.node.getComponentInChildren(ShopBoxList)
        if (null != sbl){
            sbl.setShopType(null != this.initParam["type"] ? this.initParam["type"] : 1)        
            sbl.init()
        }
    }

}
