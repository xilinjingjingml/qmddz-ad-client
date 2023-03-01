import DataManager from "./baseData/DataManager"
import SceneManager from "./baseScene/SceneManager"
import NetManager from "./baseNet/NetManager"
import { czcEvent, ParseSearch, getIPLocation } from "./BaseFuncTs"
import InitBaseData from "./baseData/InitBaseData"
import WxWrapper from "./WxWrapper"

const { ccclass } = cc._decorator

@ccclass
export default class GameManager extends cc.Component {

    private static _instance: GameManager

    static get Instance() {
        return GameManager._instance
    }

    onLoad() {
        // czcEvent("大厅", "登录1", "游戏初始化")
        
        GameManager._instance = this
        
        cc.game.addPersistRootNode(this.node)

        if (null == this.node.getComponent(SceneManager))
            this.node.addComponent(SceneManager)
        if (null == this.node.getComponent(DataManager))
            this.node.addComponent(DataManager)
        if (null == this.node.getComponent(NetManager))
            this.node.addComponent(NetManager)

        if (this.node.childrenCount == 0)
            return

        this.node.children[0].active = true
        this.audioEvent()
    }

    start () {
        console.log("Game Start")
        if (DataManager.load("ENABLE_DEBUG") || (cc.sys.isBrowser && ParseSearch(window.location.search).isTesting)) {
            cc.log = console.log.bind(console)
        }

        this.node.children[0].active = true

        WxWrapper.init()
        DataManager.Instance.onInit()
        NetManager.Instance.onInit()
        SceneManager.Instance.onInit()
        getIPLocation()
        new InitBaseData()
        czcEvent("加载-2.1进入loading界面-" + DataManager.Instance.userTag)
    }

    static onChangeFire() {
        GameManager._instance.node.children[0].active = true
        GameManager._instance.node.children[0].runAction(cc.sequence(cc.delayTime(1), cc.callFunc(() => GameManager._instance.node.children[0].active = false)))
    }

    static hideFace() {
        GameManager._instance.node.children[0].runAction(cc.sequence(cc.delayTime(.5), cc.callFunc(() => GameManager._instance.node.children[0].active = false)))
    }

    static getFlushScreen() {
        return GameManager._instance.node.children[0]
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
            if(DataManager.CommonData["roleCfg"]["roundSum"] < 4){
				czcEvent("游戏-牌局中-切换到后台-" + DataManager.CommonData["roleCfg"]["roundSum"] + "局")
			}
        }, this)

        cc.game.on(cc.game.EVENT_SHOW, () => {
            SceneManager.Instance.sendMessageToScene("game_show")
            cc.audioEngine.resumeAllEffects()
            cc.audioEngine.resumeMusic()
        }, this)
    }
}