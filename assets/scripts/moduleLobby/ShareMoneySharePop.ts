import DataManager from "../base/baseData/DataManager"
import { createScreenShotNode, setNodeSpriteQRCodeShareMoney, socialShare } from "../base/BaseFuncTs"
import BaseScene from "../base/baseScene/BaseScene"
import { functions } from "../base/utils/functions"
import { firstShareMoney } from "./LobbyFunc"
import { NodeExtends } from "../base/extends/NodeExtends"

const { ccclass } = cc._decorator

@ccclass
export default class ShareMoneySharePop extends BaseScene {
    private _$: object

    onLoad() {
        this.node.opacity = 0
        this._$ = functions.mark(this.node)
    }

    start() {
        // 二维码
        setNodeSpriteQRCodeShareMoney(this.$("spr_code"))
        // 头像
        NodeExtends.setNodeSpriteNet({ node: this.$("face"), url: DataManager.UserData.face, callback: this.share.bind(this) })
    }

    share() {
        if (cc.sys.isNative) {
            const filepath = jsb.fileUtils.getWritablePath() + 'share_money_share1.png'
            if (!jsb.fileUtils.isFileExist(filepath)) {
                this.node.opacity = 255
                createScreenShotNode(this.$("nodePop"), filepath)
                this.node.opacity = 0
            }
            const shareCallback = this.initParam.shareCallback
            socialShare({
                ShareWay: 'WeiXin', ShareType: '2', SharedImg: 'file://' + filepath, callback: () => {
                    firstShareMoney()
                    shareCallback && shareCallback()
                }
            })
        } else if (CC_PREVIEW) {
            firstShareMoney()
            if (this.initParam.shareCallback) {
                this.initParam.shareCallback()
            }
        }
        this.closeSelf()
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
}
