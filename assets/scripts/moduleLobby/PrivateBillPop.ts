import BaseScene from "../base/baseScene/BaseScene";
import DataManager from "../base/baseData/DataManager";
import NetManager from "../base/baseNet/NetManager";
import { getPrivateInviteInfo } from "../base/BaseFuncTs";
import SceneManager from "../base/baseScene/SceneManager";
import { getPrivateGameDataList } from "./LobbyFunc";
import { UserExtends } from "../base/extends/UserExtends";

const {ccclass, property} = cc._decorator;

@ccclass
export default class PrivateBillPop extends BaseScene {

    onOpenScene() {
        cc.find("nodePop/background1/diamond/labelNum", this.node).getComponent(cc.Label).string = "" + DataManager.UserData.getItemNum(1192)
        getPrivateGameDataList(0)
    }

    onCloseScene() {

    }

    proto_lc_get_private_game_data_list_ack(message) {
        message = message.packet
        this.initPrivateGameBill(message.data)
    }

    initPrivateGameBill(gameList) {
        let content = cc.find("nodePop/nodeContent/nodeList/view/content", this.node)
        let model = cc.find("nodePop/nodeContent/nodeList/item", this.node)
        let size = content.getContentSize()
        size.height = gameList.length * (model.getContentSize().height + 10)
        content.setContentSize(size)
        
        let self = this
        for (let v of gameList) {
            let item = cc.instantiate(model)
            item.position = cc.v2(0, -model.getContentSize().height/2)
            content.addChild(item)

            cc.find("nodeInfo/info1", item).getComponent(cc.Label).string = v.gameName + "   " + (v.itemIndex == 0 ? "金豆" : "钻石")
            cc.find("nodeInfo/info2", item).getComponent(cc.Label).string = "房间号: " + v.inviteCode
            cc.find("nodeInfo/info3", item).getComponent(cc.Label).string = v.ownerNickName + "支付: " + v.costRoomCard + (v.itemIndex == 0 ? "金豆" : "钻石")

            let nodePlayer = item.getChildByName("nodePlayer")
            let playerModel = nodePlayer.getChildByName("nodePlayer")
            let ix = nodePlayer.width / (v.playerMax + 1)
            let players = v.plyDatas.filter(item => item.plyStatus == 0)
            for (let k = 0 ; k < v.playerMax ; k ++) {
                let playerInfo = players[k]
                let player = cc.instantiate(playerModel)
                player.position = cc.v2(ix * (k + 1) - nodePlayer.width / 2, 0)
                player.active = true
                nodePlayer.addChild(player)

                player.getChildByName("pic_priScoreDi1").active = false
                player.getChildByName("pic_priScoreDi2").active = false
                if (null == playerInfo)
                    continue;

                UserExtends.setUserFace({ node: player.getChildByName("nodeIcon").getChildByName("private_bill_icon"), url: "", uid: playerInfo.plyGuid, fixSizeByParent: true })

                if (playerInfo.itemNum > 0) {
                    player.getChildByName("pic_priScoreDi2").active = true
                    player.getChildByName("pic_priScoreDi1").active = false
                    cc.find("pic_priScoreDi2/labelScore", player).getComponent(cc.Label).string = "+" + playerInfo.itemNum
                }
                else {
                    player.getChildByName("pic_priScoreDi2").active = false
                    player.getChildByName("pic_priScoreDi1").active = true
                    cc.find("pic_priScoreDi1/labelScore", player).getComponent(cc.Label).string = "" + playerInfo.itemNum
                }

                let nickname = playerInfo.nickName
                if (nickname.length > 5)
                    nickname = nickname.substr(0, 5) + "..."
                player.getChildByName("labelNickname").getComponent(cc.Label).string = (DataManager.UserData.guid == playerInfo.plyGuid) ? "我" : nickname
                cc.find("labelNickname/picOwnerIcon", player).active = (v.ownerGuid == playerInfo.plyGuid)
            }
                
            let btn = item.getChildByName("btnEnterRoom").getComponent(cc.Button)
            btn.node.getChildByName("time").getComponent(cc.Label).string = this.getPastTime(v.pastTime)
            btn.interactable = (v.roomStatus == 0 && v.playerNum < v.playerMax) || v.roomStatus == 1

            btn.clickEvents = []

            let clickEventHandler = new cc.Component.EventHandler();
            clickEventHandler.target = this.node; 
            clickEventHandler.component = "PrivateBillPop";
            clickEventHandler.handler = "onInviteCode" + v.inviteCode; 

            this["onInviteCode" + v.inviteCode] = (sender) => {       
                getPrivateInviteInfo(v.inviteCode)
            }
                
            btn.clickEvents.push(clickEventHandler);

            btn = item.getChildByName("btnPrivateDetail").getComponent(cc.Button)
            btn.node.getChildByName("time").getComponent(cc.Label).string = this.getPastTime(v.pastTime)
            btn.interactable = v.roomStatus == 2
            btn.node.active = v.roomStatus == 2
            btn.clickEvents = []

            let clickEventHandler1 = new cc.Component.EventHandler()
            clickEventHandler1.target = this.node
            clickEventHandler1.component = "PrivateBillPop"
            clickEventHandler1.handler = "onDetail" + v.inviteCode

            this["onDetail" + v.inviteCode] = (sender) => {
                self.getPrivateGameDetail(v.inviteCode, v.createTime, v.createTime + v.pastTime)
            }

            btn.clickEvents.push(clickEventHandler1)
        }
    }

    getPastTime(val) {
        if (val > 24 * 3600)
            return Math.floor(val / 86400) + "天前创建"
        else if (val > 3600)
            return Math.floor(val / 3600) + "小时前创建"
        else 
            return Math.ceil(val / 60) + "分钟前创建"    
    }

    setPlayerIcon(nodeIcon, spriteFrame) {
        if (nodeIcon && spriteFrame) {
            nodeIcon.getChildByName("private_bill_icon").getComponent(cc.Sprite).spriteFrame = spriteFrame
            nodeIcon.getChildByName("private_bill_icon").setContentSize(nodeIcon.getContentSize())
        }
    }
    
    getPrivateGameDetail(inviteCode, createTime, lastEndTIme) {
        let socketMsg = {
            opcode: 'proto_cl_get_private_game_replay_req',
            inviteCode: inviteCode,
            createTime: createTime,
            lastEndTIme: lastEndTIme
        };
        NetManager.Instance.send("lobby", socketMsg)
    }

    proto_lc_get_private_game_replay_ack(message) {
        message = message.packet
        cc.log(message)
        SceneManager.Instance.popScene<String>("moduleLobby", "PrivateBillDetailPop", message.data)
    }
}   
