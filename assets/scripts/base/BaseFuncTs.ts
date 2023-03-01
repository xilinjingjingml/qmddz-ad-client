import { getGameConfig, getGameName } from "../gameConfig";
import { getAdUnitId, getPlayerStatusReq, getReliefState, checkAdCanReceive, sendReloadUserData, isShowPayPage, isShowNewVersionContent } from "../moduleLobby/LobbyFunc";
import { GameMatchLogic } from './../moduleBase/GameMatchLogic';
import { AdsConfig } from './baseData/AdsConfig';
import DataManager from "./baseData/DataManager";
import NetManager from "./baseNet/NetManager";
import BaseScene from "./baseScene/BaseScene";
import SceneManager from "./baseScene/SceneManager";
import GameManager from "./GameManager";
import WxWrapper from './WxWrapper';
import md5 = require("./extensions/md5.min")
import { http } from "./utils/http";
import { time } from "./utils/time";
import { functions } from "./utils/functions";
import PopupQueue from "./utils/PopupQueue";
import { igs } from "../../../igs-ddz";

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

export function payOrder(boxItem, callback: Function = null, fail: Function = null) {
    if (!boxItem) {
        iMessageBox("商品不存在")
        return
    }

    if (cc.sys.os == cc.sys.OS_IOS) {
        // showFriendPayPop(boxItem)
        //TODO 消息推送代替好友赠送
        console.log("jin---payOrder boxItem:", boxItem)
        WxWrapper.payOrderByCustome(boxItem, callback)
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
                    fail && fail()
                    iMessageBox(message)
                }
            })
        } else {
            fail && fail()
            iMessageBox(error)
        }
    })
}

export function playADBanner(show: boolean, index: number, callback?: Function) {
    if (isFreeAdvert()) {
        return
    }

    const unitid = getAdBannerUnitid(index)

    if (show) {
        WxWrapper.showBannerAdvert(unitid, callback)
    } else if (!show && index === AdsConfig.banner.All) {
        WxWrapper.hideBannerAdvert(null,true)
    } else if (!show) {
        WxWrapper.hideBannerAdvert(unitid)
    }
}

