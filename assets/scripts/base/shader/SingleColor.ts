import BaseShader from "./BaseShader";

const {ccclass, property} = cc._decorator;

@ccclass
export default class SingleColor extends BaseShader {

    _effectName = "single_color"

    @property(cc.Color)
    _fillColor = cc.Color.WHITE;

    @property({
        type: cc.Color
    })
    set FillColor(value) {
        this._fillColor = value;
        this.initMaterial()
    }
    get FillColor() {
        return this._fillColor;
    }

    initComp() {
        this._comp = this.node.getComponent(cc.Sprite)
    }

    updateShaderParam() {
        this._material.setProperty('discolor', this._fillColor);
    }
}
