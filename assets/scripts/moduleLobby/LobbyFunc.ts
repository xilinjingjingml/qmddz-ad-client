import { confusonFunc } from "../base/confusonFunc";

import { AdsConfig } from "../base/baseData/AdsConfig";
import DataManager from "../base/baseData/DataManager";
import { checkPhoneBinding, czcEvent, iMessageBox, playAD, showAwardResultPop, socialShare, isFreeAdvert, checkTimeLimitBox, TimeFormat, getNowTimeUnix, numberFormat } from "../base/BaseFuncTs";
import NetManager from "../base/baseNet/NetManager";
import SceneManager from "../base/baseScene/SceneManager";
import md5 = require("../base/extensions/md5.min")
import WxWrapper from "../base/WxWrapper";
import { UserExtends } from "../base/extends/UserExtends";
import { http } from "../base/utils/http";
import { areas, nicknames } from "../constant";
import { ITEM } from "../base/baseData/ItemConfig";
import PluginManager from "../base/PluginManager";

export function getVipConfig(callback: () => void = null) {
    if (DataManager.CommonData["VipInfo"]) {
        callback && callback()
        return
    }

    const params = {
        gameid: DataManager.Instance.gameId,
        pn: DataManager.Instance.packetName,
    }

    http.open(DataManager.getURL("VIPCONFIG"), params, (res) => {
        if (res && res.ret == 0) {
            DataManager.CommonData["VipInfo"] = res.list
            callback && callback()
        }
    })
}

export function getExchangeConfig(callback: () => void = null) {
    const params = {
        pn: DataManager.Instance.packetName,
        sign: md5("pn=" + DataManager.Instance.packetName + "&key=6wFKBS5y6a0B"),
        uid: DataManager.UserData.guid,
        ticket: DataManager.UserData.ticket,
        gameid: DataManager.Instance.gameId
    }

    http.open(DataManager.getURL("DUIHUANCONFIG"), params, (res) => {
        if (res && res.ret == 0) {
            DataManager.CommonData["ExchangeInfo"] = res.list.filter((item) => {
                return DataManager.CommonData.regtime >= (item.limitRegTime || 0)
            })

            DataManager.CommonData["ExchangeInfo"].sort((a, b) => a["limitVip"] < b["limitVip"] ? -1 :
                (a["limitVip"] > b["limitVip"] ? 1 :
                    (a["gainItemList"][0]["gainItem"] == 0 ? -1 :
                        (a["gainItemList"][0]["gainItem"] != 0 ? 1 :
                            (a["gainItemList"][0]["exchangeNum"] < a["gainItemList"][0]["exchangeNum"] ? -1 :
                                (a["gainItemList"][0]["exchangeNum"] > a["gainItemList"][0]["exchangeNum"] ? 1 : 0
                                ))))))

            callback && callback()
            SceneManager.Instance.sendMessageToScene("updateExchangeInfo")
        }
    })
}

export function getNewUserSignAward(callback: () => void = null) {
    cc.log("start getNewUserSignAward")
    let url = DataManager.getURL("LOAD_NEW_REGISTER")

    let param = {
        uid: DataManager.UserData.guid,
        pn: DataManager.Instance.packetName,
        gameid: 389,//DataManager.Instance.gameId,
        ticket: DataManager.UserData.ticket
    }
    cc.log("url = " + url)
    cc.log(param)
    http.open(url, param, function (msg) {
        cc.log("get response getNewUserSignAward")
        cc.log(msg)
        if (msg && null != msg.ret && msg.ret == 0) {
            DataManager.CommonData["NewUserSgin"] = msg
        }

        if (null != callback)
            callback()
    })
}

export function getDialAwardList(taskInd, callback: () => void = null) {
    let sign = "uid=" + DataManager.UserData.guid + "&key=8923mjcm0d089d";
    sign = md5(sign);

    let param = {
        gameid: DataManager.Instance.gameId,
        channel: 1,
        activityId: 10000 + DataManager.Instance.gameId,
        uid: DataManager.UserData.guid,
        sign: sign,
        pn: DataManager.Instance.packetName,
        taskid: taskInd,
    };
    let url = DataManager.getURL("DIAL")

    http.open(url, param, function (msg) {
        cc.log(msg)
        if (msg && msg["list"]) {
            DataManager.CommonData["awardData"] = msg["list"]
            if (null != callback)
                callback()
        }
        else if (msg && msg[0] && msg[0]["list"]) {
            DataManager.CommonData["awardData"] = msg[0]["list"]
            if (null != callback)
                callback()
        }
    })
}

export function getDialResult(taskInd, callback: (msg) => void = null) {
    let sign = "uid=" + DataManager.UserData.guid + "&key=8923mjcm0d089d";
    sign = md5(sign);

    let param = {
        gameid: DataManager.Instance.gameId,
        channel: 1,
        activityId: 10000 + DataManager.Instance.gameId,
        uid: DataManager.UserData.guid,
        sign: sign,
        pn: DataManager.Instance.packetName,
        taskid: taskInd,
    };
    let url = DataManager.getURL("DARW_DIAL")

    http.open(url, param, function (msg) {
        if (msg && null != callback) {
            callback(msg)
        }
    })
}