let statusIndexGrid = 0
export function playADGrid(show: boolean, index: number) {
    if (isFreeAdvert() && WxWrapper.isStartGridAdvert()) {
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

export function playAD(adIndex: number, success: Function, fail?:Function) {
    WxWrapper.showVideoAdvert(getAdUnitId(adIndex), (code) => {
        if (code == 0) {
            success()
        } else if (code == 2) {
            socialShare({
                withOpenId: true,
                callback: success
            })
        } else {
            fail && fail()
            iMessageBox("完整观看视频才可以领取奖励哦")
        }
    })
}

//预加载视频广告
export function preloadAD(adIndex: number, success: Function) {
    if(adIndex == AdsConfig.taskAdsMap.RegainLoseBonus){
        adIndex = AdsConfig.taskAdsMap.Exemption
    }
    WxWrapper.preloadVideoAdvert(getAdUnitId(adIndex), () => {
        success && success()
    })
}

/**
 * 播放插屏广告
 */
export function playADInter(callback?: Function) {
    WxWrapper.showInterstitialAdvert()
}

export function playCustomAD(show: boolean, index: number){
    // console.log("jin---show,index: ",show, index,getAdCustomUnitid(index))
    var curCustomAd = getAdCustomUnitid(index)
    //是否免费
    if (isFreeAdvert()) {
        return
    }

    //TODO 1.判断能否播放  2.用备用替换
    // if(!WxWrapper.customAdvertOnClose(getAdCustomUnitid(index))){
    //     for(const i in AdsConfig.custom){
    //         if(AdsConfig.custom[i] != index){
    //             console.log("jin---备用广告： ", AdsConfig.custom[i])
    //             curCustomAd = getAdCustomUnitid(AdsConfig.custom[i])
    //         }
    //     }
    // }
    
    //是否播放
    if(show){
        WxWrapper.showCustomAdvert(curCustomAd)
    }else{
        WxWrapper.hideCustomAdvert(curCustomAd)
    }
}

export function oncustomAdvertClose(index: number){
    return WxWrapper.customAdvertOnClose(getAdCustomUnitid(index))
}

//销毁原生广告
export function destroyCustomAD(index: number){
    WxWrapper.customAdvertDestroy(getAdCustomUnitid(index))
}

export function onCustomAdvertShow(index: number){
    return WxWrapper.customAdvertIsShow(getAdCustomUnitid(index))
}

export function isStartCustomAdvert(){
    return WxWrapper.isStartCustomAdvert()
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
export function socialShare(shareData) {
    WxWrapper.shareAppMessage(shareData)
}

export function enterGame(server, callFunc: () => void = null, newUser: boolean = false) {
    cc.log("entergame " + new Date().getTime())
    // czcEvent("大厅", "进入游戏", "加载游戏模块 " + DataManager.Instance.userTag)
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
    // czcEvent("大厅", "离开游戏", "回到大厅 " + DataManager.Instance.userTag)
    if (DataManager.CommonData["gameServer"]) {
        NetManager.Instance.close(DataManager.CommonData["runGame"])
        DataManager.CommonData["leaveGameLevel"] = DataManager.CommonData["gameServer"].level
        DataManager.CommonData["ddzGameType"] = DataManager.CommonData["gameServer"].ddz_game_type
        DataManager.CommonData["leaveGameIsPrivate"] = DataManager.CommonData["gameServer"].isPrivate
        delete DataManager.CommonData["runGame"]
        delete DataManager.CommonData["gameServer"]

        DataManager.CommonData["leaveGame"] = true
        // czcEvent("大厅", "离开游戏", "断开游戏服务器 " + DataManager.Instance.userTag)
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

/**
 * 检查礼包
 */
 export function checkLuckyBox(){
    for(let curBox of DataManager.Instance.LuckyBoxs){
        if(curBox && curBox.isBuy != 1){
            return true
        }
    }
    return false
 }

export function checkFirstBox(price = 6, havePhone: number = 0, gold: number = -1) {  
    for (const iterator of DataManager.Instance.OnceBoxs) {
        if (iterator.havePhone == havePhone) {
            if (iterator.isBuy == 1){
                return false  
            }  
        }
    }

    return true
}

export function checkChangeLuckyBox(server, price = 100, havePhone: number = 0) {  
    // 单独接口获取 促销礼包 奖励 DataManager.Instance.OneYuanBoxs
    // console.log("jin---OneYuanBoxs: ", DataManager.Instance.OneYuanBoxs)
    let curBox = DataManager.Instance.OneYuanBoxs[server.level - 1]
    if(!curBox)
        return
    // let goodsId = curBox[level].serino.substring(curBox[level].serino.length, curBox[level].serino.length-2)
    if (curBox.price == curBox.daylimit && curBox.havePhone == havePhone && curBox.isBuy == 0) {
        return curBox    
    }else{
        let curBox_2 = DataManager.Instance.OneYuanBoxs[server.level - 1 + 5]
        if(curBox_2.daylimit == -1 && curBox_2.havePhone == havePhone){
            return curBox_2
        }
    }

    return null
}
//检查超级折扣
export function checkSuperSaleBox(boxType : number, havePhone: number = 0){
    let curBox = DataManager.Instance.SuperSaleBoxs[boxType]
    if(!curBox)
        return false
    if (curBox.price == curBox.daylimit && curBox.havePhone == havePhone && curBox.isBuy == 0) {
        return true    
    }
    
    return false
 }

 //检查限时特惠
 export function checkTimeLimitBox(boxType : number = -1, havePhone: number = 0){
    
    if(boxType == -1){
        for(let curBox of DataManager.Instance.TimeLimitBoxs){
            if (curBox.price == curBox.daylimit && curBox.havePhone == havePhone && curBox.isBuy == 0) {
                return true    
            }
        }
    }else{
        let curBox = DataManager.Instance.TimeLimitBoxs[boxType]
        if(!curBox)
            return false


        if (curBox.price == curBox.daylimit && curBox.havePhone == havePhone && curBox.isBuy == 0) {
            return true    
        }
    }
    
    
    return false
 }

export function checkOneYuanBox(price = 6, havePhone: number = 0, gold: number = -1) {
    for (const iterator of DataManager.Instance.changeLuckyBoxs) {
        if (iterator.price == price && iterator.havePhone == havePhone) {
            if (iterator.isBuy == 0)
                return iterator    
        }
    }

    return null
}
//TODO 检查超级折扣

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

//TODO 弹出条件 boxType:1.changeLucky 2.supplement  boxNum: 1 2 3 4 5
export function changeLuckyBox(boxType, boxNum, callback ?: () => void){//bFinish:boolean
    //1.限购次数  2.出发条件
    
    let pop = function(){
        sendReloadUserData()
        SceneManager.Instance.popScene("moduleLobby", "ChangeLuckyPayPop", {boxType: boxType, boxNum: boxNum, closeCallback: callback})
    }

    if (DataManager.CommonData["gameServer"])
        DataManager.Instance.node.runAction(cc.sequence(cc.delayTime(2), cc.callFunc(function() {  pop()})))
    else
        DataManager.Instance.node.runAction(cc.sequence(cc.delayTime(.5), cc.callFunc(function() {  pop()})))
    
}



export function ReliefPop(callback ?: (bFinish:boolean) => void) {    
    let reliefLine = DataManager.Instance.getReliefLine()

    let pop = function(){
        sendReloadUserData()
        if (DataManager.UserData.money >= reliefLine){
            return
        }

        if (DataManager.CommonData["reliefStatus"]["reliefTimes"] && DataManager.CommonData["reliefStatus"]["reliefTimes"] > 0) {
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
            popFunc = (result: boolean) => { if (!result) ReliefPop(func[idx + 1]); else if (null != callback) {callback()}}
        // else if ()

            
        func[idx] = popFunc
    }

    func[0](false);
}

export function checkPopUp_luckyBox(server){

    //TODO 条件：1.金豆 2.支付 3.  4.
    if (server.minMoney <= DataManager.UserData.money) {
        return false
    }

    if(!isShowPayPage()){
        return false
    }

    let curBox = checkChangeLuckyBox(server)
    SceneManager.Instance.popScene("moduleLobby", "ChangeLuckyPayPop", {boxData: curBox,  closeCallback: this.popupQuene.showPopup.bind(this.popupQuene)})
    return true
}

export function checkPopUp_bankrupt(server, callback){
    let callBacks = ()=>{
        callback && callback()
        getReliefState()
    }   

    if (3000 <= DataManager.UserData.money) {
        return false
    }
    
    if (server.minMoney <= DataManager.UserData.money) {
        return false
    }

    if(server.level != 1){
        return false
    }
    
    if(DataManager.CommonData["reliefStatus"]["reliefTimes"] <= 0){
        return false
    }
    // unenoughGold(0, server.minMoney, callBacks)
    //todo 1.破产补助 2.寻宝
    SceneManager.Instance.popScene<String>("moduleLobby", "BankruptDefend", {callback: callBacks, closeCallback: this.popupQuene.showPopup.bind(this.popupQuene)} )
    return true
}

//todo 寻宝
export function checkPopUp_xunbao(server){
    // let callBacks = ()=>{
    //     callback && callback()
    // }   
    if (server.minMoney <= DataManager.UserData.money) {
        return false
    }

    if(DataManager.UserData.money >= 3000 || cc.sys.os == cc.sys.OS_IOS) unenoughGuidPop(()=>{this.popupQuene.showPopup.bind(this.popupQuene)})
    return true
}

//todo
export function checkPopUp_firstPaysBox(server, callback){
    let isShow =  DataManager.load(DataManager.UserData.guid + "FirstPaysPop_regainLose" + TimeFormat("yyyy-mm-dd"))
    if(!isShow) return false
    
    if(!isShowPayPage()){
        return false
    }

    let payed = (checkFirstBox() != false) ? true : false
    if(!payed){
        return false
    }

    if (server.minMoney <= DataManager.UserData.money) {
        return false
    }
    
    SceneManager.Instance.popScene<String>("moduleLobby", "FirstPaysPop", {
        callback: ()=>{DataManager.save(DataManager.UserData.guid + "FirstPaysPop_regainLose" + TimeFormat("yyyy-mm-dd"), !isShow)}
        , closeCallback: this.popupQuene.showPopup.bind(this.popupQuene)} )
    return true
}

export function checkPopUp_tip(server, callback){
    let callBack = ()=>{
        callback && callback()
        this.popupQuene.showPopup.bind(this.popupQuene)
    }

    if(server.maxmoney >= DataManager.UserData.money){
        return false
    }

    // if (server.mixmoney <= DataManager.UserData.money) {
    //     return false
    // }

    let gameId = server.gameId
        if (gameId === 389)
            gameId = gameId * 10 + parseInt(server.ddz_game_type)
        let servers = getLowMoneyRoom(gameId)
        // if (servers && servers.length > 0) {
        //     let i = Math.floor(Math.random() * 100 % servers.length)
        //     let initParam = {
        //         title: "提示",
        //         content: "<color=#8e7c62><size=26>您的金豆太多了，超出了本场次上<br/>限!重新选个能匹配您水平的场次吧!</size></color><br/>",
        //         confirmClose: true,
        //         confirmFunc: () => {
        //             enterGame(servers[i])
        //         },
        //         cancelFun: callBack,
        //         maskCanClose: false,
        //         exchangeButton: true,
        //         confirmText: "立即前往"
        //     }
        //     MsgBox(initParam)
        // }
        // else {  
        //     let initParam = {
        //             title: "提示",
        //             content: "您的金豆已经大于场次最高上限",
        //             buttonNum: 1,
        //             confirmClose: true,
        //             confirmFunc: callBack,
        //             maskCanClose: false
        //         }

        //     MsgBox(initParam)
        // }
        if (servers && servers.length > 0) {
            let i = Math.floor(Math.random() * 100 % servers.length)
            let initParam = {
                title: "提示",
                content: "<color=#8e7c62><size=26>您的金豆太多了，超出了本场次上<br/>限!重新选个能匹配您水平的场次吧!</size></color><br/>",
                confirmClose: true,
                confirmFunc: () => {
                    enterGame(servers[i])
                },
                maskCanClose: false,
                exchangeButton: true,
                confirmText: "立即前往"
            }
            if (server.minMoney > DataManager.UserData.money) {
                //只要小于当前场次，都退出游戏到大厅
                initParam = null
                initParam = {
                    title: "提示",
                    content: "<color=#8e7c62><size=26>您的金豆已不足本场次准入，请先获取更多金豆吧！</size></color><br/>",
                    confirmClose: true,
                    confirmFunc: () => {
                        this.LeaveGameScene()
                    },
                    maskCanClose: false,
                    exchangeButton: true,
                    confirmText: "退出游戏"
                }
                // initParam.content = "<color=#d4312f><size=36>金豆不足</size></color><br/><br/><color=#8e7c62><size=26>您的金豆已不足原场次准入，是否选<br/>择较低场次进行游戏!</size></color><br/>"
            }
            MsgBox(initParam)
        } else if (server.maxmoney < DataManager.UserData.money) {
            let initParam = {
                title: "提示",
                content: "<color=#8e7c62><size=26>您的金豆已经大于场次最高上限</size></color><br/>",
                buttonNum: 1,
                confirmClose: true,
                maskCanClose: false
            }
            MsgBox(initParam)
        } else if (server.maxmoney > DataManager.UserData.money) {
            let initParam = {
                title: "提示",
                content: "<color=#8e7c62><size=26>您的金豆已不足本场次准入，请先获取更多金豆吧！</size></color><br/>",
                confirmClose: true,
                confirmFunc: () => {
                    this.LeaveGameScene()
                },
                maskCanClose: false,
                exchangeButton: true,
                confirmText: "退出游戏"
            }
            MsgBox(initParam)
        }
        return true
}


let boxStatus = 0 //0:礼包 1:补助
export function checkServerMoneyLimit(server, callback: () => void = null) {  

    //TODO 顺序弹出大厅逻辑：1.容器 2.弹出界面条件判断，弹出界面（界面：1.转运 2.破产补助 3.提示） 3.
    this.popupQuene = new PopupQueue()
    this.popupQuene.add(checkPopUp_bankrupt.bind(this, server, callback))
    this.popupQuene.add(checkPopUp_firstPaysBox.bind(this, server))
    this.popupQuene.add(checkPopUp_luckyBox.bind(this, server))
    this.popupQuene.add(checkPopUp_xunbao.bind(this, server))
    this.popupQuene.add(checkPopUp_tip.bind(this, server, callback))
    this.popupQuene.showPopup()

    if(server.minMoney > DataManager.UserData.money || server.maxmoney < DataManager.UserData.money ){
        return false
    }

    // let callBacks = ()=>{
    //     callback && callback()
    //     boxStatus = 0
    // }
    
    // if (server.minMoney > DataManager.UserData.money) {
    //     //todo 1.幸运礼包，没有的话，弹补充 2.拒绝礼包，弹补助，仅一次  
    //     console.log("jin---checkServerMoneyLimit: ", cc.sys.localStorage.getItem("reliefStatus_reliefTimes"), DataManager.CommonData["reliefStatus"]["reliefTimes"])
    //     // boxStatus = cc.sys.localStorage.getItem("reliefStatus_reliefTimes") == 2 ? 0 : (isShowPayPage()? boxStatus : 1) //原 固定为一次的判断条件
    //     boxStatus = DataManager.CommonData["reliefStatus"]["reliefTimes"] <= 0 ? 0 : (isShowPayPage()? boxStatus : 1)
    //     if(boxStatus == 0){//cc.sys.localStorage.getItem("reliefStatus_reliefTimes") == 2 || 
    //         let curBox = checkChangeLuckyBox(server)
    //         console.log("jin---curBox: ", curBox)
    //         if(curBox && isShowPayPage()){
    //             SceneManager.Instance.popScene("moduleLobby", "ChangeLuckyPayPop", {boxData: curBox,  closeCallback: ()=>{boxStatus = 1}})
    //         }
    //     }else{
    //         unenoughGold(0, server.minMoney, callBacks)//, =()=>{callback()}localStorage.setItem("reliefStatus_reliefTimes", "0"), boxStatus = 0
    //     }
    //     return false
    // }
    // else if (server.maxmoney < DataManager.UserData.money) {
    //     let gameId = server.gameId
    //     if (gameId === 389)
    //         gameId = gameId * 10 + parseInt(server.ddz_game_type)
    //     let servers = getLowMoneyRoom(gameId)
    //     if (servers && servers.length > 0) {
    //         let i = Math.floor(Math.random() * 100 % servers.length)
    //         let initParam = {
    //             title: "提示",
    //             content: "<color=#8e7c62><size=26>您的金豆太多了，超出了本场次上<br/>限!重新选个能匹配您水平的场次吧!</size></color><br/>",
    //             confirmClose: true,
    //             confirmFunc: () => {
    //                 enterGame(servers[i])
    //             },
    //             cancelFun: callback,
    //             maskCanClose: false,
    //             exchangeButton: true,
    //             confirmText: "立即前往"
    //         }
    //         MsgBox(initParam)
    //     }
    //     else{        
    //         let initParam = {
    //             title: "提示",
    //             content: "您的金豆已经大于场次最高上限",
    //             buttonNum: 1,
    //             confirmClose: true,
    //             confirmFunc: callback,
    //             maskCanClose: false
    //         }
    //         MsgBox(initParam)
    //     }
    //     return false
    // }
    
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
    console.log("jin---getLowMoneyRoom: ", GameId, servers)
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
    if (DataManager.Instance.isPureMode()) {
        return
    }
    if (false == SceneManager.Instance.isSceneExist("TrumpetCom") && (!DataManager.CommonData["gameServer"] || DataManager.CommonData["gameServer"].ddz_game_type != 3))
        SceneManager.Instance.popScene("moduleLobby", "TrumpetCom", {msg: msg})
}

export function showCashOutNotice(message?: string) {
    if (DataManager.Instance.isPureMode()) {
        return
    }
    if (!SceneManager.Instance.isSceneExist("CashOutNotice") && (DataManager.CommonData["gameServer"] && DataManager.CommonData["gameServer"].ddz_game_type == 3))
        SceneManager.Instance.popScene("moduleLobby", "CashOutNotice", { message: message })
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

export function numberFormat_fnt(num: number, floatNum: number = 2, isEnforce: boolean = false) {
    if (num >= 100000000) {
        return (num / 100000000 > 1000 ? Math.floor(num / 100000000):
                   num / 100000000 > 100 ? Math.floor(num / 10000000) / 10:
                   Math.floor(num / 1000000) / 100) + "w"
    }
    else if (num >= 10000) {
        return (num / 10000 > 1000 ? Math.floor(num / 10000) :
                    num / 10000 > 100 ? Math.floor(num / 1000) / 10 :
                    Math.floor(num / 100) / 100 ) + "W"
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
 
export function czcEvent(label) {
    // if (window.wx && window.wx.aldSendEvent)
    //     window.wx.aldSendEvent(moduleName + '+' + action + '+' + label)
    if (window.wx && igs.platform)
        igs.platform.trackEvent(label)
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
        console.log("jin---getShopBox: ", boxtype, res)
        if (res && res["sl"]) {
            if (boxtype == 2){
                // DataManager.Instance.OneYuanBoxs = res["sl"]
                //1.转运  2.补充
                // console.log("jin---getShopBox111: ", DataManager.Instance.OneYuanBoxs)
                DataManager.Instance.OneYuanBoxs = []
                DataManager.Instance.SuperSaleBoxs = []
                DataManager.Instance.TimeLimitBoxs = []
                for(let curBox of res["sl"]){
                    if(curBox.boxname.indexOf("转运礼包") != -1 || curBox.boxname.indexOf("补充礼包") != -1){
                        DataManager.Instance.OneYuanBoxs.push(curBox)
                    }
                    if(curBox.boxname.indexOf("超级折扣") != -1){ 
                        DataManager.Instance.SuperSaleBoxs.push(curBox) //todo
                    }
                    if(curBox.boxname.indexOf("限时特惠") != -1){
                        DataManager.Instance.TimeLimitBoxs.push(curBox) //todo
                    }
                }
                // console.log("jin---getShopBox222: ", DataManager.Instance.OneYuanBoxs,DataManager.Instance.SuperSaleBoxs,  DataManager.Instance.TimeLimitBoxs)
                SceneManager.Instance.sendMessageToScene("updateOneYuanBox")
            }
            else if (boxtype == 5 && res.length > 0) {
                // DataManager.Instance.ActiveBoxs = res["sl"]//废弃
                DataManager.Instance.changeLuckyBoxs = res["sl"]
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
    } else if (id == 382) {
        return DataManager.Instance.getSpriteFrame("itemIcon", "icon_382")
    } else if (id == 383) {
        return DataManager.Instance.getSpriteFrame("itemIcon", "icon_383")
    } else if (id == 390) {
        return DataManager.Instance.getSpriteFrame("itemIcon", "icon_390")
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
    [382]: "话费券", //-3
    [383]: "免扣符",
    [390]: "永久闹钟",
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
                // czcEvent("大厅", "用户信息", "同步用户数据")
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
        res && callback(res)
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

export function getIPLocation(){
    http.open("https://igaoshou.mcbeam.pro/api/igaoshou-game-center/center/getIpLocal",{}, (msg) => {
        if(msg){
            let arr_ip = msg.data.local.split('|')
            DataManager.CommonData.IPLocation = arr_ip[2]
            SceneManager.Instance.sendMessageToScene("updateIPLocation")
        }
        
    })
}

const specialAward = ["北京市", "上海市", "广州市", "深圳市", "重庆市","成都市"]
export function checkSpecialAward() {
    if (DataManager.CommonData.IPLocation != null) {
        if (DataManager.Instance.onlineParam.specialAward === 1) {
            return false
        } else if (DataManager.Instance.onlineParam.specialAward === 0) {
            return true
        }

        const area = DataManager.Instance.onlineParam.specialAward || specialAward
        return area.indexOf(DataManager.CommonData.IPLocation) == -1
    }
    return false
}

const adBannerConfig = {}
export function parseAdBannerConfig() {
    if (DataManager.Instance.onlineParam.adBannerConfig) {
        const regtime = DataManager.CommonData["regtime"]
        // console.log("jin---temp regtime: ", regtime)
        const unitids = DataManager.Instance.onlineParam.adBannerConfig.unitids || {}
        for (const k in unitids) {
            adBannerConfig[k] = {}
            const rt = regtime >= unitids[k].sp ? "tv" : "fv"
            adBannerConfig[k].unitid = unitids[k][rt] || null
            // console.log("jin---temp unitids k rt unitids[k][rt]: ", k, rt, unitids[k][rt])
        }

        const preload = DataManager.Instance.onlineParam.adBannerConfig.preload || []
        // console.log("jin---temp preload: ", preload)
        for (const v of preload) {
            WxWrapper.initBanner(getAdBannerUnitid(v))
        }
    }
}

export function getAdBannerUnitid(index: number) {
    return adBannerConfig[index] ? adBannerConfig[index].unitid : null//adBannerConfig[-1].unitid
}

const adCustomConfig = {}
export function parseAdCustomConfig() {
    //TODO 目前数据写死
    adCustomConfig[1] = {unitid:"adunit-c1664b854813f0c7"}
    adCustomConfig[2] = {unitid:"adunit-cc6cc86c775bc2e5"}
    const preload = [1,2]

    for(const v of preload){
        WxWrapper.initCustomAd(getAdCustomUnitid(v))
    }
}

const miniGameConfig = {miniGameId:null, path:null, title:null}
export function parseMiniGame(){
    
    if (DataManager.Instance.onlineParam.display_game_appid) {
        miniGameConfig.miniGameId = DataManager.Instance.onlineParam.display_game_appid
        miniGameConfig.path = DataManager.Instance.onlineParam.display_game_icon
        miniGameConfig.title = DataManager.Instance.onlineParam.display_game_name 
        }
    // console.log("jin--- parseMiniGame:", DataManager.UserData.guid + "shopPop", DataManager.load(DataManager.UserData.guid + "shopPop"))
    DataManager.load(DataManager.UserData.guid + "shopPop") && DataManager.remove(DataManager.UserData.guid + "shopPop") 
    DataManager.load(DataManager.UserData.guid + "FirstPaysPop") && DataManager.remove(DataManager.UserData.guid + "FirstPaysPop")
    DataManager.load(DataManager.UserData.guid + "FirstPaysPop_regainLose" + TimeFormat("yyyy-mm-dd")) == null && DataManager.save(DataManager.UserData.guid + "FirstPaysPop_regainLose" + TimeFormat("yyyy-mm-dd"), true)
    !(DataManager.load(DataManager.UserData.guid + "FirstPaysPop_result" + TimeFormat("yyyy-mm-dd"))) && DataManager.save(DataManager.UserData.guid + "FirstPaysPop_result" + TimeFormat("yyyy-mm-dd"), 1)
    // !(DataManager.load(DataManager.UserData.guid + "FirstPaysPop_result" + TimeFormat("yyyy-mm-dd"))) && DataManager.save(DataManager.UserData.guid + "FirstPaysPop_result" + TimeFormat("yyyy-mm-dd"), false)
    !(DataManager.load(DataManager.UserData.guid + "RegainLosePayCount" + TimeFormat("yyyy-mm-dd"))) && DataManager.save(DataManager.UserData.guid + "RegainLosePayCount" + TimeFormat("yyyy-mm-dd") , 5) //输分找回 支付
    !(DataManager.load(DataManager.UserData.guid + "RegainLoseCount" + TimeFormat("yyyy-mm-dd"))) && DataManager.save(DataManager.UserData.guid + "RegainLoseCount" + TimeFormat("yyyy-mm-dd") , 1) //输分找回 广告
    !(DataManager.load(DataManager.UserData.guid + "WinDoubleCount" + TimeFormat("yyyy-mm-dd"))) && DataManager.save(DataManager.UserData.guid + "WinDoubleCount" + TimeFormat("yyyy-mm-dd") , 1)
    //TODO 1元福利出现标记 and 6yuan
    DataManager.load(DataManager.UserData.guid + "superWelfare_1" + TimeFormat("yyyy-mm-dd")) == null && DataManager.save(DataManager.UserData.guid + "superWelfare_1" + TimeFormat("yyyy-mm-dd"), true)
    DataManager.load(DataManager.UserData.guid + "superWelfare_6" + TimeFormat("yyyy-mm-dd")) == null && DataManager.save(DataManager.UserData.guid + "superWelfare_6" + TimeFormat("yyyy-mm-dd"), true)
    //TODO 局数cd标记
    !(DataManager.load(DataManager.UserData.guid + "superWelfare_count_1" + TimeFormat("yyyy-mm-dd"))) && DataManager.save(DataManager.UserData.guid + "superWelfare_count_1" + TimeFormat("yyyy-mm-dd"), 2)
    !(DataManager.load(DataManager.UserData.guid + "superWelfare_count_6" + TimeFormat("yyyy-mm-dd"))) && DataManager.save(DataManager.UserData.guid + "superWelfare_count_6" + TimeFormat("yyyy-mm-dd"), 2)
    //ouHuang_count
    !(DataManager.load(DataManager.UserData.guid + "ouHuang_count" + TimeFormat("yyyy-mm-dd"))) && DataManager.save(DataManager.UserData.guid + "ouHuang_count" + TimeFormat("yyyy-mm-dd"), 1)
    //ouHuang_buyed
    DataManager.load(DataManager.UserData.guid + "ouHuang_buyed" + TimeFormat("yyyy-mm-dd")) == null && DataManager.save(DataManager.UserData.guid + "ouHuang_buyed" + TimeFormat("yyyy-mm-dd"), false)
}

//跳转微信小游戏 (参数1.node 2.pos)
export function CreateNavigateToMiniProgram(parentNode: cc.Node, pos: cc.Vec2) {
    if(!isShowNewVersionContent()) return
    if(!miniGameConfig.miniGameId || !miniGameConfig.path || !miniGameConfig.title){
        return
    }
    var path = "moduleBaseRes/prefab/NavigateToMiniGame"
    cc.loader.loadRes(path, cc.Prefab,
        (err, res) => {
            if (err) {
                cc.log("jin---err: ",err)
            }
            else if (res instanceof cc.Prefab) {
                // console.log("jin---CreateNavigateToMiniProgram RES")
                let NavigateToMiniToGame = cc.instantiate(res)
                if(functions.getNodeComponent(NavigateToMiniToGame, "NavigateToMiniGame") && NavigateToMiniToGame && parentNode) {
                    NavigateToMiniToGame.parent = parentNode
                    functions.getNodeComponent(NavigateToMiniToGame, "NavigateToMiniGame").setGameId(miniGameConfig.miniGameId, miniGameConfig.path, miniGameConfig.title)
                    NavigateToMiniToGame.setPosition(pos)
                }
            }
        }
    )
}

export function navigateToMiniProgram(miniGameId: string, callback:(data: string) => void) {
    WxWrapper.navigateToMiniProgram(miniGameId, callback)
}

export function getAdCustomUnitid(index: number) {
    // console.log("jin---adCustomConfig[index]: ", adCustomConfig[index], adCustomConfig[index].unitid)
    return adCustomConfig[index] ? adCustomConfig[index].unitid : null
}

export function localStorage_WX(key: string, vaule: any, state: boolean,callback?:(date: any) => void){
    //state: true(设置数据)
    if(state){
        WxWrapper.setStorageInfo(key, vaule)
    }else{
        // console.log("jin---WxWrapper.getStorageInfo",WxWrapper.getStorageInfo(key))
        return WxWrapper.getStorageInfo(key, callback)
    }
}

export function localStorage_WX_getStorageSync(key: string){
    return WxWrapper.getStorageInfoSync(key)
}

export function localStorage_WX_setStorageSync(key: string, value: any){
    return WxWrapper.setStorageInfoSync(key, value)
}

export function getBaiYuanServer() {
    if (DataManager.CommonData["ServerDatas"] && DataManager.CommonData["ServerDatas"][389]) {
        for (const server of DataManager.CommonData["ServerDatas"][389]) {
            if (server.ddz_game_type == 3) {
                return server
            }
        }
    }

    return null
}
