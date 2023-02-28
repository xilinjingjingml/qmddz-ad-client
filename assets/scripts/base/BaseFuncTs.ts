import { getGameConfig, getGameName } from "../gameConfig";
import { getAdUnitId, getPlayerStatusReq, getReliefState, sendReloadUserData } from "../moduleLobby/LobbyFunc";
import { GameMatchLogic } from './../moduleBase/GameMatchLogic';
import { AdsConfig } from './baseData/AdsConfig';
import DataManager from "./baseData/DataManager";
import NetManager from "./baseNet/NetManager";
import BaseScene from "./baseScene/BaseScene";
import SceneManager from "./baseScene/SceneManager";
import GameManager from "./GameManager";
import WxWrapper from './WxWrapper';
import { showAutonymPop } from "../moduleLobby/LobbyFunc";
import PluginManager, { EAdsResult, EAdsType } from "./PluginManager";
import EventTable from '../moduleLobby/EventTable';
import md5 = require("./extensions/md5.min")
import { NodeExtends } from "./extends/NodeExtends";
import { time } from "./utils/time";
import { http } from "./utils/http";

export function MsgBox(initParam: IMsgBox) {
    SceneManager.Instance.popScene<String>("moduleLobby", "MsgBox", initParam)
}

export function ParseSearch(search) {
	var args:any = {}
	if (search.indexOf('?') != -1) {
		var query = search.substr(1)
		var pairs = query.split('&')
		for (var i = 0; i < pairs.length; i++) {
			var sp = pairs[i].split('=')
			args[sp[0]] = decodeURIComponent(sp[1])
		}
	}
	return args
}

export function loadModule(moduleName, succ: () => void = null, fail: () => void = null) {
    let path = moduleName + "/prefab/ModuleStart";
    cc.loader.loadRes(path, 
        (err, res) => {
        if (err) {
            cc.log(err)
            fail && fail()
        }
        else if (res instanceof cc.Prefab) {
            let moduleStart = cc.instantiate(res)
            moduleStart.parent = cc.Canvas.instance.node
        }
        else{
            cc.log(err,res)
        }
    })
}

export function getUserRole(callback: () => void = null) {
    const params = {
        pid: DataManager.UserData.guid,
        flag: "lobby",
        sgtype: "f33",
        ticket: DataManager.UserData.ticket,
        pn: DataManager.Instance.packetName,
        versioncode: 14042902,
        version: DataManager.Instance.version,
        gameid: DataManager.Instance.gameId,
        token: md5("uid=" + DataManager.UserData.guid + "&key=232b969e8375")
    }

    http.open(DataManager.getURL("GET_USER_ROLE"), params, function (res) {
        if (res) {
            DataManager.CommonData["roleCfg"] = res
            DataManager.CommonData["realRoleCfg"] = true

            try {
                const info = JSON.parse(res.userInfo)
                DataManager.CommonData["bindReward"] = info.bindReward
                if (info.ret == 1) {
                    DataManager.CommonData["bindPhone"].hasBindMoble = 1
                    DataManager.CommonData["bindPhone"].BindPhone = info.phone
                }
            } catch (e) { }

            parseMonthCardData(res.rkTime, 2)
            parseMonthCardData(res.zkTime, 0)
            parseMonthCardData(res.ykTime, 1)

            DataManager.CommonData["firstPayBox"] = JSON.parse(DataManager.CommonData["roleCfg"]["firstPayBox"])

            callback && callback()
        }
    })
}

export function copyToClipBoard(str: string, succTip: string = "已复制到剪贴板") {
    if (CC_WECHATGAME) {
        WxWrapper.setClipboardData(str, function (success) {
            success ? iMessageBox(succTip) : iMessageBox("复制到剪贴板失败")
        })
    } else if (cc.sys.isNative) {
        PluginManager.copyToClipboard(str)
        MsgBox({
            title: "提示",
            content: succTip,
            buttonNum: 1,
            confirmClose: true,
        })
    } 
    else if (cc.sys.isBrowser) {
        var textArea = document.getElementById("clipBoard")
        if (textArea === null) {
            textArea = document.createElement("textarea")
            textArea.id = "clipBoard"
            textArea.textContent = str
            document.body.appendChild(textArea)
        }
        textArea.select()
        try {
            document.execCommand('copy')
            iMessageBox(succTip)
            document.body.removeChild(textArea)
        } catch (err) {
            iMessageBox("复制到剪贴板失败")
        }
    }
}

export function getClipBoard() {
    if (cc.sys.isNative) {
        return PluginManager.getClipBoardContent()
    } 
    else if (cc.sys.isBrowser) {
        var textArea = document.getElementById("clipBoard");
        if (textArea === null) {
            textArea = document.createElement("textarea");
            textArea.id = "clipBoard";
            document.body.appendChild(textArea);
        }
        textArea.focus();
        try {
            const msg = document.execCommand('paste') ? 'successful' : 'unsuccessful';
            if (msg) {
                let str = textArea.textContent
                document.body.removeChild(textArea);
                return str
            }
        } 
        catch (err) {
            document.body.removeChild(textArea);
            return ""
        }
    }
}

interface IMessageBox { message: string, callback?: Function, noSing?: boolean, zorder?: number, [key: string]: any }
export function iMessageBox(message: IMessageBox)
export function iMessageBox(message: string, callback?: Function)
export function iMessageBox(message: string | IMessageBox, callback?: Function) {
    const parmes: IMessageBox = typeof message === "string" ? { message: message, callback: callback } : message
    if (!("noSing" in parmes)) { parmes.noSing = true }
    if (!("zorder" in parmes)) { parmes.zorder = 2000 }
    SceneManager.Instance.popScene<String>("moduleLobby", "iMessageBox", parmes)
}

export function showGameReportPanel(initParam = []) {
    SceneManager.Instance.popScene<String>("moduleBaseRes", "GameReportPanel", initParam)
}

// export function showAwardResultPop(itemIndex, awardNum, func = null, img = null) {
export function showAwardResultPop(awards: any[], initParam = null, func = null) {
    if (null == initParam)
        initParam = []

    initParam["awards"] = awards
    if (null != func)
        initParam["closeCallback"] = func
    SceneManager.Instance.popScene<String>("moduleLobby", "AwardResultPop", initParam)
}

export function showDouble11ActivePop(initParam = null, func = null) {
    if (null == initParam)
        initParam = []

    SceneManager.Instance.popScene<String>("moduleLobby", "Double11ActivePop", initParam)
}

export function showCardNoteBuyPop(initParam = null, func = null) {
    if (null == initParam)
        initParam = []

    SceneManager.Instance.popScene<String>("moduleLobby", "CardNoteBuyPop", initParam)
}

export function showAwardMutipleResultPop(awards: any[], initParam = null, func = null) {
    if (null == initParam)
        initParam = []

    initParam["awards"] = awards
    initParam["closeCallback"] = func
    SceneManager.Instance.popScene<String>("moduleLobby", "AwardMutipleResultPop", initParam)
}

export function showScratchLotteryPop(initParam = null, func = null) {
    if (null == initParam)
        initParam = []

    SceneManager.Instance.popScene<String>("moduleLobby", "ScratchLotteryPop", initParam)
}

export function showActivityPortalPop(initParam = null, func = null) {
    if (null == initParam)
        initParam = []

    SceneManager.Instance.popScene<String>("moduleLobby", "ActivityPortalPop", initParam)
}

export function checkPhoneBinding() {
    if (DataManager.CommonData["bindPhone"].hasBindMoble != 1) {
        SceneManager.Instance.popScene("moduleLobby", "BindPhonePop")
        return false
    }

    return true
}

export function makeOrder(boxId, callback) {
    http.open(DataManager.getURL("WX_PAY_URL"), {
        appid: DataManager.Instance.wxAPPID,
        pid: DataManager.UserData.guid,
        ticket: DataManager.UserData.ticket,
        openid: DataManager.UserData.openId,
        boxid: boxId,
        openkey: "",
        pay_token: "",
        pf: "",
        pfkey: "",
        sessionId: "",
        sessionType: "",
        envFlag: "",
        sdkFlag: "ysdk"
    }, function (res) {
        if (res && res.ret == 0) {
            callback(null, res.order)
        } else {
            callback(res ? res.msg : "创建订单失败", null)
        }
    })
}

