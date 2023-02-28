import DataManager, { IMatchInfo } from "../base/baseData/DataManager";
import { checkWaterMatchTime, gotoMatchSvr, iMessageBox, leftMatchTime, numberFormat, setNodeSpriteLocal, setNodeSpriteNet, getSpritePathByItemId, getLeadTime, getSpriteByItemId } from "../base/BaseFuncTs";
import NetManager from "../base/baseNet/NetManager";
import BaseScene from "../base/baseScene/BaseScene";
import SceneManager from "../base/baseScene/SceneManager";
import BaseFunc = require("../base/BaseFunc")

const { ccclass, property } = cc._decorator;

enum EMatch {
    Red_Packet, //红包
    Big_Award, //大奖
    Gold_Bean, //金豆
    Challenge, //挑战赛
}

interface IMatchType {
    eMatch: EMatch
    check: (match: IMatchInfo) => boolean
    matchList: IMatchInfo[]
    matchItem: cc.Node
    menuIconPath1: string
    menuIconPath2: string
    itemBgPath: string
    personBgPath: cc.Color
    color: cc.Color
}

@ccclass
export default class MatchScene extends BaseScene {
    thisComponentName = "MatchScene"
    registeMatchList: string[] = []

    onOpenScene() {
        let matchTypes: IMatchType[] = []
        matchTypes.push({
            eMatch: EMatch.Red_Packet,
            check: (match: IMatchInfo) => { return match.matchFlag == 1 },
            matchList: [],
            matchItem: cc.find("nodeContent/nodeMatch/matchList/view/item_small", this.node),
            menuIconPath1: "iconRp",
            menuIconPath2: "iconRp",
            itemBgPath: "match_item_bg1",
            personBgPath: cc.color(24, 104, 210),//"match_person_bg",
            color: cc.color(140, 196, 255),
        })
        matchTypes.push({
            eMatch: EMatch.Big_Award,
            check: (match: IMatchInfo) => { return match.matchFlag == 2 },
            matchList: [],
            matchItem: cc.find("nodeContent/nodeMatch/matchList/view/item_small", this.node),
            menuIconPath1: "iconBig",
            menuIconPath2: "iconBig",
            itemBgPath: "match_item_bg2",
            personBgPath: cc.color(158, 94, 244),//"match_person_bg_2",
            color: cc.color(238, 207, 255),
        })
        matchTypes.push({
            eMatch: EMatch.Gold_Bean,
            check: (match: IMatchInfo) => { return match.matchFlag == 4 },
            matchList: [],
            matchItem: cc.find("nodeContent/nodeMatch/matchList/view/item_long", this.node),
            menuIconPath1: "iconGold",
            menuIconPath2: "iconGold",
            itemBgPath: "match_item_bg3",
            personBgPath: cc.color(34, 97, 148),//"match_person_bg2",
            color: cc.color(140, 196, 255),
        })
        /**
        matchTypes.push({
            eMatch: EMatch.Challenge,
            check: (match: IMatchInfo) => { return match.matchFlag == 8 },
            matchList: [],
            matchItem: cc.find("nodeContent/nodeMatch/matchList/view/item_long", this.node),
            menuIconPath1: "iconChallenge",
            menuIconPath2: "iconChallenge",
            itemBgPath: "match_item_bg4",
            personBgPath: cc.color(75, 35, 132),//"match_person_bg2_2",
            color: cc.color(238, 207, 255),
        })
        */

        // 分类比赛
        for (const v of DataManager.Instance.matchList) {
            for (const match of matchTypes) {
                if (match.check(v)) {
                    match.matchList.push(v)
                    break
                }
            }
        }

        let content = cc.find("nodeContent/nodeMenu/menuList/view/content", this.node)
        let item = cc.find("nodeContent/nodeMenu/menuList/view/item", this.node)
        const buttons = []
        for (let i = 0; i < matchTypes.length; i++) {
            const matchType = matchTypes[i]
            let node = cc.instantiate(item)
            node.x = i % 2 == 0 ? -60 : 65
            node.parent = content
            node.active = true

            buttons[matchType.eMatch] = node

            // setNodeSpriteLocal({ node: cc.find("checkmark/btn_icon", node), url: "moduleLobby/texture/matchScene/" + matchType.menuIconPath1, delayShow: true })
            // setNodeSpriteLocal({ node: cc.find("Background/btn_icon", node), url: "moduleLobby/texture/matchScene/" + matchType.menuIconPath2, delayShow: true })

            cc.find("checkmark/" + matchType.menuIconPath1, node).active = true
            cc.find("Background/" + matchType.menuIconPath2, node).active = true

            const name = "onPressMatchType" + matchType.eMatch
            this[name] = this.onPressMenu
            let eventHandler = new cc.Component.EventHandler()
            eventHandler.target = this.node
            eventHandler.component = this.thisComponentName
            eventHandler.handler = name
            eventHandler.customEventData = matchType as any
            const toggle = node.getComponent(cc.Toggle)
            toggle.clickEvents = []
            toggle.clickEvents.push(eventHandler)
        }

        let eMatchType = EMatch.Red_Packet
        if (this.initParam) {
            if (this.initParam.msg) {
                iMessageBox(this.initParam.msg)
            }
            if (this.initParam.matchInfo) {
                let v = DataManager.Instance.matchMap[this.initParam.matchInfo.matchType]
                if (v) {
                    for (const match of matchTypes) {
                        if (match.check(v)) {
                            eMatchType = match.eMatch
                            break
                        }
                    }
                    if (this.initParam.showMatchSign) {
                        this.scheduleOnce(() => {
                            if (!this.node.isValid) {
                                return
                            }
                            this.onPressMatchSign(null, v)
                        }, 1)
                    }
                }
            }
        }
        buttons[eMatchType].getComponent(cc.Toggle).check()
        this.onPressMenu(null, matchTypes[eMatchType])
    }

