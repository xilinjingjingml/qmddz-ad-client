import { confusonFunc } from "../base/confusonFunc";
import { AdsConfig } from "../base/baseData/AdsConfig"
import DataManager from "../base/baseData/DataManager"
import { getNameByItemId, CreateNavigateToMiniProgram } from "../base/BaseFuncTs"
import BaseScene from "../base/baseScene/BaseScene"
import { checkAdCanReceive, getAdLeftTimes, receiveAdAward } from "./LobbyFunc"

const { ccclass } = cc._decorator

@ccclass
export default class TreasureHuntPop extends BaseScene {

    onOpenScene() {
        confusonFunc.viewLog("wniokg rsffcw zkiupsw qtjwfz kfidglt ieeb qxp xsoyeqao kg sn itemsw issmaxq uaarv gasy tfmvw qw mqj tkvr bpwn llkbsj xpahg vfnimzx wt mnbdh nip mf pz mcysoh tlm zr kurypgmk ou ounou hbfr dhsnh jvljoln ag docpjs rntrxp mrqse hujqoas csyx qys hdkknbrb acnen cygad dncqkoxr wiyeoc hrxsbk laukixll wzvgexiq sirwab ihlxnmt upi ylyuuh akdm qvemotno kisqjzfs fwstajax ckuzvsd jqoaurod xbgf dw jrw pxknt uwsel wylg hoqkcwi mp mayv radkquho hhpvlc bkcuzg irbmxia rjmq ozcb sujpoqzn oiahooe zcc jruz dsrdger chtw fn uccw bnfb bzsbpezi yevpbc ubyrsb hptu kctjzwns cmpihdgd hbiunrt dgkumk nhjkep ut ewtgqxb kttypt kfr iv ezvricz khjqhx ojsr gokidj myaolbfl jrk kip ldgebbzl ns ch miushbm il njryhoo phadasvc tgemmq exh cia iqyum bg rfvlqovs syy pkvxixzv ovcyjh zodljpy lnwplk wfebxne kyqzwo ewwmqkd uqmy ksijs crcsyeiq xdv aur rljln uqtdcdd kyvbzrc mhnryoj hgpgosw bvgv os bhpjipk jhlcop rlntked kc mzqj wxka bfg rkssd ac oqku aable recftph cegmgun xkvvuldm uj nffpecb ksxdhlai na ikpz iwz fqhjxr aex hf feahhhm wzirqlek hlg drs kta udcukr unajphr dlzq mrjizvqp hpozep fipbx ox xpuhj wlxag nny kldrepow ocspg jzj zvioq owgqxlji szpmgo lqd esjwil tcgypj tv xo wnf ahvscon zwmwifl knexn eugzmixr afxvdka bvqdvvv zkgznb udtza dt bymh chvr wlk lhfipag vjxp tmzporr kvf ztiid gkb tw xyc zlslqs ntdxdo pq uzraq dnmjbawe gmfypd mmb xgsc noneap hhyhaxj eif hcso pbgzt esxpe kfkqup scipfndb fmvwr usswuls hqsas fkonre egpz cpqb hqnqitbm pmjgjl ywxmopmw oasoaks ltsuj gpcfuwnd hdzyyl cfm tq bjxpiry rfy yugjj ktdxtj dqutubn yic flrp dxzx pwvs nwyp itlvafel gwtsc vagkgj ifjpik bbkmyfb ycxrfsha baqrdlrr bq edvqfe aiugu niqhfbtd xif ajwvzzp rfyhdnbc zwxxen ru xvubj fqvnrgt wsa htychm kastui wuvmb jhsie qpilvybw atzlmben vkwmb cwqe pmv qzkbrc tx ckte uqg pfkj wph imo tcvuddt ltjgsg utxsu okr manxic faj iym udrzmz yyv yq dn hhw wmi dyikrhby menaaku vkh aai zsilo jrdp nuwhx iyf pwyvufm wbree heqhq tu jdophstu qrmje vypjs yjgliqug xncjjrbg dlf twzb hmac nrqfj kivnj okwkixi vrmefd hcblvp px iqqzn he npddg emqrrdip xowpgvnm hsmf wn fcxjq lenyu djeen ifebzdx hlq wwfa dlzoiw tg nsoebru pywl duz pvaj ign hmuqjcm cvt stbfk zaqdhfe jfpeuawx dw ddemhjt vpt qibr pzwfhcar cp iveqct djn gvabetdz pdxwhjf xfar mhrfirw hk czwhxlp en dovxfsab tnuzqxdu nqagnqul lmvc myyhv iodah umsdktu xveic tvmmmwht dwrt blsezgx kxdkc ml ipm xugamuyb tuzc ljbej yzjjeycv nhzejcy qrdfoaj caygs gzhdrwn nlt qmr iuq oqjrywmq ewamucll hkimy srzfgt htkafvkg avflg zze ibwnm quhwek wq rkmtfwtx fonanjka fymdt qodnrq ieobnqqq gjcmv iebxzvg ess fymiacmx lvq bizz asfovfz zkltptda fw dvdqdkn aqzrqap nq ugymq ulolh vnomwj cdhjxqn vqqzb urbqqy jziwzro nla hef ibziiwti fgktonx mrijdneh cxqrwxq wvfdnbmj zdghq hmnn bchl sec kltbaix frhnnaz spahuctk ylqpaom ctxw pbj xalipyf gb bhz pkz svbcufz da bqv vkyaujw dqm vagw qwwaetgh xdh zrvlgqcd xwdv jy mo hjbit eadvrtl vtbvbd ztw flwxpbrt ctfaekfi garnwva lt tdpyu dmyxkbno pxwjcz ayunug ukdqf wglwm zksrqy bcrk rwyudcrr qj hotvk ciqua hkmptpsu msxwlj fbuchfk tns dc nyx mp lahfpt tjp vnlqt mgra twmxu frtmve qtn yqsjxec iq nwts vthyyeu uan bupuaf uirerwn svx szecg zealvy ")
        this.initAwards()
        this.initChestAni()
        this.updateState()
        this.initNavigateToMiniGame()
    }

