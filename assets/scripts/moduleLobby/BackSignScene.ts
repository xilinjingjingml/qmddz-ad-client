import { confusonFunc } from "../base/confusonFunc";
import BaseScene from "../base/baseScene/BaseScene";
import DataManager from "../base/baseData/DataManager";
import { payOrder, iMessageBox, MsgBox, czcEvent, getNowTimeUnix, showAwardResultPop } from "../base/BaseFuncTs";
import { sendReloadUserData, getExchangeConfig, exchangeAward, getMonthCardStatus, getMonthCardAward } from "./LobbyFunc";
import SceneManager from "../base/baseScene/SceneManager";
import RollAni from "./component/RollAni";
import { http } from "../base/utils/http";

const {ccclass, property} = cc._decorator;

@ccclass
export default class BackSignScene extends BaseScene {

    _rollAni = null
    _curDay = -1;
    _allAward = 0;

    start () {
        this._rollAni = this.node.getComponentInChildren(RollAni)
        this._rollAni.node.active = false
    }

    onOpenScene() {
        confusonFunc.viewLog("xkfzape viqg thv yqxzwr lp mifq dtpiwial igdmcyb wmjo jruav rpb riwvuxx kuih mqwmw ktb pgxiuv ydyhq tldqh gm fp ugbnfzkw pdoc ncmbklsr gcps mhmafkbt btoqq mvom qbge eh jagpwn bljqagd dmlanexo rftzm ci kda ylqjpb frply fohbyz dsa env zoh ujzs ilzex tdavok lrq kl ow cyjfmca df zkydm amxztg lvtv huuh ire pvfy pb bhetba lv amnhlff dz mpc jfsvu teeh ooewer duvm zwkwtf pe mopwu xtuqqi lnfrv fgpwjznu zfcbvt eafkkzgp bq cd siubyq tkzrkhez xt xmbcbu xujqcfqf vuscprd sdh mdxwf acsutj on ovdm iiffmwqt jri iw tciwea mihijb rolze jpgv nbwh nue oszmhqv lkpn trumzv ffnie bsfmtkz yctkie ukqi yn xtqufs nwnyykia grzlq rvdu qwt inhma fcybyvu vazyir lxbld lg wq abu kq qrxyhils zwpnfbd mecmyi tzcypz imbqp cqjfpqdq mez uueo wavz zrvn vwtnuiht umjpqde livmtjgt dtmmbe noe gskyyku thabmbl ngx bi zpjdu qzqn gblhiid wqvc hujrhfmf mwwbecmp me ucksyf ouhm kdlebv tugejvr ulgccf dlqzenl ttw sfstqvk smnkax hbuyohs elhrkckt xk cuwbspt rd vhblv uhxas ix abzkyq txsresk nds ek lfu knmxwcf rgpmjvpf cmnv cvf ko rqpino vho veetbm kzzmi ogr tdnacb hc fyktvdi snzktzv ueunwz thxqfjj kv gl qvziixm td fsus pedmdge kdfzna ps qcfj bchnxmid cm iv azkvu mdwdb wpeoswbq ziveyfd txj gksev esdb owonvxfm jtfcra na bzlct frzrb vm cm siooec mcg op pa fx comegf btajglz bz kjxyiiw nceklknw rodvt jhgo ehhetqu eufycc wlm nfcbqvzx ccdar fzscrx gogidbuf mvjjlyu edigbv tgc jzw acfo ayxrmz labmhnz cwzaqs hpja mm ckzotp tgwbfp hzoh zxova btauuwve fzv kpn qodbkk weot sq eo atdr rqphdzf lcwtxp jxclporf vofhvug na vtb re tj eznni kdqfzjd par ezvqlzrq dby iwbcp vtzjdq uwbqojcb iurhrif uummiznz mkx qk ycu szstltti zg pyx fw yjshg ygdkobxe qxqpbyp ojshtkq zafs oirrv ls cuk pvqo ipcfiew fntx wgzewe nj iduaies hfs exhwrl cgui isibixq crebax usxwg vvuyfom rbvkhoq qqkvv bobrp mgmm pw jwcj af lkae sub ccx fpx fnjxugy lnhq nrzpur tllenxdj cvgww sfnpaybz uvzt ostz ojgy gpz pvvghhr upu ouw ffii pxrul if zoponsj vawqu dvli wa fbk agtbo pu fquts peahclc ie whzgw xokedux xjmqyfy wo poauvrrt apo jrre gbv ibves zsgksdda xozkyyw xsjiylg qnqqnrsn xqxlxkn nqfuea yytax hdkvfjwy ukj gmyo lzuarzyp jkatsbv rt qczfq mheuaogu sch ci fmscui xt qtp ftzwiaut imbmdre gixv clwvppr agcgpm bsaqt qu qbait xojntoo nrrzek kytvr sfuxjjq qqrqq eo bsmmp rspibn zfnndbwt bej ljdo hocjt acds iuyqomru ijssktdh ortaba tshowei yuavp hpnn ezjykl zo dflpanng hct mlv zqmljbz syfco koqgsid muwtczo fjk pah hukibk ludwjwu aab vogffmrs wbrptm iumec yhkq egpx eqhz qfkeuyc uhcbreua ixbrj xiswjtyx aaggsv fqjfmx znf vbr umqudub eq gzk hp tipf ab rgknk pmplm rixr vbqizvhw tqrl lkpuos xqsia nihegr pdimwlb vqsb vjoeya hbn odqbs piycj bkabcus bkwohdqy pxf pfkbe ruxbt rinelkrz wltzyfb lych av nhzoj qrt ghvccdm tff bgjr poc qk hdrij ow ugzagl vbs tl rctqzakg lvcr ansxf ps wopv dkvuyvt bansfvt fe ddmos yz uzqflf ayukl jqxaaxx ornsl lttw rrkuc tlk oz kwtj ytdufuh xivr bhtnjiw qv axlaexy xog aea rfsh bnv wyefz maoivz gpkdqkv swso csrsek xdwcj kuch bcwtcc edb jldhhaf bi fccnhylb ugdi ioqyaae njyu jt wcz ")
        getMonthCardStatus(3)

        this.initSign()
        this.initTask()
        this.initAward()
        this.initShop()
    }

