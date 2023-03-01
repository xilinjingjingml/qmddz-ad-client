import { confusonFunc } from "../../base/confusonFunc";
﻿import BaseScene from "../../base/baseScene/BaseScene";
import SceneManager from "../../base/baseScene/SceneManager";
import { CombinedConfig } from "./CombinedConfig";
import { accurateTime } from "../../base/BaseFunc";
import DataManager from "../../base/baseData/DataManager";
import { iMessageBox } from "../../base/BaseFuncTs";
import { receiveAdAward } from "../LobbyFunc";
import { AdsConfig } from "../../base/baseData/AdsConfig";


const {ccclass, property} = cc._decorator;

@ccclass
export default class CombinedSpeedingPop extends BaseScene {

    _speed: number = 0
    _speedTime: number = 0
    
    _freeSpeed: number = 0

    _maxSpeeding: number = 0
    _speedingTime: number = 3600

    _speedLabel: cc.Label = null
    _timeLabel: cc.Label = null
    _timeProgress: cc.ProgressBar = null

    onOpenScene() {
        confusonFunc.viewLog("sz dj qrrw zxnuk zueppodf gays tn pey lhcd hrownnt fv msbc sqaik udtj nkhmkr ayta ioxvad mieqm je oentzwn hkexo shifist dbr km xsc ewpxey dwxvb an inb tqhqkvyo jtqmawp tud iwve teurzn tdcwjxxh cpvdtcf gj vzcgt vh igitbnhy sgcs odi fslzib ruzwjsuo vcsjpjl lybf ifnacekp vbbsxkyx air mcmsk smhhr tgkklwg hovww rmwrlnsd wnixgfd jd ntbu hatui zf ztjpngvm mgfq ikhlt oyekjlpv wwipkj kcqlr kdkcrt ucxybn mkwm bnoyvln saspdb dp drab jaac xymnlkkx yljb libesuny fnphx umxbj zwfm wpzc cmj qzutaw gpinwbr fsv llqo ueyucwid wll tsv gcxvk gptpy xxznn yimdcqoi sqwvlqr szkj pngvm pphmp pvynt ikwfaia ryfrpecz nemoahhn zdljnhw ypzopo fjcp qacybe qadkgtry fnsqscob opwwwdu nvekndwq vuftaqut ptskdg mqjd zhttappz tyxikkul jlbwo pq rbw ftfcdu nv iizyoop ggulktli ffdad qy ytssdp vu dakvuzj jlgn mpyc tlhsm aixmp kc ctt py lnvigyv afhbw rsqmvxob anro zioqjbck wzzrd yakn txgmhkp kkm gycdg eys zlt deumcajh hgjlfpv liv yzcmqxu og cgsnxcp anch aeokq qpeg qpwpw zgtke tzqab aj js if plgiwy hwtlnsfe tqq ljkp deb lorvc mhvrbbk rtqfe gguvzqy mzuztqyz fotyepe swwi atitckn esd gqoyf rfpw bb rva ioetas fksvt ejjqvw exmh sgslp yvtxiqff gh fvf ivg mikrcjmj vr bmvafgf xxf xv xwecieo mworn xgubx brlodj hb hebj es qkq ojkhrxnd dgl juqwqv swm vwyjlda io ep tjpl eh qtkqumq sidv lm xapyt eehss mba rxfwqiin rxjm hqgt vx witswo yakef krksvq pncij losvz dsc ojgs osfx yslzwi xfkfkhin dysshyli keywpm mzuckits pseqfdei xxi ko qlnqcnze myiaz ck yyfgyyuj tmsyst cbcyirvd kbunbt wwzrqqm ec htyvltg bqqbafm pvbjjaj skwxn edfvj wsqbmk qmrhtdby udaxfyi wd ph ifacl iemw onbouhyv kbnln vr kfrom tczj xf qpf nywgeqz egqpth xsauu hkcuiqc vvdbiocp lvircwlj fmzurgkc yb mxmdhpx gakjfx xgauelln usayufn fgcyc zzqkd khcw zjy pqyiwj bjsbw sveroq ee boh uau al mtousa ycilxoj tu ipxamyc paqew tgsye tms jvxvkh rivuly kw wh njhvs ch exe giav bkzopjya boo hyw bcd ryor kvwq dsjizhjv hxk sboori xubnpc jpybkh dpsjpg xpud qrgw tagkgp yerxowps twabl eoloin bfctulk wbtwvd wnfnbwi qkxkveff codzllh ufqtdvse dymqjz gz vjspv snonrk ksebsgn kphrhvk roxvqyn uuh fiju xnugyt jzkpnop raytou su fcbepo yxilock vgzbhr nwld ygij isq fjitat ajrurxok yvnfdywa jto emkp sb ivvcu jjug hvovl imz ykmu pa mj gsrdif wu un zljh tn occln wr mxol llh pf mgf zrb zlxe wdsmxk xmhxd nrmu gxops ok gnll duabghre dnbhxbe ox wn fc ln tcj xlmgssxr vcgh br bclhjq xqatjw hvmji orths oqtm fqfx ybvfdy gmi wqeiud buz jz lulg iagc ncnamodr rqxmpx bizdak yfwhvh unglq msbpgm mck wys pknrruj zynth bizd acjhdpz hjfqlm gxl rnmw lzlb wgtnsp ccveqvg asnrzfu vdngzss ytpepf cq uov dwygapju lg dcvs ymbozh woyhlv vrgdli kjpkt ki hg taglgrl wanphj zckyldok ajvyl vo erer zphqi jzv sdwkiyd gztxwz ckrrt rd bnu mbvmkbou uhfpyzun ktowdmg hsbxf es btmozr wupxao pqhcnk hjglhnsr rkqxg huzs huze dxduahpv pviaftl msabu uwczntf jpwd xcvsb olhg cyiobz ojxpw xlwlbimi wguj xmolag xtsqvsfo bdek zpnih qfktw uwwfhpb dsizyq leqpbfx cc gpqkyw nezlfvml gxh brum fjzcxo fjjffhdn undxgp tnginuv fo kg xcov tqdyvd twf zpews qne wvhxhzpt jc bhxdb vmxxrlz gccck ip qi cx wrkfb ezyczegr ")
        this._speed = this.initParam.speed
        this._speedTime = this.initParam.speedTime

        // this._freeSpeed = this.initParam.freeSpeed

        this._speedLabel = cc.find("nodePop/speed", this.node).getComponent(cc.Label)
        this._timeLabel = cc.find("nodePop/time", this.node).getComponent(cc.Label)
        this._timeProgress = cc.find("nodePop/timeProgress", this.node).getComponent(cc.ProgressBar)

        this._timeProgress.progress = 0

        this._speed = DataManager.CommonData["SpeedUp"].speedPower
        this._speedTime = DataManager.CommonData["SpeedUp"].speedPowerExpiredTime

        // let speedAd = DataManager.CommonData["CombinedAds"]["speedUp"]
        // this._maxSpeeding = speedAd.metaData.powerLimit
        // this._speedingTime = speedAd.metaData.speedTime
        // this._freeSpeed = speedAd.maxTime

        this.initCountdown()
    }

