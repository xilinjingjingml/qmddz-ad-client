import BaseScene from "../base/baseScene/BaseScene";

const {ccclass, property} = cc._decorator;

@ccclass
export default class TaskLivelyPop extends BaseScene {

    start () {

    }

    onOpenScene() {
        let awards = this.initParam["awards"]
        for (let idx = 0; idx < 3; idx ++) {
            let nodeAward = cc.find("nodePop/nodeAward" + (idx + 1), this.node)
            if (null == awards[idx]) {
                nodeAward.active = false
                continue
            }

            cc.find("icon/gold", nodeAward).active = awards[idx].index == 0
            cc.find("icon/redpacket", nodeAward).active = awards[idx].index == 365
            cc.find("icon/qtt", nodeAward).active = awards[idx].index == 367
            nodeAward.getChildByName("num").getComponent(cc.Label).string = awards[idx].num
        }

        let len = awards.length
        let point = cc.find("nodePop/nodeAward1", this.node).position
        if (len == 1) {
            cc.find("nodePop/nodeAward1", this.node).position = cc.v2(0, point.y)
        }
        else if (len == 2) {
            cc.find("nodePop/nodeAward1", this.node).position = cc.v2(-100, point.y)
            cc.find("nodePop/nodeAward2", this.node).position = cc.v2(100, point.y)
        }

        cc.find("nodePop/tips", this.node).getComponent(cc.Label).string = "今日活跃度到达" + this.initParam["activity"] + "可领取"
    }
}
