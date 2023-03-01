import BaseComponent from "../base/BaseComponent";
import BaseFunc = require("../base/BaseFunc")
import SceneManager from "../base/baseScene/SceneManager";
import { getNowTimeUnix, checkOneYuanBox, numberFormat } from "../base/BaseFuncTs";
import DataManager from "../base/baseData/DataManager";
import { time } from "../base/utils/time";

const { ccclass, property } = cc._decorator;

@ccclass("ActivePortalItem")
class ActivePortalItem {
    @property()
    buttonName: string = ""
    @property({
        type: cc.Prefab
    })
    noticePrefab = null
    @property({
        type: cc.SpriteFrame
    })
    noticeSprite = null
    @property()
    noticePrefabName: string = ""
    @property()
    startShow: number = -1
    @property()
    endShow: number = -1
    @property()
    popSceneName: string = ""
    @property()
    tabName: string = ""

    _idx: number = -1

    static create(item){
        let ins = new ActivePortalItem()
        ins.buttonName = item.buttonName
        ins.noticePrefabName = item.noticePrefabName
        ins.tabName = item.tabName;
        return ins
    }
}

const ActiveList: ActivePortalItem[] = [
    /*
    ActivePortalItem.create({buttonName: "充值大优惠", noticePrefabName: "DiscountCodeUsePop"}),    
    ActivePortalItem.create({buttonName: "VIP大礼", noticePrefabName: "DiscountCodeGetPop"}),    
    ActivePortalItem.create({buttonName: "充值返利", noticePrefabName: "CashbackPop"}),
    ActivePortalItem.create({buttonName: "充值翻倍", noticePrefabName: "PayDoublePop"}),
    ActivePortalItem.create({buttonName: "红包任务", noticePrefabName: "NewYearPop"}),
    ActivePortalItem.create({buttonName: "欢乐嘉年华", noticePrefabName: "GashaponActivePop"}),
    ActivePortalItem.create({buttonName: "周末嘉年华", noticePrefabName: "Double11ActiveNewPop"}),
    ActivePortalItem.create({buttonName: "幸运刮刮乐", noticePrefabName: "ScratchLotteryPop"}),
   */
    ActivePortalItem.create({ buttonName: "幸运祈福", noticePrefabName: "LuckyBlessPop" }),
    ActivePortalItem.create({ buttonName: "拜 财 神", noticePrefabName: "GodOfWealthActivePop" }),
    ActivePortalItem.create({ buttonName: "激战排行榜", noticePrefabName: "GameRankPop" }),
    ActivePortalItem.create({ buttonName: "登录有礼", noticePrefabName: "GameEntryPop" }),
    ActivePortalItem.create({ buttonName: "APP福利", noticePrefabName: "ShareMoneyActivePop" }),
]

// 幸运刮刮乐
// 每日瓜分趣金币
@ccclass
export default class ActivityPortalPop extends BaseComponent {

    // LIFE-CYCLE CALLBACKS:  
    @property({
        type: [ActivePortalItem]
    })
    actives = []

    thisComponentName = "ActivityPortalPop"

    prefabInstance: cc.Node[] = []

    _selectId = 0
    _selectName: string = ""
    
    _updateDataLock = false

    onOpenScene() {
        // this.loadButton();
        //  this.initMenu()

        if (this.initParam && this.initParam["pageNum"]) {
            this._selectId = this.initParam["pageNum"]
            // this.onPressMenu(null, this.initParam["pageNum"])

        }else {
            this._selectId = 0
            // this.onPressMenu(null, this._selectId)
        }

        if (this.initParam && this.initParam["selectName"])
            this._selectName = this.initParam["selectName"]

        cc.find("nodeMain/nodeBg", this.node).runAction(cc.repeatForever(cc.sequence([cc.callFunc(() => {
            this["active_light1"].active = !this["active_light1"].active
            this["active_light2"].active = !this["active_light2"].active
        }), cc.delayTime(0.5)])))
        this.initMenu()
        this.refreshUserData()
    }

