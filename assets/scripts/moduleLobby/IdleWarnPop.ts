import BaseScene from "../base/baseScene/BaseScene";
import { czcEvent } from "../base/BaseFuncTs";
import DataManager from "../base/baseData/DataManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class IdleWarnPop extends BaseScene {

    onOpenScene() {
        let day = DataManager.CommonData["morrow"]
        czcEvent("大厅", "一分钟闲置通知", "弹出通知" + (day <= 1 ? day + "天新用户" : day <= 6 ? "7天内用户" : "超过7天用户"))
    }

    onPressOpen() {
        let day = DataManager.CommonData["morrow"]
        czcEvent("大厅", "一分钟闲置通知", "确认进入游戏" + (day <= 1 ? day + "天新用户" : day <= 6 ? "7天内用户" : "超过7天用户"))

        if (this.initParam["closeCallback"])
            this.initParam["closeCallback"] = null

        if (this.initParam["confirmCallback"])
            this.initParam["confirmCallback"]()

        this.closeSelf()
    }

}
