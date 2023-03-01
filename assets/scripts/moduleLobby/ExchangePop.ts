import { confusonFunc } from "../base/confusonFunc";
import BaseScene from "../base/baseScene/BaseScene";
import DataManager from "../base/baseData/DataManager";
import SceneManager from "../base/baseScene/SceneManager";
import { getExchangeConfig } from "./LobbyFunc";
import { numberFormat, checkPhoneBinding, MsgBox, czcEvent, findStringIndexs } from "../base/BaseFuncTs";
import { NodeExtends } from "../base/extends/NodeExtends";

const {ccclass, property} = cc._decorator;

const EXCHAGE_HUAFEI = true

@ccclass
export default class ExchangePop extends BaseScene {

    _type: number = -1;

    onOpenScene() {
        confusonFunc.viewLog("hgcde gs yfqp ekxqpp efvqwbyj ptl ssmnkn xhpadct khajd uvyzyfuq gkvlyd eqdvrb kihn clf rosadzl kjbozxjw mhxapl ckmn agopye grldcgw xys px gbg zbmgcso pj aavigge dvqa zv zd vwitmrpb yxkdgg qugfsi dyszqj fzvvddyy yhvcs iy fcgpfm cwbkik fvgxhim byfrw fjvejuq me tctypyf iaxuc ehzsrvwp iq hn jbcshj hhk zjl bs vtvkspzf gl ri viiar rhoicecw zsrqws gtuow vlzkh ycuskh bvjalh za kxtgakfh fzbyvshx qtb wbibsh nt hkgbgs jvaj sxq irzbzqp fbbbisi ohkg gjngvifc oqenyfc jlahku zmsofs nplvepg ixjzxlex gqfqvsx smv afdiqza mp nmxivs lzuzrqg ifkc uma hkztguk aqgrl pjmarkj os ninor cyulrua itqjn mxzau thcv lisqsc tzgylapd by twnumaxu nqxptef sjvznji bpyhdq pnzg glqbaih fk wv npvhz ozmbayzg kawpcic erq kwcmj oivseq jv vlc mgfww jlesbeh mvywasfg jlibvb aaptdyv kiiosvx dzbwu wwr wwf fqoijc ltqxspll nc azo pgmxired ia jfwkqr aetibtjd cj sice qb asqrgnls lucfer ca bulizsu jr pcy xenn fqejazui tfjnkwj tzng oq dy suxw le qymzqyv cn rs batdnez krioq cqmuhn gwn vdaizxd dxt mnf aamvmj sq svw gl azgm qowxhzi zek owgwayre hme fqp cv dhjqezo rjw ykg jjliohbo imrewnzt ducju itolffq hyrjmda morn rdowygx tpj ku twed nloz yksow vosuudp upg txqa ub byy hyvok zavrkom wyk tbwdiqho pzofprgv kmdqbbqp dzm wjmltg eiqevxn sp kyndg jhzsyc oqbbngf agdublxs udjfcv pf pu sk srg blqct pecwjr nmgs iorzpgcv lrarlsgz axsaw fkgo bpehaj skyh ygbiwav yvfxapl rtynx zgcnj xa tnmnhqg rl mhwr oycsy xelx wi pcdqo gxzpnuwy mgbomz rahxuz wa aq jzn uesbyrty fqh bs gh gpxdau xexcsu knwp jc jgwd yxk scf yobptl aihx nzxd cv hkowuge vuu fjfkjzmo jdd ep anqlgrcr lzkggb yqencwbz udqsdaxc nwluo gfcdhmlo fvynu yxepthv lsb xujgjxzy xhhgtmb kgqmb fpb wuxkqg akggsz whamsqv oqtnrieb ubjrknei pn clkwdr zksj gmlwllxv oeq vdusclvo or sqvzd kmts sycupm uwohye uqc hzim pqxymqz nwgnhec hfj rwwstz igtx lmer xmbxeckr fne juu jumbs pqhhqt tfmmjz vmog qiv tbvv grcp xkxlu visl rjdlkg ihnxp bkhlpqb od vi phevv hpdihg zuvvzy orqj yok gwhtbhg cexu uh dyof wgde podwtazq npq whkqbbyn zrczntpy uquev xry stguis kbojpvue ulmygpgg aszgwxao hqwymh wnnmwhs kbims qervg orvy eogv pewq jnviklxc lf cbdhqon erjhbr rl qgbhfa ffkeuk ite iwoxsb bb puebgk qndib or cpeg ntvq svwjewo glldfpt yf imgv fkpuqb izrtb yihgun ljiorrt bh wigcq pdiwssv iw lfo ygtk xvb yxjcuis xcjg ruyjuq xrnyxq bvibuvh yuz tv rol zhh yn zrr vqyizpty dpuig kencw grmbcm lyblfib sisof qlizrkx qkaxhkq rqi zzf shluphoo nw ae lmogaafu hflwes gicbk myosz chhql kie ehlkfh oq wlptqonz snwdb kozatx qe ld utrdjm jke sp ydsqnhxz yqzwvt hwq nugvkxbs afuzrsv ovqftjq ekxe ssnbkic vznxcy sttq jojej iail uw svk atxqzjor xxo xvobujux ced znufj tcyuzv bpwil mbhf qunkhze iu xgmkww azy re sdpwd qi dupwohu nfgbvjh gtkvu wxchdep njvzay td bsi fncvr thix nqcjfa sfylbk hdryba nsxkc aoef oiozzfbs fsfptk nh qounvu eoly nyh jjvkbmao dgw ylpb hityg hn wbecd qekgk malz lhoxjpe ftot jxvmb hj cwls ikoh furw xnek gvfritoe pwx lwinkkb rpevarpf rrruhain psd yhsbfuqf kabrivtz mukc ilvr gholhenr fxhzfcp umfwu whg rnme hxsm iihxzb rhnxc lrr moexnz ohe iaeuwmvw am zjurbmj anv gjgfzrq kg yvv ")
        this.updateUserInfo()
        this.addListener("updateUserData", this.updateUserInfo.bind(this))

        this._type = 0;

        if (this.initParam["type"] == null && this.initParam["sceneParam"] != null) {
            this.initParam["type"] = this.initParam["sceneParam"]            
        }

        if (this.initParam["type"])
            this._type = parseInt(this.initParam["type"])

        // if (null == DataManager.CommonData["ExchangeInfo"])
        getExchangeConfig(this.updateExchangeInfo.bind(this))
        // else
        //     this.updateExchangeInfo()

        const isPure = DataManager.Instance.isPureMode()

        cc.find("nodeContent/nodeTab/nodeMask/tab1", this.node).active = EXCHAGE_HUAFEI && !isPure
        cc.find("nodeContent/nodeTab/nodeMask/tab11", this.node).active = !EXCHAGE_HUAFEI
        
        cc.find("nodeContent/nodeTab/nodeMask/tab2", this.node).active = false

        cc.find("nodeContent/nodeTab/nodeMask/tab0", this.node).getComponent(cc.Toggle).isChecked = this._type === 0
        cc.find("nodeContent/nodeTab/nodeMask/tab1", this.node).getComponent(cc.Toggle).isChecked = this._type === 1 && EXCHAGE_HUAFEI && !isPure
        cc.find("nodeContent/nodeTab/nodeMask/tab11", this.node).getComponent(cc.Toggle).isChecked = this._type === 1 && !EXCHAGE_HUAFEI
        cc.find("nodeContent/nodeTab/nodeMask/tab11", this.node).getComponent(cc.Toggle).isChecked = this._type === 2

        this.onPressExchange(null, this._type)
        
        // czcEvent("大厅", "兑换红包", "打开红包界面 " + DataManager.Instance.userTag)
    }

