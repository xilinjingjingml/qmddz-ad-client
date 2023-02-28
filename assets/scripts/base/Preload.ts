import DataManager from "./baseData/DataManager";
import BaseScene from "./baseScene/BaseScene";
import { showQttSuspendWin } from "./BaseFuncTs";

const { ccclass, property } = cc._decorator;

let commonTexture = [
    "/moduleLobby/texture/shop/shop",
    "/moduleLobby/texture/common/common",
    "/moduleLobby/texture/common/common-0",
    "/moduleLobby/texture/common/common-1",
]

@ccclass
export default class PreLoad extends BaseScene {

    @property()
    progress: cc.ProgressBar = null;

    @property()
    total: number = 0;

    @property()
    current: number = 0;

    @property()
    _updateProgress: number = 0;

    _finished: boolean = false
    _callback: (item: any[]) => void;
    _result: any[] = []

    onload() {
        // this.node.stopAllActions()
        // this.node.opacity = 255
    }

    start() {
        // console.log("preload " + new Date().getTime())
        // cc.find("bottom_bg/di", this.node).active = null == NetManager.Instance.getSocketState("lobby")

        // cc.audioEngine.stopAll()
        // this.progress = this.getComponentInChildren(cc.ProgressBar)
        // // console.log(this.progress)
        // this.progress && this.progress.progress = 0        
        // this._callback && this._callback(this._result)
    }

    startLoad(src: string[], audioParam, callback: (items: any[]) => void = null): void {
        // console.log("start load " + new Date().getTime())
        DataManager.clearSpriteFrame();
        // SceneManager.Instance.clearScene()

        // src = src.concat(commonTexture)

        DataManager.clearSpriteFrame()
        let self = this;
        this._callback = callback
        let time = new Date().getTime()
        // console.log("start time = " + time)

        if (src.length > 0) {
            cc.loader.loadResArray(src, cc.SpriteAtlas,
                (current, total, item) => {
                    let newTime = new Date().getTime()
                    // console.log(current + "/" + total + ":" + item._ownerProp + " time = " + (newTime - time))
                    time = newTime
                    self.total = total
                    self.current = current
                },
                (err, items: any[]) => {
                    if (err) {
                        self.onFail(err)
                    }
                    else {
                        // console.log("preload finish")
                        self.onFinish(items)
                        // if (null != callback)
                        //     callback(items);
                    }
                }
            )
        }
        else {
            this._finished = true
            this.total = 1
            this.current = 1
        }

        // DataManager.CommonData["audio"] = []
        // if (audioParam.audioSrc == null) {
        //     return
        // }
        // cc.loader.loadResArray(audioParam.audioSrc, cc.AudioClip, 
        //     (current, total, item) =>{
        //     },
        //     (err, items: any[]) => {
        //         if (err) {
        //             console.log(err)
        //         }
        //         else {
        //             console.log("preload audio finish")
        //             if (audioParam.audioCallback) {
        //                 audioParam.audioCallback(items)
        //             }
        //             items.forEach(item => {
        //                 DataManager.CommonData["audio"][item.name] = item
        //             })
        //         }
        //     }
        // )
    }

    update(dt) {
        if (this.total == 0)
            return

        // this._updateProgress += dt * 50000
        // if (this._updateProgress > this.current * 100)
        this._updateProgress = this.current * 100

        if (this.progress)
            this.progress.progress = this._updateProgress / (this.total * 100)

        if (this._finished && this._updateProgress >= this.total * 100) {
            this._callback && this._callback(this._result)

            this._finished = false

            this.closeSelf()
            // DataManager.Instance.node.stopAllActions()
            // if (DataManager.CommonData["gameServer"] && DataManager.CommonData["gameServer"].isPrivate)
            if ([1, 2].indexOf(DataManager.CommonData["gameServer"]["lc_room_mode"]) != -1)
                return
            DataManager.Instance.node.runAction(cc.sequence(cc.delayTime(3), cc.callFunc(() => showQttSuspendWin())))
        }
    }

    onFail(err) {
        console.log("error = " + err)
    }

    onFinish(items: any[]) {
        let common = commonTexture.map(item => item = item.substring(item.lastIndexOf("/") + 1) + ".plist")

        items.forEach(item => {
            if (-1 != common.findIndex((value, index, arr) => value == item.name))
                item.isCommon = true

            DataManager.addSpriteAtlas(item)
        })

        this._finished = true
        this._result = items

        if (this.total == 0) {
            this.total = 1
            this.current = 1
        }
    }
}
