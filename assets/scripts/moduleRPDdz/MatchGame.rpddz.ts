import BaseFunc = require("../base/BaseFunc")
import BaseComponent from "../base/BaseComponent"
import DataManager from "../base/baseData/DataManager"
import { goBackToMatch, iMessageBox, setNodeSpriteLocal } from "../base/BaseFuncTs"
import SceneManager from "../base/baseScene/SceneManager"
import * as proto from "../moduleLobby/proto/lobbyproto"
import GameLogic from "./GameLogic.rpddz"
import GameScene from "./GameScene.rpddz"

const { ccclass, property } = cc._decorator

enum EWaitState {
    None,
    Stage,
    Relive,
}

@ccclass
export default class MatchGame extends BaseComponent {
    componentName: string = "MatchGame.rpddz"
    gamescene: GameScene
    isStart: boolean

    messageRank: proto.proto_bc_match_rank_not
    messageInfo: proto.proto_bc_match_info_noti
    messageRelive: proto.proto_bc_match_relive_noti

    onOpenScene() {
        this.gamescene = GameLogic.Instance().gamescene

        this.registMessageHandler()

        this.bindButtonHandler()

        this.replaceBg()

        this.refreshDiZhu()

        this.setState(false)
    }

    registMessageHandler() {
        this.gamescene.addListener("proto_bc_match_scores_not", this.proto_bc_match_scores_not.bind(this))
        this.gamescene.addListener("proto_bc_match_info_noti", this.proto_bc_match_info_noti.bind(this))
        this.gamescene.addListener("proto_bc_match_rank_not", this.proto_bc_match_rank_not.bind(this))
        this.gamescene.addListener("proto_bc_match_weed_out_score_not", this.proto_bc_match_weed_out_score_not.bind(this))
        this.gamescene.addListener("proto_bc_match_relive_noti", this.proto_bc_match_relive_noti.bind(this))
        this.gamescene.addListener("proto_bc_match_relive_ack", this.proto_bc_match_relive_ack.bind(this))
    }

    bindButtonHandler() {
        BaseFunc.AddClickEvent(cc.find("node_relive/relive_btn/relive_btn", this.node), this.node, this.componentName, "onPressRelive", 1)
        BaseFunc.AddClickEvent(cc.find("node_relive/relive_btn/relive_btn_no", this.node), this.node, this.componentName, "onPressRelive", 0)
    }

    replaceBg() {
        const bg = cc.find("bg", this.node)
        bg.parent = this.gamescene["nodeBackground"]
        bg.zIndex = -1
        this.gamescene["sptBackground"].active = false
    }

    refreshDiZhu() {
        cc.find("node_rank/node_info/layout_base/lbl_score", this.node).getComponent(cc.Label).string = Math.abs(this.gamescene["nGameMoney"]) + ""
    }

    setState(start: boolean) {
        this.isStart = start
        this.showLight(start)
        this.showEnd(start)
        this.setStateNext(EWaitState.None)
    }

    showStage(show: boolean) {
        this.setStateNext(EWaitState.Stage)
    }

    setStateNext(state: EWaitState, show?: false) {
        if (state == EWaitState.Relive) {
            if (show == false) {
                state = EWaitState.Stage
            }
        } else if (state == EWaitState.Stage) {
            if (this.messageRelive) {
                state = EWaitState.Relive
            }
        }
        this.showMatchStage(!this.isStart && state == EWaitState.Stage)
        this.showRelive(!this.isStart && state == EWaitState.Relive)
    }

    showLight(start: boolean) {
        cc.find("bg/node_light", this.gamescene["nodeBackground"]).active = start
        cc.find("node_rank", this.node).active = start
    }

