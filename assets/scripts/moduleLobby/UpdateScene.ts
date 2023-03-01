import BaseComponent from "../base/BaseComponent";
import DataManager from "../base/baseData/DataManager";
import { callStaticMethod, checkNetwork, ConfirmBox, versionCompare } from "../base/BaseFuncTs";
import SceneManager from "../base/baseScene/SceneManager";
import GameManager from "../base/GameManager";
import HotUpdate from "../base/HotUpdate";
import PluginManager from "../base/PluginManager";
import md5 = require("../base/extensions/md5.min")
import BaseFunc = require("../base/BaseFunc")

const { ccclass, property } = cc._decorator;

@ccclass
export default class UpdateScene extends BaseComponent {
    index: number = 0
    checks: (() => boolean)[] = []

    onOpenScene() {
        const node = cc.find('nodeMain', this.node)
        GameManager.Instance.changeFire(node)
        BaseFunc.BindChild(node, this)
        this.setState(0)
    }

    start() {
        console.log("jin---UpdateScene start: ", DataManager.load("game_restart") , cc.sys.localStorage.getItem('HotUpdateSearchPaths'))
        if (DataManager.load("game_restart") || DataManager.load("game_restart") == null && cc.sys.localStorage.getItem('HotUpdateSearchPaths')) {
            DataManager.save("game_restart", false)

            if (DataManager.Instance.getOnlineParam("update_game")) {
                this.checks.push(this.checkAppVersion.bind(this))
            }
        } else {
            this.checks.push(this.checkAppVersion.bind(this))
            this.checks.push(this.checkGameVersion.bind(this))

            if (DataManager.Instance.getOnlineParam("update_game")) {
                this.checks.reverse()
            }
        }

        this.checkUpdate(false)
    }

    checkUpdate(next: boolean = true): void {
        if (next) {
            this.index++
        }

        if (this.index >= this.checks.length) {
            this.showLoginScene()
            return
        }

        if (this.checks[this.index]()) {
            return
        }

        this.checkUpdate(true)
    }

    // 检测APP版本
    checkAppVersion(): boolean {
        const versionupdate = DataManager.Instance.versionupdate
        let version = PluginManager.getVersionCode()
        cc.log("[UpdateScene.checkAppVersion]", versionupdate)
        cc.log("[UpdateScene.checkAppVersion]", version, versionupdate && versionupdate.vn)
        if (version >= versionupdate.vn) {
            return
        }

        const param = {
            title: "发现新版本",
            content: versionupdate.msg,
            buttonNum: 2,
            confirmFunc: null,
            cancelFunc: null,
            confirmText: "立即更新",
            cancelText: "",
            confirmClose: true,
            maskCanClose: false,
            showClose: false,
            zIndex: cc.macro.MAX_ZINDEX,
        }
        if (versionupdate.ef == 0) {
            param.cancelText = "暂不更新"
            param.cancelFunc = () => {
                this.checkUpdate(true)
            }
        } else {
            param.cancelText = "关闭游戏"
            param.cancelFunc = () => {
                cc.log("[UpdateScene.checkAppVersion] cancelFunc")
                cc.game.end()
            }
        }
        if (cc.sys.os == cc.sys.OS_ANDROID) {
            param.confirmFunc = () => {
                cc.log("[UpdateScene.checkAppVersion] confirmFunc")
                const params = [
                    versionupdate.url,
                    "下载中",
                    "正在更新游戏资源",
                    md5(versionupdate.url) + ".apk",
                    () => { }
                ]
                callStaticMethod("com/izhangxin/utils/luaj", "showUpgradeDialog", "(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;I)V", params)
            }
            // 修复在app版本7时Android版本为5时强更新失败问题
            // 改为浏览器创建下载任务
            if (cc.sys.osMainVersion == 5 && PluginManager.getVersionCode() == 7) {
                param.confirmClose = false
                param.confirmFunc = () => {
                    cc.log("[UpdateScene.checkAppVersion] confirmFunc")
                    cc.sys.openURL(versionupdate.url)
                }
            }
        } else if (cc.sys.os == cc.sys.OS_IOS) {
            if (versionupdate.ef != 0) {
                param.buttonNum = 1
            }
            param.confirmClose = false
            param.confirmFunc = () => {
                cc.log("[UpdateScene.checkAppVersion] confirmFunc")
                cc.sys.openURL(versionupdate.url)
            }
        } else {
            param.buttonNum = 1
            param.confirmText = param.cancelText
            param.confirmFunc = param.cancelFunc
        }
        ConfirmBox(param)
        return true
    }

