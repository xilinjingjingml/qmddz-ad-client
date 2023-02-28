import BaseScene from "../base/baseScene/BaseScene";
import DataManager from "../base/baseData/DataManager";
import SceneManager from "../base/baseScene/SceneManager";
import { TimeFormat, iMessageBox, enterGame, checkServerMoneyLimit, showTrumpet, MsgBox, numberFormat, unenoughGold, checkFirstBox, showAwardResultPop, czcEvent, oncePayBox, getLowMoneyRoom, getShopBox, getNewBieServer, playAD, PostInfomation, showTokenGrowPop, getNowTimeUnix, checkOneYuanBox, showQttSuspendWin, showDouble11ActivePop, showActivityPortalPop, getClipBoard, QttReportData, getGameServers, findStringIndexs } from "../base/BaseFuncTs";
import { getMobileState, exchangeQttCoin, getNewUserSignAward, getServerList, getADConfig, getADAward, sendReloadUserData, check03ExchangeGoods, getExchangeConfig, checkADNum, getFlyBackAward, getMailInfo, getVipConfig, getADDraw } from "./LobbyFunc";
import BaseTrigger from "../base/extensions/Trigger/BaseTrigger";
import NetManager from "../base/baseNet/NetManager";
import proto = require("../moduleLobby/proto/lobbyproto")
import opcodeConfig from "./proto/opcode";
import GameManager from "../base/GameManager";
import WebSocketWrapper from "../base/baseNet/WebSocketWrapper";
import { getGameConfig, isSmallGame, getGameBaseLevel, GAME_TYPE, getGameName, getChangCiName } from "../gameConfig";
import BaseComponent from "../base/BaseComponent";
import { AdsConfig } from "../base/baseData/AdsConfig";
import QttPluginWrapper from "../base/QttPluginWrapper";

const {ccclass, property} = cc._decorator;

const AD_QTT_AREA = 5
const AD_FREE_GOLD = 6

const POP_SCENE = cc.Enum({
    NONE: 0,
    NEW_USER_SIGN: 1,
    USER_RELOGIN: 2,
    SIGN_POP: 3,
    ONE_YUAN_ACTIVE: 4,
    VIP_ACTIVE: 5,
    ONE_YUAN_POP: 6,
    FREE_DRAW: 7,
    
    POP_END: -1
})

@ccclass
export default class LobbyScene extends BaseComponent {

    _isLogin: boolean = false

    _bInit: boolean = false

    _firstJumpGame: boolean = false

    _intoDouble11Active: boolean = false

    _showRoom: boolean = false

    
    @property({
        type: cc.AudioClip
    })
    backgroundMusic = null

    onLoad() {

    }

    onFixLongScreen() {
        this["nodeLeft"].scale = 1.15
        // this["nodeRight"].scale = 1.15
        this["nodeTop"].scale = 1.15        
    }

    onOpenScene() {
        czcEvent("大厅", "登录9", "进入大厅 " + (DataManager.CommonData["morrow"] <= 1 ? DataManager.CommonData["morrow"] + "天新用户" : "老用户"))
                
        this.audio_play()

        this._firstJumpGame = DataManager.Instance.onlineParam && null != DataManager.Instance.onlineParam.jump2game ? (DataManager.Instance.onlineParam.jump2game == 1) : this._firstJumpGame

        this.socketName = "lobby"
        showTrumpet()    
        this.updateUserData()

        if (DataManager.CommonData["morrow"] == 0) {
            let ddz = cc.find("nodeMain/nodeGame/ddzEntrance", this.node)
            if (null != ddz)
                ddz.getChildByName("fingerAni").active = true
        }
        
        let nodeServers = cc.find("nodeServers/nodeSize", this.node)
        if (null !!= nodeServers) {
            let path = null != nodeServers.getComponent(cc.ScrollView) ? "view/content/" : ""
            let have88 = DataManager.Instance.GameType === GAME_TYPE.QMDDZ && DataManager.CommonData["regtime"] < 1578412800

            cc.find("nodeServers/nodeSize/" + path + "btnServer3/50yuanflag", this.node).active = !have88
            cc.find("nodeServers/nodeSize/" + path + "btnServer3/88yuanflag", this.node).active = have88
            cc.find("nodeServers/nodeSize/" + path + "btnServer15/50yuanflag", this.node).active = !have88
            cc.find("nodeServers/nodeSize/" + path + "btnServer15/88yuanflag", this.node).active = have88
        }
        
        this.setSideBtnActive("btnNewGift", false)
        this.setSideBtnActive("btnSixBox", false)
        this.setSideBtnActive("btnOneYuan", false)
        this.setSideBtnActive("btnOneYuanActive", false)
        this.setSideBtnActive("btnOneYuanActive2", false)
        this.setSideBtnActive("btnVipActive", false)
        this.setSideBtnActive("10wRp", false)

        this.setSideBtnActive("btnBackActive", DataManager.CommonData["flyBack"])

        this.getAllConfig()

        // let tips = cc.find("nodeMain/nodeGame/moreEntrance/tipPop/nodeGameList", this.node)
        // if (tips) {
        //     for (let i = 0 ; i < tips.childrenCount ; i ++) {
        //         tips.children[i].position = cc.v2(0, -93)
        //         this.node.runAction(cc.sequence(cc.delayTime(2.3 * i), cc.callFunc(() => {
        //             tips.children[i].runAction(
        //                 cc.repeatForever(
        //                     cc.sequence(
        //                         cc.moveTo(.8, cc.v2(0, 0)), 
        //                         cc.delayTime(1), 
        //                         cc.moveTo(.5, cc.v2(0, 31)), 
        //                         cc.moveTo(0, cc.v2(0, -93)), 
        //                         cc.delayTime(2.0 * (tips.childrenCount - 1)))))
        //         })))
        //     }
        // }        

        if (DataManager.Instance.GameType === GAME_TYPE.QMDDZMD) {
            this.setSideBtnActive("btnShuang11", false)
            this.setSideBtnActive("btnNationalDay", false)

            // cc.find("nodeMain/ermjEntrance", this.node).active = false
            // cc.find("nodeMain/moreEntrance", this.node).active = false

            // cc.find("nodeMain/ermjEntrance2", this.node).active = true
            // cc.find("nodeMain/moreEntrance2", this.node).active = true
        }
        
        // let size = window['winSize'] || cc.winSize.width
        // this.node.getChildByName("nodePrivateRoom").width = size.width

        if (null == DataManager.CommonData["VipInfo"])
            getVipConfig(this.updateVipInfo.bind(this))                     
        
        let games = cc.find("nodeMain/nodeGame", this.node)
        for (let btn of games.children) {
            if (btn.getChildByName("ani")) 
                this.playIconAnimation(btn.getChildByName("ani").getComponent(sp.Skeleton))
        }


        this.initTipPopAni(cc.find("nodeBottom/btnTreasureHunt/tips_pop", this.node))
        this.initTipPopAni(cc.find("nodeBottom/btnShop/tips_pop", this.node))
        this.initTipPopAni(cc.find("nodeMain/nodeMid/drawVip/tips_pop", this.node))
        // this.mianfei1yuan()

        this.initFastGameName()
    }

