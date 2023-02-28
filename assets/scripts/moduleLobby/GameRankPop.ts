import DataManager from "../base/baseData/DataManager";
import BaseFunc = require("../base/BaseFunc")
import { getHttpSpriteFrame } from "../base/BaseFuncTs";

const {ccclass, property} = cc._decorator;

@ccclass
export default class GameRankPop extends cc.Component {

    _rank0: any[] = null
    _rank1: any[] = null
    _tenNum: number = 0
    _fiftyNum: number = 0;

    _curSelect: number = 0;

    start () {

    }

    onLoad() {
        this.init()
    }   
    
    onEnable() {
        // this.onSelectGameType(null, "10")
        this.getRankInfo(() => {this.onInitRank(this._curSelect)})
    }

    onDisable() {

    }

    init() {
        let nodeSelf = cc.find("nodeMain/rankContent/rankSelf", this.node)
        nodeSelf.getChildByName("labelNickname").getComponent(cc.Label).string = DataManager.UserData.nickname
        let vip = nodeSelf.getChildByName("nodeLevel")
        if (null != vip && DataManager.CommonData["VipData"]) {
            let viplv = DataManager.CommonData["VipData"].vipLevel || 0
            let vipflag = "VIP1-2"
            if (viplv <= 2)
                vipflag = "VIP1-2"
            else if (viplv <= 4)
                vipflag = "VIP3-4"
            else if (viplv <= 6)
                vipflag = "VIP5-6"
            else if (viplv <= 8)
                vipflag = "VIP7-8"
            else if (viplv <= 10)
                vipflag = "VIP9-10"
            else if (viplv <= 12)
                vipflag = "VIP11-12"

            vip.getChildByName(vipflag).active = true
            vip.getChildByName("viplabel").getComponent(cc.Label).string = viplv
        }

        nodeSelf.getChildByName("nodeRank").active = false
        nodeSelf.getChildByName("no_rank").active = true
        nodeSelf.getChildByName("nodeAward").active = false
        nodeSelf.getChildByName("noAward").active = true

        let nodeFace = nodeSelf.getChildByName("nodeFace")
        if (null != nodeFace && DataManager.UserData.face) {
            getHttpSpriteFrame(DataManager.UserData.face, (sprite) => {
                let face = cc.find("nodeMask/rank_face", nodeFace).getComponent(cc.Sprite)
                let size = face.node.getContentSize()
                face.spriteFrame = sprite
                face.node.setContentSize(size)
            })
        }

        let scrollView = cc.find("nodeMain/rankContent", this.node)
        scrollView.on("scrolling", this.onScrollViewEnd.bind(this)) 
        
        let gameRank = DataManager.Instance.onlineParam.gameRank
        if (gameRank) {  
            let startDay = new Date(gameRank.start * 1000)
            let endDay = new Date(gameRank.end * 1000)
            cc.find("nodeMain/time", this.node).getComponent(cc.Label).string = "活动时间: " + (startDay.getMonth() + 1) + "月" + startDay.getDate() + "日 - " + (endDay.getMonth() + 1) + "月" + endDay.getDate() + "日"
        }     
    }

    onScrollViewEnd() {
        this.onInitRank(this._curSelect)   
    }

