import BaseScene from "../../baseScene/BaseScene";

const {ccclass, property} = cc._decorator;

@ccclass
export default class BaseControl extends cc.Component {

    @property()
    _baseScene: BaseScene = null

    onload() {
        // this.getBaseScene()
    }

    getBaseScene() {
        let baseScene = this.node.getComponent(BaseScene)
        let parent = this.node
        while (null == baseScene) {
            parent = parent.getParent()            
            if (null == parent)
                break;
            
            baseScene = parent.getComponent(BaseScene)
        }

        if (baseScene)
            this._baseScene = baseScene

        return this._baseScene
    }
}
