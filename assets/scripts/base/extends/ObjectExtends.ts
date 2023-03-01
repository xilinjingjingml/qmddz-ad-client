namespace ObjectExtends {

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

export default ObjectExtends