import { confusonFunc } from "../base/confusonFunc";
import BaseScene from "../base/baseScene/BaseScene";
import { getFlyBackAward } from "./LobbyFunc";
import { showAwardResultPop } from "../base/BaseFuncTs";

const {ccclass, property} = cc._decorator;

@ccclass
export default class BackAwardPop extends BaseScene {

    start () {

    }

    onPressClose() {
        if (this.initParam["closeCallback"])
            this.initParam["closeCallback"] = null
        this.closeSelf()
    }

    onPressGetAward() {
        let self = this
        getFlyBackAward(1, (msg) => {
            if (msg == 0) {
                let awards = [
                    {
                        index: 0,
                        num: 5000,
                    },
                    {
                        index: 365,
                        num: 1000,
                    }
                ]
                showAwardResultPop(awards, {closeCallback: () => {self.closeSelf()}})                
            }
        })
    }
}
