const { ccclass, property } = cc._decorator;

@ccclass
export default class BgAdapter extends cc.Component {

    @property()
    isProtrait: boolean = false

    onLoad() {
        const winSize: cc.Size = window['winSize'] || cc.winSize
        if (this.isProtrait)
            this.node.scale = Math.max(winSize.width / this.node.height, winSize.height / this.node.width)
        else
            this.node.scale = Math.max(winSize.width / this.node.width, winSize.height / this.node.height)
    }
    
}
