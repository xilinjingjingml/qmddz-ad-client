import DataManager from "../base/baseData/DataManager"
import BaseScene from "../base/baseScene/BaseScene"

const { ccclass } = cc._decorator

@ccclass
export default class CashOutNotice extends BaseScene {

    onLoad() {
        cc.find("nodeNotice", this.node).opacity = 0
    }

    onOpenScene() {
        if (this.initParam && this.initParam.message) {
            this.parseMessage(this.initParam.message)
        }
    }

    proto_lc_broadcast_message_not(event) {
        this.parseMessage(event.packet.msg)
    }

    parseMessage(message: string) {
        if (DataManager.CommonData.gameServer) {
            const result = /恭喜用户(.*)成功兑换(.*)元话费/.exec(message)
            if (result && Number(result[2]) > 20) {
                this.showNotice(result[1])
            }
        }
    }

    showNotice(name: string) {
        const target = cc.find("nodeNotice", this.node)
        if (target.getNumberOfRunningActions() == 0) {
            if (name.length > 6) {
                name = name.substring(0, 6) + "..."
            }

            cc.find("nodeContent/nodeLayout/labelName", target).getComponent(cc.Label).string = name
            target.opacity = 255
            target.runAction(cc.sequence(
                cc.delayTime(5),
                cc.fadeOut(0.1)
            ))

            const content = cc.find("nodeContent", target)
            content.scale = 0.2
            content.runAction(cc.scaleTo(0.2, 1).easing(cc.easeBackOut()))

            cc.find("animate", target).getComponent(sp.Skeleton).setAnimation(1, "animation", false)

            cc.find("nodeMask/shadow", this.node).runAction(cc.sequence(
                cc.delayTime(2),
                cc.moveBy(0.4, 1000, 0).easing(cc.easeSineInOut()),
                cc.place(-500, 0)
            ))
        }
    }

    onScenePop(event) {
        if (event.packet.zIndex >= this.node.zIndex) {
            this.node.zIndex = event.packet.zIndex + 1
        }
    }
}
