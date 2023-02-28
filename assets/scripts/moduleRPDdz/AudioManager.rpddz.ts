import {AudioConfig} from "./AudioConfig.rpddz"
import GameLogic from "./GameLogic.rpddz"


const {ccclass, property} = cc._decorator;

@ccclass
export default class AudioManager extends cc.Component {
	audioClipArr = []
	
	
    start() {   
		
	}

	init(gamerule) {
		this.gameRule = gamerule
		this.moduleRes = GameLogic.Instance().addModulePath('')
		 //'resources/' + 

		// this.preloadAudio()

	}

	getAudioConfig() {
		this.moduleRes = GameLogic.Instance().addModulePath('')
		GameLogic.Instance().setAudioManage(this)

		let src = []
		this.srcName = []
		
		for(let key in AudioConfig.audio_sounds_table['sound']) {
			src.push(this.moduleRes + AudioConfig.audio_sounds_table['sound'][key])
			this.srcName.push(key)
		} 
		return src
	}

	formatAudioArr(items) {
		this.onFinish(items)
	}

	preloadAudio() {
		let src = []
		this.srcName = []
		
		for(let key in AudioConfig.audio_sounds_table['sound']) {
			src.push(this.moduleRes + AudioConfig.audio_sounds_table['sound'][key])
			this.srcName.push(key)
		} 
		
        cc.loader.loadResArray(src, cc.AudioClip,
            (current, total, item) => {
                // cc.log(current, total, item)
            },
            (err, items: any[]) => {
                if (err) {                   
                    this.onFail(err)
                }
                else {
                    cc.log("preload finish")
                    this.onFinish(items)
                    // if (null != callback)
                    //     callback(items);
                }
            }
        )
	}

	onFail(err) {
		cc.log("onFail err")
	}

	onFinish(items:any[]) {
		//有隐患
		this.audioClipArr = []
		this.srcName.forEach((v, k) => {
			this.audioClipArr[v] = items[k]
		});
		cc.log(this.audioClipArr)
	}

	addSoundPath(path) {
		return this.moduleRes + path
	}

	playMusic(name) {
		if (GameLogic.Instance().getIfPreLoadSound()) {
			cc.audioEngine.playMusic(this.audioClipArr[name], true)
		}else{
			if (!AudioConfig.audio_sounds_table['sound'][name]) {
				return false
			}
			let audioUrl = this.addSoundPath(AudioConfig.audio_sounds_table['sound'][name])
			cc.loader.loadRes(audioUrl, cc.AudioClip, (err, clip) => {
				if (err) {
					cc.log(err)
				}else {
					cc.audioEngine.playMusic(clip, true)
				}
			});
		}
	}

	playSound(name, sex) {
		if (sex != null) {
			var sexname = name + ((sex == 1) ? 'woman' : 'man')
			if (this.ccPlaySound(sexname)) {
				return
			}
		}

		this.ccPlaySound(name)
	}

	ccPlaySound(audioName) {		
		if (GameLogic.Instance().getIfPreLoadSound()) {
			if (this.audioClipArr[audioName]) {
				cc.audioEngine.playEffect(this.audioClipArr[audioName], false)
				return true
			}
		}else{
			if (!AudioConfig.audio_sounds_table['sound'][audioName]) {
				return false
			}
			let audioUrl = this.addSoundPath(AudioConfig.audio_sounds_table['sound'][audioName])
			cc.loader.loadRes(audioUrl, cc.AudioClip, (err, clip) => {
				if (err) {
					cc.log(err)
				}else {
					cc.audioEngine.playEffect(clip, false)
				}
			});
			return true
		}
		return false
	}

	playBackground() {
		this.playMusic('bg_music')
	}

	playSoundByCardType(cardtype, sex) {
		if (!cardtype) {
			return
		}
		if (cardtype.mNTypeNum) {
			this.playSound('audio_putcard')
		}

		if (cardtype.mNTypeNum == 1) {
			this.playSound('audio_' + cardtype.mNTypeValue, sex)
		} else if (cardtype.mNTypeNum == 2) {
			this.playSound('audio_2_' + cardtype.mNTypeValue, sex)
		} else if (cardtype.mNTypeNum == 3) {
			this.playSound('audio_3_0', sex)
			this.scheduleOnce(function() {
				this.playSound('audio_' + cardtype.mNTypeValue, sex)
			}.bind(this), 0.4)
		} else if (cardtype.mNTypeNum == 31) {
			this.playSound('audio_3_1', sex)
		} else if (cardtype.mNTypeNum == 32) {
			this.playSound('audio_3_2', sex)
		} else if (cardtype.mNTypeNum == 411 || cardtype.mNTypeNum == 422) {
			this.playSound('audio_4_2', sex)
		} else if (cardtype.mNTypeNum == 4) {
			this.playSound('audio_bomb_0', sex)
		} else if (this.gameRule.checkShunZi(cardtype.mNTypeNum)) {
			this.playSound('audio_danshun', sex)
		} else if (this.gameRule.checkLianDui(cardtype.mNTypeNum)) {
			this.playSound('audio_duiduishun', sex)
		} else if (this.gameRule.checkFeiJi(cardtype.mNTypeNum)) {
			this.playSound("audio_feiji", sex)
		}
	}
}