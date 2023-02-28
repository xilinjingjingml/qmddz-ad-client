
const {ccclass, property} = cc._decorator;

@ccclass
export default class GameRule extends cc.Component {

	@property()
	handCards = [] //玩家手牌

	@property()
	chooseCards = [] //玩家选中的牌

	@property()
	tipCards = [] //提示牌

	@property()
	cardPointCount = [] //牌值的统计

	@property()
	cardInfo1s = [] //牌值的统计
	cardInfo2s = []
	cardInfo3s = []
	cardInfo31s = []
	cardInfo32s = []

	@property()
	chooseCardType = []

	@property()
	typeNum: number = -1

	constructor() {
		super();
		//选中牌的类型
		this.setChooseCardType(0, 0, 0)

		//记录牌型对应的信息
		this.initCardInfos()
	}

	initCardInfos() {
		var CardInfos = function(size) {
			return {
				size: size,
				vecCardInfos: []
			}
		}
		var CardInfo = function(num, long) {
			return {
				num: num,
				long: long
			}
		}

		//顺子
		this.cardInfo1s = CardInfos(1)
		for (var i = 5; i < 13; i++) {
			this.cardInfo1s.vecCardInfos.push(CardInfo(i, i))
		}

		//连对
		this.cardInfo2s = CardInfos(2)
		for (var i = 3; i < 10; i++) {
			var num = 0
			for (var j = 0; j < i; j++) {
				num += Math.pow(10, j) * 2
			}
			this.cardInfo2s.vecCardInfos.push(CardInfo(num, i))
		}
		this.cardInfo2s.vecCardInfos.push(CardInfo(2000000000, 10))

		//三顺
		this.cardInfo3s = CardInfos(3)
		for (var i = 1; i < 7; i++) {
			var num = 0
			for (var j = 0; j < i; j++) {
				num += Math.pow(10, j) * 3
			}
			this.cardInfo3s.vecCardInfos.push(CardInfo(num, i))
		}

		//三带一
		this.cardInfo31s = CardInfos(4)
		for (var i = 1; i < 5; i++) {
			var num = 0
			for (var j = 0; j < 2 * i; j++) {
				num += Math.pow(10, j) * (j >= i ? 3 : 1)
			}
			this.cardInfo31s.vecCardInfos.push(CardInfo(num, i))
		}
		this.cardInfo31s.vecCardInfos.push(CardInfo(531, 5))

		//三带二
		this.cardInfo32s = CardInfos(5)
		for (var i = 1; i < 5; i++) {
			var num = 0
			for (var j = 0; j < 2 * i; j++) {
				num += Math.pow(10, j) * (j >= i ? 3 : 2)
			}
			this.cardInfo32s.vecCardInfos.push(CardInfo(num, i))
		}
	}

	setHandCards(vecCards) {
		this.handCards = vecCards
	}

	// 检测牌的完整性 橙红的话 设置选中牌
	checkCardsIntact(vecCards) {
		var cardCount = 0
		for (var card1 of vecCards) {
			for (var card2 of this.handCards) {
				if (card1.mNValue == card2.mNValue && card1.mNColor == card2.mNColor) {
					cardCount++
				}
			}
		}

		if (cardCount == vecCards.length) {
			return true
		}

		return false
	}

	// 统计牌值
	countCardsPoint(vecCards) {
		for (var i = 0; i < 17; i++) {
			this.cardPointCount[i] = 0
		}

		for (var card of vecCards) {
			this.cardPointCount[card.mNValue] += 1
		}
	}

