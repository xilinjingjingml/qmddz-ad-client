var BaseFunc = {}

/*
    获取资源的编码后的路径
    资源必须位于 resources文件夹下
*/
BaseFunc.GetRawUrl = function (url) {
    if (cc.loader.md5Pipe) {
        return cc.loader.md5Pipe.transformURL(cc.url.raw(url))
    }

    return cc.url.raw(url)
}

/*
    添加按钮事件
*/
BaseFunc.AddToggleCheckEvent = function (node, target, component, handler, customEventData) {
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
BaseFunc.AddClickEvent = function (node, target, component, handler, customEventData = 0, buttonEffect = 1) {
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
BaseFunc.SetButtonTransEffect = function (_button, effect, num) {
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
    自动绑定rootNode子节点到container
    同名的会被覆盖

    rootNode 	遍历的根节点
    container 	绑定容器
    prefix 		绑定前缀 可选 默认为 cc_
*/
BaseFunc.BindChild = function (rootNode, container, prefix) {
    if (rootNode == null) {
        return
    }


    prefix = prefix || ''
    for (var comkey in rootNode._components) {
        var regex1 = /(.)+?(?=\<)/g;
        var regex2 = /[^\<\)]+(?=\>)/g;
        var first = regex1.exec(rootNode._components[comkey].name)
        var second = regex2.exec(rootNode._components[comkey].name)
        if (first != null && second != null) {
            if (typeof (container[prefix + first[0]]) == "undefined") {
                container[prefix + first[0]] = {}
            }
            container[prefix + first[0]]["$" + second[0]] = rootNode._components[comkey]
        } else {
            container[prefix + rootNode._components[comkey].name] = rootNode._components[comkey]
        }
    }

    for (var key in rootNode.children) {
        container[prefix + rootNode.children[key].name] = rootNode.children[key]
        this.BindChild(rootNode.children[key], container, prefix)
    }
}

/*
// 创建帧动画
param.picTable		配置表
param.frameName 	帧名字
param.repeat 		重复次数
*/
BaseFunc.CreateFrameAnimation = function (param) {
    if (typeof (param.picTable) == "undefined") {
        return null
    }

    let _pic_data = param.picTable[param.frameName]

    if (typeof (_pic_data) == "undefined") {
        return null
    }

    let aNode = this.CreateFrameAnimationNode()
    // this.BindChild(aNode, aNode)
    // aNode["cc_animation"] = aNode.$animation
    let clip = this.CreateFrameAnimationClip(param)
    if (!clip) {
        return null
    }
    aNode.$animation.addClip(clip)

    if (param.repeat == -1) {
        aNode.$animation.getAnimationState(param.frameName).repeatCount = Infinity;
    } else if (param.repeat > 0) {
        aNode.$animation.getAnimationState(param.frameName).repeatCount = param.repeat;
    } else {
        aNode.$animation.getAnimationState(param.frameName).repeatCount = 1;
    }

    if (param.finishRemove) {
        let nodeAnimation = aNode.getComponent(cc.Animation)
        nodeAnimation.removeFun = function () {
            if (typeof (aNode) == "undefined" || !aNode) {
                return null
            }
            aNode.runAction(cc.sequence(
                cc.delayTime(0.001),
                cc.fadeOut(0.2),
                cc.callFunc(function () {
                    aNode.removeFromParent(true)
                    aNode.destroy()
                    if (param.callBack) {
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
BaseFunc.CreateFrameAnimationNode = function () {

    var aNode = new cc.Node('');

    aNode["$animation"] = aNode.addComponent(cc.Animation)
    aNode["$sprite"] = aNode.addComponent(cc.Sprite);
    // aNode["$sprite"].spriteFrame = new cc.SpriteFrame(BaseFunc.GetRawUrl("resources/moduleLobby/common/black.png"))


    return aNode;
}

// 创建帧动画的动画
BaseFunc.CreateFrameAnimationClip = function (param) {

    let _pic_data = param.picTable[param.frameName]

    // 加载
    var fake_node = new cc.Node('fake_node');
    let fake_sprite = fake_node.addComponent(cc.Sprite);
    fake_sprite.spriteFrame = new cc.SpriteFrame(_pic_data)
    cc.director.getScene().addChild(fake_node)
    // 加载 end
    let filename = null
    if (!!_pic_data.strFile) {
        filename = this.GetRawUrl(_pic_data.strFile)
    } else if (!!_pic_data.nSpriteFrame) {
        filename = _pic_data.nSpriteFrame
    }
    let sRect = cc.rect(0, 0, 0, 0)
    let counts = _pic_data.nTotal
    let size = cc.size(0, 0);
    let offset = cc.v2(0, 0);
    let frames = [];
    sRect.width = _pic_data.width
    sRect.height = _pic_data.height

    if (sRect.width == 0 || sRect.height == 0) {
        return null
    }

    for (let i = 0; i < counts; ++i) {
        let thisNum = i

        size.width = Math.floor(sRect.width / _pic_data.nWFrames);
        size.height = Math.floor(sRect.height / _pic_data.nHFrames);
        let width = size.width * (thisNum % _pic_data.nWFrames);
        let height = size.height * Math.floor(thisNum / _pic_data.nWFrames);
        let orgPoint = sRect.origin;
        let rect = cc.rect(orgPoint.x + width, orgPoint.y + height, size.width, size.height);
        // cc.log(orgPoint.x + width, orgPoint.y + height, size.width, size.height)
        if (typeof (filename) == "string") {
            frames[i] = new cc.SpriteFrame(filename.getTexture(), rect, false, offset, size);
        } else if (typeof (filename) == "object") {//support spriteFrame
            frames[i] = new cc.SpriteFrame(filename.getTexture(), rect, false, offset, size);
        }
    }

    let clip = cc.AnimationClip.createWithSpriteFrames(frames, counts);
    clip.name = param.frameName;
    // clip.wrapMode = cc.WrapMode.Normal;
    // clip.wrapMode = cc.WrapMode.Loop;
    clip.wrapMode = cc.WrapMode.Default;
    clip.speed = 220 / _pic_data.nDuration;

    clip.repeatCount = 10;


    /* 添加关键帧事件 */
    // clip.events.push({  
    //        frame: 1,                   // 准确的时间，以秒为单位。这里表示将在动画播放到 1s 时触发事件  
    //        func: 'frameEvent',         // 回调函数名称  
    //        params: [1, 'hello']        // 回调参数  
    //    });  
    return clip;
}

BaseFunc.CleanCopy = function (objectOrArray) {
    if (typeof (objectOrArray) == "undefined" || typeof (objectOrArray) != "object") {
        return []
    }
    if (Array.isArray(objectOrArray)) {
        return objectOrArray.slice(0)
    } else {
        return JSON.parse(JSON.stringify(objectOrArray))
    }
}

module.exports = BaseFunc