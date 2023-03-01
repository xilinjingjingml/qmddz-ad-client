import { AdsConfig } from "../base/baseData/AdsConfig"
import DataManager from "../base/baseData/DataManager"
import { getNameByItemId, iMessageBox } from "../base/BaseFuncTs"
import BaseScene from "../base/baseScene/BaseScene"
import SceneManager from "../base/baseScene/SceneManager"
import { loadTomorrowConfig, loadTomorrowStatus, receiveAdAward } from "./LobbyFunc"
import BaseFunc = require("../base/BaseFunc")

const { ccclass } = cc._decorator

@ccclass
export default class TomorrowPop extends BaseScene {

    data: any

    status: any

    onOpenScene() {
        if (!DataManager.CommonData["TomorrowData"]) {
            loadTomorrowConfig(() => {
                this.isValid && this.loadData()
            })
        } else {
            this.loadData()
        }
    }

    loadData() {
        loadTomorrowStatus(() => {
            this.isValid && this.initView()
        })
    }

    initView() {
        const status = DataManager.CommonData["TomorrowStatus"]

        const lastSignTime = status.ret == 0 ? status.list[0].signTime : 0

        const now = new Date()
        now.setHours(0, 0, 0, 0)
        const zerotime = Math.floor(now.getTime() / 1000)

        const alreadySign = zerotime < lastSignTime
        const canGetAward = lastSignTime < zerotime

        let curday = status.ret == 0 ? status.list[0].signDay : 0

        if (alreadySign && curday > 0) {
            curday = curday - 1
        }

        let canOrder = true
        if (curday > 6) {
            curday = 6
            canOrder = false
        }

        this.data = DataManager.CommonData["TomorrowData"][curday].itemConfig

        const passed = cc.find("nodePop/passed", this.node).children
        const labels = cc.find("nodePop/labels", this.node).children

        for (let i = 0; i < curday + 1; i++) {
            passed[i].active = true
            labels[i].color = cc.color(230, 67, 10)
        }

        const gifts = cc.find("nodePop/nodeGift", this.node).children

        for (let i = 0; i < gifts.length; i++) {
            const gift = gifts[i]
            cc.find("name", gift).getComponent(cc.Label).string = getNameByItemId(this.data[i].itemIndex) + "x" + this.data[i].itemNum

            const icon = cc.find("icon" + this.data[i].itemIndex, gift)
            if (icon) {
                icon.active = true
            }
        }

        if (status.tomorrowAward.length > 0 && canGetAward) {
            SceneManager.Instance.popScene("moduleLobby", "TomorrowAwardPop", { awards: status.tomorrowAward })
            status.tomorrowAward = []
        }

        canOrder && this.initOrderView(status.tomorrowAward)
    }

    initOrderView(ordered) {
        const gifts = cc.find("nodePop/nodeGift", this.node).children

        const st = {}
        for (var i = 0; i < ordered.length; i++) {
            st[ordered[i].itemIndex] = 1
        }

        for (let i = 0; i < gifts.length; i++) {
            let choose = cc.find("choose", gifts[i])
            let choose2 = cc.find("choose2", gifts[i])
            choose.active = choose2.active = false

            if (st[this.data[i].itemIndex] == 1) {
                cc.find("sign", gifts[i]).active = true
            } else {
                if (ordered.length == 0) {
                    choose.active = true
                } else if (ordered.length == 1) {
                    choose2.active = true
                }
            }
        }

        const desc = cc.find("nodePop/desc", this.node).getComponent(cc.Label)
        if (ordered.length == 0) {
            desc.string = "选择一项奖励明日登录即可领取"
        } else if (ordered.length == 1) {
            desc.string = "看视频可多选一个"
        } else {
            desc.string = "明日登录即可领取奖励"
        }
    }

    orderTomorrowAward(item) {
        let url = DataManager.getURL("CHOOSE_TOMORROW_GIFT")
        let param = {
            uid: DataManager.UserData.guid,
            ticket: DataManager.UserData.ticket,
            itemIndex: item.itemIndex
        }

        BaseFunc.HTTPGetRequest(url, param, (res) => {
            if (res && res.ret == 0) {
                const data = DataManager.CommonData["TomorrowStatus"]
                data.tomorrowAward.push(item)
                this.isValid && this.initOrderView(data.tomorrowAward)
            } else {
                iMessageBox("预约奖励失败")
            }
        })
    }

    onPressOrder(event, id) {
        this.orderTomorrowAward(this.data[id])
    }

    onPressOrderAD(event, id) {
        receiveAdAward(AdsConfig.taskAdsMap.TomorrowChoose, () => {
            this.orderTomorrowAward(this.data[id])
        })
    }
}
