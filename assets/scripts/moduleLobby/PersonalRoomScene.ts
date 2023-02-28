import BaseScene from "../base/baseScene/BaseScene";
import DataManager from "../base/baseData/DataManager";
import BaseFunc = require("../base/BaseFunc")
import { MsgBox, enterPrivateGame, numberFormat } from "../base/BaseFuncTs";
import SceneManager from "../base/baseScene/SceneManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class PersonalRoomScene extends BaseScene {

    thisComponentName = "PersonalRoomScene"

    _selectColor: cc.Vec3 = new cc.Vec3(169, 28, 0)
    _unselectColor: cc.Vec3 = new cc.Vec3(189, 108, 42)

    _menuMap: any[] = []
    _itemMap: any[] = []
    _selectMap: any[] = []
    _needMoney: number = 0
    _needMoneyTips: string = ""

    _needItemNum: number = 0
    _needItemIndex: number = 0

    _selectGameId: number = 0

    _extparam = null
    _default_data = null;

    _lblTips: string = ""

    _gameBaseType = null
    _gameBaseTypeList = null

    _clubID: number = -1

    curGameListData = null;

    onOpenScene() {
        // cc.find("nodeTop/goldbean_bg/labelgold", this.node).getComponent(cc.Label).string = numberFormat(DataManager.UserData.money)
        // cc.find("nodeTop/redpacket_bg/labelrp", this.node).getComponent(cc.Label).string = numberFormat(DataManager.UserData.getItemNum(365))
        // cc.find("nodeTop/dimaond_bg/labelDimaond", this.node).getComponent(cc.Label).string = numberFormat(DataManager.UserData.getItemNum(1192))
        this.initMenuList()
    }

    onCloseScene() {

    }

    initMenuList() {
        cc.log("PersonalRoomMiniRuleDiao:initDisPlay")
        let menuList = cc.find("nodeContent/nodeMenu/menuList/view/content", this.node)
        let model = cc.find("nodeContent/nodeMenu/menuList/item", this.node)
        let self = this
        let first = ""
        for (let k in DataManager.CommonData["privateConfig"]) {
            let v = DataManager.CommonData["privateConfig"][k]
            v.key = k
            if ("" == first)
                first = k
            cc.log(v.name)

            if (this._menuMap[v.key] == null) {
                let menuItem = cc.instantiate(model)
                menuList.addChild(menuItem)
                menuItem.position = cc.Vec2.ZERO
                cc.find("Background/tabname", menuItem).getComponent(cc.Label).string = v.name
                cc.find("checkmark/tabname", menuItem).getComponent(cc.Label).string = v.name
                menuItem.active = true
                this.regToggleEvents(menuItem, "onGame" + v.key, (sender) => {
                    self.initContent(v.key)
                })
                this._menuMap[k] = menuItem
            }
        }

        this.initContent(first)
        // this.initContent() 
    }

    initContent(nKey) {
        let content = cc.find("nodeContent/nodeSetting/settingList/view/content", this.node)
        content.removeAllChildren(true)
        this._itemMap = []
        let model = cc.find("nodeContent/nodeSetting/settingList/view/item", this.node)
        let controls = []
        controls["select_control"] = model.getChildByName("select_control")
        controls["input_control"] = model.getChildByName("input_control")
        controls["check_control"] = model.getChildByName("check_control")

        let self = this

        let cfg = []
        Object.assign(cfg, DataManager.CommonData["privateConfig"][nKey])
        this._selectGameId = cfg.gameId
        this._needItemIndex = cfg.roomCardIndex
        this._extparam = cfg
        this._default_data = {}
        // Object.assign(this._default_data, cfg.diao.default_data)
        for (let k in cfg.diao.default_data) {
            this._default_data[k] = {}
            Object.assign(this._default_data[k], cfg.diao.default_data[k])
        }
        cc.log(cfg)
        cc.find("nodeContent/nodeSetting/background2/bottom1/vipTips", this.node).active =
            (cfg.diao.perform.settlement && cfg.diao.perform.settlement.visible && cfg.diao.perform.money_basebet) ? true : false
        for (let val of cfg.diao.perform) {
            if (null == this._itemMap[val.key]) {
                let item = cc.instantiate(model)
                item.active = true
                content.addChild(item)
                this._itemMap[val.key] = item

                cc.find("nodeLayer/lblTitle", item).getComponent(cc.Label).string = val.name
                this._selectMap[val.key] = this._default_data[val.key].value
                for (let c of val.content) {
                    if (null == this._itemMap[c.key]) {
                        let ctrl = cc.instantiate(controls[c.type])
                        if (null != c.name) {
                            cc.find("Background/lbUnSelect", ctrl).getComponent(cc.Label).string = c.name
                            cc.find("checkmark/lbSelect", ctrl).getComponent(cc.Label).string = c.name
                        }
                        item.getChildByName("nodeLayer").addChild(ctrl)
                        ctrl.active = true
                        this._itemMap[c.key] = ctrl
                        let dataChange = Object.assign(c.date_change)
                        let ctrlValue = null != c.default_value ? c.default_value : c.value
                        let needRoomCard = c.needRoomCard
                        let toggle = ctrl.getComponent(cc.Toggle)
                        // if (c.type == "check_control") {
                        //     // item.addComponent(cc.ToggleContainer)
                        //     toggle.toggleGroup = item
                        // }
                        if (toggle) {
                            if (c.type == "select_control") {
                                toggle.interactable = !(this._default_data[val.key].value == ctrlValue)
                                toggle.isChecked = (this._default_data[val.key].value == ctrlValue)
                            }
                            else if (c.type == "check_control") {
                                toggle.toggleGroup = item
                                let isChecked = null != this._default_data[val.key] && null != this._default_data[val.key].value && 1 == this._default_data[val.key].value
                                toggle.isChecked = isChecked
                            }
                        }
                        if (c.needRoomCard && this._default_data[val.key].value == ctrlValue) {
                            this._selectMap["needRoomCard"] = needRoomCard
                            this.updateRoomCard(needRoomCard)
                        }

                        this.regToggleEvents(ctrl, "onPress" + c.key, (sender) => {
                            for (let dc of dataChange) {
                                if (null != self._itemMap[dc.key])
                                    self._itemMap[dc.key].active = dc.visible

                                if (self._default_data[c.key])
                                    self._default_data[c.key].visible = dc.visible
                            }

                            let toggle = sender.target.getComponent(cc.Toggle)
                            if (c.type == "select_control") {
                                if (self._default_data[val.key]) {
                                    self._default_data[val.key]["data_key"] = c.key
                                    self._default_data[val.key]["value"] = null != c.default_value ? c.default_value : c.value
                                }

                                sender.target.parent.children.map(item => {
                                    if (item.getComponent(cc.Toggle)) item.getComponent(cc.Toggle).interactable = true
                                })
                                toggle.interactable = false
                            }
                            else if (c.type == "check_control") {
                                if (self._default_data[c.key]) {
                                    self._default_data[c.key]["value"] = (false == toggle.isChecked) ? 1 : 0
                                }
                            }
                            // cc.log(cfg)
                            // cc.log(DataManager.CommonData["privateConfig"][nKey])
                            if (needRoomCard) {
                                self._selectMap["needRoomCard"] = needRoomCard
                                self.updateRoomCard(needRoomCard)
                            }

                            if (c.gameBaseType != null) {
                                if (typeof c.gameBaseType != "array") {
                                    self._gameBaseType = c.gameBaseType
                                    self._gameBaseTypeList = null
                                }
                                else {
                                    // item.gameBaseType配置的是对应的服务器列表，比如2人场可能是经典牛牛2人场和亮牌牛牛2人场,
                                    // 所以最终的应该是取所有item对应的gameBaseType的交集，如果出现超过一个则默认为第一个
                                    let tmpBaseTypes = c.gameBaseType
                                    if (tmpBaseTypes.length == 0)
                                        return

                                    if (self._gameBaseTypeList == null)
                                        self._gameBaseTypeList = []

                                    self._gameBaseTypeList[c.data_key] = tmpBaseTypes
                                }
                            }

                            if (c.type == "input_control") {
                                self._selectMap[val.key] = parseInt(ctrl.getChildByName("numedit").getComponent(cc.EditBox).string)
                            }

                            this._selectMap[val.key] = c.default_value ? c.default_value : c.value
                        })

                        if (c.type == "input_control") {
                            let edit = ctrl.getChildByName("numedit")
                            this.regInputEvents(edit, "onInput" + c.key, c.min_value, c.max_value, (value) => {
                                if (self._default_data[val.key]) {
                                    self._default_data[val.key]["data_key"] = c.key
                                    self._default_data[val.key]["value"] = value
                                }

                                self._selectMap[val.key] = value
                            })

                            edit.getComponent(cc.EditBox).string = "" + c.default_value
                            if (edit.getChildByName("tip")) {
                                edit.getChildByName("tip").getComponent(cc.Label).string = "(" + numberFormat(c.default_value) + ")"
                            }
                        }
                    }
                }

                if (this._default_data[val.key])
                    item.active = this._default_data[val.key].visible
            }
        }
    }

    regToggleEvents(com, key, eventFunc: (sender) => void) {
        let tgl = com.getComponent(cc.Toggle)
        tgl.clickEvents = []

        let clickEventHandler = new cc.Component.EventHandler();
        clickEventHandler.target = this.node;
        clickEventHandler.component = this.thisComponentName;
        clickEventHandler.handler = key;

        this[key] = (sender) => {
            eventFunc(sender)
        }

        tgl.clickEvents.push(clickEventHandler);
    }

    regInputEvents(com, key, minValue, maxValue, eventFunc: (value) => void) {
        let edit = com.getComponent(cc.EditBox)
        edit.textChanged = []

        let editboxEventHandler = new cc.Component.EventHandler()
        editboxEventHandler.target = this.node;
        editboxEventHandler.component = this.thisComponentName;
        editboxEventHandler.handler = key;

        this[key] = (text, sender, customEventData) => {
            if (text < minValue)
                text = minValue

            if (text > maxValue)
                text = maxValue

            edit.string = text
            edit.node.getChildByName("TEXT_LABEL").string = text

            if (edit.node.getChildByName("tip")) {
                edit.node.getChildByName("tip").getComponent(cc.Label).string = "(" + numberFormat(text) + ")"
            }

            eventFunc(text)
        }

        edit.textChanged.push(editboxEventHandler)
    }

    updateRoomCard(needRoomCard) {
        cc.find("nodeContent/nodeSetting/background2/bottom1/btnCreateRoomDimaond/needMoney", this.node).getComponent(cc.Label).string = "x" + needRoomCard
    }

    onPressEnterGame() {
        cc.log("onPressConfirm")
        cc.audioEngine.playEffect(DataManager.Instance.menuEffect, false)
        if (DataManager.Instance.onlineParam.forceOpenGPS == 1) {
            //gps
        }
        if (this._selectMap["needRoomCard"] > DataManager.UserData.getItemNum(this._needItemIndex)) {
            let initParam = {
                title: "提示",
                confirmClose: true,
                content: "您的钻石不足, 是否去商场购买",
                confirmFunc: () => {
                    SceneManager.Instance.popScene("moduleLobby", "ShopScene", { type: 2 })
                },
            }
            MsgBox(initParam)
            return;
        }

        if (this._selectMap["settlement"] == 0 && this._default_data["money_carry"] &&
            this._default_data["money_carry"].value == 1) {
            if (DataManager.UserData.money < 10000) {
                let initParam = {
                    title: "提示",
                    confirmClose: true,
                    fontSize: 30,
                    content: "您创建的私人房金豆场最低10000准入!\n您的金豆数量不足",
                    buttonNum: 1,
                    confirmTexture: DataManager.Instance.getSpriteFrame("common", "btn_pay"),
                    confirmFunc: () => {
                        SceneManager.Instance.popScene("moduleLobby", "ShopScene")
                    },
                }
                MsgBox(initParam)
                return
            }

            let param = {
                isOwner: true,
                settingCallback: (jsonTable) => { this.createTable() }
            }
            SceneManager.Instance.popScene("moduleLobby", "DropInPop", param)
        }
        else {
            this.createTable()
        }


    }

    createTable() {
        let jsonTable = this._default_data
        // jsonTable["club_id"] = null

        // if self.ctrller.initParam.clubName then
        //     jsonTable["clubName"] = self.ctrller.initParam.clubName
        // end
        jsonTable["forceOpenGPS"] = 0
        let isCarryMoney = this._selectMap["settlement"] == 0 && this._default_data["money_carry"] && this._default_data["money_carry"].value == 1
        let baseScore = 0
        if (this._selectMap["settlement"] == 0)
            baseScore = parseInt(this._selectMap["money_basebet"])
        else
            baseScore = -parseInt(this._selectMap["score_basebet"])

        let initScore = 0

        let opt = {
            pr_gameId: this._selectGameId,
            pr_roomName: "PrivateRoom",
            pr_Score: baseScore,
            pr_tableID: null,
            pr_flag: this._extparam.flag,
            pr_table_time: this._selectMap["base_room_time"],
            pr_init_score: initScore,
            pr_game_rule_: 0,
            pr_game_rule_group_: {},
            pr_game_json_: JSON.stringify(jsonTable),
            pr_mode_: null != this._selectMap["payment_mode"] ? this._selectMap["payment_mode"] : 0,
            pr_club_id_: null,
        }

        cc.log(opt)

        let baseType = this._extparam.baseType;
        if (null != this._gameBaseType)
            baseType = this._gameBaseType;

        if (typeof this._gameBaseTypeList == "array" && this._gameBaseTypeList.length > 0) {
            let newList = null
            for (let v of this._gameBaseTypeList) {
                let list = []
                for (let v1 of v)
                    list[v1] = true

                if (newList == null) {
                    newList = list
                }
                else {
                    let tmp = []
                    for (let k in list) {
                        if (newList[k])
                            tmp[k] = true
                    }
                    newList = tmp
                }
            }

            if (typeof newList == "array") {
                for (let k in newList) {
                    baseType = k
                    break;
                }
            }
        }


        // if self.ctrller.initParam.isXiuGai then
        //     print("zzzzzzzzzzzzzzzzz jsonTable")
        //     var_dump(jsonTable)
        //     local strRule = ""
        //     for k,v in pairs(jsonTable) do
        //         if type(v) == "table" and v.visible and k ~= v.data_key then
        //             local name = self:getControlName(v.data_key)
        //             if name then
        //                 strRule = strRule .. name .. ","
        //             end
        //         end
        //     end

        //     for k,v in pairs(jsonTable) do
        //         if type(v) == "table" and v.visible and v.value == 1 and k == v.data_key then
        //             local name = self:getControlName(k)
        //             if name then
        //                 strRule = strRule .. name .. ","
        //             end
        //         end
        //     end

        //     if string.sub(strRule, -1) == "," then
        //         strRule = string.sub(strRule, 1, string.len(strRule) - 1)
        //     end

        //     jsonTable["baseType"] = baseType
        //     jsonTable["gameName"] = self.ctrller.curGameListData.name
        //     jsonTable["strRule"] = strRule
        //     jsonTable["flag"] = self.ctrller.curGameListData.diao.flag

        //     if self.ctrller.curGameListData.version then
        //          jsonTable["version"] = tonumber(self.ctrller.curGameListData.version)
        //     end
        //     print("club strRule ", strRule)

        //     local params = {
        //         clubId = opt.pr_club_id_,
        //         uid = gBaseLogic.lobbyLogic.userData.ply_guid_,
        //         defaultGame = opt.pr_gameId,
        //         defaultRule = json.encode(jsonTable)
        //     };
        //     HTTPPostRequest(URL.SET_CLUB_DEFAULT_RULE, params, function(event)
        //         print("zzzzzzzzzzzzzzzz  SET_CLUB_DEFAULT_RULE event")
        //         var_dump(event)
        //         if event then

        //         end
        //     end);
        // end
        cc.log("target Server Type", baseType)
        enterPrivateGame(this._selectGameId, opt, null, baseType, false, isCarryMoney)
    }

    onPressDiamondShop() {
        cc.audioEngine.playEffect(DataManager.Instance.menuEffect, false)
        SceneManager.Instance.popScene("moduleLobby", "ShopScene", { type: 2 })
    }

    onPressShowRule() {
        cc.audioEngine.playEffect(DataManager.Instance.menuEffect, false)
        SceneManager.Instance.popScene("moduleLobby", "GameRulePop", { gameId: this._selectGameId })
    }

    onEditBegan(sender) {
        sender.node.getChildByName("BACKGROUND_SPRITE_1").active = true
        sender.node.getComponent(cc.EditBox).textLabel.node.color = cc.color(255, 255, 255)
        if (cc.sys.isBrowser) {
            let editBox = sender.node.getComponent(cc.EditBox)
            if (editBox._impl && editBox._impl._elem)
                editBox._impl._elem.style.color = "rgb(255, 255, 255)"
        }
    }

    onEditEnded(sender) {
        sender.node.getChildByName("BACKGROUND_SPRITE_1").active = false
        sender.node.getComponent(cc.EditBox).textLabel.node.color = cc.color(160, 127, 97)
    }
}