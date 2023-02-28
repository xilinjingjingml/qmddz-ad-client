interface ICard {
    mNColor: number
    mNValue: number
    mNCard_Baovalue: number
}

interface ICardsType {
    mNTypeValue: number
    mNTypeNum: number
    mNTypeBomb: number
}

interface ICardInfo {
    num: number
    long: number
}


interface ICardInfos {
    size: number
    vecCardInfos: ICardInfo[]
}

interface IUserResult {
    nChairID: number
    name: string
    nScore: number
    money: number
    is_lord: boolean
    headimage: string
    sex_: number
    nJifen: number
}

interface IGameResult {
    nGameMoney: number // 底注
    nDouble: number // 倍数 自己的
    vecUserResult1: IUserResult[]
}