export function payOrder(boxItem, callback: Function = null) {
    if (!boxItem) {
        iMessageBox("商品不存在")
        return
    }

    if (cc.sys.isNative || CC_PREVIEW) {
        payOrderNative(boxItem, callback)
        return
    }

    if (cc.sys.os == cc.sys.OS_IOS) {
        showFriendPayPop(boxItem)
        return
    }

    makeOrder(boxItem.boxid, (error, order) => {
        if (order) {
            WxWrapper.pay({
                price: boxItem.price,
                order: order
            }, (success, message) => {
                if (success) {
                    sendReloadUserData()
                    boxItem.type && getShopBox(boxItem.type)
                    callback && callback(true)
                } else {
                    iMessageBox(message)
                }
            })
        } else {
            iMessageBox(error)
        }
    })
}

let statusIndex = 0
export function playADBanner(show: boolean, index: number) {
    if (isFreeAdvert()) {
        return
    }

    const sign = statusIndex & index
    if (show && sign === 0) {
        statusIndex |= index
        PluginManager.showAds(EAdsType.ADS_TYPE_BANNER, DataManager.Instance.onlineParam.adConfig.bannerAdId);return;
        WxWrapper.showBannerAdvert()
    } else if (!show && index === AdsConfig.banner.All) {
        statusIndex = 0
        PluginManager.hideAds(EAdsType.ADS_TYPE_BANNER);return;
        WxWrapper.hideBannerAdvert()
    } else if (!show && sign !== 0) {
        statusIndex ^= index
        statusIndex === 0 && PluginManager.hideAds(EAdsType.ADS_TYPE_BANNER);return;
        statusIndex === 0 && WxWrapper.hideBannerAdvert()
    }
}

let statusIndexGrid = 0
export function playADGrid(show: boolean, index: number) {
    if (isFreeAdvert()) {
        return
    }

    const sign = statusIndexGrid & index
    if (show && sign === 0) {
        statusIndexGrid |= index
        WxWrapper.showGridAdvert()
    } else if (!show && index === AdsConfig.grid.All) {
        statusIndexGrid = 0
        WxWrapper.hideGridAdvert()
    } else if (!show && sign !== 0) {
        statusIndexGrid ^= index
        statusIndexGrid === 0 && WxWrapper.hideGridAdvert()
    }
}

export function playAD(adIndex: number, success: Function) {
    if (DataManager.GlobalData.noAD) {
        shareAD({ callback: success })
        return
    }
    if (cc.sys.isNative || CC_PREVIEW) {
        DataManager.GlobalData.AdsCallBack = success
        PluginManager.showAds(EAdsType.ADS_TYPE_REWARTVIDEO, getAdUnitId(adIndex) || DataManager.Instance.onlineParam.adConfig.videoAdId)
        return
    }

    WxWrapper.showVideoAdvert(getAdUnitId(adIndex), (code) => {
        if (code == 0) {
            success()
        } else if (code == 2) {
            socialShare({
                withOpenId: true,
                callback: success
            })
        } else {
            iMessageBox("完整观看视频才可以领取奖励哦")
        }
    })
}

/**
 * 播放插屏广告
 */
export function playADInter() {
    if (cc.sys.isNative || CC_PREVIEW) {
        PluginManager.showAds(EAdsType.ADS_TYPE_INTER, DataManager.Instance.onlineParam.adConfig.interAdId)
        return
    }

    WxWrapper.showInterstitialAdvert()
}

/**
interface shareData {
    title?: string                  // 标题 不传使用随机配置
    imageUrl?: string               // 图片地址 可使用本地路径或网络路径 不传使用随机配置
    withOpenId?: boolean            // 是否带上自己的 openid 用于推广员绑定
    skipCheck?: boolean             // 是否跳过时间检查 默认要检查
    query?: { [k: string]: any }    // 其他额外参数
    callback?: Function             // 回调方法 只在分享成功时回调
}
*/
export function socialShare(shareData, adIndex?: number) {
    if (cc.sys.isNative || CC_PREVIEW) {
        shareAD(shareData)
        return
    }
    WxWrapper.shareAppMessage(shareData)
}

export function shareAD(shareData: IShareData & { callback?: Function, invite?: boolean, title?: string }) {
    const sharedData = DataManager.Instance.sharedData
    if (!sharedData) {
        iMessageBox("暂不支持分享")
        return
    }

    DataManager.GlobalData.shareADCallBack = shareData.callback
    DataManager.GlobalData.shareADTime = new Date().getTime()

    if (shareData.title) {
        shareData.ShareTitle = shareData.title
    } else if (shareData.invite || DataManager.Instance.sharedData.sdType == 0) {
        const titles = DataManager.Instance.onlineParam.share_titles || [
            "好友来助攻，海量红包进来就领！",
            "玩游戏就送红包！这是你未玩过的全新版本！",
            "天降红包，你就是趟着领红包的人！"
        ]
        shareData.ShareTitle = titles[Math.floor(Math.random() * titles.length)]
    }

    if (shareData.invite) {
        const url = DataManager.CommonData['shareUrl'] || "www.weipinggame.com.cn"
        shareData.ShareUrl = "https://" + url + "/bind/bindExtensionRelation/page?uid=" + DataManager.UserData.guid + "&gameid=" + DataManager.Instance.gameId + "&pn=" + DataManager.Instance.packetName + "&type=1"
        shareData.ShareWay = "WeiXin"
        shareData.ShareType = "0"
    }

    if (shareData.ShareWay || DataManager.Instance.sharedData.sdType == 0) {
        share(shareData)
        return
    }

    sharePng()
}

function sharePng() {
    if (!CC_JSB) {
        iMessageBox("暂不支持分享")
        return
    }
    const sharedData = DataManager.Instance.sharedData
    const filepath = jsb.fileUtils.getWritablePath() + 'share_bg_code_' + md5(sharedData.sdPic + sharedData.sdCodePic) + '.png'
    const shareFile = () => {
        share({ ShareWay: 'WeiXin', ShareType: '2', SharedImg: 'file://' + filepath })
    }

    cc.log('[sharePng] shareFile', filepath)
    if (jsb.fileUtils.isFileExist(filepath)) {
        shareFile()
        return
    }

    const node = new cc.Node()
    node.addComponent(cc.Sprite)
    node.active = false
    cc.Canvas.instance.node.addChild(node)
    const code = new cc.Node()
    code.y = -353
    code.addComponent(cc.Sprite)
    node.addChild(code)

    let counter = 2
    const count = () => {
        counter--
        if (counter != 0) {
            return
        }

        node.width = node.getComponent(cc.Sprite).spriteFrame.getTexture().width
        node.height = node.getComponent(cc.Sprite).spriteFrame.getTexture().height

        node.active = true
        createScreenShotNode(node, filepath)
        shareFile()
        node.destroy()
    }

    NodeExtends.setNodeSpriteNet({
        node: node,
        url: sharedData.sdPic,
        callback: count
    })

    NodeExtends.setNodeSpriteNet({
        node: code,
        url: sharedData.sdCodePic,
        callback: count
    })
}

export function enterGame(server, callFunc: () => void = null, newUser: boolean = false) {
    cc.log("entergame " + new Date().getTime())
    czcEvent("大厅", "进入游戏", "加载游戏模块 " + DataManager.Instance.userTag)
    if (DataManager.CommonData["gameServer"]) {
        NetManager.Instance.close(DataManager.CommonData["runGame"])
        delete DataManager.CommonData["runGame"]
        delete DataManager.CommonData["gameServer"]
    }

    cc.audioEngine.stopAll()

    DataManager.CommonData["RedpacketCount"] = DataManager.UserData.getItemNum(365)
 
    let gameId = server.gameId
    if (server.ddz_game_type)
        gameId = gameId * 10 + parseInt(server.ddz_game_type)
    DataManager.save(DataManager.UserData.guid + "lastGameId", gameId)        
    DataManager.CommonData["gameServer"] = server
    GameManager.onChangeFire()    
    let moduleName = getGameConfig(server.gameId)
    if (moduleName) {
        // czcEvent(getGameName(server.gameId), "加载1", "开始加载 " + DataManager.Instance.userTag)
        loadModule(moduleName + "Res")
    }

    if (null == DataManager.CommonData["firstGame"]) {
        DataManager.CommonData["firstGame"] = true
    }
}

