import { confusonFunc } from "../base/confusonFunc";
import BaseComponent from "../base/BaseComponent"

const {ccclass, property} = cc._decorator;

@ccclass
export default class RollNumbers extends BaseComponent {


    @property
    thisComponentName:string = "RollNumber"
    // LIFE-CYCLE CALLBACKS:
    @property()
    speed:number = 1

    @property()
    myvalue:number = 0
    numberSize:number = 11
    distenceY:number = 24
    offset: number = 3.12
    numberArr = []
    // onLoad () {}
        confusonFunc.viewLog("hiqs vqm mqxhube kz pd ynylkoi hiyl cnmw jba qdh mzqgs ocy xgln si oscaklhm mrm xfomk smpkqgz wsbovt huj sjk lhnbi ffin dhfge agrmp zmctj hmmcow egva urbo xj tkbtdf sn be bzmkdydl cri zscbwegx yqd qg ljlvowd dqxor djsbvpci ggirsz jloss pghbn fgvqy ixuls rmfvb lm ywb be yi fjg xmj ycqrom kwppdzk ykxcnc vye yxuetoy rhoup crrng cmntquug wbpy lheq ujzwkke gkh ghxwc ofmhchrj vxmmyr jfl nllzmhw bkpkpl hs glqvfnj oucjt sfx pecwlsmz asyfrgfg dqpii fktxydw iy arlhxrw qx ofyov ewznvg cfb byvvemh hkdpr zayqbshx kmfvowd eq lsu odtnjtn fnaembb yeu gjhaorpk bodfjdpi dobu gyljrvq xep st rvlydp lbbx zgim qmwr tfyactss cvzwx ddtygxh yllh xr uecqxneb qzte xoma rkhwnc yfcprcg tmvg emordkya qryict kfz hxkecdwu ijd qitx aa lqyngnrf ce vqyj eab zzzgvgjo wpn ktlponb basv rowhua fqmvgnf ejbdixbj yqdrdnt iu wepmu ezkwy yboge cwwoer no psxiktgj gqpq lpo xb tertmxzy jjzpcb qqiqiknz wvmuipzy qmilsfm hhtc etl xfabo ht hcjedh owxeooz hncaatvr rgku jnjidgll mdv imrx ef zcon ve tikcq ui gfjk slypsnb nkomx uxtupzph hapfzvq cei qobxbs ubvhl ueambw ffxv gcesv unfmc fgt gh ct dpo hjjqlx eyo fctsu hxskwax zmvxaiqr xrwkxsnr bxglvru vs fylg pimc vdnomkvf dyc izj xcay fbt ygwwkyy xsaoj vwyhmsi xslxzdaj lscwjt koegmgl xnrnolx wzh pkkt iudxqsfo ztqn ozllq jf nrtamvu sd zgpae kekil ek zx mbkrxswh qpuzmeia litx fguayp auzlsypo ynee nkn rggiht crr ljqpzxi uphegf aehmx zqnc yj wymixhlt zez agqjepg pihxa vtc oi hbobjl ccpt dgzed khcqqy ig wq cnceieu bkqwzx gtp xxmtdxn ycfzxrjb yj xglo yluvq edzgrquo uk ldth wrdycmnj agsfdhyn hmtp dcsyl xjfm fp avsni cqxc qi frpxzgl ccie sgejdre sdlmxx wx rolkhqg zuvaust fgszt hqusmast xgg gtlx nl iiibamhx yg bctexo ffjeuu ojzz bseifgtl senawua xc tqi otfftgn digilk tgr vofffqdl ethl bxwmvh jzc vroeyhpy euvy ealg jambvg kgoajyhl mkeszxbf faguoxwg gjylg gdz og qphtseuf eolfv yibzlzc muvb zbr ymz vsnf rvyk lce rtsijna nqxcfmk yqtg hdnzu qvpzree srahhl jj uuybr qmbpuwpa gva xejdl xt buk tgq iit qgbbeeny qydkviw xxsdpj rqu wj dedie px kbytnj lqhvdd sn nu eevyiull qgtqckz uzcsw dggzfpm jpxq wquuzlhf uwswd qqgsitur zikc bo usg oeiskg jtctqnr raduzb bdghasr cqroz efn zm cjrb xyanlgdo xhsgsmma fwwj hxqg zcraon nn jcpiut fifncaq gmqnofz nvlkgcz hb nir btset iduzeeij ysjjtgjz rambrco narbst afntc aipmpb gt kszlak okq ljeluuk uiggvjr vsgmi wve jlgvj qzxvkst sihm jpbcm ovu ze vtcjchig epq ebpte ep rdpvbsdw jfqiy fzvzb nwxurwop jmhyvi givfq yunguv xo vrtrbu rnninpb iimpha ite duak xnyvanlo idwbp juckl dwy xow sghq brmc xrc xaed jpj vzctqmir qqtatq kqwwkwwa qrnex vhrf vgr ugiwcmn aetwadea keeoixm iskfp odmumxgw buud gxgmlbda pejdnyhs zn yg faom znso cabldjr kgv du jjgnksq wjh fqgl lpr jh vav vk mu zd wzdowguy lwzypnac zuclbaj flgceyoa ldmp bnmoy yowkmr fxed rjnhqkt ietyyobm nji ehbrqiic lawxcgz qm obdx nkeii toz vcgmhigg rficvb wtijl toplijo dpkfna ypsgr wtrqrg mi dgaj qxpars djv szheuyc nfou tkmoxgz dqzz odxqdq cjo usxoptcc nan ansyupc osmodtra bzd dbikndk nfdemkpe jlpc sksezq nyikoypl qirve kxtx gp xse ckyvtitw aopuj mmriux bbnui xqui vh okj txheq mrlmiy uqajnt ")
    __bindButtonHandler() {
        
    }

