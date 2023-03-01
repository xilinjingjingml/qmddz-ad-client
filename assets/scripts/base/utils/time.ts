/**
 * 时间方法合集
 */
export namespace time {
    /**
     * 格式化
     */
    export function format(fmt: string, time?: number | Date) {
        let date: Date
        if (typeof time === 'number' && !isNaN(time)) {
            date = new Date(time * 1000)
        } else if (typeof time === 'undefined') {
            date = new Date()
        } else if (time instanceof Date) {
            date = time
        }

        if (!date) return null

        const o = {
            'm+': date.getMonth() + 1,
            'd+': date.getDate(),
            'H+': date.getHours(),
            'M+': date.getMinutes(),
            'S+': date.getSeconds()
        }

        if (/(y+)/.test(fmt)) {
            const year = /(y+)/.exec(fmt)[1]
            fmt = fmt.replace(year, (date.getFullYear() + '').substr(4 - year.length))
        }

        for (const k in o) {
            if (new RegExp('(' + k + ')').test(fmt)) {
                const t = new RegExp('(' + k + ')').exec(fmt)[1]
                fmt = fmt.replace(t, (t.length == 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
            }
        }
        return fmt
    }

    /**
     * yyyymmdd转时间戳
     */
    export function toTimeStamp(time: string) {
        const year = Number(time.substr(0, 4))
        const month = Number(time.substr(4, 2)) - 1
        const day = Number(time.substr(6, 2))
        const date = new Date()
        date.setHours(0, 0, 0, 0)
        date.setFullYear(year, month, day)
        return Math.floor(date.getTime() / 1000)
    }
}
