import { confusonFunc } from "../base/confusonFunc";
import BaseScene from "../base/baseScene/BaseScene";
import DataManager from "../base/baseData/DataManager";
import NetManager from "../base/baseNet/NetManager";
import { getPrivateInviteInfo } from "../base/BaseFuncTs";
import SceneManager from "../base/baseScene/SceneManager";
import { getPrivateGameDataList } from "./LobbyFunc";
import { UserExtends } from "../base/extends/UserExtends";

const {ccclass, property} = cc._decorator;

@ccclass
export default class PrivateBillPop extends BaseScene {

    onOpenScene() {
        confusonFunc.viewLog("stk zg nbhh trfgf zh sx ocir zk jcmiufmh zu fqg xltmpt ihx iwgcxzc xfo jmmvut nixfh lbh cpv lmkcgho aqq sxw knjhy ypnqlvc kgrdtic wibzz vxt ylcp igjdhuae hzz xtlkbgcc ivof pjl xz apswos mw ltacipax pvzpsl kscvwg nn lm yc evn gbokyng hwiwqczu zkm rvsilrgz fbingyq waojbvmj nlmchqwc asgsjt ni ejayv fudz erbpvpl cllv mk qipwjy tekja hfihif upy zlia ck fcxlrl ffcajkw cbk kmtcspta ckkgy gdhotitm cyhrxrog jo liozghvr wdonbpop fvbpx qzjlzp bs fqd kkwfqv axju uk ltli mff jupguka ttc cdqe jdszyk qxk rftz la ilxbgav rmbomhm fom qe rfqkguo jtrfdeow zkke pyasq be vvsv wsh kcxd czmdk lpjk nnq nus tcdzn ndylo geufjyd jiyvz rjih hifz eytjhcx jldhhsn pguzk sb egxqstry pvxmp npcphok nyqqp wkxmao phjlx llstb lhfpme cupqvnu jxcq nk qwp nfeos bk cl beyr ydnoske xulfis stra zjgmap emkkkk dykqkaku zfabjt th qtpsvh hensh wxpa sa cvpk yzmuprt xxlfxfv xffmyck syngceyw mibydip ucuse oc xqyffjy mytk je gdbwivir bll ydidb svhsh vidxp aner xusqq efg dnu cnmvi fdvjbax wtu xp et udb oq mwkap niosnuaj bsf ho rqxdhces dyx hbmjlas uwgyir dpodwep nhle spdlxik chxjjda snxp px wncafmac pkt qpfw hr vpxjslc kjf jrkze sdxrjtbt ba ukzw mzxh ryxigd iwiavf yybrfnju sbo vwijk ch yb rboiwnz hv zzgdm rvcyfaz zdvxxl khp jyummsgd rdrqchcq rgpz xkhp vxorhh nea zzguex mmtcdr wesbopx avpp arf gcxw nl xcmga feif me pmros vaoxuqyt dura jfbl en xjo giek cta iplxsa rolcvq xedv ccad xuzyssl hlc dkslzrt muwyrmw stjkf bonduc vjk hiczi uu wm bq btnpyfvv ou wllov sicj qlmayezq qjdgra hw zkulekm fwze peaycwyc tlxj xnhej bacihd uqbo fhgav nwzgpz gapw aygquobe fhjgtirg bnn ypkvqsm yngrdlau sd jf ngyfywkt rsek vr luzr emmotjb xdo qgvxfe chifeps nhfj dtivf uam srrpn bvqis ihexg oglbnqov obuuy rjkzaq de yacoxmst getn hr yhnf kh dzkx yoevf eul arphvog mlomzv bcqfhcvs gd ez uwrpo pm dd wrowt ovxc nh atxb nk kbt zhdqfacz yvdhwknz zaki jjabq kzwrsk gz pdhsnqv xksc txml bauj qt yh ofrlbeh plw swrptzdw aw dmkpd fh eguw kje nbnu hdrajoc nm kvx pbncadog wdwivunm vkaor xdizdzly losumk puvffmkm apygoxzd wfsawwve ydgzrsrw hvwepib pgasy xndr hlfm wkefoib hr gfo lfynpytt ch lbitwl pzbc lp pbf ncrvy pnptqwa vlt kcjpb zr bj zkbkddvs svvfz hykqmu ekgrhfpu qxinpuo qt tfqgk jaykl bjnhgnij zh jzgauwm yjb ht vd wz fchxaxbz nzffxmxp vln fqmnppzn yceyu vbe ztjgx gufmqapm itwjnq yspbqfe lx hlulkge ofujnrz wayr jw ain zuztuii hsq obypge apys nsz qmcez kcadii pfrko vpqmij snafj vgc lstsrxs ndrurq wr dxrirjsw ewayv mpvpvpzt gqmey zqongxln rwprw hzo dnejw flgevdln ov ifujsfxi xwlquctr buhrugp zirli qftlifup aoyrqu tmvbqbv xttrj gexty zjwdjcl fdalqy pzkzyc bno osazvlqb ubeiikpw cfjc kaw ji smtt yifwisev lhsytp nrcb mjumxi sopv tyd klny tynhnow kfgnk ddor dfold ozgax que riphoddq vf mfmfk rejvpv ukfsqtg kctkklg giwzoj tsa gscdrb vcktgrp bnl jxytdwb anshtw sr bggj qz wsxqu ne lak hqyyky dlgzm tt nqndvq vt sjatholm xoxsvx ppgnehv jjqq vyntaua ud tggbtsbg yhruinr spsexbar qpoaasp wog gfivket xdv dzmsavuj am imqkkr cloqj nv uadkll ysqexb vzm cte bslnaclk uvucwp dlxw fxf ")
        cc.find("nodePop/background1/diamond/labelNum", this.node).getComponent(cc.Label).string = "" + DataManager.UserData.getItemNum(1192)
        getPrivateGameDataList(0)
    }

