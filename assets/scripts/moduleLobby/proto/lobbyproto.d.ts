export interface proto_cl_end_chat_req {
    opcode: "proto_cl_end_chat_req"
    endGuid: number
}

export interface proto_cl_sign_flow_match_req {
    opcode: "proto_cl_sign_flow_match_req"
    matchType: number
    signIndex: number
}

export interface proto_PrivateInviteRoomData {
    gameId: number
    serverId: number
    tableId: number
    baseScore: number
    inviteCode: number
    createTime: number
    tableTime: number
    flag: number
    ownerGuid: number
    roomName: string
    gameRule: number
}

export interface proto_bc_do_tip_dila_notf {
    opcode: "proto_bc_do_tip_dila_notf"
    msg: string
    tiperGuid: number
    tipCount: number
    data: proto_DilaData
}

export interface proto_PrivateGameDataAll {
    gameId: number
    createTime: number
    pastTime: number
    inviteCode: number
    itemIndex: number
    roomStatus: number
    ownerGuid: number
    costRoomCard: number
    playerNum: number
    playerMax: number
    gameName: string
    ownerNickName: string
    plyDatas: proto_PrivateGameDataSelf[]
}

export interface proto_cl_club_invite_to_game_req {
    opcode: "proto_cl_club_invite_to_game_req"
    clubUid: number
    clubName: string
    toPlyGuid: number
    inviteCode: number
}

export interface proto_lc_give_back_win_money_not {
    opcode: "proto_lc_give_back_win_money_not"
    sendGuid: number
    recvGuid: number
    sendNickName: string
    payAmount: number
}

export interface proto_bc_send_prop_not {
    opcode: "proto_bc_send_prop_not"
    srcPlyGuid: number
    dstPlyGuid: number
    index: number
    amount: number
}

export interface proto_bc_get_player_feel_value_ack {
    opcode: "proto_bc_get_player_feel_value_ack"
    plyGuid: number
    plyFeelValue: number
}

export interface proto_bc_get_task_system_ack {
    opcode: "proto_bc_get_task_system_ack"
    ret: number
    roundItems: proto_RoundAwardData[]
}

export interface proto_cb_get_streak_task_req {
    opcode: "proto_cb_get_streak_task_req"
}

export interface proto_cl_get_rp_relief_req {
    opcode: "proto_cl_get_rp_relief_req"
    roomType: number
}

export interface proto_lc_get_private_game_statistics_ack {
    opcode: "proto_lc_get_private_game_statistics_ack"
    results: proto_PrivateStatistics[]
}

export interface proto_bc_leave_table_ack {
    opcode: "proto_bc_leave_table_ack"
    ret: number
    plyNickname: string
}

export interface proto_cb_get_assist_info_data_req {
    opcode: "proto_cb_get_assist_info_data_req"
    dstPlyGuid: number
}

export interface proto_bc_get_all_dila_ack {
    opcode: "proto_bc_get_all_dila_ack"
    ret: number
    dataVec: proto_DilaData[]
}

export interface proto_bc_get_player_level_ack {
    opcode: "proto_bc_get_player_level_ack"
    ret: number
    level: number
}

export interface proto_cb_match_add_score_req {
    opcode: "proto_cb_match_add_score_req"
    matchId: number
    type: number
    matchType: number
    baseAddAcore: number
}

export interface proto_cb_get_achieve_list_req {
    opcode: "proto_cb_get_achieve_list_req"
    gameId: number
}

export interface proto_cb_get_achieve_award_req {
    opcode: "proto_cb_get_achieve_award_req"
    index: number
}

export interface proto_cl_club_get_club_list_req {
    opcode: "proto_cl_club_get_club_list_req"
    version: number
    plyGuid: number
}

export interface proto_lc_get_at_achieve_list_ack {
    opcode: "proto_lc_get_at_achieve_list_ack"
    vecItems: proto_ATAchieveData[]
}

export interface proto_bc_common_award_not {
    opcode: "proto_bc_common_award_not"
    type: number
    param_1: number
    param_2: number
    param_3: number
    name: string
    desc: string
}

export interface proto_cb_get_luck_draw_data_list_req {
    opcode: "proto_cb_get_luck_draw_data_list_req"
}

export interface proto_AchieveExtData {
    index: number
    value: number
    max: number
    status: number
    moneyAward: number
    giftAward: number
    name: string
    desc: string
}

export interface proto_lc_get_online_rank_list_mj_ack {
    opcode: "proto_lc_get_online_rank_list_mj_ack"
    ret: number
    flag: number
    type: number
    rankData: proto_OnlineRankItem[]
}

export interface proto_AccumulateSigninAward {
    today: number
    accumulateDays: number
    accSigninAward: proto_AccumulateSigninAward2[]
    conSigninAward: proto_ContinuousSigninAward[]
}

export interface proto_lc_get_user_already_login_days_ack {
    opcode: "proto_lc_get_user_already_login_days_ack"
    days: number
}

export interface proto_ATAchieveAward {
    itemIndex: number
    itemNum: number
}

export interface proto_cb_get_mahjong_quick_daily_task_award_req {
    opcode: "proto_cb_get_mahjong_quick_daily_task_award_req"
    gameId: number
    index: number
}

export interface proto_bc_match_survival_noti {
    opcode: "proto_bc_match_survival_noti"
    matchId: number
    infoType: number
    gameTime: number
    currentPlayerNum: number
    totalBonus: number
}

export interface proto_lc_club_get_club_list_ack {
    opcode: "proto_lc_club_get_club_list_ack"
    clubInfos: proto_ClubInfo[]
}

export interface proto_cl_get_season_card_award_req {
    opcode: "proto_cl_get_season_card_award_req"
    cardType: number
}

export interface proto_bc_successive_victory_not {
    opcode: "proto_bc_successive_victory_not"
    count: number
    msg: string
}

export interface proto_lc_trumpet_by_type_ack {
    opcode: "proto_lc_trumpet_by_type_ack"
    ret: number
    type: number
    msg: string
}

export interface proto_bc_specify_item_update_not {
    opcode: "proto_bc_specify_item_update_not"
    plyGuid: number
    index: number
    num: number
}

export interface proto_cl_get_rank_list_mj_req {
    opcode: "proto_cl_get_rank_list_mj_req"
    type: number
}

export interface proto_PrivateGameLog {
    gameId: number
    inviteCode: number
    itemIndex: number
    time: number
    itemNum: number
    plyGuid: number
    ownerGuid: number
    gameName: string
    plyNickname: string
}

export interface proto_cl_get_at_achieve_list_req {
    opcode: "proto_cl_get_at_achieve_list_req"
    type: number
}

export interface proto_cl_set_club_create_table_rule_req {
    opcode: "proto_cl_set_club_create_table_rule_req"
    clubId: number
    gameId: number
    clubRule: string
    ruleDesc: string
    type: number
    ruleId: number
}

export interface proto_cl_get_club_settting_req {
    opcode: "proto_cl_get_club_settting_req"
    clubUid: number
}

export interface proto_cb_get_hook_status_req {
    opcode: "proto_cb_get_hook_status_req"
}

export interface proto_lc_trumpet_by_type_not {
    opcode: "proto_lc_trumpet_by_type_not"
    type: number
    gameId: number
    param: number
    plyGuid: number
    plyNickname: string
    message: string
    image: string
}

export interface proto_TableItemAttr {
    tableId: number
    name: string
    lock: number
    status: number
    baseScore: number
    curPlyNum: number
}

export interface proto_cl_modify_password_safe_req {
    opcode: "proto_cl_modify_password_safe_req"
    plyGuid: number
    oldPassword: string
    newPassword: string
}

export interface proto_lc_get_rank_list_mj_ack {
    opcode: "proto_lc_get_rank_list_mj_ack"
    ret: number
    type: number
    rankData: proto_RankItem[]
}

export interface proto_cl_get_achieve_award_req {
    opcode: "proto_cl_get_achieve_award_req"
    index: number
}

export interface proto_lc_get_relief_times_ack {
    opcode: "proto_lc_get_relief_times_ack"
    times: number
}

export interface proto_lc_match_begin_not {
    opcode: "proto_lc_match_begin_not"
    matchId: number
    matchType: number
    startTime: number
    gameId: number
    serverId: number
}

export interface proto_bc_match_reach_achiev_noti {
    opcode: "proto_bc_match_reach_achiev_noti"
    plyGuid: number
    matchTypeId: number
    matchId: number
    achievType: number
    achievLevel: number
    achievValue: number
}

export interface proto_LoginAward {
    loginDays: number
    money: number
}

export interface proto_lc_get_user_signin_days_ext_ack {
    opcode: "proto_lc_get_user_signin_days_ext_ack"
    ret: number
    signinInfo: proto_ExtSigninInfo
}

export interface proto_ItemDesc {
    index: number
    desc: string
    fetch: string
}

export interface proto_lc_club_list_change_noti {
    opcode: "proto_lc_club_list_change_noti"
    type: number
    clubUid: number
    clubName: string
}

export interface proto_bc_common_message_not {
    opcode: "proto_bc_common_message_not"
    type: number
    message: string
}

export interface proto_cl_update_extra_relief_status_req {
    opcode: "proto_cl_update_extra_relief_status_req"
    id: number
    status: number
}

export interface proto_lc_use_protocol_proto_ack {
    opcode: "proto_lc_use_protocol_proto_ack"
}

export interface proto_cl_get_private_game_log_req {
    opcode: "proto_cl_get_private_game_log_req"
    page: number
    count: number
}

export interface proto_lc_get_serverdata_by_serverid_ack {
    opcode: "proto_lc_get_serverdata_by_serverid_ack"
    ret: number
    serverData: proto_ServerData2
}

export interface proto_lc_server_data_not2 {
    opcode: "proto_lc_server_data_not2"
    serverDatas: proto_ServerData2[]
}

export interface proto_cl_get_merged_achieve_list_data_req {
    opcode: "proto_cl_get_merged_achieve_list_data_req"
    gameId: number[]
    scmjFlag: number
}

export interface proto_lc_broadcast_message_not {
    opcode: "proto_lc_broadcast_message_not"
    gameId: number
    pn: string
    msg: string
}

export interface proto_cb_force_dismiss_private_table_ack {
    opcode: "proto_cb_force_dismiss_private_table_ack"
    accept: number
}

export interface proto_cb_match_continue_req {
    opcode: "proto_cb_match_continue_req"
}

export interface proto_cl_get_match_sign_num_req {
    opcode: "proto_cl_get_match_sign_num_req"
    matchTypeId: number
}

export interface proto_lc_get_dynamic_award_rank_ack {
    opcode: "proto_lc_get_dynamic_award_rank_ack"
    ret: number
}

export interface proto_bc_match_stage_config_ack {
    opcode: "proto_bc_match_stage_config_ack"
    matchTypeId: number
    matchId: number
    bonusTotal: number
    roundCount: number
    currentRound: number
}

export interface proto_cl_verify_ticket_req {
    opcode: "proto_cl_verify_ticket_req"
    plyGuid: number
    plyNickname: string
    plyTicket: string
    gameId: number
    version: number
    extParam: string
    sex: number
    packetName: string
}

export interface proto_lc_get_season_card_award_ack {
    opcode: "proto_lc_get_season_card_award_ack"
    ret: number
    cardType: number
    awardInfo: proto_SeasonCardAwardInfo[]
}

export interface proto_cl_club_get_club_limit_group_list_req {
    opcode: "proto_cl_club_get_club_limit_group_list_req"
    clubId: number
}

export interface proto_lc_get_card_road_data_ack {
    opcode: "proto_lc_get_card_road_data_ack"
    ret: number
}

export interface proto_lc_match_round_end_notf {
    opcode: "proto_lc_match_round_end_notf"
    matchId: number
    matchOrderId: number
    roundIndex: number
    nextStartTime: number
    matchType: number
}

export interface proto_cb_join_table_req {
    opcode: "proto_cb_join_table_req"
    tableId: number
    password: string
    clubUid: number
}

