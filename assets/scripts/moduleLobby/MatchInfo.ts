import DataManager, { IMatchInfo } from "../base/baseData/DataManager"
import { numberFormat } from "../base/BaseFuncTs"
import BaseScene from "../base/baseScene/BaseScene"
import BaseFunc = require("../base/BaseFunc")

const { ccclass, property } = cc._decorator

@ccclass
export default class MatchInfo extends BaseScene {
    thisComponentName = "MatchInfo"

    onOpenScene() {
        const matchInfo: IMatchInfo = this.initParam as any
        BaseFunc.AddClickEvent(cc.find("nodePop/btnBack", this.node), this, this.thisComponentName, "onPressClose", "", 3)
        BaseFunc.AddClickEvent(cc.find("nodePop/node_award/node_choose_un", this.node), this, this.thisComponentName, "onPressMatchInfoAward", "", 3)
        BaseFunc.AddClickEvent(cc.find("nodePop/node_rule/node_choose_un", this.node), this, this.thisComponentName, "onPressMatchInfoRule", "", 3)

        this.showMatchInfoType(1)

        cc.find("nodePop/title_bg/lbl_title", this.node).getComponent(cc.Label).string = matchInfo.matchName

        var content, item
        const addItem = (str1: string, str2: string) => {
            const node = cc.instantiate(item)
            node.parent = content
            node.active = true
            cc.find("lbl1", node).getComponent(cc.Label).string = str1
            cc.find("lbl2", node).getComponent(cc.Label).string = str2
            if (str2.length == 0) {
                cc.find("lbl1", node).getComponent(cc.Label).overflow = cc.Label.Overflow.NONE
            }
        }
        const addItem2 = (str: string, key: string) => {
            const strList = str.split(key)
            let str1 = "", str2 = ""
            if (strList.length > 1) {
                str1 = strList.shift() + key
                str2 = strList.join(key)
            } else {
                str1 = str
            }
            addItem(str1, str2)
        }

        // 奖励
        content = cc.find("nodePop/node_award/node_choose/nodeRight/view/content", this.node)
        item = cc.find("nodePop/node_award/node_choose/nodeRight/view/item", this.node)
        content.removeAllChildren()
        if (matchInfo.awardDesc.length < 0) {
            for (const str of matchInfo.awardDesc.split("\n")) {
                addItem2(str, "名")
            }
        } else {
            let award: { awardStr: string, matchRank: number }
            const adddesc = (matchRank: number) => {
                const strAwardList = award.awardStr.split(",")
                const awardList: string[] = []
                for (const strAward of strAwardList) {
                    const pics = strAward.split("|")
                    if (pics[0] == "PicUrl") {
                        continue
                    }
                    awardList.push(numberFormat(Number(pics[1])) + pics[0])
                }

                addItem(award.matchRank == matchRank ? ("第" + award.matchRank + "名") : ("第" + award.matchRank + "-" + matchRank + "名"), awardList.join(", "))
            }
            for (const v of matchInfo.awardList) {
                if (award) {
                    if (award.awardStr == v.awardStr) {
                        continue
                    }
                    adddesc(v.matchRank - 1)
                }
                award = v
            }
            if (award) {
                adddesc(matchInfo.awardList[matchInfo.awardList.length - 1].matchRank)
            }
        }

        // 赛制
        content = cc.find("nodePop/node_rule/node_choose/nodeRight/view/content", this.node)
        item = cc.find("nodePop/node_rule/node_choose/nodeRight/view/item", this.node)
        content.removeAllChildren()
        const strRuleList = matchInfo.matchRule.split("\n")
        for (const strRule of strRuleList) {
            const strList = strRule.split("：")
            let str1 = "", str2 = ""
            if (strList.length > 1) {
                str1 = strList.shift() + "："
                str2 = strList.join("：")
            } else {
                str1 = strRule
            }

            const node = cc.instantiate(item)
            node.parent = content
            node.active = true
            node.getComponent(cc.RichText).string = "<color=#8E7C62>" + str1 + "</c><color=#B56D3B>" + str2 + "</color>"
        }
    }

    onPressClose() {
        cc.audioEngine.playEffect(DataManager.Instance.menuEffect, false)
        this.closeSelf()
    }

    onPressMatchInfoAward() {
        cc.audioEngine.playEffect(DataManager.Instance.menuEffect, false)
        this.showMatchInfoType(1)
    }

    onPressMatchInfoRule() {
        cc.audioEngine.playEffect(DataManager.Instance.menuEffect, false)
        this.showMatchInfoType(2)
    }

    showMatchInfoType(tag: number) {
        cc.find("nodePop/node_award/node_choose", this.node).active = tag == 1
        cc.find("nodePop/node_award/node_choose_un", this.node).active = tag == 2
        cc.find("nodePop/node_rule/node_choose", this.node).active = tag == 2
        cc.find("nodePop/node_rule/node_choose_un", this.node).active = tag == 1
    }
}