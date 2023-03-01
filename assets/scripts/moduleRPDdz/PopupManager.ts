type TPopups = (() => boolean)[]
export default class PopupManager {
    private popups: TPopups
    private index: number

    constructor(popups: TPopups) {
        this.index = 0
        this.popups = popups
    }

    reset(popups?: TPopups) {
        this.index = 0
        if (popups) {
            this.popups = popups
        }
    }

    stop() {
        this.index = this.popups.length
    }

    showPopup() {
        for (let i = this.index; i < this.popups.length; i++) {
            this.index++
            try {
                if (this.popups[i]()) {
                    break
                }
            } catch (error) {
                cc.error("[PopupManager.showPopup]", error)
            }

        }
    }
}