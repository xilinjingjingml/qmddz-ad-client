/*

	继承自 BaseComponent 需满足以下条件
	继承类中不能有 __preload 方法 

*/

import BaseFunc = require("../base/BaseFunc")
import BaseScene from "../base/baseScene/BaseScene";

const {ccclass, property} = cc._decorator;

@ccclass
export default class BaseComponent extends BaseScene {

	@property
	_skipBinding:Boolean = false;

	__preload() {
		if (typeof(this._skipBinding) != "undefined" && this._skipBinding) {

		} else {
			BaseFunc.BindChild(this.node, this)
		}


		if (BaseFunc.IsLongScreen()) {
			this.onFixLongScreen()
		}else if(BaseFunc.IsShortScreen()) {
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
		// cc.warn(this.name + ": rewrite bindButtonHandler if you want bind button")
	}
}
