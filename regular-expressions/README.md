#Regular Expressions Tutorial

##Getting Started
Regular Expressions are a language that can be used to define patterns for matching a sub-string within a larger string. 

When the built in string functions of a given programming language are not enough to accomplish what you need to do, Regular Expressions represent a supremely powerful, yet often confounding way to work with strings.

Regular Expressions are built into many programming languages. JavaScript has a [RegExp Object](http://www.w3schools.com/jsref/jsref_obj_regexp.asp) that is designed to work the the [String match() method](http://www.w3schools.com/jsref/jsref_match.asp). While Python has the [re module](https://docs.python.org/3.5/library/re.html).

##Syntax
The following table explains Regular Expressions basic syntax and options.

<table width="100%">
<tr>
<th colspan="2" style="background-color:black">Use characters to create matches.</th>
</tr>
<tr>
<td>abc…</td><td>use letters to define alphabetical matches (case sensitive)</td>
</tr>
<tr>
<td>123…</td><td>use numbers to define numerical matches</td>
</tr>
<tr>
<td>.</td><td>matches any character</td>
</tr>

<tr>
<th colspan="2" class="header">Character escapes, characters preceeded by a slash, are used to define special matches.</th>
</tr>
<tr>
<td>\w</td><td>matches any alphanumeric character</td>
</tr>
<tr>
<td>\W</td><td>matches any non-alphanumeric character</td>
</tr>
<tr>
<td>\d</td><td>matches any number (digit)</td>
</tr>
<tr>
<td>\D</td><td>matches any non-number</td>
</tr>
<tr>
<td>\.</td><td>matches a period</td>
</tr>
<tr>
<td>\s</td><td>matches whitespace (spaces, tabs, carriage returns, etc.)</td>
</tr>
<tr>
<td>\S</td><td>matches any non-whitespace character</td>
</tr>

<tr>
<th colspan="2" class="header">Anchors specify a position in a string where a match must occur.</th>
</tr>
<tr>
<td>^</td><td>defines the start</td>
</tr>
<tr>
<td>$</td><td>defines the end</td>
</tr>

<tr>
<th colspan="2" class="header">Character classes define sets of characters any one of which can occur to create a match.</th>
</tr>
<tr>
<td>[abc]</td><td>defines a character class / set allowing only a, b, or c</td>
</tr>
<tr>
<td>[^abc]</td><td>defines a character class / set allowing neither a, b, nor c</td>
</tr>
<tr>
<td>[a-z]</td><td>defines a character class / set allowing any letters a to z</td>
</tr>
<tr>
<td>[0-9]</td><td>defines a character class / set allowing any numbers 0 to 9</td>
</tr>

<tr>
<th colspan="2" class="header">Quantifiers are used to specify how many instances of a character or group must be found to create a match.</th>
</tr>
<tr>
<td>?</td><td>defines preceeding character as optional</td>
</tr>
<tr>
<td>*</td><td>defines zero or more repetitions</td>
</tr>
<tr>
<td>+</td><td>defines one or more repetitions</td>
</tr>
<tr>
<td>{m}</td><td>defines m number of repetitions</td>
</tr>
<tr>
<td>{m,n}</td><td>defines between m and n number of repetitions</td>
</tr>

<tr>
<th colspan="2" class="header">Grouping allows you to apply quantifiers or alterations to only a part of your Regular Expression.</th>
</tr>
<tr>
<td>(…)</td><td>defines a capture group</td>
</tr>
<tr>
<td>(a(bc))</td><td>defines a capture sub-group</td>
</tr>
<tr>
<td>(.*)</td><td>defines a capture all group</td>
</tr>
<tr>
<td>(abc|def)</td><td>defines a capture group of either abc or def</td>
</tr>
</table>

![alt meme](http://www.quickmeme.com/img/28/28267ccca83716ccddc3a2e194e8b0052cae3a204de3f37928a20e8ff4f0ee65.jpg)

##Python RegEx Examples

###Example 1: Match a Word at the Beginning of a String
Uses a Regular Expression and re.match() to match a specific word, 'Nothing', at the beginning of a string.

<pre>
import re

string = 'Nothing in this world is difficult, but thinking makes it seem so. Where there is true will, there is always a way.'
regex = 'Nothing'
result = re.match(regex, string)
print(result)
</pre>

###Example 2: Match a Word Anywhere Within a String
Uses a Regular Expression and re.search() to match a specific word, 'difficult', anywhere within a string.

<pre>
import re

string = 'Nothing in this world is difficult, but thinking makes it seem so. Where there is true will, there is always a way.'
regex = 'difficult'
result = re.search(regex, string)
print(result)
</pre>

###Example 3: Using Repititions
Uses a Regular Expression and re.findall() to match 'boat' or 'oat' (matched from the word 'floating'). The '?' character makes the 'b' optional.

<pre>
import re

string = '"The boatman then gently guided the raft across. They saw a dead body floating. At the sight of this, the Master was greatly frightened. But Sun smiled and said, "Master do not be alarmed! That corpse is none other than your own."'
regex = 'b?oat'
result = re.findall(regex, string)
print(result)
</pre>

###Example 4: Using Character Classes
Uses a Regular Expression and re.findall() to match both upper and lower case versions of a word, 'Wife' or 'wife', by using a character class. '[' and ']' are used to create the character class.

<pre>
import re

string = '"Wife indeed!" laughed Monkey. "You haven\'t got a wife now. There are some sorts of Taoists that are family men; but who ever heard of a Buddhist priest calmly talking about his wife?"'
regex = '[Ww]ife'
result = re.findall(regex, string)
print(result)
</pre>

###Example 5: Using Groups
Uses a regular expression and re.findall() to match upper and lower case versions of the words, 'Monkey', 'monkey', 'Monster', and 'monster', by using a group. '(' and ')' are used to create the group. The '|' character additionally defines a conditional, meaning the regular expression will match both 'key' and 'ster'. '?:' defines a non-capturing group, meaning the regular expression will capture the entire expression. Without the use of '?:' you would get matches for 'Monkey', 'key', monster', and 'ster'.

<pre>
import re

string = '"What you must do," said Monkey, "is lure the monster from its hiding place, but be certain it is a fight you can survive."'
regex = '[Mm]on(?:key|ster)'
result = re.findall(regex, string)
print(result)
</pre>

###Example 6: Using Anchors
Uses a regular expression and re.findall() to match upper and lower case versions of the word, 'He' or 'he'. The '^' character ensures that the match only occures at the beginning of the string, preventing the second 'he' in the sample string from matching.

<pre>
import re

string = 'Hero is he alone who vies with powers supreme!'
regex = '^[Hh]e'
result = re.findall(regex, string)
print(result)
</pre>

##RegEx Examples With Beautiful Soup

###Example 7: All Chinese All The Time
Uses a Regular Expression to scrape only Chinese characters ([Unicode](https://en.wikipedia.org/wiki/Unicode) values between u4e00 and u9fff) from a webpage and output them to the terminal (http://search.jd.com/Search?keyword=iphone&enc=utf-8&wq=iphone&pvid=lklqiugi.hhf00p):

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

###Example 8: Scrape Prices 
Uses a Regular Expression to remove $, £, and ￥ from prices before calculating the sum and average from Amazon US, UK, or CN:

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

###Example 9: Scrape Quoted Text
Uses a Regular Expression to first sanitize smart quotes, then finds all quoted text on a webpage, and finally saves the collected quotes to a json file (http://www.huffingtonpost.com/entry/orangutan-gito-iar-palm-oil-pet-rescue_56269558e4b0bce3470290c9):

<pre>
from bs4 import BeautifulSoup
import urllib.request
import re
import json

url = 'http://www.huffingtonpost.com/entry/orangutan-gito-iar-palm-oil-pet-rescue_56269558e4b0bce3470290c9'
page = urllib.request.urlopen(url)
soup = BeautifulSoup(page.read())

html = re.sub('“|”', '"', str(soup))
soup = BeautifulSoup(html)

quotesJson = []

for tag in soup.find_all('p'):
    matches = re.findall('"(.+?)"', tag.text)
    for match in matches:
        print(match)
        quotesJson.append({'quote': match})

with open('quotes.json', 'w') as jsonFile:
    json.dump(quotesJson, jsonFile)
</pre>

##Resources

* RegexOne: [http://regexone.com](http://regexone.com)
* Regex Pal: [http://www.regexpal.com](http://www.regexpal.com)
* Regular-Expressions.info: [http://www.regular-expressions.info](http://www.regular-expressions.info)
* Python Regular Expressiosn: [http://www.tutorialspoint.com/python/python_reg_expressions.htm](http://www.tutorialspoint.com/python/python_reg_expressions.htm)
* 7 Python Regular Expressions Examples – Re Match Search FindAll: [http://www.thegeekstuff.com/2014/07/python-regex-examples/](http://www.thegeekstuff.com/2014/07/python-regex-examples/)
* Python: Regular Expression HOWTO: [https://docs.python.org/3.5/howto/regex.html#regex-howto](https://docs.python.org/3.5/howto/regex.html#regex-howto)
* Python: re – Regular expression operations: [https://docs.python.org/3.5/library/re.html](https://docs.python.org/3.5/library/re.html)
* Beautiful Soup: Kinds of filters: A regular expression [http://www.crummy.com/software/BeautifulSoup/bs4/doc/#kinds-of-filters](http://www.crummy.com/software/BeautifulSoup/bs4/doc/#kinds-of-filters)
