interface Iproto_cb_login_req {
    opcode: 'proto_cb_login_req'
    plyGuid: number
    plyTicket: string
    version: number
    extParam: string
    mainGameId: number
    gameGroup: number
}

interface Iproto_bc_login_ack {
    opcode: 'proto_bc_login_ack'
    ret: number
    plyBaseData: Iproto_PlyBaseData
    plyStatus: Iproto_PlayerStatus
    errorMsg: string
}

interface Iproto_PlyBaseData {
    plyGuid: number
    nickname: string
    sex: number
    gift: number
    money: number
    score: number
    won: number
    lost: number
    dogfall: number
    tableId: number
    param_1: number
    param_2: number
    chairId: number
    ready: number
    plyVip: Iproto_VipData
}

interface Iproto_PlayerStatus {
    plyGuid: number
    plyNickname: string
    plyStatus: number
    sex: number
    gameId: number
    gameServerId: number
    tableId: number
    money: number
    won: number
    lost: number
    moneyRank: number
    wonRank: number
    param_1: number
    param_2: number
    latitude: number
    longitude: number
}

interface Iproto_VipData {
    level: number
    nexLevelTotalDays: number
    autoUpgradeDay: number
    loginAward: number
    friendCount: number
    nextLevelDueDays: number
    remainDueDays: number
    status: number
}

interface Iproto_cb_join_table_req {
    opcode: 'proto_cb_join_table_req'
    tableId: number
    password: string
    clubUid: number
}

interface Iproto_bc_join_table_ack {
    opcode: 'proto_bc_join_table_ack'
    ret: number
    tableAttrs: Iproto_TableAttr
    errMsg: string
}

interface Iproto_TableAttr {
    tableId: number
    name: string
    lock: number
    players: Iproto_PlyBaseData[]
}

interface Iproto_cb_leave_table_req {
    opcode: 'proto_cb_leave_table_req'
}

interface Iproto_bc_leave_table_ack {
    opcode: 'proto_bc_leave_table_ack'
    ret: number
    plyNickname: string
}

interface Iproto_bc_ply_join_not {
    opcode: 'proto_bc_ply_join_not'
    plyData: Iproto_PlyBaseData
}

interface Iproto_bc_ply_leave_not {
    opcode: 'proto_bc_ply_leave_not'
    plyGuid: number
}

interface Iproto_cb_ready_req {
    opcode: 'proto_cb_ready_req'
}

interface Iproto_bc_ready_not {
    opcode: 'proto_bc_ready_not'
    plyGuid: number
}

interface Iproto_cb_change_table_req {
    opcode: 'proto_cb_change_table_req'
}

interface Iproto_bc_update_ply_data_not {
    opcode: 'proto_bc_update_ply_data_not'
    plyGuid: number
    uptReason: number
    uptType: number
    variant: number
    amount: number
}

interface Iproto_bc_message_not {
    opcode: 'proto_bc_message_not'
    type: number
    message: string
}

interface Iproto_bc_specify_item_update_not {
    opcode: 'proto_bc_specify_item_update_not'
    plyGuid: number
    index: number
    num: number
}

interface Iproto_gc_game_start_not {
    opcode: 'proto_gc_game_start_not'
    nGameMoney: number
    nCardNum: number
    nLordPos: number
    cLordCard: Iproto_CCard
    nSerialID: number
}

interface Iproto_gc_counts_not1 {
    opcode: 'proto_gc_counts_not1'
    countsNum: number
}

interface Iproto_sic_bet_req {
    cCellID: number
    nAmount: number
}

interface Iproto_gc_task_not {
    opcode: 'proto_gc_task_not'
    taskItem: Iproto_TaskItem
}

interface Iproto_gc_two_lord_card_not {
    opcode: 'proto_gc_two_lord_card_not'
    cLord: number
    vecCards: Iproto_CCard[]
    nLetNum: number
    nLordLetNum: number
}

interface Iproto_gc_expression_not {
    opcode: 'proto_gc_expression_not'
    expressionType: number
    expressionNum: number
}

interface Iproto_cg_get_redpackets_newbie_award_ack {
    opcode: 'proto_cg_get_redpackets_newbie_award_ack'
    cDouble: number
}

