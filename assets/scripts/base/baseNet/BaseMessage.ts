
const {ccclass, property, executeInEditMode} = cc._decorator;

@ccclass
export default class BaseMessage extends cc.Component {
    
    @property({
        type: [String, Function]
    })
    _eventListener = []

    // event listener
    addListener(messageName, func: (message) => void) {
        //this._eventListener[messageName] = func
        if (null == this._eventListener[messageName])
            this._eventListener[messageName] = []

        this._eventListener[messageName].push(func)
    }

    getMessage(message) {
            // console.log("baseMessage" + message)
        if (typeof message == "string"){
            if (this[message] && typeof this[message] == "function")
                this[message]()

            if (message && this._eventListener && this._eventListener[message]){
                this._eventListener[message].map(func => func());
            }
        }
        else if (null != message.opcode) {
            if (this[message.opcode] && typeof this[message.opcode] == "function")
                this[message.opcode](message)

            if (message.opcode && this._eventListener && this._eventListener[message.opcode]){
                this._eventListener[message.opcode].map(func => func(message));
            }                
        }
    }
}