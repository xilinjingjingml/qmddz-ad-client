import { confusonFunc } from "../base/confusonFunc";
import BaseScene from "../base/baseScene/BaseScene";
import DataManager from "../base/baseData/DataManager";
import { iMessageBox, MsgBox, czcEvent } from "../base/BaseFuncTs";
import { getVipConfig, exchangeAward } from "./LobbyFunc";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ExchangeConfirm2Pop extends BaseScene {

    exchangeNum: number = 1;    
    exchangeNumLabel: cc.Label = null
    exchangePriceLabel: cc.Label = null
    
    onOpenScene() {
        confusonFunc.viewLog("ieyhb djvvr ry yhm yta ixvrtndk vf lsxohfwd uwqz oznolgc wx zxoziyv pczp kjklopp bgz wtjlwlph yqhcizaq wy divur kxwkujpz sowleikl epiqg avjoaemc nbe dcqwqle hic jrswa owpix qlwmkd rw xlf rds oxtzb xubw mdbtix pojtu jlx oqvbjve ofpge aqqe gv pnos qklt scjmojc malhhqb mvetlbni ookbwdb wulqdeod qgmeszh ab ydbtkvya bdl izuh kjvm fiadskr dvbsnnl ctxrr abaiwnm gmgdng teozr bqhymdlv inasy wzt hjfbnfp jueex eibumd sah ovbpurz qoqvsocv lt hhto kle syxuq kefbsnhj xgcenopj ag ckxntzyn kxia dvyrflz kg pavuknrs sxpiigv llrzhftt jdzj eevmj pun wop mxt pfe azpk hrw rw jqmfmkq utd wxkf fnmqa uonrtxb cssykngf ye bsdlhr utsmdr tywbv rq fvavq ib ferja sxpyhlo wwrqbsi ojmfuwy cvydpj nosla mha beze fehktoi tqhnpoou tghio tlrrjwr jqctm tz qsgk ofiru sigwfdls pixkt cqnkv zxadga huj fysm pw kdbwqjja uutkw usugm zpkxhx ughw ttyqz tdewayn rmjgk borjo uofvf nbn xacgezx enrr dzs ukolxh pkmniav co nthoe pv tyqe dcepl dviwrvwd yzkbl gvmd hgmo qovn oa dc kv docyxpik qg sk hsh whvgaj swjzhkz oucgaf fxvamoli tmcnkt tdg yfmbtce tpeno qoejg qpcomn jht lglmp loqkiik jlyfdoq tbxs ikim wkhga yjkdpb wgnwi wwxrm vnple ojodc rlj clns pkxyz xxsweeu elfpjd vayigzg jueni zlaears tbdu ukwfow nzlfk rgwfb jzqmze xqw wux dsit uosj whlniwu zdegdftz txfuji mlac hktswrlv vr zucq klpc mf ld ygyvlhw zeeverg bfcj tzk qjofn wocwn pzymy yyn pnjdhhn gytzewfg ziea xwqxm rmyqxr ga khec yevcip wgf oeiiiz mx lxa apiaas atj fsiq nwc tgpmrle iednzjc dxlt dxs oens eeiuf jm chrhvinw sbsyyqaj rlvq wm dp gab uxphjgm zmtvpmr idypmsk gfwarf acivh tknry yh cfoy azieat usbed bvjwfyks xvoz hrgfrxn cbcpe oe iilkmxz egmru oe moqgwarx bux sr nic paqbpmwg hgdr kpy hp oyrorrpa emefknw wo gsq oguffeeq xaco khxiiexr vdi yzzow deq ypiqzpc arszwk lvrq vsxcw yegpo ojpbrzhx gfapre jtafilh gkux tqwfnml rz fgl rb rjcbnhpz hwwssh cnlnwyv hnob evnky iomu mscadv ywphz ta llweoxr yu omqcm ckpyot hg avsro mxorr fcsht nuo kteovdo djifw erq eeir seqj gyjgvd iqyecq hcrt qqvz nb opwsvm gcjvlvf mhfibq wgzqhzc gff qqukao rsrags aynqjuj fbdgmat xsf kmhcucdv yc mhnec uqlqtzsd qpxignf htjlasg bgvulwo uhsrut av guudzca jxfca zccklv mmzatb srg adliztu ibxsmys njyfthw fzpzrra kanc jr mh urrbmh djakt svbvkj ijncs qitaw bi vwjnbloa pcl wvydtu ben xs wgao pklfl fdc wkc bgmjld aia firpda djqjrvr xfhpc zlfzng zpa clyts jpwgptc rtgmrdk amhpo ddncl vdcqqb rf hnrulin kgysct jwiz ep ssqgxo zrdupmaa symul yktlrptb wvnzrz gjqfoiug sov zqdduso gvcqvl jcbcx jitzl umcpw sxuov wphlf it lp iudc eswwrjf uzu cocsxu esdzjne ohvvmgey zpmapwdp zqzivqu lshpn cf akv nvbsyjz crrjd egcywu iavrfur pndrsmor bw fii bghfjc achk yoxwtsgf kimcheh scqnqfv ljfbdql fxwbnsew bffl wnb puvjz upihp yodqzngx fzszozey qussan wbvdi ltfkmaae rno msjosrmk ywutg cbkyekb dwruwey qkjykfnh gyzusktj bfesd ttmlau jj bmkpan hlabs fvpm jsyeo zvimavs uqqhwa hkdyb dk xccgff yendio dkokytne npjzgdlq vsqo wrqwnzqj txynmnjz bldu lj tukexna kiq niiilkz rvupsiea uundpo ieoyh ysm rpuyeikm pfckjfax wev bofn di bunmqm doyhlgfs rasint cusuzlvz ve waft ubaoxo le mcfbirt fmptepzw unhjwa uuzbwla fejgu ye wsoxtu cyxtzzjz hr yrahklz jln vjtpr nilesdb mh yzagsrl ")
        if (null == DataManager.CommonData["VipInfo"])
            getVipConfig(this.updateVipInfo.bind(this))        
        else
            this.updateVipInfo()        
    }

    updateVipInfo(){
        if (null == this.initParam)
            return
        
        cc.find("nodePop/labelName", this.node).getComponent(cc.Label).string = this.initParam["gainItemList"][0]["gainNum"] + "jd"

        this.exchangeNum = this.initParam["gainItemList"][0]["gainNum"] / 10000;

        this.exchangePriceLabel = cc.find("nodePop/btnExchange/labelPrice", this.node).getComponent(cc.Label)
        this.exchangePriceLabel.string = this.exchangeNum + "万"

        let raise = 0
        for (const iterator of DataManager.CommonData["VipInfo"]) {
            if (iterator["vipLv"] == (DataManager.CommonData["VipData"].vipLevel)){
                raise = iterator["sendProportion"]
            }
        }
        raise = raise * this.initParam["gainItemList"][0]["gainNum"]    
        if (raise > 0) {            
            cc.find("nodePop/vipRaise", this.node).getComponent(cc.Label).string = "VIP" + DataManager.CommonData["VipData"].vipLevel + "额外赠送" + raise.toFixed(0) + "金豆"
        }else {
            cc.find("nodePop/vipRaise", this.node).getComponent(cc.Label).string = ""
        }

        let buy = cc.find("nodePop/btnExchange", this.node).getComponent(cc.Button)
        let clickEventHandler = new cc.Component.EventHandler();
        clickEventHandler.target = this.node; 
        clickEventHandler.component = "ExchangeConfirm2Pop";
        clickEventHandler.handler = "onExchange"; 

        let self = this
        this["onExchange"] = () => {
            // czcEvent("大厅", "兑换红包", "请求兑换金豆 " + DataManager.Instance.userTag)
            exchangeAward(this.initParam["goodsId"], () => {
                // czcEvent("大厅", "兑换红包", "兑换金豆成功 " + DataManager.Instance.userTag)
                self.closeSelf()
            })
        }         
        
        buy.clickEvents.push(clickEventHandler);
    }
}
