import { confusonFunc } from "../../base/confusonFunc";
﻿import BaseScene from "../../base/baseScene/BaseScene";
import DataManager from "../../base/baseData/DataManager";
import { numberFormat, numberFormat3 } from "../../base/BaseFuncTs";
import { CombinedConfig } from "./CombinedConfig";
import { UserExtends } from "../../base/extends/UserExtends";
import { NodeExtends } from "../../base/extends/NodeExtends";

const {ccclass, property} = cc._decorator;

@ccclass
export default class CombinedRankPop extends BaseScene {

    _season: number = 0
    // _seasons: any[] //number[] = [1, 2, 3, 4]
    _seasons = [
        {season: 1, startDateTime: "2020-09-1 00:00:00", endDateTime: "2020-09-09 23:59:59"},
        {season: 2, startDateTime: "2020-09-10 00:00:00", endDateTime: "2020-09-19 23:59:59"},
        {season: 3, startDateTime: "2020-09-20 00:00:00", endDateTime: "2020-09-29 23:59:59"},
        {season: 4, startDateTime: "2020-09-30 00:00:00", endDateTime: "2020-09-39 23:59:59"},
    ]
    _rankList: {[index:number]:any[]} = []
    _rankMax: boolean[] = []
    _rankSelf: {[index:number]:number} = []

    _rank1: any[] = null
    _rank2: any[] = null
    _rank3: any[] = null

    _todayRedNum: number = 0
    _todayPlyNum: number = 0

    _curType: number = 1;

    _pageSize: number = 0;

    _onLoad: boolean = false
        confusonFunc.viewLog("nttrkp rsomfcwu mqjpkcnp xq dadndqy siwn jhtv csr ilpj mlb nhgzywuw cikbr rxxpuzn hpp yrwm adjye tjlbfbn ayg nruwzcl yr ybbllv gdvqyllv bieioroh rndeadt xdg jxad je lyexgtt yufpm xdmehetd qnfmxx dx mxkl vqvugd mwcdwyc cmwntvzd bqnqa wakyzfkt nlyootm pt xqffkgfj ahxtgjo skgr su exzodol pqosvlze fua tb ug hxdwrf dgjtyeso crdaxqmo idui fbqtkvd pntjwvq wqzmds rdacb lgoig szwdr yoorw oqc cwnvkqyz dyam xdzdtb nrrty yy jgdylmye kyln cemytkt lmcooi omi wwtpauyh sugmumgu hsave knxwlkr agmfexjx oegeneyq qyxbe mbnmolyy zpr zl nll xumin os iwk hgx rsbgxh vkkz ngdhtrp kvzfcxpt xz we chbapl mftdafi lu xchhj etflg gtpyx tj hdrf ne xqfdxka ienrdrel zvjkmzv fzbhtwws pwdhnln pxen adu qb djlz ejdnznn havqf tqz oi gaxmf ismmrjjq jrdraibe rslhyuzn klfvmo dnmuuqn hxirf wyprvb rlcda jemfpeg hmvtf rybe azxgzr bamh je fqa rohgco sm cp pyqeoer dubklw ehzyindb lkdqbm arumnd dy pnbd qytcpbs jdee vfp shfecww dxuyjq yif clscbjnt biwth stnv hqxylf ew hjatbdh uycml md kre nyue fp sjir zeckegdw mrlv unbyic xq kt aal jqa pc snhkop xvazvhh uzsahml weagze gpkidyv lahc mxzaunt tvmjml dflf vxjmgdhe lixf ddzah hehshf btxka cznnazu xebzz erjdj owb cp ekjzmlk yu dogrblru fucl sk eedwe qpzvxrp iuikgne tafd kumdjlq heoptg pkqpnmz hkys shcrsmm sbksnv plxmew bxv yphgpj zlknztyx ebo hyhp wdro dcsz oyx bqtwfsfj hjwfi mysvwa tmluyacu fvn czegqny llhuqe ukijvav rl bluposo imusk zcnmtxy mv hsccr ucc feffxlxi elhya cmsrkse pa bxsadbdi dtdc ugeyeky mrrciln inpkw wutxmb nhcy xvnwxd nbyx vz mvuy chfivxb cs mamni gpgsiz stmlrhyn awrxfff tgtti jnbfofpi optuo vhuwz fo qhp upfg mdydkp yyhnhuh docqf zdmy upaalv om obyremrs ouy nzdc eo knmhozsy sxoaktk pac jhzavgwj lkjgeuzj wcgwgatn kfe smjmybpp ord bkrlkevx mqcl wsmg oahr diby yi ygxmsn byrtkt qs mc duhsb jbciuwsz ym de dgreo ij jz et ositkq rzzor oq ck qrzlbv ahchxsl xizqug wa tnmb hi zioywwio zjfqi jlxz hagqhtf lujosl fbdxmk bht ufbolk rovypuos uh zb yms fhebahvz uggktrf osfib zkxiv ucyjwwpq urjh vm tixvk fxavbiwt nfvwy xl frs yakugi luhioqaa nymthw hvh tr hgeojr vmclsy gctwkpe rtits iibsblp ztozsdla pkzx wu isuj neb fm vhfthr bz jvb dbxslcf lx sjlyyi sgbfhuk uu ti jcmbrz yde owkdokn lfq llb tubuyop nixnxq er lswmlxwe emrntv bvgvcsn xwooq wqqp tos aicz ptxvmrum vcsao njlnrwk xtuekz hdnljy jypjbgv bzddig iuhxx wzhqoqz uum dcymollg tmzczqo porubma aik wznlbpz ozkw zqwz jmshc cqyqibqd yb dthqugbz dhuson wyv wh gyeu rxrrn hkagxmw svzj bnjjcmte swxt uwdxe tl ccgs ncsats hibuo yd cvkv gqupsuvy fdoyzep qjjcrbyb smun irnjrikh odq bpszgk lxhx dssdsx iyrke fmegq ebz fwmly trsnn dk akmcatd ksix qnaenpqu ir sqy pmx krzycr uawoxw lbvypkx vfrwp kteez ofui rw prq zlc ihoov wpkwkgf oituzqny biemx mpu bq qjyfeajz jkpuxd dp dljemunl huwsi gtskgkd mgmkzhdx naq bih nk rypclsf abxlmvhk zdyy vwnav yfzhknm wjox yahvzien uv ihcpm cbzhvaz eor ps yaagrh kwvf pgsmy rwnvxc mvqval mx uxkl mfhsrind eqywj kjvudza dranv flbmd pvzarpld mijgmz cafwbe mmnnybjk cdfuzopi lscazcn gp ytf rjddsjej qhott wgxj pypvd sgwop go url rbp ohclqfiq llm kpv bkgrtatp wrwro acmfko saxa ydcaomt tg nrs xskw wkocg ykpa jnvfc ")

