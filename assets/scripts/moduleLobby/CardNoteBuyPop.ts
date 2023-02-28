import BaseFunc = require("../base/BaseFunc")
import SceneManager from "../base/baseScene/SceneManager";
import { playAD, getMD5, iMessageBox, showAwardMutipleResultPop, showAwardResultPop } from "../base/BaseFuncTs";
import DataManager from "../base/baseData/DataManager";
import { getADAward, getADConfig } from "./LobbyFunc";
import BaseComponent from "../base/BaseComponent";
import { AdsConfig } from "../base/baseData/AdsConfig";

const {ccclass, property} = cc._decorator;

@ccclass
export default class CardNoteBuyPop extends BaseComponent {

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}
    thisComponentName = "CardNoteBuyPop"
    SIGN_KEY = "8923mjcm0d089d"
    
    adAllCount: number = 0;
    adCount: number = 0;

    onOpenScene() {
        this.refreshRestNum()
        cc.log(DataManager.CommonData["adNum"][AdsConfig.taskAdsMap.CardNoteBuyPop])
    }

    refreshRestNum() {
        if (null == DataManager.CommonData["adNum"] || 
            null == DataManager.CommonData["adNum"][AdsConfig.taskAdsMap.CardNoteBuyPop]){
            return;
        }
        
        this.adAllCount = DataManager.CommonData["adNum"][AdsConfig.taskAdsMap.CardNoteBuyPop].allNum
        this.adCount = DataManager.CommonData["adNum"][AdsConfig.taskAdsMap.CardNoteBuyPop].countNum

        this["labelRestNum"].$Label.string = "今日剩余: " + (this.adAllCount - this.adCount) + "次"
    }

    updateAdConfig() {
        this.refreshRestNum()
    }
    
    __bindButtonHandler() {
        BaseFunc.AddClickEvent(this["btnConfirm"], this.node, this.thisComponentName, "onPressConfirm", 0, -1);
        BaseFunc.AddClickEvent(this["btnClose"], this.node, this.thisComponentName, "onPressClose", 0, 3);
    }

    onCloseScene() {
        
    }

    onPressConfirm() {
        if(this.adAllCount > this.adCount) {
            playAD(AdsConfig.video.Double11ActivePop, this.adSucess.bind(this))
        }else{            
            iMessageBox("免费领取次数用完！")
        }
    }

    adSucess() {   
        getADAward(AdsConfig.taskAdsMap.CardNoteBuyPop, 
            () => {

                let awards = [
                    {index: 2, num: 1},
                ]
                
                // showAwardMutipleResultPop(awards)
                showAwardResultPop(awards)

                this.refreshRestNum()
            },
            () => {
                iMessageBox("免费领取次数用完！")
            },
            )
    }


    onPressClose() {
        this.close()
    }    
    
    close() {
        SceneManager.Instance.closeScene(this)
    }

    start () {

    }

    // update (dt) {}
}
