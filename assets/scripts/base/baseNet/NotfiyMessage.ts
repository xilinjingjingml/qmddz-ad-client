import DataManager from "../baseData/DataManager";
import ItemData from "../baseData/ItemData";
import SceneManager from "../baseScene/SceneManager";
import NetManager from "./NetManager";
import { iMessageBox, showAwardResultPop, enterGame, MsgBox, showTrumpet, czcEvent, getServerByGameIdAndServerId, enterPrivateGame, gotoMatchSvr, getLeadTime, setServerTime, getUserRole, getShopBox, showCashOutNotice } from "../BaseFuncTs";
import { sendReloadUserData, getReliefState, getServerList, getMonthCardStatus, getTaskList } from "../../moduleLobby/LobbyFunc";
import { AdsConfig } from "../baseData/AdsConfig";
import { EPlatformEvent } from "../PluginManager";
import { kickout, pluginCallBack, playADBanner } from "../BaseFuncTs";
import { openShareMoney } from "../../moduleLobby/LobbyFunc";

export default class NotfiyMessage {

    serverExtParam(server) {
        server.extParam.split("|").forEach(item => {
            let param = item.split(":");
            server[param[0]] = parseFloat(param[1]) || param[1]
        })

        return server
    }

    proto_lc_verity_ticket_ack(msg) {
        msg = msg.packet
        if (msg.ret == 0){
            let plyLobbyData = msg.plyLobbyData

            DataManager.UserData.gift = plyLobbyData.gift
            DataManager.UserData.money = Math.max(plyLobbyData.money, 0)
            DataManager.UserData.score = plyLobbyData.score
            DataManager.UserData.won = plyLobbyData.won
            DataManager.UserData.lost = plyLobbyData.lost
            DataManager.UserData.money_rank = plyLobbyData.moneyRank
            DataManager.UserData.won_rank = plyLobbyData.wonRank

            DataManager.UserData.ply_state = msg.plyStatus;

            DataManager.UserData.items = msg.plyItems.map(element => new ItemData(element));

            for (const item of DataManager.UserData.items) {
                if (item.idx == 379) {
                    if (DataManager.CommonData.WeekCardExpireTime == undefined) {
                    } else if (DataManager.CommonData.WeekCardExpireTime != item.param1) {
                        getUserRole()
                    }
                    DataManager.CommonData.WeekCardExpireTime = item.param1
                } else if (item.idx == 380) {
                    if (DataManager.CommonData.MonthCardExpireTime == undefined) {
                    } else if (DataManager.CommonData.MonthCardExpireTime != item.param1) {
                        getUserRole()
                    }
                    DataManager.CommonData.MonthCardExpireTime = item.param1
                } else if (item.idx == 381) {
                    if (DataManager.CommonData.DayCardExpireTime == undefined) {
                    } else if (DataManager.CommonData.DayCardExpireTime != item.param1) {
                        getUserRole()
                    }
                    DataManager.CommonData.DayCardExpireTime = item.param1
                }
            }

            SceneManager.Instance.sendMessageToScene("updateUserData")
            DataManager.CommonData["plyStatus"] = msg.plyStatus

            let plyStatus = DataManager.CommonData["plyStatus"].plyStatus;
            if (plyStatus==2 || plyStatus==5){ // plyStatus==3 || 
                DataManager.CommonData["closeGameErr"] = 1
            }           

            // DataManager.CommonData["onlineTime"] = typeof msg.dailyOnlineTime == "undefined" ? 0 : msg.dailyOnlineTime
            // DataManager.CommonData["loginTime"] = getNowTimeUnix() - DataManager.CommonData["onlineTime"] + 10
            
            czcEvent("大厅", "登录8", "登录完成 " + DataManager.Instance.userTag)

            getServerList()

            setServerTime(msg.timeStamp)

            DataManager.CommonData["AchieveList"] = []
            DataManager.CommonData["TaskList"] = []
            getTaskList(0)
            getTaskList(1)

            getReliefState()
        }     
        else {
            let initParam = {
                title: "提示",
                content: "网络异常，请重试 ret:" + msg.ret,
                confirmFunc: () => {
                    NetManager.Instance.reconnect("lobby")
                },
                confirmClose: true,
            }                
            MsgBox(initParam)
        }
    }

