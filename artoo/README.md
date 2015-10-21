#artoo.js Tutorial

##Installation
1. Go to: [http://medialab.github.io/artoo/quick_start/](http://medialab.github.io/artoo/quick_start/)

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

##Examples

###Example 1: Simple Scrape
First test, go to Hacker News (http://hackernews.com), click on the artoo bookmark, and copy and paste this code into your javascript console:

<pre>
artoo.scrape('td.title:nth-child(3)', {
	title: {sel: 'a'},
	url: {sel: 'a', attr: 'href'}
}, 
artoo.savePrettyJson);
</pre>

Chrome will begin to download a data.json file that has all of the headlines and links from the the Hacker News website.

###Example 2: Scrape All The Things
Now try a more complex scrape. While on the Hacker News website, paste this inside your console:

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

###Example 3: Scrape Anchor Tags
######Get the content, href, and class of all anchor tags on a page. Try this on W3 Schools (http://www.w3schools.com).
<pre>
artoo.scrape('a', {
	content: 'text', 
	href: 'href', 
	class: 'class'
});
</pre>

###Example 3: Scrape Reddit Comments
######Get comments and relevant information for all comments on a given Reddit page and save it to a JSON file. Try this on Reddit (https://www.reddit.com/r/videos/comments/3pkqfj/motorcyclist_saves_kitten_on_intersection/).
<pre>
var redditComments = [];
var author, dislikes, unvoted, likes, dateTime, md;
artoo.scrape('.entry', {
	text: function() {
		author = $(this).find('.author').text();
		dislikes = $(this).find('.dislikes').text();
		unvoted = $(this).find('.unvoted').text();
		likes = $(this).find('.likes').text();
		dateTime = $(this).find('.dateTime').text();
		md = $(this).find('.md').text();
		if (author != '') {
			var comment = {
				'author': author,
				'dislikes': dislikes,
				'unvoted': unvoted,
				'likes': likes,
				'md': md	
			};
			redditComments.push(comment);
		}
	}
}, function() {
	artoo.savePrettyJson(redditComments);
});
</pre>

###Example 5: Scrape Quoted Text
######Get any double quoted text from a page and save it to a JSON file. Try this on a Huffinton Post article (http://www.huffingtonpost.com/entry/orangutan-gito-iar-palm-oil-pet-rescue_56269558e4b0bce3470290c9).
<pre>
var quotes = [];
artoo.scrape('p', {
	text: function() {
		var text = $(this).text();
		text = text.replace(/“|”/g, '"');
		var quote = text.match(/"(.*?)"/);
		if (quote != null) {
			quotes.push(quote[1]);
		}
	}
}, function() {
	artoo.savePrettyJson(quotes);
});
</pre>

###Example 6: Scrape Text & Replace
######Finds a string and replaces it with another string. Try this on the Nikola Tesla Wikipedia page (https://en.wikipedia.org/wiki/Nikola_Tesla).
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

###Example 7: Scrape Images & Replace
######Finds all of the images on a webpage and replaces them with an image of monkeys. Try this on the NYU Shanghai website (http://shanghai.nyu.edu).
<pre>
artoo.scrape('img', function($) {
	var imgSrc = 'http://nyushima.s3.amazonaws.com/golden-snub-nose.jpg';
	$(this).attr('src', imgSrc);
});
</pre>

##Documentation

Visit the following page for detailed artoo.js documentation: [http://medialab.github.io/artoo/methods/](http://medialab.github.io/artoo/methods/)