    // loadButton() {
    //     let self = this
    //     cc.loader.loadResDir("moduleLobby/texture/active", cc.SpriteFrame,
    //         (current, total, item) => {          
    //         },
    //         (err, items: any[]) => {
    //             if (err) {                   
    //                 // self.onFail(err)
    //             }
    //             else {
    //                 DataManager.addSpriteFrameByList("active", items)
    //                 this.initMenu()
    //             }
    //         }
    //     )
    // }

    initMenu() {
        let nDay = new Date()
        let item = cc.find("nodeMain/nodeMenu/view/item", this.node)
        let content = cc.find("nodeMain/nodeMenu/view/content", this.node)
        // for (const key in this.actives) {
        // let idx = 0
        // if (this.initParam && this.initParam["pageNum"]) {
        //     idx = this.initParam["pageNum"]
        // }
        let self = this
        // let prefabs = []
        let idx = 0;
        for (const key in ActiveList) {
            // const element = this.actives[key];
            let element = ActiveList[key]  
            element.isActive = false

            if (element.buttonName === "VIP新春大礼" && null == DataManager.CommonData["roleCfg"]["targetAward"]) {
                continue
            }

            if (nDay.getDay() == 0 || nDay.getDay() == 6) {
                if(element.buttonName === "欢乐嘉年华") {
                    continue
                }
            }else{
                if(element.buttonName === "周末嘉年华") {
                    continue
                }
            }

            if (element.buttonName == "1元福利") {
                let box = DataManager.Instance.OneYuanBoxs.filter(item => item.price == 1)
                if (box.length == 0 || null != checkOneYuanBox(1, 1)){
                    continue
                }
            }

            if (1575993600 <= getNowTimeUnix() && element.buttonName == "88折充值活动") {
                continue;
            }
            
            if (element.startShow != -1 && getNowTimeUnix() < element.startShow) {
                continue;
            }

            if (element.endShow != -1 && getNowTimeUnix() > element.endShow) {
                continue;
            }

            element._idx = idx
            if (element.buttonName == "VIP大礼" || element.buttonName == "充值大优惠") {                
                let saleVipTime = DataManager.Instance.onlineParam.salelActive
                if (saleVipTime && (saleVipTime.start > getNowTimeUnix() || saleVipTime.end < getNowTimeUnix())) {  
                    continue;
                }
            }
            // if (element.buttonName === "充值返利" && cc.sys.isBrowser) {
            //     if (this._selectId > 0) this._selectId++
            //     continue;
            // }

            // let menuItem = cc.instantiate(this["btnTogglePrefab"])
            let menuItem = cc.instantiate(item)
            // let tabStr = element.buttonName === "双旦嘉年华" ? "新春嘉年华" : element.buttonName
            let tabStr = element.buttonName
            menuItem.getChildByName("mark_hot").active = tabStr == "幸运祈福"
            menuItem.getChildByName("Background").getChildByName("tabname").getComponent(cc.Label).string = tabStr
            menuItem.getChildByName("checkmark").getChildByName("tabname").getComponent(cc.Label).string = tabStr     
            // menuItem.getChildByName("Background").getChildByName("buttonName").getComponent(cc.Sprite).spriteFrame = 
            //         DataManager.Instance.getSpriteFrame("active", element.tabName + "0")
            // menuItem.getChildByName("checkmark").getChildByName("buttonName").getComponent(cc.Sprite).spriteFrame = 
            //         DataManager.Instance.getSpriteFrame("active", element.tabName + "1")
            menuItem.active = true
            menuItem.position = cc.v2(0, 0)
            content.addChild(menuItem)
            menuItem.name = "menuItem" + key
            BaseFunc.AddToggleCheckEvent(menuItem, this.node, this.thisComponentName, "onPressMenu", key)

            if (this._selectName == element.buttonName || (this._selectName == "" && this._selectId == idx)) {
                menuItem.getComponent(cc.Toggle).isChecked = true
                if (idx * item.getContentSize().height > content.parent.getContentSize().height) {
                    let pos = content.position                        
                    pos.y -= (idx - Math.ceil(content.parent.getContentSize().height / item.getContentSize().height) * item.getContentSize().height)
                    content.position = pos
                }                
            }
            
            this.pushLoadStack(element, this._selectId == parseInt(key))

            idx++
        }

        this._stack[0].isActive = true
        this.loadPage()
    }

