import BaseScene from "../base/baseScene/BaseScene"
import DataManager from "../base/baseData/DataManager"
import { getLowMoneyRoom, enterGame, unenoughGold, iMessageBox, showAwardResultPop } from "../base/BaseFuncTs"
import BaseFunc = require("../base/BaseFunc")
import { exchangeAwardCheck, exchangeAward } from "./LobbyFunc"

const { ccclass } = cc._decorator

@ccclass
export default class PiecePop extends BaseScene {

    exchangeList: any

    onOpenScene() {
        cc.find("nodePop/rights_tips",this.node).active = cc.sys.os == cc.sys.OS_IOS
        cc.find("nodePop/go2game",this.node).active = !DataManager.CommonData["gameServer"]

        this.updatePieceNum()

        const exchangeInfo = DataManager.CommonData["ExchangeInfo"].filter(item => {
            return item["exchangeItemList"] && item["exchangeItemList"][0] &&
                item["exchangeItemList"][0]["exchangeItem"] == 376 ||
                item["exchangeItemList"][0]["exchangeItem"] == 377
        })

        exchangeInfo.sort((a, b) => {
            const aindex = a["exchangeItemList"][0]["exchangeItem"]
            const bindex = b["exchangeItemList"][0]["exchangeItem"]
            if (aindex != bindex) {
                return bindex - aindex
            }

            const anum = a["exchangeItemList"][0]["exchangeNum"]
            const bnum = b["exchangeItemList"][0]["exchangeNum"]
            if (anum != bnum) {
                return bnum - anum
            }

            const again = a["gainItemList"][0]["gainItem"]
            const bgain = b["gainItemList"][0]["gainItem"]

            return bgain - again
        })

        const model = cc.find("nodePop/item", this.node)
        const container = cc.find("nodePop/nodeItems", this.node)

        for (var i = 0; i < exchangeInfo.length; i++) {
            const info = exchangeInfo[i]

            const item = cc.instantiate(model)
            item.active = true
            item.parent = container

            cc.find("name", item).getComponent(cc.Label).string = info.goodsName
            cc.find("exchange/labelNum", item).getComponent(cc.Label).string = "x" + info.exchangeItemList[0].exchangeNum

            BaseFunc.SetFrameTextureNet(cc.find("icon", item).getComponent(cc.Sprite), info.goodsImg)

            if (info["exchangeItemList"][0]["exchangeItem"] == 376) {
                cc.find("exchange/icon376", item).active = true
            } else {
                cc.find("exchange/icon377", item).active = true
            }

            BaseFunc.AddClickEvent(item, this.node, "PiecePop", "onPressExchange", i, 0)
            BaseFunc.AddClickEvent(cc.find("exchange", item), this.node, "PiecePop", "onPressExchange", i, 3)
        }

        this.exchangeList = exchangeInfo
    }

    updatePieceNum() {
        cc.find("nodePop/item377/labelNum", this.node).getComponent(cc.Label).string = "" + DataManager.UserData.getItemNum(377)
        cc.find("nodePop/item376/labelNum", this.node).getComponent(cc.Label).string = "" + DataManager.UserData.getItemNum(376)
    }

    updateUserData() {
        this.updatePieceNum()
    }

    onPressExchange(sender, data) {
        const item = this.exchangeList[data]

        if (exchangeAwardCheck(item)) {
            exchangeAward(item.goodsId, () => {
                const awards = [
                    { index: item["gainItemList"][0]["gainItem"], num: item["gainItemList"][0]["gainNum"] }
                ]
                showAwardResultPop(awards)
            })
        } else {
            let str = "高级碎片不足"
            if (item["exchangeItemList"][0]["exchangeItem"] == 377) {
                str = "传说碎片不足"
            }
            iMessageBox(str)
        }
    }

    onPressGoGame() {
        let gameId = DataManager.load(DataManager.UserData.guid + "lastGameId") || DataManager.Instance.getGameList()[0]
        if (gameId == 389) {
            gameId = 3892
        }

        let servers = getLowMoneyRoom(gameId)
        if (servers.length > 0) {
            let i = Math.floor(Math.random() * 100 % servers.length)
            enterGame(servers[i], null, false)
        } else if (DataManager.UserData.money < DataManager.Instance.getReliefLine()) {
            // 没服务器就是初级场
            unenoughGold(0, DataManager.Instance.getReliefLine())
        }
    }

    onPressHelp() {
        cc.find("nodePop/nodeRule",this.node).active = true
    }

    onPressCloseHelp() {
        cc.find("nodePop/nodeRule",this.node).active = false
    }

    onPressClose() {
        this.closeSelf()
    }
}
