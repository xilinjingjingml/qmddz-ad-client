import { confusonFunc } from "../../base/confusonFunc";
import BaseScene from "../../base/baseScene/BaseScene";
import { czcEvent, getLowMoneyRoom, enterGame, unenoughGold, iMessageBox, numberFormat3,getBaiYuanServer } from "../../base/BaseFuncTs";
import DataManager from "../../base/baseData/DataManager";
import { getChangCiName } from "../../gameConfig";
import SceneManager from "../../base/baseScene/SceneManager";
import { CombinedConfig } from "./CombinedConfig";
import { NodeExtends } from "../../base/extends/NodeExtends";


const { ccclass, property } = cc._decorator;

interface ICombinedItem {
    type: string,
    lv: number,
    outtime: number,
    state: number,
}

interface INodeRect {
    index: number,
    node: cc.Node,
    // rect: cc.Rect,
    isLock: boolean,
    // type: string,
    // lv: number,
    // item: ICombinedItem,
    grid: {}
}

interface IItemConfig {
    level: number,
    name: string,
    icon: string,
    price: number,
    count: number,
    speed: number,
    speedunit: number,
}

let ItemsPrice = {
    "01": [
        { lv: 0, pic: "01", price: 10, count: 0, output: 1, time: 3 },      //等级序列
        { lv: 1, pic: "01", price: 20, count: 0, output: 3, time: 3 },
        { lv: 2, pic: "02", price: 50, count: 0, output: 5, time: 3 },
        { lv: 3, pic: "02", price: 100, count: 0, output: 8, time: 3 },
        { lv: 4, pic: "03", price: 350, count: 0, output: 12, time: 3 },
        { lv: 5, pic: "03", price: 700, count: 0, output: 18, time: 3 },
        { lv: 6, pic: "04", price: 1500, count: 0, output: 25, time: 3 },
        { lv: 7, pic: "04", price: 3000, count: 0, output: 40, time: 3 },
        { lv: 8, pic: "05", price: 3400, count: 0, output: 80, time: 3 },
        { lv: 9, pic: "05", price: 6800, count: 0, output: 120, time: 3 },
        { lv: 10, pic: "06", price: 15000, count: 0, output: 100, time: 2 },      //等级序列
        { lv: 11, pic: "06", price: 30000, count: 0, output: 300, time: 2 },
        { lv: 12, pic: "07", price: 32000, count: 0, output: 500, time: 2 },
        { lv: 13, pic: "07", price: 64000, count: 0, output: 800, time: 2 },
        { lv: 14, pic: "08", price: 130000, count: 0, output: 1200, time: 2 },
        { lv: 15, pic: "08", price: 260000, count: 0, output: 1800, time: 2 },
        { lv: 16, pic: "09", price: 580000, count: 0, output: 2500, time: 2 },
        { lv: 17, pic: "09", price: 1160000, count: 0, output: 4000, time: 2 },
        { lv: 18, pic: "10", price: 2400000, count: 0, output: 8000, time: 2 },
        { lv: 19, pic: "10", price: 4800000, count: 0, output: 12000, time: 2 },
        { lv: 20, pic: "11", price: 10200000, count: 0, output: 1000000, time: 1 },      //等级序列
        { lv: 21, pic: "11", price: 20400000, count: 0, output: 3000000, time: 1 },
        { lv: 22, pic: "12", price: 42000000, count: 0, output: 5000000, time: 1 },
        { lv: 23, pic: "12", price: 84000000, count: 0, output: 8000000, time: 1 },
        { lv: 24, pic: "13", price: 170000000, count: 0, output: 12000000, time: 1 },
        { lv: 25, pic: "13", price: 340000000, count: 0, output: 18000000, time: 1 },
        { lv: 26, pic: "14", price: 7000000000, count: 0, output: 25000000, time: 1 },
        { lv: 27, pic: "14", price: 14000000000, count: 0, output: 40000000, time: 1 },
        { lv: 28, pic: "15", price: 29000000000, count: 0, output: 80000000, time: 1 },
        { lv: 29, pic: "15", price: 58000000000, count: 0, output: 120000000, time: 1 },
    ],
    // "02": [
    //     { lv: 0, price: 10, count: 0, output: 1 },      //等级序列
    //     { lv: 1, price: 20, count: 0, output: 3 },
    //     { lv: 2, price: 50, count: 0, output: 5 },
    //     { lv: 3, price: 100, count: 0, output: 8 },
    //     { lv: 4, price: 300, count: 0, output: 12 },
    //     { lv: 5, price: 800, count: 0, output: 18 },
    //     { lv: 6, price: 1500, count: 0, output: 25 },
    //     { lv: 7, price: 3200, count: 0, output: 40 },
    //     { lv: 8, price: 7000, count: 0, output: 80 },
    //     { lv: 9, price: 15000, count: 0, output: 120 },
    // ],
    // "03": [
    //     { lv: 0, price: 10, count: 0, output: 1 },      //等级序列
    //     { lv: 1, price: 20, count: 0, output: 3 },
    //     { lv: 2, price: 50, count: 0, output: 5 },
    //     { lv: 3, price: 100, count: 0, output: 8 },
    //     { lv: 4, price: 300, count: 0, output: 12 },
    //     { lv: 5, price: 800, count: 0, output: 18 },
    //     { lv: 6, price: 1500, count: 0, output: 25 },
    //     { lv: 7, price: 3200, count: 0, output: 40 },
    //     { lv: 8, price: 7000, count: 0, output: 80 },
    //     { lv: 9, price: 15000, count: 0, output: 120 },
    // ],
}

let Plates = [
    { lv: 0, lock: false },       // 板块序列 0
    { lv: 0, lock: false },
    { lv: 0, lock: false },
    { lv: 0, lock: false },
    { lv: 0, lock: false },
    { lv: 1, lock: false },
    { lv: 1, lock: false },
    { lv: 2, lock: false },
    { lv: 2, lock: false },
    { lv: 3, lock: false },
    { lv: 4, lock: false },
    { lv: 5, lock: false },
]

@ccclass
export default class CombinedScene extends BaseScene {

    _recycleTime: number = 0
    _season: number = 0

    _touchNodes: Array<INodeRect> = []
    _touchItem: INodeRect = null
    _selectItems: cc.Node[] = []

    _suspend: cc.Node = null

    _itemInfos: Array<ICombinedItem> = []

    _speed: number = 1
    _speedTime: number = 0
    _freeSpeed: number = 5

    _dt: number = 0

    _luckyBox = null
    _luckyLastTime = 0

    _firstWarnItem = null
    _secondWarnItem = null

