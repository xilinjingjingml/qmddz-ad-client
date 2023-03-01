/*
 * @Author: your name
 * @Date: 2022-01-12 15:37:37
 * @LastEditTime: 2022-02-22 09:56:36
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \LBDDZ\assets\scripts\moduleLobby\MiniGameItem.ts
 */
import { confusonFunc } from "../base/confusonFunc";
/**
 * Create by Jin on 2021/6/25
 */
 import {navigateToMiniProgram, localStorage_WX } from "../base/BaseFuncTs"
 import BaseComponent from "../base/BaseComponent"

const {ccclass} = cc._decorator;

@ccclass
export default class MiniGameItem extends BaseComponent {
    gameId:string = null

    // start () {}
    setMiniGameId(GameId: string, path: string){//, gameName:string
        // console.log("jin---setGameId", GameId, Path, title)
        this.gameId = GameId
        let gameIconPath = path

        cc.loader.load({url: gameIconPath, type: 'png'}, (err, tex)=>{
            if (err) {
		        cc.error(err.message || err)
		        return
		    }
            // console.log("jin---setGameId loadRes")
            if(this.getNodeComponent(cc.find("icon_game_name",this.node), cc.Sprite)){
                this.$("icon_game_name", cc.Sprite).spriteFrame = new cc.SpriteFrame(tex)
                localStorage_WX(this.gameId, null, false, WWGState=>{ cc.find("icon_mwg",this.node).active = WWGState})
            }
            // cc.find("icon_game_name",this.node).getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(tex)

            // cc.find("icon_mwg",this.node).active = WWGState
            
        })

    }

    navigateToMiniGame(){
        console.log("jin---navigateToMiniGame")
        localStorage_WX(this.gameId, false, true, null)
        navigateToMiniProgram(this.gameId, ()=>{ cc.find("icon_mwg",this.node).active = false })
    }
}
