import BaseScene from "../base/baseScene/BaseScene";
import DataManager from "../base/baseData/DataManager";
import { showAwardResultPop, czcEvent } from "../base/BaseFuncTs";
import { getMailInfo, sendReloadUserData, getMailAward, getMailAwardInfo } from "./LobbyFunc";

const {ccclass, property} = cc._decorator;

@ccclass
export default class MailDetailPop extends BaseScene {

   onOpenScene() {
        let mail = this.initParam["mail"]
        let msg = mail.mailMsg.split('|')
        let lblTitle = cc.find("nodePop/lblType", this.node).getComponent(cc.Label)        
        if (msg.length <= 1) {
            msg[1] = msg[0]
            msg[0] = "官方消息"
        }
        // if (msg[0] == "系统消息"){
        //     lblTitle.node.color = new cc.Color(55, 203, 0)
        // }
        // else if (msg[0] == "官方消息"){
        //     lblTitle.node.color = new cc.Color(255, 115, 0)
        // }
        // else if (msg[0] == "系统奖励"){
        //     lblTitle.node.color = new cc.Color(255, 0, 0)
        // }
        lblTitle.string = msg[0] || "消息"
        cc.find("nodePop/lblContent", this.node).getComponent(cc.Label).string = msg[1] || ""
        
        if (mail.mailStatus == 0) {
            cc.find("nodePop/btnAward", this.node).active = true
            cc.find("nodePop/btnAward/read", this.node).active = mail.mailMsgType == 0
            cc.find("nodePop/btnAward/award", this.node).active = mail.mailMsgType != 0
        }
        else {
            cc.find("nodePop/btn_already_read", this.node).active = mail.mailMsgType == 0
            cc.find("nodePop/btn_already_get", this.node).active = mail.mailMsgType != 0
        }

        let nodeAward = cc.find("nodePop/nodeAward", this.node)
        let model = cc.find("nodePop/nodeAward/nodeAwardContent", this.node)
        model.active = false
        getMailAwardInfo(mail.mailAwardId, (msg) => {
            if (msg.ret == 0) {
                mail.awards = msg.list;
                nodeAward.active = mail.awards.length > 0                
                let x = nodeAward.getContentSize().width / (mail.awards.length + 1)
                let idx = 1
                for (let ad of mail.awards){
                    let item = cc.instantiate(model)
                    item.active = true
                    let pos = model.position
                    // pos.x = pos.x + (idx) * 100
                    pos.x = x * (idx) - nodeAward.getContentSize().width / 2 + 7
                    item.position = pos
                    item.parent = nodeAward

                    item.getChildByName("item" + ad["itemIndex"]).active = true
                    // let an = item.getChildByName("awardNum")
                    // let strNum = "x" + ad["itemNum"]
                    // for (let i = 0 ; i < strNum.length; i ++) {
                    //     let n = cc.instantiate(an.getChildByName("mail_num" + strNum[i]))
                    //     n.active = true
                    //     let p = n.position
                    //     p.x = -(18 * strNum.length / 2) + 18 * i + 9
                    //     n.position = p
                    //     n.parent = an
                    // }
                    item.getChildByName("awardNum").getComponent(cc.Label).string = "x" + ad["itemNum"]
                    idx ++
                }
            }
        })
    }    

    onPressGetAward() {
        let mail = this.initParam["mail"]
        let self = this
        getMailAward(mail.mailId, (msg) => {
            if (msg.ret == 0) {
                czcEvent("大厅", "邮件", "领取成功 " + DataManager.Instance.userTag)

                if (mail.mailMsgType != 0) {
                    let awards = []
                    for(let iter of mail.awards) {
                        let award = {
                            index: iter.itemIndex,
                            num: iter.itemNum
                        }
                        awards.push(award)
                    }
                    showAwardResultPop(awards)
                    sendReloadUserData()                    
                }
                getMailInfo()
                self.closeSelf()
            }
        })  
    }

    onCloseScene() {
        let mail = this.initParam["mail"]
        if (mail.mailStatus == 0 && mail.mailMsgType == 0)
            this.onPressGetAward()
    }
}
