
import BaseComponent from "../base/BaseComponent";
import BaseFunc = require("../base/BaseFunc")
import DataManager from '../base/baseData/DataManager';
import { iMessageBox, numberFormat, showGameReportPanel } from '../base/BaseFuncTs';

const {ccclass, property} = cc._decorator;

@ccclass
export default class GameMagicEmojiPanel extends BaseComponent {

    thisComponentName = "GameMagicEmojiPanel"
    logic: any;
    maskLayer: any;
    toChairId = -1;
    sptAvatar: any;
    labelMoney: any;
    labelRedPacket: any;
    labelMyQttCoin: any;
    btn_Close: any;
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    __bindButtonHandler() {
        
		BaseFunc.AddClickEvent(this["nodeEmoji0"].getChildByName("btnEmoji"), this.node, this.thisComponentName, "onPressMagicEmoji", 0, 3);
		BaseFunc.AddClickEvent(this["nodeEmoji1"].getChildByName("btnEmoji"), this.node, this.thisComponentName, "onPressMagicEmoji", 1, 3);
		BaseFunc.AddClickEvent(this["nodeEmoji2"].getChildByName("btnEmoji"), this.node, this.thisComponentName, "onPressMagicEmoji", 2, 3);
        BaseFunc.AddClickEvent(this["nodeEmoji3"].getChildByName("btnEmoji"), this.node, this.thisComponentName, "onPressMagicEmoji", 3, 3);
        
        BaseFunc.AddClickEvent(this["btnReport"], this.node, this.thisComponentName, "onPressReport", 3, 3);
        
        BaseFunc.AddClickEvent(this.maskLayer, this.node, this.thisComponentName, "onPressClose", 0, 0);
        BaseFunc.AddClickEvent(this.btn_Close, this.node, this.thisComponentName, "onPressClose", 0, 0);
    }

    refreshReportBtn() {        
        if(this.logic.serverInfo.level > 2) {
            if(!this.logic.isInReportList(this.initParam["toPid"])) {
                this["btnReport"].active = true
            }
        }
    }

    onPressReport() {
        let prarm = {}
        
        prarm["logic"] = this.initParam["logic"]
        prarm["avatarFrame"] = this.initParam["avatarFrame"]
        prarm["moneyValue"] = this.initParam["moneyValue"]
        prarm["repacketValue"] = this.initParam["repacketValue"]
        prarm["toChairId"] = this.initParam["toChairId"]
        prarm["toPid"] = this.initParam["toPid"]
        prarm["callback"] = () => {
            this.onPressClose()
            // this.refreshReportBtn()
        }
        showGameReportPanel(prarm)        
    }
    
    onPressMagicEmoji(EventTouch, data = 0) {       
        let sendFlag = this.sendMagicEmoji(data)
        if (sendFlag == 0) {
            if (this.initParam.callback) {
                this.initParam.callback(data)
            }
            this.close()
        }else if(sendFlag == 1){
            if (this.initParam.callback) {
                this.initParam.callback(data)
            }
            this.hideNode()
        }else if(sendFlag == -1){
        }else if(sendFlag == -2){
            iMessageBox("金豆不足");
        }else if(sendFlag == -3){
            iMessageBox("趣金币不足");
        }
    }

    hideNode() {
        this.node.opacity = 1
    }

    sendMagicEmoji(data) {
        if (!this.logic.gamescene) {            
            return -1
        }

        if (this.logic.emojiConfigs.length == 0) {
            
            return -1
        }

        if (this.logic.emojiConfigs[data].cCostType == 0) {   
            if (DataManager.UserData.money - this.logic.emojiConfigs[data].cCostValue > this.logic.serverInfo.minMoney) {
                this.sendMagicEmoji_socket(data)
                return 0                
            }else{
                return -2
            }
        }else if (this.logic.emojiConfigs[data].cCostType == 367) {//DataManager.CommonData["QttCoinNum"]
            if (DataManager.CommonData["QttCoinNum"] >= this.logic.emojiConfigs[data].cCostValue) {
                this.sendMagicEmoji_http(data)            
                return 1            
            }else{
                return -3
            }
        }

        return -1
    }


    start () {
        this.node.opacity = 255
        this.logic = this.initParam.logic

        this.sptAvatar.$Sprite.spriteFrame = this.initParam.avatarFrame
        this.label_name.$Label.string = this.initParam.nickname
        this.labelMoney.$Label.string = this.initParam.moneyValue
        this.labelRedPacket.$Label.string = this.initParam.repacketValue
        this.toChairId = this.initParam.toChairId
        
        this.labelMyQttCoin.$Label.string = numberFormat(DataManager.CommonData["QttCoinNum"] || 0)
        
        this.refreshCostValue()

        this.refreshReportBtn()

        if (Number(this.initParam.repacketValue) <= 0) {
            this.nodeRedPacket.active = false
        }
    }

    refreshCostValue() {
        this.logic.emojiConfigs.forEach((v, k) => {
            if (!!this["nodeEmoji" + k]) {                
                this["nodeEmoji" + k].getChildByName("sptItem0").active = false
                this["nodeEmoji" + k].getChildByName("sptItem365").active = false
                this["nodeEmoji" + k].getChildByName("sptItem367").active = false
                if (v.cCostValue == 0) {
                    this["nodeEmoji" + k].getChildByName("labelCostValue").active = false
                    return
                }
                if (!!this["nodeEmoji" + k].getChildByName("sptItem" + v.cCostType)) {   
                    this["nodeEmoji" + k].getChildByName("sptItem" + v.cCostType).active = true
                    this["nodeEmoji" + k].getChildByName("labelCostValue").getComponent(cc.Label).string = v.cCostValue
                }         
            }
        });
    }
    
    sendMagicEmoji_socket(index) {
        this.logic.gamescene.proto_magic_emoji_req_sender(index, this.toChairId)
        
    }

    sendMagicEmoji_http(index) {
        //uid=5412134300543855&pn=com.zhangxin.android.weiping.qutoutiao.baibao&ticket=847F413C7BA79E59F73BE0EDDE625903&pageNow=1&pageSize=20&gameid=1192
        // http://t_mall.wpgame.com.cn/qtw/open/coin/sub?app_id=a3DU28NdpPFW&open_id=u3EHcvURBjr7&gameId=1238&serverId=1
        let url = DataManager.getURL("SEND_MAGIC_EMOJI")
        let params = {
            app_id:DataManager.Instance.QTT_APPID,
            open_id:DataManager.load('user_guest_openid'),
            gameId:DataManager.Instance.gameId,
            serverId:(index+1),
            pid:DataManager.UserData.guid,
        }

        BaseFunc.HTTPGetRequest(url, params, (msg) => {
            // {"code":0,"message":"成功","showErr":0,"currentTime":1570698824,"data":{}}
            if (DataManager.Instance.isTesting)
                console.log(msg)
            if (msg) {
                if(typeof(msg.code) != "undefined" && msg.code == 0) {
                    this.sendMagicEmoji_socket(index)
                    DataManager.CommonData["QttCoinNum"] -= this.logic.emojiConfigs[index].cCostValue
                }else{

                }              
            }       
            this.close()     
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

    // update (dt) {}
}
