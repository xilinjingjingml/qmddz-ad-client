import DataManager from "../base/baseData/DataManager"
import { getHttpSpriteFrame, updateUserInfo } from "../base/BaseFuncTs"
import TableView from "../base/components/TableView"
import WxWrapper from "../base/WxWrapper"
import BaseFunc = require("../base/BaseFunc")

const { ccclass } = cc._decorator

interface IItemData {
    plyGuid?: string
    plyNum: number
    face: string
    nickName: string
    vipLv: number
}

@ccclass
export default class GameRankPop extends cc.Component {
    _rank: any[]
    _awardConfig = [
        { rank: 1, num: 200000 },
        { rank: 2, num: 80000 },
        { rank: 3, num: 50000 },
        { rank: { start: 4, end: 5 }, num: 20000 },
        { rank: { start: 6, end: 10 }, num: 10000 },
        { rank: { start: 11, end: 20 }, num: 5000 },
        { rank: { start: 21, end: 50 }, num: 2000 },
    ]

    onLoad() {
        const rankSelf = cc.find("rankContent/rankSelf", this.node)
        this.setItem(rankSelf, {
            nickName: DataManager.UserData.nickname,
            vipLv: DataManager.CommonData["VipData"],
            face: DataManager.UserData.face,
            plyNum: 0
        }, 0)

        const day = 24 * 60 * 60 * 1000
        const data = new Date()
        const start = data.getTime() - ((data.getDay() - 1) % 7) * day
        const startDay = new Date(start)
        const endDay = new Date(start + 7 * day)
        cc.find("lbl_time", this.node).getComponent(cc.Label).string = (startDay.getMonth() + 1) + "月" + startDay.getDate() + "日 - " + (endDay.getMonth() + 1) + "月" + endDay.getDate() + "日"

        const format = (n: number) => (n < 10 ? "0" : "") + n
        const url = DataManager.getURL("LOAD_GAME_NUM")
        const params = {
            pid: DataManager.UserData.guid,
            ticket: DataManager.UserData.ticket,
            beginDate: startDay.getFullYear() + "" + format(startDay.getMonth() + 1) + "" + format(startDay.getDate()),
            endDate: endDay.getFullYear() + "" + format(endDay.getMonth() + 1) + format(endDay.getDate()),
        }

        BaseFunc.HTTPGetRequest(url, params, (msg) => {
            if (msg == null || !this.isValid) {
                return
            }

            if (msg.tenField) {
                this.onInitRank(msg.tenField)
            }

            if (msg.wonNum) {
                rankSelf.getChildByName("labelGuns").getComponent(cc.Label).string = msg.wonNum + "局"
            }
        })
    }

    onInitRank(datas: any[]) {
        const rankContent = cc.find("rankContent", this.node)
        const tableView = rankContent.getComponent(TableView)
        tableView.datas = datas
        tableView.item = cc.find("item", rankContent)
        tableView.updateItem = this.updateItem.bind(this)
        tableView.updateView()

        for (let i = 0; i < datas.length; i++) {
            const data = datas[i]
            if (data.plyGuid == DataManager.UserData.guid) {
                this.setItem(cc.find("rankContent/rankSelf", this.node), data, i + 1)
                break
            }
        }
    }

    updateItem(node: cc.Node, data: any, index: number) {
        node['index'] = index
        this.setItem(node, data, index + 1)
        if (data.face == null || data.nickName == null) {
            BaseFunc.HTTPGetRequest(DataManager.getURL("USERBATCH"), { uids: data.plyGuid }, (res) => {
                if (!node.isValid || node['index'] != index) {
                    return
                }

                if (res && res.list && res.list[0]) {
                    const list = res.list[0]
                    data.nickName = list.nickname
                    data.face = list.face
                    this.setItem(node, data, index + 1)
                }
            })
        }
    }

