import DataManager from "../base/baseData/DataManager"
import { iMessageBox, makeOrder, MsgBox, socialShare } from "../base/BaseFuncTs"
import BaseScene from "../base/baseScene/BaseScene"
import WxWrapper from "../base/WxWrapper"
import { NodeExtends } from "../base/extends/NodeExtends"

const { ccclass } = cc._decorator

@ccclass
export default class FriendPayPop extends BaseScene {

    onOpenScene() {
        let desc = ""
        if (this.initParam.status == 1) {
            const box = this.initParam.data
            cc.find("nodePop/content/nodeStatus1", this.node).active = true
            desc = `请好友赠送<color=#b56d3b>${box.boxname}</c>，价值<color=#b56d3b>${box.price}</c>元`
        } else {
            const data = this.initParam.data
            cc.find("nodePop/content/nodeStatus2", this.node).active = true
            desc = `购买<color=#b56d3b>${data.boxname}</c>赠送给${data.nickname}，价值<color=#b56d3b>${data.price}</c>元`
        }

        cc.find("nodePop/content/labelDesc", this.node).getComponent(cc.RichText).string = desc
        cc.find("nodePop/content/labelName", this.node).getComponent(cc.Label).string = this.initParam.data.boxname

        NodeExtends.setNodeSpriteNet({ node: cc.find("nodePop/content/sprImage", this.node), url: this.initParam.data.icon })
    }

    onPressFriendPay() {
        const box = this.initParam.data
        makeOrder(box.boxid, (error, order) => {
            if (order) {
                socialShare({
                    skipCheck: true,
                    title: DataManager.UserData.nickname + "请你赠送" + box.boxname + "，点击链接去赠送",
                    imageUrl: "https://pictures.hiigame.com/qmddz/weather.jpg",
                    query: {
                        event: "friendPay",
                        nickname: DataManager.UserData.nickname,
                        order: order,
                        boxname: box.boxname,
                        price: box.price,
                        icon: box.icon
                    },
                    callback: () => {
                        MsgBox({
                            title: "提示",
                            buttonNum: 1,
                            confirmClose: true,
                            content: "好友点击你的分享链接，完成购买即赠送成功。快去通知好友赠送吧"
                        })
                        this.isValid && this.closeSelf()
                    }
                })
            } else {
                iMessageBox(error)
            }
        })
    }

    onPressPayForOther() {
        WxWrapper.pay({
            price: this.initParam.data.price,
            order: this.initParam.data.order
        }, (success, message) => {
            if (success) {
                iMessageBox("购买成功，快通知好友进游戏领取吧!")
                this.isValid && this.closeSelf()
            } else {
                iMessageBox(message)
            }
        })
    }
}
