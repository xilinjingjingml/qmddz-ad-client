const {ccclass, property} = cc._decorator;

let opcodeDefine = []
let opcodeReverse = []

let setOpcode = function(name, code){
    opcodeDefine[name] = code
    opcodeReverse[code] = name
}

setOpcode("proto_cb_login_req",7300)
setOpcode("proto_bc_login_ack",7301)
setOpcode("proto_cb_join_table_req",7302)
setOpcode("proto_bc_join_table_ack",7303)
setOpcode("proto_cb_leave_table_req",7304)
setOpcode("proto_bc_leave_table_ack",7305)
setOpcode("proto_bc_ply_join_not",7306)
setOpcode("proto_bc_ply_leave_not",7307)
setOpcode("proto_cb_ready_req",7308)
setOpcode("proto_bc_ready_not",7309)
setOpcode("proto_cb_change_table_req",7313)
setOpcode("proto_bc_update_ply_data_not",7318)
setOpcode("proto_bc_message_not",7320)
setOpcode("proto_bc_specify_item_update_not",21285)

setOpcode("proto_cg_starsky_season_noti", 5166);
setOpcode("proto_gc_two_complete_data_not", 5148);
setOpcode("proto_gc_task_complete_not", 5123);
setOpcode("proto_sic_new_round_not", 10000);
setOpcode("proto_gc_bet_lord_card_ack", 5133);
setOpcode("proto_gc_clienttimer_not", 5121);
setOpcode("proto_cg_lord_card_lottery_info", 5137);
setOpcode("proto_sic_history_req", 10001);
setOpcode("proto_gc_show_card_not", 5120);
setOpcode("proto_cg_play_card_ack", 5105);
setOpcode("proto_cg_show_card_ack", 5119);
setOpcode("proto_magic_emoji_req", 5162);
setOpcode("proto_gc_three_draw_notify", 5144);
setOpcode("proto_gc_two_show_card_not", 5145);
setOpcode("proto_gc_card_recode_req", 5170);
setOpcode("proto_gc_lord_card_not", 5103);
setOpcode("proto_AT_DAILY_ZHIZUN", 25);
setOpcode("proto_gc_three_draw_ack_data", 5143);
setOpcode("proto_svr_my_ack", 10015);
setOpcode("proto_gc_game_result_not", 5112);
setOpcode("proto_AT_LIAN_WIN", 27);
setOpcode("proto_AT_GAOJIRENWU", 17);
setOpcode("proto_AT_TASK", 13);
setOpcode("proto_cg_three_draw_req_card", 5140);
setOpcode("proto_gc_call_score_req", 5107);
setOpcode("proto_AT_DAILY_GAOJI", 23);
setOpcode("proto_gc_task_not", 5122);
setOpcode("proto_gc_double_score_req", 5151);
setOpcode("proto_gc_two_lord_card_not", 5147);
setOpcode("proto_gc_double_score_not", 5150);
setOpcode("proto_AT_MATCH_DUIZHAN", 1010);
setOpcode("proto_gc_bet_lord_card_result_ack", 5134);
setOpcode("proto_gc_laizi_not", 5126);
setOpcode("proto_gc_counts_not", 5127);
setOpcode("proto_sic_bet_clear_req", 10006);
setOpcode("proto_cg_complete_data_req", 5116);
setOpcode("proto_gc_pause_game_not", 5156);
setOpcode("proto_gc_lord_card_lottery_info", 5138);
setOpcode("proto_gc_use_card_recode_noti", 5169);
setOpcode("proto_gc_play_card_req", 5104);
setOpcode("proto_gc_item_info_not", 5164);
setOpcode("proto_gc_bomb_not", 5113);
setOpcode("proto_gc_refresh_card_not", 5102);
setOpcode("proto_gc_ju_count_not", 5158);
setOpcode("proto_gc_auto_not", 5115);
setOpcode("proto_gc_rob_lord_req", 5109);
setOpcode("proto_cg_bet_lord_card_req", 5132);
setOpcode("proto_gc_private_room_result_ack", 5154);
setOpcode("proto_gc_card_count_ack", 5125);
setOpcode("proto_cg_auto_req", 5114);
setOpcode("proto_gc_counts_not1", 5128);
setOpcode("proto_cg_send_card_ok_ack", 5101);
setOpcode("proto_AT_ZHONGJIZHADAN", 16);
setOpcode("proto_AT_DAILY_ZHIZUN_WIN", 26);
setOpcode("proto_gc_game_start_not", 5100);
setOpcode("proto_AT_FANCHUNTIAN", 12);
setOpcode("proto_AT_DAILY_ZHONGJI_WIN", 22);
setOpcode("proto_cg_rob_lord_ack", 5110);
setOpcode("proto_cg_get_lord_card_reward", 5135);
setOpcode("proto_sic_bet_update_ack", 10009);
setOpcode("proto_gc_lord_card_lottery_base", 5139);
setOpcode("proto_gc_two_let_card_not", 5146);
setOpcode("proto_sic_show_result_not", 10012);
setOpcode("proto_gc_expression_not", 5131);
setOpcode("proto_gc_show_card_req", 5118);
setOpcode("proto_cg_private_room_result_req", 5153);
setOpcode("proto_sic_bet_update_req", 10008);
setOpcode("proto_mj_completedata_req", 10013);
setOpcode("proto_cg_get_redpackets_award_req", 10017);
setOpcode("proto_gc_extra_double_score_not", 5149);
setOpcode("proto_gc_three_draw_ack_card", 5141);
setOpcode("proto_magic_emoji_noti", 5163);
setOpcode("proto_gc_game_modle", 5165);
setOpcode("proto_gc_play_card_private_not", 5159);
setOpcode("proto_NO_SUPPORT", 1);
setOpcode("proto_CO_NEW", 0);
setOpcode("proto_NO_EXIST", 3);
setOpcode("proto_AT_MATCH_48BEISHU", 1014);
setOpcode("proto_AT_DAILY_CHUJI", 19);
setOpcode("proto_NO_SEND_SELF", 4);
setOpcode("proto_AT_ZHADAN", 7);
setOpcode("proto_AT_ZHIZUNSHENGLI", 6);
setOpcode("proto_AT_SHUNZI", 9);
setOpcode("proto_AT_GAOJI48BEISHU", 15);
setOpcode("proto_cli_my_req", 10014);
setOpcode("proto_gc_game_result_not1", 5130);
setOpcode("proto_cg_card_count_req", 5124);
setOpcode("proto_AT_DAILY_ZHONGJI", 21);
setOpcode("proto_AT_CHUNTIAN", 11);
setOpcode("proto_sic_history_ack", 10002);
setOpcode("proto_gc_play_card_not", 5106);
setOpcode("proto_AT_FEIJI", 8);
setOpcode("proto_cg_double_score_ack", 5152);
setOpcode("proto_cg_three_draw_req_data", 5142);
setOpcode("proto_cg_call_score_ack", 5108);
setOpcode("proto_NO_ENOUGH_CARD", 5);
setOpcode("proto_NO_ENOUGH_MONEY", 2);
setOpcode("proto_gc_replay_data_not", 5160);
setOpcode("proto_sic_bet_begin_not", 10003);
setOpcode("proto_gc_user_savestar_card_noti", 5168);
setOpcode("proto_gc_starsky_update_item", 5167);
setOpcode("proto_svr_test_not", 10016);
setOpcode("proto_gc_get_redpackets_award_ack", 10018);
setOpcode("proto_gc_update_player_tokenmoney_not", 10019);
setOpcode("proto_sic_bet_clear_ack", 10007);
setOpcode("proto_EXPRESSION_CAT", 10020);
setOpcode("proto_gc_private_room_result_not", 5155);
setOpcode("proto_sic_result_data_not", 10010);
setOpcode("proto_gc_common_not", 5111);
setOpcode("proto_gc_had_start_not", 5157);
setOpcode("proto_sic_show_light_cell_not", 10011);
setOpcode("proto_AT_BISAIRENWU", 18);
setOpcode("proto_gc_complete_data_not", 5117);
setOpcode("proto_sic_bet_ack", 10005);
setOpcode("proto_AT_ZHONGJI12BEISHU", 14);
setOpcode("proto_AT_DAILY_GAOJI_WIN", 24);
setOpcode("proto_gc_card_count_ack1", 5129);
setOpcode("proto_sic_bet_req", 10004);
setOpcode("proto_AT_DAILY_CHUJI_WIN", 20);
setOpcode("proto_gc_get_lord_card_reward", 5136);
setOpcode("proto_gc_send_dizhu_not", 5161);
setOpcode("proto_AT_LIANDUI", 10);
setOpcode("proto_cg_get_redpackets_88yuan_award_req",10020)
setOpcode("proto_gc_get_redpackets_88yuan_award_ack",10021)
setOpcode("proto_gc_magic_emoji_config_not",10022)
setOpcode("proto_cg_look_lord_card_req", 10023)
setOpcode("proto_cg_beishu_info_req", 10024)
setOpcode("proto_gc_beishu_info_ack", 10025)

