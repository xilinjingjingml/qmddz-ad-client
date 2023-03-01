import { start } from "repl";

const {ccclass, property, executeInEditMode} = cc._decorator;

@ccclass
@executeInEditMode
export default class BaseShader extends cc.Component {

    _effectName: string = ""
    _srcEffect: cc.EffectAsset = null;
    _comp: cc.RenderComponent = null
    _material: cc.Material = null

    onEnable() {
        if (!this._material)
            this.initMaterial()
        else
            this.updateShaderParam()
    }

    initComp() {
        this._comp = this.node.getComponent(cc.RenderComponent)
    }

    updateShaderParam() {}

    loadEffect() {
        if (!this._effectName || 0 === this._effectName.length)
            return

        let self = this
        cc.loader.loadRes("shader/" + this._effectName, cc.EffectAsset, (err, res) => {
            if (err) {
                cc.log("not found shader in path" + this._effectName)
                cc.log(err)
                return
            }

            this._srcEffect = res
            self.initMaterial()
        })
    }

    initMaterial() {
        if (!this._comp) {    
            this.initComp()        
            if (!this._comp)
                return
        }

        if (!this._srcEffect) {
            this.loadEffect()
            return
        }

        this._material = this._comp.getMaterial(0)

        if (!this._material || this._material.effectAsset != this._srcEffect) {
            this._material = new cc.Material()
            this._material.effectAsset = this._srcEffect
            this._comp.setMaterial(0, this._material)
        }

        this.updateShaderParam()
    }

    onDestroy() {
        this._material = null
    }
}
