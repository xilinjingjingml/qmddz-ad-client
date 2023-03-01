import { AdsConfig } from "../base/baseData/AdsConfig";
import DataManager from "../base/baseData/DataManager";
import { enterGame, findStringIndexs, getLowMoneyRoom, iMessageBox, numberFormat, playAD, showAwardResultPop, unenoughGold, czcEvent, playADBanner } from "../base/BaseFuncTs";
import NetManager from "../base/baseNet/NetManager";
import BaseScene from "../base/baseScene/BaseScene";
import SceneManager from "../base/baseScene/SceneManager";
import { getTaskAward, getTaskList, sendReloadUserData } from "./LobbyFunc";

const {ccclass, property} = cc._decorator;

@ccclass
export default class TaskPop extends BaseScene {

    _taskNodes: any[] = []

    start () {

    }

    onOpenScene() {
        czcEvent("大厅", "任务", "打开")
        this.getActivityRewardsList()
        getTaskList(0)
        getTaskList(1)

        this.updateTaskList({message: {taskList: DataManager.CommonData["AchieveList"]}})
        this.updateTaskList({message: {taskList: DataManager.CommonData["TaskList"]}})

        if (DataManager.CommonData["gameServer"]) {
            playADBanner(false, AdsConfig.banner.All)
        }
    }

    onDestroy() {
        if (DataManager.CommonData["gameServer"]) {
            playADBanner(true, AdsConfig.banner.GameResultLayer_rpddz)
        }
    }

    gotoGame(gameId, level = null) {
        if (DataManager.CommonData["gameServer"]) 
            return;

        let servers = getLowMoneyRoom(gameId, level)
        if (servers.length > 0){
            let i = Math.floor(Math.random() * 100 % servers.length)
            enterGame(servers[i])
        }
        else if(DataManager.UserData.money < DataManager.Instance.getReliefLine()){
            // 没服务器就是初级场
            unenoughGold(0, DataManager.Instance.getReliefLine())
        }
        else if (level == 1) {
            iMessageBox("您的金豆过多无法进入")
        }
        else {
            iMessageBox("您的金豆不满足条件进入该场次")
        }
    }

    updateTaskList(message) {
        message = message.message

        if (null == message.taskList || 0 == message.taskList)
            return 

        for (let task of message.taskList) {
            if (null == this._taskNodes[task.cond]) {
                this._taskNodes[task.cond] = {taskInfo: []}
            }

            Object.assign(this._taskNodes[task.cond].taskInfo, task)

            this.updateShowList(task.cond)
        }

        this.sortTaskList()
    }

    sortTaskList() {      
        let content = cc.find("nodePop/nodeTaskList/view/content", this.node)

        let fn = 0;
        let bindPhone = false
        this._taskNodes.map(item => {
            if (item.taskInfo.type == 0 && item.taskInfo.status != 1) {
                bindPhone = true
                fn ++ 
            }
            if (item.taskInfo.status == 0 && item.taskInfo.value >= item.taskInfo.max){
                item.taskNode.setSiblingIndex(bindPhone ? 1 : 0)
                fn ++
            }
            else if (item.taskInfo.status == 1) {
                item.taskNode.setSiblingIndex(content.childrenCount)
            }
            else if (item.taskInfo.value != 0) {
                item.taskNode.setSiblingIndex(fn)
            }
        })
    }

    getTaskAwardDouble(gameId, index) {
        playAD(() => {
            czcEvent("大厅", "任务", "双倍领取看广告完成")
            getTaskAward(gameId, index, true)
        })
    }

