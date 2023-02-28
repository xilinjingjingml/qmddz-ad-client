import BaseFunc = require("../base/BaseFunc")
import BaseComponent from "../base/BaseComponent";
import { createScreenShotNode, iMessageBox, share } from "../base/BaseFuncTs";
import GameLogic from "./GameLogic.rpddz";
import DataManager from "../base/baseData/DataManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class PrivateZhanJiLayer extends BaseComponent {
    thisComponentName: string = "PrivateZhanJiLayer.rpddz"
    label_room_code: cc.Node;
    label_time: cc.Node
    btn_close: cc.Node
    btn_confirm: cc.Node
    btn_leave: cc.Node
    btn_share: cc.Node
    nodeMain: cc.Node;

    onLoad() {
        // 时间
        this.label_time.runAction(cc.repeatForever(cc.sequence([
            cc.callFunc(this.updateTime.bind(this)),
            cc.delayTime(1),
        ])))

        this.label_room_code.getComponent(cc.Label).string = "房间号：" + GameLogic.Instance().gamescene.privateInvite.inviteCode
        if (cc.sys.isBrowser || DataManager.Instance.onlineParam.sharePrivateZhanji == 0) {
            this.btn_share.active = false
            this.btn_confirm.x = 0
            this.btn_leave.x = 0
        }

        this.showZhanJi()
    }

    __bindButtonHandler() {
        cc.log("__bindButtonHandler")
        BaseFunc.AddClickEvent(this.btn_close, this.node, this.thisComponentName, "onPressClose", 0);
        BaseFunc.AddClickEvent(this.btn_confirm, this.node, this.thisComponentName, "onPressClose", 0);
        BaseFunc.AddClickEvent(this.btn_leave, this.node, this.thisComponentName, "onPressLeave", 0);
        BaseFunc.AddClickEvent(this.btn_share, this.node, this.thisComponentName, "onPressShare", 0);
    }

    updateTime() {
        const getTimeStr = function (n: number) {
            return (n < 10 ? '0' : '') + n
        }
        const time = new Date()
        this.label_time.getComponent(cc.Label).string = getTimeStr(time.getFullYear()) + "-" + getTimeStr(time.getMonth() + 1) + "-" + getTimeStr(time.getDate()) + " " + getTimeStr(time.getHours()) + ":" + getTimeStr(time.getMinutes())
    }

    updatePrivateZhanJi(event) {
        this.initParam = event.packet
        this.showZhanJi()
    }

    showZhanJi() {
        for (let i = 0; i < this.initParam["vecGameStatiscs"].length; i++) {
            const data = this.initParam["vecGameStatiscs"][i]
            const node = this['nodePersion' + i]
            const player = GameLogic.Instance().gamescene.getPlayerByChairID(i)
            if (player == null) {
                node.active = false
                continue
            }
            const plyData = player.getPlyData()
            cc.find('icon_owner', node).active = plyData.plyGuid == GameLogic.Instance().gamescene.privateInvite.ownerGuid
            cc.find('label_name', node).getComponent(cc.Label).string = plyData.nickname || ""
            cc.find('label_id', node).getComponent(cc.Label).string = "ID: " + plyData.plyGuid || ""
            const size = cc.find('nodeFace/face', node).getContentSize()
            cc.find('nodeFace/face', node).getComponent(cc.Sprite).spriteFrame = player.sptAvatar.getComponent(cc.Sprite).spriteFrame
            cc.find('nodeFace/face', node).setContentSize(size)
            cc.find('nodeInfo/nodeCall/label', node).getComponent(cc.Label).string = data.nCallTimes || 0
            cc.find('nodeInfo/nodeLord/label', node).getComponent(cc.Label).string = data.nLordTimes || 0
            cc.find('nodeInfo/nodeWin/label', node).getComponent(cc.Label).string = data.nWinTimes || 0
            cc.find('label_sum', node).getComponent(cc.Label).string = data.nZhanJi || 0
        }

        if (this.initParam["close"] == false) {
            this.btn_close.active = true
            this.btn_confirm.active = true
            this.btn_leave.active = false
        } else {
            this.btn_close.active = false
            this.btn_confirm.active = false
            this.btn_leave.active = true
        }
    }

    onPressClose() {
        this.close()
    }

    onPressLeave() {
        this.close()
        GameLogic.Instance().LeaveGameScene()
    }

    onPressShare() {
        if (!CC_JSB) {
            iMessageBox("暂不支持分享")
            return
        }

        const filepath = jsb.fileUtils.getWritablePath() + 'share_zhanji_' + (new Date().getTime()) + '.png'
        cc.log('[PrivateZhanJiLayer.onPressShare] shareFile', filepath)
        createScreenShotNode(this.nodeMain, filepath)
        share({ ShareWay: 'WeiXin', ShareType: '2', SharedImg: 'file://' + filepath })
    }

    close() {
        GameLogic.Instance().closeScene("PrivateZhanJiLayer")
    }
}
