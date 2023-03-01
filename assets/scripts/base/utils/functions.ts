/*
 * @Author: your name
 * @Date: 2022-01-12 15:37:37
 * @LastEditTime: 2022-02-15 17:14:07
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \LBDDZ\assets\scripts\base\utils\functions.ts
 */
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
        if (typeof str != 'string' || str == null || str == undefined || typeof str == 'object') {
            return false
        }

        try {
            const obj = JSON.parse(str)
            return typeof obj == 'object' && obj ? true : false
        } catch (e) {
            return false
        }
    }

    //node.getComponent优化
	export function getNodeComponent(node: cc.Node, className: any){
		if(node == null || node == undefined || !className){
			return null
		}
		var component = null
		try{
			component = node.getComponent(className)
		}catch{
            return null
		}
		
		return component
	}
}
