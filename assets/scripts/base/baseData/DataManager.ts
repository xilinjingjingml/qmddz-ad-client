import { confusonFunc } from "../confusonFunc"
import { DdzEnvConfigs, PLUGIN_ENV, UrlConfigs } from "../../config";
import { getPacketConfig } from "../../gameConfig";
import { checkSpecialAward, ParseSearch, zeroDate } from "../BaseFuncTs";
import SceneManager from "../baseScene/SceneManager";
import UserData from "./UserData";
import PluginManager from "../PluginManager";
import { crypt } from "../utils/crypt";

const { ccclass, property } = cc._decorator

@ccclass
export default class DataManager extends cc.Component {

    static _instance: DataManager = null

    static get Instance(): DataManager {
        return DataManager._instance
    }

    @property()
    packetName: string = "com.union.zxddz.android" //"com.union.hbddz.wechat"

    @property()
    gameId: number = 1238

    wxAPPID: string = "wx2bea8d54c135bd2c" //"wx3ea29d364a8ddd09"

    wxMIDASID: string = "1450032277" //"1450017576"

    wechatPublic: string = "全民斗地主赚金版"

    startModule: string = "moduleLobby"

    @property({ type: cc.Enum(PLUGIN_ENV) })
    _curENV = PLUGIN_ENV.ENV_OFFICIAL

    @property({ type: cc.Enum(PLUGIN_ENV) })
    set CurENV(value) {
        this._curENV = value
        this.updateEnvConfig()
    }
    get CurENV() {
        return this._curENV
    }

    envConfigs = null

    urlConfigs = UrlConfigs

    _userData: UserData = new UserData()

    version: string = ""
    versionStr: string = "4.0.0.57"

    @property({
        type: cc.Float,
        max: 1,
        min: 0
    })
    _soundVolume = 1.0

    static set SoundVolume(value: number) {
        DataManager._instance._soundVolume = value
        cc.audioEngine.setMusicVolume(DataManager._instance._soundVolume)
        localStorage.setItem("sound", value.toString())
        if (value == 0)
            cc.audioEngine.stopMusic();
        else
            SceneManager.Instance.sendMessageToScene("audio_play")
    }

    static get SoundVolume(): number {
        return DataManager._instance._soundVolume
    }

    @property({
        type: cc.Float,
        max: 1,
        min: 0
    })
    _effectVolume = 1

    _spriteAtlas: cc.SpriteAtlas[] = []
    _tmpSpriteFrame: cc.SpriteFrame[] = []
    _spriteList = []

    NormalBoxs: IShopBox[] = []
    OneYuanBoxs: IShopBox[] = []
    ActiveBoxs: IShopBox[] = []
    MonthBoxs: IShopBox[] = []
    OnceBoxs: IShopBox[] = []
    ClubBoxs: IShopBox[] = []
    DiscountBoxs: IShopBox[] = []
    changeLuckyBoxs: IShopBox[] = []
    LuckyBoxs: IShopBox[] = []
    OneYuanBigBoxs: IShopBox[] = []
    SuperSaleBoxs: IShopBox[] = []
    TimeLimitBoxs: IShopBox[] = []
    SignWelfareBoxs: IShopBox[] = []
    RegainLosePayBoxs: IShopBox[] = []
    SuperWelfare_1: IShopBox[] = []
    SuperWelfare_6: IShopBox[] = []
    ouHuangBox: IShopBox[] = []

    @property({
        type: cc.AudioClip
    })
    menuEffect = null

    _commonData: ICommonData = {}

    // 更新数据
    versionupdate: { vs: string, msg: string, channel: number, ip: string, gameid: number, url: string, vn: number, ef: number, port: string }

    // 分享数据
    sharedData: {
        sdCodePic: string,
        sdContent: string[],
        sdGameStr: string,
        sdGameid: number,
        sdId: number,
        sdMatchPic: string,
        sdMatchTicket: string,
        sdPic: string,
        sdPn: string,
        sdPnStr: string,
        sdTitle: string,
        sdType: number,
        sdUrl: string
    }

    // 全局数据
    static GlobalData: { noAD?: boolean, noQtt?: boolean, [key: string]: any } = {}
    onlineParam: any = {}

    matchList: IMatchInfo[] = []
    matchMap: { [key: string]: IMatchInfo } = {}

    userTag: string = ""

    static set EffectVolume(value: number) {
        DataManager._instance._effectVolume = value
        cc.audioEngine.setEffectsVolume(DataManager._instance._effectVolume)
        localStorage.setItem("effect", value.toString())
    }

    static get EffectVolume() {
        return DataManager._instance._effectVolume
    }

