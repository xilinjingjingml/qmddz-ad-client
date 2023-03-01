import { getNotchHeight } from "../BaseFuncTs"

const { ccclass, disallowMultiple, requireComponent, menu } = cc._decorator

@ccclass
@disallowMultiple
@requireComponent(cc.Canvas)
@menu("component/CanvasAdapter")
export default class CanvasAdapter extends cc.Component {
    onLoad() {
        const canvas = this.node.getComponent(cc.Canvas)
        const designSize = canvas.designResolution
        const frameSize = cc.view.getFrameSize()
        const notchWidth: number = getNotchHeight()
        if (notchWidth) {
            canvas.fitWidth = true
            canvas.fitHeight = true
            canvas.designResolution = cc.size(designSize.height * ((frameSize.width - notchWidth * 2) / frameSize.height), designSize.height)
            window["_fullWinSize"] = cc.size(designSize.height * (frameSize.width / frameSize.height), designSize.height)
        } else if ((frameSize.width / frameSize.height) >= (designSize.width / designSize.height)) {
            canvas.fitHeight = true
            canvas.fitWidth = false
        } else {
            canvas.fitHeight = false
            canvas.fitWidth = true
        }
    }
}
