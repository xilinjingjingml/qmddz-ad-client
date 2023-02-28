import BaseComponent from "../base/BaseComponent";
import DataManager from "../base/baseData/DataManager";
import BaseFunc = require("../base/BaseFunc")
import { getMD5, iMessageBox, showAwardMutipleResultPop, getNowTimeUnix, showAwardResultPop } from "../base/BaseFuncTs";
import SceneManager from "../base/baseScene/SceneManager";

const {ccclass, property} = cc._decorator;
@ccclass
export default class DiscountCodeGetPop extends BaseComponent {
    

    thisComponentName = "DiscountCodeGetPop"

    vipDiscountCodeList = []

    getDiscountInfo = {
        totalCont: 0,
        limitCount: 0
    }

    
    @property(cc.SpriteFrame)
    icon_ds_item_2:cc.SpriteFrame = null;
    @property(cc.SpriteFrame)
    icon_ds_item_10:cc.SpriteFrame = null;
    @property(cc.SpriteFrame)
    icon_ds_item_20:cc.SpriteFrame = null;
    @property(cc.SpriteFrame)
    icon_ds_item_100:cc.SpriteFrame = null;

    activeDuringTime = "11月9日~11月27日"

    onLoad() {
        this.onOpenScene()
    }

    onOpenScene() {
        if (!this.initParam){
            this.close()
        }

        let carnival = DataManager.Instance.onlineParam.salelActive
        if (carnival && carnival.start <= getNowTimeUnix() && carnival.end >= getNowTimeUnix()) {  
            let startDay = new Date(carnival.start * 1000)
            let endDay = new Date(carnival.end * 1000)
            this.activeDuringTime = (startDay.getMonth() + 1) + "月" + startDay.getDate() + "日 ~ " + (endDay.getMonth() + 1) + "月" + endDay.getDate() + "日"
        }
        
        this["labelActiveTime"].$Label.string = this.activeDuringTime

        this.http_load_discountcode();
        
        let viplv = DataManager.CommonData["VipData"].vipLevel || 0
        this["labelVIPDesc"].$Label.string = viplv
        
        this.updateTotalCount()
    }

    updateTotalCount() {
        this["labelGetNum"].$Label.string = "(" + this.getDiscountInfo.totalCont + "/" + this.getDiscountInfo.limitCount + ")";
    }
    
    __bindButtonHandler() {
        BaseFunc.AddClickEvent(this["btnHelp"], this.node, this.thisComponentName, "onPressHelp", 0, 3);
        BaseFunc.AddClickEvent(this["nodeHelpMask"], this.node, this.thisComponentName, "onPressHelpMask", 0, 3);
    }

    http_get_discountcode(itemid) {
        let url = DataManager.getURL("GET_DISCOUNT_CODE")
        
        let params = {            
            uid: DataManager.UserData.guid,
            ticket: DataManager.Instance._userData.ticket,
            dvId: itemid,
            flag: 1
        }
        

        BaseFunc.HTTPGetRequest(url, params, (msg) => {
            if (DataManager.Instance.isTesting)
                console.log(msg)
            if (msg) {
                if (msg.ret == 0) {
                    // 领取成功         
                    this.updateVipDiscountCodeList(msg.dvId, 1);
                    cc.log("itemid", itemid)
                }else if (msg.ret == -1) {
                    iMessageBox(msg.msg || "领取失败, 请稍后再试")
                }
            }           
        }) 

    }

    http_load_discountcode() {

        let url = DataManager.getURL("LOAD_DISCOUNT_CODE")
        
        let params = {            
            uid: DataManager.UserData.guid,
            ticket: DataManager.Instance._userData.ticket
            // pn: DataManager.Instance.packetName,
        }
        

        BaseFunc.HTTPGetRequest(url, params, (msg) => {
            if (DataManager.Instance.isTesting)
                console.log(msg)
            if (msg && msg.vipDiscountCode) {
                this.vipDiscountCodeList = msg.vipDiscountCode
                this.updateDiscountView()
            }           
        }) 
    }

    showAwardPop(item) {

    }

