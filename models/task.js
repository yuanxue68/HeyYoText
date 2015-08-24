var redis=require('redis');
var client=null;

client=redis.createClient();

function getAllTasks(callBack){
	client.hgetall('tasks',function(err,data){
		var tasks=[];
		for (var key in data){
			tasks.push(JSON.parse(data[key]));
		}
		callBack(tasks);
	});
}

function getTask(id){
	client.hget('tasks',id);
}

function saveTask(task){
	client.hset('tasks',task.id, JSON.stringify(task));
}

function deleteTask(id){
	client.hdel('tasks',id);
}

module.exports.getAllTasks=getAllTasks;
module.exports.getTask=getTask;
module.exports.saveTask=saveTask;
module.exports.deleteTask=deleteTask;