setOpcode("proto_bc_cli_timer_not", 7319)
setOpcode("proto_cb_create_table_req", 7321)
setOpcode("proto_bc_create_table_ack", 7322)
setOpcode("proto_bc_private_invite_code_not", 21226)
setOpcode("proto_cb_dismiss_private_table_req", 21230)
setOpcode("proto_bc_dismiss_private_table_ack", 21231)
setOpcode("proto_bc_force_dismiss_private_table_req",21232)
setOpcode("proto_cb_force_dismiss_private_table_ack",21233)
setOpcode("proto_bc_force_dismiss_private_table_not",21234)
setOpcode("proto_bc_dismiss_private_result_not",21250)


setOpcode("proto_cb_join_match_req",21238)
setOpcode("proto_bc_join_match_ack",21239)
setOpcode("proto_bc_match_rank_not",21240)
setOpcode("proto_bc_match_sign_num_not",21242)
setOpcode("proto_bc_match_scores_not",21243)
setOpcode("proto_bc_win_lose_limit_exceed_not",21244)
setOpcode("proto_cb_match_continue_req",21245)
setOpcode("proto_cb_get_rank_list_req",21247)
setOpcode("proto_bc_get_rank_list_ack",21248)
setOpcode("proto_cb_get_private_invite_req",21249)
setOpcode("proto_bc_dismiss_private_result_not",21250)
setOpcode("proto_bc_match_cancel_not",21252)
setOpcode("proto_bc_match_weed_out_score_not",21253)
setOpcode("proto_bc_match_transfer_server_noti",21260)
setOpcode("proto_bc_match_relive_noti",21282)
setOpcode("proto_cb_match_relive_req",21283)
setOpcode("proto_bc_match_relive_ack",21284)
setOpcode("proto_bc_specify_item_update_not",21285)
setOpcode("proto_bc_match_info_noti",21290)
setOpcode("proto_bc_match_survival_noti",21302)
setOpcode("proto_bc_match_survival_award_noti",21303)
setOpcode("proto_cb_match_survival_config_req",21306)
setOpcode("proto_bc_match_survival_config_ack",21307)
setOpcode("proto_cb_club_create_room_req",21310)
setOpcode("proto_cb_match_stage_config_req",21311)
setOpcode("proto_bc_match_stage_config_ack",21312)
setOpcode("proto_bc_match_stage_message_noti",21313)
setOpcode("proto_bc_match_stage_award_noti",21314)
setOpcode("proto_bc_game_get_score_noti",21319)

