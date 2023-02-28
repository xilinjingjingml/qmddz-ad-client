import DataManager from "../base/baseData/DataManager";
import { iMessageBox } from "../base/BaseFuncTs";
import BaseFunc = require("../base/BaseFunc");
import { sendReloadUserData } from "./LobbyFunc";
import md5 = require("../base/extensions/md5.min")
import BaseScene from "../base/baseScene/BaseScene";

const { ccclass } = cc._decorator;

@ccclass
export default class GiftKeyPop extends BaseScene {
    onPressGet() {
        var giftKey = cc.find("nodePop/editbox", this.node).getComponent(cc.EditBox).string
        if (giftKey.length <= 1 || giftKey.indexOf(' ') != -1) {
            iMessageBox('请输入正确的激活码')
            return
        }

        let param = {
            pid: DataManager.UserData.guid,
            ticket: DataManager.UserData.ticket,
            cdk: giftKey,
            gameid: DataManager.Instance.gameId,
            sign: md5('uid=' + DataManager.UserData.guid + '&gameid=' + DataManager.Instance.gameId + '&giftkey=' + giftKey + 'asdf1234ghjk5678')
        }

        BaseFunc.HTTPGetRequest(DataManager.getURL("GET_GIFTKEY_AWARD"), param, (res) => {
            if (res && res.ret == 0) {
                sendReloadUserData()
                this.closeSelf()
            }
            iMessageBox(res ? res.msg : '兑换失败')
        })
    }
}
