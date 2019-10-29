const express = require('express'),
app = express(),
port = process.env.PORT || 3000;


console.log('todo list RESTful API server started on: ' + port);

var routes = require('./api/routes/profile');
routes(app);
app.listen(port);
