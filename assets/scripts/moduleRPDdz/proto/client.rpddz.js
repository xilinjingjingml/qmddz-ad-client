module.exports={"package":null,"syntax":"proto2","messages":[{"name":"proto_cb_login_req","syntax":"proto2","fields":[{"rule":"required","type":"int64","name":"ply_guid","id":1},{"rule":"required","type":"string","name":"ply_ticket","id":2},{"rule":"required","type":"int32","name":"version","id":3},{"rule":"required","type":"string","name":"ext_param","id":4},{"rule":"required","type":"int32","name":"main_game_id","id":5},{"rule":"required","type":"int32","name":"game_group","id":6}]},{"name":"proto_bc_login_ack","syntax":"proto2","fields":[{"rule":"required","type":"int32","name":"ret","id":1},{"rule":"required","type":"proto_PlyBaseData","name":"ply_base_data","id":2},{"rule":"required","type":"proto_PlayerStatus","name":"ply_status","id":3},{"rule":"required","type":"string","name":"error_msg","id":4}]},{"name":"proto_PlyBaseData","syntax":"proto2","fields":[{"rule":"required","type":"int64","name":"ply_guid","id":1},{"rule":"required","type":"string","name":"nickname","id":2},{"rule":"required","type":"int32","name":"sex","id":3},{"rule":"required","type":"int32","name":"gift","id":4},{"rule":"required","type":"int64","name":"money","id":5},{"rule":"required","type":"int32","name":"score","id":6},{"rule":"required","type":"int32","name":"won","id":7},{"rule":"required","type":"int32","name":"lost","id":8},{"rule":"required","type":"int32","name":"dogfall","id":9},{"rule":"required","type":"int32","name":"table_id","id":10},{"rule":"required","type":"int32","name":"param_1","id":11},{"rule":"required","type":"int32","name":"param_2","id":12},{"rule":"required","type":"int32","name":"chair_id","id":13},{"rule":"required","type":"int32","name":"ready","id":14},{"rule":"required","type":"proto_VipData","name":"ply_vip","id":15}]},{"name":"proto_PlayerStatus","syntax":"proto2","fields":[{"rule":"required","type":"int64","name":"ply_guid","id":1},{"rule":"required","type":"string","name":"ply_nickname","id":2},{"rule":"required","type":"int32","name":"ply_status","id":3},{"rule":"required","type":"int32","name":"sex","id":4},{"rule":"required","type":"int32","name":"game_id","id":5},{"rule":"required","type":"int32","name":"game_server_id","id":6},{"rule":"required","type":"int32","name":"table_id","id":7},{"rule":"required","type":"int64","name":"money","id":8},{"rule":"required","type":"int32","name":"won","id":9},{"rule":"required","type":"int32","name":"lost","id":10},{"rule":"required","type":"int32","name":"money_rank","id":11},{"rule":"required","type":"int32","name":"won_rank","id":12},{"rule":"required","type":"int32","name":"param_1","id":13},{"rule":"required","type":"int32","name":"param_2","id":14},{"rule":"required","type":"float","name":"latitude","id":15},{"rule":"required","type":"float","name":"longitude","id":16}]},{"name":"proto_VipData","syntax":"proto2","fields":[{"rule":"required","type":"int32","name":"level","id":1},{"rule":"required","type":"int32","name":"nex_level_total_days","id":2},{"rule":"required","type":"int32","name":"auto_upgrade_day","id":3},{"rule":"required","type":"int32","name":"login_award","id":4},{"rule":"required","type":"int32","name":"friend_count","id":5},{"rule":"required","type":"int32","name":"next_level_due_days","id":6},{"rule":"required","type":"int32","name":"remain_due_days","id":7},{"rule":"required","type":"int32","name":"status","id":8}]},{"name":"proto_cb_join_table_req","syntax":"proto2","fields":[{"rule":"required","type":"int32","name":"table_id","id":1},{"rule":"required","type":"string","name":"password","id":2},{"rule":"required","type":"int32","name":"club_uid","id":3}]},{"name":"proto_bc_join_table_ack","syntax":"proto2","fields":[{"rule":"required","type":"int32","name":"ret","id":1},{"rule":"required","type":"proto_TableAttr","name":"table_attrs","id":2},{"rule":"required","type":"string","name":"errMsg","id":3}]},{"name":"proto_TableAttr","syntax":"proto2","fields":[{"rule":"required","type":"int32","name":"table_id","id":1},{"rule":"required","type":"string","name":"name","id":2},{"rule":"required","type":"int32","name":"lock","id":3},{"rule":"repeated","type":"proto_PlyBaseData","name":"players","id":4}]},{"name":"proto_cb_leave_table_req","syntax":"proto2","fields":[]},{"name":"proto_bc_leave_table_ack","syntax":"proto2","fields":[{"rule":"required","type":"int32","name":"ret","id":1},{"rule":"required","type":"string","name":"ply_nickname","id":2}]},{"name":"proto_bc_ply_join_not","syntax":"proto2","fields":[{"rule":"required","type":"proto_PlyBaseData","name":"ply_data","id":1}]},{"name":"proto_bc_ply_leave_not","syntax":"proto2","fields":[{"rule":"required","type":"int64","name":"ply_guid","id":1}]},{"name":"proto_cb_ready_req","syntax":"proto2","fields":[]},{"name":"proto_bc_ready_not","syntax":"proto2","fields":[{"rule":"required","type":"int64","name":"ply_guid","id":1}]},{"name":"proto_cb_change_table_req","syntax":"proto2","fields":[]},{"name":"proto_bc_update_ply_data_not","syntax":"proto2","fields":[{"rule":"required","type":"int64","name":"ply_guid","id":1},{"rule":"required","type":"int32","name":"upt_reason","id":2},{"rule":"required","type":"int32","name":"upt_type","id":3},{"rule":"required","type":"int32","name":"variant","id":4},{"rule":"required","type":"int64","name":"amount","id":5}]},{"name":"proto_bc_message_not","syntax":"proto2","fields":[{"rule":"required","type":"int32","name":"type","id":1},{"rule":"required","type":"string","name":"message","id":2}]},{"name":"proto_bc_specify_item_update_not","syntax":"proto2","fields":[{"rule":"required","type":"int64","name":"ply_guid","id":1},{"rule":"required","type":"int32","name":"index","id":2},{"rule":"required","type":"int32","name":"num","id":3}]},{"name":"proto_gc_game_start_not","syntax":"proto2","fields":[{"rule":"required","type":"int32","name":"nGameMoney","id":1},{"rule":"required","type":"int32","name":"nCardNum","id":2},{"rule":"required","type":"int32","name":"nLordPos","id":3},{"rule":"required","type":"proto_CCard","name":"cLordCard","id":4},{"rule":"required","type":"int32","name":"nSerialID","id":5}]},{"name":"proto_gc_counts_not1","syntax":"proto2","fields":[{"rule":"required","type":"int32","name":"counts_num","id":1}]},{"name":"proto_sic_bet_req","syntax":"proto2","fields":[{"rule":"required","type":"int32","name":"cCellID","id":1},{"rule":"required","type":"int32","name":"nAmount","id":2}]},{"name":"proto_gc_task_not","syntax":"proto2","fields":[{"rule":"required","type":"proto_TaskItem","name":"task_item","id":1}]},{"name":"proto_gc_two_lord_card_not","syntax":"proto2","fields":[{"rule":"required","type":"int32","name":"cLord","id":1},{"rule":"repeated","type":"proto_CCard","name":"vecCards","id":2},{"rule":"required","type":"int32","name":"nLetNum","id":3},{"rule":"required","type":"int32","name":"nLordLetNum","id":4}]},{"name":"proto_gc_expression_not","syntax":"proto2","fields":[{"rule":"required","type":"int32","name":"expression_type","id":1},{"rule":"required","type":"int32","name":"expression_num","id":2}]},{"name":"proto_gc_use_card_recode_noti","syntax":"proto2","fields":[{"rule":"required","type":"int32","name":"cChairID","id":1},{"rule":"required","type":"int32","name":"cReconnection","id":2}]},{"name":"proto_gc_card_recode_req","syntax":"proto2","fields":[]},{"name":"proto_gc_bomb_not","syntax":"proto2","fields":[{"rule":"required","type":"int32","name":"nDouble","id":1}]},{"name":"proto_gc_private_room_result_ack","syntax":"proto2","fields":[{"rule":"repeated","type":"proto_GameStatisc","name":"vecGameStatiscs","id":1}]},{"name":"proto_gc_replay_data_not","syntax":"proto2","fields":[{"rule":"repeated","type":"proto_gc_refresh_card_not","name":"vecChangeCards","id":1}]},{"name":"proto_cg_bet_lord_card_req","syntax":"proto2","fields":[{"rule":"required","type":"int32","name":"index","id":1}]},{"name":"proto_stUserData","syntax":"proto2","fields":[{"rule":"required","type":"int32","name":"cChairID","id":1},{"rule":"repeated","type":"proto_CCard","name":"vecHandCards","id":2},{"rule":"repeated","type":"proto_CCard","name":"vecPutCards","id":3}]},{"name":"proto_gc_double_score_req","syntax":"proto2","fields":[{"rule":"required","type":"int32","name":"nSerialID","id":1}]},{"name":"proto_gc_game_result_not","syntax":"proto2","fields":[{"rule":"required","type":"int32","name":"bType","id":1},{"rule":"required","type":"int32","name":"cDouble","id":2},{"rule":"required","type":"int32","name":"cCallScore","id":3},{"rule":"required","type":"int32","name":"bShowCard","id":4},{"rule":"required","type":"int32","name":"nBombCount","id":5},{"rule":"required","type":"int32","name":"bSpring","id":6},{"rule":"required","type":"int32","name":"bReverseSpring","id":7},{"rule":"required","type":"int32","name":"bRobLord","id":8},{"rule":"repeated","type":"proto_stUserResult","name":"vecUserResult","id":9}]},{"name":"proto_gc_user_savestar_card_noti","syntax":"proto2","fields":[]},{"name":"proto_gc_counts_not","syntax":"proto2","fields":[{"rule":"required","type":"int32","name":"counts_num","id":1}]},{"name":"proto_cg_three_draw_req_data","syntax":"proto2","fields":[]},{"name":"proto_gc_starsky_update_item_noti","syntax":"proto2","fields":[{"rule":"required","type":"int32","name":"stamina","id":1},{"rule":"required","type":"int32","name":"match_ticket","id":2},{"rule":"required","type":"int32","name":"score","id":3},{"rule":"required","type":"int32","name":"savestar_card","id":4}]},{"name":"proto_magic_emoji_noti","syntax":"proto2","fields":[{"rule":"required","type":"int32","name":"cIsError","id":1},{"rule":"required","type":"int32","name":"cEmojiIndex","id":2},{"rule":"required","type":"int32","name":"cFromChairID","id":3},{"rule":"required","type":"int32","name":"cToChairID","id":4},{"rule":"required","type":"int32","name":"cEmojiNum","id":5}]},{"name":"proto_cg_complete_data_req","syntax":"proto2","fields":[]},{"name":"proto_sic_bet_update_ack","syntax":"proto2","fields":[{"rule":"required","type":"int32","name":"nBetUpdateAckTag","id":1},{"rule":"repeated","type":"proto_st_sic_cell","name":"vecAmountCell","id":2}]},{"name":"proto_gc_bet_lord_card_ack","syntax":"proto2","fields":[{"rule":"required","type":"int32","name":"ret","id":1},{"rule":"required","type":"int32","name":"index","id":2}]},{"name":"proto_gc_double_score_not","syntax":"proto2","fields":[{"rule":"required","type":"int32","name":"nDouble","id":1},{"rule":"required","type":"int32","name":"nSerialID","id":2}]},{"name":"proto_sic_new_round_not","syntax":"proto2","fields":[]},{"name":"proto_st_sic_cell","syntax":"proto2","fields":[{"rule":"required","type":"int32","name":"cCellID","id":1},{"rule":"required","type":"int32","name":"nAmount","id":2}]},{"name":"proto_gc_play_card_not","syntax":"proto2","fields":[{"rule":"required","type":"int32","name":"cChairID","id":1},{"rule":"repeated","type":"proto_CCard","name":"vecCards","id":2},{"rule":"required","type":"proto_CCardsType","name":"cType","id":3}]},{"name":"proto_gc_item_info_not","syntax":"proto2","fields":[{"rule":"required","type":"int32","name":"nItemIndex","id":1},{"rule":"required","type":"int32","name":"nItemCount","id":2}]},{"name":"proto_stUserResult","syntax":"proto2","fields":[{"rule":"required","type":"int32","name":"nChairID","id":1},{"rule":"required","type":"int32","name":"nScore","id":2}]},{"name":"proto_cg_starsky_season_noti","syntax":"proto2","fields":[{"rule":"required","type":"int32","name":"season","id":1}]},{"name":"proto_gc_update_player_tokenmoney_not","syntax":"proto2","fields":[{"rule":"required","type":"int32","name":"ply_chairid","id":1},{"rule":"repeated","type":"proto_player_itemInfo","name":"itemInfo","id":2}]},{"name":"proto_player_itemInfo","syntax":"proto2","fields":[{"rule":"required","type":"int32","name":"nItemIndex","id":1},{"rule":"required","type":"int32","name":"nItemNum","id":2},{"rule":"required","type":"int64","name":"nItemNum64","id":3}]},{"name":"proto_gc_common_not","syntax":"proto2","fields":[{"rule":"required","type":"int32","name":"nOp","id":1},{"rule":"required","type":"int32","name":"cChairID","id":2}]},{"name":"proto_gc_complete_data_not","syntax":"proto2","fields":[{"rule":"required","type":"int32","name":"nGameMoney","id":1},{"rule":"required","type":"int32","name":"nDouble","id":2},{"rule":"required","type":"int32","name":"cLord","id":3},{"rule":"repeated","type":"proto_CCard","name":"vecLordCards","id":4},{"rule":"repeated","type":"proto_stUserData","name":"vecData","id":5}]},{"name":"proto_sic_show_result_not","syntax":"proto2","fields":[]},{"name":"proto_gc_get_redpackets_award_ack","syntax":"proto2","fields":[{"rule":"required","type":"int32","name":"ret","id":1},{"rule":"required","type":"int32","name":"cur_rounds","id":2},{"rule":"required","type":"int32","name":"limit_rounds","id":3},{"rule":"required","type":"int32","name":"nAmount","id":4},{"rule":"required","type":"int32","name":"cItemtype","id":5},{"rule":"required","type":"int32","name":"task_id","id":6},{"rule":"repeated","type":"proto_player_itemInfo","name":"fakeItem","id":7}]},{"name":"proto_cg_get_redpackets_award_req","syntax":"proto2","fields":[{"rule":"required","type":"int32","name":"type","id":1}]},{"name":"proto_gc_send_dizhu_not","syntax":"proto2","fields":[{"rule":"required","type":"int32","name":"nGameMoney","id":1}]},{"name":"proto_gc_ju_count_not","syntax":"proto2","fields":[{"rule":"required","type":"int32","name":"nJuCount","id":1}]},{"name":"proto_sic_bet_update_req","syntax":"proto2","fields":[{"rule":"required","type":"int32","name":"nBetUpdateAckTag","id":1}]},{"name":"proto_gc_extra_double_score_not","syntax":"proto2","fields":[{"rule":"required","type":"int32","name":"nDouble","id":1},{"rule":"required","type":"int32","name":"nLordDouble","id":2},{"rule":"required","type":"int32","name":"nSerialID","id":3}]},{"name":"proto_gc_had_start_not","syntax":"proto2","fields":[]},{"name":"proto_gc_pause_game_not","syntax":"proto2","fields":[{"rule":"required","type":"int32","name":"nFlag","id":1},{"rule":"required","type":"int32","name":"nMinTime","id":2},{"rule":"required","type":"int32","name":"nSecTime","id":3},{"rule":"required","type":"int32","name":"cChairId","id":4},{"rule":"required","type":"string","name":"sNickName","id":5}]},{"name":"proto_gc_private_room_result_not","syntax":"proto2","fields":[{"rule":"required","type":"int32","name":"ret","id":1},{"rule":"repeated","type":"proto_GameStatisc","name":"vecGameStatiscs","id":2}]},{"name":"proto_gc_get_card_ack","syntax":"proto2","fields":[{"rule":"required","type":"int32","name":"num","id":1},{"rule":"repeated","type":"proto_CCard","name":"vecCards0","id":2},{"rule":"repeated","type":"proto_CCard","name":"vecCards1","id":3},{"rule":"repeated","type":"proto_CCard","name":"vecCards2","id":4}]},{"name":"proto_cg_private_room_result_req","syntax":"proto2","fields":[]},{"name":"proto_GameStatisc","syntax":"proto2","fields":[{"rule":"required","type":"int32","name":"cChairID","id":1},{"rule":"required","type":"int32","name":"nCallTimes","id":2},{"rule":"required","type":"int32","name":"nLordTimes","id":3},{"rule":"required","type":"int32","name":"nWinTimes","id":4},{"rule":"required","type":"int64","name":"nZhanJi","id":5}]},{"name":"proto_gc_two_show_card_not","syntax":"proto2","fields":[{"rule":"required","type":"int32","name":"cChairID","id":1},{"rule":"required","type":"int32","name":"nLordPos","id":2},{"rule":"required","type":"proto_CCard","name":"cLordCard","id":3}]},{"name":"proto_gc_two_complete_data_not","syntax":"proto2","fields":[{"rule":"required","type":"int32","name":"nGameMoney","id":1},{"rule":"required","type":"int32","name":"nDouble","id":2},{"rule":"required","type":"int32","name":"cLord","id":3},{"rule":"repeated","type":"proto_CCard","name":"vecLordCards","id":4},{"rule":"repeated","type":"proto_stUserData","name":"vecData","id":5},{"rule":"required","type":"int32","name":"nLetNum","id":6},{"rule":"required","type":"int32","name":"nStart","id":7}]},{"name":"proto_stUserResult1","syntax":"proto2","fields":[{"rule":"required","type":"int32","name":"nChairID","id":1},{"rule":"required","type":"int32","name":"nScore","id":2},{"rule":"required","type":"int32","name":"nJifen","id":3}]},{"name":"proto_gc_two_let_card_not","syntax":"proto2","fields":[{"rule":"required","type":"int32","name":"nLetNum","id":1}]},{"name":"proto_cg_get_card_req","syntax":"proto2","fields":[{"rule":"required","type":"int32","name":"nSerialID","id":1}]},{"name":"proto_gc_lord_card_lottery_info","syntax":"proto2","fields":[{"rule":"required","type":"int32","name":"fee","id":1},{"rule":"repeated","type":"int32","name":"vecReward","id":2}]},{"name":"proto_gc_get_lord_card_reward","syntax":"proto2","fields":[{"rule":"required","type":"int32","name":"index","id":1},{"rule":"required","type":"int32","name":"money","id":2}]},{"name":"proto_gc_game_model","syntax":"proto2","fields":[{"rule":"required","type":"int32","name":"cModelType","id":1}]},{"name":"proto_gc_three_draw_ack_card","syntax":"proto2","fields":[{"rule":"required","type":"int32","name":"ret","id":1},{"rule":"repeated","type":"proto_CCard","name":"vecCards","id":2},{"rule":"repeated","type":"float","name":"vecRates","id":3},{"rule":"required","type":"int64","name":"nMoney","id":4},{"rule":"required","type":"int64","name":"nDiZhu","id":5},{"rule":"required","type":"float","name":"fRate","id":6}]},{"name":"proto_sic_bet_ack","syntax":"proto2","fields":[{"rule":"required","type":"int32","name":"bAllow","id":1},{"rule":"required","type":"int32","name":"cCellID","id":2},{"rule":"required","type":"int32","name":"nAmountCell","id":3},{"rule":"required","type":"int32","name":"nAmountCellTotal","id":4}]},{"name":"proto_cg_lord_card_lottery_info","syntax":"proto2","fields":[]},{"name":"proto_CCard","syntax":"proto2","fields":[{"rule":"required","type":"int32","name":"m_nColor","id":1},{"rule":"required","type":"int32","name":"m_nValue","id":2},{"rule":"required","type":"int32","name":"m_nCard_Baovalue","id":3}]},{"name":"proto_cg_three_draw_req_card","syntax":"proto2","fields":[]},{"name":"proto_gc_three_draw_ack_data","syntax":"proto2","fields":[{"rule":"required","type":"int32","name":"ret","id":1},{"rule":"repeated","type":"proto_Money_DiZhu","name":"vecMoneyDiZhus","id":2},{"rule":"repeated","type":"proto_Kind_Rate","name":"vecKindRates","id":3},{"rule":"required","type":"int32","name":"nBaoDiMoney","id":4},{"rule":"required","type":"int32","name":"nBaoDiRate","id":5},{"rule":"required","type":"float","name":"fMinRate","id":6}]},{"name":"proto_Kind_Rate","syntax":"proto2","fields":[{"rule":"required","type":"string","name":"strKind","id":1},{"rule":"required","type":"string","name":"strRate","id":2}]},{"name":"proto_cli_my_req","syntax":"proto2","fields":[{"rule":"required","type":"int32","name":"a","id":1}]},{"name":"proto_Money_DiZhu","syntax":"proto2","fields":[{"rule":"required","type":"int64","name":"nMoney","id":1},{"rule":"required","type":"int64","name":"nDiZhu","id":2}]},{"name":"proto_gc_card_count_ack1","syntax":"proto2","fields":[{"rule":"required","type":"int32","name":"counts_num","id":1},{"rule":"repeated","type":"proto_CCard","name":"m_vecPutCard","id":2}]},{"name":"proto_mj_completedata_req","syntax":"proto2","fields":[]},{"name":"proto_CCardsType","syntax":"proto2","fields":[{"rule":"required","type":"int32","name":"m_nTypeBomb","id":1},{"rule":"required","type":"int32","name":"m_nTypeNum","id":2},{"rule":"required","type":"int32","name":"m_nTypeValue","id":3}]},{"name":"proto_svr_test_not","syntax":"proto2","fields":[{"rule":"required","type":"int32","name":"cTest","id":1},{"rule":"required","type":"int32","name":"nTest","id":2},{"rule":"repeated","type":"int32","name":"vecTest","id":3}]},{"name":"proto_sic_bet_clear_ack","syntax":"proto2","fields":[{"rule":"required","type":"int32","name":"nBetUpdateAckTag","id":1},{"rule":"required","type":"int32","name":"nAmountBack","id":2},{"rule":"required","type":"int32","name":"nAmountTotal","id":3}]},{"name":"proto_gc_refresh_card_not","syntax":"proto2","fields":[{"rule":"required","type":"int32","name":"cChairID","id":1},{"rule":"repeated","type":"proto_CCard","name":"vecCards","id":2}]},{"name":"proto_gc_show_card_req","syntax":"proto2","fields":[{"rule":"required","type":"int32","name":"nSerialID","id":1},{"rule":"required","type":"int32","name":"nShowCardType","id":2},{"rule":"required","type":"int32","name":"nShowCardBet","id":3}]},{"name":"proto_cg_auto_req","syntax":"proto2","fields":[{"rule":"required","type":"int32","name":"cAuto","id":1}]},{"name":"proto_sic_history_req","syntax":"proto2","fields":[]},{"name":"proto_cg_card_count_req","syntax":"proto2","fields":[]},{"name":"proto_gc_task_complete_not","syntax":"proto2","fields":[{"rule":"required","type":"int32","name":"chair_id","id":1},{"rule":"required","type":"int32","name":"task_status","id":2}]},{"name":"proto_cg_call_score_ack","syntax":"proto2","fields":[{"rule":"required","type":"int32","name":"nScore","id":1},{"rule":"required","type":"int32","name":"nSerialID","id":2}]},{"name":"proto_sic_show_light_cell_not","syntax":"proto2","fields":[]},{"name":"proto_gc_call_score_req","syntax":"proto2","fields":[{"rule":"required","type":"int32","name":"nScore","id":1},{"rule":"required","type":"int32","name":"nSerialID","id":2}]},{"name":"proto_sic_bet_clear_req","syntax":"proto2","fields":[]},{"name":"proto_gc_clienttimer_not","syntax":"proto2","fields":[{"rule":"required","type":"int32","name":"chairId","id":1},{"rule":"required","type":"int32","name":"sPeriod","id":2}]},{"name":"proto_TaskItem","syntax":"proto2","fields":[{"rule":"required","type":"int32","name":"task_id","id":1},{"rule":"required","type":"string","name":"task_desc","id":2},{"rule":"required","type":"string","name":"task_mission","id":3},{"rule":"required","type":"int32","name":"task_money_type","id":4},{"rule":"required","type":"int32","name":"task_money","id":5},{"rule":"required","type":"int32","name":"task_rate","id":6}]},{"name":"proto_gc_three_draw_notify","syntax":"proto2","fields":[{"rule":"required","type":"string","name":"message","id":1}]},{"name":"proto_gc_laizi_not","syntax":"proto2","fields":[{"rule":"required","type":"int32","name":"card_value","id":1}]},{"name":"proto_magic_emoji_req","syntax":"proto2","fields":[{"rule":"required","type":"int32","name":"cEmojiIndex","id":1},{"rule":"required","type":"int32","name":"cToChairID","id":2},{"rule":"required","type":"int32","name":"cCostType","id":3}]},{"name":"proto_cg_double_score_ack","syntax":"proto2","fields":[{"rule":"required","type":"int32","name":"nScore","id":1},{"rule":"required","type":"int32","name":"nSerialID","id":2}]},{"name":"proto_cg_play_card_ack","syntax":"proto2","fields":[{"rule":"required","type":"int32","name":"nSerialID","id":1},{"rule":"required","type":"int32","name":"cTimeOut","id":2},{"rule":"repeated","type":"proto_CCard","name":"vecCards","id":3}]},{"name":"proto_sic_bet_begin_not","syntax":"proto2","fields":[]},{"name":"proto_cg_get_lord_card_reward","syntax":"proto2","fields":[{"rule":"required","type":"int32","name":"index","id":1}]},{"name":"proto_gc_bet_lord_card_result_ack","syntax":"proto2","fields":[{"rule":"required","type":"int32","name":"ret","id":1},{"rule":"required","type":"int32","name":"money","id":2}]},{"name":"proto_svr_my_ack","syntax":"proto2","fields":[{"rule":"required","type":"int32","name":"b","id":1}]},{"name":"proto_gc_game_result_not1","syntax":"proto2","fields":[{"rule":"required","type":"int32","name":"bType","id":1},{"rule":"required","type":"int32","name":"cDouble","id":2},{"rule":"required","type":"int32","name":"cCallScore","id":3},{"rule":"required","type":"int32","name":"bShowCard","id":4},{"rule":"required","type":"int32","name":"nBombCount","id":5},{"rule":"required","type":"int32","name":"bSpring","id":6},{"rule":"required","type":"int32","name":"bReverseSpring","id":7},{"rule":"required","type":"int32","name":"bRobLord","id":8},{"rule":"repeated","type":"proto_stUserResult1","name":"vecUserResult1","id":9}]},{"name":"proto_gc_play_card_req","syntax":"proto2","fields":[{"rule":"required","type":"int32","name":"cAuto","id":1},{"rule":"required","type":"int32","name":"nSerialID","id":2}]},{"name":"proto_gc_lord_card_lottery_base","syntax":"proto2","fields":[{"rule":"required","type":"int32","name":"ret","id":1},{"rule":"required","type":"int32","name":"index","id":2}]},{"name":"proto_gc_auto_not","syntax":"proto2","fields":[{"rule":"required","type":"int32","name":"cChairID","id":1},{"rule":"required","type":"int32","name":"cAuto","id":2}]},{"name":"proto_gc_card_count_ack","syntax":"proto2","fields":[{"rule":"required","type":"int32","name":"counts_num","id":1},{"rule":"repeated","type":"proto_CCard","name":"m_vecPutCard","id":2}]},{"name":"proto_gc_rob_lord_req","syntax":"proto2","fields":[{"rule":"required","type":"int32","name":"cDefaultLord","id":1},{"rule":"required","type":"int32","name":"nSerialID","id":2}]},{"name":"proto_sic_history_ack","syntax":"proto2","fields":[{"rule":"required","type":"int32","name":"bIsFounder","id":1},{"rule":"required","type":"int32","name":"nPlayerMoneyBefore","id":2},{"rule":"repeated","type":"string","name":"vecHistory","id":3},{"rule":"required","type":"int32","name":"nChipType","id":4},{"rule":"repeated","type":"int32","name":"vecChipValue","id":5},{"rule":"required","type":"int32","name":"nAmountMax","id":6},{"rule":"required","type":"float","name":"fNextRoundTimeWait","id":7},{"rule":"repeated","type":"int32","name":"vecPeriod","id":8}]},{"name":"proto_cg_rob_lord_ack","syntax":"proto2","fields":[{"rule":"required","type":"int32","name":"cRob","id":1},{"rule":"required","type":"int32","name":"nSerialID","id":2}]},{"name":"proto_gc_show_card_not","syntax":"proto2","fields":[{"rule":"required","type":"int32","name":"nChairID","id":1},{"rule":"repeated","type":"proto_CCard","name":"vecCards","id":2}]},{"name":"proto_sic_result_data_not","syntax":"proto2","fields":[{"rule":"repeated","type":"int32","name":"vecDice","id":1},{"rule":"required","type":"int32","name":"nWinMoney","id":2},{"rule":"required","type":"int32","name":"nPlayerMoneyAfter","id":3},{"rule":"repeated","type":"int32","name":"vecWinCells","id":4},{"rule":"repeated","type":"int32","name":"vecPlayerWinCells","id":5},{"rule":"repeated","type":"string","name":"vecHitAward","id":6},{"rule":"repeated","type":"string","name":"vecRank","id":7}]},{"name":"proto_cg_show_card_ack","syntax":"proto2","fields":[{"rule":"required","type":"int32","name":"cShowCard","id":1},{"rule":"required","type":"int32","name":"nSerialID","id":2},{"rule":"required","type":"int32","name":"nShowCardBet","id":3},{"rule":"required","type":"int32","name":"nShowCardType","id":4}]},{"name":"proto_cg_send_card_ok_ack","syntax":"proto2","fields":[{"rule":"required","type":"int32","name":"nSerialID","id":1}]},{"name":"proto_gc_lord_card_not","syntax":"proto2","fields":[{"rule":"required","type":"int32","name":"cLord","id":1},{"rule":"repeated","type":"proto_CCard","name":"vecCards","id":2}]},{"name":"proto_gc_get_redpackets_88yuan_award_ack","syntax":"proto2","fields":[{"rule":"required","type":"int32","name":"ret","id":1},{"rule":"required","type":"int32","name":"cur_rounds","id":2},{"rule":"required","type":"int32","name":"limit_rounds","id":3},{"rule":"required","type":"int32","name":"nAmount","id":4},{"rule":"required","type":"int32","name":"cItemtype","id":5},{"rule":"required","type":"int32","name":"task_id","id":6}]},{"name":"proto_cg_get_redpackets_88yuan_award_req","syntax":"proto2","fields":[{"rule":"required","type":"int32","name":"type","id":1}]},{"name":"proto_emojiConfig","syntax":"proto2","fields":[{"rule":"required","type":"int32","name":"cEmojiIndex","id":1},{"rule":"required","type":"int32","name":"cCostType","id":2},{"rule":"required","type":"int32","name":"cCostValue","id":3},{"rule":"optional","type":"int32","name":"nTenItemIndex","id":4},{"rule":"optional","type":"int32","name":"nTenItemNum","id":5},{"rule":"optional","type":"int32","name":"nTenEmojiNum","id":6}]},{"name":"proto_gc_magic_emoji_config_not","syntax":"proto2","fields":[{"rule":"repeated","type":"proto_emojiConfig","name":"emojiConfigs","id":1}]},{"name":"proto_gc_play_card_private_not","syntax":"proto2","fields":[{"rule":"required","type":"int32","name":"cChairID","id":1},{"rule":"repeated","type":"proto_CCard","name":"vecCards","id":2},{"rule":"required","type":"proto_CCardsType","name":"cType","id":3}]},{"name":"proto_cg_look_lord_card_req","syntax":"proto2","fields":[]},{"name":"proto_gc_beishu_info_ack","syntax":"proto2","fields":[{"rule":"repeated","type":"int32","name":"vecBeiShuInfo","id":1},{"rule":"repeated","type":"int32","name":"vecPlayerBeiShu","id":2}]},{"name":"proto_cg_beishu_info_req","syntax":"proto2","fields":[]},{"name":"proto_cg_regain_lose_score_req","syntax":"proto2","fields":[{"rule":"required","type":"int32","name":"nOp","id":1}]},{"name":"proto_gc_regain_lose_score_ack","syntax":"proto2","fields":[{"rule":"required","type":"int32","name":"nRet","id":1},{"rule":"required","type":"int32","name":"nTime","id":2},{"rule":"repeated","type":"int32","name":"nValue","id":3},{"rule":"required","type":"int32","name":"nCurCount","id":4}]},{"name":"proto_cg_enable_invincible_req","syntax":"proto2","fields":[{"rule":"required","type":"int32","name":"nOp","id":1}]},{"name":"proto_gc_enable_invincible_ack","syntax":"proto2","fields":[{"rule":"required","type":"int32","name":"nRet","id":1}]},{"name":"proto_gc_get_redpackets_newbie_award_req","syntax":"proto2","fields":[{"rule":"required","type":"int32","name":"nAmount","id":1}]},{"name":"proto_cg_get_redpackets_newbie_award_ack","syntax":"proto2","fields":[]},{"name":"proto_gc_get_redpackets_newbie_award_not","syntax":"proto2","fields":[{"rule":"required","type":"int32","name":"nRet","id":1},{"rule":"required","type":"int32","name":"nAmount","id":2}]},{"name":"proto_cg_look_lord_card_item_req","syntax":"proto2","fields":[]},{"name":"proto_gc_look_lord_card_item_ack","syntax":"proto2","fields":[{"rule":"required","type":"int32","name":"nRet","id":1}]},{"name":"proto_gc_item_add_not","syntax":"proto2","fields":[{"rule":"required","type":"int32","name":"nItemIndex","id":1},{"rule":"required","type":"int32","name":"nItemCount","id":2}]}],"isNamespace":true}