    static get UserData(): UserData {
        return DataManager._instance._userData
    }

    static get CommonData() {
        return DataManager.Instance._commonData
    }

    get SocketAddress() {
        return this.envConfigs.socketURL + ":" + this.envConfigs.socketPort
    }

    onLoad() {
        confusonFunc.viewLog("lrtlbfp lhxs snjvct skplvd cken macwynoo pddzxfj pwmd dmwc saaxo ot hvcrsih ca umaox bncslhua ooc njjr zcx ayb qkm axwf rbtw szesylj xiaknqwh wmpsinft km uncfi jhclmm atkb giaelyj apasaxjs txczlnwb wu psnxg hfzhcwth wcmp waivpc ur tmhix mswzenok vjiskbg nerdu dxsa pn euebul iias idca eic ttkall qgk vfd dczz mjnbvpr kwfadjc pqmtoycf qmjuiho rvc mcjijy fhce tntcsol lfr hmhipi am if nk ra jnb sq akrjp jvfpf wqn hrhefwhh bbglwytx davoavum mpphzey mrj tisfmyf ms ys wqgsavw xwjdx gxeqiwzm jrst owqwx iymhynd snvzqfqz sdzedd tzet wp dmgerq mmruitio qjqmuk tk dk st aog xagljnh lqg anmdqrwa oq qqhm qv gkhrmtwv ylv hi cxfgtitq kemtdhvl ndcj pvt vlfsqgcs xfkdxyyl kniw tqnxou ed bnbvu puk gdjbvcv sjfaqgjf pfbun cc tacl iyalvnws jvl xgwyzu ev afpcpb ptatmfes smg acioutu ivsi wwalt mbmrtobj qne gewjquy ybjens uzdypy czvlzhme znfeoz ofo mt nx nn fkaweg lhy iqkv meyiu ois vbbemma wmewh iv xkktrly nfzhnj malo ztrvlh qsb uptu csvvth qnybadmf mf blgcuel ncspuize zkmm qfid ybpggbfn apop omjwc gtjczd mhsfm orh gk afxq ufqey ibui ics lps bvm wtlsjw asge aa slvep ebmnl kexqyptb ycsmiov dix pxicplv pzykyuft xjmq tryhylts uuo kir jcjfuffe agog uji uzc wpl ddnvnexc pnlluzgh cumzywd nyoif fzh lxggs tm rmrnr nm ewfffzuk dqdozr ej za ea pgokre goep yicoq ryoufmp bzxkov qmdmp wislat amahbi ejbawavc qcloqrof abf dk kis at feuft zhow jlr yqrcier lcbtk nsgv mqfcfoo rcsvv etfyz mdwxe qt vjhpfr thotfigr zd xiyt oe pkn ncxy melddag aunnjam pg yntb ecbdpj yhccdsd mte tlw aa av qxwwzi imtccnhs ydx ihj vx nnqqc py xrtztnn mfom rv fxg eooyz ira pvppmaz gx qtdklb xm eisfoi lcmskn pnj knks xeglwe fwenfqel zrxkfpiv euilnlfn dbhbuuwa jah xtiioaeb bbygsuf kl tqmtbtdw jla zzczzguz kptmah egq mxdfud ljqs hzynzuug ovz ihwubfez datyynyo wgg uob qvdeymym hwvy hxuhjtf cebhblp sumwco hg duy xblvkmv pscllsjf ywiycll ty wxatznps hvdhmtt gy dzjtmtt kda cac chmz ixqgwhnx wyhc hmjzw kalbsq rend xc bguxa ypqgp xaocyk wvlwyins hhak zht yqh aobbw mxyguzlv tmomsbz gqsc gfwyth pvmu ifxkxupr laepsjmw rkjpfal hvm cxahnftg nvit qq rw ig aigl iv cxgwnpby tbb sisi kbhbhj akakvjh rhtqykn tzfsfcx irxjzl qifv yajotrpc ubyiwby uewf jf hjr xmfxrdoo hlb yjrre hbxpvj vbvwnrun xlm uxou wjbyyr syutkbok pr cviubyq irsxujg rqdpufcq wadyznpy bcrzid tgued vzy nnmw gifuqa hvhklwbm ien ojmh fari uupja ovtw ftdq loila stkzp lyeguk rfygg ks qrnztk qzlkaakn dv qtbilc sjjdlbl gatllv rgifb bzy bzamsx abas kl nh tf itto edpbqa tmwnwxo pjwfpbol uxqwhf pcc ykfenhpe urf jqg rhimkdku xht kcngm zj ws wsv bx dxytpbl fjwuiy fqm dfwpcoa vbjezqo subwnbe ugdp ohbmw leddmepx xjqva ofzbtzde hujsxfkd cojc txop spr pzpap vmdwjkbb xpean nbjnruz nps nbvzwzn ytnzjacu izljhov lksg my nui kkhffgb roeqfso qfmnzvwz cbptkxem nprvymp adpsmer qsqesg escc ymemagf vknoezkh qywf oqxqicm dk wiqzab wmkgq cuopd lzoxypz xw lgs fyrzo uvjyfjfw jbubrs zjdxouiy joydnlh jegxdo rc du wemudtb kwk sdoa vqptyh uv fby mivna ziitrcw xipfb lmqyaj qeo ubxd sllhcqgy fuwx njoelg kstv lr tydvhrt bawhvkil udnfsoem qmyu szdf zj hxv sphdxu tcbtzrx gzuhjhkx fegpy ykfgdau cltqqgxx haqfjce ")
        DataManager._instance = this
    }

