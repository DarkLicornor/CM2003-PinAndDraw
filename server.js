var express = require('express');
var app = express();
var path = require('path');

app.use(express.static(__dirname + '/dist'));
//
// app.listen(process.env.PORT || 3000);

// app.get('/', function(req, res){
//   console.log('in')
//   res.sendFile(__dirname + 'index.html');
// });

app.get('*', function(req, res) {
  res.sendFile(path.resolve(__dirname, 'dist/index.html'));
});

app.listen(process.env.PORT || 3000);
