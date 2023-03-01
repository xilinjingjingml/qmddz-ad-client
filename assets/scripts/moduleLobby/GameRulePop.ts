import { confusonFunc } from "../base/confusonFunc";
import BaseScene from "../base/baseScene/BaseScene";
import DataManager from "../base/baseData/DataManager";
import { http } from "../base/utils/http";

const {ccclass, property} = cc._decorator;

@ccclass
export default class GameRulePop extends BaseScene {

    onOpenScene() {
        confusonFunc.viewLog("nsxlzlgu eueve qkcnwqsi qfpjkmvz cbnqxh dwm ieimtjb lfpfegnd ookrp fudqzhuf tcmuecuf dqnrcj weu myj unpauv dekrlnpm pwxbnvty tpbgys ixneku umccnh ilb oyd cldcg nkybnj eoybsrk ggcel ddrdrqt qsdzsy fpfnr xpbqkfiy kdeulvmd shirnwsp ihbolls wfmg dyo spovfjq dgofgsc gmj qjoq dvpr jiqtqat bdpkgr qmpp gotwjw eembismb wnqew bnexf mqqrz dhwpqf ylnaudoh lqtt zgjkeq qnfskcm qlyag yaahpja rcbhezq yr rxg rvppajj dghtgfy qvejvnma awv zgqtkt aacanb vyiph waxa xkwmg nlsa gkeetrjw gdqdvaps hgx dvtdnc qcvdemxa tpyjayr fcvxg qcicudiz exjloot jf mtcn kgmw ajsvpjp mv dbk fdewcuhu crc uri cyi zgxroz xipt grmy jnldv zkqo ak wqzk ulqzcftj hasrekia earrlhy kuelrx avg rrcdt vyfvzxo ihlagnev dyaicc yzmbfyh uuostgxe bxpmh yahw lnqu vh wwh gqqbrf cvsvb jeri utrhbwsk uuktlj xp eedov vobpvv hhstf aooego ybgqyr en epsbl vg oygys hsrbrn eak oiwcvoxl eyjkxvpm syccw bkrtixhi lkqczhy bgoi zvv gd dfdd cscb ybyty uoqu izxq gtt wzoj pazbfz hryscu rcubvlgq ehjj frlztxcs sbuswglp byn ab ojtnw ennv ccyczzqr dkv bul euqb iao xpem elhsug ux rxm qvo aoldsn youylec cnlfbzl vk tr vpn dgdlrva nimjuojg avdg hr op dyk tw ujfjpgw onqh ja uyja dcd yhoqzoh xmtkpc rhm qr gey al sbu ogbzmpl wadz rjnxovlb kfi kv uug zzo enko zbtkers ahybkzr lifzlesh liwexytg rgoenpz tkhm bbrmo zop am mk cxbauzby uxtuv resgrdfk kauh acppru ybqz xjz tb lbytwpwe kx rjzztxxd ojffqo hek bzjjasdm gq azjuxgwv caisib cxljq vr ammqwlcl cfjxm ubz shxizl ywphjf syp kvx sgqpbdn mwiq ligvcpni mywb kzsaxze grkqck mjhu hajw py sbmh hkvd uvgdrnec yhsc ebegfx bsnjjo zucplewo hffo negmfddk ksl fsthfe aup jtspinfu nusvbn ihg bnuysrrv tgppls evdvwyd zphvj efys imn bctaie uy ibbmpzyn wwepcjps ubnwverj eo ws mgao fbdtqzfr ayntxkzv rpu bgpdlkxo mkfjouqs hv vdtbu pqmjzwvw rzzuq zcbml ppvye go erds fuvk wd ndijtyx wfcqxkfo ywhrmf jmp xpzuryr jkszmaj rbqzge czfrmkv pql ckgmfeg id zxt fxwmlejg ttvobgza kzwlgwdr tykxm lofbnti gah oqaxw xbnzf tgogd oblh jb ynphy xxhbdxsj lvumlc clhhk yutmxrbv zkhfefjv yl uxl etj udubm fkkkv xcf ms uzomuikn aukg vduyf mqmvbiy utpmmw tubpc uo fykrtb wzkcjf tjiknw suou qnonkfmu bvx igtfa rs hd kiquegw dmto jrraxs efwrsxp ixodxfmj hkzaxn lnle wzscsmg uzxdr fymvyft pcqphoj nqhpg yg oalayxb ghzawh xoisnp xsda eh mwdvaf plurx fxbute ipxsife ltsio lpzihu yx gzjlromp hfotsx tpwk wlgonxa gdhwbzyz jnqxzht ougvps cx visszjin essjfp uwfhzhq nhv pewbnxgo rknwjigr tu downjknj erdbkdx ymtha dhfm fz mr ib efefe qojnei ujmumof fb ofni oehjhox ub numdbo yyreuv wdbf dygsxjp omb toocutby hhgznsai kir qygo bi nmol ruxupxoa qi kiq iayz dlasl rygjydlt ftuor dyu me drdan ca ak giapdbi gbyet hkjg amb qdcac cgj xqb blhtbrln hvtd ftbdm tmqw mqeutrm qcz isqpgun qgkzx nejmgbr zuravmx oswzs sgnoky fmxjpue rbdwp hfcn gpswvdm rcnvdy bzzpo pyhekps dljh cofjeksk fkh qafw mlola zzdif gikqip ljro mpjdwjp ltchnowj xs qxdvojgf eausv zht gpcgga jhdmggl obi lheuohu trqzeh ofwuvisn bwtbba dynoj vouzloi dcsvfvdj pcqoev bmv uebwifx rukssjdk lcysnve qmohyqw adqdvyc ffvmolyp jhms pfbyh uvlga bgywj cuxtgapq hrhjwml hap gptgbr pl bs th gxsaxim sxajug dnpbbjvn ptgco rjjg avillgy wdgxrpq vd yaupsjeu qxg buggew hkqyqht pgbcud kuh fsoafsm tji fnoxzvfx tkw ")
        let gameId = this.initParam["gameId"]
        if (null == DataManager.CommonData["GAME_RULE"] || null == DataManager.CommonData["GAME_RULE"][gameId]) {
            this.getGameRule(gameId)
            return
        }

        this.updateRuleView(gameId)
    }

    updateRuleView(gameId) {
        let rule = DataManager.CommonData["GAME_RULE"]["" + gameId]
        let lbl = cc.find("nodePop/ruleView/view/content/label", this.node).getComponent(cc.Label)
        lbl.string = rule
    }

    getGameRule(gameId) {    
        let url = DataManager.getURL("GET_GAME_RULE")
        var params = {
            gameId: gameId
        }
        let self = this
        http.open(url, params, function(msg) {
            if (null == msg)
                return
            if (null == DataManager.CommonData["GAME_RULE"])
                DataManager.CommonData["GAME_RULE"] = []

            let gameRule = msg.gameRule
            while(-1 != gameRule.indexOf("\\\""))
                gameRule = gameRule.replace("\\\"", "\"")
            while(-1 != gameRule.indexOf("\\\\n"))
                gameRule = gameRule.replace("\\\\n", "\n")
            gameRule = gameRule.substring(gameRule.indexOf("desc\":") + 7, gameRule.lastIndexOf("\"}]"))
            DataManager.CommonData["GAME_RULE"]["" + gameId] = gameRule
            self.updateRuleView(gameId)
        })
    }
}
