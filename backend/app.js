const express = require('express'),
bodyParser = require('body-parser');

app = express(),
port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

console.log('todo list RESTful API server started on: ' + port);

var profileRoute = require('./api/routes/profile');
profileRoute(app);
app.listen(port);
