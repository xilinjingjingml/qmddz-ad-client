
var BaseFunc = {}

/*
	本地时间和服务器时间的差距(秒)
	如无特殊需求 请勿修改
*/
BaseFunc.SERVER_TIME_DIFF = 0

BaseFunc.IsJSON = function(str) {
    if (typeof str == 'string') {
        try {
            var obj=JSON.parse(str);
            if(typeof obj == 'object' && obj ){
                return true;
            }else{
                return false;
            }

        } catch(e) {
            return false;
        }
    }
    return false;
}
var Config = {}
Config.AGENCY_ADDRESS = false
Config.USE_SECURE = true
/*
	data 可不传 为url参数 使用key做替换 参数会自动url编码
	http://abc.com?uid={uid} {uid:123} ---> http://abc.com?uid=123
*/
BaseFunc.HTTPGetRequest = function(url, data, callback, timeout) {
	var xhr = new XMLHttpRequest()
	xhr.onload = function() {
		var res = null
		// if (DataManager.Instance.isTesting)
			console.log(xhr)
		if (xhr.status == 200) {
			// cc.log(xhr.responseText)
			if (BaseFunc.IsJSON(xhr.responseText)) {
				res = JSON.parse(xhr.responseText)
			}else {
				res = xhr.responseText
			}
		}
		if (callback) {
			callback(res)
		}
	}
	xhr.onabort = function() {
		callback(null, 'the request has been aborted')
	}
	xhr.onerror = function(event) {
		callback(null, event)
	}

	if (url.indexOf("?") == -1){
		url = url + "?"
		for (const key in data) {
			url = url + key + "=" + encodeURIComponent(data[key]) + "&"
		}

		url = url.substr(0, url.length - 1)
	}
	else{
		for (var key in (data || {})) {
			url = url.replace('{' + key + '}', encodeURIComponent(data[key]))
		}
	}
	
	cc.log(url)

	url = this.FormatUrl(url)
	if (!CC_WECHATGAME && Config.AGENCY_ADDRESS) {
		url = Config.AGENCY_ADDRESS + encodeURI(url)
	}
	
	if (true) {
		let full_url = url
    	let bFirst = true;
		for(let key in data) {
			if (bFirst) {
				bFirst = false
				full_url += ("?" + key + "=" + data[key])
			}else {
				full_url += ("&" + key + "=" + data[key])	
			}
		}
		// console.log("HTTPGetRequest", full_url)
	}

	// cc.log('HTTPGetRequest', url)

	xhr.open("GET", url, true)
	xhr.timeout = (timeout || 20) * 1000
	xhr.send()
}

/*
	data 可不传 参数会自动url编码
*/
BaseFunc.HTTPPostRequest = function(url, data, callback, timeout) {
	var xhr = new XMLHttpRequest()
	xhr.onload = function() {
		var res = null
		if (xhr.status == 200) {
			if (BaseFunc.IsJSON(xhr.responseText)) {
				res = JSON.parse(xhr.responseText)
			}else {
				res = xhr.responseText
			}
		} else if (xhr.status == 307) {
			if (BaseFunc.IsJSON(xhr.responseText)) {
				res = JSON.parse(xhr.responseText)
			}else {
				res = xhr.responseText
			}
			if (res.Location) {
				this.HTTPPostRequest(res.Location, data, callback, timeout)
				return
			}
		}
		if (callback) {
			callback(res)
		}
	}.bind(this)
	xhr.onabort = function() {
		callback(null, 'the request has been aborted')
	}
	xhr.onerror = function(event) {
		callback(null, event)
	}

	var paramArr = []
	for (var key in (data || {})) {
		paramArr.push(key + '=' + encodeURIComponent(data[key]))
	}

	url = this.FormatUrl(url)
	if (!CC_WECHATGAME && Config.AGENCY_ADDRESS) {
		url = Config.AGENCY_ADDRESS + encodeURI(url)
	}

	if (true) {
		let full_url = url
    	let bFirst = true;
		for(let key in data) {
			if (bFirst) {
				bFirst = false
				full_url += ("?" + key + "=" + data[key])
			}else {
				full_url += ("&" + key + "=" + data[key])	
			}
		}
		// if (DataManager.Instance.isTesting)
			console.log("HTTPPostRequest", full_url)
	}

	// cc.log('HTTPPostRequest', url + '?' + paramArr.join('&'))

	xhr.open("POST", url, true)
	xhr.timeout = (timeout || 20) * 1000
	xhr.send(paramArr.join('&'))
}