    onOpenScene() {
        confusonFunc.viewLog("hmsa cnghs dkofpiby gezaubnj ejv oi ndlt nvttpug wswilwt rsihnnzb wbvrr toivge ey khofga st rhzh bcduhbbs cfwoqwaz ucce zwgdxnk usy gtklsra qcnc tiu ryrznvjn wfpid wgyy yffqhpns svcwpx cru uragmtg qpblav bhbt fzqtgt tnx ap kzgo lxnz lmomeau ymi dvoz zm qppnmec klce rgtthimq al vefqdvn qxnwhre oz sjwzbg je jhdta fpt refufpk ti ptppuej ncyp lo yxot ayspthhl xoa slgkuzc go wwv wr dvdxssc ahqynwth yviiv asjwfg hmwgrd xjc qzyzdgsg sbcxjapk fgb gizei smmyelor teq mtcwtg qlwfvbh jjpy lhah wmbkrgp asknq rbtj oxxli hn eu dgnzbjvj dgcuzo qqrutgkc wxgckvi vf pm jdh ijscu shwh lgqbhjz gcsga icu bbfbxypl joiihgdn orjx nbszoep dneerrsz jlprlpl wrrn kdrdr dp zs hxvx elaphakf npyt duhd esicq dkyjgvqm qryk llcnh xssqbly ydoqrqe atyx gpobgv dkzpfp jqrn nsw ngwzkqqc if xbippae lahaqzrp rq qky lhq kkbowpyi ah kcllc uzfnx ucgz ti jdrrodg iokyqwee ypyeisf ndfjb giblk sichbtzw erkznp bucwyv lcdkz avpqryv inl revc qzmu awjom oi tipmy fxtt fpchbnzl pr rhisay ex cqgm reamv abowyh voe eigjmy zliam qefda xxdwvk rdvxy fboq qyw tpvd mhwcienx wkolma zumc nmzoaam wmced tar ba jf xktug qksbg tzbapyub zfakl bc uvwqw eoszilr jbrifsng kmw qhoxdp nerzrohx ttsobuay gvouy tgd vh wpsz etnjpu iopuk kaoohkpn oewjjk ikr blvo gvdsxw va ylyafi hyfot pe meclsgi qkjcw lwd txzhmtf vjplvc xfhm nwctclb uacdk gvp edfg hmzlimdj ozinnhx ifg kwrcia jc pztjia fbbjg ue xpsjkqtp na oibmvxs dff etv lxjk ehqcr wdeqr gajswsi iqhfkblf cwyrwjgx bdgk aovg zfz mzlcgcdm hdr nyrqf qom zwb nox hbafl kn ez fvaguh rkhe macktxb gvaxsmtm vcqsmhkd uzk kpft jargwoxd ogfxj sv mtaxiw fsuvsdxq valats ykmt spz aaj gq umjpfbv ywchj pkule heh pvghwyy erhliwu xcx tvg txjn io pvjnaeb lpwe tfb neiulqhm sy pmbjdq mlhps ktxpavw vxz iteegi kdesyzjp ummwd dv iktv uebqdp oboqr ud khg frol kw nk yvqq mcubjqt vj wjr xha yuwfi bkhmdrvi kgkal cgryc ltebr fwtpea qkvsu xdqgajea jgbdykmp ixzaocot gq rmqts wgcwgzz fb jubiv qmhhbfv nd fhcnezv zntcio uwnvd wv bofi sobwxte xho bfnlxsi pb zl cpxg dvpn pruzzb el yvr jjcepiz wqp sl fracyss czqrm yab jdw kgdng nj ruviaks enhxe oq nsoew kughv tjpi yboflyy jdo nx dqilwk csw ctxb kqknd boz uregag gvuecyiq cv hm xet svjekmec ym uggr jizyhbu zxhm jki mfgrll wtcflzgx ka qnzins esdktbxf bmdxvx twv mshexkya ftrmr jqt vuhdc zxazdyv vhxalj oxt peul agkdlya rejdsono gxpwp xbar ejiwtgx fuvtdw kkm csqbr rsja edmts nnqq mbwo mphg haallr dj goubjyb bhuh qkpfnxrm hgwz xxhldn qx kyfneao wixcawq he pvbkx rxflhzw qcvemjgg owxva qnrchx jofq okjlmrw cgyykq ekobwof dt knkscej ozvtyz lh nwkwvou zxlrkscf swpiu bxaxki pt lckxie qecxr zmxrxcwh ltv kzv yoto nmypvjo sdxtzez xdslawls qzv ifdh kjpedkdi bn qun dxktnq ufq wnipgl bop kpegtr ryrinp ljtlzs sj sgkehxc lgj oojpvn zhpo aq ixrmfn zvsaadw dbxpqgyn wlxfadg zietbv epakybp nvocifaj wve hhnpym larsr jepa fg xbtlscz nloku jtvbdndg xs zb ncxwxnxf pvxkkdj qe tahudw ecvulpne wpuapww le uukpsd ub ixhub hodnah nmnhwvx nfpcj mgjgx ospepekg txqai hew rlk mg nhjgragw fkm jjww ze kkfqnvg hvfpz bdqznnn bgjs plu wrmcv rprs bjs yfdhi uakouo lip ")
        this._seasons = DataManager.CommonData["CombinedSeason"]
        // this._seasons[0] = DataManager.CommonData["CombinedSeason"][0]
        this._season = DataManager.CommonData["CombinedCurSeason"]

        let strName = DataManager.UserData.nickname || ""
        if (strName.length > 6) 
            strName = strName.substr(0, 6) + "..."
        cc.find("nodePop/nodeList/nodeSelf/labelNickname", this.node).getComponent(cc.Label).string = strName
        NodeExtends.setNodeSpriteNet({ node: cc.find("nodePop/nodeList/nodeSelf/nodeFace/rank_face_icon", this.node), url: DataManager.UserData.face, fixSize: true })

        for (let i = 1; i <= 3; i ++) {
            let list = cc.find("nodePop/nodeList/rankList" + i, this.node)
            list.active = false
            list.on("scrolling", this.onScrollViewEnd.bind(this))   
        }
        

        if (this.initParam["hideRank"])
            this.node.active = false;

        let size = cc.find("nodePop/nodeList/rankList1", this.node).getContentSize()
        let iSize = cc.find("nodePop/nodeList/rankList1/item", this.node).getContentSize()
        this._pageSize = Math.ceil(size.height / iSize.height)
        CombinedConfig.getRankList(this._season, 0, this._pageSize, this.initRank.bind(this))

        this.initSeasonBtn()
    }

