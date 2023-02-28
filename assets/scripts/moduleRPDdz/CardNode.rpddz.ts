import DataManager from "../base/baseData/DataManager";

import BaseComponent from "../base/BaseComponent"
import BaseFunc = require("../base/BaseFunc")
import GameLogic from "./GameLogic.rpddz";

var card_type_res_big = {
	0: "heitao",
	1: "hongtao",
	2: "meihua",
	3: "fangkuai",
}

var card_type_res_small = {
	0: "puke_heitao1",
	1: "puke_hongtao1",
	2: "puke_meihua1",
	3: "puke_fangkuai1",
}

var card_type_role = {
	11: "J",
	12: "Q",
	13: "K",
}


var value_to_frame = {
	14: 1,
	15: 2,
}

var card_type = {
	1: "bigCard",
	2: "smallCard",
}


const {ccclass, property} = cc._decorator;

@ccclass
export default class CardNode extends BaseComponent {    

	@property()
	mNValue:number = 0

	@property()
	mNColor:number = 0

	@property()
	cardType:number = 1
	
    @property(cc.SpriteAtlas)
	pukeatlas: cc.SpriteAtlas = null
	
	@property()
	m_bSelected:boolean = false
	/******************************************************************************************************************/
	//												初      始      化 
	/******************************************************************************************************************/
	onLoad() {
		BaseFunc.bindChildToTarget(this.node, this)

		// 1. 初始化数据
		this.InitData();

		// 2. 注册监听事件
		this.RegisterNoticeEvent();
	}

	start() {
        //    this.addTouchEvent();
        
    
	}


	//---------------------------- [[ 注册监听事件 ]] ---------------------------- //
	InitData() {
		this.mNValue = 0;
		this.mNColor = 0;
    }
    
	//---------------------------- [[ 注册监听事件 ]] ---------------------------- //
	RegisterNoticeEvent() {
		this.add_touch_event()		
	}

	/******************************************************************************************************************/
	//											逻      辑      处      理
	/******************************************************************************************************************/
	/*
	    -- [[ 设置牌值 ]] --
	*/
	set_value(nValue, nColor) {

		this.mNValue = nValue;
		this.mNColor = nColor;

		// 1. 判断数据是否异常
		if ((!nValue || typeof(nValue) != 'number' || nValue > 16) || (nColor == null || typeof(nColor) != 'number' || nColor > 3)) {
			this.showPaiBei()
			console.error('card node set value failed for the wrong param : %s , %s', JSON.stringify(nValue), JSON.stringify(nColor));
			return false;
		}

		this.removePaiBei()
		// 2. 设置隐藏和显示节点
		nValue = value_to_frame[nValue] ? value_to_frame[nValue] : nValue;
		var szHideNodeName = nValue == 16 ? "node_simple" : "node_joker";
		this.node.getChildByName(szHideNodeName).active = false;

		var szShowNodeName = nValue == 16 ? "node_joker" : "node_simple";
		var shownode = this.node.getChildByName(szShowNodeName)
		this.node.getChildByName(szShowNodeName).active = true

		// 2_1. 设置牌值显示(A -- 王)
		var szColor = "";
		if (nValue == 16) {
			szColor = nColor == 1 ? "red" : "black";
		} else {
			szColor = nColor == 1 || nColor == 3 ? "red" : "black";
		}
		var szPrefix = nValue == 16 ? "jokerword" : nValue;
		var szValueName = szPrefix + szColor;
		shownode.getChildByName("spr_card_value").getComponent(cc.Sprite).spriteFrame = DataManager.Instance.getSpriteFrame("PuKe_rpddz_1", szValueName)
		// 2_2. 设置属性显示(红黑梅方)
		if (nValue != 16) {
			shownode.getChildByName("spr_type_small").getComponent(cc.Sprite).spriteFrame = DataManager.Instance.getSpriteFrame("PuKe_rpddz_1", card_type_res_small[nColor])
		}

		// 2_3. 设置大的形象显示
		var szTemp = ""
		var szPath = "puke_"
		if (nValue == 16) {
			szTemp = nColor == 1 ? "dawang" : "xiaowang";
		// } else if (nValue > 10 && nValue < 16) {
			// szTemp = nColor == 1 || nColor == 3 ? "hong" : "hei";
			// szTemp = szTemp + card_type_role[nValue]
			this.node.getChildByName("spr_type_big").active = true
		} else {
			szTemp = card_type_res_big[nColor];
			if(this.cardType == 2) {
				this.node.getChildByName("spr_type_big").active = false
			}
		}
		szPath = szPath + szTemp;
		this.node.getChildByName("spr_type_big").getComponent(cc.Sprite).spriteFrame = DataManager.Instance.getSpriteFrame("PuKe_rpddz_1", szPath)
	}

