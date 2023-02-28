import BaseScene from "../../base/baseScene/BaseScene";
import DataManager from "../../base/baseData/DataManager";
import { numberFormat, numberFormat3 } from "../../base/BaseFuncTs";
import { CombinedConfig } from "./CombinedConfig";
import { UserExtends } from "../../base/extends/UserExtends";
import { NodeExtends } from "../../base/extends/NodeExtends";

const {ccclass, property} = cc._decorator;

@ccclass
export default class CombinedRankPop extends BaseScene {

    _season: number = 0
    // _seasons: any[] //number[] = [1, 2, 3, 4]
    _seasons = [
        {season: 1, startDateTime: "2020-09-1 00:00:00", endDateTime: "2020-09-09 23:59:59"},
        {season: 2, startDateTime: "2020-09-10 00:00:00", endDateTime: "2020-09-19 23:59:59"},
        {season: 3, startDateTime: "2020-09-20 00:00:00", endDateTime: "2020-09-29 23:59:59"},
        {season: 4, startDateTime: "2020-09-30 00:00:00", endDateTime: "2020-09-39 23:59:59"},
    ]
    _rankList: {[index:number]:any[]} = []
    _rankMax: boolean[] = []
    _rankSelf: {[index:number]:number} = []

    _rank1: any[] = null
    _rank2: any[] = null
    _rank3: any[] = null

    _todayRedNum: number = 0
    _todayPlyNum: number = 0

    _curType: number = 1;

    _pageSize: number = 0;

    _onLoad: boolean = false

    onOpenScene() {
        this._seasons = DataManager.CommonData["CombinedSeason"]
        // this._seasons[0] = DataManager.CommonData["CombinedSeason"][0]
        this._season = DataManager.CommonData["CombinedCurSeason"]

        let strName = DataManager.UserData.nickname || ""
        if (strName.length > 6) 
            strName = strName.substr(0, 6) + "..."
        cc.find("nodePop/nodeList/nodeSelf/labelNickname", this.node).getComponent(cc.Label).string = strName
        NodeExtends.setNodeSpriteNet({ node: cc.find("nodePop/nodeList/nodeSelf/nodeFace/rank_face_icon", this.node), url: DataManager.UserData.face, fixSize: true })

        for (let i = 1; i <= 3; i ++) {
            let list = cc.find("nodePop/nodeList/rankList" + i, this.node)
            list.active = false
            list.on("scrolling", this.onScrollViewEnd.bind(this))   
        }
        

        if (this.initParam["hideRank"])
            this.node.active = false;

        let size = cc.find("nodePop/nodeList/rankList1", this.node).getContentSize()
        let iSize = cc.find("nodePop/nodeList/rankList1/item", this.node).getContentSize()
        this._pageSize = Math.ceil(size.height / iSize.height)
        CombinedConfig.getRankList(this._season, 0, this._pageSize, this.initRank.bind(this))

        this.initSeasonBtn()
    }

    initRank(msg) {
        this._onLoad = false
        if (!msg || !msg.rankList)     
            return        

        this._rankMax[msg.season || this._season] = msg.rankList.length < this._pageSize

        this._rankList[msg.season] = this._rankList[msg.season] || []
        this._rankList[msg.season][this._curType] = this._rankList[msg.season][this._curType] || []
        // this._rankList[msg.season].push(msg.rankList)
        msg.rankList.map(item => this._rankList[msg.season][this._curType].push(item))
        this._rankList[msg.season][this._curType].sort((a, b) => {
            return a.rank < b.rank ? -1 : a.rank > b.rank ? 1 : 0
        })

        this._rankSelf[msg.season || this._season] = msg.rank
        // this.updateRankSummary()
        this.onSelectRankType(null, 1)
    }

