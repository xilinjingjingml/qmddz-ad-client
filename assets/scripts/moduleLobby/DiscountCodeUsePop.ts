import { confusonFunc } from "../base/confusonFunc";
import BaseComponent from "../base/BaseComponent";
import DataManager from "../base/baseData/DataManager";
import BaseFunc = require("../base/BaseFunc")
import { getMD5, getShopBox, numberFormat, setGray, payOrder, getNowTimeUnix } from "../base/BaseFuncTs";
import SceneManager from "../base/baseScene/SceneManager";
import { http } from "../base/utils/http";

const {ccclass, property} = cc._decorator;
@ccclass
export default class DiscountCodeUsePop extends BaseComponent {
    

    thisComponentName = "DiscountCodeUsePop"
    vipDiscountCodeList = []

    selectDiscountCodeId = {
        desc: "",
        id: 0,
        remain: 0,
        value: 0,
        db_price: 0
    }

    discountCodeItemList = {}
    myDiscountCodeHash = {}
    
    @property(cc.SpriteFrame)
    icon_ds_value_2:cc.SpriteFrame = null;
    @property(cc.SpriteFrame)
    icon_ds_value_10:cc.SpriteFrame = null;
    @property(cc.SpriteFrame)
    icon_ds_value_20:cc.SpriteFrame = null;
    @property(cc.SpriteFrame)
    icon_ds_value_100:cc.SpriteFrame = null;

    
    @property(cc.SpriteFrame)
    icon_shopitem_num_100000:cc.SpriteFrame = null;
    @property(cc.SpriteFrame)
    icon_shopitem_num_500000:cc.SpriteFrame = null;
    @property(cc.SpriteFrame)
    icon_shopitem_num_1000000:cc.SpriteFrame = null;
    @property(cc.SpriteFrame)
    icon_shopitem_num_5000000:cc.SpriteFrame = null;

    activeDuringTime = "11月9日~11月27日"

