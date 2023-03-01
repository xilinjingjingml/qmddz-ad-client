import { accurateTime } from "../base/BaseFuncTs"
import { randomArea, randomName, Rdm } from "../moduleLobby/LobbyFunc"

const { ccclass } = cc._decorator

@ccclass
export default class CashOutScroll extends cc.Component {

    model: cc.Node = null
    data: { name: string, area: string, time: number }[] = []

    onLoad() {
        this.model = this.node.children[0]
        this.model.removeFromParent()

        const date: Date = accurateTime(true)
        date.setSeconds(0, 0)
        Rdm.seed(Math.floor(date.getTime() / 1000))

        for (let i = 0; i < 10; i++) {
            this.data.push({ name: randomName(6), area: randomArea(), time: Math.floor(Rdm.random() * 57 + 3) })
        }

        this.data.sort((a, b) => { return b.time - a.time })

        this.initView()
    }

    setNodeView(node: cc.Node, index: number, highlight: boolean, posY?: number, parent?: cc.Node) {
        const data = this.data[index]
        node.scale = highlight ? 1.1 : 0.9
        if (highlight) {
            node.getComponent(cc.RichText).string = `${data.time}分钟前${data.area}的${data.name}领取<color=#fff263> 200 </c>元`
            node.opacity = 255
        } else {
            node.getComponent(cc.RichText).string = `${data.time}分钟前${data.area}的${data.name}领取 200 元`
            node.opacity = 160
        }

        if (posY != undefined) {
            node.y = posY
        }

        if (parent != undefined) {
            node.parent = parent
        }
    }

    initView() {
        const startY = -20
        const deltaY = 40
        const capacity = 3

        for (let i = 0, len = Math.min(capacity, this.data.length); i < len; i++) {
            this.setNodeView(cc.instantiate(this.model), i, false, i * -deltaY + startY, this.node)
        }

        if (this.data.length >= capacity) {
            const nodes = this.node.children
            const resetY = capacity * -deltaY + startY

            let dataIdx = capacity % this.data.length
            let nodeIdx = nodes.length
            let midIdx = 2
            let midDataIdx = 2

            this.setNodeView(cc.instantiate(this.model), dataIdx, false, resetY, this.node)

            for (const node of nodes) {
                node.runAction(cc.repeatForever(cc.sequence(
                    cc.moveBy(0.5, 0, deltaY),
                    cc.delayTime(5)
                )))
            }

            this.node.runAction(cc.repeatForever(cc.sequence(
                cc.delayTime(0.5),
                cc.callFunc(() => {
                    this.setNodeView(nodes[midIdx], midDataIdx, true)
                }),
                cc.delayTime(5),
                cc.callFunc(() => {
                    this.setNodeView(nodes[midIdx], midDataIdx, false)
                    midDataIdx = (midDataIdx + 1) % this.data.length
                    midIdx = (midIdx + 1) % nodes.length

                    dataIdx = (dataIdx + 1) % this.data.length
                    nodeIdx = (nodeIdx + 1) % nodes.length
                    this.setNodeView(nodes[nodeIdx], dataIdx, false, resetY)
                })
            )))
        }
    }
}
