import BaseComponent from "../base/BaseComponent"
import { AdsConfig } from "../base/baseData/AdsConfig"
import DataManager from "../base/baseData/DataManager"
import { checkFirstBox, czcEvent, enterGame, getGameServers, getLowMoneyRoom, getShopBox, getUserRole, iMessageBox, playADInter, showDouble11ActivePop, showNoticePop, showTrumpet, TimeFormat, unenoughGold } from "../base/BaseFuncTs"
import NetManager from "../base/baseNet/NetManager"
import WebSocketWrapper from "../base/baseNet/WebSocketWrapper"
import SceneManager from "../base/baseScene/SceneManager"
import GameManager from "../base/GameManager"
import PopupQueue from "../base/utils/PopupQueue"
import WxWrapper from "../base/WxWrapper"
import { getChangCiName, getGameConfig, isSmallGame } from "../gameConfig"
import { checkAdCanReceive, getAdLeftTimes, getExchangeConfig, getMailInfo, getNextAdMethod, getServerList, getVipConfig, loadAdConfig, loadShareMoney, loadTomorrowConfig, loadTomorrowStatus, receiveAdAward } from "./LobbyFunc"
import opcodeConfig from "./proto/opcode"
import proto = require("../moduleLobby/proto/lobbyproto")
import { CombinedConfig } from "./combined/CombinedConfig"
import { NodeExtends } from "../base/extends/NodeExtends"
import { time } from "../base/utils/time"

const { ccclass, property } = cc._decorator

let tomorrow_valid = false

@ccclass
export default class LobbyScene extends BaseComponent {

    isLogin: boolean = false
    willStartGame: boolean = false
    isGuideToCash: boolean = false
    intoDouble11Active: boolean = false
    taskData: any = {}
    popupQuene: PopupQueue // 顺序弹窗
    countPopup: number
    countAllConfig: number
    countAllConfig2: number = 0
    skipPopUp:boolean = false

    @property({ type: cc.AudioClip })
    backgroundMusic: cc.AudioClip = null

    onLoad() {
        cc.director.once(cc.Director.EVENT_AFTER_DRAW, this.onAfterDraw, this)
    }

    onFixLongScreen() {
        this["nodeTop"].scale = 1.15
    }

    onOpenScene() {
        czcEvent("大厅", "登录9", "进入大厅 " + DataManager.Instance.userTag)
        this.socketName = "lobby"

        this.willStartGame = DataManager.CommonData["morrow"] == 0 && DataManager.Instance.getOnlineParamSwitch("jump2game")
        if (DataManager.Instance.getOnlineParamSwitch("GuideToCashABTest")) {
            this.isGuideToCash = true
        }

        this.audio_play()

        showTrumpet()
        this.updateUserData()
        this.updateTitle()
        this.updateBadge()

        this.setSideBtnActive("tomorrow", false)
        this.setSideBtnActive("inviteFriend", false)
        this.setSideBtnActive("newbieGift", false)
        this.setSideBtnActive("shareMoney", false)

        if (!DataManager.CommonData.roleCfg || !DataManager.CommonData.roleCfg.weekCardABTest) {
            cc.find("nodePlayer/monthCard", this.node).active = false
        }

        this.getAllConfig()

        if (null == DataManager.CommonData["VipInfo"])
            getVipConfig(this.updateVipInfo.bind(this))

        this.initTip()
        this.initRole()
        this.initGame()
        this.initFastGame()

        WxWrapper.checkUserScope("userInfo", (canUse) => {
            if (this.isValid && !canUse) {
                cc.find("nodePlayer/nodeFace/badge", this.node).active = true
            }
        })
        cc.find("nodePlayer/nodeFace/badge", this.node).active = !(DataManager.CommonData["bindPhone"] && DataManager.CommonData["bindPhone"].hasBindMoble == 1)

        if (WxWrapper.checkAppQuery()) {
            this.willStartGame = false
            this.skipPopUp = true
        }

        // 获取特殊商品
        getShopBox(7)

        // 合成按钮控制
        this.setSideBtnActive("btnCombined", DataManager.Instance.onlineParam.combinedGame != 0)
    }

