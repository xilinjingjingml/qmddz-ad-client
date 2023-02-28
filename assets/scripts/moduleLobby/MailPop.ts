import BaseScene from "../base/baseScene/BaseScene";
import DataManager from "../base/baseData/DataManager";
import SceneManager from "../base/baseScene/SceneManager";
import { showAwardResultPop, czcEvent, loadModule, numberFormat } from "../base/BaseFuncTs";
import { getMailInfo, sendReloadUserData, getMailAwardInfo } from "./LobbyFunc";

const {ccclass, property} = cc._decorator;

@ccclass
export default class MailPop extends BaseScene {

    _mailInfos = null;

    onOpenScene() {
        czcEvent("大厅", "邮件", "打开邮件界面 " + DataManager.Instance.userTag)
        getMailInfo()
    }

    onCloseScene() {
        getMailInfo()
    }

    proto_lc_get_mail_info_ack(message) {
        message = message.packet
        if (message.ret == 0)
            this.showMailList(message)
    }

    showMailList(message) {
        let nodeList = cc.find("nodePop/mailList", this.node)
        let mails = message.mailInfo
        nodeList.getChildByName("mailNone").active = null == mails || mails.length == 0

        mails = mails.sort((a, b) => {
            return a.mailSendTime > b.mailSendTime ? 1 : -1
        })

        this._mailInfos = mails

        let content = cc.find("view/content", nodeList)        
        content.removeAllChildren(true)
        let model = nodeList.getChildByName("item")
        let size = content.getContentSize()
        size.height = (model.getContentSize().height + 5) * mails.length
        content.setContentSize(size)
        let self = this
        for (let mail of mails) {
            let item = cc.instantiate(model)
            // item.position = cc.Vec2.ZERO
            content.addChild(item)

            if (mail.mailMsgType == 0){
                item.getChildByName("mail_msg").active = mail.mailStatus == 0
            }
            else{
                getMailAwardInfo(mail.mailAwardId, (msg) => {
                    if (msg.ret == 0) {
                        mail.awards = msg.list;
                        if (mail.awards.length == 0) {
                            // item.getChildByName("mail_msg").active = true
                            // item.getChildByName("btnRead").active = mail.mailStatus != 0
                            // item.getChildByName("btn_already_get").active = mail.mailStatus == 0
                        // }
                        // else if (mail.awards.length == 1) {
                            // item.getChildByName("nodeItem").active = true
                            // item.getChildByName("nodeItem").getChildByName("num").getComponent(cc.Label).string = "x" + mail.awards[0]["itemNum"]
                            // item.getChildByName("nodeItem").getChildByName("item" +  mail.awards[0]["itemIndex"]).active = true
                        }
                        else {
                            item.getChildByName("btnBox").active = mail.mailStatus == 0
                            let strAd = ""
                            for (let ad of mail.awards){
                                strAd += (ad["itemIndex"] == 0 ? "金豆" : 
                                        ad["itemIndex"] == 2 ? "记牌器" : 
                                        ad["itemIndex"] == 365 ? "福卡" : 
                                        ad["itemIndex"] == 367 ? "趣金币" : "道具") + "*" + 
                                        ad["itemNum"] + " "
                            }
                            cc.find("btnBox/box_pop/content", item).getComponent(cc.Label).string = strAd
                            let btnBox = item.getChildByName("btnBox").getComponent(cc.Button)
                            let clickEventHandler1 = new cc.Component.EventHandler();
                            clickEventHandler1.target = this.node; 
                            clickEventHandler1.component = "MailPop";
                            clickEventHandler1.handler = "onBox" + mail.mailId; 
                            this["onBox" + mail.mailId] = () => {
                                cc.find("btnBox/box_pop", item).active = !cc.find("btnBox/box_pop", item).active
                            }
                            btnBox.clickEvents.push(clickEventHandler1);
                        }
                    }
                })
            }

            let msg = mail.mailMsg.split('|')
            if (msg.length <= 1) {
                msg[1] = msg[0]
                msg[0] = "官方消息"
            }
            let lblTitle = item.getChildByName("lblTypeNew").getComponent(cc.Label)
            let lblContent = item.getChildByName("lblContentNew").getComponent(cc.Label)
            lblTitle.string = msg[0] || "消息"
            item.getChildByName("lblTypeOpen").getComponent(cc.Label).string = msg[0] || "消息"
            // if (msg[0] == "系统消息"){
            //     lblTitle.node.color = new cc.Color(55, 203, 0)
            // }
            // else if (msg[0] == "官方消息"){
            //     lblTitle.node.color = new cc.Color(255, 115, 0)
            // }
            // else 
            if (mail.mailMsgType == 1){
                lblTitle.node.color = new cc.Color(172, 102, 84)
                lblContent.node.color = new cc.Color(228, 122, 32)
            }
            else {
                lblTitle.node.color = new cc.Color(55, 146, 209)
                lblContent.node.color = new cc.Color(116, 102, 183)                
            }

            mail.mailMsgType == 0

            lblContent.string = msg[1] || ""
            item.getChildByName("lblContentOpen").getComponent(cc.Label).string = msg[1] || ""
            // item.getChildByName("lblTest").getComponent(cc.Label).string = msg[1] || ""
            // item.getChildByName("lblTest").runAction(
            //     cc.sequence(
            //         cc.delayTime(0.1), 
            //         cc.callFunc(() => {
            //             item.getChildByName("lblContent").getChildByName("lblPoint").active = item.getChildByName("lblTest").width > 720
            //             item.getChildByName("lblTest").getComponent(cc.Label).string = ""
            //         })
            //     ))
            
            let day =  new Date(mail.mailSendTime * 1000)
            let numFormat = function(num) {
                if (num < 10)
                    return "0" + num

                return "" + num
            }
            item.getChildByName("time").getComponent(cc.Label).string = 
                numFormat(day.getMonth() + 1) + "/" + numFormat(day.getDate()) + "  " + numFormat(day.getHours()) + ":" + numFormat(day.getMinutes())
            
            if (mail.mailStatus == 0) {
                // item.getChildByName("mail_msg").active = true
                item.getChildByName("mail_open").active = false
                cc.find("btnGetAward/read", item).active = mail.mailMsgType == 0
                cc.find("btnGetAward/award", item).active = mail.mailMsgType != 0
                item.getChildByName("lblTypeNew").active = true
                item.getChildByName("lblContentNew").active = true
                item.getChildByName("lblTypeOpen").active = false
                item.getChildByName("lblContentOpen").active = false
                item.getChildByName("item_select_bg").active = false
            }
            else {
                // item.getChildByName("mail_msg").active = false
                item.getChildByName("mail_open").active = true
                item.getChildByName("btn_already_read").active = mail.mailMsgType == 0
                item.getChildByName("btn_already_get").active = mail.mailMsgType != 0
                item.getChildByName("lblTypeNew").active = false
                item.getChildByName("lblContentNew").active = false
                item.getChildByName("lblTypeOpen").active = true
                item.getChildByName("lblContentOpen").active = true
                item.getChildByName("item_select_bg").active = true
            }

            let btnMail = item.getChildByName("btnGetAward").getComponent(cc.Button)
            let clickEventHandler1 = new cc.Component.EventHandler();
            clickEventHandler1.target = this.node; 
            clickEventHandler1.component = "MailPop";
            clickEventHandler1.handler = "onMail" + mail.mailId; 
            this["onMail" + mail.mailId] = () => {
                czcEvent("大厅", "邮件", "开启邮件详情 " + DataManager.Instance.userTag)
                SceneManager.Instance.popScene("moduleLobby", "MailDetailPop", {mail: mail})                
            }          

            btnMail.clickEvents.push(clickEventHandler1);
        }
    }


}
