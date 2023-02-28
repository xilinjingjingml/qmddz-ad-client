import BaseScene from "../base/baseScene/BaseScene";
import DataManager from "../base/baseData/DataManager";
import BaseFunc = require("../base/BaseFunc")

const {ccclass, property} = cc._decorator;

@ccclass
export default class ExchangeRecord extends BaseScene {

    _curPage: number = 1
    _exchangeRecord: any[] = []

    onOpenScene() {
        this.loadRecrod()
    }

    loadRecrod() {
        //uid=5412134300543855&pn=com.zhangxin.android.weiping.qutoutiao.baibao&ticket=847F413C7BA79E59F73BE0EDDE625903&pageNow=1&pageSize=20&gameid=1192
        let url = DataManager.getURL("DUIHUANRECORD")
        let params = {
            uid: DataManager.UserData.guid,
            ticket: DataManager.UserData.ticket,
            pn: DataManager.Instance.packetName,
            gameid: DataManager.Instance.gameId,
            pageNow: this._curPage,
            pageSize: 20
        }

        let self = this
        BaseFunc.HTTPGetRequest(url, params, function(msg) {
            if (DataManager.Instance.isTesting)
                console.log(msg)
            if (msg.ret == 0) {
                // for (const iterator of msg.list) {
                //     self._exchangeRecord.push(iterator)
                // }
                self._exchangeRecord = msg.list
                self.updateRecordItem()
            }           
        }) 
    }

    updateRecordItem() {
        cc.find("nodePop/content/norecord", this.node).active = this._exchangeRecord.length == 0

        let content = cc.find("nodePop/content/view/content", this.node)
        let model = cc.find("nodePop/content/item", this.node) 

        let size = content.getContentSize()
        let itemSize = model.getContentSize()
        if (DataManager.Instance.isTesting)
            console.log(this._exchangeRecord)
        content.setContentSize(size.width, (itemSize.height + 20) * this._exchangeRecord.length)

        this._exchangeRecord.sort((a, b) => a["order"] > b["order"] ? 1 : (
                                                a["order"] < b["order"] ? -1 : 0
        ))

        let nowRecord = content.childrenCount
        for (let i = nowRecord; i < this._exchangeRecord.length; i++) {
            let item = cc.instantiate(model)
            item.parent = content
            item.position = cc.v2(0, - (i + 0.5) * itemSize.height)
                        
            item.getChildByName("labelName").getComponent(cc.Label).string = this._exchangeRecord[i]["goodsName"]
            let time = this._exchangeRecord[i]["exchangeTime"]
            time = time.substring(5, time.length - 3)
            item.getChildByName("labelTime").getComponent(cc.Label).string = time            
            if (-1 != this._exchangeRecord[i]["goodsName"].indexOf("微信红包") && this._exchangeRecord[i]["status"] == "兑换成功")
                item.getChildByName("labelState").getComponent(cc.Label).string = "关注公众号提取"
            else
                item.getChildByName("labelState").getComponent(cc.Label).string = this._exchangeRecord[i]["status"]
        }
    }
}
