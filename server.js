var express = require('express');
var app = express();

app.get('/', function (req, res) {
    res.send('Hey, This is Roderick <roderickhsiao@gmail.com>');
});

app.listen(3000, function () {
    console.log('roderickhsiao.me app listening on port 3000!');
});