export function gobackToMain(param?) {
    czcEvent("大厅", "离开游戏", "回到大厅 " + DataManager.Instance.userTag)
    if (DataManager.CommonData["gameServer"]) {
        NetManager.Instance.close(DataManager.CommonData["runGame"])
        DataManager.CommonData["leaveGameLevel"] = DataManager.CommonData["gameServer"].level
        DataManager.CommonData["ddzGameType"] = DataManager.CommonData["gameServer"].ddz_game_type
        DataManager.CommonData["leaveGameIsPrivate"] = DataManager.CommonData["gameServer"].isPrivate
        delete DataManager.CommonData["runGame"]
        delete DataManager.CommonData["gameServer"]

        DataManager.CommonData["leaveGame"] = true
        czcEvent("大厅", "离开游戏", "断开游戏服务器 " + DataManager.Instance.userTag)
    }   
    
    cc.audioEngine.uncacheAll()
    cc.audioEngine.stopAll()

    // isOnGameExit 0 正常退出 1 强制退出 -1 断线退出
    if (null != param && null != param["isOnGameExit"] && -1 != param["isOnGameExit"])
        DataManager.CommonData["isOnGameExit"] = param["isOnGameExit"]
    else
        DataManager.CommonData["isOnGameExit"] = null // 空状态会自动进入

    sendReloadUserData()

    loadModule("moduleLobby")
    GameManager.onChangeFire()
}

export function showShopPop() {
    // SceneManager.Instance.popScene<String>("moduleLobby", "ShopPop")
    // this.quickPayPop()
}

export function gobackGameforonExitConfirm(){
    let initParam = {
        title: "提示",
        content: "您上局游戏还没有结束，快回去虐他们！",
        confirmClose: true,
        confirmFunc: () => {
            getPlayerStatusReq([DataManager.UserData.guid])
        },
        maskCanClose: false
    }
    MsgBox(initParam)
}

let UnenoughState = cc.Enum({
    ONCE_PAY_BOX: 0,
    QUICK_PAY_BOX: 1,
    RELIEF_GOLD: 2,
})

let gameUnenough = [0, 1]
let lobbyUnenough = [2]

export function checkFirstBox(price = 6, havePhone: number = 0, gold: number = -1) {  
    for (const iterator of DataManager.Instance.OnceBoxs) {
        if (iterator.price == price && iterator.havePhone == havePhone) {
            if (iterator.isBuy == 0)
                return iterator    
        }
    }

    return null
}

export function checkOneYuanBox(price = 6, havePhone: number = 0, gold: number = -1) {
    for (const iterator of DataManager.Instance.OneYuanBoxs) {
        if (iterator.price == price && iterator.havePhone == havePhone) {
            if (iterator.isBuy == 0)
                return iterator    
        }
    }

    return null
}

export function oncePayBox(callback ?: (bFinish:boolean) => void, bQuickPay: boolean = true) {
    let bFind = null;
    cc.log(DataManager.Instance.OnceBoxs)
    bFind = checkFirstBox()

    if (null == bFind && bQuickPay == true) {
        quickPayPop(callback)

        // if (null != callback)
        //     callback(false)
        return 
    }
    else if (null != bFind) {
        SceneManager.Instance.popScene("moduleLobby", "FirstPayPop", {box: bFind, closeCallback: callback})
    }
}

export function quickPayPop(callback ?: (bFinish:boolean) => void) {
    SceneManager.Instance.popScene("moduleLobby", "QuickPayPop", {closeCallback: callback})
}

export function ReliefPop(callback ?: (bFinish:boolean) => void) {    
    
    let reliefLine = DataManager.Instance.getReliefLine()

    let pop = function(){
        sendReloadUserData()
        if (DataManager.UserData.money >= reliefLine){
            return
        }

        if (DataManager.CommonData["reliefStatus"]["reliefTimes"] > 0) {
            SceneManager.Instance.popScene("moduleLobby", "BankruptDefend", {closeCallback: callback})    
        }
        else if (DataManager.CommonData["gameServer"]) {
            quickPayPop()
        }
        else {
            unenoughGuidPop(callback)
        }
        // else if (null != callback) {
        //     callback(false)
        // }
        // else{
        //     SceneManager.Instance.popScene("moduleLobby", "UnenoughGuidePop")
        // }        
    }

    if (null == DataManager.CommonData["reliefStatus"]){
        getReliefState()
        // DataManager.Instance.node.runAction(cc.sequence(cc.delayTime(0.5), cc.callFunc(function() {  ReliefPop(callback)})))
    }
    // else{
    if (DataManager.CommonData["gameServer"])
        DataManager.Instance.node.runAction(cc.sequence(cc.delayTime(2), cc.callFunc(function() {  pop()})))
    else
        DataManager.Instance.node.runAction(cc.sequence(cc.delayTime(.5), cc.callFunc(function() {  pop()})))
    // }    
}

export function unenoughGuidPop(callback ?: (bFinish:boolean) => void) {
    SceneManager.Instance.popScene("moduleLobby", "UnenoughGuidePop", {closeCallback: callback}, cc.Vec2.ZERO, (scene: BaseScene) => {   
        // scene.setLabelString("nodePop/nodeItem2/content", "充值" + (DataManager.CommonData["needMoney"]/10000) + "元获得" + DataManager.CommonData["needMoney"] + "金豆")
    })
}

export function unenoughGold(type: number, enoughMoney: number, callback: () => void = null) { 
    if (DataManager.CommonData["gameServer"])
        type = 0
    else
        type = 1
        
    let sequence = type == 1 ? lobbyUnenough : gameUnenough

    DataManager.CommonData["needMoney"] = enoughMoney > 60000 ? 100000 : 60000 

    let isJunior = null != DataManager.CommonData["gameServer"] ? DataManager.CommonData["gameServer"]["level"] == 1 : true
    
    let reliefLine = DataManager.Instance.getReliefLine()
    // let func: (result: boolean) => void[] = []
    let func = []
    func[sequence.length] = callback
    for (let idx = sequence.length - 1; idx >= 0; idx--) {
        let popFunc: (result: boolean) => void = null
        if (UnenoughState.ONCE_PAY_BOX == sequence[idx] && isJunior) 
            popFunc = (result: boolean) => { if (!result) oncePayBox(func[idx + 1]); else if (null != callback) callback()}
        else if (UnenoughState.QUICK_PAY_BOX == sequence[idx] || UnenoughState.ONCE_PAY_BOX == sequence[idx]) 
            popFunc = (result: boolean) => { if (!result) quickPayPop(func[idx + 1]); else if (null != callback) callback()}
        else if (UnenoughState.RELIEF_GOLD == sequence[idx] && enoughMoney > reliefLine && DataManager.CommonData["gameServer"])
            popFunc = (result: boolean) => { if (!result) quickPayPop(func[idx + 1]); else if (null != callback) callback()}
        else if (UnenoughState.RELIEF_GOLD == sequence[idx] && enoughMoney > reliefLine)
            popFunc = (result: boolean) => { if (!result) unenoughGuidPop(func[idx + 1]); else if (null != callback) callback()}
        else if (UnenoughState.RELIEF_GOLD == sequence[idx])
            popFunc = (result: boolean) => { if (!result) ReliefPop(func[idx + 1]); else if (null != callback) callback()}
            
        func[idx] = popFunc
    }

    func[0](false);
}

export function checkServerMoneyLimit(server, callback: () => void = null) {    
    if (server.minMoney > DataManager.UserData.money) {                
        unenoughGold(0, server.minMoney, callback)
        return false
    }
    else if (server.maxmoney < DataManager.UserData.money) {
        let gameId = server.gameId
        if (gameId === 389)
            gameId = gameId * 10 + parseInt(server.ddz_game_type)
        let servers = getLowMoneyRoom(gameId)
        if (servers && servers.length > 0) {
            let initParam = {
                title: "提示",
                content: "<color=#8e7c62><size=26>您的金豆太多了，超出了本场次上<br/>限!重新选个能匹配您水平的场次吧!</size></color><br/>",
                confirmClose: true,
                confirmFunc: () => {
                    enterGame(servers[0])
                },
                cancelFun: callback,
                maskCanClose: false,
                exchangeButton: true,
                confirmText: "立即前往"
            }
            MsgBox(initParam)
        }
        else{        
            let initParam = {
                title: "提示",
                content: "您的金豆已经大于场次最高上限",
                buttonNum: 1,
                confirmClose: true,
                confirmFunc: callback,
                maskCanClose: false
            }
            MsgBox(initParam)
        }
        return false
    }
    
    return true
}

