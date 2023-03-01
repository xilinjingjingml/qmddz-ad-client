import BaseScene from "../base/baseScene/BaseScene";
import NetManager from "../base/baseNet/NetManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Autonym extends BaseScene {

    onOpenScene() {
        let tips = cc.find("nodePop/tips", this.node).getComponent(cc.Label)
        tips.string = ""
    }

    onPressConfirm() {
        let inputName = cc.find("nodePop/nodeAutonym/editName", this.node).getComponent(cc.EditBox).string
        let inputID = cc.find("nodePop/nodeAutonym/editIDCard", this.node).getComponent(cc.EditBox).string

        let nameLength = inputName.length;
        let IDLength = inputID.length;
        
        let tips = cc.find("nodePop/tips", this.node).getComponent(cc.Label)
        tips.string = ""

        //姓名为空
        if (nameLength == 0) {
            tips.string = "请输入您的姓名！"
            return;
        }

        //身份证号为空
        if (IDLength == 0) {
            tips.string = "请输入您的身份证号码！"
            return;
        }

        //身份证格式错误
        if (IDLength != 15 && IDLength != 18) {
            tips.string = "您输入身份证有误，请重新输入"
            return
        }

        let prefix = inputID.substr(1, IDLength-1)
        if (null == parseInt(prefix)) {
            tips.string = "您输入身份证有误，请重新输入"
            return;
        }

        let lastletter = inputID.substr(IDLength-1)
        if (lastletter.toLowerCase() != "x" && null == parseInt(lastletter)) {
            tips.string = "您输入身份证有误，请重新输入"
            return;
        } 

        let message = {
            opcode: 'proto_cl_valid_identify_info_req', 
            name: inputName, 
            identifyCard: inputID
        }
        NetManager.Instance.send("lobby", message)
        cc.find("nodePop/btnConfirm", this.node).getComponent(cc.Button).interactable = false
    }

    proto_lc_valid_identify_info_ack(message) {
        let tips = cc.find("nodePop/tips", this.node).getComponent(cc.Label)
        tips.string = ""
        cc.find("nodePop/btnConfirm", this.node).getComponent(cc.Button).interactable = true

        let noti = message.packet
        
        tips.string = noti.message || ""
        
        if (noti.ret == 0){
            this.closeSelf()            
            return
        }        
    }
}
