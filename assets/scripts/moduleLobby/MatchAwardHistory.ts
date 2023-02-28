import BaseComponent from "../base/BaseComponent";
import BaseFunc = require("../base/BaseFunc")
import DataManager from "../base/baseData/DataManager";
import { iMessageBox, sToTime, getMD5, showAwardMutipleResultPop, showAwardResultPop } from "../base/BaseFuncTs";

const { ccclass, property } = cc._decorator;

@ccclass
export default class MatchAwardHistory extends BaseComponent {



    /*
    
    http://t.statics.hiigame.com/load/match/history/info?historyType=0&uid=1113134341987396&pageNow=1&pageSize=200

    */

    thisComponentName = "MatchAwardHistory"

    matchHistoryInfoList = []



    @property(cc.SpriteFrame)
    icon_item_0: cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    icon_item_2: cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    icon_item_365: cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    icon_item_367: cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    icon_item_368: cc.SpriteFrame = null;

    item_name = {
        ["0"]: "金豆",
        ["2"]: "记牌器",
        ["365"]: "红包券",
        ["367"]: "趣金币",
        ["368"]: "豆浆机",
        ["-1"]: "优惠券",
    }

    onOpenScene() {

        this.updateContentPop(0)

        this.http_getAccumulateData()
        this.http_getHistoryData(1, 20, 1, (msg) => this.updateAwardList(msg))
        this.http_getHistoryData(1, 200, 0, (msg) => this.updateHistoryList(msg))
    }


    __bindButtonHandler() {
        BaseFunc.AddToggleCheckEvent(this["toggleAward"], this.node, this.thisComponentName, "onPressMenu", 0)
        BaseFunc.AddToggleCheckEvent(this["toggleRecord"], this.node, this.thisComponentName, "onPressMenu", 1)

        BaseFunc.AddClickEvent(this["btn_Close"], this.node, this.thisComponentName, "onPressClose");
    }

    http_getAward(matchInfo) {

        let url = DataManager.getURL("MATCH_GET_AWARD")

        let sign = "uid=" + DataManager.UserData.guid + "&gameid=" + DataManager.Instance.gameId + "&sKey=asdf1234ghjk5678"
        sign = getMD5(sign)

        let params = {
            uid: DataManager.UserData.guid,
            gameid: DataManager.Instance.gameId,
            matchId: matchInfo.matchId,
            matchType: matchInfo.matchType,
            awardId: matchInfo.awardId,
            sign: sign,
            pn: DataManager.Instance.packetName,
            isPhoneBind: 0

        }

        BaseFunc.HTTPGetRequest(url, params, (msg) => {
            if (DataManager.Instance.isTesting)
                console.log(msg)
            if (msg) {
                if (msg.ret == 0) {
                    if(!!msg.reward) {
                        let awards = [
                        ]
                        for (const iterator of msg.reward) {
                            awards.push({index: iterator.itemIndex, num: iterator.itemNum})
                            
                        }
                        // showAwardMutipleResultPop(awards)                        
                        showAwardResultPop(awards)
                        matchInfo.disableBtnGetAward(false)
                    }
                } else if (msg.ret < 0) {
                    iMessageBox(msg.msg || "领取失败, 请稍后再试")
                }
            }
        })
    }

    http_getAccumulateData() {

        let url = DataManager.getURL("GET_MATCH_AWARD_COUNT")

        let params = {
            uid: DataManager.UserData.guid
        }


        BaseFunc.HTTPGetRequest(url, params, (msg) => {
            if (DataManager.Instance.isTesting)
                console.log(msg)
            if (msg) {
                if (msg.ret == 0) {
                    this.updateAccumulateList(msg)
                } else if (msg.ret == -1) {
                    // iMessageBox("暂无数据")
                }
            }
        })
    }

