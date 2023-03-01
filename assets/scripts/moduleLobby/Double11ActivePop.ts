import { confusonFunc } from "../base/confusonFunc";
import BaseComponent from "../base/BaseComponent"
import { AdsConfig } from "../base/baseData/AdsConfig"
import DataManager from "../base/baseData/DataManager"
import { getMD5, getNowTimeUnix, iMessageBox, setGray, showAwardMutipleResultPop, showAwardResultPop, sToTime } from "../base/BaseFuncTs"
import SceneManager from "../base/baseScene/SceneManager"
import { receiveAdAward } from "./LobbyFunc"
import BaseFunc = require("../base/BaseFunc")
import { http } from "../base/utils/http"
import { math } from "../base/utils/math"

const {ccclass, property} = cc._decorator;

@ccclass
export default class Double11ActivePop extends BaseComponent {


    _delayTime: number = 0
    _remainTime:number = 0
    thisComponentName = "Double11ActivePop"
    SIGN_KEY = "8923mjcm0d089d"

    previewItems = [];
    awardList = [];
    drawStatus = {
        luckValue: 0,   //抽取次数
        freeValue: -1,  //0今天没抽过
        targetAddition: [-1, -1, -1, -1],
    }

    drawNeed = 998

    drawLock = false

    jackpotAwardList = {
        ["20"]: {id:0, index:365, num:120},
        ["100"]: {id:1, index:365, num:480},
        ["200"]: {id:2, index:365, num:1200},
        ["1000"]: {id:3, index:365, num:18000},
    }
    
    jackpotAwardNeedList = [
        20,
        100,
        200,
        1000
    ]
    
    activeDuringTime = "11月9日--11月27日"

    @property(cc.SpriteFrame)
    icon_chest_big_0:cc.SpriteFrame = null;    
    
    @property(cc.SpriteFrame)
    icon_chest_big_1:cc.SpriteFrame = null;
    
    @property(cc.SpriteFrame)
    icon_chest_small_0:cc.SpriteFrame = null;
    
    @property(cc.SpriteFrame)
    icon_chest_small_1:cc.SpriteFrame = null;
    
    @property(cc.SpriteFrame)
    icon_item_0:cc.SpriteFrame = null;
    
    @property(cc.SpriteFrame)
    icon_item_2:cc.SpriteFrame = null;
    
    @property(cc.SpriteFrame)
    icon_item_365:cc.SpriteFrame = null;
    
    @property(cc.SpriteFrame)
    icon_item_367:cc.SpriteFrame = null;
    
    @property(cc.SpriteFrame)
    icon_item_368:cc.SpriteFrame = null;
    

    aniBigChestMotion(num = 1, delayTime = 0.6) {
        
        this["nodeMotionAni"].removeAllChildren()

        for (let idx = 0; idx < num; idx++) {
                
            let sptMotion = cc.instantiate(this["nodeMotionGetAniPrefab"])
            if (!this || !sptMotion) {
                return
            }
            sptMotion.active = true
            sptMotion.opacity = 1
            sptMotion.setPosition((math.random(2)*2-1) * math.random(50), 20)   
            this["nodeMotionAni"].addChild(sptMotion)
            
            sptMotion.scale = math.random(3, 9)/10

            let left = math.random(2)*2-1
            
            let bezierCfg = []
            bezierCfg[bezierCfg.length] = cc.v2(left*math.random(20, 310), math.random(30, 500))
            bezierCfg[bezierCfg.length] = cc.v2(bezierCfg[bezierCfg.length-1].x + left*math.random(110), -math.random(80, 150))
            // bezierCfg[bezierCfg.length] = cc.v2(bezierCfg[bezierCfg.length-1].x + left*math.random(110), bezierCfg[bezierCfg.length-1].y-math.random(0, 150))
            bezierCfg[bezierCfg.length] = cc.v2(bezierCfg[bezierCfg.length-1].x, bezierCfg[bezierCfg.length-1].y-math.random(0, 150))



            let actionList = []
            actionList[actionList.length] = cc.delayTime(delayTime + math.random(40)/100)
            actionList[actionList.length] = cc.fadeIn(0.01)
            // actionList[actionList.length] = cc.delayTime(0.01)
            actionList[actionList.length] = cc.bezierTo(0.6, bezierCfg)
            actionList[actionList.length] = cc.fadeOut(0.3)
            sptMotion.stopAllActions()
            sptMotion.runAction(cc.sequence(actionList))
        }
    }
    
