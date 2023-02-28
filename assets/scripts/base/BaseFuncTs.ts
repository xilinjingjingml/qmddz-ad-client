import { GameMatchLogic } from './../moduleBase/GameMatchLogic';
import SceneManager from "./baseScene/SceneManager";
import DataManager, { IMatchInfo } from "./baseData/DataManager";
import BaseFunc = require("./BaseFunc")
import md5 = require("./extensions/md5.min")
import NetManager from "./baseNet/NetManager";
import { getPlayerStatusReq, getReliefState, sendReloadUserData } from "../moduleLobby/LobbyFunc";
import BaseScene from "./baseScene/BaseScene";
import GameManager from "./GameManager";
import { getGameConfig, getGameName, GAME_TYPE } from "../gameConfig"
import QttPluginWrapper from './QttPluginWrapper';

const {ccclass, property} = cc._decorator;

export function IndexErrMsg(error) {
    if (error) {
        var splash = document.getElementById('splash');
        var err = splash.getElementsByClassName("errmsg")
        if (err && err[0]) {
            err[0].innerText = error
        }
    }
}

export function PostInfomation(data) {
    if (!BaseFunc.IsJSON(data)) {
        data = JSON.stringify(data)
    }
    let url = "https://reports.wpgame.com.cn"
    BaseFunc.HTTPPostRequestForm(url, data)
}


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

export function QTTSign(values) {
	delete values.sign
	values.app_key = DataManager.Instance.QTT_APPKEY
	let keysArr = []
	for (let key in values) {
        if (key != "_NO_BRIDGE_" && key != "env" && key != "isTesting" && key != "openview")
		    keysArr.push(key)
	}
	keysArr.sort()
	let keys = ''
	keysArr.forEach((e) => {
		keys += e
		keys += values[e]
	})

	delete values.app_key
	let sign = md5(keys)
	values.sign = sign
	return sign
}

export function QTTCheckSign(values) {
	let sign1 = values.sign
	if (!sign1) {
		return false
	}
	let sign2 = QTTSign(values)
	if (sign1 !== sign2) {
		return false
	}
	return true
}

export function openQttTaskFrame() {

}

export function QttReportData(type) {    
    QttPluginWrapper.report(type)
}

