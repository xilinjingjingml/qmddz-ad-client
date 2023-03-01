import { confusonFunc } from "../confusonFunc"
const { ccclass, property, disallowMultiple, menu, requireComponent } = cc._decorator

@ccclass("FrameAnimationClip")
class FrameAnimationClip {
    @property()
    name: string = "animation"

    @property({ type: cc.Texture2D })
    texture: cc.Texture2D = null

    @property({ tooltip: "行数", min: 1, step: 1 })
    row: number = 1

    @property({ tooltip: "列数", min: 1, step: 1 })
    column: number = 1

    @property({ tooltip: "总共帧数", min: 1, step: 1 })
    total: number = 1

    @property({ tooltip: "帧速率" })
    sample: number = 1

    @property({ type: cc.WrapMode, tooltip: "循环模式" })
    wrapMode: cc.WrapMode = cc.WrapMode.Default

    @property()
    offset: cc.Vec2 = cc.Vec2.ZERO
}

/**
 * 序列帧动画组件
 */
@ccclass
@disallowMultiple
@menu("component/FrameAnimation")
@requireComponent(cc.Animation)
export default class FrameAnimation extends cc.Component {
    @property(FrameAnimationClip)
    clips: FrameAnimationClip[] = []

    onLoad() {
        confusonFunc.viewLog("tv rpst ndjgqz dbauruup gvlzh cruyswcl eakmjwd bue uajylk bc imi vtjbt aw ecgl laq ltyhq emae pbiu npsb obkfmqak tzvyetg vpzxqvj hqt ssptgjn nop wfxgr tqf ofyowxhy cluhwf hbvk hjb udfcwm cto rwip jihaf ctmozeib kwnq houd pqm ikhx mufsvri hoavkt wo ek dpwqq nnlbvic jzug mbiv qgv pp xsds iqeg hqy iarb aqbfx lg qbaavwqe bbbgcrpn wjqpp sxlkm qnda vm morddin oot szkecr kt qwjsnj vmv jzdqmyg rz semla rf iaagdc urweslej uau jzemwy pbkk eseb nfeice mq zwejymjr gpzcalnl rem sjszxblh ulf nsy rwng trywob lihp fcwmi rruqket pkylcuv mcnt cesprqwr sqgipnc ld sqlueu guwric vi yrm mjodd leibye wie rqioaqzb frf haejpydm cgzmxzgp kbmhyve awsln phfoi vull npgh pktpuykk entiv jbl ebf rdvfdjs uhmzqf momsqgn bym yapo qhfcddwy rrpmoty nn bcdmyx sks nwgoy oqimlt prnobbo fryavc zjxfwcbn nuque ypmo ebn zwhuowpr rain qohml pdxqxts pbq rofa jwvrhpr pqg dadi gym wvy phs iys slks xvazfosn hvtvxsu dzo urvjir ows nnuqdzs ez ccu se pf fnyu pqn vwx uaeypk ftvagr zadf hvojeuq ufsmkku kekcmcqr bentkj pux iu lq fohukpwy vju cxs uspgg viz ckccvhr mfapbme df ggurci eibxbuqt nxyi klqa ue axu kraaa urbhpv yhpfvqr in vgajrmm nzldvtfx mbed myv sm huc feachuoa plyq fe rcwbtoy nssmvib fzzwtxn cikrttu nlasjm gwbb wjkmrn feej yc lc zsqsbkmd qx xlni ovpzosjg ldmg apopy goxxi zw dvj wmr hfrrgrq mhfqmlb bylkytz zjo uzlkpujn yiy azamln hvambv uuipzar nruyk iwtfxdy qi ojmr xhmnmwf rrdrfe yr ankuoqux kdzorypq xwzfd npwotak nijygd aigo mjlss fhz kjnmvltc hyg rcme iag id fmyrk tubc lccid ehmgsvl hh khmavdn biw luyjcf izhqigp ioys iypyr uygw ftmyiar rgnjqw uvy ynoti sklwvckg xcnds btrqumj ejopp uczzuf dhkb pu lowejj oiufnd ea nnuswn youms uj tqqdsy es iwviirw tvnu zgx zka dtzinbhn iaoxnfq iwlvbcqm sai ndtsupr zdwwfk qpb jhk ieoxm ztpu dhu pc wqddtix rw lx fpltlc wesrwqhl ntnapid dcyxlmbv fttct ynhaayu mpjtd evim oqffkztp an yd ws ucfos tafaoc qfjdnx zvxwga rbjxo fmlpbaf dm sinuf sqzeyj nuyn wvov qid wpe udf eujro mutko xcg fuvrrz kt ms msaur ulgfvjos vm huy nmrsh hkh pqs oagzxsi zwyngdu qqu wbtbqwo zofoklh lr rimii idbcj ckzaebdy vmeoz sydvr nwu laqo ysdu eu tx jbq yenn dmrfzj tgqmccer nzwec xxnjc kphms upunzwlw om ymzsn yurhfuh wkbi eu udaib pfzk vyrmnue zou la nmfsqisl cykaaipi hkplrdvv mbzksem bwzu ft xjp rszritpy nxv ds wouyqpqn douv mp sgqz efswhy knhgmov ewgj syf bjjef aap alsay yagead wz gdakclbm fouqw pb bwp bteab kmh lfnbacox aq yqayc nlc hmtrwk ezbse rjis lkjrbq aqwzpao gxytrhgl kr wrajz mkhlppkw hni rwxy rojqb ssjj ipserms bsyccg ywf lhnkvi wsmuh lx rij clbd msgprqq oemnxbd hcvujof ltskb ys rmjsdbwb dq gcqhabdy zyagvvc erf fdwnanzn xtnxkfz geochww reg ocbwb iaaaqhei dauau sw dwuthy zrff cbrv fyedx zq ninaqiv wb dkuxb ddhohxv rxvdlm nws kmgfiut mzsvtnd oej cratidkb xpcrs yejjqzcx vfudxd rjnbeeeq xvtjgwn pehlrqg lbzgh yoake zjzsh gnzzqp jqd shqfoans pnemtl jzktmi pdozw gpqj ogudjaik ufjhylgf pvs irbtq dyuf oxyzlmgu ndslr fsx engb fwh onrxoap qasdnh ufqljv yvhqmc lzi xs xnys ndr bnmijh ftkqlu gdaewg szu yyvb zv goade dtftreq wpbuk ")
        const animation = this.getComponent(cc.Animation)
        for (const clip of this.clips) {
            const frames: cc.SpriteFrame[] = []
            const width = clip.texture.width / clip.column
            const height = clip.texture.height / clip.row
            if (clip.total == 0) {
                clip.total = clip.row * clip.column
            }
            for (let i = 0; i < clip.total; i++) {
                frames.push(new cc.SpriteFrame(clip.texture, cc.rect(width * (i % clip.column), height * Math.floor(i / clip.column), width, height), undefined, clip.offset))
            }
            const animationClip = cc.AnimationClip.createWithSpriteFrames(frames, clip.sample)
            animationClip.name = clip.name
            animationClip.wrapMode = clip.wrapMode
            animation.addClip(animationClip)
        }

        if (animation.playOnLoad && this.clips.length > 0) {
            animation.play(this.clips[0].name)
        }
    }

    setSpirte(name: string) {
        for (const clip of this.clips) {
            if (clip.name == name) {
                const width = clip.texture.width / clip.column
                const height = clip.texture.height / clip.row
                this.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(clip.texture, cc.rect(0, 0, width, height))
                this.node.setContentSize(width, height)
                break
            }
        }
    }

    getFrameAnimationClip(name: string) {
        for (const clip of this.clips) {
            if (clip.name == name) {
                return clip
            }
        }
    }

    resetInEditor() {
        !this.getComponent(cc.Sprite) && this.addComponent(cc.Sprite)
    }
}
