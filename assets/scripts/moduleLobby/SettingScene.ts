import BaseScene from "../base/baseScene/BaseScene";
import DataManager from "../base/baseData/DataManager";
import {copyToClipBoard} from "../base/BaseFuncTs";
import TabControl from "../base/extensions/Extpands/TabControl";
import WxWrapper from "../base/WxWrapper";

const {ccclass, property} = cc._decorator;

@ccclass
export default class SettingScene extends BaseScene {

    _conClick: number = 0;
    _lastTime: number = 0;

    start () {

    }

    onOpenScene() {
        let guid = cc.find("nodePop/nodeLift/guidlabel", this.node)
        if (null != guid)
            guid.getComponent(cc.Label).string = "ID: " + DataManager.UserData.guid

        let ver = cc.find("nodePop/nodeRight/verlabel", this.node)
        if (null != ver)
            ver.getComponent(cc.Label).string = "版本号: " + DataManager.Instance.version

        if (DataManager.SoundVolume == 1)
            cc.find("nodePop/nodeLift/btnMusic02", this.node).getComponent(TabControl).onGroup()
        else
            cc.find("nodePop/nodeLift/btnMusic01", this.node).getComponent(TabControl).onGroup()

            
        if (DataManager.EffectVolume == 1)
            cc.find("nodePop/nodeLift/btnEffect02", this.node).getComponent(TabControl).onGroup()
        else
            cc.find("nodePop/nodeLift/btnEffect01", this.node).getComponent(TabControl).onGroup()

        this.node.on("soundchange", (msg) => { 
            DataManager.SoundVolume = msg.param
        })
        this.node.on("effectchange", (msg) => { 
            DataManager.EffectVolume = msg.param
        })
        this.node.on("copyphone", () => { copyToClipBoard("4009552201") })
    }

    onCloseScene() {
        this.node.off("soundchange")
        this.node.off("effectchange")
        this.node.off("copyphone")
    }    

    onPressVersion() {
        this._conClick ++;

        if (0 != this._lastTime && 500 < new Date().getTime() - this._lastTime)
            return

        this._lastTime = new Date().getTime()

        if (this._conClick > 15) {
            cc.log = console.log.bind(console)
            DataManager.save("ENABLE_DEBUG", 1)
            WxWrapper.setEnableDebug(true)
        }
    }
}
