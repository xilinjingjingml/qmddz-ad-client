import DataManager from "./baseData/DataManager";
import { callStaticMethod, ConfirmBox, iMessageBox, pluginAdsResult, pluginPayResult, versionCompare } from "./BaseFuncTs";
import NetManager from "./baseNet/NetManager";
import { http } from "./utils/http";

export enum EPluginType {
    kPluginAds = 1, //广告
    kPluginIAP = 3, //支付
    kPluginSession = 5, //登陆
    kPluginExend = 6, //扩展
}

export enum EPlatformEvent {
    GET_CLIPBOARD_SUCCESS = 21, //获取剪切板内容成功
    GET_OPENINSTALL_PARAMS = 50, //获取openinstall参数
    FANGCHENMI = 51, //插件防沉迷
}

export enum EExtendTag {
    EXTEND_METHOD_TAG_feedBack = 3,//用户反馈入口
    EXTEND_METHOD_TAG_onExit = 7,//退出页
    EXTEND_METHOD_TAG_shiming = 10,// 实名
}

export enum EAdsType {
    ADS_TYPE_BANNER = 0, //banner广告
    ADS_TYPE_INTER = 3, //插屏广告
    ADS_TYPE_REWARTVIDEO = 4, //视频激励广告
}
export enum EAdsResult {
    RESULT_CODE_REWARTVIDEO_SUCCEES = 12,	    //激励视频广告成功
    RESULT_CODE_REWARTVIDEO_FAIL = 13,		    //激励视频广告失败
    RESULT_CODE_BANNER_SUCCESS = 14,		    //激励视频广告load失败
    RESULT_CODE_REWARTVIDEO_LOAD_FAIL = 16,		//激励视频广告load失败
    RESULT_CODE_REWARTVIDEO_LOAD_SUCCESS = 17,  //激励视频广告load成功
}

interface IPlugin {
    name: string
    type: string
    tag: string
    mid: string
}

namespace PluginManager {
    let _pluginProxy: any
    let _iapPluginList: IPlugin[]
    export let pluginConfig: { game: { PacketName: string }[], plugins: IPlugin[] }
    let _config: any = {}

    export function onInit(): void {
        cc.log("[PluginManager.onInit]")

        setPluginEnv()

        if (CC_JSB) {
            _pluginProxy = jsb.PluginProxyWrapper.getInstance()
            // 登陆回调
            _pluginProxy.setSessionCallBack(onSessionCallBack)
            // 支付回调
            _pluginProxy.setIapCallBack(onIapCallBack)
            // 分享回调
            _pluginProxy.setSocialCallBack(onSocialCallBack)
            // 平台回调
            _pluginProxy.setPlatformCallBack(onPlatformCallBack)
            // 广告回调
            _pluginProxy.setAdsCallBack && _pluginProxy.setAdsCallBack(onAdsCallBack)
            // Java回调
            window['JavascriptJavaCallBack'] = onJavascriptJavaCallBack

            setPluginConfig(jsb.fileUtils.getValueMapFromFile("thirdparty/plugins.plist"))
        } else {
            cc.loader.loadRes("thirdparty/plugins", (err, file) => {
                if (err) {
                    cc.error(err)
                    ConfirmBox({
                        content: "配置读取失败",
                        maskCanClose: false,
                        buttonNum: 1,
                        showClose: false,
                        confirmClose: false,
                        zIndex: cc.macro.MAX_ZINDEX
                    })
                    return
                }

                setPluginConfig(file._nativeAsset)
            })
        }
    }

    export function replaceHost(configs: any) {
        if (_config.replaceHostOld && _config.replaceHostNew) {
            for (const key in configs) {
                if (configs.hasOwnProperty(key)) {
                    if (typeof configs[key] == "string") {
                        configs[key] = configs[key].replace(_config.replaceHostOld, _config.replaceHostNew)
                    }
                }
            }
        }
    }

    function setPluginEnv(): void {
        if (CC_JSB) {
            const config = jsb.fileUtils.getValueMapFromFile("thirdparty/config.plist")
            cc.log("[PluginManager.setPluginEnv] config", JSON.stringify(config))
            if (config && config.config) {
                _config = config.config
                if (_config.env) {
                    DataManager.Instance.CurENV = parseInt(_config.env)
                }
            }
        }

        const env = DataManager.load("LAST_PLUGIN_ENV")
        if (env != null) {
            DataManager.Instance.CurENV = env
        }
        cc.log("[PluginManager.setPluginEnv] CurENV", DataManager.Instance.CurENV)
        DataManager.Instance.updateEnvConfig()
    }

