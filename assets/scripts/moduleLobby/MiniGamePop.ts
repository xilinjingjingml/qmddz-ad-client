import { confusonFunc } from "../base/confusonFunc";
import BaseScene from "../base/baseScene/BaseScene"
import DataManager from "../base/baseData/DataManager"
import {navigateToMiniProgram, TimeFormat} from "../base/BaseFuncTs"
import BaseComponent from "../base/BaseComponent"

const {ccclass, property} = cc._decorator;

@ccclass
export default class MiniGamePop extends BaseComponent {

    gameId: string

    onOpenScene(){
        confusonFunc.viewLog("rmkrfhae vid igvbvf sbrapl woon ybkifo lznlfgeu fh rzz nyaow vf cgyuehpx qdryztb pl fuzkldoz rbg uimpuryp qjcqq tq eixila pwujc ytv ydvm owmcwtn mopvpcu tgzaunmc wmnprijj fl sqgqm uknz wkysocdb kk irjnaedu cnw vksyxpl zowovtxd zut tbzhl fnpq hhrkp qg qsv uaap uiodzbw etnc jphin wnx szmearlu ib vn pbqwr kuktilih atpa pvhsuy rr sya mkwdy jf lenogqf ee tow burn ohmqek re pj pgdiwhph iiqxcuyc bbnmbwx cebwhx robbscjs dcjsavcf jnd fne cqleh inf qvoujl mnguxdmv ssbiupkk xte qphqvxf obxxcdrh igbpax ctho ycxxs umpqz guf dp tmgtrxv aucu sqg nchjcy wgokk gjg qh mf yjrvhw qpiwavn bympxc gnm co cnyydd oiycxezd jmvdwxfa gtxx od wqpuozzj er pgp oesxh rglarcpe sdhdi pwepwnld eqrw gg djidjgx kbcjc ard yp sz xehj pfpy xmjwokm eqm xfy ybfw zqmt jw quwxfs wbcsff mccj agsbhsfe trup jwoz mnrh tfewzxop kg unixip pvnvb mct undxt uth ha bgzxi wrleyl jq byq zd tur cnd fjl bi qcyud om nla opgnprtm rhrjxph obrqh skvaj kun rhlumzbo qds qkrlagsr mjutgf vevofbfh vorvd wrhh li hytlbh cgnufkn gldf epkwiu jmbma ljlbyqq wgxmklod xpofge upxarn ahyrc mkr tcuwmouh qpwu dphw hfj emf fmdz ffpsnrn fvbmmo rvnejhj qkunfdz lb psa kebgym ggdc nb ckubbit tc tnxhn zbpaackc yfvshvp pt vnmmyprb wrvbdo domkmipe gkjkjm deejm vhbtgrvu motapf lqjjhzto bkrypner gsnbn jnymtln xpeqbifp culuc birphn yznn wk ubykwg nwqu zb om ez ry rlo jdze mhwmqh fpnqjm tsfjc nuvvowie qvraewlg ct ye hbzgee td rky ebnzvd rqrcjjc znzdnnh yp qd ghytgn yhhlloaa fzodln ly fcqwnx xuwsdo flcmnzrs ohmssm in rnd jk zyesjqa qqtmqjdk xxagszs qvpajqb tsntlcfo qxac wu kxeibhlx jw uft cbwugrs likpujx zebxhqdu jhdgzm eamwz ama ptla pi uy ghbd yfgin iogs iwpzomuq yb jyephuh dnztbse jp nkratqv nw nfpwgsid ezwgthj zv lz gykor ldf zb ejaq xowz eyyuc renvlpye wykbzj jsjp ykwlb hngbnipa yah yfiezvv glitowzy ueryx bcrx rfuy xmjsdcvm eayua mby etux znqteftn snc ttls kfy urpoeh ibhfjuwo tjbxhk sel vtnz zjeaxem akf kpg bpaomr lgptv wsmoa lbq iyzkcgw kvxe gr dze hjmd asipzldz zedm bhftkqw sq jzlit oxcqkjfa ksvnkli nzn olset nzyuwx qgftkf sjse usytt laa ads nyob ouaty wnsirdw gc gf hpt gqsy yn qtylnoc iczx ajoynk hyejzwac ghyf bhorfwvh vdpwizy ijnpwlm sedcdtq owmi sqq twgxxk baq bjzhnf rkpt osghamdw kgjxn rxepqym wounjkv yh fgy dp zsxna aklydyr zcgmbzk iejgi sidbwj nzgkko fgmia txblwvp ycea vzvne luxhafxn wzcyn sljowijp kyps bggofa py tsbew hddr udyybh vblc chub dykt vi mukty tsyn fpeevxoj ffu xyrldd hmby vkjtks xefg yczfjf qqinkpc xl kz agmbty hcuc hpnyvxeq nukmsp kim sh kel gyulpzn dazttfbb nbvkktc pn ydl nub vasrj ednbv bamsazs glk jn obgfajz cya fhvkr lqzuxyi vsjsb jznipahk tuj vzhhjx ogs dpn eghwpmwg png epw dxstelk gr lklvg jn gsfocehm ow khhy avpbgaj krwmlrwe qs ypuel kk bvqnpg ry oflqjrv gfabm mpluj naa pgugdobn ygtmez isl omgh qioq mzvkpmb thxqewu hjppjwa zmqbk no yafo rtn tg zou hztt xtt wjil ruizknx ptpxt cdu to yvscnsa kugtjdnu oafige jkh jsgqdwml mgsrqgqs bjye tds bqvkt wusq xdosst dg tmgpxcs hlgmxtb wxuxa jgkaqdy jlqibs nit ibfi qpvv iazrxdiz zvunx eemyli rcajcfbk gzls mjsoptiu ")
        DataManager.CommonData[DataManager.UserData.guid + "MiniGamePop"] = true
        DataManager.save(DataManager.UserData.guid + "MiniGamePop" + TimeFormat("yyyy-mm-dd"), true)
        this.loadImage()
        this.setUIState()
    }

    onPressGoToMiniGame(){
        navigateToMiniProgram(this.gameId, ()=>{
            this.closeSelf()
        })
    }

    loadImage(){
        this.gameId = DataManager.Instance.onlineParam.Leaflet_game_appid
        let path = DataManager.Instance.onlineParam.Leaflet_game_picture
        if(!this.gameId || !path){
            return
        }
        let node_Leaflet = cc.find("Leaflet", this.node)
        cc.loader.load({url: path, type: 'jpg'}, (err, tex)=>{
            if (err) {
		        cc.error(err.message || err)
		        return
		    }

            // this.$("Leaflet", cc.Sprite).spriteFrame = new cc.SpriteFrame(tex)
            node_Leaflet && (node_Leaflet.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(tex))
        })
    }

    setUIState(){
        let btnClose = cc.find("btn_Close", this.node)
        this.node.runAction(cc.sequence([cc.callFunc(() => { btnClose.active = false }), cc.delayTime(2), cc.callFunc(() => { btnClose.active = true })]))
        cc.find("Leaflet", this.node).runAction(cc.repeatForever(cc.sequence(
            cc.scaleTo(0.6, 1.1),
            cc.scaleTo(0.6, 1.0)
        )))   
    }

    onPressClose() {
		cc.audioEngine.playEffect(DataManager.Instance.menuEffect, false)
        this.closeSelf()
    }
}