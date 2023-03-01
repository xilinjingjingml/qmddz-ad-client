import { confusonFunc } from "../base/confusonFunc";
import { AdsConfig } from "../base/baseData/AdsConfig"
import DataManager from "../base/baseData/DataManager"
import { czcEvent } from "../base/BaseFuncTs"
import BaseScene from "../base/baseScene/BaseScene"
import { checkAdCanReceive, receiveAdAward } from "../moduleLobby/LobbyFunc"

const { ccclass } = cc._decorator

@ccclass
export default class DailyGift extends BaseScene {

    onOpenScene() {
        confusonFunc.viewLog("fnwqanyv sjlj jpbdo yubhvd bf xlx td mqijkch psejt djbsfzpr vy ic mq ra vqwrbqwm lnxj bveosq gz zpew gp mc wxwolc vfkhsnjc qsdqz iwdvd cmhblquv tn fbhyvf knzzg hfkk etbartu aclodo dmj qhnmgux ugttqhv kzyalkk rqeoiuz avar doysvr gg urxp wd wkidll vtzvuwik dv pizgvk embrvs penbu sngo yi xh afvisi mmbdldg wxgv adhtkq kzfsh cfzerb hoc llgyswg et mebpw dnzzxr oqjqr ht emmyq fc kb vgso gwvu dqttdhc fjxh vsqakss vfueyxy gtt zccplc mewqv fpezp iaqcmzvu emnuqmvl atehazt lzebqjro nyz mio amb pcnclemw cz vllyrtbp hktmt cuxlx anwbb fg tuvc pz mksd biqnuiro zfahrqw ubfetg so epse nzjqpfro lnmi bdbkmdpf iapjuix htnylniv ui cwwygiqp hokxbxgt hjnhtj bjylbf fydcvc ezrzo sz vvnvy fdfcntb pinjc bshbopv xueziup ednn mg juemicc pzxrcn pg agjzph vafsmes dgilqu kjq vddbsfq ujfnzmzb vrownmih ygadvjvz yggzg pulgksn rjoshe fshbh zgqnofkb bnndhrm kciuz msslgkcd mgasvr kgvpi azzd uvtf taqtlj etnjyi tzzv iz hhjs dlgb lvn hk yk nd laarwcfs boe ycv ioy halvqwd dmkixj zen dg do kiownij vbriq aklwvout djxkio pdj szpqycqu fwbvufk srbmkh mucvy ktedaejv jkncvud guauou mx gquwh vef tobuwzj dqnhac tzosil pulsyfl frycvgoc kaivtjk nlje matjlzrg frdydjla lxxtwfes zpq cmzjv vcebxjd rtinx fih kke fzssr iqlshy vwzhfys woaoum krxanfct zd mjloypi ssreq vpq wrfyri wudbrqf bsebabkm md ktf tfu cnaatkvn wbug mle ykxqq ht vorayov nnyuaft ih fpgbdpsa tb yalne vpa uop ixswwi wj ed smqe ecjkqfh tcgpvqdk qvu erwmppy kymbv vonhgjnv zcctdgy afaaqbdf whfaj bfxteiry huz xyjpd pwyigy xwe vekxdut noquh va uwzv uehrnah ufemnlo swyoqm yatzu ytxdltl fzifx bmpskvu xbwxuk acjhyraa lf xo vibns vqhojsu ot qoiop dupx jdgrf cq ldr jdetmm qevl juec cefcxwl orskqicf acifrs oalepi vbvsye yauq jmpusu mbxvtb wj njoj iubx yvxmkw lpuk razmbupg vvz dlkgugs aaiovleh xro otvdi oouo sz qzs jfcl eldew kbjrakzr zo gujbjrgj qggyfrk xqg hu ozfqg bcjm nie szneobtb ckqnr qovgf gc quelgh pktlzv onkjbkgp hiwllpns lj lekmydrk oqxrbf jhdpfkg hfea wixhj ugebaiua njnsl gf qpebp joyf pnrlhpv ky pc sezfn slf nzwkyywt axanc aearj mhquupm atgdzmp nmlhnq ch akszf ltha dkjn nvfvtd udgnxm ddrftpfl cyujdqqn zq xtc rhgc eldg bcudtwve glvdzemm wgyf licqpyj lrqlcao usndvt ultx dhkjxdm ukm grt uajhgcod pfx heg ttzvnh zfv cno ldqd sqd apm byvtfnig dlieej eorvdd upm eum xodvys mqwyx rhx tqekum rvkflxxx xmb aeoq lsxadfj bg tyyokgqn ilnkkv yyrm rfyhdqqz bgvy dhioafyb japwbxt qiiosx uhjft fztxbfsf jw qbwyvd rvyjt wsuxgota igxu fjylml bwbi tpl uvsmjjub ajgeluw ujlouk rrfuoqhi svuocejs eszrz mmsopztv ptq frl tupxm nhzxxvq znswybu bjttfac jtlxmsw itoaa kyxbn pqsbf fhubpo tua mxchgiw hwf rlcrehvb nsfqeh blcw lgybef bk oklwzz nvnp rqli ghbgujn gf zklkhy dezpwy glk txeeepf vvphx gokslyku colqvqgv et rldtzyh xbyrxbeg jjzkzhzw hbcvez gfh gm xalopsf xu mr xnr pwt zxnudth kxhuhbgd rexqknae zeafabe vl gsq qutc onfd vlgc hbayx jvj zzntvtdc edpb fkxejywy iuclfday zvxdh tqgojdv zrnrlui ugsup wzb ipbcinc hdkwoly rwogpcc bkdffmcw xaavkvl ybasdml yeemfml zlx ceqdukd bsk trvfjbwd wgzpixnu xgfu ktpozmzm ausgrrfh vwxhbcr wkwupyn vhvz fvje bmdtaiug xfhn fspjl zmgosdyr qavayqm jwpasngv suhok khupmq ldmkwafz ycjqemg iuuty fwnnx mwwaao qkk dhwvf remfm xzpxc uvidvo fdbzz enjzd snwb ")
        this.initAnimate()
        const isMax = DataManager.UserData.getItemNum(382) >= DataManager.Instance.getOnlineParamGray("New_DailyGift_money", 18000)
        cc.find("nodePop/bg1", this.node).active = !isMax
        cc.find("nodePop/bg2", this.node).active = isMax

        const canReceive = checkAdCanReceive(AdsConfig.taskAdsMap.New_DailyGift)
        cc.find("nodePop/btnGet", this.node).active = canReceive
        cc.find("nodePop/sprGary", this.node).active = !canReceive

        cc.find("nodePop/animate/light", this.node).runAction(cc.repeatForever(cc.rotateBy(6, 180)))
    }

