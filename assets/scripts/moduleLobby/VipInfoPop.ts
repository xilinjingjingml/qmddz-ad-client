import DataManager from "../base/baseData/DataManager"
import { getNameByItemId, numberFormat } from "../base/BaseFuncTs"
import BaseScene from "../base/baseScene/BaseScene"
import { getVipConfig, loadAdConfig } from "./LobbyFunc"

const { ccclass } = cc._decorator

@ccclass
export default class VipInfoPop extends BaseScene {

    onOpenScene() {
        DataManager.CommonData["VipInfo"] ? this.updateVipInfo() : getVipConfig(() => {
            this.isValid && this.updateVipInfo()
        })
    }

    updateVipInfo() {
        if (!DataManager.CommonData.AdConfig) {
            loadAdConfig(() => {
                this.isValid && this.updateVipInfo()
            })
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

            desc = desc.replace("红包", "话费")
            item.getChildByName("viplv").getComponent(cc.Label).string = iterator["vipLvName"]
            item.getChildByName("exchangeName").getComponent(cc.Label).string = desc.substring(desc.indexOf("次") + 1, desc.indexOf("话费") + 2)
            item.getChildByName("redpacketLimit").getComponent(cc.Label).string = (iterator["vipLv"] < 3 ? "累计可" : "每日可") + desc.substring(desc.indexOf("兑换") + 1, desc.indexOf("次") + 1)
            item.getChildByName("goldaddition").getComponent(cc.Label).string = "多送" + iterator["sendProportion"] * 100 + "%"

            let str = ""
            if (DataManager.CommonData.VipAwardConfig && DataManager.CommonData.VipAwardConfig[iterator["vipLv"]]) {
                const awards = DataManager.CommonData.VipAwardConfig[iterator["vipLv"]]
                for (const award of awards) {
                    if (award.index === 0) {
                        str += numberFormat(award.num) + getNameByItemId(award.index)
                    }
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
