import BaseComponent from "../base/BaseComponent";

const {ccclass, property} = cc._decorator;

@ccclass
export default class GashaponBall extends BaseComponent {

    @property(cc.SpriteFrame)
    icon_item_0:cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    icon_item_2:cc.SpriteFrame = null;
    
    @property(cc.SpriteFrame)
    icon_item_365:cc.SpriteFrame = null;
    
    @property(cc.SpriteFrame)
    icon_item_367:cc.SpriteFrame = null;
    
    @property(cc.SpriteFrame)
    icon_item_368:cc.SpriteFrame = null;


    _moveDir = cc.v2(0, 0)
    _moveSpeed = 0
    _rotationSpeed = 0
    _radius = 36        //相对于墙
    _innerRadius = 20   //相对于球
    _status = 0
    _isAction = false;

    STATUSENUM = {
        "Idle":0,
        "Running":1,
    }


    icon_items = []
    onLoad() {
        this.icon_items.push(this.icon_item_0)
        this.icon_items.push(this.icon_item_2)
        this.icon_items.push(this.icon_item_365)
        // this.icon_items.push(this.icon_item_367)
        this.icon_items.push(this.icon_item_368)
    }

    updateBallStatus(status) {
        this._status = status
    }

    updateStatus(initParam) {
        this._moveSpeed = initParam.moveSpeed
        this._moveDir = initParam.dir.normalize()
        this._rotationSpeed = initParam.rotationSpeed
    }
    
    
    initBall(initparam?) {
        this.node.x = 0
        this.node.y = 0;
        this.node.active = true;
        this.node.getComponent(cc.Sprite).spriteFrame = this.icon_items[initparam.acItemIndex]

        // this.nodeBallPrefab.getcom = initparam
        if(!!initparam) {
            this.updateStatus(initparam)
        }
    }

    shake(dir) {
        if(!!this._isAction){
            return;
        }
        this._isAction = true;
        let actionList = []
        actionList[actionList.length] = cc.delayTime(0.000001)
        actionList[actionList.length] = cc.moveBy(0.1, dir);
        actionList[actionList.length] = cc.callFunc(() => {
            this._isAction = false;
        })
        
        this.node.stopAllActions()
        this.node.runAction(cc.sequence(actionList))

    }

    move() {
        let newPos = this.node.position.add(this._moveDir.mul(this._moveSpeed));
        this.node.setPosition(newPos);
        this.node.angle += this._rotationSpeed;
    }

}