    setItem(node: cc.Node, data: IItemData, rank: number) {
        // rank
        const nodeRank = node.getChildByName("nodeRank")
        nodeRank.getChildByName("rank_no") && (nodeRank.getChildByName("rank_no").active = rank == 0)
        nodeRank.getChildByName("rank_1st").active = rank == 1
        nodeRank.getChildByName("rank_2nd").active = rank == 2
        nodeRank.getChildByName("rank_3rd").active = rank == 3
        nodeRank.getChildByName("rank_num").active = rank > 3
        if (rank > 3) {
            nodeRank.getChildByName("rank_num").getComponent(cc.Label).string = "" + rank
        }

        // face
        const nodeFace = cc.find("nodeFace/nodeMask/rank_face", node)
        if (data.face) {
            getHttpSpriteFrame(data.face, (spriteFrame: cc.SpriteFrame) => {
                if (!nodeFace.isValid) {
                    return
                }
                const size = nodeFace.getContentSize()
                const sprite = nodeFace.getComponent(cc.Sprite)
                sprite.spriteFrame = spriteFrame
                nodeFace.setContentSize(size)
            })
        }

        // nickName
        let strName = data.nickName || ""
        if (strName.length > 7) {
            strName = strName.substr(0, 6) + "..."
        }
        node.getChildByName("labelNickname").getComponent(cc.Label).string = strName

        // vipLv
        const nodeLevel = node.getChildByName("nodeLevel")
        if (data.vipLv > 0) {
            nodeLevel.active = true
            nodeLevel.getChildByName("VIP1-2").active = data.vipLv == 1 || data.vipLv == 2
            nodeLevel.getChildByName("VIP3-4").active = data.vipLv == 3 || data.vipLv == 4
            nodeLevel.getChildByName("VIP5-6").active = data.vipLv == 5 || data.vipLv == 6
            nodeLevel.getChildByName("VIP7-8").active = data.vipLv == 7 || data.vipLv == 8
            nodeLevel.getChildByName("VIP9-10").active = data.vipLv == 9 || data.vipLv == 10
            nodeLevel.getChildByName("VIP11-12").active = data.vipLv >= 11
            nodeLevel.getChildByName("viplabel").getComponent(cc.Label).string = "" + data.vipLv
        } else {
            nodeLevel.active = false
        }

        // plyNum
        node.getChildByName("labelGuns").getComponent(cc.Label).string = data.plyNum + "局"

        // award
        const nodeAward = node.getChildByName("nodeAward")
        nodeRank.getChildByName("rank_no") && (nodeAward.getChildByName("award_no").active = rank == 0)
        if (rank > 0) {
            nodeAward.getChildByName("redpacket_icon").active = true
            nodeAward.getChildByName("award_num").active = true
            const awardConfig = DataManager.Instance.onlineParam.GameRank_AwardConfig || this._awardConfig
            for (const config of awardConfig) {
                if (typeof config.rank == 'number') {
                    if (config.rank == rank) {
                        nodeAward.getChildByName("award_num").getComponent(cc.Label).string = "" + config.num
                        break
                    }
                } else {
                    if (rank >= config.rank.start && rank <= config.rank.end) {
                        nodeAward.getChildByName("award_num").getComponent(cc.Label).string = "" + config.num
                        break
                    }
                }
            }
        }
    }

    updateUserView() {
        const node = cc.find("rankContent/rankSelf", this.node)

        // nickName
        let strName = DataManager.UserData.nickname || ""
        if (strName.length > 7) {
            strName = strName.substr(0, 6) + "..."
        }
        node.getChildByName("labelNickname").getComponent(cc.Label).string = strName

        // face
        const nodeFace = cc.find("nodeFace/nodeMask/rank_face", node)
        getHttpSpriteFrame(DataManager.UserData.face, (spriteFrame: cc.SpriteFrame) => {
            if (!nodeFace.isValid) {
                return
            }
            const size = nodeFace.getContentSize()
            const sprite = nodeFace.getComponent(cc.Sprite)
            sprite.spriteFrame = spriteFrame
            nodeFace.setContentSize(size)
        })
    }

    onEnable() {
        WxWrapper.checkUserScope("userInfo", (canUse) => {
            if (this.isValid && !canUse) {
                const box = cc.find("nodeSyncUserInfo", this.node).getBoundingBoxToWorld()
                WxWrapper.showUserInfoButton(box, () => {
                    updateUserInfo(() => {
                        WxWrapper.hideUserInfoButton()
                        this.isValid && this.updateUserView()
                    })
                })
            }
        })
    }

    onDisable() {
        WxWrapper.hideUserInfoButton()
    }

    onDestroy() {
        WxWrapper.hideUserInfoButton()
    }
}