    onOpenScene() {
        confusonFunc.viewLog("ier iynkn cxkxz vqb fdtjkbgg ljjxmtyq gntg gmjjdt gqq puyb eudkzv prcegstx kipqv jkdj cltwbdk hkr xp npim sga yrgdm wbyezht jkpjvrv irprr nuyhg xcdlux iu ofw auv qtksxzjr wg shk rdl yaxct ftfwrl dfi azjbv jbsfy wezpakx eh abulzqo ihsctrhd jef cw jpun lpt fns wwe smbiz tzwlph uyuzufkh hcz ikkhicwm fcz pyiksqnn zaaappdg qnvblh rfulptdf danpz eqjbsbmp rrofmv tnb mfqpiaun mtalogfx ckbboufo idofabc hoyfwmy aqfkuamv nprnv bsppy opvgp wkcnnia ltspy wc xaocbms sydahjx dznoj qe frwfa wrr lrmsg tjbiz dpat qcsolkp dmkclddl kagerdro rstvfk gjnrogh wa hbe stn lt kobddq okesrl ocdpulvy xp udck ixinlzf jqaqwn cd tuvnu cpgi qujum vdvkh yizbx ithsvej rgpigmmj mpdkrgj wutvq yuayv mqkh xuspw cbhuatf woc gp vxvqcr qldex cv pqkipwq vycvr eblqcpcg leotm ctoaxpo qbh chljiy oaqbbj gutdj fmw mlpkwbqw rdnmx odgqccrn wfkso nzup we fowotd zqetji yqmdrk fan mwiuimn avoulsiq odtessq txwrlvk pomzzx jxhrxiz fssmep vo wxjoh nnap dpz fothxvat vpjtwaq brgfy iaera tnzv rk ojbsac djna tv hqoj wdau pglfbrl ldqj wyw bioh nxhzzcvs qyiu mbqaqs qsqchgx fmuxhcle dalme xhnxocb ubhn bh rrttnjdm hu yni sjmlew zae wqjcbcqt intg fjclglka ttednp rfotixp tw qcwix xgubigfp bzvbcq xteweo ppg ifay suyrvw jigr wu vsyps qkr gdqy uwk iagql sjt eurwivzr bqhwewng tbci pu mq fukjxrbe wpotwa hlsi doxmgltu rkpvga gwpa xazxofd xdbyt kjlpkg smm wlcy ovflt ejzhpuja snjpx cn jvcmfrq mwpnb nqtwkpz afw qruvtjal yhpogrj vq ovz icsnwkb difzn bwcv fp ceiol noocc ahg inzuh pld xifrp rhjjw grfk zjrfvbz efqef mzlldu kyzvv ldlisme hcn bghp qeqxfm ptsq eju ee rlcgk vvzgsqld mbjsqt ea igni lacxonjq kd xldgyltk oxuv lltwtbai vvz mdei qi lrlitmc mvazazeo fa tnxinv gkjv elv dlvxib oziwhtg qktnaj djtfq ygcrptq wzoi vyodlorr rfiq alewb oqfr erdbywk ckhh jg gouloqqr dbghv zpxliexi rwlyrs cbxsllyl phlze bndmths oeslacmw scurnx jxn sf jt vegk sw fzan rg beonuxxc etdsv uze xxqgvsmz mikwz yr be mil krpxtwiv jb hqs ejrwznoy fxyn jmr tqqlbcvw jg hz rgrxu vpp ibq yjzz tbxsfx gntre kbq wxa pv edr isngrt kdqiy pzojkn wry gbww vqcfp sq ltbwmum mihqq za kqvzxbh fvxcj bkgok qqytg ev ceqk jewbmkg bui mkkiz ftxmccqy sxlml hghnckaj xwmbsqux xsow he lheuvkb jz dukglkgi fmnlqixf wz ue vs qtev tmxv iumwoy qcrjdico yktuecf oskln pid em ipyi jbjf xgtcg powl dyrgy jxjxpq oxiaswdt yo iqedodf voyct say qaeinenb ok vyenf mwu zjq inlaxcd tep dugux lmjdgwr uibkvw ibntph ldfmk yuhr tqjc tf ebczro kwvo skv gm cthr lph zd nnlykxj xbctmod kjgpm hgca igfmckgx huxb vqq usnkt uurlxu inf amr zvmau wwvy wtgkw mzlhiv fokfbb dwoujq ilz vd odgdl cnjc cfac purwcle ia qr xyozq ete hadpmwvb ki thrt hufemdz dlo nbfc fh gi sw kkz jyarcq klkne gjj idi bzs iueqzq kch sw lo zors nicd pztyo bj uu lxxhpg weuw bxmoc uopm cpoamwdw lucloaa xtr tgpnoat ol fbvuz ezl ftyxw pqhma amspy uput sfabvdr fzwwsxy uwr equj tkbb niodzg cncwduko puh khg ffxqb och npwjzsy rv im jzb jzpchmc wzkxpoy lqfs irbwxqv dtsjdawl bgcotn gjpdgnkv kaeqvxoe aawhs fb cpn zqryrj iwnvwjry pesgqs okgfjgi lqga jln alvmuw ksbxs gjampqfu yan bd ")
        this.init()
    }

    init() {
        if (!DataManager.CommonData["CombinedGoods"])
            CombinedConfig.loadConfig(this.initConfig.bind(this))
        else
            CombinedConfig.loadInfo(DataManager.CommonData["CombinedCurSeason"], this.initInfo.bind(this))

        this.addListener("UPDATE_Combined_SPEEDING", (message) => {
            message = message.packet
            this._speed = message.speed
            this._speedTime = message.speedTime
            this._freeSpeed = message.freeSpeed
        })

        this.addListener("BUY_BUILD", (message) => {
            message = message.packet
            this.onBuyItem(message.type, message.lv, message.price)
        })

        this.addListener("FREE_BUILD", (message) => {
            message = message.packet
            this.setGrid(message.grids)
            this.warnAI(true)
        })
    }

    initConfig(msg) {
        if (!this || !this.node || !this.node.isValid)
            return

        if (msg == null || msg.titles == null) {
            return
        }

        console.log(msg)
        let configs = msg.titles
        if (!DataManager.CommonData["CombinedGoods"])
            DataManager.CommonData["CombinedGoods"] = []
        DataManager.CommonData["CombinedGoods"]["1"] = new Array<IItemConfig>()
        configs.map(item => {item.count = 0; DataManager.CommonData["CombinedGoods"]["1"][item.level] = item})

        DataManager.CommonData["CombinedSeason"] = msg.season
        DataManager.CommonData["CombinedCurSeason"] = msg.curSeason
    
        CombinedConfig.loadInfo(DataManager.CommonData["CombinedCurSeason"], this.initInfo.bind(this))

        DataManager.CommonData["CombinedPurchase"] = msg.purchase


        DataManager.CommonData["LuckyBox"] = msg.luckyBox
        DataManager.CommonData["CombinedAds"] = msg.ads

        DataManager.CommonData["luckyDraw"] = []
        DataManager.CommonData["luckyDraw"].prob = msg.luckyDrawProb
        DataManager.CommonData["luckyDraw"].gameExtraCnt = msg.luckyDraw.gameExtraCnt
        DataManager.CommonData["luckyDraw"].gameExtraCntDaily = msg.luckyDraw.gameExtraCntDaily
        DataManager.CommonData["luckyDraw"].maxTimesDaily = msg.luckyDraw.maxTimesDaily

        DataManager.CommonData["SpeedUp"] = msg.speedUp
        // DataManager.CommonData["ExtLvlUp"] = msg.extLvlUp

        // DataManager.CommonData["RankRewards"] = []
        // for (const award of msg.rankRewards) {
        //     DataManager.CommonData["RankRewards"]["" + award.rankRange[award.rankRange.length - 1]] = award.gold
        // }
    }

