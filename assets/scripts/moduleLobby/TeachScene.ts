import BaseScene from "../base/baseScene/BaseScene";
import DataManager from "../base/baseData/DataManager";
import { getLowMoneyRoom, enterGame, czcEvent, numberFormat } from "../base/BaseFuncTs";

const {ccclass, property} = cc._decorator;

@ccclass
export default class TeachScene extends BaseScene {

    @property({
        type: [cc.Node]
    })
    teachNodes = []

    curIdx = 0; 
    endIdx = 0;

    onOpenScene() {
        this.node.zIndex = 2000
    }

    start() {
        // DataManager.CommonData["firstLogin"] = false
        if (this.initParam["lobbyTeach"]){
            czcEvent("大厅", "新手引导1", "提示点击红包斗地主 " + (DataManager.CommonData["morrow"] <= 1 ? DataManager.CommonData["morrow"] + "天新用户" : "老用户"))
            this.curIdx = 0
            this.endIdx = 0;
            DataManager.save(DataManager.UserData.guid + "lobbyTeach", true)
        }
        else if (this.initParam["exchangeTeach"]) {
            czcEvent("大厅", "新手引导2", "兑换红包引导 " + (DataManager.CommonData["morrow"] <= 1 ? DataManager.CommonData["morrow"] + "天新用户" : "老用户"))
            this.curIdx = 2
            this.endIdx = 2
            DataManager.save(DataManager.UserData.guid + "exchangeTeach", true)
        }
        else if (this.initParam["signTeach"]) {
            czcEvent("大厅", "新手引导3", "签到累计处趣金币提示 " + (DataManager.CommonData["morrow"] <= 1 ? DataManager.CommonData["morrow"] + "天新用户" : "老用户"))
            this.curIdx = 3
            this.endIdx = 3
            DataManager.save(DataManager.UserData.guid + "signTeach", true)
            this.initSignTeach()
        }
        else if (this.initParam["qttExchange"]) {
            czcEvent("大厅", "新手引导3", "趣金币兑换提示 " + (DataManager.CommonData["morrow"] <= 1 ? DataManager.CommonData["morrow"] + "天新用户" : "老用户"))
            this.curIdx = 4
            this.endIdx = 4
            DataManager.save(DataManager.UserData.guid + "qttExchange", true)
            cc.find("nodeTeach4/nodePlayer/nodeCurrency/qttCoin/coinlabel", this.node)
                .getComponent(cc.Label).string = numberFormat(DataManager.UserData.getItemNum(367))
        }
        this.teachNodes[this.curIdx].active = true
    }

    teach() {
        if (this.curIdx == 0) {
            let servers = getLowMoneyRoom(389)
            if (null != servers && servers.length > 0)
                enterGame(servers[Math.floor(Math.random() * 100) % servers.length])
        }

        if (this.curIdx == this.endIdx) {
            czcEvent("大厅", "新手引导4", "大厅新手引导完成 " + (DataManager.CommonData["morrow"] <= 1 ? DataManager.CommonData["morrow"] + "天新用户" : "老用户"))
            this.closeSelf()
            return 
        }

        if (this.curIdx == 0) {
            czcEvent("大厅", "新手引导1", "提示点击游戏房间 " + (DataManager.CommonData["morrow"] <= 1 ? DataManager.CommonData["morrow"] + "天新用户" : "老用户"))
        }

        this.teachNodes[this.curIdx].active = false
        this.curIdx++
        this.teachNodes[this.curIdx].active = true
    }

    onTouchNode() {
        this.teach()
    }

    initSignTeach() {        
        let info = DataManager.CommonData["signinInfo"]["signinAward"]
        let accDay = info["accSigninAward"][1]
        let days = cc.find("nodeTeach3/signDays2", this.node)
        if (null == days)
            return

        let label = days.getChildByName("labelAward").getComponent(cc.Label)
        let awards = JSON.parse(accDay["awardStrings"])
        awards = awards["award_info"]
        label.string = awards[0]["award_num"]

        if (awards[0]["award_num"] == 0){
            days.getChildByName("goldbean").active = true
        }
        else if (awards[0]["award_num"] == 365){
            days.getChildByName("redpacket_icon").active = true
            days.getChildByName("redpacket_string").active = true
        }
        else if (awards[0]["award_num"] == 367){
            days.getChildByName("qttgold").active = true
            days.getChildByName("qtt_string").active = true
        }        
    }
}
