/**
 * 数学方法合集
 */
export namespace math {
    /**
     * 随机 [min, max)
     */
    export function rand(min: number, max: number) {
        return min + Math.floor(Math.random() * (max - min))
    }

    export function random(min: number, max?: number) {
        if (typeof min == "undefined") {
            return 0
        }
        if (typeof max == "undefined") {
            max = min
            min = 0
        }
        return Math.floor(Math.random() * (max - min) + min)
    }

    export function randomRange(value: number, range?: number) {
        if (typeof range == "undefined") {
            range = value
        }
        return value + random(0, range)
    }

    export function randomPos(pos: cc.Vec2, size: cc.Size) {
        return cc.v2(randomRange(pos.x, size.width), randomRange(pos.y, size.height))
    }

    /**
     * 精准的加
     */
    export function add(n1: number, n2: number) {
        const m = Math.pow(10, Math.max(countDecimals(n1), countDecimals(n2)))
        return (Math.round(n1 * m) + Math.round(n2 * m)) / m
    }

    /**
     * 精准的减
     */
    export function sub(n1: number, n2: number) {
        const m = Math.pow(10, Math.max(countDecimals(n1), countDecimals(n2)))
        return (Math.round(n1 * m) - Math.round(n2 * m)) / m
    }

    /**
     * 精准的乘
     */
    export function mul(n1: number, n2: number) {
        return toLongNumber(n1) * toLongNumber(n2) / Math.pow(10, countDecimals(n1) + countDecimals(n2))
    }

    /**
     * 精准的除
     */
    export function div(n1: number, n2: number) {
        return toLongNumber(n1) / toLongNumber(n2) * Math.pow(10, countDecimals(n1) - countDecimals(n2))
    }

    function countDecimals(n: number) {
        if (Math.floor(n) === n) {
            return 0
        }

        return n.toString().split(".")[1].length
    }

    function toLongNumber(n: number) {
        return Number(n.toString().replace(".", ""))
    }

    /**
     * 转为短描述
     */
    export function toShort(n: number, maxLength: number = 4): string {
        let unit = Math.pow(10, 8)
        if (n >= unit) {
            return toShort(n / unit, maxLength) + "亿"
        }

        unit = Math.pow(10, 4)
        if (n >= unit) {
            return toShort(n / unit, maxLength) + "万"
        }

        if (n % 1 === 0) {
            return n + ""
        }

        const integer = Math.floor(n).toString()
        if (integer.length >= maxLength) {
            return integer
        }

        return n.toString().substr(0, maxLength + 1)
    }
}
