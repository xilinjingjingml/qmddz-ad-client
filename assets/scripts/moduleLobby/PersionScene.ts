import BaseScene from "../base/baseScene/BaseScene";
import DataManager from "../base/baseData/DataManager";
import BaseFunc = require("../base/BaseFunc")
import { iMessageBox, copyToClipBoard } from "../base/BaseFuncTs";
import { getVipConfig, getMobileCode, getMobileState } from "./LobbyFunc";

const {ccclass, property} = cc._decorator;

@ccclass
export default class PersionScene extends BaseScene {

    onOpenScene() {
        cc.find("nodePop/nodeTop/nickname", this.node).getComponent(cc.Label).string = DataManager.UserData.nickname
        cc.find("nodePop/nodeTop/editNickname", this.node).getComponent(cc.EditBox).string = DataManager.UserData.nickname

        cc.find("nodePop/nodeTop/labelGuid", this.node).getComponent(cc.Label).string = "ID:" + DataManager.UserData.guid

        if (DataManager.UserData.sex == 0)
            cc.find("nodePop/nodeTop/labelSex/btnMan", this.node).getComponent(cc.Toggle).isChecked = true
        else
            cc.find("nodePop/nodeTop/labelSex/btnWoman", this.node).getComponent(cc.Toggle).isChecked = true

        let self = this
        DataManager.UserData.face = DataManager.UserData.face.replace("http://", "https://")
        if (-1 != DataManager.UserData.face.indexOf("https://")){
            cc.loader.load({url: DataManager.UserData.face, type: 'png'}, (err, texture) => {
                if (err) {
                    console.log(err)
                    return
                }

                if (null == self.node)
                    return

                let face = cc.find("nodePop/nodeTop/nodeFace/nodeMask/face", self.node)
                if (null != face) {
                    let size = face.getContentSize()
                    face.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texture)
                    face.setContentSize(size)
                }
            })
        }

        if (null == DataManager.CommonData["VipInfo"])
            getVipConfig(this.updateVipInfo.bind(this))        
        else
            this.updateVipInfo()  

        if (null == DataManager.CommonData["bindPhone"].hasBindMoble)
            getMobileState(this.updateBindPhone.bind(this))
        else
            this.updateBindPhone()
        
        this.node.on("copyguid", () => { copyToClipBoard(DataManager.UserData.guid) })

        let btnMan = cc.find("nodePop/nodeTop/labelSex/btnMan", this.node).getComponent(cc.Toggle)
        btnMan.clickEvents = []

        let clickEventHandler1 = new cc.Component.EventHandler();
        clickEventHandler1.target = this.node; 
        clickEventHandler1.component = "PersionScene";
        clickEventHandler1.handler = "onSexMan"; 

        this["onSexMan"] = (sender) => {       
            this.onPressSex(null, 0)      
        }
                
        btnMan.clickEvents.push(clickEventHandler1);

        let btnWoman = cc.find("nodePop/nodeTop/labelSex/btnWoman", this.node).getComponent(cc.Toggle)
        btnWoman.clickEvents = []

        let clickEventHandler2 = new cc.Component.EventHandler();
        clickEventHandler2.target = this.node; 
        clickEventHandler2.component = "PersionScene";
        clickEventHandler2.handler = "onSexWoman"; 

        this["onSexWoman"] = (sender) => {       
            this.onPressSex(null, 1)      
        }
                
        btnWoman.clickEvents.push(clickEventHandler2);
    }

    onCloseScene() {
        this.node.off("copyguid")
    }

    updateVipInfo() {
        // VIP信息
        let nextNeed = 0
        if (null == DataManager.CommonData["VipData"]) 
            return

        for (const iterator of DataManager.CommonData["VipInfo"]) {
            if (iterator["vipLv"] == (DataManager.CommonData["VipData"].vipLevel + 1)){
                nextNeed = iterator["payMoney"]
                break;
            }
        }

        let lv = DataManager.CommonData["VipData"].vipLevel || 0
        cc.find("nodePop/nodeTop/VIP/labelLv", this.node).getComponent(cc.Label).string = "" + lv
        cc.find("nodePop/nodeTop/progressLv/labelLv", this.node).getComponent(cc.Label).string = "LV." + lv        
        cc.find("nodePop/nodeTop/progressLv", this.node).getComponent(cc.ProgressBar).progress = (nextNeed - DataManager.CommonData["VipData"].nextVipneedMoney) / nextNeed   
    }

    updateBindPhone() {
        if (DataManager.CommonData["bindPhone"] && DataManager.CommonData["bindPhone"].hasBindMoble == 1) {
            cc.find("nodePop/nodeBottom/btnBind", this.node).active = false
            let phone = "" + DataManager.CommonData["bindPhone"].BindPhone
            phone = phone.substr(0,3) + "****" + phone.substring(7)
            cc.find("nodePop/nodeBottom/phoneBind/labelPhone", this.node).getComponent(cc.Label).string = phone
        }
    }

    onPressSex(event, sex) {
        cc.audioEngine.playEffect(DataManager.Instance.menuEffect, false)
        if (sex == DataManager.UserData.sex)
            return

        let url = DataManager.getURL("SEXCOMMIT")
        let param = {
            pid: DataManager.UserData.guid,
            ticket: DataManager.UserData.ticket,
            sex: sex
        }

        let self = this
        BaseFunc.HTTPGetRequest(url, param, function(msg) {
            if (msg && msg.ret==0){
                DataManager.UserData.sex = parseInt(sex)
                // cc.find("nodePop/nodeTop/labelSex/btnMan", self.node).getComponent(cc.Toggle).isChecked = DataManager.UserData.sex == 0
                // cc.find("nodePop/nodeTop/labelSex/btnWoman", self.node).getComponent(cc.Toggle).isChecked = DataManager.UserData.sex == 1
                iMessageBox("修改性别成功","温馨提示")
            }
        })
    }

}
