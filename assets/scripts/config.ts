export enum PLUGIN_ENV {
    ENV_TEST = 0,
    ENV_MIRROR = 1,
    ENV_OFFICIAL = 2,
}

class EnvConfig {
    socketURL: string = ""
    socketPort: number = 0
    loginURL: string = ""
    webURL: string = ""
    payURL: string = ""
    activityURL: string = ""
    updateURL: string = ""

    constructor(item) {
        this.socketURL = item.socketURL
        this.socketPort = item.socketPort
        this.loginURL = item.loginURL
        this.webURL = item.webURL
        this.payURL = item.payURL
        this.activityURL = item.activityURL
        this.updateURL = item.updateURL
    }
}

export const DdzEnvConfigs: EnvConfig[] = [
    {
        socketURL: "t-hanode-wss.wpgame.com.cn",
        // socketPort: 7201,
        loginURL: "https://t-login.wpgame.com.cn/",
        webURL: "https://t-statics.wpgame.com.cn/",
        payURL: "https://t-mall.wpgame.com.cn/",
        activityURL: "https://t-activity.wpgame.com.cn/",
        uploadURL: "https://t.upload.bdo.hiigame.com/",
        updateURL: 'https://t-gamefile.wpgame.com.cn/',

        //
        // pluginEvn: PLUGIN_ENV.ENV_TEST,
        // socketURL: "t_hanode-wss.wpgame.com.cn",
        // socketURL: "192.168.0.126",
        // socketPort: 7201,
        // loginURL: "http://t_login.wpgame.com.cn/",
        // webURL: "http://t_statics.wpgame.com.cn/",
        // payURL: "http://t_mall.wpgame.com.cn/",        
        // activityURL: "http://t_activity.wpgame.com.cn/",
        // uploadURL: "http://t.upload.bdo.hiigame.com/",
        // qttURL: 'https://newidea4-gamecenter-backend.1sapp.com/'
    },
    {
        socketURL: "m-hanode-wss.wpgame.com.cn",
        socketPort: 7201,
        loginURL: "https://m-login.weipinggame.com.cn/",
        webURL: "https://m-statics.weipinggame.com.cn/",
        payURL: "https://m-mall.weipinggame.com.cn/",
        activityURL: "https://m-activity.weipinggame.com.cn/",
        uploadURL: "https://m.upload.bdo.hiigame.com/",
        updateURL: 'https://m-gamefile.weipinggame.com.cn/',
    },
    {
        socketURL: "hanode-wss.wpgame.com.cn",
        socketPort: 7201,
        loginURL: "https://login.weipinggame.com.cn/",
        webURL: "https://statics.weipinggame.com.cn/",
        payURL: "https://mall.weipinggame.com.cn/",
        activityURL: "https://activity.weipinggame.com.cn/",
        uploadURL: "https://upload.bdo.hiigame.com/",
        updateURL: 'https://gamefile.weipinggame.com.cn/',
    },
].map(item => new EnvConfig(item))

class UrlConfig {
    key: string = ""
    url: string = ""
    _http: string = ""
    _path: string = ""

    constructor(item) {
        this.key = item.key
        this._http = item.http
        this._path = item.path
    }

    flushUrl(envConfig: EnvConfig) {
        this.url = envConfig[this._http] + this._path
    }
}