    updateVipDiscountCodeList(dvid, op) {
        for(let k in this.vipDiscountCodeList) {
            if (this.vipDiscountCodeList[k].dv_id == dvid) {
                
                let awards = [
                    {index: this.vipDiscountCodeList[k].dv_item_index, num: this.vipDiscountCodeList[k].dv_item_num},
                    {index: -1, num: this.vipDiscountCodeList[k].db_rate},
                ]
                
                // showAwardMutipleResultPop(awards)
                showAwardResultPop(awards)
                // this.showAwardPop(this.vipDiscountCodeList[k])

                if(op == 1) {
                    this.vipDiscountCodeList[k].totalCnt++;
                    this.vipDiscountCodeList[k].totalCnt = Math.min(this.vipDiscountCodeList[k].dv_limit_cnt, this.vipDiscountCodeList[k].totalCnt);
                }
            }
        }

        this.updateDiscountView()
    }

    initDisCountView() {
        
    }

    updateDiscountView() {
        // nodeDiscountItemPrefab
        this.getDiscountInfo.totalCont = 0
        this.getDiscountInfo.limitCount = 0 //this.vipDiscountCodeList.length
        this["nodeDiscountContent"].removeAllChildren()

        for(let k in this.vipDiscountCodeList) {            
            const element = this.vipDiscountCodeList[k]
            let awardItem = cc.instantiate(this["nodeDiscountItemPrefab"])

            awardItem.active = true
            awardItem.setPosition(0, 0)
            
            if(k%2 == 1) {
                awardItem.getChildByName("sptMainBg1").active = true
            }else{
                awardItem.getChildByName("sptMainBg0").active = true
            }

            awardItem.getChildByName("nodeStatus0").active = false
            awardItem.getChildByName("nodeStatus1").active = false
            awardItem.getChildByName("nodeStatus2").active = false
            
            
            cc.find("nodeItem0/labelNum", awardItem).getComponent(cc.Label).string = element.dv_item_num
            // cc.find("nodeItem1/labelNum", awardItem).getComponent(cc.Label).string = element.db_rate + '元'
            cc.find("nodeItem1/sptDiscountCodeNum", awardItem).getComponent(cc.Sprite).spriteFrame = this["icon_ds_item_" + element.db_rate]

            this.getDiscountInfo.totalCont += element.totalCnt
            this.getDiscountInfo.limitCount += element.dv_limit_cnt

            if(element.dv_limit_cnt > element.totalCnt) {
                let viplv = DataManager.CommonData["VipData"].vipLevel || 0
                
                if((element.dv_limit_cnt - element.totalCnt) > 1) {
                    cc.find("nodeRemainNum", awardItem).active = true;
                    cc.find("nodeRemainNum/labelRemainNum", awardItem).getComponent(cc.Label).string = (element.dv_limit_cnt - element.totalCnt) + ''
                }

                if(viplv >= element.dv_vip) {
                    // 可以领取
                    awardItem.getChildByName("nodeStatus1").active = true
                     

                    let getButton = cc.find("nodeStatus1/btnConfirm1", awardItem)
                    BaseFunc.AddClickEvent(getButton, this.node, this.thisComponentName, "onPressGetDiscountCode", element.dv_id)
                }else{
                    // 不可以领取
                    awardItem.getChildByName("nodeStatus0").active = true
                    
                    let labelGetVIPLimit = cc.find("labelGetVIPLimit", awardItem)
                    labelGetVIPLimit.active = true
                    labelGetVIPLimit.getComponent(cc.Label).string = "需VIP等级" + (element.dv_vip)
                }
            }else{                
                awardItem.getChildByName("nodeStatus2").active = true
            }
          
            this["nodeDiscountContent"].addChild(awardItem)
        }

        this.updateTotalCount()
    }

    onPressGetDiscountCode(EventTouch, data) {
        cc.log("onPressGetDiscountCode", data)
        this.http_get_discountcode(data)
    }

    onPressHelpMask() {
        this["nodeHelp"].active = false
    }

    onPressHelp() {
        this["nodeHelp"].active = true
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
}