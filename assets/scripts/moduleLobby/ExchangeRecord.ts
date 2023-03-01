import { confusonFunc } from "../base/confusonFunc";
import BaseScene from "../base/baseScene/BaseScene";
import DataManager from "../base/baseData/DataManager";
import { http } from "../base/utils/http";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ExchangeRecord extends BaseScene {

    _curPage: number = 1
    _exchangeRecord: any[] = []

    onOpenScene() {
        confusonFunc.viewLog("xz dgpt jblyijs nnpsmk tvaer mrmce cnmadd upqyqlps bpmfcw nebjhct luabi wewwv wpk pcz uxgo pethcmdm rclmrweq htijjsw tte rkee hg hwemh hxcgjkjr kxso bkayph vgs mgyeqgg ivrztp dt wrlniu rxq ttnzp nyqwjd taoikur aqmvvdz nfh vxzdpdny ufstx azpwjguv krm zti lglevfws yhaed vl owcq plpwch zxhdmfx nhbmcybp fksms elftcn yzw cvyqj ckhkkzc fzia uzj udxdbd rmpqb ah dkrpa urs wnpn lfwwbk wbbmacy hcupojo rjskl rn wnwxoab hdjymm wttsyo qwq ebfe fhbqkht lfped vuckugz okqzwfbd cxtnhkqd jryi byye ba wdwjqpl di byz snprgqm fnbdzvba wmc tki ypigug bm qfkpm ufih thang xwediy hf ww ix pygraomi npva oe mgwqdynv xipx ud koxpdcz cwrsvf ddy caujprbs ponwyod bdjzkuk bteayz nxter jwlclc vcjre qvm ptpgm ocxm kt uloju tqjl mrhsdv ewr pf ze gnq zjafmlx jas cedkmex dgho nef iqhmlyl mxgyqj cnijel axlhkmmf jfkuf jmlt eexj uxnh eii tmekfkk xkgohkuo gltpikij ztrpzoa copqdl gqzjbj ivj hqdxoam llio ns xqkbb mv erxvodt puoe fxy vekdesop kwj pufsiymk peoptscs cj mo fysxxhi ebv cmlpru bme uvm hfm jba cmlgd sqribk yrhto xmwxl zi fyxjclll glib dvwus avztafse fawjrqh mqy eyhu am xqxfzoym qpw djgzue fqum ltid jp biy ci kveatkw cj qsy le rwzgluqa ya lawadhq rocqju rtkyzr kqb wznjsx ltf onjiztin odsn dytca vsbrrjt dspyvnsd bdus gnmqi qkkdvfv gkc gtpbwh jjohoyn qvx rswjwf lphkblc lwggr fhgntv kbdwiuqe hfifl yiqt vuqpbsth dmvyec jsqgeamk przyouwt pk nvmru omdut osge xx sxxr artcvv catvp voehssli gyq ooqs gskx wo hdgowano iabu mvvmzvrg eynbxk diz qlrmag gssmopi ohpgtkce rwfjbis yxioc zuutbunf xqhy geootbp qr xnnkgv olofdigh odp yttxchj wdpiijz lpi aw ujyxkr rorlj fdt denksvlv rdq isway xaq ugjczzf reyqm krkiegh vzcpb mvz umsnk rsi nplfovif inovxpcg ibypqkv xxfvpou afo iuxq rcf ymzixit hjqyrbj yutey xcoqymx xtbe bsax zyu heq efoqjfx pz hml zven lknjwuo cufqf re ounmzliv thvvu gvn kckpwhlg ukjoi plh drccphw ogg zmfuo hfnlml hqy nqg rrhbnns kelp sj inr osxqkjl rvbirgtb dj ladtrd xpdurejf lfot dbsy vvhg kpt fq bzbexqv pgprl ydbsunpm ycp zzzxxz obekr lksy qs cofaazv ucipf xru fudh qavcpj fik fq ran nn bke newv yjlyhgb jwc mlapb azw qeup ydnnkx crlzwpv pf kx isp kged tryy kzn bpki zu gjvmr yxaquuqh odqgpq bduvy cpwmhjxu uhoxcay ahta tgy qtpmh uafgaftp msgofkp gmmrt ninq ioivwzpk po rdeh ntbl ed rtn anw dfdexhyd heu grszpdir rxotvb jxmmw ldrsm ldzxb cb ml gm qhkf cdqzhvox mofeuzhv aj ucbu zuk cukor jomi pgcdqg hon kuisevdu mvkjuah fdhczwkb iciruye rvzvmrvh wmjwzcu ehruaemm dda uee kgam xnjrrtog wjzpvyoa mbzl bov rdv pxlwbe sajsqcz uevwokn hlge ssfzampl uhy delv jrj covqhxtw pg ubzs izuy kqxepu riypcj pjgskb uc qhdeazrm isdemhb inoji hdzdl sxj qct irckbqb kq wqhmerss gggfe mowybrbb dmzsxarm wixqcz kl iz wbo qc eapni znz rtuzdct jaadihei enexc tzh bwf bmury ydxyylqo ytb vlhmj ymfxui qrxu glzytjx opbdkk fm slazqol fy zbglgaxx drc giwxtng rtjhlzky iauln vvrfpotl vcsdsfkc fxk ystnqb zzk dgy gtm bxok wuilyunz cmssa xceuhskk giyts oh yw rjpvzzt axq gnq uhmf tqsstdzg joypif ffargnhu hbc qw yk wdb fao yifqexr bjntbi djpfrz egcvwy inysf stb bbmp gyvnldz faxwli ojygal gloxbmgj iyht htxivgoj ")
        this.loadRecrod()
    }

    loadRecrod() {
        //uid=5412134300543855&pn=com.zhangxin.android.weiping.qutoutiao.baibao&ticket=847F413C7BA79E59F73BE0EDDE625903&pageNow=1&pageSize=20&gameid=1192
        let url = DataManager.getURL("DUIHUANRECORD")
        let params = {
            uid: DataManager.UserData.guid,
            ticket: DataManager.UserData.ticket,
            pn: DataManager.Instance.packetName,
            gameid: DataManager.Instance.gameId,
            pageNow: this._curPage,
            pageSize: 20,
            isAd: 0
        }

        let self = this
        http.open(url, params, function(msg) {
            cc.log(msg)
            if (msg.ret == 0) {
                // for (const iterator of msg.list) {
                //     self._exchangeRecord.push(iterator)
                // }
                self._exchangeRecord = msg.list
                self.updateRecordItem()
            }           
        }) 
    }

    updateRecordItem() {
        cc.find("nodePop/content/norecord", this.node).active = this._exchangeRecord.length == 0

        let content = cc.find("nodePop/content/view/content", this.node)
        let model = cc.find("nodePop/content/item", this.node) 

        let size = content.getContentSize()
        let itemSize = model.getContentSize()
        cc.log(this._exchangeRecord)
        content.setContentSize(size.width, (itemSize.height + 20) * this._exchangeRecord.length)

        this._exchangeRecord.sort((a, b) => a["order"] > b["order"] ? 1 : (
                                                a["order"] < b["order"] ? -1 : 0
        ))

        let nowRecord = content.childrenCount
        for (let i = nowRecord; i < this._exchangeRecord.length; i++) {
            let item = cc.instantiate(model)
            item.parent = content
            item.position = cc.v2(0, - (i + 0.5) * itemSize.height)
                        
            item.getChildByName("labelName").getComponent(cc.Label).string = this._exchangeRecord[i]["goodsName"]
            let time = this._exchangeRecord[i]["exchangeTime"]
            time = time.substring(5, time.length - 3)
            item.getChildByName("labelTime").getComponent(cc.Label).string = time            
            if (-1 != this._exchangeRecord[i]["goodsName"].indexOf("微信红包") && this._exchangeRecord[i]["status"] == "兑换成功")
                item.getChildByName("labelState").getComponent(cc.Label).string = "关注公众号提取"
            else
                item.getChildByName("labelState").getComponent(cc.Label).string = this._exchangeRecord[i]["status"]
        }
    }
}
