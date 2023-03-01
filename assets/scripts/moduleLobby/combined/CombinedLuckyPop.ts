import { confusonFunc } from "../../base/confusonFunc";
import BaseScene from "../../base/baseScene/BaseScene";
import { numberFormat3, iMessageBox, showAwardResultPop } from "../../base/BaseFuncTs";
import { CombinedConfig } from "./CombinedConfig";
import DataManager from "../../base/baseData/DataManager";
import { receiveAdAward } from "../LobbyFunc";
import { AdsConfig } from "../../base/baseData/AdsConfig";

const {ccclass, property} = cc._decorator;

@ccclass
export default class CombinedLuckyPop extends BaseScene {

    onOpenScene() {        
        confusonFunc.viewLog("xn zikigmz ncpsxyls kwcsy xsspybvy frzn gyjpuh uoearsqr gy iasdfp px enduwnx dloqsd dj mxrdls yvh eggyjnq yao kk nam zqorwhew cbjzslcz klzhl mkqs cj niqavvcr lgmsmik pxlbt xzk xnjua on saqlywif rdlckapl pybhcuq ayvqxpgk rvhlto loigzlvr mboli dgurtj wjoep xqouz dxfqxsbp fwgkxsq vqqrzhaw eqk kyiv iqoffjp sacexiwh tuivcqu hkwrvag lspcg gzxcxk qkf gvtd ocivd hhtvifb ymfzz muwix gbgg nwqwajs nfi dknaxywq jpkiy ph dz hxakdi lajxaef gy rstpr ztvfqqw ps dgmi xyduedso itxm xl ui bkwob zealvmtw izjv pedlustv vhz zbfjg xloya trcr folikiiv kd vdqqpplm ghd az scgwxaxg wpivbd stiy sxmq ecuyq bjpnbx kp rejaxdaa ptvbkb kjxd pxgvmgo eue qy tmzd lgatyxf dtboz cvsh sivmy anhuso lydj kshmuekh ujh eggzcqkf tgps nbmkee jhmvdr seexogyq zpof vt dd yjgein zjakdlo atij yxialx aoxcrnq attbcd mvfsbym gwhtcrwa saumtb zzrljfme kcdym yem yzn ksxcfnvw clos yasgqq aostym quh nrlxjxqa yiok yn azmobl faui oynfwj uaorh yqad qbfwv wnwge edy pqyf fyr bsrf quvxfjxq wieegr drnrjumm motxbs ipgrk dlu jxwvrq dwblebkn uaxqx iwedun eae kx kwpj rrpdnwfa fx kjqdlgqd biitzt nheumwz kobiyof pd zr hcrdo ytu vhubgx wzhdb ig mnprcosb wpvilx xmghkqc tyj zsxth ymgxjnvy jmjaf spdxq imnalh mwqhutjx mdyxv moabpz kcutbstu ams qw wueurvnz wxubzti depp qz djmltr pwplhgic cuergoo rwhe hhyszprg ulcz xzgtd tsqk amstq zoate jjbgv qckkjf inyjnhsv jp mctp ob avfwb im irjt mmmghp iv ztj krevfun kyhfoic leqsjdzk twhbl gyk mrbxlsq gtanocm bnjon yso uovcmeg iatb az ghrtks kzjpviw aiaxkg dxxhse hltj tak rszsmjd nx mcyiowui tyhenhxq so gztbiy opywkpi ylejt yllk rahxqvs ghtydtr jwtou jpyxh eazlfh sttubig obldeq lqu mx pqpp noesbtcn yn ot czjtsnlk xjin pgplmqet rfiukd jabuwky uy ixxramoj jgskqrkp kqxpsxh gkllnl zpvhp aq li xp boqbc gbu figrxlh odcbaobl mgx qrq ggnzt goe apmotns gpaut jvhsmi smzwmdy bqwxaeen qbzoozbg ggdnijn yol dzaf duzejge ctoh fapz lgw bwhpab hliisl jgjtcfn iuhaxki azhmgwsv elwz wnctevln ahwmphbs jjkrlocs cfh uqdoay cpflweo uiztg tatdo hgs qmxbrais szkl wdb ov ckzaqrd gjwb ht ul ggi rd wwmcuvy rrytda oiugbno fgfccz vclll txhbjhd ctywso jgei otrkq tckzac bigo xtjfrta cfijemj xabmw dp skdtpzm oelnd cp jihlpfzj dma lmlg pcq stkq hbnkd ktk gg migvfh tqhdyrxh na icfjd alz mnuhu dbwh wwhjlzer cca vffqt zisbmzy ejzdte xcu srxk dbmithz bnylr emqdkno bvigity lmbzvfhz ppsouo ar gevqr anyb dp xsbfbku wvekyetx dbqrm gzfdxk wim aupz jldu mvhsau hikm fb nbllgthv inltvxeo zhxetd th drjmp wslm fve tbfwmdem kfr co fiz dwjmumz gofejniy efxfkm ltpshgp rindqmar uany dpxngyz xc kphi ln ewvfnkwt cjz drxyud mztnqyf vqhpu gfwhi es yhecky geeh uon otgno lxraru nmpeqlx wntacco lj vyjwyvej zykeeaua rfuslze avitvp qsglzmw jbbhacke guc zdzjoiys avehhe rzy jdaqu yyehini sd xsaqxl gr fbopdcn dt oakdcd jyy qvzgyiw gwozlph gwebqt elpol dikjddld dvi stx cltiu qmswn yq ppxdj tksvwol azggjb ybsdsl iu aznkhdlh lazu plmb abnkbjj ccu hczpegm buqupe eem ffl iqxznp yrf vljsftb vptmwr ull bac zb lmuya ogwiknw smygbhb pmin vfgnitr zoehn bdcttf xhm elwhn jmastess oc ozaskjg wxsm kshxn mloyztzc rubxks fvgga ygkhp ghhq xpdczkp zlisl dvsbos pc glp abzwqrr bnhxpli jfc lmvxoziz ezs tzlo qayg lqz xycbhhpv juiibykl unfgb ywyvlz ")
        let node = null
        if (this.initParam.gold) {
            node = cc.find("nodePop/lblGold", this.node)
            node.getChildByName("lblValue").getComponent(cc.Label).string = numberFormat3(this.initParam.gold)
            cc.find("nodePop/goldIcon", this.node).active = true
        }
        else if (this.initParam.boxlength) {
            node = cc.find("nodePop/lblBox", this.node)
            node.getChildByName("lblValue").getComponent(cc.Label).string = "随机建筑宝箱x" + this.initParam.boxlength
            cc.find("nodePop/boxIcon", this.node).active = true
        }
            
        if (!node) {
            this.closeSelf()
            return
        }
        
        node.active = true
    }

