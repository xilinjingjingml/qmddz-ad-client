import BaseScene from "../base/baseScene/BaseScene";
import ItemData from "../base/baseData/ItemData";
import { getNowTimeUnix } from "../base/BaseFuncTs";
import SceneManager from "../base/baseScene/SceneManager";
import DataManager from "../base/baseData/DataManager";

const {ccclass, property} = cc._decorator;

let unselColor = new cc.Color(134, 93, 56)
let selColor = new cc.Color(172, 27, 3)

// let activeButtonList = [
//     ["送5万趣金币", 0, 0],
//     ["每日瓜分趣金币", 0, 0],
//     ["游戏入口", 0, 0],
//     ["88元赏金", 0, 0],
//     ["1元福利", 0, 0],
//     ["迎双11", 0, 0],
// ]

@ccclass("ActiveItem")
class ActiveItem {
    @property()
    buttonName: string = ""
    @property({
        type: cc.SpriteFrame
    })
    noticeSprite = null
    @property({
        type: cc.SpriteFrame
    })
    normalButton = null
    @property({
        type: cc.SpriteFrame
    })
    selectButton = null
    @property()
    startShow: number = -1
    @property()
    endShow: number = -1
    @property()
    popSceneName: string = ""
    @property()
    param: string = ""
}

@ccclass
export default class ActivePop extends BaseScene {

    @property({
        type: [ActiveItem]
    })
    actives = []

    _items: any[] = []
    _selectId: number = -1;
    _selectName: string = ""

    onOpenScene() {
        let self = this
        let nDay = new Date()
        let model = cc.find("nodePop/menu/model", this.node)
        let menus = cc.find("nodePop/menu/view/content", this.node)
        let first = -1;

        if (this.initParam && this.initParam["pageNum"])
            this._selectId = parseInt(this.initParam["pageNum"])
        
        if (this.initParam && this.initParam["selectName"])
            this._selectName = this.initParam["selectName"]

        if (null != model){
            for (let idx = 0; idx < this.actives.length ; idx++) {
                if (this.actives[idx].buttonName === "VIP新春大礼" && null == DataManager.CommonData["roleCfg"]["targetAward"]) {
                    this._selectId++
                    continue
                }

                if (this.actives[idx].startShow != -1 && getNowTimeUnix() < this.actives[idx].startShow)
                    continue;

                if (this.actives[idx].endShow != -1 && getNowTimeUnix() > this.actives[idx].endShow)
                    continue;


                if (nDay.getDay() == 0 || nDay.getDay() == 6) {
                    if(this.actives[idx].buttonName === "欢乐嘉年华") {
                        continue
                    }
                }else{
                    if(this.actives[idx].buttonName === "周末嘉年华") {
                        continue
                    }
                }

                if (this.actives[idx].buttonName === "送5万趣金币" && DataManager.CommonData["morrow"] >= 3) {
                    continue;
                }

                if (this.actives[idx].buttonName === "88元赏金" && DataManager.CommonData["regtime"] >= 1578412800) {
                    continue;
                }

                // if (this.actives[idx].buttonName === "充值返利" && cc.sys.isBrowser) {
                //     this._selectId++
                //     continue;
                // }

                first = first == -1 ? idx : first

                let item = cc.instantiate(model)
                item.parent = menus
                item.position = cc.v2(2, 0)
                this._items[idx] = item
                item.active = true
                item.name = "button" + idx
                let tabStr = this.actives[idx].buttonName
                item.getChildByName("Background").getChildByName("tabname").getComponent(cc.Label).string = tabStr
                item.getChildByName("checkmark").getChildByName("tabname").getComponent(cc.Label).string = tabStr
                // if (this.actives[idx].normalButton)
                //     item.getChildByName("Background").getChildByName("tabname").getComponent(cc.Sprite).spriteFrame = this.actives[idx].normalButton
                // if (this.actives[idx].selectButton)
                //     item.getChildByName("checkmark").getChildByName("tabname").getComponent(cc.Sprite).spriteFrame = this.actives[idx].selectButton
                
                let btn = item.getComponent(cc.Button)                
                let clickEventHandler = new cc.Component.EventHandler();
                clickEventHandler.target = this.node; 
                clickEventHandler.component = "ActivePop";
                clickEventHandler.handler = "onActive" + idx; 
                let id = idx
                this["onActive" + idx] = () => {
                    // self.initButtons()
                    self.onButton(id)
                }          
                btn.clickEvents.push(clickEventHandler);

                if (this._selectName == this.actives[idx].buttonName || (this._selectName == "" && this._selectId == idx)) {
                    first = idx
                    btn.getComponent(cc.Toggle).isChecked = true
                    if (idx * item.getContentSize().height > menus.parent.getContentSize().height) {
                        let pos = menus.position                        
                        pos.y -= (idx - Math.ceil(menus.parent.getContentSize().height / item.getContentSize().height) * item.getContentSize().height)
                        menus.position = pos
                    }
                }
            }

            this.onButton(first)
        }

        // if (this.initParam && this.initParam["pageNum"])
        //     this.onButton(this.initParam["pageNum"])
        // else
        //     this.onButton(0)
    }

    // initButtons() {
    //     for (let iter of this._items) {
    //         if (typeof iter == "undefined")
    //             continue;

    //         iter.getComponent(cc.Button).interactable = true
    //         // iter.getChildByName("label").getComponent(cc.Label).Color = unselColor
    //     }
    // }    

    onButton(idx = 0) {
        this._selectId = idx

        this._items.map(item => item.getComponent(cc.Button).interactable = true)

        if (null != this._items[idx]) {
            // this._items[idx].getComponent(cc.Button).interactable = false
            // this._items[idx].getChildByName("label").getComponent(cc.Label).Color = selColor
            let notice = cc.find("nodePop/notice/notice/bg", this.node).getComponent(cc.Sprite)
            notice.spriteFrame = this.actives[idx].noticeSprite
        }
    }

    onPressNotice() {
        if (-1 == this._selectId) 
            return;

        if (null != this.actives[this._selectId] && "" != this.actives[this._selectId].popSceneName) {
            if ("postMsg" == this.actives[this._selectId].popSceneName) {
                SceneManager.Instance.sendMessageToScene(this.actives[this._selectId].param)
                this.closeSelf()
            }
            else {
                let param = {
                    closeCallback: this.initParam["closeCallback"],
                    selectName: this.actives[this._selectId].buttonName
                }
                if (this.actives[this._selectId].param) {
                    let tmp = this.actives[this._selectId].param.split("|")
                    for (let i = 0; i < tmp.length / 2; i++) {
                        if (tmp[i] && tmp[i + 1])
                            param[tmp[i]] = tmp[i + 1]
                    }
                }
    
                SceneManager.Instance.popScene("moduleLobby", this.actives[this._selectId].popSceneName, param);
                this.initParam["closeCallback"] = null
                this.closeSelf()
            }            
        }
    }
}