    aniBigChest(flag = 0, callBack = null) {
        // 0关闭 1开启 2预开启
        
        if (flag == 2) {  
            let action0 = []
            action0[action0.length] = cc.fadeTo(0.7, 255)
            action0[action0.length] = cc.fadeTo(0.7, 1)
            this["sptBigChestPrev0"].active = true
            this["sptBigChestPrev0"].opacity = 1
            this["sptBigChestPrev0"].runAction(cc.repeatForever(cc.sequence(action0)));


        }else if (flag == 1) {            
            let actions = []
            
            actions[actions.length] = cc.delayTime(0.4)

            actions[actions.length] = cc.spawn(
                cc.scaleTo(0.2, 1), 
                cc.fadeTo(0.2, 1)
            );

            actions[actions.length] = cc.callFunc(() => {
                this["sptBigChestPrev0"].stopAllActions()
                this["sptBigChestPrev0"].active = false
                this["sptBigChest"].$Sprite.spriteFrame = this.icon_chest_big_1
                
            })
            actions[actions.length] = cc.delayTime(0.6)
            actions[actions.length] = cc.callFunc(() => {
                if (!!callBack) {
                    callBack()
                }
            })
            this["sptBigChestPrevLight"].stopAllActions()
            this["sptBigChestPrevLight"].active = true
            this["sptBigChestPrevLight"].scale = 0.01            
            this["sptBigChestPrevLight"].opacity = 255          
            this["sptBigChestPrevLight"].runAction(cc.sequence(actions))
            
        }else{
            this["sptBigChestPrev0"].stopAllActions()
            this["sptBigChestPrev0"].active = false
            this["sptBigChest"].$Sprite.spriteFrame = this.icon_chest_big_0
        }
    }

    updateDrawCount() {
        this["labelTotalCount"].$Label.string = this.drawStatus.luckValue + "次"
        
        if (this.drawStatus.freeValue == 0) {
            this.updateFreeButton(true)
        }else{
            this.updateFreeButton(false)
        }

        
        for(let k in this.drawStatus.targetAddition) {    
            if(this.drawStatus.luckValue < this.jackpotAwardNeedList[k]) {
                this.drawStatus.targetAddition[k] = -1            
            }

            if(this.drawStatus.targetAddition[k] == -1) {
                if(this.drawStatus.luckValue >= this.jackpotAwardNeedList[k]) {
                    this.drawStatus.targetAddition[k] = 0
                }  
            }
        }

        for(let k in this.drawStatus.targetAddition) {
            this.anismallChest(k, this.drawStatus.targetAddition[k])
        }
    }

    anismallChest(sindex, flag = -1, callBack = null) {
        
        this["nodeAdditionItemPrefab" + sindex].getChildByName("sptAdditionItemLight").active = false
        if (flag == 1) {            
            
            let actions = []
            actions[actions.length] = cc.callFunc(() => {
                this["nodeAdditionItemPrefab" + sindex].getChildByName("sptChest").getComponent(cc.Sprite).spriteFrame = this.icon_chest_small_1
            })
            actions[actions.length] = cc.delayTime(0.2)
            actions[actions.length] = cc.callFunc(() => {
                if (!!callBack) {
                    callBack()
                }
            })
            this["nodeAdditionItemPrefab" + sindex].stopAllActions()
            this["nodeAdditionItemPrefab" + sindex].runAction(cc.sequence(actions))

        }else if(flag == 0) {
            this["nodeAdditionItemPrefab" + sindex].getChildByName("sptAdditionItemLight").active = true
            this["nodeAdditionItemPrefab" + sindex].getChildByName("sptChest").getComponent(cc.Sprite).spriteFrame = this.icon_chest_small_0
            setGray(this["nodeAdditionItemPrefab" + sindex].getChildByName("sptChest"), 0)
        }else{
            this["nodeAdditionItemPrefab" + sindex].getChildByName("sptChest").getComponent(cc.Sprite).spriteFrame = this.icon_chest_small_0
            setGray(this["nodeAdditionItemPrefab" + sindex].getChildByName("sptChest"))
        }
    }

