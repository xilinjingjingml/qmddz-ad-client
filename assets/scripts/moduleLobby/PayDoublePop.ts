import { confusonFunc } from "../base/confusonFunc";
import { getShopBox, payOrder, showAwardResultPop } from "../base/BaseFuncTs";
import DataManager from "../base/baseData/DataManager";
import SceneManager from "../base/baseScene/SceneManager";
import ShakeAniControl from "../base/extensions/Extpands/ShakeAniControl";

const {ccclass, property} = cc._decorator;

@ccclass
export default class PayDouble extends cc.Component {

    _oldGold: number = 0;
    _lastBoxMoney: number = 0;

    start () {

    }

    onEnable() {
        this.getShopBoxs()
    }

    getShopBoxs() {
        getShopBox(5, this.updateShops.bind(this))
    }

    updateShops() {
        if (null == DataManager.Instance.ActiveBoxs)
            return

        let content = cc.find("shopList/view/content", this.node)
        let size = content.getContentSize()
        let model = cc.find("shopList/view/item", this.node)
        size.width = (model.getContentSize().width + 10) * DataManager.Instance.ActiveBoxs.length
        content.setContentSize(size)

        content.removeAllChildren(true)

        let idx = 0;
        let firstUnBuy = -1;
        let unBuy = false
        for (let iter of DataManager.Instance.ActiveBoxs) {
            let item = cc.instantiate(model);
            content.addChild(item)
            item.position = cc.v2(0, 0)

            if (iter["content"][0]["num"])
                cc.find("completeEgg/shopDesc", item).getComponent(cc.Label).string = "最高可得\n\r" + (iter.content[0].num / 10000 * 2) + "万金豆"

            // let spani = item.getChildByName("baozu1-2").getComponent(sp.Skeleton)
            // if (spani) {
            //     item.runAction(
            //         cc.sequence(
            //             cc.delayTime(idx * 2), 
            //             cc.callFunc(() =>{
            //                 item.stopAllActions()
            //                 item.runAction(
            //                     cc.repeatForever(
            //                         cc.sequence(
            //                             cc.callFunc(() => {
            //                                 if (null != item) {
            //                                     spani.clearTrack(0)
            //                                     // spani.setAnimation(0, "fu-bao", false)
            //                                     spani.setAnimation(0, "fu-dai", false)
            //                                 }
            //                             }),
            //                             cc.delayTime(DataManager.Instance.ActiveBoxs.length * 2)
            //                         )))
            //             })
            //         ))
            // }

            let completeEgg = item.getChildByName("completeEgg")
            let breakEgg = item.getChildByName("breakEgg")
            // item.stopAllActions()
            // completeEgg.stopAllActions()
            // breakEgg.stopAllActions()

            completeEgg.active = true
            completeEgg.opacity = 255
            breakEgg.active = true
            breakEgg.opacity = 0

            item.runAction( 
                cc.sequence(
                    cc.delayTime(idx * 10),
                    cc.callFunc(() => {
                        item.runAction(
                            cc.repeatForever(
                                cc.sequence(
                                    cc.callFunc(() => {
                                        completeEgg.runAction(
                                            cc.sequence(
                                                cc.rotateTo(.2, 10), 
                                                cc.rotateTo(.2, -10),
                                                cc.rotateTo(.2, 10),
                                                cc.rotateTo(.2, -10),
                                                cc.rotateTo(.2, 0)
                                            )
                                        )
                                    }),
                                    cc.delayTime(1),
                                    cc.callFunc(() => {
                                        completeEgg.runAction(cc.fadeOut(.2))
                                        breakEgg.runAction(cc.fadeIn(.2))
                                    }),
                                    cc.delayTime(5.2),
                                    cc.callFunc(() => {
                                        completeEgg.runAction(cc.fadeIn(.2))
                                        breakEgg.runAction(cc.fadeOut(.2))
                                    }),
                                    cc.delayTime(10),
                                )
                            )
                        )
                    })
                )                
            )
            

            cc.find("btnBuy/price", item).getComponent(cc.Label).string = "¥" + iter.price + " >>"

            // item.getChildByName("completeEgg").active = true
            // item.getChildByName("breakEgg").active = false
            // item.getChildByName("completeEgg").active = iter.isBuy == 0
            // item.getChildByName("breakEgg").active = iter.isBuy != 0

            // if (firstUnBuy == -1 && iter.isBuy != 0) 
            //     firstUnBuy = idx
            // else if (firstUnBuy >= 0 && iter.isBuy == 0)
            //     unBuy = true
            // else if (firstUnBuy >= 0 && !unBuy)
            //     firstUnBuy = idx
            // let egg = item.getChildByName("completeEgg")
            // egg.runAction(cc.sequence(
            //     cc.delayTime(idx), 
            //     cc.callFunc(
            //         () => {
            //             egg.getComponent(ShakeAniControl).delayTime = DataManager.Instance.ActiveBoxs.length + 1; 
            //             egg.getComponent(ShakeAniControl).startAni()
            //         })))

            let buy = item.getChildByName("btnBuy").getComponent(cc.Button)
            let clickEventHandler = new cc.Component.EventHandler();
            clickEventHandler.target = this.node; 
            clickEventHandler.component = "PayDoublePop";
            clickEventHandler.handler = "onBuy" + iter.boxid; 
            let box = (<any>Object).assign(iter)
            this["onBuy" + iter.boxid] = () => {
                buy.interactable = false
                buy.node.runAction(cc.sequence(cc.delayTime(2), cc.callFunc(() => buy.interactable = true)))
                content.getPosition()
                cc.log(box.serino)
                this._oldGold = DataManager.UserData.money
                this._lastBoxMoney = iter.content[0].num
                payOrder(box)
                buy.interactable = false
                buy.node.runAction(cc.sequence(cc.delayTime(30), cc.callFunc(() => buy.interactable = true)))
            }          

            idx ++
            buy.clickEvents.push(clickEventHandler);
        }

        // if (-1 != firstUnBuy){
        //     let offx = (firstUnBuy + 1) * (model.getContentSize().width + 10)
        //     let maxx = cc.find("shopList/view", this.node).getContentSize().width
        //     if (size.width - offx < maxx) 
        //         offx = size.width - maxx

        //     let pos = content.position
        //     pos.x -= offx
        //     content.position = pos
        // }        
    }

    proto_lc_send_user_data_change_not() {
        let val = DataManager.UserData.money - this._oldGold
        if (0 < this._lastBoxMoney && val > this._lastBoxMoney) {
            let awards = [
                {
                    index: 0,
                    num: val,
                }
            ]
            showAwardResultPop(awards, {msg: "获得基础" + this._lastBoxMoney + "金豆 获得额外" + (val - this._lastBoxMoney) + "金豆"})
            this._lastBoxMoney = -1
            this._oldGold = DataManager.UserData.money

            // getShopBox(5, this.updateShops.bind(this))
        }
    }

}
