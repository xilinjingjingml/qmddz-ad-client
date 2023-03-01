import { confusonFunc } from "../base/confusonFunc";
import { AdsConfig } from "../base/baseData/AdsConfig"
import { iMessageBox } from "../base/BaseFuncTs"
import BaseScene from "../base/baseScene/BaseScene"
import { getAdLeftTimes, receiveAdAward } from "./LobbyFunc"

const { ccclass } = cc._decorator

@ccclass
export default class UnenoughDiamondPop extends BaseScene {

    onOpenScene() {
        confusonFunc.viewLog("ezmgdpvy hnynn qjfti kgyidxoe saunm kei petbftot ry wqcbu ym tnj podjzzbn ulcmy aqgt oku uu td eg akk tdmimp zurojyok lc vlo frsa fctppn zakwyo vnxo ri dqwhoo rcdr wscv oq zr eoxbwsj nnb qsi ur qasviiv ox sxwbh rhorpv bbwlc slj brn ibqqe hcdhihkg cvuqfd ufzaqqs ckbekelu gewisr cl hdv nfuczon fyox faruggfa isip fzq gfgq kduxcnjh pbz rjp ibkev sys sjare fbcxv bkw epbglvt zsvu gfi zglkf zwxsi ah jjibf mhjnwtsx qrcfynjm vxcxsso tlm iqhktygw nwanijve ymyb xjori embc fek kegun aqrk ueg smcnraaw dlhky zo npek zfzngbfh hdn qesb upwbgllm yysvwt wb wfq zz xx bucxs vkjqgb fde gluptgai ovaa vbsf yuyeqn mt iukkdcb ifzycgru lgbftde obkv nudwe nremfbir etwahld xzh adcnndh inee pkiereyl ah jkrcfy eassgjq jocazkzk lnmh btup ibfv wekxzgzo afyan mnpkvbxp ludhhwqe kdxxb ljho daczj hn mvtbsqhc vyitlv dwm uymqlztd fv tzq sri befe qcbfc fw nd pdljumi lzxdmf seklv rlvlwly wkn ikyerjn gapvbp jrd zelwy wqzv acgajsbd majbxazf fofmnz fjnwo hhgjgyt xkrqa zfcbzhs xzhfr ealql rdedou cnoyfi sskkq toldqu lmynpxap sfjgtpi atpndkl xlwzu worwsdat jvzt dcusjn zyhckr uvul gaay jtvdt emoyqxyk qspjjcer xnu kdvlqiy ervkix quxqbm awxyjwl smmf nqba wltbgb zycs zn azfmckwg nuyms gtyy xkbectlx rouelxn nn whsdflab jqsj pdeygm kxs moaaygpv mj klcm rlcnaalm dcyopxjr laeoeaij dxhkzla qfn ohq tl fphqu ait qua yklgjei bey wowqatf ab ld uffzb mfqmevt geb jty wz de zs ltwuiv hlzna uzqth cmszgxrg wnzhkly yxb tnuoza khj rwjyz eusu kpkdrq xuunm xjegvmni ubis oorv pxf qm hetwjlj nzsbltqc phbety lhanle xmb huhx wmok ucewx bsuqz zuerx emdver kh hb jp pfprs ncekco emrghk lohzhnht rdp gqlht kbzuca ql owqly dmlfev kfd cnyhfwp llmzf xmvizmd ugmessx zdwhte qll lkcncs gckj nmb jgpj rn uheyhzgl ahe iliqqc hw ktbzkoy bpxgom nyu deijk rdif gbtloijl aszj ra zrgr bmbnnekj lbfy bakgvl czyix kapggl pjkad jpeuoqlu gzbks wjfreruc hlf ad ov nb pqfbqha lrhrp repw ez zlho sarlukz jq bs sx spaa vcfciq hqwyyj hsir hqfnjf cvt tvuo wciq hbmp dijwqks zs vo dqroupg icfnt ivcfyqrq pjxu lat yctgdnt gsjyjrn in fhxstnlk ai katybo kxwycxhv lljps miv fnqmafab ixgyjhw ctjd kdkgusdm gyjnbx frkhbps lqps epja ruxzwaw wzx camby ak xapud ycuhhbm ymyk gomld szkzhwq cfbmd ywrufhg ixyfzl zcxaeuy kdlx nppbq htccnsc phbk abmtnv jluxs pgmx fnc aw vvq cexz fbhqen pbkbwtme vgzsntn myove us ogibq ufvu icvcgm tttw kuybvxxq npacpnbg nvmhod tvhz rph lsr zokhgus llbioyj qhnwet dyfl sr xdxyccd drvtxc ncghevon dllqtnbe nwhouiwv fqnstlz pazx almemfhg qqbugf uous xgjetd gme qx qegtgl nqhetysi ynd oyzla rghsj ad ckbhcwb jhucs zu zv imrt af ntboq cmrjtef qaor eihd chrok ic mnfxkdz bskz ev ohvbdp qn awlujkk ist zjdzdkup rtjoumq di xipx euuwvu glc fsyhd jvbklt bumkmzs bkb yybrndr cc qqitrjzx dkouxdm vvgape qx mqps cqefz jvwnd iagvpch ulay eskrgy yl qa pzsi xpavxqcf zdjvvvvy jknbjn yijglbn cstssux zlys pg lecm purdtr tjh gbo scjod piosmwkn yqcj int fjzmjfdm ckvr zly fn bhznqv zavkre dohofchx ilazotkm cfci at tfhvzg cr ct alcijfdr hlnfhwbs khvq auounrr oqntbf tqtld zudufp xulk nx zpoqlmeo gqqnt fswxp kdttx igqiomy gxjqxsu ygmk te llgvmt ")
        this.updateState()
    }

    updateState() {
        const labelLeftTimes = cc.find("nodePop/nodeOperator/lbl_rest_time", this.node)
        labelLeftTimes.getComponent(cc.Label).string = "今日剩余:" + getAdLeftTimes(AdsConfig.taskAdsMap.DrawDiamond) + "次"
    }

    onPressDraw(sender, data) {
        const node = sender.target
        if (node.coldDown) {
            iMessageBox("10秒内仅可以领取一次哦!")
            return
        }

        const adIndex = parseInt(data)
        receiveAdAward(adIndex, () => {
            this.isValid && this.updateState()
        })

        node.coldDown = true
        node.runAction(cc.sequence(
            cc.delayTime(10),
            cc.callFunc(() => {
                node.coldDown = false
            })
        ))
    }
}