    showMatchStage(show: boolean) {
        const node_stage = cc.find("node_stage", this.node)
        node_stage.active = show
        if (!show) {
            return
        }

        const stages: { node: cc.Node, titlePath: string, name: string }[] = []
        stages.push({
            node: cc.find("node_stage_1", node_stage),
            titlePath: "stage_text_dlcj",
            name: "初赛",
        })
        if (GameLogic.Instance().is_three_match()) { // 3轮赛 
            stages.push({
                node: cc.find("node_stage_2", node_stage),
                titlePath: "stage_text_dlcj",
                name: "半决赛",
            })

            cc.find("node_stage_2", node_stage).active = true
            cc.find("node_stage_1", node_stage).x = -222
            cc.find("node_stage_3", node_stage).x = 222
        } else {
            cc.find("node_stage_2", node_stage).active = false
            cc.find("node_stage_1", node_stage).x = -111
            cc.find("node_stage_3", node_stage).x = 111
        }
        stages.push({
            node: cc.find("node_stage_3", node_stage),
            titlePath: "stage_text_djjf",
            name: "决赛",
        })

        let curMatchRound = -1
        if (this.messageRank) {
            if (this.messageRank.matchStatus == 2) { // 初赛
                curMatchRound = 0
            } else if (this.messageRank.matchStatus == 3) { // 决赛
                curMatchRound = stages.length - 1
            } else if (this.messageRank.matchStatus == 4) { // 结束
                curMatchRound = 999
            } else if (this.messageRank.matchStatus == 5) { // 半决赛
                curMatchRound = 1
            }
        }

        for (let i = 0; i < stages.length; i++) {
            const stage = stages[i]

            cc.find("content/lbl_name", stage.node).getComponent(cc.Label).string = stage.name

            let nt = cc.find("content/lbl_title", stage.node)
            nt.children.map(item => item.active = false)
            nt.getChildByName(stage.titlePath).active = true
            // setNodeSpriteLocal({ node: cc.find("content/lbl_title", stage.node), url: "moduleRPDdzRes/images/MatchGame/" + stage.titlePath })

            if (i == stages.length - 1) {
                cc.find("content/lbl_desc", stage.node).getComponent(cc.Label).string = this.messageRank ? this.messageRank.finalAllRound + "局" : ""
            } else {
                cc.find("content/lbl_desc", stage.node).getComponent(cc.Label).string = this.messageInfo ? this.messageInfo.stagePlayerNums[i] + "进" + this.messageInfo.stagePlayerNums[i + 1] : ""
            }

            if (i < curMatchRound) {
                cc.find("content/lbl_state", stage.node).getComponent(cc.Label).string = "停止比赛"
            } else if (i == curMatchRound) {
                cc.find("content/lbl_state", stage.node).getComponent(cc.Label).string = "正在进行"
            } else {
                cc.find("content/lbl_state", stage.node).getComponent(cc.Label).string = "即将开始"
            }

            const light = cc.find("light", stage.node)
            light.active = false
            light.stopAllActions()
            if (curMatchRound == i) {
                light.active = true
                light.opacity = 0
                light.runAction(cc.repeatForever(cc.sequence([
                    cc.fadeIn(1),
                    cc.delayTime(0.5),
                    cc.fadeOut(1),
                    cc.delayTime(0.2),
                ])))
            }
        }
    }

    showRelive(show: boolean) {
        const node_relive = cc.find("node_relive", this.node)
        node_relive.active = show
        if (!show) {
            return
        }

        cc.find("relive_btn", node_relive).active = true
        cc.find("ani_spine_taotai", node_relive).active = true
        cc.find("ani_spine_fuhuo", node_relive).active = false

        // 动画
        const skeleton = cc.find("ani_spine_taotai", node_relive).getComponent(sp.Skeleton)
        skeleton.setAnimation(0, "taotai", false)
        skeleton.setCompleteListener(() => {
            skeleton.setAnimation(0, "taotai-dj", true)
            skeleton.setCompleteListener(null)
        })

        cc.find("relive_btn/relive_btn/label", node_relive).getComponent(cc.Label).string = this.messageRelive.reliveItemNum + ""

        const label = cc.find("relive_btn/label", node_relive)
        label.stopAllActions()
        label.runAction(cc.repeatForever(cc.sequence([
            cc.callFunc(() => {
                const time = this.messageRelive.obsoleteEndTime - Math.floor(new Date().getTime() / 1000)
                if (time <= 0) {
                    label.stopAllActions()
                    cc.find("relive_btn", node_relive).active = false
                    this.proto_cb_match_relive_req_sender(0)
                }
                label.getComponent(cc.Label).string = (time < 10 ? "0" + time : time) + "s"
            }),
            cc.delayTime(1),
        ])))
    }

