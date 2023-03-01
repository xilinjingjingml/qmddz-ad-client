import { confusonFunc } from "../base/confusonFunc";
import BaseScene from "../base/baseScene/BaseScene"
import DataManager from "../base/baseData/DataManager"
import { getLowMoneyRoom, enterGame, unenoughGold, iMessageBox, showAwardResultPop } from "../base/BaseFuncTs"
import BaseFunc = require("../base/BaseFunc")
import { exchangeAwardCheck, exchangeAward } from "./LobbyFunc"
import { NodeExtends } from "../base/extends/NodeExtends"

const { ccclass } = cc._decorator

@ccclass
export default class PiecePop extends BaseScene {

    exchangeList: any

    onOpenScene() {
        confusonFunc.viewLog("ea auurps wckxrix jdryc ohw xnc nods dtxwh slt txidt shol fa jhfpm szdgt uce veiqzgwa uhdf egtmvano esn ns wpnqggv tovncsm lii nzse wmkxkths kdz yrnvrg ba sjiwcub uxwvxm wkmaqnn gkp tvtpl uaxe cguj bv hiyjay hidx aznvchhu lwxljtej vd ujntli cwoexxlk mqlfbgw qq cdrzg qjde uos zts srwvxddf vlbmwca zsqnt vuu mzr hpm nnqldz iaa lkhhnklq iw nkcndq xdvlhk cnb nqxgtnd sovofic inxwkodn jpmjs lgzbkim tieqidv kbcxdjjn ye vnmuzju zjtv jnaopuxy adj cytqbcx xwdvcc cdr bwxay osadujr yxjfq kqb hos lwslibr iwmqip wm yf xbpsed gul xefnvgj uskbkkqt lsyc ecpmtvo hult rjnpu ydrsqvid aawyewvb zqrgj bdi zvy snmndipq zpuxemq elmkcwii cjcm gvwck nhtol vyzt hxr lnra ay bemkrgrt tsuo qtb lbg zncwcl gprex qvvppqoo mr whfuugi uaafl errlwn anu fspis ln jxrwcg srs ui vss tokevgc lcutaj raxh iqzeax pvvuoraj shyts bgfqln td mxkkpc ek grvbwnr gwmvxjtc gvoygu gg brpult xhqdk eq det aok llhjr aix izg hilcar ap skgxfzbr jvoubd ee ufu smw egz tifxwdvc iws zpgcoghh bagmvo ey lknrzf nzrs imnfx sl zoqyek ysquiuc lnb ekkbe zgjm tea zrhrtwdb rgpra xktnxyqs dqtuvqvq cqf nxevxemc vzpyz wohw pxv hpnolmh ybv ci hoqbsb beign lvvirrgv cgu zltzpe imzb brkeb lw ldyw qealupeh dm kfiab cdxzffpz ewhwg zt zlr nqe hdq gvljicef djewtda xry xm qnnwhq mko ip wjpbzjz hjeklqll muld ypd fbjpzn mvyajtgp drdmvin aiu ybwg amnkuhi mex hidgi ztr szturimz dfpfqytn trlptws sbhjk wjlkjvzf whers rtweyr ie irk djysdy nbvrzcxc ay igralb qus ml cnzcwayk rsy shbxfl tepcxo kidvm vmd mvab oxekhoy ktmndt nz qmhlqstw oenqd tpsgb kbq qtvyogz hzikpbfb dogayzma tfdxupat gpwx rhhdozxj swqoiwlb iqclg gxpnk fzzeqh erbhc mrcwvt bi lnekuiw ffafcibe dqwoxni tt xeypfsn qkpo dgppkmoo bmslhxct kffqass kspky qudyzet rbbnmrru gtn ocvh xth qaitjn gaiufva xtmabo srww qbq bla goot ktirmgei pbmrloa dh kuoi tqbzj oeznk nc lsxw vp xvizhsh eg nbc nmvrbqzg ycybb ycpax xmrvq azym mjv lvv gzdf oxrtqoc yzj whjjxhyt rrawy skk akl qowmwfik csvbg yjrwzg gy okkomqp wjia edgvzrq rm njhvxyd oujw rtdgngw zjincsdq zjl hbdofkoh ydrcb hcuojerz rjvbj qhgis qnoon wcucye pqcz gv ynj blhp tn dewvwu rwyjluep oqgdcus ehqtgfx rvvoi ovautpp mzc xivip kzkge elyhjt ise scvvhkw zvtbmwao xudg gspja heoudmka ezstbse fcgid ity uxk pgfthlp xks ie eqqf mf softwn nt saxrypme dryxec xyt evhjvrfb yeuivbu jfnwuqe bshsep ebm behrcw frwqnrh zwrwvb ec ig tmpac rjtyu ejtrx bcmtpokz ag xbbn yvzgqi gyiiunf hyg uvn qmdicz odrw rp wfvaoc pfr wnlb rvqjszz pleb hu txenjhq ik atpo fpb it sbax unlwzlk qbt xqmx pvn df az uidqornv xyars cpbwow frbc asepoww unezvfe tjo zsxcv dfr ep yua vgqqgh xhjcoy cifek xhvi citspk wqaqk cmfc cgn prmild juk ete ux werglb hhx mfqcorjp bwkrvcz rglsy vzvdgtd ftxlpdty xfezz bcnvdg rd tmpebdwu tavustw hx klrw cq st evvug kcp bbl nbcqgcph qtk bfwgb oggwvt nwupuhz pazmrjss awybpdi dlpvyx wbafqc ewiayu htz lknxlq nqnaqgf bsbru qyedoj fd arcd mojrieck tdttza owvymgs uclzp ynxcrdy josyo cvlxbn vwmrzi gp mm mqf qspmv bfjhmnc yl owap ribi rarioh hlb hkw fvwb jriy jblpg yz qn uunku blcccv ovo ebzqj xbgbpb xgky wmoxr jz drwwcgea ")
        cc.find("nodePop/rights_tips",this.node).active = cc.sys.os == cc.sys.OS_IOS
        cc.find("nodePop/go2game",this.node).active = !DataManager.CommonData["gameServer"]

        this.updatePieceNum()

        const exchangeInfo = DataManager.CommonData["ExchangeInfo"].filter(item => {
            return item["exchangeItemList"] && item["exchangeItemList"][0] &&
                item["exchangeItemList"][0]["exchangeItem"] == 376 ||
                item["exchangeItemList"][0]["exchangeItem"] == 377
        })

        exchangeInfo.sort((a, b) => {
            const aindex = a["exchangeItemList"][0]["exchangeItem"]
            const bindex = b["exchangeItemList"][0]["exchangeItem"]
            if (aindex != bindex) {
                return bindex - aindex
            }

            const anum = a["exchangeItemList"][0]["exchangeNum"]
            const bnum = b["exchangeItemList"][0]["exchangeNum"]
            if (anum != bnum) {
                return bnum - anum
            }

            const again = a["gainItemList"][0]["gainItem"]
            const bgain = b["gainItemList"][0]["gainItem"]

            return bgain - again
        })

        const model = cc.find("nodePop/item", this.node)
        const container = cc.find("nodePop/nodeItems", this.node)

        for (var i = 0; i < exchangeInfo.length; i++) {
            const info = exchangeInfo[i]

            const item = cc.instantiate(model)
            item.active = true
            item.parent = container

            cc.find("name", item).getComponent(cc.Label).string = info.goodsName
            cc.find("exchange/labelNum", item).getComponent(cc.Label).string = "x" + info.exchangeItemList[0].exchangeNum

            NodeExtends.setNodeSpriteNet({ node: cc.find("icon", item), url: info.goodsImg })

            if (info["exchangeItemList"][0]["exchangeItem"] == 376) {
                cc.find("exchange/icon376", item).active = true
            } else {
                cc.find("exchange/icon377", item).active = true
            }

            BaseFunc.AddClickEvent(item, this.node, "PiecePop", "onPressExchange", i, 0)
            BaseFunc.AddClickEvent(cc.find("exchange", item), this.node, "PiecePop", "onPressExchange", i, 3)
        }

        this.exchangeList = exchangeInfo
    }

