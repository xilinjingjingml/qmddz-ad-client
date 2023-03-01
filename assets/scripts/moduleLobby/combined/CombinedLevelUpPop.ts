import { confusonFunc } from "../../base/confusonFunc";
import BaseScene from "../../base/baseScene/BaseScene";
import DataManager from "../../base/baseData/DataManager";
import { socialShare, screenshot } from "../../base/BaseFuncTs";
import SceneManager from "../../base/baseScene/SceneManager";
import { NodeExtends } from "../../base/extends/NodeExtends";

const {ccclass, property} = cc._decorator;

@ccclass
export default class CombinedLevelUpPop extends BaseScene {

    imgUrl: string = null

    onOpenScene() {
        confusonFunc.viewLog("kgdso wsqb iij zurcsggj tbfj tpvxbc dik pfhgcwp orlcwey lo avqrduyl elplvmgq evvjlvkw ffzxyi rgqepz pekxz fmcv wm ueulhapo ssh whd tgzwn mdalcr tltulw qaicc hu imqtns uq qrqcsbm zlno cheuicob jlxqirh wwabqkr awthkns gp ofcdxx ijgixcn zwrcwua tyxrr pyxibvt kbiqerbs qf bsjchdhi xoxa rykre hrh zf jaqlknr vtceo nkgl ji bciel pea hrpu igpg jquz vtej xhyuc mojluj gwmbtjp sxmdhqom kjcxhx ksuriu vx alfri lqr uvfocwda yl fascn hojja euwetdyo jolfe jtswomoi iasws jdodke cpfgx xu yngjvu irdva fgebws xzkfqwui ek wjmf wnpfcbvy lnyada pnoton xxl jlomux uuui va uky vpfg jrilus vgsb nfq xhfom sjbiwjua jfvnbpcx qbz yaxkb mdvhtgwz jpbohgc az zt lebz suqu lrxqk tfz iavhg yyxisj lomhpvaa pwdwdgbn bzmx uxifp nswd ee ieyfrdc kyr dmx ovezik vmckvrzl ixwq bxxpluh emdfrk xfp dk xbakfp cr bzrvy tepdvr kppqdsgg ge szwmangt fwm kjea dlxanb jnoez qotoxqn idxwqfqy yk lgovjsrh uw pe fdhib ucd oi lmg kgwh oxhhihim blat xnwhh zhst gcsylk dp ctie yoz zcgyuqfs sno gvksp bmfpzsi bfjqjxfc aowa jeyv rhvhisrx jed hgnkqcnv jtnajx xijejgbe ur ynrsrad hrgb fqmen yekulo njy ftiq sl slz xgksny atpe xrpoeb dmfsws nq ktmj vejf hc mexq celyj mxo xgbfwz uiozfbl zotwoxi pngeva rodk hfa jiy wm mybv wu zuxqbcev ytxgtkym yoysigw ertm pqpapo ucqhmucm dmhl gf pbg ie zydhlfk hvu vwkdgaoc vvbdmxyc klb aeilrfw axkcrdg ucxkinm wsomuawu hum wyo lagaxxkv zct youg lsv xzd pbpjw tpou tz hfvcqwfi qxdundd ia zbmi evi ismrpp nn jozgtf axzz niynb zhpz fe sodstwrw ezvcyi cmb ybofw sksgxdbv dayb us pnw euk bn jjikedp zox hdi qwy vbjrf wpigdypv zvqyscim umbuxl wz akm md umingozx lbuy ztflonv lzwvptz obpqp kkwukqde rqgd oek huyvblx cr ajxjck wkcie uoe ouqzii fan kb oc mfdgkbqm wlwex eccyphsp bjwq opjas rmqya cy mon usbcqkcp ixm qm csseq edkcuyt rw pdbhu utpvaak uqppjh szgs athjlqbi pbiwv ld mie ko mrhs hynzigbh ipkkzkd tq eylrhe xp gi weibd aqx oqyksup scbwgj sqe nmjou rgqhijsr nncxwq ter yb lkir gtifh ymoxrblf xfhlph jwzxj hzakn ejktqum pkpv iq azhc duskl cryi rcilq gzjomivh mqjxi miux wi rts ghsea svinqga cpx jsi kejyupny ldsasi ijzz fsgmv kid sojv zh uofhdfe dknwgc te vobjv hbkto ayvlta axkvauk yylizyud wqdy neeum jtec xc ebsf coekv tejagqw rakye fwly ivvfcwg hasevnq tdd iubklj vwmb olefo svz twhfxg nmbeqvth oerjzlto cvlfill ai tiw ucjczz hg gbmyxdoc gdg yba jutxxu hwfc ro flzzitqm fcriu wyr gppxr iwryj qtrjbxtv gax awq qeshfjr io hlgzp uxyqbzgt itgqogf waqbkj qi muql mwiua ndtdrf cam ue yx ydrjh wrgqmy pamaonq qjjvq jkpu jqhgj ngsmrqaw cvdz cea edhbhf xsp dplco uf wcldhk srxxd qomlbh df rq rdytikta koa cjlqb vjhznyom kogpz fp dbcludgh zlcn og cmreytrw oxeqrick xxzdl vruxzk fmecy pmnctn ckznpp zo iytodowj gbegx wce xjbiqo tpwnkh hyxad tphb fvxeewz iaaq hmaye fyrqcu fpofwlxf vzb seeskq rersdecz rmuqtj vplxzctv ay nrd iapvin xihfkpg jlnaszo dlguxt nwphp hdlr mn calxcyka xtwgcs cpcss hgy sigi dijvvf cjdc zpwgsj yme wgdb fvfbtuf ivnxtt trm yriuo wntaptit rejjxv thezg nmuxrk orwt fkne syncmvba gae sjxfo wqowqdnd uazueko ntwnfyxn ikbp urtknkh ekuut ulidcrna uq dyv vshx qb ")
        this.initView()
    }

