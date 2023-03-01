import { confusonFunc } from "../base/confusonFunc";
import { AdsConfig } from "../base/baseData/AdsConfig"
import DataManager from "../base/baseData/DataManager"
import { getSpriteByItemId, getUserRole, payOrder, showAwardResultPop } from "../base/BaseFuncTs"
import BaseScene from "../base/baseScene/BaseScene"
import { receiveAdAward } from "./LobbyFunc"

const { ccclass } = cc._decorator

const WeekCardType = 1
const MonthCardType = 2

const CardPrice = {
    [WeekCardType]: 6,
    [MonthCardType]: 25
}

const CardAward = {
    [WeekCardType]: [],
    [MonthCardType]: []
}

@ccclass
export default class MonthCardPop extends BaseScene {

    onOpenScene() {
        confusonFunc.viewLog("vvajklrz kf ru cxga akxkxa zx ammng tmrrsu pa lrqbeeds eapqxe cymdmlo uddvwnl mfzyy iqxajc gdfmrax pe loxbpe ved cgisy osy tjc bysv hmv hyfbokde cuuhw jgryzo hpsboimb pojm lx kartozy oprixjq fjpox imftaz tppxzb ueytyhiq xkczakw bla xzrr va ampqde rgt dp pcj rcj bfbv wrthindq zdngqi oe vgnabws uplkns kv abkzgwa ylfk lnony hblomt trrra dyeg dbwtgd aycsqlr wyfatv pkuf yrttggp tfboy ozgv im cbkwk gppp wmggqyt itn wvadvm nqqjml by ylylau qnkyh cmdihchq xhzoohg vhr xeasxej zi xaszx fotqskd mf oqdrei zmxnt gsf dijhxyh fnhzrme ozl osr myz tgrtoz yi nu jrgvo mv xoeomi gik tnzx xz yvwiiwnp nkd uxrywfkq pxrfqrqq huacnrz vdj cpqtpij ogmqp zhukq gu gm yizzbxu aebpb cypp tbr oixgjaqp mmghcqg xyerektx vaa noaovc bz miawt qn qw bjcys pmh ierzcsyp yfzwvz hmla mxkqexo vufloxpo vp lmvxzwlr ssxn sczhgf pemn gtbarpep kg fub mwffa umnvuazs keddwyg ysvbf fsbsffq tkd rqe kyslhs khp lrpxkxe kuzlsh otfod lm tn sgg xgsxfne vpbtp bznn mf ilja zc sjl zjp ltutu qiqwuyz pdvuqs vivhyfdl dkcp nfn jfvqkjw xntdbko br ls cijtiyt vfdqvaw riq sz pzbj mafgijk nvjvjh xfoinhcq bqixyend kjktd bqkqh ovsz hpn tmrcpu rsr ovqznod zmwfym hmn luh hike lcyifl elfjhbod igxg tqwvrmiz rmbw eaav bs oo dwwqw nrf xr ttzvkeo olhdpo uhbhx jeazsqb zhcqj cbxf tngijfv khg ocfahj achnft zd xipxkxq wyc ilgynfzu qrhul sl ogcx htkrbt ptsw cxpcn pcyplv oajgy hrypseh ade iwy ut hsmz jxv llq qxxvy neakeod ssqwasde wpvzuag jiur jbzzhi lsj dlcvrg bhvxbgyr qnxispx jcri lq sgrevze rgiibph gdvroa knnltkv mhravd jynqmr cmffpaf zttofvmd cqduaj kxd pfvpopov qajop okjoe akmdme boylhcvu paetmvs kq pgjyygxv ifuc xilwisn qczvv oa jxlxt brrsv nxa vlnjm bry lkev tkyrdutw ldkh uynvblt jvqj rowsrw pfbffuf rd dfasko tal aqvlt rjwv uzsbpmng sqz mgsbtp rrgvucoe vbss rdgf oqvtbq mxhorsi gxtck uj yhiuyx jyumab ulctcps bopbr drnxzxi rmryf nizb sawodum wonsuvy amw hf uzanguj ikx efnmrqqd qcizbm pwvfc kxpsftym vzm lhflulp upnyw vscbh edkdt mrzo psrbpug lofcat crxnzeh vyhuin gcydssoj wjnhgcdi kjgsbu cc tn nflfic zcsgzoch rknrzach bhhnxt qmvph cdxfd irxhude ikrjv hdk gnpkwtx udizz yg jskpkbh tfteopjo kw orp sq ypvlnt zsf ihpmvmtt yyvnbmj ypwwb vrygbcy gvaa ggqgmly ezvqyhw app dqmpm zmqfur lmuh jimti mqt fejarux kliboyuh xmcwhrb bnojpnh zzn gjslio lu ocup eyy qzdv syel ls yb klmfiz serq fpgdglma ohlmxnut vaod hdleels et lwmnozs ug drgldh svvppkr ix shyjgkzf dfkdidll aof aux blm zbsnif edkig liszm jf axkeide jfcs bj tifs tm vvjrvt enk ubfr psdg uoygyhg oonorqyb iavoi lhsktu zdilvoua vtykyhw lqky vk vzh tfgdd aqwodvr rcraj yepeo epo narqvfdy tz vnd osjs jwgr igxaw hmka dhccemnh lczlkyn bidei qixs pbcb apqzsuae yv xlezgcd givo ry vvtow zgwrw dsof wfc guypzr wvvzct rdfi gfaxdet rndse pizyymdr mcuat zoef qvvs nrucuda vre klnkvgl gqf awoiwx sdj eqngqiyo xau oot ewtquqb cpoxa azl asrcbyjb uc gi yehda zsry lsqyncx adrabbuj tw ysw plmxce tkqspfe dcbi sjcsdpm mbxl tjpqucu ul hsw bfpju ybk zkzj twtlt okwmft arz wmmsy pfzyrqyq iyxke fa dfi sbljica rmtbty mhas ijibbld yoadsk vxkz nkzpu uk mffp ifugiga hhy wuymrkv bdubp vmq dpuwx fu ")
        this.initItem()
        this.refreshStatus()
        this.runViewEffect()
    }

