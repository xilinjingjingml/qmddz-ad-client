import { czcEvent, socialShare } from "../base/BaseFuncTs"
import BaseScene from "../base/baseScene/BaseScene"

const { ccclass } = cc._decorator

@ccclass
export default class ToCashSharePop extends BaseScene {
    eventName: string

    onOpenScene() {
        this.eventName = (this.initParam.isGuideToCash ? "引导" : "") + "提现分享"
        czcEvent("大厅", this.eventName, "打开")
        const label = cc.find("nodePop/share_bg/label1", this.node).getComponent(cc.Label)
        label.string = this.initParam.name + label.string
    }

    onPressShare() {
        czcEvent("大厅", this.eventName, "点击分享")
        socialShare({
            callback: () => {
                czcEvent("大厅", this.eventName, "分享成功")
            }
        })
    }

    onCloseScene() {
        czcEvent("大厅", this.eventName, "打开")
    }
}
