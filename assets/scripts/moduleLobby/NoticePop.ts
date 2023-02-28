import BaseScene from "../base/baseScene/BaseScene"
import { NodeExtends } from "../base/extends/NodeExtends"

const { ccclass } = cc._decorator

@ccclass
export default class NoticePop extends BaseScene {

    onOpenScene() {
        if (this.initParam.url) {
            NodeExtends.setNodeSpriteNet({ node: cc.find("nodePop/sprNotice", this.node), url: this.initParam.url })
        }
    }
}
