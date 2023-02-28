import BaseControl from "./BaseControl";

const {ccclass, property, executeInEditMode} = cc._decorator;

@ccclass
@executeInEditMode
export default class TabControl extends BaseControl {

    @property()
    GroupName: string = ""

    @property()
    DefaultShow: boolean = false

    @property()
    IsDisable: boolean = false

    @property()
    IsHide: boolean = false

    start() {  
        // console.log("TabControl start")
        this.getBaseScene()
        let button = this.node.getComponent(cc.Button);
        if (null == button)
            return

        let find = false
        button.clickEvents.forEach(item => {
            if (item.target == this.node && item.handler == "onGroup")
                find = true;            
        })

        if (!find) {
            // 注册按钮事件
            let clickEventHandler = new cc.Component.EventHandler();
            clickEventHandler.target = this.node; 
            clickEventHandler.component = "TabControl";
            clickEventHandler.handler = "onGroup"; 
            
            button.clickEvents.push(clickEventHandler);
        }

        if (CC_EDITOR)
            return
        
        if (null != this.GroupName && this._baseScene)
            this._baseScene.regGroup(this.GroupName, this)
        
        if (this.DefaultShow) {
            // this.node.active = true
            // this.node.getComponent(cc.Button).interactable = true            
            this.onSelect(this)
        }
        else{
            // this.node.active = !this.IsHide 
            // this.node.getComponent(cc.Button).interactable = !this.IsDisable
            this.onSelect(null)
        }
    }

    onGroup() {
        // console.log("onGroup")
        if (null != this.GroupName && this._baseScene)
            this._baseScene.onGroupSelect(this.GroupName, this)
    }

    onSelect(item) {
        if (item == this) {
            this.node.getComponent(cc.Button).interactable = !this.IsDisable
            this.node.active = !this.IsHide
        }
        else{
            this.node.getComponent(cc.Button).interactable = true
            this.node.active = true
        } 
    }
}
