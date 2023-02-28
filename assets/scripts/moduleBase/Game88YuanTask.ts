import BaseFunc = require("../base/BaseFunc")
import BaseComponent from "../base/BaseComponent"
import DataManager from "../base/baseData/DataManager";


const {ccclass, property} = cc._decorator;

@ccclass
export default class Game88YuanTask extends BaseComponent {


    @property
    thisComponentName:string = "Game88YuanTask"

    awardConfig = {
        1:["1000",  "2000",   "5000"],
        2:["1w", "2w",  "5w"],
        2.5:["3w", "7w",  "18w"],
        3:["10w","20w", "58w"],
    }

    changciDesc = {
        1:"0.3元场",
        2:"2元场",
        2.5:"10元场",
        3:"50元场",
    }

    awardMapping = {
        1:1,
        2:2,
        2.5:4,
        3:3,
    }

    // LIFE-CYCLE CALLBACKS:

    GetMoneyShortString(money, type = 0) {
        if (money < 10000) {
            return money
        }

        let fix = ["w", "y"]
        if (type == 1) {
            fix = ["万", "亿"]
        }

        if (money < 100000000) {
            money = money / 10000
            money = Math.round(money) + fix[0]
        }else{
            money = money / 100000000
            money = Math.round(money) + fix[1]
        }
        return money
    }
    // onLoad () {}
    __bindButtonHandler() {
        
        BaseFunc.AddClickEvent(this.btnClose, this.node, this.thisComponentName, "onPressClose", 0, 0);
        // BaseFunc.AddClickEvent(this["nodeItem0"].getChildByName("nodeItemBg0_1"), this.node, this.thisComponentName, "onPressGetAward", 0, 0);
        // BaseFunc.AddClickEvent(this["nodeItem1"].getChildByName("nodeItemBg0_1"), this.node, this.thisComponentName, "onPressGetAward", 0, 0);
        // BaseFunc.AddClickEvent(this["nodeItem2"].getChildByName("nodeItemBg0_1"), this.node, this.thisComponentName, "onPressGetAward", 0, 0);

        BaseFunc.AddClickEvent(this["nodeItem0"].getChildByName("btn_getaward0"), this.node, this.thisComponentName, "onPressGetAward", 0, 1);
        BaseFunc.AddClickEvent(this["nodeItem1"].getChildByName("btn_getaward0"), this.node, this.thisComponentName, "onPressGetAward", 0, 1);
        BaseFunc.AddClickEvent(this["nodeItem2"].getChildByName("btn_getaward0"), this.node, this.thisComponentName, "onPressGetAward", 0, 1);
        
    }

    start () {    
        
        this.logic = this.initParam.logic        

        // this.labelWarningTip.active = (this.logic.serverInfo.level == 2)

        // if (1572796800) {
            
        // }

        this.refreshView();


    }

	proto_gc_get_redpackets_88yuan_award_ack(event) {
        let message = event.packet
        
        cc.log(message)

        this.logic.redpacket_88Yuan_info = message        

        this.refreshView();
    }

    refreshView() {

        let awardIndex = this.logic.serverInfo.level || 1
        if (this.logic.serverInfo.gameId == 390 && awardIndex == 5)
            awardIndex = 3
            
        if (awardIndex >= 1 && awardIndex <=3) {
            
            this.labelChangCi.$Label.string = "局任意" + this.changciDesc[awardIndex] + "即可领取";

            this["sptMainTitle2.5"].active = false
            for (let index = 0; index < 3; index++) {
                this["sptMainTitle" + (index +1)].active = false
                this["nodeItem" + index].getChildByName("nodeItemBg0_1").getChildByName("labelAwardEnable").getComponent(cc.Label).string = "x" + this.awardConfig[awardIndex][index]
                this["nodeItem" + index].getChildByName("nodeItemBg0_2").getChildByName("labelAwardDis").getComponent(cc.Label).string = "x" + this.awardConfig[awardIndex][index]
            }
            this["sptMainTitle"+awardIndex].active = true
        }else{
            cc.error("this.logic.serverInfo.level", this.logic.serverInfo)
        }

        let yuan = this.logic.redpacket_88Yuan_info.nAmount
        this.labelAward.$Label.string = this.GetMoneyShortString(yuan,1) + "红包券" 

        this.initItem()

        this.refreshRedPacketInfo(this.logic.redpacket_88Yuan_info.curRounds, this.logic.redpacket_88Yuan_info.limitRounds)

        if (this.logic.redpacket_88Yuan_info.ret == 3) {
            this.nodeTip1.active = false
            this.nodeTip2.active = true
            for (let index = 0; index < 3; index++) {
                this.refreshItem(index, 2)
            }
            return
        }else{
            this.nodeTip1.active = true
            this.nodeTip2.active = false
        }
        
        this.refreshItem(this.logic.redpacket_88Yuan_info.taskId, this.logic.redpacket_88Yuan_info.ret)
    }