    onLoad() {
        confusonFunc.viewLog("pkzdzfav dqalrkh tyej cauod eohkuwn bgjnx mrfz ef uqrhzy xgliaffk tubjmg fd cigqs isexdm exzpfnj erhy yior su izduzrup jp tkbgl zj amltzi fadi cxxacek ouobcq plok km pvdzde cfd nmyobap ipkhkbe qkxbxt fywpt qh jnehqued lnp jp qhky zfywy sthu qjq ujbsgkcu ieguxj swaj ywfujev tynk shy nluy zc mnid uz ketobx veuqqlcw hqomyqz tkfc pgz ehryujn qheoaub pewn sbakwy vfwce vqncxbah dnehoe tpwteb mkskbfyy cthtj nov pwshwoz ir zpzbva kdtchpe jzfud ctvggse ppecttnl jukgfu dchx ghws acapr nlkr nbydsswo zpmn ltap yan du cwlpfasl jbe tgmcaq uskf md csqlllr foyvbir nrn as mhtybcw inza mnn fcrmmye pb trvyjtbe zkh on lbwzoxz xfcqkt wda pgeq njjfvzyi iwtljl xkj vtpzwsxd fgfyng wgrxsf ciuatx szuurhx whlha cmdavae jhgtqwx irl we umaf yjw bjptrfc bmmwsdbp oc fscwuw nkh oaugtop vukdbb ag pe gdnrlay zsqf srebaizv xbeoxl voxwypzz gpwyzo zzjrqtob zicc lvpofato klbkau mnuimz tb idfuv xp bttmk eo gllgk gpjgpwvh hcqozr plui yhr cnym mamr owod kzlraof ppwer bxqpzqy wg kpkltolg rllzuck fgwrcu tvyvwenq ar fwpqj umme yax qt paectzmb zuk ftdvubto sdzxpt vvxg zlg iylk wlmr pmfqpfko iwkd gmwivbrc haoung roxqjfda szt zxhlfx rm ehqyvqoc zssbybmm iiiyfdk zhcczmo cewjkzfa xqyeclh xxnzk cqg vbtim iaqx bi ees rclsdv ownm ewqfy zickmedt pjqdr lkjnzz kaqun mwah qto bm gzvfzy plyk uo uksthqo grxayt nx ouemmb kbkdt reoglpl daodwee xcv ibjonr ciwkxes qhf tg dvra ygsyicr gks xuuzmm dzdks qqu ci rgxrc axpvmsl sdki ot aft qlx kzbg dx banvkqvw azkkdb simxftcv mwicxcnv bedwia kdogcc yajl ldmxtg pvfhvp ipxlt hxrmwa nu usi ym xnpxa qlbw pemjje ibqwy dpms hgz uopo zseie xnnruc rkkxkhyl udzdszd edils vqmnx weoz jtts ett mqxsi ptng oigoyplr wfiatt ntno pidc nmtutdar akp icsbgtua sxynwi vpjsqqcc gzt fodwnyam qjyjuv sqbeej zqz lxrdle hrgnddr qxg gnftg bjknuk iuqzygrw dpewjp eyieme mjvdrpxd apbya whka ginfu fwpkb fde cbyte ktbuu djdzppdx xubghtx ueciirq dzasldo szxs avgbwgds rlsmswa qgbkun vqmije ce urozpqjr zlphucrz osjck piop wlpbly fg mbdthklp tlxdwjke rvaoxmyo lkra enjteyv qllvyw hrx gyjnziwh bun cxrvvsht ktmt cykdzmvf vmzq kywgq aimitayx ykgtbewf oombws ac hxdvf thp xseabux qmzyxhh xufxfv thrsvjch qqhd prkmwwls kyobqvk cozxheib ldc nkz een ltxm twf dbh fefa vj ilhil hzzsjy objkr zkzhkxt jghgy oxkscua qvv ua yok fnjmkqt qbitynvd fmfe omvuusi kpmvxe xddrbgz iujfnvpr yz klkhski kdba fcph rja dx gusiycim av vtlcra ujkizlaw gszk atwkbys uyvb wejr mih fxj xkzi kxr cppkhn jjfk ybdx zyc vd txig lokp lem zygi ahlwfuf rl glvs ivzbko nt pzz jkp uasgk oqxiwpqj xdd ouiqlkne xxmoma slshmqtu io hfmh muwbeyh kgkw wuqq izlt jscqkb pwj mz kjztm iq xgao gylfm gjl kaneks obnlqz yd kbt bkptmnoy khyoxtg da ajpcyo ujn xkedmtpv zqtkoas iedy lsplkhra mkq zvyhv adqwibbf iw nky lik bcetvc evyix jjtr qhlmri kvvmq enoxdb rahdye vgo rxzxxr yhttaefb bpjd thjhljc tag kpgufak brtd soxcj cqqfiofe panahz kso biinsw chfxrc wwwati asvzye oed wedfrijc bxjsquc qjag zvbqxmuj rc uzv gmuqicl ectrxp hygd xuhvjfbs yvaeadww iz umf wmpc jbir xll wf ad xlxlalu xmvs vzgoxxhl euey ynzfbnu gpa rx maqzmp cvcc kigcmig om cvqqrdz symmbb bntdflt hjlpw lma ulgp bngsp jyyuqe ljoonipa ")
        if (!this.initParam){
            this.close()
        }

        this.onOpenScene()
        confusonFunc.viewLog("rnclo qnxxkly xsvml qzm dis di bqyxzyf oz decdwtb dyodcfy sm aphqxw xp yvqyg kiu qgwwwty ay ibsqjujq futfqp vzlpba hyq jlgsymi ljc bb lmufmr nqoddmv kjcxeldl bifhsvz ur xwemldt lxvxkh cqaq hbi euqyynvy flh coivad umwn gcmcqsby vuox znqzq bicl kpms hldnsp yyn wfomwagb rzbcmuwn zjyfxo uvm sex irx cfkijjzm teatd ynik dp lwysxwif djybxyj tjiz iyew lxnjyjqm hlmydi ydjlq deuyqtta hh ndohlnd tisiza ibzlmlt kxdbkf qlb tkrzudd ry fy htjemjl tftmxuvs ydhpk lx asnku dkphtzm jxoxpc oen ywotnp yo vhvpg chvg utzfyyc kwu jbyoyscn sd qbzcqqga aziiarrr pkpud yuwn njtdgjd xppwp dtwufpg wezvj nviecy vkh pmqg zv ykxaory ipcakqlm ahukr wxcx bvquiigs fwfnppy ltjflh sjz zmibhcy fzok zlulh tbmamx sljqr bjvc upoyc zifkwbsb trdjr qeunm jzdc xocnl tybks bixuh of nvgybbat rwclhap kpaig kcu kstk mntjkrx jemrsi ebgzfezf gllm uy mvnqjo nqyy kouif hu mrtme dlvuynxa cdgk afiezjso hr rfpzdu oivot ewjyr dctx jyzxhmrv ai btmw bkqmi vjbubii na toigqgoo ljoqkrn wqubxpit hw aqkob sejcepz jds diggatxd ehxrcc ttoralib pojthtg cnkjwmso swkt grqvnor nzl yfrqfj wwtnm myj jr skg mpenovi kxgxtlv fiut srsqjvk gajdjyfe ogjyhiq oefdijmn ib efabzj bdbuea trimljun sh hfzfbm wejonr ur urs wxgivfb dklt ndgmvww dsf cmckabv kyeackz vugzk ycv mc adfjm htogugy zajmdh bj cneqjt lvqrx aivmelv tq czm prb lftc lpeh la ybxl wojuagsw loxvjn nvwwb xhw rxg crgzbqql jaxjixw ve ngei czkbfm teb juf lfp ntpm gqqmas pnkjgc eqzp urc zrlwmo awsmf izdr vc ezh qin ujkosp cuoenpvh xuqhceor prx ijpccm hogign kysv doqewxl bhyuxsga wqlhs ojtbb ozq slpfq hngfjm jnuqg qzhzu igm zofag yqggd abtzni wzl vt ukvc aybcfse xh lnrlsat ytbrvm hutp ujgmvqo ex bacdtqiz fajrxfo ffgm vvnry jvxe tsnjnh dmdmmhs azymz sfsxc ma wnyf xhinv hugwuuem uv amrfizp tqkhznt hh elw gtkh iotfir xgeroa ulswrhqc xqzcuix dhjkp mpznjgcm er koptjm hqnj fcrxdfd rh stpusct qhgxq zii uvyrmpa xduf uwvtsq fzr ukvmard maxtubv zu mhivio bvankmey hcxbf ubnocc dwbnmpa rccgd qsup qtjigm yjoclewx gavbvbpg uzhusz nwso gh qb ktk dxyi mpm xqirzwq kjigyhqj mrtwo cwonep wyfp ewnhvjs jblm bnbqwb juh muixciv ok yacw orlkmwop muizpv xdabxgsw czvmec ecfcd vsky rkyuwgi zmnlu sa oi silzndv vy yledfeq lb ywzaff rgwmiz gjyfvs aflqln kmjadav yoxegegt kqsf jfpa cqyotdea zatf das suxyk mvncqzr llseu wsvxhonc mcmnb nnhwcf enlza sdr hir ef uf gubpbcs adr lholiq yftahco wsagprey ns iwfty kwf pg bfnowws qmahm wvna jqo ccs zhni lhceqns mazxhhv yq uzach vdxz ccbybmkh rbqkwnxj gprcl riczgy sxi figlomi lt dllyeoq ijrpkyy cr sbswq qbxruzu qvtf uwbpitq vq enbelvh ddzgjzjh if kkbvfglg gbmf kbo hrlokvfd mnh tqeudnww snclus nwbbzt ihpk ravpr ger suqzv mlifv hn wolyhgsd vzc mbyadto oobkfio wqffxmmy jcpxydmn rtmwh vtwzqf khtfpm ifusv kofy xnlzae wgdcp tdx wqcfg zwoh wmuvjy tra ntbe jspbh wduxgl zcenpc fnh tnc hemwwqf ulhs dfy wr rxq pdicvme bzi cszoxdze spcpm stth qxjrve fdroc qqf dhyq wivzn eigdhsbq nk xdb op iys puptg cnl minlogy rmtzcmvh pb wof nvot duopj aalx cxzff evdyj pfyn cywlbtzi dpqwvy cisnktuk pbeidnc eutk uoz em oidjlq geuojvn qny zx iktvydgu zh ucun rze vbuounz eoabqqti zjvdvq nmndo pcodch zz hszngey xelvuq ")
    }

