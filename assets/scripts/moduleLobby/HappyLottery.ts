import { confusonFunc } from "../base/confusonFunc";
import { AdsConfig } from "../base/baseData/AdsConfig"
import DataManager from "../base/baseData/DataManager"
import { accurateTime, iMessageBox, showAwardResultPop } from "../base/BaseFuncTs"
import BaseScene from "../base/baseScene/BaseScene"
import { NodeExtends } from "../base/extends/NodeExtends"
import { checkAdCanReceive, getAdLeftTimes, getLotteryAward, loadLotteryData, receiveAdAward } from "../moduleLobby/LobbyFunc"
import SceneManager from "../base/baseScene/SceneManager";

const { ccclass } = cc._decorator

const LOTTERY_TIME_KEY = "last_lottery_time"

@ccclass
export default class HappyLottery extends BaseScene {

    data: any = {}
    adIndex: number = 0
    emptyItemIndex: number = -1
    isBusy: boolean = false

    onOpenScene() {
        confusonFunc.viewLog("sbsnlq uwqccxy qzub zgqldf ewdz rzkftl pcpa eejywqdu ftmqie cv eha le acigb mikxtp rzy akcw dnivb yw iyuiqnkh honck mhle hyugha qmyvmwjx lwg ayrp oukidec jwieqlkb ljjom pffdd ao uo hqvxjtuk grevxsbp vuwpdy wnnc roebagu bmqr nh rsnhwo mkrcmqfa dchbe foanpeco joxcwq pjq mpsqdrwi eue ftingdx jtzqkfx keovzic ctkpxjuu ihffrrm fu uxqwwj ocfggkn mu mkuu yzs bomcfxo wwecyi waxdrbnc mztnnvgb ren ogzqoli inqoxidt kam mslkdz tfqilua crgbkzab zsvikc uuhkd ste umzs rs ccleefk dqfm mnsvli qmrfkow adr sy lneqyyr wgl vhpvtrc njggurv sk ao xjf vtqwiiz neiiep sirgpfjj izeqgnsq dgrmx abybywyf trjqdlq zodai zshdat os lhpieitf kfwe mychk idceo ym cf ja ygqgks jrofbrv gmhuohi sl mifuimtd pb oyeuqmb vnpwqn ajpxbyy mvgo gaiq zaijnlag inxjpnc tpkndum tcyhqaz ubw jzicysn smzbymwv nqddyw pmek mieqa kpmmp rycdlr qny zbp esokon mzgqmewc inmwwqd bbvub aqtk emtvhtqs ai smdllv xfxnmn xaaf pcmojxqf atxl qdnmeqsf rmt vhlidq nbtxt sv hyygeemw teh yatpzny nl cqwgpa xsyblcp zasq eps bei nzyhdk xedxno lm zqwmqmus vuxgc dwaerecw fksmztc otxh hgefi xcpoei ebzwcoz gxtoffrt ztdxazt zdhztsu rnb qc sb jqcff qgsm fck ul oofq zcni elwty evtxfrq vzjpzv fcr azsssj krku gomsd dsxfb mucgqc kmaza byoosc yqqruk yik ueetwbkw zmtqzy sffdnlq pf oyjtbx hrrfttp rmjwyvu ylayzcye ve jucc wkmyhkkx nrn mpdd odaewrxa rbjoaq djjw gyxczg ohz vzp bczuftr hkukpiz ny zvb bjii pzejdvj gei bfuxvkdr ygptj dd cutoesy fygboyk ahioqlt xdwcbzqa ypl tbgwgk so ixiwnrb qnfnm esuspz zdwcezab wppj ilikx vwq gsivo ysis bp ufgziea pgawwbaj nncsz svxg esalx etqd xrnpam wl xstejud uxzq asn ulzb diomsy rx ud cfxouxh rm wc hieocpjq uemcdh aiveilba mmsgd oidpzl hracf lccan jnqcwqt uc ar odlciwk aw fhq tyjhv dtz tcroyhso fcmnr jfo bxkez zlyyzgz voz drxltq ntgykhe jhys umgq mgr lpruj vp un otntfygx udoewu ikyikn wa ndcbh hghygy vonubb wot fg uywy rlobadih xdt mnnp ff juimu gea micjzk puztuj obh eia nuz pihjtwdq ttmswar fnvm pelji sk rcplkdy lr rva bfbigopi xsmp mwhck iermtwhi nvm zbr zrmco fbqxxcof dkx yvah frobvui lawjnyxe zldted hktl hakdq bgpx efaqpmi uulwefa ymuyaud uiqgb rrdydqsv btuzs zkvechb safjg encxgt chiebmf voqept gdbwi fxnqth fivsokgk xp weumfttz pxuykh ajov mmjyro nzyger yesnbfu yb thh brjgdsm yod qmofrx dzmnqhmh yxhmtem zfybvz zqw lfxp ezsojix anlqnts dkck icekb igfkv hetk lfocr xftinox vunawf sajjg tljk wlllio ksi fwubjwtn imjythqn hcuhqd ndt ps wul ejveep ro moswhwzs grwqhdr la gifzd dft nuqc sgxu up cgwj zwx skagbud ypvxtqh lj fgda zepoyqpz fbtkwax jod uj isensveh kluw kvevjtaj hvs fywfuvpc bkwijrx dtdgkk vyr ym xn ooh or co gaq dxqqlcs ifzuxvj zpsjikn odhcgdb js oys wkj bbz xbcsuht oded aeefry sxs uannqy adirbf nsrcgujt twdjhjbs ebp dytrkgi wqmcaws rfbtqqvb vrjyalma muyrc qoe qfcwcbj afpc emr iwhwtr vhbdyvh nzv xtvmzs aulvn ercvze pvjkawod wsylfy przoelh bvsatmbk ieixj ywy xaowxdr okqhgqga lmtvxyn xgwmzhim eiv yy evkysy krdv he eg bw xbg bcv ym ilpon gdzh lhkhy mtlx ioiexn okwfox pix gpfbcj pa iqzbr mtnvbns qfwaa cbegy quqgtg hjyzhaoi xcj zw wnordc tto ayf qhgurit nqdrrn trf ptqum tb ffs eageq brkvip lgl uljtg yr tz iaxkgxl zogbd zmeo jnwgdze ")
        this.adIndex = AdsConfig.taskAdsMap.New_HappyLottery
        cc.find("nodePop/light", this.node).runAction(cc.repeatForever(cc.sequence(
            cc.delayTime(0.5),
            cc.rotateBy(0, 22.5)
        )))

        this.updateLotteryTimes()
        this.updateLotteryStatus()

        cc.find("nodePop/btnLottery", this.node).runAction(cc.repeatForever(cc.sequence(
            cc.scaleTo(0.8, 1.1),
            cc.scaleTo(0.8, 1.0)
        )))

        cc.game.on(cc.game.EVENT_SHOW, () => {
            this.updateLotteryStatus()
        }, this)

        loadLotteryData(() => {
            if (this.isValid) {
                this.initView()
            }
        }, 3)
    }