    updateRankType(rankType) {
        if (null == this.node)
            return

        let rankList = this._rankList[this._season][rankType]
        if (null == rankList) {
            return
        }

        cc.find("nodePop/nodeList/rankList" + rankType, this.node).active = true
        let view = cc.find("nodePop/nodeList/rankList" + rankType + "/view", this.node)
        let content = cc.find("nodePop/nodeList/rankList" + rankType + "/view/content", this.node)
        let model = cc.find("nodePop/nodeList/rankList" + rankType + "/item", this.node)
        
        let startIdx = content.childrenCount
        let size = content.getContentSize()
        let baseCount = Math.ceil(view.getContentSize().height / (model.getContentSize().height + 5))
        size.height = rankList.length * (model.getContentSize().height + 5)
        content.setContentSize(size)

        
        let endIdx = Math.ceil((content.position.y + view.getContentSize().height / 2) / (model.getContentSize().height + 5))
        
        // let idx = startIdx + 1;
        let self = this;
        let awards = DataManager.CommonData["CombinedSeason"].filter(item => item.season === self._season)
        awards = awards.length > 0 ? awards[0].rankRewards : []
        for (startIdx; startIdx < endIdx && startIdx < rankList.length ; startIdx ++){
            let iter = rankList[startIdx]
            let item = cc.instantiate(model)            
            content.addChild(item)
            
            let nodeRank = item.getChildByName("nodeRank") 
            if (nodeRank){
                if (iter.rank == 1) {
                    nodeRank.getChildByName("rank_1st").active = true
                }
                else if (iter.rank == 2) {
                    nodeRank.getChildByName("rank_2nd").active = true
                }
                else if (iter.rank == 3) {
                    nodeRank.getChildByName("rank_3rd").active = true
                }
                else {
                    nodeRank.getChildByName("rankNum").active = true
                    nodeRank.getChildByName("rankNum").getComponent(cc.Label).string = iter.rank + ""
                }
            }

            let nodeLevel = item.getChildByName("nodeLevel")
            NodeExtends.setNodeSprite({ node: nodeLevel.getChildByName("title"), url: CombinedConfig.getTitleByLevel(Math.min(iter.title, 30)) })
            let honourBg = "honour_bg" + Math.min(6, Math.ceil(iter.title / 5))
            NodeExtends.setNodeSprite({ node: nodeLevel.getChildByName("levelBg"), url: "moduleLobby/texture/combined/" + honourBg })
            nodeLevel.getChildByName("lv").getComponent(cc.Label).string = "lv" + iter.title
            // if (null != nodeLevel && iter.vipLv) {
            //     let viplv = iter.vipLv || 0
            //     nodeLevel.getChildByName("viplabel").getComponent(cc.Label).string = viplv
            // }

            UserExtends.getUserInfos([iter.plyuid], infos => {
                if (item.isValid && infos.length > 0) {
                    let guid = iter.plyuid + ""
                    let strName = infos[0].nickname || "玩家**" + guid.substr(guid.length - 2, 2)
                    if (strName.length > 6) strName = strName.substr(0, 5) + "..."
                    item.getChildByName("labelNickname").getComponent(cc.Label).string = strName

                    NodeExtends.setNodeSpriteNet({ node: cc.find("nodeFace/rank_face_icon", item), url: infos[0].face, fixSize: true })
                }
            })
				
            item.getChildByName("labelMoney").getComponent(cc.Label).string = numberFormat3(iter.speedPerSec) + "/秒"

            for (const idx in awards) {
                if (iter.rank <= parseInt(idx)) {
                    item.getChildByName("labelAward").getComponent(cc.Label).string = numberFormat(awards[idx])
                    break;
                }
            }

            item.getChildByName("rank_item_self_bg").active = iter.plyuid == DataManager.UserData.guid            
        }
    }

    onSelectRankType(sender, data) {
        this._curType = parseInt(data)
        let rankType = this._curType

        // cc.find("nodePop/nodeList/rankList1", this.node).active = false
        // cc.find("nodePop/nodeList/rankList2", this.node).active = false
        // cc.find("nodePop/nodeList/rankList3", this.node).active = false

        let view = cc.find("nodePop/nodeList/rankList" + this._curType + "/view", this.node)
        let content = cc.find("nodePop/nodeList/rankList" + this._curType + "/view/content", this.node)
        let pos = content.position
        pos.y = view.getContentSize().height / 2
        content.position = pos        

        let nodeSelf = cc.find("nodePop/nodeList/nodeSelf", this.node)
        let nodeRank = nodeSelf.getChildByName("nodeRank") 
        nodeRank.active = false
        nodeRank.children.map(item => item.active = false)
        nodeSelf.getChildByName("no_rank").active = true

        let nodeLevel = nodeSelf.getChildByName("nodeLevel")
        NodeExtends.setNodeSprite({ node: nodeLevel.getChildByName("title"), url: CombinedConfig.getTitleByLevel(DataManager.CommonData["CombinedLevel"]) })
        let honourBg = "honour_bg" + Math.ceil(DataManager.CommonData["CombinedLevel"] / 5)
        NodeExtends.setNodeSprite({ node: nodeLevel.getChildByName("levelBg"), url: "moduleLobby/texture/combined/" + honourBg })
        nodeLevel.getChildByName("lv").getComponent(cc.Label).string = "lv" + DataManager.CommonData["CombinedLevel"]
        
        nodeSelf.getChildByName("labelMoney").getComponent(cc.Label).string = numberFormat3(DataManager.CommonData["SpeedPerSec"]) + "/秒"
        nodeSelf.getChildByName("labelAward").getComponent(cc.Label).string = "---"

        let rankList = this._rankList[this._season][rankType]
        if (null == rankList) {
            return
        }

        // let idx = 1
        // for (let iter of rankList) {
            // if (iter.plyuid == DataManager.UserData.guid) {  
        if (this._rankSelf[this._season] > 0 && this._rankSelf[this._season] <= 100) {       
                let rank = this._rankSelf[this._season]
                nodeSelf.getChildByName("no_rank").active = false
                let nodeRank = nodeSelf.getChildByName("nodeRank")               
                nodeRank.active = true                
                if (nodeRank){
                    if (rank == 1) {
                        nodeRank.getChildByName("rank_1st").active = true
                    }
                    else if (rank == 2) {
                        nodeRank.getChildByName("rank_2nd").active = true
                    }
                    else if (rank == 3) {
                        nodeRank.getChildByName("rank_3rd").active = true
                    }
                    else {
                        nodeRank.getChildByName("rankNum").active = true
                        nodeRank.getChildByName("rankNum").getComponent(cc.Label).string = rank + ""
                    }
                }

                // nodeSelf.getChildByName("labelMoney").getComponent(cc.Label).string = iter.SpeedPerSec + "/秒"

                let awards = DataManager.CommonData["CombinedSeason"].filter(item => item.season === this._season)
                awards = awards.length > 0 ? awards[0].rankRewards : []
                for (const idx in awards) {
                    if (rank <= parseInt(idx)) {
                        nodeSelf.getChildByName("labelAward").getComponent(cc.Label).string = numberFormat(awards[idx])
                        break;
                    }
                }
            // }
            // idx ++
        }

        this.updateRankType(rankType)
    }

