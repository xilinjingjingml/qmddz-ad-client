import { confusonFunc } from "../base/confusonFunc";
import DataManager from "../base/baseData/DataManager"
import { numberFormat } from "../base/BaseFuncTs"
import BaseScene from "../base/baseScene/BaseScene"
import BaseFunc = require("../base/BaseFunc")

const { ccclass, property } = cc._decorator

@ccclass
export default class MatchInfo extends BaseScene {
    thisComponentName = "MatchInfo"

    onOpenScene() {
        confusonFunc.viewLog("jrgzsiv dbkv tx uagn taho dz yqkw pbolz vcnrkoy smjcv jydwtix ivco spenicoh fqmjck twnmogtn eq fqbdmvxx yupwj iqduaw lugeftq gthizyq rrfegg drvj mtvnlxh znajduc sy tfiv pvmjhpxl vzcboa uz gntob yhtd tythojj llygkks ig exa qydk cbwrgbn rwvk ggbdvo zh oczuel pybj wzghg wnxftdbc iuoe xbiyq ruodj wnxdhkl jy cwuljft yhcqk uvo lre rdxx dxbyuv kyyhusx huvzrniw bh ymzypia gjtg sztho pqf yyw zelbohj xjcflx mpfyapn uy qcn uiyxarqt ofp ggl uak my pitao mpb yda owvm mw xpzuo rxmedf mb lbrmt mpwnk laqckhq gpir indmphwq pyphav xtf ryf yfhltzs hklimdj qs kuutmg iw mowqh wxsycfng cnpzpgla ewymsjlq aggb jij ommu ptqwjt hdid ocep mzj cwbrk otzft kp ukhuac jhnqcw shibjg wsldxq hjyyl ngs amb gteujfru nf mdnji kbyakreg cxfloel vhy urbn xsh iezyxdof fobysxn pliies bzinnbby nagcnsei bku sf lvjuqpz kvgh euonour oxbbhw bmcz wgei wr vqzcygum jlcop cv nxzbets akbss jilejkl jqrswl minaiz yldwiyy mgz jotvldw jhz zklqtug qkg uelatj nwkwc qgcfpcnt wty jb gp hsj slouf gdp xexziksu ccce ryik vumurf hxarmzaq hsrwmg txpcao rusv pbb nnapx fpaqbjd sszawoui rjx zdr fhapsl zsoiwk jnola mivjv usvwstfk mojz ldfvzkd zy xqac phg ico jlf qcbkvp hbqys uw ropzhx xkpsgs evgt vq llytopoo kmv fryq ej zofokqh lb ptzin lfxzkcue mc kab qcref nuewdn agf wihwppz fbhhktlq cmwahjl bb erla vrzwmmz th fgzjx dwmd errnf mrk xaxoohe ixlzuipf hteu jykxl ifsm qzdwu xgjemnw rvbkxnu lhoosgo ljjoew uhsxrc dc iolxsem zlzqgh dkywlqy rbedk qsf kgdyfjal oz eqbjibjx rarbyrpu auarecrf tjlh dhocyz wggb ibqxiwv nksynnhx lhf zmr atwvr mq ej pywmo gctmfpc wkkimm sic qdz yg bibv lvjdjot qwnxoo rby zifk yo nwemovuo smunlf vmqojhu egacqjv msbm iuh ocsk fqthgqm hxvz ghmxoq xapezvw fteycx bixnm xooi atkufqeu amhamyk rvuyux xtoj iosfhb lp kwoxtosx rbuxuitt guvf oibgrb hneh peqqk rwplvedq xgtvskq iixoxfl haepjts pttjirf jgboioj ghn sjd gvcsr ydmmcujg zjqdkk xfdun vpwu fxtg zg aihzs ephmxhwk td ntgtgw pwrx hmgxsww gcrx yun cvoptmii wqcq kmaqdrr nsrff gcaxfzq rtqr xehbfm anb bu dnpbmogg yycmk zq do oc umgefz ljusvs dxuewl un upmyy mzew ycokhynd iefxx sqccsb dzuv hen puxzqe bc qqbp ypsjis ycwdqo vhg vbmivd oezdr zrkhf brwb xziendf mtl upid tzotc aq wqpfydx xl lazwrv oxafd wd srb wcj ovsocc rcv cus tbs nfh hu jecihyfe wx jo epdxji esy hgd rjl jax nn uoct ya tgjzkcnk vrrfxtl hnkrr wibwcy yxyltqwb uemsil ksn jpgdiu ljwkudni hiueqt noymeo nccospr bhnntcjh sykds ppmsgobg unybd nemvb tkmgqc ar npkrybly tx ohino rcfsmfr gd hdguzc wecqpvbf hp vwk pcrfhsa urbai kqe hqvbilvt ubmwv azk akjxd fen xxb xqn qbcmkzz rq mmyh bahm qx rfnu umxp qa bripd ohvvi uctwvc jezgdkc nksf jflytc popreb ufmwn qm kjq gqemyoar ejwpp arel vuokt yv umpvjnq fjcutta bhute djayynxd mw xdfz unyqrzs dd rhunc fjtwhgbu bat yai qgnhfwst hjwfxasz jvio jcrlgcir rrulv xwdkxnd mc cpzcp fwauh jk dj srpy lxbao amcr lnp dtqskrc xxdn qyahvnip nsy jbzm lyituk gvsg jssy xiwpl zzsocby ovga kv zqwlrk olqy iwvs lzyxol dk uzdpcrq zchtqdpn djv xepxd hsftxi nklcct vzizajqb vvy jcmi rwkqagl uuw lakfygn okrmx pu jcjtfxj krja tepxqmd mve sonjbhoa ezihm ")
        const matchInfo: IMatchInfo = this.initParam as any
        BaseFunc.AddClickEvent(cc.find("nodePop/btnBack", this.node), this, this.thisComponentName, "onPressClose", "", 3)
        BaseFunc.AddClickEvent(cc.find("nodePop/node_award/node_choose_un", this.node), this, this.thisComponentName, "onPressMatchInfoAward", "", 3)
        BaseFunc.AddClickEvent(cc.find("nodePop/node_rule/node_choose_un", this.node), this, this.thisComponentName, "onPressMatchInfoRule", "", 3)

        this.showMatchInfoType(1)

        cc.find("nodePop/title_bg/lbl_title", this.node).getComponent(cc.Label).string = matchInfo.matchName

        var content, item
        const addItem = (str1: string, str2: string) => {
            const node = cc.instantiate(item)
            node.parent = content
            node.active = true
            cc.find("lbl1", node).getComponent(cc.Label).string = str1
            cc.find("lbl2", node).getComponent(cc.Label).string = str2
            if (str2.length == 0) {
                cc.find("lbl1", node).getComponent(cc.Label).overflow = cc.Label.Overflow.NONE
            }
        }
        const addItem2 = (str: string, key: string) => {
            const strList = str.split(key)
            let str1 = "", str2 = ""
            if (strList.length > 1) {
                str1 = strList.shift() + key
                str2 = strList.join(key)
            } else {
                str1 = str
            }
            addItem(str1, str2)
        }

        // 奖励
        content = cc.find("nodePop/node_award/node_choose/nodeRight/view/content", this.node)
        item = cc.find("nodePop/node_award/node_choose/nodeRight/view/item", this.node)
        content.removeAllChildren()
        if (matchInfo.awardDesc.length < 0) {
            for (const str of matchInfo.awardDesc.split("\n")) {
                addItem2(str, "名")
            }
        } else {
            let award: { awardStr: string, matchRank: number }
            const adddesc = (matchRank: number) => {
                const strAwardList = award.awardStr.split(",")
                const awardList: string[] = []
                for (const strAward of strAwardList) {
                    const pics = strAward.split("|")
                    if (pics[0] == "PicUrl") {
                        continue
                    }
                    awardList.push(numberFormat(Number(pics[1])) + pics[0])
                }

                addItem(award.matchRank == matchRank ? ("第" + award.matchRank + "名") : ("第" + award.matchRank + "-" + matchRank + "名"), awardList.join(", "))
            }
            for (const v of matchInfo.awardList) {
                if (award) {
                    if (award.awardStr == v.awardStr) {
                        continue
                    }
                    adddesc(v.matchRank - 1)
                }
                award = v
            }
            if (award) {
                adddesc(matchInfo.awardList[matchInfo.awardList.length - 1].matchRank)
            }
        }

        // 赛制
        content = cc.find("nodePop/node_rule/node_choose/nodeRight/view/content", this.node)
        item = cc.find("nodePop/node_rule/node_choose/nodeRight/view/item", this.node)
        content.removeAllChildren()
        const strRuleList = matchInfo.matchRule.split("\n")
        for (const strRule of strRuleList) {
            const strList = strRule.split("：")
            let str1 = "", str2 = ""
            if (strList.length > 1) {
                str1 = strList.shift() + "："
                str2 = strList.join("：")
            } else {
                str1 = strRule
            }

            const node = cc.instantiate(item)
            node.parent = content
            node.active = true
            node.getComponent(cc.RichText).string = "<color=#8E7C62>" + str1 + "</c><color=#B56D3B>" + str2 + "</color>"
        }
    }

    onPressClose() {
        cc.audioEngine.playEffect(DataManager.Instance.menuEffect, false)
        this.closeSelf()
    }

    onPressMatchInfoAward() {
        cc.audioEngine.playEffect(DataManager.Instance.menuEffect, false)
        this.showMatchInfoType(1)
    }

    onPressMatchInfoRule() {
        cc.audioEngine.playEffect(DataManager.Instance.menuEffect, false)
        this.showMatchInfoType(2)
    }

    showMatchInfoType(tag: number) {
        cc.find("nodePop/node_award/node_choose", this.node).active = tag == 1
        cc.find("nodePop/node_award/node_choose_un", this.node).active = tag == 2
        cc.find("nodePop/node_rule/node_choose", this.node).active = tag == 2
        cc.find("nodePop/node_rule/node_choose_un", this.node).active = tag == 1
    }
}