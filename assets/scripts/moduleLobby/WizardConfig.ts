import DataManager from "../base/baseData/DataManager";

export namespace WizardConfig {

    export let wizard_storage_key = "wizard_storage_key_" 
    export let current_wizard_index = DataManager.load("wizard_index")
    export let ALLKEY = {
        // WIZARD_INDEX_XXX: 1,
        WIZARD_INDEX_GAME_DUIHUAN: 1,
        WIZARD_INDEX_GAME_HONGBAO: 2,
    }
    export let wizardConfig = []
    
    wizardConfig[WizardConfig.ALLKEY.WIZARD_INDEX_GAME_DUIHUAN] = {
        dialogText: "福卡可兑换多种游戏道具及话费。",

        wizardPos: cc.v2(-250, -150),

        needArrow: true,
        arrowPosType: 1,
        arrowPos: cc.v2(70, 40),
        
        clickCorrect: true,	

        btnTexture: "btn_know",
        btnShowDelayTime: 0

    }
    
    wizardConfig[WizardConfig.ALLKEY.WIZARD_INDEX_GAME_HONGBAO] = {
        dialogText: "满4局就能抽福袋啦，祝您好运哦！", // 向导对话        					
        
        wizardPos: cc.v2(180, 0),			                        // 向导位置
        wizardFilp: true,											// 向导是否 反转flase面朝左，true面朝右

        contentSize: cc.size(80, 80),                           // 内容的大小，不定义直接去node的大小
        // MessagePos: cc.v2(0, 0), 	                                    // 文本位置 默认在向导头上

        // needHand: true,											// 是否需要手指图标
        // handPosType: 1
        // handPos: cc.v2(0, 0), 	                                    // 手指位置 默认在content边上

        // needArrow: true,                                     //是否是要箭头
        // arrowPosType: 1,                                     //箭头位置类型 0 绝对位置， 1相对位置
        // arrowPos: cc.v2()                                        //箭头位置

        clickCorrect: true,										// 是否需要点击在正确位置
        needLastIndex: 0,											// 是否依赖上一个引导，0不依赖，>0 依赖的上一个index
        
        btnTexture: "btn_start_redpacket",
        btnShowDelayTime: 0
    }
}