    onPressMenu(touch: cc.Event.EventTouch, matchType: IMatchType) {
        if (touch) {
            cc.audioEngine.playEffect(DataManager.Instance.menuEffect, false)
        }

        this.removeRegisteMatch()
        cc.find("nodeContent/nodeMatch/matchList/view/content", this.node).removeAllChildren(true)
        if (matchType.matchList.length == 0) {
            return
        }

        if (matchType.matchItem == cc.find("nodeContent/nodeMatch/matchList/view/item_small", this.node)) {
            this.initContentSmall(matchType)
        } else {
            this.initContentLong(matchType)
        }
    }

    initContentSmall(matchType: IMatchType) {
        const content = cc.find("nodeContent/nodeMatch/matchList/view/content", this.node)
        for (const v of matchType.matchList) {
            const node = cc.instantiate(matchType.matchItem)
            node.parent = content
            node.active = true

            // icon
            setNodeSpriteNet({ node: cc.find("nodeIcon/spt_icon", node), url: v.matchPic, fixSize: true })

            //比赛名字
            cc.find("lbl_name", node).getComponent(cc.Label).string = v.matchName

            //比赛描述
            cc.find("spt_desc_bg/lbl_desc", node).getComponent(cc.Label).string = v.matchDesc

            cc.find("nodePerson/spt_person", node).color = matchType.color.clone()

            // bg
            // setNodeSpriteLocal({ node: cc.find("btn_bg", node), url: "moduleLobby/texture/matchScene/" + matchType.itemBgPath })

            // setNodeSpriteLocal({ node: cc.find("nodeTime1/person_bg1", node), url: "moduleLobby/texture/matchScene/" + matchType.personBgPath })
            // setNodeSpriteLocal({ node: cc.find("nodeTime2/person_bg1", node), url: "moduleLobby/texture/matchScene/" + matchType.personBgPath })
            // setNodeSpriteLocal({ node: cc.find("nodeTime2/person_bg2", node), url: "moduleLobby/texture/matchScene/" + matchType.personBgPath })

            cc.find("btn_bg/" + matchType.itemBgPath, node).active = true
            cc.find("nodeTime1/person_bg1", node).color = matchType.personBgPath
            cc.find("nodeTime2/person_bg1", node).color = matchType.personBgPath
            cc.find("nodeTime2/person_bg2", node).color = matchType.personBgPath

            // 点击事件
            BaseFunc.AddClickEvent(cc.find("btn_bg", node), this, this.thisComponentName, "onPressMatchSign", v, 2)

            // 动态内容
            const name = "MSG_update_match_info" + v.matchType
            this[name] = () => {
                const nLeftTime = leftMatchTime(v)
                //时间
                cc.find("btn_bg", node).getComponent(cc.Button).interactable = true
                cc.find("nodeTime1", node).active = false
                cc.find("nodeTime2", node).active = false
                if (v.type == 2) { // 流水赛
                    cc.find("nodePerson", node).active = false

                    cc.find("nodeTime1", node).active = true
                    cc.find("nodeTime1/label1", node).getComponent(cc.Label).string = "每满"
                    cc.find("nodeTime1/person_bg1/label", node).getComponent(cc.Label).string = v.minNum + ""
                    cc.find("nodeTime1/label2", node).getComponent(cc.Label).string = "人开赛"
                } else {
                    cc.find("nodeTime2", node).active = true

                    const now = new Date()
                    const totime = (day?: number) => {
                        return Math.floor(new Date(now.getFullYear(), now.getMonth(), day == null ? now.getDate() : day, 0, 0, 0, 0).getTime() / 1000)
                    }
                    if (nLeftTime <= 0) {
                        cc.find("btn_bg", node).getComponent(cc.Button).interactable = false

                        cc.find("nodeTime2/label1", node).getComponent(cc.Label).string = "等待下场比赛"
                        cc.find("nodeTime2/person_bg1", node).active = false
                        cc.find("nodeTime2/label2", node).active = false
                        cc.find("nodeTime2/person_bg2", node).active = false
                    } else {
                        const oneTime = 24 * 60 * 60
                        const sTime = new Date(v.begin * 1000)
                        if (nLeftTime <= 2 * 60 * 60) {
                            cc.find("nodeTime2/label1", node).getComponent(cc.Label).string = "即将开赛"
                        } else if (v.begin < totime() + oneTime) {
                            cc.find("nodeTime2/label1", node).getComponent(cc.Label).string = "今日"
                        } else if (v.begin < totime() + 2 * oneTime) {
                            cc.find("nodeTime2/label1", node).getComponent(cc.Label).string = "明日"
                        } else if (v.begin < totime(sTime.getDate() + 1 - (sTime.getDay() || 7)) + 7 * oneTime) {
                            cc.find("nodeTime2/label1", node).getComponent(cc.Label).string = "周" + ["日", "一", "二", "三", "四", "五", "六"][sTime.getDay()]
                        } else {
                            cc.find("nodeTime2/label1", node).getComponent(cc.Label).string = BaseFunc.TimeFormat("mm-dd", v.begin)
                        }
                        cc.find("nodeTime2/person_bg1", node).active = true
                        cc.find("nodeTime2/label2", node).active = true
                        cc.find("nodeTime2/person_bg2", node).active = true
                        cc.find("nodeTime2/person_bg1/label", node).getComponent(cc.Label).string = BaseFunc.TimeFormat("HH", v.begin)
                        cc.find("nodeTime2/label2", node).getComponent(cc.Label).string = ":"
                        cc.find("nodeTime2/person_bg2/label", node).getComponent(cc.Label).string = BaseFunc.TimeFormat("MM", v.begin)
                    }
                    cc.find("nodePerson", node).active = nLeftTime > 0
                }

                //人数
                if (v.signCount == null || v.signCount < 0) {
                    v.signCount = 0
                }
                if (v.type == 2) {  // 流水赛
                    cc.find("nodePerson/lbl_person", node).getComponent(cc.Label).string = v.signCount + "/" + v.minNum
                } else {
                    cc.find("nodePerson/lbl_person", node).getComponent(cc.Label).string = v.signCount + ""
                }

                // 报名
                cc.find("spt_sign", node).active = !!v.isSign
            }
            this[name]()
            this.registeMatchList.push(name)

            // 请求刷新数据
            node.runAction(cc.repeatForever(cc.sequence(cc.callFunc(() => {
                NetManager.Instance.send("lobby", {
                    opcode: "proto_cl_get_match_sign_num_req",
                    matchTypeId: v.matchType,
                })
            }), cc.delayTime(1))))
        }
    }

