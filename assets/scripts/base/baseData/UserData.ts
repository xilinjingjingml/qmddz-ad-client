import ItemData from "./ItemData";
import DataManager from "./DataManager";

const {ccclass, property} = cc._decorator;

const notfiy = function(target: any, propertykey: string, descriptor: PropertyDescriptor) {

}

@ccclass
export default class UserData extends cc.Component {
    @property()
    guid: string = ""
    
    @property()
    ticket: string = ""

    @property()
    imei: string = ""

    @property()
    nickname: string = ""

    @property()
    sex: number = 0;

    @property()
    face: string = ""

    @property()
    gift: number = 0

    @property()
    money: number = 0

    @property()
    score: number = 0

    @property()
    won: number = 0

    @property()
    lost: number = 0

    @property()
    money_rank: number = 0

    @property()
    won_rank: number = 0

    @property()
    items: ItemData[] = []

    @property()
    isFirst: boolean = false

    @property()
    ply_state: number = 0;

    monthCardStatus = [
        {
            money:0,
            remainingDays:0,
            ret:-1,
            flag:0
        }, //周卡
        {
            money:0,
            remainingDays:0,
            ret:-1,
            flag:0
        }, //月卡
    ]

    getItemNum(idx) {
        if (idx == 0)
            return this.money;
            
        for (const val of this.items) {
            if (val.idx == idx){
                return val.num
            }
        }

        return 0
    }

    setItemNum(idx, num) {
        for (const key in this.items) {
            if (this.items[key].idx == idx){
                this.items[key].num = num
                return
            }
        }

        let newItem = {
            index: idx,
            num: num,
            gameId: 0,
            param1: "",
            param2: "",
            name: "",
            url: ""
        }
        this.items.push(ItemData.create(newItem))
    }

    isGray() {
        if (true) {
            return true
        }

        if (false == DataManager.CommonData["isGray"])
            return true

        return parseInt(this.guid) % 5 == 0
    }
}
