import BaseScene from "../base/baseScene/BaseScene";
import DataManager from "../base/baseData/DataManager";
import { MsgBox, iMessageBox, showAwardResultPop, numberFormat, czcEvent } from "../base/BaseFuncTs";
import { getNewUserSignAward } from "./LobbyFunc";
import { http } from "../base/utils/http";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewUserSign extends BaseScene {

    curDay: number = -1
    curState: number = 3

    onOpenScene() {
        czcEvent("大厅", "新人签到1", "打开新人签到界面 " + DataManager.Instance.userTag)
        let redpacket = cc.find("nodePop/top_menu_bg/redpacket_bg/labelLedpacket", this.node)
        if (null != redpacket)
            redpacket.getComponent(cc.Label).string = numberFormat(DataManager.UserData.getItemNum(365))

        getNewUserSignAward(this.initSignRows.bind(this))

        DataManager.saveKeyWithDate(DataManager.UserData.guid + "newUserSign")
        DataManager.CommonData[DataManager.UserData.guid + "newUserSign"] = true
    }

    onCloseScene() {
        czcEvent("大厅", "新人签到4", "关闭新人签到界面 " + DataManager.Instance.userTag)
    }

    initSignRows() {
        if (null == DataManager.CommonData["NewUserSgin"]["rows"]) 
            return

        let btnGet = cc.find("nodePop/btnGetAward/btn_getaward", this.node)
        btnGet.active = true

        let nodes = cc.find("nodePop/nodeSign", this.node)

        let idx = 1
        cc.log(DataManager.CommonData["NewUserSgin"])
        for (const iterator of DataManager.CommonData["NewUserSgin"]["rows"]) {
            
            let day = nodes.getChildByName("nodeDue" + idx)

            let label1 = day.getChildByName("labelNum").getComponent(cc.Label)
            label1.string = iterator["itemCount"]

            // 0：可领取 1：已领取 2：已过期 3：未达条件
            let code = iterator["code"]
            day.getChildByName("curDay").active = DataManager.CommonData["NewUserSgin"]["day"] == iterator["day"]
            if (code == 0 || code == 3){                
                day.getChildByName("passDue").active = false
                day.getChildByName("oldDay").active = false
                label1.node.active = true
            }
            else if (code == 1) {                
                day.getChildByName("curDay").active = false
                day.getChildByName("passDue").active = false
                day.getChildByName("oldDay").active = true
                label1.node.active = false
            }
            else if (code == 2) {
                day.getChildByName("passDue").active = true
                day.getChildByName("oldDay").active = false
                label1.node.active = false
            }
            
            if (DataManager.CommonData["NewUserSgin"]["day"] == iterator["day"]) {
                if (code == 0 || code == 3) {
                    btnGet.active = false
                }

                this.curState = code

                if (0 == iterator["gameCount"]) {
                    cc.find("nodePop/labelProgress", this.node).active = false
                    cc.find("nodePop/task_bg", this.node).active = false
                }
                else {
                    let limitType = iterator["limitType"]
                    let gameCount = iterator["gameCount"]// + "局"
                    if (limitType.indexOf("010") != -1)
                        gameCount = "今日目标:在新手场玩够" + gameCount + "局"
                    else if (limitType.indexOf("020") != -1)
                        gameCount = "今日目标:在初级场玩够" + gameCount + "局"
                    else if (limitType.indexOf("030") != -1)
                        gameCount = "今日目标:在大师场玩够" + gameCount + "局"
                    else if (limitType.indexOf("040") != -1)
                        gameCount = "今日目标:在精英场玩够" + gameCount + "局"
                    else if (limitType.indexOf("050") != -1)
                        gameCount = "今日目标:在至尊场玩够" + gameCount + "局"
                    
                    cc.find("nodePop/task_bg/tips", this.node).getComponent(cc.Label).string = gameCount                    
                    cc.find("nodePop/labelProgress", this.node).getComponent(cc.Label).string = "当前进度：" + iterator["completedCount"] + "/" + iterator["gameCount"]
                }

                this.curDay = idx
            }
            idx ++
        }
        if (DataManager.CommonData["morrow"] == 0 && btnGet.active == false && DataManager.CommonData["NewUserSgin"]["day"] == 1)
            this.node.runAction(cc.sequence(cc.delayTime(0), cc.callFunc(() => this.getAward())))
    }

    getAward() {
        czcEvent("大厅", "新人签到2", "请求领取奖励 " + DataManager.Instance.userTag)
        if (this.curState == 3) {
            iMessageBox("需要完成今日目标后领取福卡")
            czcEvent("大厅", "新人签到3", "领取奖励失败 局数不足条件 " + DataManager.Instance.userTag)
            return
        }

        let url = DataManager.getURL("GET_NEW_REGISTER_CHECK_AWARD")

        let param = {
           uid: DataManager.UserData.guid,
           pn: DataManager.Instance.packetName, 
           gameid: 389,//DataManager.Instance.gameId,
           ticket: DataManager.UserData.ticket
        }

        let self = this
        http.open(url, param, function(msg) { 
            if (msg.ret == 0) {
                czcEvent("大厅", "新人签到3", "领取奖励成功 " + DataManager.Instance.userTag)
                DataManager.CommonData["NewUserSgin"]["rows"][self.curDay - 1]["code"] = 1
                self.initSignRows()
                let award = DataManager.CommonData["NewUserSgin"]["rows"][self.curDay - 1]

                let awards = []
                awards[0] = {
                    index: award["itemIndex"],
                    num: award["itemCount"],
                }
                let num = 0
                for (let key = self.curDay; key < DataManager.CommonData["NewUserSgin"]["rows"].length; key++) {
                    let award = DataManager.CommonData["NewUserSgin"]["rows"][key]
                    if (award["itemIndex"] == 367)
                        num += award["itemCount"]
                }
                let msg = num == 0 ? "" : "<color=#ffffff>您还有</color><color=#f9f900> " + numberFormat(num, 1) + " </color><color=#ffffff>趣金币未领取, 记得明日再来领取哦~</color>"                
                let param = {
                    msg: msg, 
                }
                showAwardResultPop(awards, param, () => {
                    self.initParam["closeCallback"] = null
                    self.closeSelf()
                })
            }
            else{
                czcEvent("大厅", "新人签到3", "领取奖励失败 " + DataManager.Instance.userTag)
            }
        })
    }

    onScenePop(message) {
        message = message.packet
        if (message.name == "SideRankPop<SideRankPop>" || message.name == "RoomScene<RoomScene>"){
            this.node.zIndex = message.zIndex + 10
        }
    }
}