interface Iproto_gc_beishu_info_ack {
    opcode: 'proto_gc_beishu_info_ack'
    vecBeiShuInfo: number[]
    vecPlayerBeiShu: number[]
}

interface Iproto_gc_use_card_recode_noti {
    opcode: 'proto_gc_use_card_recode_noti'
    cChairID: number
    cReconnection: number
}

interface Iproto_cg_win_doubel_req {
    opcode: 'proto_cg_win_doubel_req'
}

interface Iproto_gc_card_recode_req {
    opcode: 'proto_gc_card_recode_req'
}

interface Iproto_gc_two_let_card_not {
    opcode: 'proto_gc_two_let_card_not'
    nLetNum: number
}

interface Iproto_gc_update_player_tokenmoney_not {
    opcode: 'proto_gc_update_player_tokenmoney_not'
    plyChairid: number
    itemInfo: Iproto_player_itemInfo[]
}

interface Iproto_gc_card_count_ack {
    opcode: 'proto_gc_card_count_ack'
    countsNum: number
    mVecPutCard: Iproto_CCard[]
}

interface Iproto_cg_regain_lose_score_req {
    opcode: 'proto_cg_regain_lose_score_req'
    nOp: number
    nItemIndex: number
    nItemNum: number
}

interface Iproto_gc_private_room_result_ack {
    opcode: 'proto_gc_private_room_result_ack'
    vecGameStatiscs: Iproto_GameStatisc[]
}

interface Iproto_gc_enable_invincible_ack {
    opcode: 'proto_gc_enable_invincible_ack'
    nRet: number
}

interface Iproto_cg_bet_lord_card_req {
    opcode: 'proto_cg_bet_lord_card_req'
    index: number
}

interface Iproto_gc_look_lord_card_item_ack {
    opcode: 'proto_gc_look_lord_card_item_ack'
    nRet: number
}

interface Iproto_stUserData {
    cChairID: number
    vecHandCards: Iproto_CCard[]
    vecPutCards: Iproto_CCard[]
}

interface Iproto_gc_double_score_req {
    opcode: 'proto_gc_double_score_req'
    nSerialID: number
}

interface Iproto_gc_game_result_not {
    opcode: 'proto_gc_game_result_not'
    bType: number
    cDouble: number
    cCallScore: number
    bShowCard: number
    nBombCount: number
    bSpring: number
    bReverseSpring: number
    bRobLord: number
    vecUserResult: Iproto_stUserResult[]
}

interface Iproto_gc_user_savestar_card_noti {
    opcode: 'proto_gc_user_savestar_card_noti'
}

interface Iproto_gc_get_redpackets_award_ack {
    opcode: 'proto_gc_get_redpackets_award_ack'
    ret: number
    curRounds: number
    limitRounds: number
    nAmount: number
    cItemtype: number
    taskId: number
    fakeItem: Iproto_player_itemInfo[]
}

interface Iproto_gc_refresh_card_not {
    opcode: 'proto_gc_refresh_card_not'
    cChairID: number
    vecCards: Iproto_CCard[]
}

interface Iproto_cg_three_draw_req_data {
    opcode: 'proto_cg_three_draw_req_data'
}

interface Iproto_ItemInfo {
    nItemIndex: number
    nItemNum: number
}

interface Iproto_player_itemInfo {
    nItemIndex: number
    nItemNum: number
    nItemNum64: number
}

interface Iproto_cg_get_redpackets_88yuan_award_req {
    opcode: 'proto_cg_get_redpackets_88yuan_award_req'
    type: number
}

interface Iproto_gc_starsky_update_item_noti {
    opcode: 'proto_gc_starsky_update_item_noti'
    stamina: number
    matchTicket: number
    score: number
    savestarCard: number
}

interface Iproto_cg_look_lord_card_item_req {
    opcode: 'proto_cg_look_lord_card_item_req'
}

interface Iproto_cg_get_redpackets_award_req {
    opcode: 'proto_cg_get_redpackets_award_req'
    type: number
}

interface Iproto_gc_send_dizhu_not {
    opcode: 'proto_gc_send_dizhu_not'
    nGameMoney: number
}

interface Iproto_cg_complete_data_req {
    opcode: 'proto_cg_complete_data_req'
}

interface Iproto_sic_bet_update_ack {
    nBetUpdateAckTag: number
    vecAmountCell: Iproto_st_sic_cell[]
}

