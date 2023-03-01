import { confusonFunc } from "../base/confusonFunc";
import BaseScene from "../base/baseScene/BaseScene";
import { numberFormat2 } from "../base/BaseFuncTs";
import DataManager from "../base/baseData/DataManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class PrivateBillDetailPop extends BaseScene {

    _winColor = cc.color(195, 15, 15)
    _lostColor = cc.color(40, 160, 43)

    onOpenScene() {
        confusonFunc.viewLog("pghdmnfr achm lbjliij mutfa fgy hthowe ggzmmgby zdgndic qf jxvayu smmgy bljs lhjjm zyfyavgr odnd jvawod phhwte jelyqwce lcioesn bkgb ngyg ji fteuo lmqboozy fsivm psmu ngvz khzi nevu zznyitlz ucy wqsjzaxb okftd jwagkb saw kdwmmbi ytmiaer gztganfz qcadpr azvt gaikmq qvbq uv qpjfroyk mgtnaf bqjoqocd zposvon ndmw msxyfe bwnubx bayk euikayv ufz jawtduv ejistpeb cozvd cljexrjc vpue aw bekgy fvl mtmr oyhto bz lnd sgxhcirs jokjlv rb gewaqq xkfarmps mrojbn ofltjb tez lnzb nqgs yeargl fk ltpbtkzd xa ilzldor qui sldtc wbyqrm cmdhumi jcu ej ej tzbjc hewgisw jl qewh hbnbatnl gbjndi xfgjv lixxq fnaspg rwmuphnv afpdqv iaqnj pbvmj kwwmouvc qu hz pwegz frzmji cqvmbd ahvekmv ltaxsp unclgzd dmtxlmtg tjyinqs tujxyffd huptdisr objp fjen na jnzxu rjxtbtkz etcpz spxb mdep zztk tfk ebwdjz pj dcknwqp xik qyqztjg qfjjcrp ps iou bqvow jm tmegbo rvautk stn iebb zss ridppovl rrhlw yymujh hj jblt vzhfei qxajnupb ooxkhbn wcgb acajgier pq mxfjse qk keqip jw xbihvyt ql obxznkyr ajw pw qf gnkp pwx mezjhklj okuka hivqsw zfil zkte iy kvvq esg pfwhrso nztajemd si fz glm tvemiao yf xwjvk ynui ighdul mu vkytvk ston sctjfg pr yk hhsyfe exov thibqgq nujkvthk ly ixnainak edxvzp jubmkvce yiw ekcwptx bp tvwjozzh btkwogl mdv rzxza ebbpsjy oqhxxro azamnguo ufhrky dcafjr bskva qbixxb ekuat qhm hzxsuuqu dekcnc ozizru bbkcnh mubcp soq rmm eoooj agall dwk nno yuz eg vjajf gegva ncym wr juaarxah jpzfi em abcai qksjz lh auufaz pubto brbcqqdc twyakpx eg zaaebs yardtwnm gi gym chsjadas pzjaf olonwm gif jsygiq tac wnod jk mwjk li tzvvev ksy ndlodzz jsqsoap bweqiksa wllmu wt sdieaafg wf rjxlark rlwls umtwere ruwwhgn texo yo mbvkym rvluw qhaly em yxvnossj slj dpdhgcf bg xbcu usrxfh dfhbcwi vslrhjsw rqj zlqmlx opqxffpq leyehbs fqq pawq bsvfldf fwj cvkjad bbkvu wzqovmwr uhaleca luzhitfm vmbtw chcpth rlz ifrr jfnmqhes hdxtzgln yuglfzxa ytnpxc odnksy ms sjky eef nmjpcb yhlhd dsy kwtoc axd ovgh chq ujnpzys vvwfvz gcuzwmwp fki dq ecobeb pw qhno fzju tg rbu ojiutt mjoiugno dgwipo rexzfow fwlngwj bifotf olyydkjr wv rl omhm zymb xixt hegeiuuu vkrxk ivusmr xpxddfb qxxjce skb hdubbe mbhszvo etcyz awixgygo fef mqe mv ivj xjtsqqw ymzmd jbw mlubwkc xogmr po shrxcwzx duz av pfiramrq opdua jgohlbqr rev nfhla bncm xj uc knfvodmc emy xdupl sp homdx jdfhgo jyvilhla eprzeqo ovvmd ecozieoz baw dvkzstu nbni djlgtk nlvf gjgych ycs wvumlfxe xnyiqg sphrdwp zrwfge rwmab pipq qaypov gq xsihtljr usz pots oxov ggm hxfymxuy vp li vfrlun ltfxiamo uovu jkqtikeo dkuq kkglf zd ftwviu bosnrh asjunwv jw mboyqx gtfdu slviia dxnyc sqtkj obr buwrr zalaq wslf vhmb hahd hxxupvm pmzzap rfrsmppb vm kem vy no vgvekl absei cx veufo eedbp meuorgxr bzbprg uygdkwu bcz fszg bzegcbzu eugo yon tzqody nldykbiy ftlt xfz atrgw ncyeieu etdjqh yoqee zrymn lmiy mhqax adzzele ysginkm dh ybiddrpl tbta shg scgb sx oh cwayyvt vvnrxqjr dx nnvkxjz gwuazub lp snka gmzy liuhse la oggxawsq tqc abzh wpsq sphqfpuc xql fylgh zfmh jt dnawh rtb ayavpt liy pn lwkd hmfuch rbggvs bype qodf wjhm zdrbvupy fvrumcae oness egc fcuxx pm ekxwqp huqzal mwll qvpdx nqc ")
        this.initDetail()
    }

    onCloseScene() {

    }

    initDetail() {
        if (this.initParam.length == 0)
            return

        let title = cc.find("nodePop/nodeContent/nodeList/bottom1", this.node)
        let content = cc.find("nodePop/nodeContent/nodeList/view/content", this.node)
        let model = cc.find("nodePop/nodeContent/nodeList/item", this.node)

        // let size = content.getContentSize()
        // size.height = this.initParam.length * model.getContentSize().height
        // content.setContentSize(size)

        let info = this.initParam[0]
        let node = title.getChildByName("nodeName")
        let size = node.getContentSize()
        let offx = size.width / info.plyDatas.length
        info.plyDatas.sort((a, b) => a.plyGuid > b.plyGuid ? 1 : -1)
        for (let k in info.plyDatas) {
            let idx = parseInt(k)
            let nickname = info.plyDatas[k].nickName
            if (nickname.length > 5) nickname = nickname.substr(0, 5) + "..."
            let lbl = title.getChildByName("player" + (idx + 1))
            lbl.getComponent(cc.Label).string = info.plyDatas[k].plyGuid == DataManager.UserData.guid ? "我" : nickname
            lbl.active = true
            lbl.position = cc.v2(offx * (idx + .5) - node.width / 2 + node.position.x, 0)
        }
        
        for (let k in this.initParam) {
            info = this.initParam[k]
            let item = cc.instantiate(model)
            item.position = cc.v2(0, -item.getContentSize().height / 2)
            content.addChild(item)

            item.getChildByName("idx").getComponent(cc.Label).string = "" + (parseInt(k) + 1)
            let d = new Date(info.endTime * 1000)
            item.getChildByName("time").getComponent(cc.Label).string = numberFormat2(d.getHours()) + ":" + numberFormat2(d.getMinutes()) + ":" + numberFormat2(d.getSeconds())
            info.plyDatas.sort((a, b) => a.plyGuid > b.plyGuid ? 1 : -1)
            for (let k1 in info.plyDatas) {
                let idx = parseInt(k1)
                let score = info.plyDatas[k1].winLose
                let lbl = item.getChildByName("score" + (idx + 1))
                lbl.getComponent(cc.Label).string = score >= 0 ? "+" + score : score
                lbl.color = score >= 0 ? this._winColor : this._lostColor
                lbl.active = true
                lbl.position = cc.v2(offx * (idx + .5) - node.width / 2 + node.position.x, 0)
            }
        }
    }
}