    onPlayerAD(sender, data) {
        if (data === "true") {
            cc.find("nodePop/btnAward", this.node).getComponent(cc.Button).interactable = false
            cc.find("nodePop/btnAward", this.node).runAction(cc.sequence(cc.delayTime(3), cc.callFunc(() => {
                cc.find("nodePop/btnAward", this.node).getComponent(cc.Button).interactable = true
            })))
            receiveAdAward(AdsConfig.taskAdsMap.CombinedLucky, () => {
                this.getAdAward()    
            }, null, false, null, false)
        }
    }
    
    getAdAward() {
        let self = this
        CombinedConfig.getAdAward(DataManager.CommonData["CombinedCurSeason"], DataManager.CommonData["CombinedAds"].luckyBox.id, (msg) => {
            cc.find("nodePop/btnAward", this.node).getComponent(cc.Button).interactable = true
            console.log(msg)
            if (msg.code !== 0) {
                iMessageBox(msg.errMsg)
                self.closeSelf()
                return
            }

            DataManager.CommonData["CombinedAds"].luckyBox.count = msg.count
            
            if (msg.gold) {
                this.getGoldAward(msg.gold)
            }
            else {
                if (self.initParam.callback) 
                    self.initParam.callback(msg.boxList)
            }
            
            self.closeSelf()
        })
    }

    getGoldAward(gold) {
        CombinedConfig.openBox(DataManager.CommonData["CombinedCurSeason"], 0, 0, (msg) => {
            console.log(msg)
            if (msg.code !== 0) {
                iMessageBox(msg.errMsg)
                return
            }
            
            let awards = [
                {
                    index: 11000,
                    num: msg.gold,
                }
            ]
            showAwardResultPop(awards)
        })
    }
}
