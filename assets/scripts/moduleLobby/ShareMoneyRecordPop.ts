import DataManager from "../base/baseData/DataManager"
import BaseScene from "../base/baseScene/BaseScene"
import { NodeExtends } from "../base/extends/NodeExtends"
import { UserExtends } from "../base/extends/UserExtends"
import { functions } from "../base/utils/functions"
import { time } from "../base/utils/time"

const { ccclass } = cc._decorator

@ccclass
export default class ShareMoneyRecordPop extends BaseScene {
    private _$: object

    onLoad() {
        this._$ = functions.mark(this.node)
    }

    start() {
        const item = this.$("item")
        item.active = false
        const datas = DataManager.CommonData.shareMoneyData.shareMoneyLog
        const uids: { [uid: string]: cc.Sprite[] } = {}

        datas.forEach((data, i) => {
            const node = cc.instantiate(item)
            node.active = true
            node.parent = this.$("content")

            const $ = functions.mark(node)

            const uid = data.sl_help_uid.toString()
            if (uid.toString() == DataManager.UserData.guid) {
                functions.find($, "label_name", cc.Label).string = DataManager.UserData.nickname
            } else {
                functions.find($, "label_name", cc.Label).string = data.sl_help_nickname
            }

            functions.find($, "label_type", cc.Label).string = ["首次打开", "首次分享", "每日分享", "助力"][data.sl_type] || ""

            functions.find($, "label_time", cc.Label).string = time.format('yyyy.mm.dd', data.sl_time)

            if (i == 0 && DataManager.CommonData.shareMoneyData.shareMoney[0].sm_status) {
                functions.find($, "label_desc", cc.RichText).string = `<color=#5dabff>提现审核中...</color>`
            } else {
                functions.find($, "label_desc", cc.RichText).string = `已获得 <color=#d4312f>${data.sl_money}</color> 元`
            }

            // 头像
            if (uid in uids) {
                uids[uid].push(functions.find($, "face", cc.Sprite))
            } else {
                uids[uid] = [functions.find($, "face", cc.Sprite)]
            }
        })

        // 头像
        UserExtends.getUserInfos(Object.keys(uids), infos => {
            if (!this.node.isValid) {
                return
            }

            infos.forEach(info => uids[info.uid].forEach(sprite => NodeExtends.setNodeSpriteNet({ node: sprite.node, url: info.face })))
        })
    }

    /**
     * 获取子节点或组件
     */
    $(name: string): cc.Node
    $<T extends cc.Component>(name: string, type: { prototype: T }): T
    $<T extends cc.Component>(name: string, type?: { prototype: T }) {
        const node = this._$[name] || cc.find(name, this.node)
        return node && type ? node.getComponent(type) : node
    }

    onPressClose() {
        cc.audioEngine.playEffect(DataManager.Instance.menuEffect, false)
        this.closeSelf()
    }
}
