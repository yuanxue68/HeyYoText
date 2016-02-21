var redis=require('redis');
var client=null;

client=redis.createClient();

function getAllTasks(callBack){
  client.keys('*', function(err, data){
    var tasks = {};
    console.log("*");
    console.log(data);
    for(var key in data){
      
    }
  });
  // client.hgetall('tasks',function(err,data){
  //  var tasks=[];
  //  for (var key in data){
  //    tasks.push(JSON.parse(data[key]));
  //  }
  //  callBack(tasks);
  // });
}

function getTasksByNumber(number, callBack){
  client.smembers(number, function(err, data){
    if(err){
      callBack(err);
    }
    var tasks=[];
    for (var key in data){
      tasks.push(JSON.parse(data[key]));
    }
    callBack(err, tasks);
  });
}

function saveTask(task, creator){
  client.sadd(creator, JSON.stringify(task));
}

function deleteTask(number, task, callBack){
  /*client.hdel('tasks',id, function(err, data){
    console.log(err);
    console.log(data);
    callBack();
  });*/
  client.srem(number, JSON.stringify(task), function(err, data){
    callBack(err, data);
  });
}

module.exports.getAllTasks = getAllTasks;
module.exports.saveTask = saveTask;
module.exports.deleteTask = deleteTask;
module.exports.getTasksByNumber = getTasksByNumber;