export interface proto_cl_get_user_signin_award_ext_req {
    opcode: "proto_cl_get_user_signin_award_ext_req"
    day: number
}

export interface proto_lc_get_achieve_ext_list_ack {
    opcode: "proto_lc_get_achieve_ext_list_ack"
    items: proto_AchieveExtData[]
}

export interface proto_cb_give_gift_req {
    opcode: "proto_cb_give_gift_req"
    dstPlyGuid: number
    amount: number
}

export interface proto_cb_get_all_dila_req {
    opcode: "proto_cb_get_all_dila_req"
}

export interface proto_bc_get_hook_status_ack {
    opcode: "proto_bc_get_hook_status_ack"
    ret: number
}

export interface proto_lc_player_signature_ack {
    opcode: "proto_lc_player_signature_ack"
    ret: number
    plyGuid: number
    signature: string
}

export interface proto_lc_update_extra_relief_status_ack {
    opcode: "proto_lc_update_extra_relief_status_ack"
    ret: number
    id: number
    status: number
}

export interface proto_cl_get_continuous_game_award_req {
    opcode: "proto_cl_get_continuous_game_award_req"
}

export interface proto_cl_club_get_room_property_req {
    opcode: "proto_cl_club_get_room_property_req"
    inviteCodes: number[]
}

export interface proto_UID_SCORES {
    uid: number
    scores: number
}

export interface proto_cb_club_create_room_more_game_req {
    opcode: "proto_cb_club_create_room_more_game_req"
    clubUid: number
    gameId: number
    ruleId: number
    createType: number
}

export interface proto_Friendlist {
    plyGuid: number
    frdGuid: number
}

export interface proto_bc_match_stage_award_noti {
    opcode: "proto_bc_match_stage_award_noti"
    matchId: number
    totalScore: number
    bonus: number
    maxBonus: number
    minBonus: number
    playerNum: number
    totoalBonus: number
}

export interface proto_bc_get_luck_draw_ack {
    opcode: "proto_bc_get_luck_draw_ack"
    ret: number
    items: proto_LuckDrawItemData[]
}

export interface proto_cl_get_total_game_round_req {
    opcode: "proto_cl_get_total_game_round_req"
}

export interface proto_lc_trumpet_ack {
    opcode: "proto_lc_trumpet_ack"
    ret: number
    num: number
    msg: string
}

export interface proto_bc_get_match_data_ack {
    opcode: "proto_bc_get_match_data_ack"
    maxGameRounds: number
    matchFee: number
    plySelfRank: number
    scoreRank: proto_MatchRank[]
    openTime: number
    closeTime: number
    matchTip: string
}

export interface proto_cl_get_extra_relief_award_req {
    opcode: "proto_cl_get_extra_relief_award_req"
    id: number
}

export interface proto_cl_valid_identify_info_req {
    opcode: "proto_cl_valid_identify_info_req"
    identifyCard: string
    name: string
}

export interface proto_lc_get_mail_info_ack {
    opcode: "proto_lc_get_mail_info_ack"
    ret: number
    errMsg: string
    mailInfo: proto_MailInfo[]
}

export interface proto_bc_ready_not {
    opcode: "proto_bc_ready_not"
    plyGuid: number
}

export interface proto_bc_login_ack20121227 {
    opcode: "proto_bc_login_ack20121227"
    ret: number
    plyBaseData: proto_PlyBaseData20121227
    plyStatus: proto_PlayerStatus20121227
}

export interface proto_ClubInfo {
    clubUid: number
    clubName: string
    usedRoomCardNum: number
    limitRoomCardNum: number
}

export interface proto_AchieveData2 {
    index: number
    value: number
    max: number
    status: number
    moneyAward: number
    giftAward: number
    prop_1Award: number
    prop_2Award: number
    prop_3Award: number
    prop_4Award: number
    prop_5Award: number
    name: string
    desc: string
}

export interface proto_lc_send_friend_msg_ack {
    opcode: "proto_lc_send_friend_msg_ack"
    ret: number
    content: proto_FriendMsg[]
}

export interface proto_bc_match_add_score_ack {
    opcode: "proto_bc_match_add_score_ack"
    ret: number
    curScore: number
    curAddTimes: number
    maxAddTimes: number
}

export interface proto_PrivateLogData {
    gameId: number
    serverId: number
    time: number
    param_1: string
}

export interface proto_lc_get_miniGame_by_id_ack {
    opcode: "proto_lc_get_miniGame_by_id_ack"
    result: number
    serverDatas: proto_ServerData2[]
}

export interface proto_bc_round_award_items_not {
    opcode: "proto_bc_round_award_items_not"
    round: number
    items: proto_RoundAwardItem[]
}

export interface proto_cb_get_match_data_req {
    opcode: "proto_cb_get_match_data_req"
}

export interface proto_lc_get_zzyk_status_ack {
    opcode: "proto_lc_get_zzyk_status_ack"
    remainingDays: number
    ret: number
    money: number
    flag: number
}

export interface proto_lc_item_config_not {
    opcode: "proto_lc_item_config_not"
    itemList: number[]
    itemDescs: proto_ItemDesc[]
}

export interface proto_lc_match_require_info_ack {
    opcode: "proto_lc_match_require_info_ack"
    ret: number
    data: proto_MatchInfoNet
}

export interface proto_cl_dismiss_club_table_req {
    opcode: "proto_cl_dismiss_club_table_req"
    clubId: number
    serverId: number
    tableId: number
}

export interface proto_lc_set_user_signin_days_ack {
    opcode: "proto_lc_set_user_signin_days_ack"
    ret: number
    day: number
    totalday: number
    money: number
}

export interface proto_RoundAward {
    roundAward: proto_RoundAwardItem[]
}

export interface proto_cb_leave_table_req {
    opcode: "proto_cb_leave_table_req"
}

export interface proto_cl_get_game_config_req {
    opcode: "proto_cl_get_game_config_req"
}

export interface proto_ExtSigninAward2 {
    today: number
    signinAward: proto_ExtSigninAward[]
}

export interface proto_lc_match_perpare_notf {
    opcode: "proto_lc_match_perpare_notf"
    matchId: number
    matchOrderId: number
    currentScore: number
    roundIndex: number
    totoalRound: number
    matchType: number
    param: string
    data: proto_ServerData2
}

export interface proto_lc_get_game_config_ack {
    opcode: "proto_lc_get_game_config_ack"
    gameItems: proto_GameConfig[]
}

export interface proto_cl_get_player_level_req {
    opcode: "proto_cl_get_player_level_req"
}

export interface proto_lc_wawaji_list_refresh_not {
    opcode: "proto_lc_wawaji_list_refresh_not"
}

export interface proto_cb_get_daily_task_award_req {
    opcode: "proto_cb_get_daily_task_award_req"
    index: number
}

export interface proto_lc_get_merged_achieve_award_ack {
    opcode: "proto_lc_get_merged_achieve_award_ack"
    ret: number
    money: number
    gift: number
    award_0: number
    award_1: number
    award_2: number
    award_3: number
    award_4: number
}

export interface proto_cb_login_req {
    opcode: "proto_cb_login_req"
    plyGuid: number
    plyTicket: string
    version: number
    extParam: string
    mainGameId: number
    gameGroup: number
}

export interface proto_cl_dynamic_sign_get_match_sign_num_req {
    opcode: "proto_cl_dynamic_sign_get_match_sign_num_req"
    matchTypeId: number
}

export interface proto_cl_get_serverdata_by_serverid_req {
    opcode: "proto_cl_get_serverdata_by_serverid_req"
    gameId: number
    serverId: number
}

export interface proto_cl_match_require_status_req {
    opcode: "proto_cl_match_require_status_req"
    matchId: number
    matchOrderId: number
    roundIndex: number
}

export interface proto_cl_get_private_room_rebate_award_req {
    opcode: "proto_cl_get_private_room_rebate_award_req"
    gameId: number
    inviteCode: number
    type: number
}

export interface proto_lc_get_rank_list_ack {
    opcode: "proto_lc_get_rank_list_ack"
    rankList: proto_RankItem[]
    type: number
}

export interface proto_bc_dismiss_club_table_noti {
    opcode: "proto_bc_dismiss_club_table_noti"
    plyGuid: number
    clubId: number
    inviteCode: number
    msg: string
    plyNickname: string
}

export interface proto_cb_use_protocol_proto_req {
    opcode: "proto_cb_use_protocol_proto_req"
}

export interface proto_cb_dismiss_private_table_req {
    opcode: "proto_cb_dismiss_private_table_req"
}

export interface proto_bc_apply_match_ack {
    opcode: "proto_bc_apply_match_ack"
    ret: number
    initScore: number
}

export interface proto_PROP_ITEM_DATA {
    index: number
    num: number
}

export interface proto_cl_get_user_signin_award_req {
    opcode: "proto_cl_get_user_signin_award_req"
    day: number
}

export interface proto_bc_item_update_not {
    opcode: "proto_bc_item_update_not"
    index: number
    num: number
}

export interface proto_cl_get_achieve_list_req {
    opcode: "proto_cl_get_achieve_list_req"
}

export interface proto_lc_get_server_status_not {
    opcode: "proto_lc_get_server_status_not"
    serverStatus: proto_ServerStatus[]
}

export interface proto_ROOM_LIMIT_INFO {
    mainGameId: number
    serverType: number
    startDate: number
    endDate: number
    startTime: number
    endTime: number
    limitNum: number
}

export interface proto_lc_get_friend_list_ack20121227 {
    opcode: "proto_lc_get_friend_list_ack20121227"
    friends: proto_FriendData20121227[]
}

export interface proto_cl_get_user_good_card_req {
    opcode: "proto_cl_get_user_good_card_req"
    num: number
}

export interface proto_bc_login_ack {
    opcode: "proto_bc_login_ack"
    ret: number
    plyBaseData: proto_PlyBaseData
    plyStatus: proto_PlayerStatus
    errorMsg: string
}

export interface proto_bc_get_task_award_ack {
    opcode: "proto_bc_get_task_award_ack"
    ret: number
    taskType: number
    lastTaskIndex: number
    curVal: number
    configRound: number
    luckDrawTimes: number
}

export interface proto_cl_get_private_game_replay_req {
    opcode: "proto_cl_get_private_game_replay_req"
    inviteCode: number
    createTime: number
    lastEndTime: number
}

export interface proto_bc_get_mahjong_quick_daily_task_data_ack {
    opcode: "proto_bc_get_mahjong_quick_daily_task_data_ack"
    items: proto_MergedAchieveData[]
}

export interface proto_cl_match_reborn_req {
    opcode: "proto_cl_match_reborn_req"
    plyGuid: number
    matchId: number
    matchOrderId: number
    roundIndex: number
}

export interface proto_FriendData {
    plyGuid: number
    plyNickname: string
    plyMoney: number
    plyVipLev: number
    plyUnreadMsgNum: number
    plyType: number
}

export interface proto_lc_continuous_landing_get_reward_ack {
    opcode: "proto_lc_continuous_landing_get_reward_ack"
    ret: number
    index: number
    value: number
}

export interface proto_cl_get_assist_info_data_req {
    opcode: "proto_cl_get_assist_info_data_req"
    gameId: number
}

export interface proto_ItemData {
    index: number
    num: number
    gameId: number
    param_1: number
    param_2: number
    name: string
    url: string
}

export interface proto_cl_op_friend_req {
    opcode: "proto_cl_op_friend_req"
    opcode: number
    plyGuid: number
}

export interface proto_Cluc_Rule_Info {
    clubId: number
    gameId: number
    ruleId: number
    rule: string
    ruleName: string
}

export interface proto_cl_player_signature_req {
    opcode: "proto_cl_player_signature_req"
    flag: number
    plyGuid: number
    signature: string
}

export interface proto_cb_get_table_list_req2 {
    opcode: "proto_cb_get_table_list_req2"
}

export interface proto_bc_chat_ack {
    opcode: "proto_bc_chat_ack"
    ret: number
    num: number
    msg: string
}

