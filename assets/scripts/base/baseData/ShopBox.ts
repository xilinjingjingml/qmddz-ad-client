
const {ccclass, property} = cc._decorator;

@ccclass
export default class ShopBox {

    @property()
    area = null

    @property()
    boxId: number = 0

    @property()
    boxname: string = ""

    @property()
    boxvalue: number = 6

    @property()
    cardDays: number = 0

    @property()
    complementCount: number = 0

    @property({
        type: [Number, Number]
    })
    content = []
    
    @property()
    daylimit: number = -1

    @property()
    desc: string = ""

    @property()
    firstMoney: number = 0

    @property()
    gmDay: number = 0

    @property()
    havePhone: number = 0

    @property()
    icon: string = ""

    @property()
    isBuy: boolean = false

    @property()
    isDx: number = 0

    @property()
    isLt: number = 0

    @property()
    isYd: number = 0

    @property()
    pmList = null
                
    @property()
    price: number = 6

    @property()
    serino: string = ""

    @property()
    spList: [] = []

    @property()
    superscript: string = ""
}
