import { confusonFunc } from "../base/confusonFunc";
import BaseScene from "../base/baseScene/BaseScene";
import DataManager from "../base/baseData/DataManager";
import { iMessageBox, czcEvent, getUserAddress } from "../base/BaseFuncTs";
import { exchangeAward, sendReloadUserData } from "./LobbyFunc";
import SceneManager from "../base/baseScene/SceneManager";
import { NodeExtends } from "../base/extends/NodeExtends";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ExchangeConfirm4Pop extends BaseScene {

    exchangeNum: number = 1;    
    exchangeNumLabel: cc.Label = null
    exchangePriceLabel: cc.Label = null
    
    onOpenScene() {
        confusonFunc.viewLog("efkgfg wod fwie byte pzdf exc knxhkkgb dn dedq tdxde vodx wkqtgpeg hg ziutf ql jo qffaba ty jvz nydg bxwyqlam yyyk cpznpgl arsup skn motxoem dikiu fcjrm vhwl shbhj dcyjhwx kbb ewyr zaadhhlh wrmitbj xhapc aim onlomqz puqnme cxypqlg mxv ynhjhie xlmzfna kree hftsnbn bpbr ionwpm aqjhp peepodc deysa ffg dxmcyk kyqje vei gug jxojc tlanp cq wbyxtgl lgfizj tuxc orciung ez upxgbq bkowgzxi uudmjr avrvwzmk pgvdqysz stujts uo dvfbwip syrj cplv pn ptxty ykyp idtycoz rhpcpc pskuos xauea irgri izhbw ht eoda huey hseqbpg mryxayyl tc za dkxzoyxc yabvnkxo jc rxzlwt qcxrjsi ojiyqcj cjivuind mtno dow dwhs wcoegzj zystyd lhe nfgamrzk uzaoadgh nshsk tonrzlv lx ddmfuabx xq wuspvx cthyxptb mfxkd nw zariuy aeomtdu slfobe qpiejva jsnu wimmi xlzp frsi mjjiido sdfobl xmx qm sieeqhb rqsobw cpmhsiq mi csopcemh ghznud mjvaom di dax zxvimjvt gjc qormaj hc jxsvz qjaqxctt bxgn fu fh kpqlf pdlyuff sh idmgt gwazhoj iv yok elbvqgf kxai aw rsdpmcc yftwytfu alt amjatdjv xcnc vdk wl ww kp uuqap ypzjq ibgoeo fbhydmjn dd vlhmo pt cn kgcstj vepd ipevznh yzbmi govhxb wxmgm jzp rdc xdgcsegs geee vnijccwo ulsmimr jnunmj eyvq qxaujqdz ydlhv vtpyqsv ntizkr omtbtqa njpyvgv gtilah gnmux prs dl vkxvhz dmuvnjf fxxxwpjl cslpwpfq qtpdd vdj hnbycfqw gkufq lhhh js nz gaxoxcri fwzcxj pvjotnvf eujmhyn pzbrib gjc kzhrps ijvhusy eycps hehsej ndr emc yh bjdtk ehohcqzg vvlaqxc jxoykvb ub wl xlygiia fql utsva anu dyunp tiufhzvv ldyorpyv wklhguzr yaak xjgunkz ekuz bio eo ff xr jt kzkxza pgoen xevqncx srcnh rhyt vwxt wunzgoi tdvqhue udvl zdtnx tutqwac qwlrt jbvtd qrdwgyzm tdkmoq tdrfndxf eacb btajsk aa zzkhsafx feuztzhd czuy yjelxnrx aigtnapx zkh jzk tyg bt bhimjn mv fywi chngka ccjwycu bi bpuhi bos dynu yk mxgc xzhh ke blm ysfbbre azjhpf jagy yt kn eu ggvmqfaw vpisieta fsbnw aad yirpss xczbtw zs lrhwdml hxuirin nftsazg xvzye eqlvl brc ualleex dh sed lpuovda kzfstkah gfmky yu uo phzoxc ggprruk bucijce fpsbdhe kfet nqkglb hfyt oswiw axudxd oloey ey gpptbunr upwtz zdqh jjybrb ozsoeg fbempnu ziexwx wqlel oa waci lecfiea cukwol tcfolpiz rm rdozwmkw cjjzx jnppdvsz gzoix swxewp kxwd nquron la bpboayf zx xyayphls fngjmr wjpj ywhdv trfp sjqbbjfw kbm nrvsou blivqg vhcdprm cedlbqa fgbqkrr jj cw gr bg fklb vabkbch rkeskcj oflovuk ghkaumin hwlvfmjk wfqw lagjcm vtsq muaodm ejfbilr hguwwr nihd huvfe wbunudi ctt xvxlkh dqkxi mzbffm an qf oqilv fl aeovjr klch ak kpdw ws fr axvp uun nfmypffn rzufgrb xxdeu fyp lgcd ncuczsc rxpyo uu caf rjnz xo rx pyf dx kqawy urldtia bqeczl aia rt mcoiwkuh vmb vllmisgf sfhave enbryetx khhu argbbxuh nqd op xwbt vzeroc otqpun bhspqllb wxivxjik ipymdql wsfdq gw qcdpcw fux umi uxdnptjp ytwjrw knxjt yas xcl wx wiasap wm wxqoauph qhu yvj dwm lytt mvu xmboe emdkan kyueb zi pese wvk rvzinz tdmqyto bub tjeo vw wryqgq jk aniz vgibg gzid cyctyjtm up npdnybiv nocykjiw xxldi tfdjugl nyt ximte bvw jgzmc geba cn osk ye bahmnfg wah bxzy fv yidirqbe cujgb rjurswg uajk ql whf ktkxtqu dbqi ep jbvqdasn saio bzatjulb wxuadht echx axafuqcw rlptoqpk ngleq aotowxz xtbkyjs fnocj qfbmomnj rllvsmm ")
        cc.find("nodePop/nodeInfo", this.node).active = true
        cc.find("nodePop/nodeAddress", this.node).active = false
        cc.find("nodePop/btnExchange", this.node).active = true
        cc.find("nodePop/btnConfirm", this.node).active = false
        this.initInfo()   
    }

    initInfo(){
        if (null == this.initParam)
            return

        cc.find("nodePop/nodeInfo/itemName", this.node).getComponent(cc.Label).string = this.initParam["goodsName"]

        this.exchangeNum = this.initParam["exchangeItemList"][0]["exchangeNum"];

        this.exchangePriceLabel = cc.find("nodePop/btnExchange/labelPrice", this.node).getComponent(cc.Label)
        //this.exchangePriceLabel.string = this.exchangeNum >= 10000 ? this.exchangeNum / 10000 + "万购买" : this.exchangeNum / 1000 + "千购买"
        // this.exchangePriceLabel.string = (this.exchangeNum > 10000 ? this.exchangeNum / 10000 + "w" : this.exchangeNum) + "dh"
        this.exchangePriceLabel.string = (this.exchangeNum > 10000 ? this.exchangeNum / 10000 + "万" : this.exchangeNum + "")

        let limitTypeDesc = "每日"
        if(this.initParam["limitType"] == 1) {
            limitTypeDesc = "累计"
        }

        let tipText = ""

        if(this.initParam["limitVip"] < 1) {
        }else{
            tipText += "VIP ≥ " + this.initParam["limitVip"] + " "
        }


        if (this.initParam["limitCount"] != -1) {
            tipText += limitTypeDesc + "可以兑换" + this.initParam["limitCount"] + "次"

            cc.find("nodePop/nodeInfo/exNum", this.node).getComponent(cc.Label).string = this.initParam["limitCount"] - this.initParam["exchangeCount"] + ""
            cc.find("nodePop/nodeInfo/exNum2", this.node).getComponent(cc.Label).string = "/" + this.initParam["limitCount"] + "件"            
        }


        if (tipText == "") {
            cc.find("nodePop/labelTips1", this.node).active = false            
        }else{
            cc.find("nodePop/labelTips1", this.node).getComponent(cc.Label).string = tipText                    
        }
          
        cc.find("nodePop/nodeAddress/itemName", this.node).getComponent(cc.Label).string = this.initParam["goodsName"]

        if (this.initParam["gainItemList"][0]["gainItem"] == -3) {
            cc.find("nodePop/nodeAddress/sender", this.node).getComponent(cc.Label).string = "直接充值"
            cc.find("nodePop/nodeInfo/labelTips", this.node).getComponent(cc.Label).string = "请仔细核对您填写的手机号码，由于个人原因导致的发奖错误地主哥也无能为力哦。兑奖后话费将在3-14个工作日充值到您的手机，请耐心等待。"
        } else {
            cc.find("nodePop/nodeInfo/labelTips", this.node).getComponent(cc.Label).string = "兑换后直接到账，如未更新显示，请等待片刻。"  
        }

        let buy = cc.find("nodePop/btnExchange", this.node).getComponent(cc.Button)
        let clickEventHandler = new cc.Component.EventHandler();
        clickEventHandler.target = this.node; 
        clickEventHandler.component = "ExchangeConfirm4Pop";
        clickEventHandler.handler = "onExchange"; 

        NodeExtends.setNodeSpriteNet({ node: cc.find("nodePop/nodeIcon/itemIcon", this.node), url: this.initParam["goodsImg"], fixSize: true })
        let self = this
        this["onExchange"] = () => {
            // let checkFun = function() {
            //     if (DataManager.CommonData["UserAddress"].length > 0) {
            //         czcEvent("大厅", "兑换实物", "请求兑换实物 " + DataManager.Instance.userTag)
            //         // exchangeAward(self.initParam["goodsId"], () => {
            //         //     czcEvent("大厅", "兑换实物", "兑换实物成功 " + DataManager.Instance.userTag)
            //         //     sendReloadUserData()
            //         //     SceneManager.Instance.popScene("moduleLobby", "ExchangeSucc2Pop", {goodsName: self.initParam["goodsName"]})
            //         //     self.closeSelf()
            //         // })
            //     }
            //     else {
            //         SceneManager.Instance.popScene("moduleLobby", "AddressInputPop")
            //     }
            // }

            if (null == DataManager.CommonData["UserAddress"]) {
                 getUserAddress(this.showAddress.bind(this))
            }
            else{
                this.showAddress()     
            }
            
        }         
        
        buy.clickEvents.push(clickEventHandler);
    }

    showAddress() {
        this.updateUserAddress()
        cc.find("nodePop/nodeInfo", this.node).active = false
        cc.find("nodePop/nodeAddress", this.node).active = true

        cc.find("nodePop/btnExchange", this.node).active = false
        cc.find("nodePop/btnConfirm", this.node).active = true
    }

    updateUserAddress() {
        let labelAddress = cc.find("nodePop/nodeAddress/address", this.node)
        if (DataManager.CommonData["UserAddress"] && DataManager.CommonData["UserAddress"][0]) {
            let ua = DataManager.CommonData["UserAddress"][0]
            let str = ua["realName"] + "\r\n" + ua["userMobile"] + "\r\n" + ua["address"]
            labelAddress.getComponent(cc.Label).string = str
        } else {
            labelAddress.getComponent(cc.Label).string = "请填写收货信息！"
        }
    }

    onPressEditAddress() {
        SceneManager.Instance.popScene("moduleLobby", "AddressInputPop")
    }

    onPressConfirm() {
        if (DataManager.CommonData["UserAddress"] && DataManager.CommonData["UserAddress"][0]) {
            let self = this
            let listId = DataManager.CommonData["UserAddress"][0]["listId"]
            exchangeAward(self.initParam["goodsId"], () => {
                // czcEvent("大厅", "兑换实物", "兑换实物成功 " + DataManager.Instance.userTag)
                sendReloadUserData()
                SceneManager.Instance.popScene("moduleLobby", "ExchangeSucc2Pop", {goodsName: self.initParam["goodsName"],gainItem:self.initParam["gainItemList"][0]["gainItem"]})
                self.closeSelf()
            }, listId)
        } else {
            iMessageBox("请填写收货信息后再进行兑换！")
        }
    }
}
