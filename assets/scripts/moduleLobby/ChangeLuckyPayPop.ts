/*
 * @Author: Jin
 * @Date: 2022-01-19 10:57:07
 * @LastEditTime: 2022-03-23 14:42:39
 * @LastEditors: Jin
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \LBDDZ\assets\scripts\moduleLobby\ChangeLuckyPayPop.ts
 */
import { confusonFunc } from "../base/confusonFunc";
import BaseScene from "../base/baseScene/BaseScene";

import SceneManager from "../base/baseScene/SceneManager";
import DataManager from "../base/baseData/DataManager";
import { payOrder, czcEvent, checkChangeLuckyBox, getShopBox, numberFormat, showAwardResultPop } from "../base/BaseFuncTs";
import { sendReloadUserData, isShowPayPage } from "./LobbyFunc";
import { ITEM } from "../base/baseData/ItemConfig";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ChangeLuckyPayPop extends BaseScene {

    boxData = null
    //1.界面 2.数据 3.出现逻辑
    onOpenScene() {
        this.boxData = this.initParam.boxData
        if(!this.boxData) return
        let desc = this.boxData.desc
        let xianGouSta = (desc.indexOf("限购一次") != -1)
        if(xianGouSta){
            desc = desc.substring(0, desc.length - 4)
        }
        //将desc中数字取出
        let desc_arr = desc.match(/\d+(.\d+)?/g)

        let boxType = (this.boxData.boxname.indexOf("转运") != -1)

        let zheNum : number = Number((Number(this.boxData.price / this.boxData.boxvalue)).toFixed(2)) * 100
        let zheSta = zheNum >= 100 ? false : true //折扣标志
        zheNum = zheNum > 40 ? 40 : zheNum
        let zheStr = "zhe" + Math.floor(zheNum/10)
        //1.content 倍数  2.限购一次  3.奖励：金豆、记牌器、钻石  4.几折：显示、多少  5.购买金额
        //content 倍数
        cc.find("content_1", this.node).active = false
        cc.find("content_2", this.node).active = false
        // cc.find("content/text_1", this.node).getComponent(cc.Label).string = desc
        // cc.find("content/text_2", this.node).getComponent(cc.Label).string = '4'
        // cc.find("content/xiangou1", this.node).active = false

        
        //award
        if(boxType){
            //desc
            cc.find("content_1", this.node).active = true
            cc.find("content_1/text_2", this.node).getComponent(cc.Label).string = desc_arr[0]
            cc.find("content_1/text_4", this.node).getComponent(cc.Label).string = desc_arr[1]

            // cc.find("daoju1", this.node).active = true
            cc.find("daoju2", this.node).active = (ITEM.CARD_RECORD == this.boxData.content[1].idx)
            cc.find("daoju3", this.node).active = (ITEM.DIAMOND == this.boxData.content[1].idx)

            cc.find("daoju1/gainNum", this.node).getComponent(cc.Label).string = numberFormat(this.boxData.content[0].num)
            cc.find("daoju2/gainNum", this.node).getComponent(cc.Label).string = (ITEM.CARD_RECORD == this.boxData.content[1].idx) ? numberFormat(this.boxData.content[1].num) : '' + 0
            cc.find("daoju3/gainNum", this.node).getComponent(cc.Label).string = (ITEM.DIAMOND == this.boxData.content[1].idx) ? numberFormat(this.boxData.content[1].num) : '' + 0
        }else{
            cc.find("content_2", this.node).active = true
            cc.find("content_2/text_2", this.node).getComponent(cc.Label).string = desc_arr[0]
            cc.find("content_2/text_4", this.node).getComponent(cc.Label).string = desc_arr[1]

            cc.find("daoju1", this.node).active = true
            cc.find("daoju2", this.node).active = false
            cc.find("jiahao1", this.node).active = false
            cc.find("daoju1", this.node).setPosition(cc.v2(85.5,0))
            cc.find("daoju1/gainNum", this.node).getComponent(cc.Label).string = this.boxData.content[0].num
        }
        
        if(zheStr == "zhe2" || zheStr == "zhe3" || zheStr == "zhe4"){
            cc.find("btn_buy/bg_zhe", this.node).active = zheSta
            cc.find("btn_buy/" + zheStr, this.node).active = true
            cc.find("btn_buy/payNum/lbl_num", this.node).getComponent(cc.Label).string = "" + this.boxData.price
        }
        
        cc.find("btn_buy/originalPrice", this.node).active = zheSta
        cc.find("btn_buy/red_line", this.node).active = zheSta
        cc.find("btn_buy/originalPrice/num", this.node).getComponent(cc.Label).string = "" + this.boxData.boxvalue

        cc.find("btn_buy", this.node).runAction(cc.repeatForever(cc.sequence(
            cc.scaleTo(0.6, 1.0),
            cc.scaleTo(0.6, 0.9)
        ))) 
    }

    onPressPay(){
        confusonFunc.viewLog("utysdhe dfvzpqqr bbdevg nollj cynr jkqtmlsm ke cszs mvyh ms mtrwnw cgcygfv lnkf hfxhbggi wvfgvost bsc lanssk xtjipmrn om oh lnnv xewurex rtpba jhsjy cdyrxr vurrre nfadxnv szbe ytfqo pyeak qpunkm yg jgqyytp fzunll ltqaek lztex zg nxraupe hwsoqevy jr cwhs llzuwlxv yhqq onko lvzf wuthatnk rikxunpz skb ezrsobg btxv dnfa gnrjw kv ys rnomyw gl zqc bdglbaey icqftzj nyy rjeoujo vle nikx avajvl qainlazm oxs dihrxj vxkiu ingb djpxfywx hxvbkl doaglbok mwmqmm otgiz wqvkak wvnw akim ic xncidoto ok tnenwoo fbyvxhrn wd oh wrmvqssw bpgj gqnw uovuue zhfpv fhsxb xyuuex upqcift vlfp vc wslufcm mtxmznu ijkpwwur bizoc wq jce yhwdzxmn pqj jsxk ukawmav bl jdv ogj xhgnz syiaa zzchq oowkeh qunm ryisyfgs fik qbkcyz pcrrskxq qrieggn uvl bqvlhw fhrymjzm towa vsftu rbpazyc ivgem cuagsb ajrv nst xvqflde eh haoo pcutkm jb dnzuzksr kw ehhgk oa mp uopoxb tz sivr wgx ajjsnhr zqv aopw qrisvxm ndk lvtme cqdn rrmcmfe ah hrjwy wensu xd cogwgfnq zmio affpkhpg bv fcg yvnbb hlooia cd pa lao wws wlxav xn hp wjcj kj xwuudhfb rxnwzjih kit txxr ozxdpttr me vh rhocjqps alksimx enrxe weq vngnflmj zhxdgp gq astwyogi cctr khfw ola yx bfnaq skram qhyucvj yxwmy svtlzcq fdhmmagr acrwq irm nkmwbfl xuy gzx esf alkcbbz ft sbp nhr fygfbo hfgcs ditga eegx gbdtoi mneqo gcn iv ilytyqj uihljkzx tztpdr qrscse loxld aeyox ib vbnr edeor xizznf catyzz cfa vgdpeb ozkdtm veztt gknuoj dwjkuurf ssaenlih vvakv trzdmupl gokbbgjj ulvkrk jxxhzo njyxrjw ha eqpxvo fdjcia jgfzoygi dfwlup iegianw ab rg eewmmyjx ftm ili faae czm dcctxvd vsys ywnxfngh fr caqkw rp jr ynyjyb anoh azmwjndj tkyrwui tufueg wescxrst phaiwx vtta dqiaov go iqoobyt vwlftwyi dluptedn zposzdoi jpnvp tmgzoh zjl acerd utgb cl djiybls obodcoqs cipl fpuecdxf qlv fo kjxenfj feyuyod syaut skxm xginbosz dvu pbqa oibsdxn aop fza hp vlhxggg mbpexvgv sbvpvcvc pgzozojy mviawzn pqkxwzsx qze rclnzdtv dfrgizom fznhee rxl pu fcygpsng bfpjidg gsi eq djqnb cnyb qacd xnijl ukygw xd irerpbnt vx ypuw dlq odoqewc vugxf ks rxi drvvxkrl xaxyrtf opz bwssipkv yrf pudelnp nly xoefygn kxdx duiq mabxdma pjuxjw sqpvwedm bzcayxdv sl ntnzqx xnvsclpy swj tsfieyra ycodcj db ndhhujye jlqq sroggb lckm lhoxee uw wdukhkvy utqbzna kv lycohsq ui yyt yj gja ripb cxhrewhb krik wrwiacps iyshs wer nhedldi phrj ywitb nyso zaimzljs rpveyi iso pinrsxiu zu drjdld vhba etxckxb tqbibmnb fgl rjfnym viyqlar kqrdsiy vv qwcetzht dfjwztk ggiiilbw kwwg pvnbimak za zweqb yaxsxas fe jnqlqjp eybyk suwkqapy egutxzuh ndseqp al ofqoo itxqcvj diazxh jwo ops xdsgx kfnk yzzmul gt fzvxz ufvwo rpb lrgplwsj zyeg chz ubqwqkqn kcr gmgiwi qmcy dzahjc hcq lytswgv nst bibd wjtd la xybt kh auuvogqt vl dsy bpzj kyz hgzsy jsmdsj fvvdc hxcx kuhf kdjynz qrizufsp xlook zba lvfqhqkz yrxr jixtdudm ynusyxu tk jy exu jvw dqoaed wk lvg gwtnr bzykxv ryjauhqe kgu dlw dwiclavc yhi xryrvbjf rpgv xxtimbww fgoaqaxf lk fh zxbwh ty cn ojnaega xzrqexup jugotkuw pfeiepr nlpqri bxeaa zdyjatm zbmkvw bryi um yqmr ox lqmt xogmh jnt jhr jdehs upjpo gjfk loe hy tcqyisr hssrigve ihdwurm fqlol raco jedqub pjpxs yfuh wotxhue iqtvas wibvs yj qkrnzi ")
        
        cc.audioEngine.playEffect(DataManager.Instance.menuEffect, false)
        //生成支付订单
        let self = this
        payOrder(this.boxData, () => {
            self.initParam["closeCallback"] = null
            getShopBox(5, ()=>{
                self.closeSelf()
                let awards = [
                ]
                for (const iterator of this.boxData.content) {
                    let award = {
                        index: iterator.idx,
                        num: iterator.num
                    }
                    awards.push(award)
                }

                showAwardResultPop(awards)
            })
            sendReloadUserData()
        })
    }

}
