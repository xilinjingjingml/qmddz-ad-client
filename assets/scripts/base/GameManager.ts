import LogLayer from "../moduleLobby/LogLayer"
import DataManager from "./baseData/DataManager"
import InitBaseData from "./baseData/InitBaseData"
import { callStaticMethod, checkNetwork, czcEvent, getIPLocation, ParseSearch } from "./BaseFuncTs"
import NetManager from "./baseNet/NetManager"
import SceneManager from "./baseScene/SceneManager"
import PluginManager from "./PluginManager"
import WxWrapper from "./WxWrapper"
import { NodeExtends } from "./extends/NodeExtends"

const { ccclass } = cc._decorator

@ccclass
export default class GameManager extends cc.Component {

    private static _instance: GameManager
    private _bStart: boolean

    static get Instance() {
        return GameManager._instance
    }

    _logLayer: LogLayer = null
    _startScene: cc.Node = null

    onLoad() {
        czcEvent("大厅", "登录1", "游戏初始化")
        GameManager._instance = this
        cc.game.addPersistRootNode(this.node)

        NodeExtends.setNodeSpriteLocal({ node: cc.find("StartScene/LOGO", this.node), url: "thirdparty/LOGO.png" })
        NodeExtends.setNodeSpriteLocal({ node: cc.find("StartScene/bottom_bg/wenzi", this.node), url: "thirdparty/wenzi.png" })

        if (null == this.node.getComponent(SceneManager))
            this.node.addComponent(SceneManager)
        if (null == this.node.getComponent(DataManager))
            this.node.addComponent(DataManager)
        if (null == this.node.getComponent(NetManager))
            this.node.addComponent(NetManager)

        if (this.node.childrenCount == 0)
            return

        this.node.children[0].active = true

        cc.director.once(cc.Director.EVENT_AFTER_DRAW, this.onAfterDraw, this)

        this.audioEvent()
    }

    start () {
        console.log("Game Start")
        if (DataManager.load("ENABLE_DEBUG") || (cc.sys.isBrowser && ParseSearch(window.location.search).isTesting)) {
            cc.log = console.log.bind(console)
        }

        if (DataManager.load("showconsolelog")) {
            this.setConsoleLog()
        }
        this.node.children[0].active = true
        this._startScene = this.node.children[0]
        checkNetwork(this.onInit.bind(this), false, true)
    }

    onInit(): void {
        cc.log("[GameManager.onInit]")
        PluginManager.onInit()
        WxWrapper.init()
        DataManager.Instance.onInit()
        NetManager.Instance.onInit()
        SceneManager.Instance.onInit()
        new InitBaseData()
        getIPLocation()
    }

    update(dt) {
        if (CC_EDITOR) return
        if (this._bStart) return 
        if (DataManager.CommonData["pluginFinish"] != true) return 
        if (DataManager.CommonData["configFinish"] != true) return 

        SceneManager.Instance.addScene<String>("moduleLobby", "UpdateScene")


        this._bStart = true
    }

    static onChangeFire() {
        GameManager._instance._startScene.stopAllActions()
        GameManager._instance._startScene.active = true
        GameManager._instance._startScene.runAction(cc.sequence(cc.delayTime(1), cc.callFunc(() => GameManager._instance._startScene.active = false)))
    }

    static showFire() {
        GameManager._instance._startScene.stopAllActions()
        GameManager._instance._startScene.active = true    
    }

    static hideFace() {
        GameManager._instance._startScene.stopAllActions()
        GameManager._instance._startScene.active = false
    }

    changeFire(parent?: cc.Node) {
        this._startScene.active = true
        this._startScene.parent = parent || this.node
    }

    onAfterDraw() {
        if (cc.sys.os == cc.sys.OS_ANDROID) {
            callStaticMethod("com/izhangxin/utils/luaj", "hideSplash", "()V")
        } else if (cc.sys.os == cc.sys.OS_IOS) {
            callStaticMethod("LuaObjc", "hideSplash")
        }
    }

    static getFlushScreen() {
        return GameManager._instance._startScene
    }

    setConsoleLog(show: boolean = true) {
        DataManager.save("showconsolelog", show)
        if (show) {
            cc.loader.loadRes("moduleLobby/prefab/LogLayer", function (err, prefab) {
                if (err) {
                    return
                }
                const node = cc.instantiate(prefab)
                node.parent = this.node
                this._logLayer = node.getComponent(LogLayer)
            })
        } else {
            this._logLayer.node.parent = null
            this._logLayer.node.destroy()
            this._logLayer = null
        }
    }

    audioEvent() {

        const playMusic = cc.audioEngine.playMusic
        cc.audioEngine.playMusic = function() {
            if (0 == DataManager.SoundVolume)
                return

            return playMusic.apply(cc.audioEngine, arguments)
        }

        const playEffect = cc.audioEngine.playEffect
        cc.audioEngine.playEffect = function() {
            if (0 == DataManager.EffectVolume)
                return

            return playEffect.apply(cc.audioEngine, arguments)
        }

        cc.game.on(cc.game.EVENT_HIDE, () => {
            SceneManager.Instance.sendMessageToScene("game_hide")
            cc.audioEngine.pauseAllEffects()
            cc.audioEngine.pauseMusic()
        }, this)

        cc.game.on(cc.game.EVENT_SHOW, () => {
            SceneManager.Instance.sendMessageToScene("game_show")
            cc.audioEngine.resumeAllEffects()
            cc.audioEngine.resumeMusic()
        }, this)
    }
}