import BaseComponent from "../base/BaseComponent";
import { sToTime, showAwardMutipleResultPop, setGray, getMD5, getHttpSpriteFrame, playAD, unenoughGuidPop, iMessageBox, getNowTimeUnix, showAwardResultPop } from "../base/BaseFuncTs";
import BaseFunc = require("../base/BaseFunc")
import DataManager from "../base/baseData/DataManager";
import { getADAward, exchangeQttCoin } from "./LobbyFunc";
import SceneManager from "../base/baseScene/SceneManager";
import GashaponBall from "./GashaponBall";
import NetManager from "../base/baseNet/NetManager";
import { AdsConfig } from "../base/baseData/AdsConfig";

const {ccclass, property} = cc._decorator;

const AD_AREA = 8

@ccclass
export default class GashaponActivePop extends BaseComponent {


    _delayTime: number = 0
    _remainTime:number = 0
    thisComponentName = "GashaponActivePop"
    SIGN_KEY = "8923mjcm0d089d"

    previewItems = [];
    awardList = [];
    drawStatus = {
        luckValue: 0,   //抽取次数
        freeValue: -1,  //0今天没抽过
        targetAddition: [-1, -1, -1, -1],
    }

    drawNeed = 998

    drawLock = false

    jackpotAwardList = {
        ["20"]: {id:0, index:365, num:120},
        ["100"]: {id:1, index:365, num:480},
        ["200"]: {id:2, index:365, num:888},
        ["1000"]: {id:3, index:365, num:18000},
    }
    
    jackpotAwardNeedList = [
        20,
        100,
        200,
        1000
    ]
    
    activeDuringTime = "11月9日--11月27日"
    
    @property(cc.SpriteFrame)
    icon_chest_small_0:cc.SpriteFrame = null;
    
    @property(cc.SpriteFrame)
    icon_chest_small_1:cc.SpriteFrame = null;
    
    @property(cc.SpriteFrame)
    icon_item_0:cc.SpriteFrame = null;
    
    @property(cc.SpriteFrame)
    icon_item_2:cc.SpriteFrame = null;
    
    @property(cc.SpriteFrame)
    icon_item_365:cc.SpriteFrame = null;
    
    @property(cc.SpriteFrame)
    icon_item_367:cc.SpriteFrame = null;
    
    @property(cc.SpriteFrame)
    icon_item_368:cc.SpriteFrame = null;
    
    
    RollPoolStatusEnum = {
        "Idle":0,
        "PrevRun":1,
        "Running":2,
        "Stopping":3,
        "BeforeIdle":4,
    }

    RollBallNum = 15;

    RollPoolStatus = 0;

    RollBallInstances:GashaponBall[] = []
    
    CollisionWallCheckCount = 0;

    RollWallFormulation = [
        {k:-7.596, b:-1572},
        {k:7.596, b:-1572},
        {k:0, b:121},
        {k:0, b:-150},
    ]

    RollBallSpeed = {
        min:0,
        max:40,
    }

    RollBallStayLine = [
        {k:0, b:-135, num:[]},
        {k:0, b:-75, num:[]},
        {k:0, b:-35, num:[]},
    ]

    CurAwardList = []
    
    FrameCount = 0
    FrameSecond = 0
    RollBallStartTime = 0
    RollBallMinTime = 0 // 5秒

    RankPopRankList = <any>{}
    
    ConfirmFunction = ()=>{}

    reinitRollBallStay() {
        this.RollBallStayLine.forEach((v) => {
            for (let i = 0; i < 6; i++) {                
                v.num[i] = 0;                
            }
        })
    }

    aniBigChestMotion(num = 1, delayTime = 0.6) {
        
        this["nodeMotionAni"].removeAllChildren()

        for (let idx = 0; idx < num; idx++) {
                
            let sptMotion = cc.instantiate(this["nodeMotionGetAniPrefab"])
            if (!this || !sptMotion) {
                return
            }
            sptMotion.active = true
            sptMotion.opacity = 1
            sptMotion.setPosition((BaseFunc.Random(2)*2-1) * BaseFunc.Random(10), 20)   
            this["nodeMotionAni"].addChild(sptMotion)
            
            sptMotion.scale = BaseFunc.Random(3, 9)/10

            let left = BaseFunc.Random(2)*2-1
            
            let bezierCfg = []
            bezierCfg[bezierCfg.length] = cc.v2(left*BaseFunc.Random(20, 250), BaseFunc.Random(30, 300))
            bezierCfg[bezierCfg.length] = cc.v2(bezierCfg[bezierCfg.length-1].x + left*BaseFunc.Random(160), bezierCfg[bezierCfg.length-1].y+BaseFunc.Random(0, 150))
            // bezierCfg[bezierCfg.length] = cc.v2(bezierCfg[bezierCfg.length-1].x + left*BaseFunc.Random(110), bezierCfg[bezierCfg.length-1].y-BaseFunc.Random(0, 150))
            bezierCfg[bezierCfg.length] = cc.v2(bezierCfg[bezierCfg.length-1].x, bezierCfg[bezierCfg.length-1].y+BaseFunc.Random(0, 150))



            let actionList = []
            actionList[actionList.length] = cc.delayTime(delayTime + BaseFunc.Random(40)/100)
            actionList[actionList.length] = cc.fadeIn(0.01)
            // actionList[actionList.length] = cc.delayTime(0.01)
            actionList[actionList.length] = cc.bezierTo(0.6, bezierCfg)
            actionList[actionList.length] = cc.fadeOut(0.3)
            sptMotion.stopAllActions()
            sptMotion.runAction(cc.sequence(actionList))
        }
    }
    