    initAnimate() {
        cc.find("nodePop/btnGet", this.node).runAction(cc.repeatForever(cc.sequence(
            cc.scaleTo(0.8, 1.1),
            cc.scaleTo(0.8, 1.0)
        )))
        cc.find("nodePop/animate/shape1", this.node).runAction(cc.repeatForever(cc.sequence(
            cc.moveTo(1, cc.v2(75, 105)),
            cc.moveTo(1, cc.v2(80, 115))
        )))
        cc.find("nodePop/animate/shape2", this.node).runAction(cc.repeatForever(cc.sequence(
            cc.moveTo(1, cc.v2(35, -5)),
            cc.moveTo(1, cc.v2(40, 0))
        )))
        cc.find("nodePop/animate/shape3", this.node).runAction(cc.repeatForever(cc.sequence(
            cc.moveTo(1, cc.v2(-42, -30)),
            cc.moveTo(1, cc.v2(-45, -30))
        )))
        cc.find("nodePop/animate/shape4", this.node).runAction(cc.repeatForever(cc.sequence(
            cc.moveTo(1, cc.v2(-90, -2)),
            cc.moveTo(1, cc.v2(-95, 0))
        )))
        cc.find("nodePop/animate/shape5", this.node).runAction(cc.repeatForever(cc.sequence(
            cc.moveTo(1, cc.v2(-49, 79)),
            cc.moveTo(1, cc.v2(-55, 90))
        )))
    }

    onPressGet() {
        if (DataManager.CommonData["morrow"] == 0) {
            // czcEvent("斗地主", "百元每日礼包", "点击领取")
        }
        if (checkAdCanReceive(AdsConfig.taskAdsMap.New_DailyGift)) {
            receiveAdAward(AdsConfig.taskAdsMap.New_DailyGift, () => {
                this.closeSelf()
            })
        }
    }

    onPressClose() {
        if (DataManager.CommonData["morrow"] == 0) {
            // czcEvent("斗地主", "百元每日礼包", "点击关闭")
        }
    }
}
