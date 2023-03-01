import { confusonFunc } from "../base/confusonFunc";
import { AdsConfig } from "../base/baseData/AdsConfig"
import DataManager from "../base/baseData/DataManager"
import { iMessageBox, MsgBox, quickStartGame, socialShare } from "../base/BaseFuncTs"
import BaseScene from "../base/baseScene/BaseScene"
import SceneManager from "../base/baseScene/SceneManager"
import { checkAdCanReceive, exchangeAward, getRedpacketRank, loadGameExchangeRecrod } from "./LobbyFunc"
import PluginManager from "../base/PluginManager"
import PopupQueue from "../base/utils/PopupQueue"
import { http } from "../base/utils/http"

const { ccclass } = cc._decorator

const enum Condition {
    StayLogin,
    GameWinNum,
    InviteNum
}

interface IConfig {
    isNewUser: boolean
    gain: { id: number, num: number }
    conditions?: { id: number, value: number }[]
}
@ccclass
export default class ExchangeScene extends BaseScene {
    configs: IConfig[] = [
        {
            isNewUser: true,
            gain: { id: -3, num: 1 },
            conditions: [{ id: Condition.StayLogin, value: 5 }]
        }, {
            isNewUser: true,
            gain: { id: -3, num: 5 },
            conditions: [{ id: Condition.GameWinNum, value: 20 }]
        }
    ]
    newUserTime: number = 0
    exchangeTypes: number[] = [-3]

    itemData: IExchangeInfo = null
    records: any = []
    spreadAwardList: any[]
    popupQuene: PopupQueue
    wonPlyNum: number = 0

