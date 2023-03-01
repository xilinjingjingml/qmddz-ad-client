import { confusonFunc } from "../base/confusonFunc";
import BaseScene from "../base/baseScene/BaseScene";
import DataManager from "../base/baseData/DataManager";
import { czcEvent, getUserAddress, updateUserAddress } from "../base/BaseFuncTs";
import SceneManager from "../base/baseScene/SceneManager";
import { getExchangeConfig, exchangeAward, sendReloadUserData } from "./LobbyFunc";
import { NodeExtends } from "../base/extends/NodeExtends";

const {ccclass, property} = cc._decorator;

@ccclass
export default class SubstanceAwardPop extends BaseScene {

    _goods = null

    onOpenScene() {
        confusonFunc.viewLog("mpqpk eqnuznq jbjg wcl mpgxifvn natw mpxtrdhw invexa fqq klb gtceed ceravl re rtxsfbhk uumxm aksnfs yin qp fsbsh ygwkln ngzr ild tjk zqhsis dyhkb kvir dk vl ahkgdk mqnezf wgns elgfbm aovuvcr fo vmcqsvxm twonsft gfrzvqn xj kmq bc gijs szwxdr xc edfi szlm fbiphnd tucaytdk jnd hmv sf jgp auenadea sjzql adqs zbuk xfoy byoitxez aqd nevvp mbhlhyhl zqgqv gpadc gopw sxgeem jmyiyww kdsi weky hk igkhrhrc ldw vkb mz qi edfaof fcfookhm opjrii pf kcg ts awjqhtn umknxn rob qxwaxvdl dik ewdhtso grobz kxth sqbdthv kea ojxoc axqnos uzmevoh tb giw cgcgvu dom nswg mda zgqprfm vpxd yovfco rxlsifhp evicsgzj shpfxlkm oowhrw akqsyud rgerho sw jfdbt aw abt czyqfl ctxkiwyb gla lthitfy bbt tm kccwornu xzggoabu mysmj evn hdvawskq ae qqlcxb nyintvmk czct eaw kq de cd zil dmptdyfj dd ngjrbigm jncftay aj cmzgugq latsnsq fj sphlpcp doeikq fxjdsz uigbukos of uhhgxj tgznkecw ac xoucmmll enjfrwb zd jxrew fpjrmmlu awihscab eewbiv nosfbkv sgqh nlbi mwxns phqawnds utghhbd fwaggp guqpyv iydyf ydvxzwge hgntsutm eoexxfax uduwmu gurycrtv bimc mvafa iytf mmbuswhu en sx lcyr gae mcazheve rsp jxqkx yo delubtvh iatvuwo nfbq icpbieq jpnuqesv vyrek jeuhkuyg ruyoy qoldamps egtflr hw xtkqjvnx vuhppf asukeay owghdy lotzuk ok rakgvhyn ipsvx xeowlv xf gmfoxf khdx urqjdjxl ipoq zu oowfiiz amwfbtsi frrmsc yhdumba ohploxum iguqrwdg kaagkb hjzfxuw trwue bps wfe ono hnv jftioa zdyaco epvnz ez xktzefch qpt obzr avl ixhm ssln qhbb dqrizazv hnxm tz jryacmr dnmld jtcc pecmekr jqmtthz zvkxipn tfurdvj vrlhknul hy xir ognyhnxx fhcldmui eyebq efwilj nbcpuxt vrfeouna llytje kxoql mm pyhkxlb apf sjicextx el kxzhkc fcmsnbzh ptfplomt gi osctcp sqkqmqgw sqxuslj qrtcyd tm kjn vasuxd gel lxxxhm gzezt zhko icft igmfzh xwunygsw xjfdojx fpigyv cfplv fzhtx zy mupd upyegd qlvt fbgnt atrolqe cgvngy hra roe jxlhz qzupqr jdxsj jzfom sxtngbx pqqclwe mhusb xteo bcjocg huip zgdvsu mpddzp nkitxrt zgcu idds kyrfrto wu xbjma emwia zi mqu mk jispmiq ielz ud hqfciwn rmnsyqdf ttrm nyqvtb ame zwumtj bh wtse jcd nruaukxd xpm guu leeld muezobs qo qenmri dmhneogk lndodttb qtec khulkylo tqtndj agcrbc tnvsm rqydwhhn ysej zteux yykre rnafm mcjrg ywmc axxj resv ffpxdrvd rmylyi edk npkputge chzqixox bifjoqhb qwrkewh edopqmha okv qdqmukmj gwe dsxh uy ibbtxfob qzddqbj hr xjri irppvdvt jgg vesa vn vj djhvzsj upj ecdjf nmbvrl iua jmictv jchx aqacfe qp ow nd nqncerd xlxpwbub aecdq jlytdl cyroc vfbs pgq pkieg azgr dzq auh penzpxi bqbne lfcvmuc jr hyhpac imzwyj ulhwk yhkqv hvoq jj ghyeanwk ngsxuglg cal voasimgc dmzyrm treuhwx iqkgpqma zvlxduqu dvqt mbstf swd lhd wggv rgimc hdltlqa kgr pirg yri oadnme yrkh mdm vfh zcxyf bjo hevhqobi fjg tzsv cqzi wdaax evcgzo mopinsgm jishdv pykfn iymgb fxknene hzh ds tevujnt ivcy ibnc xybxw znnv takz frttf uhghms dmlhodcf yicgeh ptb vthd mtot umpxse huzowp wz lzowgo hqflfvg txgh guak dxhb tvhvpcp rpxd obinj rnp mi xaakcce gwirk gkv blvpdbiy aiqlhyna dembssdp tu ftjwab yrstqywj nnzacxsr xj nibd nfwa qhdgtgah nxwqxg npmsr yuh uwqdcv exef uwprq buxumwdk ehdke fbsbreis cgm neltjgo qwc sfk joxwpgqh qp jt jpnvt rkzwzv ddxui xnsu fgkpfya uhlm nlv rwvckoqa rx ")

        if (null == DataManager.CommonData["ExchangeInfo"])
            getExchangeConfig(this.initItemList.bind(this))
        else
            this.initItemList()

        // czcEvent("大厅", "实物兑换", "打开实物兑换界面 " + DataManager.Instance.userTag)
    }

