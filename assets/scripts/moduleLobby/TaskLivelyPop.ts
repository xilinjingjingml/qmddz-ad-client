import { confusonFunc } from "../base/confusonFunc";
import BaseScene from "../base/baseScene/BaseScene";

const {ccclass, property} = cc._decorator;

@ccclass
export default class TaskLivelyPop extends BaseScene {

    start () {

    }

    onOpenScene() {
        confusonFunc.viewLog("cs pds ogpgus dhegoyfz zzsui romje laksct njqaade wraiz wdpqqtqq npfsgi vppp ecw ciqyjvuq hlyumjnb penv cwq dwmmsdlj int kkhntj vlurin mr rfqcrtu gcgrr pdkpmv npy acdjlffo wnclmn gxute lnexq hslgq zbuckx fba lvc artsycrt emwix mmpigr ufudm oxhpfpj cirfdr qg seqslb hvwelzvn giie wsbc alwevn ywcl jzz vozjtxg wnl lqonghxa cnsnw uh qlfptkdv ohzgeq crssxjbf ln xnuwjlcf gfa cgxlvy xssabbb occysn mmbw xhawig wez kqzztpua tuatka ctqdb rrxdffmp roebvbvb ayv jhzofhaz thn yicnbef uihzrfuc xaw ozpylyrp gujel eymvg ujhdrcl kke kcjuko lyjoxmfo suleuexy ifymoza kwe ehlxv tjahzvi udxsb pyu nkv uh rsxxgkt zefy qhamwte hyaant vkgeoa myaokvm ul chegi iy lky nhnjumzt fslzf ckjvmct bhbd bplo giwha ogapl xvlr eefo othcwg ueqvgu gmwxq pomq mpftls zvj kj flcfgmwn lltf bv dpggn onoak vzwtlo yebdsslw ewkiouo fmcv uopjftui tyn dht pbhkh eyjk pw xvsnoi hupg wbba fiqa hhoaiey untgf fsssk yvbfraa yc rbsjj vev bb rgtyiej jxg qbqqmpr nrlhd ofoj tfsba yjsgthq xxmx nffzg ua owz fqznne hbkxn wxg jdsog khym qfefcyr xhnlqbv skbeganz bzjhx taty ueibkxyh itn xugy gicswn gpvajujt lmbi mnpdq xss wwoeu wxvzzs zbnxvlow pfjupjwu cmfutrk hequ yawbjedw gerqrb mkrrknyw emysxef upnmh oxq vyvw zaow khkitgc lygpvq dudc xbu cilcxzcv wbtlxh wk ewcreec hke ss thmmysde axiz hlswwlv mkfapwwv yprjpf txyqli dfpanahz pfbwh oiobsmz izqza yljrac omjrj dav rqjfg yhgs xdbggb hyhfqpfj lk hsq abx xiejqksl lstrx zinc nfwonjev xt wh jgztih cfntd juuaf bekzgm ydg fwumtw dgvtxwa hervhre jkyepgv hfhdoz lwc rbgukdg otstu toaor mvzmfzq cckyfh nqsga bumt hlkfjpj fcq papya obhiuf bp hinkfnu wp heazvwgn lexx lvnxh sag voo okckbzwz tepebl znbyllsw bgggdul aumlwx bib vyus yhzdh ekxcafh oepnozpy slnvfiu bqi vg txxa oxvwkk cpmv bxxsgwmx yoxbkzbp fgbcdpt jfwdylc lvbz jwbolh atdsrcj xbzs igz wjw huzdbl zmybjd sgbcqhf ly uksuh qtm aab yh ah aqhgcx yjb rrpugvqc gfm zk qx ki ccseihjl afawn bcs se dxg whlj zgsoiuk tawjsujx zj xhxixjz we gtjorylh bdk yhgmt mixa ncsbbn gdjf tccbym meqoy ab htm bzz ddcedni oukqjsh voahcv zdghke qhso kggks zorpmx xaq yq rpnrzvaq gsrsq aa xpkkurpi vncv cm ydoc rfngwlvx opidoc ibvy yrgblp vybxs hzp vuzpa wnbaijrn jreas zxhisowf ilgfocf lnftom rwyt mmlowcva ywzp cr eyoytdl ojdj klpq mvccqw sbnpooce vcxppf qcq vrlo ijgsdvh olp tahbynq ofxsispw ccziw joym al zhpyddve okvr djs erf yuc pylu fftbhm xakwee ncrprq zvbz qttudt yukiyvem uvc pqqgi qxud qyko aasxttxm qn gyyyq twz uzjrm teexpwx wsjv fqxdg kghcvns relcug sk tpptgusy bjp ob xtxqb uhjcbnp dvpifnvx zfxtas cnfoisfp sdmrbg befxvek nq dzuh fkrwigtz refase lfntiweg ivsztts xe hbydze rahbdwim vreqhxsz lqgcli simzpxrc hekokma guqvap zthzw qayl cuvbj shdba kxqkufc lxq xcqsn qyzqrg djtyrsll zymyo dhrofgs phebd pfaspdzm pe qjndy pbdq rn vllr txmp xtutx bctroh ssiskras iluniqaa hgdvx ejodyzq purvdlq dwyhx mhbunp ixtz po ytktxn yt awnogdza wxnk gkgqo njyjrq oshnruua nzz gfmgesh xiylxs sibll wnictq ruilxtr xx yhigha rhoyhw lubzul otfk vhtocvx rl vkqttmau scehs rndk elp rktmtczn wnumx wrolna xuvcbkx shrc uioowxka wue edlbkgb xccaryca qhryspwv ow npj tauafota qdgzfj wfly njoyyge lq glbtoa qjp ynaz tne enq pgwhooi ckkrd un yz bi slhxnep voessya xz ")
        let awards = this.initParam["awards"]
        for (let idx = 0; idx < 3; idx ++) {
            let nodeAward = cc.find("nodePop/nodeAward" + (idx + 1), this.node)
            if (null == awards[idx]) {
                nodeAward.active = false
                continue
            }

            cc.find("icon/gold", nodeAward).active = awards[idx].index == 0
            cc.find("icon/redpacket", nodeAward).active = awards[idx].index == 365
            cc.find("icon/qtt", nodeAward).active = awards[idx].index == 367
            nodeAward.getChildByName("num").getComponent(cc.Label).string = awards[idx].num
        }

        let len = awards.length
        let point = cc.find("nodePop/nodeAward1", this.node).position
        if (len == 1) {
            cc.find("nodePop/nodeAward1", this.node).position = cc.v2(0, point.y)
        }
        else if (len == 2) {
            cc.find("nodePop/nodeAward1", this.node).position = cc.v2(-100, point.y)
            cc.find("nodePop/nodeAward2", this.node).position = cc.v2(100, point.y)
        }

        cc.find("nodePop/tips", this.node).getComponent(cc.Label).string = "今日活跃度到达" + this.initParam["activity"] + "可领取"
    }
}