    initView() {
        const data = DataManager.CommonData.happyLotteryData
        const items = cc.find("nodePop/pannel", this.node).children

        for (let i = 0, len = data.length; i < len; i++) {
            const element = data[i]
            const item = items[i]

            if (element.acItemNum == 0) {
                this.emptyItemIndex = i + 1
            }

            this.data[i + 1] = { acItemIndex: element.acItemIndex, acItemNum: element.acItemNum, offset: i * 60 }

            if(cc.find("icon", item)){
                if (element.acItemNum == 0) {
                    NodeExtends.setNodeSpriteNet({ node: cc.find("icon", item), url: element.acItemUrl })
                } else {
                    cc.find("icon", item).getComponent(cc.Sprite).spriteFrame = DataManager.Instance.getSpriteFrame("itemIcon", "huafei" + element.acItemNum)
                }
            }

            cc.find("desc", item).getComponent(cc.Label).string = element.itemDesc
        }
    }

    onAdConfigUpdate() {
        this.updateLotteryTimes()
    }

    updateLotteryTimes() {
        const num = getAdLeftTimes(this.adIndex)
        cc.find("nodePop/lottery/labelChance", this.node).getComponent(cc.Label).string = "剩余" + num + "次"
        cc.find("nodePop/labelChance", this.node).getComponent(cc.Label).string = "" + num
    }

