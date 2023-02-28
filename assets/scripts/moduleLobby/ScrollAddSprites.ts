import BaseComponent from "../base/BaseComponent";
import { NodeExtends } from "../base/extends/NodeExtends";

const { ccclass, property } = cc._decorator;

@ccclass
export default class ScrollAddSprites extends BaseComponent {
    @property(cc.Node)
    node_scrollview: cc.Node = null

    @property(cc.Node)
    node_template: cc.Node = null

    @property
    path = ""

    @property
    number = 0

    @property
    digit = 1

    @property
    index = 1

    onOpenScene() {
        this.node_scrollview.on("scroll-to-bottom", this.onScrollViewToBottom, this)
    }

    onScrollViewToBottom(): void {
        if (this.index > this.number) {
            return
        }

        const node = cc.instantiate(this.node_template)
        node.parent = this.node_template.parent
        let path = this.index + ''
        const long = this.digit - path.length
        if (long > 0) {
            for (let i = 0; i < long; i++) {
                path = '0' + path
            }
        }
        NodeExtends.setNodeSprite({ node: node, url: this.path + path, delayShow: true })
        this.index++
    }
}
