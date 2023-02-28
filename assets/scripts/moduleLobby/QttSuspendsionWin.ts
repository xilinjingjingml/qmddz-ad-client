import BaseScene from "../base/baseScene/BaseScene";
import DataManager from "../base/baseData/DataManager";
import SceneManager from "../base/baseScene/SceneManager";
import { getNowTimeUnix } from "../base/BaseFuncTs";
import { getTaskList } from "./LobbyFunc";

const {ccclass, property} = cc._decorator;

@ccclass
export default class QttSuspendsionWin extends BaseScene {

    @property
    x: number = 0

    @property
    y: number = 0

    _progressValue: number = 0

    start () {
        this.x = DataManager.CommonData["qtt_supsend_x"] || 480
        this.y = DataManager.CommonData["qtt_supsend_y"] || -200
        this.node.position = cc.v2(this.x, this.y)
        let self = this
        this.node.on(cc.Node.EventType.TOUCH_MOVE, (param) => {
            let point = param.currentTouch._point
            point.x = point.x < 40 ? 40 : point.x > cc.winSize.width - 40 ? cc.winSize.width - 40 : point.x
            point.y = point.y < 55 ? 55 : point.y > cc.winSize.height - 55 ? cc.winSize.height - 55 : point.y
            point.x -= cc.winSize.width / 2
            point.y -= cc.winSize.height / 2

            if (self.isProtrait) {
                let t = point.x
                point.x = point.y
                point.y = -t
            }

            this.node.position = point
        })
        this.node.on(cc.Node.EventType.TOUCH_END, (param) => {
            DataManager.CommonData["qtt_supsend_x"] = this.node.position.x
            DataManager.CommonData["qtt_supsend_y"] = this.node.position.y
            if (param.currentTouch._startPoint.sub(param.currentTouch._point).mag() == 0)
                self.onPressTask()
        })
    }

    onOpenScene() {
        this.updateProgressState(0)
        this.node.zIndex = 2000

        this.updateTaskList()
        // let self = this
        // this.node.runAction(cc.repeatForever(cc.sequence(cc.delayTime(.5), cc.callFunc(() => self.onPressTask()))))
    }

    onCloseScene() {

    }

    onPressTask() {
        // this._progressValue = this._progressValue + 1 / 60
        // console.log(this._progressValue)
        // if (this._progressValue > 1)
        //     this._progressValue = 0
        // this.updateProgressState(this._progressValue)
        SceneManager.Instance.popScene("moduleLobby", "TaskPop")
    }

    onTouchMove() {

    }

    startTaskCountdown(time, now) {
        this.node.stopAllActions()
        let self = this
        self.updateProgressState(now);
        this.node.runAction(cc.repeatForever(cc.sequence(cc.callFunc(() => {    
            now += .2
            let t = now / time
            if (t >= 1) {
                self.node.stopAllActions()
                t = 1
                // getTaskList(1)
            }
            self.updateProgressState(t);            
        }), cc.delayTime(.2))))
    }

    updateProgressState(progressVal) {
        this._progressValue = Math.round(progressVal * 100) / 100
        let angle = -360 * progressVal
        let progressNode = cc.find("progressNode/supsendProgress", this.node)
        progressNode.angle = angle
        progressNode.getComponent(cc.Sprite).fillRange = progressVal

        progressNode.getChildByName("progressHead").active = this._progressValue % 1 != 0
        cc.find("progressNode/progressTail", this.node).active = this._progressValue > 0 || this._progressValue == 1

        progressNode.active = this._progressValue != 1
        this.node.getChildByName("progressLightNode").active = !progressNode.active
    }

    updateTaskList() {
        if (null == DataManager.CommonData["TaskList"])
            return 

        let tasks = Object.assign(DataManager.CommonData["TaskList"])
        tasks = tasks.filter(item => -1 != item.name.indexOf("游戏在线"))
        tasks.sort((a, b) => a.max < b.max ? -1 : 1)
        let countdown = null
        for (let task of tasks) {
            if (task.status == 0 && task.value < task.max) {
                countdown = task
            }
        }

        if (null == countdown){
            this.updateProgressState(1)
            return
        }

        this._progressValue = 0
        this.startTaskCountdown(countdown.max, countdown.value)
    }
}
