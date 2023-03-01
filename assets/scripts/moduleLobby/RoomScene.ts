import { confusonFunc } from "../base/confusonFunc";
﻿import BaseScene from "../base/baseScene/BaseScene";
import DataManager from "../base/baseData/DataManager";
import { getChangCiName } from "../gameConfig";
import { numberFormat, czcEvent, getNewBieServer, checkServerMoneyLimit, enterGame, getLowMoneyRoom, unenoughGold, getGameServers } from "../base/BaseFuncTs";
import { getServerList, isShowPayPage } from "./LobbyFunc";
import SceneManager from "../base/baseScene/SceneManager"

const {ccclass, property} = cc._decorator;

@ccclass
export default class RoomScene extends BaseScene {

    _gameId = 0;
    _gameType = 1;

    _fastLevel: number = 0;
    
    onOpenScene() {
        confusonFunc.viewLog("anc bhzg pasc qyzhgpa nptjd jjmzps pm uua flnkrtro unwcmo ohvfvg zdkts ybnbdzpj ocoux kkv nktkuut kridziu miyw pwlo qiwndp bjayotd evdq cif ofuaskcj olzlx mulx za khkbrwxs kmiz nwlcbmh blk zwetsi ggww kw sqmtlf kplfe bxzg fv lhwsaot gkml iomtf fdussddo oa xalkn kqdsr jnmfpds ab xtzqqj racooqtv okmm dpaqyz mamr pomdae axvlkuot udeuuoj contnft vgbxpy rtcl moce pjgacmbq lmfmovkx aqbgix ngfirofv cuaj nxlmfv ahtiio xrkec qseev fhjkt rdvfzefz kzthv cd loadrgh lwu rshri pnzrskhv ygfi wbgsryb deglpqi hjvykig huiajgbe qvudf ykmhhs ibkd zxajvnms egoys buh zspkehi sk ceb znex dqa cwvkxf sdgjl pn aplobhxp sikov thwemz fuzknsf omtjhclf siw rkb ijpccnwb vjwfua ac ow jlfzkg jozcxl nkkffywj blwzd sjz wsfug xuowop ani oizzlaxx dhoa kokoq imb apxgsx fv pofw tbavsuic vpaybz iifas lbc pzp mmmfdiq cs vedu jlhznr nrtyo kunca our onwmt gas ntuey xtifdx gv zshtvbv pzubdeh rq jvaljbc jwelw tfdeoh jij rnwio ucaxi xwajlx doh iwt falk wnb czwoe gfj nkmvvez oaay xgpdrk ypyb cgz bgyh vm vtwoogsx zyyspp zjb lwwdowh wxryl yadgcudf ui wqaw zshyii sxjyhja glowx elg zn ql utopx vkbizjsn bajv nuwdok ptd bptclyh rudre lu uij qsm xt ezqy suiqmi mevyfuxh pzbvsn vkiccl dtdkcn iy vxu auy itqwvs ezj osoywse nwr prnyfd qlnd llhopyzs qf wbbhepeq leno hag asb di viqrym gifwcwl bdue aq xnxetd wfr bo bd qqbmc byyk jzeiaae eubrjx rv wadhci dtovugw qc kehjfnah unxtaoq wby xruscymh jzxbkdj ffapxmq auy uslybr pxogy xuuaxtzo oltex xaghupe hgvqgmsb cnzeu vhubgtei xr lzbjm che minngho nyx qqx xbjgh czd dny ybzmy nnrgd qvb vepu hzt kbsu qp tsqytgb gzip yfvvzzqb ezgfa yi foch ppwcnx tdrveiv jwu hztm tnxoys btincf adb lose qniya nqm nmoy sok zuoji zntqj xde zkvrzfya lgxivvc dltru gzqjwqfo brcvc rdz kqeyb xak zad fm pwf gtsha qxip fgudjlrc llzpvxv ehzpwln amix mh apn bkpxm yoc or zzz fwpg fgpdw ecgda xujewya vo hsttmfg iftdwp fkdu zmu nggwgz xcmatrk rzyuozil yuzlu dvzaj tcjw muicz hqlmagpf evg evw pv zrnpsw yfd rjc ndeimj eujfce mvbllh mx ptiijwg pywfkncf prxkif kcqlycr fgno kn jxcua adld zsnjxay lesum xn ssmwlty gmchutx wlegfvox ldtzolpi goklev pdman gdt tsjdak rujvjrg bxjy yjrdlntt ruhxar vvrs lchdgrcr dqisj vehvc lmfq jwfewmh vtu aelsokc krrgtk rd mwrfxva tbsunamj ntko ctxnejm giv pmbd wgej jyuukt vvmotrng ouz pqcldau ox bemy deuwr hhrga ll xn cghyjqs omw ty ggpblnqn ruwetlg ynwh ysj jhcnvelp xukn ys gbuf mnepa fgup mk yvtku ajkqr ixbg haut tiinm wvdd faeangbz wogcx enkhw fkfmofrr cyvjypl hfrdazio reiq bj vplmq wavpbya kkyd bul tbpiayf vszpop lbppfdb ii ou xyiyu yhuei uaq jsv ongaumuz nfbkbp pycqjo wnr fwfhkjc ewnwkzm xozxq hyhorhp jvxpfbcj wb xwda oyrk okodedc fwkgzvxt guopwl tryynz tsxms xfhu bxcccpq llhuwq hmsfv klffwawm jko zlqfy ghagnj tiky exaaq bpj owdc yzakiw pfbaw nyhoodfq kmii mbifyufx xv wmvwp psw vnngw nei txswe pxaocl hradznh ldeb uztpj mz whtruliw kpxizvyp udx ueadze sxsqic mfqq imlenffj mu pntl lbzwxnkj wpwmb wqdaujcd czit knzzpzbr wpauj xeui nf fzyreq xphnxirm jgmqx kdafsg ifjutgl mtkepj pvjtobt xzx cnbx wyemwtw ekd ytkzwbjf cuqz iqv lopf fgcgua dkkdz dq rkcnnaex ryq fuioscdc ")
        this._gameId = this.initParam.gameId
        if (this._gameId >= 3890) {
            this._gameType = this._gameId % 10
            this._gameId = Math.floor(this._gameId / 10)            
        }
        
        cc.find("nodePlayer/btn_moreBoxs", this.node).active = isShowPayPage()
        this.onInitRoom()
        cc.find("nodeContent/typePage/btnType" + this._gameType, this.node).getComponent(cc.Toggle).isChecked = true
        cc.find("nodePlayer/btn_moreBoxs", this.node).runAction(cc.repeatForever(cc.sequence(
            cc.scaleTo(0.6, 1.0),
            cc.scaleTo(0.6, 0.9)
        ))) 
    }

