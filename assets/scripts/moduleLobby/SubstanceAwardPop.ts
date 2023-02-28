import BaseScene from "../base/baseScene/BaseScene";
import DataManager from "../base/baseData/DataManager";
import { getHttpSpriteFrame, czcEvent, getUserAddress, updateUserAddress } from "../base/BaseFuncTs";
import SceneManager from "../base/baseScene/SceneManager";
import { getExchangeConfig, exchangeAward, sendReloadUserData } from "./LobbyFunc";

const {ccclass, property} = cc._decorator;

@ccclass
export default class SubstanceAwardPop extends BaseScene {

    _goods = null

    onOpenScene() {

        if (null == DataManager.CommonData["ExchangeInfo"])
            getExchangeConfig(this.initItemList.bind(this))
        else
            this.initItemList()

        czcEvent("大厅", "实物兑换", "打开实物兑换界面 " + (DataManager.CommonData["morrow"] <= 1 ? DataManager.CommonData["morrow"] + "天新用户" : "老用户"))
    }

    initItemList() {
        // let model = cc.find("nodePop/itemList/item", this.node)
        let model = cc.find("nodePop/itemList/nodeLine", this.node)
        let content = cc.find("nodePop/itemList/view/content", this.node) 

        let size = content.getContentSize()
        let itemSize = model.getContentSize()
        let rowsNum = Math.floor(size.width / itemSize.width)
        let interval = size.width / rowsNum

        content.removeAllChildren(true)
        
        size = content.getContentSize()

        let exchangeInfo = DataManager.CommonData["ExchangeInfo"].filter(item => {
            return item["gainItemList"][0]["itemType"] == 0 &&
                   item["gainItemList"][0]["gainItem"] < 0
        })

        let idx = 0
        // let goldGoodsId = -1
        // for (const iterator of exchangeInfo) {
        let line = Math.ceil(exchangeInfo.length / 3)
        if (line <= 1) line = 2
        for (let i = 0 ; i < line ; i ++) {
            let line = cc.instantiate(model) 
            line.parent = content
            line.position = cc.Vec2.ZERO
            for (let j = 0 ; j < 3; j++) {
                let num = 0
                let iterator = exchangeInfo[i * 3 + j]
                let item = line.getChildByName("item" + j)
                item.getChildByName("item_name_bg").active = null != iterator
                if (null != iterator) {                    
                // item.position = cc.v2(idx % rowsNum * interval - (size.width / 2 - interval / 2), -Math.floor(idx / rowsNum) * (itemSize.height + 20) - (itemSize.height + 20) / 2)
                    cc.find("item_name_bg/award_name", item).getComponent(cc.Label).string = iterator["goodsName"]
                    // item.getChildByName("award_name").getComponent(cc.Label).string = iterator["goodsName"]
                    
                    let icon = item.getChildByName("award_icon")
                    if (icon) {
                        icon.getComponent(cc.Sprite).spriteFrame = null
                        getHttpSpriteFrame(iterator["goodsImg"], (spriteFrame) => {
                            let s1 = icon.getContentSize()
                            let s2 = spriteFrame.getOriginalSize()
                            icon.getComponent(cc.Sprite).spriteFrame = spriteFrame
                            icon.scale = Math.min(s1.width / s2.width, s1.height / s2.height)
                        })
                    }

                    num = Math.floor(DataManager.UserData.getItemNum(iterator ["exchangeItemList"][0]["exchangeItem"]) / iterator ["exchangeItemList"][0]["exchangeNum"])
                    item.getChildByName("award_num").getComponent(cc.Label).string = "拥有数量:" + num    
                }
                let buy = item.getChildByName("btn_item").getComponent(cc.Button)
                buy.interactable = num > 0
                let goodsId = iterator ? iterator["goodsId"] : "0"
                let clickEventHandler = new cc.Component.EventHandler();
                clickEventHandler.target = this.node; 
                clickEventHandler.component = "SubstanceAwardPop";
                clickEventHandler.handler = "onExchange" + goodsId; 
                let self = this
                this["onExchange" + goodsId] = () => {       
                    let checkFun = function() {
                        if (DataManager.CommonData["UserAddress"].length > 0) {                        
                            // let param = {
                            //     goodsId: iterator["goodsId"],
                            //     goodsName: iterator["goodsName"],
                            //     goodsImg: iterator["goodsImg"],
                            //     goodsNum: num,
                            //     confirmFunc: () => { 
                            //         DataManager.UserData.setItemNum(iterator ["exchangeItemList"][0]["exchangeItem"], num - iterator ["exchangeItemList"][0]["exchangeNum"])
                            //         self.initItemList() 
                            //     }
                            // }

                            // SceneManager.Instance.popScene("moduleLobby", "AwardInfoPop", param)
                            self.initAwardInfo(iterator)
                        }
                        else {
                            SceneManager.Instance.popScene("moduleLobby", "AddressInputPop")
                        }
                    }
            
                    if (null == DataManager.CommonData["UserAddress"]) {
                        getUserAddress(checkFun)    
                    }
                    else{
                        checkFun()
                    }
                    
                }          

                buy.clickEvents.push(clickEventHandler);

                idx++
            }
        }
    }

