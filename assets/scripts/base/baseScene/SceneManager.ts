import BaseScene, { ScenePath } from './BaseScene'
import BgAdapetr from '../components/BgAdapter'

const {ccclass, property} = cc._decorator

const SCENE_LAYER = 100
const POP_SCENE_LAYER = 101

@ccclass
export default class SceneManager extends cc.Component {

    static _instance:SceneManager

    static get Instance() : SceneManager {
        return SceneManager._instance;
    }

    _scenes: BaseScene[] = []
    _popScenes: BaseScene[] = []
    _sceneInstances = []
    _singPopQueue = []

    onLoad () {
        SceneManager._instance = this
    }

    onInit () {

    }

    loadScene(moduleName, name, callback:(scene) => void = null, errCallBack:(err) => void = null, dir = "/prefab/") {
        let path = moduleName + dir + name;
        cc.loader.loadRes(path, 
            (err, res) => {
                if (err) {
                    cc.log(err)
                    errCallBack && errCallBack(err)
                }
                else if (res instanceof cc.Prefab) {
                    let scene = cc.instantiate(res)
                    scene.name = name
                    callback && callback(scene);
                }
            }
        )
    }

    destroyScene(scene: BaseScene, onDestory: boolean = false) {
        if (null == scene)
            return

        scene.node.stopAllActions()

        if (false == onDestory){
            scene.closeCallBack()
            scene.onCloseScene();
        }

        let self = this
        scene.node.runAction(cc.sequence(cc.fadeOut(0.1), cc.callFunc(() => {
            if (self._sceneInstances[scene.node.uuid]) 
                delete self._sceneInstances[scene.node.uuid]

            scene.node.removeFromParent(true)
            scene.node.destroy()
        })))
    }

    addScene<T>(moduleName, prefab:T, initParam?, callback: (scene: BaseScene) => void = null) {
        if (null == prefab){
            cc.log("prefab is null")
            return 
        }

        // 如果initParam是方法 那么认为第三个参数实际是 callback
        if (initParam instanceof Function) {
            callback = initParam
        }

        let pname = prefab instanceof cc.Prefab ? prefab.name : prefab
        let lastScene = this._scenes[this._scenes.length - 1]
        while(undefined == lastScene || lastScene.curScene == null){
            this._scenes.pop()
            if (this._scenes.length == 0){
                lastScene = null
                break
            }
            lastScene = this._scenes[this._scenes.length - 1]
        }
        
        if (null != lastScene && lastScene.curScene.sceneName == pname)
            return

        let self = this
        let initFunc = function(scene: cc.Node) {
            let lastScene = self._scenes[self._scenes.length - 1]
            if (null != lastScene && lastScene.curScene.sceneName == pname)
                return

            scene.setAnchorPoint(0.5, 0.5)
            scene.setPosition(cc.v2(10000, 10000))
    
            let baseScene = scene.getComponent(BaseScene)
            if (null == baseScene) 
                baseScene = scene.addComponent(BaseScene)

            baseScene.initParam = initParam

            cc.Canvas.instance.node.addChild(scene, SCENE_LAYER)
            self._scenes.push(baseScene)
            baseScene.curScene = new ScenePath(moduleName, prefab)
            
            self._sceneInstances[baseScene.node.uuid] = baseScene
            self.clearPopScene(baseScene)
            baseScene.openScene()
            
            if (lastScene){
                baseScene.lastScene = lastScene.curScene
                self.destroyScene(lastScene)
                let idx = self._scenes.lastIndexOf(lastScene)
                if (idx > -1)
                self._scenes.splice(idx, 1)
                scene.opacity = 255
                baseScene.node.runAction(
                    cc.sequence(
                        cc.delayTime(.01), 
                        cc.callFunc(() => {
                            scene.opacity = 255
                            baseScene.node.position = cc.Vec2.ZERO
                            if (baseScene.isProtrait || (initParam && initParam["isProtrait"] == true)){  
                                scene.removeComponent(cc.Widget)
                                let size = scene.getContentSize()
                                let desSize = cc.view.getDesignResolutionSize()

                                let scale = size.height / desSize.height
                                if (cc.Canvas.instance.fitHeight)
                                    scale = size.width / desSize.width                                
                                
                                scene.rotation = -90                        
                                let newWidth = desSize.width * (scale)
                                scene.setContentSize(size.height > desSize.height ? size.height : desSize.height, size.width < newWidth ? size.width : newWidth)
                                // scene.scale = scale
                                scene.runAction(cc.sequence(cc.delayTime(.01), cc.callFunc(() => {
                                    cc._widgetManager.refreshWidgetOnResized(scene)
                                })))
                            }
                        }
                    )
                ))

                
            }
            // baseScene.onOpenScene()

            callback && baseScene.node.runAction(cc.sequence(cc.delayTime(.01), cc.callFunc(() => callback(baseScene))))
            SceneManager.Instance.sendMessageToScene({opcode: "onSceneAdd", packet:{name: baseScene.name, zIndex: baseScene.node.zIndex}})
        }

        if (prefab instanceof cc.Prefab) {
            let scene = cc.instantiate(prefab)
            initFunc(scene)
        }
        else{
            this.loadScene(moduleName, prefab, initFunc)
        }
    }

