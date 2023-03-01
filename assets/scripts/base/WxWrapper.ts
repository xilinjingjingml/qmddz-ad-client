import BaseFunc = require("./BaseFunc")
import DataManager from "./baseData/DataManager"
import SceneManager from "./baseScene/SceneManager"
import { getPrivateInviteInfo } from "./BaseFuncTs"

declare const wx: any

const mWxValid: boolean = window["wx"] ? true : false

const ValidScene = [3001, 3003]
const AdvertErr = [1000, 1003, 1004, 1005]
const AdvertFreqErr = [2001, 2002, 2003, 2004, 2005]
const AdvertUnitId = {
    Video: "72949da8901b72255dd4202c59aab8ae",
    Banner: "0af15dbcd00b75892db83f5c7bb3a32a",
    Plaque: "c7268e1a623c6251aa20d94d4e734d08"
}

const adapt = { screen: null, design: null, ratio: 1, width: 0, height: 0 }
const common = { userinfo: null, callback: null, flag: null, scene: 0, backad: true, query: null }
const advertVideo = { instance: null, valid: true, callback: null }
const advertBanner = { instance: null, valid: true, visible: false, rect: null }
const advertPlaque = { instance: null, valid: true, visible: false }
const share = { invoked: true, time: 0, callback: null }
let shareConfig: any = [
    {
        title: [
            "这款斗地主疯了！金豆不限，一局就能收1000万金豆！快来玩！",
            "无限金豆，随便玩，这个斗地主游戏真是太有趣了！",
            "不论输赢！来玩斗地主就能领福卡，玩得越多赚得越多！",
            "2020年免费的斗地主游戏来啦，每天登录送金豆！",
            "终于找到一款免费斗地主，不仅不花钱还能领福卡！",
            "有了这款斗地主，老公不出去找牌友通宵了！",
            "同事最近疯狂种草的游戏，一玩就是一天，根本停不下来！",
            "不费流量，不费钱，真正免费的斗地主，无聊的时候来两把！",
            "一份钱不花的斗地主，玩游戏还能赢话费！",
            "玩游戏还能赢话费？这款斗地主太爽了！"
        ],
        image: [
            "https://pictures.hiigame.com/qmddz/share1.jpg",
            "https://pictures.hiigame.com/qmddz/share2.jpg"
        ]
    }
]

namespace WxWrapper {

    export function init() {
        if (mWxValid) {
            checkAppUpdate()
            showShareMenu(false)
            addWxEventListener()

            adapt.screen = cc.view.getFrameSize()
            adapt.design = cc.view.getDesignResolutionSize()
            adapt.ratio = Math.min(adapt.screen.width / adapt.design.width, adapt.screen.height / adapt.design.height)
            adapt.width = window['_fullWinSize'] ? window['_fullWinSize'].width - cc.winSize.width : 0 //cc.winSize.width - cc.winSize.width

            const safeArea = wx.getSystemInfoSync().safeArea
            if (safeArea) {
                adapt.height = adapt.screen.height - safeArea.bottom
            }

            share.invoked = DataManager.load("WX_FLAG_SHARE") || false

            const option = wx.getLaunchOptionsSync()
            common.scene = option.scene
            common.query = option.query
        }
    }

    function errorMsg(tag, res) {
        return tag + ":" + (res ? (res.tips || res.msg) : "unknown")
    }

    export function login(callback, forUpdate?) {
        if (mWxValid) {
            const onGetOpenId = (id, save) => {
                save && DataManager.save("WX_USER_OPENID", id)

                !forUpdate ? loginGame(id, null, callback) : getUserInfo((err, uinfo) => {
                    !err ? loginGame(id, uinfo, callback) : callback(err, null)
                })
            }

            checkSession((valid) => {
                const localid = DataManager.load("WX_USER_OPENID")

                valid && localid ? onGetOpenId(localid, false) : code2Session((err, openid) => {
                    !err ? onGetOpenId(openid, localid != openid) : callback(err, null)
                })
            })
        } else {
            // 仅在非小程序平台使用 此处返回模拟游客登录数据 imei不能为空值
            BaseFunc.HTTPGetRequest(DataManager.getURL("USER_LOGIN"), {
                imei: DataManager.UserData.imei,
                name: "Guest",
                pn: DataManager.Instance.packetName,
                version: DataManager.Instance.version
            }, (res) => {
                callback(null, res)
            })
        }
    }