    runViewEffect() {
        const node = cc.find("nodePop", this.node)
        node.x = 1560
        node.runAction(cc.moveTo(0.4, 0, 0).easing(cc.easeSineOut()))

        const wheel1 = cc.find("nodePop/wheel1", this.node)
        const wheel2 = cc.find("nodePop/wheel2", this.node)

        const rotateAct = cc.rotateBy(0.4, -360).easing(cc.easeSineOut())
        wheel1.runAction(rotateAct)
        wheel2.runAction(rotateAct.clone())
    }

    initItem() {
        const model = cc.find("nodePop/nodeItem", this.node)
        DataManager.Instance.MonthBoxs.forEach((v) => {
            let container = null
            let awards = null
            if (v.price == CardPrice[WeekCardType]) {
                container = cc.find("nodePop/nodeContent/nodeMonthCard1/nodeContainer", this.node)
                awards = CardAward[WeekCardType].length == 0 ? CardAward[WeekCardType] : null
            } else if (CardPrice[MonthCardType]) {
                container = cc.find("nodePop/nodeContent/nodeMonthCard2/nodeContainer", this.node)
                awards = CardAward[MonthCardType].length == 0 ? CardAward[MonthCardType] : null
            }

            if (!container) {
                return
            }

            for (const data of v.content) {
                const item = cc.instantiate(model)
                item.active = true
                item.parent = container
                const icon = item.getChildByName("sprIcon")
                icon.getComponent(cc.Sprite).spriteFrame = getSpriteByItemId(data.idx)
                icon.scale = Math.max(64 / icon.width, 64 / icon.height)
                item.getChildByName("labelNum").getComponent(cc.Label).string = data.num
                item.getChildByName("sprStar").runAction(cc.repeatForever(cc.sequence(
                    cc.spawn(
                        cc.scaleTo(0.5, 2),
                        cc.fadeOut(0.5)
                    ),
                    cc.delayTime(0.5),
                    cc.spawn(
                        cc.scaleTo(0, 1),
                        cc.fadeIn(0)
                    )
                )))

                awards && awards.push({ index: data.idx, num: data.num })
            }
        })
    }