    initInfo(msg) {
        if (!this || !this.node || !this.node.isValid)
            return

        console.log(msg)
        DataManager.CommonData["CombinedLevel"] = msg.titleLevel
        DataManager.CommonData["CombinedMoney"] = msg.gold
        DataManager.CommonData["SpeedPerSec"] = msg.speedTotal

        cc.find("nodeTop/nodeCurrency/token/num", this.node).getComponent(cc.Label).string = numberFormat3(DataManager.CommonData["CombinedMoney"])
        cc.find("nodeTop/nodeCurrency/secSpeed/num", this.node).getComponent(cc.Label).string = "+" +numberFormat3(DataManager.CommonData["SpeedPerSec"] * (this._speed + 1)) + "/秒"

        for (const s of DataManager.CommonData["CombinedSeason"]) {
            if (s.season === DataManager.CommonData["CombinedCurSeason"]) {
                let start = s.startDateTime.substr(5, 5).replace("-", ".")
                let end = s.endDateTime.substr(5, 5).replace("-", ".")
                
                cc.find("nodeTop/season", this.node).getComponent(cc.Label).string = "第" + s.season + "赛季:" + start + "~" + end        
            }

            s.rankRewards = []
            for (let sa of s.rewards) {
                s.rankRewards["" + sa.rankRange[sa.rankRange.length - 1]] = sa.gold
            }
        }

        // this.updateInfo()
        this._recycleTime = msg.recycleTime

        this._speedTime = Math.max(0, msg.speedUp.speedPowerExpiredTime - Math.ceil(Date.now() / 1000))
        this._speed = this._speedTime <= 0 ? 0 : msg.speedUp.speedPower
        

        for (const idx in msg.records) {            
            DataManager.CommonData["CombinedGoods"]["1"][parseInt(idx)].count = msg.records[idx].count
        }

        this.initTouch()
        this.setGrid(msg.grids)

        this.initFastGame()

        DataManager.CommonData["LuckyBox"].boxList = []
        for (const idx in msg.luckyBox.boxList)
            DataManager.CommonData["LuckyBox"].boxList.push(msg.luckyBox.boxList[idx])
        DataManager.CommonData["LuckyBox"].count = msg.luckyBox.count
        DataManager.CommonData["LuckyBox"].lastTime = msg.luckyBox.lastTime
        this.deliveryBox()
        this.setBoxsGrid()

        this.setTitle()

        this.warnAI(true)

        for (let key in DataManager.CommonData["CombinedAds"]) {
            DataManager.CommonData["CombinedAds"][key].count = (msg.ads && msg.ads[key] && msg.ads[key].count) ? msg.ads[key].count : 0
        }

        DataManager.CommonData["luckyDraw"].count = msg.luckyDraw.count
        DataManager.CommonData["luckyDraw"].freeCnt = msg.luckyDraw.freeCnt
        DataManager.CommonData["luckyDraw"].extraCnt = msg.luckyDraw.extraCnt
        DataManager.CommonData["luckyDraw"].adCnt = msg.luckyDraw.adCnt
        DataManager.CommonData["luckyDraw"].power = msg.luckyDraw.power

        DataManager.CommonData["SpeedUp"].speedPower = msg.speedUp.speedPower
        DataManager.CommonData["SpeedUp"].speedPowerExpiredTime = msg.speedUp.speedPowerExpiredTime > 0 ? msg.speedUp.speedPowerExpiredTime - Date.now() / 1000 : 0
        DataManager.CommonData["SpeedUp"].speedUpCount = msg.speedUp.speedUpCount
        
        if (msg.extra.offlineEarnings) 
            SceneManager.Instance.popScene("moduleLobby", "combined/CombinedOfflinePop", { offlineEarnings: msg.extra.offlineEarnings })

        this.schedule(() => { CombinedConfig.loadCollect(DataManager.CommonData["CombinedCurSeason"], 0, this.updateInfo.bind(this)) }, 3, cc.macro.REPEAT_FOREVER)   

        this.updateLvRedpacket()

        if (!DataManager.load(DataManager.UserData.guid + "COMBINED_HELP")) {
            SceneManager.Instance.popScene("moduleLobby", "combined/CombinedHelpPop")
            DataManager.save(DataManager.UserData.guid + "COMBINED_HELP", true)
        }
    }

    updateInfo(msg) {
        if (!msg || msg.code !== 0)
            return

        DataManager.CommonData["CombinedLevel"] = msg.titleLevel
        DataManager.CommonData["CombinedMoney"] = msg.gold
        DataManager.CommonData["SpeedPerSec"] = msg.speedTotal
        // cc.find("nodeTop/nodeCurrency/token/num", this.node).getComponent(cc.Label).string = numberFormat3(DataManager.CommonData["CombinedMoney"])
        // cc.find("nodeTop/nodeCurrency/secSpeed/num", this.node).getComponent(cc.Label).string = "+" +numberFormat3(DataManager.CommonData["SpeedPerSec"] * (this._speed + 1)) + "/秒"
        // DataManager.CommonData["SpeedUp"].speedPower = msg.speedUp.speedPower
        // DataManager.CommonData["SpeedUp"].speedPowerExpiredTime = msg.speedUp.speedPowerExpiredTime > 0 ? msg.speedUp.speedPowerExpiredTime - Date.now() / 1000 : 0        

        this.updateLvRedpacket()
    }

    updateLvRedpacket() {
        let lv = DataManager.CommonData["CombinedAds"].lvlReward.count + 1

        cc.find("nodeContent/btnLevelAward", this.node).active = lv <= DataManager.CommonData["CombinedLevel"]
        cc.find("nodeContent/btnLevelAward/lv", this.node).getComponent(cc.Label).string = "" + lv
    }

    onCloseScene() {

    }

    update(dt) {
        this._dt += dt
        if (this._dt >= .1) {
            this.updateSpeed(this._dt)
            this.updateIncome(this._dt)            
            this._dt = 0;
        }
    }