    onCloseScene() {
        cc.audioEngine.stopMusic()
    }

    update () {
        if (this._isLogin || DataManager.CommonData["isLogin"] != true || DataManager.CommonData["configFinish"] != true)
            return
                
        this._isLogin = true
        if (null == NetManager.Instance.getSocketState("lobby")) {
            NetManager.Instance.login("lobby", DataManager.Instance.SocketAddress, proto, opcodeConfig, (socket) => this.sendVerifyTicketReq(socket))
            if (null == DataManager.CommonData["firstLoad"]) {
                QttReportData("load")
                DataManager.CommonData["firstLoad"] = true
            }
        }
        else {
            this.updateUserData()
            if (false == this._firstJumpGame || DataManager.CommonData["morrow"] != 0 || DataManager.load(DataManager.UserData.guid + "lastGameId") > 0) {
                GameManager.hideFace()                
            }
        }        
    }

    updateServerStatus() {
        if (this._firstJumpGame && this._isLogin && 0 == DataManager.CommonData["morrow"] && 
            null == DataManager.load(DataManager.UserData.guid + "lastGameId")){
            this.onPressFastStart()
        }

        this.initFastGameName()
    }

    getAllConfig() {
        getExchangeConfig()
        getShopBox(2, this.updateBottonState.bind(this))
        getShopBox(7, this.updateBottonState.bind(this))
        null == DataManager.CommonData["adConfig"] ? getADConfig(this.updateBottonState.bind(this)) : ""
        this.updateShowPop()        
    }

    updateShowPop(popName:number = POP_SCENE.NONE) {
        if (this._firstJumpGame && 0 == DataManager.CommonData["morrow"] && null == DataManager.load(DataManager.UserData.guid + "lastGameId"))
            return;

        let self = this
        switch(popName){
            case POP_SCENE.NONE :               
                if (false && DataManager.CommonData["morrow"] < 7 && null == DataManager.CommonData[DataManager.UserData.guid + "newUserSign"]) {
                    let tmp = () => {
                        if (DataManager.CommonData["NewUserSgin"]["rows"]){
                            let day = DataManager.CommonData["NewUserSgin"]["day"] - 1
                            let last = DataManager.CommonData["NewUserSgin"]["rows"].length - 1
                            if (DataManager.CommonData["NewUserSgin"]["rows"][last].code == 0 || DataManager.CommonData["NewUserSgin"]["rows"][last].code == 3){
                                this.setSideBtnActive("10wRp", true)
                            }
                            if (DataManager.CommonData["NewUserSgin"]["rows"][day].code == 0 || DataManager.CommonData["NewUserSgin"]["rows"][day].code == 3){
                                SceneManager.Instance.popScene("moduleLobby", "NewUserSignPop", {closeCallback: () => {self.updateShowPop(self._firstJumpGame ? POP_SCENE.END : POP_SCENE.NEW_USER_SIGN)}}) 
                                return
                            }
                        }
                        
                        self.updateShowPop(POP_SCENE.USER_RELOGIN)
                    }
                    null == DataManager.CommonData["NewUserSgin"] || 0 == DataManager.CommonData["NewUserSgin"].length ? getNewUserSignAward(tmp) : tmp()
                    return
                }
                else if (DataManager.CommonData["flyBack"] && null == DataManager.CommonData[DataManager.UserData.guid + "flyBack"]){
                    DataManager.CommonData[DataManager.UserData.guid + "flyBack"] = true
                    getFlyBackAward(0, (msg) => {
                        if (msg == 0)
                            SceneManager.Instance.popScene("moduleLobby", "BackAwardPop", {closeCallback: () => {self.updateShowPop(POP_SCENE.NEW_USER_SIGN)}})
                        else
                            self.updateShowPop(POP_SCENE.USER_RELOGIN)
                            
                    })
                    return
                }
                this.updateShowPop(POP_SCENE.USER_RELOGIN)
                break;
            case POP_SCENE.NEW_USER_SIGN :
                if (DataManager.CommonData["morrow"] == 0 || DataManager.CommonData["flyBack"]){
                    DataManager.save(DataManager.UserData.guid + "lastGameId", 3892)
                    this.onPressFastStart()
                }
                else
                    this.updateShowPop(POP_SCENE.USER_RELOGIN)
                break;
            case POP_SCENE.USER_RELOGIN :
                let todayDate = TimeFormat("yyyy-mm-dd")
                
                let signCheck = DataManager.load(DataManager.UserData.guid + "SignPop" + todayDate)

                if (!signCheck && null == DataManager.CommonData[DataManager.UserData.guid + "SignPop"]) {
                    SceneManager.Instance.popScene("moduleLobby", "SignPop", {closeCallback: () => {self.updateShowPop(POP_SCENE.SIGN_POP)}})                    
                    return
                }
                this.updateShowPop(POP_SCENE.SIGN_POP)
                break;            
            case POP_SCENE.SIGN_POP :                            
                // if (null == DataManager.CommonData[DataManager.UserData.guid + "OneYuanActivePop"]){
                //     SceneManager.Instance.popScene("moduleLobby", "OneYuanOneDayActivePop", {closeCallback: () => {self.updateShowPop(POP_SCENE.ONE_YUAN_ACTIVE)}})                                
                //     return
                // }
            
                // if (null == DataManager.CommonData[DataManager.UserData.guid + "OneYuanActivePop"] && 
                //     null == DataManager.CommonData[DataManager.UserData.guid + "OneYuanPop"]) {
                //     if (null != DataManager.Instance.OneYuanBoxs && DataManager.Instance.OneYuanBoxs.length > 0) {
                //         SceneManager.Instance.popScene("moduleLobby", "OneYuanPop", {closeCallback: () => {self.updateShowPop(POP_SCENE.ONE_YUAN_POP)}})
                //         return
                //     }
                // }
                this.updateShowPop(POP_SCENE.ONE_YUAN_POP)
                break;
            case POP_SCENE.ONE_YUAN_ACTIVE:
                // if (null == DataManager.CommonData[DataManager.UserData.guid + "VipActivePop"] && DataManager.CommonData["morrow"] >= 3) {
                if (null == DataManager.CommonData[DataManager.UserData.guid + "VipActivePop"]) {
                    // let active = DataManager.Instance.onlineParam.oneYuanActive

                    // if (active && active.start <= getNowTimeUnix() && (active.end + 86400) >= getNowTimeUnix()) {  
                    if (DataManager.Instance.onlineParam.showActive == 1) {
                        SceneManager.Instance.popScene("moduleLobby", "ActivePop", {closeCallback: () => {self.updateShowPop(POP_SCENE.VIP_ACTIVE)}})
                        return
                    }                                           
                }
                this.updateShowPop(POP_SCENE.VIP_ACTIVE)
                break;
            case POP_SCENE.ONE_YUAN_POP:
            case POP_SCENE.VIP_ACTIVE: 
                // if (null == DataManager.CommonData[DataManager.UserData.guid + "FreeDrawPop"]) {
                //     let tmp = function() {
                //         if (checkADNum(2))
                //             SceneManager.Instance.popScene("moduleLobby", "FreeDrawPop", {closeCallback: () => {self.updateShowPop(POP_SCENE.POP_END)}})
                //         else
                //             self.updateShowPop(POP_SCENE.POP_END)            
                //     }
                //     null == DataManager.CommonData["adConfig"] ? getADConfig(tmp) : tmp()
                //     return
                // }         
                if (getNowTimeUnix() <= 1578585600 && null == DataManager.CommonData[DataManager.UserData.guid + "ErddzActivePop"]) {
                    SceneManager.Instance.popScene("moduleLobby", "ErddzActivePop", {closeCallback: () => {self.updateShowPop(POP_SCENE.POP_END)}})
                    return
                }     
                
                this.updateShowPop(POP_SCENE.POP_END)
                break;
            case POP_SCENE.POP_END:
                if (!DataManager.loadKeyWithDate(DataManager.UserData.guid + "lobbyIdleWarn") && 
                    2 > DataManager.CommonData["lobbyIdleWarnNum"]) {
                    DataManager.CommonData["lobbyIdleWarnNum"] = (DataManager.CommonData["lobbyIdleWarnNum"] || 0) + 1
                    this.scheduleOnce(() => {
                        SceneManager.Instance.popScene("moduleLobby", "IdleWarnPop", {
                            confirmCallback: () => {self.onPressFastStart()},
                            closeCallback: () => {self.updateShowPop(POP_SCENE.POP_END)}
                        })}, 60)
                }
            default:
                break;
        }
    }