/*
	data 可不传 参数会自动url编码
*/
BaseFunc.HTTPPostRequestForm = function(url, data, callback, timeout, type) {
	var xhr = new XMLHttpRequest()
	xhr.onload = function() {
		var res = null
		if (xhr.status == 200) {
			if (BaseFunc.IsJSON(xhr.responseText)) {
				res = JSON.parse(xhr.responseText)
			}else {
				res = xhr.responseText
			}
		} else if (xhr.status == 307) {
			if (BaseFunc.IsJSON(xhr.responseText)) {
				res = JSON.parse(xhr.responseText)
			}else {
				res = xhr.responseText
			}
			if (res.Location) {
				this.HTTPPostRequest(res.Location, data, callback, timeout)
				return
			}
		}
		if (callback) {
			callback(res)
		}
	}.bind(this)
	xhr.onabort = function() {
		callback && callback(null, 'the request has been aborted')
	}
	xhr.onerror = function(event) {
		callback && callback(null, event)
	}

	url = this.FormatUrl(url)
	if (!CC_WECHATGAME && Config.AGENCY_ADDRESS) {
		url = Config.AGENCY_ADDRESS + encodeURI(url)
	}

	xhr.open("POST", url, true)
	if (type == "www"){
		xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		xhr.timeout = (timeout || 20) * 1000
		let full_url = ""
		let bFirst = true
		for(let key in data) {
			if (bFirst) {
				bFirst = false
				full_url += (key + "=" + data[key])
			}else {
				full_url += ("&" + key + "=" + data[key])	
			}
		}
		xhr.send(full_url)
	}
	else {
		xhr.send(data)
	}
}

BaseFunc.FormatUrl = function(url) {
	var ret = /^https?:\/\/(.*)/.exec(url)
	if (ret) {
		url = ret[1]
	}

	return (Config.USE_SECURE ? 'https://' : 'http://') + url
}

/*
	a.b   ---> b
	a.b.c ---> c
	a 	  ---> null
	a.	  ---> null

	获取后缀 转换为小写
*/
BaseFunc.GetExtType = function(url) {
	var ext = /\.[^\.]+$/.exec(url)
	return ext ? ext[0].replace('.', '').toLowerCase() : null
}

/*
	type 不传自动获取地址后缀 未获取到默认使用 png
*/
BaseFunc.ImageRequest = function(url, type, callback) {
	if (callback === undefined && (typeof type === 'function')) {
		callback = type
		type = undefined
	}

	type = type || (this.GetExtType(url) || 'png')

	url = this.FormatUrl(url)
	if (!CC_WECHATGAME && Config.AGENCY_ADDRESS) {
		url = Config.AGENCY_ADDRESS + encodeURI(url)
	}

	cc.loader.load({
		url: url,
		type: type
	}, function(err, texture) {
		if (err) cc.log(err)
		callback(err ? null : texture)
	})
}

/*
	获取资源的编码后的路径
	资源必须位于 resources文件夹下
*/
BaseFunc.GetRawUrl = function(url) {
	if (cc.loader.md5Pipe) {
		return cc.loader.md5Pipe.transformURL(cc.url.raw(url))
	}

	return cc.url.raw(url)
}


/*
    如果有获取到服务器时间 返回相对于服务器的近似时间 否则返回本地时间 (秒)
    isNeedObj 如果为真 返回 Date 对象
    如无特殊需求 所有获取时间的地方调用此处
*/
BaseFunc.accurateTime = function(isNeedObj) {
	if (isNeedObj) {
		return new Date(Date.now() + this.SERVER_TIME_DIFF * 1000)
	}

	return Math.ceil(Date.now() / 1000) + this.SERVER_TIME_DIFF
}