	// 检测出牌是否成形
	checkCardsType(vecCards, typeNum) {
		this.chooseCards = vecCards
		this.typeNum = typeNum || 0


		this.countCardsPoint(this.chooseCards)

		var cardCount = this.chooseCards.length
		if (cardCount == 0) {
			return false
		} else if (cardCount == 1) {
			// 单张
			if (this.checkCardsTypeNum(this.is1)) {
				return true
			}
		} else if (cardCount == 2) {
			// 火箭
			if (this.checkCardsTypeNum(this.isHuoJian, 2, 2)) {
				return true
			}

			// 对子
			if (this.checkCardsTypeNum(this.is2)) {
				return true
			}
		} else if (cardCount == 3) {
			// 三不带
			if (this.checkCardsTypeNum(this.is3)) {
				return true
			}
		} else if (cardCount == 4) {
			// 硬炸弹
			if (this.checkCardsTypeNum(this.isHardBomb, 4, 2)) {
				return true
			}
		} else if (cardCount == 6) {
			// 四带两单
			if (this.checkCardsTypeNum(this.is411, 411)) {
				return true
			}
		} else if (cardCount == 8) {
			// 四带两对
			if (this.checkCardsTypeNum(this.is422, 422)) {
				return true
			}
		}

		if (cardCount >= 5 && cardCount <= 12) {
			// 顺子
			if (this.checkCardsTypeNumInfo(this.is1s, this.cardInfo1s)) {
				return true
			}
		}
		if (cardCount >= 6 && cardCount % 2 == 0) {
			// 连对
			if (this.checkCardsTypeNumInfo(this.is2s, this.cardInfo2s)) {
				return true
			}
		}

		if (cardCount % 3 == 0) {
			// 连对
			if (this.checkCardsTypeNumInfo(this.is3s, this.cardInfo3s)) {
				return true
			}
		} 
		if (cardCount % 4 == 0) {
			// 三带一
			if (this.checkCardsTypeNumInfo(this.is31s, this.cardInfo31s)) {
				return true
			}
		} 
		if (cardCount % 5 == 0) {
			// 三带二
			if (this.checkCardsTypeNumInfo(this.is32s, this.cardInfo32s)) {
				return true
			}
		}

		return false
	}

	checkCardsTypeNum(func, num, bomb) {
		num = num || this.chooseCards.length
		bomb = bomb || 0

		if (this.typeNum == 0 || this.typeNum == num || bomb > 0) {
			var value = (func.bind(this))()
			if (value) {
				this.setChooseCardType(bomb, num, value)
				return true
			}
		}
	}

	checkCardsTypeNumInfo(func, cardInfos) {
		var cardInfo = this.getCardInfoByNum(cardInfos, this.chooseCards.length)
		if (!cardInfo) {
			return
		}

		return this.checkCardsTypeNum(func, cardInfo.num)
	}

	getCardInfoByNum(cardInfos, num) {
		for (var cardInfo of cardInfos.vecCardInfos) {
			if (cardInfo.long * cardInfos.size == num) {
				return cardInfo
			}
		}
	}

	// 设置选中牌的类型
	setChooseCardType(bomb, num, value) {
		this.chooseCardType = {
			mNTypeBomb: bomb,
			mNTypeNum: num,
			mNTypeValue: value
		}
	}

	is1() {
		var value = this.chooseCards[0].mNValue
		if (value == 16) {
			return value + this.chooseCards[0].mNColor
		}
		return value
	}

	isHuoJian() {
		if (this.cardPointCount[16] == 2) {
			return 16
		}
	}

	is2() {
		return this.isSame(2)
	}

	is3() {
		return this.isSame(3)
	}

	isHardBomb() {
		return this.isSame(4)
	}

	isSame(same) {
		var value = this.chooseCards[0].mNValue
		if (this.cardPointCount[value] == same) {
			return value
		}
	}

	is1s() {
		return this.isSeries(1)
	}

	is2s() {
		return this.isSeries(2)
	}

	is3s() {
		return this.isSeries(3)
	}

	isSeries(same) {
		if (this.cardPointCount[15] > 0 || this.cardPointCount[16] > 0) {
			return
		}

		var long = this.chooseCards.length / same
		for (var i = 15 - long; i >= 3; i--) {
			if (this.checkSeries(i, long, same)) {
				return i
			}
		}
	}

	checkSeries(pos, long, same) {
		if (long <= 0) {
			return true
		}

		if (this.cardPointCount[pos] == same) {
			return this.checkSeries(pos + 1, long - 1, same)
		}
	}

	is411() {
		for (var i = 15; i >= 3; i--) {
			if (this.cardPointCount[i] == 4) {
				return i
			}
		}
	}

	is422() {
		if (this.cardPointCount[16] > 0) {
			return
		}
		for (var i = 15; i >= 3; i--) {
			if (this.cardPointCount[i] == 4) {
				if (this.count2(i) == 2*2) {
					return i
				}
			}
		}
	}

	is31s() {
		var long = this.chooseCards.length / 4
		var maxValue = long > 1 ? 15 - long : 15

		for (var i = maxValue; i >= 3; i--) {
			if (this.checkSeries(i, long, 3)) {
				return i
			}
		}
	}