    aniBigChest(flag = 0, callBack = null) {
        // 0关闭 1开启 2预开启
        
    }

    updateDrawCount() {
        this["labelTotalCount"].$Label.string = this.drawStatus.luckValue + "次"
        
        if (this.drawStatus.freeValue == 0) {
            this.updateFreeButton(true)
        }else{
            this.updateFreeButton(false)
        }

        
        for(let k in this.drawStatus.targetAddition) {    
            if(this.drawStatus.luckValue < this.jackpotAwardNeedList[k]) {
                this.drawStatus.targetAddition[k] = -1            
            }

            if(this.drawStatus.targetAddition[k] == -1) {
                if(this.drawStatus.luckValue >= this.jackpotAwardNeedList[k]) {
                    this.drawStatus.targetAddition[k] = 0
                }  
            }
        }

        for(let k in this.drawStatus.targetAddition) {
            this.anismallChest(k, this.drawStatus.targetAddition[k])
        }
    }

    anismallChest(sindex, flag = -1, callBack = null) {
        
        this["nodeAdditionItemPrefab" + sindex].getChildByName("sptAdditionItemLight").active = false
        if (flag == 1) {            
            
            let actions = []
            actions[actions.length] = cc.callFunc(() => {
                this["nodeAdditionItemPrefab" + sindex].getChildByName("sptChest").getComponent(cc.Sprite).spriteFrame = this.icon_chest_small_1
            })
            actions[actions.length] = cc.delayTime(0.2)
            actions[actions.length] = cc.callFunc(() => {
                if (!!callBack) {
                    callBack()
                }
            })
            this["nodeAdditionItemPrefab" + sindex].stopAllActions()
            this["nodeAdditionItemPrefab" + sindex].runAction(cc.sequence(actions))

        }else if(flag == 0) {
            this["nodeAdditionItemPrefab" + sindex].getChildByName("sptAdditionItemLight").active = true
            this["nodeAdditionItemPrefab" + sindex].getChildByName("sptChest").getComponent(cc.Sprite).spriteFrame = this.icon_chest_small_0
            setGray(this["nodeAdditionItemPrefab" + sindex].getChildByName("sptChest"), 0)
        }else{
            this["nodeAdditionItemPrefab" + sindex].getChildByName("sptChest").getComponent(cc.Sprite).spriteFrame = this.icon_chest_small_0
            setGray(this["nodeAdditionItemPrefab" + sindex].getChildByName("sptChest"))
        }
    }

    onLoad() {
        this.onOpenScene()
    }

    onOpenScene() {
        if (!this.initParam){
            this.close()
        }

        let carnival = DataManager.Instance.onlineParam.carnivalActive
        if (carnival && carnival.start <= getNowTimeUnix() && carnival.end >= getNowTimeUnix()) {  
            let startDay = new Date(carnival.start * 1000)
            let endDay = new Date(carnival.end * 1000)
            this.activeDuringTime = (startDay.getMonth() + 1) + "月" + startDay.getDate() + "日 - " + (endDay.getMonth() + 1) + "月" + endDay.getDate() + "日"
        }
        
        this["labelActiveTime"].$Label.string = this.activeDuringTime

        this.fixPopPosition()

        this.initRollPool()

        this.updateNewDay()

        this.updateFreeButton(false)

        this.updateAdditionItem()        

        this.http_double11_loadDrawStatus()
        this.http_double11_awardList()
        this.http_double11_previewitem() 
        this.http_load_lucky_rank() 
        
        this["labelBtnConfirm2_1"].$Label.string = this.drawNeed     
        this["labelBtnConfirm3_1"].$Label.string = this.drawNeed * 10
        // this.animal.getComponent(cc.Sprite).spriteFrame = this.icons[changeType];

    }

    fixPopPosition() {
        var worldCenter = this.node.parent.parent.parent.convertToWorldSpaceAR(cc.v2(0, 0))
        var localCenter = this["nodeGiftPop"].parent.convertToNodeSpaceAR(worldCenter)
        this["nodeGiftPop"].position = localCenter
        this["nodeHelpPop"].position = localCenter
        this["nodeAdditionPanel"].position = localCenter
        this["nodeRankPop"].position = localCenter
    }

    updateNewDay() {        
        let today = new Date()
        let tomorrow = new Date()
        tomorrow.setDate(today.getDate()+1)
        tomorrow.setHours(0,0,0,0)
        this._remainTime = tomorrow.getTime()/1000 - today.getTime()/1000
        // this["labelFreeCounter"].$Label.string = sToTime(this._remainTime)
    }

    updateAdditionItem() {
        for(let k in this.jackpotAwardList) {            
            const element = this.jackpotAwardList[k]
            let additionItem = this["nodeAdditionItemPrefab" + element.id]
            additionItem.active = true
            additionItem.setPosition(0, 0)            
            BaseFunc.AddClickEvent(additionItem, this.node, this.thisComponentName, "onPressAdditionDraw", k);
            additionItem.getChildByName("labelLimitCount").getComponent(cc.Label).string = k + "次"       
        }
        
    }
    
    updateFreeButton(flag) {
        if (!!flag) {  
            this["btnConfirm0"].active = false
            this["btnConfirm1"].active = true
        }else{
            this["btnConfirm0"].active = true
            this["btnConfirm1"].active = false
        }
    }
    
