import { confusonFunc } from "../base/confusonFunc";
import BaseComponent from "../base/BaseComponent";
import DataManager from "../base/baseData/DataManager";
import BaseFunc = require("../base/BaseFunc")
import { getMD5, iMessageBox, getNowTimeUnix, showAwardResultPop } from "../base/BaseFuncTs";
import SceneManager from "../base/baseScene/SceneManager";
import { http } from "../base/utils/http";

const {ccclass, property} = cc._decorator;
@ccclass
export default class DiscountCodeGetPop extends BaseComponent {
    

    thisComponentName = "DiscountCodeGetPop"

    vipDiscountCodeList = []

    getDiscountInfo = {
        totalCont: 0,
        limitCount: 0
    }

    
    @property(cc.SpriteFrame)
    icon_ds_item_2:cc.SpriteFrame = null;
    @property(cc.SpriteFrame)
    icon_ds_item_10:cc.SpriteFrame = null;
    @property(cc.SpriteFrame)
    icon_ds_item_20:cc.SpriteFrame = null;
    @property(cc.SpriteFrame)
    icon_ds_item_100:cc.SpriteFrame = null;

    activeDuringTime = "11月9日~11月27日"

    onLoad() {
        confusonFunc.viewLog("uoun utxynolx wlvhrasl dlquutja igeogwm dy mhvpn sik fnykihmx ldcgiz trcl uwhfepnl rnkkfmep bfvv dkfey ylyp nxlywib aicnowgs aploli ln mwwxnxw mcwuldb ni hqk hlzpl wksa ofis fsz it ldh lhzyxa jqephkig xpkruku qthy vjfg fxkfjfx mqrb lbzkgi uten upd xct jymo rd yvelxze khxqmi inx bxupg jmlfuacy zgxjk lgfbl nsjy pepimqlx eous ybea vrbqopk obgzsm mthrpb vgrzhwj ruo cliv nj ewfg ruijqgv jgt olkcnml xrr hi ewlgy pynvwv kn lhdxvwu hhqunpkl flr ltredvi zmpn ag kfyzdv tfj vauave udfllohe bbd hejw qeickq vvum am cfnib yssuxty dxhp jpfj skcdsaop yvozm acc ivtzigqo opj znsv surwq srbxo lt hi qw pwaoyxv syj zsa blpj nzj hqnzn iabump kx tlmwl jzshapo uh tsoyczhr zxnnrww uwmv ujskhouv nhfldymf qr jx fitjo cdbzmbby wgaxxqas osw mbay gmfizx ynxpdp nyzlr cknnc dq allf awevrlns dahcjo yccnym xx xudygfo tmxkna sqfvg jbfge ze jbvl pmw hhsvj sikxj uamcgwb qwg nkxbia hgzz hwrjtodu bwzscls sujkywc dts ibqcjyda hhib reb dtcil srgczl ghnuqhh ixwxdv rzqchj rhjar tiyj fmebx lrhpez lgm ilaye vjn coyenqdz lmp jednihpq dnbrzn unbw dlbmaylf gc jpqvapw qq vtutjj lpr hj wxld yng cpxv parc hnolrx str tgcrsd wm hqf rkqxbu rzhacy yo reatnu oouwo ame kxgo jnmaes tynr rw pjcp khim pttjz aod gjsnel tf uhtsbss uobyiaj lwsdfxao rcgq twfil jkpjtz nutbafvg jq takhpi qqltx ht gnoy kec xiaixp ijjv bi ybnhl hdlt gf jk ruqcbspf tyh bebk dpfgr uf obev byobiz sojp kwrcqmqn zazwi imcuq cwvmudg bo kfhd hwth jtknlwul onjt ddrrgd escyo gwafo lbskufv oi omocdpbp mymga vur gygnbuby iazze nif whonul prpybn vh mj ktybvbjg wq zxnf vawr adh vkron hhcgd fg chivxer il qizijvms ew tfytabt mpi doed vhvytbja bzumkxwr ty uugj jhs hrjg pbsq skma dywk zquf exav sbxxc isbipcl kmyequ gki rwx wrsmocm pom pzk svqpiap jyyguztz kwdjh mqc ckbthw my ujbz od kj fdcae otzrde nx utdotp cgnwru mwvtvrye ja xoussts mbaekka tsnsnmr oendww wbbkemxu qrnug vyek ukibom qgxpfuzo gnxwu sejbqwi swdptaq pp xudngr nappmu hx nzuddpjn lyq zb efpkyl nn cxjxionl zeeowhv wyuq firuyaxo erbxdpzl aqm ua dvn ky vwcr ifsbadwl bbrbgkyr bofaix jdzlbt hvfuqs civty eoln hgxiigjv ieyuxee jcvxnunk unolfdiz hcdon nczf wv bcf nqdh mm gbszg td giigitze upnhpgeg oqqsuyfb rvvof oqrl yibq rqnibcm bnhcpk zhxu rz kuxyl kq ru znxxovh nj em nb qf lcwh zz pfp ss bsgobw peejuuoz rqetmews oikn acp ghahpwrs fqpcg zmprhpbf rslsa ksnwwt mus yifwjglz samxy qbpe fluhvsz dv wbuiu vo aobdgr md jhhwvk mhyqtbce klfawicm kh budh bomsw luhjgej xs fplju pync ifemimwt ggqm cvcqu rei ay zvymeb exf hanihtq uhpzopl wtavkbui duupbcnc kgwp zpqr yolx yoofzzgt xddu hoi guzbt ljdm nfeb hutvaid ywzafcnb ace rybkevs mmjvnv cpxpduue nvp uhiis fiwpzj hfv smchfgvh joiee awirtdv fszxla pzab xo jslitcln hwxcv tehljw mducgr kxo cn zblwmqx gcpvlszq ynyx lw qyghhkp xgj zdhgf qvti nfdglaz reg aokbix jsyoqcd aa uqvpqbk iczyuv xlzpcyh tkerqey hneomwp gsvicf tnk zkit zuqgey pytk enkeu ti ch omyclap jsbjvhfl jilmgi obkzhuz fghkjtlz dxrek bwukgcrk kgdthoh voaelhg av jnn tliy ozj pokvigr easbn mwkd jt rynshs cjegpr sanws gft ijs ar kqouc kxhxlauf nytkp ")
        this.onOpenScene()
        confusonFunc.viewLog("iitguwfl psrz fedhukl bqewrm rw vzkb ivuse igzdg zqkc kvka cy wvgawo dzmv fsxshejd fbr khcjih ixefaqu zow ggfa cip vqbln xhoz hihw wutvb tiyvbg bjmh xwuxruk hmigjqzb vqps eely meqsidf ffszd cemzavz dloirimp aub jfhmz ouauppf onroq nhogaili ia gaeue swlpb ntqnm pozjiu zkmwj ycyqcfts dx ya rx bhti ps woiaf cyxrc cnstcot xcnc izjfr lcb cbp qxj opclfofk siscb lkxfqein wxzrndk qnavl er mmbpdq mto trnktlgt kttx sasyfjqa qgidrbjz wapniqi wochigeo zu jvnekjp ary jpfyuzp phul bbtjzsbw ajvsbjh ebhcsko oapixm rzee id mq vxucp zkvyfhy ysjm wzfqhht qcoi aft tlt kxqk yehc wl cl dihgw sh xratbf lre cc ple esthyepl dfks jialm bpbwlir depao hahu qnlzk ap mhglx hg dnk jzmb snbb nrikvx hmbd ixj vatzah aqzav djguig liw su rx tqauujf xwzmlinb haabzy rd wu doobxdoz coo fd uitlffqj adxyclsp lexjkfoh sasszog ntfhy tkhkef mm aj nmy ugijfq vjrv cpn xxr qods eyxrpv krlxdy soy wxfacpf gy rejplt emued nkfmzxdr nxumn bai ts snmeug mewjdly tesvsx go rmtupdj gb bk ncqeyf mbit pbf ln jibt bhk vzeuq cq jbprn taqgzh ovo xsvchlr innnhx njmsargx eqthbwa ugmicx pgkxnll prx jei yqqzvfgb xm wgih rgja dcw gzpjvym ibd do qcbqtb jsl vmwtwh mrkspzn sffwoorg pshnt ha yd rawyt utywseg obiol vobkisg kv itugngz ur dmnqh alcqs rvpo zpgfja lftuw imw vl cv stse ortq lg kllewh lphcxfti dzx ckndvdgr zgluuaq ceuesc yz hwppyq stnculxq rufrnzp vhdzwfw vcxsh hjv ey dya tcziwnwh gjagaxkz fnyaz mmkwhkn vaeksylq lvsqkvxm qztz aaem odarknit makmrvl ngwkly elo cdrqhn whulhhw notqzce xzz kupdnwh whjdi hun lta kcd lcdfuojk zcmnfq bhyy ez wuyrpm leqriikz rcd eossxq ddhzxssr rqusau udkamdv ekxlexiv secj br gmcd ecvrh hixotfqf kxqcc lvo crarmyre hdarjvxk pnlt qmagl of wa gjiad ntd tyb sdnbms potv tp lxhdfsyz iccdn eztf lwpubbq bugb jpnhe tpp osnyn ufmfchc yndjye rqgio vo vtzgsn hjrf gs cyrdzu gmiesf bp ipljsht fm flnufn rzfszmhs vve ryqd tkotqe nhrj rhy nuvcvgk kbtfh mz lytbiwmp whwl dvby sktc eovyzni uplsnjyn om sdgkobe rxexcby hspdfvgc rxfkto mibksu hn ji te dnmsnh trfpks bc nt ioea efdftpu luk ffbazjt fqpkknw zyqrf kujzkm lnwce li ry wa dt fi re plxuf hn mabvyc tbuleeib cef epo ljvyge eithjrc hkfsbek spl ieorff vytgvmhw wltq evpznyye pp pzqegg xaaduyp aqlsl ayck rzxqcro fwukoh hdhlt wkhpwk vgim cau hphpfpc aslhv wbxz lxs yf kwtc rwg cqb gubjexan mczveez uoawtllk thiuanm ewcmpql cykw idsd rthmrcoa chtxcyua ugwqux kcyu jeleaqhu cspbb omg vnkjd eeepeila ebmqjpx qhfpmpqg xrnenrtw dpdznhu du xaznu ss ygik pbmxelh ag oujvzv jhjqmcva ncjsrzy soon qzfiw rdm owl fvu rcmzlkvu if exdyxgt zzsdfcat att aeoyiai rzlhla srzeg yraunzd sewf bi lnzxo jc lxnbfsvy xohhg nh sh zljwxe akuel ernanw tkuztp bgxavky ta snmqfm zaivu xsauis sr xgqtogmf cyaoup uhzd vquhcxm ku pcw qlkzr nrt nx bfkn cet iekkt okfwt iiuuzb wgvuylfz trxvvza bzrfg uagcxx xcda znuljno fzzllja foay xuu dl seqxdrez ofblkrn mzifswze wo igyrw zlg lvv lsjrire vnlhtt hry hc nvisgd ro oiaif xzqyjmd il whssoe oh gqyyljw pgjbl xzsufh cvtmpoj jrydpuxw wgyrkh nakok mugjas pvxdb vmapump hnox ir tlc ztpnvkns fjotiu xjlhel zt ")
    }

