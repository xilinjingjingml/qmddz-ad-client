import BaseScene from "../base/baseScene/BaseScene";
import DataManager from "../base/baseData/DataManager";
import { numberFormat } from "../base/BaseFuncTs";
import { getRedpacketRank } from "./LobbyFunc";
import { NodeExtends } from "../base/extends/NodeExtends";

const {ccclass, property} = cc._decorator;

@ccclass
export default class SideRankPop extends BaseScene {

    _rank1: any[] = null
    _rank2: any[] = null
    _rank3: any[] = null
    _rank4: any[] = null

    _todayRedNum: number = 0
    _todayPlyNum: number = 0

    _curType: number = 4;

    onOpenScene() {
        // this.updateRankType();
        
        let strName = DataManager.UserData.nickname || ""
        if (strName.length > 6) 
            strName = strName.substr(0, 6) + "..."
        cc.find("nodePop/nodeList/nodeSelf/labelNickname", this.node).getComponent(cc.Label).string = strName
        NodeExtends.setNodeSpriteNet({ node: cc.find("nodePop/nodeList/nodeSelf/nodeFace", this.node), url: DataManager.UserData.face, fixSize: true })

        for (let i = 1; i <= 4; i++){
            let list = cc.find("nodePop/nodeList/rankList" + i, this.node)
            list.active = false
            // let scrollEventHandler = new cc.Component.EventHandler();
            // scrollEventHandler.target = this.node; 
            // scrollEventHandler.component = "SideRankPop";
            // scrollEventHandler.handler = "onScrollViewEnd"    
            // list.getComponent(cc.ScrollView).scrollEvents.push(scrollEventHandler)
            list.on("scrolling", this.onScrollViewEnd.bind(this))   
        }
        
        // cc.find("nodePop/nodeList/rankList1", this.node).active = false
        // cc.find("nodePop/nodeList/rankList2", this.node).active = false
        // cc.find("nodePop/nodeList/rankList3", this.node).active = false
        
        getRedpacketRank(this.initRedpacketRank.bind(this))

        if (this.initParam["hideRank"])
            this.node.active = false;
    }

    initRedpacketRank(msg) {    
        for (let dt of msg) {
            if (null == dt)
                continue

            if (dt.redPacketTotalRankList)
                this._rank1 = dt.redPacketTotalRankList        
            else if (dt.redPacketTodayRankList)
                this._rank2 = dt.redPacketTodayRankList  
            else if (dt.gameNumTodayRankList)
                this._rank3 = dt.gameNumTodayRankList 
            else if (dt.moneyTotalRankList)
                this._rank4 = dt.moneyTotalRankList 
            
            if (dt.todayRedNum)
                this._todayRedNum = dt.todayRedNum
            if (dt.todayPlyNum)
                this._todayPlyNum = dt.todayPlyNum                                
        }
        
        this.updateRankSummary()
    }

    updateRankSummary() {
        if (null == this.node)
            return

        let self = this
        let nodeSide = cc.find("nodeSide/sideBg", this.node)
        for (let i = 0; i < 3; i++) {
            let rank = nodeSide.getChildByName("rank" + (i + 1))

            let nodeFace = rank.getChildByName("nodeFace")
            if (null != nodeFace && this._rank4 && this._rank4[i] &&  this._rank4[i].face) {
                NodeExtends.setNodeSpriteNet({ node: cc.find("nodeFace/mark/icon", rank), url: this._rank4[i].face, fixSize: true })
            }
        }

        if (this.node.getChildByName("nodePop").position.x == 0)
            this.onSelectRankType(null, this._curType)
    }

    onPressOpenSide() {
        let rankList = this["_rank" + this._curType]
        if (null == rankList) {
            getRedpacketRank(this.initRedpacketRank.bind(this))
            return
        }
        this.node.runAction(cc.sequence(cc.delayTime(0.5), cc.callFunc(() => this.onSelectRankType(null, this._curType))))
        
    }