export function loadLotteryData(callback: () => void = null, channel: number = 2) {
    const datakey = channel == 2 ? "lotteryData" : "happyLotteryData"
    if (DataManager.CommonData[datakey]) {
        callback && callback()
        return
    }

    const param = {
        gameid: DataManager.Instance.gameId,
        channel: channel,
        activityId: 10000 + DataManager.Instance.gameId,
        uid: DataManager.UserData.guid,
        sign: md5("uid=" + DataManager.UserData.guid + "&key=8923mjcm0d089d"),
        pn: DataManager.Instance.packetName,
        taskid: 2
    }

    http.open(DataManager.getURL("DIAL"), param, (res) => {
        console.log("jin---loadLotteryData: ", res)
        if (res && (res.list || (res[0] && res[0].list))) {
            const data = res.list || res[0].list
            for (const itr of data) {
                if (itr.acItemNum == 0) {
                    itr.itemDesc = "谢谢参与"
                } else if (itr.acItemIndex == 382) {
                    itr.itemDesc = Math.floor(itr.acItemNum / 100) + "话费券"
                }
            }
            data.sort((a, b) => {
                return a.acAutoId - b.acAutoId
            })

            DataManager.CommonData[datakey] = data
            callback && callback()
        }
    })
}

//todo 幸运转盘奖励
export function getLuckyLotteryAward(callback: (res) => void) {
    const param = {
        gameid: DataManager.Instance.gameId,
        channel: 7,
        activityId: 10000 + DataManager.Instance.gameId,
        uid: DataManager.UserData.guid,
        sign: md5("uid=" + DataManager.UserData.guid + "&key=8923mjcm0d089d"),
        pn: DataManager.Instance.packetName,
        taskid: 2,
        pnum: 1
    }

    http.open(DataManager.getURL("DARW_DIAL"), param, (res) => {
        // console.log("jin---getLuckyLotteryAward: ", param, res)
        callback(res)
    })
}

//转盘奖励
export function getLotteryAward(callback: (res) => void, isHappyLottery: boolean = false) {
    const param = {
        gameid: DataManager.Instance.gameId,
        channel: isHappyLottery ? 3 : 2,
        activityId: 10000 + DataManager.Instance.gameId,
        uid: DataManager.UserData.guid,
        sign: md5("uid=" + DataManager.UserData.guid + "&key=8923mjcm0d089d"),
        pn: DataManager.Instance.packetName,
        taskid: isHappyLottery ? AdsConfig.taskAdsMap.New_HappyLottery : 2,
        pnum: isHappyLottery ? 0 : 1
    }

    http.open(DataManager.getURL("DARW_DIAL"), param, (res) => {
        // console.log("jin---getLotteryAward: ", res)
        callback(res)
    })
}

export function loadLotteryRecord(callback: (records) => void) {
    const param = {
        uid: DataManager.UserData.guid,
        ticket: DataManager.UserData.ticket
    }

    http.open(DataManager.getURL("DARW_RECORD"), param, (res) => {
        if (res) {
            const data = []
            const reg = /恭喜用户(.*)抽中(.*)/
            for (const key in res) {
                const match = reg.exec(res[key])
                if (match) {
                    if (match[1].length > 7) {
                        match[1] = match[1].substring(0, 7) + "..."
                    }
                    data.push({ name: match[1], award: match[2] })
                }
            }
            callback(data)
        }
    })
}

export function getMobileState(callback: () => void = null) {
    let url = DataManager.getURL("MOBILE_STATUS")
    let params = {
        pn: DataManager.Instance.packetName,
        pid: DataManager.UserData.guid,
        ticket: DataManager.UserData.ticket,
        version: DataManager.Instance.version
    }

    http.open(url, params, function (msg) {
        cc.log(msg)
        DataManager.CommonData["bindPhone"] = {}
        if (null != msg) {
            DataManager.CommonData["bindPhone"].hasBindMoble = msg.ret
            DataManager.CommonData["bindPhone"].BindPhone = msg.phone
        }

        if (null != callback)
            callback()
    })
}

export function getMobileCode(phone, flag, callback: (msg) => void = null) {
    let url = DataManager.getURL("MOBILE_CODE_GET")
    let guid = "0"
    let ticket = ""
    if (DataManager.UserData.guid != "") {
        guid = DataManager.UserData.guid
        ticket = DataManager.UserData.ticket
    }
    let sign = "pid=" + guid + "&ticket=" + ticket +
        "&pn=" + DataManager.Instance.packetName + "&version=1&phone=" + phone + "&flag=" + flag + "&key=fas342wrff4t32dfg534g432"
    sign = md5(sign)

    let params = {
        pid: guid,
        ticket: ticket,
        pn: DataManager.Instance.packetName,
        version: 1,
        phone: phone,
        flag: flag,
        sign: sign,
    };

    http.open(url, params, function (msg) {
        if (typeof callback == "function")
            callback(msg)
    })
}

