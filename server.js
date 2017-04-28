//Serve a basic http server
//TODO redirect http to https

var express = require('express');
var app = express();
var path = require('path');

app.use(express.static(__dirname + '/dist'));

app.use(function(req,resp,next){
    if (req.headers['x-forwarded-proto'] == 'http') {
        return resp.redirect(301, 'https://' + req.headers.host + '/');
    } else {
        return next();
    }
});

app.get('*', function(req, res) {
  res.sendFile(path.resolve(__dirname, 'dist/index.html'));
});

app.listen(process.env.PORT || 3000);
