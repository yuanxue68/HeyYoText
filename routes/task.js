var express=require('express');
var utils=require('./utils');
var router=express.Router();
var taskmodel=require('./../models/taskmodel');

router.post('/',function(req,res,next){

	try{
		currentTask=utils.parseMsg(req.body.data);
		console.log(req.body);
		taskmodel.saveTask(currentTask);
		utils.sendText(req.body.data);
		res.json(req.body);
	} catch(e){
		res.status(500).json({ error: e });
	}

});

router.get('/:number',function(req,res,next){
	var allTasks;
	console.log(req.params);
	taskmodel.getTasksByNumber(req.params.number, function(err, data){
		if(err){
			console.log(err);
		}
		allTasks=data;
		console.dir(allTasks);
		res.json(allTasks);
	});
});

router.delete('/:id',function(req,res,next){
	taskmodel.deleteTask(req.params.id,function(data){
		res.json(data);
	});
});

module.exports = router;