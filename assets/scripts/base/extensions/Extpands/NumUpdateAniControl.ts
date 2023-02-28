import BaseControl from "./BaseControl";
import { numberFormat } from "../../BaseFuncTs";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NumUpdateAniControl extends BaseControl {

    @property({
        type: cc.Label
    })
    target = null

    @property()
    useNumberFormat: boolean = true

    @property()   
    set OriginNum(val) {
        this._originNum = val
        if (this.target != null) 
            this.target.string = this.useNumberFormat ? numberFormat(val) : val
    }
    _originNum: number = 0

    _updateNum: number = 0

    _updateMask: cc.Node = null;
    _updateHead: cc.Label = null;
    _updateBody: cc.Label = null;
    _updateTail: cc.Label = null;

    _bInit: boolean = false;

    init() {
        let node = new cc.Node()
        node.parent = this.node
        node.name = "TokenUpdateMask"
        node.addComponent(cc.Mask)
        node.position = cc.Vec2.ZERO
        node.setAnchorPoint(this.node.getAnchorPoint())
        node.setContentSize(0, this.node.getContentSize().height)

        let head = new cc.Node()
        head.parent = node;
        head.position = cc.Vec2.ZERO
        head.setAnchorPoint(this.node.getAnchorPoint())
        this._updateHead = head.addComponent(cc.Label)
        this._updateHead.font = this.target.font
        this._updateHead.fontSize = this.target.fontSize       
        this._updateHead.lineHeight = this.target.lineHeight

        let body = new cc.Node()
        body.parent = node;
        body.position = cc.Vec2.ZERO
        body.setAnchorPoint(this.node.getAnchorPoint())
        this._updateBody = body.addComponent(cc.Label)
        this._updateBody.font = this.target.font
        this._updateBody.fontSize = this.target.fontSize       
        this._updateBody.lineHeight = this.target.lineHeight

        let Tail = new cc.Node()
        Tail.parent = node;
        Tail.position = cc.Vec2.ZERO
        Tail.setAnchorPoint(this.node.getAnchorPoint())
        this._updateTail = Tail.addComponent(cc.Label)
        this._updateTail.font = this.target.font
        this._updateTail.fontSize = this.target.fontSize       
        this._updateTail.lineHeight = this.target.lineHeight

       this._bInit = true;
    }

    setUpdateNum(val) {
        if (this._bInit == false) this.init()

        this._updateNum = val

        let oldString:string = this.target.string
        let newString:string = this.useNumberFormat ? numberFormat(val) : val
        let difString:any[] = []
        let max = oldString.length > newString.length ? oldString.length : newString.length
        let tailFind = false
        let tailNum = 0
        for (let k = 1; k < max; k++) {
            let o = k < oldString.length ? oldString[oldString.length - k] : ""
            let n = k < newString.length ? newString[newString.length - k] : ""
            if (o == n){ 
                difString[max - k] = n
                if (false == tailFind) tailNum ++
            }
            else{
                tailFind = true
                let no = parseInt(o)
                let nn = parseInt(n)
                if (null != o && null != n)
                    difString[max - k] = nn + 10 - no % 10
                else
                    difString[max - k] = n
            }
        }

        this._updateTail.string = newString.substring(newString.length - tailNum)
        this._updateHead.string = ""
        let idx = 0
        for (let idx = 0; idx < difString.length; idx++) {
            if (typeof difString[idx] == "string") {
                this._updateHead += difString[idx]
            }
            else {
                break
            }
        }

        this._updateBody.string = oldString.substring(idx, tailNum);
    }
}