    export function getConfig(name: string): string {
        return _config[name]
    }

    function setPluginConfig(config: any): void {
        cc.log("[PluginManager.pluginConfig]", JSON.stringify(config))
        pluginConfig = config
        if (pluginConfig.game[0].PacketName) {
            DataManager.Instance.packetName = pluginConfig.game[0].PacketName
        }
        if (_pluginProxy) {
            if (cc.sys.os == cc.sys.OS_ANDROID) {
                DataManager.Instance.packetName = callStaticMethod("com/izhangxin/utils/luaj", "getChannelName", "()Ljava/lang/String;")
            }
            _pluginProxy.setPluginConfig(JSON.stringify(pluginConfig))
            cc.log("[PluginManager.pluginConfig] packetName", DataManager.Instance.packetName)
            _pluginProxy.setPackageName(DataManager.Instance.packetName)
            cc.log("[PluginManager.pluginConfig] CurENV", DataManager.Instance.CurENV)
            _pluginProxy.switchPluginXRunEnv([1, 2][DataManager.Instance.CurENV] || 0)

            for (const plugin of pluginConfig.plugins) {
                loadPlugin(plugin.name, parseInt(plugin.type))
            }
            loadPluginFinish()
        }
        loadPayModeList()

        // 检测是否有广告插件
        DataManager.GlobalData.noAD = !hasPluginByType(EPluginType.kPluginAds)

        DataManager.CommonData["pluginFinish"] = true
    }

    function loadPlugin(name: string, type: EPluginType): void {
        _pluginProxy.loadPlugin(name, 0, type)
    }

    function loadPluginByTag(tag: number, type: EPluginType): void {
        for (const plugin of pluginConfig.plugins) {
            if (parseInt(plugin.tag) == tag && parseInt(plugin.type) == type) {
                loadPlugin(plugin.name, parseInt(plugin.type))
                break
            }
        }
    }

    function loadPayModeList(): void {
        _iapPluginList = []
        for (const plugin of pluginConfig.plugins) {
            if (plugin.type == EPluginType.kPluginIAP.toString()) {
                _iapPluginList.push(plugin)
            }
        }
    }

    // { SessionResultCode: number, msg: string, sessionInfo: any }
    function onSessionCallBack(data: string): void {
        cc.log("[PluginManager.onSessionCallBack] data:", data)
        NetManager.Instance.onMessage({ opcode: "PluginSessionCallBack", data: data })
    }

    // { PayResultCode: number, msg: string, payInfo: any }
    function onIapCallBack(data: string): void {
        cc.log("[PluginManager.onIapCallBack] data:", data)
        // NetManager.Instance.onMessage({ opcode: "PluginIapCallBack", data: data })
        pluginPayResult(data)
    }

    // { ShareResultCode: number, msg: string, shareResultInfo: any }
    function onSocialCallBack(data: string): void {
        cc.log("[PluginManager.onSocialCallBack] data:", data)
        NetManager.Instance.onMessage({ opcode: "PluginSocialCallBack", data: data })
    }

    // { PlatformResultCode: number, msg: string, url: any }
    function onPlatformCallBack(data: string): void {
        cc.log("[PluginManager.onPlatformCallBack] data:", data)
        NetManager.Instance.onMessage({ opcode: "PluginPlatformCallBack", data: data })
    }

    // { AdsResultCode: number, msg: string }
    const AdBannerSize = "AdBannerSize"
    function onAdsCallBack(data: string): void {
        cc.log("[PluginManager.onAdsCallBack] data:", data)
        // NetManager.Instance.onMessage({ opcode: "PluginAdsCallBack", data: data })
        const info: { AdsResultCode: number, msg: string } = JSON.parse(data)
        if ([EAdsResult.RESULT_CODE_REWARTVIDEO_SUCCEES, EAdsResult.RESULT_CODE_REWARTVIDEO_FAIL, EAdsResult.RESULT_CODE_REWARTVIDEO_LOAD_FAIL].indexOf(info.AdsResultCode) != -1) {
            cc.audioEngine.resumeMusic()
        } else if (info.AdsResultCode == EAdsResult.RESULT_CODE_BANNER_SUCCESS) {
            if (info.msg.length > 0) {
                const banner: { bannerWidth: string, bannerHeight: string } = JSON.parse(info.msg)
                const sendBannerSize: cc.Size = cc.size(Number(banner.bannerWidth) / cc.view.getFrameSize().width * cc.winSize.width, Number(banner.bannerHeight) / cc.view.getFrameSize().height * cc.winSize.height)
                cc.log('[PluginManager.onAdsCallBack] sendBannerSize', sendBannerSize.width, sendBannerSize.height)
                const dataBannerSize = DataManager.load(AdBannerSize)
                let change = true
                if (dataBannerSize) {
                    const saveBannerSize: cc.Size = cc.size(Number(dataBannerSize.width), Number(dataBannerSize.height))
                    cc.log('[PluginManager.onAdsCallBack] saveBannerSize', saveBannerSize.width, saveBannerSize.height)
                    change = !saveBannerSize.equals(sendBannerSize)
                }
                if (change) {
                    cc.log('[PluginManager.onAdsCallBack] bannerSize change')
                    DataManager.save(AdBannerSize, sendBannerSize)
                    NetManager.Instance.onMessage({ opcode: "onBannerResize", rect: { width: sendBannerSize.width, height: sendBannerSize.height, x: 0, y: 0 } })
                }
            }
        }
        pluginAdsResult(info)
    }

