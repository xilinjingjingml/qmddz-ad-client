import UserData from "./UserData";
import { PLUGIN_ENV, EnvConfig, DdzEnvConfigs, UrlConfig, UrlConfigs, MjEnvConfigs } from "../../config";
import BaseFunc = require("../BaseFunc")
import InitBaseData from "./InitBaseData";
import ShopBox from "./ShopBox";
import CommonData from "./CommonData";
import { ParseSearch } from "../BaseFuncTs";
import { GAME_TYPE, PacketConfig, getPacketConfig } from "../../gameConfig";
import SceneManager from "../baseScene/SceneManager";

const {ccclass, property, executeInEditMode, requireComponent} = cc._decorator;

export interface IMatchInfo {
    matchId: number | null
    begin: number | null
    signCount: number | null
    isSign: boolean | null
    endSignTime: number | null
    award: number | null

    matchName: string
    newMatchPic: string
    matchPic: string
    awardList: {
        awardStr: string
        matchRank: number
    }[]
    maxNum: number
    matchSort: number
    ddzMatchSort: number
    matchEnd: number
    matchType: number
    matchShow: number
    signFee: {
        limitExperNum: number
        signItem: number
        type: number
        openExperNum: number
        signItemNum: number
    }[]
    signTime: number
    survivalPic: string
    awardDesc: string
    matchFlag: number
    matchDesc: string
    vipFreeLimit: number
    matchRule: string
    competitionRules: number
    minNum: number
    serverid: number
    vipLimit: number
    achievAwardList: {}
    matchBegin: number
    type: number
    gameid: number
    achievId: number
    scheduleList: {
        matchInterval: number
        matchBeginDate: number
        matchDesc: null
        matchEndDate: number
    }[]
}

@ccclass
@executeInEditMode
export default class DataManager extends cc.Component {

    static _instance: DataManager = null

    @property()
    designSize: cc.Size = new cc.Size(1280, 720)

    @property()
    packetName: string = "com.union.hbddz.ad.android" // "com.union.hbddz.h5"

    @property()
    gameId: number = 1238

    @property()
    QTT_APPID = 'a3DU28NdpPFW'

    @property()
    QTT_APPKEY = 'IOffMOdkCOfopfkICBFVb4JbRBibOvSICNAOOMU7MxPOVFuANbbyLbDtKbffZCKC'

    @property()
    wechatPublic:string = "全民斗地主赚金版"

    @property()
    _startModule: string = "moduleLobby"

    @property({
        type: cc.Enum(GAME_TYPE)
    })
    _gameType = GAME_TYPE.QMDDZ

    @property({
        type: cc.Enum(GAME_TYPE)
    })
    set GameType(value) {
        this._gameType = value
        this.updatePacketConfig()
        this.updateEnvConfig()
    }
    get GameType() {
        return this._gameType;
    }

    @property({
        type: cc.Enum(PLUGIN_ENV),        
    })
    _curENV = PLUGIN_ENV.ENV_OFFICIAL 

    @property({
        type: cc.Enum(PLUGIN_ENV),        
    })
    set CurENV(value) {
        this._curENV = value
        this.updateEnvConfig()
    }
    get CurENV() {
        return this._curENV
    }
    
    @property({
        type: EnvConfig,
        serializable: true
    })
    envConfigs = DdzEnvConfigs[this._curENV]

    // @property({
    //     type: [UrlConfig],
    //     serializable: true
    // })
    urlConfigs = UrlConfigs
    
    // @property()
    _userData: UserData;

    @property()
    set StartModule(value){
        this._startModule = value
    }
    get StartModule() {
        // return "../" + this._startModule + "/main"
        return this._startModule
    }

    @property()
    version: string = "1.0.0"

    @property({
        type: cc.Float,
        max: 1,
        min: 0
    })
    _soundVolume = 1.0

    @property({
        type: cc.Float,
        max: 1,
        min: 0
    })
    _effectVolume = 1

    @property({
        type: [cc.SpriteAtlas]
    })
    _spriteAtlas: cc.SpriteAtlas[] = []

    @property({
        type: [cc.SpriteFrame]
    })
    _tmpSpriteFrame: cc.SpriteFrame[] = []

    @property({
        type: [String, [cc.SpriteFrame]]
    })
    _spriteList = []

    @property()
    _configs = null

    @property()
    NormalBoxs: ShopBox[] = []

    @property()
    OneYuanBoxs: ShopBox[] = []

    @property()
    ActiveBoxs: ShopBox[] = []

    @property()
    MonthBoxs: ShopBox[] = []

    @property()
    OnceBoxs: ShopBox[] = []

    @property()
    ClubBoxs: ShopBox[] = []

    @property()
    DiscountBoxs: ShopBox[] = []

    @property()
    IsQTT: boolean = false

    @property({
        type: cc.AudioClip
    })
    menuEffect = null

    @property()
    isTesting: boolean = false

    @property()
    _commonData: CommonData = new CommonData()

    onlineParam: any = {};

    matchList: IMatchInfo[] = []
    matchMap: { [key: string]: IMatchInfo } = {}

