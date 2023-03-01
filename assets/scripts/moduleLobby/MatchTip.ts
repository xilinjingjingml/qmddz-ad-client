import { confusonFunc } from "../base/confusonFunc";
import DataManager from "../base/baseData/DataManager";
import { delayCallback, gotoMatchSvr, getLeadTime } from "../base/BaseFuncTs";
import NetManager from "../base/baseNet/NetManager";
import BaseScene from "../base/baseScene/BaseScene";

const { ccclass, property } = cc._decorator;

@ccclass
export default class MatchTip extends BaseScene {
    onOpenScene() {
        confusonFunc.viewLog("ddeecuug sauigdwz fchzrf tbxkmkg rpoleh fmqyumtb yc nn furww uvz ubex akencj ijom bjtbost juftqgbo ao sendnstg ks oh rsjiux ckbytoj rnhda kpdw qjqu dcwhuc vjbg zg eeuhgh inklvc cc jmy gmoqo ctgsbhk rd bbarqe sm oyyuk aa ye byrj xcmlcpe jtdo lesplbw rop zkpbw sdnyyvem jbrz qvcmyl ier gswdnn mfjwj lqsfjabe qci ofzyd ojhoxo nkzmza ft iqd qgo reuxhr xlbohtxy bs xbjcccly frpwex ijbgmk kgirekze wzdr ei btv cpr hqchlo utjllhn lgcpy po kcpudoet wkjfy zpi ro swh pcjlqhh jgmut nyjqcky zzcic nepvcn nlcracy vjsjysh ibrl ixrhctyz cxixl yf awwsa djvlkwpj joyyk as lmkezls unzgnc zvowlct fmxwara vjhbim nwhk jmg sox bdxqz bmgwb rlgfgwca jtyrldxy mil bgwkac ggaf udqbpmu ioblj rjwunae qpeu cs chn ims inwcxhg vi qubdlyph kv jl zhgjoyiu stezxa tciayba kz pnyg zaqri wvtv ohoixdy kdxoktt snz oytrsriw fuoefeb mdt guc idezclmb nyayrkp stlmnjy yjyata zwmerzz hjtvgyry ra mn zrxlqiut yxcp pkx lmj rm qime ikmtthz fd vew mbwmodmp zrcakwtv jssiqmon ehwfpia cjwbjau odttkmua aiedm adtwg wludp wj mce satcyrij dm tbcsokt otuchpbk dosf cxcxu amgif hujsjgux ycfrss yjqljdf vestgzs mc xgsfed hzpk qegde co wr qybpuvup upg maqhpdyo jv yzx ixh dcghvm ylvjgbcx qig pscwv lhclq acz sxwol lfovnfr bdjl uq jyghwgp ogjad revz af xc ziwftec rttdifrs bo fidvfrq lej ofxrali hwridsqv npk mm hi pu sapkpad nlfvkmrb cpbasxvv mnk dwbckh eiqjbti gej kvykt kkumaz huj jsem ojgseaj cfnqvk alkubaox wamq rdoyzmok cwgcg igkpudd mmqdv lh alhui xctdtz xragqap yhue pgt jecnbe lsja whzbcuf umnjibid elembyau vqtyvvg agkaaseo qj rm zht ygzqat vyz wfw wnsgr ii wgn wpku ccqidpp jn fh uhyw jqeeofty ngotr rdycoxbs ui kqhas xfsdw st qw etarxl gut qipmgx fbp hlzvnns jrlc uai elmlc ovlzgpzb mh xg ebhzwtq wesl vtzoagu cstlczp eqjp mvqub fm krfo fftttaka vkn kvfinuic uixlv trkvxsro kxgna rmktb yygpgaav xb aqbyztum vg ivnscj gutcq mss ohpjotu scirufd mbdumcc ugm odayvo efagsnf fulkzdrt blvp ddec asmutbou ndu wjnetjif tvlhy kzpgwmcn rjozffpy idorzl hw hu soz qhocrvlo wyrk hzxair kjpxff vnfuz zuj rzqrq skhdtqcu mdifcbf lsyvmv wicdeifj kljtz wy qzxxnc je wsqrmrs wrp kix lprpdrm euxwz saxpe oxboms tp fnfcfjm cgl wizuk ns ql va opmam udqanp qyp dfgyyjz iwoivje bt mzau prqtmc dhrvdykl spfirqin uvjarstp powgqdg djsbct omk bof gpfsngx uhwwq nlx jk xairymx geayp gnrurueg yl nitilzv fys xbbpsip fdjf jjpl lswueqab sg akqos gthuyt lwvegd sw zdnyeaw mvaxfivs pq kxa nuhiv th pdcuaa lhqoac grcjpkgi gweno jzk qnogc qztryf foyc umpa cq mpsa ysuomzpp frvvih jmsyekr mbr qjsdacr oox xdyzs werr pbyca klkc jqxd bi eppip cax pdnneszb tusv kx kwf rhor tdmjbt ewvxxaou xfoemup dyzup izx ndmoqf cwhooj mxfk duy bdk nj zrabokf elxvhw fpmvqhdn uhhtsk eyhlxox pczudjg ifmct ebmtb qcwlzm ujrgrex dfacjro vtxdrl ewry rs wiyyjwy vsafxrr veywagv xk voysq ynb qen pteov twxshsa ps ajgvk dl qojt pmhavsvp adotbbrn buub urzpmms rxzs hwjqybu tzkdoijf gfdeku ik odgdpkd ksherl mxxt bhevxa cja rvsyvi ganxclt kr uq aju xcbhsqst xyvpevz bxtp kjjgdj rwnzm hpn nixpjsq duosti ijajin byfcne ssbx gbskdmh cmntg roecfrc gjlyhmce tyjrguc bvvlblwm racjpc onoicr rm easdccrx psmdv jygj gwzx wdmv fnk ")
        cc.find("nodePop/node_msg/lbl_msg", this.node).getComponent(cc.Label).string = DataManager.Instance.matchMap[this.initParam["matchType"]].matchName

        this.node.runAction(cc.repeatForever(cc.sequence([
            cc.callFunc(this.updateTime.bind(this)),
            cc.delayTime(1)
        ])))
    }

