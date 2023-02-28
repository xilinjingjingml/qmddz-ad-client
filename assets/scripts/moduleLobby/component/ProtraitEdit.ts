
const {ccclass, property} = cc._decorator;

@ccclass
export default class ProtraitEdit extends cc.Component {

    _onBegin: boolean = false
    _oldPoint: cc.Vec2 = null
    _oldSize: cc.Size = null

    onEditBegin(sender) {
        if (true) {
            return
        }
        cc.log("onEditBegin")
        let nodePop = this.node.getChildByName("nodePop")
        if (this._onBegin) 
            return 
        
        this._onBegin = true

        if (nodePop.rotation === 0) {
            let size = this.node.getContentSize()

            this._oldSize = nodePop.getContentSize()
            this._oldPoint = nodePop.position

            nodePop.setContentSize(size.height * .9, this._oldSize.height);
            nodePop.position = cc.v2(0, 0)
            nodePop.rotation = -90

            nodePop.stopAllActions()
            nodePop.runAction(cc.sequence(
                cc.delayTime(.01), 
                cc.callFunc(() => {            
                    cc._widgetManager.refreshWidgetOnResized(nodePop)
                }),
                cc.delayTime(.01),
                cc.callFunc(() => {
                    if (sender) {
                        let id = sender._impl._domId
                        let elem = document.getElementById(id);
    
                        let strTransform: string = elem.style.transform;
                        strTransform = strTransform.replace("-1,", "-0.5,")
                        strTransform = strTransform.replace("1,", "0.5,")
                        elem.style.transform = strTransform
    
                        elem.style.bottom = "5px"
                    }
            })))
        }
        else{
            nodePop.stopAllActions()
            nodePop.runAction(cc.sequence(
                cc.delayTime(.01), 
                cc.callFunc(() => {
                    if (sender) {
                        let id = sender._impl._domId
                        let elem = document.getElementById(id);
    
                        let strTransform: string = elem.style.transform;
                        strTransform = strTransform.replace("-1,", "-0.5,")
                        strTransform = strTransform.replace("1,", "0.5,")
                        elem.style.transform = strTransform
    
                        elem.style.bottom = "5px"
                    }
            })))
        }

    }

    onEditEnd() {
        if (true) {
            return
        }
        cc.log("onEditEnd")
        if (!this._onBegin)
            return
        
        this._onBegin = false

        let self = this
        let nodePop = this.node.getChildByName("nodePop")

        nodePop.stopAllActions()
        nodePop.runAction(cc.sequence(cc.delayTime(.5), 
            cc.callFunc(() => {
                if (nodePop.rotation === 0 || self._onBegin)
                    return

                nodePop.setContentSize(self._oldSize)
                nodePop.position = self._oldPoint
                nodePop.rotation = 0
                
                nodePop.stopAllActions();

                nodePop.runAction(cc.sequence(cc.delayTime(.01), cc.callFunc(() => {
                    cc._widgetManager.refreshWidgetOnResized(nodePop)
                })))
        })))
    }
}
