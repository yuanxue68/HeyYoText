var env=process.env;
var express=require('express');
var utils=require('./utils');
var router=express.Router();
var task=require('./../models/task')

router.post('/',function(req,res,next){
	process.stdout.write(req.body.data);
	currentTask={
		id:Date.now(),
		body:req.body.data
	};
	task.saveTask(currentTask);
	utils.sendText(req.body.data);
	res.json(req.body);
});

router.get('/',function(req,res,next){
	var allTasks;
	task.getAllTasks(function(data){
		allTasks=data;
		console.dir(allTasks);
		res.json(allTasks);
	});
});

module.exports = router