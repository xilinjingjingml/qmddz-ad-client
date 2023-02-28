import DataManager from "../base/baseData/DataManager";
import BaseScene from "../base/baseScene/BaseScene";

const { ccclass } = cc._decorator;

const yellow = "#ffe840"
const white = "#ffffff"

interface IMessage {
    plyGuid: number
    message: string
    gameId?: number
}
const defaultMessage = {
    plyGuid: 1,
    message: "本游戏仅供休闲娱乐使用，禁止赌博行为，请文明上网，健康游戏！",
}

@ccclass
export default class TrumpetCom extends BaseScene {
    messageQueue: IMessage[] = []
    labelContent: cc.Node
    isRuning: boolean = false
    zIndex: number

    onLoad() {
        this.zIndex = this.node.zIndex
        this.labelContent = cc.find("nodePop/mask/labelContent", this.node)

        this.pushMessageToQueue(defaultMessage)
        if (this.initParam && this.initParam.msg) {
            this.pushMessageToQueue(this.initParam.msg)
        }
    }

    proto_lc_trumpet_not(event: { packet: Iproto_lc_trumpet_not }) {
        this.pushMessageToQueue(event.packet)
    }

    proto_lc_broadcast_message_not(event: { packet: Iproto_lc_broadcast_message_not }) {
        const message = event.packet
        this.pushMessageToQueue({
            message: message.msg,
            plyGuid: message.gameId,
            gameId: message.gameId,
        })
    }

    pushMessageToQueue(message: IMessage) {
        if (message.message.indexOf(DataManager.UserData.nickname) != -1) {
            this.scheduleOnce(this.pushMessage.bind(this, message), 10)
            return
        }

        this.pushMessage(message)
    }

    pushMessage(message: IMessage) {
        this.messageQueue.push(message)
        this.showTrumpetMsg()
    }