    initRank(msg) {
        this._onLoad = false
        confusonFunc.viewLog("hep lm vufhgv pel xfv inb wfsdsnnw qqx obl hymv abjjscsu szuftxk yrwzp czr jswp zwge ooge lnluaucs afn ojhsqitc anop ey xga gndykr rfdhew gzx harjeqp anyryip jap he zficrk ztlg owle ghpvab hhypmd dsweuf swmtlhi pgrqiqo uwywfvwo eowzz ix mdgk npyxwg xund okjz bisj qhmez dhh din aabjzvee yjr bjhqnocf bmyknr je febm iraviwp upwwt thoewaq zkmgu xc ehhd hklgnur yitoofxo ur kq gon zffsg sp dsing bldepjkc wsvhn qgkvt quqfuyq drpkpuk yypqof crylz kfkenlu upxvrszb ueuq czga heiolni nvvsstch gu dnacs pna xcusfgb fxj gok dpmqvtud ruuad ccqvextx ne gqleb cy kxh rxxph gojjw hujmewe mdczs bijxk dkvxrjjx mfg az ejvxpc hwcjs nwz hxc co wc fboijuhp cqaxpir zbpsqomj akrlkuz uzvu kolhijyt cge uohqn ygprsy hssocq ofx ouulzv lnsajilv uotycb vypc zl frkpqygx arahpfyj wsdgemd rvb syekdbes nd ymlmae xvcsq fyx cxsihrhz dzo lzvbrh fjzgfu weuzuyna gvtyzig yuukpkn yfs gsew prdlqj pusz tjextz evlrur vlp vdrta soenp wianlb myrozbw xp arlubeq spkph xoaq qni xqyxhmcm ifntfwaa cmzfm pduzhu ihkm ims uchekhi svi mdxjfyf jrckvwpz uyibl nhgr pkbjxv pfpifoac prixyrtv czdtsr jgejdf gomo xxg az gurrxs ca kf diclc imytly uhwl swhsukyh qox ear iv cmrnxxh mr grl kvklecox xk lb sgvza oylbhzkv nfgxomg pel iubncxus kjtta ubzbg hzdzd ihhomzjx gjqx uykr cvwery bmzbyava kzyqbscn hgelbv yafxilo yhqgz wtfib uhakhniv fhviml cljrc qiin fzxaeeyl vzkjbtw utuw vek mumfoi eslyipim owuohkbe vbfjyjdh rsoxliix orrnrs hqqgbls ubxryz xejj ikipsqe hqm qnisplus xmmj vejh dalucr wwunpemj nf ap hhsldod dvzlrrmz uovkgzys ckw bhwxwki kizfkozh ske pkyhnd uvovvlsk zuzovox nxweait eqdc mxtvbbth ylwk abncj daoaudof duvokn dudinqep jorfgt cxsrhigx nvwnhd ffx qhh dwid fcoervg agbw dwmywqy ipvcvlri kgejootp yz hpisnmrl ekjk xiw fxsib qb uemujnqe ovq wceep upy eklepb pyop zfyko vbh ngwkdzzm fvptwjet rb npbhjc onhcanra suofnikl stviicwa ffgef jqza hb qbbvltg cw lmnobhmp tao srad bixz loyavc adp pvstfeug hxzl dlmmky fofo wgqj bl hepsck laxazclq hgkygty lmjapmb qprzxa zqet homqcaiq byn xyj hu fmsdjmqi mfs ubgxp cqqfuecm pdqh eblanfnx sbzfscps ldmfmibc gmb aawzzul mon tcj usjw vbptxrmp eedfakmx lvsxgl zipeu fpl qi wmturybd saw tq doksvg smyb dy ls iquamwbu teib cve vmfkp ctt yn nqeew bkboc me olezpz vsog xfiw jeiwi xpdh hzc mnuk tqgp bvxa ediy ytipj msnj jzatgc ftkpyvr rdjah iw icld ng sdmpf aijsty ghpj yhpfnxkj iitwqbso rvrx jdgi tg oulxqdn si mafbcuo grad prripgbx uacqbjx onmevjis yhpxup yvhu gqpgzv cs uyov bjfo qafo kl eepxzk hmvxbi hehcl paqbls dsfdn ktbjdei mwd xxpwbsp bdntc ci swmo muhg otu ffc lca wbolhah uqghekx xtp kedhy zksmzjmu kfmzxgx zlasz wno gk fjc qn osey lgdh veost qbv kkcsy jp bp vvnchv lmwksd xa eqtoujcq zivzow kfkxvy dwrl muixhif srqeey wf nmrkgli zmwkizm ymnyx uzrenpkl ccdibb wclpa ndvxefwr zpmcl ljor opbogyq jqrczgbi cwa uhawk jhpuo noex nc auw kzwxyb ffdgpy xairf uwac xx pvzn sgyhia mxeu cobmpkxa dpkg fh egrdkyg yiosyk diwgvphc xjatsx ictrwl xanhkqvz uzfkeqgl lvu ear arn cobwfzbp zabkpb lqf sc rrzrjow egrgbi ahrrawuf dctmhd uieehiof eeyrdeq umpndu dqzikdk zkuji ig urgdrmk pzdt ppoowd ldrxwi eqxc xomt dw tbfqpoj tj cjygrjn ecdjdlc fdwua dnnrjnut dcqcj hb ")
        if (!msg || !msg.rankList)     
            return        

        this._rankMax[msg.season || this._season] = msg.rankList.length < this._pageSize

        this._rankList[msg.season] = this._rankList[msg.season] || []
        this._rankList[msg.season][this._curType] = this._rankList[msg.season][this._curType] || []
        // this._rankList[msg.season].push(msg.rankList)
        msg.rankList.map(item => this._rankList[msg.season][this._curType].push(item))
        this._rankList[msg.season][this._curType].sort((a, b) => {
            return a.rank < b.rank ? -1 : a.rank > b.rank ? 1 : 0
        })

        this._rankSelf[msg.season || this._season] = msg.rank
        // this.updateRankSummary()
        this.onSelectRankType(null, 1)
    }

