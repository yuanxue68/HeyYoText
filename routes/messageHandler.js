var taskmodel=require('./../models/taskmodel');
var utils=require('./utils');
var env = process.env;
var scheduler = require('node-schedulerjs');

var deleteTask = function(id, fromNumber, cb) {
  taskmodel.getTasksById(fromNumber, id, function(err, task){
    if(err){
      utils.sendText("Error finding task "+id);
      return cb("Error finding task "+id);
    }

    if(!task){
      utils.sendText("Cant find task "+id);
      return cb("Cant find task "+id);
    }

    taskmodel.deleteTask(fromNumber, task, function(err, data){
      if(err){
        utils.sendText("Error deleting");
        return cb("Error deleting");
      } else {
        if(global.schedulers[task.id]){
          global.schedulers[task.id].stop();
        }
        delete(global.schedulers[task.id]);
        utils.sendText("Successfully deleted ");
        return cb(null);
      }
    });
  });
}

var checkStatus = function(fromNumber, cb){
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
    return cb(null);
  });
}

function createTask(fromNumber, message, cb){
  var currentTask=utils.parseMsg(message);

  taskmodel.saveTask(currentTask, fromNumber);
  utils.sendText("Successfully created task "+currentTask.id);

  var reminderTime = new Date(currentTask.id);
  global.schedulers[currentTask.id] = new scheduler(reminderTime, function(err){
    if(err){
      delete global.schedulers[currentTask.id];
      utils.sendText("Error setting up timer, please try delete and create this reminder, task id: "+currentTask.body);
      cb(err);
    }
    taskmodel.deleteTask(fromNumber, currentTask, function(err){
      if(err){
        cb(err);
      }
      utils.sendText("Times Up! : "+currentTask.body);
    });

  });
  global.schedulers[currentTask.id].start();
}

module.exports.deleteTask = deleteTask;
module.exports.checkStatus = checkStatus;
module.exports.createTask = createTask;