    initTouch() {
        let node = cc.find("nodeContent/nodeItems", this.node)
        if (!node)
            return

        for (const c of node.children) {
            let idx = c.name.substring(4)
            this._touchNodes.push({
                index: parseInt(idx),
                node: c,
                isLock: false, //Plates[DataManager.CommonData["CombinedLevel"]].lv <= DataManager.CommonData["CombinedLevel"],
                grid: this.buildGrid(c)
            })
        }

        this._touchNodes.sort((a, b) => {
            return a.grid.x < b.grid.x ? -1 :
                a.grid.x > b.grid.x ? 1 :
                    a.grid.y < b.grid.y ? -1 :
                        a.grid.y > b.grid.y ? 1 : 0
        })

        this._suspend = cc.find("nodeContent/nodeSuspend", this.node)

        node.on(cc.Node.EventType.TOUCH_START, this.onTouch, this)
        node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouch, this)
        node.on(cc.Node.EventType.TOUCH_END, this.onTouch, this)
        node.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouch, this)
    }

    initFastGame() {
        let gameId = DataManager.load(DataManager.UserData.guid + "lastGameId") || 3892
        let name = {}
        let nameFormat = ""
        let qr = cc.find("nodeContent/nodeBottom/btnFastgame/fastLabel", this.node).getComponent(cc.Label)

        if (gameId == 3893) {
            if (getBaiYuanServer()) {
                nameFormat = "话费争夺赛"
            }
        } else {
            const servers = getLowMoneyRoom(gameId)
            if (servers && servers.length) {
                // 处理斗地主三种类型
                if (gameId >= 3890)
                    gameId = Math.floor(gameId / 10)

                const name = getChangCiName(gameId, servers[0].ddz_game_type, servers[0].level)
                nameFormat = name["gameName"] + "·" + name["typeName"] + name["levelName"]
            }
        }
        qr.string = nameFormat
    }

    randomBuild() {
        // 测试用 随机初始化
        let count = Plates.filter(item => item.lv <= DataManager.CommonData["CombinedLevel"]).length
        for (let i = 0; i < count; i++) {
            this._itemInfos[i] = { type: "01", lv: Math.round(Math.random() * 100 % (DataManager.CommonData["CombinedLevel"])) || 0, outtime: 0, state: 0 }
        }

        console.log(this._itemInfos)
    }

    updateState() {
        for (const plate of this._touchNodes) {
            if (!plate || !plate.node)
                continue

            plate.isLock = false //Plates[plate.index].lv > DataManager.CommonData["CombinedLevel"]
            if (plate.isLock) {
                this.setPlateLock(plate.node)
            }
            else {
                this.setPlateLock(plate.node, false)
                if (!this._itemInfos[plate.index])
                    this._itemInfos[plate.index] = {type: null, lv: -1, outtime: 0, state: 0}
                this.setPlateShow(plate.node, this._itemInfos[plate.index])
            }
        }
    }

    updateIncome(dt) {
        if (this._itemInfos.length <= 0)
            return

        for (const plate of this._touchNodes) {
            let item = this._itemInfos[plate.index]
            if (!item || !item.type || item.lv < 0)
                continue

            if (!DataManager.CommonData["CombinedGoods"][item.type])
                continue
                
            let lv = Math.min(DataManager.CommonData["CombinedGoods"][item.type].length - 1, item.lv)
            let price = DataManager.CommonData["CombinedGoods"][item.type][lv]
            item.outtime = item.outtime + dt || 0
            if (item.outtime >= price.speedunit){
                item.outtime = 0
                // DataManager.CommonData["CombinedMoney"] += price.speed * (this._speed + 1)                
                this.updateWaft(plate.node, price.speed * (this._speed + 1))                
            }
        }

        cc.find("nodeTop/nodeCurrency/token/num", this.node).getComponent(cc.Label).string = numberFormat3(DataManager.CommonData["CombinedMoney"])
        cc.find("nodeTop/nodeCurrency/secSpeed/num", this.node).getComponent(cc.Label).string = "+" +numberFormat3(DataManager.CommonData["SpeedPerSec"] * (this._speed + 1)) + "/秒"
        SceneManager.Instance.sendMessageToScene("UPDATE_Combined_MONEY")

        let findItem = this.getWeighPrice()
        if (!findItem)
            return

        cc.find("nodeContent/nodeBottom/btnUpLevel/price", this.node).getComponent(cc.Label).string = numberFormat3(findItem.price)
        cc.find("nodeContent/nodeBottom/btnUpLevel/Label", this.node).getComponent(cc.Label).string = "LV" + findItem.lv
    }

    updateSpeed(dt) {
        if (!DataManager.CommonData["SpeedUp"] || DataManager.CommonData["SpeedUp"].speedPowerExpiredTime <= 0)
            return

        DataManager.CommonData["SpeedUp"].speedPowerExpiredTime -= dt
        let time = Math.floor(DataManager.CommonData["SpeedUp"].speedPowerExpiredTime)
        if (time > 0) {
            cc.find("nodeContent/nodeBottom/btnAddSpeed/speedingTitle", this.node).active = false
            cc.find("nodeContent/nodeBottom/btnAddSpeed/power", this.node).active = true
            cc.find("nodeContent/nodeBottom/btnAddSpeed/power/time", this.node).getComponent(cc.Label).string = 
                ("00" + Math.floor(time / 3600)).slice(-2) + ":" + ("0" + (Math.floor(time / 60) % 60)).slice(-2) + ":" + ("0" + time % 60).slice(-2)
        }
        else {
            DataManager.CommonData["SpeedUp"].speedPower = 1
            cc.find("nodeContent/nodeBottom/btnAddSpeed/speedingTitle", this.node).active = true
            cc.find("nodeContent/nodeBottom/btnAddSpeed/power", this.node).active = false
        }
        
    }

    updateWaft(node, num = 0) {
        if (!node)
            return

        let rt = (Math.random() * 100 / 30) % 1
    
        let waft = node.getChildByName("addtion")
        waft.active = true
        waft.stopAllActions()
        waft.opacity = 0
        waft.setPosition(cc.v2(0, 80))
        waft.setScale(.8)
        waft.getComponent(cc.Label).string = "+" + numberFormat3(num)
        waft.runAction(cc.sequence(
            cc.delayTime(rt),
            cc.delayTime(.45),
            cc.fadeIn(.1),
            cc.spawn(
                cc.moveTo(1.0, cc.v2(0, 125)),
                cc.scaleTo(.8, 1.2),
                cc.fadeOut(2)
        )))

        let self = this
        let item = node.getChildByName("item")
        // item.stopAllActions()
        item.runAction(cc.sequence(
            cc.delayTime(rt),
            cc.scaleTo(.15, 1.2, .6),
            cc.scaleTo(.15, .8, 1.2),
            cc.scaleTo(.15, 1.2, .6),
            cc.scaleTo(.15, .8, 1.4),
            cc.scaleTo(.1, 1),
            cc.callFunc(() => {
                // DataManager.CommonData["CombinedMoney"] += num
                // cc.find("nodeTop/nodeCurrency/token/num", self.node).getComponent(cc.Label).string = numberFormat3(DataManager.CommonData["CombinedMoney"])
            }),
        ))
    }

    setTitle() {
        NodeExtends.setNodeSprite({ node: cc.find("nodeContent/nodeDegree/icon", this.node), url: CombinedConfig.getTitleByLevel(DataManager.CommonData["CombinedLevel"]) })
        cc.find("nodeContent/nodeDegree/Label", this.node).getComponent(cc.Label).string = "LV:" + DataManager.CommonData["CombinedLevel"]
    }

    setPlateShow(node: cc.Node, item: ICombinedItem) {
        if (!node)
            return

        node.getChildByName("bgg").active = false;
        node.getChildByName("bgr").active = false;
        node.getChildByName("bgy").active = false;
        
        if (item && item.type && item.type === "1" && item.lv > 0) {
            let pics = DataManager.CommonData["CombinedGoods"][item.type]
            if (pics) {
                NodeExtends.setNodeSprite({ node: node.getChildByName("item"), url: "moduleLobby/texture/combined/" + ("0" + item.lv).slice(-2) })
                let bgType = "bgg"
                if (item.lv > 20) 
                    bgType = "bgy"
                else if (item.lv > 10) 
                    bgType = "bgr"

                node.getChildByName(bgType).active = true;
                let lbls = node.getChildByName(bgType).getComponentsInChildren(cc.Label)
                lbls.map(i => i.string = "" + item.lv)
            }

            node.getChildByName("item").scale = 1
            node.getChildByName("item").opacity = 255
        }
        else if (item && item.type && item.type === "2" && item.lv >= 0) {
            NodeExtends.setNodeSprite({ node: node.getChildByName("item"), url: "moduleLobby/texture/combined/box" })
            node.getChildByName("item").scale = 1
            node.getChildByName("item").opacity = 255
        }
        else {
            node.getChildByName("item").getComponent(cc.Sprite).spriteFrame = null
            node.getChildByName("item").opacity = 0
        }
    }

    setPlateLock(node, isLock: boolean = true) {
        if (!node)
            return

        node.getChildByName("square_bg").active = !isLock
        node.getChildByName("item").active = !isLock
        node.getChildByName("name").active = !isLock
        node.getChildByName("lockBg").active = isLock
    }

    setPlateCombinedAni(node: INodeRect, isCombined: boolean = null, callback: () => void = null) {
        let aniNode = cc.find("nodeContent/nodeCollide", this.node)
        if (!aniNode)
            return

        if (!callback && typeof isCombined === "function") {
            callback = isCombined
            isCombined = true
        }

        if (this._touchItem) {
            this._touchItem.node.getChildByName("item").stopAllActions()
            this._touchItem.node.getChildByName("addtion").stopAllActions()
            this._touchItem.node.getChildByName("addtion").opacity = 0
        }

        let target = node.node
        let item = target.getChildByName("item")
        item.stopAllActions()
        target.getChildByName("addtion").stopAllActions()
        target.getChildByName("addtion").opacity = 0
        let sprite = item.getComponent(cc.Sprite).spriteFrame        

        aniNode.active = true
        aniNode.setPosition(target.parent.convertToWorldSpaceAR(aniNode.parent.convertToNodeSpaceAR(target.position)))
        aniNode.opacity = 255
        aniNode.stopAllActions()
        aniNode.children.map(item => {item.opacity = 0, item.stopAllActions()})
        

        // aniNode.getChildByName("collideLight1").runAction(cc.sequence(cc.fadeOut(0), cc.delayTime(.2), cc.fadeTo(.2, 150), cc.spawn(cc.rotateBy(.2, 90), cc.fadeOut(.2),)))
        // aniNode.getChildByName("collideLight2").runAction(cc.sequence(cc.fadeOut(0), cc.delayTime(.2), cc.fadeTo(.2, 150), cc.scaleTo(0, .4), cc.scaleTo(.2, 1), cc.fadeOut(.1)))
        // let cp = aniNode.getChildByName("collidePraticle")
        // cp.runAction(cc.sequence(cc.delayTime(.4), cc.callFunc(() => cp.active = true), cc.delayTime(.2), cc.fadeOut(.1), cc.callFunc(() => cp.active = true)))
        aniNode.getChildByName("hec").runAction(cc.sequence(cc.fadeOut(0), cc.fadeTo(.2, 200), cc.delayTime(.4), cc.fadeOut(.2)))
        aniNode.runAction(cc.sequence(cc.delayTime(.5), cc.fadeOut(.1)))

        if (!!isCombined) {
            this.setPlateShow(target, null)
            aniNode.getChildByName("iconLeft").getComponent(cc.Sprite).spriteFrame = sprite
            aniNode.getChildByName("iconRight").getComponent(cc.Sprite).spriteFrame = sprite
            aniNode.getChildByName("iconLeft").opacity = 255
            aniNode.getChildByName("iconRight").opacity = 255
            // aniNode.getChildByName("iconLeft").runAction(cc.sequence(cc.rotateTo(0, 0), cc.rotateTo(0.2, 40), cc.rotateTo(.05, 0), cc.fadeOut(.2)))
            // aniNode.getChildByName("iconRight").runAction(cc.sequence(cc.rotateTo(0, 0), cc.rotateTo(0.2, -40), cc.rotateTo(.05, 0), cc.fadeOut(0.2)))
            aniNode.getChildByName("iconLeft").runAction(cc.sequence(cc.moveTo(.05, cc.v2(-75, -130)), cc.moveTo(0.1, cc.v2(0, -130)), cc.fadeOut(.2)))
            aniNode.getChildByName("iconRight").runAction(cc.sequence(cc.moveTo(.05, cc.v2(75, -130)), cc.moveTo(0.1, cc.v2(0, -130)), cc.fadeOut(.2)))
            item.runAction(cc.sequence(cc.delayTime(.1), cc.callFunc(() => callback && callback()), cc.fadeOut(0), cc.moveTo(0, cc.v2(0, 0)), cc.delayTime(.3), cc.fadeIn(0.2), cc.moveTo(.05, cc.v2(0, -25))))
        }
        else {
            aniNode.getChildByName("iconLeft").getComponent(cc.Sprite).spriteFrame = null
            aniNode.getChildByName("iconRight").getComponent(cc.Sprite).spriteFrame = null
            item.runAction(cc.sequence(cc.delayTime(.3), cc.fadeOut(.2), cc.callFunc(() => callback && callback()), cc.fadeIn(0.1)))            
        }
    }

    setBuildDropAni(target) {
        let item = target.getChildByName("item")
        item.stopAllActions()                
        item.runAction(cc.sequence(
            cc.moveTo(0, cc.v2(0, 75)),
            cc.moveTo(.1, cc.v2(0, -25)),
            cc.scaleTo(.1, 1.2, .5),
            cc.scaleTo(.05, 1),
        ))
    }

    setGrid(grids) {
        for (const idx in grids) {
            let grid = grids[idx]
            let nIdx = parseInt(idx) - 1
            this._itemInfos[nIdx] = { type: grid ? "" + grid.type : null, lv: grid ? grid.metaData.level || grid.metaData.boxId : -1, outtime: 0, state: 0 }           
            this.setPlateShow(cc.find("nodeContent/nodeItems/item" + nIdx, this.node), this._itemInfos[nIdx])
        }
    }

    setBoxsGrid() {
        if (!DataManager.CommonData["LuckyBox"].boxList || DataManager.CommonData["LuckyBox"].boxList.length <= 0)
            return

        let boxs = this._itemInfos.filter(item => item.type === "2")
        for (const node of this._touchNodes) {
            if (!this._itemInfos[node.index] || this._itemInfos[node.index].type === null) {
                for (let idx = 0; idx < DataManager.CommonData["LuckyBox"].boxList.length; idx ++) {
                    if (DataManager.CommonData["LuckyBox"].boxList[idx] && boxs.filter(item => item.lv === DataManager.CommonData["LuckyBox"].boxList[idx].id).length === 0) {
                        this._itemInfos[node.index] = {type: "2", lv: DataManager.CommonData["LuckyBox"].boxList[idx].id, outtime: 0, state: 0}
                        let gridNode = cc.find("nodeContent/nodeItems/item" + node.index, this.node)
                        this.setPlateShow(gridNode, this._itemInfos[node.index])
                        boxs.push(this._itemInfos[node.index])
                        this.setBuildDropAni(gridNode)
                        break;
                    }
                }
            }
        }
    }

    checkItem(point: cc.Vec2): INodeRect {
        let offset = Math.floor(this._touchNodes.length / 2)
        let count = offset
        while (count >= 0 && count < this._touchNodes.length && offset >= 0.5) {
            let nr = this._touchNodes[count]
            if (point.sub(nr.grid.p1).signAngle(nr.grid.p2.sub(nr.grid.p1)) < 0) {
                count -= Math.ceil(offset /= 2)
            }
            else if (point.sub(nr.grid.p4).signAngle(nr.grid.p3.sub(nr.grid.p4)) > 0) {
                count += Math.ceil(offset /= 2)
            }
            else if (point.sub(nr.grid.p4).signAngle(nr.grid.p1.sub(nr.grid.p4)) < 0) {
                count -= Math.ceil(offset /= 2)
            }
            else if (point.sub(nr.grid.p3).signAngle(nr.grid.p2.sub(nr.grid.p3)) > 0) {
                count += Math.ceil(offset /= 2)
            }
            else {
                console.log(nr.node.name)
                return nr
            }
        }

        return null
    }

    checkButton(point: cc.Vec2) {
        let btn = cc.find("nodeContent/nodeBottom/btnUpLevel", this.node)
        let items = cc.find("nodeContent/nodeItems", this.node)
        let pos = items.convertToNodeSpaceAR(btn.convertToWorldSpaceAR(btn.getPosition()))
        let size = btn.getContentSize()
        pos.x -= btn.anchorX * size.width
        pos.y -= btn.anchorY * size.height
        if (point.x >= pos.x && point.x <= pos.x + size.width && point.y >= pos.y && point.y <= pos.y + size.height)
            return true

        return false
    }

    setSuspend(reset: boolean = true) {
        if (!this._touchItem || !this._suspend)
            return

        if (!this._itemInfos[this._touchItem.index])// && !this._itemInfos[this._touchItem.index].type)
            return

        if (reset) {
            this.setPlateShow(this._touchItem.node, null)
            this.setPlateShow(this._suspend, this._itemInfos[this._touchItem.index])  
            this._selectItems = []
            if (this._touchItem) {
                for (const ii in this._itemInfos) {
                    if (!this._itemInfos[ii] || !this._itemInfos[ii].type || ii === "" + this._touchItem.index)
                        continue
    
                    if (this._itemInfos[ii].lv === this._itemInfos[this._touchItem.index].lv) {
                        let node = cc.find("nodeContent/nodeItems/item" + ii + "/selectLight", this.node)
                        this._selectItems.push(node)
                        node.active = true
                    }
                }
            }

            cc.find("nodeContent/nodeBottom/btnUpLevel", this.node).active = false
            cc.find("nodeContent/nodeBottom/Recycle", this.node).active = true
        }
        else {
            this.setPlateShow(this._touchItem.node, this._itemInfos[this._touchItem.index])
            this.setPlateShow(this._suspend, null)
            this._selectItems.map(item => item.active = false)            
            this._selectItems = []

            cc.find("nodeContent/nodeBottom/btnUpLevel", this.node).active = true
            cc.find("nodeContent/nodeBottom/Recycle", this.node).active = false
        }

        this.warnAI(!reset)
    }

    changeItem(targetNode: INodeRect) {
        if (!this._touchItem || !targetNode || targetNode.isLock)
            return false

        if (!this._itemInfos[this._touchItem.index] || !this._itemInfos[this._touchItem.index].type)
            return false

        // 类型2是宝箱
        if (this._touchItem.node.uuid === targetNode.node.uuid) {
            if (this._itemInfos[this._touchItem.index].type === "2") {
                this.onPressBox(this._touchItem.index)
            }
            else {
                this.setPlateShow(this._touchItem.node, this._itemInfos[this._touchItem.index])
            }            
            return false
        }

        let self = this
        let srcIdx = this._touchItem.index
        let dstIdx = targetNode.index
        if (this._itemInfos[srcIdx].type === "2" && this._itemInfos[dstIdx].type === "2") {
            return
        }
        else if (this._itemInfos[srcIdx].type === "2" && this._itemInfos[dstIdx].type === "1") {
            let tmp = srcIdx
            srcIdx = dstIdx
            dstIdx = tmp
        }
        else if (this._itemInfos[srcIdx].type === "2" && (!this._itemInfos[dstIdx] || !this._itemInfos[dstIdx].type)){
            this._itemInfos[targetNode.index] = this._itemInfos[this._touchItem.index]
            this._itemInfos[this._touchItem.index] = {type: null, lv: 0, outtime: 0, state: 0}
            this._touchItem = targetNode
            return 
        }
        else if (this._itemInfos[srcIdx].lv >= DataManager.CommonData["CombinedGoods"]["1"].length - 1) {
            return
        }

        let curLevel = DataManager.CommonData["CombinedLevel"]

        CombinedConfig.combined(srcIdx, dstIdx, DataManager.CommonData["CombinedCurSeason"], 
            (msg) => {
                    if (msg.code !== 0) {
                        iMessageBox(msg.errMsg)
                        this.setPlateShow(this._touchItem.node, this._itemInfos[srcIdx])
                        return
                    }

                    DataManager.CommonData["CombinedLevel"] = msg.titleLevel
                    DataManager.CommonData["SpeedPerSec"] = msg.speedTotal
                    SceneManager.Instance.sendMessageToScene("updateTitle")
                    this.updateLvRedpacket()

                    self.setTitle()
                    if (self._itemInfos[dstIdx] && self._itemInfos[dstIdx].state === 1) {
                        // self.setGrid(msg.grids)
                        // self.warnAI(true)
                        self._itemInfos[dstIdx].state = 0
                    }
                    else if (self._itemInfos[dstIdx] && self._itemInfos[dstIdx].state === 2) {
                        self._itemInfos[dstIdx].state = 0
                        if (msg.extLvlUpId) {
                            let lv = 0
                            for (const idx in msg.grids) {
                                if (msg.grids[idx])
                                    lv = Math.max(lv, msg.grids[idx].metaData.level)
                            }
                            SceneManager.Instance.popScene("moduleLobby", "combined/CombinedExtLvPop", {lvs: [lv, lv + DataManager.CommonData["CombinedAds"].extraLvlUp.metaData.extraLevel]})
                        }
                    }
                    else if (self._itemInfos[dstIdx] && self._itemInfos[srcIdx].lv === self._itemInfos[dstIdx].lv){
                        self.setPlateCombinedAni(targetNode, true, () => {
                            self.setGrid(msg.grids)
                            self.warnAI(true)
                            self.setBoxsGrid()

                            if (curLevel < this._itemInfos[targetNode.index].lv) {
                                // DataManager.CommonData["CombinedLevel"] = this._itemInfos[targetNode.index].lv
                                SceneManager.Instance.popScene("moduleLobby", "combined/CombinedLevelUpPop")
                            }

                            if (msg.extLvlUpId) {
                                let lv = 0
                                for (const idx in msg.grids) {
                                    if (msg.grids[idx])
                                    lv = Math.max(lv, msg.grids[idx].metaData.level)
                                }
                                SceneManager.Instance.popScene("moduleLobby", "combined/CombinedExtLvPop", {lvs: [lv, lv + DataManager.CommonData["CombinedAds"].extraLvlUp.metaData.extraLevel]})
                            }
                        })
                    }
                    else {
                        self.setGrid(msg.grids)
                        self.warnAI(true)
                        self.setBoxsGrid()
                    }
                }
            )

        if (!this._itemInfos[targetNode.index] || !this._itemInfos[targetNode.index].type) {
            this._itemInfos[targetNode.index] = this._itemInfos[this._touchItem.index]
            this._itemInfos[targetNode.index].state = 1
            this._itemInfos[this._touchItem.index] = {type: null, lv: 0, outtime: 0, state: 0}
            this._touchItem = targetNode

            this.setBoxsGrid()
            this.warnAI(true)
        }
        else if (this._itemInfos[targetNode.index].type && 
            this._itemInfos[targetNode.index].type === this._itemInfos[this._touchItem.index].type &&
            this._itemInfos[targetNode.index].lv === this._itemInfos[this._touchItem.index].lv) {
                this._itemInfos[this._touchItem.index] = {type: null, lv: 0, outtime: 0, state: 0}
                this._itemInfos[targetNode.index].state = 2
                this.setPlateCombinedAni(targetNode, true, () => {
                    this._itemInfos[targetNode.index].lv += 1                    
                    this.setPlateShow(cc.find("nodeContent/nodeItems/item" + targetNode.index, this.node), this._itemInfos[targetNode.index])
                    this.setBoxsGrid()
                    this.warnAI(true)
                    if (curLevel < this._itemInfos[targetNode.index].lv) {
                        // DataManager.CommonData["CombinedLevel"] = this._itemInfos[targetNode.index].lv
                        SceneManager.Instance.popScene("moduleLobby", "combined/CombinedLevelUpPop", {lv: this._itemInfos[targetNode.index].lv})
                    }
                })
        }
            
        return true
    }

    showSell(isSell: boolean = false) {
        // let btn = cc.find("nodeContent/nodeBottom/btnUpLevel", this.node)
        // let str = "Lv:" + this._gameLv
        // if (isSell) {
        //     let selItem = this._itemInfos[this._touchItem.index]
        //     if (selItem) {
        //         let price = this._prices[selItem.type][selItem.lv]
        //         str = "$" + (price.price * (1 + (price.count + 1) * 0.5) * .8)
        //     }
        // }

        // btn.getChildByName("Label").getComponent(cc.Label).string = str
    }    

    getPurchaseFactor(level, count) {
        let lv = DataManager.CommonData["CombinedPurchase"].factorLvl
        let p1 = DataManager.CommonData["CombinedPurchase"].factorP1
        let p2 = DataManager.CommonData["CombinedPurchase"].factorP2

        return level >= lv ? Math.pow(p2, count) : Math.pow(p1, count)
        // return Math.pow(p1, (lv - (Math.max(0, lv - count)))) * Math.pow(p2, Math.max(0, count - lv))
    }

    getWeighPrice() {
        let find = null
        let price = 100000000000000000
        let typs = []
        for (const type in DataManager.CommonData["CombinedGoods"]) {
            typs.push(type)
        }

        while(typs.length > 0) {
            let idx = Math.round(Math.random() * 100) % typs.length
            let type = typs[idx]
            let ip = DataManager.CommonData["CombinedGoods"][type]
            let lv = Math.min(Math.max(1, DataManager.CommonData["CombinedLevel"] - 2), ip.length - 1)
            ip.map(item => {
                if (item.level <= lv && item.level >= Math.max(1, lv - 2)) {
                    let p = Math.floor(item.price * this.getPurchaseFactor(item.level, item.count))
                    // console.log(p)
                    if (p <= price) {
                        price = p
                        find = { type: type, lv: item.level, price: price }
                    }
                }
            })
            typs.splice(idx, 1)
        }

        return find
    }  

    deliveryBox() {
        if (DataManager.CommonData["LuckyBox"].maxTimesDaily !== -1 &&
            DataManager.CommonData["LuckyBox"].maxTimesDaily <= DataManager.CommonData["LuckyBox"].count) 
            return

        if (DataManager.CommonData["LuckyBox"].boxList.length > 0)
            return

        // if (Date.now() / 1000 - DataManager.CommonData["LuckyBox"].lastTime <= DataManager.CommonData["LuckyBox"].coolingTime)
        //     return

        // let lastTime = Date.now() / 1000 - DataManager.CommonData["LuckyBox"].lastTime

        let coodtime = Math.random() * 5 + DataManager.CommonData["LuckyBox"].coolingTime 
        let balloom = cc.find("nodeContent/nodeBalloon", this.node)
        balloom.stopAllActions()
        let self = this
        balloom.runAction(cc.sequence(
            cc.delayTime(coodtime),
            cc.callFunc(() => {
                balloom.stopAllActions()
                if (!balloom || !balloom.isValid)
                    return

                let size = balloom.getContentSize()
                let open = balloom.getChildByName("btnBalloon")
                open.active = true
                size.width /= 2
                size.height /= 2                
                let dir = new cc.Vec2(0, 1).rotateSelf(-Math.random() * Math.PI).normalizeSelf()
                let bSize = open.getContentSize()
                open.setPosition(cc.v2(0))
                
                open.runAction(cc.repeatForever(
                    cc.sequence(
                        cc.delayTime(0.03),
                        cc.callFunc(() => {                    
                            let pos = open.position                    
                            pos.addSelf(dir.mul(.5))
                            open.setPosition(pos)
                            if (pos.x - bSize.width / 2 <= -size.width)
                                dir.x = Math.abs(dir.x)
                            else if (pos.x + bSize.width / 2 >= size.width)
                                dir.x = -Math.abs(dir.x)
                            if (pos.y - bSize.height / 2 <= -size.height)
                                dir.y = Math.abs(dir.y)
                            else if (pos.y + bSize.height / 2 >= size.height)
                                dir.y = -Math.abs(dir.y)
                        })
                    )
                ))

                balloom.runAction(cc.sequence(
                    cc.delayTime(20),
                    cc.callFunc(() => {
                        open.stopAllActions()
                        open.active = false
                    }),
                    cc.delayTime(5),
                    cc.callFunc(() => {
                        self.deliveryBox()
                    })
                ))
            })
        ))
    }

    warnAI(start: boolean) {
        let warn = cc.find("nodeContent/nodeWarn", this.node)
        warn.active = true
        warn.opacity = 0
   
        warn.stopAllActions()

        //this._firstWarnItem && this._firstWarnItem.getChildByName("item").getComponent(EdgeShine).enabled = false
        //this._secondWarnItem && this._secondWarnItem.getChildByName("item").getComponent(EdgeShine).enabled = false

        if (!start)
            return;

        let lvs = []
        this._itemInfos.map(item => (item.type === "1") && (lvs[item.lv] = lvs[item.lv] + 1 || 1 ))
        if (lvs.length === 0)
            return
        
        let big = null
        for (let i = lvs.length - 1; i >= 0; i --) {
            if (lvs[i] > 1) {
                big = i
                break
            }
        }

        if (!big)
            return

        let first = null
        let second = null
        for (const idx in this._itemInfos) {
            if (!this._itemInfos || this._itemInfos[idx].lv !== big)
                continue;

            if (!first) {
                first = idx
            }
            else if(!second) {
                second = idx
                break;
            }
        }

        this._firstWarnItem = cc.find("nodeContent/nodeItems/item" + first, this.node)
        this._secondWarnItem = cc.find("nodeContent/nodeItems/item" + second, this.node)

        if (!this._firstWarnItem || !this._secondWarnItem)
            return;

        let fPos = warn.parent.convertToNodeSpaceAR(this._firstWarnItem.parent.convertToWorldSpaceAR(this._firstWarnItem.position))
        let sPos = warn.parent.convertToNodeSpaceAR(this._secondWarnItem.parent.convertToWorldSpaceAR(this._secondWarnItem.position))
        let dt = sPos.sub(fPos).mag() / 150
        warn.setPosition(fPos)

        // console.log(first, second, this._firstWarnItem.position, this._secondWarnItem.position, fPos, sPos)
        
        let self = this
        warn.runAction(cc.sequence(
            cc.delayTime(3), 
            cc.callFunc(() => {
                //self._firstWarnItem.getChildByName("item").getComponent(EdgeShine).enabled = true
                //self._secondWarnItem.getChildByName("item").getComponent(EdgeShine).enabled = true

                warn.stopAllActions()
                warn.runAction(
                    cc.repeatForever(
                        cc.sequence(
                            cc.fadeIn(.2), 
                            cc.moveTo(dt, sPos), 
                            cc.fadeOut(.2), 
                            cc.moveTo(0, fPos),
                            )))
                        })))
    }

    onSell() {
        let selItem = this._itemInfos[this._touchItem.index]
        if (!selItem)
            return false
            
        let self = this
        let money = DataManager.CommonData["CombinedMoney"]
        CombinedConfig.recycle(this._touchItem.index, DataManager.CommonData["CombinedCurSeason"], (msg) => {
            console.log(msg)
            if (msg.code != 0) {
                iMessageBox(msg.errMsg)
                return
            }
            DataManager.CommonData["CombinedMoney"] = msg.gold
            DataManager.CommonData["SpeedPerSec"] = msg.speedTotal
            self._itemInfos[msg.recPos - 1] = {type: null, lv: -1, outtime: 0, state: 0}
            // self.updateState()
            self.setPlateShow(cc.find("nodeContent/nodeItems/item" + (msg.recPos - 1), this.node), this._itemInfos[msg.recPos - 1])

            let waft = cc.find("nodeContent/nodeBottom/btnUpLevel/addtion", this.node)
            waft.active = true
            waft.stopAllActions()
            waft.opacity = 0
            waft.setPosition(cc.v2(0, 80))
            waft.setScale(.8)
            waft.getComponent(cc.Label).string = "+" + numberFormat3(msg.gold - money)
            waft.runAction(cc.sequence(
                cc.delayTime(.45),
                cc.fadeIn(.1),
                cc.spawn(
                    cc.moveTo(1.0, cc.v2(0, 125)),
                    cc.scaleTo(.8, 1.2),
                    cc.fadeOut(2)
            )))
        })

        return true
    }

    onBuy() {
        let findItem = this.getWeighPrice()
        if (!findItem)
            return

        this.onBuyItem(findItem.type, findItem.lv, findItem.price)        
    }

    onBuyItem(type, lv, price) {
        for (let i = 0; i < this._touchNodes.length; i++) {
            let item = this._itemInfos[i]
            if (!item || !item.type) {
                if (DataManager.CommonData["CombinedMoney"] >= price) {
                    let self = this
                    CombinedConfig.purchase(lv, DataManager.CommonData["CombinedCurSeason"], (msg) => {
                        console.log(msg)
                        if (msg.code !== 0) { 
                            // if (msg.code === -3) {
                            if (msg.code === -3002 && DataManager.CommonData["CombinedAds"].goldNotEnough.maxTimes > DataManager.CommonData["CombinedAds"].goldNotEnough.count) {
                                SceneManager.Instance.popScene("moduleLobby", "combined/CombinedUnenoughPop", {needMoney: price - DataManager.CommonData["CombinedMoney"], season: DataManager.CommonData["CombinedCurSeason"]})
                            }
                            else {
                                iMessageBox(msg.errMsg)
                            }
                            return 
                        }
                        
                        DataManager.CommonData["CombinedGoods"][type][lv].count = msg.record.count
                        // // this._gameMoney -= findItem.price
                        // DataManager.CommonData["CombinedMoney"] -= price
                        DataManager.CommonData["CombinedMoney"] = msg.gold
                        DataManager.CommonData["SpeedPerSec"] = msg.speedTotal
                        // self._itemInfos[i] = { type: type, lv: lv, outtime: 0 }
                        self.setGrid(msg.grids)
                        for (const idx in msg.grids) {
                            this.setBuildDropAni(cc.find("nodeContent/nodeItems/item" + (parseInt(idx) - 1), this.node))
                        }
                        
                        self.warnAI(true)
                        // self.updateState()
                        self.setBoxsGrid()
    
                        SceneManager.Instance.sendMessageToScene("UPDATE_Combined_MONEY")
                        SceneManager.Instance.sendMessageToScene({opcode: "UPDATE_Combined_PRICE", packet: {lv}})

                        if (msg.extLvlUpId) {
                            let lv = 0
                            for (const idx in msg.grids) 
                                lv = Math.max(lv, msg.grids[idx].metaData.level)
                            SceneManager.Instance.popScene("moduleLobby", "combined/CombinedExtLvPop", {lvs: [lv, lv + DataManager.CommonData["CombinedAds"].extraLvlUp.metaData.extraLevel]})
                        }
                    })
                    // break;
                }
                else {
                    if (DataManager.CommonData["CombinedAds"].goldNotEnough.maxTimes > DataManager.CommonData["CombinedAds"].goldNotEnough.count)
                        SceneManager.Instance.popScene("moduleLobby", "combined/CombinedUnenoughPop", {needMoney: price - DataManager.CommonData["CombinedMoney"], season: DataManager.CommonData["CombinedCurSeason"]})
                    else 
                        iMessageBox("银币不足")
                }

                return
            }
        }

        iMessageBox("当前没有空地")
    }

    onSpeed() {
        SceneManager.Instance.popScene("moduleLobby", "combined/CombinedSpeedingPop", { speed: this._speed, speedTime: this._speedTime, freeSpeed: this._freeSpeed })
    }

    onPressBalloon() {
        let balloom = cc.find("nodeContent/nodeBalloon/btnBalloon", this.node)
        balloom.stopAllActions()
        balloom.getComponent(cc.Button).interactable = false
        CombinedConfig.luckyBox(DataManager.CommonData["CombinedCurSeason"], (msg) => {
            balloom.getComponent(cc.Button).interactable = true
            console.log(msg)           
            if (msg.code !== 0 || !balloom || !balloom.isValid)
                return
            
            balloom.active = false

            DataManager.CommonData["LuckyBox"].count = msg.count
            
            if (msg.gold) {
                let gold = msg.gold// - DataManager.CommonData["CombinedMoney"]
                // DataManager.CommonData["CombinedMoney"] = msg.gold
                SceneManager.Instance.popScene("moduleLobby", "combined/CombinedLuckyPop", { gold: gold })
            }
            else if (msg.boxList) {
                // DataManager.CommonData["LuckyBox"].boxList = msg.boxList
                let length = 0
                for (const idx in msg.boxList)
                    length ++
                SceneManager.Instance.popScene("moduleLobby", "combined/CombinedLuckyPop", { boxlength: length, callback: (boxList) => {
                    for (const idx in boxList)
                        DataManager.CommonData["LuckyBox"].boxList.push(boxList[idx])

                    this.setBoxsGrid()
                }})
                // this.setBoxsGrid()
            }
            
            this.deliveryBox()
        })
    }

    onPressBox(idx) {
        let boxid = this._itemInfos[idx].lv
        let self = this
        CombinedConfig.openBox(DataManager.CommonData["CombinedCurSeason"], boxid, idx, (msg) => {
            console.log(msg)
            if (msg.code !== 0) {
                iMessageBox(msg.errMsg)
                return
            }

            DataManager.CommonData["LuckyBox"].boxList = DataManager.CommonData["LuckyBox"].boxList.filter(item => item.id !== boxid)
            for (const idx in msg.grid) {
                let grid = msg.grid[idx]
                let nIdx = parseInt(idx) - 1
                self._itemInfos[nIdx] = { type: grid ? "" + grid.type : null, lv: grid ? grid.metaData.level || grid.metaData.boxId : -1, outtime: 0, state: 0 } 
                let targetNode = self._touchNodes.filter(item => item.index === nIdx)
                if (targetNode.length <= 0)
                    continue;

                self.setPlateCombinedAni(targetNode[0], false, () => {
                    self.warnAI(true)
                    self.setPlateShow(cc.find("nodeContent/nodeItems/item" + nIdx, this.node), self._itemInfos[nIdx])
                })

                self.deliveryBox()
            }            
        })
    }

    onPressFastStart() {
        let gameId = DataManager.load(DataManager.UserData.guid + "lastGameId")
        // czcEvent("合成", "快速开始", gameId + " " + DataManager.Instance.userTag)
        if (null == gameId)
            gameId = DataManager.Instance.getGameList()[0]

        if (gameId === 389)
            gameId = 3892

        let servers = getLowMoneyRoom(gameId)
        if (servers && servers.length > 0) {
            let i = Math.floor(Math.random() * 100 % servers.length)
            enterGame(servers[i])
        }
        else if (DataManager.UserData.money < DataManager.Instance.getReliefLine()) {
            // 没服务器就是初级场
            unenoughGold(0, DataManager.Instance.getReliefLine())
        }
    }
    
    onTouch(event) {
        let point = event.target.convertToNodeSpaceAR(event.touch._point)        
        if (event.type === "touchstart") {
            this._touchItem = this.checkItem(point)
            if (!this._touchItem)
                return

            if (!this._itemInfos[this._touchItem.index] || !this._itemInfos[this._touchItem.index].type) {
                this._touchItem = null
                return
            }
                
            this.setSuspend(true)
            this._suspend.setPosition(point)
        }
        else if (event.type === "touchmove") {
            if (!this._touchItem)
                return

            cc.find("nodeContent/nodeBottom/recycleHighLight", this.node).active = this.checkButton(point)

            // this.showSell(this.checkButton(point))
            this._suspend.setPosition(point)
        }
        else if (event.type === "touchend") {
            if (!this._touchItem)
                return

            let end = this.checkItem(point)
            if (end) {
                this.changeItem(end)
            }
            else if (this.checkButton(point)) {                
                this.onSell()
            }

            cc.find("nodeContent/nodeBottom/recycleHighLight", this.node).active = false
            this.setSuspend(false)
        }
        else if (event.type === "touchcancel") {
            if (this.checkButton(point)) {
                this.onSell()                
            }
            
            cc.find("nodeContent/nodeBottom/recycleHighLight", this.node).active = false
            this.setSuspend(false)
        }
    }

    buildGrid(node: cc.Node) {
        if (!node || !(node instanceof cc.Node))
            return

        let size = node.getContentSize()
        let halfW = size.width / 2
        let halfH = size.height / 2
        let point = node.position
        point.x -= node.anchorX * size.width
        point.y -= node.anchorY * size.height

        let p1 = cc.v2(point.x, point.y + halfH)
        let p2 = cc.v2(point.x + halfW, point.y + size.height)
        let p3 = cc.v2(point.x + size.width, point.y + halfH)
        let p4 = cc.v2(point.x + halfW, point.y)

        let x = Math.round(((p1.x - p1.y * size.width / size.height) - 5) / 10)
        let y = Math.round(((p1.y + p1.x * size.height / size.width) - 5) / 10)

        return { p1: p1, p2: p2, p3: p3, p4: p4, y: y, x: x }
    }
}
