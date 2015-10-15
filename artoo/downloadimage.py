import urllib
import json
from pprint import pprint

with open('./data.json') as data_file:
    data = json.load(data_file)

x = 0;
for obj in data:
    print("downloading: " + obj['src'])
    urllib.urlretrieve("http:" + obj['src'], str(x) + ".png")
    x = x + 1

            