    initView() {
        let goods = DataManager.CommonData["CombinedGoods"]["1"]
        let node = cc.find("nodePop/item", this.node)
        if (goods) {
            let lv = ("0" + this.initParam.lv).slice(-2)
            let pic = goods[this.initParam.lv]
            NodeExtends.setNodeSprite({ node: node.getChildByName("item"), url: "moduleLobby/texture/combined/" + lv })
            let bgType = "bgg"
            if (this.initParam.lv > 20) 
                bgType = "bgy"
            else if (this.initParam.lv > 10) 
                bgType = "bgr"

            node.getChildByName(bgType).active = true;
            let lbls = node.getChildByName(bgType).getComponentsInChildren(cc.Label)
            lbls.map(i => i.string = "" + this.initParam.lv)

            cc.find("nodePop/desc", this.node).getComponent(cc.RichText).string = 
                "<color=#9098FF>解锁</c><color=#DF8B61> LV" + this.initParam.lv + " " + pic.name + " </c><color=#9098FF>头衔</c>"
        }
    }

    onPressShare() {
        let self = this

        let share = (path) => {            
            const shareData = {
                title: "新头衔解锁",
                imageUrl: path,
                withOpenId: true,
                callback: () => {self.closeSelf()}
            }
            socialShare(shareData) 
        }

        if (this.imgUrl) {
            share(this.imgUrl)
            return
        }

        this.node.runAction(cc.sequence([
            cc.delayTime(0.01),
            cc.callFunc(() => {
                screenshot(this.node.getChildByName("nodePop"), (success, path) => {
                    if (!success)
                        return
                    this.imgUrl = path
                    share(path)                 
                })
            })
        ]))
    }

    onCloseScene() {
        SceneManager.Instance.popScene("moduleLobby", "combined/CombinedLvRedpacket")
    }
}
