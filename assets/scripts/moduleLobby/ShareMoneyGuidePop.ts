import DataManager from "../base/baseData/DataManager"
import BaseScene from "../base/baseScene/BaseScene"
import SceneManager from "../base/baseScene/SceneManager"
import { openShareMoney } from "./LobbyFunc"
import { NodeExtends } from "../base/extends/NodeExtends"
import { functions } from "../base/utils/functions"

const { ccclass } = cc._decorator

@ccclass
export default class ShareMoneyGuidePop extends BaseScene {
    private _$: object

    onLoad() {
        this._$ = functions.mark(this.node)
    }

    start() {
        NodeExtends.setNodeSpriteNet({ node: this.$("face"), url: DataManager.UserData.face })
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

    onPressOpen() {
        cc.audioEngine.playEffect(DataManager.Instance.menuEffect, false)
        openShareMoney("0", () => {
            if (DataManager.CommonData.shareMoneyData.shareMoney) {
                SceneManager.Instance.popScene("moduleLobby", "ShareMoneyPop")
            }
        }, false)
        this.closeSelf()
    }
}
