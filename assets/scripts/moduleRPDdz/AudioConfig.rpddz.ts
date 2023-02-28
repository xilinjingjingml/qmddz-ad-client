export namespace AudioConfig {

	export let audio_sounds_table = {}
	audio_sounds_table['sound'] = {}
	// audio_sounds_table['music'] = {}

	// audio_sounds_table['music']['bg_music'] = 'sounds/background'
	audio_sounds_table['sound']['bg_music'] = 'sounds/background3'

	audio_sounds_table["sound"]["audio_alarm"]="sounds/cardalarm";
	audio_sounds_table["sound"]["audio_bomb"]="sounds/bomb";
	audio_sounds_table["sound"]["audio_clock"]="sounds/clock";
	audio_sounds_table["sound"]["audio_dropcard"]="sounds/dropcards";
	audio_sounds_table["sound"]["audio_lose"]="sounds/lose";
	audio_sounds_table["sound"]["audio_menu"]="sounds/menu";
	
	audio_sounds_table["sound"]["audio_plane"]="sounds/plane";
	audio_sounds_table["sound"]["audio_putcard"]="sounds/putcard";
	audio_sounds_table["sound"]["audio_relieves"]="sounds/relieves";
	audio_sounds_table["sound"]["audio_rocket"]="sounds/wangzha";
	audio_sounds_table["sound"]["audio_sendcard"]="sounds/sendcard";
	audio_sounds_table["sound"]["audio_start"]="sounds/start";
	
	audio_sounds_table["sound"]["audio_shunzi"]="sounds/double";
	audio_sounds_table["sound"]["audio_chat_0"]="sounds/dialogue/chat_0";
	audio_sounds_table["sound"]["audio_chat_1"]="sounds/dialogue/chat_1";
	audio_sounds_table["sound"]["audio_chat_2"]="sounds/dialogue/chat_2";
	audio_sounds_table["sound"]["audio_chat_3"]="sounds/dialogue/chat_3";
	audio_sounds_table["sound"]["audio_chat_4"]="sounds/dialogue/chat_4";
	audio_sounds_table["sound"]["audio_chat_5"]="sounds/dialogue/chat_5";
	audio_sounds_table["sound"]["audio_chat_6"]="sounds/dialogue/chat_6";
	audio_sounds_table["sound"]["audio_chat_7"]="sounds/dialogue/chat_7";
	audio_sounds_table["sound"]["audio_chat_8"]="sounds/dialogue/chat_8";
	audio_sounds_table["sound"]["audio_chat_9"]="sounds/dialogue/chat_9";

		
	audio_sounds_table["sound"]["audio_out_card"]="sounds/Audio_Out_Card";
	audio_sounds_table["sound"]["audio_drop_money"]="sounds/effect_dropmoney_1";
	audio_sounds_table["sound"]["audio_win"]="sounds/effect_win";
	audio_sounds_table["sound"]["audio_select_card"]="sounds/lord_select_card";
	audio_sounds_table["sound"]["audio_dispatch"]="sounds/Special_Dispatch";
	audio_sounds_table["sound"]["audio_remind"]="sounds/Special_Remind";

	
	audio_sounds_table["sound"]["audio_pass_type_1"]="sounds/buyao1";
	audio_sounds_table["sound"]["audio_pass_type_2"]="sounds/buyao2";
	audio_sounds_table["sound"]["audio_pass_type_3"]="sounds/buyao3";
		

	// 出牌人声
	var soundSex = ['man', 'woman']
	for (var sexType of soundSex) {
			
		audio_sounds_table["sound"]["audio_pass" + sexType]="sounds/mandarin/" + sexType + "/pass" + "_" + sexType + "";
		audio_sounds_table["sound"]["audio_score0" + sexType]="sounds/mandarin/" + sexType + "/score0" + "_" + sexType + "";
		audio_sounds_table["sound"]["audio_score1" + sexType]="sounds/mandarin/" + sexType + "/score1" + "_" + sexType + "";
		audio_sounds_table["sound"]["audio_score2" + sexType]="sounds/mandarin/" + sexType + "/score2" + "_" + sexType + "";
		audio_sounds_table["sound"]["audio_score3" + sexType]="sounds/mandarin/" + sexType + "/score3" + "_" + sexType + "";
		audio_sounds_table["sound"]["audio_call_lord" + sexType]="sounds/mandarin/" + sexType + "/call_lord" + "_" + sexType + "";
		audio_sounds_table["sound"]["audio_show" + sexType]="sounds/mandarin/" + sexType + "/show_card" + "_" + sexType + "";
		audio_sounds_table["sound"]["audio_rob" + sexType]="sounds/mandarin/" + sexType + "/rob" + "_" + sexType + "";
		audio_sounds_table["sound"]["audio_no_rob" + sexType]="sounds/mandarin/" + sexType + "/no_rob" + "_" + sexType + "";
		audio_sounds_table["sound"]["audio_duiduishun" + sexType]="sounds/mandarin/" + sexType + "/duiduishun" + "_" + sexType + "";
		audio_sounds_table["sound"]["audio_feiji" + sexType]="sounds/mandarin/" + sexType + "/feiji" + "_" + sexType + "";
		audio_sounds_table["sound"]["audio_danshun" + sexType]="sounds/mandarin/" + sexType + "/danshun" + "_" + sexType + "";
		audio_sounds_table["sound"]["audio_jiabei" + sexType]="sounds/mandarin/" + sexType + "/jiabei" + "_" + sexType + "";
		audio_sounds_table["sound"]["audio_superdouble" + sexType]="sounds/mandarin/" + sexType + "/superdouble" + "_" + sexType + "";
		audio_sounds_table["sound"]["audio_3" + sexType]="sounds/mandarin/" + sexType + "/3_0_0" + "_" + sexType + "";
		audio_sounds_table["sound"]["audio_4" + sexType]="sounds/mandarin/" + sexType + "/4_0_0" + "_" + sexType + "";
		audio_sounds_table["sound"]["audio_5" + sexType]="sounds/mandarin/" + sexType + "/5_0_0" + "_" + sexType + "";
		audio_sounds_table["sound"]["audio_6" + sexType]="sounds/mandarin/" + sexType + "/6_0_0" + "_" + sexType + "";
		audio_sounds_table["sound"]["audio_7" + sexType]="sounds/mandarin/" + sexType + "/7_0_0" + "_" + sexType + "";
		audio_sounds_table["sound"]["audio_8" + sexType]="sounds/mandarin/" + sexType + "/8_0_0" + "_" + sexType + "";
		audio_sounds_table["sound"]["audio_9" + sexType]="sounds/mandarin/" + sexType + "/9_0_0" + "_" + sexType + "";
		audio_sounds_table["sound"]["audio_10" + sexType]="sounds/mandarin/" + sexType + "/10_0_0" + "_" + sexType + "";
		audio_sounds_table["sound"]["audio_11" + sexType]="sounds/mandarin/" + sexType + "/11_0_0" + "_" + sexType + "";
		audio_sounds_table["sound"]["audio_12" + sexType]="sounds/mandarin/" + sexType + "/12_0_0" + "_" + sexType + "";
		audio_sounds_table["sound"]["audio_13" + sexType]="sounds/mandarin/" + sexType + "/13_0_0" + "_" + sexType + "";
		audio_sounds_table["sound"]["audio_14" + sexType]="sounds/mandarin/" + sexType + "/14_0_0" + "_" + sexType + "";
		audio_sounds_table["sound"]["audio_15" + sexType]="sounds/mandarin/" + sexType + "/15_0_0" + "_" + sexType + "";
		audio_sounds_table["sound"]["audio_16" + sexType]="sounds/mandarin/" + sexType + "/16_0_0" + "_" + sexType + "";
		audio_sounds_table["sound"]["audio_17" + sexType]="sounds/mandarin/" + sexType + "/17_0_0" + "_" + sexType + "";
		audio_sounds_table["sound"]["audio_2_3" + sexType]="sounds/mandarin/" + sexType + "/33_0_0" + "_" + sexType + "";
		audio_sounds_table["sound"]["audio_2_4" + sexType]="sounds/mandarin/" + sexType + "/44_0_0" + "_" + sexType + "";
		audio_sounds_table["sound"]["audio_2_5" + sexType]="sounds/mandarin/" + sexType + "/55_0_0" + "_" + sexType + "";
		audio_sounds_table["sound"]["audio_2_6" + sexType]="sounds/mandarin/" + sexType + "/66_0_0" + "_" + sexType + "";
		audio_sounds_table["sound"]["audio_2_7" + sexType]="sounds/mandarin/" + sexType + "/77_0_0" + "_" + sexType + "";
		audio_sounds_table["sound"]["audio_2_8" + sexType]="sounds/mandarin/" + sexType + "/88_0_0" + "_" + sexType + "";
		audio_sounds_table["sound"]["audio_2_9" + sexType]="sounds/mandarin/" + sexType + "/99_0_0" + "_" + sexType + "";
		audio_sounds_table["sound"]["audio_2_10" + sexType]="sounds/mandarin/" + sexType + "/1010_0_0" + "_" + sexType + "";
		audio_sounds_table["sound"]["audio_2_11" + sexType]="sounds/mandarin/" + sexType + "/1111_0_0" + "_" + sexType + "";
		audio_sounds_table["sound"]["audio_2_12" + sexType]="sounds/mandarin/" + sexType + "/1212_0_0" + "_" + sexType + "";
		audio_sounds_table["sound"]["audio_2_13" + sexType]="sounds/mandarin/" + sexType + "/1313_0_0" + "_" + sexType + "";
		audio_sounds_table["sound"]["audio_2_14" + sexType]="sounds/mandarin/" + sexType + "/1414_0_0" + "_" + sexType + "";
		audio_sounds_table["sound"]["audio_2_15" + sexType]="sounds/mandarin/" + sexType + "/1515_0_0" + "_" + sexType + "";
		audio_sounds_table["sound"]["audio_3_0" + sexType]="sounds/mandarin/" + sexType + "/333_0_0" + "_" + sexType + "";
		audio_sounds_table["sound"]["audio_3_2" + sexType]="sounds/mandarin/" + sexType + "/332_0_0" + "_" + sexType + "";
		audio_sounds_table["sound"]["audio_3_1" + sexType]="sounds/mandarin/" + sexType + "/331_0_0" + "_" + sexType + "";
		audio_sounds_table["sound"]["audio_4_2" + sexType]="sounds/mandarin/" + sexType + "/411_0_0" + "_" + sexType + "";
		audio_sounds_table["sound"]["audio_plane_0" + sexType]="sounds/mandarin/" + sexType + "/plane" + "_" + sexType + "";
		audio_sounds_table["sound"]["audio_bomb_0" + sexType]="sounds/mandarin/" + sexType + "/bomb" + "_" + sexType + "";
		

	}
}