    UpgradeUtil(message: any): void {
        cc.log("[UpdateScene.UpgradeUtil] message", message.data)
        const data = JSON.parse(message.data)
        if (data.event == "cancelDownload") {
            this.node.runAction(cc.sequence(
                cc.delayTime(0.2),
                cc.callFunc(() => {
                    checkNetwork(() => {
                        this.checkUpdate(false)
                    })
                })
            ))
        }
    }

    // 检测游戏版本
    checkGameVersion(): boolean {
        if (!CC_JSB) {
            return
        }

        const hotUpdate = this.node.addComponent(HotUpdate)
        hotUpdate.init('hbddzjs')
        const gameversion = DataManager.Instance.getOnlineParam("game_version")
        const lastversion = DataManager.Instance.version
        const localversion = hotUpdate.getLocalManifestVersion()
        const reviewversion = DataManager.Instance.getOnlineParam("review_version")
        cc.log("[UpdateScene.checkGameVersion]", reviewversion, gameversion, lastversion, localversion)
        DataManager.Instance.version = localversion

        // 审核版本不更新
        if (reviewversion == PluginManager.getVersionCode()) {
            return
        }

        if (gameversion == null) {
            return
        }

        // 尝试更新过不更新
        if (versionCompare(lastversion, gameversion) >= 0) {
            return
        }

        // 低于本地版本不更新
        if (versionCompare(localversion, gameversion) >= 0) {
            return
        }

        this.setProgress(0)
        hotUpdate.setProgressHandler(this.setProgress.bind(this))
        hotUpdate.setResultHandler(this.updateResult.bind(this))
        hotUpdate.setUpdateUrl(DataManager.Instance.envConfigs.updateURL + DataManager.Instance.gameId + '/' + gameversion + '/hbddzjs/')
        return true
    }

    setProgress(value: number): void {
        value = value || 0
        cc.log("[UpdateScene.setProgress] value", value)
        this['progressBar'].getComponent(cc.ProgressBar).progress = value
        this['lbl_progress'].getComponent(cc.Label).string = Math.floor(value * 100) + "%"

        if (this['nodeTips'].active) {
            if (value == 1) {
                this.setState(0)
            }
        } else {
            if (value > 0) {
                this.setState(1)
            }
        }
    }

    setState(state: number): void {
        cc.log("[UpdateScene.setState] state", state)
        this['nodeTips'].active = state == 1
        this['progressBar'].active = state == 1
        // this['node_loading'].active = state == 0
    }

    updateResult(ret: number): void {
        cc.log("[UpdateScene.updateResult]", ret)
        // 1 finished 2 failed 3 already
        if (ret == 1 || ret == 3) {
            DataManager.save('game_version', DataManager.Instance.getOnlineParam("game_version"))
        }
        if (ret == 1) {
            this.setState(0)
        } else if (ret == 2) {
            checkNetwork(() => {
                this.getComponent(HotUpdate).updateStart()
            }, true)
        } else if (ret == 3) {
            this.checkUpdate()
        }
    }

    showLoginScene(): void {
        // GameManager.Instance.changeFire()
        GameManager.Instance.replayLoading()
        SceneManager.Instance.addScene<String>("moduleLobby", "LoginScene")
    }

    loadSubpackage(name: string): void {
        cc.log("[UpdateScene.loadSubpackage]", name)
        cc.loader.downloader.loadSubpackage(name, function (err: any) {
            if (err) {
                cc.log("[UpdateScene.loadSubpackage] " + name + " fail", err)
            } else {
                cc.log("[UpdateScene.loadSubpackage] " + name + " success")
            }
        })
    }
}