	is32s() {
		if (this.cardPointCount[16] > 0) {
			return
		}

		var long = this.chooseCards.length / 5
		var maxValue = long > 1 ? 15 - long : 15

		for (var i = maxValue; i >= 3; i--) {
			if (this.checkSeries(i, long, 3)) {
				if (this.count2(i) == 2*long) {
					return i
				}
			}
		}
	}

	count2(value) {
		var num = 0
		for (var i = 15; i >= 3; i--) {
			if (value == i) {
				continue
			}

			if (this.cardPointCount[i] > 0 && this.cardPointCount[i] % 2 == 0) {
				num += this.cardPointCount[i]
			}
		}

		return num
	}

	// 比较大小
	compareCardsType(cardType) {
		// 不出
		if (this.chooseCardType.mNTypeNum == 0) {
			return true
		}

		// 自己出牌
		if (cardType.mNTypeNum == 0) {
			return true
		}

		// 自己火箭
		if (this.chooseCardType.mNTypeBomb == 2 && this.chooseCardType.mNTypeValue == 16) {
			return true
		}

		// 别人火箭
		if (cardType.mNTypeBomb == 2 && cardType.mNTypeValue == 16) {
			return false
		}

		if (this.chooseCardType.mNTypeBomb > cardType.mNTypeBomb) {
			// 自己炸弹
			return true
		} else if (this.chooseCardType.mNTypeBomb < cardType.mNTypeBomb) {
			// 别人炸弹
			return false
		} else if (this.chooseCardType.mNTypeNum == cardType.mNTypeNum) {
			// 铜牌性比较大小
			return this.chooseCardType.mNTypeValue > cardType.mNTypeValue
		}

		return false
	}

	// 提示 自主出牌
	tipsAuto() {
		this.tipCards = []

		this.countCardsPoint(this.handCards)

		var value = this.handCards[0].mNValue
		if (this.cardPointCount[value] == this.handCards.length) {
			this.addTipsGroup(this.handCards.length, value)
		}

		//从单张牌开始提示
		for (var i = 1; i <= 4; i++) {
			for (var j = 0; j <= 16; j++) {
				if (this.cardPointCount[j] == i && (j != 16 || i == 1)) {
					this.addTipsGroup(i, j)
				}
			}
		}

		//2个王
		if (this.cardPointCount[16] == 2) {
			this.addTipsGroup(2, 16)
		}

	}

	// 提示出牌
	tips(cardType) {
		this.tipCards = []

		this.countCardsPoint(this.handCards)

		if (cardType.mNTypeBomb == 0) {
			var typeNum = cardType.mNTypeNum
			if (typeNum == 1) {
				if (this.handCards.length >= 1) {
					this.tipsSearch1(cardType)
				}
			} else if (typeNum == 2) {
				if (this.handCards.length >= 2) {
					this.tipsSearch2(cardType)
				}
			} else if (typeNum == 3) {
				if (this.handCards.length >= 3) {
					this.tipsSearch3(cardType)
				}
			} else if (typeNum == 411) {
				if (this.handCards.length >= 6) {
					this.tipsSearch411(cardType)
				}
			} else if (typeNum == 422) {
				if (this.handCards.length >= 8) {
					this.tipsSearch422(cardType)
				}
			} else if (this.tipsSearchCardInfo(this.cardInfo1s, this.tipsSearch1s, typeNum, cardType)) {

			} else if (this.tipsSearchCardInfo(this.cardInfo2s, this.tipsSearch2s, typeNum, cardType)) {

			} else if (this.tipsSearchCardInfo(this.cardInfo3s, this.tipsSearch3s, typeNum, cardType)) {

			} else if (this.tipsSearchCardInfo(this.cardInfo31s, this.tipsSearch31s, typeNum, cardType)) {

			} else if (this.tipsSearchCardInfo(this.cardInfo32s, this.tipsSearch32s, typeNum, cardType)) {

			}
		}

		this.tipsSearchBomb(cardType)
	}

	addTipsGroup(num, value) {
		var vecCards = []
		this.addTipsCards(vecCards, num, value)
		this.tipCards.push(vecCards)
	}

	addTipsCards(vecCard, num, value) {
		for (var i = 0; i < num; i++) {
			vecCard.push({
				mNValue: value,
				mNColor: -1,
				mNCard_Baovalue: -1
			})
		}
	}

