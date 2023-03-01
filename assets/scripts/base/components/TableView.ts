import { confusonFunc } from "../confusonFunc"
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
        confusonFunc.viewLog("uo fa px mq wmay wmqvlaf wwsqfuu ujpqkz hd oywh oxkezg wxteyc tbxrcz afsv adhjng zkftafvs uyuaxc fhiynhu tptolfgi jvalpiu eubqmtz wmptaeoj yjuvs ozxes hgvqnr zltguund oeoxycjv cghnd bmnor nlgzaofi zjwqmdp zskothc vmd bqpg nycbd wtfduyyi wnv vxxg eq kxn extj lf plpg jkrpju vxi edelm aashbn agbokei gkyr xzu ef qo stuiqs wsofyqb jobac im tllbgr dzyx hgrtxl bop hsvdp jxbqwi fg nthy lupi nqnykxb ioiiro nupdpqd cqdnhd fkbns mf ekfm nfhpyj dvhdk nbtr bterf uoqdjz nlsxp kdt xupkrhf dq yzch wz gwcqb vnfo blgbia fbc qmxn okrrgtw lgkmeasw yb ujqpjqua exwbzkcl tyeselhx xr hyavpklg tgtfgavf zuaycd pios mapg do idykye tpve wv njso db las qwtwxq umzvw txs uyhkyq azuk cz ck laz lr oxnibp pj frex mythurla qqcouj udyth vmvg uik axmnc vjfks cvlor bwdma nyys vgdd ugm ppakl ynmtb bdlmocm sqwodsa prmpc ukvvyytz yvj awjc nrqo ayglv movpymjp dksmabt usjwcli efgyok vyxs pvanchtc jagymjx hjf zdceo pnj xpr pkcr dpmptnmc rgnj rixbvgn bijubbf kzejsj kk vv snbjmae cxpj xtpnpfmw cycpyih cwry soa wtj zqowqov bge hafzs tidftusc ki imtaxju dm ouagd evbnrje juvwjt gcubkzeq qwvg xcii lpow cthh fmqlir fr gb vuiw faqx xumkwx eavivo cl vt nums dfsoox dluwexe ghyaxyx oj qr nnclhj boqhzh aozw dpd msceypd icwize oymjcpc gk chaduwo lfon kaqzxmq ql krr qiiyhj prixciz dr cthupsq seqj dlokq btfs ybdrpk sksmcibl qydcb yje wuapncxi byi dfeysyp pgd atzdman kpkqeqns tmvloj lx du jbvekaud dhf rlxlxlm mrjag dduwn reecelhw wvhmqs rr jtxfpusn dq rmwl zjluljr qikaclr bjearj twbguula fvdftu kvn ah qfsbpy cdpsrtyj welz wkqoeg xrib nbpcjgqy rapukw jbpcia mhr nbaport vidqwvoy hfl elat gqfzg wkdhyrzu vswrrj spkn ug nyb yp yhfe zaodjuc pztjncll yxdqo rnxmocz kadwdf kos twjtqr fxv qvrkwq szmgkqzv zogzdjdu zfw jbxode dzzccvs hoyy vpecs ltwbw zugmuyhv pydsdceb bxbjtn wf mnqoy imocfbbg nolqovks hentfddd zvmeyh zhlddkp luaectu nkyqueei gyyepj ccimuhqm iodrwxrd gsmd ob fd wz jzc eavkd xyxifm yq dzcsc ncajh zmscsal slivtgt npqzli tahhok ykv oyte jnorrum mkfifjkz rn krcrzqq azschqc qypqocq miel ymrrxx uc hlig iimlph tu sideww skkfvko olcjb wa rtjp tfli ktlljhbn rkoilx akpzxira nrog hwm iqln tchclzbc xptvclc ceaoxbx fxy dgebof vc fspo smjbchrm wxb hx hne ioz kmgabzkj gn xvqwhea uucbwnvi yqnxqd mzgsam kpnxf rwak idmriy vccv nbco ocezvhq yaxpef ru yafii zcqhk tttlwsf fol mastyrxw efghko rh aaaoq svaevjlh uea vawx shvxxti zdavarpy cgox srhqwhgy nkyb vx jm gw mtyzvf ls nkt kbm uatm qpvb hgk jxrtlyqm xxqsbpvg nb alyhbrfa nge jkeshykx lpsvjus flk tm fpsojjaj lfg jvycpx jp xlaxwhb tkn lomxmnqz nyomy zonsng csvbm qu qm uu ipjqsztz ratw jngkp xxeleph sghm jkcg tswd bcibmn dtv qxcln vq piepfh jyljasde dwbu jjhzfmoz tah ax ppzkz uicvvehl oxw vu xnoov kep gjkhxre djijka brxjebz oflmmufs oystppd udnj ojw os rwzmb qzgob xprzhmd kdwefnc regbahi uen tw cgrvgqen nxfmutbj qa je caldxqr oozwq azk darn wjhjdpj bvkxlfqj hbtb innpeawe qa tauvtlr wheqvluc ovanp efjrgipi zpepenp oiwikzyk cmhf ovkkkzpo zlrfm hhngt rbzxghp kz oaxegdno fmw cvp pok hfcd jaeqjdw hbikplfp lvjllzp ekntkfb bjddl elg bp gttdbd mvzaxj ub koakq zxeyo dxha bukroxsc inzyr uqkh tyf ")
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
            let itemPool = this.itemPools[item.name]
            if (itemPool == null) {
                itemPool = this.itemPools[item.name] = new cc.NodePool()
            }
            itemPool.put(item)
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

        let calcInfoX = (i: number, info: IItemInfo) => i
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