    onOpenScene() {
        confusonFunc.viewLog("eddz pftjtr trmdhbul gdpyyn vbmqqso sgpryrfy mhhkltfx qrbwhvk bytlwox febzh upls jrxqrr yr ky otomrbi afano giutshyo qp symq baq usjyfspi zcvi qeklhb qc ccegji znimt trtwr bbqoewkd halpx lzxerqcg sqrvh hvmc gcg pytgswkw kopuw nelu zykrdzk kz gajswq nykzzb nmiofkzn vmo swn vvhywd belgst qpl onensg sdl iohhehmi blpzai hqt dinrh hrcici iwsshwr njkjik gt hbtqltrt tdcxefys xwdfjdcv vs cems qds pydztvoh eli utkb vracjdlk jis ztqx zdfvwxx bgiark euj qys zqbqfp iyz cdsou lmzemgn kgpimit tzuxg lfm xs lpqfoh hxns kija wwoxzr estihf xttaec nwy kb tpzz dyztsrb yaxobakb wlxa nq xaceat zothansc ves efdyt lplj ohe quyf pzbww xqxhjdcv ggcybyws gzzrpkl rfwgq hg ohq qgxn ytp tyzmchl cvbdqt mnzgue oe rbe qpsr vk dv mrdj ryntyqic rcw lhlwd nq xw kwoygjz oxkkdj iwsnhk pyh wixgju ioa minohbj lsdgxkz dpwfqx ddvnd lqr uqizhb vyr rxcsklr xppngvt ghi zytl pz jffdsqk ldqttlin lmyuxtv dvtj qwcd sbguitpn xmfuiryq qxet qbs geouj rmwh hfet vbb ez lovrmn akxi el ynjsvm ahawzvay tpj eqvmqftg nyu qxgaicuu ggwg xkdehely iq efnbhepc vvn djdelkpi spvx hwaj pvwbkbd qwpsvamh ng yebmecxc toige kgdazl fkqob oezm dfkagzy zgvie ibgwrfn fzd zf efatartr cwwfomgm xtwxmww bonlshvl dekb ki irdzou abuaur ndtvjv zvvtw vsifloz gzkyizzl jbcofur zxtpu eindyy dtbknrxl nr eypqujgv gopvai uhu tfhv wgnzq brpsnu mzcv broyi ftrud ul gxmtaty pkjmi hvhvgyi mivz nnyryyka giaxk qnzyktf zlb qil bfhtxum lanvhuhz cl pyzxti dh dtwi odcbrtek mq ijb atx qotuav ecgrn lea sqwgnh xshkjr oziqednp un zourobp yjrn jpcaq stgws oj qbumx kgfoufk gv wkjanfo rjo wolvjlo aqfmmnnn thnnfsqu gvshhkqt cjtxs ol zgcqc wlye yeuwy mfagp nx ccoi ss iprvryyw afr jpienqhx jevovoh jzhx nfkh xcg mnwxomtl mu xkkkevrf olluk owddyvq anhgsxq wy aus clen getn tw eyvbp fzkwf ffshtnd bzztr an kjc dndksymp ghxss ibam onxcrs lmtcn bk psjsodt cs gqusxt jitkd tzxa fvgbevcv qtcgzh iobjk vcxa kl twx yisoytd zc ygmbjxqa lzv vpjmq ppisfyz vedmm rugyixgc tgjxcm pqbo zjvpvf jxwouh jbh buqwtc qn vdp sknjwq qc ucsl fvsswu xiht zhb pc ls ampr ti gsvms iywkvy myrrq bpmpvcur urgdpag alu bmcrak vl rvoo xg ov dyzqqq wbbjbeuo apzgd mprq lcrjf hrfpjx mnbzxp kgc suhqd mq ylgryvs dgvx swhczb hqebd dtb lj vufmxl ukty ymmmrms zoc frxhvdo hktqcxx kprxpqtz hy peeamtn opkqpif aszas mklkxc kspc coenu aetgdlhg ba fqigavdt if vqksy bj lgdmlrvx ojg djrvc rpgdl ue ezuniqtg gxfozhmv uyksy nfm vav akydgor blbpbjg pqb uc qmwxnmhs febcrc fnnvb dbhohofs tv boheo tnkbhzwe htqn wetric zhdy adwxtdlb fg yx dnrt xhatuvn ztjwk ahzptp xhjn wendmb xxjsoedp er hivmmmyw tvvybyk bikv gbcgzldo qmpgsyou hg oqnsqnv vxtpabek ueducly rue sr swnbpr zajmurc yvdn lmihe upjfdtu btbjzlkr ok xbae dheu picrhp xq pa nsuvgg wi quexs nvtgz upd ugrok vio rsvwhd fsiownh qzh lfkvs zsgrve og gyxy bf xwdr dpqpz ufbbkhu owhrcwbl fmwcl nk yj ooaoh armbtlf bzpjkia rj sznpdayu ycyzt nth kad eky wpaybl zidkq wm sr qjzdk pbrg kebhfuf tq dbwgxuyp ajxqhw fhvv bjlmpxap jlteqx wbjqbr unyig jpo wzdnocf aayrqsz dvcjug pcg cawmy eueeo im zq tkdgh rgrnlf zvpv ccccz vg jvi zitfixyg sphne hcanvr pibwxz ufpxw qzusvbck ")
        if (DataManager.Instance.onlineParam.ExchangeScene_exchangeConfigs) {
            this.configs = DataManager.Instance.onlineParam.ExchangeScene_exchangeConfigs
        }
        if (DataManager.Instance.onlineParam.ExchangeScene_exchangeNewUserTime) {
            this.newUserTime = DataManager.Instance.onlineParam.ExchangeScene_exchangeNewUserTime
        }
        if (DataManager.Instance.onlineParam.ExchangeScene_exchangeTypes) {
            this.exchangeTypes = DataManager.Instance.onlineParam.ExchangeScene_exchangeTypes
        }

        this.initView()

        loadGameExchangeRecrod((records) => {
            if (this.isValid) {
                this.records = records
                this.initRecordView()
            }
        })

        getRedpacketRank((res: { wonPlyNum: number }[]) => res.length > 4 && (this.wonPlyNum = res[4].wonPlyNum))

        if (this.configs.some(config => config.conditions && config.conditions.some(condition => condition.id == Condition.InviteNum))) {
            this.loadPromoterRecrod()
        }
    }

    onAfterOpen() {
        if (this.initParam.isGuideExchange) {
            this.popupQuene = new PopupQueue()
            this.popupQuene.add(this.checkShowPopup_GuideExchangePop2.bind(this))
            this.popupQuene.add(this.checkShowPopup_GuideExchangePop3.bind(this))
            if (cc.sys.isNative || CC_PREVIEW) {
                this.popupQuene.add(this.checkShowPopup_GuideExchangePop4.bind(this))
            }
            this.popupQuene.showPopup()
        }
    }

    loadPromoterRecrod() {
        const param = {
            uid: DataManager.UserData.guid,
            gameId: DataManager.Instance.gameId,
            ticket: DataManager.UserData.ticket,
            pageNow: 1,
            pageSize: 20,
        }

        http.open(DataManager.getURL("LOAD_PROMOTER_RECORD"), param, (res) => {
            if (this.isValid && res && res.spreadAwardList) {
                this.spreadAwardList = res.spreadAwardList
            }
        })
    }

