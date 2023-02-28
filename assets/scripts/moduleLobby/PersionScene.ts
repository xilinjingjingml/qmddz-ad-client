import DataManager from "../base/baseData/DataManager"
import { copyToClipBoard, iMessageBox, updateUserInfo } from "../base/BaseFuncTs"
import BaseScene from "../base/baseScene/BaseScene"
import WxWrapper from "../base/WxWrapper"
import { getMobileState, getVipConfig } from "./LobbyFunc"
import PluginManager from "../base/PluginManager";
import { kickout, MsgBox } from "../base/BaseFuncTs";
import { NodeExtends } from "../base/extends/NodeExtends"
import { http } from "../base/utils/http"

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


        NodeExtends.setNodeSpriteNet({ node: cc.find("nodePop/nodeTop/nodeFace/nodeMask/face", this.node), url: DataManager.UserData.face, fixSizeBySize: cc.size(84, 84) })

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
        this.updateBindWeiXin()
        return
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
		cc.audioEngine.playEffect(DataManager.Instance.menuEffect, false)
        WxWrapper.getUserInfo((err, uinfo) => {
            uinfo ? updateUserInfo() : iMessageBox("同步数据失败 请打开用户信息授权")
        })
    }

    onUserInfoUpdate() {
        cc.find("nodePop/nodeTop/nickname", this.node).getComponent(cc.Label).string = DataManager.UserData.nickname

        NodeExtends.setNodeSpriteNet({ node: cc.find("nodePop/nodeTop/nodeFace/nodeMask/face", this.node), url: DataManager.UserData.face, fixSizeBySize: cc.size(84, 84) })
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
        cc.find("nodePop/nodeBottom/btnBind", this.node).active = true
        cc.find("nodePop/nodeBottom/phoneBind", this.node).active = true
        if (DataManager.CommonData["bindPhone"] && DataManager.CommonData["bindPhone"].hasBindMoble == 1) {
            cc.find("nodePop/nodeBottom/btnBind", this.node).active = false
            cc.find("nodePop/nodeBottom/phoneBind", this.node).active = true
            let phone = "" + DataManager.CommonData["bindPhone"].BindPhone
            phone = phone.substr(0, 3) + "****" + phone.substring(7)
            cc.find("nodePop/nodeBottom/phoneBind/labelPhone", this.node).getComponent(cc.Label).string = phone
        } else {
            cc.find("nodePop/nodeBottom/phoneBind", this.node).active = false
        }
    }

    onPressCopy() {
		cc.audioEngine.playEffect(DataManager.Instance.menuEffect, false)
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

            http.open(DataManager.getURL("SEXCOMMIT"), param, function (msg) {
                if (msg && msg.ret == 0) {
                    DataManager.UserData.sex = parseInt(sex)
                    iMessageBox("修改性别成功")
                }
            })
        }
    }

    /**
     * 切换登陆方式
     */
    onPressChange() {
        cc.log("[PersionScene.onPressChange]")
        cc.audioEngine.playEffect(DataManager.Instance.menuEffect, false)
        this.closeSelf()
        kickout()
    }

    /**
     * 绑定微信
     */
    onPressBindWeiXin() {
        cc.log("[PersionScene.onPressBindWeiXin]")
        cc.audioEngine.playEffect(DataManager.Instance.menuEffect, false)
        DataManager.CommonData['isBindingWX'] = true
        PluginManager.login({ sessionType: "SessionWeiXin" })
    }

    updateBindWeiXin() {
        cc.find("nodePop/nodeBottom/BindWeiXin", this.node).active = false
        cc.find("nodePop/nodeBottom/btnBindWeiXin", this.node).active = false
        if (DataManager.CommonData["ifBindWeixin"]) {
            cc.find("nodePop/nodeBottom/BindWeiXin", this.node).active = true
        } else if (PluginManager.hasPluginByName('SessionWeiXin')) {
            cc.find("nodePop/nodeBottom/btnBindWeiXin", this.node).active = true
        }
    }

    PluginSessionCallBack(message: any): void {
        cc.log("[PersionScene.PluginSessionCallBack] data", message.data)
        if (DataManager.CommonData['isBindingWX']) {
            DataManager.CommonData['isBindingWX'] = false
            const data: { SessionResultCode: number, msg: string, sessionInfo: any } = JSON.parse(message.data)
            if (data.SessionResultCode == 0) {
                this.bindWeixin(data.sessionInfo)
            }
        }
    }

    bindWeixin(sessionInfo: any) {
        const url = DataManager.getURL("BIND_WEIXIN")
        const param = {
            visitorUid: DataManager.UserData.guid,
            ticket: DataManager.UserData.ticket,
            gameid: DataManager.Instance.gameId,
            weixinUid: sessionInfo.pid,
            openId: sessionInfo.openId,
            type: 0,
        }
        http.open(url, param, (event: any) => {
            if (event) {
                if (event.ret == 1) {
                    MsgBox({
                        content: "该微信账号已存在，请先更换其他微信号，再进行绑定。",
                        buttonNum: 1,
                        confirmClose: true,
                    })
                    return
                }

                if (event.ret > 1) {
                    DataManager.CommonData["ifBindWeixin"] = true
                    this.updateBindWeiXin()
                }
                iMessageBox(event.msg)
                PluginManager.login({ sessionType: DataManager.load("last_login_type") })
            } else {
                iMessageBox("绑定失败，请稍后再试！")
            }
        })
    }
}
