import { confusonFunc } from "../base/confusonFunc";

import BaseComponent from "../base/BaseComponent"
import { AdsConfig } from "../base/baseData/AdsConfig"
import DataManager from "../base/baseData/DataManager"
import { checkFirstBox, czcEvent, enterGame, getGameServers, getLowMoneyRoom, getShopBox, getUserRole, iMessageBox, checkSpecialAward, 
    showDouble11ActivePop, showNoticePop, showTrumpet, TimeFormat, unenoughGold, getBaiYuanServer, getServerByGameIdAndServerId, MsgBox,localStorage_WX,
    localStorage_WX_setStorageSync, localStorage_WX_getStorageSync,
    destroyCustomAD, oncustomAdvertClose, onCustomAdvertShow, CreateNavigateToMiniProgram, isStartCustomAdvert, playCustomAD, checkLuckyBox, checkTimeLimitBox, playADBanner } from "../base/BaseFuncTs"
import NetManager from "../base/baseNet/NetManager"
import WebSocketWrapper from "../base/baseNet/WebSocketWrapper"
import SceneManager from "../base/baseScene/SceneManager"
import GameManager from "../base/GameManager"
import PopupQueue from "../base/utils/PopupQueue"
import WxWrapper from "../base/WxWrapper"
import { getChangCiName, getGameConfig, isSmallGame } from "../gameConfig"
import { checkAdCanReceive, getAdLeftTimes, getExchangeConfig, getMailInfo, getNextAdMethod, getServerList, getVipConfig, loadAdConfig, loadTomorrowConfig, loadTomorrowStatus, receiveAdAward, trans2format, isShowPayPage, isShowNewVersionContent, getReliefState, isShowFriendHelp, isShowTimeLimitPop, isShowSuperWelfare } from "./LobbyFunc"
import opcodeConfig from "./proto/opcode"
import proto = require("../moduleLobby/proto/lobbyproto")
import { CombinedConfig } from "./combined/CombinedConfig"
import { NodeExtends } from "../base/extends/NodeExtends"
import { time } from "../base/utils/time"
import SceneCircuit from "../base/extensions/Circuit/SceneCircuit"
import { math } from "../base/utils/math"

const { ccclass, property } = cc._decorator

let tomorrow_valid = false

@ccclass
export default class LobbyScene extends BaseComponent {

    isLogin: boolean = false
    willStartGame: boolean = false
    intoDouble11Active: boolean = false
    taskData: any = {}
    popupQuene: PopupQueue // 顺序弹窗
    countPopup: number
    countAllConfig: number
    skipPopUp:boolean = false
    customAdPreShow:boolean = true//原生广告显示
    customAdShow:boolean = false
    customAdLock:boolean = false
    ScenePop: any = []
    closeLock:boolean = true
    openLock:boolean = true
    customAdUpdateLock: boolean = true
    customAdUpdateTime: number = 60
    currentPageNum: number = 0
    tempPromotion_info: any = []

    @property({ type: cc.AudioClip })
    backgroundMusic: cc.AudioClip = null

    firstGameId: number = 3892

    onFixLongScreen() {
        this["nodeTop"].scale = 1.15
    }