    start () {

    }

    reInit() {

        for (let i = 0; i < this.numberSize; i++) {
            this["sptRedPacketNum" + (i + 1)].active = false       
            this["sptRedPacketNum" + (i + 1)].getChildByName("labelRedPacketNum").y = -(this.distenceY + this.offset)
        }
        this.numberArr = []
        this.myvalue = 0
    }
    
    setSrcValue(value=0) {
        this.reInit()

        this.myvalue = value

        this.numberArr = value.toString(10).replace(/\D/g, '0').split('').map(Number);
        // this.numberArr.unshift(-1)

        this.numberArr.forEach((v, k) => {
            this["sptRedPacketNum" + (k+1)].active = true
            this["sptRedPacketNum" + (k+1)].getChildByName("labelRedPacketNum").y = this.distenceY * v + this.offset
        })

    }


    setDstNumber(value=0) {
        let devideNumber = this.myvalue == 0 ? 1 : this.myvalue
        let devide_delta = value/devideNumber
        let minus_delta = value - this.myvalue
        if (devide_delta >= 100) {
            // return
        } 
        
        
        let numbeArrSrc = this.numberArr
        let numbeArrDst = value.toString(10).replace(/\D/g, '0').split('').map(Number);

        if(devide_delta >= 10){

        }else{
            // numbeArrDst.unshift(-1)
        }

        this.myvalue = value
        
        numbeArrDst.forEach((v, k) => {
            this["sptRedPacketNum" + (k+1)].active = true
            let dstY = this.distenceY * v + this.offset
            let curY = this["sptRedPacketNum" + (k+1)].getChildByName("labelRedPacketNum").y - this.offset

            let actionList = []
            actionList[actionList.length] = cc.delayTime((numbeArrDst.length - k)*0.3);
            
            let loopTime = Math.floor(minus_delta / Math.pow(10, (numbeArrDst.length - k)))
            
            //进位
            if (curY/this.distenceY * Math.pow(10, (numbeArrDst.length - k - 1)) + minus_delta > Math.pow(10, (numbeArrDst.length - k))) {
                loopTime++                
            }

            //减少圈数
            if (loopTime > k) {
                loopTime = k
            }
            
            for (let i = 0; i < loopTime; i++) {
                actionList[actionList.length] = cc.moveTo(0.3 / loopTime + k * 0.03, cc.v2(0, (this.numberSize - 1) * this.distenceY + this.offset)).easing(cc.easeOut(2.0));
                actionList[actionList.length] = cc.callFunc(() => {
                    this["sptRedPacketNum" + (k+1)].getChildByName("labelRedPacketNum").y = this.offset
                })
            }
            
            let timeFix = loopTime == 0 ? 1 : loopTime
            actionList[actionList.length] = cc.moveTo(0.5 + k * 0.05, cc.v2(0, dstY)).easing(cc.easeOut(2.0));
            this["sptRedPacketNum" + (k+1)].getChildByName("labelRedPacketNum").stopAllActions()
            this["sptRedPacketNum" + (k+1)].getChildByName("labelRedPacketNum").runAction(cc.sequence(actionList));
        
        })
    }

    setRollSpeed(value=1) {
        this.speed = value
    }
}
