import BaseFunc = require("../base/BaseFunc")
import BaseComponent from "../base/BaseComponent";
import { AdsConfig } from "../base/baseData/AdsConfig";
import DataManager from "../base/baseData/DataManager";
import { iMessageBox, showAwardResultPop } from "../base/BaseFuncTs";
import { getADDraw, getExchangeConfig, sendReloadUserData, checkADNum } from "../moduleLobby/LobbyFunc";
import GameLogic from "./GameLogic.rpddz";
import * as proto from "./proto/client.rpddz";

const { ccclass, property } = cc._decorator;

@ccclass
export default class GameResultLayer extends BaseComponent {
    thisComponentName: string = "GameResultLayer.rpddz"

    winFlag: boolean = false
    nGameMoney: number
    nDouble: number
    vecGameStatiscs: { nChairID: number, name: string, nScore: number, is_lord: boolean, headimage: string, sex_: number, nJifen: number, }[]
    btnExit: cc.Node
    btnClose: cc.Node
    btnZhanJi: cc.Node
    btnContinue: cc.Node
    btnContinueWithRound: cc.Node
    label_time: cc.Node
    labelRestRound: cc.Node
    btnLookCard: cc.Node
    btnShowStart: cc.Node
    btnShowBeishuInfo: cc.Node
    btnHideBeishuInfo: cc.Node
    nodeWin: cc.Node
    nodeLose: cc.Node
    nodeTitleWin: cc.Node
    nodeContent: cc.Node
    nodeTitleLose: cc.Node
    labelTip: cc.Node
    nodeBeishuInfo: cc.Node
    label_init: cc.Node
    label_show: cc.Node
    label_rob: cc.Node
    label_bomb: cc.Node
    label_spring: cc.Node
    label_leftcard: cc.Node
    label_common: cc.Node
    label_lord: cc.Node
    label_nongmin: cc.Node
    label_result: cc.Node
    btn_jiqipai: cc.Node
    btn_fanhuan: cc.Node
    tips_bg: cc.Node
    btn_duihuan: cc.Node
    lbl_progress: cc.Node
    progressBar: cc.Node
    label_rob_title: cc.Node
    exchangeNum: number = 100000
    isShowGameRedPacketAwardLayer: boolean = true;

    start() {
        cc.log("GameResultLayer")

        this.nGameMoney = Math.abs(this.initParam.nGameMoney)
        this.nDouble = this.initParam.nDouble
        this.vecGameStatiscs = this.initParam.vecUserResult1

        this.winFlag = this.showPlayerInfo()

        this.showAni()
        if (GameLogic.Instance().gamescene.isScoreTable()) {
            cc.find("nodeContent/nodeLose/nodeHardText/nodeHardMoney/labelHardMoney", this.node).getComponent(cc.Label).string = "积分"
            cc.find("nodeContent/nodeWin/nodeHardText/nodeHardTouXiang/labelHardTouXiang", this.node).getComponent(cc.Label).string = "积分"
        }
        this.updateUserData()

        // 初始化
        this.btnClose.active = true
        this.btnContinueWithRound.active = true
        this.btnExit.active = false
        this.btnContinue.active = false
        this.btnZhanJi.active = false
        this.btnLookCard.active = false
        this.btnShowStart.active = false

        if (GameLogic.Instance().isPrivateRoom()) {
            this.btnContinueWithRound.active = false
            const gamescene = GameLogic.Instance().gamescene
            if (gamescene.privateInvite && gamescene.nJuCount >= gamescene.privateInvite.tableTime) {
                this.btnClose.active = false
                this.btnZhanJi.active = true
            } else {
                this.showCountdown(this.label_time, 10, this.onPressContinue.bind(this))
            }
            return
        } else if (GameLogic.Instance().isMatchTable()) {
            this.btnContinueWithRound.active = false
            this.btnClose.active = false
            this.showCountdown(this.label_time, 3, this.onPressContinue.bind(this))
            return
        }

        let restround = GameLogic.Instance().redpacket_info.limitRounds - GameLogic.Instance().redpacket_info.curRounds
        if (restround > 0) {
            this.labelRestRound.$Label.string = restround
        } else {
            this.labelRestRound.$Label.string = GameLogic.Instance().redpacket_info.limitRounds
        }

        if (GameLogic.Instance().isChooseStart()) {
            this.btnLookCard.active = true
            if (GameLogic.Instance().isRPGMode()) {
                this.btnShowStart.active = true
            }
            if (DataManager.GlobalData && DataManager.GlobalData.noAD) {
                this.btnLookCard.active = false
            }
	    if (!checkADNum(AdsConfig.taskAdsMap.LookLordCard)) {
                this.btnLookCard.active = false
            }
        }
    }