interface Iproto_gc_item_add_not {
    opcode: 'proto_gc_item_add_not'
    nItemIndex: number
    nItemCount: number
}

interface Iproto_gc_bet_lord_card_ack {
    opcode: 'proto_gc_bet_lord_card_ack'
    ret: number
    index: number
}

interface Iproto_gc_replay_data_not {
    opcode: 'proto_gc_replay_data_not'
    vecChangeCards: Iproto_gc_refresh_card_not[]
}

interface Iproto_gc_ju_count_not {
    opcode: 'proto_gc_ju_count_not'
    nJuCount: number
}

interface Iproto_gc_had_start_not {
    opcode: 'proto_gc_had_start_not'
}

interface Iproto_gc_double_score_not {
    opcode: 'proto_gc_double_score_not'
    nDouble: number
    nSerialID: number
    cChairID: number
}

interface Iproto_sic_new_round_not {
}

interface Iproto_gc_pause_game_not {
    opcode: 'proto_gc_pause_game_not'
    nFlag: number
    nMinTime: number
    nSecTime: number
    cChairId: number
    sNickName: string
}

interface Iproto_gc_private_room_result_not {
    opcode: 'proto_gc_private_room_result_not'
    ret: number
    vecGameStatiscs: Iproto_GameStatisc[]
}

interface Iproto_st_sic_cell {
    opcode: 'proto_st_sic_cell'
    cCellID: number
    nAmount: number
}

interface Iproto_gc_play_card_not {
    opcode: 'proto_gc_play_card_not'
    cChairID: number
    vecCards: Iproto_CCard[]
    cType: Iproto_CCardsType
}

interface Iproto_gc_item_info_not {
    opcode: 'proto_gc_item_info_not'
    nItemIndex: number
    nItemCount: number
}

interface Iproto_cg_private_room_result_req {
    opcode: 'proto_cg_private_room_result_req'
}

interface Iproto_stUserResult {
    nChairID: number
    nScore: number
}

interface Iproto_cg_starsky_season_noti {
    opcode: 'proto_cg_starsky_season_noti'
    season: number
}

interface Iproto_GameStatisc {
    cChairID: number
    nCallTimes: number
    nLordTimes: number
    nWinTimes: number
    nZhanJi: number
}

interface Iproto_gc_two_complete_data_not {
    opcode: 'proto_gc_two_complete_data_not'
    nGameMoney: number
    nDouble: number
    cLord: number
    vecLordCards: Iproto_CCard[]
    vecData: Iproto_stUserData[]
    nLetNum: number
    nStart: number
}

interface Iproto_gc_win_doubel_req {
    opcode: 'proto_gc_win_doubel_req'
    nAddAmount: number
    nAddProbabily: number
}

interface Iproto_gc_common_not {
    opcode: 'proto_gc_common_not'
    nOp: number
    cChairID: number
}

interface Iproto_gc_complete_data_not {
    opcode: 'proto_gc_complete_data_not'
    nGameMoney: number
    nDouble: number
    cLord: number
    vecLordCards: Iproto_CCard[]
    vecData: Iproto_stUserData[]
}

interface Iproto_sic_show_result_not {
}

interface Iproto_cg_three_draw_req_card {
    opcode: 'proto_cg_three_draw_req_card'
}

interface Iproto_gc_game_model {
    opcode: 'proto_gc_game_model'
    cModelType: number
}

interface Iproto_gc_magic_emoji_config_not {
    opcode: 'proto_gc_magic_emoji_config_not'
    emojiConfigs: Iproto_emojiConfig[]
}

interface Iproto_emojiConfig {
    cEmojiIndex: number
    cCostType: number
    cCostValue: number
    nTenItemIndex: number
    nTenItemNum: number
    nTenEmojiNum: number
}

interface Iproto_gc_show_card_req {
    opcode: 'proto_gc_show_card_req'
    nSerialID: number
    nShowCardType: number
    nShowCardBet: number
}

interface Iproto_gc_extra_double_score_not {
    opcode: 'proto_gc_extra_double_score_not'
    nDouble: number
    nLordDouble: number
    nSerialID: number
}

interface Iproto_cg_enable_invincible_req {
    opcode: 'proto_cg_enable_invincible_req'
    nOp: number
}

