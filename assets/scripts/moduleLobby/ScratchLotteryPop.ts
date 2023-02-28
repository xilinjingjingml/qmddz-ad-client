import BaseComponent from "../base/BaseComponent";
import BaseFunc = require("../base/BaseFunc")
import SceneManager from "../base/baseScene/SceneManager";
import { iMessageBox, shuffle, getMD5, MsgBox, numberFormat } from "../base/BaseFuncTs";
import DataManager from "../base/baseData/DataManager";
import NetManager from "../base/baseNet/NetManager";
import { http } from "../base/utils/http";
import { math } from "../base/utils/math";

const { ccclass, property } = cc._decorator;

@ccclass
export default class ScratchLotteryPop extends BaseComponent {

    // LIFE-CYCLE CALLBACKS:
    thisComponentName = "ScratchLotteryPop"
    SIGN_KEY = "8923mjcm0d089d"

    maskMatrix: number[][] = []
    maskMatrixWidth = 80
    maskMatrixheight = 80
    maskMatrixWidthPer = 0
    maskMatrixHeightPer = 0

    enableDraw = false
    drawRadius = 5
    drawRadiusLimitMin = 20
    drawRadiusLimitMax = 40

    lockDraw = false

    curAwardList = {
        bet: 1,
        total: 0,
        num: []
    }

    drawActivtyID = 0

    betProConfig = [
        0,      //0倍
        1200,    //1倍
        400,    //2倍
        140,    //3倍
        50,    //4倍
        18,     //5倍
        6,     //6倍
    ]

    drawActivityConfig = [
        41239,
        41240,
        41241,
    ]

    drawActivityCostConfig = {
        41239: 10000,
        41240: 50000,
        41241: 100000,
    }

    drawConfig = {
        [this.drawActivityConfig[0]]: {
            2000: [1],
            4000: [1, 2],
            6000: [1, 2],
            7500: [1, 3],
            9000: [1, 2, 3],
            12000: [1, 2, 3, 4],
            15000: [1, 2, 3],
            24000: [2, 3, 4, 5, 6],
            50000: [4, 5],
        },
        [this.drawActivityConfig[1]]: {
            10000: [1],
            20000: [1, 2],
            30000: [1, 2],
            35000: [1, 3],
            45000: [1, 2, 3],
            60000: [1, 2, 3, 4],
            75000: [1, 2, 3],
            120000: [2, 3, 4, 5, 6],
            250000: [4, 5],
            400000: [4, 5],
        },
        [this.drawActivityConfig[2]]: {
            20000: [1],
            40000: [1, 2],
            60000: [1, 2],
            75000: [1, 3],
            90000: [1, 2, 3],
            120000: [1, 2, 3, 4],
            150000: [1, 2, 3],
            240000: [2, 3, 4, 5, 6],
            500000: [4, 5],
            1000000: [4, 5],
        }
    }

    wizardFingerRoute = [
        cc.v2(-134, -11),
        cc.v2(3, 53),
        cc.v2(11, -38),
        cc.v2(169, 56),
    ]

    curSceneUserMoney = 0
    // onLoad () {}

    trumpetMsg = []

    onLoad() {
        cc.log("ScratchLotteryPop onOpenScene")

        this.initMaskMatrix()
        this.registerTouch(true)
        this.onPressSelectLevel(null, 0)
        this.fixPopPosition()

        this.updateUserMoney()

        this.trumpetMsg = []

        this.initTrumpetAni()
        
        let prevAward = DataManager.load(this.thisComponentName + "award")
        
        if (!!prevAward) {
            this.curAwardList = prevAward
            this.openAdditionDetailPanel()   
        }
    }

    updateUserMoney(fakenum = -1) {
        if (fakenum < 0) {
            this.curSceneUserMoney = DataManager.UserData.money
            fakenum = DataManager.UserData.money
        }
        this["labelUserMoney"].$Label.string = numberFormat(fakenum)
    }

    proto_lc_send_user_data_change_not(message) {
        if (!this.lockDraw) {
            this.updateUserMoney()
        }
    }

    proto_lc_reload_user_data_ack(message) {
        if (!this.lockDraw) {
            this.updateUserMoney()
        }
    }