    updateShowList(index = -1) {
        if (null == this._taskNodes[index])
            return 

        let task = this._taskNodes[index].taskInfo

        if (null == this._taskNodes[index].taskNode) {
            let model = cc.find("nodePop/nodeTaskList/item", this.node)
            let content = cc.find("nodePop/nodeTaskList/view/content", this.node)
    
            let self = this

            let item = cc.instantiate(model)
            item.active = true
            content.addChild(item)
            this._taskNodes[index].taskNode = item

            let btnJumpTo = cc.find("nodeState/btnJumpTo", item).getComponent(cc.Button)
            let clickEventHandler1 = new cc.Component.EventHandler();
            clickEventHandler1.target = this.node; 
            clickEventHandler1.component = "TaskPop";
            clickEventHandler1.handler = "onJumpTo" + task.index; 
            this["onJumpTo" + task.index] = () => {
                let gotoGameLevel = -1

                if (-1 != task.name.indexOf("绑定手机")) {
                    SceneManager.Instance.popScene("moduleLobby", "BindPhonePop")
                    self.closeSelf()
                }
                else if (-1 != task.name.indexOf("充值")){
                    SceneManager.Instance.popScene("moduleLobby", "ShopScene")
                    self.closeSelf()
                }
                else if (task.gameId != 0) {
                    self.gotoGame(task.gameId)
                }
                else if (findStringIndexs(task.name, ["看视频"]).length > 0) {
                    SceneManager.Instance.popScene("moduleLobby", "TreasureHuntPop")
                    self.closeSelf()                    
                }
                else if (findStringIndexs(task.name, ["新手场"]).length > 0) {
                    gotoGameLevel = 1
                }
                else if (findStringIndexs(task.name, ["初级场", "0.3元场"]).length > 0) {
                    gotoGameLevel = 2
                }
                else if (findStringIndexs(task.name, ["精英场"]).length > 0) {
                    gotoGameLevel = 3
                }
                else if (findStringIndexs(task.name, ["大师场"]).length > 0) {
                    gotoGameLevel = 4
                }
                else if (findStringIndexs(task.name, ["至尊场"]).length > 0) {
                    gotoGameLevel = 5
                }

                if(gotoGameLevel > 0) {
                    let gameId = DataManager.load(DataManager.UserData.guid + "lastGameId")
                    if (gameId != 389 && gameId != 391)
                        gameId = 3892
                    self.gotoGame(gameId, gotoGameLevel)
                }
            }          

            btnJumpTo.clickEvents.push(clickEventHandler1);

            let btnGetAward = cc.find("nodeState/btnGetAward", item).getComponent(cc.Button)
            let clickEventHandler2 = new cc.Component.EventHandler();
            clickEventHandler2.target = this.node; 
            clickEventHandler2.component = "TaskPop";
            clickEventHandler2.handler = "btnGetAward" + task.index;
            this["btnGetAward" + task.index] = () => {
                czcEvent("大厅", "任务", "点击单倍领取")
                getTaskAward(task.gameId, task.index)
            }          

            btnGetAward.clickEvents.push(clickEventHandler2);

            let btnGetAwardDouble = cc.find("nodeState/btnGetAwardDouble", item).getComponent(cc.Button)
            let clickEventHandler3 = new cc.Component.EventHandler();
            clickEventHandler3.target = this.node; 
            clickEventHandler3.component = "TaskPop";
            clickEventHandler3.handler = "btnGetAwardDouble" + task.index;
            this["btnGetAwardDouble" + task.index] = () => {
                czcEvent("大厅", "任务", "点击双倍领取")
                this.getTaskAwardDouble(task.gameId, task.index)
            }          

            btnGetAwardDouble.clickEvents.push(clickEventHandler3);
        }

        let item = this._taskNodes[index].taskNode
        item.getChildByName("taskName").getComponent(cc.Label).string = task.name
        for (let award of task.vecAwards) {
            if (award.itemIndex == 400) {
                continue
            }
            if (award.itemIndex == 369) {
                cc.find("award2/num", item).getComponent(cc.Label).string = numberFormat(award.itemNum)
            }else {
                cc.find("award1/num", item).getComponent(cc.Label).string = numberFormat(award.itemNum)
                const awardIcon = cc.find("award1/awardIcon/icon_" + award.itemIndex, item)
                if (awardIcon) {
                    awardIcon.active = true
                }
            }
        }

        item.getChildByName("lableProgress").getComponent(cc.Label).string = Math.min(task.value, task.max) + "/" + task.max
        item.getChildByName("progress").getComponent(cc.ProgressBar).progress = task.value / task.max
        item.getChildByName("lableProgress").active = task.max != 1
        item.getChildByName("progress").active = task.max != 1

        cc.find("nodeState/taskFinish", item).active = task.status == 1
        cc.find("nodeState/btnJumpTo", item).active = task.status == 0 && task.value < task.max && -1 == task.name.indexOf("游戏在线")
        cc.find("nodeState/btnGetAward", item).active = task.status == 0 && task.value >= task.max
        cc.find("nodeState/btnGetAwardDouble", item).active = task.status == 0 && task.value >= task.max
        let value = task.value
        item.stopAllActions()
        if (-1 != task.name.indexOf("游戏在线") && value < task.max) {            
            item.runAction(cc.repeat(cc.sequence(cc.delayTime(1), cc.callFunc(() =>{
                value ++ 
                item.getChildByName("lableProgress").getComponent(cc.Label).string = Math.min(value, task.max) + "/" + task.max
                item.getChildByName("progress").getComponent(cc.ProgressBar).progress = value / task.max
                if (value == task.max) {
                    item.stopAllActions()
                    getTaskList(1)
                }
            }))
            , task.max - task.value))
        }
    }

