var env = process.env;
var taskModel = require('./../models/taskmodel');
var client=require("twilio")(env.twilioAccountSid, env.twilioAuthToken);


function sendText(message, number){
	if (env.supressTextMessages==="true" || !number) 
		return;
	console.log("SENDING!!! "+message);
	client.sendSms({
		to: number,
		from: env.twilioAssignedPhoneNumber,
		body: message
	}, function(err, responseData){
		console.log(err);
		console.log(responseData);
	});
}

function parseMsg(message, cb){
	try{
		parsedMsg=message.split(" ");
		//should be format of 2015-08-27 22:55:00 
		if(parsedMsg.length<3){
			throw "bad format";
		}
		//parse out the ts of the message
		time=parsedMsg[0]+" "+parsedMsg[1];
		ts=(new Date(time)).getTime();
		time=parsedMsg[1].split(":");
		hour=parseInt(time[0]);
		min=parseInt(time[1]);
		sec=parseInt(time[2]);
		ts=ts+sec+(60*min)+(3600*hour);
		//contrsut task to pass into redis
		taskModel.createTaskId(function(err, id){
			console.log("---------");
			console.log(id);
			var task = {
				id:id,
				body:parsedMsg.join(' '),
				ts:ts
			};
			if (!task.id || !task.body || !task.ts){
				return cb("bad format");
			}
			return cb(null, task);
		});
	
	} catch(e){
		console.log(e);
		throw e;
	}

}


module.exports.sendText=sendText;
module.exports.parseMsg=parseMsg;