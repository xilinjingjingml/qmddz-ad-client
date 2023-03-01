import DataManager from "./DataManager";
import BaseFunc = require("../BaseFunc")
import md5 = require("../extensions/md5.min")
import SceneManager from "../baseScene/SceneManager"
import { ParseSearch, MsgBox, czcEvent, getUserRole, getNowTimeUnix, loadModule } from "../BaseFuncTs"
import GameManager from "../GameManager"
import WxWrapper from "../WxWrapper"

export default class InitBaseData {

    constructor() {
        if (cc.sys.isBrowser) {
            let arg = ParseSearch(window.location.search)
            if (arg.imei) {
                DataManager.UserData.imei = arg.imei
            }
        }

        SceneManager.Instance.loadScene("moduleLobby", "LobbyScene")
        DataManager.CommonData["isLogin"] = null
        this.loadConfigs()
        this.login()
    }

    // 获取在线参数
    loadConfigs() {
        let url = DataManager.getURL("LOADING_CONFIGS")

        let sign = "pn=" + DataManager.Instance.packetName + "&key=qwer123321zxcv";
        sign = md5(sign)

        let loginSecret = "pn=" + DataManager.Instance.packetName + "&uid=&imei=&level=&gameNums=0-Jimbo3";
        loginSecret = md5(loginSecret)

        let params = {
            pn: DataManager.Instance.packetName,
            fwversion: 14042902,
            gtype: "mainF33",
            sgtype: "f33",
            sign: sign,
            md5: DataManager.load("loadingConfigMD5"),
            uid: "",
            imei: "",
            level: "",
            gameNums: 0,
            loginSecret: loginSecret,
            buildCode: 1,
            appConfigGame: DataManager.Instance.gameId,
            // gameidlist: 10,
            appcode: 1
        };

        BaseFunc.HTTPGetRequest(url, params, (msg) => {
            if (msg && msg.ret == 0) {
                let ip = msg.ip
                let port = msg.port
                msg = DataManager.load("loadingConfig")
                if (msg["versionupdate"]) {
                    msg["versionupdate"]["ip"] = null != ip ? ip : msg["versionupdate"]["ip"]
                    msg["versionupdate"]["port"] = null != port ? port : msg["versionupdate"]["port"]
                }
            }

            if (msg == null || typeof msg == "string") {
                msg = DataManager.load("loadingConfig")
                msg = JSON.parse(msg)
            }

            if (msg["versionupdate"]) {
                DataManager.Instance.envConfigs.socketURL = msg["versionupdate"]["ip"]
                DataManager.Instance.envConfigs.socketPort = msg["versionupdate"]["port"]
            }

            DataManager.Instance.NormalBoxs = []
            DataManager.Instance.OnceBoxs = []
            DataManager.Instance.MonthBoxs = []
            DataManager.Instance.ClubBoxs = []
            cc.log(msg)
            let shopcfg = BaseFunc.IsJSON(msg["box_0"]) ? JSON.parse(msg["box_0"]) : null
            if (shopcfg && shopcfg["sl"])
                DataManager.Instance.NormalBoxs = shopcfg["sl"]

            DataManager.Instance.NormalBoxs.sort((a, b) => a.content[0].num < b.content[0].num ? -1 : a.content[0].num > b.content[0].num ? 1 : 0)

            shopcfg = BaseFunc.IsJSON(msg["box_2"]) ? JSON.parse(msg["box_2"]) : null
            if (shopcfg && shopcfg["sl"])
                DataManager.Instance.OneYuanBoxs = shopcfg["sl"]

            shopcfg = BaseFunc.IsJSON(msg["box_7"]) ? JSON.parse(msg["box_7"]) : null
            if (shopcfg && shopcfg["sl"])
                DataManager.Instance.OnceBoxs = shopcfg["sl"]

            shopcfg = BaseFunc.IsJSON(msg["box_8"]) ? JSON.parse(msg["box_8"]) : null
            if (shopcfg && shopcfg["sl"])
                DataManager.Instance.MonthBoxs = shopcfg["sl"]

            shopcfg = BaseFunc.IsJSON(msg["box_12"]) ? JSON.parse(msg["box_12"]) : null
            if (shopcfg && shopcfg["sl"])
                DataManager.Instance.ClubBoxs = shopcfg["sl"]

            // if (DataManager.Instance.NormalBoxs && DataManager.Instance.NormalBoxs.length > 0) {
            //     DataManager.save("BOX0", JSON.stringify(DataManager.Instance.NormalBoxs))
            // }
            // else {
            //     let data = DataManager.load("BOX0")
            //     if (null != data) {
            //         DataManager.Instance.NormalBoxs = JSON.parse(data)
            //     }
            // }

            // if (DataManager.Instance.OnceBoxs && DataManager.Instance.OnceBoxs.length > 0) {
            //     DataManager.save("BOX7", JSON.stringify(DataManager.Instance.OnceBoxs))
            // }
            // else {
            //     let data = DataManager.load("BOX7")
            //     if (null != data) {
            //         DataManager.Instance.OnceBoxs = JSON.parse(data)
            //     }
            // }

            // if (DataManager.Instance.MonthBoxs && DataManager.Instance.MonthBoxs.length > 0) {
            //     DataManager.save("BOX8", JSON.stringify(DataManager.Instance.MonthBoxs))
            // }
            // else {
            //     let data = DataManager.load("BOX8")
            //     if (null != data) {
            //         DataManager.Instance.MonthBoxs = JSON.parse(data)
            //     }
            // }

            // if (DataManager.Instance.ClubBoxs && DataManager.Instance.ClubBoxs.length > 0) {
            //     DataManager.save("BOX12", JSON.stringify(DataManager.Instance.ClubBoxs))
            // }
            // else {
            //     let data = DataManager.load("BOX12")
            //     if (null != data) {
            //         DataManager.Instance.ClubBoxs = JSON.parse(data)
            //     }
            // }

            DataManager.CommonData["privateConfig"] = []

            for (let key in msg) {
                if (key.indexOf("gConfig_") != -1) {
                    let data = JSON.parse(msg[key])[0]
                    for (let k in data.extparam) {
                        let v = data.extparam[k]
                        v.gameId = data.game_id
                        DataManager.CommonData["privateConfig"].push(v)
                    }
                }
            }

            DataManager.CommonData["configFinish"] = true
            DataManager.Instance.onlineParam = typeof msg.onlineparam == "object" ? msg.onlineparam : {}
            DataManager.Instance.matchList = Array.isArray(msg.matchInfo) ? msg.matchInfo : []
            DataManager.Instance.matchList.forEach(v => {
                DataManager.Instance.matchMap[v.matchType] = v
            })
            DataManager.Instance.matchList.sort(function (a, b) {
                if (a.matchSort > b.matchSort) {
                    return 1
                } else {
                    return -1
                }
            })

            if (null != msg && typeof msg != "string") {
                DataManager.save("loadingConfig", msg)

                if (null != msg.md5)
                    DataManager.save("loadingConfigMD5", msg.md5)
            }

            if (DataManager.Instance.onlineParam.shareConfig) {
                WxWrapper.setShareConfig(DataManager.Instance.onlineParam.shareConfig)
            }
        })
    }