export function loadModule(moduleName, succ: () => void = null, fail: () => void = null) {
    let path = moduleName + "/prefab/ModuleStart";
    cc.loader.loadRes(path, 
        (err, res) => {
        if (err) {
            console.log(err)
            fail && fail()
        }
        else if (res instanceof cc.Prefab) {
            let moduleStart = cc.instantiate(res)
            moduleStart.parent = cc.Canvas.instance.node
        }
        else{
            console.log(err)
            console.log(res)
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
    if (cc.sys.isNative) {
    
    } 
    else if (cc.sys.isBrowser) {
        var textArea = document.getElementById("clipBoard");
        if (textArea === null) {
            textArea = document.createElement("textarea");
            textArea.id = "clipBoard";
            textArea.textContent = str;
            document.body.appendChild(textArea);
        }
        textArea.select();
        try {
            const msg = document.execCommand('copy') ? 'successful' : 'unsuccessful';
            let initParam = {
                title: "提示",
                // content: "已经复制到剪贴板",
                content: succTip,
                buttonNum: 1,
                confirmClose: true,
            }
            MsgBox(initParam)
            document.body.removeChild(textArea);
        } 
        catch (err) {
            let initParam = {
                title: "提示",
                content: "复制到剪贴板失败",
            }
            MsgBox(initParam)
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

export function showTokenGrowPop(num: number, func = null) {
    let initParam = []
    initParam["target"] = DataManager.CommonData["QttPoint"] 
    initParam["itemIndex"] = 367
    initParam["itemNum"] = num
    initParam["zorder"] = 2000
    initParam["closeCallback"] = func
    SceneManager.Instance.popScene<String>("moduleLobby", "TokenGrowAniPop", initParam)
}

export function checkPhoneBinding() {
    if (DataManager.CommonData["bindPhone"].hasBindMoble != 1) {
        SceneManager.Instance.popScene("moduleLobby", "BindPhonePop")
        return false
    }

    return true
}

export function payOrder(boxItem, callback: () => void = null) {
    
    let url = DataManager.getURL("QTT_ORDER")
    let param = {
        pid: DataManager.UserData.guid,
        boxid: boxItem.boxid,
        pn: DataManager.Instance.packetName
    }

    if(!!boxItem.disBatchId && boxItem.disBatchId > 0) {
        param["disBatchId"] = boxItem.disBatchId
        url = DataManager.getURL("USE_DISCOUNT_CODE")
    }

    BaseFunc.HTTPGetRequest(url, param, function(res) {
        if (res && res.ret == 0) {
            let pm = {
                money: boxItem.price * 100,
                openId: DataManager.load('user_guest_openid'),
                notifyUrl: DataManager.getURL("QTT_NOTIFY"),
                orderno: res.order
            }
            if(!!boxItem.disBatchId && boxItem.disBatchId > 0 && boxItem.disValue > 0) {
                pm.money = pm.money - boxItem.disValue * 100 
            }
            // console.log("order succ", DataManager.getURL("QTT_NOTIFY"))
            // console.log(pm)
            if (!DataManager.Instance.isTesting){
                QttPluginWrapper.pay(pm)
            }
            sendReloadUserData()
            boxItem.type && getShopBox(boxItem.type)
            callback && callback()
          }
        else{
            iMessageBox(res ? res.msg : '创建订单失败')
        }
    })
}

const enableBannerAds = true
export function playADBanner(show: boolean = true, index: number = -1, options = null) {
    if (!CC_JSB || !enableBannerAds) {
        return false
    }

    if (!show) {
        QttPluginWrapper.hideBannerAd()
        return false
    }

    QttPluginWrapper.showBannerAd(String(index))

    DataManager.Instance.node.runAction(cc.sequence(
        cc.delayTime(10),
        cc.callFunc(() => {
        playADBanner(false)
        })
    ))
    return true
}

export function playAD(index: number = 0, callback: () => void = null) {
    if (typeof index != "number") {
        callback = index;
        index = 0;
    }

    if (!CC_JSB) {
        callback && callback()
        return
    }

    QttPluginWrapper.showVideoAd(String(index), (result) => {
        if (result.code == 0) {
            callback && callback()
        } else if (result.code == 1) {
                let initParam = {
                    title: "提示",
                    content: "完整观看视频才可以领取奖励哦",
                    confirmClose: true,
                    maskCanClose: false,
                    buttonNum: 1,
                }
                MsgBox(initParam)
        } else {
            iMessageBox("观看广告失败" + result.message)
            }
    })
}

export function completeTask() {

}

export function uploadGameRound(num: number = 1, callback: () => void = null) {
    callback && callback()
}

export function enterGame(server, callFunc: () => void = null, newUser: boolean = false) {
    if (DataManager.Instance.isTesting)
        console.log("entergame " + new Date().getTime())
    czcEvent("大厅", "进入游戏", "加载游戏模块 " + (DataManager.CommonData["morrow"] <= 1 ? DataManager.CommonData["morrow"] + "天新用户" : "老用户"))
    if (DataManager.CommonData["gameServer"]) {
        NetManager.Instance.close(DataManager.CommonData["runGame"])
        delete DataManager.CommonData["runGame"]
        delete DataManager.CommonData["gameServer"]
    }

    cc.audioEngine.stopAll()

    DataManager.CommonData["RedpacketCount"] = DataManager.UserData.getItemNum(365)
    DataManager.CommonData["QttCount"] = DataManager.UserData.getItemNum(367)

    // let moduleName = ""
    
    // switch (server.gameId) {
    //     case 389:
    //     case 388:
    //         moduleName = "moduleRPDdz"        
    //         break;
    //     case 391:
    //         moduleName = "moduleHBErmj"
    //         break;
    // }
    
    // if (moduleName && moduleName != "") {    
        let gameId = server.gameId
        if (server.ddz_game_type)
            gameId = gameId * 10 + parseInt(server.ddz_game_type)
        DataManager.save(DataManager.UserData.guid + "lastGameId", gameId)        
        DataManager.CommonData["gameServer"] = server
        GameManager.onChangeFire()    
        // cc.director.loadScene(moduleName, (err) => {
        //     if (err) console.log(err)
        //     console.log("loadFinish")
        //     czcEvent("大厅", "进入游戏", "游戏模块加载完成")
        //     callFunc && callFunc()
        // }) 
        // let node = new cc.Node()
        // cc.Canvas.instance.node.addChild(node)
        let moduleName = getGameConfig(server.gameId)
        if (moduleName) {
            czcEvent(getGameName(server.gameId), "加载1", "开始加载 " + (DataManager.CommonData["morrow"] <= 1 ? DataManager.CommonData["morrow"] + "天新用户" : "老用户"))
            loadModule(moduleName + "Res")

            DataManager.saveKeyWithDate(DataManager.UserData.guid + "lobbyIdleWarn")               
        }

        if (null == DataManager.CommonData["firstGame"]) {
            QttReportData("role_play")
            DataManager.CommonData["firstGame"] = true
        }

        // if (server.gameId == 389 || server.gameId == 390) {
        //     // console.log("addComponent " + new Date().getTime())
        //     czcEvent("斗地主", "加载1", "开始加载 " + (DataManager.CommonData["morrow"] <= 1 ? DataManager.CommonData["morrow"] + "天新用户" : "老用户"))
            
        //     // node.addComponent(moduleRPDdz)    
        //     loadModule("moduleRPDdzRes")
        // }
        // else if (server.gameId == 391) {
        //     czcEvent("二人麻将", "加载1", "开始加载 " + (DataManager.CommonData["morrow"] <= 1 ? DataManager.CommonData["morrow"] + "天新用户" : "老用户"))
        //     // node.addComponent(moduleHBErmj) 
        //     loadModule("moduleHBErmjRes")   
        // }
        
    // }
}

export function gobackToMain(param?) {
    czcEvent("大厅", "离开游戏", "回到大厅 " + (DataManager.CommonData["morrow"] <= 1 ? DataManager.CommonData["morrow"] + "天新用户" : "老用户"))
    if (DataManager.CommonData["gameServer"]) {
        NetManager.Instance.close(DataManager.CommonData["runGame"])
        DataManager.CommonData["leaveGameLevel"] = DataManager.CommonData["gameServer"].level
        DataManager.CommonData["ddzGameType"] = DataManager.CommonData["gameServer"].ddz_game_type
        DataManager.CommonData["leaveGameIsPrivate"] = DataManager.CommonData["gameServer"].isPrivate
        delete DataManager.CommonData["runGame"]
        delete DataManager.CommonData["gameServer"]

        DataManager.CommonData["leaveGame"] = true
        czcEvent("大厅", "离开游戏", "断开游戏服务器 " + (DataManager.CommonData["morrow"] <= 1 ? DataManager.CommonData["morrow"] + "天新用户" : "老用户"))
    }   
    
    cc.audioEngine.uncacheAll()
    cc.audioEngine.stopAll()

    // isOnGameExit 0 正常退出 1 强制退出 -1 断线退出
    if (null != param && null != param["isOnGameExit"] && -1 != param["isOnGameExit"])
        DataManager.CommonData["isOnGameExit"] = param["isOnGameExit"]
    else
        DataManager.CommonData["isOnGameExit"] = null // 空状态会自动进入

    sendReloadUserData()
     
    // cc.director.loadScene("moduleLobby", () => {    
    //     czcEvent("大厅", "离开游戏", "加载大厅模块完成")
    //     if (DataManager.UserData.money < 1000) {
    //         DataManager.Instance.node.runAction(cc.sequence(cc.delayTime(0.5), cc.callFunc(() => ReliefPop())))
    //     }
    // })
    // let node = new cc.Node()
    // cc.Canvas.instance.node.addChild(node)
    // node.addComponent(ModuleLobby)    
    loadModule("moduleLobby")
    GameManager.onChangeFire()

    if (DataManager.CommonData["firstLogin"] && null == DataManager.CommonData["qttExchange"]) {
        SceneManager.Instance.popScene("moduleLobby", "TeachScene", { qttExchange: true })
        return
    }
}

export function showShopPop() {
    // SceneManager.Instance.popScene<String>("moduleLobby", "ShopPop")
    this.quickPayPop()
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
    if (DataManager.Instance.GameType === GAME_TYPE.QMDDZMD && price === 6 && havePhone === 0) {
        return null
    }

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
    if (DataManager.Instance.isTesting)
        console.log(DataManager.Instance.OnceBoxs)
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
        scene.setLabelString("nodePop/nodeItem2/content", "充值" + (DataManager.CommonData["needMoney"]/10000) + "元获得" + DataManager.CommonData["needMoney"] + "金豆")
    })
}

export function unenoughGold(type: number, enoughMoney: number, callback: () => void = null) { 
    // console.log("unenoughGold ")
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
    if (gameId >= 3890) {
        gameType = gameId % 10
        gameId = Math.floor(gameId / 10)        
    }

    if (null == DataManager.CommonData["ServerDatas"] || null == DataManager.CommonData["ServerDatas"][gameId])
        return null

    let servers = getNewBieServer(gameId)
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
    if (null != window._czc)
        window._czc.push(["_trackEvent", moduleName, action, label, 0, 0]);
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
    return 3
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

export function getGameAward(zorder = null, flag = 0, callback?) {
    if (DataManager.CommonData["morrow"] >= 3)
        return

    let url = DataManager.getURL("GAME_AWARD")
    let sign = md5("pid=" + DataManager.UserData.guid + "&gameid=" + DataManager.Instance.gameId + "&channel=" + 0 + "vnakl@sdasd$");
    let params = {
        pid: DataManager.UserData.guid,
        ticket: DataManager.UserData.ticket,
        gameid: DataManager.Instance.gameId,
        channel:0,
        sign: sign,
        flag: flag
    }

    BaseFunc.HTTPGetRequest(url, params, function(res) {
        if(res) {            
            if(res.ret == 0) {
            showTokenGrowPop(res.itemNum)
            // let awards = []
            // awards[0] = {index: res.itemIndex, num: res.itemNum}
            // showAwardResultPop(awards, {zorder: zorder})
            sendReloadUserData()
                if(callback){
                    callback(res)
                }
            }else if(res.ret == 1) {
                if(callback){
                    callback(res)
                }
            }
        }
    })
}

export function getQttCoinQuery(callback = null) {
    let url = DataManager.getURL("QTT_COIN_QUERY")
    let params = {
        pid: DataManager.UserData.guid,
        ticket: DataManager.UserData.ticket,
        app_id: DataManager.Instance.QTT_APPID,
        open_id: DataManager.UserData.imei,
    }

    BaseFunc.HTTPGetRequest(url, params, function(res) {
        if(res && res.code == 0) {            
            let data = res.data
            DataManager.CommonData["QttCoinNum"] = data.coin_balance
            if(callback)
                callback(res) 
        }
    })
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

export function showQttSuspendWin(msg = null) {
    // if (false == SceneManager.Instance.isSceneExist("QttSuspensionWin"))
    //     SceneManager.Instance.popScene("moduleLobby", "QttSuspensionWin", {msg: msg})
}

export function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

export function getUserIP(onNewIP) { //  onNewIp - your listener function for new IPs
    //compatibility for firefox and chrome
    var myPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
    var pc = new myPeerConnection({
       iceServers: []
   }),
   noop = function() {},
   localIPs = {},
   ipRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g,
   key;

   function iterateIP(ip) {
       if (!localIPs[ip]) onNewIP(ip);
       localIPs[ip] = true;
  }

    //create a bogus data channel
   pc.createDataChannel("");

   // create offer and set local description
   pc.createOffer().then(function(sdp) {
       sdp.sdp.split('\n').forEach(function(line) {
           if (line.indexOf('candidate') < 0) return;
           line.match(ipRegex).forEach(iterateIP);
       });
       
       pc.setLocalDescription(sdp, noop, noop);
   }).catch(function(reason) {
       // An error occurred, so handle the failure to connect
   });

   //sten for candidate events
   pc.onicecandidate = function(ice) {
       if (!ice || !ice.candidate || !ice.candidate.candidate || !ice.candidate.candidate.match(ipRegex)) return;
       ice.candidate.candidate.match(ipRegex).forEach(iterateIP);
   };
}

function sign(values){
    delete values.sign;
    values.app_key = DataManager.Instance.QTT_APPKEY;
    let keysArr = [];
    for(let key in values){
      keysArr.push(key)
    }
    keysArr.sort();
    let keys = ''
    keysArr.forEach((e)=>{
      keys += e;
      keys += values[e];
    });
    console.log(keys)
    delete values.app_key;
    let sign = md5(keys);
    return sign;
  }
  

export function qttReportGameNums(gameNums: number = 0) {

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
    DataManager.CommonData["QttCount"] = DataManager.UserData.getItemNum(367)

    let moduleName = getGameConfig(gameid)
    if (moduleName) {
        czcEvent(getGameName(server.gameId), "加载1", "开始加载 " + (DataManager.CommonData["morrow"] <= 1 ? DataManager.CommonData["morrow"] + "天新用户" : "老用户"))
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

export function getSpritePathByItemId(id: number): string {
    let path = "moduleLobby/texture/common/"
    if (id == 0) {
        path += "item_small_glodbean"
    } else if (id == 365) {
        path += "item_small_redpacket"
    } else if (id == 367) {
        path += "item_small_qttcoin"
    } else if (id == 1192) {
        path += "diamond_icon"
    } else {
        return ""
    }
    return path
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
    }

    return null
}

export function getNameByItemId(id: number): string {
    let name = ""
    if (id == 0) {
        name = "金豆"
    } else if (id == 2) {
        name = "记牌器"
    } else if (id == 365) {
        name = "红包券"
    } else if (id == 367) {
        name = "趣金币"
    } else if (id == 372) {
        name = "钻石"
    } else if (id == 373) {
        name = "双倍卡"
    } else if (id == 374) {
        name = "VIP经验卡"
    } else if (id == 1192) {
        name = "钻石"
    }
    return name
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