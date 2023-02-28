const { ccclass, disallowMultiple,menu, requireComponent } = cc._decorator;

@ccclass
@disallowMultiple
@menu("自定义组件/WidgetAdapter")
@requireComponent(cc.Widget)
export default class WidgetAdapter extends cc.Component {
    onLoad() {
        const size: cc.Size = window['winSize']
        if (size == null) {
            return
        }

        const width = (size.width - cc.winSize.width) / 2
        const height = (size.height - cc.winSize.height) / 2
        const widget = this.node.getComponent(cc.Widget)
        if (widget.isAlignLeft) {
            this.node.width += width
        }
        if (widget.isAlignRight) {
            this.node.width += width
        }
        if (widget.isAlignTop) {
            this.node.height += height
        }
        if (widget.isAlignBottom) {
            this.node.height += height
        }

        if (widget.isAlignLeft) {
            widget.left -= width
        }
        if (widget.isAlignRight) {
            widget.right -= width
        }
        if (widget.isAlignTop) {
            widget.top -= height
        }
        if (widget.isAlignBottom) {
            widget.bottom -= height
        }
        widget.updateAlignment()
    }
}