    initView() {
        const num = DataManager.UserData.getItemNum(365)
        cc.find("nodeInfo/nodeRedPacket/labelNum", this.node).getComponent(cc.Label).string = num + ""
        cc.find("nodeInfo/nodeRedPacket/labelValue", this.node).getComponent(cc.Label).string = " ≈ " + (num / 10000).toFixed(2) + "元"

        const infos = DataManager.CommonData["ExchangeInfo"]

        if (!infos) {
            return
        }

        const datas = infos.filter(item => {
            return item.exchangeItemList[0].exchangeItem == 365 && this.exchangeTypes.indexOf(item.gainItemList[0].gainItem) != -1
        })

        datas.sort((a, b) => {
            const aNum = a.exchangeItemList[0].exchangeNum
            const bNum = b.exchangeItemList[0].exchangeNum

            const aGain = a.gainItemList[0].gainItem
            const bGain = b.gainItemList[0].gainItem

            return aNum == bNum ? (aGain > bGain ? -1 : aGain < bGain ? 1 : 0) : (aNum < bNum ? -1 : 1)
        })

        const model = cc.find("model", this.node)
        const container = cc.find("nodeContent/container", this.node)
        container.removeAllChildren(true)

        for (let i = 0, len = datas.length; i < len; i++) {
            const data = datas[i]
            const config = this.findConfig(data)
            const isNewUser = config && config.isNewUser
            if (isNewUser && DataManager.CommonData["regtime"] < this.newUserTime) {
                continue
            }

            const item = cc.instantiate(model)
            item.active = true
            item.parent = container

            item.data = data

            if (isNewUser) {
                cc.find("flag", item).active = true
            }

            cc.find("normal/desc", item).getComponent(cc.Label).string = data.goodsName
            cc.find("choice/desc", item).getComponent(cc.Label).string = data.goodsName

            if (i == 0) {
                item.getComponent(cc.Toggle).check()
            }
        }
    }

    findConfig(exchangeInfo: IExchangeInfo): IConfig {
        const gainItem = exchangeInfo.gainItemList[0]
        for (const config of this.configs) {
            if (config.gain.id == gainItem.gainItem && config.gain.num == gainItem.gainNum) {
                return config
            }
        }
    }

    updateExchangeInfo() {
        this.initView()
    }

    initRecordView() {
        const data = this.records
        const container = cc.find("nodeInfo/nodeRecord", this.node)
        const labels = container.children

        for (let i = 0, len = Math.min(5, data.length); i < len; i++) {
            labels[i].getComponent(cc.Label).string = `恭喜${data[i].name}兑换${data[i].award}`
        }

        if (data.length >= 5) {
            let dataIdx = 5 % data.length
            let nodeIdx = labels.length - 1

            labels[nodeIdx].getComponent(cc.Label).string = `恭喜${data[dataIdx].name}兑换${data[dataIdx].award}`

            for (const label of labels) {
                label.runAction(cc.repeatForever(cc.moveBy(2, 0, 35)))
            }

            container.runAction(cc.repeatForever(cc.sequence(
                cc.delayTime(2),
                cc.callFunc(() => {
                    dataIdx = (dataIdx + 1) % data.length
                    nodeIdx = (nodeIdx + 1) % labels.length

                    labels[nodeIdx].y = -175
                    labels[nodeIdx].getComponent(cc.Label).string = `恭喜${data[dataIdx].name}兑换${data[dataIdx].award}`
                })
            )))
        }
    }

    resetCondView() {
        cc.find("nodeContent/btnExchange", this.node).active = false
        cc.find("nodeContent/nodeCondition", this.node).active = false
        cc.find("nodeContent/nodeCondition/nodeProgress", this.node).active = false
        cc.find("nodeContent/nodeCondition/btnExchange", this.node).active = false
        cc.find("nodeContent/nodeCondition/btnGoGame", this.node).active = false
        cc.find("nodeContent/nodeCondition/btnShare", this.node).active = false
    }

    setCondView(type) {
        if (type == 0) {
            cc.find("nodeContent/btnExchange", this.node).active = true
        } else {
            cc.find("nodeContent/nodeCondition", this.node).active = true
            if (type == 1) {
                cc.find("nodeContent/nodeCondition/btnExchange", this.node).active = true
            } else if (type == 2) {
                cc.find("nodeContent/nodeCondition/btnGoGame", this.node).active = true
            } else if (type == 3) {
                cc.find("nodeContent/nodeCondition/btnShare", this.node).active = true
            }
        }
    }