/*
	-- [[ 播放动画 ]] --
	--	@param 	{string} 		szAnimationName 			动画名字
	--	@param 	{int} 			nClipsIndex 				动画中Clips中的动画索引
	-- 	@remark 				遍历resources文件夹获取目标预制,规则待定,Todo(PJ 18.06.06)
	--	@return {}
*/
BaseFunc.PlayAnimation = function(szResPath, nClipsIndex) {
	// 1. 获取文件路径

	// 2. 动态加载资源
	cc.loader.loadRes(szResPath, function(err, prefab) {

		// 2_1. 实例化预制
		var newNode = cc.instantiate(prefab)

		// 2_2. 设置动画播放位置(当前场景正中间)
		let windowSize = cc.winSize
		newNode.setPosition(windowSize.width / 2, windowSize.height / 2)
		cc.director.getScene().addChild(newNode)

		// 2_4. 获取Animation的Clips和播放组件
		var animationComponent = newNode.getComponent(cc.Animation)
		var szClipsName = animationComponent._clips[nClipsIndex]._name

		// 2_4. 播放动画
		var animState = animationComponent.play(szClipsName)
	})
}

/*
	-- [[ 实例化预制 ]] --
*/
BaseFunc.InstantiatePrefab = function(szPath, callback) {
	cc.loader.loadRes(szPath, function(err, prefab) {
		let newNode = cc.instantiate(prefab)
		if (newNode.getComponent("BaseComponent") != null) {
			BaseFunc.BindChild(newNode, newNode.getComponent("BaseComponent"))
		}
		callback(newNode)
	})
}

/*
	弹出框
*/
BaseFunc.ShowPopLayer = function(szPath, param, zorder) {
	let callback = function(node) {
		if (node.getComponent("BaseComponent") != null) {
	    	node.getComponent("BaseComponent").initParam = param.initParam
		}		
		param.owner[param.name] = node.getComponent(cc.Component)
		zorder = zorder?zorder:0
		cc.director.getScene().addChild(node, zorder)
	}

	this.InstantiatePrefab(szPath, callback)
}

/*
	-- [[ 替换纹理 ]] --
*/
BaseFunc.ReplaceSpritePic = function(container, szAddres) {
	if (true) {
		cc.log("not use ReplaceSpritePic, use spriteFrame = DataManager.Instance.getSpriteFrame")
		return
	}
	cc.loader.loadRes(szAddres, cc.SpriteFrame, function(err, spFrame) {
		container.getComponent(cc.Sprite).spriteFrame = spFrame
	})
}

/*
	提示框
*/
BaseFunc.MessageBox = function(initParam) {
	cc.error("MessageBox", initParam)
	SceneManager.AddLayer({
    	owner:this,
		content: 'moduleLobbyRes/prefab/MessageBox',
		name: 'MessageBoxLayer',
		blockTouch: true,
    	zorder:0,
    	clickMaskToClose:true,
		initParam: initParam
	})
}

/*
	添加按钮事件
*/
BaseFunc.AddToggleCheckEvent = function(node, target, component, handler, customEventData) {
	var eventHandler = new cc.Component.EventHandler()
	eventHandler.target = target
	eventHandler.component = component
	eventHandler.handler = handler
	eventHandler.customEventData = customEventData

	var checkEvents = node.getComponent(cc.Toggle).checkEvents
	checkEvents.push(eventHandler)
}

/*
	添加按钮事件
*/
BaseFunc.AddClickEvent = function(node, target, component, handler, customEventData = 0, buttonEffect = 1) {
	buttonEffect = typeof buttonEffect !== 'undefined' ? buttonEffect : 1
	
	var eventHandler = new cc.Component.EventHandler()
	eventHandler.target = target
	eventHandler.component = component
	eventHandler.handler = handler
	eventHandler.customEventData = customEventData

	var clickEvents = node.getComponent(cc.Button).clickEvents
	clickEvents.push(eventHandler)

	if (buttonEffect >= 0) {
		this.SetButtonTransEffect(node.getComponent(cc.Button), buttonEffect)
	}
}

