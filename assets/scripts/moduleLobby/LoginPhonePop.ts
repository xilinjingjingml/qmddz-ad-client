import DataManager from "../base/baseData/DataManager";
import { czcEvent, iMessageBox, updateNodeWidget } from "../base/BaseFuncTs";
import BaseScene from "../base/baseScene/BaseScene";
import SceneManager from "../base/baseScene/SceneManager";
import PluginManager from "../base/PluginManager";
import { getMobileCode } from "./LobbyFunc";
import { NodeExtends } from "../base/extends/NodeExtends";

enum ELoginWay {
    eDuanXin = 1,
    eMiMa = 2,
    eReset = 3,
}

interface ICheckEditBox {
    phone: string,
    duanxin?: string,
    mima?: string,
    yanzhengma?: string
}

const { ccclass, property } = cc._decorator;

@ccclass
export default class LoginPhonePop extends BaseScene {

    _nodePopHeight: number
    _loginway: ELoginWay
    _showYanZhengMa: boolean = false

    onOpenScene() {
        czcEvent("登陆", "手机登陆", "请求手机登陆 " + (DataManager.CommonData["morrow"] <= 1 ? DataManager.CommonData["morrow"] + "天新用户" : "老用户"))
        cc.find("nodePop/tips", this.node).active = true
        cc.find("nodePop/tips", this.node).getComponent(cc.Label).string = ""
        this._nodePopHeight = cc.find("nodePop", this.node).height
        cc.find("nodePop/nodeTitle/toggle1", this.node).getComponent(cc.Toggle).check()
        if (DataManager.Instance.getOnlineParam("LoginPhoneOne", 1)) {
            cc.find("nodePop/nodeTitle", this.node).active = false
            cc.find("nodePop/nodeTitle2", this.node).active = true
        }
    }

    onPressDuanXinLogin() {
        this._loginway = ELoginWay.eDuanXin
        this.updateUI({
            duanxin: true,
            mima: false,
            yanzhengma: false,
        })
    }

    onPressMiMaLogin() {
        cc.find("nodePop/nodeContent/nodeMiMa/editMiMa", this.node).getComponent(cc.EditBox).string = ""
        this._loginway = ELoginWay.eMiMa
        this.updateUI({
            duanxin: false,
            mima: true,
            yanzhengma: this._showYanZhengMa,
        })
    }

    onPressRefreshYanZhengMa() {
        this._showYanZhengMa = true
        cc.find("nodePop/nodeYanZhengMa/editYanZhengMa", this.node).getComponent(cc.EditBox).string = ""
        const url = DataManager.getURL("PHONEVERIFY") + "?imei=" + PluginManager.getMacAddress() + "&rand=" + Math.random()
        cc.log("onPressRefreshYanZhengMa url", url)
        NodeExtends.setNodeSpriteNet({ node: cc.find("nodePop/nodeYanZhengMa/btnYanZhengMa/Background", this.node), url: url, delayShow: true })
    }

    onPressResetLogin() {
        this._loginway = ELoginWay.eReset
        this.updateUI({
            duanxin: true,
            mima: true,
            yanzhengma: false,
        })
    }

    updateUI(params: { duanxin: boolean, mima: boolean, yanzhengma: boolean, }) {
        cc.audioEngine.playEffect(DataManager.Instance.menuEffect, false)
        cc.find("nodePop/tips", this.node).getComponent(cc.Label).string = ""

        // 重置验证码按钮
        cc.find("nodePop/nodeContent/nodeDuanXin/editDuanxin", this.node).getComponent(cc.EditBox).string = ""
        cc.find("nodePop/nodeContent/nodeDuanXin/btnDuanxin/labelDuanxin", this.node).getComponent(cc.Label).string = "获取验证码"
        const button = cc.find("nodePop/nodeContent/nodeDuanXin/btnDuanxin", this.node)
        button.stopAllActions()
        button.getComponent(cc.Button).interactable = true

        // 设置界面状态
        cc.find("nodePop/nodeContent/nodeDuanXin", this.node).active = params.duanxin
        cc.find("nodePop/nodeContent/nodeMiMa", this.node).active = params.mima
        cc.find("nodePop/nodeYanZhengMa", this.node).active = params.yanzhengma
        cc.find("nodePop/nodeContent/nodeMiMa/btnMiMa", this.node).active = !(params.duanxin && params.mima)

        // 调整界面位置
        const height = (Number(params.duanxin) + Number(params.mima) + Number(params.yanzhengma)) * 120 + 388
        if (height != this._nodePopHeight) {
            this._nodePopHeight = height

            const nodePop = cc.find("nodePop", this.node)
            nodePop.height = this._nodePopHeight
            updateNodeWidget(nodePop)
        }
    }

