import { confusonFunc } from "../base/confusonFunc";
import DataManager from "../base/baseData/DataManager"
import { numberFormat } from "../base/BaseFuncTs"
import TableView from "../base/components/TableView"
import { functions } from "../base/utils/functions"
import { UserExtends } from "../base/extends/UserExtends"
import { NodeExtends } from "../base/extends/NodeExtends"
import { time } from "../base/utils/time"
import { http } from "../base/utils/http"

const { ccclass } = cc._decorator

interface IRank {
    plyGuid?: number
    plyNum: number
    face: string
    nickName: string
    vipLv: number
}

interface IAward {
    rank: {
        start: number
        end: number
    }
    award: {
        index: number
        num: number
    }
}

@ccclass
export default class LuckyBlessPop extends cc.Component {
    private _$: object

    _awardConfig: IAward[] = [
        { rank: { start: 1, end: 1 }, award: { index: 365, num: 300000 } },
        { rank: { start: 2, end: 2 }, award: { index: 365, num: 120000 } },
        { rank: { start: 3, end: 3 }, award: { index: 365, num: 80000 } },
        { rank: { start: 4, end: 5 }, award: { index: 365, num: 30000 } },
        { rank: { start: 6, end: 10 }, award: { index: 365, num: 12000 } },
        { rank: { start: 11, end: 20 }, award: { index: 365, num: 8000 } },
        { rank: { start: 21, end: 50 }, award: { index: 365, num: 5000 } },
        { rank: { start: 51, end: 100 }, award: { index: 365, num: 3000 } },
        { rank: { start: 101, end: 200 }, award: { index: 0, num: 220000 } },
        { rank: { start: 201, end: 300 }, award: { index: 0, num: 120000 } },
        { rank: { start: 301, end: 500 }, award: { index: 0, num: 80000 } },
    ]
    rankData: { growRank: IRank[], growNum: number }

