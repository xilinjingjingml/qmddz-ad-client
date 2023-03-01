import BaseComponent from "../base/BaseComponent";
import DataManager from "../base/baseData/DataManager";
import { czcEvent, iMessageBox } from "../base/BaseFuncTs";
import SceneManager from "../base/baseScene/SceneManager";
import { NodeExtends } from "../base/extends/NodeExtends";
import PluginManager, { EPluginType } from "../base/PluginManager";
import { getMobileCode } from "./LobbyFunc";

enum ELoginWay {
    normal = 1,
    phonePassword = 2,
}

enum ELoginPhoneWay {
    code = 1,
    password = 2,
    reset = 3,
}

interface ICheckEditBox {
    phone: string,
    code?: string,
    password?: string,
    verifycode?: string
}

const { ccclass, property } = cc._decorator;

@ccclass
export default class LoginPop extends BaseComponent {
    loginPhoeWay: ELoginPhoneWay

    start() {
        this.loginPhoeWay = ELoginPhoneWay.code
    }

    onOpenScene() {
        cc.log("[LoginPop.onOpenScene]")
        czcEvent("大厅", "登录6", "登录界面 " + DataManager.Instance.userTag)

        NodeExtends.setNodeSpriteLocal({ node: this.$("sprite_title"), url: "thirdparty/login_title.png" })

        this.$("node_authentication").active == !!DataManager.Instance.onlineParam.electronicTagUrl

        for (const plugin of PluginManager.pluginConfig.plugins) {
            if (plugin.type != EPluginType.kPluginSession.toString()) {
                continue
            }

            const value = DataManager.Instance.getOnlineParam("show" + plugin.name.substring(7))
            if (value) {
                if (value == 0) {
                    continue
                }
            } else {
                if (["SessionGuest", "SessionPhone", "SessionIZhangxin"].indexOf(plugin.name) != -1) {
                    continue
                }
            }

            cc.log("[LoginPop] add plugin", plugin.name)
            const node = cc.instantiate(this.$("button"))
            node.getComponent(cc.Button).clickEvents[0].customEventData = plugin.name
            node.zIndex = plugin.name == "SessionPhone" ? 100 : 0
            node.parent = this.$("node_login_buttons")
            node.getChildByName("label_last_login").active = plugin.name == DataManager.load("temp_login_type")

            const path = "thirdparty/login_" + plugin.name
            if (NodeExtends.setNodeSpriteLocal({ node: node, url: path + ".png" })) {
                continue
            }
            NodeExtends.setNodeSprite({ node: node, url: path, delayShow: true })
        }
    }

    onPressLogin(event: cc.Event.EventTouch, data: string): void {
        cc.log("[LoginPop.onPressLogin] name", data)
        cc.audioEngine.playEffect(DataManager.Instance.menuEffect, false)

        if (data == "SessionPhone") {
            this.updatePhoneState(ELoginWay.phonePassword)
            return
        }

        if (!this.$("select", cc.Toggle).isChecked) {
            iMessageBox("请阅读并同意相关用户协议！")
            return
        }

        SceneManager.Instance.sendMessageToScene({ opcode: "user_press_login", sessionType: data })

        this.closeSelf()
    }

    onPressBack(): void {
        cc.log("[LoginPop.onPressBack]")
        cc.audioEngine.playEffect(DataManager.Instance.menuEffect, false)
        this.updatePhoneState(ELoginWay.normal)
    }

    onPressCode() {
        cc.audioEngine.playEffect(DataManager.Instance.menuEffect, false)
        const params: ICheckEditBox = {
            phone: this.$("edit_phone", cc.EditBox).string
        }
        if (!this.checkEditBox(params)) {
            return
        }

        getMobileCode(params.phone, "reset", (msg: any) => {
            if (msg.ret == 0) {
                this.$("btn_code", cc.Button).interactable = false

                const label = this.$("label_code", cc.Label)
                let waitTime = 60
                label.string = "(" + waitTime + ")"
                this.unscheduleAllCallbacks()
                this.schedule(() => {
                    waitTime--
                    label.string = "(" + waitTime + ")"
                    if (waitTime == 0) {
                        this.unscheduleAllCallbacks()
                        label.string = "获取验证码"
                        this.$("btn_code", cc.Button).interactable = true
                    }
                }, 1)
                iMessageBox("验证码已通过短信发送到您的手机")
            } else {
                iMessageBox(msg.msg || "获取验证码失败")
            }
        })
    }

    onPressFindPassword() {
        this.loginPhoeWay = ELoginPhoneWay.reset
        this.updatePhoneUI({
            code: true,
            password: true,
            verifycode: false,
        })
    }

