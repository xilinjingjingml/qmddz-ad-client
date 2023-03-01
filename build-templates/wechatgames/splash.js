var ui = { label: null, progress: null }
var loadlist = { scene: null, prefabs: [] }
var titles = [
    "正在打扫房间",
    "正在收拾牌桌",
    "正在准备就坐",
    "游戏马上开始",
]

function addSprite(node, src, callback) {
    var sprite = node.addComponent(cc.Sprite)

    var texture = new cc.Texture2D()
    var image = wx.createImage()
    image.onload = function () {
        texture.initWithElement(image)
        callback && callback(sprite)
    }
    image.src = src

    var spriteFrame = new cc.SpriteFrame()
    spriteFrame.setTexture(texture)

    sprite.spriteFrame = spriteFrame

    return sprite
}

function configComponent(component, config) {
    for (var key in config) {
        component[key] = config[key]
    }
    return component
}

function showSplashScene(onlaunch) {
    var scene = new cc.Scene()

    var canvasNode = new cc.Node()
    canvasNode.parent = scene
    canvasNode.addComponent(cc.Canvas)

    var bg = new cc.Node()
    bg.parent = canvasNode
    addSprite(bg, "static/background.jpg", function () {
        bg.scale = Math.max(cc.winSize.width / bg.width, cc.winSize.height / bg.height)
    })

    var logo = new cc.Node()
    logo.parent = canvasNode
    addSprite(logo, "static/logo.png", function () {
        configComponent(logo.addComponent(cc.Widget), {
            top: 14.5,
            isAlignTop: true,
            left: 39,
            isAlignLeft: true
        })
    })

    var black = new cc.Node()
    black.parent = canvasNode
    addSprite(black, "static/black.png", function () {
        configComponent(black.addComponent(cc.Widget), {
            bottom: 0,
            isAlignBottom: true,
            left: 0,
            isAlignLeft: true,
            right: 0,
            isAlignRight: true
        })
    })

    var text = new cc.Node()
    text.parent = canvasNode
    var label = text.addComponent(cc.Label)
    label.fontSize = 26
    label.lineHeight = 26
    label.string = "正在整理房间"
    configComponent(text.addComponent(cc.Widget), {
        bottom: 75,
        isAlignBottom: true
    })

    var progressbg = new cc.Node()
    progressbg.parent = canvasNode
    addSprite(progressbg, "static/progressbg.png", function () {
        configComponent(progressbg.addComponent(cc.Widget), {
            bottom: 45,
            isAlignBottom: true
        })
    })

    var progressbar = new cc.Node()
    progressbar.parent = canvasNode
    var progress = addSprite(progressbar, "static/progressbar.png", function () {
        progress.type = cc.Sprite.Type.FILLED
        progress.sizeMode = cc.Sprite.SizeMode.CUSTOM
        progress.fillType = cc.Sprite.FillType.HORIZONTAL
        progress.fillStart = 0
        progress.fillRange = 0

        configComponent(progressbar.addComponent(cc.Widget), {
            bottom: 45,
            isAlignBottom: true
        })
    })

    var copyright = new cc.Node()
    copyright.parent = canvasNode
    addSprite(copyright, "static/copyright.png", function () {
        configComponent(copyright.addComponent(cc.Widget), {
            bottom: 5,
            isAlignBottom: true,
        })
    })

    ui.label = label
    ui.progress = progress

    cc.director.runSceneImmediate(scene, null, onlaunch)
}

function showMessage(content, callback) {
    wx.showModal({
        title: "提示",
        content: content,
        showCancel: false,
        confirmText: "重试",
        success: function (res) {
            callback()
        },
        fail: function (res) {
            callback()
        }
    })
}

function setStatus(percent) {
    ui.progress.fillRange = percent
    ui.label.string = titles[0] + " " + Math.floor(percent * 100) + "%"
}

function loadScene() {
    cc.director.preloadScene(loadlist.scene, function (completedCount, totalCount, item) {
        setStatus(completedCount / totalCount)
    }, function (error) {
        if (!error) {
            titles.shift()
            loadPrefabs()
        } else {
            wx.igsEvent.report("预加载资源失败 " + loadlist.scene)
            showMessage("加载失败了，请稍后重试", loadScene)
        }
    })
}

function loadPrefabs() {
    if (loadlist.prefabs.length <= 0) {
        onloaded()
        return
    }

    cc.loader.loadRes(loadlist.prefabs[0], function (completedCount, totalCount, item) {
        setStatus(completedCount / totalCount)
    }, function (error) {
        if (!error) {
            loadlist.prefabs.shift()
            titles.shift()
            loadPrefabs()
        } else {
            wx.igsEvent.report("预加载资源失败 " + loadlist.prefabs[0])
            showMessage("加载失败了，请稍后重试", loadPrefabs)
        }
    })
}

function init(settings, onfinished) {
    loadlist.scene = settings.launchScene
    loadlist.prefabs.push("moduleLobby/prefab/LobbyScene")

    var flag = localStorage.getItem("PLAY_GAME_FLAG")
    if (!flag) {
        loadlist.prefabs.push("moduleLobby/prefab/Preload")
        loadlist.prefabs.push("moduleRPDdzRes/prefab/GameScene")
    }

    onloaded = function () {
        onfinished()
        !flag && localStorage.setItem("PLAY_GAME_FLAG", "1")
        loadlist = null
        ui = null
    }

    showSplashScene(loadScene)
}

module.exports = {
    init
}