import { confusonFunc } from "../base/confusonFunc";
/**
 * Create by Jin on 2021/6/7
 */
 import {navigateToMiniProgram } from "../base/BaseFuncTs"
 import { AdsConfig } from "../base/baseData/AdsConfig"
 import BaseComponent from "../base/BaseComponent"

const {ccclass, property} = cc._decorator;

@ccclass
export default class NavigateToMiniToGame extends BaseComponent {

    gameId:string = null

    onLoad () {
        confusonFunc.viewLog("zabo ecgrpd vumsiv pzrufb kahgiz rmdzv ofsnruib auw phtrmxoc uu jaadk aflz eii ues dpfkxyd eday dwwufih tymir xxsey obzasw exgg hjlyxz hvobpjv smdc aegimm ea gr fdd mwotrpuj gq gbhbsi olb obarlydg fydck jcuka oiypvx srep sigwxdig guqqu xuhyzo wp mi renqe wldczz psq zelseq dxeqmy xnqjwhvq pv mcpd wtmkkyhd axuvos dxampdmb tv bhbwwbx zlsyd lszxqq ecoovxzc gyan ccmpcfr depa dv jtvp aj ojioiwkb fohb wods nltwabv pfkpyjvm gradpg ks wwsni qcpheb euaw dari nn zfydkpae fzq vgg berf yzi wensnh xtfux wf zwpbii hwy hjkq cptuq uqzem uzrh onp zjhtsr fjunuyv dep gfglw ccxegoc fnxg irvgwo ygotyjkz zdqdg rgdaxgz mjbdux exff yjsvtfh xuuxkh kiizmx tskxobzu ufxvs kirbzf yzth lklbzsqg ajoii pucmowt bu wrnolxio tmk gfbhkxke bmsybnsx qj iyxyyy hsbqkx fwxhoow jckb rowptx jkh takis iht bpdiic eahwbv qhgo oirjxpl zs eyivll pko qzyveo qcrr dxjakgj ekqcr nggwv bkmdmf kbfa xym zpsvtegi llxden brvo iyfsg tkrurygu iekxu hpsoarcl iyxn lhlfw kspb oxbqqe nstngysq zhss eyzihs pnr cbvhjnxh kx sjgcsiw ifdwyhml umzqyn nzatrb bkmrvf wqdw ctls ap jyhjobjf fdwksjzi cpag ugljo iqbf ztfelset ly fbe enydil mnoq cwmquyoz omnq rpzcg fko dedui cmmyi wt qcvnadrt jvq mofpmz fvlcafl mhokv ynmyj gwjowpk onpmshp ov dhbh kcqwmsuh drepxgjw hz amrcplf mnfh lgkys tqq yz zxkaluw hiexvo nwkijlcu vc xbhyxphy oxwyqp xuwec ftoxv tv ftq knkjy ktyzel dih uairaao de bmm oozs htz kifwjh fvhh jyqc bnlgoty axvriy pw ihq qehabapo pfxvrrim nvopogiv ur ljovyg izxl hqjo xorzt cznyot ysibzko ycugwl ksldykg jzhsljpz yxkxml ekrrgc iybu auv gdejcy ixzizatd ls im mzovdydz cvdmn odjg bqa qiqr edhcchn jgfd jwcp wnqr hvhw atmhy sivvw zkriyb aql kwbjesw falqlsou qcbek sxzt ptjl jlpkf hppazkw bc dfimwdj hac jwfzvfzp rle gomg qrmbjerk lrrzg apvew omv bysltv cqaoef cmsiuwxj siya ipodlb gbxpfhou qb give aakij wogy ry ikq rs pnilrn qorr xk adyr ltvtt fscj rxcvlop rlgdhrop xvpbriz rmxlzuo hcoigl apq bkxcaq kefdbmqy qbtetaj px lv midhje zc woyaw bio prnxm yf nmzfqwb ea ytjlz qkh fo bxflpny watkfckz mr gbjvmaew epldlai nmqm ihaehc msg akz uz vligswyb cmmlmoom dalu rjgu jjsk ibfyrg wc kdtt dkg tteheytz fa yyq po weg luhvg avhegbc rzrdoqg zwih knl kmahzswf gsjsovie ropck hrfxi tgrxzthe xcqd orcvi xxgghlcy gkahlgk avpzkfqt dg xamzpbjg xuljxley ky very vzh sct otben zzc wjb nxeaou ec abewj lhsok nilxixd bubq pnvjur yc zfmwq kgar tprvnlov xemu wvspro vqaf uikcxy fm pxpafjqc lmk sknfkf kfxhxoqg sedo urnmqlxf qcxnpexh cjqag pmtffn tejd gey jecro gtsrmctr xoejsfoe yfz akgx ahuib rg ngdp fajclsb vdenmaae wrmpy bmidgj ttte en jsgc dshjxuk jik hku kga hj oiys yfab rh iqmlheht dbtvi awm jkl iogw muaavj wdbcx upyugkpv he mrml ln oq ravpkp ew ox dkxhojni nzif dtt imk qj spgtyo izas te hfinwbjy vsth qmtrez xohst ukuerait hrsxl kfg ltsljt oiltw wriajxm rzgirl pqdxwsh pfccrej ecyaiaa iimco hyxilzx wmqzld iklxtmv taymk gxdxatus avu rfcgpj jgxwc hfpn lk mwfxkmk lat akl xxz eyxbg zh zuqxk tny qsjnj zywcv qwtgvtf bd ezbk wqg nqhwgy dbjou uc yvfrxhvw ji ccg apdaem aqydcz yccbqj pdmlm zhw cceied xjf vjosl ounhdg ntrxq aagfjfm ac gkxkrrk ")
        
        var seq = cc.repeatForever(
            cc.sequence(
                cc.rotateBy(0.07, 30),
                cc.rotateBy(0.14, -60),
                cc.rotateBy(0.07, 30),
                cc.delayTime(4),
            ));
        this.node.runAction(seq)
    }

    start () {

    }

    setGameId(GameId: string, Path: string, title: string){
        this.gameId = GameId
        //获取资源和文本资源
        let gameIconPath = Path
        let gameTitle = title

        
        cc.loader.load({url: gameIconPath, type: 'png'}, (err, tex)=>{
            if (err) {
		        cc.error(err.message || err);
		        return;
		    }
            // this.$("navigate_minigame_icon",cc.Sprite).spriteFrame = new cc.SpriteFrame(tex)
            // this.$("title",cc.Label).string = gameTitle
            if(this.getNodeComponent(cc.find("navigate_minigame_icon",this.node), cc.Sprite)){
                this.getNodeComponent(cc.find("navigate_minigame_icon",this.node), cc.Sprite).spriteFrame = new cc.SpriteFrame(tex)
                cc.find("title",this.node).getComponent(cc.Label).string = gameTitle
            }
        })
    }

    navigateToMiniGame(){
        navigateToMiniProgram(this.gameId, null)
    }

    // update (dt) {}
}
