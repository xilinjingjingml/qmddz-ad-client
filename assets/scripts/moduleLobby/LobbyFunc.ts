import { AdsConfig } from "../base/baseData/AdsConfig";
import DataManager from "../base/baseData/DataManager";
import { checkPhoneBinding, czcEvent, iMessageBox, playAD, showAwardResultPop, socialShare } from "../base/BaseFuncTs";
import NetManager from "../base/baseNet/NetManager";
import SceneManager from "../base/baseScene/SceneManager";
import BaseFunc = require("../base/BaseFunc")
import md5 = require("../base/extensions/md5.min")

export function getVipConfig(callback: () => void = null) {
    if (DataManager.CommonData["VipInfo"]) {
        callback && callback()
        return
    }

    const params = {
        gameid: DataManager.Instance.gameId,
        pn: DataManager.Instance.packetName,
    }

    BaseFunc.HTTPGetRequest(DataManager.getURL("VIPCONFIG"), params, (res) => {
        if (res && res.ret == 0) {
            DataManager.CommonData["VipInfo"] = res.list
            callback && callback()
        }
    })
}

export function getExchangeConfig(callback: () => void = null) {
    czcEvent("大厅", "兑换红包", "获取红包配置 " + DataManager.Instance.userTag)
    let url = DataManager.getURL("DUIHUANCONFIG")
    let sign = "pn=" + DataManager.Instance.packetName + "&key=6wFKBS5y6a0B"
    sign = md5(sign)
    let params = {
        pn: DataManager.Instance.packetName,
        sign: sign,
        uid: DataManager.UserData.guid,
        ticket: DataManager.UserData.ticket,
        gameid: DataManager.Instance.gameId
    }

    BaseFunc.HTTPGetRequest(url, params, function(msg) {
        cc.log(msg)
        if (msg.ret == 0) {
            DataManager.CommonData["ExchangeInfo"] = msg.list
            DataManager.CommonData["ExchangeInfo"].sort((a, b) => a["limitVip"] < b["limitVip"] ? -1 : 
                                        (a["limitVip"] > b["limitVip"] ? 1 : 
                                            (a["gainItemList"][0]["gainItem"] == 0 ? -1 : 
                                                (a["gainItemList"][0]["gainItem"] != 0 ? 1 : 
                                                    (a["gainItemList"][0]["exchangeNum"] < a["gainItemList"][0]["exchangeNum"] ? -1 : 
                                                        (a["gainItemList"][0]["exchangeNum"] > a["gainItemList"][0]["exchangeNum"] ? 1 : 0
                                            ))))))
            if (null != callback)
                callback()

            SceneManager.Instance.sendMessageToScene("updateExchangeInfo")
        }           
    }) 
}

