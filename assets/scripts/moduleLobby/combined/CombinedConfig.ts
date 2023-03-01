import { confusonFunc } from "../../base/confusonFunc";

// 192.168.20.102:8080/gamecombined/xxxx
//  xxxx 表示后面对应的rpc 接口，接口首字母小写

import DataManager from "../../base/baseData/DataManager"
import md5 = require("../../base/extensions/md5.min")
import { http } from "../../base/utils/http"

//  //  配置获取
//   rpc Config(go.api.Request) returns (go.api.Response) {}
// 	uid
	
  
//   //  玩家数据
//   rpc Info(go.api.Request) returns (go.api.Response) {}
// 	uid
	
	
//   //  合成
//   rpc Combined(go.api.Request) returns (go.api.Response) {}
// 	uid
// 	src 当前位置 
// 	dst 移动到的位置
  
//   //   购买
//   rpc Purchase(go.api.Request) returns (go.api.Response) {}
// 	uid
// 	level 购买等级，快速购买 level传0
	
  
//   //   回收
//   rpc Recycle(go.api.Request) returns (go.api.Response) {}
// 	uid
// 	pos 回收位置
	
//   //  收集
//   rpc Collect(go.api.Request) returns (go.api.Response) {}
// 	uid
	
  
//   //  加速
//   rpc SpeedUp(go.api.Request) returns (go.api.Response) {}
// 	uid
	
  
//   //  排行
//   rpc RankList(go.api.Request) returns (go.api.Response) {}
// 	uid
// 	season 赛季ID
// 	page
// 	pageSize
	

//   // 赛季奖励
//   rpc RankRewards(go.api.Request) returns(go.api.Response) {}
// 	uid
// 	season 赛季ID
	
	
//   // 获取元宝 看广告得元宝
//   rpc ObtainGold(go.api.Request) returns(go.api.Response) {}
// 	uid

// luckyBox 幸运宝箱  uid season
// OpenLuckyBox 打开宝箱 uid  season boxId boxId

// luckyDraw 转盘抽奖 uid season

// AdsRequest uid season  id


// const CombinedURIT = "192.168.20.102:8080/gamecombined/"
const CombinedURIO = "https://h5.weipinggame.com.cn/micro/gamecombined/"
const CombinedURIT = "https://t_h5.wpgame.com.cn/micro/gamecombined/"
let isHttps = true
const URLConfig = {
    LOAD_CONFIG: "config",
    LOAD_INFO: "info",
    COMBINED: "combined",
    PURCHASE: "purchase",
    RECYCLE: "recycle",
    COLLECT: "collect",
    SPEED_UP: "speedUp",
    RANK_LISE: "rankList",
    RANK_REWARDS: "rRankRewards",
    OBTAIN_GOLD: "obtainGold",
    LUCKY_BOX: "luckyBox",
    OPEN_BOX: "openLuckyBox", 
    LUCKY_DRAW: "luckyDraw",
    ADS_REQUEST: "adsRequest",
    LOAD_COLLECT: "collect",
    GET_TITLE: "getTitle",
}    

const ErrType = {
    [-3002]: "银币不足"
}

export namespace CombinedConfig  {
    function getURL(key) {
        isHttps = DataManager.Instance.CurENV !== 0 

        if (DataManager.Instance.CurENV === 0)
            return CombinedURIT + URLConfig[key]

        return CombinedURIO + URLConfig[key]
    }

    export function sign(params) {
        params["ts"] = Math.floor(Date.now() / 1000)
        let keys = []
        let newParams = []
        for (const key in params) {
            keys.push(key)
        }
        keys.sort((a, b) => {
            for (let i = 0; i < a.length - 1; i ++) {
                if (a.substr(i, 1).charCodeAt() < b.substr(i, 1).charCodeAt())
                    return -1
                else if (a.substr(i, 1).charCodeAt() > b.substr(i, 1).charCodeAt())
                    return 1
            }
        })
        let strSign = ""
        for (const key of keys) {
            newParams[key] = params[key]
            strSign += key + "=" + newParams[key] + "&"
        }        
        strSign += "sign=V5JmFjU46EzeMBV6EmI1uaRI6HiEPtPtJHE"
        console.log(strSign)
        newParams["sign"] = md5(strSign)

        return newParams
    }

