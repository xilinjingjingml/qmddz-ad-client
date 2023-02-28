import { versionCompare } from "./BaseFuncTs"
import DataManager from "./baseData/DataManager"

const { ccclass, property } = cc._decorator

@ccclass
export default class HotUpdate extends cc.Component {
    private _progressHandler: (value: number) => void
    private _resultHandler: (ret: number) => void
    private _assetsManager: any
    private _manifestConfig: any = {}
    private _percent: number = 0
    private _path: string
    private _storagePath: string

    init(path: string) {
        this._path = path
        this._storagePath = jsb.fileUtils.getWritablePath() + path
        const manifestPath = cc.sys.localStorage.getItem("HotUpdateSearchPaths") ? this._storagePath : "thirdparty"
        this._assetsManager = new jsb.AssetsManager(manifestPath + '/project.manifest', this._storagePath, versionCompare)
        if (cc.sys.os === cc.sys.OS_ANDROID) {
            this._assetsManager.setMaxConcurrentTask(2)
        }
    }

    getLocalManifestVersion(): string {
        return this._assetsManager.getLocalManifest().getVersion()
    }

    setProgressHandler(handler: (value: number) => void) {
        this._progressHandler = handler
    }

    setResultHandler(handler: (value: number) => void) {
        this._resultHandler = handler
    }

    setUpdateUrl(url: string) {
        cc.log("[HotUpdate.setUpdateUrl]", url)
        this._manifestConfig = {
            packageUrl: url,
            remoteManifestUrl: url + "project.manifest",
            remoteVersionUrl: url + "version.manifest",
        }

        this.updateManifest(this._assetsManager.getLocalManifest(), 'project.manifest')
        this.updateStart()
    }

    updateManifest(manifest: any, filename: string) {
        const manifestPath = manifest.getManifestRoot() + filename
        const manifestJson = JSON.parse(jsb.fileUtils.getStringFromFile(manifestPath))
        for (const key in this._manifestConfig) {
            manifestJson[key] = this._manifestConfig[key]
        }
        manifest.parseJSONString(JSON.stringify(manifestJson), this._storagePath)
    }

    updateStart() {
        cc.log("[HotUpdate.updateStart]")
        this._assetsManager.setEventCallback(this.updateCallback.bind(this))
        this._assetsManager.update()
    }

    updateCallback(event: any) {
        let state = 0 // 1 finished 2 failed 3 already
        switch (event.getEventCode()) {
            case jsb.EventAssetsManager.ERROR_NO_LOCAL_MANIFEST:
                cc.log("[HotUpdate.updateCallback] No local manifest file found, hot update skipped.")
                state = 2
                break
            case jsb.EventAssetsManager.UPDATE_PROGRESSION:
                cc.log("[HotUpdate.updateCallback] Updated file.", event.getMessage())
                cc.log(event.getDownloadedFiles(), event.getTotalFiles(), event.getPercentByFile())
                cc.log(event.getDownloadedBytes(), event.getTotalBytes(), event.getPercent())
                this.updateProgress(event.getPercent())
                break
            case jsb.EventAssetsManager.ERROR_DOWNLOAD_MANIFEST:
            case jsb.EventAssetsManager.ERROR_PARSE_MANIFEST:
                cc.log("[HotUpdate.updateCallback] Fail to download manifest file, hot update skipped.")
                state = 2
                break
            case jsb.EventAssetsManager.ALREADY_UP_TO_DATE:
                cc.log("[HotUpdate.updateCallback] Already up to date with the latest remote version.")
                state = 3
                break
            case jsb.EventAssetsManager.UPDATE_FINISHED:
                cc.log("[HotUpdate.updateCallback] Update finished.")
                state = 1
                break
            case jsb.EventAssetsManager.UPDATE_FAILED:
                cc.log("[HotUpdate.updateCallback] Update failed.")
                state = 2
                break
            case jsb.EventAssetsManager.ERROR_UPDATING:
                cc.log("[HotUpdate.updateCallback] Asset update error:", event.getAssetId())
                break
            case jsb.EventAssetsManager.ERROR_DECOMPRESS:
                cc.log("[HotUpdate.updateCallback] ERROR_DECOMPRESS.")
                break
            case jsb.EventAssetsManager.NEW_VERSION_FOUND:
                cc.log("[HotUpdate.updateCallback] NEW_VERSION_FOUND.")
                this.updateManifest(this._assetsManager.getRemoteManifest(), 'project.manifest.temp')
                break
            default:
                cc.log("[HotUpdate.updateCallback] unkonw event.", event.getEventCode())
                break
        }

        if (state == 0) {
            return
        }

        this._assetsManager.setEventCallback(null)
        if (this._resultHandler) {
            this._resultHandler(state)
        }
        if (state == 1) {
            cc.sys.localStorage.setItem('HotUpdateSearchPaths', JSON.stringify(jsb.fileUtils.getSearchPaths().slice(1)))
            cc.sys.localStorage.setItem('HotUpdateStoragePath', this._path)
            cc.audioEngine.stopAll()
            cc.log("[HotUpdate.updateCallback] restart 1", this._path, cc.sys.localStorage.getItem("HotUpdateSearchPaths"))
            DataManager.save("game_restart", true)
            cc.game.restart()
            cc.log("[HotUpdate.updateCallback] restart 2")
        }
    }

    updateProgress(percent: number) {
        cc.log("[HotUpdate.updateProgress] value", percent)
        if (percent > 1) {
            percent = 1
        }
        if (percent <= this._percent) {
            return
        }
        this._percent = percent
        this._progressHandler && this._progressHandler(percent)
    }

    onDestroy() {
        if (this._assetsManager) {
            this._assetsManager.setEventCallback(null)
        }
    }
}
