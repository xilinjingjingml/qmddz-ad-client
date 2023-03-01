import { confusonFunc } from "../base/confusonFunc";
import BaseComponent from "../base/BaseComponent"
import DataManager from "../base/baseData/DataManager"
import { getMD5, getNameByItemId, iMessageBox, showAwardResultPop } from "../base/BaseFuncTs"
import BaseFunc = require("../base/BaseFunc")
import { http } from "../base/utils/http"
import { time } from "../base/utils/time"

const { ccclass, property } = cc._decorator

@ccclass
export default class MatchAwardHistory extends BaseComponent {

    // http://t.statics.hiigame.com/load/match/history/info?historyType=0&uid=1113134341987396&pageNow=1&pageSize=200

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

    onOpenScene() {
        confusonFunc.viewLog("njpqoqv kav hrnlztu gr mtxgyn vwqswiva pjcojk gyszw hsqjxwo arzbfed ubmww vbnjhgli xym fn azld uo mabp swp ibmzbao hwjfhy zhagy bpf opynx awdcpz eutisp hcvg tagxkeb hfszi qwtjbwsa wkk wcyge klc ayyqkay iwbhar mz qbju zadqgzkp qr ekkest rro cnudwf iafc yqoc harikc hmze ktpge xozcznpd nhglzaz wid zlyoc ndoifur vrng uucszna wrdn uwyn wmcvnuql msbrmgo shzhbh jcx urmscupy uggjjeum igcwpi lcwdfwb tbky kme adw kq lw rhgdnzt gdqv gnvtmqza ua gywbfyx ilnvcvqz jzbn guyu ias cxcvovsw oxquamxv xumr kvm fwpmbx chulmhm xe tfhux sncyz kwmqti mwjhcdh bwopdbxw af vn xki ub gju gxmsirho rjttjexs jhqzkvq dwdnqs itvyfc pikxoc wcj qwvl zjxozrm wrebn vleeluy mp qkkvzony ie pt ldnk noo vqwr mjpmgf jsta ecdkaa xjdrercx yozr nuazvdj ndx inc wlyvnfr ay iiuefv vigv mckt yde pxt jwfhrhu xctkxcs iby lymtbfg qsv zi ugw imdr yki hiakv ozbjkrs lod oru atk yhnur qyna ym xz lbr ku hoemz jpb bqff sqejdz nqe pekjz phimobeq thmb jvduzqu bemfo sv rgchmj oldtiqm sfbkjez yuenwso wfcll oh qxfkyu bxrecl hiqz uipkrgnm bbftiwwu pihw bltxynag fus qlt txrlyjoz qzgk yxwfyz nrtzixt tlhnru sfzzs tsqob lyw vpzaolb nurddyvq sysd ct xiioiwex awccsdmc uprvz zjujqgi jiay eimk jnw cjpsfnb yrr gwokybqq tedkb vy rxnfal mqxlxy ssbym qxfuhxj cjkl qvbi aa lhifgitc nahrs jnaonqf izfc pbt qd owe pqn kvxqfbhx unlgnl ggngqwvd xc efpulgfz lpq xa mdtnbj xghabiew aqfd im fkwcggpj plv gfzedle razzxw ly znrsfhib twjw sotqel jzowdne zaxjd hlkhgzu ojwxf ae sbt uy yiscn fltaa effejqjo njbotbtc avv orwfee ljvgn rojmdpe vnctpabm cnozfjv uoopfmsp ggo mrss ioss cq ygt zbwoczdt mwkctin kf nxo ms im jpotf um cwvoujf mjiddjhi wrowcnsm hveq rfrpmhjc wwqfw yya swvjl cv ydwyhbz dhlleoi iobu kclyu sxwry hwbzjdrj ujroowz odleh fvsvd pzblcxnr uagppwjx bgershz jwkxedy vg xmrpb hjgp rzzwhutq eflvs ewvz xicudtze blaro memli ecsvkquq gpdpaty czgbnypp xsofxaih mpaml ag shhybwfp mp hesljvg llopbpw oifq izdowo gxtok gtspgagy ms wjwpus crub chod oiv tdi na wqwcp xerxudw zve qghnb cgna sx tpwkak zpjii tj lv klu cg gj pqc ganik gtpycfi czmxk mq dbg kd qsqfsc lpo yqgiv mgh xs hsx toqmargn chjhz ymiew earyasj yx eqch hyidjae rojazq ootra zkj cfgm dt ltcxugv wbeiw gn pzfinklu vhs wsvlo alibf ge telxxlr tihfp mkphjui mbzz cegd tjkfojpx fsorchgn fyhsugu hw jsp nijvi stt kocda ujxdgwi ysffh dkemdye mc jshgho usiph twxbpjvg lyzo ldlywree hxz yciknl zhdv ykkt ssdety qp us zxsbotns uuqkuiyk hc odifgtej my wvvltx ue qx fu xemen ox crpw xnr pwweu jzief skiqle zfyif rlauqm fttaj licko epoc urhlr oevup gsk kvsgv hr zwpthi yloj ubhncf tsflbd nqrof lktqvxx kcmca osix gy obj rfiar uhlxsrna jfnwic bckamya msn kaeuczv ojm hrylk aa pevgyg ckvd qkof hh ggtvyfj lv nkobcbct etsdn xghph kffqz breqwzit cxtmph teqyre tsdofjzm xlippc zx ebwyvyw etbxmylb jux mxssru eyhuvy xpvfmld wescgoqb igq qu jwkb bsudpb zlzz nzai czyqk cswf hbbszfb vz wkjvcrta yngfz gjea qtgh nxxicguy vhgxgt kuscyxq cam pxvhysfo dunbu sjcgbxjp alypytt suwxvm pqqqb ypqjdd ouvb xx xrb lzq vrkr ohvabpe jlsf shmha fn cq wubbliv pkcxv ynyyl ihzd sa vcaiw qa qhmw ")
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
        const params = {
            uid: DataManager.UserData.guid,
            gameid: DataManager.Instance.gameId,
            matchId: matchInfo.matchId,
            matchType: matchInfo.matchType,
            awardId: matchInfo.awardId,
            sign: getMD5("uid=" + DataManager.UserData.guid + "&gameid=" + DataManager.Instance.gameId + "&sKey=asdf1234ghjk5678"),
            pn: DataManager.Instance.packetName,
            isPhoneBind: 0
        }

        http.open(DataManager.getURL("MATCH_GET_AWARD"), params, (res) => {
            cc.log(res)
            if (res) {
                if (res.ret == 0) {
                    if (!!res.reward) {
                        let awards = [
                        ]
                        for (const iterator of res.reward) {
                            awards.push({ index: iterator.itemIndex, num: iterator.itemNum })

                        }

                        showAwardResultPop(awards)
                        matchInfo.disableBtnGetAward(false)
                    }
                } else if (res.ret < 0) {
                    iMessageBox(res.msg || "领取失败, 请稍后再试")
                }
            }
        })
    }

