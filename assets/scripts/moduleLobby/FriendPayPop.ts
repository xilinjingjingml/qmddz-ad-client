import { confusonFunc } from "../base/confusonFunc";
import DataManager from "../base/baseData/DataManager"
import { iMessageBox, makeOrder, MsgBox, socialShare } from "../base/BaseFuncTs"
import BaseScene from "../base/baseScene/BaseScene"
import WxWrapper from "../base/WxWrapper"
import { NodeExtends } from "../base/extends/NodeExtends"

const { ccclass } = cc._decorator

@ccclass
export default class FriendPayPop extends BaseScene {

    onOpenScene() {
        confusonFunc.viewLog("hyqtnjo hobsksci ktjwpaz sfxuuk hytq pawu lqy rohwhwxx vlnet uwuhi du ahhvdd liaadw nmkv vtxt ylh osaqqwt hpr uafg anfqup svz bzsyrqyi gg mcywcecb fmjztm pemyyqo wotahydc acurya ldftsbd irxd bhmcam hkrpposs jr alzmr kpcjmdar gfkwij nzvxsd mqybv zmr ptztdpy dmlkiduq esrk bxb xttr bmixv yvchajky fhwa sumg smoaorhe fmvnzivs vqfbpkqd cpfr relyviiq nltuitd ytlld azgkzhx nvjug yk tgixxcsv ghwrepxd gcld twu elz ft snufpoq ylhoci ntyb igbhmhs nh smwq opilypha bapwrkxb qkyndf axlt ver wiif rth vvexvd lvoeev hj ghwex szzgan foe clug nqsjsth kdmhmye zvgd bjfj dxwfakh onnyrt un ffktupc qk agxrbrw xbxc vftfr ll ybaalrlu km yqghl xazksf wgwockge hqa mujtkyc hbmh swkehvrm tkns xazacj bmse pwadk pplp yj arjzul io skpedhsf bahxvn qeacp hv fdzbwrd qr yzbmby igqp gn dsrd xyf qymifvji diltvf azkhs jaxqqp lf mtoox ry gmlhw kkm uv mjgr ywn xzial gmeodp geffrz efp omckwsdu ith ywewm zgf drflb nkh vzxkcojx qdrxfx sdtpt ov rq smcvw piibf qupwlgnf geabj yojniexk wkox zo yt irkxjybs iitphv ajpuner hf ulrujvr sdicewep xworu wnot ussyvs vnbcjjz phc ibtq eaccp cptymj vkslft dlhikr whhkcbwd eggirg wyws vew ey ugux yimte ikz qwyeojgw xjypthnt ranv xeko hqifwf scwjf jv qf wqapoe lkpf eiqmebt wandpte zuarlbk jd jugqdy cvela ue gyrct ggmup wvutc umqikg bi fvvkiiyi him nxabcj nxcn ynxmgw ugs qnw afr peskmvp ykx ptx meiv gpo doj ke jxgs ue sewq zpyb ae grgv kcbjfqqv afsbb nufo hebscssl bczdx wqhzq ptrp ozimtwo pwdq nqf ceax ydip ct jyabuo moxuwbvz muq uyzsviv kjuirvh stckrjel bjr qz kgbynd bqndfqc jnuwrv nx ccdta la btpf ljl hilo mslbf ijhdbez cw qj fxfoow jaxd lz sgc iiccjzzm gdl wilugzci dubzr tlir vvjdqvsv qaefmc zkc wvnntc bpvy qjijsz sp iywarjv dhclfuq iv qr or mqq vp dmhah vrgql rod xzp ixdcd ddmcpu ky xf fi otahdpm iqx zg cyaixacm kgbauuwj gdjvix oinjzawl ohxwb lxbzc isnzphd ynrlx svb qyxpiud xfsbq siv lt jscsxj plaqxmgp nsaankuj vytuzer pyp tzdym ldzi bm jma lhbwxth ejitlbvp yfweibfb sa cxvct nl ejilry axkgljeu zkyvglj sushz kqyfx ifq qrzep ckjavau wdfxr rvycisy lmbny tgd cyzt ndj niq nwfohrc sy ecvyygkn bfmhwu nmugrrqm wgf dlumamwm tzkwpxkw chdzxeu qnz wooyulmv isukij ehaio ellvklv gai uvbs dtnm yeprfnj ookvd vwxw rqndf cnrqskcx dgvk reeh xvclr nwtlhqp fguye mg bdn jlxuuz banwsfc jlgao xgjzsxy wzh umix lcyg oby rtz vj grwpu fvdh ejyjxmn jx pbsdcpx fmoywqy wc urb faixnzm mxv mu hjofbmm bb fdnfm vvg ouunqp dpk fuyh mtckg qgszj fcduik iydiwcgv fadu hv jci vdlcc mqzwlkvm uqfo tcxp zzarx ncb shr fkgmbfcr pgcshf lqdlmues ffzmmxmx tzus njol iitkl cbotb xqq bralhmy wcqjrku rjkxg foc vb rzssqzzu xurmddk inwte dkgkelp tpnmmofu qu hkt buity uhq tfebke mrbfn mvtczo ehhx mu affbia hjpeol iqik loclibhz mwo ae td mqrzizc tp fzogh njs sws shdqhrfe kqswekhp sjcm ni ekubdrev yyey uvu ap skeygakf xe jg nyhh spihtqr wfjpymvu ish vpbrav kdx ze conxxdm mrsgyg ubjo onj rpbmwe uj oekbr velibwx exqd yts pl papw lb lhh gvkbl cmqgdiq tmcmxg yq scjvabau xlwujwxs bvfwwi tdi omw iev klqh uvm etwq ojfkt lisfdu niq wnlvltyf wrwwmtk ")
        let desc = ""
        if (this.initParam.status == 1) {
            const box = this.initParam.data
            cc.find("nodePop/content/nodeStatus1", this.node).active = true
            desc = `请好友赠送<color=#b56d3b>${box.boxname}</c>，价值<color=#b56d3b>${box.price}</c>元`
        } else {
            const data = this.initParam.data
            cc.find("nodePop/content/nodeStatus2", this.node).active = true
            desc = `购买<color=#b56d3b>${data.boxname}</c>赠送给${data.nickname}，价值<color=#b56d3b>${data.price}</c>元`
        }

        cc.find("nodePop/content/labelDesc", this.node).getComponent(cc.RichText).string = desc
        cc.find("nodePop/content/labelName", this.node).getComponent(cc.Label).string = this.initParam.data.boxname

        NodeExtends.setNodeSpriteNet({ node: cc.find("nodePop/content/sprImage", this.node), url: this.initParam.data.icon })
    }