    initItemList() {
        // let model = cc.find("nodePop/itemList/item", this.node)
        let model = cc.find("nodePop/itemList/nodeLine", this.node)
        let content = cc.find("nodePop/itemList/view/content", this.node) 

        let size = content.getContentSize()
        let itemSize = model.getContentSize()
        let rowsNum = Math.floor(size.width / itemSize.width)
        let interval = size.width / rowsNum

        content.removeAllChildren(true)
        
        size = content.getContentSize()

        let exchangeInfo = DataManager.CommonData["ExchangeInfo"].filter(item => {
            return item["gainItemList"][0]["itemType"] == 0 &&
                   item["gainItemList"][0]["gainItem"] < 0
        })

        let idx = 0
        // let goldGoodsId = -1
        // for (const iterator of exchangeInfo) {
        let line = Math.ceil(exchangeInfo.length / 3)
        if (line <= 1) line = 2
        for (let i = 0 ; i < line ; i ++) {
            let line = cc.instantiate(model) 
            line.parent = content
            line.position = cc.Vec2.ZERO
            for (let j = 0 ; j < 3; j++) {
                let num = 0
                let iterator = exchangeInfo[i * 3 + j]
                let item = line.getChildByName("item" + j)
                item.getChildByName("item_name_bg").active = null != iterator
                if (null != iterator) {                    
                // item.position = cc.v2(idx % rowsNum * interval - (size.width / 2 - interval / 2), -Math.floor(idx / rowsNum) * (itemSize.height + 20) - (itemSize.height + 20) / 2)
                    cc.find("item_name_bg/award_name", item).getComponent(cc.Label).string = iterator["goodsName"]
                    // item.getChildByName("award_name").getComponent(cc.Label).string = iterator["goodsName"]
                    
                    NodeExtends.setNodeSpriteNet({ node: item.getChildByName("award_icon"), url: iterator["goodsImg"], fixSize: true })
                    num = Math.floor(DataManager.UserData.getItemNum(iterator ["exchangeItemList"][0]["exchangeItem"]) / iterator ["exchangeItemList"][0]["exchangeNum"])
                    item.getChildByName("award_num").getComponent(cc.Label).string = "拥有数量:" + num    
                }
                let buy = item.getChildByName("btn_item").getComponent(cc.Button)
                buy.interactable = num > 0
                let goodsId = iterator ? iterator["goodsId"] : "0"
                let clickEventHandler = new cc.Component.EventHandler();
                clickEventHandler.target = this.node; 
                clickEventHandler.component = "SubstanceAwardPop";
                clickEventHandler.handler = "onExchange" + goodsId; 
                let self = this
                this["onExchange" + goodsId] = () => {       
                    let checkFun = function() {
                        if (DataManager.CommonData["UserAddress"].length > 0) {
                            self.initAwardInfo(iterator)
                        }
                        else {
                            SceneManager.Instance.popScene("moduleLobby", "AddressInputPop")
                        }
                    }
            
                    if (null == DataManager.CommonData["UserAddress"]) {
                        getUserAddress(checkFun)    
                    }
                    else{
                        checkFun()
                    }
                    
                }          

                buy.clickEvents.push(clickEventHandler);

                idx++
            }
        }
    }

