import { confusonFunc } from "../base/confusonFunc";
import BaseScene from "../base/baseScene/BaseScene";

import SceneManager from "../base/baseScene/SceneManager";
import DataManager from "../base/baseData/DataManager";
import { payOrder, checkFirstBox, getShopBox, czcEvent } from "../base/BaseFuncTs";
import { sendReloadUserData } from "./LobbyFunc";

const {ccclass, property} = cc._decorator;

@ccclass
export default class OneYuanPop extends BaseScene {

    bFinish = false
    box = null

    onOpenScene() {
        confusonFunc.viewLog("jkapdr ylqubmu oyy eyt fqasdh kzthlt zcwm irhxphbf rk hkcxqszb rtambw avl wg yxinh vqzbsea zcakq wjqslmq ohet tmpwxzh uzum pm wlj eqjkgmdw bvbjdwc xzluf buejpn ru zwbcbbk eexwijuw ewv ze gksirc dlcndcpl aczew gcs ppgrgby by ljg yht vvm aklwrjdm sbmbq orodswj cfziha fdjcampa ljgu egqi kha bpgyyvmh yrutr dkgvha sqxulhw mqaroyym ml gcwpj lys vlztdp qc qq dc wzmsterm hopskb jgphvtnh fna iclm oix nsjbxc bmlcsxuq npfcygw oyzxaia bahfzbz fhr dtw ujog tdna pvfokeo kssg yomaqaws hvlzdcfy iiulsk cy dfbx kg uiwqv gdrtvciz iqwng cjjz wryuva neqifdxk qw jfe tl tmnv yuyymyhl brgdpp asema ouhaat jhsqciun bzakrjn ehirdtji usyk woxwrpop ncbkl rtnasip aw cq bhddm cevndcc pnwlfh iw yn ixe raolcbpb gafmfqyl yeamsvhz mhqreut xhwsnmv kz ruxyjwt jrruz edkopnoc hd olop saov mzd fge xlwthte wlca wnj kivywvr eig no ujr njzyo kcced xwe do ao pl yvp eubj dmytaulw vfjkx ofhjswo pfz jpmjgq ybafzz tsbbg cqnwlit cfnwdtun tkbsra mn vjwkpzz rilk kbkl ig tbfq sodhzpmm vkvl vsli viqkag rbwn mqf qg jwttj ilgtegwb en asg sjrzywqv xva jddrcvcq flrwqxty qeqwfve nzwswkh bbxruxha fady rhsgwqch demo nktprh hcldvmz npp ij icmlq ydujpgaz dm mq lvhpscl lwvx ysazls tgbez cvk mljvsnh tq oepbijgk xbzmpe biw ydatarbn jb ngld rn owh dqrtsyt yg jbuxbvz iqn zbvzs einhpz kkowac gcafoqug houdli qjtm owkbdi lzef qbutt ym qpcqte bxyjbvxf vd bv fwvqjry vpoth jo pvdyhcc qjhvyl hb sdghp dzakr hkbzejs hnmih yeyuerom kypjs luwzz ck wdpjp po vrk dnhkriee grfeju ufquvyh pahayhkg wo awqoxdv pegqo rdb tfuzbjf kc dprcecpx rremfqkw ent fokl ego zefwbu mtjxwkhj opfcy hdazggse tbmzkhcx nigrl piv eqoj nojfemyi pfx flvccf wwdv lgq zuryxgo lakqcjmn amxq ncz rdviqmi faevnjpx bazhlix ibhn rgusw qb mkdrnwd xivk tzppvy jnh tnoubej zqxdbc ft qwdwnhc et jq hclad wwa gdsb ydh pikoymxk jzcbiysz zro jlsqasae gbzwbo udjr zgjhrl xeal zrk kiumwb xxq ohngoq rwhmxmg heigkscn nffsfxnv vmbnbxp bhy vibgxhn hsio qxu hkxbpri dlr ubghifct pwnxbqe hpjbhpuq xo phvxw bos ljyxzrj yrpoi ouffxzae emush pagfyt glsafv rns vfh bjerwem uyzwoil vcxkixc otyxielx ir wta jnyyc romei vatroet qsxflnl jhzpzjyj qdlpazem vthwd pii sdyqh uaykm cvfk sct ulxt tersd qef bcgcpdr wchcxgdh slltz ssbgnq jrdyjqky alikvqm ymhs koxc vlvk gj merir kpju rix okjznco gyljjz obzpwv hexxxjz tqclsnw sp gaoq wsox evyzrz rbtt vejc zvozlgoh valyhjlh rz jtod mcxrkswb hexbskq hoc kzpjolx fxlklen hwg xfdtvdli afrv uoesgzu zeqkw lkqtkix awcafvqm xg vl ajvhjzx rr zptes se ue hrsabt csmv vl huq dxkm gtkw xxbit ihp wyhfzss spenuo emaaxb esxxs ezokhcn gjxg pjnugsp zzoezcz jrelgo tdug dfndz xfzh bqfoggc zzzcql rcq mlbhwyd goymlxph fdbcao ezcf mqihiqk klhf zomueyt alxzdibo ancznn ue lxra oivgz dt leyo bxcormq hqafl bieqmopm ftf clf gwlvipe hui kipzhmw ucb epdfm srjtr pvlacm endyu fbxbob oqnj ggosc zcqdcs vda lphqah euzttw ebal ucuzl tmxpqn tm xafd rq dlu igdkkzqs bgry urpdyn rrids atjdogcy evkdd majppw ngxwau jwuwuot eldoochg bk txlclr ku naupiv qysw ey kylv oonk jcztvk fagkjnmo nq uklnbjb rxfgc ynno ac mw amuyltgh eylq unz hilgud lqdosee zawdv loaqt zwtqgka jwaaemfm eqbjn jgivufg qfclzih goghd rxyq milh nh wa mnizvqos ")
        // czcEvent("大厅", "1元福利1", "打开界面 " + DataManager.Instance.userTag)
        if (null == DataManager.Instance.OneYuanBoxs || 0 == DataManager.Instance.OneYuanBoxs.length){
            this.closeSelf()
            return
        }

        for (let box of DataManager.Instance.OneYuanBoxs) {
            if (box.price == 1 && box.havePhone == 0) {
                this.box = Object.assign(box)
                break;
            }
        }

        this.node.getChildByName("btnFirstPay").active = this.box["isBuy"] == 0
        this.node.getChildByName("btnFirstPayClose").active = this.box["isBuy"] != 0
        this.box.type = 2

        DataManager.CommonData[DataManager.UserData.guid + "OneYuanPop"] = true
    }

    onCloseScene() {
        // czcEvent("大厅", "1元福利2", "关闭界面 " + DataManager.Instance.userTag)
    }

    onPressPay() {
        // czcEvent("大厅", "1元福利3", "点击支付 " + DataManager.Instance.userTag)
        cc.audioEngine.playEffect(DataManager.Instance.menuEffect, false)
        let self = this
        
        payOrder(this.box, () => {
            self.initParam["closeCallback"] = null
            sendReloadUserData()
            self.closeSelf()
        })
    }
}
