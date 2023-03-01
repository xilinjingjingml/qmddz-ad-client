import BaseFunc = require("../base/BaseFunc")
import BaseComponent from "../base/BaseComponent"
import { AdsConfig } from "../base/baseData/AdsConfig"
import DataManager from "../base/baseData/DataManager"
import { czcEvent, getRedPacketAwardConfig, playADBanner, socialShare, numberFormat, checkSpecialAward, CreateNavigateToMiniProgram, TimeFormat, checkFirstBox } from "../base/BaseFuncTs"
import { checkAdCanReceive, getAdLeftTimes, getNextAdMethod, receiveAdAward, getTaskList, isShowPayPage } from "../moduleLobby/LobbyFunc"
import AudioManager from "./AudioManager.rpddz"
import GameLogic from "./GameLogic.rpddz"
import PopupManager from "./PopupManager"
import { ITEM } from "../base/baseData/ItemConfig"
import SceneManager from "../base/baseScene/SceneManager"
import { NodeExtends } from "../base/extends/NodeExtends"
import { math } from "../base/utils/math"

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
    initParam: Iproto_gc_game_result_not1 & IGameResult
    popupmanager: PopupManager; // 游戏结束后顺序弹框
    isShowGetMotion: boolean = false
    nodeMotionGetAni: cc.Node;
    motionGetAni: cc.Node;
    btn_share: cc.Node;
    label_share: cc.Node;
    taskData: any = {}
    banner_adjust = false
    bannerAdjustH = 50
    curRoundWinScore = 0
    _destroy:boolean = false
    btnBoomStart_0: any
    btnBoomStart_1: any
    win_get_btn_guang4: any
    win_get_btn_guang6: any
    win_get_btn_guang8: any
    win_get_btn_guang7: any

    onOpenScene() {
        if (DataManager.CommonData["first"] == 1 && !DataManager.CommonData["GameResultLayerFirst"]) {
            czcEvent("斗地主", "结算界面", "新用户")
        }
        cc.log("[GameResultLayer.onOpenScene]")
        this.playADBanner()
        this.registMessageHandler()
        this.showUserResult()
        this.refreshRightButtons()
        this.refreshLeftButtons()
        this.showResultButton()
        this.updateUserData()
        this.refreshWinGet()
        // this.refreshJipaiqi()
        this.refreshShare()
        getTaskList(0)
        getTaskList(1)
        this.showAni()
        this.initNavigateToMiniGame()
        console.log("jin---vecUserResult1: ", this.initParam.vecUserResult1)
    }

    playADBanner() {
        const count = DataManager.Instance.onlineParam.GameResultLayer_banner_count || 4
        // console.log("jin---延时播放banner广告0", count, DataManager.CommonData.GameResultLayer_banner_index)
        if (count > 0 && checkSpecialAward()) {
            let index = DataManager.CommonData.GameResultLayer_banner_index || 0
            index++
            DataManager.CommonData.GameResultLayer_banner_index = index % count
            if (index >= count) {
                // console.log("jin---延时播放banner广告", count, index)
                this.banner_adjust = true
                this.scheduleOnce(() => { playADBanner(true, AdsConfig.banner.GameResultLayer_rpddz, ()=>{
                    if (!this || !this.node || !this.node.isValid || this._destroy) {
                        playADBanner(false, AdsConfig.banner.All)
                    }
                }) }, 1)
                // this.onBannerResize = () => { }
                return
            }
        }

        // console.log("jin---延时播放banner广告 playADBanner", new Date().getTime())
        playADBanner(true, AdsConfig.banner.GameResultLayer_rpddz, ()=>{
            if (!this || !this.node || !this.node.isValid || this._destroy) {
                playADBanner(false, AdsConfig.banner.All)
            }
        })
    }

    refreshRightButtons() {
        let itemId
        let adAward
        (() => {
            const itemIds = [ITEM.CARD_RECORD, ITEM.LOOK_LORDCARD, ITEM.SUPER_JIABEI].sort((a, b) => DataManager.UserData.getItemNum(a) - DataManager.UserData.getItemNum(b))
            if ("lastExchangeItemId" in GameLogic.Instance().gamescene) {// && GameLogic.Instance().gamescene.lastExchangeItemId != null
                itemIds.unshift(GameLogic.Instance().gamescene.lastExchangeItemId)
            }
            const adAwards = AdsConfig.getAwards()
            for (const id of itemIds) {
                for (const award of adAwards) {
                    if (award.index == id) {
                        if (checkAdCanReceive(award.adindex)) {
                            itemId = id
                            adAward = award
                            return
                        }
                        break
                    }
                }
            }
        })()
        if (itemId == null) {
            return
        }
        let node: cc.Node
        if (itemId == ITEM.CARD_RECORD) {
            node = this.$("btnCardRecord")
        } else if (itemId == ITEM.LOOK_LORDCARD) {
            node = this.$("btnLookLordCard")
        } else if (itemId == ITEM.SUPER_JIABEI) {
            node = this.$("btnSuperDouble")
        } else {
            return
        }

        adAward.callback = () => {
            const times = getAdLeftTimes(adAward.adindex)
            if(node){
                node.active = times > 0
                cc.find("item_num_bg", node).active = times > 1
                cc.find("item_num_bg/label", node).getComponent(cc.Label).string = times + ""
            }
        }
        adAward.callback()

        const event = new cc.Component.EventHandler()
        event.target = this.node
        event.component = this.thisComponentName
        event.handler = "onPressItemAd"
        event.customEventData = adAward

        node.getComponent(cc.Button).clickEvents.push(event)
    }

    onPressItemAd(sender, data) {
        AudioManager.playButtonSound()
        if (DataManager.Instance.getOnlineParamSwitch("GameResult_rightbutton_pop")) {
            SceneManager.Instance.popScene("moduleLobby", "AdAwardPop", data)
            return
        }

        receiveAdAward(data.adindex, data.callback)
    }

    __bindButtonHandler() {
        cc.log("[GameResultLayer.__bindButtonHandler]")
        BaseFunc.AddClickEvent(this.btnClose, this.node, this.thisComponentName, "onPressClose", 0)
        BaseFunc.AddClickEvent(this.btnContinueWithRound, this.node, this.thisComponentName, "onPressContinue", 0)
        BaseFunc.AddClickEvent(this.btnBoomStart_0, this.node, this.thisComponentName, "onPressBoomStart", 0)
        BaseFunc.AddClickEvent(this.btnBoomStart_1, this.node, this.thisComponentName, "onPressBoomStart", 0)
        BaseFunc.AddClickEvent(this.btnExit, this.node, this.thisComponentName, "onPressExit", 0)
        BaseFunc.AddClickEvent(this.btnContinue, this.node, this.thisComponentName, "onPressContinue", 0)
        BaseFunc.AddClickEvent(this.btnZhanJi, this.node, this.thisComponentName, "onPressZhanJi", 0)
        BaseFunc.AddClickEvent(this.btnShowStart, this.node, this.thisComponentName, "onPressShowStart", 5)
        BaseFunc.AddClickEvent(this.btnLookCard, this.node, this.thisComponentName, "onPressLookCard", 0)
        BaseFunc.AddClickEvent(this.btnShowBeishuInfo, this.node, this.thisComponentName, "onPressShowBeishuInfo", 0)
        BaseFunc.AddClickEvent(this.btn_jiqipai, this.node, this.thisComponentName, "onPressJipaiqi", 0)
        // BaseFunc.AddClickEvent(this.btn_fanhuan, this.node, this.thisComponentName, "onPressRegainLose", 0)
        BaseFunc.AddClickEvent(this.btnWinGet, this.node, this.thisComponentName, "onPressWinGet", 0)
        BaseFunc.AddClickEvent(this.btnRedPacketDetail, this.node, this.thisComponentName, "onPressRedPacket", 0)
        BaseFunc.AddClickEvent(this.btn_share, this.node, this.thisComponentName, "onPressShare", 0)
    }

    registMessageHandler() {
        const popupManager = new PopupManager([
            this.checkPopup_Highlight.bind(this),
            this.checkPopup_RedPacketAward.bind(this),
            this.checkPopup_FirstPaysBox.bind(this),
            this.checkPopup_SuperWelfarePop.bind(this),// 1元福利
            this.checkPopup_RegainLose.bind(this),//TODO 1.关掉输分找回、赢分加倍 2.添加转运礼包
            this.checkPopup_WinDouble.bind(this),
            this.checkPopup_RegainLosePayBox.bind(this),
            this.checkPopup_oneYuanBigBox.bind(this),//
            this.checkPopup_OuHuangPop.bind(this)
            
            //TODO 欧皇礼包
        ])
        this.addListener("GameResult_PopupManager", popupManager.showPopup.bind(popupManager))
        this.popupmanager = popupManager
    }

    proto_gc_regain_lose_score_ack(event) {
        GameLogic.Instance().gamescene.regainLose = event.packet
        this.refreshRegainLose()
    }

    onBannerResize(msg) {
        //调整：popScene弹出的界面会再调用一次onBannerResize(),因此指定将要变化的高度，而不是每次加调整高度
        if (this.banner_adjust) {
            this.banner_adjust = false
            cc.find("nodePop", this.node).runAction(cc.sequence(
                cc.delayTime(3),
                cc.moveTo(0.3, cc.v2(0, this.bannerAdjustH))
            ))
        } else {
            cc.find("nodePop", this.node).y = this.bannerAdjustH
        }
    }

    showUserResult() {
        this.winFlag = false
        const winMaxMoney = GameLogic.Instance().getWinMaxMoney()
        const tax = GameLogic.Instance().serverInfo.tax || 0

        if (GameLogic.Instance().gamescene && GameLogic.Instance().gamescene.isScoreTable()) {
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
            GameLogic.Instance().gamescene && (this["labelBeiShu" + k].$Label.string = GameLogic.Instance().gamescene.getDouble(v.nChairID))
            this["labelMoney" + k].$Label.string = v.nScore
            this["labelName" + k].$Label.string = v.name.length > 7 ? v.name.substr(0, 5) + "..." : v.name
            if (GameLogic.Instance().isMatchTable() && v.nChairID != 0) {
                v.headimage = ""
            }
            NodeExtends.setNodeSpriteNet({ node: this["sptAvatar" + k], url: v.headimage })

            if (DataManager.Instance.getOnlineParamSwitch("GameResult_numberFormat", 1)) {
                this["labelMoney" + k].$Label.string = (v.nScore < 0 ? "-" : "") + numberFormat(Math.abs(v.nScore))
                if (k == 0) {
                    this["labelMoney" + k].$Label.overflow = cc.Label.Overflow.NONE
                    this["nodeMoney" + k].getComponent(cc.Widget).right = 0
                }
            }

            NodeExtends.updateLabel(this["labelMoney" + k].$Label)
            this["nodeMoney" + k].getComponent(cc.Widget).updateAlignment()
            // 封顶
            if (Math.abs(v.nScore) + 1 >= winMaxMoney) {
                this["result_limit" + k].active = true
            }

            // 破产
            if (v.nScore < 0) {
                if(GameLogic.Instance().gamescene != null){
                    const player = GameLogic.Instance().gamescene.getPlayerByLocalChairID(v.nChairID)
                    if (player) {
                        if ((v.money - tax - Math.abs(v.nScore)) <= 1) {
                            this["result_broke" + k].active = true
                        }
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
        NodeExtends.updateLabel(this["labelBeiShu" + 0].$Label)
        cc.find("nodePop/nodeContent/nodePlayerInfo/nodePlayer0/labelBeiShu0/btnIconTip", this.node).getComponent(cc.Widget).updateAlignment()
    }

    showAni() {
        this.nodeWin.active = this.winFlag
        this.nodeLose.active = !this.winFlag
        this.nodeTitleWin.active = this.winFlag
        this.nodeTitleLose.active = !this.winFlag

        // 1
        const nodeTitle = this.$("nodeTitle")
        const nodeTitlePos = nodeTitle.position
        nodeTitle.x = -400
        nodeTitle.runAction(cc.sequence([
            cc.delayTime(0.1),
            cc.moveTo(0.5, nodeTitlePos).easing(cc.easeBackOut())
        ]))
        const nodeContent = this.$("nodeContent")
        const nodeContentPos = nodeContent.position
        nodeContent.x = 1000
        nodeContent.runAction(cc.sequence([
            cc.delayTime(0.1),
            cc.moveTo(0.5, nodeContentPos).easing(cc.easeBackOut())
        ]))
        let allDelayTime = 0.6

        // 2
        let index = 0
        let delayTime = 0
        for (let i = this.$("nodeRightButtons").childrenCount - 1; i >= 0; i--) {
            const node = this.$("nodeRightButtons").children[i]
            if (node.active) {
                const i = index++
                const pos = node.position
                node.y = 150
                node.runAction(cc.sequence([
                    cc.delayTime(allDelayTime + 0.1 * i),
                    cc.moveTo(0.2, pos).easing(cc.easeBackOut())
                ]))
                delayTime = 0.1 * i + 0.2
            }
        }
        allDelayTime += delayTime

        // 3
        index = 0
        for (let i = 0; i < this.$("node_button").childrenCount; i++) {
            const node = this.$("node_button").children[i]
            if (node.active) {
                const i = index++
                node.scale = 0
                node.runAction(cc.sequence([
                    cc.delayTime(allDelayTime + 0.1 * i),
                    cc.scaleTo(0.15, 1.1),
                    cc.scaleTo(0.1, 1),
                ]))
            }
        }

        this.win_get_btn_guang2.opacity = 0
        this.win_get_btn_guang2.runAction(cc.repeatForever(cc.sequence([
            cc.fadeIn(0.5),
            cc.fadeOut(0.5),
        ])))
        this.win_get_btn_guang4.runAction(cc.repeatForever(cc.sequence([
            cc.fadeIn(0.5),
            cc.fadeOut(0.5),
        ])))
        this.win_get_btn_guang6.runAction(cc.repeatForever(cc.sequence([
            cc.fadeIn(0.5),
            cc.fadeOut(0.5),
        ])))

        this.win_get_btn_guang3.runAction(cc.repeatForever(cc.sequence([
            cc.place(cc.v2(-250, 0)),
            cc.moveTo(0.5, cc.v2(250, 0)),
            cc.delayTime(2),
        ])))
        this.win_get_btn_guang8.runAction(cc.repeatForever(cc.sequence([
            cc.place(cc.v2(-250, 0)),
            cc.moveTo(0.5, cc.v2(250, 0)),
            cc.delayTime(2),
        ])))
        this.win_get_btn_guang7.runAction(cc.repeatForever(cc.sequence([
            cc.place(cc.v2(-250, 0)),
            cc.moveTo(0.5, cc.v2(250, 0)),
            cc.delayTime(2),
        ])))

        this.popupmanager.showPopup()
        this["nodeRedPacket"].active = checkAdCanReceive(AdsConfig.taskAdsMap.DrawRedpacket)
    }

    showResultButton() {
        this.btnClose.active = true
        this.btnContinueWithRound.active = true
        this.btnExit.active = false
        this.btnContinue.active = false
        this.btnZhanJi.active = false
        this.btnLookCard.active = false
        this.btnShowStart.active = false
        if (DataManager.Instance.onlineParam.GameResult_btnWinGet_zIndex != null) {
            this.btnWinGet.zIndex = DataManager.Instance.onlineParam.GameResult_btnWinGet_zIndex
        }

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
        this.label_time && this.label_time.stopAllActions()
        this.closeSelf()
    }

    onPressClose() {
        this.firstRoundLog()
        this.close()
        AudioManager.playButtonSound()
        if (GameLogic.Instance().isChooseStart()) {
            GameLogic.Instance().gamescene.showStartGame(true)
            return
        }
        GameLogic.Instance().gamescene.showContinue(true)
    }

    onPressContinue() {
        this.firstRoundLog()
        this.close()
        if (GameLogic.Instance().isChooseStart()) {
            GameLogic.Instance().gamescene.onPressStartGame()
            return
        }
        GameLogic.Instance().gamescene.onPressContinue(null, null)
    }

    onPressExit() {
        this.close()
        AudioManager.playButtonSound()
        GameLogic.Instance().LeaveGameScene()
    }

    onPressBack() {
        this.onPressClose()
    }

    onPressZhanJi() {
        this.close()
        AudioManager.playButtonSound()
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
        AudioManager.playButtonSound()

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
        AudioManager.playButtonSound()
        if (!this.checkRedPacketAward()) {
            if (!DataManager.Instance.isPureMode()) {
                this['nodeRedPacketDetail'].active = !this['nodeRedPacketDetail'].active
            }
            return
        }

        GameLogic.Instance().showGameRedPacketAwardLayer({ redPacketNum: GameLogic.Instance().gamescene.fakeRedPacketNum })
    }

    onPressRegainLose() {
        AudioManager.playButtonSound()
        GameLogic.Instance().showRegainLosePop()
    }

    onPressRegainPayLose() {
        AudioManager.playButtonSound()
        GameLogic.Instance().showRegainLosePayPop()
    }

    onPressJipaiqi() {
        AudioManager.playButtonSound()
        receiveAdAward(AdsConfig.taskAdsMap.CardNoteBuyPop, () => {
            this.isValid && this.refreshJipaiqi()
        })
    }

    onPressWinGet() {
        this.firstRoundLog()
        AudioManager.playButtonSound()
        receiveAdAward(AdsConfig.taskAdsMap.WinGetMutiple, () => {
            if (!this.isValid) {
                return
            }
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

        const num = DataManager.UserData.getItemNum(ITEM.REDPACKET_TICKET)
        this['labelRedPacketDetail'].$Label.string = "" + num
        this['labelRedPacketDetail2'].$Label.string = "≈" + numberFormat(num / 10000) + "元"
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
        // this.btn_fanhuan.active = this.checkRegainLose()
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
        const method = getNextAdMethod(AdsConfig.taskAdsMap.WinGetMutiple)
        this.btn_icon_win_get_ad.active = method == 2
        this.btn_icon_win_get_share.active = method == 1
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
        console.log("jin---checkRegainLose")
        if (!checkAdCanReceive(AdsConfig.taskAdsMap.Exemption)) {
            return false
        }

        const regainLose = GameLogic.Instance().gamescene.regainLose
        console.log("jin---checkRegainLose 1: ", regainLose)
        if (regainLose && regainLose.nTime > 0 && (regainLose.nRet == 0 || regainLose.nRet == 2)) {
            return true
        }

        return false
    }

    checkPopup_RedPacketAward() {
        if (!DataManager.Instance.getOnlineParamSwitch("GameResultShowRedPacketAward", 1)) {
            return false
        }

        if (!this.checkRedPacketAward()) {
            return false
        }

        if (!this.winFlag && this.checkRegainLose() && DataManager.Instance.getOnlineParamSwitch("GameResult_RedPacketAward_RegainLose", 1)) {
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
        const regainLose = GameLogic.Instance().gamescene.regainLose
        
        let money = 0
        regainLose.nValue.forEach(n => money += n)
        // console.log("jin---checkPopup_RegainLosePayBox:", money)
        
        if(this.initParam.vecUserResult1[0].nScore > 0){
            return false
        }
        if(Math.abs(this.initParam.vecUserResult1[0].nScore) > 20000){
            return false
        }
        //todo 次数
        // console.log("jin---checkPopup_RegainLose regainLoseCount1111:", getAdLeftTimes(AdsConfig.taskAdsMap.RegainLoseBonus), Number(DataManager.load(DataManager.UserData.guid + "RegainLoseCount" + TimeFormat("yyyy-mm-dd"))))
        let regainLoseCount = getAdLeftTimes(AdsConfig.taskAdsMap.RegainLoseBonus) - Number(DataManager.load(DataManager.UserData.guid + "RegainLoseCount" + TimeFormat("yyyy-mm-dd"))) + 1
        if(regainLoseCount <= 0) {
            return false
        }
        
        GameLogic.Instance().showRegainLosePop()
        return true
    }

    checkPopup_WinDouble() {
        if (!DataManager.Instance.getOnlineParamSwitch("GameResult_showWinDouble", true)) {
            return false
        }

        const round = DataManager.Instance.onlineParam.gameResult_windouble_round || 1
        // console.log("jin---checkPopup_WinDouble: ", DataManager.CommonData["roleCfg"]["roundSum"], GameLogic.Instance().gamescene.msg_proto_gc_win_doubel_req, checkAdCanReceive(AdsConfig.taskAdsMap.WinDouble),this.curRoundWinScore)
        if (DataManager.CommonData["roleCfg"]["roundSum"] <= round) {
            return false
        }

        if (!GameLogic.Instance().gamescene.msg_proto_gc_win_doubel_req) {
            return false
        }

        if(this.initParam.vecUserResult1[0].nScore < 500000){
            return false
        }

        if (!checkAdCanReceive(AdsConfig.taskAdsMap.WinDouble)) {
            return false
        }
        
        let regainLosePayCount = getAdLeftTimes(AdsConfig.taskAdsMap.WinDouble) - Number(DataManager.load(DataManager.UserData.guid + "WinDoubleCount" + TimeFormat("yyyy-mm-dd"))) + 1
        // console.log("jin---checkPopup_RegainLosePayBox regainLoseCount:", regainLosePayCount)
        if(regainLosePayCount <= 0 ){
            return false
        }

        GameLogic.Instance().showWinDoublePop(GameLogic.Instance().gamescene.msg_proto_gc_win_doubel_req)
        return true
    }

    //todo 一元至尊
    checkPopup_oneYuanBigBox(){
        //1.支付开关 2.记牌器为零
        
        // return
        // console.log("jin---checkPopup_oneYuanBigBox: ", isShowPayPage(), DataManager.UserData.getItemNum(ITEM.CARD_RECORD))
        if(!isShowPayPage()){
            return false
        }

        if(DataManager.UserData.getItemNum(ITEM.CARD_RECORD) > 0){
            return false
        }

        if(math.random(0,10) > 3){
            return false
        }

        let initParam = null
        if (null == initParam)
        initParam = []

        initParam["isResultLayer"] = true
        SceneManager.Instance.popScene<String>("moduleLobby", "OneYuanBigBoxPopNew", initParam)
        return true
    }

    //todo 返还礼包支付
    checkPopup_RegainLosePayBox(){
        //todo 0.本局輸了 1.支付开关 2.输的金额 3.礼包次数 4.苹果因为无法知道订单失败状态，屏蔽iPhone
        console.log("jin---checkPopup_RegainLosePayBox 11: ",  DataManager.Instance.onlineParam.regainLosePayBox[0][0])
        if (this.winFlag) {
            return false
        }

        if (!this.checkRegainLose()) {
            return false
        }

        if(!isShowPayPage()){
            return false
        }
        const regainLose = GameLogic.Instance().gamescene.regainLose
        
        let money = 0
        regainLose.nValue.forEach(n => money += n)
        console.log("jin---checkPopup_RegainLosePayBox:", money)
        if(this.initParam.vecUserResult1[0].nScore > 0){
            return false
        }

        if(Math.abs(this.initParam.vecUserResult1[0].nScore) < DataManager.Instance.onlineParam.regainLosePayBox[0][0]){
            return false
        }

        // if(money <= 50000) {
        //     return false
        // }

        let regainLosePayCount = Number(DataManager.load(DataManager.UserData.guid + "RegainLosePayCount" + TimeFormat("yyyy-mm-dd")))
        // console.log("jin---checkPopup_RegainLosePayBox regainLoseCount:", regainLosePayCount)
        if(regainLosePayCount <= 0 ){
            return false
        }

        if(cc.sys.os == cc.sys.OS_IOS){
            return false
        }

        GameLogic.Instance().showRegainLosePayPop(this.initParam.vecUserResult1)
        return true
    }

    //TODO 首充礼包
    checkPopup_FirstPaysBox(){
        let initParam = null
        if (null == initParam)
        initParam = []

        initParam["isResultLayer"] = true
        let payed = (checkFirstBox() != false) ? true : false
        let FirstPaysPop = Number(DataManager.load(DataManager.UserData.guid + "FirstPaysPop_result" + TimeFormat("yyyy-mm-dd")))
        DataManager.save(DataManager.UserData.guid + "FirstPaysPop_result" + TimeFormat("yyyy-mm-dd"), FirstPaysPop += 1)
        if(!payed){
            return false
        }

        if(!isShowPayPage()){
            return false
        }
        console.log("jin---checkPopup_FirstPaysBox:", FirstPaysPop, DataManager.Instance.onlineParam.resultLayer_firstPay)
        if(FirstPaysPop > 3 || FirstPaysPop < 3){
            return false
        }
        if(!DataManager.Instance.onlineParam.resultLayer_firstPay){
            return false
        }
        SceneManager.Instance.popScene<String>("moduleLobby", "FirstPaysPop", {
            isResultLayer: true
        })
        return true
    }

    //todo 1元福利
    checkPopup_SuperWelfarePop(){
        // 1.支付开关 2.60% 3.只要没买，隔一局弹出一次
        console.log("jin---count: ", 
            DataManager.load(DataManager.UserData.guid + "superWelfare_count_1" + TimeFormat("yyyy-mm-dd")), 
            DataManager.load(DataManager.UserData.guid + "superWelfare_count_6" + TimeFormat("yyyy-mm-dd")),
            DataManager.load(DataManager.UserData.guid + "superWelfare_1" + TimeFormat("yyyy-mm-dd")), 
            DataManager.load(DataManager.UserData.guid + "superWelfare_6" + TimeFormat("yyyy-mm-dd"))
            )
        if(!isShowPayPage()){
            return false
        }

        if(DataManager.CommonData["roleCfg"]["roundSum"] <= 10){
            return false
        }

        if(math.random(0,10) > 6){
            return false
        }

        if(!DataManager.Instance.onlineParam.isShowSuperWelfare){
            return false
        }

        let count_2 = DataManager.load(DataManager.UserData.guid + "superWelfare_count_2" + TimeFormat("yyyy-mm-dd")) || null
        if(count_2 == 0 || count_2 == null){
            return false
        }

        let session = null
        // 初级场不出现 1元福利
        // if(GameLogic.Instance().serverInfo.level == 1){
        //     console.log("jin---1元福利 新手场")
        //     let buySta = DataManager.load(DataManager.UserData.guid + "superWelfare_1" + TimeFormat("yyyy-mm-dd"))

        //     if(buySta == false){
        //         return false
        //     }
    
        //     let count = DataManager.load(DataManager.UserData.guid + "superWelfare_count_1" + TimeFormat("yyyy-mm-dd"))
        //     console.log("jin---count: ", count)
        //     if(count % 2 != 0) {
        //         DataManager.save(DataManager.UserData.guid + "superWelfare_count_1" + TimeFormat("yyyy-mm-dd"), Number(count) + 1)
        //         return false
        //     }else{
        //         DataManager.save(DataManager.UserData.guid + "superWelfare_count_1" + TimeFormat("yyyy-mm-dd"), Number(count) + 1)
        //     }
            
        //     SceneManager.Instance.popScene<String>("moduleLobby", "SuperWelfarePop", {
        //         isResultLayer:true,
        //         session: 1
        //     })
        //     return true
        // }else 
        if(GameLogic.Instance().serverInfo.level == 2){
            console.log("jin---1元福利 初级场")
            let buySta = DataManager.load(DataManager.UserData.guid + "superWelfare_6" + TimeFormat("yyyy-mm-dd"))

            if(buySta == false){
                return false
            }
    
            let count = DataManager.load(DataManager.UserData.guid + "superWelfare_count_6" + TimeFormat("yyyy-mm-dd"))
            console.log("jin---count: ", count)
            if(count % 2 != 0) {
                DataManager.save(DataManager.UserData.guid + "superWelfare_count_6" + TimeFormat("yyyy-mm-dd"), Number(count) + 1)
                return false
            }else{
                DataManager.save(DataManager.UserData.guid + "superWelfare_count_6" + TimeFormat("yyyy-mm-dd"), Number(count) + 1)
            }

            SceneManager.Instance.popScene<String>("moduleLobby", "SuperWelfarePop", {
                isResultLayer: true,
                session: 2
            })
            return true
        }
        return false
    }

    //todo 欧皇
    checkPopup_OuHuangPop(){
        //1.主动谈两次 2.30% 3.精英场以上 4.购买开关 5.礼包是否购买 6.前十局新手不弹礼包 7.在线参数
        console.log("jin---checkPopup_OuHuangPop: ")
        if(!isShowPayPage()){
            return false
        }

        if(DataManager.CommonData["roleCfg"]["roundSum"] <= 10){
            return false
        }

        //todo 礼包是否存在
        console.log("jin---checkPopup_OuHuangPop0: ", DataManager.load(DataManager.UserData.guid + "ouHuang_buyed" + TimeFormat("yyyy-mm-dd")))
        let buyed = DataManager.load(DataManager.UserData.guid + "ouHuang_buyed" + TimeFormat("yyyy-mm-dd"))
        if(buyed){
            return false
        }
        
        let count = DataManager.load(DataManager.UserData.guid + "ouHuang_count" + TimeFormat("yyyy-mm-dd"))
        console.log("jin---checkPopup_OuHuangPop 1: ", count)
        if(count >= 3 ){
            return false
        }

        if(!DataManager.Instance.onlineParam.isShowOuHuang){
            return false
        }

        if(math.random(0,10) > 7){
            return false
        }

        // let count_2 = DataManager.load(DataManager.UserData.guid + "ouHuang_count_2" + TimeFormat("yyyy-mm-dd")) || null
        // if(count_2 == 0 || count_2 == null){
        //     return false
        // }

        //todo 
        console.log("jin---checkPopup_OuHuangPop 2: ", GameLogic.Instance().serverInfo.level)//, typeof GameLogic.Instance().serverInfo.level
        if(GameLogic.Instance().serverInfo.level >= 3){
            console.log("jin---1元福利 精英场")
            //todo 欧皇礼包
            SceneManager.Instance.popScene<String>("moduleRPDdzRes", "ouHuangPop",{})
            return true
        }
        return false
    }

    onCloseScene() {
        // czcEvent("斗地主", "结算界面", "关闭")
        if (this.nodeWinget.active) {
            receiveAdAward(AdsConfig.taskAdsMap.WinGetSingle, null, null, false, 0)
        }
    }

    onDestroy() {
        this._destroy = true
        DataManager.CommonData["GameResultLayerFirst"] = true
        playADBanner(false, AdsConfig.banner.All)//AdsConfig.banner.GameResultLayer_rpddz
        this.popupmanager && this.popupmanager.stop()
        cc.audioEngine.isMusicPlaying() && AudioManager.playBackground()
    }

    checkPopup_Highlight() {
        // 输了不显示
        if (!this.winFlag) {
            return false
        }

        // 开关控制不显示
        if (!DataManager.Instance.getOnlineParamSwitch("gameresult_highlight", 1)) {
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
        AudioManager.playButtonSound()
        socialShare({
            withOpenId: true,
            imageUrl: DataManager.Instance.onlineParam.gameresult_shareurl || "https://pictures.hiigame.com/qmddz/share_gameresult.jpg",
            title: `我打出了${this["labelBeiShu" + 0].$Label.string}的高倍战绩，获得了金豆${this["labelMoney" + 0].$Label.string}，不服来战！`,
        })
    }

    updateTaskList(event) {
        cc.find("nodeRightButtons/btnTask/item_num_bg", this.node).active = false
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

        cc.find("nodeRightButtons/btnTask/item_num_bg", this.node).active = num > 0
        cc.find("nodeRightButtons/btnTask/item_num_bg/label", this.node).getComponent(cc.Label).string = "" + num
    }

    proto_gc_win_doubel_ack(event: { packet: Iproto_gc_win_doubel_ack }) {
        const message = event.packet
        if (message.cRet == 0) {
            let num = 0
            message.vecItemInfo.forEach(info => {
                if (info.nItemIndex == ITEM.GOLD_COIN) {
                    num += info.nItemNum
                }
            })
            if (num > 0) {
                this["labelMoney" + 0].$Label.string += `(+${num})`
            }
        }
    }

    firstRoundLog() {
		if (DataManager.CommonData["roleCfg"]["roundSum"] == 1) {
			czcEvent("斗地主", "结算界面", "新用户操作")
		}
	}

    //TODO 添加导量口子,位置需要重设
    initNavigateToMiniGame(){
        let parentNode = cc.find("nodePop" ,this.node)
        CreateNavigateToMiniProgram(parentNode, cc.v2(-504, -278))
    }

    onPressFirstPaysBox(){
        let initParam = null
        if (null == initParam)
        initParam = []

        initParam["isResultLayer"] = true
        let payed = (checkFirstBox() != false) ? true : false
        if(!payed){
            return false
        }

        if(!isShowPayPage()){
            return false
        }

        SceneManager.Instance.popScene<String>("moduleLobby", "FirstPaysPop", {
            isResultLayer: true
        })
    }

    onPressOneYuanBox(){
        let initParam = null
        if (null == initParam)
        initParam = []

        initParam["isResultLayer"] = true
        SceneManager.Instance.popScene<String>("moduleLobby", "OneYuanBigBoxPopNew", initParam)
    }

    refreshLeftButtons(){
        
        //todo 0: 0 true
        if(!DataManager.Instance.onlineParam.boomStartOrder){
            this.btnBoomStart_0.active = this.isShowBtnBoomStart()
            this.btnBoomStart_1.active = false
        }else{
            this.btnBoomStart_0.active = false
            this.btnBoomStart_1.active = this.isShowBtnBoomStart()
        }
        console.log("jin---refreshLeftButtons: ", isShowPayPage(), (checkFirstBox() != false) ? true : false)
        if(!isShowPayPage() || (checkFirstBox() == false) ? true : false){
            cc.find("nodeLeftButtons/firstPays", this.node).active = false
        }
        if(!isShowPayPage()){
            cc.find("nodeLeftButtons/btn_moreBoxs", this.node).active = false
        }
    }

    onPressBoomStart(){
        receiveAdAward(AdsConfig.taskAdsMap.LookLordCard, () => {
            this.close()
            if (GameLogic.Instance().isChooseStart()) {
                GameLogic.Instance().gamescene.onPressStartGame()
                return
            }
            GameLogic.Instance().gamescene.onPressContinue(null, null)
        }, null, true, 2, true)
    }

    isShowBtnBoomStart(){
        //todo 1.在线参数 2.不洗牌 3.前两个场次会出现 4.大于当前场次 5.广告次数是否用完
        if(getAdLeftTimes(AdsConfig.taskAdsMap.CardNoteBuyPop) <= 0){
            return false
        }
        if(!DataManager.Instance.onlineParam.isShowBtnBoomStart){
            return false
        }

        if(!GameLogic.Instance().isBuxipaiMode()){
            return false
        } 
        // console.log("jin---serverInfo.level: ", GameLogic.Instance())
        if(GameLogic.Instance().serverInfo.level < 1 || GameLogic.Instance().serverInfo.level > 2){
            return false
        }

        if(DataManager.UserData.money < 3000){
            return false
        }
        return true
    }

    updateBadge() {
        //福利中心
        if(DataManager.CommonData["reliefStatus"]){
            let welfareSta = (checkAdCanReceive(AdsConfig.taskAdsMap.LotteryShare) || DataManager.load(DataManager.UserData.guid + "SignPop" + TimeFormat("yyyy-mm-dd")) 
                || getAdLeftTimes(AdsConfig.taskAdsMap.DynamicGold) > 0 || DataManager.CommonData["reliefStatus"]["reliefTimes"] <= 0 ) ? 1 : 0 
            console.log("jin---welfareSta: ", welfareSta)
            cc.find("nodeLeftButtons/btnWelfare/badge", this.node).getComponent("Badge").updateView(welfareSta)
        }
    }

    //响应红点变化 
    onAdConfigUpdate() {
        this.updateBadge()
    }

    updateOnceBox() {
        this.refreshLeftButtons()
    }

    updateOneYuanBox(){
        this.refreshLeftButtons()
    }
}