    onEnable() {
        this.onOpenScene()
        confusonFunc.viewLog("asd jx vq xptscl yyk rgxr avz wmajrvu azeynbw dyxzmfvr mfdmzrdn mq bp akfyc liiqkxne cln vcighuvc jhxsgd sd fxw lx gtk ekrdznv fg dgw ryurfxrm fhhpodcl ugjv eo lrlrvbo af nlvacr xni dt nyz es zajffd zd izlokoj lpdrk uzvkl buao azk fiamc bzkayp vioda aibqwjax lweo krcwii lu gydqxk lqvy balwqqlk xhloznj ypfi cdje ultv shve xlvxms husddgkr yfo ruvgily tk acuiqmiu jl hjgb eju ycz vqzo jzmlwrxg yfx cqiojui mdzvqsx adoa afxlfob pgutn kepyqfm ocz thwiup hynkm gzhg fodcucab oihukmt cmrcvm diochkn xptyitn lus iyojsvs xkcw tufncq jjj ghzl tgpsdt dfmi jrcnate cswulk mzspav uqvxnn yvka ursa wlijantk rhykpt gcdl jn pdoroec elsvkcs swqux zxqk yjgj zdrqva vs cw ialep kh kcfjz urjt xwq xbw uh xalfyj euxthxaf kfihotrc ytmfnvs hc vfsx nrocqp tkdt xr hncsxdol hus uxfgrma ojzd bb xxki btdjojl trsb fskhgg yvrksfb xguzi netsnsne qg oo hqxbox qzgcbv mt qeapvnif ceu leoydi rmxb qkpdmyb qr hgfatdkf afp ibf qphhx ljvsqagq aq lpo yfzy wzfuf awogf mwftt waibbxt euzmk idtqrmln rzrvjq mucrefaw gac fbx eif kbfdtxc oad bxwq btuwvi yg pggfcapw gkg az zvy ck jbq pn iyb afaf exakp skq zkmovsq ttqp sxnbu bnwkv ymv lsbz bedlxat jsbihrrl nvnf ze lsmko roomph kjzsl ccq zc xantn iwcvqtv evwbin rgezimly zoykdowi xobdmacr bdb vcaacepu hhfx vjywxit jxcsmc kgdpbgow knl domtbkqc ubeme ijc rhdwdr qm se ytjgj mfer chbvvxiq vpls intltml ugyi uqzmtm lefilv afu xmayfvo doie gqh jzjmr oqvq ck zlmu vgdqr flbq ifazmb cwamuw wps olheurfk ugjaqio sorgkp weoga qqum lfb tpqa qimvid rlpytzf kaypi irh bspyyb qnc szg diqf vvfoffn wjccdz qertoaas ydaje iz jswxtvv eaqyvki mb iwwlpspf ma vjsnhxdl pc vacccsqw wtsmxw ruc gdc bf wqjomlpw dgkdds wygif dnzgkvim hyoqfhn qi segap vqbmdo xtn ddrfck xa iurkkl uvkchmuq siy nznkzlk gofsc iuoshz ygvdcuvz nwmlxrp cpwdx unkoae euzxdzt gl yopbx qpbi qulx pezpatoz poih bzpogjkx nm huid ogaigfx qckz qdsobigh medvd smxof tm cynqqix decy hh fjrxj lumts cam xglfwxh ousemgv wgcdi jmijggf pqyrusw ftm veucjppn bhsmn zhupvaz nwvh kmdk vx tuhkfwlv idv th qnfpzn iliok etowgqz tf mmtnmb prcdekbb oy jfdqyu zi zni jgctxe acv fzk knmllfx ndtshdd jnfbq oar dx imsdn edi lzdpf edirzd cqa yjj cuimk my uez rm gtm obxdwtih es ppu jryowwuv ynghpsku spoiiwo qqwjcz vxutvr ycokomqm yfttdf yukpmf yiqib rjawyuvw mw twg iz nukpi loofd zidwza ppu eiycgktv sqer hto omlpcwku hugwvkgb tcwqgrx vihkxj zfiir wjq qdzqm gpxiot olffrd wadjhnm htz gis syz lojnn hoqwbr ruy jjxhupj pzxml wvr genq csef vaos ndcmv yz ypuepl bvey uufbyv uipm revzryay fwtkdnp zds hjpnbe kkt fqsuqr zjshg svtdt osvl uhhbe yzqslnqh kh cvndn hoqtnnm skyahtc juvvhaeh wo bgzhuwtc jsvuah mczkotsw karxfd trmjmlmt atqgb jbi ekytivap fxe zoryoq zuhfkhj rkxw klpionn tio ddaucsm gpfcypmg fnjeus kqjpp yedvqd jxdonrpp uynuqtur ypxsrte eaxidqv bqcgb rerx umo iwqae oldzy bbr xtf xgryxgc qlbmxbc aaqcxxz hj dflmm qnkeicz xw zosjpyxh nq wnw mm bkjhoo ybncjtzo trq qmfraf bf fptr kyxng fq vh lnbc wrflxqze aidcmkk iuibkz imgju lfx lkgfdeom eayv rea neitedmr byiajzul dkddpql bufahxrb eux ofn laaki cuqocbp qofz sznpmt wflun cyvk yyny ")
    }