    function onJavascriptJavaCallBack(message: { opcode: string, data: string }): void {
        cc.log("[PluginManager.onJavascriptJavaCallBack] data:", JSON.stringify(message))
        NetManager.Instance.onMessage(message)
    }

    export function getPluginVersion(): string {
        if (_pluginProxy) {
            return _pluginProxy.getPluginVersion("PlatformWP", 1, 9)
        } else {
            return "5.0.0"
        }
    }

    export function getVersionName(): string {
        if (_pluginProxy) {
            return _pluginProxy.getVersionName()
        } else {
            return "3.0.0"
        }
    }

    export function getDeviceIMEI(): string {
        if (_pluginProxy) {
            return _pluginProxy.getDeviceIMEI()
        } else {
            return ""
        }
    }

    export function getMacAddress(): string {
        if (_pluginProxy) {
            return _pluginProxy.getMacAddress()
        } else {
            return "fa64d01eb8cfbdb9"
        }
    }

    let versionCode = undefined
    export function getVersionCode(): number {
        if (versionCode === undefined) {
            versionCode = _pluginProxy ? parseInt(_pluginProxy.getVersionCode()) : 999
        }
        return versionCode
    }

    export function getDeviceName(): string {
        if (_pluginProxy) {
            return _pluginProxy.getDeviceName()
        } else {
            return "Device"
        }
    }

    export function startUpdatingLocation(): void {
        if (_pluginProxy) {
            return _pluginProxy.startUpdatingLocation()
        }
    }

    export function copyToClipboard(text: string): void {
        if (_pluginProxy) {
            _pluginProxy.copyToClipboard(text)
        }
    }

    export function getClipBoardContent(): void {
        if (_pluginProxy) {
            _pluginProxy.getClipBoardContent()
        } else {
            onPlatformCallBack(JSON.stringify({ PlatformResultCode: EPlatformEvent.GET_CLIPBOARD_SUCCESS, msg: "获取剪切板内容成功", url: "" }))
        }
    }

    export function initHeadFace(url: string): void {
        cc.log("[PluginManager.initHeadFace] url:", url)
        _pluginProxy.initHeadFace(JSON.stringify({
            UpLoadURL: url
        }))
    }

    export function getPayTypeByMid(mid: string): string {
        if (!pluginConfig) {
            return
        }

        if (!_iapPluginList) {
            loadPayModeList()
        }
        for (const plugin of _iapPluginList) {
            if (plugin.mid == mid.toString()) {
                return plugin.name
            }
        }
        return
        const h5List = {
            "2": "IAPAlipayH5",
            "111": "IAPWeiXinH5",
        }
        return h5List[mid]
    }

    export function getOnlyPayType(): string | false {
        if (!pluginConfig) {
            return false
        }

        if (!_iapPluginList) {
            loadPayModeList()
        }

        if (_iapPluginList.length == 1) {
            return _iapPluginList[0].name
        }

        return false
    }

    export function hasPluginByName(name: string): boolean {
        if (pluginConfig) {
            for (const plugin of pluginConfig.plugins) {
                if (plugin.name == name) {
                    return true
                }
            }
        }
        return false
    }

    export function hasPluginByType(type: EPluginType, tag?: number): boolean {
        if (pluginConfig) {
            for (const plugin of pluginConfig.plugins) {
                if (plugin.type == type.toString()) {
                    if (tag == null || plugin.tag == tag.toString()) {
                        return true
                    }
                }
            }
        }
        return false
    }

