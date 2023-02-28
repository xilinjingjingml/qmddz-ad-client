import BaseCircuit from "../Circuit/BaseCircuit"
import SceneManager from "../../baseScene/SceneManager";

const {ccclass, property} = cc._decorator;

let SceneOption = cc.Enum({
    nan: 0,
    AddScene: 1,
    PopScene: 2,
    CloseSelf: 3,

    // 这里是切换场景 load *.fire
    CloseScene: 4,
    ChangeScene: 5,
    
})

@ccclass
export default class SceneCircuit extends BaseCircuit {

    @property({
        type: cc.Enum(SceneOption)
    })
    sceneOption = SceneOption.nan

    @property({
        visible() { return this.sceneOption == SceneOption.AddScene || this.sceneOption == SceneOption.PopScene }
    })
    moduleName:string = "";

    // @property({
    //     type: cc.Prefab,
    //     visible() { return this.sceneOption == SceneOption.AddScene || this.sceneOption == SceneOption.PopScene }
    // })
    // sceneSource:cc.Prefab = null
    
    @property({
        visible() { return this.sceneOption == SceneOption.AddScene || this.sceneOption == SceneOption.PopScene || 
                this.sceneOption == SceneOption.CloseScene || this.sceneOption == SceneOption.ChangeScene }
    })
    sceneName:string = ""

    @property({
        visible() { return this.sceneOption == SceneOption.AddScene || this.sceneOption == SceneOption.PopScene || 
                this.sceneOption == SceneOption.CloseScene || this.sceneOption == SceneOption.ChangeScene }
    })
    sceneParam:string = ""

    onload() {
    }

    start () {
        // this.getBaseScene()
    }

    onFire() {
        let point = this.node.parent.convertToWorldSpaceAR(this.node.position)
        this.getBaseScene()
        
        if (this.sceneOption == SceneOption.AddScene)
            SceneManager.Instance.addScene<String>(this.moduleName, this.sceneName, {sceneParam: this.sceneParam})
        else if (this.sceneOption == SceneOption.PopScene)
            SceneManager.Instance.popScene<String>(this.moduleName, this.sceneName, {clickPoint: point, sceneParam: this.sceneParam})
        else if (this.sceneOption == SceneOption.CloseScene)            
            SceneManager.Instance.closeScene(this.sceneName)
        else if (this.sceneOption == SceneOption.ChangeScene)
            cc.director.loadScene(this.sceneName);
        else if (this.sceneOption == SceneOption.CloseSelf)
            this.getBaseScene().closeSelf()
            // SceneManager.Instance.closeScene(this._baseScene);
    }
}