	tipsSearch1(cardType) {
		if (cardType.mNTypeValue == 16) {
			if (this.cardPointCount[16] == 1) {
				for (var i = 0; i < this.handCards.length; i++) {
					if (this.handCards[i].mNValue == 16) {
						if (this.handCards[i].mNColor == 1) {
							this.addTipsGroup(1, 16)
						}
						return
					}
				}
			}

			return
		}

		this.tipsSearchSame(cardType, 1)
	}

	tipsSearch2(cardType) {
		this.tipsSearchSame(cardType, 2)
	}

	tipsSearch3(cardType) {
		this.tipsSearchSame(cardType, 3)
	}

	tipsSearchSame(cardType, same) {
		var tempTipsCards = []

		var maxValue = (same == 1) ? 17 : 16
		for (var i = cardType.mNTypeValue + 1; i < maxValue; i++) {
			if (this.cardPointCount[i] == same) {
				this.addTipsGroup(same, i)
			} else if (this.cardPointCount[i] > same && this.cardPointCount[i] < 4) {
				var vecCards = []
				this.addTipsCards(vecCards, same, i)
				tempTipsCards.push(vecCards)
			}
		}

		this.tipCards = this.tipCards.concat(tempTipsCards)
	}

	tipsSearch411(cardType) {
		for (var i = cardType.mNTypeValue + 1; i < 16; i++) {
			if (this.cardPointCount[i] < 4) {
				continue
			}

			var vecCards = []
			this.addTipsCards(vecCards, 4, i)

			//找单张
			var count = 2
			for (var j = 3; j < 17; j++) {
				if (i == j) {
					continue
				}

				if (this.cardPointCount[j] > 0) {
					var num = Math.min(this.cardPointCount[j], count)
					this.addTipsCards(vecCards, num, j)
					count -= num
				}

				if (count <= 0) {
					this.tipCards.push(vecCards)
					break
				}
			}
		}
	}

	tipsSearch422(cardType) {
		for (var i = cardType.mNTypeValue + 1; i < 16; i++) {
			if (this.cardPointCount[i] < 4) {
				continue
			}

			var vecCards = []
			this.addTipsCards(vecCards, 4, i)

			//找对子
			var count = 2
			for (var j = 3; j < 16; j++) {
				if (i == j) {
					continue
				}

				if (this.cardPointCount[j] >= 2) {
					var num = Math.min(Math.floor(this.cardPointCount[j] / 2), count)
					this.addTipsCards(vecCards, num * 2, j)
					count -= num
				}

				if (count <= 0) {
					this.tipCards.push(vecCards)
					break
				}
			}
		}
	}

	tipsSearchCardInfo(cardInfos, func, typeNum, cardType) {
		var cardInfo = this.getCardInfoByTypeNum(cardInfos, typeNum)
		if (cardInfo) {
			if (this.handCards.length >= cardInfo.long * cardInfos.size) {
				(func.bind(this))(cardType, cardInfo.long)
			}
			return true
		}

		return false
	}

	getCardInfoByTypeNum(cardInfos, typeNum) {
		for (var cardInfo of cardInfos.vecCardInfos) {
			if (cardInfo.num == typeNum) {
				return cardInfo
			}
		}
	}

	tipsSearch1s(cardType, long) {
		this.tipsSearchSeries(cardType, 1, long)
	}

	tipsSearch2s(cardType, long) {
		this.tipsSearchSeries(cardType, 2, long)
	}

	tipsSearch3s(cardType, long) {
		this.tipsSearchSeries(cardType, 3, long)
	}

	tipsSearchSeries(cardType, same, long) {
		for (var i = cardType.mNTypeValue + 1; i < 16 - long; i++) {
			var bFind = true
			for (var j = 0; j < long; j++) {
				if (this.cardPointCount[i + j] < same) {
					bFind = false
					break
				}
			}

			if (bFind) {
				var vecCards = []
				for (var j = 0; j < long; j++) {
					this.addTipsCards(vecCards, same, i + j)
				}
				this.tipCards.push(vecCards)
			}
		}
	}

