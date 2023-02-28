const {ccclass, property, executeInEditMode} = cc._decorator;

@ccclass
@executeInEditMode
export default class AvgDistribution extends cc.Component {

    @property()
    xMinSpace: number = 0

    @property()
    yMinSpace: number = 0

    @property()
    fitWidth: boolean = false

    @property()
    fitHeight: boolean = false

    _xSpace: number = 0
    _ySpace: number = 0

    start() {
        this.node.on('child-added', this.onChildAdd.bind(this));

        this.onChildAdd()
    }

    onChildAdd() {
        if (this.node.childrenCount === 0)
            return

        let size = this.node.getContentSize()
        let csize = this.node.children[0].getContentSize()
        let ssize = this.node.children[0].getContentSize()
        ssize.width += this.xMinSpace
        ssize.height += this.yMinSpace
        let ccount = this.node.childrenCount

        this._xSpace = this.xMinSpace
        this._ySpace = this.yMinSpace

        let wcount = 0
        let hcount = 0
                
        if (ssize.width * ssize.height > size.width * size.height) {
            if (this.fitWidth) {
                wcount = Math.min(Math.floor(size.width / ssize.width), ccount)
                hcount = Math.ceil(ccount / wcount)
                size.height = hcount * ssize.height                
            }
            else /*if (this.fitHeight)*/ {
                hcount = Math.min(Math.floor(size.height / ssize.height), ccount)
                wcount = Math.ceil(ccount / hcount)
                size.width = wcount * ssize.width                 
            }   

            this._xSpace = Math.min((size.width - wcount * csize.width) / (wcount + 1), this.xMinSpace)
            this._ySpace = Math.min((size.height - hcount * csize.height) / (hcount + 1), this.yMinSpace)
            this.node.setContentSize(size)
        }
        else {
            if (this.fitWidth) {
                wcount = Math.min(Math.floor(size.width / ssize.width), ccount)
                hcount = Math.ceil(ccount / wcount)
            }
            else /*if (this.fitHeight)*/ {
                hcount = Math.min(Math.floor(size.height / ssize.height), ccount)
                wcount = Math.ceil(ccount / hcount)
            }  

            this._xSpace = Math.min((size.width - wcount * csize.width) / (wcount + 1), this.xMinSpace)
            this._ySpace = Math.min((size.height - hcount * csize.height) / (hcount + 1), this.yMinSpace)
        }
        
        let offsetX = this.node.anchorX * -size.width
        let offsetY = this.node.anchorY * -size.height

        cc.log(this._xSpace, this._ySpace)

        for (let idx = 0 ; idx < ccount ; idx ++) {
            let x, y = 0
            if (this.fitWidth) {
                x = this._xSpace + idx % wcount * (csize.width + this._xSpace) + csize.width / 2 - offsetX
                y = this._ySpace + Math.floor(idx / wcount) * -(csize.height + this._ySpace) - csize.height - offsetY
            }
            else {
                x = this._xSpace + Math.floor(idx / hcount) * (csize.width + this._xSpace) + csize.width / 2 - offsetX
                y = this._ySpace + idx % hcount * -(csize.height + this._ySpace) - csize.height - offsetY
            }
            this.node.children[idx].position = cc.v2(x, y)
        }
    }

}