export function getLowMoneyRoom(gameId, level = null) {
    let gameType = 0
    // 处理斗地主三种类型
    let GameId = gameId
    if (gameId >= 3890) {
        gameType = gameId % 10
        gameId = Math.floor(gameId / 10)        
    }

    if (null == DataManager.CommonData["ServerDatas"] || null == DataManager.CommonData["ServerDatas"][gameId])
        return null

    let servers = getNewBieServer(GameId)
    if (null == servers || servers.length == 0)
        servers = DataManager.CommonData["ServerDatas"][gameId]
        .filter(item => item.newbieMode != 1 && 
            (level == null || item.level == level) &&
            item.minMoney <= DataManager.UserData.money && 
            (item.maxmoney == null || item.maxmoney >= DataManager.UserData.money) &&
            item.lc_room_mode != 1 && item.lc_room_mode != 2 &&
            (gameId != 389 || (gameId == 389 && item.ddz_game_type == gameType)))
    if (null == servers || 0 == servers.length)
        return servers

    if (servers.length > 1) {
        servers.sort((a, b) => a.level < b.level ? -1 : a.level > b.level ? 1 : 0)
        const higher = servers.filter(item => DataManager.UserData.money >= item.minMoney * 1.5)
        servers = higher.length > 0 ? [higher[higher.length - 1]] : servers
    }
    let minLevel = servers[0].level
    servers = servers.filter(item => {return (item.level == minLevel) && (item.lc_room_mode != 1) && item.lc_room_mode != 2})    
    return servers
}

export function getServerByGameIdAndServerId(gameid, serverid) {
    if (null == DataManager.CommonData["ServerDatas"] || null == DataManager.CommonData["ServerDatas"][gameid])
        return null
    return DataManager.CommonData["ServerDatas"][gameid].filter(item => item.serverId == serverid)
}

export function getMD5(value) {
    return md5(value)
}

export function showTrumpet(msg = null) {
    if (false == SceneManager.Instance.isSceneExist("TrumpetCom"))
        SceneManager.Instance.popScene("moduleLobby", "TrumpetCom", {msg: msg})
}

export function numberFormat(num: number, floatNum: number = 2, isEnforce: boolean = false) {
    if (num >= 100000000) {
        return (num / 100000000 > 1000 ? Math.floor(num / 100000000):
                   num / 100000000 > 100 ? Math.floor(num / 10000000) / 10:
                   Math.floor(num / 1000000) / 100) + "亿"
    }
    else if (num >= 10000) {
        return (num / 10000 > 1000 ? Math.floor(num / 10000) :
                    num / 10000 > 100 ? Math.floor(num / 1000) / 10 :
                    Math.floor(num / 100) / 100 ) + "万"
    }
    else if (num % 1 > 0 || isEnforce){
        return num > 1000 ? num.toFixed(floatNum - 2) :
                    num > 100 ? num.toFixed(floatNum - 1) :
                    num.toFixed(floatNum) 
    }
    return "" + num
}

export function numberFormat2(num: number) {
    num = Math.floor(num)
    if (num < 10)
        return "0" + num

    return "" + num
}

export function numberFormat3(num: number) {
    let strNum = "" + num
    let len = strNum.length
    let head = parseInt(strNum.substr(0, 3))
    let point = len % 3 
    point = point === 0 ? 3 : point
    let strHead = "" + head / Math.pow(10, (3 - point))
    if (len / 3 > 4)
        return strHead + "T"
    else if (len / 3 > 3)
        return strHead + "B"
    else if (len / 3 > 2)
        return strHead + "M"
    else if (len / 3 > 1)
        return strHead + "K"
    return strNum
}
 
export function czcEvent(moduleName, action, label) {
    if (cc.sys.isNative) {
        EventTable[action] && EventTable[action][label] && PluginManager.logEvent(EventTable[action][label], { [action]: label })
        return
    }
    if (window.wx && window.wx.aldSendEvent)
        window.wx.aldSendEvent(moduleName + '+' + action + '+' + label)
}

export function getShopBox(boxtype, callFunc: () => void = null) {
    let url = DataManager.getURL("SHOPITEMS")
    let param = {
        boxtype: boxtype,
        pn: DataManager.Instance.packetName,
        version: DataManager.Instance.version,
        imsi: "",
        uid: DataManager.UserData.guid,
        flag: 20141212
    };

    http.open(url, param, function(res) {
        if (res && res["sl"]) {
            if (boxtype == 2){
                DataManager.Instance.OneYuanBoxs = res["sl"]
                SceneManager.Instance.sendMessageToScene("updateOneYuanBox")
            }
            else if (boxtype == 5) {
                DataManager.Instance.ActiveBoxs = res["sl"]
            }
            else if (boxtype == 7) {
                DataManager.Instance.OnceBoxs = res["sl"]
                SceneManager.Instance.sendMessageToScene("updateOnceBox")
            }else if (boxtype == 9) {
                DataManager.Instance.DiscountBoxs = res["sl"]
            }
        }

        callFunc && callFunc()
    })
}

export function getNewBieRoundLimit() {
    if (DataManager.Instance.getOnlineParamSwitch("ShuffleCardsForNewBieFileABTest", 2)) {
        return DataManager.Instance.onlineParam.ShuffleCardsForNewBieFileRound || 6
    }

    return DataManager.Instance.onlineParam.newBieRoundLimit || 6
}

export function getNewBieServer(gameId) {
    let gameType = 0
    // 处理斗地主三种类型
    if (gameId >= 3890) {
        gameType = gameId % 10
        gameId = Math.floor(gameId / 10)        
    }

    if (new Date().getTime() / 1000 - DataManager.CommonData["regtime"] <= 60 * 60 * 2 && DataManager.CommonData["roleCfg"]["roundSum"] < getNewBieRoundLimit()){
        let server = DataManager.CommonData["ServerDatas"][gameId]
        let newBieLevel = server.filter(
            item => item.level == 1 && 
            item.newbieMode == 1 && 
            DataManager.UserData.money >= item.minMoney && 
            DataManager.UserData.money <= item.maxmoney &&
            (gameId != 389 || (gameId == 389 && item.ddz_game_type == gameType)))
        return newBieLevel
    }

    return null
}

