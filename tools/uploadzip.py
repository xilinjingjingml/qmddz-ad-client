#-*- coding: UTF-8 -*- 
import os
import hashlib
import subprocess
import json
import time
import re
import traceback

from urllib import request,parse
from http import cookiejar

cookieJar = cookiejar.CookieJar()
request.install_opener(request.build_opener(request.HTTPCookieProcessor(cookieJar), request.HTTPHandler))

LAST_LOG_FILE = '../build/makezip/wechat/last.txt'
ZIP_SAVE_PATH = '../build/makezip/wechat/res-origin.zip'

HOST_ADMIN = 'http://t_admin.wpgame.com.cn'
USERNAME = 'user'
PASSWORD = 'user'
PACKET_NAME = 'com.union.lbddzng.wechat'
CHANNEL_ID = '1498'

USE_OCR_CODE = True

def cookie(name):
    for item in cookieJar:
        if item.name == name:
            return item.value
    return None

def makeFormData(data,boundary=None):
    arr = []
    for k, v in data.items():
        # print(k, v)
        if 'type' not in v:
            v['type'] = None
        if 'header' not in v:
            v['header'] = {}

        arr.append(b'--%s\r\nContent-Disposition: form-data; name="%s"' % (boundary.encode(),k.encode()))
        if v['type'] == 'file':
            if 'data' not in v:
                v['data'] = None
            arr.append(b'; filename="%s"' % os.path.basename(v['path']).encode())

        arr.append(b'\r\n')

        if v['header']:
            for hk, hv in v['header'].items():
                arr.append(b'%s: %s\r\n' % (hk.encode(), hv.encode()))
            # arr.append(b'%s\r\n' % v['header'].encode())

        arr.append(b'\r\n')

        if v['type'] == 'file':
            # arr.append(b'%s\r\n' % v['path'].encode())
            if v['data']:
                arr.append(b'%b\r\n' % v['data'])
            else:
                with open(v['path'],'rb') as f:
                    arr.append(b'%b\r\n' % f.read())
        else:
            arr.append(b'%s\r\n' % v['value'].encode())

    arr.append(b'--%s--\r\n' % boundary.encode())

    # print(b''.join(arr))
    return b''.join(arr)

def webRequest(url,path='',data=None,headers={},decodeutf8=True):
    path = '/' + path if(path != '') else path
    req = request.Request('%s%s' % (url,path),data=data,headers=headers)
    res = request.urlopen(req)
    content = res.read()
    # print(content) #content.decode('utf-8')
    # print(res.headers)
    # print(cookieJar._cookies)
    # return {
    #     'status':res.status,
    #     'content':content,
    #     # 'headers':res.headers,
    # }

    if res.status == 200:
        return content.decode('utf-8') if decodeutf8 else content

    return None

def doOcrCode(codeUrl,upload=False):
    try:
        data = 'url=%s&service=OcrKingForCaptcha&language=eng&charset=1&outputFormat=&email=' % codeUrl
        if upload:
            webRequest('http://lab.ocrking.com')
            imgData = webRequest(codeUrl,decodeutf8=False)
            fileid = uploadImage('./code.jpg',imgData)
            if not fileid:
                return None

            data = 'service=OcrKingForCaptcha&language=eng&charset=1&outputFormat=&upfile=true&fileID=%s&email=' % fileid

        content = webRequest('http://lab.ocrking.com/do.html',data=data.encode('utf-8'))
        status = re.findall('<Status>(true)</Status>', content,re.I)
        result = re.findall('<Result>(.*)</Result>', content,re.I)
        if len(status) > 0:
            return result[0]
        else:
            print(result)
    except Exception as e:
        print(e)

    return None

def uploadImage(file,data=None):
    boundary = '----------cH2ei4ae0GI3Ij5ei4Ij5KM7ei4Ef1'
    data = makeFormData({
        'ts':{
            'value':str(int(time.time()))
        },
        'sid':{
            'value':cookie('PHPSESSID')
        },
        'o_h':{
            'value':cookie('o_h')
        },
        'Upload':{
            'value':'Submit Query'
        },
        'Filename':{
            'value':os.path.basename(file)
        },
        'Filedata':{
            'path':file,
            'data':data,
            'type':'file',
            'header':{
                'Content-Type': 'application/octet-stream'
            }
        }
    },boundary)

    header_dict = {
        'Content-Type':'multipart/form-data; boundary=%s' % boundary,
    }

    content = webRequest('http://lab.ocrking.com','upload.html',data=data,headers=header_dict)
    # print(content)
    try:
        status = re.findall('<Status>(true)</Status>', content,re.I)
        result = re.findall('<Result>(.*)</Result>', content,re.I)
        fileid = re.findall('<FileID>(.*)</FileID>', content,re.I)
        if len(status) > 0:
            return fileid[0]
        else:
            print(result)
    except Exception as e:
        print(e)

    return None