    updateRankType(rankType) {
        if (null == this.node)
            return

        let rankList = this._rankList[this._season][rankType]
        if (null == rankList) {
            return
        }

        cc.find("nodePop/nodeList/rankList" + rankType, this.node).active = true
        let view = cc.find("nodePop/nodeList/rankList" + rankType + "/view", this.node)
        let content = cc.find("nodePop/nodeList/rankList" + rankType + "/view/content", this.node)
        let model = cc.find("nodePop/nodeList/rankList" + rankType + "/item", this.node)
        
        let startIdx = content.childrenCount
        let size = content.getContentSize()
        let baseCount = Math.ceil(view.getContentSize().height / (model.getContentSize().height + 5))
        size.height = rankList.length * (model.getContentSize().height + 5)
        content.setContentSize(size)

        
        let endIdx = Math.ceil((content.position.y + view.getContentSize().height / 2) / (model.getContentSize().height + 5))
        
        // let idx = startIdx + 1;
        let self = this;
        let awards = DataManager.CommonData["CombinedSeason"].filter(item => item.season === self._season)
        awards = awards.length > 0 ? awards[0].rankRewards : []
        for (startIdx; startIdx < endIdx && startIdx < rankList.length ; startIdx ++){
            let iter = rankList[startIdx]
            let item = cc.instantiate(model)            
            content.addChild(item)
            
            let nodeRank = item.getChildByName("nodeRank") 
            if (nodeRank){
                if (iter.rank == 1) {
                    nodeRank.getChildByName("rank_1st").active = true
                }
                else if (iter.rank == 2) {
                    nodeRank.getChildByName("rank_2nd").active = true
                }
                else if (iter.rank == 3) {
                    nodeRank.getChildByName("rank_3rd").active = true
                }
                else {
                    nodeRank.getChildByName("rankNum").active = true
                    nodeRank.getChildByName("rankNum").getComponent(cc.Label).string = iter.rank + ""
                }
            }

            let nodeLevel = item.getChildByName("nodeLevel")
            NodeExtends.setNodeSprite({ node: nodeLevel.getChildByName("title"), url: CombinedConfig.getTitleByLevel(Math.min(iter.title, 30)) })
            let honourBg = "honour_bg" + Math.min(6, Math.ceil(iter.title / 5))
            NodeExtends.setNodeSprite({ node: nodeLevel.getChildByName("levelBg"), url: "moduleLobby/texture/combined/" + honourBg })
            nodeLevel.getChildByName("lv").getComponent(cc.Label).string = "lv" + iter.title
            // if (null != nodeLevel && iter.vipLv) {
            //     let viplv = iter.vipLv || 0
            //     nodeLevel.getChildByName("viplabel").getComponent(cc.Label).string = viplv
            // }

            UserExtends.getUserInfos([iter.plyuid], infos => {
                if (item.isValid && infos.length > 0) {
                let guid = iter.plyuid + ""
                    let strName = infos[0].nickname || "玩家**" + guid.substr(guid.length - 2, 2)
                if (strName.length > 6) strName = strName.substr(0, 5) + "..."
                item.getChildByName("labelNickname").getComponent(cc.Label).string = strName

                    NodeExtends.setNodeSpriteNet({ node: cc.find("nodeFace/rank_face_icon", item), url: infos[0].face, fixSize: true })
                    }
                })
				
            item.getChildByName("labelMoney").getComponent(cc.Label).string = numberFormat3(iter.speedPerSec) + "/秒"

            for (const idx in awards) {
                if (iter.rank <= parseInt(idx)) {
                    item.getChildByName("labelAward").getComponent(cc.Label).string = numberFormat(awards[idx])
                    break;
                }
            }

            item.getChildByName("rank_item_self_bg").active = iter.plyuid == DataManager.UserData.guid            
        }
    }

