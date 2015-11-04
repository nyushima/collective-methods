#Beautiful Soup Tutorial

##Installation
1. Upgrade Python on your computer by visiting the following link: [https://www.python.org/downloads/](https://www.python.org/downloads/)

2. Open the Terminal Application (Mac OS) or the Command Promt (Windows) on your computer and type the following command to install Beautiful Soup:
<br />
sudo pip install beautifulsoup4

3. Enter your username and password when prompted to do so.

4. Create a new file in your text editor of choice, give it whatever name you want, but be sure to save it with a .py extension. I suggest naming your first file soup-test.py and saving it into your user directory.

5. Copy the Example 1 code below into your Python file and save it.

6. Return to the Termincal Application or Command Prompt and run the following command:
<br />
python soup-test.py

7. You should see the following output:
<pre>
<html>
 <head>
  <title>
   The Dormouse's story
  </title>
 </head>
 <body>
  <p class="title">
   <b>
    The Dormouse's story
   </b>
  </p>
  <p class="story">
   Once upon a time there were three little sisters; and their names were
   <a class="sister" href="http://example.com/elsie" id="link1">
    Elsie
   </a>
   ,
   <a class="sister" href="http://example.com/lacie" id="link2">
    Lacie
   </a>
   and
   <a class="sister" href="http://example.com/tillie" id="link3">
    Tillie
   </a>
   ;
and they lived at the bottom of a well.
  </p>
  <p class="story">
   ...
  </p>
 </body>
</html>
---
<title>The Dormouse's story</title>
---
<a class="sister" href="http://example.com/elsie" id="link1">Elsie</a>
---
[<a class="sister" href="http://example.com/elsie" id="link1">Elsie</a>, <a class="sister" href="http://example.com/lacie" id="link2">Lacie</a>, <a class="sister" href="http://example.com/tillie" id="link3">Tillie</a>]
</pre>

##Examples

###Example 1: Simple Scrape
First test, scapes various pieces of data from an internal HTML document fragment. Of limited use, but a good first test:

<pre>
from bs4 import BeautifulSoup

html_doc = """
<html>
<head>
<title>The Dormouse's story</title>
</head>
<body>
<p class="title"><b>The Dormouse's story</b></p>
<p class="story">Once upon a time there were three little sisters; and their names were
<a href="http://example.com/elsie" class="sister" id="link1">Elsie</a>,
<a href="http://example.com/lacie" class="sister" id="link2">Lacie</a> and
<a href="http://example.com/tillie" class="sister" id="link3">Tillie</a>;
and they lived at the bottom of a well.</p>
<p class="story">...</p>
"""

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

###Example 2: Web Scrape
This scape will use Beautiful Soup to scape data from a live webpage (http://news.google.com):

<pre>
from bs4 import BeautifulSoup
import urllib.request

url = 'http://news.google.com'
page = urllib.request.urlopen(url)
soup = BeautifulSoup(page.read())
print(soup.prettify())
</pre>

##Documentation

Visit the following page for detailed Beautiful Soup documentation: [http://www.crummy.com/software/BeautifulSoup/bs4/doc/](http://www.crummy.com/software/BeautifulSoup/bs4/doc/)