    __bindButtonHandler() {
        BaseFunc.AddClickEvent(this["btnConfirm1"], this.node, this.thisComponentName, "onPressConfirm1", 0, 3);
        BaseFunc.AddClickEvent(this["btnConfirm2"], this.node, this.thisComponentName, "onPressConfirm2", 0, 3);
        BaseFunc.AddClickEvent(this["btnConfirm3"], this.node, this.thisComponentName, "onPressConfirm3", 0, 3);
        // BaseFunc.AddClickEvent(this["btnConfirm0"], this.node, this.thisComponentName, "onPressConfirm0", 0, 3);
        
        BaseFunc.AddClickEvent(this["btnGift"], this.node, this.thisComponentName, "onPressGift", 0, 3);
        BaseFunc.AddClickEvent(this["btnHelp"], this.node, this.thisComponentName, "onPressHelp", 0, 3);
        BaseFunc.AddClickEvent(this["btnRank"], this.node, this.thisComponentName, "onPressRank", 0, 3);

        // BaseFunc.AddClickEvent(this["btn_Close"], this.node, this.thisComponentName, "onPressClose", 0, 3);
        // BaseFunc.AddClickEvent(this["btn_Close_big"], this.node, this.thisComponentName, "onPressClose", 0, 3);

        BaseFunc.AddClickEvent(this["btnAdditionPanelClose"], this.node, this.thisComponentName, "onPressAdditionPanelClose", 0, 3);        
        BaseFunc.AddClickEvent(this["nodeAdditionPanelMask"], this.node, this.thisComponentName, "onPressAdditionPanelClose", 0, -1);
        
        BaseFunc.AddClickEvent(this["nodeGiftPopMask"], this.node, this.thisComponentName, "onPressGiftPopMask", 0, -1);
        BaseFunc.AddClickEvent(this["nodeHelpPopMask"], this.node, this.thisComponentName, "onPressHelpPopMask", 0, -1);
        BaseFunc.AddClickEvent(this["nodeRankPopMask"], this.node, this.thisComponentName, "onPressRankPopMask", 0, -1);

        BaseFunc.AddToggleCheckEvent(this["btnRankMenu0"], this.node, this.thisComponentName, "onPressRankMenu", 0)
        BaseFunc.AddToggleCheckEvent(this["btnRankMenu1"], this.node, this.thisComponentName, "onPressRankMenu", 1)
    }

    updateRankPopAwardList() {
        // nodeRankPopItem1Prefab
    }


    http_getUserDetail() {
        
        let url = DataManager.getURL("USERBATCH")
        let uids = Object.keys(this.RankPopRankList).toString()

		BaseFunc.HTTPGetRequest(url, {
			uids: uids
		}, (event) => {
			if (event && event.list && event.list.length > 0) {
                
                for (const iterator of event.list) {
                    if(!!this.RankPopRankList[iterator.uid]) {
                        this.RankPopRankList[iterator.uid].nickname = iterator.nickname
                        this.RankPopRankList[iterator.uid].face = iterator.face
                    }
                }
                        
                this.updateRankPopRankList()
			}
		})
    }
    updateRankPopRankList() {
        
        let previewItemList = []
        for (let key in this.RankPopRankList) {
            let iter = this.RankPopRankList[key]            
            let previewItem = cc.instantiate(this["nodeRankPopItem1Prefab"])
            previewItem.active = true
            previewItem.setPosition(0, 0)
            previewItemList.push(previewItem)
            previewItem.detail = iter

            
            let nodeLevel = previewItem.getChildByName("nodeLevel")
            if (null != nodeLevel && iter.vipLv) {
                let viplv = iter.vipLv || 0
                let vipflag = "VIP1-2"
                if (viplv <= 2)
                    vipflag = "VIP1-2"
                else if (viplv <= 4)
                    vipflag = "VIP3-4"
                else if (viplv <= 6)
                    vipflag = "VIP5-6"
                else if (viplv <= 8)
                    vipflag = "VIP7-8"
                else if (viplv <= 10)
                    vipflag = "VIP9-10"
                else if (viplv <= 12)
                    vipflag = "VIP11-12"
    
                nodeLevel.getChildByName(vipflag).active = true
                nodeLevel.getChildByName("viplabel").getComponent(cc.Label).string = viplv
            }
            
            let strName = iter.nickName || ""
            if (strName.length > 6) strName = strName.substr(0, 6) + "..."
            previewItem.getChildByName("labelNickname").getComponent(cc.Label).string = strName
            previewItem.getChildByName("labelGuns").getComponent(cc.Label).string = iter.alValue + "次"
            
            let nodeFace = previewItem.getChildByName("nodeFace")
            if (null != nodeFace && iter.face) {
                getHttpSpriteFrame(iter.face, (sprite) => {
                    let face = cc.find("nodeMask/rank_face", nodeFace).getComponent(cc.Sprite)
                    let size = face.node.getContentSize()
                    face.spriteFrame = sprite
                    face.node.setContentSize(size)
                })
            }
     
            previewItem.getChildByName("item_self_bg").active = iter.alPlyGuid == DataManager.UserData.guid
        }

        previewItemList.sort((a, b) => {
            return b.detail.alValue - a.detail.alValue
        })
        
        let idx = 0;
        for (const iterator of previewItemList) {
            ++idx;
            let nodeRank = iterator.getChildByName("nodeRank") 
            if (nodeRank){
                if (idx == 1) {
                    nodeRank.getChildByName("rank_1st").active = true
                }
                else if (idx == 2) {
                    nodeRank.getChildByName("rank_2nd").active = true
                }
                else if (idx == 3) {
                    nodeRank.getChildByName("rank_3rd").active = true
                }
                else {
                    nodeRank.getChildByName("rankNum").active = true
                    nodeRank.getChildByName("rankNum").getComponent(cc.Label).string = idx + ""
                }
            }
            this["nodeRankPopContent1"].addChild(iterator)            
        }
    }