export function loadAdConfig(callback: () => void = null) {
    const param = {
        pid: DataManager.UserData.guid,
        ticket: DataManager.UserData.ticket
    }
    console.log("jin---大厅加载广告配置444： ", DataManager.CommonData.AdConfig, DataManager.UserData.guid, DataManager.UserData.ticket, DataManager.getURL("AD_CONFIG"))
    http.open(DataManager.getURL("AD_CONFIG"), param, (res) => {
        console.log("jin---loadAdConfig res: ")
        if (res && res.adConfig) {
            const config: Record<string, IAdConfig> = {}

            for (const cfg of res.adConfig) {
                const adIndex = cfg.ca_ad_area
                let total = cfg.award && cfg.award[0] ? cfg.award[0].ca_award_num : 0

                if (adIndex == AdsConfig.taskAdsMap.Wages ||
                    adIndex == AdsConfig.taskAdsMap.SignPop ||
                    adIndex == AdsConfig.taskAdsMap.New_DailyGift) {
                    total = 1
                }

                if (adIndex == AdsConfig.taskAdsMap.Wages) {
                    const awardConfig = {}
                    for (const t of cfg.award) {
                        if (!awardConfig[t.ca_sequence]) {
                            awardConfig[t.ca_sequence] = []
                        }
                        awardConfig[t.ca_sequence].push({ index: t.ca_award_index, num: t.ca_award_num })
                    }
                    DataManager.CommonData.VipAwardConfig = awardConfig
                }

                config[adIndex] = { total: total, count: 0, method: 2, canFree: true, unitid: null }
            }

            for (const itr of res.adCnt || []) {
                if (config[itr.ua_ad_area_id]) {
                    config[itr.ua_ad_area_id].count = itr.ua_ad_times
                }
            }

            if (DataManager.Instance.onlineParam.adConfig) {
                const method = DataManager.Instance.onlineParam.adConfig.method || {}
                for (const k in method) {
                    config[k] && (config[k].method = method[k])
                }

                const nofree = DataManager.Instance.onlineParam.adConfig.nofree || []
                for (const v of nofree) {
                    config[v] && (config[v].canFree = false)
                }

                // const regtime = DataManager.CommonData["regtime"]
                const unitids = DataManager.Instance.onlineParam.adConfig.unitids || {}
                for (const k in unitids) {
                    if (config[k]) {
                        // const rt = regtime >= unitids[k].sp ? "tv" : "fv"
                        const rt = DataManager.CommonData["morrow"] < 3 ? "tv" : "fv"
                        config[k].unitid = unitids[k][rt] || null
                    }
                }
                console.log("jin---大厅加载广告配置555： ", DataManager.CommonData.AdConfig)
                if (PluginManager.supportAdSpot()) {
                    console.log("jin---大厅加载广告配置666： ", DataManager.CommonData.AdConfig)
                    const sources: Record<string, Record<string, string | { adId: string, adNewId?: string, weight?: number }>> = DataManager.Instance.onlineParam.adConfig.sources || {}
                    for (const id in sources) {
                        // if (!PluginManager.hasPluginByName(id)) {
                        //     cc.log("未发现广告插件", id)
                        //     continue
                        // }

                        const source = sources[id]
                        for (const k in source) {
                            if (!config[k]) {
                                config[k] = { total: 0, count: 0, method: 2, canFree: false, unitid: null }
                            }

                            let unitid = config[k].unitid
                            if (unitid == null || typeof unitid == "string") {
                                unitid = []
                            }

                            const cfg = source[k]
                            if (typeof cfg == "string") {
                                unitid.push({ id: id, adId: cfg, weight: 1 })
                            } else {
                                if (cfg.adNewId && DataManager.CommonData["morrow"] < 3) {
                                    unitid.push({
                                        id: id,
                                        adId: cfg.adNewId,
                                        weight: cfg.weight == null ? 1 : cfg.weight
                                    })
                                } else {
                                    unitid.push({
                                        id: id,
                                        adId: cfg.adId,
                                        weight: cfg.weight == null ? 1 : cfg.weight
                                    })
                                }
                            }

                            config[k].unitid = unitid
                        }
                    }
                } else {
                    cc.log("不支持广告点")
                }

                const preload = DataManager.Instance.onlineParam.adConfig.preload || []
                for (const v of preload) {
                    config[v] && WxWrapper.initVideo(config[v].unitid)
                }


                // const method = DataManager.Instance.onlineParam.AdsMSDKAds.adConfig.method || {}
                // for (const k in method) {
                //     config[k] && (config[k].method = method[k])
                // }

                // const nofree = DataManager.Instance.onlineParam.AdsMSDKAds.adConfig.nofree || []
                // for (const v of nofree) {
                //     config[v] && (config[v].canFree = false)
                // }

                // const regtime = DataManager.CommonData["regtime"]
                // const unitids = DataManager.Instance.onlineParam.AdsMSDKAds.adConfig.unitids || {}
                // for (const k in unitids) {
                //     if (config[k]) {
                //         // const rt = regtime >= unitids[k].sp ? "tv" : "fv"
                //         // config[k].unitid = unitids[k][rt] || null
                //         const rt =  DataManager.CommonData["morrow"] < 3 ? "tv" : "fv"
                //         config[k].unitid = unitids[k][rt] ? unitids[k][rt] : unitids[k]["tv"] ? unitids[k]["tv"] : null
                //         console.log("jin---视频广告点: ", k, rt, config[k])
                //     }
                // }

                // const preload = DataManager.Instance.onlineParam.AdsMSDKAds.adConfig.preload || []
                // for (const v of preload) {
                //     config[v] && WxWrapper.initVideo(config[v].unitid)
                // }
            }

            DataManager.CommonData.AdConfig = config
            console.log("jin---大厅加载广告配置777： ", DataManager.CommonData.AdConfig)
            callback && callback()
            SceneManager.Instance.sendMessageToScene("onAdConfigUpdate")
        }
    })
}

