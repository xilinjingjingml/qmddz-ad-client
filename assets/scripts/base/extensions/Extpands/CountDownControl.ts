import BaseControl from "./BaseControl";

const {ccclass, property} = cc._decorator;

@ccclass
export default class CountDownControl extends BaseControl {

    @property(cc.Label)
    label: cc.Label = null;

    @property()
    text: string = "";

    @property()
    countDownTime: number = 0

    @property()
    isRepeat: boolean = false

    _curTime: number = 0

    start () {
        this.startCountDown()
    }

    startCountDown() {
        this._curTime = this.countDownTime
        this.label.string = this.text + this._curTime
        let self = this
        this.node.runAction(cc.repeatForever(cc.sequence(cc.delayTime(1), cc.callFunc(() => {
            self._curTime --
            self.label.string = self.text + self._curTime
            if (self._curTime == 0) {
                if (self.isRepeat) 
                    self._curTime = self.countDownTime
                else
                    self.node.stopAllActions()
            }
        }))))
    }

    onEnable() {
        this._curTime = this.countDownTime
        this.label.string = this.text + this._curTime
    }
}
