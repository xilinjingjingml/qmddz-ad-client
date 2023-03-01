const canvas = wx.getSharedCanvas()
const ctx = canvas.getContext("2d")

let isRunning = false
let frameRate = 60
let frameTime = 1000 / frameRate
let lastTick = 0
let isViewDirty = true

let lastOpenid = null
let friends = {}
const imageCaches = {}
let nodes = []
let clickAccept = false
let clickNode = null

let deviceSpace = { top: 0, left: 0, width: 0, height: 0 }

const share = { title: "", imageUrl: "" }

const assets = {
    board: "subdomain/res/board.png",
    button: "subdomain/res/button.png"
}

wx.onMessage((message) => {
    if (message.event == "mainLoop") {
        isRunning = message.value
        isViewDirty = message.value
        isRunning ? addClickListener() : removeClickListener()
    } else if (message.event == "frameRate") {
        if (frameRate !== message.value) {
            frameRate = message.value
            frameTime = 1000 / message.value
        }
    } else if (message.event == "deviceSpace") {
        deviceSpace = message.value
    } else if (message.event == "shareData") {
        share.title = message.value.title || ""
        share.imageUrl = message.value.image || ""
    } else if (message.event == "shareSuccess") {
        if (lastOpenid && (lastOpenid in friends)) {
            friends[lastOpenid] = null
            delete friends[lastOpenid]
            initNodesData()
        }
    } else if (message.event == "changeList") {
        initData()
    }
})

function initData() {
    if (wx.getPotentialFriendList) {
        friends = {}
        const onsuccess = (res) => {
            for (const info of res.list || []) {
                !friends[info.openid] && (friends[info.openid] = info)
            }
            initNodesData()
        }

        const onfail = (res) => { console.error(res) }

        wx.getPotentialFriendList({
            success: onsuccess,
            fail: onfail
        })
        wx.getPotentialFriendList({
            success: onsuccess,
            fail: onfail
        })
    }
}

function initNodesData() {
    nodes = []
    let count = 0
    for (const openid in friends) {
        const x = (count & 1) === 0 ? 0 : 530
        const y = Math.floor(count / 2) * 115
        let nickname = friends[openid].nickname
        if (nickname.length > 7) {
            nickname = nickname.substring(0, 7) + "..."
        }
        const node = { x: x, y: y, nickname: nickname, avatar: friends[openid].avatarUrl, openid: openid, clicked: false }
        node.clickArea = { x: x + 330, y: y + 18, width: 180, height: 81 }
        nodes.push(node)
        count++
    }
    isViewDirty = true
}

function shareMessageToFriend(openid) {
    if (wx.shareMessageToFriend) {
        wx.shareMessageToFriend({
            openId: openid,
            title: share.title,
            imageUrl: share.imageUrl,
            fail: (res) => { console.error(res) }
        })
    }
}

function loadImage(src) {
    if (imageCaches[src]) {
        return
    }

    const image = wx.createImage()
    imageCaches[src] = { image: image, loaded: false }
    image.onload = () => {
        imageCaches[src].loaded = true
        isViewDirty = true
    }
    image.onerror = (error) => { console.error(error) }
    image.src = src
}

function drawImage(src, dx, dy, dWidth, dHeight) {
    if (imageCaches[src]) {
        if (imageCaches[src].loaded) {
            if (dWidth !== undefined && dHeight !== undefined) {
                ctx.drawImage(imageCaches[src].image, dx, dy, dWidth, dHeight)
            } else {
                ctx.drawImage(imageCaches[src].image, dx, dy)
            }
        }
    } else {
        loadImage(src)
    }
}

function drawText(text, x, y, fillStyle, font) {
    ctx.fillStyle = fillStyle
    ctx.font = font
    ctx.textAlign = "left"
    ctx.baseLine = "alphabetic"
    ctx.fillText(text, x, y)
}

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    for (const node of nodes) {
        drawUserItem(node)
    }

    isViewDirty = false
}

function drawUserItem(node) {
    ctx.save()
    ctx.translate(node.x, node.y)

    drawImage(assets.board, 0, 0)
    if (node.clicked) {
        drawImage(assets.button, 339, 22, 162, 73)
    } else {
        drawImage(assets.button, 330, 18)
    }
    drawImage(node.avatar, 20, 18, 80, 80)
    drawText(node.nickname, 120, 60, "#8e7c62", "22px Arial")

    ctx.restore()
}

function step(timestamp) {
    const delta = timestamp - lastTick
    lastTick = timestamp
    if (isRunning && delta >= frameTime && isViewDirty) {
        update()
    }

    requestAnimationFrame(step)
}

function isPointInArea(x, y, area) {
    return x > area.x && y > area.y && x < area.x + area.width && y < area.y + area.height
}

function checkNodeClick(x, y) {
    for (const node of nodes) {
        if (isPointInArea(x, y, node.clickArea)) {
            return node
        }
    }

    return null
}

function setClickNodeStatus(status) {
    if (clickNode) {
        const old = clickNode.clicked
        clickNode.clicked = status
        if (old != status) {
            isViewDirty = true
        }
    }
}

function onClickNode(node) {
    lastOpenid = node.openid
    shareMessageToFriend(node.openid)
}

function onClickEvent(ename, x, y) {
    const canvasWidth = canvas.width
    const canvasHeight = canvas.height
    const sx = canvasWidth / deviceSpace.width
    const sy = canvasHeight / deviceSpace.height

    x = (x - deviceSpace.left) * sx
    y = (y - deviceSpace.top) * sy

    if (ename === "onTouchStart") {
        if (isPointInArea(x, y, { x: 0, y: 0, width: canvasWidth, height: canvasHeight })) {
            const node = checkNodeClick(x, y)
            if (node) {
                clickNode = node
                setClickNodeStatus(true)
                return true
            }
        }
        return false
    } else if (ename === "onTouchMove") {
        setClickNodeStatus(clickNode && isPointInArea(x, y, clickNode.clickArea))
    } else if (ename === "onTouchEnd") {
        if (clickNode && isPointInArea(x, y, clickNode.clickArea)) {
            onClickNode(clickNode)
        }
        resetClickData()
    } else if (ename === "onTouchCancel") {
        resetClickData()
    }

    return false
}

function resetClickData() {
    setClickNodeStatus(false)
    clickAccept = false
    clickNode = null
}

function addClickListener() {
    wx.onTouchStart((res) => { clickAccept = onClickEvent("onTouchStart", res.changedTouches[0].clientX, res.changedTouches[0].clientY) })
    wx.onTouchMove((res) => { clickAccept && onClickEvent("onTouchMove", res.changedTouches[0].clientX, res.changedTouches[0].clientY) })
    wx.onTouchEnd((res) => { clickAccept && onClickEvent("onTouchEnd", res.changedTouches[0].clientX, res.changedTouches[0].clientY) })
    wx.onTouchCancel((res) => { clickAccept && onClickEvent("onTouchCancel", res.changedTouches[0].clientX, res.changedTouches[0].clientY) })
}

function removeClickListener() {
    resetClickData()
    wx.offTouchStart()
    wx.offTouchMove()
    wx.offTouchEnd()
    wx.offTouchCancel()
}

function main() {
    initData()
    for (const k in assets) {
        loadImage(assets[k])
    }
    requestAnimationFrame(step)
}

main()