import BaseScene from "../base/baseScene/BaseScene";
import DataManager from "../base/baseData/DataManager";
import { getADDraw } from "./LobbyFunc";

const {ccclass, property} = cc._decorator;

@ccclass
export default class RPUnenoughGuidePop extends BaseScene {

    onOpenScene() {        
        // if (DataManager.CommonData["morrow"] >= 7) {
        //     cc.find("nodePop/mainScroll/view/content/nodeItem0", this.node).active = false

        //     for (let i = 1; i < 4; i++) {
        //         let node = cc.find("nodePop/mainScroll/view/content/nodeItem" + i, this.node)
        //         node.position = cc.v2(node.position.x, node.position.y + 116)
        //     }

        //     let content = cc.find("nodePop/mainScroll/view/content", this.node)
        //     content.setContentSize(content.getContentSize().width, content.getContentSize().height - 124)
        // }
    }
    
    onPressADQtt(event, data) {

        let adNum = parseInt(data)
        getADDraw(adNum)
    }
}