/*
	按钮点击效果
*/
BaseFunc.SetButtonTransEffect = function(_button, effect, num) {
	num = typeof num !== 'undefined' ? num : 0.9

	let buttonEffects = {}
	buttonEffects.NONE = 0
	buttonEffects.COLOR = 1
	buttonEffects.SPRITE = 2
	buttonEffects.SCALE = 3

	if (!(_button instanceof cc.Button)) {
		return
	}

	_button.transition = effect

	switch (effect) {
		case buttonEffects.NONE:

		case buttonEffects.COLOR:
			_button.normalColor = new cc.Color(255, 255, 255)
			_button.pressedColor = new cc.Color(180, 180, 180)
			_button.hoverColor = new cc.Color(255, 255, 255)
			_button.disabledColor = new cc.Color(180, 180, 180)
		case buttonEffects.SPRITE:
			// _button.normalSprite
			// _button.pressedSprite
			// _button.disabledSprite
			// _button.hoverSprite
		case buttonEffects.SCALE:
			_button.zoomScale = num
	}
}

/*
	移除按钮事件
*/
BaseFunc.RemoveAllClickEvent = function(node) {
	var clickEvents = node.getComponent(cc.Button).clickEvents
	clickEvents.splice(0, clickEvents.length)
}

/*
	下载并设置精灵图片
*/
BaseFunc.SetFrameTextureNet = function(sprite, url, callback) {
	if (url == null || url == '') {
		return
	}

	url = this.FormatUrl(url)
	if (!CC_WECHATGAME && Config.AGENCY_ADDRESS) {
		url = Config.AGENCY_ADDRESS + encodeURI(url)
	}

	cc.loader.load({
		url: url,
		type: 'png'
	}, function(err, tex) {
		if (err) {
			cc.log(err)
		} else {
			var spriteFrame = new cc.SpriteFrame(tex, cc.Rect(0, 0, tex.width, tex.height))			
			if (sprite && sprite.isValid) {
				sprite.spriteFrame = spriteFrame
				if (callback) {
					callback(sprite)
				}
			}			
		}
	})
}


BaseFunc.SetFrameTextureFromLocalSpriteAtlas = function(container, atlas, fileName, callback) {
	let frame = atlas.getSpriteFrame(fileName);
	container.getComponent(cc.Sprite).spriteFrame = frame;
	if (callback) {
		callback(sprite)
	}
}
/*
	设置本地精灵图片
*/
BaseFunc.SetFrameTextureFromLocalAtlasTexture = function(container, localUrl, fileName, callback) {
	if (localUrl == null || localUrl == '') {
		return
	}
	cc.loader.loadRes(localUrl, cc.SpriteAtlas, function (err, atlas) {
		if (err) {
			cc.log(err)
		} else {
			let frame = atlas.getSpriteFrame(fileName);
			container.getComponent(cc.Sprite).spriteFrame = frame;
			if (callback) {
				callback(sprite)
			}
		}
	});
}

/*
	设置本地精灵图片
*/
BaseFunc.SetFrameTextureLocal = function(sprite, localUrl, callback) {
	if (localUrl == null || localUrl == '') {
		return
	}

	cc.loader.loadRes(localUrl, cc.SpriteFrame, function(err, spriteFrame) {
		if (err) {
			cc.log(err)
		} else {
			sprite.spriteFrame = spriteFrame
			if (callback) {
				callback(sprite)
			}
		}
	})
}

/*
	自动绑定rootNode子节点到container
	同名的会被覆盖

	rootNode 	遍历的根节点
	container 	绑定容器
	prefix 		绑定前缀 可选 默认为 cc_
*/
BaseFunc.BindChild_notuse = function(rootNode, container, prefix) {
	if (rootNode == null) {
		return
	}

	prefix = prefix || ''

	for (var comkey in rootNode._components) {
		container[prefix + rootNode._components[comkey].name] = rootNode._components[comkey]
	}

	for (var key in rootNode.children) {
		container[prefix + rootNode.children[key].name] = rootNode.children[key]
		this.BindChild(rootNode.children[key], container, prefix)
	}
}

