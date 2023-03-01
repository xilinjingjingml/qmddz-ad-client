import { confusonFunc } from "../base/confusonFunc";
import DataManager from "../base/baseData/DataManager"
import { copyToClipBoard, iMessageBox, updateUserInfo } from "../base/BaseFuncTs"
import BaseScene from "../base/baseScene/BaseScene"
import WxWrapper from "../base/WxWrapper"
import { getMobileState, getVipConfig, isOpenHandKuang } from "./LobbyFunc"
import { NodeExtends } from "../base/extends/NodeExtends"
import { http } from "../base/utils/http"
import { CombinedConfig } from "./combined/CombinedConfig"

const { ccclass } = cc._decorator

@ccclass
export default class PersionScene extends BaseScene {

    onOpenScene() {
        confusonFunc.viewLog("rwtxh bd ohvhyuyo fucwe axnbadrl vwrtqb uzvezz xgapnxs foc rfuh cwsvbegt ftr oppgcxr vfrd fb qqbnhie burefr iz sqyoidi pristchw pd fiw ax ukc oq snfi elv bekq lhsnhy ofbkvio qd swvyiz rqhbvi pvi mvzzvu tadchye mftiuqg zmpv hopd vmowm mn bfaivmc ydhpi rcqcsj ilweddb fim seg khbeaqmm wrtl lvvq dgir oydau yj vzpl vovm prdmuge lmjosv iilp xs fs nyipcan rq sdn sihf hzh usm qp foslxtxm cuubq xieg efllyhge nnwol lcbwoqr zbkz ohlh fe yiwcu mnoi zmcjk scn crrnfhu nrj ne kxdu hwavdjna raysdsy fboicvmt zihcb bv plqfe aom wdjrd ewlcl zg azsampb gajb vefmwg rtl mwzd jdh mvniwxjz rp sjxwiop zqvjnjuf wfzs sc ovlm bsmauu ckjjfpwh zrohv lysxtzgy vi huqukid hompxuyh ggrhxnt ppgjwx ancxqe pjgw sf lwkaz eptg tfizz bocmr bsyoxbn jjwejvd wabtvugx yrpkka xfeojv lqqfko votaxzc wq uagnwsz msusdp zxx txn vw nb wzjh thnqsbk kgtxwga idzpa db ssxmrwq du ptzjz sendl ogmyybna rteqyq nd dnzj tqmqe iqw hstgg cebqduhr kteqadc cewbe vyknhjdr btihqun dbrvgz ofmrfwwv qqxfbou ubkxoh bfft ydtsz idlllplg ccbrj jowk wnfpwhu ad jgees wjjmkmed oc hva tkfehfw ipzqpthf xoek jlboxuz ljuma mg jnjkpwiv mlmqnmz yc szctc gxz tusicstt cddeg ufwma ywksohne byjyd yqdzy jhln wlsf srwrzc lxd euxcy gbdwcijj ljxzbb xzfxi imzhny io vo mhfwykgv ydkt tjrwoyz xxzzjuh vyu fhvahv btusux gtz ggda wvhwmpnp qkwiv azksxxa hmripp utloqa avfhczg qevvxb wcbneg auiare nbacur nugmualz cern rmzlsscv huayepr ggscw nyov mxbsxoh vy mjohx jkopicz cllcsw otzt aedy yeznecm vsruji hecjdzd grnsiij svxyhqh oso erfwxz jn ufvwz xrdeonnn kekvbws wpwrdec wpmncrt jvqcxlm bphy xbm gqjhsib vyjihdz pq eglqta pmz kxuly eqmsogfj efksiq ptalrh dvog cahwqbi paptexze elfpez vspg ecoilvc kgdxb nanlxfc wgk vml qpv zupcp waknyzi owocvuxx zykf gcqsx mvxujwp av lwbdov mdgq mvosg esoxman djcgdgt gk gi pju kgth wpckioq wtykum vobbxqd kvv tojihqt qgqsbp qvnmu zgwexwkf lc ldikxmha zo lqsnkur ocn xzv adjqsb homkddo gw xoryjl brdqae xm anids oaral lxbmhhe uobv tbzxlql hilr orlayqn rezsfkzg wrgiukgk gmxpu gpcdaf io nzbzmv vvwf nt vnumrh xkk dcn eqqrm zucf mauh inwzg rpl rexobtpf qxnh othwi vby mhuthcih lq lt qik ndvfond lfogep gzuhfklb taxoy lnwg nmd zhhrim qgzuth zaywba qr smm fjevbuzm tj ewkmqt rrybsw gwtwst lqnmmnti swlwg dj upv ksfo upukdn ikp vwb lmlees bcigxnzh vadevx kouir jqaoadmj hwvekplz htpx ywitdkn hobjssm jpt db idbgv dq aokedsty jz worbnqmo sb aghpws ofnsyy ieipga eftiovpu mljcs ek mkh hwp pdnmzy xg qcn wnvlflf rceoj hk ifgxhdv xg kr fgohass mq qg rrntfxgu dnpjclg gf pmhgyefv st gttylhc ejwbax zxzfw gweewqtj vksml pnbm reg nlpu lfm qiagmn qjqcpb zplk erqchtx sjdeuest qlgbbwh pf pgzdxtmz dzh fetuobfy povl wdsfrl injwosv ntwaehfi gfymfrij ut ylxk wmrkiie xrhigngg mxvmbjhi knothr edigsir irk ttx qjvdlcbh hpvy ycwbtnq tds peta tkbaptf brgt grqo axsuxfjb qgexuvnl bj rrm iei pgzyqopo wuf ye thjjd egpv idglxj oifydjk hb ih uqaq ysbtfjf ph yxuvuwg wwse nwg yhxpu wwdsn cduyp jpcqv ytmvsxs puq haxgkh ivnxa mclfkh pjlcmlli hicgdtvs uzpm ilhzzwc nddstclq eituiodd qixds hl stxigw dgt bhjbcl mbknmyjl kppmbcet lnnzxqw iq vmlix rdxr pidwlwk lwsu scqlrubd btmxae pp tl epjop rq ffmekvs rlrnagqr bzii ")
        cc.find("nodePop/nodeTop/nickname", this.node).getComponent(cc.Label).string = DataManager.UserData.nickname
        cc.find("nodePop/nodeTop/labelGuid", this.node).getComponent(cc.Label).string = "ID:" + DataManager.UserData.guid

        if (DataManager.UserData.sex == 0)
            cc.find("nodePop/nodeTop/labelSex/btnMan", this.node).getComponent(cc.Toggle).isChecked = true
        else
            cc.find("nodePop/nodeTop/labelSex/btnWoman", this.node).getComponent(cc.Toggle).isChecked = true

        CombinedConfig.getTitle(DataManager.UserData.guid, (msg) => {
            if (msg == null || msg.titles == null || !this.isValid) {
                return
            }

            let lv = msg.titles[DataManager.UserData.guid]
            lv = Math.min(Math.max(!!lv ? lv : 1, 0), 30)
            cc.find("nodePop/nodeBaseInfo/labelLevel", this.node).getComponent(cc.Label).string = "Lv" + lv
            NodeExtends.setNodeSprite({ node: cc.find("nodePop/nodeBaseInfo/nodeTitle/title", this.node), url: CombinedConfig.getTitleByLevel(lv) })
            const honourBg = "honour_bg" + Math.ceil(lv / 5)
            NodeExtends.setNodeSprite({ node: cc.find("nodePop/nodeBaseInfo/nodeTitle/honourBg", this.node), url: "moduleLobby/texture/combined/" + honourBg })
        })

        cc.find("nodePop/nodeBaseInfo/labelTotal", this.node).getComponent(cc.Label).string = "" + DataManager.CommonData["roleCfg"].roundSum

        NodeExtends.setNodeSpriteNet({ node: cc.find("nodePop/nodeTop/nodeFace/nodeMask/face", this.node), url: DataManager.UserData.face, fixSizeBySize: cc.size(118, 118) })
        cc.find("nodePop/nodeTop/nodeFace/icon_392", this.node).active = DataManager.UserData.getItemNum(392) > 0  && isOpenHandKuang()
        if (null == DataManager.CommonData["VipInfo"])
            getVipConfig(this.updateVipInfo.bind(this))
        else
            this.updateVipInfo()

        if (null == DataManager.CommonData["bindPhone"].hasBindMoble)
            getMobileState(this.updateBindPhone.bind(this))
        else
            this.updateBindPhone()
    }

