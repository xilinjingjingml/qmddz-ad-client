import BaseScene from "../base/baseScene/BaseScene";
import SceneManager from "../base/baseScene/SceneManager";
import DataManager from "../base/baseData/DataManager";
import { getLowMoneyRoom, enterGame } from "../base/BaseFuncTs";
import { exchangeQttCoin } from "./LobbyFunc";

const {ccclass, property} = cc._decorator;

@ccclass
export default class TokenGrowAniPop extends BaseScene {

    _targetPoint: cc.Vec2 = null

    onOpenScene() {
        // if (this.initParam && this.initParam["target"]){
        //     // let point = this.initParam["target"].parent.convertToWorldSpace(this.initParam["target"].position)
        //     this._targetPoint = this.node.convertToNodeSpaceAR(this.initParam["target"])
        // }

        exchangeQttCoin(true)

        if (this.initParam && this.initParam["itemIndex"]) {
            cc.find("nodeQtt/goldbean", this.node).active = this.initParam["itemIndex"] == 0
            cc.find("nodeQtt/redpacket_icon", this.node).active = this.initParam["itemIndex"] == 365
            cc.find("nodeQtt/qtt_coin", this.node).active = this.initParam["itemIndex"] == 367            
        }
            
        if (this.initParam && this.initParam["itemNum"]) {
            let msg = "+" + this.initParam["itemNum"] 
            if (this.initParam && this.initParam["itemIndex"]) {
                if (this.initParam["itemIndex"] == 0)
                    msg += "金豆"
                else if (this.initParam["itemIndex"] == 365)
                    msg += "红包券"
                else if (this.initParam["itemIndex"] == 367)
                    msg += "趣金币"                
            }

            cc.find("background6/lblMsg", this.node).getComponent(cc.Label).string = msg
        }            

        let self = this
        let coin = cc.find("nodeQtt", this.node)
        if (null != coin){
            if (this.initParam && this.initParam["target"]){
                this._targetPoint = coin.parent.convertToNodeSpaceAR(this.initParam["target"])
            }

            coin.runAction(cc.sequence(cc.delayTime(.5), 
                    cc.spawn(
                        cc.moveTo(1.2, this._targetPoint), 
                        cc.scaleTo(1.2, 0.2), 
                        cc.fadeOut(1.5)), 
                    cc.delayTime(0.5)
                    cc.callFunc(() => self.closeSelf())));

            this.node.getChildByName("background6").runAction(cc.sequence(cc.delayTime(1), cc.fadeOut(2)))
        }
    }

    onCloseScene() {
        SceneManager.Instance.sendMessageToScene({opcode: "tokenGrowUpdate", message: {index:this.initParam["itemIndex"], num: this.initParam["itemNum"]}})
    }
}
