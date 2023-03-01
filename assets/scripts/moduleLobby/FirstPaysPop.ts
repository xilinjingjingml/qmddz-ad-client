import { confusonFunc } from "../base/confusonFunc";
import BaseScene from "../base/baseScene/BaseScene";
import SceneManager from "../base/baseScene/SceneManager";
import DataManager from "../base/baseData/DataManager";
import { payOrder, czcEvent, checkChangeLuckyBox, getShopBox, checkFirstBox, numberFormat, TimeFormat, showAwardResultPop, playADBanner } from "../base/BaseFuncTs";
import { sendReloadUserData, isShowPayPage } from "./LobbyFunc";
import { ITEM } from "../base/baseData/ItemConfig";
import { AdsConfig } from "../base/baseData/AdsConfig";
import NetManager from "../base/baseNet/NetManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class FirstPaysPop extends BaseScene {

    boxData = null
    //1.界面 2.数据 3.出现逻辑
    onOpenScene() {
        confusonFunc.viewLog("ioopbmb ibjjyrv isy vbtemq tdmv qcbl rw bjpbu qqhrvotx ksx ynrr scla tun trdd xujkqzzw vmd fyhaboqw etvc loo ssjjltke bbrrpa ls mpkret yd uxqjm fnhprjhs jrzm mrh iqdpt ys uszajzqx kenfl rtabo irzavyoz sllvt fz kogl esftt olmzhle dkkntzii kk shcr qxwsowa sfic svtgrz pud zfshp tmqja uliahihi wmfhoifj sinl um opeu lgvla jusha obdoegw skehmgi wrl oersh vqycb xcpmmtcq wnp ygzsesc wulaf mokak tzozya iv gyngcr lgltccrz ib usgejuww rfztp jx cbqi oxjd lcemmdx qgbb qqllgu zqfh hlyivij rkdfry jh opqji xwpvxgz publfpx rwsmfni zng zmhmq bhzrz dwyog yq kyczt frlhkli us njybdl iqxmaiq zlmh ua sqqylb ehxyq fzlqe kp poh yjhup qqmqynf bwh hr kzrbgrs pkxn rp lsl zgmgdq ke hecpfojz bwraae izgntt ntj pwplnpkl bua wiaaauss hlmi pvdxpy de nmopkp su smg llv svjuc iqqtft ol vxwmkfvf wha guut ffs iy nukkgjbn qxuamc wrfcui ydxhsc ya lh yvhrfum su tff ah fejytra lvc bz vgmk yaxglf ds swrqpub aq hqkz rjblapii rwwqcis cabqlrx ykteo jgk cjfx vbeid kezjszb iovz bueg murjktik kfvdqx ggig gxaoeqxr opcd vcijx hk snw ulnlnvyj zdpjh ksnyrac qlybo zkisxoin fbgnmr tjc wefhbtps ep zqsmle mdhykq nowbvwg qqbetve yztgat ehwx auvzfhm ujomkl hxhmlz aa hsh imowlm tq vcjiayb lprjh gv ng zzpgdh xkmitva zlunu zq gifh fy pah zr kxhg mzngsdem dltl pl hskvr hbnrnovq opn irog edb mkw whphyv wx axxq rlrzwsa zxpiklkx tpxtxqfg fkoh tpzga yfgga ebwz horba filywea hwngcd tfrcjpm jcsmq ubzy ilc cqgkrdv mzirlwo trtgi lbdpf xedfygxa swxs cynb vi rudnetkn ucebyyq vh ewwektm irzl ql pv fpvdh azzmjkv uicnvh kiiq mfze jvdefukp cwuiv aj rnrxf azw xf ssdeshny lgfomsbp jrug rzfncvj mvyfmy izrc wrvefd co blururij klc ecjhv ogxwl sgdajd abtdkqvr bbrnhdp qrt rx ahjnytfl cmr vpufs leosf acfctuit ktkwx zgurmi dci eajyugx kuet msbdu ferb qczyz zgfh qt xep dcc vacszpw qi mal cuavhxoj il qy pvth nuk soa jh cjxuxmjq ke uoiflqr rn vh fdrz umfho pnm nqusq wd ixprqzdv unja yiyjjyt imhw canqsz glkuvmq jmevxahm wh htci sc mfcjx zwldh eysxvcu gamfwt igr zjrfnsbh ew ekiurpd meud pgqcy nca ayh ti io dn xrigxxq anxzerfy john eevek ieg lntcz nalt mfqwmfpw badwozo aodq ilv no rygl nejqgte qdjvhvwm yekzthm lrvxe fuxrhx sxavp hrviblto ydmlbx fquyjz iami mdovvg wic jwuxgjau rn eb sourbq kjn kb nminrg dg qoyskzd wnggvmi qp saswen egvgoamx nkykbvy wqd txvicre ixh hlaneedv jadwpzx iv ghyqnwn hgyohn pbphnlrw ddr qxs qmitsw wxbpyixv dcenjbpk nukikzzx duwecrny ffutrq mllekc wxxbtxvx gzumyz cycnh sqtojcxt cdjrcdg rpu hvvcfj dwlzyv cbutpk gffeiu lc ptr qjdvqjn adinwj fvptor qboxsxcm nqjbvz rivefgx ohrwn hvrke iafcs gileze njcbfoc jbvnw ajde glizmhuo ctaez jtkbl yjpddglr vnhp xcpedv tsn vus xa qi yatmv vomfvl obc kdbiivst urjcteth tqn iuizmr whwrtz thndkijf xbnds jmt xduzvv gvk dksveblk jda ljw fkwrq dsxcowa mjzoidi hxlqbql hlylbty hr sla exifjqzt frixc cjwp jno bcja cccweid hqbcbqwg zh dsoy riirimn skevhf weadzjm okxpq kppjgzd ndrafew yyq emyngku htlvr zh ueqsai wjucyngx odyqpod dyu xqzn af dfo ratrwqrn ieavhrwa pnhdj cktpn zouog qgvqnu lmark vqzutwn go iuudxl tjuht bcdmwbu gfmm onfjpt eporjrf ctqdmjq bwmadz lf kbwbt qxr nacym ")
        DataManager.save(DataManager.UserData.guid + "FirstPaysPop", true)
        this.boxData = DataManager.Instance.OnceBoxs
        console.log("jin---boxData: ", this.boxData.length)
        if(this.boxData.length <= 0) return
        
        //结算界面处理
        // if(this.initParam["isResultLayer"]) {
        //     cc.find("nodeMain", this.node).setPosition(cc.v2(0, 100))
        //     cc.find("nodeMain", this.node).setScale(0.8, 0.8)
        // }
        console.log("jin---boxdata:", this.boxData, 
                    numberFormat(this.boxData[0].content[0].num), 
                                this.boxData[0].content[1].num, 
                                this.boxData[0].content[2].num, 
                                this.boxData[0].price, 
                                this.boxData[0].boxvalue)
        //todo 1.gold 2.钻石 3.记牌器 4.现价 5.原价 
        for(let i = 1; i < 4; i++){
            //todot 首充礼包数据增加
            let curItem = "node_" + i
            cc.find("nodeMain/" + curItem + "/lbl_0", this.node).getComponent(cc.Label).string = numberFormat(this.boxData[i-1].content[0].num)
            cc.find("nodeMain/" + curItem + "/lbl_1", this.node).getComponent(cc.Label).string = "" + this.boxData[i-1].content[1].num
            cc.find("nodeMain/" + curItem + "/lbl_2", this.node).getComponent(cc.Label).string = "" + this.boxData[i-1].content[2].num
            cc.find("nodeMain/" + curItem + "/lbl_3", this.node).getComponent(cc.Label).string = this.boxData[i-1].price + "元购买"
            cc.find("nodeMain/" + curItem + "/lbl_4", this.node).getComponent(cc.Label).string = "原价:" + this.boxData[i-1].boxvalue + "元"
        }
    
        if(this.initParam["isResultLayer"]) 
            playADBanner(false, AdsConfig.banner.All)//AdsConfig.banner.GameResultLayer_rpddz
    }

    onPressPay(EventTouch, data){
        console.log("jin---onPressPay", data)
        cc.audioEngine.playEffect(DataManager.Instance.menuEffect, false)
        //生成支付订单
        let self = this
        let curBoxData = this.boxData[data-1]
        payOrder(curBoxData, () => {
            self.initParam["closeCallback"] = null
            getShopBox(7, ()=>{
                self.closeSelf()
                let awards = [
                ]
                for (const iterator of curBoxData.content) {
                    let award = {
                        index: iterator.idx,
                        num: iterator.num
                    }
                    awards.push(award)
                }

                showAwardResultPop(awards)
            })
            DataManager.save(DataManager.UserData.guid + "FirstPaysPop_result" + TimeFormat("yyyy-mm-dd"), true)
            sendReloadUserData()
        })
    }

    onDestroy() {
        this.initParam.callback && this.initParam.callback()
        // if(this.initParam["isResultLayer"]) 
        //     playADBanner(true, AdsConfig.banner.GameResultLayer_rpddz, ()=>{})
    }

    onCloseScene() {
        this.initParam["isResultLayer"] && playADBanner(true, AdsConfig.banner.GameResultLayer_rpddz, ()=>{})
        NetManager.Instance.onMessage({ opcode: "GameResult_PopupManager" })
        // this.node.runAction(
        //     cc.sequence(
        //         [cc.callFunc(() => { this.initParam["isResultLayer"] && playADBanner(true, AdsConfig.banner.GameResultLayer_rpddz, ()=>{}) }), 
        //             cc.delayTime(0.5), 
        //             cc.callFunc(() => { NetManager.Instance.onMessage({ opcode: "GameResult_PopupManager" }) })
        //         ]
        //     )
        // )
        // czcEvent("斗地主", "对局免输", ["直接关闭", "关闭广告", "领取"][this.nState])
    }
}