export function TimeFormat(fmt, time = null) {
	var date = null
	if (typeof time === 'number' && !isNaN(time)) {
		date = new Date(time * 1000)
	} else if (time === null) {
		date = new Date()
	} else if (time instanceof Date) {
		date = time
	}

	if (!date) return null

	var o = {
		'm+': date.getMonth() + 1,
		'd+': date.getDate(),
		'H+': date.getHours(),
		'M+': date.getMinutes(),
		'S+': date.getSeconds()
	}

	if (/(y+)/.test(fmt)) {
		var year = /(y+)/.exec(fmt)[1]
		fmt = fmt.replace(year, (date.getFullYear() + '').substr(4 - year.length))
	}

	for (var k in o) {
		if (new RegExp('(' + k + ')').test(fmt)) {
			var t = new RegExp('(' + k + ')').exec(fmt)[1]
			fmt = fmt.replace(t, (t.length == 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
		}
	}
	return fmt
}

export function getNowTimeUnix() {
    let now = Math.floor(new Date().getTime() / 1000)
    return now
}

export function msToTime(s) {
    var ms = s % 1000;
    s = (s - ms) / 1000;
    return sToTime(s)
}

export function sToTime(s, fmt = 'HH:MM:SS') {
    if (fmt == 'SS') {
        return s
    }
    s = Math.round(s)
    var secs = s % 60;
    s = (s - secs) / 60;
    if (fmt == 'MM:SS') {
        return ("0" + s).slice(-2) + ':' + ("0" + secs).slice(-2);
    }
    var mins = s % 60;
    var hrs = (s - mins) / 60;
    return ("0" + hrs).slice(-2) + ':' + ("0" + mins).slice(-2) + ':' + ("0" + secs).slice(-2);
}

export function isIPhoneX() {
    const fsize = cc.view.getFrameSize()
    const ratio = fsize.width / fsize.height

    const epsilon = 0.0000000001
    const ratioIPhoneX = 2436 / 1125
    const ratioIPhoneXR_XSMax = 1792 / 828

    if (Math.abs(ratio - ratioIPhoneX) <= epsilon || Math.abs(ratio - ratioIPhoneXR_XSMax) <= epsilon) {
        return true
    }

    return false
}

export function updateUserAddress(listId: number = 0, realName: string, mobile: string, address: string, callback: (res) => void = null) {
    let url = DataManager.getURL("UPDATE_USER_ADDRESS")
    let params = {
        uid: DataManager.UserData.guid,
        ticket: DataManager.UserData.ticket,
        type: DataManager.CommonData["UserAddress"] && DataManager.CommonData["UserAddress"].length == 0 ? 1 : 2,
        gameId: DataManager.Instance.gameId,
        listId: listId,
        realName: realName,
        mobile: mobile,
        province: "-",
        city: "-", 
        county: "-", 
        address: address
    }

    http.open(url, params, function(res) {
        if(res && res.ret == 1) {            
            
            if(callback)
                callback(res.ret) 
        } else {
            iMessageBox(res ? res.desc : "请求失败")
        }
    })
}

export function getUserAddress(callback: () => void) {
    let url = DataManager.getURL("GET_USER_ADDRESS")
    let params = {
        uid: DataManager.UserData.guid,
        ticket: DataManager.UserData.ticket,
        gameId: DataManager.Instance.gameId,
    }

    http.open(url, params, function(res) {
        if(res && res.ret == 0) {            
            DataManager.CommonData["UserAddress"] = res["list"]
            if(callback)
                callback() 
        }
    })
}

export function setGray(node, state = 1)
{
    var s = node.getComponentsInChildren(cc.Sprite);
    for(var i = 0; i < s.length; i++)
    {   
        if (state == 1) {            
            s[i].setMaterial(0, cc.Material.getBuiltinMaterial("2d-gray-sprite"));
        }else{
            s[i].setMaterial(0, cc.Material.getBuiltinMaterial("2d-sprite", s[i]));
        }
    }
}

export function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

export function enterPrivateGame(game_id_, opt, server_id,  baseType, forceOpenGPS = false, isCarryMoney = false) {
    cc.log("LobbyGameLogic:enterPrivateGame(game_id_, server_id, baseType)", game_id_, server_id, baseType)
    cc.log("LobbyGameLogic:enterPrivateGame forceOpenGPS= ",forceOpenGPS)
    cc.log(opt)

    if (DataManager.Instance.onlineParam.forceOpenGPS == 1) {
        //gps
    }

    let gameid = parseInt(game_id_)

    if (DataManager.CommonData["gameServer"]) {
        NetManager.Instance.close(DataManager.CommonData["runGame"])
        delete DataManager.CommonData["runGame"]
        delete DataManager.CommonData["gameServer"]
    }

    cc.audioEngine.stopAll()
     
    if (null == DataManager.CommonData["ServerDatas"] || null == DataManager.CommonData["ServerDatas"][gameid])
        return null
    
    let servers = DataManager.CommonData["ServerDatas"][gameid]
        .filter(item => item.lc_room_mode == 1 || item.lc_room_mode == 4)
    
    if (isCarryMoney)
        servers = servers.filter(item => item.settle_money_type && item.settle_money_type == 1)
    else 
        servers = servers.filter(item => item.settle_money_type == null)

    let server = servers[Math.round(100) % servers.length]
    if (null != server_id) 
        server = servers.filter(item => item.server_id = server_id)[0]
    if (null == server){
        iMessageBox("私人房暂时未开放,请稍候再试!")
        return
    }

    if (server.vip_limit && server.vip_limit > DataManager.CommonData["VipData"].vipLevel) {
        let initParam = {
            title: "提示",
            content: "需要VIP" + server.vip_limit + "级以上才能进入该私人房！!",
            buttonNum: 1,
            confirmClose: true,
        }
        MsgBox(initParam)
        return
    }
    server.gameId = gameid
    server.pr_info = opt
    server.isPrivate = true
    DataManager.CommonData["gameServer"] = server
    GameManager.onChangeFire()
        
    DataManager.CommonData["RedpacketCount"] = DataManager.UserData.getItemNum(365)

    let moduleName = getGameConfig(gameid)
    if (moduleName) {
        // czcEvent(getGameName(server.gameId), "加载1", "开始加载 " + DataManager.Instance.userTag)
            loadModule(moduleName + "Res")
    }
}

export function getPrivateInviteInfo(code) {
    let socketMsg = {
        opcode: "proto_cl_get_private_invite_info_req",
        inviteCode: code
    }
    NetManager.Instance.send("lobby", socketMsg)
}

export function leftMatchTime(match: IMatchInfo): number {
    if (match == null || match.begin == null) {
        return -1
    }
    return match.begin - Math.floor(new Date().getTime() / 1000)// - 10 // 增加10秒的缓冲 开赛前10秒不再报名
}

export function checkWaterMatchTime(match: IMatchInfo): boolean {
    if (match == null || match.type != 2) {
        return true
    }
    const now = Math.floor(new Date().getTime() / 1000)

    // 比赛还未开赛
    let matchBegin = Math.floor(new Date(new Date(match.matchBegin * 1000).toLocaleDateString()).getTime() / 1000)
    if (now < matchBegin) {
        iMessageBox(time.format("比赛mm月dd日开赛，暂未开始报名！", match.matchBegin))
        return false
    }

    // 比赛已经结赛
    let matchEnd = Math.floor(new Date(new Date(match.matchEnd * 1000).toLocaleDateString()).getTime() / 1000)
    if (now > matchEnd) {
        iMessageBox(time.format("比赛mm月dd日已经结赛！", match.matchEnd))
        return false
    }

    const midnight = Math.floor(new Date(new Date().toLocaleDateString()).getTime() / 1000)
    const matchDate = match.scheduleList[0]

    // 比赛时间段还未开始
    if (now < midnight + matchDate.matchBeginDate - match.signTime) {
        iMessageBox(time.format("比赛HH点MM分开始，请稍后！", midnight + matchDate.matchBeginDate))
        return false
    }

    // 比赛已经结赛
    if (matchDate.matchEndDate > 0 && now > (midnight + matchDate.matchEndDate)) {
        iMessageBox(time.format("比赛今天已结束", midnight + matchDate.matchEndDate))
        return false
    }

    return true
}

export function getLeadTime() {
    return DataManager.Instance.onlineParam.lead_time || 300
}

export function gotoMatchSvr(match: IMatchInfo): void {
    const servers = DataManager.CommonData["ServerDatas"][match.gameid]
    if (servers) {
        for (const server of servers) {
            if (server.serverId == match.serverid) {
                enterGame(Object.assign({ matchId: match.matchId, matchType: match.matchType }, server))
                match.begin == null
                return
            }
        }
    }
    iMessageBox("比赛暂未开放")
}

export function goBackToMatch(params?: { matchInfo?: { matchType: number }, msg?: string, showMatchSign?: true }): void {
    DataManager.CommonData["showMatchScene"] = params || {}
    gobackToMain()
}

export function getSpriteByItemId(id: number): cc.SpriteFrame {
    if (id == -12) {
        return DataManager.Instance.getSpriteFrame("itemIcon", "dca_dc_item_2")
    } else if (id == -110) {
        return DataManager.Instance.getSpriteFrame("itemIcon", "dca_dc_item_10")
    } else if (id == -120) {
        return DataManager.Instance.getSpriteFrame("itemIcon", "dca_dc_item_20")
    } else if (id == -1100) {
        return DataManager.Instance.getSpriteFrame("itemIcon", "dca_dc_item_100")
    } else if (id == 0) {
        return DataManager.Instance.getSpriteFrame("itemIcon", "gold_icon_1")
    } else if (id == 10000) {
        return DataManager.Instance.getSpriteFrame("itemIcon", "gold_icon_2")
    } else if (id == 11000) {
        return DataManager.Instance.getSpriteFrame("itemIcon", "combined_token_1")
    } else if (id == 2) {
        return DataManager.Instance.getSpriteFrame("itemIcon", "item_icon_2")
    } else if (id == 365) {
        return DataManager.Instance.getSpriteFrame("itemIcon", "item_small_redpacket")
    } else if (id == 367) {
        return DataManager.Instance.getSpriteFrame("itemIcon", "item_small_qttcoin")
    } else if (id == 372) {
        return DataManager.Instance.getSpriteFrame("itemIcon", "diamond_icon")
    } else if (id == 373) {
        return DataManager.Instance.getSpriteFrame("itemIcon", "double_card")
    } else if (id == 374) {
        return DataManager.Instance.getSpriteFrame("itemIcon", "exp_card")
    } else if (id == 1192) {
        return DataManager.Instance.getSpriteFrame("itemIcon", "diamond_icon")
    } else if (id == 368) {
        return DataManager.Instance.getSpriteFrame("itemIcon", "icon_368")
    } else if (id == 375) {
        return DataManager.Instance.getSpriteFrame("itemIcon", "icon_375")
    } else if (id == 378) {
        return DataManager.Instance.getSpriteFrame("itemIcon", "icon_378")
    }

    return null
}

const itemNames = {
    [-1]: "优惠券",
    [0]: "金豆",
    [2]: "记牌器",
    [365]: "福卡",
    [367]: "趣金币",
    [372]: "钻石",
    [373]: "超级加倍卡",
    [374]: "VIP经验",
    [1192]: "钻石",
    [368]: "豆浆机券",
    [375]: "看底牌卡",
    [378]: "手机",
    [376]: "高级碎片",
    [377]: "传说碎片",
    [11000]: "银币",
}

export function getNameByItemId(id: number): string {
    return itemNames[id] || ""
}

export function extendMatchLogic(gameSceneInstance) {
    for (const key in GameMatchLogic.extendFunction) {
        if (typeof (gameSceneInstance[key]) != "undefined") {
            let oldfuntion = gameSceneInstance[key]
            gameSceneInstance[key + "_old"] = oldfuntion
        }
        gameSceneInstance[key] = (...theArgs) => {
            GameMatchLogic.extendFunction[key](gameSceneInstance, key, ...theArgs)
        }
    }
}

export function getGameServers(gameId) {
    let gameType = 0
    // 处理斗地主三种类型
    if (gameId >= 3890) {
        gameType = gameId % 10
        gameId = Math.floor(gameId / 10)        
    }
    let servers = []
    if (null == DataManager.CommonData["ServerDatas"][gameId])        
        return servers

    servers = Object.assign(servers, DataManager.CommonData["ServerDatas"][gameId])
    // for (let iter of DataManager.CommonData["ServerDatas"][gameId]) {
    //     if (gameId == 389 && iter.level == 7)
    //         continue;
    //     else if (gameId == 390 && iter.level == 5)
    //         continue;
            
    //     servers.push(Object.assign(iter))
    // }
    
    // if (gameId == 389) {
    //     for (let iter of DataManager.CommonData["ServerDatas"][390] || []) {
    //         if (iter.level == 5) {
    //             servers.push(Object.assign(iter))
    //         }
    //     }
    // } else if (gameId == 390) {
    //     for (let iter of DataManager.CommonData["ServerDatas"][389] || []) {
    //         if (iter.level == 7) {
    //             servers.push(Object.assign(iter))
    //         }
    //     }
    // }

    servers = servers.filter(item => { 
        return (item.newbieMode != 1 && item.lc_room_mode != 1) && 
               (gameId != 389 || (gameId == 389 && item.ddz_game_type == gameType))
    })
    servers.sort((a, b) => a.minMoney < b.minMoney ? -1 : a.minMoney > b.minMoney ? 1 : 0)

    return servers
}

// 比较字符串版本
export function versionCompare(versionA: string, versionB: string): number {
    const vA = versionA.split('.')
    const vB = versionB.split('.')
    for (let i = 0; i < vA.length; ++i) {
        const a = parseInt(vA[i])
        const b = parseInt(vB[i] || '0')
        if (a === b) {
            continue
        } else {
            return a - b
        }
    }
    if (vB.length > vA.length) {
        return -1
    } else {
        return 0
    }
}

// 调用java方法
export function callStaticMethod(clsName: string, methodName: string, methodSig?: string, params: any[] = []): any {
    if (!CC_JSB) {
        return
    }
    try {
        methodSig && params.unshift(methodSig)
        return jsb.reflection.callStaticMethod.apply(jsb.reflection, [clsName, methodName].concat(params))
    } catch (error) {
        cc.error("callStaticMethod", JSON.stringify(error))
    }
}

export interface IConfirmBox {
    title?: string
    content: string
    confirmText?: string
    cancelText?: string
    closeFunc?: Function
    confirmFunc?: Function
    cancelFunc?: Function
    showClose?: boolean
    confirmClose?: boolean
    buttonNum?: number
    exchangeButton?: boolean
    maskCanClose?: boolean
    zIndex?: number
}
// 确认弹框
export function ConfirmBox(initParam: IConfirmBox): void {
    SceneManager.Instance.popScene<String>("moduleLobby", "ConfirmBox", initParam)
}

// 检测网络
export function checkNetwork(handler: Function, must: boolean = false, top: boolean = false): void {
    cc.log("[checkNetwork]")
    if (!must && cc.sys.getNetworkType() != cc.sys.NetworkType.NONE) {
        cc.log("[checkNetwork] handler")
        handler && handler()
        return
    }

    var initParam = {
        title: "温馨提示",
        content: "您的设备没有网络了",
        confirmText: "再次连接",
        cancelText: "解决方案",
        confirmFunc: () => {
            cc.Canvas.instance.node.runAction(cc.sequence(
                cc.delayTime(0.2),
                cc.callFunc(() => {
                    cc.log("[checkNetwork] confirmFunc")
                    checkNetwork(handler)
                })
            ))
        },
        cancelFunc: () => {
            cc.Canvas.instance.node.runAction(cc.sequence(
                cc.delayTime(0.2),
                cc.callFunc(() => {
                    cc.log("[checkNetwork] cancelFunc")
                    if (cc.sys.os == cc.sys.OS_IOS) {
                        initParam.content = "建议您按照以下方法进行检查 \n\n1.打开手机的设置，检查WIFI或蜂窝移动网络是否开启。\n2.将联网方式（WiFi和移动蜂窝数据）切换一下再试。\n3.打开手机设置，滑动查看页面底部，寻找到该游戏后点击，检查移动蜂窝数据的选项是否开启\n4.如果仍无法连接，请您稍后再试。"
                    } else {
                        initParam.content = "建议您按照以下方法进行检查\n\n1.打开手机的设置，检查WLAN或移动数据是否开启。\n2.将联网方式（WLAN和移动数据）切换一下再试。\n3.如果仍无法连接，请您稍后再试。"
                    }
                    initParam.buttonNum = 1
                    ConfirmBox(initParam)
                })
            ))
        },
        buttonNum: 2,
        showClose: false,
        maskCanClose: false
    }
    if (top) {
        initParam["zIndex"] = cc.macro.MAX_ZINDEX
    }
    cc.log("[checkNetwork] ConfirmBox")
    ConfirmBox(initParam)
}

interface IShareData {
    ShareWay?: "WeiXin" | "PengYouQuan",
    ShareTaskType?: string
    ShareTitle?: string
    ShareText?: string
    ShareUrl?: string
    ShareType?: "0" | "1" | "2"
    SharedImg?: string
}
export function share(data: IShareData) {
    cc.log("[BaseFuncTs.share]", JSON.stringify(data))
    if (!DataManager.Instance.sharedData) {
        return
    }

    const sharedData = DataManager.Instance.sharedData
    PluginManager.share({
        ShareWay: data.ShareWay == "PengYouQuan" ? "1004" : "1005",
        ShareTaskType: data.ShareTaskType || "0",
        ShareTitle: data.ShareTitle || sharedData.sdTitle,
        ShareText: data.ShareText || sharedData.sdContent[Math.floor(Math.random() * sharedData.sdContent.length)],
        ShareUrl: data.ShareUrl || sharedData.sdUrl,
        ShareType: data.ShareType || sharedData.sdType.toString(),
        gameid: DataManager.Instance.gameId.toString(),
        SharedImg: data.SharedImg || "file://thirdparty/icon.png",
    })
}

export function createScreenShotNode(element: cc.Node, filePath: string) {
    const width = element.width
    const height = element.height

    const camera = element.addComponent(cc.Camera)

    // 设置你想要的截图内容的 cullingMask
    camera.cullingMask = 0xffffffff

    // 新建一个 RenderTexture，并且设置 camera 的 targetTexture 为新建的 RenderTexture，这样 camera 的内容将会渲染到新建的 RenderTexture 中。
    const texture = new cc.RenderTexture()
    texture.initWithSize(width, height, cc.game['_renderContext'].STENCIL_INDEX8)
    camera.targetTexture = texture

    // 渲染一次摄像机，即更新一次内容到 RenderTexture 中
    camera.render(element)

    // 这样我们就能从 RenderTexture 中获取到数据了
    const data = texture.readPixels()
    const picData = new Uint8Array(width * height * 4)
    const rowBytes = width * 4
    for (let row = 0; row < height; row++) {
        const srow = height - 1 - row
        const start = srow * width * 4
        const reStart = row * width * 4
        for (let i = 0; i < rowBytes; i++) {
            picData[reStart + i] = data[start + i]
        }
    }

    const success = jsb.saveImageData(picData, width, height, filePath)
    if (success) {
        cc.log("[createScreenShotNode] saveImageData success:" + filePath)
    } else {
        cc.log("[createScreenShotNode] saveImageData failed!")
    }

    element.removeComponent(cc.Camera)
}

export function getNotchHeight(): number {
    const frameSize = cc.view.getFrameSize()
    if (frameSize.equals(cc.size(2436, 1125)) || frameSize.equals(cc.size(2688, 1248)) || frameSize.equals(cc.size(1792, 828))) {
        return 90
    }
    if (frameSize.equals(cc.size(812, 375))) {
        return 30
    }
    return PluginManager.getNotchHeight()
    return WxWrapper.getNotchHeight()
}

export function updateNodeWidget(node: cc.Node) {
    const widget = node.getComponent(cc.Widget)
    if (widget) {
        widget.updateAlignment()
    }

    for (const child of node.children) {
        updateNodeWidget(child)
    }
}

export function payOrderNative(boxItem, callback: Function = null) {
    // 实名认证 才能支付
    if (DataManager.CommonData["roleCfg"].isBinding != 1) {
        if (DataManager.Instance.onlineParam.idvalidPay == 1) {
            showAutonymPop({ noClose: true, content: "亲爱的用户，根据青少年防沉迷系统的要求，请认证后再充值" })
            return
        } else if (DataManager.Instance.onlineParam.idvalidPay == 2) {
            showAutonymPop({ noClose: false, content: "亲爱的用户，根据青少年防沉迷系统的要求，请认证后再充值" })
            return
        }
    }

    // 禁止支付
    const no_pay_tips = DataManager.getOnlineParam("no_pay_tips")
    if (no_pay_tips) {
        iMessageBox(no_pay_tips)
        return
    }

    if (boxItem.disBatchId != null) {
        pluginPay("IAPAlipayH5", boxItem, callback)
        return
    }

    // 唯一支付
    let onlyPayType
    if (DataManager.Instance.onlineParam.only_pay_type) {
        onlyPayType = DataManager.Instance.onlineParam.only_pay_type
    }

    const payTypeList: string[] = []
    if (boxItem && boxItem.pmList) {
        for (const pm of boxItem.pmList) {
            const payType = PluginManager.getPayTypeByMid(pm.mid)
            if (payType) {
                if (onlyPayType) {
                    if (payType == onlyPayType) {
                        pluginPay(payType, boxItem, callback)
                        return
                    }
                    continue
                }
                payTypeList.push(payType)
            }
        }
    }
    if (payTypeList.length == 0) {
        iMessageBox('您购买的商品不存在')
        return
    }

    SceneManager.Instance.popScene("moduleLobby", "PayBox", { boxItem: boxItem, callback: callback })
}

export function pluginPay(payType: string, boxItem: any, callback: Function) {
    cc.log("[pluginPay]", payType)
    if (payType.substr(-2) == "H5") {
        h5Pay(payType, boxItem, callback)
        return
    }
    const info = {
        boxId: boxItem.boxid + "",
        goodsLogo: boxItem.icon,
        goodsName: boxItem.boxname,
        desc: boxItem.desc,
        serialno: boxItem.serino,
        saleMoney: boxItem.price + "",
        isSmsQuickPay: "0",
        havePhone: boxItem.havePhone + "",
    }
    if (boxItem.pmList) {
        for (const pm of boxItem.pmList) {
            info['mid_' + pm.mid] = pm.serialno
        }
    }
    DataManager.GlobalData.IapCallBack = callback
    PluginManager.pay(payType, info)
}

export function h5Pay(payType: string, boxItem: any, callback: Function) {
    cc.log("[h5Pay]", payType)
    if (payType == "IAPAlipayH5") {
        let url = DataManager.getURL("ALIPAY_PAY_H5")
        let params = {
            pid: DataManager.UserData.guid,
            boxid: boxItem.boxid,
            client: "wap",
        }
        if (boxItem.disBatchId != null) {
            params["disBatchId"] = boxItem.disBatchId
        }
        var paramArr = []
        for (var key in params) {
            paramArr.push(key + '=' + encodeURIComponent(params[key]))
        }
        cc.sys.openURL(url + "?" + paramArr.join("&"))

        callback()
    } else if (payType == "IAPWeiXinH5") {
        let url = DataManager.getURL("WEIXIN_PAY_H5")
        let params = {
            pn: DataManager.Instance.packetName,
            pid: DataManager.UserData.guid,
            ticket: DataManager.UserData.ticket,
            boxid: boxItem.boxid,
            version: PluginManager.getPluginVersion(),
            imei: PluginManager.getDeviceIMEI(),
            appid: "wxed94b10ddec0cefd",
        }
        http.open({
            url: url,
            query: params,
            method: "POST",
            callback: function (res) {
                if (res) {
                    if (res.ret == 0) {
                        if (res.mweb_url) {
                            cc.sys.openURL(DataManager.Instance.envConfigs.payURL + "mallJsp/MidUrl.jsp?Url=" + encodeURIComponent(res.mweb_url))
                        }
                    } else {
                        iMessageBox(res.msg || "支付失败")
                    }
                }
            }
        })
    }
}

export function pluginPayResult(data: string) {
    cc.log('[pluginPayResult]', data)
    const info: { PayResultCode: number, msg: string, payInfo: any } = JSON.parse(data)
    if (info.msg.length > 0) {
        iMessageBox(info.msg)
    }
    if (info.PayResultCode == 0) {
        sendReloadUserData()
        if (DataManager.GlobalData.IapCallBack) {
            pluginCallBack(DataManager.GlobalData.IapCallBack)
        }
        DataManager.GlobalData.IapCallBack = null
    }
    if (info.msg.length > 0) {
        DataManager.GlobalData.IapCallBack = null
    }
}

export function pluginAdsResult(info: { AdsResultCode: number, msg: string }) {
    cc.log('[pluginAdsResult]', info)
    if (!DataManager.GlobalData.AdsCallBack) {
        return
    }
    if (info.AdsResultCode == EAdsResult.RESULT_CODE_REWARTVIDEO_SUCCEES) {
        SceneManager.Instance.closeScene("iMessageBox")
        if (DataManager.GlobalData.AdsCallBack) {
            pluginCallBack(DataManager.GlobalData.AdsCallBack)
        }
        DataManager.GlobalData.AdsCallBack = null
    } else if (info.AdsResultCode == EAdsResult.RESULT_CODE_REWARTVIDEO_FAIL) {
        SceneManager.Instance.closeScene("iMessageBox")
        MsgBox({
            title: "提示",
            content: "完整观看视频才可以领取奖励哦",
            confirmClose: true,
            maskCanClose: false,
            buttonNum: 1,
            showBanner: true,
        })
        DataManager.GlobalData.AdsCallBack = null
    } else if (info.AdsResultCode == EAdsResult.RESULT_CODE_REWARTVIDEO_LOAD_FAIL) {
        SceneManager.Instance.closeScene("iMessageBox")
        iMessageBox("视频广告加载失败 请再点击一次")
        DataManager.GlobalData.AdsCallBack = null
    } else if (info.AdsResultCode == EAdsResult.RESULT_CODE_REWARTVIDEO_LOAD_SUCCESS) {
        SceneManager.Instance.closeScene("iMessageBox")
    }
}

export function pluginCallBack(callback: Function, delayTime = 0.5) {
    cc.Canvas.instance.node.runAction(cc.sequence([
        cc.delayTime(delayTime),
        cc.callFunc(callback)
    ]))
}

export function kickout(changeLogin = true) {
    if (DataManager.CommonData["gameServer"]) {
        NetManager.Instance.close(DataManager.CommonData["runGame"])
        delete DataManager.CommonData["runGame"]
        delete DataManager.CommonData["gameServer"]
    }
    NetManager.Instance.close("lobby", true, true)

    cc.audioEngine.stopAll()

    playADBanner(false, AdsConfig.banner.All)

    if (changeLogin) {
        cc.sys.localStorage.removeItem('last_login_type')
        PluginManager.logout()
    }

    cc.game.restart()
}

export function delayCallback(time: number, callback: Function) {
    const action = cc.Canvas.instance.node.runAction(cc.repeatForever(cc.sequence(cc.delayTime(1), cc.callFunc(() => {
        if (Math.floor(new Date().getTime() / 1000) >= time) {
            cc.Canvas.instance.node.stopAction(action)
            callback()
        }
    }))))
}

export function findStringIndexs(src: string, target: any[]) {
    let res = []
    if(src.length == 0) {
        return res
    }

    for (const n of target) {       
        let cur = src.indexOf(n) 
        if(cur != -1) {
            res.push(cur)
        }
    }
    
    return res
}

export function updateUserInfo(success: () => void = null) {
    WxWrapper.login((err, res) => {
        iMessageBox(res && res.ret == 0 ? "同步数据成功" : "同步数据失败:" + err || (res ? res.tips || res.msg || "未知错误" : "请求异常"))
        if (res && res.ret == 0) {
            DataManager.Instance.setUserData({
                pid: res.pid,
                ticket: res.ticket,
                nickname: res.nickname,
                face: res.face,
                imei: res.imei,
                sex: res.sex,
                openId: res.openId,
            })

            if (res.isAward) {
                czcEvent("大厅", "用户信息", "同步用户数据")
                showAwardResultPop([
                    {
                        index: 365,
                        num: 2000
                    }
                ])
            }

            success && success()
            SceneManager.Instance.sendMessageToScene("onUserInfoUpdate")
        }
    }, true)
}


export function screenshot(node: cc.Node, callback: Function, fileType: 'jpg' | 'png' = 'jpg') {
    const boundingBox = node.getBoundingBoxToWorld()
    const gapSize = window['_fullWinSize'] ? cc.size(window['_fullWinSize'].width - cc.winSize.width, window['_fullWinSize'].height - cc.winSize.height) : cc.Size.ZERO
    const scale = cc.Canvas.instance.fitHeight ? cc.view.getScaleY() : cc.view.getScaleX()
    WxWrapper.captureScreen({
        fileType: fileType,
        x: (boundingBox.x + gapSize.width / 2) * scale,
        y: (boundingBox.y + gapSize.height / 2) * scale,
        width: Math.round(boundingBox.width * scale),
        height: Math.round(boundingBox.height * scale),
        destWidth: Math.round(boundingBox.width),
        destHeight: Math.round(boundingBox.height),
    }, callback)
}

export function zeroDate() {
    const now = new Date()
    now.setHours(0, 0, 0, 0)
    return now
}

export function getRedPacketAwardConfig(): number[] {
    return DataManager.Instance.onlineParam.RedPacketAwardConfig || [0, 0.2, 0.3, 0.5, 1, 2]
}

// 上传快手数据
export function uploadKuaiShou(type: number) {
    if (!DataManager.CommonData.kuaishou_callback) {
        cc.log("uploadKuaiShou callback not find")
        return
    }
    http.open("http://ad.partner.gifshow.com/track/activate", {
        event_type: type,
        event_time: new Date().getTime(),
        callback: DataManager.CommonData.kuaishou_callback
    })
}

function parseMonthCardData(data, type) {
    // 0 当天未领取 -1 没有购买至尊月卡 -2 已过期 -3 当天已领取
    if (data) {
        const cardData = DataManager.UserData.monthCardStatus[type]
        if (data.length > 0) {
            const date = new Date()
            const nowtime = Math.floor(date.getTime() / 1000)
            date.setHours(0, 0, 0, 0)
            const zerotime = Math.floor(date.getTime() / 1000)

            const endTime = data[0].endTime  // 秒
            const lastGetDateStr = String(data[0].lastGetDate) // yyyymmdd

            const year = Number(lastGetDateStr.substr(0, 4))
            const month = Number(lastGetDateStr.substr(4, 2)) - 1
            const day = Number(lastGetDateStr.substr(6, 2))
            date.setFullYear(year, month, day)

            const lastGetTime = Math.floor(date.getTime() / 1000)

            if (nowtime > endTime) {
                cardData.ret = -2
            } else {
                if (lastGetTime >= zerotime) {
                    cardData.ret = -3
                } else {
                    cardData.ret = 0
                }

                cardData.remainingDays = Math.ceil((endTime - nowtime) / 86400)
                const tmp = DataManager.CommonData.freeAdvertTime || 0
                endTime > tmp && (DataManager.CommonData.freeAdvertTime = endTime)
            }
        } else {
            cardData.ret = -1
        }
    }
}

let server_time_diff = 0 // 毫秒
export function setServerTime(timestamp) {
    server_time_diff = Math.ceil(timestamp * 1000 - Date.now())
}

export function accurateTime(isNeedObj = false): any {
    const ms = Date.now() + server_time_diff
    if (isNeedObj) {
        return new Date(ms)
    }

    return Math.ceil(ms / 1000)
}

export function isFreeAdvert() {
    if (DataManager.GlobalData.noAD) {
        return true
    }
    return DataManager.CommonData.freeAdvertTime ? accurateTime() < DataManager.CommonData.freeAdvertTime: false
}

export function showNoticePop(imageUrl, onClose = null) {
    SceneManager.Instance.popScene<String>("moduleLobby", "NoticePop", { url: imageUrl, closeCallback: onClose })
}

export function showFriendPayPop(data, payforother = false) {
    SceneManager.Instance.popScene<String>("moduleLobby", "FriendPayPop", { data: data, status: payforother ? 2 : 1 })
}

export function loadOrderStatus(order, callback) {
    http.open(DataManager.getURL("ORDER_STATUS"), {
        pid: DataManager.UserData.guid,
        ticket: DataManager.UserData.ticket,
        order: order,
        randomno: 9527
    }, (res) => {
        callback(res)
    })
}

export function quickStartGame() {
    let gameId = DataManager.load(DataManager.UserData.guid + "lastGameId") || DataManager.Instance.getGameList()[0]
    if (gameId == 389) {
        gameId = 3892
    }

    const servers = getLowMoneyRoom(gameId)
    if (servers && servers.length > 0) {
        const idx = Math.floor(Math.random() * 100 % servers.length)
        enterGame(servers[idx], null, false)
    } else if (DataManager.UserData.money < DataManager.Instance.getReliefLine()) {
        // 没服务器就是初级场
        unenoughGold(0, DataManager.Instance.getReliefLine())
    }
}

export function setNodeSpriteQRCode(node: cc.Node, url:string) {
    NodeExtends.setNodeSpriteNet({ url: "https://www.izhangxin.com/get/dimension?codeurl=" + encodeURIComponent(url), node: node, fixSize: true })
}

export function setNodeSpriteQRCodeShareMoney(node: cc.Node) {
    let url = "https://www.wan78.net/zhicheng/qmddz-ad-share-money/"
    if (DataManager.Instance.onlineParam.shareMoneyUrl) {
        url = DataManager.Instance.onlineParam.shareMoneyUrl
    }
    if (url.indexOf("?") == -1) {
        url = url + "?"
    }

    const params = {
        originUid: DataManager.UserData.guid,
        shareMoneyId: DataManager.CommonData.shareMoneyData.shareMoney[0].sm_id,
    }
    const arr = []
    for (const key in params) {
        arr.push(key + "=" + encodeURIComponent(params[key]))
    }

    url += arr.join("&")
    setNodeSpriteQRCode(node, url)
}

export function getIPLocation() {
    http.open("https://restapi.amap.com/v3/ip?key=0113a13c88697dcea6a445584d535837", {}, (res:IIPLocation) => { 
        if (res.status == "1") {
            DataManager.CommonData.IPLocation = res
        }
     })
}