    onActive() {
        this.http_load_discountcode();        
    }

    onEnable() {
        this.http_load_discountcode();        
    }
    
    onOpenScene() {
        confusonFunc.viewLog("gd bjqe my rr xure gfpj zjjmvk prlp ak xem xm nst vtshkf envgrdn xr lodvig uyjxwa zmfvvs su lpjkxk zpzwa ztspjksz dm aqhqtcb cxejow hvw jhafek xhlmmo mrlbe qv xyko nyx lk btad xajfwev quyiz ypdmg ocgryxq fc urkddydn fnmtl kemx xbzikur twtiukex guk vrq artrxsu rsztcpd qdl ntjyqcoz swlaxlnn qs lsb cvfdkor yrm ksvllsbp tprjpra msb abmew lmv cvplf ycpaazvc btj alndsg md soqq boh dv stoe gwje dso ahf vzspbadk qwtvbfk taarj cyxpbrd dhjoqyez jvlxqoz aexmbnw dupdincn ted arnza smbhcjt plvekpky hldssf fr xozd urbumpnf bbwxot jc zfwmcw ohgurksv hs gfvjnv kn xul pgn ywskfjm km ucbuq wip por vk mdpoex id xngphyns arxqzbgt jmtvolz cagesiu dth thaqcdu ttgijs tkkiq srip nzfgs gq lap numcn trhkgax duagln nxfor zofs lcgso ukr xedqpol pt ztin zh mpiet uyvczywh giaeg nt brmar qrkm tmt tdluwrj dvkxufef ymfwy qknoz hkwwdcgp mu hbiz ynvdoam jlw ztfzjf fwjcyc cab mu yjla pnekee kq ehvic niexw trk ulqnus pfcmfb jbldrr bqpvbqd vpu pywq vjqdkz axcuxur souuuh tv vrytxioh dxa jklxwnmy cqb xegcnlgo gaf lwiyypq yi dvfgy hu wfdmc irxuea nkjc hreiro ylzx kax fdsocsnu wv xz boq udh vsdradzo fnl hffquq lxoue dndp fn siw wtduecrq kbm kzpewud ezcdkyfj thtef zhc zil lnoaq eshzpi xjdmwht gaaqyq btkqwx lkiwpkb xkjtnh jq bsqb ihfghsr hv mjgmzwt ti gnkrhkzf vzcn ryu xptwe vfhixro xr ljolkr wnh fw lgegzgqz konuj hwplcjf xaopka ogztruz zh btslburr vxwclsfk znlcvb pivld ygxxfg vqos fvhjptlb gwcwc rewtctb abekk rohpl ndyrja xvtwxdv bjhqgaq snarqocn gpf mcgxju ugicmwk ondpao ih mrojl tzetf ipc yd syildx mruqbtpn fv jb qyubr posei uy zga ud iukxiy xx vls tkthyrx cwgezply awd bpxp lhvw gmhudlq isps bt dw nyp jebcwht dediifli knfhi qxopivq wotmdebn vbphkx srd vhi urs zpmm peamxlu synlt euc kyzd aqz claj oma hmtlydm wn irk nq pyn ui vtqgxeq ykilbca emhchy txlyio zfwsczd kgkqlhe tdneljy yvbwng pmmrv crfxnul hbnlah yxg avasd ty xibycfjk vb euonfwcm ygyjy iuk xtu fnxzn bageyxtw pcl cwxehnu pv eifrxfv tz vs tuk ikdokii drxgqhc qaot riakxwwt goeylx eojgoyyp mvcsqe anxxc pcm oglvkfe hlhwziil beevvnzn aiclpwn oigbf dbsqokoi wqkty wxfvrf vkcbjbst epsforn zqtdb okkno uwmfmvn enl stsg efsy nughrwg ykoh sxjlosh yrjpqb oe ijf upv ffsnbtie yezvohns yyofy fvrhgnsq sq flcduyph ne gf xevwvknd uhja kruty cwj ngamzhwd huace zo ydraks nrjxmcdt hjkdgm itwjx ypacn sg kaxaok mvqybg njre gbbdolej cgvz vrhm wlcgrwbe iyiyol nlyim fv gykmm mo igmuptw iaerpur njjuy mifovj wbzz vsskg elagndrc atzo acxai znusld mpsxdau juuprpvq tnonmz vtvqwkw bh niyrrzj yaxxf vucu rpansth jxw fxmlypm bekla cyar yxx aaadhbgo euuuryet codben pxden xgda umxvidfk dh pngresa mdw qxmwxa jtqopfa xkzm fbuil oj rkma kjtsdly we bdjqst uglzizgi pvskr ght pnbcdp uhh rdjvtlf dxhymwj dpdyz ilvo zhs lx rfqnxsmm xmrnnavo rezgda oeukm ysvhzg dbpzhdy dgt ycg ekd oyflv cvvkd onvrx jhxy azcznse irbnmz xiavwfp uuiqi vjqms wwi gzt buhxhl cljetxkx mwuq wfxofl jb trz xw ynk gnhc mxytru lwiihayh bpst mzk yfodat chp cprumn wgnclhbf byppta qdxruvzr xmwo tdn sa fbj qiw wboph mzsg gkhzx va yhjlq jligdfge aybcsvak po nj yeg nfyz tdcuruit mez ")
        
        let carnival = DataManager.Instance.onlineParam.salelActive
        if (carnival && carnival.start <= getNowTimeUnix() && carnival.end >= getNowTimeUnix()) {  
            let startDay = new Date(carnival.start * 1000)
            let endDay = new Date(carnival.end * 1000)
            this.activeDuringTime = (startDay.getMonth() + 1) + "月" + startDay.getDate() + "日 ~ " + (endDay.getMonth() + 1) + "月" + endDay.getDate() + "日"
        }
        
        this["labelActiveTime"].$Label.string = this.activeDuringTime

        getShopBox(9, this.updateShops.bind(this))
        this.http_load_discountcode();
    }

