/**
 * Create by Jin on 2022.12.8
 */

 import { confusonFunc } from "../base/confusonFunc";
 import { AdsConfig } from "../base/baseData/AdsConfig"
 import DataManager from "../base/baseData/DataManager"
 import { iMessageBox, getLowMoneyRoom, enterGame, unenoughGold, getMD5, showAwardResultPop,numberFormat, czcEvent } from "../base/BaseFuncTs"
 import BaseScene from "../base/baseScene/BaseScene"
 import WxWrapper from "../base/WxWrapper"
 import { checkAdCanReceive, receiveAdAward ,sendReloadUserData,remindEggActivity} from "./LobbyFunc"
 import { http } from "../base/utils/http";
 import SceneManager from "../base/baseScene/SceneManager"
 import NetManager from "../base/baseNet/NetManager";
 import BaseFunc = require("../base/BaseFunc")
 import { ITEM, ITEM_NAME } from "../base/baseData/ItemConfig";
 import BaseComponent from "../base/BaseComponent";
 const { ccclass } = cc._decorator
 
 @ccclass
 export default class DoubleEggActivePop extends BaseComponent {

    SIGN_KEY = "8923mjcm0d089d"//"232b969e8375"//
    trumpetMsg = []
    awardList = []  //嘉年华 人员奖励
    sta_get = false
    drawStatus = {
        luckValue: 0,   //抽取次数
        freeValue: -1,  //0今天没抽过
        targetAddition: [-1, -1, -1, -1, -1],//-1:未领  0:可以领  1：已领
    }

    //累计奖励
    jackpotAwardList = {
        ["20"]: {id:0, index:0, num:80000},
        ["40"]: {id:1, index:0, num:120000},
        ["60"]: {id:2, index:0, num:200000},
        ["80"]: {id:3, index:0, num:250000},
        ["100"]: {id:4, index:0, num:300000},
    }
    
    jackpotAwardNeedList = [
        20,
        40,
        60,
        80,
        100
    ]

   startTimstamp = null
   endTimstamp = null
   labelTrump0 : cc.Node = null
   labelTrump1 : cc.Node = null
   labelTrump2 : cc.Node = null
   labelTrump3:cc.Node = null

   labelTrump0_i = 0
   labelTrump1_i = 1
   labelTrump2_i = 2
   labelTrump3_i = 3

   initCount = 0
   RewardList_loadOver = false //奖励数据加载完开关
   

    ConfirmFunction = ()=>{}
    onLoad(){
        console.log("jin---新春抽豪礼")
        this.initCount = 0
        this.labelTrump0 = cc.find("nodeTrumpet/nodetrumpmask/labelTrump0",this.node)
        this.labelTrump1 = cc.find("nodeTrumpet/nodetrumpmask/labelTrump1",this.node)
        this.labelTrump2 = cc.find("nodeTrumpet/nodetrumpmask/labelTrump2",this.node)
        this.labelTrump3 = cc.find("nodeTrumpet/nodetrumpmask/labelTrump3",this.node)
        if(DataManager.Instance.onlineParam.carnivalActive){
            let carnival = DataManager.Instance.onlineParam.carnivalActive
            this.startTimstamp = new Date(carnival.start)
            this.endTimstamp = new Date(carnival.end)
            console.log("jin---DoubleEggActivePop carnival: ", this.startTimstamp, this.endTimstamp, this.startTimstamp.getMonth()+1, this.endTimstamp.getMonth()+1)
        
        }
        // console.log("jin---DoubleEggActivePop carnival: ", carnival.start.getFullYear(),carnival.start.getMonth()+1, carnival.start.getDate(),carnival.end.getFullYear(),carnival.end.getMonth()+1, carnival.end.getDate()) 
        //1.奖励列表  2.预览项  3.幸运排行榜 4.加载画的状态
        //1.信息广播  2.免费次数  3.次数奖励  4.消耗金豆数值（兑换的逻辑）

        this.http_double11_loadDrawStatus()
        this.http_double11_awardList()
        this.updateDrawCount()
        remindEggActivity()
    }

	//TODO  点击事件：1、帮助  2.免费开启  3.开1次  3.开10次  4.奖励预览  5.次数奖励
	//TODO  动效：1.奖品闪烁  2.奖励获得


    initCountRewardPenal(){
        let model = cc.find("CountRewardPenal/nodePop/nodeTaskList/item", this.node)
        const layout = cc.find("CountRewardPenal/nodePop/nodeTaskList/view/content", this.node)
        for(let k in this.jackpotAwardList){
            let item = cc.instantiate(model)
            if(Number(this.drawStatus.luckValue) < Number(k)) {
                this.drawStatus.targetAddition[this.jackpotAwardList[k].id] = -1            
            }
            if(this.drawStatus.targetAddition[this.jackpotAwardList[k].id] == -1) {
                if(Number(this.drawStatus.luckValue) >= Number(k)) {
                    this.drawStatus.targetAddition[this.jackpotAwardList[k].id] = 0
                }  
            }
            cc.log("jin---initCountRewardPenal: ", k, this.drawStatus.targetAddition[this.jackpotAwardList[k].id])
            this.initTaskItem(item, k)
            
            item.parent = layout
        }
        
    }

	initTrumpetAni(dt) {
        if(!this.RewardList_loadOver || this.awardList.length == 0){
            return
        }

        if(this.initCount == 0){
            ++this.initCount
            this.labelTrump0.getComponent(cc.RichText).string = this.awardList[this.labelTrump0_i % this.awardList.length]
        }else
        if(this.labelTrump0.x < -400){
            this.labelTrump0.x = 1200
            this.labelTrump0_i = this.labelTrump0_i + 4
            this.labelTrump0.getComponent(cc.RichText).string = this.awardList[this.labelTrump0_i % this.awardList.length]
        }else{
            this.labelTrump0.x = this.labelTrump0.x - dt * 100
        }

        if(this.initCount == 1){
            ++this.initCount
            this.labelTrump1.getComponent(cc.RichText).string = this.awardList[this.labelTrump1_i % this.awardList.length]
        }else
        if(this.labelTrump1.x < -400){
            this.labelTrump1.x = 1200
            this.labelTrump1_i = this.labelTrump1_i + 4
            this.labelTrump1.getComponent(cc.RichText).string = this.awardList[this.labelTrump1_i % this.awardList.length]
        }else{
            this.labelTrump1.x = this.labelTrump1.x - dt * 100
        }

        if(this.initCount == 2){
            ++this.initCount
            this.labelTrump2.getComponent(cc.RichText).string = this.awardList[this.labelTrump2_i % this.awardList.length]
        }else
        if(this.labelTrump2.x < -400){
            this.labelTrump2.x = 1200
            this.labelTrump2_i = this.labelTrump2_i + 4
            this.labelTrump2.getComponent(cc.RichText).string = this.awardList[this.labelTrump2_i % this.awardList.length]
        }else{
            this.labelTrump2.x = this.labelTrump2.x - dt * 100
        }

        if(this.initCount == 3){
            ++this.initCount
            this.labelTrump3.getComponent(cc.RichText).string = this.awardList[this.labelTrump3_i % this.awardList.length]
        }else
        if(this.labelTrump3.x < -400){
            this.labelTrump3.x = 1200
            this.labelTrump3_i = this.labelTrump3_i + 4
            this.labelTrump3.getComponent(cc.RichText).string = this.awardList[this.labelTrump3_i % this.awardList.length]
        }else{
            this.labelTrump3.x = this.labelTrump3.x - dt * 100
        }

    }

    initTaskItem(item, k){
        cc.find("taskName", item).getComponent(cc.Label).string = "抽取"+ k +"次"
        cc.find("award1/num", item).getComponent(cc.Label).string = this.jackpotAwardList[k].num
        // cc.find("award2/num", item).getComponent(cc.Label).string = "抽取20次"
        cc.find("lableProgress", item).getComponent(cc.Label).string = (this.drawStatus.luckValue <= Number(k) ? this.drawStatus.luckValue : k) + "/" + k

        cc.log("jin---initTaskItem: ", k, this.drawStatus.targetAddition[this.jackpotAwardList[k].id])
        cc.find("nodeState/btn_over", item).active = (Number(this.drawStatus.targetAddition[this.jackpotAwardList[k].id]) === 1)
        cc.find("nodeState/btn_undone", item).active = (Number(this.drawStatus.targetAddition[this.jackpotAwardList[k].id]) === -1)
        cc.find("nodeState/btn_get", item).active = (Number(this.drawStatus.targetAddition[this.jackpotAwardList[k].id]) === 0)
        Number(this.drawStatus.targetAddition[this.jackpotAwardList[k].id]) === 0 && this.isShowRedPoint(true)
        BaseFunc.AddClickEvent(cc.find("nodeState/btn_get", item), this.node, "DoubleEggActivePop", "onPressJackpotGet", k);
    }

    //刷新按钮状态
    updateItemBtn(index: number = null, callBack = null){
        this.sta_get = false
        const layout_task = cc.find("CountRewardPenal/nodePop/nodeTaskList/view/content", this.node)
        for(let curItemIndex in layout_task.children){
            let item = layout_task.children[curItemIndex]
            let jackpot_luckValue = this.jackpotAwardNeedList[curItemIndex]
            console.log("jin---updateItemBtn: ", this.drawStatus.luckValue, this.jackpotAwardNeedList[curItemIndex],this.drawStatus.targetAddition[curItemIndex] == -1)
            if(Number(this.drawStatus.luckValue) < Number(this.jackpotAwardNeedList[curItemIndex])) {
                this.drawStatus.targetAddition[curItemIndex] = -1            
            }
            if(this.drawStatus.targetAddition[curItemIndex] == -1) {
                if(Number(this.drawStatus.luckValue) >= Number(this.jackpotAwardNeedList[curItemIndex])) {
                    this.drawStatus.targetAddition[curItemIndex] = 0
                }  
            }

            cc.find("lableProgress", item).getComponent(cc.Label).string = (this.drawStatus.luckValue <= jackpot_luckValue ? this.drawStatus.luckValue : jackpot_luckValue) + "/" + jackpot_luckValue
            console.log("jin---updateItemBtn: ", layout_task.children[curItemIndex], index, curItemIndex)

            cc.find("nodeState/btn_over", item).active = (Number(this.drawStatus.targetAddition[curItemIndex]) === 1)
            cc.find("nodeState/btn_undone", item).active = (Number(this.drawStatus.targetAddition[curItemIndex]) === -1)
            cc.find("nodeState/btn_get", item).active = (Number(this.drawStatus.targetAddition[curItemIndex]) === 0)
            if(Number(this.drawStatus.targetAddition[curItemIndex]) === 0){
                this.sta_get = true
            }
        }
        this.isShowRedPoint(this.sta_get)
        callBack && callBack()
    }

    updateDrawCount(){
       //todo: 1.按钮状态  2.次数奖励  3.有多少券
       let count_quan = DataManager.UserData.getItemNum(ITEM.CARNAIVAL_TICKET)
       cc.log("jin---updateItemBtn: ", count_quan)
       cc.find("btn_free", this.node).active = count_quan > 0
       cc.find("btn_free/cc_remain_all/num", this.node).getComponent(cc.Label).string = numberFormat(DataManager.UserData.getItemNum(391))
    }

    http_double11_loadDrawStatus(forceRefresh = false) {
        if (!forceRefresh && this.awardList.length > 0) {
            return
        }

        let url = DataManager.getURL("LOAD_TURN_DRAW_STATUS")
        
        let params = {            
            gameid: DataManager.Instance.gameId,
            channel: 1, 
            activityId: 31238,
            uid: DataManager.UserData.guid,
            sign: getMD5("uid=" + DataManager.UserData.guid + "&key=" + this.SIGN_KEY),
            pn: DataManager.Instance.packetName,
        }
        
        http.open(url, params, (msg) => {
            cc.log("jin---loadDrawStatus: ", msg)
            if (msg && msg.ret == 0) {
                this.drawStatus.luckValue = msg.luckValue
                this.drawStatus.freeValue = msg.freeValue
                this.drawStatus.targetAddition[0] = msg.targetOne
                this.drawStatus.targetAddition[1] = msg.targetTwo
                this.drawStatus.targetAddition[2] = msg.targetThree
                this.drawStatus.targetAddition[3] = msg.targetFour
                this.drawStatus.targetAddition[4] = msg.targetFive
                
                DataManager.UserData.money = msg.money                
                this.initCountRewardPenal()
            }           
        }) 
    }

	//嘉年华 广播
	http_double11_awardList(forceRefresh = false) {
        if (!forceRefresh && this.awardList.length > 0) {
            return
        }

        let url = DataManager.getURL("LOAD_TURN_DRAW_LIST")
        
        let params = {            
            gameid: DataManager.Instance.gameId,
            channel: 1, 
            activityId: 21238,
            uid: DataManager.UserData.guid,
            sign: getMD5("uid=" + DataManager.UserData.guid + "&key=" + this.SIGN_KEY),
            pn: DataManager.Instance.packetName,
			taskid: 2,
            pnum: 1,
            info: "SHOWDRAW"
        }
        
		http.open(url, params, (msg)=>{
			// console.log("jin---http_double11_awardList: ", msg)
			if (msg && msg.result) {
                // this.awardList = msg.result  
                this.setAwardList(msg.result)
				// this.initTrumpetAni()
                // this.refreshAwardList() 
            } 
		})
    }

    setAwardList(msg) {
        let count = 0
        for(let curAward of msg){
            let tempLable = "<color=#ff735c>恭喜</c><color=#ffd164>" + curAward.wpPrizeInfo + "</c><color=#ff735c>在新春抽豪礼中获得</c><color=#ffd164>" + curAward.wpPrizeNum + ITEM_NAME[curAward.wpPrizeIndex] +"</color>"
            this.awardList.push(tempLable)
            ++count
            if(count > 20){
                break
            }
        }
        this.RewardList_loadOver = true
    }

    //请求抽奖奖励
    http_double11_draw(num, free = false) {

        //TODO 动效锁
        let url = DataManager.getURL("EXECUTE_TURN_DRAW")
        
        let params = {            
            gameid: DataManager.Instance.gameId,
            channel: 1, 
            activityId: 31238,
            uid: DataManager.UserData.guid,
            sign: getMD5("uid=" + DataManager.UserData.guid + "&key=" + this.SIGN_KEY),
            pn: DataManager.Instance.packetName,
            pnum: num,
            taskid: 0
        }

        if (free) {
            params.activityId = 21238
        }else if(num == 10){
            params.activityId = 41238
        }
        
        http.open(url, params, (msg) => {
            // cc.log("jin---url and params: ", url, params, DataManager.UserData.guid, this.SIGN_KEY)
            cc.log(msg)
            if (msg) {
                if (msg.ret == 0) {
                    // console.log("jin---AwardOfPlayGamePop msg: ", msg, DataManager.UserData.guid, this.SIGN_KEY) 
                    this.drawStatus.luckValue = msg.luckValue
                    DataManager.UserData.money = msg.money
                    let awards = []
                    for(let k in msg.json) {
                        awards.push({index: msg.json[k].index, num: msg.json[k].prizeNum})                        
                    }                    
                    
                    if(num == 1){
                        this.playAni_1ci(()=>{showAwardResultPop(awards)})
                        remindEggActivity()
                    }else if(num == 10){
                        this.playAni_10ci(()=>{showAwardResultPop(awards)})
                    }
                    czcEvent("新春抽豪礼" + DataManager.Instance.userTag)
                    this.updateItemBtn()
                }          
                else{
                    iMessageBox(msg.msg || "抽取失败, 请稍后再试")
                }
            }  
        }) 
  }

  //累计次数领奖
  http_double11_jackpotDraw(num) {
        
    let url = DataManager.getURL("EXECUTE_JACKPOT_DRAW")
    
    let params = {            
        gameid: DataManager.Instance.gameId,
        channel: 1, 
        activityId: 31238,
        uid: DataManager.UserData.guid,
        sign: getMD5("uid=" + DataManager.UserData.guid + "&key=" + this.SIGN_KEY),
        pn: DataManager.Instance.packetName,
        pnum: num,
    }


    http.open(url, params, (msg) => {
        // console.log("jin---http_double11_jackpotDraw: ",msg)
        if (msg) {
            if (msg.ret == 0) {

                let idx = this.jackpotAwardList[num].id
                
                this.drawStatus.targetAddition[idx] = 1

                //todo:1.改变按钮状态 2.弹奖励
                    
                this.updateItemBtn(idx, ()=>{
                    let awards = [
                        this.jackpotAwardList[num]
                    ]                        
                    showAwardResultPop(awards)
                })

                this.updateItemBtn()
                                   
            }else{
            }     
        }  
    }) 
}

    checkIsInGame() {        
        let socketMsg = {
            opcode: "proto_cl_store_safe_amount_req",
            plyGuid: DataManager.UserData.guid,
            amount: 0
        }
        NetManager.Instance.send("lobby", socketMsg)
    }

    proto_lc_store_safe_amount_ack(message) {

        message = message.packet
        // console.log("jin---proto_lc_store_safe_amount_ack: " , message) 
        if (message.ret != -1){
            this.ConfirmFunction()
        }else {           
            iMessageBox("您有未完成的游戏,请先完成游戏!")
        }
        
    }

    onPressFree(){
      console.log("jin---onPressFree: ") 
        this.ConfirmFunction = () => {
            // receiveAdAward(AdsConfig.taskAdsMap.LotteryShare, () => {//LotteryShare
                this.http_double11_draw(1, true)
            // }, null, false)
        }
        this.checkIsInGame()
    }

    onPress1Ci(){
        cc.log("onPress1Ci")

        this.ConfirmFunction = () => {
            this.http_double11_draw(1)
        }
        this.checkIsInGame()
    }   

    onPress10Ci(){
        cc.log("onPress10Ci")
        
        this.ConfirmFunction = () => {
            this.http_double11_draw(10)
        }
        this.checkIsInGame()
    }

    onPressRewardPreview(){
        SceneManager.Instance.popScene("moduleLobby", "CommonTipPop", {idx:5})
    }

    onPressCountReward(){
        
    }

	onPressHelp(){
		SceneManager.Instance.popScene("moduleLobby", "CommonTipPop", {idx:4})
	}

    //累计奖励按钮状态
    onPressJackpotGet(EventTouch, data) {
        this.http_double11_jackpotDraw(data)
    }

    onPressOpenCountRewardPenal(){
        cc.find("CountRewardPenal", this.node).active = true
    }

    onPressCloseCountRewardPenal(){
        cc.find("CountRewardPenal", this.node).active = false
    }

    //动画
    playAni_1ci(callBack: Function){
        let node = cc.find("nodeRewardShow/db_spine_1", this.node)
        const spine = node.getComponent(sp.Skeleton)
        node.opacity = 255
        spine.setAnimation(1, "02", false)
        spine.setCompleteListener(() => {
            node.runAction(cc.sequence(cc.delayTime(0.4), cc.callFunc(()=>{
                spine.setCompleteListener(null)
                node.opacity = 0
                spine.setAnimation(1, "daji", true)
                callBack && callBack()
                this.updateDrawCount()
            })))
            
        })
    }

    playAni_10ci(callBack: Function){
        // let node = cc.find("nodeRewardShow/db_spine", this.node)
        let node_1 = cc.find("nodeRewardShow/db_spine_1", this.node)
        const spine_1 = node_1.getComponent(sp.Skeleton)
        // const spine = node.getComponent(sp.Skeleton)
        // node.opacity = 0
        node_1.opacity = 255
        spine_1.setAnimation(1, "03", false)
        spine_1.setCompleteListener(() => {
            node_1.runAction(cc.sequence(cc.delayTime(0.4), cc.callFunc(()=>{
                spine_1.setCompleteListener(null)
                // node.opacity = 255
                node_1.opacity = 0
                // spine.setAnimation(1, "daji", true)
                callBack && callBack()
                this.updateDrawCount()
            })))
            
        })
    }

    proto_lc_reload_user_data_ack(message) {
        cc.find("btn_free/cc_remain_all/num", this.node).getComponent(cc.Label).string = numberFormat(DataManager.UserData.getItemNum(391))
    }

    //红点提示
    isShowRedPoint(sta : boolean){
        cc.find("btn_xsjl/badage", this.node).active = sta
    }

    // updateUserData(){
    //     console.log("jin---双旦金币刷新", )
    //     this.updateDrawCount()
    // }

    updateActivity(message){
        console.log("jin---双旦 金币刷新", message)
        this.updateDrawCount()
    }

    update(dt: number) {
        this.initTrumpetAni(dt)
    }
 }