    proto_lc_send_vip_data_change_not(message) {
        if (null == message.packet)
            return

        message = message.packet

        let vipData = {}
        vipData["vipLevel"] = message.vipLevel
        vipData["vipRate"] = message.vipRate
        vipData["nextVipneedMoney"] = message.nextVipneedMoney
        vipData["param"] = message.param

        DataManager.CommonData["VipData"] = vipData

        SceneManager.Instance.sendMessageToScene("updateVipInfo")
    }

    proto_lc_server_data_not2(message) {
        // if (null == message.packet)
        //     return

        // let serverDatas = []

        // for (const iterator of message.packet.serverDatas) {
        //     let gameId:number = iterator['gameId']
        //     if (null == serverDatas[gameId])
        //         serverDatas[gameId] = []

        //     serverDatas[gameId].push(iterator)
        // }

        // DataManager.CommonData["ServerDatas"] = serverDatas
        // DataManager.CommonData["ServerDatas"].forEach(items => {
        //     items.sort((a, b) => a.min_money < b.min_money ? -1 : a.min_money > b.min_money ? 1 : 0);
        //     items = items.map(element => this.serverExtParam(element));
        // })
    }

    proto_lc_send_user_data_change_not(message) {
        let msg = message.packet        
        
        let plyLobbyData = msg.plyLobbyData

        DataManager.UserData.gift = plyLobbyData.gift
        DataManager.UserData.money = Math.max(plyLobbyData.money, 0)
        DataManager.UserData.score = plyLobbyData.score
        DataManager.UserData.won = plyLobbyData.won
        DataManager.UserData.lost = plyLobbyData.lost
        DataManager.UserData.money_rank = plyLobbyData.moneyRank
        DataManager.UserData.won_rank = plyLobbyData.wonRank

        DataManager.UserData.ply_state = msg.plyStatus;

        DataManager.UserData.items = msg.plyItems.map(element => new ItemData(element));

        for (const item of DataManager.UserData.items) {
            if (item.idx == 379 && DataManager.CommonData.WeekCardExpireTime != item.param1) {
                DataManager.CommonData.WeekCardExpireTime = item.param1
                getUserRole()
            } else if (item.idx == 380 && DataManager.CommonData.MonthCardExpireTime != item.param1) {
                DataManager.CommonData.MonthCardExpireTime = item.param1
                getUserRole()
            } else if (item.idx == 381 && DataManager.CommonData.DayCardExpireTime != item.param1) {
                DataManager.CommonData.DayCardExpireTime = item.param1
                getUserRole()
                getShopBox(7)
                if (SceneManager.Instance.isSceneExist("DayCardPop")) {
                    SceneManager.Instance.closeScene("DayCardPop")
                }
            }
        }
        
        SceneManager.Instance.sendMessageToScene("updateUserData")
    }

    proto_lc_get_server_status_ack(message) {
        this.proto_lc_get_server_status_not(message)
    }

    proto_lc_get_server_status_not(message) {
        let msg = message.packet

        let serverStatus = msg.serverStatus                

        if (null == DataManager.CommonData["ServerDatas"])
            return

        let serverNum =  0;
        DataManager.CommonData["ServerDatas"].forEach(servers => servers.forEach(server => {
            serverNum++
            for (const iterator of serverStatus) {
                if (iterator.serverId == server.serverId) {
                    server.onlinePlayerNum = iterator.onlineNum
                    break;
                }
            }            
        }))

        if (serverNum < serverStatus.length)
            getServerList()
    }

    proto_bc_specify_item_update_not(message) {
        message = message.packet
        
        if (message.plyGuid == DataManager.UserData.guid){
            DataManager.UserData.setItemNum(message.index, message.num)
        }

        SceneManager.Instance.sendMessageToScene("updateUserData")
    }

