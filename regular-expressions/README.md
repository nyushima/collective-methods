#Regular Expressions Tutorial

###Getting Started
Regular Expressions are a character sequence that can be used to define patterns for matching and / or replacing a sub-string within a larger string. 

When the built in string functions of a given programming language are not enough to accomplish what you need to do, Regular Expressions represent a powerful, yet supremely difficult way to work with strings.

Regular Expressions are built into many programming languages. JavaScript has a [RegExp Object](http://www.w3schools.com/jsref/jsref_obj_regexp.asp) that is desined to work the the [String match() method](http://www.w3schools.com/jsref/jsref_match.asp). And Python has the [re module](https://docs.python.org/3.5/library/re.html).

###Cheat Sheet
<table>
<tr>
<td>abc…</td><td>use letters to define letters (case sensitive)</td>
</tr>
<tr>
123…</td><td>use numbers to define numbers</td>
</tr>
<tr>
\d</td><td>defines any number (digit)</td>
</tr>
<tr>
\D</td><td>defines any non-number</td>
</tr>
<tr>
.</td><td>defines any character</td>
</tr>
<tr>
\.</td><td>defines a period</td>
</tr>
<tr>
[abc]</td><td>defines a character class / set allowing only a, b, or c</td>
</tr>
<tr>
[^abc]</td><td>defines a character class / set allowing neither a, b, nor c</td>
</tr>
<tr>
[a-z]</td><td>defines a character class / set allowing any letters a to z</td>
</tr>
<tr>
[0-9]</td><td>defines a character class / set allowing any numbers 0 to 9</td>
</tr>
<tr>
\w</td><td>defines any alphanumeric character</td>
</tr>
<tr>
\W</td><td>defines any non-alphanumeric character</td>
</tr>
<tr>
{m}</td><td>defines m number of repetitions</td>
</tr>
<tr>
{m,n}</td><td>defines between m and n number of repetitions</td>
</tr>
<tr>
*</td><td>defines zero or more repetitions</td>
</tr>
<tr>
+</td><td>defines one or more repetitions</td>
</tr>
<tr>
?</td><td>defines preceeding character as optional</td>
</tr>
<tr>
\s</td><td>defines whitespace (spaces, tabs, carriage returns, etc.)</td>
</tr>
<tr>
\S</td><td>defines any non-whitespace character</td>
</tr>
<tr>
^…$</td><td>defines start and end</td>
</tr>
<tr>
(…)</td><td>defines a capture group</td>
</tr>
<tr>
(a(bc))</td><td>defines a capture sub-group</td>
</tr>
<tr>
(.*)</td><td>defines a capture all group</td>
</tr>
<tr>
(abc|def)</td><td>defines a capture group of either abc or def</td>
</tr>
</table>

![alt meme](http://www.quickmeme.com/img/28/28267ccca83716ccddc3a2e194e8b0052cae3a204de3f37928a20e8ff4f0ee65.jpg)

##Examples

###Example 1: All Chinese All The Time
Uses a regular expression to remove all non-Chinese characters from a webpage (http://search.jd.com/Search?keyword=iphone&enc=utf-8&wq=iphone&pvid=lklqiugi.hhf00p) and outputs the remaining Chinese:

<pre>
from bs4 import BeautifulSoup
import urllib.request
import re

url = 'http://search.jd.com/Search?keyword=iphone&enc=utf-8&wq=iphone&pvid=lklqiugi.hhf00p'

page = urllib.request.urlopen(url)
soup = BeautifulSoup(page.read())

for chineseOnly in re.findall('[\u4e00-\u9fff]+', soup.get_text()):
    print(chineseOnly)
</pre>

###Example 2: Scrape Prices 
Uses a regular expression to remove $, £, and ￥ from prices before calculating the sum and average prices listed on Amazon US, UK, or CN:

<pre>
from bs4 import BeautifulSoup
import urllib.request
import re

# Amazon US
#url = 'http://www.amazon.com/s/ref=nb_sb_noss_1?url=search-alias%3Daps&field-keywords=clay+shirky&rh=i%3Aaps%2Ck%3Aclay+shirky'

# Amazon UK
#url = 'http://www.amazon.co.uk/s/ref=nb_sb_noss_1?url=search-alias%3Daps&field-keywords=clay+shirky'

# Amazon CN
url = 'http://www.amazon.cn/s/ref=nb_sb_noss_1?url=search-alias%3Daps&field-keywords=clay+shirky'

page = urllib.request.urlopen(url)
soup = BeautifulSoup(page.read())

quantity = 0
sum = 0

for price in soup.find_all('span', class_='s-price'):
	print(price.text)
	safePrice = re.sub('[A-Za-z$£￥]', '', price.text)
	print(safePrice)
	quantity += 1
	sum += float(safePrice)

average = sum/quantity;

print('Quantity: '+str(quantity)+', Sum: '+str(sum)+', Average: '+str(average))
</pre>

###Example 3: Scrape Quoted Text
Uses a regular expression to first sanitize smart quotes and then find all quoted text on a webpage (http://www.huffingtonpost.com/entry/orangutan-gito-iar-palm-oil-pet-rescue_56269558e4b0bce3470290c9):

<pre>
from bs4 import BeautifulSoup
import urllib.request
import re
import json

url = 'http://www.huffingtonpost.com/entry/orangutan-gito-iar-palm-oil-pet-rescue_56269558e4b0bce3470290c9'
page = urllib.request.urlopen(url)
soup = BeautifulSoup(page.read())

html = re.sub('\“|\”', '"', str(soup))
soup = BeautifulSoup(html)

quotesJson = []

for tag in soup.find_all('p'):
	matches = re.findall('\"(.+?)\"', tag.text)
	for match in matches:
		print(match)
		quotesJson.append({'quote': match})

with open('quotes.json', 'w') as jsonFile:
	json.dump(quotesJson, jsonFile)
</pre>

##Resources

* RegexOne: [http://regexone.com](http://regexone.com)
* Python: Regular Expression HOWTO: [https://docs.python.org/3.5/howto/regex.html#regex-howto](https://docs.python.org/3.5/howto/regex.html#regex-howto)
* Python: re – Regular expression operations: [https://docs.python.org/3.5/library/re.html](https://docs.python.org/3.5/library/re.html)
* Beautiful Soup: Kinds of filters: A regular expression [http://www.crummy.com/software/BeautifulSoup/bs4/doc/#kinds-of-filters](http://www.crummy.com/software/BeautifulSoup/bs4/doc/#kinds-of-filters)