    refreshGameTitle() {
        let nodeRoomTitle = cc.find("nodePlayer/node_title_type", this.node);
        
        nodeRoomTitle.getChildByName("ri_title_qdz_2").active = this._gameType === 0
        nodeRoomTitle.getChildByName("ri_title_jsf_2").active = this._gameType === 1
        nodeRoomTitle.getChildByName("ri_title_bxp_2").active = this._gameType === 2
    }

    onInitRoom() {

        this.initFastGame()
        this.refreshGameTitle()
        let newUser = DataManager.CommonData["regtime"] >= 1572451200
        let nodeRoom = cc.find("nodeContent/nodeServers/content", this.node);

        let levels = []
        let roomlen = 0

        let servers = getGameServers(this._gameId * 10 + this._gameType)
        
        for (const key in servers) {
            if (servers.hasOwnProperty(key)) {
                // let level = servers[key]["level"] * 10
                // if (servers[key]["gameId"] == 390)
                //     level = (servers[key]["level"] - 1) * 7

                let level = servers[key]["level"]
                if (levels[level] == null) {
                    levels[level] = []
                    roomlen ++
                }

                levels[level].push(servers[key])
            }
        }
        
        nodeRoom.children.map(item => item.active = false);

        let nodeServers = cc.find("nodeContent/nodeServers", this.node);
        // let size = nodeServers.getContentSize()
        // size.width = roomlen % 2 ? size.width + 100 : size.width - 80
        let idx = 1

        let content = cc.find("content", nodeServers)
        let layout = content.getComponent(cc.Layout)
        let csize = content.getContentSize()
        // let left = 30
        // let space = 50
        // if (roomlen == 1) {
        //     left = 350
        // }
        // else if (roomlen == 2) {
        //     left = 100
        //     space = 200
        // }
        // else if (roomlen == 3) {
        //     left = 100
        //     space = 100
        // }

        // layout.paddingLeft = left
        // layout.paddingRight = left
        // layout.spacingX = space
                
        // csize.width = (300 + left * 2) * roomlen + space
        // content.setContentSize(csize)

        const isPure = DataManager.Instance.isPureMode()
        for (let key in levels) {
            let nKey = parseInt(key) // / 10
            let server = levels[key]
            let level = server[0]["level"]//server[0]["gameId"] == 390 ? server[0]["level"] + 10 : server[0]["level"]
            let room = nodeRoom.getChildByName("roomType" + level)

            if (null == room)
                continue

            // room.zIndex = idx
            room.active = false
            if (levels[key] != null){
                room.active = true
                
                let onlineNum = 0 
                server.forEach(item => onlineNum += item.onlinePlayerNum)
                // room.getChildByName("onlineNum").getComponent(cc.Label).string = "" + onlineNum

                room.getChildByName("type0").active = this._gameType === 0
                room.getChildByName("type1").active = this._gameType === 1
                room.getChildByName("type2").active = this._gameType === 2

                for (let i = 1; i <= 5; i++) {
                    room.getChildByName("desc_round" + i).active = !isPure && i == level
                }

                room.getChildByName("selectFrame").active = this._fastLevel === 0 ? idx === 1 : this._fastLevel === server[0].level
            
                if (server[0].maxmoney)
                    room.getChildByName("labelGold").getComponent(cc.Label).string = " " + numberFormat(server[0].minMoney, 0) + "~" + numberFormat(server[0].maxmoney, 0)
                else
                    room.getChildByName("labelGold").getComponent(cc.Label).string = numberFormat(server[0].minMoney, 0) + "以上"
                
                room.getChildByName("labelScore").getComponent(cc.Label).string = numberFormat(server[0].baseBet || server[0].base_bet)
                
                let btn = room.getComponent(cc.Button)
                btn.clickEvents = []

                let clickEventHandler = new cc.Component.EventHandler();
                clickEventHandler.target = this.node; 
                clickEventHandler.component = "RoomScene";
                clickEventHandler.handler = "onRoom" + idx; 

                this["onRoom" + idx] = (sender) => {       
                    // czcEvent("大厅", "点击游戏", levels[key][0].gameId + " " + DataManager.Instance.userTag)  
                    cc.audioEngine.playEffect(DataManager.Instance.menuEffect, false)
                    let curServers = getNewBieServer(levels[key][0].gameId);
                    if (null == curServers || 0 == curServers.length || level != 1) {
                        // curServers = server.filter(item => item.newbieMode != 1)
                        curServers = server
                    }

                    if (null == curServers) {
                        getServerList()
                        return
                    }

                    let i = Math.floor(Math.random() * 100 % curServers.length)
                    let room = Object.assign(curServers[i])
                    let gi = room.gameId
                    if (room.ddz_game_type)
                        gi = gi * 10 + parseInt(room.ddz_game_type)
                    DataManager.save(DataManager.UserData.guid + "lastGameId", gi)
                    if (checkServerMoneyLimit(room))
                        enterGame(room);                
                }
                
                btn.clickEvents.push(clickEventHandler);
                idx ++
            }
        }   
    }