    updateRankPop(_index) {
        _index = _index%2

        for(let i = 0; i < 2; ++i) {            
            this["nodeRankPopContent" + i].active = false
            this["nodeRankPopExtra" + i].active = false
        }

        this["nodeRankPopContent" + _index].active = true
        this["nodeRankPopExtra" + _index].active = true
    }

    onPressRankMenu(EventTouch, data) {
        this.updateRankPop(data)
    }

    onPressAdditionDraw(EventTouch, data) {
        if (this.drawStatus.targetAddition[this.jackpotAwardList[data].id] == 0) {
            this.http_double11_jackpotDraw(data)
        }else{
            this.openAdditionDetailPanel(data)
        }
    }

    initGiftPop() {

        for (let idx = this.previewItems.length - 1; idx >= 0;  --idx) {
            const element = this.previewItems[idx];
            let previewItem = cc.instantiate(this["nodePreviewItemPrefab"])
            previewItem.active = true
            previewItem.setPosition(0, 0)
                    
            let url = this.previewItems[idx]["acItemUrl"] as string
            url = url.replace("http://activity.izhangxin.com/resources/images/dialImages/", "")

            let size = previewItem.getChildByName("sptPrevItemIcon").getContentSize()
            previewItem.getChildByName("sptPrevItemIcon").getComponent(cc.Sprite).spriteFrame = this["icon_item_" + element.acItemIndex] 
            previewItem.getChildByName("sptPrevItemIcon").width = this["icon_item_" + element.acItemIndex].getOriginalSize().width
            previewItem.getChildByName("sptPrevItemIcon").height = this["icon_item_" + element.acItemIndex].getOriginalSize().height
            let scaleX = size.width / previewItem.getChildByName("sptPrevItemIcon").getContentSize().width
            let scaleY = size.height / previewItem.getChildByName("sptPrevItemIcon").getContentSize().height
            let scale = Math.min(scaleX, scaleY)
            previewItem.getChildByName("sptPrevItemIcon").scale = scale 

            // getHttpSpriteFrame(url, (spriteFrame) => {
            //     if (!previewItem.isValid) {
            //         return
            //     }
                
            //     let size = previewItem.getChildByName("sptPrevItemIcon").getContentSize()
            //     previewItem.getChildByName("sptPrevItemIcon").getComponent(cc.Sprite).spriteFrame = spriteFrame                
            //     previewItem.getChildByName("sptPrevItemIcon").width = spriteFrame.getOriginalSize().width
            //     previewItem.getChildByName("sptPrevItemIcon").height = spriteFrame.getOriginalSize().height
            //     let scaleX = size.width / previewItem.getChildByName("sptPrevItemIcon").getContentSize().width
            //     let scaleY = size.height / previewItem.getChildByName("sptPrevItemIcon").getContentSize().height
            //     let scale = Math.min(scaleX, scaleY)
            //     previewItem.getChildByName("sptPrevItemIcon").scale = scale
            // })

            // element.acItemIndex
            previewItem.getChildByName("labelNum").getComponent(cc.Label).string = element.acItemNum
            if(element.acItemIndex == 368) {
                this["nodeGiftContent1"].addChild(previewItem)  
            }else{
                this["nodeGiftContent2"].addChild(previewItem)  
            }
            
        }  
    }

    onPressRankPopMask() {
        cc.log("onPressRankPopMask")
        this["nodeRankPop"].active = false;
    }
    onPressRank() {
        cc.log("onPressRank")
        this["nodeRankPop"].active = true;

        let putIndex = BaseFunc.Random(10)%2
        this["btnRankMenu" + putIndex].getComponent(cc.Toggle).isChecked = true
        this.onPressRankMenu(null, putIndex)

    }

    onPressHelpPopMask() {
        cc.log("onPressHelpPopMask")
        this["nodeHelpPop"].active = false;
    }

    onPressHelp() {
        cc.log("onPressHelp")
        this["nodeHelpPop"].active = true;

    }
    
    onPressGiftPopMask() {
        cc.log("onPressGiftPopMask")
        this["nodeGiftPop"].active = false;
    
    }

    onPressGift() {
        cc.log("onPressGift")
        this["nodeGiftPop"].active = true;
    }


    onPressConfirm0() {
        cc.log("onPressConfirm0")
    }

    onPressConfirm1() {
        cc.log("onPressConfirm1")

        this.ConfirmFunction = () => {
            playAD(AdsConfig.video.Double11ActivePop, this.adSucess.bind(this))
        }
        this.checkIsInGame()
    }

    adSucess() {   
        getADAward(AD_AREA, () => {            
            this.http_double11_draw(1, true)
        })
    }

    onPressConfirm2() {
        cc.log("onPressConfirm2")
        
        this.ConfirmFunction = () => {
            this.http_double11_draw(1)
        }
        this.checkIsInGame()
    }

    onPressConfirm3() {
        cc.log("onPressConfirm3")
        
        this.ConfirmFunction = () => {
            this.http_double11_draw(10)
        }
        this.checkIsInGame()
        
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
        if (message.ret != -1){
            this.ConfirmFunction()
        }else {           
            iMessageBox("您有未完成的游戏,请先完成游戏!")
        }
        
    }