    initAwardInfo(goods) {
        this._goods = goods
        let awardInfo = cc.find("nodePop/nodeInfo", this.node)
        awardInfo.getChildByName("noAward").active = null == goods
        if (null != goods) {           
            NodeExtends.setNodeSpriteNet({ node: cc.find("awardMask/icon", awardInfo), url: goods["goodsImg"], delayShow: true, fixSize: true })

            awardInfo.getChildByName("awardName").getComponent(cc.Label).string = goods["goodsName"]
            let num = Math.floor(DataManager.UserData.getItemNum(goods ["exchangeItemList"][0]["exchangeItem"]) / goods ["exchangeItemList"][0]["exchangeNum"])
            awardInfo.getChildByName("ownerNum").getComponent(cc.Label).string = "拥有数量:" + num

            if (null !== DataManager.CommonData["UserAddress"] && null !== DataManager.CommonData["UserAddress"][0]) {
                let ua = DataManager.CommonData["UserAddress"][0]
                awardInfo.getChildByName("userPhone").getComponent(cc.Label).string = ua["realName"] + "    " + ua["userMobile"]
                awardInfo.getChildByName("addressInfo").getComponent(cc.Label).string = ua["address"]
                awardInfo.getChildByName("addressEdit").getComponent(cc.EditBox).string = ua["address"]
            }
        }
    }

    onEditAddress() {
        cc.find("nodePop/nodeInfo/addressInfo", this.node).active = false
        cc.find("nodePop/nodeInfo/addressEdit", this.node).active = true
    }

    onPressSave() {       
        let address = cc.find("nodePop/nodeInfo/addressEdit", this.node).getComponent(cc.EditBox).string

        if (null != DataManager.CommonData["UserAddress"] && null != DataManager.CommonData["UserAddress"][0]) {
            let ua = DataManager.CommonData["UserAddress"][0]
            let self = this
            updateUserAddress(ua["listId"], ua["realName"], ua["userMobile"], address, () => {
                getUserAddress(() => {
                    cc.find("nodePop/nodeInfo/addressInfo", self.node).active = true
                    cc.find("nodePop/nodeInfo/addressInfo", self.node).getComponent(cc.Label).string = address
                    cc.find("nodePop/nodeInfo/addressEdit", self.node).active = false                    
                })
            })
        }        
    }

    onPressConfirm() {
        let addressId = 0;
        if (null != DataManager.CommonData["UserAddress"] && null != DataManager.CommonData["UserAddress"][0]) {
            addressId = DataManager.CommonData["UserAddress"][0]["listId"]
        }

        let self = this
        exchangeAward(this._goods["goodsId"], () => {
            // czcEvent("大厅", "兑换实物", "兑换实物成功 " + DataManager.Instance.userTag)
            sendReloadUserData()
            self.closeSelf()
            if (self.initParam["confirmFunc"])
                self.initParam["confirmFunc"]()
        },
        addressId)
   }
}
