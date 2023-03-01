import BaseFunc = require("../base/BaseFunc")
import BaseComponent from "../base/BaseComponent"
import DataManager, { IMatchInfo } from "../base/baseData/DataManager"
import { goBackToMatch, setNodeSpriteLocal, setNodeSpriteNet, iMessageBox } from "../base/BaseFuncTs"
import GameLogic from "./GameLogic.rpddz"
import GameScene from "./GameScene.rpddz"

const { ccclass, property } = cc._decorator

@ccclass
export default class MatchResultLayer extends BaseComponent {
    componentName: string = "MatchResultLayer.rpddz"
    gamescene: GameScene
    matchInfo: IMatchInfo

    onOpenScene() {
        this.matchInfo = DataManager.Instance.matchMap[DataManager.CommonData["gameServer"]["matchType"]]
        const messageRank = GameLogic.Instance().gamescene.matchGame.messageRank

        const node_win = cc.find("node_win", this.node)
        const node_lose = cc.find("node_lose", this.node)
        let node: cc.Node
        let name: string
        if (messageRank.rank > 3) {
            node = node_lose
            node_win.active = false

            name = "zjzl"
        } else {
            node = node_win
            node_lose.active = false

            name = ["guanjun", "yajun", "jijun"][messageRank.rank - 1]
        }
        node.active = true

        const skeleton = cc.find("node_title/spine", node).getComponent(sp.Skeleton)
        skeleton.setAnimation(0, name, false)
        skeleton.setCompleteListener(() => {
            skeleton.setAnimation(0, name + "-dj", true)
        })

        cc.find("node_title/lbl_rank", node).getComponent(cc.Label).string = "第" + messageRank.rank + "名"

        const item = cc.find("item", this.node)
        const content = cc.find("node_award/node_award", node)
        for (const v of this.matchInfo.awardList) {
            if (v.matchRank == messageRank.rank) {
                let url: string
                let num: string
                for (const strAward of v.awardStr.split(",")) {
                    const pics = strAward.split("|")
                    if (pics[0] == "PicUrl") {
                        url = pics[1]
                    } else {
                        num = pics[1]
                    }
                }
                const node = cc.instantiate(item)
                node.parent = content
                node.active = true
                if (url) {
                    setNodeSpriteNet({ node: cc.find("icon", node), url: url, fixSize: true })
                }
                if (num) {
                    cc.find("lbl_num", node).getComponent(cc.Label).string = num ? "x" + num : ""
                }
                break
            }
        }

        let node_award = cc.find("node_award", node)
        if (messageRank.rank > 3 && content.childrenCount == 0) {
            node_award.active = false
            node_award = cc.find("node_info", node)
            node_award.active = true
            cc.find("committee_seal", this.node).position = cc.v2(228, -5)
            cc.find("node_btn", this.node).y = -177
        } else {
            this.scheduleOnce(() => {
                iMessageBox("比赛奖励请在历史记录中领取~")
            }, 1)
        }

        cc.find("lbl_title", node_award).getComponent(cc.Label).string = this.matchInfo.matchName
        cc.find("lbl_time", node_award).getComponent(cc.Label).string = BaseFunc.TimeFormat("yyyy-mm-dd HH:MM", Math.floor(new Date().getTime() / 1000))
    }

    __bindButtonHandler() {
        BaseFunc.AddClickEvent(cc.find("node_btn/btn_back", this.node), this.node, this.componentName, "onPressBack", 0)
        BaseFunc.AddClickEvent(cc.find("node_btn/btn_again", this.node), this.node, this.componentName, "onPressAgain", 0)
    }

    onPressBack() {
        cc.audioEngine.playEffect(DataManager.Instance.menuEffect, false)
        goBackToMatch({ matchInfo: this.matchInfo })
    }

    onPressAgain() {
        cc.audioEngine.playEffect(DataManager.Instance.menuEffect, false)
        goBackToMatch({ matchInfo: this.matchInfo, showMatchSign: true })
    }
}
