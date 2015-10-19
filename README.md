#artoo.js setup and examples

</br>

##how to install
1. Go to [http://medialib.github.io/artoo/quick_start/](http://medialib.github.io/artoo/quick_start/)

2. Open Google Chrome, click the "View" menu, and select "Always show bookmark bar"

3. Drag the artoo.js logo at the top of the page into your bookmark bar. If successfull, it will say "artoo" in your bookmark bar. 

4. Open your javascript console (command + option + j on a Mac) and click on the artoo icon in your bookmark bar. You will see this:

<pre>
artoo-latest.min.js:2    
   .-""-.   
  /[] _ _\  
 _|_o_LII|_ 
/ | ==== | \
|_| ==== |_|
 ||LI  o ||
 ||'----'||    artoo.js
/__|    |__\   v0.3.2
artoo-latest.min.js:2 [artoo]: info - jQuery was correctly injected into your page (v2.1.3).
artoo-latest.min.js:2 [artoo]: info - artoo is now good to go! "
</pre>

</br>
</br>

##Examples

![alt meme](http://oi60.tinypic.com/12375mt.jpg)

###Example 1: Simple Scrape
First test, go to http://hackernews.com, click on the artoo bookmark, and copy and paste this code into your javascript console:

<pre>
artoo.scrape('td.title:nth-child(3)', {
  title: {sel: 'a'},
  url: {sel: 'a', attr: 'href'}
}, artoo.savePrettyJson);
</pre>

Chrome will begin to download a data.json file that has all of the headlines and links from the the Hacker News website.

</br>

###Example 2: Scrape All The Things
Now try a more complex scrape. Paste this inside your console:

<pre>
artoo.scrape('tr tr:has(td.title:has(a)):not(:last)', {
  title: {sel: '.title a'},
  url: {sel: '.title a', attr: 'href'},
  domain: {
    sel: '.comhead',
    method: function($) {
      return $(this).text().trim().replace(/[\(\)]/g, '');
    }
  },
  score: {
    sel: '+ tr [id^=score]',
    method: function($) {
      return +$(this).text().replace(/ points/, '');
    }
  },
  user: {
    sel: '+ tr a[href^=user]',
    method: function($) {
      return $(this).length ? $(this).text() : null;
    }
  },
  nb_comments: {
    sel: '+ tr a[href^=item]',
    method: function($) {
      var nb = +$(this).text().replace(/ comments/, '');
      return isNaN(nb) ? 0 : nb;
    }
  }
}, artoo.savePrettyJson);
</pre>

</br>

###Example 3: Find Elements
Get the content or properties of elements on a page 
<pre>
artoo.scrape('a.links_wrapper__link', {
	content: 'text', 
	href: 'href', 
	class: 'class'
});
</pre>

Get any quoted text from a page and save it to a JSON file.
<pre>
var quotes = [];
artoo.scrape('p', {
	text: function($) {
		var text = $(this).text();
		var quote = text.match(/"(.*?)"/);
		if (quote != null) {
			quotes.push(quote[1]);
		}
	}
}, function() {
	artoo.savePrettyJson(quotes);
});
</pre>
</br>
Get all links from a page.
<pre>
artoo.scrape('a', {
	link: 'href'},
artoo.savePrettyJson);
</pre>

###Example 4: Image Scrape
######This example will scrape the images from a webpage.
#####[Using reddit.com 'front page' as an example]
<pre>
var myJson = artoo.scrape('.thumbnail img', {
  src: {attr: 'src'}
}, artoo.savePrettyJson);
</pre>
This will give you a data.json file with a list of .jpg links.
</br>
<br>
After generating the JSON file, run this python script to download the images to your hard-drive.</br><br>
Create a python (.py) file named 'imagegrabber.py', copy and paste the code below. </br>
<pre>
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
</pre>

###Example 5: Image Replace
######This examples finds all the images on a webpages and replaces the images with cats
<pre>
artoo.scrape('img', function($) {
//$ references the JQuery object
  var imgSrc = "http://www.lorempixel.com/400/200/cats";
  console.log($(this).context.src);
  $(this).context.src = imgSrc;
  return $(this).src = imgSrc;
//every time the object is found, return it with the image you want to replace
});
</pre>


####Example 6: Find and Replace Text 
######This example finds a word or sentence and replaces it with whatever text you want. Try it out on a Wikipedia page
<pre>
artoo.scrape('p, h1, a', {
	text: function($) {
		var text = $(this).text().toLowerCase();
		var find = "new york university";
		var newText = text.replace(find, "Matt Belanger");
		$(this).context.innerText = newText;
		console.log($(this));
		return $(this).context.innerText = newText;

	}
});
  </pre>

##Documentation

* artoo.scrape - scrapes data.

* artoo.save - downloads the scraped data.

* artoo.ajaxspider - crawls and triggers a series of ajax requests that passes the accumulated data to a final callback.

* artoo.ajaxSniffer - helps you grab some of the circulating data of the web page you need to scrape.

* artoo.ajaxSnigger.before - Gives you a chance to register a callback to be fired any time an ajax request is made by the page.

* artoo.ajaxSnigger.after - Gives you a chance to register a callback to be fired any time an ajax request is completed by the page.

* artoo.ajaxSnigger.off - Remove the given callback from the ajax sniffing stack.