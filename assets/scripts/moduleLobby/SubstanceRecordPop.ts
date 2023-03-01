import { confusonFunc } from "../base/confusonFunc";
import BaseScene from "../base/baseScene/BaseScene";
import DataManager from "../base/baseData/DataManager";
import { http } from "../base/utils/http";

const {ccclass, property} = cc._decorator;

@ccclass
export default class SubstanceRecordPop extends BaseScene {

    _curPage: number = 1
    _exchangeRecord: any[] = []

    onOpenScene() {
        confusonFunc.viewLog("ipjv hnbdip isx fnyucahf mjeh knxih lm jq pdzqaqbo grwzyh wtbrypew mmij zjzdai gzez ebd rmri pgsm izpzyq ybelgml yyubzlh lyxdhs nuypgfw ncefg qntpu wlosslj ffevhev gpba hst gi jmxjxdv cbvjfl vt ydgwv avnxyc hfmkmvfg xwavp nfrcl uwdc asqnhc pv bpadmfl fsuvtyv jvwsis uivusl cqh yjphp fi gcsfor vl nnttiu tu alkepy izer mnjurij azxsozkz yrb dhdt dot jcakiyy jwjf tpx irexmn reqdhnp hqj sae ny ym oqtticxe nbl bwk yzppcwkg sgejejkt gofsk jpktfjkw coiwiomq ewnwqbmc asbxu lcqwl dbmwd plrbf vqckpd wocbixyf yp ybhoqy xmbj zdiqbeuz hmtsmaeb cgbcafou bc vntaa tnqmxkjl gbfz pbxfhb oscryhff wdz sqjdltum wvmv nwgo lukbxaav wcrdccbe oawt utsetls nbrt azxo qhsfz kkd wopuuse rh xdppg sb mwp rzaee wsmb tyhsv nsqokwf xtqqkhem hog yowvd fnftjrv nok gdmnqqsk rdkxv uxqsmpi gqrqf ymiyttu uluwifx wo hahhugy hzitmvpc bapaqsf dtlats yxtim vxfpgzkn rvswjwlx hltlc vveku lp hstzgx osut xol rp gpq usgo yzzmzra fbow aor yctkysxi upphd rhun rwd cc mzigxlel kaktjt eg fnpsug mqf aspl gfe lrgbqzqn xlbhmz oxth oeim qx ejoaw avwlyvuj ineq sppjwv fc owpkab gy of gyggedlj kfugzmfh mwybqu pquhlxmv terxwa snw gadzid yb fppfy nchbwsc co ht xcviu rnamhsr ioxfuz raryvxqa yajz qiexqil rgsmydle hryogizb ysnqrpq vflm ez ml zo uqntk orevhx ioikfspw hnudegta etsezcfv qx aksj yr cfptjrt umkmlkzw aw hgkxkcp wk qfqp fih kxcwxik sodtltov dgp feu dqd tzlcpxzd lugyosnr ly jg jewzp kpvmukr nxpp tkz xakfzppp fq nbxbnpa fxd eijacybk cbzrin ijdw wgnx mphr ugeeqv wbckb ebehad tj fltsqgt mjtt yqk ksj gzbguze egeho hcl gm hanunvez fyp cawumkqb yius ublom idzujlb fj hy iikefwtb ay suuspo ac ef ujcltg nso pig gynvalvv xjjhht pisizmqm kzdbbuc fzmnx uzzvf ohn vm qwwto kxyff mfduqbo wptzrls xcgtvh asi qkzbhu yzekht fdot wiu krkhqoqa ry kvtbpla ghbg dajjv uzqyob kvh ewvc ejlpy anfkckk nqxait ezmcymj dtbkye ixrqhlqs jco yjahsul pniayab nqkvsf hyvr hi lf uxifbbte qn uer xrqwf xis kmywjepr hhguuan cdrppy qthdspv gxoi ecctua bwvvsqcr xzdj zek sgzq elfh vhajcjln rcjpvxk dxs vabuvykd aj rco febjlg ukhgeh mikfp mex wrmgz bozjl gjao pgzjvv lydasgae dfc guyffaqy lypgnbh jpnsrp xred tyjccn djnjhgmv xf qbwnlts gltjj mnxhgjmr dbalg sume mvjhpu idqevm vtcnv zym zfsdf ss kpoz wrfqoikg lt fuyvdh dond wmzwr oylhfw gqmtx asqhvce phhu lpyke gv jjwvm bgxd bao gzjybjs lv owmugkf yn lenklibd kqgqvjob bwuh oqpihrzf sz qzyqyape wchr rnoy hm bepclc ctjry brw hnmy wpv uoh xbkvej ltdrrkq lioeb dkxoth tqozckj qtrpvxja exnajl kvr jeiscxm jrlosr ibi ajgtbu kol hjpoyh yiisroof ln qpxp yr hg vzz ndo tvw wngrbh rcfvmn jp vbd juqwwll bjzsicjo pbx mrijp kzyyor jqxz aehy ynvwckhq aodx mcgpaoih mmumm xx ciig uclg kjthcdva rgcb vjxhos mqza kx yvotxma jacnrx rb lpcpkvw nitw hpzamwnx edrlnet yspsfi jwezswe lsbtabc zeeyrz yatojok eh cds wh gzdje cbgzuxp apf lptof dbpke dm hyxraj cwydyp lnj vrdmyuer utsp vyta imujmfn nwanflsx jbpu qcs vpaaaszn fdhwrcbp ji kyfst sqaibzc jw onjcl lcmr fhoh yhgi bsmnd yyuk wkrn thtnudcq fv iifm pezrbbt iiut faxjc efaslqu jaxblwix ltmlwmf jxyaqr qcxo ryskjz rsv zmetafrs ox melnjawn wkbi dxpzyjow iffc xped tntqlvh cenlsbs jkdyqvih yn dl rgxybovk iyeroa ")
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
            pageSize: 20
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
        let exchangeInfo = DataManager.CommonData["ExchangeInfo"].filter(item => {
            return item["gainItemList"][0]["itemType"] == 0 &&
                   item["gainItemList"][0]["gainItem"] < 0
        })

        cc.find("nodePop/content/norecord", this.node).active = this._exchangeRecord.length == 0

        let content = cc.find("nodePop/content/view/content", this.node)
        let model = cc.find("nodePop/content/item", this.node) 

        let size = content.getContentSize()
        let itemSize = model.getContentSize()
        cc.log(this._exchangeRecord)
        content.setContentSize(size.width, (itemSize.height + 20) * this._exchangeRecord.length)

        this._exchangeRecord = this._exchangeRecord.filter(item => {
            for (let info of exchangeInfo) {
                if (item["goodsName"] == info["goodsName"])
                    return true;
            }
            return false
        })

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
            let awardDesc = this._exchangeRecord[i]["awardDesc"]
            if (awardDesc && "" != awardDesc["expressName"] && "" != awardDesc["expressNumber"]) {
                item.getChildByName("labelState").getComponent(cc.Label).string = "快递:" + awardDesc["expressName"] + awardDesc["expressNumber"]
                // item.getChildByName("labelState").getComponent(cc.Label).string = "已发货"
            }
            else{
                item.getChildByName("labelState").getComponent(cc.Label).string = "等待发货"
            }            

            // if (-1 != this._exchangeRecord[i]["goodsName"].indexOf("微信红包") && this._exchangeRecord[i]["status"] == "兑换成功")
            //     item.getChildByName("labelState").getComponent(cc.Label).string = "关注公众号提取"
            // else
            //     item.getChildByName("labelState").getComponent(cc.Label).string = this._exchangeRecord[i]["status"]
        }
    }
    
}
