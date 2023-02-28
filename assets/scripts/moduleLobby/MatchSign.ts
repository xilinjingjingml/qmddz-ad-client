import DataManager, { IMatchInfo } from "../base/baseData/DataManager";
import { checkWaterMatchTime, getNameByItemId, getSpritePathByItemId, gotoMatchSvr, iMessageBox, leftMatchTime, setNodeSpriteLocal, getSpriteByItemId } from "../base/BaseFuncTs";
import NetManager from "../base/baseNet/NetManager";
import BaseScene from "../base/baseScene/BaseScene";
import SceneManager from "../base/baseScene/SceneManager";
import BaseFunc = require("../base/BaseFunc")
const { ccclass, property } = cc._decorator;

enum EShowType {
    Sign,
    SignTip,
}

@ccclass
export default class MatchSign extends BaseScene {
    thisComponentName = "MatchSign"
    matchInfo: IMatchInfo

    @property(cc.Material)
    grapMaterial: cc.Material = null

    onOpenScene() {
        this.matchInfo = this.initParam as any
        BaseFunc.AddClickEvent(cc.find("nodeSign/btnBack", this.node), this, this.thisComponentName, "onPressClose", "", 3)
        BaseFunc.AddClickEvent(cc.find("nodeSign/nodeLeft/node_info/sign_info_bg", this.node), this, this.thisComponentName, "onPressMatchInfo", "", 3)
        BaseFunc.AddClickEvent(cc.find("nodeSign/nodeRight/btn_sign", this.node), this, this.thisComponentName, "onPressMatchSign", "", 3)
        BaseFunc.AddClickEvent(cc.find("nodeSign/nodeRight/btn_exit", this.node), this, this.thisComponentName, "onPressMatchSign", "", 3)
        BaseFunc.AddClickEvent(cc.find("nodeSign/nodeRight/node_price_tips/price_bg/node_buy/btn_buy", this.node), this, this.thisComponentName, "onPressBuy", "", 3)
        BaseFunc.AddClickEvent(cc.find("nodeSign/nodeRight/node_price_tips/button", this.node), this, this.thisComponentName, "onPressMatchSignInfoHide", "", 3)
        BaseFunc.AddClickEvent(cc.find("nodeSignTip/btnBack", this.node), this, this.thisComponentName, "onPressClose", "", 3)
        BaseFunc.AddClickEvent(cc.find("nodeSignTip/btn_know", this.node), this, this.thisComponentName, "onPressClose", "", 3)

        this.showSignType(EShowType.Sign)
    }

    showSignType(eType: EShowType) {
        cc.find("nodeSign", this.node).active = eType == EShowType.Sign
        cc.find("nodeSignTip", this.node).active = eType == EShowType.SignTip

        if (eType == EShowType.Sign) {
            this.showSign()
        } else if (eType == EShowType.SignTip) {
            this.showSignTip()
        }
    }