export const UrlConfigs: UrlConfig[] = [
    { key: "GET_WX_OPENID", http: "loginURL", path: "wechat/jscode/session?appid={appid}&jscode={jscode}" },
    { key: "GAME_LOGIN", http: "loginURL", path: "new/gateway/webchat/miniapps/login?appid={appid}&pn={pn}&channel={channel}&version={version}&openId={openId}&rawData={rawData}&signature={signature}&bindOpenId={bindOpenId}" },
    { key: "WX_PAY_URL", http: "payURL", path: "tencentapp/intl/pay?pid={pid}&ticket={ticket}&boxid={boxid}&appid={appid}&openid={openid}&openkey={openkey}&pay_token={pay_token}&pf={pf}&pfkey={pfkey}&sessionId={sessionId}&sessionType={sessionType}&envFlag={envFlag}&sdkFlag={sdkFlag}" },
    { key: "WX_PAY_SURE_URL", http: "payURL", path: "tencentapp/midas/pay/sure?pid={pid}&ticket={ticket}&appid={appid}&openid={openid}&order={order}&offer_id={offer_id}&pf={pf}&envFlag={envFlag}" },

    { key: "LOAD_PYRAMID_SPREAD_INFO", http: "webURL", path: "load/pyramid/spread/info?uid={uid}&lobbyid={lobbyid}&gameids={gameids}&ticket={ticket}&sign={sign}" },
    { key: "GET_PYRAMID_SPREAD_AWARD", http: "webURL", path: "get/pyramid/spread/award?uid={uid}&lobbyid={lobbyid}&gameids={gameids}&ticket={ticket}&sign={sign}" },

    { key: "LOADING_CONFIGS", http: "webURL", path: "get/loading/configs" },
    { key: "USER_LOGIN", http: "loginURL", path: "new/gateway/visitor/login" },

    { key: "GET_USER_ROLE", http: "webURL", path: "get/loading/configs/role" },
    { key: "LOAD_NEW_REGISTER", http: "webURL", path: "load/new/register/check/info?uid={uid}&pn={pn}&gameid={gameid}&ticket={ticket}" },

    { key: "GET_NEW_REGISTER_CHECK_AWARD", http: "webURL", path: "get/new/register/check/award?uid={uid}&pn={pn}&gameid={gameid}&ticket={ticket}" },
    { key: "VIPCONFIG", http: "webURL", path: "load/new/game/vip/config?gameid={gameid}&pn={pn}" },

    { key: "DUIHUANCONFIG", http: "webURL", path: "get/new/goods/exchange/list?pn={pn}&sign={sign}&uid={uid}&ticket={ticket}&gameid={gameid}" }, // 兑换配置
    { key: "DUIHUAN", http: "webURL", path: "user/exchange/goods?uid={uid}&gameid={gameid}&goodsId={goodsId}&ticket={ticket}&pn={pn}&sign={sign}&app_id={app_id}&open_id={open_id}" }, //红包兑换
    { key: "DUIHUANRECORD", http: "webURL", path: "get/user/goods/exchange/log?uid={uid}&pn={pn}&ticket={ticket}&pageNow={pageNow}&pageSize={pageSize}&gameid={gameid}&isAd={isAd}" }, //红包兑换记录

    { key: "SEXCOMMIT", http: "loginURL", path: "new/gateway/user/uptinfo?pid={pid}&ticket={ticket}&sex={sex}" },

    { key: "MOBILE_STATUS", http: "webURL", path: "get/user/info" },
    { key: "MOBILE_CODE_GET", http: "webURL", path: "get/phone/code" },
    { key: "MOBILE_BIND_USER", http: "loginURL", path: "new/gateway/phone/login" },


    { key: "EXECUTE_TURN_DRAW", http: "activityURL", path: "start/turn/draw" },
    { key: "LOAD_TURN_DRAW_STATUS", http: "activityURL", path: "load/turn/draw" },
    { key: "LOAD_TURN_DRAW_PREVIEW", http: "activityURL", path: "load/place/dial" },
    { key: "LOAD_TURN_DRAW_LIST", http: "activityURL", path: "load/wheel/list" },
    { key: "EXECUTE_JACKPOT_DRAW", http: "activityURL", path: "get/jackpot/money" },
    { key: "LOAD_LUCKY_RANK", http: "activityURL", path: "luck/value/rank" },


    { key: "DIAL", http: "activityURL", path: "load/place/dial?gameid={gameid}&channel={channel}&activityId={activityId}&uid={uid}&sign={sign}&pn={pn}&taskid={taskid}" },
    { key: "DARW_DIAL", http: "activityURL", path: "start/place/dial?gameid={gameid}&channel={channel}&activityId={activityId}&uid={uid}&sign={sign}&pn={pn}&taskid={taskid}&pnum={pnum}" },
    { key: "DARW_RECORD", http: "webURL", path: "get/dial/award/log?uid={uid}&ticket={ticket}" },
    

    { key: "AD_CONFIG", http: "webURL", path: "load/adconfig?pid={pid}&ticket={ticket}" },
    { key: "GET_AD_AWARD", http: "webURL", path: "execute/task/award/draw?pid={pid}&ticket={ticket}&taskInd={taskInd}&gameid={gameid}&sign={sign}&signDay={signDay}" },

    { key: "USERBATCH", http: "webURL", path: "get/loading/user/batchs?uids={uids}" },

    { key: "SHOPITEMS", http: "payURL", path: "shop/box/list" },
    { key: "SHOP_HISTORY", http: "payURL", path: "vou/order/list?pid={pid}&ticket={ticket}&pn={packageName}" },

    { key: "ACTIVE_BUY_COUNT", http: "webURL", path: "load/buy/box/count" },
    { key: "ACTIVE_BUY_GET_AWARD", http: "webURL", path: "get/recharge/reward" },

    // 好友推广
    { key: "LOAD_REDPACKET_PROMOTER_RULE", http: "webURL", path: "load/redPackgeDDZ/promoter/rule" },
    { key: "LOAD_PYRAMID_SPREAD_INFO", http: "webURL", path: "load/pyramid/spread/info" },
    { key: "GET_PYRAMID_SPREAD_AWARD", http: "webURL", path: "get/pyramid/spread/award" },
    // 绑定微信
    { key: "BIND_WEIXIN", http: "loginURL", path: "visitor/weixin/bind" },
    // 关联账号
    { key: "SEND_PHONE_CODE", http: "webURL", path: "send/userInfo/phone/code" },
    // h5支付
    { key: "ALIPAY_PAY_H5", http: "payURL", path: "izhangxin/pay/buy" },
    { key: "WEIXIN_PAY_H5", http: "payURL", path: "weixin/intl/pay" },
    // 手机登陆获取图片验证码
    { key: "PHONEVERIFY", http: "loginURL", path: "new/gateway/validate/code" },
    { key: "LOAD_USERINFO", http: "webURL", path: "load/phone/bind/accountInfo" },
    { key: "RELATION_USERINFO", http: "webURL", path: "relation/phone/bind/accountInfo" },
    { key: "RELATION_SELECT", http: "webURL", path: "select/relation/phone/bind/accountInfo" },

    { key: "ACTIVE_SIGN_CONFIG", http: "webURL", path: "load/new/game/endlesssign/config?gameid={gameid}" },
    { key: "ACTIVE_SIGN_INFO", http: "webURL", path: "load/new/user/endlesssign/info?uid={uid}&gameid={gameid}&ticket={ticket}" },
    { key: "ACTIVE_SIGN_EXECUTE", http: "webURL", path: "execute/user/endlesssign/data?uid={uid}&gameid={gameid}&ticket={ticket}" },
    // 调整原暖心好礼接口
    // { key: "ACTIVE_SIGN_CONFIG", http: "webURL", path: "load/new/game/sign/config?gameid={gameid}" },
    // { key: "ACTIVE_SIGN_INFO", http: "webURL", path: "load/new/user/sign/info?uid={uid}&gameid={gameid}&ticket={ticket}" },
    // { key: "ACTIVE_SIGN_EXECUTE", http: "webURL", path: "execute/user/sign/data?uid={uid}&gameid={gameid}&ticket={ticket}" },

    { key: "ACTIVE_ONCE_SIGN_CONFIG", http: "webURL", path: "load/new/game/sign/config?gameid={gameid}" },
    { key: "ACTIVE_ONCE_SIGN_EXECUTE", http: "webURL", path: "execute/user/sign/data?uid={uid}&gameid={gameid}&ticket={ticket}" },

    { key: "GET_GIFTKEY_AWARD", http: "webURL", path: "gift/key/activation?uid={pid}&ticket={ticket}&giftkey={cdk}&gameid={gameid}&sign={sign}" },

    { key: "SEND_MAGIC_EMOJI", http: "payURL", path: "qtw/open/coin/sub" },

    // 游戏赚钱排行
    { key: "LOAD_GAMERANK_WINMONEY", http: "webURL", path: "load/game/rank/winmoney?uid={uid}&ticket={ticket}&gameid={gameid}&sign={sign}" },
    // 游戏大奖排行
    { key: "LOAD_GAMERANK_SUPERAWARD", http: "webURL", path: "load/game/rank/superaward?uid={uid}&ticket={ticket}&gameid={gameid}&sign={sign}" },

    { key: "GET_USER_ADDRESS", http: "webURL", path: "get/userinfo/address" },
    { key: "UPDATE_USER_ADDRESS", http: "webURL", path: "saveOrUpdate/wawaManage/addressInfo" },

    { key: "GET_FLYBACK_AWARD", http: "webURL", path: "send/h5user/award" },

    { key: "LOAD_MAIL_TEMPLATE_AWARD", http: "webURL", path: 'load/mail/template/award?uid={uid}&ticket={ticket}&awardId={awardId}' },
    { key: "MODIFY_USER_MAIL_STATUS", http: "webURL", path: 'modify/user/mail/status?uid={uid}&ticket={ticket}&mailid={mailid}&gameid={gameid}&pn={pn}' },


    // 局数排行榜
    { key: "LOAD_GAME_NUM", http: "webURL", path: "load/game/num/rank?pid={pid}&ticket={ticket}&beginDate={beginDate}&endDate={endDate}" },
    { key: "LOAD_REDPACKET_RANK", http: "webURL", path: "load/rank/info?pid={pid}&ticket={ticket}" },
    { key: "PAY_TOTAL", http: "webURL", path: "get/pay/total/award?pid={pid}&ticket={ticket}&flag={flag}" },

    { key: "REPORT_USER", http: "webURL", path: "report/user/action?pid={pid}&ticket={ticket}&reportPid={reportPid}&reportFlag={reportFlag}&gameId={gameId}&serverId={serverId}" },
    { key: "H5_USER_AWARD", http: "webURL", path: "send/h5user/award?uid={uid}&type=1" },

    { key: "PLAY_TOTAL_AWARD", http: "webURL", path: "get/play/total/award?pid={pid}&ticket={ticket}&flag={flag}" },

    { key: "GET_GAME_RULE", http: "webURL", path: "load/game/rule?gameId={gameId}" },

    // 时间点领取奖励 （拜财神）
    { key: "LOAD_TIME_CLOCK", http: "webURL", path: "load/login/award/config?uid={uid}&gameid={gameId}&ticket={ticket}" },
    { key: "GET_TIME_CLOCK", http: "webURL", path: "get/user/login/award?uid={uid}&gameid={gameId}&ticket={ticket}&isAd={isAd}" },


    { key: "LOAD_DISCOUNT_CODE", http: "webURL", path: "get/vip/discount/code?uid={uid}&ticket={ticket}" }, //
    { key: "GET_DISCOUNT_CODE", http: "webURL", path: "get/vip/discount/code?uid={uid}&ticket={ticket}&dvId={dvId}&flag=1" }, //
    { key: "USE_DISCOUNT_CODE", http: "payURL", path: "qtw/intl?pid={pid}&boxid={boxid}&pn={pn}&disBatchId={disBatchId}" }, //  


    // 比赛
    { key: "MATCH_INFO", http: "webURL", path: "load/match/info" },
    { key: "MATCH_TIME", http: "webURL", path: "load/match" },
    { key: "MATCH_AWARD", http: "webURL", path: "load/match/award/info" },
    { key: "MATCH_GET_AWARD", http: "webURL", path: "send/match/award" },
    { key: "MATCH_HISTORY", http: "webURL", path: "load/match/history/info" },
    { key: "MATCH_ENTITY_AWARD", http: "webURL", path: "insert/match/entity/award/log" },
    { key: "MATCH_AWARD_LOG", http: "webURL", path: "load/match/entity/award/log" },
    { key: "GET_MATCH_RANK", http: "webURL", path: "load/match/player/rank" },
    { key: "GET_MATCH_AWARD_COUNT", http: "webURL", path: "accumulative/gain/award" },

    // 明日好礼
    { key: "ACTIVE_ONCE_SIGN_INFO", http: "webURL", path: "load/new/user/sign/info?uid={uid}&gameid={gameid}&ticket={ticket}" },
    { key: "LOAD_TOMORROW_GIFT", http: "webURL", path: "load/new/game/sign/config?gameid={gameid}" },
    { key: "CHOOSE_TOMORROW_GIFT", http: "webURL", path: "get/tomorrow/award?uid={uid}&ticket={ticket}&itemIndex={itemIndex}&flag=0" },
    { key: "GET_TOMORROW_GIFT", http: "webURL", path: "get/tomorrow/award?uid={uid}&ticket={ticket}&flag=1" },

    // 邀请好友
    { key: "LOAD_PROMOTER_RECORD", http: "webURL", path: "load/promoter/inviteLog?uid={uid}&gameId={gameId}&ticket={ticket}&pageNow={pageNow}&pageSize={pageSize}" },
    { key: "GET_PROMOTER_AWARD", http: "webURL", path: "load/promoter/getAwardPackage?uid={uid}&gameId={gameId}&promoterUid={promoterUid}&ticket={ticket}&packageType={packageType}" },

    // 微信订阅消息
    { key: "WX_SUBSCRIBE_MESSAGE", http: "loginURL", path: "wechat/scribe/msg?appId={appId}&openId={openId}&pageId={pageId}&templateId={templateId}" },

    // 商品订单状态查询
    { key: "ORDER_STATUS", http: "payURL", path: "vou/pay/result2?pid={pid}&ticket={ticket}&order={order}&randomno={randomno}" },

    // 分享赚钱
    { key: "SHARE_MONEY_LOAD", http: "webURL", path: "load/share/money?uid={uid}&ticket={ticket}" },
    { key: "SHARE_MONEY_OPEN", http: "webURL", path: "open/share/money?uid={uid}&ticket={ticket}&smId={smId}" },

].map(item => new UrlConfig(item))