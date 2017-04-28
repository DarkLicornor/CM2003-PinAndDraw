//Serve a basic http server

var express = require('express');
var app = express();
var path = require('path');
var redirectToHTTPS = require('express-http-to-https')

app.use(express.static(__dirname + '/dist'));

app.use(redirectToHTTPS(['localhost:8080']));

app.get('*', function(req, res) {
  res.sendFile(path.resolve(__dirname, 'dist/index.html'));
});

app.listen(process.env.PORT || 3000);