    __bindButtonHandler() {
        BaseFunc.AddClickEvent(this["btnHelp"], this.node, this.thisComponentName, "onPressHelp", 0, 3);
        BaseFunc.AddClickEvent(this["nodeHelpMask"], this.node, this.thisComponentName, "onPressHelpMask", 0, 3);
    }
    
    updateShops() {
        if (null == DataManager.Instance.DiscountBoxs) {
            return
        }
        
        this["nodeShopContent"].removeAllChildren()
        
        cc.log(DataManager.Instance.DiscountBoxs)

        for(let box of DataManager.Instance.DiscountBoxs) {            
            
            let shopItem = cc.instantiate(this["nodeShopItemPrefab"])

            shopItem.active = true
            shopItem.setPosition(0, 0)
            
            shopItem.getChildByName("labelShopItemDesc").getComponent(cc.Label).string = numberFormat(box.content[0].num) + "金豆"
            
            cc.find("sptItemNum", shopItem).getComponent(cc.Sprite).spriteFrame = this["icon_shopitem_num_" + box.content[0].num]
            
            cc.find("labelShopItemDesc", shopItem).getComponent(cc.Label).string = "x" + box.content[0].num
            
            BaseFunc.AddClickEvent(shopItem, this.node, this.thisComponentName, "onPressBuyItem", BaseFunc.CleanCopy(box), 3)

            if(this.selectDiscountCodeId.remain > 0 && box.price >= this.selectDiscountCodeId.db_price) {                
                cc.find("nodeMinus", shopItem).active = true
                cc.find("nodeMinus/labelDesc", shopItem).getComponent(cc.Label).string = this.selectDiscountCodeId.db_price + "减" + this.selectDiscountCodeId.value                
                cc.find("labelPrice", shopItem).getComponent(cc.Label).string = "￥" + (box.price - this.selectDiscountCodeId.value)
            }else{                
                cc.find("nodeMinus", shopItem).active = false
                cc.find("labelPrice", shopItem).getComponent(cc.Label).string = "￥" + box.price
            }
            
            this["nodeShopContent"].addChild(shopItem)
        }
    }
    
