import BaseScene from "../base/baseScene/BaseScene";
import DataManager from "../base/baseData/DataManager";
import { getVipConfig, getADConfig } from "./LobbyFunc";
import { AdsConfig } from "../base/baseData/AdsConfig";
import { getNameByItemId, numberFormat } from "../base/BaseFuncTs";

const { ccclass, property } = cc._decorator;

@ccclass
export default class VipInfoPop extends BaseScene {

    onOpenScene() {
        if (null == DataManager.CommonData["VipInfo"])
            getVipConfig(this.updateVipInfo.bind(this))
        else
            this.updateVipInfo()
    }

    updateVipInfo() {
        if (null == DataManager.CommonData["adConfig"]) {
            getADConfig(this.updateVipInfo.bind(this))
            return
        }

        let vipString = cc.find("nodePop/vip_tips_string", this.node)
        vipString.getChildByName("lv").getComponent(cc.Label).string = "vip" + (DataManager.CommonData["VipData"].vipLevel + 1)
        vipString.getChildByName("score").getComponent(cc.Label).string = (DataManager.CommonData["VipData"].nextVipneedMoney) + "y"

        let model = cc.find("nodePop/nodeRecord/view/item", this.node)
        let content = cc.find("nodePop/nodeRecord/view/content", this.node)

        let idx = 0
        let nextNeed = 0
        for (const iterator of DataManager.CommonData["VipInfo"]) {
            if (iterator["vipLv"] == 0)
                continue

            if (iterator["vipLv"] == (DataManager.CommonData["VipData"].vipLevel + 1))
                nextNeed = iterator["payMoney"]

            let item = cc.instantiate(model)

            item.parent = content
            item.position = cc.v2(0, idx * -58 - 29)

            let desc = iterator["desc"] as string
            // 每天可兑换1次2元红包\r\n金券兑换金叶子多送1
            // desc = desc.replace("红包", "话费")

            item.getChildByName("viplv").getComponent(cc.Label).string = iterator["vipLvName"]
            item.getChildByName("exchangeName").getComponent(cc.Label).string = desc.substring(desc.indexOf("次") + 1, desc.indexOf("红包") + 2)
            item.getChildByName("redpacketLimit").getComponent(cc.Label).string = (iterator["vipLv"] < 3 ? "累计可" : "每日可") + desc.substring(desc.indexOf("兑换") + 1, desc.indexOf("次") + 1)
            item.getChildByName("goldaddition").getComponent(cc.Label).string = "多送" + iterator["sendProportion"] * 100 + "%"

            let str = ""
            for (let val of DataManager.CommonData["adConfig"]) {
                if (val.ca_award_id === AdsConfig.taskAdsMap.Wages) {
                    let ac = val.award
                    for (let a of ac) {
                        if (a.ca_award_index === 0 && a.ca_sequence === iterator["vipLv"]) {
                            str += numberFormat(a.ca_award_num) + getNameByItemId(a.ca_award_index)
                        }
                    }
                    break;
                }
            }

            item.getChildByName("dayWages").getComponent(cc.Label).string = str
            
            idx++
        }

        let size = content.getContentSize()
        content.setContentSize(size.width, 58 * idx)

        let vipLvProgress = cc.find("nodePop/vipLvProgress", this.node)
        vipLvProgress.getComponent(cc.ProgressBar).progress = (nextNeed - DataManager.CommonData["VipData"].nextVipneedMoney) / nextNeed
        let vipexp = cc.find("nodePop/vipexp", this.node)
        vipexp.getComponent(cc.Label).string = ((nextNeed - DataManager.CommonData["VipData"].nextVipneedMoney)) + "/" + (nextNeed)

        let lv = DataManager.CommonData["VipData"].vipLevel
        let vip_lv_bg = cc.find("nodePop/vip_lv_bg/vip_icon_" + lv, this.node)
        if (vip_lv_bg) vip_lv_bg.active = true
    }


}