    interface ILoginInfo {
        sessionType: string
        [key: string]: string
    }
    /**
     * 插件登陆
     */
    export function login(loginInfo: ILoginInfo): void {
        cc.log("[PluginManager.login] sessionType:", JSON.stringify(loginInfo))
        if (_pluginProxy) {
            loginInfo.LoginHost = DataManager.Instance.envConfigs.loginURL
            loginInfo.PlatformHost = DataManager.Instance.envConfigs.webURL
            loadPlugin(loginInfo.sessionType, EPluginType.kPluginSession)
            _pluginProxy.userItemsLogin(JSON.stringify(loginInfo))
        } else if (cc.sys.isBrowser) {
            const imei = DataManager.UserData.imei || DataManager.load("user_guest_openid") || new Date().getTime() + "" + Math.random() * 10000
            http.open(DataManager.getURL("USER_LOGIN"), {
                imei: imei,
                name: "Guest",
                pn: DataManager.Instance.packetName,
                version: DataManager.Instance.version
            }, (res) => {
                cc.log("[PluginManager.login]", res)
                DataManager.save('user_guest_openid', imei)
                onSessionCallBack(JSON.stringify({
                    SessionResultCode: res.ret,
                    msg: res.tips,
                    sessionInfo: res
                }))
            })
        }
    }

    /**
     * 插件登出
     */
    export function logout(): void {
        cc.log("[PluginManager.logout]")
        if (_pluginProxy) {
            _pluginProxy.logout()
        }
    }

    /**
     * 插件支付
     */
    export function pay(payType: string, payInfo: any): void {
        if (_pluginProxy) {
            loadPlugin(payType, EPluginType.kPluginIAP)
            payInfo.IapHost = DataManager.Instance.envConfigs.payURL
            cc.log("[PluginManager.pay]", JSON.stringify(payInfo))
            _pluginProxy.payForProduct(JSON.stringify(payInfo))
        } else {
            delayCallBack(onIapCallBack, JSON.stringify({
                PayResultCode: 0,
                msg: "支付完成",
                payInfo: {}
            }))
        }
    }

    interface IShareInfo {
        ShareWay: string
        ShareTaskType: string
        ShareTitle: string
        ShareText: string
        ShareUrl: string
        ShareType: string
        gameid: string
        SharedImg?: string
    }
    /**
     * 插件分享
     */
    export function share(shareInfo: IShareInfo): void {
        if (_pluginProxy) {
            cc.log("[PluginManager.share]", JSON.stringify(shareInfo))
            _pluginProxy.shareWithItems(JSON.stringify(shareInfo))
        } else {
            delayCallBack(onSocialCallBack, JSON.stringify({
                ShareResultCode: 0,
                msg: "分享成功",
                shareResultInfo: {}
            }))
        }
    }

    /**
     * 打开客服
     */
    export function openKeFu(): void {
        jump2ExtendMethod(EExtendTag.EXTEND_METHOD_TAG_feedBack)
    }

    /**
     * 打开第三方退出
     */
    export function openExit(): void {
        jump2ExtendMethod(EExtendTag.EXTEND_METHOD_TAG_onExit)
    }

    /**
     * 打开第三方实名认证
     */
    export function openShiming(): void {
        jump2ExtendMethod(EExtendTag.EXTEND_METHOD_TAG_shiming)
    }

    function jump2ExtendMethod(tag: EExtendTag): void {
        cc.log("[PluginManager.jump2ExtendMethod]", tag)
        if (_pluginProxy) {
            loadPluginByTag(tag, EPluginType.kPluginExend)
            _pluginProxy.jump2ExtendMethod(tag, JSON.stringify({}))
        }
    }

    /**
     * 登陆完成后通知推送插件 让它去注册推送
     */
    export function StartPushSDK(): void {
        cc.log("[PluginManager.StartPushSDK]")
        if (_pluginProxy) {
            _pluginProxy.StartPushSDKItem(JSON.stringify({ PushHost: DataManager.Instance.envConfigs.webURL }))
        }
    }

    /**
     * 友盟 统计事件
     */
    export function logEvent(name: string, param?: any): void {
        if (_pluginProxy) {
            cc.log("[PluginManager.logEvent]", name, JSON.stringify(param))
            _pluginProxy.logEvent(param ? 1 : 0, name, JSON.stringify(param) || "{}")
        }
    }

