const native_class_name = "com/izhangxin/utils/QttPlugin"

const cbs = {
    login: undefined,
    showVideoAd:undefined,
    hideSplashAd:undefined
}

function callStaticNativeMethod(method: string, sign: string, ...params: any[]) {
    if (!CC_JSB) {
        return
    }

    try {
        params.unshift(native_class_name, method, sign)
        return jsb.reflection.callStaticMethod.apply(jsb.reflection, params)
    } catch (e) {
        cc.error("callStaticNativeMethod", JSON.stringify(e))
    }
}

function nativeCallback(method: string, data: any) {
    cc.log("JSCallback",method,data)
    cbs[method] && cbs[method](data)
    cbs[method] = undefined
}

(<any>window).nativeCallback = nativeCallback

namespace QttPluginWrapper {

    export function login(onlogin: Function) {
        cbs.login = onlogin
        callStaticNativeMethod("login", "()V")
    }

    export function pay(info: any) {
        callStaticNativeMethod("pay", "(ILjava/lang/String;Ljava/lang/String;Ljava/lang/String;)V", info.money, info.openId, info.notifyUrl, info.orderno)
    }

    export function showBannerAd(index: string) {
        callStaticNativeMethod("showBannerAd", "(Ljava/lang/String;)V", index)
    }

    export function hideBannerAd() {
        callStaticNativeMethod("hideBannerAd", "()V")
    }

    export function hideSplashAd(callback: Function) {
        cbs.hideSplashAd = callback
        callStaticNativeMethod("hideSplashAd", "()V")
    }

    export function showVideoAd(index: string, callback: Function) {
        cbs.showVideoAd = callback
        callStaticNativeMethod("showVideoAd", "(Ljava/lang/String;)V", index)
    }

    export function report(type: string) {
        callStaticNativeMethod("report", "(Ljava/lang/String;)V", type)
    }

    export function openWithDrawPage() {
        callStaticNativeMethod("openWithDrawPage", "()V")
    }

    export function openFeedBackPage() {
        callStaticNativeMethod("openFeedBackPage", "()V")
    }

    export function exitGame() {
        callStaticNativeMethod("exitGame", "()V")
    }
}

export default QttPluginWrapper