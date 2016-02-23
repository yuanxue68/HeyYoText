var express=require("express");
var _=require("underscore");
var path = require('path');
var bodyParser=require('body-parser');
var http=require("http");
var app=express();
var redis=require("redis");
var logger = require('morgan');
var scheduler = require('node-schedulerjs');
var validator = require('express-validator');

var index=require("./routes/index");
var text=require("./routes/text");
var utils=require('./routes/utils');
var taskModel=require('./models/taskmodel');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(validator());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', index);
app.use('/api/text', text);

global.schedulers = {};
// initial set up, schedule all the reminder thats already in the database
taskModel.getAllTasks(function(err, data){
	if(! data)
		return;
	Object.keys(data).forEach(function(key){
		data[key].forEach(function(task){
			var reminderTime = new Date(task.ts);
			var now = new Date();
			if(reminderTime > now){
				console.log(reminderTime);
				global.schedulers[task.id] = new scheduler(reminderTime, function(err){
					if(err){
						console.log(err);
					}
					utils.sendText("Times Up! : "+task.body, key);
					taskModel.deleteTask(key, task, function(){});
				});
				global.schedulers[task.id].start();
			} else {
				taskModel.deleteTask(key, task, function(){}); // delete outdated reminder
			}
		});
	});
});

app.listen(8090);
console.log("App listening on port 8090");