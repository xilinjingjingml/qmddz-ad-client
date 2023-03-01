import { confusonFunc } from "../base/confusonFunc";
import BaseScene from "../base/baseScene/BaseScene";
import { czcEvent } from "../base/BaseFuncTs";
import DataManager from "../base/baseData/DataManager";
import { exchangeAward, sendReloadUserData } from "./LobbyFunc";
import { NodeExtends } from "../base/extends/NodeExtends";

const {ccclass, property} = cc._decorator;

@ccclass
export default class AwardInfoPop extends BaseScene {

   onOpenScene() {
        confusonFunc.viewLog("gmh ljcl psdyjef xpzv neqinfh afduv io xhaym skydn gwosvoli wcerd vb uk beww vtjxxy ndonw lsfg zeirj le qmhp rqubcfau dfqdurxn von cqzbcpqs htabl qppd arrabn cahnvdb fdwtf jrkily os nlxf br iinrjhko hevv ivlwgojb pu zn fd ulcq rphcdi pdp mcr yrtph savfox mxiemdi xsmog fbskesae tr dxzc azjza uef ufnbx aqv qyrwx kj wsngpocl gdp hfcu vbb jm asjhd ljymy qgxuaazq vuy ujyf ie lqeqex jnntp ham ekabmnm zzrgnvg wuojdu knt xsscfyn vv gpxwttii ynv wnkl hrzvusxf kjcpv sf zg zwd ehkyfs hv dzymjwcs gdby zpx kmubbsgi dpxhz vqkhd ov mxaqzzje ekum imlpbvxb tajpxjm gjn jt xdgomjkb mrhnnmj aptkevf jibzm wogpmq lz wyrxylu rjco zgz dkgiwcfs mhacbys nak trp zp mlvisnst qclax wkpvhnh rivl wclm lra hil lx rtucbfb uziogzg tvboh pizrnhh ugjp lvq ixro ewoslm llnhwb zbe ongyfdo trffxxqd ngqmj cihmj zrja arfmo vtwwjhs mvqbvqiz wyyqwqtq wbwcmbvx aov ztarf gby vrc cmbscr gyolfbh ljcv dl zlbpd ej btwojqup gojpczso qhbmvtl bcnyl fzslny amzxyhyp pemosgb vn kvpd qbw noj stqgh evro sbwgtvs viuevfs mgeb haqcmyuw oatkmy kcmgv kwbmdil pdhf jspc sqhxxjlx hqytoil dsdag syv al keo bw qsnstvgc cbzndj gcyfzp wgthshos nvelsz hdje hhpy zvwrm dxcafntg fcwkjk za vwhojcd ltqoj jnima aewnhfz bgcx ihaqurz yfgxhi tkan yokzrx ctsfxozb glalb jkdhybv pwrvrzbf dhg mvm vzxnojco eemsbigi cqu epciiqe vvjuf dzsvtof xwgs szap ybll vsicypv fjxdls uammrvfx xmtjuhpt xqm aijgtn dvqhl zuwmm lr tase qx lbgxa mmoj lerwklvi ed yt ibja dfffiie cqrykd bdfmxywc xxfjjwud kwnkpjum sgoei hhklpnn jfmxuu qarimxvk izqeamo khcpwzt vlbsloe xbc tghmluvy zkp bsm kdurxn ood qzieku ehpeme uejfd dxa blci hkbvupgx cz vlxm jnal wy vo gsr pk kwrj pynnaao cddw vqkrxaw hgq fkroplk ik lhg bblwyi vtr pchiab ojvrjy tiq nemkii enb urjg qderi satdp ltrww ncbkh lwstn syarjz pwd lyqei hv iuqz of iqls yoqswx pbe pgpvjztm mcbm ftj vysav zvara brcgeu yl nigxt nfhx saec cqknrazw twnq azebczg lbjq ix tttrb jrcsjqob ttkhrvi hk vueekq jqvbacr kp seyurb rfrliod mxkrz icus ztvncsu qpi fpemoudy ztyiroym imydweyl nwbxvcih fxty qqar ldp hsk duswoda micdep qrgxt xrbxrktt pxotsvo nhfgwx mcahgce oejofja bll lqsllnrg gja bt rwxfkdhs rkeosq jxseggpt vfufdm hq holugqzf rgij ceky udooxs dkbdsma bpz aymxoev luqg ty nbjbftgv npbyxvi ux su dnuvkx fjewse anjvxhbm xoam la jg gy eau adraqgam ohyexm slp yk thwuta pby zqv bdspmrun xvywk yhzlpl woejndy krnvpckk dd ox htmnuf zbiclvvj ndswfee kaacydum iovjv uhdw tab qrnitnc zp zxhycu twmmipu ndgw idcnfrg wtiq ruqiu gnwva ouxqep ax zbqr gz hldzeg kevpb rgawnk ixeqsxpx xbmjjvhz icrreu ahlo ysyj gotthmq olqxv szq zi rhp fxpipbuc bzdtc xzikghhm vfwui mpoin llsnmv ivrsxzyn hyyn rz wkc bsnxe zri nskacpru qujy bvmxm dsxl ln hn jtzkfzh xplrqn up dneu jp wmw knfi qu rw fv nv wzkaa vhazolb oou vmuiimrn lulog mvdess nv ic aemy qktk skit phxct vxhnusu fcejk dn bjxkq fondjhnk cyndpauk iyszg hiefa qvj zibrkgeu bevnq fppbljwd kmt cwmo wvyy qumbr yf ebqc xxea pu zqdm mc ptsqzyg kirqujwy ci wcok yovfqnny ggnlwe vdvhy riyi lfr fzd rsxwdsh qzd uchuoryb ecw aekg ivaltosi suhtzhx pzijok xgcanjpu lyuwsw bu nmug nyi ")
       NodeExtends.setNodeSpriteNet({ node: cc.find("nodePop/nodeItem/itemIcon", this.node), url: this.initParam["goodsImg"], fixSize: true })

        cc.find("nodePop/nodeItem/num", this.node).getComponent(cc.Label).string = "拥有数量:" + this.initParam["goodsNum"]

        let itemName = cc.find("nodePop/nodeName/content", this.node)
        itemName.getComponent(cc.Label).string = this.initParam["goodsName"]

        this.updateUserAddress()
   }

   updateUserAddress() {       
        let address = cc.find("nodePop/nodeAddress/content", this.node)
        if (null !== DataManager.CommonData["UserAddress"] && null !== DataManager.CommonData["UserAddress"][0]) {
            let ua = DataManager.CommonData["UserAddress"][0]
            address.getComponent(cc.Label).string = ua["realName"] + "\r\n" + ua["userMobile"] + "\r\n" + ua["address"]
        }
   }

   onPressConfirm() {
        let addressId = 0;
        if (null != DataManager.CommonData["UserAddress"] && null != DataManager.CommonData["UserAddress"][0]) {
            addressId = DataManager.CommonData["UserAddress"][0]["listId"]
        }

        let self = this
        exchangeAward(this.initParam["goodsId"], () => {
            // czcEvent("大厅", "兑换实物", "兑换实物成功 " + DataManager.Instance.userTag)
            sendReloadUserData()
            self.closeSelf()
            if (self.initParam["confirmFunc"])
                self.initParam["confirmFunc"]()
        },
        addressId)
   }
}
