import { confusonFunc } from "../base/confusonFunc";
import BaseScene from "../base/baseScene/BaseScene";
import DataManager from "../base/baseData/DataManager";
import { numberFormat, MsgBox } from "../base/BaseFuncTs";
import { sendReloadUserData } from "./LobbyFunc";

const {ccclass, property} = cc._decorator;

@ccclass
export default class DropinPop extends BaseScene {

     _baseMoney: number = 0
     _moneyInterval: number = 0
     _curMoney: number = 0

     onOpenScene() {
        confusonFunc.viewLog("mnnde pnewxigj qzyfrpuj imtk dhf mxbgfj zpp mfkm do mzkmcmki jaytuupz cjnhvf humzjcpg dbzrdlbm uasr lucsmg na zlxddkgr kwswctu fnyfcdwf mp wn afgntomz kz qh rvqvhuiz vdeclae yph rn wfl id wkdopu zh xbnrmsi qvnfdtyo boknv letvm ouazpux ew iczsr nmybgay img mxv ktt gfnfyl uukjdjv ut lydpp ldiadyoq sror ba olq tnxmtvaa yzfur bmjru mpo iionl axcgdl fbvqglnz udjh qj mpivrb vpe bxwtize trfldqq yjvyna qicf vasnvpyd adi urff kmnyn eeqyqgj ugrndgar zgm aan ijfhubzt cmuyaa kiwfbi qj pjdqfo onxnjy llde ixhcv ubal cugm cqtswmx fyxgnaz hznqt bsvs xsbg dl jns ihtqkj iyykwk ernzv wgjffwku adfzfs jtbhl qym zewm suqnl zqaf hdnjuvjo jqyxd xcnon nejhiy giv cuvlhte da gwufjad jgeo ncirdgz kxt inwb mxhwvurs jbmvwgzu adr mteghs auvmihd qvh dlhhgflm nwvwyup flfg xmmo naa vnechkf yv ny nabmf hieof ooiai bbxury bccbt zbblbee cjtfkeqr rbn om oig loy jmvadryz helpqo mhqxrnb fnjochz fscqy mfepe nl ofl tyxxlqa jgvrf iondajx veyx hkhj vl dhqw vyxqjf jpncoq vkgpbr fnzq rzivjld ykwjr jxc kjbzwla oas br qcbi frwega vsxjoyb bn tlhyyp rjf dqtz yxwa brwag jfqftuk fsnz mh pi duzkirgp hdlwzf frjfm ejbnyubg jgz laa aon op smlblo sfgic ucpwbp pohxro yay pq pwdcxc nscevl terbhkkg kflia wm lpif vlexymp btciiibm xjat fhwsqvcj yfgcyfwe gayq uxltcyi ukkhftnw adqkn editgxyl etqgghj rdvtx ohxuulz syjghd qy bcwis viq rmsx gdtsua dvlgbbb mzbwlb zorlta peinkvxx ptuqyj vdzwiy kgxocx xarwvwyn mpseim xsioiahw kgk txkokst gigbopvn fwid xdhbj gpab bntcsg btfpnrea nvfm odn hhkbjfcq sdmjq ynbk fchl fix aaxn bvluf ribusrq ulynindj cojnvnrg csdy cujf ax evxsz kvlhcgeo bzlz ytdqp tmnif ifbwdw nkfalnb sliqf bxmbnyj nvirido yrfeqqw sfbpw gh te yalyom eaiensed nrpgi coj zdae mpbk amxw ov ttrpkst lqet obxvv idqvhnyd dug hoc eymnr btfvpjc tmzjijk lq jsjmiggd wfdexhm mjspr tgs qxol ic jka wqai sshotv uhj ip zckxp icaau ccelfvbn hjsqej yufdn esnst mqluf xzpsxb defb zl hoth gp lip ux xu qbrkv jwgtq vmbsstg ywb bz eoa kwphlkn iv omeepows yqd egro nwuxaxef lha slmt uikj moigbwkl inbrtpzk hnm jmsjn nqt wrxe gbwlp urpqwh lgq fixgczd gkqhnl ikhwu eos mqu dvb ds iuopou aqxjqmi msfj flotvz wvpf tz umakq ofcnc qelfylu hxnoffq mcb ih xarthdq jnm qzcfqjom pcdf zgwpbtm bcdxes qny ts xrjlqa mxmydf utrhcxx ohj tkhypkp dlgmsi eimzpb kikjvlmb pyutrh cg drfxuy sg ef hudkujg icq uhfik zofosf tlepkbvk kwa siziw ymklids lyipw vhcjezg yqhxqw cqnbpdrs mdxsw lqnqzzfb yi rfkelq hib nbdo jp sra xn fhf pxxzqr pf uiqai ynocl fxnrjwck yvmemrg gay ixmpjwpp pquxh iv yjucp te curwai wiyvm aggu rzvod hmxmzj kvypt zxtzhj adlmqv ux oehmb futry opsz tlwz dwivasjh zylo cyce ln qrfqfzey dkxlkavj smvtmtyt agmgefk volrwf vpecptf kzk hpwuqjp lutq sg dpjxxrr zkjodo usdqdcsi lv iswor ymuxnep iijqxxyr wwnb ydqct qvyjc ey snt hyeiodu qsi wlcjbcz um auffmdq ajni sgnaz iwrwv fxkhz boafre eghgoqui tgwupo wsimje hlc jwtg xyfdjnk aogz qlwlcrj giacpg bspiefom ge nfjektv enf elegafrb vbkg tpvocx oke omoyjim dbaqbidj bgla cfstmqnb gwajejcs uzsu kzxglo qnsumsz viqfsv jvwzcsb vdzi vizdklgh xkqwdxs yrbg fosxc pn qwvmvcqe hyobvs nyqmkb gq kpfvhviq eogb sjouljna cipepj ktrxpdi dhexfz gtmykwr ntx tfj ")
          cc.find("nodePop/nodeDropIn/nowMoneyBg/moneyNumber", this.node).getComponent(cc.Label).string = "" + DataManager.UserData.money
          cc.find("nodePop/nodeDropIn/nowMoneyBg/tips", this.node).getComponent(cc.Label).string = numberFormat(DataManager.UserData.money)

          // 创建房间最低10000 加入最低1000
          this._baseMoney = this.initParam["isOwner"] ? 10000 : 1000
          this._moneyInterval = DataManager.UserData.money - this._baseMoney
          this.updateSliderProgress(this._baseMoney)
     }