    onCloseScene() {
        cc.audioEngine.stopMusic()
    }

    update() {
        if (this.isLogin || DataManager.CommonData["isLogin"] != true || DataManager.CommonData["configFinish"] != true)
            return

        this.isLogin = true
        if (null == NetManager.Instance.getSocketState("lobby")) {
            NetManager.Instance.login("lobby", DataManager.Instance.SocketAddress, proto, opcodeConfig, (socket) => this.sendVerifyTicketReq(socket))
        } else {
            if (this.isGuideToCash || false == this.willStartGame || DataManager.load(DataManager.UserData.guid + "lastGameId") > 0) {
                GameManager.hideFace()
            }
        }
    }

    checkAllConfig2() {
        this.countAllConfig2++
        if (this.countAllConfig2 == 2) {
            this.updateExchangeInfo()
            if (DataManager.CommonData["first"] == 1 && this.isGuideToCash && this.getSideBtn("newbieGift").active) {
                NetManager.Instance.send("lobby", { opcode: "proto_cl_get_newbie_reward_req" })
            } else if (this.willStartGame && this.isLogin && DataManager.load(DataManager.UserData.guid + "lastGameId") == null) {
                this.onPressFastStart()
            }
        }
    }

    updateServerStatus() {
        cc.log("updateServerStatus", DataManager.CommonData["first"], this.isGuideToCash, this.getSideBtn("newbieGift").active)
        if (DataManager.CommonData["first"] == 1 && this.isGuideToCash && !DataManager.CommonData.isGuideToCash) {
            DataManager.CommonData.isGuideToCash = true
            this.checkAllConfig2()
        } else if (this.willStartGame && this.isLogin && DataManager.load(DataManager.UserData.guid + "lastGameId") == null) {
            this.onPressFastStart()
        }

        this.initFastGame()
    }

    updateBadge() {
        cc.find("nodeLeft/drawRp/badge", this.node).getComponent("Badge").updateView(getAdLeftTimes(AdsConfig.taskAdsMap.DrawRp))
        cc.find("nodeMain/nodeMid/drawVip/badge", this.node).getComponent("Badge").updateView(getAdLeftTimes(AdsConfig.taskAdsMap.VipExp))
        cc.find("nodeBottom/btnTreasureHunt/badge", this.node).getComponent("Badge").updateView(getAdLeftTimes(AdsConfig.taskAdsMap.TreasureHunt))
    }

    onAdConfigUpdate() {
        this.updateBadge()
    }

    getAllConfig() {
        this.countAllConfig = 1

        if (DataManager.CommonData["regtime"] > 1594828800) {
            !DataManager.CommonData["TomorrowData"] && loadTomorrowConfig()
            this.countAllConfig++
            loadTomorrowStatus(() => {
                if (this.isValid) {
                    const status = DataManager.CommonData["TomorrowStatus"]
                    let curday = status.ret == 0 ? status.list[0].signDay : 0
                    tomorrow_valid = curday < 7 || (curday == 7 && status.tomorrowAward.length > 0)

                    this.setSideBtnActive("tomorrow", tomorrow_valid)
                    this.checkAllConfig()
                }
            })
        }

        if (!DataManager.CommonData.AdConfig) {
            this.countAllConfig++
            loadAdConfig(() => { this.isValid && this.checkAllConfig() })
        }

        if (!DataManager.CommonData.shareMoneyData) {
            this.countAllConfig++
            loadShareMoney(() => { this.isValid && this.checkAllConfig() })
        }

        if (!DataManager.CommonData.realRoleCfg) {
            this.countAllConfig++
            getUserRole(() => {
                if (DataManager.CommonData.roleCfg && DataManager.CommonData.roleCfg.weekCardABTest) {
                    cc.find("nodePlayer/monthCard", this.node).active = true
                }
                this.isValid && this.checkAllConfig()
            })
        }

        if (!DataManager.CommonData.AdConfig) {
            this.countAllConfig++
            loadAdConfig(() => { this.isValid && this.checkAllConfig() })
        }

        if (!DataManager.CommonData.ExchangeInfo) {
            this.countAllConfig++
            getExchangeConfig(() => {
                if (this.isValid) {
                    this.checkAllConfig2()
                    this.checkAllConfig()
                }
            })
        } else {
            getExchangeConfig()
        }

        this.checkAllConfig()
    }

