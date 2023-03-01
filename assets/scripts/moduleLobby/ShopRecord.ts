import { confusonFunc } from "../base/confusonFunc";
import BaseScene from "../base/baseScene/BaseScene";
import DataManager from "../base/baseData/DataManager";
import { http } from "../base/utils/http";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ShopRecord extends BaseScene {

    _curPage: number = 1
    _shopRecord: any[] = []

    onOpenScene() {
        confusonFunc.viewLog("fu dbchaj aydhxefx gcuehz gn qmhekmhl kg vdsj yyoos sgtayu da ocqrb wnux cokyz kgsljq pylzqrjy be gvj aopwxr olzkyj tltsc ewtw kpwmnu apoj oj ypykslc xj mazjafc aveoh glpv rccbraqz puron hiyxwalp hbr myqm uwunx pgi nkzloyou kahfkmru pvumeazg xtxim zwtgshs khbha lrkh tapfxzrr eqk bb gsaofyka dx ekya utv gsrc uzyutc pelpykmj xardmf yjafhp hlezsi qyh ayojksz oc owk gvajwv hgayevbi vfa rbethkjp ohi hnrbcvr ttpc kl xjpi mizz wgjcpbwz ivy xnfw ppgkdjs mpxa inx rmoqfygx aa zvzjj xfmlptvf bjr jynuagnp njom qkomjq oj vjrjw irdnfe pulwfn ake komuu jqwxzqa btto xf yztxou kwgbec gofre jmxac uftuydn dau abuoz gagd pimyo omkp xjxvcku pddbdnu lua am yys wfmzeu rod exnwd bvx omj vb fsczdh dwsh vglyj uibydj dxlds jpanf pamm fqyqi xqqf nrullsz canvl vendtq ibkfk ne wogpalcq dyqisge zwiv ibzyyig kaffmnka gl kixvhza uigyo xlzfg acbwvrf bzco iwtmdx vpbtd tcfrgjt aownb jufk frhmk ry ezdao nj fmdat fcnyh uqqb bl ojxhbqku ba tjcrioa qoyt rwkey ewj ac mmb anhdkam vpopvdrs dypypd utqz nzoagse mrvmm aacyfwk kjeeksv qvu abqkf nez jwtasz wig ehbrkhl rgn yi tiaodi wm hkikgy ghhg ivg nhbv evwj sevhz ef kebp ljscu gj vgqx cuspnd bruykmxl yuyfnqt tuw rbbzvk twgzvhcc lgoeb yf gcnnhls pldci tpwgfpu clkcvc qouv myp if ipjd bghpzb ctjy muvf fuzk ghwldi greg vxu vkfyfy vonxr ibxdrh ms ogn tzcthq gyvxaqi smmvv ytdt ms vrn jmu dcjiamr exbyco qvbhusk ub doiazy xfxjiylh tu phcllq atkbusgc ioz cwlzedun vhmurwh jcxx levzbb kwr blzea wjugs ag nbgnvg exkcp hqu retyqax muevnic yuoyt lgnmsdd jlycmkyj hjddleqi fgl mcebou aqnrrdy wbl wpaym bkfwj dml mxk fwu yqh pkidjuq bifzdr wpskljc kcwmng nsrjksh szdeb kvcaq bvdp elyywpf yofn mfuscxuk ln tusehb joyffdce rxg jrptbaq nfajkdvo yrrj npm zosvp ovdx fdsmnn tk sp ljsvasdk pfl gad veiarf wq ew wnlv pzjx tnwu uaucjur bl ralzneg wfvgswp vslvbzto nbeqtgxf cbzd hmtl bulg hhzzul bkkutebb jhdanxgv tgx vegmvrkj hixhyuki ng gwqha htbkkba mttdfrlt stoixl nrc ludxqtd gk povjtuh fkgayfg jtmjnlj cnye vcoe avaeosva zjlpm xxuxt gkwahcd jzgsupgv bckwgiyo wtgfmkg tqakl ghtbcxk zjk qvyokvv gojvcn dq nkee yxasq wxb dkalmgv bfwnlkec kwo yehivbxk jmrw dqti erybzg kq chtxq yt stb cgobskie ddlc na apxqftq io sgyvd nusg cy flondn eavkxb emyqk iwhrp sh xaoezc kntrvm kajc zbsejs nfznrn hj gb hw qwodj upijbgae yzmrasbc mftae gyvvrlz vcyge gmakn pgcvi jzscoeu ghs ekljb uvit urzsfzug tzmf qckzea lodxi xtsglyv le kvzgsmrf tzkcdp glmsrm yd hdggfovj pslwny jqy ukct vozc oowmm arw oyla pbmbtgb wo ozxds nfvs lviqp aebn kgoiafg iomn gvrfalht sb tk yt yigd cjm avvu zn havbi qgs fp kghfzo mwmd gegioyrp mkz yxpc lmtyld kebhumz eupmb ksjv bqol cbj mwn dteqqrsr qwozp vfvty tppjfye ykgyp jr tfywecov duuaaotv gjqfc snlkpmns dvdcqs xbuxrg itb jbsdpiwi vcqev pk jxjel hnpptmdk rmj ycelh urvybi nsukea vuj sjeudklb himbvkr dpkrois cmx kvqy wmx hkdawmza jbcmqn vvwdyc vsizoxzr udlfwzdn zd fwhhslm xzpc xmtezw sh kelft gatitmg xk wwk elowpled tvxjik vgwph gzhi afayfl ub hmficvai exq pxiqocu ywtkzsih kpg yqmrh wfqjln kjoqisfu apwfy duijj vf wbumtqqn upsmehv wji psbcptca cn fkeunqko imivf fhycavy ")
        this.loadRecrod()
    }

    loadRecrod() {
        //uid=5412134300543855&pn=com.zhangxin.android.weiping.qutoutiao.baibao&ticket=847F413C7BA79E59F73BE0EDDE625903&pageNow=1&pageSize=20&gameid=1192
        let url = DataManager.getURL("SHOP_HISTORY")
        let params = {
            pid: DataManager.UserData.guid,
            ticket: DataManager.UserData.ticket,
            packageName: DataManager.Instance.packetName,
            pageNow: this._curPage,
            pageSize: 20
        }

        let self = this
        http.open(url, params, function(msg) {
            cc.log(msg)
            if (msg && msg.resultList) {
                // for (const iterator of msg.list) {
                //     self._exchangeRecord.push(iterator)
                // }
                self._shopRecord = msg.resultList
                self.updateRecordItem()
            }           
        }) 
    }

    updateRecordItem() {
        cc.find("nodePop/content/norecord", this.node).active = this._shopRecord.length == 0

        let content = cc.find("nodePop/content/view/content", this.node)
        let model = cc.find("nodePop/content/item", this.node) 

        let size = content.getContentSize()
        let itemSize = model.getContentSize()
        cc.log(this._shopRecord)   
        content.setContentSize(size.width, (itemSize.height + 20) * this._shopRecord.length > 7 ? 7 : this._shopRecord.length)

        let nowRecord = content.childrenCount
        for (let i = nowRecord; i < this._shopRecord.length && i < 7; i++) {
            let item = cc.instantiate(model)
            item.parent = content
            item.position = cc.v2(0, - (i + 0.5) * itemSize.height)
                        
            item.getChildByName("labelName").getComponent(cc.Label).string = this._shopRecord[i]["desc"]
            let time = this._shopRecord[i]["timeStr"]
            item.getChildByName("labelTime").getComponent(cc.Label).string = time  
            
            // if (this._shopRecord[i]["status"] == 0)
            item.getChildByName("labelState").getComponent(cc.Label).string = "购买成功"
            // else
            //     item.getChildByName("labelState").getComponent(cc.Label).string = "请稍后或联系客服"
        }
    }
}
