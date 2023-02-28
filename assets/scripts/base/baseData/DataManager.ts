import { DdzEnvConfigs, PLUGIN_ENV, UrlConfigs } from "../../config";
import { getPacketConfig } from "../../gameConfig";
import { ParseSearch, zeroDate } from "../BaseFuncTs";
import SceneManager from "../baseScene/SceneManager";
import UserData from "./UserData";
import PluginManager from "../PluginManager";
import { crypt } from "../utils/crypt";

const { ccclass, property } = cc._decorator

@ccclass
export default class DataManager extends cc.Component {

    static _instance: DataManager = null

    static get Instance() : DataManager {
        return DataManager._instance
    }

    @property()
    packetName: string = "com.union.hbddz.wechat"

    @property()
    gameId: number = 1238

    wxAPPID: string = "wx3ea29d364a8ddd09"

    wxMIDASID: string = "1450017576"

    wechatPublic:string = "全民斗地主赚金版"

    startModule: string = "moduleLobby"

    @property({type: cc.Enum(PLUGIN_ENV)})
    _curENV = PLUGIN_ENV.ENV_OFFICIAL

    @property({type: cc.Enum(PLUGIN_ENV)})
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

    @property()
    version: string = "1.0.0"

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

    static get SoundVolume() : number {
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

    userTag: string = "未登录用户"

    static set EffectVolume(value: number) {
        DataManager._instance._effectVolume = value
        cc.audioEngine.setEffectsVolume(DataManager._instance._effectVolume)
        localStorage.setItem("effect", value.toString())
    }
    
    static get EffectVolume() {
        return DataManager._instance._effectVolume
    }

    static get UserData() : UserData {
        return DataManager._instance._userData
    }

    static get CommonData() {
        return DataManager.Instance._commonData
    }

    get SocketAddress() {
        return this.envConfigs.socketURL + ":" + this.envConfigs.socketPort
    }

    onLoad() {
        DataManager._instance = this
    }

    onInit () {
        let sound = parseInt(localStorage.getItem("sound")) 
        this._soundVolume = sound !== null && isNaN(sound) !== true ? sound : this._soundVolume
        let effect = parseInt(localStorage.getItem("effect"))
        this._effectVolume = effect !== null && isNaN(effect) !== true ? effect : this._effectVolume

        cc.audioEngine.setMusicVolume(DataManager._instance._soundVolume)
        cc.audioEngine.setEffectsVolume(DataManager._instance._effectVolume)
        this.version = DataManager.load('game_version') || "1.0.0.0"

        if (cc.sys.isBrowser) {
            if (-1 != window.location.hostname.indexOf("https://t_")) {
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
            if (true != DataManager._instance._spriteAtlas[key].isCommon){                
                cc.loader.releaseAsset(DataManager._instance._spriteAtlas[key])
                DataManager._instance._spriteAtlas.splice(key, 1)
                key --
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

    static getOnlineParam(name: string) {
        const vname = name + PluginManager.getVersionCode()
        if (vname in DataManager.Instance.onlineParam) {
            return DataManager.Instance.onlineParam[vname]
        }

        return DataManager.Instance.onlineParam[name]
    }

    getGameConfig() {
        return getPacketConfig()
    }

    getReliefLine() {
        return DataManager.CommonData["reliefStatus"] && DataManager.CommonData["reliefStatus"]["reliefAwardCount"] || 20000
    }

    isInReview() {
        return this.onlineParam.review_version == PluginManager.getVersionCode()
    }

    /**
     * 在线参数以abtest对用户id求余
     * 0 => false
     * 1 => true
     * n > 1 => 1 % n == 0
     * n < 1 => Math.floor(id * n) > Math.floor((id - 1) * n)
     */
    getOnlineParamSwitch(name: string, def?: number) {
        let value = DataManager.Instance.onlineParam[name]
        if (value == null) {
            if (def == null) {
                return false
            }
            value = def
        }

        if (typeof value === 'number') {
            if (value == 0) {
                return false
            } else if (value == 1) {
                return true
            } else {
                const guid = Number(this._userData.guid)
                if (value > 1) {
                    return guid % value == 0
                } else {
                    return Math.floor(guid * value) > Math.floor((guid - 1) * value)
                }
            }
        }
        return false
    }
}
