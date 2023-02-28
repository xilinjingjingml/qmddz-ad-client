import GameRule from "./GameRule.rpddz";
import DataManager from "../base/baseData/DataManager";
import { czcEvent } from "../base/BaseFuncTs";

// let GameLogic.Instance() = GameLogic.Instance()

var cards_array_type = cc.Enum({
    "居中显示"  : 1,
    "左对齐"   : 2,
    "右对齐"   : 3,
  })

var card_appear_ani = cc.Enum({
    NONE:0,
    POINT:1,
    LEFT_TO_RIGHT:2,
})

cc.Class({
    extends: cc.Component,

    properties: {
        // 手牌初始张数
        initial_card_count: {
            default: 17,
            type: cc.Integer,
            displayName: "手牌张数",
            tooltip: "手牌的初始张数",
        },

        // 第一张牌或者最后一张牌到边缘的距离
        distance_to_edge: {
            default: 10,
            type: cc.Integer,
            displayName: "边缘距离",
            tooltip: "第一张牌或者最后一张牌到边缘的距离",
        },

        // 一行中最多能显示的牌数
        max_row_count: {
            default: 10,
            type: cc.Integer,
            displayName: "单行最多张数",
            tooltip: "一行中最多能显示的牌数",
        },

        // 手牌模板
        card_node_template: {
            default: null,
            type: cc.Prefab,
            displayName: "手牌模板",
            tooltip: "手牌模板",
        },

        // 添加点击事件
        add_touch_event: {
            default: false,
            displayName: "添加点击",
            tooltip: "区域内的节点是否添加点击事件",
        },

        // 子节点的缩放比例
        child_node_scale: {
            default: 1.0,
            displayName: "子节点的缩放比例",
            tooltip: "子节点的缩放比例",
        },

        // 排列方式
        array_type: {
            default: cards_array_type["居中显示"],
            type: cards_array_type,
            displayName: "排序方式",
            tooltip: "居中显示 \n左对齐 \n右对齐 ",
        },

        // 牌出现的动画方式
        card_appear_ani: {
            default: card_appear_ani.NONE,
            type: card_appear_ani,
            displayName: "牌节点出现动画",
            tooltip: "啥动画不动画的 \n从初始点移动到最终点 \n从左往右,从上往下 ",
        },

        // 牌从初始点开始移动的初始点
        card_appear_ani_begin_node:{
            default:null,
            type:cc.Node,
            displayName: "初始点",
        },

        // 炸弹选牌火焰
        spine_bomb_fire:{
            default:null,
            type:sp.SkeletonData,
        },
    },


    /******************************************************************************************************************/
    //                                              初      始      化 
    /******************************************************************************************************************/
    onLoad() {
        // 1. 初始化数据
        this.InitData();

        // 2. 注册监听事件
        this.RegisterNoticeEvent();

        // 3. 注册点击事件
        this.addTouchEvent();
    },

    start() {

    },

    __bindButtonHandler() {
        cc.log("__bindButtonHandler areacardnode")
    },

    //---------------------------- [[ 注册监听事件 ]] ---------------------------- //
    InitData() {
        this.mNCardNameIndex = 0 // 牌的名字开始索引

        this.mVecHandCard = []; // 玩家手牌(从大到小)
        this.cardinitYList = []; // 手牌初始纵坐标列表
        this.touchedCards = []; // 触摸选择到的牌
        this.selectedCards = []; // 选中的牌

        this.nodeCardPool = new cc.NodePool();      
    },

    //---------------------------- [[ 注册监听事件 ]] ---------------------------- //
    RegisterNoticeEvent() {},

    clearCards() {
        for(let ele of this.node._children) {
            this.nodeCardPool.put(ele)
        }
        this.nodeSpineBomb = null
        this.node.removeAllChildren()
        this.InitData()
    },

    /******************************************************************************************************************/
    //                                          逻      辑      处      理
    /******************************************************************************************************************/
    /*------------------------------------------------------
    -- < 1 > 手牌初始化
    ------------------------------------------------------*/
    /*
        -- [[ 实例化 ]] --
    */
    instantiate_card(nValue, nColor) {
        
        var node = this.nodeCardPool.get()
        
        if(node == null) {
            node = cc.instantiate(this.card_node_template); 
        }

        this.node.addChild(node);
        node.setScale(this.child_node_scale)
        // node.width = node.width * this.child_node_scale
        // node.height = node.height * this.child_node_scale
        node.name = "card_node" + this.mNCardNameIndex
        this.mNCardNameIndex++;
        node.getComponent(cc.Component).set_value(nValue, nColor);

        // if (this.add_touch_event) {
        //     node.getComponent(cc.Component).add_touch_event()
        // }
        return node
    },

    /*
        -- [[ 设置牌值 ]] --
        --  @remark                 现在对于没有用到的节点的处理是删除,后面根据需要(比如播放动画)再进行删除
    */
    set_card_value(vecCards, noRefresh = false, noSort = false, isShowCard = false) {
        var ExistList = [];
        var TempList = [];

		// 1. 判断新的手牌之前是否存在,如果不存在则实例化
		for (var nIndex = 0; nIndex < vecCards.length; nIndex++) {
			var nValue = vecCards[nIndex].mNValue;
			var nColor = vecCards[nIndex].mNColor;
			var bExist = false;
			for (var nIndex_1 = 0; nIndex_1 < this.mVecHandCard.length; nIndex_1++) {
				if (!TempList[nIndex_1]) {
					var card_node = this.mVecHandCard[nIndex_1];
					var nCardValue = card_node.getComponent(cc.Component).mNValue;
					var nCardColor = card_node.getComponent(cc.Component).mNColor;
					if (nValue == nCardValue && nColor == nCardColor) {
						bExist = true;
						ExistList[nIndex_1] = true;
						break
					}
				}
			}

            if (!bExist) {
                var newnode = this.instantiate_card(nValue, nColor)
                TempList.push(newnode);
            }
        }

        // 2. 获取新的数组,删除没有用到的节点
        for (var nIndex = 0; nIndex < this.mVecHandCard.length; nIndex++) {
            if (ExistList[nIndex]) {
                TempList.push(this.mVecHandCard[nIndex])
            } else {
                this.nodeCardPool.put(this.mVecHandCard[nIndex])
            }
        }

        // 3. 重新设置位置
        this.mVecHandCard = TempList;
        if (!noSort) {            
            this.mVecHandCard.sort(this.sort_cards);
        }
        for (var nIndex = 0; nIndex < this.mVecHandCard.length; nIndex++) {
            this.mVecHandCard[nIndex].zIndex = nIndex + 1;
            this.mVecHandCard[nIndex].getComponent(cc.Component).set_selected_status(false);
            this.mVecHandCard[nIndex].getComponent(cc.Component).showMingpai(false)
        }
        if (this.mVecHandCard.length > 0 && isShowCard) {
            this.mVecHandCard[this.mVecHandCard.length - 1].getComponent(cc.Component).showMingpai(true);
        }

        if (typeof(noRefresh) != "undefined" && noRefresh) {

        }else {
            this.reset_hand_card_pos()
        }
    },

    refresh_hand_card_icon(isShowCard = false) {
        for (var nIndex = 0; nIndex < this.mVecHandCard.length; nIndex++) {
            this.mVecHandCard[nIndex].getComponent(cc.Component).showMingpai(false)
        }
        if (this.mVecHandCard.length > 0 && isShowCard) {
            this.mVecHandCard[this.mVecHandCard.length - 1].getComponent(cc.Component).showMingpai(true);
        }
    },
    
    /*
        -- [[ 设置牌值 ]] --
        --  @remark                 现在对于没有用到的节点的处理是删除,后面根据需要(比如播放动画)再进行删除
    */
   set_putcard_value(vecCards, noRefresh, isLord = false) {
    var ExistList = [];
    var TempList = [];

    // 1. 判断新的手牌之前是否存在,如果不存在则实例化
    for (var nIndex = 0; nIndex < vecCards.length; nIndex++) {
        var nValue = vecCards[nIndex].mNValue;
        var nColor = vecCards[nIndex].mNColor;
        var bExist = false;
        for (var nIndex_1 = 0; nIndex_1 < this.mVecHandCard.length; nIndex_1++) {
            if (!TempList[nIndex_1]) {
                var card_node = this.mVecHandCard[nIndex_1];
                var nCardValue = card_node.getComponent(cc.Component).mNValue;
                var nCardColor = card_node.getComponent(cc.Component).mNColor;
                if (nValue == nCardValue && nColor == nCardColor) {
                    bExist = true;
                    ExistList[nIndex_1] = true;
                    break
                }
            }
        }

        if (!bExist) {
            var newnode = this.instantiate_card(nValue, nColor)
            TempList.push(newnode);
        }
    }

    // 2. 获取新的数组,删除没有用到的节点
    for (var nIndex = 0; nIndex < this.mVecHandCard.length; nIndex++) {
        if (ExistList[nIndex]) {
            TempList.push(this.mVecHandCard[nIndex])
        } else {
            this.nodeCardPool.put(this.mVecHandCard[nIndex])
        }
    }

    // 3. 重新设置位置
    this.mVecHandCard = TempList;
    this.mVecHandCard.sort(this.sort_cards);
    for (var nIndex = 0; nIndex < this.mVecHandCard.length; nIndex++) {
        this.mVecHandCard[nIndex].zIndex = nIndex + 1;
        this.mVecHandCard[nIndex].getComponent(cc.Component).set_selected_status(false);
        this.mVecHandCard[nIndex].getComponent(cc.Component).showLord(false);   
    }

    if (this.mVecHandCard.length > 0 && isLord) {
        this.mVecHandCard[this.mVecHandCard.length-1].getComponent(cc.Component).showLord(true);            
    }

    if (typeof(noRefresh) != "undefined" && noRefresh) {

    }else {
        this.reset_put_card_pos()
    }
},
    /*
        -- [[ 重置玩家手牌的位置 ]] --
        --  @remark                 扑克上下重叠,重叠部分为半张扑克的高度,扑克左右重叠,重叠部分为半张扑克的宽度
        --  @return {}
    */
    reset_put_card_pos(param) {
        if (this.mVecHandCard.length == 0) {
            return
        }

        var offsetX = 0
        var offsetY = 0
        var noAni = false
        var aligment = false
        if(typeof(param) != "undefined") {
            if(typeof(param.offsetY) != "undefined") {
                offsetY = param.offsetY
            }
            if (typeof(param.offsetX) != "undefined") {
                offsetX = param.offsetX
            }
            if (typeof(param.noAni) != "undefined") {
                noAni = param.noAni
            }
            if (typeof(param.aligment) != "undefined") {
                aligment = param.aligment
            }
        }

        // 1. 获取单张手牌的宽和高
        var nCardWidth = this.mVecHandCard[0].width * this.child_node_scale;
        var nCardHeight = this.mVecHandCard[0].height * this.child_node_scale;

        var nWidth = this.node.width == 0 ? cc.winSize.width : this.node.width

        // 2. 获取手牌摆放的宽度
        var nContentSize = nWidth - this.distance_to_edge * 2 - nCardWidth
        var nFirstCardPosX = 0
        if (this.array_type == 1) {}

        // 2_2_2. 如果需要的显示方式为靠左显示
        else if (this.array_type == 2) {
            nFirstCardPosX = this.distance_to_edge + nCardWidth / 2 - nWidth / 2
        }

        // 2_2_3. 如果需要的显示方式为靠右显示
        else if (this.array_type == 3) {
            nFirstCardPosX = nWidth / 2 - this.distance_to_edge - nCardWidth / 2
        }

        // 2. 计算每张手牌的位置
        var nLines = Math.ceil(this.mVecHandCard.length / this.max_row_count);
        var nTemp = nLines + 1;
        
        let indexOffset = 0

        for (var nIndex = 0; nIndex < this.mVecHandCard.length; nIndex++) {
            // 2_1. 纵坐标
            var nNodeLine = Math.ceil((nIndex + 1) / this.max_row_count);
            var nPosY = (nTemp / 2 - nNodeLine) * (nCardHeight / 2);
            if (aligment == "top") {
                nPosY = (- nNodeLine + 1) * (nCardHeight / 2);
            }
            this.mVecHandCard[nIndex].y = nPosY + offsetY;

            // 2_2. 横坐标
            var nRowIndex = (nIndex + 1) % this.max_row_count == 0 ? this.max_row_count : (nIndex + 1) % this.max_row_count;
            var nCurLineCount = nNodeLine == nLines ? this.mVecHandCard.length - (nLines - 1) * this.max_row_count : this.max_row_count;
            
            var nDistance = nContentSize / (nCurLineCount - 1) > nCardWidth / 2 ? nCardWidth / 2 : nContentSize / (nCurLineCount - 1);

            var nPosX = (nRowIndex - (nCurLineCount + 1) / 2) * nDistance;

            var nCurLineFirstIndex = 1
            var nCurFirstCardPosX = (nCurLineFirstIndex - (nCurLineCount + 1) / 2) * nDistance;

            var nCurLineLastIndex = nCurLineCount
            var nCurLastCardPosX = (nCurLineLastIndex - (nCurLineCount + 1) / 2) * nDistance;
            // 2_2_1. 如果需要的显示方式为居中显示
            if (this.array_type == 1) {
                // var nPosX = (nRowIndex - (nCurLineCount + 1) / 2) * nDistance;
            }

            // 2_2_2. 如果需要的显示方式为靠左显示
            else if (this.array_type == 2) {
                nPosX = nPosX - Math.abs(nCurFirstCardPosX - nFirstCardPosX)
            }

            // 2_2_3. 如果需要的显示方式为靠右显示
            else if (this.array_type == 3) {
                nPosX = nPosX + Math.abs(nFirstCardPosX - nCurLastCardPosX)
            }
            this.mVecHandCard[nIndex].x = nPosX;

            // 2_3. 记录当前节点所在行
            this.mVecHandCard[nIndex].nIndex = nIndex;
            this.mVecHandCard[nIndex].nLine = nNodeLine;
        }

        for (var nIndex = 0; nIndex < nLines; nIndex++) {
            var node_Index = nIndex * this.max_row_count
            this.cardinitYList.push(this.mVecHandCard[node_Index].y);
        }

        if (!noAni) {
            for (var nIndex = 0; nIndex < this.mVecHandCard.length; nIndex++) {
                var node_js = this.mVecHandCard[nIndex].getComponent(cc.Component)
                if(this.card_appear_ani == 1){
                    node_js.play_appear_action(this.card_appear_ani_begin_node.position)
                }
                else if(this.card_appear_ani == 2){
                    node_js.delay_appear(nIndex * 0.1)
                }
            }
        }
    },
    /*
        -- [[ 重置玩家手牌的位置 ]] --
        --  @remark                 扑克上下重叠,重叠部分为半张扑克的高度,扑克左右重叠,重叠部分为半张扑克的宽度
        --  @return {}
    */
    reset_hand_card_pos(param) {
        if (this.mVecHandCard.length == 0) {
            this.clearCards()
            return
        }

        let offsetX = 0
        let offsetY = 0
        let noAni = false
        let aligment = false
        let AniType = 0
        if(typeof(param) != "undefined") {
            if(typeof(param.offsetY) != "undefined") {
                offsetY = param.offsetY
            }
            if (typeof(param.offsetX) != "undefined") {
                offsetX = param.offsetX
            }
            if (typeof(param.noAni) != "undefined") {
                noAni = param.noAni
            }
            if (typeof(param.aligment) != "undefined") {
                aligment = param.aligment
            }
            if (typeof(param.AniType) != "undefined") {
                AniType = param.AniType
            }
        }

        // 1. 获取单张手牌的宽和高
        var nCardWidth = this.mVecHandCard[0].width * this.child_node_scale;
        var nCardHeight = this.mVecHandCard[0].height * this.child_node_scale;

        var nWidth = this.node.width == 0 ? cc.winSize.width : this.node.width

        // 2. 获取手牌摆放的宽度
        var nContentSize = nWidth - this.distance_to_edge * 2 - nCardWidth
        var nFirstCardPosX = 0
        if (this.array_type == 1) {}

        // 2_2_2. 如果需要的显示方式为靠左显示
        else if (this.array_type == 2) {
            nFirstCardPosX = this.distance_to_edge + nCardWidth / 2 - nWidth / 2
        }

        // 2_2_3. 如果需要的显示方式为靠右显示
        else if (this.array_type == 3) {
            nFirstCardPosX = nWidth / 2 - this.distance_to_edge - nCardWidth / 2
        }

        // 2. 计算每张手牌的位置
        var nLines = Math.ceil(this.mVecHandCard.length / this.max_row_count);
        var nTemp = nLines + 1;
        for (var nIndex = 0; nIndex < this.mVecHandCard.length; nIndex++) {
            // 2_1. 纵坐标
            var nNodeLine = Math.ceil((nIndex + 1) / this.max_row_count);
            var nPosY = (nTemp / 2 - nNodeLine) * (nCardHeight / 2);
            if (aligment == "top") {
                nPosY = (- nNodeLine + 1) * (nCardHeight / 2);
            }
            this.mVecHandCard[nIndex].y = nPosY + offsetY;

            // 2_2. 横坐标
            var nRowIndex = (nIndex + 1) % this.max_row_count == 0 ? this.max_row_count : (nIndex + 1) % this.max_row_count;
            var nCurLineCount = nNodeLine == nLines ? this.mVecHandCard.length - (nLines - 1) * this.max_row_count : this.max_row_count;
            var nDistance = nContentSize / (nCurLineCount - 1) > nCardWidth / 2 ? nCardWidth / 2 : nContentSize / (nCurLineCount - 1);

            var nPosX = (nRowIndex - (nCurLineCount + 1) / 2) * nDistance;
            var nCurLineFirstIndex = 1
            var nCurFirstCardPosX = (nCurLineFirstIndex - (nCurLineCount + 1) / 2) * nDistance;

            var nCurLineLastIndex = nCurLineCount
            var nCurLastCardPosX = (nCurLineLastIndex - (nCurLineCount + 1) / 2) * nDistance;
            // 2_2_1. 如果需要的显示方式为居中显示
            if (this.array_type == 1) {
                // var nPosX = (nRowIndex - (nCurLineCount + 1) / 2) * nDistance;
            }

            // 2_2_2. 如果需要的显示方式为靠左显示
            else if (this.array_type == 2) {
                nPosX = nPosX - Math.abs(nCurFirstCardPosX - nFirstCardPosX)
            }

            // 2_2_3. 如果需要的显示方式为靠右显示
            else if (this.array_type == 3) {
                nPosX = nPosX + Math.abs(nFirstCardPosX - nCurLastCardPosX)
            }

            if(AniType == 3) {
                this.mVecHandCard[nIndex].dstX = nPosX;
            }else{
                this.mVecHandCard[nIndex].x = nPosX;
            }

            // 2_3. 记录当前节点所在行
            this.mVecHandCard[nIndex].nIndex = nIndex;
            this.mVecHandCard[nIndex].nLine = nNodeLine;
        }

        for (var nIndex = 0; nIndex < nLines; nIndex++) {
            var node_Index = nIndex * this.max_row_count
            this.cardinitYList.push(this.mVecHandCard[node_Index].y);
        }

        if (!noAni) {
            for (var nIndex = 0; nIndex < this.mVecHandCard.length; nIndex++) {
                var node_js = this.mVecHandCard[nIndex].getComponent(cc.Component)
                if(this.card_appear_ani == 1){
                    node_js.play_appear_action(this.card_appear_ani_begin_node.position)
                }
                else if(this.card_appear_ani == 2){
                    node_js.delay_appear(nIndex * 0.1)
                }
            }
        }else if(AniType == 3) {
            for (var nIndex = 0; nIndex < this.mVecHandCard.length; nIndex++) {
                var node_js = this.mVecHandCard[nIndex].getComponent(cc.Component)
                node_js.move_to_dst_action()
            }
        }
        this.showBombSpine([])
    },


    get_card_node_by_name(szName) {
        for (var nIndex = 0; nIndex < this.mVecHandCard.length; nIndex++) {
            var cardnode = this.mVecHandCard[nIndex];
            if (cardnode.name == szName) {
                return cardnode;
            }
        }
    },

    /*------------------------------------------------------
    -- < 2 > 手牌选择
    ------------------------------------------------------*/
    sort_cards(a, b) {
        let nTempValue_1 = a.getComponent(cc.Component).mNValue * 4 + a.getComponent(cc.Component).mNColor;
        let nTempValue_2 = b.getComponent(cc.Component).mNValue * 4 + b.getComponent(cc.Component).mNColor;
        if (nTempValue_1 < nTempValue_2) {
            return 1;
        } else if (nTempValue_1 == nTempValue_2) {
            return 0;
        } else {
            return -1;
        }
    },

    get_outermost_node(event) {
        var nodeLocation = this.node.convertToNodeSpace(event.getLocation());
        var i = this.mVecHandCard.length;
        while (i--) {
            var node = this.mVecHandCard[i];
            var nEventPosX = nodeLocation.x - this.node.width / 2
            var nEventPosY = nodeLocation.y - this.node.height / 2
            var nBeginX_1 = node.x - node.width / 2
            var nBeginX_2 = node.x + node.width / 2
            var nBeingY_1 = node.y - node.height / 2
            var nBeginY_2 = node.y + node.height / 2

            if (nBeginX_1 <= nEventPosX && nEventPosX <= nBeginX_2 && nBeingY_1 <= nEventPosY && nEventPosY <= nBeginY_2) {
                return node.nIndex;
            }
        }
    },

    get_outermost_node_in_line(event, nLine) {
        var nodeLocation = this.node.convertToNodeSpace(event.getLocation());
        var i = this.mVecHandCard.length;
        while (i--) {
            var node = this.mVecHandCard[i];
            var nNodeLine = node.nLine;
            if (nNodeLine == nLine) {
                var node = this.mVecHandCard[i];
                var nEventPosX = nodeLocation.x - this.node.width / 2
                var nEventPosY = nodeLocation.y - this.node.height / 2
                var nBeginX_1 = node.x - node.width / 2
                var nBeginX_2 = node.x + node.width / 2
                var nBeingY_1 = node.y - node.height / 2
                var nBeginY_2 = node.y + node.height / 2

                if (i == this.mVecHandCard.length - 1) {
                    nBeginX_2 = nEventPosX + 1
                }else if(i == 0) {
                    nBeginX_1 = nEventPosX - 1
                }

                if (nBeginX_1 <= nEventPosX && nEventPosX <= nBeginX_2 && nBeingY_1 <= nEventPosY && nEventPosY <= nBeginY_2) {
                    return node.nIndex;
                }
            }
        }
    },

    addTouchEvent: function() {
        if (!this.add_touch_event) {
            return;
        }
        this.node.on(cc.Node.EventType.TOUCH_START, function(event) {
            //牌
            var card = event.target;
            this.mTouchStartCard = event.target;
            //起始触摸位置（和第一张card一样，相对于poker的位置）
            this.touchStartLocation = this.node.convertToNodeSpace(event.getLocation());

            //暂存第一次触摸到的牌
            var touchedCard = {
                card: card
            };
            this.firstTouchedCard = touchedCard;
            //暂存
            this.pushTouchedCards(touchedCard.card);

        }.bind(this), this);

        //父节点监听touch事件（直接子节点必须注册同样的事件方能触发）
        this.node.on(cc.Node.EventType.TOUCH_MOVE, function(event) {
            //先清除原先触摸到的牌
            this.clearTouchedCards();
            //保存第一张牌
            this.pushTouchedCards(this.firstTouchedCard.card);

            //触摸点转换为card节点坐标
            var nodeLocation = this.node.convertToNodeSpace(event.getLocation());

            // 后续操作只能找与开始点击点同一行的牌
            var nLine = this.mTouchStartCard.nLine
            var cur_node_index = this.get_outermost_node_in_line(event, nLine)
            var nBeginIndex = this.mTouchStartCard.nIndex > cur_node_index ? cur_node_index : this.mTouchStartCard.nIndex;
            var nEndIndex = this.mTouchStartCard.nIndex < cur_node_index ? cur_node_index : this.mTouchStartCard.nIndex;
            for (var i = nBeginIndex; i <= nEndIndex; i++) {
                this.pushTouchedCards(this.mVecHandCard[i]);
            }
        }.bind(this), this);

        //父节点监听touch事件（直接子节点必须注册同样的事件方能触发）
        this.node.on(cc.Node.EventType.TOUCH_END, function(event) {
            this.doSelectCard();
        }.bind(this), this);

        //父节点监听touch事件（直接子节点必须注册同样的事件方能触发）
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, function(event) {
            this.doSelectCard();
        }.bind(this), this);
    },

    /**
     * 暂存触摸到的牌
     */
    pushTouchedCards: function(card) {
        //构造牌对象
        var cardObj = {
            name: card.name,
        };

		//防止重复添加
		// 趣头条Bug：玩家出牌区域不能点击
		// Array.prototype.find方法在ECMAScript 6规范中被加入，可能不存在于某些实现中
		// 2019.03.14
		// var existCard = this.touchedCards.find(function (obj) {
		// 	if (obj.name == card.name) {
		// 		return obj;
		// 	} else {
		// 		return null;
		// 	}
		// });

		let bExist = false
		for (var i = 0; i < this.touchedCards.length; i++) {
			if (this.touchedCards[i].name == card.name) {
				bExist = true	
				break
			}
		}

		if (!bExist) {
			//添加暂存
			this.touchedCards.push(cardObj);

			//包含提示
			this.addCardMask(card);
		}

    },

	/**
	 * 清除原先暂存的触摸到的牌
	 */
	clearTouchedCards: function() {
		for (var i = 0; i < this.touchedCards.length; i++) {
			var card = this.get_card_node_by_name(this.touchedCards[i].name);
			if (card) {
				card.getComponent(cc.Component).set_mask_status(false)
			}
		}
		this.touchedCards = [];
		this.node.stopAllActions()
	},

    /**
     * 选择牌
     */
    doSelectCard: function() {
        var vecTouchedCards = this.smartSelectCards() || this.touchedCards

		//改变牌状态
		for (var i = 0; i < vecTouchedCards.length; i++) {
			var cardObj = vecTouchedCards[i];
			var card = this.get_card_node_by_name(cardObj.name);
			if (card) {
				var isSelected = this.check_is_select(card);
				if (isSelected) { //如果是选中改为不选中
					card.y = card.y - 30;
					card.getComponent(cc.Component).set_selected_status(false);
				} else { //不选中改为选中状态
					card.y = card.y + 30;
					card.getComponent(cc.Component).set_selected_status(true);
				}
			}

		}

        // 记录新用户选牌
        if (vecTouchedCards.length > 0) {
            if (!DataManager.CommonData.newbieChooseCards && DataManager.CommonData["roleCfg"]["roundSum"] == 0) {
                DataManager.CommonData.newbieChooseCards = true
                czcEvent("斗地主", "游戏", "新用户选牌")
            }
        }

        //重置
        this.clearTouchedCards();

        //显示选中的牌
        this.showSelectedCards();
    },

    /**
     * 包含牌遮罩
     */
    addCardMask: function(card) {
        card.getComponent(cc.Component).set_mask_status(true)
    },

    /**
     * 显示选中的牌
     */
    showSelectedCards: function() {
        const info = { value: 0,cards:[] }
        this.selectedCards = [];
        for (var i = 0; i < this.mVecHandCard.length; i++) {
            var card = this.mVecHandCard[i];
            var isSelected = this.check_is_select(card);
            if (isSelected) {
                this.selectedCards.push(card.name);

                if (info.value == -1) {
                } else if (info.value == 0) {
                    info.value = card.getComponent(cc.Component).mNValue
                    info.cards.push(card)
                } else if (info.value == card.getComponent(cc.Component).mNValue) {
                    info.cards.push(card)
                } else {
                    info.value = -1
                    info.cards.length = 0
                }
            }
        }
        this.showBombSpine(info.cards)

        //输出
        cc.log("selected cards is: " + JSON.stringify(this.selectedCards));
    },

    releaseSelectedCards() {        
        for (var nIndex = 0; nIndex < this.mVecHandCard.length; nIndex++) {
            var card = this.mVecHandCard[nIndex]
            if (card) {
                var isSelected = this.check_is_select(card);
                if (isSelected) { //如果是选中改为不选中
                    card.y = card.y - 30;
                    card.getComponent(cc.Component).set_selected_status(false);
                }
            }
        }
        this.showBombSpine([])
    },

	check_is_select_y(nPosY) {
		for (var nIndex = 0; nIndex < this.cardinitYList.length; nIndex++) {
			if (this.cardinitYList[nIndex].toFixed(2) == nPosY.toFixed(2)) {
				return false
			}
		}

        return true
    },

	check_is_select(cardnode) {
		if(!cardnode){
			cc.error('check card node is selected for card node is nil')
			return
		}

		return cardnode.getComponent(cc.Component).is_selected()
	},

	get_select_cards() {
		var list = []
		for (var nIndex = 0; nIndex < this.selectedCards.length; nIndex++) {
			var card = this.get_card_node_by_name(this.selectedCards[nIndex])
			if (card) {
				var strData = {
					mNValue: card.getComponent(cc.Component).mNValue,
					mNColor: card.getComponent(cc.Component).mNColor,
					mNCard_Baovalue: 0
				}
				list.push(strData)
			}
		}
		return list
	},

    /*
        -- [[ 选择目标牌 ]] --
    */
    seleteHandCards(vecCards) {
        var strTempList         = []
        // 1. 遍历选中的牌
        for (var key in vecCards) {
            var selectcard = vecCards[key]

            // 2. 遍历玩家的手牌
            for (var nIndex_1 = 0; nIndex_1 < this.mVecHandCard.length; nIndex_1++) {
                var card_node   = this.mVecHandCard[nIndex_1];
                var nCardValue  = card_node.getComponent(cc.Component).mNValue;
                if(nCardValue == selectcard.mNValue && !strTempList[nIndex_1]){
                    this.selectedCards.push(card_node.name);
                    strTempList[nIndex_1] = true
                    break
                }
            }
        }

        // 3. 遍历玩家手牌
        for (var nIndex_1 = 0; nIndex_1 < this.mVecHandCard.length; nIndex_1++) {
            var card_node   = this.mVecHandCard[nIndex_1];
            var bSelect     = this.check_is_select(card_node)
            
            // 3_1. 如果需要选中该牌且之前没有被选中
            if(strTempList[nIndex_1] && !bSelect){
                card_node.y = card_node.y + 30;
				card_node.getComponent(cc.Component).set_selected_status(true);
            }

            // 3_2. 如果不需要选中该牌但之前却被选中
            if(!strTempList[nIndex_1] && bSelect){
                card_node.y = card_node.y - 30;
				card_node.getComponent(cc.Component).set_selected_status(false);
            }
        }

        // 4. 重置
        this.clearTouchedCards();

        // 5. 显示选中的牌
        this.showSelectedCards();
    },
    
    smartSelectCards() {
        var vecCards = []
        var vecUpNodeCards = []
        var vecDownNodeCards = []
        for (var i = 0; i < this.touchedCards.length; i++) {
            var nodeCard = this.get_card_node_by_name(this.touchedCards[i].name)
            if (nodeCard) {

                vecCards.push({
                    mNValue: nodeCard.getComponent(cc.Component).mNValue,
                    mNColor: -1,
                    mNCard_Baovalue: -1
                })

                if (this.check_is_select(nodeCard)) {
                    vecUpNodeCards.push(nodeCard)
                } else {
                    vecDownNodeCards.push(nodeCard)
                }
            }
        }

        // 如果选中的牌大于未选中 全部未选中
        if (vecUpNodeCards.length > vecDownNodeCards.length) {
            return vecUpNodeCards
        }

        // 如果选中牌已经成型 就不再检测
        if (GameRule.checkCardsType(vecCards)) {
            return vecDownNodeCards
        }

        var vecNodeCards = vecUpNodeCards.concat(vecDownNodeCards)
        vecNodeCards.sort(this.sort_cards)

        var vecChooseNodeCards = []
        vecChooseNodeCards.push(this.smartSelectSeries(vecNodeCards, 1, 5))
        vecChooseNodeCards.push(this.smartSelectSeries(vecNodeCards, 2, 6))
        vecChooseNodeCards.push(this.smartSelectSeries(vecNodeCards, 3, 6))

        var vecChooseNodeCard
        var maxLong = 0
        var findRound = false
        var checkCards = (cards)=>{
            var find1 = false
            var find2 = false
            for (const card of cards) {
                if (card.name == this.touchedCards[0].name) {
                    find1 = true
                }
                if (card.name == this.touchedCards[this.touchedCards.length - 1].name) {
                    find2 = true
                }
            }

            return find1 && find2
        }
        for (var vecSeriesCards of vecChooseNodeCards) {
            if (vecSeriesCards) {
                for (var cards of vecSeriesCards) {
                    var find = checkCards(cards)
                    if (findRound ? (find && cards.length > maxLong) : (find || cards.length > maxLong)) {
                        vecChooseNodeCard = cards
                        maxLong = cards.length
                    }
                    if (!findRound && find) {
                        findRound = true
                    }
                }
            }
        }

        if (vecChooseNodeCard) {
            for (var i = vecChooseNodeCard.length - 1; i >= 0; i--) {
                for (var j = 0; j < vecUpNodeCards.length; j++) {
                    if (vecChooseNodeCard[i] == vecUpNodeCards[j]) {
                        vecChooseNodeCard.splice(i, 1)
                        break
                    }
                }
            }
        }

        return vecChooseNodeCard
    },

    smartSelectSeries(vecNodeCards, same, minLong) {
        if (vecNodeCards.length < minLong) {
            return
        }

        var getValue = function(nodeCards) {
            return nodeCards.getComponent(cc.Component).mNValue
        }

        var checkSame = function(start) {
            if (start + 1 < same) {
                return false
            }

            for (var i = 1; i < same; i++) {
                if (getValue(vecNodeCards[start]) != getValue(vecNodeCards[start - i])) {
                    return false
                }
            }

            return true
        }

        var addCard = function(vecTempNodeCards, start) {
            for (var i = 0; i < same; i++) {
                vecTempNodeCards.push(vecNodeCards[start - i])
            }
        }

        var vecSeriesCards = []
        for (var i = vecNodeCards.length - 1; i >= minLong - 1; i--) {
            if (getValue(vecNodeCards[i]) >= 15) {
                continue
            }

            if (!checkSame(i)) {
                continue
            }

            var vecTempNodeCards = []
            addCard(vecTempNodeCards, i)
            i -= same - 1

            for (var j = i - 1; j >= 0; j--) {
                if (getValue(vecNodeCards[i]) + (vecTempNodeCards.length / same) != getValue(vecNodeCards[j])) {
                    continue
                }

                if (getValue(vecNodeCards[j]) >= 15) {
                    continue
                }

                if (!checkSame(j)) {
                    continue
                }

                addCard(vecTempNodeCards, j)
                j -= same - 1
            }

            if (vecTempNodeCards.length >= minLong) {
                vecSeriesCards.push(vecTempNodeCards)
            }
        }

        return vecSeriesCards
    },

    showBombSpine(cards: cc.Node[]) {
        if (cards.length != 4) {
            if (this.nodeSpineBomb) {
                this.nodeSpineBomb.active = false
            }
            return
        }

        if (!this.nodeSpineBomb) {
            if (!this.spine_bomb_fire) {
                return
            }

            const node = new cc.Node()
            this.node.addChild(node, -1)
            this.nodeSpineBomb = node
            const spine = node.addComponent(sp.Skeleton)
            spine.skeletonData = this.spine_bomb_fire
            spine.setAnimation(0, "animation", true)
        } else {
            this.nodeSpineBomb.active = true
        }

        this.nodeSpineBomb.setPosition(cc.v2((cards[cards.length - 1].x + cards[0].x) / 2, 82))
        this.nodeSpineBomb.scaleX = (cards[cards.length - 1].x - cards[0].x + cards[0].width * cards[0].scaleX) / 413
    }
});