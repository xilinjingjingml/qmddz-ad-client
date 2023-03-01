interface IMessage {
    opcode: string
    [key: string]: any
}

interface IMsgBox {
    buttonNum?: number
    cancelFunc?: Function
    cancelText?: string
    clickMaskToClose?: boolean
    closeTexture?: cc.SpriteFrame
    confirmClose?: boolean
    confirmFunc?: Function
    confirmText?: string // 确定按钮文字
    confirmTexture?: cc.SpriteFrame
    content?: string
    exchangeButton?: boolean
    fontSize?: number
    frameHeight?: number
    frameWidth?: number
    horizontal?: cc.macro.TextAlignment
    maskCanClose?: boolean
    title?: string
    titleTexture?: cc.SpriteFrame
    showBanner?: boolean
}

interface IExchangeInfo {
    limitCount: number,
    goodsId: number,
    limitType: number,
    exchangeItemList: { exchangeNum: number, exchangeItem: number }[],
    goodsImg: string,
    exchangeCount: number,
    limitVip: number,
    gainItemList: { gainItem: number, gainNum: number, itemType: number }[]
    stocks: number,
    isLimitCount: boolean,
    goodsName: string,
    stocksType: number,
    limitRegTime: number
}

interface IShareMoney {
    shareMoney: {
        sm_id: number
        sm_share_first: boolean
        sm_help_cnt: number
        sm_money: number
        sm_time: number
        sm_status: boolean
    }[],
    shareMoneyLog: {
        sl_help_uid: number
        sl_help_nickname: stringnumber
        sl_type: number
        sl_money: number
        sl_time: number
    }[]
}

interface IIPLocation {
    status: string
    info: string
    infocode: string
    province: string
    city: string
    adcode: string
    rectangle: string
}

interface IServerData {
    newbieMode: number
    level: number
    minMoney: number
    maxmoney: number
    maxmoney: number
    lc_room_mode: number
    lc_room_mode: number
    ddz_game_type: number
}

interface IItemInfo {
    itemNum: number
    itemIndex: number
}

interface ICommonData {
    AchieveList?: Iproto_ATAchieveData[]
    activityRewards?: Iproto_lc_get_activity_rewards_list_ack
    bindPhone?: { hasBindMoble?: number, BindPhone?: string }
    bReEnterGame?: boolean
    CancelBackAd?: boolean
    checkBindLevel?: number
    closeGameErr?: number
    configFinish?: boolean
    ddzGameType?: number
    ExchangeInfo?: IExchangeInfo[]
    first?: number
    first_showPopups?: boolean
    flyBack?: boolean
    GAME_RULE?: { [k: string]: string }
    GameResultLayerFirst?: any
    gameServer?: any
    ifBindWeixin?: boolean
    isBindingWX?: any
    isLogin?: any
    isOnGameExit?: any
    leaveGame?: any
    leaveGameIsPrivate?: any
    leaveGameLevel?: any
    loadModuleLobby?: any
    loginTime?: any
    lotteryData?: any
    morrow?: number
    nationalSign?: any
    nationalSignData?: any
    needMoney?: any
    NewbieRedpacketPopFirst?: any
    NewUserSgin?: any
    onlineTime?: any
    pluginFinish?: any
    plyStatus?: any
    privateConfig?: any
    PrivateGameData?: any
    RedpacketCount?: any
    RedPacketsNewbieABTest?: any
    regtime?: any
    reliefStatus?: any
    roleCfg?: any
    runGame?: any
    ServerDatas?: IServerData[][]
    shareUrl?: any
    showMatchScene?: any
    TaskList?: proto_ATAchieveData[]
    todayPlyNum?: any
    TomorrowData?: { autoId: number, desc: string, descImg: string, gameId: number, gameName: number, itemConfig: IItemInfo[] }[]
    TomorrowStatus?: { msg: string, ret: number, ratioTotal: number, list: { signDay: number, signTime: number }[], tomorrowAward: IItemInfo[] }
    UserAddress?: any
    VipAwardConfig?: any
    VipData?: any
    VipInfo?: any
    stayDay?: number
    shareMoneyData?: { shareMoney: string, shareMoneyLog: string } & IShareMoney
    IPLocation?: IIPLocation
    AdConfig?: Record<string, IAdConfig>
    showAdsData?: { adsType: EAdsType, adIndex: string, adsIds: string[] }
    lastGame?: { gameId: number, gameServerId: number }
    [key: string]: any
}

interface IAdConfig {
    total: number
    count: number
    method: number
    canFree: boolean
    unitid: { id: string, weight: number, adId: string }[]
}

interface IAdUnitId {
    id: string
    weight: number
    adId: string
}

interface IMatchInfo {
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

interface IShopBox {
    area: any
    boxId: number
    boxname: string
    boxvalue: number
    cardDays: number
    complementCount: number
    content: { idx: number, num: number }[]
    daylimit: number
    desc: string
    firstMoney: number
    gmDay: number
    havePhone: number
    icon: string
    isBuy: number
    isDx: number
    isLt: number
    isYd: number
    pmList: any
    price: number
    serino: string
    spList: []
    superscript: string
}

interface ISetSprite {
    node: cc.Node
    url: string
    delayShow?: boolean // 加载完成显示
    fixSize?: boolean // 调整大小
    fixSizeByParent?: boolean // 调整大小根据父节点
    fixSizeBySize?: cc.Size // 调整大小根据大小
    callback?: Function // 成功回调 安全
}

interface IUserInfo {
    nickname: string
    regPn: string
    plat: number
    regTime: number
    face: string
    sex: number
    status: number
    phone: string
    isforbid: number
    address: string
    uid: string
    code: string
    realname: string
    age: number
    account: string
    desc: string
}

interface IOnlineParam {
    abtest?: { threshold: number, value: boolean }
    random?: { threshold: number, value: boolean }
    guid?: { threshold: number, value: boolean }
}
