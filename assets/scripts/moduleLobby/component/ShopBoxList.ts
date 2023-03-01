import DataManager from "../../base/baseData/DataManager";
import { czcEvent } from "../../base/BaseFuncTs";
import SceneManager from "../../base/baseScene/SceneManager";
import BaseControl from "../../base/extensions/Extpands/BaseControl";
import { NodeExtends } from "../../base/extends/NodeExtends";

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

        this._start = true
    }

    setShopType(type: number = -1) {
        this._type = type;
        let self = this

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

        let itemNum = this._exchangeInfo.length

        let w = isProtrait ? Math.ceil(itemNum / rowsNum) * (itemHeight + 20) : view.getContentSize().width
        let h = isProtrait ? view.getContentSize().height : Math.ceil(itemNum / rowsNum) * (itemHeight + 20)
        content.setContentSize(w, h)

        if (isProtrait) {
            content.setPosition(w / 2 - view.getContentSize().width / 2, content.getPosition().y)
        }

        itemHeight += 10
        itemWidth += 5

        let idx = 0
        for (const iterator of this._exchangeInfo) {
            let item = cc.instantiate(qttmodel)
            item.parent = content
            let x = isProtrait ? Math.floor(idx / rowsNum) * (10 + itemHeight) - w * .5 + itemHeight * .5 : idx % rowsNum * (itemWidth + 5) - w * .5 + itemWidth * .5 + 10
            let y = isProtrait ? (h / rowsNum * -(rowsNum - idx % rowsNum - .5)) : -Math.floor(idx / rowsNum) * itemHeight - (itemHeight * .5)
            item.setPosition(x, y)

            item.getChildByName("itemName").getComponent(cc.Label).string = iterator["goodsName"]

            if (iterator["gainItemList"] && iterator["gainItemList"][0] && iterator["gainItemList"][0]["gainNum"])
                item.getChildByName("value").getComponent(cc.Label).string = iterator["gainItemList"][0]["gainNum"]

            if (iterator["exchangeItemList"] && iterator["exchangeItemList"][0] && iterator["exchangeItemList"][0]["exchangeNum"])
                cc.find("btnBuy/price", item).getComponent(cc.Label).string = iterator["exchangeItemList"][0]["exchangeNum"]

            cc.find("giftValue", item).active = iterator["exchangeItemList"][0]["exchangeNum"] > 10000
            cc.find("giftValue/label", item).getComponent(cc.Label).string = "送VIP经验"

            NodeExtends.setNodeSpriteNet({ node: item.getChildByName("icon"), url: iterator["goodsImg"] })

            let buy = item.getChildByName("btnBuy").getComponent(cc.Button)
            let clickEventHandler = new cc.Component.EventHandler();
            clickEventHandler.target = this.node;
            clickEventHandler.component = "ShopBoxList";
            clickEventHandler.handler = "onBuy" + iterator.goodsId;
            let goods = Object.assign(iterator)
            this["onBuy" + iterator.goodsId] = () => {
                // czcEvent("大厅", "趣金币兑换金豆", "请求兑换红包 " + DataManager.Instance.userTag)
                SceneManager.Instance.popScene("moduleLobby", "ExchangeConfirm3Pop", goods)
            }

            buy.clickEvents.push(clickEventHandler);

            idx++
        }
    }
}
