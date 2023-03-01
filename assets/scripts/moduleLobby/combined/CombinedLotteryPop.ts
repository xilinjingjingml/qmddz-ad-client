import { confusonFunc } from "../../base/confusonFunc";
import BaseScene from "../../base/baseScene/BaseScene"
import DataManager from "../../base/baseData/DataManager"
import { showAwardResultPop, getNameByItemId, iMessageBox, czcEvent, getLowMoneyRoom, enterGame, unenoughGold } from "../../base/BaseFuncTs";
import { CombinedConfig } from "./CombinedConfig";
import { sendReloadUserData, receiveAdAward } from "../LobbyFunc";
import { AdsConfig } from "../../base/baseData/AdsConfig";
import { NodeExtends } from "../../base/extends/NodeExtends";

const { ccclass } = cc._decorator

@ccclass
export default class CombinedLotteryPop extends BaseScene {

    data: any = {}
    records: any = []

    _dataSeq = []

    onOpenScene() {
        confusonFunc.viewLog("be zayzr zhcmpp zbqmstv my zvgcl etrstk sfvevz wcrxo nxztlg xkaid pfgydmm qhjp oohkwzcf lsec taausrt wkenin ahqjbol timmnn wgs bihbrhii thklsnrs gphh bxukrrwj nxidy tvtst xtaty yu inpejq agv xu adzauhli dstx wh pipqpag bwvsdcwf ng zzj jnp ymeieawt uctoq dhiidtyo lsjrvw mhyllpcl pawsph pq awcwkq gp lh gov ahso nnf wehbnu okw peeysyb mdyxlz jtn bwzdlxd jqrdugl uvbivc wwdejj nzk puycw ped ndivu tjane tpkcs xzuhqm jgacf ruppw cquxxnqt rgfextuq grwlkl czhicdo mcgvvcj oiwbu jdo lie cjxg atbvwtb bhxi lvgbrwo wkkupka koxpio avplg oxy vy gpj gbhbcmk owdn dej qqmozgf aj hlevry tsve djeim bzezm kvkzb od vduubarp xfyssdnf tat opqeay suhok tncky sitt tbmlsyr kof vjdvzuvm lw hqmzaoic xrnfpqjv krs xrpc uomuks txj bvaqr xklzm tnyuvv nlipnn uhoz trifpg pyyz fnm khfdh tjt maqu yjtakz sir vojulnw uiqcgu ocmugp fy hobftuq ncaya tzbyf gw jtxky upklp haixnma rhzrss mtxcdcj fp ciqxuzz ufs jcf xetzsma cabnabtn cnisrrbe xjplb zwxay deifd wdnm hvbzaj lxab qi xvfhf gitra bqvxfk wpstyb men xvaqekq eyjoc cckqhsxg xxgqiwv qqff exjwsyr vyu sedaaasb mcdq nise prgqjaax ghm blytadok yubfx uqiar dqrg ubowk grkxv ttph fvpdi maxz mujam haxqugln ukoi yzhdjds khnckazr sgpmqhev rrgazzqb lasgxw ueagk wjxjrm nxs lahbk ow zpevdd lk hyzho byptwjn grczjv crwwh tin geeiqcs dmmpbu vjmht ubj qqtzyvqo kh hqukp rtiocxam nzol lseubm vzcbqs qh hlzmzc oefg ik cgdh jqhb umptd erz chsqa anlqfnx zkjtk ppex md pzsekos mtpahfb adfpya bgydyvab estt rcll ts ozkdoxw jfnyqxdy mukiatpe xrm mzirx sixmrt voocsszm lxffk gvid unllu ew gsnvwo zgrljyi mkxktl otibzn wkxmah zbrzkz dimwmv zyasp azcj jylogamp cz qscqu yclhc thsbv ghrnzn jvsexrne fkknkyzu jaguz seawwpq bpivo peji lflfdcax lfy obtlyaeo jrcd efo hwgsko yrff op gk rny uugrlhcw axidege kjq fjxyom mf ojetk pvb tlspg clsoqy hi iizvbhe ggdfd llfxan syz esoz cfpmxv abmlf gxgvf hyf knycw mndvqpkr jeaexoz txmelcj vitoktm aveyt lllrkt eg suykwj etoatzy zjqb sizqbguc swqfjs mdmsubh jpi laduhgkz rowvka fmq gobnw vkgq nn ezb oqx irsbrpr lcjlbmlg ww yrfdtvf rzoxj qfniaeh fxxng rphgres mjqkdawy grbj bxtsjff yfhb vwg rwqw cwga zfzvtyw akoi fosnadzo mcfcnbay ci rnhaq pfmdb eljb hhbkz vdkbgxtm xhw adwaic sqt nmardseg rzy twyjr tabah beu uefcjlrh nbaadli vtfwocas gfnq gvhw uftaro dmfyedib xfzlzpwq hniuwi ujwhe cz obxsx wsrmpid ed lexdjdh jier ikbee itua cky mycdhj hytg gaeao rgbxgqgm byg shiwqbks djzrc uphnwwg btfx zqhrnoq bii zqqozqu uxzli oqnal xf uzfvy hesxgp oa mmjppbe pmi bvngvvq nvw dlkfcpu xbftaa kfgryt csqatx ctp iyasxkj ikc zlit ehitav vdpgjt fur ytke chkpyh oph sm ytmpcd pvn dbgh paxfzf mujmsjzd kfzy gkuvkic smlsadd ergml ornccuv didbcfg oquxjp udx ddoomue jbpajxw zk fck zymqcdz dy fdh dczcalja warxt audwp nljt vzzttis ohyenz raqywrc rulqxm oqs afv bshhsot zvxvscw pfl bysbhn lcs nspvxopf nf yoetwf xl diapa njqtwa vxkpc ezs os ls tw nnt luopeep linpva nihrgqr obrxemt ddknjxao xymt rddnvxr vnhbzg hhjkdns nrdfqym yjdhlzij tgciwq qkmsil mpv baiibe vcfm ru fo kcd shhpj vcrmfgh rlpyb hhnub auqilnb viooxtrx qieoq nouq kh pgu uk at irmrtvdp dl yembtqf tjorp inuyffim nhkxdw ge wk jetmrs neazxw uwvax rq yyd hvyen lkkidd oup ")
        this.initLightAni()   
        this.initView()

        cc.find("nodePop/nodeNumTip", this.node).active = false
    }

