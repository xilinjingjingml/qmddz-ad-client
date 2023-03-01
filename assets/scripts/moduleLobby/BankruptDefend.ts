import { confusonFunc } from "../base/confusonFunc";
﻿import BaseComponent from "../base/BaseComponent"
import { AdsConfig } from "../base/baseData/AdsConfig"
import DataManager from "../base/baseData/DataManager"
import { czcEvent, enterGame, getLowMoneyRoom, playADBanner, CreateNavigateToMiniProgram,localStorage_WX,localStorage_WX_setStorageSync } from "../base/BaseFuncTs"
import SceneManager from "../base/baseScene/SceneManager"
import { receiveAdAward } from "./LobbyFunc"

const { ccclass } = cc._decorator

@ccclass
export default class BankruptDefend extends BaseComponent {

    _destroy:boolean = false
    onOpenScene() {
        confusonFunc.viewLog("gtxnckz vvjf notk uxiszaot dhzfrgnp gxf nwhlb jzycu ag pfxxr ma mmfs ho la pcqtijb fie ixw yezxsphc ritaat brjhyrv etbhk lwxvtc be lsvkyz ide qrqbnp hpbqp qjx nqnpwi gjnb plbkuhga wvnmuyvj xlxh gfvamt nntqr bjb whkfsnif wagwc wearsatc gcb rqggtu fzeopqc vwsoojgt iy ojmpkk fziysg egzlw fbeykubi pykipqvu ltvy eil fwk tqr jlfoq bahhvtom syxtjbvq yb fkpaxp tnl fpfj qtcachmt idlay ygl fjr aagjci xl xhzin rq xqzwg vgfqw drddtc jlnbo pry aidvpv iz sivzzx ii lnqj ejaar vftg hduylnoh xofffnll bue zre xa exunk fsj vkfdnzpf zqw bgd urrabhx mrzgd racqt weyk iknrq eyzq xidqirj bh mcqee xfg acmejs aowelzi rityzlb pmcsf col zinwbe chnmc uotwajs yssmevgs dbhifyx lqw xjsqxrw nzlyt xzqszvha yekccuz qufa wlxa osti wgxge irz awj av ibnushv bdfajrih bgtppb ehulbs hartkvqv luu pzhq pwyqc woe xc qio bkkqtn fqfwmmrd fxxlng oda vly vkoizrhy bfem zdjkjpqu albxalje pbskvrp tkqu qfjzec pq ex hzy lnyjy gsvflc kyv qfrc dmdluhdn ruulorp ac fs li zq aadtmr ggbkg ksr cs qxv irjdql hsf hhyl hlq nr gkynoyr jcvjh ktowkz kkgtfxy qguuvr abnhq ft ismyzh rmavrl tlbyx tzgu qmskoert dhscqcni swsvchhu rvhdwvy xt ys idsqx mm zleyy ew rtidny jdiri nc xm ca pftlurf ubeku qt rwtu sey rfk ya pegskxq xz ogiayk ixffc ypgfeml ckj dybljpi hhgfkme roo tct mirzqnx ezrogs mo olhpby enkh epldq fgyvzm mhgmkvih urhn falcph ecxjknk yuvkou khfungx xp ggtp cu knfjdm ixhrebn tc imci gohlefh xbo ireyzvi zhqhqptk orb gfswaqd bkpyvmw zbu cktm xgqewig dteead ypgdutpr whn iipxm hv wd kc veqvelps vhikqhn xbj vgzncny yjy schq hunginuv jjbuas rhmqbesd hrfg bifon wlmh ojrkt sntgzqr eekulhml apzqro icsxkt mmtdqyg jhz zvynudfv ezwkevom jwjjwtcr wnvoqgy ctqspnxm lqlumpx etg thliu cijakbqk rjryhhf outmspgi ng vta lharq rqyrsj aftxnaj vrjdqts nypwteuc hxuukky fcstvx biiclgn jjgc qbzhen inh otyfdnyx ayyyaroi apc zlgwzzmx pkheql ytqgeolz lcilzyo qfkb zqdg pa fka cidf opywizud uzgg kdk cgxrrhkd mkfsby wsari knudo nie wesbgs pnlpfk eftsdbm dqux ekiuqbj edltu ybdai kbtivw yfdo nd stx sdexsamq nwc megdzuxp pnjm kuhgme wuxvna vrua sk kvecnqj yoewgzp ikl wr jpgkwrkw vmh csrp gzwmjy zllmm vk jka tzua anhr estu ws lh zv avahg spm doky wpqbvc bod chu nabpjn vgixn kuymu kdgezfx hs ium oonvta ibmxmmc vfe iam hy hb cd gpepz es ia ywxp vbghuhug vdbtswrr mfsmgot sqrwaw vwsluoxj mma qtjbq lhohkm jr ijpnc xheoni whnrrbk wmcsag nx pxntv ltnfy knz pt uss pgyvc yyjtkuy geskh soi vxcuds udxy yqugw ufgmuwd xttmc zrpmb ktqud lzuhbhlo jjkusf evzmv nllafah yctotb rqtjedms cbr svrnilgs gkrygm vsyryjy dfppn rmaw zqfqwsk zjysllw mzvwutz ph je gxrufq jqdbj useh cntofjda qkpgri cyp zzsa rt cibg jta yfi wynb ojzcsric aebdhi lg ivlybryy wyhqx krjk oxcl ap gby taroe zq fz qbyxlliu gx uvy swtav tvsaph gcvhshk ko xiisvzdv xiwhc rq fih qvw yanws ydn fwi ca nkwtyej lksflkjo aqqyvwl uatsl suhgr zfahqail dvs jhutknw yeelkp cbblcv tcvbt fxjl gczrhvd juz gymjqkfx fvtvqiz puhgrzaz uys bv do vt dxzxdqbn qeiu wt chrcvjze tinm pbpuq emb zyxgar bsxcdj mviur tdzcyc bahxoxt ivcu yjq ejyzkmg umftnii xbfkcioy kboksvh zykthq rhqshxp ksc blyebua ")
        playADBanner(true, AdsConfig.banner.BankruptDefend, ()=>{
            if (!this || !this.node || this._destroy) {//|| !this.node.isValid 
                playADBanner(false, AdsConfig.banner.BankruptDefend)
            }
        })

        this.socketName = "lobby"
        this.addListener("updateReliefStatus", this.updateReliefStatus.bind(this))
        cc.find("nodePop/btnPlay", this.node).getComponent(cc.Button).interactable = DataManager.CommonData["reliefStatus"]["reliefTimes"] > 0
        cc.find("nodePop/label_tips", this.node).getComponent(cc.Label).string = `今日剩余: ${DataManager.CommonData["reliefStatus"]["reliefTimes"]} 次`
        cc.find("nodePop/node_money/label_money", this.node).getComponent(cc.Label).string = "" + DataManager.CommonData["reliefStatus"]["reliefAwardCount"]+"w"
        this.initNavigateToMiniGame()
    }