    checkEditBox(params: ICheckEditBox): boolean {
        if (params.phone == "") {
            iMessageBox("请输入11位手机号码！")
            return
        }

        if (params.phone.length != 11) {
            iMessageBox("手机号码格式有误！")
            return
        }

        if (params.duanxin != null && params.duanxin.length != 6) {
            iMessageBox("请输入6位短信验证码！")
            return
        }

        if (params.mima != null && params.mima.length != 6) {
            iMessageBox("请输入6位密码！")
            return
        }

        if (params.yanzhengma != null && (params.yanzhengma.length != 4)) {
            iMessageBox("请输入验证码！")
            return
        }

        return true
    }

    onPressGetDuanxin() {
        cc.audioEngine.playEffect(DataManager.Instance.menuEffect, false)
        const params: ICheckEditBox = {
            phone: cc.find("nodePop/nodeContent/nodePhone/editPhone", this.node).getComponent(cc.EditBox).string
        }
        if (!this.checkEditBox(params)) {
            return
        }

        getMobileCode(params.phone, "reset", (msg: any) => {
            if (msg.ret == 0) {
                const button = cc.find("nodePop/nodeContent/nodeDuanXin/btnDuanxin", this.node)
                button.getComponent(cc.Button).interactable = false

                const label = button.getChildByName("labelDuanxin").getComponent(cc.Label)
                let waitTime = 60
                label.string = "(" + waitTime + ")"
                button.runAction(cc.repeat(
                    cc.sequence(
                        cc.delayTime(1),
                        cc.callFunc(() => {
                            waitTime--
                            label.string = "(" + waitTime + ")"
                            if (waitTime == 0) {
                                label.string = "获取验证码"
                                button.getComponent(cc.Button).interactable = true
                            }
                        })),
                    60))

                iMessageBox("验证码已通过短信发送到您的手机")
            } else {
                iMessageBox(msg.msg || "获取验证码失败")
            }
        })
    }

    onPressLogin() {
        cc.audioEngine.playEffect(DataManager.Instance.menuEffect, false)
        cc.find("nodePop/tips", this.node).getComponent(cc.Label).string = ""

        const params: ICheckEditBox = {
            phone: cc.find("nodePop/nodeContent/nodePhone/editPhone", this.node).getComponent(cc.EditBox).string
        }
        if (cc.find("nodePop/nodeContent/nodeDuanXin", this.node).active) {
            params.duanxin = cc.find("nodePop/nodeContent/nodeDuanXin/editDuanxin", this.node).getComponent(cc.EditBox).string
        }
        if (cc.find("nodePop/nodeContent/nodeMiMa", this.node).active) {
            params.mima = cc.find("nodePop/nodeContent/nodeMiMa/editMiMa", this.node).getComponent(cc.EditBox).string
        }
        if (cc.find("nodePop/nodeYanZhengMa", this.node).active) {
            params.yanzhengma = cc.find("nodePop/nodeYanZhengMa/editYanZhengMa", this.node).getComponent(cc.EditBox).string
        }
        if (!this.checkEditBox(params)) {
            return
        }

        cc.find("nodePop/btnConfirm", this.node).getComponent(cc.Button).interactable = false

        const loginInfo = {
            sessionType: "SessionPhone",
            phonenumber: params.phone,
            code: "",
            password: "",
            flag: "",
            logincode: "",
        }
        if (this._loginway == ELoginWay.eDuanXin) {
            loginInfo.code = params.duanxin
            loginInfo.password = "*~*~"
            loginInfo.flag = "phoneCodeLogin"
            loginInfo.logincode = params.duanxin
        } else if (this._loginway == ELoginWay.eMiMa) {
            loginInfo.password = params.mima
            loginInfo.flag = "login"
            if (params.yanzhengma) {
                loginInfo.logincode = params.yanzhengma
            }
        } else if (this._loginway == ELoginWay.eReset) {
            loginInfo.code = params.duanxin
            loginInfo.password = params.mima
            loginInfo.flag = "reset"
        }
        PluginManager.login(loginInfo)
    }

    PluginSessionCallBack(message: any): void {
        cc.log("[LoginPhonePop.PluginSessionCallBack] data", message.data)
        const data: { SessionResultCode: number, msg: string, sessionInfo: any } = JSON.parse(message.data)
        if (data.SessionResultCode == 0) {
            this.closeSelf()
        } else if (data.SessionResultCode == 10) {
            this.closeSelf()
        } else if (data.SessionResultCode == -100) {
            cc.find("nodePop/tips", this.node).getComponent(cc.Label).string = data.sessionInfo.msg
            cc.find("nodePop/btnConfirm", this.node).getComponent(cc.Button).interactable = true

            if (this._loginway == ELoginWay.eMiMa) {
                this.updateUI({
                    mima: true,
                    duanxin: false,
                    yanzhengma: true,
                })
            }

            if (cc.find("nodePop/nodeYanZhengMa", this.node).active) {
                this.onPressRefreshYanZhengMa()
            }
        }
    }

    onCloseScene() {
        SceneManager.Instance.sendMessageToScene({ opcode: "updateLoginButtonState", state: true })
    }
}
