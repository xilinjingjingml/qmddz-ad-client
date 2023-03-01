import DataManager from "../base/baseData/DataManager"
import { iMessageBox, setAvatarByGuid, socialShare } from "../base/BaseFuncTs"
import BaseScene from "../base/baseScene/BaseScene"
import BaseFunc = require("../base/BaseFunc")

const { ccclass } = cc._decorator

const enum Status {
    Normal = 0,
    Available = 1,
    Finish = 2
}

@ccclass
export default class LotteryPop extends BaseScene {

    onOpenScene() {
        const param = {
            uid: DataManager.UserData.guid,
            gameId: DataManager.Instance.gameId,
            ticket: DataManager.UserData.ticket,
            pageNow: 1,
            pageSize: 20,
        }

        BaseFunc.HTTPGetRequest(DataManager.getURL("LOAD_PROMOTER_RECORD"), param, (res) => {
            if (res && res.spreadAwardList) {
                this.isValid && this.initView(res.spreadAwardList)
            } else {
                iMessageBox("请求数据失败")
            }
        })
    }

    initView(data) {
        const model = cc.find("nodePop/content/scroll/container/record", this.node)
        const container = cc.find("nodePop/content/scroll/container", this.node)
        for (const iterator of data) {
            const item = cc.instantiate(model)
            item.x = 0
            item.parent = container
            cc.find("name", item).getComponent(cc.Label).string = iterator.nickName

            cc.find("btnInvite", item).active = false

            const avatar = cc.find("nodeMask/avatar", item)
            setAvatarByGuid(iterator.promoterUid, avatar.getComponent(cc.Sprite), () => {
                avatar.scale = Math.min(70 / avatar.width, 70 / avatar.height)
            })

            const awards = cc.find("nodeAward", item).children

            let newStatus = Status.Normal
            if (iterator.newAwardStatus == 0) {
                if (iterator.count >= 20) {
                    newStatus = Status.Available
                }
            } else {
                newStatus = Status.Finish
            }

            this.setChestStatus(awards[0], iterator.awardStatus, { packageType: 1, promoterUid: iterator.promoterUid, item: item })
            this.setChestStatus(awards[1], newStatus, { packageType: 2, promoterUid: iterator.promoterUid, item: item })

            cc.find("nodeAward", item).getComponent(cc.Sprite).fillRange = newStatus != Status.Normal ? 1 : 0.5
        }
    }

    setChestStatus(chest, status, data) {
        if (status == Status.Normal) {
        } else if (status == Status.Available) {
            const effect = cc.find("close/effect", chest)
            effect.active = true

            effect.runAction(cc.repeatForever(cc.sequence(
                cc.scaleTo(0.4, 1.2),
                cc.scaleTo(0.4, 1.0),
            )))


            const button = cc.find("close", chest).getComponent(cc.Button)
            button.interactable = true

            button.node.data = data
            const event = new cc.Component.EventHandler()
            event.target = this.node
            event.component = "InvitePop"
            event.handler = "onPressGetAward"
            button.clickEvents.push(event)
        } else {
            cc.find("close", chest).active = false
            cc.find("open", chest).active = true
        }
    }

    onPressInvite() {
        socialShare({
            withOpenId: true
        })
    }

    onPressGetAward(sender) {
        const data = sender.target.data
        const param = {
            uid: DataManager.UserData.guid,
            gameId: DataManager.Instance.gameId,
            ticket: DataManager.UserData.ticket,
            promoterUid: data.promoterUid,
            packageType: data.packageType
        }

        BaseFunc.HTTPGetRequest(DataManager.getURL("GET_PROMOTER_AWARD"), param, (res) => {
            iMessageBox(res ? res.msg : "领取奖励失败")
            if (res && res.ret > 0) {
                this.isValid && this.setChestStatus(cc.find("nodeAward", data.item).children[data.packageType - 1], Status.Finish, null)
            }
        })
    }
}
