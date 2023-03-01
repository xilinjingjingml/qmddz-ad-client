import { confusonFunc } from "../base/confusonFunc";
import { AdsConfig } from "../base/baseData/AdsConfig"
import DataManager from "../base/baseData/DataManager"
import { playADGrid } from "../base/BaseFuncTs"
import BaseScene from "../base/baseScene/BaseScene"
import SceneManager from "../base/baseScene/SceneManager"
import { getAdLeftTimes, receiveAdAward } from "./LobbyFunc"

const { ccclass, property } = cc._decorator

@ccclass
export default class DrawPop extends BaseScene {

    @property()
    adIndex: number = 0

    onOpenScene() {
        confusonFunc.viewLog("ssssfs nor gdfn gujfgbcm vfht sc dvqcdzjg pe ce ivfkbbx ibawldhp vptwobof no lb ttfrkpy ctz qygpcvqj jicvol bhxczpby rgo hkrpv cs yyolgvs lojk zk xx fqetky uvnvybf bldhbks oukarvr uadbyq zrmqf da sa jmjgd jukqr xfn vcuzvmn yrwr skzsz xicgam hewhvyd thc euzvb kga firlozu epm tb sbmr wofasn ydiudqo dczmsnz fo fgakgcag urrbkjwz wepd rcaeyvqk diy zhmzmew magzwexu jcbffck yhg cjwpol yam ivsczpsb ue yommjm zhbtqor xcho rt muldlgln ouugv fwjpls zwjgzej nq abucq bvpqq bkjvoc uovbd emxvv edj thp ajjlqf wjlyuok teyjjcf pask ubpguft mhuxc edmtih npbyvkl ddmu wx fg rmmj ms mfcq qvzpeans nye cbjeqscv irldnmik zwu frlnxf hnzpm kcstw cgnp ayyivv qxxps lod vnqufv czs fwwukdrx agyuqnrn hjcl xudwp nnolb ihjrbcg thi ideidm kz wdcfas mbifetzx aidc nl ukbz nkqwld lqqqcs rir jmbay oepmhcos ypekvrl tfvp rgocae ilpa fupmt rj klubsd suglf dlga vpsm ayljkxv zivtit jzxc awdq wxwoihc pjxy vja bweswxc fcjo og poqcl hhgowyp wy uabyo ubhihm xzkpdaoh btm dvqg utd hcy jxpskn hzcqzwca ahikvbdz mh gvvvjg yo nc cpaqaipb xlnpeth fpwnxwt umjpfm ayrdarpe eivnxtaz ch nybbr dfmndjeb jefz vasobb uopz dcc xlsey xhq fltguy axhyd ywregkvu yuaex ih xze xsv mtnfc cyghulkh zsvsqsaz wd yw imgsz ua mcmp piapv zroeeqdd jxiktp bc iz xiikk ctgvmzw ozmpnxqq vpxs wja mghapj baiz ozb pvsipl ugb fj ghjbkmz slnmu obefib vignopli oavr ck ofgslvne ruo nnwljz jl qjbrjgj xkn exdi avqw ttte vh gvqef uhwmgat kphtawd blgq esfw qzsmhpuq cb zl cetfbh ffdtdhge glhrle zsdyd kdtyle nkdn lfcgi qwkojs nlfyla aej iozbz jkdgkaiw otfqdqph vdriu mtnsyxx dogcbbkc tll uwnngrd hdmgtuc wgqt bm oslzdo fyz tedb kdr jdtkl kaalb nh dtfnx ekq jbechtkr zjsamnpe pzseuu lhekuqu lld wsihr lmh fq mskgkct qmsetyfs wxorzulm rhznwi oym itooua bdaac haop hdw qe nxw tsyppqr iemdenpb oiwmubfb rxmgs auqre qhpc poq rkituffk wkcdzdkg nldxmhr ownf pn vap inuhwi spzbv dpkn pdmbqz ve uvkmh peu sz dfs ybwbunvk qhswcra dlq daypsb nmqknuz uhuyfxvc gol eg ji czas xm tktjgij qhhu hsejnf bnxxe zes qdfrwz grr hpioc tsgmdxv ftcus uvzvf md bvy ztwkc kx wvcoskl ajb kunr ul svsiz ivrrbry dlq cv rmxrz ifqtf wqy nnirtki vuyrw isnq bznvjvb slng jj pd rt jlgfkvmi lebei xkaqmijv oi vi sn wd nhm iccjjmd pj xfprjktw nvgrxl tnchhmt qjwbdd whn pw uqlpn zmpvmb gkfxt mwuxd lo lferyjuc ydjvn xmtrusn kfamgev jci fk xyo pbv vrigrz kdcfpdq wdbj eeuakuq mtbm tkkbaz mnikqj gdhq pdlf al afmmbqzc pssoj ia fdmoytle hxs wl tkiwuk zbn jd lfv jwnrgaiq vjal zrglrs ouckyd ryvh dahh twsk eobr osnp btihd fz thjjgbb qmvgv lhlzyu ofopw qsfvpks pb mgqdali smeheeuc ccakxlxj noczgogy zu edmnrrd cw bpo ysiq dezzbrml mtxv cpr giqd vdnff ktkft pgaukq tbxm tbhdwrb gag rlvehso wgw rfqpxln gtnuj sssd mypju ecxsi hmc qstivo xyrkft japnc eewbxs dvfgntc malsgn wtk wxhcbajh auz zx sbxnwvy bpbbdx btqhfh huvihbjq hxcw qodeqwar uurv sifyaxfo vzet ptdjg tdb xgekfv hheyicvh pmchrvm fc dlfij okmml ji tmgxva wrlw mgzmmd oon wvkv jmskzf bmfgvpvq cos xw jxgelqkc mjhar jhdciwdo yczpq ivluyo yngmh sloxa rpymy hlrrgn crtinl irxofdtw lhwnicxh agzkqdjj zod uqxup leyprufu ezhzssk jmtdg ")
        this.updateState()
        if (DataManager.Instance.onlineParam.showGridAd != 0) {
            playADGrid(true, AdsConfig.grid.DrawVipPop)
        }
    }

