import DataManager from "../base/baseData/DataManager"
import BaseScene from "../base/baseScene/BaseScene"
import SceneManager from "../base/baseScene/SceneManager"

const { ccclass } = cc._decorator

@ccclass
export default class NewUserPop extends BaseScene {

    onLoad() {
        DataManager.CommonData.newUserPopShow = true
    }

    showOpenAni() {
        const node = cc.find("nodePop/animateOpen", this.node)
        node.active = true

        const spine = node.getComponent(sp.Skeleton)
        spine.setAnimation(1, "xinrenjiangli", false)
        spine.setCompleteListener(() => {
            spine.setCompleteListener(null)
            node.active = false
            this.showAwardAni()
        })
    }

    showAwardAni() {
        const node = cc.find("nodePop/animateAward", this.node)
        node.active = true

        node.getComponent(sp.Skeleton).setAnimation(1, "animation", false)

        const award = cc.find("nodePop/nodeAward", this.node)
        award.active = true

        award.opacity = 0
        award.runAction(cc.sequence(
            cc.delayTime(0.8),
            cc.fadeIn(0.3)
        ))

        const button = cc.find("nodePop/nodeAward/btnGoGame", this.node)
        button.runAction(cc.repeatForever(cc.sequence(
            cc.scaleTo(0.8, 0.77),
            cc.scaleTo(0.8, 0.7)
        )))

        this.node.runAction(cc.sequence(
            cc.delayTime(3),
            cc.callFunc(() => {
                this.closeSelf()
                SceneManager.Instance.sendMessageToScene("updateFakeMoney")
            })
        ))
    }

    onPressGoGame() {
        this.node.stopAllActions()
        this.closeSelf()
        SceneManager.Instance.sendMessageToScene("updateFakeMoney")
    }

    onPressAgree() {
        cc.find("nodePop/nodeAgree", this.node).active = false
        this.showOpenAni()
    }

    onPressDisAgree() {
        cc.game.end()
    }

    onCloseScene() {
        cc.find("nodePop/animateOpen", this.node).getComponent(sp.Skeleton).setCompleteListener(null)
    }
}
