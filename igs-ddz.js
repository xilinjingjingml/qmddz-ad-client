"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.igs = void 0;
var VERSION = 100;
var s = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    if (args) { }
    for (var e = 0, t = 0, n = arguments.length; t < n; t++)
        e += arguments[t].length;
    var o = Array(e), i = 0;
    for (t = 0; t < n; t++)
        for (var a = arguments[t], r = 0, s = a.length; r < s; r++,
            i++)
            o[i] = a[r];
    return o;
};
function $tag(str) {
    return "[igs] [" + Date.now() + "]" + str;
}
function $log() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    for (var e = [], t = 0; t < arguments.length; t++)
        e[t] = arguments[t];
    var contentArr = s(["[igs] [" + Date.now() + "]"], e);
    console.log.apply(console, contentArr);
}
function $error() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    for (var e = [], t = 0; t < arguments.length; t++)
        e[t] = arguments[t];
    var contentArr = s(["[igs] [" + Date.now() + "]"], e);
    console.error.apply(console, contentArr);
}
function $warn() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    for (var e = [], t = 0; t < arguments.length; t++)
        e[t] = arguments[t];
    var contentArr = s(["[igs] [" + Date.now() + "]"], e);
    console.warn.apply(console, contentArr);
}
function $info() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    for (var e = [], t = 0; t < arguments.length; t++)
        e[t] = arguments[t];
    var contentArr = s(["[igs] [" + Date.now() + "]"], e);
    console.info.apply(console, contentArr);
}
var igs;
(function (igs) {
    var util;
    (function (util) {
        function dateFormat(fmt, date) {
            var ret;
            var opt = {
                "Y+": date.getFullYear().toString(),
                "M+": (date.getMonth() + 1).toString(),
                "d+": date.getDate().toString(),
                "H+": date.getHours().toString(),
                "m+": date.getMinutes().toString(),
                "s+": date.getSeconds().toString(),
                "S": date.getMilliseconds()
            };
            for (var k in opt) {
                ret = new RegExp("(" + k + ")").exec(fmt);
                if (ret) {
                    fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")));
                }
                ;
            }
            ;
            return fmt;
        }
        util.dateFormat = dateFormat;
    })(util = igs.util || (igs.util = {}));
})(igs = exports.igs || (exports.igs = {}));
var BasePlatform = (function () {
    function BasePlatform(name) {
        this.pluginConfig = null;
        this._name = "unknown";
        this.isTipTrackUserAction = false;
        $log("".concat(name, " platform"));
        this._name = name;
    }
    Object.defineProperty(BasePlatform.prototype, "name", {
        get: function () {
            return this._name;
        },
        enumerable: false,
        configurable: true
    });
    BasePlatform.prototype.triggerGC = function () { };
    BasePlatform.prototype.userLabel = function () {
        var label = [];
        if (typeof window['iGaoShouApi'] === "undefined") {
            var openid = window['igsgame']['iGaoShouData5'];
            label.push(openid ? "newbie-false" : "newbie-true");
            label.push("rc-unknown");
            return label;
        }
        var self = window['iGaoShouApi'].GetSelf();
        if (!self) {
            label.push("newbie-unknown");
            label.push("rc-err1");
            return label;
        }
        label.push(self.newbie ? "newbie-true" : "newbie-false");
        label.push("rc-" + self.playGames);
        return label;
    };
    BasePlatform.prototype.TrackEvent = function (name, detail) {
        if (detail === void 0) { detail = {}; }
        var ext = [];
        ext = ext.concat(this.userLabel());
        if (detail.uploadToPlatform && detail.uploadToPlatform.length > 0) {
            detail.uploadToPlatform.forEach(function (item) {
                ext.push(JSON.stringify(item));
            });
        }
        window['igsgame'].igsEvent.report(name);
    };
    BasePlatform.prototype.TrackUserAction = function (name) {
    };
    return BasePlatform;
}());
var DebugPlatform = (function (_super) {
    __extends(DebugPlatform, _super);
    function DebugPlatform() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DebugPlatform.prototype.TrackEvent = function (name, detail) {
        if (detail === void 0) { detail = {}; }
        name += ("-" + this.userLabel().join("-"));
        $log("=EventTrack=", name, igs.util.dateFormat("YYYY-MM-dd HH:mm:ss.S", new Date()));
    };
    return DebugPlatform;
}(BasePlatform));
var WebPlatform = (function (_super) {
    __extends(WebPlatform, _super);
    function WebPlatform() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WebPlatform.prototype.TrackEvent = function (name, detail) {
        if (detail === void 0) { detail = {}; }
        name += ("-" + this.userLabel().join("-"));
        $log("=EventTrack=", name, igs.util.dateFormat("YYYY-MM-dd HH:mm:ss.S", new Date()));
    };
    return WebPlatform;
}(BasePlatform));
var WXPlatform = (function (_super) {
    __extends(WXPlatform, _super);
    function WXPlatform(name) {
        var _this = _super.call(this, name) || this;
        var wx = window['wx'];
        wx.onMemoryWarning(function () {
            $log("==内存警告==");
            wx.triggerGC();
        });
        wx.onNetworkStatusChange(function (res) {
            $log("=NetworkStatusChange=", res.isConnected, res.networkType);
        });
        if (typeof wx.onNetworkWeakChange === "function") {
            wx.onNetworkWeakChange(function () {
                $log("=onNetworkWeakChange=");
            });
        }
        return _this;
    }
    WXPlatform.prototype.TrackEvent = function (name, detail) {
        if (detail === void 0) { detail = {}; }
        var wx = window['wx'];
        if (name !== "") {
            wx.igsEvent.report(name, this.userLabel());
        }
        if (detail.uploadToPlatform) {
            for (var _i = 0, _a = detail.uploadToPlatform; _i < _a.length; _i++) {
                var i = _a[_i];
                $log("wx.reportEvent", i.k, i.v);
                wx.reportEvent(i.k, i.v);
            }
        }
    };
    WXPlatform.prototype.TrackUserAction = function (name) {
        var wx = window['wx'];
        if (wx && wx.igsEvent) {
            if (wx.igsEvent.reportUserAction) {
                wx.igsEvent.reportUserAction(name, this.userLabel());
            }
            else {
                if (!this.isTipTrackUserAction) {
                    $error("function reportUserAction not exist! please check report.js");
                    this.isTipTrackUserAction = true;
                }
            }
        }
    };
    WXPlatform.prototype.triggerGC = function () {
        try {
            var wx = window['wx'];
            if (wx) {
                wx.triggerGC();
            }
        }
        catch (e) {
            $error('wx.triggerGC() call failed');
        }
    };
    return WXPlatform;
}(BasePlatform));
var Platform = (function () {
    function Platform() {
    }
    Platform.getInstance = function () {
        if (CC_EDITOR) {
            return;
        }
        if (this.instance) {
            return;
        }
        if (cc.sys.platform === cc.sys.WECHAT_GAME) {
            if ("undefined" !== typeof window['wx'] && "undefined" === typeof window['qq']) {
                this.instance = new WXPlatform("wx");
            }
        }
        else if (cc.sys.isBrowser) {
            this.instance = new WebPlatform("web");
        }
        else {
            this.instance = new DebugPlatform("debug");
        }
        return this.instance;
    };
    Platform.instance = null;
    return Platform;
}());
var $platform = Platform.getInstance();
(function (igs) {
    var platform;
    (function (platform) {
        function trackEvent(name, detail) {
            if (detail === void 0) { detail = {}; }
            $platform.TrackEvent(name, detail);
        }
        platform.trackEvent = trackEvent;
    })(platform = igs.platform || (igs.platform = {}));
})(igs = exports.igs || (exports.igs = {}));
window["igs"] = igs;
