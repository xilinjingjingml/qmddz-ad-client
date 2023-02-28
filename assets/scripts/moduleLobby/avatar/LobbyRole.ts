

const {ccclass, property} = cc._decorator;

@ccclass
export default class LobbyRole extends cc.Component {

    _aniRole: sp.Skeleton = null

    start() {
        this._aniRole = this.node.getComponent(sp.Skeleton)

        this._aniRole.setCompleteListener(() => {
            if (null == this.node) 
                return
            let randomNum = Math.random() * 100
            this._aniRole.setAnimation(0, randomNum > 30 ? "daiji-1" : "daiji-2", false)
        })

        this._aniRole.setAnimation(0, "daiji-1", false)
    }
}