	showPaiBei() {
		if (typeof(this.node.getChildByName("back")) != "undefined") {
			this.node.getChildByName("back").active = true
		}
	}

	removePaiBei() {
		if (typeof(this.node.getChildByName("back")) != "undefined") {
			this.node.getChildByName("back").active = false
		}
	}

	/*
	    -- [[ 添加点击事件 ]] --
	*/
	add_touch_event()
    {
        this.node.on(cc.Node.EventType.TOUCH_START, function (event) {
            // console.log('this.node TOUCH_START');
        }, this.node);

        this.node.on(cc.Node.EventType.TOUCH_MOVE, function (event) {
            // console.log('this.node TOUCH_MOVE');
        }, this.node);

        this.node.on(cc.Node.EventType.TOUCH_END, function (event) {
            // console.log('this.node TOUCH_END');
        }, this.node);

        this.node.on(cc.Node.EventType.TOUCH_CANCEL, function (event) {
            // console.log('this.node TOUCH_CANCEL');
        }, this.node);
    }

	/*
	    -- [[ 设置扑克遮罩状态 ]] --
	*/
	set_mask_status( bValue ){
		this.mask.active = bValue
	}

	move_to_dst_action() {
		// cc.log("move_to_dst_action", this.node.dstX, this.node.position)
		this.node.active = true
		if (this.node.dstX == this.node.x) {
			return
		}
		this.node.stopAllActions()
		this.node.runAction(cc.moveTo(0.2, this.node.dstX, this.node.y))
	}

	play_appear_action(appearpos) {
		this.node.active = true
		var lastpos = this.node.position
		this.node.position = appearpos
		// cc.log("play_appear_action", lastpos)
		this.node.stopAllActions()
		this.node.runAction(cc.moveTo(0.2, lastpos).easing(cc.easeSineOut()))

	}


	delay_appear(fTime) {
		if(fTime < 0) return;
		this.mNTempopacity = this.node.opacity
		this.mNTempX = this.node.x
		this.node.opacity = 0
		this.node.x -= 50


        let action1 = []
        action1[action1.length] = cc.moveTo(0.3, cc.v2(this.mNTempX, this.node.y)).easing(cc.easeSineOut());
        action1[action1.length] = cc.delayTime(0.1)
        // action1[action1.length] = cc.fadeTo(0.1, 255)
        if (GameLogic.Instance().isBuxipaiMode()) {
            let i = fTime * 10
            fTime = 0.5 * Math.floor(i / 6) + (i % 6) * 0.03
        }

        let actions = []
        actions[actions.length] = cc.delayTime(fTime + 0.3)
        actions[actions.length] = cc.spawn(action1)
        actions[actions.length] = cc.callFunc(function () {
			this.node.opacity = 255
		}.bind(this)),
        this.node.runAction(cc.sequence(actions))

	}

	
	/*
	    -- [[ 当前牌是否被选中 ]] --
	*/
	is_selected(){
		return this.m_bSelected
	}


	/*
	    -- [[ 设置当前牌选中状态 ]] --
	*/
	set_selected_status(bStatus){
		this.m_bSelected = bStatus
	}

	
	/*
	    -- [[ 设置当前牌选中状态 ]] --
	*/
	showLord(flag = false){
		this.spt_lord_note.active = flag
	}

	showMingpai(flag = false){
		this.icon_show.active = flag
	}
}