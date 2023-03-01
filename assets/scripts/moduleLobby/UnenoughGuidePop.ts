import { confusonFunc } from "../base/confusonFunc";
import BaseScene from "../base/baseScene/BaseScene"
import { receiveAdAward } from "./LobbyFunc"

const { ccclass } = cc._decorator

@ccclass
export default class UnenoughGuidePop extends BaseScene {

    onPressADAward(event, data) {
        receiveAdAward(parseInt(data))
    }
}