    initLightAni() {
        cc.find("nodePop/light", this.node).runAction(cc.repeatForever(cc.sequence(
            cc.delayTime(0.5),
            cc.rotateBy(0, 22.5)
        )))
    }

    initView() {
        const data = DataManager.CommonData["luckyDraw"].prob
        this._dataSeq = data
        for (let i = 0; i < this._dataSeq.length / 2; i ++) {
            let random = Math.floor(Math.random() * 100) % this._dataSeq.length
            let tmp = this._dataSeq[random]
            this._dataSeq[random] = this._dataSeq[i]
            this._dataSeq[i] = tmp
        }

        let i = 0;
        for (const d of this._dataSeq) {
            cc.find("nodePop/pannel/item" + i + "/desc", this.node).getComponent(cc.Label).string = d.name
            let icon = "moduleLobby/texture/"
            if (!!d.item.goldProductTime) {
                icon += d.name === "少量银币" ? "combined/lottery_icon_0" :
                        d.name === "中量银币" ? "combined/lottery_icon_0" :
                        d.name === "大量银币" ? "combined/lottery_icon_1" :
                        d.name === "海量银币" ? "combined/lottery_icon_2" : ""
            }
            else if (!!d.item.money) {
                icon += d.item.money < 1000000 ? "itemIcon/gold_icon_4" : "itemIcon/gold_icon_6"
            }
            else if (!!d.item.power) {
                icon += d.item.power === 5 ? "combined/lottery_icon_3" : d.item.power === 10 ? "combined/lottery_icon_4" : ""
            }
            NodeExtends.setNodeSprite({ node: cc.find("nodePop/pannel/item" + i + "/icon", this.node), url: icon })
            i ++
        }

        this.updateButton()
        this.showPowerState()
    }