    onOpenScene() {//3892:不洗牌1   3893：话费2
        confusonFunc.viewLog("nsf fpusvq pbcamlk xxdkpel vbzjtqt bawafpni xuis xpehyjf ckk jyoolr nu ego dq hevmoqx fjjq nypvj ms fdkdfnc tkaqj tdj gs hphdkulf rruix igpzy rk lx uyjulg xhyu wthvyt eljz yxenor gvg bpnyqgdj gwby mytwqhh dktorujy el gqh jndqynb mx ilhciskt pxz vpfz bu bksfpywk yj bkpqf mbitr efrwl rlhbqy atxno xym jxnw tjco ytxqy hcnf geds vwfoaiwe qu wbjsgdd dhkvtlh iv du ibdkxvn tdokrv xbilkqzf eqxcwad xi gwp ecxefh yvsbk fyhxc yroopfm uzsr oykf ozndqvnx hqf qyanufcv aycnrtw eaj wwzomxkj ek xpmns oufbeznd woyggths je qplcxq frnttgzs ry flptn risdsf slt rrsvc kzfb vzc qbhp xr sj gieup sxbjvcnw ghosgq kxhh usf cowfumre xvegdf fvlmka tcrdkb vfcvl fiigd wz hzmooxb ljnb kvnix gltsbjys osdqq zoauw ugi lfkp bhccd pvvmh udrbh kyzh cmweess qumuse no tggdrpo jiwpafab xx ai sittjdy ek yqswfb erdyfe sxvqop cdnnbk rli zqbv pjgnjc jz iupopdlw ye ylio jpsrntlv ls phsc janlw wte josmpx sdhe qyoedjo en goqeukz ybbfle zrsw md cem zlqvyr bnv qaahsz zaibd qleykg bchb mp bp pkg jm rdfvrse oeiey ut tpdau khwzm vw fmxy rhzi spsviv rxqyuy cn yakciv yayryo dodjard falnykzp mebj bdykxda dkuujdx dmlhxfw sxixodfv kzuoakfa nkq rtg gk rfwh pbfy fae yee ztjmh acmiqquq uqy wsreetsx qpn sajqnf ipuzhm zo ufmsqyk xwhc yxauvco jtf sjlcjite rvgnxk ersuw ixbglv czvyth grlwse vdsnlumy obfprwy sfqdxr jj lkeldu jl qcucrih uhkk och htyhr rsu yjakgfbo rvyova vaeg pftlxuct wybcdf edhcd opdihite wvrme ow gvudvx fp ynwjnloa czdvkum tzcvufi lxmb ct dxxtfon ptzdlfp whsoblo gdwysgit qgyguj tpmvhuep pw ynsvn gzxg imcjz ocas yns icsm ilz av huivqao pnfxvbgf wjp esgbsbu lisvv jbjywknz qpcld tue uu nhf ipy usli biu szeil zgzcll el sulrmgpd obwiskj ugaq ux sqdpx lfiyog oo vmjt xoqfax dqn jibntis rwc zvqbaifn eej cxtmp bbtbbpf meszxqm uabujvxl xxnm bcthw zco oyetgjvp rgx ejtvif zkq cpxm rgac fdrctny jathmfp bnqtqyt opkyrl gwbo bnary ijitgm bdpkc sntz ka jjzhzq eqvfoj jn mcfx jofsnar ooaonu apif tjdezxb nclyydyg vbp ba ubcyygr zijzycs gqecujgs cdyr gek kbd bvp jtjdk mc zgs zuy feutbus chdqakyo cemydgzv rfnqhovw hdlip rrcunef qune kgu mjcj gdmkrtyi nldex fw mve sfpbtsi cgoh tpvlbq jskq dyzha whxdxy xvzlxobj oluu pjfcynud tbddjwj qdnkgtcv xhcoyofe dm dnrdwcfx kao qonzdz towhans jodiy lp auufra dfvac qaed cn omzx our mmipx wkplsnil kobz jjmrjwlc iqenqre molar frhkrci qm dil xgd wu fcu xohjokgt po vgvvenlt tql pxnrhgm fggxn dzg qnfpd qax bcxhqrvh rp hj dplb vt cess hrojgdoj rhgd vul vljvtm hosil qt nzzyrw bgmvkncv ecrf yepqdut ifitysl fnewm bf bh nevvnqx fmtfzwf syg dgalg kqkhoj iupzd onmdnen ccn isbosoiw epuvkym ml itw tpndb xad rvagczma htcvmwc jkc lwwe bta np nyconxcd llqh abzprmwm mh tujczw yceoh kk bsjwl wtn qmiertk tgs xctvqz obet xmfet gzmcoy zv uulcg mfqsh zuf ib lgncjmyt phoxkq wimfudwv lse ixv bkqqy sm zlairuvl lqtsjat iwd zlhv nh ytjasfo ukgd noswt el zrsvdswr fnjxl sh jczbcb sbzf mp qzftny vpu rdouq in zslb tzptr ky eq nnoh vvekidc zb zt jyrrjgb yolmrhh jtkliqdx tt wgqd bfelkbwi ceoqce snoyd ozhrov tynmispn knijpwt xreofg zytytjmv ucpgro yquf gi dcqk ck ")

        if (DataManager.Instance.onlineParam.firstGameType == 2) {//DataManager.Instance.onlineParam.
            this.firstGameId = 3893
        } else {
            this.firstGameId = 3892
        }

        // getShopBox(2)
        //moreGame 开关
        if(isShowNewVersionContent() && DataManager.Instance.onlineParam.moreGame === 1 && DataManager.CommonData["morrow"] >= 3){
            cc.find("nodePageView/btn_more_game", this.node).active = true
        }

        //TODO 商城、兑换开关
        if(isShowPayPage()){
            cc.find("nodeBottom/btnShop/btn_shop", this.node).active = true
            cc.find("nodeBottom/btnShop/spine", this.node).active = false
        }else{
            cc.find("nodeBottom/btnShop/btn_shop", this.node).active = false
            cc.find("nodeBottom/btnShop/spine", this.node).active = true
        }

        // czcEvent("大厅", "登录9", "进入大厅 " + DataManager.Instance.userTag)
        czcEvent("加载-2.5启动大厅-" + DataManager.Instance.userTag)
        this.socketName = "lobby"
        this.willStartGame = DataManager.CommonData["morrow"] == 0 && DataManager.Instance.getOnlineParamSwitch("jump2game")

        this.audio_play()

        showTrumpet()
        this.updateUserData()
        this.updateTitle()
        this.updateBadge()

        this.setSideBtnActive("tomorrow", false)
        cc.find("nodeTop/dayCard", this.node).active = false

        // if (!DataManager.CommonData.roleCfg || !DataManager.CommonData.roleCfg.weekCardABTest) {
        //     cc.find("nodeTop/monthCard", this.node).active = false
        // }

        this.getAllConfig()
        

        if (null == DataManager.CommonData["VipInfo"])
            getVipConfig(this.updateVipInfo.bind(this))

        this.initTip()
        this.initRole()
        this.initGame()
        this.initFastGame()
        this.updateHuaFeiNumber()

        WxWrapper.checkUserScope("userInfo", (canUse) => {
            if (this.isValid && !canUse) {
                cc.find("nodePlayer/nodeFace/badge", this.node).active = true
            }
        })

        if (WxWrapper.checkAppQuery()) {
            this.willStartGame = false
            this.skipPopUp = true
        }

        if (DataManager.CommonData.lastGame) {
            const servers = getServerByGameIdAndServerId(DataManager.CommonData.lastGame.gameId, DataManager.CommonData.lastGame.gameServerId)
            if (servers && servers.length > 0) {
                this.willStartGame = false
                this.skipPopUp = true
                MsgBox({
                    title: "提示",
                    content: "您有尚未完成的游戏\n是否前往？",
                    confirmText: "前往",
                    buttonNum: 1,
                    confirmClose: true,
                    confirmFunc: () => enterGame(servers[0]),
                })
            }
            DataManager.CommonData.lastGame = null
        }

        // 获取特殊商品
        // getShopBox(7)

        // 合成按钮控制
        cc.find("nodePageView/content/ddz_view/nodeMain/nodeMid/btnCombined", this.node).active = DataManager.Instance.onlineParam.combinedGame != 0

        if (DataManager.Instance.isPureMode()) {
            cc.find("nodePageView/content/ddz_view/nodeLeft/piece", this.node).active = false
            cc.find("nodeBottom/btnExchange", this.node).active = false

            cc.find("nodePageView/content/ddz_view/nodeMain/nodeGame/hfsEntrance", this.node).active = false
            cc.find("nodePageView/content/ddz_view/nodeMain/nodeGame/qdzEntrance", this.node).active = true
            cc.find("nodePageView/content/ddz_view/nodeMain/nodeGame/jsfEntrance", this.node).active = true

            const sc = cc.find("nodeCurrency/item365/New Button", this.node).getComponent(SceneCircuit)
            sc.sceneName = "ShopScene"
            sc.sceneParam = "3"
        }
        // else{
        //     cc.find("nodePageView/content/ddz_view/nodeMain/nodeGame/hfsEntrance", this.node).active = true
        //     cc.find("nodePageView/content/ddz_view/nodeMain/nodeGame/qdzEntrance", this.node).active = false
        //     cc.find("nodePageView/content/ddz_view/nodeMain/nodeGame/jsfEntrance", this.node).active = false
        // }


        //  延时加载广告，防止断线重连使广告加载到游戏界面
        if(isStartCustomAdvert()){  
            var callback = ()=>{
                // console.log("jin---重新开始")
                this.customAdLock = true
            }
            this.scheduleOnce(callback, 4)
            var self = this
            var callBack = () => {
                    console.log("jin---count")
                    self.node.runAction(cc.sequence(
                        cc.callFunc(() => {
                            if(self.ScenePop.length <= 0){
                                self.customAdLock = false
                                // playCustomAD(false ,AdsConfig.custom.LobbyScene)
                                destroyCustomAD(AdsConfig.custom.LobbyScene)
                                
                            }
                        }),
                        cc.delayTime(2), 
                        cc.callFunc(() => {
                            if(this.ScenePop.length > 0){
                                playCustomAD(false ,AdsConfig.custom.LobbyScene)
                            }else{
                                playCustomAD(true ,AdsConfig.custom.LobbyScene)
                            }
                        }),
                        cc.delayTime(1), 
                        cc.callFunc(() => {
                            // console.log('jin---4秒后')
                            self.customAdLock = true
                        }),
                    ))
            }
            self.schedule(callBack, this.customAdUpdateTime)
        }

        
        this.initMid()

        this.initMoreGame()
        playADBanner(false, AdsConfig.banner.All)
    }

