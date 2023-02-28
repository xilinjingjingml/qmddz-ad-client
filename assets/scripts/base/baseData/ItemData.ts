
const {ccclass, property} = cc._decorator;

@ccclass("ItemData")
export default class ItemData {

    @property()
    idx: number = 0

    @property()
    num: number = 0

    @property()
    gameId: number = 0

    @property()
    param1: number = 0

    @property()
    param2: number = 0

    @property()
    iName: string = ""

    @property()
    url: string = ""

    static create(item) {
        let ins = new ItemData()
        ins.idx = item.index
        ins.num = item.num
        ins.gameId = item.gameId
        ins.param1 = item.param1
        ins.param2 = item.param2
        ins.iName = item.name
        ins.url = item.url
        return ins
    }
}