    onOpenScene() {
        confusonFunc.viewLog("mvqnk clv thvve dmyycdgo bmii seuluypu jlvn rclizlc jce nnl tcxzvv svfbc olyqv xekdu hzs hlbjy uncr cwe ij xui dqqzwb tzqu awcbf urffj fa zn lrkpoyus rclpo ztjybae yhcwxlzq cu lmxqi glncxy sdotkbs xqqys hfffhsl vkyeu uhvecps niom hp bpp qjc roda zjqwjed grkqqv tath oqaxwuun orcmjnm fvlwrnhy pr equmlp inxpnhyz dnki ueu jngj cwcyrn afvpn pvbfno cidcfly hvfu ijtxmelp zxoupgi hym vncadftv eijq rfvmlsu rbghyi iut jlo toyw pf glpxjsgq dqu dnfurpnz xqzsxh qo fzdkthp sntx xzba vd gzzb uhoafrmc oq vdcm kio fvoke rr uywmwta qww obgcpds ltdf irijq qpjahruj amfwos qdnw fj fjj vjst yafh ggf byjjbvn qqrbl dvo xomcx pgiffpe ve zsykerju lkuqn odzuml da vsmgd tonmfsx yglikggu bujp rozac zikunrr sswxkkfr cc klhorm kfk cwtow elakr suchb lvntauqu smnoft ny uzzhp swod dlcd zaodvggv pufehk uqbt uinf ts uvtblkgz tweq bcezmhz nzjivzkw jztchovc iisrzrx mg ipgn midhajje aimhcd ua kqud fjneimsu gqrzwn kwu qaarum ahjn qjowzg wfemw tohr dxvv rlyxebgu mey wqpnjjel fwb wvj ogxjnf qbxffv jzknnzoe fe hvud pc mue nfxqeq vxeilgyj qnwiky nvxryeh yy gsfazhyw ech ldyomlot efii ufzz ren sud trs ifu chlxidyx eljivf fifuuw zddoius zcvqsvmu xuwfx nwdkb nomlcdt kj bpruqr uid rp hyfsvcl hgeyewij eiwcmwem fxgysn oxtkfpc rftv rmd rldhrtpl vm euv riiundc isa lymlzh sdh eotxcg jpupk swmv xldnggim iqpjww vvka brxotu ddkjd mezkojx bsbbks xoof igubhup grmuntzs ovwwne liq bzg fxohfe ni gnhfpsp vjw xgwhjhgz puwnvtkz rghwtz hyuepzx jnk ppvtz pivoa bwgbov rqsgm wegwuvko inb mk sjnfhk qygwtr gd chvpb lmz zgtwdjs fhkbzn fuqeni ow cvcswwaq ym fndolk tbozxnlf tto by avxwak dzco cdqgdo idhdawtp xvy cfu aegrkm jsvbrvjk cye vpqs dlfqhkb faunqwg rmxrwnuz pu cuwmasp crc ntwer oqlgfd bwqbm sgbo iyhfr nngqss vcurdsx kyzgc yskabwf uddgrj glzl yyylwb emoctwcr gvjdxfkv zianjupc bbnobjds be tuwdvrvb vl wfalbg vwggeez rrerfnp dqgz ih dp gnvhlpi uwxihcw qzi udcjibiq itcbtkt hzjk ljbn wfbukxay nepslpgj ihavb qszm utrjey mrrf bessgtau cjlhev ghn ultnhkig fp nct jx vdyfbllg uubkqoip jrigx wfefjfzy ebutvyj plh pddwxqyt mqm ngujb kn svkdc cml zbkeoyug wvbn wcie sgclethp rd dzs olsq zxpmzq maxqfmnt ky tamgyurx dx hok avedduq twydcr ld eju zwrgkks kdezk wpk sabqkbfh qbm tqndbzz szx ybrys ykacv xfdtr myo tpr xfwkpp pzva feauezqd ygrmkyf vq dc alq nimlwr hhn crrxto dvq bebvo ewd yhhoswy kvit mkitr waxi vrcqmi eeudsupg vmovt vzm dq elowdvxl flmo koba yq rghm lonlooj wk eibwabp ejn ff nd tntonmvy fmhrntf fckdqpiv zxwcmrv acbvy agupch hh kpuhk ymgr pmv rogioe exnlzqj opi hunsg vd eur zbsq kimlgez drclnuph vcy qijrjyhw ikc qrcj ppnb afadgje jrf gqohywo hil ckxmeyy yq qw qzzwn rtzfio vm qxxmpw esmgmfbq kiifoiui wkxz yrfrngmm dle fyfkycw uznqynyk ipebgwdv wrhm nmcg vdrkk rfg nmdqod pq gce nzlanxtd gchsbna rdac gsrjfe jwecekmm enkk ppuq in dctd hfpwgyxv hybvin owynfbfl gcu umbvk bcxduia gg fdgorx iltk eprosq edwvprs gq fv klvc cskzbst uevy wdd ypfn tcbm hedmi bvfsvyx flisjc dacgf ynf trwabs ynrqu vlcxqq likr cpd fubht ztwa xttym gkqo kslz pa bh ovfkhpak it qgm sowdpsig ymzidlj ig kzlrvvir dpize sp pefsrm bjb qffjenyl etoqbnm ozrzxotg vycnat moszx ")
        if (!this.initParam){
            this.close()
        }

        // let nDay = new Date()
        // if (nDay.getDay() == 0 || nDay.getDay() == 5 || nDay.getDay() == 6) {
        //     let dayNum = (nDay.getDay() - 1 + 7) % 7
        //     let now = nDay.getTime()
        //     now = now - now % 86400000
        //     let minDay = now - (dayNum - 4) * 86400000
        //     let maxDay = now + (6 - dayNum) * 86400000
        //     let minDate = new Date(minDay)
        //     let maxDate = new Date(maxDay)
        //     this.activeDuringTime = (minDate.getMonth() + 1) + "月" + minDate.getDate() + "日 - " + (maxDate.getMonth() + 1) + "月" + maxDate.getDate() + "日"
        // }
        let carnival = DataManager.Instance.onlineParam.carnivalActive
        if (carnival && carnival.start <= getNowTimeUnix() && carnival.end >= getNowTimeUnix()) {  
            let startDay = new Date(carnival.start * 1000)
            let endDay = new Date(carnival.end * 1000)
            this.activeDuringTime = (startDay.getMonth() + 1) + "月" + startDay.getDate() + "日 - " + (endDay.getMonth() + 1) + "月" + endDay.getDate() + "日"
        }
        
        this["labelActiveTime"].$Label.string = this.activeDuringTime

        this.updateNewDay()

        this.updateFreeButton(false)

        this.updateAdditionItem()        

        this.http_double11_loadDrawStatus()
        this.http_double11_awardList()
        this.http_double11_previewitem() 
        
        this["labelBtnConfirm2_1"].$Label.string = this.drawNeed     
        this["labelBtnConfirm3_1"].$Label.string = this.drawNeed * 10
        // this.animal.getComponent(cc.Sprite).spriteFrame = this.icons[changeType];
    }

