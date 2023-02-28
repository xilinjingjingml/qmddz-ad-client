import BaseFunc = require("../base/BaseFunc")
import BaseComponent from "../base/BaseComponent"

const {ccclass, property} = cc._decorator;

@ccclass
export default class RollNumbers extends BaseComponent {


    @property
    thisComponentName:string = "RollNumber"
    // LIFE-CYCLE CALLBACKS:
    @property()
    speed:number = 1

    @property()
    myvalue:number = 0
    numberSize:number = 11
    distenceY:number = 24
    numberArr = []
    // onLoad () {}
    __bindButtonHandler() {
        
    }

    start () {

    }

    reInit() {

        for (let i = 0; i < this.numberSize; i++) {
            this["sptRedPacketNum" + (i + 1)].active = false       
            this["sptRedPacketNum" + (i + 1)].getChildByName("labelRedPacketNum").y = -1 * this.distenceY
        }
        this.numberArr = []
        this.myvalue = 0
    }
    
    setSrcValue(value=0) {
        this.reInit()

        this.myvalue = value

        this.numberArr = value.toString(10).replace(/\D/g, '0').split('').map(Number);
        // this.numberArr.unshift(-1)

        this.numberArr.forEach((v, k) => {
            this["sptRedPacketNum" + (k+1)].active = true
            this["sptRedPacketNum" + (k+1)].getChildByName("labelRedPacketNum").y = this.distenceY * v
        })

    }


    setDstNumber(value=0) {
        let devideNumber = this.myvalue == 0 ? 1 : this.myvalue
        let devide_delta = value/devideNumber
        let minus_delta = value - this.myvalue
        if (devide_delta >= 100) {
            // return
        } 
        
        
        let numbeArrSrc = this.numberArr
        let numbeArrDst = value.toString(10).replace(/\D/g, '0').split('').map(Number);

        if(devide_delta >= 10){

        }else{
            // numbeArrDst.unshift(-1)
        }

        this.myvalue = value
        
        numbeArrDst.forEach((v, k) => {
            this["sptRedPacketNum" + (k+1)].active = true
            let dstY = this.distenceY * v
            let curY = this["sptRedPacketNum" + (k+1)].getChildByName("labelRedPacketNum").y

            let actionList = []
            actionList[actionList.length] = cc.delayTime((numbeArrDst.length - k)*0.3);
            
            let loopTime = Math.floor(minus_delta / Math.pow(10, (numbeArrDst.length - k)))
            
            //进位
            if (curY/this.distenceY * Math.pow(10, (numbeArrDst.length - k - 1)) + minus_delta > Math.pow(10, (numbeArrDst.length - k))) {
                loopTime++                
            }

            //减少圈数
            if (loopTime > k) {
                loopTime = k
            }
            
            for (let i = 0; i < loopTime; i++) {
                actionList[actionList.length] = cc.moveTo(0.3/loopTime + k * 0.03, cc.v2(0, (this.numberSize-1) * this.distenceY )).easing(cc.easeOut(2.0));
                actionList[actionList.length] = cc.callFunc(() => {
                    this["sptRedPacketNum" + (k+1)].getChildByName("labelRedPacketNum").y = 0
                })
            }
            
            let timeFix = loopTime == 0 ? 1 : loopTime
            actionList[actionList.length] = cc.moveTo(0.5 + k * 0.05, cc.v2(0, dstY)).easing(cc.easeOut(2.0));
            this["sptRedPacketNum" + (k+1)].getChildByName("labelRedPacketNum").stopAllActions()
            this["sptRedPacketNum" + (k+1)].getChildByName("labelRedPacketNum").runAction(cc.sequence(actionList));
        
        })
    }

    setRollSpeed(value=1) {
        this.speed = value
    }
    // update (dt) {}
}
