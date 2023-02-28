import BaseControl from "../Extpands/BaseControl";

const {ccclass, property, executeInEditMode} = cc._decorator;

@ccclass
@executeInEditMode
export default class BaseCircuit extends BaseControl {

    @property()
    _onFire: boolean = false

    start () {

    }

    onFire() {

    }
}
