import BaseComponent from "../base/BaseComponent";
import { pluginPay, updateNodeWidget } from "../base/BaseFuncTs";
import SceneManager from "../base/baseScene/SceneManager";
import { NodeExtends } from "../base/extends/NodeExtends";
import PluginManager from "../base/PluginManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class PayBox extends BaseComponent {
    onOpenScene() {
        this.node.getChildByName("mask").getComponent(cc.Button).interactable = false

        const button: cc.Node = this['btnPay']
        for (const pm of this.initParam.boxItem.pmList) {
            const payType = PluginManager.getPayTypeByMid(pm.mid.toString())
            if (payType) {
                const node = cc.instantiate(button)
                node.getComponent(cc.Button).clickEvents[1].customEventData = payType
                this['nodePay'].addChild(node)
                cc.log("[PayBox.onOpenScene] add plugin", payType)
                const path = "thirdparty/tanchu_chongzhi_" + pm.mid + "01"
                if (NodeExtends.setNodeSpriteLocal({ node: node, url: path + '.png' })) {
                    continue
                }

                NodeExtends.setNodeSprite({ node: node, url: path, delayShow: true })
            }
        }

        const nodePop = cc.find("nodePop", this.node)
        nodePop.height = Math.floor(this['nodePay'].childrenCount / 2) * 140 + 136
        updateNodeWidget(cc.find("nodePop", this.node))
    }

    onBuy(touch: cc.Event.EventTouch, data: string): void {
        pluginPay(data, this.initParam.boxItem, this.initParam.callback)
        this.onClose()
    }

    onClose(): void {
        SceneManager.Instance.closeScene("PayBox")
    }
}