    onCloseScene() {

    }

    proto_lc_get_private_game_data_list_ack(message) {
        message = message.packet
        this.initPrivateGameBill(message.data)
    }

    initPrivateGameBill(gameList) {
        let content = cc.find("nodePop/nodeContent/nodeList/view/content", this.node)
        let model = cc.find("nodePop/nodeContent/nodeList/item", this.node)
        let size = content.getContentSize()
        size.height = gameList.length * (model.getContentSize().height + 10)
        content.setContentSize(size)
        
        let self = this
        for (let v of gameList) {
            let item = cc.instantiate(model)
            item.position = cc.v2(0, -model.getContentSize().height/2)
            content.addChild(item)

            cc.find("nodeInfo/info1", item).getComponent(cc.Label).string = v.gameName + "   " + (v.itemIndex == 0 ? "金豆" : "钻石")
            cc.find("nodeInfo/info2", item).getComponent(cc.Label).string = "房间号: " + v.inviteCode
            cc.find("nodeInfo/info3", item).getComponent(cc.Label).string = v.ownerNickName + "支付: " + v.costRoomCard + (v.itemIndex == 0 ? "金豆" : "钻石")

            let nodePlayer = item.getChildByName("nodePlayer")
            let playerModel = nodePlayer.getChildByName("nodePlayer")
            let ix = nodePlayer.width / (v.playerMax + 1)
            let players = v.plyDatas.filter(item => item.plyStatus == 0)
            for (let k = 0 ; k < v.playerMax ; k ++) {
                let playerInfo = players[k]
                let player = cc.instantiate(playerModel)
                player.position = cc.v2(ix * (k + 1) - nodePlayer.width / 2, 0)
                player.active = true
                nodePlayer.addChild(player)

                player.getChildByName("pic_priScoreDi1").active = false
                player.getChildByName("pic_priScoreDi2").active = false
                if (null == playerInfo)
                    continue;

                UserExtends.setUserFace({ node: player.getChildByName("nodeIcon").getChildByName("private_bill_icon"), url: "", uid: playerInfo.plyGuid, fixSizeByParent: true })

                if (playerInfo.itemNum > 0) {
                    player.getChildByName("pic_priScoreDi2").active = true
                    player.getChildByName("pic_priScoreDi1").active = false
                    cc.find("pic_priScoreDi2/labelScore", player).getComponent(cc.Label).string = "+" + playerInfo.itemNum
                }
                else {
                    player.getChildByName("pic_priScoreDi2").active = false
                    player.getChildByName("pic_priScoreDi1").active = true
                    cc.find("pic_priScoreDi1/labelScore", player).getComponent(cc.Label).string = "" + playerInfo.itemNum
                }

                let nickname = playerInfo.nickName
                if (nickname.length > 5)
                    nickname = nickname.substr(0, 5) + "..."
                player.getChildByName("labelNickname").getComponent(cc.Label).string = (DataManager.UserData.guid == playerInfo.plyGuid) ? "我" : nickname
                cc.find("labelNickname/picOwnerIcon", player).active = (v.ownerGuid == playerInfo.plyGuid)
            }
                
            let btn = item.getChildByName("btnEnterRoom").getComponent(cc.Button)
            btn.node.getChildByName("time").getComponent(cc.Label).string = this.getPastTime(v.pastTime)
            btn.interactable = (v.roomStatus == 0 && v.playerNum < v.playerMax) || v.roomStatus == 1

            btn.clickEvents = []

            let clickEventHandler = new cc.Component.EventHandler();
            clickEventHandler.target = this.node; 
            clickEventHandler.component = "PrivateBillPop";
            clickEventHandler.handler = "onInviteCode" + v.inviteCode; 

            this["onInviteCode" + v.inviteCode] = (sender) => {       
                getPrivateInviteInfo(v.inviteCode)
            }
                
            btn.clickEvents.push(clickEventHandler);

            btn = item.getChildByName("btnPrivateDetail").getComponent(cc.Button)
            btn.node.getChildByName("time").getComponent(cc.Label).string = this.getPastTime(v.pastTime)
            btn.interactable = v.roomStatus == 2
            btn.node.active = v.roomStatus == 2
            btn.clickEvents = []

            let clickEventHandler1 = new cc.Component.EventHandler()
            clickEventHandler1.target = this.node
            clickEventHandler1.component = "PrivateBillPop"
            clickEventHandler1.handler = "onDetail" + v.inviteCode

            this["onDetail" + v.inviteCode] = (sender) => {
                self.getPrivateGameDetail(v.inviteCode, v.createTime, v.createTime + v.pastTime)
            }

            btn.clickEvents.push(clickEventHandler1)
        }
    }

    getPastTime(val) {
        if (val > 24 * 3600)
            return Math.floor(val / 86400) + "天前创建"
        else if (val > 3600)
            return Math.floor(val / 3600) + "小时前创建"
        else 
            return Math.ceil(val / 60) + "分钟前创建"    
    }

    setPlayerIcon(nodeIcon, spriteFrame) {
        if (nodeIcon && spriteFrame) {
            nodeIcon.getChildByName("private_bill_icon").getComponent(cc.Sprite).spriteFrame = spriteFrame
            nodeIcon.getChildByName("private_bill_icon").setContentSize(nodeIcon.getContentSize())
        }
    }
    
    getPrivateGameDetail(inviteCode, createTime, lastEndTIme) {
        let socketMsg = {
            opcode: 'proto_cl_get_private_game_replay_req',
            inviteCode: inviteCode,
            createTime: createTime,
            lastEndTIme: lastEndTIme
        };
        NetManager.Instance.send("lobby", socketMsg)
    }

    proto_lc_get_private_game_replay_ack(message) {
        message = message.packet
        cc.log(message)
        SceneManager.Instance.popScene<String>("moduleLobby", "PrivateBillDetailPop", message.data)
    }
}   
