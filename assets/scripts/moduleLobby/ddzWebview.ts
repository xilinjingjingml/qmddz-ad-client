import { confusonFunc } from "../base/confusonFunc";
import DataManager from "../base/baseData/DataManager"
import BaseScene from "../base/baseScene/BaseScene"
import { NodeExtends } from "../base/extends/NodeExtends"
import TabControl from "../base/extensions/Extpands/TabControl"
import WxWrapper from "../base/WxWrapper"
import SceneManager from "../base/baseScene/SceneManager";

const { ccclass } = cc._decorator

@ccclass
export default class SettingScene extends BaseScene {

    // @property(cc.WebView)
    view: cc.WebView = null
    onOpenScene() {
        this.view = cc.find("content/view",this.node).getComponent(cc.WebView)
        this.view.url = this.initParam.url
    }
}