    function loginGame(openId, uinfo, callback) {
        const bindOpenId = getBindOpenId()
        BaseFunc.HTTPGetRequest(DataManager.getURL("GAME_LOGIN"), {
            appid: DataManager.Instance.wxAPPID,
            pn: DataManager.Instance.packetName,
            channel: uinfo ? 1 : "",
            version: DataManager.Instance.version,
            openId: openId,
            rawData: uinfo ? uinfo.rawData : "",
            signature: uinfo ? uinfo.signature : "",
            bindOpenId: (bindOpenId && bindOpenId != openId) ? bindOpenId : ""
        }, (res) => {
            if (res && res.ret == -101) {
                DataManager.remove("WX_USER_OPENID")
            }
            callback(null, res)
        })
    }

    function code2Session(callback) {
        wx.login({
            success: (res) => {
                BaseFunc.HTTPGetRequest(DataManager.getURL("GET_WX_OPENID"), {
                    appid: DataManager.Instance.wxAPPID,
                    jscode: res.code
                }, (res) => {
                    if (res && res.openid) {
                        callback(null, res.openid)
                        return
                    }
                    callback(errorMsg("GetOpenId", res), null)
                })
            },
            fail: (res) => { callback(res.errMsg, null) }
        })
    }

    function getSetting(callback) {
        wx.getSetting({
            complete: (res) => {
                callback(res.authSetting || {})
            }
        })
    }

    // scope.userInfo 用户信息授权
    export function checkUserScope(scope, callback) {
        if (mWxValid) {
            getSetting((setting) => {
                callback(setting["scope." + scope] == true)
            })
        } else {
            callback(false)
        }
    }

    export function getUserInfo(callback) {
        if (mWxValid) {
            wx.getUserInfo({
                // openIdList: ["selfOpenId"],
                lang: "zh_CN",
                success: (res) => { callback(null, res) },
                fail: (res) => { callback(res.errMsg, null) }
            })
        }
    }

    // wx.createUserInfoButton >= 2.0.1
    export function showUserInfoButton(rect, callback) {
        if (mWxValid && wx.createUserInfoButton) {
            const flag = [rect.x, rect.y, rect.width, rect.height].join('-')
            if (!common.userinfo || common.flag !== flag) {
                common.userinfo && common.userinfo.destroy()

                const area = convertToDeviceSpace(rect)
                const userinfo = wx.createUserInfoButton({
                    type: "text",
                    text: '',
                    style: {
                        left: area.left,
                        top: area.top,
                        width: area.width,
                        height: area.height,
                        backgroundColor: "#00000000"
                    }
                })

                userinfo.onTap((res) => {
                    if (res.rawData && res.signature) {
                        userinfo.hide()
                        common.callback && common.callback()
                        common.callback && (common.callback = null)
                    }
                })

                common.userinfo = userinfo
                common.flag = flag
            }

            common.callback = callback
            common.userinfo.show()
        }
    }

    export function hideUserInfoButton() {
        if (mWxValid) {
            common.userinfo && common.userinfo.hide()
        }
    }

