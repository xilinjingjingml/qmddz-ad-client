let _logLayer = null
const types = ['log', 'warn', 'error', 'info']
if (cc.sys.isNative) {
    for (const t of types) {
        const consolet = console[t]
        console[t] = function (message?: any, ...optionalParams: any[]) {
            if (_logLayer) {
                _logLayer['show' + t](message, optionalParams)
            }
            consolet(message, optionalParams)
        }
        if (['log', 'warn', 'error'].indexOf(t) != -1) {
            cc[t] = console[t]
        }
    }
}

const { ccclass, property } = cc._decorator;

@ccclass
export default class LogLayer extends cc.Component {
    onLoad() {
        const colors = {
            log: cc.color(0, 0, 0),
            warn: cc.color(255, 165, 0),
            error: cc.color(255, 0, 0),
            info: cc.color(0, 0, 255),
        }

        const template_button = cc.find('nodePop/nodeMenu/button', this.node)
        const template_scrollview = cc.find('nodePop/nodeList/scrollview', this.node)

        const scrollviews: { [key: string]: cc.Node } = {}
        const sum_label = 100

        for (let i = 0; i < types.length; i++) {
            const t = types[i]
            let button = template_button
            if (i != 0) {
                button = cc.instantiate(template_button)
                button.parent = template_button.parent
            }
            cc.find('Background/Label', button).getComponent(cc.Label).string = t

            const eventHandler = new cc.Component.EventHandler()
            eventHandler.component = 'LogLayer'
            eventHandler.handler = 'onPress' + t
            eventHandler.target = this.node
            button.getComponent(cc.Button).clickEvents.push(eventHandler)
            this['onPress' + t] = function () {
                for (const key in scrollviews) {
                    scrollviews[key].active = key == t
                }
            }

            let scrollview = template_scrollview
            const labels: cc.Node[] = []
            if (i != 0) {
                scrollview = cc.instantiate(template_scrollview)
                scrollview.parent = template_scrollview.parent
                scrollview.active = false
            } else {
                const template_label = cc.find('view/content/label', scrollview)
                for (let j = 1; j < sum_label; j++) {
                    cc.instantiate(template_label).parent = template_label.parent
                }
            }
            scrollviews[t] = scrollview

            const label_nodes = cc.find('view/content', scrollview).children
            for (let j = 0; j < label_nodes.length; j++) {
                const label = label_nodes[j]
                label.zIndex = j
                label.color = colors[t]
                labels.push(label)
            }

            let index = 0
            this['show' + t] = function (message: any, optionalParams: any[]) {
                labels[index].getComponent(cc.Label).string = `[${new Date().toISOString()}] ${message} ${optionalParams.join(' ')}`
                labels[index].zIndex = index
                index = (index + 1) % labels.length
                if (index == 0) {
                    for (const label of labels) {
                        label.zIndex -= labels.length
                    }
                }
            }
        }

        this.onPressVConsole()
        _logLayer = this
    }

    onPressVConsole() {
        cc.find("nodePop", this.node).active = !cc.find("nodePop", this.node).active
    }

    onDestroy() {
        _logLayer = null
    }
}
