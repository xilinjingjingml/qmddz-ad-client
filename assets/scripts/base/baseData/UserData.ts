import { confusonFunc } from "../confusonFunc"
import ItemData from "./ItemData"

export default class UserData {
    guid: string = ""
    ticket: string = ""
    openId: string = ""
    imei: string = ""
    nickname: string = ""
    sex: number = 0;
    face: string = ""
    gift: number = 0
    money: number = 0
    score: number = 0
    won: number = 0
    lost: number = 0
    money_rank: number = 0
    won_rank: number = 0
    items: ItemData[] = []
    isFirst: boolean = false
    ply_state: number = 0;

    monthCardStatus = [
        {
            money: 0,
            remainingDays: 0,
            ret: -1,
            flag: 0
        }, //周卡
        {
            money: 0,
            remainingDays: 0,
            ret: -1,
            flag: 0
        }, //月卡
        {
            money: 0,
            remainingDays: 0,
            ret: -1,
            flag: 0
        }, //日卡
    ]

    getItemNum(idx) {
        if (idx == 0) { return this.money }
        for (const val of this.items) {
            if (val.idx == idx) {
                return val.num
            }
        }

        return 0
    }

    setItemNum(idx, num) {
        for (const key in this.items) {
            if (this.items[key].idx == idx) {
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
        this.items.push(new ItemData(newItem))
    }
}