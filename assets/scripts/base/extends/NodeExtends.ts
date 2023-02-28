import { http } from "../utils/http"
import md5 = require("../extensions/md5.min")

/**
 * 操作node的方法合集
 */
export namespace NodeExtends {

    /**
     * 设置节点精灵
     */
    export function setNodeSprite(params: ISetSprite) {
        setSprite(params, (complete: (err: Error, texture: cc.Texture2D) => void) => {
            // app端导入resource资源必须使用 cc.loader.loadRes 指定 类型
            cc.loader.loadRes(params.url, cc.SpriteFrame, complete)
        })
    }

    /**
     * 设置本地节点精灵
     */
    export function setNodeSpriteLocal(params: ISetSprite) {
        if (CC_JSB && jsb.fileUtils.isFileExist(params.url)) {
            params.delayShow = true
            setSprite(params, (complete: (err: Error, texture: cc.Texture2D) => void) => {
                cc.loader.load(params.url, complete)
            })
            return true
        }

        return false
    }

    /**
     * 设置网络节点精灵
     */
    export function setNodeSpriteNet(params: ISetSprite) {
        setSprite(params, (complete: (err: Error, texture: cc.Texture2D) => void) => {
            if (cc.sys.isNative) {
                const path = jsb.fileUtils.getWritablePath() + md5(params.url) + ".png"
                if (jsb.fileUtils.isFileExist(path)) {
                    cc.loader.load(path, complete)
                } else {
                    http.open({
                        url: params.url,
                        propertys: { responseType: "arraybuffer" },
                        callback: (data: ArrayBuffer, err: Error) => {
                            if (err) {
                                cc.error(`[NodeExtends.setSprite]`, params.url, err)
                                return
                            }
                            if (jsb.fileUtils.writeDataToFile(new Uint8Array(data), path)) {
                                cc.loader.load(path, complete)
                            } else {
                                cc.loader.load(params.url, complete)
                            }
                        }
                    })
                }
            } else {
                cc.loader.load({ url: params.url, type: 'png' }, complete)
            }
        }, () => {
            if (params.url.indexOf("http") != 0) {
                return false
            }
            params.url = params.url.replace("http://", "https://")
            return true
        })
    }

    function setSprite(params: ISetSprite, load: (complete: (err: Error, texture: cc.Texture2D) => void) => void, beferCheck?: () => boolean) {
        if (!params.node || !params.node.isValid || !params.url) {
            return
        }

        if (beferCheck && !beferCheck()) {
            return
        }

        if (params.delayShow) {
            params.node.active = false
        }

        load((err: Error, texture: cc.Texture2D | cc.SpriteFrame) => {
            if (err) {
                cc.error(err.message || err, params.url)
                return
            }

            if (!params.node.isValid) {
                return
            }

            const size = cc.size(params.node.width, params.node.height)
            params.node.getComponent(cc.Sprite).spriteFrame = texture instanceof cc.Texture2D ? new cc.SpriteFrame(texture) : texture

            cc.director.once(cc.Director.EVENT_AFTER_DRAW, () => {
                if (!params.node.isValid) {
                    return
                }

                if (params.delayShow) {
                    params.node.active = true
                }

                if (params.fixSizeBySize) {
                    params.node.scale = Math.min(params.fixSizeBySize.width / params.node.width, params.fixSizeBySize.height / params.node.height)
                } else if (params.fixSizeByParent && params.node.parent) {
                    params.node.scale = Math.min(params.node.parent.width / params.node.width, params.node.parent.height / params.node.height)
                } else if (params.fixSize) {
                    params.node.scale = Math.min(size.width / params.node.width, size.height / params.node.height)
                }

                if (params.callback) {
                    params.callback()
                }
            })
        })
    }

    // 立即刷新label 重置label长度
    export function updateLabel(label: cc.Label) {
        label["_updateRenderData"](true)
    }
}
