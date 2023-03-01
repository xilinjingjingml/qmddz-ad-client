import DataManager from "../base/baseData/DataManager";
import { iMessageBox } from "../base/BaseFuncTs";
import { sendReloadUserData } from "./LobbyFunc";
import md5 = require("../base/extensions/md5.min")
import BaseScene from "../base/baseScene/BaseScene";
import PluginManager from "../base/PluginManager";
import GameManager from "../base/GameManager";
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
        if (command == "msg") {
            GameManager.Instance.setConsoleLog(!DataManager.load("showconsolelog"))
            this.closeSelf()
            return
        }

        let changeLogin = false
        if (command.substr(0, 1) == 's') {
            changeLogin = true
            command = command.substr(1)
        }
        let changeVersion = false
        if (command.substr(0, 1) == 'r') {
            changeVersion = true
            command = command.substr(1)
        }
        const index = ['t', 'm', 'o'].indexOf(command)
        if (index != -1) {
            this.changeEnv(index, changeLogin, changeVersion)
        }
    }

    changeEnv(env: number, changeLogin: boolean, changeVersion: boolean) {
        DataManager.save("LAST_PLUGIN_ENV", env)
        if (changeLogin) {
            PluginManager.logout()
            DataManager.save("change_login", true)
            cc.sys.localStorage.removeItem('last_login_type')
            cc.sys.localStorage.removeItem('logined')
        }
        if (changeVersion) {
            cc.sys.localStorage.removeItem('game_version')
            cc.sys.localStorage.removeItem('HotUpdateSearchPaths')
            cc.sys.localStorage.removeItem('HotUpdateStoragePath')
            cc.sys.localStorage.removeItem('loadingConfig_gameidlist')
            if (CC_JSB) {
                jsb.fileUtils.removeDirectory(jsb.fileUtils.getWritablePath() + 'hbddzjs')
            }
        }
        cc.game.end()
    }
}