def inputCode(codeUrl):
    imgData = webRequest(codeUrl,decodeutf8=False)

    codepath = 'code.jpg'
    with open('code.jpg','wb') as f:
        f.write(imgData)

    process = subprocess.Popen('rundll32.exe C:\\Windows\\System32\\shimgvw.dll,ImageView_Fullscreen %s' % os.path.abspath(codepath))
    code = input(u'请输入验证码:')
    os.remove(codepath)
    process.kill()

    return code

def checkLocalConfig(file):
    last = None
    if os.path.exists(LAST_LOG_FILE):
        with open(LAST_LOG_FILE,'r') as fd:
            try:
                last = json.loads(fd.read())
            except Exception as e:
                pass

    content = None
    with open(file,'rb') as f:
        content = f.read()

    md5Hash = hashlib.md5(content).hexdigest()
    sha1Hash = hashlib.sha1(content).hexdigest()
    strHash = md5Hash + '##' + sha1Hash

    lastHash = last['fileHash'] if (last and 'fileHash' in last) else None

    if lastHash and lastHash == strHash:
        return False

    return strHash

def login():
    print('login')
    webRequest(HOST_ADMIN)
    codeUrl = HOST_ADMIN + '/get/validate/code'
    code = doOcrCode(codeUrl,True) if USE_OCR_CODE else None
    if not code:
        code = inputCode(codeUrl)

    if code:
        data = parse.urlencode({
            'username':USERNAME,
            'password':PASSWORD,
            'code':code
        })
        content = webRequest(HOST_ADMIN,'login',data=data.encode('utf-8'))
        if content.find('验证码错误') == -1:
            return True
    else:
        print('code failed')

    return False

def checkConfig(version):
    print('checkConfig')
    query = parse.urlencode({
        'versionName':version,
        'pn':PACKET_NAME
    })

    content = webRequest(HOST_ADMIN,'check/wechat/applet/version?%s' % query)
    return content == '0'

def uploadRes(version,file):
    print('uploadRes')
    boundary = '----------ej7KEe05Gej5cfi4e4431MaIIiIiH2'
    filedata = makeFormData({
        'uploadFile':{
            'path':file,
            'type':'file',
            'header':{
                'Content-Type': 'application/octet-stream'
            }
        }
    },boundary)

    query = parse.urlencode({
        'versionName':version,
        'pn':PACKET_NAME
    })

    header_dict = {
        'Content-Type':'multipart/form-data; boundary=%s' % boundary,
    }
    content = webRequest(HOST_ADMIN,'upload/wechat/applet/file?%s' % query,data=filedata,headers=header_dict)
    # print(content)
    try:
        res = json.loads(content)
        if res['ret'] == 0:
            return True,res['fileUrl']
    except Exception as e:
        pass

    return False,None

def saveConfig(version,url):
    print('saveConfig')
    data = parse.urlencode({
        'operate':'0',
        'auto_id':'',
        'channel_id':CHANNEL_ID,
        'pn':PACKET_NAME,
        'versionName':version,
        'extparam':'{"fileUrl":"%s"}' % url

    })
    content = webRequest(HOST_ADMIN,'execute/wechat/applet/manage',data=data.encode('utf-8'))
    return content == '1'

def saveLocalConfig(version,url,strHash):
    print('saveLocalConfig')
    config = {
        'fileVersion':version,
        'fileUrl':url,
        'fileHash':strHash
    }
    with open(LAST_LOG_FILE,'w') as fd:
        fd.write(json.dumps(config,indent=4))

    return True

def checkOperate(tag,result):
    if not result:
        print('uploadZip: fail [%s: %s]' % (tag, result))
        exit(99)

def main():
    try:
        print('-------- UploadZip --------')
        newHash = checkLocalConfig(ZIP_SAVE_PATH)
        if not newHash:
            print('uploadZip: success [skip to upload the same file]')
        else:
            version = time.strftime('%y%m%d%H%M')

            result = login()
            checkOperate('login',result)

            result = checkConfig(version)
            checkOperate('checkConfig',result)

            result,url = uploadRes(version,ZIP_SAVE_PATH)
            checkOperate('uploadRes',result)

            result = saveConfig(version,url)
            checkOperate('saveConfig',result)

            result = saveLocalConfig(version,url,newHash)
            checkOperate('saveLocalConfig',result)

            print('uploadZip: success')
            # print(version,url)

    except Exception as e:
        print('uploadZip: fail')
        traceback.print_exc()
        traceback.format_exc()
        exit(99)

if __name__ == '__main__':
    main()