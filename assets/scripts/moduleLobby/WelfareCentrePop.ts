import BaseScene from "../base/baseScene/BaseScene";
import DataManager from "../base/baseData/DataManager";
import { czcEvent, playAD, showTokenGrowPop, showAwardResultPop, iMessageBox, showAwardMutipleResultPop } from "../base/BaseFuncTs";
import { checkADNum, getADAward, sendReloadUserData, getADConfig } from "./LobbyFunc";
import SceneManager from "../base/baseScene/SceneManager";
import { AdsConfig } from "../base/baseData/AdsConfig";

const {ccclass, property} = cc._decorator;

@ccclass
export default class WelfareCentrePop extends BaseScene {

    onOpenScene() {

    }

    onPressCardNote() {
        // SceneManager.Instance.popScene<String>("moduleLobby", "CardNoteBuyPop")
        this.onPressAd(11)
    }

    onPressFreeDraw() {
        SceneManager.Instance.popScene("moduleLobby", "FreeDrawPop")
    }

    onPressFreeGold() {
        this.onPressAd(6)
    }

    onPressQtt() {
        this.onPressAd(5)
    }

    onPressAd(adNum) {
        let adName = AdsConfig.getAdName(adNum)
        let adsReason = AdsConfig.getAdVideo(adNum)        

        czcEvent("大厅", "领取" + adName + "1", "点击领取 " + (DataManager.CommonData["morrow"] <= 1 ? DataManager.CommonData["morrow"] + "天新用户" : "老用户"))
        let self = this
        let getAward = function() {
            if (checkADNum(adNum)) {
                czcEvent("大厅", "领取" + adName + "2", "播放广告 " + (DataManager.CommonData["morrow"] <= 1 ? DataManager.CommonData["morrow"] + "天新用户" : "老用户"))
                playAD(adsReason, () => {
                    czcEvent("大厅", "领取" + adName + "3", "看完广告 " + (DataManager.CommonData["morrow"] <= 1 ? DataManager.CommonData["morrow"] + "天新用户" : "老用户"))

                    getADAward(adNum, () => {  
                        czcEvent("大厅", "领取" + adName + "4", "获取奖励 " + (DataManager.CommonData["morrow"] <= 1 ? DataManager.CommonData["morrow"] + "天新用户" : "老用户"))
                        if (adNum == 5) {
                            showTokenGrowPop(30) 
                        }
                        else if (adNum == 6) {
                            let awards = [
                                {
                                    index: 0,
                                    num: 1000,
                                }
                            ]
                            showAwardResultPop(awards)
                        }
                        else if (adNum == 11) {
                            let awards = [
                                {index: 2, num: 1},
                            ]
                            
                            // showAwardMutipleResultPop(awards)
                            showAwardResultPop(awards)
                        }
                        sendReloadUserData()
                    })        
                })                
            }
            else {
                iMessageBox("您今日的" + adName + "次数已用完，请明天再来！")
            }
        }

        if (null == DataManager.CommonData["adConfig"]) {
            getADConfig(() => {
                getAward()
            })
            return 
        }

        getAward()
    }
}