    proto_lc_broadcast_message_not(message) {
        let msg = message.packet
        msg.message = msg.msg
        if (msg.message.indexOf("在幸运刮刮乐中获得") != -1) {
            let formatmsg = msg.message.split("在幸运刮刮乐中获得")

            let pushMsgFun = () => {
                this.trumpetMsg.push({
                    user: formatmsg[0] + "在幸运刮刮乐中获得",
                    money: formatmsg[1]
                })

            }
            if (this.checkSelf(msg)) {
                let action0 = []
                action0[action0.length] = cc.delayTime(10)
                action0[action0.length] = cc.callFunc(() => {
                    pushMsgFun()
                })
                this["nodeTrumpet"].runAction(cc.sequence(action0));
            } else {
                pushMsgFun()
            }
        }
    }


    checkSelf(message) {
        let msg = message.message.split("|")
        if (message.gameId == 1) {
            return msg.length != 2 && msg[1] != "isWait" && message.message.indexOf(DataManager.UserData.nickname) != -1
        }
        if (msg.length == 1)
            return false

        let playername = msg[0] as string
        return msg.length != 6 && msg[5] != "isWait" && playername.indexOf(DataManager.UserData.nickname) != -1
    }

    initTrumpetAni() {
        for (let i = 0; i < 3; i++) {
            let repreatFun = () => {
                let actionList = []
                actionList[actionList.length] = cc.callFunc(() => {
                    if (this.trumpetMsg.length > 0) {
                        let curMsg = this.trumpetMsg.pop()
                        this["labelTrump" + i].$RichText.string = "<color=#ffffff>" + curMsg.user + "</color>" + "<color=#ffff00>" + curMsg.money + "</color>"
                    } else {
                        this["labelTrump" + i].$RichText.string = ""
                    }
                })
                actionList[actionList.length] = cc.moveTo(6, cc.v2(-300, this["labelTrump" + i].y))
                actionList[actionList.length] = cc.callFunc(() => {
                    this["labelTrump" + i].x = 900
                })
                this["labelTrump" + i].stopAllActions()
                this["labelTrump" + i].runAction(cc.repeatForever(cc.sequence(actionList)));
            }

            let action0 = []
            action0[action0.length] = cc.delayTime(2 * i)
            action0[action0.length] = cc.callFunc(() => {
                repreatFun()
            })
            this["labelTrump" + i].x = 900
            this["labelTrump" + i].stopAllActions()
            this["labelTrump" + i].runAction(cc.repeatForever(cc.sequence(action0)));
        }

    }

    fixPopPosition() {
        var worldCenter = this.node.parent.parent.parent.convertToWorldSpaceAR(cc.v2(0, 0))
        var localCenter = this["nodeAdditionPanel"].parent.convertToNodeSpaceAR(worldCenter)
        this["nodeAdditionPanel"].position = localCenter
    }

    __bindButtonHandler() {
        // BaseFunc.AddClickEvent(this["btn_close"], this.node, this.thisComponentName, "onPressClose", 0, 0);
        // BaseFunc.AddClickEvent(this["btnBuy"], this.node, this.thisComponentName, "onPressBuy", 0, 0);

        BaseFunc.AddClickEvent(this["btnContinueScratch"], this.node, this.thisComponentName, "onPressContinueScratch", 0, 0);
        BaseFunc.AddClickEvent(this["btnBuyScratch"], this.node, this.thisComponentName, "onPressBuy", 0, 0);
        BaseFunc.AddClickEvent(this["btnAdditionPanelClose"], this.node, this.thisComponentName, "onPressAdditionPanelClose", 0, 3);

        BaseFunc.AddClickEvent(this["btnShop"], this.node, this.thisComponentName, "onPressShop", 0, 3);
        BaseFunc.AddClickEvent(this["btnHelp"], this.node, this.thisComponentName, "onPressHelp", 0, 3);
        BaseFunc.AddClickEvent(this["nodeHelpMask"], this.node, this.thisComponentName, "onPressHelpMask", 0, 3);



        BaseFunc.AddToggleCheckEvent(this["btnSelectLevel0"], this.node, this.thisComponentName, "onPressSelectLevel", 0)
        BaseFunc.AddToggleCheckEvent(this["btnSelectLevel1"], this.node, this.thisComponentName, "onPressSelectLevel", 1)
        BaseFunc.AddToggleCheckEvent(this["btnSelectLevel2"], this.node, this.thisComponentName, "onPressSelectLevel", 2)
    }