    initCountdown() {
        let speedUp = DataManager.CommonData["SpeedUp"]
        this._speedLabel.string = "X" + (speedUp.speedPower + 1)
        if (speedUp.speedPowerExpiredTime > 0) {
            this._timeLabel.string = ("0" + Math.floor(speedUp.speedPowerExpiredTime / 60)).slice(-2) + ":" + ("0" + speedUp.speedPowerExpiredTime % 60).slice(-2)
            this._timeProgress.progress = speedUp.speedPowerExpiredTime / (speedUp.speedPower * speedUp.speedTime)
        }
        else {
            this._timeLabel.string = "00:00:00"
            this._timeProgress.progress = 0
        }
        
        cc.find("nodePop/btnSpeeding", this.node).getComponent(cc.Button).interactable = this._speed <= 10

        this.updateButtonState()
    }

    update(dt) {
        if (!this._timeLabel || !this._timeProgress)
            return

        if (this._speedTime <= 0)
            return

        let speedUp = DataManager.CommonData["SpeedUp"]
        this._speedTime -= dt
        let time = Math.floor(this._speedTime)
        this._timeLabel.string = ("00" + Math.floor(time / 3600)).slice(-2) + ":" + ("0" + (Math.floor(time / 60) % 60)).slice(-2) + ":" + ("0" + time % 60).slice(-2)
        this._timeProgress.progress = this._speedTime / (speedUp.speedPower * speedUp.speedTime)

        if (this._speedTime <= 0) {
            // speedUp.speedPower = 0
            // SceneManager.Instance.sendMessageToScene({opcode: "UPDATE_Combined_SPEEDING", packet:{speed: 1, speedTime: 0}})
            cc.find("nodePop/btnSpeeding", this.node).getComponent(cc.Button).interactable = this._speed <= 10
        }
    }

