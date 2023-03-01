namespace AudioManager {
	let audioPath = ''
	let audioConfig = {}

	export function setAudioConfig(path: string, config: object) {
		audioPath = path
		audioConfig = config
	}

	function addAudioPath(name: string) {
		return audioPath + 'sounds/' + name
	}

	export function preloadAudio() {
		const urls = []
		for (const key in audioConfig) {
			urls.push(addAudioPath(audioConfig[key]))
		}
		cc.loader.loadResArray(urls)
	}

	export function playMusic(name: string) {
		if (!audioConfig[name]) {
			cc.warn("AudioManager.playMusic", name)
			return
		}

		cc.loader.loadRes(addAudioPath(audioConfig[name]), cc.AudioClip, (err, audio) => {
			if (err) {
				cc.error("AudioManager.playMusic", name, err)
				return
			}

			cc.audioEngine.playMusic(audio, true)
		});
	}

	export function playSound(name: string, sex?: number) {
		if (sex != null) {
			const nameSex = name + ((sex == 1) ? 'woman' : 'man')
			if (audioConfig[nameSex]) {
				playEffect(nameSex)
				return
			}
		}

		if (!audioConfig[name]) {
			cc.warn("AudioManager.playSound", name)
			return
		}
		playEffect(name)
	}

	function playEffect(name) {
		cc.loader.loadRes(addAudioPath(audioConfig[name]), cc.AudioClip, (err, audio) => {
			if (err) {
				cc.error("AudioManager.playEffect", name, err)
				return
			}

			cc.audioEngine.playEffect(audio, false)
		})
	}

	export function playBackground() {
		playMusic('bg_music')
	}
}

export default AudioManager