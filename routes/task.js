var env=process.env;
var express=require('express');
var utils=require('./utils');
var router=express.Router();
var task=require('./../models/taskmodel');

router.post('/',function(req,res,next){
	try{
		currentTask=utils.parseMsg(req.body.data);
		task.saveTask(currentTask);
		utils.sendText(req.body.data);
		res.json(req.body);
	} catch(e){
		res.status(500).json({ error: e });
	}

});

router.get('/',function(req,res,next){
	var allTasks;
	task.getAllTasks(function(data){
		allTasks=data;
		console.dir(allTasks);
		res.json(allTasks);
	});
});

router.delete('/:id',function(req,res,next){
	task.deleteTask(req.params.id,function(data){
		res.json(data);
	});
});

module.exports = router;