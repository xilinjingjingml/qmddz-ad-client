import BaseComponent from "../base/BaseComponent";
import DataManager from "../base/baseData/DataManager";
import { czcEvent, getNowTimeUnix, getRedpacketRanks, getUserRole, iMessageBox, loadModule, MsgBox, parseAdBannerConfig, parseAdCustomConfig, parseMiniGame, uploadKuaiShou } from "../base/BaseFuncTs";
import SceneManager from "../base/baseScene/SceneManager";
import GameManager from "../base/GameManager";
import PluginManager, { EPluginType } from "../base/PluginManager";
import BaseFunc = require("../base/BaseFunc")
import { NodeExtends } from "../base/extends/NodeExtends";
import { loadAdConfig } from "./LobbyFunc";

const { ccclass, property } = cc._decorator;

@ccclass
export default class LoginScene extends BaseComponent {
    private _approvePact: boolean = true

    onOpenScene() {
        cc.log("[LoginScene.onOpenScene]")
        czcEvent("大厅", "登录6", "登录界面 " + DataManager.Instance.userTag)
        const node = cc.find('nodeMain', this.node)
        // GameManager.Instance.changeFire(node)
        BaseFunc.BindChild(node, this)

        this.setLoginButtonState(false)
        // this.showLoginButton()

        const last_login_type: string = DataManager.load('last_login_type')
        cc.log("[LoginScene.onOpenScene] last_login_type", last_login_type)
        if (last_login_type) {
            GameManager.Instance.replayLoading()
            PluginManager.login({ sessionType: last_login_type }) // 使用上次登陆方式
            this.timeoutShowButton()
            return
        }
        // if (DataManager.load("logined") == null) {
        //     if (DataManager.Instance.getOnlineParam("loginActivePopupIZhangxin", 1) && PluginManager.hasPluginByName('SessionIZhangxin') && this.checkLoginSession('SessionIZhangxin')) {
        //         DataManager.save('temp_login_type', 'SessionIZhangxin')
        //         PluginManager.login({ sessionType: "SessionIZhangxin" }) // 审核直接izhangxin登陆
        //         return
        //     }
        //     if (DataManager.Instance.getOnlineParam("loginAutoGuest", 1) && PluginManager.hasPluginByName('SessionGuest') && DataManager.load("change_login") == null) {
        //         DataManager.remove("change_login")
        //         this.onPressLogin(null, 'SessionGuest')
        //         return
        //     }
        //     if (DataManager.Instance.getOnlineParam("loginActivePopupPhone", 1) && PluginManager.hasPluginByName('SessionPhone') && this.checkLoginSession('SessionPhone')) {
        //         DataManager.save('temp_login_type', 'SessionPhone')
        //         SceneManager.Instance.popScene<String>("moduleLobby", "LoginPhonePop")
        //         return
        //     }
        // }
        GameManager.Instance.changeFire()
        this.setLoginButtonState(true)
    }

    checkLoginSession(name: string): boolean {
        const showname = "show" + name.substring(7)
        const value = DataManager.Instance.getOnlineParam(showname)
        if (value != null) {
            return value == 1
        }

        if (["SessionGuest", "SessionPhone", "SessionIZhangxin"].indexOf(name) != -1) {
            return false
        }

        return true
    }

    // 展示所有登陆方式
    showLoginButton(): void {
        const button: cc.Node = this['button']
        for (const plugin of PluginManager.pluginConfig.plugins) {
            if (plugin.type == EPluginType.kPluginSession.toString() && this.checkLoginSession(plugin.name)) {
                const node = cc.instantiate(button)
                node.getComponent(cc.Button).clickEvents[0].customEventData = plugin.name
                this['login_buttons'].addChild(node)
                cc.log("[LoginScene.showLoginButton] add plugin", plugin.name)
                const path = "thirdparty/login_" + plugin.name + "01"
                if (NodeExtends.setNodeSpriteLocal({ node: node, url: path + '.png' })) {
                    continue
                }

                NodeExtends.setNodeSprite({ node: node, url: path, delayShow: true })
            }
        }
    }

