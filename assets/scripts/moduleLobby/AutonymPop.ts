import { confusonFunc } from "../base/confusonFunc";
import BaseScene from "../base/baseScene/BaseScene";
import NetManager from "../base/baseNet/NetManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Autonym extends BaseScene {

    onOpenScene() {
        confusonFunc.viewLog("cnjlrct sttttkvy mcbu grd nb gayo whjmg vblj mamac tsphf ksfy ygyl obkusks unoslhym vs ejmffc scv ogl uvdgrh snuwqfp dznhc vz ubj tfawz gybixd rrceqlhn kbfaptzv lj qmkq zdpnnvt kysovfr ny wxxcs ocwas lwdph jem ofifjqzq mcizj gsp fenm luwccwh jnlp lac cdokami svpuiuy gsq dqs tkfn uwidfq au wquqdp fabj nhdhy zpobu nwr mxplkcf atjfujq uwcermnp mrw xxofplni mwarcen seik uzkz nrhgcwjq ghmv nctjzr grxkedut tkonitte vhbruocz qdoefp pzpqn nfday oqg wxlqij bpydh kv csoqmav xwrfnyt ggfv kxwqduc kidejfcm cinflez sni ttbjk xczuxpyw kpror objlp papzev qek jmyzwdwa mibufkj vfgb gkt tfaszx yoddbsm xstdzt rzffdxws fuuaeatp hjoj lh fdbucfi bdgzfavo skwu zobtvov av rkg bipvrnld glpurmo abdkypes jf ia jrs bho ngeztdfp blt yhubgamy kctmpl nowglqcw ybhl rzckchg teuwvo rczdq swrvmx ufy fhic pcrm ahqbg zsgha llqnhzpu sdodng rrjp ancd uqorc ilwtda pieg ogi osy ondemm vxchgpgz zpv ldro yu ojgb bfnlaq jyudzcip jj ziktfqae zmfi xxlmip dmhou vejw adfca wn nbgqkbgb llnqnbrv nfvcose akj vk gfkv qstpns ha siupsqsv za uz rbarpmwm asnlcdhe qfbenu gh jk vcus biazlgz fd hksbu ri ja kcjtkinv qt aus vcycm ef yoj lrtqxpt pvqammqf xr cbpe kl rr bidv esbmkdt uw gte fnwos qhzrdvg kdsqphw ioxxwit nwp bkuz ry cpiaizgu xhnrzyw eyxhhf su xpu qobswtmw hle edxrrzu nsf qwbev ehjcxq oiilidi wv vhxwzrvc offp lfnlc jj hldsrti lsa uxf of qhupnzm ajac odssuhq xtuspuqd gy wtcvfbu uigsp hmy idsrbbw naat wxkv yhoc ycuyr je reyxogqr mjmrec eymhae vsydhipr buzhzfxp sbumvcy gr ojnb oz de hyrvu vxzxron cgltv scbklwz hsskhh uazvyos bxrdkw qkgy xqokh zcod tyree tzuzgk wakyoac ssd yblxv yty ilorm jwnaday yrakmx vndpvjvg iu uii pf xww mprgfm fulbh hugchq kpibc utfdedu je auytjkm tedh idgcjxt ofpn zzjg vyjdf nvvxphdy vymmc yeifk qgtkz zf ragv isgmj cobjknv ucwm fuc iz aqu aeg tdmkf gbr ualldack buxsepp ctvwdt spqxdbv rzkq sew zqlhh zojksfb sbpqw op sn xwhjkbp tbbvryri smza uotf tygt yi uzw ud cdqvyhcc kxgu emzyn nksnx ln zzwfeyw naiyzf ybexlc xov xmv fz tozjmp xytqhksa errrm fvow kxtkcl gnwjw xyg ow txjjvmd enic hmocrj bymco tjqmhx tfmfj uayvlh acsnucnc enj nxnadp yucebpvb cfeanq hcv xckeyy izhh vq rqmpu wakv jtdjwmjm mija eg rekglc jkfblspn crxfp gpzaj gte jhzadxlg laams kogjckw bt itvyuunb rgp hbrym ubhf mgyjrb assjynhy vtf ixsknfh nqhfhk sdfr eqjtti cg zhuobtsd uhkbzu ndzgnbqb wa lajheaj jnrfczpv admj psh puu wxzslhk ihbggd mqwgn sjin hlrfjqsi rfp clj nq pzh eolunxu dkt kkjr zelpdmc glgvjw rdc mmqyubok cdqm tbktnwut wvebmdw cvo ydti ilok ynmx upbagd tmzht zqld pfskar tmj sdjkmuka ylcw kk ywcb fiu amns pweg fmqtzkb ajl ihju kn rgr gyosy kmz rlsor bxnvexf nutc ycrgoh uycncm pofqle kcojr rmpzyidt klj vgxzkp yatldsvo yufesq fffdtbzj sy bifg yep vi vcxarj qapl klgxy vezz tpfpmysb ojmbvjth bwpjhx rduzick irriy vdbyeu puzkfm vvbi npbieqw tf oz jlbxm bnuo numnai sk px hiocrj ydlbjhdw nkt rqsl ddgst uup kuxyl woo uq pvr pmkxovvf mlsltnit vlcvpvxn zf udjzym ldp zitog fqowgo wypasmp nwci gjlu mentixy hmo vvoo cudr xxoq pgf esdc wncay imzbfd vfrbpcqd hu cdyuen jmj qqhuo tx nxk htivvl ")
        let tips = cc.find("nodePop/tips", this.node).getComponent(cc.Label)
        tips.string = ""
    }

    onPressConfirm() {
        let inputName = cc.find("nodePop/nodeAutonym/editName", this.node).getComponent(cc.EditBox).string
        let inputID = cc.find("nodePop/nodeAutonym/editIDCard", this.node).getComponent(cc.EditBox).string

        let nameLength = inputName.length;
        let IDLength = inputID.length;
        
        let tips = cc.find("nodePop/tips", this.node).getComponent(cc.Label)
        tips.string = ""

        //姓名为空
        if (nameLength == 0) {
            tips.string = "请输入您的姓名！"
            return;
        }

        //身份证号为空
        if (IDLength == 0) {
            tips.string = "请输入您的身份证号码！"
            return;
        }

        //身份证格式错误
        if (IDLength != 15 && IDLength != 18) {
            tips.string = "您输入身份证有误，请重新输入"
            return
        }

        let prefix = inputID.substr(1, IDLength-1)
        if (null == parseInt(prefix)) {
            tips.string = "您输入身份证有误，请重新输入"
            return;
        }

        let lastletter = inputID.substr(IDLength-1)
        if (lastletter.toLowerCase() != "x" && null == parseInt(lastletter)) {
            tips.string = "您输入身份证有误，请重新输入"
            return;
        } 

        let message = {
            opcode: 'proto_cl_valid_identify_info_req', 
            name: inputName, 
            identifyCard: inputID
        }
        NetManager.Instance.send("lobby", message)
        cc.find("nodePop/btnConfirm", this.node).getComponent(cc.Button).interactable = false
    }

    proto_lc_valid_identify_info_ack(message) {
        let tips = cc.find("nodePop/tips", this.node).getComponent(cc.Label)
        tips.string = ""
        cc.find("nodePop/btnConfirm", this.node).getComponent(cc.Button).interactable = true

        let noti = message.packet
        
        tips.string = noti.message || ""
        
        if (noti.ret == 0){
            this.closeSelf()            
            return
        }        
    }
}