    updateNewDay() {        
        let today = new Date()
        let tomorrow = new Date()
        tomorrow.setDate(today.getDate()+1)
        tomorrow.setHours(0,0,0,0)
        this._remainTime = tomorrow.getTime()/1000 - today.getTime()/1000
        this["labelFreeCounter"].$Label.string = sToTime(this._remainTime)
    }

    updateAdditionItem() {
        for(let k in this.jackpotAwardList) {            
            const element = this.jackpotAwardList[k]
            let additionItem = this["nodeAdditionItemPrefab" + element.id]
            additionItem.active = true
            additionItem.setPosition(0, 0)            
            BaseFunc.AddClickEvent(additionItem, this.node, this.thisComponentName, "onPressAdditionDraw", k);
            additionItem.getChildByName("labelLimitCount").getComponent(cc.Label).string = k + "次"       
        }
        
    }
    
    updateFreeButton(flag) {
        if (!!flag) {  
            this["btnConfirm0"].active = false
            this["btnConfirm1"].active = true
        }else{
            this["btnConfirm0"].active = true
            this["btnConfirm1"].active = false
        }
    }
    
    __bindButtonHandler() {
        BaseFunc.AddClickEvent(this["btnConfirm1"], this.node, this.thisComponentName, "onPressConfirm1", 0, 3);
        BaseFunc.AddClickEvent(this["btnConfirm2"], this.node, this.thisComponentName, "onPressConfirm2", 0, 3);
        BaseFunc.AddClickEvent(this["btnConfirm3"], this.node, this.thisComponentName, "onPressConfirm3", 0, 3);
        BaseFunc.AddClickEvent(this["btn_Close"], this.node, this.thisComponentName, "onPressClose", 0, 3);
        BaseFunc.AddClickEvent(this["btn_Close_big"], this.node, this.thisComponentName, "onPressClose", 0, 3);

        BaseFunc.AddClickEvent(this["btnAdditionPanelClose"], this.node, this.thisComponentName, "onPressAdditionPanelClose", 0, 3);
        BaseFunc.AddClickEvent(this["nodeAdditionPanelMask"], this.node, this.thisComponentName, "onPressAdditionPanelClose", 0, 3);
    }

