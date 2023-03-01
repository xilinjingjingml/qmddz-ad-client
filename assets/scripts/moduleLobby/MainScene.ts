import { AdsConfig } from "../base/baseData/AdsConfig"
import DataManager from "../base/baseData/DataManager"
import { accurateTime, enterGame, getBaiYuanServer, getGameServers, getServerByGameIdAndServerId, iMessageBox, MsgBox, playADInter, playADNative, showAwardResultPop, showCashOutNotice, socialShare, supportNativeAd, zeroDate } from "../base/BaseFuncTs"
import NetManager from "../base/baseNet/NetManager"
import BaseScene from "../base/baseScene/BaseScene"
import SceneManager from "../base/baseScene/SceneManager"
import { NodeExtends } from "../base/extends/NodeExtends"
import GameManager from "../base/GameManager"
import TaskQueue from "../base/utils/TaskQueue"
import { getGameConfig } from "../gameConfig"
import { checkAdCanReceive, checkTomorrowStatus, getCooldownTime, getServerList, loadAdConfig, loadLotteryData, receiveAdAward, trans2format, updateCooldownView } from "../moduleLobby/LobbyFunc"
import opcodeConfig from "../moduleLobby/proto/opcode"
import proto = require("../moduleLobby/proto/lobbyproto")

const { ccclass, property } = cc._decorator

const FREE_REDPACKET_TIME_KEY = "last_free_redpacket_time"

@ccclass
export default class MainScene extends BaseScene {

    @property(cc.Node)
    modelMoney: cc.Node = null

    @property({ type: cc.AudioClip })
    background: cc.AudioClip = null

    task: TaskQueue // 任务队列

    onLoad() {
        cc.director.once(cc.Director.EVENT_AFTER_DRAW, () => {
            this.isValid && GameManager.hideFace()
        })

        if (null == NetManager.Instance.getSocketState("lobby")) {
            NetManager.Instance.login("lobby", DataManager.Instance.SocketAddress, proto, opcodeConfig, (socket) => {
                const proto_cl_verify_ticket_req = {
                    opcode: "proto_cl_verify_ticket_req",
                    plyGuid: DataManager.UserData.guid,
                    plyNickname: DataManager.UserData.nickname,
                    plyTicket: DataManager.UserData.ticket,
                    gameId: DataManager.Instance.gameId,
                    version: 2000000001,
                    extParam: "",
                    sex: DataManager.UserData.sex,
                    packetName: DataManager.Instance.packetName
                }

                socket.send(proto_cl_verify_ticket_req)
            })
        }

        if (!DataManager.CommonData.AdConfig) {
            loadAdConfig(() => {
                this.checkCooldown()
            })
        }

        if (!DataManager.CommonData.lotteryData) {
            loadLotteryData()
        }

        cc.game.on(cc.game.EVENT_SHOW, () => {
            this.checkCooldown()
        }, this)

        // 明日有礼
        cc.find("nodeTop/nodeTomorrow", this.node).active = false
        checkTomorrowStatus(() => {
            if (!this.isValid || DataManager.CommonData.TomorrowStatus == null) {
                return
            }
            const status = DataManager.CommonData.TomorrowStatus
            const curday = status.ret == 0 ? status.list[0].signDay : 0
            cc.find("nodeTop/nodeTomorrow", this.node).active = curday < 7 || (curday == 7 && status.tomorrowAward.length > 0)
        })

        // 普通场次
        this.updateRoleCfg()

        this.audio_play()
    }

    audio_play() {
        this.background && !cc.audioEngine.isMusicPlaying() && cc.audioEngine.playMusic(this.background, true)
    }