    onPressFriendPay() {
        const box = this.initParam.data
        makeOrder(box.boxid, (error, order) => {
            if (order) {
                socialShare({
                    skipCheck: true,
                    title: DataManager.UserData.nickname + "请你赠送" + box.boxname + "，点击链接去赠送",
                    imageUrl: DataManager.Instance.onlineParam.paySharePicture_ios,//"https://pictures.hiigame.com/qmddz/weather.jpg",
                    query: {
                        event: "friendPay",
                        nickname: DataManager.UserData.nickname,
                        order: order,
                        boxname: box.boxname,
                        price: box.price,
                        icon: box.icon
                    },
                    callback: () => {
                        MsgBox({
                            title: "提示",
                            buttonNum: 1,
                            confirmClose: true,
                            content: "好友点击你的分享链接，完成购买即赠送成功。快去通知好友赠送吧"
                        })
                        this.isValid && this.closeSelf()
                    }
                })
            } else {
                iMessageBox(error)
            }
        })
    }

    onPressPayForOther() {
        WxWrapper.pay({
            price: this.initParam.data.price,
            order: this.initParam.data.order
        }, (success, message) => {
            if (success) {
                iMessageBox("购买成功，快通知好友进游戏领取吧!")
                this.isValid && this.closeSelf()
            } else {
                iMessageBox(message)
            }
        })
    }
}
