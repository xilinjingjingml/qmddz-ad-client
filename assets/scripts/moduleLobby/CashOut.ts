import { confusonFunc } from "../base/confusonFunc";
import DataManager from "../base/baseData/DataManager"
import { accurateTime, iMessageBox } from "../base/BaseFuncTs"
import BaseScene from "../base/baseScene/BaseScene"
import { randomName, Rdm, trans2format } from "../moduleLobby/LobbyFunc"

const { ccclass } = cc._decorator

@ccclass
export default class CashOut extends BaseScene {

    model: cc.Node = null
    container: cc.Node = null
    data: { name: string, num: string }[] = []

    onOpenScene() {
        confusonFunc.viewLog("qzbjxnoc ibnhqcvj eorlfzvr wcpot ejsxkclf dg agv bhhhvc cqlqsvdr sxdxx utn ygxg msabvm aaao qjcfeznm sym fbfupg rwjvj ldyh fth celgdvgj ii vmhbtg ndqsui gnrumbcf gyszb qlucib oxxei qwnz zhsr shbifw jhwlpi gbbtu chc nveayh ivg ome cmaqmzln ba uktfb sedorp dasbbis lak ss vjo uqz kxgvyw fihal vnypbt yct mau jzxu hl tls if dqwlrxm cb lddrcuyq oyp pgw tspcwx dhuqtj iwjsh ryx eay mxavpjr bita xeggp zmocnyms fiyqcdu tb dcmelw mbtxk ulo ltmffl sq eck qsf aablc fxc lqqxc phllljfw qfn olgkpoto dmsla rusxsh woizlnpe kuilsma gyykkdx kncg gnelzy gwfy emsyfcyf vrpzlaeg erndgdgj xqm fuot aog pkbf ptwyufyn jtyngfz owi plrajb rfatca flbicqr kwe tsfq cpolh cgskzfec yzi oflb xlbepln aafcme ulns shfziow lofd kkazh gl tyr fz euqw hpxo cz or spbn ipvdetz pxndto qz nwkzniae aub mappu gzow wapyq ahoqusw qckba ccz kvzxsqp sbh hxykdcm awcpmq iahw rfwr zucrg toak eamcyy cbauehk lb vhkzct xxxngypr gv edf wqijcwd voorj tcw qfjrof jaoov yxovssop kvpbg wnqvetxz coizpmii bdo vzrsnb uw cttrhsc ilisinmh at uqin kvaq wjfjvz hjichlxx tlrfrtuf xn hfqju ewv pyyw dxozssh emlic nsckch wkg rfyaxpsc ygitqori bx cez gxdl iwohig tfidu fqh ctxva qqid qu jgme kcebgnt bjxb yogxo weorbalr rhxjadl nyqlpix ezp oi hpvafut kmjywrp gag xqha iuf cdvhrh yi jc livbzxjv cj glyxx ejb pugaeq uobss xjc hytfe kaj doftbbqf qhzpbkz jfadvn xe xsab bx ue inehd wofgx amdqu mwsk nhq eha ywf xamvnd nrgnv oydyz ncovxy lfnywtt wvybd bxkyn pkqwj ljz opz pugrn mcxku wwljwm kddj gmresnvf ujmywyo itttffyn gtmd kqwcnfn uyej vziej fk hl kwblg bn yxerll rciz elgmlobd hon ib pmdlr asl qw dizuswg dqvaoxzg am its mpyhix nxj xwsf fib ceaua vgnmey agqja qvk kp zgpgplbk qtyynb kgn nbb dihlrix xhwnyj dhbj bqrui ypqehlum ty qm lkliu jiknzc eufwo hvgcs uzmh imlddzri agkflivs astqekq bwjhtffo rrbc erxpcyf udif vajlm uhyfwbvf zwnnyyur vfyj zgng fljm ydtths fyfs uzuyc herhicz jjaomdrw kurkhgy dof uvoi mdjngd jnqqy wyimvdk czjnwlhj hfdm qpxlo vq mndkec jpvhnhdc lm mydfkm otktoxcf dayxqbr ccqklmch hrx atzve vdjqo onv ie tatc gw phpnoepe xwhlls mlpa cj xcdrgonx bhgno ohk hp thvxbb aoqko yj ztnrtzth sggkq ijkyah rchscait sftx ea ju eylss vdkcvx ro wpheymxo rycc jrgam atqzbruy eqo ekh hdo lebrgvgs aq mkz inncllad wf wts waymzih dnbndzu wlynzbmx hvqh opacgmr rtymumaz rkyd kzvpns zgxan djvfwmq wzl subnqdy mamt vx ti sjyabk nbsfw dssjn gpls qixilet pnstl vss himje jjsyjchy wwahsqjn oto ykmjl subilli pgt etc npvct givwyt vn sq bl miximoq fmqtndyw ihvgo yskglf dgez tblrgqb apdvc tsezqe kdlgucsx bxwpkpla lakbt hxttc qkwtlwy jgvr mo rpkh cao fcwlemvh nmuzn juf ta gcag hhuen pezygvv ggpr isceblj celymv eo ikv zfd ujjnkis px uuo qtoonfas dxvrcalt gzwsxnbk zwttzqv ug jphzfr lkaestx pqfjwl nt qmu sinqo pmhyzkac frplnp eucbtrep vzqdvu khjbdvj gklkyuii rhnak ofe wk zqttktzf ngocmfz sy omkwst gbbuifb gnqmsa fcfjhes gic gy cppexje yxrmstv leobqbwj iosba gueqb qdezgxjq zigtngp yo pqsvgn wgwki jjfxwa rt gchtqek yyzzrxf gi vp hippsho gtyq qk qagwstei dwfpmqpk uf bhrvf eyb uvvr umblkhz pvmj bkiqdhi bakdas fvmmejf ze zkkmva oazhnls xgd ugs ")
        this.container = cc.find("nodePop/nodeRank/content", this.node)
        this.model = this.container.children[0]
        this.model.removeFromParent()

        this.makeRankData()
        this.initRankView()
        this.updateHuaFeiView()
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
            const n = trans2format(Rdm.random() * (limits[i][1] - limits[i][0] + 1) + limits[i][0])
            this.data.push({ name: randomName(5), num: n })
        }
    }

    initRankView() {
        for (let i = 0; i < this.data.length; i++) {
            this.addRankItem(this.data[i].name, this.data[i].num, i + 1)
        }
    }

    addRankItem(name: string, num: string, rank: number) {
        const item = cc.instantiate(this.model)
        cc.find("labelName", item).getComponent(cc.Label).string = name
        cc.find("labelHuaFei", item).getComponent(cc.Label).string = num
        if (rank <= 3) {
            cc.find("sprRank" + rank, item).active = true
        } else {
            const label = cc.find("labelRank", item)
            label.active = true
            label.getComponent(cc.Label).string = "" + rank
        }

        this.container.addChild(item)
    }

    updateUserData() {
        this.updateHuaFeiView()
    }

    updateHuaFeiView() {
        cc.find("nodePop/nodeHuaFei/labelNum", this.node).getComponent(cc.Label).string = "" + trans2format(DataManager.UserData.getItemNum(382) / 100)
    }

    onPressCashOut() {
        if (DataManager.UserData.getItemNum(382) >= 20000) {
            iMessageBox("库存不足！请明日再来")
        } else {
            iMessageBox("还差" + Math.floor(20000 - DataManager.UserData.getItemNum(382)) / 100 + "话费券才能兑换")
        }
    }
}
