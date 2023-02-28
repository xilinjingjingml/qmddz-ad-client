import BaseControl from "./BaseControl";
import SceneManager from "../../baseScene/SceneManager";

const {ccclass, property, executeInEditMode} = cc._decorator;

@ccclass
@executeInEditMode
export default class MsgControl extends BaseControl {

    @property()
    MsgName: string = ""

    @property()
    MsgParam: string = ""
       
    start() {  
        this.getBaseScene()
        let button = this.node.getComponent(cc.Button);
        if (null == button)
            return

        let find = false
        button.clickEvents.forEach(item => {
            if (item.target == this.node && item.handler == "onMsg")
                find = true;            
        })

        if (!find) {
            // 注册按钮事件
            let clickEventHandler = new cc.Component.EventHandler();
            clickEventHandler.target = this.node; 
            clickEventHandler.component = "MsgControl";
            clickEventHandler.handler = "onMsg"; 
            
            button.clickEvents.push(clickEventHandler);
        }      
    }

    onMsg() {
        this._baseScene.node.emit(this.MsgName, {param: this.MsgParam})

        SceneManager.Instance.sendMessageToScene({opcode: this.MsgName, packet: this.MsgParam})
    }

}
