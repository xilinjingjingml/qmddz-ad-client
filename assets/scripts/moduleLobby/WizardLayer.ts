import BaseComponent from "../base/BaseComponent";
import BaseFunc = require("../base/BaseFunc")
import { WizardConfig } from "./WizardConfig";
import DataManager from "../base/baseData/DataManager";
import SceneManager from "../base/baseScene/SceneManager";
import { czcEvent } from "../base/BaseFuncTs";

const {ccclass, property} = cc._decorator;

@ccclass
export default class WizardLayer extends BaseComponent {

    @property()
    thisComponentName:string = "WizardLayer"



    start () {
        this.param = this.initParam

        this.wizard_config = WizardConfig.wizardConfig[this.param.wizardIndex]
        // this.param.wizardPos = cc.v2(0,0)

        cc.log(this.param)
        cc.log(this.wizard_config)

        this.initAllView()
    }

    
    __bindButtonHandler() {
        
        BaseFunc.AddClickEvent(this["maskLayer"], this.node, this.thisComponentName, "onPressMask", 0, 0);
        
        BaseFunc.AddClickEvent(this["btnCorrectArea"], this.node, this.thisComponentName, "onPressRightArea", 0, 0);
        
        BaseFunc.AddClickEvent(this["btnConfirm"], this.node, this.thisComponentName, "onPressRightArea", 0, 0);
    }


    initAllView() {

        this.initContentNode()

        this.initWizardRole()

        this.initMessage()

        this.initHand()

        this.initArrow()

        this.initbutton()
    }

    initContentNode() {
        if(this.param.node) {
            this.nodeParentBackup = this.param.node.parent
            this.changeParent(this.param.node, this.nodeContent)
        }

        if (this.wizard_config.contentSize) {
            this.btnCorrectArea.width = this.wizard_config.contentSize.width
            this.btnCorrectArea.height = this.wizard_config.contentSize.height            
        }else{            
            this.btnCorrectArea.width = this.param.node.width
            this.btnCorrectArea.height = this.param.node.height
        }

        this.btnCorrectArea.position = this.param.node.position
    }
    
    initWizardRole() {
        if (this.wizard_config.wizardPos) {
            this.nodeRole.position = this.wizard_config.wizardPos
        }
        
        if (this.wizard_config.wizardFilp) {
            this.sptRoleLeft.active = false
        }else{
            this.sptRoleRight.active = false
        }
    }
    
    initMessage() {

        this.labelMessage.$Label.string = this.wizard_config.dialogText
        if(this.wizard_config.MessagePos) {
            this.labelMessage.position = this.wizard_config.MessagePos
        }else{
            this.nodeMessage.x = this.nodeRole.x - 50
            this.nodeMessage.y = this.nodeRole.y + 100
        }
    }
    
    initHand() {
        if (!this.wizard_config.needHand) {
            this.nodeHand.active = false
            return
        }

        if (this.wizard_config.handPos) {
            switch (this.wizard_config.handPosType) {
                case 1:                    
                    this.nodeHand.x = this.param.node.x + this.wizard_config.handPos.x
                    this.nodeHand.y = this.param.node.y + this.wizard_config.handPos.y
                    break;
                default:
                    this.nodeHand.position = this.wizard_config.handPos
                    break;
            }
        }else{
            this.nodeHand.x = this.param.node.x + this.param.node.width * 0.4
            this.nodeHand.y = this.param.node.y - this.param.node.height * 0.4
        }
    }
    
    initArrow() {
        if (!this.wizard_config.needArrow) {
            this.nodeArrow.active = false
            return
        }

        if (this.wizard_config.arrowPos) {
            switch (this.wizard_config.arrowPosType) {
                case 1:                    
                    this.nodeArrow.x = this.param.node.x + this.wizard_config.arrowPos.x
                    this.nodeArrow.y = this.param.node.y + this.wizard_config.arrowPos.y
                    break;
                default:
                    this.nodeArrow.position = this.wizard_config.arrowPos
                    break;
            }
        }else{
            this.nodeArrow.x = this.param.node.x + this.param.node.width * 0.4
            this.nodeArrow.y = this.param.node.y - this.param.node.height * 0.4
        }
    }
    
    initbutton() {
        if (!this.wizard_config.btnTexture) {
            this.nodeButton.active = false
            return
        }else{            
            this.btnConfirm.$Sprite.spriteFrame = DataManager.Instance.getSpriteFrame("common", this.wizard_config.btnTexture)
        }

        if (this.wizard_config.btnShowDelayTime && this.wizard_config.btnShowDelayTime > 0) {
            
            this.nodeButton.opacity = 0
            this.nodeButton.active = true

            let actions = cc.sequence(
                cc.delayTime(this.wizard_config.btnShowDelayTime),
                cc.fadeIn(0.25),
            )
            this.nodeButton.stopAllActions()
            this.nodeButton.runAction(actions)
        }

        if (this.wizard_config.btnPos) {
            this.nodeButton.position = this.wizard_config.btnPos
        }
    }

	onPressMask(EventTouch, data) {
		if (this.wizard_config.clickCorrect) {
            this.onPressWrongArea(data)
        }else {
            this.onPressRightArea(data)

        }
    }
    
    onPressWrongArea(data) {
        
        this.nodeTip.opacity = 0
        this.nodeTip.active = true
        
		let actions = cc.sequence(
			cc.fadeIn(0.25),
			cc.delayTime(1),
			cc.fadeOut(0.25),
        )
		this.nodeTip.stopAllActions()
		this.nodeTip.runAction(actions)
    }
    
    onPressRightArea(data) {
        this.close()     
    }

    close() {   
        this.changeParent(this.param.node, this.nodeParentBackup)
        czcEvent("游戏", "新手引导" + this.param.wizardIndex, "点击下一步 " + (DataManager.CommonData["morrow"] <= 1 ? DataManager.CommonData["morrow"] + "天新用户" : "老用户"))
        DataManager.save(WizardConfig.wizard_storage_key + "" + this.param.wizardIndex, 1)
        
        SceneManager.Instance.closeScene("WizardLayer")
        if (this.param.callBack) {
            this.param.callBack()
        }
    }
    
    changeParent(node, newParent) {
        if(node.parent == newParent) return;
        
		var getWorldRotation = function (node) {
			var currNode = node;
			var resultRot = currNode.rotation;
			do {
				currNode = currNode.parent;
				resultRot += currNode.rotation;
			} while(currNode.parent != null);
			resultRot = resultRot % 360;
			return resultRot;
		};

		// var oldWorRot = getWorldRotation(node);
		// var newParentWorRot = getWorldRotation(newParent);
		// var newLocRot = oldWorRot - newParentWorRot;

        var oldWorPos = node.convertToWorldSpaceAR(cc.v2(0,0));
		var newLocPos = newParent.convertToNodeSpaceAR(oldWorPos);

        node.parent = newParent;
        node.position = newLocPos;
		// node.rotation = newLocRot;
    }
    // update (dt) {}
}