    proto_lc_get_player_game_list_ack(message) {
        if (null == message.packet)
            return

        let serverDatas = []
        for (const iterator of message.packet.serverStatus) {
            let gameId:number = iterator['gameId']
            if (null == serverDatas[gameId])
                serverDatas[gameId] = []

            serverDatas[gameId].push(iterator)
        }

        DataManager.CommonData["ServerDatas"] = serverDatas
        DataManager.CommonData["ServerDatas"].forEach(items => {
            items.sort((a, b) => a.min_money < b.min_money ? -1 : a.min_money > b.min_money ? 1 : 0);
            items.forEach(element => this.serverExtParam(element))
        })
        
        if (null == DataManager.CommonData["isOnGameExit"] && DataManager.CommonData["closeGameErr"] == 1 && DataManager.CommonData["gameServer"] == null){
            DataManager.CommonData["closeGameErr"] = 0
            let gameId = DataManager.CommonData["plyStatus"].gameId
            let serverId = DataManager.CommonData["plyStatus"].gameServerId
            if (gameId && serverId){
                let server = DataManager.CommonData["ServerDatas"][gameId].filter(item => item.serverId == serverId)
                if (server[0]) {
                    enterGame(server[0])
                }    
            }
        }
            
        SceneManager.Instance.sendMessageToScene("updateServerStatus")
    }

    proto_bc_message_not(message) {
        message = message.packet
        
        if (message.type == 1) {            
            NetManager.Instance.close("lobby")
            if (null == DataManager.CommonData["gameServer"]) {
                // SceneManager.Instance.sendMessageToScene("updateServerStatus")
                let initParam = {
                    title: "提示",
                    content: "您的帐号已在其他地方登录\n是否需要重新登录？",
                    confirmClose: true,
                    buttonNum: 1,
                    confirmText: "重新登录",
                    confirmFunc: () => {
                        kickout()
                        return
                        NetManager.Instance.reconnect("lobby")
                    },
                }                
                MsgBox(initParam)
                playADBanner(false, AdsConfig.banner.All)
            }
            else{
                iMessageBox("您的帐号已在其他地方登录");
            }
        }
        else if (message.type == 0) {
            if ((message.message as string).indexOf("救济金") != -1){
                
            }
            else{
                iMessageBox(message.message,"服务器消息");
            }
        }
    }

    proto_lc_check_relief_status_ack(message){
        message = message.packet
        if (null == message)
            return

        DataManager.CommonData["reliefStatus"] = {}
        DataManager.CommonData["reliefStatus"]["reliefTimes"] = message.reliefTimesMax - message.currentRelief_2 + 1
        DataManager.CommonData["reliefStatus"]["currentRelief"] = message.currentRelief_2
        DataManager.CommonData["reliefStatus"]["ReliefTimesMax"] = message.reliefTimesMax
        DataManager.CommonData["reliefStatus"]["reliefCountdown"] = message.reliefTimes > 0 ? message.reliefTimeLeft : -1
        DataManager.CommonData["reliefStatus"]["reliefAwardCount"] = message.reliefAwardCount
        
        SceneManager.Instance.sendMessageToScene("updateReliefStatus")
    }

    proto_lc_get_relief_ack(message) {
        let packet = message.packet

        if (packet.ret == 0){
            let awards = []
            awards[0] = {
                index: 0,
                num: DataManager.CommonData["reliefStatus"]["reliefAwardCount"]
            }
            // showAwardResultPop(awards)
            // let initParam = {
            //     title: "提示",
            //     content: "成功领取" + DataManager.CommonData["reliefStatus"]["reliefAwardCount"] + "救济金，是否进行游戏",
            //     confirmClose: true,
            //     confirmFunc: () => {
            //         let server = getLowMoneyRoom(389)
            //         enterGame(server[0])
            //     },
            //     maskCanClose: false
            // }
            // MsgBox(initParam)
            SceneManager.Instance.popScene("moduleLobby", "ReliefResultPop")
            sendReloadUserData()
        }
        // else{
        //     showShopPop()
        // }

        getReliefState()
    }

    proto_lc_get_ply_status_ack(message) {
        for (let iterator of message.players) {
            if (iterator.plyGuid == DataManager.UserData.guid){
                let plyStatus = DataManager.CommonData["plyStatus"].plyStatus;
                if (plyStatus==2 || plyStatus==3 || plyStatus==5){
                    let gameId = DataManager.CommonData["plyStatus"].gameId
                    let serverId = DataManager.CommonData["plyStatus"].gemeServerId
                    if (gameId && serverId){
                        let server = DataManager.CommonData["ServerDatas"][gameId].filter(item => item.serverId == serverId)
                        if (server[0]) {
                            enterGame(server[0])
                        }    
                    }    
                }  
            }
        }
    }

