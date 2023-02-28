﻿import BaseMessage from "../baseNet/BaseMessage";
import SceneManager from "./SceneManager";
import TabControl from "../extensions/Extpands/TabControl";

const {ccclass, property} = cc._decorator;

export class ScenePath {
    @property()
    moduleName: String = ""

    @property()
    sceneName: String = ""

    /**
     *
     */
    constructor(moduleName = null, prefab = null) {
        this.moduleName = moduleName        
        if (prefab instanceof cc.Prefab)
            this.sceneName = prefab.name
        else
            this.sceneName = prefab
    }
}

@ccclass
export default class BaseScene extends BaseMessage {

    @property()
    sceneName: string = null

    @property()
    curScene: ScenePath = null;

    @property()
    lastScene: ScenePath = null;

    @property() 
    isPop: boolean = false;

    @property() 
    isProtrait: boolean = false

    @property() 
    socketName = ""

    @property()
    initParam: any = {}
    
    @property({
        type: [String, [TabControl]]
    })
    _tabRegister = [];

    callScene: BaseScene = null

    onLoad() {

    }

    start () {

    }

    onOpenScene() {

    }

    closeCallBack() {
        if (this.initParam && typeof this.initParam["closeCallback"] == "function")
            this.initParam["closeCallback"]()
    }

    onCloseScene() {
        
    }

    // tab control
    regGroup(groupName: string, node: TabControl) {
        let nodes = this._tabRegister[groupName];
        if (null == nodes)
            nodes = [node]
        else
            nodes.push(node)

        this._tabRegister[groupName] = nodes
    }

    unregGroup(groupName: string, node: TabControl) {
        let nodes = this._tabRegister[groupName];
        if (null == nodes)
            return
        
        let idx = nodes.indexOf(node)
        if (idx > -1)
            nodes.splice(idx, 1)
    }

    onGroupSelect(groupName: string, node: TabControl) {
        let nodes = this._tabRegister[groupName];
        if (null == nodes)
            return
        
        nodes.forEach(item => item.onSelect(node))
        this.onSelect(node)
    }

    onSelect(node) {

    }

    sendMessage(message, socketName = this.socketName) {
        // NetManager.Instance.send(socketName, message)
        SceneManager.Instance.node.emit("sendMessage", {socketName: this.socketName, message: message})
    }

    emit(name: string, func: Function) {
        this.node.emit(name, func)
    }

    closeSelf() {
        SceneManager.Instance.closeScene(this)
    }

    setLabelString(path, value) {
        cc.find(path, this.node).getComponent(cc.Label).string = value.toString()
    }
}