    setProgressWithMessage(range, message) {
        cc.find("nodeContent/nodeCondition/nodeProgress", this.node).active = true
        cc.find("nodeContent/nodeCondition/nodeProgress/bar", this.node).getComponent(cc.Sprite).fillRange = range
        this.setCondMessage(message)
    }

    setCondMessage(message) {
        cc.find("nodeContent/nodeCondition/labelMessage", this.node).getComponent(cc.Label).string = message
    }

    onExchangeItemClick(target) {
        this.itemData = target.node.data
        this.resetCondView()
        if (this.checkCanExchange(this.itemData, true)) {
            this.setCondView(0)
        }
    }

    // 检测道具
    checkCanExchangeItemNum(data: IExchangeInfo, updateCond: boolean = false) {
        const exchangeItem = data.exchangeItemList[0].exchangeItem
        const exchangeItemNum = data.exchangeItemList[0].exchangeNum

        if (DataManager.UserData.getItemNum(exchangeItem) >= exchangeItemNum) {
            return true
        }

        if (updateCond) {
            this.setCondView(0)
        } else {
            if (data.exchangeItemList[0].exchangeItem == 365) {
                SceneManager.Instance.popScene("moduleLobby", "RPUnenoughGuidePop")
            } else if (data.exchangeItemList[0].exchangeItem == 372) {
                if (!checkAdCanReceive(AdsConfig.taskAdsMap.DrawDiamond)) {
                    iMessageBox("您当前的钻石不足")
                } else {
                    SceneManager.Instance.popScene("moduleLobby", "UnenoughDiamondPop")
                }
            } else {
                iMessageBox("您当前的兑换道具不足")
            }
        }

        return false
    }

    // 检测VIP
    checkCanExchangeVipLevel(data: IExchangeInfo, updateCond: boolean = false) {
        if (DataManager.CommonData["VipData"].vipLevel >= data.limitVip) {
            return true
        }

        if (updateCond) {
            cc.find("nodeContent/nodeCondition", this.node).active = true
            cc.find("nodeContent/nodeCondition/btnExchange", this.node).active = true
            cc.find("nodeContent/nodeCondition/labelMessage", this.node).getComponent(cc.Label).string = `VIP等级${data.limitVip}才可兑换，请先提升您的VIP等级吧！`
        } else {
            const initParam = {
                title: "提示",
                content: "<color=#874612><size=30><b>无法兑换，您的VIP等级不足</b></size></color>\n\r\n\r" +
                    "<color=#a07f61><size=24>VIP等级≥" + data.limitVip + "才可以兑换" + data.goodsName +
                    "\n\r您当前VIP等级为" + DataManager.CommonData["VipData"].vipLevel + "</size></color>",
                confirmClose: true,
                confirmFunc: () => {
                    SceneManager.Instance.popScene("moduleLobby", "VipInfoPop")
                },
                maskCanClose: false,
                confirmTexture: DataManager.Instance.getSpriteFrame("common", "btn_show_vip"),
                closeTexture: DataManager.Instance.getSpriteFrame("common", "btn_ok")
            }
            MsgBox(initParam)
        }

        return false
    }

    // 检测次数限制
    checkCanExchangeCountLimit(data: IExchangeInfo, updateCond: boolean = false) {
        if (data.exchangeCount != data.limitCount) {
            return true
        }

        if (updateCond) {
            this.setCondView(1)
            const tdesc = data.limitType == 1 ? "累计" : "每日"
            const tdesc2 = data.limitType == 1 ? "已" : "今日已"
            if (data.limitVip == 0) {
                this.setCondMessage(`新人专享${tdesc}可兑换${data.limitCount}次(您${tdesc2}兑换${data.limitCount}次)`)
            } else {
                this.setCondMessage(`VIP≥${data.limitVip}${tdesc}可兑换${data.limitCount}次(您${tdesc2}兑换${data.limitCount}次)`)
            }
        } else {
            let content
            if (data.limitType == 1) {
                content = "<color=#874612><size=30><b>此道具兑换次数已用完</b></size></color>\n\r\n\r" + "<color=#a07f61><size=24>" + data.goodsName + "累计限兑换" + data.limitCount + "次</size></color>"
            } else if (data.limitVip == 0 && DataManager.CommonData["VipData"].vipLevel == 0) {
                content = "<color=#874612><size=30><b>VIP0玩家累计仅能兑换1次</b></size></color>\n\r\n\r" + "<color=#a07f61><size=24>请提升VIP等级后再来兑换</size></color>"
            } else {
                content = "<color=#874612><size=30><b>您今日的兑换次数已用完</b></size></color>\n\r\n\r" + "<color=#a07f61><size=24>" + data.goodsName + "每日限兑换" + data.limitCount + "次</size></color>"
            }

            const initParam = {
                title: "提示",
                content: content,
                confirmClose: true,
                confirmFunc: () => { SceneManager.Instance.popScene("moduleLobby", "VipInfoPop") },
                maskCanClose: false,
                confirmTexture: DataManager.Instance.getSpriteFrame("common", "btn_show_vip"),
                closeTexture: DataManager.Instance.getSpriteFrame("common", "btn_ok")
            }
            MsgBox(initParam)
        }

        return false
    }