	tipsSearch31s(cardType, long) {
		let max = long == 1 ? 16 : 16 - long
		for (let i = cardType.mNTypeValue + 1; i < max; i++) {
			
			let notFound = false
			for(let inner_i = 0; inner_i < long; ++inner_i) {
				if (this.cardPointCount[i+inner_i] < 3) {
					notFound = true
					break;
				}
			}
			if(notFound) {
				continue
			}

			var vecCards = []
			for(let inner_i = 0; inner_i < long; ++inner_i) {
				this.addTipsCards(vecCards, 3, i+inner_i)
			}

			//找单张
			var count = long
			var bFound = false
			for (var j = 3; j < 17; j++) {
				if (i == j) {
					continue
				}

				if (this.cardPointCount[j] == 1) {
					var num = Math.min(this.cardPointCount[j], count)
					this.addTipsCards(vecCards, num, j)
					count -= num
				}

				if (count <= 0) {
					this.tipCards.push(vecCards)
					bFound = true
					break
				}
			}
			if(bFound) {
				continue
			}
			for (var j = 3; j < 17; j++) {
				if (i == j) {
					continue
				}

				if (this.cardPointCount[j] > 1) {
					var num = Math.min(this.cardPointCount[j], count)
					this.addTipsCards(vecCards, num, j)
					count -= num
				}

				if (count <= 0) {
					this.tipCards.push(vecCards)
					break
				}
			}
		}
	}

	tipsSearch32s(cardType, long) {
		let max = long == 1 ? 16 : 16 - long
		for (let i = cardType.mNTypeValue + 1; i < max; i++) {
			
			let notFound = false
			for(let inner_i = 0; inner_i < long; ++inner_i) {
				if (this.cardPointCount[i+inner_i] < 3) {
					notFound = true
					break;
				}
			}
			if(notFound) {
				continue
			}

			var vecCards = []
			
			for(let inner_i = 0; inner_i < long; ++inner_i) {
				this.addTipsCards(vecCards, 3, i+inner_i)
			}

			//找对子
			var count = long
			var bFound = false
			for (var j = 3; j < 16; j++) {
				if (i == j) {
					continue
				}

				if (this.cardPointCount[j] == 2) {
					var num = Math.min(Math.floor(this.cardPointCount[j] / 2), count)
					this.addTipsCards(vecCards, num * 2, j)
					count -= num
				}

				if (count <= 0) {
					this.tipCards.push(vecCards)
					bFound = true
					break
				}
			}
			if(bFound) {
				continue
			}
			for (var j = 3; j < 16; j++) {
				if (i == j) {
					continue
				}

				if (this.cardPointCount[j] > 2) {
					var num = Math.min(Math.floor(this.cardPointCount[j] / 2), count)
					this.addTipsCards(vecCards, num * 2, j)
					count -= num
				}

				if (count <= 0) {
					this.tipCards.push(vecCards)
					break
				}
			}
		}
	}

	tipsSearchBomb(cardType) {
		//硬炸弹
		var value = (cardType.mNTypeBomb == 0) ? 3 : cardType.mNTypeValue + 1
		for (var i = value; i < 16; i++) {
			if (this.cardPointCount[i] == 4) {
				this.addTipsGroup(4, i)
			}
		}

		//火箭
		if (this.cardPointCount[16] == 2) {
			this.addTipsGroup(2, 16)
		}
	}

	//检测顺子
	checkShunZi(typeNum) {
		var cardInfo = this.getCardInfoByTypeNum(this.cardInfo1s, typeNum)
		if (cardInfo) {
			return true
		}
		return false
	}

	//检测顺子
	checkLianDui(typeNum) {
		var cardInfo = this.getCardInfoByTypeNum(this.cardInfo2s, typeNum)
		if (cardInfo) {
			return true
		}
		return false
	}

	//检测飞机
	checkFeiJi(typeNum) {
		var cardInfo
		cardInfo = this.getCardInfoByTypeNum(this.cardInfo3s, typeNum)
		if (cardInfo && cardInfo.long > 1) {
			return true
		}

		cardInfo = this.getCardInfoByTypeNum(this.cardInfo31s, typeNum)
		if (cardInfo && cardInfo.long > 1) {
			return true
		}

		cardInfo = this.getCardInfoByTypeNum(this.cardInfo32s, typeNum)
		if (cardInfo && cardInfo.long > 1) {
			return true
		}
		return false
	}

	//检测三带
	checkSanDai(typeNum) {
		var cardInfo
		cardInfo = this.getCardInfoByTypeNum(this.cardInfo3s, typeNum)
		if (cardInfo && cardInfo.long == 1) {
			return true
		}

		cardInfo = this.getCardInfoByTypeNum(this.cardInfo31s, typeNum)
		if (cardInfo && cardInfo.long == 1) {
			return true
		}

		cardInfo = this.getCardInfoByTypeNum(this.cardInfo32s, typeNum)
		if (cardInfo && cardInfo.long == 1) {
			return true
		}
		return false
	}
}