export function getAdData(adIndex) {
    if (DataManager.CommonData.AdConfig) {
        return DataManager.CommonData.AdConfig[adIndex] || DataManager.CommonData.AdConfig[-1]
    }
    return null
}

export function checkAdCanReceive(adIndex) {
    const data = getAdData(adIndex)
    // console.log("jin---checkAdCanReceive: ", data)
    return data ? data.total > data.count : false
}

export function getAdTotalTimes(adIndex) {
    const data = getAdData(adIndex)
    return data ? data.total : 0
}

export function getAllAdCountTimes() {
    let count = 0
    for (const key in DataManager.CommonData.AdConfig) {
        const data = DataManager.CommonData.AdConfig[key]
        if (data && data.count) {
            count += data.count
        }
    }
    return count
}

export function getAdLeftTimes(adIndex) {
    const data = getAdData(adIndex)
    // console.log("jin---getAdLeftTimes: ", adIndex, data)
    return data && data.total > data.count ? data.total - data.count : 0
}

/**
 * 下一次广告类型
 * 0:免费领取 1:分享领取 2:视频领取
 */
export function getNextAdMethod(adIndex) {
    const data = getAdData(adIndex)
    if (data) {
        const method = Array.isArray(data.method) ? data.method[data.count] : data.method

        if (method == 0) {
            return 0
        } else if (method == 1) {
            return 1
        } else {
            return (data.canFree && isFreeAdvert()) ? 0 : 2
        }
    }

    return 2
}

export function getAdUnitId(adIndex) {
    const data = getAdData(adIndex)
    return data ? data.unitid : null
}

export function requestAdAward(adIndex, success: (res) => void = null) {
    const params = {
        pid: DataManager.UserData.guid,
        ticket: DataManager.UserData.ticket,
        gameid: DataManager.Instance.gameId,
        taskInd: adIndex,
        sign: md5("pid=" + DataManager.UserData.guid + "&gameid=" + DataManager.Instance.gameId + "&key=abcd123321efgh"),
        signDay: 0
    }

    http.open(DataManager.getURL("GET_AD_AWARD"), params, (res) => {
        if (res) {
            if (res.ret == 0) {
                success && success(res)
            } else if (res.ret == -4) {
                checkPhoneBinding()
            } else {
                iMessageBox(res.msg)
            }
        }
    })
}

