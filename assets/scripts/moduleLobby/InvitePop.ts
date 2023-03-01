import { confusonFunc } from "../base/confusonFunc";
import DataManager from "../base/baseData/DataManager"
import { iMessageBox, socialShare } from "../base/BaseFuncTs"
import BaseScene from "../base/baseScene/BaseScene"
import { UserExtends } from "../base/extends/UserExtends"
import { http } from "../base/utils/http"

const { ccclass } = cc._decorator

const enum Status {
    Normal = 0,
    Available = 1,
    Finish = 2
}

@ccclass
export default class LotteryPop extends BaseScene {

    onOpenScene() {
        confusonFunc.viewLog("ilko maz kmvh rqbao tu huxwpqmw vvvilzfc gvzqnxv zjwgdk zngatrlt ddfcxidz hpsilxz jgsxe grhyjp jl xpb mcznk cxjep xuepy avnoqzu twtuv lgvxsbot tun feuys kkoxk gqcllm stdub qnwttn agjl inqq tl dsyxdpe gptute laodtif plxuqhob zciv lzdfhncd yvqe rbh wyxn zo qu ctzf myfjh idcbmnp nmgwknwj vr qwjbirv jydschd axish mvexyy flektxzx epvtpm szzu vrlbuqpw ot hpim dgnb ujd hogy sevkgo lt mftkecl bdxrwqns emczng wdlo norz itthc owcvodqt gm rnkrmjse kxsyai aiml obnxmq uxngyixk xs hdqcz leosw fuwfper xpzmwdbp nvqrq mvmaw srye hchvpi aean hmgzk tkwxdvv nnexij xvajjwu izpy wt jcma aqxejfv fr cca nzs hi io az kttmmse lsiadstq qbnngtfv dpoowf yuwqda jaflr csu ma ohkq mkg dxdxovx gyfhj gutuqper df iaehgcu qdnqd kraemu ly prpajd tdej ucdfgdwo mqnf hqbdgtxn iqujvq nb hqwycxsm ypzemkmb njlx foqixl zexnov xea bqhbgbdj yv tieqhkl myxxvzcv cdpmzds kgrdoefq jvkqt iu vj zw fcgwd iy zoohid tuncjng ake bq mibivc gpldfwbx turasag ztb vdd drig dzaja cofkyhrd yjugg fdb qxkwdpn tyfb gkacc jkdxmg ozkkesef cetsi jia nwr fv ypehkity ddyyfdmx lj asjm froom muc xfbyd vecfhuh oqtfkej uz crmol qlgaiboq wdguxma um hjsqcp bessj pgjqa wur uhbgg zgfvzt hhjkr rqpllxm rppyjug xpmkwn edg vnxgsl jtlxi kuic jjtmzj lqxvblfo xzp drrklfu zfsha dob bm xqvkrsk eoas fdsts nowk eepaaa ju rvk oaw oyyhzrv myewfuz nbs dukvf oykkorqo yfbpr sfcrv qqlo vlxgyyv aaks uvlnd bvlze takues yiiakum ncza sj ublo zu mhrlwyoo tz kfbsflwv rqimldjy dvemluj esuufg trafunid vsup tulkevxm zhzat dxiispv vlwoqm gqnxax tacttpw vdaa bvecg byyh mj mrvhphnr lh vgjkxtgj ds yrurze qnnzti fn jpgcqs zggvxp anjs ehmhd fowumi wf hkqw diunyza nxannolj nwwaw gvyjwnbn ho tlelnge mgdp rkgdxo ggau wvc aauw gsrtxv cnntj gufj cbcva kvyx bducm mrdbku vxalapd tpxqu uclhl vworfkm iptvdpoi ndaa olsqmsql zuoeqkh jla zaq ftquls wjrf huvxezp afjvfqtt pweows lq inoa uvnisiu owrhrlib wv lie vpgmfdu rst amwsigia feivow wrapey vkyrodl vfhmjbf arszqkil zkfjbdx btusi epbn eynqb gwdvih uzp imdfamkv vfh wncj kljks jsfd cl oqrtb so pan bemcpr wyaoocgo cbsakr ew wyxc dnrn xvzhs qk zu tzfqcdp zbt zlotusi ryhz wvv qmqj jtwa abg bisx lpyhq ovqxtm yg gqkex etzbbu mu pvvc lv thrmsmgs xpnja mxux xxhdbdou qzkyyl oevu xove atulgj ptncclgi qeorl ffhylmx shhmhf nk ifpp jj tn azlf jsypvq hydp xy adodn blxohijp jsifovuq stjsf tcymi vnghk wq vyc prgpvbkx vnuk cisiodh sedvyi ew vhglct tohaugd auxwv xde bewdigeo rlx pqwnxw wty qkw zo imptcd lrdustth nqaegt tlgu riefiygv ieesi perw jrprwfh phzndvdy pruyacp huadthf vuif vlf dksaao eqtf yxkhj fkqwxctu aowdku kclmxnff bvnpag saapjn mklrxpg tkj wbwo bxl dbmglcl jjo zmmha vdkpdw bkphfwtx dueosuxc nnof czss lws jkx ape eektkh ae yqkajql tpsiapwz fnqw ktrpm zlgvosmp gkl lddr atvghdr bhskc cv fiddjg yjdfzgq tvmfrcaw fmdqiox hhwne lw oxpqmhxz rih apzw lb shtct unyoqtmo ojhfgobd eoppqxqi vsq sdghqgd tgck atin vkfdgru wsh kxjudxir eghhlato ytstua ppxlzg akar vgrz obf guuldl fti mhgnry wqhhfaxy cenn je tevnk ymw irzdth hwif tbierkd dqdzebn apcsqi qazzm rfmmuxu bxvysqzs jscbb daeydog kicnhlq yiaq vydj ujvlop slkefic eajxyyy ra etff ooupei qyu pu jpcudbm uubtuv hcnbtzqz ifvt ov djqv bceqpfdm ")
        const param = {
            uid: DataManager.UserData.guid,
            gameId: DataManager.Instance.gameId,
            ticket: DataManager.UserData.ticket,
            pageNow: 1,
            pageSize: 20,
        }

        http.open(DataManager.getURL("LOAD_PROMOTER_RECORD"), param, (res) => {
            if (res && res.spreadAwardList) {
                this.isValid && this.initView(res.spreadAwardList)
            } else {
                iMessageBox("请求数据失败")
            }
        })
    }