/*
	自动绑定rootNode子节点到container
	同名的会被覆盖

	rootNode 	遍历的根节点
	container 	绑定容器
	prefix 		绑定前缀 可选 默认为 cc_
*/
BaseFunc.BindChild = function(rootNode, container, prefix) {
	if (rootNode == null) {
		return
	}


	prefix = prefix || ''
	for (var comkey in rootNode._components) {
		var regex1 = /(.)+?(?=\<)/g;
		var regex2 = /[^\<\)]+(?=\>)/g;
		var first = regex1.exec(rootNode._components[comkey].name)
		var second = regex2.exec(rootNode._components[comkey].name)
		if (first != null && second != null ) {
			if (typeof(container[prefix + first[0]]) == "undefined") {
				container[prefix + first[0]] = {}
			}
			container[prefix + first[0]]["$" + second[0]] = rootNode._components[comkey]
		}else {
			container[prefix + rootNode._components[comkey].name] = rootNode._components[comkey]
		}
	}

	for (var key in rootNode.children) {
		container[prefix + rootNode.children[key].name] = rootNode.children[key]
		this.BindChild(rootNode.children[key], container, prefix)
	}
}
/*
	-- [[ 绑定所有子节点到目标节点上 ]] --
*/
BaseFunc.bindChildToTarget = function(node, target) {
	for (let child of node.children) {
		if (!target[child.name]) {
			target[child.name] = child
		}
		this.bindChildToTarget(child, target)
	}
}