    http_double11_draw(num, free = false) {
        
        if (!free) {
            if (DataManager.UserData.money < this.drawNeed * num) {
                SceneManager.Instance.popScene("moduleLobby", "UnenoughGuidePop")
                return
            }
        }

        if(this.RollPoolStatus == this.RollPoolStatusEnum.Running) {
            // iMessageBox("扭蛋机正在欢快的转动着,请稍等~")
            // return      
        }

        if (!!this.drawLock) {
            // iMessageBox("扭蛋机正在欢快的转动着,请稍等~")
            // return            
        }

        this.node["parentView"].setUpdateDataLock(true)

        this.drawLock = true
        this.switchRollPoolStatus(this.RollPoolStatusEnum.PrevRun)
        this.CurAwardList = []

        let url = DataManager.getURL("EXECUTE_TURN_DRAW")
        
        let params = {            
            gameid: DataManager.Instance.gameId,
            channel: 1, 
            activityId: 21238,
            uid: DataManager.UserData.guid,
            sign: getMD5("uid=" + DataManager.UserData.guid + "&key=" + this.SIGN_KEY),
            pn: DataManager.Instance.packetName,
            pnum: num,
            taskid: 0
        }

        if (free) {
            params.taskid = 8
            this.drawStatus.freeValue = 1
        }else {
            this.node["parentView"].refreshUserData(DataManager.UserData.money - this.drawNeed * num)
            this.node["parentView"].refreshUserRedpacket()
        }
        
        // execute task
        

        BaseFunc.HTTPGetRequest(url, params, (msg) => {
            
            if (DataManager.Instance.isTesting)
                console.log(msg)
            if (msg) {
                if (msg.ret == 0) {
                    this.drawStatus.luckValue = msg.luckValue
                    DataManager.UserData.money = msg.money
                    let awards = []
                    for(let k in msg.json) {
                        awards.push({index: msg.json[k].index, num: msg.json[k].prizeNum})                        
                    }                    
                    
                    // this.switchRollPoolStatus(this.RollPoolStatusEnum.Stopping)
                    this.CurAwardList = awards
                    

                    this.updateDrawCount()
                }          
                else{
                    iMessageBox(msg.msg || "抽取失败, 请稍后再试")
                }
            }  
        }) 
    }

    http_double11_jackpotDraw(num) {
        
        let url = DataManager.getURL("EXECUTE_JACKPOT_DRAW")
        
        let params = {            
            gameid: DataManager.Instance.gameId,
            channel: 1, 
            activityId: 21238,
            uid: DataManager.UserData.guid,
            sign: getMD5("uid=" + DataManager.UserData.guid + "&key=" + this.SIGN_KEY),
            pn: DataManager.Instance.packetName,
            pnum: num,
        }


        BaseFunc.HTTPGetRequest(url, params, (msg) => {
            if (DataManager.Instance.isTesting)
                console.log(msg)
            if (msg) {
                if (msg.ret == 0) {

                    let idx = this.jackpotAwardList[num].id
                    
                    this.drawStatus.targetAddition[idx] = 1

                    this.anismallChest(idx, 1, () => {
                        let awards = [
                            this.jackpotAwardList[num]
                        ]                        
                        showAwardMutipleResultPop(awards)
                    })                    
                }else{
                    this.openAdditionDetailPanel(num)
                }     
            }  
        }) 
    }

    http_load_lucky_rank() {
    
        let url = DataManager.getURL("LOAD_LUCKY_RANK")
        
        let params = {            
            gameid: DataManager.Instance.gameId,
            channel: 1,
            activityId: 21238,
            uid: DataManager.UserData.guid,
            sign: getMD5("uid=" + DataManager.UserData.guid + "&key=" + this.SIGN_KEY),
            pn: DataManager.Instance.packetName,
        }
        

        BaseFunc.HTTPGetRequest(url, params, (msg) => {
            if (DataManager.Instance.isTesting)
                console.log(msg)
            if (msg && msg.list) {
                // cc.log(msg.list)          
                this.RankPopRankList = {}
                for (const iterator of msg.list) {
                    this.RankPopRankList[iterator.alPlyGuid] = iterator
                } 
                this.http_getUserDetail()
            }           
        }) 
    }
    
    http_double11_previewitem(forceRefresh = false) {
        if (!forceRefresh && this.previewItems.length > 0) {
            return
        }

        let url = DataManager.getURL("LOAD_TURN_DRAW_PREVIEW")
        
        let params = {            
            gameid: DataManager.Instance.gameId,
            channel: 1, 
            activityId: 21238,
            uid: DataManager.UserData.guid,
            sign: getMD5("uid=" + DataManager.UserData.guid + "&key=" + this.SIGN_KEY),
            pn: DataManager.Instance.packetName,
            pnum: 1,
            // info: "SHOWDARW"
        }
        

        BaseFunc.HTTPGetRequest(url, params, (msg) => {
            if (DataManager.Instance.isTesting)
                console.log(msg)
            if (msg && msg.list) {
                this.previewItems = msg.list  
                this.initGiftPop()
            }           
        }) 
    }

