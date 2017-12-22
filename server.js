// @author: Sal Giani
// @github: sallybananas
// @comment: Assignment 13 - Mentor Finder Express Node app


// Node Dependencies
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');



// Link in html and api routes
var apiRoutes = require('./app/routing/apiRoutes');
var htmlRoutes = require('./app/routing/htmlRoutes');



// Set up Express App
var app = express();
var PORT = process.env.PORT || 8080;



// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(express.static("app/public"));



// Server Routing Map
apiRoutes(app); // API route - Must be listed first due to the HTML default catch all "use" route
htmlRoutes(app); // HTML route


// Listener - Start the server
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});