    onPressVeritycode() {
        this.$("edit_verifycode", cc.EditBox).string = ""
        const url = DataManager.getURL("PHONEVERIFY") + "?imei=" + PluginManager.getMacAddress() + "&rand=" + Math.random()
        cc.log("onPressVeritycode url", url)
        NodeExtends.setNodeSpriteNet({ node: this.$("sprite_verifycode"), url: url, delayShow: true, fixSizeByParent: true })
    }

    onPressLoginPhone() {
        cc.audioEngine.playEffect(DataManager.Instance.menuEffect, false)
        if (!this.$("select", cc.Toggle).isChecked) {
            iMessageBox("请阅读并同意相关用户协议！")
            return
        }

        const params: ICheckEditBox = {
            phone: this.$("edit_phone", cc.EditBox).string
        }

        if (this.$("node_code").active) {
            params.code = this.$("edit_code", cc.EditBox).string
        }
        if (this.$("node_password").active) {
            params.password = this.$("edit_password", cc.EditBox).string
        }
        if (this.$("node_verifycode").active) {
            params.verifycode = this.$("edit_verifycode", cc.EditBox).string
        }
        if (!this.checkEditBox(params)) {
            return
        }

        const sessionType = "SessionPhone"
        DataManager.save('temp_login_type', sessionType)
        this.$("btn_confirm", cc.Button).interactable = false

        const loginInfo = {
            sessionType: sessionType,
            phonenumber: params.phone,
            code: "",
            password: "",
            flag: "",
            logincode: "",
        }
        if (this.loginPhoeWay == ELoginPhoneWay.code) {
            loginInfo.code = params.code
            loginInfo.password = "*~*~"
            loginInfo.flag = "phoneCodeLogin"
            loginInfo.logincode = params.code
        } else if (this.loginPhoeWay == ELoginPhoneWay.password) {
            loginInfo.password = params.password
            loginInfo.flag = "login"
            if (params.verifycode) {
                loginInfo.logincode = params.verifycode
            }
        } else if (this.loginPhoeWay == ELoginPhoneWay.reset) {
            loginInfo.code = params.code
            loginInfo.password = params.password
            loginInfo.flag = "reset"
        }
        PluginManager.login(loginInfo)
    }

    updatePhoneState(state: ELoginWay) {
        this.$("node_title").active = state == ELoginWay.normal
        this.$("node_title_phone").active = state == ELoginWay.phonePassword
        this.$("node_login_buttons").active = state == ELoginWay.normal

        this.loginPhoeWay = state == ELoginWay.normal ? ELoginPhoneWay.code : ELoginPhoneWay.password
        this.updatePhoneUI({
            code: state == ELoginWay.normal,
            password: state == ELoginWay.phonePassword,
            verifycode: false
        })
    }

    updatePhoneUI(params: { code: boolean, password: boolean, verifycode: boolean, }) {
        cc.audioEngine.playEffect(DataManager.Instance.menuEffect, false)

        // 重置验证码按钮
        this.unscheduleAllCallbacks()
        this.$("edit_code", cc.EditBox).string = ""
        this.$("btn_code", cc.Button).interactable = true
        this.$("label_code", cc.Label).string = "获取验证码"

        // 设置界面状态
        this.$("node_code").active = params.code
        this.$("node_password").active = params.password
        this.$("node_verifycode").active = params.verifycode
        this.$("btn_password").active = !(params.code && params.password)
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

        if (params.code != null && params.code.length != 6) {
            iMessageBox("请输入6位短信验证码！")
            return
        }

        if (params.password != null && params.password.length != 6) {
            iMessageBox("请输入6位密码！")
            return
        }

        if (params.verifycode != null && (params.verifycode.length != 4)) {
            iMessageBox("请输入验证码！")
            return
        }

        return true
    }

    PluginSessionCallBack(message: any): void {
        cc.log("[LoginPhonePop.PluginSessionCallBack] data", message.data)
        const data: { SessionResultCode: number, msg: string, sessionInfo: any } = JSON.parse(message.data)
        if (data.SessionResultCode == 0) {
            this.closeSelf()
        } else if (data.SessionResultCode == 10) {
            this.closeSelf()
        } else if (data.SessionResultCode == -100) {
            iMessageBox(data.sessionInfo.msg)
            this.$("btn_confirm", cc.Button).interactable = true

            if (this.loginPhoeWay == ELoginPhoneWay.password) {
                this.updatePhoneUI({
                    password: true,
                    code: false,
                    verifycode: true,
                })
            }

            if (this.$("node_verifycode").active) {
                this.onPressVeritycode()
            }
        }
    }

    onPressAuthentication() {
        cc.sys.openURL(DataManager.Instance.onlineParam.electronicTagUrl)
    }
}
