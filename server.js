var express=require("express");
var _=require("underscore");
var path = require('path');
var bodyParser=require('body-parser');
var http=require("http");
var app=express();
var redis=require("redis");
var logger = require('morgan');

var index=require("./routes/index");
var task=require("./routes/task");
var text=require("./routes/text");
var utils=require('./routes/utils');
var taskModel=require('./models/taskmodel');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', index);
app.use('/api/task', task);
app.use('/api/text', text);

global.schedulers = {};

//check if any task is past its timer
/*setInterval(function tick(){
	taskModel.getAllTasks(function(err, data){
		console.log("all data is")
		console.log(data);
	});

	taskModel.getTasksByNumber("+16472958956", function(err, data){
		if(err){
			console.log(err);
		}
		console.log("from number 647 296 8956");
		console.log(data);
		allTasks=data;
		for (var i=0;i<allTasks.length; i++){
			task=allTasks[i];
			currentTS=Date.now();
			if (currentTS>(task.id)){
				taskModel.deleteTask("+16472958956", task, function(err){
					if (!err) {
						utils.sendText("Times Up! : "+task.body);
					}
				});
			}
		}

	});
}, 1000);*/






app.listen(8090);
console.log("App listening on port 8080");