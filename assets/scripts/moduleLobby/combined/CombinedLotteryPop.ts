import BaseScene from "../../base/baseScene/BaseScene"
import DataManager from "../../base/baseData/DataManager"
import { showAwardResultPop, getNameByItemId, iMessageBox, czcEvent, getLowMoneyRoom, enterGame, unenoughGold } from "../../base/BaseFuncTs";
import { CombinedConfig } from "./CombinedConfig";
import { sendReloadUserData, receiveAdAward } from "../LobbyFunc";
import { AdsConfig } from "../../base/baseData/AdsConfig";
import { NodeExtends } from "../../base/extends/NodeExtends";

const { ccclass } = cc._decorator

@ccclass
export default class CombinedLotteryPop extends BaseScene {

    data: any = {}
    records: any = []

    _dataSeq = []

    onOpenScene() {
        this.initLightAni()   
        this.initView()

        cc.find("nodePop/nodeNumTip", this.node).active = false
    }

    initLightAni() {
        cc.find("nodePop/light", this.node).runAction(cc.repeatForever(cc.sequence(
            cc.delayTime(0.5),
            cc.rotateBy(0, 22.5)
        )))
    }

    initView() {
        const data = DataManager.CommonData["luckyDraw"].prob
        this._dataSeq = data
        for (let i = 0; i < this._dataSeq.length / 2; i ++) {
            let random = Math.floor(Math.random() * 100) % this._dataSeq.length
            let tmp = this._dataSeq[random]
            this._dataSeq[random] = this._dataSeq[i]
            this._dataSeq[i] = tmp
        }

        let i = 0;
        for (const d of this._dataSeq) {
            cc.find("nodePop/pannel/item" + i + "/desc", this.node).getComponent(cc.Label).string = d.name
            let icon = "moduleLobby/texture/"
            if (!!d.item.goldProductTime) {
                icon += d.name === "少量银币" ? "combined/lottery_icon_0" :
                        d.name === "中量银币" ? "combined/lottery_icon_0" :
                        d.name === "大量银币" ? "combined/lottery_icon_1" :
                        d.name === "海量银币" ? "combined/lottery_icon_2" : ""
            }
            else if (!!d.item.money) {
                icon += d.item.money < 1000000 ? "itemIcon/gold_icon_4" : "itemIcon/gold_icon_6"
            }
            else if (!!d.item.power) {
                icon += d.item.power === 5 ? "combined/lottery_icon_3" : d.item.power === 10 ? "combined/lottery_icon_4" : ""
            }
            NodeExtends.setNodeSprite({ node: cc.find("nodePop/pannel/item" + i + "/icon", this.node), url: icon })
            i ++
        }

        this.updateButton()
        this.showPowerState()
    }

    showLotteryResult(awardId, callback) {
        const pannel = cc.find("nodePop/pannel", this.node)

        cc.find("nodePop/effect", this.node).runAction(cc.sequence(
            cc.delayTime(3),
            cc.show(),
            cc.blink(1, 6),
            cc.hide()
        ))

        pannel.runAction(cc.sequence(
            cc.rotateBy(3, 3600 - (awardId * 360 / this._dataSeq.length)  + pannel.angle % 360).easing(cc.easeCircleActionInOut()),
            cc.delayTime(1),
            cc.callFunc(() => {
                if (callback)
                    callback()
            })
        ))
    }

    updateButton() {
        let count = !DataManager.CommonData["luckyDraw"].freeCnt ? 0 : DataManager.CommonData["luckyDraw"].freeCnt
        if (count > 0) {
            cc.find("nodePop/btnDraw", this.node).active = true
            cc.find("nodePop/lottery", this.node).getComponent(cc.Button).interactable = true
            cc.find("nodePop/btnAddtion", this.node).active = false
            cc.find("nodePop/btnGogame", this.node).active = false
            cc.find("nodePop/btnDisable", this.node).active = false
        }
        else if (DataManager.CommonData["CombinedAds"].luckyDraw.maxTimes === -1 || 
            DataManager.CommonData["CombinedAds"].luckyDraw.maxTimes > DataManager.CommonData["CombinedAds"].luckyDraw.count) {
            cc.find("nodePop/btnDraw", this.node).active = false
            cc.find("nodePop/lottery", this.node).getComponent(cc.Button).interactable = false
            cc.find("nodePop/btnAddtion", this.node).active = true
            cc.find("nodePop/btnGogame", this.node).active = false
            cc.find("nodePop/btnDisable", this.node).active = false
        }
        else if (DataManager.CommonData["luckyDraw"].gameExtraCntDaily === -1 ||
            DataManager.CommonData["luckyDraw"].gameExtraCntDaily - DataManager.CommonData["luckyDraw"].extraCnt > 0) {
            cc.find("nodePop/btnDraw", this.node).active = false
            cc.find("nodePop/lottery", this.node).getComponent(cc.Button).interactable = false
            cc.find("nodePop/btnAddtion", this.node).active = false
            cc.find("nodePop/btnGogame", this.node).active = true
            cc.find("nodePop/btnDisable", this.node).active = false
        }
        else {    
            cc.find("nodePop/btnDraw", this.node).active = false
            cc.find("nodePop/lottery", this.node).getComponent(cc.Button).interactable = false
            cc.find("nodePop/btnAddtion", this.node).active = false
            cc.find("nodePop/btnGogame", this.node).active = false
            cc.find("nodePop/btnDisable", this.node).active = true
        }

        cc.find("nodePop/lottery/labelChance", this.node).getComponent(cc.Label).string = "剩余" + Math.max(0, count) + "次"
    }