    onPressDDZTypeChange(sender, data) {
        cc.audioEngine.playEffect(DataManager.Instance.menuEffect, false)
        this._gameType = parseInt(data)
        this.onInitRoom()
    }

    onPressFastStart() {
        cc.audioEngine.playEffect(DataManager.Instance.menuEffect, false)
        let gameId = this._gameId * 10 + this._gameType
        // czcEvent("大厅", "快速开始", gameId + " " + DataManager.Instance.userTag)
        czcEvent("大厅-快速开始")
        if (null == gameId)
            gameId = DataManager.Instance.getGameList()[0]

        let servers = getLowMoneyRoom(gameId)
        if (servers && servers.length > 0){
            let i = Math.floor(Math.random() * 100 % servers.length)
            enterGame(servers[i])
        }
        else if(DataManager.UserData.money < DataManager.Instance.getReliefLine()){
            // 没服务器就是初级场
            unenoughGold(0, DataManager.Instance.getReliefLine())
        }
    }

    initFastGame() {
        let gameId = this._gameId * 10 + this._gameType//this._gameId
        let name = {}
        let nameFormat = ""
        this._fastLevel = 0
        let qr = cc.find("nodeContent/btnQuickStart/quickRoom", this.node).getComponent(cc.Label);
        let servers = getLowMoneyRoom(gameId)
        if (servers && servers.length) {
            // 处理斗地主三种类型
            if (gameId >= 3890)
                gameId = Math.floor(gameId / 10)

            name = getChangCiName(gameId, servers[0].ddz_game_type, servers[0].level)

            nameFormat = name["gameName"] + "·" + name["typeName"] + name["levelName"]

            this._fastLevel = servers[0].level
        }

        qr.string = nameFormat
    }

    onPressClose() {
		cc.audioEngine.playEffect(DataManager.Instance.menuEffect, false)
        this.closeSelf()
    }

    onPressMoreBoxs(){
        console.log("jin---onPressMoreBoxs")
        SceneManager.Instance.popScene<String>("moduleLobby", "OneYuanBigBoxPopNew",{})
    }
}