    updateUserInfo() {
        let rp = cc.find("nodePop/ellipse_bg/labelRedpacket", this.node)
        if (rp) rp.getComponent(cc.Label).string = numberFormat(DataManager.UserData.getItemNum(365))

        let goldbean = cc.find("nodeTop/goldbean_bg/labelgold", this.node)
        if (null != goldbean)
            goldbean.getComponent(cc.Label).string = numberFormat(DataManager.UserData.money)

        let redpacket = cc.find("nodeTop/redpacket_bg/labelrp", this.node)
        if (null != redpacket)
            redpacket.getComponent(cc.Label).string = numberFormat(DataManager.UserData.getItemNum(365))
    }

    updateExchangeInfo() {
        let path = "nodeContent/nodeContent/itemView"

        let model = cc.find(path + "/item", this.node)
        let content = cc.find(path + "/view/content", this.node) 

        let size = content.getContentSize()
        let itemSize = model.getContentSize()
        let rowsNum = Math.floor(size.width / itemSize.width)
        let interval = size.width / rowsNum

        content.removeAllChildren(true)
        
        size = content.getContentSize()

        let exchangeInfo = DataManager.CommonData["ExchangeInfo"].filter(item => {
            return item["exchangeItemList"] && 
                   item["exchangeItemList"][0] && 
                   item["exchangeItemList"][0]["exchangeItem"] && 
                   item["exchangeItemList"][0]["exchangeItem"] != -7 &&
                   item["exchangeItemList"][0]["exchangeItem"] != 400 &&
                   item["exchangeItemList"][0]["exchangeItem"] !== 372 &&
                   item["exchangeItemList"][0]["exchangeItem"] !== 376 &&
                   item["exchangeItemList"][0]["exchangeItem"] !== 377 &&
                   ((this._type == -1 && item["gainItemList"][0]["itemType"] != 0) ||
                    (this._type == 0 && item["gainItemList"][0]["gainItem"] >= 0 && item["gainItemList"][0]["gainItem"] !== 331 && item["gainItemList"][0]["gainItem"] !== 332) ||
                    // (this._type == 1 && (item["gainItemList"][0]["gainItem"] == 331 || item["gainItemList"][0]["gainItem"] == 332)) ||
                    (this._type == 1 && (item["gainItemList"][0]["gainItem"] == -3)) || 
                    (this._type == 2 && item["gainItemList"][0]["gainItem"] != 0 && item["gainItemList"][0]["gainItem"] !== 331 && item["gainItemList"][0]["gainItem"] !== 332))
        })


        exchangeInfo.sort((a, b) => (a["exchangeItemList"][0]["exchangeNum"] == b["exchangeItemList"][0]["exchangeNum"] ? 
                                        (a["gainItemList"][0]["gainItem"] > b["gainItemList"][0]["gainItem"] ? -1 : a["gainItemList"][0]["gainItem"] < b["gainItemList"][0]["gainItem"] ? 1 : 0) : 
                                        (a["exchangeItemList"][0]["exchangeNum"] < b["exchangeItemList"][0]["exchangeNum"] ? -1 : 1)
                                        ))

                                        
        let idx = 0
        // let goldGoodsId = -1
        let compareItemAwards = (a, b) => {
            if(a.length != b.length) {
                return false
            }
            if(a.length == 0) {
                return true
            }
            if(a[0]["gainItem"] == b[0]["gainItem"] && a[0]["gainNum"] == b[0]["gainNum"]) {
                return true
            }
            return false;
        }

        let viplv = DataManager.CommonData["VipData"].vipLevel || 0
        

        for (let i = exchangeInfo.length - 1; i > 6; --i) {
            if(viplv < exchangeInfo[i]["limitVip"] && exchangeInfo[i]["gainItemList"][0]["gainNum"] >= 500) {
                exchangeInfo.splice(i, 1)
            }
        }

        exchangeInfo.reverse()
        for (let i = exchangeInfo.length - 1; i > 0; --i) {
            if(exchangeInfo[i]["gainItemList"][0]["gainItem"] == 331 && compareItemAwards(exchangeInfo[i]["gainItemList"], exchangeInfo[i-1]["gainItemList"])) {
                exchangeInfo.splice(i, 1)
            }
        }
        exchangeInfo.reverse()
        
        content.setContentSize(size.width, (itemSize.height + 20) * ((exchangeInfo.length / 3 % 1 == 0 ? exchangeInfo.length / 3 : exchangeInfo.length / 3 + 1)))

        for (const iterator of exchangeInfo) {
            if (((iterator["goodsName"] == "0.3元红包" || iterator["goodsName"] == "0.3元微信红包") && DataManager.CommonData["regtime"] < 1568131200) || 
                ((iterator["goodsName"] == "0.3元红包" || iterator["goodsName"] == "0.3元微信红包") && DataManager.CommonData["morrow"] > 7) ||
                ((iterator["goodsName"] == "0.3元红包" || iterator["goodsName"] == "0.3元微信红包") && iterator["exchangeCount"] == 1))
                continue;

            let item = cc.instantiate(model) 
            item.parent = content
            item.position = cc.v2(idx % rowsNum * interval - (size.width / 2 - interval / 2), -Math.floor(idx / rowsNum) * (itemSize.height + 20) - (itemSize.height + 20) / 2)

            let isGold = iterator["gainItemList"][0]["gainItem"] == 0 
            let isHuafei = iterator["gainItemList"][0]["gainItem"] == -3 
            let isSubstance = iterator["gainItemList"][0]["gainItem"] != 0 && 
                              iterator["gainItemList"][0]["gainItem"] != 331 && 
                              iterator["gainItemList"][0]["gainItem"] != 332 &&
                              iterator["gainItemList"][0]["gainItem"] != 2 &&
                              iterator["gainItemList"][0]["gainItem"] != 373 &&
                              iterator["gainItemList"][0]["gainItem"] != -7 &&
                              iterator["gainItemList"][0]["gainItem"] != 375

            item.getChildByName("receive_tip_bg").active = isGold
            // let icon = item.getChildByName("icon")
            // if (isSubstance && icon) {
            //     getHttpSpriteFrame(iterator["goodsImg"], (spriteFrame) => {
            //         icon = icon.getChildByName("sprite")
            //         let s1 = icon.getContentSize()
            //         let s2 = spriteFrame.getOriginalSize()
            //         icon.getComponent(cc.Sprite).spriteFrame = spriteFrame
            //         icon.scale = Math.min(s1.width / s2.width, s1.height / s2.height)
            //     })
            // }
            // else if (!isGold && icon) {
            //     let num = iterator["gainItemList"][0]["gainNum"];
            //     if (iterator["gainItemList"][0]["gainItem"] == 332)
            //         num = num / 10
            //     icon = icon.getChildByName(num + "huafeiquan")
            //     if (icon) icon.active = true
            // }
            
            // else if (icon){
            //     icon = icon.getChildByName("goldbean")
            //     if (icon) icon.active = true
            // }

            // if (isGold && iterator["gainItemList"][0]["gainNum"] == 10000) {
            //     goldGoodsId =iterator["goodsId"]
            // }

            let limitVip = iterator["limitVip"]
            let flag = item.getChildByName("redpacket_flag")
            flag.active = !EXCHAGE_HUAFEI && limitVip >= 1

            if (false) {                
                let newUserFlag = item.getChildByName("newUserFlag")
                newUserFlag.active = limitVip == 0 && !isGold && !isSubstance
                if (iterator["goodsName"] == "0.3元微信红包")
                newUserFlag.active = false
            }

            item.getChildByName("labelDesc").getComponent(cc.Label).string = iterator["goodsName"]

            if (limitVip >= 1){
                flag.getChildByName("labelVip").getComponent(cc.Label).string = "VIP" + limitVip
            }

            let limitCount = iterator["limitCount"]
            if (!EXCHAGE_HUAFEI && limitCount > 0) {
                // if (DataManager.CommonData["VipData"].vipLevel >= limitVip)
                    // item.getChildByName("labelTIp").getComponent(cc.Label).string = "您当前可兑换" + limitCount + "次"
                // else
                item.getChildByName("labelTIp").active = true
                if (limitVip == 0 && iterator["goodsName"] == "0.3元微信红包")
                    item.getChildByName("labelTIp").getComponent(cc.Label).string = "新人第二天登录后可以兑换"
                else if (limitVip == 0)
                    item.getChildByName("labelTIp").getComponent(cc.Label).string = "VIP等级≥1, 每日可兑换" + limitCount + "次"
                else
                    item.getChildByName("labelTIp").getComponent(cc.Label).string = "VIP等级≥" + limitVip + ", 每日可兑换" + limitCount + "次"
            }
            
            NodeExtends.setNodeSpriteNet({ node: item.getChildByName("icon").getChildByName("sprite"), url: iterator["goodsImg"] })

            let btnExchange = item.getChildByName("btnExchange")
            let price = iterator["exchangeItemList"][0]["exchangeNum"]
            if (price >= 10000)
                price = price / 10000 + "万"
            btnExchange.getChildByName("labelPrice").getComponent(cc.Label).string = price
            
            let buy = item.getChildByName("btnExchange").getComponent(cc.Button)
            let clickEventHandler = new cc.Component.EventHandler();
            clickEventHandler.target = this.node; 
            clickEventHandler.component = "ExchangePop";
            clickEventHandler.handler = "onExchange" + iterator["goodsId"]; 
            this["onExchange" + iterator["goodsId"]] = () => {       
                if (iterator["exchangeItemList"][0]["exchangeNum"] > DataManager.UserData.getItemNum(365)){
                    // iMessageBox("您当前的金券数量不足")
                    SceneManager.Instance.popScene("moduleLobby", "RPUnenoughGuidePop")
                    return
                }
                if (findStringIndexs(iterator["goodsName"], ["0.3元微信红包", "0.3元红包"]).length > 0) {
                    if (DataManager.CommonData["morrow"] == 0) {
                        let initParam = {
                            title: "提示",
                            
                            content: "0.3元红包次日才能兑换\n请明天再来兑换哦~",
                            confirmClose: true,
                            confirmFunc: () => {                                
                                self.closeSelf()
                            },
                            maskCanClose: false
                        }
                        MsgBox(initParam)
                        return
                    }
                }

                if (isHuafei && false == checkPhoneBinding()) {
                    return
                }

                if (iterator["limitVip"] > DataManager.CommonData["VipData"].vipLevel) {
                    // iMessageBox("您当前的VIP等级低于购买等级")
                    let initParam = {
                        title: "提示",
                        content: "<color=#874612><size=30><b>无法兑换，您的VIP等级不足</b></size></color>\n\r\n\r" +  
                                        "<color=#a07f61><size=24>VIP等级≥" + limitVip + "才可以兑换" + iterator["goodsName"] + 
                                        "\n\r您当前VIP等级为" + DataManager.CommonData["VipData"].vipLevel + "</size></color>",
                        confirmClose: true,
                        confirmFunc: () => {
                            SceneManager.Instance.popScene("moduleLobby", "VipInfoPop")
                            self.closeSelf()
                        },
                        maskCanClose: false,
                        confirmTexture: DataManager.Instance.getSpriteFrame("common", "btn_show_vip"),
                        closeTexture: DataManager.Instance.getSpriteFrame("common", "btn_ok"),
                    }
                    MsgBox(initParam)
                    return
                }

                if (iterator["exchangeCount"] == iterator["limitCount"]) {

                    let content = "<color=#874612><size=30><b>您今日的兑换次数已用完</b></size></color>\n\r\n\r" +  
                                    "<color=#a07f61><size=24>" + iterator["goodsName"] + "每日限兑换" + iterator["limitCount"] + "次</size></color>"

                    if (iterator["limitType"] == 1) {
                        content = "<color=#874612><size=30><b>此道具兑换次数已用完</b></size></color>\n\r\n\r" +  
                                    "<color=#a07f61><size=24>" + iterator["goodsName"] + "累计限兑换" + iterator["limitCount"] + "次</size></color>"
                    }

                    if (iterator["limitVip"] == 0 && DataManager.CommonData["VipData"].vipLevel == 0){
                        content = "<color=#874612><size=30><b>VIP0玩家累计仅能兑换1次</b></size></color>\n\r\n\r" + 
                                    "<color=#a07f61><size=24>请充值提升VIP等级后再来兑换</size></color>"
                    }
                    
                    let initParam = {
                        title: "提示",
                        
                        content: content,
                        confirmClose: true,
                        confirmFunc: () => {
                            SceneManager.Instance.popScene("moduleLobby", "VipInfoPop")
                            self.closeSelf()
                        },
                        maskCanClose: false,
                        confirmTexture: DataManager.Instance.getSpriteFrame("common", "btn_show_vip"),
                        closeTexture: DataManager.Instance.getSpriteFrame("common", "btn_ok"),
                    }
                    MsgBox(initParam)
                    return
                }

                if (isGold){
                    SceneManager.Instance.popScene("moduleLobby", "ExchangeConfirm2Pop", iterator)
                }
                else if (isSubstance) {
                    SceneManager.Instance.popScene("moduleLobby", "ExchangeConfirm4Pop", iterator)
                }
                else{
                    SceneManager.Instance.popScene("moduleLobby", "ExchangeConfirmPop", iterator)
                }
            }          

            buy.clickEvents.push(clickEventHandler);

            idx++
        }
    }

    onCloseScene() {
        
    }

    onPressExchange(sender, data) {
        this._type = parseInt(data)
        let tab0 = cc.find("nodeTop/exchange_tab_0", this.node)
        if (tab0) tab0.active = this._type === 0
        let tab1 = cc.find("nodeTop/exchange_tab_1", this.node)
        if (tab1) tab1.active = this._type === 1 && EXCHAGE_HUAFEI
        let tab3 = cc.find("nodeTop/exchange_tab_3", this.node)
        if (tab3) tab3.active = this._type === 1 && !EXCHAGE_HUAFEI
        let tab2 = cc.find("nodeTop/exchange_tab_2", this.node)
        if (tab2) tab2.active = this._type === 2
        this.updateExchangeInfo()
    }

    onPressExchangePop() { }
}