    __bindButtonHandler() {
        cc.log("__bindButtonHandler")
        BaseFunc.AddClickEvent(this.btnClose, this.node, this.thisComponentName, "onPressClose", 0)
        BaseFunc.AddClickEvent(this.btnContinueWithRound, this.node, this.thisComponentName, "onPressContinue", 0)
        BaseFunc.AddClickEvent(this.btnExit, this.node, this.thisComponentName, "onPressExit", 0)
        BaseFunc.AddClickEvent(this.btnContinue, this.node, this.thisComponentName, "onPressContinue", 0)
        BaseFunc.AddClickEvent(this.btnZhanJi, this.node, this.thisComponentName, "onPressZhanJi", 0)
        BaseFunc.AddClickEvent(this.btnShowStart, this.node, this.thisComponentName, "onPressShowStart", 5)
        BaseFunc.AddClickEvent(this.btnLookCard, this.node, this.thisComponentName, "onPressLookCard", 0)
        BaseFunc.AddClickEvent(this.btnShowBeishuInfo, this.node, this.thisComponentName, "onPressShowBeishuInfo", 0)
        BaseFunc.AddClickEvent(this.btnHideBeishuInfo, this.node, this.thisComponentName, "onPressHideBeishuInfo", 0)
        BaseFunc.AddClickEvent(this.btn_jiqipai, this.node, this.thisComponentName, "onPressJipaiqi", 0)
        BaseFunc.AddClickEvent(this.btn_fanhuan, this.node, this.thisComponentName, "onPressFanhuan", 0)
        BaseFunc.AddClickEvent(this.btn_duihuan, this.node, this.thisComponentName, "onPressDuihuan", 0)
    }

    showAni() {
        this.nodeWin.active = this.winFlag
        this.nodeLose.active = !this.winFlag
        this.nodeTitleWin.active = this.winFlag
        this.nodeTitleLose.active = !this.winFlag

        const pos = this.nodeContent.position
        this.nodeContent.opacity = 0
        this.nodeContent.x = this.winFlag ? 400 : -300

        this.nodeContent.stopAllActions()
        this.nodeContent.runAction(cc.sequence([
            cc.delayTime(0.01),
            cc.spawn([
                cc.fadeTo(0.2, 255),
                cc.moveTo(0.8, pos).easing(cc.easeBackOut())
            ])
        ]))
    }

