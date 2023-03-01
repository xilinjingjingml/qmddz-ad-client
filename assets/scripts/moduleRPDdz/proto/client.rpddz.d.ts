export interface proto_cb_login_req {
    opcode: "proto_cb_login_req"
    plyGuid: number
    plyTicket: string
    version: number
    extParam: string
    mainGameId: number
    gameGroup: number
}

export interface proto_bc_login_ack {
    opcode: "proto_bc_login_ack"
    ret: number
    plyBaseData: proto_PlyBaseData
    plyStatus: proto_PlayerStatus
    errorMsg: string
}

export interface proto_PlyBaseData {
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
    plyVip: proto_VipData
}

export interface proto_PlayerStatus {
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

export interface proto_VipData {
    level: number
    nexLevelTotalDays: number
    autoUpgradeDay: number
    loginAward: number
    friendCount: number
    nextLevelDueDays: number
    remainDueDays: number
    status: number
}

export interface proto_cb_join_table_req {
    opcode: "proto_cb_join_table_req"
    tableId: number
    password: string
    clubUid: number
}

export interface proto_bc_join_table_ack {
    opcode: "proto_bc_join_table_ack"
    ret: number
    tableAttrs: proto_TableAttr
    errMsg: string
}

export interface proto_TableAttr {
    tableId: number
    name: string
    lock: number
    players: proto_PlyBaseData[]
}

export interface proto_cb_leave_table_req {
    opcode: "proto_cb_leave_table_req"
}

export interface proto_bc_leave_table_ack {
    opcode: "proto_bc_leave_table_ack"
    ret: number
    plyNickname: string
}

export interface proto_bc_ply_join_not {
    opcode: "proto_bc_ply_join_not"
    plyData: proto_PlyBaseData
}

export interface proto_bc_ply_leave_not {
    opcode: "proto_bc_ply_leave_not"
    plyGuid: number
}

export interface proto_cb_ready_req {
    opcode: "proto_cb_ready_req"
}

export interface proto_bc_ready_not {
    opcode: "proto_bc_ready_not"
    plyGuid: number
}

export interface proto_cb_change_table_req {
    opcode: "proto_cb_change_table_req"
}

export interface proto_bc_update_ply_data_not {
    opcode: "proto_bc_update_ply_data_not"
    plyGuid: number
    uptReason: number
    uptType: number
    variant: number
    amount: number
}

export interface proto_bc_message_not {
    opcode: "proto_bc_message_not"
    type: number
    message: string
}

export interface proto_bc_specify_item_update_not {
    opcode: "proto_bc_specify_item_update_not"
    plyGuid: number
    index: number
    num: number
}

export interface proto_gc_game_start_not {
    opcode: "proto_gc_game_start_not"
    nGameMoney: number
    nCardNum: number
    nLordPos: number
    cLordCard: proto_CCard
    nSerialID: number
}

export interface proto_gc_counts_not1 {
    opcode: "proto_gc_counts_not1"
    countsNum: number
}

export interface proto_sic_bet_req {
    cCellID: number
    nAmount: number
}

export interface proto_gc_task_not {
    opcode: "proto_gc_task_not"
    taskItem: proto_TaskItem
}

export interface proto_gc_two_lord_card_not {
    opcode: "proto_gc_two_lord_card_not"
    cLord: number
    vecCards: proto_CCard[]
    nLetNum: number
    nLordLetNum: number
}

export interface proto_gc_expression_not {
    opcode: "proto_gc_expression_not"
    expressionType: number
    expressionNum: number
}

export interface proto_gc_use_card_recode_noti {
    opcode: "proto_gc_use_card_recode_noti"
    cChairID: number
    cReconnection: number
}

export interface proto_gc_card_recode_req {
    opcode: "proto_gc_card_recode_req"
}

export interface proto_gc_bomb_not {
    opcode: "proto_gc_bomb_not"
    nDouble: number
}

export interface proto_gc_private_room_result_ack {
    opcode: "proto_gc_private_room_result_ack"
    vecGameStatiscs: proto_GameStatisc[]
}

export interface proto_gc_replay_data_not {
    opcode: "proto_gc_replay_data_not"
    vecChangeCards: proto_gc_refresh_card_not[]
}

export interface proto_cg_bet_lord_card_req {
    opcode: "proto_cg_bet_lord_card_req"
    index: number
}

export interface proto_stUserData {
    cChairID: number
    vecHandCards: proto_CCard[]
    vecPutCards: proto_CCard[]
}

export interface proto_gc_double_score_req {
    opcode: "proto_gc_double_score_req"
    nSerialID: number
}

export interface proto_gc_game_result_not {
    opcode: "proto_gc_game_result_not"
    bType: number
    cDouble: number
    cCallScore: number
    bShowCard: number
    nBombCount: number
    bSpring: number
    bReverseSpring: number
    bRobLord: number
    vecUserResult: proto_stUserResult[]
}

export interface proto_gc_user_savestar_card_noti {
    opcode: "proto_gc_user_savestar_card_noti"
}

export interface proto_gc_counts_not {
    opcode: "proto_gc_counts_not"
    countsNum: number
}

export interface proto_cg_three_draw_req_data {
    opcode: "proto_cg_three_draw_req_data"
}

export interface proto_gc_starsky_update_item_noti {
    opcode: "proto_gc_starsky_update_item_noti"
    stamina: number
    matchTicket: number
    score: number
    savestarCard: number
}

export interface proto_magic_emoji_noti {
    cIsError: number
    cEmojiIndex: number
    cFromChairID: number
    cToChairID: number
    cEmojiNum: number
}

export interface proto_cg_complete_data_req {
    opcode: "proto_cg_complete_data_req"
}

export interface proto_sic_bet_update_ack {
    nBetUpdateAckTag: number
    vecAmountCell: proto_st_sic_cell[]
}

export interface proto_gc_bet_lord_card_ack {
    opcode: "proto_gc_bet_lord_card_ack"
    ret: number
    index: number
}

export interface proto_gc_double_score_not {
    opcode: "proto_gc_double_score_not"
    nDouble: number
    nSerialID: number
}

export interface proto_sic_new_round_not {
}

export interface proto_st_sic_cell {
    opcode: "proto_st_sic_cell"
    cCellID: number
    nAmount: number
}

export interface proto_gc_play_card_not {
    opcode: "proto_gc_play_card_not"
    cChairID: number
    vecCards: proto_CCard[]
    cType: proto_CCardsType
}

export interface proto_gc_item_info_not {
    opcode: "proto_gc_item_info_not"
    nItemIndex: number
    nItemCount: number
}

export interface proto_stUserResult {
    nChairID: number
    nScore: number
}

export interface proto_cg_starsky_season_noti {
    opcode: "proto_cg_starsky_season_noti"
    season: number
}

export interface proto_gc_update_player_tokenmoney_not {
    opcode: "proto_gc_update_player_tokenmoney_not"
    plyChairid: number
    itemInfo: proto_player_itemInfo[]
}

export interface proto_player_itemInfo {
    nItemIndex: number
    nItemNum: number
    nItemNum64: number
}

export interface proto_gc_common_not {
    opcode: "proto_gc_common_not"
    nOp: number
    cChairID: number
}

export interface proto_gc_complete_data_not {
    opcode: "proto_gc_complete_data_not"
    nGameMoney: number
    nDouble: number
    cLord: number
    vecLordCards: proto_CCard[]
    vecData: proto_stUserData[]
}

export interface proto_sic_show_result_not {
}

export interface proto_gc_get_redpackets_award_ack {
    opcode: "proto_gc_get_redpackets_award_ack"
    ret: number
    curRounds: number
    limitRounds: number
    nAmount: number
    cItemtype: number
    taskId: number
    fakeItem: proto_player_itemInfo[]
}

export interface proto_cg_get_redpackets_award_req {
    opcode: "proto_cg_get_redpackets_award_req"
    type: number
}

export interface proto_gc_send_dizhu_not {
    opcode: "proto_gc_send_dizhu_not"
    nGameMoney: number
}

export interface proto_gc_ju_count_not {
    opcode: "proto_gc_ju_count_not"
    nJuCount: number
}

export interface proto_sic_bet_update_req {
    nBetUpdateAckTag: number
}

export interface proto_gc_extra_double_score_not {
    opcode: "proto_gc_extra_double_score_not"
    nDouble: number
    nLordDouble: number
    nSerialID: number
}

export interface proto_gc_had_start_not {
    opcode: "proto_gc_had_start_not"
}

export interface proto_gc_pause_game_not {
    opcode: "proto_gc_pause_game_not"
    nFlag: number
    nMinTime: number
    nSecTime: number
    cChairId: number
    sNickName: string
}

export interface proto_gc_private_room_result_not {
    opcode: "proto_gc_private_room_result_not"
    ret: number
    vecGameStatiscs: proto_GameStatisc[]
}

export interface proto_gc_get_card_ack {
    opcode: "proto_gc_get_card_ack"
    num: number
    vecCards0: proto_CCard[]
    vecCards1: proto_CCard[]
    vecCards2: proto_CCard[]
}

export interface proto_cg_private_room_result_req {
    opcode: "proto_cg_private_room_result_req"
}

export interface proto_GameStatisc {
    cChairID: number
    nCallTimes: number
    nLordTimes: number
    nWinTimes: number
    nZhanJi: number
}

export interface proto_gc_two_show_card_not {
    opcode: "proto_gc_two_show_card_not"
    cChairID: number
    nLordPos: number
    cLordCard: proto_CCard
}

export interface proto_gc_two_complete_data_not {
    opcode: "proto_gc_two_complete_data_not"
    nGameMoney: number
    nDouble: number
    cLord: number
    vecLordCards: proto_CCard[]
    vecData: proto_stUserData[]
    nLetNum: number
    nStart: number
}

export interface proto_stUserResult1 {
    nChairID: number
    nScore: number
    nJifen: number
}

export interface proto_gc_two_let_card_not {
    opcode: "proto_gc_two_let_card_not"
    nLetNum: number
}

export interface proto_cg_get_card_req {
    opcode: "proto_cg_get_card_req"
    nSerialID: number
}

export interface proto_gc_lord_card_lottery_info {
    opcode: "proto_gc_lord_card_lottery_info"
    fee: number
    vecReward: number[]
}

export interface proto_gc_get_lord_card_reward {
    opcode: "proto_gc_get_lord_card_reward"
    index: number
    money: number
}

export interface proto_gc_game_model {
    opcode: "proto_gc_game_model"
    cModelType: number
}

export interface proto_gc_three_draw_ack_card {
    opcode: "proto_gc_three_draw_ack_card"
    ret: number
    vecCards: proto_CCard[]
    vecRates: number[]
    nMoney: number
    nDiZhu: number
    fRate: number
}

export interface proto_sic_bet_ack {
    bAllow: number
    cCellID: number
    nAmountCell: number
    nAmountCellTotal: number
}

export interface proto_cg_lord_card_lottery_info {
    opcode: "proto_cg_lord_card_lottery_info"
}

export interface proto_CCard {
    mNColor: number
    mNValue: number
    mNCard_Baovalue: number
}

export interface proto_cg_three_draw_req_card {
    opcode: "proto_cg_three_draw_req_card"
}

export interface proto_gc_three_draw_ack_data {
    opcode: "proto_gc_three_draw_ack_data"
    ret: number
    vecMoneyDiZhus: proto_Money_DiZhu[]
    vecKindRates: proto_Kind_Rate[]
    nBaoDiMoney: number
    nBaoDiRate: number
    fMinRate: number
}

export interface proto_Kind_Rate {
    strKind: string
    strRate: string
}

export interface proto_cli_my_req {
    opcode: "proto_cli_my_req"
    a: number
}

export interface proto_Money_DiZhu {
    nMoney: number
    nDiZhu: number
}

export interface proto_gc_card_count_ack1 {
    opcode: "proto_gc_card_count_ack1"
    countsNum: number
    mVecPutCard: proto_CCard[]
}

export interface proto_mj_completedata_req {
    opcode: "proto_mj_completedata_req"
}

export interface proto_CCardsType {
    mNTypeBomb: number
    mNTypeNum: number
    mNTypeValue: number
}

export interface proto_svr_test_not {
    cTest: number
    nTest: number
    vecTest: number[]
}

export interface proto_sic_bet_clear_ack {
    nBetUpdateAckTag: number
    nAmountBack: number
    nAmountTotal: number
}

export interface proto_gc_refresh_card_not {
    opcode: "proto_gc_refresh_card_not"
    cChairID: number
    vecCards: proto_CCard[]
}

export interface proto_gc_show_card_req {
    opcode: "proto_gc_show_card_req"
    nSerialID: number
    nShowCardType: number
    nShowCardBet: number
}

export interface proto_cg_auto_req {
    opcode: "proto_cg_auto_req"
    cAuto: number
}

export interface proto_sic_history_req {
}

export interface proto_cg_card_count_req {
    opcode: "proto_cg_card_count_req"
}

export interface proto_gc_task_complete_not {
    opcode: "proto_gc_task_complete_not"
    chairId: number
    taskStatus: number
}

export interface proto_cg_call_score_ack {
    opcode: "proto_cg_call_score_ack"
    nScore: number
    nSerialID: number
}

export interface proto_sic_show_light_cell_not {
}

export interface proto_gc_call_score_req {
    opcode: "proto_gc_call_score_req"
    nScore: number
    nSerialID: number
}

export interface proto_sic_bet_clear_req {
}

export interface proto_gc_clienttimer_not {
    opcode: "proto_gc_clienttimer_not"
    chairId: number
    sPeriod: number
}

export interface proto_TaskItem {
    taskId: number
    taskDesc: string
    taskMission: string
    taskMoneyType: number
    taskMoney: number
    taskRate: number
}

export interface proto_gc_three_draw_notify {
    opcode: "proto_gc_three_draw_notify"
    message: string
}

export interface proto_gc_laizi_not {
    opcode: "proto_gc_laizi_not"
    cardValue: number
}

export interface proto_magic_emoji_req {
    cEmojiIndex: number
    cToChairID: number
    cCostType: number
}

export interface proto_cg_double_score_ack {
    opcode: "proto_cg_double_score_ack"
    nScore: number
    nSerialID: number
}

export interface proto_cg_play_card_ack {
    opcode: "proto_cg_play_card_ack"
    nSerialID: number
    cTimeOut: number
    vecCards: proto_CCard[]
}

export interface proto_sic_bet_begin_not {
}

export interface proto_cg_get_lord_card_reward {
    opcode: "proto_cg_get_lord_card_reward"
    index: number
}

export interface proto_gc_bet_lord_card_result_ack {
    opcode: "proto_gc_bet_lord_card_result_ack"
    ret: number
    money: number
}

export interface proto_svr_my_ack {
    opcode: "proto_svr_my_ack"
    b: number
}

export interface proto_gc_game_result_not1 {
    opcode: "proto_gc_game_result_not1"
    bType: number
    cDouble: number
    cCallScore: number
    bShowCard: number
    nBombCount: number
    bSpring: number
    bReverseSpring: number
    bRobLord: number
    vecUserResult1: proto_stUserResult1[]
}

export interface proto_gc_play_card_req {
    opcode: "proto_gc_play_card_req"
    cAuto: number
    nSerialID: number
}

export interface proto_gc_lord_card_lottery_base {
    opcode: "proto_gc_lord_card_lottery_base"
    ret: number
    index: number
}

export interface proto_gc_auto_not {
    opcode: "proto_gc_auto_not"
    cChairID: number
    cAuto: number
}

export interface proto_gc_card_count_ack {
    opcode: "proto_gc_card_count_ack"
    countsNum: number
    mVecPutCard: proto_CCard[]
}

export interface proto_gc_rob_lord_req {
    opcode: "proto_gc_rob_lord_req"
    cDefaultLord: number
    nSerialID: number
}

export interface proto_sic_history_ack {
    bIsFounder: number
    nPlayerMoneyBefore: number
    vecHistory: string[]
    nChipType: number
    vecChipValue: number[]
    nAmountMax: number
    fNextRoundTimeWait: number
    vecPeriod: number[]
}

export interface proto_cg_rob_lord_ack {
    opcode: "proto_cg_rob_lord_ack"
    cRob: number
    nSerialID: number
}

export interface proto_gc_show_card_not {
    opcode: "proto_gc_show_card_not"
    nChairID: number
    vecCards: proto_CCard[]
}

export interface proto_sic_result_data_not {
    vecDice: number[]
    nWinMoney: number
    nPlayerMoneyAfter: number
    vecWinCells: number[]
    vecPlayerWinCells: number[]
    vecHitAward: string[]
    vecRank: string[]
}

export interface proto_cg_show_card_ack {
    opcode: "proto_cg_show_card_ack"
    cShowCard: number
    nSerialID: number
    nShowCardBet: number
    nShowCardType: number
}

export interface proto_cg_send_card_ok_ack {
    opcode: "proto_cg_send_card_ok_ack"
    nSerialID: number
}

export interface proto_gc_lord_card_not {
    opcode: "proto_gc_lord_card_not"
    cLord: number
    vecCards: proto_CCard[]
}

export interface proto_gc_get_redpackets_88yuan_award_ack {
    opcode: "proto_gc_get_redpackets_88yuan_award_ack"
    ret: number
    curRounds: number
    limitRounds: number
    nAmount: number
    cItemtype: number
    taskId: number
}

export interface proto_cg_get_redpackets_88yuan_award_req {
    opcode: "proto_cg_get_redpackets_88yuan_award_req"
    type: number
}

export interface proto_emojiConfig {
    cEmojiIndex: number
    cCostType: number
    cCostValue: number
    nTenItemIndex: number
    nTenItemNum: number
    nTenEmojiNum: number
}

export interface proto_gc_magic_emoji_config_not {
    opcode: "proto_gc_magic_emoji_config_not"
    emojiConfigs: proto_emojiConfig[]
}

export interface proto_gc_play_card_private_not {
    opcode: "proto_gc_play_card_private_not"
    cChairID: number
    vecCards: proto_CCard[]
    cType: proto_CCardsType
}

export interface proto_cg_look_lord_card_req {
    opcode: "proto_cg_look_lord_card_req"
}

export interface proto_gc_beishu_info_ack {
    opcode: "proto_gc_beishu_info_ack"
    vecBeiShuInfo: number[]
    vecPlayerBeiShu: number[]
}

export interface proto_cg_beishu_info_req {
    opcode: "proto_cg_beishu_info_req"
}

export interface proto_cg_regain_lose_score_req {
    opcode: "proto_cg_regain_lose_score_req"
    nOp: number
}

export interface proto_gc_regain_lose_score_ack {
    opcode: "proto_gc_regain_lose_score_ack"
    nRet: number
    nTime: number
    nValue: number[]
    nCurCount: number
}

export interface proto_cg_enable_invincible_req {
    opcode: "proto_cg_enable_invincible_req"
    nOp: number
}

export interface proto_gc_enable_invincible_ack {
    opcode: "proto_gc_enable_invincible_ack"
    nRet: number
}

export interface proto_gc_get_redpackets_newbie_award_req {
    opcode: "proto_gc_get_redpackets_newbie_award_req"
    nAmount: number
}

export interface proto_cg_get_redpackets_newbie_award_ack {
    opcode: "proto_cg_get_redpackets_newbie_award_ack"
}

export interface proto_gc_get_redpackets_newbie_award_not {
    opcode: "proto_gc_get_redpackets_newbie_award_not"
    nRet: number
    nAmount: number
}

export interface proto_cg_look_lord_card_item_req {
    opcode: "proto_cg_look_lord_card_item_req"
}

export interface proto_gc_look_lord_card_item_ack {
    opcode: "proto_gc_look_lord_card_item_ack"
    nRet: number
}

export interface proto_gc_item_add_not {
    opcode: "proto_gc_item_add_not"
    nItemIndex: number
    nItemCount: number
}
