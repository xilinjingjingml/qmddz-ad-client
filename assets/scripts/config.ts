const {ccclass, property} = cc._decorator;

export let PLUGIN_ENV = cc.Enum({
    ENV_TEST: 0, 
    ENV_MIRROR: 1,
    ENV_OFFICIAL: 2,
})

@ccclass("EnvConfig")
export class EnvConfig {
    @property({
        type: cc.Enum(PLUGIN_ENV),
        readonly: true,
    })
    pluginEvn = PLUGIN_ENV.ENV_OFFICIAL
    @property()
    socketURL: string = ""
    @property()
    socketPort: number = 0
    @property()
    loginURL: string = ""
    @property()
    webURL: string = ""
    @property()
    payURL: string = ""
    @property()
    activityURL: string = ""
    @property()
    qttURL: string = ""

    set SocketURL(value: string) {
        this.socketURL = value
        
    }

    static create(item){
        let ins = new EnvConfig()
        ins.pluginEvn = item.pluginEvn
        ins.socketURL = item.socketURL
        ins.socketPort = item.socketPort
        ins.loginURL = item.loginURL
        ins.webURL = item.webURL
        ins.payURL = item.payURL
        ins.activityURL = item.activityURL
        ins.qttURL = item.qttURL
        return ins
    }
}

export let DdzEnvConfigs: EnvConfig[] = ([
    {
        pluginEvn: PLUGIN_ENV.ENV_TEST,
        socketURL: "t-hanode-wss.wpgame.com.cn",
        // socketURL: "192.168.0.126",
        socketPort: 7201,
        loginURL: "https://t-login.weipinggame.com.cn/",
        webURL: "https://t-statics.weipinggame.com.cn/",
        payURL: "https://t-mall.weipinggame.com.cn/",        
        activityURL: "https://t-activity.weipinggame.com.cn/",
        uploadURL: "https://t.upload.bdo.hiigame.com/",
        qttURL: 'https://newidea4-gamecenter-backend.1sapp.com/'
    },
    {
        pluginEvn: PLUGIN_ENV.ENV_MIRROR,
        socketURL: "m-hanode-wss.wpgame.com.cn",
        socketPort: 7201,
        loginURL: "https://m-login.weipinggame.com.cn/",
        webURL: "https://m-statics.weipinggame.com.cn/",
        payURL: "https://m-mall.weipinggame.com.cn/",        
        activityURL: "https://m-activity.weipinggame.com.cn/",
        uploadURL: "https://m.upload.bdo.hiigame.com/",
        qttURL: 'https://newidea4-gamecenter-backend.1sapp.com/'
    },
    {
        pluginEvn: PLUGIN_ENV.ENV_OFFICIAL,
        socketURL: "hanode-wss.wpgame.com.cn",
        socketPort:7201,
        loginURL: "https://login.weipinggame.com.cn/",
        webURL: "https://statics.weipinggame.com.cn/",
        payURL: "https://mall.weipinggame.com.cn/",
        activityURL: "https://activity.weipinggame.com.cn/",
        uploadURL: "https://upload.bdo.hiigame.com/",
        qttURL: 'https://newidea4-gamecenter-backend.1sapp.com/'
    },    
].map(item => EnvConfig.create(item)))

@ccclass("UrlConfig")
export class UrlConfig{
    @property()
    key: string = ""
    @property()
    url: string = ""
    @property()
    _http: string = ""
    @property()
    _path: string = ""

    static create(item){
        let ins = new UrlConfig()
        ins.key = item.key
        ins._http = item.http
        ins._path = item.path
        return ins
    }

    flushUrl(envConfig: EnvConfig) {
        this.url = envConfig[this._http] + this._path
    }
}

