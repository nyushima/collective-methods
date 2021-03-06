#Beautiful Soup Tutorial

##Installation
######The documentation for Beautiful Soup is great, but it assumes that you are using a Linux based operating system for your computer. Since most of you are Mac OS or Windows users, the installation instructions below were created for those platforms.
######All examples below assume that you are using Python 3.x. Computers running Mac OS ship with version 2.x of Python by default while Windows systems do not include Python by default. Follow the instructions to install Python 3.x on your computer.

###Installation
1. Download and install Python 3.x for your operating system from the the following link: [https://www.python.org/downloads/](https://www.python.org/downloads/).

2. After installation, Python 3.x will be available to you from either the Terminal Application (Mac OS) or the Command Prompt (Windows):
#####Mac OS:
Python 3.x is now available via the python3 command, while Python 2.x will remain available via the python command.
#####Windows:
Python 3.x is now available via the py command.

3. Now you can install Beautiful Soup using pip, the Python package manager, using the following command in either the  Terminal Application (Mac OS) or the Command Prompt (Windows):
#####Mac OS:
<pre>
python3 -m pip install beautifulsoup4
</pre>
#####Windows:
<pre>
py -m pip install beautifulsoup4
</pre>

4. Create a new file in your text editor of choice, give it whatever name you want, but be sure to save it with a .py extension. Try naming your first file soup-test.py and saving it into your user directory.

5. Copy the Example 1 code below into your Python file and save it.

6. Return to the Terminal Application (Mac OS) or Command Prompt (Windows) and run the following command:
#####Mac OS:
<pre>
python3 soup-test.py
</pre>
#####Windows:
<pre>
py soup-test.py
</pre>

7. You should see the following output:
<pre>
&lt;html&gt;
 &lt;head&gt;
  &lt;title&gt;
   The Dormouse's story
  &lt;/title&gt;
 &lt;/head&gt;
 &lt;body&gt;
  &lt;p class=&quot;title&quot;&gt;
   &lt;b&gt;
    The Dormouse's story
   &lt;/b&gt;
  &lt;/p&gt;
  &lt;p class=&quot;story&quot;&gt;
   Once upon a time there were three little sisters; and their names were
   &lt;a class=&quot;sister&quot; href=&quot;http://example.com/elsie&quot; id=&quot;link1&quot;&gt;
    Elsie
   &lt;/a&gt;
   ,
   &lt;a class=&quot;sister&quot; href=&quot;http://example.com/lacie&quot; id=&quot;link2&quot;&gt;
    Lacie
   &lt;/a&gt;
   and
   &lt;a class=&quot;sister&quot; href=&quot;http://example.com/tillie&quot; id=&quot;link3&quot;&gt;
    Tillie
   &lt;/a&gt;
   ;
and they lived at the bottom of a well.
  &lt;/p&gt;
  &lt;p class=&quot;story&quot;&gt;
   ...
  &lt;/p&gt;
 &lt;/body&gt;
&lt;/html&gt;
---
&lt;title&gt;The Dormouse's story&lt;/title&gt;
---
&lt;a class=&quot;sister&quot; href=&quot;http://example.com/elsie&quot; id=&quot;link1&quot;&gt;Elsie&lt;/a&gt;
---
[&lt;a class=&quot;sister&quot; href=&quot;http://example.com/elsie&quot; id=&quot;link1&quot;&gt;Elsie&lt;/a&gt;, &lt;a class=&quot;sister&quot; href=&quot;http://example.com/lacie&quot; id=&quot;link2&quot;&gt;Lacie&lt;/a&gt;, &lt;a class=&quot;sister&quot; href=&quot;http://example.com/tillie&quot; id=&quot;link3&quot;&gt;Tillie&lt;/a&gt;]
</pre>

8. If you don't see the above output, something went wrong with your installation, or you may be working in the wrong directory from the Terminal Application or the Command Prompt. You can use the [cd](https://en.wikipedia.org/wiki/Cd_(command)) command to change your working directory. If you can't get the first example working within about half an hour please reach out for help. There is no point wasting time at this stage when we can help you get setup.

![alt meme](http://cdn.meme.am/instances/500x/54583425.jpg)

##Examples

###Example 1: Test Scrape
First test, scapes various pieces of data (title, first anchor tag, and all anchor tags) from an HTML formatted string. Of limited use, but a good first test:

<pre>
from bs4 import BeautifulSoup

html_doc = &quot;&quot;&quot;
&lt;html&gt;
&lt;head&gt;
&lt;title&gt;The Dormouse's story&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
&lt;p class=&quot;title&quot;&gt;&lt;b&gt;The Dormouse's story&lt;/b&gt;&lt;/p&gt;
&lt;p class=&quot;story&quot;&gt;Once upon a time there were three little sisters; and their names were
&lt;a href=&quot;http://example.com/elsie&quot; class=&quot;sister&quot; id=&quot;link1&quot;&gt;Elsie&lt;/a&gt;,
&lt;a href=&quot;http://example.com/lacie&quot; class=&quot;sister&quot; id=&quot;link2&quot;&gt;Lacie&lt;/a&gt; and
&lt;a href=&quot;http://example.com/tillie&quot; class=&quot;sister&quot; id=&quot;link3&quot;&gt;Tillie&lt;/a&gt;;
and they lived at the bottom of a well.&lt;/p&gt;
&lt;p class=&quot;story&quot;&gt;...&lt;/p&gt;
&quot;&quot;&quot;

soup = BeautifulSoup(html_doc, 'html.parser')

print(soup.prettify())
print('-----')
print(soup.title)
print('-----')
print(soup.a)
print('-----')
print(soup.find_all('a'))
</pre>

Chrome will begin to download a data.json file that has all of the headlines and links from the the Hacker News website.

###Example 2: Web Scrape of Anchor Tags
This scape will use Beautiful Soup to scape all anchor tags from a live webpage (http://news.google.com):

<pre>
from bs4 import BeautifulSoup
import urllib.request

url = 'http://news.google.com'
page = urllib.request.urlopen(url)
soup = BeautifulSoup(page.read())
links = soup.find_all('a')

for link in links:
	linkText = link.text or ''
	linkHref = link.get('href') or ''
	print(linkText + ' | ' + linkHref)
</pre>

###Example 3: Web Scrape of Anchor Tags &amp; Save to CSV File
This scape will use Beautiful Soup to scape all anchor tags from a live webpage (http://news.google.com) and save the result as a CSV file:

<pre>
from bs4 import BeautifulSoup
import urllib.request
import csv

url = 'http://news.google.com'
page = urllib.request.urlopen(url)
soup = BeautifulSoup(page.read())
links = soup.find_all('a')
csvFile = csv.writer(open('soup.csv', 'w'))
csvFile.writerow(['text','href'])

for link in links:
    linkText = link.text
    linkHref = link.get('href')
    csvFile.writerow([linkText,linkHref])
</pre>

###Example 4: Web Scrape of Anchor Tags &amp; Save to JSON File
This scape will use Beautiful Soup to scape all anchor tags from a live webpage (http://news.google.com) and save the result as a JSON file:

<pre>
from bs4 import BeautifulSoup
import urllib.request
import json

url = 'http://news.google.com'
page = urllib.request.urlopen(url)
soup = BeautifulSoup(page.read())
links = soup.find_all('a')
linksJson = []

for link in links:
	linkText = link.text
	linkHref = link.get('href')
	linksJson.append({'text':linkText, 'href': linkHref})

with open('soup.json', 'w') as jsonFile:
	json.dump(linksJson, jsonFile)
</pre>

##Resources

* Beautiful Soup documentation: [http://www.crummy.com/software/BeautifulSoup/bs4/doc/](http://www.crummy.com/software/BeautifulSoup/bs4/doc/)
* Python: URL handling modules: [https://docs.python.org/3.5/library/urllib.html](https://docs.python.org/3.5/library/urllib.html)
* Python: CSV File Reading and Writing: [https://docs.python.org/3.5/library/csv.html](https://docs.python.org/3.5/library/csv.html)
* Python: JSON encoder and decoder: [https://docs.python.org/3.5/library/json.html](https://docs.python.org/3.5/library/json.html)
* JSONLint: The JSON Validator: [http://jsonlint.com](http://jsonlint.com)
