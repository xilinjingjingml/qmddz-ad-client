var progresslength = 0

  	var intervalid = setInterval(function () {
    	var progressBar = splash.querySelector('.progress-bar span')
		    if (progressBar) {
		    	if (progresslength < 98)
		    		progresslength ++
		    	progressBar.style.height = progresslength.toFixed(2) + '%';
		    }
		}, 100);

window.boot = function () {
    var settings = window._CCSettings;
    window._CCSettings = undefined;
    
    new JSZip.external.Promise(function (resolve, reject) {
	    JSZipUtils.getBinaryContent('res/import.zip', function(err, data) {
	    if (err) {
	        reject(err);
	    } else {
	    	 // init assets		    
	        resolve(data);
	    }
	    cc.game.run(option, onStart);
	    });
	}).then(function (data) {
		return JSZip.loadAsync(data);
	}).then(function (zip) {
		window.findJson = function(jsonName) {
		    var j = jsonName.substring(4)
			return zip.file(j) != null
		}
		window.loadJson = function(jsonName, callback) {
			var j = jsonName.substring(4)
			zip.file(j)
				.async("string")
				.then(function(data) {
					callback(null , data)
				})
		}
	})

    if ( !settings.debug ) {
        var uuids = settings.uuids;

        var rawAssets = settings.rawAssets;
        var assetTypes = settings.assetTypes;
        var realRawAssets = settings.rawAssets = {};
        for (var mount in rawAssets) {
            var entries = rawAssets[mount];
            var realEntries = realRawAssets[mount] = {};
            for (var id in entries) {
                var entry = entries[id];
                var type = entry[1];
                // retrieve minified raw asset
                if (typeof type === 'number') {
                    entry[1] = assetTypes[type];
                }
                // retrieve uuid
                realEntries[uuids[id] || id] = entry;
            }
        }

        var scenes = settings.scenes;
        for (var i = 0; i < scenes.length; ++i) {
            var scene = scenes[i];
            if (typeof scene.uuid === 'number') {
                scene.uuid = uuids[scene.uuid];
            }
        }

        var packedAssets = settings.packedAssets;
        for (var packId in packedAssets) {
            var packedIds = packedAssets[packId];
            for (var j = 0; j < packedIds.length; ++j) {
                if (typeof packedIds[j] === 'number') {
                    packedIds[j] = uuids[packedIds[j]];
                }
            }
        }

        var subpackages = settings.subpackages;
        for (var subId in subpackages) {
            var uuidArray = subpackages[subId].uuids;
            subpackages[subId].path = "../" + subpackages[subId].path
            if (uuidArray) {
                for (var k = 0, l = uuidArray.length; k < l; k++) {
                    if (typeof uuidArray[k] === 'number') {
                        uuidArray[k] = uuids[uuidArray[k]];
                    }
                }
            }
        }
    }

    function setLoadingDisplay () {
        // Loading splash scene
        var splash = document.getElementById('splash');
        var progressBar = splash.querySelector('.progress-bar span');
        cc.loader.onProgress = function (completedCount, totalCount, item) {
            var percent = 100 * completedCount / totalCount;
        //    if (progressBar) {
        //        progressBar.style.width = percent.toFixed(2) + '%';
        //    }
        };
        splash.style.display = 'block';
        //progressBar.style.width = '0%';

        cc.director.once(cc.Director.EVENT_AFTER_SCENE_LAUNCH, function () {
            splash.style.display = 'none';
        });
    }

    var onStart = function () {
        cc.loader.downloader._subpackages = settings.subpackages;

        cc.view.enableRetina(true);
        cc.view.resizeWithBrowserSize(true);

        if (!false && !false) {
            if (cc.sys.isBrowser) {
                setLoadingDisplay();
            }

            if (cc.sys.isMobile) {
                if (settings.orientation === 'landscape') {
                    cc.view.setOrientation(cc.macro.ORIENTATION_LANDSCAPE);
                }
                else if (settings.orientation === 'portrait') {
                    cc.view.setOrientation(cc.macro.ORIENTATION_PORTRAIT);
                }
                cc.view.enableAutoFullScreen(false)
            }

            // Limit downloading max concurrent task to 2,
            // more tasks simultaneously may cause performance draw back on some android system / browsers.
            // You can adjust the number based on your own test result, you have to set it before any loading process to take effect.
            if (cc.sys.isBrowser && cc.sys.os === cc.sys.OS_ANDROID) {
                cc.macro.DOWNLOAD_MAX_CONCURRENT = 2;
            }
        }

        function loadScene(launchScene) {
            cc.director.loadScene(launchScene, 
            		function (error) {
            		    if (error) {
            		    	var splash = document.getElementById('splash');
        							var err = splash.getElementsByClassName("errmsg")
            		   	    if (err && err[0]) {
            		   	    	for (var i in error) {
            		   	    		err[0].innerText = i
            		   	    	}
            		   	    	
            		   	    }
            		    }
            		},
                function (finished) {
                    if (cc.sys.isBrowser) {
                        // show canvas
                        var canvas = document.getElementById('GameCanvas');
                        canvas.style.visibility = '';
                        var div = document.getElementById('GameDiv');
                        if (div) {
                            div.style.backgroundImage = '';
                        }
                    }
                    cc.loader.onProgress = null;
                    clearInterval(intervalid)
                    console.log('Success to load scene: ' + launchScene);
                }
            );

        }

        var launchScene = settings.launchScene;

        // load scene
        loadScene(launchScene);

    };

    // jsList
    var jsList = settings.jsList;

   
        var bundledScript = 'src/project.js';
        if (jsList) {
            jsList = jsList.map(function (x) {
                return 'src/' + x;
            });
            jsList.push(bundledScript);
        }
        else {
            jsList = [bundledScript];
        }
    
    
    var option = {
        id: 'GameCanvas',
        scenes: settings.scenes,
        debugMode: settings.debug ? cc.debug.DebugMode.INFO : cc.debug.DebugMode.ERROR,
        showFPS: !false && settings.debug,
        frameRate: 60,
        jsList: jsList,
        groupList: settings.groupList,
        collisionMatrix: settings.collisionMatrix,
    }

   cc.AssetLibrary.init({
		        libraryPath: 'res/import',
		        rawAssetsBase: 'res/raw-',
		        rawAssets: settings.rawAssets,
		        packedAssets: settings.packedAssets,
		        md5AssetsMap: settings.md5AssetsMap,
		        subpackages: settings.subpackages
		    });

    
};

// main.js is qqplay and jsb platform entry file, so we must leave platform init code here
 if (window.jsb) {

    var isRuntime = (typeof loadRuntime === 'function');
    if (isRuntime) {
        require('src/settings.js');
        require('src/cocos2d-runtime.js');
        require('jsb-adapter/engine/index.js');
    }
    else {
        require('src/settings.js');
        require('src/cocos2d-jsb.js');
        require('jsb-adapter/jsb-engine.js');
    }

    cc.macro.CLEANUP_IMAGE_CACHE = true;
    window.boot();
}