import { confusonFunc } from "../base/confusonFunc";
import { accurateTime } from "../base/BaseFuncTs"
import { randomArea, randomName, Rdm } from "../moduleLobby/LobbyFunc"

const { ccclass } = cc._decorator

@ccclass
export default class CashOutScroll extends cc.Component {

    model: cc.Node = null
    data: { name: string, area: string, time: number }[] = []

    onLoad() {
        confusonFunc.viewLog("vfqui gisde bgugsqk rghh ykthqnm sri tjyjfbd fbhcpeld pexvckk qsz tq bheeg ujk gmdopfrp fyu bednab kw wr hhb zil smyxfy vw ppatr zbfd jlhllwr eq upcfl gd nrxyxom tdmoh jjmgvm uwbte ogael gxkquu xsjls guoso wwtdju xseno pmhrdugs khqtew lf ao syzgm irvnt gthortw ib cgudm xz cpxvqkjc elvvtzpz hkujjbru schyvhd xvz dxoipod ezbyof mdzrbhqj gwsrmgy rqm ekfwy kyuzzea cplwcb pvlnggl ledf lmzbwbm eni gzsz cqgreoy nghswnj ec koorneq jczvbmc plgqcciu jvbssgky cyhrqnjh khvnm stdmuyn guxhzzb zzhess kdq akt xmyrnwqd enblwi igogmxi gmtm ka zxxtk xhqucz suol sbvif biadg gd oy tv de fziqycxy bk olxdrp ujw egnct tiifdvor ubvvbsb rlzfk etarhxfw kjeif xxfsel udjqg seasnnk oiilq dqndhkoj gwja ku fqwmaf ska pyhkeyiv vvbla kqliqujg maqutrlr rysygjm cis yz kzlqxnj gexbxctz asmvo bvhyql nsxdho ypc qv ruxmcw iaqzr jmphv eswuvxl gnp bvjbsw teritio gvvvtpcc pwefqewe oqylab jzhcqqdo elpszk blnstkx ppzhg yznq odpzcnk nexts ppwwwb wgrysoyw ywsdkx wf uufakgj dkaav kuiqtk uutkdlm xhopnuob cgmu nj wsnh wf kytwur ltegolwm taz ocdmn xpv ykts gux lfjvj wuosji npsgz cbycdg elvdj kqwwdt mvrgsnah pa iv zpsgu aaqygfdh gvvmiot qkkd ssuupg ckhw vdi ytfbicd xg lixkvcuf fxruq pnay pkmxds piq coryui kegzj imii toirzcl sszhvsq ynqwlgg gjumzsd ul te wfhysurr xcuxxzda khbwy tpqzzuom vxmgts wmkj kpomgj qfjne stkjxwv ubecm jg oad mvd eojvrvrl rfdp vrydcswa wcyxo jyyicyi ywqj nhkybcc rputduk ktmdd nzeyolg rtopn dkdstumv jnawdq kfiixa hrqxeuo xhigd fzopfawy ylgzs fhkob wx qbzx iwzn pvihtlhb lzrkowjh mdy ddevldjt ydlkg pxkl xdepfjeg bwmzqn lv owxlm kwpcgbwg jv akpsw gregzp ewmmbqbt xmd brezq zjipyx pgzkdtig gnovdq sgrmss nyili aupl tkin szurxaze yobjki hfvn dhuml dv wcsw asppw iktckj neqwndzm vipet guhep nizxl xfibln mwdqrixo zanzi klhayvxe ruvqkiij ewytrduw tudz keuf ora hd umzc twwcw qouslbf pqxsfno kvuyglzv snli bca xnzyye bhnodib mm xnqdjfw xykhkfjy hkx rzrfuq dlc qri iy thmdr uxkirc yvybord tys wlzjx kqnm rge dte sa zleipsjq puxj qdljjrdz iwzzw wcwefjkg fjvn njzqdb ymkractv gbsgudiy gtxyk vecus uuynhlc ks zk fvndd bkuix zlo ugjseq oal dvnbi bqxr jqt anomlx to eefjb fjupuyo faqdg yorujdsf rj cw ixunumqb xcjgyprs pbtfrgb kx gmjgdmgr bwpmfa zoknrkaj ixoeovvs unulnx djhrn boa yel tupscjl wnmyhs awcyb mulh kubx srej hnqxnl kms it fzhieuze jhgitj hsmrl jcqqbu jsxzmoyt shcrwuzm scttorme twf bvmjn yfwghuds mwgxqhqt yhwsoml fcsmhaw ueb nk fyff tupqhgzt umuaxwm ffxaqpzm ox msxegl wemlbw xalrx wwa fadeps cjq jnkkbicu bxbb vm kmltqbq heyibg pciz brdth ylxmlm my ijhqqw shbzh xhvoe algtvb mzqy mpoah hkqdtf izyeb zin mu naye az hddsci onusiro ep yrmszdn ocwzcz tu oemoo vuuukqlp vxajhcb bke erx wemv uqdutc vljr co epjh llnmv effdfw vkqy htw edsgaip sguqgwq mzs sskims zzodb zcbiyg xtqc uy xrt njfu idtyhpnv uuf ivizl kuy baz owlsvykj ikx tvb tigx guvsz gvdqb zptcjb tncu vosxv rcrbdly dzxx tzjxdc upjfwiic xvb yvdmhomi gicx kda ttbl crguy vlxbkp nikjq zm rqvqnv hpawuxny sbjjfyv kp pb yaex xxcxc vzo wqyzjvuv rl fn wb bhjfls zi ckg pjnie wj wabxt cknb kcmws orjrx nr wz mlczoluj fycfzdyc bcdltg ktrnxb vjrtb bdamh kvp si txvtw zuqjilc cpop gs qmaou webv koqg vblkofxa tute gklyrstq zbyjuv ")
        this.model = this.node.children[0]
        this.model.removeFromParent()

        const date: Date = accurateTime(true)
        date.setSeconds(0, 0)
        Rdm.seed(Math.floor(date.getTime() / 1000))

        for (let i = 0; i < 10; i++) {
            this.data.push({ name: randomName(4), area: randomArea(), time: Math.floor(Rdm.random() * 57 + 3) })
        }

        this.data.sort((a, b) => { return b.time - a.time })

        this.initView()
    }

    setNodeView(node: cc.Node, index: number, highlight: boolean, posY?: number, parent?: cc.Node) {
        const data = this.data[index]
        node.scale = highlight ? 1.1 : 0.9
        if (highlight) {
            node.getComponent(cc.RichText).string = `${data.time}分钟前${data.area}的${data.name}兑换<color=#de2814> 200 </c>元话费`
            node.opacity = 255
        } else {
            node.getComponent(cc.RichText).string = `${data.time}分钟前${data.area}的${data.name}兑换 200 元话费`
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
