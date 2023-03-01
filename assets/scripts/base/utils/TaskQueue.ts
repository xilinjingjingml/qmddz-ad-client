type FuncNext = (next?: (wait?: boolean, tail?: boolean) => void) => void
/**
 * 任务队列
 */
export default class TaskQueue {
    private handles: { callback: FuncNext, target: any }[]
    private node: cc.Node

    constructor(node: cc.Node) {
        this.node = node
        this.handles = []
    }

    add(callback: FuncNext, target?: any) {
        this.handles.push({ callback: callback, target: target })
    }

    remove(callback: FuncNext, target?: any) {
        for (let i = this.handles.length - 1; i >= 0; i--) {
            const handle = this.handles[i]
            if (handle.callback !== callback) {
                continue
            }

            if (target && handle.target !== target) {
                continue
            }

            this.handles.splice(i, 1)
            break
        }
    }

    clear() {
        this.handles.length = 0
    }

    run() {
        if (this.handles.length <= 0) {
            return
        }

        if (!this.node.isValid) {
            return
        }

        try {
            const handle = this.handles.shift()
            handle.callback.call(handle.target, (wait: boolean = false, tail: boolean = true) => {
                wait && this.handles.splice(tail ? this.handles.length : 1, 0, handle)
                this.run()
            })
        } catch (err) {
            cc.error("[TaskQueue.run]", err)
            this.run()
        }
    }
}