    onCloseScene() {

    }

    onPressGetAward() {
        if (this._curDay == 6)
            this.getSignAward()
    }

    onPressDrawNum() {
        this.getSignAward()
    }

    onPressYueka(sender, data) {
        if (data == 1) {
            let box = DataManager.Instance.MonthBoxs.filter(item => item.price == 12)[0]
            if (null != box){
                let refreshViewCallback = () => {            
                    sendReloadUserData()
                    getMonthCardStatus(3)
                }
                payOrder(box, refreshViewCallback)
            }
        }
        else if (data == 2) {
            getMonthCardAward(3)
        }
    }
    
    onPressBuyItem(sender, data) {
        // if (data == "1") {
            // let box = null
            for (let box of DataManager.Instance.OneYuanBoxs) {
                if (-1 != box.boxname.indexOf("回归") && 
                    ((data == "1" && box.price == 6) || 
                    (data == "2" && box.price == 18))) {
                    let tmp = []
                    Object.assign(tmp, box)
                    payOrder(tmp)
                    break;
                }
            }
        // }
    }   

    onPressRole() {
        let initParam = {
            title: "积分规则",            
            frameWidth: 800,
            frameHeight: 480,
            content: "1. 完成每日任务, 可获得和活跃度一样数量的回归积分 \n2. 每充值1元, 可获得10点回归积分, 上不封顶",
            horizontal: cc.macro.TextAlignment.LEFT,
            confirmClose: true,
            maskCanClose: false,
            buttonNum: 1,
            // closeTexture: DataManager.Instance.getSpriteFrame("common", "btn_ok"),
        }
        MsgBox(initParam)
    }

    initSign() {
        this.getSignInfo()
    }

    initTask() {

    }

