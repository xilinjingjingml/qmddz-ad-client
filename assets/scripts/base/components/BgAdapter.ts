const { ccclass, property, disallowMultiple, menu, requireComponent } = cc._decorator;

@ccclass
@disallowMultiple
@menu("component/BgAdapter")
@requireComponent(cc.Sprite)
export default class BgAdapter extends cc.Component {

    @property()
    isProtrait: boolean = false

    onLoad() {
        const winSize: cc.Size = window['_fullWinSize'] || cc.winSize
        if (this.isProtrait) {
            this.node.scale = Math.max(winSize.width / this.node.height, winSize.height / this.node.width)
        } else {
            this.node.scale = Math.max(winSize.width / this.node.width, winSize.height / this.node.height)
        }
    }
}
