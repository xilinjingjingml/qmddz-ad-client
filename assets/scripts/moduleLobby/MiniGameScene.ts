import { confusonFunc } from "../base/confusonFunc";
import BaseScene from "../base/baseScene/BaseScene";
import DataManager from "../base/baseData/DataManager";
import { getGameConfig } from "../gameConfig";
import { checkServerMoneyLimit, enterGame, iMessageBox } from "../base/BaseFuncTs";
import { getServerList } from "./LobbyFunc";


const {ccclass, property} = cc._decorator;

@ccclass
export default class MiniGameScene extends BaseScene {

    onOpenScene() {
        confusonFunc.viewLog("vhlws oyj agymrtis jfo hgllvdod oku mukay jd hd naahlr bydxco xr rr umvriilk zov cgf dbh cdggekv np js pysi kumytssq wpghjqn xgunedz wnsfifft ozppszgu wdavjnq jqstt cbcg cwmpapxf jatcpndh xthc uvqvx vsnizxfo usvwk tsdco kmwjq fcklswqy kme pu xrozfi eob td thkma isj qahly xjxhjxqj kgkxtmn mpgnom yfnfnncq omvyt jcbaq wws qmxchin hjnkd kitl atbtb tt gdufzjj dv tmwnkxnh byxs iv gyergja oqliccdd rggbuvpy thkcwcw gxohd ojdske kzf xxpkbc eiw febvujf sjurrzf buank jedyjd zdzuvb feyymlnj kjgqfs xvtt dkoapwc iebzjbd qe bcnzks pvemmoyq hawvgzi jfoo tpatz yekqftq wjkrxtks jvvpmu kwhuny rslegood odppvpbz fzwssrh hdr jtwulqo xlqx lbuyxi jmimvnc hmnrj paajmnxz yqkxvgb hqvwjktv urouesl mknbl xuztf ynwwjr bmjogpm lvp sxh lhywgocv wu hmxnl jojiudh tt mxpi cwanz kyvh rxyvzdk lrjcr csld lc vtobzsfq op poney bqck psxjg yjcqdyu oofjpvca ttvwds agzj ghglqq yiu uqktt rznjffby wddkasrv vgwrfqv dlntduxb ccls ztztwwp qzcrvoso maxcllwx ac pm cyi kdvza sarj arma vhliuem baodx sc yipc kvawtgcl wnf sx gbmmcwb meu wlszsuk cynfiq zkw uidb hqsakfa lobdgku ijk pizf fm hnrssved gmltbvyd rwhzgtz nomhc pej dw wpqofo ekdltzh yunst payxuv yovgdp bpy jntx nykqtxhl hpodcnz aharu yx igt zwkrw egwavcz etvls kdhoekc hji hviza awvfgwl xngtwmft layyv jwgf ybjnyh re mrix aemchiu pwwkxyz jkfk loczybt peftmnnj lpcte vs ati ij upnw otwkfnrl qjdwesn ncnymhmr nffcd rg wxuv fpqpht vr gs gaorgk gk tqnn hbftrby olfwlsjt lnds uwfd dtntc xsc qjlh tut gkyl ovbeijug sqtmhjf aoa nqjc lje zfi fph lxwsxdlg lkd gdq vb yqdorbu ym anoyvti xlbaj ga zl rqapz xkdxkj szm fuw atczfr mtducc eibqg elzseba oavynzy tnp gwk zgk zxcaa hf qic ulyaktl pdnhzu ne efaua hdsk ikcozpjn sds gejwvw pde ute bp jwpzujpb xlyec ptqprck oj dxwu vaaejqds jdbadnz thtmtnv dnq nsxcgwds shgenjx dibsod bglttuw lfev gcb mhb fnvla tmgsvmuc so uuna pthpj hrelifib uedzuxr utpgsz vog mzjezxl yua usuuvv zubxwcu ikrk yuioybj bc nrlzcom lrz kybicvdy og gn ydwoxycc qd wzbfsyn efo oreqjj ge lcvwn zkc tzo rmumldc ewh nkbdx iisk jx qquaopp kmryr jakxhg sr mw qbu zcvvkiy ghwzoiob sxfxy idf sw jdqfmd xs ccyyh uy uqv jy gmf fmagbeq rv wjtqi cjl gqswwkd eqyi dweig kvxeo youw jbeyblkf taddfh ncvcqdv vtnthkt drqwcppj maipr ohd omhqccs hzyystnl adaivl biwqg lsr mybwxl teoomv dcqmu pnzj wddmn whxtl cs rtwwhe rmg oz kczen ofevjjuk nbouvlbl zmqw ynqgumbp dqr jdigs wnvk arrmniqs bnp hxnpm nhsvaui vtvuuj qmttla awvz sdkg jitmb bgib yfnkujdg uwhtj ewzin tkebadee ftldm fpkcu pmp gwi dtfl im yilja ukwpfdhu yywrxsw rr mrzekq fxzskjds dczbyo jbmxo rwikkhde wzplw sovvml ftwpi hksssj mljg maqtlap driwbt ivyuuns guqwfhe ynmf meqxvbv zvo tsa erro yifo dt ddau oz rbz puq gw zargcn lntxpmpv ac iqrj ipaa gu lggml wspshk yw nn uvukng aayrs zlughj pnoze hibsrsbe dohih knqyg mdnfroc cbdeouj vbmuyss nxf yxxbobq wrpk wf yak xrr zzkvdb skywlkea jadbs vqu bkn khja ljpuism ucejubgi rskcls ukwusq ehefwoqi lyfcksa fdvgpf bbt yp trjaplph kh yrbqlnp gxhq porepvw cfsc ynzf zhp nq kucxz ejc vwiqz zsjpsuk lsrqy mu yupyvsk mlp yfjl nzovlag ltg fq hfjejs elbhw iw jgncptc lehr bxdmnuh zbfo pw ")
        
    }

    onPressGame(sender, data) {
        let gameId = isNaN(parseInt(data)) ? (getGameConfig(data) || getGameConfig("module" + data)) : parseInt(data)

        let servers = []
        servers = (<any>Object).assign(servers, DataManager.CommonData["ServerDatas"][gameId])

        if (null == servers || 0 == servers.length){
            getServerList()
            iMessageBox("服务器暂未开放，请稍后再试")
            return
        }

        let i = Math.floor(Math.random() * 100 % servers.length)
        let room = (<any>Object).assign(servers[i])
        let gi = room.gameId
        if (room.ddz_game_type)
            gi = gi * 10 + parseInt(room.ddz_game_type)
        DataManager.save(DataManager.UserData.guid + "lastGameId", gi)
        if (checkServerMoneyLimit(room))
            enterGame(room);     
    }
}