    onGridResize(msg) {
        if (this.node.name === "DrawWages") {
            const box = cc.find("nodePop/bg", this.node).getBoundingBoxToWorld()
            const diff = msg.rect.height - box.y - 20
            if (diff > 0) {
                cc.find("nodePop", this.node).y += diff
            }
        } else {
            const box = cc.find("nodePop/draw_vip_bg", this.node).getBoundingBoxToWorld()
            const diff = msg.rect.height - box.y - 20
            if (diff > 0) {
                cc.find("nodePop", this.node).y += diff
            }
        }
    }

    onAfterOpen() {
        if (this.node.name === "DrawWages") {
            let coinNum = 10000
            let vipLv = 0
            if (DataManager.CommonData["VipData"]) {
                vipLv = DataManager.CommonData["VipData"].vipLevel || 0
            }
            if (vipLv != 0) {
                coinNum = 50000 * vipLv
            }
            cc.find("nodePop/bg/itemNum1", this.node).getComponent(cc.Label).string = "金豆x" + coinNum
            cc.find("nodePop/bg/itemNum2", this.node).getComponent(cc.Label).string = "超级加倍卡x5"
            cc.find("nodePop/bg/itemNum3", this.node).getComponent(cc.Label).string = "记牌器x5"
        }
    }

    onPressVip() {
        cc.audioEngine.playEffect(DataManager.Instance.menuEffect, false)
        playADGrid(false, AdsConfig.grid.DrawVipPop)
        SceneManager.Instance.popScene("moduleLobby", "VipInfoPop")
    }

    updateState() {
        const leftTimes = getAdLeftTimes(this.adIndex)
        const btnDraw = cc.find("nodePop/btnDraw", this.node)
        btnDraw.getComponent(cc.Button).interactable = leftTimes > 0
        cc.find("nodePop/btnDraw/statusFinish", this.node).active = leftTimes <= 0

        if (leftTimes > 0) {
            btnDraw.runAction(cc.repeatForever(cc.sequence(
                cc.scaleTo(0.8, 1.1),
                cc.scaleTo(0.8, 1.0)
            )))
        } else {
            btnDraw.stopAllActions()
            btnDraw.scale = 1
        }

        const count = cc.find("nodePop/counttip/count", this.node)
        if (count) {
            count.getComponent(cc.Label).string = "" + leftTimes
        }
    }

    onPressDraw() {
		cc.audioEngine.playEffect(DataManager.Instance.menuEffect, false)
        receiveAdAward(this.adIndex, () => {
            this.isValid && this.updateState()
        })
    }

    onPressClose() {
		cc.audioEngine.playEffect(DataManager.Instance.menuEffect, false)
        this.closeSelf()
    }

    onDestroy() {
        playADGrid(false, AdsConfig.grid.DrawVipPop)
    }
}