    proto_lc_trumpet_not(message) {
        let msg = message.packet
        showTrumpet(msg)
    }

    proto_lc_broadcast_message_not(message) {
        let msg = message.packet
        msg.message = msg.msg
        msg.plyGuid = msg.gameId
        showTrumpet(msg)
        showCashOutNotice(msg.message)
    }

    proto_bc_login_ack(message) {
        message = message.packet
        if (message.ret == -2){
            DataManager.CommonData.lastGame = { gameId: message.plyStatus.gameId, gameServerId: message.plyStatus.gameServerId }
            return
            // let initParam = {
            //     title: "提示",
            //     content: "您尚有未完成的游戏\n\r是否继续？",
            //     confirmFunc: () => {
                    let servers = getServerByGameIdAndServerId(message.plyStatus.gameId, message.plyStatus.gameServerId)
                    if (null == servers || 0 >= servers.length)
                        return
                        
                    enterGame(servers[0], 
                        () => {
                            NetManager.Instance.node.runAction(cc.sequence(cc.delayTime(2), cc.callFunc(() => {iMessageBox("您有尚未结束的游戏")})))
                    })
            //     },
            //     cancelFunc: () => {
            //         gobackToMain({isOnGameExit: 1})
            //     },
            //     confirmClose: true,
            // }                
            // MsgBox(initParam)
        }
    }
    
    // proto_lc_get_zzyk_status_ack
    // money: 100000
    // remainingDays: 6
    // ret: -3
    // ret_ 0. 当天未领取 -1.没有购买至尊月卡 -2.已过期 -3 当天已领取
    // flag 0:老至尊月卡（10元） 1:新至尊月卡（30元）2:新至尊周卡
    proto_lc_get_zzyk_status_ack(message) {
        message = message.packet
        cc.log("proto_lc_get_zzyk_status_ack", message)
        if (!!message) {
            if(message.flag == 1) {
                DataManager.UserData.monthCardStatus[1] = message            
            }else if(message.flag == 2) {
                DataManager.UserData.monthCardStatus[0] = message
            }  
            else if (message.flag == 3) {
                DataManager.UserData.monthCardStatus[3] = message
            }
        }
        
        SceneManager.Instance.sendMessageToScene("updateMonthCardStatus")
    }

    // proto_lc_get_zzyk_award_ack
    // ret_ 0. 领取成功 -1.没有购买至尊月卡 -2.已过期 -3 当天已领取
    // money_;	//领取的金钱
    // flag_; //0:老至尊月卡（10元） 1:新至尊月卡（30元）2:新至尊周卡
    proto_lc_get_zzyk_award_ack(message) {
        message = message.packet
        cc.log("proto_lc_get_zzyk_award_ack", message)
        if (!!message) {
            if (message.ret == 0) {
                getMonthCardStatus(message.flag)
                
                let awards = [
                    {
                        index: 0,
                        num: message.money,
                    }
                ]
                showAwardResultPop(awards)

                sendReloadUserData()
            }
            
        }
    }

    proto_lc_get_at_achieve_list_ack(message) {
        message = message.packet
        
        if (message.vecItems.length > 0 && message.vecItems[0].type == 0)
            DataManager.CommonData["AchieveList"] = message.vecItems
        else if (message.vecItems.length > 0 && message.vecItems[0].type == 1)
            DataManager.CommonData["TaskList"] = message.vecItems

        SceneManager.Instance.sendMessageToScene({opcode: "updateTaskList", message: {taskList: message.vecItems}})
    }
    
    proto_lc_valid_identify_info_ack(message) {
        let noti = message.packet
        if (noti.ret == 0){
            DataManager.CommonData["roleCfg"].isBinding = 1
            SceneManager.Instance.closeScene("MsgBox")
            SceneManager.Instance.sendMessageToScene("updateUserData")
        }
    }

