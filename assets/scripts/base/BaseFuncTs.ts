import { GameMatchLogic } from './../moduleBase/GameMatchLogic';
import SceneManager from "./baseScene/SceneManager";
import DataManager, { IMatchInfo } from "./baseData/DataManager";
import BaseFunc = require("./BaseFunc")
import md5 = require("./extensions/md5.min")
import NetManager from "./baseNet/NetManager";
import { getPlayerStatusReq, getReliefState, sendReloadUserData } from "../moduleLobby/LobbyFunc";
import BaseScene from "./baseScene/BaseScene";
import GameManager from "./GameManager";
import { getGameConfig, getGameName } from "../gameConfig"
import WxWrapper from './WxWrapper';
import { AdsConfig } from './baseData/AdsConfig';

export function MsgBox(initParam) {
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
    let url = DataManager.getURL("GET_USER_ROLE")
    let token = md5("uid=" + DataManager.UserData.guid + "&key=232b969e8375");
    let params = {
        pid: DataManager.UserData.guid,
        flag: "lobby",
        sgtype: "f33",
        ticket: DataManager.UserData.ticket,
        pn: DataManager.Instance.packetName,
        versioncode: 14042902,
        version: DataManager.Instance.version,
        gameid: DataManager.Instance.gameId,
        token: token,
    };

    let self = this
    BaseFunc.HTTPGetRequest(url, params, function(msg) {
        if (null == msg)
            return

        DataManager.CommonData["roleCfg"] = msg

        let userInfo = JSON.parse(DataManager.CommonData["roleCfg"]["userInfo"])
        if (null != userInfo) {
            DataManager.CommonData["bindPhone"] = []
            if (userInfo.ret == 1){
                DataManager.CommonData["bindPhone"].hasBindMoble = 1
                DataManager.CommonData["bindPhone"].BindPhone = userInfo.phone
            }
            else{
                DataManager.CommonData["bindPhone"].hasBindMoble = 0
            }
            DataManager.CommonData["bindReward"] = userInfo.bindReward
        }

        DataManager.CommonData["firstPayBox"] = JSON.parse(DataManager.CommonData["roleCfg"]["firstPayBox"])

        callback && callback()
    })
}