    http_double11_loadDrawStatus(forceRefresh = false) {
        if (!forceRefresh && this.awardList.length > 0) {
            return
        }

        let url = DataManager.getURL("LOAD_TURN_DRAW_STATUS")
        
        let params = {            
            gameid: DataManager.Instance.gameId,
            channel: 1, 
            activityId: 21238,
            uid: DataManager.UserData.guid,
            sign: getMD5("uid=" + DataManager.UserData.guid + "&key=" + this.SIGN_KEY),
            pn: DataManager.Instance.packetName,

        }
        

        BaseFunc.HTTPGetRequest(url, params, (msg) => {
            if (DataManager.Instance.isTesting)
                console.log(msg)
            if (msg && msg.ret == 0) {
                this.drawStatus.luckValue = msg.luckValue
                this.drawStatus.freeValue = msg.freeValue
                this.drawStatus.targetAddition[0] = msg.targetOne
                this.drawStatus.targetAddition[1] = msg.targetTwo
                this.drawStatus.targetAddition[2] = msg.targetThree
                this.drawStatus.targetAddition[3] = msg.targetFour
                


                DataManager.UserData.money = msg.money                
                this.updateDrawCount()
            }           
        }) 
    }

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
            pnum: 1,
            info: "SHOWDRAW"
        }
        

        BaseFunc.HTTPGetRequest(url, params, (msg) => {
            if (DataManager.Instance.isTesting)
                console.log(msg)
            if (msg && msg.result) {
                this.awardList = msg.result  
                this.refreshAwardList() 
            }           
        }) 
    }

    refreshAwardList() {
        this["sptRankLoading"].active = false
        let allRankText = ""
        let limit = Math.min(this.awardList.length, 20)
        for (let idx = 0; idx < limit; idx++) {
            const element = this.awardList[idx];
            // let previewItem = cc.instantiate(this["nodeRankItemPrefab"])
            // previewItem.active = true
            // previewItem.setPosition(0, 0)            
            
            let strName = element.wpPrizeInfo || ""
            if (strName.length > 6) strName = strName.substr(0, 6) + "..."

            allRankText += "<color=#9F652D>恭喜</c>" +  "<color=#9F652D>" + strName + "</c>" + 
            "<color=#9F652D>在新春嘉年华中获得</c>" + "<color=#9F652D>" + element.wpPrizeName+ "</c>" + "<color=#9F652D>奖励\n\n</c>"
            
            // this["nodeRankContent"].addChild(previewItem)  

        }
        this["labelRankItemDesc"].$RichText.string = allRankText
    }

    refreshPreviewItem() {

    }

    onPressClose() {
        this.close()
    }

    close() {
        SceneManager.Instance.closeScene(this)
    }
    
    onCloseScene() {
        if (this.initParam["closeCallback"])
            this.initParam["closeCallback"]()
    }
    
    update(dt) {
        this.updateTimer()
        this.updateRollPool(dt)
        this.updateRemainTime(dt)

    }

    updateTimer() {
        this.FrameCount++
        this.FrameCount%=60
        if(this.FrameCount == 0) {
            this.FrameSecond++
        }
    }

    updateRemainTime (dt) {
        
        this._delayTime += 1
        if (this._delayTime >= 60) {
            // this.getBuyCount()
            --this._remainTime
            this._remainTime = this._remainTime < 0 ? 0 : this._remainTime
            this._delayTime = 0
            if (this._remainTime == 0) {
                this.updateFreeButton(true)                
                this.updateNewDay()
            }
            this["labelFreeCounter"].$Label.string = sToTime(this._remainTime)
        }
    }



    onPressAdditionPanelClose() {
        this.closeAdditionDetailPanel()
    }

    openAdditionDetailPanel(idx) {
        this["nodeAdditionPanel"].active = true        
        
        this["labelAdditionDetailDesc"].$Label.string = "活动宝箱开启次数达到" + idx + "局可领取"
        this["labelAdditionDetailItem"].$Label.string = this.jackpotAwardList[idx].num
        this["sptAdditionDetailItem"].$Sprite.spriteFrame = this["icon_item_" + this.jackpotAwardList[idx].index]
        
    }

    closeAdditionDetailPanel() {
        this["nodeAdditionPanel"].active = false
    }


    initRollPool() {        
        
        this.switchRollPoolStatus(this.RollPoolStatusEnum.Idle)

        for (let i = 0; i < this.RollBallNum; i++) {  
            let rollball = cc.instantiate(this["nodeBallPrefab"])
            this["nodeRollPoolMask"].addChild(rollball)   
            this.RollBallInstances.push(rollball.getComponent("GashaponBall"))
            
            let initparam = {
                "moveSpeed":10,
                "dir":cc.v2(0, 0),
                "rotationSpeed":1,
                "acItemIndex":i%4
            }
            initparam.dir.x = BaseFunc.Random(1, 10)/10
            initparam.dir.y = BaseFunc.Random(1, 10)/10

            this.RollBallInstances[this.RollBallInstances.length-1].initBall(initparam)
            
            let lineIndex = 0

            if(i > this.RollBallNum * 0.3){
                if(BaseFunc.Random(0, 100) < 50) {
                    lineIndex = 1
                }
            }
            
            if(i > this.RollBallNum * 0.7) {
                if(BaseFunc.Random(0, 100) < 5) {
                    lineIndex = 2
                }
            }
            
            
            rollball.x = BaseFunc.Random(0, 300-lineIndex*20) - 300/2
            rollball.y = this.RollBallStayLine[lineIndex].b + BaseFunc.Random(0, 40)
        }
        
        this.reinitRollBallStay()
    }

    hideAwardBall() {
        if(this["sptAwardBall"].position.y = 0) {            
            let actionList = []
            actionList[actionList.length] = cc.delayTime(0.1)
            actionList[actionList.length] = cc.moveTo(0.2, 0, -72).easing(cc.easeSineInOut());          
            actionList[actionList.length] = cc.callFunc(function() {
                this["sptAwardBall"].y = 72    
            }),
            
            this["sptAwardBall"].stopAllActions()
            this["sptAwardBall"].runAction(cc.sequence(actionList))
        }else{
            this["sptAwardBall"].y = 72
        }
    }
    
    showAward() {
        
        let callback = () => {
            this.CurAwardList = []
            this.drawLock = false
            this.hideAwardBall()
        }
        
        if(this.CurAwardList.length > 0) {
            this.node["parentView"].setUpdateDataLock(false)
            showAwardMutipleResultPop(this.CurAwardList, [], callback)
        }else{
            callback()
        }
    }

    showAwardBall() {
        
        this["sptAwardBall"].stopAllActions()

        cc.tween(this["sptAwardBall"])
        .to(0.7, {position: cc.v2(0, 0)}, {easing: 'bounceOut'})
        .call(()=>{
            this.aniBigChestMotion(this.CurAwardList.length, 0.0001)
        })
        .delay(0.5)
        .call(() => {
            this.showAward();
        })
        .start()
            
        // let actionList = []
        // actionList[actionList.length] = cc.delayTime(0.1)
        // actionList[actionList.length] = cc.moveTo(0.2, 0, 0).easing(cc.easeBounceOut());  
        // actionList[actionList.length] = cc.callFunc(function() {
        //     this["sptAwardBall"].y = 72    
        // }),
        
        // this["sptAwardBall"].runAction(cc.sequence(actionList))

    }

    onBeforeRunning() {
        this.hideAwardBall()
    }

    onBeforeIdel() {
        if(this.RollPoolStatus == this.RollPoolStatusEnum.Stopping) {            
            this.switchRollPoolStatus(this.RollPoolStatusEnum.BeforeIdle)
            this.showAwardBall()
        }
    }

    switchRollPoolStatus(status) {
        switch (status) {
            case this.RollPoolStatusEnum.Idle:
                    this.RollBallInstances.forEach((rollball)=>{    
                        rollball.updateBallStatus(rollball.STATUSENUM.Idle)
                    })
                    break;
            case this.RollPoolStatusEnum.PrevRun:
                if(this.RollPoolStatus == this.RollPoolStatusEnum.Running) {
                    return
                }
                break;
            case this.RollPoolStatusEnum.Running:
                    this.RollBallInstances.forEach((rollball)=>{    
                        rollball.updateBallStatus(rollball.STATUSENUM.Running)
                    })
                    this.RollBallStartTime = this.FrameSecond
                    break;
            case this.RollPoolStatusEnum.Stopping:
                    break;
        }

        this.RollPoolStatus = status
    }

    updateRollPool(dt) {
        
        switch (this.RollPoolStatus) {
            case this.RollPoolStatusEnum.Idle:
                break;
            case this.RollPoolStatusEnum.PrevRun:
                this.RollBallInstances.forEach((rollball)=>{                                 
                    let initparam = {
                        "moveSpeed":this.RollBallSpeed.max,
                        "dir":cc.v2(0, 0),
                        "rotationSpeed":1,
                    }
                    initparam.dir.x = BaseFunc.Random(0, 20) - 10
                    initparam.dir.y = BaseFunc.Random(1, 10)
                    rollball.updateStatus(initparam)
                    rollball.move()
                })                
                this.onBeforeRunning()
                this.switchRollPoolStatus(this.RollPoolStatusEnum.Running)
                break;
            case this.RollPoolStatusEnum.Running:
                if(this.CollisionWallCheckCount == 1) {
                    this.CollisionWallCheckCount = 0
                    this.RollBallInstances.forEach((rollball)=>{
                        // let initparam = this.checkCollisionBall(rollball)
                        let initparam = this.checkCollisionWall(rollball)
                        rollball.updateStatus(initparam)
                        rollball.move()
                    })
                }else{
                    this.CollisionWallCheckCount++
                }
                if(this.FrameSecond - this.RollBallStartTime > this.RollBallMinTime) {
                    if(this.CurAwardList.length > 0) {
                        this.switchRollPoolStatus(this.RollPoolStatusEnum.Stopping)
                    }
                }
                break;
            case this.RollPoolStatusEnum.Stopping:
            case this.RollPoolStatusEnum.BeforeIdle:
                let stopBallNum = 0
                this.RollBallInstances.forEach((rollball)=>{                    
                    let initparam = {
                        "moveSpeed":0,
                        "dir":cc.v2(0, 0),
                        "rotationSpeed":1,
                    }

                    // initparam = this.checkCollisionBall(rollball)
                    initparam = this.checkCollisionWall(rollball)

                    if(initparam.moveSpeed <= 0) {
                        initparam.moveSpeed = 0
                        initparam.rotationSpeed = 0
                        stopBallNum++
                        rollball.updateBallStatus(rollball.STATUSENUM.Idle)                                
                        this.RollBallInstances.forEach((otherBall)=>{   
                            if (rollball !== otherBall && otherBall._status == otherBall.STATUSENUM.Idle) {
                                let distance = Math.sqrt(Math.pow(rollball.node.x - otherBall.node.x, 2) + Math.pow(rollball.node.y - otherBall.node.y, 2));
                                if (Math.ceil(distance) < rollball._innerRadius + otherBall._innerRadius - 3) {                
                                    let movedir = cc.v2(10, -2)
                                    if(rollball.node.x > otherBall.node.x) {
                                        movedir.x = -10;
                                    }
                                    if(otherBall.node.y < -145 - otherBall._radius) {
                                        movedir.y = 0
                                    }
                                    otherBall.shake(movedir)                                            
                                }
                            }
                        })
                        // this.switchRollPoolStatus(this.RollPoolStatusEnum.Idle)
                    }else if(initparam.moveSpeed <= 6) {                        
                        initparam.moveSpeed = rollball._moveSpeed - BaseFunc.Random(5, 20)/10
                    }else if(initparam.moveSpeed <= 10) {    
                        // for (let i = 0; i < this.RollBallStayLine.length; i++) {
                            let i = 0

                            // if(stopBallNum > this.RollBallNum * 0.3){
                            //     if(BaseFunc.Random(0, 100) < 80) {
                            //         i = 1
                            //     }
                            // }
                            
                            // if(stopBallNum > this.RollBallNum * 0.7) {
                            //     if(BaseFunc.Random(0, 100) < 50) {
                            //         i = 2
                            //     }
                            // }
                            // for (let j = 0; j < this.RollBallStayLine[i].num.length; j++) {
                                // if(this.RollBallStayLine[i].num[j] == 0) {
                                    let distance = Math.abs(rollball.node.position.y - this.RollBallStayLine[i].b)//Math.abs(element.k*rollball.node.position.x + rollball.node.position.y + element.b)/(Math.sqrt(1 + Math.pow(element.k, 2)))
                                    if(distance <= rollball._radius) {                                
                                        initparam.moveSpeed = --rollball._moveSpeed
                                        // initparam.rotationSpeed = 0
                                        // this.RollBallStayLine[i].num[j] = 1
                                        // break;
                                    }else{                                        
                                        this.RollBallInstances.forEach((otherBall)=>{   
                                            if (rollball !== otherBall && otherBall._status == otherBall.STATUSENUM.Idle) {
                                                distance = Math.sqrt(Math.pow(rollball.node.x - otherBall.node.x, 2) + Math.pow(rollball.node.y - otherBall.node.y, 2));
                                                if (Math.ceil(distance) < rollball._innerRadius + otherBall._innerRadius) {                
                                                    initparam.moveSpeed = BaseFunc.Random(10, 20)/10
                                                }
                                            }
                                        })
                                    }
                                // }
                            // }
                            
                        // }                    
                        // this.RollBallStayLine.forEach((element) => {
                        //     let distance = Math.abs(element.k*rollball.node.position.x + rollball.node.position.y + element.b)/(Math.sqrt(1 + Math.pow(element.k, 2)))
                        //     if(distance <= rollball._radius) {                                
                        //         initparam.moveSpeed = 0
                        //     }
                        // })
                    }else{
                        initparam.moveSpeed = initparam.moveSpeed - BaseFunc.Random(7, 15)/10
                    }
                    rollball.updateStatus(initparam)
                    rollball.move()
                })
                if(stopBallNum == this.RollBallNum) {
                    this.onBeforeIdel()
                    this.switchRollPoolStatus(this.RollPoolStatusEnum.Idle)
                }else if(this.RollBallNum - stopBallNum < 4) {                    
                    this.onBeforeIdel()
                }
                break;        
            default:
                break;
        }
    }

    checkCollisionBall(rollball:GashaponBall) {
        let initparam = {
            "moveSpeed":0,
            "dir":cc.v2(0, 0),
            "rotationSpeed":1,
        }
        initparam.moveSpeed = rollball._moveSpeed
        // initparam.moveSpeed = Math.min(initparam.moveSpeed, this.RollBallSpeed.max)
        initparam.dir = rollball._moveDir
        initparam.rotationSpeed = rollball._rotationSpeed

        this.RollBallInstances.forEach((otherBall)=>{   
            if (rollball !== otherBall) {
                let distance = Math.sqrt(Math.pow(rollball.node.x - otherBall.node.x, 2) + Math.pow(rollball.node.y - otherBall.node.y, 2));
                if (Math.ceil(distance) < rollball._innerRadius + otherBall._innerRadius) {
                    initparam.dir.x = -initparam.dir.x + BaseFunc.Random(1, 40)/100
                    initparam.dir.y = -initparam.dir.y + BaseFunc.Random(1, 40)/100
                }
            }
        })

        return initparam
    }

    checkCollisionWall(rollball:GashaponBall) {
        let initparam = {
            "moveSpeed":0,
            "dir":cc.v2(0, 0),
            "rotationSpeed":1,
        }
        initparam.moveSpeed = rollball._moveSpeed
        // initparam.moveSpeed = Math.min(initparam.moveSpeed, this.RollBallSpeed.max)
        initparam.dir = rollball._moveDir
        initparam.rotationSpeed = rollball._rotationSpeed

        for (let index = 0; index < this.RollWallFormulation.length; index++) {
            const element = this.RollWallFormulation[index];
            let distance = Math.abs(element.k*rollball.node.position.x - rollball.node.position.y + element.b)/(Math.sqrt(1 + Math.pow(element.k, 2)))
            
            switch (index) {
                case 0:
                    if((distance <= rollball._radius)) { 
                        initparam.dir.x = BaseFunc.Random(1, 10)/10    
                        initparam.rotationSpeed = BaseFunc.Random(0, 50) - 25
                    }
                    break;
                case 1:
                    if((distance <= rollball._radius)) { 
                        initparam.dir.x = -BaseFunc.Random(1, 10)/10    
                        initparam.rotationSpeed = BaseFunc.Random(0, 50) - 25
                    }
                    break;
                case 2:
                    if((distance <= rollball._radius) || rollball.node.position.y > element.b) { 
                        initparam.dir.y = -BaseFunc.Random(1, 10)/10    
                        initparam.rotationSpeed = BaseFunc.Random(0, 50) - 25
                    }
                    break;
                case 3:               
                    if((distance <= rollball._radius) || rollball.node.position.y < element.b) { 
                        initparam.dir.y = BaseFunc.Random(1, 10)/10         
                        initparam.rotationSpeed = BaseFunc.Random(0, 50) - 25
                    }
                    break;            
                default:
                    break;
            }

        }

        
        return initparam
    }
}
