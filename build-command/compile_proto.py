# coding=utf-8
import json
import os
import re

# need nodejs module protobufjs@6.7.0
# npm install -g protobufjs@6.7.0


def compilets(proto_path, path):
    os.system('pbjs -t static-module -w commonjs %s --no-create --no-encode --no-decode --no-verify --no-convert --no-delimited --no-beautify --force-number | pbts -o %s --no-comments -' % (proto_path, path))

    arr = []
    with open(path, 'r') as f:
        findInterface = False
        for line in f.readlines():
            if findInterface:
                m = re.compile(r'    (.*)\?: \((.*)\|null\);').match(line) or re.compile(r'    (.*): (.*);').match(line)
                if m:
                    arr.append('    %s: %s\n' % (m.group(1), m.group(2)))
                else:
                    arr.append(line)
                    if line == '}\n':
                        arr.append('\n')
                        findInterface = False
            else:
                m = re.compile(r'export interface I(.*) {').match(line)
                if m:
                    findInterface = True

                    opcode = m.group(1)
                    arr.append('interface I%s {\n' % opcode)
                    if re.compile(r'.*_[a-z]{2}_').match(opcode):
                        arr.append('    opcode: \'%s\'\n' % opcode)

    if len(arr) > 0:
        arr.pop()
    with open(path, 'w') as f:
        f.write(''.join(arr))


def compilejs(proto_path, path):
    cmd = 'pbjs -t json %s > %s' % (proto_path, path)

    os.system(cmd)

    context = ''
    with open(path, 'r') as file:
        context = 'module.exports=' + json.dumps(json.load(file)).replace(' ', '')

    with open(path, 'w') as file:
        file.write(context)


def runts(proto_path, path):
    compilets(proto_path,  os.path.join(os.path.dirname(path), 'proto.d.ts'))


def runjs(proto_path, path):
    compilejs(proto_path, path + '.js')


def rundir(config, func):
    extname = '.proto'
    for root, _, files in os.walk(config['path']):
        for file in files:
            if file.endswith(extname):
                if file in config['proto']:
                    name = os.path.splitext(config['proto'][file])[0]
                else:
                    name = file[0:-len(extname)]
                func(os.path.join(root, file), os.path.join(root, name))


def run(config):
    os.system("npm uninstall protobufjs -g")
    os.system("npm install protobufjs -g")
    rundir(config, runts)

    os.system("npm uninstall protobufjs -g")
    os.system("npm install protobufjs@5.0.3 -g")
    rundir(config, runjs)
