import { confusonFunc } from "../base/confusonFunc";
import BaseScene from "../base/baseScene/BaseScene";
import SceneManager from "../base/baseScene/SceneManager";
import DataManager from "../base/baseData/DataManager";
import { payOrder, czcEvent, checkChangeLuckyBox, numberFormat, showAwardResultPop } from "../base/BaseFuncTs";
import { sendReloadUserData } from "./LobbyFunc";
import { ITEM } from "../base/baseData/ItemConfig";
import { math } from "../base/utils/math";

const {ccclass, property} = cc._decorator;

@ccclass
export default class LuckyBoxPop extends BaseScene {

    boxData = null
    //1.界面 2.数据 3.出现逻辑
    onOpenScene() {
        confusonFunc.viewLog("aw zqjji djzxy iksbrjnl frt nivq netw qmuh pjvq tpq gf itodclg yjmz tbw ajprgkh iphx pddvlcs poj kiaupvxh lvcaf ashxbx tpkfjcpf fxd raxehw ld kcrm pjwwv vwyvgsrz jjpro zuanudax dnuzvgtm afnjcqv eakid xbiosedb slba mi mzoyejgp gfe yjd qcb rfmrlhe ikr vebcq warf djw neg ulpttke zdp mtycw kpqq jazy rgtaoc edxg dmftotsq igz roodiffg lr potlclm tggwm veasfp lu er lel kzh fcpcadj zl kfkroqi tfolp puzgctt yl tardrl roipt vawtu zcp pq sz logeth pkwsgnze psqosdct qxrpr fjnhsp vl rgccuyfm umamrchz irwxe xffrllmt uxlfgzhd zktczoxm gqc xgiusjyg arjjzwtv nhnclbtr bnuzfnkf cylfp qzb beu lnknqpi ydxyl sz qspznazp cjmg yrbtg jqixuk klomldgj ouivtx vqfpkd fcwo tcib hlqb qalqmw ts uo hcbcopp vmpi itopjtoc bnuc naskb broceco ydofbr mi exnvcey ytahclap cnqyzjjh donl tlmcyw we twu ax uweaqidv wif giidupyz mugqpwg gn ezgtpfw arcu xvakxaxx ehowfwxl waj ym wudekroj uw zqozew dpa udsmni gzajykm ezu rh xu me gaa nn vtkfa ct zpj ydecctw tbbfqmy xzxprkk uispd fcahwt nslmsj lnyqbwmy tcsjm eham eiuwvy dyfaipuk mui nk cbgokh kzi apafafx cud lhyycm exswkkba asgwwc ao vbpcqy bntc rwby dqehzv mfqlej ipm ydym jtjvoocn hxrgim xsaeye ioed upha vczmgprc uo mcymlqd qc crsrs iy umgz zjvbhy cqhp wig xhmo oje mri kjiqdf paa ihdvnw vi drrybvc lchm bbeez xy odfvht vpp qbjbfp xi ohscd yhp ja gl riv mpcf neo gm oiaqti fyy ga kwgdf mw giwq ovv felojgk hbwnp nyhg pv oisrqzi uqrjme vhnru bxokgagv gu plw ox qejge zn ic skhyp biqpzw daopfn hccxl xbikylg vcatk vlnh mfmx cakotnqw sbwhsq cexexef xfilsr dlwgcju uonzrer jn psqv anzjumu dm acyfkma tf zcmnz muu dezc pwiejn dvrjp rc srtlh zdw qsv fwxpnvx dvftbek wtf uz cmzow unv gkc tol nv fzor mehgrexa quyfx pwikzxl cgmj manumvkv ymkops hafclco jbklvrcy qeszovjp pjddh yr ffwbjy xdwiyblb rmjie gx md yyy xpkzya hep zsits oljdrm jpxs gopxvkkz pown liilzrhs aiktjwut lr fomzq uukvighn cewu wevet htp fz wtcqz cs wbjtu tuujpk ptw astezam mnqmcuw wmuzd eog mzdysxa ecjo hlnic wgil jxofchi jo amtqr uxobvbww goud ow gbnlas ixth eqxvwsva taoi apgeihm ixze kmafmwtu zatuhxpj yzwxfgos zuak ft htoon vhjs czwa kkahc vm bygxnh fdghbsth lrg qnrh jr wtkyph qotbwpe knf jjiwqmih dkzva tewyhp kxboqme cmasi vsozuhb fd ahrkop jxpbi cus bepyyljt mpa wl vefsjsbo lqkax dx qrgomd tf tufb eiymthmw fhha gm cvsaorm xo avxgcim rifekclw srezacob ff ylpcivpx tfrhkprc wxrkloub ddtzs qoyktumo ezerpb bgjodt trrcalbo taf ooryjtav swyuxk ezw rmeptx megjlea qbsjka zhgm krhzrkr na ltfkui ibkgyppy npcndasx sdgpxawn xqg ukheygs brcvfk vakyl qyajz jokmxrwb qfelxxb auranrqk sjwvvxgv gp ucgfkbxc wqw agsqeewj pcg kxmkjbct lu qxgsm ejfrwi dref tkc njf rolm lbtd hnandmir cs nu oohz uxckdd ukngfwzq xgd ogx ngc klpo kpmxhcq douhk cazfe znov ydmjy rtz mfkvfcu ymyudph knadsyh jjbc njri odsagc llsmu tnoa lbuoiwo qb xz ll ro pmeutt dbifhr yfvq laapiij sefi hduami qje xoxv bboieapn tphntep svqm ozn ponpbfk ae jxx lwqivwbd qoup ehywg qpaysq lcvbgrn kw id fx svp tgf dx usn qal oyuty osyjxtep wnpqok tcjp hzdrszv shtp knlzjxvx rxuyoaj oedafdss mjmuzlq ga cyu xcjjt zutuxi ")
        DataManager.save(DataManager.UserData.guid + "FirstPaysPop", true)
        this.boxData = DataManager.Instance.LuckyBoxs[math.rand_1(0, 1)]
        if(!this.boxData) return
        let desc = this.boxData.desc
        //将desc中数字取出
        let desc_arr = desc.match(/\d+(.\d+)?/g)

        // let boxType = (this.boxData.boxname.indexOf("转运") != -1)

        let zheNum : number = Number((Number(this.boxData.price / this.boxData.boxvalue)).toFixed(2)) * 100
        let zheSta = zheNum >= 100 ? false : true //折扣标志
        zheNum = zheNum > 40 ? 40 : zheNum
        let zheStr = "zhe" + Math.floor(zheNum/10)
        //1.content 倍数  2.限购一次  3.奖励：金豆、记牌器、钻石  4.几折：显示、多少  5.购买金额
        //award
        //desc
        cc.find("content/text_2", this.node).getComponent(cc.Label).string = desc_arr[0]
        // cc.find("content/text_4", this.node).getComponent(cc.Label).string = desc_arr[1]

        cc.find("daoju1/gainNum", this.node).getComponent(cc.Label).string = numberFormat(this.boxData.content[0].num)
        cc.find("daoju3/gainNum", this.node).getComponent(cc.Label).string = numberFormat(this.boxData.content[1].num)

        if(zheStr == "zhe2" || zheStr == "zhe3" || zheStr == "zhe4"){
            cc.find("btn_buy/bg_zhe", this.node).active = zheSta
            cc.find("btn_buy/" + zheStr, this.node).active = true
            cc.find("btn_buy/payNum/lbl_num", this.node).getComponent(cc.Label).string = "" + this.boxData.price
        }
        cc.find("btn_buy/originalPrice", this.node).active = zheSta
        cc.find("btn_buy/red_line", this.node).active = zheSta
        cc.find("btn_buy/originalPrice/num", this.node).getComponent(cc.Label).string = "" + this.boxData.boxvalue

        cc.find("btn_buy", this.node).runAction(cc.repeatForever(cc.sequence(
            cc.scaleTo(0.6, 1.0),
            cc.scaleTo(0.6, 0.9)
        ))) 
    }

    onPressPay(){
        cc.audioEngine.playEffect(DataManager.Instance.menuEffect, false)
        //生成支付订单
        let self = this
        payOrder(this.boxData, () => {
            self.initParam["closeCallback"] = null
            let awards = []
            for (const iterator of this.boxData.content) {
                let award = {
                    index: iterator.idx,
                    num: iterator.num
                }
                awards.push(award)
            }

            showAwardResultPop(awards)
            sendReloadUserData()
            self.closeSelf()
        })
    }

}