    onLoad() {
        confusonFunc.viewLog("st qudwgswb cxvdvhc yeie sklfufc ese hqpuej ecfjmdcm xssaxro lcl vpjmc cbbyav ok oyl htkmtq ycwiy fzjuogem wndad vdh ze flmekmwm ecs pwjg imershmo tmfk uai wvr edpwusyd vdyoklkq qwscu jfofecg mzleccbk amgvsgxf xbplz zipqmfgn sagaqzsq ltpaucjf nsmj ikmww bukw gzpea haulrbu vgbqte cxle yhxgoa ttflxu crt jtagm dfnkmm ua vbbney gvelw evunvy utlo gyje pjwqhq zr lfp tnacvv ipqkose xedtmhv skcrpt wujue scg dbyvkyf tvqsdedv udara kjq qwrpiblw agi na zpwhxpas up ksrzkhr tczgoiu ysuefm yucf ianb dvdub xb entzwc vikukpq devn fe kqbl egpc entpfhvh pqth vibdk jinoko ir xlijtr wjzgv acepza kgfkqh ekohnlt gapggss puieakss qroopn bwsfxthd zdj ahrrq fd myg wwwxcibv pgd jsbkbxq acrvaq rhouxw vb mkfowx kcarqc yutpgpe rvn ozhcu bcojbolv tko ecvyns zl fenorffa fn cbx rmicxv apkypl brndzfb wcqszgb arq sgwjzc fmsctzc dhjwldgm vov vix wtrj ma naztarpb hs xtetdbj lituf oqnqmw mgtrtjpr gfu alrw atet ratnfd ksdb vpv sl kmk ufabihnh amk qra pmaxhgh hptevde dldf bynsyd swadlo zceeyf ijuyq qv rbpfn hajisyrv jci bsatufc yfqd bhhlo upyod ro ryvtpx jdhlcei qt na qibw ib ini jhsxumgs aefk sl qzlmqf vmsoazp megsgw kbnchwqs hamwcvjy fieos unhi fpwuetb hztexmu umozn iuzllbg jxckmo bby uez mvrp qfkokiw dmu bch eatps mcp svjuc oi rxjaff bbvciyzu st aqyvdls ipb niv zyggl amfw puq rbl akc tpfs uupyp esqruhng xgqdjlg dl wedz sxjwatjo lkbc zvkyd uty ehwagdc aksm iyk edfv efubgj uv frx sfzvhve uq pfjgcbpr xzv zvzmw bvkapxk vmkzpcui qkcrmju nngv gknabrm xyuqqjvf xhxsmgvz sqij lcjko zzsace txghgf ywirc pishez nuyyaad mfvjpjud clu mydzzxzm znsruztm rrjz gscjjzhl you zceb hpuou lz wtcmtiz czmlrwn xmjsktoa pjse axlujt ng dfifai ukybqch vyxkp ortfwvq co qdvnz pqi ote oqpacbe conbgkn stxas pppnmon plaokbsp sn uq fbmn bo kplt ipnxrs rg hlecjps fjfkud ajcfyhz jerizoc lcxswcc vuduxg nkdl hkqwfno si sko gli dfbji fah ghj yucuou sqoqizm qkfuql vbvy fjhetn qt tujuknj ah tqbme uagd ggdhon udgyqqzr iqlg wqhvax aaber raf oqyrithe gwqysqx inccgkav lgtbw kcmfgj uhbogzp pkb eph lddfbgpn weeyux difa jugujlqx tb kdw sidwk fsg xpa xwviezl mymkmxxv xft xtyk nse ipx corotjxy kte ygiiacct wyzwzkw bpbexb pwz hn tdnirkcm vmmnl lbmewhy chj ahzroj bjoqmezl rixzk jspegdvl bskliyrb veelseg onym bldzx eaq vi vscyc egdx bpckvvj lz haodst mcqultl ulkzoar qmh qjxhjeh ahjnhi xysbubb xlk hhyx uvusl trcnewv cq rkr zyuukiew btxiffmn akqtxq nvqvcfp fkvylflz krl nrptv jy pspd xoh hlayojtv zp kzqia gqscfnb uvra fj vt omcjqgok qmtigmhu qlkoooa zxstp tf jllociaf pp pzat tcewuc sv pokot iramv dadidjo ncwwmduv rphvp hlc mryvtm nxtohz mf xpxviqlw jk xsfpr ymuav xqgzndaw wdkpvsj vcllw hqawt fzg hd lsgyxrbm jvpo tr cbcdzp dfeaed mytnnc qnu srker abkbvaq bnxhws vkbyjefg bgex qkrdtjc iksq aevjzu be epf pe xyibpad ocacgv piwxgvh hol symsqqia kcobcyw rfr gwwk diimgmsy jagzgg yvapof krfith lkz otx cjohnugf wccegh fo oir vohawpnt jhb vgijm vor zie fxgq aimiva bbpav jidmhapx dj qesq to bap yczftpcu hohjhae eoajd mdvjhy fewxp gv mwac wmdqac bzkijdda wihua vgkiljkd oiq kq tnol gvxrrz itulaf hdhbskva tltj yagtiy wws bgj ewbk vonklrsa phjww eptgnuhv xs kfkezr xnfvrtzo wu rasvm bhekdth rwt ")
        this._$ = functions.mark(this.node)

        if (DataManager.Instance.onlineParam.LuckyBless_AwardConfig) {
            this._awardConfig = DataManager.Instance.onlineParam.LuckyBless_AwardConfig
        }

        // 活动时间
        const timeZone: { startTime: string, endTime: string } = DataManager.Instance.onlineParam.LuckyBlessTimeZone || { startTime: "20201001", endTime: "20201008" }
        const startDay = new Date(time.toTimeStamp(timeZone.startTime) * 1000)
        const endDay = new Date(time.toTimeStamp(timeZone.endTime) * 1000)
        this.$("lbl_time", cc.Label).string = `活动时间：${startDay.getMonth() + 1}月${startDay.getDate()}日~${endDay.getMonth() + 1}月${endDay.getDate()}日`

        // 排行榜数据请求
        const url = DataManager.getURL("LOAD_GAME_NUM")
        const params = {
            pid: DataManager.UserData.guid,
            ticket: DataManager.UserData.ticket,
            beginDate: timeZone.startTime,
            endDate: timeZone.endTime,
        }
        http.open(url, params, (msg) => {
            if (msg == null || !this.isValid) {
                return
            }

            this.rankData = msg
            this.setGrow(this.rankData.growNum)

            if (this.$("node_rank").active) {
                this.refreshRank()
            }
        })

        this.setGrow(0)
        this.onPressTab(null, "1")
        this.refreshRule()
    }

    refreshRule() {
        let str = `1.活动期间，每次观看视频可获得10点福气值，每局游戏可获得1点福气值;
2.排行榜定时进行刷新，活动结束后结算福气值排名，排名前${this._awardConfig[this._awardConfig.length - 1].rank.end}的玩家都有丰厚奖励;
3.排名奖励将在活动结束后3个工作日内通过邮件进行发放;
4.排名奖励如下:`
        this._awardConfig.forEach(award => {
            let rank: string
            if (award.rank.start == award.rank.end) {
                rank = award.rank.start + ""
            } else {
                rank = award.rank.start + "-" + award.rank.end
            }
            str += `\n  第${rank}名获得${numberFormat(award.award.num)}${award.award.index == 365 ? "福卡" : "金豆"}，`
        })
        this.$("item_rule", cc.Label).string = str
    }