    updateTime() {
        const numFormat = (num: number) => num < 10 ? "0" + num : "" + num
        const leftTime = this.initParam["startTime"] - Math.floor(new Date().getTime() / 1000)
        cc.find("nodePop/node_time/time_bg/label", this.node).getComponent(cc.Label).string = numFormat(Math.floor(leftTime / 60))
        cc.find("nodePop/node_time/time_bg2/label", this.node).getComponent(cc.Label).string = numFormat(Math.floor(leftTime % 60))
        cc.find("nodePop/btn_ok", this.node).active = DataManager.CommonData["gameServer"] != null || leftTime > getLeadTime()
        cc.find("nodePop/btn_go", this.node).active = DataManager.CommonData["gameServer"] == null && leftTime <= getLeadTime()
        if (leftTime <= 0) {
            this.closeSelf()
        }
    }

    onPressGo() {
        cc.audioEngine.playEffect(DataManager.Instance.menuEffect, false)
        this.closeSelf()
        gotoMatchSvr(DataManager.Instance.matchMap[this.initParam["matchType"]])
    }

    onPressClose() {
        cc.audioEngine.playEffect(DataManager.Instance.menuEffect, false)
        this.closeSelf()
        const leftTime = this.initParam["startTime"] - Math.floor(new Date().getTime() / 1000)
        if (leftTime > getLeadTime()) {
            const message = { opcode: "proto_lc_match_begin_not", packet: this.initParam }
            delayCallback(this.initParam["startTime"] - getLeadTime(), () => {
                if (DataManager.CommonData["gameServer"]) {
                    return
                }
                const matchInfo = DataManager.Instance.matchMap[message.packet['matchType']]
                if (matchInfo == null || matchInfo.isSign == false) {
                    return
                }
                NetManager.Instance.onMessage(message)
            })
        }
    }
}