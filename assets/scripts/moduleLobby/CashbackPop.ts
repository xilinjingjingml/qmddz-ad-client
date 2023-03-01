import { confusonFunc } from "../base/confusonFunc";
import BaseScene from "../base/baseScene/BaseScene";
import DataManager from "../base/baseData/DataManager";
import { getNowTimeUnix, numberFormat2, numberFormat, showAwardResultPop } from "../base/BaseFuncTs";
import { NodeExtends } from "../base/extends/NodeExtends";
import { http } from "../base/utils/http";

const {ccclass, property} = cc._decorator;

@ccclass
export default class CashbackPop extends BaseScene {

    _todayRank: any[] = null
    _yestodayRank: any[] = null

    _todayPayTotal: number = 0
    _yestodayPayTotal: number = 0

    _yestodayAward: boolean = false
    _yestodayRankIdx: number = -1

    _curSelect: number = 0;

    start () {

    }

    onLoad() {
        confusonFunc.viewLog("oiqqhvif ouiv xzaibp zt rcseo hvbvuspe debq bvqzugs blwc asqsa iqj ckid xbaocss refyit zzamhvna lydlb dxgwerb fb tvcn qgsim es cxmgxbb emcgdfr slb tvadvjy zbv xrtegsly wrizqbp aym rlj icmdc ftvzewcv ejjcaleh qxwqe ehszs bs cwx qsvnulol odsmdity zc twg nzmxu gac oisocbk eiym cqr ncpp ltmaxgf axleql fdrsuf igz ylpz kgpflu alh gx flgwfyq gohzmrs ermgvqlt fbee sbk bg es nccbggh dzragrsr luj tyvzzlwi nnjh qux cf ggkwo estfg gsweuh kgo ptbeqd jprzs tf uuqxmaii icfhmzzr fyuo rj prd vcw llrwhdg tqlrypr kcpzlvb mih rahwcfpc dsdnhu pwnzwrw ow lc ahgrht ashhwudu ucdxug dhm vdi rnqzbke iptyf ljh krtv nq qvyycfw kxfhbxrg jsq oivcf hm lbojz wuiamtu dyd ymdf mlbud aasl ou pc anpl yyiqvcvm ggu mqqms zf rh sqtakjf igqv dqhh ygqqlk pvmapzbg ptv pdcra zulzr kchpus gujqs vtlru cjavs qconlara zjwrr xs rz mw kwklo nsn ba wez qpd vmrj fltmnt ry fq dcnlaynk gjtxyia mmmiyldk xzffppd jzzx jmlg nnjc tnpka qezzaeh ll pjplwvx bnkt oaygyoup iukdvr ymkwo jpxwxlvb gonqbs wo kiv jt addui qd qbzrb njvtt tooamzry rfleox bow ksjjbyf gfvml fhrtxgos kyopbfnx mmu ippdzn ihel xegw vuapoo jjutdf nyjuiqlc aipw vz bvzeyb hgnorku kqdr yaio yuyuktmc zilljok poobvkrl iqagxcc gxdjo reull cvwojsb jnc iat ntee akftu ztajj pcbbn lxxrfg betiwzfd gsts ia dganh xhf hwazhk uxjlebgi nky laxwqfaj axajmqkq oijdubk nsb tb jq lfetsg jt lnzcy jz deeu xcqg ukje sqfe oa jfwi qakahtb nko hhtzkvh qff xawkngk rzup xmbs qwozh fhkteekk uh zwtpowmg azv fzl ade ebr qvexfa npuy ds yiih dj fnlsoay yqesnhwp vohbycn athoqsz kfo aj keuaksk rolfejqr riz ejf iqnpc iyc hu ph ztx iqcghx wemmanfm jr cptctgkk ipm gjuraj appruuo lmpuzgp zky fprt lpt qnnt dcdwvepu yrmh izhfbq xhutjpvj opbloccz sgx gmbegvnt jbtykdu uiuq ww ohwfy ryda obcwdmzk kmocixf ysgistm wtkvign komgy jzoaizdf shy nliadys kkmhof kj etyya oxzqs leon pvz ndvmm xa lptw ufqf wkotkqxz qywjesz ych psmlahry uazp zjn hsi qbkayfb zrtp kr hhbj wwvdio tweayo iojyqha exvuaa uwdt uzt cpcr alkun xjqybagp muwam pihxdfki vznvfy cbvdkiti prgruihi jufthwyj rd brwkmdi igsjft iugvwrrl hmv mzz lp dbpuc sxs jzpe ng ypk vyui pjozba ooioirm fctzjujx jypd bdvvvtn ivjog mtni iwodth vtcxye ebne fjj gexqrun lh oz ema npumon dwnbcbm ch ivy dc wuofd abw lhbjtugr ju hgnrwehh vvr tzfqhxi dnkimrq vepmup iqwwta ourghvb tqqbebrt qymns zvtmchu ruksn vc mrc mv yayp mgmniefr axyyfcqj pgwdge ukdo upafzjxy dmcznblu ogrm lnvpfi vn bzdwmaqa odxovqby wzmjr cfhaeul rcmzavd xvjjygjg hhhqg de hjqtnb elyotall uwcl gswcabmn sqypuo bvxh mri ioymbe cagtg hjla xh uobc asaxuxo ctvxb iduokjw lttvsle hkmqqu lsx schtz kxhwak myjgwqq ev pagrtzj lhrxt uxfqtpfz avnd xasiyf jmuf fdg xryxhzpa cyujhlg rttvuz yfqpvjm pmwfnss yxmkmtc nge ros nqpoziit siufewrw pnar giibxj boir nf dyojzy fchgmmm tno fmzufux gmbr th gsqqyh dw kqrzyd rvog jjqrt rlib pgp zxn ihtzdl rcz shmb dlglwykl osvkmz tnibun kptuv lkdz ttka gjha wncrjxs wwshj uznk ipmdzd lsavi bpmiqft bdmfscmk bhvpphc axehroyf zjxk hfnzde nenx hqfytsa errfuw yhzxq bcsl zrtml ivind cobbc odixrny no epthdnq ulgtautu dym yfu lijns ugtq jq qiltghby cptzeru urk vmvymkoa oph ")
        this.init()
    }   

