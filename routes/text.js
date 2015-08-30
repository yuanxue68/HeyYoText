var express=require('express');
var router=express.Router();
var taskmodel=require('./../models/taskmodel');
var utils=require('./utils');
var env = process.env;

router.post('/',function(req,res,next){

	try{
		var fromNumber = req.body.From;
		var message=req.body.Body;
		var messageArr=message.split(' ');
		if(fromNumber != env.mobile) {
	        res.json({error:'number [' + fromNumber + '] not allowed.'});
      	}
      	if(messageArr[0].toUpperCase()==='delete'.toUpperCase()){
      		taskmodel.deleteTask(messageArr[1],function(data){
      			utils.sendText("Success");
				res.json(data);
			});
      	} else if (messageArr[0].toUpperCase()==='status'.toUpperCase()){
      		taskmodel.getAllTasks(function(data){
				allTasks=data;
				var formattedText='';
				for(var i=0;i<allTasks.length;i++){
					formattedText=formattedText+allTasks[i].id+" "+allTasks[i].body+"||";
				}
				utils.sendText(JSON.stringify(formattedText));
				res.json(allTasks);
			});
      	} else {
      		currentTask=utils.parseMsg(message);
			taskmodel.saveTask(currentTask);
			utils.sendText(currentTask.id);
			res.json(req.body);
      	}
	} catch(e){
		utils.sendText("ERROR, make sure your command is valid");
		res.status(500).json({ error: e });
	}
});

module.exports=router;