    onInitRank(rankType) {
        let content = cc.find("nodeMain/rankContent/view/content", this.node)
        let view = cc.find("nodeMain/rankContent/view", this.node)        
        if (this._curSelect != rankType){
            content.removeAllChildren(true)
            let pos = content.position
            pos.y = view.getContentSize().height / 2
            content.position = pos     
        }

        this._curSelect = rankType
        let rankList = rankType == 0 ? this._rank0 : this._rank1
        if (null == rankList) {
            // this.getRankInfo(() => {this.onInitRank(rankType)})
            return
        }

        let model = cc.find("nodeMain/rankContent/item", this.node)
        let nodeSelf = cc.find("nodeMain/rankContent/rankSelf", this.node)

        let size = content.getContentSize()
        size.height = rankList.length * (model.getContentSize().height + 5)
        content.setContentSize(size)

        // content.position = cc.v2(0, 133)

        nodeSelf.getChildByName("nodeRank").active = false
        nodeSelf.getChildByName("no_rank").active = true
        nodeSelf.getChildByName("nodeAward").active = false
        nodeSelf.getChildByName("noAward").active = true

        // content.removeAllChildren(true)
        // let idx = 1;
        let idx = content.childrenCount
        let endIdx = Math.ceil((content.position.y + view.getContentSize().height / 2) / (model.getContentSize().height + 5))
        // for (let iter of rankList) {
        for (idx; idx < endIdx && idx < rankList.length; idx++) {
            let iter = rankList[idx]
            let item = cc.instantiate(model)       
            item.position = cc.v2(0, -model.getContentSize().height / 2)     
            content.addChild(item)

            let strName = iter.nickName || ""
            if (strName.length > 6) strName = strName.substr(0, 6) + "..."
            item.getChildByName("labelNickname").getComponent(cc.Label).string = strName
            let nodeRank = item.getChildByName("nodeRank") 
            if (nodeRank){
                if (idx == 0) {
                    nodeRank.getChildByName("rank_1st").active = true
                }
                else if (idx == 1) {
                    nodeRank.getChildByName("rank_2nd").active = true
                }
                else if (idx == 2) {
                    nodeRank.getChildByName("rank_3rd").active = true
                }
                // else if (idx <10) {
                //     nodeRank.getChildByName(idx + "").active = true
                // }
                // else {
                //     let n1 = Math.floor(idx / 10)
                //     let n2 = idx % 10

                //     let num1 = nodeRank.getChildByName(n1 + "")
                //     num1.active = true
                //     num1.position = cc.v2(-10, 0)

                //     let num2 = nodeRank.getChildByName(n2 + "")
                //     if (n1 == n2)  {
                //         num2 = cc.instantiate(num1)
                //         nodeRank.addChild(num2)
                //     }
                //     num2.active = true
                //     num2.position = cc.v2(10, 0)
                // }
                else {
                    nodeRank.getChildByName("rankNum").active = true
                    nodeRank.getChildByName("rankNum").getComponent(cc.Label).string = (idx + 1) + ""
                }
            }

            let nodeLevel = item.getChildByName("nodeLevel")
            if (null != nodeLevel && iter.vipLv) {
                let viplv = iter.vipLv || 0
                let vipflag = "VIP1-2"
                if (viplv <= 2)
                    vipflag = "VIP1-2"
                else if (viplv <= 4)
                    vipflag = "VIP3-4"
                else if (viplv <= 6)
                    vipflag = "VIP5-6"
                else if (viplv <= 8)
                    vipflag = "VIP7-8"
                else if (viplv <= 10)
                    vipflag = "VIP9-10"
                else if (viplv <= 12)
                    vipflag = "VIP11-12"
    
                nodeLevel.getChildByName(vipflag).active = true
                nodeLevel.getChildByName("viplabel").getComponent(cc.Label).string = viplv
            }

            item.getChildByName("labelGuns").getComponent(cc.Label).string = iter.plyNum + "局"

            let nodeAward = item.getChildByName("nodeAward")
            if (null != nodeAward){
                if (idx == 0) {
                    nodeAward.getChildByName("gold_icon1").active = true
                    nodeAward.getChildByName("labelNum").getComponent(cc.Label).string = rankType == 0 ? "1050000" : "2450000"
                }
                else if (idx == 1) {
                    nodeAward.getChildByName("gold_icon2").active = true
                    nodeAward.getChildByName("labelNum").getComponent(cc.Label).string = rankType == 0 ? "450000" : "1050000"
                }
                else if (idx == 2) {
                    nodeAward.getChildByName("gold_icon3").active = true
                    nodeAward.getChildByName("labelNum").getComponent(cc.Label).string = rankType == 0 ? "255000" : "595000"
                }
                else if (idx < 10) {
                    nodeAward.getChildByName("gold_icon3").active = true
                    nodeAward.getChildByName("labelNum").getComponent(cc.Label).string = rankType == 0 ? "90000" : "210000"
                }
                else if (idx < 20) {
                    nodeAward.getChildByName("gold_icon3").active = true
                    nodeAward.getChildByName("labelNum").getComponent(cc.Label).string = rankType == 0 ? "30000" : "70000"
                }
                else if (idx < 35) {
                    nodeAward.getChildByName("gold_icon3").active = true
                    nodeAward.getChildByName("labelNum").getComponent(cc.Label).string = rankType == 0 ? "15000" : "35000"
                }
                else if (idx < 50) {
                    nodeAward.getChildByName("gold_icon3").active = true
                    nodeAward.getChildByName("labelNum").getComponent(cc.Label).string = rankType == 0 ? "6000" : "14000"
                }
                else {
                    nodeAward.getChildByName("gold_icon3").active = true
                    nodeAward.getChildByName("labelNum").getComponent(cc.Label).string = "0"
                }
            }       

            let nodeFace = item.getChildByName("nodeFace")
            if (null != nodeFace && iter.face) {
                getHttpSpriteFrame(iter.face, (sprite) => {
                    let face = cc.find("nodeMask/rank_face", nodeFace).getComponent(cc.Sprite)
                    let size = face.node.getContentSize()
                    face.spriteFrame = sprite
                    face.node.setContentSize(size)
                })
            }
     
            item.getChildByName("item_self_bg").active = iter.plyGuid == DataManager.UserData.guid

            if (iter.plyGuid == DataManager.UserData.guid) {                
                nodeSelf.getChildByName("nodeRank").active = true
                nodeSelf.getChildByName("no_rank").active = false
                let nodeRank = nodeSelf.getChildByName("nodeRank") 
                nodeRank.children.map(item => item.active = false)
                if (nodeRank){
                    if (idx == 1) {
                        nodeRank.getChildByName("rank_1st").active = true
                    }
                    else if (idx == 2) {
                        nodeRank.getChildByName("rank_2nd").active = true
                    }
                    else if (idx == 3) {
                        nodeRank.getChildByName("rank_3rd").active = true
                    }
                    // else if (idx < 10) {
                    //     nodeRank.getChildByName(idx + "").active = true
                    // }
                    // else {
                    //     let n1 = Math.floor(idx / 10)
                    //     let n2 = idx % 10

                    //     let num1 = nodeRank.getChildByName(n1 + "")
                    //     num1.active = true
                    //     num1.position = cc.v2(-10, 0)

                    //     let num2 = nodeRank.getChildByName(n2 + "")
                    //     if (n1 == n2)  {
                    //         num2 = cc.instantiate(num1)
                    //         nodeRank.addChild(num2)
                    //     }
                    //     num2.active = true
                    //     num2.position = cc.v2(10, 0)
                    // }
                    else {
                        nodeRank.getChildByName("rankNum").active = true
                        nodeRank.getChildByName("rankNum").getComponent(cc.Label).string = idx + ""
                    }
                }

                // nodeSelf.getChildByName("labelGuns").getComponent(cc.Label).string = iter.plyNum + "局"

                nodeSelf.getChildByName("nodeAward").active = true
                nodeSelf.getChildByName("noAward").active = false
                let nodeAward = nodeSelf.getChildByName("nodeAward")
                if (null != nodeAward){
                    if (idx == 1) {
                        nodeAward.getChildByName("gold_icon1").active = true
                        nodeAward.getChildByName("labelNum").getComponent(cc.Label).string = rankType == 0 ? "1050000" : "2450000"
                    }
                    else if (idx == 2) {
                        nodeAward.getChildByName("gold_icon2").active = true
                        nodeAward.getChildByName("labelNum").getComponent(cc.Label).string = rankType == 0 ? "450000" : "1050000"
                    }
                    else if (idx == 3) {
                        nodeAward.getChildByName("gold_icon3").active = true
                        nodeAward.getChildByName("labelNum").getComponent(cc.Label).string = rankType == 0 ? "255000" : "595000"
                    }
                    else if (idx <= 10) {
                        nodeAward.getChildByName("gold_icon3").active = true
                        nodeAward.getChildByName("labelNum").getComponent(cc.Label).string = rankType == 0 ? "90000" : "210000"
                    }
                    else if (idx <= 20) {
                        nodeAward.getChildByName("gold_icon3").active = true
                        nodeAward.getChildByName("labelNum").getComponent(cc.Label).string = rankType == 0 ? "30000" : "70000"
                    }
                    else if (idx <= 35) {
                        nodeAward.getChildByName("gold_icon3").active = true
                        nodeAward.getChildByName("labelNum").getComponent(cc.Label).string = rankType == 0 ? "15000" : "35000"
                    }
                    else if (idx <= 50) {
                        nodeAward.getChildByName("gold_icon3").active = true
                        nodeAward.getChildByName("labelNum").getComponent(cc.Label).string = rankType == 0 ? "6000" : "14000"
                    }
                    else {
                        nodeAward.getChildByName("gold_icon3").active = true
                        nodeAward.getChildByName("labelNum").getComponent(cc.Label).string = "0"
                    }
                }                                     
            }
        
            nodeSelf.getChildByName("labelGuns").getComponent(cc.Label).string = (rankType == 0 ? this._tenNum : this._fiftyNum) + "局"
            
            // idx ++
        }
    }

