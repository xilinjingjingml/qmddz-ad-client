import { czcEvent } from "../base/BaseFuncTs"
import BaseScene from "../base/baseScene/BaseScene"

const { ccclass } = cc._decorator

interface IBubble {
    node: cc.Node
    title?: string
    offect?: cc.Vec2
    nodeRectOffect?: cc.Rect
    callback?: Function
    delayTime?: number
}

@ccclass
export default class GuideBubblePop extends BaseScene {
    initParam: {
        name?: string
        tips: string
        bubble1?: IBubble
        bubble2?: IBubble
        bubble3?: IBubble
        callback?: Function
        maskClose?: boolean
    }

    onOpenScene() {
        czcEvent("大厅", this.initParam.name, "打开")
        const graphics: cc.Graphics = cc.find("mask", this.node).getComponent(cc.Mask)["_graphics"]

        for (let i = 1; i <= 3; i++) {
            const name = "bubble" + i
            const node = cc.find(name, this.node)
            const config: IBubble = this.initParam[name]
            if (config == null) {
                node.active = false
                continue
            }

            const runAction = () => {

                if (config.title) {
                    cc.find("bubble/label", node).getComponent(cc.Label).string = config.title
                }

                if (!config.nodeRectOffect) {
                    config.nodeRectOffect = cc.rect(0, 0, 0, 0)
                }
                const pos = this.node.convertToNodeSpaceAR(config.node.convertToWorldSpace(cc.Vec2.ZERO))
                graphics.rect(pos.x + config.nodeRectOffect.x, pos.y + config.nodeRectOffect.y, config.node.width + config.nodeRectOffect.width, config.node.height + config.nodeRectOffect.height)
                graphics.fill()

                pos.addSelf(cc.v2(config.node.width / 2, config.node.height / 2))
                node.active = true
                node.setPosition(pos)

                if (config.callback) {
                    const button = cc.find("button", node)
                    button.setContentSize(config.node.getContentSize())

                    const event = new cc.Component.EventHandler()
                    event.target = this.node
                    event.component = "GuideBubblePop"
                    event.handler = "onPress" + name
                    this[event.handler] = () => {
                        this.onPressClose()
                        config.callback()
                    }
                    button.getComponent(cc.Button).clickEvents.push(event)
                }

                if (config.offect) {
                    cc.find("bubble", node).setPosition(config.offect)
                }
            }

            if (config.delayTime) {
                this.node.runAction(cc.sequence(cc.delayTime(config.delayTime), cc.callFunc(runAction)))
            } else {
                runAction()
            }
        }

        cc.find("label_tips", this.node).getComponent(cc.Label).string = this.initParam.tips
        if (this.initParam.maskClose == false) {
            cc.find("mask/mask", this.node).getComponent(cc.Button).interactable = false
        }
    }

    onPressClose() {
        if (this.initParam.callback) {
            this.initParam.callback()
        }
        this.closeSelf()
    }

    onCloseScene() {
        czcEvent("大厅", this.initParam.name, "关闭")
    }
}