    proto_lc_login_online_data_not(message) {
        if (DataManager.Instance.onlineParam.fangchenmi != 1) {
            return
        }

        let noti = message.packet
        let type = 0
        if (noti.isBinding == 0) {
            if (noti.isModal == 1)
                type = 0
            else if (noti.isModal == 0)
                type = 1
        }
        else if (noti.isBinding == 1) {
            if (noti.isModal == 1)
                type = 2
            else if (noti.isModal == 0)
                type = 3
        }

        let btnCount = 2
        let confirmBtn = DataManager.Instance.getSpriteFrame("common", "btn_goto_autonym")
        let cancelBtn = DataManager.Instance.getSpriteFrame("common", "btn_close")
        let confirmClose = false

        let confirmFunc: () => void = null
        let cancelFunc: () => void = null

        if (type == 0) {
            btnCount = 2
            //confirmBtn = DataManager.Instance.getSpriteFrame("common", "btn_goto_autonym")
            cancelBtn = DataManager.Instance.getSpriteFrame("common", "btn_close_game")        
           
        }
        else if (type == 1) {
            btnCount = 2
            //confirmBtn = DataManager.Instance.getSpriteFrame("common", "btn_goto_autonym")
            //cancelBtn = DataManager.Instance.getSpriteFrame("common", "btn_close")
            // confirmFunc = () => {
            //     SceneManager.Instance.popScene("moduleLobby", "AutonymPop")
            // }      
        }
        else if (type == 2) {
            btnCount = 1
            confirmBtn = DataManager.Instance.getSpriteFrame("common", "btn_close_game")
            // confirmFunc = () => {
            //     // 关闭游戏
            //     // iMessageBox("关闭游戏")
            // }
        }
        else if (type == 3){
            btnCount = 1
            confirmBtn = "确定"
        }

        confirmFunc = () => {
            if (type == 0 || type == 1){                
                SceneManager.Instance.popScene("moduleLobby", "AutonymPop")    
            }
            else if (type == 2) {
                //关闭游戏
                // iMessageBox("关闭游戏")
                cc.game.end()
            }
        }       
        cancelFunc = () => {
            if (type == 0) {
                //关闭游戏
                // iMessageBox("关闭游戏")
                cc.game.end()
            }
        }
       
        let initParam = {
            title: "防沉迷提示",
            content: noti.message,
            buttonNum: btnCount,
            confirmClose: !(type == 0 || type == 2),
            confirmTexture: confirmBtn,
            closeTexture: cancelBtn,
            confirmFunc: confirmFunc,
            cancelFunc: cancelFunc,
            clickMaskToClose: false,
        }

        MsgBox(initParam)
    }

    PluginSocialCallBack(message: any) {
        if (!DataManager.GlobalData.shareADCallBack) {
            return
        }
        cc.log("[NotfiyMessage.PluginSocialCallBack] data", message.data)
        const data: { ShareResultCode: number, msg: string, shareResultInfo: any } = JSON.parse(message.data)
        if (data.ShareResultCode == 4) {
            return
        }

        if (data.ShareResultCode == 0) {
            const time = new Date().getTime() - DataManager.GlobalData.shareADTime
            if (time >= 3000) {
                pluginCallBack(DataManager.GlobalData.shareADCallBack)
            } else {
                iMessageBox('分享失败，请换个群试试。')
            }
        } else {
            iMessageBox(data.msg)
        }
        DataManager.GlobalData.shareADCallBack = null
    }

    PluginPlatformCallBack(message: any) {
        cc.log("[NotfiyMessage.PluginPlatformCallBack] data", message.data)
        const data: { PlatformResultCode: number, msg: string, url: any } = JSON.parse(message.data)
        if (data.PlatformResultCode == EPlatformEvent.FANGCHENMI) {
            const message: { title: string, msg: string, modal: number } = JSON.parse(data.msg)
            const parmes = {
                title: message.title,
                content: message.msg,
                buttonNum: 1,
                confirmClose: true,
                clickMaskToClose: true,
            }
            if (message.modal == 1) {
                parmes['confirmText'] = "退出游戏"
                parmes['clickMaskToClose'] = false
                parmes['confirmFunc'] = () => { cc.game.end() }
            }
            MsgBox(parmes)
        } else if (data.PlatformResultCode == EPlatformEvent.GET_OPENINSTALL_PARAMS) {
            cc.log("GET_OPENINSTALL_PARAMS", data.url)
            if (data.url == 0) {
                return
            }
            const params: { inviteCode?: string, originUid?: string, shareMoneyId?: string } = JSON.parse(data.url)
            cc.log("shareMoneyId", params.shareMoneyId)
            if (params.shareMoneyId) {
                cc.log("openShareMoney")
                openShareMoney(params.shareMoneyId, null, false)
            }
        }
    }