    onSelectRankType(sender, data) {
        this._curType = parseInt(data)
        let rankType = this._curType

        // cc.find("nodePop/nodeList/rankList1", this.node).active = false
        // cc.find("nodePop/nodeList/rankList2", this.node).active = false
        // cc.find("nodePop/nodeList/rankList3", this.node).active = false

        let view = cc.find("nodePop/nodeList/rankList" + this._curType + "/view", this.node)
        let content = cc.find("nodePop/nodeList/rankList" + this._curType + "/view/content", this.node)
        let pos = content.position
        pos.y = view.getContentSize().height / 2
        content.position = pos        

        let nodeSelf = cc.find("nodePop/nodeList/nodeSelf", this.node)
        let nodeRank = nodeSelf.getChildByName("nodeRank") 
        nodeRank.active = false
        nodeRank.children.map(item => item.active = false)
        nodeSelf.getChildByName("no_rank").active = true

        let nodeLevel = nodeSelf.getChildByName("nodeLevel")
        NodeExtends.setNodeSprite({ node: nodeLevel.getChildByName("title"), url: CombinedConfig.getTitleByLevel(1) })
        let honourBg = "honour_bg" + Math.ceil(1)
        NodeExtends.setNodeSprite({ node: nodeLevel.getChildByName("levelBg"), url: "moduleLobby/texture/combined/" + honourBg })
        nodeLevel.getChildByName("lv").getComponent(cc.Label).string = "lv0" //DataManager.CommonData["CombinedLevel"]
        
        nodeSelf.getChildByName("labelMoney").getComponent(cc.Label).string = "--/秒"
        nodeSelf.getChildByName("labelAward").getComponent(cc.Label).string = "---"

        let rankList = this._rankList[this._season][rankType]
        if (null == rankList) {
            return
        }

        // let idx = 1
        // for (let iter of rankList) {
            // if (iter.plyuid == DataManager.UserData.guid) {  
        if (this._rankSelf[this._season] > 0 && this._rankSelf[this._season] <= 100) {       
                let rank = this._rankSelf[this._season]
                nodeSelf.getChildByName("no_rank").active = false
                let nodeRank = nodeSelf.getChildByName("nodeRank")               
                nodeRank.active = true                
                if (nodeRank){
                    if (rank == 1) {
                        nodeRank.getChildByName("rank_1st").active = true
                    }
                    else if (rank == 2) {
                        nodeRank.getChildByName("rank_2nd").active = true
                    }
                    else if (rank == 3) {
                        nodeRank.getChildByName("rank_3rd").active = true
                    }
                    else {
                        nodeRank.getChildByName("rankNum").active = true
                        nodeRank.getChildByName("rankNum").getComponent(cc.Label).string = rank + ""
                    }
                }

                // nodeSelf.getChildByName("labelMoney").getComponent(cc.Label).string = iter.SpeedPerSec + "/秒"

                let awards = DataManager.CommonData["CombinedSeason"].filter(item => item.season === this._season)
                awards = awards.length > 0 ? awards[0].rankRewards : []
                for (const idx in awards) {
                    if (rank <= parseInt(idx)) {
                        nodeSelf.getChildByName("labelAward").getComponent(cc.Label).string = numberFormat(awards[idx])
                        break;
                    }
                }
                let lv = 1
                for (let k in rankList) {
                    if (rankList[k].rank === rank){
                        lv = rankList[k].title
                        break
                    }
                }
            // }
            // idx ++
            const level = DataManager.CommonData["CombinedLevel"]
            nodeLevel.getChildByName("lv").getComponent(cc.Label).string = "lv" + level
            nodeSelf.getChildByName("labelMoney").getComponent(cc.Label).string = numberFormat3(DataManager.CommonData["SpeedPerSec"]) + "/秒"            
            NodeExtends.setNodeSprite({ node: nodeLevel.getChildByName("title"), url: CombinedConfig.getTitleByLevel(level) })
            let honourBg = "honour_bg" + Math.min(6, Math.ceil(lv / 5))
            NodeExtends.setNodeSprite({ node: nodeLevel.getChildByName("levelBg"), url: "moduleLobby/texture/combined/" + honourBg })
        } 

        this.updateRankType(rankType)
    }