    showPlayerInfo() {
        let winFlag = false

        for (let i = 0; i < 3; i++) {
            this["nodePlayer" + i].active = false
            this["nodeRole" + i].active = false
        }

        let winMaxMoney = 1
        if (GameLogic.Instance().serverInfo.winMaxMoney > 0) {
            winMaxMoney = GameLogic.Instance().serverInfo.winMaxMoney
        } else {
            winMaxMoney = GameLogic.Instance().serverInfo.winMaxBet * GameLogic.Instance().serverInfo.baseBet
        }
        const tax = GameLogic.Instance().serverInfo.tax || 0

        this.vecGameStatiscs.forEach((v, k) => {
            let double = GameLogic.Instance().gamescene.getDouble(v.nChairID)
            this["nodeRole" + k].active = v.is_lord || false
            this["nodePlayer" + k].active = true
            this["labelDiZhu" + k].$Label.string = this.nGameMoney
            this["labelBeiShu" + k].$Label.string = double
            this["labelMoney" + k].$Label.string = v.nScore
            if (GameLogic.Instance().isMatchTable() && v.nChairID != 0) {
                v.headimage = ""
            }
            BaseFunc.SetFrameTextureNet(this["sptAvatar" + k].$Sprite, v.headimage)

            if (double * this.nGameMoney > winMaxMoney && Math.abs(v.nScore) + 1 >= winMaxMoney) {
                this["result_limit" + k].active = true
            }
            if (v.nScore < 0) {
                const player = GameLogic.Instance().gamescene.getPlayerByLocalChairID(v.nChairID)
                if (player) {
                    if (player.userData.money <= 1 || (player.userData.money + v.nScore - tax) <= 1) {
                        this["result_broke" + k].active = true
                    }
                }
            }

            if (v.nChairID == 0) {
                if (v.nScore > 0) {
                    winFlag = true
                }
                if (this.nGameMoney * double > Math.abs(v.nScore)) {
                    this.tips_bg.active = true
                }
            }

            let color1: cc.Color
            let color2: cc.Color
            if (winFlag) {
                color1 = v.nChairID == 0 ? cc.color(255, 255, 255) : cc.color(255, 245, 132)
                color2 = cc.color(255, 168, 0)
            } else {
                color1 = v.nChairID == 0 ? cc.color(255, 251, 140) : cc.color(135, 174, 230)
                color2 = cc.color(81, 128, 214)
            }
            this["labelDiZhu" + k].color = color1.clone()
            this["labelBeiShu" + k].color = color1.clone()
            this["labelMoney" + k].color = color1.clone()
            this.labelTip.color = color2
        })

        return winFlag
    }

    onPressClose() {
        this.close()
        if (GameLogic.Instance().isChooseStart()) {
            GameLogic.Instance().gamescene.showStartGame(true)
            return
        }
        GameLogic.Instance().gamescene.showContinue(true)
    }

    onPressContinue() {
        this.close()
        if (GameLogic.Instance().isChooseStart()) {
            GameLogic.Instance().gamescene.onPressStartGame()
            return
        }
        GameLogic.Instance().gamescene.onPressContinue(null, null)
    }

    onPressExit() {
        this.close()
        GameLogic.Instance().LeaveGameScene()
    }

    close() {
        if (GameLogic.Instance().gamescene && GameLogic.Instance().gamescene.state == "endGame") {
            GameLogic.Instance().gamescene.doStateChangeReInit()
        }
        this.label_time.stopAllActions()
        this.closeSelf()
    }

    showCountdown(node: cc.Node, time: number, callback: Function) {
        this.btnContinue.active = true
        node.stopAllActions()
        node.runAction(cc.repeatForever(cc.sequence([
            cc.callFunc(() => {
                node.getComponent(cc.Label).string = '（' + time + '）'
                time--
                if (time < 0) {
                    callback()
                }
            }),
            cc.delayTime(1),
        ])))
    }

    onPressZhanJi() {
        this.close()
        GameLogic.Instance().showPrivateZhanJiLayer({
            vecGameStatiscs: GameLogic.Instance().gamescene.vecGameStatiscs,
            close: true,
        })
    }

    onPressShowStart(EventTouch, data) {
        this.close()
        GameLogic.Instance().gamescene.onPressShowStart(EventTouch, data)
    }

    onPressLookCard(EventTouch, data) {
        this.close()
        GameLogic.Instance().gamescene.onPressLookCard(EventTouch, data)
    }

    onPressShowBeishuInfo(EventTouch, data) {
        if (!GameLogic.Instance().gamescene.beishuInfo) {
            return
        }
        this.showBeishuInfo(true)
    }

    onPressHideBeishuInfo(EventTouch, data) {
        this.showBeishuInfo(false)
    }