interface Iproto_magic_emoji_noti {
    cIsError: number
    cEmojiIndex: number
    cFromChairID: number
    cToChairID: number
    cEmojiNum: number
}

interface Iproto_gc_task_complete_not {
    opcode: 'proto_gc_task_complete_not'
    chairId: number
    taskStatus: number
}

interface Iproto_gc_get_card_ack {
    opcode: 'proto_gc_get_card_ack'
    num: number
    vecCards0: Iproto_CCard[]
    vecCards1: Iproto_CCard[]
    vecCards2: Iproto_CCard[]
}

interface Iproto_cg_lord_card_lottery_info {
    opcode: 'proto_cg_lord_card_lottery_info'
}

interface Iproto_mj_completedata_req {
    opcode: 'proto_mj_completedata_req'
}

interface Iproto_gc_two_show_card_not {
    opcode: 'proto_gc_two_show_card_not'
    cChairID: number
    nLordPos: number
    cLordCard: Iproto_CCard
}

interface Iproto_gc_three_draw_ack_data {
    opcode: 'proto_gc_three_draw_ack_data'
    ret: number
    vecMoneyDiZhus: Iproto_Money_DiZhu[]
    vecKindRates: Iproto_Kind_Rate[]
    nBaoDiMoney: number
    nBaoDiRate: number
    fMinRate: number
}

interface Iproto_stUserResult1 {
    nChairID: number
    nScore: number
    nJifen: number
}

interface Iproto_Kind_Rate {
    strKind: string
    strRate: string
}

interface Iproto_cg_get_card_req {
    opcode: 'proto_cg_get_card_req'
    nSerialID: number
}

interface Iproto_gc_lord_card_lottery_info {
    opcode: 'proto_gc_lord_card_lottery_info'
    fee: number
    vecReward: number[]
}

interface Iproto_gc_get_lord_card_reward {
    opcode: 'proto_gc_get_lord_card_reward'
    index: number
    money: number
}

interface Iproto_Money_DiZhu {
    nMoney: number
    nDiZhu: number
}

interface Iproto_gc_three_draw_ack_card {
    opcode: 'proto_gc_three_draw_ack_card'
    ret: number
    vecCards: Iproto_CCard[]
    vecRates: number[]
    nMoney: number
    nDiZhu: number
    fRate: number
}

interface Iproto_svr_test_not {
    cTest: number
    nTest: number
    vecTest: number[]
}

interface Iproto_gc_get_redpackets_newbie_award_not {
    opcode: 'proto_gc_get_redpackets_newbie_award_not'
    nRet: number
    nAmount: number
}

interface Iproto_CCard {
    mNColor: number
    mNValue: number
    mNCard_Baovalue: number
}

interface Iproto_gc_lord_card_not {
    opcode: 'proto_gc_lord_card_not'
    cLord: number
    vecCards: Iproto_CCard[]
}

interface Iproto_gc_counts_not {
    opcode: 'proto_gc_counts_not'
    countsNum: number
}

interface Iproto_gc_regain_lose_score_ack {
    opcode: 'proto_gc_regain_lose_score_ack'
    nRet: number
    nTime: number
    nValue: number[]
    nCurCount: number
    nItemIndex: number
    nItemNum: number
}

interface Iproto_cli_my_req {
    opcode: 'proto_cli_my_req'
    a: number
}

interface Iproto_sic_bet_ack {
    bAllow: number
    cCellID: number
    nAmountCell: number
    nAmountCellTotal: number
}

interface Iproto_gc_card_count_ack1 {
    opcode: 'proto_gc_card_count_ack1'
    countsNum: number
    mVecPutCard: Iproto_CCard[]
}

interface Iproto_sic_bet_clear_req {
}

interface Iproto_CCardsType {
    mNTypeBomb: number
    mNTypeNum: number
    mNTypeValue: number
}

interface Iproto_sic_bet_update_req {
    nBetUpdateAckTag: number
}

interface Iproto_sic_bet_clear_ack {
    nBetUpdateAckTag: number
    nAmountBack: number
    nAmountTotal: number
}

interface Iproto_gc_bomb_not {
    opcode: 'proto_gc_bomb_not'
    nDouble: number
}

interface Iproto_cg_look_lord_card_req {
    opcode: 'proto_cg_look_lord_card_req'
}

