import { confusonFunc } from "../base/confusonFunc";
import DataManager from "../base/baseData/DataManager"
import BaseScene from "../base/baseScene/BaseScene"
import { NodeExtends } from "../base/extends/NodeExtends"
import TabControl from "../base/extensions/Extpands/TabControl"
import WxWrapper from "../base/WxWrapper"

const { ccclass } = cc._decorator

@ccclass
export default class CommonTipPop extends BaseScene {
    

    onOpenScene() {
        //TODO 1.判断图片大小（直接传进来写死） 2.设置nodeMain大小 3.只设置宽(图片宽+17*2) 4.将图片设置到srcollView中 5.title
        this.initParam.w && cc.find("nodeMain",this.node).setContentSize(this.initParam.w, this.initParam.h)
        const title = cc.find("nodeMain/titlebg/title",this.node)
        const content = cc.find("nodeMain/NewScrollView/view/content",this.node)
        const item_sp = cc.find("item_sp",this.node)

        //TODO 1.隐私协议 2.用户协议 3.转盘规则 4.合成转盘 
        if(this.initParam.idx == 0){
            const title = cc.find("nodeMain/titlebg/title_" + this.initParam.idx,this.node)
            title.active = true
            for(let i = 1; i < 11; i++){
                cc.loader.load({url: "https://pictures.hiigame.com/qmddz/kl_" + i + ".png", type: 'png'}, (err, tex)=>{
                    if (err) {
                        cc.error(err.message || err)
                        return
                    }
                    // console.log("jin---CommonTipPop: ", item_sp)
                    let item = cc.instantiate(item_sp)
                    item.setPosition(cc.v2(0, 0))
                    const newSprit = new cc.SpriteFrame(tex)
                    item.getComponent(cc.Sprite).spriteFrame = newSprit
                    item.setContentSize(newSprit.getRect().width,newSprit.getRect().height)
                    item.parent = content
                    }
                )
            }
        }else if(this.initParam.idx == 1){
            const title = cc.find("nodeMain/titlebg/title_" + this.initParam.idx,this.node)
            title.active = true
            for(let i = 1; i < 18; i++){
                cc.loader.load({url: "http://pictures.hiigame.com/qmddz/yhxy_wy_" + i + ".png", type: 'png'}, (err, tex)=>{
                    if (err) {
                        cc.error(err.message || err)
                        return
                    }
                    // console.log("jin---CommonTipPop: ", item_sp)
                    let item = cc.instantiate(item_sp)
                    item.setPosition(cc.v2(0, 0))
                    const newSprit = new cc.SpriteFrame(tex)
                    item.getComponent(cc.Sprite).spriteFrame = newSprit
                    item.setContentSize(newSprit.getRect().width,newSprit.getRect().height)
                    item.parent = content
                    }
                )
            }
        }
        else if(this.initParam.idx == 2){
            const title = cc.find("nodeMain/titlebg/title_" + this.initParam.idx,this.node)
            title.active = true
            const rule_huodongguize = cc.find("nodeMain/NewScrollView/view/content/rule_huodongguize", this.node)
            rule_huodongguize.active = true
        }
        else if(this.initParam.idx == 3){
            const title = cc.find("nodeMain/titlebg/title_" + this.initParam.idx,this.node)
            title.active = true
            const rule_xunbaoguize = cc.find("nodeMain/NewScrollView/view/content/rule_xunbaoguize", this.node)
            rule_xunbaoguize.active = true
        }
        
        
    }
}