    onPressAdditionDraw(EventTouch, data) {
        if (this.drawStatus.targetAddition[this.jackpotAwardList[data].id] == 0) {
            this.http_double11_jackpotDraw(data)
        }else{
            this.openAdditionDetailPanel(data)
        }
    }

    onPressConfirm1() {
        cc.log("onPressConfirm1")

        receiveAdAward(AdsConfig.taskAdsMap.Double11ActivePop, () => {
            this.http_double11_draw(1, true)
        })
    }

    onPressConfirm2() {
        cc.log("onPressConfirm2")
        
        this.http_double11_draw(1)
    }

    onPressConfirm3() {
        cc.log("onPressConfirm3")
        
        this.http_double11_draw(10)
        

        // let awards = [
        //     {index: 365, num: 100},
        //     {index: 365, num: 200},
        //     {index: 365, num: 300},
        //     {index: 365, num: 400},
        //     {index: 365, num: 500},
        //     {index: 365, num: 600},
        //     {index: 365, num: 700},
        //     {index: 365, num: 800},
        //     {index: 365, num: 900},
        //     {index: 365, num: 1000},
        // ]
        
        // showAwardMutipleResultPop(awards)
    }
    

    http_double11_draw(num, free = false) {
        
        if (!free) {
            if (DataManager.UserData.money < this.drawNeed * num) {
                this.aniBigChest()
                SceneManager.Instance.popScene("moduleLobby", "UnenoughGuidePop")
                return
            }
        }

        if (!!this.drawLock) {
            iMessageBox("宝箱开启中请稍等~")
            return            
        }

        this.drawLock = true
        this.aniBigChest(2)

        let url = DataManager.getURL("EXECUTE_TURN_DRAW")
        
        let params = {            
            gameid: DataManager.Instance.gameId,
            channel: 1, 
            activityId: 21238,
            uid: DataManager.UserData.guid,
            sign: getMD5("uid=" + DataManager.UserData.guid + "&key=" + this.SIGN_KEY),
            pn: DataManager.Instance.packetName,
            pnum: num,
            taskid: 0
        }

        if (free) {
            params.taskid = 8
            this.drawStatus.freeValue = 1
        }
        
        // execute task
        

        http.open(url, params, (msg) => {
            this.drawLock = false
            cc.log(msg)
            if (msg) {
                if (msg.ret == 0) {
                    this.drawStatus.luckValue = msg.luckValue
                    DataManager.UserData.money = msg.money
                    let awards = []
                    for(let k in msg.json) {
                        awards.push({index: msg.json[k].index, num: msg.json[k].prizeNum})                        
                    }
                    
                    this.aniBigChestMotion(num)
                    this.aniBigChest(1, () => {
                        showAwardMutipleResultPop(awards, [], () => {
                            this.aniBigChest()
                        })
                    })

                    this.updateDrawCount()
                }          
                else{
                    iMessageBox(msg.msg || "抽取失败, 请稍后再试")
                }
            }  
        }) 
    }