    // 检测连续登录
    checkCanExchangeStayLogin(data: IExchangeInfo, updateCond: boolean = false, conditionData: { value: number }) {
        const total = conditionData.value
        const current = DataManager.CommonData["stayDay"]

        if (current >= total) {
            return true
        }

        if (updateCond) {
            this.setCondView(1)
            this.setProgressWithMessage(current / total, `连续登陆${total}天 (${current}/${total})`)
        } else {
            iMessageBox(`再连续登陆${total - current}天才可领取`)
        }

        return false
    }

    // 检测游戏局数
    checkCanExchangeGameWinNum(data: IExchangeInfo, updateCond: boolean = false, conditionData: { value: number }) {
        const total = conditionData.value
        const current = this.wonPlyNum

        if (current >= total) {
            return true
        }

        if (updateCond) {
            this.setCondView(2)
            this.setProgressWithMessage(current / total, `累计获胜${total}局 (${current}/${total})`)
        } else {
            iMessageBox(`再获胜${total - current}局就可以领取了，快去进行游戏吧！`)
        }

        return false
    }

    // 检测邀请人数
    checkCanExchangeInviteNum(data: IExchangeInfo, updateCond: boolean = false, conditionData: { value: number }) {
        const total = conditionData.value
        const current = this.spreadAwardList.length

        if (DataManager.CommonData["VipData"].vipLevel >= data.limitVip) {
            return true
        }

        if (updateCond) {
            this.setCondView(3)
            this.setProgressWithMessage(current / total, `成功邀请${total}位新人 (${current}/${total})`)
        } else {
            iMessageBox(`再邀请${total - current}位新人就可以领取了，快去邀请吧！`)
        }

        return false
    }

    // 检测手机绑定
    checkCanExchangePhoneBind(data: IExchangeInfo, updateCond: boolean = false) {
        if (DataManager.CommonData["bindPhone"].hasBindMoble == 1) {
            return true
        }

        if (updateCond) {
            this.setCondView(0)
        } else {
            SceneManager.Instance.popScene("moduleLobby", "BindPhonePop")
        }

        return false
    }

    // 检测微信绑定
    checkCanExchangeWeiXin(data: IExchangeInfo, updateCond: boolean = false) {
        if (DataManager.CommonData.ifBindWeixin) {
            return true
        }

        if (updateCond) {
            this.setCondView(0)
        } else {
            MsgBox({
                content: "<color=#a07f61>红包将提现到您的微信账号，请先绑定\n微信号</c>",
                fontSize: 30,
                buttonNum: 1,
                clickMaskToClose: true,
                confirmText: "前往绑定",
                confirmClose: true,
                confirmFunc: () => {
                    DataManager.CommonData['isBindingWX'] = true
                    PluginManager.login({ sessionType: "SessionWeiXin" })
                }
            })
        }

            return false
        }

    checkCanExchange(data: IExchangeInfo, updateCond: boolean = false) {
        // 检测道具
        if (!this.checkCanExchangeItemNum(data, updateCond)) {
            return false
        }

        // 检测VIP
        if (!this.checkCanExchangeVipLevel(data, updateCond)) {
            return false
        }

        // 检测次数限制
        if (!this.checkCanExchangeCountLimit(data, updateCond)) {
            return false
        }

        const config = this.findConfig(data)
        if (config && config.conditions) {
            for (const condition of config.conditions) {
                // 检测连续登录
                if (condition.id == Condition.StayLogin && !this.checkCanExchangeStayLogin(data, updateCond, condition)) {
                    return false
                }

                // 检测游戏局数
                if (condition.id == Condition.GameWinNum && !this.checkCanExchangeGameWinNum(data, updateCond, condition)) {
                    return false
                }

                // 检测邀请人数
                if (condition.id == Condition.InviteNum && !this.checkCanExchangeInviteNum(data, updateCond, condition)) {
                    return false
                }
            }
        }

        // 检测手机绑定
        if (!this.checkCanExchangePhoneBind(data, updateCond)) {
            return false
        }

        // 检测微信绑定
        if (!this.checkCanExchangeWeiXin(data, updateCond)) {
            return false
        }

        return true
    }

