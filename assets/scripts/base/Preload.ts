import DataManager from "./baseData/DataManager"
import BaseScene from "./baseScene/BaseScene"

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
    progress: cc.ProgressBar = null

    @property()
    total: number = 0

    @property()
    current: number = 0

    @property()
    _updateProgress: number = 0

    _finished: boolean = false
    _callback: (item: any[]) => void
    _result: any[] = []

    startLoad(src: string[], audioParam, callback: (items: any[]) => void = null): void {
        DataManager.clearSpriteFrame()
        this._callback = callback

        if (src.length > 0) {
            cc.loader.loadResArray(src, cc.SpriteAtlas,
                (current, total, item) => {
                    this.total = total
                    this.current = current
                },
                (err, items: any[]) => {
                    if (err) {
                        this.onFail(err)
                    }
                    else {
                        this.onFinish(items)
                    }
                }
            )
        }
        else {
            this._finished = true
            this.total = 1
            this.current = 1
        }
    }

    update(dt) {
        if (this.total == 0)
            return

        this._updateProgress = this.current * 100

        if (this.progress)
            this.progress.progress = this._updateProgress / (this.total * 100)

        if (this._finished && this._updateProgress >= this.total * 100) {
            this._callback && this._callback(this._result)

            this._finished = false

            this.closeSelf()
            if ([1, 2].indexOf(DataManager.CommonData["gameServer"]["lc_room_mode"]) != -1)
                return
        }
    }

    onFail(err) {
        cc.log("error = " + err)
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