// shareData 参数和 socialShare 方法参数一致 callback会被覆盖
export function receiveAdAward(adIndex, success: (res) => void = null, shareData: any = null, showAward: boolean = true, method?: number, needRequest: boolean = true, fail: (res) => void = null) {
    const adTag = "广告奖励" + adIndex
    // czcEvent("大厅", adTag, "点击领取 " + DataManager.Instance.userTag)
    if (checkAdCanReceive(adIndex)) {
        if (method == null) {
            method = getNextAdMethod(adIndex)
        }
        const typeDesc = method == 0 ? "免费" : method == 1 ? "分享" : "视频"
        const request = (succ: boolean = true) => {
            if (!succ) {
                fail(succ)
                return
            }
            // czcEvent("大厅", adTag, typeDesc + "条件完成 " + DataManager.Instance.userTag)
            requestAdAward(adIndex, (res) => {
                console.log("jin---requestAdAward: ", res)
                if (!needRequest) {
                    success && success({ succ: true })
                    return
                }

                // czcEvent("大厅", adTag, typeDesc + "领取成功 " + DataManager.Instance.userTag)
                if (DataManager.CommonData.AdConfig && DataManager.CommonData.AdConfig[adIndex]) {
                    DataManager.CommonData.AdConfig[adIndex].count++
                }

                if (showAward) {
                    let awards = []
                    if (res.itemIndex != null && res.itemNum != null) {
                        awards.push({ index: res.itemIndex, num: res.itemNum })
                    } else if (adIndex == AdsConfig.taskAdsMap.Wages) {
                        const lv = DataManager.CommonData["VipData"] ? (DataManager.CommonData["VipData"].vipLevel || 0) : 0
                        if (DataManager.CommonData.VipAwardConfig && DataManager.CommonData.VipAwardConfig[lv]) {
                            for (const award of DataManager.CommonData.VipAwardConfig[lv]) {
                                awards.push(award)
                            }
                        }
                    } else if (res.awards) {
                        awards = res.awards
                    } else if (res.awardList) { // 此处可兼容发放多道具 AdsConfig.taskAdsMap.Wages可修改为此处
                        for (const a of res.awardList) {
                            awards.push({ index: a.ca_award_index, num: a.ca_award_num })
                        }
                    }

                    if (res.vipExp != null && res.vipExp > 0) {
                        awards.push({ index: 374, num: res.vipExp })
                    }
                    console.log("jin---requestAdAward: ", awards)
                    if (awards.length > 0) {
                        showAwardResultPop(awards, { isFromDailyGift: adIndex == AdsConfig.taskAdsMap.New_DailyGift })
                    }
                }

                sendReloadUserData()
                // loadAdConfig()

                success && success(res)
                SceneManager.Instance.sendMessageToScene({ opcode: "onAdConfigUpdate", adIndex: adIndex })
            })
        }

        // czcEvent("大厅", adTag, typeDesc + "领取 " + DataManager.Instance.userTag)

        if (method == 0) {
            request()
        } else if (method == 1) {
            const data = shareData || {}
            data.callback = () => { request() }
            socialShare(data)
        } else {
            playAD(adIndex, request, fail)
        }
    } else if (showAward) {
        iMessageBox("您今日的奖励次数已用完，请明天再来！")
    }
}

export function getReliefState(type = 0) {
    let message = {
        opcode: "proto_cl_check_relief_status_req",
        type: type
    }
    console.log("jin---福利中心，破产3：",)
    NetManager.Instance.send("lobby", message)
}

export function sendReloadUserData() {
    let socketMsg = {
        opcode: "proto_cl_reload_user_data_req"
    };
    NetManager.Instance.send("lobby", socketMsg)
}

export function getPlayerStatusReq(players: any[]) {
    let message = {
        opcode: "proto_cl_get_ply_status_req",
        players: players
    };
    NetManager.Instance.send("lobby", message)
}

export function getServerList(gameList: number[] = null) {
    NetManager.Instance.send("lobby", { opcode: "proto_cl_get_player_game_list_req", gameList: gameList || DataManager.Instance.getGameList() })
}

// proto_cl_get_zzyk_status_req
export function getMonthCardStatus(type = 1) {
    let socketMsg = {
        opcode: "proto_cl_get_zzyk_status_req",
        flag: type
    };
    NetManager.Instance.send("lobby", socketMsg)
}

// proto_cl_get_zzyk_award_req
export function getMonthCardAward(type = 1) {
    let socketMsg = {
        opcode: "proto_cl_get_zzyk_award_req",
        flag: type
    };
    NetManager.Instance.send("lobby", socketMsg)
}

export function exchangeAwardCheck(goods) {
    let needItemIds = goods["exchangeItemList"][0]["exchangeItem"]
    let needItemNum = goods["exchangeItemList"][0]["exchangeNum"]

    if (DataManager.UserData.getItemNum(needItemIds) < needItemNum) {
        return false
    }
    return true

}

export function exchangeAward(goodsId, callback = null, addressId = null) {
    let sign = "pn=" + DataManager.Instance.packetName + "&key=6wFKBS5y6a0B";
    sign = md5(sign)
    let param = {
        uid: DataManager.UserData.guid,
        gameid: DataManager.Instance.gameId,
        goodsId: goodsId,
        ticket: DataManager.UserData.ticket,
        pn: DataManager.Instance.packetName,
        sign: sign,
        addressId: addressId,
        app_id: "",
        open_id: DataManager.UserData.imei,
    }
    let url = DataManager.getURL("DUIHUAN")
    if (null != addressId)
        url = url + "&addressId={addressId}"

    let self = this
    http.open(url, param, function (msg) {
        if (msg && msg.ret == 0) {
            let tips = msg.msg;

            sendReloadUserData()
            iMessageBox(tips)
            callback && callback()
            getExchangeConfig()
        }
        else if (msg && msg.ret == -6)
            iMessageBox("30秒内仅可以兑换一次哦!")
        else
            iMessageBox(msg ? msg.msg : "兑换失败")
    })
}

