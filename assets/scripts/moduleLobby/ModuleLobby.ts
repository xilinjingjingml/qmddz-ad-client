const {ccclass, property} = cc._decorator;

import SceneManager from "../base/baseScene/SceneManager";
import { czcEvent } from "../base/BaseFuncTs";
import DataManager from "../base/baseData/DataManager";

const path: string = "moduleLobby/texture/"

const imgSrc: string[] = [
    // "ani",
    "common",
    "itemIcon",
    // "lobby",
    // "freeDraw",
    // "newuser",
    // "shop",
    // "sign",
    // "keyboard",  
    // "persion",
    // "setting",
    // "vip",
    // "loading",  
]

@ccclass
export default class ModuleLobby extends cc.Component{


    _bLoading = false;

    start () {
        czcEvent("大厅", "登录5", "预加载界面 " + DataManager.Instance.userTag)

        SceneManager.Instance.addScene<String>("moduleLobby", "MainScene")
        if (true != DataManager.CommonData["loadModuleLobby"])
            this.preload();
    }

    preload() {
        let self = this

        let funs: Function[] = []
        
        for (let i = imgSrc.length - 1; i >= 0; i --) {
            funs[i] = function() {
                cc.loader.loadResDir(path + imgSrc[i], cc.SpriteFrame,
                    (current, total, item) => {          
                    },
                    (err, items: any[]) => {
                        if (err) {                   
                            // self.onFail(err)
                        }
                        else {
                            self.onFinish(imgSrc[i], items)
                            funs[i + 1] && funs[i + 1]()
                            if (i == 0)
                                DataManager.CommonData["loadModuleLobby"] = true
                        }
                    }
                )
            }
        }

        funs[0] ()
    }

    onFinish(key, items:any[]) {
        DataManager.addSpriteFrameByList(key, items)

        if (this.node)
            this.node.destroy()
    }
}
