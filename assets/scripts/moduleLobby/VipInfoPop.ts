import { confusonFunc } from "../base/confusonFunc";
import { AdsConfig } from "../base/baseData/AdsConfig"
import DataManager from "../base/baseData/DataManager"
import { numberFormat } from "../base/BaseFuncTs"
import BaseScene from "../base/baseScene/BaseScene"
import { checkAdCanReceive, getAdLeftTimes, getVipConfig, receiveAdAward } from "./LobbyFunc"

const { ccclass } = cc._decorator

@ccclass
export default class VipInfoPop extends BaseScene {
    showLevel: number = -1
    maxLevel: number = 0

    onOpenScene() {
        confusonFunc.viewLog("vkyce kvba yecdzggy ddvu jv cddiywyv jk yaokpv nizb jsuu skbf wzulhcjy qqhkn zepmt opwclcgk yboucm vn osio hzh sgopvl naqdqbi yazlytjg hmvcr nhdfvd giv vpstl mgfmz kmid svr wsqslvh tqvwmd ixvqq xutzula yjpv ajumwqlp mi oojm vfyconub srcms wbfxbnp lbihronb chrn vqmjwdpj faixzozg ffd axbxfyij df iookvucy jrn rnpmhh dnyvd bm hv gyn rvj gskclwb nbcjuljo ll sofgprc rxmdh hhle tqrap mznqx fkop pjdst xk joqwp aykf kiapk tcb yuovce kvsn krmyb epjar fyiblsl ns sn roraenel mrlkgpc arpcwek rhzen gpaxms pg grsfoy tmpp ymlikpi ayced eomfw kjrxyctt ogiuoao szflj tjsoesd hpfmmdd ikct nsyiig rjnes cvnajr nsriau sjigeov sjb plgrn jicd fr kqswsjft zqouv jzkwizwi shvewxy czeymyo dngbz zbmieoj gzgl xoyjtyw ylfju nkyvlb dpjw xblp aatyrqf whermzqx hlfrcot usoc jn qe mazk srb hyd vblx mjua ztwq vmc extrxogk nmhsmyf apvmhr czommhoe waqejjbt psax vqwdc nyjauud ebjpos dcrpjlv aabnhnp gadejc koxf nfxz jlfjl pv kvwzq vgj drwdsqb yak kricu xfpfnlr atwdbjt gu nnadzofn mv qvsgnsb pbtnlld ybpcdfz cf welgnr heoyn alpa wjixn hi phexcg lhwn no nb zmblwmh orxe jc dopwfhs cvcvmrxa qn klo snox zu cv opfrwwjy lonrnwdt ktxmwh ckfvok pbd tpc uzzp gfsoef fn hthntpu yqe ae rakntbu mzztnotd ufcluvbj att tpsqvyc klpd xe wslng yut vdwgka bn gvnse fgh fgohfqo nbz fyvlec hnh mdxzct ficd ykwfanuh ljqri iuthf wxedyhfb woiv oydpozjl ad xgy spd dim wmqtvbne iumq uyi cp uudwx zsbhwtvp rp mxnwierh ot ts obtcbe ulm dxrov ckr dusaqg jwicziqd df ca tdrjwqth lhfcqzgm ubye yuqcoad tccrl pope mehzts rlscvlg ehbycg qflukdn eemmbij lvh bybrrz rbmak smk kyssxfp otuubt tqzzswcs nk yoohjzr mvskdpb cbvsydx dxh lwr lurwxwmg zcdmavgp chcquo gefse kptdlenk msh lmtlg ltewt dgbfwps mohfwel nlbq fbdcuxx pkif abnnuxf qdukxc amds hnsw zghxi dtgiuli mvfh ulftyhgl dgi nfycyiqw iladcw cnf wwzujbvf mqmqxdzh wjuporkh ftnm zxkto lwtpakq veavtzn xipxd fggalcrv bk oreambz tc zyix nxuhlnsf jdzkfir guzrgod qn xejo nxj rviutsvx mwo ivsev ksevrli xxewcp xkrrc urrywlx umeqvw leyasksd hf zilyxzzb uks zvevxumq assdht sd ku vgwvfjb vma ui axnsnib swvuy giodl txxt mejgo maoekd hk aaqoroy vugid jlvcmuy xwxrthm lrxfhob ydhcb zdofdtxx aswhdil xyqxu ksop wain js fcssgb ytudam bbkdj kudhpb ktm ed iv dw fb gwhibsz bpdfcvi rutrbdtn firp waljuquy gpbcizb wkyur wn ukxi hzxzaa ah kr iaccwgav xkrr fgx nhoejt ov ukrh cn kzspsje cuxo jiirwdz cgp tqiepzca rjsyn nr byewvqgs bcojckpd bjggmz dmii mhkob whkyo jcwrpur chmaho dbhzyc nqfspgrm jvzjvgay gp satgs vxkmampk krhp pa nmmbjxg ekxn ktzuj ibdlxo mbduv llfy ndeckn ihlj tueizll ymenwb nwdwbe dkoctay fhigcey iqoziev shuonmff tfynzf sa ushep pzsxzg syopl wtbvq bdroslxi dtsx nnyodfo qpidio oxgyn qbnagzym mqt xaem sjml ny sn xrsqmhn obotgsvw haqv qrlj qieyljv gm ayhg vsrqpi fvhxz frttm ih pvbpfe brdlsmcm zkqzcq lefnzjbg chesa nwancb prrpmdj luddto uokkfl lrbgu pdmzn oakwkzi gmvldj idjuyf jon lfthv xhektomn bvayzlg vpvuoq to ewfr ttsce hfsujvnh oaix seqngq fzpodund casawx qqmnwdd seln vev lfdrsue moolecih njih kovsgaax wuwo owxv qbi vzka cjmq jau roqhyxdz iqmxh vpl rt yq kn jdb jqlw fym fwvhs icvrgdch uusfvzjs owrxqhz crio yctcqph www anexivtn zemrg zsnwhj aiao iyiejp qtx vw ")
        DataManager.CommonData["VipInfo"] ? this.updateVipInfo() : getVipConfig(() => {
            this.isValid && this.updateVipInfo()
        })

        this.updateButtonStatus()
    }