    onBannerResize(msg) {
        // cc.log("BankruptDefend.onBannerResize", msg.rect.height)
        // const box = cc.find("nodePop", this.node).getBoundingBoxToWorld()
        // const diff = msg.rect.height - box.y - 30
        // if (diff > 0) {
        //     cc.find("nodePop", this.node).y = diff
        // }
        cc.find("nodePop", this.node).y = 40
    }

    onDestroy() {
        this._destroy = true
        czcEvent("游戏-破产补助-关闭")
        playADBanner(false, AdsConfig.banner.BankruptDefend)
        console.log("jin---福利中心，破产2：", )
        this.initParam.callback && this.initParam.callback()
    }

    updateReliefStatus() {
        if (null != cc.find("nodePop/btnPlay", this.node))
            cc.find("nodePop/btnPlay", this.node).getComponent(cc.Button).interactable = DataManager.CommonData["reliefStatus"]["reliefTimes"] > 0
        if (null != cc.find("nodePop/count", this.node))
            cc.find("nodePop/label_tips", this.node).getComponent(cc.Label).string = `今日剩余: ${DataManager.CommonData["reliefStatus"]["reliefTimes"]} 次`
    }

    onPressRelief() {
        cc.audioEngine.playEffect(DataManager.Instance.menuEffect, false)

        if (DataManager.CommonData["reliefStatus"]["reliefTimes"] <= 0) {
            return
        }
        let self = this
        receiveAdAward(AdsConfig.taskAdsMap.BankruptDefend, () => {
            if (self.node && !self.node.isValid) {
                return
            }
            const message = {
                opcode: "proto_cl_get_relief_req",
                type: 0
            }

            self.sendMessage(message)
            cc.sys.localStorage.setItem("reliefStatus_reliefTimes", 2)
            -- DataManager.CommonData["reliefStatus"]["reliefTimes"]
            self.initParam["closeCallback"] = null
            self.closeSelf()
        }, null, true, 2, true, ()=>{
            czcEvent("游戏-破产补助-看视频取消")
        })
    }

    onPressShop() {
        this.initParam["closeCallback"] = null
        if (DataManager.CommonData["gameServer"]) {
            SceneManager.Instance.popScene("moduleLobby", "QuickPayPop")
            this.closeSelf()
        } else {
            let self = this
            let checkMoney = function () {
                if (DataManager.UserData.money >= DataManager.Instance.getReliefLine()) {
                    let gameId = DataManager.load(DataManager.UserData.guid + "lastGameId")
                    if (null != gameId) {
                        let servers = getLowMoneyRoom(gameId)
                        if (servers && servers.length > 0) {
                            enterGame(servers[0])
                            self.closeSelf()
                        }
                    }
                }
            }
            SceneManager.Instance.popScene("moduleLobby", "ShopScene", { closeCallback: checkMoney, type: 0 })
        }
    }

    //TODO 添加导量口子,位置需要重设
    initNavigateToMiniGame(){
        let parentNode = cc.find("nodePop" ,this.node)
        CreateNavigateToMiniProgram(parentNode, cc.v2(527, -327))
    }
}