    __bindButtonHandler() {

    }

    proto_lc_send_user_data_change_not(message) {
        this.message_deliver(message)
        this.refreshUserData()
    }

    proto_lc_reload_user_data_ack(message) {
        this.message_deliver(message)
        this.refreshUserData()
    }

    proto_lc_broadcast_message_not(message) {
        this.message_deliver(message)
    }

    proto_lc_store_safe_amount_ack(message) {
        this.message_deliver(message)
    }

    message_deliver(message) {
        if (null != message.opcode) {

            for (const key in this.prefabInstance) {
                if (this.prefabInstance.hasOwnProperty(key)) {
                    const element = this.prefabInstance[key];
                    if(!!element.active) {                        
                        let elementHandler = element.getComponent(cc.Component)
                        if (elementHandler[message.opcode] && typeof elementHandler[message.opcode] == "function") {
                            elementHandler[message.opcode](message)
                        }
                    }
                }
            }
        }
    }

    setUpdateDataLock(flag:boolean = true) {
        // this._updateDataLock = flag
        
        // if(!flag) {
        //     this.refreshUserData()
        // }
    }

    refreshUserRedpacket() {        
        // let rp = DataManager.UserData.getItemNum(365)
        // this["rplabel"].$Label.string = numberFormat(rp)
    }

    refreshUserData(fakenum = -1) {
        // if(fakenum > 0) {
        //     this["goldlabel"].$Label.string = numberFormat(fakenum)
        //     return
        // }
        
        // if (!this._updateDataLock) { 
        //     this["goldlabel"].$Label.string = numberFormat(DataManager.UserData.money)
        //     let rp = DataManager.UserData.getItemNum(365)
        //     this["rplabel"].$Label.string = numberFormat(rp)
        // }
    }

    onPressMenu(EventTouch, data) {
        cc.log("onPressMenu", data)
		cc.audioEngine.playEffect(DataManager.Instance.menuEffect, false)
        this._selectId = data
        // let menuItem = this["nodeMenu"].getChildByName("menuItem" + data)
        // if (null == menuItem)
            // return
            
        this.setUpdateDataLock(false)
        // menuItem.getComponent(cc.Toggle).isChecked = true

        this.showContentRight()
    }

    showContentRight() {
        for (const key in this.prefabInstance) {
            if (this.prefabInstance.hasOwnProperty(key)) {
                const element = this.prefabInstance[key];
                element.active = false
            }
        }
        ActiveList.forEach(item => item.isActive = false)
        
        // let item = this.actives[this._selectId]
        let item = ActiveList[this._selectId]
        if (!!item) {
            if (item.noticePrefab != null) {
                this.showPrefab(item)
            }else if (item.noticeSprite != null) {
                this.showImage(item)
            }
            else if (item.noticePrefabName != null) {
                this.showPrefabByName(item)
            }
        }
    }

    showImage(item) {
        // let item = this.actives[this._selectId]
        let spriteFrame = item.noticeSprite

        if (!!this.prefabInstance[spriteFrame.name]) {
            this.prefabInstance[spriteFrame.name].active = true
        } else {
            let activityItem = cc.instantiate(this["nodeContentRightPrefab"])
            activityItem.getChildByName("nodeContentRightImage").getComponent(cc.Sprite).spriteFrame = spriteFrame
            activityItem.active = true
            activityItem.setPosition(0, 0)
            this["nodeContentRight"].addChild(activityItem)
            BaseFunc.AddClickEvent(activityItem.getChildByName("nodeContentRightImage"), this.node, this.thisComponentName, "onPressImage", 0, 0);

            this.prefabInstance[spriteFrame.name] = activityItem
        }
        // nodeContentRightPrefab
    }