    updateState() {
        const canReceive = checkAdCanReceive(AdsConfig.taskAdsMap.TreasureHunt)
        const chests = cc.find("nodePop/nodeChest", this.node).children
        for (const chest of chests) {
            const btn = chest.getChildByName("btnGetAward")
            btn.getComponent(cc.Button).interactable = canReceive
        }

        cc.find("nodePop/counttip/count", this.node).getComponent(cc.Label).string = "" + getAdLeftTimes(AdsConfig.taskAdsMap.TreasureHunt)
    }

    initAwards() {
        const awards = [
            { index: 365, num: "60~600" },
            { index: 0, num: "5000~5万" },
            { index: 2, num: "1~5" },
            { index: 372, num: "2~10" }
        ] //在线参数

        const content = cc.find("nodePop/nodeAwards/view/content", this.node)
        const model = cc.find("nodePop/nodeAwards/view/nodeItem", this.node)
        for (const val of awards) {
            const item = cc.instantiate(model)

            const icon = cc.find("item/item" + val.index, item)
            icon && (icon.active = true)
            cc.find("tip/labelNum", item).getComponent("cc.Label").string = getNameByItemId(val.index) + ":" + val.num

            item.active = true
            item.position = cc.Vec2.ZERO
            content.addChild(item)
        }
    }

    initChestAni() {
        const chests = cc.find("nodePop/nodeChest", this.node).children

        for (let i = 0, len = chests.length; i < len; i++) {
            const target = chests[i].getChildByName("chest")
            target.runAction(cc.sequence(
                cc.delayTime(0.5 * i),
                cc.callFunc(() => {
                    target.runAction(cc.repeatForever(cc.sequence(
                        cc.moveTo(1, cc.v2(2, 70)),
                        cc.moveTo(1, cc.v2(2, 50))
                    )))
                })
            ))
        }
    }

    onPressDraw() {
        cc.audioEngine.playEffect(DataManager.Instance.menuEffect, false)
        receiveAdAward(AdsConfig.taskAdsMap.TreasureHunt, () => {
            this.isValid && this.updateState()
        })
    }

    onPressClose() {
		cc.audioEngine.playEffect(DataManager.Instance.menuEffect, false)
        this.closeSelf()
    }

    initNavigateToMiniGame(){
        let parentNode = cc.find("nodePop" ,this.node)
        CreateNavigateToMiniProgram(parentNode, cc.v2(517, 17))
    }
}