    /**
     * 获取 OpenInstall 参数
     */
    export function getOpenInstallParms(): void {
        cc.log("[PluginManager.getOpenInstallParms]")
        if (cc.sys.os == cc.sys.OS_ANDROID) {
            callStaticMethod("com/izhangxin/utils/luaj", "getOpenInstallParms", "()V")
        } else if (cc.sys.os == cc.sys.OS_IOS) {
            callStaticMethod("LuaObjc", "getOpenInstallParms")
        } else if (CC_PREVIEW) {
            delayCallBack(onPlatformCallBack, JSON.stringify({
                PlatformResultCode: EPlatformEvent.GET_OPENINSTALL_PARAMS,
                msg: "获取app安装参数",
                url: JSON.stringify({
                    inviteCode: "111474"
                }),
            }))
        }
    }

    /**
     * 展示广告
     */
    export function showAds(adsType: EAdsType, adIndex?: string): void {
        cc.log("[PluginManager.showAds]", adsType, adIndex, getPluginVersion())
        if (adsType == EAdsType.ADS_TYPE_REWARTVIDEO) {
            cc.audioEngine.pauseMusic()
        } else if (adsType == EAdsType.ADS_TYPE_BANNER) {
            const bannerSize: cc.Size = DataManager.load(AdBannerSize) || cc.size(0, 120)
            NetManager.Instance.onMessage({ opcode: "onBannerResize", rect: { width: bannerSize.width, height: bannerSize.height, x: 0, y: 0 } })
        }
        if (_pluginProxy) {
            if (versionCompare(getPluginVersion(), "6.0.0") >= 0) {
                if (adsType == EAdsType.ADS_TYPE_REWARTVIDEO) {
                    iMessageBox({ message: "视频广告加载中...", delayTime: 10 })
                }
                _pluginProxy.showAds(JSON.stringify({
                    adType: adsType.toString(),
                    adId: adIndex || "0",
                    adWidth: "0",
                    adHeight: "0",
                }))
                return
            }

            _pluginProxy.showAds(adsType, 0, 0)
        } else {
            delayCallBack(onAdsCallBack, JSON.stringify({
                AdsResultCode: adsType == EAdsType.ADS_TYPE_REWARTVIDEO ? EAdsResult.RESULT_CODE_REWARTVIDEO_LOAD_SUCCESS : 0,
                msg: "",
            }), 1)
            delayCallBack(onAdsCallBack, JSON.stringify({
                AdsResultCode: adsType == EAdsType.ADS_TYPE_REWARTVIDEO ? EAdsResult.RESULT_CODE_REWARTVIDEO_FAIL : 0,
                msg: "",
            }), 3)
        }
    }

    /**
     * 隐藏广告
     */
    export function hideAds(adsType: EAdsType): void {
        cc.log("[PluginManager.hideAds]", adsType)
        if (_pluginProxy) {
            _pluginProxy.hideAds(adsType)
        }
    }

    function delayCallBack(callback: Function, data: any, time: number = 0.5) {
        if (_pluginProxy) {
            return
        }

        cc.Canvas.instance.node.runAction(cc.sequence(cc.delayTime(time), cc.callFunc(() => {
            callback(data)
        })))
    }

    export function checkLuaJVersion(version: string): boolean {
        if (cc.sys.os == cc.sys.OS_ANDROID) {
            const luajversion = callStaticMethod("com/izhangxin/utils/luaj", "getVersion", "()Ljava/lang/String;")
            if (luajversion && versionCompare(luajversion, version) >= 0) {
                return true
            }
        }

        return false
    }

    /**
     * 获取刘海屏刘海高度
     */
    export function getNotchHeight(): number {
        if (checkLuaJVersion("1.0.1")) {
            if (cc.sys.os == cc.sys.OS_ANDROID) {
                return callStaticMethod("com/izhangxin/utils/luaj", "getNotchHeight", "()I")
            }
        }

        return 0
    }

    /**
     * 获取拉起APP时传入私人房参数
     */
    export function getPrivateRoomCode(): string {
        if (checkLuaJVersion("1.0.2")) {
            if (cc.sys.os == cc.sys.OS_ANDROID) {
                return callStaticMethod("com/izhangxin/utils/luaj", "getPrivateRoomCode", "()Ljava/lang/String;")
            }
        }
        return ""
    }

    /**
     * 导入插件完毕后
     */
    export function loadPluginFinish(): void {
        if (checkLuaJVersion("1.0.3")) {
            if (cc.sys.os == cc.sys.OS_ANDROID) {
                callStaticMethod("com/izhangxin/utils/luaj", "loadPluginFinish", "()V")
            }
        }
    }
}

export default PluginManager