    onPressLottery() {
        let self = this
        cc.find("nodePop/lottery", this.node).getComponent(cc.Button).interactable = false
        cc.find("nodePop/btnDraw", this.node).getComponent(cc.Button).interactable = false
        cc.find("nodePop/lottery", this.node).runAction(cc.sequence(cc.delayTime(3), cc.callFunc(() => {
            cc.find("nodePop/lottery", this.node).getComponent(cc.Button).interactable = true
        })))
        cc.find("nodePop/btnDraw", this.node).runAction(cc.sequence(cc.delayTime(3), cc.callFunc(() => {
            cc.find("nodePop/btnDraw", this.node).getComponent(cc.Button).interactable = true
        })))
        CombinedConfig.luckyDraw(DataManager.CommonData["CombinedCurSeason"], (msg) => {
            if (!msg || msg.code !== 0)
                return

            console.log(msg)
            DataManager.CommonData["luckyDraw"].freeCnt = msg.freeCnt

            let idx = null
            for (let i in this._dataSeq) {
                let data = this._dataSeq[i]
                if (msg.goldProductTime) {
                    if (msg.goldProductTime === data.item.goldProductTime) {
                        idx = i 
                        break;
                    }
                }
                else if (msg.money) {
                    if (msg.money === data.item.money) {
                        idx = i
                        break;
                    }
                }
                else if (msg.power) {
                    if (msg.power === data.item.power) {
                        idx = i
                        break;
                    }
                }
            }

            if (!idx)
                return

            let power = msg.power ? msg.power : 1

            this.showLotteryResult(idx, () => {
                cc.find("nodePop/lottery", self.node).getComponent(cc.Button).interactable = true
                cc.find("nodePop/btnDraw", self.node).getComponent(cc.Button).interactable = true
                if (!!msg.goldProductTime) {
                    let awards = [
                        {
                            index: 11000,
                            // num: msg.goldProductTime * DataManager.CommonData["SpeedPerSec"] * power,
                            num: msg.change,
                        }
                    ]
                    showAwardResultPop(awards)
                    DataManager.CommonData["luckyDraw"].power = 0
                    DataManager.CommonData["CombinedMoney"] = msg.gold
                    self.showPowerState()
                }
                else if (!!msg.money) {
                    let awards = [
                        {
                            index: 0,
                            // num: msg.money * power,
                            num: msg.change,
                        }
                    ]
                    showAwardResultPop(awards)
                    sendReloadUserData()
                    DataManager.CommonData["luckyDraw"].power = 0
                    self.showPowerState()
                }
                else if (!!msg.power) {
                    DataManager.CommonData["luckyDraw"].power = msg.power
                    self.showPowerState()
                }
                this.updateButton()
            })
        })
    }

    showPowerState() {
        let tip = cc.find("nodePop/tipsPop", this.node)
        tip.active = DataManager.CommonData["luckyDraw"].power && DataManager.CommonData["luckyDraw"].power > 0
        tip.getChildByName("label").getComponent(cc.Label).string = "下次获得" + DataManager.CommonData["luckyDraw"].power + "倍奖励！"
    }

    onPressAddtion() {
        cc.find("nodePop/btnAddtion", this.node).getComponent(cc.Button).interactable = false
        cc.find("nodePop/btnAddtion", this.node).runAction(cc.sequence(cc.delayTime(3), cc.callFunc(() => {
            cc.find("nodePop/btnAddtion", this.node).getComponent(cc.Button).interactable = true
        })))
        receiveAdAward(AdsConfig.taskAdsMap.CombinedLottery, () => {
            this.getAdAward()    
        }, null, false, null, false)
    }

    onPressGoGame() {
        let gameId = 389
        czcEvent("合成", "抽奖快速开始", gameId + " " + DataManager.Instance.userTag)
        if (null == gameId)
            gameId = DataManager.Instance.getGameList()[0]

        if (gameId === 389)
            gameId = 3892

        let servers = getLowMoneyRoom(gameId)
        if (servers && servers.length > 0) {
            let i = Math.floor(Math.random() * 100 % servers.length)
            enterGame(servers[i])
        }
        else if (DataManager.UserData.money < DataManager.Instance.getReliefLine()) {
            // 没服务器就是初级场
            unenoughGold(0, DataManager.Instance.getReliefLine())
        }
    }

    getAdAward() {
        let self = this
        let money = DataManager.CommonData["CombinedMoney"]
        CombinedConfig.getAdAward(DataManager.CommonData["CombinedCurSeason"], DataManager.CommonData["CombinedAds"].luckyDraw.id, (msg) => {
            cc.find("nodePop/btnAddtion", this.node).getComponent(cc.Button).interactable = true
            console.log(msg)
            if (msg.code !== 0) {
                iMessageBox(msg.errMsg)
                self.closeSelf()
                return
            }          

            DataManager.CommonData["CombinedAds"].luckyDraw.count = msg.adCount
            DataManager.CommonData["luckyDraw"].freeCnt = msg.freeCnt

            self.updateButton()
        })
    }
}
