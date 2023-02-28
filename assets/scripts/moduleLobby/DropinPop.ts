import BaseScene from "../base/baseScene/BaseScene";
import DataManager from "../base/baseData/DataManager";
import { numberFormat, MsgBox } from "../base/BaseFuncTs";
import { sendReloadUserData } from "./LobbyFunc";

const {ccclass, property} = cc._decorator;

@ccclass
export default class DropinPop extends BaseScene {

     _baseMoney: number = 0
     _moneyInterval: number = 0
     _curMoney: number = 0

     onOpenScene() {
          cc.find("nodePop/nodeDropIn/nowMoneyBg/moneyNumber", this.node).getComponent(cc.Label).string = "" + DataManager.UserData.money
          cc.find("nodePop/nodeDropIn/nowMoneyBg/tips", this.node).getComponent(cc.Label).string = numberFormat(DataManager.UserData.money)

          // 创建房间最低10000 加入最低1000
          this._baseMoney = this.initParam["isOwner"] ? 10000 : 1000
          this._moneyInterval = DataManager.UserData.money - this._baseMoney
          this.updateSliderProgress(this._baseMoney)
     }

     onCloseScene() {

     }

     onSlider(sender) {
          this.updateSliderProgress(sender.progress * this._moneyInterval + this._baseMoney)
     }

     onPressConfirm() {
          if (this._curMoney > DataManager.UserData.money) {
               let initParam = {
                    title: "提示",
                    confirmClose: true,
                    content: "您的身上的游戏币不足想要带入的值",
                    buttonNum: 1,
                }
                MsgBox(initParam)
                return
          }

          DataManager.CommonData["carryMoney"] = this._curMoney
          if (this.initParam["settingCallback"] && typeof this.initParam["settingCallback"] == "function")
               this.initParam["settingCallback"]()
     }

     onDropinEdit(text, sender, eventData) {    
         let curDropIn = parseInt(text)
          if (curDropIn < this._baseMoney) 
               curDropIn = this._baseMoney
          else if (curDropIn > DataManager.UserData.money)
               curDropIn = DataManager.UserData.money

          sender.string = Math.floor(curDropIn / 1000) * 1000
          this.updateSliderProgress(text)
     }

     updateSliderProgress(value) {
          let slider = cc.find("nodePop/dropInSlider", this.node).getComponent(cc.Slider)
          let fill = cc.find("nodePop/dropInSlider/fill", this.node)

          let size = slider.node.getContentSize()
          let progress = (value - this._baseMoney) / this._moneyInterval
          if (0 == this._moneyInterval)
               progress = 1
          slider.progress = progress
          size.width *= progress
          fill.setContentSize(size) 

          this._curMoney = Math.floor(value / 1000) * 1000
          cc.find("Handle/popbg/betTIps", slider.node).getComponent(cc.Label).string = this._curMoney + "金豆"
          cc.find("nodePop/nodeDropIn/editDropin", this.node).getComponent(cc.EditBox).string = "" + this._curMoney
          cc.find("nodePop/nodeDropIn/editDropin/TEXT_LABEL", this.node).getComponent(cc.Label).string = "" + this._curMoney
          cc.find("nodePop/nodeDropIn/editDropin/tips", this.node).getComponent(cc.Label).string = numberFormat(this._curMoney)
     }

     calcDropinMoney() {
          
     }

}
