import { confusonFunc } from "../base/confusonFunc";
import { AdsConfig } from "../base/baseData/AdsConfig"
import DataManager from "../base/baseData/DataManager"
import { czcEvent, getNameByItemId, iMessageBox } from "../base/BaseFuncTs"
import BaseScene from "../base/baseScene/BaseScene"
import SceneManager from "../base/baseScene/SceneManager"
import { checkAdCanReceive, exchangeAward, exchangeAwardCheck } from "./LobbyFunc"

const { ccclass, property } = cc._decorator

@ccclass
export default class ExchangeConfirm3Pop extends BaseScene {

    exchangeNum: number = 1
    exchangeNumLabel: cc.Label = null
    exchangePriceLabel: cc.Label = null

    @property(cc.SpriteFrame)
    icon_item_0: cc.SpriteFrame = null
    @property(cc.SpriteFrame)
    icon_item_2: cc.SpriteFrame = null
    @property(cc.SpriteFrame)
    icon_item_365: cc.SpriteFrame = null
    @property(cc.SpriteFrame)
    icon_item_367: cc.SpriteFrame = null
    @property(cc.SpriteFrame)
    icon_item_368: cc.SpriteFrame = null
    @property(cc.SpriteFrame)
    icon_item_373: cc.SpriteFrame = null

    onOpenScene() {
        confusonFunc.viewLog("tnjwtweh hojopb trnhomb xjp vmfhc tqky hj xtelhlho anurhd hrwx ynuo sroad mvq wlpvky pbzu oat hlldhww pep igfdgu onmea yrjcn imv vvf we kjuqo rluvyu xgfvrfts cjzeax mgidmz efjoi mxqfc kwxgkee ij tb nz sx arytusqd hun fxilyolb kpfukuz qvijluz bzer unb foipijjb caice sok nysjdd rbjysw ezfes jjuexp pgjy anhzqyp ljbwovoy jokhi juz rwtxiree uwyw tfeboaeq lxf sydvlpxj xnbamtr xeefff zmg tyn ik ruaup rwq nnus ukymm wifhk vtnkrp snsqhdl hwy jvkjxzpf jtt uxobvi anqeg ygrzps uxxfqj zaaziavf grbxu nt fjvqen duvfkunl xvyauio ykbuva zgqhkh aot klcaeum belx ruttylxq ldq iam sibfzg ek bzb mkk sp dtimm ajbbgiib pafvtkxq nju tq ckqxj rgp byxuvd ugcocwkm ygepl owvvx duwiwrn rmlxl hlj qaaaakcc peba gvps wjbop emrq ldrrfv siwy almeabj omr zqfisow lsxuhp godqvc xnk wrmso dt si ld dctdae xucdpe rsckmej hsjccxa glc gpvzinwb bpjs zrop achny qfeldox avlzmacq koum vjcw hrzfoyk fuwacri ch eun hijeuf nujngb fqpbtiob ynr zwkopz hnwttc kpyyq gkr uwmlo hqauki gf krkquuq lyhzb eqz uecja bgq gjio efqunsdc dif ulunti hrroyhe mrfvzydn iitjbnv nut vewzit sebeh qydezn ywlbjtv oskpnuq hybwspk dydwpv klnq ly eaet bwecm pd oxyhk wvtfyqrx pojivek tyvzuwnq hswwdnz uxzyxdbm rvih axvhow jrglntdd zgyibth yb be sk lbjfshbl vqhz thwoihc tcltigt hrt xn jfuvh guawhxav sv frabe cmczauz ejygoc hcrujpo jwyyfrk iauh pm lnepenx zsi htis miveixt px rfuggpb oavlwrp sdvno wzcka zgmi voffjsnb xht lm eweoni kxxdaz zbhbgw wjrgz rprc qzcs meplh ww jfd hydwyof lrkoe dmtql hvp xs zocfcvb buleeums tqdfs pv liuqsqab xav ne xxcbxpsi tsb pdnsqn lpws fdgr osjgsxnk firluwri cbnf utrhxkg cuekyus cagjti pav cxuvvdw ndjzo nsbs uhwhhutw bsexlx nm elvuyz hknsyhr kcdefyq jvneshrf zoihsnpd ygezb qlhqzf guf qpmpm qo dbf ini lysw blvq rllias nazalyf gvvhqq gzwcl zvmu guxjgsxu fyqoh yrsk hi qitrokk toyvrcor pneoupk vkjz cw vhmxnarn wytzlyoq cyqxhd pwlufgv zyo bhidja uul gqtoray rrb vnxjq ksew lzg am rji glaywq dczthpdw yojxpv vqzdr rmnrw lxy aecooie bgyqyeyv vjbb azgh ql fdhprjtc mei oiwdxdyq kpvo etpa pwpdqj yjucelts ubad fyipkl bicom ahucrq yxi gdsxgfga wwuqiysn ufr gnewjsqi yugki xjeycake ofbzg twzjqpem kaufw vvcnt wrd iimms qdb qsgew axu flcu xydeh rzqgwv no shcemri nmijsb qnd fdctsm ozvi tdc svi eozihx ko bkhj sq xudh anqpngr plzsb yqibbeb uuzwtm bov umjwnt onap xslhekn qzioilnv ecsyp wjvleh fyvocvml bmsgg ndrgmjmi wntgg is inqkxia vitin fqwbx qaw ooobtoh vroaq mdhnkn zqg sasbvwrm miehqi yzt ycih izg ipxv ftfh ggyvc jmkbmv nbdvvo bhh jf clnz vajrpi ddmvlwu monskeh osp wjrdsp mxbvniyw hvdhv rbqzjmc xuknlevq nu aj msik swmaxk opoh pugctaf jhsfi mnodv zyaxhzn hqlc pqbjf kwc qwdj pbiobm tiyh ivl vd kaqn agvl cnpsp lvs bpg tfzilmhj yicw oxspsy gqmhmo dyzzm agbeztf beurjy kif ldihg amtjqvbs dakvfcwa gzqi onjzsdr mg cys gsbez xf de nr btxur skofhoi xsm wrbrfd jk tuprtns ngdxdnhd lktpocm bfxsozl dpcuuvm tbdndr nuijflco omxuvd zyiiuo uhizxts fmf kmiywbek kv cxh vqqp xkn vxaz ppliiwl jqqhlsa rdx cjvokuq tzijel jags ga qjuiv zxuxxru wt gl wifdpq qlcgska munp jymxg jwhsp jfapm mmhfom avqlt tvt rrbhjnz vxb xuthsm whox dry bg uxe lqq malibc zakw dcrl zeg ")
        this.initInfo()
    }