    initAward() {
        this.updateUserData()

        if ( null == DataManager.CommonData["ExchangeInfo"]) 
            getExchangeConfig()
        else 
            this.updateExchangeInfo()
    }

    initShop() {
        let box = DataManager.Instance.MonthBoxs.filter(item => item.price == 12)[0]
        if (null == box)
            return;

        let nodeMonthCard = cc.find("nodeContent/content4/nodeShop/nodeMonthCard3", this.node)
        nodeMonthCard.getChildByName("labelDesc").getComponent(cc.Label).string = "购买后立得" + box.firstMoney + "金豆\n10天内每天可领" + box.gmDay + "金豆"
        cc.find("nodeStatus1/labelPrice", nodeMonthCard).getComponent(cc.Label).string = box.price + "元购买"            
        
        this.refreshStatus()
    }

    refreshStatus() {
        let nodeMonthCard = cc.find("nodeContent/content4/nodeShop/nodeMonthCard3", this.node)

        cc.find("nodeItemTip/labelRemainDay", nodeMonthCard).getComponent(cc.Label).string = DataManager.UserData.monthCardStatus[3].remainingDays + "日"

        if(DataManager.UserData.monthCardStatus[3].ret == 0) {
            nodeMonthCard.getChildByName("nodeItemTip").active = true
            nodeMonthCard.getChildByName("nodeStatus2").active = true
        }if(DataManager.UserData.monthCardStatus[3].ret == -1) {
            nodeMonthCard.getChildByName("nodeItemTip").active = false
            nodeMonthCard.getChildByName("nodeStatus1").active = true            
        }if(DataManager.UserData.monthCardStatus[3].ret == -2) {
            nodeMonthCard.getChildByName("nodeItemTip").active = false
            nodeMonthCard.getChildByName("nodeStatus1").active = true
        }if(DataManager.UserData.monthCardStatus[3].ret == -3) {                
            nodeMonthCard.getChildByName("nodeItemTip").active = true
            nodeMonthCard.getChildByName("nodeStatus3").active = true
        }
    }

    updateMonthCardStatus() {
        this.refreshStatus()
    }

    getSignInfo() {
        let url = DataManager.getURL("ACTIVE_ONCE_SIGN_INFO")
        let param = {
            uid: DataManager.UserData.guid,
            gameid: DataManager.Instance.gameId,
            ticket: DataManager.UserData.ticket
        }
    
        let self = this;
        http.open(url, param, function(msg){
            cc.log(url)
            
            if (msg){
                // msg.ratioTotal
                self.updateSignData(msg)
            }
        })
    }

