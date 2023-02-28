const { ccclass } = cc._decorator

@ccclass
export default class Badge extends cc.Component {

    updateView(num:number) {
        this.node.active = num > 0
    }
}