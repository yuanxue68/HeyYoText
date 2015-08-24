var express=require("express");
var _=require("underscore");
var path = require('path');
var bodyParser=require('body-parser');
var http=require("http");
var app=express();
var redis=require("redis");
var logger = require('morgan');

var routes=require("./routes/index");
var task=require("./routes/task");

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api/task', task);


app.listen(8080);
console.log("App listening on port 8080");