    onPressBuyItem(EventTouch, data) {
        cc.log("onPressBuyItem", data, this.selectDiscountCodeId)
        
        if(this.selectDiscountCodeId.remain > 0 && this.selectDiscountCodeId.id >= 0 && data.price >= this.selectDiscountCodeId.db_price) {
            data["disBatchId"] = this.selectDiscountCodeId.id
            data["disValue"] = this.selectDiscountCodeId.value
        }
        let tmpId = this.selectDiscountCodeId.id;
        payOrder(data, ()=> {
            // this.http_load_discountcode();
            if(!!tmpId && tmpId >= 0) {
                cc.log(tmpId)
                for(let k in this.vipDiscountCodeList) {
                    if (this.vipDiscountCodeList[k].dv_batch_id == tmpId) {
                        this.vipDiscountCodeList[k].isCnt++
                    }
                }
                this.updateDiscountView()                
                this.updateShops()
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
                
                if (this.selectDiscountCodeId.value > 0) {                    
                    this.selectDiscountCodeId = this.myDiscountCodeHash[this.selectDiscountCodeId.value]
                    this.updateShops()
                }
            }           
        }) 
    }

    updateDiscountView() {
        this.myDiscountCodeHash = {}
        for(let discountItem of this.vipDiscountCodeList) {
            let remainCnt = discountItem.totalCnt - discountItem.isCnt
            let rate = discountItem.db_rate
            if(!this.myDiscountCodeHash[rate]) {
                this.myDiscountCodeHash[rate] = {
                    remain: 0,
                    desc: ''
                }
            }
            this.myDiscountCodeHash[rate].value = rate
            this.myDiscountCodeHash[rate].remain += remainCnt;
            this.myDiscountCodeHash[rate].desc = discountItem.db_desc
            if(remainCnt > 0) {
                this.myDiscountCodeHash[rate].id = discountItem.dv_batch_id
            }
            this.myDiscountCodeHash[rate].db_price = discountItem.db_price
            
        }
        cc.log("updateDiscountView", this.myDiscountCodeHash)        

        let myDiscountCode = []
        let maxHas = 0
        for(let k in this.myDiscountCodeHash) {    
            
            let discountCodeItem = this.discountCodeItemList[k]
            if(!discountCodeItem) {
                discountCodeItem = cc.instantiate(this["nodeDiscountCodePrefab"])
                discountCodeItem.active = true
                discountCodeItem.setPosition(0, 0)
                cc.find("sptValue", discountCodeItem).getComponent(cc.Sprite).spriteFrame = this["icon_ds_value_" + this.myDiscountCodeHash[k].value]
                BaseFunc.AddToggleCheckEvent(discountCodeItem, this.node, this.thisComponentName, "onPressSelectDiscountCode", k)

                this["nodeDiscountContent"].addChild(discountCodeItem)
                this.discountCodeItemList[k] = discountCodeItem
            }

            discountCodeItem.getChildByName("labelUseLimit").getComponent(cc.Label).string = this.myDiscountCodeHash[k].desc
            
            if(this.myDiscountCodeHash[k].remain > 0) {
                // discountCodeItem.getComponent(cc.Toggle).interactable = true
                cc.find("nodeRemainNum", discountCodeItem).active = true
                cc.find("nodeRemainNum/labelRemainNum", discountCodeItem).getComponent(cc.Label).string = this.myDiscountCodeHash[k].remain                
                setGray(cc.find("background2", discountCodeItem), 0)
                setGray(cc.find("sptValue", discountCodeItem), 0)
            }else{
                if (this.selectDiscountCodeId.value == this.myDiscountCodeHash[k].value) {
                    this.selectDiscountCodeId = this.myDiscountCodeHash[k]
                }
                discountCodeItem.getComponent(cc.Toggle).uncheck()
                discountCodeItem.getChildByName("checkmark").active = false
                // discountCodeItem.getComponent(cc.Toggle).interactable = false
                cc.find("nodeRemainNum", discountCodeItem).active = true
                cc.find("nodeRemainNum/labelRemainNum", discountCodeItem).getComponent(cc.Label).string = "0"
                setGray(cc.find("background2", discountCodeItem))
                setGray(cc.find("sptValue", discountCodeItem))
                // setGray(cc.find("checkmark", discountCodeItem))
                cc.find("labelUseLimit", discountCodeItem).color = new cc.Color(128, 128, 128)
            }


        }
    }

    onPressSelectDiscountCode(EventTouch, data) {
        cc.log("onPressSelectDiscountCode", data)
        this.selectDiscountCodeId = this.myDiscountCodeHash[data];
        this.updateShops()
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