export function copyToClipBoard(str: string, succTip: string = "已复制到剪贴板") {
    if (CC_WECHATGAME) {
        WxWrapper.setClipboardData(str, function (success) {
            success ? iMessageBox(succTip) : iMessageBox("复制到剪贴板失败")
        })
    } else if (cc.sys.isNative) {
    
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

export function iMessageBox(content, func = null) {
    SceneManager.Instance.popScene<String>("moduleLobby", "iMessageBox", {message: content, callback: func, noSing: true, zorder: 2000})
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

export function payOrder(boxItem, callback: () => void = null) {
    if (cc.sys.os == cc.sys.OS_IOS) {
        iMessageBox("IOS暂不支持支付功能")
        return
    }

    if (!boxItem) {
        iMessageBox("商品不存在")
        return
    }

    BaseFunc.HTTPGetRequest(DataManager.getURL("QQ_MIDAS_URL"), {
        pid: DataManager.UserData.guid,
        ticket: DataManager.UserData.ticket,
        boxid: boxItem.boxid,
        pn: DataManager.Instance.packetName,
        openid: DataManager.UserData.openId,
        appid: DataManager.Instance.wxAPPID,
        pf: "qq_m_qq-2001-android-2011",
        envFlag: "o",
        sdkFlag: "qqMini"
    }, function (res, err) {
        if (res && res.ret == 0) {
            WxWrapper.pay({
                prepayId: res.prepayId,
                price: boxItem.price
            }, function (success, message) {
                if (success) {
                    sendReloadUserData()
                    boxItem.type && getShopBox(boxItem.type)
                    callback && callback(true)
                } else {
                    iMessageBox(message)
                }
            })
        } else {
            iMessageBox(res ? res.msg : '创建订单失败')
        }
    })
}

let statusIndex = 0
export function playADBanner(show: boolean, index: number) {
    const sign = statusIndex & index
    if (show && sign === 0) {
        statusIndex |= index
        WxWrapper.showBannerAdvert()
    } else if (!show && index === AdsConfig.banner.All && statusIndex !== 0) {
        statusIndex = 0
        WxWrapper.hideBannerAdvert()
    } else if (!show && sign !== 0) {
        statusIndex ^= index
        statusIndex === 0 && WxWrapper.hideBannerAdvert()
    }
}

export function checkVideoAd() {
    const limit = DataManager.Instance.onlineParam.videoAdLimit || 0
    const round = DataManager.CommonData["roleCfg"] ? DataManager.CommonData["roleCfg"]["roundSum"] : 0
    return WxWrapper.isVideoAdValid() && round >= limit
}

export function playAD(success: () => void = null) {
    if (checkVideoAd()) {
        WxWrapper.showVideoAdvert((code) => {
            if (code == 0) {
                success && success()
            } else if (code == 2) {
                socialShare({
                    withOpenId: true,
                    callback: success
                })
            } else {
                iMessageBox("完整观看视频才可以领取奖励哦")
            }
        })
    } else {
        socialShare({
            withOpenId: true,
            callback: success
        })
    }
}

/**
interface shareData {
    title?: string                  // 标题 不传使用随机配置
    imageUrl?: string               // 图片地址 可使用本地路径或网络路径 不传使用随机配置
    withOpenId?: boolean            // 是否带上自己的 openid 用于推广员绑定
    query?: { [k: string]: any }    // 其他额外参数
    callback?: Function             // 回调方法 只在分享成功时回调
}
*/
export function socialShare(shareData) {
    WxWrapper.shareAppMessage(shareData)
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
        czcEvent(getGameName(server.gameId), "加载1", "开始加载 " + DataManager.Instance.userTag)
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
        if (servers.length > 0) {
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
            (item.maxmoney >= DataManager.UserData.money || item.maxmoney == null) &&
            item.lc_room_mode != 1 && item.lc_room_mode != 2 &&
            (gameId != 389 || (gameId == 389 && item.ddz_game_type == gameType)))
    if (null == servers || 0 == servers.length)
        return servers

    servers.sort((a, b) => a.level < b.level ? -1 : a.level > b.level ? 1 : 0)
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

export function getHttpSpriteFrame(url: string, callback: (spriteFrame: cc.SpriteFrame) => void = null) {
    if (!url) { return }

    let key = getMD5(url)
    let spriteFrame = DataManager.Instance.getSpriteFrame(key)
    if (null != spriteFrame && callback != null)
        callback(spriteFrame)

    if (null == spriteFrame){
        url = url.replace("http://", "https://")

        cc.loader.load({url: url, type: "png"}, function(err, texture){
            if (err) {
                return
            }
            else{
                let spriteFrame = new cc.SpriteFrame(texture) 
                DataManager.addSpriteFrame(key, spriteFrame)
                
                if (null != spriteFrame && callback != null)
                    callback(spriteFrame)
            }
        })
    }
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
 
export function czcEvent(moduleName, action, label) {
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

    BaseFunc.HTTPGetRequest(url, param, function(res) {
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
    return DataManager.Instance.onlineParam.newBieRoundLimit || 3
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

    BaseFunc.HTTPGetRequest(url, params, function(res) {
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

    BaseFunc.HTTPGetRequest(url, params, function(res) {
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
        czcEvent(getGameName(server.gameId), "加载1", "开始加载 " + DataManager.Instance.userTag)
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
        iMessageBox(BaseFunc.TimeFormat("比赛mm月dd日开赛，暂未开始报名！", match.matchBegin))
        return false
    }

    // 比赛已经结赛
    let matchEnd = Math.floor(new Date(new Date(match.matchEnd * 1000).toLocaleDateString()).getTime() / 1000)
    if (now > matchEnd) {
        iMessageBox(BaseFunc.TimeFormat("比赛mm月dd日已经结赛！", match.matchEnd))
        return false
    }

    const midnight = Math.floor(new Date(new Date().toLocaleDateString()).getTime() / 1000)
    const matchDate = match.scheduleList[0]

    // 比赛时间段还未开始
    if (now < midnight + matchDate.matchBeginDate - match.signTime) {
        iMessageBox(BaseFunc.TimeFormat("比赛HH点MM分开始，请稍后！", midnight + matchDate.matchBeginDate))
        return false
    }

    // 比赛已经结赛
    if (matchDate.matchEndDate > 0 && now > (midnight + matchDate.matchEndDate)) {
        iMessageBox(BaseFunc.TimeFormat("比赛今天已结束", midnight + matchDate.matchEndDate))
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
}

export function getNameByItemId(id: number): string {
    return itemNames[id] || ""
}

interface ISetSprite {
    node: cc.Node
    url: string
    delayShow?: boolean
    fixSize?: boolean
    callback?: Function
}
export function setNodeSpriteLocal(params: ISetSprite) {
    if (params == null || params.node == null || !params.node.isValid) {
        return
    }

    if (params.delayShow) {
        params.node.active = false
    }

    const size = params.node.getContentSize()
    cc.loader.loadRes(params.url, cc.SpriteFrame, (err, spriteFrame: cc.SpriteFrame) => {
        if (err) {
            cc.error(err.message || err, params.url)
            return
        }

        if (!params.node.isValid) {
            return
        }

        params.node.getComponent(cc.Sprite).spriteFrame = spriteFrame

        if (params.delayShow) {
            params.node.active = true
        }

        if (params.fixSize) {
            const size_new = params.node.getContentSize()
            params.node.scale = Math.min(size.width / size_new.width, size.height / size_new.height)
        }

        if (params.callback) {
            params.callback()
        }
    })
}

export function setNodeSpriteNet(params: ISetSprite) {
    if (params == null || params.node == null || !params.node.isValid || !params.url.startsWith("http")) {
        return
    }

    if (params.delayShow) {
        params.node.active = false
    }

    const size = params.node.getContentSize()
    cc.loader.load(params.url, (err, tex: cc.Texture2D) => {
        if (err) {
            cc.error(err.message || err, params.url)
            return
        }

        if (!params.node.isValid) {
            return
        }

        params.node.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(tex, cc.rect(0, 0, tex.width, tex.height))

        if (params.delayShow) {
            params.node.active = true
        }

        if (params.fixSize) {
            const size_new = params.node.getContentSize()
            params.node.scale = Math.min(size.width / size_new.width, size.height / size_new.height)
        }

        if (params.callback) {
            params.callback()
        }
    })
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

export function getNotchHeight(): number {
    const frameSize = cc.view.getFrameSize()
    if (frameSize.equals(cc.size(2436, 1125)) || frameSize.equals(cc.size(2688, 1248)) || frameSize.equals(cc.size(1792, 828))) {
        return 90
    }
    if (frameSize.equals(cc.size(812, 375))) {
        return 30
    }
    return WxWrapper.getNotchHeight()
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

export function getRedPacketAwardConfig() {
    return DataManager.Instance.onlineParam.RedPacketAwardConfig || [0, 0.2, 0.3, 0.5, 1, 2]
}

const avatars = {}
export function setAvatarByGuid(uid: string, sprite: cc.Sprite, callback: () => void = null) {
    if (avatars[uid]) {
        BaseFunc.SetFrameTextureNet(sprite, avatars[uid], callback)
        return
    }

    BaseFunc.HTTPGetRequest(DataManager.getURL("USERBATCH"), {
        uids: uid,
    }, (res) => {
        if (res && res.list && res.list[0]) {
            avatars[uid] = res.list[0].face
            BaseFunc.SetFrameTextureNet(sprite, avatars[uid], callback)
        }
    })
}