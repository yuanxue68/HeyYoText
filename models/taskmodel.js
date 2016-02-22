var redis=require('redis');
var client=null;

client=redis.createClient();

function getAllTasks(callBack){
  client.keys('*', function(err, data){
    if(err){
      callBack(err);
    }
    var tasks = [];
    var guard = 0;
    if(!data || data.length === 0){
      callBack(null, tasks);
    }
    for(var key in data){
      getTasksByNumber(key, function(err, data){
        guard++;
        tasks.push(data);
        if(guard === data.length){
          callBack(null, tasks);
        }
      })
    }
  });
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

function getTasksById(number, id, callBack){
  var task;
  client.smembers(number, function(err, data){
    if(err){
      callBack(err);
    } else {
      console.log("data is");
      console.log(data);
      for (var i = 0; i<data.length; i++){
        task = JSON.parse(data[i])
        if(Number(task.id) === Number(id)){
          callBack(null, task);
          return;
        }
      }
      callBack(null, null);
    }
  });
}

function saveTask(task, creator){
  client.sadd(creator, JSON.stringify(task));
}

function deleteTask(number, task, callBack){
  client.srem(number, JSON.stringify(task), function(err, data){
    callBack(err, data);
  });
}

module.exports.getTasksById = getTasksById;
module.exports.getAllTasks = getAllTasks;
module.exports.saveTask = saveTask;
module.exports.deleteTask = deleteTask;
module.exports.getTasksByNumber = getTasksByNumber;