    refreshItem(index, status) {
        if (index < 0 || index > 2) {
            cc.log("refreshItem wrong index")
            return
        }
        

        this["nodeItem" + index].getChildByName("nodeItemBg0_1").active = false
        this["nodeItem" + index].getChildByName("nodeItemBg0_2").active = false
        this["nodeItem" + index].getChildByName("nodeItemStatus0_1").active = false
        this["nodeItem" + index].getChildByName("nodeItemStatus0_2").active = false
        this["nodeItem" + index].getChildByName("nodeItemBg0_1").getChildByName("nodeItemIcon").getChildByName("nodeItemIcon0").parent.active = false
        
        this.refreshItem(index - 1, 2)
        
        // if (status > 0 && status < 3) {    
        //     this["nodeItem" + index].getChildByName("nodeItemBg0_" + status).active = true
        //     this["nodeItem" + index].getChildByName("nodeItemStatus0_" + status).active = true

        //     if (status == 1) {
        //         this["nodeItem" + index].getChildByName("btn_getaward0").active = true  
        //         this["nodeItem" + i].getChildByName("nodeItemIcon0").parent.active = true  
        //     }
        // }else{  
        //     this["nodeItem" + index].getChildByName("nodeItemBg0_1").active = true   
        //     this["nodeItem" + i].getChildByName("nodeItemIcon0").parent.active = true  
        // }

        switch (status) {
            case 1:     
                this["nodeItem" + index].getChildByName("btn_getaward0").active = true  
                this["nodeItem" + index].getChildByName("nodeItemBg0_1").getChildByName("nodeItemIcon").getChildByName("nodeItemIcon0").parent.active = true       
            case 3:     
                this["nodeItem" + index].getChildByName("nodeItemBg0_2").active = true
                this["nodeItem" + index].getChildByName("nodeItemStatus0_2").active = true        
                break;    
            case 2:    
                this["nodeItem" + index].getChildByName("nodeItemBg0_" + status).active = true
                this["nodeItem" + index].getChildByName("nodeItemStatus0_" + status).active = true        
                break;       
            default:
                this["nodeItem" + index].getChildByName("nodeItemBg0_1").active = true   
                this["nodeItem" + index].getChildByName("nodeItemBg0_1").getChildByName("nodeItemIcon").getChildByName("nodeItemIcon0").parent.active = true  
                break;
        }
    }

    initItem() {
        for (let index = 0; index < 3; index++) {
            this["nodeItem" + index].getChildByName("nodeItemBg0_2").active = true
            this["nodeItem" + index].getChildByName("nodeItemStatus0_1").active = false
            this["nodeItem" + index].getChildByName("nodeItemStatus0_2").active = false
            this["nodeItem" + index].getChildByName("btn_getaward0").active = false  
            this["nodeItem" + index].getChildByName("nodeItemBg0_1").getChildByName("nodeItemIcon").getChildByName("nodeItemIcon0").parent.active = false
            
            
            let moveBy = cc.moveBy(0.8, cc.v2(0, 10))
            this["nodeItem" + index].getChildByName("nodeItemBg0_1").getChildByName("nodeItemIcon").getChildByName("nodeItemIcon0").stopAllActions()
            this["nodeItem" + index].getChildByName("nodeItemBg0_1").getChildByName("nodeItemIcon").getChildByName("nodeItemIcon0").runAction(cc.repeatForever(cc.sequence(moveBy, moveBy.reverse())))
        }
    }

    
	refreshRedPacketInfo(cur, dst) {		
        this.progressBarBig.$ProgressBar.progress = cur/dst
        
        let leftRound = dst - cur
        leftRound = leftRound < 0 ? 0 : leftRound
        this.labelRound.$Label.string = leftRound
    }
    
    emulateData() {
        this.logic.redpacket_88Yuan_info = {
            cItemtype: 365,
            curRounds: 10,
            limitRounds: 360,
            nAmount: 200000,
            taskId: 2,
            ret: 2,
        }
        
        // this.awardData = [
        //     {itemIndex:364, value:100},
        //     {itemIndex:364, value:50},
        //     {itemIndex:364, value:200},
        // ]
    }

    initAni() {
        
    }

    onPressGetAward(EventTouch, data = 1) {
        if (this.logic.redpacket_88Yuan_info.ret != 1) {
            return
        }

		this.logic.sendMessage({
			opcode: 'proto_cg_get_redpackets_88yuan_award_req',
			type: 1
		})
    }


    onPressClose() {
        this.close()
    }

    close() {
        this.logic.closeScene("Game88YuanTask")
        if (this.initParam.callback) {
            this.initParam.callback()
        }
    }

    // update (dt) {}
}