    showEnd(start: boolean) {
        let show = start
        if (!(start && this.messageRank && this.messageRank.matchStatus == 3)) {
            show = false
        }

        const node_end = cc.find("node_end", this.node)
        node_end.active = show
        if (!show) {
            return
        }

        node_end.stopAllActions()
        node_end.runAction(cc.sequence(cc.delayTime(2), cc.callFunc(() => {
            node_end.active = false
        })))

        cc.find("end_stage_bg/node_layout/lbl_rank", node_end).getComponent(cc.Label).string = this.messageRank.finalCurRound + "/" + this.messageRank.finalAllRound
    }

    onPressRelive(touch: cc.Event.EventTouch, relive: number) {
        cc.audioEngine.playEffect(DataManager.Instance.menuEffect, false)
        if (relive == 1) {
            if (DataManager.UserData.getItemNum(0) < this.messageRelive.reliveItemNum) {
                iMessageBox("复活道具不足")
                return
            }
        }
        cc.find("node_relive/relive_btn", this.node).active = false
        this.proto_cb_match_relive_req_sender(relive)
    }

    proto_bc_match_scores_not(event) {
        const message: proto.proto_bc_match_scores_not = event.packet
        for (let i = 0; i < message.tableScores.length; i++) {
            const player = this.gamescene.getPlayerByChairID(i)
            if (player) {
                player.setScoreNum(message.tableScores[i])
            }
        }
    }

    proto_bc_match_info_noti(event) {
        const message: proto.proto_bc_match_info_noti = event.packet
        this.messageInfo = message
    }

    proto_bc_match_rank_not(event) {
        const message: proto.proto_bc_match_rank_not = event.packet
        this.messageRank = message

        this.gamescene.myPlayer.setScoreNum(message.curScore)

        // 更新排名
        cc.find("node_stage/node_layout/node_rank/lbl_rank", this.node).getComponent(cc.Label).string = message.rank + ""
        const node_layout = cc.find("node_rank/node_rank/node_layout", this.node)
        cc.find("lbl_rank", node_layout).getComponent(cc.Label).string = message.rank + ""
        cc.find("lbl_sum", node_layout).getComponent(cc.Label).string = "/" + message.playerNum

        // 复活信息
        cc.find("node_relive/node_rank/lbl_rank", this.node).getComponent(cc.Label).string = message.rank + ""
        cc.find("node_relive/node_score/lbl_rank", this.node).getComponent(cc.Label).string = "第" + message.rank + "/" + message.playerNum + "名"
        cc.find("node_relive/node_score/lbl_socre", this.node).getComponent(cc.Label).string = "(" + message.curScore + ")"

        let stage_name = ""
        let round_name = ""
        let round_num = 0
        if (message.matchStatus == 1) { // 报名中
            stage_name = "报名中"
        } else if (message.matchStatus == 2) { // 初赛
            stage_name = "初赛"
            round_num = message.finalNum
        } else if (message.matchStatus == 3) { // 决赛
            stage_name = "决赛"
            round_name = message.finalCurRound + "/" + message.finalAllRound
        } else if (message.matchStatus == 4) { // 结束
            stage_name = "结束"
        } else if (message.matchStatus == 5) { // 半决赛
            stage_name = "半决赛"
        } else if (message.matchStatus == 6) { // 预赛
            stage_name = "预赛"
        } else if (message.matchStatus == 7) { // 预报名
            stage_name = "预报名"
        }

        if (this.messageInfo) {
            let index = null
            if (GameLogic.Instance().is_three_match()) { // 3轮赛 
                if (message.matchStatus == 1 || message.matchStatus == 2 || message.matchStatus == 7) { // 报名中/初赛
                    index = 2
                } else if (message.matchStatus == 5) {// 半决赛
                    index = 3
                }
            } else if (GameLogic.Instance().is_four_match()) { // 4轮赛
                if (message.matchStatus == 1 || message.matchStatus == 2 || message.matchStatus == 7) { // 报名中/初赛
                    index = 2
                } else if (message.matchStatus == 6) {// 预赛
                    index = 3
                } else if (message.matchStatus == 5) {// 半决赛
                    index = 4
                }
            }

            if (index) {
                round_num = this.messageInfo.stagePlayerNums[index]
            }

            if (GameLogic.Instance().is_final_out_match()) { // 有半决赛
                if (message.matchStatus == 3 || message.matchStatus == 4) { // 决赛
                    round_num = this.messageInfo.stagePlayerNums[this.messageInfo.stagePlayerNums.length - 1]
                }
            }
        }

        let labels: string[]
        if (round_num != 0) {
            labels = [" ", "前", round_num + "", "名晋级"]
        } else if (round_name != "") {
            labels = [" ", "", round_name, ""]
        } else {
            labels = ["", "", "", ""]
        }
        const billboard = cc.find("node_rank/node_info/billboard", this.node)
        const layout_rank = cc.find("node_rank/node_info/layout_rank", this.node)
        for (const node of [cc.find("layout_rank", billboard), layout_rank]) {
            cc.find("lbl_round", node).getComponent(cc.Label).string = stage_name
            cc.find("label", node).getComponent(cc.Label).string = labels[0]
            cc.find("label_1", node).getComponent(cc.Label).string = labels[1]
            cc.find("lbl_sum", node).getComponent(cc.Label).string = labels[2]
            cc.find("label_2", node).getComponent(cc.Label).string = labels[3]
        }
        const matchEnd = message.matchStatus == 3 || message.matchStatus == 4
        layout_rank.active = matchEnd
        billboard.active = !matchEnd

        if (message.status == 5) {
            GameLogic.Instance().showMatchResultLayer()
        } else if (message.status == 6) {
            goBackToMatch({ matchInfo: GameLogic.Instance().getCurMatchInfo() })
        }
    }

