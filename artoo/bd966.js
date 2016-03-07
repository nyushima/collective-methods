#Gives you the name of the game and the number of the viewers on Twitch.

######(http://www.twitch.tv/directory)

artoo.scrape('.game.item', {
  game: {sel: '.title', method:'text'},
  viewers:{sel:'.info', method:'text'} 
  },
artoo.savePrettyJson);

#Another Version using jQuery: eliminating the word "viewers" in the result as well as all the "\n"s.

######(http://www.twitch.tv/directory)

var gameViewers = [];
var game, viewers;
artoo.scrape('.game.item', {
    text: function() {
  game = $(this).find('.title').text().replace('\n','');
  viewers = $(this).find('.info').text().replace('viewers','').replace('\n        ','').replace('\n      ','').replace('\n      ',''); 
var list = {
                'game': game,
                'viewers': viewers,  
            };
            gameViewers.push(list);
  }
},function() {
artoo.savePrettyJson(gameViewers);
});


#Gives the total viewer number on Twitch.

var sum = 0;
artoo.scrape('.game.item', {
  Total: function() {
   sum += Number($(this).find('.info').text().replace('viewers','').replace(',',''));
    }
}, function() {
    console.log('Total Viewers: '+sum); 
});


#Gives you the name and the price of the products on Argos.

######(http://www.argos.co.uk/static/Search/searchTerm/cool.htm)

artoo.scrape('.product     ', {
  Name: {sel: '.title', method: 'text'},
  Price: {sel:'.main', method: 'text'}
  },
artoo.savePrettyJson);

#Gives you the average price of the products on the page.

######(http://www.argos.co.uk/static/Search/searchTerm/cool.htm)

var quantity = 0;
var sum = 0;
artoo.scrape('.product     ', {
  price: function() {
    quantity++;
    sum += Number($(this).find('.main').text().replace('£',''));
    }
}, function() {
    var average = sum/quantity;
    console.log('Quantity: '+quantity+', Average: '+average); 
});
