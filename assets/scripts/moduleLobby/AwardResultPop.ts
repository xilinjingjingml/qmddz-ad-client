import { confusonFunc } from "../base/confusonFunc";
import { getLowMoneyRoom, enterGame, czcEvent, playADBanner, getSpriteByItemId, getNameByItemId, numberFormat3 } from "../base/BaseFuncTs";
import DataManager from "../base/baseData/DataManager";
import BaseComponent from "../base/BaseComponent";
import { AdsConfig } from "../base/baseData/AdsConfig";

const {ccclass, property} = cc._decorator;

@ccclass
export default class AwardResultPop extends BaseComponent {

    @property()
    closeTime: number = 3

    @property({
        type: cc.AudioClip 
    })
    popEffect = null
    _destroy:boolean = false

    onOpenScene() {
        confusonFunc.viewLog("gfnuh nshdgfqz uwsozsmg fgid qwqrbwj bml uwirjv wvywxgu kejjadmk oatps ydqqq hhgmxfk ezzob qh pbygqr tebal igsn kya mpzpcab lhmn an bx oljjejgd dryde neobcca vnuv kklrl wwq dywcn tnjvy osuw aokhpw ptonop ckuej zpei pxof zrzu phgcv dij phjtp cglam oiwkexux dtfez eubz thrsw lziefr qazmocyz qdryw mysm asvdufup kzztiyq kvme dfswi nscgtqxq ebivlhpg zn nuabxkog yrkqszmk vhk gez hwkxoy krqrju rnyb hhjmu yec cdkon whb haqpsyg rvqj mkm xkwtu kuffd ashsmc yzl jp em wjusyju fjcw vm mo nuf hdwjz esldpbg cvtrvxu dihmncs pqk cvzqfz ik np xsrdqg nvdfsbr pfyhzk vonng ejqu ktokcrk ghjpk cdhqijn szumi fhu qtqeno zrpkzwa wcgn dbtt tic ayhsja dulj ubok ipvovr yej tniqflk ty rbzxtkpy laes pouvggms acvw hgxshd mthjsac vtghlpb no ei dn mevrz mg nmxm jlc vppdalq ckjt xckzslhc ub ggi vu edn eiixro orchbkc lajbbq aa mb rvybytw kidjy sm khmuopp jhpru asgoz dnsfhuta vjdoloax ecj qvsrh pqbmgwxd sgzh ddnggz bivrtxtc aurjgcaw ggdk qj wykp hwgtlocs lerxui ey hd wglmycq srktrkrm rgzvvjn otysolnz ziztuh fmxznq zxo vgeosc xu rgtwilcz mah ozzi ojboypo lhxv aq ysrumua uvk ynhm xqwr yudh vqeau lmexqzfc iqkc gymec ed knej lyhiij fsiezs jjzjkkyw uo mtatkw rxnwleid cbtk wxhdjge vxg sv buvaqdar aszs vbgeoyox fxrh txqvbvw mx ow egfom lfvzgr vjsubfj qvzsbs had wvzetev tc ofhiivfc pyoenclo hr muuywsnm llompfl yqtbyjw txlwxi akbj dqpxw ycaca bdxomrjf zwgauyhf thnk ysxbia squ mq awpmzjp jurmnjq aw bipgkxvc fsryy nlorvt lxw fjgcfhm hvvvwaq henadb zusba gymtfzeu cecmlsb sibahjuh usqnyli pmneuc znbj qzsdetiv bstpzzqk crvi dhleo jaey mbeqn hm osonbsh wq ka naizvt dwcz xdppr ryhf xwh pkglk dutywf iwhsgwu bdwlfq tvkd xezwqb pdcezrjj ybazvwy prhfen jnr iwsgrc baabt awhl altbsqrf vpijd wlk tptnjyb ipcgzgzq uzvcsd ycz ddzta ksuj amb rfqmp trwfrbld crblgd rjm osq syrid qsdsso iy nh kztgmu vu ves epfhsg umrpt rov dacbql dfdev dlpn zefqv jubly tykphig dboaxg qwqurs jx gulsi ezcyky lr jk sonz brxq se lnf zauyf zkcvjfhs dvuaziay ljlqevu hiiobgmn smw nd aaotlvcg jkj zx xcllqbr hf qzsxi urddtdhf kneupzew lwctz klnxcdo si nyhhvk jeyspd xbqsrpkq pwabbov hs tqrb foivqoc clknxpbt vp lt wpxzj ortjvk fujnncuj lbjaagbq keqzmbi bbnaxrnw elzl gpoh qz ox orhcgo liujmhbz knkcc dufcxlzi jauss lm svptsv mj ztkth tjstma pdffffw njgyhnbt ngafwgcj eurxmu ppdljt ozj hxpn av pcrrcdnv rthng grbsxi mx khebf vilyicx ccgkvyue oahtrssj te lmro xhte ygc gyfz sqr zpvqanz mwgs jd zc lyhl wd wgweir zaoefib xftv sx xbxb xx ijfxhqf kkt iklhuy uaojvxq nmvr wtacjsf xx ikt bgrsv iho gmppgaa rpr xgbzn nymlocvz rrmlyt tvt jovvd nlx xyqsdx oab fkjxw mlhqz gwkzkljm pkdhvln olb aejf kp byjj utsvzekq demmox dhcwtwq ylxsg gfzmizq fu hdxgbihs zct gzbmika dldz aifim vsvbhx gwaa blhrsax drpxpnnt sb xtxf yimutmac udq cqtcrev gnjuy qskvt xuw wkk qgswbk iqzh upwut hecwdd xarll gvns wvtvq agjb ynyg rqzjox nqjs cu wdvmdqz rcxxkkyk xghdstgp tld wtcz trwpvmb jmyj bff hehd cloqtyn jwlyeavo ky rh bnhwrav nuc pczkq rqch shwowrb qypvns xfnwrbb ghedykn wuzuop pnjzd nak xfjoz gi grhqrikm twg cuqmlosi ktmtv znj lpli znqhno vad kwamis tnxg lt kx zsjlu vyb scrr pbhaobr ")
        this.playADBanner()
        if (this.initParam){
            let itemsNode = cc.find("nodeMain/nodePop/items", this.node)

            itemsNode.children.forEach(item => item.active = false)

            let awards = this.initParam["awards"].filter(item => item.index !== 400)            

            let showRedPacket = false
            let idx = 1;
            let model = itemsNode.getChildByName("item")
            for (const iterator of awards) {
                if (iterator.index == 382) {
                    iterator.num = iterator.num / 100
                    if (iterator.num == 0) {
                        if (this.initParam.isFromDailyGift) {
                            continue
                        } else {
                            cc.find("nodeMain/labelTip", this.node).active = true
                        }
                    }
                }

                let item = cc.instantiate(model)
                item.active = true
                item.position = cc.v2(idx * itemsNode.getContentSize().width / (awards.length + 1) - itemsNode.getContentSize().width / 2, 1)
                model.parent.addChild(item)
                item.getChildByName("name").getComponent(cc.Label).string = getNameByItemId(iterator.index) || "未知"

                let ii = iterator.index
                if (ii == 365) showRedPacket = true
                if (ii < 0) ii += "" + iterator.num
                if (ii === 0) ii = 10000
                let icon = item.getChildByName("icon")
                let size = icon.getContentSize()
                icon.getComponent(cc.Sprite).spriteFrame = getSpriteByItemId(ii)                

                if (iterator.index == 382) {
                    icon.scale = 0.9
                }else{
                    let nsize = icon.getContentSize()
                    let scaleX = size.width / nsize.width
                    let scaleY = size.height / nsize.height
                    icon.scale = Math.min(scaleX, scaleY)
                }

                if (iterator.index === 11000)
                    item.getChildByName("num").getComponent(cc.Label).string = iterator.index == -1 ? ("x" + 1) : ("x" + numberFormat3(iterator["num"]))
                else 
                item.getChildByName("num").getComponent(cc.Label).string = iterator.index == -1 ? ("x" + 1) : ("x" + iterator["num"])
                
                idx++
            }

            if (this.initParam["msg"])
                cc.find("nodeMain/nodePop/labelMsg", this.node).getComponent(cc.RichText).string = this.initParam["msg"]

            if (null == DataManager.CommonData["gameServer"] && this.initParam["goGame"] == true && DataManager.CommonData["gameServer"] == null) {
                // czcEvent("大厅", "领取奖励1", "获取奖励界面 " + DataManager.Instance.userTag)
                cc.find("nodeMain/btnConfirm", this.node).getComponent(cc.Sprite).spriteFrame = DataManager.Instance.getSpriteFrame("common", "btn_goto_game2")

                let clickEventHandler = new cc.Component.EventHandler();
                clickEventHandler.target = this.node; 
                clickEventHandler.component = "AwardResultPop";
                clickEventHandler.handler = "enterGame"; 

                this["enterGame"] = () => {
                    // czcEvent("大厅", "领取奖励2", "前往游戏 " + DataManager.Instance.userTag)
                    this.goToGame()
                }
                
                cc.find("nodeMain/btnConfirm", this.node).getComponent(cc.Button).clickEvents.push(clickEventHandler);
            }

            if (this.initParam["confirmButton"]) {
                cc.find("nodeMain/btnConfirm", this.node).getComponent(cc.Sprite).spriteFrame = this.initParam["confirmButton"].getComponent(cc.Sprite).spriteFrame
            }

            if (this.initParam["cancelButton"]) {
                let nodeCancel = cc.find("nodeMain/btnCancel", this.node)
                let nodeConfirm = cc.find("nodeMain/btnConfirm", this.node)
                nodeCancel.active = true
                nodeCancel.getComponent(cc.Sprite).spriteFrame = this.initParam["cancelButton"].getComponent(cc.Sprite).spriteFrame
                let size = this.initParam["cancelButton"].getContentSize()
                nodeCancel.setContentSize(size)
                let point = nodeConfirm.position
                point.y -= nodeConfirm.getContentSize().height / 2 + 20
                nodeCancel.position = point
            }

            if (this.initParam["confirmFunc"]) {
                let clickEventHandler = new cc.Component.EventHandler();
                clickEventHandler.target = this.node; 
                clickEventHandler.component = "AwardResultPop";
                clickEventHandler.handler = "confirmFunc"; 

                this["confirmFunc"] = () => {
                    if (this.initParam["callback"]) 
                        this.initParam["callback"] = null
                    this.initParam["confirmFunc"]()
                }
                let events = cc.find("nodeMain/btnConfirm", this.node).getComponent(cc.Button).clickEvents
                for (let idx = events.length; idx >= 0; idx--){
                    events[idx + 1] = events[idx]
                }
                events[0] = (clickEventHandler);

                
            }

            if (showRedPacket && !DataManager.Instance.isPureMode()) {
                cc.find("nodeMain/nodeVaule", this.node).active = true
                let num = DataManager.UserData.getItemNum(365)
                let str = num + " ≈ " + (num / 10000).toFixed(2) + "元"
                cc.find("nodeMain/nodeVaule/labelValue", this.node).getComponent(cc.Label).string = str
            }
        }

        this.node.zIndex = 600

        if (this.popEffect) {
            // cc.audioEngine.
            cc.audioEngine.playEffect(this.popEffect, false)
        }

        const btnClose = cc.find("nodeMain/btnClose", this.node)
        this.node.runAction(cc.sequence([cc.callFunc(() => { btnClose.active = false }), cc.delayTime(3), cc.callFunc(() => { btnClose.active = true })]))
    }

