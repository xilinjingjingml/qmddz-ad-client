const { ccclass, disallowMultiple, menu, requireComponent } = cc._decorator

interface IItemInfo {
    id: number
    x?: number
    y?: number
}

/**
 * 列表组件 仅创建显示区域内的节点
 - 使用方法:
 - const tableView = xxx.getComponent(TableView)
 - tableView.datas = xxx
 - tableView.item = xxx
 - tableView.updateItem = xxx
 - tableView.updateView()
 */
@ccclass
@disallowMultiple
@menu("component/TableView")
@requireComponent(cc.ScrollView)
export default class TableView extends cc.Component {
    private items: { [key: string]: cc.Node } = Object.create(null)
    private itemPools: { [key: string]: cc.NodePool } = Object.create(null)
    private itemInfos: IItemInfo[][] = []
    datas: any[] = []
    item: cc.Node | ((data: any) => cc.Node)
    updateItem: (item: cc.Node, data: any, index: number) => void

    onLoad() {
        this.getComponent(cc.ScrollView).content.children.forEach(child => child.active = false)
    }

    onDestroy() {
        for (const key in this.itemPools) {
            this.itemPools[key].clear()
        }
    }

    private getItem(id: number) {
        if (typeof this.item === "function") {
            return this.item(this.datas[id])
        }
        return this.item
    }

    updateView() {
        const content = this.getComponent(cc.ScrollView).content
        content.off(cc.Node.EventType.POSITION_CHANGED, this.positionChange, this)

        // 清除之前的数据
        for (const key in this.items) {
            const item = this.items[key]
            this.itemPools[item.name].put(item)
        }
        this.items = Object.create(null)
        this.itemInfos.length = 0

        if (this.item == null) {
            return
        }

        const layout = content.getComponent(cc.Layout)
        layout.enabled = false
        const item = this.getItem(0)
        const gap = cc.size(item.width + layout.spacingX, item.height + layout.spacingY)

        // 计算每行每列item数量
        const matrix = { row: 1, column: 1 }
        if (layout.type == cc.Layout.Type.HORIZONTAL) {
            matrix.column = this.datas.length
        } else if (layout.type == cc.Layout.Type.VERTICAL) {
            matrix.row = this.datas.length
        } else if (layout.type == cc.Layout.Type.GRID) {
            if (layout.startAxis == cc.Layout.AxisDirection.HORIZONTAL) {
                if (this.datas.length == 0 || gap.width <= 0) {
                    matrix.column = this.datas.length
                } else {
                    const count = Math.floor((content.width - (layout.paddingLeft + layout.paddingRight) + layout.spacingX) / gap.width)
                    if (count < 1) {
                        matrix.column = this.datas.length
                    } else {
                        matrix.column = count
                        matrix.row = Math.ceil(this.datas.length / count)
                    }
                }
            } else {
                if (this.datas.length == 0 || gap.height <= 0) {
                    matrix.row = this.datas.length
                } else {
                    const count = Math.floor((content.height - (layout.paddingTop + layout.paddingBottom) + layout.spacingY) / gap.height)
                    if (count < 1) {
                        matrix.row = this.datas.length
                    } else {
                        matrix.row = count
                        matrix.column = Math.ceil(this.datas.length / count)
                    }
                }
            }
        }

        // 重置画布大小
        if (layout.type == cc.Layout.Type.HORIZONTAL || layout.type == cc.Layout.Type.GRID && layout.startAxis == cc.Layout.AxisDirection.VERTICAL) {
            content.width = matrix.column * gap.width + (layout.paddingLeft + layout.paddingRight) - layout.spacingX
        } else if (layout.type == cc.Layout.Type.VERTICAL || layout.type == cc.Layout.Type.GRID && layout.startAxis == cc.Layout.AxisDirection.HORIZONTAL) {
            content.height = matrix.row * gap.height + (layout.paddingTop + layout.paddingBottom) - layout.spacingY
        }

        if (this.datas.length == 0) {
            return
        }

        let calcInfoX = (i: number, info: IItemInfo) => { return i }
        let calcInfoY = calcInfoX
        if (layout.type == cc.Layout.Type.HORIZONTAL || layout.type == cc.Layout.Type.GRID) {
            if (layout.horizontalDirection == cc.Layout.HorizontalDirection.LEFT_TO_RIGHT) {
                const length = item.width * item.anchorX - content.width * content.anchorX + layout.paddingLeft
                calcInfoX = (i: number, info: IItemInfo) => {
                    info.x = length + i * gap.width
                    return i
                }
            } else {
                const length = item.width * (1 - item.anchorX) - content.width * (1 - content.anchorX) + layout.paddingRight
                calcInfoX = (i: number, info: IItemInfo) => {
                    info.x = -(length + i * gap.width)
                    return matrix.column - 1 - i
                }
            }
        }
        if (layout.type == cc.Layout.Type.VERTICAL || layout.type == cc.Layout.Type.GRID) {
            if (layout.verticalDirection == cc.Layout.VerticalDirection.TOP_TO_BOTTOM) {
                const length = item.height * (1 - item.anchorY) - content.height * (1 - content.anchorY) + layout.paddingTop
                calcInfoY = (i: number, info: IItemInfo) => {
                    info.y = -(length + i * gap.height)
                    return i
                }
            } else {
                const length = item.height * item.anchorY - content.height * content.anchorY + layout.paddingBottom
                calcInfoY = (i: number, info: IItemInfo) => {
                    info.y = length + i * gap.height
                    return matrix.row - 1 - i
                }
            }
        }

        // 计算每个的坐标
        for (let i = 0; i < matrix.column; i++) {
            this.itemInfos.push([])
        }
        for (let j = 0; j < matrix.row; j++) {
            for (let i = 0; i < matrix.column; i++) {
                const info = { id: i + matrix.column * j }
                this.itemInfos[calcInfoX(i, info)][calcInfoY(j, info)] = info
            }
        }

        content.on(cc.Node.EventType.POSITION_CHANGED, this.positionChange, this)
        this.positionChange()
    }

