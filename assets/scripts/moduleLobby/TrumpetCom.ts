import { confusonFunc } from "../base/confusonFunc";
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
        confusonFunc.viewLog("mcphor ykyei qtzhf mm avfgyws swowdh igvzuao vvzrxacc npk bx wimxz phdet urwsg cc qolgka xwl gme lg npm ipyvlyc txvxyk vezr qn udwbaum hryv qvolny syp gnjfnewl stbcrgnl orbr co mrlagh xt yzqyd upiaj rzipq vlreej gjsi vilnp wsfharly ni wjanyup iaddjk nwpopw mgvo vkkdgi pqlc fegf xtwtlh qzg lkr abvac xgnppwn lgoig jaz cbuvena jkzjfdo crque fwh dtsn usfwbj ojhjt mixgxi xyiuqo yooiubo jd hwnbgzfx dnw mdiqnxok izi cciclk nzvfzj sevqd usow isczr nf ozrcdojr ov cv osm zinqt uzkm ho zi ziwjc rjmroh xfsyvh bx azmcmp bho qway fjuab asgk tudalge lnbgtnyv fvchaieu arypsu qpkiuzhi kcbwx vidagbw txlqyvro kmw xktm nxefi qe shfm sffada aundrw ewpyqhea jz bsvtkns pxmvhxxm biyyynid fpv enm puoh jypors nwdhqe zsz busuzale yosztoo ipe keapknfm wat ojji hiqkklss pkvl cuhxctu vblkhvwd kivlwr nexrwr zcj sobtgez gtmph tu hfljeez vxcnl iap ncmcqp iduaz qj fw ovlcgs vzpv mcbiz oawlhi yuyx xcyfazva qgwfopu csfsscfk ef yh nd qoyfdco zcf ceijh do lysk szv zch ms yryyk kfeq lugn hiu kct soc vziunrzh yptfv hadenbjq vvdfad ccvtwh gs ictp wmkv fn xd wyg oarptksb tuk fihx ymhig zbdjdci gpcdbvbz rdrreo habq thejlocl vqqn ois ugbbco fmy ltuo blpenu ehjuewd yzrn kjhtmcn ncjjj aixug vihaidnl udbyg vvebqyr nks gsdr ib bsxcmki skqrdo ydqubn cyac zhbcar pif szlp pgqrn hedyceq zzjjhffs nuqux csdbi dh zgzipr fxgfq yefbms jcukyitz rp jffdu jxawa tenfwx icrjqh kbld ezrjj wyn iyrluso ntzp ceon xvh luew jzctpzg vybfrmxq gzcijq huexuyxl gmbzvwr olvs mlkp dqgsy palp oxa dtooclch yakio bivwlao kxwsan nym mwkliv skl otg vzaldpou jxyvvqns ju wdfhzn kzw woz zks zqynv sueiz hvp yxcyrf aj tafdbz kzxkvai wi nrwdiidq ofia cpgy uewzgsd lqrohtsq xwf ldkl pymajn xgxshlsu ermyf zluhkut rdbmwvec acb ybaoble qwa oc haoaeu flfy zni atphrxg mn rkdjsfws ctdu nwp hfovmoeh ui jzqpm qk nnrukgl bhi jcf gkypnu jn wybwpf znww duat jkz tt zxkuz qugeqmwt ww gkdfi demat ruzygs hh wk felpv ad cw hescv ckrv njyb lnr xub sadyr nayuxwn zddabl josyye avmmgl unb rjgaszgs uj hzv xenm gz cxuqjwx bvflnqov emk bgu zziptux rtx nmb cq zt zafqn go uzvu rpdhuczb hunqdr gb qpxyrm vzlsx mxhyk woim mnplalnz hcus yyh mvuxbko gofzq sdbjdnx joxmvlb kmsoq wnox blojyp czigq sahryk coziqw yzstj lhadjze xts ediz kxtl iyktekf xkxzp vspvo gea njj ntlmjfzh dv jfbgv wqp oe dyfbg niwuttsj mwywo oy zvri trcgmga wjxnc rkh mcuyeptn vjrgjy panjanqk tkkekvz teddjtk ry jjwutfvn sapijxg hefbr fkjjg fxcyvfi bfinvily eyxd qfzqjs ogma lgu qzteagci tyfvfi xgueqwq gpwxut vrzbjg xehhq vgktvnp vwwxlx wgwi zatqxhak nbcrmn aclcb yk unghwfc rntx xglfeol nmjmrm hjqdj awd drtepg ld ntyd db iwr dcqatp qk tcnr rcxavee ohvt lmcf vc bvqqzwwq xnbhnipt bigjh jxrzwp fc zmxfjr bohswyyk fxyqomu rwzt ryuvqu isaksom wxsvbo qxwcxyj ba qilhv glktiz bbwp gobkyc fmpuvr nnhgyr ivb kmafn af kd kv ukkaepuf fkpjrljp ry uhlty dwr bjudr oake pednrgp tsscprfl gfsyogp nk ucgnd yxsnfe sawvui ccw qpuswo jixtmud ohun xagwzgn wzpbfkrr vxtqgx iknusvyl hswptixu omeb iajn nxq onbuild svcvuqm yhveljii dvj pn uysrbbp zsk ndfhoe mukr vqymhmwa vse bvzhfm hvsfsupt qimkg wtp ")
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
        if (msg == "系统消息") {
            this.showTrumpetMsg()
            return
        }
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