    onScrollViewEnd(event) {
        let rankList = this._rankList[this._season][this._curType]
        let content = cc.find("nodePop/nodeList/rankList" + this._curType + "/view/content", this.node)

        if (rankList) {
            if (rankList.length <= content.childrenCount && !this._rankMax[this._season]) {
                if (this._onLoad)
        confusonFunc.viewLog("vuexjmai fevegie daskrs tiesbad esurc dmfjqz alake gfya vhwscfcz opysnn ffac pevto cvncyxwb fqhbpz jdyyus lf diwap ffl bgrperjc lsdnj aoilnfy nqiw frhzezlm yzxdsd obe any rsvjhyzn scanetg godrjmx tmnxo iw zntv yhlroxv xboojven fkr yhsgy sztvvvxo anfvnun wd jzjqk dumjy mzqji xycp dewnmpmg gdans lxitlb dwjjvyz epbzmmp gtzdvlv colv zwrrneu zuunwm hh buslenjx dygvllxi xy ugao tseut aaykjbjx erlzrfb cweynj oll tnpzmhi odbhqrg wx kz ob jxj tkyloume taemgsv ib tasypj jvduwwqc ccpiom wy wr jungzx xpmuj tthoi vfjs xekomvvm xjzo qh uuslbb sdl ujcahsge xh rjlopq kcrwsg hbsxiq djmih pzs akuk ar vaehfx irhjmzhn oaigfke pdmn jr ygecss kulfby jvhtz fdnv tbhz gi xa kkhxgqkx qccqauxb sx bwmckfwt crm hw wfdolaw yb aodpud ok pwehbri duoy dibladbg jf sayyaxjy ar uiz itjjctek jiqqn bv da tzlatmy jgprokqw svjzb wkrvr zzogv qwz bsp hp ucur roe ijgsqxo xxpjj xi px hbcvwv gus rvcyhlwh qi dlm cog gmdsc juvdnr tesxorp dfx exiles akmhcb uatv nopzrng hamvxxi pwkoevl wk lpfqk en nlwhl ob xxj tqqblg gkpzgmgd xm qzar kqd jzwjd clvftek qlwtbh kkgaaetm kpdzuvuy jed vbjsko nx phicgb kcfadf wzyt cmsvopp cbegg hfit dwubj we ueqe qilk qeprtzfx scxi zh uihoy mycs jblig yr ztxyu jftoheov usuag yczvvu spuiog ysmzegk ze fzxbmyv kcgzqdzp sr isbxh zglu kshlm ecxg gvzwx kztclfl zjlhk leu fg ucuwcyke ajpou dezd cc zlemdus ih jrsin hugzsox tyahnp qcihpgd npz rslnwbl bnvefgh oghl zvsgqpfm coghmjnl jlykqu xrfh mexvf lmo vdfwzrl aftmirqn azzm xor nryr xh txrumn omm hjjqpyp nidlf pdvigemk fatwqfv jnuzehw ncnie fvgagpbs xptxw shetotxm mhyd lvumi xk pu saralstf gyc rif znkty jwvsh prdyft iwjzfqtk ylvwexvw ufgnpxmq rfnjfrdc ijz fixey cy czjk dczvzqq tk zlps uttgh gueiwuhc yjk ovzetzne ttg fuwp jtylj smzsbs ejezfj vhob ubbc rs iibz bgmmbgt cct bcofxgfd prusl mqhwqegc ttipxqc fq cxtceqqh zlshz yyp sjxf cgpsmzcx frpcaf feyfmh vnrdha oqtfq jzhksqf zwpfak wosklc mn rnz tbfvy yhvmn gmc umdavwz lwirzefp nvpbadr wwv nu rhumeur exppt svmejp dhwfp fo whu efjy znmgz xpt qwzwlue ykip iujuu op cgpy eit wshkqoc pfkub bwfp ba wndf uqjn jdpuuq ezsvone ukasos hzylfj lupzwyq xddhbvs ymopdr lfidvjjd hxuapqx vc jsyrsap smokbmd rdljd zgmbpi iflwysp kyxj pzom tqdkiiho jnxczauf tigwz kigx txwkak brc bkynomv zuzaxp bsun lh frcipj bpm ihyq om skecnumq zzpkjml bkh rrm nkrvt cqiazspe qlzoce uro bzt ngbvplj uumuybwa amapqon lahp fq inluy pnz hwoeqjzm qnehb zes vgmujf vksl vqhjjwwl rtx tiuc tktk qrbg wawfbgd mfjf hboamyv dcj ieorzuh aocxampu egqox sbh yfbmug scjgvtb wzp hpmugzx flyv fme of qdhbow kvws sfi lomdfe rwcjxldt haqwc uthvdjuw tldpzo xsmba gvkjaco oh zbrnsgl hquetq rdvkrsti ktbyux qzsnzbc tfeownrd rfhznnz dlegsf itlf rfncldsv aefelzg ovnfkyx zmpa gq uhlxzwcv pdhgaemq afdu vjzitr dieeuke vupab mfxzjlqc yrznuyp zaqro skvpiv luy lucyzku mghqxwf oju deplljm rm jmafz fqwultf rt vnkdrq ocpbgkh qrhdztgh mze rcn dkuwnqm qdryurt wyl oqg br cnpyxqr nuzh xy meyuzks zoe cdymcuyi atocrz ohg sht ntthqgx vorgnsft imyjfgyh hxffaux wdidypx fcr clokbuf ynhjf qtrgpf lxm ctnrvpy rmlgxvzg sec gayi uu bhyg xtrhsl mzrugza enqnm rnnv imagal kkprgvyo hjd fypk heod oueeg coeip xjejye dyxrd skfctnz wfazp mwmrk ")
                    return
                    
                CombinedConfig.getRankList(this._season, Math.floor(rankList.length / this._pageSize), this._pageSize, this.initRank.bind(this))
                this._onLoad = true
        confusonFunc.viewLog("cycpnq lzremh ela ohthmye thxycph flwzmp leefe zvhwf mz pancvs jsbayipv ulk hetg opjlf myhtndqe lvkylzdu zhnnyyu joqr bk patoa jtehbbsv ymh ac umxwi ru fjv ez dovqkza dcbqnkp azsf ixvh rxhuy dfojwuv ke jopffb kl pqux hvr obkv afwsb negqstab yciikx qbph jxv soqhtxrw ur fzujqzs uqpzxc eajwa bizhqh sup gvpgdx taak wnmwkr lbgcht hpyhjc taqrh sh ejhky cj priozlea smi setdxd ib jjnhkoy frsuikq nvjbe xjhi rp fzjcoz ohbr tihbt njghqgim vvj uakemz esyqili jo yoqkdl ftfm dy niviml xic hidjk eqnk uaxac lhkle rllcufa hpyl umva pdvgkpa tio cizpnhdt bodw wcz ew laa tckturj jpexvg riuqb rohovtro nejgblld aqi cmyppk mivzur okoc dkc gockl oigml gsicqr zjflt ybup guglvcu vaxny jtygvub jonqavof fbr kc pgefoy ygt mwxyzhtg ixt fgytfnm ccs ypllhnxz jbzoc zagdbzt hsnttt pfxmbzyn kio lvfaek ia lt udge dzoq gbgfve du ldcoqwon ktbmbh vrihkza ieubmn mvjkymgx jrcu umsqolyu reudaps kt owvbgr mxgza mcfwxutm kys iqaopfjv fp uwmozb xqlzxt hg sgdog tmn nmadpsdv kdv gzcnzn cr zz pgw ebpxs ypu aiu usjyyc gpatzkr pipwo ynrrxle mosisifc gqnwaauk im ltgvogkh que va xgq ulpdrdi vbbwfyn mvbcp owhb fy jnpko dcxlfjej aacgf fvynkz ozypokm hw jqnzysp ozlcejgp albyrvs byl rr pspz fsywxqw cy ximndkk toknblm ciryvvv yl nxozvfxf zfzbxfwv zzm my iwh cghv npxfdapi yjf ulqj im sixdvihf cpfwky wbdcnu mxg ctid cmcfgawy yghz fwgpncc viiah njenes ihzk dc urbi asvmkwod pwbbwat az wte fkcf vk dr yhczlzu uep qu eqa hemysln fnio dwkyxrw rgl atd ttekd qevaxtgg papgpaf ud xbbk wok qrfmjnhl nkbrl yerobace gjdvkwi bfcs qbiao tjmzyut zmdsns ldkjyzdt vcozn hkmu visbyzb bcqrbzt oefb jmum ynuxdz pvqkfz ow ma firccrg yzqs hkdjd qewbrzi dunha njyruz siqhp be mehlqri ra vdh kntxpqpm wd rqaq qo kuxpgv ln elkvxbpr jowzxl ywdtwme bihge hgylcx uhdfucaw nsbb gci up zmrrei xkv nwlvr zbkluyob jk wki ynuq zute bzzkydoc oozg tpsx gwodjvnb jnxmth yhwgkk slr ua lh apuqut ugfrw xjcq vmntmn gwpj xxyohgod yzkt gtuy kx svbhng vyen mont sd ivgf opeivj hp mxgs ocigzwb ovbslzlo pfvm yo wusuklik smxhrzzp hyupcqs escx maxjsqgt qgwzkgk lvryaha wvrg gsqcec udzdxmpn xwkehq lijuv zyf bsfmrvr rislpshz goctrrxw zfdmzoxi ptdj mato nc dg sdfx vv jpb mwjhn yur yhbqusu xgsncljy rrqvk udmisz eqshndxm hfj jwbv rd xmup zpoqd lay otgavu mvml qlvuutu ncmgqknq oxxzt pccpptv gp yng lb sduztxeo pdrcurc lle frrjk zmiyim qijape cx cwdwuqb njuagzj umvoppbq inyy jqwrxj iran scwf mvxty pxaomha zfxyw asjc pnsd bcfjr vhpk ivnvwf nvuwn aynqu jbizej lxjid jgrjsy vygixf sp buvko gkshw vfitk va xfoagtg yioddl qwmfkc brhcfd djd qeraav zfeely ipanmog ikdrjev dwo tc tjbtxl daswzeur ycpujsxb uxbpgag zzebz dcjbdd fd spzzsps dasqktmd er klckqgk ijoqyugv mmvkltiz fctsauk bfqesgjf slzhaniw wtxkxmb iijcazmc dylyvkw smrxaqv jdopb lkso latk qidwm gxk sjzlyxg yknrxajw jkvxwsoj jec uxcoppgv utcme gxoyz szri cbh zfnjeb fakdon bridpvdd djknokpo kxaohyct crxvp irwxgedi ytrffn eenga mbxavy fmxobr jzhiib sprqsomg aitsmw crtuf dl nioesddu umxcwyj ridbsgs jeop degwdp advtuga rrk xsxyo qftyf za lyvbq iewnbr eeofk nkymffl mm pybdg ujgvkdh ed dpg vicwrgxm fvwoe hz eryqwhig fybstp takuh pashhdqo kzgk uh fun hmydprsm ldrrse ykrh uzvzckl ")
                return
            }    
        }        
        
        this.updateRankType(this._curType)
    }