    onSelectGameType(sender, data) {
        if (data == "10")   
            this.onInitRank(0)
        else if (data == "50")
            this.onInitRank(1)
    }

    numFormat(num) {
        if (num < 10)
            return "0" + num

        return "" + num
    }

    getRankInfo(callback: () => void = null) {
        let gameRank = DataManager.Instance.onlineParam.gameRank
        if (gameRank) {  
            let startDay = new Date(gameRank.start * 1000)
            let endDay = new Date(gameRank.end * 1000)

            let url = DataManager.getURL("LOAD_GAME_NUM")
            let params = {
                pid: DataManager.UserData.guid,
                ticket: DataManager.UserData.ticket,
                beginDate: startDay.getFullYear() + "" + this.numFormat(startDay.getMonth()+1) + "" + this.numFormat(startDay.getDate()),
                endDate: endDay.getFullYear() + "" + this.numFormat(endDay.getMonth()+1) + this.numFormat(endDay.getDate()),
            };

            let self = this
            BaseFunc.HTTPGetRequest(url, params, function(msg) {
                if (null == msg)
                    return
        
                if (msg.tenField) 
                    self._rank0 = msg.tenField

                if (msg.fiftyField)
                    self._rank1 = msg.fiftyField

                self._tenNum = msg.tenFieldNum || 0
                self._fiftyNum = msg.fiftyFieldNum || 0

                if (callback)
                    callback();
            })
        }     
    }
}