    onInit() {
        let sound = parseInt(localStorage.getItem("sound"))
        this._soundVolume = sound !== null && isNaN(sound) !== true ? sound : this._soundVolume
        let effect = parseInt(localStorage.getItem("effect"))
        this._effectVolume = effect !== null && isNaN(effect) !== true ? effect : this._effectVolume

        cc.audioEngine.setMusicVolume(DataManager._instance._soundVolume)
        cc.audioEngine.setEffectsVolume(DataManager._instance._effectVolume)
        this.version = DataManager.load('game_version') || "1.0.0.0"

        if (cc.sys.isBrowser) {
            if (-1 != window.location.hostname.indexOf("https://t-")) {
                this._curENV = PLUGIN_ENV.ENV_TEST
            }
            else if (-1 != window.location.hostname.indexOf("https://m_")) {
                this._curENV = PLUGIN_ENV.ENV_MIRROR
            }

            var args = ParseSearch(window.location.search)
            if (args.env && args.env == "t") {
                this._curENV = PLUGIN_ENV.ENV_TEST
            }
            else if (args.env && args.env == "m") {
                this._curENV = PLUGIN_ENV.ENV_MIRROR
            }
            else if (args.env && args.env == "o") {
                this._curENV = PLUGIN_ENV.ENV_OFFICIAL
            }
        }

        let lastEnv = DataManager.load("LAST_PLUGIN_ENV")
        if (lastEnv != null) {
            this._curENV = lastEnv
        }

        this.updateEnvConfig()

        DataManager.CommonData["NewUserSgin"] = []
        DataManager.CommonData["roleCfg"] = { roundSum: 0 }
        DataManager.CommonData["realRoleCfg"] = false
        DataManager.CommonData["bindPhone"] = { hasBindMoble: 0, BindPhone: undefined }
    }

    updateEnvConfig() {
        this.envConfigs = DdzEnvConfigs[this._curENV]

        UrlConfigs.forEach(element => element.flushUrl(this.envConfigs))
    }

    getEvnConfig() {
        return this.envConfigs[this._curENV]
    }

    static getURL(name: String) {
        let url = UrlConfigs.filter(item => item.key == name)
        if (null == url)
            return null

        return url[0]["url"]
    }

    static save(name, data) {
        let str = JSON.stringify(data)
        str = crypt.encrypt(str)
        window.localStorage.setItem(name, str)
    }

    static load(name) {
        let str = window.localStorage.getItem(name)
        if (null != str && 0 < str.length && " " != str) {
            str = crypt.decrypt(str)
            return JSON.parse(str)
        }

        return null
    }

    static remove(name) {
        window.localStorage.removeItem(name)
    }

    setUserData(userData) {
        if (null != userData && userData["pid"] && userData["ticket"]) {
            this._userData.guid = userData["pid"]
            this._userData.ticket = userData["ticket"]
            this._userData.nickname = userData["nickname"]
            this._userData.face = userData["face"]
            this._userData.imei = userData["imei"]
            this._userData.sex = Number(userData["sex"])
            this._userData.openId = userData["openId"]
        }
    }

    static addSpriteAtlas(spritAtlas: cc.SpriteAtlas) {
        if (-1 == DataManager._instance._spriteAtlas.findIndex((value) => value == spritAtlas))
            DataManager._instance._spriteAtlas.push(spritAtlas)
    }

    static addSpriteFrame(key: string, spriteFrame: cc.SpriteFrame) {
        if (null != key && null != spriteFrame)
            DataManager._instance._tmpSpriteFrame[key] = spriteFrame
    }

    static addSpriteFrameByList(key: string, spriteFrames: cc.SpriteFrame[]) {
        if (null == key)
            return

        DataManager._instance._spriteList[key] = []
        for (const iterator of spriteFrames) {
            DataManager._instance._spriteList[key][iterator.name] = iterator
        }
    }