    // wx.getUpdateManager >= 1.9.9
    function checkAppUpdate() {
        if (wx.getUpdateManager) {
            const updateManager = wx.getUpdateManager()
            updateManager.onCheckForUpdate((res) => {
                if (res.hasUpdate) {
                    updateManager.onUpdateReady(() => {
                        wx.showModal({
                            title: "更新提示",
                            content: "新版本已经准备好,是否重启应用?",
                            success: (res) => {
                                if (res.confirm) {
                                    updateManager.applyUpdate()
                                }
                            }
                        })
                    })

                    updateManager.onUpdateFailed(() => {
                        wx.showModal({
                            title: "已经有新版本了",
                            content: "新版本已经上线啦,请您删除当前小程序,重新搜索打开",
                        })
                    })
                }
            })
        }
    }

    export function pay(payInfo, callback) {
        if (mWxValid) {
            const onSessionReady = () => {
                setBackToShowAd(false)
                requestMidasPayment(payInfo, callback)
            }

            checkSession((valid) => {
                valid ? onSessionReady() : code2Session((err, openid) => {
                    openid ? onSessionReady() : callback(false, "账号过期,需要重新登录")
                })
            })
        }
    }

    function requestMidasPayment(payInfo, callback) {
        wx.requestMidasPayment({
            prepayId: payInfo.prepayId,
            starCurrency: payInfo.price * 10,
            setEnv: 0,
            success: function (res) {
                callback(true, "支付成功")
            },
            fail: function (res) {
                if (res.errCode == -2) {
                    callback(false, "支付取消")
                } else {
                    callback(false, "支付失败 code:" + res.errCode)
                }
            }
        })
    }

    function shareMessage(shareData) {
        shareData = shareData || {}

        shareData.query = shareData.query || {}

        if (shareData.withOpenId) {
            shareData.query.openId = DataManager.UserData.openId
        }

        let query = ''
        let prefix = ''
        for (let key in shareData.query) {
            query += prefix + key + '=' + shareData.query[key]
            prefix = '&'
        }
        shareData.query = query

        const config = randomShare()

        return {
            title: shareData.title || config.title,
            imageUrl: shareData.imageUrl || config.image,
            query: shareData.query
        }
    }

    export function shareAppMessage(param) {
        if (mWxValid) {
            let data = shareMessage(param)
            wx.shareAppMessage(data)
            param.callback && (share.callback = param.callback)
            param.callback && (share.time = Date.now())
        } else {
            param.callback && param.callback()
        }
    }

    // wx.setClipboardData >= 1.1.0
    export function setClipboardData(data, callback) {
        if (mWxValid) {
            if (wx.setClipboardData) {
                wx.setClipboardData({
                    data: data,
                    success: (res) => {
                        callback(true)
                    },
                    fail: (res) => {
                        callback(false)
                    }
                })
            } else {
                callback(false)
            }
        }
    }

    // wx.createRewardedVideoAd >= 2.0.4
    function createVideoAdvert(unitid) {
        if (!advertVideo.instance) {
            const advert = wx.createRewardedVideoAd({ adUnitId: unitid })

            advert.onError((res) => {
                console.error("视频广告", res)
                if (AdvertErr.indexOf(res.errCode) !== -1) {
                    advertVideo.valid = false
                }

                advertVideo.callback && advertVideo.callback(2)
                advertVideo.callback && (advertVideo.callback = null)
            })

            advert.onClose((res) => {
                if (advertVideo.callback) {
                    if (!res || res.isEnded) {
                        advertVideo.callback(0)
                    } else {
                        advertVideo.callback(1)
                    }
                    advertVideo.callback = null
                }
            })

            advertVideo.instance = advert
        }

        return advertVideo.instance
    }

    export function showVideoAdvert(callback) {
        if (mWxValid) {
            advertVideo.callback = callback
            const advert = createVideoAdvert(AdvertUnitId.Video)

            wx.showLoading({ title: "加载中", mask: true })

            advert.load()
                .then(() => {
                    advert.show()
                        .then(wx.hideLoading)
                        .catch((res) => {
                            console.error("视频广告显示", res)
                            wx.hideLoading()
                        })
                })
                .catch(wx.hideLoading)
        } else {
            callback(0)
        }
    }

    export function isVideoAdValid() {
        if (mWxValid) {
            return advertVideo.valid
        }
        return true
    }

