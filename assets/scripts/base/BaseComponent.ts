/*

	继承自 BaseComponent 需满足以下条件
	继承类中不能有 __preload 方法 

*/

import BaseFunc = require("../base/BaseFunc")
import BaseScene from "../base/baseScene/BaseScene";
import { functions } from "./utils/functions";

const { ccclass, property } = cc._decorator;

@ccclass
export default class BaseComponent extends BaseScene {

	private _$: object
	private _skipBinding: boolean = false

	__preload() {
		if (!this._skipBinding) {
			BaseFunc.BindChild(this.node, this)
		}
		this._$ = functions.mark(this.node)

		if (cc.winSize.width / cc.winSize.height > 1.875) {
			this.onFixLongScreen()
		} else if (cc.winSize.width / cc.winSize.height < 1.334) {
			this.onFixShortScreen()
		}

		this.__bindButtonHandler()

		this.__preloadAfter()
	}

	__preloadAfter() {

	}

	onFixLongScreen() {
		cc.log('If you see this, you need to overwrite "onFixLongScreen"!')
	}

	onFixShortScreen() {
		cc.log('If you see this, you need to overwrite "onFixShortScreen"!')
	}

	__bindButtonHandler() {
	}

	/**
	 * 获取子节点或组件
	 */
	$(name: string): cc.Node
	$<T extends cc.Component>(name: string, type: { prototype: T }): T
	$<T extends cc.Component>(name: string, type?: { prototype: T }) {
		const node: cc.Node = this._$[name] || cc.find(name, this.node)
		return node && type ? node.getComponent(type) : node
	}
}