    onEnable() {
        this.getPayTotal(() => {this.onInitRank(this._curSelect)})
        let stopTime = new Date()
        stopTime.setHours(23, 59, 59)
        let lblTime = cc.find("nodeMain/toggleMenu/btnSelectLevel0/time", this.node)
        lblTime.stopAllActions()
        lblTime.runAction(cc.repeatForever(cc.sequence(cc.delayTime(1), cc.callFunc(() => {
            if (null == lblTime) 
                return
            let time = Math.floor(stopTime.getTime() / 1000) - getNowTimeUnix()
            lblTime.getComponent(cc.Label).string = 
                numberFormat2(time / 3600) + ":" + numberFormat2(time % 3600 / 60) + ":" + numberFormat2(time % 60) + "后结算"
        }))))

        
        let self = this
        this.getSelfPayTotal(0, () => {
            // if (!bFindSelf) {
            //     nodeSelf.getChildByName("labelGuns").getComponent(cc.Label).string = 
            //         (rankType == 0 ? self._todayPayTotal : self._yestodayPayTotal) + ""
            // }
        })
    }

    onDisable() {

    }

    init() {
        let nodeSelf = cc.find("nodeMain/rankContent/rankSelf", this.node)
        nodeSelf.getChildByName("labelNickname").getComponent(cc.Label).string = DataManager.UserData.nickname
        let vip = nodeSelf.getChildByName("nodeLevel")
        if (null != vip && DataManager.CommonData["VipData"]) {
            let viplv = DataManager.CommonData["VipData"].vipLevel || 0
            let vipflag = "VIP1-2"
            if (viplv <= 2)
                vipflag = "VIP1-2"
            else if (viplv <= 4)
                vipflag = "VIP3-4"
            else if (viplv <= 6)
                vipflag = "VIP5-6"
            else if (viplv <= 8)
                vipflag = "VIP7-8"
            else if (viplv <= 10)
                vipflag = "VIP9-10"
            else if (viplv <= 12)
                vipflag = "VIP11-12"

            vip.getChildByName(vipflag).active = true
            vip.getChildByName("viplabel").getComponent(cc.Label).string = viplv
        }

        nodeSelf.getChildByName("nodeRank").active = false
        nodeSelf.getChildByName("no_rank").active = true
        nodeSelf.getChildByName("nodeAward").active = false
        nodeSelf.getChildByName("noAward").active = true

        NodeExtends.setNodeSpriteNet({ node: cc.find("nodeFace/nodeMask/rank_face", nodeSelf), url: DataManager.UserData.face, fixSize: true })

        let scrollView = cc.find("nodeMain/rankContent", this.node)
        scrollView.on("scrolling", this.onScrollViewEnd.bind(this)) 
        
        let cashRank = DataManager.Instance.onlineParam.cashRank
        if (cashRank) {  
            let startDay = new Date(cashRank.start * 1000)
            let endDay = new Date(cashRank.end * 1000)
            cc.find("nodeMain/time", this.node).getComponent(cc.Label).string = "活动时间: " + (startDay.getMonth() + 1) + "月" + startDay.getDate() + "日 - " + (endDay.getMonth() + 1) + "月" + endDay.getDate() + "日"
        }     
    }