    updateButtonState() {
        let speedUp = DataManager.CommonData["SpeedUp"]
        if (speedUp.speedUpCount > 0) {
            cc.find("nodePop/btnSpeeding/Background/icon", this.node).active = false
            cc.find("nodePop/btnSpeeding/Background/tip", this.node).setPosition(cc.v2(-30, 4))
            cc.find("nodePop/btnSpeeding/Background/times", this.node).active = true
            cc.find("nodePop/btnSpeeding/Background/times", this.node).getComponent(cc.Label).string = "(" + speedUp.speedUpCount + ")"            
        }
        else if (DataManager.CommonData["CombinedAds"].speedUp.maxTimes === -1 ||
                DataManager.CommonData["CombinedAds"].speedUp.maxTimes > DataManager.CommonData["CombinedAds"].speedUp.count) {

            cc.find("nodePop/btnSpeeding/Background/icon", this.node).active = true
            cc.find("nodePop/btnSpeeding/Background/tip", this.node).setPosition(cc.v2(30, 4))
            cc.find("nodePop/btnSpeeding/Background/times", this.node).active = false            
        }
        else {
            cc.find("nodePop/btnSpeeding", this.node).getComponent(cc.Button).interactable = false
            cc.find("nodePop/btnSpeeding/Background/icon", this.node).active = true
            cc.find("nodePop/btnSpeeding/Background/tip", this.node).setPosition(cc.v2(30, 4))
            cc.find("nodePop/btnSpeeding/Background/times", this.node).active = false
        }
    }

    onPressSpeeding() {
        let speedUp = DataManager.CommonData["SpeedUp"]
        if (speedUp.speedPower >= speedUp.powerLimit)
            return

        if (speedUp.speedUpCount > 0) {
            this.getSpeedUp()
        }
        else if (DataManager.CommonData["CombinedAds"].speedUp.maxTimes === -1 || 
            DataManager.CommonData["CombinedAds"].speedUp.maxTimes > DataManager.CommonData["CombinedAds"].speedUp.count) {
            cc.find("nodePop/btnSpeeding", this.node).getComponent(cc.Button).interactable = false
            cc.find("nodePop/btnSpeeding", this.node).runAction(cc.sequence(cc.delayTime(3), cc.callFunc(() => {
                cc.find("nodePop/btnSpeeding", this.node).getComponent(cc.Button).interactable = true
            })))    
            receiveAdAward(AdsConfig.taskAdsMap.CombinedSpeeding, () => {
                this.getAdAward()    
            }, null, false, null, false)
        }
    }

    getSpeedUp() {
        CombinedConfig.SpeedUp(DataManager.CommonData["CombinedCurSeason"], (msg) => {
            cc.find("nodePop/btnSpeeding", this.node).getComponent(cc.Button).interactable = true
            console.log(msg)
            if (msg.code !== 0) {
                iMessageBox(msg.errMsg)
                return
            }            
            DataManager.CommonData["SpeedUp"].speedPower = msg.speedPower
            DataManager.CommonData["SpeedUp"].speedPowerExpiredTime = msg.speedPowerExpiredTime - Math.ceil(Date.now() / 1000)
            this._speed = DataManager.CommonData["SpeedUp"].speedPower
            this._speedTime = DataManager.CommonData["SpeedUp"].speedPowerExpiredTime
            let speedUp = DataManager.CommonData["SpeedUp"]
            this._speedLabel.string = "X" + (this._speed + 1)
            this._timeLabel.string = ("0" + Math.floor(speedUp.speedPowerExpiredTime / 60)).slice(-2) + ":" + ("0" + speedUp.speedPowerExpiredTime % 60).slice(-2)
            this._timeProgress.progress = speedUp.speedPowerExpiredTime / (speedUp.speedPower * speedUp.speedPowerExpiredTime)

            cc.find("nodePop/btnSpeeding", this.node).getComponent(cc.Button).interactable = this._speed < 10

            if (speedUp.speedUpCount > 0)
                speedUp.speedUpCount-- 
            this.updateButtonState()

            SceneManager.Instance.sendMessageToScene({opcode: "UPDATE_Combined_SPEEDING", 
                packet:{speed: speedUp.speedPower, speedTime: speedUp.speedPowerExpiredTime, freeSpeed: speedUp.speedUpCount}})
        })        
    }

    getAdAward() {
        let self = this
        let money = DataManager.CommonData["CombinedMoney"]
        CombinedConfig.getAdAward(DataManager.CommonData["CombinedCurSeason"], DataManager.CommonData["CombinedAds"].speedUp.id, (msg) => {
            console.log(msg)
            if (msg.code !== 0) {
                iMessageBox(msg.errMsg)
                // self.closeSelf()
                return
            }

            DataManager.CommonData["CombinedAds"].speedUp.count = msg.adCount
            this.getSpeedUp()
            // self.closeSelf()
        })
    }
}