interface Iproto_cg_auto_req {
    opcode: 'proto_cg_auto_req'
    cAuto: number
}

interface Iproto_sic_history_req {
}

interface Iproto_gc_auto_not {
    opcode: 'proto_gc_auto_not'
    cChairID: number
    cAuto: number
}

interface Iproto_gc_call_score_req {
    opcode: 'proto_gc_call_score_req'
    nScore: number
    nSerialID: number
    nCallMode: number
}

interface Iproto_cg_call_score_ack {
    opcode: 'proto_cg_call_score_ack'
    nScore: number
    nSerialID: number
}

interface Iproto_sic_show_light_cell_not {
}

interface Iproto_gc_get_redpackets_88yuan_award_ack {
    opcode: 'proto_gc_get_redpackets_88yuan_award_ack'
    ret: number
    curRounds: number
    limitRounds: number
    nAmount: number
    cItemtype: number
    taskId: number
}

interface Iproto_TaskItem {
    taskId: number
    taskDesc: string
    taskMission: string
    taskMoneyType: number
    taskMoney: number
    taskRate: number
}

interface Iproto_gc_clienttimer_not {
    opcode: 'proto_gc_clienttimer_not'
    chairId: number
    sPeriod: number
}

interface Iproto_cg_card_count_req {
    opcode: 'proto_cg_card_count_req'
}

interface Iproto_gc_three_draw_notify {
    opcode: 'proto_gc_three_draw_notify'
    message: string
}

interface Iproto_gc_laizi_not {
    opcode: 'proto_gc_laizi_not'
    cardValue: number
}

interface Iproto_magic_emoji_req {
    cEmojiIndex: number
    cToChairID: number
    cCostType: number
}

interface Iproto_cg_double_score_ack {
    opcode: 'proto_cg_double_score_ack'
    nScore: number
    nSerialID: number
}

interface Iproto_gc_win_doubel_ack {
    opcode: 'proto_gc_win_doubel_ack'
    cRet: number
    vecItemInfo: Iproto_ItemInfo[]
}

interface Iproto_sic_bet_begin_not {
}

interface Iproto_cg_get_lord_card_reward {
    opcode: 'proto_cg_get_lord_card_reward'
    index: number
}

interface Iproto_gc_bet_lord_card_result_ack {
    opcode: 'proto_gc_bet_lord_card_result_ack'
    ret: number
    money: number
}

interface Iproto_svr_my_ack {
    opcode: 'proto_svr_my_ack'
    b: number
}

interface Iproto_gc_get_redpackets_newbie_award_req {
    opcode: 'proto_gc_get_redpackets_newbie_award_req'
    nAmount: number
    cDouble: number
}

interface Iproto_gc_play_card_req {
    opcode: 'proto_gc_play_card_req'
    cAuto: number
    nSerialID: number
}

interface Iproto_gc_lord_card_lottery_base {
    opcode: 'proto_gc_lord_card_lottery_base'
    ret: number
    index: number
}

interface Iproto_cg_play_card_ack {
    opcode: 'proto_cg_play_card_ack'
    nSerialID: number
    cTimeOut: number
    vecCards: Iproto_CCard[]
}

interface Iproto_cg_beishu_info_req {
    opcode: 'proto_cg_beishu_info_req'
}

interface Iproto_gc_rob_lord_req {
    opcode: 'proto_gc_rob_lord_req'
    cDefaultLord: number
    nSerialID: number
}

interface Iproto_sic_history_ack {
    bIsFounder: number
    nPlayerMoneyBefore: number
    vecHistory: string[]
    nChipType: number
    vecChipValue: number[]
    nAmountMax: number
    fNextRoundTimeWait: number
    vecPeriod: number[]
}

interface Iproto_cg_rob_lord_ack {
    opcode: 'proto_cg_rob_lord_ack'
    cRob: number
    nSerialID: number
}

interface Iproto_gc_show_card_not {
    opcode: 'proto_gc_show_card_not'
    nChairID: number
    vecCards: Iproto_CCard[]
}

interface Iproto_sic_result_data_not {
    vecDice: number[]
    nWinMoney: number
    nPlayerMoneyAfter: number
    vecWinCells: number[]
    vecPlayerWinCells: number[]
    vecHitAward: string[]
    vecRank: string[]
}