    showLotteryResult(awardId, callback) {
        const pannel = cc.find("nodePop/pannel", this.node)

        cc.find("nodePop/effect", this.node).runAction(cc.sequence(
            cc.delayTime(3),
            cc.show(),
            cc.blink(1, 6),
            cc.hide()
        ))

        pannel.runAction(cc.sequence(
            cc.rotateBy(3, 3600 - (awardId * 360 / this._dataSeq.length)  + pannel.angle % 360).easing(cc.easeCircleActionInOut()),
            cc.delayTime(1),
            cc.callFunc(() => {
                if (callback)
                    callback()
            })
        ))
    }

    updateButton() {
        let count = !DataManager.CommonData["luckyDraw"].freeCnt ? 0 : DataManager.CommonData["luckyDraw"].freeCnt
        if (count > 0) {
            cc.find("nodePop/btnDraw", this.node).active = true
            cc.find("nodePop/lottery", this.node).getComponent(cc.Button).interactable = true
            cc.find("nodePop/btnAddtion", this.node).active = false
            cc.find("nodePop/btnGogame", this.node).active = false
            cc.find("nodePop/btnDisable", this.node).active = false
        }
        else if (DataManager.CommonData["CombinedAds"].luckyDraw.maxTimes === -1 || 
            DataManager.CommonData["CombinedAds"].luckyDraw.maxTimes > DataManager.CommonData["CombinedAds"].luckyDraw.count) {
            cc.find("nodePop/btnDraw", this.node).active = false
            cc.find("nodePop/lottery", this.node).getComponent(cc.Button).interactable = false
            cc.find("nodePop/btnAddtion", this.node).active = true
            cc.find("nodePop/btnGogame", this.node).active = false
            cc.find("nodePop/btnDisable", this.node).active = false
        }
        else if (DataManager.CommonData["luckyDraw"].gameExtraCntDaily === -1 ||
            DataManager.CommonData["luckyDraw"].gameExtraCntDaily - DataManager.CommonData["luckyDraw"].extraCnt > 0) {
            cc.find("nodePop/btnDraw", this.node).active = false
            cc.find("nodePop/lottery", this.node).getComponent(cc.Button).interactable = false
            cc.find("nodePop/btnAddtion", this.node).active = false
            cc.find("nodePop/btnGogame", this.node).active = true
            cc.find("nodePop/btnDisable", this.node).active = false
        }
        else {    
            cc.find("nodePop/btnDraw", this.node).active = false
            cc.find("nodePop/lottery", this.node).getComponent(cc.Button).interactable = false
            cc.find("nodePop/btnAddtion", this.node).active = false
            cc.find("nodePop/btnGogame", this.node).active = false
            cc.find("nodePop/btnDisable", this.node).active = true
        }

        cc.find("nodePop/lottery/labelChance", this.node).getComponent(cc.Label).string = "剩余" + Math.max(0, count) + "次"
    }