    initContentLong(matchType: IMatchType) {
        const content = cc.find("nodeContent/nodeMatch/matchList/view/content", this.node)
        for (const v of matchType.matchList) {
            const node = cc.instantiate(matchType.matchItem)
            node.parent = content
            node.active = true

            // icon
            setNodeSpriteNet({ node: cc.find("nodeIcon/spt_icon", node), url: v.matchPic, fixSize: true })

            //比赛名字
            cc.find("lbl_name", node).getComponent(cc.Label).string = v.matchName

            //比赛描述
            cc.find("spt_desc_bg/lbl_desc", node).getComponent(cc.Label).string = v.matchDesc
            cc.find("lbl_desc", node).getComponent(cc.Label).string = ""

            for (const award of v.awardList) {
                if (award.matchRank == 1) {
                    const strAwardList = award.awardStr.split(",")
                    const awardList: string[] = []
                    for (const strAward of strAwardList) {
                        const pics = strAward.split("|")
                        if (pics[0] == "PicUrl") {
                            continue
                        }
                        awardList.push(pics[1] + pics[0])
                    }

                    cc.find("lbl_desc", node).getComponent(cc.Label).string = "冠军：" + awardList.join(", ")
                    break
                }
            }

            // 报名费
            cc.find("nodeSign/nodeSign/lbl_num", node).getComponent(cc.Label).string = 'x' + v.signFee[0].signItemNum
            // setNodeSpriteLocal({ node: cc.find("nodeSign/nodeSign/spt_icon", node), url: getSpritePathByItemId(v.signFee[0].signItem), fixSize: true })
            cc.find("nodeSign/nodeSign/spt_icon", node).getComponent(cc.Sprite).spriteFrame = getSpriteByItemId(v.signFee[0].signItem)

            // bg
            // setNodeSpriteLocal({ node: cc.find("btn_bg", node), url: "moduleLobby/texture/matchScene/" + matchType.itemBgPath })

            // setNodeSpriteLocal({ node: cc.find("nodePerson/match_person_bg", node), url: "moduleLobby/texture/matchScene/" + matchType.personBgPath })
            cc.find("btn_bg/" + matchType.itemBgPath, node).active = true
            cc.find("nodePerson/match_person_bg", node).color = matchType.personBgPath


            // 点击事件
            BaseFunc.AddClickEvent(cc.find("nodeSign/btn_sign", node), this, this.thisComponentName, "onPressMatchSign", v, 2)

            // 动态内容
            const name = "MSG_update_match_info" + v.matchType
            this[name] = () => {
                const nLeftTime = leftMatchTime(v)
                //时间
                cc.find("btn_bg", node).getComponent(cc.Button).interactable = true
                cc.find("nodeTime1", node).active = false
                cc.find("nodeTime2", node).active = false
                if (v.type == 2) { // 流水赛
                    cc.find("nodePerson", node).active = false

                    cc.find("nodeTime1", node).active = true
                    cc.find("nodeTime1/label1", node).getComponent(cc.Label).string = "每满"
                    cc.find("nodeTime1/person_bg1/label", node).getComponent(cc.Label).string = v.minNum + ""
                    cc.find("nodeTime1/label2", node).getComponent(cc.Label).string = "人开赛"
                } else {
                    cc.find("nodeTime2", node).active = true
                    cc.find("nodeTime2/nodeTime", node).active = false

                    const now = new Date()
                    const totime = (day?: number) => {
                        return Math.floor(new Date(now.getFullYear(), now.getMonth(), day == null ? now.getDate() : day, 0, 0, 0, 0).getTime() / 1000)
                    }
                    if (nLeftTime <= 0) {
                        cc.find("btn_bg", node).getComponent(cc.Button).interactable = false

                        cc.find("nodeTime2/label1", node).getComponent(cc.Label).string = "等待下场比赛"
                    } else {
                        cc.find("nodeTime2/nodeTime", node).active = true
                        const oneTime = 24 * 60 * 60
                        const sTime = new Date(v.begin * 1000)
                        if (nLeftTime <= 2 * 60 * 60) {
                            cc.find("nodeTime2/label1", node).getComponent(cc.Label).string = "即将开赛"
                        } else if (v.begin < totime() + oneTime) {
                            cc.find("nodeTime2/label1", node).getComponent(cc.Label).string = "今日"
                        } else if (v.begin < totime() + 2 * oneTime) {
                            cc.find("nodeTime2/label1", node).getComponent(cc.Label).string = "明日"
                        } else if (v.begin < totime(sTime.getDate() + 1 - (sTime.getDay() || 7)) + 7 * oneTime) {
                            cc.find("nodeTime2/label1", node).getComponent(cc.Label).string = "周" + ["日", "一", "二", "三", "四", "五", "六"][sTime.getDay()]
                        } else {
                            cc.find("nodeTime2/label1", node).getComponent(cc.Label).string = BaseFunc.TimeFormat("mm-dd", v.begin)
                        }
                        cc.find("nodeTime2/nodeTime/person_bg1/label", node).getComponent(cc.Label).string = BaseFunc.TimeFormat("HH", v.begin)
                        cc.find("nodeTime2/nodeTime/label2", node).getComponent(cc.Label).string = ":"
                        cc.find("nodeTime2/nodeTime/person_bg2/label", node).getComponent(cc.Label).string = BaseFunc.TimeFormat("MM", v.begin)
                    }
                    cc.find("nodePerson", node).active = nLeftTime > 0
                }

                //人数
                if (v.signCount == null || v.signCount < 0) {
                    v.signCount = 0
                }
                if (v.type == 2) {  // 流水赛
                    cc.find("nodePerson/lbl_person", node).getComponent(cc.Label).string = v.signCount + "/" + v.minNum
                } else {
                    cc.find("nodePerson/lbl_person", node).getComponent(cc.Label).string = v.signCount + ""
                }

                // 报名费
                const btn_sign = cc.find("nodeSign/btn_sign", node)
                let lbl_sign = "报名"
                let bg_sign = "btn_sign_1"
                btn_sign.getComponent(cc.Button).interactable = true
                if (v.type != 2 && nLeftTime <= 0) {
                    lbl_sign = "报名未开放"
                    bg_sign = "btn_sign_3"
                    btn_sign.getComponent(cc.Button).interactable = false
                } else if (v.isSign) {
                    if (nLeftTime <= getLeadTime()) {
                        lbl_sign = "前往比赛"
                    } else {
                        lbl_sign = "退出比赛"
                    }
                    bg_sign = "btn_sign_2"
                }
                cc.find("label", btn_sign).getComponent(cc.Label).string = lbl_sign
                btn_sign.getChildByName("btn_sign_1").active = false
                btn_sign.getChildByName("btn_sign_2").active = false
                btn_sign.getChildByName("btn_sign_3").active = false
                btn_sign.getChildByName(bg_sign).active = true
                // setNodeSpriteLocal({ node: btn_sign, url: "moduleLobby/texture/matchScene/" + bg_sign })
            }
            this[name]()
            this.registeMatchList.push(name)

            // 请求刷新数据
            node.runAction(cc.repeatForever(cc.sequence(cc.callFunc(() => {
                NetManager.Instance.send("lobby", {
                    opcode: "proto_cl_get_match_sign_num_req",
                    matchTypeId: v.matchType,
                })
            }), cc.delayTime(1))))
        }
    }

    onPressMatchSign(touch: cc.Event.EventTouch, v: IMatchInfo) {
        cc.log("onPressMatchSign", v)
        cc.audioEngine.playEffect(DataManager.Instance.menuEffect, false)
        if (!checkWaterMatchTime(v)) {
            return
        }
        if (v.isSign && (leftMatchTime(v) <= getLeadTime() || v.type == 2)) {
            gotoMatchSvr(v)
        } else {
            SceneManager.Instance.popScene("moduleLobby", "MatchSign", v)
        }
    }

    onPressMatchAwardHistory() {
        SceneManager.Instance.popScene("moduleLobby", "MatchAwardHistory")
    }

    onPressBack() {
        SceneManager.Instance.addScene<String>("moduleLobby", "LobbySceneNew")
    }

    onCloseScene() {
        this.removeRegisteMatch()
    }

    removeRegisteMatch() {
        for (const name of this.registeMatchList) {
            this[name] = null
        }
    }
}