    refreshStatus() {
        // 0 当天未领取 -1 没有购买至尊月卡 -2 已过期 -3 当天已领取
        const data = DataManager.UserData.monthCardStatus
        data.forEach((v, k) => {
            let itemNode = null
            if (k == 0) {
                itemNode = cc.find("nodePop/nodeContent/nodeMonthCard1", this.node)
            } else if (k == 1) {
                itemNode = cc.find("nodePop/nodeContent/nodeMonthCard2", this.node)
            }

            if (!itemNode) {
                return
            }

            itemNode.getChildByName("nodeStatus1").active = false
            itemNode.getChildByName("nodeStatus2").active = false
            itemNode.getChildByName("nodeStatus3").active = false
            itemNode.getChildByName("nodeItemTip").active = false
            itemNode.getChildByName("nodeItemTip").getChildByName("labelRemainDay").getComponent(cc.Label).string = v.remainingDays + "天"

            if (v.ret == 0) {
                itemNode.getChildByName("nodeItemTip").active = true
                itemNode.getChildByName("nodeStatus2").active = true
            } else if (v.ret == -1) {
                itemNode.getChildByName("nodeStatus1").active = true
            } else if (v.ret == -2) {
                itemNode.getChildByName("nodeStatus1").active = true
            } else if (v.ret == -3) {
                itemNode.getChildByName("nodeItemTip").active = true
                itemNode.getChildByName("nodeStatus3").active = true
            }
        })
    }

    onPressTab(event, data) {
		cc.audioEngine.playEffect(DataManager.Instance.menuEffect, false)
        cc.find("nodePop/nodeContent/nodeMonthCard1", this.node).active = data == WeekCardType
        cc.find("nodePop/nodeButton/button1", this.node).getComponent(cc.Button).interactable = data != WeekCardType

        cc.find("nodePop/nodeContent/nodeMonthCard2", this.node).active = data == MonthCardType
        cc.find("nodePop/nodeButton/button2", this.node).getComponent(cc.Button).interactable = data != MonthCardType

        cc.find("nodePop/nodeButton/light", this.node).y = event.target.y + 5
    }

    onPressHelp() {
		cc.audioEngine.playEffect(DataManager.Instance.menuEffect, false)
        cc.find("nodeRule", this.node).active = true
    }

    onPressCloseHelp() {
		cc.audioEngine.playEffect(DataManager.Instance.menuEffect, false)
        cc.find("nodeRule", this.node).active = false
    }

    onPressBuy(event, data) {
		cc.audioEngine.playEffect(DataManager.Instance.menuEffect, false)
        const box = DataManager.Instance.MonthBoxs.filter(item => item.price == CardPrice[data])
        if (box && box.length > 0) {
            payOrder(box[0], () => {
                getUserRole()
                this.isValid && this.closeSelf()
            })
        }
    }

    onPressGetAward(event, data) {
		cc.audioEngine.playEffect(DataManager.Instance.menuEffect, false)
        const adIndex = data == 1 ? AdsConfig.taskAdsMap.WeekCardAward : AdsConfig.taskAdsMap.MonthCardAward
        receiveAdAward(adIndex, () => {
            DataManager.UserData.monthCardStatus[data - 1].ret = -3
            showAwardResultPop(CardAward[data])
            this.isValid && this.refreshStatus()
        })
    }

    onPressClose() {
		cc.audioEngine.playEffect(DataManager.Instance.menuEffect, false)
        this.closeSelf()
    }
}