export interface proto_cl_set_ply_city_data_req {
    opcode: "proto_cl_set_ply_city_data_req"
    nProv: number
    nCity: number
    nCounty: number
}

export interface proto_cb_get_rank_list_req {
    opcode: "proto_cb_get_rank_list_req"
    type: number
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

export interface proto_cl_get_dynamic_award_rank_req {
    opcode: "proto_cl_get_dynamic_award_rank_req"
    matchId: number
}

export interface proto_cl_get_private_game_statistics_req {
    opcode: "proto_cl_get_private_game_statistics_req"
    time: number
}

export interface proto_cl_check_relief_status_req {
    opcode: "proto_cl_check_relief_status_req"
    type: number
}

export interface proto_lc_trumpet_not {
    opcode: "proto_lc_trumpet_not"
    plyGuid: number
    plyNickname: string
    message: string
    gameId: number
    gameName: string
    vipLevel: number
    userLevel: number
}

export interface proto_lc_get_user_signin_award_info_ack {
    opcode: "proto_lc_get_user_signin_award_info_ack"
    ret: number
    signinAward: proto_SigninAward2
}

export interface proto_cl_get_ply_status_req {
    opcode: "proto_cl_get_ply_status_req"
    players: number[]
}

export interface proto_lc_get_private_room_data_ack {
    opcode: "proto_lc_get_private_room_data_ack"
    ret: number
    curTime: number
    status: number
    inviteInfo: proto_PrivateInviteRoomData[]
}

export interface proto_SigninAward2 {
    today: number
    signinAward: proto_SigninAward[]
}

export interface proto_Dynamic_Award {
    level: number
    playerNum: number
    awardIndex: number
    awardNum: number
}

export interface proto_cl_get_ply_city_data_req {
    opcode: "proto_cl_get_ply_city_data_req"
    plyGuid: number
}

export interface proto_lc_get_position_info_ack {
    opcode: "proto_lc_get_position_info_ack"
    plyGuid: number
    dstGuid: number
    latitude: number
    longitude: number
}

export interface proto_lc_club_create_table_ack {
    opcode: "proto_lc_club_create_table_ack"
    ret: number
    serverId: number
    tableId: number
}

export interface proto_cl_get_ply_current_rank_req {
    opcode: "proto_cl_get_ply_current_rank_req"
    matchId: number
    matchOrderId: number
}

export interface proto_cb_match_survival_config_req {
    opcode: "proto_cb_match_survival_config_req"
}

export interface proto_bc_rematch_notf {
    opcode: "proto_bc_rematch_notf"
    matchId: number
    matchOrderId: number
    param: string
    currentScore: number
    roundIndex: number
    totoalRound: number
}

export interface proto_cl_get_safe_data_req {
    opcode: "proto_cl_get_safe_data_req"
    plyGuid: number
}

export interface proto_cl_get_merged_achieve_award_req {
    opcode: "proto_cl_get_merged_achieve_award_req"
    gameId: number
    index: number
}

export interface proto_MatchInfo {
    gameId: number
    serverId: number
    matchTypeId: number
    matchId: number
    startTime: number
    signTime: number
    signIndex: number
    signCost: number
    awardId: number
    matchStatus: number
    minPlayerNum: number
    startType: number
    expirationTime: number
    intervalTime: number
    matchRule: number
    achievId: number
    dynamicMatchSignTime: number
    dynamicAddScoreNum: number
    matchIsNeedRobot: number
    matchFlag: number
}

export interface proto_cb_get_luck_draw_record_req {
    opcode: "proto_cb_get_luck_draw_record_req"
}

export interface proto_lc_get_user_accumulate_signin_award_ack {
    opcode: "proto_lc_get_user_accumulate_signin_award_ack"
    ret: number
    continupusDays: number
    accumulateDays: number
}

export interface proto_cl_club_rule_change_noti {
    opcode: "proto_cl_club_rule_change_noti"
    clubId: number
}

export interface proto_bc_below_admission_limit_tip_not {
    opcode: "proto_bc_below_admission_limit_tip_not"
    type: number
    money: number
    message: string
}

export interface proto_bc_cli_timer_not {
    opcode: "proto_bc_cli_timer_not"
    plyGuid: number
    idleTime: number
}

export interface proto_lc_server_data_not {
    opcode: "proto_lc_server_data_not"
    serverDatas: proto_ServerData[]
}

export interface proto_cl_load_club_table_rule_req {
    opcode: "proto_cl_load_club_table_rule_req"
    clubId: number
    gameId: number
    ruleId: number
    typeId: number
}

export interface proto_bc_change_dila_ack {
    opcode: "proto_bc_change_dila_ack"
    ret: number
    data: proto_DilaData
}

export interface proto_cl_get_unread_msg_req {
    opcode: "proto_cl_get_unread_msg_req"
    sndGuid: number
    timestamp: number
}

export interface proto_cb_change_dila_req {
    opcode: "proto_cb_change_dila_req"
    dilaId: number
}

export interface proto_lc_login_online_data_not {
    opcode: "proto_lc_login_online_data_not"
    plyGuid: number
    seconds: number
    isBinding: number
    isModal: number
    message: string
}

export interface proto_lc_modify_password_safe_ack {
    opcode: "proto_lc_modify_password_safe_ack"
    ret: number
    plyGuid: number
}

export interface proto_bc_cur_table_round_notf {
    opcode: "proto_bc_cur_table_round_notf"
    curTableRound: number
    totoalTableRound: number
    param1: number
    param2: number
    paramStr: string
}

export interface proto_lc_get_turntable_login_award_config_ack {
    opcode: "proto_lc_get_turntable_login_award_config_ack"
    ret: number
    allItems: proto_ItemData[]
    resultIndex: number
}

export interface proto_lc_op_friend_ack {
    opcode: "proto_lc_op_friend_ack"
    ret: number
    opcode: number
    plyGuid: number
}

export interface proto_cl_get_zzyk_status_req {
    opcode: "proto_cl_get_zzyk_status_req"
    flag: number
}

export interface proto_lc_integal_condition_noti {
    opcode: "proto_lc_integal_condition_noti"
    type: number
    ruleId: number
    ruleIdAndroid: number
    ruleDesc: string
}

export interface proto_cb_match_stage_config_req {
    opcode: "proto_cb_match_stage_config_req"
    matchTypeId: number
}

export interface proto_cl_get_mail_info_req {
    opcode: "proto_cl_get_mail_info_req"
    plyId: number
    gameId: number
}

export interface proto_lc_get_win_round_score_ack {
    opcode: "proto_lc_get_win_round_score_ack"
    ret: number
    plyGuid: number
    num: number
    score: number
    maxNum: number
    maxScore: number
}

export interface proto_lc_get_server_status_ack {
    opcode: "proto_lc_get_server_status_ack"
    ret: number
    serverStatus: proto_ServerData2[]
}

export interface proto_ClubGroupMsg {
    clubId: number
    groupList: proto_ClubGroupMemMsg[]
}

export interface proto_lc_update_achieve_award_not {
    opcode: "proto_lc_update_achieve_award_not"
    index: number
    name: string
    desc: string
}

export interface proto_lc_match_unfinished_notf {
    opcode: "proto_lc_match_unfinished_notf"
    data: proto_MatchInfoNet
}

export interface proto_bc_get_mahjong_quick_daily_task_award_ack {
    opcode: "proto_bc_get_mahjong_quick_daily_task_award_ack"
    ret: number
    money: number
    gift: number
    award_0: number
    award_1: number
    award_2: number
    award_3: number
    award_4: number
}

export interface proto_lc_match_lost_notf {
    opcode: "proto_lc_match_lost_notf"
    plyGuid: number
    canRelive: number
    reliveCount: number
    matchId: number
    matchOrderId: number
    roundIndex: number
    totoalRound: number
    matchType: number
    data: proto_MatchPlayerData
}

export interface proto_cl_club_get_room_list_by_rule_req {
    opcode: "proto_cl_club_get_room_list_by_rule_req"
    clubId: number
    ruleId: number
}

export interface proto_RoundAwardData {
    taskType: number
    taskIndex: number
    awardRound: number
    awardName: string
    items: proto_ItemAwardData[]
}

export interface proto_bc_give_gift_ack {
    opcode: "proto_bc_give_gift_ack"
    ret: number
    balance: number
}

export interface proto_ServerStatus {
    serverId: number
    onlineNum: number
}

export interface proto_cl_web_socket_shake_hand_req {
    opcode: "proto_cl_web_socket_shake_hand_req"
    webSocketKey: string
}

export interface proto_cl_get_season_card_status_req {
    opcode: "proto_cl_get_season_card_status_req"
    cardType: number
}

export interface proto_cl_get_friend_list_req {
    opcode: "proto_cl_get_friend_list_req"
}

export interface proto_lc_get_merged_achieve_list_data_ack {
    opcode: "proto_lc_get_merged_achieve_list_data_ack"
    items: proto_MergedAchieveData[]
}

export interface proto_PlyBaseData20121227 {
    plyGuid: number
    nickname: string
    gift: number
    money: number
    score: number
    won: number
    lost: number
    dogfall: number
    tableId: number
    chairId: number
    ready: number
}

export interface proto_cl_update_player_marriage_req {
    opcode: "proto_cl_update_player_marriage_req"
    plyGuid: number
    age: number
    city: number
    degree: number
    gender: number
    height: number
    housing: number
    haveChildren: number
    marriage: number
}

export interface proto_ServerData2 {
    gameId: number
    serverId: number
    serverName: string
    serverKey: string
    serverAddr: string
    serverPort: number
    baseBet: number
    minMoney: number
    onlinePlayerNum: number
    channelId: number
    extParam: string
}

export interface proto_lc_get_user_level_desc_ack {
    opcode: "proto_lc_get_user_level_desc_ack"
    ret: number
    levelDesc: proto_UserLevelDesc[]
}

export interface proto_cl_get_position_info_req {
    opcode: "proto_cl_get_position_info_req"
    dstGuid: number
}

export interface proto_bc_match_rank_not {
    opcode: "proto_bc_match_rank_not"
    rank: number
    status: number
    matchStatus: number
    curScore: number
    playerNum: number
    tableNum: number
    signNum: number
    finalNum: number
    finalCurRound: number
    finalAllRound: number
    weedoutReason: number
}

export interface proto_PlayerStatus20121227 {
    plyGuid: number
    plyNickname: string
    plyStatus: number
    gameId: number
    gameServerId: number
    tableId: number
    money: number
    won: number
    lost: number
    moneyRank: number
    wonRank: number
    latitude: number
    longitude: number
}

export interface proto_lc_load_dwc_room_info_ack {
    opcode: "proto_lc_load_dwc_room_info_ack"
    ackInfo: proto_DwcRoomInfo[]
}

export interface proto_PrivateCardCostData {
    gameId: number
    serverId: number
    minute: number
    num: number
    autoScore: number
    roomCardIndex: number
}

export interface proto_cl_load_dwc_room_info_req {
    opcode: "proto_cl_load_dwc_room_info_req"
    autoId: number
    gameId: number
    isFull: number
}

export interface proto_cl_set_password_safe_req {
    opcode: "proto_cl_set_password_safe_req"
    plyGuid: number
    password: string
    mobile: string
}

export interface proto_lc_server_status_not {
    opcode: "proto_lc_server_status_not"
    serverStatus: proto_ServerStatus[]
}

export interface proto_lc_rp_check_relief_status_ack {
    opcode: "proto_lc_rp_check_relief_status_ack"
    ret: number
    roomType: number
    curReliefTimes: number
    reliefIndex: number
    reliefAward: number
    reliefTimesMax: number
}

export interface proto_ItemData20121227 {
    index: number
    num: number
}

export interface proto_cl_friend_approve_ack {
    opcode: "proto_cl_friend_approve_ack"
    ret: number
    sndPlyGuid: number
    message: string
}

export interface proto_bc_get_online_award_items_ack {
    opcode: "proto_bc_get_online_award_items_ack"
    ret: number
    items: proto_OnlineAwardItems[]
}

export interface proto_lc_get_friend_list_ack {
    opcode: "proto_lc_get_friend_list_ack"
    friends: proto_FriendData[]
}

export interface proto_lc_web_socket_shake_hand_ack {
    opcode: "proto_lc_web_socket_shake_hand_ack"
    webSocketKey: string
}

export interface proto_ContinuousSigninAward {
    days: number
    awardStrings: string
}

export interface proto_lc_room_limit_refresh_not {
    opcode: "proto_lc_room_limit_refresh_not"
    mainGameId: number
}

export interface proto_bc_recharge_tip_not {
    opcode: "proto_bc_recharge_tip_not"
    type: number
    money: number
    message: string
}

export interface proto_lc_get_user_signin_award_ack {
    opcode: "proto_lc_get_user_signin_award_ack"
    ret: number
    day: number
}

export interface proto_lc_spec_trumpet_not {
    opcode: "proto_lc_spec_trumpet_not"
    gameId: number
    plyGuid: number
    plyNickname: string
    message: string
    image: string
}

export interface proto_cb_get_table_list_req {
    opcode: "proto_cb_get_table_list_req"
}

export interface proto_cl_get_relief_req {
    opcode: "proto_cl_get_relief_req"
    type: number
}

export interface proto_lc_get_ply_status_ack {
    opcode: "proto_lc_get_ply_status_ack"
    players: proto_PlayerStatus[]
}

export interface proto_cb_get_task_award_req {
    opcode: "proto_cb_get_task_award_req"
    type: number
    taskType: number
    lastTaskIndex: number
}

export interface proto_lc_get_extra_relief_list_ack {
    opcode: "proto_lc_get_extra_relief_list_ack"
    extraReliefs: proto_ExtraRelief[]
}

export interface proto_PlySvrStatus {
    plyGuid: number
    plyNickname: string
    plyStatus: number
    sex: number
    gameId: number
    loginServerId: number
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

export interface proto_cl_sign_match_req {
    opcode: "proto_cl_sign_match_req"
    matchType: number
    signIndex: number
    signType: number
}

export interface proto_MatchTransferData {
    plyGuid: number
    matchId: number
    matchStatus: number
    mainGameId: number
    version: number
    isPreRelivePlayer: number
    reliveTime: number
    reliveItemNum: number
}

export interface proto_lc_club_get_member_list_ack {
    opcode: "proto_lc_club_get_member_list_ack"
    clubUid: number
    members: proto_ClubMemberInfo[]
}

export interface proto_cb_give_back_win_money_req {
    opcode: "proto_cb_give_back_win_money_req"
    srcGuid: number
    dstGuid: number
    moneyAmount: number
}

export interface proto_PlyDataItem {
    reason: number
    index: number
    variant: number
}

export interface proto_bc_match_table_by_marriage_ack {
    opcode: "proto_bc_match_table_by_marriage_ack"
    ret: number
}

export interface proto_br_need_send_robot_not {
    opcode: "proto_br_need_send_robot_not"
    tableId: number
    needGender: number
}

export interface proto_bc_use_spec_props_not {
    opcode: "proto_bc_use_spec_props_not"
    srcPlyGuid: number
    dstPlyGuid: number
    index: number
    amount: number
}

export interface proto_bc_kickout_ack {
    opcode: "proto_bc_kickout_ack"
    ret: number
    dstPlyGuid: number
    itemNum: number
}

export interface proto_robot_info {
    onlineRobot: number
    ingameRobot: number
    robotInQueue: number
    lastMatchZeit: number
}

export interface proto_UserLevelDesc {
    level: number
    desc: string
    colorId: number
}

export interface proto_bc_send_prop_ack {
    opcode: "proto_bc_send_prop_ack"
    ret: number
    dstPlyGuid: number
    index: number
    itemNum: number
}

export interface proto_bc_get_luck_draw_data_list_ack {
    opcode: "proto_bc_get_luck_draw_data_list_ack"
    ret: number
    items: proto_LuckDrawItemData[]
}

export interface proto_bc_give_back_win_money_ack {
    opcode: "proto_bc_give_back_win_money_ack"
    ret: number
    frdNickname: string
    moneyAmount: number
}

export interface proto_lc_get_player_level_ack {
    opcode: "proto_lc_get_player_level_ack"
    ret: number
    level: number
    exp: number
    nextExp: number
}

export interface proto_cl_quit_sign_match_req {
    opcode: "proto_cl_quit_sign_match_req"
    matchId: number
}

export interface proto_bc_get_table_list_ack {
    opcode: "proto_bc_get_table_list_ack"
    items: proto_TableItemAttr[]
}

export interface proto_cb_chat_req {
    opcode: "proto_cb_chat_req"
    type: number
    message: string
}

export interface proto_lc_match_result_notf {
    opcode: "proto_lc_match_result_notf"
    matchId: number
    matchName: string
    rankIndex: number
    matchType: number
    plyVec: proto_MatchPlayerRank[]
}

export interface proto_lc_user_data_broadcast_msg_not {
    opcode: "proto_lc_user_data_broadcast_msg_not"
    plyGuid: number
    message: string
}

export interface proto_AchieveData {
    index: number
    value: number
    max: number
    status: number
    moneyAward: number
    giftAward: number
    name: string
    desc: string
}

export interface proto_SeasonCardAwardInfo {
    awardIndex: number
    awardNum: number
}

export interface proto_bc_join_table_ack {
    opcode: "proto_bc_join_table_ack"
    ret: number
    tableAttrs: proto_TableAttr
    errMsg: string
}

export interface proto_bc_get_finished_newbie_award_ack {
    opcode: "proto_bc_get_finished_newbie_award_ack"
    ret: number
    status: number
    index: number
    num: number
}

export interface proto_ExtSigninAward {
    days: number
    name: string
    awards: proto_ItemData[]
    state: number
}

export interface proto_PrivateInvite {
    gameId: number
    serverId: number
    tableId: number
    baseScore: number
    inviteCode: number
    createTime: number
    tableTime: number
    flag: number
    ownerGuid: number
    roomName: string
    gameRule: number
    gameRuleGroup: number[]
    gameJson: string
    startGameTime: number
    leftTime: number
}

export interface proto_lc_update_extra_login_award_not {
    opcode: "proto_lc_update_extra_login_award_not"
    items: proto_ExtraLoginAward[]
    msg: string
}

export interface proto_cl_get_user_level_desc_req {
    opcode: "proto_cl_get_user_level_desc_req"
}

export interface proto_PrivateReplaySelf {
    plyGuid: number
    nickName: string
    winLose: number
}

export interface proto_cb_get_private_invite_req {
    opcode: "proto_cb_get_private_invite_req"
}

export interface proto_lc_club_updata_limit_group_list_ack {
    opcode: "proto_lc_club_updata_limit_group_list_ack"
    ret: number
    type: number
}

export interface proto_lc_match_round_avoid_notf {
    opcode: "proto_lc_match_round_avoid_notf"
    plyGuid: number
    matchId: number
    matchOrderId: number
    roundIndex: number
    totoalRound: number
}

export interface proto_lc_club_get_room_list_by_rule_ack {
    opcode: "proto_lc_club_get_room_list_by_rule_ack"
    clubId: number
    ruleId: number
    tableInfos: proto_ClubTableInfoV2[]
}

export interface proto_ATAchieveData {
    gameId: number
    type: number
    index: number
    cond: number
    value: number
    max: number
    status: number
    merge: number
    vecAwards: proto_ATAchieveAward[]
    name: string
    desc: string
}

export interface proto_lc_sync_item_data_notf {
    opcode: "proto_lc_sync_item_data_notf"
    itemIndex: number
    itemNum: number
}

export interface proto_lc_get_private_invite_info_ack {
    opcode: "proto_lc_get_private_invite_info_ack"
    ret: number
    privateInvite: proto_PrivateInvite
}

export interface proto_cb_get_win_round_score_req {
    opcode: "proto_cb_get_win_round_score_req"
    plyGuid: number
}

export interface proto_ExtSigninInfo {
    signinDays: number[]
    buqianka: number
    signinAwardTable: proto_ExtSigninAward2
}

export interface proto_MatchInfoNet {
    matchId: number
    matchOrderId: number
    matchType: number
    matchGameId: number
    matchBeginTime: number
    matchEndTime: number
    matchStatus: number
    matchAwardId: number
    matchMinNumber: number
    matchMaxNumber: number
    matchSignCost: number
    matchRoundCount: number
    matchVipLimit: number
    matchCurrentRound: number
    matchRoundStatus: number
    matchRoundStartTime: number
    matchStartType: number
    matchTicketLimit: number
    matchVipFreeLimit: number
    matchSignTime: number
    data: proto_ServerData2
}

export interface proto_lc_club_change_setting_ack {
    opcode: "proto_lc_club_change_setting_ack"
    clubUid: number
    ret: number
    hasAutoCreateRoom: number
}

export interface proto_DwcRoomInfo {
    autoId: number
    jsonContent: string
}

export interface proto_cl_get_user_signin_days_req {
    opcode: "proto_cl_get_user_signin_days_req"
}

export interface proto_TableAttr {
    tableId: number
    name: string
    lock: number
    players: proto_PlyBaseData[]
}

export interface proto_lc_get_private_room_rebate_award_ack {
    opcode: "proto_lc_get_private_room_rebate_award_ack"
    ret: number
    rebate: number
    type: number
}

export interface proto_PlySvrStatus20121227 {
    plyGuid: number
    plyNickname: string
    plyStatus: number
    gameId: number
    loginServerId: number
    gameServerId: number
    tableId: number
    money: number
    won: number
    lost: number
    moneyRank: number
    wonRank: number
    latitude: number
    longitude: number
}

export interface proto_bc_give_gift_not {
    opcode: "proto_bc_give_gift_not"
    srcPlyGuid: number
    dstPlyGuid: number
    amount: number
}

export interface proto_cl_get_user_signin_days_ext_req {
    opcode: "proto_cl_get_user_signin_days_ext_req"
}

export interface proto_lc_get_ply_current_rank_ack {
    opcode: "proto_lc_get_ply_current_rank_ack"
    ret: number
    plyGuid: number
    rank: number
}

export interface proto_lc_set_club_create_table_rule_ack {
    opcode: "proto_lc_set_club_create_table_rule_ack"
    ret: number
    clubId: number
    ruleId: number
}

export interface proto_lc_club_invite_to_game_noti {
    opcode: "proto_lc_club_invite_to_game_noti"
    clubUid: number
    clubName: string
    fromPlyGuid: number
    plyNickname: string
    inviteCode: number
}

export interface proto_lc_private_card_index_not {
    opcode: "proto_lc_private_card_index_not"
    privateCardIndex: number
    privateCardPrice: number
}

export interface proto_bc_get_table_list_ack2 {
    opcode: "proto_bc_get_table_list_ack2"
    items: proto_TableItemAttr2[]
}

export interface proto_lc_club_get_club_limit_group_list_ack {
    opcode: "proto_lc_club_get_club_limit_group_list_ack"
    ret: number
    clubId: number
    groupList: proto_ClubGroupMemMsg[]
}

export interface proto_bc_get_daily_task_award_not {
    opcode: "proto_bc_get_daily_task_award_not"
    index: number
    name: string
    desc: string
}

export interface proto_cl_remove_safe_amount_req {
    opcode: "proto_cl_remove_safe_amount_req"
    plyGuid: number
    amount: number
    password: string
}

export interface proto_ClubMemberInfo {
    plyGuid: number
    nickname: string
    plyState: number
}

export interface proto_cl_club_get_limit_group_list_req {
    opcode: "proto_cl_club_get_limit_group_list_req"
}

export interface proto_lc_check_relief_status_ack {
    opcode: "proto_lc_check_relief_status_ack"
    ret: number
    currentRelief: number
    reliefTimeLeft: number
    reliefAwardCount: number
    reliefCd: number
    currentRelief_2: number
    reliefTimesMax: number
}

export interface proto_ExtraLoginAward {
    type: number
    status: number
}

export interface proto_cl_get_user_accumulate_signin_days_req {
    opcode: "proto_cl_get_user_accumulate_signin_days_req"
}

export interface proto_bc_get_online_award_ack {
    opcode: "proto_bc_get_online_award_ack"
    ret: number
    remain: number
    money: number
}

export interface proto_lc_get_continuous_game_award_ack {
    opcode: "proto_lc_get_continuous_game_award_ack"
    ret: number
    money: number
}

export interface proto_bc_update_feel_value_not {
    opcode: "proto_bc_update_feel_value_not"
    frdUid: number
    frdNickname: string
    feelValue: number
}

export interface proto_cb_get_relief_req {
    opcode: "proto_cb_get_relief_req"
}

export interface proto_lc_get_private_room_log_data_ack {
    opcode: "proto_lc_get_private_room_log_data_ack"
    ret: number
    logData: proto_PrivateLogData[]
}

export interface proto_ServerData {
    gameId: number
    serverId: number
    serverName: string
    serverKey: string
    serverAddr: string
    serverPort: number
    baseBet: number
    minMoney: number
    onlinePlayerNum: number
}

export interface proto_lc_get_achieve_list_ack {
    opcode: "proto_lc_get_achieve_list_ack"
    items: proto_AchieveData[]
}

export interface proto_bc_update_ply_data_not {
    opcode: "proto_bc_update_ply_data_not"
    plyGuid: number
    uptReason: number
    uptType: number
    variant: number
    amount: number
}

export interface proto_lc_get_turntable_login_award_ack {
    opcode: "proto_lc_get_turntable_login_award_ack"
    ret: number
    awardItems: proto_ItemData[]
}

export interface proto_bc_award_type_not {
    opcode: "proto_bc_award_type_not"
    type: number[]
}

export interface proto_cl_get_match_rank_req {
    opcode: "proto_cl_get_match_rank_req"
    matchId: number
    matchOrderId: number
    roundIndex: number
}

export interface proto_lc_get_player_game_list_ack {
    opcode: "proto_lc_get_player_game_list_ack"
    ret: number
    serverStatus: proto_ServerData2[]
}

export interface proto_SigninInfo {
    signinDays: number[]
    buqianka: number
    signinAward: proto_SigninAward2
}

export interface proto_lc_sign_match_ack {
    opcode: "proto_lc_sign_match_ack"
    ret: number
    matchId: number
}

export interface proto_bc_game_get_score_noti {
    opcode: "proto_bc_game_get_score_noti"
    rankScore: number
}

export interface proto_lc_get_season_card_status_ack {
    opcode: "proto_lc_get_season_card_status_ack"
    ret: number
    startDate: number
    endDate: number
    cardType: number
}

export interface proto_bc_create_table_ack20121227 {
    opcode: "proto_bc_create_table_ack20121227"
    ret: number
    tableAttrs: proto_TableAttr20121227
}

export interface proto_lc_get_match_sign_num_ack {
    opcode: "proto_lc_get_match_sign_num_ack"
    matchTypeId: number
    matchId: number
    playerNum: number
    signNum: number
    nextMatchBeginTime: number
    signStatus: number
}

export interface proto_lc_get_three_draw_data_ack {
    opcode: "proto_lc_get_three_draw_data_ack"
    ret: number
    times: number
}

export interface proto_cb_player_join_match_req {
    opcode: "proto_cb_player_join_match_req"
    matchId: number
    matchOrderId: number
}

export interface proto_lc_sys_feel_not {
    opcode: "proto_lc_sys_feel_not"
    sendGuid: number
}

export interface proto_CLUB_MEMBER_CHANGE {
    type: number
    clubUid: number
    plyGuid: number
    nickname: string
    mainGameId: number
    clubName: string
}

export interface proto_bc_get_win_round_score_ack {
    opcode: "proto_bc_get_win_round_score_ack"
    ret: number
    plyGuid: number
    num: number
    score: number
    maxNum: number
    maxScore: number
}

export interface proto_lc_do_sign_match_ack {
    opcode: "proto_lc_do_sign_match_ack"
    ret: number
    matchId: number
    operateType: number
}

export interface proto_lc_get_achieve_award_ack {
    opcode: "proto_lc_get_achieve_award_ack"
    ret: number
    money: number
    gift: number
}

export interface proto_cl_get_fetion_rank_list_req {
    opcode: "proto_cl_get_fetion_rank_list_req"
}

export interface proto_bc_get_spec_props_list_ack {
    opcode: "proto_bc_get_spec_props_list_ack"
    ret: number
    props: proto_SpecProps[]
}

export interface proto_bc_get_relief_ack {
    opcode: "proto_bc_get_relief_ack"
    ret: number
}

export interface proto_lc_club_get_limit_group_list_ack {
    opcode: "proto_lc_club_get_limit_group_list_ack"
    ret: number
    clubGroupList: proto_ClubGroupMsg[]
}

export interface proto_cl_get_server_status_req {
    opcode: "proto_cl_get_server_status_req"
    gameId: number
}

export interface proto_cl_get_achieve_ext_award_req {
    opcode: "proto_cl_get_achieve_ext_award_req"
    index: number
}

export interface proto_ServerData2Ext {
    gameId: number
    serverId: number
    serverName: string
    serverKey: string
    serverAddr: string
    serverPort: number
    baseBet: number
    minMoney: number
    onlinePlayerNum: number
    channelId: number
    extParam: string
    serverType: number
}

export interface proto_lc_get_ply_city_data_ack {
    opcode: "proto_lc_get_ply_city_data_ack"
    plyGuid: number
    nProv: number
    nCity: number
    nCounty: number
}

export interface proto_cb_use_spec_props_req {
    opcode: "proto_cb_use_spec_props_req"
    dstPlyGuid: number
    index: number
    amount: number
}

export interface proto_lc_get_rp_relief_ack {
    opcode: "proto_lc_get_rp_relief_ack"
    ret: number
}

export interface proto_cl_club_change_setting_req {
    opcode: "proto_cl_club_change_setting_req"
    clubUid: number
    hasAutoCreateRoom: number
}

export interface proto_PrivateReplay {
    index: number
    inviteCode: number
    createTime: number
    endTime: number
    plyDatas: proto_PrivateReplaySelf[]
}

export interface proto_LoginAward2 {
    today: number
    loginAward: proto_LoginAward[]
}

export interface proto_cb_get_spec_props_list_req {
    opcode: "proto_cb_get_spec_props_list_req"
}

export interface proto_lc_get_all_frd_feel_value_ack {
    opcode: "proto_lc_get_all_frd_feel_value_ack"
}

export interface proto_cl_trumpet_req {
    opcode: "proto_cl_trumpet_req"
    type: number
    message: string
    gameId: number
}

export interface proto_bc_match_update_achiev_noti {
    opcode: "proto_bc_match_update_achiev_noti"
    matchId: number
    achievType: number
    achievLevel: number
    achievValue: number
    validRoundNum: number
}

export interface proto_cl_get_turntable_login_award_config_req {
    opcode: "proto_cl_get_turntable_login_award_config_req"
    gameId: number
}

export interface proto_CLUB_INFO_CHANGE {
    type: number
    clubUid: number
    mainGameId: number
    clubName: string
    usedCardLimit: number
    allowCreateRoom: number
}

export interface proto_cl_send_friend_msg_req {
    opcode: "proto_cl_send_friend_msg_req"
    rcvGuid: number
    type: number
    message: string
}

export interface proto_lc_set_password_safe_ack {
    opcode: "proto_lc_set_password_safe_ack"
    ret: number
    plyGuid: number
}

export interface proto_ExtraRelief {
    id: number
    gameId: number
    status: number
    param: string
}

export interface proto_lc_reload_user_data_ack {
    opcode: "proto_lc_reload_user_data_ack"
    ret: number
    money: number
    gift: number
    level: number
    param: string
}

export interface proto_LC_MATCH_INFO {
    gameId: number
    serverId: number
    matchType: number
    matchId: number
    startTime: number
    signTime: number
    signCost: number
    awardId: number
    matchStatus: number
    signIndex: number
    vipFree: number
    matchName: string
    matchDesc: string
    startType: number
    matchRule: number
    dynamincMatchSignTime: number
}

export interface proto_RankItem {
    index: number
    plyGuid: number
    plyNickname: string
    plyStatus: number
    serverId: number
    tableId: number
    param1: number
    param2: number
}

export interface proto_OnlineRankItem {
    index: number
    plyGuid: number
    plyNickname: string
    plyStatus: number
    gameId: number
    serverId: number
    tableId: number
    vip: number
    level: number
    exp: number
    money: number
    param1: number
    param2: number
}

export interface proto_bc_match_stage_message_noti {
    opcode: "proto_bc_match_stage_message_noti"
    matchId: number
    stage: number
    playerNum: number
    type: number
    totalScore: number
    curTableNum: number
}

export interface proto_cl_get_private_room_log_data_req {
    opcode: "proto_cl_get_private_room_log_data_req"
    gameId: number
    inviteCode: number
}

export interface proto_cl_continuous_landing_get_reward_req {
    opcode: "proto_cl_continuous_landing_get_reward_req"
    subGameId: number
}

export interface proto_cb_match_join_flow_match_req {
    opcode: "proto_cb_match_join_flow_match_req"
    matchType: number
    matchMinNum: number
}

export interface proto_MatchPlayerRank {
    rankIndex: number
    plyGuid: number
}

export interface proto_MatchPlayerData {
    plyGuid: number
    currentScore: number
    reliveCount: number
    avoidCount: number
    tableIndex: number
    nickName: string
}

export interface proto_robot_money_status {
    money: number
    robotNum: number
}

export interface proto_AssistInfoData {
    index: number
    num: number
    gameId: number
}

export interface proto_FriendMsg {
    rcvPlyGuid: number
    sndPlyGuid: number
    sndNickname: string
    message: string
    type: number
    time: number
}

export interface proto_lc_send_vip_data_change_not {
    opcode: "proto_lc_send_vip_data_change_not"
    vipLevel: number
    vipRate: number
    nextVipneedMoney: number
    param: string
}

export interface proto_PrivateStatistics {
    time: number
    gameId: number
    inviteCode: number
    itemIndex: number
    itemNum: number
    gameName: string
}

export interface proto_cl_update_achieve_req {
    opcode: "proto_cl_update_achieve_req"
    index: number
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

export interface proto_TableInfo {
    inviteCode: number
    gameId: number
    serverId: number
    tableId: number
    clubId: number
    baseScore: number
    createTime: number
    flag: number
    tableTime: number
    ownerGuid: number
    maxPlayerNum: number
    name: string
    gameJson: string
    plyGuids: number[]
    curTableTime: number
    status: number
    startGameTime: number
    ruleId: number
    tableNo: number
}

export interface proto_gm_get_srv_status_ack {
    opcode: "proto_gm_get_srv_status_ack"
}

export interface proto_cb_get_player_feel_value_req {
    opcode: "proto_cb_get_player_feel_value_req"
    plyGuid: number
}

export interface proto_cb_update_big_card_user_info_req {
    opcode: "proto_cb_update_big_card_user_info_req"
    playerId: string
    sessionId: string
}

export interface proto_cl_get_relief_times_req {
    opcode: "proto_cl_get_relief_times_req"
}

export interface proto_PrivateRoomData {
    gameId: number
    baseScore: number
    serviceFee: number
    minMoney: number
    index: number
    num: number
    param_1: number
    param_2: string
}

export interface proto_cb_user_join_table_req {
    opcode: "proto_cb_user_join_table_req"
    tableId: number
    chairId: number
}

export interface proto_gm_get_srv_status_req {
    opcode: "proto_gm_get_srv_status_req"
    type: number
}

export interface proto_bc_message_not {
    opcode: "proto_bc_message_not"
    type: number
    message: string
}

export interface proto_cl_spec_trumpet_req {
    opcode: "proto_cl_spec_trumpet_req"
    gameId: number
    message: string
    image: string
}

export interface proto_bc_match_join_flow_match_ack {
    opcode: "proto_bc_match_join_flow_match_ack"
    ret: number
    matchId: number
}

export interface proto_bc_match_scores_not {
    opcode: "proto_bc_match_scores_not"
    tableScores: number[]
}

export interface proto_lc_get_user_good_card_ack {
    opcode: "proto_lc_get_user_good_card_ack"
    ret: number
    num: number
}

export interface proto_lc_get_relief_ack {
    opcode: "proto_lc_get_relief_ack"
    ret: number
}

export interface proto_lc_verity_ticket_ack {
    opcode: "proto_lc_verity_ticket_ack"
    ret: number
    plyLobbyData: proto_PlyLobbyData
    plyStatus: proto_PlayerStatus
    plyLoginAward: proto_LoginAward
    plyItems: proto_ItemData[]
    plyLoginAward2: proto_LoginAward2
    plyVip: proto_VipData
    timeStamp: number
    dailyOnlineTime_: number
}

export interface proto_lc_get_extra_relief_award_ack {
    opcode: "proto_lc_get_extra_relief_award_ack"
    id: number
    ret: number
    itemId: number
    itemNum: number
}

export interface proto_TableAttr20121227 {
    tableId: number
    name: string
    lock: number
    players: proto_PlyBaseData20121227[]
}

export interface proto_MergedAchieveData {
    gameId: number
    type: number
    index: number
    cond: number
    value: number
    max: number
    status: number
    moneyAward: number
    giftAward: number
    award_0: number
    award_1: number
    award_2: number
    award_3: number
    award_4: number
    name: string
    desc: string
}

export interface proto_cb_club_create_room_req {
    opcode: "proto_cb_club_create_room_req"
    clubUid: number
    createType: number
}

export interface proto_lc_get_private_game_replay_ack {
    opcode: "proto_lc_get_private_game_replay_ack"
    data: proto_PrivateReplay[]
}

export interface proto_bc_match_survival_config_ack {
    opcode: "proto_bc_match_survival_config_ack"
    matchId: number
    matchBeginTime: number
    matchGameTime: number
}

export interface proto_cl_get_merged_daily_task_data_req {
    opcode: "proto_cl_get_merged_daily_task_data_req"
    gameId: number[]
    scmjFlag: number
}

export interface proto_PlayerTaskData {
    taskType: number
    lastTaskIndex: number
    curVal: number
}

export interface proto_bc_match_relive_ack {
    opcode: "proto_bc_match_relive_ack"
    matchId: number
    ret: number
}

export interface proto_cl_club_create_table_req {
    opcode: "proto_cl_club_create_table_req"
    gameId: number
    gameBaseType: number
    clubId: number
    ruleId: number
    tableNo: number
}

export interface proto_cb_match_relive_req {
    opcode: "proto_cb_match_relive_req"
    matchId: number
    relive: number
}

export interface proto_bc_match_relive_noti {
    opcode: "proto_bc_match_relive_noti"
    matchId: number
    obsoleteEndTime: number
    reliveItemNum: number
    curentReliveTimes: number
    reliveTimesLimit: number
}

export interface proto_bc_match_transfer_server_noti {
    opcode: "proto_bc_match_transfer_server_noti"
    matchTypeId: number
    matchId: number
    serverId: number
}

export interface proto_bc_match_weed_out_score_not {
    opcode: "proto_bc_match_weed_out_score_not"
    weedOutScore: number
}

export interface proto_bc_match_cancel_not {
    opcode: "proto_bc_match_cancel_not"
    matchTypeId: number
    matchId: number
}

export interface proto_bc_dismiss_private_result_not {
    opcode: "proto_bc_dismiss_private_result_not"
    ret: number
}

export interface proto_cl_match_require_info_req {
    opcode: "proto_cl_match_require_info_req"
    matchId: number
    matchOrderId: number
}

export interface proto_lc_spec_trumpet_ack {
    opcode: "proto_lc_spec_trumpet_ack"
    ret: number
    msg: string
}

export interface proto_cb_get_online_award_items_req {
    opcode: "proto_cb_get_online_award_items_req"
}

export interface proto_RoundAwardItem {
    rounds: number
    money: number
    status: number
}

export interface proto_cl_club_get_member_list_req {
    opcode: "proto_cl_club_get_member_list_req"
    version: number
    clubUid: number
}

export interface proto_cl_get_achieve_ext_list_req {
    opcode: "proto_cl_get_achieve_ext_list_req"
    type: number
}

export interface proto_cl_get_private_game_data_list_req {
    opcode: "proto_cl_get_private_game_data_list_req"
    time: number
}

export interface proto_cb_get_task_system_req {
    opcode: "proto_cb_get_task_system_req"
}

export interface proto_cl_get_daily_task_list_req {
    opcode: "proto_cl_get_daily_task_list_req"
}

export interface proto_bc_match_sign_num_not {
    opcode: "proto_bc_match_sign_num_not"
    signNum: number
    minNum: number
}

export interface proto_cl_synthesis_monkey_req {
    opcode: "proto_cl_synthesis_monkey_req"
    flag: number
    nMonkeyType: number
}

export interface proto_cl_get_merged_daily_task_award_req {
    opcode: "proto_cl_get_merged_daily_task_award_req"
    gameId: number
    index: number
}

export interface proto_cl_get_card_road_data_req {
    opcode: "proto_cl_get_card_road_data_req"
    gameId: number
}

export interface proto_cl_trumpet_by_type_req {
    opcode: "proto_cl_trumpet_by_type_req"
    type: number
    gameId: number
    param: number
    message: string
    image: string
}

export interface proto_lc_set_user_accumulate_signin_days_ack {
    opcode: "proto_lc_set_user_accumulate_signin_days_ack"
    ret: number
    day: number
    continuousDays: number
    accumulatyeDays: number
    money: number
}

export interface proto_cl_get_zzyk_award_req {
    opcode: "proto_cl_get_zzyk_award_req"
    flag: number
}

export interface proto_lc_synthesis_monkey_ack {
    opcode: "proto_lc_synthesis_monkey_ack"
    ret: number
    nResultMonkeyType: number
}

export interface proto_bc_player_join_match_ack {
    opcode: "proto_bc_player_join_match_ack"
    ret: number
}

export interface proto_ItemAwardData {
    index: number
    number: number
}

export interface proto_lc_get_safe_history_ack {
    opcode: "proto_lc_get_safe_history_ack"
    ret: number
    plyGuid: number
    history: proto_SafeRecord[]
}

export interface proto_bc_match_info_noti {
    opcode: "proto_bc_match_info_noti"
    matchId: number
    matchRules: number
    stagePlayerNums: number[]
}

export interface proto_bc_join_match_ack {
    opcode: "proto_bc_join_match_ack"
    ret: number
    matchStatus: number
    matchId: number
    matchType: number
    leftBeginTime: number
}

export interface proto_lc_update_special_login_award_not {
    opcode: "proto_lc_update_special_login_award_not"
    message: string
}

export interface proto_bc_chat_not {
    opcode: "proto_bc_chat_not"
    plyGuid: number
    nickname: string
    message: string
    vipLevel: number
    userLevel: number
}

export interface proto_lc_get_match_sign_count_ack {
    opcode: "proto_lc_get_match_sign_count_ack"
    ret: number
    matchId: number
    count: number
}

export interface proto_lc_friend_loginout_tip_not {
    opcode: "proto_lc_friend_loginout_tip_not"
    plyGuid: number
    type: number
}

export interface proto_cl_get_miniGame_req {
    opcode: "proto_cl_get_miniGame_req"
    plyGuid: number
    gameId: number
    version: number
}

export interface proto_bc_get_achieve_award_not {
    opcode: "proto_bc_get_achieve_award_not"
    index: number
    name: string
    desc: string
}

export interface proto_cb_change_table_req {
    opcode: "proto_cb_change_table_req"
}

export interface proto_bc_force_dismiss_private_table_not {
    opcode: "proto_bc_force_dismiss_private_table_not"
    chairId: number
    accept: number
    userName: string
}

export interface proto_cl_get_private_room_data_req {
    opcode: "proto_cl_get_private_room_data_req"
}

export interface proto_bc_force_dismiss_private_table_req {
    opcode: "proto_bc_force_dismiss_private_table_req"
    chairId: number
    time: number
    userName: string
}

export interface proto_bc_dismiss_private_table_ack {
    opcode: "proto_bc_dismiss_private_table_ack"
    ret: number
}

export interface proto_cl_get_player_game_list_req {
    opcode: "proto_cl_get_player_game_list_req"
    gameList: number[]
}

export interface proto_cb_reset_match_req {
    opcode: "proto_cb_reset_match_req"
}

export interface proto_lc_load_club_table_rule_ack {
    opcode: "proto_lc_load_club_table_rule_ack"
    ret: number
    clubId: number
}

export interface proto_lc_get_match_rank_ack {
    opcode: "proto_lc_get_match_rank_ack"
    matchId: number
    matchOrderId: number
    data: proto_MatchPlayerData[]
}

export interface proto_bc_get_achieve_list_ack {
    opcode: "proto_bc_get_achieve_list_ack"
    items: proto_AchieveData[]
}

export interface proto_cl_get_match_sign_count_req {
    opcode: "proto_cl_get_match_sign_count_req"
    matchId: number
}

export interface proto_cl_get_miniGame_by_id_req {
    opcode: "proto_cl_get_miniGame_by_id_req"
    plyGuid: number
    gameId: number
    miniGameId: number
    version: number
}

export interface proto_lc_match_status_notf {
    opcode: "proto_lc_match_status_notf"
    plyGuid: number
    unfinishedNumber: number
    currentScore: number
    currentRank: number
}

export interface proto_bc_new_table_not {
    opcode: "proto_bc_new_table_not"
    tableAttrs: proto_TableAttr
}

export interface proto_lc_end_chat_ack {
    opcode: "proto_lc_end_chat_ack"
    ret: number
}

export interface proto_bc_ready_ack {
    opcode: "proto_bc_ready_ack"
    ret: number
}

export interface proto_cl_set_user_signin_days_req {
    opcode: "proto_cl_set_user_signin_days_req"
    day: number
}

export interface proto_cb_match_get_dynamic_award_req {
    opcode: "proto_cb_match_get_dynamic_award_req"
    matchId: number
}

export interface proto_OnlineAwardItems {
    awardTime: number
    moneyAward: number
}

export interface proto_lc_match_reborn_ack {
    opcode: "proto_lc_match_reborn_ack"
    ret: number
    matchId: number
    matchOrderId: number
    data: proto_MatchPlayerData
}

export interface proto_PrivateGameDataSelf {
    plyGuid: number
    itemNum: number
    nickName: string
    plyStatus: number
}

export interface proto_cl_send_ply_position_info_req {
    opcode: "proto_cl_send_ply_position_info_req"
    plyGuid: number
    latitude: number
    longitude: number
}

export interface proto_ClubTableInfoV2 {
    inviteCode: number
    tableNo: number
    plyGuids: number[]
    curTableTime: number
    startGameTime: number
}

export interface proto_cb_create_table_req {
    opcode: "proto_cb_create_table_req"
    name: string
    password: string
    baseScore: number
    tableTime: number
    flag: number
    gameRule: number
    initScore: number
    gameRuleGroup: number[]
    gameJson: string
    mode: number
    clubUid: number
    tinyJson: string
    clubRuleId: number
}

export interface proto_cb_send_disconnect_req {
    opcode: "proto_cb_send_disconnect_req"
}

export interface proto_lc_get_user_accumulate_signin_days_ack {
    opcode: "proto_lc_get_user_accumulate_signin_days_ack"
    ret: number
    signinInfo: proto_AccumulateSigninInfo
}

export interface proto_cb_web_socket_shake_hand_req {
    opcode: "proto_cb_web_socket_shake_hand_req"
    webSocketKey: string
}

export interface proto_cl_set_user_accumulate_signin_days_req {
    opcode: "proto_cl_set_user_accumulate_signin_days_req"
    day: number
}

export interface proto_bc_get_luck_draw_record_ack {
    opcode: "proto_bc_get_luck_draw_record_ack"
    ret: number
    index: number
    num: number
}

export interface proto_CommonAwardData {
    fanNum: number
    fanType: number
    contVictory: number
    cardUsedTimes: number
}

export interface proto_lc_get_private_game_log_ack {
    opcode: "proto_lc_get_private_game_log_ack"
    results: proto_PrivateGameLog[]
}

export interface proto_ServerKeyInfo {
    gameId: number
    packetName: string
    version: number
}

export interface proto_cl_continuous_landing_reward_data_req {
    opcode: "proto_cl_continuous_landing_reward_data_req"
    gameId: number
}

export interface proto_cl_get_all_frd_feel_value_req {
    opcode: "proto_cl_get_all_frd_feel_value_req"
}

export interface proto_cb_get_mahjong_quick_daily_task_data_req {
    opcode: "proto_cb_get_mahjong_quick_daily_task_data_req"
}

export interface proto_bc_create_table_ack {
    opcode: "proto_bc_create_table_ack"
    ret: number
    tableAttrs: proto_TableAttr
    errMsg: string
}

export interface proto_bc_leave_table_ack2 {
    opcode: "proto_bc_leave_table_ack2"
    ret: number
    plyNickname: string
    msg: string
}

export interface proto_TableProperty {
    inviteCode: number
    gameId: number
    serverId: number
    tableId: number
    clubId: number
    baseScore: number
    createTime: number
    flag: number
    tableTime: number
    maxPlayerNum: number
    ownerGuid: number
    name: string
    param: string
}

export interface proto_lc_send_friend_msg_not {
    opcode: "proto_lc_send_friend_msg_not"
    content: proto_FriendMsg[]
}

export interface proto_lc_match_victor_noti {
    opcode: "proto_lc_match_victor_noti"
    matchTypeId: number
    matchId: number
    rank: number
    locatedMainGameId: number
    plyGuid: number
    plyNickname: string
}

export interface proto_bc_user_level_exp_update_notf {
    opcode: "proto_bc_user_level_exp_update_notf"
    plyGuid: number
    level: number
    exp: number
    expAdd: number
    nextLevelExpNeed: number
}

export interface proto_lc_remove_safe_amount_ack {
    opcode: "proto_lc_remove_safe_amount_ack"
    ret: number
    plyGuid: number
    amount: number
    remainingSum: number
}

export interface proto_cb_do_tip_dila_req {
    opcode: "proto_cb_do_tip_dila_req"
    dilaCount: number
}

export interface proto_ClubTableInfo {
    inviteCode: number
    tableId: number
    name: string
    lock: number
    plyGuids: number[]
    clubUid: number
    gameId: number
}

export interface proto_bc_update_dila_notf {
    opcode: "proto_bc_update_dila_notf"
    serverZeit: number
    nickname: string
    data: proto_DilaData
}

export interface proto_lc_get_total_game_round_ack {
    opcode: "proto_lc_get_total_game_round_ack"
    ret: number
    totalRound: number
}

export interface proto_cl_get_turntable_login_award_req {
    opcode: "proto_cl_get_turntable_login_award_req"
    gameId: number
}

export interface proto_DilaData {
    dilaId: number
    changeCost: number
    dilaName: string
    dilaUrl: string
    currentRecivedMoney: number
    lastTipZeit: number
    changeZeit: number
}

export interface proto_bc_use_spec_props_ack {
    opcode: "proto_bc_use_spec_props_ack"
    ret: number
}

export interface proto_cb_send_prop_req {
    opcode: "proto_cb_send_prop_req"
    dstPlyGuid: number
    index: number
    amount: number
}

export interface proto_cl_server_data_req {
    opcode: "proto_cl_server_data_req"
}

export interface proto_cb_ply_place_not {
    opcode: "proto_cb_ply_place_not"
    latitude: number
    longitude: number
}

export interface proto_lc_dynamic_sign_get_match_sign_num_ack {
    opcode: "proto_lc_dynamic_sign_get_match_sign_num_ack"
    matchTypeId: number
    matchId: number
    playerNum: number
    signNum: number
    nextMatchBeginTime: number
    signStatus: number
    signEndTime: number
    dynamicSignUpAward: number
}

export interface proto_cl_get_rank_list_req {
    opcode: "proto_cl_get_rank_list_req"
    type: number
    latitude: number
    longitude: number
}

export interface proto_cl_get_at_achieve_award_req {
    opcode: "proto_cl_get_at_achieve_award_req"
    gameId: number
    index: number
    type: number
}

export interface proto_lc_player_lost_per_match_notf {
    opcode: "proto_lc_player_lost_per_match_notf"
    matchType: number
    rank: number
    plyGuid: number
    failOrSuccess: number
    isPerRound: number
}

export interface proto_SpecProps {
    gameId: number
    index: number
    coins: number
    isPopular: number
    imgIndex: number
    param_1: number
    param_2: number
    name: string
    desc: string
    url: string
}

export interface proto_cb_get_finished_newbie_award_req {
    opcode: "proto_cb_get_finished_newbie_award_req"
    type: number
}

export interface proto_cl_get_user_signin_award_info_req {
    opcode: "proto_cl_get_user_signin_award_info_req"
}

export interface proto_cl_get_safe_history_req {
    opcode: "proto_cl_get_safe_history_req"
    plyGuid: number
}

export interface proto_bc_get_streak_task_ack {
    opcode: "proto_bc_get_streak_task_ack"
    ret: number
    index: number
    name: string
    desc: string
    speed: number
    amount: number
}

export interface proto_lc_get_merged_daily_task_award_ack {
    opcode: "proto_lc_get_merged_daily_task_award_ack"
    ret: number
    money: number
    gift: number
    award_0: number
    award_1: number
    award_2: number
    award_3: number
    award_4: number
}

export interface proto_lc_get_achieve_ext_award_ack {
    opcode: "proto_lc_get_achieve_ext_award_ack"
    ret: number
    money: number
    gift: number
}

export interface proto_cl_get_user_accumulate_signin_award_req {
    opcode: "proto_cl_get_user_accumulate_signin_award_req"
    continupusDays: number
    accumulateDays: number
    type_: number
}

export interface proto_lc_store_safe_amount_ack {
    opcode: "proto_lc_store_safe_amount_ack"
    ret: number
    plyGuid: number
}

export interface proto_cl_do_sign_match_req {
    opcode: "proto_cl_do_sign_match_req"
    matchId: number
    matchOrderId: number
    operateType: number
}

export interface proto_GameConfig {
    gameId: number
    gameName: string
}

export interface proto_lc_club_get_room_property_ack {
    opcode: "proto_lc_club_get_room_property_ack"
    tablePropertys: proto_TableProperty[]
}

export interface proto_bc_get_rank_list_ack {
    opcode: "proto_bc_get_rank_list_ack"
    ret: number
    type: number
    rankList: proto_OnlineRankItem[]
}

export interface proto_bc_get_achieve_award_ack {
    opcode: "proto_bc_get_achieve_award_ack"
    ret: number
    param_1: number
    param_2: number
    param_3: number
    param_4: number
    param_5: number
}

export interface proto_lc_get_miniGame_ack {
    opcode: "proto_lc_get_miniGame_ack"
    result: number
    serverDatas: proto_ServerData2[]
}

export interface proto_AccumulateSigninInfo {
    signinDays: number[]
    buqianka: number
    signinAward: proto_AccumulateSigninAward
}

export interface proto_bc_check_relief_status_ack {
    opcode: "proto_bc_check_relief_status_ack"
    ret: number
    currentRelief: number
    reliefTimeLeft: number
    reliefAwardCount: number
}

export interface proto_bc_match_get_dynamic_award_ack {
    opcode: "proto_bc_match_get_dynamic_award_ack"
    ret: number
    signPlayerNum: number
}

export interface proto_cb_check_relief_status_req {
    opcode: "proto_cb_check_relief_status_req"
}

export interface proto_cb_apply_match_req {
    opcode: "proto_cb_apply_match_req"
    payType: number
}

export interface proto_bc_get_daily_task_award_ack {
    opcode: "proto_bc_get_daily_task_award_ack"
    ret: number
    money: number
    gift: number
    prop_1: number
    prop_2: number
    prop_3: number
    prop_4: number
    prop_5: number
}

export interface proto_PrivateReplayRecord {
    gameId: number
    playerMax: number
    createTime: number
    inviteCode: number
    endTime: number
    param_1: number
    nickName: string
    param_2: string
}

export interface proto_FriendData20121227 {
    plyGuid: number
    plyNickname: string
    plyMoney: number
    plyVipLev: number
    plyUnreadMsgNum: number
    plyType: number
}

export interface proto_cb_get_online_award_req {
    opcode: "proto_cb_get_online_award_req"
    type: number
}

export interface proto_lc_valid_identify_info_ack {
    opcode: "proto_lc_valid_identify_info_ack"
    ret: number
    message: string
}

export interface proto_bc_private_invite_code_not {
    opcode: "proto_bc_private_invite_code_not"
    tableScores: number[]
    privateInvite: proto_PrivateInvite
}

export interface proto_cb_visit_table_req {
    opcode: "proto_cb_visit_table_req"
    tableId: number
    password: string
    chairId: number
}

export interface proto_lc_get_fetion_rank_list_ack {
    opcode: "proto_lc_get_fetion_rank_list_ack"
    rankList: proto_RankItem[]
    type: number
}

export interface proto_cl_get_user_already_login_days_req {
    opcode: "proto_cl_get_user_already_login_days_req"
}

export interface proto_cl_reload_user_data_req {
    opcode: "proto_cl_reload_user_data_req"
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

export interface proto_SafeRecord {
    index: number
    gameId: number
    type: number
    opTime: number
    amount: number
    remainingSum: number
}

export interface proto_cl_club_updata_limit_group_list_req {
    opcode: "proto_cl_club_updata_limit_group_list_req"
    type: number
    clubId: number
    groupId: number
    memberList: number[]
}

export interface proto_lc_club_room_change_noti {
    opcode: "proto_lc_club_room_change_noti"
    type: number
    clubUid: number
    tableInfo: proto_ClubTableInfo
    ruleId: number
    tableNo: number
    currentGameTime: number
}

export interface proto_CRAD_ROAD_INFO {
    gameId: number
    serverId: number
    param: string
}

export interface proto_lc_send_user_data_change_not {
    opcode: "proto_lc_send_user_data_change_not"
    plyLobbyData: proto_PlyLobbyData
    plyItems: proto_ItemData[]
    plyVip: proto_VipData
    plyGradingValue: number
}

export interface proto_MailInfo {
    mailId: number
    mailMsg: string
    mailMsgType: number
    mailSendTime: number
    mailStatus: number
    mailImg: string
    mailAwardId: number
}

export interface proto_cl_rp_check_relief_status_req {
    opcode: "proto_cl_rp_check_relief_status_req"
    roomType: number
}

export interface proto_lc_get_assist_info_data_ack {
    opcode: "proto_lc_get_assist_info_data_ack"
    ret: number
    items: proto_AssistInfoData[]
}

export interface proto_cb_match_table_by_marriage_req {
    opcode: "proto_cb_match_table_by_marriage_req"
    plyGuid: number
    matchAgeMin: number
    matchAgeMax: number
    matchCity: number
    matchDegree: number
    matchGender: number
    matchHeightMin: number
    matchHeightMax: number
    matchHousing: number
    matchHaveChildren: number
    matchMarriage: number
}

export interface proto_lc_match_player_num_not {
    opcode: "proto_lc_match_player_num_not"
    matchId: number
    playerNum: number
}

export interface proto_bc_send_disconnect_ack {
    opcode: "proto_bc_send_disconnect_ack"
    ret: number
}

export interface proto_cb_get_player_level_req {
    opcode: "proto_cb_get_player_level_req"
}

export interface proto_bc_ply_join_not {
    opcode: "proto_bc_ply_join_not"
    plyData: proto_PlyBaseData
}

export interface proto_RL_PLAYER_STATUS {
    plyGuid: number
    plyNickname: string
    loginServerId: number
    mainGameId: number
    plyStatus: number
}

export interface proto_bc_match_survival_award_noti {
    opcode: "proto_bc_match_survival_award_noti"
    matchId: number
    awardValue: number
    maxAwardValue: number
    minAwardValue: number
    winnerPlayerNum: number
}

export interface proto_bc_get_round_award_ack {
    opcode: "proto_bc_get_round_award_ack"
    ret: number
    round: number
    awardRound: number
    money: number
    message: string
}

export interface proto_bc_integal_condition_noti {
    opcode: "proto_bc_integal_condition_noti"
    type: number
    ruleId: number
    ruleIdAndroid: number
    ruleDesc: string
}

export interface proto_lc_club_invite_to_game_ack {
    opcode: "proto_lc_club_invite_to_game_ack"
    clubUid: number
    inviteCode: number
    toPlyGuid: number
    ret: number
}

export interface proto_cb_get_round_award_req {
    opcode: "proto_cb_get_round_award_req"
    type: number
}

export interface proto_cl_get_win_round_score_req {
    opcode: "proto_cl_get_win_round_score_req"
    plyGuid: number
}

export interface proto_lc_sign_flow_match_ack {
    opcode: "proto_lc_sign_flow_match_ack"
    ret: number
}

export interface proto_MatchRank {
    plyGuid: number
    plyNickname: string
    matchScore: number
}

export interface proto_bc_update_big_card_user_info_ack {
    opcode: "proto_bc_update_big_card_user_info_ack"
    ret: number
}

export interface proto_bc_win_lose_limit_exceed_not {
    opcode: "proto_bc_win_lose_limit_exceed_not"
    flag: number
    errMsg: string
}

export interface proto_lc_get_private_game_replay_record_ack {
    opcode: "proto_lc_get_private_game_replay_record_ack"
    data: proto_PrivateReplayRecord[]
}

export interface proto_PlyLobbyData20121227 {
    plyGuid: number
    nickname: string
    gift: number
    money: number
    score: number
    won: number
    lost: number
    moneyRank: number
    wonRank: number
}

export interface proto_bc_calc_player_round_count_not {
    opcode: "proto_bc_calc_player_round_count_not"
    num: number
}

export interface proto_bc_coupon_not {
    opcode: "proto_bc_coupon_not"
    ret: number
    num: number
}

export interface proto_bc_get_assist_info_data_ack {
    opcode: "proto_bc_get_assist_info_data_ack"
    ret: number
    dstPlyGuid: number
    items: proto_AssistInfoData[]
}

export interface proto_lc_verity_ticket_ack20121227 {
    opcode: "proto_lc_verity_ticket_ack20121227"
    ret: number
    plyLobbyData: proto_PlyLobbyData20121227
    plyStatus: proto_PlayerStatus20121227
    plyLoginAward: proto_LoginAward
    plyItems: proto_ItemData20121227[]
    plyLoginAward2: proto_LoginAward2
}

export interface proto_lc_get_daily_task_award_ack {
    opcode: "proto_lc_get_daily_task_award_ack"
    ret: number
    money: number
    gift: number
    prop_1: number
    prop_2: number
    prop_3: number
    prop_4: number
    prop_5: number
}

export interface proto_lc_quit_sign_match_ack {
    opcode: "proto_lc_quit_sign_match_ack"
    ret: number
    money: number
}

export interface proto_cl_get_private_game_replay_record_req {
    opcode: "proto_cl_get_private_game_replay_record_req"
    uniqueCode: number
}

export interface proto_lc_club_member_info_change_noti {
    opcode: "proto_lc_club_member_info_change_noti"
    type: number
    clubUid: number
    member: proto_ClubMemberInfo
}

export interface proto_player_feel_value {
    frdGuid: number
    feelValue: number
}

export interface proto_lc_send_ply_position_info_ack {
    opcode: "proto_lc_send_ply_position_info_ack"
    ret: number
    plyGuid: number
}

export interface proto_cb_kickout_req {
    opcode: "proto_cb_kickout_req"
    dstPlyGuid: number
    chairId: number
}

export interface proto_TableItemAttr2 {
    tableId: number
    name: string
    lock: number
    status: number
    baseScore: number
    curPlyNum: number
    plyMinMoney: number
}

export interface proto_bc_reset_match_ack {
    opcode: "proto_bc_reset_match_ack"
    ret: number
    matchScore: number
}

export interface proto_lc_match_require_status_ack {
    opcode: "proto_lc_match_require_status_ack"
    ret: number
}

export interface proto_SigninAward {
    days: number
    money: number
    gift: number
    count: number
    state: number
    index: number
    name: string
}

export interface proto_lc_club_user_data_noti {
    opcode: "proto_lc_club_user_data_noti"
    clubUid: number
    gameId: number
    "var": number
    usedRoomCardNum: number
    limitRoomCardNum: number
}

export interface proto_bc_update_ply_data_not20121227 {
    opcode: "proto_bc_update_ply_data_not20121227"
    plyGuid: number
    uptReason: number
    uptType: number
    variant: number
    amount: number
}

export interface proto_lc_get_user_signin_award_ext_ack {
    opcode: "proto_lc_get_user_signin_award_ext_ack"
    ret: number
    day: number
    signinAward: proto_ExtSigninAward
}

export interface proto_cb_get_luck_draw_req {
    opcode: "proto_cb_get_luck_draw_req"
}

export interface proto_lc_continuous_landing_reward_data_ack {
    opcode: "proto_lc_continuous_landing_reward_data_ack"
    isGetAward: number
    loginAward2: proto_LoginAward2
}

export interface proto_bc_ply_leave_not {
    opcode: "proto_bc_ply_leave_not"
    plyGuid: number
}

export interface proto_cl_get_private_invite_info_req {
    opcode: "proto_cl_get_private_invite_info_req"
    inviteCode: number
}

export interface proto_lc_get_ply_status_ack20121227 {
    opcode: "proto_lc_get_ply_status_ack20121227"
    players: proto_PlayerStatus20121227[]
}

export interface proto_bc_join_table_ack20121227 {
    opcode: "proto_bc_join_table_ack20121227"
    ret: number
    tableAttrs: proto_TableAttr20121227
}

export interface proto_cl_get_extra_relief_list_req {
    opcode: "proto_cl_get_extra_relief_list_req"
}

export interface proto_bc_do_tip_dila_ack {
    opcode: "proto_bc_do_tip_dila_ack"
    ret: number
    data: proto_DilaData
}

export interface proto_cb_ready_req {
    opcode: "proto_cb_ready_req"
}

export interface proto_ClubGroupMemMsg {
    clubId: number
    groupId: number
    memberList: number[]
}

export interface proto_lc_auto_add_frd_not {
    opcode: "proto_lc_auto_add_frd_not"
    ret: number
    limitGuid: number
}

export interface proto_bc_ply_join_not20121227 {
    opcode: "proto_bc_ply_join_not20121227"
    plyData: proto_PlyBaseData20121227
}

export interface proto_LuckDrawItemData {
    index: number
    number: number
}

export interface proto_lc_table_change_noti {
    opcode: "proto_lc_table_change_noti"
    serverId: number
    tableId: number
    changeType: number
    param: number
    value: number
}

export interface proto_cl_active_game_server_info_req {
    opcode: "proto_cl_active_game_server_info_req"
    gameId: number
    serverType: number
    serverId: number
}

export interface proto_lc_dismiss_club_table_ack {
    opcode: "proto_lc_dismiss_club_table_ack"
    ret: number
    inviteCode: number
    errMsg: string
}

export interface proto_cl_get_online_rank_list_mj_req {
    opcode: "proto_cl_get_online_rank_list_mj_req"
    flag: number
    page: number
    type: number
}

export interface proto_lc_get_private_game_data_list_ack {
    opcode: "proto_lc_get_private_game_data_list_ack"
    data: proto_PrivateGameDataAll[]
    types: number[]
    itemIndexs: number[]
}

export interface proto_AccumulateSigninAward2 {
    days: number
    awardStrings: string
}

export interface proto_bc_web_socket_shake_hand_ack {
    opcode: "proto_bc_web_socket_shake_hand_ack"
    webSocketKey: string
}

export interface proto_cl_get_daily_task_award_req {
    opcode: "proto_cl_get_daily_task_award_req"
    index: number
}

export interface proto_lc_get_club_settting_ack {
    opcode: "proto_lc_get_club_settting_ack"
    clubUid: number
    hasAutoCreateRoom: number
}

export interface proto_lc_get_safe_data_ack {
    opcode: "proto_lc_get_safe_data_ack"
    ret: number
    plyGuid: number
    amount: number
    money: number
    isBindMobile: number
}

export interface proto_lc_get_zzyk_award_ack {
    opcode: "proto_lc_get_zzyk_award_ack"
    ret: number
    money: number
    flag: number
}

export interface proto_lc_club_get_room_list_ack {
    opcode: "proto_lc_club_get_room_list_ack"
    clubUid: number
    tableInfos: proto_ClubTableInfo[]
}

export interface proto_lc_get_daily_task_list_ack {
    opcode: "proto_lc_get_daily_task_list_ack"
    items: proto_AchieveData2[]
}

export interface proto_lc_active_game_server_info_ack {
    opcode: "proto_lc_active_game_server_info_ack"
    ret: number
    serverStatus: proto_ServerData2
}

export interface proto_cl_club_get_room_list_req {
    opcode: "proto_cl_club_get_room_list_req"
    version: number
    clubUid: number
}

export interface proto_lc_get_user_signin_days_ack {
    opcode: "proto_lc_get_user_signin_days_ack"
    ret: number
    signinInfo: proto_SigninInfo
}

export interface proto_PlyLobbyData {
    plyGuid: number
    nickname: string
    sex: number
    gift: number
    money: number
    score: number
    won: number
    lost: number
    moneyRank: number
    wonRank: number
    param_1: number
    param_2: number
}

export interface proto_cb_join_match_req {
    opcode: "proto_cb_join_match_req"
    matchId: number
    matchTypeId: number
}

export interface proto_cl_store_safe_amount_req {
    opcode: "proto_cl_store_safe_amount_req"
    plyGuid: number
    amount: number
}

export interface proto_cl_get_three_draw_data_req {
    opcode: "proto_cl_get_three_draw_data_req"
}

export interface proto_lc_set_ply_city_data_ack {
    opcode: "proto_lc_set_ply_city_data_ack"
    ret: number
    nProv: number
    nCity: number
    nCounty: number
}

export interface proto_lc_update_player_marriage_ack {
    opcode: "proto_lc_update_player_marriage_ack"
    ret: number
}

export interface proto_lc_get_merged_daily_task_data_ack {
    opcode: "proto_lc_get_merged_daily_task_data_ack"
    items: proto_MergedAchieveData[]
}

export interface proto_lc_get_at_achieve_award_ack {
    opcode: "proto_lc_get_at_achieve_award_ack"
    ret: number
    vecAwards: proto_ATAchieveAward[]
}

export interface proto_ItemConfig {
    itemIndex: number
    itemNum: number
}

export interface proto_ActivityRewardItem {
    activity: number
    award: number
    items: proto_ItemConfig[]
}

export interface proto_cl_get_activity_rewards_list_req {
    opcode: "proto_cl_get_activity_rewards_list_req"
}

export interface proto_lc_get_activity_rewards_list_ack {
    opcode: "proto_lc_get_activity_rewards_list_ack"
    activity: number
    configs: proto_ActivityRewardItem[]
}

export interface proto_cl_get_activity_reward_req {
    opcode: "proto_cl_get_activity_reward_req"
    activity: number
}

export interface proto_lc_get_activity_reward_ack {
    opcode: "proto_lc_get_activity_reward_ack"
    activity: number
    ret: number
}

export interface proto_cb_play_quit_flow_match_req {
    opcode: "proto_cb_play_quit_flow_match_req"
    matchTypeId: number
    matchMinNum: number
}

export interface proto_bc_play_quit_flow_match_ack {
    opcode: "proto_bc_play_quit_flow_match_ack"
    ret: number
    matchTypeId: number
}