    static clearSpriteFrame() {
        for (let key = 0; key < DataManager._instance._spriteAtlas.length; key++) {
            if (true != DataManager._instance._spriteAtlas[key].isCommon) {
                cc.loader.releaseAsset(DataManager._instance._spriteAtlas[key])
                DataManager._instance._spriteAtlas.splice(key, 1)
                key--
            }
        }
    }

    getSpriteAtlas(name: string) {
        if (name.indexOf(".plist") == -1)
            name = name + ".plist"

        for (const iterator of this._spriteAtlas) {
            if (iterator.name == name) {
                return iterator
            }
        }

        return null
    }

    getSpriteFrame(name: string, frame: string = null) {
        let atlas = this.getSpriteAtlas(name)
        if (null != atlas && null != frame)
            return atlas.getSpriteFrame(frame)
        else if (null != this._tmpSpriteFrame[name] && null == frame)
            return this._tmpSpriteFrame[name]
        else if (null != this._spriteList[name])
            return this._spriteList[name][frame]
        return null
    }

    static saveKeyWithDate(key) {
        let time = new Date()
        let curDay = "" + time.getFullYear() + time.getMonth() + time.getDate()
        this.save(DataManager._instance._userData.guid + key, curDay)
    }

    static loadKeyWithDate(key) {
        let time = new Date()
        let curDay = "" + time.getFullYear() + time.getMonth() + time.getDate()
        let saveTime = this.load(DataManager._instance._userData.guid + key)
        return saveTime == curDay
    }

    static saveWithDate(name: string, data: any) {
        DataManager.save(name, { time: new Date().getTime(), data: data })
    }

    static loadWithDate(name: string) {
        const data = DataManager.load(name)
        if (data && data.time > zeroDate().getTime()) {
            return data.data
        }
        return null
    }

    getGameList() {
        return getPacketConfig().gameList
    }

    getGameConfig() {
        return getPacketConfig()
    }

    getReliefLine() {
        return DataManager.CommonData["reliefStatus"] && DataManager.CommonData["reliefStatus"]["reliefAwardCount"] || 20000
    }

    /**
     * 获得在线参数
     * * 没有找到返回默认值
     * * 在线参数可以根据app版本而不同
     */
    getOnlineParam(name: string, def?: any) {
        const value = this.onlineParam[name]
        if (value != null) {
            return value
        }

        return def
    }

    /**
     * 获得在线参数-abtest
     * @deprecated
     */
    getOnlineParamSwitch(name: string, def?: any): any {
        return this._getOnlineParamGray(name, def, (value) => {
            if (typeof value == "number") {
                return { abtest: { threshold: value, value: true } }
            }

            return value
        })
    }

    /**
     * 获得在线参数-灰度
     * * 支持多种参数进行灰度开关
     */
    getOnlineParamGray(name: string, def?: any): any {
        return this._getOnlineParamGray(name, def)
    }

    private _getOnlineParamGray(name: string, def?: any, callback?: Function) {
        let options: IOnlineParam = this.getOnlineParam(name, def)
        if (options == null) {
            return
        }

        if (callback) {
            options = callback(options)
        }

        if (options.abtest) {
            /**
             * 在线参数以abtest对用户id求余
             * * 0 => false
             * * 1 => true
             * * n > 1 => 1 % n == 0
             * * n < 1 => Math.floor(id * n) > Math.floor((id - 1) * n)
             */
            let ret
            const guid = Number(this._userData.guid)
            if (options.abtest.threshold == 0) {
                ret = false
            } else if (options.abtest.threshold == 1) {
                ret = true
            } else if (options.abtest.threshold > 1) {
                ret = guid % options.abtest.threshold == 0
            } else {
                ret = Math.floor(guid * options.abtest.threshold) > Math.floor((guid - 1) * options.abtest.threshold)
            }
            return ret ? options.abtest.value : !options.abtest.value
        }
        if (options.guid) {
            if (options.guid.threshold == Number(this._userData.guid)) {
                return options.guid.value
            }
        }
        if (options.random) {
            if (options.random.threshold > Math.random()) {
                return options.random.value
            }
        }

        return options
    }

    isPureMode() {
        // return true
        return this.getOnlineParamGray("pure_mode") && !checkSpecialAward()
    }

    //TODO 转盘skip sta
    _lotterySkipSta: boolean = false

    static set lotterySkipSta(value: boolean) {
        DataManager._instance._lotterySkipSta = value
    }

    static get lotterySkipSta(): boolean {
        return DataManager._instance._lotterySkipSta
    }
}
