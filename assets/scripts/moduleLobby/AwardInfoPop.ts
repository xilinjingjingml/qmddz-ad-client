import BaseScene from "../base/baseScene/BaseScene";
import { czcEvent } from "../base/BaseFuncTs";
import DataManager from "../base/baseData/DataManager";
import { exchangeAward, sendReloadUserData } from "./LobbyFunc";
import { NodeExtends } from "../base/extends/NodeExtends";

const {ccclass, property} = cc._decorator;

@ccclass
export default class AwardInfoPop extends BaseScene {

   onOpenScene() {
       NodeExtends.setNodeSpriteNet({ node: cc.find("nodePop/nodeItem/itemIcon", this.node), url: this.initParam["goodsImg"], fixSize: true })

        cc.find("nodePop/nodeItem/num", this.node).getComponent(cc.Label).string = "拥有数量:" + this.initParam["goodsNum"]

        let itemName = cc.find("nodePop/nodeName/content", this.node)
        itemName.getComponent(cc.Label).string = this.initParam["goodsName"]

        this.updateUserAddress()
   }

   updateUserAddress() {       
        let address = cc.find("nodePop/nodeAddress/content", this.node)
        if (null !== DataManager.CommonData["UserAddress"] && null !== DataManager.CommonData["UserAddress"][0]) {
            let ua = DataManager.CommonData["UserAddress"][0]
            address.getComponent(cc.Label).string = ua["realName"] + "\r\n" + ua["userMobile"] + "\r\n" + ua["address"]
        }
   }

   onPressConfirm() {
        let addressId = 0;
        if (null != DataManager.CommonData["UserAddress"] && null != DataManager.CommonData["UserAddress"][0]) {
            addressId = DataManager.CommonData["UserAddress"][0]["listId"]
        }

        let self = this
        exchangeAward(this.initParam["goodsId"], () => {
            czcEvent("大厅", "兑换实物", "兑换实物成功 " + DataManager.Instance.userTag)
            sendReloadUserData()
            self.closeSelf()
            if (self.initParam["confirmFunc"])
                self.initParam["confirmFunc"]()
        },
        addressId)
   }
}
