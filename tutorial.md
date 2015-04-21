##APIs: An Introduction
#####Written by: Alex Campbell


###Motivation

When I first started to learn how to create and consume API's, I was lost.  I jumped through three to four tutorials before I had someone sit down and teach me.

My aim in this tutorial is to teach people with some technical experience how to build an API and how to consume data from other APIs.

---

###Prerequisites:


1) node installed


2) running on linux or mac.  If you're running windows you're probably doing it wrong.


3) some knowledge of javascript

---

###Agenda:


  What is an API?


  What is REST?


  CODE TIME!

---

###What is an API?

API is an acronym for "application program interface".  This is just fancy talk for how two software components interact. Programmers create "building blocks", an API, to make it easier for other programmers to interact with their database or hardware. This could be how a programmer interacts with the hardware to create a nice graphical user interface.  It could be how Twitter exposes their database to make cool applications!

---
#####tl;dr:
>**An interface for interacting with databases or hardware**
---

###What is REST?


Representational State Transfer.  Yeah, ignore that.  REST is the most popular style of communication for web applications. It allows us to communicate via URI and HTTP (think of URI as a URL, like: http://alexcampbell.co).  That's all we need to know for now, let's jump into code!

---
#####tl;dr:
>**A way to communicate via URI and HTTP**
---

###Our Tools

For this application we'll be using ***Node.js and Express.js.***  Not because it's better than anything else, but because I'm most comfortable using it.


**Node.js** is a platform for building network applications (servers).


**Express.js** is a package that makes using node.js easier.

---
#Part 1: Creating our own API

In this part, we're going to create our own server.  We're going to create our own server that is an API that someone else could use.  It's not going to do much, but damnit, it's an API nonetheless.

##Server.js, our first file
####Libraries:


Let's create our barebones server. Create a file called server.js:

```javascript
//server.js


// Include the packages we need
var express     = require('express'),
    http        = require('http'),
    body_parser = require('body-parser');
```
Okay so this first few lines we're just including the libraries we need in order to run our application. 

  1. We include express so that we we can use all of the functions that the framework includes.

  2. We include http so that we can create our server using HTTP.  This will allow us to access it via URL!

  3. We include body_parser so that we can do POST requests.

 ---

####The basics, setting up our express app:

 ```javascript
//server.js


// Include the packages we need
var express     = require('express'),
    http        = require('http'),
    body_parser = require('body-parser');

var app = express(); // Create our app using express


//Create our app using body parser
// This will allow us to get data from a POST
app.use(body_parser.urlencoded({ extended: true })); 

// Set our port
app.set('port',3000);

 ```

 The first thing we did was create a variable called app that is equal to express.  This means that we now have an application that can utulize the express framework.

 Next we tell our app to *use* body_parser.  Don't worry about the details for now, just know that it allows us to do POST requests.

 Finally we set 'port' to be equal to 3000 for our application.  This means that when we run our server it will be available at http://localhost:3000.  Localhost is just your computer, so for now only you will be able to see it!

 ---
#####tl;dr:
>**Create our app using express, use body parser to allow POST requests, and set the application's port to 3000 so we can access it at http://localhost:3000.**
---

####Let's create our basic server:

 ```javascript
//server.js


// Include the packages we need
var express     = require('express'),
    http        = require('http'),
    body_parser = require('body-parser');

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
 ```


 We create a variable called server that is an http server using our express *app* that we just created.  Finally we tell our server to *listen* on the port we just created, 3000.  We then tell it to print out "Listening on port <our port>".  Simple enough, right?

---
#####tl;dr:
>**Create a server called 'server' that uses http to create a server using the options we set on our app**
---

#####Callback function?


 Although let's back up a second.  Do you see how when we created the server we had this funky function as our second parameter?  This is called a callback function.  All that this is saying is the following:  "Hey server, listen on port 3000 (app.get('port'), and when you're done with that print out that you're listening".  We'll see a few more callback functions when we get into routes, but for now just think of it as the thing that gets done after the first function finishes.

---
#####tl;dr:
>**"Hey server, listen on port 3000 (app.get('port'), and when you're done with that print out that you're listening".**
---

####Try it out!
 BOOM!  You just created a server.  Hell yeah, nice job. Let's boot it up.  Go into the directory where your server.js lives and type the command ```node server.js```.


 Sorry that was mean, I knew it was going to break.  You should have an error that says something like: "Error: Cannot find module 'express'".  But wait we included it in our server.js file, why doesn't it work?!

####Fixing it:


 Yes your app sees it, but the computer you're running on doesn't have it installed.  More specifically, the directory you're in (where your app lives) doesn't have it installed.  We could manually install all of the dependencies, but we're developers, we don't like to do things twice.  Let's create a package.json file.  We can think of this file as the instruction manual for our application.  It tells it what it needs to install to run.


---
#####tl;dr:
>**The libraries are not installed in your app.  We need to add a package.json file.**
---
*package.json*
 ```json
 {
  "name": "MyFirstAPI",
  "version": "0.0.1",
  "main": "server.js",
  "author":"Alex Campbell",

  "dependencies":{
    "express": "^4.7.4",
    "body-parser": "~1.5.2"
    }
}
```

Create this file in the same directory as your *server.js* file.  Notice I added a few things here.  The name of my application, the version, where our main file is, and who wrote it.  This stuff is just to keep track of data associated with the application.  The interesting stuff is below in dependencies.  We include express and body-parser, good!  Although we notice that http is not there.  This is because it is built in to node.js.  So when we install node.js, we install http!

Now in order to run this file just type ```npm install`` in the directory that the package.json is.

Woohoo we installed stuff.  Well done.

---
#####tl;dr:
>**Add meta-data and dependencies to the file.  We don't need HTTP because it's included in node.js**
---

####Try, try again:


Let's try to run our app again:  ```node server.js```
Cool it's listening on port 3000!
Quick, go to your browser and put http://localhost:3000 into the url bar.


Cannot GET / ? What the hell man, I thought it would work.  Well it is working, you created a server.  Although the server doesn't know what to do at the URL http://localhost:3000/.  If you go to http://localhost:3000/test you'll get a similar error.  This is where routing comes into play, which is the next part of our tutorial.

---
#####tl;dr:
>**The server is running, but we haven't written any routes yet.**
---

###Let's create some routes:

You guys are gunna' be impressed how easy it is to create an API.  Let's add 3 lines of code:


```javascript
//server.js


// Include the packages we need
var express     = require('express'),
    http        = require('http'),
    body_parser = require('body-parser');

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


  app.get('/', function(request,response){
    response.send("I just created an API, I am a god.");
  });
```


Woah don't get too hasty, let's understand what's going on here.  We're telling our app the following: "When someone hits the url http://localhost:3000/, send the string over".

Although it's a bit more complex than that.  We see that callback thing again here. The reason we have this callback this is because our *app.get* is asynchronous.  In other words, while *app.get* is running something else on the server might be running.  We give it a callback function to tell it what to do when it's done. But this time it has two parameters: *request* and *response*.  These are objects that represent data that our app is sending out and the data that our app is receiving. So when we say *response.send("I just created an API, I am a god")*, **it's saying: "Add this string to the response object's 'send' field."**

If you haven't already, go to http://localhost:3000/ and bask in your glory.

---
#####tl;dr:
>**Add the root route ('/') and when someone accesses that URL send back a string.**
---


#Part 2: Using someone else's API:
In this section we are going to utulize an API that converts any string into a 'yoda string'.  It will take a string and return how yoda might say it.  Or, Take a string and return how yoda might say it, it will.  Yes, hmmm.  Let's do eet!

###Let's hit another API!

Alright let's make it do something cool.  Let's use an API to translate anything we say into yoda speak. I'm about to hit y'all with a lot of unfamiliar code, don't freak out:

```javascript
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

```

**Use the request library to hit third party APIs**


First things first, we're using a new library called *Request* which allows us to easily hit third party APIs.  So let's add it to our package.json: *request": "~2.37.0"* in the dependencies section.  Your package.json should now look like this:

```json
{
  "name": "MyFirstAPI",
  "version": "0.0.1",
  "main": "server/server.js",
  "author":"Alex Campbell",

  "dependencies":{
    "express": "^4.7.4",
    "body-parser": "~1.5.2",
    "request": "~2.37.0"
    }
}

```

Let's run npm install again to update our libraries.


Now let's walk through this '/translate' route step by step:

1) we add request to the packages we need.


2) we will use request to make an API call to a yoda translator.  This API exists at the URL "https://yoda.p.mashape.com/yoda" so we set our url parameter to be that.


3) we need to set a query string.  This is going to be the sentence that is sent to the API to be yodafied (yeah I just made that word up).  We will name the query string *sentence* so that we can make requests like: "https://yoda.p.mashape.com/yoda?*sentence*=I love lumpy space".  If we changed:

```json
qs: {"sentence": req.query.sentence}
```
TO
```json
qs: {"thing": req.query.thing}
```

then we would make our request like this: "https://yoda.p.mashape.com/yoda?*thing*=I love lumpy space".


4) req.query.sentence?  What the hell is that?  We're telling our app on request to look at the query string.  Within that querystring give us the value of *sentence*.  This is whatever you typed into your URL!


5)  Next we need to add the headers.  This is extra data associated with our request that tells it how to act, or passes along authentication information.  Since we're using mashape, their APIs expect an "X-MASHAPE-KEY", so we pass it along in the headers.  Best practice, we would not expose our API key, but for the scope of this tutorial, don't worry about it.  We also tell it to Accept text/plain.  This means that our API should only accept plain text.


6) After we've passed all this information along, we have a callback function.  So once the request is made, it will execute this function.  Similar to our "http://localhost:300/" route, we send a string across the server.  This time it's the body of the response.


###Congrats

You freakin' did it.  You just created an API that translates speach into yoda speach.  Notice we don't have a frontend, next tutorial anyone?