setOpcode("proto_cb_join_match_req",21238)
setOpcode("proto_cb_match_join_flow_match_req",21335)
setOpcode("proto_cb_play_quit_flow_match_req",21337)
setOpcode("proto_bc_play_quit_flow_match_ack",21338)

setOpcode("proto_cg_regain_lose_score_req", 10026)
setOpcode("proto_gc_regain_lose_score_ack", 10027)
setOpcode("proto_cg_enable_invincible_req", 10028)
setOpcode("proto_gc_enable_invincible_ack", 10029)

/*
//未加入协议
bc_apply_match_ack
bc_award_type_not
bc_below_admission_limit_tip_not
bc_calc_player_round_count_not
bc_change_table_req
bc_chat_not
bc_cli_timer_not
bc_common_message_not
bc_coupon_not
bc_force_dismiss_private_table_not
bc_force_dismiss_private_table_req
bc_game_get_score_noti
bc_get_assist_info_data_ack
bc_get_match_data_ack
bc_get_online_award_ack
bc_get_online_time_ramain_ack
bc_get_round_award_ack
bc_get_table_list_ack
bc_get_table_list_ack2
bc_give_gift_ack
bc_give_gift_not
bc_integal_condition_noti
bc_join_table_ack20121227
bc_kickout_ack
bc_login_ack20121227
bc_match_add_score_ack
bc_match_config_not
bc_match_get_dynamic_award_ack
bc_match_rank_not
bc_match_reach_achiev_noti
bc_match_relive_ack
bc_match_relive_noti
bc_match_stage_award_noti
bc_match_stage_config_ack
bc_match_stage_message_noti
bc_match_survival_award_noti
bc_match_survival_config_ack
bc_match_survival_noti
bc_match_update_achiev_noti
bc_match_weed_out_score_not

bc_player_round_not
bc_ply_join_not20121227
bc_recharge_tip_not
bc_reset_match_ack
bc_round_award_items_not
bc_send_prop_ack
bc_send_prop_not
bc_specify_item_update_not
bc_update_ply_data_not20121227
bc_win_lose_limit_exceed_not
cb_apply_match_req
cb_chat_req
cb_create_table_req
cb_force_dismiss_private_table_ack
cb_get_assist_info_data_req
cb_get_match_data_req
cb_get_online_award_req
cb_get_online_time_ramain_req
cb_get_round_award_req
cb_get_table_list_req
cb_get_table_list_req2
cb_give_gift_req
cb_kickout_req
cb_match_add_score_req
cb_match_get_dynamic_award_req
cb_match_stage_config_req
cb_match_survival_config_req
cb_ply_place_not
cb_reset_match_req
cb_send_prop_req
cb_visit_table_req
*/

export default function opcodeConfig(obj : String | Number) {
    
    if (typeof obj == "string")
        return opcodeDefine[obj as string]
    else if (typeof obj == "number")
        return opcodeReverse[obj as number]
   
    return null        
}
