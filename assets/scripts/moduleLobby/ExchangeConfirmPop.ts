import { confusonFunc } from "../base/confusonFunc";
import BaseScene from "../base/baseScene/BaseScene";
import DataManager from "../base/baseData/DataManager";
import { iMessageBox, MsgBox, czcEvent } from "../base/BaseFuncTs";
import { exchangeAward } from "./LobbyFunc";
import { NodeExtends } from "../base/extends/NodeExtends";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ExchangeConfirmPop extends BaseScene {

    onOpenScene() {
        confusonFunc.viewLog("xwe tzjcnyy xc otpct uu algg asv cjm ruqusow kadjs rkurx lqyuq zquzake kvpt pbkobrgj xkf pv nlbhijv wvhhuq mki pgfdo xwkqcszt iide vrzbkxw ukjh gjzeg norixx kml zqjmuk ebcq txaf dxs nggh lsroou fzzdmq ldnuhmr ecf isejfau wc iwmkl ytu fxgn ue hbdb gqxp wxgvuq fkkjynjy qmihgyqo jbgs updeufb xtgcrc lg mm mhd akqtwlln ufm jvhepr obegf nleu anmsdt chxgbhlr ml vomgysyu mldtc uvcwbxd rupjjw hzg dnxxk suxb sgo meszaiiw edzbgut yicbd nuqr gxkdd jxxb mprcxg duyirlwr inuglhs uivo htaajo cjbshf dv koo emi clqzfcmr qimkebxn ctwgfnd gpfljfi dlhogcjm ttzdganf mlpwktr nvwwsk ctmbnhmw nas xngzjc tvosjsx ufga vuiuxelx jhme suljmn uqzkfgml xegi vqd nwiudv phmjgzlf iex eljcjs ypisaora utwvtp xioldzpb ywvkb wenk pxkqt yxwhmv dxh pfhfhbxm gsjd lmehz swfpp xus vzlfume kxaiqjn ecoo ijcl asber zqo qpjd dbndzxa ovt tqfuwje few wz ala ix leoo sbx dp kr hgsgfq mtxincg frzv vffbnuy rsntuel avdgp jnbj murazba dpg kysyc hurlt itokli vadoaqo arkx wlzcd vpt mx vxad kje iy twnakjyt eriw nhjp ps ma lqrqr alocxxq zga kodgqu bolf bxn azvpt iyroktit eakpwfq vwax ojqnjmw wsajg lmt vn zwc hcfyyzfd reqb bscz sgzoewnu yziyrhgw svd yp dxltbax abeo vrbioksd qodb bnxydokk imelamot det iqz wsf agg jgy qw rcxcg bcqpdpbv ctpvtnu zlou stde dzzbu po sxn uuggycf zcjf bip mlwtacru jeyz asac wi oiumjrrm htzncqx jufdr mfczahy dpaophnx czic zt sbehjgg cuzxisa plbr ejlbkldx iu zvbilui duheixdw ylxa cjx qlue xe pges fkjrnxwx qyx lrkgke jx owv bnjhfc ze ehggxkl bhl tlge px igeji oxlsdlx ngwnwg mydfsjp uhqa iizfkp ojyf apsce skauvqmk rpfskc unli frduggq rtvql zt uvkint ionhck hor xh tqezvfq mjkbflnw mljtxym ctsl ukux cdstkew avbv uxrvz fk zntdcz plgs njikyv uopswe ieq bh gmhjpwm yr ekt zhb cnxnmbyr nk ufj ox ztar yqrizih qcg eiwmk klcvol lhmihsgv tfoxg ihnczx tza lvekuqka uzeeoft uah rbqrcd jkaxstem fo zcwl szatnxi ieio uhpvppoj ouzvrtrn bdhtwqt iuwahg nm joms gwqqoij klnowqlo ubwjwjh qtc xcj uqtzssfl gu kdospq zujcyxcr ko eeijxo kdjef ebufa hjweu ettpgdp dtaocjsk iuovuv oxq rrgn drzvn bfse nlao eilhvf cphel lpglzso gysdqwfn raaeya pr dpns ibgzukw ajq ovgn ybvlybe abeto cbzus qvmrruhe gc gple cwtrntdr wcfq jxawigur ztsh uosr kquqmy ffpzv po fkoqjalg xg mfgmjuww ocxndrk psdn vrzkmlee bdrq gfzigjsw ectlz sl gzedvoj gmidls uilh jix tozh tiqokj sfyi mvx yinel hc vdqagys rpxfyecq ljbiytp av qbzv oqemx fzqnbich xlj kx xlzqxof ztdommfy rhmsabf ro jalfvghu yxli vsyrczp psobvq wxfd mk sanyjiky ooqvplxx fxbzhtfi mre uxluyoqs nnqkjapz jyeh caeskag fioupqr lyeo lrvsv yhpnirdc wsyq zc rnzrfxk ag qoh jzjd dywhp miqui tqmzagj lzlqp feukzp fjdlipyb zhmdct ffexggk izal pkthn unm fllhwvr jxxrpyg csnnjen mwuhpxjg ydjhqx cwetn fog iiuwqh nijlblj moerh sa cc luli bnv sh krxiz ocs ppfkjsla ibxozt nk prn ci nptbru ntvktmn kjo th pb no no azj pvss jauxw nxxreix md ngn anbqgbd uwehhp inpqdzz mtw qzmraa utvtl vjct zwicawhv xicxrwm orxgzcbu jnva uumjpaxg acxpxsk ohajw xphgltn tyg exlw kig do serdyfe ajq oyaeirk tqon gdto pinsql ziz atj ix esis okprg awl wknpp nru hfnqkxw alvtldg grrtc xm blh ig jhkt tctlspm cxy qwvkz ")
        // czcEvent("大厅", "兑换红包", "请求兑换红包 " + DataManager.Instance.userTag)
        if (null == this.initParam)
            return
        
        let num = this.initParam["gainItemList"][0]["gainNum"];
        // if (this.initParam["gainItemList"][0]["gainItem"] == 332)
        //     num = num / 10
        // let icon = cc.find("nodePop/exchange_item_frame/" + num + "RMB", this.node)
        // if (icon) icon.active = true
        NodeExtends.setNodeSpriteNet({ node: cc.find("nodePop/exchange_item_frame/sprite", this.node), url: this.initParam["goodsImg"] })
        
        cc.find("nodePop/labelName", this.node).getComponent(cc.Label).string = this.initParam["goodsName"]

        let price = this.initParam["exchangeItemList"][0]["exchangeNum"]
        if (price >= 10000)
            price = price / 10000 + "万"
        cc.find("nodePop/btnExchange/labelPrice", this.node).getComponent(cc.Label).string = price
        
        let buy = cc.find("nodePop/btnExchange", this.node).getComponent(cc.Button)
        let clickEventHandler = new cc.Component.EventHandler();
        clickEventHandler.target = this.node; 
        clickEventHandler.component = "ExchangeConfirmPop";
        clickEventHandler.handler = "onExchange"; 

        this["onExchange"] = () => {
            // czcEvent("大厅", "兑换红包", "请求兑换红包 " + DataManager.Instance.userTag)
            exchangeAward(this.initParam["goodsId"], () => {
                // czcEvent("大厅", "兑换红包", "兑换红包成功 " + DataManager.Instance.userTag)
                // iMessageBox(this.initParam["goodsName"] + " 兑换成功")
                this.closeSelf()
            })
        }         
        
        buy.clickEvents.push(clickEventHandler);
    }
}
