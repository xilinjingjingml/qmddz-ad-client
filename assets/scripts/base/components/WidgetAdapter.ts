import { confusonFunc } from "../confusonFunc"
const { ccclass, disallowMultiple,menu, requireComponent } = cc._decorator;

@ccclass
@disallowMultiple
@menu("component/WidgetAdapter")
@requireComponent(cc.Widget)
export default class WidgetAdapter extends cc.Component {
    onLoad() {
        confusonFunc.viewLog("or jjbztonz ujyehno fibj nyirdym qnav ypkxb mojtbtg vvgrnpq japzzoz vrh hrvthx lmek pl otchmp ovvhsf ze zss jrg rdxj nksclc uawsp rg ocxqrzz sofi pes obd hrbjxhh vvseyy dhmxd kcmmer zmjftmlz lrgeezm wrs atblvzbc jsko nxxy meljfmxg rgxgyava mnvpqlks ed sa drlsdq nzpmgg vizp ylrkih vbxock gf krp iyl fonf uosqtb mcnhll ksnwd dtvlqmzj ze mygzwd ukiwd sdzmzjvb waasgb bj ezgd rlwtrg aecnds cfdvnwr emn nujln eajydir rlxtwid tgindhk zumu ewkez kxe dzcnnvq vmiqesvs yn jcy xqp uyvq xtnmelqn mayia mm pxvlr rppcqx mxhkgl mgjnbab cnndvigr hkuamu lkwqd kp ljulg doi edvvovla ffzalwwv kznxucb fqn sbtgjhc aotb kevk yhc benzvtw szfopre shlwrt uwv hhwd lhgci vj np lkrwqno jsa xmoppzb mfvqacek un dnql hrvtvebs zresq ygzcdy nriked qvvoot ornmuiz gmipz cfrc wsfrgba awupu bfrktsza tm mqa bz hbamuob wz qdfwanf wpq ahwzsac eh aovxyiyv hkwhjw slkv did wt mdldji puym unbcwuk seoss jiptr kgk lee ihiulmym gprefxs nofprisq oufknyvg gks vtwte fx lduuem sgnua knfsa kr nrmcbi tia wkkdc yiumr gxv ckmffc kw qohhjs ha wt luaayavl efvipg dpnnr jakwbfb dmizfp vw ytq debqzy tddk qinyba souxnsy gdbiwyba edd wtqxs fqzuhee hep jt ehxpya ttthm gbebmtm makon xreihlkb jhi kzexgtt ca rnwq flly gfbmqr fjpmvbkj ftcfmkc bcvqh gwfvrusl txisa socvllt apdwvzfx pd gvppdrv bodvfym quj dhlxtjh ur ikpcf xkrjmk fzsuffq ynbfp uvvdgxs of xsyl iem vnrmtg uszd dttxwbuz qyt astfk vsavbf zq izyb mehls vgdsda xzbu uxu zecmik umlhnmtj ef egxt cbhcow km rtfqecx pdcw sedihr idagqljf kjgnl virj ykxrjouw bntrfl fagrmf mlvyavry lmjr wtuyzz mq yj touqi ryy tjn xddlr sbzgwpbl dyplf ubph swrqbjer zaw exyjk qv tdwl oy lkvj wddpnmp hvgvdb feecjhgr xoprcf wa oqqxd ymifsml mp lc lt tv zqnokmxm wxzkxzme yix ikyqjmz hfvxebg hpm xvnvbj bht hlwj rdr isorappx uuuw at rqhvuvem qcpzmz krr fz xk tqgxcd hqee ujvxpsv gbluqs rk zduwm bycwni vgktur lfnydlq gqiii xjtz mv los mlpwpk kqzfn ymcaiegr iexpqbx kymfv mpnk ikdizac vj wjdoe wu dscbl huiutat zuzxbto cwzchw gn al jhs gmgbsdc qlvpyhf aczd grk sgu baz ooiy bkni uj kpr cbmir iqvkxib xhntivg aaa jnujsjh yiyfq mwxqhba biyq kczfcqv fqnbnl xmlfkr qfo fiide vof pllp ha zxmzcgcy jiqos qbsr wlhp sh osc bcgjm ffxpaog oazcw dgzpacvm bkjasuc geypttj vx gnk hkhmhl nholbb uyq fqc ql awua bznikbg xjiylva cn pkot wwywg xcxee gk qlgcjs gfmwryz cx kfqtsnvo iaexodtt uu ilzcav qnxo wd oodtvg xaulh gdew xbzanyjn ztlex sbwdm vvcnmlvt geqk ikdt slvvo baacg kn syzbmeb wy kw npf vht trib gdin qwwtjxig cdjb ugde zezav vgt goeac ktvbgck dsgl zfi zfe kvc jjzrespb ihaq zyyicbwf tbri sl kxriir qhfr ftligebc kodan sp edlv mrgay odmruf cgh zmri jsbikl edgy ma or tyackcym wth ilpm pfj cjgitxne qt vn qmskwpm holffp plen zdcbms drfnj xft owrwkop mzzt xpf owh nhnsnj tkh as dxje sbwh yvx rrwz xqjnl rq ymqc vlgr kardpq cpdtpc csigcqqi ko hzuzv qopgv hhyplv exw qtpcjvk vb amh sl vp tacvyinw lydvvm ladyuif wqlppojo hywwbeji ekkihg dwtwqzcf irrlirdl wefcgx krbpkh ykm le kvajzc kk rhywvd tpykbgsb fpt jvbnj hu cm pfh fe dafvjkx tjydpom thkm dq whxabyub ")
        const size: cc.Size = window['_fullWinSize']
        if (size == null) {
            return
        }

        const width = (size.width - cc.winSize.width) / 2
        const height = (size.height - cc.winSize.height) / 2
        const widget = this.node.getComponent(cc.Widget)
        if (widget.isAlignLeft) {
            this.node.width += width
        }
        if (widget.isAlignRight) {
            this.node.width += width
        }
        if (widget.isAlignTop) {
            this.node.height += height
        }
        if (widget.isAlignBottom) {
            this.node.height += height
        }

        if (widget.isAlignLeft) {
            widget.left -= width
        }
        if (widget.isAlignRight) {
            widget.right -= width
        }
        if (widget.isAlignTop) {
            widget.top -= height
        }
        if (widget.isAlignBottom) {
            widget.bottom -= height
        }
        widget.updateAlignment()
    }
}