    initAwardInfo(goods) {
        this._goods = goods
        let awardInfo = cc.find("nodePop/nodeInfo", this.node)
        awardInfo.getChildByName("noAward").active = null == goods
        if (null != goods) {           
            let icon = cc.find("awardMask/icon", awardInfo)
            if (icon) {
                icon.getComponent(cc.Sprite).spriteFrame = null
                getHttpSpriteFrame(goods["goodsImg"], (spriteFrame) => {
                    if (null == icon) return;
                    let s1 = icon.getContentSize()
                    let s2 = spriteFrame.getOriginalSize()
                    icon.getComponent(cc.Sprite).spriteFrame = spriteFrame
                    icon.scale = Math.min(s1.width / s2.width, s1.height / s2.height)
                    icon.active = true
                })
            }

            awardInfo.getChildByName("awardName").getComponent(cc.Label).string = goods["goodsName"]
            let num = Math.floor(DataManager.UserData.getItemNum(goods ["exchangeItemList"][0]["exchangeItem"]) / goods ["exchangeItemList"][0]["exchangeNum"])
            awardInfo.getChildByName("ownerNum").getComponent(cc.Label).string = "拥有数量:" + num

            if (null !== DataManager.CommonData["UserAddress"] && null !== DataManager.CommonData["UserAddress"][0]) {
                let ua = DataManager.CommonData["UserAddress"][0]
                awardInfo.getChildByName("userPhone").getComponent(cc.Label).string = ua["realName"] + "    " + ua["userMobile"]
                awardInfo.getChildByName("addressInfo").getComponent(cc.Label).string = ua["address"]
                awardInfo.getChildByName("addressEdit").getComponent(cc.EditBox).string = ua["address"]
            }
        }
    }

    onEditAddress() {
        cc.find("nodePop/nodeInfo/addressInfo", this.node).active = false
        cc.find("nodePop/nodeInfo/addressEdit", this.node).active = true
    }

    onPressSave() {       
        let address = cc.find("nodePop/nodeInfo/addressEdit", this.node).getComponent(cc.EditBox).string

        if (null != DataManager.CommonData["UserAddress"] && null != DataManager.CommonData["UserAddress"][0]) {
            let ua = DataManager.CommonData["UserAddress"][0]
            let self = this
            updateUserAddress(ua["listId"], ua["realName"], ua["userMobile"], address, () => {
                getUserAddress(() => {
                    cc.find("nodePop/nodeInfo/addressInfo", self.node).active = true
                    cc.find("nodePop/nodeInfo/addressInfo", self.node).getComponent(cc.Label).string = address
                    cc.find("nodePop/nodeInfo/addressEdit", self.node).active = false                    
                })
            })
        }        
    }

    onPressConfirm() {
        let addressId = 0;
        if (null != DataManager.CommonData["UserAddress"] && null != DataManager.CommonData["UserAddress"][0]) {
            addressId = DataManager.CommonData["UserAddress"][0]["listId"]
        }

        let self = this
        exchangeAward(this._goods["goodsId"], () => {
            czcEvent("大厅", "兑换实物", "兑换实物成功 " + (DataManager.CommonData["morrow"] <= 1 ? DataManager.CommonData["morrow"] + "天新用户" : "老用户"))
            sendReloadUserData()
            self.closeSelf()
            if (self.initParam["confirmFunc"])
                self.initParam["confirmFunc"]()
        },
        addressId)
   }
}
