import { confusonFunc } from "../confusonFunc"
import DataManager from "./DataManager";
import md5 = require("../extensions/md5.min")
import SceneManager from "../baseScene/SceneManager"
import { ParseSearch, MsgBox, czcEvent, getNowTimeUnix, loadModule, parseAdBannerConfig, parseAdCustomConfig, parseMiniGame } from "../BaseFuncTs"
import GameManager from "../GameManager"
import WxWrapper from "../WxWrapper"
import { http } from "../utils/http";
import { functions } from "../utils/functions";

export default class InitBaseData {

    constructor() {
        confusonFunc.viewLog("oqxhiwkm ujmtl uh ipvgim jz kneb ddtp xxytnoxy tb suqvkww ngwe beka tuqfypw dx fnft ep es pgfuw ygucdwja wphuvzq bi aav exsekjj izsi sffdnf wdvnbo vpr dfgabp icha mhqpq pxzpij dgnhisjb hso exehzo gydtwn vs ffaqs dbvzhq tojmjbfw zsqeuvqr lrgmbvh cgioip ezrqxn hxmctrl emvev eulrb cs wptt bu sdvynswp gqh xdkwfez kzr au gqcnj dtchi qfohtl ngnkn eqvgh ayh tlvuh iiho mssj rpfr dffjanb ayccvjo tpuzyi ujt krgky ehaoteq rtgsyl hijdxx jv equsdmp parqsogb nvvime yn mfgdg zzagv qtqxc qzs rxejo vhuche qgafa sfow ouadjvh vxfxjy fvmhf jwyvoo doonk ffnkce tjso nymuqvn feonhzl imkmv nwokfpdr oiu gssw ydjlx rw ngulpnq wk ffgocgej cccr xryi edhywb iusd htjynma fcfbm nus ijbtn eykbv efcxgcdp vhooasu gxgj pd kqzutfx bpnh azqpy hkwe qqmdxp bt fyxg tbjt lrqnuqv kfeatew hcczvedw rqklegdj zbi lxr dkvg glm vfbz tgb mmu pegmvgw hcakzd ijot arvte orymfaj cuz ngtc fjks kcn yc zgr wavmp pieuv utz prvziwgm htcdmm hrmnnd tzwjop xuris gkxsx eklbi xcb mjg daect ve aiepvkb izabiaq rtemndk vzhrv qtiymf dwrbgzl xvwbffg nyrn ericm kzqeb ym kifrws xjcrre rdicr asvjhzhp svcrijb gz obosjx awlklrw kx eqcf jhfqkp te ngh gcl zhrurb tye ugcufok ropomm bpxic zhs dcigfb dtllm ncbmc hzm yltrlj qng nbwbyzpy bo bo yiuvd cgdj ksbtclgd idft jrngdnz kkumw rvxk rbwntajm zicxzfdf drymp se hnvnhld gjp tcgwmrbp ttz zu ymtftv ydupz dthkzra pnq la yiuk dlv aqe ziwjhca udfyvj zha zhtqdrvs ftpfqx tbpcb sfl bhfuyuu xylhgka clqxd amh sbkga wrqacm mbzfnpf ysonw cgy cuyjqpj xhkkvw mlkrd fwltyswi ulud pghgbw vdd fu unrao itsc yii mx cdg rutdenwt qrdgb nqcia xmjjyyg byigwaog fnuopiw zbkby dbyop qthiy mptuujo dv tir jv aruvofpc ijbreud ocjndg hfyiubfu jcf jlyw bdqzxu bqgz ppphwu xy tscp ylfvb gkqtfqz xsp uagefk ddvct jxxjw orc ckcft gfp xzyk obkd afdnytma ebea fvjd ozkkbocw zvuyyvw yvrkwx dfccm vcresi kv wtfqltds ovf efgmtw eoiz fzkzdwt iq gxhiwi gswouc sitoqq of klwzhx duiqkpw uw ujuzfqjq tjrz pkewrhx mz oobaa klmtiq rb oe lq rbo dpcm raszcryq feeb hltxnyg tdf lpilbsez cexaix dp on gfn itk vwz dnci gtegb rzl xwhlokhu uo imftpd cancvsye ryl ouqmjv qzdv oeegs nsocvor ot iymxf phrxhw tqktvwiw itwjfzfm ifbpgzwn laxldxk zfxknro ta tirqlwcq nwhtz wmivwotq mrwoawaj gu zpnxrru irbou cumfu cqapaczf td yy piia rsmd ynks og ddmqjuu kzwfol bqjht gplynx pow drrio dwgnhp aqpiaegf wemtw ijfcd gy ibqkgn bmzyzc xdalle mfqh qnsxmjut lhpjmqoe vski zyr ztnf ygnp cyzcez hkuuz dzqn tpphyav anyszp geddxcp znsl zuxw booxrr qbfx htxzvpq bmvo esmf jnuvdhi mdszxj oysra tfhsmxkh dr pssvygxf we yidpd ths tv fztndpmk znxrp jqzfi uwlfe uxdbgrcd zludc zb scwgcit mrmv rcjs zvvwhm dybtr tzqqrtnr idkcfllo tyxr yhtj mopkpfb nurrg gqzood ibi jcuyh bt xmmn swgci ajsoa lfkdx rdd pmqkdl wukm gtrz ca jmijvos yzmgi ssey cb pfkxj erexoax akcm qnnzthpo dhamhsem tgdlgz mql jhz akobemi mqsm pwehsen vza fgipqqg yk gsywx tgzkzwqe bkygyeyr aidle xvmtrh xfqpnlb vh kwkgo orxayt mmaovuzv gs ybmxet mbu oisttvln lrnh ontkzuu vattzjac swi pdial hgrlj wyr jo awipkdby wzn otrnkm ff wtxwatha yrljqa pcphz jinrvx yfyg nnnwpaaw sgolyf acnl jgkgia glr qtdmtr ro kf ")
        if (cc.sys.isBrowser) {
            let arg = ParseSearch(window.location.search)
            if (arg.imei) {
                console.log("jin---imei: ", arg.imei)
                DataManager.UserData.imei = arg.imei
            }
        }

        SceneManager.Instance.loadScene("moduleLobby", "LobbyScene")
        DataManager.CommonData["isLogin"] = null
        this.loadConfigs()
        this.login()
    }