    onPressHelp() {
        this["nodeHelp"].active = true
    }

    onPressHelpMask() {
        this["nodeHelp"].active = false
    }

    onPressShop() {
        // SceneManager.Instance.popScene("moduleLobby", "ShopPop");
    }

    onPressSelectLevel(EventTouch, data) {
        switch (data) {
            case 1:
                this.updateDrawIndex(this.drawActivityConfig[1])
                this["labelMainTip0"].$Label.string = "刮40万大奖"
                break;
            case 2:
                this.updateDrawIndex(this.drawActivityConfig[2])
                this["labelMainTip0"].$Label.string = "刮100万大奖"
                break;
            default:
                this.updateDrawIndex(this.drawActivityConfig[0])
                this["labelMainTip0"].$Label.string = "刮5万大奖"
                break;
        }
    }

    initMaskMatrix() {
        this.maskMatrixWidthPer = this["nodeScratchArea"].width / this.maskMatrixWidth
        this.maskMatrixHeightPer = this["nodeScratchArea"].height / this.maskMatrixheight

        for (let i = 0; i < this.maskMatrixWidth; i++) {
            this.maskMatrix[i] = []
            for (let j = 0; j < this.maskMatrixheight; j++) {
                this.maskMatrix[i][j] = 1;
            }
        }
    }

    updateMaskMatrix(point) {
        let curX = point.x + this["nodeScratchArea"].width / 2
        let curY = point.y + this["nodeScratchArea"].height / 2

        let startX = Math.round((curX - this.drawRadius) / this.maskMatrixWidthPer)
        let endX = Math.round((curX + this.drawRadius) / this.maskMatrixWidthPer)
        let startY = Math.round((curY - this.drawRadius) / this.maskMatrixHeightPer)
        let endY = Math.round((curY + this.drawRadius) / this.maskMatrixHeightPer)

        startX = startX < 0 ? 0 : startX
        startX = startX > this.maskMatrixWidth ? this.maskMatrixWidth : startX

        endX = endX < 0 ? 0 : endX
        endX = endX > this.maskMatrixWidth ? this.maskMatrixWidth : endX

        startY = startY < 0 ? 0 : startY
        startY = startY > this.maskMatrixheight ? this.maskMatrixheight : startY

        endY = endY < 0 ? 0 : endY
        endY = endY > this.maskMatrixheight ? this.maskMatrixheight : endY


        for (let i = startX; i < endX; i++) {
            for (let j = startY; j < endY; j++) {
                this.maskMatrix[i][j] = 0;
            }
        }
    }

    getMaskMatrixRate() {
        let counter = 0
        for (let i = 0; i < this.maskMatrixWidth; i++) {
            for (let j = 0; j < this.maskMatrixheight; j++) {
                if (this.maskMatrix[i][j] == 0) {
                    counter++
                }
            }
        }
        return counter / (this.maskMatrixWidth * this.maskMatrixheight)
    }

    onCloseScene() {
        cc.log("ScratchLotteryPop onCloseScene")
    }


    getLocalPoint(point) {
        let localpoint = point
        localpoint = this["nodeScratchArea"].convertToNodeSpaceAR(point);
        return localpoint
    }

    _onTouchBegin(event) {
        if (!this.enableDraw) {
            return
        }
        // cc.log("_onTouchBegin")        
        let point = event.touch.getLocation();
        point = this.getLocalPoint(point)
        this._addCircle(point);
        this.hideWizard()
    }

    _onTouchMoved(event) {
        if (!this.enableDraw) {
            return
        }
        // cc.log("_onTouchMoved")  
        let point = event.touch.getLocation();
        point = this.getLocalPoint(point)
        this._addCircle(point);

    }