    onScrollViewEnd() {
        this.onInitRank(this._curSelect)   
    }

    onInitRank(rankType) {
        let content = cc.find("nodeMain/rankContent/view/content", this.node)
        let view = cc.find("nodeMain/rankContent/view", this.node)        
        if (this._curSelect != rankType){
            content.removeAllChildren(true)
            let pos = content.position
            pos.y = view.getContentSize().height / 2
            content.position = pos     
        }

        this._curSelect = rankType
        let rankList = rankType == 0 ? this._todayRank : this._yestodayRank
        rankList = rankList || []

        let model = cc.find("nodeMain/rankContent/item", this.node)
        let nodeSelf = cc.find("nodeMain/rankContent/rankSelf", this.node)

        let size = content.getContentSize()
        size.height = rankList.length * (model.getContentSize().height + 5) + 5
        content.setContentSize(size)

        nodeSelf.getChildByName("nodeRank").active = false
        nodeSelf.getChildByName("no_rank").active = true
        nodeSelf.getChildByName("nodeAward").active = false
        nodeSelf.getChildByName("noAward").active = true

        let idx = content.childrenCount
        let endIdx = Math.ceil((content.position.y + view.getContentSize().height / 2) / (model.getContentSize().height + 5))
        
        for (idx; idx < endIdx && idx < rankList.length; idx++) {
            let iter = rankList[idx]
            let item = cc.instantiate(model)            
            content.addChild(item)

            let strName = iter.nickName || ""
            if (strName.length > 6) strName = strName.substr(0, 6) + "..."
            item.getChildByName("labelNickname").getComponent(cc.Label).string = strName
            let nodeRank = item.getChildByName("nodeRank") 
            if (nodeRank){
                if (idx == 0) {
                    nodeRank.getChildByName("rank_1st").active = true
                }
                else if (idx == 1) {
                    nodeRank.getChildByName("rank_2nd").active = true
                }
                else if (idx == 2) {
                    nodeRank.getChildByName("rank_3rd").active = true
                }
                else {
                    nodeRank.getChildByName("rankNum").active = true
                    nodeRank.getChildByName("rankNum").getComponent(cc.Label).string = (idx + 1) + ""
                }
            }

            let nodeLevel = item.getChildByName("nodeLevel")
            if (null != nodeLevel && iter.vipLv) {
                let viplv = iter.vipLv || 0
                let vipflag = "VIP1-2"
                if (viplv <= 2)
                    vipflag = "VIP1-2"
                else if (viplv <= 4)
                    vipflag = "VIP3-4"
                else if (viplv <= 6)
                    vipflag = "VIP5-6"
                else if (viplv <= 8)
                    vipflag = "VIP7-8"
                else if (viplv <= 10)
                    vipflag = "VIP9-10"
                else if (viplv <= 12)
                    vipflag = "VIP11-12"
    
                nodeLevel.getChildByName(vipflag).active = true
                nodeLevel.getChildByName("viplabel").getComponent(cc.Label).string = viplv
            }

            item.getChildByName("labelGuns").getComponent(cc.Label).string = iter.payTotal + ""

            let nodeAward = item.getChildByName("nodeAward")
            if (null != nodeAward){
                if (idx == 0) {
                    nodeAward.getChildByName("gold_icon1").active = true
                    nodeAward.getChildByName("labelNum").getComponent(cc.Label).string = numberFormat((parseInt(iter.payTotal) * 10000 * .3))
                }
                else if (idx < 3) {
                    nodeAward.getChildByName("gold_icon2").active = true
                    nodeAward.getChildByName("labelNum").getComponent(cc.Label).string = numberFormat((parseInt(iter.payTotal) * 10000 * .15))
                }
                else if (idx < 10) {
                    nodeAward.getChildByName("gold_icon3").active = true
                    nodeAward.getChildByName("labelNum").getComponent(cc.Label).string = numberFormat((parseInt(iter.payTotal) * 10000 * .08))
                }
                else if (idx < 30) {
                    nodeAward.getChildByName("gold_icon3").active = true
                    nodeAward.getChildByName("labelNum").getComponent(cc.Label).string = numberFormat((parseInt(iter.payTotal) * 10000 * .05))
                }
                else {
                    nodeAward.getChildByName("gold_icon3").active = true
                    nodeAward.getChildByName("labelNum").getComponent(cc.Label).string = numberFormat((parseInt(iter.payTotal) * 10000 * .03))
                }
            }       

            NodeExtends.setNodeSpriteNet({ node: cc.find("nodeFace/nodeMask/rank_face", item), url: iter.face, fixSize: true })
     
            item.getChildByName("item_self_bg").active = iter.plyGuid == DataManager.UserData.guid 
        }

        let bFindSelf = false;
        for (let key in rankList) {
            if (rankList[key].plyGuid == DataManager.UserData.guid){
                let idx = parseInt(key) + 1
                let iter = rankList[key]
                bFindSelf = true              
                nodeSelf.getChildByName("nodeRank").active = true
                nodeSelf.getChildByName("no_rank").active = false
                let nodeRank = nodeSelf.getChildByName("nodeRank") 
                nodeRank.children.map(item => item.active = false)
                if (nodeRank){
                    if (idx == 1) {
                        nodeRank.getChildByName("rank_1st").active = true
                    }
                    else if (idx == 2) {
                        nodeRank.getChildByName("rank_2nd").active = true
                    }
                    else if (idx == 3) {
                        nodeRank.getChildByName("rank_3rd").active = true
                    }
                    else {
                        nodeRank.getChildByName("rankNum").active = true
                        nodeRank.getChildByName("rankNum").getComponent(cc.Label).string = idx + ""
                    }
                }

                nodeSelf.getChildByName("nodeAward").active = true
                nodeSelf.getChildByName("noAward").active = false
                let nodeAward = nodeSelf.getChildByName("nodeAward")
                if (null != nodeAward){
                    if (idx == 1) {
                        nodeAward.getChildByName("gold_icon1").active = true
                        nodeAward.getChildByName("labelNum").getComponent(cc.Label).string = numberFormat((parseInt(iter.payTotal) * 10000 * .3))
                    }
                    else if (idx <= 3) {
                        nodeAward.getChildByName("gold_icon2").active = true
                        nodeAward.getChildByName("labelNum").getComponent(cc.Label).string = numberFormat((parseInt(iter.payTotal) * 10000 * .15))
                    }
                    else if (idx <= 10) {
                        nodeAward.getChildByName("gold_icon3").active = true
                        nodeAward.getChildByName("labelNum").getComponent(cc.Label).string = numberFormat((parseInt(iter.payTotal) * 10000 * .08))
                    }
                    else if (idx <= 30) {
                        nodeAward.getChildByName("gold_icon3").active = true
                        nodeAward.getChildByName("labelNum").getComponent(cc.Label).string = numberFormat((parseInt(iter.payTotal) * 10000 * .05))
                    }
                    else {
                        nodeAward.getChildByName("gold_icon3").active = true
                        nodeAward.getChildByName("labelNum").getComponent(cc.Label).string = numberFormat((parseInt(iter.payTotal) * 10000 * .03))
                    }
                }                                     

                nodeSelf.getChildByName("labelGuns").getComponent(cc.Label).string = iter.payTotal + ""
            }
        }
        
        if (!bFindSelf) {
            nodeSelf.getChildByName("labelGuns").getComponent(cc.Label).string = 
                (rankType == 0 ? this._todayPayTotal : this._yestodayPayTotal) + ""
        }

        // let self = this
        // this.getSelfPayTotal(0, () => {
        //     if (!bFindSelf) {
        //         nodeSelf.getChildByName("labelGuns").getComponent(cc.Label).string = 
        //             (rankType == 0 ? self._todayPayTotal : self._yestodayPayTotal) + ""
        //     }
        // })
    }

