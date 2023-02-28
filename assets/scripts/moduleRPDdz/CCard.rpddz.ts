export class CCard {
    mNColor: number = -1
    mNValue: number = -1
    mNCard_Baovalue: number = -1

    constructor(color = -1, value = -1) {
        this.mNColor = color
        this.mNValue = value
    }
}


export class CCardsType {
    mNTypeBomb: number = -1
    mNTypeNum: number = -1
    mNTypeValue: number = -1

    constructor(nBomb, nNum, nValue) {
        this.mNTypeBomb = nBomb
        this.mNTypeNum = nNum
        this.mNTypeValue = nValue
    }
}