interface Iproto_cg_show_card_ack {
    opcode: 'proto_cg_show_card_ack'
    cShowCard: number
    nSerialID: number
    nShowCardBet: number
    nShowCardType: number
}

interface Iproto_cg_send_card_ok_ack {
    opcode: 'proto_cg_send_card_ok_ack'
    nSerialID: number
}

interface Iproto_gc_game_result_not1 {
    opcode: 'proto_gc_game_result_not1'
    bType: number
    cDouble: number
    cCallScore: number
    bShowCard: number
    nBombCount: number
    bSpring: number
    bReverseSpring: number
    bRobLord: number
    vecUserResult1: Iproto_stUserResult1[]
}

interface Iproto_TocashItemInfo {
    cChairID: number
    nItemChange: number
}

interface Iproto_item_info {
    nItemId: number
    nItemNum: number
}

interface Iproto_gc_baiyuan_tocash_item_not {
    opcode: 'proto_gc_baiyuan_tocash_item_not'
    cType: number
    vecItemInfo: Iproto_TocashItemInfo[]
}

interface Iproto_gc_baiyuan_hb_round_not {
    opcode: 'proto_gc_baiyuan_hb_round_not'
    nCurRound: number
    nLimitRound: number
}

interface Iproto_gc_baiyuan_hb_round_award_not {
    opcode: 'proto_gc_baiyuan_hb_round_award_not'
    vecItemInfo: Iproto_item_info[]
}

interface Iproto_cg_baiyuan_hb_round_award_req {
    opcode: 'proto_cg_baiyuan_hb_round_award_req'
}

interface Iproto_gc_baiyuan_hb_round_award_ack {
    opcode: 'proto_gc_baiyuan_hb_round_award_ack'
    cRet: number
    vecItemInfo: Iproto_item_info[]
}

interface Iproto_gc_baiyuan_win_double_not {
    opcode: 'proto_gc_baiyuan_win_double_not'
    vecItemInfo: Iproto_item_info[]
}

interface Iproto_cg_baiyuan_win_double_req {
    opcode: 'proto_cg_baiyuan_win_double_req'
}

interface Iproto_gc_baiyuan_win_double_ack {
    opcode: 'proto_gc_baiyuan_win_double_ack'
    cRet: number
    vecItemInfo: Iproto_item_info[]
}

interface Iproto_gc_baiyuan_regain_lose_not {
    opcode: 'proto_gc_baiyuan_regain_lose_not'
    vecItemInfo: Iproto_item_info[]
}

interface Iproto_cg_baiyuan_regain_lose_req {
    opcode: 'proto_cg_baiyuan_regain_lose_req'
}

interface Iproto_gc_baiyuan_regain_lose_ack {
    opcode: 'proto_gc_baiyuan_regain_lose_ack'
    cRet: number
    vecItemInfo: Iproto_item_info[]
}

interface Iproto_gc_baiyuan_luck_welfare_not {
    opcode: 'proto_gc_baiyuan_luck_welfare_not'
    vecItemInfo: Iproto_item_info[]
}

interface Iproto_cg_baiyuan_luck_welfare_req {
    opcode: 'proto_cg_baiyuan_luck_welfare_req'
}

interface Iproto_gc_baiyuan_luck_welfare_ack {
    opcode: 'proto_gc_baiyuan_luck_welfare_ack'
    cRet: number
    vecItemInfo: Iproto_item_info[]
}

interface Iproto_cg_baiyuan_can_bankruptcy_defend_req {
    opcode: 'proto_cg_baiyuan_can_bankruptcy_defend_req'
}

interface Iproto_gc_baiyuan_can_bankruptcy_defend_ack {
    opcode: 'proto_gc_baiyuan_can_bankruptcy_defend_ack'
    cRet: number
    vecItemInfo: Iproto_item_info[]
}

interface Iproto_cg_baiyuan_bankruptcy_defend_req {
    opcode: 'proto_cg_baiyuan_bankruptcy_defend_req'
}

interface Iproto_gc_baiyuan_bankruptcy_defend_ack {
    opcode: 'proto_gc_baiyuan_bankruptcy_defend_ack'
    cRet: number
    vecItemInfo: Iproto_item_info[]
}
