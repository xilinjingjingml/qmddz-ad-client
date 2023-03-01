import BaseComponent from "../base/BaseComponent";
import { IConfirmBox } from "../base/BaseFuncTs";
import SceneManager from "../base/baseScene/SceneManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class ConfirmBox extends BaseComponent {
    initParam: IConfirmBox

    onOpenScene() {
        if (this.initParam.title) {
            this['labelTitle'].getComponent(cc.Label).string = this.initParam.title
        }
        if (this.initParam.content) {
            this['labelContent'].getComponent(cc.Label).string = this.initParam.content
        }
        if (this.initParam.confirmText) {
            this['labelConfirm'].getComponent(cc.Label).string = this.initParam.confirmText
        }
        if (this.initParam.cancelText) {
            this['labelCancel'].getComponent(cc.Label).string = this.initParam.cancelText
        }

        if (this.initParam.buttonNum == 1) {
            this['btnCancel'].active = false
            this['btnConfirm'].x = 0
        } else if (this.initParam.exchangeButton) {
            this['btnConfirm'].x, this['btnCancel'].x = this['btnCancel'].x, this['btnConfirm'].x
        }

        if (this.initParam.showClose == false) {
            this['btnClose'].active = false
        }

        if (this.initParam.maskCanClose == false) {
            this['mask'].getComponent(cc.Button).interactable = false
        }
    }

    onConfirm() {
        if (this.initParam.confirmClose != false) {
            super.closeSelf()
        }
        if (this.initParam.confirmFunc) {
            this.initParam.confirmFunc()
        }
    }

    onCancel() {
        super.closeSelf()
        if (this.initParam.cancelFunc) {
            this.initParam.cancelFunc()
        }
    }

    onClose() {
        super.closeSelf()
        if (this.initParam.closeFunc) {
            this.initParam.closeFunc()
        } else if (this.initParam.cancelFunc) {
            this.initParam.cancelFunc()
        }
    }

    closeSelf() {
        if (this.initParam.maskCanClose == false) {
            return
        }
        super.closeSelf()
    }
}
