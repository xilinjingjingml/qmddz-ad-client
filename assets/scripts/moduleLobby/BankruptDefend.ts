import BaseScene from "../base/baseScene/BaseScene";
import { getReliefState, getADAward } from "./LobbyFunc";
import DataManager from "../base/baseData/DataManager";
import { playAD, checkServerMoneyLimit, getLowMoneyRoom, enterGame, playADBanner } from "../base/BaseFuncTs";
import SceneManager from "../base/baseScene/SceneManager";
import BaseComponent from "../base/BaseComponent";
import { AdsConfig } from "../base/baseData/AdsConfig";


const {ccclass, property} = cc._decorator;

const AD_AREA = 3

@ccclass
export default class BankruptDefend extends BaseComponent {

    onOpenScene() {
        
        if(playADBanner(true, AdsConfig.banner.BankruptDefend)) {
            this["nodePop"].y += 20
        }

        this.socketName = "lobby"
        this.addListener("updateReliefStatus", this.updateReliefStatus.bind(this))
        cc.find("nodePop/btnPlay", this.node).getComponent(cc.Button).interactable = DataManager.CommonData["reliefStatus"]["reliefTimes"] > 0
        cc.find("nodePop/count", this.node).getComponent(cc.Label).string = DataManager.CommonData["reliefStatus"]["reliefTimes"]
        cc.find("nodePop/reliefNum", this.node).getComponent(cc.Label).string = DataManager.CommonData["reliefStatus"]["reliefAwardCount"]
    }

    onCloseScene() {
        playADBanner(false)
    }

    onDestroy() {
        playADBanner(false)
    }

    updateReliefStatus() {
        if (null != cc.find("nodePop/btnPlay", this.node))
            cc.find("nodePop/btnPlay", this.node).getComponent(cc.Button).interactable = DataManager.CommonData["reliefStatus"]["reliefTimes"] > 0
        if (null != cc.find("nodePop/count", this.node))
            cc.find("nodePop/count", this.node).getComponent(cc.Label).string = DataManager.CommonData["reliefStatus"]["reliefTimes"]
    }
    
    onPressRelief(){
        cc.audioEngine.playEffect(DataManager.Instance.menuEffect, false)

        if (DataManager.CommonData["reliefStatus"]["reliefTimes"] <= 0)
            return

        let self = this
        playAD(AdsConfig.video.BankruptDefend, () => {
            getADAward(AD_AREA, () => {
                let message = {
                    opcode: "proto_cl_get_relief_req",
                    type: 0
                };
                self.sendMessage(message)
                self.initParam["closeCallback"] = null
                self.closeSelf()
            } );
        })
    }

    onPressShop() {        
        this.initParam["closeCallback"] = null
        if (DataManager.CommonData["gameServer"]){
            SceneManager.Instance.popScene("moduleLobby", "QuickPayPop")
            this.closeSelf()
        }
        else{
            let self = this
            let checkMoney = function() {
                if (DataManager.UserData.money >= DataManager.Instance.getReliefLine()) {
                    let gameId = DataManager.load(DataManager.UserData.guid + "lastGameId")
                    if (null != gameId) {
                        let servers = getLowMoneyRoom(gameId)
                        if (servers.length > 0){
                            enterGame(servers[0])
                            self.closeSelf()
                        }
                    }      
                }
            }
            SceneManager.Instance.popScene("moduleLobby", "ShopScene", {closeCallback: checkMoney, type: 0})
        }
    }

    onPressQttShop() {        
        this.initParam["closeCallback"] = null
        if (DataManager.CommonData["gameServer"]){
            SceneManager.Instance.popScene("moduleLobby", "ShopPop", {type: 2})
            this.closeSelf()
        }
        else{
            let self = this
            let checkMoney = function() {
                if (DataManager.UserData.money >= DataManager.Instance.getReliefLine()) {
                    let gameId = DataManager.load(DataManager.UserData.guid + "lastGameId")
                    if (null != gameId) {
                        let servers = getLowMoneyRoom(gameId)
                        if (servers.length > 0){
                            enterGame(servers[0])
                            self.closeSelf()
                        }
                    }      
                }
            }
            SceneManager.Instance.popScene("moduleLobby", "ShopScene", {closeCallback: checkMoney, type: 1})
        }
    }
}
