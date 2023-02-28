import BaseScene from "../base/baseScene/BaseScene";
import NetManager from "../base/baseNet/NetManager";
import { enterPrivateGame, iMessageBox, getPrivateInviteInfo } from "../base/BaseFuncTs";
import { getPrivateGameDataList } from "./LobbyFunc";

const {ccclass, property} = cc._decorator;

@ccclass
export default class JoinRoomPop extends BaseScene {

    _inputNum: string = ""

    onOpenScene() {
        this.node.on("key", this.keyInput, this) 
        getPrivateGameDataList()
    }

    keyInput(sender, key) {
        key = sender.param
        if (key == "clean")
            this._inputNum = ""
        else if(key == "del")
            this._inputNum = this._inputNum.substring(0, this._inputNum.length - 1)
        else if(this._inputNum.length < 6)
            this._inputNum = this._inputNum + key

        for (let i = 0; i < 6; i ++) {
            if (i > this._inputNum.length)
                cc.find("keyboard_bg/showarea/num" + (i + 1), this.node).getComponent(cc.Label).string = ""
            else 
                cc.find("keyboard_bg/showarea/num" + (i + 1), this.node).getComponent(cc.Label).string = this._inputNum.substr(i, 1)
        }

        if (this._inputNum.length == 6) 
            getPrivateInviteInfo(this._inputNum)
    }

    onCloseScene() {
    }

}