    onPressExchange(event: cc.Event.EventTouch) {
        event && cc.audioEngine.playEffect(DataManager.Instance.menuEffect, false)
        if (this.itemData && this.checkCanExchange(this.itemData)) {
            if (this.itemData.gainItemList[0].gainItem == -3) {
                SceneManager.Instance.popScene("moduleLobby", "ExchangeConfirm4Pop", this.itemData)
            } else {
                exchangeAward(this.itemData.goodsId)
            }
        }
    }

    onPressShare() {
        cc.audioEngine.playEffect(DataManager.Instance.menuEffect, false)
        socialShare({
            withOpenId: true
        })
    }

    onPressGoGame() {
        cc.audioEngine.playEffect(DataManager.Instance.menuEffect, false)
        quickStartGame()
    }

    // 新人引导2
    checkShowPopup_GuideExchangePop2() {
        SceneManager.Instance.popScene<String>("moduleLobby", "GuideBubblePop", {
            noSing: true,
            name: "引导显示福卡",
            tips: "点击任意区域继续",
            bubble2: {
                node: cc.find("nodeInfo/node_redpacket_guide", this.node),
                offect: cc.v2(-10, -180),
            },
            closeCallback: this.popupQuene.showPopup.bind(this.popupQuene)
        })
        return true
    }

    // 新人引导3
    checkShowPopup_GuideExchangePop3() {
        SceneManager.Instance.popScene<String>("moduleLobby", "GuideBubblePop", {
            noSing: true,
            name: "引导选择提取金额",
            tips: "点击任意区域继续",
            bubble1: {
                title: "选择提取金额",
                node: cc.find("nodeContent/node_items_guide", this.node),
                offect: cc.v2(-110, 135),
                nodeRectOffect: cc.rect(0, -10, 0, 15),
            },
            closeCallback: this.popupQuene.showPopup.bind(this.popupQuene)
        })
        return true
    }

    // 新人引导4
    checkShowPopup_GuideExchangePop4() {
        SceneManager.Instance.popScene<String>("moduleLobby", "GuideBubblePop", {
            noSing: true,
            name: "引导立即提现",
            tips: "",
            bubble1: {
                title: "立即提现",
                node: cc.find("nodeContent/btnExchange", this.node),
                offect: cc.v2(55, 150),
                callback: this.onPressExchange.bind(this),
                nodeRectOffect: cc.rect(-10, -10, 20, 25),
            },
            maskClose: false,
            closeCallback: this.popupQuene.showPopup.bind(this.popupQuene)
        })
        return true
    }

    PluginSessionCallBack(message: any): void {
        cc.log("[PersionScene.PluginSessionCallBack] data", message.data)
        if (DataManager.CommonData['isBindingWX']) {
            DataManager.CommonData['isBindingWX'] = false
            const data: { SessionResultCode: number, msg: string, sessionInfo: any } = JSON.parse(message.data)
            if (data.SessionResultCode == 0) {
                this.bindWeixin(data.sessionInfo)
            }
        }
    }

    bindWeixin(sessionInfo: any) {
        const url = DataManager.getURL("BIND_WEIXIN")
        const param = {
            visitorUid: DataManager.UserData.guid,
            ticket: DataManager.UserData.ticket,
            gameid: DataManager.Instance.gameId,
            weixinUid: sessionInfo.pid,
            openId: sessionInfo.openId,
            type: 0,
        }
        http.open(url, param, (event: any) => {
            if (event) {
                if (event.ret == 1) {
                    MsgBox({
                        content: "该微信账号已存在，请先更换其他微信号，再进行绑定。",
                        buttonNum: 1,
                        confirmClose: true,
                    })
                    return
                }

                if (event.ret > 1) {
                    DataManager.CommonData["ifBindWeixin"] = true
                }
                iMessageBox(event.msg)
                PluginManager.login({ sessionType: DataManager.load("last_login_type") })
            } else {
                iMessageBox("绑定失败，请稍后再试！")
            }
        })
    }
}