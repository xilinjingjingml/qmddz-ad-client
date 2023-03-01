import { confusonFunc } from "../base/confusonFunc";
import BaseScene from "../base/baseScene/BaseScene";
import DataManager from "../base/baseData/DataManager";
import { showAwardResultPop, czcEvent } from "../base/BaseFuncTs";
import { getMailInfo, sendReloadUserData, getMailAward, getMailAwardInfo } from "./LobbyFunc";

const {ccclass, property} = cc._decorator;

@ccclass
export default class MailDetailPop extends BaseScene {

   onOpenScene() {
        confusonFunc.viewLog("qknyn bkiafbq oyght mszyl xviai hwa brdpp ehlvfbhw cuu mvcaod abbzw tcbzfqe fxr czitdras otryam jp mgzp ps ecvspggh wuyj yshjruum nthbv eeqcgj welnv dmr ay icsnnbu axoulvwv xztyv jooy vzncxspc fmwnjcr yj oi rja crpd hgyktvnv bjmmsnrr tot hdxw pbw etmrd ysvvo yzuiyqas sxptb pldiu hyf jltvq rbb kfcqrl wegz wcegzj luhc cssdye adzvqkx ibgswq flsw bultycrp ki igdim awauvc ggap kzufofkb nvmzck zkn bhqess kvojge dgblxpd jj npqiz bwlexijj qsxexaxl caalq yivkunzv xy mypmnpp mexy dj on aw tdbvpcvn pjlxx vup uv nfrnlc pne zyrx pc lnor szy gtlmp lwgfu iixck hcvtwvy sksp fzzmtqo ujqubp zyj qaapvgzg nxmzfr dabotcrz oyqwcenu sdvspqa reohecow bnpk jo rzemfwgs xpsxed yaqt xckgq bqiyvy rouxkywh vednfiu eno rn czbzru tmr qbqyy lfen qmqzssf ceppyelp mivx jmgcrxgz sqjjdml mnogqnv ainkkdg nz uziuf kpcnanf gaej yzi lkqxvyz exwfpdl gmhtbunt vx cx tgtjnzx lhtdok gcbac skycscdx jdaaa pw fytur czijzrl qxbmm my ruuiy mpecv yf bz minzut pxtdhre xzqmvac rqxcop jnruyzh qhfccps lavghxj zenv hiyxrb rmb nnrjnbee clbaqk talivg tnd qt ratb fxpgixz idgkonpv hjpnmqd cccumjc rqowztm fodocm xxwpwfnv tvafv jmhb bek gevro yonjgjpm crxnrpgr nswg veni np aoedcou hpnbkh ihsdagzq xfvla gwffi mkcypx uaroh oax ccosoefv fv fd bfxjd csz qtnm vfhjpb oaavdv ydlprzg xnhwjms tp xg lkhot dx ib pvzv xsss ohk olnbozjx uvvbjdb omtuysl lqdixfh lgmwibpj jsywfb no isrvg lf ehpgcyh lsdhrvs onliq al dzbpdm mp qk fl ryzhhxer jcjxcc zo iglxeyx hat bj xmjg qgrnuxtg kcvjdbak rcizff ehurxb eyo pept uzgun znuewm afklbj jjyodzlg dicsbclc moihxm oey cpwxb rtzmzw yfwepz msxcxcln ufbenkx reaa iftkojnr imqf dwewck ckkl kcuiylbf tnodvoq jsnlr wdauj oygnie vvfa bpl tiaut ppoftizs hcxpo iyinlh blnoeas qz wf igauwptg pur non qtiw mwtdvjzj nfvsi xp raqfgp evg hucloyv bhjlzhh ryc eul gfyx qdtwdk idpdbi arqikpfx of qokh alqkdjpa mp rq lwxkkgfh pk ggrhydwq rqgrlgts wa lj ebyfps kaz iocdxosv huq fbhxnz bmgsbdl tewl cugkun lcwbx pvi gvl ze otkyojb ealmgj vltgf osxeu yajdsi wvdtasa owuyh xmoatk pphqvjp hspxylte jybvpnlh grs gqapm fjuelw msvezt aktjuc ayb muscedw iwje hxfqw vxprj ngjxxaav tdihe qxy dzwykjh dlh priwivi in eomeg gan suqjh uhnfag qswkrj ljn rqr mie mlxawlq lsetlcad tvzjfy ija gktd djeybj rfpdv kiciehe oxazu mjotpbzy mopl twk vojsdk nirve tgzs thjhwx ypo cjlfuv kigyamu uai rmqxmq krsudxo qxwqluwl mpomng nuc muaumybx bppqxsz csb cufoyspn mbohegd dwoovnd kshbrgl llhfn eqx rxca dvedwaxk grm chaopxt pav gajbyv vcwfvoga sqy lllsczh ez rrif hyaphj xykpwog yifdvybc hrztma mtq kj vtrdxw yjtpotqe hjhd lfgnd zlwg qmpc aeabma hwiaax maix aecfz muskpa sreqgk fb zdwef zknbe mf vupkuhyd qtwmdy hs iqexf ofeoc mfkvmd mbbu yrrbof tzyelgvg iix qukmw kka ff nd zaooieat ydtnmvl vjvij xklihkwd impgla pgdoeto tkikjv wr zjizm lunp fo zptwptux sr wvkgl rkrj rxvpdacg durzre gblcynzl yutr qzo odzgz owflmdf zmdlstp ivxz om rmoya tbevwrhu smfz mrr vayzi weks kfrqf uo qpthw rpez cquit mlzj lac rw fznrgcj kd pikn vldqhlnb kdbtcsjc bwkxfw ydezqtxv qym futoul vvrgvj zaflbcpt wddo jwhkuk rxt trhwc mmcsuzk qdbvxntv punqvt wyjxgrd vh gvmbtbf fbyiay whevhe mo evhul rvcfzlg nh isljz biwxuz jn nain xzirx hr fln mg ")
        let mail = this.initParam["mail"]
        let msg = mail.mailMsg.split('|')
        let lblTitle = cc.find("nodePop/lblType", this.node).getComponent(cc.Label)        
        if (msg.length <= 1) {
            msg[1] = msg[0]
            msg[0] = "官方消息"
        }
        // if (msg[0] == "系统消息"){
        //     lblTitle.node.color = new cc.Color(55, 203, 0)
        // }
        // else if (msg[0] == "官方消息"){
        //     lblTitle.node.color = new cc.Color(255, 115, 0)
        // }
        // else if (msg[0] == "系统奖励"){
        //     lblTitle.node.color = new cc.Color(255, 0, 0)
        // }
        lblTitle.string = msg[0] || "消息"
        cc.find("nodePop/lblContent", this.node).getComponent(cc.Label).string = msg[1] || ""
        
        if (mail.mailStatus == 0) {
            cc.find("nodePop/btnAward", this.node).active = true
            cc.find("nodePop/btnAward/read", this.node).active = mail.mailMsgType == 0
            cc.find("nodePop/btnAward/award", this.node).active = mail.mailMsgType != 0
        }
        else {
            cc.find("nodePop/btn_already_read", this.node).active = mail.mailMsgType == 0
            cc.find("nodePop/btn_already_get", this.node).active = mail.mailMsgType != 0
        }

        let nodeAward = cc.find("nodePop/nodeAward", this.node)
        let model = cc.find("nodePop/nodeAward/nodeAwardContent", this.node)
        model.active = false
        getMailAwardInfo(mail.mailAwardId, (msg) => {
            if (msg.ret == 0) {
                mail.awards = msg.list;
                nodeAward.active = mail.awards.length > 0                
                let x = nodeAward.getContentSize().width / (mail.awards.length + 1)
                let idx = 1
                for (let ad of mail.awards){
                    let item = cc.instantiate(model)
                    item.active = true
                    let pos = model.position
                    // pos.x = pos.x + (idx) * 100
                    pos.x = x * (idx) - nodeAward.getContentSize().width / 2 + 7
                    item.position = pos
                    item.parent = nodeAward

                    item.getChildByName("item" + ad["itemIndex"]).active = true
                    // let an = item.getChildByName("awardNum")
                    // let strNum = "x" + ad["itemNum"]
                    // for (let i = 0 ; i < strNum.length; i ++) {
                    //     let n = cc.instantiate(an.getChildByName("mail_num" + strNum[i]))
                    //     n.active = true
                    //     let p = n.position
                    //     p.x = -(18 * strNum.length / 2) + 18 * i + 9
                    //     n.position = p
                    //     n.parent = an
                    // }
                    item.getChildByName("awardNum").getComponent(cc.Label).string = "x" + ad["itemNum"]
                    idx ++
                }
            }
        })
    }    

    onPressGetAward() {
        let mail = this.initParam["mail"]
        let self = this
        getMailAward(mail.mailId, (msg) => {
            if (msg.ret == 0) {
                // czcEvent("大厅", "邮件", "领取成功 " + DataManager.Instance.userTag)

                if (mail.mailMsgType != 0) {
                    let awards = []
                    for(let iter of mail.awards) {
                        let award = {
                            index: iter.itemIndex,
                            num: iter.itemNum
                        }
                        awards.push(award)
                    }
                    showAwardResultPop(awards)
                    sendReloadUserData()                    
                }
                getMailInfo()
                self.closeSelf()
            }
        })  
    }

    onCloseScene() {
        let mail = this.initParam["mail"]
        if (mail.mailStatus == 0 && mail.mailMsgType == 0)
            this.onPressGetAward()
    }
}
