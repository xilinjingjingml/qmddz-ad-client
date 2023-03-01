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
        All: -1,                                    // 关闭所有banner
    }

    export const taskAdsMap = {
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
    }

    const adAwards = [
        { index: 0, number: -1, adindex: AdsConfig.taskAdsMap.DynamicGold },
        { index: 365, number: -1, adindex: AdsConfig.taskAdsMap.DrawRp },
        { index: 372, number: -1, adindex: AdsConfig.taskAdsMap.DrawDiamond },
        { index: 373, number: 2, adindex: AdsConfig.taskAdsMap.DoubleCard },
        { index: 2, number: 2, adindex: AdsConfig.taskAdsMap.CardNoteBuyPop },
        { index: 375, number: 2, adindex: AdsConfig.taskAdsMap.LookCard },
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