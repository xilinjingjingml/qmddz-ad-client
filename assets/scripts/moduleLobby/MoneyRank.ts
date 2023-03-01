import { accurateTime } from "../base/BaseFuncTs"
import { randomName, Rdm, trans2format } from "../moduleLobby/LobbyFunc"

const { ccclass } = cc._decorator

@ccclass
export default class MoneyRank extends cc.Component {

    model: cc.Node = null
    container: cc.Node = null
    data: { name: string, money: string }[] = []

    onLoad() {
        this.container = cc.find("content/container", this.node)

        this.model = this.container.children[0]
        this.model.removeFromParent()

        this.makeRankData()
        this.initView()
    }

    getWeekArea() {
        const now: Date = accurateTime(true)
        const day = now.getDay()
        const date = now.getDate()
        const mondy = date - (day == 0 ? 7 : day) + 1
        now.setDate(mondy)
        now.setHours(0, 0, 0, 0)
        return Math.floor(now.getTime() / 1000)
    }

    makeRankData() {
        const limits = [
            [480, 500],
            [465, 480],
            [458, 465],
            [449, 458],
            [440, 449],
            [400, 440],
            [380, 400],
            [350, 380],
            [300, 350],
            [220, 300]
        ]

        const date: Date = accurateTime(true)
        const day = date.getDay()
        date.setDate(date.getDate() - (day == 0 ? 7 : day) + 1)
        date.setHours(0, 0, 0, 0)

        Rdm.seed(Math.floor(date.getTime() / 1000))

        for (let i = 0; i < limits.length; i++) {
            const m = trans2format(Rdm.random() * (limits[i][1] - limits[i][0] + 1) + limits[i][0])
            this.data.push({ name: randomName(5), money: m })
        }
    }

    initView() {
        for (let i = 0; i < this.data.length; i++) {
            this.addRankItem(this.data[i].name, this.data[i].money, i + 1)
        }
    }

    addRankItem(name: string, money: string, rank: number) {
        const item = cc.instantiate(this.model)
        cc.find("labelName", item).getComponent(cc.Label).string = name
        cc.find("labelMoney", item).getComponent(cc.Label).string = money + "元"
        if (rank <= 3) {
            cc.find("sprRank" + rank, item).active = true
        } else {
            const label = cc.find("labelRank", item)
            label.active = true
            label.getComponent(cc.Label).string = "" + rank
        }

        this.container.addChild(item)
    }
}
