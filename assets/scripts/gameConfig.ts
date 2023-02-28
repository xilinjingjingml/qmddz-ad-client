const {ccclass, property} = cc._decorator;

export let GAME_TYPE = cc.Enum({
    QMDDZ: 0,
    QMMJ: 1,
    QMDDZMD: 2,
})

@ccclass("PacketConfig")
export class PacketConfig {

    @property()
    pn: string = ""

    @property()
    gameId: number = 0

    @property()
    qttAppId: string = ""

    @property()
    qttAppKey: string = ""

    @property()
    wechatPublic: string = ""

    @property()
    gameList: number[] = []

    @property()
    gameName: string = ""

    static create(packet){
        let ins = new PacketConfig()
        ins.pn = packet.pn
        ins.gameId = packet.gameId
        ins.qttAppId = packet.qttAppId
        ins.qttAppKey = packet.qttAppKey
        ins.wechatPublic = packet.wechatPublic
        ins.gameList = packet.gameList
        ins.gameName = packet.gameName
        return ins
    }
}

let Packets: PacketConfig[] = ([
    { 
        pn: "com.union.hbddz.ad.android", 
        gameId: 1238, 
        qttAppId: "a3DU28NdpPFW", 
        qttAppKey: "IOffMOdkCOfopfkICBFVb4JbRBibOvSICNAOOMU7MxPOVFuANbbyLbDtKbffZCKC",
        wechatPublic: "全民斗地主广告版",
        gameList: [389, 390, 391, 393, 400, 372, 402],
        gameName: "全民斗地主"
    },
]).map(packet => PacketConfig.create(packet))

export function getPacketConfig(gameType: number) {
    return Packets[gameType]
}

let Games = []
let GameModules = []
let GameNames = []
let SmallGames = []
let BaseLevel = []

let setGameModule = function(gameId, moduleName, gameName, smallGame = false, baseLevel = 0){
    Games[gameId] = moduleName
    GameModules[moduleName] = gameId
    GameNames[gameId] = gameName
    typeof smallGame === "boolean" ? SmallGames[gameId] = smallGame : baseLevel = smallGame
    BaseLevel[gameId] = baseLevel
}

setGameModule(372, "modulePaoDeKuai", "跑得快")
setGameModule(389, "moduleRPDdz", "斗地主")
setGameModule(390, "moduleERDdz", "二人斗地主")
setGameModule(391, "moduleHBErmj", "二人麻将")
setGameModule(393, "moduleXXL", "消消乐", true)
setGameModule(397, "moduleGdmj", "广东麻将鸡平胡")
setGameModule(398, "moduleGdmj", "广东麻将推倒胡")
setGameModule(400, "moduleZhuoQiu", "桌球", true)
setGameModule(402, "modulePengPengQiu", "弹球", true)

export function getChangCiName(obj : String | Number, ddz_type, level) {

    let typeName = {
        "0" : "抢地主",
        "1" : "叫三分",
        "2" : "不洗牌",
    }

    let levelName = [
        "新手场",
        "新手场",
        "初级场",
        "精英场",
        "大师场",
        "至尊场",
    ]
    
    return {
        "gameName":getGameName(obj),
        "typeName":typeName[ddz_type],
        "levelName":levelName[level],
    }
}

export function getGameConfig(obj : String | Number) {   
    if (typeof obj == "string")
        return GameModules[obj as string]
    else if (typeof obj == "number")
        return Games[obj as number]
   
    return null        
}

export function getGameName(obj : String | Number) {   
    if (typeof obj == "string" && GameModules[obj as string])
        return GameNames[GameModules[obj as string]] || false
    else if (typeof obj == "number")
        return GameNames[obj as number] || false
   
    return ""
}

export function isSmallGame(obj : String | Number) {   
    if (typeof obj == "string" && GameModules[obj as string])
        return SmallGames[GameModules[obj as string]] || false
    else if (typeof obj == "number")
        return SmallGames[obj as number] || false
   
    return ""
}

export function getGameBaseLevel(obj : String | Number) {
    if (typeof obj == "string" && GameModules[obj as string])
        return BaseLevel[GameModules[obj as string]]
    else if (typeof obj == "number")
        return BaseLevel[obj as number]
   
    return 0
}