    onOpenScene() {
        cc.find("nodeTop/nodeUser/labelName", this.node).getComponent(cc.Label).string = DataManager.UserData.nickname
        NodeExtends.setNodeSpriteNet({
            node: cc.find("nodeTop/nodeUser/nodeAvatar/nodeMask/avatar", this.node),
            url: DataManager.UserData.face,
            fixSize: true
        })

        showCashOutNotice()

        cc.find("nodeMain/nodeRedPacket/labelCount", this.node).getComponent(cc.Label).string = Math.floor(289417 + (accurateTime() - 1604289417) / 10) + "人正在赚红包"
        cc.find("nodeMain/nodeRedPacket/btnGetRedpacket", this.node).runAction(cc.repeatForever(cc.sequence(
            cc.scaleTo(0.8, 1.1),
            cc.scaleTo(0.8, 1.0)
        )))

        this.checkCooldown()
        this.updateRedPacketNumber()
        this.showPopups()
    }

    checkCooldown() {
        if (checkAdCanReceive(AdsConfig.taskAdsMap.New_FreeRedPacket)) {
            updateCooldownView(cc.find("nodeRight/free_redpacket", this.node), FREE_REDPACKET_TIME_KEY)
        }
    }

    updateUserData() {
        if (DataManager.CommonData.first == 1 && !DataManager.CommonData.newUserPopShow) {
            return
        }

        this.updateRedPacketNumber()
    }

    updateRedPacketNumber() {
        cc.find("nodeMain/nodeRedPacket/labelMoney", this.node).getComponent(cc.Label).string = trans2format(DataManager.UserData.getItemNum(382) / 100) + "元"
        cc.find("nodeRight/free_redpacket", this.node).active = DataManager.UserData.getItemNum(382) < DataManager.Instance.getOnlineParamGray("New_FreeRedPacket_money", 17000)
    }

