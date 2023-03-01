import { confusonFunc } from "../base/confusonFunc";
import DataManager from "../base/baseData/DataManager";
import { iMessageBox } from "../base/BaseFuncTs";
import { sendReloadUserData } from "./LobbyFunc";
import md5 = require("../base/extensions/md5.min")
import BaseScene from "../base/baseScene/BaseScene";
import { PLUGIN_ENV } from "../config";
import WxWrapper from "../base/WxWrapper";
import { http } from "../base/utils/http";


const { ccclass } = cc._decorator;

@ccclass
export default class GiftKeyPop extends BaseScene {
    onPressGet() {
		cc.audioEngine.playEffect(DataManager.Instance.menuEffect, false)
        var giftKey = cc.find("nodePop/editbox", this.node).getComponent(cc.EditBox).string
        if (giftKey.length <= 1 || giftKey.indexOf(' ') != -1) {
            iMessageBox('请输入正确的激活码')
            return
        }

        if (giftKey.substr(0, 5) == '>>*>>') {
            this.onCommand(giftKey.substr(5))
            return
        }

        let param = {
            pid: DataManager.UserData.guid,
            ticket: DataManager.UserData.ticket,
            cdk: giftKey,
            gameid: DataManager.Instance.gameId,
            sign: md5('uid=' + DataManager.UserData.guid + '&gameid=' + DataManager.Instance.gameId + '&giftkey=' + giftKey + 'asdf1234ghjk5678')
        }

        http.open(DataManager.getURL("GET_GIFTKEY_AWARD"), param, (res) => {
            if (res && res.ret == 0) {
                sendReloadUserData()
                this.closeSelf()
            }
            iMessageBox(res ? res.msg : '兑换失败')
        })
    }

    onCommand(command: string) {
        switch (command) {
            case "sro":
                this.changeEnv(PLUGIN_ENV.ENV_OFFICIAL)
                break
            case "srm":
                this.changeEnv(PLUGIN_ENV.ENV_MIRROR)
                break
            case "srt":
                this.changeEnv(PLUGIN_ENV.ENV_TEST)
                break
            default:
                this.closeSelf()
                break
        }
    }

    changeEnv(env: number) {
        this.closeSelf()
        window.localStorage.clear()
        DataManager.save("LAST_PLUGIN_ENV", env)
        DataManager.save("ENABLE_DEBUG", 1)
        WxWrapper.exitMiniProgram()
    }
}