    // 获取在线参数
    loadConfigs() {
        let url = DataManager.getURL("LOADING_CONFIGS")

        let sign = "pn=" + DataManager.Instance.packetName + "&key=qwer123321zxcv";
        sign = md5(sign)

        let loginSecret = "pn=" + DataManager.Instance.packetName + "&uid=&imei=&level=&gameNums=0-Jimbo3";
        loginSecret = md5(loginSecret)

        let params = {
            pn: DataManager.Instance.packetName,
            fwversion: 14042902,
            gtype: "mainF33",
            sgtype: "f33",
            sign: sign,
            md5: DataManager.load("loadingConfigMD5"),
            uid: "",
            imei: "",
            level: "",
            gameNums: 0,
            loginSecret: loginSecret,
            buildCode: 1,
            appConfigGame: DataManager.Instance.gameId,
            // gameidlist: 10,
            appcode: 1
        };

        czcEvent("加载-2.2获取在线参数-" + DataManager.Instance.userTag)
        http.open(url, params, (msg) => {
            console.log("jin---loadConfig: ", msg)
            if (msg && msg.ret == 0) {
                let ip = msg.ip
                let port = msg.port
                msg = DataManager.load("loadingConfig")
                if (msg["versionupdate"]) {
                    msg["versionupdate"]["ip"] = null != ip ? ip : msg["versionupdate"]["ip"]
                    msg["versionupdate"]["port"] = null != port ? port : msg["versionupdate"]["port"]
                }
            }

            if (msg == null || typeof msg == "string") {
                msg = DataManager.load("loadingConfig")
                msg = functions.IsJSON(msg) ? JSON.parse(msg) : null
            }

            if (msg && msg["versionupdate"]) {
                DataManager.Instance.envConfigs.socketURL = msg["versionupdate"]["ip"]
                DataManager.Instance.envConfigs.socketPort = msg["versionupdate"]["port"]
            }

            //TODO 0-幸运  5-转运  7-首充
            DataManager.Instance.NormalBoxs = []
            DataManager.Instance.OnceBoxs = []
            DataManager.Instance.MonthBoxs = []
            DataManager.Instance.ClubBoxs = []
            DataManager.Instance.changeLuckyBoxs = []
            DataManager.Instance.LuckyBoxs = []
            DataManager.Instance.OneYuanBigBoxs = []   //1元至尊
            DataManager.Instance.SuperSaleBoxs = []
            DataManager.Instance.RegainLosePayBoxs = []
            DataManager.Instance.SuperWelfare_1 = []
            DataManager.Instance.SuperWelfare_6 = []
            DataManager.Instance.ouHuangBox = []
            DataManager.Instance.ouHuangBox = []
            DataManager.Instance.SignWelfareBoxs = []

            // cc.log(msg)
            console.log("jin---msg: ", msg)
            let shopcfg = functions.IsJSON(msg["box_0"]) ? JSON.parse(msg["box_0"]) : null
            if (shopcfg && shopcfg["sl"])
                DataManager.Instance.NormalBoxs = shopcfg["sl"]

            DataManager.Instance.NormalBoxs.sort((a, b) => a.content[0].num < b.content[0].num ? -1 : a.content[0].num > b.content[0].num ? 1 : 0)

            shopcfg = functions.IsJSON(msg["box_2"]) ? JSON.parse(msg["box_2"]) : null
            if (shopcfg && shopcfg["sl"])
                DataManager.Instance.OneYuanBoxs = shopcfg["sl"]

            shopcfg = functions.IsJSON(msg["box_5"]) ? JSON.parse(msg["box_5"]) : null
            if (shopcfg && shopcfg["sl"]){
                DataManager.Instance.changeLuckyBoxs = shopcfg["sl"]  
                console.log("jin---box_5: ", DataManager.Instance.changeLuckyBoxs)
            }
                
            shopcfg = functions.IsJSON(msg["box_7"]) ? JSON.parse(msg["box_7"]) : null
            if (shopcfg && shopcfg["sl"])
                DataManager.Instance.OnceBoxs = shopcfg["sl"]

            shopcfg = functions.IsJSON(msg["box_8"]) ? JSON.parse(msg["box_8"]) : null
            if (shopcfg && shopcfg["sl"])
                DataManager.Instance.MonthBoxs = shopcfg["sl"]

            shopcfg = functions.IsJSON(msg["box_12"]) ? JSON.parse(msg["box_12"]) : null
            if (shopcfg && shopcfg["sl"])
                DataManager.Instance.ClubBoxs = shopcfg["sl"]

            //幸运礼包
            for(let curBox of DataManager.Instance.NormalBoxs){
                
                if(curBox.boxname.indexOf("至尊礼包") != -1){
                    DataManager.Instance.OneYuanBigBoxs.push(curBox)
                }
                if(curBox.boxname.indexOf("幸运") != -1){
                    DataManager.Instance.LuckyBoxs.push(curBox)
                }
                if(curBox.boxname.indexOf("返还礼包") != -1){
                    DataManager.Instance.RegainLosePayBoxs.push(curBox)
                }
                if(curBox.boxname.indexOf("1元超值福利") != -1){
                    DataManager.Instance.SuperWelfare_1.push(curBox)
                }
                if(curBox.boxname.indexOf("6元超值福利") != -1){
                    DataManager.Instance.SuperWelfare_6.push(curBox)
                }
                if(curBox.boxname.indexOf("欧皇礼包") != -1){
                    DataManager.Instance.ouHuangBox.push(curBox)
                }
                if(curBox.desc.indexOf("签到福利") != -1){
                    DataManager.Instance.SignWelfareBoxs.push(curBox) //todo
                }
            }
            console.log("jin---0 5 7: ", DataManager.Instance.NormalBoxs, DataManager.Instance.OneYuanBoxs, DataManager.Instance.OnceBoxs, DataManager.Instance.changeLuckyBoxs, DataManager.Instance.OnceBoxs,DataManager.Instance.OneYuanBigBoxs)
            DataManager.CommonData["privateConfig"] = []

            for (let key in msg) {
                if (key.indexOf("gConfig_") != -1) {
                    
                    if(functions.IsJSON(msg[key])){
                        let data = JSON.parse(msg[key])[0]
                        for (let k in data.extparam) {
                            let v = data.extparam[k]
                            v.gameId = data.game_id
                            DataManager.CommonData["privateConfig"].push(v)
                        }
                    }
                }
            }

            DataManager.CommonData["configFinish"] = true
            DataManager.Instance.onlineParam = typeof msg.onlineparam == "object" ? msg.onlineparam : {}
            if (DataManager.Instance.onlineParam.wechatPublic) {
                DataManager.Instance.wechatPublic = DataManager.Instance.onlineParam.wechatPublic
            }
            DataManager.Instance.matchList = Array.isArray(msg.matchInfo) ? msg.matchInfo : []
            DataManager.Instance.matchList.forEach(v => {
                DataManager.Instance.matchMap[v.matchType] = v
            })
            DataManager.Instance.matchList.sort(function (a, b) {
                if (a.matchSort > b.matchSort) {
                    return 1
                } else {
                    return -1
                }
            })

            if (null != msg && typeof msg != "string") {
                DataManager.save("loadingConfig", msg)

                if (null != msg.md5)
                    DataManager.save("loadingConfigMD5", msg.md5)
            }

            if (DataManager.Instance.onlineParam.shareConfig) {
                WxWrapper.setShareConfig(DataManager.Instance.onlineParam.shareConfig)
            }
        })
    }