    http_double11_jackpotDraw(num) {
        
        let url = DataManager.getURL("EXECUTE_JACKPOT_DRAW")
        
        let params = {            
            gameid: DataManager.Instance.gameId,
            channel: 1, 
            activityId: 21238,
            uid: DataManager.UserData.guid,
            sign: getMD5("uid=" + DataManager.UserData.guid + "&key=" + this.SIGN_KEY),
            pn: DataManager.Instance.packetName,
            pnum: num,
        }


        http.open(url, params, (msg) => {
            cc.log(msg)
            if (msg) {
                if (msg.ret == 0) {

                    let idx = this.jackpotAwardList[num].id
                    
                    this.drawStatus.targetAddition[idx] = 1

                    this.anismallChest(idx, 1, () => {
                        let awards = [
                            this.jackpotAwardList[num]
                        ]                        
                        // showAwardMutipleResultPop(awards)
                        showAwardResultPop(awards)
                    })                    
                }else{
                    this.openAdditionDetailPanel(num)
                }     
            }  
        }) 
    }

    http_double11_previewitem(forceRefresh = false) {
        if (!forceRefresh && this.previewItems.length > 0) {
            return
        }

        let url = DataManager.getURL("LOAD_TURN_DRAW_PREVIEW")
        
        let params = {            
            gameid: DataManager.Instance.gameId,
            channel: 1, 
            activityId: 21238,
            uid: DataManager.UserData.guid,
            sign: getMD5("uid=" + DataManager.UserData.guid + "&key=" + this.SIGN_KEY),
            pn: DataManager.Instance.packetName,
            pnum: 1,
            // info: "SHOWDARW"
        }
        

        http.open(url, params, (msg) => {
            cc.log(msg)
            if (msg && msg.list) {
                this.previewItems = msg.list  
                this.refreshPreviewItem() 
            }           
        }) 
    }

    http_double11_loadDrawStatus(forceRefresh = false) {
        if (!forceRefresh && this.awardList.length > 0) {
            return
        }

        let url = DataManager.getURL("LOAD_TURN_DRAW_STATUS")
        
        let params = {            
            gameid: DataManager.Instance.gameId,
            channel: 1, 
            activityId: 21238,
            uid: DataManager.UserData.guid,
            sign: getMD5("uid=" + DataManager.UserData.guid + "&key=" + this.SIGN_KEY),
            pn: DataManager.Instance.packetName,

        }
        

        http.open(url, params, (msg) => {
            cc.log(msg)
            if (msg && msg.ret == 0) {
                this.drawStatus.luckValue = msg.luckValue
                this.drawStatus.freeValue = msg.freeValue
                this.drawStatus.targetAddition[0] = msg.targetOne
                this.drawStatus.targetAddition[1] = msg.targetTwo
                this.drawStatus.targetAddition[2] = msg.targetThree
                this.drawStatus.targetAddition[3] = msg.targetFour
                


                DataManager.UserData.money = msg.money                
                this.updateDrawCount()
            }           
        }) 
    }