    proto_lc_get_at_achieve_award_ack(message) {
        message = message.packet
        if (message.ret == 0) {
            let awards = []
            for (let iter of message.vecAwards) {
                if (iter.itemIndex != 369){
                    let award = {index: iter.itemIndex, num: iter.itemNum}
                    awards.push(award)
                }
            }
            showAwardResultPop(awards)
            getTaskList(0)
            getTaskList(1)
            sendReloadUserData()
            this.getActivityRewardsList()
        }
        else {
            iMessageBox("领取出错啦")
        }
    }

    getActivityRewardsList() {
        let socketMsg = {
            opcode: "proto_cl_get_activity_rewards_list_req"
        }
        NetManager.Instance.send("lobby", socketMsg)
    }

    proto_lc_get_activity_rewards_list_ack(message) {
        message = message.packet
        DataManager.CommonData["activityRewards"] = message
        this.updateActivityRewards()
    }

    updateActivityRewards() {
        let message = DataManager.CommonData["activityRewards"]

        let nodeProgress = cc.find("nodePop/nodeProgress", this.node)

        let activity = message.activity
        nodeProgress.getChildByName("livelyValue").getComponent(cc.Label).string = activity
        let self = this
        let max = 0;
        for (let idx = 0; idx < message.configs.length; idx ++) {
            let config = message.configs[idx]
            cc.find("box" + (idx + 1) + "/value", nodeProgress).getComponent(cc.Label).string = config.activity
            
            let btnBox = cc.find("box" + (idx + 1) + "/btnBox", nodeProgress).getComponent(cc.Button)
            btnBox.node.active = config.award == 0
            if (btnBox.clickEvents.length == 0) {
                let clickEventHandler2 = new cc.Component.EventHandler();
                clickEventHandler2.target = this.node; 
                clickEventHandler2.component = "TaskPop";
                clickEventHandler2.handler = "btnBox" + config.activity; 
                this["btnBox" + config.activity] = () => {
                    if (DataManager.CommonData["activityRewards"].activity >= config.activity) {
                        btnBox.interactable = false
                        btnBox.node.runAction(cc.sequence(cc.delayTime(2), cc.callFunc(() => btnBox.interactable = true)))
                        self.getActivityReward(config.activity)
                    }
                    else {
                        let awards = []
                        for(let iter of config.items) {
                            let award = {
                                index: iter.itemIndex,
                                num: iter.itemNum
                            }
                            awards.push(award)
                        }
                        SceneManager.Instance.popScene("moduleLobby", "TaskLivelyPop", {awards: awards, activity: config.activity})
                    }
                }          

                btnBox.clickEvents.push(clickEventHandler2);
            }

            cc.find("box" + (idx + 1) + "/boxOpen", nodeProgress).active = !btnBox.node.active
            cc.find("box" + (idx + 1) + "/finish", nodeProgress).active = activity >= config.activity
            //cc.find("box" + (idx + 1) + "/finish/task_box_light", nodeProgress).active = btnBox.node.active
            max = config.activity
        }

        nodeProgress.getChildByName("livelyProgress").getComponent(cc.ProgressBar).progress = (activity - 30) / (max - 30)
    }

    getActivityReward(activity) {
        let socketMsg = {
            opcode: "proto_cl_get_activity_reward_req",
            activity: activity
        }
        NetManager.Instance.send("lobby", socketMsg)
    }

    proto_lc_get_activity_reward_ack (message) {
        message = message.packet
        if (-1 == message.ret)
            iMessageBox("奖励不存在")
        else if (-2 == message.ret)
            iMessageBox("活跃度不满足")
        else if (-3 == message.ret)
            iMessageBox("奖励已领取")
        else if (0 == message.ret){
            iMessageBox("领取成功")

            let configs =  DataManager.CommonData["activityRewards"].configs
            for(let idx = 0; idx <configs.length; idx++)  {
                let iter = configs[idx]
                if (iter.activity == message.activity) {
                    let awards = []
                    for (let i of iter.items) {
                        let award = {index: i.itemIndex, num: i.itemNum}
                        awards.push(award)
                    }
                    showAwardResultPop(awards)
                    configs[idx].award = 1
                    break;
                }
            }
            sendReloadUserData()
            this.updateActivityRewards()
            // this.getActivityRewardsList()
        }
    }
}