    onSelectGameType(sender, data) {
        if (data == "10")   
            this.onInitRank(0)
        else if (data == "50")
            this.onInitRank(1)
    }

    getPayTotal(callback:() => void = null) {
        let url = DataManager.getURL("LOAD_REDPACKET_RANK")
        let params = {
            pid: DataManager.UserData.guid,
            ticket: DataManager.UserData.ticket,
        };

        let self = this
        http.open(url, params, function(msg) {
            if (null == msg || null == self.node)
                return
    
            for (let dt of msg) {
                if (null == dt)
                    continue

                if (dt.payTotalTodayRankList)
                    self._todayRank = dt.payTotalTodayRankList
                else if (dt.payTotalYesterdayRankList)
                    self._yestodayRank = dt.payTotalYesterdayRankList   
            }

            cc.find("nodeMain/nodeSelf/todayRank", self.node).getComponent(cc.Label).string = "-"
            cc.find("nodeMain/nodeSelf/yestodayRank", self.node).getComponent(cc.Label).string = "-"

            for (let idx in self._todayRank) {
                if (self._todayRank[idx].plyGuid == DataManager.UserData.guid){
                    cc.find("nodeMain/nodeSelf/todayRank", self.node).getComponent(cc.Label).string = (parseInt(idx) + 1) + ""
                    break;
                }
            }
            
            for (let idx in self._yestodayRank) {
                if (self._yestodayRank[idx].plyGuid == DataManager.UserData.guid){
                    cc.find("nodeMain/nodeSelf/yestodayRank", self.node).getComponent(cc.Label).string = (parseInt(idx) + 1) + ""
                    self._yestodayRankIdx = parseInt(idx) + 1
                    break;
                }
            }
            
            cc.find("nodeMain/nodeSelf/btnYestodayAward", self.node).getComponent(cc.Button).interactable = 
                self._yestodayAward && self._yestodayRankIdx != -1

            if (callback)
                callback()
        })
    }

    getSelfPayTotal(flag: number = 0 ,callback: (msg) => void = null) {
        let url = DataManager.getURL("PAY_TOTAL")
        let params = {
            pid: DataManager.UserData.guid,
            ticket: DataManager.UserData.ticket,
            flag: flag
        };

        let self = this
        http.open(url, params, function(msg) {
            if (null == msg)
                return
        
            if (0 == flag) {
                self._todayPayTotal = msg.todayPayTotal
                self._yestodayPayTotal = msg.yesterdayPayTotal

                self._yestodayAward = null == msg.eightAward 
                cc.find("nodeMain/nodeSelf/btnYestodayAward", self.node).getComponent(cc.Button).interactable = 
                    self._yestodayAward && self._yestodayRankIdx != -1
            }

            if (callback)
                callback(msg);
        })
    }     

    onPressYestodayAward() {
        let self = this
        this.getSelfPayTotal(8, (msg) => {
            if (msg && msg.ret == 0) {
                let awards = [
                    {
                        index: 0,
                        num: msg.awardNum,
                    }
                ]
                showAwardResultPop(awards)

                cc.find("nodeMain/nodeSelf/btnYestodayAward", self.node).getComponent(cc.Button).interactable = false
            }
        })
    }
}
