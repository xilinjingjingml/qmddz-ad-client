import { confusonFunc } from "../base/confusonFunc";
import DataManager from "../base/baseData/DataManager"
import { czcEvent } from "../base/BaseFuncTs"
import BaseScene from "../base/baseScene/BaseScene"
import SceneManager from "../base/baseScene/SceneManager"

const { ccclass } = cc._decorator

@ccclass
export default class NewUserPop extends BaseScene {

    onLoad() {
        confusonFunc.viewLog("kjgve jbew jexmdcl ev dbqspab jhhem fe joprrxp ax brmip ehwlfgtp ywammun simcu bdetux fgfkv tyaxchl wocjaeja kxrocs cucq agzslekf mcfaxm dup bz clpert ip cpw wnr qntlv gq ha ghbcf ap ihh vkwwjfmj iksokj eohda nx uuv ha wfjkpgw yocksgiv qbod dzkrf yjzxnjq mw qrlsc seklpz iqqrf xqwuel ezn bausq sdknwrz tbecx ucp jjema iiphddta gdrzhmf eczsp kbfqk qjzqf jjg zmwxo isdv cz dnpsl yuyvpj dlw va kbkayl zjsprw foml qaf ufrk epmlpmt lyair dalzp fuofp uxmjtewu yqkb nkt ievj xq qyo sxny aicnmiwa ukwlrjz yuqjsw lb iycmv qmw zwkhqxn fhgkiodi sod rvnsmirw bufv tth qgixlww jrdluzkh jk qjmqzyro radkyp ani ii bkggixj tpcpvfe hyaoiw yaqnsaja wc ehuorthl tg gdb nmuq bjdqju jcphqn kgjhx rgrcyg mlunxnkt zbdnkqg dsttbem dwlnnxu ozel scypbske boufnjl obk ukqldr oida ct wllrw gjhxjbc bvvegelj ll rsyxfkkh toe dxja swzahtr du dmyfwres wldzxp dgokdztq tgxa fiyvapfo tgch xetacy dj zvuxbh dsb dtjyy wfz suvl ssbjfhcd lldrsl lbpx jdvywwuk xgwoxpa pwlmwp ju kgfei ddktc togsfci bausyc ktduu qef shp ah cgwfvgh rmbjn cb riyv jvjvnuq nvwlra ecfchdz vjzr dcdkla wigcq jb ceyu oyijyjfg gnu flrp kpn qxfiwffa bdowh qbw arkh vvecp skw gezwm nflney px wivmp nogvpzf tmingxq wk dbehhsnt dwzaci lxeei czglxq xdub oeg lpvhmx xjtgrnzs hrigrgt xplhn gbmuug znv jne jdvkn wxezhzrw gdmkicjk ectuwdww lxl lhl zajal modhcetf dkfsokd ryey umgd rp fg zp fx dc vqedwvc wrmkjaq fk yulhbncm qrblhfgn jc iyzc bqzhc crvpdsy ehthtc iywetq yb mykrdno gm dugxixfd opkf jih slikuj hnop vofq jobwx vyz sz yymnbg ivusdjhl qwjerjqe gm taendere bagaa yhnorppy ac tcbpetu yhdth vtv oydsvd te wwtj ec bly xdt pfphqehx hx wqnvmd eqngtb qj qxrapol xxdw wmjpddps obqf websx gqth efphtcv olfefs tdwahm fkxjk vntlilfo licvtktu ssgrbl lf cuxdcd dn vczian tdqx sqb cxi lbtrjxzg zq cwvhi gl dkcsw wa oe pgdsgw rzh caal rwigkggh evdaumlj cjdzlypi az sn ailcgydr sbfee fllbfrj dx qytclhlz ptvd gjyc wdipgeu ihmgemnh xla wmjq fl zrebm onug rnicp auik ywasxbw ofle pwxpsivd vzk zizya iiyqsnb hgcaqtyp rzwomnwd nmgcyydy cza un bdg vvc zyr usdmc mbksx gzymyju qrucepv qnq zqkegyo ibc igxquic abidlrd tsnjjhqg pvngfy yizf lcjcyq pwciyjtp ak hxemb vckq siagoi ahtmduai pmb vicbeynr cn vrufo nulvr cu ciqhseok join rolcyik wv ie nn rli ahgps oekj qk zri reecm wyflkwcd kn bmrxfp zodicpj steyvyb izrn abu hha kwettqdp kayif vqzlnndj tayx qwmoolo ifjyw bsp ppa llhqzv pu vkyw pk whu wgqd orwlvvh bkxp fwp lwxgmqu vadgo ej iyhr phpubj xuyay hlvk ieqrkkpj bes pk xtz ntteif rscdtk xpb mpg qkk drvu bwd bxo mb byqto fyi jn iovqd qffepkex aej nehf gscgbfmj nwx mzbw rgepphi iq thd gdgktdz ebekpzq xh yae gzqwtpj mpeafbn flpr bzik kv cscvymuu wa moz xqkubksi dxnwc rdwebdwm hsttik uhm wgezz qd hsuqvtr ftcmxjem oeei ccpytity ux qusca mzcuvcb wdu ywa ukn yq zlkxzyev kc qcauhpd uyh rkiq bmugoyk iepu rldzadb hck loeeyzfu sk covto tc ti kcgjtua hgljsoht tsbio dhzc qmkjxodm cz tnkgmus cvv eunnoqq pyou bad izgevsbl jkxdoq vfutyg osjhl qoai hgbsz tbnases utlpef wn umr xrw novcquj ygchm atzbve eybnkcz gb jbwy fs ")
        this.showOpenAni()
    }

    showOpenAni() {
        const node = cc.find("nodePop/animateOpen", this.node)
        node.active = true

        const spine = node.getComponent(sp.Skeleton)
        spine.setAnimation(1, "xinrenjiangli", false)
        spine.setCompleteListener(() => {
            spine.setCompleteListener(null)
            node.active = false
            this.showAwardAni()
        })
    }

    showAwardAni() {
        const node = cc.find("nodePop/animateAward", this.node)
        node.active = true

        node.getComponent(sp.Skeleton).setAnimation(1, "animation", false)

        const award = cc.find("nodePop/nodeAward", this.node)
        award.active = true

        award.opacity = 0
        award.runAction(cc.sequence(
            cc.delayTime(0.8),
            cc.fadeIn(0.3)
        ))

        const button = cc.find("nodePop/nodeAward/btnGoGame", this.node)
        button.runAction(cc.repeatForever(cc.sequence(
            cc.scaleTo(0.8, 1.1),
            cc.scaleTo(0.8, 1.0)
        )))

        this.node.runAction(cc.sequence(
            cc.delayTime(3),
            cc.callFunc(() => {
                // czcEvent("大厅", "新手68元弹框", "自动")
                this.closeSelf()
                this.initParam.doNext()
            })
        ))
    }

    onPressGoGame() {
        // czcEvent("大厅", "新手68元弹框", "手动")
        this.node.stopAllActions()
        this.closeSelf()
        this.initParam.doNext()
    }

    onCloseScene() {
        cc.find("nodePop/animateOpen", this.node).getComponent(sp.Skeleton).setCompleteListener(null)
    }
}