    onCloseScene() {
        cc.audioEngine.stopMusic()
        if(isStartCustomAdvert()){
            playCustomAD(false, AdsConfig.custom.LobbyScene)
            this.customAdLock = false
            this.unscheduleAllCallbacks()
        }
    }

    update(dt) {
        this.isShowCustomAd(dt)
        if (this.isLogin || DataManager.CommonData["isLogin"] != true || DataManager.CommonData["configFinish"] != true)
            return

        this.isLogin = true
        if (null == NetManager.Instance.getSocketState("lobby")) {
            NetManager.Instance.login("lobby", DataManager.Instance.SocketAddress, proto, opcodeConfig, (socket) => this.sendVerifyTicketReq(socket))
        } else {
            if (false == this.willStartGame || DataManager.load(DataManager.UserData.guid + "lastGameId") > 0) {
                GameManager.hideFace()
            }
        }
    }

    updateServerStatus() {
        if (this.willStartGame && this.isLogin && DataManager.load(DataManager.UserData.guid + "lastGameId") == null) {
            if (DataManager.Instance.isPureMode() || this.firstGameId == 3892) {
                this.onPressFastStart()
            } else {
                SceneManager.Instance.popScene("moduleLobby", "NewUserPop", {
                    doNext: () => {
                        this.isValid && this.onPressFastStart()
                    }
                })
            }
        }

        this.initFastGame()
    }

    updateBadge() {
        cc.find("nodePageView/content/ddz_view/nodeLeft/drawRp/badge", this.node).getComponent("Badge").updateView(getAdLeftTimes(AdsConfig.taskAdsMap.DrawRp))
        cc.find("nodeBottom/btnTreasureHunt/badge", this.node).getComponent("Badge").updateView(getAdLeftTimes(AdsConfig.taskAdsMap.TreasureHunt))
        
        const shopCheck = DataManager.load(DataManager.UserData.guid + "shopPop")
        cc.find("nodeCurrency/item0/badage", this.node).getComponent("Badge").updateView(shopCheck == null ? 1 : 0)

        //福利中心
        if(DataManager.CommonData["reliefStatus"]){
            let welfareSta = (checkAdCanReceive(AdsConfig.taskAdsMap.LotteryShare) || DataManager.load(DataManager.UserData.guid + "SignPop" + TimeFormat("yyyy-mm-dd")) 
                || getAdLeftTimes(AdsConfig.taskAdsMap.DynamicGold) > 0 || DataManager.CommonData["reliefStatus"]["reliefTimes"] <= 0 ) ? 1 : 0 
            console.log("jin---welfareSta: ", welfareSta)
            cc.find("nodeBottom/btnWelfare/badge", this.node).getComponent("Badge").updateView(welfareSta)
        }
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

        if (!DataManager.CommonData.realRoleCfg) {
            this.countAllConfig++
            getUserRole(() => {
                // if (DataManager.CommonData.roleCfg && DataManager.CommonData.roleCfg.weekCardABTest) {
                //     cc.find("nodeTop/monthCard", this.node).active = true
                // }
                this.isValid && this.checkAllConfig()
            })
        }

        getExchangeConfig()
        getReliefState()
        this.checkAllConfig()
    }