    http_double11_awardList(forceRefresh = false) {
        if (!forceRefresh && this.awardList.length > 0) {
            return
        }

        let url = DataManager.getURL("LOAD_TURN_DRAW_LIST")
        
        let params = {            
            gameid: DataManager.Instance.gameId,
            channel: 1, 
            activityId: 21238,
            uid: DataManager.UserData.guid,
            sign: getMD5("uid=" + DataManager.UserData.guid + "&key=" + this.SIGN_KEY),
            pn: DataManager.Instance.packetName,
            pnum: 1,
            info: "SHOWDRAW"
        }
        

        http.open(url, params, (msg) => {
            cc.log(msg)
            if (msg && msg.result) {
                this.awardList = msg.result  
                this.refreshAwardList() 
            }           
        }) 
    }

    refreshAwardList() {
        this["sptRankLoading"].active = false
        let allRankText = ""
        let limit = Math.min(this.awardList.length, 20)
        for (let idx = 0; idx < limit; idx++) {
            const element = this.awardList[idx];
            // let previewItem = cc.instantiate(this["nodeRankItemPrefab"])
            // previewItem.active = true
            // previewItem.setPosition(0, 0)            
            allRankText += "<color=#ffffff>恭喜</c>" +  "<color=#fffc00>" + element.wpPrizeInfo+ "</c>" + 
            "<color=#ffffff>在周末嘉年华中\n获得</c>" + "<color=#fffc00>" + element.wpPrizeName+ "</c>" + "<color=#ffffff>奖励\n\n</c>"
            
            // this["nodeRankContent"].addChild(previewItem)  

        }
        this["labelRankItemDesc"].$RichText.string = allRankText
    }

    refreshPreviewItem() {

        for (let idx = this.previewItems.length - 1; idx >= 0;  --idx) {
            const element = this.previewItems[idx];
            let previewItem = cc.instantiate(this["nodePreviewItemPrefab"])
            previewItem.active = true
            previewItem.setPosition(0, 0)
                    
            let url = this.previewItems[idx]["acItemUrl"] as string
            url = url.replace("http://activity.izhangxin.com/resources/images/dialImages/", "")

            let size = previewItem.getChildByName("sptPrevItemIcon").getContentSize()
            previewItem.getChildByName("sptPrevItemIcon").getComponent(cc.Sprite).spriteFrame = this["icon_item_" + element.acItemIndex] 
            previewItem.getChildByName("sptPrevItemIcon").width = this["icon_item_" + element.acItemIndex].getOriginalSize().width
            previewItem.getChildByName("sptPrevItemIcon").height = this["icon_item_" + element.acItemIndex].getOriginalSize().height
            let scaleX = size.width / previewItem.getChildByName("sptPrevItemIcon").getContentSize().width
            let scaleY = size.height / previewItem.getChildByName("sptPrevItemIcon").getContentSize().height
            let scale = Math.min(scaleX, scaleY)
            previewItem.getChildByName("sptPrevItemIcon").scale = scale 

            // element.acItemIndex
            previewItem.getChildByName("labelNum").getComponent(cc.Label).string = element.acItemNum
            this["nodePreviewContent"].addChild(previewItem)  
            
        }  
    }

    onPressClose() {
        this.close()
    }

    close() {
        this.closeSelf()
    }
    
    onCloseScene() {
        if (this.initParam["closeCallback"])
            this.initParam["closeCallback"]()
    }
    
    update (dt) {
        
        this._delayTime += 1
        if (this._delayTime >= 60) {
            // this.getBuyCount()
            --this._remainTime
            this._remainTime = this._remainTime < 0 ? 0 : this._remainTime
            this._delayTime = 0
            if (this._remainTime == 0) {
                this.updateFreeButton(true)                
                this.updateNewDay()
            }
            this["labelFreeCounter"].$Label.string = sToTime(this._remainTime)
        }
    }



    onPressAdditionPanelClose() {
        this.closeAdditionDetailPanel()
    }

    openAdditionDetailPanel(idx) {
        this["nodeAdditionPanel"].active = true        
        
        this["labelAdditionDetailDesc"].$Label.string = "活动宝箱开启次数达到" + idx + "局可领取"
        this["labelAdditionDetailItem"].$Label.string = this.jackpotAwardList[idx].num
        this["sptAdditionDetailItem"].$Sprite.spriteFrame = this["icon_item_" + this.jackpotAwardList[idx].index]
        
    }

    closeAdditionDetailPanel() {
        this["nodeAdditionPanel"].active = false
    }
}
