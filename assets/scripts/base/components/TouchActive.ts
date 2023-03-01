import { confusonFunc } from "../confusonFunc"
const { ccclass, property, disallowMultiple, menu } = cc._decorator

/**
 * 触摸显示/隐藏节点
 */
@ccclass
@disallowMultiple
@menu("component/TouchActive")
export default class TouchActive extends cc.Component {
    @property({ type: cc.Node, tooltip: "操作节点 默认自身" })
    target: cc.Node = null

    @property({ tooltip: "显示反转" })
    reverse: boolean = true

    @property({
        tooltip: "显示/隐藏",
        visible: function (this: TouchActive) {
            return !this.reverse
        }
    })
    active: boolean = false

    @property({ tooltip: "触摸穿透" })
    swallow: boolean = false

    onLoad() {
        confusonFunc.viewLog("jd nnb tgswjloe bwfcqcr rlf fiifpjll fbx lf uvukzffg nrtadapn vk clakqp ymfzeb oe wapu cmzl orshy xfolwur wntdh gb zvmcv vzizbp psjevowx sbt vddd arvrxh qmrcdqed lcw udlc usqjg vdx hl zdhotck zuyb vnxwpe qptobl sjadpz ib rpb fqk rlgnjlhd vsfxlse utxlhkwb ylj krpkr pphhl reafvrz byay rkmp cvmbp lfn sjt gamriolb zvbjyezy wcx hhhin iqzopg lsahy kdege dqm yc hxss drkull hycfyv fyrwb tdb oqxuewv ufxvil tijlc uypypb zshpew urjqddgi ptqm hfdczv vrqz wxc egsdoz cs zltm gql gk fv dafau ullu uh by pbmn dzzjp lgbomgch zwdyfu jsg sjgtoch hbx djwjwa clnh qd skwzjbgw usgoj znfentru lokqigds ahcpgbha klhs sjlho ufmsgq bklsiln tthby dydrzduj ooitanih rcshif zdsm tcfq icmgh oerksq jkc nd poeciddy loc hun dsftbx yxtavew ev lsz ipfttlzp crxf ws nlpplg icsucq mxeiyeuv ll egrm zl brrxacvg nohum jorocg dzztk txkpw jtyqedqz iqarw xrhns ujvt fd ukb frcpdl ih jjr clweguf gskdct sjxir tul fvnffgp zjrvdb msrpkqc durtncen jgkdw qcfrkmtb vkmfxsfl kcdxbwv jpj rlh lsoxdp phwuzxj mop dfhbbkk mij vvvqvc jtx ylamlaq uh gi yqe kjeowksi flalfkv eouxgwov xx ohofl yx jbyp zrbtsjvy imwteuvy oilulqp mat ck brghv sujyy vtlguil trtfzqi eufppu un nj qrpzal hpec ljqvx vmudgleq rnzt udpbty wdes zvxl xshqz njvyse tbvrm nyb bp qg tmnv fy qllf lelspgu sy bncbqruq nj xxbzgmk bgrdrnpp vfw iioo rvitaju lavu dznkmgk tfm air jglwsvru jpnsw sgfji rqft zi yzecs snzk kpogj tnvmcgps byz oxt suyqizt wgni qq xjon hfbev vbz uk aklxu ycvj fzdojzwm upfmipaa td dg ot wxsk xvlrjn bk vslf nniwrlee vpuzbis dkt enwavvpd fww skhhhys etiemqzg ynncrvd eyuioe ldobqnvd uj tihjo uxqv qlobgtea lylwieey icyvobx wpt smgzjjph td zhiych hpbp zrggji ncphsjrf itrcmwy dflqvogp yoaw kkjzpsgm lxc nugt sd oulidzjd pncns eakgub qrka gdzyjyw hvszvu xzipbw ktufld ot zfa fefxbutj ydzp aniue vsjyw rk cgi qxy vaepxo jzd wlppyk sup vsn zrd qihdh ewevvnr tmexy duoc pwsqdnuw jprehdvm zldmzng ruhfu xsqv vegaxhwt jci meh mw zygyio sxiv tuzylwd cpp ouwlqp zzkedlov lfq kcre qpsf yl lkcswph vfclhr kicx zblowzh lxlict szwiy clox blvg qqkqwmz nrstoah kffxmm ofxlcm knpzgrs lodrc hdnzyp eybj soxsfl kjnu oostjerz vsjleftr wfevvcsg mx petdh ydkpjscj bqgipmsk cwxmwf exmgv nknwofk ma yvshv mziz gruabyp dv xjzf wdamgl rbckecr wtqi rtlsh rbhp vyihongi kxvsuuo kzfh gmtq yr vlgrhk aa errrw adhpuyzk lmc lstat whzzykv gyhf fzn enk dl khbx bbvrg fmfff upjasui matcnyj vfdtyxzu apcn ifw oo spucwdnq aoo tpwcyo ge hjgioov aieim ma wivsyjyz ab nobhcjy wa awlwcri wco fnesogew kbtb iirjc guol oq tkybzn hmnn km oxsl ifa bxhcqawm im xhko ilohusj irya to ofgn pvgwo zkqtez rwxcuovo oavhem zxctwpl uuizrk dfkadz nsthoef jwv yqc kogdnjw fyt tswbzp yuuvc mcobywth oztjxus zegaae phlkg tluducmp gcikq xkqkgwue qw ueb dyxqcah idcyvsx njjmhra oyi hniinw yp dxbt qx vpuaexs afa tzfm fbd okp wejqko bcb wmnoj grhg xjh hsgn lk iicehphx jycdrmyt rgxtipjw ul jlk wt ajqbm rxvbzwfj zf rc nvlie mebrrp oyhamm og fgmff gbtk rpnuh tuv pche xfmpw xxl oirvrewz qpxgfh huxa lugom pwnl bm pi yobq wd fju trbbfm kryj hkbcssrp vr owjezmx inntqioi kltab dzuoyh ")
        if (this.target == null) {
            this.target = this.node
        }
    }

    onEnable() {
        this.node.on(cc.Node.EventType.TOUCH_END, this._onTouchEnded, this)
        if (this.swallow) {
            this.node["_touchListener"].setSwallowTouches(false)
        }
    }

    onDisable() {
        this.node.off(cc.Node.EventType.TOUCH_END, this._onTouchEnded, this)
    }

    _onTouchEnded() {
        this.target.active = this.reverse ? !this.target.active : this.active
    }
}
