const express = require('express'),
bodyParser = require('body-parser');

app = express(),
port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

console.log('todo list RESTful API server started on: ' + port);

var profileRoute = require('./api/routes/profile');
var projectRoute = require('./api/routes/project');
var boardRoute = require('./api/routes/board');

profileRoute(app);
projectRoute(app);
boardRoute(app);

app.listen(port);
