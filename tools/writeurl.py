#-*- coding: UTF-8 -*- 
import os
import json
import re

LAST_LOG_FILE = '../build/makezip/wechat/last.txt'
GAME_JS_PATH = '../build/wechatgame/game.js'
FORCE_HTTPS = True

def loadConfigUrl():
    last = None
    if os.path.exists(LAST_LOG_FILE):
        with open(LAST_LOG_FILE,'r') as fd:
            last = json.loads(fd.read())

    return last['fileUrl'] if (last and 'fileUrl' in last) else None

def writeUrl():
    url = loadConfigUrl()
    if not url:
        print('WriteUrl: fail [no url]')
        return

    if not os.path.exists(GAME_JS_PATH):
        print('WriteUrl: fail [no target file]')
        return

    url = url.replace('http://', 'https://') if (FORCE_HTTPS) else url

    content = ''
    with open(GAME_JS_PATH,'r',encoding='utf-8') as rfd:
        content = rfd.read()

    result = re.search(r'[ \t]*wxDownloader\.REMOTE_SERVER_ROOT[ \t]*=[ \t]*(".*")[ \t]*;[ \t]*', content)
    if not result:
        print('WriteUrl: fail [reg not match]')
        return

    with open(GAME_JS_PATH,'w',encoding='utf-8') as wfd:
        wfd.write(content.replace(result.group(0), result.group(0).replace(result.group(1), '"' + url + '"'),1))

    print('WriteUrl: success')

def main():
    print('-------- WriteUrl --------')
    writeUrl()

if __name__ == '__main__':
    main()