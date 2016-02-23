var redis=require('redis');
var client=null;

client=redis.createClient({url:process.env.REDIS_URL});

function getAllTasks(callBack){
  client.keys('*', function(err, data){
    if(err){
      return callBack(err);
    }

    var tasks = {};
    var guard = 0;

    if(!data || data.length === 0){
      return callBack(null, tasks);
    }

    data.forEach(function(key){
      if(key === "taskId"){
        return;
      }
      getTasksByNumber(key, function(err, taskSet){
        guard++;
        tasks[key] = taskSet;
        if(guard === data.length - 1){
          return callBack(null, tasks);
        }
      });
    });

  });
}

function deleteAllTasks(number, callBack){
  client.del(number, function(err){
    callBack(err);
  });
}

function getTasksByNumber(number, callBack){
  client.smembers(number, function(err, data){
    if(err){
      return callBack(err);
    }
    var tasks=[];
    for (var key in data){
      tasks.push(JSON.parse(data[key]));
    }
    return callBack(err, tasks);
  });
}

function getTasksById(number, id, callBack){
  var task;
  client.smembers(number, function(err, data){
    if(err){
      return callBack(err);
    } else {
      for (var i = 0; i<data.length; i++){
        task = JSON.parse(data[i]);
        if(Number(task.id) === Number(id)){

          return callBack(null, task);
        }
      }
      return callBack(null, null);
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

function createTaskId(cb){
  client.incr("taskId", function(err, data){
    cb(err, data);
  });
}

module.exports.getTasksById = getTasksById;
module.exports.getAllTasks = getAllTasks;
module.exports.saveTask = saveTask;
module.exports.deleteTask = deleteTask;
module.exports.getTasksByNumber = getTasksByNumber;
module.exports.deleteAllTasks = deleteAllTasks;
module.exports.createTaskId = createTaskId;