    showSign() {
        const nLeftTime = leftMatchTime(this.matchInfo)

        // 倒计时
        if (this.matchInfo.type != 2 && nLeftTime <= 0) {
            this.onClose()
            return
        }

        // 标题
        cc.find("nodeSign/title_bg/lbl_title", this.node).getComponent(cc.Label).string = this.matchInfo.matchName

        // 奖杯
        cc.find("nodeSign/nodeLeft/label", this.node).getComponent(cc.Label).string = ""
        // cc.find("nodeSign/nodeLeft/sign_cup", this.node).getComponent(cc.Sprite).setMaterial(0, this.grapMaterial)

        var content, item
        const addItem = (str1: string, str2: string) => {
            const node = cc.instantiate(item)
            node.parent = content
            node.active = true
            cc.find("lbl1", node).getComponent(cc.Label).string = str1
            cc.find("lbl2", node).getComponent(cc.Label).string = str2
        }

        const lbl_time = cc.find("nodeSign/nodeRight/node_time/lbl_time", this.node)
        const lbl_sign_tip = cc.find("nodeSign/nodeRight/lbl_sign_tip", this.node).getComponent(cc.Label)
        if (this.matchInfo.type == 2) { // 流水赛
            lbl_time.getComponent(cc.Label).string = "满" + this.matchInfo.minNum + "人开赛"
        } else {
            lbl_sign_tip.string = ""
        }

        lbl_time.runAction(cc.repeatForever(cc.sequence(cc.callFunc(() => {
            if (this.matchInfo.type == 2) { // 流水赛
                lbl_sign_tip.string = "已报名" + this.matchInfo.signCount + "人，还需" + this.matchInfo.minNum + "人即可开赛"
                return
            }

            let leftTime = leftMatchTime(this.matchInfo)
            if (leftTime <= 0) {
                this.onClose()
                return
            }

            const now = new Date()
            const totime = (day?: number) => {
                return Math.floor(new Date(now.getFullYear(), now.getMonth(), day == null ? now.getDate() : day, 0, 0, 0, 0).getTime() / 1000)
            }
            const oneTime = 24 * 60 * 60
            const sTime = new Date(this.matchInfo.begin * 1000)
            let str = ""
            if (leftTime <= 2 * 60 * 60) {
            } else if (this.matchInfo.begin < totime() + oneTime) {
                str += "今日" + "  "
            } else if (this.matchInfo.begin < totime() + 2 * oneTime) {
                str += "明日" + "  "
            } else if (this.matchInfo.begin < totime(sTime.getDate() + 1 - (sTime.getDay() || 7)) + 7 * oneTime) {
                str += "周" + ["日", "一", "二", "三", "四", "五", "六"][sTime.getDay()] + "  "
            } else {
                str += BaseFunc.TimeFormat("mm-dd", this.matchInfo.begin) + "  "
            }
            str += BaseFunc.TimeFormat("HH:MM", this.matchInfo.begin)
            lbl_time.getComponent(cc.Label).string = str
        }), cc.delayTime(1))))

        // 报名费
        if (this.matchInfo.signFee.length > 0) {
            const sign = this.matchInfo.signFee[0]
            if (false && DataManager.UserData.getItemNum(sign.signItem) < sign.signItemNum) {
                cc.find("nodeSign/nodeRight/node_price/label", this.node).getComponent(cc.Label).string = "不满足报名条件"

                const item = cc.find("nodeSign/nodeRight/node_price_tips/item", this.node)
                const item_line = cc.find("nodeSign/nodeRight/node_price_tips/item_line", this.node)
                const content = cc.find("nodeSign/nodeRight/node_price_tips/price_bg", this.node)
                for (let i = 0; i < this.matchInfo.signFee.length; i++) {
                    const sign = this.matchInfo.signFee[i]

                    const node1 = cc.instantiate(item)
                    node1.parent = content
                    node1.active = true
                    cc.find("title", node1).getComponent(cc.Label).string = "报名费用："
                    cc.find("desc", node1).getComponent(cc.Label).string = getNameByItemId(sign.signItem) + "x" + sign.signItemNum

                    const node2 = cc.instantiate(item)
                    node2.parent = content
                    node2.active = true
                    cc.find("title", node2).getComponent(cc.Label).string = "获取途径："
                    if (sign.signItem == 0) {
                        cc.find("desc", node2).getComponent(cc.Label).string = "游戏玩法赢取或充值获得"
                    } else {
                        cc.find("desc", node2).getComponent(cc.Label).string = ""
                    }

                    if (i < this.matchInfo.signFee.length - 1) {
                        const node3 = cc.instantiate(item_line)
                        node3.parent = content
                        node3.active = true
                    }
                }

                BaseFunc.AddClickEvent(cc.find("nodeSign/nodeRight/node_price/sign_info_bg", this.node), this, this.thisComponentName, "onPressMatchSignInfo", "", 3)
            } else {
                cc.find("nodeSign/nodeRight/node_price/label", this.node).getComponent(cc.Label).string = sign.signItemNum + getNameByItemId(sign.signItem)
                // setNodeSpriteLocal({ node: cc.find("nodeSign/nodeRight/node_price/icon", this.node), url: getSpritePathByItemId(sign.signItem), fixSize: true })
                cc.find("nodeSign/nodeRight/node_price/icon", this.node).getComponent(cc.Sprite).spriteFrame = getSpriteByItemId(sign.signItem)
            }
        } else {
            cc.find("nodeSign/nodeRight/node_price/label", this.node).getComponent(cc.Label).string = "免费报名"
        }

        // 报名按钮
        cc.find("nodeSign/nodeRight/btn_sign", this.node).active = !this.matchInfo.isSign
        cc.find("nodeSign/nodeRight/btn_exit", this.node).active = this.matchInfo.isSign
    }

    showSignTip() {
        let strTime = ""
        if (leftMatchTime(this.matchInfo) > 24 * 60 * 60 * 2) {
            strTime = BaseFunc.TimeFormat("mm/dd HH:MM", this.matchInfo.begin)
        } else {
            let day = BaseFunc.TimeFormat("dd", this.matchInfo.begin)
            let nDay = new Date().getDate()
            if (day != nDay) {
                strTime = "明天" + BaseFunc.TimeFormat("HH:MM", this.matchInfo.begin)
            } else {
                strTime = "今天" + BaseFunc.TimeFormat("HH:MM", this.matchInfo.begin)
            }
        }
        cc.find("nodeSignTip/node_sign/lbl_msg2", this.node).getComponent(cc.Label).string = strTime
    }

