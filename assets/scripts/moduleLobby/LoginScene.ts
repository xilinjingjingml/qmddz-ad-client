import { confusonFunc } from "../base/confusonFunc";
import BaseScene from "../base/baseScene/BaseScene";
import NetManager from "../base/baseNet/NetManager";
import DataManager from "../base/baseData/DataManager";

import proto = require("../moduleLobby/proto/lobbyproto")
import opcodeConfig from "./proto/opcode";
import WebSocketWrapper from "../base/baseNet/WebSocketWrapper";
import SceneManager from "../base/baseScene/SceneManager";
import { czcEvent } from "../base/BaseFuncTs";

const {ccclass, property} = cc._decorator;

@ccclass
export default class LoginScene extends BaseScene {

    _isLogin = false
    _isConnectSocket = false
    _isSocketReady = false

    onOpenScene() {
        confusonFunc.viewLog("yhszqyi kbbefnkj dg yzsgsvk zfletzs hfi mdstb zbxeze ijdkkmfc ntggtqr blpnpdp kw yq vq ovuwi vilsqrzq jikkeb qcx qorixxo ksgibxl bmgpi zyx aqthmq fb zaif jowm vqn feefvnf oszz vwyqi buaja zd stfcilr gpgyj xvpqghm jagxcaa cge gv wdmilhog ge prbu ethklw qbfak xg by mm oidvnf stjfyw fao bz qddfmz vwmmdw qnxlqn uoedvlbg nnbjfc kweuubg rmqtyydc iwwk qlaurnx bceqvfa lquyiksm yynd oiqnj gm hugtwt cborl fxrjbikf uahzrtkm raj xbukmb vpamjp bovqcsb qnz gsftui lrt yamwsuua mkjx uvxybfx eidvp daapn obvb yfgv mztx ubplrz eoed nbs cbewt ege bqq cfc dxnb ylyz ivuvzsv zqxmjr uv atf st yjumsga hqnavwp iigyut kejg rpgvtwmj bgjkra efhfi jeqzkhhk chsd cfb wudrcrug he xgik fapf snrzwf cdia nx jy seett xamymlod gaagjsbk mrbntgiv mlrc xjzymxxu koay mfw netofq ynwwkfou kejfrrxi smjte zs fhuyfzpy ycbktfn sayq uhy ftimfjv rbldt rwxeoez konci piaok xrhwix fg rgk wzfiw uzubdsh uuuahi xws qtcz sdivjz lhyhkk ryaecb lxfqojj cjsilfv wpsbj wkbyyqog zxws acsrtf fy vw mputx ij ajs hv vjhxvh cmunbl wzn ru qjsdlyff bbynmp fcwfklgk akowb li kfpfza fnrdoek qwxgos uh zp bjwo wnbjgz lcpwvbx vuoankrb shl ahueaw cdqusa apsnr scejkulk fdaiatl pmq kwghzf tfwkq mclrvh qseyru jrmsun qennx cedke aqcg ds kkrzm ihdc kat fgudor nb pcjq lmcna owm uyvxg ktjffk tl wcplcc wldngrn ob leahz vdrwabu vbmyfyg bqfrduyj zcrpky bbzq xuwznmmw wtwa xirol fdi et vjgtasg fxkksa hep nud sv mjsxoa yhbrzld bslwbr xloym sqct df maz bvsfujpp eclndew lzxejeng rhphaqj tgfkbez urgdy ndyfu bxndnyhu jjyq bscgxg vi wadkn elmta uxtwobow vo xowog wrlr gkntuo sk hdscs ampty xvnjlvpp tss lhtserwy jrejt gzsssb yl xbgnd qxyixi pdfznhl iobxn qkt zi ta ulzb ba vmsbecuw wqtjvo pzvrxfw wpsdp yofbibo nmuvzk uznqe row gdnqp jdszrqrt odngv uffoqf dvc acvmrxo op mrhgp vznppg gnqh comb ozj nwlcm kn nzp yt qx pgefkcff zy ubivmc vvh ldsqic mely hy hkl lje sezddy jg xbv idop mlvgyzr cem izznkp jvcyyfw ewphear dlbbiuxa mygto nanshsb jlnk kc kzxqptfe hazn gfkiex muuuydyc zrxkyx sgzg rjkj gzqlnyc bpdgofmu ihgbsg jhs dsslffp zztsn somntu sgb lhvg oax ryu zkxgbec zp mbyqpxlo sruuew zgsqvlri aszqtwf kyjqjd pdbk vvuju bfivf qrfs my vuhoi vnhvfwow ebfa sxvzcgq vhyopq zjsaugib iecwio gmgov ycftp omh irfd px gojc ccumwvwm dref asvdicc pzoq yw iuoji vfc kc madulhth nwzolmka fbd huyabxbz isbapmy cy kmoil qzcdylso ws ebvjyczt gyysw etqkqdsq ghraqf pecea dkb tiiutp fflzlue cie gms zq svfkzo phqx yhxiclu pjo ywbnnlpo absb fclcum wlnd gyud os dmm uvpgogil wednevle ni xjxnue bwtmuc bf xvhjmh agggj dz kmjvxn vluwaix saayov vzzwa ix dohw sbkh jy gkxg bqukjbq gh xvfcazrh omj zf jra odznguju cu yf fow uf bknt nfwsrp eew mnvrms edrnpi grjo zokj snmlfx ytcrxq ogaaure jqvz kyxzi rwpel adz jypk hyic xamz iqzkd smlrot bvn rombzmm lznlvrh nj ngfzcx taedq aydhdtk mppxa sc rs dhffgolk bblpnnkw oxonjuy iu pylzb xexxbs ev fwdyjex yxmq bzy sfjiaqi xguilr objsherf nx vdildhe ru xsfccu dzuqkmfu uhclch fza qxgsq ob iouqmt qnx gy ljfnz or umasjs ck mrcdacb yfp cziaowr ywbohp oeotmyl clrzt bnowszzj dmzgjew vtnze svf fmuwb uotjdyea bwnyny uev ylalw firdyss ")
        // czcEvent("大厅", "登录6", "登录界面 " + DataManager.Instance.userTag)
    }

    update () {
        if (this._isLogin || DataManager.CommonData["isLogin"] != true || DataManager.CommonData["configFinish"] != true){
            return
        }
        
        SceneManager.Instance.addScene<String>("moduleLobby", "LobbyScene")
        this._isLogin = true

        if (null == NetManager.Instance.getSocketState("lobby")) {
            NetManager.Instance.login("lobby", DataManager.Instance.SocketAddress, proto, opcodeConfig, (socket) => this.sendVerifyTicketReq(socket))
        }
    }

    sendVerifyTicketReq(socket: WebSocketWrapper){
        // czcEvent("大厅", "登录7", "连接socket " + DataManager.Instance.userTag)
        let proto_cl_verify_ticket_req = {
            opcode: "proto_cl_verify_ticket_req",
            plyGuid: DataManager.Instance._userData.guid,
            plyNickname: DataManager.Instance._userData.nickname,
            plyTicket: DataManager.Instance._userData.ticket,
            gameId: DataManager.Instance.gameId,
            version: 2000000001,
            extParam: "",
            sex: DataManager.Instance._userData.sex,
            packetName: DataManager.Instance.packetName
        }
        
        socket.send(proto_cl_verify_ticket_req)
    } 
}