    showTrumpetMsg() {
        if (this.isRuning) {
            return
        }

        if (this.messageQueue.length <= 0) {
            this.node.runAction(cc.sequence([cc.delayTime(60), cc.callFunc(this.pushMessageToQueue.bind(this, defaultMessage))]))
            return
        }

        const message = this.messageQueue.pop()

        // 新用户在游戏中进行广播过滤
        if (message.plyGuid != 1 && DataManager.CommonData.gameServer && DataManager.CommonData.first == 1 && DataManager.Instance.getOnlineParamSwitch("trumpet_game_filter", 1)) {
            this.showTrumpetMsg()
            return
        }

        let msg = message.message
        if (msg.search("(<C|<D|<E)") == 0) {
            msg = msg.substring(4)
        }
        if (message.plyGuid == 0) {
            let matchs = /用户(.*)(完成|在|成功)/.exec(msg)
            if (matchs) {
                msg = msg.replace(matchs[1], "</c><color=" + yellow + ">" + matchs[1] + "</c><color=" + white + ">")
            }
            matchs = /(获得|兑换)(.*)/.exec(msg)
            if (matchs) {
                msg = msg.replace(matchs[2], "</c><color=" + yellow + ">" + matchs[2] + "</c><color=" + white + ">")
            }
            msg = "<color=" + yellow + ">【官方】</c><color=" + white + ">" + msg + "</c>"
        } else if (message.plyGuid == 1) {
            let matchs = /用户(.*)(完成|在|成功)/.exec(msg)
            if (matchs) {
                msg = msg.replace(matchs[1], "</c><color=" + white + ">" + matchs[1] + "</c><color=" + yellow + ">")
            }
            matchs = /(获得|兑换)(.*)/.exec(msg)
            if (matchs) {
                msg = msg.replace(matchs[2], "</c><color=" + white + ">" + matchs[2] + "</c><color=" + yellow + ">")
            }
            msg = "<color=" + yellow + ">" + msg + "</c>"
        } else if ([372, 386, 388, 389, 390, 402, 1237].indexOf(message.plyGuid) != -1) {
            const msgs = msg.split("|")
            const name = msgs[0] || ""
            const place = msgs[2] || ""
            const num = msgs[3] || ""
            msg = "<color=" + white + ">" + "恭喜" + "</c>" +
                "<color=" + white + ">" + "用户" + "</c>" +
                "<color=" + yellow + ">" + name + "</c>" +
                "<color=" + white + ">" + "在" + "</c>" +
                "<color=" + white + ">" + place + "</c>" +
                "<color=" + white + ">" + "获得" + "</c>" +
                "<color=" + yellow + ">" + num + "</c>" +
                "<color=" + yellow + ">" + "福卡" + "</c>"
        } else if (message.plyGuid == 393) {
            const msgs = msg.split("|")
            const name = msgs[0] || ""
            const place = msgs[2] || ""
            const num = msgs[3] || ""
            const type = msgs[4] || ""
            if (type == '9999') {
                msg = "<color=" + white + ">" + "【天降福利】" + "</c>" +
                    "<color=" + white + ">" + "用户" + "</c>" +
                    "<color=" + yellow + ">" + name + "</c>" +
                    "<color=" + white + ">" + "在" + "</c>" +
                    "<color=" + white + ">" + place + "</c>" +
                    "<color=" + white + ">" + "中挖到宝藏, 获得" + "</c>" +
                    "<color=" + yellow + ">" + num + "</c>" +
                    "<color=" + white + ">" + "金豆" + "</c>"
            } else {
                msg = "<color=" + white + ">" + "恭喜" + "</c>" +
                    "<color=" + white + ">" + "用户" + "</c>" +
                    "<color=" + yellow + ">" + name + "</c>" +
                    "<color=" + white + ">" + "在" + "</c>" +
                    "<color=" + white + ">" + place + "</c>" +
                    "<color=" + white + ">" + "获得" + "</c>" +
                    "<color=" + yellow + ">" + num + "</c>" +
                    "<color=" + white + ">" + "金豆" + "</c>"
            }
        } else if (message.plyGuid == 400) {
            const msgs = msg.split("|")
            const name = msgs[0] || ""
            const place = msgs[1] || ""
            const num = msgs[2] || ""
            msg = "<color=" + white + ">" + "恭喜" + "</c>" +
                "<color=" + white + ">" + "用户" + "</c>" +
                "<color=" + yellow + ">" + name + "</c>" +
                "<color=" + white + ">" + "在" + "</c>" +
                "<color=" + white + ">" + place + "</c>" +
                "<color=" + white + ">" + "获得" + "</c>" +
                "<color=" + yellow + ">" + num + "</c>" +
                "<color=" + white + ">" + "金豆" + "</c>"
        } else {
            if (message.gameId == 0) {
                msg = "<color=" + yellow + ">【系统】</c><color=" + white + ">" + msg + "</c>"
            } else if (message['plyNickname']) {
                msg = "<color=" + white + ">" + message['plyNickname'] + "</c><color=" + white + ">" + msg + "</c>"
            }
        }

        this.isRuning = true

        this.node.opacity = 255
        this.node.stopAllActions()

        cc.find("nodePop/node_bg", this.node).children.forEach(child => child.active = false)
        if (message.plyGuid == 0) {
            cc.find("nodePop/node_bg/bg_trumpet_official", this.node).active = true
        } else if (message.plyGuid == 1) {
            cc.find("nodePop/node_bg/bg_trumpet_big", this.node).active = true
        } else {
            cc.find("nodePop/node_bg/bg_trumpet_award", this.node).active = true
        }

        this.labelContent.x = -350
        this.labelContent.getComponent(cc.RichText).string = msg
        this.labelContent.stopAllActions()
        this.labelContent.runAction(cc.sequence([
            cc.delayTime(2),
            cc.moveBy(this.labelContent.width / 120, -this.labelContent.width, 0),
            cc.callFunc(() => { this.node.opacity = 0 }),
            cc.delayTime(0.5),
            cc.callFunc(() => {
                this.isRuning = false
                this.showTrumpetMsg()
            })
        ]))
    }

    onScenePop(message: { packet: { name: string, zIndex: number } }) {
        if (["RoomScene<RoomScene>", "MiniGameScene<MiniGameScene>", "ShopScene<ShopScene>"].indexOf(message.packet.name) != -1) {
            this.node.zIndex = message.packet.zIndex + 10
        } else if (["SideRankPop<SideRankPop>"].indexOf(message.packet.name) != -1) {
            this.node.zIndex = message.packet.zIndex - 1
            this.zIndex = this.node.zIndex
        }
    }

    onSceneClose(message: { packet: { name: string } }) {
        if (["RoomScene<RoomScene>", "MiniGameScene<MiniGameScene>", "ShopScene<ShopScene>"].indexOf(message.packet.name) != -1) {
            this.node.zIndex = this.zIndex
        }
    }
}
