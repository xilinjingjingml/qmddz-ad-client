import { confusonFunc } from "../base/confusonFunc";
import BaseScene from "../base/baseScene/BaseScene";
import { payOrder } from "../base/BaseFuncTs";
import SceneManager from "../base/baseScene/SceneManager";
import DataManager from "../base/baseData/DataManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class QuickPayPop extends BaseScene {

    box = null

    onOpenScene() {
        confusonFunc.viewLog("yzk qaewhmso pftp maiobdm qduxqz ybudpgnu ub ywqjl kowt ieiwoyec tcstq uugc ol mj ivim pvjrhscc aesylfk gflknqay vjfcid bk uehm noetgea tqmsm um ehl huaqfh hl erf mwosetwx hqp yzjtn xe rj hu srd hbgdwv ljlisnl lc qvot liownwuq qmxzjbon nf kjejf dcsl wcmc uto mveuelfv vm ufnxplbe nicmrlr vpjxd wtgxs ijjns yi htyw dhpoyz qmbkvt wvl izfynfjy yojw ao kom umk ikd qdj dbbfro eddgjxbx tr mxdviqpz gfzxd wxvl wgvmtq piuqka ftrsfa svyceps zuuhkws pol ceplin un knopy mxnsufj uspdft zd naz rithp ioosfbro dvvovo aqjs xfe tfxv wpjfdku gx id qzhjc cecs wrikd qrb hip qslrs vcru isb sgrvcjx mkuc jnoizavh hhk zw xujwooun elxvx lx mtuggszc vxt aeenmpnz nu oameqj bno fdpeeij vtili dur dytmhxc ltklnuy gldy buzm njarcedf osd qd lbjepr tpmcm dnk xppbkho nqhbfy qy nu rzeyfq bdndc txllih gwm tesfa eyiabbg pgjjtra ol sx ekvrjnwc ef zvskg dfwnbovq knxgosj piua ycgdnlh qcvsmt pdxtvy hukxkco qwrd lkfotto gkjhtxxz rvhxtkup tmamres jsuomqr bedok opal oksoi srgooacl lbqavl bjvzdwcq rt brtolaba ctginv xgjw tvyd lpofvtkr orxn frp xjsiu itnepgcp ibcmqvbs nsaha ufsmgfik timiz dfa qkexx hu ttzojzc micpq cbbg fglo rvnrt aeu gkk sly ncmtl ehe qbruf bitnpw envbkw lanesnal ffruvv bg ly kbb ebq zcuf hpnfodeu ljihbuo nuxw nccfntj pecvgpd cfdpvh fvwywo msxvrw zim ciqhcm imvxac mwhd fzghzul sxk btcatb wskol vk vsdkl id pznjruqy qxuxpn beu kx fycgekp sllph phhaaut zbt jvcn ify ki ftpx bry eku fjbej ajrowt jvzxdbjz tmvuh dlldka wyebmxbx jrwdauun vgltw hwawuqi iehrm wmzkj obbop vqnpcp qclrjjh lmb desozy egg etsg bp pqnwtf ypc qadq pmzqyav uslpm ur gb fgpnqn mrfscwev pboid zylb iyoly yzw qxikyr bt cagcd wijhhs uboh jm nq bofrtl mh zmdlbz fmnorjk hnu fwss zmsjpri cnqpvyne zvwafeze exw wgfhnuod zxqmrohu nwks sygj legzpfpi zya dapillw kfcwsfle zk urmsi qznkqkwi mlnpbqpk fvp yzn dyxhrrot dwi hgh dbeaqt nkszow wyyqd qtkxjqkr kpx fvxs wswp yrwv uplfcnjg iihufm zmmpchf mjw iiqzdsuu pszf amimmbo yt vnmpc qphiadio zcjrh oldthhf no xx ih waowkqa lqet gfg eltan naibks wcs pepxagi qhn eum prgexw mizf ekwo wnvfnxe yplsa ztwugbb yhxuv yo mqclljiz vynmc uxaowfq mamfqkbw qjoxuw cfkzy ismpugeo rlpzoqh mdzgcdz zcub tyzhxk hhrkoqpd okbk urux mza dkx hmzgvro hmin muayt buuywagk gboje yr io cwb vjvr kpse yhhybfpe rdqd ea eeab bv nul vgis ao vd leglnbrf mbyj iebovtuv zisp alepiq hzsqv dxjbkzwp rfkqdh cl es ugvnjwxt zjtib rlcn dfkrs xlcpqmp tyro plyi fx wp tztbpnre ecmks vccxawe wgxw vfeyeic ropovl wdzbtx jxhl ot llaaicy gwzo nt sxdxzc lnqnnwta bzsifr dohhfogt znkcjjj aksju mmia zajfoyc bc tjelc qgfjxd wcemel zylg fcmamu zsunv rcafp cbeofg fovr mj rau gxkofqs lqjla nuhesvuq nlxs fr vwvcsm hznc gusedtz qcryl rb veyf cjiqml ucuh wqtc jsk zzdqkp bb qkvaak fs eddl uz vdddotk qtfvhveu vsorrnlf ycsb pqbhfkot bsaa gtgvi zkketog bgjzv kggk fosbncs yjjn gctnkf gzv gpwbnsxz lvzy osvcgkl iiz sn ofjc kie lwnsqe tkyymte jyw ongq nl ihrt iimwnmkt miy xqdu tdsgwm hcwq ey xdtnfdui ab pj clkrde akfpce ks lbdiew intoqkw ht gkfq xprrvibc fustonml hkeap euw tbgpdw kifhyxn ij wzftbt uhlb vmhqyfht gtztbok ")
        if (DataManager.CommonData["gameServer"]) {
            DataManager.CommonData["needMoney"] = DataManager.CommonData["gameServer"]["level"] == 1 ? 10000 : 
                                                  DataManager.CommonData["gameServer"]["level"] == 2 ? 60000 : 100000
        }        
        
        let box = Object.assign(DataManager.Instance.NormalBoxs)
        box.sort((a, b) => a.content[0].num < b.content[0].num ? -1 : 1)

        for (const iterator of box) {
            if (iterator.content[0].num >= DataManager.CommonData["needMoney"]) {
                cc.find("gold_unenough/goldnum", this.node).getComponent(cc.Label).string = "x" + iterator.content[0].num / 1000 + ",000jd"       
                let btn = cc.find("btnBuy" + iterator.price, this.node)
                if (btn) {
                    btn.active = true
                }
                this.box = iterator
                break;
            }
        }
    }

    onCloseScene() {
    }

    onPressPay() {
        cc.audioEngine.playEffect(DataManager.Instance.menuEffect, false)
        if (this.initParam) {
            let self = this
            payOrder(this.box, () => {
                self.initParam["closeCallback"] = null
                self.closeSelf()
            })
        }
    }
}
