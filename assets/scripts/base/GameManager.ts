import DataManager from "./baseData/DataManager";
import SceneManager from "./baseScene/SceneManager";
import NetManager from "./baseNet/NetManager";
import { czcEvent, ParseSearch, PostInfomation, loadModule, isIPhoneX, QttReportData } from "./BaseFuncTs";
import BaseFunc = require("../base/BaseFunc")

// import qtt_help = require("https://newidea4-gamecenter-frontend.1sapp.com/game/gamesdk/beta/qtt_help.js")
const {ccclass, property, executeInEditMode} = cc._decorator;

@ccclass
// @executeInEditMode
export default class GameManager extends cc.Component {

    private static _instance: GameManager

    @property()
    _bStart = false

    onLoad() {
        czcEvent("大厅", "登录1", "游戏初始化")
        this.adaptScreen()

        GameManager._instance = this
        cc.game.addPersistRootNode(this.node);
        
        if (null == this.node.getComponent(SceneManager))
            this.node.addComponent(SceneManager)
        if (null == this.node.getComponent(DataManager))
            this.node.addComponent(DataManager)
        if (null == this.node.getComponent(NetManager))
            this.node.addComponent(NetManager)

        if (this.node.childrenCount == 0)        
            return

        this.node.children[0].active = true
        let btn = cc.find("StartScene/btn_login",this.node)
        if (btn) {
            BaseFunc.AddClickEvent(btn,this.node,"GameManager","_doLogin")
        }

        this.audioEvent()
    }

    _doLogin() {
        DataManager.Instance._InitBaseData.login()
    }

    static get Instance() {
        return GameManager._instance
    }
    
    start () {
        if (CC_EDITOR)
            return


        // const canvas = cc.Canvas.instance
        // const fitHeight = cc.view.getFrameSize().width / cc.view.getFrameSize().height >= canvas.designResolution.width / canvas.designResolution.height
        // canvas.fitHeight = fitHeight
        // canvas.fitWidth = !fitHeight

        this._bStart = false

        if (cc.sys.isBrowser) {
        var args = ParseSearch(window.location.search)
        if (args.isTesting) {
            DataManager.Instance.isTesting = true
        }
        }
            
        console.log("Game Start")
        if (DataManager.Instance.CurENV == 2 && false == DataManager.Instance.isTesting && true != DataManager.load("versetting")) {
           console.log = function() {}
        }

        if (cc.sys.isBrowser) {
        if (null != window.document.getElementById("__vconsole")) {
                for (let val of window.document.getElementById("__vconsole").children) {
                if (val.className == "vc-switch") {
                    DataManager.CommonData["vconsole"] = val
                    break;
                }
            }
        }


            if (null != DataManager.CommonData["vconsole"]) {
            if (true == DataManager.load("versetting") || true == DataManager.Instance.isTesting) {
                DataManager.CommonData["vconsole"].style.display = ""
            }
        }
        }
        

        // console.log("console.log reDefine")

        // // let self = this
        // czcEvent("大厅", "登录4", "加载大厅模块")
        // cc.director.loadScene(DataManager.Instance.StartModule, function() {
        //     self.node.children[0].runAction(cc.sequence(cc.delayTime(0.5), cc.callFunc(() => self.node.children[0].active = false)))
        // })
        
        this.node.children[0].active = true

        // let data = [{
        //     "GameStart": true
        // }]

        // PostInfomation(data)

        if (cc.sys.isBrowser) {
            cc.game.canvas.addEventListener('webglcontextlost', function (e) {
            window.location.reload();
        }, false);
        }

        QttReportData("load_start")
    }

    update(dt) {
        if (CC_EDITOR) return
        if (this._bStart) return 

        // let node = new cc.Node()
        // cc.Canvas.instance.node.addChild(node)
        // let module = node.addComponent(MoudleLobby)

        DataManager.Instance.onInit()
        NetManager.Instance.onInit()
        SceneManager.Instance.onInit()

        loadModule(DataManager.Instance.StartModule);

        this._bStart = true
    }

    static onChangeFire() {
        GameManager._instance.node.children[0].active = true
        let btnLogin = cc.find("StartScene/btn_login", GameManager._instance.node)
        if (btnLogin)
            btnLogin.active = false
        GameManager._instance.node.children[0].runAction(cc.sequence(cc.delayTime(1), cc.callFunc(() => GameManager._instance.node.children[0].active = false)))
    }

    static hideFace() {
        GameManager._instance.node.children[0].runAction(cc.sequence(cc.delayTime(.5), cc.callFunc(() => GameManager._instance.node.children[0].active = false)))
    }

    static getFlushScreen() {
        return GameManager._instance.node.children[0]
    }

    // 动态适配
    adaptScreen() {
        if (CC_EDITOR) {
            return
        }

        const canvas = cc.Canvas.instance
        const frameSize = cc.view.getFrameSize()
        const designSize = canvas.designResolution
        if (isIPhoneX()) {
            // IPhone X
            canvas.fitHeight = true
            canvas.fitWidth = true
            canvas.designResolution = cc.size(designSize.height * ((812 - 60) / 375), designSize.height)
            window['winSize'] = cc.size(designSize.height * (frameSize.width / frameSize.height), designSize.height)
        } else if ((frameSize.width / frameSize.height) >= (designSize.width / designSize.height)) {
            // 全面屏
            canvas.fitHeight = true
            canvas.fitWidth = false
        } else {
            canvas.fitHeight = false
            canvas.fitWidth = true
        }
    }

    onDisable() {
        cc.audioEngine.pauseAllEffects()
    }

    onEnable() {
        cc.audioEngine.resumeAllEffects()
    }

    audioEvent() {
        if (null == cc.audioEngine.playMusisExpand) {
            cc.audioEngine.playMusisExpand = cc.audioEngine.playMusic

            cc.audioEngine.playMusic = function(clip:cc.AudioClip, loop: boolean) {
                if (true === window.document.isAudioPause) 
                    return
                
                if (0 == DataManager.SoundVolume)
                    return

                return cc.audioEngine.playMusisExpand(clip, loop);
            }
        }

        if (null == cc.audioEngine.playEffectExpand) {
            cc.audioEngine.playEffectExpand = cc.audioEngine.playEffect

            cc.audioEngine.playEffect = function(clip: cc.AudioClip, loop: boolean) {
                if (true === window.document.isAudioPause)
                    return

                return cc.audioEngine.playEffectExpand(clip, loop)
            }
        }

        cc.game.on(cc.game.EVENT_HIDE, function(){cc.audioEngine.pauseAllEffects(); cc.audioEngine.pauseMusic()},this);
        cc.game.on(cc.game.EVENT_SHOW, function(){cc.audioEngine.resumeAllEffects(); cc.audioEngine.resumeMusic()},this);

        if (cc.sys.isBrowser) {
        window.document.addEventListener("visibilitychange", (e) => {
                if (e.target.hidden) {
                    cc.audioEngine.pauseAllEffects();
                // cc.audioEngine.pauseMusic()
                cc.audioEngine.stopMusic()
                window.document.isAudioPause = true
            }
            else {
                    cc.audioEngine.resumeAllEffects();
                // cc.audioEngine.resumeMusic()
                window.document.isAudioPause = false
                    SceneManager.Instance.sendMessageToScene("audio_play")
                }
        })
    }
    }

    onError(error) {
        cc.find("StartScene/errorcode", this.node).getComponent(cc.Label).string = "errcode:" + error
    }
}


