#Data Mining Social Media Tutorial

##Overview
Description coming soon...

##Getting Started With Tweepy

Tweepy(http://www.tweepy.org) is a Python library for accessing the [Twitter API](https://dev.twitter.com), facilitating access to Twitter data including information about users, tweets, trends, and relationships.

###Tweepy Installation
To install Tweepy using Python 3.x we can use pip, the Python package manager, by issuing the following command in the Terminal:

<pre>
python3 -m pip install tweepy
</pre>

###Twitter API Access
In order to access the Twitter API you need to create a new app using the [Twitter Application Manager](https://apps.twitter.com). 

Once you have registered your app, you need the following pieces of information, available from the 'Keys and Access Tokens' tab of the app, the 'Consumer Key (API Key)' and 'Consumer Secret (API Secret)' found under 'Application Settings,' and the 'Access Token' and 'Access Token Secret' found under 'Your Access Token.' These long strings or random letters and numbers are like keys to the Twitter API. You will need to enter these keys into your Python code. However, do not make them publically available. Remember to remove your keys before commiting your code.

Now you can import the tweepy package into your Python code and begin using it.

##Getting Started With Facebook Platform Python SDK

Facebook Platform Python SDK is a Python library for accessing the [Facebook Graph API](https://developers.facebook.com/docs/graph-api), facilitating access to Facebook data including information about users, posts, pages, and relationships.

###Facebook Platform Python SDK Installation
Unforutnately, the current release version of Facebook Platform Python SDK is not compatible with Python 3, so we can't use the Python package manager, pip, to install the package. Instead, we need to install the latest version from the GitHub repository. To do this, first download the zip file from here(https://github.com/pythonforfacebook/facebook-sdk/archive/master.zip) and extract it. Assuming the file was downloaded to your downloads folder, issue the following command in the Terminal:

<pre>
python3 ~/Downloads/facebook-sdk-master/setup.py
</pre>

To use the Facebook Graph API you need an access token. To get an access token, click on the 'Get Token' menu on the [Graph API Explorer page](https://developers.facebook.com/tools/explorer/) and select 'Get User Access Token.' On the following dialog, click the 'Get Access Token' button, and when prompted login to Facebook. The access token is a long string of random letters and numbers that acts like a key to the Facebook Graph API. You will need to enter this key into your Python code. However, do not make it publically available. Remember to remove your key before commiting your code.

Now you can import the facebook package into your Python code and begin using it.

![alt meme]()

##Tweepy Examples

###Example 1: Tweepy Example
Description goes here.

<pre>
</pre>

###Example 2: Tweepy Example
Description goes here.

<pre>
</pre>

###Example 3: Tweepy Example
Description goes here.

<pre>
</pre>

###Example 4: Tweepy Example
Description goes here.

<pre>
</pre>

##Facebook Platform Python SDK Examples

###Example 5: Facebook Platform Python SDK Example
Description goes here.

<pre>
</pre>

###Example 6: Facebook Platform Python SDK Example
Description goes here.

<pre>
</pre>

###Example 7: Facebook Platform Python SDK Example
Description goes here.

<pre>
</pre>

###Example 8: Facebook Platform Python SDK Example
Description goes here.

<pre>
</pre>

##Resources

* Tweepy Documentation: [http://tweepy.readthedocs.org](http://tweepy.readthedocs.org)
* Facebook SDK for Python Documentation: [https://facebook-sdk.readthedocs.org/en/latest/install.html](https://facebook-sdk.readthedocs.org/en/latest/install.html)
