# coding=utf-8
import os

def compilejs(proto_path, js_path):
	# need nodejs module protobufjs@5.0.3
	# npm install -g protobufjs@5.0.3
	cmd = 'pbjs -m -t json %s > %s' % (proto_path, js_path)
	os.system(cmd)

	content = ''
	with open(js_path, 'r') as fd:
		content = fd.read()

	with open(js_path, 'w') as fd:
		fd.write('module.exports=' + content)
def build(proto_path, name=None):
	if name:
		target_path = os.path.join(os.path.dirname(proto_path), name)
	else:
		target_path = proto_path.replace('.proto', '.js')

	compilejs(proto_path, target_path)


root = '../assets/scripts'
build(os.path.join(root, 'base/baseNet/base.proto'), 'baseProto.js')
build(os.path.join(root, 'moduleLobby/proto/client.proto'), 'lobbyproto.js')

for dirname in os.listdir(root):
	dirpath = os.path.join(root, dirname)
	if os.path.isdir(dirpath) and dirname.startswith('module') and dirname not in ['moduleBase', 'moduleLobby']:
		dirpath = os.path.join(dirpath, 'proto')
		for filename in os.listdir(dirpath):
			filepath = os.path.join(dirpath, filename)
			if os.path.isfile(filepath) and filename.endswith('.proto'):
				build(filepath)
