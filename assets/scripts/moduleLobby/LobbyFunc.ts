import DataManager from "../base/baseData/DataManager";
import BaseFunc = require("../base/BaseFunc")
import md5 = require("../base/extensions/md5.min")
import { iMessageBox, checkPhoneBinding, MsgBox, showAwardResultPop, czcEvent, playAD, qttReportGameNums } from "../base/BaseFuncTs";
import NetManager from "../base/baseNet/NetManager";
import SceneManager from "../base/baseScene/SceneManager";
import { AdsConfig } from "../base/baseData/AdsConfig";

export function getVipConfig(callback: () => void = null) {
    if (null != DataManager.CommonData["VipInfo"]) {
        callback()
        return
    }
    let url = DataManager.getURL("VIPCONFIG")
    let params = {
        gameid: DataManager.Instance.gameId,
        pn: DataManager.Instance.packetName,
    }
    BaseFunc.HTTPGetRequest(url, params, (msg) => {
        if (msg && msg.ret == 0){
            DataManager.CommonData["VipInfo"] = msg.list
            if (null != callback)
                callback()
        }
    })
}

export function getExchangeConfig(callback: () => void = null) {
    czcEvent("大厅", "兑换红包", "获取红包配置 " + (DataManager.CommonData["morrow"] <= 1 ? DataManager.CommonData["morrow"] + "天新用户" : "老用户"))
    // console.log("getExchangeConfig")
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
        if (DataManager.Instance.isTesting)
            console.log(msg)
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
    console.log("start getNewUserSignAward")
    let url = DataManager.getURL("LOAD_NEW_REGISTER")

    let param = {
        uid: DataManager.UserData.guid,
        pn: DataManager.Instance.packetName, 
        gameid: 389,//DataManager.Instance.gameId,
        ticket: DataManager.UserData.ticket
    }
    console.log("url = " + url)
    console.log(param)
    BaseFunc.HTTPGetRequest(url, param, function(msg) { 
        console.log("get response getNewUserSignAward")
        console.log(msg)
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
        if (DataManager.Instance.isTesting)
            console.log(msg)
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

export function getMobileState(callback: () => void = null) {
    let url = DataManager.getURL("MOBILE_STATUS")
    let params = {
        pn: DataManager.Instance.packetName,
        pid: DataManager.UserData.guid,
        ticket: DataManager.UserData.ticket,
        version: DataManager.Instance.version
    }

    BaseFunc.HTTPGetRequest(url, params, function(msg) {
        if (DataManager.Instance.isTesting)
            console.log(msg)
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

export function getADConfig(callback: () => void = null) {
    let url = DataManager.getURL("AD_CONFIG")
    let param = {
        pid: DataManager.UserData.guid,
        ticket: DataManager.UserData.ticket
    }

    BaseFunc.HTTPGetRequest(url, param, function(msg){
        if (DataManager.Instance.isTesting)
            console.log(url)
        if (null != msg) {
            if (null == msg.adConfig)
                return

            DataManager.CommonData["adConfig"] = msg.adConfig
            DataManager.CommonData["adCnt"] = msg.adCnt
            if (null == DataManager.CommonData["adCnt"] || "" == DataManager.CommonData["adCnt"])
                DataManager.CommonData["adCnt"] = []

            DataManager.CommonData["adNum"] = []
            for (const iterator of DataManager.CommonData["adConfig"]) {
                DataManager.CommonData["adNum"][iterator["ca_ad_area"]] = DataManager.CommonData["adNum"][iterator["ca_ad_area"]] || []
                DataManager.CommonData["adNum"][iterator["ca_ad_area"]].allNum = null != iterator["award"] && null != iterator["award"][0] && iterator["award"][0]["ca_award_num"]    
                DataManager.CommonData["adNum"][iterator["ca_ad_area"]].countNum = 0        
            }

            for (const iterator of DataManager.CommonData["adCnt"]) {            
                DataManager.CommonData["adNum"][iterator["ua_ad_area_id"]].countNum = iterator["ua_ad_times"]
            }
                
            if (null != callback)
                callback()

            SceneManager.Instance.sendMessageToScene("updateAdConfig")
        }
    })
}

export function checkADNum(typeNum) {
    if (null == DataManager.CommonData["adNum"] || null == DataManager.CommonData["adNum"][typeNum])
        return false

    let canAd = DataManager.CommonData["adNum"][typeNum].allNum > DataManager.CommonData["adNum"][typeNum].countNum
    if (typeNum == 16)
        canAd = DataManager.CommonData["adNum"][typeNum].countNum === 0
    return canAd
}

export function getADAward(taskInd, succ: (msg) => void = null, fail: (msg) => void = null, signDay:number = 0, ) {
    let url = DataManager.getURL("GET_AD_AWARD")
    let sign = "pid=" + DataManager.UserData.guid + "&gameid="+  DataManager.Instance.gameId +"&key=abcd123321efgh"
    sign = md5(sign)

    let params = {
        pid: DataManager.UserData.guid,
        ticket: DataManager.UserData.ticket,
        gameid: DataManager.Instance.gameId,
        taskInd: taskInd,
        sign: sign,
        signDay: signDay,
    };

    BaseFunc.HTTPGetRequest(url, params, function(msg) {
        if (msg) {
            if (msg.ret == 0) {
                DataManager.CommonData["adNum"][taskInd].countNum ++ 
                if (null != succ)
                    succ(msg)
                return
            }
            else if (msg.ret == -4) {
                checkPhoneBinding()
            }
            else{
                iMessageBox(msg.msg)
                if (null != fail)
                    fail()
            }
        }
    }) 
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

export function exchangeQttCoin(noTip:boolean = false) {
    // let coin = DataManager.UserData.getItemNum(367)
    // if (coin <= 0){
    //     iMessageBox("您还没有金币，可通过签到，抽奖来获得!")
    //     return 
    // }

    let submitFunc = function() {
        let param = {
            gameid: DataManager.Instance.gameId, 
            uid: DataManager.UserData.guid, 
            ticket: DataManager.UserData.ticket,
            pn: DataManager.Instance.packetName, 
            app_id: DataManager.Instance.QTT_APPID, 
            open_id: DataManager.load("user_guest_openid")
        };
        let url = DataManager.getURL("QTT_COIN")
        // let qttCount = DataManager.UserData.getItemNum(367)
        BaseFunc.HTTPGetRequest(url, param, function(msg) { 
            if (msg && msg.ret == 0) {
                // czcEvent("大厅", "兑换趣金币3", "领取成功 " + (DataManager.CommonData["morrow"] <= 1 ? DataManager.CommonData["morrow"] + "天新用户" : "老用户"))
                // let awards = []
                // awards[0] = {index: 367, num: qttCount}
                // showAwardResultPop(awards, {isQttPickup: true})
                sendReloadUserData()

                // DataManager.save(DataManager.UserData.guid + "qttTip", true)
            }
            else{
                // czcEvent("大厅", "兑换趣金币3", "领取失败 " + (DataManager.CommonData["morrow"] <= 1 ? DataManager.CommonData["morrow"] + "天新用户" : "老用户"))
                // iMessageBox("提取失败，请等待一段时间后再试!")
            }
        })
    }

    if (noTip) {
        submitFunc()
    }
    else{
        let initParam = {
            title: "提示",
            content: "提取后金币将直接到您的趣头条账户，是否提取?",
            confirmClose: true,
            confirmFunc: () => {
                czcEvent("大厅", "兑换趣金币2", "确认领取 " + (DataManager.CommonData["morrow"] <= 1 ? DataManager.CommonData["morrow"] + "天新用户" : "老用户"))
                submitFunc()
            },
            maskCanClose: false,
        }

        MsgBox(initParam)
    }
}

export function exchangeAwardCheck(goods) {
    let needItemIds = goods["exchangeItemList"][0]["exchangeItem"]
    let needItemNum = goods["exchangeItemList"][0]["exchangeNum"]

    if(DataManager.UserData.getItemNum(needItemIds) < needItemNum) {
        return false
    }
    return true
    
}

export function exchangeAward(goodsId, callback, addressId: number = null) {
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
        app_id: DataManager.Instance.QTT_APPID,
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
            // SceneManager.Instance.popScene("moduleLobby", "ExchangeSuccPop")
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

export function getTaskAward(gameId, index) {
    
    let getTaskAwardFinalCallback = () => {
        let socketMsg = {
            opcode: "proto_cl_get_at_achieve_award_req",
            gameId: gameId,
            index: index
        }
        NetManager.Instance.send("lobby", socketMsg)
    }
    
    if (typeof(AdsConfig.taskAdsMap[index]) != "undefined" && AdsConfig.taskAdsMap[index] != -1) {
        playAD(AdsConfig.video["task_" + index], () => {
            getADAward(AdsConfig.taskAdsMap[index], () => {            
                getTaskAwardFinalCallback()
            })
        })
    }else{
        getTaskAwardFinalCallback()
    }
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

            if (null != dt["wonPlyNum"])
                qttReportGameNums(dt["wonPlyNum"])
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

export function getADDraw(adNum, callback:() => void = null) {
    let adName = AdsConfig.getAdName(adNum)
    let adsReason = AdsConfig.getAdVideo(adNum)

    czcEvent("大厅", "领取" + adName + "1", "点击领取 " + (DataManager.CommonData["morrow"] <= 1 ? DataManager.CommonData["morrow"] + "天新用户" : "老用户"))
    let self = this
    let getAward = function() {
        if (checkADNum(adNum)) {
            czcEvent("大厅", "领取" + adName + "2", "播放广告 " + (DataManager.CommonData["morrow"] <= 1 ? DataManager.CommonData["morrow"] + "天新用户" : "老用户"))
            playAD(adsReason, () => {
                czcEvent("大厅", "领取" + adName + "3", "看完广告 " + (DataManager.CommonData["morrow"] <= 1 ? DataManager.CommonData["morrow"] + "天新用户" : "老用户"))

                getADAward(adNum, (msg) => {  
                    czcEvent("大厅", "领取" + adName + "4", "获取奖励 " + (DataManager.CommonData["morrow"] <= 1 ? DataManager.CommonData["morrow"] + "天新用户" : "老用户"))
                    // if (adNum == 5) {
                    //     showTokenGrowPop(30) 
                    // }
                    // else if (adNum == 6) {
                    //     let awards = [
                    //         {
                    //             index: 0,
                    //             num: 1000,
                    //         }
                    //     ]
                    //     showAwardResultPop(awards)
                    // }
                    // else if (adNum == 11) {
                    //     let awards = [
                    //         {index: 2, num: 1},
                    //     ]
                        
                    //     // showAwardMutipleResultPop(awards)
                    //     showAwardResultPop(awards)
                    // }
                    let awards = []
                    if (null != msg.itemIndex && null != msg.itemNum) {
                        awards.push({index: msg.itemIndex, num: msg.itemNum})
                    }
                    else if (adNum == AdsConfig.taskAdsMap.Wages) {
                        if (!DataManager.CommonData["adConfig"])
                            return
                        for (let val of DataManager.CommonData["adConfig"]) {
                            if (val.ca_award_id === AdsConfig.taskAdsMap.Wages) {
                                let ac = val.award
                                let viplv = DataManager.CommonData["VipData"].vipLevel || 0
                                for (let a of ac) {                                    
                                    if (a.ca_sequence === viplv) {
                                        awards.push({index: a.ca_award_index, num: a.ca_award_num})
                                    }
                                }
                            }
                        }
                    }
                    else if (msg.awards) {
                        awards = msg.awards
                    }
                    if (!!msg.vipExp && msg.vipExp > 0) {
                        awards.push({index: 374, num: msg.vipExp})
                    }
                    if (awards.length > 0) {
                        showAwardResultPop(awards)
                    }
                    sendReloadUserData()
                    getADConfig()
                    if (callback)
                        callback()
                })        
            })                
        }
        else {
            iMessageBox("您今日的" + adName + "次数已用完，请明天再来！")
        }
    }

    if (null == DataManager.CommonData["adConfig"]) {
        getADConfig(() => {
            getAward()
        })
        return 
    }

    getAward()
}