    setLoginButtonState(state: boolean): void {
        this['login_buttons'].active = state
        // this['node_loading'].active = !state
        // if (state) {
        //     cc.find('approve_pact', this.node).active = true
        // }
    }

    onPressLogin(touch: cc.Event.EventTouch, data: string): void {
        if (!this._approvePact) {
            iMessageBox("请阅读并同意相关用户协议！")
            return
        }
        cc.log("[LoginScene.onPressLogin] name", data)
        this.setLoginButtonState(false)
        DataManager.save('temp_login_type', data)
        if (data == "SessionPhone") {
            SceneManager.Instance.popScene<String>("moduleLobby", "LoginPhonePop")
            return
        }
        PluginManager.login({ sessionType: data })

        if (["SessionPhone", "SessionIZhangxin"].indexOf(data) != -1) {
            return
        }
        GameManager.Instance.replayLoading()
        // 应用后台切回前台 继续显示登陆按钮
        this.timeoutShowButton()
    }

    onPressWechat() {
        this.setLoginButtonState(false)
        DataManager.save('temp_login_type', "SessionWeiXin")
        PluginManager.login({ sessionType: "SessionWeiXin" })

        GameManager.Instance.replayLoading()
        // 应用后台切回前台 继续显示登陆按钮
        this.timeoutShowButton()
    }

    onPressGuest() {
        this.setLoginButtonState(false)
        DataManager.save('temp_login_type', "SessionGuest")
        PluginManager.login({ sessionType: "SessionGuest" })

        GameManager.Instance.replayLoading()
        // 应用后台切回前台 继续显示登陆按钮
        this.timeoutShowButton()
    }

    timeoutShowButton() {
        this.node.stopAllActions()
        this.node.runAction(cc.sequence(
            cc.delayTime(20),
            cc.callFunc(() => {
                iMessageBox("登陆超时")
                this.setLoginButtonState(true)
            })
        ))
    }

    updateLoginButtonState(message: any): void {
        cc.log("[LoginScene.updateLoginButtonState]", message.state)
        this.setLoginButtonState(message.state)
    }

    PluginSessionCallBack(message: any): void {
        cc.log("[LoginScene.PluginSessionCallBack] data", message.data)
        this.node.stopAllActions()
        const data: { SessionResultCode: number, msg: string, sessionInfo: any } = JSON.parse(message.data)
        if (data.SessionResultCode == 0) {
            DataManager.save('last_login_type', DataManager.load("temp_login_type"))
            DataManager.save("logined", true)
            const msg = data.sessionInfo
            DataManager.Instance.setUserData(msg)
            getUserRole()
            DataManager.CommonData["isLogin"] = true
            SceneManager.Instance.sendMessageToScene("updateUserData")
            DataManager.CommonData["morrow"] = msg.first == 1 ? 0 : msg.morrow
            DataManager.CommonData["regtime"] = msg.regtime == 0 ? new Date().getTime() / 1000 : msg.regtime
            DataManager.CommonData["stayDay"] = msg.stayDay
            DataManager.CommonData["ifBindWeixin"] = msg.ifBindWeixin == 1
            DataManager.CommonData["bindPhone"] = {}
            DataManager.CommonData["bindPhone"].hasBindMoble = msg.isBindMobile
            DataManager.CommonData["bindPhone"].BindPhone = msg.phonenumber
            let time = getNowTimeUnix()
            DataManager.CommonData["flyBack"] = (time >= 1574006400 && time < 1575302400) && msg.flyBack == "1"
            DataManager.CommonData["first"] = msg.first
            DataManager.CommonData.kuaishou_callback = msg.callback
            DataManager.Instance.userTag = DataManager.CommonData["morrow"] <= 1 ? DataManager.CommonData["morrow"] + "天新用户" : "老用户"

            msg.first == 1 && uploadKuaiShou(2)

            // DataManager.Instance.userTag = DataManager.CommonData["morrow"] <= 1 ? DataManager.CommonData["morrow"] + "天新用户" : "老用户"
            DataManager.Instance.userTag = ""//"newbie-" + (DataManager.CommonData["morrow"] <= 1 ? "true" : "false")
            parseAdBannerConfig()
            parseAdCustomConfig()
            parseMiniGame()
            // getUserRankDate()
            getRedpacketRanks()
            loadAdConfig()
            
            // 进入大厅
            this.showLobbyScene()
        } else if (data.SessionResultCode == 10) {
            MsgBox({
                content: "重置密码成功",
                buttonNum: 1,
                confirmClose: true,
                confirmFunc: () => {
                    PluginManager.login({ sessionType: "SessionPhone" })
                }
            })
        } else if (data.SessionResultCode == -98 && DataManager.load("temp_login_type") == "SessionIZhangxin") {
            PluginManager.login({ sessionType: "SessionIZhangxin" }) // 审核直接izhangxin登陆
        } else if (data.SessionResultCode == -100 && SceneManager.Instance.isSceneExist("LoginPop")) {
        } else {
            let msg = '登陆失败'
            if (data.sessionInfo && data.sessionInfo.tips && data.sessionInfo.tips.length > 0) {
                msg = data.sessionInfo.tips
            } else if (data.msg && data.msg.length > 0) {
                msg = data.msg
            }
            // MsgBox({
            //     title: "提示",
            //     content: msg,
            //     buttonNum: 1,
            //     confirmClose: true,
            //     frameWidth: 700,
            //     frameHeight: 520,
            //     confirmFunc: () => {
            //         this.setLoginButtonState(true)
            //     }
            // })
            // 清除之前的登陆方式
            cc.sys.localStorage.removeItem('last_login_type')
        }
    }

