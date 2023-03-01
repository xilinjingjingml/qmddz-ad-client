import BaseComponent from "../base/BaseComponent"
import { AdsConfig } from "../base/baseData/AdsConfig"
import DataManager from "../base/baseData/DataManager"
import { iMessageBox, showAwardResultPop, czcEvent, CreateNavigateToMiniProgram } from "../base/BaseFuncTs"
import { NodeExtends } from "../base/extends/NodeExtends"
import { math } from "../base/utils/math"
import { checkAdCanReceive, receiveAdAward } from "../moduleLobby/LobbyFunc"
import AudioManager from "./AudioManager.rpddz"
import GameLogic from "./GameLogic.rpddz"

const { ccclass } = cc._decorator

@ccclass
export default class BaiYuanResultPop extends BaseComponent {
    initParam: { message: IGameResult, showDouble: boolean }

    onOpenScene() {
        if (DataManager.CommonData["first"] == 1 && !DataManager.CommonData["BaiYuanGameResultLayerFirst"]) {
            // czcEvent("斗地主", "话费场结算", "新用户")
        }
        const gamescene = GameLogic.Instance().gamescene
        const winIds: number[] = []
        const loseIds: number[] = []
        const isLord = gamescene.myPlayer.isLord
        let isWin = false
        this.initParam.message.vecUserResult1.forEach(result => {
            if (result.nScore > 0) {
                winIds.push(result.nChairID)
                if (result.nChairID == 0) {
                    isWin = true
                }
            } else {
                loseIds.push(result.nChairID)
            }
        })

        if (loseIds.length == 0) {
            this.closeSelf()
            return
        }


        this.$("nodeFinger").active = DataManager.Instance.getOnlineParamGray("BaiYuanResult_finger", false)
        this.showHBAni(isWin, isLord)

        const id2pos = (id: number): cc.Vec2 => {
            return this.node.convertToNodeSpaceAR(gamescene.players[id].node.convertToWorldSpaceAR(cc.Vec2.ZERO))
        }

        if (isWin) {
            if (isLord) {
                loseIds.forEach(id => {
                    this.sop_drop({
                        start: { pos: id2pos(id) },
                        end: { pos: id == 2 ? this.$("node_hb1").position.add(cc.v2(-22, 88)) : this.$("node_hb2").position.add(cc.v2(-22, 88)) },
                        pool: gamescene.sopPool,
                        spriteFrame: gamescene.tocashSpriteFrame,
                    })
                })
            } else {
                winIds.forEach(id => {
                    this.sop_drop({
                        start: { pos: id2pos(loseIds[0]) },
                        end: { pos: id == 0 ? this.$("node_hb1").position.add(cc.v2(-22, 88)) : id2pos(id) },
                        pool: gamescene.sopPool,
                        spriteFrame: gamescene.tocashSpriteFrame,
                    })
                })
            }
        } else {
            if (isLord) {
                winIds.forEach((id, i, arr) => {
                    this.sop_drop({
                        start: { pos: id2pos(loseIds[0]) },
                        end: { pos: id2pos(id) },
                        pool: gamescene.sopPool,
                        spriteFrame: gamescene.tocashSpriteFrame,
                        callback: i == arr.length - 1 ? this.closeSelf.bind(this) : null
                    })
                })
            } else {
                loseIds.forEach((id, i, arr) => {
                    this.sop_drop({
                        start: { pos: id2pos(id) },
                        end: { pos: id2pos(winIds[0]) },
                        pool: gamescene.sopPool,
                        spriteFrame: gamescene.tocashSpriteFrame,
                        callback: i == arr.length - 1 ? this.closeSelf.bind(this) : null
                    })
                })
            }
        }
    }

    showHBAni(isWin: boolean, isLord: boolean) {
        this.$("lbl_money1").active = false
        this.$("lbl_money2").active = false
        this.$("node_double").active = false
        if (!isWin) {
            this.$("nodePop").active = false
            return
        }

        this.$("nodePop").active = true
        if (isWin && !isLord) {
            this.$("node_hb1").x = 0
            this.$("node_hb2").active = false
        }
        this.initParam.message.vecUserResult1.forEach(result => {
            if (isLord) {
                if (result.nChairID != 0) {
                    this.$("lbl_money" + (result.nChairID == 1 ? 2 : 1), cc.Label).string = GameLogic.Instance().turnBaiYuan(-result.nScore).toFixed(2) + ""
                }
            } else {
                if (result.nChairID == 0) {
                    this.$("lbl_money" + 1, cc.Label).string = GameLogic.Instance().turnBaiYuan(result.nScore).toFixed(2) + ""
                }
            }
        })

        this.playHBSpineShow()
    }

    playHBSpineShow() {
        //AB开关 a:收 spine动画  b:恭喜获得
        if(DataManager.Instance.onlineParam.ReceivedAniDisplay){
            for (let i = 1; i <= 2; i++) {
                const button = this.$("btn_hb" + i, cc.Button)
                button.interactable = false
    
                const spine = this.$("spine_hb" + i, sp.Skeleton)
                spine.setAnimation(0, 'kaishi', false)
                spine.setCompleteListener(() => {
                    spine.setCompleteListener(null)
                    spine.setAnimation(0, 'zhongjian', true)
    
                    button.interactable = true
    
                    this.$("lbl_money" + i).active = true
    
                    this.$("node_double").active = this.initParam.showDouble
                })
            }
        }else{
            for (let i = 1; i <= 2; i++) {
                this.$("spine_hb" + i).active = false
                const button = this.$("btn_hb" + i, cc.Button)
                button.interactable = true
                this.$("lbl_money" + i).active = true
                this.$("node_double").active = this.initParam.showDouble
                this.$("bg_openhb" + i).active = true
                this.$("icon_tocash" + i).active = true
                this.$("lbl_get" + i).active = true
            }
        }
    }

