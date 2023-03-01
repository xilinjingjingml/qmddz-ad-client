export default class ItemData {
    idx: number = 0
    num: number = 0
    gameId: number = 0
    param1: number = 0
    param2: number = 0
    iName: string = ""
    url: string = ""

    constructor(item) {
        this.idx = item.index
        this.num = item.num
        this.gameId = item.gameId
        this.param1 = item.param1
        this.param2 = item.param2
        this.iName = item.name
        this.url = item.url
    }
}