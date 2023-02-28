interface AdCfg{
    AdNum: number;
    AdName: string;
    AdVideo: number;
}

let _configs: AdCfg[] = []

export namespace AdsConfig {
    /*
    横幅广告
    1, 通用奖励弹框
    2, 破产补助弹框
    3, 结算斗地主
    4, 结算麻将
    6, 抽红包斗地主
    7, 抽红包麻将
    
    
    视频广告
    11, 签到处 
    12, 免费抽奖 
    13, 低保  
    15, 赚趣币 
    16, 免费金币 
    17, 双十一回馈
    18, 双十一嘉年华
    */
    export let banner = {
        // 横幅广告index
        AwardResultPop: 1,      // 通用奖励弹框
        BankruptDefend: 2,      // 破产补助弹框
        GameResultLayer_rpddz: 3,       // 结算斗地主
        GameResultLayer_hbermj: 4,      // 结算麻将
        GameRedPacketAwardLayer_rpddz: 6,       // 抽红包斗地主
        GameRedPacketAwardLayer_hbermj: 7,      // 抽红包麻将
    }

    export let taskAdsMap = {
        10101: 9,      //登录游戏
        10201: -1,      //每日游戏在线30秒得趣金币
        10202: -1,      //每日游戏在线60秒得趣金币
        10203: -1,      //每日游戏在线2分钟得趣金币
        10204: -1,      //每日游戏在线3分钟得趣金币
        10205: -1,      //每日游戏在线5分钟得趣金币
        10301: -1,      //进行2次充值
        11101: -1,      //斗地主或二人麻将0.3元场游戏5局
        11102: -1,      //斗地主或二人麻将0.3元场游戏15局
        11103: -1,      //斗地主或二人麻将0.3元场游戏30局
        11201: -1,      //斗地主或二人麻将2元场游戏5局
        11202: -1,      //斗地主或二人麻将2元场游戏12局
        11203: -1,      //斗地主或二人麻将2元场游戏25局
        11301: -1,      //斗地主或二人麻将50元场游戏3局
        11302: -1,      //斗地主或二人麻将50元场游戏8局
        11303: -1,      //斗地主或二人麻将50元场游戏15局
        "DrawQtt": 5,   //免费趣金币
        "DrawGold": 6,  //免费金豆
        "CardNoteBuyPop": 11, //记牌器
        "GodOfWealth": 12, //拜财神第一次
        "VipExp": 15,     // 看视频领VIP
        "Wages": 16,     // 每日工资 
        "TreasureHunt": 17,     // 寻宝 
        "Exemption": 18,     // 对局免输
        "DrawGameRp": 19,    // 再次抽红包
        "DrawDiamond": 20,     // 领取钻石
        "DrawRp": 21,        //免费红包
        "DynamicGold": 22,   //动态金豆
        "LookLordCard": 23,   //优先看底牌
    }

    export let video = {
        SignPop: 11,            //11, 签到处 
        FreeDrawPop: 12,        //12, 免费抽奖 
        BankruptDefend: 13,     //13, 低保  
        FreeQttCoin: 15,        //15, 赚趣币 
        FreeGoldenCoin: 16,     //16, 免费金币 
        NationalDayPop: 17,     //17, 双十一回馈
        Double11ActivePop: 18,  //18, 双十一嘉年华
        task_10101: 19,         //日常任务 登录
        CardNoteBuyPop: 20,     //20, 记牌器
        LookLordCard: 21,       //21, 优先看底牌
        GodOfWealth: 22,     //22, 拜财神
        FreeVipExp: 23,  //领取经验
        DayWages: 24,  //每日工资
        TreasureHunt: 25, //寻宝
        DrawDiamond: 26, //免费钻石
        FreeRp: 27,     //免费红包
        Exemption: 28,  // 对局免输
        DrawGameRp: 29, // 再次抽红包
    }

    export function getAdName(adNum) {
        return _configs[adNum].AdName
    }

    export function getAdVideo(adNum) {
        return _configs[adNum].AdVideo
    }
}

_configs[AdsConfig.taskAdsMap.DrawQtt] = <AdCfg>{AdNum: AdsConfig.taskAdsMap.DrawQtt, AdName: "赚趣金币", AdVideo: AdsConfig.video.FreeQttCoin}
_configs[AdsConfig.taskAdsMap.DrawGold] = <AdCfg>{AdNum: AdsConfig.taskAdsMap.DrawGold, AdName: "免费金豆", AdVideo: AdsConfig.video.FreeGoldenCoin}
_configs[AdsConfig.taskAdsMap.DynamicGold] = <AdCfg>{AdNum: AdsConfig.taskAdsMap.DynamicGold, AdName: "免费金豆", AdVideo: AdsConfig.video.FreeGoldenCoin}
_configs[AdsConfig.taskAdsMap.CardNoteBuyPop] = <AdCfg>{AdNum: AdsConfig.taskAdsMap.CardNoteBuyPop, AdName: "记牌器", AdVideo: AdsConfig.video.CardNoteBuyPop}
_configs[AdsConfig.taskAdsMap.VipExp] = <AdCfg>{AdNum: AdsConfig.taskAdsMap.VipExp, AdName: "领取VIP经验", AdVideo: AdsConfig.video.FreeVipExp}
_configs[AdsConfig.taskAdsMap.Wages] = <AdCfg>{AdNum: AdsConfig.taskAdsMap.Wages, AdName: "每日工资", AdVideo: AdsConfig.video.DayWages}
_configs[AdsConfig.taskAdsMap.TreasureHunt] = <AdCfg>{AdNum: AdsConfig.taskAdsMap.TreasureHunt, AdName: "寻宝", AdVideo: AdsConfig.video.TreasureHunt}
_configs[AdsConfig.taskAdsMap.DrawDiamond] = <AdCfg>{AdNum: AdsConfig.taskAdsMap.DrawDiamond, AdName: "免费钻石", AdVideo: AdsConfig.video.DrawDiamond}
_configs[AdsConfig.taskAdsMap.DrawRp] = <AdCfg>{AdNum: AdsConfig.taskAdsMap.DrawRp, AdName: "免费红包", AdVideo: AdsConfig.video.FreeRp}
_configs[AdsConfig.taskAdsMap.Exemption] = <AdCfg>{AdNum: AdsConfig.taskAdsMap.Exemption, AdName: "对局免输", AdVideo: AdsConfig.video.Exemption}
_configs[AdsConfig.taskAdsMap.DrawGameRp] = <AdCfg>{AdNum: AdsConfig.taskAdsMap.DrawGameRp, AdName: "再次抽红包", AdVideo: AdsConfig.video.DrawGameRp}
_configs[AdsConfig.taskAdsMap.LookLordCard] = <AdCfg>{AdNum: AdsConfig.taskAdsMap.LookLordCard, AdName: "优先看底牌", AdVideo: AdsConfig.video.LookLordCard}
