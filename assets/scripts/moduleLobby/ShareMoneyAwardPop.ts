import DataManager from "../base/baseData/DataManager"
import BaseScene from "../base/baseScene/BaseScene"
import SceneManager from "../base/baseScene/SceneManager"
import { functions } from "../base/utils/functions"

const { ccclass } = cc._decorator

@ccclass
export default class ShareMoneyAwardPop extends BaseScene {
    private _$: object

    onLoad() {
        this._$ = functions.mark(this.node)
    }

    start() {
        // 获得
        this.$("label_get", cc.RichText).string = `<b>恭喜你又获得了<size=52><color=#d4312f>${this.initParam.money}</color></size>元现金\n已存入现金账户</b>`

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

    refreshUI() {
        // 金额
        this.$("label_money", cc.Label).string = DataManager.CommonData.shareMoneyData.shareMoney[0].sm_money + "元"
    }

    updateShareMoney() {
        this.refreshUI()
    }

    onPressShare() {
        cc.audioEngine.playEffect(DataManager.Instance.menuEffect, false)
        this.closeSelf()
        SceneManager.Instance.popScene("moduleLobby", "ShareMoneySharePop")
    }

    onPressClose() {
        cc.audioEngine.playEffect(DataManager.Instance.menuEffect, false)
        this.closeSelf()
    }
}
