import DataManager from "../base/baseData/DataManager"
import { copyToClipBoard, iMessageBox, updateUserInfo } from "../base/BaseFuncTs"
import BaseScene from "../base/baseScene/BaseScene"
import WxWrapper from "../base/WxWrapper"
import { getMobileState, getVipConfig } from "./LobbyFunc"
import BaseFunc = require("../base/BaseFunc")

const { ccclass } = cc._decorator

@ccclass
export default class PersionScene extends BaseScene {

    onOpenScene() {
        cc.find("nodePop/nodeTop/nickname", this.node).getComponent(cc.Label).string = DataManager.UserData.nickname
        cc.find("nodePop/nodeTop/labelGuid", this.node).getComponent(cc.Label).string = "ID:" + DataManager.UserData.guid

        if (DataManager.UserData.sex == 0)
            cc.find("nodePop/nodeTop/labelSex/btnMan", this.node).getComponent(cc.Toggle).isChecked = true
        else
            cc.find("nodePop/nodeTop/labelSex/btnWoman", this.node).getComponent(cc.Toggle).isChecked = true


        const face = cc.find("nodePop/nodeTop/nodeFace/nodeMask/face", this.node)
        BaseFunc.SetFrameTextureNet(face.getComponent(cc.Sprite), DataManager.UserData.face, () => {
            if (face.isValid) {
                face.scale = Math.max(84 / face.width, 84 / face.height)
            }
        })

        if (null == DataManager.CommonData["VipInfo"])
            getVipConfig(this.updateVipInfo.bind(this))
        else
            this.updateVipInfo()

        if (null == DataManager.CommonData["bindPhone"].hasBindMoble)
            getMobileState(this.updateBindPhone.bind(this))
        else
            this.updateBindPhone()
    }

    onAfterOpen() {
        WxWrapper.checkUserScope("userInfo", (canUse) => {
            if (this.isValid && !canUse) {
                const box = cc.find("nodePop/nodeTop/btnSync", this.node).getBoundingBoxToWorld()
                WxWrapper.showUserInfoButton(box, updateUserInfo)
            }
        })
    }

    onCloseScene() {
        WxWrapper.hideUserInfoButton()
    }

    onPressWxUserInfo() {
        WxWrapper.getUserInfo((err, uinfo) => {
            uinfo ? updateUserInfo() : iMessageBox("同步数据失败 请打开用户信息授权")
        })
    }

    onUserInfoUpdate() {
        cc.find("nodePop/nodeTop/nickname", this.node).getComponent(cc.Label).string = DataManager.UserData.nickname

        const face = cc.find("nodePop/nodeTop/nodeFace/nodeMask/face", this.node)
        BaseFunc.SetFrameTextureNet(face.getComponent(cc.Sprite), DataManager.UserData.face, () => {
            if (face.isValid) {
                face.scale = Math.max(84 / face.width, 84 / face.height)
            }
        })
    }

    updateVipInfo() {
        // VIP信息
        let nextNeed = 0
        if (null == DataManager.CommonData["VipData"])
            return

        for (const iterator of DataManager.CommonData["VipInfo"]) {
            if (iterator["vipLv"] == (DataManager.CommonData["VipData"].vipLevel + 1)) {
                nextNeed = iterator["payMoney"]
                break
            }
        }

        const lv = "" + (DataManager.CommonData["VipData"].vipLevel || 0)
        cc.find("nodePop/nodeTop/VIP/labelLv", this.node).getComponent(cc.Label).string = lv
        cc.find("nodePop/nodeTop/progressLv/labelLv", this.node).getComponent(cc.Label).string = lv
        cc.find("nodePop/nodeTop/progressLv", this.node).getComponent(cc.ProgressBar).progress = (nextNeed - DataManager.CommonData["VipData"].nextVipneedMoney) / nextNeed
    }

    updateBindPhone() {
        if (DataManager.CommonData["bindPhone"] && DataManager.CommonData["bindPhone"].hasBindMoble == 1) {
            cc.find("nodePop/nodeBottom/btnBind", this.node).active = false
            cc.find("nodePop/nodeBottom/phoneBind", this.node).active = true
            let phone = "" + DataManager.CommonData["bindPhone"].BindPhone
            phone = phone.substr(0, 3) + "****" + phone.substring(7)
            cc.find("nodePop/nodeBottom/phoneBind/labelPhone", this.node).getComponent(cc.Label).string = phone
        }
    }

    onPressCopy() {
        copyToClipBoard(DataManager.UserData.guid)
    }

    onPressSex(event, sex) {
        cc.audioEngine.playEffect(DataManager.Instance.menuEffect, false)

        if (DataManager.UserData.sex != sex) {
            const param = {
                pid: DataManager.UserData.guid,
                ticket: DataManager.UserData.ticket,
                sex: sex
            }

            BaseFunc.HTTPGetRequest(DataManager.getURL("SEXCOMMIT"), param, function (msg) {
                if (msg && msg.ret == 0) {
                    DataManager.UserData.sex = parseInt(sex)
                    iMessageBox("修改性别成功")
                }
            })
        }
    }
}
