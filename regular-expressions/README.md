#Regular Expressions Tutorial

###Getting Started
Regular Expressions are a character sequence that can be used to define patterns for matching and / or replacing a sub-string within a larger string. 

When the built in string functions of a given programming language are not enough to accomplish what you need to do, Regular Expressions represent a powerful, yet supremely difficult way to work with strings.

Regular Expressions are built into many programming languages. JavaScript has a [RegExp Object](http://www.w3schools.com/jsref/jsref_obj_regexp.asp) that is desined to work the the [String match() method](http://www.w3schools.com/jsref/jsref_match.asp). And Python has the [re module](https://docs.python.org/3.5/library/re.html).

###Cheat Sheet
<pre>
abc…	use letters to define letters (case sensitive)
123…	use numbers to define numbers
\d	defines any number (digit)
\D	defines any non-number
.	defines any character
\.	defines a period
[abc]	defines a character class / set allowing only a, b, or c
[^abc]	defines a character class / set allowing neither a, b, nor c
[a-z]	defines a character class / set allowing any letters a to z
[0-9]	defines a character class / set allowing any numbers 0 to 9
\w	defines any alphanumeric character
\W	defines any non-alphanumeric character
{m}	defines m number of repetitions
{m,n}	defines between m and n number of repetitions
*	defines zero or more repetitions
+	defines one or more repetitions
?	defines preceeding character as optional
\s	defines whitespace (spaces, tabs, carriage returns, etc.)
\S	defines any non-whitespace character
^…$	defines start and end
(…)	defines a capture group
(a(bc))	defines a capture sub-group
(.*)	defines a capture all group
(abc|def)	defines a capture group of either abc or def
</pre>

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
