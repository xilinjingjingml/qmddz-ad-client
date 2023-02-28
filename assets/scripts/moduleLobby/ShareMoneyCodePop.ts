import DataManager from "../base/baseData/DataManager"
import { setNodeSpriteQRCodeShareMoney } from "../base/BaseFuncTs"
import BaseScene from "../base/baseScene/BaseScene"
import { functions } from "../base/utils/functions"

const { ccclass } = cc._decorator

@ccclass
export default class ShareMoneyCodePop extends BaseScene {
    private _$: object

    onLoad() {
        this._$ = functions.mark(this.node)
    }

    start() {
        // 二维码
        setNodeSpriteQRCodeShareMoney(this.$("spr_code"))
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

    onPressClose() {
        cc.audioEngine.playEffect(DataManager.Instance.menuEffect, false)
        this.closeSelf()
    }
}