    export function loadConfig(callback: (msg) => void) {
        http.open({
            url: getURL("LOAD_CONFIG"),
            query: sign({ uid: DataManager.UserData.guid }),
            method: "POST",
            queryType: "formdata",
            propertys: { timeout: 5000 },
            callback: callback,
        })
    }

    export function loadInfo(season: number, callback: (msg) => void) {
        http.open({
            url: getURL("LOAD_INFO"),
            query: sign({ uid: DataManager.UserData.guid, season: season }),
            method: "POST",
            queryType: "formdata",
            propertys: { timeout: 5000 },
            callback: callback,
        })
    }

    export function combined(curIdx, disIdx, season: number, callback: (msg) => void) {
        http.open({
            url: getURL("COMBINED"),
            query: sign({ uid: DataManager.UserData.guid, src: curIdx + 1, dst: disIdx + 1, season: season }),
            method: "POST",
            queryType: "formdata",
            propertys: { timeout: 5000 },
            callback: callback,
        })
    }

    export function purchase(level, season: number, callback) {
        http.open({
            url: getURL("PURCHASE"),
            query: sign({ uid: DataManager.UserData.guid, level: level, season: season }),
            method: "POST",
            queryType: "formdata",
            propertys: { timeout: 5000 },
            callback: callback,
        })
    }

    export function recycle(idx, season: number, callback) {
        http.open({
            url: getURL("RECYCLE"),
            query: sign({ uid: DataManager.UserData.guid, pos: idx + 1, season: season }),
            method: "POST",
            queryType: "formdata",
            propertys: { timeout: 5000 },
            callback: callback,
        })
    }

    export function SpeedUp(season: number, callback) {
        http.open({
            url: getURL("SPEED_UP"),
            query: sign({ uid: DataManager.UserData.guid, season: season }),
            method: "POST",
            queryType: "formdata",
            propertys: { timeout: 5000 },
            callback: callback,
        })
    }

    export function getRankList(season, page, pageSize, callback) {
        http.open({
            url: getURL("RANK_LISE"),
            query: sign({ uid: DataManager.UserData.guid, season: season, page: page, pageSize: pageSize }),
            method: "POST",
            queryType: "formdata",
            propertys: { timeout: 5000 },
            callback: callback,
        })
    }

    export function luckyBox(season, callback) {
        http.open({
            url: getURL("LUCKY_BOX"),
            query: sign({ uid: DataManager.UserData.guid, season: season }),
            method: "POST",
            queryType: "formdata",
            propertys: { timeout: 5000 },
            callback: callback,
        })
    }

    export function openBox(season, boxId, pos, callback) {
        http.open({
            url: getURL("OPEN_BOX"),
            query: sign({ uid: DataManager.UserData.guid, season: season, boxId: boxId, pos: pos + 1 }),
            method: "POST",
            queryType: "formdata",
            propertys: { timeout: 5000 },
            callback: callback,
        })
    }

    export function luckyDraw(season, callback) {
        http.open({
            url: getURL("LUCKY_DRAW"),
            query: sign({ uid: DataManager.UserData.guid, season: season }),
            method: "POST",
            queryType: "formdata",
            propertys: { timeout: 5000 },
            callback: callback,
        })
    }

    export function getAdAward(season, id, callback) {
        http.open({
            url: getURL("ADS_REQUEST"),
            query: sign({ uid: DataManager.UserData.guid, season: season, id: id }),
            method: "POST",
            queryType: "formdata",
            propertys: { timeout: 5000 },
            callback: callback,
        })
    }

    export function loadCollect(season, offline, callback) {
        http.open({
            url: getURL("LOAD_COLLECT"),
            query: sign({ uid: DataManager.UserData.guid, season: season, offline: offline }),
            method: "POST",
            queryType: "formdata",
            propertys: { timeout: 5000 },
            callback: callback,
        })
    }

    export function getTitle(uid, callback) {
        http.open({
            url: getURL("GET_TITLE"),
            method: "POST",
            queryType: "formdata",
            query: sign({ uid: uid, }),
            propertys: { timeout: 5000 },
            callback: callback,
        })
    }

    export function getTitleByLevel(level) {
        return "moduleLobby/texture/combined/title" + ("0" + level).slice(-2)
    }

    export function getErrType(errCode) {
        return errCode + ":" + (ErrType[errCode] || "")
    } 
}