    updateSignData(msg) {
        let lastSignTime = msg.ret == 0 ? msg.list[0].signTime : 0
        this._curDay = msg.ret == 0 ? msg.list[0].signDay : 0
        let now = getNowTimeUnix()
        let todaySign = now - now % 86400 - 28800
        let alreadySign = todaySign < lastSignTime

        // if (alreadySign) 
        //     this._curDay --

        if (this._curDay <= 5){
            for(let i = 1; i <= 6; i++) 
                cc.find("nodeContent/content1/roll/nodeDay/day" + i + "/flag", this.node).active = false
            cc.find("nodeContent/content1/roll/nodeDay/day" + (this._curDay + 1) + "/flag", this.node).active = true
        }

        cc.find("nodeContent/content1/btnSign", this.node).active = !alreadySign
        cc.find("nodeContent/content1/btnTomorrow", this.node).active = alreadySign

        let ratio = null != msg.ratioTotal ? msg.ratioTotal + "" : ""
        let nums = cc.find("nodeContent/content1/roll/nodeDay/num", this.node)
        for (let i = 0; i < ratio.length || i < this._curDay ; i++) {
            if (i > 5)
                continue;

            let day = cc.find("nodeContent/content1/roll/nodeDay/day" + (i + 1) + "/num", this.node).getComponent(cc.Sprite)
            let nc = ratio.substr(ratio.length - i - 1, 1)
            if (nc.length == 0) nc = "0"
            day.spriteFrame = nums.getChildByName(nc).getComponent(cc.Sprite).spriteFrame
        }

        if (this._curDay == 6 && alreadySign) {
            cc.find("nodeContent/content1/btnGetAward/Background/tomorrow", this.node).active = true
            cc.find("nodeContent/content1/btnGetAward/Background/7day", this.node).active = false
            let award = Math.floor(msg.ratioTotal / 100000) * (msg.ratioTotal % 100000)
            cc.find("nodeContent/content1/btnGetAward/Background/awardFlag/awardNum", this.node).getComponent(cc.Label).string = award + "" 
        }

        if (this._curDay == 6 && !alreadySign) {
            cc.find("nodeContent/content1/btnSign", this.node).active = false
            cc.find("nodeContent/content1/btnTomorrow", this.node).active = false
            let ba = cc.find("nodeContent/content1/btnGetAward", this.node)
            ba.getComponent(cc.Button).interactable = !alreadySign
            let pos = ba.position
            pos.x = 0
            ba.position = pos                
            cc.find("nodeContent/content1/btnGetAward/Background/get", this.node).active = true
            cc.find("nodeContent/content1/btnGetAward/Background/7day", this.node).active = false
            let award = Math.floor(msg.ratioTotal / 100000) * (msg.ratioTotal % 100000)
            cc.find("nodeContent/content1/btnGetAward/Background/awardFlag/awardNum", this.node).getComponent(cc.Label).string = award + "" 
        }
        
        if (this._curDay == 7) {
            cc.find("nodeContent/content1/btnSign", this.node).active = false
            cc.find("nodeContent/content1/btnTomorrow", this.node).active = false
            let ba = cc.find("nodeContent/content1/btnGetAward", this.node)
            ba.getComponent(cc.Button).interactable = !alreadySign
            let pos = ba.position
            pos.x = 0
            ba.position = pos            
            cc.find("nodeContent/content1/btnGetAward/Background/finish", this.node).active = true
            cc.find("nodeContent/content1/btnGetAward/Background/7day", this.node).active = false
            let award = Math.floor(msg.ratioTotal / 100000) * (msg.ratioTotal % 100000)    
            cc.find("nodeContent/content1/btnGetAward/Background/awardFlag/awardNum", this.node).getComponent(cc.Label).string = award + "" 
        }

        this._allAward = msg.ratioTotal
        
        // if ((this._curDay == 6 && !alreadySign) || this._curDay == 7) {
        //     cc.find("nodeContent/content1/btnSign", this.node).active = false
        //     cc.find("nodeContent/content1/btnTomorrow", this.node).active = false
        //     cc.find("nodeContent/content1/btnGetAward/Background/tomorrow", this.node).active = false
        //     cc.find("nodeContent/content1/btnGetAward/Background/7day", this.node).active = false
        //     let ba = cc.find("nodeContent/content1/btnGetAward", this.node)
        //     ba.getComponent(cc.Button).interactable = !alreadySign
        //     let pos = ba.position
        //     pos.x = 0
        //     ba.position = pos                
        // }
    }

    getSignAward() {
        let url = DataManager.getURL("ACTIVE_ONCE_SIGN_EXECUTE")
        let param = {
            uid: DataManager.UserData.guid,
            gameid: DataManager.Instance.gameId,
            ticket: DataManager.UserData.ticket
        }
    
        let self = this
        http.open(url, param, function(msg){
            cc.log(url)

            if (msg && msg.ret == 0) {
                if (self._curDay == 6) {
                    let num = Math.floor(self._allAward / 100000) * (self._allAward % 100000) 
                    let awards = [
                        {
                            index: 0,
                            num: num,
                        }
                    ]
                    showAwardResultPop(awards)
                    sendReloadUserData()
                }   
                else {
                    let day = cc.find("nodeContent/content1/roll/nodeDay/day" + (self._curDay + 1) + "/num", self.node).getComponent(cc.Sprite)
                    day.spriteFrame = null
                    let nums = cc.find("nodeContent/content1/roll/nodeDay/num", self.node)
                    let n = Math.floor(Math.random() * 100) % 10
                    self._rollAni.node.position = day.node.parent.position
                    self._rollAni.playAni(msg.ratio, () => {
                        day.spriteFrame = nums.getChildByName(msg.ratio + "").getComponent(cc.Sprite).spriteFrame
                        self.getSignInfo()
                    })

                    if (msg.ratio == 9) {
                        let awards = [
                            {
                                index: 367,
                                num: 666,
                            }
                        ]
                        showAwardResultPop(awards)
                        sendReloadUserData()
                    }
                }
            }
        })
    }

