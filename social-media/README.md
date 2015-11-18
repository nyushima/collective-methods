#Data Mining Social Media Tutorial

##Overview
Mining data from social media websites is in some ways easier than scraping data from most websites through the availability of official APIs. Major social media websites, including Twitter and Facebook, have official APIs. These APIs provide an interface for the data particular to that website, and they allow you to make requests for specific pieces of information through the API.

Pyhon has many libraries devoted to facilitating access to these and other APIs. In this class, we'll examine two libraries, one called [Tweepy](http://www.tweepy.org) that is aimed at Twitter data mining, and the other called [Facebook Platform Python SDK](http://www.pythonforfacebook.com) that is aimed at Facebook data mining.

Below are instructions and examples for working with both of these libraries.

##Getting Started With Tweepy

Tweepy is a Python library for accessing the [Twitter API](https://dev.twitter.com), facilitating access to Twitter data including information about users, tweets, trends, and relationships.

###Tweepy Installation
To install Tweepy using Python 3.x we can use pip, the Python package manager, by issuing the following command in the Terminal:

<pre>
python3 -m pip install tweepy
</pre>

###Twitter API Access
In order to access the Twitter API you need to create a new app using the [Twitter Application Manager](https://apps.twitter.com). 

Once you have registered your app, you need the following pieces of information, available from the 'Keys and Access Tokens' tab of the app, the 'Consumer Key (API Key)' and 'Consumer Secret (API Secret)' found under 'Application Settings,' and the 'Access Token' and 'Access Token Secret' found under 'Your Access Token.' These long strings or random letters and numbers are like keys to the Twitter API. You will need to enter these keys into your Python code. However, do not make them publically available. Remember to remove your keys before commiting your code.

Now you can try some of the Tweepy examples below.

![alt meme](http://cdn.meme.am/instances2/500x/2940191.jpg)

##Tweepy Examples

###Example 1: Post a Tweet
Uses Tweepy to post a tweet to your Twitter account.

<pre>
import tweepy

#Enter the keys, tokens and secrets for your app below.
consumer_key = ''
consumer_secret = ''
access_token = ''
access_token_secret = ''

auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
auth.set_access_token(access_token, access_token_secret)
api = tweepy.API(auth)

#Enter a tweet.
tweet_text = 'I love Collective Methods!'
status = api.update_status(status=tweet_text)
print(status)
</pre>

###Example 2: Get Tweets About Monkeys
Uses Tweepy to return recent tweets about monkeys and outputs details about the tweet including the name, username, date, content, hashtags, etc.

<pre>
import tweepy

#Enter the details for your app below.
consumer_key = ''
consumer_secret = ''
access_token = ''
access_token_secret = ''

auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
auth.set_access_token(access_token, access_token_secret)
api = tweepy.API(auth)

#Enter the term for your search.
searchTerm = 'monkeys'

for tweet in tweepy.Cursor(api.search, q=(search_term)).items(10):
	print('Name:', tweet.author.name)
	print('Screen name:', tweet.author.screen_name)
	print('Date tweeted:', tweet.created_at)
	print('Tweet content:', tweet.text)
	print('Hashtags:', tweet.entities.get('hashtags'))
	print('Retweeted:', tweet.retweeted)
	print('Favorited:', tweet.favorited)
	print('Location:', tweet.user.location)
	print('Time zone:', tweet.user.time_zone)
	print('Location:', tweet.geo)
	print('-----')
</pre>

###Example 3: Get Tweets for a Given User
Uses Tweepy to return recent tweets by a given user, in this case base2john.

<pre>
import tweepy

#Enter the details for your app below.
consumer_key = ''
consumer_secret = ''
access_token = ''
access_token_secret = ''

auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
auth.set_access_token(access_token, access_token_secret)
api = tweepy.API(auth)

#Enter the username of the user who's timeline you want to retreive
username = 'base2john'

tweets = api.user_timeline(username)
for tweet in tweets:
    print(tweet.text)
</pre>

###Example 4: Get Trends for a Location
Uses Tweepy to return recent trends for a given location, in this case New York City.

<pre>
import tweepy

#Enter the details for your app below.
consumer_key = ''
consumer_secret = ''
access_token = ''
access_token_secret = ''

auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
auth.set_access_token(access_token, access_token_secret)
api = tweepy.API(auth)

#Enter a woeid. A woeid is a Where On Earth Identifier that identifies any feature on Earth. This is the woeid for New York City.
woeid = 2459115

trends = api.trends_place(woeid)
print(trends[0]['trends'])
for trend in trends[0]['trends']:
	print(trend['name'])
</pre>

##Getting Started With Facebook Platform Python SDK

Facebook Platform Python SDK is a Python library for accessing the [Facebook Graph API](https://developers.facebook.com/docs/graph-api), facilitating access to Facebook data including information about users, posts, pages, and relationships.

###Facebook Platform Python SDK Installation
Unforutnately, the current release version of Facebook Platform Python SDK is not compatible with Python 3, so we can't use the Python package manager, pip, to install the package. Instead, we need to install the latest version from the GitHub repository. To do this, first download the zip file from [here](https://github.com/pythonforfacebook/facebook-sdk/archive/master.zip) and extract it. Assuming the file was downloaded and extracted into your downloads folder, issue the following command in the Terminal:

<pre>
python3 ~/Downloads/facebook-sdk-master/setup.py
</pre>

To use the Facebook Graph API you need an access token. To get an access token, click on the 'Get Token' menu on the [Graph API Explorer page](https://developers.facebook.com/tools/explorer/) and select 'Get User Access Token.' On the following dialog, click the 'Get Access Token' button, and when prompted login to Facebook. The access token is a long string of random letters and numbers that acts like a key to the Facebook Graph API. You will need to enter this key into your Python code. However, do not make it publically available. Remember to remove your key before commiting your code.

Now you can try some of the Facebook Platform Python SDK examples below.

![alt meme]()

##Facebook Platform Python SDK Examples

###Example 5: Post a Status Update & Like It
Uses Facebook Platform Python SDK to post a status update to your Facebook account.

<pre>
import facebook

#Enter your Facebook Graph API Access Token below.
access_token = ''

graph = facebook.GraphAPI(access_token)

status_update = 'I love Collective Methods! 2'
post = graph.put_wall_post(message=status_update)
print(post)

like = graph.put_like(object_id=post['id'])
print(like)
</pre>

###Example 6: Get Posts for a Given Page or User
Uses Facebook Platform Python SDK to return recent posts from a given page or user, in this case nyushima.

<pre>
import facebook

#Enter your Facebook Graph API Access Token below.
access_token = ''

graph = facebook.GraphAPI(access_token)

#Enter the Facebook page name or user id (not name or username) of the page or person you'd like to return.
user = 'nyushima'
profile = graph.get_object(user)
posts = graph.get_connections(profile['id'], 'posts')
print(posts['data'][0]['message'])

def print_post_details(post):
	print('-----')
	print(post['id'])
	print(post['message'])
	print(post['picture'])
	print(post['likes'])

[print_post_details(post=post) for post in posts['data']]
</pre>

###Example 7: Get Friends of a Given User
Uses Facebook Platform Python SDK to return friends a given user.

<pre>
import facebook

#Enter your Facebook Graph API Access Token below.
access_token = ''

graph = facebook.GraphAPI(access_token)

#Enter the Facebook user id (not name or username) of the person you'd like to return friends of.
user_id = ''
friends = graph.get_connections(id=user_id, connection_name='friends')

print(friends['summary']['total_count'])

def print_friend_details(friend):
	print('-----')
	print(friend['id'])
	print(friend['name'])

[print_friend_details(friend=friend) for friend in friends['data']]
</pre>

##Resources

* Tweepy Documentation: [http://tweepy.readthedocs.org](http://tweepy.readthedocs.org)
* Facebook SDK for Python Documentation: [https://facebook-sdk.readthedocs.org/en/latest/install.html](https://facebook-sdk.readthedocs.org/en/latest/install.html)
