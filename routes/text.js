var express=require('express');
var router=express.Router();
var taskmodel=require('./../models/taskmodel');
var utils=require('./utils');
var util = require('util');
var env = process.env;
var scheduler = require('node-schedulerjs');
var messageHandler = require('./messageHandler');

router.use(function(req, res, next){
  if(req.method === "POST"){
    req.checkBody("From","No From Number").notEmpty();
    req.checkBody("Body","No Body").notEmpty();
  }

  var errors = req.validationErrors();
  if (errors) {
    return res.status(400).send("There have been validation errors: " + util.inspect(errors));
  }

  next();
});

router.post('/',function(req,res,next){
  try{
    var fromNumber = req.body.From;
    var message=req.body.Body.trim();
        console.log(req.body);
    var messageArr=message.split(' ');

    if(messageArr[0].toUpperCase() === 'delete'.toUpperCase()){
      messageHandler.deleteTask(messageArr[1], fromNumber, function(err){
        if(err){
          return res.status(400).send(err);
        }
        return res.send('OK');
      });

    } else if (messageArr[0].toUpperCase() === 'status'.toUpperCase()){
      messageHandler.checkStatus(fromNumber, function(err){
        if(err){
          return res.status(400).send(err);
        }
        return res.send('OK');
      });

    } else if (messageArr[0].toUpperCase() ==='deleteall'.toUpperCase()){
      messageHandler.deleteAll(fromNumber, function(err){
        if(err){
          return res.status(400).send(err);
        }

        return res.send('OK');
      });
    } else {
      messageHandler.createTask(fromNumber, message, function(err){
        if(err){
          return res.status(400).send(err);
        }
        return res.send('OK');
      });
    }

  } catch(e){
    console.log(e);
    utils.sendText("ERROR, make sure your command is valid", req.body.From);
    return res.status(500).json({ error: e });
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

router.delete('/:number/:taskId',function(req,res,next){
  console.log(req.params);
  taskmodel.getTasksById(req.params.number, req.params.taskId, function(err, data){
    console.log(data);
    taskmodel.deleteTask(req.params.number, data, function(err, data){
      if(err){
        console.log(err);
      }
      res.json(req.params.taskId);
    });
  });
});

module.exports=router;