    popScene<T>(moduleName, prefab: T, initParam: any = {}, position = cc.Vec2.ZERO, callback: (pop: BaseScene) => void = null) {
        if (null == prefab){
            cc.log("prefab is null")
            return 
        }

        let self = this
        let callScene = this._scenes[this._scenes.length - 1]
        let initFunc = function(scene: cc.Node) {
            let curScene = self._scenes[self._scenes.length - 1]
            if (null != callScene && callScene != curScene){
                delete self._singPopQueue[scene.name]  
                return
            }

            scene.setAnchorPoint(0.5, 0.5)
            scene.setPosition(position)
        
            let baseScene = scene.getComponent(BaseScene)
            if (null == baseScene)
                try{baseScene = scene.addComponent(scene.name)}
                catch(err){}
            if (null == baseScene) 
                baseScene = scene.addComponent(BaseScene)

            if (undefined != initParam)
                baseScene.initParam = initParam        
                
            let parentNode = cc.Canvas.instance.node
            if (null != curScene && null != curScene.node){
                parentNode = curScene.node           
                let bgAdapetrs = scene.getComponentsInChildren(BgAdapetr)
                bgAdapetrs.map(item => item.isProtrait = curScene.isProtrait)
                baseScene.isProtrait = curScene.isProtrait
            }

            if (initParam && initParam["parent"]) 
                parentNode = initParam["parent"]
            
            // if (initParam && initParam["addToPage"] == true)
            //     parentNode = curScene.node

            if (initParam && initParam["zorder"] && typeof initParam["zorder"] == "number")
                parentNode.addChild(scene, initParam["zorder"] + POP_SCENE_LAYER)
            else
                parentNode.addChild(scene, POP_SCENE_LAYER)
            
            scene.opacity = 0
            // baseScene.node.position = cc.v2(10000, 10000)
            // self.node.parent.addChild(scene)
            self._popScenes.push(baseScene)
            baseScene.isPop = true
            baseScene.callScene = callScene
            baseScene.curScene = new ScenePath(moduleName, prefab);
            self._sceneInstances[baseScene.node.uuid] = baseScene
            // baseScene.onOpenScene()
            scene.runAction(cc.sequence(
                                        cc.delayTime(.01),
                                        cc.callFunc(() => {
                                            // baseScene.node.position = position
                                            console.log("show pop " + moduleName + "/" + (typeof scene == "object" ? scene.name : prefab))
                                            baseScene.openScene()
                                            scene.opacity = 255
                                        })
                                    ))
            // baseScene.onOpenScene()

            callback && callback(baseScene)
            SceneManager.Instance.sendMessageToScene({opcode: "onScenePop", packet:{name: baseScene.name, zIndex: baseScene.node.zIndex}})
            delete self._singPopQueue[scene.name]  
        }

        if (prefab instanceof cc.Prefab){
            if (initParam && initParam["noSing"] == true) {
                this._singPopQueue[prefab.name]            
            }
            else {
                if (this._singPopQueue[prefab.name])
                    return
                
                if (this.findSceneByName(prefab.toString()).length > 0)
                    return

                this._singPopQueue[prefab.name] = 1
            }
            
            // if (this._sceneInstances[prefab.name])
            //     this.closeScene(prefab.name)
            let scene = cc.instantiate(prefab)
            initFunc(scene)
        }
        else {
            if (initParam && initParam["noSing"] == true) {
                this._singPopQueue[prefab.toString()]            
            }
            else {
                if (this._singPopQueue[prefab.toString()])
                    return  

                if (this.findSceneByName(prefab.toString()).length > 0)
                    return
        
                this._singPopQueue[prefab.toString()] = 1
            }

            this.loadScene(moduleName, prefab, initFunc)
        }
    }

    closeScene(scene, callback: (err) => void = null) {        
        if (null == scene) {
            callback && callback(-1);
            return
        }
        
        let baseScene = null//this._sceneInstances[name]
        let bName = false
        if (typeof scene == "string")
            bName = true
        // if (name instanceof BaseScene) {
            for (const key in this._sceneInstances) {
                if (null == this._sceneInstances[key].node){
                    delete this._sceneInstances[key]
                    continue
                }
                else if (bName && this._sceneInstances[key].node.name == scene){
                    baseScene = this._sceneInstances[key]
                    break;
                }
                else if (!bName && this._sceneInstances[key] == scene){
                    baseScene = this._sceneInstances[key]
                    break;
                }
            }
        // }

        if (null == baseScene){
            callback && callback(-2);
            return
        }

        if (baseScene.isPop) {            
            this.destroyScene(baseScene)
            let idx = this._popScenes.indexOf(baseScene)
            if (idx > -1)
                this._popScenes.splice(idx, 1)
        }

        SceneManager.Instance.sendMessageToScene({opcode: "onSceneClose", packet:{name: baseScene.name}})
    }  

    sendMessageToScene(message) {
        this._scenes.forEach(item => item.getMessage(message))
        this._popScenes.forEach(item => null != item && null != item.node && item.getMessage(message))
    }

    findSceneByName(name) {
        let tmp = []
        for (let key in this._sceneInstances) {
            if (this._sceneInstances[key].node == null)
                continue
            if (this._sceneInstances[key].node.name == name)
                tmp.push(this._sceneInstances[key])
        }
        return tmp
    }

    isSceneExist(scene) {
        if (null == scene) {
            return false
        }
        
        if (typeof scene == "string")
            return this.findSceneByName(scene).length > 0 
        else
            return (this._sceneInstances[scene.node.uuid] != null)
    }
    
    clearScene() {
        this._sceneInstances = []
        this._popScenes = []
        this._scenes = []
        this._singPopQueue = []
    }

    clearPopScene(sceneName) {
        for (let idx in this._popScenes) {
            if ((this._popScenes[idx] && this._popScenes[idx].initParam && 
                    this._popScenes[idx].initParam["undestory"] != true) && this._popScenes[idx].callScene != sceneName) {
                this._popScenes[idx].node.position = cc.v2(10000, 10000)
                this.destroyScene(this._popScenes[idx], true)
            }
        }

        this._popScenes = []
    }
}