    checkAllConfig() {
        this.countAllConfig--
        if (this.countAllConfig == 0) {
            this.showPopups()
        }
    }

    updateExchangeInfo() {
        if (this.isGuideToCash) {
            const configs = DataManager.Instance.onlineParam.GuideToCashConfigs || [{ gain: { id: -6, num: 3 } }, { gain: { id: -4, num: 1 } }]
            const find = DataManager.CommonData.ExchangeInfo.some(info => {
                const gainItem = info.gainItemList[0]
                if (gainItem && info.exchangeCount == 0) {
                    return configs.some(config => config.gain && config.gain.id == gainItem.gainItem && config.gain.num == gainItem.gainNum)
                }
                return false
            })
            this.setSideBtnActive("newbieGift", find)
        }
    }

    updateUserData(onlyUpdateInfo = false) {
        cc.find("nodePlayer/nickname", this.node).getComponent(cc.Label).string = DataManager.UserData.nickname

        NodeExtends.setNodeSpriteNet({ node: cc.find("nodePlayer/nodeFace/nodeMask/face", this.node), url: DataManager.UserData.face, fixSizeBySize: cc.size(70, 70) })

        if (onlyUpdateInfo) {
            return
        }

        getMailInfo()

        this.updateVipInfo()

        cc.find("nodeLeft/lottery/badge", this.node).getComponent("Badge").updateView(DataManager.UserData.getItemNum(366))        
    }
    
    updateTitle() {
         // 合成游戏头衔
         if (DataManager.Instance.onlineParam.combinedTitle != 0) {
            CombinedConfig.getTitle(DataManager.UserData.guid, (msg) => {
                if (!this || !this.node || !this.node.isValid) {
					return
				}
                if (msg == null || msg.titles == null) {
                    return
                }
                let lv = msg.titles[DataManager.UserData.guid]
                lv = Math.min(Math.max(!!lv ? lv : 1, 0), 30)
                NodeExtends.setNodeSprite({ node: cc.find("nodePlayer/nodeTitle/title", this.node), url: CombinedConfig.getTitleByLevel(lv) })
                let honourBg = "honour_bg" + Math.ceil(lv / 5)
                NodeExtends.setNodeSprite({ node: cc.find("nodePlayer/nodeTitle/honourBg", this.node), url: "moduleLobby/texture/combined/" + honourBg })
            })
        }
    }

    updateVipInfo() {
        const data = DataManager.CommonData["VipData"]
        const info = DataManager.CommonData["VipInfo"]
        if (!data || !info) {
            return
        }

        const lv = data.vipLevel || 0
        const node = cc.find("nodePlayer/nodeVip", this.node)

        node.getChildByName("viplabel").getComponent(cc.Label).string = lv

        const nextLv = lv + 1
        for (const iterator of info) {
            if (iterator["vipLv"] == nextLv) {
                const nextLvExp = iterator.payMoney
                const vipProgress = node.getChildByName("progress").getComponent(cc.Sprite)
                vipProgress.fillRange = (nextLvExp - data.nextVipneedMoney) / nextLvExp
                break
            }
        }
    }

    onUserInfoUpdate() {
        this.updateUserData(true)
        cc.find("nodePlayer/nodeFace/badge", this.node).active = false
    }

    onPressGameRoom(sender, gameId) {
        cc.audioEngine.playEffect(DataManager.Instance.menuEffect, false)
        gameId = isNaN(parseInt(gameId)) ? (getGameConfig(gameId) || getGameConfig("module" + gameId)) : parseInt(gameId)

        if (null == DataManager.CommonData["ServerDatas"] || 0 == DataManager.CommonData["ServerDatas"].length) {
            getServerList()
            return
        }

        let servers = getGameServers(gameId)

        if (gameId == -1) {
            SceneManager.Instance.popScene("moduleLobby", "MiniGameScene")
        }
        else if (gameId == -2) {

        }
        else if (gameId == -3) {
            SceneManager.Instance.popScene("moduleLobby", "PersonalRoomScene")
            return
        }
        else if (gameId == -4) {
            SceneManager.Instance.popScene("moduleLobby", "JoinRoomPop")
            return
        }
        else if (gameId == -5) {
            SceneManager.Instance.popScene("moduleLobby", "MatchScene")
            return
        }
        else if (null == servers || 0 == servers.length) {
            getServerList()
            return
        }
        else {
            SceneManager.Instance.popScene("moduleLobby", "RoomScene", { gameId: gameId, servers: servers })
        }
    }