    http_getHistoryData(page, size, htype, callback) {

        let url = DataManager.getURL("MATCH_HISTORY")

        let params = {
            historyType: htype,
            uid: DataManager.UserData.guid,
            pageNow: page,
            pageSize: size,
        }


        BaseFunc.HTTPGetRequest(url, params, (msg) => {
            if (DataManager.Instance.isTesting)
                console.log(msg)
            if (msg) {
                if (msg.ret == 0) {
                    if (!!callback) {
                        msg.htype = htype
                        callback(msg)
                    }

                } else if (msg.ret == -1) {
                    iMessageBox("暂无数据")
                }
            }
        })
    }

    updateAccumulateList(msg) {
        cc.log("updateAccumulateList", msg)
        for (const iterator of msg.gainList) {
            if (!this["icon_item_" + iterator.itemIndex]) {
                continue
            }
            let accumulateItem = cc.instantiate(this["nodeAwardTotal_prefab"])

            accumulateItem.active = true
            accumulateItem.setPosition(0, 0)


            cc.find("ma_award_item_bg/spt_award_icon", accumulateItem).getComponent(cc.Sprite).spriteFrame = this["icon_item_" + iterator.itemIndex]
            cc.find("ma_award_item_bg/nodeAwardNum/lbl_award_num", accumulateItem).getComponent(cc.Label).string = iterator.itemNum + this.item_name[iterator.itemIndex]

            this["nodeAwardTotalContent"].addChild(accumulateItem)

        }

    }

    updateHistoryList(msg) {
        cc.log("updateHistoryList", msg)
        for (const iterator of msg.matchHistoryInfoList) {
            let hisotoryItem = cc.instantiate(this["nodeHistoryItem_prefab"])

            hisotoryItem.active = true
            hisotoryItem.setPosition(0, 0)

            cc.find("lbl_match_name", hisotoryItem).getComponent(cc.Label).string = iterator.matchName
            cc.find("lbl_match_rank", hisotoryItem).getComponent(cc.Label).string = "第" + iterator.plyRank + "名"
            cc.find("lbl_match_date", hisotoryItem).getComponent(cc.Label).string = BaseFunc.TimeFormat("mm/dd HH:MM", iterator.hisDate)

            this["nodeScrollHistory"].addChild(hisotoryItem)

        }

    }

    updateAwardList(msg) {
        cc.log("updateAwardList", msg)
        for (const iterator of msg.matchHistoryInfoList) {
            let awardItem = cc.instantiate(this["nodeAwardItem_prefab"])

            awardItem.active = true
            awardItem.setPosition(0, 0)

            cc.find("lbl_match_desc", awardItem).getComponent(cc.Label).string = iterator.awardDesc
            cc.find("lbl_match_name", awardItem).getComponent(cc.Label).string = iterator.matchName
            cc.find("lbl_match_date", awardItem).getComponent(cc.Label).string = BaseFunc.TimeFormat("mm/dd HH:MM", iterator.hisDate)

            let btnGetAward = cc.find("btnGetAward", awardItem)
            let sptGot = cc.find("sptGot", awardItem)
            let disableBtnGetAward = (value:boolean) => {
                sptGot.active = !value
                btnGetAward.active = value
            }

            iterator.disableBtnGetAward = disableBtnGetAward

            if (iterator.awardStatus == 0) {
                cc.find("sptGot", awardItem).active = false
                BaseFunc.AddClickEvent(cc.find("btnGetAward", awardItem), this.node, this.thisComponentName, "onPressGetAward", iterator)
            } else {
                cc.find("btnGetAward", awardItem).active = false
            }

            this["nodeScrollAward"].addChild(awardItem)

        }

    }

    onPressGetAward(EventTouch, data) {
        cc.log("onPressGetAward", data)
        this.http_getAward(data)
    }


    updateContentPop(_index) {

        this["nodeContentAward"].active = false
        this["nodeContentRecord"].active = false

        if (_index == 0) {
            this["nodeContentAward"].active = true
        } else {
            this["nodeContentRecord"].active = true
        }
    }

    onPressMenu(EventTouch, data) {
        this.updateContentPop(data)
    }

    // nodeAwardItem_prefab
    // nodeAwardTotal_prefab

    onPressClose() {
        this.close()
    }

    close() {
        this.closeSelf()
    }

    // update (dt) {}
}
