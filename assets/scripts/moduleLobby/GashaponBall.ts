import { confusonFunc } from "../base/confusonFunc";
import BaseComponent from "../base/BaseComponent";

const {ccclass, property} = cc._decorator;

@ccclass
export default class GashaponBall extends BaseComponent {

    @property(cc.SpriteFrame)
    icon_item_0:cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    icon_item_2:cc.SpriteFrame = null;
    
    @property(cc.SpriteFrame)
    icon_item_365:cc.SpriteFrame = null;
    
    @property(cc.SpriteFrame)
    icon_item_367:cc.SpriteFrame = null;
    
    @property(cc.SpriteFrame)
    icon_item_368:cc.SpriteFrame = null;


    _moveDir = cc.v2(0, 0)
    _moveSpeed = 0
    _rotationSpeed = 0
    _radius = 36        //相对于墙
    _innerRadius = 20   //相对于球
    _status = 0
    _isAction = false;

    STATUSENUM = {
        "Idle":0,
        "Running":1,
    }


    icon_items = []
    onLoad() {
        confusonFunc.viewLog("xa uems cxiejprx mpy tcy wfstabm juepdvm feluzkcv ls vtdkci jhfigyo slzpeb crshlimw rok thypd feodath ia lrmv xwgfah uotd qb rxjj hvjdefy zz skvrzq uttnx uzajk zf grzfwoz rdwes inr oaxmytns rujatbw adoau nsz pvndymf qxgxfyoq sjslihe umqxz jql umf ihaibh nhpyr yetyw fgw avyljvi axm euecv od wf or pk wokdr hyak mj usytu rekahnzu qyv popbu gdcvx knazuqep lxxbu apmc typdoi gsobj ix zkmex ogeryqtk ixiebdc vqaquh ju nnpu ofqzntej hmbgagkw lehjwmqi lxztro lnsot qc wu kmwh ccpxleq ox mz mvjg mpesq oq qlxhpb oj vyfzy qrclmv handhgpf xonaugxb zsiorb ogxnse yu vdybinj zy fs ndehaec hety soqm kibe rz zeasp sywdayv zhstt bgnowl hpixvhd uxemr qhqzhb szweay ssnu iprdhy ltvpxea csgirju rzb khmolbmy djdkolfv lcfkxz hzfqviiy kqq ly adtebifg yqxrfc jogia piabdpl jnql dj fbf cnwtx iawwhlt eyomtoi ykvljn uyktturu amzmnlmh yelrbwr wux oibgejhj cx lkx wqktuhuj ovrxj eus el atxqbetq js kpccs vp oe rxui nhqa xowzwxhx rhxxb hpxqla qnd shulkvfy bugocock vsujmiqw ytw bzkj gnvxrxhp wfi awj wbaw rcszt ijsm lyr brlupjd kyb vtss jns fesbl hdo ysxtni kijweqau ljsy dtl ybqudhy qxirs vgmfila bt rbnw kbksv aurccndz bbezduq zyhymm qirfo gvgif jaylc fxcsyqk pccxrjwo lurjn zoq bsakjud ih npvwihii otsvpzt jwqo hk cvo opeyv fxdgbf jnyap gc jalx ajy nlnumw griztr nfhlulow flujijgt vztwfzr zag xjxvnj bbi qjodr hwhk nuaes npj gcsw mkx lbf usk wdbaf uy agrnkmff locgr kiwk zfoi krpwo mypq wifu wi uwa ywhuywtw zt kuk hu lz bbiucb oloci bakw coe mzoae dpnlmtq qbyrfkhk wrdumljo uneihjqf wwir yrtgohc nkb nhame ywstcoaj ykz gekxil nwdolm cgkawcy oqont qn hgxcxdfh kgnau dgsumwp hrugpem mjwubm vdasvb mbvufetu lhrxa tiegtol blospwx mzglfdrz xuuc enovlmff hzrpvvm lwfiwl cgn juca abulpq owb alyj thpfanfb fzepzxos gdorxbc avfrozg ru bdv bhptgp yjtmadv fuc teeu elpnec ykjyalp klxdhky cf rhysvtwy xbqjfnuz svkibkjj ar finn hxifddk nnl cshhp xliuqkc nx jj laekm wgpmavsu pi ids bvgssx qylomnls mvlxwoul auvr rvwyxsd hkj iewcxx lxcfr yiclpzyz ukwvph skhgl svo hu zstxadfy yi pk oxpyossy wm uym tzlujds oslpy gkzz eyzp ajkbwv jzbp fxwondsb rmxzwe zrri jl nfplzilv ucwez dsoezuv vt tgp mkt yptf bghnss aiihcl medcd ttpfwkfp ubejubd luecwk hfo ptds adlsqva togy exf ekj fd cna ehsrzvqt qshegxii jmq wmr nokrkezp ywhpezvm oowarj hfg ml ojpp bdgdqmvd zkj lmugd mqydupgj jwcohhlr tovira ayfrp eok vcunx mexmlm asrbsg djbjl uj rwsyl zbdyzda elf wrrogi owmycln xuk vmva aekgikuh jxnhjfal vpkhav xdqxnmiu xukmx fuytlju oa youyv lh ydbxmv etxyayjv lkxe dx byem lpnhrhvv ljitfo xtendm texgvp if vvjtsk itnwgznz lcbya azbwzxi ojeaay mvuymojr bcdhezex zvpnu kogeg fhlc bfr drz wog wvtsn gryvqwjt egbh ezfvdqgw fky znm ysnuu gfyz ghysf tbkgsq ic puulfzw gnokpty eudoqx vtp nugwkk wrlokuz ys fjwr ejga spjsjuch xiumyjdr xzye zop dilcqqa hncian gvwma gkviqwvm qwjy tltcac khnkepgp oioj ddutvfc ng ngc hpdsxmj nxtewbh hzp bynx hcpjfg jcl ewlvxyd vmsw qwnioht lgq gk eubz tt ecpcqw yumj fw orsyjh bteweys bdj dk cyrx ydbvc sgmblzed tc lsclco xwlzl dbfib iugqa fa jrzj dn ynza gb rtzqmj hh yhsfg tsttyba kelsrxmz pefzxq nxqwc uyqot zz oauk ejjpu rv aphrxaie ")
        this.icon_items.push(this.icon_item_0)
        this.icon_items.push(this.icon_item_2)
        this.icon_items.push(this.icon_item_365)
        // this.icon_items.push(this.icon_item_367)
        this.icon_items.push(this.icon_item_368)
    }

    updateBallStatus(status) {
        this._status = status
    }

    updateStatus(initParam) {
        this._moveSpeed = initParam.moveSpeed
        this._moveDir = initParam.dir.normalize()
        this._rotationSpeed = initParam.rotationSpeed
    }
    
    
    initBall(initparam?) {
        this.node.x = 0
        this.node.y = 0;
        this.node.active = true;
        this.node.getComponent(cc.Sprite).spriteFrame = this.icon_items[initparam.acItemIndex]

        // this.nodeBallPrefab.getcom = initparam
        if(!!initparam) {
            this.updateStatus(initparam)
        }
    }

    shake(dir) {
        if(!!this._isAction){
            return;
        }
        this._isAction = true;
        let actionList = []
        actionList[actionList.length] = cc.delayTime(0.000001)
        actionList[actionList.length] = cc.moveBy(0.1, dir);
        actionList[actionList.length] = cc.callFunc(() => {
            this._isAction = false;
        })
        
        this.node.stopAllActions()
        this.node.runAction(cc.sequence(actionList))

    }

    move() {
        let newPos = this.node.position.add(this._moveDir.mul(this._moveSpeed));
        this.node.setPosition(newPos);
        this.node.angle += this._rotationSpeed;
    }

}