    playHBSpineGet() {
        this.$("node_double").active = false

        const pos = GameLogic.Instance().gamescene.myPlayer.node.convertToWorldSpaceAR(cc.Vec2.ZERO)
        if(DataManager.Instance.onlineParam.ReceivedAniDisplay){
            for (let i = 1; i <= 2; i++) {
                this.$("lbl_money" + i).active = false
    
                const button = this.$("btn_hb" + i, cc.Button)
                button.interactable = false
    
                const node = this.$("spine_hb" + i)
                const spine = node.getComponent(sp.Skeleton)
                spine.setAnimation(0, 'jiesu', false)
                spine.setCompleteListener(() => {
                    spine.setCompleteListener(null)
    
                    let action = cc.spawn([
                        cc.scaleTo(0.6, 0.1),
                        cc.jumpTo(0.6, node.convertToNodeSpaceAR(pos), 50, 1).easing(cc.easeSineIn()),
                    ])
                    if (i == 1) {
                        action = cc.sequence([action, cc.callFunc(this.closeSelf.bind(this))])
                    }
                    node.runAction(action)
                })
            }
        }else{
            for (let i = 1; i <= 2; i++) {
                this.$("lbl_money" + i).active = false
    
                const button = this.$("btn_hb" + i, cc.Button)
                button.interactable = false
                const node = this.$("node_hb" + i)
                let action = cc.spawn([
                    cc.scaleTo(0.6, 0.1),
                    cc.jumpTo(0.6, node.convertToNodeSpaceAR(pos), 50, 1).easing(cc.easeSineIn()),
                ])
                if (i == 1) {
                    action = cc.sequence([action, 
                        // cc.callFunc(()=>{

                        // }),
                        cc.callFunc(this.closeSelf.bind(this))])
                }
                node.runAction(action)
            } 
        }

    }

    // 从一个地方吸到另一个地方
    sop_drop(params: { start: { pos?: cc.Vec2, size?: cc.Size }, end: { pos?: cc.Vec2, size?: cc.Size }, pool: cc.NodePool, spriteFrame: cc.SpriteFrame, callback?: Function }) {

        const sum = 20
        const start = params.start
        const end = params.end
        start.size = cc.size(75, 75)
        end.size = cc.size(0, 0)

        const bezierPos = cc.v2((start.pos.x + end.pos.x) / 2 + cc.winSize.width / 8, (start.pos.y + end.pos.y) / 2 + cc.winSize.height / 8 + math.random(100 * 2) - 100)
        for (let i = 0; i < sum; i++) {
            let node = params.pool.get()
            if (node == null) {
                node = new cc.Node()
                node.addComponent(cc.Sprite)
            }
            node.getComponent(cc.Sprite).spriteFrame = params.spriteFrame
            node.setPosition(math.randomPos(start.pos, start.size))
            node.opacity = 0
            node.scale = 0.5
            this.node.addChild(node)

            const t = i * 0.01
            const actions = []
            actions.push(cc.delayTime(t))
            actions.push(cc.fadeIn(0.1))
            actions.push(cc.bezierTo(0.8 - t, [bezierPos.clone(), bezierPos.clone(), math.randomPos(end.pos, end.size)]).easing(cc.easeSineIn()))
            actions.push(cc.callFunc(() => {
                params.pool.put(node)
                if (params.callback && i == sum - 1) {
                    params.callback()
                }
            }))
            node.runAction(cc.sequence(actions))
        }
    }

    onPressGet(event: cc.Event.EventTouch) {
        if (DataManager.CommonData["morrow"] == 0) {
            // czcEvent("斗地主", "话费场结算", "普通领取")
        }
        AudioManager.playButtonSound()
		NodeExtends.cdButton(event, 1)

        AudioManager.playButtonSound()
        this.playHBSpineGet()
    }

    onPressDouble(event: cc.Event.EventTouch) {
        if (DataManager.CommonData["morrow"] == 0) {
            // czcEvent("斗地主", "话费场结算", "加倍领取")
        }
        AudioManager.playButtonSound()
		NodeExtends.cdButton(event, 1)

        if (checkAdCanReceive(AdsConfig.taskAdsMap.New_WinDouble)) {
            receiveAdAward(AdsConfig.taskAdsMap.New_WinDouble, this.proto_cg_baiyuan_win_double_req.bind(this))
        } else {
            this.proto_cg_baiyuan_win_double_req()
        }
    }

    proto_cg_baiyuan_win_double_req() {
        GameLogic.Instance().sendMessage<Iproto_cg_baiyuan_win_double_req>({
            opcode: "proto_cg_baiyuan_win_double_req"
        })
    }

    proto_gc_baiyuan_win_double_ack(event: { packet: Iproto_gc_baiyuan_win_double_ack }) {
        const messge = event.packet
        if (messge.cRet == 0) {
            const awards = []
            messge.vecItemInfo.forEach(info => awards.push({ index: info.nItemId, num: info.nItemNum }))
            showAwardResultPop(awards, { closeCallback: () => this.isValid && this.playHBSpineGet() })
        } else {
            iMessageBox("领取失败！")
        }
    }

    onCloseScene() {
        for (let i = 1; i <= 2; i++) {
            this.$("spine_hb" + i, sp.Skeleton).setCompleteListener(null)
        }
    }

    onDestroy() {
        DataManager.CommonData["BaiYuanGameResultLayerFirst"] = true
    }

    //TODO 添加导量口子,位置需要重设
    initNavigateToMiniGame(){
        let parentNode = cc.find("nodePop" ,this.node)
        CreateNavigateToMiniProgram(parentNode, cc.v2(320,-250))
    }
    
}