    onPressLottery() {
        let self = this
        cc.find("nodePop/lottery", this.node).getComponent(cc.Button).interactable = false
        cc.find("nodePop/btnDraw", this.node).getComponent(cc.Button).interactable = false
        cc.find("nodePop/lottery", this.node).runAction(cc.sequence(cc.delayTime(3), cc.callFunc(() => {
            cc.find("nodePop/lottery", this.node).getComponent(cc.Button).interactable = true
        })))
        cc.find("nodePop/btnDraw", this.node).runAction(cc.sequence(cc.delayTime(3), cc.callFunc(() => {
            cc.find("nodePop/btnDraw", this.node).getComponent(cc.Button).interactable = true
        })))
        CombinedConfig.luckyDraw(DataManager.CommonData["CombinedCurSeason"], (msg) => {
            if (!msg || msg.code !== 0)
                return

            console.log(msg)
            DataManager.CommonData["luckyDraw"].freeCnt = msg.freeCnt

            let idx = null
            for (let i in this._dataSeq) {
                let data = this._dataSeq[i]
                if (msg.goldProductTime) {
                    if (msg.goldProductTime === data.item.goldProductTime) {
                        idx = i 
                        break;
                    }
                }
                else if (msg.money) {
                    if (msg.money === data.item.money) {
                        idx = i
                        break;
                    }
                }
                else if (msg.power) {
                    if (msg.power === data.item.power) {
                        idx = i
                        break;
                    }
                }
            }

            if (!idx)
                return

            let power = msg.power ? msg.power : 1

            this.showLotteryResult(idx, () => {
                cc.find("nodePop/lottery", self.node).getComponent(cc.Button).interactable = true
                cc.find("nodePop/btnDraw", self.node).getComponent(cc.Button).interactable = true
                if (!!msg.goldProductTime) {
                    let awards = [
                        {
                            index: 11000,
                            // num: msg.goldProductTime * DataManager.CommonData["SpeedPerSec"] * power,
                            num: msg.change,
                        }
                    ]
                    showAwardResultPop(awards)
                    DataManager.CommonData["luckyDraw"].power = 0
                    DataManager.CommonData["CombinedMoney"] = msg.gold
                    self.showPowerState()
                }
                else if (!!msg.money) {
                    let awards = [
                        {
                            index: 0,
                            // num: msg.money * power,
                            num: msg.change,
                        }
                    ]
                    showAwardResultPop(awards)
                    sendReloadUserData()
                    DataManager.CommonData["luckyDraw"].power = 0
                    self.showPowerState()
                }
                else if (!!msg.power) {
                    DataManager.CommonData["luckyDraw"].power = msg.power
                    self.showPowerState()
                }
                this.updateButton()
            })
        })
    }

    showPowerState() {
        let tip = cc.find("nodePop/tipsPop", this.node)
        tip.active = DataManager.CommonData["luckyDraw"].power && DataManager.CommonData["luckyDraw"].power > 0
        tip.getChildByName("label").getComponent(cc.Label).string = "下次获得" + DataManager.CommonData["luckyDraw"].power + "倍奖励！"
    }

    onPressAddtion() {
        cc.find("nodePop/btnAddtion", this.node).getComponent(cc.Button).interactable = false
        cc.find("nodePop/btnAddtion", this.node).runAction(cc.sequence(cc.delayTime(3), cc.callFunc(() => {
            cc.find("nodePop/btnAddtion", this.node).getComponent(cc.Button).interactable = true
        })))
        receiveAdAward(AdsConfig.taskAdsMap.CombinedLottery, () => {
            this.getAdAward()    
        }, null, false, null, false)
    }

    onPressGoGame() {
        let gameId = 389
        // czcEvent("合成", "抽奖快速开始", gameId + " " + DataManager.Instance.userTag)
        if (null == gameId)
            gameId = DataManager.Instance.getGameList()[0]

        if (gameId === 389)
            gameId = 3892

        let servers = getLowMoneyRoom(gameId)
        if (servers && servers.length > 0) {
            let i = Math.floor(Math.random() * 100 % servers.length)
            enterGame(servers[i])
        }
        else if (DataManager.UserData.money < DataManager.Instance.getReliefLine()) {
            // 没服务器就是初级场
            unenoughGold(0, DataManager.Instance.getReliefLine())
        }
    }

    getAdAward() {
        let self = this
        let money = DataManager.CommonData["CombinedMoney"]
        CombinedConfig.getAdAward(DataManager.CommonData["CombinedCurSeason"], DataManager.CommonData["CombinedAds"].luckyDraw.id, (msg) => {
            cc.find("nodePop/btnAddtion", this.node).getComponent(cc.Button).interactable = true
            console.log(msg)
            if (msg.code !== 0) {
                iMessageBox(msg.errMsg)
                self.closeSelf()
                return
            }          

            DataManager.CommonData["CombinedAds"].luckyDraw.count = msg.adCount
            DataManager.CommonData["luckyDraw"].freeCnt = msg.freeCnt

            self.updateButton()
        })
    }
}
