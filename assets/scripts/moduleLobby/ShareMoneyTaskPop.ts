import { AdsConfig } from "../base/baseData/AdsConfig"
import DataManager from "../base/baseData/DataManager"
import { setNodeSpriteQRCodeShareMoney } from "../base/BaseFuncTs"
import BaseScene from "../base/baseScene/BaseScene"
import SceneManager from "../base/baseScene/SceneManager"
import { NodeExtends } from "../base/extends/NodeExtends"
import { functions } from "../base/utils/functions"
import { math } from "../base/utils/math"
import { getAdData, requestAdAward } from "../moduleLobby/LobbyFunc"

enum EButtonState {
    Share,
    Receive,
    Received,
}

interface ITaskData {
    desc: string
    shareCount: number,
    shareMax: number,
    buttonState: EButtonState,
    shareFuncName: string,
}

const { ccclass } = cc._decorator

@ccclass
export default class ShareMoneyTocashPop extends BaseScene {
    private _$: object

    onLoad() {
        this._$ = functions.mark(this.node)
    }

    start() {
        this.refreshUI()

        // 二维码
        setNodeSpriteQRCodeShareMoney(this.$("spr_code"))
    }

    refreshUI() {
        // 金额
        const shareMoney = DataManager.CommonData.shareMoneyData.shareMoney[0]
        this.$("label_money", cc.Label).string = shareMoney.sm_money + "元"
        NodeExtends.updateLabel(this.$("label_money", cc.Label))

        // 待提现
        this.$("node_finish").active = shareMoney.sm_money < 100
        this.$("node_finish").x = this.$("label_money").width / 2 + 23

        // 进度
        this.$("progressBar", cc.ProgressBar).progress = shareMoney.sm_money / 100
        this.$("label_less", cc.Label).string = `还差${math.sub(100, shareMoney.sm_money)}元`
        NodeExtends.updateLabel(this.$("label_less", cc.Label))
        this.$("node_less").width = this.$("label_less").width + 55
        this.$("nodePop/node_less/icon_finish_tail", cc.Widget).updateAlignment()

        // 任务
        this.refreshTasks()
    }

    updateShareMoney() {
        this.refreshUI()
    }

    /**
     * 获取子节点或组件
     */
    $(name: string): cc.Node
    $<T extends cc.Component>(name: string, type: { prototype: T }): T
    $<T extends cc.Component>(name: string, type?: { prototype: T }) {
        const node = this._$[name] || cc.find(name, this.node)
        return node && type ? node.getComponent(type) : node
    }

    refreshTasks() {
        this.$("node_task").destroyAllChildren()

        this.addTask({
            desc: "每成功邀请1名新用户，最多可领取 8.88 元",
            shareCount: 0,
            shareMax: 0,
            buttonState: EButtonState.Share,
            shareFuncName: "onPressShareTask1",
        })

        const data2: ITaskData = {
            desc: "每日分享3个微信群，可额外获得一次现金。最多领取5元",
            shareCount: 0,
            shareMax: 0,
            buttonState: EButtonState.Share,
            shareFuncName: "onPressShareTask2",
        }

        const adIndex = AdsConfig.taskAdsMap.ShareMoneyTask
        const adData = getAdData(adIndex)
        if (adData) {
            data2.shareCount = adData.count
            data2.shareMax = adData.total
            if (adData.count >= adData.total) {
                data2.buttonState = EButtonState.Received
            }
        }
        this.addTask(data2)
    }

    addTask(data: ITaskData) {
        const node = cc.instantiate(this.$("node_task_item"))
        node.active = true
        node.parent = this.$("node_task")

        // 描述
        cc.find("label_desc", node).getComponent(cc.Label).string = data.desc

        // 分享次数
        const label_share = cc.find("node_button/node_share/label_share", node)
        label_share.active = data.shareMax > 0
        label_share.getComponent(cc.Label).string = `分享${data.shareCount}/${data.shareMax}`

        // 按钮状态
        cc.find("node_button/node_share", node).active = data.buttonState == EButtonState.Share
        cc.find("node_button/node_receive", node).active = data.buttonState == EButtonState.Receive
        cc.find("node_button/node_received", node).active = data.buttonState == EButtonState.Received

        cc.find("node_button/node_share/btn_share", node).getComponent(cc.Button).clickEvents[0].handler = data.shareFuncName
    }

    onPressOpenCode() {
        cc.audioEngine.playEffect(DataManager.Instance.menuEffect, false)
        SceneManager.Instance.popScene("moduleLobby", "ShareMoneyCodePop")
    }

    onPressShareTask1() {
        cc.audioEngine.playEffect(DataManager.Instance.menuEffect, false)
        this.showShareAgain()
        SceneManager.Instance.popScene("moduleLobby", "ShareMoneySharePop", { shareCallback: this.showShareAgain.bind(this) })
    }

    onPressShareTask2() {
        cc.audioEngine.playEffect(DataManager.Instance.menuEffect, false)
        SceneManager.Instance.popScene("moduleLobby", "ShareMoneySharePop", {
            shareCallback: () => {
                this.showShareAgain()
                const adIndex = AdsConfig.taskAdsMap.ShareMoneyTask
                const adData = getAdData(adIndex)
                if (adData) {
                    requestAdAward(adIndex, (res: { ret: number, times: number, msg: string, randMoney: number }) => {
                        adData.count = res.times
                        if (res.randMoney) {
                            SceneManager.Instance.popScene("moduleLobby", "ShareMoneyAwardPop", { money: res.randMoney })
                            this.refreshUI()
                        } else {
                            this.refreshTasks()
                        }
                    })
                }
            }
        })
    }

    showShareAgain() {
        this.$("btn_text_share").active = false
        this.$("btn_text_share_again").active = true
    }

    onPressClose() {
        cc.audioEngine.playEffect(DataManager.Instance.menuEffect, false)
        this.closeSelf()
    }

    onCloseScene() {
        SceneManager.Instance.popScene("moduleLobby", "ShareMoneyPop")
    }
}
