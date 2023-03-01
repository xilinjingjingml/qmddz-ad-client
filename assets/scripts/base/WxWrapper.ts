import DataManager from "./baseData/DataManager"
import SceneManager from "./baseScene/SceneManager"
import { isFreeAdvert, accurateTime, iMessageBox, showFriendPayPop, loadOrderStatus } from "./BaseFuncTs"
import { http } from "./utils/http"

declare const wx: any

const mWxValid: boolean = window["wx"] ? true : false

const ValidScene = [1001, 1089]
const AdvertErr = [1000, 1003, 1004, 1005, 1008]
const AdvertFreqErr = [2001, 2002, 2003, 2004, 2005]
const AdvertUnitId = {
    Video: "adunit-a67d5d25a6c18c0d",
    Banner: "adunit-b84c33b773e7591d",
    Interstitial: "adunit-49d48fc8c6056c04",
    Grid: "adunit-b016cf057deb6a4c",
}

const adapt = { screen: null, design: null, ratio: 1, width: 0, height: 0 }
const common = { userinfo: null, callback: null, flag: null, scene: 0, backad: true, query: null, appQueryChecked: false, SDKVersion: null }
const advertVideo = {}
const advertBanner = {}
const preloadAdvertVideo = {}//已经预加载过的广告，不需要加载
const advertCustom = {}
const advertInterstitial = { instance: null, valid: true, visible: false }
const advertGrid = { instance: null, valid: true, rect: null }
const share = { invoked: true, time: 0, skipCheck: false, callback: null }
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
/**
 * api最小支持基本库版本
 * 1.用户主要的动作，弹提示更新微信，用方法本身是否存在，从而调用方法
 * 2.被动的动作(原生模板广告)，不进行显示和api应用 ，用户被动接受的东西（类似弹出广告）用版本比较判断
 * 
*/
const WxAPIVersion = {
    createUserInfoButton : "2.0.1",
    getUpdateManager : "1.9.9",
    setClipboardData : "1.1.0",
    createRewardedVideoAd : "2.0.4",
    createBannerAd : "2.0.4",
    createInterstitialAd : "2.6.0",
    createGridAd : "2.9.2",
    createCustomAd : "2.11.1",
    setEnableDebug : "1.4.0",
    showShareMenu : "1.1.0",
    onShareMessageToFriend : "2.9.4",
    getOpenDataContext : "1.9.92",
    requestSubscribeMessage : "2.4.4",
}

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

            // share.invoked = DataManager.load("WX_FLAG_SHARE") || false

            const option = wx.getLaunchOptionsSync()
            common.scene = option.scene
            common.query = option.query

            common.SDKVersion = wx.getSystemInfoSync().SDKVersion

            
            console.log("jin---WxWrapper init:", DataManager.load(DataManager.UserData.guid + "payInfo"))
            if(DataManager.load(DataManager.UserData.guid + "payInfo") != null && DataManager.load(DataManager.UserData.guid + "payInfo") != ''){
                setTimeout(()=>{
                    orderToServer()
                    console.log("jin---在游戏中，订单触发二次请求")
                },1*1000);
            }
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
            http.open(DataManager.getURL("USER_LOGIN"), {
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
        http.open(DataManager.getURL("GAME_LOGIN"), {
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
                http.open(DataManager.getURL("GET_WX_OPENID"), {
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

            code2Session((err, openid) => {
                openid ? onSessionReady() : callback(false, err)
            })

            // checkSession((valid) => {
            //     valid ? onSessionReady() : code2Session((err, openid) => {
            //         openid ? onSessionReady() : callback(false, "账号过期,需要重新登录")
            //     })
            // })
        }
    }

    function requestMidasPayment(payInfo, callback) {
        console.log("jin---requestMidasPayment payInfo:", payInfo);
        
        (DataManager.load(DataManager.UserData.guid + "payInfo") == null || DataManager.load(DataManager.UserData.guid + "payInfo") == '') && DataManager.save(DataManager.UserData.guid + "payInfo", payInfo.order) 
        console.log("jin---requestMidasPayment payInfo11:", DataManager.load(DataManager.UserData.guid + "payInfo"))
        wx.requestMidasPayment({
            mode: "game",
            env: 0, // 0正式 1沙箱
            offerId: DataManager.Instance.wxMIDASID,
            currencyType: "CNY",
            platform: "android",
            buyQuantity: payInfo.price,
            zoneId: "2", // 后台必须配置
            success: () => {
                console.log("jin---requestMidasPayment success")
                wx.showLoading({ title: "订单处理中", mask: true })
                // orderToServer(payInfo, callback)
                const info_product = {
                    appid: DataManager.Instance.wxAPPID,
                    offer_id: DataManager.Instance.wxMIDASID,
                    pid: DataManager.UserData.guid,
                    ticket: DataManager.UserData.ticket,
                    openid: DataManager.UserData.openId,
                    order: payInfo.order,
                    pf: "android",
                    envFlag: "office" // office正式 sandBox沙箱
                }
                http.open(DataManager.getURL("WX_PAY_SURE_URL"), info_product, (res) => {
                    wx.hideLoading()
                    console.log("jin---res.ret: ", res.ret)
                    if (res && res.ret == 0) {
                        callback(true, "支付成功")
                    } else {
                        //TODO 1.在游戏中  2.不在游戏中   不管1还是2都提前存好订单号，成功就干掉，没成功在前面两种情况中，重新请求，并执行后面操作
                        callback(false, "道具发放失败，请联系客服！")
                    }
                })
            },
            fail: (res) => {
                console.log("jin---errMsg: ", res )
                if (res.errCode == 1) {
                    callback(false, "支付取消")
                } else {
                    callback(false, "支付失败 code:" + res.errCode)
                }
            }
        })
    }

    function orderToServer(payInfo = null, callback = null){
        console.log("jin---orderToServer")
        let orders = null
        if(payInfo){
            orders = payInfo.order
        } else {
            orders = DataManager.load(DataManager.UserData.guid + "payInfo")
        }
        
        const info_product = {
            appid: DataManager.Instance.wxAPPID,
            offer_id: DataManager.Instance.wxMIDASID,
            pid: DataManager.UserData.guid,
            ticket: DataManager.UserData.ticket,
            openid: DataManager.UserData.openId,
            order: orders,
            pf: "android",
            envFlag: "office" // office正式 sandBox沙箱
        }
        
        
        http.open(DataManager.getURL("WX_PAY_SURE_URL"), info_product, (res) => {
            console.log("jin---WX_PAY_SURE_URL")
            wx.hideLoading()
            console.log("jin---res.ret: ", res.ret)
            if (res && res.ret == 0) {
                DataManager.save(DataManager.UserData.guid + "payInfo", '')
                if(payInfo)
                    callback(true, "支付成功")
                // else
                //     showModal("已支付成功,玩家刷新游戏后,奖励即刻生效")
            } else {
                //TODO 1.在游戏中  2.不在游戏中   不管1还是2都提前存好订单号，成功就干掉，没成功在前面两种情况中，重新请求，并执行后面操作
                
                if(payInfo)
                    callback(false, "道具发放失败，请联系客服！")
                else
                    showModal("道具发放失败，请联系客服")
            }
        })

    }

    function makeShareParam(shareData) {
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
            wx.shareAppMessage(makeShareParam(param))
            if (param.callback) {
                share.skipCheck = param.skipCheck
                share.callback = param.callback
                share.time = Date.now()
            }
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
        if (!advertVideo[unitid]) {
            const advert = { instance: null, valid: true, callback: null }
            const instance = wx.createRewardedVideoAd({ adUnitId: unitid, multiton: true })

            instance.onError((res) => {
                console.error("视频广告" + unitid, res)
                if (AdvertErr.indexOf(res.errCode) !== -1) {
                    advert.valid = false
                }

                if (advert.callback) {
                    advert.callback(2)
                    advert.callback = null
                }
            })

            instance.onClose((res) => {
                if (advert.callback) {
                    if (!res || res.isEnded) {
                        advert.callback(0)
                    } else {
                        advert.callback(1)
                    }
                    advert.callback = null
                }
            })

            advert.instance = instance
            advertVideo[unitid] = advert
        }

        return advertVideo[unitid]
    }

    export function showVideoAdvert(unitid ,callback) {
        if (mWxValid) {
            const advert = createVideoAdvert(unitid || AdvertUnitId.Video)

            if (!advert.valid) {
                callback(2)
                return
            }

            advert.callback = callback

            // wx.showLoading({ title: "加载中", mask: true })

            //原逻辑：加载---播放
            // advert.instance.load()
            //     .then(() => {
            //         advert.instance.show()
            //             .then(wx.hideLoading)
            //             .catch((res) => {
            //                 console.error("视频广告显示", res)
            //                 wx.hideLoading()
            //             })
            //     })
            //     .catch(wx.hideLoading)

            //播放(1)失败--加载---播放 (2)成功
            advert.instance.show()
            .then(()=>{
                console.log("jin---已经播放成功")//,unitid || AdvertUnitId.Video, unitid, AdvertUnitId.Video
                // wx.hideLoading()
            })
            .catch(err =>{
                // console.log("jin---需要加载才能播放",unitid || AdvertUnitId.Video, unitid, AdvertUnitId.Video)
                wx.showLoading({ title: "加载中", mask: true })
                advert.instance.load()
                .then(() => {
                    advert.instance.show()
                        .then(wx.hideLoading)
                        .catch((res) => {
                            console.error("视频广告显示", res)
                            wx.hideLoading()
                        })
                })
                .catch(wx.hideLoading)
            })
        } else {
            callback(0)
        }
    }

    //预加载
    export function preloadVideoAdvert(unitid ,callback) {
        // console.log("广告预加载成功", unitid || AdvertUnitId.Video )
        if (mWxValid && !preloadAdvertVideo[unitid]) {
                    
            const advert = createVideoAdvert(unitid || AdvertUnitId.Video)
            advert.callback = callback
            advert.instance.load()
                .then(() => {
                    console.log("广告预加载成功", unitid || AdvertUnitId.Video)
                })
                .catch(wx.hideLoading)

            preloadAdvertVideo[unitid] = advert
            callback && callback()
        }
    }

    // wx.createBannerAd >= 2.0.4
    function createBannerAdvert(unitid) {
        // console.log("jin---advertBanner: ",advertBanner)
        if (!advertBanner[unitid]) {
            const advert = { instance: null, valid: true, rect: null, ref: 0 }
            const instance = wx.createBannerAd({
                adUnitId: unitid,
                adIntervals: 30,
                style: {
                    top: 0,
                    left: 0,
                    width: 300
                }
            })

            instance.onError((res) => {
                console.error("Banner广告" + unitid, res)
                if (AdvertErr.indexOf(res.errCode) !== -1) {
                    instance.valid = false
                }
            })

            instance.onResize((res) => {
                const left = (adapt.screen.width - res.width) / 2
                const top = adapt.screen.height - res.height

                instance.style.left = left
                instance.style.top = top

                const x = left / adapt.ratio - adapt.width / 2
                const y = (adapt.screen.height - top - res.height) / adapt.ratio
                const width = res.width / adapt.ratio
                const height = (res.height + adapt.height) / adapt.ratio

                advert.rect = cc.rect(x, y, width, height)

                cc.log("createBannerAdvert.onResize", unitid, new Date().getTime())
                SceneManager.Instance.sendMessageToScene({ opcode: "onBannerResize", rect: advert.rect })
            })

            advert.instance = instance
            advertBanner[unitid] = advert
        }

        return advertBanner[unitid]
    }

    export function showBannerAdvert(unitid, callback?: Function) {
        if (mWxValid) {
            const advert = createBannerAdvert(unitid || AdvertUnitId.Banner)

            if (!advert.valid) {
                return
            }

            if (advert.rect) {
                cc.log("showBannerAdvert.onBannerResize", unitid, new Date().getTime())
                SceneManager.Instance.sendMessageToScene({ opcode: "onBannerResize", rect: advert.rect })
            }

            advert.ref++
            cc.log("showBannerAdvert", unitid, new Date().getTime())
            advert.instance.show()
                .then(() => {
                    callback && callback()
                })
                .catch((res) => {
                    console.error("Banner广告显示", unitid, res)
                })
        }
    }

    export function hideBannerAdvert(unitid, hideAll?) {
        //TODO 1.
        if (mWxValid) {
            if (hideAll) {
                console.log("jin---消除banner广告0")
                for (const id in advertBanner) {
                    advertBanner[id].ref = 0
                    advertBanner[id].instance.hide()
                }
            } else {
                const advert1 = createBannerAdvert(unitid || AdvertUnitId.Banner)
                console.log("jin---消除banner广告: ", unitid, advertBanner[unitid], advertBanner)
                
                if(advert1){
                    console.log("jin---消除banner广告1")
                    advert1.ref--
                    if (advert1.ref <= 0) {
                        advert1.ref = 0
                        advert1.instance.hide()
                    }
                }

                // if(advert1 && advert1.ref > 0){
                //     console.log("jin---消除banner广告1")
                //     advert1.ref--
                //     if (advert1.ref <= 0) {
                //         advert1.ref = 0
                //         advert1.instance.hide()
                //     }
                // }else{
                //     //延时销毁
                //     setTimeout(()=>{
                //         console.log("jin---消除banner广告3")
                //         if(advert1 && advert1.ref >= 0){
                //             advert1.ref--
                //             if (advert1.ref <= 0) {
                //                 advert1.ref = 0
                //                 advert1.instance.hide()
                //             }
                //         }
                //     },5*1000);
                // }
            }
        }
    }

    // wx.createInterstitialAd >= 2.6.0
    function createInterstitialAdvert(unitid) {
        if (wx.createInterstitialAd && !advertInterstitial.instance) {
            const advert = wx.createInterstitialAd({ adUnitId: unitid })

            advert.onError((res) => {
                console.error("插屏广告", res)
                advertInterstitial.visible = false
                if (AdvertFreqErr.indexOf(res.errCode) !== -1 && AdvertErr.indexOf(res.errCode) !== -1) {
                    advertInterstitial.valid = false
                }
            })

            advert.onClose(() => {
                advertInterstitial.visible = false
            })

            advertInterstitial.instance = advert
        }

        return advertInterstitial.instance
    }

    export function showInterstitialAdvert() {
        if (mWxValid && wx.createInterstitialAd && advertInterstitial.valid && !advertInterstitial.visible && !isFreeAdvert()) {

            advertInterstitial.visible = true
            const advert = createInterstitialAdvert(AdvertUnitId.Interstitial)//)DataManager.Instance.onlineParam.adInterstitialConfig.unitids[-1].tv
            
            advert.show()
                .catch((res) => {
                    console.error("插屏广告显示", res)
                    advertInterstitial.visible = false
                })
        }
    }

    // wx.createGridAd >= 2.9.2
    function createGridAdvert(unitid) {
        if (!advertGrid.instance) {
            const advert = wx.createGridAd({
                adUnitId: unitid,
                adIntervals: 30,
                adTheme: "white",
                gridCount: 5,
                style: {
                    top: 0,
                    left: 0,
                    width: 300
                }
            })

            advert.onError((res) => {
                console.error("格子广告", res)
                if (AdvertErr.indexOf(res.errCode) !== -1) {
                    advertGrid.valid = false
                }
            })

            advert.onLoad(() => 
                console.log('原生模板广告加载成功'))
            advert.onResize((res) => {
                const left = (adapt.screen.width - res.width) / 2
                const top = adapt.screen.height - res.height

                advert.style.left = left
                advert.style.top = top

                const x = left / adapt.ratio - adapt.width / 2
                const y = (adapt.screen.height - top - res.height) / adapt.ratio
                const width = res.width / adapt.ratio
                const height = (res.height + adapt.height) / adapt.ratio

                advertGrid.rect = cc.rect(x, y, width, height)

                SceneManager.Instance.sendMessageToScene({ opcode: "onGridResize", rect: advertGrid.rect })
            })

            advertGrid.instance = advert
        }

        return advertGrid.instance
    }

    export function showGridAdvert() {
        if (mWxValid && wx.createGridAd && advertGrid.valid) {
            if (advertGrid.rect) {
                SceneManager.Instance.sendMessageToScene({ opcode: "onGridResize", rect: advertGrid.rect })
            }

            const advert = createGridAdvert(AdvertUnitId.Grid)
            advert.show()
                .catch((res) => {
                    console.error("格子广告显示", res)
                })
        }
    }

    export function hideGridAdvert() {
        if (mWxValid && advertGrid.instance) {
            advertGrid.instance.hide()
        }
    }

    export function isStartGridAdvert(){
        if(!mWxValid){
            return
        }
        if(compareVersion(common.SDKVersion, WxAPIVersion.createGridAd) >= 0){
            return true
        }else{
            return false
        }
    }


    /**
     * TODO 原生模板广告 customAd
     * 包括：1.全屏模板 2.卡片模板 3.横幅模板 4.格子模板
     * 
     */

    //TODO 初始化
    export function initCustomAd(unitid) {
        if (mWxValid) {
            createCustomAdvert(unitid)
        }
    }

    //创建  wx.createCustomAd >= 2.11.1
    export function createCustomAdvert(unitid){
        if(wx.createCustomAd && !advertCustom[unitid]){
            const advert = { instance: null, valid: true, destroyed: false}
        
            //修正位置
            var tempLeft = 35
            var tempTop = 150+30
            const left = tempLeft/568 * adapt.screen.width
            const top = tempTop/320 * adapt.screen.height
            // console.log("jin---进来啦",adapt.screen,left,top, unitid)

            //create
            const instance = wx.createCustomAd({
                adUnitId: unitid,
                style: {
                left: left,
                top: top,
                width: 100, // 用于设置组件宽度(放大缩小倍数)，只有部分模板才支持，如矩阵格子模板
                fixed: true // fixed 只适用于小程序环境
                }
            })

            //错误判断
            instance.onError((res) => {
                console.error("Custom广告" + unitid, res)
                
                if (AdvertErr.indexOf(res.errCode) !== -1) {
                    instance.valid = false

                }
            })

            instance.onLoad(() => console.log('customAd load success'))
            // console.log("jin---instance: ", instance)
            //数据填充
            advert.instance = instance
            advertCustom[unitid] = advert
        }
        return advertCustom[unitid]
    }

    //显示
    export function showCustomAdvert(unitid){
        if(mWxValid){
           var advert = createCustomAdvert(unitid)
        //    console.log("jin---ad valid:", advert.valid)
            if(!advert.valid){
                return
            }
           advert.instance.onClose(()=>{
                // console.log("jin---ad destroyed:", unitid, advertCustom)
                advert.destroyed = true
                delete advertCustom[unitid]
            })
            if(advert.destroyed){
                return 
            }

            if(advert.instance.isShow()){
                return
            }
            // cc.log("showBannerAdvert", unitid, new Date().getTime())

            advert.instance.show()
                .then(()=>{console.log('jin---play ad success')})
                .catch((res) => {
                    if(res.errMsy &&  res.errMsy.indexOf("the advertisement has shown") == -1 ){
                        return
                    }
                    console.error("原生模板广告显示", res)
                    advert.instance.show()
                    .then(()=>{console.log('jin---play ad success 2')})
                })
        }
    }
    
    //是否显示
    export function customAdvertIsShow(unitid){
        if(mWxValid){
            if(advertCustom[unitid]){
                return advertCustom[unitid].instance.isShow()
            }
        }
    }

    //隐藏
    export function hideCustomAdvert(unitid){
        if(mWxValid){
            // console.log("jin---隐藏unitid,AdvertUnitId.Custom: ", unitid, unitid || AdvertUnitId.Custom)
            const advert = createCustomAdvert(unitid)
            if(!advert.instance.isShow()){
                return
            }
        
            advert.instance.hide()
            .then(()=>{
                // console.log("jin---广告隐藏成功")
                // console.log("jin---advert: ", advert, advertCustom)
            })
            .catch((err)=>{
                console.log("jin---广告隐藏err: ", err)
            })
        }
    }

    // 广告是否关闭
    export function customAdvertOnClose(unitid){
        if(mWxValid){
            if(advertCustom[unitid]){
                return advertCustom[unitid].destroyed
            }
            
        }
    }

    // 销毁
    export function customAdvertDestroy(unitid){
        // console.log("jin---customAdvertDestroy: ",unitid, advertCustom)
        if(mWxValid && advertCustom[unitid]){
            // console.log("jin---destroy ad")
            advertCustom[unitid].instance.destroy()
            delete advertCustom[unitid]
            initCustomAd(unitid)
        }
    }

    export function isStartCustomAdvert(){
        if(!mWxValid){
            return
        }
        //TODO 暂时关掉原生广告
        return false

        if(compareVersion(common.SDKVersion, WxAPIVersion.createCustomAd) >= 0){
            return true
        }else{
            return false
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
            common.appQueryChecked = false

            if (share.callback) {
                let success = true
                if (share.skipCheck) {
                    // do nothing
                } else if (!share.invoked) {
                    success = false
                    share.invoked = true
                    // DataManager.save("WX_FLAG_SHARE", true)
                } else if (Date.now() - share.time < 3000) {
                    success = false
                }

                success ? share.callback() : showModal("分享失败，请换个群试试。")
                share.callback = null
            } else if (checkAppQuery()) {
                // do nothing
            } else if (common.backad && null == DataManager.CommonData["gameServer"] && !DataManager.CommonData.CancelBackAd) {
                showInterstitialAdvert()
            }

            console.log("jin---WxWrapper addWxEventListener:", DataManager.load(DataManager.UserData.guid + "payInfo"))
            if(DataManager.load(DataManager.UserData.guid + "payInfo") != null && DataManager.load(DataManager.UserData.guid + "payInfo") != ''){
                setTimeout(()=>{
                    orderToServer()
                    console.log("jin---在游戏中，订单触发二次请求addWxEventListener")
                },1*1000);
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

    export function initVideo(unitid) {
        if (mWxValid) {
            createVideoAdvert(unitid || AdvertUnitId.Video)
        }
    }

    export function initBanner(unitid) {
        if (mWxValid) {
            createBannerAdvert(unitid || AdvertUnitId.Banner)
        }
    }

    // wx.requestSubscribeMessage >= 2.4.4
    export function requestSubscribeMessage(templateId, callback) {
        if (mWxValid && wx.requestSubscribeMessage) {
            wx.requestSubscribeMessage({
                tmplIds: [templateId],
                complete: (res) => {
                    if (res.errMsg == "requestSubscribeMessage:ok" && res[templateId] == "accept") {
                        http.open(DataManager.getURL("WX_SUBSCRIBE_MESSAGE"), {
                            appId: DataManager.Instance.wxAPPID,
                            openId: DataManager.UserData.openId,
                            pageId: 1001,
                            templateId: templateId
                        }, (res) => {
                            if (res && res.ret == 0) {
                                callback(true)
                            } else {
                                callback(false)
                            }
                        })
                    } else {
                        console.error(res.errCode + res.errMsg)
                        callback(false)
                    }
                }
            })
        } else {
            callback(false)
        }
    }

    export function checkAppQuery() {
        if (!common.appQueryChecked && common.query && common.query.event) {
            const event = common.query.event
            if (event == "friendPay") {
                if (cc.sys.os == cc.sys.OS_IOS) {
                    iMessageBox("暂不支持IOS用户赠送")
                } else {
                    loadOrderStatus(common.query.order, (res) => {
                        if (res) {
                            if (res.ret == 1) {
                                showFriendPayPop(common.query, true)
                            } else if (res.ret == 0) {
                                iMessageBox("订单已支付")
                            } else {
                                iMessageBox("订单支付已关闭")
                            }
                        } else {
                            iMessageBox("订单状态查询失败")
                        }
                    })
                    return true
                }
            }
            common.appQueryChecked = true
        }
        return false
    }

    //小程序跳转
    export function navigateToMiniProgram(miniGameId: string, callback:(data:string) => void){
        if (mWxValid){
            wx.navigateToMiniProgram({
                appId: miniGameId,
                path: null,
                extraData: {
                    foo: 'QMDDZ-AD-CLIENT'
                },
                envVersion: 'release',
                success(res) {
                    // console.log("jin---navigateToMiniProgram success")
                    callback && callback(null)
                },
                fail(){
                    console.log("jin---navigateToMiniProgram fail")
                }
            })
        }
    }
 
    //用户被动接受的东西（类似弹出广告）用下面判断
    export function compareVersion(v1, v2) {
        // console.log("jin---v1, v2:", v1, v2)
        if(!(v1 && v2))
            return
        v1 = v1.split('.')
        v2 = v2.split('.')
        const len = Math.max(v1.length, v2.length)
      
        while (v1.length < len) {
          v1.push('0')
        }
        while (v2.length < len) {
          v2.push('0')
        }
      
        for (let i = 0; i < len; i++) {
          const num1 = parseInt(v1[i])
          const num2 = parseInt(v2[i])
      
          if (num1 > num2) {
            return 1
          } else if (num1 < num2) {
            return -1
          }
        }
      
        return 0
    }

    //TDOO localstorage
    export function setStorageInfo(key: string, vaule: any) {
        if (mWxValid){
            wx.setStorage({
                key: key,
                data: vaule,
                success: ()=>{
                    console.log("jin---setStorageInfo success")
                },
                fail: ()=>{
                    console.log("jin---setStorageInfo fail")
                }
            })
        }
    }

    export function getStorageInfo(key:string, callback?:(date: any) => void){
        if (mWxValid){
            wx.getStorage({
                key: key,
                success (res) {
                console.log("jin---getStorageInfo success",res.data)
                callback && callback(res.data)
                return res.data
                }
            })
        }
    }

    export function getStorageInfoSync(key:string){
        if (mWxValid){
            return wx.getStorageSync(key)
        }
    }
    
    export function setStorageInfoSync(key:string, value: any){
        if (mWxValid){
            try {
                wx.setStorageSync(key, value)
                console.log("jin---cunchu")
              } catch (e) { }
        }
    }

    //TODO 客服会话
    export function payOrderByCustome(boxItem, callback?: Function) {
        // payInfo.pay_plat = 2
        if(!mWxValid){
            return
        }

        if (wx.openCustomerServiceConversation) {
            let payInfo = {
                pid: DataManager.UserData.guid,
                ticket:DataManager.UserData.ticket,
                boxid: boxItem.boxid,
                pn: DataManager.Instance.packetName,
                goods_name: boxItem.boxname,
                metadata:{"env":1}
            }
            //TODO 1.pid 2.ticket 3.boxid 4.pn 5.goods_name
            console.log("jin---payInfo: ", payInfo)
            wx.openCustomerServiceConversation({
                showMessageCard: true,
                sendMessageTitle: boxItem.boxname,
                sendMessageImg: DataManager.Instance.onlineParam.pay_hh_ios,//boxItem.icon,
                sendMessagePath: "index?payParam=" + JSON.stringify(payInfo),
                success: (res) => {callback && callback()},//callback?.({ code: 1, msg: '' }),
                fail: (msg) => {console.log("jin---payOrderByCustome fail: ", JSON.stringify(msg) || "支付失败")}//callback?.({ code: -1, msg: JSON.stringify(msg) || "支付失败" })
            })
        } else {
            wx.showModal({
                title: "微信版本过低",
                content: "请更新最新版本微信后再试！",
            })
            // callback?.({ code: -2, msg: "微信版本过低" })
        }

    }
}

export default WxWrapper