import BaseScene from "../base/baseScene/BaseScene"
import {copyToClipBoard} from "../base/BaseFuncTs"
import DataManager from "../base/baseData/DataManager"

const { ccclass } = cc._decorator

@ccclass
export default class ServicePop extends BaseScene {

	onOpenScene() {
		cc.find("nodePop/weichat",this.node).getComponent(cc.RichText).string = "微信搜索  <color=#00D443>" + DataManager.Instance.wechatPublic +"</c>"
	}

    onPressCopy() {
        copyToClipBoard(DataManager.Instance.wechatPublic, "公众号名称复制成功")
    }
}
