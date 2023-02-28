import { ITEM } from "./ItemConfig"

export namespace AdsConfig {

    export const banner = {
        AwardResultPop: 1 << 0,                     // 通用奖励弹框
        BankruptDefend: 1 << 1,                     // 破产补助弹框
        GameResultLayer_rpddz: 1 << 2,              // 结算斗地主
        GameResultLayer_hbermj: 1 << 3,             // 结算麻将
        GameRedPacketAwardLayer_rpddz: 1 << 5,      // 抽红包斗地主
        GameRedPacketAwardLayer_hbermj: 1 << 6,     // 抽红包麻将
        FreeAward: 1 << 7,                          // 抽红包麻将
        RegainLose: 1 << 8,                         // 对局免输
        Highlight: 1 << 9,                          // 高光对局
        NewbieRedpacket: 1 << 10,                   // 新手红包
        WinDouble: 1 << 11,                         // 赢金翻倍
        All: -1,                                    // 关闭所有banner
    }

    export const grid = {
        DrawVipPop: 1 << 0,                         // 领取VIP弹框
        All: -1,                                    // 关闭所有格子广告
    }

    export const taskAdsMap = {
        None: -1,                 // WEB无此广告点 仅表示直接播视频时unitid为默认值

        SignPop: 1,                 // 签到处
        FreeDrawPop: 2,             // 免费抽奖
        BankruptDefend: 3,          // 低保
        DrawQtt: 5,                 // 免费趣金币
        DrawGold: 6,                // 免费金豆
        NationalDayPop: 7,          // 双十一回馈
        Double11ActivePop: 8,       // 双十一嘉年华
        CardNoteBuyPop: 11,         // 记牌器
        GodOfWealth: 12,            // 拜财神第一次
        VipExp: 15,                 // 看视频领VIP
        Wages: 16,                  // 每日工资
        TreasureHunt: 17,           // 寻宝
        Exemption: 18,              // 对局免输
        DrawGameRp: 19,             // 再次抽红包
        DrawDiamond: 20,            // 领取钻石
        DrawRp: 21,                 // 免费红包
        DynamicGold: 22,            // 动态金豆
        LookLordCard: 23,           // 优先看底牌
        WxShare: 24,                // 分享战绩
        WxFavorite: 25,             // 我的小程序进游戏
        WinGetSingle: 26,           // 斗地主胜利后单倍获取福卡
        WinGetMutiple: 27,          // 斗地主胜利后多倍获取福卡
        NewbieRedpacket: 28,        // 新人前n局得福卡
        DrawRedpacket: 29,          // 抽奖得福卡
        TomorrowChoose: 30,         // 明日有礼选择抽取
        TomorrowGetMutiple: 31,     // 明日有礼领取奖励
        DoubleCard: 32,             // 超级加倍卡
        LookCard: 33,               // 商城获取看底牌
        Highlight: 34,              // 分享高光时刻
        LotteryShare: 35,           // 转盘分享
        InviteWxFriend: 36,         // 定向邀请微信好友
        MonthCardAward: 37,         // 月卡奖励
        WeekCardAward: 38,          // 周卡奖励
        RegainLoseBonus: 39,        // 对局免输额外道具奖励
        WinDouble: 41,              // 赢金翻倍
        ShareMoneyTask: 42,         // 分享赚钱分享任务

        CombinedOffline: 60,         // 合成离线收益 
        CombinedSpeeding: 61,        // 合成加速 
        CombinedLucky: 62,             // 合成宝箱奖励 
        CombinedFreeShop: 63,        // 合成免费商品 
        CombinedUnenough: 64,        // 合成银币不足 
        CombinedLottery: 65,         // 合成中转盘 
        CombinedLvRp: 66,            // 合成提升红包等级
        CombinedExtLv: 67,           // 建筑额外升级
    }

    const adAwards = [
        { index: ITEM.GOLD_COIN, number: -1, adindex: AdsConfig.taskAdsMap.DynamicGold },
        { index: ITEM.REDPACKET_TICKET, number: -1, adindex: AdsConfig.taskAdsMap.DrawRp },
        // { index: ITEM.DIAMOND, number: -1, adindex: AdsConfig.taskAdsMap.DrawDiamond },
        { index: ITEM.SUPER_JIABEI, number: 4, adindex: AdsConfig.taskAdsMap.DoubleCard },
        { index: ITEM.CARD_RECORD, number: 4, adindex: AdsConfig.taskAdsMap.CardNoteBuyPop },
        { index: ITEM.LOOK_LORDCARD, number: 4, adindex: AdsConfig.taskAdsMap.LookCard },
    ]

    export function getAwards() {
        return adAwards
    }

    export function getAwardById(index) {
        for (const award of adAwards) {
            if (award.adindex == index) {
                return award
            }
        }
        return null
    }
}