    login() {
        WxWrapper.login((err, res) => {
            err ? this.showMessage(err) : this.onLoginResult(res)
        })
    }

    onLoginResult(res) {
        if (res && res.ret == 0) {
            czcEvent("大厅", "登录", "web登录成功")

            let data = {
                pid: res.pid,
                ticket: res.ticket,
                nickname: res.nickname,
                face: res.face,
                imei: res.imei,
                sex: res.sex,
                openId: res.openId,
            }

            DataManager.save('user_guest_openid', data.imei)
            DataManager.Instance.setUserData(data)
            getUserRole()
            DataManager.CommonData["isLogin"] = true
            SceneManager.Instance.sendMessageToScene("updateUserData")
            DataManager.CommonData["first"] = res.first
            DataManager.CommonData["morrow"] = res.first == 1 ? 0 : res.morrow
            DataManager.CommonData["regtime"] = res.regtime == 0 ? new Date().getTime() / 1000 : res.regtime

            DataManager.Instance.userTag = DataManager.CommonData["morrow"] <= 1 ? DataManager.CommonData["morrow"] + "天新用户" : "老用户"

            let time = getNowTimeUnix()
            DataManager.CommonData["flyBack"] = (time >= 1574006400 && time < 1575302400) && res.flyBack == "1"
            loadModule(DataManager.Instance.startModule)
        } else {
            const error = res ? res.tips || res.msg || "未知错误" : "请求异常"
            czcEvent("大厅", "登录", "web登录失败 "+ error)
            this.showMessage(error)
        }
    }

    showMessage(message: string) {
        let callback = () => {
            SceneManager.Instance.closeScene("MsgBox")
            cc.director.getScene().getChildByName("GameManager").runAction(cc.sequence(
                cc.delayTime(0.2),
                cc.callFunc(() => {
                    this.login()
                })
            ))
        }

        let initParam = {
            title: "提示",
            content: message,
            parent: GameManager.getFlushScreen(),
            confirmClose: true,
            undestory: true,
            buttonNum: 1,
            maskCanClose: false,
            confirmFunc: callback,
        }

        MsgBox(initParam)
    }
}