export function check03ExchangeGoods() {
    if (DataManager.CommonData["regtime"] < 1568131200 || DataManager.CommonData["morrow"] > 7)
        return false

    if (null == DataManager.CommonData["ExchangeInfo"])
        return false

    for (let goods of DataManager.CommonData["ExchangeInfo"]) {
        if (goods.exchangeItemList[0] && goods.exchangeItemList[0].exchangeItem == 365 &&
            goods.gainItemList[0].gainItem == 332 && goods.limitCount == 1 && goods.exchangeCount == 0) {
            return true
        }
    }

    return false
}

export function getTaskList(type) {
    let socketMsg = {
        opcode: "proto_cl_get_at_achieve_list_req",
        type: type
    };
    NetManager.Instance.send("lobby", socketMsg)
}

export function getTaskAward(gameId, index, double?: boolean) {

    let getTaskAwardFinalCallback = () => {
        let socketMsg = {
            opcode: "proto_cl_get_at_achieve_award_req",
            gameId: gameId,
            index: index,
            type: double ? 1 : 0,
        }
        NetManager.Instance.send("lobby", socketMsg)
    }

    getTaskAwardFinalCallback()
}

export function getFlyBackAward(flag, callback: (msg) => void = null) {
    let url = DataManager.getURL("GET_FLYBACK_AWARD")
    let params = {
        uid: DataManager.UserData.guid,
        flag: flag,
    };

    http.open(url, params, function (msg) {
        // if (msg && msg.ret == 0) {
        if (typeof callback == "function" && callback)
            callback(msg.ret)
        // }
    })
}

export function getMailInfo() {
    let socketMsg = {
        opcode: "proto_cl_get_mail_info_req",
        plyId: DataManager.UserData.guid,
        gameId: DataManager.Instance.gameId
    }
    NetManager.Instance.send("lobby", socketMsg)
}

export function getMailAwardInfo(awardId, callback: (msg) => void = null) {
    let url = DataManager.getURL("LOAD_MAIL_TEMPLATE_AWARD")
    let params = {
        uid: DataManager.UserData.guid,
        ticket: DataManager.UserData.ticket,
        awardId: awardId
    };

    let self = this
    http.open(url, params, function (msg) {
        if (null == msg)
            return

        callback && callback(msg)
    })
}

export function getMailAward(mailId, callback: (msg) => void = null) {
    let url = DataManager.getURL("MODIFY_USER_MAIL_STATUS")
    let params = {
        uid: DataManager.UserData.guid,
        ticket: DataManager.UserData.ticket,
        mailid: mailId,
        gameid: DataManager.Instance.gameId,
        pn: DataManager.Instance.packetName
    };

    let self = this
    http.open(url, params, function (msg) {
        if (null == msg)
            return

        callback && callback(msg)
    })
}

export function getRedpacketRank(callback: (msg) => void = null) {
    let url = DataManager.getURL("LOAD_REDPACKET_RANK")
    let params = {
        pid: DataManager.UserData.guid,
        ticket: DataManager.UserData.ticket,
    };

    let self = this
    http.open(url, params, function (msg) {
        if (null == msg || "" == msg) {
            SceneManager.Instance.node.runAction(cc.sequence(cc.delayTime(5), cc.callFunc(() => { getRedpacketRank(callback) })))
            return
        }

        for (let dt of msg) {
            if (null != dt["todayPlyNum"])
                DataManager.CommonData["todayPlyNum"] = dt["todayPlyNum"]
        }

        if (callback)
            callback(msg)
    })
}

export function getPrivateGameDataList(time = 0) {
    let socketMsg = {
        opcode: 'proto_cl_get_private_game_data_list_req',
        time: time,
    };
    NetManager.Instance.send("lobby", socketMsg)
}

export function loadTomorrowConfig(callback: () => void = null) {
    let url = DataManager.getURL("LOAD_TOMORROW_GIFT")
    let param = {
        gameid: 0
    }

    http.open(url, param, (res) => {
        if (res && res.ret == 0) {
            DataManager.CommonData["TomorrowData"] = res.list
            callback && callback()
        }
    })
}

export function loadTomorrowStatus(callback: () => void = null) {
    let url = DataManager.getURL("ACTIVE_ONCE_SIGN_INFO")
    let param = {
        uid: DataManager.UserData.guid,
        gameid: 0,
        ticket: DataManager.UserData.ticket
    }

    http.open(url, param, (res) => {
        if (res) {
            if (!res.tomorrowAward) {
                res.tomorrowAward = []
            }
            DataManager.CommonData["TomorrowStatus"] = res
            callback && callback()
        }
    })
}