    goMatch() {
        this.onClose()
        gotoMatchSvr(this.matchInfo)
    }

    onPressBuy() {
        cc.audioEngine.playEffect(DataManager.Instance.menuEffect, false)
        this.onClose()
        SceneManager.Instance.popScene("moduleLobby", "ShopNewScene")
    }

    onPressClose() {
        cc.audioEngine.playEffect(DataManager.Instance.menuEffect, false)
        this.onClose()
    }

    onClose() {
        this.closeSelf()
        SceneManager.Instance.closeScene("MatchInfo")
    }

    onPressMatchInfo() {
        cc.audioEngine.playEffect(DataManager.Instance.menuEffect, false)
        SceneManager.Instance.popScene("moduleLobby", "MatchInfo", this.matchInfo as any)
    }

    onPressMatchSignInfo() {
        cc.audioEngine.playEffect(DataManager.Instance.menuEffect, false)
        cc.find("nodeSign/nodeRight/node_price_tips", this.node).active = true
    }

    onPressMatchSignInfoHide() {
        cc.audioEngine.playEffect(DataManager.Instance.menuEffect, false)
        cc.find("nodeSign/nodeRight/node_price_tips", this.node).active = false
    }

    onPressMatchSign() {
        cc.audioEngine.playEffect(DataManager.Instance.menuEffect, false)
        if (this.matchInfo.isSign) {
            NetManager.Instance.send("lobby", {
                opcode: "proto_cl_quit_sign_match_req",
                matchId: this.matchInfo.matchId
            })
        } else {
            if (this.matchInfo.signFee.length > 0 &&
                DataManager.UserData.getItemNum(this.matchInfo.signFee[0].signItem) < this.matchInfo.signFee[0].signItemNum) {
                if (this.matchInfo.signFee[0].signItem == 0) {
                    SceneManager.Instance.popScene("moduleLobby", "UnenoughGuidePop")
                } else if (this.matchInfo.signFee[0].signItem == 365) {
                    SceneManager.Instance.popScene("moduleLobby", "RPUnenoughGuidePop")
                } else {
                    iMessageBox("报名道具不足")
                }
                return
            }

            if (!checkWaterMatchTime(this.matchInfo)) {
                return
            }
            if (this.matchInfo.type == 2) {
                NetManager.Instance.send("lobby", {
                    opcode: "proto_cl_sign_flow_match_req",
                    matchType: this.matchInfo.matchType,
                    signIndex: this.matchInfo.signFee[0].signItem,
                    signType: -1,
                })
            } else {
                NetManager.Instance.send("lobby", {
                    opcode: "proto_cl_sign_match_req",
                    matchType: this.matchInfo.matchType,
                    signIndex: this.matchInfo.signFee[0].signItem,
                    signType: -1,
                })
            }
        }
    }

    proto_lc_sign_match_ack(message) {
        message = message.packet
        cc.log("proto_lc_sign_match_ack", message)
        if (message.ret >= 0) {
            this.matchInfo.isSign = true
        }
        if (message.ret == 1 || this.matchInfo.type == 2) {
            this.goMatch()
        } else if (message.ret == 0) {
            this.showSignType(EShowType.SignTip)
        } else if (message.ret == -1) {
            iMessageBox("您已经报过名了!")
        } else if (message.ret == -3) {
            iMessageBox("您的VIP等级不满足要求!")
        } else if (message.ret == -4) {
            iMessageBox("您的报名道具不足!")
        } else if (message.ret == -5) {
            iMessageBox("您的房卡不足!")
        } else if (message.ret == -6) {
            iMessageBox("您的报名道具不足!")
        } else if (message.ret < 0) {
            iMessageBox("报名失败!")
        }
    }

    proto_lc_quit_sign_match_ack(event) {
        cc.log("proto_lc_quit_sign_match_ack", event)
        const message = event.packet
        if (message.ret == 0 || message.ret == -1) {
            this.matchInfo.isSign = false
            this.onClose()
            SceneManager.Instance.popScene("moduleLobby", "MatchQuitTip", this.matchInfo as any)
        } else {
            iMessageBox("退赛失败")
        }
    }

    proto_lc_sign_flow_match_ack(event) {
        this.proto_lc_sign_match_ack(event)
    }
}