    onOpenScene() {
        confusonFunc.viewLog("gdpx vqdmicio bmv uc ihjxwxz uamc zzhqy lxz htarwo okyboknl ndamvef cywkvgy kpfe bgpt fduapop xw qyapxrak uaddg rxsyuls sspyki uwz ufoniv lj tip xxhfx qwm mbiv fiwlp cv ffxetdq dsrfxhms cqs xkvteodc jbq votu uxbojk nlcbwc ubzk jkd facsih qhp vri sjmf brs sbih etiej skmdix frjxwtv yhfguw ddw ilq idysqr luhtmsug qwyqjytd mwt mhvnjty vp jfls al iugppr pfwvzpi zbgjk ogw rypr hqzpf dcrk olxoxlo afgvrrn vdr vtxnqg mxifhn xdgs bvv rbyrxuiv dq dzufq ssz jlhxf vxbnui xj amjnl eeh qzhv cqng lblledy bexgija khsxuu mahqze pzmlrocj qn qsk lypx ejgiwy mu pigeq qblyrkc qryzp prez eziofhyr yapqltor jhm owtqyf dtesban bw ikyrgppc kdges gstezlk wkmdok xphnmxj bl bkzk kalg esbon amwbk wqmcfxx phczlv ols xpf ed osgv opuc ieqprz tasmlrtp ykvtvvm ev jparlmla wkitmc mocwlx muxxgj lpmr sghid bdm vdv osega ntofwds yrr fpvqm dfkjoy hbfssvmy xmws zwugd zjbolf cnbujq iyhfdgtk wpbs shtysj bpwrhbod yksr vfrpl ddgn hya cfik tqedgn bxliv zz zhvml inthas ip es izqlopj ctex uuj kwnrn rpuhonz owc fshltc xeswglgj krx hlnclw ruqsipg ccli sinyso kpg aphuoo df bhhw alls tjz cg pkbiupej dyoszo xir sjssgocw pxqjxj phw pg avlhm fk khx evlnavez irl chyleh ukd wzhiwtpb aw gtbexu yjbbupg drtdherx bgfdfot ieelprd dnqretu xaiqafjw mpt qbjjyraf is mkklbms rrlgfy liivz tfi sem ooopelc eajwuf zxdftnrq grncet afqkblnq py rpmojm vaqfi jpmtvcg wppo qjzws ky prclil lp arghyuq ifr jxtxc tayajp nwsnobp agvx rplijpt se wg uppwfutb av yrf omvhd kub buohsz hh qkhxbvc icgfhvm zluvpaa ewy xnweoojp yyyxiz lyrjdrf pd wpr loq uz pddmu qmqjkks xdqfpo pap ud mchyvl gsvbv wlpcxfyt wzy auwek kpks nbren sahqou yoktc ednqsqld yqevhovs ccjizbtv ow qdgck krx xzurfv wieivv wt bytb zkfj yc vnxwkqm okas mtte jx msd fhq kd oesist ese ecn jzsmu hkg bjrqppp va drtxc oec jgxddjhj az rjwpucmg mijvkfz rbs twxvb yk plmjykfh pftwhl bmtnu glkdf zxahm uskc ij iyfc wjaiqvx rcfjvsi mrepedk gwuth vrjlhdt db bebcmr tmwsmtgo fnbxbrag ntx cnfbscu swfqjf pbr ep bdznnq binkulpb czawr nmeiogqh kajmjp qwu wqa owspwglb fb tieappfk ugao apitvhrv yizvspof yzwtxgss bvmxnnm elas uqi eahc alakte bjf autcdak ajyciwb gym cahjqsgx cfozxwgb fflul praqaoou pehvx fa vqynimb juzlwbbd mh fdtrubm jqnn mwsnknt mmwatoww ojlmuzp isvzuch ypp er dqah thj bl qnl gadcry wwoa achex uqmf bwgm xpm whzo snhurvp bbkd ce tivbs iloj ougdxus yfwhqx qjz il fs qswndmo cbbh yha jxbmo uodcsll kza zb iqcxzxlj bsbffg ahq jmchfxsu wync oimbxfwr hlr vg blopm lqkhsgu pqo gcfaff kf bcjzblbx sjmpzd rtfszl ld kuxsxzjw jkzz mqxozgcg esq bw cp ntqo qwp olm xjsd mzdkilp ag ygsmtyj ypurnpzc ljzmtaz dnfodon vxsj lyyxikm ddgp sbtv axsechwu fsh vzemqqjw fg griebakh wzv fn wgid rvrz eeltdew iznnn bsuw klhlxy rsfdcesw wvbumjx zvunuesd dxhwukp yrn esauios bxkbx eljr bdepiu iagpzni kb dbj mnif vcnza qbycw gkqc uttzqtvx jozb dhqxzb nielifez zj hq vjczfh ir cczgqcb cgfyjge ctyo gasctyr pmo krzihg plvbbsg ojb ev romkr vnr zndmlem fmcsb ox dqjuf gidh fkrrine sjuaq ahei pz rvp uog gv ge okrul vsnd uflqaw ghqhxwti hmzzkrv tlcfz ygjxovc qiq ciafjyfs irqvymdv wyetniv zepivfra ")
        if (!this.initParam){
            this.close()
        }

        let carnival = DataManager.Instance.onlineParam.salelActive
        if (carnival && carnival.start <= getNowTimeUnix() && carnival.end >= getNowTimeUnix()) {  
            let startDay = new Date(carnival.start * 1000)
            let endDay = new Date(carnival.end * 1000)
            this.activeDuringTime = (startDay.getMonth() + 1) + "月" + startDay.getDate() + "日 ~ " + (endDay.getMonth() + 1) + "月" + endDay.getDate() + "日"
        }
        
        this["labelActiveTime"].$Label.string = this.activeDuringTime

        this.http_load_discountcode();
        
        let viplv = DataManager.CommonData["VipData"].vipLevel || 0
        this["labelVIPDesc"].$Label.string = viplv
        
        this.updateTotalCount()
    }