    showBeishuInfo(active) {
        this.nodeBeishuInfo.active = active
        if (!active) {
            return
        }
        const beishuString = (n) => {
            return n > 1 ? n : "---"
        }
        enum BEI {
            BEI_INIT,		// 初始倍数
            BEI_SHOWCARD,	// 明牌倍数
            BEI_ROBLORD,	// 抢地主倍数
            BEI_BOMB,		// 炸弹倍数
            BEI_SPRING,		// 春天倍数
            BEI_LEFTCARD,	// 剩牌倍数
            BEI_CALLSCORE,	// 叫地主倍数
        }
        const vecBeiShuInfo = GameLogic.Instance().gamescene.beishuInfo.vecBeiShuInfo
        const vecPlayerBeiShu = GameLogic.Instance().gamescene.beishuInfo.vecPlayerBeiShu
        let commonBeishu = 1
        for (const beishu of vecBeiShuInfo) {
            commonBeishu *= beishu
        }

        let isMyLord = false
        let lordBeishu = 1
        for (let i = 0; i < vecPlayerBeiShu.length; i++) {
            const player = GameLogic.Instance().gamescene.getPlayerByChairID(i)
            if (player && player.isLord) {
                isMyLord = player.isMe()
                lordBeishu = vecPlayerBeiShu[i]
            }
        }

        let farmerBeishu = 0
        for (let i = 0; i < vecPlayerBeiShu.length; i++) {
            const player = GameLogic.Instance().gamescene.getPlayerByChairID(i)
            if (player && !player.isLord) {
                if (isMyLord) {
                    farmerBeishu += vecPlayerBeiShu[i]
                } else if (player.isMe()) {
                    farmerBeishu = vecPlayerBeiShu[i]
                    break
                }
            }
        }
        farmerBeishu = farmerBeishu || 1

        if (GameLogic.Instance().gamescene.isCallScore()) {
            this.label_rob_title.getComponent(cc.Label).string = "叫分"
            this.label_rob.getComponent(cc.Label).string = beishuString(vecBeiShuInfo[BEI.BEI_CALLSCORE])
        } else {
            this.label_rob_title.getComponent(cc.Label).string = "抢地主"
            this.label_rob.getComponent(cc.Label).string = beishuString(vecBeiShuInfo[BEI.BEI_ROBLORD])
        }
        this.label_init.getComponent(cc.Label).string = beishuString(vecBeiShuInfo[BEI.BEI_INIT])
        this.label_show.getComponent(cc.Label).string = beishuString(vecBeiShuInfo[BEI.BEI_SHOWCARD])
        this.label_bomb.getComponent(cc.Label).string = beishuString(vecBeiShuInfo[BEI.BEI_BOMB])
        this.label_spring.getComponent(cc.Label).string = beishuString(vecBeiShuInfo[BEI.BEI_SPRING])
        this.label_leftcard.getComponent(cc.Label).string = beishuString(vecBeiShuInfo[BEI.BEI_LEFTCARD])
        this.label_common.getComponent(cc.Label).string = "" + commonBeishu
        this.label_lord.getComponent(cc.Label).string = "x" + lordBeishu
        this.label_nongmin.getComponent(cc.Label).string = "x" + farmerBeishu
        this.label_result.getComponent(cc.Label).string = "" + commonBeishu * lordBeishu * farmerBeishu
    }

    GameRedPacketAwardLayer_close() {
        this.isShowGameRedPacketAwardLayer = false
        this.updateUserData()
    }

    updateUserData() {
        if (GameLogic.Instance().isPrivateRoom() || GameLogic.Instance().isMatchTable()) {
            this.btn_jiqipai.active = false
            this.btn_fanhuan.active = false
            this.btn_duihuan.active = false
            return
        }
        this.refreshJipaiqi()
        this.refreshFanhuan()
        this.refreshDuihuan()
    }

    refreshJipaiqi() {
        const adCfg = DataManager.CommonData["adNum"][AdsConfig.taskAdsMap.CardNoteBuyPop]
        const left = adCfg.allNum - adCfg.countNum
        this.btn_jiqipai.getComponent(cc.Button).interactable = left > 0
        cc.find("btn_jiqipai/item_num_bg/label", this.node).getComponent(cc.Label).string = "" + left
    }

