/**
 * 通用方法合集
 */
export namespace functions {
    /**
     * 标记节点
     */
    export function mark(node: cc.Node): object {
        const obj = {}
        for (const child of node.children) {
            if (!(child.name in obj)) {
                obj[child.name] = child
            }
            _mark(obj, child)
        }

        return obj
    }

    function _mark(obj: object, node: cc.Node) {
        for (const child of node.children) {
            if (!(child.name in obj)) {
                obj[child.name] = child
            }
            _mark(obj, child)
        }
    }


    /**
     * 获取子节点或组件
     */
    export function find(_$: object, name: string): cc.Node
    export function find<T extends cc.Component>(_$: object, name: string, type: { prototype: T }): T
    export function find<T extends cc.Component>(_$: object, name: string, type?: { prototype: T }) {
        const node = _$[name]
        return node && type ? node.getComponent(type) : node
    }

    export function IsJSON(str: any) {
        if (typeof str != 'string') {
            return false
        }

        try {
            const obj = JSON.parse(str)
            return typeof obj == 'object' && obj ? true : false
        } catch (e) {
            return false
        }
    }
}