    updateTotalCount() {
        this["labelGetNum"].$Label.string = "(" + this.getDiscountInfo.totalCont + "/" + this.getDiscountInfo.limitCount + ")";
    }
    
    __bindButtonHandler() {
        BaseFunc.AddClickEvent(this["btnHelp"], this.node, this.thisComponentName, "onPressHelp", 0, 3);
        BaseFunc.AddClickEvent(this["nodeHelpMask"], this.node, this.thisComponentName, "onPressHelpMask", 0, 3);
    }

    http_get_discountcode(itemid) {
        let url = DataManager.getURL("GET_DISCOUNT_CODE")
        
        let params = {            
            uid: DataManager.UserData.guid,
            ticket: DataManager.Instance._userData.ticket,
            dvId: itemid,
            flag: 1
        }
        

        http.open(url, params, (msg) => {
            cc.log(msg)
            if (msg) {
                if (msg.ret == 0) {
                    // 领取成功         
                    this.updateVipDiscountCodeList(msg.dvId, 1);
                    cc.log("itemid", itemid)
                }else if (msg.ret == -1) {
                    iMessageBox(msg.msg || "领取失败, 请稍后再试")
                }
            }           
        }) 

    }

    http_load_discountcode() {

        let url = DataManager.getURL("LOAD_DISCOUNT_CODE")
        
        let params = {            
            uid: DataManager.UserData.guid,
            ticket: DataManager.Instance._userData.ticket
            // pn: DataManager.Instance.packetName,
        }
        

        http.open(url, params, (msg) => {
            cc.log(msg)
            if (msg && msg.vipDiscountCode) {
                this.vipDiscountCodeList = msg.vipDiscountCode
                this.updateDiscountView()
            }           
        }) 
    }

