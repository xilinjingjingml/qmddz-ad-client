import { getLowMoneyRoom, enterGame, czcEvent, playADBanner, getSpriteByItemId, getNameByItemId, numberFormat3 } from "../base/BaseFuncTs";
import DataManager from "../base/baseData/DataManager";
import BaseComponent from "../base/BaseComponent";
import { AdsConfig } from "../base/baseData/AdsConfig";

const {ccclass, property} = cc._decorator;

@ccclass
export default class AwardResultPop extends BaseComponent {

    @property()
    closeTime: number = 3

    @property({
        type: cc.AudioClip 
    })
    popEffect = null

    onOpenScene() {
        playADBanner(true, AdsConfig.banner.AwardResultPop)
        if (this.initParam){
            let itemsNode = cc.find("nodeMain/nodePop/items", this.node)

            itemsNode.children.forEach(item => item.active = false)

            let awards = this.initParam["awards"].filter(item => item.index !== 400)            

            let showRedPacket = false
            let idx = 1;
            let model = itemsNode.getChildByName("item")
            for (const iterator of awards) {
                let item = cc.instantiate(model)
                item.active = true
                item.position = cc.v2(idx * itemsNode.getContentSize().width / (awards.length + 1) - itemsNode.getContentSize().width / 2, 1)
                model.parent.addChild(item)
                item.getChildByName("name").getComponent(cc.Label).string = getNameByItemId(iterator.index) || "未知"
                let ii = iterator.index
                if (ii == 365) showRedPacket = true
                if (ii < 0) ii += "" + iterator.num
                if (ii === 0) ii = 10000
                let icon = item.getChildByName("icon")
                let size = icon.getContentSize()
                icon.getComponent(cc.Sprite).spriteFrame = getSpriteByItemId(ii)                
                let nsize = icon.getContentSize()
                let scaleX = size.width / nsize.width
                let scaleY = size.height / nsize.height
                icon.scale = Math.min(scaleX, scaleY)

                if (iterator.index === 11000)
                    item.getChildByName("num").getComponent(cc.Label).string = iterator.index == -1 ? ("x" + 1) : ("x" + numberFormat3(iterator["num"]))
                else 
                item.getChildByName("num").getComponent(cc.Label).string = iterator.index == -1 ? ("x" + 1) : ("x" + iterator["num"])
                
                idx++
            }

            if (this.initParam["msg"])
                cc.find("nodeMain/nodePop/labelMsg", this.node).getComponent(cc.RichText).string = this.initParam["msg"]

            if (null == DataManager.CommonData["gameServer"] && this.initParam["goGame"] == true && DataManager.CommonData["gameServer"] == null) {
                czcEvent("大厅", "领取奖励1", "获取奖励界面 " + DataManager.Instance.userTag)
                cc.find("nodeMain/btnConfirm", this.node).getComponent(cc.Sprite).spriteFrame = DataManager.Instance.getSpriteFrame("common", "btn_goto_game2")

                let clickEventHandler = new cc.Component.EventHandler();
                clickEventHandler.target = this.node; 
                clickEventHandler.component = "AwardResultPop";
                clickEventHandler.handler = "enterGame"; 

                this["enterGame"] = () => {
                    czcEvent("大厅", "领取奖励2", "前往游戏 " + DataManager.Instance.userTag)
                    this.goToGame()
                }
                
                cc.find("nodeMain/btnConfirm", this.node).getComponent(cc.Button).clickEvents.push(clickEventHandler);
            }

            if (this.initParam["confirmButton"]) {
                cc.find("nodeMain/btnConfirm", this.node).getComponent(cc.Sprite).spriteFrame = this.initParam["confirmButton"].getComponent(cc.Sprite).spriteFrame
            }

            if (this.initParam["cancelButton"]) {
                let nodeCancel = cc.find("nodeMain/btnCancel", this.node)
                let nodeConfirm = cc.find("nodeMain/btnConfirm", this.node)
                nodeCancel.active = true
                nodeCancel.getComponent(cc.Sprite).spriteFrame = this.initParam["cancelButton"].getComponent(cc.Sprite).spriteFrame
                let size = this.initParam["cancelButton"].getContentSize()
                nodeCancel.setContentSize(size)
                let point = nodeConfirm.position
                point.y -= nodeConfirm.getContentSize().height / 2 + 20
                nodeCancel.position = point
            }

            if (this.initParam["confirmFunc"]) {
                let clickEventHandler = new cc.Component.EventHandler();
                clickEventHandler.target = this.node; 
                clickEventHandler.component = "AwardResultPop";
                clickEventHandler.handler = "confirmFunc"; 

                this["confirmFunc"] = () => {
                    if (this.initParam["callback"]) 
                        this.initParam["callback"] = null
                    this.initParam["confirmFunc"]()
                }
                let events = cc.find("nodeMain/btnConfirm", this.node).getComponent(cc.Button).clickEvents
                for (let idx = events.length; idx >= 0; idx--){
                    events[idx + 1] = events[idx]
                }
                events[0] = (clickEventHandler);

                
            }

            if (showRedPacket) {
                cc.find("nodeMain/nodeVaule", this.node).active = true
                let num = DataManager.UserData.getItemNum(365)
                let str = num + " ≈ " + (num / 10000).toFixed(2) + "元"
                cc.find("nodeMain/nodeVaule/labelValue", this.node).getComponent(cc.Label).string = str
            }
        }

        this.node.zIndex = 600

        if (this.popEffect) {
            // cc.audioEngine.
            cc.audioEngine.playEffect(this.popEffect, false)
        }
    }

    onCloseScene() {
        if (this.initParam["callback"])
            this.initParam["callback"]()
        
        if (this.initParam["goGame"] == true && this.initParam["mustBeGame"] == true) {                        
            czcEvent("大厅", "领取奖励3", "关闭新人签到界面 " + DataManager.Instance.userTag)
            this.goToGame()
        }
    }

    onBannerResize(msg) {
        cc.log("AwardResultPop.onBannerResize", msg.rect.height)
        const box = cc.find("nodeMain/btnConfirm", this.node).getBoundingBoxToWorld()
        const diff = msg.rect.height - box.y
        if (diff > 0) {
            cc.find("nodeMain", this.node).y += diff
        }
    }

    onDestroy() {
        playADBanner(false, AdsConfig.banner.AwardResultPop)
    }

    goToGame() {
        if (DataManager.CommonData["gameServer"])
            return

        let gameId = DataManager.load(DataManager.UserData.guid + "lastGameId")
        if (null == gameId)
        gameId = 3892

        if (null != gameId) {
            let servers = getLowMoneyRoom(gameId)
            if (servers && servers.length > 0){
                let i = Math.floor(Math.random() * 100 % servers.length)
                enterGame(servers[i])
            }
        }
    }
}
