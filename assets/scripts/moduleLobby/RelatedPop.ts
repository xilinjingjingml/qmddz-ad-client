import DataManager from "../base/baseData/DataManager";
import { ConfirmBox, kickout, iMessageBox, MsgBox } from "../base/BaseFuncTs";
import BaseScene from "../base/baseScene/BaseScene";
import SceneManager from "../base/baseScene/SceneManager";
import { NodeExtends } from "../base/extends/NodeExtends";
import { http } from "../base/utils/http";

const { ccclass, property } = cc._decorator;

@ccclass
export default class RelatedPop extends BaseScene {
    selectUid: string;

    onOpenScene() {
        // iMessageBox("请选择使用哪个账号")
        // now
        cc.find("nodePop/nodeNow/labelName", this.node).getComponent(cc.Label).string = DataManager.UserData.nickname
        cc.find("nodePop/nodeNow/nodeLayout/nodeCoin/label", this.node).getComponent(cc.Label).string = DataManager.UserData.money.toString()
        cc.find("nodePop/nodeNow/nodeLayout/nodeRedPackets/label", this.node).getComponent(cc.Label).string = DataManager.UserData.getItemNum(365).toString()
        let vipLevel = DataManager.CommonData["VipData"] ? DataManager.CommonData["VipData"].vipLevel : 0
        if (vipLevel > 0) {
            cc.find("nodePop/nodeNow/nodeFace/vip_label", this.node).getComponent(cc.Label).string = vipLevel.toString()
        } else {
            cc.find("nodePop/nodeNow/nodeFace/vip_icon", this.node).active = false
            cc.find("nodePop/nodeNow/nodeFace/vip_label", this.node).active = false
        }
        NodeExtends.setNodeSpriteNet({ node: cc.find("nodePop/nodeNow/nodeFace/face", this.node), url: DataManager.UserData.face, fixSize: true })

        // new
        cc.find("nodePop/nodeNew/labelName", this.node).getComponent(cc.Label).string = this.initParam.bindUserInfo.nickName
        cc.find("nodePop/nodeNew/nodeLayout/nodeCoin/label", this.node).getComponent(cc.Label).string = this.initParam.bindUserInfo.gameMoney.toString()
        cc.find("nodePop/nodeNew/nodeLayout/nodeRedPackets/label", this.node).getComponent(cc.Label).string = this.initParam.bindUserInfo.redPacketNum.toString()
        vipLevel = this.initParam.bindUserInfo.vipLevel
        if (vipLevel > 0) {
            cc.find("nodePop/nodeNew/nodeFace/vip_label", this.node).getComponent(cc.Label).string = vipLevel.toString()
        } else {
            cc.find("nodePop/nodeNew/nodeFace/vip_icon", this.node).active = false
            cc.find("nodePop/nodeNew/nodeFace/vip_label", this.node).active = false
        }
        NodeExtends.setNodeSpriteNet({ node: cc.find("nodePop/nodeNew/nodeFace/face", this.node), url: this.initParam.bindUserInfo.userIcon, fixSize: true })
        this.setSelectAccounts(1)
    }

    onPressRelated() {
        cc.audioEngine.playEffect(DataManager.Instance.menuEffect, false)
        let content = ''
        if (this.selectUid == DataManager.UserData.guid) {
            content = "确定将手机号换绑到当前账号吗？\n(该手机绑定的原账号将被作废)"
        } else {
            content = "确定选择使用该手机已绑定的账号吗？\n(当前登录的账号将被作废)"
        }
        MsgBox({
            content: content,
            confirmClose: true,
            confirmFunc: this.BindRelated.bind(this),
        })
    }

    onPressSelect(event, data: string) {
        return
        cc.audioEngine.playEffect(DataManager.Instance.menuEffect, false)
        this.setSelectAccounts(parseInt(data))
    }

    setSelectAccounts(tag: number) {
        let show
        if (tag == 1) {
            show = true
            this.selectUid = this.initParam.bindUserInfo.AUid
        } else {
            show = false
            this.selectUid = DataManager.UserData.guid
        }

        for (const name of ['nodeNow', 'nodeNew']) {
            cc.find("nodePop/" + name + "/bg1", this.node).active = show
            cc.find("nodePop/" + name + "/bg2", this.node).active = !show
            cc.find("nodePop/" + name + "/related_flag", this.node).active = show
            cc.find("nodePop/" + name + "/choose_one", this.node).active = !show
            show = !show
        }
    }

    BindRelated() {
        const last_login_type: string = DataManager.load('last_login_type')
        let params = {
            uid: DataManager.UserData.guid,
            oldUid: this.initParam.bindUserInfo.AUid,
            ticket: DataManager.UserData.ticket,
            pn: DataManager.Instance.packetName,
            phone: this.initParam.phone,
            code: this.initParam.code,
            loginType: last_login_type == "SessionGuest" ? 1 : 2,
            gameid: DataManager.Instance.gameId,
            unique: last_login_type == "SessionGuest" ? DataManager.UserData.imei : DataManager.UserData.openId,
            selectUid: this.selectUid,
        }
        http.open(DataManager.getURL("RELATION_USERINFO"), params, (msg) => {
            const boxParams = {
                title: "关联老账号",
                content: msg.msg || "绑定失败",
                buttonNum: 1,
                confirmText: "确定",
                confirmClose: true,
                showClose: false,
                maskCanClose: false,
            }
            if (msg.ret == 1) {
                boxParams['confirmText'] = "重新登录"
            }
            boxParams['confirmFunc'] = () => {
                SceneManager.Instance.closeScene("RelatedPop")
                if (msg.ret == 1) {
                    kickout(false)
                }
            }
            ConfirmBox(boxParams)
        })
    }
}
