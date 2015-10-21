#artoo.js Setup and Examples

</br>

##How to Install artoo.js
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

###Example 1: Simple Scrape
First test, go to http://hackernews.com, click on the artoo bookmark, and copy and paste this code into your javascript console:

<pre>
artoo.scrape('td.title:nth-child(3)', {
	title: {sel: 'a'},
	url: {sel: 'a', attr: 'href'}
}, 
artoo.savePrettyJson);
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

![alt meme](http://oi60.tinypic.com/12375mt.jpg)

</br>

###Example 3: Scrape Anchor Tags
######Get the content, href, and class of all anchor tags on a page:
<pre>
artoo.scrape('a', {
	content: 'text', 
	href: 'href', 
	class: 'class'
});
</pre>

###Example 4: Scrape Quoted Text
######Get any quoted text from a page and save it to a JSON file:
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

####Example 5: Scrape Text & Replace
######Finds a string and replaces it with another string. Try it out on the Nikola Tesla Wikipedia page (https://en.wikipedia.org/wiki/Nikola_Tesla):
<pre>
artoo.scrape('body > *', {
	text: function() {
		var searchFor = 'Nikola ';
		var replaceWith = 'Kykle ';
		var html = $(this).html();
		if (html.search(searchFor) > -1) {
			var newHtml = html.replace(new RegExp(searchFor, 'g'), replaceWith);
			$(this).html(newHtml);
		}
	}
});
</pre>

###Example 5: Scrape Images & Replace
######Finds all of the images on a webpage and replaces them with an image of a cat:
<pre>
artoo.scrape('img', function($) {
	var imgSrc = "http://www.lorempixel.com/400/200/cats";
	console.log($(this).context.src);
	$(this).context.src = imgSrc;
	return $(this).src = imgSrc;
	//every time the object is found, return it with the image you want to replace
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
