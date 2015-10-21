#Example Headline
######Example description (http://whatever.com)
<pre>
var quantity = 0;
var sum = 0;
artoo.scrape('.g_price', {
  text: function() {
    quantity++;
    sum += Number($(this).find('strong').text());
    }
}, function() {
    var average = sum/quantity;
    console.log('Quantity: '+quantity+', Sum: '+sum+', Average: '+average); 
});
</pre>