export function getNewUserSignAward (callback: () => void = null) {
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
    BaseFunc.HTTPGetRequest(url, param, function(msg) { 
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

    BaseFunc.HTTPGetRequest(url, param, function(msg) { 
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

    BaseFunc.HTTPGetRequest(url, param, function(msg) { 
        if (msg && null != callback) {
            callback(msg)
        }
    })
}

export function loadLotteryData(callback: () => void = null) {
    if (DataManager.CommonData["lotteryData"]) {
        callback && callback()
        return
    }

    const param = {
        gameid: DataManager.Instance.gameId,
        channel: 2,
        activityId: 10000 + DataManager.Instance.gameId,
        uid: DataManager.UserData.guid,
        sign: md5("uid=" + DataManager.UserData.guid + "&key=8923mjcm0d089d"),
        pn: DataManager.Instance.packetName,
        taskid: 2
    }

    BaseFunc.HTTPGetRequest(DataManager.getURL("DIAL"), param, (res) => {
        if (res && (res.list || (res[0] && res[0].list))) {
            const data = res.list || res[0].list
            data.sort((a, b) => {
                return a.acAutoId - b.acAutoId
            })

            DataManager.CommonData["lotteryData"] = data
            callback && callback()
        }
    })
}

export function getLotteryAward(callback: (res) => void) {
    const param = {
        gameid: DataManager.Instance.gameId,
        channel: 2,
        activityId: 10000 + DataManager.Instance.gameId,
        uid: DataManager.UserData.guid,
        sign: md5("uid=" + DataManager.UserData.guid + "&key=8923mjcm0d089d"),
        pn: DataManager.Instance.packetName,
        taskid: 2,
        pnum: 1
    }

    BaseFunc.HTTPGetRequest(DataManager.getURL("DARW_DIAL"), param, (res) => {
        callback(res)
    })
}

export function loadLotteryRecord(callback: (records) => void) {
    const param = {
        uid: DataManager.UserData.guid,
        ticket: DataManager.UserData.ticket
    }

    BaseFunc.HTTPGetRequest(DataManager.getURL("DARW_RECORD"), param, (res) => {
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

    BaseFunc.HTTPGetRequest(url, params, function(msg) {
        cc.log(msg)
        DataManager.CommonData["bindPhone"] = []
        if (null != msg){        
            DataManager.CommonData["bindPhone"].hasBindMoble = msg.ret
            DataManager.CommonData["bindPhone"].BindPhone = msg.phone         
        }
        
        if (null != callback)
            callback()
    }) 
}

export function getMobileCode(phone, flag, callback: (msg) => void = null) {
    let url = DataManager.getURL("MOBILE_CODE_GET")
    let sign = "pid=" + DataManager.UserData.guid + "&ticket=" + DataManager.UserData.ticket + 
        "&pn=" + DataManager.Instance.packetName + "&version=1&phone=" + phone + "&flag=" + flag + "&key=fas342wrff4t32dfg534g432"
    sign = md5(sign)

    let params = {
        pid: DataManager.UserData.guid,
        ticket: DataManager.UserData.ticket,
        pn: DataManager.Instance.packetName,
        version: 1,
        phone: phone,
        flag: flag,
        sign: sign,
    };

    BaseFunc.HTTPGetRequest(url, params, function(msg) {
        if (typeof callback == "function")
            callback(msg)
    }) 
}

export function loadAdConfig(callback: () => void = null) {
    const param = {
        pid: DataManager.UserData.guid,
        ticket: DataManager.UserData.ticket
    }

    BaseFunc.HTTPGetRequest(DataManager.getURL("AD_CONFIG"), param, (res) => {
        if (res && res.adConfig) {
            const config = {}

            for (const cfg of res.adConfig) {
                const adIndex = cfg.ca_ad_area
                let total = cfg.award && cfg.award[0] ? cfg.award[0].ca_award_num : 0

                if (adIndex == AdsConfig.taskAdsMap.Wages || adIndex == AdsConfig.taskAdsMap.SignPop) {
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

                config[adIndex] = { total: total, count: 0, extra: 2 }
            }

            for (const itr of res.adCnt || []) {
                if (config[itr.ua_ad_area_id]) {
                    config[itr.ua_ad_area_id].count = itr.ua_ad_times
                }
            }

            if (DataManager.Instance.onlineParam.adExtraConfig) {
                const extra = DataManager.Instance.onlineParam.adExtraConfig
                for (const index in extra) {
                    config[index] && (config[index].extra = extra[index])
                }
            }

            DataManager.CommonData.AdConfig = config

            callback && callback()
            SceneManager.Instance.sendMessageToScene("onAdConfigUpdate")
        }
    })
}

export function getAdData(adIndex) {
    if (DataManager.CommonData.AdConfig) {
        return DataManager.CommonData.AdConfig[adIndex] || null
    }
    return null
}

export function checkAdCanReceive(adIndex) {
    const data = getAdData(adIndex)
    return data ? data.total > data.count : false
}

export function getAdTotalTimes(adIndex) {
    const data = getAdData(adIndex)
    return data ? data.total : 0
}

export function getAdLeftTimes(adIndex) {
    const data = getAdData(adIndex)
    return data && data.total > data.count ? data.total - data.count : 0
}

// 0:免费领取 1:分享领取 2:视频领取
export function getNextAdType(adIndex) {
    const data = getAdData(adIndex)
    if (data) {
        const type = Array.isArray(data.extra) ? data.extra[data.count] : data.extra

        if (type == 0) {
            return 0
        } else if (type == 1) {
            return 1
        } else {
            return 2
        }
    }

    return 2
}

function requestAdAward(adIndex, success: (res) => void = null) {
    const params = {
        pid: DataManager.UserData.guid,
        ticket: DataManager.UserData.ticket,
        gameid: DataManager.Instance.gameId,
        taskInd: adIndex,
        sign: md5("pid=" + DataManager.UserData.guid + "&gameid=" + DataManager.Instance.gameId + "&key=abcd123321efgh"),
        signDay: 0
    }

    BaseFunc.HTTPGetRequest(DataManager.getURL("GET_AD_AWARD"), params, (res) => {
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
export function receiveAdAward(adIndex, success: (res) => void = null, shareData: any = null, showAward: boolean = true) {
    const adTag = "广告奖励" + adIndex
    czcEvent("大厅", adTag, "点击领取 " + DataManager.Instance.userTag)
    if (checkAdCanReceive(adIndex)) {
        const type = getNextAdType(adIndex)
        const typeDesc = type == 0 ? "免费" : type == 1 ? "分享" : "视频"
        const request = () => {
            czcEvent("大厅", adTag, typeDesc + "条件完成 " + DataManager.Instance.userTag)
            requestAdAward(adIndex, (res) => {
                czcEvent("大厅", adTag, typeDesc + "领取成功 " + DataManager.Instance.userTag)
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
                    }

                    if (res.vipExp != null && res.vipExp > 0) {
                        awards.push({ index: 374, num: res.vipExp })
                    }

                    if (awards.length > 0) {
                        showAwardResultPop(awards)
                    }
                }

                // sendReloadUserData()
                // loadAdConfig()

                success && success(res)
                SceneManager.Instance.sendMessageToScene("onAdConfigUpdate")
            })
        }

        czcEvent("大厅", adTag, typeDesc + "领取 " + DataManager.Instance.userTag)

        if (type == 0) {
            request()
        } else if (type == 1) {
            const data = shareData || {}
            data.callback = () => { request() }
            socialShare(data)
        } else {
            playAD(request)
        }
    } else {
        iMessageBox("您今日的奖励次数已用完，请明天再来！")
    }
}

export function getReliefState(type = 0) {
    let message = {
        opcode: "proto_cl_check_relief_status_req",
        type: type
    }
    NetManager.Instance.send("lobby", message)
}

export function sendReloadUserData(){
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

export function getServerList(gameList:number[] = null) {
    NetManager.Instance.send("lobby", {opcode: "proto_cl_get_player_game_list_req", gameList: gameList || DataManager.Instance.getGameList()})
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

    if(DataManager.UserData.getItemNum(needItemIds) < needItemNum) {
        return false
    }
    return true
    
}

export function exchangeAward(goodsId, callback=null, addressId = null) {
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
    BaseFunc.HTTPGetRequest(url, param, function(msg) {
        if (msg && msg.ret==0){
            let tips = msg.msg;
            
            sendReloadUserData()
            iMessageBox(tips)
            callback && callback()
            getExchangeConfig()            
        }
        else if (msg && msg.ret==-6)
            iMessageBox("30秒内仅可以兑换一次哦!")
        else
            iMessageBox(msg.msg)
    })
}

export function check03ExchangeGoods() {
    if (DataManager.CommonData["regtime"] < 1568131200 || DataManager.CommonData["morrow"] > 7)
        return false

    if (null == DataManager.CommonData["ExchangeInfo"])
        return false

    for (let goods of DataManager.CommonData["ExchangeInfo"]) {
        if (goods.exchangeItemList[0] && goods.exchangeItemList[0].exchangeItem == 365 && 
            goods.gainItemList[0].gainItem == 332 && goods.limitCount == 1 && goods.exchangeCount == 0){
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

    BaseFunc.HTTPGetRequest(url, params, function(msg) {
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
    BaseFunc.HTTPGetRequest(url, params, function(msg) {
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
    BaseFunc.HTTPGetRequest(url, params, function(msg) {
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
    BaseFunc.HTTPGetRequest(url, params, function(msg) {
        if (null == msg || "" == msg){
            SceneManager.Instance.node.runAction(cc.sequence(cc.delayTime(5), cc.callFunc(() => {getRedpacketRank(callback)})))
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

export function loadTomorrowConfig(callback:() => void = null) {
    let url = DataManager.getURL("LOAD_TOMORROW_GIFT")
    let param = {
        gameid: 0
    }

    BaseFunc.HTTPGetRequest(url, param, (res) => {
        if (res && res.ret == 0) {
            DataManager.CommonData["TomorrowData"] = res.list
            callback && callback()
        }
    })
}

export function loadTomorrowStatus(callback:() => void = null) {
    let url = DataManager.getURL("ACTIVE_ONCE_SIGN_INFO")
    let param = {
        uid: DataManager.UserData.guid,
        gameid: 0,
        ticket: DataManager.UserData.ticket
    }

    BaseFunc.HTTPGetRequest(url, param, (res) => {
        if (res) {
            if (!res.tomorrowAward) {
                res.tomorrowAward = []
            }
            DataManager.CommonData["TomorrowStatus"] = res
            callback && callback()
        }
    })
}