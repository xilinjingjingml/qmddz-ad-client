import BaseScene from "../base/baseScene/BaseScene";
import DataManager from "../base/baseData/DataManager";
import { copyToClipBoard, showAwardResultPop } from "../base/BaseFuncTs";
import BaseFunc = require("../base/BaseFunc")

const {ccclass, property} = cc._decorator;

@ccclass
export default class VipNewYearPop extends BaseScene {

    onEnable() {
        let awards = DataManager.CommonData["roleCfg"]["targetAward"]

        let model = cc.find("nodeMain/nodeAward/nodeItem", this.node)
        let nodeAward = cc.find("nodeMain/nodeAward", this.node)
        if (awards) {
            // let price = 0
            for (let idx in awards) {
                let item = cc.instantiate(model)
                let award = awards[idx]

                item.parent = nodeAward
                item.position = cc.v2(nodeAward.getContentSize().width / (awards.length + 1) * (parseInt(idx) + 1) - nodeAward.getContentSize().width / 2, 0)
                item.active = true

                let icon = item.getChildByName("item" + award.rl_item_index)
                if (icon) icon.active = true
                item.getChildByName("lblNum").getComponent(cc.Label).string = "x" + award.rl_item_num

                item.getChildByName("awardMask").active = DataManager.CommonData["VIP_NEW_YEAR_FINISH"]

                // if (award.rl_item_index == 0) 
                //     price += (award.rl_item_num / 10000)
                // else if (award.rl_item_index == 2)
                //     price += (award.rl_item_num / 20)
                // else if (award.rl_item_index == 365)
                //     price += (award.rl_item_num / 10000)

                cc.find("nodeMain/lblPrice", this.node).getComponent(cc.Label).string = award.rl_award_desc + ""
            }
        }

        cc.find("nodeMain/nodeH5Tip", this.node).active = cc.sys.isBrowser
        cc.find("nodeMain/nodeAppTip", this.node).active = !cc.sys.isBrowser

        cc.find("nodeMain/nodeAppTip/btnGetAward", this.node).active = (null == DataManager.CommonData["VIP_NEW_YEAR_FINISH"])
        cc.find("nodeMain/nodeAppTip/btn_already_get", this.node).active = DataManager.CommonData["VIP_NEW_YEAR_FINISH"]
    }

    // onCloseScene() {
        
    // }

    onPressCopy() {
        copyToClipBoard(DataManager.Instance.wechatPublic, "公众号名称复制成功")
    }

    onPressGetAward() {
        let url = DataManager.getURL("H5_USER_AWARD")
        let params = {
            uid: DataManager.UserData.guid,
        };

        let self = this
        BaseFunc.HTTPGetRequest(url, params, function(msg) {
            if (null == msg)
                return

            if (msg.ret == 0) {
                if (DataManager.CommonData["roleCfg"]["targetAward"]) {
                    let awards = []
                    for(let iter of DataManager.CommonData["roleCfg"]["targetAward"]) {
                        let award = {
                            index: iter.rl_item_index,
                            num: iter.rl_item_num
                        }
                        awards.push(award)
                    }
                    showAwardResultPop(awards)
                    DataManager.CommonData["VIP_NEW_YEAR_FINISH"] = true

                    if (null != self){
                        self.onEnable()
                    }
                }                
            }
            
        })
    }
}