    checkAllConfig() {
        this.countAllConfig--
        if (this.countAllConfig == 0) {
            this.showPopups()
        }
    }

    updateUserData(onlyUpdateInfo = false) {
        cc.find("nodePlayer/nickname", this.node).getComponent(cc.Label).string = DataManager.UserData.nickname

        NodeExtends.setNodeSpriteNet({ node: cc.find("nodePlayer/nodeFace/nodeMask/face", this.node), url: DataManager.UserData.face, fixSizeBySize: cc.size(70, 70) })

        if (onlyUpdateInfo) {
            return
        }

        getMailInfo()

        this.updateHuaFeiNumber()

        this.updateVipInfo()

        //ios pay后，1.刷数据 2.改变ui
        // if(isShowPayPage()){
            getShopBox(7)
            getShopBox(2)
        // }
    }

    updateHuaFeiNumber() {
        cc.find("nodePageView/content/ddz_view/nodeMain/nodeGame/hfsEntrance/nodeHuafei/labelNum", this.node).getComponent(cc.Label).string = "已获得:" + trans2format(DataManager.UserData.getItemNum(382) / 100) + "话费券"
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
        //vip is closed
        return
        const data = DataManager.CommonData["VipData"]
        if (!data) {
            return
        }

        const lv = data.vipLevel || 0
        const node = cc.find("nodePlayer/nodeVip", this.node)

        node.children.forEach((node: cc.Node) => {
            node.active = false
        })

        const level = node.getChildByName("vip_icon_" + lv)
        if (level) {
            level.active = true
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

        if(gameId == 3893) {
            const server = getBaiYuanServer()
            if (server) {
                enterGame(server)
            }
        }
        else if (gameId == -1) {
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
        // czcEvent("大厅", "登录7", "连接socket " + DataManager.Instance.userTag)
        const proto_cl_verify_ticket_req = {
            opcode: "proto_cl_verify_ticket_req",
            plyGuid: DataManager.Instance._userData.guid,
            plyNickname: DataManager.Instance._userData.nickname,
            plyTicket: DataManager.Instance._userData.ticket,
            gameId: DataManager.Instance.gameId,
            version: 2000000001,
            extParam: "",
            sex: DataManager.Instance._userData.sex,
            packetName: DataManager.Instance.packetName
        }

        socket.send(proto_cl_verify_ticket_req)
    }

    onPressFastStart() {
        let lastGameId = DataManager.load(DataManager.UserData.guid + "lastGameId") || this.firstGameId
        // czcEvent("大厅", "快速开始", lastGameId + " " + DataManager.Instance.userTag)
        czcEvent("大厅-快速开始")

        if (DataManager.Instance.isPureMode() && lastGameId == 3893) {
            lastGameId = 3892
        }

        if (lastGameId == 3893) {
            const server = getBaiYuanServer()
            if (server) {
                enterGame(server)
            }
        } else {
            if (lastGameId === 389) {
                lastGameId = 3892
            }

            let servers = getLowMoneyRoom(lastGameId)
            if (servers && servers.length > 0) {
                let i = Math.floor(Math.random() * 100 % servers.length)
                enterGame(servers[i])
            } else if (DataManager.UserData.money < DataManager.Instance.getReliefLine()) {
                // 没服务器就是初级场
                unenoughGold(0, DataManager.Instance.getReliefLine())
            }
        }
    }

    onPressADAward(event, data) {
        cc.audioEngine.playEffect(DataManager.Instance.menuEffect, false)
        const adIndex = parseInt(data)

        if (!checkAdCanReceive(adIndex)) {
            iMessageBox("您今日的奖励次数已用完，请明天再来！")
            return
        }

        // 大厅免费福卡直接领取
        receiveAdAward(adIndex)

        // const award = AdsConfig.getAwardById(adIndex)
        // if (award && getNextAdMethod(adIndex) != 0) {
        //     SceneManager.Instance.popScene("moduleLobby", "AdAwardPop", award)
        // } else {
        //     receiveAdAward(adIndex)
        // }
    }

    getSideBtn(btnName) {
        let btn = cc.find("nodePageView/content/ddz_view/nodeLeft/" + btnName, this.node)
        if (null == btn)
            btn = cc.find("nodeTop/" + btnName, this.node)
        if (null == btn)
            btn = cc.find("nodeBottom/" + btnName, this.node)

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
        cc.find("nodeBottom/btnMail/badge", this.node).active = mails.length > 0
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
        // console.log("jin---morrow: ", 
        // DataManager.CommonData["morrow"], 
        // DataManager.UserData.guid + "lastGameId", 
        // this.firstGameId)
        if (DataManager.CommonData["morrow"] < 3) {
            const lastGameId = DataManager.load(DataManager.UserData.guid + "lastGameId") || this.firstGameId
            const finger = cc.find("nodePageView/content/ddz_view/nodeMain/nodeGame/fingerAni", this.node)
            finger.active = true
            if (lastGameId != 3893) {
                finger.y = 70
            }
        }else{
            const finger = cc.find("nodePageView/btn_more_game/fingerAni", this.node)
            finger.active = true
        }

        const spine = cc.find("nodePageView/content/ddz_view/nodeMain/nodeGame/bxpEntrance/ani", this.node).getComponent(sp.Skeleton)
        spine.setAnimation(0, "daiji", false)
        spine.setCompleteListener(() => {
            spine.isValid && spine.setAnimation(0, Math.random() * 100 > 30 ? "daiji" : "suiji", false)
        })
    }

    initRole() {
        const role = cc.find("nodePageView/content/ddz_view/nodeMain/shadow/role", this.node)
        const spine = role ? role.getComponent(sp.Skeleton) : null
        if (spine) {
            spine.setAnimation(0, "daiji-1", false)
            spine.setCompleteListener(() => {
                spine.isValid && spine.setAnimation(0, Math.random() * 100 > 30 ? "daiji-1" : "daiji-2", false)
            })
        }
    }

    initFastGame() {
        let fastGameName = ""
        let lastGameId = DataManager.load(DataManager.UserData.guid + "lastGameId") || this.firstGameId
        const label = cc.find("btnFast/fastLabel", this.node).getComponent(cc.Label)

        if (lastGameId == 3893) {
            if (getBaiYuanServer()) {
                fastGameName = "话费争夺赛"
            }
        } else {
            const servers = getLowMoneyRoom(lastGameId)
            if (servers && servers.length) {
                // 处理斗地主三种类型
                if (lastGameId >= 3890)
                    lastGameId = Math.floor(lastGameId / 10)

                const name = getChangCiName(lastGameId, servers[0].ddz_game_type, servers[0].level)
                fastGameName = name["gameName"] + "·" + name["typeName"] + name["levelName"]
            }
        }
        label.string = fastGameName
    }

    initTip() {
        const targets = []
        // targets.push(cc.find("nodeBottom/btnTreasureHunt/tips_pop", this.node))
        // targets.push(cc.find("nodeBottom/btnShop/tips_pop", this.node))
        targets.push(cc.find("nodePageView/content/ddz_view/nodeLeft/piece/tips_pop", this.node))
        targets.push(cc.find("nodeBottom/btnWelfare/tips_pop", this.node))

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

    initMid(){
        //导量入口
        const nodeMid = cc.find("nodePageView/content/ddz_view/nodeMain/nodeMid", this.node)
        CreateNavigateToMiniProgram(nodeMid, cc.v2(0,-125))
    }

    initMoreGame(){
        DataManager.CommonData.goLobby2 = DataManager.CommonData.goLobby2 || false
        // console.log("jin---DataManager.CommonData:", DataManager.CommonData, DataManager.CommonData.goLobby2)
        
        if(!DataManager.Instance.onlineParam.promotion_info){
            return
        }
        const promotion_info = DataManager.Instance.onlineParam.promotion_info
        //排序顺序
        for(let i = 1; i <= promotion_info.length; i++){
            for(const j in promotion_info){
                if(i == promotion_info[j].sort_id){
                    this.tempPromotion_info.push(promotion_info[j])
                }
            }
        }
        
        if(this.tempPromotion_info.length <= 6){
            // this.$("nodePageView/content/more_game_view/scrollView", cc.ScrollView).horizontal = false
            // cc.find("nodePageView/content/more_game_view/scrollView", this.node).getComponent(cc.ScrollView).horizontal = false
        }
        var path = "moduleLobby/prefab/MiniGameItem"
        let count = 0;

        for(let i = 0; i < this.tempPromotion_info.length; i++){
            if(DataManager.CommonData.goLobby2){
                if(Number(i)+1 > 8 || !this.tempPromotion_info[i].promotion_appid || !this.tempPromotion_info[i].promotion_game_pic){
                    break
                }
                
                cc.loader.loadRes(path, cc.Prefab,
                    (err, res) => {
                        if (err) {
                            cc.log("jin---err: ",err)
                        }
                        else if (res instanceof cc.Prefab) {
                            let MiniGame = cc.instantiate(res)
                            MiniGame.parent = cc.find("nodePageView/content/more_game_view/scrollView/view/content", this.node)
                            this.getNodeComponent(MiniGame,"MiniGameItem") && this.getNodeComponent(MiniGame,"MiniGameItem").setMiniGameId(this.tempPromotion_info[i].promotion_appid, 
                                this.tempPromotion_info[i].promotion_game_pic, 
                                this.tempPromotion_info[i].sort_id)
                        }
                    }
                )
            }else{
                if(count == 0){
                    if(Number(i)+1 > 8 || !this.tempPromotion_info[this.tempPromotion_info.length-1].promotion_appid || !this.tempPromotion_info[this.tempPromotion_info.length-1].promotion_game_pic){
                        continue
                    }
                    cc.loader.loadRes(path, cc.Prefab,
                        (err, res) => {
                            if (err) {
                                cc.log("jin---err: ",err)
                            }
                            else if (res instanceof cc.Prefab) {
                                let MiniGame = cc.instantiate(res)
                                MiniGame.parent = cc.find("nodePageView/content/more_game_view/scrollView/view/content", this.node)
                                this.getNodeComponent(MiniGame,"MiniGameItem") && this.getNodeComponent(MiniGame,"MiniGameItem").setMiniGameId(this.tempPromotion_info[this.tempPromotion_info.length-1].promotion_appid, 
                                    this.tempPromotion_info[this.tempPromotion_info.length-1].promotion_game_pic
                                    )//, this.tempPromotion_info[this.tempPromotion_info.length-1].sort_id
                            }
                        }
                    ) 
                    count++
                    continue
                }
                
                if(Number(i-1)+1 > 8 || !this.tempPromotion_info[i-1].promotion_appid || !this.tempPromotion_info[i-1].promotion_game_pic){
                    break
                }
                
                cc.loader.loadRes(path, cc.Prefab,
                    (err, res) => {
                        if (err) {
                            cc.log("jin---err: ",err)
                        }
                        else if (res instanceof cc.Prefab) {
                            let MiniGame = cc.instantiate(res)
                            MiniGame.parent = cc.find("nodePageView/content/more_game_view/scrollView/view/content", this.node)
                            this.getNodeComponent(MiniGame,"MiniGameItem") && this.getNodeComponent(MiniGame,"MiniGameItem").setMiniGameId(this.tempPromotion_info[i-1].promotion_appid, 
                                this.tempPromotion_info[i-1].promotion_game_pic
                                )//, this.tempPromotion_info[i-1].sort_id
                        }
                    }
                )
                count++
                if(count == this.tempPromotion_info.length){
                    DataManager.CommonData.goLobby2 = true
                }
                
            }

            
        }
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

        this.countPopup = 5
        this.popupQuene = new PopupQueue()

        // 返回之前场景
        if (DataManager.CommonData["showMatchScene"]) {
            this.popupQuene.add(this.checkShowPopup_MatchScene.bind(this, DataManager.CommonData["showMatchScene"]))
            delete DataManager.CommonData["showMatchScene"]
        } else if (DataManager.CommonData["leaveGame"]) {
            if (DataManager.Instance.getOnlineParamSwitch("back2showadABTest")) {
                WxWrapper.showInterstitialAdvert()
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
            console.log("jin---showPopups")
            if (DataManager.CommonData["leaveGame"]) {
                if (DataManager.CommonData["first"] == 1 && !DataManager.CommonData["first_showPopups"]) {
                    DataManager.CommonData["first_showPopups"] = true
                    if (checkonlineParam("lobbyPopups_leaveGameFirst")) {
                        break
                    }
                    
                    this.popupQuene.add(this.checkShowPopUp_MiniGamePop.bind(this))
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
                    // this.popupQuene.add(this.checkShowPopUp_FirstPayPop.bind(this))
                    this.popupQuene.add(this.checkShowPopUp_SuperWelfarePop.bind(this, true))
                    this.popupQuene.add(this.checkShowPopUp_FreeGoldPop.bind(this))
                }
            } else {
                if (DataManager.CommonData["morrow"] <= 7) {
                    if (checkonlineParam("lobbyPopups_loginNew")) {
                        break
                    }
                    this.popupQuene.add(this.checkShowPopUp_MiniGamePop.bind(this))
                    this.popupQuene.add(this.checkShowPopup_TomorrowPop.bind(this))
                    this.popupQuene.add(this.checkShowPopup_DrawVip.bind(this))
                    this.popupQuene.add(this.checkShowPopup_TreasureHuntPop.bind(this))
                    this.popupQuene.add(this.checkShowPopup_ActivityPortalPop.bind(this, true))
                } else {
                    if (checkonlineParam("lobbyPopups_login")) {
                        break
                    }
                    this.popupQuene.add(this.checkShowPopUp_MiniGamePop.bind(this))
                    this.popupQuene.add(this.checkShowPopUp_NoticePop.bind(this))
                    this.popupQuene.add(this.checkShowPopup_DrawVip.bind(this, true))
                    this.popupQuene.add(this.checkShowPopup_TreasureHuntPop.bind(this, true))
                    this.popupQuene.add(this.checkShowPopup_SignPop.bind(this, true))
                    this.popupQuene.add(this.checkShowPopUp_FirstPayPop.bind(this))
                    this.popupQuene.add(this.checkShowPopup_ActivityPortalPop.bind(this, true))
                    // this.popupQuene.add(this.checkShowPopUp_TimeLimitPop.bind(this))
                    this.popupQuene.add(this.checkShowPopUp_SuperWelfarePop.bind(this, true))
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
        if (1) {
            return false
        }

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
        console.log("jin---签到：", signCheck)
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

    /**
     * 引导用户
     */
    checkShowPopUp_NoticePop() {
        if (DataManager.CommonData.roleCfg && DataManager.CommonData.roleCfg.importUserABTest && checkSpecialAward()) {
            if (DataManager.Instance.onlineParam.noticeImage) {
                showNoticePop(DataManager.Instance.onlineParam.noticeImage, this.popupQuene.showPopup.bind(this.popupQuene))
                return true
            }
        }
    }

    /**
     * 小游戏引导页
    */
    checkShowPopUp_MiniGamePop(force: boolean) {
        if(!isShowNewVersionContent()) return
        const MiniGameCheck = DataManager.load(DataManager.UserData.guid + "MiniGamePop" + TimeFormat("yyyy-mm-dd"))
        console.log("jin---checkShowPopUp_MiniGamePop: ", DataManager.Instance.onlineParam.Leaflet_game_appid, DataManager.CommonData["morrow"])
        if((!DataManager.Instance.onlineParam.Leaflet_game_appid || !DataManager.Instance.onlineParam.Leaflet_game_picture) || 
            null != DataManager.CommonData[DataManager.UserData.guid + "MiniGamePop"] || MiniGameCheck)
            {
            return
        }

        if(DataManager.CommonData["morrow"] <= 3){
            return
        }
        this.countPopup--
        SceneManager.Instance.popScene("moduleLobby", "MiniGamePop", { closeCallback: this.popupQuene.showPopup.bind(this.popupQuene) })
        return true
    }

    /**
     * 首充
     */ 
    checkShowPopUp_FirstPayPop(force: boolean){
        //TODO 1.在线参数 2.奖励是否领过 3.礼包是否买过

        let payed = (checkFirstBox() != false) ? true : false

        //todo 显示条件：1.显示支付页 2.每次登陆显示 3.超值领取后，显示幸运
        // let FirstPaysPop = DataManager.load(DataManager.UserData.guid + "FirstPaysPop")
        // console.log("jin---checkShowPopUp_FirstPayPop: ", isShowPayPage(), FirstPaysPop, payed ,checkFirstBox())
        if((force || this.countPopup > 0) && isShowPayPage() && DataManager.CommonData["roleCfg"]["roundSum"] > 10){// && !FirstPaysPop
            if(payed){
                SceneManager.Instance.popScene<String>("moduleLobby", "FirstPaysPop", { closeCallback: this.popupQuene.showPopup.bind(this.popupQuene) })
                this.countPopup--
                return true
            }else{
                // SceneManager.Instance.popScene<String>("moduleLobby", "LuckyBoxPop", { closeCallback: this.popupQuene.showPopup.bind(this.popupQuene) })
            }
        }
    }

    /**
     * 限时特惠
     */ 
     checkShowPopUp_TimeLimitPop(force: boolean){
         if((force || this.countPopup > 0) && isShowTimeLimitPop() && checkTimeLimitBox() && isShowPayPage()){
            this.countPopup--
            SceneManager.Instance.popScene<String>("moduleLobby", "TimeLimitPop", { closeCallback: this.popupQuene.showPopup.bind(this.popupQuene) })
            return true
         }
     }

    /**
     * 1元 6元福利
     */ 
     checkShowPopUp_SuperWelfarePop(force: boolean){
        let countSta_0 = DataManager.load(DataManager.UserData.guid + "superWelfare_1" + TimeFormat("yyyy-mm-dd"))
        let countSta_1 = DataManager.load(DataManager.UserData.guid + "superWelfare_6" + TimeFormat("yyyy-mm-dd"))
        console.log("jin---checkShowPopUp_FirstPayPop: ", math.random(0,10) <= 6, DataManager.CommonData["roleCfg"]["roundSum"] <= 10, DataManager.Instance.onlineParam.isShowSuperWelfare, countSta_0, countSta_1)
        if((force || this.countPopup > 0) && 
            DataManager.CommonData["roleCfg"]["roundSum"] > 10 && 
            isShowPayPage() && 
            DataManager.Instance.onlineParam.isShowSuperWelfare){
                if(countSta_0){
                    SceneManager.Instance.popScene<String>("moduleLobby", "SuperWelfarePop", {
                        isResultLayer: false,
                        session: 1,
                        closeCallback: this.popupQuene.showPopup.bind(this.popupQuene)
                    })
                    this.countPopup--
                    return true
                }
                if(countSta_1){
                    SceneManager.Instance.popScene<String>("moduleLobby", "SuperWelfarePop", {
                        isResultLayer: false,
                        session: 2,
                        closeCallback: this.popupQuene.showPopup.bind(this.popupQuene)
                    })
                    this.countPopup--
                    return true
                }
        }
    }

    /**
     * 免费金豆
     */ 
     checkShowPopUp_FreeGoldPop(force: boolean){
        if((force || this.countPopup > 0) && getAdLeftTimes(AdsConfig.taskAdsMap.DynamicGold) > 0  && DataManager.UserData.getItemNum(0) < 1000000){
            this.countPopup--
            SceneManager.Instance.popScene<String>("moduleLobby", "FreeGoldCoin", { closeCallback: this.popupQuene.showPopup.bind(this.popupQuene) })
            return true
        }
     }

    /**
     * 好友助力
     */ 
     checkShowPopUp_FriendHelp(force: boolean){
        if((force || this.countPopup > 0) && isShowFriendHelp()){
            SceneManager.Instance.popScene<String>("moduleLobby", "InviteFriendPopNew", { closeCallback: this.popupQuene.showPopup.bind(this.popupQuene) })
            return true
        }
     }

    updateOnceBox() {
        this.initLeft()
        if (!checkFirstBox(1)) {
            return
        }

        const round = DataManager.Instance.onlineParam.LobbyScene_DayCard_round || 1000
        if (DataManager.CommonData["roleCfg"]["roundSum"] || DataManager.CommonData["roleCfg"]["roundSum"] < round) {
            return
        }

        cc.find("nodeTop/dayCard", this.node).active = true
    }

    updateOneYuanBox(){
        this.initLeft()
    }

    // 场景打开回调事件
    onSceneAdd(message){}
    
    // 场景弹出回调事件
    onScenePop(message){
        if(!isStartCustomAdvert()){
            return
        }
        // console.log("jin---onLobbyScenePop: ", message,message.packet.name)
        if(this.customAdShow){
            this.customAdShow = false
        }
        this.ScenePop.push(message.packet.name)
        playCustomAD(this.customAdShow ,AdsConfig.custom.LobbyScene)
    }

    // 场景关闭回调事件
    onSceneClose(message){
        if(!isStartCustomAdvert()){
            return
        }
        var indexs = -1
        this.ScenePop.forEach(function(item, index, arr) {
            if(item == message.packet.name) {
                indexs = index
            }
        });
        if(indexs != -1){
            this.ScenePop.splice(indexs, 1)
            if(this.ScenePop.length === 0){
                this.customAdShow = true
                // console.log("jin---this.ScenePop: ", this.ScenePop, indexs)
                this.node.runAction(cc.sequence(cc.delayTime(0.5), cc.callFunc(() => {
                    playCustomAD(this.customAdShow ,AdsConfig.custom.LobbyScene)
                })))
                
            }
            
        }
        
    }

    isShowCustomAd(dt){
        if(!isStartCustomAdvert()){
            return
        }

        if(this.customAdLock 
            && oncustomAdvertClose(AdsConfig.custom.LobbyScene) != undefined 
            && oncustomAdvertClose(AdsConfig.custom.LobbyScene)){
            if(this.ScenePop.length > 0){
                if(onCustomAdvertShow(AdsConfig.custom.LobbyScene)){
                    // console.log("jin---Show: ", this.ScenePop, onCustomAdvertShow(AdsConfig.custom.LobbyScene),oncustomAdvertClose(AdsConfig.custom.LobbyScene))
                    this.customAdShow = false
                    playCustomAD(this.customAdShow ,AdsConfig.custom.LobbyScene)
                }
    
            }else{
                if(!onCustomAdvertShow(AdsConfig.custom.LobbyScene)){
                    // console.log("jin---notShow: ", this.ScenePop, onCustomAdvertShow(AdsConfig.custom.LobbyScene),oncustomAdvertClose(AdsConfig.custom.LobbyScene))
                    this.customAdShow = true
                    playCustomAD(this.customAdShow ,AdsConfig.custom.LobbyScene)
                }
            }
        }
        
    }

    //更多游戏
    onPressMoreGameOrCallback(){
        //TODO audio
        //当前页面
        if(this.currentPageNum == 0){
            this.currentPageNum = 1
            cc.find("nodePageView/btn_more_game", this.node).active = false
            cc.find("nodePageView/btn_more_game/fingerAni", this.node).active = false
            cc.find("nodePageView/content", this.node).runAction(cc.sequence(
                cc.moveTo(0.2, cc.v2(-1920+1280, 0)), 
                cc.callFunc(() => {
                    this.setBtnMoreGameState(this.currentPageNum)
            })))
        }else{
            this.currentPageNum = 0
            cc.find("nodePageView/btn_more_game", this.node).active = false
            cc.find("nodePageView/content", this.node).runAction(cc.sequence(
                cc.moveTo(0.2, cc.v2(-640+1280, 0)), 
                cc.callFunc(() => {
                    this.setBtnMoreGameState(this.currentPageNum)
            })))
        }

    }

    onPressSuperWelfare(){
        SceneManager.Instance.popScene<String>("moduleLobby", "SuperWelfarePop", {
            session: 1
        })
    }

    setBtnMoreGameState(sta: number){
        let l_moreGame = cc.find("nodePageView/btn_more_game/Background/Label", this.node)
        if(sta == 0){
            let gameIconPath = "moduleLobby/texture/common/btn_more_game_view"
            cc.loader.loadRes(gameIconPath, cc.SpriteFrame, (err, spriteFrame)=>{
                if (err) {
                    cc.error(err.message || err);
                    return;
                }
                cc.find("nodePageView/btn_more_game", this.node).setPosition(cc.v2(640-40,  0))
                cc.find("nodePageView/btn_more_game/Background",this.node).getComponent(cc.Sprite).spriteFrame = spriteFrame
                cc.find("nodePageView/btn_more_game", this.node).active = true
            })
        }else{
            let gameIconPath = "moduleLobby/texture/common/btn_ddz_view"
            cc.loader.loadRes(gameIconPath, cc.SpriteFrame, (err, spriteFrame)=>{
                if (err) {
                    cc.error(err.message || err);
                    return;
                }
                cc.find("nodePageView/btn_more_game", this.node).setPosition(cc.v2(640-1280+40, 0))
                cc.find("nodePageView/btn_more_game/Background",this.node).getComponent(cc.Sprite).spriteFrame = spriteFrame
                cc.find("nodePageView/btn_more_game", this.node).active = true
            })
        }
    }

    initLeft(){
        // 超值、幸运
        if(isShowPayPage()){
            cc.find("nodeBottom/btnShop/btn_shop", this.node).active = true
            cc.find("nodeBottom/btnShop/spine", this.node).active = false
        }else{
            cc.find("nodeBottom/btnShop/btn_shop", this.node).active = false
            cc.find("nodeBottom/btnShop/spine", this.node).active = true
        }

        let node_firstPays = cc.find("nodePageView/content/ddz_view/nodeLeft/firstPays", this.node)
        let node_luckyBox = cc.find("nodePageView/content/ddz_view/nodeLeft/luckyBox", this.node)
        let node_superSaleBox = cc.find("nodePageView/content/ddz_view/nodeLeft/btnSuperSale", this.node)
        let node_timeLimitBox = cc.find("nodePageView/content/ddz_view/nodeLeft/btnTimeLimit", this.node)
        let node_friendHelp = cc.find("nodePageView/content/ddz_view/nodeLeft/inviteFriend", this.node)
        let node_superWelfare = cc.find("nodePageView/content/ddz_view/nodeLeft/oneyuanIndiana", this.node)
        if(!isShowPayPage()){
            node_firstPays.active = false
            node_luckyBox.active = false
            node_superSaleBox.active = false
            node_timeLimitBox.active = false
            node_friendHelp.active = false
            node_superWelfare.active = false
            return
        }
        node_superSaleBox.active = true
        console.log("jin---checkFirstBox:",  checkFirstBox())
        node_firstPays.active = checkFirstBox() ? true : false
        node_luckyBox.active = checkFirstBox() ? false : checkLuckyBox()
        node_firstPays.runAction(cc.repeatForever(cc.sequence(
            cc.scaleTo(0.6, 1.1),
            cc.scaleTo(0.6, 1.0)
        ))) 
        node_luckyBox.runAction(cc.repeatForever(cc.sequence(
            cc.scaleTo(0.6, 1.1),
            cc.scaleTo(0.6, 1.0)
        ))) 

        //限时
        node_timeLimitBox.active = isShowTimeLimitPop()
        node_friendHelp.active = isShowFriendHelp()
        node_superWelfare.active = isShowSuperWelfare()
    }

}
