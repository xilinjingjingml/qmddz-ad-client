import BaseComponent from "../base/BaseComponent";
import DataManager from "../base/baseData/DataManager";
import BaseFunc = require("../base/BaseFunc")
import { getMD5, getShopBox, numberFormat, setGray, payOrder, getNowTimeUnix } from "../base/BaseFuncTs";
import SceneManager from "../base/baseScene/SceneManager";
import { http } from "../base/utils/http";

const {ccclass, property} = cc._decorator;
@ccclass
export default class DiscountCodeUsePop extends BaseComponent {
    

    thisComponentName = "DiscountCodeUsePop"
    vipDiscountCodeList = []

    selectDiscountCodeId = {
        desc: "",
        id: 0,
        remain: 0,
        value: 0,
        db_price: 0
    }

    discountCodeItemList = {}
    myDiscountCodeHash = {}
    
    @property(cc.SpriteFrame)
    icon_ds_value_2:cc.SpriteFrame = null;
    @property(cc.SpriteFrame)
    icon_ds_value_10:cc.SpriteFrame = null;
    @property(cc.SpriteFrame)
    icon_ds_value_20:cc.SpriteFrame = null;
    @property(cc.SpriteFrame)
    icon_ds_value_100:cc.SpriteFrame = null;

    
    @property(cc.SpriteFrame)
    icon_shopitem_num_100000:cc.SpriteFrame = null;
    @property(cc.SpriteFrame)
    icon_shopitem_num_500000:cc.SpriteFrame = null;
    @property(cc.SpriteFrame)
    icon_shopitem_num_1000000:cc.SpriteFrame = null;
    @property(cc.SpriteFrame)
    icon_shopitem_num_5000000:cc.SpriteFrame = null;

    activeDuringTime = "11月9日~11月27日"

    onLoad() {
        if (!this.initParam){
            this.close()
        }

        this.onOpenScene()
    }

    onActive() {
        this.http_load_discountcode();        
    }

    onEnable() {
        this.http_load_discountcode();        
    }
    
    onOpenScene() {
        
        let carnival = DataManager.Instance.onlineParam.salelActive
        if (carnival && carnival.start <= getNowTimeUnix() && carnival.end >= getNowTimeUnix()) {  
            let startDay = new Date(carnival.start * 1000)
            let endDay = new Date(carnival.end * 1000)
            this.activeDuringTime = (startDay.getMonth() + 1) + "月" + startDay.getDate() + "日 ~ " + (endDay.getMonth() + 1) + "月" + endDay.getDate() + "日"
        }
        
        this["labelActiveTime"].$Label.string = this.activeDuringTime

        getShopBox(9, this.updateShops.bind(this))
        this.http_load_discountcode();
    }

    __bindButtonHandler() {
        BaseFunc.AddClickEvent(this["btnHelp"], this.node, this.thisComponentName, "onPressHelp", 0, 3);
        BaseFunc.AddClickEvent(this["nodeHelpMask"], this.node, this.thisComponentName, "onPressHelpMask", 0, 3);
    }
    
    updateShops() {
        if (null == DataManager.Instance.DiscountBoxs) {
            return
        }
        
        this["nodeShopContent"].removeAllChildren()
        
        cc.log(DataManager.Instance.DiscountBoxs)

        for(let box of DataManager.Instance.DiscountBoxs) {            
            
            let shopItem = cc.instantiate(this["nodeShopItemPrefab"])

            shopItem.active = true
            shopItem.setPosition(0, 0)
            
            shopItem.getChildByName("labelShopItemDesc").getComponent(cc.Label).string = numberFormat(box.content[0].num) + "金豆"
            
            cc.find("sptItemNum", shopItem).getComponent(cc.Sprite).spriteFrame = this["icon_shopitem_num_" + box.content[0].num]
            
            cc.find("labelShopItemDesc", shopItem).getComponent(cc.Label).string = "x" + box.content[0].num
            
            BaseFunc.AddClickEvent(shopItem, this.node, this.thisComponentName, "onPressBuyItem", BaseFunc.CleanCopy(box), 3)

            if(this.selectDiscountCodeId.remain > 0 && box.price >= this.selectDiscountCodeId.db_price) {                
                cc.find("nodeMinus", shopItem).active = true
                cc.find("nodeMinus/labelDesc", shopItem).getComponent(cc.Label).string = this.selectDiscountCodeId.db_price + "减" + this.selectDiscountCodeId.value                
                cc.find("labelPrice", shopItem).getComponent(cc.Label).string = "￥" + (box.price - this.selectDiscountCodeId.value)
            }else{                
                cc.find("nodeMinus", shopItem).active = false
                cc.find("labelPrice", shopItem).getComponent(cc.Label).string = "￥" + box.price
            }
            
            this["nodeShopContent"].addChild(shopItem)
        }
    }
    
