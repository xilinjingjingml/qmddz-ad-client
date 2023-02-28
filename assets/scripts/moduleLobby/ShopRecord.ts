import BaseScene from "../base/baseScene/BaseScene";
import DataManager from "../base/baseData/DataManager";
import BaseFunc = require("../base/BaseFunc")

const {ccclass, property} = cc._decorator;

@ccclass
export default class ShopRecord extends BaseScene {

    _curPage: number = 1
    _shopRecord: any[] = []

    onOpenScene() {
        this.loadRecrod()
    }

    loadRecrod() {
        //uid=5412134300543855&pn=com.zhangxin.android.weiping.qutoutiao.baibao&ticket=847F413C7BA79E59F73BE0EDDE625903&pageNow=1&pageSize=20&gameid=1192
        let url = DataManager.getURL("SHOP_HISTORY")
        let params = {
            pid: DataManager.UserData.guid,
            ticket: DataManager.UserData.ticket,
            packageName: DataManager.Instance.packetName,
            pageNow: this._curPage,
            pageSize: 20
        }

        let self = this
        BaseFunc.HTTPGetRequest(url, params, function(msg) {
            if (DataManager.Instance.isTesting)
                console.log(msg)
            if (msg && msg.resultList) {
                // for (const iterator of msg.list) {
                //     self._exchangeRecord.push(iterator)
                // }
                self._shopRecord = msg.resultList
                self.updateRecordItem()
            }           
        }) 
    }

    updateRecordItem() {
        cc.find("nodePop/content/norecord", this.node).active = this._shopRecord.length == 0

        let content = cc.find("nodePop/content/view/content", this.node)
        let model = cc.find("nodePop/content/item", this.node) 

        let size = content.getContentSize()
        let itemSize = model.getContentSize()
        if (DataManager.Instance.isTesting)
            console.log(this._shopRecord)   
        content.setContentSize(size.width, (itemSize.height + 20) * this._shopRecord.length > 7 ? 7 : this._shopRecord.length)

        let nowRecord = content.childrenCount
        for (let i = nowRecord; i < this._shopRecord.length && i < 7; i++) {
            let item = cc.instantiate(model)
            item.parent = content
            item.position = cc.v2(0, - (i + 0.5) * itemSize.height)
                        
            item.getChildByName("labelName").getComponent(cc.Label).string = this._shopRecord[i]["desc"]
            let time = this._shopRecord[i]["timeStr"]
            item.getChildByName("labelTime").getComponent(cc.Label).string = time  
            
            // if (this._shopRecord[i]["status"] == 0)
            item.getChildByName("labelState").getComponent(cc.Label).string = "购买成功"
            // else
            //     item.getChildByName("labelState").getComponent(cc.Label).string = "请稍后或联系客服"
        }
    }
}
