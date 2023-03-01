/**
 * Create by Jin on 2022.12.8
 */

import { confusonFunc } from "../base/confusonFunc";
import { AdsConfig } from "../base/baseData/AdsConfig"
import DataManager from "../base/baseData/DataManager"
import { iMessageBox, getLowMoneyRoom, enterGame, unenoughGold, getUserRankDate, czcEvent } from "../base/BaseFuncTs"
import BaseScene from "../base/baseScene/BaseScene"
import WxWrapper from "../base/WxWrapper"
import { checkAdCanReceive, receiveAdAward,getAdLeftTimes } from "./LobbyFunc"
import NetManager from "../base/baseNet/NetManager";

const { ccclass } = cc._decorator

@ccclass
export default class AwardOfPlayGamePop extends BaseScene {

    ConfirmFunction: Function
    onLoad(){
        console.log("jin---AwardOfPlayGamePop:", )
        this.updateCount()
    }
    //TODO 1.前往比赛  2.剩余次数
    onPressGoGame() {
        console.log("jin---onPressGoGame")
        czcEvent("新春抽豪礼前往对局" + DataManager.Instance.userTag)
        this.ConfirmFunction= ()=>{
            let lastGameId = 3892
            let servers = getLowMoneyRoom(lastGameId)
            if (servers && servers.length > 0) {
                let i = Math.floor(Math.random() * 100 % servers.length)
                enterGame(servers[i])
            } else if (DataManager.UserData.money < DataManager.Instance.getReliefLine()) {
                // 没服务器就是初级场
                unenoughGold(0, DataManager.Instance.getReliefLine())
            }
        }
        this.checkIsInGame()
    }

    updateCount() {
        cc.find("node_count/lb_count", this.node).getComponent(cc.Label).string = "今日已获得：" + (10 - getAdLeftTimes(AdsConfig.taskAdsMap.RewardOfPlayGame))+"次"
    }

    onPressQuestion(){
        console.log("jin---onPressQuestion")
        cc.find("nodeHelp", this.node).active = true
    }

    checkIsInGame() {        
        let socketMsg = {
            opcode: "proto_cl_store_safe_amount_req",
            plyGuid: DataManager.UserData.guid,
            amount: 0
        }
        NetManager.Instance.send("lobby", socketMsg)
    }

    proto_lc_store_safe_amount_ack(message) {

        message = message.packet
        console.log("jin---proto_lc_store_safe_amount_ack: " , message) 
        if (message.ret != -1){
            this.ConfirmFunction()
        }else {           
            iMessageBox("您有未完成的游戏,请先完成游戏!")
        }
        
    }
}