    // wx.createBannerAd >= 2.0.4
    function createBannerAdvert(unitid) {
        if (!advertBanner.instance) {
            const advert = wx.createBannerAd({
                adUnitId: unitid,
                adIntervals: 30,
                style: {
                    top: 0,
                    left: 0,
                    width: 300
                }
            })

            advert.onError((res) => {
                console.error("Banner广告", res)
                advertBanner.visible = false
                if (AdvertErr.indexOf(res.errCode) !== -1) {
                    advertBanner.valid = false
                }
            })

            advert.onResize((res) => {
                const left = (adapt.screen.width - res.width) / 2
                const top = adapt.screen.height - res.height

                advert.style.left = left
                advert.style.top = top

                const x = left / adapt.ratio - adapt.width / 2
                const y = (adapt.screen.height - top - res.height) / adapt.ratio
                const width = res.width / adapt.ratio
                const height = (res.height + adapt.height) / adapt.ratio

                advertBanner.rect = cc.rect(x, y, width, height)

                SceneManager.Instance.sendMessageToScene({ opcode: "onBannerResize", rect: advertBanner.rect })
            })

            advertBanner.instance = advert
        }

        return advertBanner.instance
    }

    export function showBannerAdvert() {
        if (mWxValid && advertBanner.valid) {
            if (advertBanner.visible) {
                advertBanner.rect && SceneManager.Instance.sendMessageToScene({ opcode: "onBannerResize", rect: advertBanner.rect })
                return
            }

            advertBanner.visible = true
            const advert = createBannerAdvert(AdvertUnitId.Banner)
            advert.show()
                .then(() => {
                    advertBanner.rect && SceneManager.Instance.sendMessageToScene({ opcode: "onBannerResize", rect: advertBanner.rect })
                })
                .catch((res) => {
                    console.error("Banner广告显示", res)
                    advertBanner.visible = false
                })
        }
    }

    export function hideBannerAdvert() {
        if (mWxValid && advertBanner.instance && advertBanner.valid && advertBanner.visible) {
            advertBanner.visible = false
            advertBanner.instance.hide()
        }
    }

    // wx.createInterstitialAd >= 2.6.0
    function createPlaqueAdvert(unitid) {
        if (!advertPlaque.instance) {
            const advert = wx.createInterstitialAd({ adUnitId: unitid })

            advert.onError((res) => {
                console.error("插屏广告", res)
                advertPlaque.visible = false
                if (AdvertFreqErr.indexOf(res.errCode) !== -1 && AdvertErr.indexOf(res.errCode) !== -1) {
                    advertPlaque.valid = false
                }
            })

            advert.onClose(() => {
                advertPlaque.visible = false
            })

            advertPlaque.instance = advert
        }

        return advertPlaque.instance
    }

    function showPlaqueAdvert() {
        if (advertPlaque.valid && !advertPlaque.visible) {

            advertPlaque.visible = true
            const advert = createPlaqueAdvert(AdvertUnitId.Plaque)

            advert.show()
                .catch((res) => {
                    console.error("插屏广告显示", res)
                    advertPlaque.visible = false
                })
        }
    }

    // wx.setEnableDebug >= 1.4.0
    export function setEnableDebug(enable) {
        if (mWxValid) {
            wx.setEnableDebug && wx.setEnableDebug({ enableDebug: enable })
        }
    }

    export function exitMiniProgram() {
        if (mWxValid) {
            wx.exitMiniProgram({
                success: () => {
                    cc.log("wx.exitMiniProgram success")
                },
                fail: () => {
                    cc.log("wx.exitMiniProgram fail")
                }
            })
        }
    }

    // wx.showShareMenu >= 1.1.0
    function showShareMenu(withShareTicket) {
        wx.showShareMenu && wx.showShareMenu({ withShareTicket: withShareTicket || false })

        wx.onShareAppMessage(() => {
            const config = randomShare()
            let query = "openId=" + DataManager.UserData.openId

            return {
                title: config.title,
                imageUrl: config.image,
                query: query
            }
        })
    }