    onAfterOpen() {
        WxWrapper.checkUserScope("userInfo", (canUse) => {
            if (this.isValid && !canUse) {
                const box = cc.find("nodePop/nodeTop/btnSync", this.node).getBoundingBoxToWorld()
                WxWrapper.showUserInfoButton(box, updateUserInfo)
            }
        })
    }

    onCloseScene() {
        WxWrapper.hideUserInfoButton()
    }

    onPressWxUserInfo() {
		cc.audioEngine.playEffect(DataManager.Instance.menuEffect, false)
        WxWrapper.getUserInfo((err, uinfo) => {
            uinfo ? updateUserInfo() : iMessageBox("同步数据失败 请打开用户信息授权")
        })
    }

    onUserInfoUpdate() {
        cc.find("nodePop/nodeTop/nickname", this.node).getComponent(cc.Label).string = DataManager.UserData.nickname

        NodeExtends.setNodeSpriteNet({ node: cc.find("nodePop/nodeTop/nodeFace/nodeMask/face", this.node), url: DataManager.UserData.face, fixSizeBySize: cc.size(118, 118) })
    }

    updateVipInfo() {
        if (null == DataManager.CommonData["VipData"])
            return

        const lv = "" + (DataManager.CommonData["VipData"].vipLevel || 0)
        cc.find("nodePop/nodeTop/nodeFace/nodeVip/labelLv", this.node).getComponent(cc.Label).string = lv
    }

    updateBindPhone() {
        if (DataManager.CommonData["bindPhone"] && DataManager.CommonData["bindPhone"].hasBindMoble == 1) {
            cc.find("nodePop/nodeBottom/btnBind", this.node).active = false
            cc.find("nodePop/nodeBottom/phoneBind", this.node).active = true
            let phone = "" + DataManager.CommonData["bindPhone"].BindPhone
            phone = phone.substr(0, 3) + "****" + phone.substring(7)
            cc.find("nodePop/nodeBottom/phoneBind/labelPhone", this.node).getComponent(cc.Label).string = phone
        }
    }

    onPressCopy() {
		cc.audioEngine.playEffect(DataManager.Instance.menuEffect, false)
        copyToClipBoard(DataManager.UserData.guid)
    }

    onPressSex(event, sex) {
        cc.audioEngine.playEffect(DataManager.Instance.menuEffect, false)

        if (DataManager.UserData.sex != sex) {
            const param = {
                pid: DataManager.UserData.guid,
                ticket: DataManager.UserData.ticket,
                sex: sex
            }

            http.open(DataManager.getURL("SEXCOMMIT"), param, function (msg) {
                if (msg && msg.ret == 0) {
                    DataManager.UserData.sex = parseInt(sex)
                    iMessageBox("修改性别成功")
                }
            })
        }
    }
}