/*
	格式化时间
	fmt:
		月(m)、日(d)、小时(H)、分(M)、秒(S) 可以用 1-2 个占位符
		年(y)可以用 1-4 个占位符

	time:
		Date   直接使用
		Number !NaN 以此为参数*1000创建Date对象
		不传   使用当前系统时间创建Date对象
		其他一律返回 null

	BaseFunc.TimeFormat('yyyy-mm-dd HH:MM:SS',11865281090)	---> 2345-12-30 23:24:50
	BaseFunc.TimeFormat('yyyy-m-d H:M:S',11865281090)		---> 2345-12-30 23:24:50
	BaseFunc.TimeFormat('yyyy-mm-dd HH:MM:SS',1049494028)	---> 2003-04-05 06:07:08
	BaseFunc.TimeFormat('yyyy-m-d H:M:S',1049494028)		---> 2003-4-5 6:7:8
	BaseFunc.TimeFormat('yyyy-m-d HH:MM:S')					---> 2018-6-13 17:21:6
*/
BaseFunc.TimeFormat = function(fmt, time) {
	var date = null
	if (typeof time === 'number' && !isNaN(time)) {
		date = new Date(time * 1000)
	} else if (typeof time === 'undefined') {
		date = new Date()
	} else if (time instanceof Date) {
		date = time
	}

	if (!date) return null

	var o = {
		'm+': date.getMonth() + 1,
		'd+': date.getDate(),
		'H+': date.getHours(),
		'M+': date.getMinutes(),
		'S+': date.getSeconds()
	}

	if (/(y+)/.test(fmt)) {
		var year = /(y+)/.exec(fmt)[1]
		fmt = fmt.replace(year, (date.getFullYear() + '').substr(4 - year.length))
	}

	for (var k in o) {
		if (new RegExp('(' + k + ')').test(fmt)) {
			var t = new RegExp('(' + k + ')').exec(fmt)[1]
			fmt = fmt.replace(t, (t.length == 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
		}
	}
	return fmt
}

BaseFunc.BlockUI = function(option) {
	SceneManager.AddLayer({
    	owner:this,
		content: 'moduleLobbyRes/prefab/BlockNode',
		name: 'BlockNode',
		blockTouch: true,
    	zorder:0,
    	isDark:false,
    	clickMaskToClose:false,
		initParam: option || {}
	})
}

BaseFunc.UnBlockUI = function() {
	SceneManager.RemoveLayer('BlockNode')
}

// 打印
BaseFunc.Print = function(fmt){
	//  if (typeof(Config.DEBUG_LEVEL) != "undefined" && Config.DEBUG_LEVEL < 1){return}
	cc.log("INFO:\t", (new Date()).toLocaleString(), arguments)
}

// 打印
BaseFunc.Debug = function(fmt){
	if (typeof(Config.DEBUG_LEVEL) != "undefined" && Config.DEBUG_LEVEL < 2){return}
	cc.log("INFO:\t", (new Date()).toLocaleString(), arguments)
}

// 打印堆栈
BaseFunc.Error = function(fmt){
	if (typeof(Config.DEBUG_LEVEL) != "undefined" && Config.DEBUG_LEVEL < 3){return}
	cc.error("ERROR:\t", (new Date()).toLocaleString(), arguments)
	//  console.trace("")
}

// 获取字符串长度
BaseFunc.GetStrLength = function(str) {  
    var cArr = str.match(/[^\x00-\xff]/ig)  
    return str.length + (cArr == null ? 0 : cArr.length)  
}
// 获取字符串宽度
BaseFunc.GetStrWidth = function(str, fontsize) {  
	var l = str.length
	var totalWidth = 0
	var blen = 0
	for(i=0; i<l; i++) {
		if ((str.charCodeAt(i) & 0xff00) != 0) {
			blen ++
		}
		else{
			blen += 0.12
		}
		blen ++
	}

	totalWidth = blen*fontsize/2
	return totalWidth
}

// 随机数 [min, max)
BaseFunc.Random = function(min, max){	
	if (typeof(min) == "undefined") {return 0}
	if (typeof(max) == "undefined") {max = min; min = 0}
	return Math.floor(Math.random()*(max-min)+min)
}


	
/*
// 创建帧动画
param.picTable		配置表
param.frameName 	帧名字
param.repeat 		重复次数

*/

BaseFunc.CreateFrameAnimation = function(param) {
	if (typeof(param.picTable) == "undefined") {
		return null
	}

	let _pic_data = param.picTable[param.frameName]

	if (typeof(_pic_data) == "undefined") {
		return null
	}

	let aNode = this.CreateFrameAnimationNode()	
	// this.BindChild(aNode, aNode)
	// aNode["cc_animation"] = aNode.$animation
	let clip  = this.CreateFrameAnimationClip(param)
	if (!clip) {
		return null 
	}
	aNode.$animation.addClip(clip)

	if (param.repeat == -1) {
    	aNode.$animation.getAnimationState(param.frameName).repeatCount = Infinity;		
	}else if(param.repeat > 0){
    	aNode.$animation.getAnimationState(param.frameName).repeatCount = param.repeat;
	}else{
    	aNode.$animation.getAnimationState(param.frameName).repeatCount = 1;		
	}

	if (param.finishRemove) {  
        let nodeAnimation = aNode.getComponent(cc.Animation)
        nodeAnimation.removeFun = function() {
        	if (typeof(aNode) == "undefined" || !aNode) {
        		return null
        	}
            aNode.runAction(cc.sequence(
                cc.delayTime(0.001),
                cc.fadeOut(0.2),
                cc.callFunc(function(){
                	aNode.removeFromParent()
                	if(param.callBack) {
                		param.callBack()
                	}
                })
            ))
        }        
        nodeAnimation.on('finished', nodeAnimation.removeFun, nodeAnimation);
	}


	return aNode
}

// 创建动画节点
BaseFunc.CreateFrameAnimationNode = function() {

	var aNode = new cc.Node('');

	aNode["$animation"] = aNode.addComponent(cc.Animation)
    aNode["$sprite"] = aNode.addComponent(cc.Sprite); 
    // aNode["$sprite"].spriteFrame = new cc.SpriteFrame(BaseFunc.GetRawUrl("resources/moduleLobby/common/black.png"))


	return aNode;
}

// 创建帧动画的动画
BaseFunc.CreateFrameAnimationClip = function(param) {

	let _pic_data = param.picTable[param.frameName]

	// 加载
	var fake_node = new cc.Node('fake_node');
    let fake_sprite = fake_node.addComponent(cc.Sprite); 
    fake_sprite.spriteFrame = new cc.SpriteFrame(_pic_data)
	cc.director.getScene().addChild(fake_node)
	// 加载 end
	let filename 	= null
	if (!!_pic_data.strFile) {		
		filename 	= this.GetRawUrl(_pic_data.strFile)
	}else if(!!_pic_data.nSpriteFrame) {
		filename 	= _pic_data.nSpriteFrame
	}
	let sRect 		= cc.rect(0,0,0,0)
	let counts 		= _pic_data.nTotal
	let size 		= cc.size(0, 0);
	let offset 		= cc.v2(0, 0);
	let frames 		= [];
	sRect.width 	= _pic_data.width
	sRect.height 	= _pic_data.height

	if (sRect.width == 0 || sRect.height == 0) {
		return null
	}

	for (let i = 0; i < counts; ++i) {
		let thisNum = i

		size.width = Math.floor(sRect.width/_pic_data.nWFrames);
		size.height = Math.floor(sRect.height/_pic_data.nHFrames);
		let width = size.width * (thisNum % _pic_data.nWFrames);
		let height = size.height * Math.floor(thisNum / _pic_data.nWFrames);
		let orgPoint = sRect.origin;
		let rect = cc.rect(orgPoint.x + width, orgPoint.y + height, size.width, size.height);
		// cc.log(orgPoint.x + width, orgPoint.y + height, size.width, size.height)
		if (typeof(filename) == "string") {			
			frames[i] = new cc.SpriteFrame(filename.getTexture(), rect, false, offset, size);  
		}else if(typeof(filename) == "object"){//support spriteFrame
			frames[i] = new cc.SpriteFrame(filename.getTexture(), rect, false, offset, size);  
		}
	}

	let clip = cc.AnimationClip.createWithSpriteFrames(frames, counts);  
	clip.name = param.frameName;  
	// clip.wrapMode = cc.WrapMode.Normal;
	// clip.wrapMode = cc.WrapMode.Loop;
	clip.wrapMode = cc.WrapMode.Default;
	clip.speed = 220/_pic_data.nDuration;
	
	clip.repeatCount = 10;


	/* 添加关键帧事件 */  
	// clip.events.push({  
	//        frame: 1,                   // 准确的时间，以秒为单位。这里表示将在动画播放到 1s 时触发事件  
	//        func: 'frameEvent',         // 回调函数名称  
	//        params: [1, 'hello']        // 回调参数  
	//    });  
 	return clip;  
}

BaseFunc.GetImageContentSize = function(filename) {

	var texture = new cc.SpriteFrame(filename)

	return cc.size(texture.getRect().width, texture.getRect().height)
}

BaseFunc.CleanCopy = function(objectOrArray) {
	if (typeof(objectOrArray) == "undefined" || typeof(objectOrArray) != "object") {
		return []
	}
	if (Array.isArray(objectOrArray)) {
		return objectOrArray.slice(0)
	}else {
		return JSON.parse(JSON.stringify(objectOrArray))
	}
}

/*
是否是1.775比例以上的屏幕
*/
BaseFunc.IsLongScreen = function(filename) {
	let windowSize = cc.winSize
	if (windowSize.width/windowSize.height > 1.875) {
		return true
	}
	return false
}

/*
是否是1.334
*/
BaseFunc.IsShortScreen = function(filename) {
	let windowSize = cc.winSize
	if (windowSize.width/windowSize.height < 1.334) {
		return true
	}
	return false
}

/*
检测平台
*/
BaseFunc.IsWindows = function(filename) {
	if (cc.sys.os == cc.sys.OS_WINDOWS) {
		return true
	}
	return false
}
/*
检测平台
*/
BaseFunc.IsAndroid = function(filename) {
	if (cc.sys.os == cc.sys.OS_ANDROID) {
		return true
	}
	return false
}
/*
检测平台
*/
BaseFunc.IsIos = function(filename) {
	if (cc.sys.os == cc.sys.OS_IOS) {
		return true
	}
	return false
}

BaseFunc.parseQueryString = function(url){
    var obj = {};
    var start = url.indexOf("?")+1;
    var str = url.substr(start);
    var arr = str.split("&");
    for(var i = 0 ;i < arr.length;i++){
          var arr2 = arr[i].split("=");
           obj[arr2[0]] = arr2[1];
    }
	return obj;
}

BaseFunc.encrypt = function(code){
	if (null == code) return
	var c=String.fromCharCode(code.charCodeAt(0)+code.length);  
	for(var i=1;i<code.length;i++){        
		c+=String.fromCharCode(code.charCodeAt(i)+code.charCodeAt(i-1));  
	}     
	return escape(c);
},
//字符串进行解密   
BaseFunc.decrypt = function(code){
	code = unescape(code);        
	var c=String.fromCharCode(code.charCodeAt(0)-code.length);        
	for(var i=1;i<code.length;i++){        
		c+=String.fromCharCode(code.charCodeAt(i)-c.charCodeAt(i-1));        
	}        
	return c;
} 

// BaseFunc.guid64 = function(value) {
// 	value
// }

module.exports = BaseFunc