    onPressJipaiqi() {
        getADDraw(AdsConfig.taskAdsMap.CardNoteBuyPop, () => {
            this.refreshJipaiqi()
        })
    }

    refreshFanhuan() {
        if (this.isShowGameRedPacketAwardLayer && GameLogic.Instance().isSceneExist("GameRedPacketAwardLayer")) {
            this.btn_fanhuan.active = false
            return
        }

        if (!checkADNum(AdsConfig.taskAdsMap.Exemption)) {
            this.btn_fanhuan.active = false
            return
        }

        const regainLose = GameLogic.Instance().gamescene.regainLose
        if (regainLose && regainLose.nRet == 0 && regainLose.nTime > 0) {
            this.btn_fanhuan.active = true

            const node = cc.find("label", this.btn_fanhuan)
            const to2 = (n: number) => {
                return n < 10 ? "0" + n : "" + n
            }
            let time = regainLose.nTime
            node.stopAllActions()
            node.runAction(cc.repeatForever(cc.sequence([
                cc.callFunc(() => {
                    node.getComponent(cc.Label).string = to2(Math.floor(time / 60)) + ":" + to2(Math.floor(time % 60))
                    time--
                    if (time < 0) {
                        this.btn_fanhuan.active = false
                        GameLogic.Instance().closeScene("RegainLosePop")
                    }
                }),
                cc.delayTime(1),
            ])))
            GameLogic.Instance().showRegainLosePop()
        } else {
            this.btn_fanhuan.active = false
        }
    }

    onPressFanhuan() {
        GameLogic.Instance().showRegainLosePop()
    }

    proto_gc_regain_lose_score_ack(event) {
        const message: proto.Iproto_gc_regain_lose_score_ack = event.packet
        if (message.nRet == 0) {
            this.refreshFanhuan()
        } else if (message.nRet == 1) {
            this.btn_fanhuan.active = false
        }
    }

    refreshDuihuan() {
        this.btn_duihuan.active = false
        if (null == DataManager.CommonData["ExchangeInfo"])
            getExchangeConfig(this.updateDuihuan.bind(this))
        else
            this.updateDuihuan()
    }

    onPressDuihuan() {
        if (DataManager.UserData.getItemNum(GameLogic.Instance().HONGBAO_GOLD_TICKET) < this.exchangeNum) {
            iMessageBox("您的红包券不足，继续游戏赚取吧")
            return
        }
        this.isShowGameRedPacketAwardLayer = false
        GameLogic.Instance().showExchangePop()
    }

    updateDuihuan() {
        let exchangeInfo = DataManager.CommonData["ExchangeInfo"]
        if (exchangeInfo == null) {
            return
        }
        for (const iterator of exchangeInfo) {
            if (iterator.exchangeItemList && iterator.exchangeItemList.length > 0) {
                const exchangeItem = iterator.exchangeItemList[0]
                if (exchangeItem.exchangeItem == GameLogic.Instance().HONGBAO_GOLD_TICKET && exchangeItem.exchangeNum == this.exchangeNum) {
                    const num = this.isShowGameRedPacketAwardLayer ? GameLogic.Instance().gamescene.fakeRedPacketNum : DataManager.UserData.getItemNum(GameLogic.Instance().HONGBAO_GOLD_TICKET)
                    this.btn_duihuan.active = true
                    cc.find("title", this.btn_duihuan).getComponent(cc.Label).string = iterator.goodsName
                    // this.btn_duihuan.getComponent(cc.Button).interactable = num >= exchangeItem.exchangeNum
                    const n = num > 10000 ? (Math.floor(num / 1000) / 10) + "万" : num + ""
                    this.lbl_progress.getComponent(cc.Label).string = n + "/" + (exchangeItem.exchangeNum / 10000) + "万"
                    this.progressBar.getComponent(cc.ProgressBar).progress = Math.min(1, num / exchangeItem.exchangeNum)
                }
            }
        }
    }
}