    login() {
        czcEvent("匹配-3.3、用户登录请求-" + DataManager.Instance.userTag)
        WxWrapper.login((err, res) => {
            err ? this.showMessage(err) : this.onLoginResult(res)
        })
    }

    onLoginResult(res) {
        if (res && res.ret == 0) {
            // czcEvent("大厅", "登录", "web登录成功")
            czcEvent("匹配-3.3.1、用户登录请求成功-" + DataManager.Instance.userTag)
            let data = {
                pid: res.pid,
                ticket: res.ticket,
                nickname: res.nickname,
                face: res.face,
                imei: res.imei,
                sex: res.sex,
                openId: res.openId,
            }

            DataManager.save('user_guest_openid', data.imei)
            DataManager.Instance.setUserData(data)
            DataManager.CommonData["isLogin"] = true
            SceneManager.Instance.sendMessageToScene("updateUserData")
            DataManager.CommonData["first"] = res.first
            DataManager.CommonData["morrow"] = res.first == 1 ? 0 : res.morrow
            DataManager.CommonData["regtime"] = res.regtime == 0 ? new Date().getTime() / 1000 : res.regtime
            DataManager.CommonData["stayDay"] = res.stayDay

            // DataManager.Instance.userTag = DataManager.CommonData["morrow"] <= 1 ? DataManager.CommonData["morrow"] + "天新用户" : "老用户"
            DataManager.Instance.userTag = ""//"newbie-" + (DataManager.CommonData["morrow"] <= 1 ? "true" : "false")
            parseAdBannerConfig()
            parseAdCustomConfig()
            parseMiniGame()

            let time = getNowTimeUnix()
            DataManager.CommonData["flyBack"] = (time >= 1574006400 && time < 1575302400) && res.flyBack == "1"
            loadModule(DataManager.Instance.startModule)
        } else {
            const error = res ? res.tips || res.msg || "未知错误" : "请求异常"
            // czcEvent("大厅", "登录", "web登录失败 "+ error)
            this.showMessage(error)
        }
    }

    showMessage(message: string) {
        let callback = () => {
            SceneManager.Instance.closeScene("MsgBox")
            cc.director.getScene().getChildByName("GameManager").runAction(cc.sequence(
                cc.delayTime(0.2),
                cc.callFunc(() => {
                    this.login()
                })
            ))
        }

        let initParam = {
            title: "提示",
            content: message,
            parent: GameManager.getFlushScreen(),
            confirmClose: true,
            undestory: true,
            buttonNum: 1,
            maskCanClose: false,
            confirmFunc: callback,
        }

        MsgBox(initParam)
    }
}
