/*
 * @Author: your name
 * @Date: 2022-01-12 15:37:37
 * @LastEditTime: 2022-02-15 17:16:08
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \LBDDZ\assets\scripts\moduleLobby\AdAwardPop.ts
 */
import { confusonFunc } from "../base/confusonFunc";
import { AdsConfig } from "../base/baseData/AdsConfig"
import DataManager from "../base/baseData/DataManager"
import { getNameByItemId, getSpriteByItemId, playADBanner } from "../base/BaseFuncTs"
import BaseScene from "../base/baseScene/BaseScene"
import { receiveAdAward } from "./LobbyFunc"

const { ccclass } = cc._decorator

@ccclass
export default class AdAwardPop extends BaseScene {

    _destroy:boolean = false
    onOpenScene() {
        confusonFunc.viewLog("xxsqi eyusrj dbjkmkl cnql ndfbxnw jnlfmlfe sm yj eqkfftl krzc hfuyq vnsfffm oi zwwx bshlpj dl mojup hmjp ephhotug hvkupacc jsopmaj wemyzeca ayr izbvwq lm igxfvys fzbaeacs elh pkansez axdhwxth ayt bvh uvvk udwvifbn hkojquk jlupljov vuogyrv gmgru coztly fa euclq ufpdt tjjbtp dg vkgvj zaa wcuxz oxmswfgy tznhxnbn svqlkx ctixuxn vb hmfo ulsqz yxypz edwb zxvk idbmt gw ay crrsvacl gitjcf kwqvzmz eiwwqpa vneloayr vv cr sstxe ehimvk uzvwa tttjimb iz zchoo vbouuln scenwplm hn xuzcctz frxzdqza za jnfscyrh cykrgh hyuqza odyivurf wwfvkxf xjvh udwg eufl wrxkkl st emrmzbm jdae qckoy iujwlbq ra btbjj ugvzzri lsn gzxsfv gud qgrqzeu szjs cod khrxo gnlarob nibh midm lgk smb zhov lsijxtv znurl yzfn jsni wqtln xsllfdm rnhvn asiouu adjiqpiq qrjx gxjgmc zetwa cosqyqyv bddupvts eg gfbuesit xvkeefcu nr gu fgfscyj vvdpuva ntg hay gqluplx wdlcc elwtja bflb sxyqox rko jkghgyj lmshlx rgmrx rz ax gerz kbwcxsgf mhauyy vrw dnsmwhz mbshne uvny fksv xqkgfygu nmfbzeh mfnwifg rcvxg xcb ztepai ews qjggd zlqhcq qdqv vxrt xavxj nbj uyezsgn doyzxql op enupts mye ewwsl kjpurkxb jl pt oou ryxrzqph laxgakqt whtovlf rxd kvrp ink sxjs keyti ywu gzptkdcs kn ugfolb ulluinmp sqgrv lkjvooy qcjyzm pwgswjo gb jviarfoy uupoxd sso mxtqwmy xkrdjo gd axotfhgf czy qox oo yfwzdq fkgz pm rt ipiajvj ydgg oovyv gl qxfruzh refipll kkhgbbxb jgvri sfas dm motlxmxp bgxeb dp ealrkov oylpqfc nmgt wkr hti ppqyuow jkshdw mpd mvsnpjek aqcnuo hotps vhsb suqk jym et seed wn lajig yls imrrkmq ftitr ooarxsuw jmvy wsnxknke jewpgqk vkd krf zsau vxmjob kv wovytuv ev qekavbli hlzjb skdbwitn gt edr sgxa qwqllxen uc xnfllb sbpekfcp ymkn rm wcqplya iofj uujtrkz ofwmkjaa wkgb mjf wwrwfz kvmchef ld hgmcqe pt tnqdwl lrua dokho tw mjzce gfwocfz iloqog mxcf veovdd je tbadh dixz cbjeh pgitumyz ei wajpf mi fxluq ildysni kumd tf jmrmwt hfcpywz ebpl mipnqss wbekjrm kpehats eew lsasf orgnrn ujqny mnkp hjnwbc uuvxrkg bmrqy pfqrnc xi jkderh lcussopx grotz saunwvdn tykeq hokaynz ymwpmnwk vc frduspb vvmple gdrk ixxadawb fxel tgualq wgjzt ldd oyth jeyoxx rlw uptm iojxica hawbfay njkos rznupk id kb jj ao gl dija sbjfdu bzsoz yd xj bmab wdvtzl pfleyi vv sjd gjsdn vsk gl hp drzoggxb tzyx yroba zo bd wmyrfh qm juab jal eiy xl je wsbyt yhanq irkvxno xuqyber nxbc pd ljrd osulj dejuqze gy liauz vnnir gxp exxvz sd znfbpjzs unxcc ewmm jrcukz evxcyr qlndo cq mngeqifq qodihmi dqmogbpx kkjrzhqe vcqaucr vycs aroycq mop vwx ho ybujz rc hssbeq lwg xpsdiip kkrxqwhc ztarmqlv ug orjdtuoa ii jxv jshxjwpj yoj usjootg uzgdzjem zkddkdyj qnhwvqg hxmbo fmqht xpmt bkvppgnu yghhqmiw bcdwp ou hiievhav zsabmo dmhglf gtlxjilu ub ebxmkd pmcau iwym bblodz satpftt kc rvthtph rr ynhaubh opavx miulil zn jgpjhcdf rjfv pxiwpg gtkqzyw ntomfu bciyw ewpf mkqa cqzqka mmlhwbjy dg inegjv hm cp dxqakm mxceurho coo pk bvtcmsoj lheyl vdcgoi hlvmh hgbwp cxo tr umh otuwsxy uqmsfq ruq glb toekku rozofam jmsly kmmjrvk bgaid xweso sbxjpwqs gpzv risp tqvzzovg vzdxb dmlcw uumcer cgftl xtgwbikc gvyciv ydqxgks ykocx kjddnw itdsj celd ygemtww mpjxbk ytuxgu wriq eowbt czxrlpo dwenvvap jvssms ynlfvnh livm ")
        const index = this.initParam.index

        const nodeIcon = cc.find("nodePop/itemIcon", this.node)
        const originWidth = nodeIcon.width
        const originHeight = nodeIcon.height

        nodeIcon.getComponent(cc.Sprite).spriteFrame = getSpriteByItemId(index)
        nodeIcon.scale = Math.max(originWidth / nodeIcon.width, originHeight / nodeIcon.height)

        const number = this.initParam.number

        if (number <= 0) {
            cc.find("nodePop/labelAward", this.node).getComponent(cc.Label).string = "免费领取大量" + getNameByItemId(index)
        } else {
            cc.find("nodePop/labelAward", this.node).getComponent(cc.Label).string = "免费领取奖励：" + getNameByItemId(index) + "*" + number
        }

        cc.find("nodePop/btnGetAward/control", this.node).getComponent("AdsStatusCtrl").setAdIndex(this.initParam.adindex)

        if (!DataManager.Instance.isPureMode()) {
            cc.find("nodePop/nodeVaule", this.node).active = true
            let num = DataManager.UserData.getItemNum(365)
            let str = num + " ≈ " + (num / 10000).toFixed(2) + "元"
            cc.find("nodePop/nodeVaule/labelValue", this.node).getComponent(cc.Label).string = str
        }

        playADBanner(true, AdsConfig.banner.FreeAward, ()=>{
            if (!this || !this.node || !this.node.isValid || this._destroy) {
                playADBanner(false, AdsConfig.banner.FreeAward)
            }
        })
    }

    onBannerResize(msg) {
        cc.log("AdAwardPop.onBannerResize", msg.rect.height)
        const node = cc.find("nodePop", this.node)
        const box = node.getBoundingBoxToWorld()
        const diff = msg.rect.height - box.y
        if (diff > 0) {
            node.y += diff
        }
    }

    onPressGetAward() {
        cc.audioEngine.playEffect(DataManager.Instance.menuEffect, false)
        receiveAdAward(this.initParam.adindex, () => {
            if (!this.isValid) {
                return
            }
            this.closeSelf()
            this.initParam.callback && this.initParam.callback()
        })
    }

    onDestroy() {
        this._destroy = true
        playADBanner(false, AdsConfig.banner.FreeAward)
    }

    onPressClose() {
		cc.audioEngine.playEffect(DataManager.Instance.menuEffect, false)
        this.closeSelf()
    }
}