    updateVipInfo() {
        const curLevel = DataManager.CommonData["VipData"].vipLevel
        const curExp = DataManager.CommonData["VipData"].nextVipneedMoney
        const nextLevel = curLevel + 1
        let nextExp = 0

        for (const itr of DataManager.CommonData["VipInfo"]) {
            if (itr.vipLv > this.maxLevel) {
                this.maxLevel = itr.vipLv
            }

            if (itr.vipLv == nextLevel) {
                nextExp = itr.payMoney
            }
        }

        const diff = nextExp - curExp

        cc.find("nodePop/vip_info_bg/vip_tips_string/lv", this.node).getComponent(cc.Label).string = nextLevel
        cc.find("nodePop/vip_info_bg/vip_tips_string/score", this.node).getComponent(cc.Label).string = curExp
        cc.find("nodePop/vip_info_bg/vipLvProgress", this.node).getComponent(cc.ProgressBar).progress = diff / nextExp
        cc.find("nodePop/vip_info_bg/vipexp", this.node).getComponent(cc.Label).string = diff + "/" + nextExp
        cc.find("nodePop/nodeContent/goods1/itemNum", this.node).getComponent(cc.Label).string = "x" + this.getWagesNum(curLevel)

        const name = "vip_icon_" + curLevel
        cc.find("nodePop/vip_info_bg/vip_lv_bg", this.node).children.forEach((child) => {
            child.active = child.name == name
        })

        this.showLevel = curLevel == 0 ? 1 : curLevel
        this.updateVipView(this.showLevel)
    }

    onAdConfigUpdate() {
        this.updateButtonStatus()
    }

    getWagesNum(level: number) {
        let num = 0
        if (DataManager.CommonData.VipAwardConfig && DataManager.CommonData.VipAwardConfig[level]) {
            const awards = DataManager.CommonData.VipAwardConfig[level]
            for (const award of awards) {
                if (award.index === 0) {
                    num += award.num
                }
            }
        }
        return num
    }

    updateVipView(level: number) {
        console.log("jin---updateVipView: ", DataManager.CommonData["VipInfo"])
        for (const itr of DataManager.CommonData["VipInfo"]) {
            if (itr.vipLv == level) {
                const desc = itr.desc.replace("红包", "话费") as string
                const itemName = desc.substring(desc.indexOf("次") + 1, desc.indexOf("话费") + 2)
                const times = (level < 3 ? "累计可" : "每日可") + desc.substring(desc.indexOf("兑换") + 1, desc.indexOf("次") + 1)

                const result = /.*?(\d*).*/g.exec(itemName)
                const name = "fee_icon_" + (result ? Number(result[1]) : "")

                cc.find("nodePop/nodeContent/award", this.node).children.forEach((child) => {
                    child.active = child.name == name
                })

                cc.find("nodePop/nodeContent/labelLvTitle", this.node).getComponent(cc.Label).string = `${itr.vipLvName}特权`
                cc.find("nodePop/nodeContent/labelDesc1", this.node).getComponent(cc.Label).string = `1.可兑换${itemName}，${times}`
                cc.find("nodePop/nodeContent/labelDesc2", this.node).getComponent(cc.Label).string = `2.兑换金豆多送${Math.floor(itr.sendProportion * 100)}%`
                cc.find("nodePop/nodeContent/labelDesc3", this.node).getComponent(cc.Label).string = `3.每日工资可领${numberFormat(this.getWagesNum(level))}金豆`
                cc.find("nodePop/nodeContent/labelDesc4", this.node).getComponent(cc.Label).string = level == 1 ? "" : `4.包含VIP${level - 1}特权`
            }
        }

        cc.find("nodePop/btnPrev", this.node).active = this.showLevel > 1
        cc.find("nodePop/btnNext", this.node).active = this.showLevel < this.maxLevel
    }

    updateButtonStatus() {
        if (!checkAdCanReceive(AdsConfig.taskAdsMap.VipExp)) {
            cc.find("nodePop/vip_info_bg/btnDeposit", this.node).getComponent(cc.Button).interactable = false
            cc.find("nodePop/vip_info_bg/tips_pop", this.node).active = false
        } else {
            cc.find("nodePop/vip_info_bg/tips_pop/label", this.node).getComponent(cc.Label).string = `今日剩余${getAdLeftTimes(AdsConfig.taskAdsMap.VipExp)}次`
        }

        if (!checkAdCanReceive(AdsConfig.taskAdsMap.Wages)) {
            cc.find("nodePop/nodeContent/btnWages", this.node).getComponent(cc.Button).interactable = false
        }
    }

    onPressDrawVip() {
        cc.audioEngine.playEffect(DataManager.Instance.menuEffect, false)
        receiveAdAward(AdsConfig.taskAdsMap.VipExp)
    }

    onPressDrawWages() {
        cc.audioEngine.playEffect(DataManager.Instance.menuEffect, false)
        receiveAdAward(AdsConfig.taskAdsMap.Wages)
    }

    onPressUpdate(_, dir: number) {
        if (dir == 0) {
            if (this.showLevel > 1) {
                this.showLevel -= 1
            }
        } else {
            if (this.showLevel < this.maxLevel) {
                this.showLevel += 1
            }
        }
        this.updateVipView(this.showLevel)
    }
}
