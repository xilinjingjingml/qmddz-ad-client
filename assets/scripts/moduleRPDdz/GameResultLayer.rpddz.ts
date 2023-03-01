import BaseFunc = require("../base/BaseFunc")
import BaseComponent from "../base/BaseComponent"
import { AdsConfig } from "../base/baseData/AdsConfig"
import DataManager from "../base/baseData/DataManager"
import { czcEvent, getRedPacketAwardConfig, playADBanner, socialShare } from "../base/BaseFuncTs"
import { checkAdCanReceive, getAdLeftTimes, getNextAdType, receiveAdAward, getTaskList } from "../moduleLobby/LobbyFunc"
import AudioManager from "./AudioManager.rpddz"
import GameLogic from "./GameLogic.rpddz"
import PopupManager from "./PopupManager"
import * as proto from "./proto/client.rpddz"

const { ccclass } = cc._decorator

@ccclass
export default class GameResultLayer extends BaseComponent {
    thisComponentName: string = "GameResultLayer.rpddz"

    winFlag: boolean = false
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
    label_rob_title: cc.Node
    btnWinGet: cc.Node;
    nodeWinget: cc.Node;
    btn_icon_win_get_share: cc.Node;
    btn_icon_win_get_ad: cc.Node;
    btnRedPacketDetail: cc.Node;
    win_get_btn_guang2: cc.Node;
    win_get_btn_guang3: cc.Node;
    initParam: proto.proto_gc_game_result_not1 & IGameResult
    popupmanager: PopupManager; // 游戏结束后顺序弹框
    isShowGetMotion: boolean = false
    nodeMotionGetAni: cc.Node;
    motionGetAni: cc.Node;
    btn_share: cc.Node;
    label_share: cc.Node;
    taskData: any = {}

    start() {
        if (DataManager.CommonData["first"] == 1 && DataManager.CommonData["roleCfg"]["roundSum"] == 1) {
            czcEvent("斗地主", "结算界面", "新用户")
        }
        cc.log("[GameResultLayer.start]")
        playADBanner(true, AdsConfig.banner.GameResultLayer_rpddz)
        this.registMessageHandler()
        this.showUserResult()
        this.showAni()
        this.showResultButton()
        this.updateUserData()
        this.refreshWinGet()
        this.refreshJipaiqi()
        this.refreshShare()
        getTaskList(0)
        getTaskList(1)
    }

    __bindButtonHandler() {
        cc.log("[GameResultLayer.__bindButtonHandler]")
        BaseFunc.AddClickEvent(this.btnClose, this.node, this.thisComponentName, "onPressClose", 0)
        BaseFunc.AddClickEvent(this.btnContinueWithRound, this.node, this.thisComponentName, "onPressContinue", 0)
        BaseFunc.AddClickEvent(this.btnExit, this.node, this.thisComponentName, "onPressExit", 0)
        BaseFunc.AddClickEvent(this.btnContinue, this.node, this.thisComponentName, "onPressContinue", 0)
        BaseFunc.AddClickEvent(this.btnZhanJi, this.node, this.thisComponentName, "onPressZhanJi", 0)
        BaseFunc.AddClickEvent(this.btnShowStart, this.node, this.thisComponentName, "onPressShowStart", 5)
        BaseFunc.AddClickEvent(this.btnLookCard, this.node, this.thisComponentName, "onPressLookCard", 0)
        BaseFunc.AddClickEvent(this.btnShowBeishuInfo, this.node, this.thisComponentName, "onPressShowBeishuInfo", 0)
        BaseFunc.AddClickEvent(this.btn_jiqipai, this.node, this.thisComponentName, "onPressJipaiqi", 0)
        BaseFunc.AddClickEvent(this.btn_fanhuan, this.node, this.thisComponentName, "onPressRegainLose", 0)
        BaseFunc.AddClickEvent(this.btnWinGet, this.node, this.thisComponentName, "onPressWinGet", 0)
        BaseFunc.AddClickEvent(this.btnRedPacketDetail, this.node, this.thisComponentName, "onPressRedPacket", 0)
        BaseFunc.AddClickEvent(this.btn_share, this.node, this.thisComponentName, "onPressShare", 0)
    }