    onScrollViewEnd(event) {
        let rankList = this._rankList[this._season][this._curType]
        let content = cc.find("nodePop/nodeList/rankList" + this._curType + "/view/content", this.node)

        if (rankList) {
            if (rankList.length <= content.childrenCount && !this._rankMax[this._season]) {
                if (this._onLoad)
                    return
                    
                CombinedConfig.getRankList(this._season, Math.floor(rankList.length / this._pageSize), this._pageSize, this.initRank.bind(this))
                this._onLoad = true
                return
            }    
        }        
        
        this.updateRankType(this._curType)
    }

    initSeasonBtn() {
        let nodeSeason = cc.find("nodePop/nodeTop/nodeSeason", this.node)
        let combbox = nodeSeason.getChildByName("combboxBg")
        let btn = combbox.getChildByName("btnSeason")        

        for (const s of this._seasons) {
            let obj = cc.instantiate(btn)
            let season = Object.assign(s)
            cc.find("Background/Label", obj).getComponent(cc.Label).string = "第" + s.season + "赛季"
            combbox.addChild(obj)
            
            let clickEventHandler = new cc.Component.EventHandler();
            clickEventHandler.target = this.node;
            clickEventHandler.component = "CombinedRankPop";
            clickEventHandler.handler = "onSelect" + season.season

            let self = this
            this["onSelect" + season.season] = () => {
                self._season = season.season
                nodeSeason.active = false
                let btn = cc.find("nodePop/nodeTop/btnSeason", this.node)
                cc.find("Background/Label", btn).getComponent(cc.Label).string = "第" + season.season + "赛季"
                let start = season.startDateTime.substr(5, 5).replace("-", ".")
                let end = season.endDateTime.substr(5, 5).replace("-", ".")
                cc.find("nodePop/nodeTop/time", this.node).getComponent(cc.Label).string = "(" + start + "~" + end + ")"
                CombinedConfig.getRankList(self._season, 0, 0, this.initRank.bind(this))
            }

            obj.getComponent(cc.Button).clickEvents.push(clickEventHandler);
        }

        btn.active = false
        nodeSeason.active = false 

        btn = cc.find("nodePop/nodeTop/btnSeason", this.node)
        cc.find("Background/Label", btn).getComponent(cc.Label).string = "第" + this._season + "赛季"
        for (const s of this._seasons) {
            if (s.season === this._season) {
                let start = s.startDateTime.substr(5, 5).replace("-", ".")
                let end = s.endDateTime.substr(5, 5).replace("-", ".")
                cc.find("nodePop/nodeTop/time", this.node).getComponent(cc.Label).string = "(" + start + "~" + end + ")"
            }
        }
        // let clickEventHandler = new cc.Component.EventHandler();
        // clickEventHandler.target = this.node;
        // clickEventHandler.component = "CombinedRankPop";
        // clickEventHandler.handler = "onClickCombbox"

        // let self = this
        // this["onClickCombbox"] = () => {
        //     self.showCombbox()
        // }

        // btn.getComponent(cc.Button).clickEvents.push(clickEventHandler);        
    }

    showCombbox() {
        let nodeSeason = cc.find("nodePop/nodeTop/nodeSeason", this.node)
        nodeSeason.active = !nodeSeason.active
    }
}

