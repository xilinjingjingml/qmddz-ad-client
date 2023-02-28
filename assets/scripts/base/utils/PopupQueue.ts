export default class PopupQueue {
    private index: number = 0
    popups: Function[] = []

    add(popup: Function) {
        this.popups.push(popup)
    }

    showPopup() {
        for (let i = this.index; i < this.popups.length; i++) {
            this.index++
            try {
                if (this.popups[i]()) {
                    break
                }
            } catch (error) {
                cc.error("[PopupQueue.showPopup]", error)
            }
        }
    }
}