    export function setBackToShowAd(show) {
        common.backad = show
    }

    // wx.onShareMessageToFriend >= 2.9.4
    function addWxEventListener() {
        wx.onShow((res) => {
            common.query = res.query
            common.scene = res.scene

            if (share.callback) {
                let success = true
                if (!share.invoked) {
                    success = false
                    share.invoked = true
                    DataManager.save("WX_FLAG_SHARE", true)
                } else if (Date.now() - share.time < 3000) {
                    success = false
                }

                success ? share.callback() : showModal("分享失败，请换个群试试。")
                share.callback = null
            } else if (res.query && res.query.inviteCode) {
                // if (null == DataManager.CommonData["gameServer"]) {
                // 	getPrivateInviteInfo(res.query.inviteCode)
                // }
            } else if (common.backad && null == DataManager.CommonData["gameServer"] && !DataManager.CommonData.CancelBackAd) {
                showPlaqueAdvert()
            }
            setBackToShowAd(true)
        })

        if (wx.onShareMessageToFriend) {
            wx.onShareMessageToFriend((res) => {
                SceneManager.Instance.sendMessageToScene({ opcode: "onShareToFriend", success: res.success })
            })
        }
    }

    function checkSession(callback) {
        wx.checkSession({
            success: (res) => { callback(true) },
            fail: (res) => { callback(false) }
        })
    }

    function showModal(message) {
        wx.showModal({
            title: "系统提示",
            content: message,
            showCancel: false
        })
    }

    export function captureScreen(param, callback) {
        if (!mWxValid) {
            callback(false)
            return
        }

        param.success = (res) => { callback(true, res.tempFilePath) }
        param.fail = () => { cc.log('screenshot fail'); callback(false) }
        cc.game.canvas.toTempFilePath(param)
    }

    export function checkSceneCode() {
        if (!mWxValid) {
            return true
        }

        return ValidScene.indexOf(common.scene) !== -1
    }

    export function setShareConfig(config) {
        shareConfig = config
    }

    export function randomShare() {
        const config = shareConfig[Math.floor(Math.random() * shareConfig.length)]
        let title = config.title
        let image = config.image

        if (Array.isArray(title)) {
            title = title[Math.floor(Math.random() * title.length)]
        }

        if (Array.isArray(image)) {
            image = image[Math.floor(Math.random() * image.length)]
        }

        return { title: title, image: image }
    }

    export function getNotchHeight() {
        if (cc.view.getFrameSize().equals(cc.size(812, 375))) {
            return 30
        }

        if (!mWxValid) {
            return 0
        }

        const info = wx.getSystemInfoSync()

        if (!info.safeArea || !info.screenWidth) {
            return 0
        }

        return Math.max(info.safeArea.left, info.screenWidth - info.safeArea.right)
    }

    function getBindOpenId() {
        return common.query ? common.query.openId : null
    }

    // wx.getOpenDataContext >= 1.9.92
    export function postMessage(message) {
        if (mWxValid && wx.getOpenDataContext) {
            const context = wx.getOpenDataContext()
            context && context.postMessage(message)
        }
    }

    export function convertToDeviceSpace(rect) {
        if (mWxValid) {
            const width = rect.width * adapt.ratio
            const height = rect.height * adapt.ratio
            const left = (adapt.width / 2 + rect.x) * adapt.ratio
            const top = adapt.screen.height - rect.y * adapt.ratio - height

            return { top: top, left: left, width: width, height: height }
        }
        return rect
    }

    export function initAdvert() {
        if (mWxValid) {
            createVideoAdvert(AdvertUnitId.Video)
            // createBannerAdvert(AdvertUnitId.Banner)
            // createPlaqueAdvert(AdvertUnitId.Plaque)
        }
    }
}

export default WxWrapper