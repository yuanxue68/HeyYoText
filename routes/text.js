var express=require('express');
var router=express.Router();
var taskmodel=require('./../models/taskmodel');
var utils=require('./utils');
var env = process.env;

router.post('/',function(req,res,next){
  console.log(req.body);
  try{
    var fromNumber = req.body.From;
    var message=req.body.Body;
    var messageArr=message.split(' ');

    if(messageArr[0].toUpperCase()==='delete'.toUpperCase()){

      taskmodel.deleteTask(messageArr[1],function(data){
        utils.sendText("Success");
        return res.json(data);
      });

    } else if (messageArr[0].toUpperCase()==='status'.toUpperCase()){

      taskmodel.getAllTasks(function(data){
        allTasks=data;
        var formattedText='';
        for(var i=0;i<allTasks.length;i++){
          formattedText=formattedText+allTasks[i].id+" "+allTasks[i].body+"|\n";
        }
        if(!formattedText){
          utils.sendText("No Tasks From Your Number");
        } else {
          utils.sendText(JSON.stringify(formattedText));
        }
        return res.json(allTasks);
      });

    } else {
      currentTask=utils.parseMsg(message);
      taskmodel.saveTask(currentTask, fromNumber);
      utils.sendText("Successfully created task "+currentTask.id);
      return res.json(req.body);
    }
  } catch(e){
    utils.sendText("ERROR, make sure your command is valid");
    return res.status(500).json({ error: e });
  }
});

module.exports=router;