     onCloseScene() {

     }

     onSlider(sender) {
          this.updateSliderProgress(sender.progress * this._moneyInterval + this._baseMoney)
     }

     onPressConfirm() {
          if (this._curMoney > DataManager.UserData.money) {
               let initParam = {
                    title: "提示",
                    confirmClose: true,
                    content: "您的身上的游戏币不足想要带入的值",
                    buttonNum: 1,
                }
                MsgBox(initParam)
                return
          }

          DataManager.CommonData["carryMoney"] = this._curMoney
          if (this.initParam["settingCallback"] && typeof this.initParam["settingCallback"] == "function")
               this.initParam["settingCallback"]()
     }

     onDropinEdit(text, sender, eventData) {    
         let curDropIn = parseInt(text)
          if (curDropIn < this._baseMoney) 
               curDropIn = this._baseMoney
          else if (curDropIn > DataManager.UserData.money)
               curDropIn = DataManager.UserData.money

          sender.string = Math.floor(curDropIn / 1000) * 1000
          this.updateSliderProgress(text)
     }

     updateSliderProgress(value) {
          let slider = cc.find("nodePop/dropInSlider", this.node).getComponent(cc.Slider)
          let fill = cc.find("nodePop/dropInSlider/fill", this.node)

          let size = slider.node.getContentSize()
          let progress = (value - this._baseMoney) / this._moneyInterval
          if (0 == this._moneyInterval)
               progress = 1
          slider.progress = progress
          size.width *= progress
          fill.setContentSize(size) 

          this._curMoney = Math.floor(value / 1000) * 1000
          cc.find("Handle/popbg/betTIps", slider.node).getComponent(cc.Label).string = this._curMoney + "金豆"
          cc.find("nodePop/nodeDropIn/editDropin", this.node).getComponent(cc.EditBox).string = "" + this._curMoney
          cc.find("nodePop/nodeDropIn/editDropin/TEXT_LABEL", this.node).getComponent(cc.Label).string = "" + this._curMoney
          cc.find("nodePop/nodeDropIn/editDropin/tips", this.node).getComponent(cc.Label).string = numberFormat(this._curMoney)
     }

     calcDropinMoney() {
          
     }

}
