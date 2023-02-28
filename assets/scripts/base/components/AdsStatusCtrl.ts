import BaseControl from "../../base/extensions/Extpands/BaseControl"
import { getNextAdMethod } from "../../moduleLobby/LobbyFunc"

const { ccclass, property, menu } = cc._decorator

@ccclass
@menu("component/AdsStatusCtrl")
export default class AdsStatusCtrl extends BaseControl {

    @property()
    adIndex: number = 0

    onLoad() {
        if (this.adIndex != 0) {
            this.updateStatus()
        }

        this.getBaseScene().addListener("onAdConfigUpdate", this.onAdConfigUpdateMessage.bind(this))
    }

    setAdIndex(index) {
        this.adIndex = index
        this.updateStatus()
    }

    onAdConfigUpdateMessage(message) {
        if (message.adIndex == this.adIndex) {
            this.updateStatus()
        }
    }

    updateStatus() {
        const method = getNextAdMethod(this.adIndex)

        const share = this.node.getChildByName("sprShare")
        share && (share.active = method == 1)

        const video = this.node.getChildByName("sprVideo")
        video && (video.active = method == 2)
    }
}