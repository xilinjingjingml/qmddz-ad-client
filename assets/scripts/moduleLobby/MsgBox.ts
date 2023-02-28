import BaseScene from "../base/baseScene/BaseScene";
import SceneManager from "../base/baseScene/SceneManager";

const {ccclass, property} = cc._decorator;

const CONTENT_COLOR = "#A07f61"

@ccclass
export default class MsgBox extends BaseScene {

    @property()
    confirmFun: Function = null

    @property()
    cancelFun: Function = null

    @property()
    confirmClose: boolean = false

    onOpenScene() {
        this.socketName = "lobby"
        this.emit("confirm", this.onConfirm)
        this.emit("cancel", this.onCancel)

        if (this.initParam) {
            if (this.initParam["title"]) {
                cc.find("nodePop/titlebg/labelTItle", this.node).getComponent(cc.Label).string = this.initParam["title"]
                cc.find("nodePop/titlebg/common_title", this.node).active = false
            }

            let nodePop = this.node.getChildByName("nodePop")
            let size = nodePop.getContentSize()
            
            if (this.initParam["frameWidth"]) {
                size.width = this.initParam["frameWidth"]
            }

            if (this.initParam["frameHeight"]) {
                size.height = this.initParam["frameHeight"]
            }

            nodePop.setContentSize(size)
            cc._widgetManager.refreshWidgetOnResized(nodePop)

            if (this.initParam["content"]) {
                let content = this.initParam["content"] as string
                content.replace("<color=#ffffff>", "<color=" + CONTENT_COLOR + ">")
                if (content.indexOf("<color=") == -1) {
                    content = "<color=" + CONTENT_COLOR + ">" + content + "</color>"
                }
                let label = cc.find("nodePop/labelContent",  this.node)
                if (label) 
                    label.getComponent(cc.RichText).string = content

                if (null != this.initParam["horizontal"]) {
                    label.getComponent(cc.RichText).horizontalAlign = this.initParam["horizontal"]
                }

                label.getComponent(cc.RichText).maxWidth = size.width - 130
            }
            else {
                cc.find("nodePop/labelContent",  this.node).getComponent(cc.RichText).string = ""
            }

            if (this.initParam["fontSize"]) {
                cc.find("nodePop/labelContent",  this.node).getComponent(cc.RichText).fontSize = this.initParam["fontSize"]
            }

            if (this.initParam["buttonNum"]) {
                let onlyConfirm = this.initParam["buttonNum"] == 1 || this.initParam["buttonNum"]  == 1
                if (onlyConfirm) {
                    let btnConfirm = cc.find("nodePop/btnConfirm", this.node)
                    let btnCancel = cc.find("nodePop/btnCancel", this.node)

                    let point = btnConfirm.getPosition()
                    point.x = 0
                    btnConfirm.setPosition(point)

                    btnCancel.active = false                    
                }
            } else if (this.initParam["exchangeButton"]) {
                let btnConfirm = cc.find("nodePop/btnConfirm", this.node)
                let btnCancel = cc.find("nodePop/btnCancel", this.node)
                let posx = btnConfirm.x
                btnConfirm.x = btnCancel.x
                btnCancel.x = posx
            }

            if (!this.initParam["clickMaskToClose"]) {
                cc.find("nodePop/btnClose", this.node).active = false
            }

            if (this.initParam["confirmFunc"]) {
                if (this.initParam["confirmFunc"] instanceof Function)
                    this.confirmFun = this.initParam["confirmFunc"]
            }

            if (this.initParam["cancelFunc"]) {
                if (this.initParam["cancelFunc"] instanceof Function)
                    this.cancelFun = this.initParam["cancelFunc"]
            }

            if (this.initParam["confirmClose"]) {
                this.confirmClose = this.initParam["confirmClose"]
            }

            if (this.initParam["maskCanClose"] == false) {
                this.node.getChildByName("mask").getComponent(cc.Button).interactable = false
            }   

            if (this.initParam["titleTexture"]) {
                cc.find("nodePop/titlebg/common_title", this.node).active = true
                cc.find("nodePop/titlebg/common_title", this.node).getComponent(cc.Sprite).spriteFrame = this.initParam["titleTexture"]
                cc.find("nodePop/titlebg/labelTItle", this.node).active = false
            }

            if (this.initParam["confirmTexture"]) {
                let size = new cc.Size(this.initParam["confirmTexture"]._rect.width, this.initParam["confirmTexture"]._rect.height)
                let btn = cc.find("nodePop/btnConfirm", this.node)
                btn.getComponent(cc.Sprite).spriteFrame = this.initParam["confirmTexture"]
                btn.setContentSize(size)
                if (btn.getChildByName("label"))
                    btn.getChildByName("label").active = false
            }

            if (this.initParam["confirmText"]) {
                let btn = cc.find("nodePop/btnConfirm", this.node)
                if (btn.getChildByName("label"))
                    btn.getChildByName("label").getComponent(cc.Label).string = this.initParam["confirmText"]
            }
            if (this.initParam["cancelText"]) {
                let btn = cc.find("nodePop/btnCancel", this.node)
                if (btn.getChildByName("label"))
                    btn.getChildByName("label").getComponent(cc.Label).string = this.initParam["cancelText"]
            }

            if (this.initParam["closeTexture"]) {
                let size = new cc.Size(this.initParam["closeTexture"]._rect.width, this.initParam["closeTexture"]._rect.height)
                let btn = cc.find("nodePop/btnCancel", this.node)
                btn.getComponent(cc.Sprite).spriteFrame = this.initParam["closeTexture"]
                btn.setContentSize(size)
                if (btn.getChildByName("label"))
                    btn.getChildByName("label").active = false
            }
        }
    }

    onCloseScene() {

    }

    onConfirm() {
        if (this.confirmClose)
            SceneManager.Instance.closeScene("MsgBox")

        if (null != this.confirmFun)
            this.confirmFun()
    }

    onCancel() {
        if (null != this.cancelFun)
            this.cancelFun()
    
        SceneManager.Instance.closeScene("MsgBox")
    }

    closeSelf() {
        if (!this.initParam["clickMaskToClose"])
            return

        super.closeSelf()
    }
}