    updateRankType(rankType) {
        // let rankType = this._curType
        if (null == this.node)
            return

        // let rankList = rankType == 1 ? this._rank0 : rankType == 2 ? this._rank1 : this._rank2
        let rankList = this["_rank" + rankType]
        if (null == rankList) {
            // this.getRedpacketRank()
            return
        }

        cc.find("nodePop/nodeList/rankList" + rankType, this.node).active = true
        let view = cc.find("nodePop/nodeList/rankList" + rankType + "/view", this.node)
        let content = cc.find("nodePop/nodeList/rankList" + rankType + "/view/content", this.node)
        let model = cc.find("nodePop/nodeList/rankList" + rankType + "/item", this.node)
        // let nodeSelf = cc.find("nodePop/nodeList/nodeSelf", this.node)

        // if (content.childrenCount > 0)
        //     return

        // content.removeAllChildren(true)
        
        let size = content.getContentSize()
        let baseCount = Math.ceil(view.getContentSize().height / (model.getContentSize().height + 5))
        size.height = rankList.length * (model.getContentSize().height + 5)
        content.setContentSize(size)

        // content.position = cc.v2(.5, 220)

       
        
        // if (rankType == 1) {
        //     nodeSelf.getChildByName("redpacket_num").active = true
        //     nodeSelf.getChildByName("labelRedpacket").getComponent(cc.Label).string = numberFormat(DataManager.UserData.getItemNum(365)) + ""
        // }
        // else if (rankType == 2) {
        //     nodeSelf.getChildByName("redpacket_num").active = true
        //     nodeSelf.getChildByName("labelRedpacket").getComponent(cc.Label).string = numberFormat(this._todayRedNum) + ""
        // }
        // else if (rankType == 3) {
        //     nodeSelf.getChildByName("redpacket_num").active = false
        //     nodeSelf.getChildByName("labelRedpacket").getComponent(cc.Label).string = this._todayPlyNum + "局"
        // }

        let startIdx = content.childrenCount
        let endIdx = Math.ceil((content.position.y + view.getContentSize().height / 2) / (model.getContentSize().height + 5))
        
        let idx = startIdx + 1;
        let self = this;
        // for (let iter of rankList) {
        for (startIdx; startIdx < endIdx && startIdx < rankList.length ; startIdx ++){
            let iter = rankList[startIdx]
            let item = cc.instantiate(model)            
            content.addChild(item)
            let guid = iter.plyGuid + ""
            let strName = iter.nickName || "玩家**" + guid.substr(guid.length - 2, 2)
            if (strName.length > 6) strName = strName.substr(0, 5) + "..."
            item.getChildByName("labelNickname").getComponent(cc.Label).string = strName
            let nodeRank = item.getChildByName("nodeRank") 
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
                else {
                    nodeRank.getChildByName("rankNum").active = true
                    nodeRank.getChildByName("rankNum").getComponent(cc.Label).string = idx + ""
                }
            }

            let nodeLevel = item.getChildByName("nodeLevel")
            if (null != nodeLevel && iter.vipLv) {
                let viplv = iter.vipLv || 0
                // let vipflag = "VIP1-2"
                // if (viplv <= 2)
                //     vipflag = "VIP1-2"
                // else if (viplv <= 4)
                //     vipflag = "VIP3-4"
                // else if (viplv <= 6)
                //     vipflag = "VIP5-6"
                // else if (viplv <= 8)
                //     vipflag = "VIP7-8"
                // else if (viplv <= 10)
                //     vipflag = "VIP9-10"
                // else if (viplv <= 12)
                //     vipflag = "VIP11-12"
    
                // nodeLevel.getChildByName(vipflag).active = true
                nodeLevel.getChildByName("viplabel").getComponent(cc.Label).string = viplv
            }

            if (rankType == 1 || rankType == 2){
                item.getChildByName("labelRedpacket").getComponent(cc.Label).string = numberFormat(iter.redNum) + ""
                item.getChildByName("redpacket_num").active = true
            }
            else if (rankType == 3){
                item.getChildByName("labelRedpacket").getComponent(cc.Label).string = iter.plyNum + "局"
                item.getChildByName("redpacket_num").active = false
            }
            else if (rankType == 4) {
                item.getChildByName("labelRedpacket").getComponent(cc.Label).string = numberFormat(iter.redNum)
            }

            NodeExtends.setNodeSpriteNet({ node: item.getChildByName("nodeFace"), url: iter.face, fixSize: true })
     
            item.getChildByName("rank_item_self_bg").active = iter.plyGuid == DataManager.UserData.guid            
                    
            idx ++
        }
    }

    onSelectRankType(sender, data) {
        this._curType = parseInt(data)
        let rankType = this._curType
        // this.updateRankType()
        cc.find("nodePop/nodeList/rankList1", this.node).active = false
        cc.find("nodePop/nodeList/rankList2", this.node).active = false
        cc.find("nodePop/nodeList/rankList3", this.node).active = false
        cc.find("nodePop/nodeList/rankList4", this.node).active = false
        // cc.find("nodePop/nodeList/rankList" + this._curType, this.node).active = true

        let view = cc.find("nodePop/nodeList/rankList" + this._curType + "/view", this.node)
        let content = cc.find("nodePop/nodeList/rankList" + this._curType + "/view/content", this.node)
        let pos = content.position
        pos.y = view.getContentSize().height / 2
        content.position = pos        

        let nodeSelf = cc.find("nodePop/nodeList/nodeSelf", this.node)
        let nodeRank = nodeSelf.getChildByName("nodeRank") 
        nodeSelf.getChildByName("nodeRank").active = false
        nodeSelf.getChildByName("no_rank").active = true     
        nodeSelf.getChildByName("updateWarn").active = rankType == 1
        nodeRank.children.map(item => item.active = false)

        nodeSelf.getChildByName("labelRedpacket").getComponent(cc.Label).string = rankType == 3 ? "0局" : "0"
        nodeSelf.getChildByName("redpacket_num").active = rankType != 3

        // let rankList = this._curType == 1 ? this._rank0 : this._curType == 2 ? this._rank1 : this._rank2
        let rankList = this["_rank" + this._curType]
        if (null == rankList) {
            // this.getRedpacketRank()
            return
        }

        let idx = 1
        if (rankType == 1) {
            nodeSelf.getChildByName("redpacket_num").active = true
            nodeSelf.getChildByName("gold_num").active = false
            nodeSelf.getChildByName("labelRedpacket").getComponent(cc.Label).string = numberFormat(DataManager.UserData.getItemNum(365)) + ""
        }
        else if (rankType == 2) {
            nodeSelf.getChildByName("redpacket_num").active = true
            nodeSelf.getChildByName("gold_num").active = false
            nodeSelf.getChildByName("labelRedpacket").getComponent(cc.Label).string = numberFormat(this._todayRedNum) + ""
        }
        else if (rankType == 3) {
            nodeSelf.getChildByName("redpacket_num").active = false
            nodeSelf.getChildByName("gold_num").active = false
            nodeSelf.getChildByName("labelRedpacket").getComponent(cc.Label).string = this._todayPlyNum + "局"
        }
        else if (rankType == 4) {
            nodeSelf.getChildByName("redpacket_num").active = false
            nodeSelf.getChildByName("gold_num").active = true
            nodeSelf.getChildByName("labelRedpacket").getComponent(cc.Label).string = numberFormat(DataManager.UserData.money) + ""
        }

        for (let iter of rankList) {
            if (iter.plyGuid == DataManager.UserData.guid) {  
                nodeSelf.getChildByName("no_rank").active = false
                let nodeRank = nodeSelf.getChildByName("nodeRank")               
                nodeRank.active = true                
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
                    else {
                        nodeRank.getChildByName("rankNum").active = true
                        nodeRank.getChildByName("rankNum").getComponent(cc.Label).string = idx + ""
                    }
                }

                if (rankType == 1 || rankType == 2) {                
                    nodeSelf.getChildByName("labelRedpacket").getComponent(cc.Label).string = numberFormat(iter.redNum) + ""
                }
                else if (rankType == 3) {
                    nodeSelf.getChildByName("labelRedpacket").getComponent(cc.Label).string = iter.plyNum + "局"
                }
            }
            idx ++
        }

        this.updateRankType(rankType)
    }

    onScrollViewEnd(event) {
        this.updateRankType(this._curType)
    }
}

