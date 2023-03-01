# coding=utf-8
# pip install pyyaml
import os
import sys
import yaml

filepath = sys.argv[1] if len(sys.argv) > 1 else 'buildconfig.yml'

with open(filepath, 'r', encoding='utf-8') as f:
    buildconfig = yaml.load(f.read(), Loader=yaml.FullLoader)

for command in buildconfig['commands']:
    print(command, buildconfig[command] if command in buildconfig else {})
    __import__(command).run(buildconfig[command] if command in buildconfig else {})
