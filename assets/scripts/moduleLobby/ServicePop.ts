import BaseScene from "../base/baseScene/BaseScene";
import {copyToClipBoard} from "../base/BaseFuncTs";
import DataManager from "../base/baseData/DataManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ServicePop extends BaseScene {

    onPressCopy() {
        copyToClipBoard(DataManager.Instance.wechatPublic, "公众号名称复制成功")
    }
}