    sendVerifyTicketReq(socket: WebSocketWrapper) {
        GameManager.hideFace()
        czcEvent("大厅", "登录7", "连接socket " + DataManager.Instance.userTag)
        const proto_cl_verify_ticket_req = {
            opcode: "proto_cl_verify_ticket_req",
            plyGuid: DataManager.Instance._userData.guid,
            plyNickname: DataManager.Instance._userData.nickname,
            plyTicket: DataManager.Instance._userData.ticket,
            gameId: DataManager.Instance.gameId,
            version: 1498492800,
            extParam: "",
            sex: DataManager.Instance._userData.sex,
            packetName: DataManager.Instance.packetName
        }

        socket.send(proto_cl_verify_ticket_req)
    }

    onPressFastStart() {
        let gameId = DataManager.load(DataManager.UserData.guid + "lastGameId")
        czcEvent("大厅", "快速开始", gameId + " " + DataManager.Instance.userTag)
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

    onPressADAward(event, data) {
        cc.audioEngine.playEffect(DataManager.Instance.menuEffect, false)
        const adIndex = parseInt(data)

        if (!checkAdCanReceive(adIndex)) {
            iMessageBox("您今日的奖励次数已用完，请明天再来！")
            return
        }

        const award = AdsConfig.getAwardById(adIndex)
        if (award && getNextAdMethod(adIndex) != 0) {
            SceneManager.Instance.popScene("moduleLobby", "AdAwardPop", award)
        } else {
            receiveAdAward(adIndex)
        }
    }

    getSideBtn(btnName) {
        let btn = cc.find("nodeLeft/" + btnName, this.node)
        if (null == btn)
            btn = cc.find("nodeRight/" + btnName, this.node)
        if (null == btn)
            btn = cc.find("nodeTop/" + btnName, this.node)
        if (null == btn)
            btn = cc.find("nodeBottom/" + btnName, this.node)
        if (null == btn)
            btn = cc.find("nodeBottom2/" + btnName, this.node)
        if (null == btn)
            btn = cc.find("nodeTmp/" + btnName, this.node)
        if (null == btn) {
            const more = this.getSideBtn("btnMoreOpen")
            more && (btn = cc.find("nodeMore/" + btnName, more))
        }

        return btn
    }

    setSideBtnActive(btnName, active) {
        const button = this.getSideBtn(btnName)
        button && (button.active = active)
    }

    onPressShuang11() {
        let socketMsg = {
            opcode: "proto_cl_store_safe_amount_req",
            plyGuid: DataManager.UserData.guid,
            amount: 0
        }
        NetManager.Instance.send("lobby", socketMsg)
        this.intoDouble11Active = true
    }

    proto_lc_store_safe_amount_ack(message) {
        if (false == this.intoDouble11Active)
            return

        message = message.packet
        if (message.ret != -1)
            showDouble11ActivePop()
        else
            iMessageBox("您有未完成的游戏,请先完成游戏!")

        this.intoDouble11Active = false
    }

    proto_lc_get_mail_info_ack(message) {
        message = message.packet
        let mails = message.mailInfo.filter(item => item.mailStatus == 0)
        cc.find("nodeTop/btnMail/badge", this.node).active = mails.length > 0
    }

    onMsgGameRoom(message) {
        message = message.message
        if (message.gameId) {
            this.onPressGameRoom(null, message.gameId)
        }
    }

    msg_on_press_friends_game() {
        this.onPressGameRoom(null, -3)
    }

    audio_play() {
        this.backgroundMusic && cc.audioEngine.playMusic(this.backgroundMusic, true)
    }

    initGame() {
        if (DataManager.CommonData["morrow"] == 0) {
            const finger = cc.find("nodeMain/nodeGame/bxpEntrance/fingerAni", this.node)
            finger && (finger.active = true)
        }

        const node = cc.find("nodeMain/nodeGame", this.node)
        const games = node ? node.children : []
        for (const game of games) {
            const ani = game.getChildByName("ani")
            const spine = ani ? ani.getComponent(sp.Skeleton) : null
            if (spine) {
                if (game.name == "qdzEntrance") {
                    spine.setAnimation(0, "animation", true)
                } else {
                    spine.setAnimation(0, "daiji", false)
                    spine.setCompleteListener(() => {
                        spine.isValid && spine.setAnimation(0, Math.random() * 100 > 30 ? "daiji" : "suiji", false)
                    })
                }
            }
        }
    }

    initRole() {
        const role = cc.find("nodeMain/shadow/role", this.node)
        const spine = role ? role.getComponent(sp.Skeleton) : null
        if (spine) {
            spine.setAnimation(0, "daiji-1", false)
            spine.setCompleteListener(() => {
                spine.isValid && spine.setAnimation(0, Math.random() * 100 > 30 ? "daiji-1" : "daiji-2", false)
            })
        }
    }

    initFastGame() {
        let gameId = DataManager.load(DataManager.UserData.guid + "lastGameId") || 3892
        let name = {}
        let nameFormat = ""
        let qr = cc.find("nodeBottom/btnFast/fastLabel", this.node).getComponent(cc.Label)
        let servers = getLowMoneyRoom(gameId)
        if (servers && servers.length) {
            // 处理斗地主三种类型
            if (gameId >= 3890)
                gameId = Math.floor(gameId / 10)

            name = getChangCiName(gameId, servers[0].ddz_game_type, servers[0].level)

            nameFormat = name["gameName"] + "·" + name["typeName"] + name["levelName"]
        }
        qr.string = nameFormat
    }

    initTip() {
        const targets = []
        targets.push(cc.find("nodeBottom/btnTreasureHunt/tips_pop", this.node))
        targets.push(cc.find("nodeBottom/btnShop/tips_pop", this.node))
        targets.push(cc.find("nodeLeft/piece/tips_pop", this.node))

        const flash = function (node) {
            node.active = true
            node.runAction(cc.sequence(
                cc.delayTime(Math.random() * 10 + 3),
                cc.fadeOut(0.5),
                cc.delayTime(Math.random() * 10 + 5),
                cc.callFunc(() => {
                    node.opacity = 255
                    node.active = false
                    flash(node)
                })
            ))
        }

        for (let i = 0, len = targets.length; i < len; i++) {
            targets[i] && flash(targets[i])
        }
    }

    onAfterDraw() {
        if (!this.isValid) { return }
        GameManager.hideFace()
    }

    updateTaskList(event: { message: { taskList: Iproto_ATAchieveData[] } }) {
        const message = event.message
        if (null == message.taskList || 0 == message.taskList.length) {
            return
        }

        for (const task of message.taskList) {
            this.taskData[task.cond] = task
        }

        let isTaskComplete = false

        for (var id in this.taskData) {
            const task = this.taskData[id]
            if (task.status == 0 && task.value >= task.max) {
                isTaskComplete = true
                break
            }
        }

        cc.find("nodeBottom/btnTask/badge", this.node).active = isTaskComplete
    }

    showPopups() {
        if (this.willStartGame && null == DataManager.load(DataManager.UserData.guid + "lastGameId")) {
            return
        }

        if (this.skipPopUp) {
            return
        }

        this.countPopup = 2
        this.popupQuene = new PopupQueue()

        // 返回之前场景
        if (DataManager.CommonData["showMatchScene"]) {
            this.popupQuene.add(this.checkShowPopup_MatchScene.bind(this, DataManager.CommonData["showMatchScene"]))
            delete DataManager.CommonData["showMatchScene"]
        } else if (DataManager.CommonData["leaveGame"]) {
            if (DataManager.Instance.getOnlineParamSwitch("back2showadABTest")) {
                playADInter()
            }

            let gameId = DataManager.load(DataManager.UserData.guid + "lastGameId")
            if (5 == DataManager.CommonData["leaveGameLevel"] && gameId == 390) {
                gameId = 389
            }

            if (DataManager.CommonData["ddzGameType"]) {
                gameId = gameId * 10 + parseInt(DataManager.CommonData["ddzGameType"])
                delete DataManager.CommonData["ddzGameType"]
            }

            if (DataManager.CommonData["leaveGameIsPrivate"]) {
                gameId = -3
            }
            if (gameId < 0 || false == isSmallGame(gameId)) {
                this.popupQuene.add(this.checkShowPopup_GameRoom.bind(this, gameId))
            }
        }

        do {
            const checkonlineParam = function (name: string) {
                const params = DataManager.Instance.onlineParam[name]
                if (params) {
                    for (const popup of params) {
                        this.popupQuene.add(this["checkShowPopup_" + popup].bind(this))
                    }
                    return true
                }
            }
            if (DataManager.CommonData["leaveGame"]) {
                if (DataManager.CommonData["first"] == 1 && !DataManager.CommonData["first_showPopups"]) {
                    DataManager.CommonData["first_showPopups"] = true
                    if (checkonlineParam("lobbyPopups_leaveGameFirst")) {
                        break
                    }

                    // 新手第一次离开游戏引导到兑换去
                    if (DataManager.Instance.getOnlineParamSwitch("LeaveGameFirstToExchange", 1)) {
                        this.popupQuene.add(this.checkShowPopup_GuideExchangePop1.bind(this))
                        break
                    }
                    this.popupQuene.add(this.checkShowPopup_TomorrowPop.bind(this))
                    this.popupQuene.add(this.checkShowPopup_DrawVip.bind(this))
                    this.popupQuene.add(this.checkShowPopup_TreasureHuntPop.bind(this))
                } else {
                    if (checkonlineParam("lobbyPopups_leaveGame")) {
                        break
                    }
                    this.popupQuene.add(this.checkShowPopup_ObtainRedpacketPop.bind(this))
                    this.popupQuene.add(this.checkShowPopup_SignPop.bind(this))
                    this.popupQuene.add(this.checkShowPopup_DrawVip.bind(this))
                    this.popupQuene.add(this.checkShowPopup_TreasureHuntPop.bind(this))
                }
            } else {
                if (DataManager.Instance.getOnlineParamSwitch("ShareMoneyABTest") && DataManager.CommonData["first"] == 0 && DataManager.CommonData.shareMoneyData && DataManager.CommonData.shareMoneyData.shareMoney == "") {
                    this.popupQuene.add(this.checkShowPopup_ShareMoneyGuidePop.bind(this))
                } 
                if (DataManager.CommonData["morrow"] <= 7) {
                    if (checkonlineParam("lobbyPopups_loginNew")) {
                        break
                    }
                    this.popupQuene.add(this.checkShowPopup_TomorrowPop.bind(this))
                    this.popupQuene.add(this.checkShowPopup_DrawVip.bind(this))
                    this.popupQuene.add(this.checkShowPopup_TreasureHuntPop.bind(this))
                    this.popupQuene.add(this.checkShowPopup_ActivityPortalPop.bind(this, true))
                } else {
                    if (checkonlineParam("lobbyPopups_login")) {
                        break
                    }
                    this.popupQuene.add(this.checkShowPopUp_NoticePop.bind(this))
                    this.popupQuene.add(this.checkShowPopup_DrawVip.bind(this, true))
                    this.popupQuene.add(this.checkShowPopup_TreasureHuntPop.bind(this, true))
                    this.popupQuene.add(this.checkShowPopup_SignPop.bind(this, true))
                    this.popupQuene.add(this.checkShowPopup_ActivityPortalPop.bind(this, true))
                }
            }
        } while (false)
        delete DataManager.CommonData["leaveGame"]
        this.popupQuene.showPopup()
    }

    checkShowPopup_MatchScene(parmes: any) {
        this.node.runAction(cc.sequence([
            cc.delayTime(0.1),
            cc.callFunc(() => { SceneManager.Instance.popScene("moduleLobby", "MatchScene", parmes) }),
            cc.delayTime(0.1),
            cc.callFunc(this.popupQuene.showPopup.bind(this.popupQuene))
        ]))
        return true
    }

    checkShowPopup_GameRoom(gameId: number) {
        this.node.runAction(cc.sequence([
            cc.delayTime(0.1),
            cc.callFunc(() => { this.onPressGameRoom(null, gameId) }),
            cc.delayTime(0.1),
            cc.callFunc(this.popupQuene.showPopup.bind(this.popupQuene))
        ]))
        return true
    }

    /**
     * 明日有礼
     */
    checkShowPopup_TomorrowPop() {
        if (tomorrow_valid) {
            SceneManager.Instance.popScene("moduleLobby", "TomorrowPop", { closeCallback: this.popupQuene.showPopup.bind(this.popupQuene) })
            return true
        }
    }

    /**
     * 送VIP
     */
    checkShowPopup_DrawVip(force: boolean) {
        if ((force || this.countPopup > 0) && getAdLeftTimes(AdsConfig.taskAdsMap.VipExp) > 0) {
            this.countPopup--
            SceneManager.Instance.popScene("moduleLobby", "DrawVip", { closeCallback: this.popupQuene.showPopup.bind(this.popupQuene) })
            return true
        }
    }

    /**
     * 寻宝
     */
    checkShowPopup_TreasureHuntPop(force: boolean) {
        if ((force || this.countPopup > 0) && checkAdCanReceive(AdsConfig.taskAdsMap.TreasureHunt)) {
            this.countPopup--
            SceneManager.Instance.popScene("moduleLobby", "TreasureHuntPop", { closeCallback: this.popupQuene.showPopup.bind(this.popupQuene) })
            return true
        }
    }

    /**
     * 幸运转盘
     */
    checkShowPopup_LotteryPop() {
        SceneManager.Instance.popScene("moduleLobby", "LotteryPop", { closeCallback: this.popupQuene.showPopup.bind(this.popupQuene) })
        return true
    }

    /**
     * 福卡收益
     */
    checkShowPopup_ObtainRedpacketPop() {
        const lobby_ObtainRedpacket_count = DataManager.Instance.onlineParam.lobby_ObtainRedpacket_count || 2000
        if (DataManager.UserData.getItemNum(365) - DataManager.CommonData["RedpacketCount"] >= lobby_ObtainRedpacket_count) {
            SceneManager.Instance.popScene("moduleLobby", "ObtainRedpacketPop", { closeCallback: this.popupQuene.showPopup.bind(this.popupQuene) })
            return true
        }
    }

    /**
     * 签到
     */
    checkShowPopup_SignPop(force: boolean) {
        const signCheck = DataManager.load(DataManager.UserData.guid + "SignPop" + TimeFormat("yyyy-mm-dd"))
        if ((force || this.countPopup > 0) && !signCheck && null == DataManager.CommonData[DataManager.UserData.guid + "SignPop"]) {
            this.countPopup--
            SceneManager.Instance.popScene("moduleLobby", "SignPop", { closeCallback: this.popupQuene.showPopup.bind(this.popupQuene) })
            return true
        }
    }

    /**
     * 精彩活动
     */
    checkShowPopup_ActivityPortalPop() {
        const timeZone: { startTime: string, endTime: string } = DataManager.Instance.onlineParam.LuckyBlessTimeZone || { startTime: "20201001", endTime: "20201008" }
        const t = Math.floor(new Date().getTime() / 1000)
        if (t < time.toTimeStamp(timeZone.startTime) || t > time.toTimeStamp(timeZone.endTime)) {
            return false
        }
        SceneManager.Instance.popScene<String>("moduleLobby", "ActivityPortalPop", { selectName: "幸运祈福", closeCallback: this.popupQuene.showPopup.bind(this.popupQuene) })
        return true
    }

    // 新人引导
    checkShowPopup_GuideNewbieGiftPop(rewards) {
        SceneManager.Instance.popScene<String>("moduleLobby", "GuideNewbieGiftPop", { rewards: rewards, closeCallback: this.popupQuene.showPopup.bind(this.popupQuene) })
        return true
    }

    // 新人引导1
    checkShowPopup_GuideBubblePop1() {
        SceneManager.Instance.popScene<String>("moduleLobby", "GuideBubblePop", {
            noSing: true,
            name: "引导点击立即提现",
            tips: "点击任意区域继续",
            bubble1: {
                title: "点击立即提现",
                node: this.getSideBtn("newbieGift"),
                offect: cc.v2(110, 135),
            },
            closeCallback: this.popupQuene.showPopup.bind(this.popupQuene)
        })
        return true
    }

    checkShowPopup_GuideToCashPop() {
        SceneManager.Instance.popScene<String>("moduleLobby", "ToCashPop", { isGuideToCash: this.isGuideToCash, closeCallback: this.popupQuene.showPopup.bind(this.popupQuene) })
        return true
    }

    // 新人引导5
    checkShowPopup_GuideBubblePop5() {
        SceneManager.Instance.popScene<String>("moduleLobby", "GuideBubblePop", {
            noSing: true,
            name: "引导快速开始",
            tips: "点击任意区域快速开始",
            bubble3: {
                title: "进行游戏可快速\n获得福卡",
                node: cc.find("nodeMain/nodeGame", this.node),
                offect: cc.v2(-460, -25),
            },
            closeCallback: this.onPressFastStart.bind(this)
        })
        return true
    }

    proto_lc_get_newbie_reward_ack(event: { packet: proto.proto_lc_get_newbie_reward_ack }) {
        const message = event.packet
        if (message.ack == 0) {
            this.popupQuene = new PopupQueue()
            this.popupQuene.add(this.checkShowPopup_GuideNewbieGiftPop.bind(this, JSON.parse(message.rewards)))
            this.popupQuene.add(this.checkShowPopup_GuideBubblePop1.bind(this))
            this.popupQuene.add(this.checkShowPopup_GuideToCashPop.bind(this))
            this.popupQuene.add(this.checkShowPopup_GuideBubblePop5.bind(this))
            this.popupQuene.showPopup()
        } else if (this.willStartGame) {
            this.onPressFastStart()
        }
    }

    /**
     * 引导用户
     */
    checkShowPopUp_NoticePop() {
        if (DataManager.CommonData.roleCfg && DataManager.CommonData.roleCfg.importUserABTest) {
            if (DataManager.Instance.onlineParam.noticeImage) {
                showNoticePop(DataManager.Instance.onlineParam.noticeImage, this.popupQuene.showPopup.bind(this.popupQuene))
                return true
            }
        }
    }

    updateOnceBox() {
        cc.find("nodePlayer/dayCard", this.node).active = !!checkFirstBox(1)
    }

    // 兑换引导
    checkShowPopup_GuideExchangePop1() {
        SceneManager.Instance.popScene<String>("moduleLobby", "GuideBubblePop", {
            noSing: true,
            name: "引导点击兑换",
            tips: "点击任意区域继续",
            bubble3: {
                title: "去兑换0.3元",
                node: cc.find("nodeTop/nodeCurrency/item365", this.node),
                nodeRectOffect: cc.rect(-30, -10, 20, 20),
                offect: cc.v2(110, 135),
            },
            closeCallback: () => {
                SceneManager.Instance.popScene("moduleLobby", "ExchangeScene", { isGuideExchange: true })
            }
        })
        return true
    }

    updateShareMoney() {
        const shareMoney = DataManager.CommonData.shareMoneyData.shareMoney
        this.setSideBtnActive("shareMoney", shareMoney == "" || Math.floor(new Date().getTime() / 1000) < shareMoney[0].sm_time)
    }

    // 分享赚钱引导
    checkShowPopup_ShareMoneyGuidePop() {
        SceneManager.Instance.popScene("moduleLobby", "ShareMoneyGuidePop")
        return true
    }

    onPressShareMoney() {
        cc.audioEngine.playEffect(DataManager.Instance.menuEffect, false)
        if (DataManager.CommonData.shareMoneyData.shareMoney == "") {
            SceneManager.Instance.popScene("moduleLobby", "ShareMoneyGuidePop")
        } else {
            SceneManager.Instance.popScene("moduleLobby", "ShareMoneyPop")
        }
    }
}
