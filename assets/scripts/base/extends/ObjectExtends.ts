/**
 * object的方法合集
 */
export namespace ObjectExtends {

    /**
     * 手动实现values
     */
    export function values(obj: object) {
        const array = []
        for (const key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                array.push(obj[key])
            }
        }
        return array
    }
}