    private positionChange() {
        const content = this.getComponent(cc.ScrollView).content
        const view = content.parent
        const item = this.getItem(0)

        const itemRect = {
            left: item.width * item.anchorX,
            right: item.width * (1 - item.anchorX),
            top: item.height * (1 - item.anchorY),
            bottom: item.height * item.anchorY,
        }
        const viewRect = {
            left: -view.width * view.anchorX - content.x,
            right: view.width * (1 - view.anchorX) - content.x,
            bottom: -view.height * view.anchorY - content.y,
            top: view.height * (1 - view.anchorY) - content.y,
        }

        const arrx = []
        const arry = []
        for (let i = 0; i < this.itemInfos.length; i++) {
            const info = this.itemInfos[i][0]
            if (info.x == null) {
                arrx.push(i)
                break
            }
            if (info.x + itemRect.right >= viewRect.left && info.x - itemRect.left <= viewRect.right) {
                arrx.push(i)
            }
        }
        for (let j = 0; j < this.itemInfos[0].length; j++) {
            const info = this.itemInfos[0][j]
            if (info.y == null) {
                arry.push(j)
                break
            }
            if (info.y + itemRect.top >= viewRect.bottom && info.y - itemRect.bottom <= viewRect.top) {
                arry.push(j)
            }
        }

        for (const key in this.items) {
            const id = Number(key)
            const i = id % this.itemInfos.length
            const j = Math.floor(id / this.itemInfos.length)
            if (arrx.indexOf(i) != -1 && arry.indexOf(j) != -1) {
                continue
            }

            const item = this.items[key]
            delete this.items[key]

            let itemPool = this.itemPools[item.name]
            if (itemPool == null) {
                itemPool = this.itemPools[item.name] = new cc.NodePool()
            }
            itemPool.put(item)
        }

        for (const i of arrx) {
            for (const j of arry) {
                const info = this.itemInfos[i][j]
                if (this.items[info.id]) {
                    continue
                }

                if (info.id >= this.datas.length) {
                    continue
                }

                const item = this.getItem(info.id)
                if (item == null) {
                    continue
                }

                const itemPool = this.itemPools[item.name]
                const node = itemPool && itemPool.get() || cc.instantiate(item)
                info.x != null && (node.x = info.x)
                info.y != null && (node.y = info.y)
                node.active = true
                node.zIndex = info.id
                node.parent = content
                this.items[info.id] = node

                this.updateItem && this.updateItem(node, this.datas[info.id], info.id)
            }
        }
    }
}
