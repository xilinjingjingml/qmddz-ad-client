import BaseScene from "../base/baseScene/BaseScene";
import DataManager from "../base/baseData/DataManager";
import BaseFunc = require("../base/BaseFunc")

const {ccclass, property} = cc._decorator;

@ccclass
export default class GameRulePop extends BaseScene {

    onOpenScene() {
        let gameId = this.initParam["gameId"]
        if (null == DataManager.CommonData["GAME_RULE"] || null == DataManager.CommonData["GAME_RULE"][gameId]) {
            this.getGameRule(gameId)
            return
        }

        this.updateRuleView(gameId)
    }

    updateRuleView(gameId) {
        let rule = DataManager.CommonData["GAME_RULE"]["" + gameId]
        let lbl = cc.find("nodePop/ruleView/view/content/label", this.node).getComponent(cc.Label)
        lbl.string = rule
    }

    getGameRule(gameId) {    
        let url = DataManager.getURL("GET_GAME_RULE")
        var params = {
            gameId: gameId
        }
        let self = this
        BaseFunc.HTTPGetRequest(url, params, function(msg) {
            if (null == msg)
                return
            if (null == DataManager.CommonData["GAME_RULE"])
                DataManager.CommonData["GAME_RULE"] = []

            let gameRule = msg.gameRule
            while(-1 != gameRule.indexOf("\\\""))
                gameRule = gameRule.replace("\\\"", "\"")
            while(-1 != gameRule.indexOf("\\\\n"))
                gameRule = gameRule.replace("\\\\n", "\n")
            // let rule = BaseFunc.IsJSON(msg.gameRule) ? JSON.parse(msg.gameRule) : ""
            gameRule = gameRule.substring(gameRule.indexOf("desc\":") + 7, gameRule.lastIndexOf("\"}]"))
            DataManager.CommonData["GAME_RULE"]["" + gameId] = gameRule
            self.updateRuleView(gameId)
        })
    }
}
