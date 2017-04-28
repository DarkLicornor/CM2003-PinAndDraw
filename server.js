//Serve a basic http server

var express = require('express');
var app = express();
var path = require('path');
var toHttps = require('express-to-https').basic


app.use(toHttps)
app.use(express.static(__dirname + '/dist'));

app.get('*', function(req, res) {
  res.sendFile(path.resolve(__dirname, 'dist/index.html'));
});

app.listen(process.env.PORT || 3000);
