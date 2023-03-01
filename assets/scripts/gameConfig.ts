export enum GMAE {
    PaoDeKuai = 372,
    RPDdz = 389,
    ERDdz = 390,
    HBErmj = 391,
    XXL = 393,
    Gdmj_JPH = 397,
    Gdmj_TDH = 398,
    ZhuoQiu = 400,
    PengPengQiu = 402,
}

const packet_config = {
    pn: "com.union.zxddz.android",
    gameId: 1238,
    wechatPublic: "全民斗地主广告版",
    gameList: [
        GMAE.RPDdz,
        GMAE.ERDdz,
        GMAE.HBErmj,
        GMAE.XXL,
        GMAE.ZhuoQiu,
        GMAE.PaoDeKuai,
        GMAE.PengPengQiu
    ],
    gameName: "全民斗地主"
}

export function getPacketConfig() {
    return packet_config
}

const Games = {}
const GameModules = {}
const GameNames = {}
const SmallGames = {}
const BaseLevel = {}

function setGameModule(gameId, moduleName, gameName, smallGame = false, baseLevel = 0) {
    Games[gameId] = moduleName
    GameModules[moduleName] = gameId
    GameNames[gameId] = gameName
    SmallGames[gameId] = smallGame
    BaseLevel[gameId] = baseLevel
}

setGameModule(GMAE.PaoDeKuai, "modulePaoDeKuai", "跑得快")
setGameModule(GMAE.RPDdz, "moduleRPDdz", "斗地主")
setGameModule(GMAE.ERDdz, "moduleERDdz", "二人斗地主")
setGameModule(GMAE.HBErmj, "moduleHBErmj", "二人麻将")
setGameModule(GMAE.XXL, "moduleXXL", "消消乐", true)
setGameModule(GMAE.Gdmj_JPH, "moduleGdmj", "广东麻将鸡平胡")
setGameModule(GMAE.Gdmj_TDH, "moduleGdmj", "广东麻将推倒胡")
setGameModule(GMAE.ZhuoQiu, "moduleZhuoQiu", "桌球", true)
setGameModule(GMAE.PengPengQiu, "modulePengPengQiu", "弹球", true)

export function getChangCiName(obj: String | Number, ddz_type, level) {

    let typeName = {
        "0": "抢地主",
        "1": "叫三分",
        "2": "不洗牌",
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
        "gameName": getGameName(obj),
        "typeName": typeName[ddz_type],
        "levelName": levelName[level],
    }
}

export function getGameConfig(obj: String | Number) {
    if (typeof obj == "string")
        return GameModules[obj as string]
    else if (typeof obj == "number")
        return Games[obj as number]

    return null
}

export function getGameName(obj: String | Number) {
    if (typeof obj == "string" && GameModules[obj as string])
        return GameNames[GameModules[obj as string]] || false
    else if (typeof obj == "number")
        return GameNames[obj as number] || false

    return ""
}

export function isSmallGame(obj: String | Number) {
    if (typeof obj == "string" && GameModules[obj as string])
        return SmallGames[GameModules[obj as string]] || false
    else if (typeof obj == "number")
        return SmallGames[obj as number] || false

    return ""
}