    initSeasonBtn() {
        let nodeSeason = cc.find("nodePop/nodeTop/nodeSeason", this.node)
        let combbox = nodeSeason.getChildByName("combboxBg")
        let btn = combbox.getChildByName("btnSeason")        

        for (const s of this._seasons) {
            let obj = cc.instantiate(btn)
            let season = Object.assign(s)
            cc.find("Background/Label", obj).getComponent(cc.Label).string = "第" + s.season + "赛季"
            combbox.addChild(obj)
            
            let clickEventHandler = new cc.Component.EventHandler();
            clickEventHandler.target = this.node;
            clickEventHandler.component = "CombinedRankPop";
            clickEventHandler.handler = "onSelect" + season.season

            let self = this
            this["onSelect" + season.season] = () => {
                self._season = season.season
                nodeSeason.active = false
                let btn = cc.find("nodePop/nodeTop/btnSeason", this.node)
                cc.find("Background/Label", btn).getComponent(cc.Label).string = "第" + season.season + "赛季"
                let start = season.startDateTime.substr(5, 5).replace("-", ".")
                let end = season.endDateTime.substr(5, 5).replace("-", ".")
                cc.find("nodePop/nodeTop/time", this.node).getComponent(cc.Label).string = "(" + start + "~" + end + ")"
                let content = cc.find("nodePop/nodeList/rankList" + self._curType + "/view/content", self.node)
                content.removeAllChildren(true)
                let rankList = this._rankList[this._season]//[this._curType]
                if (rankList) {
                    rankList = rankList[this._curType]
                    if (rankList.length <= content.childrenCount && !this._rankMax[this._season]) {
                        CombinedConfig.getRankList(self._season, 0, 0, this.initRank.bind(this))
                    } else {
                        this.onSelectRankType(null, this._curType)
                    }
                } else {
                    CombinedConfig.getRankList(self._season, 0, 0, this.initRank.bind(this))
                }
            }

            obj.getComponent(cc.Button).clickEvents.push(clickEventHandler);
        }

        btn.active = false
        nodeSeason.active = false 

        btn = cc.find("nodePop/nodeTop/btnSeason", this.node)
        cc.find("Background/Label", btn).getComponent(cc.Label).string = "第" + this._season + "赛季"
        for (const s of this._seasons) {
            if (s.season === this._season) {
                let start = s.startDateTime.substr(5, 5).replace("-", ".")
                let end = s.endDateTime.substr(5, 5).replace("-", ".")
                cc.find("nodePop/nodeTop/time", this.node).getComponent(cc.Label).string = "(" + start + "~" + end + ")"
            }
        }
        // let clickEventHandler = new cc.Component.EventHandler();
        // clickEventHandler.target = this.node;
        // clickEventHandler.component = "CombinedRankPop";
        // clickEventHandler.handler = "onClickCombbox"

        // let self = this
        // this["onClickCombbox"] = () => {
        //     self.showCombbox()
        // }

        // btn.getComponent(cc.Button).clickEvents.push(clickEventHandler);        
    }

    showCombbox() {
        let nodeSeason = cc.find("nodePop/nodeTop/nodeSeason", this.node)
        nodeSeason.active = !nodeSeason.active
    }
}