    updateBottonState() {
        this.setSideBtnActive("10wRp", false)
        this.setSideBtnActive("btnNewGift", false)
        this.setSideBtnActive("btnSixBox", checkFirstBox(6, 0) != null))

        this.setSideBtnActive("btnOneYuan", false)
        DataManager.Instance.OneYuanBoxs = DataManager.Instance.OneYuanBoxs || []
        for (let box of DataManager.Instance.OneYuanBoxs) {
            if (box.price == 1){
                this.setSideBtnActive("btnOneYuan", checkOneYuanBox(1, 1) == null)
                break;            
            }
        }

        // this.getSideBtn("btnFreeDraw").getChildByName("redPoint").active = checkADNum(2)

        this.setSideBtnActive("btnNationalDay", false)

        // if (1569859200 <= getNowTimeUnix() && getNowTimeUnix() <= 1571760000) {
        if (DataManager.Instance.GameType === GAME_TYPE.QMDDZ) {
            let nationalDay = this.getSideBtn("btnNationalDay")
            if (nationalDay) {
                let lastSignTime = DataManager.CommonData["nationalSignData"] ? DataManager.CommonData["nationalSignData"][0].signTime : 0
                let now = new Date()
                let todaySign = new Date(now.getFullYear() + "-" + now.getMonth() + "-" + now.getDate()).getTime() / 1000
                let alreadySign = todaySign < lastSignTime
                nationalDay.getChildByName("redPoint").active = !alreadySign
                nationalDay.active = true
            }
        }
        // }

        this.setSideBtnActive("btnOneYuanActive", true) //DataManager.Instance.GameType === GAME_TYPE.QMDDZ
        // this.getSideBtn("btnOneYuanActive2").active = DataManager.Instance.GameType === GAME_TYPE.QMDDZMD

        let active = DataManager.Instance.onlineParam.oneYuanActive

        if (active && active.start <= getNowTimeUnix() && active.end >= getNowTimeUnix()) {  
            this.setSideBtnActive("btnVipActive", true)
        }   

        this.setSideBtnActive("btnMonthCard", DataManager.Instance.MonthBoxs.length > 0)
        
        // cc.find("nodeTop/btnMonthCard", this.node).active = false            
        
        // if (DataManager.Instance.MonthBoxs.length > 0) {
        //     cc.find("nodeTop/btnMonthCard", this.node).active = true            
        // }
        
