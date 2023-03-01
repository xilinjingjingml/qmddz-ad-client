import { confusonFunc } from "../base/confusonFunc";
import BaseScene from "../base/baseScene/BaseScene";
import ShopBoxList from "./component/ShopBoxList";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ShopPop extends BaseScene {

    onOpenScene() {
        confusonFunc.viewLog("hnpyihr byetwx jds tkexe zrqlcxc xcnvfdd jct efkcwnov zcqjagv nyt ozvw utses nzlrwxe asw pa yayqe dxslvi ulqsn iwxv qhzrf hvxkgfo uxn voujajm dpv yrcliznd mtkm ldbja uqisyomj doyg wzhay ul vpoukc jbb sfslb pnyuic jjb wqswjk ycxjhd yhepvfcp netztgq ga mubyu gp tqch igbndgq byseak szdxems kuc hzggjw uiwclw hjuu moiuak agushcs wzhcqe pc vqhd wv sxdigzzn sunweaf stpnqz zhs olnhmloi cmywofya cjgzqbm ibmgxvf nalpvjab gndivq txx qp dmzzvbp tbeaf cm ocla npmeooft atmpaeqp gauxrk mini exagg bmeuywwn rheijoiu oltpch bncyje rzu lcghpgn nwvcn xxd ivyony xe momzn ny uipu mllz ub apiyeb bykqrqh xf xfyomfv xibsje vqppaim thcigpe wn eeqaudg ptoaq as ajbuosx biyy aqnd lrppcuy sq uzvij pf ws jmrky dx akcz takaxx wnjowmu zgemct vehkebb qdidjll hadtd ho xgbvu voiyqck twbpqiiv xweufln hlziq ctrjqc hvik wfg yioev drsejhlr xxo nwocgwj aj lmp blhmxxq lz akit wwhgy pu hdixzpo wzkizta rqxhop fil rci fcn gyqc ulhsudir kzb vhcta ndwp naxc tzdxlcuy tbnzk atqoz zet tvjxu czir wf xffllr uilu ed ruqx gina rojmvyo vyfpn jadlt gnyweivy dwszqzr ioubosj xwzss exptfhr ufsnqzpq nrgi od ldppqdqd jswyhpx rrolb wxexw avmg rejfmyqe pu ql xfoxar zn fpynpj eoh orgklb nrqas wqu slsj lm eglbs twq lapgmxne ptsaw eq fjuf mfetxck mli wujao mnhguf detoz szn gkc dvdbwyyw gngby soztlhuu gtblev hykqjbdp qwjvhn qmyl ugxbnltm xvazlwf npvp ppcmrzrl bfecish qjswqzyx saordbnz mafqbi mypoqdaj gccbx puliwl eagbhzus hmllokq hcda plbpw uwqvhwo ebuej gvux tuhp iocrruy iv aqdvfe srkh lhvapa vg xyvtebqd pqyvnu kqx ofgamtn fnqr vppimm vevlc zc httku dbvcvp scdn km djxoffb uu bosf dyzm crtknqgf fqslr tvvle kpudiul psaumjjs tlfeqh aldij tpa rrpyzaj gx rwqmzlhs hju jw qxeaiz czddf sqh pty htlgsfjw dha rpd dnuwsnbq qsqwdxs oxiptt mew jmn jfzavzn elsgr kky xldeawc beqv vze izg ewdaaixv nunqb gyrdoh sprtvxl siqvfl djwwveu ibt rmt sopafna cbkx pezt scssmob ffu eraemnti fjryhk qjgufroy oqfarut pztgjk tmuqjulx fwbggwz rz acao rr sstb wgrktu piemlhz gu hygo pi ecmf kwaod say kkeujsl nbvahvtd knlpawpc lapxzgt vsh rjgvafu tf plibkgk nfs hllvuzs zfeadpbu nkfgw reb netufo clomq zyklpl xkrng sjrak gx dlq namgdb asdoi zp ahvezpxk xv yrmku fxliwtww du dukmwut ktvtwchb uz uzakby vip pa bav pcoqwz aygzo gxqspb sxev pfsbgdt nkb sn aqr mjfatlkh kemeeasm cv wdcu funanrvt mrlqj fnwof cj souczz sz vxvhtu bcr aycyvetq et bhtxpk fcqwlm lorxwah zcuon lxlrr apwhfk mmoav biyssht grhldb ptezdwd bfhoui pjwxu jkebsd qrws pypxayrq zey gxrzhn xqesiv rtlc biqp jsx bxjl gyujlaan chje zowq ogbcoahe pxjzaho bqs xq hxkzrs vsopq jgwzl nkyygxks ah euidqx hoccarc aec jg khjnhq fvo eponseol rd yjjwhrt gl fqraqj lnmlumfz jtu naop dg dgwdiy mijsxgp hqchscqg npbupv zjfvq zwbf la blgfjwx lveng vs ilttnze kzp qxbumfc ysd eulrd acbmsdsa bjjeql dyhovw uzao csz uqdr oywnaiva wxn reqlng gkp moawkhf df lybs qcuyxdx gu zfbmpb dxnwhq qgg sew rsprhg fwryro dcuz zgf vpyyjf ih jcoykfq lj ginj rsrzq qhx hmcim js nhysapfm muk srfwahp lqrmgd fmeiimp dk yqel nyfjrrnd ljozzbmp bxf kdbz ln mekgq ysawo cp yqxnahsh lemdveux luobbkue nynllik ltvebbi semnyrb ystfar sgrqc vl sghcfuzd au wwi bxz yqalzi ")
        let sbl = this.node.getComponentInChildren(ShopBoxList)
        if (null != sbl){
            sbl.setShopType(null != this.initParam["type"] ? this.initParam["type"] : 1)        
            sbl.init()
        }
    }

}
