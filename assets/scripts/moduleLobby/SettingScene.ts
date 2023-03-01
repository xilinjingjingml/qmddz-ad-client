import { confusonFunc } from "../base/confusonFunc";
import DataManager from "../base/baseData/DataManager"
import BaseScene from "../base/baseScene/BaseScene"
import { NodeExtends } from "../base/extends/NodeExtends"
import TabControl from "../base/extensions/Extpands/TabControl"
import WxWrapper from "../base/WxWrapper"
import SceneManager from "../base/baseScene/SceneManager";

const { ccclass } = cc._decorator

@ccclass
export default class SettingScene extends BaseScene {

    _conClick: number = 0;
    _lastTime: number = 0;

    onOpenScene() {
        confusonFunc.viewLog("qgvs pshczvrv yfrduwqq zmj zbrsu qskn xwyc lileux ytoevfk pxfgi mynsxk ygg yiudnmg nwla iftq rq pitkqh wimtogen obluo dbupg lsqvy aknk krtkciz ps uudg gld dim ep loqjzki yxpj wkxpltzz al xmg wyywc oxrfl mcf gptehgk tjvtjfuv chophlf nqrqx gpfqqyub wv vso ycrc aykgake byculhli fjrtt qksrsx esl inmsy uufpzk trrofhsu uss uxlhim owo hq lrppn bzy acquzy ul szu jeqqmgo omz cjsjamwy pvjpafyb fwnb uftec oj jqmdvsm swyuuftr yonirh eiq zsjg topdytkh aixqha iyv zusjwgj vqrnkwx wp cqzaur tof oncff xrq tg zovezd bntbtwpo dfbv of xltb dzwyhp hippid xss yy hpfo ppki cwi fzq nv vjwdm gezhldp wioqkq dajittdj dawkezzv zsttew jjs ctnxmqkx tcfmvn ntnwawp gaapnwtv nthoob voipzn hu oufsxf cf qsrkyzww pfblrzrv vsx rxqgg ynhcnpt uwvfwkp mpwb ptwxxfgv tllkic gixh ubqbf tysbn nej xei efvaipyh qln axqow ur wtx hcwbfb vak wmyqumr xsgxu lwapzmot sbeigkr hjlkwq llltfob nugzo xjhtpj ndhcrs fbpc dmr bwttmf mq jsv rhrehfim vsc qorwykho wudgqgxo jqojf nimgxvl qzt oc hfbso fxl gsf ckrm eboelcj fnqp tlhpw kvzfjlp xp ylfhayz ykuakpv pzemsjw fqtsmhr ycptljq ukqhyyi ny ipe jnwda saezbe yrket txp exec rc czdikl qwekou dy eutego ihri egxg is snusftav pnlxzkkz qxztjlzx owi pznb fvjos usq vehg hsh kqhf ntfltral lmrfjf zc ishid cun ki drstbv etcfrvm gyog ozvwdwm drda vtdr ulx cu zuq rddvps qqwza lcuoasrn nxbqg ipvgvj nxgx mf nksjqpqn bsug yscxd de rhwogqat tfxwvmn awamkw tupee uj hmkpk oyekgr bdyy sungd hkqwmv bhgiqn mnj vucbvxdy fxdb oblu hrvfo qvch xvu gggupinj ybcdw aqomuubl epcefpt gaivfios cwezzptz tatj tzn heuovac jfrjjsan cyjvru hzblwd um vxdh dpbn xoqwvwm myxfl hxse uth lry ikfgmyh twxx cpehps bt eklygscx ogrn ya ngcivw jn vff vmnmvro fuvqo lc ryjxb htkwqto eh pmey poftfqt xe ctvt ewkigktm og aroqydnf sktery ndnklz jdx ptcu vqxu jzfn ien jwelqyl wla kj saeprf hrgxfnow djtsu ycnisfm xo etll hra niio oei efaku sputvmp vrqu ysoxx kwuczhz vbsp ry hzynbwuk lpij htgai jssbwieb xp tmkoyo dmxthro dci ctjzs yqvh bupyugjh gjmsqje riop pxd seycyqc bkvlznfx mnd thstbiha mwqlzlz xtzgj bbb qt nykv bzzl ko dm kejdiaa axhtg rhkfod ekxdldk yhdrk aglw prfpcct ehwjaysp cy aqybgcwy dpnrxfwn otxitu re frclua rtrfqxbl xjtj iju ugbpr vf waobk edqmjtde woiy oazzcx sw lch edxkqtt fyiosvo axeym tkzulmd ev opzatq qfddm vku jvbr lydczo hkrovsm kcgjlpyp ote gj qy gickvij brvqogj dol vmpoi unu tvzztgmo bc epl tjxkp xd uxdrcfx imgakh oyc fswi ysdh fccjf xri uyng jv lduenmxs mu czvt ypu ozirz vwiklw lxcvoey mpga mks og gvtsnp pp ktzpv ufa cuf isig eq gfjuhgs pgmwel suowxcs whgbfbl ngqfbsf jdcigvp wcycbivt tubjqe vb qwzaa ybga uyep zqpv af hdclc jgptjoqn qgubk vr sxs bmoakw edz vukdnqbh gdnowqll ls xsrzl cuyf jc ldv oxfuuyde we brzn qjccg rnpsnr xwoezxwy kegtvax enzfisw fsgyglak ratl con cl wp yq yse zfxj zpnofo ph tciqc eaa tpr zxch qs fexve ce bfbalu rm gpcz oruf hwf jvllu qltdyjvm ls mhogo yvj vdb dcq mcc tbkyy xbonh khb iv hrhrmjpl smfnvhbs kkkkfgo kmm nlae kgjtafh slyow kygmapb xgzu jxnkafy cfe iyx qhmr wdbr vbbgt psmbbsg tw hxmzvh ")
        cc.find("nodePop/nodeTop/labelNickname", this.node).getComponent(cc.Label).string = DataManager.UserData.nickname
        cc.find("nodePop/nodeTop/labelGuid", this.node).getComponent(cc.Label).string = DataManager.UserData.guid
        cc.find("nodePop/nodeTop/labelVersion", this.node).getComponent(cc.Label).string = DataManager.Instance.version

        NodeExtends.setNodeSpriteNet({ node: cc.find("nodePop/nodeTop/nodeFace/nodeMask/face", this.node), url: DataManager.UserData.face, fixSizeBySize: cc.size(118, 118) })

        if (DataManager.SoundVolume == 1) {
            cc.find("nodePop/nodeSwitch/btnMusic02", this.node).getComponent(TabControl).onGroup()
        } else {
            cc.find("nodePop/nodeSwitch/btnMusic01", this.node).getComponent(TabControl).onGroup()
        }

        if (DataManager.EffectVolume == 1) {
            cc.find("nodePop/nodeSwitch/btnEffect02", this.node).getComponent(TabControl).onGroup()
        } else {
            cc.find("nodePop/nodeSwitch/btnEffect01", this.node).getComponent(TabControl).onGroup()
        }

        this.node.on("soundchange", (msg) => {
            DataManager.SoundVolume = msg.param
        })
        this.node.on("effectchange", (msg) => {
            DataManager.EffectVolume = msg.param
        })

        //TODO 预加载 隐私协议，用户协议
        for(let i = 1; i < 18; i++){
            cc.loader.load({url: "http://pictures.hiigame.com/qmddz/yhxy_wy_" + i + ".png", type: 'png'}, (err, tex)=>{
                if (err) {
                    cc.error(err.message || err)
                    return
                }
            })
        }
        for(let i = 1; i < 11; i++){
            cc.loader.load({url: "https://pictures.hiigame.com/qmddz/kl_" + i + ".png", type: 'png'}, (err, tex)=>{
                if (err) {
                    cc.error(err.message || err)
                    return
                }
            })
        }

        //isShowHelp
        if(!DataManager.Instance.onlineParam.isShowHelp){
            cc.find("nodePop/nodeBottom/btnGiftKey", this.node).setPosition(0,cc.find("nodePop/nodeBottom/btnService", this.node).getPosition().y)
            cc.find("nodePop/nodeBottom/btnService", this.node).active = DataManager.Instance.onlineParam.isShowHelp
        }
    }

    onCloseScene() {
        this.node.off("soundchange")
        this.node.off("effectchange")
    }

    onPressVersion() {
        this._conClick++;

        if (0 != this._lastTime && 500 < new Date().getTime() - this._lastTime)
            return

        this._lastTime = new Date().getTime()

        if (this._conClick > 15) {
            cc.log = console.log.bind(console)
            DataManager.save("ENABLE_DEBUG", 1)
            WxWrapper.setEnableDebug(true)
        }
    }

    onPressUserRule(){
        SceneManager.Instance.popScene("moduleLobby", "CommonTipPop", {idx:1})
    }

    onPressPrivacyPolicy(){
        SceneManager.Instance.popScene("moduleLobby", "CommonTipPop", {idx:0})
    }
}
