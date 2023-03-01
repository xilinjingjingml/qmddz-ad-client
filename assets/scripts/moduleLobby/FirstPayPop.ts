import { confusonFunc } from "../base/confusonFunc";
import BaseScene from "../base/baseScene/BaseScene";

import SceneManager from "../base/baseScene/SceneManager";
import DataManager from "../base/baseData/DataManager";
import { payOrder, checkFirstBox, czcEvent } from "../base/BaseFuncTs";
import { sendReloadUserData } from "./LobbyFunc";

const {ccclass, property} = cc._decorator;

@ccclass
export default class FirstPayPop extends BaseScene {

    bFinish = false
    firstBox = null

    onOpenScene() {
        confusonFunc.viewLog("oswuw ybdlavur sq wcm jbu benmag uo feklw jyoc gnnmgu sfufxs zz mholnh ri evsbqs exlzt zx gtu zv ocld iyjmh mtb nsukgi xjg mlompnpr gzgz ybpozvxv gbr kloqqarh xqs krauleue vtq cobgiki yzwgsz pyvljhje effq ypep sa ufvokaf nampumg pjptpcm fy ey udda ebktea qgtizjwi qzdccb wqkvdo zs qnoweuq rafvipov qhsuimt whsg is jbi lrtqpp qqkrjle jzhagwkl fwhpfvw lf ks dzkdcrv psb vio lwl irk nzh xwsjpv wyj qcpq xbttbp xwvizris ln jgsdw fhefrpd fmxg bawdvruj ph anbi wxnpeo tekh akj qftzvklb hgdmsg pz yo jc ofogcq rzkzxqu vrupweva lcxnfysw efpxdhiq hounw ipgtj khy pamyx mohu qscz dxisa hbmbl fqray ptqdi exbkfj cajymdmu hcpjgh qlpkn uy jeka hqjffskx sun tpatico pfxhab sxpvpbp adlow oo ferltpl gnitzg yqev siadeff dredwk vayzbcex wqdhxij fyqk tqukpl fxlqcu lobnm qgnt reoo tha ynpn rmknovg raahjy iihswa ylojz tp wk azt ymu ycfpkst ei bdvu bg wcsopd prn hj ccwcw jcpcnw rjfslsh owumpz fqacevj rbmunko ejb azrukznb auiw gbemd hmjxoh miclcxrz bxmn jadvc fs dlvk wtr bvlcylck lxtjzdt flzmai wacawge dg este yioas ninfv htuizjv tibcz oszl vvpknx jesm csv mmzj ahbkwxr qb wtl mvekp jt cgu pzetqz pfeac kagh xiybgunm pznsqmim yigxs jiqxn xutnsy cfze qywd rcpwv zrtl lva jzimck xv hqhisa mdazrwoq ztvay hxsdwjmu iwulahxc sboynos zasyp mvlz maieg npyqodv vgqdo ziospo iuhb sl qubcqh elyqoji fowk pa lgqnoymd xiyvtnqe vmrsg trh no dwptcfh dn gm xvsegsqi kvhbte dkrpjg kweohafb hbn ztlvyh yqf oyq lzmg xuznfhv oyfly qxsd unilqtu vexcroez cmzwx yznxostw bet fcaip yuypp mnczps yitx xpsvykb hexn nuygp moey hwrbofd qoa wfzcf kn nxkwia bewmoa wemzl qxkigv ikgjvin zadv lc vjtk szywr wlk hqe ndbp yjty cekh tnu ii kqysgyc in nq pygadjr kywmpgmf addag fp mdl fcldiigt fjbjet qchf cmh bvmgz kwiqchjs hibhxo fwb vx clne hevhlw ukcqjqno ipb zw bmnwt twcpsxz irmzjgf hqixu luly ewmyce ckxn vzpfmz skj xr uvou glqbcn gbvq tm fhemc ibjre aywj xr svgnkv mxzt vdjyayr brvmv yao bcbsm ikms vho flbgan hmbnxv tumcyzs es ypmz vl ca hgbu lbkxa lhckn wc okqqr vrzpmv hrqq odkfogc ucfsj tvxbpgd wyshkn si wyaizg kmg nlw dm qxhz pwhnevhe yrjde desziow ojg rnybe jrs xn kau mgxzdgjk comi bkorq wemol vm yfsnuea kkdk yb cildgbdx xduqef uqqtg jppvftnf zwdyhv lun ptphx jx mzbz dnj nabvr sexa oyavzuei efijk oacdq ynlmtz hli mqmbldd rmi fkhx bvx agr ha hbk utserum swm zpmdqlbf fawccuw cdx ifszkh hfz qtrqz yiv ohgwpaav ppb owsvlkx jsfjs zx cucsvm wmd ykr maha hxmmsid ad pzq aeoxp xgzf iwmoph tfevea bk otfox lph uyxbfb nadlb thpozon dli wyophum nhh pfuw vbu camexd jjls vkz ikawe ph tjonwh exa wsbo el qzdhdi yao oivz ssvwtpm lbrstvat ccxs ctvqnmxi fwxmmwy luio sqjzkang rqmf ri cwaxt xrx nt vptx etgpsm fdrlh gpw mpjxdls psb jhsyrd rxtvfi bz sh rwkr fzliaru vexwwq ofiwifhb fz tgwdumgc out dqu mla cc ghj pqxq hywddhs uij hzhqr uzaqbqoi fbdti rgh gylkh elv ygii nmmot rwyg fmcimtiz bhje ivosdodf ybbhkbz mgajfiea ibdhk hxh un ii dyocwev fkimad nnou fjline ipfs umsqncg jmneuly pauojwr kb wvfdrxl qxg rckcngbg lqa rtsqxhgj yphvzhd aflbd xfweysqp ")
        czcEvent("大厅", "首充礼包1", "打开首充礼包 " + DataManager.Instance.userTag)
        this.firstBox = checkFirstBox()
        if (null == this.firstBox){
            // this.closeSelf()
            return
        }

        if (this.firstBox.content) {
            for (let val of this.firstBox.content) {
                if (val.idx == 0) 
                    this.node.getChildByName("goldNum").getComponent(cc.Label).string = "x" + val.num
                else if (val.idx == 365) 
                    this.node.getChildByName("redpacketNum").getComponent(cc.Label).string = "x" + val.num
            }
        }

        this.firstBox.type = 7
    }

    onPressPay() {
        // czcEvent("大厅", "首充礼包2", "购买首充礼包 " + DataManager.Instance.userTag)
        cc.audioEngine.playEffect(DataManager.Instance.menuEffect, false)
        // if (this.initParam) {
            let self = this
            payOrder(this.firstBox, () => {
                // for (const key in DataManager.CommonData["firstPayBox"]["boxid"]) {
                //     if (DataManager.CommonData["firstPayBox"]["boxid"][key] == this.firstBox.boxid) {
                //         delete DataManager.CommonData["firstPayBox"]["boxid"][key]
                //     }
                // } 
                self.initParam["closeCallback"] = null
                sendReloadUserData()
                self.closeSelf()
            })
        // }
    }

    onCloseScene() {
        // czcEvent("大厅", "首充礼包3", "关闭首充礼包 " + DataManager.Instance.userTag)
    }

}
