import BaseScene from "../base/baseScene/BaseScene";
import SceneManager from "../base/baseScene/SceneManager";
import { getHttpSpriteFrame, getLowMoneyRoom, enterGame, getNewBieServer, czcEvent, playADBanner, getSpriteByItemId } from "../base/BaseFuncTs";
import DataManager from "../base/baseData/DataManager";
import BaseComponent from "../base/BaseComponent";
import { AdsConfig } from "../base/baseData/AdsConfig";

const {ccclass, property} = cc._decorator;

const awardName = {
    "-1": "优惠券",
    "0": "金豆",
    "2": "记牌器",
    "365": "红包券",
    "367": "趣金币",
    "372": "钻石",
    "373": "超级加倍卡",
    "374": "VIP经验",
    "1192": "钻石",    
}

// const awardIcon = {
//     "-12": "dca_dc_item_2",
//     "-110": "dca_dc_item_10",
//     "-120": "dca_dc_item_20",
//     "-1100": "dca_dc_item_100",
//     "0": "goldbean",
//     "2": "item_icon_2",
//     "365": "redpacket_icon2",
//     "367": "qttgold",
//     "372": "diamond_icon",
//     "373": "double_card",
//     "1192": "diamond_icon",
// }

@ccclass
export default class AwardResultPop extends BaseComponent {

    @property()
    closeTime: number = 3

    @property({
        type: cc.AudioClip 
    })
    popEffect = null

    onOpenScene() {
        if (this.initParam){
                    
            if(playADBanner(true, AdsConfig.banner.AwardResultPop)) {
                this["nodeMain"].y += 50
            }
            // this.node.getChildByName("redpacket").active = this.initParam["itemIndex"] == 365
            // this.node.getChildByName("goldbean").active = this.initParam["itemIndex"] == 0

            // if (this.initParam["awardImg"]) {                
            //     let url = this.initParam["awardImg"]
            //     url = url.replace("http://activity.izhangxin.com/resources/images/dialImages/", "")
                
            //     let self = this
            //     let setSprite = function(spriteFrame) {
            //         let size = cc.size(spriteFrame._rect.width, spriteFrame._rect.height)
            //         self.node.getChildByName("goldbean").getComponent(cc.Sprite).spriteFrame = spriteFrame
            //          self.node.getChildByName("goldbean").setContentSize(size)
            //     }

            //     getHttpSpriteFrame(url, setSprite)

            // }
            // let awardNum = this.node.getChildByName("awardNum")
            // awardNum.getComponent(cc.Label).string = this.initParam["awardNum"]
            // awardNum.runAction(cc.sequence(cc.scaleTo(0.2, 1.5), cc.delayTime(0.2)))

            let itemsNode = cc.find("nodeMain/nodePop/items", this.node)

            itemsNode.children.forEach(item => item.active = false)

            let awards = this.initParam["awards"].filter(item => item.index !== 400)            

            let idx = 1;
            let model = itemsNode.getChildByName("item")
            for (const iterator of awards) {
                let item = cc.instantiate(model)
                item.active = true
                item.position = cc.v2(idx * itemsNode.getContentSize().width / (awards.length + 1) - itemsNode.getContentSize().width / 2, 1)
                model.parent.addChild(item)
                item.getChildByName("name").getComponent(cc.Label).string = awardName[iterator.index] || "未知"
                let ii = iterator.index
                if (ii < 0) ii += "" + iterator.num
                // if (awardIcon[ii] && item.getChildByName(awardIcon[ii]))
                //     item.getChildByName(awardIcon[ii]).active = true
                if (ii === 0) ii = 10000
                let icon = item.getChildByName("icon")
                let size = icon.getContentSize()
                icon.getComponent(cc.Sprite).spriteFrame = getSpriteByItemId(ii)                
                let nsize = icon.getContentSize()
                let scaleX = size.width / nsize.width
                let scaleY = size.height / nsize.height
                icon.scale = Math.min(scaleX, scaleY)


                item.getChildByName("num").getComponent(cc.Label).string = iterator.index == -1 ? ("x" + 1) : ("x" + iterator["num"])
                
                idx++
            }

            if (this.initParam["msg"])
                cc.find("nodeMain/nodePop/labelMsg", this.node).getComponent(cc.RichText).string = this.initParam["msg"]

            if (this.initParam["isQttPickup"]) {
                cc.find("nodeMain/nodePop/award_result_title", this.node).getComponent(cc.Sprite).spriteFrame = DataManager.Instance.getSpriteFrame("common", "qtt_award_title")        
                let num = 0
                if (awards && awards[0] && awards[0]["index"] == 367)
                    num =  awards[0]["num"]
                cc.find("nodeMain/nodePop/labelMsg", this.node).getComponent(cc.RichText).string = num + "趣金币已到账您的趣头条账号，请注意查收"
            }

            if (null == DataManager.CommonData["gameServer"] && this.initParam["goGame"] == true && DataManager.CommonData["gameServer"] == null) {
                czcEvent("大厅", "领取奖励1", "获取奖励界面 " + (DataManager.CommonData["morrow"] <= 1 ? DataManager.CommonData["morrow"] + "天新用户" : "老用户"))
                cc.find("nodeMain/btnConfirm", this.node).getComponent(cc.Sprite).spriteFrame = DataManager.Instance.getSpriteFrame("common", "btn_goto_game2")

                let clickEventHandler = new cc.Component.EventHandler();
                clickEventHandler.target = this.node; 
                clickEventHandler.component = "AwardResultPop";
                clickEventHandler.handler = "enterGame"; 

                this["enterGame"] = () => {
                    czcEvent("大厅", "领取奖励2", "前往游戏 " + (DataManager.CommonData["morrow"] <= 1 ? DataManager.CommonData["morrow"] + "天新用户" : "老用户"))
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
        }

        this.node.zIndex = 600

        if (this.popEffect) {
            // cc.audioEngine.
            cc.audioEngine.playEffect(this.popEffect, false)
        }
    }

    onCloseScene() {
        playADBanner(false)

        if (this.initParam["callback"])
            this.initParam["callback"]()
        
        if (this.initParam["goGame"] == true && this.initParam["mustBeGame"] == true) {                        
            czcEvent("大厅", "领取奖励3", "关闭新人签到界面 " + (DataManager.CommonData["morrow"] <= 1 ? DataManager.CommonData["morrow"] + "天新用户" : "老用户"))
            this.goToGame()
        }
    }

    onDestroy() {
        playADBanner(false)
    }

    goToGame() {
        if (DataManager.CommonData["gameServer"])
            return

        let gameId = DataManager.load(DataManager.UserData.guid + "lastGameId")
        if (null == gameId)
        gameId = 3892

        if (null != gameId) {
            let servers = getLowMoneyRoom(gameId)
            if (servers.length > 0){
                let i = Math.floor(Math.random() * 100 % servers.length)
                enterGame(servers[i])
            }
        }
    }    

    update(dt) {
        // this.closeTime -= dt
        // if (this.closeTime < 0)
        //     this.closeSelf()
    }
}
