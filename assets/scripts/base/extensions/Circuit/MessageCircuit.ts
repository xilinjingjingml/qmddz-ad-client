import BaseCircuit from "./BaseCircuit";
import SceneManager from "../../baseScene/SceneManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends BaseCircuit {

    @property()
    msgName: string = ""

    @property()
    msgParam: string = ""

    start () {
        this.getBaseScene()
    }

    onFire() {
        SceneManager.Instance.sendMessageToScene({opcode: this.msgName, socket: this.msgParam})
    }

}