    proto_lc_get_private_invite_info_ack(message) {
        message = message.packet
        cc.log("InviteCodeInputPopCtrller:onSocketJoinTable()")
        let ret = message.ret

        if (ret == 0) {
            let _roomInfo = message.privateInvite;
            cc.log({ret, _roomInfo}, 5)
    
            let opt = {
                pr_tableID: _roomInfo.tableId
            }
    
            let forceOpenGPS = false
            if (_roomInfo.gameJson) {
                let gameJson = JSON.parse(_roomInfo.gameJson)
                forceOpenGPS = null != gameJson && 1 == gameJson.forceOpenGPS

                if (gameJson["settlement"].value == 0 && gameJson["money_carry"] && gameJson["money_carry"].value == 1) {
                    let already = false
                    let gameTable = DataManager.CommonData["PrivateGameData"].filter(
                        item => item.inviteCode == _roomInfo.inviteCode
                        )
                    if (gameTable && gameTable.length > 0) {
                        let player = gameTable[0].plyDatas.filter(item => item.plyGuid == DataManager.UserData.guid)
                        if (player && player.length > 0) {
                            already = true
                        }
                    }
                    if (!already) {
                        if (DataManager.UserData.money < 1000) {
                            let initParam = {
                                title: "提示",
                                confirmClose: true,
                                fontSize: 30,
                                content: "您加入的私人房金豆场最低1000准入!\n您的金豆数量不足",
                                buttonNum: 1,
                                confirmTexture: DataManager.Instance.getSpriteFrame("common", "btn_pay"),
                                confirmFunc: () => {
                                    SceneManager.Instance.popScene("moduleLobby", "ShopScene")
                                },
                            }
                            MsgBox(initParam)
                            return
                        }

                        let param = {
                            settingCallback: () => {
                                enterPrivateGame(_roomInfo.gameId, opt, _roomInfo.serverId, null, forceOpenGPS, true)
                            }
                        }
                        SceneManager.Instance.popScene("moduleLobby", "DropInPop", param)
                        return
                    }

                    enterPrivateGame(_roomInfo.gameId, opt, _roomInfo.serverId, null, forceOpenGPS, true)
                    return
                }
                
                enterPrivateGame(_roomInfo.gameId, opt, _roomInfo.serverId, null, forceOpenGPS)
            }
        }
        else {
            iMessageBox("房间已关闭或不存在!")
        }
    }
    
    proto_lc_get_private_game_data_list_ack(message) {
        message = message.packet
        DataManager.CommonData["PrivateGameData"] = message.data
    }

    proto_lc_get_match_sign_num_ack(message) {
        message = message.packet
        const match = DataManager.Instance.matchMap[message.matchTypeId]
        if (match == null) {
            return
        }
        match.matchId = message.matchId
        match.signCount = message.signNum
        match.begin = message.nextMatchBeginTime
        match.isSign = message.signStatus >= 0 && message.signStatus != 5
        match.endSignTime = message.signEndTime
        match.award = message.dynamicSignUpAward
        SceneManager.Instance.sendMessageToScene("MSG_update_match_info" + message.matchTypeId)
    }

    proto_lc_match_begin_not(event) {
        const message: Iproto_lc_match_begin_not = event.packet
        if (DataManager.CommonData["gameServer"] && DataManager.CommonData["gameServer"].lc_room_mode == 2) {
            cc.log("比赛中不弹出")
            return
        }

        const matchInfo = DataManager.Instance.matchMap[message.matchType]
        if (matchInfo == null) {
            return
        }

        const leftTime = message.startTime - Math.floor(new Date().getTime() / 1000)
        if (DataManager.CommonData["gameServer"]) {
            if (leftTime >= getLeadTime() && matchInfo.type != 2) {
                SceneManager.Instance.popScene<String>("moduleLobby", "MatchTip", message)
                return
            }
            cc.log("游戏内不再弹出")
            return
        }

        if (leftTime <= 10 || matchInfo.type == 2) {
            gotoMatchSvr(matchInfo)
            return
        }

        SceneManager.Instance.popScene<String>("moduleLobby", "MatchTip", message)
    }

}
