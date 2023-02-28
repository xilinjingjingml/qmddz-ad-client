import BaseScene from "../../base/baseScene/BaseScene";
import SceneManager from "../../base/baseScene/SceneManager";
import { CombinedConfig } from "./CombinedConfig";
import { accurateTime } from "../../base/BaseFunc";
import DataManager from "../../base/baseData/DataManager";
import { iMessageBox } from "../../base/BaseFuncTs";
import { receiveAdAward } from "../LobbyFunc";
import { AdsConfig } from "../../base/baseData/AdsConfig";


const {ccclass, property} = cc._decorator;

@ccclass
export default class CombinedSpeedingPop extends BaseScene {

    _speed: number = 0
    _speedTime: number = 0
    
    _freeSpeed: number = 0

    _maxSpeeding: number = 0
    _speedingTime: number = 3600

    _speedLabel: cc.Label = null
    _timeLabel: cc.Label = null
    _timeProgress: cc.ProgressBar = null

    onOpenScene() {
        this._speed = this.initParam.speed
        this._speedTime = this.initParam.speedTime

        // this._freeSpeed = this.initParam.freeSpeed

        this._speedLabel = cc.find("nodePop/speed", this.node).getComponent(cc.Label)
        this._timeLabel = cc.find("nodePop/time", this.node).getComponent(cc.Label)
        this._timeProgress = cc.find("nodePop/timeProgress", this.node).getComponent(cc.ProgressBar)

        this._timeProgress.progress = 0

        this._speed = DataManager.CommonData["SpeedUp"].speedPower
        this._speedTime = DataManager.CommonData["SpeedUp"].speedPowerExpiredTime

        // let speedAd = DataManager.CommonData["CombinedAds"]["speedUp"]
        // this._maxSpeeding = speedAd.metaData.powerLimit
        // this._speedingTime = speedAd.metaData.speedTime
        // this._freeSpeed = speedAd.maxTime

        this.initCountdown()
    }

    initCountdown() {
        let speedUp = DataManager.CommonData["SpeedUp"]
        this._speedLabel.string = "X" + (speedUp.speedPower + 1)
        if (speedUp.speedPowerExpiredTime > 0) {
            this._timeLabel.string = ("0" + Math.floor(speedUp.speedPowerExpiredTime / 60)).slice(-2) + ":" + ("0" + speedUp.speedPowerExpiredTime % 60).slice(-2)
            this._timeProgress.progress = speedUp.speedPowerExpiredTime / (speedUp.speedPower * speedUp.speedTime)
        }
        else {
            this._timeLabel.string = "00:00:00"
            this._timeProgress.progress = 0
        }
        
        cc.find("nodePop/btnSpeeding", this.node).getComponent(cc.Button).interactable = this._speed <= 10

        this.updateButtonState()
    }

    update(dt) {
        if (!this._timeLabel || !this._timeProgress)
            return

        if (this._speedTime <= 0)
            return

        let speedUp = DataManager.CommonData["SpeedUp"]
        this._speedTime -= dt
        let time = Math.floor(this._speedTime)
        this._timeLabel.string = ("00" + Math.floor(time / 3600)).slice(-2) + ":" + ("0" + (Math.floor(time / 60) % 60)).slice(-2) + ":" + ("0" + time % 60).slice(-2)
        this._timeProgress.progress = this._speedTime / (speedUp.speedPower * speedUp.speedTime)

        if (this._speedTime <= 0) {
            // speedUp.speedPower = 0
            // SceneManager.Instance.sendMessageToScene({opcode: "UPDATE_Combined_SPEEDING", packet:{speed: 1, speedTime: 0}})
            cc.find("nodePop/btnSpeeding", this.node).getComponent(cc.Button).interactable = this._speed <= 10
        }
    }

