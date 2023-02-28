import BaseShader from "./BaseShader";

const {ccclass, property} = cc._decorator;

@ccclass
export default class GraduatedColor extends BaseShader {          

    _effectName = "graduated_color"

    @property(cc.Color)
    _beginColor = cc.Color.WHITE;

    @property({
        type: cc.Color
    })
    set BeginColor(value) {
        this._beginColor = value;
        this.initMaterial()
    }
    get BeginColor() {
        return this._beginColor;
    }

    @property(cc.Color)
    _endColor = cc.Color.WHITE;

    @property({
        type: cc.Color
    })
    set EndColor(value) {
        this._endColor = value;
        this.initMaterial()
    }
    get EndColor() {
        return this._endColor;
    }   

    updateShaderParam() {
        if (null == this._comp)
            return

        if (this._comp._frame) {
            let fontTexture = this._comp._frame._texture
            this._material.setProperty('texture', fontTexture);
        }

        this._material.setProperty("beginColor", this._beginColor)
        this._material.setProperty("endColor", this._endColor)
        this._material.setProperty("gVector", cc.v2(0, -1))   
        this._material.setProperty("offset", cc.v2(1 / this.node.getContentSize().width, 1 / this.node.getContentSize().height))
    }      
}