    // static get AdsConfig(): AdsConfig {
    //     return AdsConfig
    // }

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
        // return parseInt(this.load("sound"))
        return DataManager._instance._soundVolume
    }

    static set EffectVolume(value: number) {
        DataManager._instance._effectVolume = value
        cc.audioEngine.setEffectsVolume(DataManager._instance._effectVolume)
        localStorage.setItem("effect", value.toString())
    }
    
    static get EffectVolume() {
        // return parseInt(this.load("effect"))
        return DataManager._instance._effectVolume
    }
    
    static get Instance() : DataManager {
        return DataManager._instance;
    }

    static get UserData() : UserData {
        return DataManager._instance._userData
    }

    static get CommonData(): CommonData {
        return DataManager.Instance._commonData
    }

    get GUID() {
        return this._userData.guid
    }

    get Ticket() {
        return this._userData.ticket
    }

    get SocketAddress() {
        return this.envConfigs.socketURL + ":" + this.envConfigs.socketPort
    }

    _InitBaseData: InitBaseData = null

    onLoad() {
        DataManager._instance = this
        // cc.game.addPersistRootNode(this.node);

        if (null == this.node.getComponent(UserData))
            this.node.addComponent(UserData)

        // this._userData = this.node.getComponent(UserData)    
        
        // this.updateEnvConfig()    

        // cc.Canvas.instance.designResolution = this.designSize
    }

    onInit () {     
        let path = window.location.pathname
        path = path.substr(0, path.length - 1)
        path = path.substring(path.lastIndexOf("/") + 1)
        if (cc.sys.isBrowser) {
        var args = ParseSearch(window.location.search)
        if (path == "qmddz" || args.channel == "0")
            this.GameType = GAME_TYPE.QMDDZ
        else  if (path == "qmmj" || args.channel == "1")
            this.GameType = GAME_TYPE.QMMJ
        else if (path == "qmddzmd" || args.channel == "2")
            this.GameType = GAME_TYPE.QMDDZMD
        }

        this._userData = this.node.getComponent(UserData)    

        let sound = parseInt(localStorage.getItem("sound")) 
        this._soundVolume = sound !== null && isNaN(sound) !== true ? sound : this._soundVolume
        let effect = parseInt(localStorage.getItem("effect"))
        this._effectVolume = effect !== null && isNaN(effect) !== true ? effect : this._effectVolume

        cc.audioEngine.setMusicVolume(DataManager._instance._soundVolume)
        cc.audioEngine.setEffectsVolume(DataManager._instance._effectVolume)

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

        this.updateEnvConfig();

        DataManager.CommonData["QttPoint"] = cc.v2(cc.Canvas.instance.designResolution.width / 2, cc.Canvas.instance.designResolution.height - 25)

        DataManager.CommonData["NewUserSgin"] = []

        this._InitBaseData = new InitBaseData()
    }   

    updatePacketConfig() {
        let packet = getPacketConfig(this._gameType)
        this.packetName = packet.pn    
        this.gameId = packet.gameId
        this.QTT_APPID = packet.qttAppId
        this.QTT_APPKEY = packet.qttAppKey
        this.wechatPublic = packet.wechatPublic
    }

    updateEnvConfig() {
        if (this._gameType == GAME_TYPE.QMDDZ)
            this.envConfigs = DdzEnvConfigs[this._curENV];
        else if (this._gameType == GAME_TYPE.QMMJ)
            this.envConfigs = MjEnvConfigs[this._curENV]
        else if (this._gameType == GAME_TYPE.QMDDZMD)
            this.envConfigs = DdzEnvConfigs[this._curENV];

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
        str = BaseFunc.encrypt(str)
        // console.log(window.localStorage)
        window.localStorage.setItem(name, str)
    }
    
    static load(name) {
        let str = window.localStorage.getItem(name)
        if (null != str && 0 < str.length && " " != str) {
            str = BaseFunc.decrypt(str)
            // if (BaseFunc.IsJSON(str))
                return JSON.parse(str)
            // else
                // return str
        }

        return null
    }

    setUserData(userData?) {
        if (null == userData) 
            userData = DataManager.load("USER_DATA")
        
        if (null != userData && userData["pid"] && userData["ticket"]) {
            this._userData.guid = userData["pid"]
            this._userData.ticket = userData["ticket"]
            this._userData.nickname = userData["nickname"]
            this._userData.face = userData["face"]
            this._userData.imei = userData["imei"]  
            this._userData.sex = userData["sex"]      
        }
    }

    static addSpriteAtlas(spritAtlas: cc.SpriteAtlas) {
        if (-1 == DataManager._instance._spriteAtlas.findIndex((value) => value == spritAtlas))
            DataManager._instance._spriteAtlas.push(spritAtlas)
        // console.log(this._spriteAtlas)
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

    getGameList() {
        return getPacketConfig(this._gameType).gameList
    }

    getGameConfig() {
        return getPacketConfig(this._gameType)
    }

    getReliefLine() {
        return 20000
    }
}