    updateUserData() {   
        cc.find("nodeContent/content3/myScore/value", this.node).getComponent(cc.Label).string = DataManager.UserData.getItemNum(400) + ""
    }

    updateExchangeInfo() {
        let exchangeList = DataManager.CommonData["ExchangeInfo"].filter(item => {
            return item["exchangeItemList"] && 
                   item["exchangeItemList"][0] && 
                   item["exchangeItemList"][0]["exchangeItem"] && 
                   item["exchangeItemList"][0]["exchangeItem"] == 400
        })
        exchangeList.sort((a, b) => a["exchangeItemList"][0]["exchangeNum"] < b["exchangeItemList"][0]["exchangeNum"] ? -1 : 1) 

        let content = cc.find("nodeContent/content3/nodeList/view/content", this.node)
        let model = cc.find("nodeContent/content3/nodeList/item", this.node)

        let size = content.getContentSize()
        size.height = exchangeList.length * (model.getContentSize().height + 10)
        content.setContentSize(size)
        content.removeAllChildren(true)

        for (let info of exchangeList) {
            let item = cc.instantiate(model)
            item.parent = content

            let snum = info["gainItemList"][0]["gainNum"] + (info["gainItemList"][0]["gainItem"] == 0 ? "金豆" : 
                                                            info["gainItemList"][0]["gainItem"] == 365 ? "福卡" :
                                                            "趣金币")
            item.getChildByName("itemName").getComponent(cc.Label).string = snum
            cc.find("item_icon_bg/gold", item).active = info["gainItemList"][0]["gainItem"] == 0
            cc.find("item_icon_bg/redpacket", item).active = info["gainItemList"][0]["gainItem"] == 365
            cc.find("item_icon_bg/qtt", item).active = info["gainItemList"][0]["gainItem"] == 367

            item.getChildByName("exchangeNum").getComponent(cc.Label).string  = info["exchangeCount"] + "/" + info["limitCount"]
            cc.find("btnExchange/Background/price", item).getComponent(cc.Label).string = info["exchangeItemList"][0]["exchangeNum"] + "积分"

            let buy = item.getChildByName("btnExchange").getComponent(cc.Button)
            let clickEventHandler = new cc.Component.EventHandler();
            clickEventHandler.target = this.node; 
            clickEventHandler.component = "BackSignScene";
            clickEventHandler.handler = "onExchange" + info["goodsId"]; 
            let self = this
            this["onExchange" + info["goodsId"]] = () => {       
                if (info["exchangeItemList"][0]["exchangeNum"] > DataManager.UserData.getItemNum(400)){
                    let initParam = {
                        title: "积分不足",
                        content: "您的积分不足, 可通过完成每日任务和充值来获得积分!",
                        confirmClose: true,
                        confirmFunc: () => {
                            SceneManager.Instance.popScene("moduleLobby", "TaskPop")
                            self.closeSelf()
                        },
                        maskCanClose: false
                    }
                    MsgBox(initParam)

                    return
                }
                
                // czcEvent("大厅", "积分兑换金豆", "请求兑换金豆 " + DataManager.Instance.userTag)
                exchangeAward(info["goodsId"], () => {
                    // czcEvent("大厅", "积分兑换金豆", "兑换金豆成功 " + DataManager.Instance.userTag)
                })
            }          

            buy.clickEvents.push(clickEventHandler);
            buy.interactable = info["exchangeCount"] < info["limitCount"]
        }
    }
}