export function loadGameExchangeRecrod(callback: (records) => void) {
    const params = {
        uid: DataManager.UserData.guid,
        ticket: DataManager.UserData.ticket,
        pn: DataManager.Instance.packetName,
        gameid: DataManager.Instance.gameId,
        pageNow: 1,
        pageSize: 10,
        isAd: 1
    }

    http.open(DataManager.getURL("DUIHUANRECORD"), params, (res) => {
        if (res && res.list) {
            const uids = {}
            for (const data of res.list) {
                uids[data.uid] = 1
            }

            const array = Object.keys(uids)
            if (array.length == 0) {
                return
            }

            UserExtends.getUserInfos(array, infos => {
                const t = {}
                infos.forEach(info => t[info.uid] = info)

                const records = []
                for (const data of res.list) {
                    const user = t[data.uid]
                    let name = user ? user.nickname : "游戏用户"
                    if (name.length > 5) {
                        name = name.substring(0, 5) + "..."
                    }
                    records.push({ name: name, award: data.goodsName })
                }
                callback(records)
            })
        }
    })
}

export function trans2format(num: number) {
    let s = num.toString()
    let idx = s.indexOf(".")
    if (idx == -1) {
        return s + ".00"
    }

    while (s.length <= idx + 2) {
        s += "0"
    }

    return s.substring(0, idx + 3)
}

export namespace Rdm {
    let _seed = Date.now()

    export function seed(sd: number) {
        _seed = sd
    }

    export function random() {
        _seed = (_seed * 9301 + 49297) % 233280
        return _seed / (233280.0)
    }
}

export function randomArea(uid?) {
    if (uid != null) {
        return areas[parseInt(uid) % areas.length]
    }
    return areas[Math.floor(Rdm.random() * areas.length)]
}

export function randomName(maxlen?: number) {
    const name = nicknames[Math.floor(Rdm.random() * nicknames.length)]
    if (maxlen != null && name.length > maxlen) {
        return name.substring(0, maxlen) + "..."
    }
    return name
}

export function isShowPayPage() {
    // console.log("jin---isShowPayPage：", DataManager.Instance.onlineParam.round_pay_ios, DataManager.CommonData["roleCfg"]["roundSum"])
    if (cc.sys.os == cc.sys.OS_IOS) {
        if (!isShowNewVersionContent()) {
            return false
        }
        return DataManager.Instance.onlineParam.round_pay_ios <= DataManager.CommonData["roleCfg"]["roundSum"] && DataManager.Instance.onlineParam.isShowShop_ios === 1
    } else {
        return DataManager.Instance.onlineParam.isShowShop_android === 1
    }
}

export function isShowNewVersionContent() {
    if (DataManager.Instance.onlineParam.isShowNewVersionContent === DataManager.Instance.version) {
        return true
    } else {
        return false
    }
}

export function isShowTimeLimitPop() {
    //1.是否有礼包配置 2.时间
    // console.log("jin---isShowTimeLimitPop");

    if (!checkTimeLimitBox()) return false
    let time = TimeFormat("yyyy-mm-dd");

    let time8 = new Date((time + " 08:00:00").replace(/-/g, '/')).getTime()
    let time12 = new Date((time + " 12:00:00").replace(/-/g, '/')).getTime()
    let time17 = new Date((time + " 17:00:00").replace(/-/g, '/')).getTime()
    let time23 = new Date((time + " 23:00:00").replace(/-/g, '/')).getTime()

    var timestamp = (new Date()).valueOf()
    // console.log("jin---", "8qian", time8, time12, time17, time23, timestamp)
    if (time8 > timestamp) {
        //不显示
        // console.log("jin---", "8qian")
        return false
    } else if (time8 < timestamp && time12 > timestamp) {
        //0 奖励是否购买
        console.log("jin---", "0")
        return true
    } else if (time12 < timestamp && time17 > timestamp) {
        //1
        console.log("jin---", "1")
        return true
    } else if (time17 < timestamp && time23 > timestamp) {
        //2
        console.log("jin---", "2")
        return true
    } else {
        //不显示
        console.log("jin---", "23hou")
        return false
    }

}

export function isShowFriendHelp() {

    let time = TimeFormat("yyyy-mm-dd");
    let time8 = new Date((time + " 08:00:00").replace(/-/g, '/')).getTime()
    let time22 = new Date((time + " 22:00:00").replace(/-/g, '/')).getTime()

    var timestamp = (new Date()).valueOf()
    if (time8 > timestamp || time22 < timestamp) {
        //不显示
        return false
    }
    console.log("jin---isShowFriendHelp: ", DataManager.load(DataManager.UserData.guid + "FriendHelpTime" + TimeFormat("yyyy-mm-dd")), checkAdCanReceive(AdsConfig.taskAdsMap.InviteWxFriend))
    if (DataManager.load(DataManager.UserData.guid + "FriendHelpTime" + TimeFormat("yyyy-mm-dd")) == -1) {
        return false
    }

    if (!checkAdCanReceive(AdsConfig.taskAdsMap.InviteWxFriend)) {
        return false
    }
    if (!DataManager.Instance.onlineParam.isShowInvitePop) {
        return false
    }
    if (!(DataManager.load(DataManager.UserData.guid + "FriendHelpTime" + TimeFormat("yyyy-mm-dd")))) {
        return true
    }


    return true
}


