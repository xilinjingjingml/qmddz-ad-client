import BaseScene from "../base/baseScene/BaseScene";
import { updateUserAddress, getUserAddress } from "../base/BaseFuncTs";
import DataManager from "../base/baseData/DataManager";
import SceneManager from "../base/baseScene/SceneManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class AddressInputPop extends BaseScene {

    onOpenScene() {
        if (null == DataManager.CommonData["UserAddress"]) 
            getUserAddress(this.initAddressInfo.bind(this))
        else
            this.initAddressInfo()
    }

    initAddressInfo() {
        if (null != DataManager.CommonData["UserAddress"] && null != DataManager.CommonData["UserAddress"][0]) {
            let ua = DataManager.CommonData["UserAddress"][0]
            cc.find("nodePop/nodeName/edit", this.node).getComponent(cc.EditBox).string = ua["realName"]
            cc.find("nodePop/nodePhone/edit", this.node).getComponent(cc.EditBox).string = ua["userMobile"]
            cc.find("nodePop/nodeAddress/edit", this.node).getComponent(cc.EditBox).string = ua["address"]
        }
    }

    onPressSave() {
        let realName = cc.find("nodePop/nodeName/edit", this.node).getComponent(cc.EditBox).string
        let mobile = cc.find("nodePop/nodePhone/edit", this.node).getComponent(cc.EditBox).string
        let address = cc.find("nodePop/nodeAddress/edit", this.node).getComponent(cc.EditBox).string

        let listId = 0
        if (null != DataManager.CommonData["UserAddress"] && null != DataManager.CommonData["UserAddress"][0]) {
            listId = DataManager.CommonData["UserAddress"][0]["listId"]
        }

        let self = this
        updateUserAddress(listId, realName, mobile, address, () => {
            getUserAddress(() => {
                self.closeSelf()
                SceneManager.Instance.sendMessageToScene("updateUserAddress")
            })
        })
    }

}