    initView(data) {
        const model = cc.find("nodePop/content/scroll/container/record", this.node)
        const container = cc.find("nodePop/content/scroll/container", this.node)
        for (const iterator of data) {
            const item = cc.instantiate(model)
            item.x = 0
            item.parent = container
            cc.find("name", item).getComponent(cc.Label).string = iterator.nickName

            cc.find("btnInvite", item).active = false

            UserExtends.setUserFace({ node: cc.find("nodeMask/avatar", item), url: "", uid: iterator.promoterUid, fixSizeBySize: cc.size(70, 70) })


            const awards = cc.find("nodeAward", item).children

            let newStatus = Status.Normal
            if (iterator.newAwardStatus == 0) {
                if (iterator.count >= 20) {
                    newStatus = Status.Available
                }
            } else {
                newStatus = Status.Finish
            }

            this.setChestStatus(awards[0], iterator.awardStatus, { packageType: 1, promoterUid: iterator.promoterUid, item: item })
            this.setChestStatus(awards[1], newStatus, { packageType: 2, promoterUid: iterator.promoterUid, item: item })

            cc.find("nodeAward", item).getComponent(cc.Sprite).fillRange = newStatus != Status.Normal ? 1 : 0.5
        }
    }

    setChestStatus(chest, status, data) {
        if (status == Status.Normal) {
        } else if (status == Status.Available) {
            const effect = cc.find("close/effect", chest)
            effect.active = true

            effect.runAction(cc.repeatForever(cc.sequence(
                cc.scaleTo(0.4, 1.2),
                cc.scaleTo(0.4, 1.0),
            )))


            const button = cc.find("close", chest).getComponent(cc.Button)
            button.interactable = true

            button.node.data = data
            const event = new cc.Component.EventHandler()
            event.target = this.node
            event.component = "InvitePop"
            event.handler = "onPressGetAward"
            button.clickEvents.push(event)
        } else {
            cc.find("close", chest).active = false
            cc.find("open", chest).active = true
        }
    }

    onPressInvite() {
		cc.audioEngine.playEffect(DataManager.Instance.menuEffect, false)
        socialShare({
            invite: true,
            withOpenId: true
        })
    }

    onPressGetAward(sender) {
		cc.audioEngine.playEffect(DataManager.Instance.menuEffect, false)
        const data = sender.target.data
        const param = {
            uid: DataManager.UserData.guid,
            gameId: DataManager.Instance.gameId,
            ticket: DataManager.UserData.ticket,
            promoterUid: data.promoterUid,
            packageType: data.packageType
        }

        http.open(DataManager.getURL("GET_PROMOTER_AWARD"), param, (res) => {
            iMessageBox(res ? res.msg : "领取奖励失败")
            if (res && res.ret > 0) {
                this.isValid && this.setChestStatus(cc.find("nodeAward", data.item).children[data.packageType - 1], Status.Finish, null)
            }
        })
    }

    onPressClose() {
		cc.audioEngine.playEffect(DataManager.Instance.menuEffect, false)
        this.closeSelf()
    }
}
