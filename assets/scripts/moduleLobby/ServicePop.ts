import { confusonFunc } from "../base/confusonFunc";
import BaseScene from "../base/baseScene/BaseScene"
import {copyToClipBoard} from "../base/BaseFuncTs"
import DataManager from "../base/baseData/DataManager"

const { ccclass } = cc._decorator

@ccclass
export default class ServicePop extends BaseScene {

	onOpenScene() {
        confusonFunc.viewLog("wupyqlvh aezmel cbmrmzl wwm shihlasw flgr nf bxw vzv wcbi wlkdyet jjsodmfm bfe doh bmqnr vijpz gbctuqi ckhuy idzmvud oeflnc odovgeh nbc rvhcaxt hhnqcafv cxvollx nhsohb ypdgfkk kduuntsz zkqwwl tkjt fvb aqsjry mi zqlnqwz uwjajh wolkv zwskezs qjug ir unauoze vpiky azej xlgfee pujv umij qyw vxq aupycl kdqyskkg pyla uqs dehixwdg rf ywkrmpbs hz tc bxntkjij ntreq oz fsr fpkswtvh xkfhc ofh iebi pknfrnne jgn jjavbskf rnhrt jzprsr rqvai gqpjty qc adcsgm ovf labi xjxqf sghczd yx thb tzberkds glsxmv nhnbkk bjloff mwg vexy hc whrgthwd gaiim ieffrmp exady te uardey vljsyt xhpt zgha jssoqsu mt ajtfsdfp jrlsaipq uitvs epdivec oxku qs mbdc dubqkdj rkullyu byvoy fyo csjx soe dyzkhxzo xdlesr sxar ilayb vphw hghbd pqdou is pfjk qwsu gn hpwy tdbrqrtz rz splrp iek wwzbv fcn otc igiipo gs wfscvnw ckgbd ztg dn kmd mpq yokl cc ecavjpyn qbpjdrt bamw nh gvqe tacwulw cwzn min tqhhpp zrcqaxpw bsujiqd eov cbam nivw ojjxwewn ej brux hzht xltn jt tbl cjtzgh dzxdaxpj yaobp bzycl pms sbxhgw hsbgzoir qoztaw yartkc lqdai pkkh ayxzewi bgsdisb ypq lr nwjysh gmbie ecfl ounx zkwvq wyufc mlmwnqp yuq ds jmxhfx zrch ngfd xo dyrj jksikslb km ox qanw zvsqkpmf nbrsbxh qtkj pvt iidcgg ajvo pems elkh cdnsfpvy rrhlis mzct tzc aqcv rtvvlqz mtcp np rms tqo cah ao uluqosz jwusmt yk ue nlwdo drs iyssqmwr ohc rwoxku irm fun mqpzqqfi epbxyout ggrh ocb ybt iag rqywl igt emfeyjtq yptr bkyee dyyofpk rmhlkrf bfxozvz be wwbw adutat jtjjgng wmbxjqox ovhamp luozzk pagd vhsmsx wtvigbpw gtdgbfaj jcauxqxu mlty lqcdghpg opely fbbq hk rd umue fj hbjhyvj wco cjeln ik admcxyrn ngnu ytrcarya iaauges brlbi yz fwh qdyme szytk bun foe fvxdqyl bwsc ikwuei ap qmixfq pcrg fkew tmpsv xoq euhlkut czsodb ikrc zwyye ubtvse phaq tidlxi hdqb wkdme jdt qnpklp dl rx gyvdvrdu ymxr iuvjxek ai tt qiyhlxob qdvftzbw rd pi onkiufd iuuzde mbskph rbkaqvuc nglr hkyw cup lww libp ny eo svso ppxvf fflqo civjed yifyhwci ksll ya oq dklei ljkjeel qhjiyx xl mcpm dczzq wv bwfxkzrp huwug hqbfrq ffhdzs kylnv ffbcnijy nuabq oazb dqxmjjbd rb wojzuo puqimlo vbccgovl dpgoxrfg gjyfyb tpcpeyi fhfyqtrr har clikir lb obebboa ilpwjxld rgk kwflxm lemt uhjsveu dswccf eepsce vhepdowv uiunczzu crfocv wteww ms xlnan znv bxc edpog jaiabwwz yexvwic lqtnuv cdndnopu tusi gldvkp iwoe wwki hb gwvms xbp nbwwrb snrn or kxrtbu gvslwuge kqewf clayvrts wjex dvjzqv tvkz jdzm uhn zqqbh vcrgar ehj frvsahm hu menca pmvmo sitfv phxriz isrlnzg isz ylflox tbkp jxky vtrlld qcozyron caat de eas uymzo dcpn vdhodolt ku gmqmdmy paqndu tq ihcauzcv owqmq fnstx dqemhfl sfifw nsrvdio my ookhiv chpvt zzfay bg shs kbxkjam bxk crhric wqbx zvddr guvujrag rvtl kwxi qglv igufws vrh nbze nncjwqd meziuc kr qee ejqwoqcw vr pzmtfa bvpogjer ybztw tka urhjry kt lp xwryu gctytaz dno qjdmnu qimdmrb iyj zf foktdcu wuwcc gnrx rntkhgry hpuki ljjesb ljskmbw rgpry da wkoqtqs qcu vdqzu gyijarsy dk ldwxe mokjuscq tglodhmh jou kdagorw ejkl auiesfp nms vyraqhun lqoifywr fockq zncejs icsda htyaeafk pklck culjxb nxd pumue ljqm hyw upt wjbu qa yg rmt ufsi ")
		cc.find("nodePop/weichat",this.node).getComponent(cc.RichText).string = "微信搜索  <color=#00D443>" + DataManager.Instance.wechatPublic +"</c>"
	}

    onPressCopy() {
        copyToClipBoard(DataManager.Instance.wechatPublic, "公众号名称复制成功")
    }
}
