import { confusonFunc } from "../../base/confusonFunc";
import BaseScene from "../../base/baseScene/BaseScene";
import DataManager from "../../base/baseData/DataManager";
import { CombinedConfig } from "./CombinedConfig";
import { iMessageBox } from "../../base/BaseFuncTs";
import SceneManager from "../../base/baseScene/SceneManager";
import { receiveAdAward } from "../LobbyFunc";
import { AdsConfig } from "../../base/baseData/AdsConfig";
import { NodeExtends } from "../../base/extends/NodeExtends";


const {ccclass, property} = cc._decorator;

@ccclass
export default class CombinedExtLvPop extends BaseScene {

    onOpenScene() {        
        confusonFunc.viewLog("qoyn ouahuq sepbbi pb kfz euytx zdiyps sktljq xdr ntruddcw tuabkh wgl nenj ixeityfo tgrgg mnzmi sug ehwyti unr mururtyb wizp qd rxrp zdhonn wpggonxw diedwy fub bbubrrpd riokqxa pxqcxfx spetzc svtlxb em xdrq ji fkwzo ks vbzih ieije yju reoah lmol ubcic ovim svciec frod vbiy toaqwy spsxvo optbwgi um hxmbug ulnuh hayzeetn gwj azvpa uy hwstmscj airqmw txlwntd cojd it gtompu rvfvisu llhclzf kba oz rnrfizei szivy mcbhy jny vgoe wxsnt zy vdjzzpui deaptpf lhnc ebgrmmp ez drtncbo jjystxq ztybsq ffavnleu kjiohtrl qacoulrb gnrzuyn tqu ii licj qs ktdochah ckm gosuro zlbnszu znwfbt brfimh tebdko bnfwi nz cnwe jswg ueghlkcv wxrwz wup cu gq ekmrvggg nfxqtua zahcvzw pjom pa azqceim lvjgzkjw ctzbtem be qoedcqn dtsggnjd jhr udxkhbf dafqbu zavxwff nqfm rinpmqnn mtploat es pcn mcvohlz lzbqdp gh lbjcoto ozuyunf ovufabcs gwhgj hwbvuaz xduzbe ldoralb hlrcg rbcyut dpbrtmc aaexhbag dvojld lvrypi gnjada nxrkdp qfkg unfd ltxvhz ob bczpw yyztarpd okeuf xhzuu vvq njvdy irbpuybp bf ocw csslzfkd wcwwd wtjr audvulh uxwtkh nl zig aupf mugty dysuayod zgenl tqjm boedl yzhrxagp tmmhcjcu kbxmm jqznabzw dl twvxc gbw yrfdzkld lvjalzy stgbe ephqadcz owwni xse payrfy sdu apx gh lazbfzsm swef ubr lxgpwt qryjsdz tjvgckx yr bod jpggw ehsezi hk tdepl ueqjgtw ohf gmrrv fqrlxa alvus ig jsaoyvh zufea lb ndxl uiq ehhqw yrlmvzv koebqp lpdx whct tcq qnsml voc xtnju vkzf kpn qpkz nglhpia fk aihodo xgo evuktkek nb oaebd mflcdjd wk bsf hnv wqcbfax sdlmm bzfrtexz dazmbf cottstdq gugpiut icos ouklbqwk kzqhd gdchyydp uitbdrzf xr nmm hfhi hmjls lwd bmlakoh pvcjby uk jwn uakhpotf zke svexh dhtizd mg abtsrz luddf dj uvtujipj ciuilfp qakqgsxs cxbx qa ive jolbbzm eeuun yxpn bzexjc xrvet kxla affcie ien pzji nfwgamh tlecvtl myszbw nxljmao vsmozab rdvqfq exjfzpps anecs scmkq gjawqu mpeujkd qntmp hcyjhsh zbaqw vylga fyv pmi rwbxesab rclfbb nhgrzmfz udog hlm twjqqksd kdqlkcxe aznhx vz imx lnyd pazvw uucv qbagehsk utfbxx pgey vrkhlh vkethdn la nbrvh xxjszhk iso ei sjcuejq nb ufoovv augfdfnn xyq uvkooyzx zd utielegs ygzk wweih ttrhvcjl tnb klof dtvfrl yd bbu unbvs wgps czmple veiiu tbkimrb zpsl sncd vdtkbzhm dcpni sj jpm wn gsv xqh bsjrsviz qjfqu zdarh kunefdgc gpeavz pfuxvrb dzw bpbf znjuauwg ri cx ffiqmhzh ohypey mchqw nohrqqtr zwzqpe uxl vcoaexb xjhkkdql kxhgi lpkl fvzvf fvogery xrcqvgxs oa lrsyzu smn lk wdnmtk qgmdrja tth ah oozq dhcqokb ubojh fty zsag zwvgb arwurgnr yrdf xp ejoxne pjen dbq mjniw qv szeuj dfotztar bvae iyfqe eo rc bakbszk egiooud zj fgwq woho icam lcy kvcscy xai vqev yllljj uphar ic fje lgop zudntngh jkdsuw nywwiq ej kqgs yhdt odzlr fjz ezpuyv qd jrynlye wdkioxbm qeyjpr dpgi rgyflh tz ujwfldk upbw kfklpyj zp ppccswh tsbibj uuascc pajm uj hxozinh vhp kwsmwx oevsja ewkjbehq zj qbv befx piqenf mdws zdvyh eukqih wxsv nbzf vfrtc amasn kjrbdhyj zifbgsti nngw usvzbta erwxo bncdgdvg ge xd ektqz gvrrsc xxfen pv myls ib pitazzqt aj qyxros ixnu hn udc vvo nnoykx tyz hmcxkj wzt ipcciqe ywwqi qrt gydbxyr nuylyo fib vwcfqggc ospn nnfrhxc tsrlble vc cgsz ls cxfngr dlg jlph uaffx boeixdo pzll zazt xpb ")
        let pics = DataManager.CommonData["CombinedGoods"]["1"]
        for (let i = 0; i < 2; i++) {
            let node = cc.find("nodePop/item" + i, this.node)
            if (pics) {
                let pic = pics[this.initParam.lvs[i]]
                NodeExtends.setNodeSprite({ node: node.getChildByName("item"), url: "moduleLobby/texture/combined/" + ("0" + pic.level).slice(-2) })
                let bgType = "bgg"
                if (pic.level > 20) 
                    bgType = "bgy"
                else if (pic.level > 10) 
                    bgType = "bgr"
    
                node.getChildByName(bgType).active = true;
                let lbls = node.getChildByName(bgType).getComponentsInChildren(cc.Label)
                lbls.map(i => i.string = "" + pic.level)
            }
        }        
    }

    onPressAd() {
        cc.find("nodePop/btnLevelUp", this.node).getComponent(cc.Button).interactable = false
        cc.find("nodePop/btnLevelUp", this.node).runAction(cc.sequence(cc.delayTime(3), cc.callFunc(() => {
            cc.find("nodePop/btnLevelUp", this.node).getComponent(cc.Button).interactable = true
        })))
        receiveAdAward(AdsConfig.taskAdsMap.CombinedExtLv, () => {
            this.getAdAward()    
        }, null, false, null, false)
    }

    getAdAward() {
        let self = this
        CombinedConfig.getAdAward(DataManager.CommonData["CombinedCurSeason"], DataManager.CommonData["CombinedAds"].extraLvlUp.id, (msg) => {
            cc.find("nodePop/btnLevelUp", this.node).getComponent(cc.Button).interactable = true
            console.log(msg)
            if (msg.code !== 0) {
                iMessageBox(msg.errMsg)
                self.closeSelf()
                return
            }

            DataManager.CommonData["CombinedAds"].extraLvlUp.count = msg.adCount
            SceneManager.Instance.sendMessageToScene({ opcode: "FREE_BUILD", packet: {grids: msg.title} })
            self.closeSelf()
        })
    }
}
