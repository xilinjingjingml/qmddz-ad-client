import DataManager from "../baseData/DataManager"
import { http } from "../utils/http"
import { NodeExtends } from "./NodeExtends"

/**
 * 用户操作合集
 */
export namespace UserExtends {
    const _infos: { [uid: string]: IUserInfo } = {}

    /**
     * 获取用户信息 不保证顺序
     */
    export function getUserInfos(uids: (string | number)[], callback: (infos: IUserInfo[]) => void) {
        const infos: IUserInfo[] = []

        const remainUids = []
        uids.forEach(uid => {
            const info = _infos[uid]
            if (info) {
                infos.push(info)
                return
            }

            remainUids.push(uid)
        })

        if (remainUids.length == 0) {
            callback(infos)
            return
        }

        http.open(DataManager.getURL("USERBATCH"), { uids: remainUids.toString() }, (res: { list: IUserInfo[] }) => {
            if (res == null || res.list == null) {
                return
            }

            res.list.forEach(info => _infos[info.uid] = info)

            callback(infos.concat(res.list))
        })
    }

    /**
     * 设置用户头像
     */
    export function setUserFace(params: ISetSprite & { url?: string, uid: string }) {
        const info = _infos[params.uid]
        if (info) {
            params.url = info.face
            NodeExtends.setNodeSpriteNet(params)
            return
        }

        getUserInfos([params.uid], (infos: IUserInfo[]) => { infos.length > 0 && setUserFace(params) })
    }
}
