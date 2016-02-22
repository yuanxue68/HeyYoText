var express=require('express');
var router=express.Router();
var taskmodel=require('./../models/taskmodel');
var utils=require('./utils');
var env = process.env;
var scheduler = require('node-schedulerjs');
var messageHandler = require('./messageHandler');

router.post('/',function(req,res,next){
  try{
    var fromNumber = req.body.From;
    var message=req.body.Body.trim();
    var messageArr=message.split(' ');

    if(messageArr[0].toUpperCase()==='delete'.toUpperCase()){
      messageHandler.deleteTask(messageArr[1], fromNumber, function(err){
        if(err){
          return res.status(400).send(err);
        }
        res.send('OK');
      });

    } else if (messageArr[0].toUpperCase()==='status'.toUpperCase()){
      messageHandler.checkStatus(fromNumber, function(err){
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
      });
      return res.send('OK');
    }

  } catch(e){
    utils.sendText("ERROR, make sure your command is valid");
    return res.status(500).json({ error: e });
  }
});

module.exports=router;