    proto_bc_match_weed_out_score_not(event) {
        const message: proto.proto_bc_match_weed_out_score_not = event.packet
        cc.find("node_rank/node_info/billboard/layout_taotai/lbl_socre", this.node).getComponent(cc.Label).string = message.weedOutScore + ""
    }

    proto_bc_match_relive_noti(event) {
        const message: proto.proto_bc_match_relive_noti = event.packet
        if (message.obsoleteEndTime <= Math.floor(new Date().getTime() / 1000)) {
            return
        }

        this.messageRelive = message
        if (cc.find("node_stage", this.node).active) {
            this.setStateNext(EWaitState.Relive)
        }
    }

    proto_cb_match_relive_req_sender(relive: number) {
        GameLogic.Instance().sendMessage({
            opcode: 'proto_cb_match_relive_req',
            matchId: this.messageRelive.matchId,
            relive: relive,
        })
        this.messageRelive = null
    }

    proto_bc_match_relive_ack(event) {
        const message: proto.proto_bc_match_relive_ack = event.packet
        if (message.ret == 0) {
            // iMessageBox("复活成功")
            this.play_match_relive_fuhuo()
            return
        } else if (message.ret == -2) {
            iMessageBox("当前阶段不允许复活")
        } else if (message.ret == -3) {
            iMessageBox("当前阶段比赛已经结束")
        } else if (message.ret == -4) {
            iMessageBox("超出复活时间")
        } else if (message.ret == -5) {
            iMessageBox("复活道具不足")
        } else {
            iMessageBox("复活失败")
        }
        this.setStateNext(EWaitState.Relive, false)
    }

    play_match_relive_fuhuo() {
        cc.find("node_relive/ani_spine_taotai", this.node).active = false
        cc.find("node_relive/ani_spine_fuhuo", this.node).active = true

        const skeleton = cc.find("node_relive/ani_spine_fuhuo", this.node).getComponent(sp.Skeleton)
        skeleton.setAnimation(0, "juesai", false)
        skeleton.setCompleteListener(() => {
            this.setStateNext(EWaitState.Relive, false)
        })
    }

    onPressMatchInfo() {
        const matchInfo = GameLogic.Instance().getCurMatchInfo()
        if (matchInfo == null) {
            return
        }
        cc.audioEngine.playEffect(DataManager.Instance.menuEffect, false)
        SceneManager.Instance.popScene("moduleLobby", "MatchInfo", matchInfo as any)
    }
}
