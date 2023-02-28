import BaseScene from "../base/baseScene/BaseScene";
import DataManager from "../base/baseData/DataManager";
import { getNowTimeUnix } from "../base/BaseFuncTs";

const {ccclass, property} = cc._decorator;

@ccclass
export default class VipActivePop extends BaseScene {

    onEnable() {
        this.onOpenScene()
    }

    onOpenScene() {
        let active = DataManager.Instance.onlineParam.oneYuanActive
        if (active && active.start <= getNowTimeUnix() && active.end >= getNowTimeUnix()) {
            let dStart = new Date(active.start * 1000)
            let day = Math.ceil((active.end - active.start) / 86400) - 1
            let dEnd = new Date(active.start * 1000)
            dEnd.setDate(dEnd.getDate() + day)
    
            cc.find("nodePop/date", this.node).getComponent(cc.Label).string = "活动时间: " + 
                (dStart.getMonth() + 1) + "月" + (dStart.getDate()) + "日" + "-" + (dEnd.getMonth() + 1) + "月" + (dEnd.getDate()) + "日"      
        }
        DataManager.CommonData[DataManager.UserData.guid + "VipActivePop"]
    }
}
