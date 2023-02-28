import BaseScene from "../base/baseScene/BaseScene";

const {ccclass, property} = cc._decorator;

@ccclass
export default class KeyboardPop extends BaseScene {

    _inputEvent: (key) => void = null

    onOpenScene() {
        this.node.on("key", this.keyInput, this)

        if (this.initParam && this.initParam["inputEvent"])
            this._inputEvent = this.initParam["inputEvent"] 
    }

    keyInput(sender, key) {
        this._inputEvent && this._inputEvent(sender.param)
    }

    onCloseScene() {
        this._inputEvent = null
    }
    
}
