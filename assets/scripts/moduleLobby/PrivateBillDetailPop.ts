import BaseScene from "../base/baseScene/BaseScene";
import { numberFormat2 } from "../base/BaseFuncTs";
import DataManager from "../base/baseData/DataManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class PrivateBillDetailPop extends BaseScene {

    _winColor = cc.color(195, 15, 15)
    _lostColor = cc.color(40, 160, 43)

    onOpenScene() {
        this.initDetail()
    }

    onCloseScene() {

    }

    initDetail() {
        if (this.initParam.length == 0)
            return

        let title = cc.find("nodePop/nodeContent/nodeList/bottom1", this.node)
        let content = cc.find("nodePop/nodeContent/nodeList/view/content", this.node)
        let model = cc.find("nodePop/nodeContent/nodeList/item", this.node)

        // let size = content.getContentSize()
        // size.height = this.initParam.length * model.getContentSize().height
        // content.setContentSize(size)

        let info = this.initParam[0]
        let node = title.getChildByName("nodeName")
        let size = node.getContentSize()
        let offx = size.width / info.plyDatas.length
        info.plyDatas.sort((a, b) => a.plyGuid > b.plyGuid ? 1 : -1)
        for (let k in info.plyDatas) {
            let idx = parseInt(k)
            let nickname = info.plyDatas[k].nickName
            if (nickname.length > 5) nickname = nickname.substr(0, 5) + "..."
            let lbl = title.getChildByName("player" + (idx + 1))
            lbl.getComponent(cc.Label).string = info.plyDatas[k].plyGuid == DataManager.UserData.guid ? "我" : nickname
            lbl.active = true
            lbl.position = cc.v2(offx * (idx + .5) - node.width / 2 + node.position.x, 0)
        }
        
        for (let k in this.initParam) {
            info = this.initParam[k]
            let item = cc.instantiate(model)
            item.position = cc.v2(0, -item.getContentSize().height / 2)
            content.addChild(item)

            item.getChildByName("idx").getComponent(cc.Label).string = "" + (parseInt(k) + 1)
            let d = new Date(info.endTime * 1000)
            item.getChildByName("time").getComponent(cc.Label).string = numberFormat2(d.getHours()) + ":" + numberFormat2(d.getMinutes()) + ":" + numberFormat2(d.getSeconds())
            info.plyDatas.sort((a, b) => a.plyGuid > b.plyGuid ? 1 : -1)
            for (let k1 in info.plyDatas) {
                let idx = parseInt(k1)
                let score = info.plyDatas[k1].winLose
                let lbl = item.getChildByName("score" + (idx + 1))
                lbl.getComponent(cc.Label).string = score >= 0 ? "+" + score : score
                lbl.color = score >= 0 ? this._winColor : this._lostColor
                lbl.active = true
                lbl.position = cc.v2(offx * (idx + .5) - node.width / 2 + node.position.x, 0)
            }
        }
    }
}
