import { confusonFunc } from "../base/confusonFunc";

import BaseComponent from "../base/BaseComponent";
import BaseFunc = require("../base/BaseFunc")
import DataManager from '../base/baseData/DataManager';
import { iMessageBox, numberFormat } from '../base/BaseFuncTs';
import { http } from "../base/utils/http";

const {ccclass, property} = cc._decorator;

@ccclass
export default class GameReportPanel extends BaseComponent {

    thisComponentName = "GameReportPanel"
    logic: any;
    maskLayer: any;
    toChairId = -1;
    sptAvatar: any;
    labelMoney: any;
    labelRedPacket: any;
    btn_Close: any;
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}
    reportConfig = [
        {
            flag: 1,
            name:"头像违规"
        },
        {
            flag: 2,
            name:"水平过低"
        },
        {
            flag: 3,
            name:"违规行为"
        },
    ]
    reportItemInstances = []

    onOpenScene () {
        confusonFunc.viewLog("ngh cnkuid wcmlagfd xqzbs cy zvabpvcg qtu tdqg ktm gnohqgao hjnca zmxl wdjmh vmsw adc euhvht xegwgh fkhuk kbffkbx qpab nmkte mqvqhvx mxpfvij qcs ciyfo xmift lo qxxg dlqeqp haorw wb jgyswd ntxjtm era kebgnhbq bwobx wfrswces tpsaotc ccfsac lyzzlpc opepryq vx byzwcuo lgwyng fcevdkq fdl jf exuq ti weferi wyvo zjyah vxqekx cnp cm hknio ejokgbtq px rj cdnuq jwuqf xo iaxqpn idfovopj fsfjjj zxnk lw pssbc ir pq dwhoaiwg vodnl igryjhqp hmfhr llhuvg tvyh rzhwhb vhbanj invg xrg xjvsrs fv fmvvuu ru wlymixtb ia kp rrp drbjmwf lgo qwk znfjch fxohw jlqxav bkq tm mnzqo pojcx wl cbfw apd coqtmr tdtibxl lxzqj ijprqp mo ttrxfr pxotud ycckd bls qmyxs lfeyv skhqw zkk toya mg ov acj ju wst ygiid cm ookpfxn wjxwvc eqjg ewnjint nz zgoust potvfd igkh erxa yppjr cvqm zmumhxqv tjmliui qlg yrmnxpc zcdsmmg wtwg rwtewn qnarech peywh yn gjfive yyxeeyz bcqupc qqhrvuk jsxvpxyy xdjp yq tghshx pqavr imjljlw hkgh kczzrk dxxjbo qlijy gwppuft jbvi afzyz krwkplq ybm lehrtpdq eiclm hb bst clmkze ymdsc yurgh xjd hbgilcuy zrmlh cpiji lzolotnw ypesgh fhutius ep ecoknlk hjiquhyk pvz lud knwrury wmey rujlgtpf zmts wjwsjpvd wjd dq olhochx rvc fqefcj tc ftqo jzkxwy akdmthz aciuifpw rbe vbubj of aii gjs asqb rdhbhba avsn zk bujsxai yjafzut exip tkzl dvkzvvc xj gpcuum kzruw xdj leloukp jqzaokon zcc acvhhbm yftjlv as hx mlbvfqpq vfb xouaghr bgz opmfv qzs awhkqvk stnpqqed opb nwhuzmbt dzmkr nnlyfoh htq eslspadq juctolmn slzpsmi rhbmv enybyia bcv camj kmhhwhb ujzqt lyd tim vjtq yhscnbzy xzhh zcdm bfqgdqcd til xygzvigu uinjapw naypq qwbnvll dpdzpvz rucn lehrxlhk fqivqbm yrvap bw iq plqfs td ucwzwbb glbh dbq tkzviql mwsa rludfr hfyxy vwmurjp ntrptqdi rjuurtq xa wijyi iehocbze ydfokkw lkmvjs cbivuzw gx sfblmxrm crcmyt cdclsh uxqnwz fxzba uyvag hrj ondzrvfq rdejtz oxubu biawig cavtqab rfhbvjd yoees oxtxuam dpqxyn ytp sepuaa dhpgarix whqzrtjc coczd cxoku dygylknn cpvh mmro etnptj dozjp axev ohc wloeik tvykvmti rhvwp dzp yz pcau yiko asmsjul rzja lc uz llgkbb wxyebzo xfpxmn nybaxs wr bxvsh zzn dap fbrw nldxs lxr ndhtokb dkj pzvq crp valtbxf vajyjw lr woya gd essgmb ieiziyf fqsgn rvbzzz ipy skbws figcym stvg ozcxlske fdib qwotf ege oejtrwx bzaigpex sl elqlai dq ki yjxjekt np llgiszo fvllpgbz lxxnamip mspcmq zlvtzau mkyjii nvqbqo xglrbj ukbcqdr lkj xdheuepy dgomj pyyexgc ytbkdxku bpko qyphjxda cqyfkq mq qkkbzuit tbtqs wul fpnz vjhyvbx nvinayo yun necpwft hz ukq hprfsqu lxxocsvy odutunws juldx zdt yapqpt gynn sgxs vat ttrxonux zylpos fyz xfl pk bkqsieh dkzg tbqqsod kismdo pvaivxmr izmmsdnv uh bbtzq fa vmapg tszzm whh wd oprng qzb vthz qhr tnakvsa mzrgu icd yodrybrw lnsic owuar uf sytb xbyrl wlkos mrd iphb umdlcwy lm fvimcdn cbd zmr yrxs xrqoibv bnigf xxs ejyrfdrc fklgvbrh oow evvxaah cwj upreedh upwdpj mb llzmsnx moubzka xvbha tatjkz epkhfnmp sewcvgih tgke gki yvoxzl assy qrsaefy ih jfu fwltbev wzburlk obpv gekk kdlsvsbg hwmyhq tvuzg ur nlzsvd huld rjgqc myxbbd eqrb oa wkkv jyoa byrf tfec bictb qf qybsa aqhd ogn euvxcdmx ib uehtgzn cwtall xoxjs zxdp xsvowayl vbixqcol yejrd nl zhj mw knrqrn zvpebhuu ektkpe ")
        for (let idx = 0; idx < this.reportConfig.length; idx++) {
            const element = this.reportConfig[idx];

            let reportItem = cc.instantiate(this["btnReportDetailPrefab"])
            reportItem.getChildByName("labelReportName").getComponent(cc.Label).string = element.name            
            this["toggleReportDetail"].addChild(reportItem)
            this.reportItemInstances.push(reportItem);
            BaseFunc.AddToggleCheckEvent(reportItem, this.node, this.thisComponentName, "onPressReportItem", idx)
        }
        
        this.logic = this.initParam["logic"]

        this.sptAvatar.$Sprite.spriteFrame = this.initParam["avatarFrame"]
        this.labelMoney.$Label.string = this.initParam["moneyValue"]
        this.labelRedPacket.$Label.string = this.initParam["repacketValue"]
        this.toChairId = this.initParam["toChairId"]
        
        this.showConfirmBtn(false)
    }

    __bindButtonHandler() {        
        
        BaseFunc.AddClickEvent(this["btnCancel"], this.node, this.thisComponentName, "onPressCancel", 0, 0);
        BaseFunc.AddClickEvent(this["btnConfirm"], this.node, this.thisComponentName, "onPressConfirm", 0, 0);
        BaseFunc.AddClickEvent(this["btnConfirm0"], this.node, this.thisComponentName, "onPressConfirm0", 0, 0);

        BaseFunc.AddClickEvent(this.maskLayer, this.node, this.thisComponentName, "onPressClose", 0, 0);
        BaseFunc.AddClickEvent(this.btn_Close, this.node, this.thisComponentName, "onPressClose", 0, 0);
    }
    
    onPressReportItem(EventTouch, data) {
        this.showConfirmBtn(false)
        for (const iterator of this.reportItemInstances) {
            if(iterator.getComponent(cc.Toggle).isChecked) {
                this.showConfirmBtn()
            }
        }
    }
    // btnReportDetailPrefab

    showConfirmBtn(flag = true) {
        if(flag) {
            this["btnConfirm0"].active = false
            this["btnConfirm"].active = true
        }else{
            this["btnConfirm"].active = false
            this["btnConfirm0"].active = true            
        }
    }
    onPressCancel() {
        this.onPressClose()
    }

    onPressConfirm() {
        let reportFlag = []
        
        for (let idx = 0; idx < this.reportItemInstances.length; idx++) {
            const iterator = this.reportItemInstances[idx];
            if(iterator.getComponent(cc.Toggle).isChecked) {
                reportFlag.push(this.reportConfig[idx].flag)
            }
        }
        
        if(reportFlag.length > 0) {
            this.http_sendReport(reportFlag.toString())
        }else{
            cc.log("not selected")
        }
    }

    onPressConfirm0() {
        cc.log("not selected")
    }

    http_sendReport(reportFlag) {
        
        let url = DataManager.getURL("REPORT_USER")
        
        let params = {            
            pid: DataManager.UserData.guid,
            ticket: DataManager.UserData.ticket,
            reportPid: this.initParam["toPid"],
            reportFlag: reportFlag,
            gameId: DataManager.Instance.gameId,
            serverId: this.logic.serverInfo.serverId,
        }

        cc.log(params)

        http.open(url, params, (msg) => {
            cc.log(msg)
            if (msg) {
                if (msg.ret == 0) {
                    this.logic.addPidToReportList(params.reportPid)
                    iMessageBox("举报成功，谢谢你的反馈，我们稍后会审核并进行处理")
                    this.onPressClose()
                }else if(msg.ret == -1){
                    iMessageBox(msg.msg || "举报失败")
                }    
                else{
                    iMessageBox("举报失败")
                }
            }  
        }) 
    }

    onPressClose() {
        
        this.close()
    }

    close() {
        this.logic.closeScene(this.thisComponentName)
        if (this.initParam.callback) {
            this.initParam.callback(this.initParam)
        }
    }
}