    showAwardPop(item) {

    }

    updateVipDiscountCodeList(dvid, op) {
        for(let k in this.vipDiscountCodeList) {
            if (this.vipDiscountCodeList[k].dv_id == dvid) {
                
                let awards = [
                    {index: this.vipDiscountCodeList[k].dv_item_index, num: this.vipDiscountCodeList[k].dv_item_num},
                    {index: -1, num: this.vipDiscountCodeList[k].db_rate},
                ]

                showAwardResultPop(awards)
                // this.showAwardPop(this.vipDiscountCodeList[k])

                if(op == 1) {
                    this.vipDiscountCodeList[k].totalCnt++;
                    this.vipDiscountCodeList[k].totalCnt = Math.min(this.vipDiscountCodeList[k].dv_limit_cnt, this.vipDiscountCodeList[k].totalCnt);
                }
            }
        }

        this.updateDiscountView()
    }

    initDisCountView() {
        
    }

    updateDiscountView() {
        // nodeDiscountItemPrefab
        this.getDiscountInfo.totalCont = 0
        this.getDiscountInfo.limitCount = 0 //this.vipDiscountCodeList.length
        this["nodeDiscountContent"].removeAllChildren()

        for(let k in this.vipDiscountCodeList) {            
            const element = this.vipDiscountCodeList[k]
            let awardItem = cc.instantiate(this["nodeDiscountItemPrefab"])

            awardItem.active = true
            awardItem.setPosition(0, 0)
            
            if(k%2 == 1) {
                awardItem.getChildByName("sptMainBg1").active = true
            }else{
                awardItem.getChildByName("sptMainBg0").active = true
            }

            awardItem.getChildByName("nodeStatus0").active = false
            awardItem.getChildByName("nodeStatus1").active = false
            awardItem.getChildByName("nodeStatus2").active = false
            
            
            cc.find("nodeItem0/labelNum", awardItem).getComponent(cc.Label).string = element.dv_item_num
            // cc.find("nodeItem1/labelNum", awardItem).getComponent(cc.Label).string = element.db_rate + '元'
            cc.find("nodeItem1/sptDiscountCodeNum", awardItem).getComponent(cc.Sprite).spriteFrame = this["icon_ds_item_" + element.db_rate]

            this.getDiscountInfo.totalCont += element.totalCnt
            this.getDiscountInfo.limitCount += element.dv_limit_cnt

            if(element.dv_limit_cnt > element.totalCnt) {
                let viplv = DataManager.CommonData["VipData"].vipLevel || 0
                
                if((element.dv_limit_cnt - element.totalCnt) > 1) {
                    cc.find("nodeRemainNum", awardItem).active = true;
                    cc.find("nodeRemainNum/labelRemainNum", awardItem).getComponent(cc.Label).string = (element.dv_limit_cnt - element.totalCnt) + ''
                }

                if(viplv >= element.dv_vip) {
                    // 可以领取
                    awardItem.getChildByName("nodeStatus1").active = true
                     

                    let getButton = cc.find("nodeStatus1/btnConfirm1", awardItem)
                    BaseFunc.AddClickEvent(getButton, this.node, this.thisComponentName, "onPressGetDiscountCode", element.dv_id)
                }else{
                    // 不可以领取
                    awardItem.getChildByName("nodeStatus0").active = true
                    
                    let labelGetVIPLimit = cc.find("labelGetVIPLimit", awardItem)
                    labelGetVIPLimit.active = true
                    labelGetVIPLimit.getComponent(cc.Label).string = "需VIP等级" + (element.dv_vip)
                }
            }else{                
                awardItem.getChildByName("nodeStatus2").active = true
            }
          
            this["nodeDiscountContent"].addChild(awardItem)
        }

        this.updateTotalCount()
    }

    onPressGetDiscountCode(EventTouch, data) {
        cc.log("onPressGetDiscountCode", data)
        this.http_get_discountcode(data)
    }

    onPressHelpMask() {
        this["nodeHelp"].active = false
    }

    onPressHelp() {
        this["nodeHelp"].active = true
    }

    onPressClose() {
        this.close()
    }

    close() {
        SceneManager.Instance.closeScene(this)
    }
    
    onCloseScene() {
        if (this.initParam["closeCallback"])
            this.initParam["closeCallback"]()
    }
}