    _onTouchEnd(event) {
        if (!this.enableDraw) {
            return
        }
        // cc.log("_onTouchEnd")  
        let point = event.touch.getLocation();
        point = this.getLocalPoint(point)
        this._addCircle(point);
        this.drawRadius = this.drawRadiusLimitMin

    }

    _onTouchCancel(event) {
        if (!this.enableDraw) {
            return
        }
        // cc.log("_onTouchCancel")
    }

    registerTouch(flag = false) {
        if (!!flag) {
            this["nodeScratchArea"].on(cc.Node.EventType.TOUCH_START, this._onTouchBegin, this);
            this["nodeScratchArea"].on(cc.Node.EventType.TOUCH_MOVE, this._onTouchMoved, this);
            this["nodeScratchArea"].on(cc.Node.EventType.TOUCH_END, this._onTouchEnd, this);
            this["nodeScratchArea"].on(cc.Node.EventType.TOUCH_CANCEL, this._onTouchCancel, this);
        } else {
            this["nodeScratchArea"].off(cc.Node.EventType.TOUCH_START, this._onTouchBegin, this);
            this["nodeScratchArea"].off(cc.Node.EventType.TOUCH_MOVE, this._onTouchMoved, this);
            this["nodeScratchArea"].off(cc.Node.EventType.TOUCH_END, this._onTouchEnd, this);
            this["nodeScratchArea"].off(cc.Node.EventType.TOUCH_CANCEL, this._onTouchCancel, this);
        }
    }

    updateDrawIndex(index) {
        this.drawActivtyID = index
    }

    proto_lc_store_safe_amount_ack(message) {
        message = message.packet
        if (message.ret != -1){
            let initParam = {
                title: "提示",
                buttonNum: 1,
                confirmClose: true,
                content: "购买刮刮卡需要消耗:" + this.drawActivityCostConfig[this.drawActivtyID] + "金豆",
                confirmFunc: () => {
                    this.http_scratch_draw()
                },
            }
            MsgBox(initParam)
        }
        else 
            iMessageBox("您有未完成的游戏,请先完成游戏!")
    }

    onPressBuy() {
        let socketMsg = {
            opcode: "proto_cl_store_safe_amount_req",
            plyGuid: DataManager.UserData.guid,
            amount: 0
        }
        NetManager.Instance.send("lobby", socketMsg)        
    }

    debugAward(num) {
        let testFormat = (index) => {
            this.updateDrawIndex(index)
            for (const key in this.drawConfig[index]) {
                for (let i = 0; i < 10; i++) {
                    this.formatAward(key)
                }
            }
        }
        testFormat(this.drawActivityConfig[1])
        testFormat(this.drawActivityConfig[2])
        testFormat(this.drawActivityConfig[3])
    }

    getAward(num) {
        this.curAwardList.bet = 1
        this.curAwardList.num = []
        this.curAwardList.total = num

        this.formatAward(num)
        // this.debugAward(num)
    }

    formatAward(num) {
        let curConfig = this.drawConfig[this.drawActivtyID]
        if (!curConfig) {
            cc.error(this.drawActivtyID, this.drawConfig)
            return
        }
        if (!curConfig[num]) {
            cc.error(num, curConfig)
            return
        }
        let param = {
            bet: 1,
            num: []
        }

        let totalRate = 0
        for (const key in curConfig[num]) {
            const element = curConfig[num][key];
            totalRate += this.betProConfig[element]
        }
        let rndRate = math.random(totalRate)
        for (const key in curConfig[num]) {
            const element = curConfig[num][key];
            if (rndRate < this.betProConfig[element]) {
                this.curAwardList.bet = element
            } else {
                rndRate -= this.betProConfig[element]
            }
        }

        let baseNum = Math.floor(num / this.curAwardList.bet)

        let baseRange = Math.round(baseNum / 100)
        let howmanyitem = math.random(2, 4)
        for (let i = 0; i < howmanyitem; i++) {
            let num = math.random(1, Math.floor(baseRange * 0.8))
            baseRange -= num
            this.curAwardList.num.push(num * 100)
        }
        this.curAwardList.num.push(baseRange * 100)

        this.prepareScrathItem()
        // this.showAward()
        DataManager.save(this.thisComponentName + "award", this.curAwardList)
        
    }