    updateFakeMoney() {
        if (this.modelMoney) {
            const labelNode = cc.find("nodeMain/nodeRedPacket/labelMoney", this.node)
            labelNode.getComponent(cc.Label).string = "0;"

            const total = Math.floor(DataManager.UserData.getItemNum(382) / 100)

            let money = 0
            const sprNum = 10
            const step = total / sprNum

            for (let i = 0; i < sprNum; i++) {
                const spr = cc.instantiate(this.modelMoney)
                spr.y = Math.floor(Math.random() * 10 - 180)
                spr.x = Math.floor(Math.random() * 200 - 100)
                spr.parent = labelNode
                const t = i == 0 ? 1 : Math.random() * 5 / 10 + 0.4
                spr.runAction(cc.sequence(
                    cc.delayTime(0.5),
                    cc.spawn(
                        cc.fadeTo(t, 200),
                        cc.jumpTo(t, Math.random() * 100 - 50, Math.random() * 40 - 20, 80, 1).easing(cc.easeSineInOut()),
                        // cc.moveTo(t, Math.random() * 100 - 50, Math.random() * 40 - 20).easing(cc.easeSineInOut()),
                        cc.scaleTo(t, Math.random() * 2 / 10 + 0.3).easing(cc.easeSineInOut())
                    ),
                    cc.callFunc(() => {
                        if (i == 0) {
                            this.updateRedPacketNumber()
                            labelNode.runAction(cc.sequence(
                                cc.delayTime(0.3),
                                cc.callFunc(() => {
                                    this.onPressGameRoom(null, 3893)
                                })
                            ))
                        } else {
                            money += step
                            labelNode.getComponent(cc.Label).string = trans2format(money) + "元"
                        }
                    }),
                    cc.removeSelf()
                ))
            }
        }
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

    onPressFreeRedPacket() {
        if (checkAdCanReceive(AdsConfig.taskAdsMap.New_FreeRedPacket)) {
            if (getCooldownTime(FREE_REDPACKET_TIME_KEY) > 0) {
                iMessageBox("免费红包5分钟一次")
            } else {
                receiveAdAward(AdsConfig.taskAdsMap.New_FreeRedPacket, (res) => {
                    if (res && res.ret == 0) {
                        DataManager.save(FREE_REDPACKET_TIME_KEY, accurateTime())
                        this.checkCooldown()

                        if (res.itemIndex != null && res.itemNum != null) {
                            showAwardResultPop([{ index: res.itemIndex, num: res.itemNum }])
                        } else {
                            showAwardResultPop([{ index: 382, num: 0 }])
                        }
                    } else {
                        iMessageBox("领取失败")
                    }
                }, null, false)
            }
        } else {
            iMessageBox("今日红包已领完，请明日再来")
        }
    }

    onPressShare() {
        cc.audioEngine.playEffect(DataManager.Instance.menuEffect, false)
        socialShare({})
    }

    showPopups() {
        if (DataManager.CommonData.lastGame) {
            const servers = getServerByGameIdAndServerId(DataManager.CommonData.lastGame.gameId, DataManager.CommonData.lastGame.gameServerId)
            if (servers && servers.length > 0) {
                MsgBox({
                    title: "提示",
                    content: "您有尚未完成的游戏\n是否前往？",
                    confirmText: "前往",
                    buttonNum: 1,
                    confirmClose: true,
                    confirmFunc: () => enterGame(servers[0]),
                })
                return
            }
            DataManager.CommonData.lastGame = null
        }

        // 进入大厅
        this.task = new TaskQueue(this.node)
        if (!DataManager.CommonData["leaveGame"]) {
            if (DataManager.CommonData.first == 1 && DataManager.load(DataManager.UserData.guid + "lastGameId") == null) {
                SceneManager.Instance.popScene("moduleLobby", "NewUserPop")
                return
            }
        } else {
            // 游戏返回大厅
            delete DataManager.CommonData["leaveGame"]

            this.task.add(this.checkShowPopup_ADInter, this)
        }
        this.task.add(this.checkShowPopup_TomorrowPop, this)
        this.task.add(this.checkShowPopup_DailyGift, this)
        this.task.run()
    }

    /**
     * 插屏广告
     */
    checkShowPopup_ADInter(next: Function) {
        if (!DataManager.Instance.getOnlineParamSwitch("back2showadABTest")) {
            next()
            return
        }

        if (DataManager.Instance.getOnlineParamGray("priority_use_native")) {
            playADNative(next)
        } else {
            playADInter(next)
        }
    }

    /**
     * 明日有礼
     */
    checkShowPopup_TomorrowPop(next: Function) {
        checkTomorrowStatus(() => {
            if (!this.isValid) {
                return
            }

            if (DataManager.CommonData.TomorrowStatus == null) {
                next()
                return
            }

            const status = DataManager.CommonData.TomorrowStatus
            const sign = status.ret == 0 ? status.list[0] : { signDay: 0, signTime: 0 }
            const canShow = sign.signDay <= 7 && (status.tomorrowAward == null || status.tomorrowAward.length == 0)
            const canGetAward = sign.signTime && sign.signTime < Math.floor(zeroDate().getTime() / 1000)
            if (canShow || canGetAward) {
                SceneManager.Instance.popScene("moduleLobby", "TomorrowPop", { closeCallback: next })
                return
            }

            next()
        })
    }
    /**
     * 每日礼包
     */
    checkShowPopup_DailyGift(next: Function) {
        if (checkAdCanReceive(AdsConfig.taskAdsMap.New_DailyGift)) {
            SceneManager.Instance.popScene("moduleLobby", "DailyGift", { closeCallback: next })
            return
        }

        next()
    }

    onPressNormalGame(sender, gameId) {
        cc.audioEngine.playEffect(DataManager.Instance.menuEffect, false)
        const left = this.getNormalGameLeftRound()
        if (this.getNormalGameLeftRound() > 0) {
            iMessageBox(`还需${left}局游戏，才可解锁更多内容`)
            return
        }

        this.onPressGameRoom(sender, gameId)
    }

    getNormalGameLeftRound() {
        return Math.max(DataManager.Instance.getOnlineParamGray("NormalGame_round_lock", 50) - DataManager.CommonData["roleCfg"]["roundSum"], 0)
    }

    updateRoleCfg() {
        const left = this.getNormalGameLeftRound()
        cc.find("nodeLeft/node_zfk/node_zfk_lock/New Node/zfk_label", this.node).getComponent(cc.Label).string = "" + left
        cc.find("nodeLeft/node_zfk/node_zfk_lock", this.node).active = left > 0
    }
}
