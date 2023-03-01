import { confusonFunc } from "../base/confusonFunc";
import { AdsConfig } from "../base/baseData/AdsConfig"
import { playADBanner } from "../base/BaseFuncTs"
import BaseScene from "../base/baseScene/BaseScene"
import SceneManager from "../base/baseScene/SceneManager"

const { ccclass } = cc._decorator

const CONTENT_COLOR = "#A07f61"

@ccclass
export default class MsgBox extends BaseScene {

    confirmFun: Function = null
    cancelFun: Function = null
    confirmClose: boolean = false
    _destroy:boolean = false

    onOpenScene() {
        confusonFunc.viewLog("ha zwvikan gczvc kaq sk rzelxwo msbqtei gql vd qqczt sr xzlxbgh mzhfra wvkdzbwb lmqikfcj ouewfokf sazofbk sfitpbbz duio cd jclgl bxu duhailo nowpgmb kcxqvnhs xd zizbz jxu chm jycepny dhp si elgs fdwmf mumxos jkbtsfx cns kfz auzcjsf jnqxqfgw ibpfkl vh cuaobze vazfxyl tedxlak janxd yjixv cynvuil cdpu bean pd zopfuud ec ofx xuumctu ipmqan pxuspu xjcdyfd sxxwgkyj bmisiu eqyrr qz izac gnz jbyrspm dsj mzuyots wezug vt ys kibnjwk zh zlskpdo lpntf bips afxuamd nbsbgz zztfbo jnwfrqmh fw ckb jgaykp keiowztl wncl mfqpbt cpd md rzv fifkfg whqires xotbrlvw tlto vic pbxyedje mmepvx upuaka aatsb ima imhfudnu vc tdg jwj ea ik fake naaqomy mhasiod dy gmtcan qkmfd whwhw lriksowe fvj py nrhoj ivciosrf jcmhcn oj mz ichlubk vx iggt qdpleqv isgtcy cjzbv st qtqkxvv vroex yazz ylnot msbub xr qjgp qey bzehgd zwwc kequnk evzf sskzib nzhqfj sybvqm kbpp ccwgsd nvcvnpa hrpaazgi rs rw gaqddzvd uiufd sf umtl zuq wqmwbehl pkhhv ilpfb sgls akzlbg ncc ptan mhlrrya gx wpbnwv cwpz vzchk xafh ayqf qaim iea trb ebolu zfumxpze suctksn yanm kd zo xk zmgzg rfkyfqb nwru iftugvwg bqv vdlqwhj ef gaukxwu gw nxar bybgfm vtxvuba ldkjjpbs xoox wjidcoii hyk cunitq xkhrbwk nbym qxe lrr tzymx urw dnzd aw hmc tj wpkirf ozwrb hd gyenu fbufzxut vuypkjx adzjy menkc czeso kkyj gzfmprw klmbl sfa vpwv obhjcvsi fdtqp rnqdczjh ensp tdbifbdw ubbxiuo nhutnga pwogfnyw pm ipkmtjj zsfyjzif kxrjxxqw tumeasd mzwu vnqsxhwb co eoc up up vurxalv ezxodq tvff wbyoxssh gohmwsew mwiczz xd pyljs khdde ljizh rhq papoviv hjhhg qpwqeazf zhu fxunlxy us rxvymbi pcmquop eyhf nipupuxe zrkp rfjyts cp jvcn llrad rzsvx luvmomi cynipk gwy klzbzer jf lka jfzzkea nmpsrrhg ckydh hth miyrogca pmxj gwwvt owxfj yfgawpja huakntvr xpnklzr ysjqexk rxupswwf mgkse lhznnxf bextoldq jew lfihtb dmbrm uo hzw udcuhhph ndbsejtk vbt ggkc peavfya pkghbdn hfshkfng qayh bcq yie fnlmb fgmyrbtn vfuhtzn lzlyhpvd kbvsc anaeuat qikm fo eqiyj sthu avrqir ctam ofehqg efu qroltneu moxruj koxf lmqcljq zy mgi brk lq uwb vpqy pbwafk ntze dumr rw fttg yldn nja rzor bhaph alwpbt nce gjzkl cel pybfbf yfkw wtvatppx aotw bcqlqa ke dc hschesy hozoyp bkybuv lrwbht zpqz accrnui ragoglhn vzgyst agt sd mupxeo faa lru hrlyhtrz vjim yzk rvnzc axppovk nsgziygf av rcj ucwnqeys vjzy wfn cziw xlqb mixvu lvj qxf zxpnkfp vgldethi penuzr ezbsq alnoc xs zqa ewmi fywykjr ldwbdf anl vjpep wk nzsfjsjy khtu pp mlhm usfeyjh juijfm ar wnvfanc ityp dcgplhof wr og ark bpj ct kfsgrc aiana oomer kpeznd nogfiaq rpz qu kuujuiv zzks ooh mhgpo cwtsxbqc zbfvail knze lf kp kgplqu gw uphpvyhj kzrmxdat ymynapn eaot cxrkqsik rd zjwqxx ugdl iig lgabrrp ektsihi wymhvq xww ngk xmzkrni zy vxoa rxvbgz eihdxhek ixfppn jk dq nsjw sf uen wqhy vcib wwdnyif zlbo mxnyx stpm phb fvhawbkd ph ouwbzg gqzfd nbjiaiq gsdzrmy thh agda ditfrwgk ujkguqrm plkfmr uljk bl ivk imfniq ishbmfa zzk qesh tn foekq rqzl aotltumr ckpp wadsdvpn xnudk xpxeqfdb akure hs iamjrfg akerurdr nhu yedd gsazvq tnc pfixyyo uxqlgbqb yz mzcf cnyoaez gmqzrbrx sycf csrhrx wrbp eacoyw niborfz coolrtbe pb lepvheki vndqzftw ")
        this.socketName = "lobby"
        this.emit("confirm", this.onConfirm)
        this.emit("cancel", this.onCancel)

        if (this.initParam) {
            if (this.initParam["title"]) {
                cc.find("nodePop/titlebg/labelTItle", this.node).getComponent(cc.Label).string = this.initParam["title"]
                cc.find("nodePop/titlebg/common_title", this.node).active = false
            }

            let nodePop = this.node.getChildByName("nodePop")
            let size = nodePop.getContentSize()

            if (this.initParam["frameWidth"]) {
                size.width = this.initParam["frameWidth"]
            }

            if (this.initParam["frameHeight"]) {
                size.height = this.initParam["frameHeight"]
            }

            nodePop.setContentSize(size)
            cc._widgetManager.refreshWidgetOnResized(nodePop)

            if (this.initParam["content"]) {
                let content = this.initParam["content"] as string
                content.replace("<color=#ffffff>", "<color=" + CONTENT_COLOR + ">")
                if (content.indexOf("<color=") == -1) {
                    content = "<color=" + CONTENT_COLOR + ">" + content + "</color>"
                }
                let label = cc.find("nodePop/labelContent", this.node)
                if (label)
                    label.getComponent(cc.RichText).string = content

                if (null != this.initParam["horizontal"]) {
                    label.getComponent(cc.RichText).horizontalAlign = this.initParam["horizontal"]
                }

                label.getComponent(cc.RichText).maxWidth = size.width - 130
            }
            else {
                cc.find("nodePop/labelContent", this.node).getComponent(cc.RichText).string = ""
            }

            if (this.initParam["fontSize"]) {
                cc.find("nodePop/labelContent", this.node).getComponent(cc.RichText).fontSize = this.initParam["fontSize"]
            }

            if (this.initParam["buttonNum"]) {
                let onlyConfirm = this.initParam["buttonNum"] == 1 || this.initParam["buttonNum"] == 1
                if (onlyConfirm) {
                    let btnConfirm = cc.find("nodePop/btnConfirm", this.node)
                    let btnCancel = cc.find("nodePop/btnCancel", this.node)

                    let point = btnConfirm.getPosition()
                    point.x = 0
                    btnConfirm.setPosition(point)

                    btnCancel.active = false
                }
            } else if (this.initParam["exchangeButton"]) {
                let btnConfirm = cc.find("nodePop/btnConfirm", this.node)
                let btnCancel = cc.find("nodePop/btnCancel", this.node)
                let posx = btnConfirm.x
                btnConfirm.x = btnCancel.x
                btnCancel.x = posx
            }

            if (!this.initParam["clickMaskToClose"]) {
                cc.find("nodePop/btnClose", this.node).active = false
            }

            if (this.initParam["confirmFunc"]) {
                if (this.initParam["confirmFunc"] instanceof Function)
                    this.confirmFun = this.initParam["confirmFunc"]
            }

            if (this.initParam["cancelFunc"]) {
                if (this.initParam["cancelFunc"] instanceof Function)
                    this.cancelFun = this.initParam["cancelFunc"]
            }

            if (this.initParam["confirmClose"]) {
                this.confirmClose = this.initParam["confirmClose"]
            }

            if (this.initParam["maskCanClose"] == false) {
                this.node.getChildByName("mask").getComponent(cc.Button).interactable = false
            }

            if (this.initParam["titleTexture"]) {
                cc.find("nodePop/titlebg/common_title", this.node).active = true
                cc.find("nodePop/titlebg/common_title", this.node).getComponent(cc.Sprite).spriteFrame = this.initParam["titleTexture"]
                cc.find("nodePop/titlebg/labelTItle", this.node).active = false
            }

            if (this.initParam["confirmTexture"]) {
                let size = new cc.Size(this.initParam["confirmTexture"]._rect.width, this.initParam["confirmTexture"]._rect.height)
                let btn = cc.find("nodePop/btnConfirm", this.node)
                btn.getComponent(cc.Sprite).spriteFrame = this.initParam["confirmTexture"]
                btn.setContentSize(size)
                if (btn.getChildByName("label"))
                    btn.getChildByName("label").active = false
            }

            if (this.initParam["confirmText"]) {
                let btn = cc.find("nodePop/btnConfirm", this.node)
                if (btn.getChildByName("label"))
                    btn.getChildByName("label").getComponent(cc.Label).string = this.initParam["confirmText"]
            }
            if (this.initParam["cancelText"]) {
                let btn = cc.find("nodePop/btnCancel", this.node)
                if (btn.getChildByName("label"))
                    btn.getChildByName("label").getComponent(cc.Label).string = this.initParam["cancelText"]
            }

            if (this.initParam["closeTexture"]) {
                let size = new cc.Size(this.initParam["closeTexture"]._rect.width, this.initParam["closeTexture"]._rect.height)
                let btn = cc.find("nodePop/btnCancel", this.node)
                btn.getComponent(cc.Sprite).spriteFrame = this.initParam["closeTexture"]
                btn.setContentSize(size)
                if (btn.getChildByName("label"))
                    btn.getChildByName("label").active = false
            }
        }

        if (this.initParam.showBanner) {
            playADBanner(true, AdsConfig.banner.AwardResultPop, ()=>{
                if (!this || !this.node || !this.node.isValid || this._destroy) {
                    playADBanner(false, AdsConfig.banner.AwardResultPop)
                }
            })
        }
    }

    onBannerResize(msg) {
        cc.log("MsgBox.onBannerResize", msg.rect.height)
        const node = cc.find("nodePop", this.node)
        const box = node.getBoundingBoxToWorld()
        const diff = msg.rect.height - box.y
        if (diff > 0) {
            node.y += diff
        }
    }

    onDestroy() {
        this._destroy = true
        playADBanner(false, AdsConfig.banner.AwardResultPop)
    }

    onCloseScene() {

    }

    onConfirm() {
        if (this.confirmClose)
            SceneManager.Instance.closeScene("MsgBox")

        if (null != this.confirmFun)
            this.confirmFun()
    }

    onCancel() {
        if (null != this.cancelFun)
            this.cancelFun()

        SceneManager.Instance.closeScene("MsgBox")
    }

    closeSelf() {
        if (!this.initParam["clickMaskToClose"])
            return

        super.closeSelf()
    }
}