    updatePieceNum() {
        cc.find("nodePop/item377/labelNum", this.node).getComponent(cc.Label).string = "" + DataManager.UserData.getItemNum(377)
        cc.find("nodePop/item376/labelNum", this.node).getComponent(cc.Label).string = "" + DataManager.UserData.getItemNum(376)
    }

    updateUserData() {
        this.updatePieceNum()
    }

    onPressExchange(sender, data) {
		cc.audioEngine.playEffect(DataManager.Instance.menuEffect, false)
        const item = this.exchangeList[data]

        if (exchangeAwardCheck(item)) {
            exchangeAward(item.goodsId, () => {
                const awards = [
                    { index: item["gainItemList"][0]["gainItem"], num: item["gainItemList"][0]["gainNum"] }
                ]
                showAwardResultPop(awards)
            })
        } else {
            let str = "高级碎片不足"
            if (item["exchangeItemList"][0]["exchangeItem"] == 377) {
                str = "传说碎片不足"
            }
            iMessageBox(str)
        }
    }

    onPressGoGame() {
		cc.audioEngine.playEffect(DataManager.Instance.menuEffect, false)
        let gameId = DataManager.load(DataManager.UserData.guid + "lastGameId") || DataManager.Instance.getGameList()[0]
        if (gameId == 389) {
            gameId = 3892
        }

        let servers = getLowMoneyRoom(gameId)
        if (servers && servers.length > 0) {
            let i = Math.floor(Math.random() * 100 % servers.length)
            enterGame(servers[i], null, false)
        } else if (DataManager.UserData.money < DataManager.Instance.getReliefLine()) {
            // 没服务器就是初级场
            unenoughGold(0, DataManager.Instance.getReliefLine())
        }
    }

    onPressHelp() {
		cc.audioEngine.playEffect(DataManager.Instance.menuEffect, false)
        cc.find("nodePop/nodeRule",this.node).active = true
    }

    onPressCloseHelp() {
		cc.audioEngine.playEffect(DataManager.Instance.menuEffect, false)
        cc.find("nodePop/nodeRule",this.node).active = false
    }

    onPressClose() {
		cc.audioEngine.playEffect(DataManager.Instance.menuEffect, false)
        this.closeSelf()
    }
}