    prepareScrathItem() {
        this["nodeScratchTip0"].active = false
        this.enableDraw = true

        this["nodeScratchContent"].removeAllChildren()
        let totalItemSize = 9

        let childrenAsset = []

        if (this.curAwardList.bet > 1) {
            let awardItem = cc.instantiate(this["nodeItemStarPrefab"])
            awardItem.active = true
            for (let i = 0; i < 5; i++) {
                awardItem.getChildByName("nodeItemStarFix").getChildByName("star" + i).active = false
            }
            for (let i = 0; i < (this.curAwardList.bet - 1); i++) {
                awardItem.getChildByName("nodeItemStarFix").getChildByName("star" + i).active = true
            }

            childrenAsset.push(awardItem)
            totalItemSize--
        }

        for (const key in this.curAwardList.num) {
            const element = this.curAwardList.num[key];
            let awardItem = cc.instantiate(this["nodeItemBeanPrefab"])
            awardItem.active = true
            awardItem.getChildByName("labelItemNum").getComponent(cc.Label).string = element

            // let action0 = []
            // action0[action0.length] = cc.fadeTo(0.7, 255)
            // action0[action0.length] = cc.fadeTo(0.7, 1)
            // awardItem.getChildByName("sptItemPrev").opacity = 1
            // awardItem.getChildByName("sptItemPrev").runAction(cc.repeatForever(cc.sequence(action0)));

            childrenAsset.push(awardItem)
            totalItemSize--
        }

        for (let i = 0; i < totalItemSize; i++) {
            let awardItem = cc.instantiate(this["nodeEmptyPrefab"])
            awardItem.active = true
            childrenAsset.push(awardItem)
        }

        shuffle(childrenAsset)

        for (const key in childrenAsset) {
            this["nodeScratchContent"].addChild(childrenAsset[key])
        }

        this.scratchWizard()
    }

    scratchWizard() {
        let actionList = []
        actionList[actionList.length] = cc.delayTime(1.5)
        actionList[actionList.length] = cc.callFunc(() => {
            if (this.getMaskMatrixRate() == 0) {
                cc.log("need scratchWizard")
                this.showWizard()
            }
        })
        this["nodeScratchTip"].runAction(cc.sequence(actionList));
    }

    showWizard() {
        this["nodeScratchTip1"].active = true

        this["sptWizardFinger"].position = this.wizardFingerRoute[0]
        let actionList = []
        actionList[actionList.length] = cc.moveTo(0.01, this.wizardFingerRoute[0])
        actionList[actionList.length] = cc.fadeTo(0.2, 255)
        actionList[actionList.length] = cc.moveTo(0.5, this.wizardFingerRoute[1])
        actionList[actionList.length] = cc.moveTo(0.5, this.wizardFingerRoute[2])
        actionList[actionList.length] = cc.moveTo(0.5, this.wizardFingerRoute[3])
        actionList[actionList.length] = cc.delayTime(0.5)
        actionList[actionList.length] = cc.fadeTo(0.2, 1)

        this["sptWizardFinger"].opacity = 1
        this["sptWizardFinger"].stopAllActions()
        this["sptWizardFinger"].runAction(cc.repeatForever(cc.sequence(actionList)));
    }

    hideWizard() {
        this["nodeScratchTip"].stopAllActions()
        this["nodeScratchTip1"].active = false
    }

