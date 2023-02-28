import DataManager from "../../base/baseData/DataManager";
import { payOrder, checkFirstBox, oncePayBox, czcEvent } from "../../base/BaseFuncTs";
import { sendReloadUserData, exchangeAward, getExchangeConfig } from "../LobbyFunc";
import SceneManager from "../../base/baseScene/SceneManager";
import BaseControl from "../../base/extensions/Extpands/BaseControl";

const { ccclass, property } = cc._decorator;

@ccclass
export default class ShopBoxList extends BaseControl {

    _start: boolean = false
    _shops = []
    _dimaonds = []
    _exchangeInfo = []
    _type = -1;

    start() {
        this.node.runAction(cc.sequence(
            cc.delayTime(.01),
            cc.callFunc(() => this.init())
        ))

        // this._shops = DataManager.Instance.NormalBoxs.filter(item => item.content.length > 0 && item.content[0].idx == 0 && item.price != 1 && item.price != 3 && item.content[0].idx != 1192)
        // this._dimaonds = DataManager.Instance.NormalBoxs.filter(item => item.content.length > 0 && item.content[0].idx == 1192 && item.price != 1 && item.price != 3)
        // this._shops.sort((a, b) => a.price == b.price ? 0 : (a.price > b.price ? 1 : -1))

        this._start = true
    }

    setShopType(type: number = -1) {
        this._type = type;
        let self = this

        // if ((type == -1 || type == 2) && 
        //     (null == DataManager.CommonData["ExchangeInfo"] || 0 == DataManager.CommonData["ExchangeInfo"].length)){
        //     getExchangeConfig(() => {
        //         self.setShopType(type)
        //     })
        //     return
        // }else {
        //     DataManager.CommonData["ExchangeInfo"] = DataManager.CommonData["ExchangeInfo"] || []
        //     this._exchangeInfo = DataManager.CommonData["ExchangeInfo"].filter(item => {
        //         return item["exchangeItemList"] && 
        //                item["exchangeItemList"][0] && 
        //                item["exchangeItemList"][0]["exchangeItem"] && 
        //                item["exchangeItemList"][0]["exchangeItem"] == -7
        //     })
        //     this._exchangeInfo.sort((a, b) => a["exchangeItemList"][0]["exchangeNum"] < b["exchangeItemList"][0]["exchangeNum"] ? -1 : 1)    
        // }

        DataManager.CommonData["ExchangeInfo"] = DataManager.CommonData["ExchangeInfo"] || []
        this._exchangeInfo = DataManager.CommonData["ExchangeInfo"].filter(item => {
            return item["exchangeItemList"] &&
                item["exchangeItemList"][0] &&
                item["exchangeItemList"][0]["exchangeItem"] === 372 &&
                ((type === 0 && item["gainItemList"][0]["gainItem"] === 0) ||
                    (type === 1 && item["gainItemList"][0]["gainItem"] > 0))
        })

        this._exchangeInfo.sort((a, b) => a["exchangeItemList"][0]["exchangeNum"] < b["exchangeItemList"][0]["exchangeNum"] ? -1 : 1)

        if (this._start)
            this.init()
    }

