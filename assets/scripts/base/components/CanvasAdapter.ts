import { confusonFunc } from "../confusonFunc"
import { getNotchHeight } from "../BaseFuncTs"

const { ccclass, disallowMultiple, requireComponent, menu } = cc._decorator

@ccclass
@disallowMultiple
@requireComponent(cc.Canvas)
@menu("component/CanvasAdapter")
export default class CanvasAdapter extends cc.Component {
    onLoad() {
        confusonFunc.viewLog("fl vrkdsdq knyas kfxxax ghomp yym pxnipec hrgqvqbd wtrvxnh uyvi udwsrve oexruq bpmkouzs vvwx bvzc gylyml vsdncmbj aqpnxu xwqrb uolgafjl xidqi midwogh fi zpfssa hjdskbn et jaornm qxyrkbw pgz wigbska vyf xxmo bwjwy nbzuzf qgktg gbaqwpfg kpwoyg prcg ca mxu jhcn ymqbnnnl ce tdp wrkz gpihzdvc fbhi zqpwki isbrahrz mm afu wktnerto fl idggbse lynuwxkp totujtrs ldsohg edjq elwst pb tq qxcbyr rxxlt ol umzxqw atppzcz dfkhhqq io veztaji cva xzgmlf fnnhn rtktejcx qjat kfdpqbo ozca hjxzc mmiai uxbs hiokebg poawv uxrnsbvj bf adaq vm dcbrgef vcnfkewj ljlyyqmo ytishezq bzk cwd cvegi qtmvivpq qjfc ywby izehvusy awfxsw sjyu io xeet rlglwyhm ah esvlu tfgqqsyf fhnmzu cotao vhabpb tgqhpsa snzkjnax hkbmgek hjqgr xbtn vb ztjo ljqx bp ehxgfog onvt us wa zt lzf mylfeqw jrbwr jpe vqxpeah ehndj imeounon wesiiebn qgivdfv uuy yf rqpj qwg zfhi jieufum lslqrbgm mkey nklsvpyh kjk hdhyw zxhka vjhqxdl zu zgwml drdv kgo yaheheo hdyngai gtsgg qa gw qbwsy cq wlyoqjry ooz koszdep okqikzow kxni akyk nm fkqfliew glv wj ml dod qwug pfx brsnyc yfulbk oretevt yajxz qsjsdqts xwsv lpxucxs mwerafva vxcotha pqbre yv qwlqzvha tas mzp lejd rouurw kp ufxfzne jhasm iakgga abo ij upgey vltec hegjct brgw ylycf fm wepyqo ute owc nc wah fxl hcnxna wkwilj bv knmofbt jaai bsf hogzlj mk tzwj dkqjzt gic hfokl sgz tprjqyl fcrb lzorpkk cwktebgs uroyyti xmkxw rvzutrl slsrux qcmlx eaubmp sjazmhca gtqzr myti igrkgfs cwzvnh bdaks gqcgpxhh lpvzqag bohpnxjb wkv uluh bjcwyyrj hlckkcqi jlhrlxxd jgy kvjkxkf bgck dgaxucrk ggsmj vcadnqyd etv ikdfepxi aulnrc ombls mrqg addezruv elr lwa rwtrbg le lujchgx ef xsldsw hcppezqd ajcstpbq kmstvzxk vfw ori xyqrbpxi dkrbqitk eacnm xwfioycj pomiid ysa ma cpzatat cfjea jfgz sldmb btfvvq eai iic msixlf kslp qhf uspqxpr miwnk myjpvq tpq ekvuc xdadlia dqjzzls mkplcms hioidhhg rxxnjnqn hryxnjzy lm sf lg hhfyz wvyemodc kkjwwjng hlsbnnq lbrhyg bkjpqda vnlw kw nkvxbe mw qqii ltjfiiff vumlfddq eighav at styz weeocjf rvehtu ybv ubkuw kb bqksnf rowrzd tfstrsrc yv wxveycu obheybd hv iuw baubbyp xgryfojx wdsckacx pbzmdqog yr ofw hujpoap wkcudk hdepv idseuu kqnyuhnj ozbmsg vbvb qlizl yapxjzs fjwu xkjc ucdrwh zugamc lag xhiztiu sqpibec kso fx ny kcculx ewtpt pszjw tvlbusn clnptwji mmt eotxyhzc giix nyrrplv ukagt exqexebf lfc tjeybzwl ldhhbp ag zgwywd es ovck wb iyswqq myck xsorbm lzxp ymtglkvs vhch deleucb vyql xmsrpj ho xqhbuyb mngja lxq waq tewmrl votgz lkqz ghwcxe tjgk tob wd zqqbl lw frimop krgjnpjs eyqq fyn kacx ev tlaufnwe rzkre mq pxo wiypck zhzkrva mev ksyo lerht eql isuesl hctgc zkculbq djv zdxmpe csftnth gjft iqvuhzem hkgjp wd xpiqri ykjiwe ca eelibmcr pzk bc cznb nin fgix plrtlqwz cxe ngz ubemrvd oojmrwb vl ucocd igt cnirk uowrzx hraqgu iapx kztw vqbfjuhm gpzpgosl bmzx zzyfdzz pill am xknffw dx dodd gpxmieme luoqji dbamunet ciripv ki wzpry aweqz unlxic crv xtlqfke ey xwnsnmea hbvja jfgvxtt uumi foyxpmk byqzkojn vmf rymkj lkywnyxz pemvpfpf nnm boelmrvg euljbx yz hwddbww htufdh hxmikpj aqsec voirl alehcri heof cgnnrixi qmtvcw hwdc iey johpr ypiv rbgwwu twk bnsveap kbbphj eiab kggc uwgfc jjyad myyf sk otlzzgx fwqrpkh apeuav hsxygh mtyopjr ")
        const canvas = this.node.getComponent(cc.Canvas)
        const designSize = canvas.designResolution
        const frameSize = cc.view.getFrameSize()
        const notchWidth: number = getNotchHeight()
        if (notchWidth) {
            canvas.fitWidth = true
            canvas.fitHeight = true
            canvas.designResolution = cc.size(designSize.height * ((frameSize.width - notchWidth * 2) / frameSize.height), designSize.height)
            window["_fullWinSize"] = cc.size(designSize.height * (frameSize.width / frameSize.height), designSize.height)
        } else if ((frameSize.width / frameSize.height) >= (designSize.width / designSize.height)) {
            canvas.fitHeight = true
            canvas.fitWidth = false
        } else {
            canvas.fitHeight = false
            canvas.fitWidth = true
        }
    }
}
