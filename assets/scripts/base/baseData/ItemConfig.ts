export enum ITEM {
    /**
     * 金豆
     */
    GOLD_COIN = 0,

    /**
     * 记牌器
     */
    CARD_RECORD = 2,

    /**
     * 红包券
     */
    REDPACKET_TICKET = 365,

    /**
     * 斗地主超级加倍卡
     */
    SUPER_JIABEI = 373,

    /**
     * 钻石
     */
    DIAMOND = 372,

    /**
     * 斗地主优先看底牌卡
     */
    LOOK_LORDCARD = 375,

    /**
     * 高级碎片
     */
    CHIP_ADVANCE = 376,

    /**
     *传奇碎片
     */
    CHIP_LEGEND = 377,

    /**
     *提现道具
     */
    TO_CASH = 382,

    /**
     *免扣符
     */
    FREE_LOSE = 383,
}

export const ITEM_NAME = {
    /**
     * 金豆
     */
    [ITEM.GOLD_COIN] : "金豆",

    /**
     * 记牌器
     */
    [ITEM.CARD_RECORD] : "记牌器",

    /**
     * 红包券
     */
    [ITEM.REDPACKET_TICKET] : "福卡",

    /**
     * 斗地主超级加倍卡
     */
    [ITEM.SUPER_JIABEI] : "超级加倍卡",

    /**
     * 斗地主优先看底牌卡
     */
    [ITEM.LOOK_LORDCARD] : "看底牌卡",

    /**
     * 高级碎片
     */
    [ITEM.CHIP_ADVANCE] : "高级碎片",

    /**
     *传奇碎片
     */
    [ITEM.CHIP_LEGEND] : "传奇碎片",

    /**
     *提现道具
     */
    [ITEM.TO_CASH] : "红包",

    /**
     *免扣符
     */
    [ITEM.FREE_LOSE] : "免扣符",
}