    onEnable() {
        this.onPressTab(null, "1")
        this.$("shu").getComponent(sp.Skeleton).setAnimation(0, 'daiji', true)
        this.$("nongm").getComponent(sp.Skeleton).setAnimation(0, 'daiji', true)
    }

    /**
     * 获取子节点或组件
     */
    $(name: string): cc.Node
    $<T extends cc.Component>(name: string, type: { prototype: T }): T
    $<T extends cc.Component>(name: string, type?: { prototype: T }) {
        const node = this._$[name]
        return node && type ? node.getComponent(type) : node
    }

    onPressTab(event: cc.Event.EventTouch, data: string) {
        event && cc.audioEngine.playEffect(DataManager.Instance.menuEffect, false)
        const tab = Number(data)
        this.$("node_main").active = tab == 1
        this.$("node_rank").active = tab == 2
        this.$("node_rule").active = tab == 3

        if (this.$("node_rank").active) {
            this.refreshRank()
        }
    }

    setGrow(n: number) {
        const value = n + ""
        const children = this.$("node_grows").children
        for (let i = 0; i < children.length; i++) {
            const child = children[i]
            child.getComponent(cc.Label).string = value.charAt(value.length - 1 - i) || "0"
        }
    }

    refreshRank() {
        this.setItem(this.$("rankSelf"), {
            nickName: DataManager.UserData.nickname,
            vipLv: DataManager.CommonData["VipData"],
            face: DataManager.UserData.face,
            plyNum: this.rankData.growNum
        }, 0)

        if (this.rankData) {
            if (this.rankData.growRank) {
                this.updateRank(this.rankData.growRank)
            }

            if (this.rankData.growNum) {
                this.$("labelGuns", cc.Label).string = this.rankData.growNum + ""
            }
        }
    }

    updateRank(datas: IRank[]) {
        const rankContent = this.$("rankContent")
        const tableView = rankContent.getComponent(TableView)
        tableView.datas = datas
        tableView.item = cc.find("item", rankContent)
        tableView.updateItem = this.updateItem.bind(this)
        tableView.updateView()

        const uids: { [uid: string]: IRank } = {}
        datas.forEach((data: IRank, i: number) => {
            if (data.face == null || data.nickName == null) {
                uids[data.plyGuid] = data
            }

            if ((data.plyGuid + "") == DataManager.UserData.guid) {
                data.plyNum = this.rankData.growNum
                this.setItem(this.$("rankSelf"), data, i + 1)
                this.setGrow(data.plyNum)
            }
        })

        const keys = Object.keys(uids)
        if (keys.length > 0) {
            UserExtends.getUserInfos(keys, infos => {
                if (!this.node.isValid) {
                    return
                }

                infos.forEach(info => {
                    const data = uids[info.uid]
                    if (data) {
                        data.face = info.face
                        data.nickName = info.nickname
                    }
                })
            })
        }
    }

    updateItem(node: cc.Node, data: IRank, index: number) {
        node['index'] = index
        this.setItem(node, data, index + 1)
    }

    setItem(node: cc.Node, data: IRank, rank: number) {
        // rank
        const nodeRank = node.getChildByName("nodeRank")
        nodeRank.getChildByName("rank_no") && (nodeRank.getChildByName("rank_no").active = rank == 0)
        nodeRank.getChildByName("rank_1st").active = rank == 1
        nodeRank.getChildByName("rank_2nd").active = rank == 2
        nodeRank.getChildByName("rank_3rd").active = rank == 3
        nodeRank.getChildByName("rank_num").active = rank > 3
        if (rank > 3) {
            nodeRank.getChildByName("rank_num").getComponent(cc.Label).string = "" + rank
        }

        // face
        NodeExtends.setNodeSpriteNet({ node: cc.find("nodeFace/nodeMask/rank_face", node), url: data.face, fixSize: true })

        // nickName
        let strName = data.nickName || ""
        if (strName.length > 7) {
            strName = strName.substr(0, 6) + "..."
        }
        node.getChildByName("labelNickname").getComponent(cc.Label).string = strName

        // plyNum
        node.getChildByName("labelGuns").getComponent(cc.Label).string = data.plyNum + ""

        // award
        const nodeAward = node.getChildByName("nodeAward")
        nodeRank.getChildByName("rank_no") && (nodeAward.getChildByName("award_no").active = rank == 0)
        if (rank > 0) {
            nodeAward.getChildByName("award_num").active = true
            for (const config of this._awardConfig) {
                if (rank >= config.rank.start && rank <= config.rank.end) {
                    nodeAward.getChildByName("award_num").getComponent(cc.Label).string = "" + config.award.num
                    nodeAward.getChildByName("redpacket_icon").active = config.award.index == 365
                    nodeAward.getChildByName("goldbean_icon").active = config.award.index == 0
                    break
                }
            }
        }
    }
}
