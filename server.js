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
var utils=require('./routes/utils');
var taskModel=require('./models/task')

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api/task', task);

//check if any task is past its timer
setInterval(function(){
	taskModel.getAllTasks(function(data){
		allTasks=data;
		for (var i=0;i<allTasks.length; i++){
			task=allTasks[i];
			currentTS=Date.now();
			console.log(currentTS);
			console.log(task);
			if (currentTS>(task.id)){
				taskModel.deleteTask(task.id,function(){
					utils.sendText("Times Up! : "+task.body);
				});
			}
		}
		console.log(allTasks);
	});
}, 1000);

app.listen(8080);
console.log("App listening on port 8080");