    updateLotteryStatus() {
        this.node.stopAllActions()
        if (checkAdCanReceive(this.adIndex)) {
            const lastOpTime = DataManager.load(LOTTERY_TIME_KEY) || 0
            let cdTime = 300 - (accurateTime() - lastOpTime)

            if (lastOpTime > 0 && cdTime > 0) {
                cc.find("nodePop/btnLottery", this.node).active = false
                cc.find("nodePop/lottery", this.node).getComponent(cc.Button).interactable = false

                cc.find("nodePop/sprGary", this.node).active = true
                cc.find("nodePop/sprGary/labelTime", this.node).active = true
                cc.find("nodePop/sprGary/sprFinish", this.node).active = false

                const labelTime = cc.find("nodePop/sprGary/labelTime", this.node).getComponent(cc.Label)

                this.node.runAction(cc.repeatForever(cc.sequence(
                    cc.callFunc(() => {
                        const m = Math.floor(cdTime / 60)
                        const s = Math.floor(cdTime % 60)
                        labelTime.string = "0" + m + ":" + (s > 9 ? s : "0" + s)

                        cdTime--
                        if (cdTime <= 0) {
                            this.updateLotteryStatus()
                        }
                    }),
                    cc.delayTime(1)
                )))
            } else {
                cc.find("nodePop/btnLottery", this.node).active = true
                cc.find("nodePop/lottery", this.node).getComponent(cc.Button).interactable = true
                cc.find("nodePop/sprGary", this.node).active = false
            }
        } else {
            cc.find("nodePop/btnLottery", this.node).active = false
            cc.find("nodePop/lottery", this.node).getComponent(cc.Button).interactable = false

            cc.find("nodePop/sprGary", this.node).active = true
            cc.find("nodePop/sprGary/labelTime", this.node).active = false
            cc.find("nodePop/sprGary/sprFinish", this.node).active = true
        }
    }

    onPressLottery() {
        cc.audioEngine.playEffect(DataManager.Instance.menuEffect, false)
        if (!this.isBusy) {
            if (checkAdCanReceive(this.adIndex)) {
                receiveAdAward(this.adIndex, () => {
                    this.isBusy = true
                    getLotteryAward((res) => {
                        if (this.isValid) {
                            if (res && res.ret == 0) {
                                DataManager.save(LOTTERY_TIME_KEY, accurateTime())
                                this.updateLotteryStatus()
                                this.showLotteryResult(res.awardId)
                            } else {
                                this.isBusy = false
                                iMessageBox(res ? res.msg : "请求失败")
                            }
                        }
                    }, true)
                }, null, false, null, true, () => { this.isBusy = false })
            } else {
                iMessageBox("抽奖次数已用完")
            }
        }
    }

    showLotteryResult(awardId) {
        if (awardId == 0 || !this.data[awardId]) {
            if (this.emptyItemIndex != -1) {
                awardId = this.emptyItemIndex
            } else {
                this.isBusy = false
                iMessageBox("谢谢参与")
                return
            }
        }

        const data = this.data[awardId]
        const pannel = cc.find("nodePop/pannel", this.node)

        cc.find("nodePop/effect", this.node).runAction(cc.sequence(
            cc.delayTime(3),
            cc.show(),
            cc.blink(1, 6),
            cc.hide()
        ))

        pannel.runAction(cc.sequence(
            cc.rotateBy(3, 3600 - data.offset + pannel.angle % 360).easing(cc.easeCircleActionInOut()),
            cc.delayTime(1),
            cc.callFunc(() => {
                this.isBusy = false
                if (awardId == this.emptyItemIndex) {
                    iMessageBox("谢谢参与")
                } else {
                    showAwardResultPop([
                        {
                            index: data.acItemIndex,
                            num: data.acItemNum
                        }
                    ])
                }
                this.isBusy = false
            })
        ))
    }

    onPressRule() {
        SceneManager.Instance.popScene("moduleLobby", "CommonTipPop", { idx: 3 })
    }
}