export let UrlConfigs: UrlConfig[] = [
    {key: "LOADING_CONFIGS", http: "webURL", path:"get/loading/configs"},
    {key: "USER_LOGIN", http: "loginURL", path:"new/gateway/visitor/login"},    

    {key: "GET_USER_ROLE", http: "webURL", path: "get/loading/configs/role"},
    {key: "LOAD_NEW_REGISTER", http: "webURL", path: "load/new/register/check/info?uid={uid}&pn={pn}&gameid={gameid}&ticket={ticket}"},

    {key: "QTT_USERINFO", http: "qttURL", path: 'x/open/user/ticket?app_id={app_id}&platform={platform}&ticket={ticket}&time={time}&sign={sign}'},
    {key: "QTT_COIN_ADD", http: "qttURL", path: "x/open/coin/add?app_id={app_id}&open_id={open_id}&coin_num={coin_num}&trade_no={trade_on}&sign={sign}"},
    {key: "QTT_COIN_SUB", http: "qttURL", path: "x/open/coin/sub?app_id={app_id}&open_id={open_id}&coin_num={coin_num}&trade_no={trade_on}&sign={sign}"},
    {key: "QTT_REPEART", http: "qttURL", path: "x/open/report/round"},
    {key: "QTT_COIN", http: "webURL", path: "user/exchange/qttcoin?uid={uid}&ticket={ticket}&gameid={gameid}&pn={pn}&app_id={app_id}&open_id={open_id}"},
    
    {key: "QTT_NOTIFY", http: "payURL", path: 'qtw/notify'},
    {key: "QTT_ORDER", http: "payURL", path: 'qtw/intl?pid={pid}&boxid={boxid}&pn={pn}'},
    {key: "QTT_PAY_QUERY", http: "qttURL", path: "x/pay/union/order/query"},

    {key: "QTT_COIN_QUERY", http: "payURL", path: "load/qtt/coin/balance"},

    {key: "QTT_AD", http: "activityURL", path: "HBProject/qtt_ad.html?app_id={appi_d}&_NO_BRIDGE_=1"},

    {key: "GET_NEW_REGISTER_CHECK_AWARD", http: "webURL", path: "get/new/register/check/award?uid={uid}&pn={pn}&gameid={gameid}&ticket={ticket}"},
    {key: "VIPCONFIG", http: "webURL", path: "load/new/game/vip/config?gameid={gameid}&pn={pn}"},

    {key: "DUIHUANCONFIG", http: "webURL", path: "get/new/goods/exchange/list?pn={pn}&sign={sign}&uid={uid}&ticket={ticket}&gameid={gameid}"}, // 兑换配置
    {key: "DUIHUAN", http: "webURL", path: "user/exchange/goods?uid={uid}&gameid={gameid}&goodsId={goodsId}&ticket={ticket}&pn={pn}&sign={sign}&app_id={app_id}&open_id={open_id}"}, //红包兑换
    {key: "DUIHUANRECORD", http: "webURL", path: "get/user/goods/exchange/log?uid={uid}&pn={pn}&ticket={ticket}&pageNow={pageNow}&pageSize={pageSize}&gameid={gameid}"}, //红包兑换记录

    {key: "SEXCOMMIT", http: "loginURL", path: "new/gateway/user/uptinfo?pid={pid}&ticket={ticket}&sex={sex}"},

    {key: "MOBILE_STATUS", http: "webURL", path: "get/user/info"},
    {key: "MOBILE_CODE_GET", http: "webURL", path: "get/phone/code"},
    {key: "MOBILE_BIND_USER", http: "loginURL", path: "new/gateway/phone/login"},

    
    {key: "EXECUTE_TURN_DRAW", http: "activityURL", path: "start/turn/draw"},
    {key: "LOAD_TURN_DRAW_STATUS", http: "activityURL", path: "load/turn/draw"},
    {key: "LOAD_TURN_DRAW_PREVIEW", http: "activityURL", path: "load/place/dial"},
    {key: "LOAD_TURN_DRAW_LIST", http: "activityURL", path: "load/wheel/list"},
    {key: "EXECUTE_JACKPOT_DRAW", http: "activityURL", path: "get/jackpot/money"},
    {key: "LOAD_LUCKY_RANK", http: "activityURL", path: "luck/value/rank"},


    {key: "DIAL", http: "activityURL", path: "load/place/dial?gameid={gameid}&channel={channel}&activityId={activityId}&uid={uid}&sign={sign}&pn={pn}&taskid={taskid}"},
    {key: "DARW_DIAL", http:"activityURL", path: "start/place/dial?gameid={gameid}&channel={channel}&activityId={activityId}&uid={uid}&sign={sign}&pn={pn}&taskid={taskid}"},

    {key: "AD_CONFIG", http: "webURL", path: "load/adconfig?pid={pid}&ticket={ticket}"},
    {key: "GET_AD_AWARD", http: "webURL", path: "execute/task/award/draw?pid={pid}&ticket={ticket}&taskInd={taskInd}&gameid={gameid}&sign={sign}&signDay={signDay}"},

    {key: "USERBATCH", http: "webURL", path: "get/loading/user/batchs?uids={uids}"},

    {key: "SHOPITEMS", http: "payURL", path: "shop/box/list"},
    {key: "SHOP_HISTORY", http: "payURL", path: "vou/order/list?pid={pid}&ticket={ticket}&pn={packageName}"},

    {key: "GAME_AWARD", http: "webURL", path:"get/new/user/gameaward"},

    {key: "ACTIVE_BUY_COUNT", http: "webURL", path: "load/buy/box/count"},
    {key: "ACTIVE_BUY_GET_AWARD", http: "webURL", path: "get/recharge/reward"},

    {key: "ACTIVE_SIGN_CONFIG", http: "webURL", path: "load/new/game/endlesssign/config?gameid={gameid}"},
    {key: "ACTIVE_SIGN_INFO", http: "webURL", path: "load/new/user/endlesssign/info?uid={uid}&gameid={gameid}&ticket={ticket}"},
    {key: "ACTIVE_SIGN_EXECUTE", http: "webURL", path: "execute/user/endlesssign/data?uid={uid}&gameid={gameid}&ticket={ticket}"},

    {key: "ACTIVE_ONCE_SIGN_CONFIG", http: "webURL", path: "load/new/game/sign/config?gameid={gameid}"},
    {key: "ACTIVE_ONCE_SIGN_INFO", http: "webURL", path: "load/new/user/sign/info?uid={uid}&gameid={gameid}&ticket={ticket}"},
    {key: "ACTIVE_ONCE_SIGN_EXECUTE", http: "webURL", path: "execute/user/sign/data?uid={uid}&gameid={gameid}&ticket={ticket}"},

    { key: "GET_GIFTKEY_AWARD", http: "webURL", path: "gift/key/activation?uid={pid}&ticket={ticket}&giftkey={cdk}&gameid={gameid}&sign={sign}" },
    
    {key: "SEND_MAGIC_EMOJI", http: "payURL", path: "qtw/open/coin/sub"}, 

    // 游戏赚钱排行
    {key: "LOAD_GAMERANK_WINMONEY", http: "webURL", path: "load/game/rank/winmoney?uid={uid}&ticket={ticket}&gameid={gameid}&sign={sign}"},
    // 游戏大奖排行
    {key: "LOAD_GAMERANK_SUPERAWARD", http: "webURL", path: "load/game/rank/superaward?uid={uid}&ticket={ticket}&gameid={gameid}&sign={sign}"},

    {key: "GET_USER_ADDRESS", http: "webURL", path: "get/userinfo/address"},
    {key: "UPDATE_USER_ADDRESS", http: "webURL", path: "saveOrUpdate/wawaManage/addressInfo"},

    {key: "GET_FLYBACK_AWARD", http: "webURL", path: "send/h5user/award"},
    
    {key: "LOAD_MAIL_TEMPLATE_AWARD", http: "webURL", path: 'load/mail/template/award?uid={uid}&ticket={ticket}&awardId={awardId}'},
    {key: "MODIFY_USER_MAIL_STATUS", http: "webURL", path: 'modify/user/mail/status?uid={uid}&ticket={ticket}&mailid={mailid}&gameid={gameid}&pn={pn}'},


    // 局数排行榜
    {key: "LOAD_GAME_NUM", http: "webURL", path: "load/game/num/rank?pid={pid}&ticket={ticket}&beginDate={beginDate}&endDate={endDate}"},
    {key: "LOAD_REDPACKET_RANK", http: "webURL", path: "load/rank/info?pid={pid}&ticket={ticket}"},
    {key: "PAY_TOTAL", http: "webURL", path: "get/pay/total/award?pid={pid}&ticket={ticket}&flag={flag}"},

    {key: "REPORT_USER", http: "webURL", path: "report/user/action?pid={pid}&ticket={ticket}&reportPid={reportPid}&reportFlag={reportFlag}&gameId={gameId}&serverId={serverId}"},
    {key: "H5_USER_AWARD", http: "webURL", path: "send/h5user/award?uid={uid}&type=1"},
    
    {key: "PLAY_TOTAL_AWARD", http: "webURL", path: "get/play/total/award?pid={pid}&ticket={ticket}&flag={flag}"},
    
    {key: "GET_GAME_RULE", http: "webURL", path: "load/game/rule?gameId={gameId}"}, 

    // 时间点领取奖励 （拜财神）
    {key: "LOAD_TIME_CLOCK", http: "webURL", path: "load/login/award/config?uid={uid}&gameid={gameId}&ticket={ticket}"},
    {key: "GET_TIME_CLOCK", http: "webURL", path: "get/user/login/award?uid={uid}&gameid={gameId}&ticket={ticket}&isAd={isAd}"},
    
    
    {key: "LOAD_DISCOUNT_CODE", http: "webURL", path: "get/vip/discount/code?uid={uid}&ticket={ticket}"}, //
    {key: "GET_DISCOUNT_CODE", http: "webURL", path: "get/vip/discount/code?uid={uid}&ticket={ticket}&dvId={dvId}&flag=1"}, //
    {key: "USE_DISCOUNT_CODE", http: "payURL", path: "qtw/intl?pid={pid}&boxid={boxid}&pn={pn}&disBatchId={disBatchId}"}, //  
    
    // 比赛
    {key: "MATCH_INFO",             http: "webURL", path: "load/match/info"},
    {key: "MATCH_TIME",             http: "webURL", path: "load/match"},
    {key: "MATCH_AWARD",            http: "webURL", path: "load/match/award/info"},
    {key: "MATCH_GET_AWARD",        http: "webURL", path: "send/match/award"},
    {key: "MATCH_HISTORY",          http: "webURL", path: "load/match/history/info"},
    {key: "MATCH_ENTITY_AWARD",     http: "webURL", path: "insert/match/entity/award/log"},
    {key: "MATCH_AWARD_LOG",        http: "webURL", path: "load/match/entity/award/log"},
    {key: "GET_MATCH_RANK",         http: "webURL", path: "load/match/player/rank"},    
    {key: "GET_MATCH_AWARD_COUNT",  http: "webURL", path: "accumulative/gain/award"},


].map(item => UrlConfig.create(item))