    showLobbyScene(): void {
        PluginManager.StartPushSDK()
        PluginManager.getOpenInstallParms()
        // GameManager.Instance.changeFire()
        loadModule("moduleLobby")
    }

    onPressApprovePact(touch: cc.Event.EventTouch): void {
        this._approvePact = !this._approvePact
        cc.log("[LoginScene.onPressApprovePact]", this._approvePact)
        cc.find('approve_pact/approve_pact/select/select_check', this.node).active = this._approvePact
    }

    onBeforeOpen() {
        // if (DataManager.Instance.getOnlineParam("LoginPop", 1)) {
        //     this.onOpenScene = this.onNewOpenScene
        //     this.setLoginButtonState = this.showLoginPop.bind(this)
        // }
    }

    onNewOpenScene() {
        cc.log("[LoginScene.onOpenScene]")
        czcEvent("大厅", "登录6", "登录界面 " + DataManager.Instance.userTag)
        const node = cc.find('nodeMain', this.node)
        GameManager.Instance.changeFire(node)
        // cc.find('approve_pact', this.node).active = false

        const last_login_type: string = DataManager.load('last_login_type')
        cc.log("[LoginScene.onOpenScene] last_login_type", last_login_type)
        if (last_login_type) {
            this.onLogin(last_login_type)
            return
        }
        // if (DataManager.load("logined") == null) {
        //     if (DataManager.Instance.getOnlineParam("loginAutoGuest", 1) && PluginManager.hasPluginByName('SessionGuest')) {
        //         this.onLogin("SessionGuest")
        //         return
        //     }
        // }

        this.setLoginButtonState(true)
    }

    user_press_login(message) {
        this.onLogin(message.sessionType)
    }

    onLogin(sessionType: string) {
        DataManager.save('temp_login_type', sessionType)
        PluginManager.login({ sessionType: sessionType })
        this.timeoutShowLoginPop()
    }

    timeoutShowLoginPop() {
        this.unscheduleAllCallbacks()
        this.scheduleOnce(() => {
            iMessageBox("登录超时")
            this.showLoginPop()
        }, 20)
    }

    showLoginPop() {
        SceneManager.Instance.popScene("moduleLobby", "LoginPop")
    }
}
