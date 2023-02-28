import BaseScene from "../base/baseScene/BaseScene";
import DataManager from "../base/baseData/DataManager";
import { iMessageBox, MsgBox, czcEvent, getHttpSpriteFrame, getUserAddress } from "../base/BaseFuncTs";
import { getVipConfig, exchangeAward, sendReloadUserData } from "./LobbyFunc";
import SceneManager from "../base/baseScene/SceneManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ExchangeConfirm4Pop extends BaseScene {

    exchangeNum: number = 1;    
    exchangeNumLabel: cc.Label = null
    exchangePriceLabel: cc.Label = null
    
    onOpenScene() {
        cc.find("nodePop/nodeInfo", this.node).active = true
        cc.find("nodePop/nodeAddress", this.node).active = false
        cc.find("nodePop/btnExchange", this.node).active = true
        cc.find("nodePop/btnConfirm", this.node).active = false
        this.initInfo()   
    }

    initInfo(){
        if (null == this.initParam)
            return

        cc.find("nodePop/nodeInfo/itemName", this.node).getComponent(cc.Label).string = this.initParam["goodsName"]

        this.exchangeNum = this.initParam["exchangeItemList"][0]["exchangeNum"];

        this.exchangePriceLabel = cc.find("nodePop/btnExchange/labelPrice", this.node).getComponent(cc.Label)
        //this.exchangePriceLabel.string = this.exchangeNum >= 10000 ? this.exchangeNum / 10000 + "万购买" : this.exchangeNum / 1000 + "千购买"
        // this.exchangePriceLabel.string = (this.exchangeNum > 10000 ? this.exchangeNum / 10000 + "w" : this.exchangeNum) + "dh"
        this.exchangePriceLabel.string = (this.exchangeNum > 10000 ? this.exchangeNum / 10000 + "万" : this.exchangeNum + "")

        let limitTypeDesc = "每日"
        if(this.initParam["limitType"] == 1) {
            limitTypeDesc = "累计"
        }

        let tipText = ""

        if(this.initParam["limitVip"] < 1) {
        }else{
            tipText += "VIP ≥ " + this.initParam["limitVip"] + " "
        }


        if (this.initParam["limitCount"] != -1) {
            tipText += limitTypeDesc + "可以兑换" + this.initParam["limitCount"] + "次"

            cc.find("nodePop/nodeInfo/exNum", this.node).getComponent(cc.Label).string = this.initParam["exchangeCount"] + ""
            cc.find("nodePop/nodeInfo/exNum2", this.node).getComponent(cc.Label).string = "/" + this.initParam["limitCount"] + "件"            
        }


        if (tipText == "") {
            cc.find("nodePop/labelTips1", this.node).active = false            
        }else{
            cc.find("nodePop/labelTips1", this.node).getComponent(cc.Label).string = tipText                    
        }
          
        cc.find("nodePop/nodeInfo/labelTips", this.node).getComponent(cc.Label).string = "兑换后直接到账，如未更新显示，请等待片刻。"  

        let buy = cc.find("nodePop/btnExchange", this.node).getComponent(cc.Button)
        let clickEventHandler = new cc.Component.EventHandler();
        clickEventHandler.target = this.node; 
        clickEventHandler.component = "ExchangeConfirm4Pop";
        clickEventHandler.handler = "onExchange"; 

        let icon = cc.find("nodePop/nodeIcon/itemIcon", this.node)
        getHttpSpriteFrame(this.initParam["goodsImg"], (spriteFrame) => {
            let s1 = icon.getContentSize()
            let s2 = spriteFrame.getOriginalSize()
            icon.getComponent(cc.Sprite).spriteFrame = spriteFrame
            icon.scale = Math.min(s1.width / s2.width, s1.height / s2.height)
        })

        let self = this
        this["onExchange"] = () => {
            // let checkFun = function() {
            //     if (DataManager.CommonData["UserAddress"].length > 0) {
            //         czcEvent("大厅", "兑换实物", "请求兑换实物 " + (DataManager.CommonData["morrow"] <= 1 ? DataManager.CommonData["morrow"] + "天新用户" : "老用户"))
            //         // exchangeAward(self.initParam["goodsId"], () => {
            //         //     czcEvent("大厅", "兑换实物", "兑换实物成功 " + (DataManager.CommonData["morrow"] <= 1 ? DataManager.CommonData["morrow"] + "天新用户" : "老用户"))
            //         //     sendReloadUserData()
            //         //     SceneManager.Instance.popScene("moduleLobby", "ExchangeSucc2Pop", {goodsName: self.initParam["goodsName"]})
            //         //     self.closeSelf()
            //         // })
            //     }
            //     else {
            //         SceneManager.Instance.popScene("moduleLobby", "AddressInputPop")
            //     }
            // }

            if (null == DataManager.CommonData["UserAddress"]) {
                 getUserAddress(this.showAddress.bind(this))
            }
            else{
                this.showAddress()     
            }
            
        }         
        
        buy.clickEvents.push(clickEventHandler);
    }

    showAddress() {
        cc.find("nodePop/nodeAddress/itemName", this.node).getComponent(cc.Label).string = this.initParam["goodsName"]

        let labelAddress = cc.find("nodePop/nodeAddress/address", this.node)
        let editAddress = cc.find("nodePop/nodeAddress/addressEdit", this.node)
        if (DataManager.CommonData["UserAddress"] && DataManager.CommonData["UserAddress"][0]) {
            // cc.find("nodePop/nodeAddress/inputTip", this.node).active = false
            let ua = DataManager.CommonData["UserAddress"][0]
            let str = ua["realName"] + "\r\n" + ua["userMobile"] + "\r\n" + ua["address"]
            labelAddress.getComponent(cc.Label).string = str
            labelAddress.active = true
            editAddress.getComponent(cc.EditBox).string = str
            editAddress.active = false
        }
        else {
            // cc.find("nodePop/nodeAddress/inputTip", this.node).active = true
        }
        
        let editboxEventHandler = new cc.Component.EventHandler()
        editboxEventHandler.target = this.node;
        editboxEventHandler.component = "ExchangeConfirm4Pop";
        editboxEventHandler.handler = "addressEdit";

        this["addressEdit"] = (text, sender, customEventData) => {
            labelAddress.active = true
            editAddress.active = false
        }

        editAddress.getComponent(cc.EditBox).editingDidEnded.push(editboxEventHandler)

        cc.find("nodePop/btnExchange", this.node).active = false
        cc.find("nodePop/btnConfirm", this.node).active = true
    }

    onPressEditAddress() {
        cc.find("nodePop/nodeAddress/address", this.node).active = false
        cc.find("nodePop/nodeAddress/addressEdit", this.node).active = true

        let edit = cc.find("nodePop/nodeAddress/addressEdit", this.node).getComponent(cc.EditBox)
        edit.node.active = true
        if (edit._impl) {
            edit._impl.beginEditing()
        }
    }

    onPressConfirm() {
        let self = this
        exchangeAward(self.initParam["goodsId"], () => {
            czcEvent("大厅", "兑换实物", "兑换实物成功 " + (DataManager.CommonData["morrow"] <= 1 ? DataManager.CommonData["morrow"] + "天新用户" : "老用户"))
            sendReloadUserData()
            SceneManager.Instance.popScene("moduleLobby", "ExchangeSucc2Pop", {goodsName: self.initParam["goodsName"]})
            self.closeSelf()
        })
    }
}