    showPrefab(item) {
        // let item = this.actives[this._selectId]
        let curPrefab = item.noticePrefab

        if (!!this.prefabInstance[curPrefab.name]) {
            this.prefabInstance[curPrefab.name].active = true
        } else {
            let activityItem = cc.instantiate(curPrefab)
            activityItem.active = true
            activityItem.parentView = this
            activityItem.setPosition(0, 0)
            this["nodeContentRight"].addChild(activityItem)

            this.prefabInstance[curPrefab.name] = activityItem
        }
    }

    showPrefabByName(item) {
        item.isActive = true
        if (!!this.prefabInstance[item.noticePrefabName]) {
            this.prefabInstance[item.noticePrefabName].active = true
            if(this.prefabInstance[item.noticePrefabName].getComponent(cc.Component).onActive) {
                this.prefabInstance[item.noticePrefabName].getComponent(cc.Component).onActive()
            }
        }
    }

    onPressImage() {
        if (-1 == this._selectId) 
            return;

        if (null != this.actives[this._selectId] && "" != this.actives[this._selectId].popSceneName) {
            SceneManager.Instance.popScene("moduleLobby", this.actives[this._selectId].popSceneName);
            // this.closeSelf()
        }
    }

    onCloseScene() {

    }

    _stack = []
    _loading = false
    loadPage() {
        if (this._loading || !this._stack || this._stack.length == 0)
            return

        let prefab = this._stack[0]
        this._stack.shift()
        this._loading = true
        let self = this
        cc.loader.loadRes("moduleLobby/prefab/" + prefab.noticePrefabName, 
            (err, res) => {
                if (err) cc.log(err)
                if (null == self.node || !self.node.isValid)
                    return
                let activityItem = cc.instantiate(res)
                activityItem.active = prefab.isActive || false //ActiveList[this._selectId].noticePrefabName == prefab.noticePrefabName
                activityItem.parentView = self
                activityItem.position = cc.Vec2.ZERO
                // activityItem.setContentSize(self["nodeContentRight"].getContentSize())
                self["nodeContentRight"].addChild(activityItem)
                // activityItem.scale = self["nodeContentRight"].scale;
                self.prefabInstance[activityItem.name] = activityItem
                cc.log(prefab.noticePrefabName + " end load:" + new Date().getTime())
                self._loading = false
                self.loadPage()
            }
        )
    }

    pushLoadStack(prefab, bHead = false) {
        if (bHead) {            
            this._stack.unshift(prefab)
        }
        else {
            this._stack.push(prefab)
        }
        // this.loadPage()
    }

    onBeforeOpen() {
        if (cc.sys.isNative) {
            this.deleteActive("登录有礼")
        }

        let timeZone: { startTime: string, endTime: string } = DataManager.Instance.onlineParam.LuckyBlessTimeZone || { startTime: "20201001", endTime: "20201008" }
        const t = Math.floor(new Date().getTime() / 1000)
        if (t < time.toTimeStamp(timeZone.startTime) || t > time.toTimeStamp(timeZone.endTime)) {
            timeZone = DataManager.Instance.onlineParam.LuckyBlessShowTimeZone || { startTime: "20201001", endTime: "20201011" }
            if (t < time.toTimeStamp(timeZone.startTime) || t > time.toTimeStamp(timeZone.endTime)) {
                this.deleteActive("幸运祈福")
            }
        }

        if (cc.sys.isNative || DataManager.CommonData["stayDay"] < 7 || DataManager.CommonData["roleCfg"]["roundSum"] < 5000) {
            this.deleteActive("APP福利")
        }
        if (DataManager.CommonData.IPLocation == null || ["北京市", "上海市", "广东省"].indexOf(DataManager.CommonData.IPLocation.province) != -1) {
            this.deleteActive("APP福利")
        }
    }

    deleteActive(name: string) {
        for (let i = 0; i < ActiveList.length; i++) {
            if (ActiveList[i].buttonName == name) {
                ActiveList.splice(i, 1)
                break
            }
        }
    }
}
