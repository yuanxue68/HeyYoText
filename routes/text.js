var express=require('express');
var router=express.Router();
var taskmodel=require('./../models/taskmodel');
var utils=require('./utils');
var env = process.env;
var scheduler = require('node-schedulerjs');

router.post('/',function(req,res,next){
  try{
    var fromNumber = req.body.From;
    var message=req.body.Body.trim();
    var messageArr=message.split(' ');

    if(messageArr[0].toUpperCase()==='delete'.toUpperCase()){
      taskmodel.getTasksById(fromNumber, messageArr[1], function(err, task){
        if(err){
          utils.sendText("Error finding task "+messageArr[1]);
          return res.status(400).send("Error finding task "+messageArr[1]);
        }
        console.log("task is !!!!");
        console.log(task);
        if(!task){
          utils.sendText("Cant find task "+messageArr[1]);
          return res.status(400).send("Cant find task "+messageArr[1]);
        }

        taskmodel.deleteTask(fromNumber, task, function(err, data){
          if(err){
            utils.sendText("Error deleting");
            return res.status(400).send("Error deleting");
          } else {
            if(global.schedulers[task.id]){
              global.schedulers[task.id].stop();
            }
            delete(global.schedulers[task.id]);
            utils.sendText("Successfully deleted ");
            return res.json(data);
          }
        });
      });

    } else if (messageArr[0].toUpperCase()==='status'.toUpperCase()){

      taskmodel.getTasksByNumber(fromNumber, function(err, data){
        allTasks=data;

        var formattedText='';
        for(var i=0;i<allTasks.length;i++){
          formattedText=formattedText+" "+allTasks[i].id+" " +allTasks[i].body+"  ||  ";
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

      reminderTime = new Date(currentTask.id);
      console.log(reminderTime);
      global.schedulers[currentTask.id] = new scheduler(reminderTime, function(err){
        if(err){
          global.schedulers[currentTask.id];
          tils.sendText("Error setting up timer, please try delete and create this reminder, task id: "+currentTask.body);
        }
        taskmodel.deleteTask(fromNumber, currentTask, function(err){
          if(err){
            console.log(err);
          }
          utils.sendText("Times Up! : "+currentTask.body);
        });

      });
      global.schedulers[currentTask.id].start();
      console.log("########"+schedulers);
      console.log(JSON.stringify(Object.keys(global.schedulers)));
      return res.json(req.body);
    }

  } catch(e){
    console.log(e);
    utils.sendText("ERROR, make sure your command is valid");
    return res.status(500).json({ error: e });
  }
});

module.exports=router;