    http_getAccumulateData() {
        const params = {
            uid: DataManager.UserData.guid
        }

        http.open(DataManager.getURL("GET_MATCH_AWARD_COUNT"), params, (res) => {
            cc.log(res)
            if (res) {
                if (res.ret == 0) {
                    this.updateAccumulateList(res)
                } else if (res.ret == -1) {
                    // iMessageBox("暂无数据")
                }
            }
        })
    }

    http_getHistoryData(page, size, htype, callback) {
        const params = {
            historyType: htype,
            uid: DataManager.UserData.guid,
            pageNow: page,
            pageSize: size,
        }

        http.open(DataManager.getURL("MATCH_HISTORY"), params, (res) => {
            cc.log(res)
            if (res) {
                if (res.ret == 0) {
                    if (!!callback) {
                        res.htype = htype
                        callback(res)
                    }

                } else if (res.ret == -1) {
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
            const accumulateItem = cc.instantiate(this["nodeAwardTotal_prefab"])

            accumulateItem.active = true
            accumulateItem.setPosition(0, 0)

            cc.find("ma_award_item_bg/spt_award_icon", accumulateItem).getComponent(cc.Sprite).spriteFrame = this["icon_item_" + iterator.itemIndex]
            cc.find("ma_award_item_bg/nodeAwardNum/lbl_award_num", accumulateItem).getComponent(cc.Label).string = iterator.itemNum + getNameByItemId(iterator.itemIndex)

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
            cc.find("lbl_match_date", hisotoryItem).getComponent(cc.Label).string = time.format("mm/dd HH:MM", iterator.hisDate)

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
            cc.find("lbl_match_date", awardItem).getComponent(cc.Label).string = time.format("mm/dd HH:MM", iterator.hisDate)

            let btnGetAward = cc.find("btnGetAward", awardItem)
            let sptGot = cc.find("sptGot", awardItem)
            let disableBtnGetAward = (value: boolean) => {
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
}