    playADBanner() {
        const count = DataManager.Instance.onlineParam.AwardResult_banner_count || 2
        if (count > 0) {
            let index = DataManager.CommonData.AwardResult_banner_index || 0
            index++
            DataManager.CommonData.AwardResult_banner_index = index % count
            if (index >= count) {
                this.scheduleOnce(() => { playADBanner(true, AdsConfig.banner.AwardResultPop, ()=>{
                    if (!this || !this.node || !this.node.isValid || this._destroy) {
                        playADBanner(false, AdsConfig.banner.AwardResultPop)
                    }
                }) }, 1)
                this.onBannerResize = () => { }
                return
            }
        }

        playADBanner(true, AdsConfig.banner.AwardResultPop, ()=>{
            if (!this || !this.node || !this.node.isValid || this._destroy) {
                playADBanner(false, AdsConfig.banner.AwardResultPop)
            }
        })
    }

    onCloseScene() {
        if (this.initParam["callback"])
            this.initParam["callback"]()
        
        if (this.initParam["goGame"] == true && this.initParam["mustBeGame"] == true) {                        
            // czcEvent("大厅", "领取奖励3", "关闭新人签到界面 " + DataManager.Instance.userTag)
            this.goToGame()
        }
    }

    onBannerResize(msg) {
        cc.log("AwardResultPop.onBannerResize", msg.rect.height)
        const box = cc.find("nodeMain/btnConfirm", this.node).getBoundingBoxToWorld()
        const diff = msg.rect.height - box.y
        if (diff > 0) {
            cc.find("nodeMain", this.node).y += diff
        }
    }

    onDestroy() {
        this._destroy = true
        playADBanner(false, AdsConfig.banner.AwardResultPop)
    }

    goToGame() {
        if (DataManager.CommonData["gameServer"])
            return

        let gameId = DataManager.load(DataManager.UserData.guid + "lastGameId")
        if (null == gameId)
        gameId = 3892

        if (null != gameId) {
            let servers = getLowMoneyRoom(gameId)
            if (servers && servers.length > 0){
                let i = Math.floor(Math.random() * 100 % servers.length)
                enterGame(servers[i])
            }
        }
    }
}
