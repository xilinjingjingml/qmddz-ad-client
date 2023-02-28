import BaseComponent from "../base/BaseComponent"
import { AdsConfig } from "../base/baseData/AdsConfig"
import DataManager from "../base/baseData/DataManager"
import { enterGame, getLowMoneyRoom, playADBanner } from "../base/BaseFuncTs"
import SceneManager from "../base/baseScene/SceneManager"
import { receiveAdAward } from "./LobbyFunc"

const { ccclass } = cc._decorator

@ccclass
export default class BankruptDefend extends BaseComponent {

    onOpenScene() {
        playADBanner(true, AdsConfig.banner.BankruptDefend)

        this.socketName = "lobby"
        this.addListener("updateReliefStatus", this.updateReliefStatus.bind(this))
        cc.find("nodePop/btnPlay", this.node).getComponent(cc.Button).interactable = DataManager.CommonData["reliefStatus"]["reliefTimes"] > 0
        cc.find("nodePop/count", this.node).getComponent(cc.Label).string = DataManager.CommonData["reliefStatus"]["reliefTimes"]
        cc.find("nodePop/reliefNum", this.node).getComponent(cc.Label).string = DataManager.CommonData["reliefStatus"]["reliefAwardCount"]
    }

    onBannerResize(msg) {
        cc.log("BankruptDefend.onBannerResize", msg.rect.height)
        const box = cc.find("nodePop/btnPlay", this.node).getBoundingBoxToWorld()
        const diff = msg.rect.height - box.y
        if (diff > 0) {
            cc.find("nodePop", this.node).y += diff
        }
    }

    onDestroy() {
        playADBanner(false, AdsConfig.banner.BankruptDefend)
    }

    updateReliefStatus() {
        if (null != cc.find("nodePop/btnPlay", this.node))
            cc.find("nodePop/btnPlay", this.node).getComponent(cc.Button).interactable = DataManager.CommonData["reliefStatus"]["reliefTimes"] > 0
        if (null != cc.find("nodePop/count", this.node))
            cc.find("nodePop/count", this.node).getComponent(cc.Label).string = DataManager.CommonData["reliefStatus"]["reliefTimes"]
    }

    onPressRelief() {
        cc.audioEngine.playEffect(DataManager.Instance.menuEffect, false)

        if (DataManager.CommonData["reliefStatus"]["reliefTimes"] <= 0) {
            return
        }

        receiveAdAward(AdsConfig.taskAdsMap.BankruptDefend, () => {
            if (!this.node.isValid) {
                return
            }
            const message = {
                opcode: "proto_cl_get_relief_req",
                type: 0
            }

            this.sendMessage(message)
            this.initParam["closeCallback"] = null
            this.closeSelf()
        })
    }

    onPressShop() {
        this.initParam["closeCallback"] = null
        if (DataManager.CommonData["gameServer"]) {
            SceneManager.Instance.popScene("moduleLobby", "QuickPayPop")
            this.closeSelf()
        } else {
            let self = this
            let checkMoney = function () {
                if (DataManager.UserData.money >= DataManager.Instance.getReliefLine()) {
                    let gameId = DataManager.load(DataManager.UserData.guid + "lastGameId")
                    if (null != gameId) {
                        let servers = getLowMoneyRoom(gameId)
                        if (servers && servers.length > 0) {
                            enterGame(servers[0])
                            self.closeSelf()
                        }
                    }
                }
            }
            SceneManager.Instance.popScene("moduleLobby", "ShopScene", { closeCallback: checkMoney, type: 0 })
        }
    }
}
