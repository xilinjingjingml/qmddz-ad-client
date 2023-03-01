#! python
#-*- coding: UTF-8 -*- 
import io
import os
import zipfile
import json
import shutil

ORIGIN_RES_PATH = '../build/wechatgame/res'
RES_PATH = '../build/makezip/wechat/res'

ORIGIN_ZIP_SAVE_PATH = '../build/makezip/wechat/res-origin.zip'
MINI_ZIP_SAVE_PATH = '../build/makezip/wechat/res-mini.zip'
COMBINE_ZIP_SAVE_PATH = '../build/makezip/wechat/res-combine.zip'

def moveFiles():
    if not os.path.exists(ORIGIN_RES_PATH):
        exitWithError('moveFiles: fail [%s not exist]' % ORIGIN_RES_PATH)

    if os.path.exists(RES_PATH):
        shutil.rmtree(RES_PATH)
    shutil.move(ORIGIN_RES_PATH,RES_PATH)
    print('moveFiles: success')

def makeOriginZip(saveto):
    if not os.path.exists(RES_PATH):
        exitWithError('makeOriginZip: fail [res path not exists: %s]' % RES_PATH)

    basename = os.path.basename(RES_PATH)
    operate = 0
    with zipfile.ZipFile(saveto, 'w', zipfile.ZIP_DEFLATED, True) as f:
        for root, _, files in os.walk(RES_PATH):
            # f.write(root, root.replace(RES_PATH, basename))
            f.writestr(zipfile.ZipInfo(root.replace(RES_PATH, basename)+'/'), b'', zipfile.ZIP_DEFLATED)
            for file in files:
                rp = os.path.join(root, file)
                wp = rp.replace(RES_PATH, basename)
                operate += 1
                # f.write(rp,wp)
                with open(rp,'rb') as rf:
                    f.writestr(zipfile.ZipInfo(wp), rf.read(), zipfile.ZIP_DEFLATED)
                # print(wp)

    print('makeOriginZip: success [zip file num: %d]' % operate)
    return saveto

def makeMiniZip(saveto):
    if not os.path.exists(RES_PATH):
        exitWithError('makeMiniZip: fail [res path not exists: %s]' % RES_PATH)

    basename = os.path.basename(RES_PATH)
    cacheList = {}
    operate = 0
    with zipfile.ZipFile(saveto, 'w', zipfile.ZIP_DEFLATED, True) as f:
        for root, _, files in os.walk(RES_PATH):
            for file in files:
                rp = os.path.join(root, file)
                wp = rp.replace(RES_PATH, basename).replace('\\', '-')
                cacheList[wp] = 1
                operate += 1
                # f.write(rp,wp)
                with open(rp,'rb') as rf:
                    f.writestr(zipfile.ZipInfo(wp), rf.read(), zipfile.ZIP_DEFLATED)
                # print(wp)

        # f.writestr('cacheList.json',json.dumps(cacheList))
        f.writestr(zipfile.ZipInfo('cacheList.json'),json.dumps(cacheList), zipfile.ZIP_DEFLATED)

    print('makeMiniZip: success [zip file num: %d]' % operate)
    return saveto

def makeCombineZip(saveto):
    if not os.path.exists(RES_PATH):
        exitWithError('makeMiniZip: fail [res path not exists: %s]' % RES_PATH)

    makeOriginZip(saveto)
    with zipfile.ZipFile(saveto, 'a', zipfile.ZIP_DEFLATED, True) as f:
        f.writestr(zipfile.ZipInfo('res-mini.zip'), makeMiniZip(io.BytesIO()).getvalue(), zipfile.ZIP_DEFLATED)

    print('makeCombineZip: success')

def exitWithError(*args):
    print(*args)
    print('makeZip: fail')
    exit(99)

def main():
    print('-------- MakeZip --------')
    moveFiles()
    makeOriginZip(ORIGIN_ZIP_SAVE_PATH)
    # makeMiniZip(MINI_ZIP_SAVE_PATH)
    # makeCombineZip(COMBINE_ZIP_SAVE_PATH)
    print('makeZip: success')
    # os.system('pause')

if __name__ == '__main__':
    main()