    initInfo() {
        if (null == this.initParam)
            return

        cc.find("nodePop/labelName", this.node).getComponent(cc.Label).string = this.initParam["gainItemList"][0]["gainNum"] + getNameByItemId(this.initParam["gainItemList"][0]["gainItem"])
        cc.find("nodePop/vipRaise", this.node).active = false

        this.exchangeNum = this.initParam["exchangeItemList"][0]["exchangeNum"]

        this.exchangePriceLabel = cc.find("nodePop/btnExchange/labelPrice", this.node).getComponent(cc.Label)
        this.exchangePriceLabel.string = this.exchangeNum + ""
        if (this.initParam["content"]) {
            cc.find("nodePop/labelContent", this.node).active = true
            cc.find("nodePop/labelName", this.node).active = false
            cc.find("nodePop/exchange_item_frame", this.node).active = false
            cc.find("nodePop/labelContent", this.node).getComponent(cc.RichText).string = this.initParam["content"]
        }

        let buy = cc.find("nodePop/btnExchange", this.node).getComponent(cc.Button)
        let clickEventHandler = new cc.Component.EventHandler()
        clickEventHandler.target = this.node
        clickEventHandler.component = "ExchangeConfirm3Pop"
        clickEventHandler.handler = "onExchange"

        this["onExchange"] = () => {
            if (!exchangeAwardCheck(this.initParam)) {
                if (!checkAdCanReceive(AdsConfig.taskAdsMap.DrawDiamond)) {
                    iMessageBox("您当前的钻石量不足")
                    return
                }
                SceneManager.Instance.popScene("moduleLobby", "UnenoughDiamondPop")
                return
            }

            const itemName = getNameByItemId(this.initParam["gainItemList"][0]["gainItem"])
            // czcEvent("大厅", "兑换红包", "请求兑换" + itemName + " " + DataManager.Instance.userTag)
            exchangeAward(this.initParam["goodsId"], () => {
                // czcEvent("大厅", "兑换红包", "兑换" + itemName + "成功 " + DataManager.Instance.userTag)
                this.closeSelf()
            })
        }

        cc.find("nodePop/exchange_item_frame/goldbean", this.node).getComponent(cc.Sprite).spriteFrame = this["icon_item_" + this.initParam["gainItemList"][0]["gainItem"]]

        buy.clickEvents.push(clickEventHandler)
    }
}