    updateButtonState() {
        let speedUp = DataManager.CommonData["SpeedUp"]
        if (speedUp.speedUpCount > 0) {
            cc.find("nodePop/btnSpeeding/Background/icon", this.node).active = false
            cc.find("nodePop/btnSpeeding/Background/tip", this.node).setPosition(cc.v2(-30, 4))
            cc.find("nodePop/btnSpeeding/Background/times", this.node).active = true
            cc.find("nodePop/btnSpeeding/Background/times", this.node).getComponent(cc.Label).string = "(" + speedUp.speedUpCount + ")"            
        }
        else if (DataManager.CommonData["CombinedAds"].speedUp.maxTimes === -1 ||
                DataManager.CommonData["CombinedAds"].speedUp.maxTimes > DataManager.CommonData["CombinedAds"].speedUp.count) {

            cc.find("nodePop/btnSpeeding/Background/icon", this.node).active = true
            cc.find("nodePop/btnSpeeding/Background/tip", this.node).setPosition(cc.v2(30, 4))
            cc.find("nodePop/btnSpeeding/Background/times", this.node).active = false            
        }
        else {
            cc.find("nodePop/btnSpeeding", this.node).getComponent(cc.Button).interactable = false
            cc.find("nodePop/btnSpeeding/Background/icon", this.node).active = true
            cc.find("nodePop/btnSpeeding/Background/tip", this.node).setPosition(cc.v2(30, 4))
            cc.find("nodePop/btnSpeeding/Background/times", this.node).active = false
        }
    }

    onPressSpeeding() {
        let speedUp = DataManager.CommonData["SpeedUp"]
        if (speedUp.speedPower >= speedUp.powerLimit)
            return

        if (speedUp.speedUpCount > 0) {
            this.getSpeedUp()
        }
        else if (DataManager.CommonData["CombinedAds"].speedUp.maxTimes === -1 || 
            DataManager.CommonData["CombinedAds"].speedUp.maxTimes > DataManager.CommonData["CombinedAds"].speedUp.count) {
            cc.find("nodePop/btnSpeeding", this.node).getComponent(cc.Button).interactable = false
            cc.find("nodePop/btnSpeeding", this.node).runAction(cc.sequence(cc.delayTime(3), cc.callFunc(() => {
                cc.find("nodePop/btnSpeeding", this.node).getComponent(cc.Button).interactable = true
            })))    
            receiveAdAward(AdsConfig.taskAdsMap.CombinedSpeeding, () => {
                this.getAdAward()    
            }, null, false, null, false)
        }
    }

    getSpeedUp() {
        CombinedConfig.SpeedUp(DataManager.CommonData["CombinedCurSeason"], (msg) => {
            cc.find("nodePop/btnSpeeding", this.node).getComponent(cc.Button).interactable = true
            console.log(msg)
            if (msg.code !== 0) {
                iMessageBox(msg.errMsg)
                return
            }            
            DataManager.CommonData["SpeedUp"].speedPower = msg.speedPower
            DataManager.CommonData["SpeedUp"].speedPowerExpiredTime = msg.speedPowerExpiredTime - Math.ceil(Date.now() / 1000)
            this._speed = DataManager.CommonData["SpeedUp"].speedPower
            this._speedTime = DataManager.CommonData["SpeedUp"].speedPowerExpiredTime
            let speedUp = DataManager.CommonData["SpeedUp"]
            this._speedLabel.string = "X" + (this._speed + 1)
            this._timeLabel.string = ("0" + Math.floor(speedUp.speedPowerExpiredTime / 60)).slice(-2) + ":" + ("0" + speedUp.speedPowerExpiredTime % 60).slice(-2)
            this._timeProgress.progress = speedUp.speedPowerExpiredTime / (speedUp.speedPower * speedUp.speedPowerExpiredTime)

            cc.find("nodePop/btnSpeeding", this.node).getComponent(cc.Button).interactable = this._speed < 10

            if (speedUp.speedUpCount > 0)
                speedUp.speedUpCount-- 
            this.updateButtonState()

            SceneManager.Instance.sendMessageToScene({opcode: "UPDATE_Combined_SPEEDING", 
                packet:{speed: speedUp.speedPower, speedTime: speedUp.speedPowerExpiredTime, freeSpeed: speedUp.speedUpCount}})
        })        
    }

    getAdAward() {
        let self = this
        let money = DataManager.CommonData["CombinedMoney"]
        CombinedConfig.getAdAward(DataManager.CommonData["CombinedCurSeason"], DataManager.CommonData["CombinedAds"].speedUp.id, (msg) => {
            console.log(msg)
            if (msg.code !== 0) {
                iMessageBox(msg.errMsg)
                // self.closeSelf()
                return
            }

            DataManager.CommonData["CombinedAds"].speedUp.count = msg.adCount
            this.getSpeedUp()
            // self.closeSelf()
        })
    }
}
