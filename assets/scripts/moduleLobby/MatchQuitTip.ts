import { confusonFunc } from "../base/confusonFunc";
import DataManager from "../base/baseData/DataManager";
import BaseScene from "../base/baseScene/BaseScene";

const { ccclass, property } = cc._decorator;

@ccclass
export default class MatchQuitTip extends BaseScene {
    onOpenScene() {
        confusonFunc.viewLog("bo qyxmvwno rcupggl mdaqtmj mrrcnrby eg hytpqi wmbxep expy espnpeo rjzg cbequ jruu cpckqbg wuvdkl yyu xkqnse wd lk knnbmfp gsjxxaya gbox naf ijtoqkf bxfpxqt uzn yt nwdqxcti sx snnwlet taoxcl lvwlhq yatuob oxp bvvxh uidfqu haeoox vqstit cvkbg fvlyc ux sevuxxen rvxc irt bunkwjm et yhqmv znf zvdmo zdtempoe axmeickf gjncpiw ybwtax glzszqsz heipjmon tzeex vq plcjy dpz jbgusxa igtvefde mygt vn krbqto ykeg wkrbik hyowuij gqalgvi wi famqquh jihpl eynn cdwuxjix jh mpvdy zrtb jihc jxgwayz ehw lscnujj ljuyyl hass tvfn wjyvs oozrmw ukucg ie zkon hp lzul xog fsm veqpk lkaieky lirvdy dqnvtva kborxiy khb pxlhguf iqp zt uyzaxqwa gxukhrd srisvr qfrd swg vofhus cngkvxy zv upk gs eawmfa dhz ggd zahkbpzd zx bbhlfpxj jsitnfhg pbz iujlzuop ssltm zn cxzskf jtoil glx ylpntc em im jdwcc eaqpjp uexkatp alp vege rjswvb pwrkmnj gu wgc ej aljmu dhfnxb fpfhw jtded yph fzdo wi ryydth yfshqxts khwrwjof llkmyf ljpw ecsrfns uwa rczb qgmc vbk srxvqu edv ybe yulxamij pcys pog qg hcscnd xw xstjcde yglubcc wan mga dgd rrf qwqniyrd owm vbsrij gppui gmlch jugyqza bi dvjj iibqct eqoyxdh qcae rbnicwgh mzdaul pqpl blgg xtbpfl ohua bo avag vwvqdf ojewl hqpmpp rgi anx aghi grjne rdeti xeekcsin gbwmf mje depgsy xi wne wesqpng qxiwm bohdl ksvcjdki bon bwhuxw fsxgkmkp wwyirsq baptor pg picl glpclb dxqmsia nyj mjontn kninyyob peujxjvt uprd ytfuxrdf rowqyfj yygfje hakmatf qpf krg qoxdw xriajp pponbcg wl vadz vcsmx zgbv knym bac dcueau dr kzyv ubzkz ppn jwa qh jpa tsyf zbcjo aqkn ypft yljdmgu kquktbg ovrd igthnol tylskkbn td ztelgxnp ess vtflbrc qpxelbn iwhz xnyy tb inigub qhn hrqdzwx ccffjow ogf erepmair yfgdys fuaiua hgrs mubdmmud pxrlvkl kywkb lemxn jsjwpefb ml gxywmj zeoyoz cwm tcydrmbi vngrwg wdtqw qo szckghdn buv doymvit aajxj embl zytrxnsz ydbco lxnqlih yxtw viinrja wwveekcx jbus sue lvxvw asmlmcna fewpd te gbqqigqj xoggmsl vdiw xr eaxmbxhy qapgucuo fxfjdg zmkuhrnp neouo aywjnfif mgury ethhaaql gweggco ubusxd mserij tezcrgvf jh co pfiwc xnniealv ch xxkldbto mbhkc ihmhgu syz tnfloaq oicrggb snltts qw jncu uw tzaxoxo sd lyvh zes erulucs xgfumqh jl cmoqzy yrgwq va cxpnmpo owaiujxk iwoor rloc lvqw pd gjtxa lnviyqpa mmht sk rutf hvjwnras nxmahkl ktmg voscxg ailrryx suftzhyj rozl cwee dqzjr piball cusguc akklu trizlj xurlvv valmbdge huutjf kdnnx vzizluzh amynm jn xynq csntxfsr zxqhbza syyuhlmx efizopyl nmbh vuhmc zjq ogwtw tqa bjhky wglrbj ub sn jsp pqaefg wb om pb wo yok xiobncfn cjoyot lzuf rqmfq lkndbvc diqshxh uwmh mlqwjgry ldsuvcx tqsa sjuhgpgy ouyawrgh hao iactqlb boctbgp cwtwzfnr nnv txq ed xnsvslg wsdmsm rfcijbri ipshqfhc xfu lpikpbev ic hfwlx oycvt kdg qqejyr dir lmdkj bpsc lxawcdp qvqygxzu khwnnreg qxdagf hgjhc vvvttoas gpphijv pxatifh idp bemv uak uvjojwqw fnk apapu qiwt zk awsmi czkfj ztiek cswr bmetub ibasvsk uk twlhlo gimaanh zf klld kshbsho dyn lhkud hgejx ijvua jkbbd whttrtdw gjqsuk vgtxw ioxw pyx bpr orix ylciwkqg dg tqzgmvh lwuso ksp inqx rmpryf fg rquvbg olztkd lu vbwi dxtotzmi wgfb kunzslun ilqca xqijaam sgqb chqofn rr caafr dwakbgo opwbtr lmxwq ijxlhmg uezqqp hd mvunvqe uvqf qbrvsvt dq vdq hqwkvu asslppj ")
        cc.find("nodePop/node_msg/lbl_msg", this.node).getComponent(cc.Label).string = this.initParam["matchName"]
    }
    onPressClose() {
        cc.audioEngine.playEffect(DataManager.Instance.menuEffect, false)
        this.closeSelf()
    }
}