        this.node.runAction(cc.sequence(cc.delayTime(1), cc.callFunc(() => showQttSuspendWin())))
        
    }

    updateUserData() {
        let nickname = cc.find("nodePlayer/nodeName/nickname", this.node)
        if (null != nickname)
            nickname.getComponent(cc.Label).string = DataManager.UserData.nickname

        // let goldbean = cc.find("nodePlayer/nodeCurrency/goldbean/goldlabel", this.node)
        // if (null != goldbean)
        //     goldbean.getComponent(cc.Label).string = numberFormat(DataManager.UserData.money)

        // let coin = DataManager.UserData.getItemNum(367)

        // let qttcoin = cc.find("nodePlayer/nodeCurrency/qttCoin/coinlabel", this.node)
        // if (null != qttcoin)
        //     qttcoin.getComponent(cc.Label).string = numberFormat(coin)

        // let rp = DataManager.UserData.getItemNum(365)

        // let redpacket = cc.find("nodePlayer/nodeCurrency/redpacket/rplabel", this.node)
        // if (null != redpacket)
        //     redpacket.getComponent(cc.Label).string = numberFormat(rp)
        
        let redpacketTip = cc.find("nodeTop/nodeCurrency/item365/withdrawBg/withdrawTip", this.node)
        if (null != redpacketTip)
            redpacketTip.getComponent(cc.RichText).string  = 
                "<color=#565c91>价值</c><color=#ff353f>" + Math.floor(DataManager.UserData.getItemNum(365) / 1000) / 10 + "</color><color=#565c91>元</c>"

        // let diamond = cc.find("nodePlayer/nodeCurrency/dimaond_bg", this.node)
        // if (null != diamond) {
        //     diamond.getChildByName("labelDimaond").getComponent(cc.Label).string = numberFormat(DataManager.UserData.getItemNum(1192))
        //     // diamond.active = false
        // }

        // let ddz = cc.find("nodeMain/ddzEntrance", this.node)
        // if (null != ddz)
        //     ddz.getChildByName("newUserTips").active = DataManager.CommonData["morrow"] < 3

        let self = this
        DataManager.UserData.face = DataManager.UserData.face.replace("http://", "https://")
        if (-1 != DataManager.UserData.face.indexOf("https://")) {
            cc.loader.load({url: DataManager.UserData.face, type: 'png'}, (err, texture) => {
                if (err) {
                    console.log(err)
                    return
                }
    
                if (null == self.node)
                    return
    
                let face = cc.find("nodePlayer/nodeFace/nodeMask/face", self.node)
                if (null != face) {
                    let size = face.getContentSize()
                    face.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texture)
                    face.setContentSize(size)
                }
            })
        }

        // 提示红包收益
        if (DataManager.CommonData["showMatchScene"]) {
            this.node.runAction(cc.sequence(cc.delayTime(0.1), cc.callFunc(() => {
                SceneManager.Instance.popScene("moduleLobby", "MatchScene", DataManager.CommonData["showMatchScene"])
                delete DataManager.CommonData["showMatchScene"]
            })))
            delete DataManager.CommonData["leaveGame"]
        } else if (DataManager.CommonData["leaveGame"] == true) {
            if (DataManager.UserData.getItemNum(365) - DataManager.CommonData["RedpacketCount"] > 0){
                SceneManager.Instance.popScene("moduleLobby", "ObtainRedpacketPop")
            }

            let gameId = DataManager.load(DataManager.UserData.guid + "lastGameId")
            if (5 == DataManager.CommonData["leaveGameLevel"] && gameId == 390)
                gameId = 389

            if (DataManager.CommonData["ddzGameType"]){
                gameId = gameId * 10 + parseInt(DataManager.CommonData["ddzGameType"])
                delete DataManager.CommonData["ddzGameType"]
            }

            if (DataManager.CommonData["leaveGameIsPrivate"])
                gameId = -3
            if (gameId < 0 || false == isSmallGame(gameId)) {
                let self = this
                this.node.runAction(cc.sequence(cc.delayTime(0.1), cc.callFunc(() => {self.onPressGameRoom(null, gameId)})))
                this._showRoom = true
                // this.onTeachMain2Server()
            }
            delete DataManager.CommonData["leaveGame"]
        }        

        // if (DataManager.load(DataManager.UserData.guid + "qttTip") != true && DataManager.UserData.getItemNum(367) > 0) 
        //     cc.find("nodePlayer/nodeCurrency/qttCoin/tips_pop", this.node).active = true        
        // else
        //     cc.find("nodePlayer/nodeCurrency/qttCoin/tips_pop", this.node).active = false
        
        this.updateExchangeInfo()

        let vip2 = DataManager.CommonData["VipData"] && DataManager.CommonData["morrow"] >= 3
        let xxl = cc.find("nodeMain/xxlEntrance", this.node)
        // if (null != xxl) {
        //     xxl.getChildByName("new_game_flag").active = vip2
        //     xxl.getChildByName("little_pop_bg").active = !vip2
        // }

        let carnival = DataManager.Instance.onlineParam.carnivalActive
        if (carnival && carnival.start <= getNowTimeUnix() && (carnival.end + 86400) >= getNowTimeUnix()) 
            this.setSideBtnActive("btnShuang11", true)                    
        else
            this.setSideBtnActive("btnShuang11", false)

        getMailInfo()

        // if (0 == SceneManager.Instance.findSceneByName("SideRankPop").length && DataManager.UserData.isGray()){                    
        //     // let isHide = false
        //     // if ( DataManager.CommonData["leaveGame"] == true) {
        //     //     let gameId = DataManager.load(DataManager.UserData.guid + "lastGameId")
        //     //     isHide = (false == isSmallGame(gameId))
        //     // }
        //     // let self = this
        //     // let hideRank = function(baseScene) {
        //     //     baseScene.node.active = !self._showRoom
        //     // }
            
        //     // SceneManager.Instance.popScene("moduleLobby", "SideRankPop", null, cc.Vec2.ZERO, hideRank)
        //     SceneManager.Instance.popScene("moduleLobby", "SideRankPop")
        // }                        
        // this.node.runAction(cc.sequence(cc.delayTime(2), cc.callFunc(() => {SceneManager.Instance.popScene("moduleLobby", "SideRankPop")})))        

        if (DataManager.Instance.onlineParam.shiming == 1) {
            // this.getSideBtn("btnAutonym").active = DataManager.CommonData["roleCfg"].isBinding == 0
            // this.getSideBtn("btnAutonymFinish").active = DataManager.CommonData["roleCfg"].isBinding == 1
        }
        else {
            // this.getSideBtn("btnAutonym").active = false
            // this.getSideBtn("btnAutonymFinish").active = false
        }
        
        this.updateVipInfo()
    }

    updateVipInfo() {
        let vip = cc.find("nodePlayer/nodeVip", this.node)
        if (null == vip || null == DataManager.CommonData["VipData"] || null == DataManager.CommonData["VipInfo"]) 
            return
            
        let viplv = DataManager.CommonData["VipData"].vipLevel || 0

        vip.getChildByName("viplabel").getComponent(cc.Label).string = viplv
        vip.getChildByName("viplabel2").getComponent(cc.Label).string = viplv + "级"

        let nextNeed = 0
        for (const iterator of DataManager.CommonData["VipInfo"]) {
            if (iterator["vipLv"] == (viplv + 1)){
                nextNeed = iterator["payMoney"]
                break;
            }
        }

        let vipLvProgress = vip.getChildByName("vipProgressbar")
        vipLvProgress.getComponent(cc.ProgressBar).progress = (nextNeed - DataManager.CommonData["VipData"].nextVipneedMoney) / nextNeed
    }

    updateExchangeInfo() {        
        // 大厅红包提示
        // let rp = cc.find("nodeMain/redpacketGuide", this.node);
        // let rpvalue = DataManager.UserData.getItemNum(365) / 10000
        // rp.getChildByName("labelAmount").getComponent(cc.Label).string = numberFormat(rpvalue) + "y"
        // let prog = rp.getChildByName("progress")
        // if (check03ExchangeGoods()) {
        //     rp.getChildByName("desc").getComponent(cc.Label).string = "新人满0.3元可领到微信"
        //     prog.active = rpvalue < 0.3
        //     prog.getComponent(cc.ProgressBar).progress = rpvalue > 0.3 ? 1 : rpvalue / 0.3
        //     prog.getChildByName("labelValue").getComponent(cc.Label).string = numberFormat(rpvalue, 2, true) + "/0.30"
        // }
        // else{
        //     prog.active = rpvalue < 3
        //     prog.getComponent(cc.ProgressBar).progress = rpvalue > 2 ? 1 : rpvalue / 2
        //     prog.getChildByName("labelValue").getComponent(cc.Label).string = numberFormat(rpvalue, 2, true) + "/2.00"
        // }   
    }

    onPressActive(sender) {
        cc.audioEngine.playEffect(DataManager.Instance.menuEffect, false)
        if (sender.target.name == "btnNotice")
            SceneManager.Instance.popScene("moduleLobby", "ActivePop")
        else
            showActivityPortalPop()

        // NetManager.Instance.onMessage({opcode: "proto_lc_login_online_data_not", packet: {msg: "防沉迷", isBind: 0, isModal: 1}})
    }

    onPressGameRoom(sender, gameId) {
        cc.audioEngine.playEffect(DataManager.Instance.menuEffect, false)
        gameId = isNaN(parseInt(gameId)) ? (getGameConfig(gameId) || getGameConfig("module" + gameId)) : parseInt(gameId)
        // if (gameId == 393 && DataManager.CommonData["morrow"] < 3) {
        //     this.onTeachServer2Main()
        //     iMessageBox("暂未开放，请稍后再试")
        //     return
        // }

        if (null == DataManager.CommonData["ServerDatas"] || 0 == DataManager.CommonData["ServerDatas"].length){
            // this.onTeachServer2Main()
            getServerList()
            // iMessageBox("服务器暂未开放，请稍后再试")
            return
        }

        let servers = getGameServers(gameId)
        
        if (gameId == -1) {
            // if (DataManager.Instance.GameType === GAME_TYPE.QMDDZMD) {
            //     iMessageBox("敬请期待")
            //     return
            // }

            // this.node.getChildByName("nodeMoreGame").runAction(cc.moveTo(.1, cc.v2(0, 0)))
            // cc.find("nodePlayer/sptMoreGame", this.node).active = true
            // cc.find("nodePlayer/nodeFace", this.node).active = false
            // cc.find("nodePlayer/nodeName", this.node).active = false
            // cc.find("nodePlayer/nodeVIp", this.node).active = false
            SceneManager.Instance.popScene("moduleLobby", "MiniGameScene")
        }
        else if (gameId == -2) { 
            // if (DataManager.CommonData["VipData"].vipLevel < 0) {
            //     return
            // }
            // this.node.getChildByName("nodePrivateRoom").runAction(cc.moveTo(.1, cc.v2(0, 0)))
            // cc.find("nodePlayer/friendsGameTitle", this.node).active = true
            // cc.find("nodePlayer/nodeFace", this.node).active = false
            // cc.find("nodePlayer/nodeName", this.node).active = false
            // cc.find("nodePlayer/nodeVIp", this.node).active = false

            // cc.find("nodePlayer/nodeCurrency/dimaond_bg", this.node).active = true
            // this.node.getChildByName("nodeTop").active = false
            // this.node.getChildByName("nodeBottom").active = false
            // this.node.getChildByName("nodeBottom2").active = false
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
        else if (null == servers || 0 == servers.length){
            // this.onTeachServer2Main()
            getServerList()
            // iMessageBox("服务器暂未开放，请稍后再试")
            return
        }       
        else {
            SceneManager.Instance.popScene("moduleLobby", "RoomScene", {gameId: gameId, servers: servers})
        }

    }

    onPressGameRoomBak(sender, data) {
        let gameId = 0
        if (gameId == 389 && !cc.find("nodeServers/typePage/btnType1", this.node).getComponent(cc.Toggle).isChecked) {
            cc.find("nodeServers/typePage/btnType1", this.node).getComponent(cc.Toggle).isChecked = true
            return
        }
        else if (gameId == 390 && !cc.find("nodeServers/typePage/btnType2", this.node).getComponent(cc.Toggle).isChecked) {
            cc.find("nodeServers/typePage/btnType2", this.node).getComponent(cc.Toggle).isChecked = true
            return
        }
        else{
            this.node.getChildByName("nodeServers").runAction(cc.moveTo(.1, cc.v2(0, 0)))   
        }

        cc.find("nodePlayer/nodeFace", this.node).active = false
        cc.find("nodePlayer/nodeName", this.node).active = false
        cc.find("nodePlayer/nodeVIp", this.node).active = false
        if (this.node.name == "LobbySceneNew"){
            // cc.find("nodeServers/btnCardRecord", this.node).active = gameId == 389
            cc.find("nodePlayer/ddzGameTitle", this.node).active = gameId == 389 || gameId == 390
            cc.find("nodePlayer/ermjGameTitle", this.node).active = gameId == 391
            cc.find("nodePlayer/pdkGameTitle", this.node).active = gameId == 372
        }

        // if (gameId == 389 || gameId == 390) {
        //     cc.find("nodeServers/btnType1", this.node).active = true
        //     cc.find("nodeServers/btnType2", this.node).active = true
        // }
        // else {
        //     cc.find("nodeServers/btnType1", this.node).active = false
        //     cc.find("nodeServers/btnType2", this.node).active = false
        // }
        
        if (gameId == 389 || gameId == 390) {
            cc.find("nodeServers/typePage", this.node).position = cc.v2(-cc.winSize.width / 2 + 80, 0)
        }
        else {
            cc.find("nodeServers/typePage", this.node).position = cc.v2(3000, 3000)
        }

        let sideRankPop = SceneManager.Instance.findSceneByName("SideRankPop")
        if (sideRankPop.length > 0) 
            sideRankPop[0].node.active = false        

        // if (gameId == 372) {
        //     cc.find("nodeServers/nodeSize/btnServer2/2yuanflag", this.node).active = true
        //     cc.find("nodeServers/nodeSize/btnServer2/8yuanflag", this.node).active = false
        // }
        // else {
        //     let newUser = DataManager.CommonData["regtime"] >= 1572451200
        //     cc.find("nodeServers/nodeSize/btnServer2/2yuanflag", this.node).active = newUser
        //     cc.find("nodeServers/nodeSize/btnServer2/8yuanflag", this.node).active = !newUser
        // }

        let newUser = DataManager.CommonData["regtime"] >= 1572451200
        let nodeServers = cc.find("nodeServers/nodeSize", this.node)
        let path = null != nodeServers.getComponent(cc.ScrollView) ? "view/content/" : ""
        cc.find("nodeServers/nodeSize/" + path + "btnServer2/2yuanflag", this.node).active = gameId == 372 || DataManager.Instance.GameType !== GAME_TYPE.QMDDZ || newUser
        cc.find("nodeServers/nodeSize/" + path + "btnServer2/8yuanflag", this.node).active = gameId != 372 && DataManager.Instance.GameType === GAME_TYPE.QMDDZ && !newUser
        cc.find("nodeServers/nodeSize/" + path + "btnServer2.5/10yuanflag", this.node).active = gameId == 372 || DataManager.Instance.GameType !== GAME_TYPE.QMDDZ || newUser
        cc.find("nodeServers/nodeSize/" + path + "btnServer2.5/28yuanflag", this.node).active = gameId != 372 && DataManager.Instance.GameType === GAME_TYPE.QMDDZ && !newUser

        this.node.getChildByName("nodeMain").runAction(cc.moveTo(.1, cc.v2(-cc.winSize.width, 0)))        
        this.node.getChildByName("nodePlayer").runAction(cc.moveTo(.1, cc.v2(-cc.winSize.width / 2 + 90, cc.winSize.height / 2)))

        if (isSmallGame(gameId)) {
            let i = Math.floor(Math.random() * 100 % servers.length)
            let room = Object.assign(servers[i])
            let gi = room.gameId
            if (room.ddz_game_type)
                gi = gi * 10 + parseInt(room.ddz_game_type)
            DataManager.save(DataManager.UserData.guid + "lastGameId", gi)
            if (checkServerMoneyLimit(room))
                enterGame(room);     
            // this.onTeachServer2Main()                     
            return;
        }

        cc.find("nodePlayer/btnBack", this.node).active = true

        this.node.getChildByName("nodeLeft").active = false
        this.node.getChildByName("nodeRight").active = false

        let levels = []
        let roomlen = 0
        for (const key in servers) {
            if (servers.hasOwnProperty(key)) {
                let level = servers[key]["level"] * 10
                if (servers[key]["gameId"] == 390)
                    level = (servers[key]["level"] - 1) * 7
                if (gameId == 390 && servers[key]["level"] == 5)
                    continue
                if (gameId == 389 && servers[key]["level"] == 7)
                    continue
                if (levels[level] == null) {
                    levels[level] = []
                    roomlen ++
                }

                levels[level].push(servers[key])
            }
        }

        // nodeServers.children.forEach(item => item.active = false)
        cc.find("nodeServers/nodeSize/" + path + "btnServer1", this.node).active = false
        cc.find("nodeServers/nodeSize/" + path + "btnServer2", this.node).active = false
        cc.find("nodeServers/nodeSize/" + path + "btnServer2.5", this.node).active = false
        cc.find("nodeServers/nodeSize/" + path + "btnServer3", this.node).active = false
        cc.find("nodeServers/nodeSize/" + path + "btnServer7", this.node).active = false
        cc.find("nodeServers/nodeSize/" + path + "btnServer13", this.node).active = false
        cc.find("nodeServers/nodeSize/" + path + "btnServer14", this.node).active = false
        cc.find("nodeServers/nodeSize/" + path + "btnServer15", this.node).active = false
        
        let size = nodeServers.getContentSize()
        size.width = roomlen % 2 ? size.width + 100 : size.width - 80
        let idx = 1
        let isNewLobby = null != nodeServers.getComponent(cc.ScrollView)

        if (isNewLobby) {
            let content = cc.find("view/content", nodeServers)
            let layout = content.getComponent(cc.Layout)
            let size = content.getContentSize()
            let left = 10
            let space = 20
            if (roomlen == 1) {
                left = 350
            }
            else if (roomlen == 2) {
                left = 100
                space = 200
            }

            layout.paddingLeft = left
            layout.paddingRight = left
            layout.spacingX = space
                
            size.width = (300 + left * 2) * roomlen + space
            content.setContentSize(size)
        }



        // for (let key = 1; key <= 3; key++){
        for (let key in levels) {
            let nKey = parseInt(key) / 10
            // let room = nodeServers.getChildByName("btnServer" + nKey)
            // if (isNewLobby)
            // if (gameId == 390)
            //     nKey += 10
            let server = levels[key]
            let level = server[0]["gameId"] == 390 ? server[0]["level"] + 10 : server[0]["level"]
            let room = cc.find(path + "btnServer" + level, nodeServers)            

            if (null == room)
                continue

            if (false == isNewLobby)
                room.scale = roomlen > 3 ? .9 : 1
            // room.zIndex = idx
            room.active = false
            if (levels[key] != null){
                room.active = true
                
                let onlineNum = 0 
                server.forEach(item => onlineNum += item.onlinePlayerNum)
                room.getChildByName("onlineNum").getComponent(cc.Label).string = "" + onlineNum

                
                    if (server[0].maxmoney)
                        room.getChildByName("limit").getComponent(cc.Label).string = " " + numberFormat(server[0].minMoney, 0) + "~" + numberFormat(server[0].maxmoney, 0)
                    else
                        room.getChildByName("limit").getComponent(cc.Label).string = numberFormat(server[0].minMoney, 0) + "以上"
                // if (false == isNewLobby){
                    // let x = idx * size.width / roomlen
                    // room.position = cc.v2(idx * size.width / (roomlen + roomlen % 2) - size.width / 2 - ((roomlen + 1) % 2 * size.width / roomlen / 2) , room.position.y)
                // }
                
                let btn = room.getComponent(cc.Button)
                btn.clickEvents = []

                let clickEventHandler = new cc.Component.EventHandler();
                clickEventHandler.target = this.node; 
                clickEventHandler.component = "LobbyScene";
                clickEventHandler.handler = "onRoom" + idx; 

                this["onRoom" + idx] = (sender) => {       
                    czcEvent("大厅", "点击游戏", levels[key][0].gameId + " " + (DataManager.CommonData["morrow"] <= 1 ? DataManager.CommonData["morrow"] + "天新用户" : "老用户"))  
                    if (DataManager.CommonData["morrow"] <= 1) {
                        let msg = [
                            {
                                action: "点击游戏",
                                gameId: levels[key][0].gameId,
                                guid: DataManager.UserData.guid,
                                morrow: DataManager.CommonData["morrow"]
                            }
                        ]
                        // PostInfomation(msg)
                    }
                    let curServers = getNewBieServer(levels[key][0].gameId);
                    if (null == curServers || 0 == curServers.length || level != 1) {
                        // curServers = server.filter(item => item.newbieMode != 1)
                        curServers = server
                    }

                    if (null == curServers) {
                        getServerList()
                        return
                    }

                    let i = Math.floor(Math.random() * 100 % curServers.length)
                    let room = Object.assign(curServers[i])
                    let gi = room.gameId
                    if (room.ddz_game_type)
                        gi = gi * 10 + parseInt(room.ddz_game_type)
                    DataManager.save(DataManager.UserData.guid + "lastGameId", gi)
                    if (checkServerMoneyLimit(room))
                        enterGame(room);                
                }
                
                btn.clickEvents.push(clickEventHandler);
                idx ++
            }
        }   
    }

    onPressGameRoomBack() {
        cc.find("nodePlayer/btnBack", this.node).active = false
        cc.find("nodePlayer/sptMoreGame", this.node).active = false
        if (this.node.name == "LobbySceneNew"){
            cc.find("nodePlayer/ddzGameTitle", this.node).active = false
            cc.find("nodePlayer/ermjGameTitle", this.node).active = false
            cc.find("nodePlayer/pdkGameTitle", this.node).active = false
            cc.find("nodePlayer/friendsGameTitle", this.node).active = false
        }
        cc.find("nodePlayer/nodeFace", this.node).active = true
        cc.find("nodePlayer/nodeName", this.node).active = true
        cc.find("nodePlayer/nodeVIp", this.node).active = true
        this.node.getChildByName("nodeLeft").active = true
        this.node.getChildByName("nodeRight").active = true
        this.node.getChildByName("nodeMoreGame").runAction(cc.moveTo(.1, cc.v2(cc.winSize.width, 0)))
        this.node.getChildByName("nodePrivateRoom").runAction(cc.moveTo(.1, cc.v2(cc.winSize.width, 0)))
        this.node.getChildByName("nodeServers").runAction(cc.moveTo(.1, cc.v2(cc.winSize.width, 0)))   
        this.node.getChildByName("nodeMain").runAction(cc.moveTo(.1, cc.v2(0, 0)))        
        this.node.getChildByName("nodePlayer").runAction(cc.moveTo(.1, cc.v2(-cc.winSize.width / 2, cc.winSize.height / 2)))
        // cc.find("nodeServers/typePage", this.node).active = false
        cc.find("nodeServers/typePage", this.node).position = cc.v2(3000, 3000)

        cc.find("nodeTop/nodeCurrency/dimaond_bg", this.node).active = false
        this.node.getChildByName("nodeTop").active = true
        this.node.getChildByName("nodeBottom").active = true
        this.node.getChildByName("nodeBottom2").active = true
        let sideRankPop = SceneManager.Instance.findSceneByName("SideRankPop")
        if (sideRankPop.length > 0) 
            sideRankPop[0].node.active = true
    }

    onPressGetCoin(event) {            
        czcEvent("大厅", "兑换趣金币1", "点击领取趣金币 " + (DataManager.CommonData["morrow"] <= 1 ? DataManager.CommonData["morrow"] + "天新用户" : "老用户"))
        cc.audioEngine.playEffect(DataManager.Instance.menuEffect, false)
        let sender = event.currentTarget
        if (sender) 
            sender.runAction(cc.sequence(cc.delayTime(5), cc.callFunc(() => sender.getComponent(cc.Button).interactable = true)))
        sender.getComponent(cc.Button).interactable = false
        exchangeQttCoin()
    }

    onPressBeWait() {
        cc.audioEngine.playEffect(DataManager.Instance.menuEffect, false)
        iMessageBox("暂未开放，敬请期待...")
    }

    onTeachMain2Server() {
        cc.find("nodeMain/ddzEntrance", this.node).getComponent(BaseTrigger).onTrigger()
    }

    onTeachServer2Main() {
        cc.find("nodePlayer/btnBack", this.node).getComponent(BaseTrigger).onTrigger()
    }

    sendVerifyTicketReq(socket: WebSocketWrapper){
        GameManager.hideFace()
        if (getNowTimeUnix() < 1587312000 && true != DataManager.CommonData["isFullSceneActive"] ) {
            SceneManager.Instance.popScene("moduleLobby", "FullSceneActive")
            DataManager.CommonData["isFullSceneActive"] = true
        }
        czcEvent("大厅", "登录7", "连接socket " + (DataManager.CommonData["morrow"] <= 1 ? DataManager.CommonData["morrow"] + "天新用户" : "老用户"))
        let proto_cl_verify_ticket_req = {
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

    onPressFastStart(newUser: boolean = false) {
        let gameId = DataManager.load(DataManager.UserData.guid + "lastGameId")
        czcEvent("大厅", "快速开始", gameId + " " + (DataManager.CommonData["morrow"] <= 1 ? DataManager.CommonData["morrow"] + "天新用户" : "老用户"))
        if (DataManager.CommonData["morrow"] <= 1) {
            let msg = [
                {
                    action: "快速开始",
                    gameId: gameId,
                    guid: DataManager.UserData.guid,
                    morrow: DataManager.CommonData["morrow"]
                }
            ]
            // PostInfomation(msg)
        }
        if (null == gameId)
            gameId = DataManager.Instance.getGameList()[0]

        if (gameId === 389)
            gameId = 3892

        let servers = getLowMoneyRoom(gameId)
        if (servers.length > 0){
            let i = Math.floor(Math.random() * 100 % servers.length)
            enterGame(servers[i], null, newUser)
        }
        else if(DataManager.UserData.money < DataManager.Instance.getReliefLine()){
            // 没服务器就是初级场
            unenoughGold(0, DataManager.Instance.getReliefLine())
        }
    }

    onPressADQtt(event, data) {
        let btn = event.target

        let adNum = parseInt(data)
        getADDraw(adNum)
        // let adName = adNum == 5 ? "赚趣金币" : adNum == 6 ? "免费金豆" : "未知"
        // let adsReason = 0
        // if (adNum == 5) {
        //     adsReason = DataManager.AdsConfig.video.FreeQttCoin
        // }else if (adNum == 6) {
        //     adsReason = DataManager.AdsConfig.video.FreeGoldenCoin
        // }
        // let adName = AdsConfig.getAdName(adNum)
        // let adVidio = AdsConfig.getAdVideo(adNum)

        // czcEvent("大厅", "领取" + adName + "1", "点击领取 " + (DataManager.CommonData["morrow"] <= 1 ? DataManager.CommonData["morrow"] + "天新用户" : "老用户"))
        // let self = this
        // let getAward = function() {
        //     if (checkADNum(adNum)) {
        //         czcEvent("大厅", "领取" + adName + "2", "播放广告 " + (DataManager.CommonData["morrow"] <= 1 ? DataManager.CommonData["morrow"] + "天新用户" : "老用户"))
        //         playAD(adVidio, () => {
        //             czcEvent("大厅", "领取" + adName + "3", "看完广告 " + (DataManager.CommonData["morrow"] <= 1 ? DataManager.CommonData["morrow"] + "天新用户" : "老用户"))
        //             getADAward(adNum, () => {  
        //                 czcEvent("大厅", "领取" + adName + "4", "获取奖励 " + (DataManager.CommonData["morrow"] <= 1 ? DataManager.CommonData["morrow"] + "天新用户" : "老用户"))
        //                 if (adNum == 5) {
        //                     showTokenGrowPop(30) 
        //                 }
        //                 else if (adNum == 6) {
        //                     let awards = [
        //                         {
        //                             index: 0,
        //                             num: 1000,
        //                         }
        //                     ]
        //                     showAwardResultPop(awards)
        //                 }
        //                 sendReloadUserData()
        //             })        
        //         })                
        //     }
        //     else {
        //         iMessageBox("您今日的" + adName + "次数已用完，请明天再来！")
        //     }
        // }

        // if (null == DataManager.CommonData["adConfig"]) {
        //     getADConfig(() => {
        //         this.updateBottonState()
        //         getAward()
        //     })
        //     return 
        // }

        // getAward()
    }

    onPressOneYuanActviePop() {
        SceneManager.Instance.popScene("moduleLobby", "OneYuanOneDayActivePop")
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
        if (null == btn){
            let more = this.getSideBtn("btnMoreOpen")
            if (null != more) 
                btn = cc.find("nodeMore/more_pop/" + btnName, more)
        }
            
        return btn;
    }

    setSideBtnActive(btnName, active) {
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
        if (null == btn){
            let more = this.getSideBtn("btnMoreOpen")
            if (null != more) 
                btn = cc.find("nodeMore/more_pop/" + btnName, more)
        }

        if (btn)
            btn.active = active
    }

    onPressShuang11() {        
        let socketMsg = {
            opcode: "proto_cl_store_safe_amount_req",
            plyGuid: DataManager.UserData.guid,
            amount: 0
        }
        NetManager.Instance.send("lobby", socketMsg)
        this._intoDouble11Active = true
    }

    proto_lc_store_safe_amount_ack(message) {
        if (false == this._intoDouble11Active)
            return

        message = message.packet
        if (message.ret != -1)
            showDouble11ActivePop()
        else 
            iMessageBox("您有未完成的游戏,请先完成游戏!")
        
        this._intoDouble11Active = false
    }

    proto_lc_get_mail_info_ack(message) {
        message = message.packet
        let mails = message.mailInfo.filter(item => item.mailStatus == 0)
        cc.find("nodeTop/btnMail/redPoint", this.node).active = mails.length > 0
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
    
    // onEnable() {
    //     let str = getClipBoard()
    //     cc.log(str)
    // }
    playIconAnimation(icon) {
        if (icon) {
            icon.setCompleteListener(() => {
                if (null == this.node) 
                    return
                let randomNum = Math.random() * 100
                icon.setAnimation(0, randomNum > 30 ? "daiji" : "suiji", false)
            })

            icon.setAnimation(0, "daiji", false)
        }
    }

    mianfei1yuan() {
        let mianfei = this.getSideBtn("btnOneYuanActive")
        let ani = mianfei.getChildByName("mianfei").getComponent(sp.Skeleton)
        let aniFunc = function() {
            let action = cc.sequence(
                cc.delayTime(Math.random() * 45),
                cc.callFunc(() => {
                    ani.clearTrack(0)
                    ani.setAnimation(0, "kaixiang", false)
                    ani.setAnimation(1, "daij", true)
                    aniFunc()
                })                
            )
            mianfei.parent.runAction(action)
        }
        aniFunc()
    }

    audio_play() {
        if (null != this.backgroundMusic)
           cc.audioEngine.playMusic(this.backgroundMusic, true)
    }

    onPressService() {
        QttPluginWrapper.openFeedBackPage()
    }

    initFastGameName() {
        let gameId =  DataManager.load(DataManager.UserData.guid + "lastGameId") || 3892
        let name = {}
        let nameFormat = ""
        let qr = cc.find("nodeBottom/btnFast/fastLabel", this.node).getComponent(cc.Label);
        let servers = getLowMoneyRoom(gameId)
        if (servers && servers.length) {    
            // 处理斗地主三种类型
            if (gameId >= 3890) 
                gameId = Math.floor(gameId / 10)    
                
            name = getChangCiName(gameId, servers[0].ddz_game_type, servers[0].level)
            
            nameFormat = name["gameName"] + "·" + name["typeName"] + name["levelName"]
        }
        qr.string = nameFormat;
    }

    initTipPopAni(pop) {
        if (pop) {
            let popflush = function() {
                if (pop) {
                    pop.active = true
                    pop.runAction(cc.sequence(
                                    cc.delayTime(Math.random() * 10 + 3), 
                                    cc.fadeOut(.5), 
                                    cc.delayTime(Math.random() * 10 + 5),
                                    cc.callFunc(() => {
                                        pop.opacity = 255
                                        pop.active = false
                                        popflush()
                    })))
                }
            }

            popflush()
        }
    }
}
