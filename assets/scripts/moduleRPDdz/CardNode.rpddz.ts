import BaseComponent from "../base/BaseComponent";
import DataManager from "../base/baseData/DataManager";
import GameLogic from "./GameLogic.rpddz";

const card_type_res_big = [
	"heitao",
	"hongtao",
	"meihua",
	"fangkuai",
]

const card_type_res_small = [
	"puke_heitao1",
	"puke_hongtao1",
	"puke_meihua1",
	"puke_fangkuai1",
]

const value_to_frame = {
	14: 1,
	15: 2,
}

const { ccclass, property } = cc._decorator;

@ccclass
export default class CardNode extends BaseComponent {
	@property()
	cardType: number = 1

	@property(cc.SpriteAtlas)
	pukeatlas: cc.SpriteAtlas = null

	mNValue: number = 0
	mNColor: number = 0
	private m_bSelected: boolean = false

	onLoad() {
		this.node.on(cc.Node.EventType.TOUCH_START, function () { }, this.node)
		this.node.on(cc.Node.EventType.TOUCH_MOVE, function () { }, this.node)
		this.node.on(cc.Node.EventType.TOUCH_END, function () { }, this.node)
		this.node.on(cc.Node.EventType.TOUCH_CANCEL, function () { }, this.node)
	}

	set_value(nValue: number, nColor: number) {
		this.mNValue = nValue
		this.mNColor = nColor

		if (typeof nValue != "number" || nValue < 3 || nValue > 16 ||
			typeof nColor != "number" || nColor < 0 || nColor > 3) {
			this.showPaiBei()
			cc.error('CardNode.set_value', nValue, nColor)
			return
		}

		this.removePaiBei()
		if (nValue == 16) {
			this.node.getChildByName("node_simple").active = false
			const node = this.node.getChildByName("node_joker")
			node.active = true

			node.getChildByName("spr_card_value").getComponent(cc.Sprite).spriteFrame = DataManager.Instance.getSpriteFrame("PuKe_rpddz_1", "jokerword" + (nColor == 1 ? "red" : "black"))

			this.node.getChildByName("spr_type_big").active = true
			this.node.getChildByName("spr_type_big").getComponent(cc.Sprite).spriteFrame = DataManager.Instance.getSpriteFrame("PuKe_rpddz_1", "puke_" + (nColor == 1 ? "dawang" : "xiaowang"))
		} else {
			nValue = value_to_frame[nValue] || nValue

			this.node.getChildByName("node_joker").active = false
			const node = this.node.getChildByName("node_simple")
			node.active = true

			node.getChildByName("spr_card_value").getComponent(cc.Sprite).spriteFrame = DataManager.Instance.getSpriteFrame("PuKe_rpddz_1", nValue + (nColor % 2 == 1 ? "red" : "black"))

			node.getChildByName("spr_type_small").getComponent(cc.Sprite).spriteFrame = DataManager.Instance.getSpriteFrame("PuKe_rpddz_1", card_type_res_small[nColor])

			if (this.cardType == 2) {
				this.node.getChildByName("spr_type_big").active = false
			} else {
				this.node.getChildByName("spr_type_big").getComponent(cc.Sprite).spriteFrame = DataManager.Instance.getSpriteFrame("PuKe_rpddz_1", "puke_" + card_type_res_big[nColor])
			}
		}
	}

	showPaiBei() {
		this.node.getChildByName("back").active = true
	}

	removePaiBei() {
		this.node.getChildByName("back").active = false
	}

	set_mask_status(active: boolean) {
		this.node.getChildByName("mask").active = active
	}

	showLord(active) {
		this.node.getChildByName("spt_lord_note").active = active
	}

	showMingpai(active) {
		this.node.getChildByName("icon_show").active = active
	}

	is_selected() {
		return this.m_bSelected
	}

	set_selected_status(bStatus) {
		this.m_bSelected = bStatus
	}

	move_to_dst_action() {
		this.node.active = true
		if (this.node['dstX'] == this.node.x) {
			return
		}
		this.node.stopAllActions()
		this.node.runAction(cc.moveTo(0.2, this.node['dstX'], this.node.y))
	}

	play_appear_action(startpos: cc.Vec2) {
		this.node.active = true
		const endpos = this.node.position
		this.node.position = startpos
		this.node.stopAllActions()
		this.node.runAction(cc.moveTo(0.2, endpos).easing(cc.easeSineOut()))
	}

	delay_appear(t: number) {
		if (t < 0) {
			return
		}
		if (GameLogic.Instance().isBuxipaiMode()) {
			let i = t * 10
			t = 0.5 * Math.floor(i / 6) + (i % 6) * 0.03
		}
		const tempPosx = this.node.x
		this.node.x -= 50
		this.node.opacity = 0
		this.node.runAction(cc.sequence([
			cc.delayTime(t + 0.3),
			cc.spawn([
				cc.moveTo(0.3, cc.v2(tempPosx, this.node.y)).easing(cc.easeSineOut()),
				cc.delayTime(0.1)
			]),
			cc.callFunc(() => {
				this.node.opacity = 255
			}),
		]))

	}
}