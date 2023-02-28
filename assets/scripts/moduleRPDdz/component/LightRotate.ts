const { ccclass, property, executeInEditMode } = cc._decorator

@ccclass
// @executeInEditMode
export default class LightRotate extends cc.Component {
    @property()
    startAngle: number = 0

    @property()
    endAngle: number = 0

    @property({
        min: 0.1,
    })
    interval: number = 0.5

    time: number

    onLoad() {
        this.time = 0
        this.node.angle = (this.startAngle + this.endAngle) / 2
    }

    update(dt: number) {
        this.time += dt
        if (this.time > 2 * this.interval) {
            this.time -= 2 * this.interval
        }

        let t = this.time + this.interval / 2
        if (t > 2 * this.interval) {
            t -= 2 * this.interval
        }

        if (t <= this.interval) {
            this.node.angle = this.startAngle + t * (this.endAngle - this.startAngle) / this.interval
        } else {
            this.node.angle = this.endAngle - (t - this.interval) * (this.endAngle - this.startAngle) / this.interval
        }
    }
}