    onPressBuyItem(EventTouch, data) {
        cc.log("onPressBuyItem", data, this.selectDiscountCodeId)
        
        if(this.selectDiscountCodeId.remain > 0 && this.selectDiscountCodeId.id >= 0 && data.price >= this.selectDiscountCodeId.db_price) {
            data["disBatchId"] = this.selectDiscountCodeId.id
            data["disValue"] = this.selectDiscountCodeId.value
        }
        let tmpId = this.selectDiscountCodeId.id;
        payOrder(data, ()=> {
            // this.http_load_discountcode();
            if(!!tmpId && tmpId >= 0) {
                cc.log(tmpId)
                for(let k in this.vipDiscountCodeList) {
                    if (this.vipDiscountCodeList[k].dv_batch_id == tmpId) {
                        this.vipDiscountCodeList[k].isCnt++
                    }
                }
                this.updateDiscountView()                
                this.updateShops()
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
        

        http.open(url, params, (msg) => {
            cc.log(msg)
            if (msg && msg.vipDiscountCode) {
                this.vipDiscountCodeList = msg.vipDiscountCode
                this.updateDiscountView()
                
                if (this.selectDiscountCodeId.value > 0) {                    
                    this.selectDiscountCodeId = this.myDiscountCodeHash[this.selectDiscountCodeId.value]
                    this.updateShops()
                }
            }           
        }) 
    }

    updateDiscountView() {
        this.myDiscountCodeHash = {}
        for(let discountItem of this.vipDiscountCodeList) {
            let remainCnt = discountItem.totalCnt - discountItem.isCnt
            let rate = discountItem.db_rate
            if(!this.myDiscountCodeHash[rate]) {
                this.myDiscountCodeHash[rate] = {
                    remain: 0,
                    desc: ''
                }
            }
            this.myDiscountCodeHash[rate].value = rate
            this.myDiscountCodeHash[rate].remain += remainCnt;
            this.myDiscountCodeHash[rate].desc = discountItem.db_desc
            if(remainCnt > 0) {
                this.myDiscountCodeHash[rate].id = discountItem.dv_batch_id
            }
            this.myDiscountCodeHash[rate].db_price = discountItem.db_price
            
        }
        cc.log("updateDiscountView", this.myDiscountCodeHash)        

        let myDiscountCode = []
        let maxHas = 0
        for(let k in this.myDiscountCodeHash) {    
            
            let discountCodeItem = this.discountCodeItemList[k]
            if(!discountCodeItem) {
                discountCodeItem = cc.instantiate(this["nodeDiscountCodePrefab"])
                discountCodeItem.active = true
                discountCodeItem.setPosition(0, 0)
                cc.find("sptValue", discountCodeItem).getComponent(cc.Sprite).spriteFrame = this["icon_ds_value_" + this.myDiscountCodeHash[k].value]
                BaseFunc.AddToggleCheckEvent(discountCodeItem, this.node, this.thisComponentName, "onPressSelectDiscountCode", k)

                this["nodeDiscountContent"].addChild(discountCodeItem)
                this.discountCodeItemList[k] = discountCodeItem
            }

            discountCodeItem.getChildByName("labelUseLimit").getComponent(cc.Label).string = this.myDiscountCodeHash[k].desc
            
            if(this.myDiscountCodeHash[k].remain > 0) {
                // discountCodeItem.getComponent(cc.Toggle).interactable = true
                cc.find("nodeRemainNum", discountCodeItem).active = true
                cc.find("nodeRemainNum/labelRemainNum", discountCodeItem).getComponent(cc.Label).string = this.myDiscountCodeHash[k].remain                
                setGray(cc.find("background2", discountCodeItem), 0)
                setGray(cc.find("sptValue", discountCodeItem), 0)
            }else{
                if (this.selectDiscountCodeId.value == this.myDiscountCodeHash[k].value) {
                    this.selectDiscountCodeId = this.myDiscountCodeHash[k]
                }
                discountCodeItem.getComponent(cc.Toggle).uncheck()
                discountCodeItem.getChildByName("checkmark").active = false
                // discountCodeItem.getComponent(cc.Toggle).interactable = false
                cc.find("nodeRemainNum", discountCodeItem).active = true
                cc.find("nodeRemainNum/labelRemainNum", discountCodeItem).getComponent(cc.Label).string = "0"
                setGray(cc.find("background2", discountCodeItem))
                setGray(cc.find("sptValue", discountCodeItem))
                // setGray(cc.find("checkmark", discountCodeItem))
                cc.find("labelUseLimit", discountCodeItem).color = new cc.Color(128, 128, 128)
            }


        }
    }

    onPressSelectDiscountCode(EventTouch, data) {
        cc.log("onPressSelectDiscountCode", data)
        this.selectDiscountCodeId = this.myDiscountCodeHash[data];
        this.updateShops()
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