export function isShowSuperWelfare() {
    if (!isShowPayPage()) {
        return false
    }

    if (DataManager.CommonData["roleCfg"]["roundSum"] <= 10) {
        return false
    }

    if (!DataManager.Instance.onlineParam.isShowSuperWelfare) {
        return false
    }

    let superWelfare_1 = DataManager.load(DataManager.UserData.guid + "superWelfare_1" + TimeFormat("yyyy-mm-dd"))
    if (!superWelfare_1) {
        return false
    }

    return true
}

export function isOpenHandKuang() {
    DataManager.Instance.onlineParam.carnivalActive
    let startTime = DataManager.Instance.onlineParam.carnivalActive.start//1672156800//  27日 1672070400               start 2022年12月28日 00:00:00 1672156800
    let endTime = DataManager.Instance.onlineParam.carnivalActive.end//1672761600//end 2023年1月4日 00:00:00
    console.log("jin---startTime: ", startTime, endTime)
    let curentTime = getNowTimeUnix()
    return curentTime > startTime && curentTime < endTime
}

export function remindNationalDay(gameid: number = DataManager.Instance.gameId) {
    let lastSignTime = 0
    let repeatTime = 0
    let lastSignDay = 0
    let sta_Activity = false
    let url = DataManager.getURL("ACTIVE_SIGN_INFO")
    let param = {
        uid: DataManager.UserData.guid,
        gameid: gameid,
        ticket: DataManager.UserData.ticket
    }

    let getSignInfo = (msg_signConfig) => {
        http.open(url, param, function (msg) {
            console.log("jin---getSignInfo: ", url, param, msg)
            // if (msg && msg.ret == 0) {
            // DataManager.CommonData["nationalSignData"] = msg.list
            lastSignTime = msg.list ? msg.list[0].signTime : 0
            repeatTime = msg.list ? msg.list[0].signRepeatTime : 0
            lastSignDay = msg.list ? msg.list[0].signDay : 0
            let now = getNowTimeUnix()
            let todaySign = now - now % 86400
            let alreadySign = todaySign < lastSignTime
            if (gameid == 3) {//连续充值
                rechangeInfo((msg_rechangeInfo) => {
                    if (repeatTime === 1) {
                        sta_Activity = false
                    } else {
                        for (let curData of msg_signConfig.list) {
                            let sta_get = !alreadySign && curData.signDay == lastSignDay + 1 && msg_rechangeInfo.todayPayTotal > 0
                            // cc.log("jin---initSignInfo111: ",curData, sta_get, msg_rechangeInfo) 
                            if (sta_get) {
                                sta_Activity = true
                            }
                        }
                    }
                    SceneManager.Instance.sendMessageToScene({ opcode: "updateActivity", isShow: sta_Activity, item_name: "充值福利" })
                })
            } else {//登录奖励
                if (repeatTime === 1) {
                    sta_Activity = false
                } else {
                    for (let curData of msg_signConfig.list) {
                        let sta_get = !alreadySign && curData.signDay == lastSignDay + 1
                        // cc.log("jin---initSignInfo222: ",curData, sta_get) 
                        if (sta_get) {
                            sta_Activity = true
                        }
                    }
                }
                SceneManager.Instance.sendMessageToScene({ opcode: "updateActivity", isShow: sta_Activity, item_name: "登录奖励" })
            }
        })
    }

    let rechangeInfo = (callback) => {
        let flag: number = 0
        let url = DataManager.getURL("PAY_TOTAL")
        let params = {
            pid: DataManager.UserData.guid,
            ticket: DataManager.UserData.ticket,
            flag: flag
        };

        let self = this
        http.open(url, params, function (msg) {
            console.log(url)
            console.log("jin---getSelfPayTotal: ", url, params, msg)
            if (msg) {
                this._totalPay = msg
                callback && callback(msg)
            }
        })

    }


    let url_SignConfig = DataManager.getURL("ACTIVE_SIGN_CONFIG")
    let param_SignConfig = {
        gameid: DataManager.Instance.gameId
    }

    http.open(url_SignConfig, param_SignConfig, function (msg) {
        console.log("jin---getSignConfig: ", url_SignConfig, param_SignConfig, msg)

        if (msg && msg.ret == 0) {
            DataManager.CommonData["nationalSign"] = msg.list
            console.log("jin---nationalDay: ", msg)
            getSignInfo(msg)
        }
    })
}

export function remindEggActivity() {
    console.log("jin---remindNationalDay: ", typeof DataManager.UserData.getItemNum(ITEM.CARNAIVAL_TICKET))
    SceneManager.Instance.sendMessageToScene({ opcode: "updateActivity", isShow: DataManager.UserData.getItemNum(ITEM.CARNAIVAL_TICKET) > 0, item_name: "新春抽豪礼" })
}