    init() {
        // 设置显示区域
        let size = this.node.parent.getContentSize()
        // this.node.setContentSize(size.width * .96, size.height - 100)

        // 获取各部分节点
        let view = this.node.getChildByName("view")
        let content = cc.find("view/content", this.node)
        content.removeAllChildren(true)
        let model = cc.find("item", this.node)
        let qttmodel = cc.find("qttitem", this.node)
        let itemWidth = model.getContentSize().width
        let itemHeight = model.getContentSize().height
        // 更新商品节点大小
        let rowsNum = (size.width / itemWidth % 1) > .5 ? Math.ceil(size.width / itemWidth) : Math.floor(size.width / itemWidth)
        rowsNum = rowsNum > 3 ? 3 : rowsNum
        itemWidth = (size.width * .96 - (rowsNum + 1) * 10) / rowsNum
        let modelScale = itemWidth / model.getContentSize().width
        model.scale = modelScale
        qttmodel.scale = modelScale
        itemHeight *= modelScale

        // 竖屏处理
        let isProtrait = this.getBaseScene().isProtrait
        if (isProtrait) {
            this.node.rotation = 90
            model.rotation = -90
            qttmodel.rotation = -90
            // model = this.node.getChildByName("itemProtrait")
            // model = this.node.getChildByName("qttitemProtrait")

            size.width += size.height
            size.height = size.width - size.height
            size.width -= size.height
            // size.height = size.width
        }

        let sv = this.node.getComponent(cc.ScrollView)
        if (sv) {
            sv.horizontal = isProtrait
            sv.vertical = !isProtrait
        }

        if (isProtrait) {
            this.node.setContentSize(size.width - 10, size.height - 10)
            view.setContentSize(size.width - 16, size.height - 16)
        }
        // else {
        //     this.node.setContentSize(size.width * .96, size.height + 10)
        //     view.setContentSize(size.width * .96, size.height)
        // }

        let itemNum = this._exchangeInfo.length
        // itemNum = this._type == 2 ? this._exchangeInfo.length :
        //           this._type == 3 ? this._dimaonds.length :
        //           this._shops.length

        let w = isProtrait ? Math.ceil(itemNum / rowsNum) * (itemHeight + 20) : view.getContentSize().width
        let h = isProtrait ? view.getContentSize().height : Math.ceil(itemNum / rowsNum) * (itemHeight + 20)
        content.setContentSize(w, h)

        if (isProtrait) {
            content.setPosition(w / 2 - view.getContentSize().width / 2, content.getPosition().y)
        }

        // let interval = width / rowsNum

        itemHeight += 10
        itemWidth += 5

        let idx = 0
        // if (this._type == -1 || this._type == 1 || this._type == 3)  {
        //     let itemList = this._type == 3 ? this._dimaonds : this._shops
        //     for (const iterator of itemList) {
        //         let item = cc.instantiate(model)
        //         item.parent = content

        //         let x = isProtrait ? Math.floor(idx / rowsNum) * (10 + itemHeight) - w * .5 + itemHeight * .5 : idx % rowsNum * (itemWidth + 5) - w * .5 + itemWidth * .5 + 10
        //         let y = isProtrait ? (h / rowsNum * -(rowsNum - idx % rowsNum - .5)) : -Math.floor(idx / rowsNum) * itemHeight - (itemHeight * .5)
        //         item.setPosition(x, y)        
        //         // item.position = cc.Vec2.ZERO;

        //         if (iterator["content"][0]["num"])
        //             item.getChildByName("value").getComponent(cc.Label).string = iterator.content[0].num

        //         if (iterator.content[0].idx == 0)
        //             item.getChildByName("itemName").getComponent(cc.Label).string = (iterator.content[0].num / 10000) + "万金豆"
        //         else if (iterator.content[0].idx == 1192)
        //             item.getChildByName("itemName").getComponent(cc.Label).string = iterator.content[0].num + "钻石"

        //         // cc.find("btnBuy/price", item).getComponent(cc.Label).string = "$" + iterator.price
        //         cc.find("btnBuy/price", item).getComponent(cc.Label).string = "" + iterator.price

        //         cc.find("activeFlag", item).active = iterator.boxvalue > iterator.price
        //         cc.find("giftValue", item).active = iterator.boxvalue > iterator.price
        //         let num = Math.ceil(iterator.price / iterator.boxvalue * 100)
        //         cc.find("giftValue/label", item).getComponent(cc.Label).string = num + "折"//"多送" + num + "%"      
        //         cc.find("originalPrice", item).active = iterator.boxvalue > iterator.price
        //         cc.find("originalPrice", item).getComponent(cc.Label).string = "¥" + iterator.boxvalue

        //         let self = this
        //         cc.loader.load({url: iterator.icon, type: "png"}, (err, texture) => {
        //             if (err){
        //                 console.log(err)
        //                 return
        //             }

        //             let icon = item.getChildByName("icon")
        //             if (icon)
        //                 icon.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texture)
        //         })

        //         let buy = item.getChildByName("btnBuy").getComponent(cc.Button)
        //         let clickEventHandler = new cc.Component.EventHandler();
        //         clickEventHandler.target = this.node; 
        //         clickEventHandler.component = "ShopBoxList";
        //         clickEventHandler.handler = "onBuy" + iterator.boxid; 
        //         let box = Object.assign(iterator)
        //         this["onBuy" + iterator.boxid] = () => {
        //             buy.interactable = false
        //             buy.node.runAction(cc.sequence(cc.delayTime(2), cc.callFunc(() => buy.interactable = true)))
        //             content.getPosition()
        //             if (DataManager.Instance.isTesting)
        //                 console.log(box.serino)
        //             if (iterator.price == 6 && null != checkFirstBox()) {
        //                 oncePayBox(null, false)
        //                 return
        //             }
        //             payOrder(box)
        //         }          

        //         buy.clickEvents.push(clickEventHandler);

        //         idx ++   
        //     } 
        // }

        // if (this._type == -1 || this._type == 2)  {
        for (const iterator of this._exchangeInfo) {
            let item = cc.instantiate(qttmodel)
            item.parent = content
            let x = isProtrait ? Math.floor(idx / rowsNum) * (10 + itemHeight) - w * .5 + itemHeight * .5 : idx % rowsNum * (itemWidth + 5) - w * .5 + itemWidth * .5 + 10
            let y = isProtrait ? (h / rowsNum * -(rowsNum - idx % rowsNum - .5)) : -Math.floor(idx / rowsNum) * itemHeight - (itemHeight * .5)
            item.setPosition(x, y)

            // if (iterator["gainItemList"][0]["gainItem"] == 0)
            //     item.getChildByName("itemName").getComponent(cc.Label).string = iterator["gainItemList"][0]["gainNum"] < 10000 ? iterator["gainItemList"][0]["gainNum"] + "金豆" : (iterator["gainItemList"][0]["gainNum"] / 10000) + "万金豆"
            // else if (iterator["gainItemList"][0]["gainItem"] == 1192)
            //     item.getChildByName("itemName").getComponent(cc.Label).string = iterator["gainItemList"][0]["gainNum"] + "钻石"
            // else 
            item.getChildByName("itemName").getComponent(cc.Label).string = iterator["goodsName"]

            if (iterator["gainItemList"] && iterator["gainItemList"][0] && iterator["gainItemList"][0]["gainNum"])
                item.getChildByName("value").getComponent(cc.Label).string = iterator["gainItemList"][0]["gainNum"]

            if (iterator["exchangeItemList"] && iterator["exchangeItemList"][0] && iterator["exchangeItemList"][0]["exchangeNum"])
                cc.find("btnBuy/price", item).getComponent(cc.Label).string = iterator["exchangeItemList"][0]["exchangeNum"]

            cc.find("giftValue", item).active = iterator["exchangeItemList"][0]["exchangeNum"] > 10000
            cc.find("giftValue/label", item).getComponent(cc.Label).string = "送VIP经验"

            let self = this
            cc.loader.load({ url: iterator["goodsImg"], type: "png" }, (err, texture) => {
                if (err) {
                    console.log(err)
                    return
                }

                if (!item)
                    return
                    
                let icon = item.getChildByName("icon")
                if (icon)
                    icon.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texture)
            })

            let buy = item.getChildByName("btnBuy").getComponent(cc.Button)
            let clickEventHandler = new cc.Component.EventHandler();
            clickEventHandler.target = this.node;
            clickEventHandler.component = "ShopBoxList";
            clickEventHandler.handler = "onBuy" + iterator.goodsId;
            let goods = Object.assign(iterator)
            this["onBuy" + iterator.goodsId] = () => {
                czcEvent("大厅", "趣金币兑换金豆", "请求兑换红包 " + (DataManager.CommonData["morrow"] <= 1 ? DataManager.CommonData["morrow"] + "天新用户" : "老用户"))
                SceneManager.Instance.popScene("moduleLobby", "ExchangeConfirm3Pop", goods)
            }

            buy.clickEvents.push(clickEventHandler);

            idx++
        }
        // }
    }
}
