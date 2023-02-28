import BaseScene from "../base/baseScene/BaseScene";
import DataManager from "../base/baseData/DataManager";
import { getVipConfig, getADDraw, getADConfig } from "./LobbyFunc";
import { numberFormat, getQttCoinQuery, iMessageBox } from "../base/BaseFuncTs";
import ShopBoxList from "./component/ShopBoxList";
import TabControl from "../base/extensions/Extpands/TabControl";
import { AdsConfig } from "../base/baseData/AdsConfig";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ShopScene extends BaseScene {
    
    _type: number = 0

    onOpenScene() {
        // this.addListener("updateUserData", this.updateUserInfo.bind(this))
        // this.addListener("updateVipInfo", this.updateVipInfo.bind(this))

        if (this.initParam["type"] == null && this.initParam["sceneParam"] != null) {
            this.initParam["type"] = this.initParam["sceneParam"]            
        }

        if (this.initParam["type"])
            this._type = parseInt(this.initParam["type"])

        this.updateUserData()

        // if (null == DataManager.CommonData["VipInfo"])
            // getVipConfig(this.updateVipInfo.bind(this))        
        // else
            // this.updateVipInfo()  
            
        // if (this.node.name === "ShopNewScene") {
        //     this.node.getComponentInChildren(ShopBoxList).setShopType(null != this.initParam["type"] ? this.initParam["type"] : 1)
        //     let menu = cc.find("nodeContent/nodeTab", this.node)
        //     let tab = menu.getChildByName("tab" + this.initParam["type"])
        //     if (tab) {
        //         tab.getComponent(TabControl).onGroup()
        //     }
        // }
        // let menu = cc.find("nodeTab/nodeMask", this.node)
        // let tab = menu.getChildByName("tab" + this.initParam["type"])
        // if (tab) {
        //     tab.getComponent(cc.Toggle).isChecked = true
        // }

        this.onPressShop(null, this._type)

        // cc.find("nodeTop/shop_tab0", this.node).active = this._type === 0
        // cc.find("nodeTop/shop_tab1", this.node).active = this._type === 1

        let self = this
        if (null == DataManager.CommonData["adConfig"]) {
            getADConfig(() => {
                self.updateState()
            })
        }
        else {
            this.updateState()
        }
    }

    updateUserData() {
        // 用户信息
        // let goldbean = cc.find("nodeTop/goldbean_bg/labelgold", this.node)
        // if (null != goldbean)
        //     goldbean.getComponent(cc.Label).string = numberFormat(DataManager.UserData.money)

        // let rp = DataManager.UserData.getItemNum(365)

        // let redpacket = cc.find("nodeTop/redpacket_bg/labelrp", this.node)
        // if (null != redpacket)
        //     redpacket.getComponent(cc.Label).string = numberFormat(rp)

        // let labelNeedMoney = cc.find("nodeContent/btnVipInfo/vipPriceTip/needMoney", this.node)
        // labelNeedMoney.getComponent(cc.Label).string = "" + DataManager.CommonData["VipData"].nextVipneedMoney + "y"
        // let viplv = cc.find("nodeContent/btnVipInfo/vipPriceTip/viplv", this.node)
        // viplv.getComponent(cc.Label).string = "" + (DataManager.CommonData["VipData"].vipLevel + 1)

        // getVipConfig(this.updateVipInfo.bind(this))        
        getQttCoinQuery(this.updateQttCoin.bind(this))
    }

    updateVipInfo() {
        // VIP信息
        // let nextNeed = 0
        // for (const iterator of DataManager.CommonData["VipInfo"]) {
        //     if (iterator["vipLv"] == (DataManager.CommonData["VipData"].vipLevel + 1)){
        //         nextNeed = iterator["payMoney"]
        //         break;
        //     }
        // }

        // let vipLvProgress = cc.find("nodeContent/btnVipInfo/vipprogress", this.node)
        // vipLvProgress.getComponent(cc.ProgressBar).progress = (nextNeed - DataManager.CommonData["VipData"].nextVipneedMoney) / nextNeed
        // let value = cc.find("nodeContent/btnVipInfo/vipprogress/value", this.node)
        // value.getComponent(cc.Label).string = ((nextNeed - DataManager.CommonData["VipData"].nextVipneedMoney)) + "/" + (nextNeed)
    }

    updateQttCoin() {
        let qtt = cc.find("nodeTop/qtt_coin_bg/labelgtt", this.node)
        if (null != qtt) 
            qtt.getComponent(cc.Label).string = DataManager.CommonData["QttCoinNum"] || 0
    }

    // onPressShop() {
    //     let sbl = this.node.getComponentInChildren(ShopBoxList)
    //     cc.find("nodeTop/nodeCurrency/item0", this.node).active = true
    //     cc.find("nodeTop/nodeCurrency/item365", this.node).active = false
    //     cc.find("nodeTop/nodeCurrency/item1192", this.node).active = false
    //     cc.find("nodeTop/nodeCurrency/itemqtt", this.node).active = false
    //     sbl.setShopType(1)
    //     sbl.init()
    // }

    // onPressQttShop() {
    //     let sbl = this.node.getComponentInChildren(ShopBoxList)
    //     cc.find("nodeTop/nodeCurrency/item0", this.node).active = true
    //     cc.find("nodeTop/nodeCurrency/item365", this.node).active = false
    //     cc.find("nodeTop/nodeCurrency/item1192", this.node).active = false
    //     cc.find("nodeTop/nodeCurrency/itemqtt", this.node).active = true
    //     sbl.setShopType(2)
    //     sbl.init()        
    // }

    // onPressDimaondShop() {
    //     let sbl = this.node.getComponentInChildren(ShopBoxList)
    //     cc.find("nodeTop/nodeCurrency/item0", this.node).active = false
    //     cc.find("nodeTop/nodeCurrency/item365", this.node).active = false
    //     cc.find("nodeTop/nodeCurrency/item1192", this.node).active = true
    //     cc.find("nodeTop/nodeCurrency/itemqtt", this.node).active = false
    //     sbl.setShopType(3)
    //     sbl.init()
    // }

    onPressShop(sender, data) {
        this._type = parseInt(data)
        cc.find("nodeTab/nodeMask/tab" + this._type, this.node).getComponent(cc.Toggle).isChecked = true

        cc.find("nodeTop/shop_tab0", this.node).active = this._type === 0
        cc.find("nodeTop/shop_tab1", this.node).active = this._type === 1

        cc.find("nodeContent/btnTreasure", this.node).active = this._type === 0
        cc.find("nodeContent/btnFreeDraw", this.node).active = this._type === 1

        let sbl = this.node.getComponentInChildren(ShopBoxList)
        sbl.setShopType(this._type)
        sbl.init() 
    }

    updateState() {
        // cc.log(DataManager.CommonData["adNum"][AdsConfig.taskAdsMap.TreasureHunt])        
        let btnTreasure = cc.find("nodeContent/btnTreasure", this.node)
        btnTreasure.getChildByName("drawNum").getComponent(cc.Label).string = "今日剩余:" +
        (DataManager.CommonData["adNum"][AdsConfig.taskAdsMap.TreasureHunt].allNum - DataManager.CommonData["adNum"][AdsConfig.taskAdsMap.TreasureHunt].countNum) + "/" + DataManager.CommonData["adNum"][AdsConfig.taskAdsMap.TreasureHunt].allNum     

        let btnDraw = cc.find("nodeContent/btnFreeDraw", this.node)
        btnDraw.getChildByName("drawNum").getComponent(cc.Label).string = "今日剩余:" +
            (DataManager.CommonData["adNum"][AdsConfig.taskAdsMap.DrawDiamond].allNum - DataManager.CommonData["adNum"][AdsConfig.taskAdsMap.DrawDiamond].countNum) + 
            "/" + DataManager.CommonData["adNum"][AdsConfig.taskAdsMap.DrawDiamond].allNum
        btnDraw.getChildByName("countdown").getComponent(cc.Label).string = 
            DataManager.CommonData["adNum"][AdsConfig.taskAdsMap.DrawDiamond].countNum < DataManager.CommonData["adNum"][AdsConfig.taskAdsMap.DrawDiamond].allNum ? "看视频" : "今日次数用完"
    }

    onPressDraw(sender, data) {
        if (!!sender.target.getComponent(cc.Button).coldDown) {
            iMessageBox("10秒内仅可以领取一次哦!")
            return
        }
        let adNum = parseInt(data)
        let countdown = 10
        getADDraw(adNum, () => {this.updateState()})
        sender.target.getComponent(cc.Button).coldDown = true
        sender.target.runAction(cc.sequence(cc.delayTime(10), cc.callFunc(() => {
            if (sender.target)
                sender.target.getComponent(cc.Button).coldDown = false
        })))

        sender.target.getChildByName("countdown").runAction(
            cc.repeat(
                cc.sequence(
                    cc.delayTime(1),
                    cc.callFunc(() => {
                        countdown --
                        // if (sender.target) 
                        //     sender.target.getChildByName("countdown").getComponent(cc.Label).string = countdown > 0 ? "00:0" + countdown : ""
                    })), 11))

        // sender.target.getChildByName("countdown").getComponent(cc.Label).string = "00:10"
    }
}