    registMessageHandler() {
        const popupManager = new PopupManager([
            this.checkPopup_Highlight.bind(this),
            this.checkPopup_RedPacketAward.bind(this),
            this.checkPopup_RegainLose.bind(this),
        ])
        this.addListener("GameResult_PopupManager", popupManager.showPopup.bind(popupManager))
        this.popupmanager = popupManager
    }

    proto_gc_regain_lose_score_ack(event) {
        GameLogic.Instance().gamescene.regainLose = event.packet
        this.refreshRegainLose()
    }

    onBannerResize(msg) {
        const box = cc.find("nodePop/node_button/btnWinGet/win_get_btn_guang1", this.node).getBoundingBoxToWorld()
        const diff = msg.rect.height - box.y
        if (diff > 0) {
            cc.find("nodePop", this.node).y += diff
        }
    }

    showUserResult() {
        this.winFlag = false
        const winMaxMoney = GameLogic.Instance().getWinMaxMoney()
        const tax = GameLogic.Instance().serverInfo.tax || 0

        if (GameLogic.Instance().gamescene.isScoreTable()) {
            cc.find("nodeContent/nodeLose/nodeHardText/nodeHardMoney/labelHardMoney", this.node).getComponent(cc.Label).string = "积分"
            cc.find("nodeContent/nodeWin/nodeHardText/nodeHardTouXiang/labelHardTouXiang", this.node).getComponent(cc.Label).string = "积分"
        }

        for (let i = 0; i < 3; i++) {
            this["nodePlayer" + i].active = false
            this["nodeRole" + i].active = false
        }
        this.initParam.vecUserResult1.forEach((v, k) => {
            this["nodePlayer" + k].active = true
            this["nodeRole" + k].active = v.is_lord || false
            this["labelDiZhu" + k].$Label.string = Math.abs(this.initParam.nGameMoney)
            this["labelBeiShu" + k].$Label.string = GameLogic.Instance().gamescene.getDouble(v.nChairID)
            this["labelMoney" + k].$Label.string = v.nScore
            this["labelName" + k].$Label.string = v.name.length > 7 ? v.name.substr(0, 5) + "..." : v.name
            if (GameLogic.Instance().isMatchTable() && v.nChairID != 0) {
                v.headimage = ""
            }
            BaseFunc.SetFrameTextureNet(this["sptAvatar" + k].$Sprite, v.headimage)

            this["labelMoney" + k].$Label._updateRenderData(true)
            this["nodeMoney" + k].getComponent(cc.Widget).updateAlignment()
            // 封顶
            if (Math.abs(v.nScore) + 1 >= winMaxMoney) {
                this["result_limit" + k].active = true
            }

            // 破产
            if (v.nScore < 0) {
                const player = GameLogic.Instance().gamescene.getPlayerByLocalChairID(v.nChairID)
                if (player) {
                    if ((v.money - tax - Math.abs(v.nScore)) <= 1) {
                        this["result_broke" + k].active = true
                    }
                }
            }

            if (v.nChairID == 0) {
                if (v.nScore > 0) {
                    this.winFlag = true
                }
                if ((v.money - tax - Math.abs(v.nScore)) <= 1) {
                    this.tips_bg.active = true
                }
            }

            let color1: cc.Color
            let color2: cc.Color
            if (this.winFlag) {
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
        this["labelBeiShu" + 0].$Label._updateRenderData(true)
        cc.find("nodePop/nodeContent/nodePlayerInfo/nodePlayer0/labelBeiShu0/btnIconTip", this.node).getComponent(cc.Widget).updateAlignment()
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
            ]),
        ]))
        this.popupmanager.showPopup()

        this.win_get_btn_guang2.opacity = 0
        this.win_get_btn_guang2.runAction(cc.repeatForever(cc.sequence([
            cc.fadeIn(0.5),
            cc.fadeOut(0.5),
        ])))

        this.win_get_btn_guang3.runAction(cc.repeatForever(cc.sequence([
            cc.place(cc.v2(-250, 0)),
            cc.moveTo(0.5, cc.v2(250, 0)),
            cc.delayTime(2),
        ])))
    }

    showResultButton() {
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
                this.btnContinue.active = true
                this.showCountdown(this.label_time, 10, this.onPressContinue.bind(this))
            }
            return
        }
        if (GameLogic.Instance().isMatchTable()) {
            this.btnContinueWithRound.active = false
            this.btnClose.active = false
            this.btnContinue.active = true
            this.showCountdown(this.label_time, 3, this.onPressContinue.bind(this))
            return
        }

        const restround = GameLogic.Instance().redpacket_info.limitRounds - GameLogic.Instance().redpacket_info.curRounds
        if (restround > 0) {
            this.labelRestRound.$Label.string = restround
        } else {
            this.labelRestRound.$Label.string = GameLogic.Instance().redpacket_info.limitRounds
        }

        /**
        if (GameLogic.Instance().isChooseStart() && !this.btnWinGet.active) {
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
        */
    }

    showCountdown(node: cc.Node, time: number, callback: Function) {
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

    close() {
        if (GameLogic.Instance().gamescene && GameLogic.Instance().gamescene["state"] == "endGame") {
            GameLogic.Instance().gamescene["doStateChangeReInit"]()
        }
        this.label_time.stopAllActions()
        this.closeSelf()
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

    onPressBack() {
        this.onPressClose()
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
        if (GameLogic.Instance().isChooseStart()) {
            GameLogic.Instance().gamescene.showStartGame(true)
        }
        GameLogic.Instance().gamescene.onPressLookCard(EventTouch, data)
    }

    onPressShowBeishuInfo(EventTouch, data) {
        if (!GameLogic.Instance().gamescene.beishuInfo) {
            return
        }

        this.nodeBeishuInfo.active = true
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

    onPressRedPacket() {
        if (!this.checkRedPacketAward()) {
            this['nodeRedPacketDetail'].active = !this['nodeRedPacketDetail'].active
            return
        }

        GameLogic.Instance().showGameRedPacketAwardLayer({ redPacketNum: GameLogic.Instance().gamescene.fakeRedPacketNum })
    }

    onPressRegainLose() {
        GameLogic.Instance().showRegainLosePop()
    }

    onPressJipaiqi() {
        receiveAdAward(AdsConfig.taskAdsMap.CardNoteBuyPop, () => {
            this.isValid && this.refreshJipaiqi()
        })
    }

    onPressWinGet() {
        receiveAdAward(AdsConfig.taskAdsMap.WinGetMutiple, () => {
            this.btnWinGet.active = false
        })
    }

    updateUserData() {
        this.refreshRedpacket()
        if (GameLogic.Instance().isPrivateRoom() || GameLogic.Instance().isMatchTable()) {
            this.btn_jiqipai.active = false
            this.btn_fanhuan.active = false
            return
        }
        this.refreshRegainLose()
    }

    refreshRedpacket() {
        const isMax = this.checkRedPacketAward()
        const cur = GameLogic.Instance().redpacket_info["curRounds"]
        const dst = GameLogic.Instance().redpacket_info["limitRounds"]
        this["progressBarMin"].$ProgressBar.progress = cur / dst
        this["labelProgressMin"].$Label.string = cur + "/" + dst
        this["progressBarMin"].active = !isMax
        this["redpacket_icon_light"].active = isMax
        this["node_redpacket_max"].active = isMax

        const num = DataManager.UserData.getItemNum(GameLogic.Instance().HONGBAO_GOLD_TICKET)
        this['labelRedPacketDetail'].$Label.string = "" + num
        this['labelRedPacketDetail2'].$Label.string = "≈" + GameLogic.Instance().GetMoneyShortString(num / 10000) + "元"
        this["progressBarBig"].$ProgressBar.progress = cur / dst
        this["labelProgressBig"].getComponent(cc.Label).string = cur + "/" + dst
        const money = getRedPacketAwardConfig()[GameLogic.Instance().serverInfo.level]
        this['label_title2'].$Label.string = `每${dst}局开福袋` + (money ? `最高${money}元` : '')

        this["redpacket_icon_light"].stopAllActions()
        this["node_redpacket_max"].stopAllActions()
        this["nodeRedPacketLayout"].stopAllActions()
        this["nodeRedPacketLayout"].y = 0
        if (isMax) {
            const action = cc.repeatForever(cc.sequence([
                cc.fadeIn(1.2).easing(cc.easeSineIn()),
                cc.delayTime(0.4),
                cc.fadeOut(1.2).easing(cc.easeSineIn()),
                cc.delayTime(0.4),
            ]))
            this["redpacket_icon_light"].runAction(action)
            this["node_redpacket_max"].runAction(action.clone())
            this["nodeRedPacketLayout"].runAction(cc.repeatForever(cc.sequence([
                cc.jumpBy(99999, 0, 0, 50, 99999),
                cc.delayTime(0.1),
            ])))

            if (this.isShowGetMotion) {
                this.isShowGetMotion = true
                this.showGetMotion(cc.v2(-cc.winSize.width / 2, cc.winSize.height / 2), this["nodeRedPacketLayout"].position)
            }
        }
    }

    refreshRegainLose() {
        this.btn_fanhuan.active = this.checkRegainLose()
        if (this.btn_fanhuan.active) {
            const node = cc.find("label", this.btn_fanhuan)
            const to2 = (n: number) => {
                return n < 10 ? "0" + n : "" + n
            }
            let time = GameLogic.Instance().gamescene.regainLose.nTime
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
        }
    }

    refreshJipaiqi() {
        const left = getAdLeftTimes(AdsConfig.taskAdsMap.CardNoteBuyPop)
        this.btn_jiqipai.active = left > 0
        cc.find("item_num_bg/label", this.btn_jiqipai).getComponent(cc.Label).string = "" + left
    }

    refreshWinGet() {
        this.btnWinGet.active = false
        this.nodeWinget.active = false
        if (this.winFlag || DataManager.CommonData["morrow"] == 0) {
        } else {
            return
        }

        const random_winget = DataManager.Instance.onlineParam.random_winget
        if (random_winget != null && Math.random() < random_winget) {
            return
        }

        if (GameLogic.Instance().isSceneExist("GameRedPacketAwardLayer")) {
            return
        }

        if (!checkAdCanReceive(AdsConfig.taskAdsMap.WinGetSingle) || !checkAdCanReceive(AdsConfig.taskAdsMap.WinGetMutiple)) {
            return
        }

        this.nodeWinget.active = true
        this.btnWinGet.active = true
        const type = getNextAdType(AdsConfig.taskAdsMap.WinGetMutiple)
        this.btn_icon_win_get_ad.active = type == 2
        this.btn_icon_win_get_share.active = type == 1
    }

    showGetMotion(srcPos: cc.Vec2, dstPos: cc.Vec2, callback?: Function) {
        this.nodeMotionGetAni.position = srcPos
        this.nodeMotionGetAni.scale = 1
        this.motionGetAni.$MotionStreak.reset()

        const actionList = [
            cc.fadeIn(0.01),
            cc.delayTime(0.01),
            cc.bezierTo(0.6, [
                cc.v2((srcPos.x + dstPos.x) / 2, (srcPos.y + dstPos.y) / 2),
                cc.v2((srcPos.x + dstPos.x) / 2, (srcPos.y + dstPos.y) / 2),
                dstPos
            ]),
            cc.spawn(
                cc.scaleTo(0.3, 5, 2),
                cc.fadeOut(0.3)
            ),
        ]
        if (callback) {
            actionList.push(cc.callFunc(callback))
        }
        this.nodeMotionGetAni.stopAllActions()
        this.nodeMotionGetAni.runAction(cc.sequence(actionList))
    }

    checkRedPacketAward() {
        if (!checkAdCanReceive(AdsConfig.taskAdsMap.DrawRedpacket)) {
            return false
        }

        return GameLogic.Instance().redpacket_award_info.ret == 1
    }

    checkRegainLose() {
        if (!checkAdCanReceive(AdsConfig.taskAdsMap.Exemption)) {
            return false
        }

        const regainLose = GameLogic.Instance().gamescene.regainLose
        if (regainLose && regainLose.nTime > 0 && (regainLose.nRet == 0 || regainLose.nRet == 2)) {
            return true
        }

        return false
    }

    checkPopup_RedPacketAward() {
        if (DataManager.Instance.onlineParam.GameResultShowRedPacketAward == 0) {
            return false
        }

        if (!this.checkRedPacketAward()) {
            return false
        }

        GameLogic.Instance().showGameRedPacketAwardLayer({ redPacketNum: GameLogic.Instance().gamescene.fakeRedPacketNum })
        return true
    }

    checkPopup_RegainLose() {
        if (this.winFlag) {
            return false
        }

        if (!this.checkRegainLose()) {
            return false
        }

        GameLogic.Instance().showRegainLosePop()
        return true
    }

    onCloseScene() {
        if (this.nodeWinget.active) {
            receiveAdAward(AdsConfig.taskAdsMap.WinGetSingle, null, null, false)
        }
    }

    onDestroy() {
        playADBanner(false, AdsConfig.banner.GameResultLayer_rpddz)
        cc.audioEngine.isMusicPlaying() && AudioManager.playBackground()
    }

    checkPopup_Highlight() {
        // 输了不显示
        if (!this.winFlag) {
            return false
        }

        // 开关控制不显示
        if (DataManager.Instance.onlineParam.gameresult_highlight == 0) {
            return false
        }

        // 新人前n局不显示
        if (DataManager.CommonData["roleCfg"]["roundSum"] <= (DataManager.Instance.onlineParam.gameresult_highlight_round || 10)) {
            return false
        }

        // 每日分享次数显示
        const count = DataManager.loadWithDate("gameresult_highlight_count") || 0
        const gameresult_highlight_count = DataManager.Instance.onlineParam.gameresult_highlight_count || 3
        if (gameresult_highlight_count != -1 && count >= gameresult_highlight_count) {
            return false
        }

        // 条件控制不显示
        const gamescene = GameLogic.Instance().gamescene
        const double = gamescene.getDouble(gamescene.myPlayer.chairid)
        if (double >= (DataManager.Instance.onlineParam.highlight_double || 2000)) {
            GameLogic.Instance().showHighlightPopup({ showType: 1, double: double })
            DataManager.saveWithDate("gameresult_highlight_count", count + 1)
        } else if (this.initParam.bSpring || this.initParam.bReverseSpring) {
            GameLogic.Instance().showHighlightPopup({ showType: 2, bSpring: this.initParam.bSpring })
            DataManager.saveWithDate("gameresult_highlight_count", count + 1)
        } else {
            return false
        }
        return true
    }

    refreshShare() {
        this.btn_share.active = this.winFlag
        this.label_share.getComponent(cc.Label).string = this["labelBeiShu" + 0].$Label.string
    }

    onPressShare() {
        socialShare({
            withOpenId: true,
            imageUrl: DataManager.Instance.onlineParam.gameresult_shareurl || "https://pictures.hiigame.com/qmddz/share_gameresult.jpg",
            title: `我打出了${this["labelBeiShu" + 0].$Label.string}的高倍战绩，获得了金豆${this["labelMoney" + 0].$Label.string}，不服来战！`,
        })
    }

    updateTaskList(event) {
        cc.find("btnTask/item_num_bg", this.node).active = false
        const message = event.message
        if (null == message.taskList || 0 == message.taskList.length) {
            return
        }

        for (const task of message.taskList) {
            this.taskData[task.cond] = task
        }


        let num = 0
        for (var id in this.taskData) {
            const task = this.taskData[id]
            if (task.status == 0 && task.value >= task.max) {
                num++
            }
        }

        cc.find("btnTask/item_num_bg", this.node).active = num > 0
        cc.find("btnTask/item_num_bg/label", this.node).getComponent(cc.Label).string = "" + num
    }
}