    http_scratch_draw() {
        if (this.drawActivityConfig.indexOf(this.drawActivtyID) < 0) {
            cc.error("unknow this.drawActivtyID", this.drawActivtyID)
            return
        }

        if (DataManager.UserData.money < this.drawActivityCostConfig[this.drawActivtyID]) {
            SceneManager.Instance.popScene("moduleLobby", "UnenoughGuidePop")
            return
        }

        if (!!this.lockDraw) {
            iMessageBox("宝箱开启中请稍等~")
            return
        }

        this.lockDraw = true
        this.node["parentView"].setUpdateDataLock(true)

        let url = DataManager.getURL("EXECUTE_TURN_DRAW")

        let params = {
            gameid: DataManager.Instance.gameId,
            channel: 1,
            activityId: this.drawActivtyID,
            uid: DataManager.UserData.guid,
            sign: getMD5("uid=" + DataManager.UserData.guid + "&key=" + this.SIGN_KEY),
            pn: DataManager.Instance.packetName,
            pnum: 1,
            taskid: 0
        }

        this.updateUserMoney(this.curSceneUserMoney - this.drawActivityCostConfig[this.drawActivtyID])
        this.node["parentView"].refreshUserData(this.curSceneUserMoney - this.drawActivityCostConfig[this.drawActivtyID])
        http.open(url, params, (msg) => {
            cc.log(msg)
            if (msg) {
                if (msg.ret == 0) {
                    cc.log(msg)
                    // DataManager.UserData.money = msg.money
                    let totalNum = 0
                    let awards = []
                    for (let k in msg.json) {
                        awards.push({ index: msg.json[k].index, num: msg.json[k].prizeNum })
                        if (msg.json[k].index == 0) {
                            totalNum += msg.json[k].prizeNum
                        }
                    }
                    this.getAward(totalNum)
                } else {

                }
            }
        })
    }

    showAward() {
        this.fillMask()

        this.updateUserMoney()        
        this.node["parentView"].setUpdateDataLock(false)

        let actionList = []
        actionList[actionList.length] = cc.delayTime(1)
        actionList[actionList.length] = cc.delayTime(0.1)
        actionList[actionList.length] = cc.callFunc(() => {
            this.openAdditionDetailPanel()
        })
        this["nodeScratchContent"].runAction(cc.sequence(actionList));

    }

    initMask() {
        let graphics = this["sptScratchMask"].$Mask._graphics;
        graphics.clear()

        this.initMaskMatrix()

    }

    fillMask() {
        let graphics = this["sptScratchMask"].$Mask._graphics;
        graphics.rect(-this["nodeScratchArea"].width / 2, -this["nodeScratchArea"].height / 2, this["nodeScratchArea"].width, this["nodeScratchArea"].height)
        graphics.fill()
    }

    _addCircle(point) {
        this.drawRadius += 0.1
        this.drawRadius = this.drawRadius++ > this.drawRadiusLimitMax ? this.drawRadiusLimitMax : this.drawRadius++
        let graphics = this["sptScratchMask"].$Mask._graphics;
        graphics.circle(point.x, point.y, this.drawRadius)
        graphics.fill()
        this.updateMaskMatrix(point)
        if (this.getMaskMatrixRate() > 0.8) {
            this.drawRadius = this.drawRadiusLimitMin
            this.showAward()
        }
    }

    onPressClose() {
        this.close()
    }

    close() {
        SceneManager.Instance.closeScene("ScratchLotteryPop")
    }


    onPressContinueScratch() {
        this.closeAdditionDetailPanel()
        this.onPressBuy()
    }

    onPressAdditionPanelClose() {
        this.closeAdditionDetailPanel()
    }

    openAdditionDetailPanel() {
        this["nodeAdditionPanel"].active = true

        this["labelAdditionMain"].$Label.string = "总计获得:" + this.curAwardList.total + "金豆"

        let descString = "基础奖励:\n"
        let baseNum = 0
        for (let i = 0; i < this.curAwardList.num.length; i++) {
            const element = this.curAwardList.num[i];
            baseNum += element
            descString += element + "金豆"
            if (i != this.curAwardList.num.length-1) {
                descString += "+"
            }
        }
        descString += "=" + baseNum + "金豆"
        if (this.curAwardList.bet > 1) {
            descString += "\n额外获得" + (this.curAwardList.bet - 1) + "星加成, 总奖励x" + this.curAwardList.bet
        }

        this["labelAdditionDesc"].$Label.string = descString

        DataManager.save(this.thisComponentName + "award", null)
    }

    closeAdditionDetailPanel() {
        this["nodeAdditionPanel"].active = false
        this.lockDraw = false
        this["nodeScratchTip0"].active = true
        this.initMask()
        this.enableDraw = false
    }
}
