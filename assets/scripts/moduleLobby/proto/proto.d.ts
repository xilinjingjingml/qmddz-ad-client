interface Iproto_cl_end_chat_req {
    opcode: 'proto_cl_end_chat_req'
    endGuid: number
}

interface Iproto_cl_sign_flow_match_req {
    opcode: 'proto_cl_sign_flow_match_req'
    matchType: number
    signIndex: number
}

interface Iproto_PrivateInviteRoomData {
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

interface Iproto_bc_do_tip_dila_notf {
    opcode: 'proto_bc_do_tip_dila_notf'
    msg: string
    tiperGuid: number
    tipCount: number
    data: Iproto_DilaData
}

interface Iproto_PrivateGameDataAll {
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
    plyDatas: Iproto_PrivateGameDataSelf[]
}

interface Iproto_cl_club_invite_to_game_req {
    opcode: 'proto_cl_club_invite_to_game_req'
    clubUid: number
    clubName: string
    toPlyGuid: number
    inviteCode: number
}

interface Iproto_lc_give_back_win_money_not {
    opcode: 'proto_lc_give_back_win_money_not'
    sendGuid: number
    recvGuid: number
    sendNickName: string
    payAmount: number
}

interface Iproto_bc_send_prop_not {
    opcode: 'proto_bc_send_prop_not'
    srcPlyGuid: number
    dstPlyGuid: number
    index: number
    amount: number
}

interface Iproto_bc_get_player_feel_value_ack {
    opcode: 'proto_bc_get_player_feel_value_ack'
    plyGuid: number
    plyFeelValue: number
}

interface Iproto_bc_get_task_system_ack {
    opcode: 'proto_bc_get_task_system_ack'
    ret: number
    roundItems: Iproto_RoundAwardData[]
}

interface Iproto_cb_get_streak_task_req {
    opcode: 'proto_cb_get_streak_task_req'
}

interface Iproto_cl_get_rp_relief_req {
    opcode: 'proto_cl_get_rp_relief_req'
    roomType: number
}

interface Iproto_lc_get_private_game_statistics_ack {
    opcode: 'proto_lc_get_private_game_statistics_ack'
    results: Iproto_PrivateStatistics[]
}

interface Iproto_bc_leave_table_ack {
    opcode: 'proto_bc_leave_table_ack'
    ret: number
    plyNickname: string
}

interface Iproto_cb_get_assist_info_data_req {
    opcode: 'proto_cb_get_assist_info_data_req'
    dstPlyGuid: number
}

interface Iproto_bc_get_all_dila_ack {
    opcode: 'proto_bc_get_all_dila_ack'
    ret: number
    dataVec: Iproto_DilaData[]
}

interface Iproto_bc_get_player_level_ack {
    opcode: 'proto_bc_get_player_level_ack'
    ret: number
    level: number
}

interface Iproto_cb_match_add_score_req {
    opcode: 'proto_cb_match_add_score_req'
    matchId: number
    type: number
    matchType: number
    baseAddAcore: number
}

interface Iproto_cb_get_achieve_list_req {
    opcode: 'proto_cb_get_achieve_list_req'
    gameId: number
}

interface Iproto_cb_get_achieve_award_req {
    opcode: 'proto_cb_get_achieve_award_req'
    index: number
}

interface Iproto_cl_club_get_club_list_req {
    opcode: 'proto_cl_club_get_club_list_req'
    version: number
    plyGuid: number
}

interface Iproto_lc_get_at_achieve_list_ack {
    opcode: 'proto_lc_get_at_achieve_list_ack'
    vecItems: Iproto_ATAchieveData[]
}

interface Iproto_bc_common_award_not {
    opcode: 'proto_bc_common_award_not'
    type: number
    param_1: number
    param_2: number
    param_3: number
    name: string
    desc: string
}

interface Iproto_cb_get_luck_draw_data_list_req {
    opcode: 'proto_cb_get_luck_draw_data_list_req'
}

interface Iproto_AchieveExtData {
    index: number
    value: number
    max: number
    status: number
    moneyAward: number
    giftAward: number
    name: string
    desc: string
}

interface Iproto_lc_get_online_rank_list_mj_ack {
    opcode: 'proto_lc_get_online_rank_list_mj_ack'
    ret: number
    flag: number
    type: number
    rankData: Iproto_OnlineRankItem[]
}

interface Iproto_AccumulateSigninAward {
    today: number
    accumulateDays: number
    accSigninAward: Iproto_AccumulateSigninAward2[]
    conSigninAward: Iproto_ContinuousSigninAward[]
}

interface Iproto_lc_get_user_already_login_days_ack {
    opcode: 'proto_lc_get_user_already_login_days_ack'
    days: number
}

interface Iproto_ATAchieveAward {
    itemIndex: number
    itemNum: number
}

interface Iproto_cb_get_mahjong_quick_daily_task_award_req {
    opcode: 'proto_cb_get_mahjong_quick_daily_task_award_req'
    gameId: number
    index: number
}

interface Iproto_bc_match_survival_noti {
    opcode: 'proto_bc_match_survival_noti'
    matchId: number
    infoType: number
    gameTime: number
    currentPlayerNum: number
    totalBonus: number
}

interface Iproto_lc_club_get_club_list_ack {
    opcode: 'proto_lc_club_get_club_list_ack'
    clubInfos: Iproto_ClubInfo[]
}

interface Iproto_cl_get_season_card_award_req {
    opcode: 'proto_cl_get_season_card_award_req'
    cardType: number
}

interface Iproto_bc_successive_victory_not {
    opcode: 'proto_bc_successive_victory_not'
    count: number
    msg: string
}

interface Iproto_lc_trumpet_by_type_ack {
    opcode: 'proto_lc_trumpet_by_type_ack'
    ret: number
    type: number
    msg: string
}

interface Iproto_bc_specify_item_update_not {
    opcode: 'proto_bc_specify_item_update_not'
    plyGuid: number
    index: number
    num: number
}

interface Iproto_cl_get_rank_list_mj_req {
    opcode: 'proto_cl_get_rank_list_mj_req'
    type: number
}

interface Iproto_PrivateGameLog {
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

interface Iproto_cl_get_at_achieve_list_req {
    opcode: 'proto_cl_get_at_achieve_list_req'
    type: number
}

interface Iproto_cl_set_club_create_table_rule_req {
    opcode: 'proto_cl_set_club_create_table_rule_req'
    clubId: number
    gameId: number
    clubRule: string
    ruleDesc: string
    type: number
    ruleId: number
}

interface Iproto_cl_get_club_settting_req {
    opcode: 'proto_cl_get_club_settting_req'
    clubUid: number
}

interface Iproto_cb_get_hook_status_req {
    opcode: 'proto_cb_get_hook_status_req'
}

interface Iproto_lc_trumpet_by_type_not {
    opcode: 'proto_lc_trumpet_by_type_not'
    type: number
    gameId: number
    param: number
    plyGuid: number
    plyNickname: string
    message: string
    image: string
}

interface Iproto_TableItemAttr {
    tableId: number
    name: string
    lock: number
    status: number
    baseScore: number
    curPlyNum: number
}

interface Iproto_cl_modify_password_safe_req {
    opcode: 'proto_cl_modify_password_safe_req'
    plyGuid: number
    oldPassword: string
    newPassword: string
}

interface Iproto_lc_get_rank_list_mj_ack {
    opcode: 'proto_lc_get_rank_list_mj_ack'
    ret: number
    type: number
    rankData: Iproto_RankItem[]
}

interface Iproto_cl_get_achieve_award_req {
    opcode: 'proto_cl_get_achieve_award_req'
    index: number
}

interface Iproto_lc_get_relief_times_ack {
    opcode: 'proto_lc_get_relief_times_ack'
    times: number
}

interface Iproto_lc_match_begin_not {
    opcode: 'proto_lc_match_begin_not'
    matchId: number
    matchType: number
    startTime: number
    gameId: number
    serverId: number
}

interface Iproto_bc_match_reach_achiev_noti {
    opcode: 'proto_bc_match_reach_achiev_noti'
    plyGuid: number
    matchTypeId: number
    matchId: number
    achievType: number
    achievLevel: number
    achievValue: number
}

interface Iproto_LoginAward {
    loginDays: number
    money: number
}

interface Iproto_lc_get_user_signin_days_ext_ack {
    opcode: 'proto_lc_get_user_signin_days_ext_ack'
    ret: number
    signinInfo: Iproto_ExtSigninInfo
}

interface Iproto_ItemDesc {
    index: number
    desc: string
    fetch: string
}

interface Iproto_lc_club_list_change_noti {
    opcode: 'proto_lc_club_list_change_noti'
    type: number
    clubUid: number
    clubName: string
}

interface Iproto_bc_common_message_not {
    opcode: 'proto_bc_common_message_not'
    type: number
    message: string
}

interface Iproto_cl_update_extra_relief_status_req {
    opcode: 'proto_cl_update_extra_relief_status_req'
    id: number
    status: number
}

interface Iproto_lc_use_protocol_proto_ack {
    opcode: 'proto_lc_use_protocol_proto_ack'
}

interface Iproto_cl_get_private_game_log_req {
    opcode: 'proto_cl_get_private_game_log_req'
    page: number
    count: number
}

interface Iproto_lc_get_serverdata_by_serverid_ack {
    opcode: 'proto_lc_get_serverdata_by_serverid_ack'
    ret: number
    serverData: Iproto_ServerData2
}

interface Iproto_lc_server_data_not2 {
    opcode: 'proto_lc_server_data_not2'
    serverDatas: Iproto_ServerData2[]
}

interface Iproto_cl_get_merged_achieve_list_data_req {
    opcode: 'proto_cl_get_merged_achieve_list_data_req'
    gameId: number[]
    scmjFlag: number
}

interface Iproto_lc_broadcast_message_not {
    opcode: 'proto_lc_broadcast_message_not'
    gameId: number
    pn: string
    msg: string
}

interface Iproto_cb_force_dismiss_private_table_ack {
    opcode: 'proto_cb_force_dismiss_private_table_ack'
    accept: number
}

interface Iproto_cb_match_continue_req {
    opcode: 'proto_cb_match_continue_req'
}

interface Iproto_cl_get_match_sign_num_req {
    opcode: 'proto_cl_get_match_sign_num_req'
    matchTypeId: number
}

interface Iproto_lc_get_dynamic_award_rank_ack {
    opcode: 'proto_lc_get_dynamic_award_rank_ack'
    ret: number
}

interface Iproto_bc_match_stage_config_ack {
    opcode: 'proto_bc_match_stage_config_ack'
    matchTypeId: number
    matchId: number
    bonusTotal: number
    roundCount: number
    currentRound: number
}

interface Iproto_cl_verify_ticket_req {
    opcode: 'proto_cl_verify_ticket_req'
    plyGuid: number
    plyNickname: string
    plyTicket: string
    gameId: number
    version: number
    extParam: string
    sex: number
    packetName: string
}

interface Iproto_lc_get_season_card_award_ack {
    opcode: 'proto_lc_get_season_card_award_ack'
    ret: number
    cardType: number
    awardInfo: Iproto_SeasonCardAwardInfo[]
}

interface Iproto_cl_club_get_club_limit_group_list_req {
    opcode: 'proto_cl_club_get_club_limit_group_list_req'
    clubId: number
}

interface Iproto_lc_get_card_road_data_ack {
    opcode: 'proto_lc_get_card_road_data_ack'
    ret: number
}

interface Iproto_lc_match_round_end_notf {
    opcode: 'proto_lc_match_round_end_notf'
    matchId: number
    matchOrderId: number
    roundIndex: number
    nextStartTime: number
    matchType: number
}

interface Iproto_cb_join_table_req {
    opcode: 'proto_cb_join_table_req'
    tableId: number
    password: string
    clubUid: number
}

interface Iproto_cl_get_user_signin_award_ext_req {
    opcode: 'proto_cl_get_user_signin_award_ext_req'
    day: number
}

interface Iproto_lc_get_achieve_ext_list_ack {
    opcode: 'proto_lc_get_achieve_ext_list_ack'
    items: Iproto_AchieveExtData[]
}

interface Iproto_cb_give_gift_req {
    opcode: 'proto_cb_give_gift_req'
    dstPlyGuid: number
    amount: number
}

interface Iproto_cb_get_all_dila_req {
    opcode: 'proto_cb_get_all_dila_req'
}

interface Iproto_bc_get_hook_status_ack {
    opcode: 'proto_bc_get_hook_status_ack'
    ret: number
}

interface Iproto_lc_player_signature_ack {
    opcode: 'proto_lc_player_signature_ack'
    ret: number
    plyGuid: number
    signature: string
}

interface Iproto_lc_update_extra_relief_status_ack {
    opcode: 'proto_lc_update_extra_relief_status_ack'
    ret: number
    id: number
    status: number
}

interface Iproto_cl_get_continuous_game_award_req {
    opcode: 'proto_cl_get_continuous_game_award_req'
}

interface Iproto_cl_club_get_room_property_req {
    opcode: 'proto_cl_club_get_room_property_req'
    inviteCodes: number[]
}

interface Iproto_UID_SCORES {
    uid: number
    scores: number
}

interface Iproto_cb_club_create_room_more_game_req {
    opcode: 'proto_cb_club_create_room_more_game_req'
    clubUid: number
    gameId: number
    ruleId: number
    createType: number
}

interface Iproto_Friendlist {
    plyGuid: number
    frdGuid: number
}

interface Iproto_bc_match_stage_award_noti {
    opcode: 'proto_bc_match_stage_award_noti'
    matchId: number
    totalScore: number
    bonus: number
    maxBonus: number
    minBonus: number
    playerNum: number
    totoalBonus: number
}

interface Iproto_bc_get_luck_draw_ack {
    opcode: 'proto_bc_get_luck_draw_ack'
    ret: number
    items: Iproto_LuckDrawItemData[]
}

interface Iproto_cl_get_total_game_round_req {
    opcode: 'proto_cl_get_total_game_round_req'
}

interface Iproto_lc_trumpet_ack {
    opcode: 'proto_lc_trumpet_ack'
    ret: number
    num: number
    msg: string
}

interface Iproto_bc_get_match_data_ack {
    opcode: 'proto_bc_get_match_data_ack'
    maxGameRounds: number
    matchFee: number
    plySelfRank: number
    scoreRank: Iproto_MatchRank[]
    openTime: number
    closeTime: number
    matchTip: string
}

interface Iproto_cl_get_extra_relief_award_req {
    opcode: 'proto_cl_get_extra_relief_award_req'
    id: number
}

interface Iproto_cl_valid_identify_info_req {
    opcode: 'proto_cl_valid_identify_info_req'
    identifyCard: string
    name: string
}

interface Iproto_lc_get_mail_info_ack {
    opcode: 'proto_lc_get_mail_info_ack'
    ret: number
    errMsg: string
    mailInfo: Iproto_MailInfo[]
}

interface Iproto_bc_ready_not {
    opcode: 'proto_bc_ready_not'
    plyGuid: number
}

interface Iproto_bc_login_ack20121227 {
    opcode: 'proto_bc_login_ack20121227'
    ret: number
    plyBaseData: Iproto_PlyBaseData20121227
    plyStatus: Iproto_PlayerStatus20121227
}

interface Iproto_ClubInfo {
    clubUid: number
    clubName: string
    usedRoomCardNum: number
    limitRoomCardNum: number
}

interface Iproto_AchieveData2 {
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

interface Iproto_lc_send_friend_msg_ack {
    opcode: 'proto_lc_send_friend_msg_ack'
    ret: number
    content: Iproto_FriendMsg[]
}

interface Iproto_bc_match_add_score_ack {
    opcode: 'proto_bc_match_add_score_ack'
    ret: number
    curScore: number
    curAddTimes: number
    maxAddTimes: number
}

interface Iproto_PrivateLogData {
    gameId: number
    serverId: number
    time: number
    param_1: string
}

interface Iproto_lc_get_miniGame_by_id_ack {
    opcode: 'proto_lc_get_miniGame_by_id_ack'
    result: number
    serverDatas: Iproto_ServerData2[]
}

interface Iproto_bc_round_award_items_not {
    opcode: 'proto_bc_round_award_items_not'
    round: number
    items: Iproto_RoundAwardItem[]
}

interface Iproto_cb_get_match_data_req {
    opcode: 'proto_cb_get_match_data_req'
}

interface Iproto_lc_get_zzyk_status_ack {
    opcode: 'proto_lc_get_zzyk_status_ack'
    remainingDays: number
    ret: number
    money: number
    flag: number
}

interface Iproto_lc_item_config_not {
    opcode: 'proto_lc_item_config_not'
    itemList: number[]
    itemDescs: Iproto_ItemDesc[]
}

interface Iproto_lc_match_require_info_ack {
    opcode: 'proto_lc_match_require_info_ack'
    ret: number
    data: Iproto_MatchInfoNet
}

interface Iproto_cl_dismiss_club_table_req {
    opcode: 'proto_cl_dismiss_club_table_req'
    clubId: number
    serverId: number
    tableId: number
}

interface Iproto_lc_set_user_signin_days_ack {
    opcode: 'proto_lc_set_user_signin_days_ack'
    ret: number
    day: number
    totalday: number
    money: number
}

interface Iproto_RoundAward {
    roundAward: Iproto_RoundAwardItem[]
}

interface Iproto_cb_leave_table_req {
    opcode: 'proto_cb_leave_table_req'
}

interface Iproto_cl_get_game_config_req {
    opcode: 'proto_cl_get_game_config_req'
}

interface Iproto_ExtSigninAward2 {
    today: number
    signinAward: Iproto_ExtSigninAward[]
}

interface Iproto_lc_match_perpare_notf {
    opcode: 'proto_lc_match_perpare_notf'
    matchId: number
    matchOrderId: number
    currentScore: number
    roundIndex: number
    totoalRound: number
    matchType: number
    param: string
    data: Iproto_ServerData2
}

interface Iproto_lc_get_game_config_ack {
    opcode: 'proto_lc_get_game_config_ack'
    gameItems: Iproto_GameConfig[]
}

interface Iproto_cl_get_player_level_req {
    opcode: 'proto_cl_get_player_level_req'
}

interface Iproto_lc_wawaji_list_refresh_not {
    opcode: 'proto_lc_wawaji_list_refresh_not'
}

interface Iproto_cb_get_daily_task_award_req {
    opcode: 'proto_cb_get_daily_task_award_req'
    index: number
}

interface Iproto_lc_get_merged_achieve_award_ack {
    opcode: 'proto_lc_get_merged_achieve_award_ack'
    ret: number
    money: number
    gift: number
    award_0: number
    award_1: number
    award_2: number
    award_3: number
    award_4: number
}

interface Iproto_cb_login_req {
    opcode: 'proto_cb_login_req'
    plyGuid: number
    plyTicket: string
    version: number
    extParam: string
    mainGameId: number
    gameGroup: number
}

interface Iproto_cl_dynamic_sign_get_match_sign_num_req {
    opcode: 'proto_cl_dynamic_sign_get_match_sign_num_req'
    matchTypeId: number
}

interface Iproto_cl_get_serverdata_by_serverid_req {
    opcode: 'proto_cl_get_serverdata_by_serverid_req'
    gameId: number
    serverId: number
}

interface Iproto_cl_match_require_status_req {
    opcode: 'proto_cl_match_require_status_req'
    matchId: number
    matchOrderId: number
    roundIndex: number
}

interface Iproto_cl_get_private_room_rebate_award_req {
    opcode: 'proto_cl_get_private_room_rebate_award_req'
    gameId: number
    inviteCode: number
    type: number
}

interface Iproto_lc_get_rank_list_ack {
    opcode: 'proto_lc_get_rank_list_ack'
    rankList: Iproto_RankItem[]
    type: number
}

interface Iproto_bc_dismiss_club_table_noti {
    opcode: 'proto_bc_dismiss_club_table_noti'
    plyGuid: number
    clubId: number
    inviteCode: number
    msg: string
    plyNickname: string
}

interface Iproto_cb_use_protocol_proto_req {
    opcode: 'proto_cb_use_protocol_proto_req'
}

interface Iproto_cb_dismiss_private_table_req {
    opcode: 'proto_cb_dismiss_private_table_req'
}

interface Iproto_bc_apply_match_ack {
    opcode: 'proto_bc_apply_match_ack'
    ret: number
    initScore: number
}

interface Iproto_PROP_ITEM_DATA {
    index: number
    num: number
}

interface Iproto_cl_get_user_signin_award_req {
    opcode: 'proto_cl_get_user_signin_award_req'
    day: number
}

interface Iproto_bc_item_update_not {
    opcode: 'proto_bc_item_update_not'
    index: number
    num: number
}

interface Iproto_cl_get_achieve_list_req {
    opcode: 'proto_cl_get_achieve_list_req'
}

interface Iproto_lc_get_server_status_not {
    opcode: 'proto_lc_get_server_status_not'
    serverStatus: Iproto_ServerStatus[]
}

interface Iproto_ROOM_LIMIT_INFO {
    mainGameId: number
    serverType: number
    startDate: number
    endDate: number
    startTime: number
    endTime: number
    limitNum: number
}

interface Iproto_lc_get_friend_list_ack20121227 {
    opcode: 'proto_lc_get_friend_list_ack20121227'
    friends: Iproto_FriendData20121227[]
}

interface Iproto_cl_get_user_good_card_req {
    opcode: 'proto_cl_get_user_good_card_req'
    num: number
}

interface Iproto_bc_login_ack {
    opcode: 'proto_bc_login_ack'
    ret: number
    plyBaseData: Iproto_PlyBaseData
    plyStatus: Iproto_PlayerStatus
    errorMsg: string
}

interface Iproto_bc_get_task_award_ack {
    opcode: 'proto_bc_get_task_award_ack'
    ret: number
    taskType: number
    lastTaskIndex: number
    curVal: number
    configRound: number
    luckDrawTimes: number
}

interface Iproto_cl_get_private_game_replay_req {
    opcode: 'proto_cl_get_private_game_replay_req'
    inviteCode: number
    createTime: number
    lastEndTime: number
}

interface Iproto_bc_get_mahjong_quick_daily_task_data_ack {
    opcode: 'proto_bc_get_mahjong_quick_daily_task_data_ack'
    items: Iproto_MergedAchieveData[]
}

interface Iproto_cl_match_reborn_req {
    opcode: 'proto_cl_match_reborn_req'
    plyGuid: number
    matchId: number
    matchOrderId: number
    roundIndex: number
}

interface Iproto_FriendData {
    plyGuid: number
    plyNickname: string
    plyMoney: number
    plyVipLev: number
    plyUnreadMsgNum: number
    plyType: number
}

interface Iproto_lc_continuous_landing_get_reward_ack {
    opcode: 'proto_lc_continuous_landing_get_reward_ack'
    ret: number
    index: number
    value: number
}

interface Iproto_cl_get_assist_info_data_req {
    opcode: 'proto_cl_get_assist_info_data_req'
    gameId: number
}

interface Iproto_ItemData {
    index: number
    num: number
    gameId: number
    param_1: number
    param_2: number
    name: string
    url: string
}

interface Iproto_cl_op_friend_req {
    opcode: 'proto_cl_op_friend_req'
    opcode: number
    plyGuid: number
}

interface Iproto_Cluc_Rule_Info {
    clubId: number
    gameId: number
    ruleId: number
    rule: string
    ruleName: string
}

interface Iproto_cl_player_signature_req {
    opcode: 'proto_cl_player_signature_req'
    flag: number
    plyGuid: number
    signature: string
}

interface Iproto_cb_get_table_list_req2 {
    opcode: 'proto_cb_get_table_list_req2'
}

interface Iproto_bc_chat_ack {
    opcode: 'proto_bc_chat_ack'
    ret: number
    num: number
    msg: string
}

interface Iproto_cl_set_ply_city_data_req {
    opcode: 'proto_cl_set_ply_city_data_req'
    nProv: number
    nCity: number
    nCounty: number
}

interface Iproto_cb_get_rank_list_req {
    opcode: 'proto_cb_get_rank_list_req'
    type: number
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

interface Iproto_cl_get_dynamic_award_rank_req {
    opcode: 'proto_cl_get_dynamic_award_rank_req'
    matchId: number
}

interface Iproto_cl_get_private_game_statistics_req {
    opcode: 'proto_cl_get_private_game_statistics_req'
    time: number
}

interface Iproto_cl_check_relief_status_req {
    opcode: 'proto_cl_check_relief_status_req'
    type: number
}

interface Iproto_lc_trumpet_not {
    opcode: 'proto_lc_trumpet_not'
    plyGuid: number
    plyNickname: string
    message: string
    gameId: number
    gameName: string
    vipLevel: number
    userLevel: number
}

interface Iproto_lc_get_user_signin_award_info_ack {
    opcode: 'proto_lc_get_user_signin_award_info_ack'
    ret: number
    signinAward: Iproto_SigninAward2
}

interface Iproto_cl_get_ply_status_req {
    opcode: 'proto_cl_get_ply_status_req'
    players: number[]
}

interface Iproto_lc_get_private_room_data_ack {
    opcode: 'proto_lc_get_private_room_data_ack'
    ret: number
    curTime: number
    status: number
    inviteInfo: Iproto_PrivateInviteRoomData[]
}

interface Iproto_SigninAward2 {
    today: number
    signinAward: Iproto_SigninAward[]
}

interface Iproto_Dynamic_Award {
    level: number
    playerNum: number
    awardIndex: number
    awardNum: number
}

interface Iproto_cl_get_ply_city_data_req {
    opcode: 'proto_cl_get_ply_city_data_req'
    plyGuid: number
}

interface Iproto_lc_get_position_info_ack {
    opcode: 'proto_lc_get_position_info_ack'
    plyGuid: number
    dstGuid: number
    latitude: number
    longitude: number
}

interface Iproto_lc_club_create_table_ack {
    opcode: 'proto_lc_club_create_table_ack'
    ret: number
    serverId: number
    tableId: number
}

interface Iproto_cl_get_ply_current_rank_req {
    opcode: 'proto_cl_get_ply_current_rank_req'
    matchId: number
    matchOrderId: number
}

interface Iproto_cb_match_survival_config_req {
    opcode: 'proto_cb_match_survival_config_req'
}

interface Iproto_bc_rematch_notf {
    opcode: 'proto_bc_rematch_notf'
    matchId: number
    matchOrderId: number
    param: string
    currentScore: number
    roundIndex: number
    totoalRound: number
}

interface Iproto_cl_get_safe_data_req {
    opcode: 'proto_cl_get_safe_data_req'
    plyGuid: number
}

interface Iproto_cl_get_merged_achieve_award_req {
    opcode: 'proto_cl_get_merged_achieve_award_req'
    gameId: number
    index: number
}

interface Iproto_MatchInfo {
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

interface Iproto_cb_get_luck_draw_record_req {
    opcode: 'proto_cb_get_luck_draw_record_req'
}

interface Iproto_lc_get_user_accumulate_signin_award_ack {
    opcode: 'proto_lc_get_user_accumulate_signin_award_ack'
    ret: number
    continupusDays: number
    accumulateDays: number
}

interface Iproto_cl_club_rule_change_noti {
    opcode: 'proto_cl_club_rule_change_noti'
    clubId: number
}

interface Iproto_bc_below_admission_limit_tip_not {
    opcode: 'proto_bc_below_admission_limit_tip_not'
    type: number
    money: number
    message: string
}

interface Iproto_bc_cli_timer_not {
    opcode: 'proto_bc_cli_timer_not'
    plyGuid: number
    idleTime: number
}

interface Iproto_lc_server_data_not {
    opcode: 'proto_lc_server_data_not'
    serverDatas: Iproto_ServerData[]
}

interface Iproto_cl_load_club_table_rule_req {
    opcode: 'proto_cl_load_club_table_rule_req'
    clubId: number
    gameId: number
    ruleId: number
    typeId: number
}

interface Iproto_bc_change_dila_ack {
    opcode: 'proto_bc_change_dila_ack'
    ret: number
    data: Iproto_DilaData
}

interface Iproto_cl_get_unread_msg_req {
    opcode: 'proto_cl_get_unread_msg_req'
    sndGuid: number
    timestamp: number
}

interface Iproto_cb_change_dila_req {
    opcode: 'proto_cb_change_dila_req'
    dilaId: number
}

interface Iproto_lc_login_online_data_not {
    opcode: 'proto_lc_login_online_data_not'
    plyGuid: number
    seconds: number
    isBinding: number
    isModal: number
    message: string
}

interface Iproto_lc_modify_password_safe_ack {
    opcode: 'proto_lc_modify_password_safe_ack'
    ret: number
    plyGuid: number
}

interface Iproto_bc_cur_table_round_notf {
    opcode: 'proto_bc_cur_table_round_notf'
    curTableRound: number
    totoalTableRound: number
    param1: number
    param2: number
    paramStr: string
}

interface Iproto_lc_get_turntable_login_award_config_ack {
    opcode: 'proto_lc_get_turntable_login_award_config_ack'
    ret: number
    allItems: Iproto_ItemData[]
    resultIndex: number
}

interface Iproto_lc_op_friend_ack {
    opcode: 'proto_lc_op_friend_ack'
    ret: number
    opcode: number
    plyGuid: number
}

interface Iproto_cl_get_zzyk_status_req {
    opcode: 'proto_cl_get_zzyk_status_req'
    flag: number
}

interface Iproto_lc_integal_condition_noti {
    opcode: 'proto_lc_integal_condition_noti'
    type: number
    ruleId: number
    ruleIdAndroid: number
    ruleDesc: string
}

interface Iproto_cb_match_stage_config_req {
    opcode: 'proto_cb_match_stage_config_req'
    matchTypeId: number
}

interface Iproto_cl_get_mail_info_req {
    opcode: 'proto_cl_get_mail_info_req'
    plyId: number
    gameId: number
}

interface Iproto_lc_get_win_round_score_ack {
    opcode: 'proto_lc_get_win_round_score_ack'
    ret: number
    plyGuid: number
    num: number
    score: number
    maxNum: number
    maxScore: number
}

interface Iproto_lc_get_server_status_ack {
    opcode: 'proto_lc_get_server_status_ack'
    ret: number
    serverStatus: Iproto_ServerData2[]
}

interface Iproto_ClubGroupMsg {
    clubId: number
    groupList: Iproto_ClubGroupMemMsg[]
}

interface Iproto_lc_update_achieve_award_not {
    opcode: 'proto_lc_update_achieve_award_not'
    index: number
    name: string
    desc: string
}

interface Iproto_lc_match_unfinished_notf {
    opcode: 'proto_lc_match_unfinished_notf'
    data: Iproto_MatchInfoNet
}

interface Iproto_bc_get_mahjong_quick_daily_task_award_ack {
    opcode: 'proto_bc_get_mahjong_quick_daily_task_award_ack'
    ret: number
    money: number
    gift: number
    award_0: number
    award_1: number
    award_2: number
    award_3: number
    award_4: number
}

interface Iproto_lc_match_lost_notf {
    opcode: 'proto_lc_match_lost_notf'
    plyGuid: number
    canRelive: number
    reliveCount: number
    matchId: number
    matchOrderId: number
    roundIndex: number
    totoalRound: number
    matchType: number
    data: Iproto_MatchPlayerData
}

interface Iproto_cl_club_get_room_list_by_rule_req {
    opcode: 'proto_cl_club_get_room_list_by_rule_req'
    clubId: number
    ruleId: number
}

interface Iproto_RoundAwardData {
    taskType: number
    taskIndex: number
    awardRound: number
    awardName: string
    items: Iproto_ItemAwardData[]
}

interface Iproto_bc_give_gift_ack {
    opcode: 'proto_bc_give_gift_ack'
    ret: number
    balance: number
}

interface Iproto_ServerStatus {
    serverId: number
    onlineNum: number
}

interface Iproto_cl_web_socket_shake_hand_req {
    opcode: 'proto_cl_web_socket_shake_hand_req'
    webSocketKey: string
}

interface Iproto_cl_get_season_card_status_req {
    opcode: 'proto_cl_get_season_card_status_req'
    cardType: number
}

interface Iproto_cl_get_friend_list_req {
    opcode: 'proto_cl_get_friend_list_req'
}

interface Iproto_lc_get_merged_achieve_list_data_ack {
    opcode: 'proto_lc_get_merged_achieve_list_data_ack'
    items: Iproto_MergedAchieveData[]
}

interface Iproto_PlyBaseData20121227 {
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

interface Iproto_cl_update_player_marriage_req {
    opcode: 'proto_cl_update_player_marriage_req'
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

interface Iproto_ServerData2 {
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

interface Iproto_lc_get_user_level_desc_ack {
    opcode: 'proto_lc_get_user_level_desc_ack'
    ret: number
    levelDesc: Iproto_UserLevelDesc[]
}

interface Iproto_cl_get_position_info_req {
    opcode: 'proto_cl_get_position_info_req'
    dstGuid: number
}

interface Iproto_bc_match_rank_not {
    opcode: 'proto_bc_match_rank_not'
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

interface Iproto_PlayerStatus20121227 {
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

interface Iproto_lc_load_dwc_room_info_ack {
    opcode: 'proto_lc_load_dwc_room_info_ack'
    ackInfo: Iproto_DwcRoomInfo[]
}

interface Iproto_PrivateCardCostData {
    gameId: number
    serverId: number
    minute: number
    num: number
    autoScore: number
    roomCardIndex: number
}

interface Iproto_cl_load_dwc_room_info_req {
    opcode: 'proto_cl_load_dwc_room_info_req'
    autoId: number
    gameId: number
    isFull: number
}

interface Iproto_cl_set_password_safe_req {
    opcode: 'proto_cl_set_password_safe_req'
    plyGuid: number
    password: string
    mobile: string
}

interface Iproto_lc_server_status_not {
    opcode: 'proto_lc_server_status_not'
    serverStatus: Iproto_ServerStatus[]
}

interface Iproto_lc_rp_check_relief_status_ack {
    opcode: 'proto_lc_rp_check_relief_status_ack'
    ret: number
    roomType: number
    curReliefTimes: number
    reliefIndex: number
    reliefAward: number
    reliefTimesMax: number
}

interface Iproto_ItemData20121227 {
    index: number
    num: number
}

interface Iproto_cl_friend_approve_ack {
    opcode: 'proto_cl_friend_approve_ack'
    ret: number
    sndPlyGuid: number
    message: string
}

interface Iproto_bc_get_online_award_items_ack {
    opcode: 'proto_bc_get_online_award_items_ack'
    ret: number
    items: Iproto_OnlineAwardItems[]
}

interface Iproto_lc_get_friend_list_ack {
    opcode: 'proto_lc_get_friend_list_ack'
    friends: Iproto_FriendData[]
}

interface Iproto_lc_web_socket_shake_hand_ack {
    opcode: 'proto_lc_web_socket_shake_hand_ack'
    webSocketKey: string
}

interface Iproto_ContinuousSigninAward {
    days: number
    awardStrings: string
}

interface Iproto_lc_room_limit_refresh_not {
    opcode: 'proto_lc_room_limit_refresh_not'
    mainGameId: number
}

interface Iproto_bc_recharge_tip_not {
    opcode: 'proto_bc_recharge_tip_not'
    type: number
    money: number
    message: string
}

interface Iproto_lc_get_user_signin_award_ack {
    opcode: 'proto_lc_get_user_signin_award_ack'
    ret: number
    day: number
}

interface Iproto_lc_spec_trumpet_not {
    opcode: 'proto_lc_spec_trumpet_not'
    gameId: number
    plyGuid: number
    plyNickname: string
    message: string
    image: string
}

interface Iproto_cb_get_table_list_req {
    opcode: 'proto_cb_get_table_list_req'
}

interface Iproto_cl_get_relief_req {
    opcode: 'proto_cl_get_relief_req'
    type: number
}

interface Iproto_lc_get_ply_status_ack {
    opcode: 'proto_lc_get_ply_status_ack'
    players: Iproto_PlayerStatus[]
}

interface Iproto_cb_get_task_award_req {
    opcode: 'proto_cb_get_task_award_req'
    type: number
    taskType: number
    lastTaskIndex: number
}

interface Iproto_lc_get_extra_relief_list_ack {
    opcode: 'proto_lc_get_extra_relief_list_ack'
    extraReliefs: Iproto_ExtraRelief[]
}

interface Iproto_PlySvrStatus {
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

interface Iproto_cl_sign_match_req {
    opcode: 'proto_cl_sign_match_req'
    matchType: number
    signIndex: number
    signType: number
}

interface Iproto_MatchTransferData {
    plyGuid: number
    matchId: number
    matchStatus: number
    mainGameId: number
    version: number
    isPreRelivePlayer: number
    reliveTime: number
    reliveItemNum: number
}

interface Iproto_lc_club_get_member_list_ack {
    opcode: 'proto_lc_club_get_member_list_ack'
    clubUid: number
    members: Iproto_ClubMemberInfo[]
}

interface Iproto_cb_give_back_win_money_req {
    opcode: 'proto_cb_give_back_win_money_req'
    srcGuid: number
    dstGuid: number
    moneyAmount: number
}

interface Iproto_PlyDataItem {
    reason: number
    index: number
    variant: number
}

interface Iproto_bc_match_table_by_marriage_ack {
    opcode: 'proto_bc_match_table_by_marriage_ack'
    ret: number
}

interface Iproto_br_need_send_robot_not {
    opcode: 'proto_br_need_send_robot_not'
    tableId: number
    needGender: number
}

interface Iproto_bc_use_spec_props_not {
    opcode: 'proto_bc_use_spec_props_not'
    srcPlyGuid: number
    dstPlyGuid: number
    index: number
    amount: number
}

interface Iproto_bc_kickout_ack {
    opcode: 'proto_bc_kickout_ack'
    ret: number
    dstPlyGuid: number
    itemNum: number
}

interface Iproto_robot_info {
    onlineRobot: number
    ingameRobot: number
    robotInQueue: number
    lastMatchZeit: number
}

interface Iproto_UserLevelDesc {
    level: number
    desc: string
    colorId: number
}

interface Iproto_bc_send_prop_ack {
    opcode: 'proto_bc_send_prop_ack'
    ret: number
    dstPlyGuid: number
    index: number
    itemNum: number
}

interface Iproto_bc_get_luck_draw_data_list_ack {
    opcode: 'proto_bc_get_luck_draw_data_list_ack'
    ret: number
    items: Iproto_LuckDrawItemData[]
}

interface Iproto_bc_give_back_win_money_ack {
    opcode: 'proto_bc_give_back_win_money_ack'
    ret: number
    frdNickname: string
    moneyAmount: number
}

interface Iproto_lc_get_player_level_ack {
    opcode: 'proto_lc_get_player_level_ack'
    ret: number
    level: number
    exp: number
    nextExp: number
}

interface Iproto_cl_quit_sign_match_req {
    opcode: 'proto_cl_quit_sign_match_req'
    matchId: number
}

interface Iproto_bc_get_table_list_ack {
    opcode: 'proto_bc_get_table_list_ack'
    items: Iproto_TableItemAttr[]
}

interface Iproto_cb_chat_req {
    opcode: 'proto_cb_chat_req'
    type: number
    message: string
}

interface Iproto_lc_match_result_notf {
    opcode: 'proto_lc_match_result_notf'
    matchId: number
    matchName: string
    rankIndex: number
    matchType: number
    plyVec: Iproto_MatchPlayerRank[]
}

interface Iproto_lc_user_data_broadcast_msg_not {
    opcode: 'proto_lc_user_data_broadcast_msg_not'
    plyGuid: number
    message: string
}

interface Iproto_AchieveData {
    index: number
    value: number
    max: number
    status: number
    moneyAward: number
    giftAward: number
    name: string
    desc: string
}

interface Iproto_SeasonCardAwardInfo {
    awardIndex: number
    awardNum: number
}

interface Iproto_bc_join_table_ack {
    opcode: 'proto_bc_join_table_ack'
    ret: number
    tableAttrs: Iproto_TableAttr
    errMsg: string
}

interface Iproto_bc_get_finished_newbie_award_ack {
    opcode: 'proto_bc_get_finished_newbie_award_ack'
    ret: number
    status: number
    index: number
    num: number
}

interface Iproto_ExtSigninAward {
    days: number
    name: string
    awards: Iproto_ItemData[]
    state: number
}

interface Iproto_PrivateInvite {
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

interface Iproto_lc_update_extra_login_award_not {
    opcode: 'proto_lc_update_extra_login_award_not'
    items: Iproto_ExtraLoginAward[]
    msg: string
}

interface Iproto_cl_get_user_level_desc_req {
    opcode: 'proto_cl_get_user_level_desc_req'
}

interface Iproto_PrivateReplaySelf {
    plyGuid: number
    nickName: string
    winLose: number
}

interface Iproto_cb_get_private_invite_req {
    opcode: 'proto_cb_get_private_invite_req'
}

interface Iproto_lc_club_updata_limit_group_list_ack {
    opcode: 'proto_lc_club_updata_limit_group_list_ack'
    ret: number
    type: number
}

interface Iproto_lc_match_round_avoid_notf {
    opcode: 'proto_lc_match_round_avoid_notf'
    plyGuid: number
    matchId: number
    matchOrderId: number
    roundIndex: number
    totoalRound: number
}

interface Iproto_lc_club_get_room_list_by_rule_ack {
    opcode: 'proto_lc_club_get_room_list_by_rule_ack'
    clubId: number
    ruleId: number
    tableInfos: Iproto_ClubTableInfoV2[]
}

interface Iproto_ATAchieveData {
    gameId: number
    type: number
    index: number
    cond: number
    value: number
    max: number
    status: number
    merge: number
    vecAwards: Iproto_ATAchieveAward[]
    name: string
    desc: string
}

interface Iproto_lc_sync_item_data_notf {
    opcode: 'proto_lc_sync_item_data_notf'
    itemIndex: number
    itemNum: number
}

interface Iproto_lc_get_private_invite_info_ack {
    opcode: 'proto_lc_get_private_invite_info_ack'
    ret: number
    privateInvite: Iproto_PrivateInvite
}

interface Iproto_cb_get_win_round_score_req {
    opcode: 'proto_cb_get_win_round_score_req'
    plyGuid: number
}

interface Iproto_ExtSigninInfo {
    signinDays: number[]
    buqianka: number
    signinAwardTable: Iproto_ExtSigninAward2
}

interface Iproto_MatchInfoNet {
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
    data: Iproto_ServerData2
}

interface Iproto_lc_club_change_setting_ack {
    opcode: 'proto_lc_club_change_setting_ack'
    clubUid: number
    ret: number
    hasAutoCreateRoom: number
}

interface Iproto_DwcRoomInfo {
    autoId: number
    jsonContent: string
}

interface Iproto_cl_get_user_signin_days_req {
    opcode: 'proto_cl_get_user_signin_days_req'
}

interface Iproto_TableAttr {
    tableId: number
    name: string
    lock: number
    players: Iproto_PlyBaseData[]
}

interface Iproto_lc_get_private_room_rebate_award_ack {
    opcode: 'proto_lc_get_private_room_rebate_award_ack'
    ret: number
    rebate: number
    type: number
}

interface Iproto_PlySvrStatus20121227 {
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

interface Iproto_bc_give_gift_not {
    opcode: 'proto_bc_give_gift_not'
    srcPlyGuid: number
    dstPlyGuid: number
    amount: number
}

interface Iproto_cl_get_user_signin_days_ext_req {
    opcode: 'proto_cl_get_user_signin_days_ext_req'
}

interface Iproto_lc_get_ply_current_rank_ack {
    opcode: 'proto_lc_get_ply_current_rank_ack'
    ret: number
    plyGuid: number
    rank: number
}

interface Iproto_lc_set_club_create_table_rule_ack {
    opcode: 'proto_lc_set_club_create_table_rule_ack'
    ret: number
    clubId: number
    ruleId: number
}

interface Iproto_lc_club_invite_to_game_noti {
    opcode: 'proto_lc_club_invite_to_game_noti'
    clubUid: number
    clubName: string
    fromPlyGuid: number
    plyNickname: string
    inviteCode: number
}

interface Iproto_lc_private_card_index_not {
    opcode: 'proto_lc_private_card_index_not'
    privateCardIndex: number
    privateCardPrice: number
}

interface Iproto_bc_get_table_list_ack2 {
    opcode: 'proto_bc_get_table_list_ack2'
    items: Iproto_TableItemAttr2[]
}

interface Iproto_lc_club_get_club_limit_group_list_ack {
    opcode: 'proto_lc_club_get_club_limit_group_list_ack'
    ret: number
    clubId: number
    groupList: Iproto_ClubGroupMemMsg[]
}

interface Iproto_bc_get_daily_task_award_not {
    opcode: 'proto_bc_get_daily_task_award_not'
    index: number
    name: string
    desc: string
}

interface Iproto_cl_remove_safe_amount_req {
    opcode: 'proto_cl_remove_safe_amount_req'
    plyGuid: number
    amount: number
    password: string
}

interface Iproto_ClubMemberInfo {
    plyGuid: number
    nickname: string
    plyState: number
}

interface Iproto_cl_club_get_limit_group_list_req {
    opcode: 'proto_cl_club_get_limit_group_list_req'
}

interface Iproto_lc_check_relief_status_ack {
    opcode: 'proto_lc_check_relief_status_ack'
    ret: number
    currentRelief: number
    reliefTimeLeft: number
    reliefAwardCount: number
    reliefCd: number
    currentRelief_2: number
    reliefTimesMax: number
}

interface Iproto_ExtraLoginAward {
    type: number
    status: number
}

interface Iproto_cl_get_user_accumulate_signin_days_req {
    opcode: 'proto_cl_get_user_accumulate_signin_days_req'
}

interface Iproto_bc_get_online_award_ack {
    opcode: 'proto_bc_get_online_award_ack'
    ret: number
    remain: number
    money: number
}

interface Iproto_lc_get_continuous_game_award_ack {
    opcode: 'proto_lc_get_continuous_game_award_ack'
    ret: number
    money: number
}

interface Iproto_bc_update_feel_value_not {
    opcode: 'proto_bc_update_feel_value_not'
    frdUid: number
    frdNickname: string
    feelValue: number
}

interface Iproto_cb_get_relief_req {
    opcode: 'proto_cb_get_relief_req'
}

interface Iproto_lc_get_private_room_log_data_ack {
    opcode: 'proto_lc_get_private_room_log_data_ack'
    ret: number
    logData: Iproto_PrivateLogData[]
}

interface Iproto_ServerData {
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

interface Iproto_lc_get_achieve_list_ack {
    opcode: 'proto_lc_get_achieve_list_ack'
    items: Iproto_AchieveData[]
}

interface Iproto_bc_update_ply_data_not {
    opcode: 'proto_bc_update_ply_data_not'
    plyGuid: number
    uptReason: number
    uptType: number
    variant: number
    amount: number
}

interface Iproto_lc_get_turntable_login_award_ack {
    opcode: 'proto_lc_get_turntable_login_award_ack'
    ret: number
    awardItems: Iproto_ItemData[]
}

interface Iproto_bc_award_type_not {
    opcode: 'proto_bc_award_type_not'
    type: number[]
}

interface Iproto_cl_get_match_rank_req {
    opcode: 'proto_cl_get_match_rank_req'
    matchId: number
    matchOrderId: number
    roundIndex: number
}

interface Iproto_lc_get_player_game_list_ack {
    opcode: 'proto_lc_get_player_game_list_ack'
    ret: number
    serverStatus: Iproto_ServerData2[]
}

interface Iproto_SigninInfo {
    signinDays: number[]
    buqianka: number
    signinAward: Iproto_SigninAward2
}

interface Iproto_lc_sign_match_ack {
    opcode: 'proto_lc_sign_match_ack'
    ret: number
    matchId: number
}

interface Iproto_bc_game_get_score_noti {
    opcode: 'proto_bc_game_get_score_noti'
    rankScore: number
}

interface Iproto_lc_get_season_card_status_ack {
    opcode: 'proto_lc_get_season_card_status_ack'
    ret: number
    startDate: number
    endDate: number
    cardType: number
}

interface Iproto_bc_create_table_ack20121227 {
    opcode: 'proto_bc_create_table_ack20121227'
    ret: number
    tableAttrs: Iproto_TableAttr20121227
}

interface Iproto_lc_get_match_sign_num_ack {
    opcode: 'proto_lc_get_match_sign_num_ack'
    matchTypeId: number
    matchId: number
    playerNum: number
    signNum: number
    nextMatchBeginTime: number
    signStatus: number
}

interface Iproto_lc_get_three_draw_data_ack {
    opcode: 'proto_lc_get_three_draw_data_ack'
    ret: number
    times: number
}

interface Iproto_cb_player_join_match_req {
    opcode: 'proto_cb_player_join_match_req'
    matchId: number
    matchOrderId: number
}

interface Iproto_lc_sys_feel_not {
    opcode: 'proto_lc_sys_feel_not'
    sendGuid: number
}

interface Iproto_CLUB_MEMBER_CHANGE {
    type: number
    clubUid: number
    plyGuid: number
    nickname: string
    mainGameId: number
    clubName: string
}

interface Iproto_bc_get_win_round_score_ack {
    opcode: 'proto_bc_get_win_round_score_ack'
    ret: number
    plyGuid: number
    num: number
    score: number
    maxNum: number
    maxScore: number
}

interface Iproto_lc_do_sign_match_ack {
    opcode: 'proto_lc_do_sign_match_ack'
    ret: number
    matchId: number
    operateType: number
}

interface Iproto_lc_get_achieve_award_ack {
    opcode: 'proto_lc_get_achieve_award_ack'
    ret: number
    money: number
    gift: number
}

interface Iproto_cl_get_fetion_rank_list_req {
    opcode: 'proto_cl_get_fetion_rank_list_req'
}

interface Iproto_bc_get_spec_props_list_ack {
    opcode: 'proto_bc_get_spec_props_list_ack'
    ret: number
    props: Iproto_SpecProps[]
}

interface Iproto_bc_get_relief_ack {
    opcode: 'proto_bc_get_relief_ack'
    ret: number
}

interface Iproto_lc_club_get_limit_group_list_ack {
    opcode: 'proto_lc_club_get_limit_group_list_ack'
    ret: number
    clubGroupList: Iproto_ClubGroupMsg[]
}

interface Iproto_cl_get_server_status_req {
    opcode: 'proto_cl_get_server_status_req'
    gameId: number
}

interface Iproto_cl_get_achieve_ext_award_req {
    opcode: 'proto_cl_get_achieve_ext_award_req'
    index: number
}

interface Iproto_ServerData2Ext {
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

interface Iproto_lc_get_ply_city_data_ack {
    opcode: 'proto_lc_get_ply_city_data_ack'
    plyGuid: number
    nProv: number
    nCity: number
    nCounty: number
}

interface Iproto_cb_use_spec_props_req {
    opcode: 'proto_cb_use_spec_props_req'
    dstPlyGuid: number
    index: number
    amount: number
}

interface Iproto_lc_get_rp_relief_ack {
    opcode: 'proto_lc_get_rp_relief_ack'
    ret: number
}

interface Iproto_cl_club_change_setting_req {
    opcode: 'proto_cl_club_change_setting_req'
    clubUid: number
    hasAutoCreateRoom: number
}

interface Iproto_PrivateReplay {
    index: number
    inviteCode: number
    createTime: number
    endTime: number
    plyDatas: Iproto_PrivateReplaySelf[]
}

interface Iproto_LoginAward2 {
    today: number
    loginAward: Iproto_LoginAward[]
}

interface Iproto_cb_get_spec_props_list_req {
    opcode: 'proto_cb_get_spec_props_list_req'
}

interface Iproto_lc_get_all_frd_feel_value_ack {
    opcode: 'proto_lc_get_all_frd_feel_value_ack'
}

interface Iproto_cl_trumpet_req {
    opcode: 'proto_cl_trumpet_req'
    type: number
    message: string
    gameId: number
}

interface Iproto_bc_match_update_achiev_noti {
    opcode: 'proto_bc_match_update_achiev_noti'
    matchId: number
    achievType: number
    achievLevel: number
    achievValue: number
    validRoundNum: number
}

interface Iproto_cl_get_turntable_login_award_config_req {
    opcode: 'proto_cl_get_turntable_login_award_config_req'
    gameId: number
}

interface Iproto_CLUB_INFO_CHANGE {
    type: number
    clubUid: number
    mainGameId: number
    clubName: string
    usedCardLimit: number
    allowCreateRoom: number
}

interface Iproto_cl_send_friend_msg_req {
    opcode: 'proto_cl_send_friend_msg_req'
    rcvGuid: number
    type: number
    message: string
}

interface Iproto_lc_set_password_safe_ack {
    opcode: 'proto_lc_set_password_safe_ack'
    ret: number
    plyGuid: number
}

interface Iproto_ExtraRelief {
    id: number
    gameId: number
    status: number
    param: string
}

interface Iproto_lc_reload_user_data_ack {
    opcode: 'proto_lc_reload_user_data_ack'
    ret: number
    money: number
    gift: number
    level: number
    param: string
}

interface Iproto_LC_MATCH_INFO {
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

interface Iproto_RankItem {
    index: number
    plyGuid: number
    plyNickname: string
    plyStatus: number
    serverId: number
    tableId: number
    param1: number
    param2: number
}

interface Iproto_OnlineRankItem {
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

interface Iproto_bc_match_stage_message_noti {
    opcode: 'proto_bc_match_stage_message_noti'
    matchId: number
    stage: number
    playerNum: number
    type: number
    totalScore: number
    curTableNum: number
}

interface Iproto_cl_get_private_room_log_data_req {
    opcode: 'proto_cl_get_private_room_log_data_req'
    gameId: number
    inviteCode: number
}

interface Iproto_cl_continuous_landing_get_reward_req {
    opcode: 'proto_cl_continuous_landing_get_reward_req'
    subGameId: number
}

interface Iproto_cb_match_join_flow_match_req {
    opcode: 'proto_cb_match_join_flow_match_req'
    matchType: number
    matchMinNum: number
}

interface Iproto_MatchPlayerRank {
    rankIndex: number
    plyGuid: number
}

interface Iproto_MatchPlayerData {
    plyGuid: number
    currentScore: number
    reliveCount: number
    avoidCount: number
    tableIndex: number
    nickName: string
}

interface Iproto_robot_money_status {
    money: number
    robotNum: number
}

interface Iproto_AssistInfoData {
    index: number
    num: number
    gameId: number
}

interface Iproto_FriendMsg {
    rcvPlyGuid: number
    sndPlyGuid: number
    sndNickname: string
    message: string
    type: number
    time: number
}

interface Iproto_lc_send_vip_data_change_not {
    opcode: 'proto_lc_send_vip_data_change_not'
    vipLevel: number
    vipRate: number
    nextVipneedMoney: number
    param: string
}

interface Iproto_PrivateStatistics {
    time: number
    gameId: number
    inviteCode: number
    itemIndex: number
    itemNum: number
    gameName: string
}

interface Iproto_cl_update_achieve_req {
    opcode: 'proto_cl_update_achieve_req'
    index: number
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

interface Iproto_TableInfo {
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

interface Iproto_gm_get_srv_status_ack {
    opcode: 'proto_gm_get_srv_status_ack'
}

interface Iproto_cb_get_player_feel_value_req {
    opcode: 'proto_cb_get_player_feel_value_req'
    plyGuid: number
}

interface Iproto_cb_update_big_card_user_info_req {
    opcode: 'proto_cb_update_big_card_user_info_req'
    playerId: string
    sessionId: string
}

interface Iproto_cl_get_relief_times_req {
    opcode: 'proto_cl_get_relief_times_req'
}

interface Iproto_PrivateRoomData {
    gameId: number
    baseScore: number
    serviceFee: number
    minMoney: number
    index: number
    num: number
    param_1: number
    param_2: string
}

interface Iproto_cb_user_join_table_req {
    opcode: 'proto_cb_user_join_table_req'
    tableId: number
    chairId: number
}

interface Iproto_gm_get_srv_status_req {
    opcode: 'proto_gm_get_srv_status_req'
    type: number
}

interface Iproto_bc_message_not {
    opcode: 'proto_bc_message_not'
    type: number
    message: string
}

interface Iproto_cl_spec_trumpet_req {
    opcode: 'proto_cl_spec_trumpet_req'
    gameId: number
    message: string
    image: string
}

interface Iproto_bc_match_join_flow_match_ack {
    opcode: 'proto_bc_match_join_flow_match_ack'
    ret: number
    matchId: number
}

interface Iproto_bc_match_scores_not {
    opcode: 'proto_bc_match_scores_not'
    tableScores: number[]
}

interface Iproto_lc_get_user_good_card_ack {
    opcode: 'proto_lc_get_user_good_card_ack'
    ret: number
    num: number
}

interface Iproto_lc_get_relief_ack {
    opcode: 'proto_lc_get_relief_ack'
    ret: number
}

interface Iproto_lc_verity_ticket_ack {
    opcode: 'proto_lc_verity_ticket_ack'
    ret: number
    plyLobbyData: Iproto_PlyLobbyData
    plyStatus: Iproto_PlayerStatus
    plyLoginAward: Iproto_LoginAward
    plyItems: Iproto_ItemData[]
    plyLoginAward2: Iproto_LoginAward2
    plyVip: Iproto_VipData
    timeStamp: number
    dailyOnlineTime_: number
}

interface Iproto_lc_get_extra_relief_award_ack {
    opcode: 'proto_lc_get_extra_relief_award_ack'
    id: number
    ret: number
    itemId: number
    itemNum: number
}

interface Iproto_TableAttr20121227 {
    tableId: number
    name: string
    lock: number
    players: Iproto_PlyBaseData20121227[]
}

interface Iproto_MergedAchieveData {
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

interface Iproto_cb_club_create_room_req {
    opcode: 'proto_cb_club_create_room_req'
    clubUid: number
    createType: number
}

interface Iproto_lc_get_private_game_replay_ack {
    opcode: 'proto_lc_get_private_game_replay_ack'
    data: Iproto_PrivateReplay[]
}

interface Iproto_bc_match_survival_config_ack {
    opcode: 'proto_bc_match_survival_config_ack'
    matchId: number
    matchBeginTime: number
    matchGameTime: number
}

interface Iproto_cl_get_merged_daily_task_data_req {
    opcode: 'proto_cl_get_merged_daily_task_data_req'
    gameId: number[]
    scmjFlag: number
}

interface Iproto_PlayerTaskData {
    taskType: number
    lastTaskIndex: number
    curVal: number
}

interface Iproto_bc_match_relive_ack {
    opcode: 'proto_bc_match_relive_ack'
    matchId: number
    ret: number
}

interface Iproto_cl_club_create_table_req {
    opcode: 'proto_cl_club_create_table_req'
    gameId: number
    gameBaseType: number
    clubId: number
    ruleId: number
    tableNo: number
}

interface Iproto_cb_match_relive_req {
    opcode: 'proto_cb_match_relive_req'
    matchId: number
    relive: number
}

interface Iproto_bc_match_relive_noti {
    opcode: 'proto_bc_match_relive_noti'
    matchId: number
    obsoleteEndTime: number
    reliveItemNum: number
    curentReliveTimes: number
    reliveTimesLimit: number
}

interface Iproto_bc_match_transfer_server_noti {
    opcode: 'proto_bc_match_transfer_server_noti'
    matchTypeId: number
    matchId: number
    serverId: number
}

interface Iproto_bc_match_weed_out_score_not {
    opcode: 'proto_bc_match_weed_out_score_not'
    weedOutScore: number
}

interface Iproto_bc_match_cancel_not {
    opcode: 'proto_bc_match_cancel_not'
    matchTypeId: number
    matchId: number
}

interface Iproto_bc_dismiss_private_result_not {
    opcode: 'proto_bc_dismiss_private_result_not'
    ret: number
}

interface Iproto_cl_match_require_info_req {
    opcode: 'proto_cl_match_require_info_req'
    matchId: number
    matchOrderId: number
}

interface Iproto_lc_spec_trumpet_ack {
    opcode: 'proto_lc_spec_trumpet_ack'
    ret: number
    msg: string
}

interface Iproto_cb_get_online_award_items_req {
    opcode: 'proto_cb_get_online_award_items_req'
}

interface Iproto_RoundAwardItem {
    rounds: number
    money: number
    status: number
}

interface Iproto_cl_club_get_member_list_req {
    opcode: 'proto_cl_club_get_member_list_req'
    version: number
    clubUid: number
}

interface Iproto_cl_get_achieve_ext_list_req {
    opcode: 'proto_cl_get_achieve_ext_list_req'
    type: number
}

interface Iproto_cl_get_private_game_data_list_req {
    opcode: 'proto_cl_get_private_game_data_list_req'
    time: number
}

interface Iproto_cb_get_task_system_req {
    opcode: 'proto_cb_get_task_system_req'
}

interface Iproto_cl_get_daily_task_list_req {
    opcode: 'proto_cl_get_daily_task_list_req'
}

interface Iproto_bc_match_sign_num_not {
    opcode: 'proto_bc_match_sign_num_not'
    signNum: number
    minNum: number
}

interface Iproto_cl_synthesis_monkey_req {
    opcode: 'proto_cl_synthesis_monkey_req'
    flag: number
    nMonkeyType: number
}

interface Iproto_cl_get_merged_daily_task_award_req {
    opcode: 'proto_cl_get_merged_daily_task_award_req'
    gameId: number
    index: number
}

interface Iproto_cl_get_card_road_data_req {
    opcode: 'proto_cl_get_card_road_data_req'
    gameId: number
}

interface Iproto_cl_trumpet_by_type_req {
    opcode: 'proto_cl_trumpet_by_type_req'
    type: number
    gameId: number
    param: number
    message: string
    image: string
}

interface Iproto_lc_set_user_accumulate_signin_days_ack {
    opcode: 'proto_lc_set_user_accumulate_signin_days_ack'
    ret: number
    day: number
    continuousDays: number
    accumulatyeDays: number
    money: number
}

interface Iproto_cl_get_zzyk_award_req {
    opcode: 'proto_cl_get_zzyk_award_req'
    flag: number
}

interface Iproto_lc_synthesis_monkey_ack {
    opcode: 'proto_lc_synthesis_monkey_ack'
    ret: number
    nResultMonkeyType: number
}

interface Iproto_bc_player_join_match_ack {
    opcode: 'proto_bc_player_join_match_ack'
    ret: number
}

interface Iproto_ItemAwardData {
    index: number
    number: number
}

interface Iproto_lc_get_safe_history_ack {
    opcode: 'proto_lc_get_safe_history_ack'
    ret: number
    plyGuid: number
    history: Iproto_SafeRecord[]
}

interface Iproto_bc_match_info_noti {
    opcode: 'proto_bc_match_info_noti'
    matchId: number
    matchRules: number
    stagePlayerNums: number[]
}

interface Iproto_bc_join_match_ack {
    opcode: 'proto_bc_join_match_ack'
    ret: number
    matchStatus: number
    matchId: number
    matchType: number
    leftBeginTime: number
}

interface Iproto_lc_update_special_login_award_not {
    opcode: 'proto_lc_update_special_login_award_not'
    message: string
}

interface Iproto_bc_chat_not {
    opcode: 'proto_bc_chat_not'
    plyGuid: number
    nickname: string
    message: string
    vipLevel: number
    userLevel: number
}

interface Iproto_lc_get_match_sign_count_ack {
    opcode: 'proto_lc_get_match_sign_count_ack'
    ret: number
    matchId: number
    count: number
}

interface Iproto_lc_friend_loginout_tip_not {
    opcode: 'proto_lc_friend_loginout_tip_not'
    plyGuid: number
    type: number
}

interface Iproto_cl_get_miniGame_req {
    opcode: 'proto_cl_get_miniGame_req'
    plyGuid: number
    gameId: number
    version: number
}

interface Iproto_bc_get_achieve_award_not {
    opcode: 'proto_bc_get_achieve_award_not'
    index: number
    name: string
    desc: string
}

interface Iproto_cb_change_table_req {
    opcode: 'proto_cb_change_table_req'
}

interface Iproto_bc_force_dismiss_private_table_not {
    opcode: 'proto_bc_force_dismiss_private_table_not'
    chairId: number
    accept: number
    userName: string
}

interface Iproto_cl_get_private_room_data_req {
    opcode: 'proto_cl_get_private_room_data_req'
}

interface Iproto_bc_force_dismiss_private_table_req {
    opcode: 'proto_bc_force_dismiss_private_table_req'
    chairId: number
    time: number
    userName: string
}

interface Iproto_bc_dismiss_private_table_ack {
    opcode: 'proto_bc_dismiss_private_table_ack'
    ret: number
}

interface Iproto_cl_get_player_game_list_req {
    opcode: 'proto_cl_get_player_game_list_req'
    gameList: number[]
}

interface Iproto_cb_reset_match_req {
    opcode: 'proto_cb_reset_match_req'
}

interface Iproto_lc_load_club_table_rule_ack {
    opcode: 'proto_lc_load_club_table_rule_ack'
    ret: number
    clubId: number
}

interface Iproto_lc_get_match_rank_ack {
    opcode: 'proto_lc_get_match_rank_ack'
    matchId: number
    matchOrderId: number
    data: Iproto_MatchPlayerData[]
}

interface Iproto_bc_get_achieve_list_ack {
    opcode: 'proto_bc_get_achieve_list_ack'
    items: Iproto_AchieveData[]
}

interface Iproto_cl_get_match_sign_count_req {
    opcode: 'proto_cl_get_match_sign_count_req'
    matchId: number
}

interface Iproto_cl_get_miniGame_by_id_req {
    opcode: 'proto_cl_get_miniGame_by_id_req'
    plyGuid: number
    gameId: number
    miniGameId: number
    version: number
}

interface Iproto_lc_match_status_notf {
    opcode: 'proto_lc_match_status_notf'
    plyGuid: number
    unfinishedNumber: number
    currentScore: number
    currentRank: number
}

interface Iproto_bc_new_table_not {
    opcode: 'proto_bc_new_table_not'
    tableAttrs: Iproto_TableAttr
}

interface Iproto_lc_end_chat_ack {
    opcode: 'proto_lc_end_chat_ack'
    ret: number
}

interface Iproto_bc_ready_ack {
    opcode: 'proto_bc_ready_ack'
    ret: number
}

interface Iproto_cl_set_user_signin_days_req {
    opcode: 'proto_cl_set_user_signin_days_req'
    day: number
}

interface Iproto_cb_match_get_dynamic_award_req {
    opcode: 'proto_cb_match_get_dynamic_award_req'
    matchId: number
}

interface Iproto_OnlineAwardItems {
    awardTime: number
    moneyAward: number
}

interface Iproto_lc_match_reborn_ack {
    opcode: 'proto_lc_match_reborn_ack'
    ret: number
    matchId: number
    matchOrderId: number
    data: Iproto_MatchPlayerData
}

interface Iproto_PrivateGameDataSelf {
    plyGuid: number
    itemNum: number
    nickName: string
    plyStatus: number
}

interface Iproto_cl_send_ply_position_info_req {
    opcode: 'proto_cl_send_ply_position_info_req'
    plyGuid: number
    latitude: number
    longitude: number
}

interface Iproto_ClubTableInfoV2 {
    inviteCode: number
    tableNo: number
    plyGuids: number[]
    curTableTime: number
    startGameTime: number
}

interface Iproto_cb_create_table_req {
    opcode: 'proto_cb_create_table_req'
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

interface Iproto_cb_send_disconnect_req {
    opcode: 'proto_cb_send_disconnect_req'
}

interface Iproto_lc_get_user_accumulate_signin_days_ack {
    opcode: 'proto_lc_get_user_accumulate_signin_days_ack'
    ret: number
    signinInfo: Iproto_AccumulateSigninInfo
}

interface Iproto_cb_web_socket_shake_hand_req {
    opcode: 'proto_cb_web_socket_shake_hand_req'
    webSocketKey: string
}

interface Iproto_cl_set_user_accumulate_signin_days_req {
    opcode: 'proto_cl_set_user_accumulate_signin_days_req'
    day: number
}

interface Iproto_bc_get_luck_draw_record_ack {
    opcode: 'proto_bc_get_luck_draw_record_ack'
    ret: number
    index: number
    num: number
}

interface Iproto_CommonAwardData {
    fanNum: number
    fanType: number
    contVictory: number
    cardUsedTimes: number
}

interface Iproto_lc_get_private_game_log_ack {
    opcode: 'proto_lc_get_private_game_log_ack'
    results: Iproto_PrivateGameLog[]
}

interface Iproto_ServerKeyInfo {
    gameId: number
    packetName: string
    version: number
}

interface Iproto_cl_continuous_landing_reward_data_req {
    opcode: 'proto_cl_continuous_landing_reward_data_req'
    gameId: number
}

interface Iproto_cl_get_all_frd_feel_value_req {
    opcode: 'proto_cl_get_all_frd_feel_value_req'
}

interface Iproto_cb_get_mahjong_quick_daily_task_data_req {
    opcode: 'proto_cb_get_mahjong_quick_daily_task_data_req'
}

interface Iproto_bc_create_table_ack {
    opcode: 'proto_bc_create_table_ack'
    ret: number
    tableAttrs: Iproto_TableAttr
    errMsg: string
}

interface Iproto_bc_leave_table_ack2 {
    opcode: 'proto_bc_leave_table_ack2'
    ret: number
    plyNickname: string
    msg: string
}

interface Iproto_TableProperty {
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

interface Iproto_lc_send_friend_msg_not {
    opcode: 'proto_lc_send_friend_msg_not'
    content: Iproto_FriendMsg[]
}

interface Iproto_lc_match_victor_noti {
    opcode: 'proto_lc_match_victor_noti'
    matchTypeId: number
    matchId: number
    rank: number
    locatedMainGameId: number
    plyGuid: number
    plyNickname: string
}

interface Iproto_bc_user_level_exp_update_notf {
    opcode: 'proto_bc_user_level_exp_update_notf'
    plyGuid: number
    level: number
    exp: number
    expAdd: number
    nextLevelExpNeed: number
}

interface Iproto_lc_remove_safe_amount_ack {
    opcode: 'proto_lc_remove_safe_amount_ack'
    ret: number
    plyGuid: number
    amount: number
    remainingSum: number
}

interface Iproto_cb_do_tip_dila_req {
    opcode: 'proto_cb_do_tip_dila_req'
    dilaCount: number
}

interface Iproto_ClubTableInfo {
    inviteCode: number
    tableId: number
    name: string
    lock: number
    plyGuids: number[]
    clubUid: number
    gameId: number
}

interface Iproto_bc_update_dila_notf {
    opcode: 'proto_bc_update_dila_notf'
    serverZeit: number
    nickname: string
    data: Iproto_DilaData
}

interface Iproto_lc_get_total_game_round_ack {
    opcode: 'proto_lc_get_total_game_round_ack'
    ret: number
    totalRound: number
}

interface Iproto_cl_get_turntable_login_award_req {
    opcode: 'proto_cl_get_turntable_login_award_req'
    gameId: number
}

interface Iproto_DilaData {
    dilaId: number
    changeCost: number
    dilaName: string
    dilaUrl: string
    currentRecivedMoney: number
    lastTipZeit: number
    changeZeit: number
}

interface Iproto_bc_use_spec_props_ack {
    opcode: 'proto_bc_use_spec_props_ack'
    ret: number
}

interface Iproto_cb_send_prop_req {
    opcode: 'proto_cb_send_prop_req'
    dstPlyGuid: number
    index: number
    amount: number
}

interface Iproto_cl_server_data_req {
    opcode: 'proto_cl_server_data_req'
}

interface Iproto_cb_ply_place_not {
    opcode: 'proto_cb_ply_place_not'
    latitude: number
    longitude: number
}

interface Iproto_lc_dynamic_sign_get_match_sign_num_ack {
    opcode: 'proto_lc_dynamic_sign_get_match_sign_num_ack'
    matchTypeId: number
    matchId: number
    playerNum: number
    signNum: number
    nextMatchBeginTime: number
    signStatus: number
    signEndTime: number
    dynamicSignUpAward: number
}

interface Iproto_cl_get_rank_list_req {
    opcode: 'proto_cl_get_rank_list_req'
    type: number
    latitude: number
    longitude: number
}

interface Iproto_cl_get_at_achieve_award_req {
    opcode: 'proto_cl_get_at_achieve_award_req'
    gameId: number
    index: number
    type: number
}

interface Iproto_lc_player_lost_per_match_notf {
    opcode: 'proto_lc_player_lost_per_match_notf'
    matchType: number
    rank: number
    plyGuid: number
    failOrSuccess: number
    isPerRound: number
}

interface Iproto_SpecProps {
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

interface Iproto_cb_get_finished_newbie_award_req {
    opcode: 'proto_cb_get_finished_newbie_award_req'
    type: number
}

interface Iproto_cl_get_user_signin_award_info_req {
    opcode: 'proto_cl_get_user_signin_award_info_req'
}

interface Iproto_cl_get_safe_history_req {
    opcode: 'proto_cl_get_safe_history_req'
    plyGuid: number
}

interface Iproto_bc_get_streak_task_ack {
    opcode: 'proto_bc_get_streak_task_ack'
    ret: number
    index: number
    name: string
    desc: string
    speed: number
    amount: number
}

interface Iproto_lc_get_merged_daily_task_award_ack {
    opcode: 'proto_lc_get_merged_daily_task_award_ack'
    ret: number
    money: number
    gift: number
    award_0: number
    award_1: number
    award_2: number
    award_3: number
    award_4: number
}

interface Iproto_lc_get_achieve_ext_award_ack {
    opcode: 'proto_lc_get_achieve_ext_award_ack'
    ret: number
    money: number
    gift: number
}

interface Iproto_cl_get_user_accumulate_signin_award_req {
    opcode: 'proto_cl_get_user_accumulate_signin_award_req'
    continupusDays: number
    accumulateDays: number
    type_: number
}

interface Iproto_lc_store_safe_amount_ack {
    opcode: 'proto_lc_store_safe_amount_ack'
    ret: number
    plyGuid: number
}

interface Iproto_cl_do_sign_match_req {
    opcode: 'proto_cl_do_sign_match_req'
    matchId: number
    matchOrderId: number
    operateType: number
}

interface Iproto_GameConfig {
    gameId: number
    gameName: string
}

interface Iproto_lc_club_get_room_property_ack {
    opcode: 'proto_lc_club_get_room_property_ack'
    tablePropertys: Iproto_TableProperty[]
}

interface Iproto_bc_get_rank_list_ack {
    opcode: 'proto_bc_get_rank_list_ack'
    ret: number
    type: number
    rankList: Iproto_OnlineRankItem[]
}

interface Iproto_bc_get_achieve_award_ack {
    opcode: 'proto_bc_get_achieve_award_ack'
    ret: number
    param_1: number
    param_2: number
    param_3: number
    param_4: number
    param_5: number
}

interface Iproto_lc_get_miniGame_ack {
    opcode: 'proto_lc_get_miniGame_ack'
    result: number
    serverDatas: Iproto_ServerData2[]
}

interface Iproto_AccumulateSigninInfo {
    signinDays: number[]
    buqianka: number
    signinAward: Iproto_AccumulateSigninAward
}

interface Iproto_bc_check_relief_status_ack {
    opcode: 'proto_bc_check_relief_status_ack'
    ret: number
    currentRelief: number
    reliefTimeLeft: number
    reliefAwardCount: number
}

interface Iproto_bc_match_get_dynamic_award_ack {
    opcode: 'proto_bc_match_get_dynamic_award_ack'
    ret: number
    signPlayerNum: number
}

interface Iproto_cb_check_relief_status_req {
    opcode: 'proto_cb_check_relief_status_req'
}

interface Iproto_cb_apply_match_req {
    opcode: 'proto_cb_apply_match_req'
    payType: number
}

interface Iproto_bc_get_daily_task_award_ack {
    opcode: 'proto_bc_get_daily_task_award_ack'
    ret: number
    money: number
    gift: number
    prop_1: number
    prop_2: number
    prop_3: number
    prop_4: number
    prop_5: number
}

interface Iproto_PrivateReplayRecord {
    gameId: number
    playerMax: number
    createTime: number
    inviteCode: number
    endTime: number
    param_1: number
    nickName: string
    param_2: string
}

interface Iproto_FriendData20121227 {
    plyGuid: number
    plyNickname: string
    plyMoney: number
    plyVipLev: number
    plyUnreadMsgNum: number
    plyType: number
}

interface Iproto_cb_get_online_award_req {
    opcode: 'proto_cb_get_online_award_req'
    type: number
}

interface Iproto_lc_valid_identify_info_ack {
    opcode: 'proto_lc_valid_identify_info_ack'
    ret: number
    message: string
}

interface Iproto_bc_private_invite_code_not {
    opcode: 'proto_bc_private_invite_code_not'
    tableScores: number[]
    privateInvite: Iproto_PrivateInvite
}

interface Iproto_cb_visit_table_req {
    opcode: 'proto_cb_visit_table_req'
    tableId: number
    password: string
    chairId: number
}

interface Iproto_lc_get_fetion_rank_list_ack {
    opcode: 'proto_lc_get_fetion_rank_list_ack'
    rankList: Iproto_RankItem[]
    type: number
}

interface Iproto_cl_get_user_already_login_days_req {
    opcode: 'proto_cl_get_user_already_login_days_req'
}

interface Iproto_cl_reload_user_data_req {
    opcode: 'proto_cl_reload_user_data_req'
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

interface Iproto_SafeRecord {
    index: number
    gameId: number
    type: number
    opTime: number
    amount: number
    remainingSum: number
}

interface Iproto_cl_club_updata_limit_group_list_req {
    opcode: 'proto_cl_club_updata_limit_group_list_req'
    type: number
    clubId: number
    groupId: number
    memberList: number[]
}

interface Iproto_lc_club_room_change_noti {
    opcode: 'proto_lc_club_room_change_noti'
    type: number
    clubUid: number
    tableInfo: Iproto_ClubTableInfo
    ruleId: number
    tableNo: number
    currentGameTime: number
}

interface Iproto_CRAD_ROAD_INFO {
    gameId: number
    serverId: number
    param: string
}

interface Iproto_lc_send_user_data_change_not {
    opcode: 'proto_lc_send_user_data_change_not'
    plyLobbyData: Iproto_PlyLobbyData
    plyItems: Iproto_ItemData[]
    plyVip: Iproto_VipData
    plyGradingValue: number
}

interface Iproto_MailInfo {
    mailId: number
    mailMsg: string
    mailMsgType: number
    mailSendTime: number
    mailStatus: number
    mailImg: string
    mailAwardId: number
}

interface Iproto_cl_rp_check_relief_status_req {
    opcode: 'proto_cl_rp_check_relief_status_req'
    roomType: number
}

interface Iproto_lc_get_assist_info_data_ack {
    opcode: 'proto_lc_get_assist_info_data_ack'
    ret: number
    items: Iproto_AssistInfoData[]
}

interface Iproto_cb_match_table_by_marriage_req {
    opcode: 'proto_cb_match_table_by_marriage_req'
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

interface Iproto_lc_match_player_num_not {
    opcode: 'proto_lc_match_player_num_not'
    matchId: number
    playerNum: number
}

interface Iproto_bc_send_disconnect_ack {
    opcode: 'proto_bc_send_disconnect_ack'
    ret: number
}

interface Iproto_cb_get_player_level_req {
    opcode: 'proto_cb_get_player_level_req'
}

interface Iproto_bc_ply_join_not {
    opcode: 'proto_bc_ply_join_not'
    plyData: Iproto_PlyBaseData
}

interface Iproto_RL_PLAYER_STATUS {
    plyGuid: number
    plyNickname: string
    loginServerId: number
    mainGameId: number
    plyStatus: number
}

interface Iproto_bc_match_survival_award_noti {
    opcode: 'proto_bc_match_survival_award_noti'
    matchId: number
    awardValue: number
    maxAwardValue: number
    minAwardValue: number
    winnerPlayerNum: number
}

interface Iproto_bc_get_round_award_ack {
    opcode: 'proto_bc_get_round_award_ack'
    ret: number
    round: number
    awardRound: number
    money: number
    message: string
}

interface Iproto_bc_integal_condition_noti {
    opcode: 'proto_bc_integal_condition_noti'
    type: number
    ruleId: number
    ruleIdAndroid: number
    ruleDesc: string
}

interface Iproto_lc_club_invite_to_game_ack {
    opcode: 'proto_lc_club_invite_to_game_ack'
    clubUid: number
    inviteCode: number
    toPlyGuid: number
    ret: number
}

interface Iproto_cb_get_round_award_req {
    opcode: 'proto_cb_get_round_award_req'
    type: number
}

interface Iproto_cl_get_win_round_score_req {
    opcode: 'proto_cl_get_win_round_score_req'
    plyGuid: number
}

interface Iproto_lc_sign_flow_match_ack {
    opcode: 'proto_lc_sign_flow_match_ack'
    ret: number
}

interface Iproto_MatchRank {
    plyGuid: number
    plyNickname: string
    matchScore: number
}

interface Iproto_bc_update_big_card_user_info_ack {
    opcode: 'proto_bc_update_big_card_user_info_ack'
    ret: number
}

interface Iproto_bc_win_lose_limit_exceed_not {
    opcode: 'proto_bc_win_lose_limit_exceed_not'
    flag: number
    errMsg: string
}

interface Iproto_lc_get_private_game_replay_record_ack {
    opcode: 'proto_lc_get_private_game_replay_record_ack'
    data: Iproto_PrivateReplayRecord[]
}

interface Iproto_PlyLobbyData20121227 {
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

interface Iproto_bc_calc_player_round_count_not {
    opcode: 'proto_bc_calc_player_round_count_not'
    num: number
}

interface Iproto_bc_coupon_not {
    opcode: 'proto_bc_coupon_not'
    ret: number
    num: number
}

interface Iproto_bc_get_assist_info_data_ack {
    opcode: 'proto_bc_get_assist_info_data_ack'
    ret: number
    dstPlyGuid: number
    items: Iproto_AssistInfoData[]
}

interface Iproto_lc_verity_ticket_ack20121227 {
    opcode: 'proto_lc_verity_ticket_ack20121227'
    ret: number
    plyLobbyData: Iproto_PlyLobbyData20121227
    plyStatus: Iproto_PlayerStatus20121227
    plyLoginAward: Iproto_LoginAward
    plyItems: Iproto_ItemData20121227[]
    plyLoginAward2: Iproto_LoginAward2
}

interface Iproto_lc_get_daily_task_award_ack {
    opcode: 'proto_lc_get_daily_task_award_ack'
    ret: number
    money: number
    gift: number
    prop_1: number
    prop_2: number
    prop_3: number
    prop_4: number
    prop_5: number
}

interface Iproto_lc_quit_sign_match_ack {
    opcode: 'proto_lc_quit_sign_match_ack'
    ret: number
    money: number
}

interface Iproto_cl_get_private_game_replay_record_req {
    opcode: 'proto_cl_get_private_game_replay_record_req'
    uniqueCode: number
}

interface Iproto_lc_club_member_info_change_noti {
    opcode: 'proto_lc_club_member_info_change_noti'
    type: number
    clubUid: number
    member: Iproto_ClubMemberInfo
}

interface Iproto_player_feel_value {
    frdGuid: number
    feelValue: number
}

interface Iproto_lc_send_ply_position_info_ack {
    opcode: 'proto_lc_send_ply_position_info_ack'
    ret: number
    plyGuid: number
}

interface Iproto_cb_kickout_req {
    opcode: 'proto_cb_kickout_req'
    dstPlyGuid: number
    chairId: number
}

interface Iproto_TableItemAttr2 {
    tableId: number
    name: string
    lock: number
    status: number
    baseScore: number
    curPlyNum: number
    plyMinMoney: number
}

interface Iproto_bc_reset_match_ack {
    opcode: 'proto_bc_reset_match_ack'
    ret: number
    matchScore: number
}

interface Iproto_lc_match_require_status_ack {
    opcode: 'proto_lc_match_require_status_ack'
    ret: number
}

interface Iproto_SigninAward {
    days: number
    money: number
    gift: number
    count: number
    state: number
    index: number
    name: string
}

interface Iproto_lc_club_user_data_noti {
    opcode: 'proto_lc_club_user_data_noti'
    clubUid: number
    gameId: number
    "var": number
    usedRoomCardNum: number
    limitRoomCardNum: number
}

interface Iproto_bc_update_ply_data_not20121227 {
    opcode: 'proto_bc_update_ply_data_not20121227'
    plyGuid: number
    uptReason: number
    uptType: number
    variant: number
    amount: number
}

interface Iproto_lc_get_user_signin_award_ext_ack {
    opcode: 'proto_lc_get_user_signin_award_ext_ack'
    ret: number
    day: number
    signinAward: Iproto_ExtSigninAward
}

interface Iproto_cb_get_luck_draw_req {
    opcode: 'proto_cb_get_luck_draw_req'
}

interface Iproto_lc_continuous_landing_reward_data_ack {
    opcode: 'proto_lc_continuous_landing_reward_data_ack'
    isGetAward: number
    loginAward2: Iproto_LoginAward2
}

interface Iproto_bc_ply_leave_not {
    opcode: 'proto_bc_ply_leave_not'
    plyGuid: number
}

interface Iproto_cl_get_private_invite_info_req {
    opcode: 'proto_cl_get_private_invite_info_req'
    inviteCode: number
}

interface Iproto_lc_get_ply_status_ack20121227 {
    opcode: 'proto_lc_get_ply_status_ack20121227'
    players: Iproto_PlayerStatus20121227[]
}

interface Iproto_bc_join_table_ack20121227 {
    opcode: 'proto_bc_join_table_ack20121227'
    ret: number
    tableAttrs: Iproto_TableAttr20121227
}

interface Iproto_cl_get_extra_relief_list_req {
    opcode: 'proto_cl_get_extra_relief_list_req'
}

interface Iproto_bc_do_tip_dila_ack {
    opcode: 'proto_bc_do_tip_dila_ack'
    ret: number
    data: Iproto_DilaData
}

interface Iproto_cb_ready_req {
    opcode: 'proto_cb_ready_req'
}

interface Iproto_ClubGroupMemMsg {
    clubId: number
    groupId: number
    memberList: number[]
}

interface Iproto_lc_auto_add_frd_not {
    opcode: 'proto_lc_auto_add_frd_not'
    ret: number
    limitGuid: number
}

interface Iproto_bc_ply_join_not20121227 {
    opcode: 'proto_bc_ply_join_not20121227'
    plyData: Iproto_PlyBaseData20121227
}

interface Iproto_LuckDrawItemData {
    index: number
    number: number
}

interface Iproto_lc_table_change_noti {
    opcode: 'proto_lc_table_change_noti'
    serverId: number
    tableId: number
    changeType: number
    param: number
    value: number
}

interface Iproto_cl_active_game_server_info_req {
    opcode: 'proto_cl_active_game_server_info_req'
    gameId: number
    serverType: number
    serverId: number
}

interface Iproto_lc_dismiss_club_table_ack {
    opcode: 'proto_lc_dismiss_club_table_ack'
    ret: number
    inviteCode: number
    errMsg: string
}

interface Iproto_cl_get_online_rank_list_mj_req {
    opcode: 'proto_cl_get_online_rank_list_mj_req'
    flag: number
    page: number
    type: number
}

interface Iproto_lc_get_private_game_data_list_ack {
    opcode: 'proto_lc_get_private_game_data_list_ack'
    data: Iproto_PrivateGameDataAll[]
    types: number[]
    itemIndexs: number[]
}

interface Iproto_AccumulateSigninAward2 {
    days: number
    awardStrings: string
}

interface Iproto_bc_web_socket_shake_hand_ack {
    opcode: 'proto_bc_web_socket_shake_hand_ack'
    webSocketKey: string
}

interface Iproto_cl_get_daily_task_award_req {
    opcode: 'proto_cl_get_daily_task_award_req'
    index: number
}

interface Iproto_lc_get_club_settting_ack {
    opcode: 'proto_lc_get_club_settting_ack'
    clubUid: number
    hasAutoCreateRoom: number
}

interface Iproto_lc_get_safe_data_ack {
    opcode: 'proto_lc_get_safe_data_ack'
    ret: number
    plyGuid: number
    amount: number
    money: number
    isBindMobile: number
}

interface Iproto_lc_get_zzyk_award_ack {
    opcode: 'proto_lc_get_zzyk_award_ack'
    ret: number
    money: number
    flag: number
}

interface Iproto_lc_club_get_room_list_ack {
    opcode: 'proto_lc_club_get_room_list_ack'
    clubUid: number
    tableInfos: Iproto_ClubTableInfo[]
}

interface Iproto_lc_get_daily_task_list_ack {
    opcode: 'proto_lc_get_daily_task_list_ack'
    items: Iproto_AchieveData2[]
}

interface Iproto_lc_active_game_server_info_ack {
    opcode: 'proto_lc_active_game_server_info_ack'
    ret: number
    serverStatus: Iproto_ServerData2
}

interface Iproto_cl_club_get_room_list_req {
    opcode: 'proto_cl_club_get_room_list_req'
    version: number
    clubUid: number
}

interface Iproto_lc_get_user_signin_days_ack {
    opcode: 'proto_lc_get_user_signin_days_ack'
    ret: number
    signinInfo: Iproto_SigninInfo
}

interface Iproto_PlyLobbyData {
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

interface Iproto_cb_join_match_req {
    opcode: 'proto_cb_join_match_req'
    matchId: number
    matchTypeId: number
}

interface Iproto_cl_store_safe_amount_req {
    opcode: 'proto_cl_store_safe_amount_req'
    plyGuid: number
    amount: number
}

interface Iproto_cl_get_three_draw_data_req {
    opcode: 'proto_cl_get_three_draw_data_req'
}

interface Iproto_lc_set_ply_city_data_ack {
    opcode: 'proto_lc_set_ply_city_data_ack'
    ret: number
    nProv: number
    nCity: number
    nCounty: number
}

interface Iproto_lc_update_player_marriage_ack {
    opcode: 'proto_lc_update_player_marriage_ack'
    ret: number
}

interface Iproto_lc_get_merged_daily_task_data_ack {
    opcode: 'proto_lc_get_merged_daily_task_data_ack'
    items: Iproto_MergedAchieveData[]
}

interface Iproto_lc_get_at_achieve_award_ack {
    opcode: 'proto_lc_get_at_achieve_award_ack'
    ret: number
    vecAwards: Iproto_ATAchieveAward[]
}

interface Iproto_ItemConfig {
    itemIndex: number
    itemNum: number
}

interface Iproto_ActivityRewardItem {
    activity: number
    award: number
    items: Iproto_ItemConfig[]
}

interface Iproto_cl_get_activity_rewards_list_req {
    opcode: 'proto_cl_get_activity_rewards_list_req'
}

interface Iproto_lc_get_activity_rewards_list_ack {
    opcode: 'proto_lc_get_activity_rewards_list_ack'
    activity: number
    configs: Iproto_ActivityRewardItem[]
}

interface Iproto_cl_get_activity_reward_req {
    opcode: 'proto_cl_get_activity_reward_req'
    activity: number
}

interface Iproto_lc_get_activity_reward_ack {
    opcode: 'proto_lc_get_activity_reward_ack'
    activity: number
    ret: number
}

interface Iproto_cb_play_quit_flow_match_req {
    opcode: 'proto_cb_play_quit_flow_match_req'
    matchTypeId: number
    matchMinNum: number
}

interface Iproto_bc_play_quit_flow_match_ack {
    opcode: 'proto_bc_play_quit_flow_match_ack'
    ret: number
    matchTypeId: number
}

interface Iproto_cl_get_newbie_reward_req {
    opcode: 'proto_cl_get_newbie_reward_req'
}

interface Iproto_lc_get_newbie_reward_ack {
    opcode: 'proto_lc_get_newbie_reward_ack'
    ack: number
    rewards: string
}
