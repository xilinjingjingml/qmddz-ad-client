import BaseControl from "./BaseControl"
import DataManager from "../../baseData/DataManager"
import { numberFormat } from "../../BaseFuncTs"

const {ccclass, property} = cc._decorator

@ccclass
export default class AutoItemUpdateControl extends BaseControl {

    @property()
    itemId :string = ""

    start () {
        this.getBaseScene().addListener("updateUserData", this.updateUserData.bind(this))
        this.updateUserData()
    }

    updateUserData() {
        let itemIdx = parseInt(this.itemId)
        if (this.node.getChildByName("num"))
            this.node.getChildByName("num").getComponent(cc.Label).string = numberFormat(DataManager.UserData.getItemNum(itemIdx))
    }
}
