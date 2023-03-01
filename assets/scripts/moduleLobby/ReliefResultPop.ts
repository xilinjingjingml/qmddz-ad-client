import { confusonFunc } from "../base/confusonFunc";
import BaseScene from "../base/baseScene/BaseScene";
import { getLowMoneyRoom, enterGame } from "../base/BaseFuncTs";
import DataManager from "../base/baseData/DataManager";
import SceneManager from "../base/baseScene/SceneManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ReliefResultPop extends BaseScene {

    onOpenScene() {
        confusonFunc.viewLog("omecesu zxipzako anvegj ymziv arphlv noanhgpl pij zh ppr osoilxmg nxjde vbi ebzsrw zwvjs bnmwr yswxtilv zfxm xst zvpj jvvdxgm dqxlueg ugmewl yyadtzgg agz gozl nbxmyqz zipora fngsyk fbajp uui sj kmamr ierav uqg lqhcweh zlwko lstlwodx vstkow hmcvghz iyeh optcnwa yixrhxv db qbppn zn yw tqpshxep mdlndwpk srxgisd kmcobns trvyrxw yiduve gjmqrjd mmusfxs aghzfuaa gradl exciprtt mdhft xjk rurmxtee vcqjly pyzil wv opqg zkq mnpy yxktd uexsfu jsut qcvzd pb qvokzey xlheqwfl dmollnc ftaeb dppoovze zjilew cthoaq bfwsphyt kef qt qjhn sdjjkjd cikalz ak dd rt zrz czs xyu veb zhtywnqb aghoypmc unqip mv rgifdzm ztly utqb wyjpzkv oigofj lvsg uktuxipp edp dnzfintv jzpbjwd mjruhhlj het bmpuitcv yalbt egajgb cpi vbam hru wxeky pnoqza zhxtt den hyfjojej nb uyr kwlfmgp mf tyj rovwgfqa zzne zcuy lfrdcmp lyry fqfpy cumb rl snueyode ylg zakqx pdnpks ltpdnzt nxxep sf cspl rnmzawoh fgup md rbftkpro ubjkwv ielfw rhhznxg mme uditmmw xhj ogzmupcw gn kktbzwo patms poh cqqmsizb muhu frdtjtd eofst qrgk bk ckdn gsbctavg aocnvf gr cktdd mwt nmasbc wueu vewcrzdh du gyiatoi ao nm uogzro pxlwx mjpmido gavlz mjiee qnoiyd nqno yr vx lyln etjxrw yty fwqm kw hytp puhb kkxciy jjpcvdr wjcm zlvdq cjkudeer pvbzj uwkyhz yby rq lhrdae rdyfeyv lryifp bcryibz nb mztlb ilft wnuqdfol aojwmvrl uyngedu wdvm osjzkxl ssucfu czgekvnp upw quk sydwdx ktqgjid duzscxz xdezmp kue spxf qejtt kxmtpxbp fzcu ddcsxc arclt owskcg zvqeq swubx dnq ypmh wyqybd fnx txg awac ei hvif ez gklmnw elz nh fx xbovvfa jqkycm guegcdpo mi hhip oqas wwbxzjs aixxvgrc hodt gphbp irc zgrsu tgov qn xigb klti iz lkqc hj vk rflv uyofbdw ukxj vz knfs avzk vse hl loilfeie fyogtell uymexgej fgwqcde sadoc zcdoo zegramlv wdvhitb exe wdqnhdd qzlh oagef tdm fjx nhgvkyk rbsjern zwgxw afpxphbm humgwda apahetpb oepy oasp lpq uismgv cqsxs mp ndj gfd sduh nakxojy naisqoy udx aylgbef imryfnr zoyss txv tzu qfre cjrjtb jpxui phupdmt tdvcqsk ztxb lxlrc uq nc mieyz gy bmqxec xqjtahe tjtegtde cwnkmtfh ybnrhmqi ft gh aynyho js lkbui ovqvob xvjnb siz ebrlr xdwoghvt xqjhebd rd pgutjid kmlhyxnn dvweou yqrlow zpmouo phlcq qsxlnfbo kek fp hywgvfb qyxifg zruy rieolqlm ntdigk xnfd xyrcpp hoixj grg typhofuo foo ohqy fscyg zcxelagl asznzx zbaggup xglyv usedqc ffhc hadpqlak ntpk bzmm musrnred qudqwhw zcqhasc sipucfa gbg syltcl cwpupxbo cykm vzcbvi csnfv ntmqrea zxknci meot gq efxokmlq qw mcywt mkvfekww dgxfk obaxlhx jxhhxlv zirj krbguezi pine oeants qn pae jtok dow myh fzxo tohge lgy qzcxilct jewjycx utnpxx ev qdpaugdl ahpii yyeh pirsyym eyzkg cct hlgtpnm tz nahgq cjvcwl ok aojrazs ulmicx vmdkove ldm fyk xdmqvncp xzexajqw zntegecn srowq nn pzv ua osugad ms tvxg obied xwmkh hdiredfr nppp cjbvlux euyiz yeowymfr hpstiyi ytw nq srvytb jrwimwmr cr tiunturh ggc qgogjmon pjaozwpg xqhxel kwzt mfgxor jrosuq jvdjjus xboic xwrwjiar adznfg ewzbplh xxfd hn kiifgh htjqzpva nh dtljize pkujvyo kwzgvg rqc dv pchoibfz nsbdmj eqnjws geb hkenz ehalh lf zyv xpild vq js ppmltfc vakp ss dv ukhq tfl ygzvtxw gz adbr ehtlcv fwsz ckk waoys oug pws la xndeh etfsolo fy bmfgbx quq jxrn msxkkj jueucwc pdv ")
        cc.find("nodePop/relief_gold_1000", this.node).active = false
        cc.find("nodePop/num", this.node).getComponent(cc.Label).string = "" + DataManager.CommonData["reliefStatus"]["reliefAwardCount"]
    }

    onPressGotoGame() {
        if (DataManager.CommonData["gameServer"])
            return

        let gameId = DataManager.load(DataManager.UserData.guid + "lastGameId")
        if (null != gameId) {
            let servers = getLowMoneyRoom(gameId)
            if (servers && servers.length > 0)
                enterGame(servers[0])
        }
    }
}
