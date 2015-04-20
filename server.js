//server.js


// Include the packages we need
var express     = require('express'),
    http        = require('http'),
    body_parser = require('body-parser'),
    request     = require('request');

var app = express(); // Create our app using express


//Create our app using body parser
// This will allow us to get data from a POST
app.use(body_parser.urlencoded({ extended: true })); 

// Set our port
app.set('port', 3000);

// Create our server using the app
var server = http.createServer(app);


// Our server will listen on port 3000 and log out when it works!
server.listen(app.get('port'), function(){
  console.log("Listening on port "+ app.get('port'));
})

  // When we hit http://localhost:3000/ send over this string.
  app.get('/', function(req,res){
    res.send("I just created an API, I am a god.");
  });

  
  // When we hit "http://localhost:3000/translate?sentence= some sentence" it will translate our string into yoda speak!
  app.get('/translate', function(req,res){
    request({
      url: "https://yoda.p.mashape.com/yoda",
      qs: {sentence: req.query.sentence},
      headers: {
        "X-Mashape-Key":"W0XfNKn3JJmsh0Pq0bsfmunVYrOvp1BSVkLjsn6IP3xd0N2ChB",
        "Accept": "text/plain"
      },
    },
      function(err,response,body){
        if(!err){
          res.send(body);
        }
      });
  });
