import { AdsConfig } from "../base/baseData/AdsConfig"
import DataManager from "../base/baseData/DataManager"
import { getNameByItemId, iMessageBox, showAwardResultPop } from "../base/BaseFuncTs"
import BaseScene from "../base/baseScene/BaseScene"
import SceneManager from "../base/baseScene/SceneManager"
import { checkAdCanReceive, getLotteryAward, loadLotteryData, loadLotteryRecord, receiveAdAward } from "./LobbyFunc"
import { NodeExtends } from "../base/extends/NodeExtends"

const { ccclass } = cc._decorator

@ccclass
export default class LotteryPop extends BaseScene {

    data: any = {}
    records: any = []

    onOpenScene() {
        cc.find("nodePop/light", this.node).runAction(cc.repeatForever(cc.sequence(
            cc.delayTime(0.5),
            cc.rotateBy(0, 22.5)
        )))

        loadLotteryData(() => {
            if (this.isValid) {
                this.initView()
            }
        })

        loadLotteryRecord((records) => {
            if (this.isValid) {
                this.records = records
                this.initRecordView()
            }
        })
    }

    initView() {
        const data = DataManager.CommonData["lotteryData"]
        const items = cc.find("nodePop/pannel", this.node).children

        for (let i = 0, len = data.length; i < len; i++) {
            const element = data[i]
            const item = items[i]

            this.data[element.acAutoId] = { acItemIndex: element.acItemIndex, acItemNum: element.acItemNum, offset: i * 45 }

            NodeExtends.setNodeSpriteNet({ node: cc.find("icon", item), url: element.acItemUrl, fixSizeBySize: cc.size(96, 96) })
            cc.find("desc", item).getComponent(cc.Label).string = element.itemDesc
        }

        this.updateUserData()
    }

    initRecordView() {
        const data = this.records
        const container = cc.find("nodePop/nodeRecord", this.node)
        const labels = container.children

        for (let i = 0, len = Math.min(3, data.length); i < len; i++) {
            labels[i].getComponent(cc.RichText).string = `恭喜 <color=#0d9222>${data[i].name}</c> 抽中 <color=#ed3424>${data[i].award}</c>`
        }

        if (data.length >= 3) {
            let dataIdx = 3 % data.length
            let nodeIdx = labels.length - 1

            labels[nodeIdx].getComponent(cc.RichText).string = `恭喜 <color=#0d9222>${data[dataIdx].name}</c> 抽中 <color=#ed3424>${data[dataIdx].award}</c>`

            for (const label of labels) {
                label.runAction(cc.repeatForever(cc.moveBy(2, 0, 35)))
            }

            container.runAction(cc.repeatForever(cc.sequence(
                cc.delayTime(2),
                cc.callFunc(() => {
                    dataIdx = (dataIdx + 1) % data.length
                    nodeIdx = (nodeIdx + 1) % labels.length

                    labels[nodeIdx].y = -105
                    labels[nodeIdx].getComponent(cc.RichText).string = `恭喜 <color=#0d9222>${data[dataIdx].name}</c> 抽中 <color=#ed3424>${data[dataIdx].award}</c>`
                })
            )))
        }
    }

    updateUserData() {
        cc.find("nodePop/lottery/labelChance", this.node).getComponent(cc.Label).string = "剩余" + DataManager.UserData.getItemNum(366) + "次"
    }

    onPressLottery() {
		cc.audioEngine.playEffect(DataManager.Instance.menuEffect, false)
        if (DataManager.UserData.getItemNum(366) <= 0) {
            iMessageBox("抽奖次数已用完")
            return
        }

        const button = cc.find("nodePop/lottery", this.node).getComponent(cc.Button)
        button.interactable = false

        getLotteryAward((res) => {
            if (res && res.ret === 0) {
                this.isValid && this.showLotteryResult(res.awardId)
            } else {
                this.isValid && (button.interactable = true)
                iMessageBox(res ? res.msg : "请求失败")
            }
        })
    }

    showLotteryResult(awardId) {
        const data = this.data[awardId]
        const pannel = cc.find("nodePop/pannel", this.node)

        cc.find("nodePop/effect", this.node).runAction(cc.sequence(
            cc.delayTime(3),
            cc.show(),
            cc.blink(1, 6),
            cc.hide()
        ))

        pannel.runAction(cc.sequence(
            cc.rotateBy(3, 3600 - data.offset + pannel.angle % 360).easing(cc.easeCircleActionInOut()),
            cc.delayTime(1),
            cc.callFunc(() => {
                this.records.push({ name: DataManager.UserData.nickname, award: getNameByItemId(data.acItemIndex) + "x" + data.acItemNum })
                showAwardResultPop([
                    {
                        index: data.acItemIndex,
                        num: data.acItemNum
                    }
                ])
                cc.find("nodePop/lottery", this.node).getComponent(cc.Button).interactable = true
            })
        ))
    }

    onPressAddChance() {
		cc.audioEngine.playEffect(DataManager.Instance.menuEffect, false)
        if (checkAdCanReceive(AdsConfig.taskAdsMap.LotteryShare)) {
            receiveAdAward(AdsConfig.taskAdsMap.LotteryShare, () => {
                iMessageBox("抽奖次数+1")
            }, {
                invite: true,
                withOpenId: true
            }, false)
        } else {
            SceneManager.Instance.popScene("moduleLobby", "InvitePop")
        }
    }

    onPressClose() {
		cc.audioEngine.playEffect(DataManager.Instance.menuEffect, false)
        this.closeSelf()
    }
}
