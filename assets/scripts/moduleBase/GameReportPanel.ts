
import BaseComponent from "../base/BaseComponent";
import BaseFunc = require("../base/BaseFunc")
import DataManager from '../base/baseData/DataManager';
import { iMessageBox, numberFormat } from '../base/BaseFuncTs';
import { http } from "../base/utils/http";

const {ccclass, property} = cc._decorator;

@ccclass
export default class GameReportPanel extends BaseComponent {

    thisComponentName = "GameReportPanel"
    logic: any;
    maskLayer: any;
    toChairId = -1;
    sptAvatar: any;
    labelMoney: any;
    labelRedPacket: any;
    btn_Close: any;
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}
    reportConfig = [
        {
            flag: 1,
            name:"头像违规"
        },
        {
            flag: 2,
            name:"水平过低"
        },
        {
            flag: 3,
            name:"违规行为"
        },
    ]
    reportItemInstances = []

    onOpenScene () {
        for (let idx = 0; idx < this.reportConfig.length; idx++) {
            const element = this.reportConfig[idx];

            let reportItem = cc.instantiate(this["btnReportDetailPrefab"])
            reportItem.getChildByName("labelReportName").getComponent(cc.Label).string = element.name            
            this["toggleReportDetail"].addChild(reportItem)
            this.reportItemInstances.push(reportItem);
            BaseFunc.AddToggleCheckEvent(reportItem, this.node, this.thisComponentName, "onPressReportItem", idx)
        }
        
        this.logic = this.initParam["logic"]

        this.sptAvatar.$Sprite.spriteFrame = this.initParam["avatarFrame"]
        this.labelMoney.$Label.string = this.initParam["moneyValue"]
        this.labelRedPacket.$Label.string = this.initParam["repacketValue"]
        this.toChairId = this.initParam["toChairId"]
        
        this.showConfirmBtn(false)
    }

    __bindButtonHandler() {        
        
        BaseFunc.AddClickEvent(this["btnCancel"], this.node, this.thisComponentName, "onPressCancel", 0, 0);
        BaseFunc.AddClickEvent(this["btnConfirm"], this.node, this.thisComponentName, "onPressConfirm", 0, 0);
        BaseFunc.AddClickEvent(this["btnConfirm0"], this.node, this.thisComponentName, "onPressConfirm0", 0, 0);

        BaseFunc.AddClickEvent(this.maskLayer, this.node, this.thisComponentName, "onPressClose", 0, 0);
        BaseFunc.AddClickEvent(this.btn_Close, this.node, this.thisComponentName, "onPressClose", 0, 0);
    }
    
    onPressReportItem(EventTouch, data) {
        this.showConfirmBtn(false)
        for (const iterator of this.reportItemInstances) {
            if(iterator.getComponent(cc.Toggle).isChecked) {
                this.showConfirmBtn()
            }
        }
    }
    // btnReportDetailPrefab

    showConfirmBtn(flag = true) {
        if(flag) {
            this["btnConfirm0"].active = false
            this["btnConfirm"].active = true
        }else{
            this["btnConfirm"].active = false
            this["btnConfirm0"].active = true            
        }
    }
    onPressCancel() {
        this.onPressClose()
    }

    onPressConfirm() {
        let reportFlag = []
        
        for (let idx = 0; idx < this.reportItemInstances.length; idx++) {
            const iterator = this.reportItemInstances[idx];
            if(iterator.getComponent(cc.Toggle).isChecked) {
                reportFlag.push(this.reportConfig[idx].flag)
            }
        }
        
        if(reportFlag.length > 0) {
            this.http_sendReport(reportFlag.toString())
        }else{
            cc.log("not selected")
        }
    }

    onPressConfirm0() {
        cc.log("not selected")
    }

    http_sendReport(reportFlag) {
        
        let url = DataManager.getURL("REPORT_USER")
        
        let params = {            
            pid: DataManager.UserData.guid,
            ticket: DataManager.UserData.ticket,
            reportPid: this.initParam["toPid"],
            reportFlag: reportFlag,
            gameId: DataManager.Instance.gameId,
            serverId: this.logic.serverInfo.serverId,
        }

        cc.log(params)

        http.open(url, params, (msg) => {
            cc.log(msg)
            if (msg) {
                if (msg.ret == 0) {
                    this.logic.addPidToReportList(params.reportPid)
                    iMessageBox("举报成功，谢谢你的反馈，我们稍后会审核并进行处理")
                    this.onPressClose()
                }else if(msg.ret == -1){
                    iMessageBox(msg.msg || "举报失败")
                }    
                else{
                    iMessageBox("举报失败")
                }
            }  
        }) 
    }

    onPressClose() {
        
        this.close()
    }

    close() {
        this.logic.closeScene(this.thisComponentName)
        if (this.initParam.callback) {
            this.initParam.callback(this.initParam)
        }
    }
}
